import {
  SERVICES, DEMOS, ORIGIN, WA_ICON, ARR, EMAIL, wa, photo, lines, faq, contactForm,
} from '../lib/site.mjs';

const WA_HOME = 'Hola Álvaro, he visto tu web y quiero una para mi negocio.';

// ---------- Hero: fragmentos de interfaz de las demos ----------
const stage = `
        <div class="stage" id="stage" aria-hidden="true">
          <div class="pn p-browser" data-depth="1">
            <div class="pn-in">
              <div class="bbar"><i></i><i></i><i></i><span>aurea-estates · demo</span></div>
              <div class="b-hero">
                ${photo('aurea-estates/hero', '', { sizes: '(max-width: 900px) 90vw, 560px', eager: true })}
                <div class="b-copy"><b>AUREA</b><em>Casas que se recuerdan.</em></div>
                <div class="b-search"><span>Marbella</span><span>Villa</span><span>4+ dorm.</span><span class="go">Buscar</span></div>
              </div>
            </div>
          </div>
          <div class="pn p-phone" data-depth="2.2">
            <div class="pn-in">
              <div class="ph-notch"></div>
              ${photo('noir-atelier/denim', '', { sizes: '200px' })}
              <div class="ph-body">
                <span class="ph-brand">NOIR ATELIER</span>
                <b>Chaqueta denim índigo</b>
                <span class="ph-price">150 €</span>
                <span class="ph-sizes"><i>S</i><i class="on">M</i><i>L</i><i class="off">XL</i></span>
                <span class="ph-add">Añadir a la bolsa</span>
              </div>
            </div>
          </div>
          <div class="pn p-slots" data-depth="1.6">
            <div class="pn-in">
              <span class="sl-h">Sora · Facial hidratante</span>
              <b>Jueves 23</b>
              <span class="sl-grid"><i>10:00</i><i class="on">11:30</i><i class="off">13:00</i><i>17:30</i></span>
              <span class="sl-go">Reservar cita</span>
            </div>
          </div>
          <div class="pn p-kpi" data-depth="2.8">
            <div class="pn-in">
              <span class="k-h">Flowbook · Esta semana</span>
              <b>42 <small>citas</small></b>
              <span class="k-bars"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:52%"></i><i style="--h:80%"></i><i style="--h:72%"></i><i style="--h:95%"></i><i style="--h:60%"></i></span>
            </div>
          </div>
          <div class="pn p-tag" data-depth="3.2">
            <div class="pn-in"><span class="t-dot"></span><b>HIIT · 19:00</b><span>Forge · 3 plazas</span></div>
          </div>
        </div>`;

// ---------- Demos ----------
const demoTile = (d, i) => {
  const n = String(i + 1).padStart(2, '0');
  const media = d.img
    ? photo(d.img, d.alt, { sizes: i === 0 ? '(max-width: 860px) 100vw, 58vw' : i === 1 ? '(max-width: 860px) 100vw, 42vw' : '(max-width: 860px) 100vw, 33vw' })
    : `<div class="fb-mock" aria-hidden="true">
              <div class="fbm-side"><i class="on"></i><i></i><i></i><i></i></div>
              <div class="fbm-main">
                <div class="fbm-kpis"><span><small>Hoy</small><b>12</b></span><span><small>Pendientes</small><b>3</b></span><span><small>Ocupación</small><b>78%</b></span></div>
                <div class="fbm-cal">${Array.from({ length: 5 }, (_, c) => `<div>${Array.from({ length: 3 }, (_, r) => `<i class="s${(c + r) % 3}" style="--r:${(c * 3 + r) % 4}"></i>`).join('')}</div>`).join('')}</div>
              </div>
            </div>`;
  return `
        <a class="dm dm-${i + 1}" href="/demos/${d.slug}/" style="--tone:${d.tone};--d:${i % 3}" data-rv>
          <div class="dm-media">${media}</div>
          <div class="dm-body">
            <p class="dm-meta"><span>${n}</span>${d.sector}</p>
            <h3 class="dm-name dm-f-${d.slug}">${d.name}</h3>
            <p class="dm-pitch">${d.pitch}</p>
            <ul class="dm-feat">${d.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <span class="dm-go">Abrir demo ${ARR}</span>
          </div>
        </a>`;
};

