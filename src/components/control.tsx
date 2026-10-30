export type ControlCopy = {
  title: string;
  lede: string;
  lanes: { own: Lane; approve: Lane; yours: Lane };
  qa: { q: string; a: string }[];
};
type Lane = { title: string; body: string; items: string[] };

export function Control({ copy }: { copy: ControlCopy }) {
  const lanes = [
    { lane: copy.lanes.own, dot: "bg-accenttext" },
    { lane: copy.lanes.approve, dot: "bg-attn" },
    { lane: copy.lanes.yours, dot: "bg-ink" },
  ];
  return (
    <section aria-labelledby="control-title" className="border-t border-line py-24 sm:py-32">
      <div className="wrap">
        <div className="max-w-[46rem]" data-reveal>
          <h2 id="control-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        <ol className="mt-14 grid overflow-hidden rounded-[20px] border border-line lg:grid-cols-3" data-reveal>
          {lanes.map(({ lane, dot }, i) => (
            <li key={lane.title} className={`p-6 sm:p-8 ${i > 0 ? "border-t border-line lg:border-l lg:border-t-0" : ""} ${i === 2 ? "bg-bg2" : ""}`}>
              <p className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                <span className="t-title">{lane.title}</span>
              </p>
              <p className="t-body mt-2">{lane.body}</p>
              <ul className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
                {lane.items.map((it) => (
                  <li key={it} className="py-2.5">{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <dl className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2" data-reveal>
          {copy.qa.map((item) => (
            <div key={item.q}>
              <dt className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{item.q}</dt>
              <dd className="t-body mt-2 text-[1rem]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
