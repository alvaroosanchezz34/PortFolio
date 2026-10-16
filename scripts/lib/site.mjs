// Datos del sitio y componentes compartidos por todas las páginas generadas.
// Todo lo que aparece aquí es información real y visible en la web: no añadas
// direcciones, teléfonos, valoraciones ni perfiles que no existan.

export const ORIGIN = 'https://sanchezdevelop.com';
export const BRAND = 'SanchezDevelop';
export const PERSON_NAME = 'Álvaro Sánchez';
export const EMAIL = 'alvarosanchezortega34@gmail.com';
export const WA_NUMBER = '34697898574';
export const GITHUB = 'https://github.com/alvaroosanchezz34';
export const OG_DEFAULT = '/assets/og/sanchezdevelop.jpg';
// Versión de los recursos estáticos: súbela cuando cambien site.css o site.js.
export const ASSET_V = '1';

export const SERVICES = [
  {
    key: 'webs', path: '/diseno-web-empresas/', short: 'Webs',
    name: 'Diseño web para empresas',
    desc: 'Webs a medida para negocios locales, autónomos y pymes. Rápidas, claras y pensadas para que te contacten.',
    from: 'Desde 250 €',
  },
  {
    key: 'reservas', path: '/sistemas-reservas-online/', short: 'Reservas',
    name: 'Reservas, citas y pedidos online',
    desc: 'Que tus clientes reserven mesa, pidan cita o hagan un pedido desde tu web, a cualquier hora.',
    from: 'Desde 450 € con la web',
  },
  {
    key: 'apps', path: '/aplicaciones-web/', short: 'Apps a medida',
    name: 'Aplicaciones web y software a medida',
    desc: 'Plataformas SaaS, paneles de gestión, portales de clientes y APIs, del diseño al despliegue.',
    from: 'Presupuesto a medida',
  },
  {
    key: 'ia', path: '/integracion-inteligencia-artificial/', short: 'IA',
    name: 'Inteligencia artificial y automatización',
    desc: 'Asistentes que responden por ti, lectura automática de documentos y tareas repetitivas que se hacen solas.',
    from: 'Desde 200 € sobre tu web',
  },
  {
    key: 'mant', path: '/mantenimiento-web/', short: 'Mantenimiento',
    name: 'Mantenimiento y mejora web',
    desc: 'Tu web siempre online, rápida y al día. También reviso y mejoro webs que ya tienes.',
    from: 'Desde 15 €/mes',
  },
];

export const NAV = [
  ...SERVICES.map(s => ({ key: s.key, href: s.path, label: s.short })),
  { key: 'proyectos', href: '/proyectos/', label: 'Proyectos' },
  { key: 'blog', href: '/blog/', label: 'Blog' },
];

export const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = p => ORIGIN + p;

export const wa = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z"/></svg>';

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
    availableLanguage: 'es',
  };
  if (minPrice) {
    node.offers = {
      '@type': 'Offer',
      url: abs(path),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification', minPrice, priceCurrency: 'EUR',
        ...(unitText ? { unitText } : {}),
      },
    };
  }
  return node;
};

// ---------- Componentes HTML ----------
export const faq = (items, title = 'Preguntas frecuentes') => `
    <section class="sec soft" id="dudas" aria-labelledby="dudas-t">
      <div class="wrap">
        <div class="sec-head"><h2 class="h-lg" id="dudas-t">${title}</h2></div>
        <div class="faq">
${items.map(([q, a]) => `          <details>
            <summary>${q}<i aria-hidden="true"></i></summary>
            <div class="ans">${a}</div>
          </details>`).join('\n')}
        </div>
      </div>
    </section>`;

export const finalCta = ({ title, text, waText, mailSubject = 'Quiero un presupuesto' }) => `
    <section class="final dark" id="contacto" aria-labelledby="final-t">
      <div class="wrap">
        <h2 class="h-xl" id="final-t">${title}</h2>
        <p class="lead">${text}</p>
        <div class="ctas">
          <a class="btn lg wa" href="${wa(waText)}" target="_blank" rel="noopener" data-cta="whatsapp">${WA_ICON}Escribir por WhatsApp</a>
          <a class="lnk" href="${mailto(mailSubject, 'Hola Álvaro, te escribo desde tu web. Mi negocio es: ')}" data-cta="email">Mandar un email</a>
          <a class="lnk" href="/#presupuesto" data-cta="configurador">Calcular el precio</a>
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

export const related = (keys, title = 'También te puede interesar') => `
    <section class="sec" aria-labelledby="rel-t">
      <div class="wrap">
        <div class="sec-head"><h2 class="h-md" id="rel-t">${title}</h2></div>
        <div class="cards">
${keys.map(k => {
    const s = SERVICES.find(x => x.key === k);
    if (s) return `          <a class="card" href="${s.path}"><h3>${s.name}</h3><p>${s.desc}</p><span class="go">Ver servicio</span></a>`;
    const extra = {
      resumeai: ['/proyectos/resumeai/', 'Caso de estudio: ResumeAI', 'Plataforma de estudio con IA, suscripciones y pagos. Next.js, Node.js, MongoDB, OpenAI y Stripe.'],
      workly: ['/proyectos/workly/', 'Caso de estudio: Workly', 'Software de gestión para autónomos: clientes, facturas, gastos y contabilidad. React, Express y MySQL.'],
      precio: ['/blog/cuanto-cuesta-una-pagina-web/', 'Cuánto cuesta una página web', 'Qué hace subir o bajar el precio de una web y cómo comparar presupuestos sin llevarte sustos.'],
      sobre: ['/sobre-mi/', 'Sobre mí', 'Quién soy, cómo trabajo y con qué tecnologías.'],
    }[k];
    return `          <a class="card" href="${extra[0]}"><h3>${extra[1]}</h3><p>${extra[2]}</p><span class="go">Leer más</span></a>`;
  }).join('\n')}
        </div>
      </div>
    </section>`;
