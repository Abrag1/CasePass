import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getMyProfile, requireUser } from "@/lib/dal";
import { getSession } from "@/lib/queries/sessions";
import { listCases, getMyPreppedCaseIds, getMyCaseExposure, getMyPartners, caseMetaLine } from "@/lib/queries/cases";
import { runAiSearch } from "@/lib/cases/runAiSearch";
import { AssignCaseForm } from "@/components/mocks/AssignCaseForm";
import { AiSearchBar } from "@/components/cases/AiSearchBar";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const RESULTS_LIMIT = 25;

export default async function AssignCasePage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ shared?: string; ai?: string; drop?: string; pick?: string; content?: string }>;
}) {
  const { sessionId } = await params;
  const sp = await searchParams;
  const { shared } = sp;
  const user = await requireUser();
  const session = await getSession(sessionId);
  if (!session) notFound();
  if (session.interviewer_id !== user.id) redirect("/home");

  const aiQuery = (sp.ai ?? "").trim().slice(0, 400);
  const dropped = (sp.drop ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  // Default to fully digitized cases -- those are the ones that can actually be run live.
  const fullOnly = sp.content !== "all";

  const profile = await getMyProfile();
  const [cases, preppedIds, exposure, partners] = await Promise.all([
    listCases({}),
    getMyPreppedCaseIds(user.id),
    aiQuery ? getMyCaseExposure(user.id) : Promise.resolve(new Map<string, string>()),
    aiQuery ? getMyPartners(user.id) : Promise.resolve([] as { id: string; name: string }[]),
  ]);
  const firstName = session.interviewee.full_name.split(" ")[0];

  // The interviewee is always a known person here, so "cases <name> hasn't done" works even if
  // this is your first mock with them.
  const people = partners.some((p) => p.id === session.interviewee.id)
    ? partners
    : [...partners, { id: session.interviewee.id, name: session.interviewee.full_name }];
  const aiResult = aiQuery
    ? await runAiSearch({
        query: aiQuery,
        dropped,
        allCases: cases,
        me: { id: user.id, name: profile.full_name },
        partners: people,
        preppedIds,
        exposure,
      })
    : null;
  const reasonsById = new Map((aiResult?.hits ?? []).map((h) => [h.item.id, h.reasons]));

  const readyCount = cases.filter((c) => c.extraction_status !== "basic").length;
  const ranked = aiResult ? aiResult.hits.map((h) => h.item) : cases;
  const pool = fullOnly ? ranked.filter((c) => c.extraction_status !== "basic") : ranked;
  const visible = pool.slice(0, RESULTS_LIMIT);

  // Which case is open in the "selected" card lives in the URL so it survives searching.
  const pickedId = sp.pick === "none" ? null : sp.pick || session.assigned_case_id;
  const picked = cases.find((c) => c.id === pickedId) ?? null;

  const basePath = `/mocks/${session.id}/assign`;
  const baseParams: Record<string, string> = {};
  if (sp.pick) baseParams.pick = sp.pick;
  if (!fullOnly) baseParams.content = "all";
  const link = (over: Record<string, string | null>) => {
    const p = new URLSearchParams();
    const cur: Record<string, string | undefined> = { pick: sp.pick, ai: sp.ai, drop: sp.drop, content: sp.content };
    for (const [k, v] of Object.entries({ ...cur, ...over })) if (v) p.set(k, v);
    const qs = p.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <section className="p-7 max-w-4xl mx-auto">
      <a href="/home" className="text-[13px] text-(--color-muted) hover:text-(--color-fg) mb-3.5 inline-block">
        ← Back to home
      </a>

      {shared === "1" && session.assigned_case && (
        <div className="flex items-center gap-3 bg-[#e9f1ec] border border-[#cfe3d7] rounded-xl px-4 py-3.5 mb-5 flex-wrap">
          <div className="w-[30px] h-[30px] shrink-0 rounded-full bg-(--color-green) text-white flex items-center justify-center text-[15px]">
            ✓
          </div>
          <div className="flex-1 min-w-[220px]">
            <div className="font-semibold text-[14px] text-[#1f3a2b]">
              Synopsis shared — {firstName} has been notified
            </div>
            <div className="text-[12.5px] text-[#3a5a4a] mt-0.5">
              {session.assigned_case.name} is locked in for this mock. {firstName} sees only the synopsis
              until you present live.
            </div>
          </div>
          <Link href={`/mocks/${session.id}/live`}>
            <Button>Go to live mock</Button>
          </Link>
        </div>
      )}

      <h2 className="font-serif text-[22px] font-semibold mb-1">
        Select a case for {session.interviewee.full_name}
      </h2>
      <p className="text-[13px] text-(--color-muted) mb-6">
        Pick a case, then share a short synopsis. The full prompt, exhibits, and answers stay hidden from{" "}
        {session.interviewee.full_name} until you present them live.
      </p>

      {session.interviewee_note && (
        <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-lg px-4 py-3 mb-5">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-green) mb-1">
            Note from {session.interviewee.full_name}
          </div>
          <p className="text-[13.5px] text-[#2a3f33] leading-relaxed">{session.interviewee_note}</p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {picked && (
          <AssignCaseForm
            sessionId={session.id}
            picked={picked}
            currentCaseId={session.assigned_case_id}
            currentSynopsis={session.synopsis_shared_to_interviewee}
            pickAnotherHref={link({ pick: "none" })}
          />
        )}

        <AiSearchBar
          q={aiQuery}
          view="list"
          chips={aiResult?.chips ?? []}
          dropped={dropped}
          usedAi={aiResult?.usedAi ?? false}
          relaxed={aiResult?.relaxed ?? false}
          others={aiResult?.others ?? []}
          nextInterviewee={null}
          count={pool.length}
          total={fullOnly ? readyCount : cases.length}
          basePath={basePath}
          baseParams={baseParams}
          clearHref={link({ ai: null, drop: null })}
          description={`Describe the case you want to give ${firstName} — it uses your prepped list, the mocks you've run, and ${firstName}'s shared case history.`}
          examples={[
            { query: `Cases ${session.interviewee.full_name} has not done`, note: "uses their shared history" },
            { query: "Prepped cases I haven't run in the past month" },
            { query: "Medium profitability case with exhibits" },
          ]}
        />

        <div className="flex bg-[#f1f2ef] rounded-lg p-[3px] w-fit">
          {(
            [
              [true, `Ready to run (${readyCount})`],
              [false, `All cases (${cases.length})`],
            ] as const
          ).map(([full, label]) => (
            <Link
              key={String(full)}
              href={link({ content: full ? null : "all" })}
              className={`rounded-md px-3 py-1 text-[12px] font-semibold ${
                fullOnly === full ? "bg-[#e9f1ec] text-(--color-green)" : "text-(--color-muted)"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 -mt-2">
          <p className="text-[12px] text-(--color-muted)">
            {pool.length} {aiQuery ? "match" : "cases"}
            {pool.length > RESULTS_LIMIT && ` — showing first ${RESULTS_LIMIT}, refine your search to see more`}
          </p>
          {visible.map((c) => (
            <Card key={c.id} className={`p-4 flex items-center gap-4 ${c.extraction_status === "basic" ? "border-dashed" : ""}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <span className="font-semibold text-[15px]">{c.name}</span>
                  {c.extraction_status === "basic" ? <Badge tone="neutral">Outline</Badge> : <Badge tone="green">Full case</Badge>}
                  {session.assigned_case_id === c.id && <Badge tone="green">Assigned</Badge>}
                </div>
                <div className="text-[12.5px] text-(--color-muted)">{caseMetaLine(c)}</div>
                {reasonsById.get(c.id) && reasonsById.get(c.id)!.length > 0 && (
                  <div className="text-[12px] font-semibold text-(--color-green) mt-1.5">✦ {reasonsById.get(c.id)!.join(" · ")}</div>
                )}
              </div>
              <Link href={link({ pick: c.id })}>
                <Button variant="secondary" type="button">
                  {session.assigned_case_id === c.id ? "Edit" : "Select this case"}
                </Button>
              </Link>
            </Card>
          ))}
          {visible.length === 0 && (
            <p className="text-[13px] text-(--color-muted) italic px-1">
              {aiQuery ? "No cases match. Try removing a filter above or switching to All cases." : "No cases to show."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
