import { IconCheck, IconHand, IconLock } from "./icons";

export type ControlCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  lanes: { own: Lane; approve: Lane; yours: Lane };
  qa: { q: string; a: string }[];
};
type Lane = { title: string; body: string; items: string[] };

export function Control({ copy }: { copy: ControlCopy }) {
  const lanes = [
    { lane: copy.lanes.own, Icon: IconCheck, tone: "bg-accent-soft text-accent-ink" },
    { lane: copy.lanes.approve, Icon: IconHand, tone: "bg-amber-soft text-amber" },
    { lane: copy.lanes.yours, Icon: IconLock, tone: "bg-ink text-white" },
  ];
  return (
    <section aria-labelledby="control-title" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="control-title" className="display-2 mt-3">{copy.title}</h2>
          <p className="lede mt-4">{copy.lede}</p>
        </div>

        <ol className="mt-12 grid gap-4 lg:grid-cols-3" data-reveal>
          {lanes.map(({ lane, Icon, tone }) => (
            <li key={lane.title} className="card p-6">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-semibold tracking-[-0.02em]">{lane.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{lane.body}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[0.9375rem] text-ink">
                {lane.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-ink-3" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <dl className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2" data-reveal>
          {copy.qa.map((item) => (
            <div key={item.q} className="border-t border-line pt-5">
              <dt className="text-[1.0625rem] font-semibold tracking-[-0.01em]">{item.q}</dt>
              <dd className="mt-2 text-[1rem] leading-relaxed text-ink-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
