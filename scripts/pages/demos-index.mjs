import { DEMOS, ARR, photo, finalCta, abs, PERSON_ID } from '../lib/site.mjs';

const DETAIL = {
  'aurea-estates': ['Buscador por zona, tipo, precio y dormitorios', 'Ordenación y estado vacío con reinicio de filtros', 'Ficha de cada inmueble con galería navegable', 'Formulario de contacto por propiedad con validación'],
  'noir-atelier': ['Catálogo con filtros por categoría y orden por precio', 'Fichas con colores y tallas (con tallas agotadas)', 'Bolsa de compra con cantidades, que se recuerda al recargar', 'Pago desactivado a propósito: no se piden datos de tarjeta'],
  'sora-wellness': ['Tratamientos filtrables por categoría', 'Reserva en cuatro pasos: tratamiento, día, hora y datos', 'Horas ocupadas y días cerrados', 'Formulario validado y resumen de la cita'],
  'forge-fitness': ['Programas con intensidad y duración', 'Horario semanal filtrable por programa y por día', 'Selector de planes mensual o trimestral', 'Solicitud de información con el plan ya elegido'],
  'veloce-automotive': ['Stock filtrable por marca, carrocería, precio y año', 'Fichas técnicas con galería', 'Calculadora de cuota orientativa', 'Solicitud de información o prueba por vehículo'],
  'flowbook': ['Landing de producto SaaS con precios', 'Panel con calendario semanal y vista de día en móvil', 'Alta de citas, cambio de estado y eliminación', 'Métricas calculadas y datos guardados en tu navegador'],
};

const page = {
  path: '/demos/',
  nav: 'demos',
  pageType: 'CollectionPage',
  updated: '2026-10-16',
  title: 'Demos de webs para inmobiliarias, moda, clínicas y más',
  description: 'Seis webs de demostración navegables: inmobiliaria de lujo, moda, bienestar, gimnasio, concesionario y SaaS de reservas. Mira lo que podría tener tu negocio.',
  crumbs: [['Inicio', '/'], ['Demos', '/demos/']],
  kick: 'Demos',
  h1: 'Seis webs que podrían ser <em>la tuya</em>.',
  lead: 'Cada demo tiene su propia dirección de arte y funciones que puedes probar: buscar, filtrar, reservar, añadir a la bolsa o gestionar citas. <b>Los negocios son ficticios</b>, y así se indica en cada una.',
  heroLink: '<a class="lnk" href="#lista">Ver las demos <span class="arr" aria-hidden="true">→</span></a>',
  styles: ['/assets/css/demos-index.css'],
  schema: [{
    '@type': 'ItemList',
    '@id': abs('/demos/') + '#list',
    name: 'Demos de SanchezDevelop',
    itemListElement: DEMOS.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: `${d.name} · ${d.sector}`, url: abs(`/demos/${d.slug}/`) })),
  }],
  body: `
    <section class="sec" id="lista" aria-label="Demos">
      <div class="wide dx">
${DEMOS.map((d, i) => `        <article class="dx-item" data-rv>
          <a class="dx-media" href="/demos/${d.slug}/" tabindex="-1" aria-hidden="true" style="--tone:${d.tone}">
            ${d.img ? photo(d.img, '', { sizes: '(max-width: 860px) 100vw, 55vw', eager: i === 0 }) : `<span class="dx-fb"><b>Flowbook</b><span>Tu agenda, siempre llena.</span></span>`}
          </a>
          <div class="dx-txt">
            <p class="idx">${String(i + 1).padStart(2, '0')} · ${d.sector}</p>
            <h2 class="t-lg">${d.name}</h2>
            <p class="lede">${d.pitch}</p>
            <ul class="checks">${DETAIL[d.slug].map(x => `<li>${x}</li>`).join('')}</ul>
            <p class="dx-fit"><span class="mono muted">Ideal para</span> ${d.fit}</p>
            <div class="ctas"><a class="btn" href="/demos/${d.slug}/">Abrir ${d.name} ${ARR}</a><a class="lnk" href="/contacto/?demo=${d.slug}" data-cta="demo-${d.slug}">Quiero una web así</a></div>
          </div>
        </article>`).join('\n')}
      </div>
    </section>

    <section class="sec alt">
      <div class="narrow prose">
        <h2>Sobre estas demos</h2>
        <p>Las he diseñado y programado para que puedas ver, antes de hablar conmigo, el nivel de diseño y el tipo de funciones que puede tener tu web. <strong>No son clientes reales</strong>: los nombres, los inmuebles, los productos, los precios, los horarios y las personas son inventados, y las fotografías son de bancos de imágenes con licencia libre.</p>
        <p>Las funciones sí son reales dentro de cada demo: los filtros filtran, la bolsa suma y las citas cambian de estado. Lo que no hacen es enviar datos: los formularios validan lo que escribes, pero no mandan nada a nadie, y no hay pagos. En tu web de verdad, esos pasos se conectan a tu email, a tu panel o a tu pasarela de pago.</p>
        <p>¿Tu sector no está? Cuéntame qué haces y te diré qué funciones tendría sentido construir. O prueba a <a href="/#idea">generar una primera idea con IA</a>.</p>
      </div>
    </section>
${finalCta({
    title: '¿Cuál sería <em>la tuya</em>?',
    text: 'Dime qué demo se parece más a lo que buscas y te cuento cómo la adaptaría a tu negocio.',
    waText: 'Hola Álvaro, he visto tus demos y quiero una web para mi negocio.',
  })}`,
};

export default page;
