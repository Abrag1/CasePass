import { FORMAT_MINUTES } from "@/lib/utils";

export interface CalendarEventInput {
  sessionId: string;
  title: string;
  startIso: string;
  format: string;
  description: string;
  meetingLink: string | null;
}

function toCalendarStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function eventTimes(startIso: string, format: string) {
  const minutes = FORMAT_MINUTES[format] ?? 45;
  const start = new Date(startIso);
  const end = new Date(start.getTime() + minutes * 60_000);
  return { start: toCalendarStamp(start.toISOString()), end: toCalendarStamp(end.toISOString()) };
}

export function buildGoogleCalendarUrl(input: CalendarEventInput) {
  const { start, end } = eventTimes(input.startIso, input.format);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${start}/${end}`,
    details: input.description,
  });
  if (input.meetingLink) params.set("location", input.meetingLink);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcs(input: CalendarEventInput) {
  const { start, end } = eventTimes(input.startIso, input.format);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CasePass//Mock Interview//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.sessionId}@casepass`,
    `DTSTAMP:${toCalendarStamp(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${escapeIcsText(input.description)}`,
    ...(input.meetingLink ? [`LOCATION:${escapeIcsText(input.meetingLink)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
