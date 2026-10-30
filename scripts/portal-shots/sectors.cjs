// Example businesses for the landing screenshots (fictional data, three portal languages).
const H = {
  es: { sales: ['Ventas', 'Marcos', 'Jefe de Ventas'], customer_service: ['Atención al Cliente', 'Julio', 'Jefe de Atención al Cliente'], administration: ['Administración', 'Ana', 'Jefa de Administración'], marketing: ['Marketing', 'Elvira', 'Jefa de Marketing'], seo: ['SEO', 'Sandra', 'Jefa de SEO'] },
  en: { sales: ['Sales', 'Marcos', 'Head of Sales'], customer_service: ['Customer Service', 'Julio', 'Head of Customer Service'], administration: ['Administration', 'Ana', 'Head of Administration'], marketing: ['Marketing', 'Elvira', 'Head of Marketing'], seo: ['SEO', 'Sandra', 'Head of SEO'] },
  ro: { sales: ['Vânzări', 'Marcos', 'Șef Vânzări'], customer_service: ['Relații cu clienții', 'Julio', 'Șef Relații cu clienții'], administration: ['Administrație', 'Ana', 'Șefă Administrație'], marketing: ['Marketing', 'Elvira', 'Șefă Marketing'], seo: ['SEO', 'Sandra', 'Șefă SEO'] },
};
const S = {
  clinic: {
    company: { es: 'Clínica Fisio Sanz', en: 'Sanz Physio Clinic', ro: 'Clinica Fizio Sanz' },
    decisions: [
      ['customer_service', { es: 'Responder a 3 pacientes que piden cambiar su cita', en: 'Reply to 3 patients asking to move their appointment', ro: 'Răspunde la 3 pacienți care vor să își mute programarea' }],
      ['marketing', { es: 'Publicar en Facebook el consejo de postura del jueves', en: "Post Thursday's posture tip on Facebook", ro: 'Publică pe Facebook sfatul de postură de joi' }],
    ],
    done: [
      ['customer_service', 'reply_sent', 12, { es: '21 correos de pacientes ordenados por prioridad', en: '21 patient emails sorted by priority', ro: '21 de e-mailuri de la pacienți ordonate după prioritate' }],
      ['administration', 'task_completed', 15, { es: 'Citas de la semana pasadas a tu agenda', en: "This week's appointments added to your calendar", ro: 'Programările săptămânii trecute în calendar' }],
      ['sales', 'deliverable', 10, { es: 'Fichas de 4 pacientes nuevos preparadas', en: 'Records for 4 new patients prepared', ro: 'Fișe pentru 4 pacienți noi pregătite' }],
      ['marketing', 'deliverable', 25, { es: 'Calendario de publicaciones de noviembre', en: 'November posting calendar', ro: 'Calendarul de postări pentru noiembrie' }],
    ],
  },
  shop: {
    company: { es: 'Lúa Cosmética', en: 'Lúa Cosmetics', ro: 'Lúa Cosmetice' },
    decisions: [
      ['customer_service', { es: 'Responder a 5 clientes que preguntan por su pedido', en: 'Reply to 5 customers asking about their order', ro: 'Răspunde la 5 clienți care întreabă de comandă' }],
      ['marketing', { es: 'Publicar la promoción del fin de semana en Facebook', en: 'Post the weekend promotion on Facebook', ro: 'Publică promoția de weekend pe Facebook' }],
      ['sales', { es: 'Enviar la propuesta de venta al por mayor a Farmacia Ríos', en: 'Send the wholesale proposal to Ríos Pharmacy', ro: 'Trimite oferta en-gros către Farmacia Ríos' }],
    ],
    done: [
      ['customer_service', 'reply_sent', 14, { es: 'Consultas de clientes clasificadas por tema', en: 'Customer questions grouped by topic', ro: 'Întrebările clienților grupate pe teme' }],
      ['marketing', 'deliverable', 40, { es: 'Textos para 12 fichas de producto', en: 'Copy for 12 product pages', ro: 'Texte pentru 12 pagini de produs' }],
      ['seo', 'deliverable', 30, { es: 'Revisión de la web para mejorar en Google', en: 'Website review to rank better on Google', ro: 'Analiza site-ului pentru Google' }],
      ['administration', 'deliverable', 15, { es: 'Resumen de pedidos de la semana en PDF', en: "This week's orders summarised in a PDF", ro: 'Rezumatul comenzilor săptămânii în PDF' }],
    ],
  },
  advisory: {
    company: { es: 'Asesoría Prado', en: 'Prado Accountants', ro: 'Consultanță Prado' },
    decisions: [
      ['administration', { es: 'Enviar a 12 clientes el recordatorio del trimestre', en: 'Send the quarter reminder to 12 clients', ro: 'Trimite memento-ul trimestrial către 12 clienți' }],
      ['sales', { es: 'Enviar la propuesta de servicios a Taller Gómez', en: 'Send the services proposal to Gómez Garage', ro: 'Trimite oferta de servicii către Service Gómez' }],
    ],
    done: [
      ['customer_service', 'reply_sent', 18, { es: 'Correo del día ordenado: 34 mensajes', en: "Today's email sorted: 34 messages", ro: 'E-mailul zilei ordonat: 34 de mesaje' }],
      ['administration', 'deliverable', 20, { es: 'Lista de documentos pendientes por cliente', en: 'List of missing documents per client', ro: 'Lista documentelor lipsă pe client' }],
      ['sales', 'deliverable', 25, { es: 'Propuesta en PDF para Taller Gómez', en: 'PDF proposal for Gómez Garage', ro: 'Ofertă PDF pentru Service Gómez' }],
      ['marketing', 'deliverable', 35, { es: 'Artículo para el blog sobre el cierre del año', en: 'Blog post about year-end closing', ro: 'Articol de blog despre închiderea anului' }],
    ],
  },
  agency: {
    company: { es: 'Estudio Nova', en: 'Nova Studio', ro: 'Studio Nova' },
    decisions: [
      ['sales', { es: 'Enviar el presupuesto de identidad visual a Café Brote', en: 'Send the brand identity quote to Brote Café', ro: 'Trimite oferta de identitate vizuală către Café Brote' }],
      ['marketing', { es: 'Publicar el caso de Hotel Mar en Facebook', en: 'Post the Hotel Mar case study on Facebook', ro: 'Publică studiul de caz Hotel Mar pe Facebook' }],
    ],
    done: [
      ['sales', 'deliverable', 20, { es: 'Briefing de Café Brote resumido', en: 'Brote Café brief summarised', ro: 'Briefingul Café Brote rezumat' }],
      ['sales', 'deliverable', 30, { es: 'Propuesta en PDF para Café Brote', en: 'PDF proposal for Brote Café', ro: 'Ofertă PDF pentru Café Brote' }],
      ['administration', 'task_completed', 5, { es: 'Reunión con Hotel Mar en tu agenda', en: 'Hotel Mar meeting in your calendar', ro: 'Întâlnirea cu Hotel Mar în calendar' }],
      ['marketing', 'deliverable', 25, { es: 'Ideas de contenido para dos semanas', en: 'Content ideas for the next two weeks', ro: 'Idei de conținut pentru două săptămâni' }],
    ],
  },
  academy: {
    company: { es: 'Academia Kira', en: 'Kira Academy', ro: 'Academia Kira' },
    decisions: [
      ['customer_service', { es: 'Responder a 7 familias que piden información del curso', en: 'Reply to 7 families asking about the course', ro: 'Răspunde la 7 familii care cer informații despre curs' }],
      ['administration', { es: 'Enviar el recordatorio de matrícula de enero', en: 'Send the January enrolment reminder', ro: 'Trimite memento-ul de înscriere pentru ianuarie' }],
    ],
    done: [
      ['customer_service', 'reply_sent', 16, { es: 'Solicitudes de información ordenadas por curso', en: 'Information requests sorted by course', ro: 'Cererile de informații ordonate pe cursuri' }],
      ['administration', 'task_completed', 10, { es: 'Clases de prueba de la semana en tu agenda', en: "This week's trial classes in your calendar", ro: 'Lecțiile de probă ale săptămânii în calendar' }],
      ['marketing', 'deliverable', 30, { es: 'Folleto del curso de verano en PDF', en: 'Summer course brochure as a PDF', ro: 'Broșura cursului de vară în PDF' }],
      ['sales', 'deliverable', 12, { es: '9 interesados preparados para tu lista', en: '9 interested contacts ready for your list', ro: '9 persoane interesate pregătite pentru listă' }],
    ],
  },
  service: {
    company: { es: 'Climatiza Norte', en: 'North Climate Services', ro: 'Climatiza Nord' },
    decisions: [
      ['sales', { es: 'Enviar el presupuesto de mantenimiento a Comunidad Olivo 14', en: 'Send the maintenance quote to Olivo 14 residents', ro: 'Trimite oferta de mentenanță către Asociația Olivo 14' }],
      ['customer_service', { es: 'Responder a 4 avisos de avería recibidos hoy', en: 'Reply to 4 breakdown reports received today', ro: 'Răspunde la 4 sesizări de avarie primite azi' }],
    ],
    done: [
      ['customer_service', 'reply_sent', 12, { es: 'Avisos de avería clasificados por urgencia', en: 'Breakdown reports sorted by urgency', ro: 'Sesizările de avarie ordonate după urgență' }],
      ['administration', 'task_completed', 15, { es: 'Visitas de mañana ordenadas por zona', en: "Tomorrow's visits sorted by area", ro: 'Vizitele de mâine ordonate pe zone' }],
      ['sales', 'deliverable', 25, { es: 'Presupuesto en PDF para Comunidad Olivo 14', en: 'PDF quote for Olivo 14 residents', ro: 'Ofertă PDF pentru Asociația Olivo 14' }],
      ['marketing', 'deliverable', 20, { es: 'Publicación sobre revisiones antes del invierno', en: 'Post about pre-winter servicing', ro: 'Postare despre revizii înainte de iarnă' }],
    ],
  },
};
function head(lang, dept) {
  const [department, name, role] = H[lang][dept];
  return { departmentId: dept, department, name, initials: name[0], role };
}
module.exports = { S, head };
