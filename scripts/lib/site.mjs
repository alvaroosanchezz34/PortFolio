// Datos del sitio y componentes compartidos por todas las páginas generadas.
// Todo lo que aparece aquí es información real y visible en la web: no añadas
// direcciones, teléfonos, valoraciones, clientes ni perfiles que no existan.
import { readFileSync } from 'node:fs';

export const ORIGIN = 'https://sanchezdevelop.com';
export const BRAND = 'SanchezDevelop';
export const PERSON_NAME = 'Álvaro Sánchez';
export const EMAIL = 'alvarosanchezortega34@gmail.com';
export const WA_NUMBER = '34697898574';
export const GITHUB = 'https://github.com/alvaroosanchezz34';
export const OG_DEFAULT = '/assets/og/sanchezdevelop.jpg';
// Versión de los recursos estáticos: súbela cuando cambien los CSS o JS comunes.
export const ASSET_V = '4';

// Dimensiones reales de las fotos de las demos (las genera la conversión a WebP).
export const IMAGES = JSON.parse(readFileSync(new URL('../data/images.json', import.meta.url)));

export const SERVICES = [
  {
    key: 'webs', path: '/diseno-web-empresas/', short: 'Webs',
    name: 'Diseño web para empresas',
    outcome: 'Webs que convierten visitas en clientes',
    desc: 'Webs a medida para negocios locales, autónomos y pymes. Rápidas, claras y pensadas para que te contacten.',
    benefit: 'Tu negocio explicado en cinco segundos, rápido en el móvil y con el contacto a un toque.',
    tech: ['Diseño propio', 'SEO técnico', 'HTML · Next.js'],
    from: 'Desde 250 €',
  },
  {
    key: 'reservas', path: '/sistemas-reservas-online/', short: 'Reservas',
    name: 'Reservas, citas y pedidos online',
    outcome: 'Reservas y pedidos sin descolgar el teléfono',
    desc: 'Que tus clientes reserven mesa, pidan cita o hagan un pedido desde tu web, a cualquier hora.',
    benefit: 'Tus clientes reservan cuando quieren y a ti te llega el aviso al momento, sin comisiones por reserva.',
    tech: ['Calendario propio', 'Avisos por email', 'Pagos con Stripe'],
    from: 'Desde 450 € con la web',
  },
  {
    key: 'apps', path: '/aplicaciones-web/', short: 'Apps a medida',
    name: 'Aplicaciones web y software a medida',
    outcome: 'Software que se adapta a tu proceso, no al revés',
    desc: 'Plataformas SaaS, paneles de gestión, portales de clientes y APIs, del diseño al despliegue.',
    benefit: 'La herramienta que tu equipo usa cada día, hecha para cómo trabajáis y no para cualquiera.',
    tech: ['React · Angular', 'Node.js · Spring Boot', 'MySQL · MongoDB'],
    from: 'Presupuesto a medida',
  },
  {
    key: 'ia', path: '/integracion-inteligencia-artificial/', short: 'IA',
    name: 'Inteligencia artificial y automatización',
    outcome: 'IA y automatización que te quitan tareas',
    desc: 'Asistentes que responden por ti, lectura automática de documentos y tareas repetitivas que se hacen solas.',
    benefit: 'Menos horas copiando datos y respondiendo lo mismo, con una persona revisando lo importante.',
    tech: ['API de OpenAI', 'Automatizaciones', 'Integraciones'],
    from: 'Desde 200 € sobre tu web',
  },
  {
    key: 'mant', path: '/mantenimiento-web/', short: 'Mantenimiento',
    name: 'Mantenimiento y mejora web',
    outcome: 'Tu web siempre a punto, también la que ya tienes',
    desc: 'Tu web siempre online, rápida y al día. También reviso y mejoro webs que ya tienes.',
    benefit: 'Cambios cuando los necesitas, velocidad vigilada y nada que caduque sin avisar.',
    tech: ['Core Web Vitals', 'Seguridad', 'Search Console'],
    from: 'Desde 15 €/mes',
  },
];

