// Demo 3 · Sora Wellness — centro de bienestar y estética (ficticio).
import { demoPage, eur } from '../../lib/demo.mjs';
import { photo, esc } from '../../lib/site.mjs';

const slug = 'sora-wellness';
const IMG = n => `${slug}/${n}`;
const T = [
  { id: 'consulta-piel', name: 'Primera consulta de piel', cat: 'Facial', min: 30, price: 0, img: 'botanica', alt: 'Cuentagotas con aceite sobre madera junto a hojas de eucalipto', desc: 'Miramos tu piel con calma, hablamos de tu rutina y te recomendamos qué cuidados tienen sentido para ti.' },
  { id: 'facial-hidratante', name: 'Facial hidratante', cat: 'Facial', min: 60, price: 65, img: 'hidratacion', alt: 'Persona relajada con mascarilla facial', desc: 'Limpieza, exfoliación suave e hidratación adaptadas a tu tipo de piel.' },
  { id: 'limpieza-profunda', name: 'Limpieza facial profunda', cat: 'Facial', min: 75, price: 75, img: 'facial', alt: 'Aplicación de mascarilla con pincel durante un tratamiento facial', desc: 'Limpieza a fondo, extracción cuidadosa y mascarilla calmante para terminar.' },
  { id: 'ritual-luminosidad', name: 'Ritual luminosidad', cat: 'Facial', min: 50, price: 70, img: 'clinica', alt: 'Profesional con guantes realizando un tratamiento facial', desc: 'Exfoliación enzimática, masaje facial y sérum para una piel con más luz.' },
  { id: 'masaje-relajante', name: 'Masaje relajante', cat: 'Corporal', min: 60, price: 60, img: 'masaje', alt: 'Manos realizando un masaje relajante en la espalda', desc: 'Movimientos lentos y envolventes con aceite templado para soltar la tensión del día.' },
  { id: 'masaje-descontracturante', name: 'Masaje descontracturante', cat: 'Corporal', min: 45, price: 55, img: 'aceites', alt: 'Aceite cayendo sobre las manos antes de un masaje', desc: 'Trabajo más intenso en cuello, hombros y espalda, adaptado a lo que necesites ese día.' },
  { id: 'piedras-calientes', name: 'Ritual de piedras calientes', cat: 'Bienestar', min: 90, price: 95, img: 'piedras', alt: 'Piedras volcánicas calientes colocadas sobre la espalda', desc: 'Piedras volcánicas templadas y masaje completo para una relajación profunda.' },
  { id: 'ritual-aromas', name: 'Ritual de aromas', cat: 'Bienestar', min: 75, price: 80, img: 'ritual', alt: 'Toalla, vela y flores sobre una mesa de spa', desc: 'Exfoliación corporal, masaje con aceites aromáticos y un té para terminar.' },
];
const TEAM = [
  ['LM', 'Laura M.', 'Esteticista', 'Tratamientos faciales y consulta de piel.'],
  ['IP', 'Irene P.', 'Masajista', 'Masajes relajantes y descontracturantes.'],
  ['CV', 'Clara V.', 'Recepción y asesoría', 'Te ayuda a elegir el tratamiento y gestiona tu cita.'],
];
const price = p => p ? `${eur(p)}` : 'Sin coste';

