# Informe final · SEO de sanchezdevelop.com

Fecha: 16/10/2026 · Rama: `claude/seo-avanzado` · Base: `main` @ `5bbf3cb`

**Estados:** IMPLEMENTADA = está en el código · VALIDADA = implementada y comprobada con una prueba · PENDIENTE = la tienes que hacer tú, o depende de datos que aún no existen · BLOQUEADA = no se puede hacer sin un acceso o un dato que no tengo.

> **Nada de esto está publicado todavía.** El trabajo está en la rama `claude/seo-avanzado`. Producción solo cambia cuando fusiones esa rama en `main`, porque Cloudflare Pages publica `main`. Si tienes activadas las *preview deployments*, Cloudflare puede generar una URL de vista previa de la rama, y esas URLs llevan `noindex` automáticamente.

---

## 1. Diagnóstico SEO inicial

El detalle está en [`01-auditoria-inicial.md`](01-auditoria-inicial.md). En resumen:

- La web era un único `index.html` estático en Cloudflare Pages, con buen contenido comercial pero **sin ninguna otra URL que Google pudiera posicionar**.
- **Soft 404 global:** al no haber `404.html`, Cloudflare Pages servía la portada con código 200 en cualquier ruta, incluidas `/robots.txt` y `/sitemap.xml`.
- No había canonical, sitemap, robots.txt, datos estructurados ni imagen al compartir. El alias `*.pages.dev` era una copia indexable del sitio.
- El **favicon pesaba 1,4 MB** (el 90 % del peso de la página) y Google Fonts bloqueaba el renderizado. En Lighthouse móvil, el LCP era de 3,4 s en producción.
- El H1 era un eslogan («Mucho más que una web.»).
- La estadística «tres de cada cuatro personas…» no era verificable.
- `www.sanchezdevelop.com` no tiene registro DNS.

## 2. Problemas detectados y prioridad

| # | Problema | Prioridad | Estado |
|---|---|---|---|
| 1 | Soft 404 global | P0 | **VALIDADA**: `/no-existe` devuelve 404 en el emulador de Pages |
| 2 | Sin robots.txt ni sitemap | P0 | **VALIDADA**: `text/plain` y `application/xml`, con 14 URLs |
| 3 | Sin canonical; `*.pages.dev` indexable | P0 | **VALIDADA** (canonical en todas las páginas; `X-Robots-Tag: noindex` en pages.dev, pendiente de verse en producción) |
| 4 | Una sola URL para todos los servicios | P1 | **IMPLEMENTADA**: 13 URLs nuevas |
| 5 | Favicon de 1,4 MB y fuente que bloqueaba el render | P1 | **VALIDADA**: peso de la portada de 1.592 a 88 KiB |
| 6 | Sin datos estructurados | P1 | **VALIDADA**: 0 errores en validator.schema.org (15 páginas) |
| 7 | Open Graph incompleto | P1 | **VALIDADA** |
| 8 | H1 sin términos descriptivos | P1 | **IMPLEMENTADA** |
| 9 | Proyectos sin casos de estudio, sin «Sobre mí» | P2 | **IMPLEMENTADA** |
| 10 | `www` sin DNS | P2 | **PENDIENTE** (cambio de DNS: lo haces tú, ver §13) |
| 11 | Search Console sin verificar | P2 | **PENDIENTE** (necesita tu cuenta, ver §10) |
| 12 | Sin privacidad; la demo envía datos a OpenAI | P2 | **IMPLEMENTADA** la privacidad · **BLOQUEADO** el aviso legal (falta NIF y domicilio) |
| 13 | Estadística sin verificar | P3 | **IMPLEMENTADA**: reformulada con una fuente comprobable |
| 14 | Contenido invisible si falla el JS | P3 | **VALIDADA**: la ocultación inicial solo se aplica si hay JS |
| 15 | Sin blog | P3 | **IMPLEMENTADA**: estructura más 1 artículo |

## 3. Cambios implementados y archivos afectados

