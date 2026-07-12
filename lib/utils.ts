import type { SessionStatus } from "@/lib/supabase/types";

export function getMyRole(
  session: { interviewer_id: string; interviewee_id: string },
  userId: string
): "interviewer" | "interviewee" {
  return session.interviewer_id === userId ? "interviewer" : "interviewee";
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    mon: d.toLocaleDateString(undefined, { month: "short" }).toUpperCase(),
    day: d.toLocaleDateString(undefined, { day: "2-digit" }),
    full: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    time: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
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

// Derives the badge + primary action shown for a session card on Home, from the
// viewer's own role in that specific session -- mirrors the prototype's per-role
// status/action mapping, but computed from real session state instead of demo data.
export function getSessionViewMeta(
  session: { id: string; status: SessionStatus; assigned_case_id: string | null },
  role: "interviewer" | "interviewee",
  inviteStatus?: string
): SessionViewMeta {
  if (session.status === "pending_invite") {
    if (inviteStatus === "reschedule_requested") {
      return {
        statusLabel: "Reschedule requested",
        tone: "warn",
        actionLabel: "Pick a new time",
        actionHref: `/mocks/${session.id}/reschedule`,
      };
    }
    return {
      statusLabel: "Awaiting confirmation",
      tone: "navy",
      actionLabel: "Invite sent",
      actionHref: null,
    };
  }

  if (session.status === "declined") {
    return {
      statusLabel: "Declined",
      tone: "neutral",
      actionLabel: "Declined",
      actionHref: null,
    };
  }

  if (session.status === "completed") {
    return {
      statusLabel: "Completed",
      tone: "neutral",
      actionLabel: role === "interviewer" ? "View feedback" : "My profile",
      actionHref: role === "interviewer" ? `/mocks/${session.id}/feedback` : null,
    };
  }

  if (role === "interviewer") {
    if (!session.assigned_case_id) {
      return {
        statusLabel: "Needs case selection",
        tone: "warn",
        actionLabel: "Select case",
        actionHref: `/mocks/${session.id}/assign`,
      };
    }
    return {
      statusLabel: "Ready",
      tone: "green",
      actionLabel: "Join mock",
      actionHref: `/mocks/${session.id}/live`,
    };
  }

  if (!session.assigned_case_id) {
    return {
      statusLabel: "Awaiting case",
      tone: "warn",
      actionLabel: "Awaiting case",
      actionHref: null,
    };
  }
  return {
    statusLabel: "Case shared",
    tone: "green",
    actionLabel: "View preview",
    actionHref: `/mocks/${session.id}/preview`,
  };
}

// avg is on the 1-5 feedback scale.
export function levelMeta(avg: number) {
  if (avg >= 4) return { label: "Strong", tone: "green" as const, color: "#2d6a4f" };
  if (avg >= 2.5) return { label: "Solid", tone: "navy" as const, color: "#6b7c89" };
  return { label: "Needs work", tone: "warn" as const, color: "#c08440" };
}
