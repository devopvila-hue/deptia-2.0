# ROSA — Deptia 2.0 (2026-10-30)

## Encargo

Rehacer la landing de Departify como propuesta comercial nueva (brief de Astra), sin tocar el repositorio `devopvila-hue/deptia` («mejor crear Deptia 2.0»). Del manual de marca solo se conserva el logo. Sin cambios de cobro, productos de Stripe ni despliegues.

## Veredicto

**PASS local** de implementación y calidad (v3: 68/68 en navegador, axe sin incidencias en ambos temas, Lighthouse móvil 86–96 / 100, ver QA). **No publicado**: hay bloqueos de producto antes de que esta página pueda sustituir a `departify.app` (ver `docs/VERIFICACION-AFIRMACIONES.md`).

## Estado

- Repositorio `devopvila-hue/deptia-2.0`: v1 en `main` (`667119c`). El operador la rechazó por el diseño («parece hecha con IA de prisa», sin modo oscuro). El operador también rechazó la v2 (público cerrado a reformas, interfaz inventada, dibujos infantiles). La v3 está en la rama `claude/elegant-heisenberg-7asako`: capturas reales del portal Glass White/Glass, seis sectores, «todo incluido», cinta de conectores y plan Empresa.

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
5. Con OK del operador: desplegar como vista previa (con `noindex`), revisar, migrar páginas legales y decidir la sustitución de `departify.app`.
