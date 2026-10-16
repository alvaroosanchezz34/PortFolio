// Forge Fitness · horario filtrable, selector de planes y solicitud de clase de prueba.
(() => {
  const { $, $$, eur, announce, form, isEmail, isPhone, demoSent, rm } = window.Demo;
  const go = (sel, focusSel) => {
    $(sel).scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
    if (focusSel) setTimeout(() => $(focusSel).focus({ preventScroll: true }), rm ? 0 : 650);
  };

  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  // Filtro por programa
  $$('.ff-filter button').forEach(b => b.addEventListener('click', () => {
    $$('.ff-filter button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    let n = 0;
    $$('.ff-c').forEach(c => { const show = !b.dataset.p || c.dataset.p === b.dataset.p; c.hidden = !show; if (show) n++; });
    announce(`${n} clases a la semana`);
  }));

  // Pestañas de día (móvil)
  const tabs = $$('.ff-daytabs button');
  const pick = i => {
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
    $$('.ff-day').forEach((d, j) => d.classList.toggle('cur', j === i));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(i));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const k = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      pick(k); tabs[k].focus();
    });
  });
  const today = new Date().getDay(); pick(today >= 1 && today <= 6 ? today - 1 : 0);

  // Elegir una clase del horario
  $$('.ff-c button').forEach(b => b.addEventListener('click', () => {
    if (b.getAttribute('aria-disabled') === 'true') { announce('Esa clase está completa. Elige otra.'); return; }
    $('#t-msg').value = `Me gustaría probar ${b.dataset.class}`;
    go('#prueba', '#t-name');
  }));

  // Tarifas
  const period = () => $('input[name="period"]:checked').value;
  const prices = () => {
    const q = period() === 'q';
    $$('.ff-plan').forEach(p => {
      const b = $('[data-m]', p), m = +b.dataset.m, per = q ? Math.round(m * 0.9) : m;
      b.textContent = eur(per);
      $('[data-bill]', p).textContent = q ? `Se pagan ${eur(per * 3)} cada trimestre` : 'Se paga cada mes';
    });
    announce(q ? 'Precios con pago trimestral' : 'Precios con pago mensual');
  };
  $$('input[name="period"]').forEach(r => r.addEventListener('change', prices));
  $$('[data-pick]').forEach(b => b.addEventListener('click', () => {
    $$('[data-pick]').forEach(x => { x.setAttribute('aria-pressed', String(x === b)); x.closest('.ff-plan').classList.toggle('picked', x === b); });
    $('#t-plan').value = b.dataset.pick;
    const msg = $('#t-msg');
    if (!msg.value) msg.value = `Pago ${period() === 'q' ? 'trimestral' : 'mensual'}`;
    go('#prueba', '#t-name');
  }));

  // Formulario
  form($('#trialForm'), {
    name: v => v.trim().length >= 2 ? '' : 'Escribe tu nombre.',
    contact: v => isEmail(v) || isPhone(v) ? '' : 'Escribe un teléfono (9 cifras o más) o un email válido.',
    when: v => v ? '' : 'Elige cuándo prefieres entrenar.',
    ok: v => v ? '' : 'Necesitamos tu permiso para contactarte.',
  }, () => demoSent($('#trialDone'), 'Todo correcto, pero <b>no se ha enviado nada</b>: Forge Fitness es un gimnasio ficticio. En tu web real, la solicitud llegaría al momento a tu email o a tu programa de gestión.'));
})();
