import Link from "next/link";
import { getMyProfile } from "@/lib/dal";
import { listMySessions, getInviteStatusBySession, type SessionRow } from "@/lib/queries/sessions";
import { getMyRole, getSessionViewMeta, formatDateTime, FORMAT_LABELS } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AddToCalendar } from "@/components/ui/AddToCalendar";

export default async function UpcomingMocksPage() {
  const profile = await getMyProfile();
  const sessions = await listMySessions(profile.id);

  const active = sessions.filter((s) => s.status !== "completed" && s.status !== "declined");
  const giving = active.filter((s) => s.interviewer_id === profile.id);
  const taking = active.filter((s) => s.interviewee_id === profile.id);

  const pendingIds = active.filter((s) => s.status === "pending_invite").map((s) => s.id);
  const inviteStatuses = await getInviteStatusBySession(profile.id, pendingIds);

  return (
    <section className="p-7 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-1 flex-wrap">
        <h2 className="font-serif text-[23px] font-semibold">Upcoming mocks</h2>
        <Link href="/schedule">
          <Button>+ Schedule a mock</Button>
        </Link>
      </div>
      <p className="text-[13px] text-(--color-muted) mb-7 max-w-xl leading-relaxed">
        Every CasePass account does both — you give mocks as an interviewer and take them as an
        interviewee. Here they are, kept clearly apart.
      </p>

      <MockSection
        heading="Mocks you're giving"
        sub="You're the interviewer — pick the case, run the mock, leave feedback."
        tone="green"
        sessions={giving}
        myId={profile.id}
        inviteStatuses={inviteStatuses}
        emptyText="You're not giving any mocks right now."
      />

      <div className="mt-9">
        <MockSection
          heading="Mocks you're taking"
          sub="You're the interviewee — your interviewer picks the case and shares a preview."
          tone="navy"
          sessions={taking}
          myId={profile.id}
          inviteStatuses={inviteStatuses}
          emptyText="You're not taking any mocks right now."
        />
      </div>
    </section>
  );
}

function MockSection({
  heading,
  sub,
  tone,
  sessions,
  myId,
  inviteStatuses,
  emptyText,
}: {
  heading: string;
  sub: string;
  tone: "green" | "navy";
  sessions: SessionRow[];
  myId: string;
  inviteStatuses: Map<string, string>;
  emptyText: string;
}) {
  const accent = tone === "green" ? "#2d6a4f" : "#3a4a5a";
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <h3 className="font-serif text-[18px] font-semibold">{heading}</h3>
        <Badge tone={tone}>{sessions.length}</Badge>
      </div>
      <p className="text-[12.5px] text-(--color-muted) mb-3.5 ml-[18px]">{sub}</p>

      {sessions.length === 0 ? (
        <p className="text-sm text-(--color-muted) ml-[18px]">{emptyText}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((s) => {
            const role = getMyRole(s, myId);
            const partner = role === "interviewer" ? s.interviewee : s.interviewer;
            const meta = getSessionViewMeta(s, role, inviteStatuses.get(s.id));
            const dt = formatDateTime(s.scheduled_at);
            return (
              <Card key={s.id} className="p-4 flex items-center gap-4 flex-wrap">
                <div className="w-[54px] shrink-0 text-center bg-(--color-bg) rounded-lg py-2">
                  <div className="text-[11px] font-semibold text-(--color-muted)">{dt.mon}</div>
                  <div className="font-serif text-[22px] font-semibold leading-none">{dt.day}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[15px]">{s.assigned_case?.name ?? FORMAT_LABELS[s.format]}</div>
                  <div className="text-[13px] text-(--color-muted) mt-0.5">
                    {role === "interviewer" ? "Interviewing" : "With"} {partner.full_name} · {dt.full} · {dt.time}
                  </div>
                  {(s.status === "confirmed" || s.status === "case_selected") && (
                    <div className="mt-1.5">
                      <AddToCalendar
                        sessionId={s.id}
                        title={`CasePass mock: ${s.assigned_case?.name ?? FORMAT_LABELS[s.format]}`}
                        startIso={s.scheduled_at}
                        format={s.format}
                        partnerName={partner.full_name}
                        meetingLink={s.meeting_link}
                      />
                    </div>
                  )}
                </div>
                <Badge tone={meta.tone}>{meta.statusLabel}</Badge>
                {meta.actionHref ? (
                  <Link href={meta.actionHref}>
                    <Button variant="secondary">{meta.actionLabel}</Button>
                  </Link>
                ) : (
                  <span className="text-[13px] text-(--color-muted) whitespace-nowrap">{meta.actionLabel}</span>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
