"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/dal";
import { SKILL_FIELDS } from "@/lib/validation/feedback";

export type FeedbackActionState = { error?: string } | undefined;

export async function submitFeedback(
  _prevState: FeedbackActionState,
  formData: FormData
): Promise<FeedbackActionState> {
  const user = await requireUser();
  const sessionId = String(formData.get("sessionId") ?? "");
  if (!sessionId) return { error: "Missing session" };

  const supabase = await createClient();
  const { data: session } = await supabase
    .from("mock_sessions")
    .select("id, interviewer_id, interviewee_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session || session.interviewer_id !== user.id) {
    return { error: "Only the interviewer for this mock can submit feedback" };
  }

  const skillRatings: Record<string, string> = {};
  for (const { key } of SKILL_FIELDS) {
    const v = formData.get(`rating_${key}`);
    if (typeof v === "string" && v) skillRatings[key] = v;
  }

  const { error } = await supabase.from("feedback").insert({
    mock_session_id: sessionId,
    author_id: user.id,
    subject_id: session.interviewee_id,
    recap_text: (formData.get("recap") as string) || null,
    skill_ratings: skillRatings,
    went_well: (formData.get("wentWell") as string) || null,
    improve: (formData.get("improve") as string) || null,
    practice_next: (formData.get("practiceNext") as string) || null,
  });

  if (error) {
    return { error: error.message };
  }

  await supabase.from("mock_sessions").update({ status: "completed" }).eq("id", sessionId);

  revalidatePath("/home");
  redirect(`/mocks/${sessionId}/feedback/summary`);
}
