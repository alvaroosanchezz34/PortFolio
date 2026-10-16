// Genera las páginas internas y el sitemap a partir de scripts/pages/*.mjs.
// Uso: npm run build  (sin dependencias; Node 18 o superior).
// La portada (index.html) se edita a mano; este script solo sincroniza su JSON-LD y el mapa del pie.
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { render, footMap } from './lib/layout.mjs';
import { ORIGIN, OG_DEFAULT, SERVICES, PERSON_ID, WEBSITE_ID, personNode, websiteNode } from './lib/site.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Fecha de la última revisión de contenido de la portada (para el sitemap).
const HOME_UPDATED = '2026-10-16';

const pages = [];
for (const f of readdirSync(join(ROOT, 'scripts/pages')).filter(f => f.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(join(ROOT, 'scripts/pages', f)).href);
  pages.push(...[].concat(mod.default));
}

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Ruta duplicada: ${p.path}`);
  seen.add(p.path);
  const out = p.out || join(p.path.replace(/^\//, ''), 'index.html');
  const file = join(ROOT, out);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(p));
  console.log('✓', out);
}

const urls = [
  { loc: ORIGIN + '/', lastmod: HOME_UPDATED },
  ...pages.filter(p => !p.noindex).map(p => ({ loc: ORIGIN + p.path, lastmod: p.updated })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
console.log(`✓ sitemap.xml (${urls.length} URLs)`);

// ---------- Portada: JSON-LD y mapa del pie, sincronizados con el resto del sitio ----------
const homeGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...personNode(),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de SanchezDevelop',
        itemListElement: SERVICES.map(s => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', '@id': ORIGIN + s.path + '#service', name: s.name, url: ORIGIN + s.path },
        })),
      },
    },
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': ORIGIN + '/#webpage',
      url: ORIGIN + '/',
      name: 'Desarrollador web freelance en Málaga | SanchezDevelop',
      description: 'Webs a medida, reservas online, tiendas y aplicaciones para negocios de toda España. Precio cerrado, trato directo y ves tu web antes de pagar.',
      inLanguage: 'es-ES',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: ORIGIN + OG_DEFAULT },
      dateModified: HOME_UPDATED,
    },
  ],
};
const homeFile = join(ROOT, 'index.html');
let home = readFileSync(homeFile, 'utf8');
const inject = (html, key, content) => {
  const re = new RegExp(`(<!-- ${key}:start[^>]*-->)[\\s\\S]*?(\\s*<!-- ${key}:end -->)`);
  if (!re.test(html)) throw new Error(`Marcador ${key} no encontrado en index.html`);
  return html.replace(re, (_, a, b) => `${a}\n${content}${b}`);
};
home = inject(home, 'jsonld', `  <script type="application/ld+json">\n${JSON.stringify(homeGraph, null, 2).replace(/</g, '\\u003c')}\n  </script>`);
home = inject(home, 'footmap', '      ' + footMap());
writeFileSync(homeFile, home);
console.log('✓ index.html (JSON-LD y mapa del pie)');