### Infraestructura (Fase B)
| Archivo | Cambio |
|---|---|
| `404.html` (generado) | Página 404 con `noindex`. Desactiva el modo SPA de Cloudflare Pages: las rutas inexistentes devuelven 404 de verdad. |
| `robots.txt` | Permite todo menos `/api/` y declara el sitemap. No bloquea CSS, JS ni imágenes. |
| `sitemap.xml` (generado) | 14 URLs canónicas e indexables con `lastmod`. |
| `_headers` | `X-Robots-Tag: noindex` para `https://:project.pages.dev/*`, `/docs/*`, `/scripts/*`, `README.md` y `package.json`. También `X-Frame-Options`, `Permissions-Policy` y caché larga para las fuentes. |
| `functions/api/preview.js` | Añade `X-Robots-Tag: noindex` a las respuestas de la API (no se toca la lógica). |
| `favicon.ico`, `apple-touch-icon.png`, `assets/img/favicon-96.png` | Favicons locales: de 1,4 MB a 15 KB el más pesado. |
| `assets/img/logo-sd.webp` | Logo del menú: de 68 KB a 0,8 KB, con el mismo aspecto. |
| `assets/fonts/*` | Inter Tight autoalojada (woff2 variable, subconjuntos latin y latin-ext, licencia OFL incluida), con `preload`. Elimina dos orígenes externos. |
| `assets/js/lenis.min.js` | Lenis 1.1.13 autoalojado (antes jsDelivr), con su licencia MIT. |
| `assets/og/*.jpg` | Imágenes para compartir de 1200×630: la de marca y las de ResumeAI y Workly a partir de capturas reales. |

### Portada `index.html` (cambios localizados, sin rehacerla)
- `<title>`, meta description, canonical y Open Graph/Twitter completos.
- H1 descriptivo («Desarrollador web freelance: webs y software a medida»). El eslogan «Mucho más que una web.» se mantiene igual, ahora como `<p>`.
- **Nueva sección `#servicios`** con enlaces HTML rastreables a las 5 páginas de servicio y a «Sobre mí». El menú cambia «Opciones» por «Servicios»; la sección «Opciones» sigue existiendo.
- Proyectos: botón «Ver caso de estudio» a cada caso. En «Opciones», enlaces «Más info» a cada servicio.
- FAQ: una pregunta nueva sobre el precio, que enlaza al artículo, y un enlace a mantenimiento.
- Pie: mapa del sitio con todas las páginas (lo genera el build).
- Frase iluminada: «Tres de cada cuatro…» cambia por un mensaje sin cifra, y la nota 3 cita la encuesta de BrightLocal con datos reales (2017–2019: entre el 90 % y el 97 %).
- Maquetas decorativas: los `h4`/`h5` pasan a `<b>`, para que no ensucien la jerarquía de encabezados. El aspecto es idéntico.
- Accesibilidad: enlace «Saltar al contenido», contraste de la fuente citada, menú móvil cerrado fuera del orden de tabulación y la marca sin un `aria-label` que contradijera el texto visible.
- `data-cta` en todos los botones de contacto, más `assets/js/track.js` (ver §10).
- La demo con IA, el configurador, las animaciones y Lenis **siguen igual**. Comprobado con Playwright: el configurador calcula y la demo genera la maqueta.

### Páginas nuevas (Fases C–E)
Las genera `scripts/build.mjs` a partir de `scripts/pages/*.mjs`, con la plantilla `scripts/lib/layout.mjs` y los estilos `assets/css/site.css`, que usan los mismos tokens y la misma estética que la portada.

### Herramientas
| Archivo | Para qué |
|---|---|
| `package.json` | `npm run build`, `npm run check` y `npm test`. **Sin dependencias.** |
| `scripts/build.mjs` | Genera las páginas internas, el sitemap y sincroniza el JSON-LD y el mapa del pie de la portada. |
| `scripts/check.mjs` | Valida las 15 páginas: un único title, H1 y canonical; descripciones; OG; imágenes con `alt` y dimensiones; JSON-LD parseable y sin reseñas; enlaces y anclas internos; páginas huérfanas; sitemap coherente (sin noindex, sin URLs no canónicas); robots.txt; y la 404. |

## 4. Arquitectura de URLs resultante

```
/                                        Portada (marca + «desarrollador web freelance»)
├── /diseno-web-empresas/                Servicio: diseño web para pymes y autónomos
├── /sistemas-reservas-online/           Servicio: reservas, citas y pedidos
├── /aplicaciones-web/                   Servicio: apps, SaaS, APIs, software a medida
├── /integracion-inteligencia-artificial/ Servicio: IA y automatización
├── /mantenimiento-web/                  Servicio: mantenimiento, mejora y SEO técnico
├── /proyectos/                          Índice de casos de estudio
│   ├── /proyectos/resumeai/
│   └── /proyectos/workly/
├── /sobre-mi/
├── /contacto/
├── /blog/
│   └── /blog/cuanto-cuesta-una-pagina-web/
├── /privacidad/
└── /404.html                            (noindex, fuera del sitemap)
```

- No había URLs previas aparte de `/`, así que **no hace falta ninguna redirección**. Las variantes sin barra final (`/aplicaciones-web`) y con `index.html` las redirige Cloudflare con un 308 a la URL canónica, sin cadenas (comprobado).
- **Descartadas a propósito:** páginas por ciudad (solo cambiaría el topónimo), `/tiendas-online/` (la competencia de plataformas como Shopify es enorme, y se cubre dentro de diseño web), `/desarrollo-software-a-medida/` separada de `/aplicaciones-web/` (canibalizaría: la intención es casi la misma) y `/automatizacion-empresas/` separada de IA (por ahora no tienes casos propios de automatización sin IA; Workly aporta uno, y se puede separar si Search Console muestra demanda).
- Migas de pan visibles y `BreadcrumbList` en todas las páginas internas.

