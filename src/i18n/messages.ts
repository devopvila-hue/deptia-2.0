import type { HeroCopy } from "@/components/hero";
import type { SceneCopy } from "@/components/scene";
import type { ConnectedCopy } from "@/components/connected";
import type { TeamCopy } from "@/components/team";
import type { ControlCopy } from "@/components/control";
import type { PricingCopy } from "@/components/pricing";
import type { FaqCopy } from "@/components/faq";
import type { ClosingCopy } from "@/components/closing";

// Shape every locale file must satisfy (checked by tests/unit/messages.test.mjs).
export type Messages = {
  meta: { title: string; description: string };
  nav: { how: string; included: string; plans: string; login: string; cta: string; menu: string; close: string; nav: string; skip: string };
  hero: HeroCopy;
  scene: SceneCopy;
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
