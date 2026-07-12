// Pure helpers shared by server and client code -- no supabase imports here.

// Built-in rooms need a public Jitsi instance that satisfies BOTH constraints:
//  - anonymous rooms (meet.jit.si fails: it requires a signed-in moderator to start
//    every room, stranding both participants on a "waiting for moderator" screen)
//  - embeddable in an iframe (meet.ffmuc.net fails: frame-ancestors/SAMEORIGIN
//    headers make the embed show "refused to connect")
// jitsi.riot.im (Element's instance) passes both. Override without a code change via
// NEXT_PUBLIC_JITSI_DOMAIN (e.g. meet.mayfirst.org, or a self-hosted/JaaS domain later).
const BUILTIN_DOMAIN = process.env.NEXT_PUBLIC_JITSI_DOMAIN ?? "jitsi.riot.im";
const BUILTIN_DOMAINS = new Set([BUILTIN_DOMAIN, "jitsi.riot.im", "meet.ffmuc.net", "meet.jit.si"]);

export function generateBuiltinMeetingLink() {
  const slug = crypto.randomUUID().slice(0, 8);
  return `https://${BUILTIN_DOMAIN}/CasePass-${slug}`;
}

export interface MeetingProvider {
  kind: "builtin" | "external" | "none";
  label: string;
}

export function meetingProvider(link: string | null | undefined): MeetingProvider {
  if (!link) return { kind: "none", label: "No meeting link" };
  try {
    const host = new URL(link).hostname;
    if (BUILTIN_DOMAINS.has(host)) return { kind: "builtin", label: "CasePass video" };
    if (host.endsWith("zoom.us")) return { kind: "external", label: "Zoom" };
    if (host === "meet.google.com") return { kind: "external", label: "Google Meet" };
    if (host.includes("teams.")) return { kind: "external", label: "Microsoft Teams" };
    if (host.endsWith("whereby.com")) return { kind: "external", label: "Whereby" };
    return { kind: "external", label: "meeting link" };
  } catch {
    return { kind: "none", label: "No meeting link" };
  }
}

export function parseBuiltinMeeting(link: string): { domain: string; room: string } | null {
  try {
    const url = new URL(link);
    if (!BUILTIN_DOMAINS.has(url.hostname)) return null;
    const room = url.pathname.replace(/^\//, "");
    if (!room) return null;
    return { domain: url.hostname, room };
  } catch {
    return null;
  }
}
