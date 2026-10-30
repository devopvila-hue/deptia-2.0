import { IconCheck } from "./icons";

export type TodayPanelCopy = {
  example: string;
  appSection: string;
  greeting: string;
  summary: string;
  decisionsTitle: string;
  runningTitle: string;
  doneTitle: string;
  review: string;
  approve: string;
  decisions: { title: string; meta: string; by: string }[];
  inProgress: { title: string; by: string }[];
  done: { title: string; by: string }[];
};

// Illustrative product view, built from the portal's own vocabulary
// (Inicio · Necesita tu atención · Aprobar). Static: no fake live activity.
export function TodayPanel({ copy }: { copy: TodayPanelCopy }) {
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-line bg-canvas shadow-float">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-sand/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 text-[0.8125rem] font-medium text-ink-2">{copy.appSection}</span>
        </div>
        <span className="chip border border-line bg-canvas text-ink-3">{copy.example}</span>
      </div>

      <div className="px-4 pb-5 pt-5 sm:px-6 sm:pt-6">
        <p className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{copy.greeting}</p>
        <p className="mt-1 text-[0.9375rem] text-ink-2">{copy.summary}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <section aria-label={copy.decisionsTitle} className="rounded-2xl bg-amber-soft/70 p-3 sm:col-span-2 sm:p-4">
            <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
              {copy.decisionsTitle}
            </p>
            <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
              {copy.decisions.map((d) => (
                <li key={d.title} className="flex flex-col rounded-xl border border-line bg-canvas p-3 shadow-card">
                  <p className="text-[0.9375rem] font-medium leading-snug text-ink">{d.title}</p>
                  <p className="mt-1 text-[0.8125rem] text-ink-3">{d.meta} · {d.by}</p>
                  <div className="mt-auto flex gap-2 pt-3" aria-hidden="true">
                    <span className="inline-flex h-8 items-center rounded-full border border-line-strong px-3 text-[0.8125rem] font-medium text-ink">{copy.review}</span>
                    <span className="inline-flex h-8 items-center rounded-full bg-accent px-3 text-[0.8125rem] font-medium text-white">{copy.approve}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label={copy.runningTitle} className="hidden rounded-2xl border border-line p-3 sm:block sm:p-4">
            <p className="text-[0.8125rem] font-semibold text-ink-2">{copy.runningTitle}</p>
            <ul className="mt-3 space-y-3">
              {copy.inProgress.map((r, i) => (
                <li key={r.title}>
                  <p className="text-[0.9375rem] leading-snug text-ink">{r.title}</p>
                  <p className="mt-1 text-[0.8125rem] text-ink-3">{r.by}</p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-sand" aria-hidden="true">
                    <div className="h-full rounded-full bg-accent/70" style={{ width: `${[62, 38, 80][i % 3]}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label={copy.doneTitle} className="rounded-2xl border border-line p-3 sm:p-4">
            <p className="text-[0.8125rem] font-semibold text-ink-2">{copy.doneTitle}</p>
            <ul className="mt-3 space-y-3">
              {copy.done.map((d) => (
                <li key={d.title} className="flex gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] leading-snug text-ink">{d.title}</span>
                    <span className="block text-[0.8125rem] text-ink-3">{d.by}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </figure>
  );
}
