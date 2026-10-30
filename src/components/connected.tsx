type Block = { title: string; line: string; points: string[]; link: string; badge?: string };

export type ConnectedCopy = {
  title: string;
  lede: string;
  beforeLabel: string;
  beforeNodes: string[];
  beforeYou: string;
  youShort: string;
  afterLabel: string;
  afterItems: string[];
  afterYou: string;
  afterBody: string;
  blocks: Block[];
};

// 3×3 grid; cell centres in percent of the diagram box.
const cell = (col: number, row: number) => ({ x: (col - 0.5) * (100 / 3), y: (row - 0.5) * (100 / 3) });
const BEFORE = [cell(1, 1), cell(3, 1), cell(1, 2), cell(3, 2), cell(1, 3), cell(3, 3)];
const AFTER = [cell(1, 2), cell(3, 2), cell(1, 3), cell(3, 3)];
const CENTER = cell(2, 2);
const TOP = cell(2, 1);

function Lines({ points, accent }: { points: { x: number; y: number }[]; accent?: { x: number; y: number } }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {points.map((p, i) => (
        <line key={i} x1={CENTER.x} y1={CENTER.y} x2={p.x} y2={p.y} stroke="var(--line2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      {accent && (
        <line x1={CENTER.x} y1={CENTER.y} x2={accent.x} y2={accent.y} stroke="rgb(var(--accenttext))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}

const place = ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-1 row-start-2", "col-start-3 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"];
const placeAfter = ["col-start-1 row-start-2", "col-start-3 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"];

function Node({ children, className = "", strong = false }: { children: React.ReactNode; className?: string; strong?: boolean }) {
  return (
    <div className={`relative z-10 flex items-center justify-center ${className}`}>
      <span
        className={`max-w-full rounded-lg border px-2.5 py-1.5 text-center text-[0.75rem] leading-tight sm:text-[0.8125rem] ${
          strong ? "border-ink bg-ink font-semibold text-bg" : "border-line bg-surface text-ink2"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Connected({ copy }: { copy: ConnectedCopy }) {
  return (
    <section id="que-incluye" aria-labelledby="connected-title" className="scroll-mt-14 py-24 sm:py-32">
      <div className="wrap">
        <div className="max-w-[46rem]" data-reveal>
          <h2 id="connected-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2" data-reveal>
          <figure className="rounded-[24px] border border-line bg-bg2 p-5 sm:p-8">
            <figcaption className="text-[0.8125rem] font-semibold text-ink3">{copy.beforeLabel}</figcaption>
            <div className="relative mt-6 grid aspect-[4/3] grid-cols-3 grid-rows-3">
              <Lines points={BEFORE} />
              {copy.beforeNodes.map((n, i) => (
                <Node key={n} className={place[i]}>{n}</Node>
              ))}
              <div className="relative z-10 col-start-2 row-start-2 flex items-center justify-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-attn bg-attnsoft text-[0.8125rem] font-semibold text-attn">
                  {copy.youShort}
                </span>
              </div>
            </div>
            <p className="mt-6 text-center text-[0.875rem] text-ink2">{copy.beforeYou}</p>
          </figure>

          <figure className="panel p-5 sm:p-8">
            <figcaption className="text-[0.8125rem] font-semibold text-ink3">{copy.afterLabel}</figcaption>
            <div className="relative mt-6 grid aspect-[4/3] grid-cols-3 grid-rows-3">
              <Lines points={AFTER} accent={TOP} />
              <div className="relative z-10 col-start-2 row-start-1 flex items-center justify-center">
                <span className="rounded-full border border-accenttext bg-accentsoft px-3 py-1.5 text-center text-[0.75rem] font-semibold leading-tight text-accenttext sm:text-[0.8125rem]">
                  {copy.afterYou}
                </span>
              </div>
              {copy.afterItems.map((n, i) => (
                <Node key={n} className={placeAfter[i]}>{n}</Node>
              ))}
              <div className="relative z-10 col-start-2 row-start-2 flex items-center justify-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface" style={{ boxShadow: "var(--rim), var(--shadow-card)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/favicon.svg" alt="Departify" width={28} height={28} />
                </span>
              </div>
            </div>
            <p className="mt-6 text-center text-[0.875rem] text-ink2">{copy.afterBody}</p>
          </figure>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {copy.blocks.map((b) => (
            <article key={b.title} className="panel p-6 sm:p-8" data-reveal>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="t-title">{b.title}</h3>
                {b.badge && <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-attn">{b.badge}</span>}
              </div>
              <p className="mt-2 text-[1.0625rem] tracking-[-0.01em] text-ink">{b.line}</p>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink2">
                {b.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.6rem] h-[5px] w-[5px] shrink-0 rounded-full bg-ink3" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-l-2 border-accenttext pl-4 text-[0.9375rem] leading-relaxed text-ink2">{b.link}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