// ---------- Configurador ----------
const OPTS = [
  { k: 'Web de presencia', min: 250, max: 400, t: 'Web de presencia', s: 'De 1 a 3 páginas: quién eres, qué ofreces y cómo contactarte.', pr: '250–400 €', checked: true },
  { k: 'Reservas o pedidos', min: 200, max: 450, t: 'Reservas, citas o pedidos', s: 'Que reserven o pidan online sin llamarte.', pr: '+200–450 €' },
  { k: 'Tienda online', min: 400, max: 800, t: 'Tienda online', s: 'Catálogo, carrito y pago con tarjeta.', pr: '+400–800 €' },
  { k: 'Integración con IA', min: 200, max: 500, t: 'Asistente con IA', s: 'Un chat que responde a tus clientes a cualquier hora.', pr: '+200–500 €' },
  { k: 'Plataforma a medida', custom: true, t: 'App o plataforma a medida', s: 'Algo grande y propio: se estudia aparte.', pr: 'A medida' },
  { k: 'Mantenimiento mensual', min: 15, max: 25, month: true, t: 'Mantenimiento', s: 'Siempre online, actualizada y con pequeños cambios incluidos.', pr: '+15–25 €/mes' },
];

const body = `
    <!-- ================= HERO ================= -->
    <section class="hero" id="inicio" aria-labelledby="h1">
      <div class="hero-bg" aria-hidden="true"><span class="g1"></span><span class="g2"></span><span class="grid"></span></div>
      <div class="wide hero-in">
        <div class="hero-txt">
          <h1 id="h1">
            <span class="eyebrow hero-eyebrow">Diseño y desarrollo web a medida · Málaga / España</span>
            <span class="t-hero lines in-load">${lines(['Haz que tu negocio', 'se vea <em>tan bien</em>', 'como trabaja.'])}</span>
          </h1>
          <p class="lede hero-lede">Diseño y programo webs, reservas online y software a medida para empresas y emprendedores. <b>Trato directo conmigo, precio cerrado y tu web delante antes de pagar.</b></p>
          <div class="ctas hero-ctas">
            <a class="btn lg" href="#contacto" data-cta="presupuesto">Pedir presupuesto ${ARR}</a>
            <a class="btn lg ghost" href="#demos">Explorar las demos</a>
          </div>
          <ul class="hero-facts mono">
            <li>Precio cerrado</li><li>Primero la ves, luego pagas</li><li>Respuesta en 24 h</li>
          </ul>
        </div>
${stage}
      </div>
      <div class="hero-foot wide" aria-hidden="true">
        <span class="cue mono"><i></i>Desliza para explorar</span>
        <div class="marq mono"><div>${'<span>Inmobiliarias</span><span>Moda</span><span>Clínicas y bienestar</span><span>Gimnasios</span><span>Concesionarios</span><span>Restaurantes</span><span>SaaS</span><span>Despachos</span>'.repeat(2)}</div></div>
      </div>
    </section>

    <!-- ================= DEMOS ================= -->
    <section class="sec demos" id="demos" aria-labelledby="demos-t">
      <div class="wide">
        <div class="sh sh-row">
          <div>
            <p class="idx" data-rv>(01) Demos</p>
            <h2 class="t-xl" id="demos-t" data-rv style="--d:1">Explora lo que podría <em>tener</em> tu negocio.</h2>
          </div>
          <p class="lede" data-rv style="--d:2">Seis webs de demostración, cada una con su propia dirección de arte y funciones que funcionan de verdad: buscadores, bolsa de compra, reservas o un panel de citas. <b>Los negocios son ficticios. Lo que hacen, no.</b></p>
        </div>
        <div class="dm-grid">
${DEMOS.map(demoTile).join('')}
        </div>
        <div class="dm-more" data-rv><a class="lnk" href="/demos/">Ver todas las demos con detalle ${ARR}</a></div>
      </div>
    </section>

    <!-- ================= IDEA CON IA ================= -->
    <section class="sec idea" id="idea" aria-labelledby="idea-t">
      <div class="wide idea-in">
        <div class="idea-l">
          <p class="idx" data-rv>(02) Tu sector</p>
          <h2 class="t-lg" id="idea-t" data-rv style="--d:1">¿Tu negocio no está entre las demos? <em>Genera una idea.</em></h2>
          <p class="lede" data-rv style="--d:2">Escribe cómo se llama y a qué te dedicas. En segundos verás <b>una primera maqueta de tu web</b>, con colores y textos pensados para ti.</p>
          <form id="genForm" class="form idea-form" novalidate data-rv style="--d:3">
            <div class="row">
              <div class="fld"><label for="bizName">Nombre del negocio</label><input id="bizName" autocomplete="organization" maxlength="60" placeholder="Peluquería Lucía"></div>
              <div class="fld"><label for="bizType">¿A qué te dedicas?</label><input id="bizType" maxlength="100" placeholder="Peluquería y estética"></div>
            </div>
            <div class="chips" aria-label="Ejemplos rápidos">
              <button type="button" class="chip" data-t="Cafetería">Cafetería</button>
              <button type="button" class="chip" data-t="Peluquería">Peluquería</button>
              <button type="button" class="chip" data-t="Gimnasio">Gimnasio</button>
              <button type="button" class="chip" data-t="Taller mecánico">Taller</button>
              <button type="button" class="chip" data-t="Clínica de fisioterapia">Fisioterapia</button>
            </div>
            <p class="err idea-err" id="genErr" hidden>Escribe al menos el nombre o el tipo de negocio.</p>
            <div><button class="btn lg" id="gen" type="submit">Diseñar mi web ${ARR}</button></div>
            <p class="hint muted">Hecho con IA para que veas la idea. Tu web de verdad la diseño contigo, a mano. No escribas datos personales: el texto se envía a OpenAI para generar la maqueta.</p>
          </form>
        </div>
        <div class="idea-r" data-rv style="--d:2">
          <div class="frame" id="frame">
            <div class="bbar"><i></i><i></i><i></i><span id="url">tunegocio.com</span></div>
            <div class="view" aria-live="polite">
              <div class="empty" id="empty"><div><div class="gh-lines"><i></i><i></i><i></i><i></i></div>Aquí aparecerá tu web.<br>Escribe tu negocio y pulsa «Diseñar mi web».</div></div>
              <div class="skeleton" id="skeleton">
                <i style="height:22px;width:35%"></i><i style="height:46px;width:80%"></i><i style="height:14px;width:60%"></i><i style="height:40px;width:30%;border-radius:99px"></i>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px"><i style="height:84px"></i><i style="height:84px"></i><i style="height:84px"></i></div>
                <div class="st"><span class="spin"></span><span id="skStatus">Analizando tu negocio…</span></div>
              </div>
              <div class="site" id="site"></div>
            </div>
          </div>
          <div class="after" id="after"><span>¿Te gusta? La tuya puede estar online en pocos días.</span><a class="lnk" href="#presupuesto">Calcular cuánto cuesta ${ARR}</a></div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICIOS ================= -->
    <section class="sec" id="servicios" aria-labelledby="servicios-t">
      <div class="wide">
        <div class="sh sh-row">
          <div>
            <p class="idx" data-rv>(03) Servicios</p>
            <h2 class="t-xl" id="servicios-t" data-rv style="--d:1">Qué puedo hacer <em>por</em> tu negocio.</h2>
          </div>
          <p class="lede" data-rv style="--d:2">Cada servicio explicado por lo que consigue, no por la tecnología que usa. La tecnología es mi trabajo; <b>el resultado es lo que te importa a ti</b>.</p>
        </div>
        <ol class="svc">
${SERVICES.map((s, i) => `          <li data-rv style="--d:${i}">
            <a href="${s.path}">
              <span class="svc-n mono">${String(i + 1).padStart(2, '0')}</span>
              <span class="svc-main">
                <span class="svc-t">${s.outcome}</span>
                <span class="svc-b">${s.benefit}</span>
              </span>
              <span class="svc-side">
                <span class="svc-name">${s.name}</span>
                <span class="svc-tech mono">${s.tech.join(' · ')}</span>
                <span class="svc-pr mono">${s.from}</span>
              </span>
              <span class="svc-go" aria-hidden="true">→</span>
            </a>
          </li>`).join('\n')}
        </ol>
      </div>
    </section>

    <!-- ================= BENEFICIOS ================= -->
    <section class="sec alt gain" aria-labelledby="gain-t">
      <div class="wide gain-in">
        <div class="gain-l">
          <p class="idx" data-rv>(04) Lo que ganas</p>
          <h2 class="t-xl" id="gain-t" data-rv style="--d:1">Una web que <em>trabaja</em> mientras tú atiendes tu negocio.</h2>
        </div>
        <ol class="gain-list">
          <li data-rv><span class="mono">i.</span><h3>Una imagen a la altura de tu trabajo.</h3><p>Si tu negocio es bueno, tu web tiene que parecerlo. Un diseño propio transmite la confianza que una plantilla no puede.</p></li>
          <li data-rv style="--d:1"><span class="mono">ii.</span><h3>Clientes que escriben, en lugar de irse.</h3><p>Rápida en el móvil, clara en cinco segundos y con WhatsApp, llamada o reserva siempre a un toque.</p></li>
          <li data-rv style="--d:2"><span class="mono">iii.</span><h3>Menos llamadas y menos tareas repetidas.</h3><p>Reservas, pedidos, avisos y documentos que se gestionan solos, para que tu tiempo vaya a lo que de verdad importa.</p></li>
          <li data-rv style="--d:3"><span class="mono">iv.</span><h3>Una herramienta que crece contigo.</h3><p>Código propio y bien hecho: hoy una web, mañana reservas, tienda o un panel, sin empezar de cero.</p></li>
        </ol>
      </div>
    </section>

    <!-- ================= PROCESO ================= -->
    <section class="sec proc" id="proceso" aria-labelledby="proc-t">
      <div class="wide">
        <div class="sh sh-row">
          <div>
            <p class="idx" data-rv>(05) Proceso</p>
            <h2 class="t-xl" id="proc-t" data-rv style="--d:1">De la idea a online, <em>sin líos</em>.</h2>
          </div>
          <p class="lede" data-rv style="--d:2">Cuatro pasos, siempre con la misma persona al otro lado. Sabes qué se hace, cuándo y por cuánto antes de empezar.</p>
        </div>
        <ol class="tl" id="tl">
          <li><span class="tl-n mono">01</span><h3>Hablamos</h3><p>Me cuentas tu negocio con tus palabras, por WhatsApp, llamada o en persona si estás en Málaga. La primera conversación es gratis.</p></li>
          <li><span class="tl-n mono">02</span><h3>Propuesta cerrada</h3><p>Te paso por escrito qué incluye, el precio cerrado y una fecha de entrega. Sin letra pequeña.</p></li>
          <li><span class="tl-n mono">03</span><h3>Diseño y desarrollo</h3><p>Primero el plano, luego el diseño. Ves avances reales, ajustamos sobre la marcha y <b>pagas cuando te convence</b>.</p></li>
          <li><span class="tl-n mono">04</span><h3>Online y acompañamiento</h3><p>La publico, la doy de alta en Google y sigo disponible para cambios, dudas o mejoras.</p></li>
        </ol>
      </div>
    </section>

    <!-- ================= DIFERENCIACIÓN ================= -->
    <section class="sec alt why" aria-labelledby="why-t">
      <div class="wide">
        <div class="sh">
          <p class="idx" data-rv>(06) Por qué SanchezDevelop</p>
          <h2 class="t-xl" id="why-t" data-rv style="--d:1">Nivel de estudio. <em>Trato de tú a tú.</em></h2>
        </div>
        <ul class="why-list">
          <li data-rv><h3>Primero la ves. Luego pagas.</h3><p>Te enseño una versión real de tu web antes de cualquier pago. Si no te convence, no pagas.</p></li>
          <li data-rv><h3>Precio cerrado, por escrito.</h3><p>Lo acordamos antes de empezar y no cambia, salvo que añadamos funciones nuevas.</p></li>
          <li data-rv><h3>Hablas con quien la programa.</h3><p>Soy una sola persona: sin comerciales ni intermediarios. Lo que me cuentas es lo que se construye.</p></li>
          <li data-rv><h3>Código propio, sin plantillas.</h3><p>Diseñado y programado a medida: más rápido, más seguro y sin complementos que se rompan.</p></li>
          <li data-rv><h3>No desaparezco después.</h3><p>Tras publicar sigo ahí para cambios, dudas o mejoras, siempre que lo necesites.</p></li>
        </ul>
        <div class="stack" data-rv>
          <p class="mono muted">Tecnologías con las que trabajo, según lo que necesite cada proyecto</p>
          <div class="marq big" aria-hidden="true"><div>${'<span>Angular</span><span>React</span><span>Next.js</span><span>TypeScript</span><span>Node.js</span><span>Express</span><span>Spring Boot</span><span>MySQL</span><span>MongoDB</span><span>Firebase</span><span>Stripe</span><span>OpenAI</span>'.repeat(2)}</div></div>
          <p class="sr">Angular, React, Next.js, TypeScript, Node.js, Express, Spring Boot, MySQL, MongoDB, Firebase, Stripe y OpenAI.</p>
        </div>
      </div>
    </section>

    <!-- ================= CONFIGURADOR ================= -->
    <section class="sec" id="presupuesto" aria-labelledby="cfg-t">
      <div class="wide">
        <div class="sh sh-row">
          <div>
            <p class="idx" data-rv>(07) Presupuesto</p>
            <h2 class="t-xl" id="cfg-t" data-rv style="--d:1">Calcula tu web <em>en segundos</em>.</h2>
          </div>
          <p class="lede" data-rv style="--d:2">Marca lo que necesitas y verás una estimación al momento. <b>Es orientativa:</b> el precio final lo cerramos por escrito antes de empezar y ya no cambia.</p>
        </div>
        <div class="cfg">
          <fieldset class="opts" id="opts">
            <legend class="sr">Qué necesita tu web</legend>
${OPTS.map((o, i) => `            <label class="opt">
              <input type="checkbox" data-k="${o.k}"${o.custom ? ' data-custom="1"' : ` data-min="${o.min}" data-max="${o.max}"`}${o.month ? ' data-month="1"' : ''}${o.checked ? ' checked' : ''}>
              <span class="opt-box" aria-hidden="true"></span>
              <span class="opt-t"><b>${o.t}</b><small>${o.s}</small></span>
              <span class="opt-pr mono">${o.pr}</span>
            </label>`).join('\n')}
          </fieldset>
          <aside class="sum" aria-labelledby="sum-t">
            <p class="mono muted" id="sum-t">Tu estimación</p>
            <p class="sum-v" id="num" aria-live="polite">250–400 €</p>
            <p class="sum-x" id="extra"></p>
            <p class="sum-h" id="hint2">Pago único. Primero ves la web, luego pagas.</p>
            <div class="sum-ctas">
              <a class="btn lg wa" id="calcCta" target="_blank" rel="noopener" href="${wa('Hola Álvaro')}" data-cta="configurador-whatsapp">${WA_ICON}Enviar por WhatsApp</a>
              <button class="btn lg ghost" type="button" id="calcForm">Usar en el formulario</button>
            </div>
            <ul class="checks">
              <li>Precio cerrado antes de empezar</li>
              <li>Cambios hasta que te guste</li>
              <li>Dominio, hosting y correo configurados</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
${faq([
    ['¿Las demos son clientes reales?', '<p>No. Aurea Estates, Noir Atelier, Sora Wellness, Forge Fitness, Veloce Automotive y Flowbook son <strong>negocios ficticios</strong> que he creado para que veas el nivel de diseño y las funciones que puede tener tu web. Están marcados como demostración en cada página.</p>'],
    ['¿Cuánto cuesta una web?', '<p>Una web de presencia cuesta entre 250 y 400 €, y cada función extra (reservas, tienda, IA) se suma aparte. En el <a href="#presupuesto">configurador</a> ves una estimación al momento, y en <a href="/blog/cuanto-cuesta-una-pagina-web/">cuánto cuesta una página web</a> explico qué hace subir o bajar el precio.</p>'],
    ['¿Cuánto tardas en hacer una web?', '<p>Una web sencilla suele estar lista en pocos días. Cuando hablemos y vea lo que necesitas, te doy una fecha concreta por escrito.</p>'],
    ['¿Y si no tengo claro lo que quiero?', '<p>Para eso estoy. Me cuentas tu negocio en lenguaje normal y yo lo convierto en una web con sentido. No necesitas saber nada de tecnología.</p>'],
    ['¿Cómo se paga?', '<p>Precio cerrado desde el principio. Lo acordamos antes de empezar y te enseño una primera versión antes de que pagues nada.</p>'],
    ['¿Y si ya tengo una web?', '<p>La reviso y te digo con sinceridad si merece la pena retocarla o rehacerla. Lo explico en <a href="/mantenimiento-web/">mantenimiento y mejora web</a>.</p>'],
    ['¿Trabajas solo en Málaga?', '<p>Estoy en Málaga y trabajo mucho con negocios de aquí y de la zona de Cádiz, pero todo se puede hacer en remoto, así que da igual dónde estés en España.</p>'],
  ], 'Preguntas frecuentes')}

    <!-- ================= CONTACTO ================= -->
    <section class="sec contact" id="contacto" aria-labelledby="contact-t">
      <div class="wide contact-in">
        <div class="contact-l">
          <p class="idx" data-rv>(08) Contacto</p>
          <h2 class="t-xl" id="contact-t" data-rv style="--d:1">Hablemos de <em>tu proyecto</em>.</h2>
          <p class="lede" data-rv style="--d:2">Cuéntame qué haces y te digo qué haría yo, sin compromiso. <b>La primera conversación es gratis</b> y te respondo normalmente el mismo día.</p>
          <ul class="checks" data-rv style="--d:3">
            <li>Respuesta en 24 horas como mucho</li>
            <li>Precio cerrado por escrito</li>
            <li>Ves tu web antes de pagar</li>
          </ul>
          <div class="contact-direct" data-rv style="--d:4">
            <a class="lnk" href="${wa(WA_HOME)}" target="_blank" rel="noopener" data-cta="whatsapp">WhatsApp · +34 697 89 85 74</a>
            <a class="lnk" href="mailto:${EMAIL}" data-cta="email">${EMAIL}</a>
          </div>
        </div>
        <div class="contact-r" data-rv style="--d:2">
${contactForm('cf')}
        </div>
      </div>
    </section>`;

export default {
  path: '/',
  out: 'index.html',
  nav: '',
  updated: '2026-10-16',
  title: 'Desarrollador web freelance en Málaga | SanchezDevelop',
  description: 'Webs a medida, reservas online, tiendas y aplicaciones para negocios de toda España. Precio cerrado, trato directo conmigo y ves tu web antes de pagar.',
  ogTitle: 'SanchezDevelop · Haz que tu negocio se vea tan bien como trabaja',
  hideHero: true,
  bodyClass: 'home',
  waText: WA_HOME,
  styles: ['/assets/css/home.css'],
  scripts: ['/assets/js/home.js', '/assets/js/contact.js'],
  personExtra: {
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de SanchezDevelop',
      itemListElement: SERVICES.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': ORIGIN + s.path + '#service', name: s.name, url: ORIGIN + s.path },
      })),
    },
  },
  body,
};
