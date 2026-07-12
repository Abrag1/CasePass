import { buildGoogleCalendarUrl } from "@/lib/calendar";

interface Props {
  sessionId: string;
  title: string;
  startIso: string;
  format: string;
  partnerName: string;
  meetingLink: string | null;
}

// Server-renderable "add to calendar" links: a prefilled Google Calendar template URL
// and an auth-checked .ics download that works with Outlook/Apple Calendar.
export function AddToCalendar({ sessionId, title, startIso, format, partnerName, meetingLink }: Props) {
  const googleUrl = buildGoogleCalendarUrl({
    sessionId,
    title,
    startIso,
    format,
    description: `Mock case interview on CasePass with ${partnerName}.${meetingLink ? `\nJoin: ${meetingLink}` : ""}`,
    meetingLink,
  });

  const linkClass = "text-[12px] font-semibold text-(--color-muted) hover:text-(--color-green)";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="text-[12px] text-(--color-muted)">Add to calendar:</span>
      <a href={googleUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Google
      </a>
      <span className="text-(--color-border)">·</span>
      <a href={`/api/calendar/${sessionId}`} className={linkClass}>
        Outlook / Apple (.ics)
      </a>
    </span>
  );
}
