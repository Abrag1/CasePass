import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/dal";
import {
  getProfileById,
  getMySkillProfile,
  getPartnerProfile,
  getMyCaseHistory,
} from "@/lib/queries/profile";
import { SKILL_FIELDS } from "@/lib/validation/feedback";
import { levelMeta } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { GivenTakenTabs } from "@/components/profile/GivenTakenTabs";
import { CaseHistoryList } from "@/components/profile/CaseHistoryList";

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const me = await requireUser();
  const target = await getProfileById(userId);
  if (!target) notFound();

  const isSelf = me.id === userId;
  const data = isSelf ? await getMySkillProfile() : await getPartnerProfile(userId);
  const history = isSelf ? await getMyCaseHistory(me.id) : null;
  const takenHistory = !isSelf && data && "taken_history" in data ? (data.taken_history ?? null) : null;

  return (
    <section className="p-7 max-w-3xl mx-auto">
      <h2 className="font-serif text-[23px] font-semibold mb-1">
        {isSelf ? "My profile" : `${target.full_name} — case history`}
      </h2>
      <p className="text-[13px] text-(--color-muted) mb-6">
        {isSelf ? "Your case history & feedback" : "What they've practiced so far"}
      </p>

      {!isSelf && !data && (
        <Card className="p-6 text-sm text-(--color-muted)">
          You haven&apos;t run a mock as {target.full_name}&apos;s interviewer yet, so there&apos;s nothing to show
          here.
        </Card>
      )}

      {data && (data.total_cases !== undefined || data.skill_averages) && (
        <div className="flex flex-col gap-5 mb-5">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">
            {isSelf ? "As an interviewee" : `${target.full_name} as an interviewee`}
          </div>

          {data.total_cases !== undefined && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <Stat label="Total cases" value={String(data.total_cases ?? 0)} sub="completed" />
              <Stat label="This month" value={String(data.cases_this_month ?? 0)} sub="sessions" />
              <Stat label="Avg length" value={data.avg_length_minutes ? `${data.avg_length_minutes}m` : "—"} sub="per mock" />
              <Stat label="Books used" value={String(data.distinct_books_used ?? 0)} sub="sources" />
            </div>
          )}

          {data.case_types_practiced && (
            <Card className="p-5">
              <div className="font-semibold text-[15px] mb-3.5">Case types practiced</div>
              <Histogram entries={data.case_types_practiced} color="#2d6a4f" />
            </Card>
          )}

          {data.source_books_used && (
            <Card className="p-5">
              <div className="font-semibold text-[15px] mb-3.5">Source books used</div>
              <Histogram entries={data.source_books_used} color="#6b7c89" />
            </Card>
          )}

          {data.skill_averages && (
            <Card className="p-5">
              <div className="font-semibold text-[15px] mb-3.5">Skill areas</div>
              {SKILL_FIELDS.map((f) => {
                const avg = data.skill_averages?.[f.key];
                if (avg === undefined) return null;
                const meta = levelMeta(avg);
                return (
                  <div key={f.key} className="flex items-center justify-between py-2 border-t border-(--color-border-soft)">
                    <span className="text-[13px] text-[#3a3f3b]">{f.label}</span>
                    <span className="text-[12px] font-semibold" style={{ color: meta.color }}>
                      {meta.label} ({avg.toFixed(1)})
                    </span>
                  </div>
                );
              })}
            </Card>
          )}
        </div>
      )}

      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-2.5">
          Case history
        </div>
        {isSelf && history ? (
          <GivenTakenTabs given={history.given} taken={history.taken} />
        ) : (
          takenHistory && (
            <CaseHistoryList
              items={takenHistory.map((h) => ({
                feedbackId: h.feedback_id,
                caseName: h.case_name,
                partnerName: h.partner_name,
                date: h.date,
                skillRatings: h.skill_ratings,
                recapText: h.recap_text,
                wentWell: h.went_well,
                improve: h.improve,
                practiceNext: h.practice_next,
              }))}
              partnerLabel={(name) => `With ${name} as interviewer`}
              emptyText={`${target.full_name} hasn't taken a mock yet.`}
            />
          )
        )}
      </div>

      {isSelf && (
        <p className="text-[12.5px] text-(--color-muted) mt-5">
          Control what partners can see about you in{" "}
          <Link href="/settings" className="text-(--color-green) font-semibold">
            Settings
          </Link>
          .
        </p>
      )}
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="p-4">
      <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted)">{label}</div>
      <div className="font-serif text-[28px] font-semibold leading-tight mt-1">{value}</div>
      <div className="text-[12px] text-(--color-muted)">{sub}</div>
    </Card>
  );
}

function Histogram({ entries, color }: { entries: Record<string, number>; color: string }) {
  const max = Math.max(1, ...Object.values(entries));
  return (
    <>
      {Object.entries(entries).map(([label, count]) => (
        <div key={label} className="flex items-center gap-3 mb-2.5 last:mb-0">
          <div className="w-24 shrink-0 text-[13px] text-[#3a3f3b]">{label}</div>
          <div className="flex-1 h-2 bg-(--color-border-soft) rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(count / max) * 100}%`, background: color }} />
          </div>
          <div className="w-6 shrink-0 text-right text-[13px] font-semibold text-(--color-muted)">{count}</div>
        </div>
      ))}
    </>
  );
}

