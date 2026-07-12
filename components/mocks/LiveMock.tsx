"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockSessionRealtime } from "@/lib/realtime/useMockSessionRealtime";
import { setPresented, startLiveMock, savePrivateNotes, endMock, setSynopsisShared } from "@/lib/actions/sessions";
import type { CasePage } from "@/lib/cases/content";
import { pageIsPresentable } from "@/lib/cases/content";
import { PageBody, PageExhibit } from "@/components/cases/blocks";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { VideoPanel } from "@/components/mocks/VideoPanel";

interface Props {
  sessionId: string;
  role: "interviewer" | "interviewee";
  myName: string;
  partnerName: string;
  meetingLink: string | null;
  caseName: string;
  caseMeta: string;
  pages: CasePage[];
  synopsis: string;
  initialPresented: number | null;
  initialTimerStartedAt: string | null;
  initialSynopsisShared: boolean;
  initialPrivateNotes: string;
  initialEndedAt: string | null;
  initialStatus: string;
}

function formatElapsed(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LiveMock({
  sessionId,
  role,
  myName,
  partnerName,
  meetingLink,
  caseName,
  caseMeta,
  pages,
  synopsis,
  initialPresented,
  initialTimerStartedAt,
  initialSynopsisShared,
  initialPrivateNotes,
  initialEndedAt,
  initialStatus,
}: Props) {
  const router = useRouter();
  const isInterviewer = role === "interviewer";
  const firstName = partnerName.split(" ")[0];

  const [presented, setPresentedState] = useState<number | null>(initialPresented);
  const [timerStartedAt, setTimerStartedAt] = useState<string | null>(initialTimerStartedAt);
  const [endedAt, setEndedAt] = useState<string | null>(initialEndedAt);
  const [status, setStatus] = useState(initialStatus);
  const [elapsed, setElapsed] = useState(0);
  const [notes, setNotes] = useState(initialPrivateNotes);
  const [synopsisShared, setSynopsisSharedState] = useState(initialSynopsisShared);
  const [stepIdx, setStepIdx] = useState(0);
  const [view, setView] = useState<"steps" | "all">("steps");
  // Both-screens split is derived so a stale/forced value can never put an
  // interviewee into split view (which would leak the interviewer panel).
  const [layoutPref, setLayoutPref] = useState<"your" | "both">("your");
  const [, startTransition] = useTransition();
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMockSessionRealtime(sessionId, (row) => {
    setPresentedState(row.presented);
    setTimerStartedAt(row.timer_started_at);
    setEndedAt(row.ended_at);
    setStatus(row.status);
    setSynopsisSharedState(row.synopsis_shared_live);
  });

  useEffect(() => {
    if (!timerStartedAt) return;
    const start = new Date(timerStartedAt).getTime();
    const id = setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [timerStartedAt]);

  const isSide = isInterviewer && layoutPref === "both";
  const leftShow = isSide || isInterviewer;
  const rightShow = isSide || !isInterviewer;

  function present(i: number) {
    const next = presented === i ? null : i;
    setPresentedState(next);
    setStepIdx(i);
    startTransition(() => setPresented(sessionId, next));
  }

  function toggleSynopsis() {
    const next = !synopsisShared;
    setSynopsisSharedState(next);
    startTransition(() => setSynopsisShared(sessionId, next));
  }

  function onNotesChange(value: string) {
    setNotes(value);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => {
      startTransition(() => savePrivateNotes(sessionId, value));
    }, 600);
  }

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h2 className="font-serif text-[21px] font-semibold">Live mock · {caseName}</h2>
          <div className="text-[12.5px] text-(--color-muted) mt-0.5">
            {caseMeta} · {isInterviewer ? `Interviewing ${partnerName}` : `With ${partnerName} as interviewer`}
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-(--color-border) rounded-lg px-3 py-1.5">
            <span className="font-serif text-[20px] font-semibold tabular-nums">{formatElapsed(elapsed)}</span>
            {isInterviewer && !timerStartedAt && (
              <button
                className="border-none bg-[#e9f1ec] text-(--color-green) rounded-md px-2.5 py-1 text-[12px] font-semibold cursor-pointer"
                onClick={() => startTransition(() => startLiveMock(sessionId))}
              >
                Start
              </button>
            )}
          </div>

          {/* Layout toggle + End mock render for the interviewer ONLY. An interviewee
              must never be able to force "Both screens" (it would expose the private
              interviewer panel). */}
          {isInterviewer && (
            <>
              <div className="flex bg-[#f1f2ef] rounded-lg p-[3px]">
                <button
                  onClick={() => setLayoutPref("your")}
                  className={`border-none rounded-md px-2.5 py-1.5 text-[12px] font-semibold cursor-pointer ${
                    !isSide ? "bg-white text-(--color-fg)" : "bg-transparent text-(--color-muted)"
                  }`}
                >
                  Your view
                </button>
                <button
                  onClick={() => setLayoutPref("both")}
                  className={`border-none rounded-md px-2.5 py-1.5 text-[12px] font-semibold cursor-pointer ${
                    isSide ? "bg-white text-(--color-fg)" : "bg-transparent text-(--color-muted)"
                  }`}
                >
                  Both screens
                </button>
              </div>
              <Button
                onClick={() =>
                  startTransition(async () => {
                    await endMock(sessionId);
                    router.push(`/mocks/${sessionId}/feedback`);
                  })
                }
              >
                End mock & give feedback →
              </Button>
            </>
          )}
        </div>
      </div>

      {isInterviewer && !isSide && (
        <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-[9px] px-3.5 py-2.5 mb-4 text-[12.5px] text-[#3a5a4a]">
          You’re on the interviewer side. Use the Present buttons to push the prompt or an exhibit onto {firstName}’s
          screen; switch to “Both screens” to preview exactly what {firstName} sees.
        </div>
      )}

      {role === "interviewee" && (endedAt || status === "completed") && (
        <div className="flex items-center gap-3 bg-[#e9f1ec] border border-[#cfe3d7] rounded-xl px-4 py-3.5 mb-4 flex-wrap">
          <div className="w-[30px] h-[30px] shrink-0 rounded-full bg-(--color-green) text-white flex items-center justify-center text-[15px]">
            ✓
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="font-semibold text-[14px] text-[#1f3a2b]">
              {status === "completed" ? "Feedback is in!" : "Mock concluded"}
            </div>
            <div className="text-[12.5px] text-[#3a5a4a] mt-0.5">
              {status === "completed"
                ? `${partnerName} submitted your feedback — see what changed.`
                : `${partnerName} ended the mock and is writing your feedback now.`}
            </div>
          </div>
          {status === "completed" && (
            <Link href={`/mocks/${sessionId}/feedback/summary`}>
              <Button>View feedback →</Button>
            </Link>
          )}
        </div>
      )}

      <VideoPanel meetingLink={meetingLink} displayName={myName} subject={`CasePass mock · ${caseName}`} />

      <div
        className="mt-4"
        style={isSide ? { display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18, alignItems: "start" } : { maxWidth: 800, marginInline: "auto" }}
      >
        {leftShow && (
          <div style={{ minWidth: 0 }}>
            <InterviewerPanel
              pages={pages}
              firstName={firstName}
              presented={presented}
              onPresent={present}
              stepIdx={stepIdx}
              onStep={setStepIdx}
              view={view}
              onView={setView}
              synopsisShared={synopsisShared}
              onToggleSynopsis={toggleSynopsis}
              notes={notes}
              onNotesChange={onNotesChange}
            />
          </div>
        )}

        {rightShow && (
          <div style={{ minWidth: 0 }}>
            <CandidatePanel
              pages={pages}
              presented={presented}
              label={isInterviewer ? `${firstName}’s screen · shared view` : "Your screen · shared view"}
              controlNote={isInterviewer ? "You control the screen" : "The interviewer controls this screen"}
              synopsis={synopsis}
              synopsisShared={synopsisShared}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function PresentButton({ onScreen, firstName, onClick }: { onScreen: boolean; firstName: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border-none rounded-md px-3 py-1.5 text-[11.5px] font-semibold cursor-pointer whitespace-nowrap"
      style={onScreen ? { background: "#2d6a4f", color: "#fff" } : { background: "#e9f1ec", color: "#2d6a4f" }}
    >
      {onScreen ? "On screen ✓" : `Present to ${firstName}`}
    </button>
  );
}

function InterviewerPanel({
  pages,
  firstName,
  presented,
  onPresent,
  stepIdx,
  onStep,
  view,
  onView,
  synopsisShared,
  onToggleSynopsis,
  notes,
  onNotesChange,
}: {
  pages: CasePage[];
  firstName: string;
  presented: number | null;
  onPresent: (i: number) => void;
  stepIdx: number;
  onStep: (i: number) => void;
  view: "steps" | "all";
  onView: (v: "steps" | "all") => void;
  synopsisShared: boolean;
  onToggleSynopsis: () => void;
  notes: string;
  onNotesChange: (v: string) => void;
}) {
  const cur = pages[stepIdx];

  return (
    <div className="bg-white border border-(--color-border) rounded-xl overflow-hidden" style={{ minWidth: 0 }}>
      {/* Header + view mode toggle */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f3f6f4] border-b border-(--color-border)">
        <span className="font-semibold text-[13px] text-(--color-green) flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-green)" />
          Interviewer view
        </span>
        <div className="flex bg-white border border-[#dfe6e1] rounded-[7px] p-0.5">
          <button
            onClick={() => onView("steps")}
            className={`border-none rounded-[5px] px-2.5 py-1 text-[11.5px] font-semibold cursor-pointer ${
              view === "steps" ? "bg-white text-(--color-fg)" : "bg-transparent text-(--color-muted)"
            }`}
            style={view === "steps" ? { background: "#eef2f0" } : undefined}
          >
            Step-by-step
          </button>
          <button
            onClick={() => onView("all")}
            className={`border-none rounded-[5px] px-2.5 py-1 text-[11.5px] font-semibold cursor-pointer ${
              view === "all" ? "text-(--color-fg)" : "bg-transparent text-(--color-muted)"
            }`}
            style={view === "all" ? { background: "#eef2f0" } : undefined}
          >
            All sections
          </button>
        </div>
      </div>

      {/* Chapter pills */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#f2f3f0] overflow-x-auto">
        {pages.map((p, i) => (
          <button
            key={p.n}
            onClick={() => {
              onStep(i);
              onView("steps");
            }}
            title={p.title}
            className="border-none shrink-0 rounded-2xl px-3 py-1.5 text-[11.5px] font-semibold cursor-pointer whitespace-nowrap"
            style={i === stepIdx ? { background: "#2d6a4f", color: "#fff" } : { background: "#f1f2ef", color: "#5b615c" }}
          >
            {p.n} · {p.label}
          </button>
        ))}
      </div>

      {/* Case synopsis share control */}
      <div className="flex items-center justify-between gap-2.5 px-[18px] py-3.5 border-b border-[#f2f3f0]">
        <div className="text-[12.5px] text-[#5b615c]">Case synopsis on {firstName}’s screen</div>
        <button
          onClick={onToggleSynopsis}
          className="border-none rounded-md px-3 py-1.5 text-[12px] font-semibold cursor-pointer"
          style={synopsisShared ? { background: "#2d6a4f", color: "#fff" } : { background: "#e9f1ec", color: "#2d6a4f" }}
        >
          {synopsisShared ? "Shared ✓" : `Share with ${firstName}`}
        </button>
      </div>

      {view === "all" ? (
        <div className="py-1.5 max-h-[640px] overflow-y-auto">
          {pages.map((p, i) => (
            <div key={p.n} className="px-5 py-[18px] border-b border-[#f2f3f0]">
              <div className="flex items-center justify-between gap-2.5 mb-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold text-(--color-muted)">{p.n}</span>
                  <span className="font-serif text-[15.5px] font-semibold text-(--color-fg)">{p.title}</span>
                </div>
                {pageIsPresentable(p) && <PresentButton onScreen={presented === i} firstName={firstName} onClick={() => onPresent(i)} />}
              </div>
              <PageBody page={p} sayLabel="Say next" />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-[18px]">
          <div className="flex items-center justify-between gap-2.5 mb-3.5">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onStep(Math.max(0, stepIdx - 1))}
                className="border border-[#d7d9d4] bg-white rounded-[7px] w-7 h-7 cursor-pointer text-[#5b615c] text-[13px]"
              >
                ‹
              </button>
              <div className="text-[11px] uppercase tracking-wide text-(--color-muted) font-semibold">
                Step {stepIdx + 1} of {pages.length}
              </div>
              <button
                onClick={() => onStep(Math.min(pages.length - 1, stepIdx + 1))}
                className="border border-[#d7d9d4] bg-white rounded-[7px] w-7 h-7 cursor-pointer text-[#5b615c] text-[13px]"
              >
                ›
              </button>
            </div>
            {cur && pageIsPresentable(cur) && (
              <PresentButton onScreen={presented === stepIdx} firstName={firstName} onClick={() => onPresent(stepIdx)} />
            )}
          </div>
          {cur && (
            <>
              <div className="font-serif text-[17px] font-semibold text-(--color-fg) mb-3.5">{cur.title}</div>
              <PageBody page={cur} sayLabel="Say next" />
            </>
          )}
        </div>
      )}

      {/* Private notes — always at the bottom, never shown to the candidate. */}
      <div className="px-[18px] pb-[18px]">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5 mt-1.5">Private notes</div>
        <Textarea rows={3} value={notes} onChange={(e) => onNotesChange(e.target.value)} placeholder="Jot observations as the case runs…" />
      </div>
    </div>
  );
}

function CandidatePanel({
  pages,
  presented,
  label,
  controlNote,
  synopsis,
  synopsisShared,
}: {
  pages: CasePage[];
  presented: number | null;
  label: string;
  controlNote: string;
  synopsis: string;
  synopsisShared: boolean;
}) {
  const page = presented != null ? pages[presented] : null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#1f2421", minWidth: 0 }}>
      <div className="flex items-center justify-between gap-2.5 px-4 py-3" style={{ background: "#262c28", borderBottom: "1px solid #333a35", minWidth: 0 }}>
        <span className="font-semibold text-[13px] flex items-center gap-1.5" style={{ color: "#cfe3d7", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#7fd1a3" }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        </span>
        <span className="text-[11.5px] whitespace-nowrap shrink-0" style={{ color: "#8a958d" }}>
          {controlNote}
        </span>
      </div>

      <div className="p-[18px]" style={{ minHeight: 460, background: "#1f2421" }}>
        {synopsisShared && (
          <div className="mb-4 flex gap-2.5 items-start rounded-[9px] px-3.5 py-3" style={{ background: "#262c28" }}>
            <span className="text-[10px] font-bold rounded-[5px] px-1.5 py-0.5 whitespace-nowrap" style={{ letterSpacing: ".05em", color: "#11150f", background: "#7fd1a3", marginTop: 1 }}>
              CASE
            </span>
            <div className="text-[12.5px] leading-relaxed" style={{ color: "#c4cdc7" }}>
              {synopsis}
            </div>
          </div>
        )}

        {page ? (
          <>
            <div className="text-[11px] uppercase tracking-wide font-semibold mb-2.5" style={{ color: "#8a958d" }}>
              Now on screen · {page.title}
            </div>
            {page.kind === "ready" ? (
              <div className="text-[16px] leading-relaxed rounded-[10px] p-[22px] whitespace-pre-wrap" style={{ color: "#eef2ef", background: "#262c28" }}>
                {page.body}
              </div>
            ) : (
              <PageExhibit page={page} dark />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 text-center rounded-[10px]" style={{ border: "1px dashed #3a4239" }}>
            <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center mb-3.5" style={{ background: "#333a35" }}>
              <span className="block w-[18px] h-[13px] rounded-sm" style={{ border: "2px solid #7fd1a3" }} />
            </div>
            <div className="text-[14px] font-medium" style={{ color: "#c4cdc7" }}>
              Nothing on screen yet
            </div>
            <div className="text-[12.5px] mt-1 max-w-[260px] leading-relaxed" style={{ color: "#8a958d" }}>
              When the interviewer presents the prompt or an exhibit, it fills this screen.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
