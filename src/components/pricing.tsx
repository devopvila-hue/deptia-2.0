import { TrackLink } from "./track-link";
import { plans, type PlanId } from "@/config/plans";
import { links, contactSlugs } from "@/config/links";
import type { Locale } from "@/i18n/config";

export type PricingCopy = {
  title: string;
  lede: string;
  perMonth: string;
  vat: string;
  featuredTag: string;
  cta: string;
  taskNote: string;
  includedAll: string;
  plans: Record<PlanId, { name: string; for: string; summary: string; points: string[] }>;
  compareTitle: string;
  compareRows: { label: string; values: string[] }[];
  customPrice: string;
  customNote: string;
  customCta: string;
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

export function Pricing({ copy, locale, site }: { copy: PricingCopy; locale: string; site: Locale }) {
  // The custom plan opens the existing contact page of the live site.
  const contact = `${links.site}${site === "es" ? "" : `/${site}`}${contactSlugs[site]}?plan=empresa`;
  return (
    <section id="planes" aria-labelledby="planes-title" className="scroll-mt-14 py-24 sm:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-[44rem] text-center" data-reveal>
          <h2 id="planes-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        <div className="panel mt-14 overflow-hidden" data-reveal>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-line bg-bg2 px-5 py-3.5 text-center text-[0.9375rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-good" aria-hidden="true" />
            <span className="font-medium">{copy.includedAll}</span>
          </p>
          {/* Subgrid: every card shares the same rows, so names, prices, buttons and lists line up. */}
          <ul className="grid md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, i) => {
              const p = copy.plans[plan.id];
              const custom = plan.price === null;
              return (
                <li
                  key={plan.id}
                  className={`relative row-span-6 grid grid-rows-subgrid gap-0 p-7 sm:p-8 ${i > 0 ? "border-t border-line" : ""} ${i % 2 === 1 ? "md:border-l" : ""} ${i === 1 ? "md:border-t-0" : ""} ${i >= 2 ? "xl:border-l" : ""} ${i > 0 ? "xl:border-t-0" : ""} ${plan.featured ? "bg-accentsoft" : ""}`}
                >
                  {plan.featured && <span aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1.5px_rgb(var(--accent))]" />}
                  <div className="flex min-h-[1.75rem] items-center justify-between gap-3">
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em]">{p.name}</h3>
                    {plan.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold leading-none text-onaccent">{copy.featuredTag}</span>
                    )}
                  </div>
                  <p className="t-body mt-2">{p.for}</p>
                  <div className="mt-6 self-end">
                    {custom ? (
                      <>
                        <p className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em]">{copy.customPrice}</p>
                        <p className="t-small mt-2">{copy.customNote}</p>
                      </>
                    ) : (
                      <p className="flex items-baseline gap-1.5">
                        <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">{formatPrice(locale, plan.price)}</span>
                        <span className="text-[0.9375rem] text-ink2">{copy.perMonth}</span>
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <TrackLink
                      href={custom ? contact : links.signup}
                      event="plan_selected"
                      placement="pricing"
                      extra={{ plan: plan.id }}
                      className={`${plan.featured ? "btn-primary" : "btn-quiet"} w-full`}
                    >
                      {custom ? copy.customCta : copy.cta}
                    </TrackLink>
                  </div>
                  <p className="mt-7 text-[0.9375rem] font-medium">{p.summary}</p>
                  <ul className="mt-3 divide-y divide-line self-start border-t border-line text-[0.9375rem] text-ink2">
                    {p.points.map((pt) => (
                      <li key={pt} className="py-2.5">{pt}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="t-small mt-5 text-center">{copy.vat}</p>
        <p className="t-small mt-5 text-center">{copy.taskNote}</p>

        <details className="group mx-auto mt-12 max-w-[56rem] border-y border-line">
          <summary className="flex h-14 items-center justify-between gap-4 text-[0.9375rem] font-medium">
            {copy.compareTitle}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="text-ink3 transition-transform duration-200 group-open:rotate-180">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </summary>
          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[42rem] text-left text-[0.875rem]">
              <thead>
                <tr className="text-ink3">
                  <th scope="col" className="py-2.5 pr-4 font-normal"><span className="sr-only">{copy.compareTitle}</span></th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-3 py-2.5 font-medium text-ink">{copy.plans[plan.id].name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-line align-top">
                    <th scope="row" className="py-3 pr-4 font-normal text-ink2">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-3 py-3">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <div className="mx-auto mt-12 grid max-w-[56rem] gap-8 md:grid-cols-3">
          {[
            [copy.limitTitle, copy.limitBody],
            [copy.billingTitle, copy.billingBody],
            [copy.extrasTitle, copy.extrasBody],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="text-[0.9375rem] font-semibold">{title}</h3>
              <p className="t-body mt-1.5">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
