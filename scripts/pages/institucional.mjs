import {
  finalCta, related, serviceCards, wa, mailto, EMAIL, GITHUB, WA_ICON, PERSON_ID,
} from '../lib/site.mjs';

// ---------- /sobre-mi/ ----------
const sobre = {
  path: '/sobre-mi/',
  nav: '',
  pageType: 'AboutPage',
  updated: '2026-10-16',
  title: 'Sobre mí: Álvaro Sánchez, desarrollador Full Stack | SanchezDevelop',
  description: 'Soy Álvaro Sánchez, desarrollador Full Stack independiente en Málaga. Diseño y programo webs, reservas online y software a medida para negocios de toda España.',
  crumbs: [['Inicio', '/'], ['Sobre mí', '/sobre-mi/']],
  kick: 'Sobre mí',
  h1: 'Soy Álvaro Sánchez, desarrollador Full Stack',
  lead: 'Diseño y programo webs, sistemas de reservas, aplicaciones y software a medida para <b>autónomos y pequeñas empresas</b>. Trabajo desde Málaga para toda España, y hablas conmigo de principio a fin.',
  waText: 'Hola Álvaro, he leído sobre ti en tu web y quiero comentarte un proyecto.',
  heroLink: '<a class="lnk" href="/proyectos/">Ver mis proyectos</a>',
  about: PERSON_ID,
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>Qué hago</h2>
        <p>Soy desarrollador <strong>Full Stack</strong>: trabajo en todas las capas de un proyecto web, desde el diseño de la interfaz hasta el servidor, la base de datos, los pagos y la publicación. Para un negocio, eso significa que no hay intermediarios entre la persona que entiende lo que necesitas y la que lo programa.</p>
        <p>Con SanchezDevelop hago dos tipos de trabajo:</p>
        <ul>
          <li><strong>Webs para negocios</strong>: webs de presencia, <a href="/sistemas-reservas-online/">reservas y pedidos online</a>, tiendas y <a href="/mantenimiento-web/">mantenimiento</a>, con precio cerrado.</li>
          <li><strong>Software a medida</strong>: <a href="/aplicaciones-web/">aplicaciones web</a>, plataformas SaaS, APIs e <a href="/integracion-inteligencia-artificial/">integraciones de inteligencia artificial</a>.</li>
        </ul>
        <p>Mi mejor carta de presentación son dos productos propios en producción, que he diseñado y programado yo solo: <a href="/proyectos/resumeai/">ResumeAI</a>, una plataforma de estudio con IA y suscripciones, y <a href="/proyectos/workly/">Workly</a>, un software de gestión y facturación para autónomos.</p>

        <h2>Cómo trabajo</h2>
        <ul>
          <li><strong>Primero la ves, luego pagas.</strong> Te enseño una versión real de tu web antes de cualquier pago.</li>
          <li><strong>Precio cerrado.</strong> Lo acordamos por escrito antes de empezar y no cambia, salvo que añadamos funciones nuevas.</li>
          <li><strong>Hablas conmigo.</strong> Sin comerciales ni intermediarios: me escribes y te respondo yo.</li>
          <li><strong>Código propio.</strong> Programado a medida, sin plantillas pesadas ni complementos que se rompen.</li>
          <li><strong>Sinceridad.</strong> Si una herramienta que ya existe te sirve mejor que algo a medida, te lo digo.</li>
          <li><strong>No desaparezco.</strong> Después de publicar sigo disponible para cambios, dudas o mejoras.</li>
        </ul>

        <h2>Tecnologías con las que trabajo</h2>
        <p>Elijo la tecnología según el proyecto, no al revés:</p>
        <ul class="tech">
          <li>Angular</li><li>React</li><li>Next.js</li><li>TypeScript</li><li>Node.js</li><li>Express</li><li>Spring Boot</li><li>MySQL</li><li>MongoDB</li><li>Firebase</li><li>Stripe</li><li>OpenAI</li><li>Vercel</li><li>Cloudflare</li>
        </ul>

        <h2>Dónde estoy</h2>
        <p>Estoy en <strong>Málaga</strong>. Si tu negocio está cerca y te viene mejor, nos tomamos un café y lo vemos en persona. Si no, todo el proceso (reuniones, avances y entregas) se puede hacer en remoto, así que trabajo con negocios de cualquier parte de España.</p>

        <h2>Código</h2>
        <p>Puedes ver parte de mi trabajo y mis repositorios públicos en <a href="${GITHUB}" target="_blank" rel="noopener me">GitHub</a>.</p>
      </div>
    </section>
${related(['resumeai', 'workly', 'webs'], 'Sigue por aquí')}
${finalCta({
    title: '¿Hablamos de<br><span class="grad">tu proyecto?</span>',
    text: 'Cuéntame qué necesitas. <b>La primera conversación es gratis</b> y te respondo normalmente el mismo día.',
    waText: 'Hola Álvaro, he leído sobre ti en tu web y quiero comentarte un proyecto.',
  })}`,
};

// ---------- /contacto/ ----------
const contactoWa = 'Hola Álvaro, he visto tu web y quiero un presupuesto. Mi negocio es: ';
const contacto = {
  path: '/contacto/',
  nav: '',
  pageType: 'ContactPage',
  updated: '2026-10-16',
  title: 'Contacto y presupuesto sin compromiso | SanchezDevelop',
  description: 'Pide presupuesto para tu web, sistema de reservas o aplicación a medida por WhatsApp o email. Primera conversación gratis y respuesta en 24 horas como mucho.',
  crumbs: [['Inicio', '/'], ['Contacto', '/contacto/']],
  kick: 'Contacto',
  h1: 'Cuéntame tu proyecto',
  lead: 'La primera conversación es <b>gratis y sin compromiso</b>. Te respondo yo, normalmente el mismo día y como mucho en 24 horas.',
  heroCtas: false,
  waText: contactoWa,
  body: `
    <section class="sec" aria-labelledby="canales-t">
      <div class="wrap">
        <div class="sec-head"><h2 class="h-md" id="canales-t">Elige cómo prefieres contactar</h2></div>
        <div class="cards">
          <div class="card">
            <h3>WhatsApp</h3>
            <p>La forma más rápida. Escríbeme con lo que necesitas, aunque sea en dos líneas.</p>
            <p class="pr">+34 697 89 85 74</p>
            <div class="ctas" style="margin-top:18px"><a class="btn wa" href="${wa(contactoWa)}" target="_blank" rel="noopener" data-cta="whatsapp">${WA_ICON}Escribir por WhatsApp</a></div>
          </div>
          <div class="card">
            <h3>Email</h3>
            <p>Si prefieres contarlo con calma o adjuntar ejemplos y documentos.</p>
            <p class="pr" style="word-break:break-all">${EMAIL}</p>
            <div class="ctas" style="margin-top:18px"><a class="btn" href="${mailto('Quiero un presupuesto', 'Hola Álvaro, te escribo desde tu web. Mi negocio es: ')}" data-cta="email">Mandar un email</a></div>
          </div>
          <div class="card">
            <h3>Calcula el precio</h3>
            <p>Marca lo que necesitas en el configurador y envíame la estimación por WhatsApp con un clic.</p>
            <p class="pr">Estimación al momento</p>
            <div class="ctas" style="margin-top:18px"><a class="btn" href="/#presupuesto" data-cta="configurador">Abrir el configurador</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec soft">
      <div class="narrow prose">
        <h2>Qué contarme para darte un precio</h2>
        <p>No necesitas saber nada de tecnología. Con esto ya puedo orientarte:</p>
        <ul>
          <li>A qué se dedica tu negocio y dónde está.</li>
          <li>Qué quieres conseguir: que te encuentren, que reserven, vender online, ahorrar tiempo…</li>
          <li>Si ya tienes web, dominio o alguna herramienta que quieras mantener.</li>
          <li>Si tienes una fecha en mente.</li>
          <li>Webs o aplicaciones que te gusten, aunque sean de otro sector.</li>
        </ul>
        <h2>Qué pasa después</h2>
        <ol>
          <li>Te respondo y, si hace falta, hablamos unos minutos para entender bien tu negocio.</li>
          <li>Te paso una propuesta por escrito con qué incluye, el precio cerrado y una fecha.</li>
          <li>Si te encaja, empiezo. Y antes de pagar, ves tu web.</li>
        </ol>
        <p>Estoy en Málaga, así que si estás cerca podemos vernos en persona. Si no, lo hacemos todo en remoto, estés donde estés en España.</p>
      </div>
    </section>
${related(['webs', 'reservas', 'apps'], '¿Todavía decidiendo?')}`,
};

// ---------- /privacidad/ ----------
const privacidad = {
  path: '/privacidad/',
  nav: '',
  updated: '2026-10-16',
  title: 'Política de privacidad | SanchezDevelop',
  description: 'Qué datos trata sanchezdevelop.com, para qué y cómo ejercer tus derechos: contacto por WhatsApp o email, demo con IA y analítica sin cookies.',
  crumbs: [['Inicio', '/'], ['Privacidad', '/privacidad/']],
  kick: 'Legal',
  h1: 'Política de privacidad',
  lead: 'Esta web recoge los mínimos datos posibles. Aquí te explico cuáles, para qué y cómo puedes ejercer tus derechos.',
  heroCtas: false,
  body: `
    <section class="sec">
      <div class="narrow prose">
        <h2>Responsable</h2>
        <p>Álvaro Sánchez (SanchezDevelop), Málaga, España. Contacto: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

        <h2>Qué datos se tratan y para qué</h2>
        <h3>Cuando me escribes</h3>
        <p>Si me contactas por WhatsApp o email, trato los datos que tú me envías (nombre, teléfono o email y lo que me cuentes de tu negocio) <strong>solo para responderte y, si lo pides, preparar un presupuesto</strong>. La base legal es tu solicitud y la aplicación de medidas precontractuales. Los conservo mientras dure la conversación o la relación profesional, y después durante los plazos legales que correspondan.</p>
        <p>WhatsApp es un servicio de Meta, y el uso que hace de tus datos se rige por su propia política de privacidad.</p>

        <h3>La demo con IA</h3>
        <p>Si usas la demo de la portada, el nombre y el tipo de negocio que escribes se envían a la API de OpenAI para generar la maqueta. Esta web no guarda ese texto. <strong>No escribas datos personales en la demo</strong>: basta con algo como «Peluquería Lucía, peluquería y estética». El tratamiento por parte de OpenAI se rige por sus condiciones de uso de la API.</p>

        <h3>Analítica</h3>
        <p>La web usa Cloudflare Web Analytics para contar visitas de forma agregada. No usa cookies ni identifica a los visitantes. Al hacer clic en los botones de contacto se puede registrar el tipo de contacto (WhatsApp, email…) y la página, nunca el contenido del mensaje.</p>

        <h3>Cookies</h3>
        <p>Esta web no instala cookies propias ni de publicidad.</p>

        <h2>Proveedores</h2>
        <p>La web está alojada en Cloudflare. La demo usa OpenAI. Ambos pueden tratar datos técnicos (como la dirección IP) para prestar el servicio y mantener su seguridad.</p>

        <h2>Tus derechos</h2>
        <p>Puedes pedir el acceso, la rectificación o la supresión de tus datos, así como oponerte a su tratamiento o limitarlo, escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a>. Si crees que no se han respetado tus derechos, puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener">Agencia Española de Protección de Datos</a>.</p>

        <p class="note">Última actualización: 16 de octubre de 2026.</p>
      </div>
    </section>`,
};

// ---------- 404 ----------
const notFound = {
  path: '/404.html',
  out: '404.html',
  nav: '',
  noindex: true,
  title: 'Página no encontrada | SanchezDevelop',
  description: 'La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio o mira los servicios de SanchezDevelop.',
  kick: 'Error 404',
  h1: 'Esta página no existe.',
  lead: 'Puede que la dirección esté mal escrita o que la página haya cambiado. Desde aquí puedes seguir:',
  heroLink: '<a class="lnk" href="/">Volver al inicio</a>',
  body: `
    <section class="sec">
      <div class="wrap">
        <div class="sec-head"><h2 class="h-md">Servicios</h2></div>
${serviceCards()}
      </div>
    </section>`,
};

export default [sobre, contacto, privacidad, notFound];