## 5. Mapa de keywords por página

> **Limitación importante:** no tengo acceso a Google Keyword Planner, Search Console, Ahrefs ni Semrush. **No hay cifras de volumen ni de posiciones**, y no me invento ninguna. La competencia la he observado con una herramienta de búsqueda que devuelve resultados de EE. UU., **no de google.es**, así que es solo orientativa. Las prioridades son hipótesis que habrá que contrastar con los datos de Search Console a partir de la semana 4-6.

### Lo observado en las SERP (muestra limitada)
- «desarrollador web freelance Málaga»: dominan los marketplaces (Malt, Twine) y los directorios (Trustlocal). Hay perfiles individuales con tarifas de 100–150 €/día. Una web propia y especializada es viable a medio plazo, sobre todo combinada con un perfil propio en esos mismos marketplaces.
- «crear web con sistema de reservas»: dominan los creadores de webs (Hostinger) y los SaaS de reservas (Koalendar, SiteMinder), con intención de «hazlo tú». Para un freelance el ángulo viable es «a medida / sin comisiones / para mi tipo de negocio».
- «cuánto cuesta una página web 2026»: mucho contenido de proveedores grandes (Hostinger, Elementor) con cifras en dólares y poco adaptadas a España. Hay hueco para una guía con precios reales en euros.
- «desarrollo de aplicaciones web a medida freelance»: perfiles en marketplaces y comparativas genéricas. La competencia es media, y los casos de estudio propios son lo que diferencia.
- «mantenimiento web pequeñas empresas»: dominan las agencias de WordPress. Intención comercial clara.

### Mapa

| Keyword (y variantes) | Intención | Relevancia | Viabilidad para un dominio personal | Prioridad | Página |
|---|---|---|---|---|---|
| sanchezdevelop, álvaro sánchez desarrollador | Navegacional | Máxima | Alta (marca) | P1 | `/`, `/sobre-mi/` |
| desarrollador web freelance (Málaga) | Comercial | Alta | Media en Málaga, baja a nivel nacional | P1 | `/` |
| programador web freelance, desarrollador full stack freelance | Comercial | Alta | Media-baja | P2 | `/` (secundaria), `/sobre-mi/` |
| diseño web para pequeñas empresas / autónomos | Comercial | Alta | Media-baja (muy competida) | P1 | `/diseno-web-empresas/` |
| crear página web para mi negocio, diseñador y desarrollador web para empresas | Comercial-transaccional | Alta | Media | P2 | `/diseno-web-empresas/` |
| web con sistema de reservas, reservas online para restaurante/peluquería | Comercial | Alta | Media (long tail por sector) | P1 | `/sistemas-reservas-online/` |
| desarrollo de aplicaciones web a medida | Comercial | Alta | Media | P1 | `/aplicaciones-web/` |
| desarrollo de software a medida (pymes) | Comercial | Alta | Baja (agencias) | P2 | `/aplicaciones-web/` (secundaria) |
| integrar inteligencia artificial en una web / empresa | Informativa-comercial | Alta | Media (tema reciente) | P2 | `/integracion-inteligencia-artificial/` |
| programador para automatizar procesos | Comercial | Media-alta | Media | P2 | `/integracion-inteligencia-artificial/` |
| mantenimiento y mejora de páginas web | Comercial | Alta | Media | P2 | `/mantenimiento-web/` |
| cuánto cuesta una página web (para un negocio) | Informativa con intención de compra | Alta | Media en el long tail | P1 | `/blog/cuanto-cuesta-una-pagina-web/` |
| diseño web (sin calificar) | Mixta | — | Muy baja | **No se persigue** | — |

**Long tail a vigilar en Search Console:** «web para peluquería con citas», «reservas online restaurante sin comisiones», «software de facturación a medida autónomos», «chatbot para web de negocio», «mejorar velocidad web móvil».

**Canibalización controlada:** la portada se centra en la persona («desarrollador web freelance») y `/diseno-web-empresas/` en el servicio («diseño web para pymes/autónomos»). Cada página de servicio tiene un H1 y un title con un término principal distinto. El artículo de precios es informativo y enlaza a las comerciales, pero no compite con ellas. Si Search Console muestra la portada y `/diseno-web-empresas/` alternándose para la misma consulta, conviene reforzar la diferencia entre ambas.

## 6. Titles y meta descriptions finales

