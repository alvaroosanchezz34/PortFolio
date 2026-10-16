import { faq, finalCta, related, serviceNode } from '../lib/site.mjs';

const path = '/integracion-inteligencia-artificial/';

export default {
  path,
  nav: 'ia',
  updated: '2026-10-16',
  title: 'Integración de IA y automatización para negocios | SanchezDevelop',
  description: 'Asistentes que responden a tus clientes, lectura automática de documentos y tareas que se hacen solas. IA integrada en tu web o tu software, con supervisión humana.',
  crumbs: [['Inicio', '/'], ['Inteligencia artificial y automatización', path]],
  kick: 'IA y automatización',
  h1: 'Integración de inteligencia artificial y automatización de procesos',
  lead: 'IA que resuelve problemas reales: <b>asistentes que responden a tus clientes, documentos que se leen solos y tareas repetitivas que se hacen sin ti</b>, integrados en tu web o en tu software.',
  facts: ['IA ya funcionando en ResumeAI y Workly', 'Asistente en tu web desde 200 €', 'Con supervisión humana en lo importante'],
  waText: 'Hola Álvaro, he visto tu página de inteligencia artificial y quiero automatizar algo en mi negocio.',
  heroLink: '<a class="lnk" href="/#demo">Prueba la demo con IA</a>',
  about: 'https://sanchezdevelop.com/integracion-inteligencia-artificial/#service',
  schema: [serviceNode({
    path,
    name: 'Integración de inteligencia artificial y automatización de procesos',
    serviceType: 'Integración de inteligencia artificial',
    description: 'Asistentes con IA para atender clientes, extracción automática de datos de documentos, generación de borradores y automatización de tareas repetitivas mediante APIs.',
  })],
  body: `
    <section class="sec" aria-labelledby="usos-t">
      <div class="wrap">
        <div class="sec-head">
          <h2 class="h-lg" id="usos-t">Dónde aporta la IA en un negocio pequeño</h2>
          <p class="lead">No hace falta ser una gran empresa. Estos son usos concretos, <b>varios de ellos ya funcionando en mis propios productos</b>.</p>
        </div>
        <div class="cards">
          <div class="card"><h3>Un asistente que atiende por ti</h3><p>Conoce tus servicios, horarios y precios, responde a tus clientes aunque estés cerrado y te pasa a ti lo que no sabe resolver.</p></div>
          <div class="card"><h3>Documentos que se leen solos</h3><p>Tickets, facturas o albaranes convertidos en datos sin teclearlos. <a href="/proyectos/workly/">Workly</a> lee tickets de gasto por OCR.</p></div>
          <div class="card"><h3>Borradores en segundos</h3><p>Presupuestos, descripciones de producto o respuestas a clientes listos para revisar. Workly genera presupuestos con IA.</p></div>
          <div class="card"><h3>Resúmenes y clasificación</h3><p>Emails, solicitudes o reseñas ordenados y resumidos para que veas lo importante de un vistazo.</p></div>
          <div class="card"><h3>Contenido a partir de tu material</h3><p><a href="/proyectos/resumeai/">ResumeAI</a> convierte PDFs, imágenes y vídeos en flashcards, resúmenes y exámenes con GPT-4o.</p></div>
          <div class="card"><h3>Una muestra en esta web</h3><p>La <a href="/#demo">demo de la portada</a> genera una maqueta de web para tu negocio con IA, en segundos.</p></div>
        </div>
      </div>
    </section>

    <section class="sec soft" aria-labelledby="auto-t">
      <div class="narrow prose">
        <h2 id="auto-t">Automatización: muchas veces no hace falta IA</h2>
        <p>Buena parte del tiempo que se pierde en un negocio son tareas repetitivas con reglas claras. Para eso basta con programarlas bien, sin IA de por medio, y resulta más barato y más predecible:</p>
        <ul>
          <li><strong>Facturas recurrentes</strong> que se generan solas cada mes, como hace Workly con un programador de tareas diario.</li>
          <li><strong>Avisos y recordatorios</strong> automáticos a clientes o a tu equipo.</li>
          <li><strong>Sincronizar datos</strong> entre tu web, tu hoja de cálculo y tu programa de facturación mediante APIs.</li>
          <li><strong>Informes</strong> que llegan solos a tu correo, o exportaciones a Excel y PDF con un clic.</li>
        </ul>
        <p>Mi forma de empezar es sencilla: me cuentas qué tarea te quita más horas a la semana y vemos si se puede automatizar, cómo, y si compensa.</p>
      </div>
    </section>

    <section class="sec" aria-labelledby="como-t">
      <div class="narrow prose">
        <h2 id="como-t">Cómo integro la IA para que sea fiable</h2>
        <ul>
          <li><strong>Una tarea concreta y medible.</strong> «Responder dudas sobre horarios y reservas» funciona; «poner IA en la web» no.</li>
          <li><strong>Respuestas acotadas a tu información.</strong> El asistente trabaja con los datos de tu negocio y tiene instrucciones para no inventar precios ni compromisos. Lo que no sabe, te lo pasa.</li>
          <li><strong>Salidas estructuradas y validadas.</strong> Cuando la IA genera datos (una maqueta, un presupuesto, unas preguntas de examen), le pido un formato fijo y lo compruebo en el servidor antes de usarlo. La demo de esta web funciona así.</li>
          <li><strong>El modelo adecuado para cada caso.</strong> Uso la API de OpenAI y elijo el modelo según lo que importe más: calidad, rapidez o coste. La demo usa un modelo pequeño y rápido, y ResumeAI usa GPT-4o.</li>
          <li><strong>Supervisión humana.</strong> La IA se equivoca a veces. En lo importante (un presupuesto, una factura, un dato de salud) siempre revisa una persona antes de que llegue al cliente.</li>
          <li><strong>Datos personales con cuidado.</strong> Al proveedor de IA solo se le envía lo imprescindible, se informa en la política de privacidad y se cumple el RGPD.</li>
        </ul>
      </div>
    </section>

    <section class="sec soft" aria-labelledby="precio-t">
      <div class="narrow prose">
        <h2 id="precio-t">Precio</h2>
        <p>Un <strong>asistente con IA integrado en tu web</strong> suma entre <strong>200 y 500 €</strong> al precio de la web, según lo que tenga que saber hacer. Las automatizaciones e integraciones a medida las presupuesto cuando veo el proceso, porque no hay dos iguales.</p>
        <p>Además, el proveedor de IA cobra por uso. En los volúmenes de un negocio pequeño suele ser un coste bajo, pero te lo estimo según tus consultas previstas antes de empezar, para que no haya sorpresas.</p>
      </div>
    </section>
${faq([
    ['¿La IA puede equivocarse con mis clientes?', '<p>Sí, por eso la limito a tu información, le doy instrucciones claras de qué no debe hacer y hago que derive a ti los casos dudosos. En tareas sensibles, la IA prepara un borrador y la decisión la tomas tú.</p>'],
    ['¿Qué pasa con los datos que se envían a la IA?', '<p>Se envía solo lo necesario para la tarea, nunca más. Se informa a tus clientes en la política de privacidad, y el proveedor se elige y se configura teniendo en cuenta el RGPD.</p>'],
    ['¿Necesito tener una web para usar un asistente?', '<p>Lo habitual es integrarlo en tu web. Si es para un proceso interno, como leer documentos o preparar presupuestos, puede ir dentro de una herramienta propia.</p>'],
    ['¿Tiene una cuota mensual?', '<p>Mi trabajo se paga una vez. El proveedor de IA cobra según el uso, y te lo estimo antes de empezar. Si quieres que lo vigile y lo ajuste con el tiempo, entra en el <a href="/mantenimiento-web/">mantenimiento</a>.</p>'],
    ['¿Y si al final no me hace falta IA?', '<p>Te lo diré. Muchas mejoras se resuelven con una automatización sencilla o con una web mejor planteada, sin IA.</p>'],
  ])}
${related(['apps', 'reservas', 'resumeai'])}
${finalCta({
    title: 'Menos tareas.<br><span class="grad">Más negocio.</span>',
    text: 'Cuéntame qué te quita más tiempo cada semana y te digo si se puede automatizar. <b>La primera conversación es gratis.</b>',
    waText: 'Hola Álvaro, he visto tu página de inteligencia artificial y quiero automatizar algo en mi negocio.',
    mailSubject: 'Quiero integrar IA o automatizar un proceso',
  })}`,
};
