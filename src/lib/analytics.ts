// Provider-agnostic event layer. CTA clicks are an intermediate signal:
// the success metric is signup completed + first useful task, measured in the portal.
export type LandingEvent =
  | "cta_signup_clicked"
  | "cta_login_clicked"
  | "how_it_works_clicked"
  | "scene_step_viewed"
  | "team_expanded"
  | "plan_selected"
  | "faq_opened";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: LandingEvent, payload: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
