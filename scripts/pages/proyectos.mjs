import { finalCta, abs, PERSON_ID } from '../lib/site.mjs';

const img = (name, alt, eager = false) => `<img src="/assets/img/proyectos/${name}-1280.webp"
            srcset="/assets/img/proyectos/${name}-640.webp 640w, /assets/img/proyectos/${name}-1280.webp 1280w"
            sizes="(max-width: 860px) 100vw, 620px" width="1280" height="800" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

const shot = (name, alt, caption, eager) => `
          <figure class="shot">
            ${img(name, alt, eager)}
            <figcaption>${caption}</figcaption>
          </figure>`;

const caseSchema = ({ path, headline, description, image, product, productUrl }) => [{
  '@type': 'Article',
  '@id': abs(path) + '#article',
  headline,
  description,
  image: abs(image),
  inLanguage: 'es-ES',
  datePublished: '2026-10-16',
  dateModified: '2026-10-16',
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  mainEntityOfPage: { '@id': abs(path) + '#webpage' },
  about: { '@type': 'CreativeWork', name: product, url: productUrl, creator: { '@id': PERSON_ID } },
}];

// ---------- /proyectos/ ----------
const hub = {
  path: '/proyectos/',
  nav: 'proyectos',
  pageType: 'CollectionPage',
  updated: '2026-10-16',
  title: 'Proyectos: ResumeAI y Workly | SanchezDevelop',
  description: 'Casos de estudio de dos plataformas completas diseñadas y programadas por Álvaro Sánchez: ResumeAI (estudio con IA) y Workly (gestión para autónomos).',
  crumbs: [['Inicio', '/'], ['Proyectos', '/proyectos/']],
  kick: 'Proyectos',
  h1: 'Proyectos propios en producción',
  lead: 'Dos plataformas completas que he diseñado y programado yo solo: <b>frontend, backend, base de datos, pagos e inteligencia artificial</b>. Son la mejor muestra de lo que puedo construir para tu negocio.',
  waText: 'Hola Álvaro, he visto tus proyectos y quiero algo parecido para mi negocio.',
  heroLink: '<a class="lnk" href="/aplicaciones-web/">Ver aplicaciones a medida</a>',
  ogImage: '/assets/og/resumeai.jpg',
  ogAlt: 'Captura de ResumeAI, plataforma de estudio con IA',
  body: `
    <section class="sec">
      <div class="wide">
        <article class="proj">
          <div>
            <p class="kick">Plataforma de estudio con IA</p>
            <h2 class="h-lg">ResumeAI</h2>
            <p class="d">Convierte PDFs, textos, imágenes y vídeos de YouTube en flashcards, resúmenes, exámenes y mapas mentales. Un SaaS con cuentas de usuario, periodo de prueba y suscripción Premium.</p>
            <ul class="tech"><li>Next.js</li><li>Node.js</li><li>MongoDB</li><li>OpenAI GPT-4o</li><li>Stripe</li></ul>
            <div class="ctas"><a class="btn" href="/proyectos/resumeai/">Ver caso de estudio</a><a class="lnk" href="https://resume-ai.dev" target="_blank" rel="noopener">Visitar resume-ai.dev</a></div>
          </div>
${shot('resumeai-hero', 'Portada de ResumeAI: «Estudia 2× más rápido con Inteligencia Artificial», con los botones para empezar gratis', 'Portada de ResumeAI en producción.', true)}
        </article>

        <article class="proj">
          <div>
            <p class="kick">Gestión para autónomos</p>
            <h2 class="h-lg">Workly</h2>
            <p class="d">Clientes, proyectos, presupuestos, facturas en PDF, gastos, horas y contabilidad en una sola herramienta, para dejar atrás las hojas de cálculo.</p>
            <ul class="tech"><li>React 19</li><li>Vite</li><li>Node.js + Express</li><li>MySQL</li><li>Stripe</li><li>OpenAI</li></ul>
            <div class="ctas"><a class="btn" href="/proyectos/workly/">Ver caso de estudio</a><a class="lnk" href="https://workly.space" target="_blank" rel="noopener">Visitar workly.space</a></div>
          </div>
