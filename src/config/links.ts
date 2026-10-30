// Real destinations only. The landing never registers or authenticates:
// both actions live in the Departify portal.
export const links = {
  signup: "https://app.departify.app/signup",
  login: "https://app.departify.app/login",
  site: process.env.NEXT_PUBLIC_SITE_URL || "https://departify.app",
  contactEmail: "hola@departify.app",
} as const;

// Legal pages still live on the current site (localized slugs copied from its
// routing registry). Migrating them is a prerequisite before this version
// replaces departify.app.
export const legalSlugs = {
  privacy: { es: "/privacidad", en: "/privacy", fr: "/confidentialite", de: "/datenschutz", it: "/privacy", ro: "/confidentialitate", hu: "/adatvedelem" },
  cookies: { es: "/cookies", en: "/cookies", fr: "/cookies", de: "/cookies", it: "/cookie", ro: "/cookieuri", hu: "/cookie-k" },
  terms: { es: "/terminos", en: "/terms", fr: "/conditions", de: "/agb", it: "/termini", ro: "/termeni", hu: "/feltetelek" },
  security: { es: "/seguridad", en: "/security", fr: "/securite", de: "/sicherheit", it: "/sicurezza", ro: "/securitate", hu: "/biztonsag" },
} as const;
