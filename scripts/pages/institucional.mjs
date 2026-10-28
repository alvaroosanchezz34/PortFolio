import {
  finalCta, related, serviceCards, contactForm, wa, mailto, EMAIL, GITHUB, ORG_ID,
} from '../lib/site.mjs';

// ---------- /sobre-kodika/ ----------
const sobre = {
  path: '/sobre-kodika/',
  nav: 'sobre',
  pageType: 'AboutPage',
  updated: '2026-10-28',
  title: 'Sobre Kódika, estudio de desarrollo digital en Málaga',
  description: 'Kódika es un estudio de diseño y desarrollo digital en Málaga, fundado por Álvaro Sánchez. Webs, reservas online y software a medida para toda España.',
  crumbs: [['Inicio', '/'], ['Sobre Kódika', '/sobre-kodika/']],
  kick: 'Sobre Kódika',
  h1: 'Un estudio digital fundado en Málaga',
  lead: 'Diseñamos y desarrollamos webs, sistemas de reservas, aplicaciones y software a medida para <b>empresas y profesionales</b>. Trabajamos desde Málaga para toda España, y hablas con quien construye el proyecto.',
  waText: 'Hola, he leído sobre Kódika y quiero comentaros un proyecto.',
  heroLink: '<a class="lnk" href="/demos/">Ver las demos <span class="arr" aria-hidden="true">→</span></a>',
  about: ORG_ID,
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>Qué hacemos</h2>
        <p>Kódika es un estudio de producto digital. Cubrimos un proyecto de punta a punta: interfaz, servidor, base de datos, pagos y publicación. Para un negocio, eso significa que no hay comerciales entre lo que necesitas y lo que se programa.</p>
        <p>El trabajo se concentra en dos líneas:</p>
        <ul>
          <li><strong>Webs para negocios</strong>: webs de presencia, <a href="/sistemas-reservas-online/">reservas y pedidos online</a>, tiendas y <a href="/mantenimiento-web/">mantenimiento</a>, con precio cerrado.</li>
          <li><strong>Software a medida</strong>: <a href="/aplicaciones-web/">aplicaciones web</a>, plataformas SaaS, APIs e <a href="/integracion-inteligencia-artificial/">integraciones de inteligencia artificial</a>.</li>
        </ul>
        <p>Para que veas el nivel de diseño y de programación antes de hablar, hemos creado <a href="/demos/">seis demos navegables</a> de sectores distintos: inmobiliaria, moda, bienestar, fitness, automoción y un SaaS de reservas. Son negocios ficticios, pero cada una tiene su propia dirección de arte y funciones que funcionan de verdad.</p>

        <h2>Cómo trabajamos</h2>
        <ul>
          <li><strong>Primero la ves, luego pagas.</strong> Te enseñamos una versión real de tu web antes de cualquier pago.</li>
          <li><strong>Precio cerrado.</strong> Lo acordamos por escrito antes de empezar y no cambia, salvo que añadamos funciones nuevas.</li>
          <li><strong>Trato directo.</strong> Escribes y te responde quien diseña y programa el proyecto.</li>
          <li><strong>Código propio.</strong> Programado a medida, sin plantillas pesadas ni complementos que se rompen.</li>
          <li><strong>Sinceridad.</strong> Si una herramienta que ya existe te sirve mejor que algo a medida, te lo decimos.</li>
          <li><strong>Seguimos después.</strong> Tras publicar seguimos disponibles para cambios, dudas o mejoras.</li>
        </ul>

        <h2 id="equipo">Equipo</h2>
        <p><strong>Álvaro Sánchez</strong> es el fundador de Kódika y desarrollador Full Stack. Trabaja en todas las capas de un proyecto, de la interfaz al servidor, y es la persona con la que hablas de principio a fin.</p>
        <p>Puedes ver parte de su código y los repositorios públicos en <a href="${GITHUB}" target="_blank" rel="noopener me">GitHub</a>.</p>
        <!-- PLACEHOLDER Álvaro: cuando incorpores a más personas, añade aquí nombre, rol y una bio breve. No publiques miembros, clientes, cifras, premios ni años de actividad que no sean reales. -->

        <h2>Tecnologías</h2>
        <p>Elegimos la tecnología según el proyecto, no al revés:</p>
        <ul class="tech">
          <li>Angular</li><li>React</li><li>Next.js</li><li>TypeScript</li><li>Node.js</li><li>Express</li><li>Spring Boot</li><li>MySQL</li><li>MongoDB</li><li>Firebase</li><li>Stripe</li><li>OpenAI</li><li>Vercel</li><li>Cloudflare</li>
        </ul>

        <h2>Dónde estamos</h2>
        <p>El estudio está en <strong>Málaga</strong>. Si tu negocio está cerca y te viene mejor, nos vemos en persona. Si no, todo el proceso (reuniones, avances y entregas) se puede hacer en remoto, con empresas de cualquier parte de España.</p>
      </div>
    </section>
${related(['demos', 'webs', 'apps'], 'Sigue por aquí')}
${finalCta({
    title: '¿Hablamos de<br><em>tu proyecto?</em>',
    text: 'Cuéntanos qué necesitas. <b>La primera conversación es gratis</b> y respondemos normalmente el mismo día.',
    waText: 'Hola, he leído sobre Kódika y quiero comentaros un proyecto.',
  })}`,
};

// ---------- /contacto/ ----------
const contactoWa = 'Hola, he visto la web de Kódika y quiero un presupuesto. Mi negocio es: ';
const contacto = {
  path: '/contacto/',
  nav: '',
  pageType: 'ContactPage',
  updated: '2026-10-28',
  title: 'Contacto y presupuesto sin compromiso | Kódika',
  description: 'Pide presupuesto para tu web, reservas online o aplicación a medida con el formulario, por WhatsApp o email. Primera conversación gratis y respuesta en 24 h.',
  crumbs: [['Inicio', '/'], ['Contacto', '/contacto/']],
  kick: 'Contacto',
  h1: 'Cuéntanos tu proyecto',
  lead: 'La primera conversación es <b>gratis y sin compromiso</b>. Te respondemos nosotros, normalmente el mismo día y como mucho en 24 horas.',
  heroCtas: false,
  waText: contactoWa,
  scripts: ['/assets/js/contact.js'],
  body: `
    <section class="sec" aria-labelledby="canales-t">
      <div class="wide contact-page">
        <div class="cp-l">
          <h2 class="t-md" id="canales-t">Escríbenos como prefieras</h2>
          <p class="lede" style="margin-top:14px">Rellena el formulario y el mensaje nos llega al momento. Si lo prefieres, escríbenos por WhatsApp o email.</p>
          <ul class="cp-ch">
            <li><span class="mono muted">WhatsApp</span><a class="lnk" href="${wa(contactoWa)}" target="_blank" rel="noopener" data-cta="whatsapp">+34 697 89 85 74 <span class="arr" aria-hidden="true">→</span></a></li>
            <li><span class="mono muted">Email</span><a class="lnk" href="${mailto('Quiero un presupuesto', 'Hola, os escribo desde la web de Kódika. Mi negocio es: ')}" data-cta="email">${EMAIL}</a></li>
            <li><span class="mono muted">Precio orientativo</span><a class="lnk" href="/#presupuesto" data-cta="configurador">Abrir el configurador <span class="arr" aria-hidden="true">→</span></a></li>
          </ul>
        </div>
        <div class="cp-r">
${contactForm('cf')}
        </div>
      </div>
    </section>

    <section class="sec alt">
      <div class="narrow prose">
        <h2>Qué contarme para darte un precio</h2>
        <p>No necesitas saber nada de tecnología. Con esto ya podemos orientarte:</p>
        <ul>
          <li>A qué se dedica tu negocio y dónde está.</li>
          <li>Qué quieres conseguir: que te encuentren, que reserven, vender online, ahorrar tiempo…</li>
          <li>Si ya tienes web, dominio o alguna herramienta que quieras mantener.</li>
          <li>Si tienes una fecha en mente.</li>
          <li>Webs o aplicaciones que te gusten, aunque sean de otro sector.</li>
        </ul>
        <h2>Qué pasa después</h2>
        <ol>
          <li>Te respondemos y, si hace falta, hablamos unos minutos para entender bien tu negocio.</li>
          <li>Te pasamos una propuesta por escrito con qué incluye, el precio cerrado y una fecha.</li>
          <li>Si te encaja, empezamos. Y antes de pagar, ves tu web.</li>
        </ol>
        <p>Estamos en Málaga, así que si estás cerca podemos vernos en persona. Si no, lo hacemos todo en remoto, estés donde estés en España.</p>
      </div>
    </section>
${related(['webs', 'reservas', 'apps'], '¿Todavía decidiendo?')}`,
};

// ---------- /privacidad/ ----------
const privacidad = {
  path: '/privacidad/',
  nav: '',
  updated: '2026-10-28',
  title: 'Política de privacidad | Kódika',
  description: 'Qué datos trata kodikadigital.com, para qué y cómo ejercer tus derechos: formulario de contacto, WhatsApp, email, demos, demo con IA y analítica sin cookies.',
  crumbs: [['Inicio', '/'], ['Privacidad', '/privacidad/']],
  kick: 'Legal',
  h1: 'Política de privacidad',
  lead: 'Esta web recoge los mínimos datos posibles. Aquí te explicamos cuáles, para qué y cómo puedes ejercer tus derechos.',
  heroCtas: false,
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>Responsable</h2>
        <p>Álvaro Sánchez, que opera bajo la marca Kódika, Málaga, España. Contacto: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

        <h2>Qué datos se tratan y para qué</h2>
        <h3>Cuando nos escribes</h3>
        <p>Si nos escribes con el formulario, por WhatsApp o por email, tratamos los datos que nos envías (nombre, teléfono o email y lo que nos cuentes de tu negocio) <strong>solo para responderte y, si lo pides, preparar un presupuesto</strong>. La base legal es tu solicitud y la aplicación de medidas precontractuales. Los conservamos mientras dure la conversación o la relación profesional, y después durante los plazos legales que correspondan.</p>
        <p>WhatsApp es un servicio de Meta, y el uso que hace de tus datos se rige por su propia política de privacidad.</p>
        <p>Al pulsar «Enviar mensaje», el formulario manda tu nombre, tu email o teléfono, el tipo de proyecto y tu mensaje a nuestro correo a través de Resend, el servicio que usamos para enviar emails. <strong>La web no guarda los mensajes en ninguna base de datos</strong>: solo los recibimos en nuestro buzón. Si dejas un email, puedes recibir un acuse de recibo automático. Si eliges «Prefiero WhatsApp», el formulario solo prepara el mensaje y no nos llega nada hasta que lo envías tú desde WhatsApp.</p>

        <h3>Las demos</h3>
        <p>Las demos de <a href="/demos/">/demos/</a> son negocios ficticios. Sus formularios (reservas, visitas, pruebas, contacto) validan los campos pero <strong>no envían los datos a ningún sitio</strong>. La bolsa de la tienda de ejemplo y las citas del panel de Flowbook se guardan solo en tu navegador (almacenamiento local) para que la demo funcione al recargar; puedes borrarlas desde la propia demo o limpiando los datos del sitio en tu navegador.</p>

        <h3>La demo con IA</h3>
        <p>Si usas la demo de la portada, el nombre y el tipo de negocio que escribes se envían a la API de OpenAI para generar la maqueta. Esta web no guarda ese texto. <strong>No escribas datos personales en la demo</strong>: basta con algo como «Peluquería Lucía, peluquería y estética». El tratamiento por parte de OpenAI se rige por sus condiciones de uso de la API.</p>

        <h3>Analítica</h3>
        <p>La web usa Cloudflare Web Analytics para contar visitas de forma agregada. No usa cookies ni identifica a los visitantes. Al hacer clic en los botones de contacto se puede registrar el tipo de contacto (WhatsApp, email…) y la página, nunca el contenido del mensaje.</p>

        <h3>Cookies</h3>
        <p>Esta web no instala cookies propias ni de publicidad.</p>

        <h2>Proveedores</h2>
        <p>La web está alojada en Cloudflare. El formulario de contacto envía los mensajes con Resend y la demo usa OpenAI. Los tres pueden tratar datos técnicos (como la dirección IP) para prestar el servicio y mantener su seguridad. Resend y OpenAI son empresas de Estados Unidos: actúan como encargados del tratamiento y las transferencias se hacen con las garantías que exige el RGPD.</p>

        <h2>Tus derechos</h2>
        <p>Puedes pedir el acceso, la rectificación o la supresión de tus datos, así como oponerte a su tratamiento o limitarlo, escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a>. Si crees que no se han respetado tus derechos, puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener">Agencia Española de Protección de Datos</a>.</p>

        <p class="note">Última actualización: 28 de octubre de 2026.</p>
      </div>
    </section>`,
};

// ---------- 404 ----------
const notFound = {
  path: '/404.html',
  out: '404.html',
  nav: '',
  noindex: true,
  title: 'Página no encontrada | Kódika',
  description: 'La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio o mira los servicios de Kódika.',
  kick: 'Error 404',
  h1: 'Esta página no existe.',
  lead: 'Puede que la dirección esté mal escrita o que la página haya cambiado. Desde aquí puedes seguir:',
  heroLink: '<a class="lnk" href="/">Volver al inicio</a>',
  body: `
    <section class="sec">
      <div class="wrap">
        <div class="sh"><h2 class="t-md">Servicios</h2></div>
${serviceCards()}
      </div>
    </section>`,
};

export default [sobre, contacto, privacidad, notFound];
