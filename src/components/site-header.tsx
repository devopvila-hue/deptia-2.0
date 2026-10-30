"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand-logo";
import { TrackLink } from "./track-link";
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
  };
};

export function SiteHeader({ homeHref, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        scrolled || open ? "border-line bg-canvas/90 backdrop-blur-md" : "border-transparent bg-canvas"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href={homeHref} className="flex shrink-0 items-center rounded-md" aria-label="Departify">
          <BrandLogo />
        </a>

        <nav aria-label={labels.nav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="btn-ghost min-h-0 py-2 text-[0.875rem]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <TrackLink href={links.login} event="cta_login_clicked" placement="header" className="btn-ghost text-[0.875rem]">
            {labels.login}
          </TrackLink>
          <TrackLink href={links.signup} event="cta_signup_clicked" placement="header" className="btn-primary min-h-[2.5rem] px-4 text-[0.875rem]">
            {labels.cta}
          </TrackLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? labels.close : labels.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
          </svg>
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-canvas md:hidden">
        <nav aria-label={labels.nav} className="wrap py-3">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[3rem] items-center border-b border-line text-[1.0625rem] font-medium text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 py-4">
            <TrackLink href={links.signup} event="cta_signup_clicked" placement="mobile_menu" className="btn-primary w-full">
              {labels.cta}
            </TrackLink>
            <TrackLink href={links.login} event="cta_login_clicked" placement="mobile_menu" className="btn-secondary w-full">
              {labels.login}
            </TrackLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
