"use client";

import { useEffect } from "react";

// One observer for the whole page. Content is visible by default; the
// `motion-ok` class (set before paint) is what enables the entrance effect.
export function RevealObserver() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion-ok")) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
