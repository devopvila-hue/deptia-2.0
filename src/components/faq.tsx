export type FaqCopy = { title: string; items: { q: string; a: string }[] };

export function Faq({ copy }: { copy: FaqCopy }) {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line py-24 sm:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <h2 id="faq-title" className="t-section" data-reveal>{copy.title}</h2>
        <div className="border-t border-line" data-reveal>
          {copy.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-[4.25rem] items-center justify-between gap-6 py-4 text-[1.0625rem] font-medium tracking-[-0.015em]">
                <span>{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-ink3 transition-transform duration-200 group-open:rotate-45">
                  <path d="M10 4.5v11M4.5 10h11" />
                </svg>
              </summary>
              <p className="t-body max-w-[40rem] pb-6 pr-8 text-[1rem]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
