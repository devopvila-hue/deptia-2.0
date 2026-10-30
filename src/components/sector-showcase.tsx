"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserFrame, ProductShot, type ShotLang } from "./product-shot";
import { track } from "@/lib/analytics";

const SECTORS = ["clinic", "shop", "advisory", "agency", "academy", "service"] as const;
export type SectorId = (typeof SECTORS)[number];

export type ShowcaseCopy = {
  label: string;
  example: string;
  shotAlt: string;
  pause: string;
  play: string;
  sectors: Record<SectorId, string>;
};

const INTERVAL = 6000;

export function SectorShowcase({ copy, lang }: { copy: ShowcaseCopy; lang: ShotLang }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-advance only when motion is welcome; any manual choice stops it.
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SECTORS.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [playing, active]);
  // Warm the next screenshot so the switch is instant.
  useEffect(() => {
    const next = SECTORS[(active + 1) % SECTORS.length];
    const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const im = new Image();
    im.src = `/shots/inicio-${next}-${lang}-${theme}.webp`;
  }, [active, lang]);

  const choose = (i: number, focus = false) => {
    setActive(i);
    setPlaying(false);
    track("scene_step_viewed", { sector: SECTORS[i] });
    if (focus) tabs.current[i]?.focus();
  };

  const sector = SECTORS[active];

  return (
    <div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div
          role="tablist"
          aria-label={copy.label}
          className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none]"
          style={{ boxShadow: "var(--rim), var(--shadow-card)" }}
        >
          {SECTORS.map((id, i) => {
            const selected = i === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`sector-tab-${id}`}
                aria-selected={selected}
                aria-controls="sector-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  const last = SECTORS.length - 1;
                  const map: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
                  if (e.key in map) {
                    e.preventDefault();
                    choose(map[e.key], true);
                  }
                }}
                className={`relative h-9 shrink-0 overflow-hidden whitespace-nowrap rounded-full px-4 text-[0.875rem] font-medium transition-colors ${
                  selected ? "bg-accent text-onaccent" : "text-ink2 hover:bg-bg2 hover:text-ink"
                }`}
              >
                {copy.sectors[id]}
                {selected && playing && (
                  <span key={active} aria-hidden="true" className="sector-progress absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-onaccent/60" />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? copy.pause : copy.play}
          title={playing ? copy.pause : copy.play}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink2 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M6 4h3v12H6zM11 4h3v12h-3z" /> : <path d="M6 4l10 6-10 6z" />}
          </svg>
        </button>
      </div>

      <div id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${sector}`} className="mt-5 sm:mt-6">
        <BrowserFrame label={copy.example}>
          <div key={sector} className="swap">
            <ProductShot name={`inicio-${sector}`} lang={lang} alt={copy.shotAlt.replace("{sector}", copy.sectors[sector])} priority={active === 0} />
          </div>
        </BrowserFrame>
        <p className="mt-3 text-center text-[0.8125rem] text-ink3 md:hidden">{copy.example}</p>
      </div>
    </div>
  );
}
