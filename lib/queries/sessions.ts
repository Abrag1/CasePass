import { createClient } from "@/lib/supabase/server";
import type { SessionFormat, SessionStatus, Presented } from "@/lib/supabase/types";

export interface SessionParticipant {
  id: string;
  full_name: string;
  initials: string;
}

export interface SessionRow {
  id: string;
  interviewer_id: string;
  interviewee_id: string;
  scheduled_at: string;
  format: SessionFormat;
  meeting_link: string | null;
  notes: string | null;
  status: SessionStatus;
  assigned_case_id: string | null;
  synopsis_shared_to_interviewee: string | null;
  synopsis_shared_live: boolean;
  interviewee_note: string | null;
  presented: Presented;
  timer_started_at: string | null;
  ended_at: string | null;
  interviewer: SessionParticipant;
  interviewee: SessionParticipant;
  assigned_case: { id: string; name: string } | null;
}

const SESSION_SELECT =
  "id, interviewer_id, interviewee_id, scheduled_at, format, meeting_link, notes, status, assigned_case_id, synopsis_shared_to_interviewee, synopsis_shared_live, interviewee_note, presented, timer_started_at, ended_at, " +
  "interviewer:profiles!mock_sessions_interviewer_id_fkey(id, full_name, initials), " +
  "interviewee:profiles!mock_sessions_interviewee_id_fkey(id, full_name, initials)";

interface RawSession extends Omit<SessionRow, "interviewer" | "interviewee" | "assigned_case"> {
  interviewer: SessionParticipant | SessionParticipant[];
  interviewee: SessionParticipant | SessionParticipant[];
}

function first<T>(v: T | T[]): T {
  return Array.isArray(v) ? v[0] : v;
}

async function attachCases(sessions: RawSession[]): Promise<SessionRow[]> {
  const supabase = await createClient();
  const caseIds = [...new Set(sessions.map((s) => s.assigned_case_id).filter((id): id is string => !!id))];

  let casesById = new Map<string, { id: string; name: string }>();
  if (caseIds.length) {
    const { data: cases } = await supabase.from("cases_public").select("id, name").in("id", caseIds);
    casesById = new Map((cases ?? []).map((c) => [c.id, c]));
  }

  return sessions.map((s) => ({
    ...s,
    interviewer: first(s.interviewer),
    interviewee: first(s.interviewee),
    assigned_case: s.assigned_case_id ? (casesById.get(s.assigned_case_id) ?? null) : null,
  }));
}

export async function listMySessions(userId: string): Promise<SessionRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mock_sessions")
    .select(SESSION_SELECT)
    .or(`interviewer_id.eq.${userId},interviewee_id.eq.${userId}`)
    .order("scheduled_at", { ascending: true });

  if (error || !data) return [];
  return attachCases(data as unknown as RawSession[]);
}

export async function getSession(sessionId: string): Promise<SessionRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mock_sessions")
    .select(SESSION_SELECT)
    .eq("id", sessionId)
    .maybeSingle();

  if (error || !data) return null;
  const [withCase] = await attachCases([data as unknown as RawSession]);
  return withCase;
}

export interface InviteRow {
  id: string;
  mock_session_id: string;
  requested_by: string;
  requested_of: string;
  proposed_role: "interviewer" | "interviewee";
  status: "pending" | "accepted" | "declined" | "reschedule_requested";
  requester: SessionParticipant;
  session: { scheduled_at: string; format: SessionFormat; notes: string | null };
}

// Invites awaiting MY response (I'm requested_of, still pending).
export async function listMyPendingInvites(userId: string): Promise<InviteRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("session_invites")
    .select(
      "id, mock_session_id, requested_by, requested_of, proposed_role, status, " +
        "requester:profiles!session_invites_requested_by_fkey(id, full_name, initials), " +
        "session:mock_sessions!session_invites_mock_session_id_fkey(scheduled_at, format, notes)"
    )
    .eq("requested_of", userId)
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  interface RawInvite extends Omit<InviteRow, "requester" | "session"> {
    requester: SessionParticipant | SessionParticipant[];
    session: InviteRow["session"] | InviteRow["session"][];
  }

  return ((data ?? []) as unknown as RawInvite[]).map((row) => ({
    ...row,
    requester: first(row.requester),
    session: first(row.session),
  }));
}

// Latest invite status per session id, for sessions I initiated -- lets the requester's
// cards distinguish "invite sent" from "partner asked to reschedule".
export async function getInviteStatusBySession(userId: string, sessionIds: string[]): Promise<Map<string, string>> {
  if (sessionIds.length === 0) return new Map();
  const supabase = await createClient();
  const { data } = await supabase
    .from("session_invites")
    .select("mock_session_id, status, created_at")
    .eq("requested_by", userId)
    .in("mock_session_id", sessionIds)
    .order("created_at", { ascending: true });

  const map = new Map<string, string>();
  for (const row of data ?? []) map.set(row.mock_session_id, row.status);
  return map;
}

export async function searchPartners(query: string, excludeUserId: string) {
  const supabase = await createClient();
  let req = supabase
    .from("profiles")
    .select("id, full_name, initials, email")
    .neq("id", excludeUserId)
    .limit(10);

  if (query.trim()) {
    req = req.or(`full_name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  const { data } = await req;
  return data ?? [];
}
