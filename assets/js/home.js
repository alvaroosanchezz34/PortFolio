// SanchezDevelop · portada: escenario del hero, proceso, configurador y demo con IA.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const WA = 'https://wa.me/34697898574?text=';

  /* ---------- Hero: profundidad del escenario ---------- */
  const stage = $('#stage'), hero = $('#inicio');
  if (stage) {
    $$('.pn', stage).forEach(p => p.style.setProperty('--depth', p.dataset.depth || 1));
    if (!rm) {
      let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, raf = null, visible = true;
      const loop = () => {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        stage.style.setProperty('--px', cx.toFixed(2));
        stage.style.setProperty('--py', cy.toFixed(2));
        stage.style.setProperty('--sy', sy.toFixed(2));
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : null;
      };
      const kick = () => { if (!raf && visible) raf = requestAnimationFrame(loop); };
      if (matchMedia('(pointer: fine)').matches) {
        hero.addEventListener('pointermove', e => {
          const r = hero.getBoundingClientRect();
          tx = ((e.clientX - r.left) / r.width - 0.5) * -14;
          ty = ((e.clientY - r.top) / r.height - 0.5) * -10;
          kick();
        });
        hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
      }
      addEventListener('scroll', () => {
        if (!visible) return;
        sy = Math.min(scrollY, innerHeight) * 0.035;
        kick();
      }, { passive: true });
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
    }
  }

  /* ---------- Demos: tipografías de cada marca solo cuando hacen falta ---------- */
  const demos = $('#demos');
  if (demos) {
    if (!('IntersectionObserver' in window)) demos.classList.add('fonts-on');
    else new IntersectionObserver(([e], o) => { if (e.isIntersecting) { demos.classList.add('fonts-on'); o.disconnect(); } }, { rootMargin: '800px 0px' }).observe(demos);
  }

  /* ---------- Proceso: la línea avanza con el scroll ---------- */
  const tl = $('#tl');
  if (tl) {
    const steps = $$('li', tl);
    const update = () => {
      const r = tl.getBoundingClientRect();
      const p = rm ? 1 : clamp((innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.25));
      tl.style.setProperty('--p', p.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle('on', p >= i / steps.length + 0.02));
    };
    let t = false;
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { update(); t = false; }); } }, { passive: true });
    update();
  }

  /* ---------- Configurador de presupuesto ---------- */
  const inputs = $$('#opts input'), num = $('#num'), extra = $('#extra'), hint2 = $('#hint2'), calcCta = $('#calcCta');
  if (inputs.length) {
    let shown = [250, 400], na = null, last = { picked: [], est: '' };
    const fmt = n => n.toLocaleString('es-ES');
    const anim = (a, b) => {
      cancelAnimationFrame(na);
      const from = shown.slice(), s = performance.now(), d = rm ? 1 : 500;
      const st = t => {
        const k = clamp((t - s) / d), e = 1 - Math.pow(1 - k, 3);
        const lo = Math.round(from[0] + (a - from[0]) * e), hi = Math.round(from[1] + (b - from[1]) * e);
        num.textContent = `${fmt(lo)}–${fmt(hi)} €`; shown = [lo, hi];
        if (k < 1) na = requestAnimationFrame(st);
      };
      na = requestAnimationFrame(st);
    };
    const calc = () => {
      let lo = 0, hi = 0, mlo = 0, mhi = 0, custom = false; const picked = [];
      inputs.forEach(i => {
        if (!i.checked) return; picked.push(i.dataset.k);
        if (i.dataset.custom) custom = true;
        else if (i.dataset.month) { mlo += +i.dataset.min; mhi += +i.dataset.max; }
        else { lo += +i.dataset.min; hi += +i.dataset.max; }
      });
      const ex = [];
      if (mlo) ex.push(`+ ${mlo}–${mhi} €/mes de mantenimiento`);
      if (custom) ex.push('+ plataforma a medida, la estudiamos juntos');
      extra.textContent = ex.join('. ');
      let est;
      if (!lo && !custom) { cancelAnimationFrame(na); num.textContent = '—'; est = 'por ver'; hint2.textContent = mlo ? 'El mantenimiento va junto a una web. Marca qué necesitas.' : 'Marca al menos una opción.'; }
      else if (!lo) { cancelAnimationFrame(na); num.textContent = 'A medida'; est = 'a medida'; hint2.textContent = 'Te doy un precio cerrado después de una primera charla.'; }
      else { anim(lo, hi); est = `${fmt(lo)}–${fmt(hi)} €`; hint2.textContent = 'Pago único. Primero ves la web, luego pagas.'; }
      last = { picked, est: est + (mlo ? ` + ${mlo}–${mhi} €/mes` : '') };
      const msg = `Hola Álvaro, he configurado mi web en tu página.\n\nMe interesa: ${picked.join(', ') || 'una web'}.\nEstimación: ${last.est}.\n\nMi negocio es: `;
      calcCta.href = WA + encodeURIComponent(msg);
    };
    inputs.forEach(i => i.addEventListener('change', calc));
    calc();
    const toForm = $('#calcForm');
    if (toForm) toForm.addEventListener('click', () => {
      const has = k => last.picked.includes(k);
      const type = has('Plataforma a medida') ? 'app' : has('Tienda online') ? 'tienda' : has('Reservas o pedidos') ? 'reservas' : has('Integración con IA') ? 'ia' : 'web';
      dispatchEvent(new CustomEvent('sd:prefill', { detail: { type, msg: `He usado el configurador. Me interesa: ${last.picked.join(', ') || 'una web'}. Estimación: ${last.est}. Mi negocio es: ` } }));
      const c = $('#contacto'); c.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' });
      setTimeout(() => { const n = $('#cf-name'); n && n.focus({ preventScroll: true }); }, rm ? 0 : 700);
    });
  }

  /* ---------- Demo con IA (usa /api/preview; si falla, plantillas locales) ---------- */
  const form = $('#genForm');
  if (form) {
    const bizName = $('#bizName'), bizType = $('#bizType'), genBtn = $('#gen'), frameEl = $('#frame'),
      empty = $('#empty'), skeleton = $('#skeleton'), skStatus = $('#skStatus'),
      site = $('#site'), urlEl = $('#url'), after = $('#after'), genErr = $('#genErr');
    const btnLabel = genBtn.innerHTML;
    let busy = false, stTimer = null;
    const STATUS = ['Analizando tu negocio…', 'Eligiendo la paleta…', 'Escribiendo los textos…', 'Componiendo el diseño…'];
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hexOk = h => /^#[0-9a-fA-F]{6}$/.test(h);
    const tint = hex => { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `rgba(${r},${g},${b},.13)`; };
    const slug = s => (s || 'tunegocio').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'tunegocio';
    const PRESETS = [
      { k: ['bar', 'restaurante', 'cafeter', 'tapas', 'comida', 'cocina', 'pizzer', 'marisqu', 'chiringu'], acc: '#D2482F', kick: 'Sabor de siempre', t: 'Ven con hambre, vuelve con ganas', cta: 'Reservar mesa', cards: [['🍽️', 'Nuestra carta'], ['📅', 'Reserva online'], ['📍', 'Cómo llegar']], foot: ['📍 Tu ciudad', '🕐 12:00–00:00', '☎ Reservas'] },
      { k: ['pelu', 'estética', 'estetic', 'belleza', 'barber', 'uñas', 'peinado'], acc: '#B8448C', kick: 'Belleza y cuidado', t: 'Sal sintiéndote mejor que al entrar', cta: 'Pedir cita', cards: [['💇', 'Servicios'], ['🗓️', 'Cita online'], ['⭐', 'Opiniones']], foot: ['📍 Tu ciudad', '🕐 Mar–Sáb', '☎ Cita previa'] },
      { k: ['tienda', 'ropa', 'moda', 'zapat', 'venta', 'comercio', 'boutique'], acc: '#1F9E6E', kick: 'Tienda online', t: 'Lo que buscas, a un clic de casa', cta: 'Ver catálogo', cards: [['🛒', 'Catálogo'], ['🚚', 'Envíos'], ['💳', 'Pago seguro']], foot: ['🚚 Envío nacional', '↩️ Devoluciones', '💬 Atención'] },
      { k: ['gym', 'gimnasio', 'deport', 'fitness', 'entren', 'crossfit', 'yoga', 'pilates'], acc: '#2E6BE6', kick: 'Centro deportivo', t: 'Tu mejor versión empieza hoy', cta: 'Prueba gratis', cards: [['🏋️', 'Clases'], ['📆', 'Horarios'], ['🎟️', 'Tarifas']], foot: ['📍 Tu ciudad', '🕐 7:00–23:00', '☎ Infórmate'] },
      { k: ['clínic', 'clinic', 'dent', 'médic', 'medic', 'fisio', 'salud', 'psico', 'masaj'], acc: '#0E8FA0', kick: 'Tu salud primero', t: 'Cuidamos de ti, sin esperas', cta: 'Reservar visita', cards: [['🩺', 'Tratamientos'], ['🗓️', 'Cita online'], ['📍', 'Ubicación']], foot: ['📍 Tu ciudad', '🕐 L–V 9–20', '☎ Contacto'] },
      { k: ['taller', 'mecánic', 'mecanic', 'coche', 'fontaner', 'electric', 'reforma', 'obra', 'pintor'], acc: '#D07A1C', kick: 'Profesionales de confianza', t: 'Trabajo bien hecho, a la primera', cta: 'Pedir presupuesto', cards: [['🔧', 'Servicios'], ['🧾', 'Presupuesto'], ['📞', 'Contacto']], foot: ['📍 Tu ciudad', '🕐 L–V', '☎ Llámanos'] },
      { k: ['foto', 'fotógraf', 'fotograf', 'vídeo', 'video', 'diseñ', 'artist', 'músic', 'boda'], acc: '#6E46E8', kick: 'Trabajo con alma', t: 'Momentos que merecen quedarse', cta: 'Ver portfolio', cards: [['📸', 'Portfolio'], ['📦', 'Servicios'], ['✉️', 'Contacto']], foot: ['📍 Disponible online', '🕐 Respuesta en 24 h', '✉️ Escríbeme'] },
    ];
    const GENERIC = { acc: '#0071e3', kick: 'Bienvenido', t: 'Lo que necesitas, cerca de ti', cta: 'Contactar', cards: [['🧩', 'Servicios'], ['⭐', 'Sobre nosotros'], ['✉️', 'Contacto']], foot: ['📍 Tu ciudad', '🕐 Horario', '✉️ Contacto'] };
    const localData = (name, type) => {
      const t = (type || name || '').toLowerCase();
      const p = PRESETS.find(p => p.k.some(w => t.includes(w))) || GENERIC;
      return {
        name: name || (type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Tu Negocio'),
        url: slug(name || type) + '.com',
        kick: type ? type.charAt(0).toUpperCase() + type.slice(1, 40) : p.kick,
        title: p.t, sub: `Todo lo que ${name || 'tu negocio'} ofrece, ahora también online y a un clic.`,
        cta: p.cta, accent: p.acc, cards: p.cards.map(c => ({ ico: c[0], label: c[1] })), foot: p.foot,
      };
    };
    const fetchAI = async (name, type) => {
      const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 14000);
      try {
        const res = await fetch('/api/preview', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, type }), signal: ctrl.signal });
        clearTimeout(to); if (!res.ok) throw 0;
        const d = await res.json(); if (!d || !d.title) throw 0; return d;
      } catch (e) { clearTimeout(to); return null; }
    };
    const buildSite = d => {
      const acc = hexOk(d.accent) ? d.accent : '#0071e3';
      site.style.setProperty('--acc', acc); site.style.setProperty('--acc-soft', tint(acc));
      const cards = (Array.isArray(d.cards) ? d.cards : []).slice(0, 3);
      while (cards.length < 3) cards.push({ ico: '•', label: 'Sección' });
      const foot = (Array.isArray(d.foot) ? d.foot : []).slice(0, 3).filter(Boolean);
      urlEl.textContent = d.url || 'tunegocio.com';
      site.innerHTML = `
        <div class="wash" id="wash"></div>
        <div class="badge" id="badge">Diseñada al momento</div>
        <div class="s-nav" id="s-nav"><div class="s-logo">${esc(d.name || 'Tu Negocio')}</div>
          <div class="s-links"><span>Inicio</span><span>${esc(cards[0].label)}</span><span>Contacto</span></div>
          <div class="s-navcta">${esc(d.cta || 'Contactar')}</div></div>
        <div class="s-hero"><div class="s-blob" id="s-blob"></div>
          <div class="s-kick fade" id="s-kick">${esc(d.kick || '')}</div>
          <div class="s-title" id="s-title"><span id="s-caret" class="caret"></span></div>
          <p class="s-sub fade" id="s-sub">${esc(d.sub || '')}</p>
          <span class="s-btn pop" id="s-btn">${esc(d.cta || 'Contactar')}</span></div>
        <div class="s-cards" id="s-cards">${cards.map(c => `<div class="s-card"><div class="ico">${esc(c.ico || '•')}</div><b>${esc(c.label || '')}</b></div>`).join('')}</div>
        <div class="s-foot" id="s-foot">${foot.map(f => `<span>${esc(f)}</span>`).join('')}</div>`;
      return d.title || '';
    };
    const spectacle = async d => {
      const title = buildSite(d);
      skeleton.classList.add('out'); site.classList.add('show');
      if (!rm) $('#wash').classList.add('go');
      await wait(rm ? 0 : 400); skeleton.classList.remove('show', 'out');
      const all = () => $$('#site .fade,#site .pop,#site .s-nav,#site .s-card,#site .s-foot').forEach(e => e.classList.add('in'));
      if (rm) {
        const t = $('#s-title'), c = $('#s-caret'); t.insertBefore(document.createTextNode(title), c); c.remove();
        all(); $('#s-blob').classList.add('in'); $('#badge').classList.add('in'); return;
      }
      $('#s-nav').classList.add('in'); $('#s-blob').classList.add('in');
      await wait(260); $('#s-kick').classList.add('in'); await wait(220);
      const c = $('#s-caret');
      for (const ch of title) { c.insertAdjacentText('beforebegin', ch); await wait(24); }
      await wait(140); $('#s-sub').classList.add('in');
      await wait(220); $('#s-btn').classList.add('in'); await wait(200);
      for (const card of $$('#s-cards .s-card')) { card.classList.add('in'); await wait(130); }
      await wait(100); $('#s-foot').classList.add('in');
      await wait(260); c.remove(); $('#badge').classList.add('in');
      frameEl.classList.add('flash'); await wait(700); frameEl.classList.remove('flash');
    };
    const startSkeleton = () => {
      empty.style.display = 'none'; site.classList.remove('show'); site.innerHTML = '';
      skeleton.classList.remove('out'); skeleton.classList.add('show');
      let i = 0; skStatus.textContent = STATUS[0];
      if (!rm) stTimer = setInterval(() => { i = (i + 1) % STATUS.length; skStatus.textContent = STATUS[i]; }, 750);
    };
    const generate = async () => {
      if (busy) return;
      const name = bizName.value.trim(), type = bizType.value.trim();
      if (!name && !type) { genErr.hidden = false; bizType.setAttribute('aria-invalid', 'true'); bizType.focus(); return; }
      genErr.hidden = true; bizType.removeAttribute('aria-invalid');
      busy = true; genBtn.disabled = true; genBtn.classList.add('is-loading'); genBtn.textContent = 'Diseñando…'; after.classList.remove('in');
      startSkeleton();
      const [ai] = await Promise.all([fetchAI(name, type), wait(rm ? 300 : 1800)]);
      clearInterval(stTimer);
      const d = ai || localData(name, type); if (!d.name && name) d.name = name;
      await spectacle(d);
      after.classList.add('in');
      busy = false; genBtn.disabled = false; genBtn.classList.remove('is-loading'); genBtn.innerHTML = btnLabel.replace('Diseñar mi web', 'Probar con otro negocio');
    };
    form.addEventListener('submit', e => { e.preventDefault(); generate(); });
    $$('.chip').forEach(ch => ch.addEventListener('click', () => { bizType.value = ch.dataset.t; generate(); }));
  }
})();
