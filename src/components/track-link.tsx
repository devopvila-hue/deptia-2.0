"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type LandingEvent } from "@/lib/analytics";

const CARRIED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: LandingEvent;
  placement: string;
  children: ReactNode;
  extra?: Record<string, string>;
};

// Outbound portal links keep campaign parameters so signup attribution survives the jump.
export function TrackLink({ href, event, placement, extra, children, onClick, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={(e) => {
        track(event, { placement, ...extra });
        if (href.startsWith("http")) {
          try {
            const target = new URL(href);
            const current = new URLSearchParams(window.location.search);
            for (const key of CARRIED_PARAMS) {
              const value = current.get(key);
              if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
            }
            e.currentTarget.href = target.toString();
          } catch {
            /* keep original href */
          }
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
