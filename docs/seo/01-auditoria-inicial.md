# Fase A · Auditoría SEO inicial de sanchezdevelop.com

Fecha de la auditoría: 16/10/2026. Estado auditado: commit `5bbf3cb` (rama `main`), que coincide con lo publicado en producción (la única diferencia es la ofuscación de emails que inyecta Cloudflare).

## 1. Inventario técnico

| Aspecto | Hallazgo |
|---|---|
| Framework | Ninguno. HTML estático escrito a mano: un único `index.html` (4.579 líneas, 132 KB) con CSS (≈3.400 líneas) y JS en línea. |
| Renderizado | Todo el contenido de texto está en el HTML inicial (bueno para Google). El JS solo anima, gestiona el carrusel, el configurador y la demo. |
| Contenido solo en navegador | La maqueta de la demo con IA (`/api/preview`) y el precio del configurador cuando se cambian las opciones. Nada crítico para SEO. |
| Hosting | Cloudflare Pages (cabecera `server: cloudflare`, carpeta `functions/` con la sintaxis de Pages Functions). Sin build: se publica la raíz del repositorio. |
| Función | `functions/api/preview.js` → `POST /api/preview` (OpenAI `gpt-4o-mini`; la clave está en una variable de entorno). |
| Dependencias | Ninguna en el repositorio. Externas en tiempo de ejecución: Google Fonts (Inter Tight), Lenis 1.1.13 (jsDelivr), imágenes en Cloudinary. |
| Tests / scripts / CI | No existen. No hay `package.json`. |
| Analítica | Cloudflare Web Analytics **ya está activo** (Cloudflare inyecta `static.cloudflareinsights.com/beacon.min.js`). No hay GA4, GTM ni otras etiquetas. |
| Search Console | No hay ningún indicio de verificación (no hay meta, ni fichero, ni registro TXT en el DNS). |

## 2. Rutas e indexabilidad (comprobado en producción con curl)

| URL | Respuesta | Problema |
|---|---|---|
| `https://sanchezdevelop.com/` | 200 | — |
| `http://sanchezdevelop.com/` | 301 → https | Correcto |
| `https://www.sanchezdevelop.com/` | **No resuelve** (no hay registro DNS para `www`) | Quien escriba `www.` ve un error; se pierden visitas y enlaces |
| `/index.html` | 308 → `/` | Correcto (comportamiento de Pages) |
| `/robots.txt` | **200 con la home en HTML** | No existe el fichero; Lighthouse detecta 4.033 «errores» de robots.txt |
| `/sitemap.xml` | **200 con la home en HTML** | No existe sitemap |
| `/cualquier-cosa-inventada` | **200 con la home** | *Soft 404* masivo: al no haber `404.html`, Pages actúa como SPA y sirve la home con 200 en cualquier ruta |
| `/api/preview` (GET) | 405 | Correcto, aunque conviene marcarlo con `noindex` |
| `<proyecto>.pages.dev` | Copia exacta del sitio | Contenido duplicado sin `noindex` ni canonical |

## 3. Metadatos y on-page (home)

- **Title**: «Webs a medida en Málaga — Álvaro Sánchez | sanchezdevelop.com» (62 car.). Es aceptable, pero repite el dominio y no incluye el término «desarrollador».
- **Meta description**: correcta y específica (176 caracteres; Google la corta hacia los 155-160).
- **Canonical**: no hay.
- **H1**: «Mucho más que una web.». Es un eslogan que no dice qué ofreces ni a quién. Hay un único H1 (bien), pero el texto descriptivo («Webs a medida») está en un `<p>`.
- **Encabezados**: jerarquía razonable (H2 por sección, H3 en tarjetas).
- **Open Graph**: hay `og:title`, `og:description` y `og:type`, pero faltan `og:image`, `og:url`, `og:locale` y `og:site_name`. Sin Twitter Card. Al compartir el enlace no sale ninguna imagen.
- **Favicon**: PNG en Cloudinary de **1,4 MB** (1254×1254). El logo del menú, de 26 px, pesa **68 KB**. No hay `apple-touch-icon` ni `favicon.ico` en la raíz.
- **Datos estructurados**: ninguno.
- **hreflang**: no aplica (solo hay versión en español). Correcto que no exista.
- **meta keywords**: no hay. Correcto.
- **Enlaces internos**: todos son anclas (`#seccion`) dentro de la misma página. No hay ninguna URL interna más que rastrear.
- **Enlaces externos**: ResumeAI y Workly con `rel="noopener"`. Correcto.

## 4. Arquitectura y contenido

