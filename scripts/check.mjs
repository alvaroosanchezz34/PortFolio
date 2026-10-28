// Validación SEO y de enlaces de todo el sitio (sin dependencias).
// Uso: npm run check   ·   Sale con código 1 si encuentra errores.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://kodikadigital.com';
const SKIP = new Set(['node_modules', '.wrangler', '.git', 'docs', 'scripts', 'functions']);

const errors = [], warnings = [];
const err = (f, m) => errors.push(`✗ ${f}: ${m}`);
const warn = (f, m) => warnings.push(`! ${f}: ${m}`);

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (SKIP.has(n)) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

// /ruta/ <-> fichero
const fileToPath = f => {
  const r = '/' + relative(ROOT, f).replace(/\\/g, '/');
  return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
};
const pathToFile = p => {
  const clean = decodeURIComponent(p.split('#')[0].split('?')[0]);
  if (clean.endsWith('/')) { const idx = join(ROOT, clean, 'index.html'); return existsSync(idx) ? idx : null; }
  const direct = join(ROOT, clean);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  return null;
};

const strip = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i')) || [])[1];
const metas = (html, key, val) => [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => m[0]).filter(t => attr(t, key) === val);

const files = walk(ROOT);
const pages = new Map();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const path = fileToPath(f);
  const rel = relative(ROOT, f);
  const noindex = metas(html, 'name', 'robots').some(t => /noindex/i.test(attr(t, 'content') || ''));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const page = { f, rel, path, html, noindex, ids: new Set(ids), links: [] };
  pages.set(path, page);

  if (!/<html lang="es"/.test(html)) err(rel, 'falta <html lang="es">');
  const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupIds.length) err(rel, `ids duplicados: ${[...new Set(dupIds)].join(', ')}`);

  // Title y description
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map(m => m[1].trim());
  if (titles.length !== 1) err(rel, `debe haber 1 <title> (hay ${titles.length})`);
  page.title = titles[0] || '';
  if (page.title.length > 70) warn(rel, `title largo (${page.title.length} car.), puede cortarse en Google`);
  if (page.title.length < 20) warn(rel, `title muy corto (${page.title.length} car.)`);
  const desc = metas(html, 'name', 'description');
  if (desc.length !== 1) err(rel, `debe haber 1 meta description (hay ${desc.length})`);
  page.desc = desc[0] ? attr(desc[0], 'content') : '';
  if (page.desc && (page.desc.length < 70 || page.desc.length > 170)) warn(rel, `meta description de ${page.desc.length} car. (recomendado 70-170)`);
  if (metas(html, 'name', 'keywords').length) err(rel, 'meta keywords no aporta nada: quítala');

  // Encabezados
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) err(rel, `debe haber 1 <h1> (hay ${h1s.length})`);
  else if (strip(h1s[0][1]).length < 10) warn(rel, 'h1 muy corto o poco descriptivo');
  let prev = 0;
  for (const m of html.matchAll(/<h([1-6])\b/g)) {
    const lv = +m[1];
    if (prev && lv > prev + 1) { warn(rel, `salto de encabezado h${prev} → h${lv}`); break; }
    prev = lv;
  }

  // Canonical
  const canon = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map(m => attr(m[0], 'href'));
  if (noindex) {
    if (canon.length) err(rel, 'una página noindex no debe tener canonical');
  } else {
    if (canon.length !== 1) err(rel, `debe haber 1 canonical (hay ${canon.length})`);
    else if (canon[0] !== ORIGIN + path) err(rel, `canonical ${canon[0]} no coincide con ${ORIGIN + path}`);
  }
  page.canonical = canon[0];

  // Open Graph
  for (const k of ['og:title', 'og:description', 'og:image', 'og:type']) {
    if (metas(html, 'property', k).length !== 1) err(rel, `falta ${k}`);
  }
  const ogImg = metas(html, 'property', 'og:image')[0];
  if (ogImg) {
    const u = attr(ogImg, 'content');
    if (!u.startsWith(ORIGIN + '/')) err(rel, 'og:image debe ser una URL absoluta del dominio');
    else if (!pathToFile(u.slice(ORIGIN.length))) err(rel, `og:image no existe: ${u}`);
  }
  const ogUrl = metas(html, 'property', 'og:url')[0];
  if (!noindex && (!ogUrl || attr(ogUrl, 'content') !== page.canonical)) err(rel, 'og:url debe coincidir con el canonical');

  // Imágenes
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (attr(m[0], 'alt') === undefined) err(rel, `imagen sin alt: ${m[0].slice(0, 80)}`);
    if (!attr(m[0], 'width') || !attr(m[0], 'height')) warn(rel, `imagen sin width/height (riesgo de CLS): ${m[0].slice(0, 80)}`);
    const src = attr(m[0], 'src');
    if (src && src.startsWith('/') && !pathToFile(src)) err(rel, `imagen inexistente: ${src}`);
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length && !noindex) err(rel, 'sin datos estructurados');
  for (const b of blocks) {
    let data;
    try { data = JSON.parse(b[1]); } catch (e) { err(rel, `JSON-LD inválido: ${e.message}`); continue; }
    if (data['@context'] !== 'https://schema.org') err(rel, 'JSON-LD sin @context https://schema.org');
    const nodes = data['@graph'] || [data];
    const defined = new Set(nodes.map(n => n['@id']).filter(Boolean));
    const refs = [];
    const visit = (o, top) => {
      if (Array.isArray(o)) return o.forEach(x => visit(x));
      if (!o || typeof o !== 'object') return;
      if (!top && o['@id'] && Object.keys(o).length === 1) refs.push(o['@id']);
      if (!top && o['@id'] && o['@type']) defined.add(o['@id']);
      Object.values(o).forEach(v => visit(v));
    };
    nodes.forEach(n => { if (!n['@type']) err(rel, 'nodo JSON-LD sin @type'); visit(n, true); Object.values(n).forEach(v => visit(v)); });
    for (const r of refs) if (!defined.has(r)) warn(rel, `JSON-LD referencia un @id no definido en la página: ${r}`);
    for (const n of nodes) {
      if (n['@type'] === 'BreadcrumbList') {
        for (const it of n.itemListElement) {
          if (!it.item.startsWith(ORIGIN) || !pathToFile(it.item.slice(ORIGIN.length))) err(rel, `miga de pan a URL inexistente: ${it.item}`);
        }
      }
      for (const k of ['aggregateRating', 'review']) if (n[k]) err(rel, `JSON-LD con ${k}: no hay reseñas reales que lo respalden`);
    }
  }

  // Enlaces
  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attr(m[0], 'href');
    if (href === undefined) { err(rel, `<a> sin href: ${m[0].slice(0, 60)}`); continue; }
    if (/^(mailto:|tel:)/.test(href)) continue;
    if (/^https?:\/\//.test(href)) {
      if (href.startsWith(ORIGIN)) warn(rel, `enlace interno absoluto (mejor relativo): ${href}`);
      else if (attr(m[0], 'target') === '_blank' && !/noopener/.test(attr(m[0], 'rel') || '')) warn(rel, `target=_blank sin rel=noopener: ${href}`);
      continue;
    }
    page.links.push(href);
  }
}

