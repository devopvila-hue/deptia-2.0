const { chromium } = require('playwright');
const { S, head } = require('./sectors.cjs');
const ORG = 'org-demo';
const PORTAL = 'http://127.0.0.1:20490';
const DAY = '2026-11-04';

const CONV = (lang) => ({ id: 'conv-1', organizationId: ORG, title: { es: 'Consulta de Laura sobre el tratamiento', en: "Laura's question about treatment", ro: 'Întrebarea Laurei despre tratament' }[lang], status: 'active', createdAt: `${DAY}T09:10:00`, updatedAt: `${DAY}T09:12:00`, lastMessageAt: `${DAY}T09:12:00`, aiProfile: 'departify' });
const CHAT = {
  es: [
    { id: 'm1', conversationId: 'conv-1', role: 'user', content: 'Laura ha escrito preguntando precio y disponibilidad para empezar la semana que viene. Prepárale una respuesta con el bono de 5 sesiones y dime qué huecos tengo.', createdAt: `${DAY}T09:10:00` },
    { id: 'm2', conversationId: 'conv-1', role: 'assistant', aiProfile: 'departify', content: 'Hecho. Te he preparado la respuesta para Laura:\n\n- **Bono de 5 sesiones:** 180 €, como en tu lista de precios.\n- **Huecos libres la semana que viene:** martes a las 10:00 y jueves a las 17:30, según tu agenda.\n- **Tono:** cercano, como tus otros correos.\n\nLa he dejado en **Aprobaciones**. No se envía hasta que la apruebes. ¿Quieres que también guarde a Laura en tus clientes?', createdAt: `${DAY}T09:11:00` },
  ],
  en: [
    { id: 'm1', conversationId: 'conv-1', role: 'user', content: 'Laura wrote asking about price and availability to start next week. Draft a reply with the 5-session pack and tell me which slots I have.', createdAt: `${DAY}T09:10:00` },
    { id: 'm2', conversationId: 'conv-1', role: 'assistant', aiProfile: 'departify', content: "Done. Here's the reply for Laura:\n\n- **5-session pack:** €180, as in your price list.\n- **Free slots next week:** Tuesday at 10:00 and Thursday at 17:30, from your calendar.\n- **Tone:** friendly, like your other emails.\n\nIt's waiting in **Approvals**. It won't be sent until you approve it. Shall I also save Laura to your customers?", createdAt: `${DAY}T09:11:00` },
  ],
  ro: [
    { id: 'm1', conversationId: 'conv-1', role: 'user', content: 'Laura a scris și întreabă de preț și disponibilitate ca să înceapă săptămâna viitoare. Pregătește-i un răspuns cu abonamentul de 5 ședințe și spune-mi ce intervale libere am.', createdAt: `${DAY}T09:10:00` },
    { id: 'm2', conversationId: 'conv-1', role: 'assistant', aiProfile: 'departify', content: 'Gata. Ți-am pregătit răspunsul pentru Laura:\n\n- **Abonament de 5 ședințe:** 180 €, ca în lista ta de prețuri.\n- **Intervale libere săptămâna viitoare:** marți la 10:00 și joi la 17:30, după calendarul tău.\n- **Ton:** apropiat, ca în celelalte e-mailuri.\n\nL-am lăsat în **Aprobări**. Nu se trimite până nu îl aprobi. Vrei să o salvez și pe Laura în lista de clienți?', createdAt: `${DAY}T09:11:00` },
  ],
};
const APPROVALS = Object.fromEntries(['es', 'en', 'ro'].map((lang) => [lang, [
  ['customer_service', { es: 'Enviar a Laura Gil la respuesta con el bono de 5 sesiones', en: 'Send Laura Gil the reply with the 5-session pack', ro: 'Trimite-i Laurei Gil răspunsul cu abonamentul de 5 ședințe' }, { es: 'Correo preparado con precio y dos huecos libres de tu agenda. Se enviará desde tu cuenta.', en: 'Email drafted with the price and two free slots from your calendar. It will be sent from your account.', ro: 'E-mail pregătit cu prețul și două intervale libere din calendar. Se trimite din contul tău.' }, null],
  ['marketing', { es: 'Publicar en Facebook la oferta de noviembre', en: 'Post the November offer on Facebook', ro: 'Publică pe Facebook oferta din noiembrie' }, { es: 'Texto e imagen listos para tu página. Programado para el jueves a las 18:00.', en: 'Copy and image ready for your page. Scheduled for Thursday at 18:00.', ro: 'Text și imagine gata pentru pagina ta. Programat joi la 18:00.' }, null],
  ['sales', { es: 'Guardar a 3 contactos nuevos en tus clientes', en: 'Save 3 new contacts to your customers', ro: 'Salvează 3 contacte noi în lista de clienți' }, { es: 'Llegaron por correo esta semana. Datos revisados y sin duplicados.', en: 'They arrived by email this week. Details checked, no duplicates.', ro: 'Au venit pe e-mail săptămâna aceasta. Date verificate, fără duplicate.' }, null],
].map(([dept, title, context, cost], i) => ({ id: `${dept}:${i}`, source: 'department_task', sourceId: `s${i}`, organizationId: ORG, departmentId: dept, title: title[lang], context: context[lang], cost, createdAt: `${DAY}T0${8 + i}:30:00.000Z`, version: 1, allowedActions: ['approve', 'reject'], deepLink: `/aprobaciones?decision=${dept}:${i}` }))]));

