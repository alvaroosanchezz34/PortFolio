// Demo 2 · Noir Atelier — marca de moda premium (ficticia).
import { demoPage, eur } from '../../lib/demo.mjs';
import { photo, esc, IMAGES } from '../../lib/site.mjs';

const slug = 'noir-atelier';
const IMG = n => `${slug}/${n}`;
const CATS = ['Abrigos y chaquetas', 'Punto', 'Camisas y camisetas', 'Sastrería', 'Calzado', 'Accesorios'];
const L = ['XS', 'S', 'M', 'L', 'XL'];

const P = [
  { id: 'blazer-gales', name: 'Blazer Príncipe de Gales', cat: 'Abrigos y chaquetas', g: 'Mujer', price: 240, colors: [['Gris gales', '#8b8378'], ['Camel', '#b08a5b']], sizes: L, out: ['XS'], img: 'hero', alt: 'Mujer con americana de cuadros paseando por la calle', comp: '70 % lana, 30 % poliéster reciclado', desc: 'Corte recto y hombro marcado. Forro de viscosa y bolsillos con solapa.', isNew: true },
  { id: 'jersey-cuello-alto', name: 'Jersey de cuello alto', cat: 'Punto', g: 'Mujer', price: 120, colors: [['Negro', '#111111'], ['Crudo', '#e9e2d3']], sizes: L, out: ['L'], img: 'look-negro', alt: 'Conjunto negro con jersey de punto y falda de cuadros', comp: '100 % lana merino', desc: 'Punto fino de merino, suave y cálido sin abultar. Para llevar solo o bajo una americana.', isNew: true },
  { id: 'camiseta-esencial', name: 'Camiseta esencial', cat: 'Camisas y camisetas', g: 'Unisex', price: 45, colors: [['Blanco', '#f4f4f2'], ['Negro', '#111111']], sizes: L, out: [], img: 'camiseta-blanca', alt: 'Camiseta blanca de algodón vista de frente', comp: '100 % algodón orgánico', desc: 'Algodón orgánico de gramaje medio, cuello reforzado y caída recta.' },
  { id: 'pack-esenciales', name: 'Pack de dos camisetas', cat: 'Camisas y camisetas', g: 'Unisex', price: 75, colors: [['Blanco y negro', 'linear-gradient(90deg,#f4f4f2 50%,#111 50%)']], sizes: L, out: ['XS'], img: 'camisetas', alt: 'Dos camisetas dobladas, una blanca y una negra, sobre madera', comp: '100 % algodón orgánico', desc: 'Las dos básicas que siempre acabas usando, en blanco y en negro.' },
  { id: 'denim-indigo', name: 'Chaqueta denim índigo', cat: 'Abrigos y chaquetas', g: 'Unisex', price: 150, colors: [['Índigo', '#2b3a55']], sizes: L, out: ['XL'], img: 'denim', alt: 'Chaqueta vaquera azul oscuro con cuello de pana', comp: '100 % algodón, denim japonés', desc: 'Denim rígido que se amolda con el uso. Cuello de pana en contraste.', isNew: true },
  { id: 'biker-cuero', name: 'Biker de cuero', cat: 'Abrigos y chaquetas', g: 'Unisex', price: 390, colors: [['Negro', '#111111']], sizes: L, out: ['M'], img: 'cuero', alt: 'Cazadora biker de cuero negro', comp: 'Piel de cordero curtida al vegetal', desc: 'La cazadora de siempre, en piel suave y con herrajes mate.' },
  { id: 'bomber-satinada', name: 'Bomber satinada', cat: 'Abrigos y chaquetas', g: 'Mujer', price: 160, colors: [['Salmón', '#d99a85']], sizes: L, out: [], img: 'bomber', alt: 'Cazadora bomber color salmón en una percha', comp: '100 % poliéster reciclado', desc: 'Ligera, con puños de canalé y un brillo discreto.' },
  { id: 'poncho-punto', name: 'Poncho de punto calado', cat: 'Punto', g: 'Mujer', price: 130, colors: [['Crudo', '#e9e2d3']], sizes: ['Única'], out: [], img: 'punto', alt: 'Poncho de punto calado color crudo con flecos', comp: '60 % algodón, 40 % lino', desc: 'Punto calado hecho a mano, con flecos en el bajo.' },
  { id: 'camisa-popelin', name: 'Camisa de popelín', cat: 'Camisas y camisetas', g: 'Hombre', price: 85, colors: [['Celeste', '#a9c1d9'], ['Blanco', '#f4f4f2'], ['Burdeos', '#6b2430']], sizes: ['S', 'M', 'L', 'XL'], out: ['S'], img: 'camisas', alt: 'Tres camisas dobladas en tonos claros y burdeos', comp: '100 % algodón popelín', desc: 'Popelín de algodón con cuello italiano y botones de nácar.' },
  { id: 'traje-marino', name: 'Traje azul marino', cat: 'Sastrería', g: 'Hombre', price: 420, colors: [['Marino', '#1f2a44']], sizes: ['46', '48', '50', '52', '54'], out: ['54'], img: 'traje', alt: 'Hombre con traje azul marino y camisa blanca', comp: '100 % lana fría', desc: 'Traje de dos botones en lana fría, pensado para todo el año.' },
  { id: 'oxford-piel', name: 'Oxford de piel', cat: 'Calzado', g: 'Hombre', price: 210, colors: [['Cuero', '#8a4b2a']], sizes: ['40', '41', '42', '43', '44', '45'], out: ['45'], img: 'oxford', alt: 'Zapatos oxford de piel marrón', comp: 'Piel de becerro y suela de cuero', desc: 'Oxford cosido Goodyear, hecho para durar años.' },
  { id: 'bolso-mimbre', name: 'Bolso de mimbre y piel', cat: 'Accesorios', g: 'Mujer', price: 165, colors: [['Natural', '#c99a5b']], sizes: ['Única'], out: [], img: 'bolso-mimbre', alt: 'Bolso de mimbre con solapa de piel color naranja', comp: 'Mimbre tejido a mano y piel', desc: 'Estructura de mimbre tejido a mano, con solapa y asa de piel.' },
  { id: 'collar-perlas', name: 'Collar de perlas', cat: 'Accesorios', g: 'Mujer', price: 95, colors: [['Perla', '#efe8dc']], sizes: ['Única'], out: [], img: 'perlas', alt: 'Collar de perlas dentro de su estuche', comp: 'Perlas cultivadas y cierre de plata', desc: 'Perlas cultivadas de agua dulce, ensartadas a mano.' },
];