// Resolución de enlaces internos y anclas
const inbound = new Map();
for (const page of pages.values()) {
  for (const raw of page.links) {
    if (raw === '#' || raw.startsWith('#/')) continue; // rutas por hash de las demos (las resuelve su JS)
    // enlaces relativos (app/, ../) respecto a la página
    const href = /^[./]|^[#?]/.test(raw) && !raw.startsWith('./') && !raw.startsWith('../') ? raw : new URL(raw, 'https://x' + page.path).pathname + (raw.includes('#') ? '#' + raw.split('#')[1] : '');
    const [p0, hash] = href.split('#');
    const p = p0.split('?')[0];
    const target = p === '' ? page : pages.get(p.endsWith('/') || p.endsWith('.html') ? p : p + '/');
    if (p !== '' && !target && !pathToFile(p)) { err(page.rel, `enlace roto: ${href}`); continue; }
    if (p !== '' && p !== page.path && target) inbound.set(target.path, (inbound.get(target.path) || 0) + 1);
    if (p !== '' && !p.endsWith('/') && !p.includes('.')) warn(page.rel, `enlace sin barra final (provoca una redirección 308): ${href}`);
    if (hash && target && !target.ids.has(hash)) err(page.rel, `ancla inexistente: ${href}`);
  }
}

// Títulos y descripciones duplicados
const dup = (key, label) => {
  const by = new Map();
  for (const p of pages.values()) if (!p.noindex) by.set(p[key], [...(by.get(p[key]) || []), p.rel]);
  for (const [v, list] of by) if (v && list.length > 1) err(list.join(', '), `${label} duplicado: «${v}»`);
};
dup('title', 'title');
dup('desc', 'meta description');

// Proyectos retirados del portfolio: no deben aparecer en nada publicado
// (páginas, CSS, JS, datos) ni en las fuentes que las generan.
const FORBIDDEN = /resume ?ai|resume-ai|workly/i;
const scanDirs = (dir, out = []) => {
  for (const n of readdirSync(dir)) {
    if (['node_modules', '.wrangler', '.git', 'docs', 'tests'].includes(n)) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) scanDirs(p, out);
    else if (/\.(html|js|mjs|css|json|xml|txt|webmanifest|md)$/.test(n) && n !== 'check.mjs') out.push(p);
  }
  return out;
};
for (const f of scanDirs(ROOT)) {
  const m = readFileSync(f, 'utf8').match(FORBIDDEN);
  if (m) err(relative(ROOT, f), `menciona un proyecto retirado del portfolio («${m[0]}»)`);
}

