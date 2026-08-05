// Cloudflare Pages Function → ruta: POST /api/preview
// Genera el contenido de una maqueta de web a partir del negocio del visitante.
// La key de OpenAI se lee de la variable de entorno OPENAI_API_KEY
// (se configura en el panel de Cloudflare, NUNCA en el repo).

const SYSTEM_PROMPT = `Eres un diseñador web. A partir del negocio que te describa el usuario, genera el CONTENIDO de una maqueta de landing.

Responde SOLO con un objeto JSON válido (sin markdown, sin texto extra) con esta forma EXACTA:
{
  "name": "nombre del negocio, corto",
  "url": "dominio-sugerido.com en minúsculas, sin espacios ni acentos",
  "kick": "antetítulo de 2 a 4 palabras",
  "title": "titular del hero, máximo 8 palabras, atractivo",
  "sub": "una frase de máximo 18 palabras",
  "cta": "texto de botón de 1 a 3 palabras",
  "accent": "#RRGGBB (color hex de 6 dígitos que pegue con el sector)",
  "cards": [ {"ico":"1 emoji","label":"2-3 palabras"}, {"ico":"1 emoji","label":"2-3 palabras"}, {"ico":"1 emoji","label":"2-3 palabras"} ],
  "foot": [ "📍 dato", "🕐 dato", "☎ o ✉ dato" ]
}

Reglas:
- Todo en español, tono profesional y cercano.
- Elige emojis y un color coherentes con el sector.
- No inventes teléfonos, direcciones ni datos concretos: usa genéricos ("📍 Tu ciudad", "🕐 Horario", "☎ Reservas").
- Exactamente 3 tarjetas y 3 elementos en foot.`;

export async function onRequestPost({ request, env }) {
  try {
    if (!env.OPENAI_API_KEY) return json({ error: "missing_key" }, 500);

    const { name, type } = await request.json().catch(() => ({}));
    const desc = `${(name || "").slice(0, 60)} — ${(type || "").slice(0, 100)}`.trim();
    if (!desc || desc === "—") return json({ error: "bad_request" }, 400);

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 400,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Negocio: ${desc}` },
        ],
      }),
    });

    if (!r.ok) return json({ error: "upstream" }, 502);
    const data = await r.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) return json({ error: "empty" }, 502);

    let parsed;
    try { parsed = JSON.parse(raw); } catch { return json({ error: "parse" }, 502); }

    return json(sanitize(parsed));
  } catch (e) {
    return json({ error: "server" }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  return onRequestPost(context);
}

// Deja la respuesta con la forma esperada aunque el modelo se desvíe un poco.
function sanitize(d) {
  const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");
  const hex = /^#[0-9a-fA-F]{6}$/.test(d.accent) ? d.accent : "#8B6BFF";
  let cards = Array.isArray(d.cards) ? d.cards.slice(0, 3) : [];
  cards = cards.map(c => ({ ico: str(c && c.ico, 4) || "•", label: str(c && c.label, 24) || "Sección" }));
  while (cards.length < 3) cards.push({ ico: "•", label: "Sección" });
  let foot = Array.isArray(d.foot) ? d.foot.slice(0, 3).map(f => str(f, 40)) : [];
  while (foot.length < 3) foot.push("");
  return {
    name: str(d.name, 40) || "Tu Negocio",
    url: (str(d.url, 40) || "tunegocio.com").toLowerCase().replace(/\s+/g, ""),
    kick: str(d.kick, 40),
    title: str(d.title, 90),
    sub: str(d.sub, 160),
    cta: str(d.cta, 24) || "Contactar",
    accent: hex,
    cards,
    foot,
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}
