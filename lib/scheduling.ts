// Scheduling helpers: turn availability rows (one-off + weekly recurring) into
// concrete, bookable future slots, and format times.
//
// Timezone: the club is single-campus, so all wall-clock times are interpreted in
// one campus zone (America/New_York). Availability stores a naive time-of-day
// (start_minute) + a day (a specific date, or a weekday); we convert that campus
// wall-clock to a real UTC instant for storage/comparison, and always display back
// in campus time. So "4:00 PM" set by an interviewer reads as 4:00 PM ET for
// everyone. Per-user timezones can layer on later without changing stored data.

export const CAMPUS_TZ = "America/New_York";
export const CAMPUS_TZ_LABEL = "ET";
const WINDOW_DAYS = 21; // how far ahead recurring slots are offered

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export interface AvailabilityRow {
  id: string;
  owner_id: string;
  kind: "one_off" | "recurring";
  weekday: number | null;
  slot_date: string | null; // 'YYYY-MM-DD'
  start_minute: number;
  duration_min: number;
  recur_until: string | null; // 'YYYY-MM-DD' or null (repeats indefinitely)
}

export interface Slot {
  startMs: number; // real UTC instant (ms since epoch)
  startISO: string; // for storage as scheduled_at
  durationMin: number;
  availabilityId: string;
}

function etPartsOf(instant: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: CAMPUS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const m: Record<string, string> = {};
  for (const p of f.formatToParts(instant)) m[p.type] = p.value;
  const hh = m.hour === "24" ? 0 : Number(m.hour);
  return { y: Number(m.year), mo: Number(m.month), d: Number(m.day), hh, mm: Number(m.minute) };
}

// Convert a campus wall-clock (date + minute-of-day) to the real UTC instant,
// accounting for DST via the offset at that moment.
function campusWallToUtcMs(y: number, mo: number, d: number, minute: number): number {
  const hh = Math.floor(minute / 60);
  const mm = minute % 60;
  const guess = Date.UTC(y, mo - 1, d, hh, mm);
  const et = etPartsOf(new Date(guess));
  const back = Date.UTC(et.y, et.mo - 1, et.d, et.hh, et.mm);
  return guess + (guess - back);
}

