import { IconCheck } from "./icons";
import { TrackLink } from "./track-link";
import { plans, type PlanId } from "@/config/plans";
import { links } from "@/config/links";

export type PricingCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  perMonth: string;
  vat: string;
  featuredTag: string;
  cta: string;
  taskNote: string;
  plans: Record<PlanId, { name: string; for: string; summary: string; points: string[] }>;
  compareTitle: string;
  compareRows: { label: string; values: [string, string, string] }[];
  limitTitle: string;
  limitBody: string;
  billingTitle: string;
  billingBody: string;
  extrasTitle: string;
  extrasBody: string;
};

function formatPrice(locale: string, value: number) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export function Pricing({ copy, locale }: { copy: PricingCopy; locale: string }) {
  return (
    <section id="planes" aria-labelledby="planes-title" className="scroll-mt-16 bg-sand py-20 sm:py-28">
      <div className="wrap">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="planes-title" className="display-2 mt-3">{copy.title}</h2>
          <p className="lede mt-4">{copy.lede}</p>
        </div>

        <ul className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal>
          {plans.map((plan) => {
            const p = copy.plans[plan.id];
            return (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border bg-canvas p-6 sm:p-7 ${
                  plan.featured ? "border-ink shadow-float" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[1.125rem] font-semibold tracking-[-0.015em]">{p.name}</h3>
                  {plan.featured && (
                    <span className="chip bg-accent-soft text-accent-ink">{copy.featuredTag}</span>
                  )}
                </div>
                <p className="mt-1.5 min-h-[2.75rem] text-[0.9375rem] leading-snug text-ink-2">{p.for}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em]">{formatPrice(locale, plan.price)}</span>
                  <span className="text-[0.9375rem] text-ink-2">{copy.perMonth}</span>
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-ink-3">{copy.vat}</p>
                <p className="mt-5 text-[0.9375rem] font-medium text-ink">{p.summary}</p>
                <ul className="mt-3 space-y-2.5 text-[0.9375rem] text-ink-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <IconCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <TrackLink
                    href={links.signup}
                    event="plan_selected"
                    placement="pricing"
                    extra={{ plan: plan.id }}
                    className={`${plan.featured ? "btn-primary" : "btn-secondary"} w-full`}
                  >
                    {copy.cta}
                  </TrackLink>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-[0.9375rem] text-ink-2">{copy.taskNote}</p>

        <details className="group mt-8 rounded-2xl border border-line bg-canvas">
          <summary className="flex min-h-[3.5rem] items-center justify-between gap-4 px-5 text-[1rem] font-medium sm:px-6">
            {copy.compareTitle}
            <span aria-hidden="true" className="text-ink-3 transition-transform duration-200 group-open:rotate-45">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M10 4.5v11M4.5 10h11" /></svg>
            </span>
          </summary>
          <div className="overflow-x-auto border-t border-line">
            <table className="w-full min-w-[34rem] text-left text-[0.9375rem]">
              <thead>
                <tr className="text-ink-3">
                  <th scope="col" className="px-5 py-3 font-medium sm:px-6"><span className="sr-only">{copy.compareTitle}</span></th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-4 py-3 font-medium text-ink">{copy.plans[plan.id].name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-line align-top">
                    <th scope="row" className="px-5 py-3 font-normal text-ink-2 sm:px-6">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-4 py-3 text-ink">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [copy.limitTitle, copy.limitBody],
            [copy.billingTitle, copy.billingBody],
            [copy.extrasTitle, copy.extrasBody],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="text-[0.9375rem] font-semibold">{title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
