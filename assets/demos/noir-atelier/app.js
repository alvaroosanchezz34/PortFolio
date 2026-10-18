// Noir Atelier · catálogo, fichas con variantes y bolsa de compra (sin pagos reales).
(() => {
  const { $, $$, data, eur, esc, announce, dialog, router, store } = window.Demo;
  const P = data.products, dims = data.dims, byId = Object.fromEntries(P.map(p => [p.id, p]));
  const FREE = 150, SHIP = 6;
  const img = (name, alt, sizes) => {
    const [w, h] = dims[name] || [1600, 2000], b = `/assets/demos/noir-atelier/img/${name}`;
    return `<img src="${b}-800.webp" srcset="${b}-800.webp 800w, ${b}-1600.webp 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" decoding="async">`;
  };

  /* ---------- Filtros ---------- */
  const grid = $('#grid'), count = $('#count'), empty = $('#empty');
  const cards = Object.fromEntries($$('.np', grid).map(c => [c.dataset.id, c]));
  const order = P.map(p => p.id);
  let cat = '';
  const apply = () => {
    const g = $('#gender').value, sort = $('#sort').value;
    let list = P.filter(p => (!cat || p.cat === cat) && (!g || p.g === g || (g !== 'Unisex' && p.g === 'Unisex')));
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || order.indexOf(a.id) - order.indexOf(b.id));
    const ids = new Set(list.map(p => p.id));
    P.forEach(p => { cards[p.id].hidden = !ids.has(p.id); });
    list.forEach(p => grid.appendChild(cards[p.id]));
    count.textContent = list.length === 1 ? '1 pieza' : `${list.length} piezas`;
    empty.hidden = list.length > 0;
    announce(list.length ? `${count.textContent} en la colección` : 'No hay piezas con esa combinación');
  };
  $$('.na-cats button').forEach(b => b.addEventListener('click', () => {
    cat = b.dataset.cat;
    $$('.na-cats button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    apply();
  }));
  $('#gender').addEventListener('change', apply);
  $('#sort').addEventListener('change', apply);
  $('#emptyReset').addEventListener('click', () => { $('#gender').value = ''; $$('.na-cats button')[0].click(); });

  /* ---------- Bolsa ---------- */
  const bagStore = store('noir-bag', []);
  let bag = bagStore.get().filter(i => byId[i.id]);
  const bagN = $('#bagN'), bagBody = $('#bagBody');
  const total = () => bag.reduce((s, i) => s + byId[i.id].price * i.qty, 0);
  const units = () => bag.reduce((s, i) => s + i.qty, 0);
  const save = () => { bagStore.set(bag); bagN.textContent = units(); };
  const renderBag = (notice = '') => {
    if (!bag.length) {
      bagBody.innerHTML = `<div class="b-empty"><p>Tu bolsa está vacía.</p><button class="na-btn ghost" type="button" data-close>Seguir viendo la colección</button></div>`;
      return;
    }
    const sub = total(), ship = sub >= FREE ? 0 : SHIP;
    bagBody.innerHTML = `
      <ul class="b-list">${bag.map((i, k) => {
        const p = byId[i.id];
        return `<li class="b-item">${img(p.img, '', '76px')}<div><h3>${esc(p.name)}</h3><p>${esc(i.color)} · Talla ${esc(i.size)}</p>
          <div class="b-ctrl"><button type="button" data-dec="${k}" aria-label="Quitar una unidad de ${esc(p.name)}">−</button><span aria-label="Cantidad">${i.qty}</span><button type="button" data-inc="${k}" aria-label="Añadir una unidad de ${esc(p.name)}">+</button><button type="button" class="b-rm" data-rm="${k}">Eliminar</button></div></div>
          <b>${eur(p.price * i.qty)}</b></li>`;
      }).join('')}</ul>
      <div class="b-foot">
        <p class="b-ship">${ship ? `Te faltan ${eur(FREE - sub)} para el envío gratis.` : 'Tienes el envío gratis.'}</p>
        <div class="b-bar" aria-hidden="true"><i style="width:${Math.min(100, sub / FREE * 100)}%"></i></div>
        <div class="b-row"><span>Subtotal</span><span>${eur(sub)}</span></div>
        <div class="b-row"><span>Envío</span><span>${ship ? eur(ship) : 'Gratis'}</span></div>
        <div class="b-row t"><span>Total</span><span>${eur(sub + ship)}</span></div>
        <button class="na-btn" type="button" id="checkout">Finalizar compra</button>
        <p class="b-demo" id="checkoutMsg" role="status" ${notice ? '' : 'hidden'}>${notice}</p>
      </div>`;
  };
  const bagDlg = dialog($('#bag'));
  const openBag = from => { renderBag(); bagDlg.open(from); };
  $('#bagBtn').addEventListener('click', e => openBag(e.currentTarget));
  bagBody.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.inc) bag[+t.dataset.inc].qty = Math.min(9, bag[+t.dataset.inc].qty + 1);
    else if (t.dataset.dec) { const k = +t.dataset.dec; bag[k].qty -= 1; if (!bag[k].qty) bag.splice(k, 1); }
    else if (t.dataset.rm) { const p = byId[bag[+t.dataset.rm].id]; bag.splice(+t.dataset.rm, 1); announce(`${p.name} eliminado de la bolsa`); }
    else if (t.id === 'checkout') {
      renderBag('Esto es una demo: no se procesan pagos ni se piden datos de tarjeta. En tu tienda real, aquí empezaría el pago seguro con tu pasarela (por ejemplo, Stripe).');
      $('#checkoutMsg').focus?.(); return;
    } else return;
    save(); renderBag();
    const again = $('[data-inc], [data-close]', bagBody); if (again && !bag.length) again.focus();
  });
  save();

  /* ---------- Ficha de producto ---------- */
  const pdlg = $('#pdlg'), pBody = $('#pBody');
  const modal = dialog(pdlg, { onClose: () => route.clear() });
  const open = id => {
    const p = byId[id]; if (!p) return;
    let qty = 1;
    pBody.innerHTML = `
      <div class="p-wrap">
        <div class="p-img">${img(p.img, p.alt, '(max-width: 820px) 100vw, 50vw')}</div>
        <form class="p-info" id="pForm" novalidate>
          <p class="p-cat">${esc(p.cat)} · ${esc(p.g)}</p>
          <h2 id="p-title">${esc(p.name)}</h2>
          <p class="p-price">${eur(p.price)}</p>
          <p>${esc(p.desc)}</p>
          <fieldset><legend>Color: <b id="pColorName">${esc(p.colors[0][0])}</b></legend>
            <div class="p-opts p-col">${p.colors.map((c, k) => `<label><input type="radio" name="color" value="${esc(c[0])}"${k ? '' : ' checked'}><span style="background:${c[1]}" title="${esc(c[0])}"></span><span class="dk-sr">${esc(c[0])}</span></label>`).join('')}</div>
          </fieldset>
          <fieldset aria-describedby="pSizeErr"><legend>Talla${p.out.length ? ' <b>(las tachadas están agotadas)</b>' : ''}</legend>
            <div class="p-opts p-size">${p.sizes.map(s => `<label><input type="radio" name="size" value="${esc(s)}"${p.out.includes(s) ? ' disabled' : ''}${p.sizes.length === 1 ? ' checked' : ''}><span>${esc(s)}${p.out.includes(s) ? '<span class="dk-sr"> (agotada)</span>' : ''}</span></label>`).join('')}</div>
            <p class="p-err" id="pSizeErr" hidden>Elige una talla para añadirla a la bolsa.</p>
          </fieldset>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
            <div class="p-qty" role="group" aria-label="Cantidad"><button type="button" id="qMinus" aria-label="Menos">−</button><output id="qOut" aria-live="polite">1</output><button type="button" id="qPlus" aria-label="Más">+</button></div>
            <button class="na-btn" type="submit">Añadir a la bolsa</button>
          </div>
          <p class="p-ok" id="pOk" role="status" hidden></p>
          <div class="p-det">
            <details><summary>Composición y cuidados</summary><p>${esc(p.comp)}. Lavar en frío o en seco según etiqueta.</p></details>
            <details><summary>Envíos y cambios</summary><p>Envío gratis a partir de ${FREE} € y 30 días para cambios. Condiciones de demostración.</p></details>
          </div>
        </form>
      </div>`;
    const f = $('#pForm', pBody), err = $('#pSizeErr', pBody), ok = $('#pOk', pBody);
    $$('input[name="color"]', f).forEach(r => r.addEventListener('change', () => { $('#pColorName', f).textContent = r.value; }));
    $$('input[name="size"]', f).forEach(r => r.addEventListener('change', () => { err.hidden = true; }));
    $('#qMinus', f).addEventListener('click', () => { qty = Math.max(1, qty - 1); $('#qOut', f).textContent = qty; });
    $('#qPlus', f).addEventListener('click', () => { qty = Math.min(9, qty + 1); $('#qOut', f).textContent = qty; });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const size = (f.querySelector('input[name="size"]:checked') || {}).value || '';
      if (!size) { err.hidden = false; const first = f.querySelector('input[name="size"]:not(:disabled)'); if (first) first.focus(); return; }
      const color = f.querySelector('input[name="color"]:checked').value;
      const same = bag.find(i => i.id === p.id && i.size === size && i.color === color);
      if (same) same.qty = Math.min(9, same.qty + qty); else bag.push({ id: p.id, size, color, qty });
      save();
      bagN.classList.remove('bump'); void bagN.offsetWidth; bagN.classList.add('bump');
      ok.hidden = false; ok.innerHTML = `Añadido a la bolsa: ${esc(p.name)}, talla ${esc(size)}. <a href="#" id="toBag">Ver la bolsa</a>`;
      $('#toBag', ok).addEventListener('click', ev => { ev.preventDefault(); modal.close(); setTimeout(() => openBag($('#bagBtn')), 50); });
      announce(`Añadido a la bolsa. Llevas ${units()} artículos.`);
    });
    modal.open();
  };
  const route = router({ producto: open }, () => { if (modal.isOpen) modal.close(); });
})();