| URL | Title (car.) | H1 | Meta description (car.) |
|---|---|---|---|
| `/` | Desarrollador web freelance en Málaga \| SanchezDevelop (54) | Desarrollador web freelance: webs y software a medida | Webs a medida, reservas online, tiendas y aplicaciones para negocios de toda España. Precio cerrado, trato directo conmigo y ves tu web antes de pagar. (151) |
| `/diseno-web-empresas/` | Diseño web para pequeñas empresas y autónomos \| SanchezDevelop (62) | Diseño web para pequeñas empresas y autónomos | Webs a medida para negocios locales, autónomos y pymes: rápidas, pensadas para el móvil y para que te contacten. Desde 250 €, con precio cerrado. (145) |
| `/sistemas-reservas-online/` | Web con sistema de reservas, citas y pedidos online \| SanchezDevelop (68) | Web con sistema de reservas, citas y pedidos online | Que tus clientes reserven mesa, pidan cita o hagan pedidos desde tu propia web, sin pagar comisión por reserva a una plataforma. Web con reservas desde 450 €. (158) |
| `/aplicaciones-web/` | Desarrollo de aplicaciones web y software a medida \| SanchezDevelop (67) | Desarrollo de aplicaciones web y software a medida | Plataformas SaaS, paneles de gestión, portales de clientes y APIs con React, Next.js, Angular, Node.js o Spring Boot, de un desarrollador con productos propios. (160) |
| `/integracion-inteligencia-artificial/` | Integración de IA y automatización para negocios \| SanchezDevelop (65) | Integración de inteligencia artificial y automatización de procesos | Asistentes que responden a tus clientes, lectura automática de documentos y tareas que se hacen solas. IA integrada en tu web o tu software, con supervisión humana. (164) |
| `/mantenimiento-web/` | Mantenimiento web y mejora de webs existentes \| SanchezDevelop (62) | Mantenimiento, mejora y optimización de tu web | Tu web siempre online, rápida y al día, con pequeños cambios incluidos desde 15 €/mes. También reviso webs existentes: velocidad, SEO técnico y conversión. (155) |
| `/proyectos/` | Proyectos: ResumeAI y Workly \| SanchezDevelop (45) | Proyectos propios en producción | Casos de estudio de dos plataformas completas diseñadas y programadas por Álvaro Sánchez: ResumeAI (estudio con IA) y Workly (gestión para autónomos). (150) |
| `/proyectos/resumeai/` | ResumeAI, caso de estudio: SaaS de estudio con IA \| SanchezDevelop (66) | ResumeAI: plataforma de estudio con inteligencia artificial | Cómo es ResumeAI por dentro: un SaaS que convierte PDFs, imágenes y vídeos de YouTube en flashcards, resúmenes y exámenes con GPT-4o, con suscripciones en Stripe. (162) |
| `/proyectos/workly/` | Workly, caso de estudio: gestión para autónomos \| SanchezDevelop (64) | Workly: software de gestión para autónomos y freelancers | Cómo es Workly por dentro: clientes, proyectos, facturas en PDF, gastos, horas y modelos 130 y 303 en una plataforma con React 19, Express y MySQL. (147) |
| `/sobre-mi/` | Sobre mí: Álvaro Sánchez, desarrollador Full Stack \| SanchezDevelop (67) | Soy Álvaro Sánchez, desarrollador Full Stack | Soy Álvaro Sánchez, desarrollador Full Stack independiente en Málaga. Diseño y programo webs, reservas online y software a medida para negocios de toda España. (159) |
| `/contacto/` | Contacto y presupuesto sin compromiso \| SanchezDevelop (54) | Cuéntame tu proyecto | Pide presupuesto para tu web, sistema de reservas o aplicación a medida por WhatsApp o email. Primera conversación gratis y respuesta en 24 horas como mucho. (157) |
| `/blog/` | Blog sobre webs y software para negocios \| SanchezDevelop (57) | Webs y software para negocios, sin tecnicismos | Guías prácticas y sin tecnicismos para autónomos y pequeñas empresas: precios de webs, reservas online, software a medida e inteligencia artificial. (148) |
| `/blog/cuanto-cuesta-una-pagina-web/` | ¿Cuánto cuesta una página web para un negocio en 2026? (54) | (el mismo) | Precios reales de ejemplo, qué hace subir el coste de una web, los gastos que no salen en el presupuesto y cómo comparar ofertas sin llevarte sustos. (149) |
| `/privacidad/` | Política de privacidad \| SanchezDevelop (39) | Política de privacidad | Qué datos trata sanchezdevelop.com, para qué y cómo ejercer tus derechos… (141) |

Google puede reescribir los titles y las descripciones si considera que otro texto responde mejor a la búsqueda.

## 7. Datos estructurados añadidos y validaciones

