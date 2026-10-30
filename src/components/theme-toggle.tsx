"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    // Follow the system while the visitor has not chosen explicitly.
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* storage unavailable */
      }
      if (stored === "light" || stored === "dark") return;
      const next: Theme = media.matches ? "dark" : "light";
      root.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? toDark : toLight;

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* storage unavailable: choice lasts for this page view */
        }
        setTheme(next);
      }}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink2 transition-colors hover:bg-bg2 hover:text-ink"
    >
      {/* Both glyphs render; CSS shows the one for the current theme so SSR and first paint agree. */}
      <svg className="theme-icon-moon" width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M16.5 12.3A7 7 0 017.7 3.5a7 7 0 108.8 8.8z" strokeLinejoin="round" />
      </svg>
      <svg className="theme-icon-sun" width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="10" cy="10" r="3.4" />
        <path d="M10 2v1.8M10 16.2V18M2 10h1.8M16.2 10H18M4.3 4.3l1.3 1.3M14.4 14.4l1.3 1.3M15.7 4.3l-1.3 1.3M5.6 14.4l-1.3 1.3" />
      </svg>
    </button>
  );
}
