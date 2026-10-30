import type { MetadataRoute } from "next";
import { links } from "@/config/links";
import { locales, localeMeta } from "@/i18n/config";

const url = (l: string) => (l === "es" ? links.site : `${links.site}/${l}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: url(l),
    changeFrequency: "monthly",
    priority: l === "es" ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(locales.map((x) => [localeMeta[x].bcp47, url(x)])) },
  }));
}
