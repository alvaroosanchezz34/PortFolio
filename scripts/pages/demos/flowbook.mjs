// Demo 6 · Flowbook — producto SaaS de reservas (ficticio): landing + panel de administración.
// El panel funciona con datos locales del navegador: no hay backend, calendarios ni pagos reales.
import { demoPage, eur } from '../../lib/demo.mjs';

const slug = 'flowbook';
const SERVICES = [
  ['Corte y peinado', 30], ['Color', 90], ['Manicura', 45], ['Tratamiento facial', 60], ['Masaje', 60], ['Consulta', 30],
];
const PLANS = [
  { n: 'Solo', p: 19, d: 'Para profesionales independientes', f: ['1 agenda', 'Reservas online ilimitadas', 'Recordatorios por email'] },
  { n: 'Equipo', p: 39, d: 'Para negocios con varios profesionales', f: ['Hasta 5 agendas', 'Permisos por persona', 'Informes semanales'], top: true },
  { n: 'Centro', p: 79, d: 'Para centros con varias salas', f: ['Agendas ilimitadas', 'Salas y recursos', 'Soporte prioritario'] },
];
const logo = '<span class="fb-mark" aria-hidden="true"><i></i><i></i></span>Flowbook';

const mock = `
          <div class="fb-shot" aria-hidden="true">
            <div class="fbs-bar"><i></i><i></i><i></i><span>app.flowbook · demo</span></div>
            <div class="fbs-in">
              <div class="fbs-side"><b>${logo}</b><span class="on">Agenda</span><span>Citas</span><span>Clientes</span></div>
              <div class="fbs-main">
                <div class="fbs-kpis"><span><small>Hoy</small><b>12</b></span><span><small>Pendientes</small><b>3</b></span><span><small>Semana</small><b>46</b></span><span><small>Ocupación</small><b>78 %</b></span></div>
                <div class="fbs-cal">${['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map((d, c) => `<div><small>${d}</small>${[0, 1, 2].map(r => `<i class="s${(c + r) % 3}" style="--t:${((c * 2 + r * 3) % 5) * 14 + r * 20}px"></i>`).join('')}</div>`).join('')}</div>
              </div>
            </div>
          </div>`;

