import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const locales = ["es", "en", "fr", "de", "it", "ro", "hu"];
const load = (l) => JSON.parse(readFileSync(new URL(`../../messages/${l}.json`, import.meta.url), "utf8"));
const messages = Object.fromEntries(locales.map((l) => [l, load(l)]));

// Flatten to path -> value; arrays keep their indexes so lengths must match too.
function flatten(value, path = "", out = {}) {
  if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out);
  else out[path] = value;
  return out;
}
const flat = Object.fromEntries(locales.map((l) => [l, flatten(messages[l])]));

test("every locale has exactly the Spanish keys", () => {
  const base = Object.keys(flat.es).sort();
  for (const l of locales) assert.deepEqual(Object.keys(flat[l]).sort(), base, `key mismatch in ${l}`);
});

test("no empty strings, except the coordinator that has no name", () => {
  for (const l of locales)
    for (const [k, v] of Object.entries(flat[l]))
      if (!k.endsWith(".name")) assert.ok(typeof v === "string" && v.trim().length > 0, `${l}:${k} is empty`);
});

test("no Spanish sentence leaks into another locale", () => {
  // Brand, connector and product names are allowed to repeat; long sentences are not.
  for (const l of locales.filter((x) => x !== "es"))
    for (const [k, v] of Object.entries(flat[l]))
      if (typeof v === "string" && v.length > 24) assert.notEqual(v, flat.es[k], `${l}:${k} is still in Spanish`);
});

test("public copy avoids unverified or banned claims", () => {
  const banned = [
    /\b15\b.*(emplead|employee|employé|mitarbeiter|dipendent|angaja|munkatárs)/i,
    /24\s*\/\s*7|24 h/i,
    /sin tarjeta|no card|sans carte|ohne kreditkarte|senza carta|fără card|bankkártya nélkül/i,
    /prueba gratis|prueba gratuita|free trial|essai gratuit|kostenlos testen|prova gratuita|probă gratuită|ingyenes próba/i,
    /ilimitad|unlimited|illimit|unbegrenzt|nelimitat|korlátlan/i,
    /\b(LLM|orquestaci|orchestrat|ecosistema|ecosystem|revolucionari|disruptiv|potenciado por IA|AI-powered)\b/i,
    /más vendido|most popular|best seller|bestseller/i,
  ];
  for (const l of locales)
    for (const [k, v] of Object.entries(flat[l]))
      for (const re of banned) assert.ok(!re.test(String(v)), `${l}:${k} matches ${re}`);
});

test("plans keep the 49 € entry point and three tiers", async () => {
  const src = readFileSync(new URL("../../src/config/plans.ts", import.meta.url), "utf8");
  assert.match(src, /id: "esencial", price: 49/);
  for (const l of locales) assert.equal(Object.keys(messages[l].pricing.plans).length, 3);
});

test("example scenes are labelled as examples in every locale", () => {
  for (const l of locales) {
    assert.ok(messages[l].hero.panel.example.length > 0);
    assert.ok(messages[l].scene.example.length > 0);
  }
});
