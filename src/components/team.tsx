export type TeamMember = { area: string; name: string; does: string; delivers: string; asks: string };

export type TeamCopy = {
  title: string;
  lede: string;
  whatTitle: string;
  whatBody: string;
  areaLabel: string;
  doesLabel: string;
  deliversLabel: string;
  asksLabel: string;
  digitalLabel: string;
  primary: TeamMember[];
  more: TeamMember[];
  expand: string;
};

const cols = "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]";

function Row({ m, copy }: { m: TeamMember; copy: TeamCopy }) {
  return (
    <li className={`grid gap-4 border-t border-line py-7 lg:gap-8 ${cols}`}>
      <div className="flex items-start gap-3.5">
        <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg2 text-[0.875rem] font-semibold">
          {(m.name || m.area).slice(0, 1)}
        </span>
        <div>
          <h3 className="text-[1.0625rem] font-semibold tracking-[-0.018em]">{m.area}</h3>
          <p className="t-small mt-0.5">{m.name ? `${m.name} · ` : ""}{copy.digitalLabel}</p>
        </div>
      </div>
      <dl className="contents">
        <div>
          <dt className="t-small mb-1 lg:sr-only">{copy.doesLabel}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-ink2">{m.does}</dd>
        </div>
        <div>
          <dt className="t-small mb-1 lg:sr-only">{copy.deliversLabel}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-ink2">{m.delivers}</dd>
        </div>
        <div>
          <dt className="t-small mb-1 lg:sr-only">{copy.asksLabel}</dt>
          <dd className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink">
            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-attn" aria-hidden="true" />
            <span>{m.asks}</span>
          </dd>
        </div>
      </dl>
    </li>
  );
}

export function Team({ copy }: { copy: TeamCopy }) {
  return (
    <section aria-labelledby="team-title" className="border-t border-line bg-bg2 py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end" data-reveal>
          <div>
            <h2 id="team-title" className="t-section">{copy.title}</h2>
            <p className="t-lede mt-5 max-w-[40rem]">{copy.lede}</p>
          </div>
          <aside className="border-l-2 border-line2 pl-5">
            <h3 className="text-[0.9375rem] font-semibold">{copy.whatTitle}</h3>
            <p className="t-body mt-1.5">{copy.whatBody}</p>
          </aside>
        </div>

        <div className="mt-14" data-reveal>
          <div className={`hidden gap-8 pb-3 text-[0.8125rem] text-ink3 lg:grid ${cols}`} aria-hidden="true">
            <span>{copy.areaLabel}</span>
            <span>{copy.doesLabel}</span>
            <span>{copy.deliversLabel}</span>
            <span>{copy.asksLabel}</span>
          </div>
          <ul>
            {copy.primary.map((m) => (
              <Row key={m.area} m={m} copy={copy} />
            ))}
          </ul>
          <details className="group">
            <summary className="flex h-14 items-center gap-2 border-t border-line text-[0.9375rem] font-medium text-accenttext">
              {copy.expand}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">
                <path d="M6 8l4 4 4-4" />
              </svg>
            </summary>
            <ul>
              {copy.more.map((m) => (
                <Row key={m.area} m={m} copy={copy} />
              ))}
            </ul>
          </details>
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
