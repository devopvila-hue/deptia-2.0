export type IncludedCopy = { title: string; lede: string; items: { name: string; desc: string }[]; note: string };

// One glyph per tool, same 20px stroke grid as the rest of the page.
const glyphs = [
  "M10 9.5a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4zM4.8 16c.6-2.6 2.7-4.2 5.2-4.2s4.6 1.6 5.2 4.2M15 6.5h2.5M15 9.5h2.5",
  "M6 3.5h6l3 3V16a.5.5 0 01-.5.5h-8.5A.5.5 0 015.5 16V4a.5.5 0 01.5-.5zM8 9.5h5M8 12.5h5M8 6.5h2",
  "M4 8.5v3l8 3.5v-10L4 8.5zM12 5l3.5-1.5v13L12 15M4 11.5l1 4h2l-.6-3",
  "M4 5.5h12v7.5H8l-4 3v-3V5.5z",
  "M4.5 5.5h11v10.5h-11zM4.5 8.5h11M7.5 3.8v3M12.5 3.8v3M7.5 12l1.5 1.5L12.5 10",
  "M4 7.5l1.2-3.5h9.6L16 7.5M4 7.5h12v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-8zM8 11h4",
];

export function Included({ copy }: { copy: IncludedCopy }) {
  return (
    <section aria-labelledby="included-title" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="mx-auto max-w-[46rem] text-center" data-reveal>
          <h2 id="included-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {copy.items.map((it, i) => (
            <li key={it.name} className="surface flex gap-4 p-5 sm:p-6">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentsoft text-accenttext" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={glyphs[i % glyphs.length]} />
                </svg>
              </span>
              <span>
                <span className="block text-[1.0625rem] font-semibold tracking-[-0.02em]">{it.name}</span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink2">{it.desc}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="t-small mt-6 text-center">{copy.note}</p>
      </div>
    </section>
  );
}
