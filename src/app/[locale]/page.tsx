import type { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { links } from "@/config/links";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { Scene } from "@/components/scene";
import { Connected } from "@/components/connected";
import { Team } from "@/components/team";
import { Control } from "@/components/control";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Closing } from "@/components/closing";
import { RevealObserver } from "@/components/reveal-observer";
import type { Messages } from "@/i18n/messages";

function pageUrl(locale: Locale) {
  return locale === "es" ? links.site : `${links.site}/${locale}`;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].bcp47, pageUrl(l)]));
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: pageUrl(locale), languages: { ...languages, "x-default": links.site } },
    openGraph: {
      type: "website",
      siteName: "Departify",
      title: t("title"),
      description: t("description"),
      url: pageUrl(locale),
      locale: localeMeta[locale].og,
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    // Indexing stays off until this version is approved to replace the live site.
    robots: process.env.NEXT_PUBLIC_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  if (!isLocale(locale)) return null;
  setRequestLocale(locale);
  const m = (await getMessages({ locale })) as unknown as Messages;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {m.nav.skip}
      </a>
      <SiteHeader homeHref={locale === "es" ? "/" : `/${locale}`} labels={m.nav} />
      <main id="main">
        <Hero copy={m.hero} />
        <Scene copy={m.scene} />
        <Connected copy={m.connected} />
        <Team copy={m.team} />
        <Control copy={m.control} />
        <Pricing copy={m.pricing} locale={localeMeta[locale].bcp47} />
        <Faq copy={m.faq} />
        <Closing copy={m.closing} />
      </main>
      <SiteFooter locale={locale} labels={m.footer} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
