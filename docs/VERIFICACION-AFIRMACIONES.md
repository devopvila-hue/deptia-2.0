# Verificación de afirmaciones comerciales — Deptia 2.0

Fecha: 2026-10-30. Fuente: código de `devopvila-hue/departify` en `ca4c619` (main, 2026-10-30). Las rutas son de ese repositorio. La documentación antigua no se ha usado como prueba.

Veredictos: **VERIFICADO** (en código), **CONDICIONADO** (existe, pero depende de configuración de producción no visible desde el repo), **NO USADO** (no respaldado; fuera de la landing).

## Lo que la landing afirma

| Afirmación en la página | Veredicto | Evidencia |
|---|---|---|
| Alta con Google, Microsoft o correo | VERIFICADO | `apps/portal/src/routes/AuthScreen.tsx:31,45-52,159-170` |
| Aprobaciones: aprobar/rechazar, ver la propuesta completa, deshacer en segundos | VERIFICADO | `apps/portal/src/routes/DecisionsRoute.tsx:53,61,402-403`; `apps/backend/src/customer-zero/decisions.ts:13-20` |
| Piden aprobación: enviar/responder correo, publicar en Facebook, escribir en Drive/Docs/Sheets, guardar contactos en el CRM, activar secuencias | VERIFICADO | `apps/backend/src/customer-zero/tool-contract-business-shadow.ts:181-214`; `crm-tool-catalog.ts:1228,1343,1378` |
| Sin aprobación: crear citas, tareas y PDF | VERIFICADO | `tool-contract-business-shadow.ts:184` |
| Pedir cambios en el chat antes de aprobar | VERIFICADO (correo) | `apps/backend/src/customer-zero/pending-email.ts:20-29,275-280`. No existe botón «pedir cambios»: la página no lo promete |
| Lo programado sale a su hora sin estar conectado (publicación) | VERIFICADO si los workers están activos | `apps/backend/src/server/server.ts:137-170` |
| 7 áreas: Dirección, Marketing, SEO, Ventas, Atención al cliente, Administración, Desarrollo; nombres Elvira, Sandra, Marcos, Julio, Ana, Alberto; especialistas de contenido, redes y publicidad | VERIFICADO | `apps/backend/src/customer-zero/department-identity.ts:29-37,108-179`; `marketing-roster.ts:13-33` |
| Áreas «Operaciones» y «Recursos humanos» (9 en total con las 7 anteriores), sin nombre de empleado | PENDIENTE: staging, sin verificar | Dato del operador (2026-11-03): añadidas en el portal, aún en staging. No se ha consultado el código a petición suya. Textos de la web redactados como propuesta y sin nombre propio; confirmar qué hace cada área y su nombre antes de publicar. No publicar la web con estas dos filas hasta verificarlas |
| Bandeja de correo unificada | VERIFICADO | `apps/portal/src/app/router.tsx` (`/inbox`) |
| Calendario conectado (Google Calendar: leer y crear eventos) | VERIFICADO | `apps/backend/src/customer-zero/gmail-adapter.ts:40-121` |
| Tareas con responsable y fecha | VERIFICADO | `/tareas` en `router.tsx` |
| Partes de trabajo con firma; «listo para facturar» | VERIFICADO | `apps/backend/src/customer-zero/field-service.ts:1-39`. «Facturada» es un estado: no crea la factura en el ERP, y la página no dice que la cree |
| Presupuestos, facturas, compras e inventario | CONDICIONADO | ERP activo en `product-catalog.ts:50-61`, pero el menú solo aparece con permiso por variables de entorno (`product-catalog.ts:84-97`) |
| Fichas de clientes / CRM | CONDICIONADO | `crm-workspace-gateway.ts:40-52`, `workspace-provisioning.ts:6-8`: lista permitida o `DEPARTIFY_WORKSPACE_AUTO_PROVISION=true` |
| Publicar en una página de Facebook | VERIFICADO | `studio-channel-capabilities.ts:4-15`. Instagram, LinkedIn, TikTok y X bloqueados: la página solo nombra Facebook |
| Tienda online «En pruebas», sin pagos reales | VERIFICADO | `native-storefront.ts:23`; textos del portal «Tienda de prueba — no se realizan cobros» |
| Conexiones: Gmail, Outlook, Google Calendar, Google Drive, Facebook, Shopify, WordPress, Google Analytics; algunas solo lectura | VERIFICADO | `apps/backend/src/customer-zero/connections.ts:138-500` |
| Imágenes y vídeo con la cuenta del propio cliente | VERIFICADO | `studio-providers.ts:1-35` |
| La app está en español, inglés y rumano; el equipo responde en el idioma del usuario | VERIFICADO | `apps/portal/src/i18n/locales.ts:9-11`; `apps/backend/src/customer-zero/locale.ts:79-85` |
| Una persona por cuenta; sin invitaciones | VERIFICADO | `apps/portal/src/i18n/locales/es/connections.json:288` |
| Solicitar la eliminación de datos | VERIFICADO | `/en/data-deletion` en `router.tsx:131` |

## Añadido en la v3 (2026-10-30)

