# Identidad de Kódika

Basada en la **opción 2** de las propuestas de rebranding: la «K» de marca es a la vez la primera letra del logotipo y el icono, así que el favicon, la foto de perfil y el logo cuentan lo mismo.

## Logotipo

- **Se escribe KODIKA, sin tilde**, en el logotipo. En los textos se escribe siempre **Kódika**.
- La K de marca tiene tres piezas: el tramo alto del palo y la pierna en blanco (u oscuro), y una **banda azul en diagonal** que sube desde abajo a la izquierda. El resto de letras son Sora Bold; la A va sin travesaño (Λ).
- El lema **DESIGN. CODE. SOLVE.** («CODE.» en azul) solo acompaña al logotipo (redes, firma, imagen para compartir). No se usa en titulares: la web está en español.

| Fichero | Uso |
|---|---|
| `assets/brand/kodika-logo.svg` | Logotipo para fondo oscuro (también `assets/img/kodika.svg`, el de la cabecera y el pie) |
| `assets/brand/kodika-logo-oscuro.svg` | Logotipo para fondo claro (facturas, PDF, papel) |
| `assets/brand/kodika-logo-lema.svg`, `kodika-logo-oscuro-lema.svg` | Logotipo con el lema |
| `assets/brand/kodika-simbolo.svg` | La K sola, sin fondo |
| `assets/brand/kodika-icono.svg`, `kodika-icono-512.png` | Icono de app con borde azul. El PNG es el logo de los datos estructurados |
| `assets/brand/kodika-perfil-1024.png` | Foto de perfil para redes (cuadrada, sin esquinas: cada red las recorta) |
| `assets/img/logo.svg`, `favicon.ico`, `assets/img/favicon-96.png`, `apple-touch-icon.png` | Favicons. La versión pequeña no lleva borde y la K es más grande para leerse a 16 px |
| `assets/og/kodika.png` | Imagen para compartir (1200×630) |

Margen de respeto: deja alrededor del logotipo al menos la altura de la «O». Tamaño mínimo: 16 px de alto en pantalla.

## Color

| Nombre | Valor | Uso |
|---|---|---|
| Azul Kódika | `#2B66F7` | Botones, rellenos, la banda de la K. Texto blanco encima: 4,8:1 (AA) |
| Azul claro | `#6B97FF` | Palabras destacadas, enlaces y detalles sobre fondo oscuro: 6,8:1 |
| Fondo | `#0B0F1A` | Fondo general |
| Superficie | `#111725` / `#1A2233` | Tarjetas, formularios, bloques alternos |
| Gris | `#94A3B8` | Texto secundario (7,5:1 sobre el fondo) |
| Blanco | `#F8FAFC` | Texto principal |

El azul principal se movió un poco respecto a la propuesta (`#3B82F6`, `#1E40AF` y `#1F2937` son los colores por defecto de Tailwind) para que sea propio y para que el texto blanco sobre los botones cumpla el contraste mínimo.

En la web son variables de `assets/css/site.css` (`--accent`, `--accent-hi`, `--bg`…).

## Tipografía

- **Sora** (OFL, autoalojada en `assets/fonts/sora-*.woff2`) para todo el sitio: titulares en 600–650, texto en 400.
- **JetBrains Mono** para etiquetas pequeñas en mayúsculas (antetítulos, migas, metadatos).
- Las palabras clave de los titulares van en Azul claro, no en cursiva.
- Las demos conservan sus propias tipografías (son negocios ficticios con su identidad); solo la barra, el cierre y la pastilla de Kódika usan Sora.

## Regenerar los ficheros

Los SVG de `assets/brand/` son la fuente. Los PNG y el ICO se obtienen renderizando esos SVG (por ejemplo, con Playwright o cualquier editor vectorial) a 16, 32, 48, 96, 180, 512 y 1024 px.