const body = `
  <header class="sw-hd" id="hd">
    <div class="sw-w sw-hd-in">
      <a class="sw-logo" href="#inicio">sora<span> wellness</span></a>
      <button class="sw-menu" id="menuBtn" aria-expanded="false" aria-controls="nav">Menú</button>
      <nav class="sw-nav" id="nav" aria-label="Principal">
        <a href="#tratamientos">Tratamientos</a><a href="#espacio">Espacio</a><a href="#equipo">Equipo</a><a href="#contacto">Contacto</a>
        <a class="sw-btn sm" href="#reservar">Reservar cita</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="sw-hero" id="inicio" aria-labelledby="sw-h1">
      <div class="sw-w sw-hero-in">
        <div class="sw-hero-txt">
          <p class="sw-eyebrow">Estética y bienestar · Málaga</p>
          <h1 id="sw-h1">Cuidarte,<br><em>sin prisa.</em></h1>
          <p>Tratamientos faciales y corporales en un espacio tranquilo, con tiempo para escucharte. Reserva tu cita online en un minuto.</p>
          <div class="sw-ctas"><a class="sw-btn" href="#reservar">Reservar cita</a><a class="sw-link" href="#tratamientos">Ver tratamientos</a></div>
        </div>
        <div class="sw-hero-img">${photo(IMG('hero'), 'Frasco de aceite ámbar sobre un pedestal con luz natural', { sizes: '(max-width: 900px) 90vw, 45vw', eager: true })}</div>
      </div>
      <ul class="sw-w sw-strip">
        <li><span>Horario</span>L–V 10:00–20:00 · S 10:00–14:00</li>
        <li><span>Primera consulta</span>Sin coste, 30 minutos</li>
        <li><span>Dónde</span>Centro de Málaga (dirección de demo)</li>
      </ul>
    </section>

    <section class="sw-trt" id="tratamientos" aria-labelledby="sw-trt-t">
      <div class="sw-w">
        <div class="sw-sh"><h2 id="sw-trt-t" data-rv>Tratamientos</h2><p data-rv>Precios claros y duración real, para que sepas qué reservas.</p></div>
        <div class="sw-tabs" role="group" aria-label="Filtrar tratamientos">
          <button type="button" aria-pressed="true" data-cat="">Todos</button><button type="button" aria-pressed="false" data-cat="Facial">Facial</button><button type="button" aria-pressed="false" data-cat="Corporal">Corporal</button><button type="button" aria-pressed="false" data-cat="Bienestar">Bienestar</button>
        </div>
        <ul class="sw-tlist" id="tlist">
${T.map(t => `          <li class="sw-t" data-cat="${t.cat}">
            <div class="sw-t-img">${photo(IMG(t.img), t.alt, { sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw' })}</div>
            <div class="sw-t-body">
              <p class="sw-t-cat">${t.cat} · ${t.min} min</p>
              <h3>${t.name}</h3>
              <p>${t.desc}</p>
              <div class="sw-t-ft"><b>${price(t.price)}</b><button type="button" class="sw-link" data-book="${t.id}">Reservar <span class="dk-sr">${t.name}</span> →</button></div>
            </div>
          </li>`).join('\n')}
        </ul>
        <p class="sw-note">Tratamientos estéticos y de bienestar con precios de demostración. No son tratamientos médicos ni sustituyen la valoración de un profesional sanitario.</p>
      </div>
    </section>

    <section class="sw-book" id="reservar" aria-labelledby="sw-book-t">
      <div class="sw-w sw-book-in">
        <div class="sw-book-l">
          <h2 id="sw-book-t" data-rv>Reserva tu cita</h2>
          <p data-rv>Cuatro pasos y listo. Verás solo las horas libres.</p>
          <aside class="sw-sum" aria-labelledby="sum-t" aria-live="polite">
            <h3 id="sum-t">Tu cita</h3>
            <dl>
              <div><dt>Tratamiento</dt><dd id="sTrt">Sin elegir</dd></div>
              <div><dt>Día</dt><dd id="sDay">Sin elegir</dd></div>
              <div><dt>Hora</dt><dd id="sTime">Sin elegir</dd></div>
              <div><dt>Precio</dt><dd id="sPrice">—</dd></div>
            </dl>
          </aside>
        </div>
        <form class="sw-form" id="bookForm" novalidate>
          <ol class="sw-steps" aria-label="Pasos de la reserva"><li aria-current="step">Tratamiento</li><li>Día</li><li>Hora</li><li>Tus datos</li></ol>
          <fieldset class="sw-step" id="st1"><legend>1. Elige el tratamiento</legend>
            <div class="sw-radios">${T.map(t => `<label class="sw-r"><input type="radio" name="trt" value="${t.id}"><span><b>${t.name}</b><small>${t.min} min · ${price(t.price)}</small></span></label>`).join('')}</div>
            <p class="sw-err" data-err="trt" hidden></p>
          </fieldset>
          <fieldset class="sw-step" id="st2" disabled><legend>2. Elige el día</legend>
            <div class="sw-days" id="days"></div>
            <p class="sw-err" data-err="day" hidden></p>
          </fieldset>
          <fieldset class="sw-step" id="st3" disabled><legend>3. Elige la hora</legend>
            <div class="sw-slots" id="slots"><p class="sw-hint">Primero elige un día.</p></div>
            <p class="sw-err" data-err="time" hidden></p>
          </fieldset>
          <fieldset class="sw-step" id="st4" disabled><legend>4. Tus datos</legend>
            <div class="sw-row">
              <div class="sw-f"><label for="b-name">Nombre</label><input id="b-name" name="name" autocomplete="name" aria-describedby="b-name-e"><p class="sw-err" id="b-name-e" data-err="name" hidden></p></div>
              <div class="sw-f"><label for="b-contact">Teléfono o email</label><input id="b-contact" name="contact" autocomplete="email" aria-describedby="b-contact-e"><p class="sw-err" id="b-contact-e" data-err="contact" hidden></p></div>
            </div>
            <div class="sw-f"><label for="b-notes">Algo que debamos saber <span class="sw-opt">(opcional)</span></label><textarea id="b-notes" name="notes" rows="3" placeholder="Alergias, piel sensible, preferencias…"></textarea></div>
            <label class="sw-chk"><input type="checkbox" name="ok" aria-describedby="b-ok-e"> Acepto la política de privacidad del centro.</label>
            <p class="sw-err" id="b-ok-e" data-err="ok" hidden></p>
            <button class="sw-btn" type="submit">Confirmar cita</button>
          </fieldset>
          <div class="sw-done" id="bookDone" role="status" hidden></div>
        </form>
      </div>
    </section>

    <section class="sw-space" id="espacio" aria-labelledby="sw-sp-t">
      <div class="sw-w sw-space-in">
        <div class="sw-sp-txt"><h2 id="sw-sp-t" data-rv>Un espacio para <em>bajar el ritmo</em>.</h2><p data-rv>Cabinas con luz natural, materiales cálidos y silencio. Aquí el tiempo es tuyo.</p></div>
        <figure class="sw-g1" data-rv>${photo(IMG('espacio'), 'Zona de descanso con plantas, butaca de mimbre y piscina interior', { sizes: '(max-width: 800px) 100vw, 55vw' })}</figure>
        <figure class="sw-g2" data-rv>${photo(IMG('textura'), 'Toalla de algodón y jabón artesanal sobre un plato de cerámica', { sizes: '(max-width: 800px) 50vw, 25vw' })}</figure>
        <figure class="sw-g3" data-rv>${photo(IMG('ritual'), 'Vela encendida, toalla y flores sobre una mesa', { sizes: '(max-width: 800px) 50vw, 25vw' })}</figure>
      </div>
    </section>

    <section class="sw-team" id="equipo" aria-labelledby="sw-team-t">
      <div class="sw-w">
        <div class="sw-sh"><h2 id="sw-team-t" data-rv>El equipo</h2><p data-rv>Personas ficticias de demostración: en tu web, aquí irían tus profesionales reales.</p></div>
        <ul class="sw-tm">
${TEAM.map(([ini, n, r, d]) => `          <li data-rv><span class="sw-av" aria-hidden="true">${ini}</span><h3>${n}</h3><p class="sw-role">${r}</p><p>${d}</p></li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="sw-faq" aria-labelledby="sw-faq-t">
      <div class="sw-w sw-faq-in">
        <h2 id="sw-faq-t" data-rv>Antes de venir</h2>
        <div>
          <details><summary>¿Puedo cambiar o cancelar mi cita?</summary><p>Sí, hasta 24 horas antes, desde el enlace del email de confirmación o llamando al centro.</p></details>
          <details><summary>¿Tengo que traer algo?</summary><p>Nada. Te damos todo lo necesario. Si tienes la piel sensible o alguna alergia, cuéntanoslo al reservar.</p></details>
          <details><summary>¿Hacéis tratamientos médicos?</summary><p>No. Son tratamientos estéticos y de bienestar. Si tienes una condición de salud, consulta antes con tu médico.</p></details>
          <details><summary>¿Puedo regalar un tratamiento?</summary><p>Sí, con una tarjeta regalo que se puede canjear por cualquier tratamiento.</p></details>
        </div>
      </div>
    </section>

    <section class="sw-contact" id="contacto" aria-labelledby="sw-ct-t">
      <div class="sw-w sw-ct-in">
        <div><h2 id="sw-ct-t" data-rv>¿Tienes alguna duda?</h2><p data-rv>Escríbenos y te ayudamos a elegir el tratamiento.</p></div>
        <form class="sw-form sw-cform" id="contactForm" novalidate>
          <div class="sw-row">
            <div class="sw-f"><label for="c-name">Nombre</label><input id="c-name" name="name" autocomplete="name" aria-describedby="c-name-e"><p class="sw-err" id="c-name-e" data-err="name" hidden></p></div>
            <div class="sw-f"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" aria-describedby="c-email-e"><p class="sw-err" id="c-email-e" data-err="email" hidden></p></div>
          </div>
          <div class="sw-f"><label for="c-msg">Tu consulta</label><textarea id="c-msg" name="msg" rows="4" aria-describedby="c-msg-e"></textarea><p class="sw-err" id="c-msg-e" data-err="msg" hidden></p></div>
          <label class="sw-chk"><input type="checkbox" name="ok" aria-describedby="c-ok-e"> Acepto la política de privacidad del centro.</label>
          <p class="sw-err" id="c-ok-e" data-err="ok" hidden></p>
          <button class="sw-btn" type="submit">Enviar consulta</button>
          <div class="sw-done" id="contactDone" role="status" hidden></div>
        </form>
      </div>
    </section>
  </main>
  <footer class="sw-ft"><div class="sw-w"><span class="sw-logo">sora<span>wellness</span></span><p>Centro ficticio creado por Kódika para demostrar una web de bienestar con reservas.</p></div></footer>`;

export default demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Sora Wellness · Demo de web con reserva de citas | Kódika',
  description: 'Demo ficticia de Kódika: web de centro de bienestar y estética con tratamientos, reserva de citas en cuatro pasos y formulario validado.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#efe9df',
  fonts: [`/assets/demos/${slug}/fonts/fraunces.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'sw',
  data: { treatments: T.map(({ id, name, min, price }) => ({ id, name, min, price })) },
  body,
});
