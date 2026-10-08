"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitFeedback } from "@/lib/actions/feedback";
import { SKILL_FIELDS, RATING_SCALE } from "@/lib/validation/feedback";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Textarea, FormError } from "@/components/ui/Field";
import { SectionNotes, SectionTimer } from "@/components/interview/SectionNotes";
import { useInterviewState } from "@/components/interview/useInterviewState";
import { buildFeedbackPayload, formatDurationLong, totalSeconds, type SectionInfo } from "@/lib/interview/model";

export function FeedbackForm({
  sessionId,
  sections,
  initialNotes,
}: {
  sessionId: string;
  sections: SectionInfo[];
  /** Serialized per-section notes + timers captured during the live mock. */
  initialNotes: string;
}) {
  // Edit-only copy of what was captured live; it only reaches the database on submit.
  const interview = useInterviewState({ initial: initialNotes, persist: () => true });
  const payload = buildFeedbackPayload(interview.state, sections, interview.now);
  const total = totalSeconds(payload.sections);
  const [state, action, pending] = useActionState(submitFeedback, undefined);
  const [ratings, setRatings] = useState<Record<string, string>>({});

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="sessionId" value={sessionId} />

      <Card className="p-5">
        <div className="font-semibold text-[15px] mb-2.5">Recap</div>
        <Textarea name="recap" rows={2} placeholder="What was the case, briefly?" />
      </Card>

      {sections.length > 0 && (
        <Card className="p-5">
          <input type="hidden" name="sectionFeedback" value={JSON.stringify(payload)} />
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
            <div className="font-semibold text-[15px]">Feedback by section</div>
            {total > 0 && <div className="text-[12.5px] text-(--color-muted)">Total time {formatDurationLong(total)}</div>}
          </div>
          <p className="text-[12.5px] text-(--color-muted) mb-4">
            Notes and timings from the mock, one box per section. Edit anything, or use the dropdown for common comments — each
            section is shown to the interviewee exactly as written here.
          </p>
          <div className="flex flex-col gap-4">
            {sections.map((sec) => (
              <div key={sec.key}>
                <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                  <div className="font-serif text-[15px] font-semibold">{sec.title}</div>
                  <SectionTimer section={sec} api={interview} size="sm" display="time" />
                </div>
                <SectionNotes section={sec} api={interview} persistLabel={null} rows={3} />
              </div>
            ))}
            <div>
              <Label>Overall (not tied to a section)</Label>
              <Textarea rows={2} value={interview.state.general} onChange={(e) => interview.setGeneral(e.target.value)} />
            </div>
          </div>
        </Card>
      )}

      <Card className="p-5">
        <div className="font-semibold text-[15px] mb-1">Skill ratings</div>
        <p className="text-[12.5px] text-(--color-muted) mb-4">Rate each area from the mock, 1–5.</p>
        {SKILL_FIELDS.map((f) => (
          <div key={f.key} className="flex items-center justify-between gap-4 py-2 border-t border-(--color-border-soft)">
            <div className="text-[14px] font-medium flex-none w-[190px]">{f.label}</div>
            <div className="flex gap-1.5 flex-1">
              {RATING_SCALE.map((v) => {
                const selected = ratings[f.key] === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRatings((r) => ({ ...r, [f.key]: v }))}
                    className={`flex-1 rounded-md py-2 text-[12.5px] font-semibold cursor-pointer border ${
                      selected
                        ? "bg-(--color-green) text-white border-(--color-green)"
                        : "bg-white text-(--color-muted) border-(--color-border)"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <input type="hidden" name={`rating_${f.key}`} value={ratings[f.key] ?? ""} />
          </div>
        ))}
      </Card>

      <Card className="p-5 flex flex-col gap-4">
        <div>
          <Label>What went well</Label>
          <Textarea name="wentWell" rows={2} />
        </div>
        <div>
          <Label>What to improve</Label>
          <Textarea name="improve" rows={2} />
        </div>
        <div>
          <Label>What to practice next</Label>
          <Textarea name="practiceNext" rows={2} />
        </div>
      </Card>

      <FormError message={state?.error} />

      <div className="flex justify-end gap-3">
        <Link href={`/mocks/${sessionId}/live`}>
          <Button type="button" variant="secondary">
            Back
          </Button>
        </Link>
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting…" : "Submit feedback"}
        </Button>
      </div>
    </form>
  );
}
