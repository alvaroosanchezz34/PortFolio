// Demo 5 · Veloce Automotive — concesionario multimarca de vehículos premium (ficticio).
// Los modelos son reales; las unidades, kilometrajes, precios y equipamiento son de demostración.
import { demoPage, eur, num } from '../../lib/demo.mjs';
import { photo, esc, IMAGES } from '../../lib/site.mjs';

const slug = 'veloce-automotive';
const IMG = n => `${slug}/${n}`;
const C = [
  { id: 'porsche-911-gt3', make: 'Porsche', model: '911 GT3', body: 'Coupé', year: 2018, km: 24500, cv: 500, acc: '3,4', top: 318, engine: '4.0 bóxer 6 cil. atmosférico', gear: 'PDK de 7 velocidades', drive: 'Propulsión', color: 'Blanco', price: 159900, img: 'gt3', alt: 'Porsche 911 GT3 blanco con alerón en una carretera de montaña nevada', gal: ['gt3-d1'], eq: ['Asientos baquet', 'Faros LED', 'Paquete Chrono', 'Cámara trasera'] },
  { id: 'mclaren-720s', make: 'McLaren', model: '720S', body: 'Superdeportivo', year: 2019, km: 12800, cv: 720, acc: '2,9', top: 341, engine: '4.0 V8 biturbo', gear: 'SSG de 7 velocidades', drive: 'Propulsión', color: 'Blanco', price: 249000, img: '720s', alt: 'McLaren 720S blanco aparcado frente a casas de madera', gal: ['720s-d1'], eq: ['Puertas diédricas', 'Techo de cristal', 'Sistema elevador delantero', 'Equipo de sonido premium'] },
  { id: 'mercedes-amg-gt-r', make: 'Mercedes-AMG', model: 'GT R', body: 'Coupé', year: 2018, km: 18300, cv: 585, acc: '3,6', top: 318, engine: '4.0 V8 biturbo', gear: 'Doble embrague de 7 velocidades', drive: 'Propulsión', color: 'Gris', price: 164500, img: 'gtr', alt: 'Mercedes-AMG GT R gris con pinzas de freno amarillas', gal: ['gtr-d1', 'gtr-d2'], eq: ['Control de tracción regulable', 'Aerodinámica activa', 'Asientos AMG Performance', 'Escape deportivo'] },
  { id: 'audi-r8-v10', make: 'Audi', model: 'R8 V10', body: 'Superdeportivo', year: 2016, km: 33600, cv: 540, acc: '3,5', top: 320, engine: '5.2 V10 atmosférico', gear: 'S tronic de 7 velocidades', drive: 'Tracción total quattro', color: 'Gris', price: 109900, img: 'r8', alt: 'Audi R8 gris en una carretera al atardecer', gal: ['r8-d2'], eq: ['Virtual Cockpit', 'Faros láser', 'Asientos deportivos', 'Escape deportivo'] },
  { id: 'bmw-m5', make: 'BMW', model: 'M5', body: 'Berlina', year: 2019, km: 28900, cv: 600, acc: '3,4', top: 250, topNote: 'limitada', engine: '4.4 V8 biturbo', gear: 'Automático de 8 velocidades', drive: 'Tracción total M xDrive', color: 'Blanco', price: 79900, img: 'm5', alt: 'BMW M5 blanco circulando por una carretera', gal: ['m5-d1', 'm5-d2'], eq: ['Head-Up Display', 'Asientos M ventilados', 'Asistente de conducción', 'Equipo de sonido premium'] },
  { id: 'bmw-m4-coupe', make: 'BMW', model: 'M4 Coupé', body: 'Coupé', year: 2017, km: 41200, cv: 431, acc: '4,1', top: 250, topNote: 'limitada', engine: '3.0 6 cil. en línea biturbo', gear: 'M DCT de 7 velocidades', drive: 'Propulsión', color: 'Gris', price: 54900, img: 'm4', alt: 'BMW M4 gris aparcado de noche', gal: ['m4-d1', 'm4-d2'], eq: ['Techo de fibra de carbono', 'Faros LED adaptativos', 'Navegador Professional', 'Asientos M'] },
  { id: 'ford-mustang-gt', make: 'Ford', model: 'Mustang GT', body: 'Coupé', year: 2019, km: 36700, cv: 450, acc: '4,3', top: 250, topNote: 'limitada', engine: '5.0 V8 atmosférico', gear: 'Automático de 10 velocidades', drive: 'Propulsión', color: 'Negro', price: 44900, img: 'mustang', alt: 'Ford Mustang GT negro de frente en una calle', gal: ['mustang-d1', 'mustang-d2'], eq: ['Escape activo', 'Cuadro digital', 'Asientos calefactados', 'Launch control'] },
];
const MAKES = [...new Set(C.map(c => c.make))].sort();
const BODIES = ['Coupé', 'Berlina', 'Superdeportivo'];
const MAXP = 260000;

