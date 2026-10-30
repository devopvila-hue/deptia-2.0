"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand-logo";
import { TrackLink } from "./track-link";
import { ThemeToggle } from "./theme-toggle";
import { links } from "@/config/links";

type Props = {
  homeHref: string;
  labels: {
    how: string;
    included: string;
    plans: string;
    login: string;
    cta: string;
    menu: string;
    close: string;
    nav: string;
    themeDark: string;
    themeLight: string;
  };
};

export function SiteHeader({ homeHref, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [
    { href: "#como-funciona", label: labels.how },
    { href: "#que-incluye", label: labels.included },
    { href: "#planes", label: labels.plans },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-bg"
      }`}
    >
      <div className="wrap grid h-14 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <a href={homeHref} className="flex h-10 w-fit items-center rounded-md" aria-label="Departify">
          <BrandLogo />
        </a>

        <nav aria-label={labels.nav} className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.875rem] text-ink2">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-1">
          <ThemeToggle toDark={labels.themeDark} toLight={labels.themeLight} />
          <TrackLink href={links.login} event="cta_login_clicked" placement="header" className="hidden h-9 items-center px-3 text-[0.875rem] text-ink2 transition-colors hover:text-ink md:inline-flex">
            {labels.login}
          </TrackLink>
          <TrackLink href={links.signup} event="cta_signup_clicked" placement="header" className="btn-primary ml-1 hidden h-9 px-4 text-[0.875rem] md:inline-flex">
            {labels.cta}
          </TrackLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3.5 7.5h13M3.5 12.5h13" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-bg md:hidden">
        <nav aria-label={labels.nav} className="wrap pb-6 pt-2">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="flex h-14 items-center border-b border-line text-[1.125rem] font-medium tracking-[-0.015em]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <TrackLink href={links.signup} event="cta_signup_clicked" placement="mobile_menu" className="btn-primary w-full">
              {labels.cta}
            </TrackLink>
            <TrackLink href={links.login} event="cta_login_clicked" placement="mobile_menu" className="btn-quiet w-full">
              {labels.login}
            </TrackLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