| Tipo | Dónde | Notas |
|---|---|---|
| `Person` (`#alvaro`) | Todas las páginas | Nombre, puesto, `knowsAbout`, localidad Málaga (sin calle), email y `sameAs` **solo de GitHub** (perfil público verificado). Sin teléfono, sin foto y sin perfiles que no existen. En la portada lleva además un `OfferCatalog` con los 5 servicios. |
| `WebSite` (`#website`) | Todas | `publisher` → Person. |
| `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` | Cada página | `isPartOf`, `about`, `breadcrumb` y `dateModified`. |
| `Service` | Las 5 páginas de servicio | `provider` → Person y `areaServed` España. Lleva `offers` con `minPrice` **solo donde el precio es visible en la página**: 250 €, 450 € y 15 €/mes (`UnitPriceSpecification`). |
| `BreadcrumbList` | Todas las internas | Coinciden con las migas visibles. |
| `Article` | Casos de estudio | `about` → CreativeWork (ResumeAI / Workly) con `creator` → Person. |
| `Blog` + `BlogPosting` | Blog y artículo | Autor Person, con fechas reales de publicación. |

**No se ha añadido:** `LocalBusiness`/`ProfessionalService` (no hay una dirección física pública; ver §9), `FAQPage` (Google solo muestra ese resultado enriquecido a webs gubernamentales y de salud), `AggregateRating`/`Review` (no hay reseñas reales; `check.mjs` lo prohíbe expresamente) ni `SoftwareApplication` (exigiría valoraciones u ofertas que no muestras).

**Validación:**
- **VALIDADA**: 15/15 páginas con **0 errores** en `validator.schema.org`. El validador detectó dos propiedades no válidas (`availableLanguage` en Service y `unitText` en PriceSpecification), que se corrigieron.
- **VALIDADA**: `check.mjs` parsea todo el JSON-LD y comprueba las migas, los `@id` y la ausencia de reseñas.
- **PENDIENTE**: la Prueba de resultados enriquecidos de Google necesita una URL pública (o pegar el código a mano en search.google.com/test/rich-results). Hazla después de publicar.
- Los datos estructurados **no garantizan** resultados enriquecidos ni mejores posiciones. Solo ayudan a Google a entender quién eres y qué ofreces.

## 8. Resultados de tests y build

| Prueba | Resultado |
|---|---|
| `npm test` (build + check de 15 páginas) | **✓ 0 errores, 0 avisos** |
| Build idempotente (dos ejecuciones dan el mismo `index.html`) | ✓ |
| Prueba negativa de `check.mjs` (se introdujeron errores a propósito) | ✓ Detecta canonical erróneo, ancla inexistente, enlace roto, H1 duplicado, imagen sin `alt` y meta keywords. Esta prueba destapó un fallo propio en la detección de enlaces rotos con barra final, ya corregido. |
| Emulación de Cloudflare Pages (`wrangler pages dev`) | `/`, todas las páginas nuevas → 200 · `/no-existe` y `/blog/no-existe` → **404** · `/robots.txt` → 200 `text/plain` · `/sitemap.xml` → 200 `application/xml` · `/x` y `/x/index.html` → 308 `/x/` · `/api/preview` → 405 + `noindex` · `/docs/*` → `noindex` |
| Navegador (Playwright, 390 px y 1440 px, 15 URLs) | Sin errores de consola ni desbordamiento horizontal; fuente cargada |
| Funcionalidad de la portada | Configurador ✓ (450–850 €) · Demo con IA ✓ (sin clave en local usa las plantillas, como en producción si falla la API) · Menú móvil ✓ |
| Teclado | Enlace de salto ✓ · El menú móvil cerrado no recibe el foco ✓ |

Para repetirlo: `npm test`, y para la emulación de Pages, `npx wrangler pages dev .` (no está en `package.json` para no añadir dependencias).

## 9. Métricas de rendimiento antes y después

Datos **de laboratorio** (Lighthouse 13.5, Chromium headless). No son datos de usuarios reales, y una buena puntuación de Lighthouse **no equivale a posicionar mejor**. Para comparar en igualdad de condiciones, «antes» y «después» se midieron en el mismo emulador local. La fila de producción es la referencia real del punto de partida.

| Página · perfil | Rend. | Accesib. | Buenas pr. | SEO | FCP | LCP | CLS | Peso |
|---|---|---|---|---|---|---|---|---|
| Portada · móvil · **producción, antes** | 84 | 97 | 100 | 92 | 3,4 s | 3,4 s | 0,001 | 1.606 KiB |
| Portada · móvil · local, antes | 68 | 97 | 100 | 92 | 2,7 s | 10,2 s | 0 | 1.592 KiB |
| Portada · móvil · **local, después** | **98** | 97 | 100 | **100** | 1,3 s | **1,5 s** | 0 | **88 KiB** |
| Portada · escritorio · local, después | 100 | 97 | 100 | 100 | 0,3 s | 0,4 s | 0 | 88 KiB |
| Reservas online · móvil · local | 100 | 100 | 100 | 100 | 0,8 s | 1,4 s | 0 | 64 KiB |
| Caso ResumeAI · móvil · local | 100 | 100 | 100 | 100 | 0,8 s | 1,4 s | 0 | 102 KiB |
| Artículo de precios · móvil · local | 100 | 100 | 100 | 100 | 0,8 s | 1,4 s | 0 | 64 KiB |

