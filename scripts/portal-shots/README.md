# Capturas del portal

Las imágenes de `public/shots/` son capturas reales del portal (`devopvila-hue/departify`, `apps/portal`) en los temas Glass White (claro) y Glass (oscuro), con sesión y API simuladas en local. Ninguna petición sale de la máquina y no se usa ningún dato real.

1. En `departify/apps/portal`: `pnpm install --filter @departify/portal`, luego `VITE_SUPABASE_URL=https://qygssfuqkqzrhwduafft.supabase.co VITE_SUPABASE_ANON_KEY=local-preview-not-a-key npx vite build` y `npx vite preview --port 20490 --host 127.0.0.1` con las mismas variables.
2. Aquí: `node portal-capture.cjs inicio`, `node portal-capture.cjs chat` y `node portal-capture.cjs aprobaciones`. Guarda los PNG en `portal-shots/`.
3. `python3 to-webp.py portal-shots ../../public/shots ../../src/config/shots.ts`.

Los datos de ejemplo por sector están en `sectors.cjs` (es, en, ro: los idiomas del portal). El botón interno «Probar onboarding» se oculta y la captura de Inicio se recorta bajo «Necesita tu atención» para no mostrar estimaciones de ahorro con cifras de ejemplo.
