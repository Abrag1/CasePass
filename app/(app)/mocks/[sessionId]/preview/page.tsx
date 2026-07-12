import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { formatDateTime } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IntervieweeNote } from "@/components/mocks/IntervieweeNote";
import { AddToCalendar } from "@/components/ui/AddToCalendar";

const EXPECT = [
  "One or two exhibits to interpret",
  "Some quick math under time pressure",
  "A clear structure and final recommendation",
];

const TIMELINE = [
  { when: "NOW", title: "Case shared", desc: "Your interviewer picked the case and sent you this synopsis." },
  { when: "BEFORE THE CALL", title: "Brush up", desc: "Review the format and industry — not the case itself." },
  { when: "LIVE", title: "Full case", desc: "The prompt and exhibits appear on your screen during the mock." },
];

export default async function PreviewPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (session.interviewee_id !== user.id) redirect("/home");

  const dt = formatDateTime(session.scheduled_at);

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <h2 className="font-serif text-[23px] font-semibold mb-1">Upcoming mock</h2>
      <p className="text-[13px] text-(--color-muted) mb-2">
        With {session.interviewer.full_name} · {dt.full} · {dt.time}
      </p>
      {(session.status === "confirmed" || session.status === "case_selected") && (
        <div className="mb-6">
          <AddToCalendar
            sessionId={session.id}
            title={`CasePass mock: ${session.assigned_case?.name ?? "Case interview"}`}
            startIso={session.scheduled_at}
            format={session.format}
            partnerName={session.interviewer.full_name}
            meetingLink={session.meeting_link}
          />
        </div>
      )}

      {!session.assigned_case ? (
        <Card className="p-8 text-center">
          <div className="w-11 h-11 rounded-full bg-[#f1f2ef] flex items-center justify-center mx-auto mb-3 text-[19px]">
            ⏳
          </div>
          <div className="font-semibold text-[14px]">{session.interviewer.full_name} hasn&apos;t picked a case yet</div>
          <p className="text-[12.5px] text-(--color-muted) mt-1.5 max-w-sm mx-auto leading-relaxed">
            You&apos;ll get a case preview here as soon as they share one. Nothing to prep until then.
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5">Case</div>
          <div className="font-serif text-[19px] font-semibold mb-3.5">{session.assigned_case.name}</div>
          <div className="bg-white border border-(--color-border-soft) rounded-lg p-4 text-[14.5px] leading-relaxed mb-4.5">
            {session.synopsis_shared_to_interviewee}
          </div>

          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-2.5">
            What to expect
          </div>
          {EXPECT.map((e) => (
            <div key={e} className="flex gap-2.5 items-start text-[13.5px] py-1">
              <span className="text-(--color-green) mt-0.5">•</span>
              {e}
            </div>
          ))}

          <div className="border-t border-(--color-border-soft) mt-4 pt-4">
            <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-3">
              How this case unfolds
            </div>
            <div className="flex gap-2.5 flex-col sm:flex-row">
              {TIMELINE.map((t) => (
                <div key={t.when} className="flex-1 bg-(--color-bg) border border-(--color-border-soft) rounded-lg p-3">
                  <div className="text-[10px] font-bold tracking-wide text-(--color-green) mb-1.5">{t.when}</div>
                  <div className="text-[13px] font-semibold mb-0.5">{t.title}</div>
                  <div className="text-[12px] text-(--color-muted) leading-snug">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[12.5px] text-(--color-muted) mt-4 mb-5 leading-relaxed">
            You only ever see the synopsis until the call — the full prompt and exhibits appear live.
          </p>

          <Link href={`/mocks/${session.id}/live`}>
            <Button className="w-full">I&apos;m ready — open mock</Button>
          </Link>
        </Card>
      )}

      <IntervieweeNote sessionId={session.id} initialNote={session.interviewee_note} />
    </section>
  );
}
