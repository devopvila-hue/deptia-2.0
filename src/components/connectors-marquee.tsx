"use client";

import { useState } from "react";
import { connectors } from "@/config/connectors";

export type MarqueeCopy = { title: string; body: string; note: string; pause: string; play: string };

function Logo({ c }: { c: (typeof connectors)[number] }) {
  return (
    <li className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface py-2 pl-2 pr-5" style={{ boxShadow: "var(--rim)" }}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="17" height="17" fill={c.color ?? "currentColor"} className={c.color ? "" : "text-ink"}>
          <path d={c.path} />
        </svg>
      </span>
      <span className="whitespace-nowrap text-[0.9375rem] font-medium tracking-[-0.01em]">{c.name}</span>
    </li>
  );
}

// The previous site's tools carousel, kept: endless, pausable, static under reduced motion.
export function ConnectorsMarquee({ copy }: { copy: MarqueeCopy }) {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-labelledby="tools-title" className="py-16 sm:py-20">
      <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[36rem]">
          <h2 id="tools-title" className="t-title">{copy.title}</h2>
          <p className="t-body mt-1.5">{copy.body}</p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? copy.play : copy.pause}
          title={paused ? copy.play : copy.pause}
          className="marquee-toggle inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-line bg-surface text-ink2 hover:text-ink sm:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {paused ? <path d="M6 4l10 6-10 6z" /> : <path d="M6 4h3v12H6zM11 4h3v12h-3z" />}
          </svg>
        </button>
      </div>
      <div className="marquee mt-8" data-paused={paused || undefined}>
        <div className="marquee-track">
          {[false, true].map((dup) => (
            <ul key={String(dup)} className="marquee-group" aria-hidden={dup || undefined}>
              {connectors.map((c) => (
                <Logo key={c.name} c={c} />
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="wrap t-small mt-6">{copy.note}</p>
    </section>
  );
}
