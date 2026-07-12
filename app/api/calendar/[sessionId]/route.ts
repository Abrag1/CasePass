import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/queries/sessions";
import { buildIcs } from "@/lib/calendar";
import { FORMAT_LABELS } from "@/lib/utils";

// Downloads a .ics calendar file for a mock session. RLS already restricts the
// session lookup to its two participants, but we auth-check explicitly anyway.
export async function GET(_request: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const session = await getSession(sessionId);
  if (!session || (user.id !== session.interviewer_id && user.id !== session.interviewee_id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const title = `CasePass mock: ${session.assigned_case?.name ?? FORMAT_LABELS[session.format]}`;
  const description = [
    `Mock case interview on CasePass.`,
    `Interviewer: ${session.interviewer.full_name}`,
    `Interviewee: ${session.interviewee.full_name}`,
    ...(session.meeting_link ? [`Join: ${session.meeting_link}`] : []),
  ].join("\n");

  const ics = buildIcs({
    sessionId: session.id,
    title,
    startIso: session.scheduled_at,
    format: session.format,
    description,
    meetingLink: session.meeting_link,
  });

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="casepass-mock.ics"`,
    },
  });
}
