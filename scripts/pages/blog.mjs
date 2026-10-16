import { finalCta, related, abs, PERSON_ID, OG_DEFAULT } from '../lib/site.mjs';

const POSTS = [
  {
    path: '/blog/cuanto-cuesta-una-pagina-web/',
    title: '¿Cuánto cuesta una página web para un negocio en 2026?',
    excerpt: 'Qué hace subir o bajar el precio de una web, los costes que no salen en el presupuesto y cómo comparar ofertas sin llevarte sustos. Con precios reales de ejemplo.',
    date: '2026-10-16',
  },
];

const fmtDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// ---------- /blog/ ----------
const index = {
  path: '/blog/',
  nav: 'blog',
  pageType: 'CollectionPage',
  updated: POSTS[0].date,
  title: 'Blog sobre webs y software para negocios | SanchezDevelop',
  description: 'Guías prácticas y sin tecnicismos para autónomos y pequeñas empresas: precios de webs, reservas online, software a medida e inteligencia artificial.',
  crumbs: [['Inicio', '/'], ['Blog', '/blog/']],
  kick: 'Blog',
  h1: 'Webs y software para negocios, sin tecnicismos',
  lead: 'Guías prácticas para tomar buenas decisiones sobre tu web, tus herramientas y la IA, escritas por quien las programa.',
  heroCtas: false,
  schema: [{
    '@type': 'Blog',
    '@id': abs('/blog/') + '#blog',
    name: 'Blog de SanchezDevelop',
    url: abs('/blog/'),
    inLanguage: 'es-ES',
    author: { '@id': PERSON_ID },
    blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', '@id': abs(p.path) + '#article', headline: p.title, url: abs(p.path), datePublished: p.date })),
  }],
  body: `
    <section class="sec">
      <div class="wrap">
        <ul class="posts">
${POSTS.map(p => `          <li>
            <a class="card" href="${p.path}">
              <h2 class="h-md">${p.title}</h2>
              <p>${p.excerpt}</p>
              <p class="meta"><time datetime="${p.date}">${fmtDate(p.date)}</time> · Álvaro Sánchez</p>
              <span class="go">Leer artículo</span>
            </a>
          </li>`).join('\n')}
        </ul>
      </div>
    </section>`,
};

