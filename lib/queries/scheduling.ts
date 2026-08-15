import { createClient } from "@/lib/supabase/server";
import { expandSlots, type AvailabilityRow, type Slot } from "@/lib/scheduling";

export async function getMyAvailability(userId: string): Promise<AvailabilityRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("availability")
    .select("id, owner_id, kind, weekday, slot_date, start_minute, duration_min")
    .eq("owner_id", userId);
  const rows = (data ?? []) as AvailabilityRow[];
  // Recurring first (by weekday, then time), then one-offs (by date, then time).
  return rows.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "recurring" ? -1 : 1;
    if (a.kind === "recurring") return (a.weekday! - b.weekday!) || a.start_minute - b.start_minute;
    return (a.slot_date! < b.slot_date! ? -1 : a.slot_date! > b.slot_date! ? 1 : 0) || a.start_minute - b.start_minute;
  });
}

// The set of instant-ms an owner is already occupied at (in either role), so those
// slots are removed from what's offered.
async function bookedStartsByOwner(): Promise<Map<string, Set<number>>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mock_sessions")
    .select("interviewer_id, interviewee_id, scheduled_at, status")
    .neq("status", "declined")
    .gte("scheduled_at", new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString());

  const map = new Map<string, Set<number>>();
  const add = (owner: string, ms: number) => {
    if (!map.has(owner)) map.set(owner, new Set());
    map.get(owner)!.add(ms);
  };
  for (const s of data ?? []) {
    const ms = new Date(s.scheduled_at).getTime();
    add(s.interviewer_id, ms);
    add(s.interviewee_id, ms);
  }
  return map;
}

export interface BookableInterviewer {
  id: string;
  full_name: string;
  year_tag: string | null;
  booking_rule: string | null;
  slots: Slot[];
}

// Everyone (other than me) who has published availability with at least one open,
// future slot. Role = direction: booking one of these makes them the interviewer.
export async function getBookableInterviewers(meId: string): Promise<BookableInterviewer[]> {
  const supabase = await createClient();

  const { data: avail } = await supabase
    .from("availability")
    .select("id, owner_id, kind, weekday, slot_date, start_minute, duration_min")
    .neq("owner_id", meId);
  const rows = (avail ?? []) as AvailabilityRow[];
  if (rows.length === 0) return [];

  const ownerIds = [...new Set(rows.map((r) => r.owner_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, year_tag, booking_rule")
    .in("id", ownerIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  const booked = await bookedStartsByOwner();

  const rowsByOwner = new Map<string, AvailabilityRow[]>();
  for (const r of rows) {
    if (!rowsByOwner.has(r.owner_id)) rowsByOwner.set(r.owner_id, []);
    rowsByOwner.get(r.owner_id)!.push(r);
  }

  const result: BookableInterviewer[] = [];
  for (const [ownerId, ownerRows] of rowsByOwner) {
    const profile = profileById.get(ownerId);
    if (!profile) continue;
    const slots = expandSlots(ownerRows, booked.get(ownerId) ?? new Set());
    if (slots.length === 0) continue;
    result.push({
      id: ownerId,
      full_name: profile.full_name,
      year_tag: profile.year_tag,
      booking_rule: profile.booking_rule,
      slots,
    });
  }

  result.sort((a, b) => a.full_name.localeCompare(b.full_name));
  return result;
}

// Re-derive a single owner's open slots (used to validate a booking server-side).
export async function getOwnerOpenSlots(ownerId: string): Promise<Slot[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("availability")
    .select("id, owner_id, kind, weekday, slot_date, start_minute, duration_min")
    .eq("owner_id", ownerId);
  const rows = (data ?? []) as AvailabilityRow[];
  if (rows.length === 0) return [];
  const booked = (await bookedStartsByOwner()).get(ownerId) ?? new Set<number>();
  return expandSlots(rows, booked);
}
