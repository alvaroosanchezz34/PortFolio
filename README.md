# sanchezdevelop.com

Web de SanchezDevelop (Álvaro Sánchez, desarrollador Full Stack). HTML estático publicado con **Cloudflare Pages** desde la raíz del repositorio, más una Pages Function (`functions/api/preview.js`) para la demo con IA.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | Portada (editada a mano). Los bloques entre `<!-- jsonld:… -->` y `<!-- footmap:… -->` los genera el build. |
| `scripts/pages/*.mjs` | **Contenido de las páginas internas** (servicios, proyectos, blog, sobre mí, contacto, privacidad, 404). |
| `scripts/lib/` | Plantilla común (`layout.mjs`) y datos y componentes compartidos (`site.mjs`). |
| `*/index.html`, `404.html`, `sitemap.xml` | **Generados**: no los edites a mano. |
| `assets/` | CSS y JS de las páginas internas, fuentes autoalojadas, imágenes e imágenes para compartir (OG). |
| `robots.txt`, `_headers` | Rastreo y cabeceras de Cloudflare Pages. |
| `docs/seo/` | Auditoría e informe SEO. |

## Comandos (Node 18 o superior, sin dependencias)

```bash
npm run build   # genera las páginas internas, el sitemap y los bloques de la portada
npm run check   # valida titles, H1, canonical, OG, JSON-LD, enlaces, sitemap y robots
npm test        # build + check
```

Para probar el comportamiento real de Cloudflare Pages (404, redirecciones, `_headers`, Function): `npx wrangler pages dev .`

## Añadir una página o un artículo

1. Crea o edita un módulo en `scripts/pages/` (copia uno existente).
2. `npm test` y revisa que no haya errores.
3. Haz commit del módulo **y** de los HTML generados.
