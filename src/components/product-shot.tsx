"use client";

import { useEffect, useRef } from "react";
import { shotSizes } from "@/config/shots";

export type ShotLang = "es" | "en" | "ro";

// Real portal screenshot (Glass White in light, Glass in dark). The <picture> follows the
// system preference at parse time; an explicit choice on the page is applied after hydration.
export function ProductShot({
  name,
  lang,
  alt,
  priority = false,
  className = "",
}: {
  name: string;
  lang: ShotLang;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [w, h] = shotSizes[`${name}-${lang}`] ?? [2000, 1250];
  const light = `/shots/${name}-${lang}-light.webp`;
  const dark = `/shots/${name}-${lang}-dark.webp`;

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const el = img.current;
      if (!el) return;
      const want = root.dataset.theme === "dark" ? dark : light;
      if (!el.currentSrc.endsWith(want)) {
        el.parentElement?.querySelectorAll("source").forEach((s) => s.remove());
        el.src = want;
      }
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [light, dark]);

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={dark} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={light}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={`block h-auto w-full ${className}`}
      />
    </picture>
  );
}

export function BrowserFrame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <figure className="overflow-hidden rounded-[22px] border border-line bg-surface" style={{ boxShadow: "var(--rim), var(--shadow-window)" }}>
      <div className="relative flex h-9 items-center justify-center border-b border-line bg-bg2/80 sm:h-10">
        <div className="absolute left-4 hidden gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
        </div>
        <span className="rounded-md bg-surface px-3 py-0.5 text-[0.75rem] text-ink3 ring-1 ring-[var(--line)]">app.departify.app</span>
        {label && <figcaption className="absolute right-4 hidden font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink3 md:block">{label}</figcaption>}
      </div>
      {children}
    </figure>
  );
}
