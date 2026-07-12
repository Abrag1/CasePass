import Link from "next/link";
import type { FeedbackRow } from "@/lib/queries/feedback";
import { SKILL_FIELDS } from "@/lib/validation/feedback";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function FeedbackReadOnly({ feedback, caseName }: { feedback: FeedbackRow; caseName: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-[22px] font-semibold mb-1">Feedback</h2>
        <p className="text-[13px] text-(--color-muted)">{caseName}</p>
      </div>

      {feedback.recap_text && (
        <Card className="p-5">
          <div className="font-semibold text-[14px] mb-1.5">Recap</div>
          <p className="text-[14px] text-[#2a2f2b] leading-relaxed">{feedback.recap_text}</p>
        </Card>
      )}

      <Card className="p-5">
        <div className="font-semibold text-[14px] mb-3">Skill ratings</div>
        {SKILL_FIELDS.map((f) => {
          const v = feedback.skill_ratings[f.key];
          if (!v) return null;
          return (
            <div key={f.key} className="flex items-center justify-between py-1.5 border-t border-(--color-border-soft)">
              <span className="text-[13.5px]">{f.label}</span>
              <span className="text-[13px] font-semibold text-(--color-green)">{v}/5</span>
            </div>
          );
        })}
      </Card>

      <Card className="p-5 flex flex-col gap-3">
        {feedback.went_well && <Field label="What went well" value={feedback.went_well} />}
        {feedback.improve && <Field label="What to improve" value={feedback.improve} />}
        {feedback.practice_next && <Field label="What to practice next" value={feedback.practice_next} />}
      </Card>

      <div className="flex justify-end">
        <Link href="/home">
          <Button variant="secondary">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1">{label}</div>
      <p className="text-[14px] text-[#2a2f2b] leading-relaxed">{value}</p>
    </div>
  );
}
