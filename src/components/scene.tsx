"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";

export type SceneCopy = {
  title: string;
  lede: string;
  example: string;
  stepsLabel: string;
  departify: string;
  you: string;
  actorTeam: string;
  actorYou: string;
  steps: { title: string; does: string; you: string }[];
  mail: { inbox: string; from: string; to: string; subject: string; body: string; tag: string; received: string; others: { from: string; subject: string; time: string }[] };
  contact: { name: string; company: string; fields: { label: string; value: string }[]; stage: string };
  quote: { company: string; title: string; client: string; date: string; lines: { item: string; amount: string }[]; total: string; totalValue: string; draft: string; reply: string };
  approval: { title: string; summary: string; items: string[]; reject: string; approve: string; note: string };
  next: { sent: string; logged: string; followUp: string; followUpDate: string; day: string; dayNumber: string; alert: string };
};

const YOU_STEP = 3;

export function Scene({ copy }: { copy: SceneCopy }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    setActive(i);
    track("scene_step_viewed", { step: i + 1 });
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = copy.steps.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  const step = copy.steps[active];
  const yours = active === YOU_STEP;

  return (
    <section id="como-funciona" aria-labelledby="scene-title" className="scroll-mt-14 border-t border-line py-24 sm:py-32">
      <div className="wrap">
        <div className="max-w-[44rem]" data-reveal>
          <h2 id="scene-title" className="t-section">{copy.title}</h2>
          <p className="t-lede mt-5">{copy.lede}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14" data-reveal>
          <div role="tablist" aria-label={copy.stepsLabel} className="grid grid-cols-5 gap-1 lg:flex lg:flex-col lg:gap-0 lg:border-t lg:border-line">
            {copy.steps.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`scene-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="scene-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`relative text-left transition-colors lg:border-b lg:border-line lg:py-5 lg:pl-5 ${
                    selected ? "text-ink" : "text-ink3 hover:text-ink2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[2px] rounded-full lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[2px] ${selected ? "bg-ink" : "bg-line lg:bg-transparent"}`}
                  />
                  <span className="block pb-3 text-center text-[0.8125rem] font-medium tabular-nums lg:pb-0 lg:text-left">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sr-only lg:not-sr-only lg:mt-1 lg:block lg:text-[1.0625rem] lg:font-semibold lg:tracking-[-0.018em]">{s.title}</span>
                  {selected && (
                    <span className="mt-3 hidden space-y-1.5 text-[0.9375rem] leading-relaxed text-ink2 lg:block">
                      <Roles copy={copy} step={s} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div id="scene-panel" role="tabpanel" aria-labelledby={`scene-tab-${active}`} className="min-w-0">
            <div className="mb-5 lg:hidden">
              <p className="text-[1.25rem] font-semibold tracking-[-0.02em]">{step.title}</p>
              <div className="mt-2 space-y-1.5 text-[0.9375rem] leading-relaxed text-ink2">
                <Roles copy={copy} step={step} />
              </div>
            </div>
            <div className="rounded-[20px] bg-bg2 p-3 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center justify-between gap-3 px-1 text-[0.75rem]">
                <span className={`inline-flex items-center gap-1.5 font-medium ${yours ? "text-attn" : "text-ink2"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${yours ? "bg-attn" : "bg-accenttext"}`} aria-hidden="true" />
                  {yours ? copy.actorYou : copy.actorTeam}
                </span>
                <span className="text-ink3">{copy.example}</span>
              </div>
              <div key={active} className="swap lg:min-h-[24rem]">
                <Visual index={active} copy={copy} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roles({ copy, step }: { copy: SceneCopy; step: SceneCopy["steps"][number] }) {
  return (
    <>
      <span className="block">
        <span className="font-medium text-ink">{copy.departify}. </span>
        {step.does}
      </span>
      <span className="block">
        <span className="font-medium text-ink">{copy.you}. </span>
        {step.you}
      </span>
    </>
  );
}

function Visual({ index, copy }: { index: number; copy: SceneCopy }) {
  if (index === 0) {
    const m = copy.mail;
    return (
      <div className="space-y-3">
        <section aria-label={m.inbox} className="surface overflow-hidden">
          <p className="border-b border-line px-4 py-2.5 text-[0.75rem] font-semibold text-ink2">{m.inbox}</p>
          <ul className="divide-y divide-line text-[0.8125rem]">
            <li className="flex items-center gap-3 bg-accentsoft/50 px-4 py-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accenttext" aria-hidden="true" />
              <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                <span className="block truncate font-semibold sm:w-40 sm:shrink-0">{m.from}</span>
                <span className="block truncate">{m.subject}</span>
              </span>
              <span className="hidden shrink-0 rounded-md bg-accentsoft px-1.5 py-0.5 text-[0.6875rem] font-semibold text-accenttext sm:inline">{m.tag}</span>
              <span className="min-w-[3rem] shrink-0 text-right text-[0.75rem] text-ink3">{m.received.split(/,\s*/).pop()}</span>
            </li>
            {m.others.map((o) => (
              <li key={o.from} className="flex items-center gap-3 px-4 py-2.5 text-ink2">
                <span className="h-1.5 w-1.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                  <span className="block truncate text-ink sm:w-40 sm:shrink-0 sm:text-ink2">{o.from}</span>
                  <span className="block truncate">{o.subject}</span>
                </span>
                <span className="min-w-[3rem] shrink-0 text-right text-[0.75rem] text-ink3">{o.time}</span>
              </li>
            ))}
          </ul>
        </section>
        <article className="surface overflow-hidden">
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span aria-hidden="true" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg3 text-[0.8125rem] font-semibold text-ink2">
                {m.from.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em]">{m.from}</p>
                <p className="truncate text-[0.75rem] text-ink3">{m.to}</p>
              </div>
            </div>
            <span className="shrink-0 text-[0.75rem] text-ink3">{m.received}</span>
          </header>
          <div className="px-5 py-5">
            <p className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{m.subject}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink2">{m.body}</p>
          </div>
        </article>
      </div>
    );
  }
  if (index === 1) {
    const c = copy.contact;
    return (
      <article className="surface p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[1.25rem] font-semibold tracking-[-0.02em]">{c.name}</p>
            <p className="mt-0.5 text-[0.8125rem] text-ink3">{c.company}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.75rem] font-medium text-attn">
            <span className="h-1.5 w-1.5 rounded-full bg-attn" aria-hidden="true" />
            {c.stage}
          </span>
        </div>
        <dl className="mt-6 grid border-t border-line sm:grid-cols-2">
          {c.fields.map((f, i) => (
            <div key={f.label} className={`border-b border-line py-3 ${i % 2 === 0 ? "sm:pr-4" : "sm:border-l sm:pl-4"}`}>
              <dt className="text-[0.75rem] text-ink3">{f.label}</dt>
              <dd className="mt-0.5 text-[0.9375rem]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    );
  }
  if (index === 2) {
    const q = copy.quote;
    return (
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <article className="surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <p className="text-[0.8125rem] font-semibold tracking-[-0.01em]">{q.company}</p>
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-ink3">{q.draft} · PDF</span>
          </div>
          <p className="mt-4 text-[1rem] font-semibold tracking-[-0.015em]">{q.title}</p>
          <p className="text-[0.75rem] text-ink3">{q.client} · {q.date}</p>
          <table className="mt-4 w-full text-[0.8125rem]">
            <tbody>
              {q.lines.map((l) => (
                <tr key={l.item} className="border-t border-line">
                  <td className="py-2 pr-3 text-ink2">{l.item}</td>
                  <td className="py-2 text-right tabular-nums">{l.amount}</td>
                </tr>
              ))}
              <tr className="border-t border-ink">
                <td className="pt-2.5 font-semibold">{q.total}</td>
                <td className="pt-2.5 text-right font-semibold tabular-nums">{q.totalValue}</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="surface flex flex-col p-5">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-ink3">{q.draft}</p>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-ink2">{q.reply}</p>
        </article>
      </div>
    );
  }
  if (index === 3) {
    const a = copy.approval;
    return (
      <article className="surface p-5 sm:p-6">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-attn" aria-hidden="true" />
          {a.title}
        </p>
        <p className="mt-3 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">{a.summary}</p>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
          {a.items.map((it) => (
            <li key={it} className="flex items-center gap-3 px-3.5 py-2.5 text-[0.8125rem] text-ink2">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="text-ink3">
                <path d="M6 3h5.5L15 6.5V16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
                <path d="M11 3v4h4" />
              </svg>
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-end gap-2" aria-hidden="true">
          <span className="inline-flex h-9 items-center rounded-full border border-line2 px-4 text-[0.875rem] font-medium">{a.reject}</span>
          <span className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[0.875rem] font-medium text-bg">{a.approve}</span>
        </div>
        <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink3">{a.note}</p>
      </article>
    );
  }
  const n = copy.next;
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <article className="surface p-5">
        <ol className="space-y-4">
          {[n.sent, n.logged].map((t) => (
            <li key={t} className="flex gap-3 text-[0.875rem]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-px shrink-0 text-accenttext">
                <circle cx="10" cy="10" r="7.25" />
                <path d="M7 10.2l2 2 4-4.4" />
              </svg>
              <span>{t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink3">{n.alert}</p>
      </article>
      <article className="surface flex gap-4 p-5">
        <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border border-line" aria-hidden="true">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-attn">{n.day}</span>
          <span className="text-[1.25rem] font-semibold leading-none tabular-nums">{n.dayNumber}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-medium leading-snug">{n.followUp}</p>
          <p className="mt-1 text-[0.8125rem] text-ink3">{n.followUpDate}</p>
        </div>
      </article>
    </div>
  );
}
