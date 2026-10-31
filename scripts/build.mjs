// Genera todas las páginas HTML y el sitemap a partir de scripts/pages/**/*.mjs.
// Uso: npm run generate  (sin dependencias; Node 18 o superior).
// Cada módulo exporta una página o una lista de páginas:
//   { path, out?, title, description, body, ... }  → plantilla común (scripts/lib/layout.mjs)
//   { path, out?, html }                            → HTML ya completo (las demos)
import { writeFileSync, mkdirSync, readdirSync, readFileSync, existsSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { render } from './lib/layout.mjs';
import { ORIGIN } from './lib/site.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = join(ROOT, 'scripts/pages');
const MANIFEST = join(ROOT, 'scripts/.generated.json');

const walk = dir => readdirSync(dir).sort().flatMap(n => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : n.endsWith('.mjs') ? [p] : [];
});

const pages = [];
for (const f of walk(PAGES_DIR)) {
  const mod = await import(pathToFileURL(f).href);
  if (mod.default) pages.push(...[].concat(mod.default));
}

const outputs = [];
const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Ruta duplicada: ${p.path}`);
  seen.add(p.path);
  const out = p.out || join(p.path.replace(/^\//, ''), 'index.html');
  const file = join(ROOT, out);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, p.html || render(p));
  outputs.push(out.replace(/\\/g, '/'));
  console.log('✓', out);
}

// Borra las páginas generadas en builds anteriores que ya no existen.
if (existsSync(MANIFEST)) {
  for (const old of JSON.parse(readFileSync(MANIFEST, 'utf8'))) {
    if (outputs.includes(old)) continue;
    const f = join(ROOT, old);
    if (existsSync(f)) { rmSync(f); console.log('✗ eliminada', old); }
    let d = dirname(f);
    while (d !== ROOT && existsSync(d) && !readdirSync(d).length) { rmSync(d, { recursive: true }); d = dirname(d); }
  }
}
writeFileSync(MANIFEST, JSON.stringify(outputs.sort(), null, 1) + '\n');

const urls = pages
  .filter(p => !p.noindex)
  .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)))
  .map(p => ({ loc: ORIGIN + p.path, lastmod: p.updated }));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
console.log(`✓ sitemap.xml (${urls.length} URLs) · ${relative(ROOT, MANIFEST)}`);
