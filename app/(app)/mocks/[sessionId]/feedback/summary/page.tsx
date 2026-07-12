import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { getFeedbackForSession } from "@/lib/queries/feedback";
import { SKILL_FIELDS } from "@/lib/validation/feedback";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function FeedbackSummaryPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (user.id !== session.interviewer_id && user.id !== session.interviewee_id) redirect("/home");

  const feedback = await getFeedbackForSession(sessionId);
  if (!feedback) redirect(`/mocks/${sessionId}/feedback`);

  const isInterviewer = user.id === session.interviewer_id;

  return (
    <section className="p-7 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 bg-[#e9f1ec] border border-[#cfe3d7] rounded-xl px-4.5 py-4 mb-5">
        <div className="w-[34px] h-[34px] shrink-0 rounded-full bg-(--color-green) text-white flex items-center justify-center text-[17px]">
          ✓
        </div>
        <div>
          <div className="font-semibold text-[15px] text-[#1f3a2b]">
            {isInterviewer
              ? `Feedback submitted — ${session.interviewee.full_name}'s profile updated`
              : `You received feedback from ${session.interviewer.full_name}`}
          </div>
          <div className="text-[13px] text-[#3a5a4a] mt-0.5">
            {isInterviewer ? `Here's what changed on ${session.interviewee.full_name}'s account.` : "Your case history has been updated."}
          </div>
        </div>
      </div>

      <Card className="p-5 mb-4">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5">
          {session.assigned_case?.name ?? "Case"}
        </div>
        <div className="font-serif text-[18px] font-semibold">{session.assigned_case?.name}</div>
      </Card>

      <Card className="p-5 mb-5">
        <div className="font-semibold text-[15px] mb-3">Skill ratings from this mock</div>
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

      <div className="flex gap-3">
        <Link href={`/profile/${session.interviewee_id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            View full history
          </Button>
        </Link>
        <Link href="/home" className="flex-1">
          <Button className="w-full">Back to home</Button>
        </Link>
      </div>
    </section>
  );
}
