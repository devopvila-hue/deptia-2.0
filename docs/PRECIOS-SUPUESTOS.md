# Planes: propuesta y supuestos pendientes

Solo el punto de entrada de 49 €/mes viene fijado por el encargo. Todo lo demás es una hipótesis que hay que validar antes de cobrar.

## Propuesta

| | Esencial | Negocio | Crecimiento |
|---|---:|---:|---:|
| Precio (IVA no incluido, mensual) | 49 € | 99 € | 199 € |
| Trabajo de referencia | ~100 tareas/mes | ~400 tareas/mes | ~1.200 tareas/mes |
| Herramientas y equipo digital completo | Sí | Sí | Sí |
| Cuentas de correo conectadas | 1 | hasta 3 | hasta 10 |
| Ayuda | correo | prioritaria por correo | prioritaria + sesión de puesta en marcha |

Lógica: todos los planes dan el producto completo (el plan de entrada debe resolver el trabajo de verdad). Se diferencia por volumen, capacidad conectada y acompañamiento, no por recortar funciones. No se diferencia por usuarios porque hoy cada cuenta es para una sola persona.

«Tarea» se define en la página como un trabajo completo: responder una consulta, preparar una propuesta o redactar una publicación. Se dice «pensado para unas X», no «hasta X», porque el producto aún no cuenta tareas.

## Supuestos a validar

1. **Coste de modelo por tarea.** El modelo por defecto lo paga Departify con su clave y no está limitado por cliente (`departify-engine/scripts/render-config.mjs:73-87`). Con el registro de uso (`apps/backend/src/customer-zero/usage-ledger.ts`) hay que medir el coste medio y el percentil 90 por tarea en Customer Zero. Regla propuesta: coste de modelo ≤ 25 % del precio del plan con el volumen de referencia.
   - Esencial: 100 tareas × coste p90 ≤ 12 €.
   - Si el p90 supera ~0,12 €/tarea, bajar las tareas de referencia, no subir el precio de entrada.
2. **Mecanismo de límite.** Los presupuestos de IA diario/semanal/mensual ya existen pero están ocultos (`apps/backend/src/ai/budgets.ts`, `AiSettingsSection.tsx:20-26`). Propuesta: asignar un presupuesto mensual por plan y aviso al 80 %. La página promete: «Te avisamos antes… nunca cobramos nada extra sin tu permiso». Hay que implementarlo antes de cobrar.
3. **Coste de infraestructura por cliente.** CRM y ERP pueden aprovisionarse por empresa. Falta medir su coste unitario (instancia, base de datos, sincronización de correo).
4. **Cuentas de correo como palanca.** 1/3/10 supone que cada buzón añade coste de sincronización en segundo plano. Confirmar con datos; si el coste es despreciable, sustituirlo por otra palanca real.
5. **Ayuda prioritaria y sesión de puesta en marcha.** Son compromisos de servicio. Confirmar quién los presta y con qué tiempo de respuesta antes de publicarlos.
6. **IVA y periodicidad.** Precios sin IVA y pago mensual. Confirmar con asesoría (B2B en España; clientes particulares o de otros países).
7. **Sin descuento anual.** No se ofrece. Decidirlo con datos de retención.
8. **Baja y datos.** No se han inventado condiciones de baja. La página promete confirmarlas por escrito antes del primer cobro y permite pedir la eliminación de datos (existe la ruta).
9. **Costes de terceros.** Imágenes/vídeo con la cuenta del cliente y anuncios pagados quedan fuera del precio; está dicho en la página.

## Qué no se promete

Uso ilimitado, quince empleados trabajando sin parar, prueba gratuita, «sin tarjeta», descuentos o un plan «más vendido».
