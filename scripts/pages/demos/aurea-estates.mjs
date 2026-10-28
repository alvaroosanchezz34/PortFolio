// Demo 1 · Aurea Estates — inmobiliaria de lujo (ficticia).
import { demoPage, eur, num } from '../../lib/demo.mjs';
import { photo, esc, IMAGES } from '../../lib/site.mjs';

const slug = 'aurea-estates';
const IMG = n => `${slug}/${n}`;

const ZONES = ['Marbella', 'Sotogrande', 'Ibiza', 'Mallorca', 'Madrid', 'Costa Brava'];
const P = [
  { id: 'villa-marea', name: 'Villa Marea', zone: 'Marbella', area: 'Sierra Blanca', type: 'Villa', price: 4950000, beds: 6, baths: 7, m2: 820, plot: 2400, img: 'villa-marea', alt: 'Villa blanca de dos plantas con piscina y jardín', gallery: ['int-salon', 'int-dormitorio', 'int-bano'], feats: ['Piscina desbordante', 'Vistas al mar', 'Domótica integral', 'Garaje para 4 coches'], desc: 'Arquitectura contemporánea en una de las urbanizaciones más tranquilas de Marbella. Espacios abiertos que se vuelcan al jardín y a la piscina, con luz natural en todas las estancias.' },
  { id: 'casa-alba', name: 'Casa Alba', zone: 'Sotogrande', area: 'La Reserva', type: 'Villa', price: 3200000, beds: 5, baths: 5, m2: 610, plot: 1800, img: 'casa-alba', alt: 'Casa moderna con grandes ventanales y piscina al atardecer', gallery: ['int-estar', 'int-cocina'], feats: ['Junto al campo de golf', 'Cocina de autor', 'Suite principal con vestidor', 'Bodega climatizada'], desc: 'Una casa para vivir todo el año, con volúmenes limpios, grandes ventanales y una piscina que prolonga el salón hacia el exterior.' },
  { id: 'residencia-sol', name: 'Residencia del Sol', zone: 'Ibiza', area: 'Santa Eulària', type: 'Villa', price: 6400000, beds: 7, baths: 8, m2: 940, plot: 5200, img: 'residencia-sol', alt: 'Villa blanca con piscina y tumbonas bajo el cielo azul', gallery: ['int-vistas', 'int-salon', 'int-bano'], feats: ['Casa de invitados', 'Piscina de 20 metros', 'Gimnasio y spa', 'Licencia turística (demo)'], desc: 'Finca contemporánea rodeada de pinos, con casa principal, casa de invitados y zonas exteriores pensadas para recibir.' },
  { id: 'casa-mirador', name: 'Casa Mirador', zone: 'Mallorca', area: 'Port d’Andratx', type: 'Villa', price: 2750000, beds: 4, baths: 4, m2: 430, plot: 950, img: 'atico-mirador', alt: 'Casa blanca de líneas rectas con piscina y palmeras', gallery: ['int-estar', 'int-dormitorio'], feats: ['Vistas a la bahía', 'Terrazas en cada planta', 'Ascensor', 'A 5 minutos del puerto'], desc: 'Líneas rectas, mucha luz y terrazas escalonadas que miran al puerto. Una casa compacta, cuidada al detalle y lista para entrar a vivir.' },
  { id: 'villa-olivo', name: 'Villa Olivo', zone: 'Marbella', area: 'Nueva Andalucía', type: 'Villa', price: 2150000, beds: 5, baths: 4, m2: 520, plot: 1300, img: 'villa-olivo', alt: 'Villa de dos plantas con galería, palmeras y piscina', gallery: ['int-cocina', 'int-salon'], feats: ['Galería porticada', 'Jardín maduro', 'Apartamento independiente', 'Cerca de colegios internacionales'], desc: 'Una villa familiar con jardín maduro y galería porticada, a pocos minutos de los colegios internacionales y de Puerto Banús.' },
  { id: 'casa-cedro', name: 'Casa Cedro', zone: 'Madrid', area: 'La Moraleja', type: 'Casa', price: 3850000, beds: 6, baths: 6, m2: 780, plot: 1600, img: 'casa-cedro', alt: 'Casa contemporánea de piedra y madera con jardín', gallery: ['int-estar', 'int-dormitorio', 'int-bano'], feats: ['Fachada de cedro y piedra', 'Sala de cine', 'Despacho con acceso propio', 'Seguridad 24 h en la urbanización'], desc: 'Madera, piedra y vidrio en una parcela llana de La Moraleja. Distribución pensada para teletrabajar, recibir y desconectar sin salir de casa.' },
  { id: 'casa-lino', name: 'Casa Lino', zone: 'Costa Brava', area: 'Begur', type: 'Casa', price: 1680000, beds: 4, baths: 3, m2: 320, plot: 700, img: 'casa-lino', alt: 'Casa de diseño con volúmenes de madera y hormigón', gallery: ['int-vistas', 'int-cocina'], feats: ['Arquitectura de autor', 'A 800 m de la cala', 'Patio interior', 'Eficiencia energética A (demo)'], desc: 'Una casa de autor en la Costa Brava: volúmenes de madera y hormigón alrededor de un patio, a un paseo de las calas.' },
  { id: 'villa-brisa', name: 'Villa Brisa', zone: 'Ibiza', area: 'Sant Josep', type: 'Villa', price: 3600000, beds: 5, baths: 5, m2: 600, plot: 2100, img: 'noche', alt: 'Casa moderna iluminada al anochecer entre árboles', gallery: ['int-salon', 'int-vistas'], feats: ['Puestas de sol al oeste', 'Porche de 80 m²', 'Placas solares', 'Huerto y frutales'], desc: 'Pensada para el atardecer: porche orientado al oeste, interiores cálidos y un jardín con frutales a pocos minutos de las playas del sur.' },
  { id: 'atico-horizonte', name: 'Ático Horizonte', zone: 'Marbella', area: 'Milla de Oro', type: 'Ático', price: 1950000, beds: 3, baths: 3, m2: 240, plot: 0, terrace: 120, img: 'int-vistas', alt: 'Salón con escalera de diseño y vistas a la piscina', gallery: ['int-salon', 'int-dormitorio'], feats: ['Terraza de 120 m²', 'Piscina privada', 'Conserjería', 'Dos plazas de garaje'], desc: 'Un ático luminoso con terraza envolvente y piscina privada en plena Milla de Oro, a un paseo de la playa.' },
];

