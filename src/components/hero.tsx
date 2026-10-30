import { TodayPanel, type TodayPanelCopy } from "./today-panel";
import { TrackLink } from "./track-link";
import { IconArrow } from "./icons";
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
  panel: TodayPanelCopy;
};

export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pt-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="max-w-[40rem]">
          <p className="text-[0.875rem] font-medium text-ink-2">{copy.audience}</p>
          <h1 id="hero-title" className="display-hero mt-4">{copy.title}</h1>
          <p className="lede mt-5">{copy.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackLink href={links.signup} event="cta_signup_clicked" placement="hero" className="btn-primary min-h-[3rem] px-6 text-[1rem]">
              {copy.cta}
            </TrackLink>
            <TrackLink href="#como-funciona" event="how_it_works_clicked" placement="hero" className="btn-secondary min-h-[3rem] px-6 text-[1rem]">
              {copy.secondary}
              <IconArrow className="h-[18px] w-[18px] rotate-90" />
            </TrackLink>
          </div>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.9375rem]">
            <span className="font-semibold text-ink">{copy.price}</span>
            <span className="text-ink-3">{copy.priceNote}</span>
          </p>
          <p className="mt-1 text-[0.9375rem] text-ink-2">{copy.reassurance}</p>
        </div>

        <div>
          <TodayPanel copy={copy.panel} />
        </div>
      </div>
    </section>
  );
}
