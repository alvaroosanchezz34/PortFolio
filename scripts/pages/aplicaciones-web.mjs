import { faq, finalCta, related, serviceNode } from '../lib/site.mjs';

const path = '/aplicaciones-web/';

export default {
  path,
  nav: 'apps',
  updated: '2026-10-16',
  title: 'Desarrollo de aplicaciones web y software a medida | Kódika',
  description: 'Plataformas SaaS, paneles de gestión, portales de clientes y APIs con React, Next.js, Angular, Node.js o Spring Boot, de la idea al despliegue.',
  crumbs: [['Inicio', '/'], ['Aplicaciones web y software a medida', path]],
  kick: 'Software a medida',
  h1: 'Desarrollo de aplicaciones web y software a medida',
  lead: 'Cuando una hoja de cálculo o una herramienta genérica se te queda corta, construimos la aplicación que necesita tu negocio: <b>plataformas SaaS, paneles de gestión, portales de clientes y APIs</b>, de la idea al despliegue.',
  facts: ['Frontend, backend y base de datos', 'De la idea al despliegue', 'Alcance y precio por escrito antes de empezar'],
  waText: 'Hola, he visto la página de aplicaciones web de Kódika y tengo un proyecto a medida.',
  heroLink: '<a class="lnk" href="/demos/flowbook/">Ver la demo de Flowbook <span class="arr" aria-hidden="true">→</span></a>',
  about: 'https://kodikadigital.com/aplicaciones-web/#service',
  schema: [serviceNode({
    path,
    name: 'Desarrollo de aplicaciones web y software a medida',
    serviceType: 'Desarrollo de software a medida',
    description: 'Diseño y desarrollo Full Stack de plataformas SaaS, software de gestión, portales de clientes, APIs REST e integraciones de pagos.',
  })],
  body: `
    <section class="sec" aria-labelledby="que-t">
      <div class="wrap">
        <div class="sh"><h2 class="t-lg" id="que-t">Qué podemos construir</h2></div>
        <div class="cards">
          <div class="card"><h3>Plataformas SaaS</h3><p>Productos online con registro de usuarios, planes de pago y suscripciones. Mira la <a href="/demos/flowbook/">demo de Flowbook</a>.</p></div>
          <div class="card"><h3>Software de gestión</h3><p>Clientes, proyectos, facturas, stock o turnos en una herramienta hecha para tu proceso, no para cualquiera.</p></div>
          <div class="card"><h3>Portales y áreas de cliente</h3><p>Un espacio privado donde tus clientes consultan pedidos, documentos, citas o el estado de su servicio.</p></div>
          <div class="card"><h3>APIs REST e integraciones</h3><p>Conectar tu web con tu facturación, tu CRM, tu TPV o una pasarela de pago para que los datos no se copien a mano.</p></div>
          <div class="card"><h3>Paneles y dashboards</h3><p>Tus números importantes en una sola pantalla, actualizados solos, en lugar de cinco hojas de cálculo.</p></div>
          <div class="card"><h3>MVP para validar una idea</h3><p>Una primera versión con lo esencial, para comprobar con usuarios reales antes de invertir en todo lo demás.</p></div>
        </div>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="senal-t">
      <div class="narrow prose">
        <h2 id="senal-t">Cuándo compensa el software a medida</h2>
        <p>Estas son las señales más habituales de que una herramienta propia te ahorraría tiempo o dinero:</p>
        <ul>
          <li>Pasas horas <strong>copiando datos de una herramienta a otra</strong>.</li>
          <li>El negocio depende de <strong>hojas de cálculo que solo entiende una persona</strong>.</li>
          <li>Pagas <strong>varias suscripciones que no se comunican</strong> entre sí.</li>
          <li>Tu proceso <strong>no encaja en ningún programa estándar</strong> y acabas adaptándote tú al programa.</li>
          <li>Quieres <strong>convertir tu servicio en un producto online</strong> por el que se pague una cuota.</li>
        </ul>
        <p class="note">Y cuando no compensa: si ya existe una herramienta que cubre casi todo lo que necesitas por una cuota razonable, normalmente sale más a cuenta usarla, o integrarla con lo que ya tienes. Te lo diremos antes de presupuestar nada.</p>
      </div>
    </section>

    <section class="sec" aria-labelledby="tec-t">
      <div class="narrow prose">
        <h2 id="tec-t">Tecnologías: elegimos según el proyecto</h2>
        <p>Trabajamos en todo el recorrido de una aplicación, del diseño de la interfaz a la base de datos y el despliegue. No usamos siempre lo mismo: cada pieza tiene sus puntos fuertes.</p>
        <table>
          <thead><tr><th scope="col">Capa</th><th scope="col">Tecnologías</th><th scope="col">Cuándo encaja</th></tr></thead>
          <tbody>
            <tr><td>Interfaz</td><td>React, Next.js, Angular, TypeScript</td><td>Next.js cuando las páginas públicas tienen que posicionar en Google. React con Vite para paneles tras un login. Angular en proyectos grandes con muchos formularios o equipos que ya lo usan.</td></tr>
            <tr><td>Servidor</td><td>Node.js con Express, Spring Boot</td><td>Node.js para APIs ágiles y tiempo real. Spring Boot (Java) cuando la empresa ya trabaja en Java o necesita un backend muy estructurado.</td></tr>
            <tr><td>Datos</td><td>MySQL, MongoDB, Firebase</td><td>MySQL para datos muy relacionados entre sí, como clientes, facturas o pedidos. MongoDB para documentos de forma variable. Firebase para prototipos rápidos y apps con sincronización en tiempo real.</td></tr>
            <tr><td>Servicios</td><td>Stripe, email transaccional, OpenAI</td><td>Pagos y suscripciones, avisos por email e <a href="/integracion-inteligencia-artificial/">inteligencia artificial</a> integrada en el producto.</td></tr>
            <tr><td>Despliegue</td><td>Servicios cloud como Vercel o Cloudflare</td><td>Publicación automática, HTTPS y buen rendimiento sin mantener servidores propios cuando no hace falta.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="proc-t">
      <div class="wrap">
        <div class="sh"><h2 class="t-lg" id="proc-t">Cómo se trabaja un proyecto a medida</h2></div>
        <ol class="steps">
          <li><h3>Entender el problema</h3><p>Antes de hablar de pantallas, vemos tu proceso: quién usa la herramienta, qué hace hoy y dónde pierde tiempo.</p></li>
          <li><h3>Alcance y primera versión</h3><p>Definimos lo mínimo que ya aporta valor y lo dejamos por escrito: funcionalidades, fases, plazos y precio.</p></li>
          <li><h3>Desarrollo por iteraciones</h3><p>Ves avances sobre la aplicación real cada poco tiempo, así corregimos el rumbo pronto y no al final.</p></li>
          <li><h3>Lanzamiento y acompañamiento</h3><p>Despliegue, datos iniciales y ayuda en los primeros días. Después, mejoras y mantenimiento si lo necesitas.</p></li>
        </ol>
      </div>
    </section>

    <section class="sec" aria-labelledby="exp-t">
      <div class="wrap">
        <div class="sh">
          <h2 class="t-lg" id="exp-t">Míralo funcionando</h2>
          <p class="lede">Dos de las demos de este estudio muestran el tipo de producto que podemos construir. <b>Son ficticias, pero lo que hacen funciona</b>: datos, estados, filtros y paneles.</p>
        </div>
        <div class="cards">
          <a class="card" href="/demos/flowbook/"><h3>Flowbook · SaaS de reservas</h3><p>Landing de producto y panel de administración: calendario semanal, alta de citas, estados y métricas calculadas al momento.</p><ul class="tech"><li>JavaScript</li><li>Estado local</li><li>Responsive</li></ul><span class="go">Abrir demo</span></a>
          <a class="card" href="/demos/noir-atelier/"><h3>Noir Atelier · Tienda de moda</h3><p>Catálogo filtrable, fichas con tallas y colores, y una bolsa de compra que recuerda lo que añades.</p><ul class="tech"><li>Catálogo</li><li>Variantes</li><li>Carrito</li></ul><span class="go">Abrir demo</span></a>
        </div>
      </div>
    </section>

    <section class="sec" aria-labelledby="precio-t">
      <div class="narrow prose">
        <h2 id="precio-t">Qué influye en el presupuesto</h2>
        <ul>
          <li><strong>Tipos de usuario y permisos.</strong> Una herramienta solo para ti no es lo mismo que una con clientes, empleados y administradores.</li>
          <li><strong>Integraciones.</strong> Cada servicio externo (pagos, facturación, calendarios, IA) añade trabajo y pruebas.</li>
          <li><strong>Pagos y suscripciones.</strong> Altas, bajas, periodos de prueba, facturas y cambios de plan.</li>
          <li><strong>Datos e informes.</strong> El volumen de datos, las búsquedas y las exportaciones a Excel o PDF.</li>
          <li><strong>Requisitos legales.</strong> Facturación, protección de datos y conservación de registros.</li>
          <li><strong>Mantenimiento posterior.</strong> Un software vivo necesita actualizaciones y mejoras.</li>
        </ul>
        <p>Con todo eso sobre la mesa, te damos el alcance y el precio por escrito. Empezar por una primera versión acotada reduce mucho el riesgo.</p>
      </div>
    </section>
${faq([
    ['¿Cuánto cuesta una aplicación web a medida?', '<p>Depende por completo del alcance, así que no daremos una cifra sin conocer el proyecto. Tras una primera charla gratuita te pasamos por escrito qué incluye, en qué fases y por cuánto.</p>'],
    ['¿Podéis continuar un proyecto que empezó otra persona?', '<p>Podemos revisarlo. Según la tecnología y el estado del código, te diremos con sinceridad si compensa continuarlo, rehacer partes o empezar de nuevo.</p>'],
    ['¿Trabajáis con empresas de fuera de Málaga?', '<p>Sí. Las reuniones, las demos y las entregas se pueden hacer en remoto con negocios de toda España.</p>'],
    ['¿Qué pasa después del lanzamiento?', '<p>No desaparecemos: corrección de errores, mejoras y nuevas funciones. Lo habitual es acordar un <a href="/mantenimiento-web/">mantenimiento</a> según lo que necesite la aplicación.</p>'],
    ['¿Hacéis también la parte de diseño?', '<p>Sí. Diseñamos las pantallas pensando en quien va a usarlas cada día y las programamos, así que no se pierde nada entre el diseño y el código.</p>'],
  ])}
${related(['ia', 'flowbook', 'demos'])}
${finalCta({
    title: 'Tu idea,<br><em>funcionando.</em>',
    text: 'Cuéntanos qué problema quieres resolver. Te decimos cómo lo plantearíamos y por dónde empezar. <b>La primera conversación es gratis.</b>',
    waText: 'Hola, he visto la página de aplicaciones web de Kódika y tengo un proyecto a medida.',
    mailSubject: 'Proyecto de aplicación a medida',
  })}`,
};
