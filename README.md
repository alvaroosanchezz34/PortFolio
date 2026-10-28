# kodikadigital.com

Web de **Kódika**, estudio de diseño y desarrollo digital en Málaga fundado por Álvaro Sánchez. HTML estático publicado con **Cloudflare Pages** desde la raíz del repositorio, más una Pages Function (`functions/api/preview.js`) para el generador de ideas con IA de la portada.

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
| `assets/img/logo.svg` | Marca de Kódika (monograma). También se usa como favicon SVG. |
| `assets/demos/kit.*` | Kit común de las demos: barra «Demo ficticia», cierre comercial, validación, diálogos, router por hash y almacenamiento local. |
| `assets/demos/<slug>/` | CSS, JS, fuentes y fotos propias de cada demo. |
| `assets/og/` | Imágenes para compartir (1200×630). |
| `robots.txt`, `_headers`, `_redirects` | Rastreo, cabeceras y redirecciones de Cloudflare Pages. `_redirects` impide abrir `docs/`, `scripts/`, `tests/` y este README desde la web, y redirige `/sobre-mi/` a `/sobre-kodika/`. |
| `tests/e2e.mjs` | Pruebas end-to-end con Playwright (formularios, menú, 404 y las seis demos). |
| `docs/` | Estrategia y entrega del rediseño anterior (`docs/rediseno/`) y documentación SEO histórica (`docs/seo/`). |

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
npm test        # build + check
```

Para ver la web con el comportamiento real de Cloudflare Pages (404, `_headers`, `_redirects`, la Function):

```bash
npx wrangler pages dev . --port 8788
```

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
