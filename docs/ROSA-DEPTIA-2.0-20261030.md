# ROSA — Deptia 2.0 (2026-10-30)

## Encargo

Rehacer la landing de Departify como propuesta comercial nueva (brief de Astra), sin tocar el repositorio `devopvila-hue/deptia` («mejor crear Deptia 2.0»). Del manual de marca solo se conserva el logo. Sin cambios de cobro, productos de Stripe ni despliegues.

## Veredicto

**PASS local** de implementación y calidad (v4: 69/69 en navegador, axe sin incidencias en ambos temas, Lighthouse móvil 92–95 / 100, ver QA). **No publicado**: hay bloqueos de producto antes de que esta página pueda sustituir a `departify.app` (ver `docs/VERIFICACION-AFIRMACIONES.md`).

## Estado

- Repositorio `devopvila-hue/deptia-2.0`: v1 en `main` (`667119c`). El operador la rechazó por el diseño («parece hecha con IA de prisa», sin modo oscuro). El operador también rechazó la v2 (público cerrado a reformas, interfaz inventada, dibujos infantiles). La v3 y la v4 están en la rama `claude/elegant-heisenberg-7asako`. La v3 añadió capturas reales del portal, seis sectores, «todo incluido», cinta de conectores y plan Empresa. El operador vio la v3 amontonada y plana. La v4 deja la primera pantalla en cuatro piezas, oscura por defecto y con el verde de marca, guarda el cristal para la ventana del producto, alinea los planes y añade la sección «Independencia» con Alberto.

- Proyecto independiente con la misma base técnica que la web actual (Next 14, Tailwind, next-intl, siete idiomas).
- `noindex` por defecto (`NEXT_PUBLIC_INDEXABLE`).
- Producción (`departify.app`, repo `deptia`) intacta. Portal intacto.
- Evidencia: `docs/QA-20261030.md`.

## Fuentes consultadas

- Código de `devopvila-hue/departify` en `ca4c619` (portal, backend, motor). La documentación antigua no se ha usado como prueba de disponibilidad.
- Landing actual `devopvila-hue/deptia` en `ab473d4`: rutas, alta (`/registro` → portal), slugs legales localizados.
- Founder Brain: en el repositorio solo existe como modelo de producto (`packages/business-discovery/src/models/founder-brain.ts`, perfil del fundador cliente para los empleados digitales), no como documento de estrategia de Departify. Si hay un Founder Brain en la memoria de OpenClaw de la VPS, no es accesible desde este entorno y no se ha consultado.
- Graphify: no consultado. No hay cambio estructural en un repositorio existente; el informe de Graphify de `deptia` estaba desfasado (11-09) según su propio ROSA.

## Siguiente paso exacto

1. Portal: abrir `AuthScreen` en modo registro cuando la ruta sea `/signup` (hoy el CTA de alta cae en «Entra en tu empresa»).
2. Confirmar en producción el aprovisionamiento de CRM y ERP para cuentas nuevas.
3. Validar los supuestos de `docs/PRECIOS-SUPUESTOS.md` con el registro de uso de Customer Zero.
4. Prueba de comprensión con cinco propietarios del perfil.
5. Operador: confirmar si Alberto (Desarrollo) entra en todos los planes; en código es `independent`.
6. Con OK del operador: desplegar como vista previa (con `noindex`), revisar, migrar páginas legales y decidir la sustitución de `departify.app`.

## Actualización 2026-11-03: capturas del portal

Las 48 capturas de `public/shots/` se hicieron el 30-10 14:05 UTC, antes de que el Glass con color entrara en `main` de departify (19:44 UTC). Se recapturaron desde `main` en `0094a13d` con `scripts/portal-shots/` (mismas dimensiones; `src/config/shots.ts` sin cambios). Tests 6/6 y typecheck PASS; hero revisado en claro y oscuro sin errores de consola. Sin publicar. Pendiente: si el botón de envío azul en reposo (`110d5ea1`) debe aparecer, hay que fusionarlo antes en departify y recapturar.

## Actualización 2026-11-03: Operaciones y Recursos humanos

El operador añadió los departamentos Operaciones y Recursos humanos en el portal (staging). Se añaden como dos filas sin nombre en «Ver el equipo completo» (`team.more`, siete idiomas). Textos propuestos y sin verificar: ver la fila nueva de `docs/VERIFICACION-AFIRMACIONES.md`. Las capturas del portal siguen mostrando 7 departamentos hasta que el cambio llegue a `main` del portal y se recapture. Tests 6/6. Sin publicar.

## Actualización 2026-11-03 (2): diagrama «Antes / Con Departify»

`src/components/connected.tsx` rehecho: geometría 400×300 sin estirar, cajas opacas sobre las líneas, curvas desde el centro y pulso animado solo con movimiento permitido (`.flow`). «Con Departify» pasa de 4 a 6 áreas (suma Operaciones y Recursos humanos, pendientes de verificar) y «Antes» de 6 a 8 herramientas (Proveedores y Hoja de personal, solo ilustrativas). Siete idiomas, tests 6/6, tipos y lint PASS, build PASS; revisado en oscuro, claro y móvil de 390 px. Sin publicar.
