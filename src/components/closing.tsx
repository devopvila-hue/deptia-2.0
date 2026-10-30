import { TrackLink } from "./track-link";
import { links } from "@/config/links";

export type ClosingCopy = { title: string; body: string; cta: string; note: string };

export function Closing({ copy }: { copy: ClosingCopy }) {
  return (
    <section aria-labelledby="closing-title" className="pb-20 sm:pb-28">
      <div className="wrap">
        <div className="rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20" data-reveal>
          <h2 id="closing-title" className="display-2 mx-auto max-w-[36rem]">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/75">{copy.body}</p>
          <div className="mt-8 flex justify-center">
            <TrackLink href={links.signup} event="cta_signup_clicked" placement="closing" className="btn min-h-[3rem] bg-white px-6 text-[1rem] text-ink hover:bg-white/90">
              {copy.cta}
            </TrackLink>
          </div>
          <p className="mt-4 text-[0.875rem] text-white/70">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
