"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { getOwnerOpenSlots } from "@/lib/queries/scheduling";
import { generateBuiltinMeetingLink } from "@/lib/meeting";

export type BookState = { error?: string } | undefined;

const FORMATS = new Set(["45_full", "30_short", "60_case_feedback"]);

// Book a slot from someone's published availability. Role is by direction: the
// slot owner becomes the interviewer, the booker (me) the interviewee. Confirms
// instantly, since the owner already offered the time.
export async function bookSlot(_prev: BookState, formData: FormData): Promise<BookState> {
  const me = await requireUser();

  const interviewerId = String(formData.get("interviewerId") ?? "");
  const startISO = String(formData.get("startISO") ?? "");
  const format = String(formData.get("format") ?? "45_full");
  const locationKind = String(formData.get("locationKind") ?? "online");
  const locationNote = String(formData.get("locationNote") ?? "").trim();
  const ruleAck = formData.get("ruleAck") === "on";

  if (!interviewerId || interviewerId === me.id) return { error: "Pick someone else to interview you." };
  if (!FORMATS.has(format)) return { error: "Pick a session length." };
  if (locationKind !== "online" && locationKind !== "in_person") return { error: "Pick a location." };

  const startMs = new Date(startISO).getTime();
  if (Number.isNaN(startMs)) return { error: "Pick a time." };

  // Re-validate the slot against the owner's live availability (can't trust the form).
  const openSlots = await getOwnerOpenSlots(interviewerId);
  if (!openSlots.some((s) => s.startMs === startMs)) {
    return { error: "That time is no longer available — pick another slot." };
  }

  const supabase = await createClient();

  const { data: interviewer } = await supabase
    .from("profiles")
    .select("id, booking_rule")
    .eq("id", interviewerId)
    .maybeSingle();
  if (!interviewer) return { error: "That person could not be found." };

  // Enforce the interviewer's rule acknowledgement.
  if (interviewer.booking_rule && !ruleAck) {
    return { error: "Please confirm you've met the interviewer's requirement." };
  }

  const { error } = await supabase.from("mock_sessions").insert({
    interviewer_id: interviewerId,
    interviewee_id: me.id,
    scheduled_at: startISO,
    format: format as "45_full" | "30_short" | "60_case_feedback",
    status: "confirmed",
    location_kind: locationKind,
    location_note: locationKind === "in_person" ? locationNote || null : null,
    meeting_link: locationKind === "online" ? generateBuiltinMeetingLink() : null,
    rule_ack: interviewer.booking_rule ?? null,
  });
  if (error) return { error: error.message };

  revalidatePath("/home");
  redirect("/home?booked=1");
}
