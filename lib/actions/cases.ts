"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/dal";

export async function togglePrepped(caseId: string) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("prepped_cases")
    .select("prepped")
    .eq("user_id", user.id)
    .eq("case_id", caseId)
    .maybeSingle();

  await supabase.from("prepped_cases").upsert(
    {
      user_id: user.id,
      case_id: caseId,
      prepped: existing ? !existing.prepped : true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,case_id" }
  );

  revalidatePath("/cases");
}
