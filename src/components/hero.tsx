import { SectorShowcase, type ShowcaseCopy } from "./sector-showcase";
import type { ShotLang } from "./product-shot";
import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type HeroCopy = {
  title: string;
  titleAccent: string;
  subtitle: string;
  includedTag: string;
  price: string;
  priceNote: string;
  cta: string;
  secondary: string;
  showcase: ShowcaseCopy;
};

export function Hero({ copy, shotLang }: { copy: HeroCopy; shotLang: ShotLang }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-24">
      <div aria-hidden="true" className="aurora absolute inset-0 -z-10" />
      <div aria-hidden="true" className="dot-grid absolute inset-x-0 top-0 -z-10 h-[34rem]" />

      <div className="wrap text-center">
        <h1 id="hero-title" className="t-hero mx-auto max-w-[18ch]">
          {copy.title} <span className="t-brand">{copy.titleAccent}</span>
        </h1>
        <p className="t-lede mx-auto mt-6 max-w-[36rem]">{copy.subtitle}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
          <TrackLink href={links.signup} event="cta_signup_clicked" placement="hero" className="btn-primary h-12 w-full px-7 text-[1rem] font-semibold sm:w-auto">
            {copy.cta}
          </TrackLink>
          <TrackLink href="#como-funciona" event="how_it_works_clicked" placement="hero" className="link-arrow text-[1rem]">
            {copy.secondary}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.5 5l5 5-5 5" />
            </svg>
          </TrackLink>
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.875rem] text-ink3">
          <span>
            <span className="font-semibold text-ink">{copy.price}</span> {copy.priceNote}
          </span>
          <span aria-hidden="true" className="hidden text-ink3/60 sm:inline">·</span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="rgb(var(--accenttext))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4.5 10.5l3.5 3.5 7.5-8" />
            </svg>
            {copy.includedTag}
          </span>
        </p>
      </div>

      <div className="wrap mt-12 sm:mt-16">
        <div className="rise mx-auto max-w-[70rem]">
          <SectorShowcase copy={copy.showcase} lang={shotLang} />
        </div>
      </div>
    </section>
  );
}
