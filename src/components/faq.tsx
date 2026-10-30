export type FaqCopy = { eyebrow: string; title: string; items: { q: string; a: string }[] };

export function Faq({ copy }: { copy: FaqCopy }) {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="faq-title" className="display-2 mt-3">{copy.title}</h2>
        </div>
        <div className="border-t border-line" data-reveal>
          {copy.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-[4rem] items-center justify-between gap-6 py-4 text-[1.0625rem] font-medium tracking-[-0.01em]">
                <span>{item.q}</span>
                <span aria-hidden="true" className="text-ink-3 transition-transform duration-200 group-open:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M10 4.5v11M4.5 10h11" /></svg>
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 pr-8 text-[1rem] leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
