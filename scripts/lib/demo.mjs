// Plantilla de las demos ficticias. Cada demo tiene su propia identidad (fuentes, CSS, JS);
// aquí solo va lo común: metadatos (noindex), barra de demostración, cierre comercial y kit.
import { head } from './layout.mjs';
import { ASSET_V, DEMOS, esc } from './site.mjs';

export const demoBar = slug => {
  const d = DEMOS.find(x => x.slug === slug);
  return `
  <div class="dk-bar" role="note" aria-label="Aviso de demostración">
    <a class="dk-back" href="/demos/"><span aria-hidden="true">←</span> Demos de Kódika</a>
    <span class="dk-tag"><b>Demo ficticia</b><span class="dk-hide-sm"> · ${esc(d.name)} no es un negocio real</span></span>
    <a class="dk-cta" href="/contacto/?demo=${slug}" data-cta="demo-${slug}">Quiero una web así <span aria-hidden="true">→</span></a>
  </div>`;
};

export const demoEnd = slug => {
  const d = DEMOS.find(x => x.slug === slug);
  const others = DEMOS.filter(x => x.slug !== slug).slice(0, 3);
  return `
  <aside class="dk-end" aria-labelledby="dk-end-t">
    <div class="dk-end-in">
      <p class="dk-mono">Demo de Kódika</p>
      <h2 id="dk-end-t">¿Te imaginas tu negocio con una web así?</h2>
      <p>${esc(d.name)} es un negocio ficticio: lo hemos diseñado y programado para enseñar lo que puede tener tu web. Las funciones que has probado se pueden adaptar a tu sector, tu marca y tu forma de trabajar.</p>
      <div class="dk-end-ctas">
        <a class="dk-btn" href="/contacto/?demo=${slug}" data-cta="demo-${slug}">Quiero una web así</a>
        <a class="dk-btn ghost" href="/demos/">Ver las demás demos</a>
      </div>
      <p class="dk-others">También: ${others.map(o => `<a href="/demos/${o.slug}/">${esc(o.name)}</a>`).join(' · ')}</p>
    </div>
  </aside>
  <a class="dk-pill" id="dkPill" href="/contacto/?demo=${slug}" data-cta="demo-${slug}"><span class="dk-dot" aria-hidden="true"></span>Demo de Kódika · <b>Quiero una así</b></a>`;
};

// page: { slug, path, title, description, themeColor, fonts: [url], css, js, body, data, bodyClass }
export function demoPage(page) {
  const d = DEMOS.find(x => x.slug === page.slug);
  if (!d) throw new Error(`Demo desconocida: ${page.slug}`);
  const html = `<!DOCTYPE html>
<html lang="es">

<head>
${head({ ...page, noindex: true, ogAlt: `${d.name}, demo ficticia de Kódika` })}
${(page.fonts || []).map(f => `  <link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`).join('\n')}
  <link rel="stylesheet" href="/assets/demos/kit.css?v=${ASSET_V}">
  <link rel="stylesheet" href="${page.css}?v=${ASSET_V}">
  <script>document.documentElement.classList.add('js')</script>
</head>

<body class="${page.bodyClass || ''}">
  <a class="dk-skip" href="#main">Saltar al contenido</a>
${demoBar(page.slug)}
${page.body}
${demoEnd(page.slug)}
${page.data ? `  <script type="application/json" id="demo-data">${JSON.stringify(page.data).replace(/</g, '\\u003c')}</script>` : ''}
  <script src="/assets/demos/kit.js?v=${ASSET_V}" defer></script>
  <script src="/assets/js/track.js?v=${ASSET_V}" defer></script>
  <script src="/_vercel/insights/script.js" defer></script>
  ${page.js ? `<script src="${page.js}?v=${ASSET_V}" defer></script>` : ''}
</body>

</html>
`;
  return { path: page.path, noindex: true, html, title: page.title };
}

// Formatos comunes para el HTML generado
export const eur = n => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export const num = n => n.toLocaleString('es-ES');
