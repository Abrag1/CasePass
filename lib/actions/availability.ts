"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { timeStringToMinute } from "@/lib/scheduling";

export type AvailabilityActionState = { error?: string } | undefined;

const DURATIONS = new Set([30, 45, 60]);

export async function addAvailability(
  _prev: AvailabilityActionState,
  formData: FormData
): Promise<AvailabilityActionState> {
  const user = await requireUser();

  const kind = String(formData.get("kind") ?? "");
  const startMinute = timeStringToMinute(String(formData.get("time") ?? ""));
  const duration = Number(formData.get("duration"));

  if (kind !== "one_off" && kind !== "recurring") return { error: "Pick a slot type" };
  if (startMinute === null) return { error: "Pick a valid time" };
  if (!DURATIONS.has(duration)) return { error: "Pick a duration" };

  const row: {
    owner_id: string;
    kind: "one_off" | "recurring";
    start_minute: number;
    duration_min: number;
    weekday: number | null;
    slot_date: string | null;
  } = {
    owner_id: user.id,
    kind,
    start_minute: startMinute,
    duration_min: duration,
    weekday: null,
    slot_date: null,
  };

  if (kind === "recurring") {
    const weekday = Number(formData.get("weekday"));
    if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) return { error: "Pick a weekday" };
    row.weekday = weekday;
  } else {
    const date = String(formData.get("date") ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Pick a date" };
    row.slot_date = date;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("availability").insert(row);
  if (error) return { error: error.message };

  revalidatePath("/availability");
  return undefined;
}

export async function deleteAvailability(id: string) {
  const user = await requireUser();
  const supabase = await createClient();
  await supabase.from("availability").delete().eq("id", id).eq("owner_id", user.id);
  revalidatePath("/availability");
}

export async function saveBookingRule(_prev: AvailabilityActionState, formData: FormData): Promise<AvailabilityActionState> {
  const user = await requireUser();
  const raw = String(formData.get("booking_rule") ?? "").trim();
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ booking_rule: raw || null }).eq("id", user.id);
  if (error) return { error: error.message };
  revalidatePath("/availability");
  return undefined;
}
