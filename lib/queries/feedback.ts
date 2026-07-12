import { createClient } from "@/lib/supabase/server";
import type { SkillRatings } from "@/lib/supabase/types";

export interface FeedbackRow {
  id: string;
  mock_session_id: string;
  author_id: string;
  subject_id: string;
  recap_text: string | null;
  skill_ratings: SkillRatings;
  went_well: string | null;
  improve: string | null;
  practice_next: string | null;
  created_at: string;
}

export async function getFeedbackForSession(sessionId: string): Promise<FeedbackRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("feedback")
    .select("*")
    .eq("mock_session_id", sessionId)
    .maybeSingle();
  return data ?? null;
}