async function setup(page, { theme, lang, sector, screenName }) {
  const data = S[sector];
  await page.clock.setFixedTime(new Date(`${DAY}T09:41:00`));
  await page.addInitScript(({ ORG, theme, lang }) => {
    const b = (o) => btoa(JSON.stringify(o));
    const tok = b({ alg: 'HS256', typ: 'JWT' }) + '.' + b({ sub: 'user-demo', exp: 4102444800, role: 'authenticated' }) + '.sig';
    const session = { access_token: tok, refresh_token: 'r', token_type: 'bearer', expires_in: 3600, expires_at: 4102444800, user: { id: 'user-demo', email: 'owner@example.com', aud: 'authenticated' } };
    localStorage.setItem('sb-qygssfuqkqzrhwduafft-auth-token', JSON.stringify(session));
    localStorage.setItem('departify_customer_zero', JSON.stringify({ organizationId: ORG }));
    localStorage.setItem('departify-theme-preference', theme);
    localStorage.setItem('i18nextLng', lang);
    localStorage.setItem('departify-ui-locale', lang);
  }, { ORG, theme, lang });
  await page.route('**/auth/v1/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'user-demo', email: 'owner@example.com', aud: 'authenticated' }) }));
  await page.route('**/rest/v1/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  const decisions = screenName === 'aprobaciones'
    ? APPROVALS[lang].map((a, i) => ({ id: `d${i}`, head: head(lang, a.departmentId), proposal: a.title, detail: a.context, status: 'pending' }))
    : data.decisions.slice(0, 2).map(([dept, t], i) => ({ id: `d${i}`, head: head(lang, dept), proposal: t[lang], detail: '', status: 'pending' }));
  const times = ['08:12', '08:47', '09:05', '09:30'];
  const items = data.done.map(([dept, kind, min, t], i) => ({ id: `w${i}`, kind, title: t[lang], departmentId: dept, completedAt: `${DAY}T${times[i]}:00`, evidence: true, estimatedMinutes: min, target: { type: 'task', id: `t${i}` } }));
  const minutes = items.reduce((a, x) => a + x.estimatedMinutes, 0);
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const p = url.pathname;
    const j = (o) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(o) });
    if (p.endsWith('/me/preferences')) return j({ locale: lang, uiLocale: lang, contentLocale: lang, theme });
    if (p.includes('/organizations')) return j({ organizations: [{ organizationId: ORG, name: data.company[lang], role: 'owner' }] });
    if (p.endsWith('/progress')) return j({ organizationId: ORG, status: 'completed', stages: [], estimatedMs: null, understood: {} });
    if (p.endsWith('/overview')) return j({ organizationId: ORG, goal: '', companyName: data.company[lang], heads: [], decisions, activity: [], results: [], connections: [], working: 2, done: items.length });
    if (p.endsWith('/branding')) return j({ organizationId: ORG, companyName: data.company[lang], logoUrl: null });
    if (p.includes('/work-ledger')) return j({ organizationId: ORG, period: 'today', from: `${DAY}T00:00:00`, to: `${DAY}T23:59:59`, counts: { tasksCompleted: items.length, tasksWithEvidence: items.length, tasksWithoutEvidence: 0, approvalsResolved: 1, deliverables: items.filter((x) => x.kind === 'deliverable').length, repliesSent: 1 }, estimate: { minutes, estimated: true }, items });
    if (/\/departments\/marketing\/[^/]+\/approvals$/.test(p)) return j({ approvals: [] });
    if (/\/departments\/[a-z_]+\/[^/]+$/.test(p)) return j({ departmentId: 'marketing', head: { name: 'Elvira', role: 'Jefa de Marketing', initials: 'E' }, objectives: [], activity: [], approvals: [], employees: [], tools: [], connectedTools: [] });
    if (p.endsWith('/decisions')) return j({ organizationId: ORG, canResolve: true, nextCursor: null, total: APPROVALS[lang].length, items: APPROVALS[lang] });
    if (/\/conversations\/conv-1\/(active|turn)/.test(p)) return j({ active: false });
    if (/\/conversations\/conv-1\/progress$/.test(p)) return j({ conversationId: 'conv-1', status: 'idle', steps: [] });
    if (/\/conversations\/conv-1$/.test(p)) return j({ conversation: CONV(lang), messages: CHAT[lang], hasMore: false });
    if (p.endsWith('/conversations')) return j({ organizationId: ORG, conversations: [CONV(lang)], activeCount: 1, maxActive: 10 });
    if (p.endsWith('/conversations/history')) return j({ conversations: [CONV(lang)] });
    if (p.includes('/approvals')) return j({ organizationId: ORG, items: [], nextCursor: null, total: 0 });
    return j({ items: [], conversations: [], events: [], actions: [], tasks: [], results: [], newTasks: [], newResults: [], serverTime: `${DAY}T09:41:00Z`, profiles: [], models: [], organizationId: ORG });
  });
}

