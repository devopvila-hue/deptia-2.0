import { SectorShowcase, type ShowcaseCopy } from "./sector-showcase";
import type { ShotLang } from "./product-shot";
import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type HeroCopy = {
  audience: string;
  title: string;
  subtitle: string;
  forWhom: string;
  price: string;
  priceNote: string;
  cta: string;
  secondary: string;
  reassurance: string;
  showcase: ShowcaseCopy;
};

export function Hero({ copy, shotLang }: { copy: HeroCopy; shotLang: ShotLang }) {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pb-8 pt-10 sm:pt-12">
      <div className="wrap text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-ink2" style={{ boxShadow: "var(--rim)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
          {copy.audience}
        </p>
        <h1 id="hero-title" className="t-hero mx-auto mt-5 max-w-[16ch]">{copy.title}</h1>
        <p className="t-lede mx-auto mt-5 max-w-[38rem]">{copy.subtitle}</p>
        <p className="mx-auto mt-3 max-w-[36rem] text-[0.9375rem] font-medium leading-relaxed text-ink">{copy.forWhom}</p>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <TrackLink href={links.signup} event="cta_signup_clicked" placement="hero" className="btn-primary h-12 w-full px-7 text-[1rem] sm:w-auto">
            {copy.cta}
          </TrackLink>
          <TrackLink href="#como-funciona" event="how_it_works_clicked" placement="hero" className="link-arrow text-[1rem]">
            {copy.secondary}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.5 5l5 5-5 5" />
            </svg>
          </TrackLink>
        </div>

        <p className="mt-5 text-[0.875rem] text-ink3">
          <span className="font-medium text-ink">{copy.price}</span> {copy.priceNote}
          <span className="mx-2 hidden sm:inline" aria-hidden="true">·</span>
          <span className="mt-1 block sm:mt-0 sm:inline">{copy.reassurance}</span>
        </p>
      </div>

      <div className="wrap mt-10 sm:mt-12">
        <div className="rise mx-auto max-w-[72rem]">
          <SectorShowcase copy={copy.showcase} lang={shotLang} />
        </div>
      </div>
    </section>
  );
}
