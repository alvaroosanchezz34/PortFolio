// Pruebas end-to-end de la web y de las seis demos (Playwright).
// Requisitos: un servidor con la web (npx vercel dev --listen 8788) y Playwright
// disponible (npm i -D playwright, o NODE_PATH apuntando a una instalación global).
// Uso: BASE=http://localhost:8788 node tests/e2e.mjs
const BASE = process.env.BASE || 'http://localhost:8788';
import { createRequire } from 'node:module';
let chromium;
try { ({ chromium } = await import('playwright')); } catch {
  try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch { // admite NODE_PATH
    console.error('Falta Playwright. Instálalo con: npm i -D playwright'); process.exit(2);
  }
}

const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push(['✓', name]); } catch (e) { results.push(['✗', name, e.message.split('\n').slice(0, 6).join(' ⏎ ')]); }
};
const eq = (a, b, msg) => { if (a !== b) throw new Error(`${msg}: esperaba ${JSON.stringify(b)} y obtuve ${JSON.stringify(a)}`); };
const ok = (v, msg) => { if (!v) throw new Error(msg); };

const browser = await chromium.launch();
const newPage = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'es-ES', ...opts });
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', e => page.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/status of 404/.test(m.text())) page.errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/api/preview') && !r.url().includes('/_vercel/') && !r.url().includes('no-existe')) page.errors.push(`${r.status()} ${r.url()}`); });
  return page;
};
const visible = (p, sel) => p.locator(sel).filter({ visible: true }).count();
const noErrors = p => eq(p.errors.join(' | '), '', 'Errores en la consola o la red');

/* ---------- Sitio principal ---------- */
await test('Home: formulario valida, prepara el mensaje y el configurador lo rellena', async () => {
  const p = await newPage();
  await p.goto(BASE + '/');
  await p.locator('#contacto button[value="wa"]').click();
  ok(await p.locator('#contacto [aria-invalid="true"]').count() >= 4, 'Faltan errores al enviar vacío');
  await p.locator('#opts label').nth(1).click();
  await p.waitForFunction(() => document.querySelector('#num').textContent === '450–850 €', null, { timeout: 3000 }).catch(() => {});
  eq(await p.textContent('#num'), '450–850 €', 'Estimación del configurador');
  await p.click('#calcForm');
  eq(await p.inputValue('#cf-type'), 'reservas', 'Tipo prellenado desde el configurador');
  ok((await p.inputValue('#cf-msg')).includes('Reservas o pedidos'), 'Mensaje prellenado');
  await p.fill('#cf-name', 'Prueba'); await p.fill('#cf-contact', 'correo-malo');
  await p.locator('#contacto button[value="email"]').click();
  ok((await p.textContent('#cf-contact-err')).includes('email válido'), 'Error de email');
  await p.fill('#cf-contact', 'prueba@ejemplo.com'); await p.check('#contacto input[name="privacy"]');
  await p.evaluate(() => { window.__href = null; Object.defineProperty(window, 'open', { value: () => ({}) }); });
  await p.locator('#contacto button[value="wa"]').click();
  ok((await p.textContent('#contacto .form-status')).includes('solo falta que pulses enviar'), 'Estado honesto tras preparar el mensaje');
  noErrors(p);
});
await test('Contacto: ?demo= prellena el mensaje', async () => {
  const p = await newPage();
  await p.goto(BASE + '/contacto/?demo=noir-atelier');
  ok((await p.inputValue('#cf-msg')).includes('Noir Atelier'), 'Mensaje con la demo');
  noErrors(p);
});
await test('Menú móvil: abre, atrapa el foco y se cierra con Escape', async () => {
  const p = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + '/sobre-kodika/');
  await p.click('#menuBtn');
  ok(await p.locator('#menu').isVisible(), 'Menú visible');
  eq(await p.getAttribute('#menuBtn', 'aria-expanded'), 'true', 'aria-expanded');
  await p.keyboard.press('Escape');
  ok(!(await p.locator('#menu').isVisible()), 'Menú cerrado');
  noErrors(p);
});
await test('404 real y sin rastro de los proyectos retirados', async () => {
  const p = await newPage();
  const r = await p.goto(BASE + '/proyectos/resumeai/');
  eq(r.status(), 404, 'Estado de /proyectos/resumeai/');
  const home = await (await p.goto(BASE + '/')).text();
  ok(!/resumeai|workly/i.test(home), 'La home menciona proyectos retirados');
});

