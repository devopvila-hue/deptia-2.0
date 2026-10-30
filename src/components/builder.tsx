import { connectors } from "@/config/connectors";

export type BuilderCopy = {
  title: string;
  lede: string;
  name: string;
  role: string;
  builds: string;
  outputs: string[];
  owned: string;
  points: { name: string; desc: string }[];
  claim: string;
  note: string;
};

const outputGlyphs = [
  "M3.5 5.5h13v9h-13zM3.5 8h13M7.5 17h5M10 14.5V17",
  "M4 7.5l1.2-3.5h9.6L16 7.5M4 7.5h12v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-8zM8 11h4",
  "M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM13.5 11v5M11 13.5h5",
];

const accounts = connectors.filter((c) => c.name === "GitHub" || c.name === "Vercel");

// Alberto, the development lead: builds the business's own web, shop and small apps in accounts it owns.
export function Builder({ copy }: { copy: BuilderCopy }) {
  return (
    <section aria-labelledby="builder-title" className="band relative py-24 sm:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div data-reveal>
          <h2 id="builder-title" className="t-section max-w-[16ch]">{copy.title}</h2>
          <p className="t-lede mt-5 max-w-[34rem]">{copy.lede}</p>
          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {copy.points.map((p) => (
              <li key={p.name} className="border-t border-line2 pt-4">
                <span className="block text-[1rem] font-semibold tracking-[-0.015em]">{p.name}</span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink2">{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="panel relative overflow-hidden p-6 sm:p-9" data-reveal>
          <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full text-[1.5rem] font-semibold text-[#090b09]" style={{ background: "linear-gradient(135deg,#cbf80d,#50db10 60%,#07a348)" }} aria-hidden="true">
              {copy.name.charAt(0)}
            </span>
            <span className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.02em]">{copy.name}</span>
            <span className="text-[0.875rem] text-ink2">{copy.role}</span>

            <span aria-hidden="true" className="mt-5 h-8 w-px bg-[rgb(var(--accenttext))]" />
            <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accenttext">{copy.builds}</span>
            <span aria-hidden="true" className="h-5 w-px bg-[rgb(var(--accenttext))]" />

            <ul className="mt-1 grid w-full grid-cols-3 gap-2 sm:gap-3">
              {copy.outputs.map((o, i) => (
                <li key={o} className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-bg/60 px-2 py-4 backdrop-blur sm:py-5">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="rgb(var(--accenttext))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={outputGlyphs[i % outputGlyphs.length]} />
                  </svg>
                  <span className="text-[0.8125rem] font-medium leading-tight sm:text-[0.875rem]">{o}</span>
                </li>
              ))}
            </ul>

            <span aria-hidden="true" className="h-6 w-px bg-[var(--line2)]" />
            <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-line2 px-4 py-3">
              <span className="text-[0.8125rem] text-ink2">{copy.owned}</span>
              {accounts.map((c) => (
                <span key={c.name} className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d={c.path} />
                  </svg>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
          <figcaption className="relative mt-7 text-center text-[1.125rem] font-semibold tracking-[-0.02em] sm:text-[1.25rem]">
            <span className="t-brand">{copy.claim}</span>
          </figcaption>
        </figure>
      </div>
      <p className="wrap t-small mt-8 text-center lg:text-left">{copy.note}</p>
    </section>
  );
}
