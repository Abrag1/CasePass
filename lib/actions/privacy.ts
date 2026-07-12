"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/dal";

const KEYS = [
  "share_full_history",
  "share_past_feedback",
  "share_weak_areas",
  "allow_interviewer_notes_back",
] as const;

export type PrivacyKey = (typeof KEYS)[number];

export async function togglePrivacySetting(key: PrivacyKey) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data } = await supabase.from("privacy_settings").select(key).eq("user_id", user.id).maybeSingle();
  const current = data ? Boolean((data as Record<string, boolean>)[key]) : true;

  await supabase
    .from("privacy_settings")
    .update({ [key]: !current, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  revalidatePath(`/profile/${user.id}`);
  revalidatePath("/settings");
}