const card = (c, i) => `
          <li class="vc" data-id="${c.id}">
            <a href="#/vehiculo/${c.id}" class="vc-a">
              <span class="vc-img">${photo(IMG(c.img), c.alt, { sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw', eager: i < 1 })}</span>
              <span class="vc-body">
                <span class="vc-make">${c.make}</span>
                <span class="vc-model">${c.model}</span>
                <span class="vc-specs"><span>${c.year}</span><span>${num(c.km)} km</span><span>${c.cv} CV</span></span>
                <span class="vc-price">${eur(c.price)}</span>
              </span>
            </a>
          </li>`;

const body = `
  <header class="va-hd" id="hd">
    <div class="va-w va-hd-in">
      <a class="va-logo" href="#inicio" aria-label="Veloce Automotive, inicio">VELOCE</a>
      <button class="va-menu" id="menuBtn" aria-expanded="false" aria-controls="nav">Menú</button>
      <nav class="va-nav" id="nav" aria-label="Principal"><a href="#stock">Stock</a><a href="#exposicion">Exposición</a><a href="#servicios">Servicios</a><a class="va-btn sm" href="#contacto">Contacto</a></nav>
    </div>
  </header>

  <main id="main">
    <section class="va-hero" id="inicio" aria-labelledby="va-h1">
      <div class="va-hero-img" id="heroImg">${photo(IMG('hero'), 'Deportivo gris aparcado junto a un puerto deportivo al anochecer', { sizes: '100vw', eager: true })}</div>
      <div class="va-lines" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="va-w va-hero-in">
        <p class="va-kick">Deportivos premium · Selección multimarca</p>
        <h1 id="va-h1">Cada coche,<br>elegido <span>uno&nbsp;a&nbsp;uno</span>.</h1>
        <div class="va-hero-ft">
          <p>Revisados, documentados y listos para entregar. Prueba el que te interese antes de decidir.</p>
          <div class="va-ctas"><a class="va-btn" href="#stock">Ver el stock</a><a class="va-btn ghost" href="#contacto" data-type="Tasación de mi coche">Tasar mi coche</a></div>
        </div>
      </div>
      <dl class="va-w va-stats"><div><dt>Vehículos en stock</dt><dd>${C.length}</dd></div><div><dt>Marcas</dt><dd>${MAKES.length}</dd></div><div><dt>Potencia máxima</dt><dd>${Math.max(...C.map(c => c.cv))} CV</dd></div></dl>
    </section>

    <section class="va-stock" id="stock" aria-labelledby="va-st-t">
      <div class="va-w">
        <div class="va-sh"><h2 id="va-st-t" data-rv>Stock</h2><p class="va-count" id="count" aria-live="polite">${C.length} vehículos</p></div>
        <form class="va-filters" id="filters" aria-label="Filtrar vehículos">
          <label><span>Marca</span><select name="make"><option value="">Todas</option>${MAKES.map(m => `<option>${m}</option>`).join('')}</select></label>
          <label><span>Carrocería</span><select name="body"><option value="">Todas</option>${BODIES.map(b => `<option>${b}</option>`).join('')}</select></label>
          <label class="va-range"><span>Precio máximo: <output id="maxOut">${eur(MAXP)}</output></span><input type="range" name="max" min="40000" max="${MAXP}" step="5000" value="${MAXP}" aria-describedby="maxOut"></label>
          <label><span>Año desde</span><select name="year"><option value="0">Cualquiera</option>${[2016, 2017, 2018, 2019].map(y => `<option value="${y}">${y}</option>`).join('')}</select></label>
          <label><span>Ordenar</span><select name="sort"><option value="desc">Precio: de mayor a menor</option><option value="asc">Precio: de menor a mayor</option><option value="cv">Potencia</option><option value="km">Menos kilómetros</option></select></label>
          <button type="reset" class="va-reset">Limpiar filtros</button>
        </form>
        <ul class="va-grid" id="grid">${C.map(card).join('')}
        </ul>
        <div class="va-empty" id="empty" hidden><p>Ningún vehículo cumple esos filtros.</p><button type="button" class="va-btn ghost" id="emptyReset">Ver todo el stock</button></div>
        <p class="va-note">Modelos reales con unidades, kilometrajes, equipamiento y precios de demostración. Las especificaciones son orientativas del modelo. Veloce Automotive es un concesionario ficticio.</p>
      </div>
    </section>

    <section class="va-expo" id="exposicion" aria-labelledby="va-ex-t">
      <div class="va-w va-expo-in">
        <figure class="va-e1" data-rv>${photo(IMG('exposicion'), 'Deportivo plateado en un garaje en penumbra junto a otros coches', { sizes: '(max-width: 900px) 100vw, 60vw' })}</figure>
        <div class="va-e-txt">
          <h2 id="va-ex-t" data-rv>La exposición</h2>
          <p data-rv>Un espacio tranquilo para mirar cada coche con calma, sin prisas ni vendedores encima. Pide cita y lo tendrás preparado.</p>
          <figure class="va-e2" data-rv>${photo(IMG('interior'), 'Conductor con la mano en el volante de un coche', { sizes: '(max-width: 900px) 100vw, 35vw' })}</figure>
        </div>
      </div>
    </section>

    <section class="va-svc" id="servicios" aria-labelledby="va-sv-t">
      <div class="va-w">
        <h2 id="va-sv-t" data-rv>Servicios</h2>
        <ul class="va-svl">
          <li data-rv><span>01</span><h3>Tasación de tu coche</h3><p>Te damos una valoración por escrito y la descontamos del precio si cambias de coche.</p></li>
          <li data-rv><span>02</span><h3>Garantía</h3><p>Cada vehículo se entrega revisado y con garantía. Condiciones de demostración.</p></li>
          <li data-rv><span>03</span><h3>Financiación</h3><p>Calcula una cuota orientativa en la ficha de cada coche y te preparamos una propuesta.</p></li>
          <li data-rv><span>04</span><h3>Entrega a domicilio</h3><p>Llevamos el coche a tu casa, en cualquier punto de la península.</p></li>
        </ul>
      </div>
    </section>

    <section class="va-ct" id="contacto" aria-labelledby="va-ct-t">
      <div class="va-w va-ct-in">
        <div><h2 id="va-ct-t" data-rv>Contacto</h2><p data-rv>Pide información, una prueba o la tasación de tu coche. Te responde una persona.</p></div>
        <form class="va-form" id="contactForm" novalidate>
          <div class="va-row">
            <div class="va-f"><label for="c-name">Nombre</label><input id="c-name" name="name" autocomplete="name" aria-describedby="c-name-e"><p class="va-err" id="c-name-e" data-err="name" hidden></p></div>
            <div class="va-f"><label for="c-contact">Teléfono o email</label><input id="c-contact" name="contact" autocomplete="email" aria-describedby="c-contact-e"><p class="va-err" id="c-contact-e" data-err="contact" hidden></p></div>
          </div>
          <div class="va-f"><label for="c-type">Motivo</label><select id="c-type" name="type" aria-describedby="c-type-e"><option value="">Elige una opción</option><option>Información de un vehículo</option><option>Prueba de conducción</option><option>Tasación de mi coche</option></select><p class="va-err" id="c-type-e" data-err="type" hidden></p></div>
          <div class="va-f"><label for="c-msg">Mensaje</label><textarea id="c-msg" name="msg" rows="4" aria-describedby="c-msg-e"></textarea><p class="va-err" id="c-msg-e" data-err="msg" hidden></p></div>
          <label class="va-chk"><input type="checkbox" name="ok" aria-describedby="c-ok-e"> Acepto que me contactéis sobre mi solicitud.</label>
          <p class="va-err" id="c-ok-e" data-err="ok" hidden></p>
          <button class="va-btn" type="submit">Enviar solicitud</button>
          <div class="va-done" id="contactDone" role="status" hidden></div>
        </form>
      </div>
    </section>
  </main>
  <footer class="va-ft"><div class="va-w"><span class="va-logo">VELOCE</span><p>Concesionario ficticio creado por SanchezDevelop para demostrar una web de automoción.</p></div></footer>

  <dialog class="dk-dialog va-dlg" id="dlg" aria-labelledby="v-title">
    <button class="dk-close" data-close aria-label="Cerrar ficha">×</button>
    <div id="dlgBody"></div>
  </dialog>`;

export default demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Veloce Automotive · Demo de web para concesionario | SanchezDevelop',
  description: 'Demo ficticia de SanchezDevelop: web para un concesionario premium con stock filtrable, fichas técnicas con galería, calculadora de cuota y solicitud de prueba.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#070708',
  fonts: [`/assets/demos/${slug}/fonts/michroma.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'va',
  data: { cars: C, maxPrice: MAXP, dims: Object.fromEntries(Object.entries(IMAGES).filter(([k]) => k.startsWith(slug + '/')).map(([k, v]) => [k.split('/')[1], [v.w, v.h]])) },
  body,
});
