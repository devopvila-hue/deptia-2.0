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

// "/es" lets next-intl reset the locale cookie before dropping the default prefix.
export function localeHref(locale: Locale) {
  return `/${locale}`;
}

const linkClass = "text-ink2 transition-colors hover:text-ink";

export function SiteFooter({ locale, labels }: Props) {
  const legal = (key: keyof typeof legalSlugs) => `${links.site}${locale === "es" ? "" : `/${locale}`}${legalSlugs[key][locale]}`;
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-12 py-16 text-[0.875rem] md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
        <div className="max-w-[18rem]">
          <BrandLogo className="h-5 w-auto" />
          <p className="mt-4 leading-relaxed text-ink2">{labels.tagline}</p>
        </div>
        <div>
          <h2 className="font-medium">{labels.product}</h2>
          <ul className="mt-4 space-y-2.5">
            <li><a className={linkClass} href="#como-funciona">{labels.how}</a></li>
            <li><a className={linkClass} href="#que-incluye">{labels.included}</a></li>
            <li><a className={linkClass} href="#planes">{labels.plans}</a></li>
            <li><a className={linkClass} href={links.login}>{labels.login}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium">{labels.legal}</h2>
          <ul className="mt-4 space-y-2.5">
            <li><a className={linkClass} href={legal("privacy")}>{labels.privacy}</a></li>
            <li><a className={linkClass} href={legal("cookies")}>{labels.cookies}</a></li>
            <li><a className={linkClass} href={legal("terms")}>{labels.terms}</a></li>
            <li><a className={linkClass} href={legal("security")}>{labels.security}</a></li>
            <li><a className={linkClass} href={`mailto:${links.contactEmail}`}>{labels.contact}</a></li>
          </ul>
        </div>
        <div>
          <h2 id="footer-language" className="font-medium">{labels.language}</h2>
          <ul aria-labelledby="footer-language" className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={localeHref(l)}
                  hrefLang={localeMeta[l].bcp47}
                  lang={localeMeta[l].bcp47}
                  aria-current={l === locale ? "true" : undefined}
                  className={l === locale ? "font-medium text-ink" : linkClass}
                >
                  {localeMeta[l].native}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <p className="border-t border-line py-6 text-[0.8125rem] text-ink3">
          © {new Date().getFullYear()} Departify. {labels.rights}
        </p>
      </div>
    </footer>
  );
}
