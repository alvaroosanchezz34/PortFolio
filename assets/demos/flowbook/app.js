// Panel de Flowbook (demo). Todo ocurre en el navegador: las citas se guardan en localStorage.
(() => {
  const { $, $$, data, esc, announce, form, dialog, store } = window.Demo;
  const SV = Object.fromEntries(data.services);
  const ROW = 30, OPEN = data.open * 60;
  const ST = { pending: 'Pendiente', confirmed: 'Confirmada', done: 'Completada', cancelled: 'Cancelada' };
  const NAMES = ['Lucía R.', 'Marcos P.', 'Elena V.', 'Javier M.', 'Carmen S.', 'Pablo D.', 'Sara L.', 'Irene G.', 'Diego F.', 'Nuria T.', 'Hugo B.', 'Marta C.', 'Álex N.', 'Inés O.'];
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const day = s => new Date(s + 'T12:00:00');
  const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const toTime = m => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  const closeOf = d => (d.getDay() === 0 ? 0 : d.getDay() === 6 ? 14 * 60 : data.close * 60);
  const monday = d => { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const fmt = (d, o) => d.toLocaleDateString('es-ES', o);
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const todayIso = iso(new Date());

  /* ---------- Datos ---------- */
  const seed = () => {
    const mon = monday(new Date()), out = [];
    const plan = [[0, '09:30', 0, 'done'], [0, '11:00', 1, 'done'], [0, '16:00', 2, 'cancelled'], [0, '17:30', 4, 'done'],
      [1, '10:00', 3, 'done'], [1, '12:30', 0, 'done'], [1, '18:00', 5, 'done'],
      [2, '09:00', 1, 'confirmed'], [2, '11:30', 2, 'confirmed'], [2, '13:00', 0, 'pending'], [2, '17:00', 4, 'confirmed'],
      [3, '10:30', 3, 'confirmed'], [3, '12:00', 0, 'pending'], [3, '16:30', 1, 'confirmed'], [3, '19:00', 5, 'pending'],
      [4, '09:30', 4, 'pending'], [4, '11:00', 2, 'confirmed'], [4, '15:00', 1, 'pending'], [4, '18:30', 0, 'confirmed'],
      [5, '10:00', 3, 'pending'], [5, '11:30', 0, 'confirmed'], [5, '12:30', 5, 'pending']];
    const todayIdx = (new Date().getDay() + 6) % 7;
    plan.forEach(([d, t, s, st], k) => {
      const [name] = data.services[s];
      // Lo pasado queda completado; lo futuro, pendiente o confirmado
      let status = st;
      if (d < todayIdx && (st === 'pending' || st === 'confirmed')) status = k % 5 ? 'done' : 'cancelled';
      if (d > todayIdx && st === 'done') status = k % 2 ? 'confirmed' : 'pending';
      out.push({ id: 's' + k, client: NAMES[k % NAMES.length], service: name, date: iso(addDays(mon, d)), start: t, min: SV[name], status, notes: '' });
    });
    return out;
  };
  const db = store('flowbook-v1', null);
  let A = db.get();
  if (!Array.isArray(A)) { A = seed(); db.set(A); }
  const save = () => { if (!db.set(A)) announce('No se ha podido guardar en este navegador: los cambios se perderán al recargar.'); };

  /* ---------- Estado de la vista ---------- */
  let week = monday(new Date()), view = 'agenda', sel = (new Date().getDay() + 6) % 7, lastNew = null;
  const mq = matchMedia('(max-width: 860px)');
  const weekDays = () => Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const inWeek = a => { const d = day(a.date); return d >= week && d < addDays(week, 7); };
  const active = a => a.status !== 'cancelled';

  const kpis = () => {
    const wk = A.filter(inWeek);
    $('#kToday').textContent = A.filter(a => a.date === todayIso && active(a)).length;
    $('#kPending').textContent = wk.filter(a => a.status === 'pending').length;
    $('#kWeek').textContent = wk.filter(active).length;
    const avail = weekDays().reduce((s, d) => s + Math.max(0, closeOf(d) - OPEN), 0);
    const used = wk.filter(active).reduce((s, a) => s + a.min, 0);
    const occ = Math.min(100, Math.round(used / avail * 100));
    $('#kOcc').textContent = `${occ} %`; $('#kOccBar').style.width = occ + '%';
  };

  const apBtn = (a, list = false) => {
    const end = toTime(toMin(a.start) + a.min);
    const label = `${a.start} a ${end}, ${a.client}, ${a.service}, ${ST[a.status]}`;
    const pos = list ? '' : ` style="top:${(toMin(a.start) - OPEN) / ROW * 30 + 2}px;height:${a.min / ROW * 30 - 4}px"`;
    const short = !list && a.min <= 30;
    return `<button type="button" class="fa-ap st-${a.status}${short ? ' short' : ''}${a.id === lastNew ? ' new' : ''}" data-ap="${a.id}" aria-label="${esc(label)}"${pos}><b>${esc(a.client)}</b><small>${a.start}${short ? '' : ` · ${esc(a.service)}`}</small>${list ? `<small>${ST[a.status]}</small>` : ''}</button>`;
  };

  const renderWeekGrid = () => {
    const days = weekDays();
    const rows = (data.close * 60 - OPEN) / ROW;
    let h = `<div class="fa-grid" role="grid" aria-label="Semana"><div class="fa-head" aria-hidden="true"></div>`;
    days.forEach(d => { const t = iso(d) === todayIso; h += `<div class="fa-head${t ? ' today' : ''}">${fmt(d, { weekday: 'short' })} <span>${d.getDate()}</span></div>`; });
    h += `<div class="fa-hours" aria-hidden="true">${Array.from({ length: rows }, (_, r) => `<span>${r % 2 ? '' : toTime(OPEN + r * ROW)}</span>`).join('')}</div>`;
    days.forEach(d => {
      const ds = iso(d), close = closeOf(d);
      h += `<div class="fa-col${close ? '' : ' closed'}" aria-label="${fmt(d, { weekday: 'long', day: 'numeric' })}${close ? '' : ', cerrado'}">`;
      for (let r = 0; r < rows; r++) {
        const m = OPEN + r * ROW;
        h += m < close ? `<button type="button" class="fa-slot" data-new="${ds}|${toTime(m)}" aria-label="Nueva cita el ${fmt(d, { weekday: 'long', day: 'numeric' })} a las ${toTime(m)}"></button>` : '<div aria-hidden="true"></div>';
      }
      A.filter(a => a.date === ds).sort((x, y) => toMin(x.start) - toMin(y.start)).forEach(a => { h += apBtn(a); });
      if (ds === todayIso) {
        const n = new Date(), m = n.getHours() * 60 + n.getMinutes();
        if (m >= OPEN && m <= data.close * 60) h += `<span class="fa-now" style="top:${(m - OPEN) / ROW * 30}px" aria-hidden="true"></span>`;
      }
      h += '</div>';
    });
    $('#cal').innerHTML = h + '</div>';
    $('#dayTabs').innerHTML = '';
  };

  const renderDayList = () => {
    const days = weekDays();
    $('#dayTabs').innerHTML = days.map((d, i) => `<button type="button" role="tab" aria-selected="${i === sel}" data-day="${i}">${fmt(d, { weekday: 'short' })}<small>${d.getDate()} ${fmt(d, { month: 'short' })}</small></button>`).join('');
    const d = days[sel], ds = iso(d), list = A.filter(a => a.date === ds).sort((x, y) => toMin(x.start) - toMin(y.start));
    const closed = !closeOf(d);
    $('#cal').innerHTML = `<ul class="fa-list" role="tabpanel" aria-label="${fmt(d, { weekday: 'long', day: 'numeric', month: 'long' })}">${list.map(a => `<li>${apBtn(a, true)}</li>`).join('')}
      <li class="fa-free">${closed ? 'Cerrado este día.' : `${list.length ? '¿Otro cliente?' : 'Sin citas este día.'}<br><button type="button" class="fb-btn sm" data-new="${ds}|${list.length ? '' : '10:00'}">+ Nueva cita</button>`}</li></ul>`;
  };

  const renderTable = () => {
    const q = norm($('#q').value.trim()), st = $('#fStatus').value, when = $('#fWhen').value;
    const list = A.filter(a => (!q || norm(a.client + ' ' + a.service).includes(q)) && (!st || a.status === st) && (when === 'all' || inWeek(a)))
      .sort((x, y) => x.date.localeCompare(y.date) || toMin(x.start) - toMin(y.start));
    $('#rows').innerHTML = list.map(a => `<tr><td>${fmt(day(a.date), { weekday: 'short', day: 'numeric', month: 'short' })}</td><td>${a.start}</td><td>${esc(a.client)}</td><td>${esc(a.service)}</td><td><span class="fa-badge st-${a.status}">${ST[a.status]}</span></td><td><button type="button" class="fa-open" data-ap="${a.id}">Ver<span class="dk-sr"> la cita de ${esc(a.client)}</span></button></td></tr>`).join('');
    $('#noRows').hidden = list.length > 0;
    return list.length;
  };

  const render = () => {
    const days = weekDays();
    $('#range').textContent = `${fmt(days[0], { day: 'numeric', month: 'short' })} – ${fmt(days[6], { day: 'numeric', month: 'short', year: 'numeric' })}`;
    kpis();
    if (view === 'agenda') { mq.matches ? renderDayList() : renderWeekGrid(); }
    else renderTable();
    lastNew = null;
  };

  /* ---------- Navegación ---------- */
  const setView = v => {
    view = v;
    $$('.fa-nav button').forEach(b => { const on = b.dataset.view === v; b.classList.toggle('on', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    $('#vAgenda').hidden = v !== 'agenda'; $('#vCitas').hidden = v !== 'citas';
    render();
  };
  $$('.fa-nav button').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  $('#prev').addEventListener('click', () => { week = addDays(week, -7); render(); announce($('#range').textContent); });
  $('#next').addEventListener('click', () => { week = addDays(week, 7); render(); announce($('#range').textContent); });
  $('#today').addEventListener('click', () => { week = monday(new Date()); sel = (new Date().getDay() + 6) % 7; render(); announce('Semana actual'); });
  ['#q', '#fStatus', '#fWhen'].forEach(s => $(s).addEventListener('input', () => { const n = renderTable(); announce(`${n} citas`); }));
  mq.addEventListener('change', render);
  $('#cal').addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.ap) openDet(t.dataset.ap, t);
    else if (t.dataset.new !== undefined) { const [d, tm] = t.dataset.new.split('|'); openNew(d, tm, t); }
  });
  $('#dayTabs').addEventListener('click', e => { const t = e.target.closest('[data-day]'); if (t) { sel = +t.dataset.day; render(); $(`#dayTabs [data-day="${sel}"]`).focus(); } });
  $('#rows').addEventListener('click', e => { const t = e.target.closest('[data-ap]'); if (t) openDet(t.dataset.ap, t); });

  let resetArmed = false;
  $('#reset').addEventListener('click', e => {
    const b = e.currentTarget;
    if (!resetArmed) { resetArmed = true; b.textContent = '¿Seguro? Pulsa otra vez'; setTimeout(() => { resetArmed = false; b.textContent = 'Restablecer datos de demo'; }, 4000); return; }
    A = seed(); save(); week = monday(new Date()); resetArmed = false; b.textContent = 'Restablecer datos de demo'; render(); announce('Datos de demostración restablecidos');
  });

  /* ---------- Nueva cita ---------- */
  const nf = $('#newForm'), newDlg = dialog($('#newDlg'));
  const overlap = (date, start, min, skip) => A.find(a => a.date === date && active(a) && a.id !== skip && toMin(start) < toMin(a.start) + a.min && toMin(a.start) < toMin(start) + min);
  const v = {
    client: x => x.trim().length >= 2 ? '' : 'Escribe el nombre del cliente.',
    service: x => x ? '' : 'Elige un servicio.',
    date: x => { if (!x) return 'Elige un día.'; return closeOf(day(x)) ? '' : 'Ese día el negocio está cerrado.'; },
    time: (x, f) => {
      if (!x) return 'Elige una hora.';
      const d = f.elements.date.value, s = f.elements.service.value, m = toMin(x);
      if (!d) return '';
      const close = closeOf(day(d)), dur = SV[s] || 30;
      if (m < OPEN) return `El negocio abre a las ${toTime(OPEN)}.`;
      if (m + dur > close) return `La cita terminaría a las ${toTime(m + dur)} y ese día se cierra a las ${toTime(close)}.`;
      const o = overlap(d, x, dur);
      return o ? `Se solapa con la cita de ${o.client} a las ${o.start}. Elige otra hora.` : '';
    },
  };
  const nfCtl = form(nf, v, () => {
    const f = nf.elements, a = { id: Date.now().toString(36), client: f.client.value.trim(), service: f.service.value, date: f.date.value, start: f.time.value, min: SV[f.service.value], status: 'pending', notes: f.notes.value.trim() };
    A.push(a); save(); lastNew = a.id;
    week = monday(day(a.date)); sel = (day(a.date).getDay() + 6) % 7;
    newDlg.close(); render();
    announce(`Cita creada: ${a.client}, ${fmt(day(a.date), { weekday: 'long', day: 'numeric' })} a las ${a.start}. Estado: pendiente.`);
  });
  nf.elements.service.addEventListener('change', () => { if (nf.elements.time.value) nf.elements.time.dispatchEvent(new Event('blur')); });
  const openNew = (d, t, from) => {
    nfCtl.reset();
    nf.elements.date.value = d || iso(weekDays()[mq.matches ? sel : 0]);
    nf.elements.time.value = t || '';
    newDlg.open(from);
    setTimeout(() => nf.elements.client.focus(), 50);
  };
  $('#newBtn').addEventListener('click', e => {
    const base = iso(new Date()) >= iso(week) && iso(new Date()) < iso(addDays(week, 7)) ? todayIso : iso(week);
    openNew(mq.matches ? iso(weekDays()[sel]) : base, '', e.currentTarget);
  });

  /* ---------- Detalle y estados ---------- */
  const det = $('#det'), detDlg = dialog($('#detDlg'));
  const openDet = (id, from) => {
    const a = A.find(x => x.id === id); if (!a) return;
    const draw = () => {
      det.innerHTML = `
        <div class="fa-dh"><h2 id="d-t">${esc(a.client)}</h2><button type="button" class="fa-x" data-close aria-label="Cerrar">×</button></div>
        <dl class="fa-dl"><dt>Servicio</dt><dd>${esc(a.service)} · ${a.min} min</dd><dt>Día</dt><dd>${fmt(day(a.date), { weekday: 'long', day: 'numeric', month: 'long' })}</dd><dt>Hora</dt><dd>${a.start} – ${toTime(toMin(a.start) + a.min)}</dd><dt>Estado</dt><dd><span class="fa-badge st-${a.status}">${ST[a.status]}</span></dd>${a.notes ? `<dt>Notas</dt><dd>${esc(a.notes)}</dd>` : ''}</dl>
        <div><p class="fa-f"><b style="font-size:.88rem">Cambiar estado</b></p><div class="fa-status" role="group" aria-label="Estado de la cita">${Object.entries(ST).map(([k, l]) => `<button type="button" class="st-${k}" data-st="${k}" aria-pressed="${a.status === k}">${l}</button>`).join('')}</div></div>
        <div class="fa-dact"><button type="button" class="fb-btn danger" id="del">Eliminar cita</button><button type="button" class="fb-btn" data-close>Listo</button></div>`;
      $$('[data-st]', det).forEach(b => b.addEventListener('click', () => {
        if (b.dataset.st === 'confirmed' || b.dataset.st === 'pending') {
          const o = overlap(a.date, a.start, a.min, a.id);
          if (o && a.status === 'cancelled') { announce(`No se puede reactivar: se solapa con la cita de ${o.client}.`); return; }
        }
        a.status = b.dataset.st; save(); render(); draw(); announce(`Estado cambiado a ${ST[a.status]}`);
        $(`[data-st="${a.status}"]`, det).focus();
      }));
      $('#del', det).addEventListener('click', e => {
        const btn = e.currentTarget;
        if (btn.dataset.armed) { A = A.filter(x => x.id !== a.id); save(); detDlg.close(); render(); announce('Cita eliminada'); return; }
        btn.dataset.armed = '1'; btn.textContent = '¿Eliminar? Pulsa otra vez';
      });
    };
    draw(); detDlg.open(from);
  };

  render();
})();
