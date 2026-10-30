# Deptia 2.0 — landing de Departify

Nueva landing comercial, separada de `devopvila-hue/deptia` (la web actual en `departify.app` no se toca).

Next.js 14 (App Router) + Tailwind + next-intl, la misma base técnica que la web actual. Una sola página en siete idiomas: es (por defecto, sin prefijo), en, fr, de, it, ro, hu. Tema claro y oscuro (preferencia del sistema + selector). Tipografía Inter con eje óptico, alojada.

## Uso

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm test             # paridad de idiomas, afirmaciones vetadas, planes
BASE_URL=http://localhost:3000 npm run qa   # navegador: 7 idiomas × 4 anchos + teclado y movimiento reducido
```

La prueba de navegador usa Playwright, que no está en las dependencias (se espera instalado en el entorno). Si `axe-core` es resoluble (por ejemplo con `NODE_PATH`), también audita accesibilidad y contraste en ambos temas.

## Estructura

- `messages/*.json`: todo el texto público, un fichero por idioma. El español es la fuente.
- `src/components/*`: una sección por fichero (hero, scene, connected, team, control, pricing, faq, closing).
- `src/config/links.ts`: destinos reales (alta y acceso en el portal, páginas legales de la web actual).
- `src/config/plans.ts`: precios. Solo los 49 € de entrada están decididos.
- `docs/`: decisiones, supuestos de precios, verificación de cada afirmación y QA.

## Variables de entorno

| Variable | Por defecto | Efecto |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://departify.app` | URL canónica, hreflang, sitemap e imagen social |
| `NEXT_PUBLIC_INDEXABLE` | sin definir | Si no es `true`, la página lleva `noindex` y `robots.txt` bloquea el rastreo, para que una vista previa no compita con la web actual |

## Antes de publicar

Ver `docs/VERIFICACION-AFIRMACIONES.md`, sección «Bloqueos antes de publicar».