// Sitemap
const smFile = join(ROOT, 'sitemap.xml');
if (!existsSync(smFile)) err('sitemap.xml', 'no existe');
else {
  const sm = readFileSync(smFile, 'utf8');
  if (!sm.startsWith('<?xml') || !sm.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) err('sitemap.xml', 'formato no válido');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (new Set(locs).size !== locs.length) err('sitemap.xml', 'URLs duplicadas');
  for (const loc of locs) {
    const p = pages.get(loc.slice(ORIGIN.length));
    if (!loc.startsWith(ORIGIN + '/')) err('sitemap.xml', `URL fuera del dominio: ${loc}`);
    else if (!p) err('sitemap.xml', `URL sin página: ${loc}`);
    else if (p.noindex) err('sitemap.xml', `URL con noindex: ${loc}`);
    else if (p.canonical !== loc) err('sitemap.xml', `URL no canónica: ${loc}`);
  }
  for (const p of pages.values()) if (!p.noindex && !locs.includes(ORIGIN + p.path)) err('sitemap.xml', `falta ${p.path}`);
  for (const m of sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) if (!/^\d{4}-\d{2}-\d{2}$/.test(m[1])) err('sitemap.xml', `lastmod no válido: ${m[1]}`);
}

// robots.txt
const robots = existsSync(join(ROOT, 'robots.txt')) ? readFileSync(join(ROOT, 'robots.txt'), 'utf8') : null;
if (!robots) err('robots.txt', 'no existe');
else {
  if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) err('robots.txt', 'no declara el sitemap');
  if (/^Disallow:\s*\/\s*$/m.test(robots)) err('robots.txt', 'bloquea todo el sitio');
  if (/^Disallow:\s*\/assets/m.test(robots)) err('robots.txt', 'bloquea CSS/JS/imágenes necesarios para renderizar');
}

// 404 y páginas huérfanas
const nf = pages.get('/404.html');
if (!nf) err('404.html', 'no existe: Cloudflare Pages serviría la portada con código 200 en cualquier URL');
else if (!nf.noindex) err('404.html', 'debe llevar noindex');
for (const p of pages.values()) {
  if (p.noindex || p.path === '/') continue;
  if (!inbound.get(p.path)) err(p.rel, 'página huérfana: ninguna otra página enlaza a ella');
}

console.log(`Páginas analizadas: ${pages.size}`);
warnings.forEach(w => console.log(w));
errors.forEach(e => console.log(e));
console.log(errors.length ? `\n${errors.length} errores, ${warnings.length} avisos` : `\n✓ Sin errores (${warnings.length} avisos)`);
process.exit(errors.length ? 1 : 0);