${shot('workly-hero', 'Portada de Workly: «Centraliza tu negocio. Factura sin fricciones», con las tecnologías del producto', 'Portada de Workly en producción.')}
        </article>
      </div>
    </section>

    <section class="sec soft">
      <div class="narrow prose">
        <h2>¿Y las webs de negocios de la portada?</h2>
        <p>Casa Marisa, Nácar Estudio o Fisio Malagueta, que aparecen en las animaciones de la portada, son <strong>ejemplos ilustrativos</strong> para que veas cómo podría quedar una web de restaurante, peluquería o clínica. No son clientes reales, y por eso no aparecen aquí como casos de éxito.</p>
        <p>Si quieres ver una primera idea para tu propio negocio, prueba la <a href="/#demo">demo con IA</a> o mira cómo trabajo el <a href="/diseno-web-empresas/">diseño web para empresas</a>.</p>
      </div>
    </section>
${finalCta({
    title: '¿Quieres algo así<br><span class="grad">para tu negocio?</span>',
    text: 'Cuéntame tu idea y te digo cómo la construiría. <b>La primera conversación es gratis.</b>',
    waText: 'Hola Álvaro, he visto tus proyectos y quiero algo parecido para mi negocio.',
    mailSubject: 'Proyecto a medida',
  })}`,
};

// ---------- /proyectos/resumeai/ ----------
const resumeai = {
  path: '/proyectos/resumeai/',
  nav: 'proyectos',
  updated: '2026-10-16',
  ogType: 'article',
  title: 'ResumeAI, caso de estudio: SaaS de estudio con IA | SanchezDevelop',
  description: 'Cómo es ResumeAI por dentro: un SaaS que convierte PDFs, imágenes y vídeos de YouTube en flashcards, resúmenes y exámenes con GPT-4o, con suscripciones en Stripe.',
  crumbs: [['Inicio', '/'], ['Proyectos', '/proyectos/'], ['ResumeAI', '/proyectos/resumeai/']],
  kick: 'Caso de estudio',
  h1: 'ResumeAI: plataforma de estudio con inteligencia artificial',
  lead: 'Un producto SaaS completo que convierte <b>PDFs, textos, imágenes y vídeos de YouTube</b> en flashcards, resúmenes, exámenes y mapas mentales, con cuentas de usuario, periodo de prueba y suscripción.',
  facts: ['Diseño y desarrollo: Álvaro Sánchez', 'En producción', '<a href="https://resume-ai.dev" target="_blank" rel="noopener">resume-ai.dev</a>'],
  waText: 'Hola Álvaro, he visto el caso de ResumeAI y quiero una plataforma parecida.',
  heroLink: '<a class="lnk" href="https://resume-ai.dev" target="_blank" rel="noopener">Visitar ResumeAI</a>',
  ogImage: '/assets/og/resumeai.jpg',
  ogAlt: 'Captura de ResumeAI, plataforma de estudio con IA',
  about: 'https://sanchezdevelop.com/proyectos/resumeai/#article',
  schema: caseSchema({
    path: '/proyectos/resumeai/',
    headline: 'ResumeAI: plataforma de estudio con inteligencia artificial',
    description: 'Caso de estudio de ResumeAI, un SaaS que genera material de estudio con GPT-4o a partir de PDFs, imágenes y vídeos.',
    image: '/assets/img/proyectos/resumeai-hero-1280.webp',
    product: 'ResumeAI',
    productUrl: 'https://resume-ai.dev',
  }),
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>El problema</h2>
        <p>Preparar un examen no es solo estudiar: antes hay que convertir apuntes, PDFs y vídeos en algo repasable. Hacer resúmenes, escribir tarjetas de memoria y montar tests de práctica lleva horas que no se dedican a aprender.</p>
        <p>ResumeAI automatiza esa preparación. El estudiante sube su material y obtiene en segundos el material de repaso, listo para estudiar con repetición espaciada y para practicar en modo examen.</p>
        <h2>Para quién es</h2>
        <p>Estudiantes que preparan exámenes a partir de mucho material propio: apuntes, temarios en PDF, fotos de apuntes a mano o clases grabadas en YouTube.</p>
      </div>
    </section>

    <section class="sec soft">
      <div class="wide shots">
${shot('resumeai-features', 'Sección de funciones de ResumeAI: generación automática, importación de PDF y YouTube, modo examen, mapas mentales, chat tutor y más', 'Funciones principales, tal como aparecen en la web del producto.')}
      </div>
    </section>

    <section class="sec">
      <div class="narrow prose">
        <h2>Funcionalidades</h2>
        <ul>
          <li><strong>Generación automática</strong> de resúmenes, flashcards y tests a partir de texto, PDF o una URL.</li>
          <li><strong>Importación de PDF y de vídeos de YouTube.</strong></li>
          <li><strong>OCR de imágenes</strong>: fotos de apuntes escritos a mano convertidas en texto editable.</li>
          <li><strong>Modo examen</strong> cronometrado con corrección por pregunta.</li>
          <li><strong>Chat tutor</strong> para preguntar dudas sobre tu propio material.</li>
          <li><strong>Mapas mentales</strong> generados automáticamente.</li>
          <li><strong>Repetición espaciada</strong>, rachas diarias, logros y estadísticas de progreso.</li>
          <li><strong>Seis idiomas</strong>.</li>
          <li><strong>Modelo de negocio SaaS</strong>: prueba gratuita de 15 días, suscripción Premium y un programa de embajadores con enlaces de afiliado y códigos de descuento.</li>
        </ul>

        <h2>Tecnologías y arquitectura</h2>
        <ul class="tech"><li>Next.js</li><li>Node.js</li><li>MongoDB</li><li>OpenAI GPT-4o</li><li>Stripe</li><li>Vercel</li></ul>
        <ul>
          <li><strong>Next.js</strong> para la interfaz y las páginas públicas del producto.</li>
          <li><strong>Node.js</strong> en el servidor.</li>
          <li><strong>MongoDB</strong> como base de datos para usuarios y material generado.</li>
          <li><strong>OpenAI GPT-4o</strong> para generar resúmenes, tarjetas, preguntas y respuestas del tutor.</li>
          <li><strong>Stripe</strong> para el periodo de prueba, las suscripciones y los pagos.</li>
          <li>Desplegado en <strong>Vercel</strong>.</li>
        </ul>

        <h2>Lo que exige técnicamente un producto así</h2>
        <ul>
          <li><strong>Entradas muy distintas.</strong> Un PDF, la transcripción de un vídeo y una foto de apuntes llegan con formatos y calidades diferentes. Hay que convertirlos en texto limpio antes de pasárselo a la IA.</li>
          <li><strong>Salidas que la app pueda usar.</strong> Una flashcard o una pregunta tipo test no pueden llegar como texto libre. Se piden en un formato fijo y se validan antes de guardarlas.</li>
          <li><strong>Coste y tiempo de respuesta.</strong> Cada generación tiene un coste por uso y una espera. Los límites por plan y una buena gestión de las peticiones mantienen el producto rentable y ágil.</li>
          <li><strong>Suscripciones sin cabos sueltos.</strong> Las pruebas, renovaciones, cancelaciones y pagos fallidos tienen que reflejarse siempre en lo que el usuario puede hacer dentro de la app.</li>
        </ul>

        <h2>Qué puede aprovechar tu negocio de este proyecto</h2>
        <p>La misma base sirve para muchos negocios: una plataforma con usuarios y suscripciones, IA que trabaja sobre los documentos del cliente o un área privada con pagos. Si es lo que buscas, lo cuento en <a href="/aplicaciones-web/">aplicaciones web a medida</a> y en <a href="/integracion-inteligencia-artificial/">integración de inteligencia artificial</a>.</p>
      </div>
    </section>
${finalCta({
    title: '¿Una plataforma así<br><span class="grad">para tu idea?</span>',
    text: 'Cuéntame qué quieres construir y te digo cómo lo plantearía, por fases y con precio por escrito.',
    waText: 'Hola Álvaro, he visto el caso de ResumeAI y quiero una plataforma parecida.',
    mailSubject: 'Plataforma tipo ResumeAI',
  })}`,
};

