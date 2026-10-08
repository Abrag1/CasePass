"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockSessionRealtime } from "@/lib/realtime/useMockSessionRealtime";
import { setPresented, savePrivateNotes, endMock, setSynopsisShared } from "@/lib/actions/sessions";
import { InterviewerPanel } from "@/components/interview/InterviewerPanel";
import { PresenterScope } from "@/components/interview/Presenter";
import { useInterviewState } from "@/components/interview/useInterviewState";
import type { CasePage } from "@/lib/cases/content";
import { PageExhibit } from "@/components/cases/blocks";
import { Button } from "@/components/ui/Button";
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
  initialSynopsisShared: boolean;
  initialPrivateNotes: string;
  initialEndedAt: string | null;
  initialStatus: string;
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
  initialSynopsisShared,
  initialPrivateNotes,
  initialEndedAt,
  initialStatus,
}: Props) {
  const router = useRouter();
  const isInterviewer = role === "interviewer";
  const firstName = partnerName.split(" ")[0];

  const [presented, setPresentedState] = useState<number | null>(initialPresented);
  const [endedAt, setEndedAt] = useState<string | null>(initialEndedAt);
  const [status, setStatus] = useState(initialStatus);
  const [synopsisShared, setSynopsisSharedState] = useState(initialSynopsisShared);
  // Both-screens split is derived so a stale/forced value can never put an
  // interviewee into split view (which would leak the interviewer panel).
  const [layoutPref, setLayoutPref] = useState<"your" | "both">("your");
  const [, startTransition] = useTransition();
  // Per-section notes + timers; saved to this interviewer's private session notes.
  const interview = useInterviewState({
    initial: initialPrivateNotes,
    persist: (serialized) => savePrivateNotes(sessionId, serialized),
  });

  useMockSessionRealtime(sessionId, (row) => {
    setPresentedState(row.presented);
    setEndedAt(row.ended_at);
    setStatus(row.status);
    setSynopsisSharedState(row.synopsis_shared_live);
  });

  const isSide = isInterviewer && layoutPref === "both";
  const leftShow = isSide || isInterviewer;
  const rightShow = isSide || !isInterviewer;

  function present(i: number) {
    const next = presented === i ? null : i;
    setPresentedState(next);
    startTransition(() => setPresented(sessionId, next));
  }

  function endAndGiveFeedback() {
    startTransition(async () => {
      interview.stopAll();
      await interview.flush();
      await endMock(sessionId);
      router.push(`/mocks/${sessionId}/feedback`);
    });
  }

  function toggleSynopsis() {
    const next = !synopsisShared;
    setSynopsisSharedState(next);
    startTransition(() => setSynopsisShared(sessionId, next));
  }

  return (
    <PresenterScope>
    <section className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h2 className="font-serif text-[21px] font-semibold">Live mock · {caseName}</h2>
          <div className="text-[12.5px] text-(--color-muted) mt-0.5">
            {caseMeta} · {isInterviewer ? `Interviewing ${partnerName}` : `With ${partnerName} as interviewer`}
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
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
              <Button onClick={endAndGiveFeedback}>
                End mock & give feedback →
              </Button>
            </>
          )}
        </div>
      </div>

      {isInterviewer && !isSide && (
        <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-[9px] px-3.5 py-2.5 mb-4 text-[12.5px] text-[#3a5a4a]">
          You’re on the interviewer side. “Send to {firstName}” puts the prompt or an exhibit on {firstName}’s Live Mock
          screen; “Present” on any block (answer, structure, exhibit…) takes it fullscreen — ideal for sharing your screen
          on Zoom during feedback. Switch to “Both screens” to preview what {firstName} sees.
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
              api={interview}
              onEnd={endAndGiveFeedback}
              persistLabel="to your account"
              live={{
                firstName,
                presented,
                onSend: present,
                synopsisShared,
                onToggleSynopsis: toggleSynopsis,
              }}
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
    </PresenterScope>
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
