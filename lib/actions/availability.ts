"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type AvailabilityActionState = { error?: string } | undefined;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validTime(startMinute: number, durationMin: number): string | null {
  if (!Number.isInteger(startMinute) || startMinute < 0 || startMinute > 1439) return "Pick a valid start time.";
  if (!Number.isInteger(durationMin) || durationMin < 15 || durationMin > 180) return "Length must be 15–180 minutes.";
  if (startMinute + durationMin > 1440) return "That block runs past midnight.";
  return null;
}

export interface CreateBlockInput {
  startMinute: number;
  durationMin: number;
  mode: "one_off" | "weekly" | "custom";
  date?: string; // YYYY-MM-DD (one_off)
  weekdays?: number[]; // weekly = [day]; custom = many
  recurUntil?: string | null;
}

// Create one availability block (or several rows, one per weekday for a custom
// multi-day recurrence).
export async function createAvailabilityBlocks(input: CreateBlockInput): Promise<AvailabilityActionState> {
  const user = await requireUser();
  const timeErr = validTime(input.startMinute, input.durationMin);
  if (timeErr) return { error: timeErr };

  const recurUntil = input.recurUntil && DATE_RE.test(input.recurUntil) ? input.recurUntil : null;

  const base = { owner_id: user.id, start_minute: input.startMinute, duration_min: input.durationMin };
  let rows: Record<string, unknown>[];

  if (input.mode === "one_off") {
    if (!input.date || !DATE_RE.test(input.date)) return { error: "Pick a date." };
    rows = [{ ...base, kind: "one_off", slot_date: input.date, weekday: null, recur_until: null }];
  } else {
    const days = (input.weekdays ?? []).filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
    if (days.length === 0) return { error: "Pick at least one weekday." };
    rows = [...new Set(days)].map((d) => ({
      ...base,
      kind: "recurring",
      weekday: d,
      slot_date: null,
      recur_until: recurUntil,
    }));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("availability").insert(rows);
  if (error) return { error: error.message };
  revalidatePath("/availability");
  return undefined;
}

export interface UpdateBlockInput {
  startMinute: number;
  durationMin: number;
  recurUntil?: string | null; // only applies to recurring blocks
}

// Edit an existing block's time (and, for recurring blocks, its end date). Kind
// (one-off vs recurring) and day are kept; to change those, delete and re-create.
export async function updateAvailabilityBlock(id: string, input: UpdateBlockInput): Promise<AvailabilityActionState> {
  const user = await requireUser();
  const timeErr = validTime(input.startMinute, input.durationMin);
  if (timeErr) return { error: timeErr };
  const recurUntil = input.recurUntil && DATE_RE.test(input.recurUntil) ? input.recurUntil : null;

  const supabase = await createClient();
  const { data: row } = await supabase
    .from("availability")
    .select("id, kind")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!row) return { error: "That time could not be found." };

  const { error } = await supabase
    .from("availability")
    .update({
      start_minute: input.startMinute,
      duration_min: input.durationMin,
      recur_until: row.kind === "recurring" ? recurUntil : null,
    })
    .eq("id", id)
    .eq("owner_id", user.id);
  if (error) return { error: error.message };
  revalidatePath("/availability");
  return undefined;
}

export async function deleteAvailability(id: string): Promise<void> {
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
