"use client";

import { useEffect, useRef } from "react";
import { shotSizes } from "@/config/shots";

export type ShotLang = "es" | "en" | "ro";

// Real portal screenshot: Glass (dark, the default) or Glass White when the visitor picks light.
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
      const want = root.dataset.theme === "light" ? light : dark;
      if (!el.src.endsWith(want)) el.src = want;
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [light, dark]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={dark}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={`block h-auto w-full ${className}`}
      />
    </>
  );
}

export function BrowserFrame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <figure className="glass-window">
      <div className="relative flex h-8 items-center justify-center sm:h-9">
        <div className="absolute left-3 hidden gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line2)]" />
        </div>
        <span className="text-[0.75rem] text-ink3">app.departify.app</span>
        {label && <figcaption className="absolute right-3 hidden font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink3 md:block">{label}</figcaption>}
      </div>
      <div className="overflow-hidden rounded-[18px] border border-line">{children}</div>
    </figure>
  );
}
