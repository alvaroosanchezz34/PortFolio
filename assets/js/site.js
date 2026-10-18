// SanchezDevelop · JS común: cabecera, menú móvil y apariciones al hacer scroll.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Cabecera: fondo al hacer scroll y botón flotante de WhatsApp
  const hd = $('#hd'), fab = $('#fab');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      if (hd) hd.classList.toggle('scrolled', y > 12);
      if (fab) fab.classList.toggle('in', y > innerHeight * 0.9);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú a pantalla completa
  const btn = $('#menuBtn'), menu = $('#menu');
  if (btn && menu) {
    const focusables = () => $$('a, button', menu);
    const open = () => {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('open'));
      btn.setAttribute('aria-expanded', 'true'); btn.querySelector('span').textContent = 'Cerrar';
      document.documentElement.classList.add('menu-open');
      hd && hd.classList.add('scrolled');
      const f = focusables()[0]; f && f.focus();
    };
    const close = (focusBtn = true) => {
      menu.classList.remove('open'); menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false'); btn.querySelector('span').textContent = 'Menú';
      document.documentElement.classList.remove('menu-open');
      onScroll();
      if (focusBtn) btn.focus();
    };
    btn.addEventListener('click', () => (menu.hidden ? open() : close()));
    menu.addEventListener('click', e => { if (e.target.closest('a')) close(false); });
    addEventListener('keydown', e => {
      if (menu.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { // foco atrapado dentro del menú
        const f = [btn, ...focusables()], i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches && !menu.hidden) close(false); });
  }

  // Apariciones: se revela todo lo que ya ha llegado al 94 % de la pantalla, aunque se
  // haya saltado de golpe (anclas, teclado, scroll muy rápido). Nada se queda oculto.
  let pending = $$('[data-rv], .lines');
  if (rm) pending.forEach(el => el.classList.add('in'));
  else {
    let queued = false;
    const reveal = () => {
      queued = false;
      const limit = innerHeight * 0.94;
      pending = pending.filter(el => {
        if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
        return true;
      });
      if (!pending.length) { removeEventListener('scroll', onRv); removeEventListener('resize', onRv); }
    };
    const onRv = () => { if (!queued) { queued = true; requestAnimationFrame(reveal); } };
    addEventListener('scroll', onRv, { passive: true });
    addEventListener('resize', onRv);
    addEventListener('load', onRv);
    reveal();
  }
})();