- La accesibilidad de la portada se queda en 97 por **una decisión de diseño**: las palabras sin iluminar de la frase que se ilumina con el scroll (`#3a3a3c` sobre negro). Se iluminan al hacer scroll y los lectores de pantalla las leen igual. Si quieres el 100, súbeles el gris (pierde algo de efecto).
- **INP** no se mide en laboratorio. TBT = 0 ms en todas las páginas, que es un buen indicio.
- **PENDIENTE**: repetir la medición en producción después de publicar, y seguir los datos de campo en Search Console › Métricas web principales (necesita tráfico suficiente).

## 10. Configuraciones externas pendientes

| Acción | Estado | Cómo |
|---|---|---|
| Fusionar la rama en `main` (publicar) | **PENDIENTE (tú)** | Revisa los textos (§11) y fusiona. Cloudflare publicará automáticamente. |
| Verificar Google Search Console | **PENDIENTE (tú)** | search.google.com/search-console → «Añadir propiedad» → **Dominio** → `sanchezdevelop.com`. Como el DNS está en Cloudflare, Google puede ofrecerte verificarlo automáticamente con Cloudflare. Si no, añade a mano en Cloudflare › DNS el registro TXT que te indique. |
| Enviar el sitemap | **PENDIENTE (tú)** | En Search Console › Sitemaps → `https://sanchezdevelop.com/sitemap.xml`. |
| Solicitar indexación de las URL clave | **PENDIENTE (tú)** | Inspección de URLs → portada, 5 servicios, proyectos y artículo → «Solicitar indexación». |
| Bing Webmaster Tools | **PENDIENTE (opcional)** | Puede importar la propiedad desde Search Console en un clic. |
| `www` → apex | **PENDIENTE (tú, DNS)** | Cloudflare → DNS → registro `CNAME www → sanchezdevelop.com` (con proxy). Luego Reglas → Redirect Rules → «Redirect from WWW to root» (301, conservando ruta y query). Comprueba que `https://www.sanchezdevelop.com/x` → `https://sanchezdevelop.com/x` en un solo salto. |
| Medición de conversiones | **PENDIENTE (decisión tuya)** | Cloudflare Web Analytics ya está activo (visitas y páginas, sin cookies), pero **no registra eventos**. Los botones ya emiten un evento `lead_click` / `generate_lead` (`assets/js/track.js`) a la herramienta que actives: **Cloudflare Zaraz** (gratis, en el panel de Cloudflare) enviándolo a GA4, o Plausible. GA4 usa cookies, así que necesitarías un banner de consentimiento. Plausible no. Mientras tanto, el **mensaje prerrellenado de WhatsApp es distinto en cada página** («he visto tu página de reservas online…»), así que sabes de qué página viene cada contacto sin ninguna herramienta. |
| Prueba de resultados enriquecidos | **PENDIENTE** | Tras publicar, en search.google.com/test/rich-results con 3-4 URL. |

## 11. Limitaciones y riesgos conocidos

1. **Revisa los textos antes de publicar.** He escrito el contenido nuevo en tu voz a partir de lo que ya decía tu web, tus precios del configurador y lo que se ve públicamente en resume-ai.dev y workly.space. Confirma en especial:
   - Las promesas que ya existían y se repiten en las páginas nuevas: «si no te convence, no pagas», «precio cerrado que no cambia», «respuesta en 24 h, normalmente el mismo día», «dominio, hosting y correo configurados», «ficha de Google configurada».
   - Lo que puede incluir un sistema de reservas (recordatorios, señal con Stripe, panel, aforo): está escrito como opciones, no como incluido siempre.
   - Las secciones de **arquitectura** de ResumeAI y Workly: salen del stack público de cada producto. Las de «Lo que exige técnicamente un producto así» describen retos inherentes al tipo de producto, no afirman cómo los resolviste. Si quieres más autoridad, añade tus decisiones reales y lo que aprendiste.
   - El artículo de precios: usa tus tarifas y las sumas de ejemplo (450–850 €, 650–1.200 € y 650–1.350 €) salen de combinar las del configurador.
