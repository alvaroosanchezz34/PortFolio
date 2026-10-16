// Plantilla común: <head> con metadatos y JSON-LD, cabecera, migas, pie y scripts.
import {
  ORIGIN, BRAND, EMAIL, OG_DEFAULT, ASSET_V, NAV, SERVICES, WA_ICON,
  esc, abs, wa, personNode, websiteNode, breadcrumbNode, PERSON_ID, WEBSITE_ID,
} from './site.mjs';

export const footMap = () => `<nav class="foot-map" aria-label="Mapa del sitio">
        <div>
          <p>Servicios</p>
          <ul>
${SERVICES.map(s => `            <li><a href="${s.path}">${s.name}</a></li>`).join('\n')}
          </ul>
        </div>
        <div>
          <p>Proyectos</p>
          <ul>
            <li><a href="/proyectos/">Todos los proyectos</a></li>
            <li><a href="/proyectos/resumeai/">ResumeAI</a></li>
            <li><a href="/proyectos/workly/">Workly</a></li>
          </ul>
        </div>
        <div>
          <p>SanchezDevelop</p>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/sobre-mi/">Sobre mí</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/#presupuesto">Calcular presupuesto</a></li>
            <li><a href="/privacidad/">Privacidad</a></li>
          </ul>
        </div>
        <div>
          <p>Contacto</p>
          <ul>
            <li><a href="/contacto/">Pedir presupuesto</a></li>
            <li><a href="https://wa.me/34697898574" target="_blank" rel="noopener" data-cta="whatsapp">WhatsApp</a></li>
            <li><a href="mailto:${EMAIL}" data-cta="email">Email</a></li>
            <li><a href="https://github.com/alvaroosanchezz34" target="_blank" rel="noopener me">GitHub</a></li>
          </ul>
        </div>
      </nav>`;

const footer = () => `
  <footer class="foot">
    <div class="wide">
      ${footMap()}
      <div class="fb">
        <span>© <span id="year">2026</span> Álvaro Sánchez · SanchezDevelop · Málaga, España</span>
        <span>Desarrollo web y software a medida para toda España</span>
      </div>
    </div>
  </footer>`;

const header = active => `
  <a class="skip" href="#main">Saltar al contenido</a>
  <header class="lnav" id="lnav">
    <div class="wide lnav-in">
      <a href="/" class="brand"><img src="/assets/img/logo-sd.webp" alt="" width="26" height="26">sanchezdevelop</a>
      <div class="lnav-r">
        <nav class="lnav-links" id="links" aria-label="Principal">
${NAV.map(n => `          <a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n')}
        </nav>
        <button class="chev" id="chev" aria-label="Mostrar menú" aria-expanded="false" aria-controls="links"><svg
            viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M2 5l5 5 5-5" />
          </svg></button>
        <a class="btn sm" href="/contacto/">Presupuesto</a>
      </div>
    </div>
  </header>`;

const crumbsHtml = crumbs => `
          <nav class="crumbs" aria-label="Migas de pan">
            <ol>
${crumbs.map(([name, p], i) => i === crumbs.length - 1
    ? `              <li><span aria-current="page">${name}</span></li>`
    : `              <li><a href="${p}">${name}</a></li>`).join('\n')}
            </ol>
          </nav>`;

export const hero = page => `
    <section class="phero dark" aria-labelledby="h1">
      <div class="wrap">${page.crumbs ? crumbsHtml(page.crumbs) : ''}
        ${page.kick ? `<p class="kick">${page.kick}</p>` : ''}
        <h1 class="h-xl" id="h1">${page.h1}</h1>
        ${page.lead ? `<p class="lead">${page.lead}</p>` : ''}${page.facts ? `
        <ul class="facts">
${page.facts.map(f => `          <li>${f}</li>`).join('\n')}
        </ul>` : ''}${page.heroCtas === false ? '' : `
        <div class="ctas">
          <a class="btn" href="${wa(page.waText || 'Hola Álvaro, he visto tu web y quiero información.')}" target="_blank" rel="noopener" data-cta="whatsapp">Pedir presupuesto</a>
          ${page.heroLink || '<a class="lnk" href="/#demo">Prueba la demo</a>'}
        </div>`}
      </div>
    </section>`;

export function render(page) {
  const url = abs(page.path);
  const ogImage = abs(page.ogImage || OG_DEFAULT);
  const graph = [
    personNode(),
    websiteNode(),
    {
      '@type': page.pageType || 'WebPage',
      '@id': url + '#webpage',
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'es-ES',
      isPartOf: { '@id': WEBSITE_ID },
      about: page.about ? { '@id': page.about } : { '@id': PERSON_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      ...(page.crumbs ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
      ...(page.updated ? { dateModified: page.updated } : {}),
    },
    ...(page.crumbs ? [breadcrumbNode(page.path, page.crumbs)] : []),
    ...(page.schema || []),
  ];
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)
    .replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  ${page.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
  <meta name="theme-color" content="#000000">
  <meta name="author" content="Álvaro Sánchez">
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  ${page.noindex ? '' : `<meta property="og:url" content="${url}">`}
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(page.ogAlt || 'SanchezDevelop: webs y software a medida')}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/assets/img/favicon-96.png" type="image/png" sizes="96x96">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/inter-tight-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_V}">
  <script>document.documentElement.classList.add('js')</script>
  <script type="application/ld+json">
${jsonld}
  </script>
</head>

<body>
${header(page.nav)}

  <main id="main">${page.hideHero ? '' : hero(page)}
${page.body}
  </main>
${footer()}

  <a class="fab" href="${wa(page.waText || 'Hola Álvaro, he visto tu web y quiero información.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-cta="whatsapp">${WA_ICON}</a>

  <script src="/assets/js/site.js?v=${ASSET_V}" defer></script>
  <script src="/assets/js/track.js?v=${ASSET_V}" defer></script>
</body>

</html>
`;
}

export { ORIGIN };
