import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type ClosingCopy = { title: string; body: string; cta: string; note: string };

export function Closing({ copy }: { copy: ClosingCopy }) {
  return (
    <section aria-labelledby="closing-title" className="py-24 text-center sm:py-36">
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
