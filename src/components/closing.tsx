import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type ClosingCopy = { title: string; body: string; cta: string; note: string };

export function Closing({ copy }: { copy: ClosingCopy }) {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden py-24 text-center sm:py-36">
      <div aria-hidden="true" className="aurora absolute inset-0 -z-10" />
      {/* The horizon behind the last call. Only in the dark theme: the copy stays light on top of it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/closing-horizon.webp"
          srcSet="/closing-horizon-1200.webp 1400w, /closing-horizon.webp 2400w"
          sizes="100vw"
          alt=""
          width={2400}
          height={622}
          loading="lazy"
          decoding="async"
          className="closing-horizon h-full w-full object-cover opacity-70 [mask-image:radial-gradient(ellipse_70%_52%_at_50%_72%,#000,transparent_80%)]"
        />
      </div>
      <div className="wrap" data-reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/favicon.svg" alt="" width={44} height={44} className="mx-auto" />
        <h2 id="closing-title" className="t-hero mx-auto mt-8 max-w-[16ch] text-[clamp(2.25rem,5.2vw,4.25rem)]">{copy.title}</h2>
        <p className="t-lede mx-auto mt-5 max-w-[32rem]">{copy.body}</p>
        <TrackLink href={links.signup} event="cta_signup_clicked" placement="closing" className="btn-primary mt-9 h-12 px-7 text-[1rem]">
          {copy.cta}
        </TrackLink>
        <p className="t-small mt-4">{copy.note}</p>
      </div>
    </section>
  );
}
