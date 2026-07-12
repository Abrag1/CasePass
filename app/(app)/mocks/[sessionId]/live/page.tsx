import { notFound, redirect } from "next/navigation";
import { getMyProfile } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { getCase } from "@/lib/queries/cases";
import { getMyRole } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { getCasePages, livePages, redactPagesForCandidate } from "@/lib/cases/content";
import { LiveMock } from "@/components/mocks/LiveMock";

export default async function LiveMockPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const me = await getMyProfile();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (me.id !== session.interviewer_id && me.id !== session.interviewee_id) redirect("/home");

  if (!session.assigned_case_id) {
    redirect(me.id === session.interviewer_id ? `/mocks/${sessionId}/assign` : `/mocks/${sessionId}/preview`);
  }

  const role = getMyRole(session, me.id);
  const caseDetail = await getCase(session.assigned_case_id!);
  if (!caseDetail) notFound();

  const allPages = getCasePages(session.assigned_case_id!) ?? [];

  // The interviewer gets the full pages (with answers/guidance/calc — rendered only
  // on their private panel). The interviewee's browser only ever receives the prompt
  // body + exhibit data, so answers can't leak. Both lists share the same indices,
  // so `presented` points to the same step for either role.
  const pages = role === "interviewer" ? livePages(allPages) : redactPagesForCandidate(allPages);

  let privateNotes = "";
  if (role === "interviewer") {
    const supabase = await createClient();
    const { data: notesRow } = await supabase
      .from("session_private_notes")
      .select("notes")
      .eq("mock_session_id", sessionId)
      .eq("author_id", me.id)
      .maybeSingle();
    privateNotes = notesRow?.notes ?? "";
  }

  const partner = role === "interviewer" ? session.interviewee : session.interviewer;

  return (
    <LiveMock
      sessionId={sessionId}
      role={role}
      myName={me.full_name}
      partnerName={partner.full_name}
      meetingLink={session.meeting_link}
      caseName={caseDetail.name}
      caseMeta={`${caseDetail.case_type} · ${caseDetail.difficulty}`}
      pages={pages}
      synopsis={session.synopsis_shared_to_interviewee ?? caseDetail.synopsis}
      initialPresented={session.presented}
      initialTimerStartedAt={session.timer_started_at}
      initialSynopsisShared={session.synopsis_shared_live}
      initialPrivateNotes={privateNotes}
      initialEndedAt={session.ended_at}
      initialStatus={session.status}
    />
  );
}
