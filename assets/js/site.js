// SanchezDevelop · JS de las páginas internas (menú, nav clara/oscura y apariciones).
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Menú desplegable en móvil
  const lnav = $('#lnav'), chev = $('#chev');
  if (lnav && chev) {
    const close = () => { lnav.classList.remove('open'); chev.setAttribute('aria-expanded', 'false'); };
    chev.addEventListener('click', () => {
      const o = lnav.classList.toggle('open'); chev.setAttribute('aria-expanded', String(o));
    });
    $$('#links a').forEach(a => a.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // Nav clara u oscura según la sección que tiene debajo
  const darkSecs = $$('.dark');
  let ticking = false;
  function navState() {
    if (!lnav) return;
    const y = lnav.getBoundingClientRect().bottom + 1;
    const overDark = darkSecs.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    lnav.classList.toggle('light', !overDark);
  }
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { navState(); ticking = false; });
  }, { passive: true });
  navState();

  // Apariciones al entrar en pantalla
  const rv = $$('.rv');
  if (rm || !('IntersectionObserver' in window)) rv.forEach(el => el.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    rv.forEach(el => io.observe(el));
  }
})();
