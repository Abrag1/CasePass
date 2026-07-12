"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/dal";
import { scheduleSessionSchema, assignCaseSchema } from "@/lib/validation/session";
import { generateBuiltinMeetingLink } from "@/lib/meeting";

export type SessionActionState = { error?: string } | undefined;

export async function scheduleSession(
  _prevState: SessionActionState,
  formData: FormData
): Promise<SessionActionState> {
  const user = await requireUser();
  const parsed = scheduleSessionSchema.safeParse({
    myRole: formData.get("myRole"),
    partnerId: formData.get("partnerId"),
    format: formData.get("format"),
    date: formData.get("date"),
    time: formData.get("time"),
    notes: formData.get("notes") || undefined,
    meetingKind: formData.get("meetingKind") || "builtin",
    meetingLink: formData.get("meetingLink") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { myRole, partnerId, format, date, time, notes, meetingKind, meetingLink } = parsed.data;
  if (partnerId === user.id) {
    return { error: "Pick someone other than yourself as a partner" };
  }

  const scheduledAt = new Date(`${date}T${time}`);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { error: "Enter a valid date and time" };
  }

  const interviewerId = myRole === "interviewer" ? user.id : partnerId;
  const intervieweeId = myRole === "interviewee" ? user.id : partnerId;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mock_sessions")
    .insert({
      interviewer_id: interviewerId,
      interviewee_id: intervieweeId,
      scheduled_at: scheduledAt.toISOString(),
      format,
      notes: notes ?? null,
      meeting_link: meetingKind === "custom" ? meetingLink! : generateBuiltinMeetingLink(),
      status: "pending_invite",
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Could not schedule the mock" };
  }

  const { error: inviteError } = await supabase.from("session_invites").insert({
    mock_session_id: data.id,
    requested_by: user.id,
    requested_of: partnerId,
    proposed_role: myRole === "interviewer" ? "interviewee" : "interviewer",
  });

  if (inviteError) {
    // Don't leave a dangling session the partner never hears about.
    await supabase.from("mock_sessions").delete().eq("id", data.id);
    return { error: inviteError.message };
  }

  revalidatePath("/home");
  redirect("/home");
}

export async function rescheduleSession(
  _prevState: SessionActionState,
  formData: FormData
): Promise<SessionActionState> {
  const user = await requireUser();
  const sessionId = String(formData.get("sessionId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  if (!sessionId || !date || !time) return { error: "Pick a date and time" };

  const scheduledAt = new Date(`${date}T${time}`);
  if (Number.isNaN(scheduledAt.getTime())) return { error: "Enter a valid date and time" };

  const supabase = await createClient();
  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id, interviewee_id, status")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || (session.interviewer_id !== user.id && session.interviewee_id !== user.id)) {
    return { error: "Session not found" };
  }
  if (session.status === "completed" || session.status === "declined") {
    return { error: "This mock can no longer be rescheduled" };
  }

  const partnerId = session.interviewer_id === user.id ? session.interviewee_id : session.interviewer_id;

  const { error: sessionError } = await supabase
    .from("mock_sessions")
    .update({ scheduled_at: scheduledAt.toISOString(), status: "pending_invite" })
    .eq("id", sessionId);
  if (sessionError) return { error: sessionError.message };

  // Whoever proposes the new time becomes the requester; the other side confirms.
  const { data: invite } = await supabase
    .from("session_invites")
    .select("id")
    .eq("mock_session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (invite) {
    await supabase
      .from("session_invites")
      .update({ requested_by: user.id, requested_of: partnerId, status: "pending", responded_at: null })
      .eq("id", invite.id);
  } else {
    await supabase.from("session_invites").insert({
      mock_session_id: sessionId,
      requested_by: user.id,
      requested_of: partnerId,
      proposed_role: session.interviewer_id === partnerId ? "interviewer" : "interviewee",
    });
  }

  revalidatePath("/home");
  revalidatePath("/mocks");
  redirect("/home");
}

export async function respondToInvite(inviteId: string, response: "accepted" | "declined" | "reschedule_requested") {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: invite } = await supabase
    .from("session_invites")
    .select("id, mock_session_id, requested_of, status")
    .eq("id", inviteId)
    .maybeSingle();

  if (!invite || invite.requested_of !== user.id || invite.status !== "pending") return;

  await supabase
    .from("session_invites")
    .update({ status: response, responded_at: new Date().toISOString() })
    .eq("id", inviteId);

  if (response === "accepted") {
    await supabase.from("mock_sessions").update({ status: "confirmed" }).eq("id", invite.mock_session_id);
  } else if (response === "declined") {
    await supabase.from("mock_sessions").update({ status: "declined" }).eq("id", invite.mock_session_id);
  }
  // reschedule_requested leaves the session pending_invite; the requester sees the
  // badge and schedules a fresh time.

  revalidatePath("/home");
  revalidatePath("/mocks");
}

export async function saveIntervieweeNote(sessionId: string, note: string) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewee_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewee_id !== user.id) return;

  await supabase
    .from("mock_sessions")
    .update({ interviewee_note: note.trim() || null })
    .eq("id", sessionId);

  revalidatePath(`/mocks/${sessionId}/preview`);
}

export async function assignCase(
  _prevState: SessionActionState,
  formData: FormData
): Promise<SessionActionState> {
  const user = await requireUser();
  const parsed = assignCaseSchema.safeParse({
    sessionId: formData.get("sessionId"),
    caseId: formData.get("caseId"),
    synopsis: formData.get("synopsis"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { sessionId, caseId, synopsis } = parsed.data;
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id) {
    return { error: "Only the interviewer for this mock can select a case" };
  }

  const { error } = await supabase
    .from("mock_sessions")
    .update({
      assigned_case_id: caseId,
      synopsis_shared_to_interviewee: synopsis,
      status: "case_selected",
    })
    .eq("id", sessionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/home");
  redirect(`/mocks/${sessionId}/assign?shared=1`);
}

export async function startLiveMock(sessionId: string) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id, timer_started_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id) return;
  if (session.timer_started_at) return;

  await supabase
    .from("mock_sessions")
    .update({ timer_started_at: new Date().toISOString() })
    .eq("id", sessionId);

  revalidatePath(`/mocks/${sessionId}/live`);
}

export async function setPresented(sessionId: string, presented: number | null) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id) return;

  await supabase
    .from("mock_sessions")
    .update({ presented, presented_updated_at: new Date().toISOString() })
    .eq("id", sessionId);
}

// Interviewer-controlled toggle for whether the case synopsis chip is visible on
// the candidate's live screen. Defaults off; the interviewer must opt in.
export async function setSynopsisShared(sessionId: string, shared: boolean) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id) return;

  await supabase.from("mock_sessions").update({ synopsis_shared_live: shared }).eq("id", sessionId);
}

export async function endMock(sessionId: string) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id, ended_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id || session.ended_at) return;

  await supabase.from("mock_sessions").update({ ended_at: new Date().toISOString() }).eq("id", sessionId);
}

export async function savePrivateNotes(sessionId: string, notes: string) {
  const user = await requireUser();
  const supabase = await createClient();

  await supabase
    .from("session_private_notes")
    .upsert(
      { mock_session_id: sessionId, author_id: user.id, notes, updated_at: new Date().toISOString() },
      { onConflict: "mock_session_id,author_id" }
    );
}