2. **Ubicación:** uso «Málaga» porque tu web ya lo decía («De Málaga», «Estoy en Málaga»). No hay calle ni coordenadas en ningún sitio.
3. **Aviso legal (LSSI) BLOQUEADO:** la LSSI exige publicar el NIF y el domicilio del titular, y no los tengo. La página de privacidad cubre lo que sé con certeza. Consulta con un profesional si tienes dudas legales.
4. **`docs/` y `scripts/` se publican** porque Cloudflare Pages sirve la raíz del repositorio. Llevan `noindex` y no hay nada sensible, pero si prefieres que no sean accesibles: mueve la web a una carpeta `public/` y cambia el «directorio de salida» en Cloudflare Pages (es un cambio de configuración que debes hacer tú, y por eso no lo he hecho).
5. **`package.json` en la raíz:** sin dependencias. Si Cloudflare ejecuta `npm install` al detectarlo, no instala nada. El comando de build en Cloudflare debe seguir vacío: las páginas generadas ya están en el repositorio.
6. **Mantenimiento del contenido:** las páginas internas se editan en `scripts/pages/*.mjs` y se regeneran con `npm run build`. **No edites a mano el HTML generado**, porque se sobrescribe. La portada sí se edita a mano, menos los bloques entre los comentarios `jsonld:` y `footmap:`.
7. **Caché:** las fuentes tienen caché de un año (`immutable`). Si las cambias, cambia el nombre del fichero. Si cambias `site.css` o `site.js`, sube `ASSET_V` en `scripts/lib/site.mjs`.
8. **SERP orientativas:** ver §5.
9. **Plazos:** una web nueva suele tardar semanas o meses en ganar visibilidad. No hay ninguna garantía de posiciones.

## 12. Plan de actuación a 30, 60 y 90 días

Los objetivos numéricos son **hipótesis**: hoy no hay línea base, porque no hay Search Console. El primer hito es medir.

**Días 0-30: publicar y medir**
- Fusionar, verificar Search Console, enviar el sitemap, solicitar la indexación y configurar la redirección `www`.
- Comprobar en producción con curl: 404, robots, sitemap, `noindex` en pages.dev y la redirección de www.
- Prueba de resultados enriquecidos y Lighthouse en producción.
- Decidir la herramienta de eventos (§10).
- Completar «Sobre mí» con una **foto real** y tu trayectoria (formación, experiencia), y añadir un enlace a sanchezdevelop.com desde el pie de ResumeAI y de Workly («Hecho por SanchezDevelop»).
- KPI: páginas indexadas (objetivo: las 14 del sitemap en «Indexadas»), primeras impresiones y consultas de marca.

**Días 31-60: primeras señales**
- Revisar en Search Console las consultas con impresiones. Si una página sale para consultas que no son las suyas, ajustar el title, el H1 o los enlaces internos.
- Publicar 1-2 artículos del plan editorial (prioridad A, abajo).
- Crear o actualizar los perfiles legítimos (§13) con enlace a la web.
- KPI: impresiones por página de servicio, CTR por página (las que tengan muchas impresiones y CTR bajo son candidatas a reescribir el title) y número de contactos por WhatsApp según el mensaje prerrellenado.

**Días 61-90: optimizar lo que funciona**
- Reforzar las páginas con impresiones pero en posiciones 8-20: ampliar FAQ y ejemplos, añadir casos reales y más enlaces internos desde el blog.
- Si tienes clientes reales de web: un caso de estudio por cliente (con su permiso), que es lo que más autoridad aporta.
- Valorar páginas nuevas solo si los datos lo justifican (por ejemplo, «reservas para restaurantes» si aparecen muchas consultas de ese sector).
- KPI: clics orgánicos, leads orgánicos por mes y conversión por página de destino.

**Indicadores a seguir** (Search Console + Web Analytics + registro manual de contactos): impresiones, clics, CTR y posición media por página; consultas; páginas indexadas; clics en WhatsApp, email y configurador; leads que vienen de búsqueda orgánica (pregunta «¿cómo me has encontrado?»); y conversión por página.

### Plan editorial priorizado (sin publicar en masa)

| Prioridad | Artículo | Intención | Servicio al que enlaza | Por qué |
|---|---|---|---|---|
| ✓ Publicado | Cuánto cuesta una página web para un negocio | Informativa → compra | Diseño web, reservas | Alta intención, y tus precios reales lo diferencian |
| A | Cómo añadir reservas online a la web de tu negocio (y cuándo no hace falta) | Informativa-comercial | Reservas | Responde la duda previa a la compra; ángulo «sin comisiones» |
| A | Web a medida o plataforma prediseñada: cómo decidir | Comparativa | Diseño web | Comparativa honesta, coherente con tu tono |
| B | Qué debe incluir el mantenimiento de una web (y qué no pagar) | Informativa-comercial | Mantenimiento | Competencia de agencias de WordPress; hueco para webs a medida |
| B | 5 tareas de una pyme que se pueden automatizar (con y sin IA) | Informativa | IA y automatización | Puedes usar ejemplos reales de Workly |
| B | Cómo integrar IA en un negocio pequeño sin que invente respuestas | Informativa | IA | Experiencia propia (demo, ResumeAI) |
| C | Cuándo necesita una empresa software a medida | Informativa | Aplicaciones | Ya hay una sección en la página; publícalo solo si las consultas lo piden |
| C | Qué necesita una web para captar clientes | Informativa | Diseño web | Muy competido y genérico; solo con ejemplos propios |

