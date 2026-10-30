export type TeamMember = { area: string; name: string; does: string; delivers: string; asks: string };

export type TeamCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  whatTitle: string;
  whatBody: string;
  doesLabel: string;
  deliversLabel: string;
  asksLabel: string;
  digitalLabel: string;
  primary: TeamMember[];
  more: TeamMember[];
  expand: string;
};

function MemberCard({ m, labels }: { m: TeamMember; labels: Pick<TeamCopy, "doesLabel" | "deliversLabel" | "asksLabel" | "digitalLabel"> }) {
  return (
    <li className="card flex flex-col p-6">
      <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em]">{m.area}</h3>
      <p className="mt-0.5 text-[0.875rem] text-ink-3">
        {m.name ? `${m.name} · ` : ""}
        {labels.digitalLabel}
      </p>
      <dl className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed">
        <div>
          <dt className="text-[0.8125rem] font-medium text-ink-3">{labels.doesLabel}</dt>
          <dd className="mt-0.5 text-ink">{m.does}</dd>
        </div>
        <div>
          <dt className="text-[0.8125rem] font-medium text-ink-3">{labels.deliversLabel}</dt>
          <dd className="mt-0.5 text-ink">{m.delivers}</dd>
        </div>
        <div className="rounded-xl bg-amber-soft/70 px-3.5 py-3">
          <dt className="text-[0.8125rem] font-medium text-amber">{labels.asksLabel}</dt>
          <dd className="mt-0.5 text-ink">{m.asks}</dd>
        </div>
      </dl>
    </li>
  );
}

export function Team({ copy }: { copy: TeamCopy }) {
  return (
    <section aria-labelledby="team-title" className="bg-sand py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="team-title" className="display-2 mt-3">{copy.title}</h2>
            <p className="lede mt-4">{copy.lede}</p>
          </div>
          <aside className="rounded-2xl border border-line bg-canvas p-5">
            <h3 className="text-[0.9375rem] font-semibold">{copy.whatTitle}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{copy.whatBody}</p>
          </aside>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal>
          {copy.primary.map((m) => (
            <MemberCard key={m.area} m={m} labels={copy} />
          ))}
        </ul>

        <details className="group mt-4">
          <summary className="btn-secondary mx-auto mt-4 w-fit">
            <span>{copy.expand}</span>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </summary>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.more.map((m) => (
              <MemberCard key={m.area} m={m} labels={copy} />
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
