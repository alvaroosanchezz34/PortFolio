// Plantilla común del sitio: <head> con metadatos y JSON-LD, cabecera, menú, migas, pie y scripts.
import {
  ORIGIN, BRAND, EMAIL, OG_DEFAULT, ASSET_V, NAV, SERVICES, DEMOS, WA_ICON, ARR, GITHUB,
  esc, abs, wa, organizationNode, founderNode, websiteNode, breadcrumbNode, ORG_ID, WEBSITE_ID,
} from './site.mjs';

const footer = () => `
  <footer class="ft">
    <div class="wide">
      <div class="ft-top">
        <div class="ft-brand">
          <a href="/" class="hd-logo" aria-label="Kódika, ir al inicio"><img src="/assets/img/kodika.svg" alt="Kódika" width="114" height="19"></a>
          <p>Estudio de diseño y desarrollo digital. Webs, reservas online y software a medida. Desde Málaga, para toda España.</p>
          <div class="ctas"><a class="btn sm" href="/contacto/" data-cta="presupuesto">Pedir presupuesto ${ARR}</a></div>
        </div>
        <nav aria-labelledby="ft-s">
          <h2 id="ft-s">Servicios</h2>
          <ul>
${SERVICES.map(s => `            <li><a href="${s.path}">${s.name}</a></li>`).join('\n')}
          </ul>
        </nav>
        <nav aria-labelledby="ft-d">
          <h2 id="ft-d">Demos</h2>
          <ul>
            <li><a href="/demos/">Todas las demos</a></li>
${DEMOS.map(d => `            <li><a href="/demos/${d.slug}/">${d.name}</a></li>`).join('\n')}
          </ul>
        </nav>
        <nav aria-labelledby="ft-c">
          <h2 id="ft-c">Estudio</h2>
          <ul>
            <li><a href="/sobre-kodika/">Sobre Kódika</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/#presupuesto">Calcular presupuesto</a></li>
            <li><a href="/contacto/">Contacto</a></li>
            <li><a href="https://wa.me/34697898574" target="_blank" rel="noopener" data-cta="whatsapp">WhatsApp</a></li>
            <li><a href="mailto:${EMAIL}" data-cta="email">Email</a></li>
            <li><a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </nav>
      </div>
      <div class="ft-word" aria-hidden="true"><img src="/assets/img/kodika.svg" alt="" width="1360" height="228" loading="lazy"></div>
      <div class="ft-bot">
        <span>© <span data-year>2026</span> Kódika · Málaga, España</span>
        <span><a href="/privacidad/">Privacidad</a> · Trabajo en remoto para toda España</span>
      </div>
    </div>
  </footer>`;

const header = active => `
  <a class="skip" href="#main">Saltar al contenido</a>
  <header class="hd" id="hd">
    <div class="wide hd-in">
      <a href="/" class="hd-logo" aria-label="Kódika, ir al inicio"><img src="/assets/img/kodika.svg" alt="Kódika" width="114" height="19"></a>
      <nav class="hd-nav" aria-label="Principal">
${NAV.map(n => `        <a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n')}
      </nav>
      <a class="btn sm" href="/contacto/" data-cta="presupuesto">Pedir presupuesto ${ARR}</a>
      <button class="hd-menu" id="menuBtn" aria-expanded="false" aria-controls="menu"><i aria-hidden="true"></i><span>Menú</span></button>
    </div>
  </header>
  <div class="menu" id="menu" hidden>
    <nav aria-label="Menú">
      <ol>
        <li style="--i:0"><a href="/">Inicio</a></li>
${NAV.map((n, i) => `        <li style="--i:${i + 1}"><a href="${n.href}">${n.label}</a></li>`).join('\n')}
        <li style="--i:${NAV.length + 1}"><a href="/contacto/">Contacto</a></li>
      </ol>
    </nav>
    <div class="menu-foot">
      <a class="btn lg" href="/contacto/" data-cta="presupuesto">Pedir presupuesto ${ARR}</a>
      <a class="btn lg ghost" href="${wa('Hola, he visto la web de Kódika y quiero información.')}" target="_blank" rel="noopener" data-cta="whatsapp">${WA_ICON}WhatsApp</a>
    </div>
  </div>`;

const crumbsHtml = crumbs => `
        <nav class="crumbs" aria-label="Migas de pan">
          <ol>
