// Aurea Estates · buscador, filtros, fichas con galería y formularios de demostración.
(() => {
  const { $, $$, data, eur, esc, announce, form, isEmail, demoSent, dialog, router } = window.Demo;
  const props = data.properties, dims = data.dims;
  const byId = Object.fromEntries(props.map(p => [p.id, p]));
  const img = (name, alt, sizes, cls = '') => {
    const [w, h] = dims[name] || [1600, 1067];
    const b = `/assets/demos/aurea-estates/img/${name}`;
    return `<img${cls ? ` class="${cls}"` : ''} src="${b}-800.webp" srcset="${b}-800.webp 800w, ${b}-1600.webp 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" decoding="async">`;
  };

  // Cabecera: transparente sobre el hero, sólida al bajar
  const hd = $('#hd');
  const onScroll = () => hd.classList.toggle('solid', scrollY > innerHeight * 0.55);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => {
    const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o));
    hd.classList.add('solid');
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  // Filtros
  const filters = $('#filters'), grid = $('#grid'), count = $('#count'), empty = $('#empty');
  const cards = Object.fromEntries($$('.pc', grid).map(c => [c.dataset.id, c]));
  const apply = (focusList = false) => {
    const f = Object.fromEntries(new FormData(filters));
    const max = +f.max || Infinity, beds = +f.beds || 0;
    let list = props.filter(p => (!f.zone || p.zone === f.zone) && (!f.type || p.type === f.type) && p.price <= max && p.beds >= beds);
    if (f.sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (f.sort === 'desc') list.sort((a, b) => b.price - a.price);
    if (f.sort === 'm2') list.sort((a, b) => b.m2 - a.m2);
    const ids = new Set(list.map(p => p.id));
    props.forEach(p => { cards[p.id].hidden = !ids.has(p.id); });
    list.forEach(p => grid.appendChild(cards[p.id])); // orden
    const n = list.length;
    count.textContent = n === 1 ? '1 propiedad' : `${n} propiedades`;
    empty.hidden = n > 0;
    announce(n ? `${count.textContent} encontradas` : 'No hay propiedades con esos filtros');
    if (focusList) $('#propiedades').scrollIntoView({ behavior: window.Demo.rm ? 'auto' : 'smooth' });
  };
  filters.addEventListener('change', () => apply());
  filters.addEventListener('reset', () => setTimeout(() => apply(), 0));
  $('#emptyReset').addEventListener('click', () => { filters.reset(); });
  $('#heroSearch').addEventListener('submit', e => {
    e.preventDefault();
    const h = new FormData(e.target);
    ['zone', 'type', 'max'].forEach(k => { filters.elements[k].value = h.get(k); });
    apply(true);
  });
  $$('[data-zone]').forEach(b => b.addEventListener('click', () => {
    filters.reset(); setTimeout(() => { filters.elements.zone.value = b.dataset.zone; apply(true); }, 0);
  }));
  $$('[data-interest]').forEach(a => a.addEventListener('click', () => { $('#c-interest').value = a.dataset.interest; }));

  // Formulario de contacto general
  const rules = {
    name: v => v.trim().length >= 2 ? '' : 'Escribe tu nombre.',
    email: v => isEmail(v) ? '' : 'Escribe un email válido, por ejemplo nombre@dominio.com.',
    interest: v => v ? '' : 'Elige si quieres comprar, vender o valorar.',
    msg: v => v.trim().length >= 10 ? '' : 'Cuéntanos un poco más (mínimo 10 caracteres).',
    ok: v => v ? '' : 'Necesitamos tu permiso para responderte.',
  };
  form($('#contactForm'), rules, f => demoSent($('#contactSent')));

  // Ficha de propiedad
  const dlg = $('#dlg'), body = $('#dlgBody');
  const modal = dialog(dlg, { onClose: () => route.clear() });
  const open = id => {
    const p = byId[id]; if (!p) return;
    const pics = [p.img, ...p.gallery];
    let i = 0;
    body.innerHTML = `
      <div class="d-wrap">
        <div class="d-gal">
          <div class="d-main" id="dMain">${img(pics[0], p.alt, '(max-width: 860px) 100vw, 60vw')}</div>
          <button class="d-nav d-prev" type="button" aria-label="Foto anterior">←</button>
          <button class="d-nav d-next" type="button" aria-label="Foto siguiente">→</button>
          <div class="d-thumbs" role="group" aria-label="Fotos de ${esc(p.name)}">${pics.map((n, k) => `<button type="button" data-i="${k}" aria-label="Foto ${k + 1} de ${pics.length}" aria-current="${k === 0}">${img(n, '', '84px')}</button>`).join('')}</div>
        </div>
        <div class="d-info">
          <p class="d-zone">${esc(p.zone)} · ${esc(p.area)} · ${esc(p.type)}</p>
          <h2 id="d-title">${esc(p.name)}</h2>
          <p class="d-price">${eur(p.price)} <span class="dk-demo-note">· precio de demostración</span></p>
          <div class="d-facts"><div><b>${p.beds}</b>dorm.</div><div><b>${p.baths}</b>baños</div><div><b>${p.m2.toLocaleString('es-ES')}</b>m² const.</div><div><b>${p.plot ? p.plot.toLocaleString('es-ES') : p.terrace}</b>${p.plot ? 'm² parcela' : 'm² terraza'}</div></div>
          <p>${esc(p.desc)}</p>
          <ul class="d-feats">${p.feats.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
          <form class="ae-form d-form" id="dForm" novalidate>
            <h3>Solicitar información</h3>
            <div class="ae-row">
              <div class="ae-f"><label for="d-name">Nombre</label><input id="d-name" name="name" autocomplete="name" aria-describedby="d-name-e"><p class="ae-err" id="d-name-e" data-err="name" hidden></p></div>
              <div class="ae-f"><label for="d-email">Email</label><input id="d-email" name="email" type="email" autocomplete="email" aria-describedby="d-email-e"><p class="ae-err" id="d-email-e" data-err="email" hidden></p></div>
            </div>
            <div class="ae-f"><label for="d-msg">Mensaje</label><textarea id="d-msg" name="msg" rows="3" aria-describedby="d-msg-e">Me interesa ${esc(p.name)} (${esc(p.zone)}). ¿Podemos concertar una visita?</textarea><p class="ae-err" id="d-msg-e" data-err="msg" hidden></p></div>
            <label class="ae-chk"><input type="checkbox" name="ok" aria-describedby="d-ok-e"> Acepto que me contactéis sobre esta propiedad.</label>
            <p class="ae-err" id="d-ok-e" data-err="ok" hidden></p>
            <button class="ae-btn" type="submit">Pedir visita</button>
            <div class="ae-sent" id="dSent" role="status" hidden></div>
          </form>
        </div>
      </div>`;
    const main = $('#dMain', body), thumbs = $$('.d-thumbs button', body);
    const show = k => {
      i = (k + pics.length) % pics.length;
      main.innerHTML = img(pics[i], i === 0 ? p.alt : `${p.name}, interior (foto ${i + 1})`, '(max-width: 860px) 100vw, 60vw');
      thumbs.forEach((t, j) => t.setAttribute('aria-current', String(j === i)));
    };
    thumbs.forEach(t => t.addEventListener('click', () => show(+t.dataset.i)));
    $('.d-prev', body).addEventListener('click', () => show(i - 1));
    $('.d-next', body).addEventListener('click', () => show(i + 1));
    dlg.onkeydown = e => { if (e.target.closest('input, textarea, select')) return; if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); };
    const { name, email, msg, ok } = rules;
    form($('#dForm', body), { name, email, msg, ok }, () => demoSent($('#dSent', body)));
    modal.open();
  };
  const route = router({ propiedad: open }, () => { if (modal.isOpen) modal.close(); });
})();
