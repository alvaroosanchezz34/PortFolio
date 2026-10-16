// Veloce Automotive · stock filtrable, fichas técnicas, cuota orientativa y solicitudes de demostración.
(() => {
  const { $, $$, data, eur, esc, announce, form, isEmail, isPhone, demoSent, dialog, router, rm } = window.Demo;
  const C = data.cars, dims = data.dims, byId = Object.fromEntries(C.map(c => [c.id, c]));
  const TIN = 7.49; // % de demostración
  const img = (name, alt, sizes) => {
    const base = `/assets/demos/veloce-automotive/img/${name}`;
    if (/-d\d$/.test(name)) { // recortes de detalle: una sola resolución
      const [w, h] = dims[name.replace(/-d\d$/, '')] || [1600, 1000];
      return `<img src="${base}-1200.webp" width="1200" height="${Math.round(1200 * h / w)}" alt="${esc(alt)}" decoding="async">`;
    }
    const [w, h] = dims[name] || [1600, 1000];
    return `<img src="${base}-800.webp" srcset="${base}-800.webp 800w, ${base}-1600.webp 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" decoding="async">`;
  };

  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  // Parallax suave del hero
  const heroImg = $('#heroImg');
  if (!rm) {
    let t = false;
    addEventListener('scroll', () => {
      if (t || scrollY > innerHeight * 1.2) return; t = true;
      requestAnimationFrame(() => { heroImg.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`; t = false; });
    }, { passive: true });
  }

  // Filtros
  const filters = $('#filters'), grid = $('#grid'), count = $('#count'), empty = $('#empty'), maxOut = $('#maxOut');
  const cards = Object.fromEntries($$('.vc', grid).map(c => [c.dataset.id, c]));
  const apply = () => {
    const f = Object.fromEntries(new FormData(filters));
    const max = +f.max, year = +f.year;
    maxOut.textContent = eur(max);
    let list = C.filter(c => (!f.make || c.make === f.make) && (!f.body || c.body === f.body) && c.price <= max && c.year >= year);
    const s = f.sort || 'desc';
    list.sort((a, b) => s === 'asc' ? a.price - b.price : s === 'cv' ? b.cv - a.cv : s === 'km' ? a.km - b.km : b.price - a.price);
    const ids = new Set(list.map(c => c.id));
    C.forEach(c => { cards[c.id].hidden = !ids.has(c.id); });
    list.forEach(c => grid.appendChild(cards[c.id]));
    count.textContent = list.length === 1 ? '1 vehículo' : `${list.length} vehículos`;
    empty.hidden = list.length > 0;
  };
  let deb = null;
  filters.addEventListener('input', () => { apply(); clearTimeout(deb); deb = setTimeout(() => announce(`${count.textContent} encontrados`), 400); });
  filters.addEventListener('reset', () => setTimeout(apply, 0));
  $('#emptyReset').addEventListener('click', () => filters.reset());
  apply();

  $$('[data-type]').forEach(a => a.addEventListener('click', () => { $('#c-type').value = a.dataset.type; }));

  const rules = {
    name: v => v.trim().length >= 2 ? '' : 'Escribe tu nombre.',
    contact: v => isEmail(v) || isPhone(v) ? '' : 'Escribe un teléfono (9 cifras o más) o un email válido.',
    type: v => v ? '' : 'Elige el motivo de tu solicitud.',
    msg: v => v.trim().length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).',
    ok: v => v ? '' : 'Necesitamos tu permiso para contactarte.',
  };
  form($('#contactForm'), rules, () => demoSent($('#contactDone')));

  // Ficha del vehículo
  const dlg = $('#dlg'), body = $('#dlgBody');
  const modal = dialog(dlg, { onClose: () => route.clear() });
  const quota = (price, down, months) => {
    const P = Math.max(0, price - down), r = TIN / 100 / 12;
    return P === 0 ? 0 : P * r / (1 - Math.pow(1 + r, -months));
  };
  const open = id => {
    const c = byId[id]; if (!c) return;
    const pics = [c.img, ...c.gal];
    let i = 0;
    body.innerHTML = `
      <div class="v-wrap">
        <div class="v-gal">
          <div class="v-main" id="vMain">${img(pics[0], c.alt, '(max-width: 900px) 100vw, 60vw')}</div>
          <div class="v-thumbs" role="group" aria-label="Fotos del ${esc(c.make)} ${esc(c.model)}">${pics.map((n, k) => `<button type="button" data-i="${k}" aria-label="Foto ${k + 1} de ${pics.length}" aria-current="${k === 0}">${img(n, '', '96px')}</button>`).join('')}</div>
        </div>
        <div class="v-info">
          <p class="v-make">${esc(c.make)} · ${esc(c.body)} · ${c.year}</p>
          <h2 id="v-title">${esc(c.model)}</h2>
          <p class="v-price">${eur(c.price)} <span class="dk-demo-note">· precio de demostración</span></p>
          <dl class="v-specs">
            <div><dt>Potencia</dt><dd>${c.cv} CV</dd></div><div><dt>0–100 km/h</dt><dd>${c.acc} s</dd></div>
            <div><dt>Velocidad máxima</dt><dd>${c.top} km/h${c.topNote ? ` (${c.topNote})` : ''}</dd></div><div><dt>Kilómetros</dt><dd>${c.km.toLocaleString('es-ES')} km</dd></div>
            <div><dt>Motor</dt><dd>${esc(c.engine)}</dd></div><div><dt>Cambio</dt><dd>${esc(c.gear)}</dd></div>
            <div><dt>Tracción</dt><dd>${esc(c.drive)}</dd></div><div><dt>Color</dt><dd>${esc(c.color)}</dd></div>
          </dl>
          <ul class="v-eq" aria-label="Equipamiento destacado">${c.eq.map(e => `<li>${esc(e)}</li>`).join('')}</ul>
          <div class="v-fin" aria-labelledby="fin-t">
            <h3 id="fin-t">Cuota orientativa</h3>
            <label>Entrada: <output id="downOut"></output><input type="range" id="down" min="0" max="${Math.round(c.price * 0.5)}" step="1000" value="${Math.round(c.price * 0.2 / 1000) * 1000}"></label>
            <label>Plazo<select id="months"><option value="24">24 meses</option><option value="36">36 meses</option><option value="48" selected>48 meses</option><option value="60">60 meses</option></select></label>
            <p class="v-quota" aria-live="polite"><span id="quota"></span> <small>/mes</small></p>
            <p class="v-fine">Cálculo orientativo con un TIN de ${TIN.toLocaleString('es-ES')} % de demostración. No es una oferta de financiación.</p>
          </div>
          <form class="va-form v-req" id="vForm" novalidate>
            <h3>Solicitar información o prueba</h3>
            <div class="va-row">
              <div class="va-f"><label for="v-name">Nombre</label><input id="v-name" name="name" autocomplete="name" aria-describedby="v-name-e"><p class="va-err" id="v-name-e" data-err="name" hidden></p></div>
              <div class="va-f"><label for="v-contact">Teléfono o email</label><input id="v-contact" name="contact" autocomplete="email" aria-describedby="v-contact-e"><p class="va-err" id="v-contact-e" data-err="contact" hidden></p></div>
            </div>
            <div class="va-f"><label for="v-type">Quiero</label><select id="v-type" name="type" aria-describedby="v-type-e"><option value="">Elige una opción</option><option>Más información</option><option>Una prueba de conducción</option><option>Una propuesta de financiación</option></select><p class="va-err" id="v-type-e" data-err="type" hidden></p></div>
            <label class="va-chk"><input type="checkbox" name="ok" aria-describedby="v-ok-e"> Acepto que me contactéis sobre este vehículo.</label>
            <p class="va-err" id="v-ok-e" data-err="ok" hidden></p>
            <button class="va-btn" type="submit">Enviar solicitud</button>
            <div class="va-done" id="vDone" role="status" hidden></div>
          </form>
        </div>
      </div>`;
    const main = $('#vMain', body), thumbs = $$('.v-thumbs button', body);
    const show = k => {
      i = (k + pics.length) % pics.length;
      main.innerHTML = img(pics[i], i === 0 ? c.alt : `${c.make} ${c.model}, detalle (foto ${i + 1})`, '(max-width: 900px) 100vw, 60vw');
      thumbs.forEach((t, j) => t.setAttribute('aria-current', String(j === i)));
    };
    thumbs.forEach(t => t.addEventListener('click', () => show(+t.dataset.i)));
    dlg.onkeydown = e => { if (e.target.closest('input, select, textarea')) return; if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); };
    const down = $('#down', body), months = $('#months', body);
    const calc = () => { $('#downOut', body).textContent = eur(+down.value); $('#quota', body).textContent = eur(Math.round(quota(c.price, +down.value, +months.value))); };
    down.addEventListener('input', calc); months.addEventListener('change', calc); calc();
    const { name, contact, type, ok } = rules;
    form($('#vForm', body), { name, contact, type, ok }, () => demoSent($('#vDone', body)));
    modal.open();
  };
  const route = router({ vehiculo: open }, () => { if (modal.isOpen) modal.close(); });
})();
