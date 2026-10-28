// Formulario de contacto. No hay backend: al enviarlo se abre WhatsApp o el correo
// con el mensaje ya escrito. Nunca se dice «enviado», porque esta web no lo puede saber.
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
    let via = 'wa';

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
        if (!s) return 'Necesito un email o un teléfono para responderte.';
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
        const phone = s.replace(/[\s().-]/g, '').replace(/^\+/, '').match(/^\d{9,15}$/);
        return email || phone ? '' : 'Escribe un email válido (nombre@dominio.com) o un teléfono de al menos 9 cifras.';
      },
      type: v => v ? '' : 'Elige qué tipo de proyecto es.',
      msg: v => v.trim().length >= 15 ? '' : 'Cuéntame un poco más (mínimo 15 caracteres).',
    };
    const check = name => {
      const el = f(name), msg = rules[name](el.value);
      setErr(el, msg); return !msg;
    };
    const checkPrivacy = () => {
      const el = f('privacy'), ok = el.checked;
      setErr(el, ok ? '' : 'Necesito que aceptes la política de privacidad para responderte.');
      return ok;
    };

    Object.keys(rules).forEach(n => {
      f(n).addEventListener('blur', () => { if (f(n).value) check(n); });
      f(n).addEventListener('input', () => { if (f(n).getAttribute('aria-invalid') === 'true') check(n); });
    });
    f('privacy').addEventListener('change', checkPrivacy);
    form.querySelectorAll('button[type="submit"]').forEach(b => b.addEventListener('click', () => { via = b.value; }));

    // Prellenado desde una demo (?demo=slug) o desde el configurador
    const fill = ({ type, msg }) => {
      if (type) f('type').value = type;
      if (msg && !f('msg').value.trim()) f('msg').value = msg;
    };
    const demo = new URLSearchParams(location.search).get('demo');
    if (demo && DEMOS[demo]) fill({ type: 'web', msg: `He visto la demo ${DEMOS[demo]} y quiero una web parecida para mi negocio. Mi negocio es: ` });
    addEventListener('sd:prefill', e => { fill(e.detail || {}); });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = ['name', 'contact', 'type', 'msg'].map(check).concat(checkPrivacy()).every(Boolean);
      if (!ok) {
        status.hidden = false; status.className = 'form-status bad';
        status.textContent = 'Revisa los campos marcados.';
        const first = form.querySelector('[aria-invalid="true"]'); first && first.focus();
        return;
      }
      const typeLabel = f('type').selectedOptions[0].textContent;
      const text = `Hola, escribo a Kódika. Soy ${f('name').value.trim()}.\n\nNecesito: ${typeLabel}.\n\n${f('msg').value.trim()}\n\nPodéis contactarme en: ${f('contact').value.trim()}`;
      let opened = true;
      if (via === 'email') {
        location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Proyecto: ' + typeLabel)}&body=${encodeURIComponent(text)}`;
      } else {
        const w = window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        if (!w) { opened = false; location.href = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`; }
      }
      if (window.sdTrack) window.sdTrack(via === 'email' ? 'form-email' : 'form-whatsapp');
      status.hidden = false; status.className = 'form-status ok';
      status.innerHTML = via === 'email'
        ? `Mensaje preparado en tu programa de correo: <b>solo falta que pulses enviar</b>. Si no se ha abierto, escríbenos a <a href="mailto:${EMAIL}">${EMAIL}</a>.`
        : `Mensaje preparado en WhatsApp${opened ? '' : ' (abriéndolo…)'}: <b>solo falta que pulses enviar</b>. Si no se ha abierto, escríbenos por email a <a href="mailto:${EMAIL}">${EMAIL}</a>.`;
    });
  });
})();
