"use client";

// In-person interview workspace. No session and no interviewee account: the
// interviewer runs the case from this page, presents blocks fullscreen to whoever
// is sitting across from them, and keeps per-section timers + notes on this device.

import { useState } from "react";
import Link from "next/link";
import type { CasePage } from "@/lib/cases/content";
import { InterviewerPanel } from "@/components/interview/InterviewerPanel";
import { PresenterScope } from "@/components/interview/Presenter";
import { SectionSummaryPanel } from "@/components/interview/SectionSummary";
import { useInterviewState } from "@/components/interview/useInterviewState";
import { buildFeedbackPayload, sectionsFromPages } from "@/lib/interview/model";
import { Button } from "@/components/ui/Button";

export function RunCase({
  caseId,
  caseName,
  caseMeta,
  pages,
}: {
  caseId: string;
  caseName: string;
  caseMeta: string;
  pages: CasePage[];
}) {
  const storageKey = `casepass.run.v1.${caseId}`;
  const api = useInterviewState({
    initial: null,
    readLocal: () => {
      try {
        return window.localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    },
    persist: (serialized) => {
      try {
        window.localStorage.setItem(storageKey, serialized);
        return true;
      } catch {
        return false;
      }
    },
  });
  const [reviewing, setReviewing] = useState(false);
  const sections = sectionsFromPages(pages);

  function finish() {
    api.stopAll();
    setReviewing(true);
  }

  function startOver() {
    if (window.confirm("Clear all notes and timers for this case on this device?")) {
      api.reset();
      setReviewing(false);
    }
  }

  return (
    <PresenterScope>
      <section className="p-6 max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div className="min-w-0">
            <Link href={`/cases/${caseId}`} className="text-[13px] text-(--color-muted) hover:text-(--color-fg)">
              ← Back to case
            </Link>
            <h2 className="font-serif text-[21px] font-semibold mt-1">Run in person · {caseName}</h2>
            <div className="text-[12.5px] text-(--color-muted) mt-0.5">{caseMeta}</div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {reviewing ? (
              <Button variant="secondary" onClick={() => setReviewing(false)}>
                ← Back to interview
              </Button>
            ) : (
              <Button onClick={finish}>Finish &amp; review feedback →</Button>
            )}
            <Button variant="ghost" onClick={startOver}>
              Start over
            </Button>
          </div>
        </div>

        {reviewing ? (
          <SectionSummaryPanel caseName={caseName} payload={buildFeedbackPayload(api.state, sections, api.now)} />
        ) : (
          <>
            <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-[9px] px-3.5 py-2.5 mb-4 text-[12.5px] text-[#3a5a4a] leading-relaxed">
              Nothing here needs your interviewee to sign in. Hit <b>Present</b> on the prompt or an exhibit to take just that block
              fullscreen, turn the screen around, then press <b>Esc</b> to come straight back. Notes and timers are kept per section
              and saved on this device.
            </div>
            <InterviewerPanel pages={pages} api={api} onEnd={finish} persistLabel="on this device" title="Interviewer view" />
          </>
        )}
      </section>
    </PresenterScope>
  );
}