${crumbs.map(([name, p], i) => i === crumbs.length - 1
    ? `            <li><span aria-current="page">${name}</span></li>`
    : `            <li><a href="${p}">${name}</a></li>`).join('\n')}
          </ol>
        </nav>`;

export const hero = page => `
    <section class="phero" aria-labelledby="h1">
      <div class="wrap">${page.crumbs ? crumbsHtml(page.crumbs) : ''}
        <h1 class="t-xl" id="h1">${page.kick ? `<span class="eyebrow" style="margin-bottom:22px">${page.kick}</span>` : ''}${page.h1}</h1>
        ${page.lead ? `<p class="lede">${page.lead}</p>` : ''}${page.facts ? `
        <ul class="facts">
${page.facts.map(f => `          <li>${f}</li>`).join('\n')}
        </ul>` : ''}${page.heroCtas === false ? '' : `
        <div class="ctas">
          <a class="btn lg" href="/contacto/" data-cta="presupuesto">Pedir presupuesto ${ARR}</a>
          ${page.heroLink || `<a class="lnk" href="/demos/">Ver las demos ${ARR}</a>`}
        </div>`}
      </div>
    </section>`;

export const head = page => {
  const url = abs(page.path);
  const ogImage = abs(page.ogImage || OG_DEFAULT);
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  ${page.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
  <meta name="theme-color" content="${page.themeColor || '#0b0f1a'}">
  <meta name="author" content="${BRAND}">
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  ${page.noindex ? '' : `<meta property="og:url" content="${url}">`}
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(page.ogAlt || 'Kódika: estudio de diseño y desarrollo digital')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/assets/img/logo.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/img/favicon-96.png" type="image/png" sizes="96x96">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">`;
};

export function render(page) {
  const url = abs(page.path);
  const ogImage = abs(page.ogImage || OG_DEFAULT);
  const graph = [
    { ...organizationNode(), ...(page.orgExtra || {}) },
    founderNode(),
    websiteNode(),
    {
      '@type': page.pageType || 'WebPage',
      '@id': url + '#webpage',
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'es-ES',
      isPartOf: { '@id': WEBSITE_ID },
      about: page.about ? { '@id': page.about } : { '@id': ORG_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      ...(page.crumbs ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
      ...(page.updated ? { dateModified: page.updated } : {}),
    },
    ...(page.crumbs ? [breadcrumbNode(page.path, page.crumbs)] : []),
    ...(page.schema || []),
  ];
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)
    .replace(/</g, '\\u003c');
  const styles = ['/assets/css/site.css', ...(page.styles || [])];
  const scripts = ['/assets/js/site.js', '/assets/js/track.js', ...(page.scripts || [])];

  return `<!DOCTYPE html>
<html lang="es">

<head>
${head(page)}
  <link rel="preload" href="/assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
${(page.preload || []).map(p => `  <link rel="preload" href="${p}" as="font" type="font/woff2" crossorigin>`).join('\n')}
${styles.map(s => `  <link rel="stylesheet" href="${s}?v=${ASSET_V}">`).join('\n')}
  <script>document.documentElement.classList.add('js')</script>
  <script type="application/ld+json">
${jsonld}
  </script>
</head>

<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
${header(page.nav)}

  <main id="main">${page.hideHero ? '' : hero(page)}
${page.body}
  </main>
${footer()}

  <a class="fab" id="fab" href="${wa(page.waText || 'Hola, he visto la web de Kódika y quiero información.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-cta="whatsapp">${WA_ICON}</a>

${scripts.map(s => `  <script src="${s}?v=${ASSET_V}" defer></script>`).join('\n')}
  <script src="/_vercel/insights/script.js" defer></script>
</body>

</html>
`;
}

export { ORIGIN };
