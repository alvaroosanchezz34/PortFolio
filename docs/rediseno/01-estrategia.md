# Rediseño de SanchezDevelop · Estrategia de implementación

## Punto de partida (inspección)
- **Stack real:** HTML estático en Cloudflare Pages, sin framework ni dependencias. Las páginas internas se generan con `scripts/build.mjs` (Node, sin dependencias), y hay una Pages Function (`functions/api/preview.js`) para la demo con IA.
- **Decisión:** se mantiene el stack. No hay React, Next.js ni Tailwind en el proyecto, y migrar solo para animar cuatro elementos añadiría dependencias, build y riesgo sin una ventaja real para el visitante. El motion se hace con CSS, IntersectionObserver y Web Animations, que son nativos, ligeros y respetan `prefers-reduced-motion`.
- **Se elimina Lenis** (el smooth scroll): secuestra el scroll, y el brief pide evitarlo.

## Dirección de arte
- **Fondo oscuro como dirección principal** (`#0b0b0c`), texto marfil cálido y **un único acento azul eléctrico**, que sale del logotipo. Nada de gradientes morados.
- **Tipografía:** Inter Tight para los titulares (grandes, con el tracking muy cerrado), **Instrument Serif en cursiva** para las palabras clave, como en una revista, y **JetBrains Mono** para las etiquetas técnicas e índices de sección (`(02) Demos`). Es la mezcla de editorial e interfaz que pide el brief.
- Composiciones asimétricas, líneas finas en lugar de cajas, mucho aire, grano sutil y luz ambiental.

## Home (narrativa comercial)
1. Hero con propuesta de valor y una composición de fragmentos de interfaz reales de las demos (buscador, producto, reserva, KPI), con parallax suave.
2. Demos: seis piezas con distinto tamaño y la tipografía de cada marca, más la demo con IA para cualquier sector.
3. Servicios explicados como resultados de negocio.
4. Beneficios.
5. Proceso.
6. Diferenciación, con las tecnologías como prueba de capacidad.
7. Configurador de presupuesto (se conserva).
8. FAQ.
9. Contacto (formulario honesto que prepara el mensaje en WhatsApp o email) y footer.

## Demos (`/demos/<slug>/`)
- Cada demo tiene su propia página, CSS, JS, tipografía, paleta y fotografía. Los datos (inmuebles, productos, etc.) están en módulos que el build convierte en HTML, y el JS añade la interacción encima.
- Un kit común mínimo (`assets/demos/kit.*`) aporta la barra «Demo ficticia», la validación de formularios, un router por hash para las fichas y un almacenamiento local seguro.
- **Honestidad:** todo está marcado como ficticio. Los formularios validan pero **no envían nada** (y lo dicen). No hay pagos ni se piden datos financieros. Los datos de Flowbook y del carrito se guardan solo en el navegador.
- Las demos llevan `noindex`, para que Google no las muestre como negocios reales. El índice `/demos/` sí es indexable.

## Proyectos actuales
- Se retiran de todo lo público: la home, `/proyectos/`, las páginas de servicio, «Sobre mí», el JSON-LD, las capturas y las imágenes OG. Producción nunca llegó a publicar `/proyectos/`, así que no hace falta ninguna redirección.
- `check.mjs` incorpora una lista de términos prohibidos para garantizar que no vuelven a aparecer.
- Los repositorios y el código de esos proyectos no se tocan. La documentación SEO anterior (`docs/seo/`) los menciona como histórico, pero `_redirects` impide abrir `docs/` desde la web.

## Fotografía
- Las fotos son de Unsplash (Unsplash License: uso comercial gratuito, se pueden descargar y autoalojar), revisadas una a una. Se han descartado las que muestran marcas o logos en productos y las matrículas en primer plano. Se sirven en WebP a 800 y 1600 px, con `srcset` y carga diferida.
- **Veloce** se plantea como concesionario **multimarca** con unidades, kilometrajes y precios ficticios, como lo haría un concesionario real. Las especificaciones son orientativas del modelo.