// Demos ficticias: fuente única para la home, el índice /demos/ y cada demo.
export const DEMOS = [
  {
    slug: 'aurea-estates', name: 'Aurea Estates', sector: 'Inmobiliaria de lujo',
    pitch: 'Una web editorial para vender casas que se recuerdan.',
    features: ['Buscador y filtros', 'Fichas con galería', 'Contacto por inmueble'],
    img: 'aurea-estates/hero', alt: 'Villa contemporánea con piscina al atardecer',
    font: 'Cormorant', tone: '#efe7da',
    fit: 'Inmobiliarias, promotoras, alquiler vacacional y agentes independientes.',
  },
  {
    slug: 'noir-atelier', name: 'Noir Atelier', sector: 'Moda premium',
    pitch: 'Catálogo minimalista con variantes, tallas y bolsa de compra.',
    features: ['Catálogo filtrable', 'Tallas y colores', 'Bolsa de compra'],
    img: 'noir-atelier/hero', alt: 'Modelo con americana de cuadros en la calle',
    font: 'Bodoni Moda', tone: '#f4f2ee',
    fit: 'Tiendas de moda, marcas de autor, joyería y complementos.',
  },
  {
    slug: 'sora-wellness', name: 'Sora Wellness', sector: 'Bienestar y estética',
    pitch: 'Tratamientos claros y citas en cuatro pasos, sin llamadas.',
    features: ['Tratamientos', 'Reserva de citas', 'Formulario validado'],
    img: 'sora-wellness/hero', alt: 'Frasco de aceite ámbar sobre un pedestal con luz natural',
    font: 'Fraunces', tone: '#e9e4da',
    fit: 'Centros de estética, fisioterapia, spas, psicología y consultas.',
  },
  {
    slug: 'forge-fitness', name: 'Forge Fitness', sector: 'Gimnasio boutique',
    pitch: 'Energía, horarios claros y un selector de planes que vende.',
    features: ['Horario semanal', 'Selector de planes', 'Clase de prueba'],
    img: 'forge-fitness/hero', alt: 'Atleta levantando una barra en un gimnasio a oscuras',
    font: 'Anton', tone: '#e4ff3a',
    fit: 'Gimnasios, estudios de entrenamiento, box de crossfit y entrenadores personales.',
  },
  {
    slug: 'veloce-automotive', name: 'Veloce Automotive', sector: 'Concesionario premium',
    pitch: 'Stock filtrable, fichas técnicas y financiación orientativa.',
    features: ['Stock con filtros', 'Fichas técnicas', 'Calculadora de cuota'],
    img: 'veloce-automotive/hero', alt: 'Deportivo gris aparcado junto a un puerto deportivo al anochecer',
    font: 'Michroma', tone: '#e5392f',
    fit: 'Concesionarios, compraventa de vehículos, motos, náutica y alquiler.',
  },
  {
    slug: 'flowbook', name: 'Flowbook', sector: 'SaaS de reservas',
    pitch: 'Landing de producto y un panel de citas que funciona de verdad.',
    features: ['Calendario semanal', 'Estados de cita', 'Panel con métricas'],
    img: null, alt: '',
    font: 'Manrope', tone: '#14b8a6',
    fit: 'Productos SaaS, herramientas internas, paneles de gestión y startups.',
  },
];

export const NAV = [
  { key: 'demos', href: '/demos/', label: 'Demos' },
  { key: 'servicios', href: '/#servicios', label: 'Servicios' },
  { key: 'precios', href: '/#presupuesto', label: 'Precios' },
  { key: 'sobre', href: '/sobre-mi/', label: 'Sobre mí' },
  { key: 'blog', href: '/blog/', label: 'Blog' },
];

export const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = p => ORIGIN + p;

export const wa = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z"/></svg>';
export const ARR = '<span class="arr" aria-hidden="true">→</span>';

