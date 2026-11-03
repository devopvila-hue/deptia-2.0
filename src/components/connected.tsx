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

// Geometry: a 3×3 grid on a 4:3 box, drawn in a 400×300 viewBox so the lines never stretch.
const W = 400;
const H = 300;
type Cell = readonly [col: number, row: number];
const gx = ([col]: Cell) => (W / 3) * (col - 0.5);
const gy = ([, row]: Cell) => (H / 3) * (row - 0.5);
const HUB: Cell = [2, 2];
const TOP: Cell = [2, 1];
// The eight cells around the centre, in reading order.
const RING: Cell[] = [[1, 1], [2, 1], [3, 1], [1, 2], [3, 2], [1, 3], [2, 3], [3, 3]];
// Walking round the ring: TL, T, TR, R, BR, B, BL, L.
const LOOP = [0, 1, 2, 4, 7, 6, 5, 3, 0];
// Six areas live on the two side columns.
const SIDES: Cell[] = [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]];

const cellStyle = ([col, row]: Cell) => ({ gridColumn: col, gridRow: row });

// Every stroke is non-scaling, so 1 px stays 1 px at any card width.
const stroke = { vectorEffect: "non-scaling-stroke" as const, fill: "none" };

function BeforeLines() {
  const hx = gx(HUB);
  const hy = gy(HUB);
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {/* Everything is wired to each other... */}
      <polyline points={LOOP.map((i) => `${gx(RING[i])},${gy(RING[i])}`).join(" ")} stroke="var(--line2)" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" strokeLinejoin="round" {...stroke} />
      {/* ...and all of it goes through you. */}
      {RING.map((c, i) => (
        <line key={i} x1={hx} y1={hy} x2={gx(c)} y2={gy(c)} stroke="rgb(var(--attn) / 0.5)" strokeWidth="1.25" strokeDasharray="2 5" strokeLinecap="round" {...stroke} />
      ))}
    </svg>
  );
}

function AfterLines() {
  const hx = gx(HUB);
  const hy = gy(HUB);
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <circle cx={hx} cy={hy} r="50" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" {...stroke} />
      {SIDES.map((c, i) => {
        const nx = gx(c);
        const ny = gy(c);
        const mid = hx + (nx - hx) / 2;
        const d = `M ${hx} ${hy} C ${mid} ${hy}, ${mid} ${ny}, ${nx} ${ny}`;
        return (
          <g key={i}>
            <path d={d} stroke="var(--line2)" strokeWidth="1" {...stroke} />
            <path d={d} className="flow" stroke="rgb(var(--accenttext) / 0.85)" strokeWidth="1.5" strokeLinecap="round" {...stroke} />
          </g>
        );
      })}
      <line x1={hx} y1={hy} x2={gx(TOP)} y2={gy(TOP)} stroke="rgb(var(--accenttext))" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_4px_rgb(var(--accenttext)/0.55)]" {...stroke} />
    </svg>
  );
}

function Node({ children, cell, live = false }: { children: React.ReactNode; cell: Cell; live?: boolean }) {
  return (
    <div className="relative z-10 flex items-center justify-center" style={cellStyle(cell)}>
      <span
        className={`inline-flex max-w-full items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1.5 text-center text-[0.75rem] leading-tight sm:text-[0.8125rem] ${
          live ? "border-line2 text-ink" : "border-line text-ink2"
        }`}
      >
        {live && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accenttext" />}
        <span>{children}</span>
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
              <BeforeLines />
              {copy.beforeNodes.map((n, i) => (
                <Node key={n} cell={RING[i]}>{n}</Node>
              ))}
              <div className="relative z-10 flex items-center justify-center" style={cellStyle(HUB)}>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-attn bg-surface text-[0.8125rem] font-semibold text-attn" style={{ boxShadow: "0 0 0 6px rgb(var(--attn) / 0.07)" }}>
                  {copy.youShort}
                </span>
              </div>
            </div>
            <p className="mt-6 text-center text-[0.875rem] text-ink2">{copy.beforeYou}</p>
          </figure>

          <figure className="panel p-5 sm:p-8">
            <figcaption className="text-[0.8125rem] font-semibold text-ink3">{copy.afterLabel}</figcaption>
            <div className="relative mt-6 grid aspect-[4/3] grid-cols-3 grid-rows-3">
              <AfterLines />
              <div className="relative z-10 flex items-center justify-center" style={cellStyle(TOP)}>
                <span className="relative isolate rounded-full border border-accenttext bg-surface px-3 py-1.5 text-center text-[0.75rem] font-semibold leading-tight text-accenttext sm:text-[0.8125rem]">
                  <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-accentsoft" />
                  {copy.afterYou}
                </span>
              </div>
              {copy.afterItems.map((n, i) => (
                <Node key={n} cell={SIDES[i]} live>{n}</Node>
              ))}
              <div className="relative z-10 flex items-center justify-center" style={cellStyle(HUB)}>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface" style={{ boxShadow: "var(--rim), var(--shadow-card), 0 0 0 6px rgb(var(--accenttext) / 0.06), 0 0 32px rgb(var(--accenttext) / 0.16)" }}>
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