function isoDate(y: number, mo: number, d: number): string {
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// Expand availability rows into concrete future slots (next WINDOW_DAYS campus days),
// dropping any that are already booked or in the past.
export function expandSlots(rows: AvailabilityRow[], bookedStartMs: Set<number>): Slot[] {
  const now = Date.now();
  const today = etPartsOf(new Date());
  const baseMidnight = Date.UTC(today.y, today.mo - 1, today.d); // token for iterating campus calendar days
  const out: Slot[] = [];
  const seen = new Set<number>();

  for (let i = 0; i < WINDOW_DAYS; i++) {
    const token = new Date(baseMidnight + i * 86400000);
    const y = token.getUTCFullYear();
    const mo = token.getUTCMonth() + 1;
    const d = token.getUTCDate();
    const wd = token.getUTCDay();
    const dateStr = isoDate(y, mo, d);

    for (const row of rows) {
      const match =
        (row.kind === "recurring" && row.weekday === wd) ||
        (row.kind === "one_off" && row.slot_date === dateStr);
      if (!match) continue;
      // Recurring blocks stop after their end date, if set.
      if (row.kind === "recurring" && row.recur_until && dateStr > row.recur_until) continue;

      const startMs = campusWallToUtcMs(y, mo, d, row.start_minute);
      if (startMs <= now || bookedStartMs.has(startMs) || seen.has(startMs)) continue;
      seen.add(startMs);
      out.push({
        startMs,
        startISO: new Date(startMs).toISOString(),
        durationMin: row.duration_min,
        availabilityId: row.id,
      });
    }
  }

  out.sort((a, b) => a.startMs - b.startMs);
  return out;
}

// "Thu, Jul 9 · 4:00 PM ET"
export function formatSlot(startMs: number): string {
  const d = new Date(startMs);
  const day = new Intl.DateTimeFormat("en-US", { timeZone: CAMPUS_TZ, weekday: "short", month: "short", day: "numeric" }).format(d);
  const time = new Intl.DateTimeFormat("en-US", { timeZone: CAMPUS_TZ, hour: "numeric", minute: "2-digit" }).format(d);
  return `${day} · ${time} ${CAMPUS_TZ_LABEL}`;
}

// Group slots by campus day for a tidy picker: [{ dayLabel, slots }]
export function groupSlotsByDay(slots: Slot[]): { dayLabel: string; dayKey: string; slots: Slot[] }[] {
  const groups = new Map<string, { dayLabel: string; dayKey: string; slots: Slot[] }>();
  for (const s of slots) {
    const d = new Date(s.startMs);
    const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: CAMPUS_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
    const dayLabel = new Intl.DateTimeFormat("en-US", { timeZone: CAMPUS_TZ, weekday: "long", month: "short", day: "numeric" }).format(d);
    if (!groups.has(dayKey)) groups.set(dayKey, { dayLabel, dayKey, slots: [] });
    groups.get(dayKey)!.slots.push(s);
  }
  return [...groups.values()];
}

// "4:00 PM" from a minute-of-day (for showing raw availability entries).
export function minuteLabel(minute: number): string {
  const hh = Math.floor(minute / 60);
  const mm = minute % 60;
  const d = new Date(Date.UTC(2000, 0, 1, hh, mm));
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", hour: "numeric", minute: "2-digit" }).format(d);
}

// "4:00 PM ET" for a slot's time only (day shown separately in grouped picker).
export function slotTimeLabel(startMs: number): string {
  const time = new Intl.DateTimeFormat("en-US", { timeZone: CAMPUS_TZ, hour: "numeric", minute: "2-digit" }).format(new Date(startMs));
  return `${time} ${CAMPUS_TZ_LABEL}`;
}

// Describe a raw availability row for the management list.
export function describeAvailabilityRow(row: AvailabilityRow): string {
  const time = minuteLabel(row.start_minute);
  if (row.kind === "recurring") {
    return `Every ${WEEKDAYS[row.weekday ?? 0]} · ${time} ${CAMPUS_TZ_LABEL} · ${row.duration_min}m`;
  }
  const [y, mo, d] = (row.slot_date ?? "").split("-").map(Number);
  const dayLabel = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" }).format(
    new Date(Date.UTC(y, (mo ?? 1) - 1, d ?? 1))
  );
  return `${dayLabel} · ${time} ${CAMPUS_TZ_LABEL} · ${row.duration_min}m`;
}

/* -------- calendar date helpers (campus wall-clock, DST-safe date math) -------- */

export interface Ymd {
  y: number;
  mo: number; // 1-12
  d: number;
}

// Today's date in campus time.
export function campusToday(): Ymd {
  const p = etPartsOf(new Date());
  return { y: p.y, mo: p.mo, d: p.d };
}

// A UTC-midnight token used purely for calendar-date arithmetic (no time-of-day,
// so DST never shifts the day).
export function dateToken({ y, mo, d }: Ymd): number {
  return Date.UTC(y, mo - 1, d);
}

export function tokenToYmd(ms: number): Ymd {
  const t = new Date(ms);
  return { y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

export function addDays(ymd: Ymd, n: number): Ymd {
  return tokenToYmd(dateToken(ymd) + n * 86400000);
}

export function weekdayOf(ymd: Ymd): number {
  return new Date(dateToken(ymd)).getUTCDay(); // 0=Sun..6=Sat
}

// The Monday that starts the week containing `ymd`.
export function mondayOf(ymd: Ymd): Ymd {
  const wd = weekdayOf(ymd);
  const back = (wd + 6) % 7; // days since Monday
  return addDays(ymd, -back);
}

export function ymdString({ y, mo, d }: Ymd): string {
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function ymdFromString(s: string): Ymd {
  const [y, mo, d] = s.split("-").map(Number);
  return { y, mo, d };
}

export function formatDayHeader({ y, mo, d }: Ymd): { weekday: string; monthDay: string; d: number } {
  const label = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short", month: "short" }).formatToParts(
    new Date(Date.UTC(y, mo - 1, d))
  );
  const weekday = label.find((p) => p.type === "weekday")?.value ?? "";
  const month = label.find((p) => p.type === "month")?.value ?? "";
  return { weekday, monthDay: `${month} ${d}`, d };
}

// Parse an "HH:MM" time input into minutes from midnight.
export function timeStringToMinute(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}
