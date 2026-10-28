// Demo 4 · Forge Fitness — gimnasio boutique (ficticio).
import { demoPage, eur } from '../../lib/demo.mjs';
import { photo } from '../../lib/site.mjs';

const slug = 'forge-fitness';
const IMG = n => `${slug}/${n}`;
const PROGRAMS = [
  { id: 'fuerza', name: 'Fuerza', lvl: 4, min: 60, img: 'fuerza', alt: 'Atleta preparando un peso muerto con barra', desc: 'Técnica y progresión en sentadilla, peso muerto y press. Cada semana, un poco más.' },
  { id: 'hiit', name: 'HIIT', lvl: 5, min: 45, img: 'hiit', alt: 'Entrenamiento con cuerdas de batalla en una nave industrial', desc: 'Intervalos cortos e intensos para mejorar tu resistencia sin pasar horas en el gimnasio.' },
  { id: 'movilidad', name: 'Movilidad', lvl: 2, min: 50, img: 'movilidad', alt: 'Grupo haciendo ejercicios de movilidad sobre esterillas', desc: 'Articulaciones sanas, mejor postura y menos molestias. El complemento que tu cuerpo agradece.' },
  { id: 'running', name: 'Running club', lvl: 3, min: 60, img: 'running', alt: 'Corredores a contraluz al amanecer', desc: 'Salidas en grupo por ritmos, técnica de carrera y planes para tu próxima carrera.' },
];
const COACHES = [
  ['Marta L.', 'Fuerza y técnica', 'coach-1', 'Entrenadora de espaldas sujetando una barra en el gimnasio'],
  ['Dani R.', 'HIIT y acondicionamiento', 'coach-2', 'Mano sujetando una mancuerna'],
  ['Sergio T.', 'Running y movilidad', 'coach-3', 'Piernas de un atleta junto a una barra con discos'],
];
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const SLOTS = [
  ['07:00', ['fuerza', 'hiit', 'fuerza', 'hiit', 'fuerza', 'running']],
  ['09:30', ['movilidad', 'fuerza', 'movilidad', 'fuerza', 'movilidad', 'hiit']],
  ['14:00', ['hiit', null, 'hiit', null, 'hiit', null]],
  ['18:30', ['fuerza', 'running', 'fuerza', 'running', 'fuerza', null]],
  ['20:00', ['hiit', 'movilidad', 'hiit', 'movilidad', null, null]],
];
const COACH_OF = { fuerza: 'Marta', hiit: 'Dani', movilidad: 'Sergio', running: 'Sergio' };
const CLASSES = [];
SLOTS.forEach(([time, row], r) => row.forEach((p, d) => { if (p) CLASSES.push({ d, time, p, coach: COACH_OF[p], spots: (r * 7 + d * 3) % 9 }); }));
const PLANS = [
  { id: 'base', name: 'Base', m: 49, line: '2 clases a la semana', feats: ['Todas las clases de grupo', 'Reserva desde la app', 'Valoración inicial'] },
  { id: 'pro', name: 'Pro', m: 79, line: 'Clases ilimitadas', feats: ['Todo lo de Base', 'Clases ilimitadas', 'Revisión de objetivos cada mes'], top: true },
  { id: 'personal', name: 'Personal', m: 149, line: 'Ilimitado + 4 sesiones 1:1', feats: ['Todo lo de Pro', '4 sesiones con tu coach al mes', 'Plan de entrenamiento propio'] },
];
const NAME = Object.fromEntries(PROGRAMS.map(p => [p.id, p.name]));
const bars = n => `<span class="ff-lvl" role="img" aria-label="Intensidad ${n} de 5">${[1, 2, 3, 4, 5].map(i => `<i${i <= n ? ' class="on"' : ''}></i>`).join('')}</span>`;

