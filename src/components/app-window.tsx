export type AppWindowCopy = {
  example: string;
  url: string;
  company: string;
  user: string;
  navItems: string[];
  requestWork: string;
  greeting: string;
  date: string;
  summary: string;
  decisionsTitle: string;
  runningTitle: string;
  doneTitle: string;
  review: string;
  approve: string;
  decisions: { title: string; meta: string; by: string }[];
  inProgress: { title: string; by: string }[];
  done: { title: string; by: string; time: string }[];
};

const navIcons = [
  "M3.5 9.2L10 4l6.5 5.2V16a1 1 0 01-1 1h-3.3v-4.5H7.8V17H4.5a1 1 0 01-1-1V9.2z",
  "M4 5.5h12v7.5H8l-4 3v-3V5.5z",
  "M5 6.5l1.5 1.5L9 5.5M5 12.5l1.5 1.5L9 11.5M11.5 7h4M11.5 13h4",
  "M10 3.5l5.5 2v4.2c0 3.4-2.4 5.9-5.5 6.8-3.1-.9-5.5-3.4-5.5-6.8V5.5l5.5-2zM7.6 10l1.7 1.7 3.2-3.4",
  "M4.5 5.5h11v10.5h-11zM4.5 8.5h11M7.5 3.8v3M12.5 3.8v3",
  "M10 9.5a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4zM4.8 16c.6-2.6 2.7-4.2 5.2-4.2s4.6 1.6 5.2 4.2",
  "M6 3.5h6l3 3V16a.5.5 0 01-.5.5h-8.5A.5.5 0 015.5 16V4a.5.5 0 01.5-.5zM8 9.5h5M8 12.5h5",
];

function Monogram({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg3 text-[0.6875rem] font-semibold text-ink2">
      {text.slice(0, 1)}
    </span>
  );
}

// Product view drawn after the portal's real structure (Inicio, Encargar,
// Aprobaciones). Illustrative data only, labelled as an example.
export function AppWindow({ copy }: { copy: AppWindowCopy }) {
  return (
    <figure className="overflow-hidden rounded-[18px] border border-line bg-bg text-left" style={{ boxShadow: "var(--shadow-window)" }}>
      <div className="relative flex h-10 items-center justify-center border-b border-line bg-bg2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-bg px-3 py-1 text-[0.75rem] text-ink3 ring-1 ring-line">
          <svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
            <path d="M7 9V6.8a3 3 0 016 0V9" />
          </svg>
          {copy.url}
        </span>
        <figcaption className="absolute right-3 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-ink3">{copy.example}</figcaption>
      </div>

      <div className="grid lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-line bg-bg2/60 px-3 py-4 lg:flex lg:flex-col" aria-hidden="true">
          <div className="flex items-center gap-2 px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="" width={18} height={18} className="rounded-[4px]" />
            <span className="truncate text-[0.8125rem] font-semibold tracking-[-0.01em]">{copy.company}</span>
          </div>
          <ul className="mt-5 space-y-0.5">
            {copy.navItems.map((item, i) => (
              <li
                key={item}
                className={`flex h-8 items-center gap-2.5 rounded-md px-2 text-[0.8125rem] ${i === 0 ? "bg-bg3 font-medium text-ink" : "text-ink2"}`}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={i === 0 ? "text-ink" : "text-ink3"}>
                  <path d={navIcons[i % navIcons.length]} />
                </svg>
                <span className="flex-1 truncate">{item}</span>
                {i === 3 && <span className="rounded-full bg-attnsoft px-1.5 text-[0.6875rem] font-semibold tabular-nums text-attn">{copy.decisions.length}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-2 border-t border-line px-2 pt-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[0.625rem] font-semibold text-bg">{copy.user.slice(0, 1)}</span>
            <span className="text-[0.8125rem] text-ink2">{copy.user}</span>
          </div>
        </aside>

        <div className="min-w-0 px-4 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[1.25rem] font-semibold tracking-[-0.025em] sm:text-[1.375rem]">{copy.greeting}</p>
              <p className="mt-0.5 text-[0.8125rem] text-ink3">{copy.date} · {copy.summary}</p>
            </div>
            <span className="hidden h-8 shrink-0 items-center rounded-full bg-accent px-3.5 text-[0.8125rem] font-medium text-onaccent sm:inline-flex" aria-hidden="true">
              {copy.requestWork}
            </span>
          </div>

          <section aria-label={copy.decisionsTitle} className="mt-6">
            <p className="flex items-center gap-2 text-[0.8125rem] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-attn" aria-hidden="true" />
              {copy.decisionsTitle}
              <span className="font-normal text-ink3 tabular-nums">{copy.decisions.length}</span>
            </p>
            <ul className="mt-2.5 divide-y divide-line overflow-hidden rounded-xl border border-line">
              {copy.decisions.map((d) => (
                <li key={d.title} className="flex flex-col gap-3 px-3.5 py-3 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Monogram text={d.by} />
                    <div className="min-w-0">
                      <p className="truncate text-[0.875rem] font-medium tracking-[-0.01em]">{d.title}</p>
                      <p className="truncate text-[0.75rem] text-ink3">{d.by} · {d.meta}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 pl-10 sm:pl-0" aria-hidden="true">
                    <span className="inline-flex h-7 items-center rounded-full border border-line2 px-3 text-[0.75rem] font-medium">{copy.review}</span>
                    <span className="inline-flex h-7 items-center rounded-full bg-ink px-3 text-[0.75rem] font-medium text-bg">{copy.approve}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <section aria-label={copy.runningTitle} className="hidden sm:block">
              <p className="text-[0.8125rem] font-semibold">{copy.runningTitle}</p>
              <ul className="mt-2.5 divide-y divide-line border-y border-line">
                {copy.inProgress.map((r, i) => (
                  <li key={r.title} className="py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-[0.8125rem]">{r.title}</p>
                      <p className="shrink-0 text-[0.6875rem] text-ink3">{r.by}</p>
                    </div>
                    <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-bg3" aria-hidden="true">
                      <div className="h-full rounded-full bg-ink2" style={{ width: `${[64, 36, 82][i % 3]}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-label={copy.doneTitle}>
              <p className="text-[0.8125rem] font-semibold">{copy.doneTitle}</p>
              <ul className="mt-2.5 divide-y divide-line border-y border-line">
                {copy.done.map((d) => (
                  <li key={d.title} className="flex items-baseline gap-3 py-2.5">
                    <span className="w-9 shrink-0 text-[0.6875rem] tabular-nums text-ink3">{d.time}</span>
                    <span className="min-w-0 flex-1 truncate text-[0.8125rem]">{d.title}</span>
                    <span className="hidden shrink-0 text-[0.6875rem] text-ink3 md:inline">{d.by}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
