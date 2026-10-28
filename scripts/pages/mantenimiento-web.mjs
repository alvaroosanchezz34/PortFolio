import { faq, finalCta, related, serviceNode } from '../lib/site.mjs';

const path = '/mantenimiento-web/';

export default {
  path,
  nav: 'mant',
  updated: '2026-10-16',
  title: 'Mantenimiento web y mejora de webs existentes | Kódika',
  description: 'Tu web siempre online, rápida y al día, con pequeños cambios incluidos desde 15 €/mes. También revisamos webs existentes: velocidad, SEO técnico y conversión.',
  crumbs: [['Inicio', '/'], ['Mantenimiento y mejora web', path]],
  kick: 'Mantenimiento web',
  h1: 'Mantenimiento, mejora y optimización de tu web',
  lead: 'Una web no se termina el día que se publica. <b>La mantenemos online, rápida, segura y al día</b>, hacemos los cambios que necesites y, si ya tienes una web, te decimos con sinceridad si conviene mejorarla o rehacerla.',
  facts: ['Desde 15 €/mes', 'Pequeños cambios incluidos', 'Respuesta en 24 h como mucho'],
  waText: 'Hola, he visto la página de mantenimiento web de Kódika y quiero que reviséis mi web.',
  heroLink: '<a class="lnk" href="#revision">Revisar mi web actual</a>',
  about: 'https://kodikadigital.com/mantenimiento-web/#service',
  schema: [serviceNode({
    path,
    name: 'Mantenimiento, mejora y optimización de páginas web',
    serviceType: 'Mantenimiento web',
    description: 'Mantenimiento mensual de webs (disponibilidad, actualizaciones, seguridad y pequeños cambios) y revisión y mejora de webs existentes: velocidad, SEO técnico, accesibilidad y conversión.',
    minPrice: 15,
    unitText: 'al mes',
  })],
  body: `
    <section class="sec" aria-labelledby="inc-t">
      <div class="wrap">
        <div class="sh">
          <h2 class="t-lg" id="inc-t">Qué incluye el mantenimiento</h2>
          <p class="lede">Entre <b>15 y 25 € al mes</b>, según la web. Es opcional, y el alcance exacto (por ejemplo, cuántos cambios al mes) lo dejamos por escrito.</p>
        </div>
        <div class="split">
          <div class="card">
            <h3>Que todo siga funcionando</h3>
            <ul class="checks">
              <li>Vigilancia de que la web está online</li>
              <li>Actualizaciones de seguridad y de dependencias</li>
              <li>Revisión del dominio, el certificado HTTPS y el correo, para que nada caduque sin avisar</li>
              <li>Copias de seguridad cuando tu web guarda datos, como reservas o pedidos</li>
            </ul>
          </div>
          <div class="card">
            <h3>Que siga trayendo clientes</h3>
            <ul class="checks">
              <li>Pequeños cambios de contenido: horarios, precios, fotos y textos</li>
              <li>Revisión periódica de velocidad en móvil</li>
              <li>Revisión de errores de indexación en Google Search Console</li>
              <li>Hablas con quien mantiene la web, sin tickets ni centralitas</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="sec alt" id="revision" aria-labelledby="rev-t">
      <div class="narrow prose">
        <h2 id="rev-t">Revisión y mejora de una web que ya tienes</h2>
        <p>Si tu web ya existe pero no te trae clientes, la revisamos por partes y te entregamos una lista ordenada por impacto: primero lo que más se nota y menos cuesta.</p>
        <h3>Velocidad y Core Web Vitals</h3>
        <p>Google mide la experiencia real de tus visitantes con tres indicadores: <strong>LCP</strong> (lo que tarda en aparecer el contenido principal), <strong>INP</strong> (lo rápido que responde al tocar un botón) y <strong>CLS</strong> (si los elementos saltan mientras carga). Revisamos imágenes, fuentes, scripts y servidor para mejorarlos.</p>
        <h3>SEO técnico</h3>
        <p>Que Google pueda rastrear e indexar tus páginas: títulos y descripciones únicos, URLs canónicas, sitemap, robots.txt, páginas de error que devuelvan un 404 de verdad, datos estructurados y enlaces internos que tengan sentido.</p>
        <h3>Accesibilidad</h3>
        <p>Contraste suficiente, navegación con teclado, textos alternativos y etiquetas claras. Ayuda a más personas a usar tu web y suele mejorar también la experiencia de todos.</p>
        <h3>Conversión</h3>
        <p>Que el botón de contacto se vea, que el formulario no espante y que quien entra desde el móvil pueda escribirte por WhatsApp o llamarte con un toque.</p>
      </div>
    </section>

    <section class="sec" aria-labelledby="ejemplo-t">
      <div class="narrow prose">
        <h2 id="ejemplo-t">Un ejemplo real: esta misma web</h2>
        <p>Antes de ofrecer esta revisión, el fundador la aplicó a sanchezdevelop.com, la web anterior del estudio. Encontró problemas que no se ven a simple vista:</p>
        <ul>
          <li>El icono de la pestaña del navegador pesaba <strong>1,4 MB</strong>, el 90 % del peso total de la página. Ahora pesa unos pocos kilobytes.</li>
          <li>Cualquier dirección inventada (por ejemplo, <code>/lo-que-sea</code>) devolvía la portada con un código 200, en lugar de un error 404. Para Google son miles de páginas duplicadas.</li>
          <li>No había <code>robots.txt</code>, sitemap, URL canónica ni datos estructurados.</li>
          <li>La fuente se cargaba desde otro servidor y retrasaba la primera pintura de la página.</li>
        </ul>
        <p>Ninguna de estas cosas se nota al abrir la web en un ordenador rápido. Se nota en un móvil con mala cobertura, y se nota en cómo la entiende Google.</p>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="rehacer-t">
      <div class="narrow prose">
        <h2 id="rehacer-t">¿Retocar o rehacer?</h2>
        <p><strong>Compensa retocar</strong> cuando la base es sólida y los problemas son concretos: contenido desactualizado, imágenes pesadas, un contacto poco visible o errores de SEO técnico.</p>
        <p><strong>Compensa rehacer</strong> cuando la web no se adapta al móvil, la tecnología está abandonada, cada cambio rompe otra cosa o el diseño ya no representa tu negocio.</p>
        <p>Si tu web está hecha con WordPress u otro gestor, la revisamos igualmente y te decimos con sinceridad si somos la opción adecuada para mantenerla o si te conviene otra.</p>
      </div>
    </section>

    <section class="sec" aria-labelledby="proc-t">
      <div class="wrap">
        <div class="sh"><h2 class="t-lg" id="proc-t">Cómo funciona</h2></div>
        <ol class="steps">
          <li><h3>Nos pasas la URL</h3><p>Por WhatsApp o email, con lo que te preocupa de tu web.</p></li>
          <li><h3>Revisión</h3><p>Analizamos velocidad, SEO técnico, accesibilidad y conversión, y te pasamos una lista priorizada.</p></li>
          <li><h3>Propuesta</h3><p>Qué arreglaríamos, en qué orden y por cuánto. Sin obligación de seguir.</p></li>
          <li><h3>Mejoras y medición</h3><p>Aplicamos los cambios y comparamos el antes y el después con datos.</p></li>
        </ol>
      </div>
    </section>
${faq([
    ['¿El mantenimiento es obligatorio?', '<p>No. Es opcional. Muchas webs sencillas funcionan meses sin tocar nada, pero si tu web tiene reservas, pedidos o cambia a menudo, te lo recomendamos.</p>'],
    ['¿Mantenéis webs que no habéis hecho vosotros?', '<p>Depende de cómo estén hechas. Las revisamos primero y te decimos si podemos hacernos cargo con garantías.</p>'],
    ['¿Me garantizáis salir primero en Google?', '<p>No, y desconfía de quien lo haga. Lo que sí podemos hacer es quitar los obstáculos técnicos, mejorar la velocidad y el contenido, y medir la evolución en Search Console.</p>'],
    ['¿Cuánto cuesta una revisión de mi web?', '<p>Escríbenos con la dirección y te decimos qué revisaríamos y cuánto costaría según el tamaño de la web. La primera conversación es gratis.</p>'],
  ])}
${related(['webs', 'apps', 'precio'])}
${finalCta({
    title: 'Tu web,<br><em>siempre a punto.</em>',
    text: 'Pásanos tu web y te decimos qué mejoraríamos primero. <b>Sin compromiso</b> y con respuesta normalmente el mismo día.',
    waText: 'Hola, he visto la página de mantenimiento web de Kódika y quiero que reviséis mi web.',
    mailSubject: 'Revisión y mantenimiento de mi web',
  })}`,
};
