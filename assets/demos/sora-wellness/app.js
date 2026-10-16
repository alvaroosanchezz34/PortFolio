// Sora Wellness · filtro de tratamientos y reserva de citas en cuatro pasos (de demostración).
(() => {
  const { $, $$, data, eur, esc, announce, form, isEmail, isPhone, demoSent } = window.Demo;
  const T = Object.fromEntries(data.treatments.map(t => [t.id, t]));
  const price = p => p ? eur(p) : 'Sin coste';

  // Menú móvil
  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  // Filtro de tratamientos
  const items = $$('#tlist .sw-t');
  $$('.sw-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.sw-tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    let n = 0;
    items.forEach(it => { const show = !b.dataset.cat || it.dataset.cat === b.dataset.cat; it.hidden = !show; if (show) n++; });
    announce(`${n} tratamientos`);
  }));

  /* ---------- Reserva ---------- */
  const f = $('#bookForm'), st = [1, 2, 3, 4].map(i => $('#st' + i)), steps = $$('.sw-steps li');
  const days = $('#days'), slots = $('#slots'), done = $('#bookDone');
  const fmtDay = d => d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const hash = s => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 1000003; return h; };
  const state = { trt: null, day: null, time: null };

  const setStep = n => steps.forEach((li, i) => {
    li.classList.toggle('done', i < n - 1);
    if (i === n - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  const summary = () => {
    const t = state.trt && T[state.trt];
    $('#sTrt').textContent = t ? `${t.name} (${t.min} min)` : 'Sin elegir';
    $('#sPrice').textContent = t ? price(t.price) : '—';
    $('#sDay').textContent = state.day ? fmtDay(new Date(state.day + 'T12:00')) : 'Sin elegir';
    $('#sTime').textContent = state.time || 'Sin elegir';
  };

  // Próximos 14 días (domingos cerrado)
  const start = new Date(); start.setHours(12, 0, 0, 0);
  const list = Array.from({ length: 14 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i + 1); return d; });
  days.innerHTML = list.map(d => {
    const closed = d.getDay() === 0;
    return `<label class="sw-day"><input type="radio" name="day" value="${iso(d)}"${closed ? ' disabled' : ''}><span><small>${d.toLocaleDateString('es-ES', { weekday: 'short' })}</small><b>${d.getDate()}</b><small>${closed ? 'Cerrado' : d.toLocaleDateString('es-ES', { month: 'short' })}</small></span><span class="dk-sr">${fmtDay(d)}${closed ? ', cerrado' : ''}</span></label>`;
  }).join('');

  const renderSlots = () => {
    const t = T[state.trt], d = new Date(state.day + 'T12:00');
    const close = d.getDay() === 6 ? 14 * 60 : 20 * 60, out = [];
    for (let m = 10 * 60; m + t.min <= close; m += 30) {
      const hh = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
      const busy = hash(state.day + hh + t.id.length) % 10 < 3;
      out.push(`<label class="sw-slot"><input type="radio" name="time" value="${hh}"${busy ? ' disabled' : ''}><span>${hh}${busy ? '<small>Ocupado</small>' : ''}</span></label>`);
    }
    slots.innerHTML = out.join('');
    const free = slots.querySelectorAll('input:not(:disabled)').length;
    announce(`${free} horas libres el ${fmtDay(d)}`);
  };

  f.addEventListener('change', e => {
    const n = e.target.name;
    if (n === 'trt') {
      state.trt = e.target.value; st[1].disabled = false; setStep(state.day ? (state.time ? 4 : 3) : 2);
      if (state.day) { state.time = null; st[3].disabled = true; renderSlots(); setStep(3); }
    }
    if (n === 'day') { state.day = e.target.value; state.time = null; st[2].disabled = false; st[3].disabled = true; renderSlots(); setStep(3); }
    if (n === 'time') { state.time = e.target.value; st[3].disabled = false; setStep(4); }
    summary();
  });

  // Botones «Reservar» de cada tratamiento
  $$('[data-book]').forEach(b => b.addEventListener('click', () => {
    const r = f.querySelector(`input[name="trt"][value="${b.dataset.book}"]`);
    r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true }));
    $('#reservar').scrollIntoView({ behavior: window.Demo.rm ? 'auto' : 'smooth' });
    setTimeout(() => r.focus({ preventScroll: true }), window.Demo.rm ? 0 : 600);
  }));

  const v = {
    trt: x => x ? '' : 'Elige un tratamiento.',
    day: x => x ? '' : 'Elige un día.',
    time: x => x ? '' : 'Elige una hora libre.',
    name: x => x.trim().length >= 2 ? '' : 'Escribe tu nombre.',
    contact: x => isEmail(x) || isPhone(x) ? '' : 'Escribe un teléfono (9 cifras o más) o un email válido.',
    ok: x => x ? '' : 'Necesitamos tu aceptación para gestionar la cita.',
  };
  form(f, v, () => {
    const t = T[state.trt];
    st.forEach(s => { s.hidden = true; }); $('.sw-steps').hidden = true;
    done.hidden = false;
    done.innerHTML = `<h3>Cita de demostración preparada</h3><p><b>${esc(t.name)}</b> · ${esc(fmtDay(new Date(state.day + 'T12:00')))} a las ${esc(state.time)} · ${price(t.price)}</p><p style="margin-top:8px"><b>No se ha reservado nada</b>: Sora Wellness es un centro ficticio. En tu web real, la hora quedaría bloqueada en tu agenda, el cliente recibiría la confirmación por email y a ti te llegaría el aviso al momento.</p><p style="margin-top:14px"><button type="button" class="sw-link" id="again">Hacer otra reserva</button></p>`;
    done.setAttribute('tabindex', '-1'); done.focus();
    $('#again').addEventListener('click', () => {
      f.reset(); Object.assign(state, { trt: null, day: null, time: null });
      st.forEach((s, i) => { s.hidden = false; s.disabled = i > 0; }); $('.sw-steps').hidden = false;
      slots.innerHTML = '<p class="sw-hint">Primero elige un día.</p>'; done.hidden = true; setStep(1); summary();
      f.querySelector('input[name="trt"]').focus();
    });
  });

  // Contacto
  form($('#contactForm'), {
    name: v.name,
    email: x => isEmail(x) ? '' : 'Escribe un email válido, por ejemplo nombre@dominio.com.',
    msg: x => x.trim().length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).',
    ok: x => x ? '' : 'Necesitamos tu aceptación para responderte.',
  }, () => demoSent($('#contactDone')));
})();