const card = p => `
          <li class="pc" data-id="${p.id}">
            <a href="#/propiedad/${p.id}" class="pc-a">
              <span class="pc-img">${photo(IMG(p.img), p.alt, { sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw' })}<span class="pc-zone">${p.zone}</span></span>
              <span class="pc-body">
                <span class="pc-name">${p.name}</span>
                <span class="pc-area">${p.area} · ${p.type}</span>
                <span class="pc-meta"><span>${p.beds} dorm.</span><span>${p.baths} baños</span><span>${num(p.m2)} m²</span></span>
                <span class="pc-price">${eur(p.price)}</span>
              </span>
            </a>
          </li>`;

const opt = (v, l = v) => `<option value="${esc(v)}">${esc(l)}</option>`;
const PRICES = [[0, 'Cualquier precio'], [2000000, 'Hasta 2.000.000 €'], [3000000, 'Hasta 3.000.000 €'], [4000000, 'Hasta 4.000.000 €'], [5000000, 'Hasta 5.000.000 €']];

const body = `
  <header class="ae-hd" id="hd">
    <div class="ae-w ae-hd-in">
      <a class="ae-logo" href="#inicio" aria-label="Aurea Estates, inicio">AUREA<span>Estates</span></a>
      <button class="ae-menu" id="menuBtn" aria-expanded="false" aria-controls="nav">Menú</button>
      <nav class="ae-nav" id="nav" aria-label="Principal">
        <a href="#propiedades">Propiedades</a><a href="#zonas">Zonas</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a>
        <a class="ae-nav-cta" href="#contacto" data-interest="Valorar mi vivienda">Valorar mi vivienda</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="ae-hero" id="inicio" aria-labelledby="ae-h1">
      <div class="ae-hero-img">${photo(IMG('hero'), 'Villa contemporánea con piscina desbordante al atardecer', { sizes: '100vw', eager: true })}</div>
      <div class="ae-w ae-hero-in">
        <p class="ae-eyebrow">Residencias singulares · Costa del Sol, Baleares y Madrid</p>
        <h1 id="ae-h1">Casas que se <em>recuerdan</em>.</h1>
        <form class="ae-search" id="heroSearch" aria-label="Buscar propiedades">
          <label><span>Zona</span><select name="zone"><option value="">Todas las zonas</option>${ZONES.map(z => opt(z)).join('')}</select></label>
          <label><span>Tipo</span><select name="type"><option value="">Cualquier tipo</option>${opt('Villa')}${opt('Casa')}${opt('Ático')}</select></label>
          <label><span>Precio</span><select name="max">${PRICES.map(([v, l]) => opt(v, l)).join('')}</select></label>
          <button type="submit">Buscar</button>
        </form>
      </div>
    </section>

    <section class="ae-intro ae-w" aria-labelledby="ae-intro-t">
      <h2 id="ae-intro-t" data-rv>Una selección pequeña, <em>a propósito</em>.</h2>
      <div data-rv>
        <p>En Aurea no publicamos cientos de anuncios: elegimos pocas casas, las visitamos una a una y te contamos lo que de verdad importa antes de que te desplaces.</p>
        <ul class="ae-values"><li><b>Selección</b>Cada propiedad, visitada y documentada.</li><li><b>Discreción</b>Visitas privadas y datos protegidos.</li><li><b>Acompañamiento</b>De la primera visita a la firma.</li></ul>
      </div>
    </section>

    <section class="ae-list" id="propiedades" aria-labelledby="ae-list-t">
      <div class="ae-w">
        <div class="ae-list-hd">
          <h2 id="ae-list-t">Propiedades</h2>
          <p class="ae-count" id="count" aria-live="polite">${P.length} propiedades</p>
        </div>
        <form class="ae-filters" id="filters" aria-label="Filtrar propiedades">
          <label><span>Zona</span><select name="zone"><option value="">Todas</option>${ZONES.map(z => opt(z)).join('')}</select></label>
          <label><span>Tipo</span><select name="type"><option value="">Todos</option>${opt('Villa')}${opt('Casa')}${opt('Ático')}</select></label>
          <label><span>Precio máximo</span><select name="max">${PRICES.map(([v, l]) => opt(v, l)).join('')}</select></label>
          <label><span>Dormitorios</span><select name="beds"><option value="0">Cualquiera</option>${[3, 4, 5, 6].map(n => opt(n, `${n} o más`)).join('')}</select></label>
          <label><span>Ordenar</span><select name="sort"><option value="feat">Destacadas</option><option value="asc">Precio: de menor a mayor</option><option value="desc">Precio: de mayor a menor</option><option value="m2">Superficie</option></select></label>
          <button type="reset" class="ae-reset">Limpiar</button>
        </form>
        <ul class="ae-grid" id="grid">${P.map(card).join('')}
        </ul>
        <div class="ae-empty" id="empty" hidden>
          <p><em>Ninguna casa</em> cumple todos esos filtros.</p>
          <button type="button" id="emptyReset" class="ae-btn">Ver todas las propiedades</button>
        </div>
        <p class="ae-note">Propiedades, ubicaciones y precios de demostración. Ninguna de estas casas está a la venta.</p>
      </div>
    </section>

    <section class="ae-zones" id="zonas" aria-labelledby="ae-zones-t">
      <div class="ae-w">
        <h2 id="ae-zones-t" data-rv>Dónde buscamos</h2>
        <ul class="ae-zl">
${ZONES.map(z => `          <li data-rv><button type="button" data-zone="${z}"><span class="ae-zn">${z}</span><span class="ae-zc">${P.filter(p => p.zone === z).length} ${P.filter(p => p.zone === z).length === 1 ? 'propiedad' : 'propiedades'}</span><span aria-hidden="true">→</span></button></li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="ae-services" id="servicios" aria-labelledby="ae-svc-t">
      <div class="ae-w ae-svc-in">
        <div class="ae-svc-img" data-rv>${photo(IMG('int-salon'), 'Salón amplio con sofá blanco y grandes ventanales', { sizes: '(max-width: 900px) 100vw, 50vw' })}</div>
        <div>
          <h2 id="ae-svc-t" data-rv>Cómo trabajamos</h2>
          <ol class="ae-svc">
            <li data-rv><b>Compra acompañada</b><p>Entendemos qué buscas, filtramos por ti y organizamos visitas privadas, presenciales o en vídeo.</p></li>
            <li data-rv><b>Venta y valoración</b><p>Fotografía, plano y una ficha cuidada para presentar tu casa como merece, solo a compradores cualificados.</p></li>
            <li data-rv><b>Gestión hasta la firma</b><p>Coordinamos notaría, documentación y entrega de llaves para que no tengas que perseguir a nadie.</p></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="ae-contact" id="contacto" aria-labelledby="ae-ct-t">
      <div class="ae-w ae-ct-in">
        <div>
          <h2 id="ae-ct-t" data-rv>Hablemos de <em>tu casa</em>.</h2>
          <p data-rv>Cuéntanos qué buscas o qué quieres vender. Te responde una persona, no un formulario automático.</p>
          <p class="ae-note" data-rv>Oficina, teléfono y dirección no incluidos: Aurea Estates es una inmobiliaria ficticia.</p>
        </div>
        <form class="ae-form" id="contactForm" novalidate>
          <div class="ae-row">
            <div class="ae-f"><label for="c-name">Nombre</label><input id="c-name" name="name" autocomplete="name" aria-describedby="c-name-e"><p class="ae-err" id="c-name-e" data-err="name" hidden></p></div>
            <div class="ae-f"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" aria-describedby="c-email-e"><p class="ae-err" id="c-email-e" data-err="email" hidden></p></div>
          </div>
          <div class="ae-f"><label for="c-interest">Me interesa</label><select id="c-interest" name="interest" aria-describedby="c-interest-e"><option value="">Elige una opción</option>${opt('Comprar')}${opt('Vender')}${opt('Valorar mi vivienda')}</select><p class="ae-err" id="c-interest-e" data-err="interest" hidden></p></div>
          <div class="ae-f"><label for="c-msg">Mensaje</label><textarea id="c-msg" name="msg" rows="4" aria-describedby="c-msg-e"></textarea><p class="ae-err" id="c-msg-e" data-err="msg" hidden></p></div>
          <label class="ae-chk"><input type="checkbox" name="ok" aria-describedby="c-ok-e"> Acepto que me contactéis sobre mi consulta.</label>
          <p class="ae-err" id="c-ok-e" data-err="ok" hidden></p>
          <button class="ae-btn" type="submit">Enviar consulta</button>
          <div class="ae-sent" id="contactSent" role="status" hidden></div>
        </form>
      </div>
    </section>
  </main>

  <footer class="ae-ft">
    <div class="ae-w ae-ft-in">
      <span class="ae-logo">AUREA<span>Estates</span></span>
      <p>Inmobiliaria ficticia creada por Kódika para demostrar una web de lujo.</p>
    </div>
  </footer>

  <dialog class="dk-dialog ae-dlg" id="dlg" aria-labelledby="d-title">
    <button class="dk-close" data-close aria-label="Cerrar ficha">×</button>
    <div id="dlgBody"></div>
  </dialog>`;

const page = demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Aurea Estates · Demo de web inmobiliaria de lujo | Kódika',
  description: 'Demo ficticia de Kódika: web editorial para una inmobiliaria de lujo con buscador, filtros, fichas con galería y contacto por propiedad.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#f3eee6',
  fonts: [`/assets/demos/${slug}/fonts/cormorant.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'ae',
  data: { dims: Object.fromEntries(Object.entries(IMAGES).filter(([k]) => k.startsWith(slug + '/')).map(([k, v]) => [k.split('/')[1], [v.w, v.h]])), properties: P.map(({ id, name, zone, area, type, price, beds, baths, m2, plot, terrace, img, alt, gallery, feats, desc }) => ({ id, name, zone, area, type, price, beds, baths, m2, plot, terrace, img, alt, gallery, feats, desc })) },
  body,
});

export default page;
