"use client";

import { useState } from "react";
import {
  formatDurationLong,
  summaryToText,
  totalSeconds,
  type SectionFeedbackPayload,
} from "@/lib/interview/model";
import { PresentContentButton, PresenterScope } from "@/components/interview/Presenter";

/** Feedback broken down section by section: time spent + that section's notes. */
export function SectionBreakdown({ payload, large = false }: { payload: SectionFeedbackPayload; large?: boolean }) {
  const rows = payload.sections.filter((s) => s.notes || s.seconds > 0);
  const total = totalSeconds(payload.sections);
  const timed = payload.sections.filter((s) => s.seconds > 0);
  const maxSec = Math.max(1, ...timed.map((s) => s.seconds));

  return (
    <div className="flex flex-col gap-3" style={{ fontSize: large ? 15 : 14 }}>
      {total > 0 && (
        <div className="rounded-[10px] border border-(--color-border) bg-white p-3.5">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">Time by section</div>
            <div className="text-[12.5px] font-semibold">Total {formatDurationLong(total)}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            {timed.map((s) => (
              <div key={s.key} className="flex items-center gap-2.5 text-[12.5px]">
                <div className="w-[38%] min-w-0 truncate" title={`${s.label} · ${s.title}`}>
                  {s.label}
                </div>
                <div className="flex-1 h-2 rounded-full bg-[#eef0ec] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.max(4, (s.seconds / maxSec) * 100)}%`, background: "#2d6a4f" }} />
                </div>
                <div className="w-[64px] text-right tabular-nums text-[#3a3f3b]">{formatDurationLong(s.seconds)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {rows.length === 0 && !payload.general && (
        <div className="rounded-[10px] border border-dashed border-(--color-border) p-4 text-[13px] text-(--color-muted)">
          No section notes or timings were recorded.
        </div>
      )}

      {rows.map((s) => (
        <div key={s.key} className="rounded-[10px] border border-(--color-border) bg-white p-3.5" style={{ borderLeft: "3px solid #2d6a4f" }}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
            <div>
              <span className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">{s.label}</span>
              <div className="font-serif font-semibold text-[#1f2421]" style={{ fontSize: large ? 18 : 16 }}>
                {s.title}
              </div>
            </div>
            {s.seconds > 0 && (
              <span className="text-[12px] font-semibold rounded-full bg-[#e9f1ec] text-(--color-green) px-2.5 py-1 whitespace-nowrap">
                ⏱ {formatDurationLong(s.seconds)}
              </span>
            )}
          </div>
          {s.notes ? (
            <p className="whitespace-pre-wrap leading-relaxed text-[#2a2f2b]">{s.notes}</p>
          ) : (
            <p className="italic text-(--color-muted) text-[13px]">No notes for this section.</p>
          )}
        </div>
      ))}

      {payload.general && (
        <div className="rounded-[10px] border border-(--color-border) bg-white p-3.5" style={{ borderLeft: "3px solid #15294d" }}>
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5">Overall</div>
          <p className="whitespace-pre-wrap leading-relaxed text-[#2a2f2b]">{payload.general}</p>
        </div>
      )}
    </div>
  );
}

/** Breakdown + copy / present / print actions. Provides its own PresenterScope. */
export function SectionSummaryPanel({
  caseName,
  payload,
  extraActions,
}: {
  caseName: string;
  payload: SectionFeedbackPayload;
  extraActions?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryToText(caseName, payload));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — nothing to do
    }
  }

  return (
    <PresenterScope>
      <div className="flex items-center gap-2 mb-3 flex-wrap print:hidden">
        <PresentContentButton title={`Feedback · ${caseName}`} content={<SectionBreakdown payload={payload} large />}>
          Present summary
        </PresentContentButton>
        <button
          type="button"
          onClick={copy}
          className="rounded-lg border border-(--color-border) bg-white px-3 py-2 text-[13px] font-semibold cursor-pointer hover:bg-neutral-50"
        >
          {copied ? "Copied ✓" : "Copy as text"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-(--color-border) bg-white px-3 py-2 text-[13px] font-semibold cursor-pointer hover:bg-neutral-50"
        >
          Print / save PDF
        </button>
        {extraActions}
      </div>
      <SectionBreakdown payload={payload} />
    </PresenterScope>
  );
}
