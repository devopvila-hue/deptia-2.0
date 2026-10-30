import { BrandLogo } from "./brand-logo";
import { links, legalSlugs } from "@/config/links";
import { locales, localeMeta, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  labels: {
    tagline: string;
    product: string;
    how: string;
    included: string;
    plans: string;
    login: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
    security: string;
    contact: string;
    language: string;
    rights: string;
  };
};

export function localeHref(locale: Locale) {
  // "/es" lets next-intl reset the locale cookie before dropping the default prefix.
  return `/${locale}`;
}

export function SiteFooter({ locale, labels }: Props) {
  const legal = (key: keyof typeof legalSlugs) => `${links.site}${locale === "es" ? "" : `/${locale}`}${legalSlugs[key][locale]}`;
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <BrandLogo className="h-[20px] w-auto" />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{labels.tagline}</p>
        </div>
        <div>
          <h2 className="text-[0.8125rem] font-medium text-ink-3">{labels.product}</h2>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            <li><a className="text-ink-2 hover:text-ink" href="#como-funciona">{labels.how}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href="#que-incluye">{labels.included}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href="#planes">{labels.plans}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href={links.login}>{labels.login}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-[0.8125rem] font-medium text-ink-3">{labels.legal}</h2>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            <li><a className="text-ink-2 hover:text-ink" href={legal("privacy")}>{labels.privacy}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href={legal("cookies")}>{labels.cookies}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href={legal("terms")}>{labels.terms}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href={legal("security")}>{labels.security}</a></li>
            <li><a className="text-ink-2 hover:text-ink" href={`mailto:${links.contactEmail}`}>{labels.contact}</a></li>
          </ul>
        </div>
        <div>
          <h2 id="footer-language" className="text-[0.8125rem] font-medium text-ink-3">{labels.language}</h2>
          <ul aria-labelledby="footer-language" className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.9375rem]">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={localeHref(l)}
                  hrefLang={localeMeta[l].bcp47}
                  lang={localeMeta[l].bcp47}
                  aria-current={l === locale ? "true" : undefined}
                  className={l === locale ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}
                >
                  {localeMeta[l].native}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <p className="border-t border-line py-6 text-[0.8125rem] text-ink-3">
          © {new Date().getFullYear()} Departify. {labels.rights}
        </p>
      </div>
    </footer>
  );
}