// <img> responsive para una foto de las demos (`demo/nombre`), con 800 y 1600 px.
export const photo = (key, alt, { sizes = '100vw', eager = false, cls = '' } = {}) => {
  const m = IMAGES[key];
  if (!m) throw new Error(`Imagen desconocida: ${key}`);
  const [demo, name] = key.split('/');
  const base = `/assets/demos/${demo}/img/${name}`;
  return `<img${cls ? ` class="${cls}"` : ''} src="${base}-800.webp" srcset="${base}-800.webp 800w, ${base}-1600.webp 1600w" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
};

// Texto de cabecera dividido en líneas para la revelación progresiva.
export const lines = (arr, tag = 'span') => arr.map((l, i) => `<span class="ln"><${tag} style="--d:${i}">${l}</${tag}></span>`).join('');

// ---------- Datos estructurados comunes ----------
export const PERSON_ID = ORIGIN + '/#alvaro';
export const WEBSITE_ID = ORIGIN + '/#website';

export const personNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  alternateName: 'Álvaro Sánchez Ortega',
  jobTitle: 'Desarrollador Full Stack',
  description: 'Desarrollador Full Stack independiente. Diseña y programa webs, sistemas de reservas, aplicaciones web y software a medida para autónomos y pequeñas empresas.',
  url: ORIGIN + '/sobre-mi/',
  email: 'mailto:' + EMAIL,
  address: { '@type': 'PostalAddress', addressLocality: 'Málaga', addressRegion: 'Andalucía', addressCountry: 'ES' },
  knowsAbout: ['Desarrollo web', 'Desarrollo Full Stack', 'Aplicaciones web', 'Sistemas de reservas online', 'Integración de inteligencia artificial', 'Automatización de procesos', 'SEO técnico', 'Angular', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Spring Boot', 'MySQL', 'MongoDB', 'Firebase'],
  knowsLanguage: 'es',
  brand: { '@type': 'Brand', name: BRAND },
  sameAs: [GITHUB],
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: ORIGIN + '/',
  name: BRAND,
  alternateName: 'sanchezdevelop.com',
  inLanguage: 'es-ES',
  publisher: { '@id': PERSON_ID },
});

export const breadcrumbNode = (path, crumbs) => ({
  '@type': 'BreadcrumbList',
  '@id': abs(path) + '#breadcrumb',
  itemListElement: crumbs.map(([name, p], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: abs(p),
  })),
});

export const serviceNode = ({ path, name, serviceType, description, minPrice, unitText }) => {
  const node = {
    '@type': 'Service',
    '@id': abs(path) + '#service',
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { '@id': PERSON_ID },
    areaServed: { '@type': 'Country', name: 'España' },
  };
  if (minPrice) {
    node.offers = {
      '@type': 'Offer',
      url: abs(path),
      priceCurrency: 'EUR',
      priceSpecification: unitText
        ? { '@type': 'UnitPriceSpecification', minPrice, priceCurrency: 'EUR', unitCode: 'MON', unitText }
        : { '@type': 'PriceSpecification', minPrice, priceCurrency: 'EUR' },
    };
  }
  return node;
};

// ---------- Componentes HTML ----------
export const sectionHead = ({ idx, title, lede, id }) => `
        <div class="sh">
          ${idx ? `<p class="idx" data-rv>${idx}</p>` : ''}
          <h2 class="t-xl"${id ? ` id="${id}"` : ''} data-rv style="--d:1">${title}</h2>
          ${lede ? `<p class="lede" data-rv style="--d:2">${lede}</p>` : ''}
        </div>`;

export const faq = (items, title = 'Preguntas frecuentes') => `
    <section class="sec" id="dudas" aria-labelledby="dudas-t">
      <div class="wrap">
        <div class="sh"><p class="idx">Dudas</p><h2 class="t-lg" id="dudas-t">${title}</h2></div>
        <div class="faq">
${items.map(([q, a]) => `          <details>
            <summary>${q}<i aria-hidden="true"></i></summary>
            <div class="ans">${a}</div>
          </details>`).join('\n')}
        </div>
      </div>
    </section>`;

export const finalCta = ({ title, text, waText }) => `
    <section class="final" aria-labelledby="final-t">
      <div class="wrap">
        <p class="idx" style="justify-content:center">Siguiente paso</p>
        <h2 class="t-xl" id="final-t" style="margin-top:22px">${title}</h2>
        <p class="lede">${text}</p>
        <div class="ctas">
          <a class="btn lg" href="/contacto/" data-cta="presupuesto">Pedir presupuesto ${ARR}</a>
          <a class="btn lg ghost" href="${wa(waText)}" target="_blank" rel="noopener" data-cta="whatsapp">${WA_ICON}WhatsApp</a>
        </div>
        <a class="mail" href="mailto:${EMAIL}" data-cta="email">${EMAIL}</a>
      </div>
    </section>`;

export const serviceCards = (exclude = []) => `
        <div class="cards">
${SERVICES.filter(s => !exclude.includes(s.key)).map(s => `          <a class="card" href="${s.path}">
            <h3>${s.name}</h3>
            <p>${s.desc}</p>
            <p class="pr">${s.from}</p>
            <span class="go">Ver servicio</span>
          </a>`).join('\n')}
        </div>`;

const EXTRA = {
  precio: ['/blog/cuanto-cuesta-una-pagina-web/', 'Cuánto cuesta una página web', 'Qué hace subir o bajar el precio de una web y cómo comparar presupuestos sin llevarte sustos.', 'Leer artículo'],
  sobre: ['/sobre-mi/', 'Sobre mí', 'Quién soy, cómo trabajo y con qué tecnologías.', 'Leer más'],
  demos: ['/demos/', 'Las seis demos', 'Webs navegables de inmobiliaria, moda, bienestar, fitness, automoción y SaaS.', 'Explorar demos'],
};
for (const d of DEMOS) EXTRA[d.slug] = [`/demos/${d.slug}/`, `Demo: ${d.name}`, `${d.sector}. ${d.pitch}`, 'Abrir demo'];

export const related = (keys, title = 'También te puede interesar') => `
    <section class="sec" aria-labelledby="rel-t">
      <div class="wrap">
        <div class="sh"><p class="idx">Sigue explorando</p><h2 class="t-md" id="rel-t">${title}</h2></div>
        <div class="cards">
${keys.map(k => {
    const s = SERVICES.find(x => x.key === k);
    if (s) return `          <a class="card" href="${s.path}"><h3>${s.name}</h3><p>${s.desc}</p><span class="go">Ver servicio</span></a>`;
    const e = EXTRA[k];
    if (!e) throw new Error(`Enlace relacionado desconocido: ${k}`);
    return `          <a class="card" href="${e[0]}"><h3>${e[1]}</h3><p>${e[2]}</p><span class="go">${e[3]}</span></a>`;
  }).join('\n')}
        </div>
      </div>
    </section>`;

export const PROJECT_TYPES = [
  ['web', 'Una web para mi negocio'],
  ['reservas', 'Reservas, citas o pedidos online'],
  ['tienda', 'Tienda online'],
  ['app', 'Aplicación o software a medida'],
  ['ia', 'IA o automatización'],
  ['mant', 'Mejorar o mantener mi web'],
  ['otro', 'Otra cosa'],
];

// Formulario de contacto (assets/js/contact.js). Prepara el mensaje en WhatsApp o email.
export const contactForm = (id = 'cf') => `
          <form class="form" data-contact novalidate aria-describedby="${id}-how">
            <div class="row">
              <div class="fld">
                <label for="${id}-name">Nombre</label>
                <input id="${id}-name" name="name" autocomplete="name" maxlength="80" required aria-describedby="${id}-name-err">
                <p class="err" id="${id}-name-err" hidden></p>
              </div>
              <div class="fld">
                <label for="${id}-contact">Email o teléfono</label>
                <input id="${id}-contact" name="contact" autocomplete="email" maxlength="120" required aria-describedby="${id}-contact-hint ${id}-contact-err">
                <p class="hint" id="${id}-contact-hint">Para poder responderte.</p>
                <p class="err" id="${id}-contact-err" hidden></p>
              </div>
            </div>
            <div class="fld">
              <label for="${id}-type">Qué necesitas</label>
              <select id="${id}-type" name="type" required aria-describedby="${id}-type-err">
                <option value="">Elige una opción</option>
${PROJECT_TYPES.map(([v, l]) => `                <option value="${v}">${l}</option>`).join('\n')}
              </select>
              <p class="err" id="${id}-type-err" hidden></p>
            </div>
            <div class="fld">
              <label for="${id}-msg">Cuéntame tu proyecto</label>
              <textarea id="${id}-msg" name="msg" maxlength="1500" required placeholder="A qué se dedica tu negocio y qué te gustaría conseguir." aria-describedby="${id}-msg-err"></textarea>
              <p class="err" id="${id}-msg-err" hidden></p>
            </div>
            <div class="check-wrap">
              <label class="check"><input type="checkbox" name="privacy" required aria-describedby="${id}-privacy-err"> <span>He leído la <a href="/privacidad/">política de privacidad</a>.</span></label>
              <p class="err" id="${id}-privacy-err" hidden></p>
            </div>
            <div class="ctas" style="margin-top:6px">
              <button class="btn lg" type="submit" value="wa">Enviar por WhatsApp ${ARR}</button>
              <button class="btn lg ghost" type="submit" value="email">Enviar por email</button>
            </div>
            <p class="hint muted" id="${id}-how" style="font-size:.88rem">Al enviar se abre WhatsApp o tu programa de correo con el mensaje ya escrito, y solo tienes que pulsar enviar. Esta web no guarda tus datos.</p>
            <div class="form-status" role="status" aria-live="polite" hidden></div>
          </form>`;
