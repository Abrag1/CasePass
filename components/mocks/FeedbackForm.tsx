"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitFeedback } from "@/lib/actions/feedback";
import { SKILL_FIELDS, RATING_SCALE } from "@/lib/validation/feedback";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label, Textarea, FormError } from "@/components/ui/Field";

export function FeedbackForm({ sessionId }: { sessionId: string }) {
  const [state, action, pending] = useActionState(submitFeedback, undefined);
  const [ratings, setRatings] = useState<Record<string, string>>({});

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="sessionId" value={sessionId} />

      <Card className="p-5">
        <div className="font-semibold text-[15px] mb-2.5">Recap</div>
        <Textarea name="recap" rows={2} placeholder="What was the case, briefly?" />
      </Card>

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