const body = `
  <header class="ff-hd" id="hd">
    <div class="ff-w ff-hd-in">
      <a class="ff-logo" href="#inicio" aria-label="Forge Fitness, inicio">FORGE<span>/</span>FITNESS</a>
      <button class="ff-menu" id="menuBtn" aria-expanded="false" aria-controls="nav">Menú</button>
      <nav class="ff-nav" id="nav" aria-label="Principal"><a href="#programas">Programas</a><a href="#horarios">Horarios</a><a href="#coaches">Coaches</a><a href="#tarifas">Tarifas</a><a class="ff-btn sm" href="#prueba">Clase de prueba</a></nav>
    </div>
  </header>

  <main id="main">
    <section class="ff-hero" id="inicio" aria-labelledby="ff-h1">
      <div class="ff-hero-img">${photo(IMG('hero'), 'Atleta levantando una barra en un gimnasio a oscuras', { sizes: '100vw', eager: true })}</div>
      <div class="ff-w ff-hero-in">
        <p class="ff-tag">Entrenamiento en grupos reducidos · Málaga</p>
        <h1 id="ff-h1"><span>Más fuerte</span><span class="ff-outline">cada semana.</span></h1>
        <div class="ff-hero-ft">
          <p>Grupos de 8 personas como máximo, coaches que te corrigen y un plan que avanza contigo.</p>
          <a class="ff-btn" href="#prueba">Pide tu clase de prueba</a>
        </div>
      </div>
      <div class="ff-band" aria-hidden="true"><div>${'<span>Fuerza</span><span>HIIT</span><span>Movilidad</span><span>Running</span>'.repeat(4)}</div></div>
    </section>

    <section class="ff-prog" id="programas" aria-labelledby="ff-prog-t">
      <div class="ff-w">
        <h2 id="ff-prog-t" data-rv>Programas</h2>
        <ul class="ff-pl">
${PROGRAMS.map((p, i) => `          <li class="ff-p" data-rv>
            <div class="ff-p-img">${photo(IMG(p.img), p.alt, { sizes: '(max-width: 800px) 100vw, 25vw' })}<span class="ff-p-n">0${i + 1}</span></div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="ff-p-ft"><span>${p.min} min</span>${bars(p.lvl)}</div>
          </li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="ff-sched" id="horarios" aria-labelledby="ff-sch-t">
      <div class="ff-w">
        <div class="ff-sh"><h2 id="ff-sch-t" data-rv>Horario</h2><p>Horario semanal de demostración. Elige una clase para pedir tu prueba en ella.</p></div>
        <div class="ff-filter" role="group" aria-label="Filtrar por programa">
          <button type="button" aria-pressed="true" data-p="">Todas</button>${PROGRAMS.map(p => `<button type="button" aria-pressed="false" data-p="${p.id}">${p.name}</button>`).join('')}
        </div>
        <div class="ff-daytabs" role="tablist" aria-label="Día">${DAYS.map((d, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="day-${i}" data-day="${i}">${d.slice(0, 3)}</button>`).join('')}</div>
        <div class="ff-grid" id="sched">
${DAYS.map((d, i) => `          <div class="ff-day${i === 0 ? ' cur' : ''}" id="day-${i}" role="tabpanel" aria-label="${d}">
            <h3>${d}</h3>
            <ul>${CLASSES.filter(c => c.d === i).map(c => `
              <li class="ff-c ff-${c.p}" data-p="${c.p}"><button type="button" ${c.spots ? '' : 'aria-disabled="true"'} data-class="${NAME[c.p]} · ${d} ${c.time}">
                <span class="ff-c-t">${c.time}</span><b>${NAME[c.p]}</b><span class="ff-c-m">${c.coach} · ${c.spots ? `${c.spots} ${c.spots === 1 ? 'plaza' : 'plazas'}` : 'Completa'}</span></button></li>`).join('')}
            </ul>
          </div>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="ff-coach" id="coaches" aria-labelledby="ff-co-t">
      <div class="ff-w">
        <div class="ff-sh"><h2 id="ff-co-t" data-rv>Coaches</h2><p>Coaches ficticios de demostración. En tu web, aquí irían tus entrenadores.</p></div>
        <ul class="ff-cl">
${COACHES.map(([n, r, im, alt]) => `          <li data-rv><div class="ff-cimg">${photo(IMG(im), alt, { sizes: '(max-width: 800px) 100vw, 33vw' })}</div><h3>${n}</h3><p>${r}</p></li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="ff-plans" id="tarifas" aria-labelledby="ff-pl-t">
      <div class="ff-w">
        <div class="ff-sh"><h2 id="ff-pl-t" data-rv>Tarifas</h2>
          <div class="ff-toggle" role="radiogroup" aria-label="Forma de pago">
            <label><input type="radio" name="period" value="m" checked><span>Mensual</span></label>
            <label><input type="radio" name="period" value="q"><span>Trimestral <small>−10 %</small></span></label>
          </div>
        </div>
        <ul class="ff-cards" id="plans">
${PLANS.map(p => `          <li class="ff-plan${p.top ? ' top' : ''}" data-plan="${p.id}">
            ${p.top ? '<span class="ff-badge">El más elegido</span>' : ''}
            <h3>${p.name}</h3>
            <p class="ff-line">${p.line}</p>
            <p class="ff-price"><b data-m="${p.m}">${eur(p.m)}</b><span>/mes</span></p>
            <p class="ff-bill" data-bill>Se paga cada mes</p>
            <ul>${p.feats.map(f => `<li>${f}</li>`).join('')}</ul>
            <button type="button" class="ff-btn${p.top ? '' : ' ghost'}" data-pick="${p.id}" aria-pressed="false">Elegir ${p.name}</button>
          </li>`).join('\n')}
        </ul>
        <p class="ff-note">Tarifas de demostración: Forge Fitness es un gimnasio ficticio.</p>
      </div>
    </section>

    <section class="ff-trial" id="prueba" aria-labelledby="ff-tr-t">
      <div class="ff-w ff-tr-in">
        <div><h2 id="ff-tr-t" data-rv>Tu primera clase,<br><span class="ff-hl">sin compromiso.</span></h2><p>Dinos qué te interesa y te proponemos el mejor horario para empezar.</p></div>
        <form class="ff-form" id="trialForm" novalidate>
          <div class="ff-row">
            <div class="ff-f"><label for="t-name">Nombre</label><input id="t-name" name="name" autocomplete="name" aria-describedby="t-name-e"><p class="ff-err" id="t-name-e" data-err="name" hidden></p></div>
            <div class="ff-f"><label for="t-contact">Teléfono o email</label><input id="t-contact" name="contact" autocomplete="email" aria-describedby="t-contact-e"><p class="ff-err" id="t-contact-e" data-err="contact" hidden></p></div>
          </div>
          <div class="ff-row">
            <div class="ff-f"><label for="t-plan">Plan</label><select id="t-plan" name="plan" aria-describedby="t-plan-e"><option value="">Aún no lo sé</option>${PLANS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
            <div class="ff-f"><label for="t-when">Cuándo prefieres entrenar</label><select id="t-when" name="when" aria-describedby="t-when-e"><option value="">Elige una franja</option><option>Mañana</option><option>Mediodía</option><option>Tarde</option></select><p class="ff-err" id="t-when-e" data-err="when" hidden></p></div>
          </div>
          <div class="ff-f"><label for="t-msg">Clase o comentario <span class="ff-opt">(opcional)</span></label><input id="t-msg" name="msg" placeholder="Por ejemplo: HIIT el martes a las 20:00"></div>
          <label class="ff-chk"><input type="checkbox" name="ok" aria-describedby="t-ok-e"> Acepto que me contactéis para organizar la clase de prueba.</label>
          <p class="ff-err" id="t-ok-e" data-err="ok" hidden></p>
          <button class="ff-btn" type="submit">Quiero mi clase de prueba</button>
          <div class="ff-done" id="trialDone" role="status" hidden></div>
        </form>
      </div>
    </section>
  </main>
  <footer class="ff-ft"><div class="ff-w"><span class="ff-logo">FORGE<span>/</span>FITNESS</span><p>Gimnasio ficticio creado por Kódika para demostrar una web de fitness.</p></div></footer>`;

export default demoPage({
  slug,
  path: `/demos/${slug}/`,
  title: 'Forge Fitness · Demo de web para gimnasio | Kódika',
  description: 'Demo ficticia de Kódika: web para un gimnasio boutique con programas, horario semanal filtrable, coaches, selector de planes y clase de prueba.',
  ogImage: `/assets/og/demo-${slug}.jpg`,
  themeColor: '#0b0b0b',
  fonts: [`/assets/demos/${slug}/fonts/anton.woff2`],
  css: `/assets/demos/${slug}/style.css`,
  js: `/assets/demos/${slug}/app.js`,
  bodyClass: 'ff',
  body,
});
