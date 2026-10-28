// Cloudflare Pages Function → POST /api/contact
// Recibe el formulario de contacto y lo envía por email con Resend (https://resend.com).
//
// Variables (panel de Cloudflare Pages → Settings → Variables and secrets; en local, .dev.vars):
//   RESEND_API_KEY  (obligatoria, secreto) clave de la API de Resend.
//   CONTACT_TO      (opcional) a quién llegan los mensajes. Por defecto, el email de Kódika.
//   CONTACT_FROM    (opcional) remitente con el dominio verificado en Resend,
//                   p. ej. «Kódika <hola@kodikadigital.com>». Sin él se usa el remitente de
//                   pruebas de Resend, que solo puede escribir al email de tu cuenta de Resend,
//                   y no se envía la respuesta automática al cliente.
// Sin RESEND_API_KEY responde 503 y el formulario ofrece WhatsApp o email como alternativa.

const DEFAULT_TO = 'alvarosanchezortega34@gmail.com';
const TEST_FROM = 'Web de Kódika <onboarding@resend.dev>';
const TYPES = {
  web: 'Una web para mi negocio',
  reservas: 'Reservas, citas o pedidos online',
  tienda: 'Tienda online',
  app: 'Aplicación o software a medida',
  ia: 'IA o automatización',
  mant: 'Mejorar o mantener mi web',
  otro: 'Otra cosa',
};
const MIN_FILL_MS = 1500; // un humano no rellena el formulario en menos tiempo
const MAX_BODY = 10_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneDigits = s => {
  const d = s.replace(/[\s().-]/g, '').replace(/^\+/, '');
  return /^\d{9,15}$/.test(d) ? d : '';
};

export function validate(d) {
  const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const data = {
    name: str(d.name, 80),
    contact: str(d.contact, 120),
    type: str(d.type, 20),
    msg: str(d.msg, 1500),
    page: str(d.page, 120),
  };
  const errors = [];
  if (data.name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(data.contact) && !phoneDigits(data.contact)) errors.push('contact');
  if (!TYPES[data.type]) errors.push('type');
  if (data.msg.length < 15) errors.push('msg');
  if (d.privacy !== true) errors.push('privacy');
  return { data, errors };
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function ownerEmail(data) {
  const label = TYPES[data.type];
  const isEmail = EMAIL_RE.test(data.contact);
  const phone = isEmail ? '' : phoneDigits(data.contact);
  const wa = phone ? `https://wa.me/${phone.length === 9 ? '34' + phone : phone}` : '';
  const text = [
    `Nuevo mensaje desde la web de Kódika`,
    ``,
    `Nombre: ${data.name}`,
    `Contacto: ${data.contact}`,
    `Qué necesita: ${label}`,
    data.page ? `Página: ${data.page}` : null,
    ``,
    data.msg,
    ``,
    isEmail ? 'Responde a este correo para contestarle.' : (wa ? `WhatsApp: ${wa}` : null),
  ].filter(l => l !== null).join('\n');
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0b0f1a">
<p style="margin:0 0 16px;color:#2b66f7;font-weight:600">Nuevo mensaje desde la web</p>
<table style="border-collapse:collapse;margin-bottom:16px">
<tr><td style="padding:4px 16px 4px 0;color:#64748b">Nombre</td><td><b>${esc(data.name)}</b></td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#64748b">Contacto</td><td>${isEmail ? `<a href="mailto:${esc(data.contact)}">${esc(data.contact)}</a>` : esc(data.contact)}${wa ? ` · <a href="${wa}">WhatsApp</a>` : ''}</td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#64748b">Qué necesita</td><td>${esc(label)}</td></tr>
${data.page ? `<tr><td style="padding:4px 16px 4px 0;color:#64748b">Página</td><td>${esc(data.page)}</td></tr>` : ''}
</table>
<p style="white-space:pre-wrap;margin:0;padding:16px;background:#f1f5f9;border-radius:8px">${esc(data.msg)}</p>
</div>`;
  return {
    subject: `Nuevo contacto: ${label} · ${data.name}`,
    text, html,
    reply_to: isEmail ? data.contact : undefined,
  };
}

export function clientEmail(data) {
  const first = data.name.split(/\s+/)[0];
  const text = `Hola, ${first}:

Hemos recibido tu mensaje y te respondemos normalmente el mismo día, como mucho en 24 horas.

Esto es lo que nos has enviado:
«${data.msg}»

Si quieres añadir algo, responde a este correo.

Un saludo,
Kódika · kodikadigital.com`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0b0f1a;max-width:560px">
<p>Hola, ${esc(first)}:</p>
<p>Hemos recibido tu mensaje y te respondemos <b>normalmente el mismo día</b>, como mucho en 24 horas.</p>
<p style="margin:20px 0 6px;color:#64748b;font-size:13px">Esto es lo que nos has enviado:</p>
<p style="white-space:pre-wrap;margin:0;padding:16px;background:#f1f5f9;border-radius:8px">${esc(data.msg)}</p>
<p>Si quieres añadir algo, responde a este correo.</p>
<p>Un saludo,<br><b>Kódika</b> · <a href="https://kodikadigital.com" style="color:#2b66f7">kodikadigital.com</a></p>
</div>`;
  return { subject: 'Hemos recibido tu mensaje · Kódika', text, html };
}

async function send(env, payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return r.ok;
}

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
});

export async function onRequestPost(context) {
  const { request, env } = context;
  // Solo desde la propia web
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  const raw = await request.text().catch(() => '');
  if (raw.length > MAX_BODY) return json({ error: 'too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'bad_request' }, 400); }
  if (!body || typeof body !== 'object') return json({ error: 'bad_request' }, 400);

  // Antispam: campo trampa relleno o envío demasiado rápido → se acepta sin enviar nada
  if (body.website || !(Number(body.t) >= MIN_FILL_MS)) return json({ ok: true });

  const { data, errors } = validate(body);
  if (errors.length) return json({ error: 'invalid', fields: errors }, 422);

  if (!env.RESEND_API_KEY) return json({ error: 'not_configured' }, 503);

  const from = env.CONTACT_FROM || TEST_FROM;
  const mail = ownerEmail(data);
  const sent = await send(env, { from, to: [env.CONTACT_TO || DEFAULT_TO], ...mail }).catch(() => false);
  if (!sent) return json({ error: 'upstream' }, 502);

  // Respuesta automática: solo con dominio propio verificado y si el cliente dejó un email
  if (env.CONTACT_FROM && EMAIL_RE.test(data.contact)) {
    const job = send(env, { from, to: [data.contact], reply_to: env.CONTACT_TO || DEFAULT_TO, ...clientEmail(data) }).catch(() => false);
    if (typeof context.waitUntil === 'function') context.waitUntil(job); else await job;
  }
  return json({ ok: true });
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST', 'X-Robots-Tag': 'noindex' } });
  return onRequestPost(context);
}