/* ---------- Aurea Estates ---------- */
await test('Aurea: filtros, estado vacío, ficha con galería y formularios', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/aurea-estates/');
  await p.selectOption('#filters select[name="zone"]', 'Ibiza');
  eq(await visible(p, '.pc'), 2, 'Propiedades en Ibiza');
  await p.selectOption('#filters select[name="max"]', '2000000');
  ok(await p.locator('#empty').isVisible(), 'Estado vacío visible');
  await p.click('#emptyReset');
  await p.waitForFunction(() => document.querySelectorAll('.pc:not([hidden])').length === 9, null, { timeout: 3000 }).catch(() => {});
  eq(await visible(p, '.pc'), 9, 'Todas tras limpiar');
  await p.selectOption('#heroSearch select[name="zone"]', 'Marbella');
  await p.click('#heroSearch button');
  eq(await visible(p, '.pc'), 3, 'Búsqueda del hero');
  await p.locator('.pc:not([hidden]) a').first().click();
  await p.locator('#dlg').waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
  ok(await p.locator('#dlg').isVisible(), 'Ficha abierta');
  const src0 = await p.getAttribute('#dMain img', 'src');
  await p.locator('.d-next').click();
  ok(src0 !== await p.getAttribute('#dMain img', 'src'), 'La galería cambia de foto');
  await p.locator('#dForm button[type="submit"]').click();
  ok(await p.locator('#dForm [aria-invalid="true"]').count() >= 2, 'Errores en la ficha');
  await p.fill('#d-name', 'Ana'); await p.fill('#d-email', 'ana@ejemplo.com'); await p.check('#dForm input[name="ok"]');
  await p.locator('#dForm button[type="submit"]').click();
  ok((await p.textContent('#dSent')).includes('no se han enviado'), 'Aviso honesto de demo');
  await p.keyboard.press('Escape');
  ok(!(await p.locator('#dlg').isVisible()), 'Ficha cerrada con Escape');
  await p.waitForFunction(() => location.hash === '', null, { timeout: 2000 }).catch(() => {});
  eq(await p.evaluate(() => location.hash), '', 'Hash limpio al cerrar');
  noErrors(p);
});

/* ---------- Noir Atelier ---------- */
await test('Noir: categorías, talla obligatoria, bolsa persistente y pago desactivado', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/noir-atelier/');
  await p.click('.na-cats button[data-cat="Calzado"]');
  eq(await visible(p, '.np'), 1, 'Productos de calzado');
  await p.click('.na-cats button[data-cat=""]');
  await p.goto(BASE + '/demos/noir-atelier/#/producto/biker-cuero');
  ok(await p.locator('#pdlg').isVisible(), 'Ficha por URL');
  ok(await p.locator('input[name="size"][value="M"]').isDisabled(), 'Talla agotada desactivada');
  await p.locator('#pForm button[type="submit"]').click();
  ok(await p.locator('#pSizeErr').isVisible(), 'Pide talla');
  await p.locator('label:has(input[name="size"][value="L"])').click();
  await p.locator('#qPlus').click();
  await p.locator('#pForm button[type="submit"]').click();
  eq(await p.textContent('#bagN'), '2', 'Unidades en la bolsa');
  await p.reload();
  eq(await p.textContent('#bagN'), '2', 'La bolsa se recuerda');
  await p.keyboard.press('Escape');
  await p.click('#bagBtn');
  ok((await p.textContent('#bagBody')).includes('780'), 'Subtotal 2 × 390 €');
  await p.click('#checkout');
  ok((await p.textContent('#checkoutMsg')).includes('no se procesan pagos'), 'Pago desactivado');
  await p.click('[data-rm="0"]');
  ok((await p.textContent('#bagBody')).includes('vacía'), 'Bolsa vacía');
  noErrors(p);
});

/* ---------- Sora Wellness ---------- */
await test('Sora: filtro, reserva en cuatro pasos y aviso de demo', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/sora-wellness/');
  await p.click('.sw-tabs button[data-cat="Corporal"]');
  eq(await visible(p, '.sw-t'), 2, 'Tratamientos corporales');
  await p.click('[data-book="masaje-relajante"]');
  ok(await p.locator('input[name="trt"][value="masaje-relajante"]').isChecked(), 'Tratamiento preseleccionado');
  ok(!(await p.locator('#st2').isDisabled()), 'Paso 2 activo');
  await p.locator('.sw-day:has(input:not([disabled]))').first().click();
  ok(await p.locator('.sw-slot').count() > 0, 'Hay horas');
  await p.locator('.sw-slot:has(input:not([disabled]))').first().click();
  await p.locator('#st4 button[type="submit"]').click();
  ok(await p.locator('#bookForm [aria-invalid="true"]').count() >= 2, 'Errores en datos');
  await p.fill('#b-name', 'Laura'); await p.fill('#b-contact', '600 123 456'); await p.check('#st4 input[name="ok"]');
  await p.locator('#st4 button[type="submit"]').click();
  ok((await p.textContent('#bookDone')).includes('No se ha reservado nada'), 'Aviso de demo');
  noErrors(p);
});