// ---------- Artículo: cuánto cuesta una web ----------
const p1 = POSTS[0];
const precio = {
  path: p1.path,
  nav: 'blog',
  ogType: 'article',
  updated: p1.date,
  title: '¿Cuánto cuesta una página web para un negocio en 2026?',
  ogTitle: p1.title,
  description: 'Precios reales de ejemplo, qué hace subir el coste de una web, los gastos que no salen en el presupuesto y cómo comparar ofertas sin llevarte sustos.',
  crumbs: [['Inicio', '/'], ['Blog', '/blog/'], ['Cuánto cuesta una página web', p1.path]],
  kick: 'Guía de precios',
  h1: p1.title,
  lead: `Depende de lo que necesites, pero «depende» no ayuda a nadie. Aquí tienes <b>qué hace subir o bajar el precio, ejemplos con cifras reales</b> y una lista para comparar presupuestos.`,
  heroCtas: false,
  about: abs(p1.path) + '#article',
  schema: [{
    '@type': 'BlogPosting',
    '@id': abs(p1.path) + '#article',
    headline: p1.title,
    description: p1.excerpt,
    image: abs(OG_DEFAULT),
    inLanguage: 'es-ES',
    datePublished: p1.date,
    dateModified: p1.date,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: { '@id': abs(p1.path) + '#webpage' },
    isPartOf: { '@type': 'Blog', '@id': abs('/blog/') + '#blog', name: 'Blog de SanchezDevelop', url: abs('/blog/') },
  }],
  body: `
    <article class="sec">
      <div class="narrow prose">
        <p class="meta" style="margin-top:0">Por <a href="/sobre-mi/">Álvaro Sánchez</a>, desarrollador Full Stack · <time datetime="${p1.date}">${fmtDate(p1.date)}</time></p>

        <nav class="toc" aria-label="Contenido del artículo">
          <p>En este artículo</p>
          <ol>
            <li><a href="#corta">La respuesta corta</a></li>
            <li><a href="#formas">Tres formas de tener una web</a></li>
            <li><a href="#factores">Qué hace subir o bajar el precio</a></li>
            <li><a href="#ocultos">Costes que no salen en el presupuesto</a></li>
            <li><a href="#ejemplos">Ejemplos con cifras</a></li>
            <li><a href="#comparar">Cómo comparar presupuestos</a></li>
          </ol>
        </nav>

        <h2 id="corta">La respuesta corta</h2>
        <p>Una web profesional para un negocio pequeño puede costar desde unos pocos cientos de euros hasta varios miles. La diferencia no está en el «diseño», sino en <strong>lo que la web tiene que hacer</strong>: no cuesta lo mismo una página que explica tus servicios que una con reservas, pagos o un área privada.</p>
        <p>Para que tengas una referencia concreta, estos son mis precios orientativos de pago único:</p>
        <table>
          <thead><tr><th scope="col">Qué necesitas</th><th scope="col">Precio orientativo</th></tr></thead>
          <tbody>
            <tr><td>Web de presencia (1 a 3 páginas, con SEO local y ficha de Google)</td><td>250–400 €</td></tr>
            <tr><td>Reservas, citas o pedidos online</td><td>+200–450 €</td></tr>
            <tr><td>Tienda online con pago con tarjeta</td><td>+400–800 €</td></tr>
            <tr><td>Asistente con inteligencia artificial</td><td>+200–500 €</td></tr>
            <tr><td>App o plataforma a medida</td><td>Se estudia aparte</td></tr>
            <tr><td>Mantenimiento (opcional)</td><td>15–25 €/mes</td></tr>
          </tbody>
        </table>
        <p>Son mis tarifas como desarrollador independiente. Otros profesionales y agencias trabajan con rangos muy distintos, así que úsalas como referencia, no como precio de mercado. Puedes combinarlas en el <a href="/#presupuesto">configurador de presupuesto</a>.</p>

        <h2 id="formas">Tres formas de tener una web</h2>
        <h3>1. Hacerla tú con una plataforma prediseñada</h3>
        <p>Pagas una cuota mensual y montas la web con un editor visual. Es la opción más barata al principio, pero <strong>el coste real es tu tiempo</strong>, y el resultado depende de tu mano con el diseño y los textos. Además, la cuota no se acaba nunca y no siempre puedes llevarte la web a otro sitio.</p>
        <p>Encaja si estás empezando, el presupuesto es mínimo y te apetece aprender a hacerlo.</p>
        <h3>2. Un desarrollador independiente</h3>
        <p>Una persona que diseña y programa tu web. Tratas directamente con quien la hace, los costes de estructura son menores y la comunicación es más rápida. El riesgo es elegir mal: conviene ver proyectos reales y preguntar qué pasa después de publicar.</p>
        <h3>3. Una agencia</h3>
        <p>Un equipo con perfiles distintos (diseño, programación, marketing, cuentas). Aporta estructura para proyectos grandes o campañas completas, y normalmente su precio también es mayor. Pregunta quién va a hacer tu web realmente y con quién hablarás.</p>

        <h2 id="factores">Qué hace subir o bajar el precio</h2>
        <ul>
          <li><strong>Funcionalidades.</strong> Es el factor que más pesa. Reservas, pagos, áreas privadas, buscadores o integraciones son programación, y la programación es tiempo.</li>
          <li><strong>Número de páginas y secciones.</strong> Cada página distinta hay que diseñarla, rellenarla y probarla en móvil.</li>
          <li><strong>Diseño a medida o plantilla.</strong> Una plantilla abarata el arranque. Un diseño propio cuesta más, pero se adapta a tu negocio y suele ser más ligero.</li>
          <li><strong>Contenido.</strong> Si tienes textos y fotos listos, todo va más rápido. Si hay que escribirlos o hacer fotos, es trabajo extra, aunque muchas veces es lo que más se nota.</li>
          <li><strong>Integraciones.</strong> Conectar con tu calendario, tu programa de facturación o tu TPV depende de lo que permitan esas herramientas.</li>
          <li><strong>Idiomas.</strong> Cada idioma es contenido nuevo que hay que preparar y mantener.</li>
          <li><strong>SEO.</strong> La base técnica (velocidad, estructura, datos estructurados) debería venir incluida. El trabajo continuado de contenidos es otra cosa y suele presupuestarse aparte.</li>
        </ul>

        <h2 id="ocultos">Costes que no salen en el presupuesto</h2>
        <p>Muchas sorpresas no vienen del precio de la web, sino de lo que hay alrededor. Pide que te los detallen:</p>
        <ul>
          <li><strong>Dominio.</strong> Se paga cada año. Asegúrate de que está registrado a tu nombre.</li>
          <li><strong>Alojamiento.</strong> Varía mucho. Una web estática bien hecha puede alojarse por muy poco, incluso en planes gratuitos de algunos proveedores. Una web con base de datos o tienda necesita algo más.</li>
          <li><strong>Correo profesional</strong> (tu@tunegocio.es). Suele cobrarse por usuario y mes.</li>
          <li><strong>Comisiones de pago.</strong> Si vendes o cobras señales online, la pasarela de pago cobra un porcentaje por transacción.</li>
          <li><strong>Servicios de IA o de email</strong>, que suelen cobrarse por uso.</li>
          <li><strong>Mantenimiento y cambios.</strong> ¿Qué cuesta cambiar un horario o un precio dentro de seis meses?</li>
        </ul>

        <h2 id="ejemplos">Ejemplos con cifras</h2>
        <p>Cuatro casos habituales, calculados con mis precios orientativos:</p>
        <table>
          <thead><tr><th scope="col">Negocio</th><th scope="col">Qué necesita</th><th scope="col">Estimación</th></tr></thead>
          <tbody>
            <tr><td>Fisioterapeuta que empieza</td><td>Que le encuentren en Google y le escriban por WhatsApp</td><td>250–400 €</td></tr>
            <tr><td>Peluquería</td><td>Web con citas online por servicio y profesional</td><td>450–850 €</td></tr>
            <tr><td>Tienda de barrio</td><td>Catálogo, carrito y pago con tarjeta</td><td>650–1.200 €</td></tr>
            <tr><td>Restaurante</td><td>Reservas de mesa y un asistente que responde dudas sobre carta y horarios</td><td>650–1.350 €</td></tr>
          </tbody>
        </table>
        <p>A todo esto se suma el mantenimiento si lo quieres (15–25 €/mes) y los costes de terceros del apartado anterior. El precio final lo cierro siempre por escrito antes de empezar.</p>

        <h2 id="comparar">Cómo comparar presupuestos sin llevarte sustos</h2>
        <p>Dos presupuestos con el mismo precio pueden incluir cosas muy diferentes. Antes de decidir, pregunta:</p>
        <ul>
          <li>¿Qué incluye exactamente y qué <strong>no</strong> incluye?</li>
          <li>¿El dominio y las cuentas están <strong>a mi nombre</strong>?</li>
          <li>¿Qué cuotas tendré que pagar cada mes o cada año, y a quién?</li>
          <li>¿Cuántas rondas de cambios entran antes de publicar?</li>
          <li>¿Cuándo estará lista? ¿Me lo pones por escrito?</li>
          <li>¿Puedo ver la web antes de pagar?</li>
          <li>¿Qué pasa si dentro de un año quiero cambiar de proveedor?</li>
          <li>¿Puedo ver proyectos reales tuyos, funcionando?</li>
        </ul>
        <p class="note">Desconfía de quien te garantice el primer puesto en Google. Nadie controla el algoritmo de Google. Lo que sí se puede garantizar es una web técnicamente bien hecha, rápida y clara.</p>

        <h2>¿Merece la pena pagar más?</h2>
        <p>No siempre. Si solo necesitas que te encuentren y te escriban, una web sencilla y bien hecha es suficiente, y pagar por funciones que no vas a usar es tirar el dinero. Compensa invertir más cuando la web <strong>trabaja por ti</strong>: cuando cada reserva o cada pedido online te ahorra una llamada, o cuando sustituye a una herramienta por la que ya pagas cada mes.</p>
        <p>Si quieres una cifra para tu caso, marca lo que necesitas en el <a href="/#presupuesto">configurador</a> o mira qué incluye el <a href="/diseno-web-empresas/">diseño web para empresas</a> y las <a href="/sistemas-reservas-online/">reservas online</a>.</p>
      </div>
    </article>
${related(['webs', 'reservas', 'mant'], 'Servicios relacionados')}
${finalCta({
    title: '¿Cuánto costaría<br><span class="grad">la tuya?</span>',
    text: 'Cuéntame qué necesitas y te doy un precio cerrado por escrito. <b>Sin compromiso.</b>',
    waText: 'Hola Álvaro, he leído tu artículo sobre precios de webs y quiero un presupuesto para mi negocio.',
  })}`,
};

export default [index, precio];
export { POSTS };