- Es una **landing única**. Todos los servicios (webs, reservas, tiendas, apps, IA, mantenimiento) compiten dentro de una sola URL. Google no tiene una página específica que mostrar para «web con sistema de reservas», «aplicación web a medida» o «mantenimiento web».
- Los proyectos (ResumeAI, Workly) solo tienen una tarjeta con 2 líneas. No hay casos de estudio.
- No hay página «Sobre mí», ni contacto, ni blog, ni páginas legales (aviso legal / privacidad), y en España la LSSI exige identificar al titular.
- La demo con IA envía el nombre y el tipo de negocio a OpenAI y no hay ningún aviso de privacidad que lo explique.

### Afirmaciones que conviene revisar

| Texto | Valoración |
|---|---|
| «Tres de cada cuatro personas buscan un negocio en Google antes de ir» (fuente: «Think with Google y BrightLocal 2024–2026») | **No he podido verificarla.** La encuesta de BrightLocal habla de «usar internet para encontrar negocios locales» (≈90 % en 2019), no de «buscar en Google antes de ir». Además, la cita de la fuente es imprecisa. Recomiendo reformularla sin cifra. |
| Medidor «98 / 100 / 100 / 100» de PageSpeed | Está bien señalado como ejemplo en la nota 2. Se mantiene. |
| «Si no te convence, no pagas», «precio cerrado», «respondo el mismo día» | Son promesas comerciales del propio titular. Se mantienen; **confirma que puedes sostenerlas**. |
| «Trabajo mucho con negocios de aquí y de la zona de Cádiz» | Lo afirma el titular. Se mantiene, pero no lo uso en los datos estructurados. |
| Reseñas ★★★★★ y «4,8» en las maquetas | Son decorativas, de negocios ficticios y están rotuladas como «Reseña de ejemplo». No se marcan con schema. Se mantienen. |

## 5. Rendimiento (Lighthouse 13.5, laboratorio, producción, 16/10/2026)

| Perfil | Rend. | Accesib. | Buenas pr. | SEO | FCP | LCP | TBT | CLS | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Móvil (4G simulado) | 84 | 97 | 100 | 92 | 3,4 s | 3,4 s | 10 ms | 0,001 | 1.606 KiB |
| Escritorio | 96 | 97 | 100 | 92 | 0,9 s | 1,1 s | 0 ms | 0,001 | 1.606 KiB |

Causas principales:
1. **El favicon de 1,4 MB** supone el 90 % del peso total de la página.
2. **Google Fonts bloquea el renderizado** (Lighthouse estima un ahorro de ≈860 ms), porque necesita conexiones a 2 orígenes externos antes de pintar nada.
3. El logo del menú pesa 68 KB para mostrarse a 26 px.
4. Accesibilidad: el enlace de la marca tiene `aria-label="Inicio"` y el texto visible es «sanchezdevelop» (no coinciden), y las palabras sin iluminar de la frase animada tienen poco contraste (es intencionado).

Son datos de laboratorio. **No hay datos de campo (CrUX)**: el dominio no tiene tráfico suficiente para el informe público, y los datos de usuarios reales tendrán que salir de Cloudflare Web Analytics y Search Console.

## 6. Problemas priorizados

| # | Problema | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|
| 1 | Soft 404 global (cualquier URL devuelve 200 con la home) | Alto | Bajo | **P0** |
| 2 | Sin robots.txt ni sitemap (y sus URLs devuelven HTML) | Alto | Bajo | **P0** |
| 3 | Sin canonical; copia en `*.pages.dev` indexable | Alto | Bajo | **P0** |
| 4 | Una sola URL para todos los servicios: no hay páginas que respondan a cada intención de búsqueda | Muy alto | Alto | **P1** |
| 5 | Favicon de 1,4 MB y fuente que bloquea el renderizado (LCP móvil de 3,4 s) | Medio | Bajo | **P1** |
| 6 | Sin datos estructurados (Person / WebSite / Service / Breadcrumb) | Medio | Bajo | **P1** |
| 7 | Open Graph incompleto, sin imagen al compartir | Medio | Bajo | **P1** |
| 8 | H1 de eslogan sin términos descriptivos | Medio | Bajo | **P1** |
| 9 | Proyectos sin casos de estudio ni página «Sobre mí» (poca autoridad/E-E-A-T) | Alto | Medio | **P2** |
| 10 | `www` sin DNS | Medio | Bajo (manual) | **P2** (lo haces tú) |
| 11 | Search Console sin verificar; sin medición de conversiones | Alto | Bajo (manual) | **P2** (lo haces tú) |
| 12 | Sin aviso legal ni privacidad; la demo envía datos a OpenAI sin informar | Medio (confianza y legal) | Medio | **P2** |
| 13 | Estadística «3 de cada 4» sin verificar | Bajo | Bajo | **P3** |
| 14 | Si falla el JS, el contenido con clase `.rv` queda invisible (`opacity: 0`) | Bajo | Bajo | **P3** |
| 15 | Sin blog ni contenido informativo | Medio | Alto | **P3** |
