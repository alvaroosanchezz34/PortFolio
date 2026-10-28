// Formulario de contacto. «Enviar mensaje» lo manda a /api/contact (functions/api/contact.js),
// que lo reenvía por email. Si el envío falla, se ofrece WhatsApp o el correo con el mensaje
// ya escrito, para que nunca se pierda. «Prefiero WhatsApp» abre WhatsApp directamente.
(() => {
  const WA = '34697898574';
  const EMAIL = 'alvarosanchezortega34@gmail.com';
  const DEMOS = {
    'aurea-estates': 'Aurea Estates (inmobiliaria)',
    'noir-atelier': 'Noir Atelier (tienda de moda)',
    'sora-wellness': 'Sora Wellness (centro de bienestar)',
    'forge-fitness': 'Forge Fitness (gimnasio)',
    'veloce-automotive': 'Veloce Automotive (concesionario)',
    'flowbook': 'Flowbook (SaaS de reservas)',
  };

  document.querySelectorAll('form[data-contact]').forEach(form => {
    const f = name => form.elements[name];
    const status = form.querySelector('.form-status');

    const setErr = (el, msg) => {
      const box = el.closest('.fld, .check-wrap');
      const err = box && box.querySelector('.err');
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg || ''; err.hidden = !msg; }
    };
    const rules = {
      name: v => v.trim().length >= 2 ? '' : 'Escribe tu nombre.',
      contact: v => {
        const s = v.trim();
        if (!s) return 'Necesitamos un email o un teléfono para responderte.';
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
        const phone = s.replace(/[\s().-]/g, '').replace(/^\+/, '').match(/^\d{9,15}$/);
        return email || phone ? '' : 'Escribe un email válido (nombre@dominio.com) o un teléfono de al menos 9 cifras.';
      },
      type: v => v ? '' : 'Elige qué tipo de proyecto es.',
      msg: v => v.trim().length >= 15 ? '' : 'Cuéntanos un poco más (mínimo 15 caracteres).',
    };
    const check = name => {
      const el = f(name), msg = rules[name](el.value);
      setErr(el, msg); return !msg;
    };
    const checkPrivacy = () => {
      const el = f('privacy'), ok = el.checked;
      setErr(el, ok ? '' : 'Necesitamos que aceptes la política de privacidad para responderte.');
      return ok;
    };

    Object.keys(rules).forEach(n => {
      f(n).addEventListener('blur', () => { if (f(n).value) check(n); });
      f(n).addEventListener('input', () => { if (f(n).getAttribute('aria-invalid') === 'true') check(n); });
    });
    f('privacy').addEventListener('change', checkPrivacy);

    // Prellenado desde una demo (?demo=slug) o desde el configurador
    const fill = ({ type, msg }) => {
      if (type) f('type').value = type;
      if (msg && !f('msg').value.trim()) f('msg').value = msg;
    };
    const demo = new URLSearchParams(location.search).get('demo');
    if (demo && DEMOS[demo]) fill({ type: 'web', msg: `He visto la demo ${DEMOS[demo]} y quiero una web parecida para mi negocio. Mi negocio es: ` });
    addEventListener('sd:prefill', e => { fill(e.detail || {}); });

    const started = Date.now();
    const btnSend = form.querySelector('button[value="send"]');
    const show = (cls, html) => { status.hidden = false; status.className = 'form-status ' + cls; status.innerHTML = html; };
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.dataset.busy) return;
      const via = (e.submitter && e.submitter.value) || 'send';
      const ok = ['name', 'contact', 'type', 'msg'].map(check).concat(checkPrivacy()).every(Boolean);
      if (!ok) {
        show('bad', 'Revisa los campos marcados.');
        const first = form.querySelector('[aria-invalid="true"]'); first && first.focus();
        return;
      }
      const typeLabel = f('type').selectedOptions[0].textContent;
      const text = `Hola, escribo a Kódika. Soy ${f('name').value.trim()}.\n\nNecesito: ${typeLabel}.\n\n${f('msg').value.trim()}\n\nPodéis contactarme en: ${f('contact').value.trim()}`;
      const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
      const mailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent('Proyecto: ' + typeLabel)}&body=${encodeURIComponent(text)}`;

      if (via === 'wa') {
        const w = window.open(waUrl, '_blank', 'noopener');
        if (!w) location.href = waUrl;
        if (window.sdTrack) window.sdTrack('form-whatsapp');
        show('ok', `Mensaje preparado en WhatsApp: <b>solo falta que pulses enviar</b>. Si no se ha abierto, <a href="${esc(waUrl)}" target="_blank" rel="noopener">ábrelo aquí</a>.`);
        return;
      }

      // Envío directo
      form.dataset.busy = '1'; btnSend.classList.add('is-loading'); btnSend.setAttribute('aria-disabled', 'true');
      show('', 'Enviando…');
      const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 15000);
      let res = null;
      try {
        const r = await fetch('/api/contact', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({
            name: f('name').value, contact: f('contact').value, type: f('type').value, msg: f('msg').value,
            privacy: f('privacy').checked, website: f('website') ? f('website').value : '',
            t: Date.now() - started, page: location.pathname + location.search,
          }),
        });
        res = await r.json().catch(() => ({})); res.status = r.status;
      } catch (_) { res = { error: 'network' }; }
      clearTimeout(timer);
      delete form.dataset.busy; btnSend.classList.remove('is-loading'); btnSend.removeAttribute('aria-disabled');

      if (res && res.ok) {
        if (window.sdTrack) window.sdTrack('form');
        form.reset();
        Object.keys(rules).concat('privacy').forEach(n => setErr(f(n), ''));
        show('ok', '<b>Mensaje enviado.</b> Te respondemos normalmente el mismo día, como mucho en 24 horas.');
        status.focus();
        return;
      }
      show('bad', `No hemos podido enviar el mensaje desde aquí. Para que no se pierda, envíalo con un clic por <a href="${esc(waUrl)}" target="_blank" rel="noopener" data-cta="form-whatsapp">WhatsApp</a> o por <a href="${esc(mailUrl)}" data-cta="form-email">email</a>: ya va escrito.`);
    });
  });
})();
