export const locales = ["es", "en", "fr", "de", "it", "ro", "hu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeMeta: Record<Locale, { bcp47: string; og: string; native: string }> = {
  es: { bcp47: "es-ES", og: "es_ES", native: "Español" },
  en: { bcp47: "en", og: "en_GB", native: "English" },
  fr: { bcp47: "fr-FR", og: "fr_FR", native: "Français" },
  de: { bcp47: "de-DE", og: "de_DE", native: "Deutsch" },
  it: { bcp47: "it-IT", og: "it_IT", native: "Italiano" },
  ro: { bcp47: "ro-RO", og: "ro_RO", native: "Română" },
  hu: { bcp47: "hu-HU", og: "hu_HU", native: "Magyar" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
