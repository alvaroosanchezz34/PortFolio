import { faq, finalCta, related, serviceNode } from '../lib/site.mjs';

const path = '/diseno-web-empresas/';

export default {
  path,
  nav: 'webs',
  updated: '2026-10-16',
  title: 'Diseño web para pequeñas empresas y autónomos | SanchezDevelop',
  description: 'Webs a medida para negocios locales, autónomos y pymes: rápidas, pensadas para el móvil y para que te contacten. Desde 250 €, con precio cerrado.',
  crumbs: [['Inicio', '/'], ['Diseño web para empresas', path]],
  kick: 'Diseño web para negocios',
  h1: 'Diseño web para pequeñas empresas y autónomos',
  lead: 'Una web hecha desde cero para tu negocio, que carga rápido en el móvil, explica bien lo que haces y convierte las visitas en llamadas, mensajes y reservas. <b>Precio cerrado desde 250 € y la ves terminada antes de pagar.</b>',
  facts: ['Diseño propio, sin plantillas', 'Precio cerrado antes de empezar', 'Hablas siempre conmigo'],
  waText: 'Hola Álvaro, he visto tu página de diseño web y quiero una web para mi negocio.',
  about: 'https://sanchezdevelop.com/diseno-web-empresas/#service',
  schema: [serviceNode({
    path,
    name: 'Diseño y desarrollo web para pequeñas empresas y autónomos',
    serviceType: 'Diseño web',
    description: 'Diseño y programación de webs a medida para negocios locales, autónomos y pymes: adaptadas al móvil, con SEO técnico de base, ficha de Google y botones de contacto.',
    minPrice: 250,
  })],
  body: `
    <section class="sec" aria-labelledby="para-t">
      <div class="narrow prose">
        <h2 id="para-t">Para qué negocios es</h2>
        <p>Trabajo sobre todo con <strong>negocios locales</strong> (restaurantes, peluquerías, clínicas, talleres, tiendas), <strong>autónomos y profesionales</strong> (fisioterapeutas, asesores, fotógrafos, formadores) y <strong>pequeñas empresas</strong> que tienen una web antigua y quieren renovarla.</p>
        <p>Lo que tienen en común: no necesitan una web «bonita» sin más, sino una que les traiga clientes. Que alguien que te busca en el móvil entienda en cinco segundos qué haces, dónde estás y cómo contactarte, y que lo haga sin esperar a que cargue.</p>
        <h3>Problemas que resuelve</h3>
        <ul>
          <li><strong>No tienes web</strong> y dependes solo de redes sociales o del boca a boca.</li>
          <li>Tu web <strong>es lenta o se ve mal en el móvil</strong>, que es desde donde te busca la mayoría de la gente.</li>
          <li>Tienes visitas, pero <strong>casi nadie te escribe</strong>: el contacto está escondido o el mensaje no está claro.</li>
          <li><strong>No apareces en Google</strong> cuando alguien busca lo que haces en tu zona.</li>
        </ul>
        <p class="note">Si lo que quieres es editar tú mismo la web a diario con un editor visual, una plataforma prediseñada puede encajarte mejor, y te lo diré. Mis webs están programadas a medida: son más rápidas y más tuyas, pero los cambios me los pides a mí, y los pequeños entran en el mantenimiento.</p>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="planes-t">
      <div class="wrap">
        <div class="sh">
          <h2 class="t-lg" id="planes-t">Qué web necesitas</h2>
          <p class="lede">Precios orientativos de pago único. El precio final lo cerramos por escrito antes de empezar y <b>ya no cambia</b>, salvo que añadamos funciones nuevas.</p>
        </div>
        <div class="cards c4">
          <div class="card">
            <h3>Presencia</h3>
            <p>De 1 a 3 páginas: quién eres, qué ofreces y cómo contactarte. Con SEO local, ficha de Google y botones de WhatsApp y llamada.</p>
            <p class="pr">250–400 €</p>
          </div>
          <div class="card">
            <h3>Negocio</h3>
            <p>Web completa a medida, con reservas, citas o pedidos online para que tus clientes no tengan que llamarte.</p>
            <p class="pr">Desde 450 €</p>
            <a class="lnk" href="/sistemas-reservas-online/">Ver reservas online</a>
          </div>
          <div class="card">
            <h3>Tienda online</h3>
            <p>Catálogo, carrito y pago con tarjeta, como extra sobre la web. Pensada para tiendas pequeñas que quieren vender sin un marketplace de por medio.</p>
            <p class="pr">+400–800 €</p>
          </div>
          <div class="card">
            <h3>A medida</h3>
            <p>Usuarios, paneles, suscripciones o integraciones: cuando lo que necesitas ya es una aplicación.</p>
            <p class="pr">Te lo presupuesto aparte</p>
            <a class="lnk" href="/aplicaciones-web/">Ver aplicaciones a medida</a>
          </div>
        </div>
        <div class="ctas"><a class="btn" href="/#presupuesto" data-cta="configurador">Calcular mi presupuesto</a><a class="lnk" href="/blog/cuanto-cuesta-una-pagina-web/">Qué influye en el precio</a></div>
      </div>
    </section>

    <section class="sec" aria-labelledby="incl-t">
      <div class="wrap">
        <div class="sh"><h2 class="t-lg" id="incl-t">Qué incluye y qué no</h2></div>
        <div class="split">
          <div class="card">
            <h3>Incluido</h3>
            <ul class="checks">
              <li>Diseño propio para tu marca, sin plantillas</li>
              <li>Adaptada a móvil, tablet y ordenador</li>
              <li>Estructura y textos pensados para que te contacten, que preparamos juntos a partir de lo que me cuentes</li>
              <li>SEO técnico de base: títulos, descripciones, velocidad, datos estructurados y sitemap</li>
              <li>Ficha de empresa de Google configurada, si tu negocio puede tenerla</li>
              <li>Botones de WhatsApp, llamada y email</li>
              <li>Dominio, hosting y correo configurados</li>
              <li>Cambios antes de publicar hasta que te guste</li>
            </ul>
          </div>
          <div class="card">
            <h3>No incluido (salvo que lo hablemos)</h3>
            <ul class="checks no">
              <li>Sesión de fotos profesional</li>
              <li>Publicidad en Google Ads o en redes sociales</li>
              <li>Gestión de redes sociales</li>
              <li>Redacción continua de artículos de blog</li>
              <li>Cuotas de servicios de terceros (dominio, correo profesional…), que te detallo en la propuesta</li>
              <li>Una posición garantizada en Google: nadie puede prometerla con honestidad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="sec" aria-labelledby="medida-t">
      <div class="narrow prose">
        <h2 id="medida-t">Por qué a medida y no una plantilla</h2>
        <p>Una plantilla sirve para salir del paso, pero arrastra código que tu web no usa: scripts, estilos y complementos pensados para mil casos distintos. Eso pesa, y en un móvil con mala cobertura se nota. También hace que tu web se parezca a la de muchos otros negocios.</p>
        <p>Cuando programo una web desde cero, solo lleva lo que necesita. El resultado suele ser más rápido y más fácil de mantener, porque no hay complementos de terceros que se rompan con cada actualización. Y el diseño parte de tu negocio: de qué buscan tus clientes y de qué quieres que hagan al entrar.</p>
        <p>¿Quieres hacerte una idea antes de hablar? En la portada hay una <a href="/#idea">demo que genera en segundos una primera maqueta para tu negocio</a> con IA. No es la web final (esa la diseño contigo, a mano), pero te sirve para imaginarla.</p>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="proc-t">
      <div class="wrap">
        <div class="sh"><h2 class="t-lg" id="proc-t">Cómo trabajamos</h2></div>
        <ol class="steps">
          <li><h3>Hablamos</h3><p>Me cuentas tu negocio con tus palabras, por WhatsApp, llamada o en persona si estás en Málaga.</p></li>
          <li><h3>Propuesta</h3><p>Te paso por escrito qué incluye, el precio cerrado y una fecha de entrega.</p></li>
          <li><h3>La construyo</h3><p>Primero el plano, luego el diseño. Ves avances reales y ajustamos sobre la marcha. Pagas cuando te convence.</p></li>
          <li><h3>Online</h3><p>La publico, la doy de alta en Google con su sitemap, configuro tu ficha y sigo disponible para lo que necesites.</p></li>
        </ol>
      </div>
    </section>

    <section class="sec" aria-labelledby="precio-t">
      <div class="narrow prose">
        <h2 id="precio-t">Qué influye en el precio</h2>
        <ul>
          <li><strong>Número de páginas y secciones.</strong> No cuesta lo mismo una página con tus servicios que diez páginas con contenido distinto.</li>
          <li><strong>Funcionalidades.</strong> Reservas, tienda, pagos, área privada o un asistente con IA son trabajo de programación extra.</li>
          <li><strong>Contenido.</strong> Si ya tienes textos y fotos, todo va más rápido. Si hay que prepararlos, también te ayudo.</li>
          <li><strong>Integraciones.</strong> Conectar con tu calendario, tu programa de facturación o tu TPV depende de lo que permitan esas herramientas.</li>
          <li><strong>Idiomas.</strong> Cada idioma adicional es contenido que hay que preparar y mantener.</li>
        </ul>
        <p>Lo explico con ejemplos en <a href="/blog/cuanto-cuesta-una-pagina-web/">cuánto cuesta una página web para un negocio</a>, y en el <a href="/#presupuesto">configurador</a> ves una estimación al momento.</p>
      </div>
    </section>
${faq([
    ['¿Cuánto tardas en hacer una web?', '<p>Una web de presencia suele estar lista en pocos días. Cuando hablemos y vea lo que necesitas, te doy una fecha concreta por escrito.</p>'],
    ['¿Podré cambiar yo los textos o las fotos?', '<p>La web está programada a medida, así que lo normal es que los cambios me los pidas a mí: los pequeños (horarios, precios, fotos) entran en el <a href="/mantenimiento-web/">mantenimiento</a>. Si necesitas editar mucho contenido por tu cuenta, por ejemplo un catálogo o un blog, se puede añadir un panel de edición y te lo presupuesto.</p>'],
    ['¿Voy a salir el primero en Google?', '<p>Te dejo la base técnica bien hecha (velocidad, estructura, datos estructurados, sitemap) y la ficha de Google configurada. A partir de ahí, posicionar depende de la competencia de tu sector y tu zona, del contenido y del tiempo. Desconfía de quien te garantice el primer puesto.</p>'],
    ['¿Trabajas solo con negocios de Málaga?', '<p>Estoy en Málaga y si te viene mejor nos vemos en persona, pero todo el proceso se puede hacer en remoto, así que trabajo con negocios de cualquier parte de España.</p>'],
    ['¿Cómo se paga?', '<p>Acordamos un precio cerrado antes de empezar y te enseño una primera versión real de tu web antes de que pagues nada. Si no te convence, no pagas.</p>'],
    ['Ya tengo una web, ¿la rehaces o la mejoras?', '<p>Depende de cómo esté hecha. La reviso y te digo con sinceridad si compensa retocarla o empezar de cero. Lo cuento en <a href="/mantenimiento-web/">mantenimiento y mejora web</a>.</p>'],
  ])}
${related(['reservas', 'mant', 'precio'])}
${finalCta({
    title: 'Tu negocio,<br><em>en su mejor versión.</em>',
    text: 'Cuéntame qué haces y te digo qué web haría yo. <b>La primera conversación es gratis</b> y te respondo normalmente el mismo día.',
    waText: 'Hola Álvaro, he visto tu página de diseño web y quiero una web para mi negocio.',
    mailSubject: 'Quiero una web para mi negocio',
  })}`,
};
