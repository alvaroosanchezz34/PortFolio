# Rediseño de sanchezdevelop.com: entrega

Rama `claude/seo-avanzado`. **No se ha desplegado nada**: producción sigue igual hasta que se haga merge y Cloudflare Pages publique.

## 1. Resumen

- **Nueva dirección de arte.** Fondo casi negro, texto marfil y un único acento azul. Inter Tight para titulares, Instrument Serif en cursiva para las palabras clave y JetBrains Mono para etiquetas. Grano sutil, luz ambiental y líneas finas en lugar de cajas.
- **Portada reescrita como argumento de venta.** El orden es:
  1. Hero: «Haz que tu negocio se vea *tan bien* como trabaja», con una composición de fragmentos de las demos.
  2. Demos.
  3. Generador de ideas con IA.
  4. Servicios explicados por resultado.
  5. Beneficios.
  6. Proceso.
  7. Diferenciación.
  8. Configurador de presupuesto (se mantiene).
  9. FAQ.
  10. Contacto.
  11. Footer.
- **Seis demos navegables** con identidad propia, más un índice `/demos/`.
- **ResumeAI y Workly se han retirado** de toda la parte pública: portada, `/proyectos/` (que nunca llegó a producción), servicios, «Sobre mí», JSON-LD, imágenes y OG. Los repositorios originales no se han tocado.
- **Contacto honesto.** El formulario valida, prepara el mensaje y abre WhatsApp o el correo. Dice claramente que falta pulsar enviar y no simula ningún envío.
- **Páginas internas** (servicios, blog, sobre mí, contacto, privacidad y 404) migradas al nuevo sistema visual.

## 2. Ficheros principales

| Área | Ficheros |
|---|---|
| Generador | `scripts/build.mjs` (recorrido recursivo, páginas con HTML propio, borrado de obsoletas), `scripts/check.mjs` (más términos retirados, enlaces relativos y rutas hash) |
| Plantillas | `scripts/lib/layout.mjs`, `scripts/lib/site.mjs`, `scripts/lib/demo.mjs` (nuevo) |
| Páginas | `scripts/pages/home.mjs` (nuevo; la portada ya no se edita a mano), `demos-index.mjs` (nuevo), `demos/*.mjs` (nuevos), servicios e institucionales actualizados, `proyectos.mjs` eliminado |
| Estilos y JS | `assets/css/site.css` (reescrito), `home.css`, `demos-index.css`; `assets/js/site.js`, `home.js`, `contact.js`, `track.js` |
| Demos | `assets/demos/kit.css`, `kit.js`, `assets/demos/<slug>/{style.css, app.js, fonts/, img/}` |
| Imágenes | `assets/og/sanchezdevelop.jpg` y `demo-*.jpg` (nuevas); `scripts/data/images.json` (dimensiones e ID de Unsplash de cada foto) |
| Cloudflare | `_redirects` (nuevo: oculta `docs/`, `scripts/`, `tests/`, `README.md`, `package.json`) |
| Pruebas | `tests/e2e.mjs` (nuevo), `package.json` (`npm run e2e`) |
| Eliminados | `assets/img/proyectos/`, `assets/og/resumeai.jpg`, `assets/og/workly.jpg`, `assets/js/lenis.min.js` |

## 3. Rutas

**Indexables (sitemap, 12 URL):**
- `/`
- `/demos/`
- los cinco servicios
- `/blog/` y su artículo
- `/sobre-mi/`
- `/contacto/`
- `/privacidad/`

**Con noindex:**
- `/demos/aurea-estates/`
- `/demos/noir-atelier/`
- `/demos/sora-wellness/`
- `/demos/forge-fitness/`
- `/demos/veloce-automotive/`
- `/demos/flowbook/` y `/demos/flowbook/app/`
- `404.html`

Las rutas que ya existían se mantienen. `/proyectos/` desaparece, pero no hace falta redirección porque nunca se publicó.

## 4. Funciones de cada demo

Todas tienen:
- la barra «Demo ficticia» con vuelta a `/demos/`;
- un CTA «Quiero una web así» que abre `/contacto/?demo=<slug>` con el mensaje ya rellenado;
- un cierre comercial y una píldora flotante;
- estados vacíos y de error;
- una versión responsive;
- aviso de que sus formularios no envían datos.

| Demo | Funciones |
|---|---|
| **Aurea Estates** (inmobiliaria de lujo) | Buscador por zona, tipo y precio. Filtros por dormitorios y orden. Estado vacío con reinicio. Ficha en diálogo con galería navegable, enlazable por hash. Zonas. Formulario de visita por inmueble y formulario general |
| **Noir Atelier** (moda) | Categorías, género y orden. Ficha con colores, tallas (las agotadas, deshabilitadas) y validación de talla obligatoria. Bolsa lateral con cantidades y total, persistente en `localStorage`. Pago desactivado a propósito. Lookbook |
| **Sora Wellness** (estética y bienestar) | Tratamientos filtrables con precio y duración. Reserva en cuatro pasos (tratamiento, día, hora, datos), con días cerrados, horas ocupadas, resumen vivo y validación. Equipo ficticio con iniciales en lugar de fotos de personas. FAQ. Sin afirmaciones médicas |
| **Forge Fitness** (gimnasio) | Programas con intensidad. Horario semanal filtrable por programa y por día, con pestañas en el móvil y plazas libres. Tarifas mensual o trimestral (−10 %). La clase de prueba lleva el plan elegido al formulario |
| **Veloce Automotive** (concesionario) | Stock con filtros por marca, carrocería, año y precio máximo (rango), y orden. Ficha técnica con galería. Calculadora de cuota orientativa (entrada, plazo y TIN de demostración). Solicitud de información o de prueba |
| **Flowbook** (SaaS de reservas) | Landing de producto con precios. El panel `/app/` tiene: agenda semanal (lista por día en el móvil), alta de citas desde el botón o un hueco libre, control de solapes y del horario de cierre, cambio de estado y borrado, tabla con búsqueda y filtros, KPI calculados y «Restablecer datos de demo». Todo en `localStorage` |