async function hideTestChrome(page) {
  // Hide the internal onboarding-test shortcut: it is not part of the customer view.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('button, a')) {
      const t = (el.textContent || '').trim();
      if (/(Probar onboarding|Test onboarding|Testați configurarea inițială)/i.test(t)) el.style.display = 'none';
    }
  });
}

(async () => {
  const [, , screen = 'inicio', onlySector, onlyLang, onlyTheme] = process.argv;
  const b = await chromium.launch();
  const sectors = screen === 'inicio' ? (onlySector && onlySector !== '-' ? [onlySector] : Object.keys(S)) : ['clinic'];
  const langs = onlyLang ? [onlyLang] : ['es', 'en', 'ro'];
  const themes = onlyTheme ? [onlyTheme] : ['glass-white', 'glass'];
  const paths = { inicio: '/inicio', chat: '/chat?c=conv-1', aprobaciones: '/aprobaciones' };
  for (const sector of sectors) for (const lang of langs) for (const theme of themes) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: lang });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.stack && e.stack.split('\n').slice(0, 4).join(' / '))); if (process.env.DEBUG) page.on('request', (r) => { if (r.url().includes('/api/')) console.log('REQ', new URL(r.url()).pathname + new URL(r.url()).search); });
    await setup(page, { theme, lang, sector, screenName: screen });
    await page.goto(PORTAL + paths[screen], { waitUntil: 'networkidle' });
    await page.waitForTimeout(3800);
    await hideTestChrome(page);
    await page.waitForTimeout(200);
    let clip;
    if (screen === 'inicio') {
      // Stop under "Needs your attention": the savings estimate below uses example numbers.
      const box = await page.evaluate(() => { const ul = document.querySelector('.dfy-list--decisions'); const card = ul && ul.closest('section, article, div[class*="card"]') || ul; const r = card.getBoundingClientRect(); return { bottom: r.bottom }; });
      clip = { x: 0, y: 0, width: 1440, height: Math.min(900, Math.round(box.bottom + 28)) };
    }
    const tag = screen === 'inicio' ? `inicio-${sector}` : screen;
    const out = `portal-shots/${tag}-${lang}-${theme === 'glass' ? 'dark' : 'light'}.png`;
    await page.screenshot({ path: out, clip });
    console.log(out, clip ? clip.height : '', errs.length ? errs.slice(0, 2) : '');
    await ctx.close();
  }
  await b.close();
})();
