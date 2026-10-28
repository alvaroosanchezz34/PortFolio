# kodikadigital.com

Web de **Kódika**, estudio de diseño y desarrollo digital en Málaga fundado por Álvaro Sánchez. HTML estático publicado con **Cloudflare Pages** desde la raíz del repositorio, más dos Pages Functions: `functions/api/contact.js` (envío del formulario de contacto por email) y `functions/api/preview.js` (generador de ideas con IA de la portada).

El dominio previsto es `https://kodikadigital.com` (aún no está en producción). No hay framework ni dependencias de npm: un pequeño generador en Node convierte módulos de contenido en HTML, y ese HTML generado se versiona.

## Estructura

| Ruta | Qué es |
|---|---|
| `scripts/pages/*.mjs` | **Contenido de todas las páginas**: portada (`home.mjs`), servicios, índice de demos, blog, sobre Kódika, contacto, privacidad y 404. |
| `scripts/pages/demos/*.mjs` | Las seis demos (datos + marcado). `flowbook.mjs` exporta dos páginas: la landing y el panel. |
| `scripts/lib/` | Plantilla del sitio (`layout.mjs`), plantilla de las demos (`demo.mjs`) y datos y componentes compartidos (`site.mjs`: servicios, demos, formulario, schema…). |
| `scripts/data/images.json` | Dimensiones de las fotos, para `width`/`height` y `srcset`. |
| `index.html`, `*/index.html`, `404.html`, `sitemap.xml` | **Generados**: no los edites a mano. |
| `assets/css`, `assets/js` | Estilos y JS del sitio (`site.*` común; `home.*`; `contact.js` formulario; `track.js` eventos de conversión). |
| `assets/img/kodika.svg`, `assets/img/logo.svg` | Logotipo de la cabecera y el pie, y favicon SVG. |
| `assets/brand/` | Ficheros de marca: logotipo (claro, oscuro, con lema), símbolo, icono y foto de perfil. Guía en `docs/marca/identidad.md`. |
| `assets/demos/kit.*` | Kit común de las demos: barra «Demo ficticia», cierre comercial, validación, diálogos, router por hash y almacenamiento local. |
| `assets/demos/<slug>/` | CSS, JS, fuentes y fotos propias de cada demo. |
| `assets/og/` | Imágenes para compartir (1200×630). |
| `robots.txt`, `_headers`, `_redirects` | Rastreo, cabeceras y redirecciones de Cloudflare Pages. `_redirects` impide abrir `docs/`, `scripts/`, `tests/` y este README desde la web, y redirige `/sobre-mi/` a `/sobre-kodika/`. |
| `tests/e2e.mjs`, `tests/contact-api.mjs` | Pruebas end-to-end con Playwright (formularios, menú, 404 y las seis demos) y pruebas de la Function del formulario. |
| `docs/` | Guía de identidad (`docs/marca/`), estrategia y entrega del rediseño anterior (`docs/rediseno/`) y documentación SEO histórica (`docs/seo/`). |

## Demos

| Ruta | Sector | Qué se puede probar |
|---|---|---|
| `/demos/aurea-estates/` | Inmobiliaria de lujo | Buscador y filtros, orden, ficha con galería, formulario de visita |
| `/demos/noir-atelier/` | Moda | Catálogo filtrable, colores y tallas, bolsa persistente (pago desactivado) |
| `/demos/sora-wellness/` | Estética y bienestar | Reserva en cuatro pasos con días y horas libres |
| `/demos/forge-fitness/` | Gimnasio | Horario filtrable, tarifas mensual/trimestral, clase de prueba |
| `/demos/veloce-automotive/` | Concesionario | Stock con filtros y rango de precio, ficha técnica, calculadora de cuota |
| `/demos/flowbook/` y `/app/` | SaaS de reservas | Landing y panel de citas: alta con control de solapes, estados, búsqueda, métricas |

Todas son negocios **ficticios**, lo dicen en pantalla y llevan `noindex`. Sus formularios validan pero no envían nada. La bolsa de Noir y las citas de Flowbook se guardan solo en `localStorage`.

## Comandos (Node 18 o superior)

```bash
npm run build   # genera todas las páginas y el sitemap (y borra las que ya no existen)
npm run check   # valida titles, H1, canonical, OG, JSON-LD, enlaces, sitemap, robots y términos retirados
npm test        # build + check + pruebas de /api/contact
```

Para ver la web con el comportamiento real de Cloudflare Pages (404, `_headers`, `_redirects`, la Function):

```bash
npx wrangler pages dev . --port 8788
```

## Formulario de contacto

«Enviar mensaje» manda el formulario a `/api/contact`, que lo reenvía por email con [Resend](https://resend.com) (plan gratuito: 3.000 correos al mes). Lleva antispam sin captcha (campo trampa y tiempo mínimo de relleno) y solo acepta peticiones de la propia web. Si el envío falla o falta la configuración, el formulario no pierde el mensaje: ofrece enviarlo por WhatsApp o por email ya escrito. «Prefiero WhatsApp» abre WhatsApp directamente.

Variables en Cloudflare Pages (Settings → Variables and secrets, en *Production*; en local, en `.dev.vars`):

| Variable | Obligatoria | Qué es |
|---|---|---|
| `RESEND_API_KEY` | Sí (como secreto) | Clave de la API de Resend |
| `CONTACT_TO` | No | Dónde llegan los mensajes. Por defecto, `alvarosanchezortega34@gmail.com` |
| `CONTACT_FROM` | No | Remitente con tu dominio verificado en Resend, p. ej. `Kódika <hola@kodikadigital.com>`. Activa la respuesta automática al cliente |

Puesta en marcha:
1. Crea una cuenta en Resend **con el email donde quieres recibir los mensajes** y genera una API key (permiso *Sending access*).
2. Añade `RESEND_API_KEY` en Cloudflare Pages y vuelve a desplegar. Ya funciona: sin dominio verificado, Resend envía desde `onboarding@resend.dev`, que solo puede escribir al email de tu cuenta de Resend.
3. Cuando `kodikadigital.com` esté en producción, verifica el dominio en Resend (Domains → añade los registros DNS que indica) y añade `CONTACT_FROM`. Desde ese momento el cliente que deje un email recibe un acuse de recibo, y los mensajes salen desde tu dominio.

Las pruebas de la Function no necesitan red: `node tests/contact-api.mjs` (incluido en `npm test`).

## IA de la portada

El generador con IA necesita la variable `OPENAI_API_KEY` (en local, en un fichero `.dev.vars`; en producción, en el panel de Cloudflare Pages). Sin ella, el resto de la web funciona igual.

Pruebas end-to-end (con el servidor anterior en marcha y Playwright instalado, por ejemplo con `npm i -D playwright && npx playwright install chromium`):

```bash
BASE=http://localhost:8788 npm run e2e
```

## Añadir o cambiar una página

1. Crea o edita un módulo en `scripts/pages/` (copia uno parecido).
2. `npm test` y revisa que no haya errores.
3. Haz commit del módulo **y** de los HTML generados.

Si cambias CSS o JS de forma que el navegador deba recargarlo, sube `ASSET_V` en `scripts/lib/site.mjs`.