const card = (p, i) => `
          <li class="np" data-id="${p.id}">
            <a href="#/producto/${p.id}" class="np-a">
              <span class="np-img">${photo(IMG(p.img), p.alt, { sizes: '(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw', eager: i < 2 })}${p.isNew ? '<span class="np-new">Nuevo</span>' : ''}</span>
              <span class="np-name">${p.name}</span>
              <span class="np-row"><span class="np-price">${eur(p.price)}</span><span class="np-sw" aria-label="${p.colors.length} ${p.colors.length === 1 ? 'color' : 'colores'}">${p.colors.map(c => `<i style="background:${c[1]}"></i>`).join('')}</span></span>
            </a>
          </li>`;

const body = `
  <header class="na-hd" id="hd">
    <div class="na-w na-hd-in">
      <nav class="na-nav" aria-label="Principal"><a href="#coleccion">Colección</a><a href="#lookbook">Lookbook</a><a href="#atelier">Atelier</a></nav>
      <a class="na-logo" href="#inicio" aria-label="Noir Atelier, inicio">Noir Atelier</a>
      <button class="na-bag" id="bagBtn" type="button" aria-haspopup="dialog" aria-controls="bag">Bolsa <span class="na-bag-n" id="bagN">0</span><span class="dk-sr"> artículos</span></button>
    </div>
  </header>

  <main id="main">
    <section class="na-hero" id="inicio" aria-labelledby="na-h1">
      <div class="na-hero-img">${photo(IMG('atelier'), 'Burro con prendas de punto en tonos crudos junto a hierba de la pampa', { sizes: '(max-width: 900px) 100vw, 55vw', eager: true })}</div>
      <div class="na-hero-txt">
        <p class="na-eyebrow">Colección Otoño · Invierno</p>
        <h1 id="na-h1">El silencio<br><em>también</em> viste.</h1>
        <p>Prendas sobrias, tejidos nobles y patrones que no pasan de moda. Pocas piezas, hechas para durar.</p>
        <a class="na-btn" href="#coleccion">Ver la colección</a>
      </div>
    </section>

    <section class="na-coll" id="coleccion" aria-labelledby="na-coll-t">
      <div class="na-w">
        <div class="na-coll-hd">
          <h2 id="na-coll-t">Colección</h2>
          <p class="na-count" id="count" aria-live="polite">${P.length} piezas</p>
        </div>
        <div class="na-tools">
          <div class="na-cats" role="group" aria-label="Categoría">
            <button type="button" aria-pressed="true" data-cat="">Todo</button>
${CATS.map(c => `            <button type="button" aria-pressed="false" data-cat="${esc(c)}">${c}</button>`).join('\n')}
          </div>
          <div class="na-sel">
            <label><span class="dk-sr">Para</span><select id="gender"><option value="">Mujer y hombre</option><option value="Mujer">Mujer</option><option value="Hombre">Hombre</option><option value="Unisex">Unisex</option></select></label>
            <label><span class="dk-sr">Ordenar</span><select id="sort"><option value="new">Novedades</option><option value="asc">Precio: de menor a mayor</option><option value="desc">Precio: de mayor a menor</option></select></label>
          </div>
        </div>
        <ul class="na-grid" id="grid">${P.map(card).join('')}
        </ul>
        <div class="na-empty" id="empty" hidden><p>No hay piezas con esa combinación.</p><button type="button" class="na-btn ghost" id="emptyReset">Ver toda la colección</button></div>
      </div>
    </section>

    <section class="na-look" id="lookbook" aria-labelledby="na-look-t">
      <div class="na-w na-look-in">
        <h2 id="na-look-t" data-rv>Lookbook<br><em>N.º 07</em></h2>
        <figure class="na-l1" data-rv>${photo(IMG('look-negro'), 'Look negro con jersey de punto, falda de cuadros y collar', { sizes: '(max-width: 800px) 100vw, 40vw' })}<figcaption>Jersey de cuello alto · Falda de cuadros</figcaption></figure>
        <figure class="na-l2" data-rv>${photo(IMG('traje'), 'Hombre con traje azul marino de dos botones', { sizes: '(max-width: 800px) 100vw, 30vw' })}<figcaption>Traje azul marino</figcaption></figure>
        <figure class="na-l3" data-rv>${photo(IMG('hero'), 'Mujer con americana de cuadros por la calle', { sizes: '(max-width: 800px) 100vw, 30vw' })}<figcaption>Blazer Príncipe de Gales</figcaption></figure>
      </div>
    </section>

    <section class="na-atelier" id="atelier" aria-labelledby="na-at-t">
      <div class="na-w na-at-in">
        <h2 id="na-at-t" data-rv>Menos piezas,<br><em>mejor hechas.</em></h2>
        <div class="na-at-txt" data-rv>
          <p>Trabajamos con talleres pequeños y tejidos que envejecen bien: lana merino, algodón orgánico, lino y piel curtida al vegetal.</p>
          <dl><div><dt>Envíos</dt><dd>Gratis a partir de 150 €</dd></div><div><dt>Cambios</dt><dd>30 días para cambiar de talla</dd></div><div><dt>Arreglos</dt><dd>Bajos y mangas en el atelier</dd></div></dl>
          <p class="na-note">Condiciones de demostración: Noir Atelier es una marca ficticia.</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="na-ft"><div class="na-w"><span class="na-logo">Noir Atelier</span><p>Marca ficticia creada por Kódika para demostrar una tienda de moda.</p></div></footer>

  <dialog class="dk-dialog na-dlg" id="pdlg" aria-labelledby="p-title">
    <button class="dk-close" data-close aria-label="Cerrar producto">×</button>
    <div id="pBody"></div>
  </dialog>

  <dialog class="na-bagdlg" id="bag" aria-labelledby="bag-t">
    <div class="na-bag-in">
      <div class="na-bag-hd"><h2 id="bag-t">Tu bolsa</h2><button class="na-x" data-close type="button" aria-label="Cerrar la bolsa">×</button></div>
      <div id="bagBody"></div>
    </div>
  </dialog>`;

export default demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Noir Atelier · Demo de tienda online de moda | Kódika',
  description: 'Demo ficticia de Kódika: tienda de moda minimalista con catálogo filtrable, fichas con tallas y colores y bolsa de compra.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#ffffff',
  fonts: [`/assets/demos/${slug}/fonts/bodoni-moda.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'na',
  data: {
    dims: Object.fromEntries(Object.entries(IMAGES).filter(([k]) => k.startsWith(slug + '/')).map(([k, v]) => [k.split('/')[1], [v.w, v.h]])),
    products: P,
  },
  body,
});
