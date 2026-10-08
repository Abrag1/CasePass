// Shared model for an interviewer's live workspace: one independent notes box +
// stopwatch per case section, plus an "overall" note. The same shape is used by
// the in-person Run page (kept in localStorage) and the remote Live Mock (kept in
// session_private_notes.notes as JSON), and is what the final feedback summary is
// built from.
//
// Timers store `runningSince` (epoch ms) rather than counting ticks, so a refresh
// or a tab sleeping never loses time.

import type { CasePage } from "@/lib/cases/content";

export interface SectionState {
  notes: string;
  /** Whole seconds accumulated while the timer was stopped. */
  seconds: number;
  /** Epoch ms when the timer was last started; null when stopped. */
  runningSince: number | null;
}

// idle: never started · running/paused: interview underway · ended: finished.
// While running OR paused, moving to another section records the one you leave and
// starts the next from 00:00; after "ended" (or before starting) nothing auto-starts.
export type Clock = "idle" | "running" | "paused" | "ended";

export interface InterviewState {
  v: 2;
  clock: Clock;
  sections: Record<string, SectionState>;
  /** Notes that belong to the whole interview, not one section. */
  general: string;
}

export interface SectionInfo {
  key: string;
  label: string;
  title: string;
}

/** What gets stored on the final feedback (jsonb) and rendered in summaries. */
export interface SectionFeedback {
  key: string;
  label: string;
  title: string;
  seconds: number;
  notes: string;
}
export interface SectionFeedbackPayload {
  sections: SectionFeedback[];
  general: string;
}

export const emptySection = (): SectionState => ({ notes: "", seconds: 0, runningSince: null });

export const emptyState = (): InterviewState => ({ v: 2, clock: "idle", sections: {}, general: "" });

export function sectionsFromPages(pages: CasePage[]): SectionInfo[] {
  return pages
    .filter((p) => p.kind !== "cheat")
    .map((p) => ({ key: p.n, label: p.label, title: p.title }));
}

/**
 * Parse whatever is stored. Old sessions saved one plain-text blob; keep it as
 * the "overall" note rather than dropping it.
 */
export function parseState(raw: string | null | undefined): InterviewState {
  if (!raw) return emptyState();
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.v === 2 && typeof parsed.sections === "object") {
      const sections: Record<string, SectionState> = {};
      for (const [k, s] of Object.entries<Partial<SectionState>>(parsed.sections ?? {})) {
        sections[k] = {
          notes: typeof s?.notes === "string" ? s.notes : "",
          seconds: Number.isFinite(s?.seconds) ? Math.max(0, Math.floor(s!.seconds as number)) : 0,
          runningSince: typeof s?.runningSince === "number" ? s.runningSince : null,
        };
      }
      const anyRunning = Object.values(sections).some((x) => x.runningSince);
      const anyTime = Object.values(sections).some((x) => x.seconds > 0);
      const clock: Clock = ["idle", "running", "paused", "ended"].includes(parsed.clock)
        ? parsed.clock
        : anyRunning
          ? "running"
          : anyTime
            ? "paused"
            : "idle";
      return { v: 2, clock, sections, general: typeof parsed.general === "string" ? parsed.general : "" };
    }
  } catch {
    // not JSON -> legacy plain text
  }
  return { ...emptyState(), general: raw };
}

export function serializeState(state: InterviewState): string {
  return JSON.stringify(state);
}

export function sectionSeconds(s: SectionState | undefined, now: number): number {
  if (!s) return 0;
  const live = s.runningSince ? Math.max(0, Math.floor((now - s.runningSince) / 1000)) : 0;
  return s.seconds + live;
}

export function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Friendly "4 min 12 s" form for summaries. */
export function formatDurationLong(totalSec: number): string {
  if (totalSec <= 0) return "—";
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m === 0) return `${s} s`;
  return s === 0 ? `${m} min` : `${m} min ${s} s`;
}

/** Freeze running timers and produce the per-section payload for feedback. */
export function buildFeedbackPayload(
  state: InterviewState,
  sections: SectionInfo[],
  now: number = Date.now(),
): SectionFeedbackPayload {
  return {
    sections: sections.map((sec) => ({
      ...sec,
      seconds: sectionSeconds(state.sections[sec.key], now),
      notes: (state.sections[sec.key]?.notes ?? "").trim(),
    })),
    general: state.general.trim(),
  };
}

export function totalSeconds(rows: { seconds: number }[]): number {
  return rows.reduce((a, r) => a + r.seconds, 0);
}

export function summaryToText(caseName: string, payload: SectionFeedbackPayload): string {
  const lines: string[] = [`Feedback — ${caseName}`, ""];
  for (const s of payload.sections) {
    if (!s.notes && s.seconds <= 0) continue;
    lines.push(`${s.label} · ${s.title}${s.seconds > 0 ? ` (${formatDurationLong(s.seconds)})` : ""}`);
    lines.push(s.notes || "(no notes)");
    lines.push("");
  }
  if (payload.general) {
    lines.push("Overall", payload.general, "");
  }
  const total = totalSeconds(payload.sections);
  if (total > 0) lines.push(`Total time: ${formatDurationLong(total)}`);
  return lines.join("\n").trim();
}
