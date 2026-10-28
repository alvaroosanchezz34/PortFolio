// Pruebas de la Function del formulario (functions/api/contact.js) sin red: se simula Resend.
// Uso: node tests/contact-api.mjs  (también lo ejecuta npm test)
import { onRequest } from '../functions/api/contact.js';

const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push(['✓', name]); } catch (e) { results.push(['✗', name, e.message]); }
};
const eq = (a, b, msg) => { if (a !== b) throw new Error(`${msg}: esperaba ${JSON.stringify(b)} y obtuve ${JSON.stringify(a)}`); };

const HOST = 'https://kodikadigital.com';
const valid = { name: 'Lucía Pérez', contact: 'lucia@ejemplo.com', type: 'web', msg: 'Tengo una peluquería y quiero una web.', privacy: true, website: '', t: 9000, page: '/contacto/' };

let calls = [], upstreamOk = true;
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body), auth: init.headers.Authorization });
  return new Response('{}', { status: upstreamOk ? 200 : 500 });
};
const call = async (body, { env = { RESEND_API_KEY: 'k' }, method = 'POST', origin = HOST, raw } = {}) => {
  calls = [];
  const waits = [];
  const request = new Request(HOST + '/api/contact', {
    method, headers: { 'Content-Type': 'application/json', ...(origin ? { Origin: origin } : {}) },
    ...(method === 'POST' ? { body: raw ?? JSON.stringify(body) } : {}),
  });
  const r = await onRequest({ request, env, waitUntil: p => waits.push(p) });
  await Promise.all(waits);
  return { status: r.status, json: await r.json().catch(() => null) };
};

await test('Envía el mensaje al buzón, con responder-a al cliente', async () => {
  const r = await call(valid);
  eq(r.status, 200, 'Estado'); eq(r.json.ok, true, 'ok');
  eq(calls.length, 1, 'Sin dominio propio no hay respuesta automática');
  eq(calls[0].url, 'https://api.resend.com/emails', 'URL de Resend');
  eq(calls[0].auth, 'Bearer k', 'Clave');
  eq(calls[0].body.to[0], 'alvarosanchezortega34@gmail.com', 'Destinatario por defecto');
  eq(calls[0].body.reply_to, 'lucia@ejemplo.com', 'Responder a');
  eq(calls[0].body.from, 'Web de Kódika <onboarding@resend.dev>', 'Remitente de pruebas');
  if (!calls[0].body.subject.includes('Una web para mi negocio')) throw new Error('Asunto sin el tipo');
});
await test('Con dominio propio: respuesta automática al cliente', async () => {
  const r = await call(valid, { env: { RESEND_API_KEY: 'k', CONTACT_FROM: 'Kódika <hola@kodikadigital.com>', CONTACT_TO: 'buzon@kodikadigital.com' } });
  eq(r.status, 200, 'Estado'); eq(calls.length, 2, 'Dos correos');
  eq(calls[0].body.to[0], 'buzon@kodikadigital.com', 'Destinatario configurado');
  eq(calls[1].body.to[0], 'lucia@ejemplo.com', 'Acuse al cliente');
  eq(calls[1].body.reply_to, 'buzon@kodikadigital.com', 'El acuse se responde al buzón');
});
await test('Con teléfono: enlace de WhatsApp y sin acuse', async () => {
  const r = await call({ ...valid, contact: '600 123 456' }, { env: { RESEND_API_KEY: 'k', CONTACT_FROM: 'Kódika <hola@kodikadigital.com>' } });
  eq(r.status, 200, 'Estado'); eq(calls.length, 1, 'Un correo');
  eq(calls[0].body.reply_to, undefined, 'Sin responder-a');
  if (!calls[0].body.text.includes('https://wa.me/34600123456')) throw new Error('Falta el enlace de WhatsApp');
});
await test('Escapa el HTML del mensaje', async () => {
  await call({ ...valid, msg: '<script>alert(1)</script> quiero una web' });
  if (calls[0].body.html.includes('<script>')) throw new Error('HTML sin escapar');
});
await test('Antispam: campo trampa o envío instantáneo → ok sin enviar', async () => {
  let r = await call({ ...valid, website: 'http://spam' }); eq(r.json.ok, true, 'ok'); eq(calls.length, 0, 'No envía');
  r = await call({ ...valid, t: 200 }); eq(r.json.ok, true, 'ok'); eq(calls.length, 0, 'No envía');
  r = await call({ ...valid, t: undefined }); eq(calls.length, 0, 'Sin tiempo no envía');
});
await test('Valida los campos', async () => {
  const r = await call({ ...valid, name: 'L', contact: 'malo', type: 'x', msg: 'corto', privacy: false });
  eq(r.status, 422, 'Estado'); eq(r.json.fields.join(), 'name,contact,type,msg,privacy', 'Campos'); eq(calls.length, 0, 'No envía');
});
await test('Sin clave: 503 para que el formulario ofrezca WhatsApp o email', async () => {
  const r = await call(valid, { env: {} }); eq(r.status, 503, 'Estado'); eq(r.json.error, 'not_configured', 'Error');
});
await test('Si Resend falla: 502', async () => {
  upstreamOk = false; const r = await call(valid); upstreamOk = true;
  eq(r.status, 502, 'Estado');
});
await test('Rechaza otros orígenes, JSON roto, cuerpos enormes y GET', async () => {
  eq((await call(valid, { origin: 'https://otra-web.com' })).status, 403, 'Origen');
  eq((await call(null, { raw: '{roto' })).status, 400, 'JSON');
  eq((await call(null, { raw: JSON.stringify({ ...valid, msg: 'x'.repeat(20000) }) })).status, 413, 'Tamaño');
  eq((await call(null, { method: 'GET' })).status, 405, 'GET');
});

for (const [s, n, e] of results) console.log(`${s}  ${n}${e ? `\n     ${e}` : ''}`);
const failed = results.filter(r => r[0] === '✗').length;
console.log(`\n${results.length - failed}/${results.length} pruebas de /api/contact superadas`);
process.exit(failed ? 1 : 0);
