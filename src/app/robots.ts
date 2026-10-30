import type { MetadataRoute } from "next";
import { links } from "@/config/links";

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: indexable ? `${links.site}/sitemap.xml` : undefined,
  };
}
