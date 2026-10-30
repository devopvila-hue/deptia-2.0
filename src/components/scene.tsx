"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { IconCalendar, IconCheck, IconDoc, IconHand, IconMail, IconUser } from "./icons";
import { track } from "@/lib/analytics";

export type SceneCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  example: string;
  stepsLabel: string;
  departify: string;
  you: string;
  actorTeam: string;
  actorYou: string;
  steps: { title: string; does: string; you: string }[];
  mail: { from: string; subject: string; body: string; tag: string; received: string };
  contact: { name: string; company: string; fields: { label: string; value: string }[]; stage: string };
  quote: { title: string; lines: { item: string; amount: string }[]; total: string; totalValue: string; draft: string; reply: string };
  approval: { title: string; summary: string; edit: string; reject: string; approve: string; note: string };
  next: { sent: string; logged: string; followUp: string; followUpDate: string; alert: string };
};

const stepIcons = [IconMail, IconUser, IconDoc, IconHand, IconCalendar];

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

  return (
    <section id="como-funciona" aria-labelledby="scene-title" className="scroll-mt-16 bg-sand py-20 sm:py-28">
      <div className="wrap">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="scene-title" className="display-2 mt-3">{copy.title}</h2>
          <p className="lede mt-4">{copy.lede}</p>
          <p className="mt-4">
            <span className="chip border border-line-strong bg-canvas text-ink-2">{copy.example}</span>
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10" data-reveal>
          <div
            role="tablist"
            aria-label={copy.stepsLabel}
            className="grid grid-cols-5 gap-2 lg:flex lg:flex-col"
          >
            {copy.steps.map((s, i) => {
              const Icon = stepIcons[i];
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
                  className={`group flex w-full flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-center transition-colors duration-150 lg:flex-row lg:items-start lg:gap-4 lg:p-5 lg:text-left ${
                    selected ? "border-line bg-canvas shadow-card" : "border-transparent hover:bg-canvas/60"
                  }`}
                >
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      selected ? "bg-accent text-white" : "bg-canvas text-ink-2 ring-1 ring-line"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] font-medium tabular-nums text-ink-3 lg:text-[0.8125rem]">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`sr-only lg:not-sr-only lg:block lg:text-[1.0625rem] lg:font-semibold lg:tracking-[-0.015em] ${selected ? "text-ink" : "text-ink-2"}`}>
                      {s.title}
                    </span>
                    {selected && (
                      <span className="mt-3 hidden space-y-2 text-[0.9375rem] leading-relaxed lg:block">
                        <StepRoles copy={copy} step={s} />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="scene-panel"
            role="tabpanel"
            aria-labelledby={`scene-tab-${active}`}
            className="relative rounded-3xl border border-line bg-canvas p-4 shadow-float sm:p-6 lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-4 text-[0.8125rem] font-medium text-ink-2">
              {String(active + 1).padStart(2, "0")} · {step.title}
            </p>
            <div key={active} className="scene-swap">
              <div className="mb-5 space-y-2 text-[0.9375rem] leading-relaxed lg:hidden">
                <StepRoles copy={copy} step={step} />
              </div>
              <div className="lg:min-h-[17rem]">
                <SceneVisual index={active} copy={copy} />
              </div>
            </div>
            <p
              className={`mt-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[0.875rem] font-medium ${
                active === 3 ? "bg-amber-soft text-amber" : "bg-accent-soft/70 text-accent-ink"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active === 3 ? "bg-amber" : "bg-accent"}`} aria-hidden="true" />
              {active === 3 ? copy.actorYou : copy.actorTeam}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRoles({ copy, step }: { copy: SceneCopy; step: SceneCopy["steps"][number] }) {
  return (
    <>
      <span className="block text-ink-2">
        <span className="font-medium text-ink">{copy.departify}: </span>
        {step.does}
      </span>
      <span className="block text-ink-2">
        <span className="font-medium text-accent-ink">{copy.you}: </span>
        {step.you}
      </span>
    </>
  );
}

function SceneVisual({ index, copy }: { index: number; copy: SceneCopy }) {
  if (index === 0) {
    const m = copy.mail;
    return (
      <div className="rounded-2xl border border-line">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand text-[0.8125rem] font-semibold text-ink-2" aria-hidden="true">
              {m.from.slice(0, 1)}
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium">{m.from}</p>
              <p className="text-[0.8125rem] text-ink-3">{m.received}</p>
            </div>
          </div>
          <span className="chip bg-accent-soft text-accent-ink">{m.tag}</span>
        </div>
        <div className="px-4 py-4">
          <p className="text-[1rem] font-semibold">{m.subject}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{m.body}</p>
        </div>
      </div>
    );
  }
  if (index === 1) {
    const c = copy.contact;
    return (
      <div className="rounded-2xl border border-line p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent-ink" aria-hidden="true">
              <IconUser className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[1rem] font-semibold">{c.name}</p>
              <p className="text-[0.875rem] text-ink-3">{c.company}</p>
            </div>
          </div>
          <span className="chip border border-line text-ink-2">{c.stage}</span>
        </div>
        <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {c.fields.map((f) => (
            <div key={f.label} className="border-t border-line pt-2.5">
              <dt className="text-[0.8125rem] text-ink-3">{f.label}</dt>
              <dd className="text-[0.9375rem] text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
  if (index === 2) {
    const q = copy.quote;
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-line p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[1rem] font-semibold">{q.title}</p>
            <span className="chip bg-sand text-ink-2">{q.draft}</span>
          </div>
          <table className="mt-4 w-full text-[0.9375rem]">
            <tbody>
              {q.lines.map((l) => (
                <tr key={l.item} className="border-t border-line">
                  <td className="py-2.5 pr-4 text-ink-2">{l.item}</td>
                  <td className="py-2.5 text-right tabular-nums text-ink">{l.amount}</td>
                </tr>
              ))}
              <tr className="border-t border-ink/80">
                <td className="py-2.5 pr-4 font-semibold">{q.total}</td>
                <td className="py-2.5 text-right font-semibold tabular-nums">{q.totalValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl border border-dashed border-line-strong p-4 text-[0.9375rem] leading-relaxed text-ink-2">
          <IconMail className="mb-2 h-[18px] w-[18px] text-ink-3" />
          {q.reply}
        </div>
      </div>
    );
  }
  if (index === 3) {
    const a = copy.approval;
    return (
      <div className="rounded-2xl border border-line bg-amber-soft/50 p-4 sm:p-5">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
          {a.title}
        </p>
        <div className="mt-3 rounded-xl border border-line bg-canvas p-4 shadow-card">
          <p className="text-[1rem] font-medium leading-snug">{a.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
            <span className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[0.875rem] font-medium">{a.edit}</span>
            <span className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[0.875rem] font-medium">{a.reject}</span>
            <span className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-[0.875rem] font-medium text-white">{a.approve}</span>
          </div>
        </div>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-2">{a.note}</p>
      </div>
    );
  }
  const n = copy.next;
  return (
    <ol className="relative space-y-4 pl-8">
      <span className="absolute bottom-3 left-[11px] top-3 w-px bg-line" aria-hidden="true" />
      {[n.sent, n.logged].map((t) => (
        <li key={t} className="relative">
          <span className="absolute -left-8 top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
            <IconCheck className="h-3.5 w-3.5" />
          </span>
          <p className="text-[0.9375rem] text-ink">{t}</p>
        </li>
      ))}
      <li className="relative">
        <span className="absolute -left-8 top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-accent ring-1 ring-accent">
          <IconCalendar className="h-3.5 w-3.5" />
        </span>
        <div className="rounded-xl border border-line p-4">
          <p className="text-[0.9375rem] font-medium">{n.followUp}</p>
          <p className="mt-0.5 text-[0.875rem] text-ink-3">{n.followUpDate}</p>
        </div>
      </li>
      <li className="relative">
        <span className="absolute -left-8 top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-ink-3 ring-1 ring-line" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        <p className="text-[0.9375rem] text-ink-2">{n.alert}</p>
      </li>
    </ol>
  );
}
