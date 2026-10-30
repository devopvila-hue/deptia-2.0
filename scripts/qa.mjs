// Browser acceptance for the landing: run against a production server.
//   BASE_URL=http://localhost:3100 node scripts/qa.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

// Playwright is pre-installed globally in CI images; fall back to a local install if present.
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = process.env.BASE_URL || "http://localhost:3100";
const locales = ["es", "en", "fr", "de", "it", "ro", "hu"];
const widths = [320, 390, 768, 1440];
const bcp = { es: "es-ES", en: "en", fr: "fr-FR", de: "de-DE", it: "it-IT", ro: "ro-RO", hu: "hu-HU" };
const results = [];
const fail = (name, detail) => results.push({ ok: false, name, detail });
const pass = (name) => results.push({ ok: true, name });

const browser = await chromium.launch();
for (const locale of locales) {
  const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const url = `${BASE}/${locale === "es" ? "" : locale}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    const name = `${locale}@${width}`;
    if (res?.status() !== 200) { fail(name, `HTTP ${res?.status()}`); await ctx.close(); continue; }
    const data = await page.evaluate(() => {
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > window.innerWidth + 1 && !el.closest(".overflow-x-auto")) offenders.push(el.tagName + "." + (el.className?.toString?.() || "").slice(0, 40));
      }
      return {
        lang: document.documentElement.lang,
        h1: document.querySelector("h1")?.textContent?.trim(),
        h1Count: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        offenders: offenders.slice(0, 5),
        signup: [...document.querySelectorAll('a[href^="https://app.departify.app/signup"]')].length,
        login: [...document.querySelectorAll('a[href^="https://app.departify.app/login"]')].length,
        anchors: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")),
        ids: [...document.querySelectorAll("[id]")].map((e) => e.id),
        imgsNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
        smallTargets: [...document.querySelectorAll("a, button, summary")].filter((e) => {
          const r = e.getBoundingClientRect();
          // Visually hidden skip link (1×1 until focused) is exempt.
          return r.width > 1 && r.height > 1 && r.height < 24 && getComputedStyle(e).display !== "inline";
        }).length,
      };
    });
    const problems = [];
    if (errors.length) problems.push(`console: ${errors.join(" | ")}`);
    if (data.lang !== bcp[locale]) problems.push(`lang=${data.lang}`);
    if (data.h1 !== messages.hero.title) problems.push(`h1 mismatch: ${data.h1}`);
    if (data.h1Count !== 1) problems.push(`h1 count ${data.h1Count}`);
    if (data.overflow > 0) problems.push(`horizontal overflow ${data.overflow}px ${data.offenders.join(",")}`);
    if (data.signup < 4) problems.push(`signup CTAs ${data.signup}`);
    if (data.login < 1) problems.push(`login links ${data.login}`);
    const missing = data.anchors.filter((a) => a.length > 1 && !data.ids.includes(a.slice(1)));
    if (missing.length) problems.push(`broken anchors ${missing.join(",")}`);
    if (data.imgsNoAlt) problems.push(`${data.imgsNoAlt} img without alt`);
    if (data.smallTargets) problems.push(`${data.smallTargets} targets < 24px`);
    problems.length ? fail(name, problems.join("; ")) : pass(name);
    await ctx.close();
  }
}

// Interactions, keyboard and reduced motion (Spanish desktop + mobile).
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const motionOk = await page.evaluate(() => document.documentElement.classList.contains("motion-ok"));
  motionOk ? fail("reduced-motion", "motion-ok set despite reduce") : pass("reduced-motion: content never hidden");
  const hiddenReveal = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((n) => getComputedStyle(n).opacity !== "1").length);
  hiddenReveal ? fail("reduced-motion visible", `${hiddenReveal} hidden blocks`) : pass("reduced-motion: all blocks visible");

  // Scene tabs with keyboard.
  const firstTab = page.locator('[role="tab"]').first();
  await firstTab.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  const selected = await page.locator('[role="tab"][aria-selected="true"]').getAttribute("id");
  const focused = await page.evaluate(() => document.activeElement?.id);
  selected === "scene-tab-3" && focused === "scene-tab-3" ? pass("scene: arrow keys move selection and focus") : fail("scene keyboard", `${selected} / ${focused}`);
  const approvalVisible = await page.locator("#scene-panel").innerText();
  approvalVisible.includes("Aprobar") ? pass("scene: approval step renders") : fail("scene panel", approvalVisible.slice(0, 80));

  // Team expand and FAQ via keyboard.
  const summary = page.locator("details summary").filter({ hasText: "Ver el equipo completo" });
  await summary.focus();
  await page.keyboard.press("Enter");
  const open = await summary.evaluate((s) => s.parentElement.open);
  open ? pass("team: expands with keyboard") : fail("team expand", "closed");

  const faq = page.locator("details summary").filter({ hasText: "¿Qué incluye el precio?" });
  await faq.focus();
  await page.keyboard.press("Space");
  const faqOpen = await faq.evaluate((s) => s.parentElement.open);
  faqOpen ? pass("faq: opens with keyboard") : fail("faq", "closed");

  // First Tab stop is the skip link.
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.getAttribute("href"));
  skip === "#main" ? pass("keyboard: skip link first") : fail("skip link", String(skip));

  // UTM parameters survive the jump to signup.
  await page.goto(BASE + "/?utm_source=test&utm_campaign=qa", { waitUntil: "networkidle" });
  await page.route("https://app.departify.app/**", (route) => route.abort());
  const [request] = await Promise.all([
    page.waitForRequest((r) => r.url().startsWith("https://app.departify.app/signup")),
    page.locator('section[aria-labelledby="hero-title"] a[href^="https://app.departify.app/signup"]').click(),
  ]);
  request.url().includes("utm_source=test") && request.url().includes("utm_campaign=qa") ? pass("cta: UTM preserved") : fail("cta utm", request.url());
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/en", { waitUntil: "networkidle" });
  const toggle = page.locator('button[aria-controls="mobile-nav"]');
  await toggle.click();
  const expanded = await toggle.getAttribute("aria-expanded");
  const visible = await page.locator("#mobile-nav").isVisible();
  await page.keyboard.press("Escape");
  const closed = await toggle.getAttribute("aria-expanded");
  const refocus = await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"));
  expanded === "true" && visible && closed === "false" && refocus === "mobile-nav" ? pass("mobile menu: opens, Escape closes, focus returns") : fail("mobile menu", `${expanded} ${visible} ${closed} ${refocus}`);
  // Language switch back to Spanish from English resets the cookie.
  await page.goto(BASE + "/en", { waitUntil: "networkidle" });
  await page.locator('footer a[hreflang="es-ES"]').click();
  await page.waitForLoadState("networkidle");
  const lang = await page.evaluate(() => document.documentElement.lang);
  lang === "es-ES" ? pass("language switch en → es") : fail("language switch", `${page.url()} lang=${lang}`);
  await ctx.close();
}
await browser.close();

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"} ${r.name}${r.ok ? "" : " — " + r.detail}`);
console.log(`\n${results.length - failed.length}/${results.length} PASS`);
process.exit(failed.length ? 1 : 0);
