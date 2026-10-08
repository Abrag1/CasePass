"use client";

// The interviewer's working view of a case: step-by-step (one section at a time,
// with a sticky control bar) or all sections at once. Shared by the remote Live
// Mock and the in-person Run page. Every section carries its own stopwatch and its
// own notes box; moving to the next section carries a running timer across.

import { useCallback, useEffect, useState } from "react";
import type { CasePage } from "@/lib/cases/content";
import { pageIsPresentable } from "@/lib/cases/content";
import { PageBody } from "@/components/cases/blocks";
import { SectionNotes, SectionTimer } from "@/components/interview/SectionNotes";
import type { InterviewApi } from "@/components/interview/useInterviewState";
import { formatDuration, sectionsFromPages } from "@/lib/interview/model";
import { Textarea } from "@/components/ui/Field";

/** Remote-only controls: push a page onto the interviewee's screen. */
export interface LiveControls {
  firstName: string;
  presented: number | null;
  onSend: (pageIndex: number) => void;
  synopsisShared: boolean;
  onToggleSynopsis: () => void;
}

function shareFor(live: LiveControls | undefined, p: CasePage, i: number) {
  if (!live || !pageIsPresentable(p)) return undefined;
  return { firstName: live.firstName, onScreen: live.presented === i, onShare: () => live.onSend(i) };
}

function SendButton({ onScreen, firstName, onClick }: { onScreen: boolean; firstName: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={`Put this on ${firstName}’s Live Mock screen (they must be in the Live Mock)`}
      className="border-none rounded-md px-3 py-1.5 text-[11.5px] font-semibold cursor-pointer whitespace-nowrap"
      style={onScreen ? { background: "#2d6a4f", color: "#fff" } : { background: "#e9f1ec", color: "#2d6a4f" }}
    >
      {onScreen ? "Shared ✓ (click to hide)" : `Share with ${firstName}`}
    </button>
  );
}

