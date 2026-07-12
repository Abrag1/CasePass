import Link from "next/link";
import { getMyProfile } from "@/lib/dal";
import { listMySessions, listMyPendingInvites, getInviteStatusBySession, type SessionRow } from "@/lib/queries/sessions";
import { respondToInvite } from "@/lib/actions/sessions";
import { getMyRole, getSessionViewMeta, formatDateTime, FORMAT_LABELS } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AddToCalendar } from "@/components/ui/AddToCalendar";

export default async function HomePage() {
  const profile = await getMyProfile();
  const [sessions, invites] = await Promise.all([listMySessions(profile.id), listMyPendingInvites(profile.id)]);

  // Sessions still waiting on MY answer live in the requests section, not the list.
  const inviteSessionIds = new Set(invites.map((i) => i.mock_session_id));
  const visible = sessions.filter((s) => !inviteSessionIds.has(s.id) && s.status !== "declined");

  const pendingMine = visible.filter((s) => s.status === "pending_invite");
  const inviteStatuses = await getInviteStatusBySession(
    profile.id,
    pendingMine.map((s) => s.id)
  );

  const upcoming = visible.filter((s) => s.status !== "completed");
  const past = visible.filter((s) => s.status === "completed");

  return (
    <section className="p-7 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <h2 className="font-serif text-[23px] font-semibold">Your mocks</h2>
        <Link href="/schedule">
          <Button>+ Schedule a mock</Button>
        </Link>
      </div>

      {invites.length > 0 && (
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
            <div className="font-semibold text-[15px]">Mock requests</div>
            <Badge tone="warn">
              {invites.length} pending
            </Badge>
            <span className="text-[12px] text-(--color-muted) ml-auto">
              Partners who want to run a mock with you
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {invites.map((inv) => {
              const dt = formatDateTime(inv.session.scheduled_at);
              return (
                <div key={inv.id} className="border border-(--color-border-soft) rounded-lg p-4 bg-(--color-bg) flex items-start gap-3.5 flex-wrap">
                  <div className="w-[38px] h-[38px] shrink-0 rounded-full bg-[#eef1f4] text-[#3a4a5a] flex items-center justify-center font-semibold text-[13px]">
                    {inv.requester.initials}
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-semibold text-[14.5px]">{inv.requester.full_name}</span>
                      <span className="text-[12px] text-(--color-muted)">
                        wants you as their {inv.proposed_role === "interviewer" ? "interviewer" : "interviewee"}
                      </span>
                    </div>
                    <div className="text-[13px] mt-0.5">
                      {FORMAT_LABELS[inv.session.format]} · <strong>{dt.full}</strong> · {dt.time}
                    </div>
                    {inv.session.notes && (
                      <div className="text-[12.5px] text-(--color-muted) mt-1 leading-relaxed">{inv.session.notes}</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <form
                      action={async () => {
                        "use server";
                        await respondToInvite(inv.id, "declined");
                      }}
                    >
                      <Button variant="danger" type="submit">Decline</Button>
                    </form>
                    <Link href={`/mocks/${inv.mock_session_id}/reschedule`}>
                      <Button variant="secondary">Suggest new time</Button>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await respondToInvite(inv.id, "accepted");
                      }}
                    >
                      <Button type="submit">Accept</Button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <SessionGroup
        title="Upcoming"
        sessions={upcoming}
        myId={profile.id}
        inviteStatuses={inviteStatuses}
        emptyText="No upcoming mocks yet."
      />
      {past.length > 0 && (
        <div className="mt-8">
          <SessionGroup title="Past" sessions={past} myId={profile.id} inviteStatuses={inviteStatuses} emptyText="" />
        </div>
      )}
    </section>
  );
}

function SessionGroup({
  title,
  sessions,
  myId,
  inviteStatuses,
  emptyText,
}: {
  title: string;
  sessions: SessionRow[];
  myId: string;
  inviteStatuses: Map<string, string>;
  emptyText: string;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-2.5">{title}</div>
      {sessions.length === 0 ? (
        <p className="text-sm text-(--color-muted)">{emptyText}</p>
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
                  <div className="font-semibold text-[15px]">
                    {s.assigned_case?.name ?? FORMAT_LABELS[s.format]}
                  </div>
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
