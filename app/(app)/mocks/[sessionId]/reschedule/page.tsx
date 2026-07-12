import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { getMyRole, formatDateTime, FORMAT_LABELS } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { RescheduleForm } from "@/components/mocks/RescheduleForm";

export default async function ReschedulePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (user.id !== session.interviewer_id && user.id !== session.interviewee_id) redirect("/home");
  if (session.status === "completed" || session.status === "declined") redirect("/home");

  const role = getMyRole(session, user.id);
  const partner = role === "interviewer" ? session.interviewee : session.interviewer;
  const dt = formatDateTime(session.scheduled_at);

  const scheduled = new Date(session.scheduled_at);
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultDate = `${scheduled.getFullYear()}-${pad(scheduled.getMonth() + 1)}-${pad(scheduled.getDate())}`;
  const defaultTime = `${pad(scheduled.getHours())}:${pad(scheduled.getMinutes())}`;

  return (
    <section className="p-7 max-w-xl mx-auto">
      <Link href="/home" className="text-[13px] text-(--color-muted) hover:text-(--color-fg) mb-3.5 inline-block">
        ← Back to home
      </Link>
      <Card className="p-7">
        <h2 className="font-serif text-[22px] font-semibold mb-1.5">Propose a new time</h2>
        <p className="text-[13px] text-(--color-muted) mb-5 leading-relaxed">
          {FORMAT_LABELS[session.format]} with {partner.full_name}, currently {dt.full} · {dt.time}.
          Pick a new slot — {partner.full_name.split(" ")[0]} will confirm it from their account.
        </p>
        <RescheduleForm sessionId={session.id} defaultDate={defaultDate} defaultTime={defaultTime} />
      </Card>
    </section>
  );
}
