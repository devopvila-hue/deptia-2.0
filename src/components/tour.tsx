"use client";

import { useRef, useState } from "react";
import { BrowserFrame, ProductShot, type ShotLang } from "./product-shot";
import { track } from "@/lib/analytics";

export type TourCopy = {
  title: string;
  lede: string;
  example: string;
  stepsLabel: string;
  steps: { title: string; body: string; alt: string }[];
};

const SHOTS = ["chat", "aprobaciones", "inicio-agency"];

export function Tour({ copy, lang }: { copy: TourCopy; lang: ShotLang }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus = false) => {
    setActive(i);
    track("scene_step_viewed", { step: i + 1 });
    if (focus) tabs.current[i]?.focus();
  };

  return (
    <section id="como-funciona" aria-labelledby="tour-title" className="scroll-mt-14 py-24 sm:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-[46rem] text-center" data-reveal>
          <h2 id="tour-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        <div role="tablist" aria-label={copy.stepsLabel} className="mx-auto mt-12 grid max-w-[60rem] gap-3 md:grid-cols-3" data-reveal>
          {copy.steps.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tour-tab-${i}`}
                aria-selected={selected}
                aria-controls="tour-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  const last = copy.steps.length - 1;
                  const map: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowDown: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last };
                  if (e.key in map) {
                    e.preventDefault();
                    select(map[e.key], true);
                  }
                }}
                className={`rounded-[18px] border p-5 text-left transition-[background,box-shadow,border-color] duration-200 ${
                  selected ? "border-line bg-surface" : "border-transparent hover:bg-surface/60"
                }`}
                style={selected ? { boxShadow: "var(--rim), var(--shadow-card)" } : undefined}
              >
                <span className="font-mono text-[0.75rem] font-medium tabular-nums text-ink3">{String(i + 1).padStart(2, "0")}</span>
                <span className={`mt-2 block text-[1.0625rem] font-semibold tracking-[-0.02em] ${selected ? "text-ink" : "text-ink2"}`}>{s.title}</span>
                <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink2">{s.body}</span>
              </button>
            );
          })}
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`} className="mx-auto mt-8 max-w-[70rem]" data-reveal>
          <BrowserFrame label={copy.example}>
            <div key={active} className="swap">
              <ProductShot name={SHOTS[active]} lang={lang} alt={copy.steps[active].alt} />
            </div>
          </BrowserFrame>
          <p className="mt-3 text-center text-[0.8125rem] text-ink3 md:hidden">{copy.example}</p>
        </div>
      </div>
    </section>
  );
}
