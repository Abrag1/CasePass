import { createClient } from "@/lib/supabase/server";

export async function getProfileById(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, initials, year_tag, email")
    .eq("id", userId)
    .maybeSingle();
  return data;
}

export interface SkillProfileResult {
  user_id: string;
  total_cases: number;
  cases_this_month: number;
  avg_length_minutes: number | null;
  distinct_books_used: number;
  skill_averages: Record<string, number> | null;
  case_types_practiced: Record<string, number> | null;
  source_books_used: Record<string, number> | null;
  recent_feedback_excerpts: { went_well: string | null; improve: string | null }[] | null;
}

export async function getMySkillProfile(): Promise<SkillProfileResult | null> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_my_skill_profile");
  return data?.[0] ?? null;
}

export interface HistoryItem {
  feedbackId: string;
  sessionId: string;
  caseName: string;
  partnerName: string;
  date: string;
  skillRatings: Record<string, string>;
  recapText: string | null;
  wentWell: string | null;
  improve: string | null;
  practiceNext: string | null;
}

export type PartnerProfileResult = Partial<Omit<SkillProfileResult, "user_id">> & {
  user_id: string;
  allow_interviewer_notes_back?: boolean;
  taken_history?: {
    feedback_id: string;
    session_id: string;
    case_name: string;
    partner_name: string;
    date: string;
    skill_ratings: Record<string, string>;
    recap_text: string | null;
    went_well: string | null;
    improve: string | null;
    practice_next: string | null;
  }[];
};

export async function getPartnerProfile(targetUserId: string): Promise<PartnerProfileResult | null> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_partner_profile", { p_target_user_id: targetUserId });
  return (data as PartnerProfileResult) ?? null;
}

// Self-view only: both halves are satisfied by the caller's own RLS (they're always
// either the feedback's author or its subject), so no RPC/privacy gating is needed here.
export async function getMyCaseHistory(userId: string): Promise<{ given: HistoryItem[]; taken: HistoryItem[] }> {
  const supabase = await createClient();

  const [{ data: givenFeedback }, { data: takenFeedback }] = await Promise.all([
    supabase
      .from("feedback")
      .select("id, mock_session_id, recap_text, skill_ratings, went_well, improve, practice_next, created_at")
      .eq("author_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("feedback")
      .select("id, mock_session_id, recap_text, skill_ratings, went_well, improve, practice_next, created_at")
      .eq("subject_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  const allFeedback = [...(givenFeedback ?? []), ...(takenFeedback ?? [])];
  const sessionIds = [...new Set(allFeedback.map((f) => f.mock_session_id))];

  if (sessionIds.length === 0) return { given: [], taken: [] };

  const { data: sessions } = await supabase
    .from("mock_sessions")
    .select("id, scheduled_at, assigned_case_id, interviewer_id, interviewee_id")
    .in("id", sessionIds);

  const sessionsById = new Map((sessions ?? []).map((s) => [s.id, s]));

  const caseIds = [...new Set((sessions ?? []).map((s) => s.assigned_case_id).filter((id): id is string => !!id))];
  const partnerIds = [
    ...new Set(
      (sessions ?? []).flatMap((s) => [s.interviewer_id, s.interviewee_id]).filter((id) => id !== userId)
    ),
  ];

  const [{ data: cases }, { data: partners }] = await Promise.all([
    caseIds.length ? supabase.from("cases_public").select("id, name").in("id", caseIds) : Promise.resolve({ data: [] }),
    partnerIds.length ? supabase.from("profiles").select("id, full_name").in("id", partnerIds) : Promise.resolve({ data: [] }),
  ]);

  const casesById = new Map((cases ?? []).map((c) => [c.id, c.name]));
  const partnersById = new Map((partners ?? []).map((p) => [p.id, p.full_name]));

  function toItem(f: (typeof allFeedback)[number], partnerId: string | undefined): HistoryItem {
    const session = sessionsById.get(f.mock_session_id);
    return {
      feedbackId: f.id,
      sessionId: f.mock_session_id,
      caseName: (session?.assigned_case_id && casesById.get(session.assigned_case_id)) || "Mock session",
      partnerName: (partnerId && partnersById.get(partnerId)) || "Unknown",
      date: session?.scheduled_at ?? f.created_at,
      skillRatings: f.skill_ratings ?? {},
      recapText: f.recap_text,
      wentWell: f.went_well,
      improve: f.improve,
      practiceNext: f.practice_next,
    };
  }

  const given = (givenFeedback ?? []).map((f) => toItem(f, sessionsById.get(f.mock_session_id)?.interviewee_id));
  const taken = (takenFeedback ?? []).map((f) => toItem(f, sessionsById.get(f.mock_session_id)?.interviewer_id));

  return { given, taken };
}

export interface PrivacySettings {
  user_id: string;
  share_full_history: boolean;
  share_past_feedback: boolean;
  share_weak_areas: boolean;
  allow_interviewer_notes_back: boolean;
}

export async function getMyPrivacySettings(userId: string): Promise<PrivacySettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("privacy_settings").select("*").eq("user_id", userId).maybeSingle();
  return data;
}
