import type { HeroCopy } from "@/components/hero";
import type { TourCopy } from "@/components/tour";
import type { IncludedCopy } from "@/components/included";
import type { MarqueeCopy } from "@/components/connectors-marquee";
import type { ConnectedCopy } from "@/components/connected";
import type { TeamCopy } from "@/components/team";
import type { ControlCopy } from "@/components/control";
import type { PricingCopy } from "@/components/pricing";
import type { FaqCopy } from "@/components/faq";
import type { ClosingCopy } from "@/components/closing";

// Shape every locale file must satisfy (checked by tests/unit/messages.test.mjs).
export type Messages = {
  meta: { title: string; description: string };
  nav: { how: string; included: string; plans: string; login: string; cta: string; menu: string; close: string; nav: string; skip: string; themeDark: string; themeLight: string };
  hero: HeroCopy;
  included: IncludedCopy;
  tools: MarqueeCopy;
  tour: TourCopy;
  connected: ConnectedCopy;
  team: TeamCopy;
  control: ControlCopy;
  pricing: PricingCopy;
  faq: FaqCopy;
  closing: ClosingCopy;
  footer: {
    tagline: string; product: string; how: string; included: string; plans: string; login: string;
    legal: string; privacy: string; cookies: string; terms: string; security: string; contact: string;
    language: string; rights: string;
  };
};
