// Kit común de las demos: utilidades pequeñas y sin dependencias.
// Nada de lo que hay aquí envía datos a ningún sitio.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dataEl = $('#demo-data');
  const data = dataEl ? JSON.parse(dataEl.textContent) : {};

  // Almacenamiento local (puede no estar disponible: modo privado, bloqueos…)
  const store = (key, fallback) => {
    const k = 'sd-demo:' + key;
    return {
      get() { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : structuredClone(fallback); } catch (_) { return structuredClone(fallback); } },
      set(v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (_) { return false; } },
      clear() { try { localStorage.removeItem(k); } catch (_) { /* nada */ } },
    };
  };

  const eur = n => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Región viva para anunciar cambios (resultados de filtros, bolsa…)
  const live = document.createElement('p');
  live.className = 'dk-sr'; live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  const announce = msg => { live.textContent = ''; setTimeout(() => { live.textContent = msg; }, 30); };

  // Validación accesible. rules: { campo: (valor, form) => '' | 'mensaje' }
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isPhone = v => /^\+?\d{9,15}$/.test(v.replace(/[\s().-]/g, ''));
  const form = (el, rules, onValid) => {
    const field = n => el.elements[n];
    const errEl = n => {
      const f = field(n), node = f && (f.length && !f.tagName ? f[0] : f);
      return node && (el.querySelector(`[data-err="${n}"]`) || null);
    };
    const set = (n, msg) => {
      const f = field(n); if (!f) return;
      const nodes = f.length && !f.tagName ? [...f] : [f];
      nodes.forEach(x => x.setAttribute('aria-invalid', msg ? 'true' : 'false'));
      const e = errEl(n); if (e) { e.textContent = msg || ''; e.hidden = !msg; }
    };
    const val = n => { const f = field(n); if (!f) return ''; if (f.type === 'checkbox') return f.checked ? 'on' : ''; return f.value || ''; };
    const check = n => { const m = rules[n](val(n), el); set(n, m); return !m; };
    Object.keys(rules).forEach(n => {
      const f = field(n); if (!f) return;
      const nodes = f.length && !f.tagName ? [...f] : [f];
      nodes.forEach(x => {
        x.addEventListener(x.type === 'checkbox' || x.type === 'radio' || x.tagName === 'SELECT' ? 'change' : 'blur', () => { if (val(n) || x.getAttribute('aria-invalid') === 'true') check(n); });
        x.addEventListener('input', () => { if (x.getAttribute('aria-invalid') === 'true') check(n); });
      });
    });
    el.addEventListener('submit', e => {
      e.preventDefault();
      const ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { const first = el.querySelector('[aria-invalid="true"]'); if (first) first.focus(); announce('Revisa los campos marcados.'); return; }
      onValid(el);
    });
    return { reset() { el.reset(); Object.keys(rules).forEach(n => set(n, '')); } };
  };

  // Mensaje honesto tras un envío de demostración
  const demoSent = (box, html) => {
    box.hidden = false;
    box.innerHTML = `<strong>Formulario de demostración.</strong> ${html || 'Los datos son correctos, pero <b>no se han enviado a nadie</b>: es una web ficticia. En tu web real, esta solicitud te llegaría al momento por email o a tu panel.'}`;
    box.setAttribute('tabindex', '-1'); box.focus();
  };

  // Diálogo modal nativo con bloqueo de scroll y retorno del foco
  const dialog = (el, { onClose } = {}) => {
    let opener = null;
    const close = () => { if (el.open) el.close(); };
    el.addEventListener('close', () => {
      document.documentElement.classList.remove('dk-lock');
      if (onClose) onClose();
      if (opener && opener.isConnected) opener.focus();
    });
    el.addEventListener('click', e => { if (e.target === el || e.target.closest('[data-close]')) close(); });
    return {
      open(from) { opener = from || document.activeElement; if (!el.open) el.showModal(); document.documentElement.classList.add('dk-lock'); el.scrollTop = 0; },
      close,
      get isOpen() { return el.open; },
    };
  };

  // Rutas por hash: #/tipo/valor  → handlers[tipo](valor)
  const router = (handlers, fallback) => {
    const run = () => {
      const [, type, value] = location.hash.match(/^#\/([\w-]+)\/?([\w-]*)/) || [];
      if (type && handlers[type]) handlers[type](value); else if (fallback) fallback();
    };
    addEventListener('hashchange', run);
    run();
    return { go: (type, value) => { location.hash = `#/${type}/${value}`; }, clear: () => { if (location.hash.startsWith('#/')) history.replaceState(null, '', location.pathname + location.search); } };
  };

  // Apariciones (sin dejar nada oculto si se salta de golpe)
  let pending = $$('[data-rv]');
  const reveal = () => {
    const lim = innerHeight * 0.94;
    pending = pending.filter(x => { if (rm || x.getBoundingClientRect().top < lim) { x.classList.add('in'); return false; } return true; });
  };
  let q = false;
  addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(() => { reveal(); q = false; }); } }, { passive: true });
  addEventListener('load', reveal);
  reveal();

  // Pastilla flotante de Kódika
  const pill = $('#dkPill'), end = $('.dk-end');
  if (pill) {
    const upd = () => {
      const nearEnd = end && end.getBoundingClientRect().top < innerHeight;
      pill.classList.toggle('in', scrollY > 700 && !nearEnd && !document.documentElement.classList.contains('dk-lock'));
    };
    addEventListener('scroll', upd, { passive: true }); upd();
  }

  window.Demo = { $, $$, data, store, eur, esc, announce, form, isEmail, isPhone, demoSent, dialog, router, rm, reveal: () => { pending = pending.concat($$('[data-rv]:not(.in)')); reveal(); } };
})();
