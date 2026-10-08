import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { getFeedbackForSession } from "@/lib/queries/feedback";
import { createClient } from "@/lib/supabase/server";
import { getCasePages, livePages } from "@/lib/cases/content";
import { parseState, sectionsFromPages, serializeState } from "@/lib/interview/model";
import { FeedbackForm } from "@/components/mocks/FeedbackForm";
import { FeedbackReadOnly } from "@/components/mocks/FeedbackReadOnly";

export default async function FeedbackPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (user.id !== session.interviewer_id && user.id !== session.interviewee_id) redirect("/home");

  const existing = await getFeedbackForSession(sessionId);

  if (existing) {
    return (
      <section className="p-7 max-w-2xl mx-auto">
        <FeedbackReadOnly feedback={existing} caseName={session.assigned_case?.name ?? "This mock"} />
      </section>
    );
  }

  if (user.id !== session.interviewer_id) {
    return (
      <section className="p-7 max-w-2xl mx-auto">
        <p className="text-sm text-(--color-muted)">
          {session.interviewer.full_name} hasn&apos;t submitted feedback for this mock yet.
        </p>
      </section>
    );
  }

  // Notes + timers captured during the live mock. A timer still running when the
  // mock ended can't be trusted to the second, so only banked seconds carry over.
  const supabase = await createClient();
  const { data: notesRow } = await supabase
    .from("session_private_notes")
    .select("notes")
    .eq("mock_session_id", sessionId)
    .eq("author_id", user.id)
    .maybeSingle();
  const captured = parseState(notesRow?.notes);
  for (const sec of Object.values(captured.sections)) sec.runningSince = null;
  const pages = session.assigned_case_id ? getCasePages(session.assigned_case_id) : null;
  const sections = pages ? sectionsFromPages(livePages(pages)) : [];

  return (
    <section className="p-7 max-w-2xl mx-auto">
      <h2 className="font-serif text-[23px] font-semibold mb-1">Give feedback</h2>
      <p className="text-[13px] text-(--color-muted) mb-5">
        {session.interviewee.full_name} · {session.assigned_case?.name ?? "Mock"}
      </p>
      <FeedbackForm sessionId={sessionId} sections={sections} initialNotes={serializeState(captured)} />
    </section>
  );
}
