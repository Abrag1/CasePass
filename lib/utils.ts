import type { SessionStatus } from "@/lib/supabase/types";
import { CAMPUS_TZ } from "@/lib/scheduling";

export function getMyRole(
  session: { interviewer_id: string; interviewee_id: string },
  userId: string
): "interviewer" | "interviewee" {
  return session.interviewer_id === userId ? "interviewer" : "interviewee";
}

// All session times display in the single campus timezone (ET) so they read the
// same whether rendered on the server (UTC) or in any browser, and match the
// times shown in the scheduling flow.
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const timeZone = CAMPUS_TZ;
  return {
    mon: d.toLocaleDateString("en-US", { timeZone, month: "short" }).toUpperCase(),
    day: d.toLocaleDateString("en-US", { timeZone, day: "2-digit" }),
    full: d.toLocaleDateString("en-US", { timeZone, weekday: "short", month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit" }) + " ET",
  };
}

export const FORMAT_LABELS: Record<string, string> = {
  "45_full": "45 min · full case",
  "30_short": "30 min · short case",
  "60_case_feedback": "60 min · case + feedback",
};

export const FORMAT_MINUTES: Record<string, number> = {
  "45_full": 45,
  "30_short": 30,
  "60_case_feedback": 60,
};

export interface SessionViewMeta {
  statusLabel: string;
  tone: "green" | "warn" | "neutral" | "navy";
  actionLabel: string;
  actionHref: string | null;
}

// The "Join mock" button is time-gated: it opens shortly before the scheduled
// time so the button always means "it's time", not "a case exists".
export const JOIN_OPEN_BEFORE_MS = 15 * 60 * 1000; // 15 min before
export const JOIN_CLOSE_AFTER_MS = 6 * 60 * 60 * 1000; // 6 hr after

export function getJoinWindow(scheduledIso: string, now: number = Date.now()) {
  const start = new Date(scheduledIso).getTime();
  return {
    start,
    open: now >= start - JOIN_OPEN_BEFORE_MS && now <= start + JOIN_CLOSE_AFTER_MS,
    tooEarly: now < start - JOIN_OPEN_BEFORE_MS,
    closed: now > start + JOIN_CLOSE_AFTER_MS,
  };
}

// Short countdown for a future time: "in 20 min", "in 3 hr", "tomorrow", "in 4 days".
export function relativeWhen(scheduledIso: string, now: number = Date.now()): string {
  const diff = new Date(scheduledIso).getTime() - now;
  if (diff <= 0) return "now";
  const min = Math.round(diff / 60000);
  if (min < 60) return `in ${min} min`;
  const hr = Math.round(diff / 3600000);
  if (hr < 24) return `in ${hr} hr`;
  const days = Math.round(diff / 86400000);
  return days === 1 ? "tomorrow" : `in ${days} days`;
}

// Derives the badge + primary action shown for a session card, from the viewer's
// role AND the clock: before the mock it points at prep (choose case / review
// brief), and only inside the join window does it become "Join mock".
export function getSessionViewMeta(
  session: { id: string; status: SessionStatus; assigned_case_id: string | null; scheduled_at: string },
  role: "interviewer" | "interviewee",
  inviteStatus?: string
): SessionViewMeta {
  if (session.status === "pending_invite") {
    if (inviteStatus === "reschedule_requested") {
      return { statusLabel: "Reschedule requested", tone: "warn", actionLabel: "Pick a new time", actionHref: `/mocks/${session.id}/reschedule` };
    }
    return { statusLabel: "Awaiting confirmation", tone: "navy", actionLabel: "Invite sent", actionHref: null };
  }

  if (session.status === "declined") {
    return { statusLabel: "Declined", tone: "neutral", actionLabel: "Declined", actionHref: null };
  }

  if (session.status === "completed") {
    return {
      statusLabel: "Completed",
      tone: "neutral",
      actionLabel: "View feedback",
      actionHref: role === "interviewer" ? `/mocks/${session.id}/feedback` : `/mocks/${session.id}/feedback/summary`,
    };
  }

  const win = getJoinWindow(session.scheduled_at);

  if (role === "interviewer") {
    if (!session.assigned_case_id) {
      return { statusLabel: "Needs a case", tone: "warn", actionLabel: "Choose the case", actionHref: `/mocks/${session.id}/assign` };
    }
    if (win.tooEarly) {
      return { statusLabel: relativeWhen(session.scheduled_at), tone: "navy", actionLabel: "Review case", actionHref: `/cases/${session.assigned_case_id}` };
    }
    // window open or already started -> the interviewer drives, so they can always join
    return { statusLabel: win.open ? "Join now" : "Ready", tone: "green", actionLabel: "Join mock", actionHref: `/mocks/${session.id}/live` };
  }

  // interviewee
  if (!session.assigned_case_id) {
    return { statusLabel: "Awaiting case", tone: "warn", actionLabel: "Waiting for the case", actionHref: null };
  }
  if (win.open) {
    return { statusLabel: "Join now", tone: "green", actionLabel: "Join mock", actionHref: `/mocks/${session.id}/live` };
  }
  return {
    statusLabel: win.tooEarly ? relativeWhen(session.scheduled_at) : "Case shared",
    tone: "navy",
    actionLabel: "Review brief",
    actionHref: `/mocks/${session.id}/preview`,
  };
}

// avg is on the 1-5 feedback scale.
export function levelMeta(avg: number) {
  if (avg >= 4) return { label: "Strong", tone: "green" as const, color: "#2d6a4f" };
  if (avg >= 2.5) return { label: "Solid", tone: "navy" as const, color: "#6b7c89" };
  return { label: "Needs work", tone: "warn" as const, color: "#c08440" };
}
