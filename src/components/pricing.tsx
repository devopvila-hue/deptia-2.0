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

// One piece of art per tier, same family: the network grows as the plan does.
const planArt = (id: PlanId) => `/plans/plan-${id}.webp`;
export function Pricing({ copy, locale, site, includedItems }: { copy: PricingCopy; locale: string; site: Locale; includedItems: string[] }) {
  // The custom plan opens the existing contact page of the live site.
  const contact = `${links.site}${site === "es" ? "" : `/${site}`}${contactSlugs[site]}?plan=empresa`;
  return (
    <section id="planes" aria-labelledby="planes-title" className="relative isolate scroll-mt-14 overflow-hidden py-20 sm:py-32">
      <div aria-hidden="true" className="aurora absolute inset-x-0 top-0 -z-10 h-[36rem] opacity-70" />

      <div className="wrap">
        <div className="mx-auto max-w-[44rem] text-center" data-reveal>
          <h2 id="planes-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        {/* The same product in every plan: one label, the pieces listed once. */}
        <div className="mt-9 flex flex-col items-center gap-4" data-reveal>
          <p className="label-mono text-center">{copy.includedAll}</p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {includedItems.map((name) => (
              <li key={name} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.875rem] text-ink2">
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* The rail is the piece that ties the four tiers together: one line, four steps, one column each.
            It only makes sense when the four plans sit side by side, so mobile carries the step in the card. */}
        <div className="relative mt-14 hidden xl:block" aria-hidden="true" data-reveal>
          <div className="absolute inset-x-0 top-[0.875rem] h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <ol className="relative grid grid-cols-4 gap-x-4 pb-6">
            {plans.map((plan, i) => (
              <li key={plan.id} className="flex justify-center">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-line2 bg-bg font-mono text-[0.625rem] font-medium tracking-[0.1em] text-ink2 after:absolute after:left-1/2 after:top-full after:h-6 after:w-px after:-translate-x-1/2 after:bg-line2">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="grid gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-y-0" data-reveal>
          {plans.map((plan, i) => {
            const p = copy.plans[plan.id];
            const custom = plan.price === null;
            const featured = plan.featured;
            return (
              <li
                key={plan.id}
                className={`grid gap-0 overflow-hidden rounded-[22px] border xl:row-span-7 xl:grid-rows-subgrid ${
                  featured
                    ? "border-accent/45 bg-bg2 shadow-[0_0_0_1px_rgb(var(--accent)/0.28),0_36px_90px_-46px_rgb(var(--accent)/0.55)]"
                    : "border-line bg-surface"
                }`}
              >
                {/* Artwork band: same family in every card, one step bigger each time. */}
                <div className={`relative aspect-[16/9] overflow-hidden ${featured ? "ring-1 ring-inset ring-accent/25" : "border-b border-line"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={planArt(plan.id)}
                    srcSet={`${planArt(plan.id).replace(".webp", "-720.webp")} 720w, ${planArt(plan.id)} 1400w`}
                    sizes="(min-width: 1280px) 292px, (min-width: 768px) 352px, (min-width: 640px) 45vw, 92vw"
                    alt=""
                    aria-hidden="true"
                    width={1400}
                    height={781}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-line2 bg-bg/70 font-mono text-[0.625rem] font-medium tracking-[0.1em] text-ink backdrop-blur-sm xl:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 px-6 pb-1 pt-5">
                  <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em]">{p.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold leading-none text-onaccent">{copy.featuredTag}</span>
                  )}
                </div>

                <p className="t-body px-6 pb-4 pt-1">{p.for}</p>

                <div className="flex items-end px-6 pb-5">
                  {custom ? (
                    <div>
                      <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em]">{copy.customPrice}</p>
                      <p className="t-small mt-2">{copy.customNote}</p>
                    </div>
                  ) : (
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">{formatPrice(locale, plan.price)}</span>
                      <span className="text-[0.9375rem] text-ink2">{copy.perMonth}</span>
                    </p>
                  )}
                </div>

                <div className="px-6 pb-6">
                  <TrackLink
                    href={custom ? contact : links.signup}
                    event="plan_selected"
                    placement="pricing"
                    extra={{ plan: plan.id }}
                    className={`${featured ? "btn-primary" : "btn-quiet"} w-full`}
                  >
                    {custom ? copy.customCta : copy.cta}
                  </TrackLink>
                </div>

                <p className="px-6 pb-3 text-[0.9375rem] font-medium leading-snug">{p.summary}</p>

                <ul className="flex flex-col gap-3.5 px-6 pb-7 text-[0.9375rem] leading-snug text-ink2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="rgb(var(--accenttext))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-[0.3rem] shrink-0">
                        <path d="M4.5 10.5l3.5 3.5 7.5-8" />
                      </svg>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <p className="t-small mt-6 text-center">{copy.vat}</p>
        <p className="t-small mt-2 text-center">{copy.taskNote}</p>

        <details className="group mx-auto mt-12 max-w-[62rem] overflow-hidden rounded-[22px] border border-line bg-surface" data-reveal>
          <summary className="flex h-14 items-center justify-between gap-4 px-6 text-[0.9375rem] font-medium">
            {copy.compareTitle}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="text-ink3 transition-transform duration-200 group-open:rotate-180">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </summary>
          <div className="overflow-x-auto border-t border-line px-6 pb-5">
            <table className="w-full min-w-[42rem] text-left text-[0.875rem]">
              <thead>
                <tr className="text-ink3">
                  <th scope="col" className="py-3 pr-4 font-normal"><span className="sr-only">{copy.compareTitle}</span></th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-3 py-3 font-medium text-ink">{copy.plans[plan.id].name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-line align-top">
                    <th scope="row" className="py-3.5 pr-4 font-normal text-ink2">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-3 py-3.5">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <dl className="mx-auto mt-14 grid max-w-[62rem] gap-x-14 gap-y-9 border-t border-line pt-10 md:grid-cols-3" data-reveal>
          {[
            [copy.limitTitle, copy.limitBody],
            [copy.billingTitle, copy.billingBody],
            [copy.extrasTitle, copy.extrasBody],
          ].map(([title, body]) => (
            <div key={title}>
              <dt className="text-[0.9375rem] font-semibold">{title}</dt>
              <dd className="t-body mt-1.5">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
