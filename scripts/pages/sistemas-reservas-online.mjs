import { faq, finalCta, related, serviceNode } from '../lib/site.mjs';

const path = '/sistemas-reservas-online/';

export default {
  path,
  nav: 'reservas',
  updated: '2026-10-16',
  title: 'Web con sistema de reservas, citas y pedidos online | Kódika',
  description: 'Que tus clientes reserven mesa, pidan cita o hagan pedidos desde tu propia web, sin pagar comisión por reserva a una plataforma. Web con reservas desde 450 €.',
  crumbs: [['Inicio', '/'], ['Reservas, citas y pedidos online', path]],
  kick: 'Reservas online',
  h1: 'Web con sistema de reservas, citas y pedidos online',
  lead: 'Tus clientes reservan mesa, piden cita o hacen un pedido desde tu propia web, a cualquier hora, y a ti te llega el aviso al momento. <b>Sin pagar a una plataforma una comisión por cada reserva.</b>',
  facts: ['Adaptado a tu forma de trabajar', 'Web con reservas desde 450 €', 'Aviso al momento de cada reserva'],
  waText: 'Hola, he visto la página de reservas online de Kódika y quiero un sistema de reservas para mi negocio.',
  about: 'https://kodikadigital.com/sistemas-reservas-online/#service',
  schema: [serviceNode({
    path,
    name: 'Sistema de reservas, citas y pedidos online a medida',
    serviceType: 'Desarrollo de sistemas de reservas online',
    description: 'Webs con reservas de mesa, citas por servicio y profesional o pedidos online, con avisos al negocio, confirmaciones al cliente y panel de gestión.',
    minPrice: 450,
  })],
  body: `
    <section class="sec" aria-labelledby="neg-t">
      <div class="wrap">
        <div class="sh">
          <h2 class="t-lg" id="neg-t">Para qué negocios</h2>
          <p class="lede">Cada negocio reserva de una forma distinta. Por eso no instalamos un calendario genérico: <b>el sistema se adapta a cómo trabajas tú</b>.</p>
        </div>
        <div class="cards">
          <div class="card"><h3>Restaurantes y bares</h3><p>Reservas de mesa por turnos, con número de comensales y un aforo máximo para no llenar dos veces la misma mesa.</p></div>
          <div class="card"><h3>Peluquerías, estética y clínicas</h3><p>Citas por servicio y por profesional, con la duración real de cada tratamiento y tus descansos.</p></div>
          <div class="card"><h3>Talleres y servicios a domicilio</h3><p>Solicitudes de cita o de presupuesto por franjas, con los datos que necesitas para preparar el trabajo.</p></div>
          <div class="card"><h3>Clases, gimnasios y estudios</h3><p>Plazas por sesión, listas de espera y reservas recurrentes para alumnos habituales.</p></div>
          <div class="card"><h3>Comercios y obradores</h3><p>Pedidos online para recoger en tienda o con entrega, con pago por adelantado si lo necesitas.</p></div>
        </div>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="inc-t">
      <div class="wrap">
        <div class="sh">
          <h2 class="t-lg" id="inc-t">Qué puede incluir</h2>
          <p class="lede">Elegimos solo lo que te hace falta. Cada pieza añadida es más cómoda para tus clientes, pero también es más trabajo, así que la presupuestamos por separado.</p>
        </div>
        <div class="split">
          <div class="card">
            <h3>Para tus clientes</h3>
            <ul class="checks">
              <li>Calendario con tu disponibilidad real: horarios, festivos y descansos</li>
              <li>Servicios con su duración y su precio</li>
              <li>Confirmación por email al reservar y recordatorio antes de la cita</li>
              <li>Cancelar o cambiar la reserva sin tener que llamarte</li>
              <li>Pago o señal por adelantado con tarjeta, para reducir las ausencias</li>
            </ul>
          </div>
          <div class="card">
            <h3>Para ti</h3>
            <ul class="checks">
              <li>Aviso al momento de cada reserva o pedido</li>
              <li>Panel privado para ver, mover o cancelar reservas</li>
              <li>Control de aforo o de plazas para evitar el overbooking</li>
              <li>Bloquear días y horas con un clic</li>
              <li>Conexión con tu calendario u otras herramientas, si tienen una API disponible</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="sec" aria-labelledby="medida-t">
      <div class="narrow prose">
        <h2 id="medida-t">A medida o una herramienta de reservas existente</h2>
        <p>Hay herramientas de reservas que funcionan bien y que puedes contratar por una cuota mensual. Si solo necesitas una agenda sencilla, puede que te basten, y te lo diremos. También podemos integrarlas en tu web para que el cliente no salga de ella.</p>
        <p>Un sistema propio tiene sentido sobre todo cuando:</p>
        <ul>
          <li>Pagas <strong>comisiones por reserva o por cliente</strong> a una plataforma y el gasto ya pesa.</li>
          <li>Tu forma de trabajar <strong>no encaja</strong> en una herramienta genérica: turnos, aforos, servicios combinados o varios profesionales con horarios distintos.</li>
          <li>Quieres que <strong>la relación con el cliente sea tuya</strong>: tu marca, tu web y tus datos, sin que el cliente acabe reservando en el directorio de la competencia.</li>
          <li>Quieres que las reservas <strong>se conecten con el resto de tu negocio</strong>: pedidos, pagos o un asistente que responda dudas.</li>
        </ul>
      </div>
    </section>

    <section class="sec alt" aria-labelledby="dentro-t">
      <div class="narrow prose">
        <h2 id="dentro-t">Cómo funciona por dentro</h2>
        <p>Un sistema de reservas parece un calendario con botones, pero lo difícil está en lo que no se ve. Estas son las decisiones técnicas que cuidamos en cada proyecto:</p>
        <ul>
          <li><strong>Nada de reservas dobles.</strong> La disponibilidad se comprueba en el servidor justo en el momento de confirmar, no solo en el navegador. Así, si dos personas eligen la misma hora a la vez, solo una consigue la reserva.</li>
          <li><strong>Reglas claras.</strong> Con cuánta antelación se puede reservar o cancelar, cuánto dura cada servicio y cuánto margen hay entre citas. Todo eso se configura, no se improvisa.</li>
          <li><strong>Datos protegidos.</strong> Las reservas se guardan en una base de datos (MySQL, MongoDB o Firebase, según el proyecto), y el panel tiene acceso privado. Solo se piden los datos necesarios para la reserva.</li>
          <li><strong>Avisos fiables.</strong> Las confirmaciones y los recordatorios salen por un servicio de email transaccional, para que no acaben en spam.</li>
          <li><strong>Pagos seguros.</strong> Si hay señal o pago por adelantado, usamos una pasarela como Stripe. La tarjeta del cliente nunca pasa por tu web.</li>
        </ul>
      </div>
    </section>

    <section class="sec" aria-labelledby="precio-t">
      <div class="narrow prose">
        <h2 id="precio-t">Precio</h2>
        <p>Las reservas, citas o pedidos se suman a la web: <strong>entre 200 y 450 € más</strong>, según lo completo que sea el sistema. Una web de negocio con reservas parte de <strong>450 €</strong>. Lo que más influye es:</p>
        <ul>
          <li>Cuántos servicios, profesionales o espacios hay que gestionar.</li>
          <li>Si hay pago o señal por adelantado.</li>
          <li>Si necesitas un panel con varias personas y permisos distintos.</li>
          <li>Las integraciones con otras herramientas.</li>
        </ul>
        <p>Marca lo que necesitas en el <a href="/#presupuesto">configurador</a> y verás una estimación al momento. El precio final lo cerramos por escrito antes de empezar.</p>
      </div>
    </section>
${faq([
    ['¿Puedo añadir reservas a la web que ya tengo?', '<p>Muchas veces sí, pero depende de cómo esté hecha tu web. Nos pasas la dirección, la revisamos y te decimos si compensa integrarlo en la actual o hacer una nueva.</p>'],
    ['¿Hay cuotas por cada reserva?', '<p>No cobramos por reserva. El <a href="/mantenimiento-web/">mantenimiento</a> (15–25 €/mes) es opcional. Si cobras online, la pasarela de pago aplica su propia comisión por transacción, y si el sistema necesita servicios con cuota (por ejemplo, el envío de emails), te lo detallamos en la propuesta.</p>'],
    ['¿Qué pasa si un cliente no se presenta?', '<p>Los recordatorios automáticos ayudan a reducir ausencias, y si es un problema habitual en tu negocio podemos pedir una señal con tarjeta al reservar.</p>'],
    ['¿De quién son los datos de mis clientes?', '<p>De tu negocio. Se guardan en tu sistema, se piden solo los necesarios y se tratan conforme al RGPD. Te ayudamos a explicarlo en tu política de privacidad.</p>'],
    ['¿Cuánto se tarda en tenerlo funcionando?', '<p>Depende de lo completo que sea. Cuando definamos qué necesitas, te damos una fecha concreta por escrito.</p>'],
  ])}
${related(['sora-wellness', 'flowbook', 'precio'])}
${finalCta({
    title: 'Que reserven<br><em>sin llamarte.</em>',
    text: 'Cuéntanos cómo funcionan hoy tus reservas y te decimos cómo lo haríamos. <b>La primera conversación es gratis.</b>',
    waText: 'Hola, he visto la página de reservas online de Kódika y quiero un sistema de reservas para mi negocio.',
    mailSubject: 'Quiero un sistema de reservas',
  })}`,
};