/* ---------- Forge Fitness ---------- */
await test('Forge: horario filtrable, tarifas trimestrales y plan en el formulario', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/forge-fitness/');
  await p.click('.ff-filter button[data-p="hiit"]');
  ok(await p.locator('.ff-c[data-p="fuerza"]').first().isHidden(), 'Fuerza oculta');
  await p.check('input[name="period"][value="q"]', { force: true });
  ok((await p.textContent('.ff-plan[data-plan="pro"] [data-m]')).includes('71'), 'Precio trimestral del plan Pro');
  await p.click('[data-pick="personal"]');
  eq(await p.inputValue('#t-plan'), 'personal', 'Plan en el formulario');
  await p.locator('#trialForm button[type="submit"]').click();
  ok(await p.locator('#trialForm [aria-invalid="true"]').count() >= 3, 'Errores');
  await p.fill('#t-name', 'Dani'); await p.fill('#t-contact', 'dani@ejemplo.com'); await p.selectOption('#t-when', 'Tarde'); await p.check('#trialForm input[name="ok"]');
  await p.locator('#trialForm button[type="submit"]').click();
  ok((await p.textContent('#trialDone')).includes('no se ha enviado nada'), 'Aviso de demo');
  noErrors(p);
});
await test('Forge móvil: pestañas de día', async () => {
  const p = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + '/demos/forge-fitness/');
  await p.click('.ff-daytabs button[data-day="5"]');
  ok(await p.locator('#day-5').isVisible(), 'Sábado visible');
  ok(await p.locator('#day-0').isHidden(), 'Lunes oculto');
  noErrors(p);
});

/* ---------- Veloce Automotive ---------- */
await test('Veloce: filtros con rango, ficha, cuota y solicitud', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/veloce-automotive/');
  await p.selectOption('#filters select[name="make"]', 'BMW');
  eq(await visible(p, '.vc'), 2, 'Coches BMW');
  await p.selectOption('#filters select[name="make"]', '');
  await p.locator('#filters input[name="max"]').fill('50000');
  eq(await visible(p, '.vc'), 1, 'Hasta 50.000 €');
  await p.locator('#filters input[name="max"]').fill('40000');
  ok(await p.locator('#empty').isVisible(), 'Estado vacío');
  await p.click('#emptyReset');
  await p.locator('.vc a').first().click();
  const q1 = await p.textContent('#quota');
  await p.selectOption('#months', '24');
  ok(q1 !== await p.textContent('#quota'), 'La cuota cambia con el plazo');
  await p.fill('#v-name', 'Leo'); await p.fill('#v-contact', '+34 600 000 000'); await p.selectOption('#v-type', 'Una prueba de conducción'); await p.check('#vForm input[name="ok"]');
  await p.locator('#vForm button[type="submit"]').click();
  ok((await p.textContent('#vDone')).includes('no se han enviado'), 'Aviso de demo');
  noErrors(p);
});

/* ---------- Flowbook ---------- */
await test('Flowbook: alta con control de solapes, estados, búsqueda y persistencia', async () => {
  const p = await newPage();
  await p.goto(BASE + '/demos/flowbook/app/');
  await p.click('#reset'); await p.click('#reset');
  const week0 = +(await p.textContent('#kWeek'));
  // Hueco ocupado (el miércoles a las 09:00 hay una cita de 90 min): debe avisar del solape
  const wed = await p.locator('.fa-slot').nth(2 * 22).getAttribute('data-new');
  await p.click('#newBtn');
  await p.fill('#n-client', 'Prueba E2E'); await p.selectOption('#n-service', 'Consulta');
  await p.fill('#n-date', wed.split('|')[0]); await p.fill('#n-time', '09:30');
  await p.locator('#newForm button[type="submit"]').click();
  ok((await p.textContent('#n-time-e')).includes('Se solapa'), 'Detecta el solape');
  await p.fill('#n-time', '14:00');
  await p.locator('#newForm button[type="submit"]').click();
  eq(+(await p.textContent('#kWeek')), week0 + 1, 'La cita cuenta en la semana');
  await p.locator('.fa-ap', { hasText: 'Prueba E2E' }).click();
  await p.click('[data-st="confirmed"]');
  ok((await p.textContent('#det')).includes('Confirmada'), 'Estado cambiado');
  await p.keyboard.press('Escape');
  await p.click('[data-view="citas"]');
  await p.fill('#q', 'prueba e2e');
  eq(await p.locator('#rows tr').count(), 1, 'Búsqueda');
  await p.reload();
  await p.click('[data-view="citas"]'); await p.fill('#q', 'prueba e2e');
  eq(await p.locator('#rows tr').count(), 1, 'Persistencia tras recargar');
  noErrors(p);
});
await test('Flowbook móvil: vista de día', async () => {
  const p = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + '/demos/flowbook/app/');
  ok(await p.locator('#dayTabs button').count() === 7, 'Siete pestañas de día');
  ok(await p.locator('.fa-list').isVisible(), 'Lista del día');
  noErrors(p);
});

await browser.close();
for (const r of results) console.log(r.join('  '));
const failed = results.filter(r => r[0] === '✗').length;
console.log(`\n${results.length - failed}/${results.length} pruebas superadas`);
process.exit(failed ? 1 : 0);
