import { IconArrow, IconCheck } from "./icons";

type Block = { title: string; line: string; points: string[]; link: string; badge?: string };

export type ConnectedCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  beforeLabel: string;
  beforeItems: string[];
  beforeYou: string;
  afterLabel: string;
  afterItems: string[];
  afterBody: string;
  sharedLabel: string;
  blocks: Block[];
  connectTitle: string;
  connectBody: string;
  connectors: string[];
  connectNote: string;
};

export function Connected({ copy }: { copy: ConnectedCopy }) {
  return (
    <section id="que-incluye" aria-labelledby="connected-title" className="scroll-mt-16 py-20 sm:py-28">
      <div className="wrap">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="connected-title" className="display-2 mt-3">{copy.title}</h2>
          <p className="lede mt-4">{copy.lede}</p>
        </div>

        {/* Before / after: the owner moves from the middle of the tools to the decisions. */}
        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]" data-reveal>
          <div className="flex flex-col rounded-3xl border border-line bg-sand p-6 sm:p-8">
            <p className="text-[0.8125rem] font-semibold text-ink-3">{copy.beforeLabel}</p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {copy.beforeItems.map((item, i) => (
                <div
                  key={item}
                  className={`rounded-xl border border-line-strong/70 bg-canvas px-3 py-2.5 text-[0.875rem] text-ink-2 ${i % 2 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"}`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-center pt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-soft px-3.5 py-1.5 text-[0.875rem] font-medium text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                {copy.beforeYou}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center text-ink-3" aria-hidden="true">
            <IconArrow className="h-6 w-6 rotate-90 md:rotate-0" />
          </div>

          <div className="rounded-3xl border border-line bg-canvas p-6 shadow-card sm:p-8">
            <p className="text-[0.8125rem] font-semibold text-accent">{copy.afterLabel}</p>
            <div className="mt-6 rounded-2xl border border-line">
              <ul className="grid grid-cols-2">
                {copy.afterItems.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-center gap-2 px-3 py-3 text-[0.875rem] text-ink ${i % 2 === 0 ? "border-r border-line" : ""} ${i > 1 ? "border-t border-line" : ""}`}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="border-t border-line bg-accent-soft/60 px-3 py-2.5 text-center text-[0.8125rem] font-medium text-accent-ink">
                {copy.sharedLabel}
              </p>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{copy.afterBody}</p>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {copy.blocks.map((b) => (
            <li key={b.title} className="border-t border-ink pt-6" data-reveal>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="display-3">{b.title}</h3>
                {b.badge && <span className="chip border border-line-strong text-ink-2">{b.badge}</span>}
              </div>
              <p className="mt-2 text-[1.0625rem] text-ink">{b.line}</p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ink-2">
                {b.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <IconCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-sand px-4 py-3 text-[0.9375rem] leading-relaxed text-ink-2">{b.link}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 rounded-3xl border border-line p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-reveal>
          <div>
            <h3 className="display-3">{copy.connectTitle}</h3>
            <p className="mt-2 text-[1rem] leading-relaxed text-ink-2">{copy.connectBody}</p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2">
              {copy.connectors.map((c) => (
                <li key={c} className="rounded-full border border-line bg-sand px-3.5 py-1.5 text-[0.875rem] font-medium text-ink">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.8125rem] text-ink-3">{copy.connectNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