Cada artículo debe llevar tu experiencia real (casos, capturas, cifras propias) y enlaces a la página comercial correspondiente. Para crearlo: añade una entrada en `POSTS` y su página en `scripts/pages/blog.mjs`, y ejecuta `npm run build`.

## 13. Acciones manuales que te corresponden

1. **Revisar los textos** (§11.1) y fusionar la rama.
2. **Search Console**: verificar el dominio, enviar el sitemap y solicitar la indexación (§10).
3. **DNS**: `www` → redirección 301 al dominio raíz (§10).
4. **Aviso legal**: decidir si lo publicas con tu NIF y domicilio. Si me los das, creo la página.
5. **Foto y trayectoria** en «Sobre mí» (E-E-A-T). No los he inventado.
6. **Enlaces desde tus productos**: en el pie de resume-ai.dev y workly.space, «Hecho por SanchezDevelop» → `https://sanchezdevelop.com/proyectos/…/`. Son enlaces legítimos de proyectos propios.
7. **Perfiles legítimos** con enlace a la web y la misma descripción y foto en todos: LinkedIn, perfil de GitHub (bio y README del perfil), Malt (que ya domina las SERP de «freelance Málaga»), y opcionalmente Trustlocal o directorios profesionales serios. Nada de directorios masivos ni de compra de enlaces.
8. **Google Business Profile**: solo si cumples los requisitos. Google exige contacto en persona con los clientes. Si de verdad te reúnes con clientes en su local o en la zona de Málaga, puedes crear un perfil de **empresa de servicio a domicilio, con la dirección oculta** y la zona de servicio. Si trabajas solo en remoto, **no eres elegible**: no lo crees ni uses una dirección ficticia o virtual. El nombre del perfil debe ser el real («SanchezDevelop» o «Álvaro Sánchez»), sin palabras clave añadidas.
9. **Reseñas reales**: si tienes clientes, pídeles una reseña en Google (si tienes perfil) o un testimonio con permiso para publicarlo. Ni las inventes ni las marques con schema hasta que existan.
10. **Comunidades y autoridad**: artículos técnicos originales en dev.to o Medium (por ejemplo, «cómo valido en el servidor el JSON que genera GPT»), un lanzamiento de ResumeAI o Workly en Product Hunt y colaboraciones reales con diseñadores o agencias que te deriven trabajo.
11. **Correo profesional** (`hola@sanchezdevelop.com`): da más confianza que un Gmail. Si lo creas, cambia `EMAIL` en `scripts/lib/site.mjs` y en `index.html`.

## 14. Evidencias y problemas no resueltos

**Evidencias** (reproducibles con los comandos de §8):
- Producción antes: `curl -I https://sanchezdevelop.com/robots.txt` → `200 text/html`, y `/cualquier-cosa` → 200 con la portada.
- Después (emulador de Pages): ver la tabla de §8. Los 404, los 308, los tipos de contenido y las cabeceras están comprobados uno a uno.
- Lighthouse: informes JSON generados en la sesión. Las cifras están en §9.
- validator.schema.org: 0 errores en las 15 páginas, tras corregir las 2 propiedades que detectó.
- Capturas de ResumeAI y Workly tomadas de sus webs en producción (con los banners de cookies rechazados), convertidas a WebP.
- Historial de git de la rama `claude/seo-avanzado`, con un commit por bloque de trabajo.

**No resuelto:**
- **BLOQUEADO**: aviso legal completo (falta NIF y domicilio) · volúmenes de búsqueda y posiciones (no hay acceso a herramientas ni a Search Console) · verificación de Search Console y cambios de DNS (necesitan tus cuentas; además pediste no hacer cambios de DNS) · Prueba de resultados enriquecidos de Google (necesita una URL pública).
- **Decisión de diseño pendiente**: el contraste de las palabras sin iluminar de la frase animada.
- **No verificado en producción**: el `noindex` del alias `*.pages.dev` (la regla `https://:project.pages.dev/*` está documentada por Cloudflare, pero el emulador local no la reproduce). Compruébalo tras publicar: `curl -I https://<tu-proyecto>.pages.dev/ | grep -i robots`.
