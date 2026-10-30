"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = next === "dark" ? toDark : toLight;

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
        setTheme(next);
      }}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink2 transition-colors hover:bg-bg2 hover:text-ink"
    >
      <svg className="theme-icon-moon h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <svg className="theme-icon-sun h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}
