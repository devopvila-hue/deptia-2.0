# Decisiones comerciales — Deptia 2.0

## Cliente al que se habla

Propietario de un negocio de 1 a 15 personas que ya vende pero sigue haciéndolo todo. La página lo dice en la primera línea («Para negocios de 1 a 15 personas») para que quien no encaje se dé cuenta pronto. No se escribe para desarrolladores ni para expertos en IA.

## Propuesta

- **Idea central:** «Tu negocio no debería depender de que tú lo hagas todo». No se vende otra herramienta; se vende dejar de ser el cuello de botella.
- **Dos capas inseparables:** las herramientas del negocio en un solo lugar y un equipo de empleados digitales que trabaja con ellas.
- **Promesa de control:** «Tu equipo se ocupa del trabajo. Tú decides lo importante». Se apoya en el flujo real de Aprobaciones.

## Recorrido

1. **Primera pantalla:** problema, solución, precio de entrada, CTA real y una vista del producto con lo hecho, lo que está en curso y lo que necesita al dueño. Todo visible sin desplazarse en escritorio (1440×900).
2. **Cómo funciona:** un caso completo en cinco pasos (consulta → ficha → propuesta → aprobación → seguimiento). Cada paso dice qué hace Departify y qué hace el dueño, y un indicador señala el único paso que le toca decidir. Marcado como ejemplo con datos ficticios.
3. **Qué incluye:** antes/después y cuatro bloques. Cada bloque explica cómo comparte información con los demás, no solo qué contiene. La tienda lleva la etiqueta «En pruebas» porque no cobra pagos reales.
4. **Equipo digital:** cuatro áreas principales y el resto desplegable. Cada tarjeta dice qué resuelve, qué entrega y para qué pide aprobación. Se explica qué es un empleado digital y que puede equivocarse.
5. **Control:** tres columnas (lo hace solo / te lo pide antes / siempre es tuyo) y cuatro objeciones respondidas con el comportamiento real.
6. **Planes:** tres planes con el producto completo en todos. Detalle desplegable. Límite, cobro y costes de terceros explicados.
7. **Preguntas y cierre:** seis preguntas de compra y uso. Cierre con el mismo CTA, sin oferta nueva.

## Información interna usada sin nombrar competidores

La sustitución de herramientas sueltas (publicación en redes, tienda, gestor de tareas, agenda, CRM, facturación e inventario, chat de IA, servicio técnico) se transmite con el antes/después y los cuatro bloques, sin nombrar marcas de terceros ni atribuirles costes. Solo se nombran como conexiones las herramientas que el producto integra de verdad.

## Lo que se ha descartado a propósito

- «15 empleados digitales»: no existe ese catálogo para el cliente. Se presenta el equipo real sin cifra.
- «24/7» y autonomía continua: sin respaldo. Solo se afirma que lo ya aprobado y programado sale a su hora.
- Prueba gratuita, «sin tarjeta», descuentos, testimonios, logos de clientes, cifras de ahorro y certificaciones.
- Vocabulario técnico (agentes, LLM, orquestación, ecosistema, «potenciado por IA»). Un test lo vigila en los siete idiomas.

## Diseño v3 (2026-10-30, tras la revisión del operador)

- **Público abierto.** Fuera «de 1 a 15 personas» y fuera el ejemplo único de reformas. La primera pantalla enseña seis tipos de negocio (clínica, tienda online, asesoría, agencia, academia y servicio técnico) y dice: «Para quien lleva su negocio solo y para quien dirige un equipo de 20 personas».
- **Todo incluido, explícito.** Etiqueta «CRM, ERP y redes incluidos» y sección «Todo lo que necesitas, incluido» justo después de la portada: CRM, ERP, publicación en redes, chat, tareas y agenda, y tienda en pruebas. Mensaje: sin pagar herramientas sueltas, importas tus datos y a trabajar.
- **Producto real.** Todas las imágenes de producto son capturas del portal en Glass White (claro) y Glass (oscuro): Inicio por sector, Chat y Aprobaciones, en es/en/ro. Las páginas en francés, alemán, italiano y húngaro muestran el portal en inglés, porque es como lo verá ese cliente.
- **Lenguaje visual del portal.** Gris #f6f6f6 con luz blanca, tarjetas blancas sólidas con filo y sombra suave, acento negro (blanco en oscuro) y tipografía Geist, la del portal.
- **Se recupera la cinta de herramientas** de la web anterior, con pausa y estática si se pide menos movimiento, y con los 21 conectores reales del catálogo (los de la web anterior incluían herramientas que no se conectan).
- **Se conserva** el diagrama antes/después que el operador aprobó.
- **Cuarto plan «Empresa»**, a medida, con «Hablemos».

## Diseño v2 (2026-10-30, descartado)

La primera versión se descartó porque parecía una plantilla: etiquetas de color sobre cada título, píldoras, iconos en círculos, listas con ✓, cajas de color y un panel de producto esquemático. La v2:

- **Producto como prueba.** La primera pantalla muestra una ventana del portal fiel a su estructura real: barra lateral con Inicio, Chat, Tareas, Aprobaciones, Calendario, Clientes y Facturación, botón «Encargar», decisiones pendientes, trabajo en curso y hecho. Lleva la etiqueta «Ejemplo».
- **El ejemplo de «Cómo funciona»** usa piezas reconocibles: bandeja de entrada, correo, ficha de cliente, propuesta en PDF, solicitud de aprobación y cita en la agenda. Un indicador dice en cada paso quién actúa: tu equipo digital o tú.
- **Diagrama antes/después** con líneas precisas: antes, tú en el centro de seis herramientas; ahora, Departify en el centro y tú conectado solo a lo importante.
- **Sin adornos.** Filetes finos en lugar de tarjetas, un punto de color como único marcador de estado (verde: lo hace solo; ámbar: te lo pide; negro: es tuyo) y ninguna etiqueta encima de los títulos.
- **Tipografía.** Inter con eje de tamaño óptico, alojada en el proyecto: corte Display en titulares y corte de texto en párrafos, con interletrado ajustado por tamaño.
- **Modo claro y oscuro.** Sigue la preferencia del sistema y tiene un selector que recuerda la elección. En oscuro el acento pasa al lima del propio símbolo D, con texto oscuro sobre él (14:1). Contraste AA comprobado con axe en ambos temas.

## Marca

Se conserva solo el logo oficial: símbolo D y logotipo. En claro, el texto del logotipo es oscuro; en oscuro se usa el original blanco. El símbolo no cambia. Acento: verde profundo en claro (5,4:1 con blanco) y lima en oscuro, ambos sacados del degradado del símbolo.

## Medición

La página envía a `dataLayer` estos eventos: `cta_signup_clicked`, `cta_login_clicked`, `how_it_works_clicked`, `scene_step_viewed`, `plan_selected`, con su ubicación. Los parámetros UTM, `gclid` y `fbclid` viajan al portal. Hoy no hay proveedor de analítica conectado ni línea base: hay que medir la web actual antes de atribuir mejoras.

El éxito no es el clic. Es el registro completado y la primera tarea útil, y ambos ocurren en el portal: hay que instrumentarlos allí con la misma atribución.

## Objetivo de comprensión (pendiente, no medido)

Cinco personas del perfil, diez segundos en la primera pantalla. Al menos cuatro deben explicar qué es Departify, qué trabajo les quita y cuál es el siguiente paso. No se ha realizado todavía.