## 5. Animaciones y dependencias

**Animaciones.** Todas son CSS y JS propio:
- titulares que entran línea a línea;
- aparición de bloques según la posición de scroll;
- parallax suave del hero, solo con puntero fino;
- marquesinas;
- línea de progreso del proceso.

Con `prefers-reduced-motion` todo aparece sin movimiento y el contenido nunca depende de la animación. No hay scroll secuestrado ni cursor personalizado. Se elimina Lenis (el scroll suave).

**Dependencias nuevas: ninguna.** Las tipografías están autoalojadas y todas tienen licencia OFL:
- Inter Tight, Instrument Serif y JetBrains Mono (sitio);
- Cormorant, Bodoni Moda, Fraunces, Anton, Michroma y Manrope (demos).

Playwright, Wrangler y Lighthouse se han usado solo como herramientas de verificación, fuera del repositorio.

## 6. Resultados de las pruebas (reales, en local con `wrangler pages dev`)

- `npm run build`: genera 20 páginas HTML y un sitemap de 12 URL.
- `npm run check`: **0 errores, 0 avisos** en 20 páginas. Incluye la búsqueda de «ResumeAI» y «Workly» en todo lo publicado y en las fuentes.
- `npm run e2e`: **12 de 12 pruebas superadas**. Cubren:
  - formulario y configurador de la home;
  - `?demo=` en contacto;
  - menú móvil (trampa de foco y Escape);
  - 404 real sin rastro de los proyectos;
  - Aurea, Noir, Sora, Forge (escritorio y móvil), Veloce y Flowbook (escritorio y móvil).
- **Barrido responsive:** 20 rutas × 4 anchos (390, 768, 1280 y 1920 px), con 0 desbordamientos horizontales, 0 errores de consola y 0 peticiones fallidas. Además, revisión visual de capturas a 390 y 1280 px.
- **Lighthouse 13 (laboratorio, local; móvil / escritorio):**

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| `/` | 96 / 99 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/demos/` | 98 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/contacto/` | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| `/diseno-web-empresas/` | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| Artículo del blog | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| Aurea / Noir | 97 / 100 | 100 / 100 | 100 / 100 | 66* |
| Sora / Forge | 100 / 100 | 100 / 100 | 100 / 100 | 66* |
| Veloce | 99 / 100 | 100 / 100 | 100 / 100 | 66* |
| Flowbook / panel | 99–100 / 100 | 100 / 100 | 100 / 100 | 63* |

\* El SEO baja únicamente por el `noindex`, que es intencionado.

Son medidas de laboratorio en local. Los datos reales de campo llegarán por Search Console y Cloudflare Web Analytics.

## 7. Pendiente y limitaciones

- **Publicar.** Revisar la rama, hacer merge y comprobar la web en producción, incluida la Function con `OPENAI_API_KEY`.
- **Fotos.** Proceden de Unsplash (Unsplash License: uso comercial permitido, sin atribución obligatoria). El ID de cada una está en `scripts/data/images.json`.
- **Nombres ficticios.** Los nombres de las demos son inventados, pero pueden coincidir con negocios reales. Se presentan siempre como ficticios y con `noindex`.
- **Veloce.** Usa modelos reales con unidades, precios y kilometrajes ficticios. Las especificaciones son orientativas.
- **Imágenes de las tarjetas de Flowbook.** Son una maqueta HTML, no una captura.
- **Documentación SEO anterior.** `docs/seo/` menciona los proyectos retirados como histórico. No se puede abrir desde la web gracias a `_redirects`.

## 8. Integraciones externas recomendadas (requieren acción tuya)

- **Recepción real de formularios** (opcional). Hoy el formulario abre WhatsApp o el correo. Si se quiere un envío directo, hacen falta una Pages Function con un proveedor de email (Resend, Postmark…) y su clave como secreto. El formulario está preparado para cambiar ese paso.
- **Analítica de conversión.** `track.js` ya emite `lead_click` y `generate_lead`. Para verlos, hay que activar Cloudflare Zaraz, GA4 o Plausible. Cloudflare Web Analytics ya está activo.
- **Search Console.** Enviar el sitemap tras el despliegue. Pendiente también de la fase SEO: la redirección `www` → raíz en DNS.
- **Aviso legal.** Si se factura como autónomo, añadir el NIF y los datos que exija la LSSI.

## 9. Ejecutar en local

```bash
npm test                                   # build + validación
npx wrangler pages dev . --port 8788       # web en http://localhost:8788
BASE=http://localhost:8788 npm run e2e     # pruebas end-to-end (necesita Playwright)
```