const landing = demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Flowbook · Demo de landing y panel SaaS de reservas | SanchezDevelop',
  description: 'Demo ficticia de SanchezDevelop: landing de un producto SaaS de reservas y un panel de administración con calendario, citas, estados y métricas.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#ffffff',
  fonts: [`/assets/demos/${slug}/fonts/manrope.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  bodyClass: 'fb fb-landing',
  body: `
  <header class="fl-hd">
    <div class="fl-w fl-hd-in">
      <a class="fb-logo" href="#inicio" aria-label="Flowbook, inicio">${logo}</a>
      <nav class="fl-nav" aria-label="Principal"><a href="#funciones">Funciones</a><a href="#como">Cómo funciona</a><a href="#precios">Precios</a></nav>
      <a class="fb-btn sm" href="app/">Abrir el panel</a>
    </div>
  </header>
  <main id="main">
    <section class="fl-hero" id="inicio" aria-labelledby="fl-h1">
      <div class="fl-w fl-hero-in">
        <p class="fl-pill"><span></span>Producto ficticio de demostración</p>
        <h1 id="fl-h1">Tu agenda,<br><span>siempre llena.</span></h1>
        <p class="fl-sub">Reservas online, recordatorios y un panel claro para negocios con cita previa. Sin llamadas, sin huecos olvidados.</p>
        <div class="fl-ctas"><a class="fb-btn" href="app/">Probar el panel de demostración</a><a class="fb-link" href="#funciones">Ver funciones</a></div>
${mock}
      </div>
    </section>

    <section class="fl-feat" id="funciones" aria-labelledby="fl-f-t">
      <div class="fl-w">
        <h2 id="fl-f-t" data-rv>Todo lo que necesita una agenda con cita previa</h2>
        <ul class="fl-grid">
          <li data-rv><b>Reservas 24 h</b><p>Tus clientes eligen servicio y hueco libre desde tu web, a cualquier hora.</p></li>
          <li data-rv><b>Sin solapes</b><p>El panel no deja reservar un hueco ocupado, ni fuera de tu horario.</p></li>
          <li data-rv><b>Estados claros</b><p>Pendiente, confirmada, completada o cancelada, de un vistazo y con un clic.</p></li>
          <li data-rv><b>Recordatorios</b><p>Avisos automáticos antes de cada cita para reducir las ausencias.</p></li>
          <li data-rv><b>Métricas</b><p>Citas del día, pendientes y ocupación de la semana, calculadas al momento.</p></li>
          <li data-rv><b>Hecho para el móvil</b><p>En el móvil, la agenda pasa a vista de día para gestionarla con una mano.</p></li>
        </ul>
        <p class="fl-note">En esta demo funcionan el calendario, las citas, los estados y las métricas, con datos guardados solo en tu navegador. Los recordatorios, los calendarios externos y los pagos no están conectados.</p>
      </div>
    </section>

    <section class="fl-how" id="como" aria-labelledby="fl-h-t">
      <div class="fl-w">
        <h2 id="fl-h-t" data-rv>Cómo funciona</h2>
        <ol class="fl-steps">
          <li data-rv><span>1</span><b>Configura tus servicios</b><p>Duración, precio y horario de cada profesional.</p></li>
          <li data-rv><span>2</span><b>Comparte tu enlace</b><p>En tu web, en Instagram o por WhatsApp.</p></li>
          <li data-rv><span>3</span><b>Gestiona desde el panel</b><p>Confirma, mueve o cancela citas en segundos.</p></li>
        </ol>
      </div>
    </section>

    <section class="fl-price" id="precios" aria-labelledby="fl-p-t">
      <div class="fl-w">
        <h2 id="fl-p-t" data-rv>Precios sencillos</h2>
        <ul class="fl-plans">
${PLANS.map(p => `          <li class="${p.top ? 'top' : ''}" data-rv>${p.top ? '<span class="fl-badge">Recomendado</span>' : ''}<b>${p.n}</b><p>${p.d}</p><p class="fl-amount">${eur(p.p)}<small>/mes</small></p><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="fb-btn${p.top ? '' : ' ghost'}" href="app/">Probar la demo</a></li>`).join('\n')}
        </ul>
        <p class="fl-note">Precios de demostración: Flowbook es un producto ficticio.</p>
      </div>
    </section>

    <section class="fl-cta" aria-labelledby="fl-c-t">
      <div class="fl-w"><h2 id="fl-c-t" data-rv>Prueba el panel ahora</h2><p data-rv>Crea citas, cambia estados y mira cómo se actualizan las métricas. Sin registro.</p><a class="fb-btn" href="app/" data-rv>Abrir el panel de demostración</a></div>
    </section>
  </main>
  <footer class="fl-ft"><div class="fl-w"><span class="fb-logo">${logo}</span><p>Producto ficticio creado por SanchezDevelop para demostrar una landing y un panel SaaS.</p></div></footer>`,
});

const app = demoPage({
  slug,
  path: `/demos/${slug}/app/`,
  title: 'Panel de Flowbook · Demo de panel de reservas | SanchezDevelop',
  description: 'Panel de administración de demostración: calendario semanal, alta de citas, estados de reserva y métricas, con datos guardados en tu navegador.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#0f172a',
  fonts: [`/assets/demos/${slug}/fonts/manrope.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'fb fb-app',
  data: { services: SERVICES, open: 9, close: 20 },
  body: `
  <div class="fa">
    <aside class="fa-side" aria-label="Navegación del panel">
      <a class="fb-logo" href="../" aria-label="Flowbook, volver a la página del producto">${logo}</a>
      <p class="fa-biz"><small>Negocio de demostración</small>Estudio Lumen</p>
      <nav class="fa-nav" aria-label="Secciones del panel">
        <button type="button" class="on" data-view="agenda" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Agenda</button>
        <button type="button" data-view="citas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>Citas</button>
      </nav>
      <div class="fa-side-ft">
        <button type="button" class="fa-reset" id="reset">Restablecer datos de demo</button>
        <a href="../">← Web de Flowbook</a>
      </div>
    </aside>

    <main class="fa-main" id="main">
      <header class="fa-top">
        <div class="fa-week">
          <button type="button" class="fa-ic" id="prev" aria-label="Semana anterior">‹</button>
          <button type="button" class="fa-today" id="today">Hoy</button>
          <button type="button" class="fa-ic" id="next" aria-label="Semana siguiente">›</button>
          <h1 class="fa-h1"><span class="dk-sr">Agenda de citas, semana del </span><span id="range" aria-live="polite">esta semana</span></h1>
        </div>
        <button type="button" class="fb-btn" id="newBtn">+ Nueva cita</button>
      </header>

      <section class="fa-kpis" aria-label="Resumen">
        <div><small>Citas hoy</small><b id="kToday">0</b></div>
        <div><small>Pendientes de confirmar</small><b id="kPending">0</b></div>
        <div><small>Citas esta semana</small><b id="kWeek">0</b></div>
        <div><small>Ocupación de la semana</small><b id="kOcc">0 %</b><span class="fa-meter" aria-hidden="true"><i id="kOccBar"></i></span></div>
      </section>

      <section class="fa-view" id="vAgenda" aria-label="Agenda semanal">
        <div class="fa-legend" aria-label="Leyenda de estados"><span class="st-pending">Pendiente</span><span class="st-confirmed">Confirmada</span><span class="st-done">Completada</span><span class="st-cancelled">Cancelada</span></div>
        <div class="fa-days" id="dayTabs" role="tablist" aria-label="Día de la semana"></div>
        <div class="fa-cal" id="cal"></div>
      </section>

      <section class="fa-view" id="vCitas" aria-label="Listado de citas" hidden>
        <div class="fa-tools">
          <label><span class="dk-sr">Buscar cliente</span><input type="search" id="q" placeholder="Buscar cliente o servicio"></label>
          <label><span class="dk-sr">Estado</span><select id="fStatus"><option value="">Todos los estados</option><option value="pending">Pendientes</option><option value="confirmed">Confirmadas</option><option value="done">Completadas</option><option value="cancelled">Canceladas</option></select></label>
          <label><span class="dk-sr">Periodo</span><select id="fWhen"><option value="week">Esta semana</option><option value="all">Todas</option></select></label>
        </div>
        <div class="fa-table" role="region" aria-label="Tabla de citas" tabindex="0"><table><thead><tr><th scope="col">Fecha</th><th scope="col">Hora</th><th scope="col">Cliente</th><th scope="col">Servicio</th><th scope="col">Estado</th><th scope="col"><span class="dk-sr">Acciones</span></th></tr></thead><tbody id="rows"></tbody></table></div>
        <p class="fa-empty" id="noRows" hidden>No hay citas con esos filtros.</p>
      </section>
      <p class="fa-note">Panel de demostración: los datos se guardan solo en tu navegador. No hay calendarios, recordatorios ni pagos conectados.</p>
    </main>
  </div>

  <dialog class="dk-dialog fa-dlg" id="newDlg" aria-labelledby="n-t">
    <form class="fa-form" id="newForm" novalidate>
      <div class="fa-dh"><h2 id="n-t">Nueva cita</h2><button type="button" class="fa-x" data-close aria-label="Cerrar">×</button></div>
      <div class="fa-f"><label for="n-client">Cliente</label><input id="n-client" name="client" autocomplete="off" aria-describedby="n-client-e"><p class="fa-err" id="n-client-e" data-err="client" hidden></p></div>
      <div class="fa-f"><label for="n-service">Servicio</label><select id="n-service" name="service" aria-describedby="n-service-e"><option value="">Elige un servicio</option>${SERVICES.map(([n, m]) => `<option value="${n}">${n} · ${m} min</option>`).join('')}</select><p class="fa-err" id="n-service-e" data-err="service" hidden></p></div>
      <div class="fa-row">
        <div class="fa-f"><label for="n-date">Día</label><input id="n-date" name="date" type="date" aria-describedby="n-date-e"><p class="fa-err" id="n-date-e" data-err="date" hidden></p></div>
        <div class="fa-f"><label for="n-time">Hora</label><input id="n-time" name="time" type="time" min="09:00" max="19:30" step="900" aria-describedby="n-time-e"><p class="fa-err" id="n-time-e" data-err="time" hidden></p></div>
      </div>
      <div class="fa-f"><label for="n-notes">Notas <span class="fa-opt">(opcional)</span></label><input id="n-notes" name="notes" maxlength="120"></div>
      <div class="fa-dact"><button type="button" class="fb-btn ghost" data-close>Cancelar</button><button type="submit" class="fb-btn">Guardar cita</button></div>
    </form>
  </dialog>

  <dialog class="dk-dialog fa-dlg" id="detDlg" aria-labelledby="d-t">
    <div class="fa-form" id="det"></div>
  </dialog>`,
});

export default [landing, app];