// ---------- /proyectos/workly/ ----------
const workly = {
  path: '/proyectos/workly/',
  nav: 'proyectos',
  updated: '2026-10-16',
  ogType: 'article',
  title: 'Workly, caso de estudio: gestión para autónomos | SanchezDevelop',
  description: 'Cómo es Workly por dentro: clientes, proyectos, facturas en PDF, gastos, horas y modelos 130 y 303 en una plataforma con React 19, Express y MySQL.',
  crumbs: [['Inicio', '/'], ['Proyectos', '/proyectos/'], ['Workly', '/proyectos/workly/']],
  kick: 'Caso de estudio',
  h1: 'Workly: software de gestión para autónomos y freelancers',
  lead: 'Clientes, proyectos, presupuestos, <b>facturas en PDF, gastos, control de horas y contabilidad</b> en una sola herramienta, pensada para que un autónomo deje las hojas de cálculo.',
  facts: ['Diseño y desarrollo: Álvaro Sánchez', 'En producción, con plan gratuito', '<a href="https://workly.space" target="_blank" rel="noopener">workly.space</a>'],
  waText: 'Hola Álvaro, he visto el caso de Workly y quiero un software de gestión para mi negocio.',
  heroLink: '<a class="lnk" href="https://workly.space" target="_blank" rel="noopener">Visitar Workly</a>',
  ogImage: '/assets/og/workly.jpg',
  ogAlt: 'Captura de Workly, software de gestión para autónomos',
  about: 'https://sanchezdevelop.com/proyectos/workly/#article',
  schema: caseSchema({
    path: '/proyectos/workly/',
    headline: 'Workly: software de gestión para autónomos y freelancers',
    description: 'Caso de estudio de Workly, plataforma de clientes, facturación, gastos, horas y contabilidad para autónomos.',
    image: '/assets/img/proyectos/workly-hero-1280.webp',
    product: 'Workly',
    productUrl: 'https://workly.space',
  }),
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>El problema</h2>
        <p>Muchos autónomos llevan su negocio repartido entre una hoja de cálculo de clientes, un programa para facturar, otro para las horas y una carpeta de tickets. Cada mes toca juntarlo todo para saber cuánto han facturado, qué falta por cobrar y cuánto IVA o IRPF tendrán que pagar.</p>
        <p>Workly reúne todo eso en una sola plataforma: cada factura sale de un cliente y un proyecto, cada gasto queda registrado y los números del trimestre ya están calculados.</p>
        <h2>Para quién es</h2>
        <p>Autónomos, freelancers y equipos pequeños que facturan por proyectos o por horas y quieren tener el negocio bajo control sin contratar un ERP.</p>
      </div>
    </section>

    <section class="sec soft">
      <div class="wide shots">
${shot('workly-features', 'Sección de funciones de Workly: gestión de clientes, proyectos y Kanban, facturación, presupuestos, facturas recurrentes, notas de crédito, gastos y dashboard', 'Los módulos de Workly, tal como aparecen en la web del producto.')}
      </div>
    </section>

    <section class="sec">
      <div class="narrow prose">
        <h2>Funcionalidades</h2>
        <ul>
          <li><strong>Clientes</strong> con búsqueda en tiempo real, historial por cliente y papelera de reciclaje.</li>
          <li><strong>Proyectos</strong> en un tablero Kanban con arrastrar y soltar, vinculados a cada cliente.</li>
          <li><strong>Facturación</strong> con IVA, descuentos y líneas de detalle, PDF profesional, numeración correlativa y portal público para el cliente.</li>
          <li><strong>Presupuestos</strong> que se convierten en factura con un clic.</li>
          <li><strong>Facturas recurrentes</strong> que se generan solas con una periodicidad configurable.</li>
          <li><strong>Notas de crédito</strong> (rectificativas) vinculadas a la factura original, para corregir importes sin borrar registros.</li>
          <li><strong>Gastos</strong> por categoría, con exportación a Excel.</li>
          <li><strong>Dashboard financiero</strong>: ingresos, gastos, beneficio neto, mejores clientes y evolución de 12 meses.</li>
          <li><strong>Contabilidad</strong>: libro de ingresos y gastos y <strong>modelos 130 y 303</strong> precalculados.</li>
          <li><strong>Control de horas</strong> con temporizador por proyecto y tarifa por hora.</li>
          <li><strong>Asistente con IA</strong>: presupuestos inteligentes, lectura de tickets por OCR y resúmenes del negocio.</li>
          <li><strong>Calendario</strong> de vencimientos de facturas, presupuestos y proyectos.</li>
        </ul>

        <h2>Tecnologías y arquitectura</h2>
        <ul class="tech"><li>React 19</li><li>Vite</li><li>Node.js</li><li>Express</li><li>MySQL</li><li>JWT</li><li>Stripe</li><li>Resend</li><li>OpenAI</li><li>PDFKit</li><li>ExcelJS</li><li>node-cron</li></ul>
        <ul>
          <li><strong>React 19 con Vite</strong> para una aplicación rápida detrás del inicio de sesión.</li>
          <li><strong>Node.js y Express</strong> para la API.</li>
          <li><strong>MySQL</strong>, una base de datos relacional: encaja con datos que dependen unos de otros, como clientes, facturas, líneas y pagos.</li>
          <li><strong>JWT</strong> para la autenticación.</li>
          <li><strong>PDFKit</strong> para las facturas y presupuestos en PDF y <strong>ExcelJS</strong> para las exportaciones.</li>
          <li><strong>node-cron</strong> para las tareas programadas, como generar cada día las facturas recurrentes.</li>
          <li><strong>Resend</strong> para los emails, <strong>Stripe</strong> para los planes de pago y <strong>OpenAI</strong> para el asistente.</li>
        </ul>

        <h2>Lo que exige técnicamente un producto así</h2>
        <ul>
          <li><strong>La facturación no admite atajos.</strong> La numeración tiene que ser correlativa y una factura emitida no se borra: se corrige con una rectificativa. Por eso existen las notas de crédito vinculadas.</li>
          <li><strong>Cálculos fiables.</strong> IVA, descuentos, retenciones y los modelos trimestrales tienen que cuadrar al céntimo con lo que se ha facturado y gastado.</li>
          <li><strong>Tareas que ocurren sin nadie delante.</strong> Las facturas recurrentes y los avisos tienen que ejecutarse cada día sin duplicarse ni perderse.</li>
          <li><strong>Documentos profesionales.</strong> Los PDF de factura y de presupuesto son lo que ve el cliente final, así que tienen que salir bien siempre.</li>
        </ul>

        <h2>Qué puede aprovechar tu negocio de este proyecto</h2>
        <p>Si tu empresa sigue un proceso propio (presupuestos, pedidos, trabajos o turnos), puede tener una herramienta hecha a su medida con esta misma base. Lo cuento en <a href="/aplicaciones-web/">aplicaciones web y software a medida</a>, y las tareas automáticas en <a href="/integracion-inteligencia-artificial/">IA y automatización</a>.</p>
      </div>
    </section>
${finalCta({
    title: 'Tu negocio,<br><span class="grad">bajo control.</span>',
    text: 'Cuéntame cómo trabajas hoy y te digo qué herramienta construiría para ti.',
    waText: 'Hola Álvaro, he visto el caso de Workly y quiero un software de gestión para mi negocio.',
    mailSubject: 'Software de gestión a medida',
  })}`,
};

export default [hub, resumeai, workly];