| Afirmación | Veredicto | Evidencia o condición |
|---|---|---|
| «CRM, ERP y redes incluidos» en todos los planes | CONDICIONADO | CRM y ERP existen y se abren en el portal, pero dependen del aprovisionamiento por empresa (`crm-workspace-gateway.ts:40-52`, `product-catalog.ts:84-97`). Redes = Facebook Pages (`studio-channel-capabilities.ts:4-15`) |
| «Importas tus datos y a trabajar», «sin pagar herramientas sueltas» | PENDIENTE | Petición del operador. Falta verificar la importación de clientes en el CRM y de artículos/facturas en el ERP (repos `departify-crm` y `departify-erp`, no accesibles en esta sesión) |
| «Para quien lleva su negocio solo y para quien dirige un equipo de 20 personas» | CONDICIONADO | Habla del tamaño del negocio. Hoy cada cuenta es para una persona y no hay invitaciones (`connections.json:288`); la FAQ lo dice |
| Plan Empresa «A medida» con «Hablemos» | PENDIENTE | Compromisos comerciales (volumen, acompañamiento, facturación a medida) a confirmar por el operador. El botón abre la página de contacto actual (`/contacto?plan=empresa`) |
| Capturas de producto | VERIFICADO | Son el portal real (`apps/portal` compilado) en Glass White y Glass, con datos de ejemplo simulados; scripts en `scripts/portal-shots/`. Recapturadas el 2026-11-03 desde `devopvila-hue/departify` `main` en `0094a13d`, que ya incluye el Glass con color (`832b8886`, 2026-10-30) y no incluye el botón de envío azul en reposo (`110d5ea1`, aún fuera de `main`) |

## Añadido en la v4 (2026-10-30)

| Afirmación | Veredicto | Evidencia o condición |
|---|---|---|
| Alberto, responsable de Desarrollo | VERIFICADO | `apps/backend/src/customer-zero/department-identity.ts:70-79` («Crea, mejora y mantiene la tecnología de tu empresa») |
| Planifica, implementa sobre repositorios autorizados, verifica (tests, tipos, build), revisa y comprueba la seguridad | VERIFICADO | `developer-capabilities.ts:16-22`, estado `certified` tras el E2E real del 2026-08-30 |
| Crea el repositorio en tu GitHub y el proyecto en tu Vercel, con tu aprobación | VERIFICADO (contrato) | `tool-contract-business-shadow.ts:212-213`: `requiresApproval: true`, certificación `PASS_CONTRACT` (contrato, no prueba real con cuenta de cliente) |
| «El código es tuyo, aunque un día te vayas» | VERIFICADO (contrato) | El destino es la cuenta conectada del cliente (`targetType` en las mismas líneas) |
| «Crea tu web, tu tienda online y pequeñas apps»; «sin pagar una suscripción por cada cosa» | CONDICIONADO | Petición del operador. La capacidad es genérica (implementar en un repositorio); no hay una prueba de extremo a extremo de una web o tienda completa para un cliente. Una tienda creada así no cobra sin un proveedor de pagos del cliente. Los ejemplos de apps (reservas, pedidos, portal) son ilustrativos y van marcados con «por ejemplo» |
| Alberto incluido en todos los planes | PENDIENTE | En código, Desarrollo es `defaultIncluded: false` y `entitlement: "independent"` (`department-identity.ts:74-76`). La sección de planes dice «equipo digital completo» en todos: el operador debe confirmar el empaquetado |

## Lo que la landing NO afirma (y por qué)

| Idea del encargo o de la web actual | Motivo |
|---|---|
| «15 empleados digitales» | No existe un catálogo de 15 visible al cliente. Lo único que suma 15 son capacidades internas de marketing (`packages/marketing-director/src/catalog/marketing-capabilities.ts:5-101`) |
| «24/7», trabajo autónomo continuo | No hay agentes proactivos. Las tareas recurrentes se guardan pero ningún proceso las ejecuta (`scheduled-tasks.ts:89,124`) |
| «Sin tarjeta», «prueba gratuita», «30 días para descargar» (web actual) | No hay cobro ni condiciones implementadas (`product-catalog.ts:13-19`) |
| Reservas de citas por clientes | No hay módulo de reservas; `calendar.departify.app` no está en los repositorios accesibles |
| `task.departify.app` | No está en los repositorios accesibles. Se usan las tareas del portal |
| Publicar en Instagram, LinkedIn, TikTok o X | Bloqueado en código |
| Reglas de aprobación configurables | «La edición de estas reglas todavía no está disponible» (`connections.json:308-312`) |
| Avisos por correo o móvil | Push solo con claves VAPID/FCM configuradas; el portal dice que no se envían avisos por email |

## Bloqueos antes de publicar

1. **El CTA principal acaba en la pantalla de inicio de sesión.** `/signup` no existe: cae en el comodín `*` → `/` → `AuthScreen` en modo «login» (`router.tsx:238`, `AuthScreen.tsx:31`). Cambio mínimo en el portal: abrir en modo registro cuando la ruta sea `/signup`.
2. **CRM y ERP para cuentas nuevas.** Confirmar en producción `DEPARTIFY_WORKSPACE_AUTO_PROVISION` y el permiso de producto del ERP. Sin eso, un cliente nuevo no ve dos de los cuatro bloques vendidos.
3. **Verificación OAuth de Google no enviada** (`docs/customer-zero/GOOGLE-OAUTH-VERIFICACION-20261012.md`). Conectar Gmail/Drive desde cuentas externas mostrará avisos de app no verificada y tiene límite de usuarios.
4. **Sin cobro.** Los precios se muestran, pero no existe suscripción ni límites por plan. La página promete confirmar plan y condiciones por escrito antes del primer cobro: hay que cumplirlo manualmente o implementar el cobro.
5. **Importación y plan Empresa.** Confirmar la importación de datos en CRM y ERP y los compromisos del plan Empresa antes de publicar.
6. **Páginas legales.** El pie enlaza a las páginas legales de la web actual. Si esta versión sustituye a `departify.app`, hay que migrarlas antes.
