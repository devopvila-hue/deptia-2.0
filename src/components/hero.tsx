import { AppWindow, type AppWindowCopy } from "./app-window";
import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type HeroCopy = {
  audience: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  cta: string;
  secondary: string;
  reassurance: string;
  panel: AppWindowCopy;
};

export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="wrap text-center">
        <p className="text-[0.875rem] text-ink3">{copy.audience}</p>
        <h1 id="hero-title" className="t-hero mx-auto mt-4 max-w-[17ch]">{copy.title}</h1>
        <p className="t-lede mx-auto mt-6 max-w-[36rem]">{copy.subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
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

        <p className="mt-6 text-[0.875rem] text-ink3">
          <span className="font-medium text-ink">{copy.price}</span> {copy.priceNote}
          <span className="mx-2 hidden sm:inline" aria-hidden="true">·</span>
          <span className="mt-1 block sm:mt-0 sm:inline">{copy.reassurance}</span>
        </p>
      </div>

      <div className="wrap mt-12 sm:mt-14">
        <div className="rise mx-auto max-w-[70rem]">
          <AppWindow copy={copy.panel} />
        </div>
      </div>
    </section>
  );
}