export function InterviewerPanel({
  pages,
  api,
  persistLabel,
  live,
  onEnd,
  title = "Interviewer view",
}: {
  pages: CasePage[];
  api: InterviewApi;
  persistLabel: string;
  live?: LiveControls;
  /** Shown instead of a disabled Next on the last section. */
  onEnd: () => void;
  title?: string;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [view, setView] = useState<"steps" | "all">("steps");
  const sections = sectionsFromPages(pages);
  const cur = pages[stepIdx];
  const curSec = sections[stepIdx];

  const go = useCallback(
    (i: number) => {
      const next = Math.min(pages.length - 1, Math.max(0, i));
      if (next === stepIdx) return;
      // A running stopwatch moves with you: the section you leave records its time.
      api.advance(sections[stepIdx]?.key, sections[next].key);
      setStepIdx(next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pages.length, stepIdx, api.advance],
  );

  // ←/→ move between sections; T toggles the current section's timer. Ignored while
  // typing or while the fullscreen presenter has the arrow keys.
  useEffect(() => {
    if (view !== "steps") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      if (e.key === "ArrowRight") go(stepIdx + 1);
      else if (e.key === "ArrowLeft") go(stepIdx - 1);
      else if ((e.key === "t" || e.key === "T") && curSec) {
        if (api.runningKey === curSec.key) api.stopTimer(curSec.key);
        else api.startTimer(curSec.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, go, stepIdx, curSec, api]);

  const tab = (v: "steps" | "all", label: string) => (
    <button
      onClick={() => setView(v)}
      className={`border-none rounded-[5px] px-2.5 py-1 text-[11.5px] font-semibold cursor-pointer ${view === v ? "text-(--color-fg)" : "bg-transparent text-(--color-muted)"}`}
      style={view === v ? { background: "#eef2f0" } : undefined}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white border border-(--color-border) rounded-xl overflow-clip" style={{ minWidth: 0 }}>
      {/* Header + view mode toggle */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#f3f6f4] border-b border-(--color-border) flex-wrap">
        <span className="font-semibold text-[13px] text-(--color-green) flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-green)" />
          {title}
        </span>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-[#dfe6e1] rounded-[7px] p-0.5">
            {tab("steps", "Step-by-step")}
            {tab("all", "All sections")}
          </div>
        </div>
      </div>

      {/* Section pills with time + notes indicators */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#f2f3f0] overflow-x-auto">
        {pages.map((p, i) => {
          const sec = sections[i];
          const secs = api.secondsFor(sec.key);
          const running = api.runningKey === sec.key;
          const hasNotes = !!api.state.sections[sec.key]?.notes.trim();
          const active = i === stepIdx;
          return (
            <button
              key={p.n}
              onClick={() => {
                go(i);
                setView("steps");
              }}
              title={p.title}
              className="border-none shrink-0 rounded-2xl px-3 py-1.5 text-[11.5px] font-semibold cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
              style={active ? { background: "#2d6a4f", color: "#fff" } : { background: "#f1f2ef", color: "#5b615c" }}
            >
              {running && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active ? "#fff" : "#2d6a4f" }} />}
              {p.n} · {p.label}
              {secs > 0 && <span style={{ opacity: 0.8, fontWeight: 500 }}>{formatDuration(secs)}</span>}
              {hasNotes && <span aria-label="has notes" style={{ opacity: 0.85 }}>✎</span>}
            </button>
          );
        })}
      </div>

      {live && (
        <div className="flex items-center justify-between gap-2.5 px-[18px] py-3 border-b border-[#f2f3f0]">
          <div className="text-[12.5px] text-[#5b615c]">Case synopsis on {live.firstName}’s screen</div>
          <button
            onClick={live.onToggleSynopsis}
            className="border-none rounded-md px-3 py-1.5 text-[12px] font-semibold cursor-pointer"
            style={live.synopsisShared ? { background: "#2d6a4f", color: "#fff" } : { background: "#e9f1ec", color: "#2d6a4f" }}
          >
            {live.synopsisShared ? "Shared ✓" : `Share with ${live.firstName}`}
          </button>
        </div>
      )}

      {view === "all" ? (
        <div>
          {pages.map((p, i) => (
            <div key={p.n} className="px-5 py-[18px] border-b border-[#f2f3f0]">
              <div className="flex items-center justify-between gap-2.5 mb-2.5 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold text-(--color-muted)">{p.n}</span>
                  <span className="font-serif text-[15.5px] font-semibold text-(--color-fg)">{p.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <SectionTimer section={sections[i]} api={api} size="sm" />
                  {live && pageIsPresentable(p) && (
                    <SendButton onScreen={live.presented === i} firstName={live.firstName} onClick={() => live.onSend(i)} />
                  )}
                </div>
              </div>
              <PageBody page={p} sayLabel="Say next" presentable share={shareFor(live, p, i)} />
              <div className="mt-3.5">
                <SectionNotes key={p.n} section={sections[i]} api={api} persistLabel={persistLabel} rows={3} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        cur &&
        curSec && (
          <div>
            {/* Sticky control bar: stays in reach while scrolling a long section. */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-2.5 px-[18px] py-2.5 bg-white/95 backdrop-blur border-b border-[#f2f3f0] flex-wrap">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => go(stepIdx - 1)}
                  disabled={stepIdx === 0}
                  aria-label="Previous section"
                  className="border border-[#d7d9d4] bg-white rounded-[7px] w-8 h-8 cursor-pointer text-[#5b615c] text-[14px] disabled:opacity-40 disabled:cursor-default"
                >
                  ‹
                </button>
                <div className="text-[11px] uppercase tracking-wide text-(--color-muted) font-semibold whitespace-nowrap">
                  Step {stepIdx + 1} of {pages.length}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SectionTimer section={curSec} api={api} />
                {live &&
                  (pageIsPresentable(cur) ? (
                    <SendButton onScreen={live.presented === stepIdx} firstName={live.firstName} onClick={() => live.onSend(stepIdx)} />
                  ) : (
                    <span className="text-[11.5px] text-(--color-muted) whitespace-nowrap" title="Only the prompt and exhibits can be shared to the interviewee’s screen">
                      Nothing to share on this step
                    </span>
                  ))}
                {stepIdx === pages.length - 1 ? (
                  <button
                    onClick={onEnd}
                    className="border-none rounded-lg px-3.5 py-2 text-[13px] font-semibold cursor-pointer text-white"
                    style={{ background: "#15294d" }}
                    title="Stops the timer and takes you to the feedback"
                  >
                    End the interview ✓
                  </button>
                ) : (
                  <button
                    onClick={() => go(stepIdx + 1)}
                    title={api.runningKey === curSec.key ? "Stops this section’s timer and starts the next one" : "Next section"}
                    className="border-none rounded-lg px-3.5 py-2 text-[13px] font-semibold cursor-pointer text-white"
                    style={{ background: "#2d6a4f" }}
                  >
                    Next ›
                  </button>
                )}
              </div>
            </div>

            <div className="p-[18px]">
              <div className="font-serif text-[17px] font-semibold text-(--color-fg) mb-3.5">{cur.title}</div>
              <PageBody page={cur} sayLabel="Say next" presentable share={shareFor(live, cur, stepIdx)} />
              <div className="mt-4">
                <SectionNotes key={cur.n} section={curSec} api={api} persistLabel={persistLabel} />
              </div>
              <div className="mt-2.5 text-[11.5px] text-(--color-muted)">
                Shortcuts: ← → switch section · T pause/resume. Once started, Next records this section and starts the next from 00:00.
              </div>
            </div>
          </div>
        )
      )}

      {/* Whole-interview note — kept apart from every section's notes. */}
      <div className="px-[18px] pb-[18px] pt-1 border-t border-[#f2f3f0]">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5 mt-3">Overall notes (not tied to a section)</div>
        <Textarea rows={2} value={api.state.general} onChange={(e) => api.setGeneral(e.target.value)} placeholder="Overall impressions, hire/no-hire gut check…" />
      </div>
    </div>
  );
}
