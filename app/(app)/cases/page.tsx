import Link from "next/link";
import { getMyProfile } from "@/lib/dal";
import {
  listCases,
  getMyPreppedCaseIds,
  getMyCaseExposure,
  getMyPartners,
  getNextInterviewee,
  CASE_TYPES,
  SOURCE_BOOKS,
  INDUSTRIES,
  DIFFICULTIES,
  caseMetaLine,
} from "@/lib/queries/cases";
import { getMyCaseHistory, getPartnerProfile } from "@/lib/queries/profile";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PreppedButton } from "@/components/cases/PreppedButton";
import { CaseHistoryList } from "@/components/profile/CaseHistoryList";
import { CaseFilterForm } from "@/components/cases/CaseFilterForm";
import { displayChips } from "@/lib/cases/meta";
import { AiSearchBar } from "@/components/cases/AiSearchBar";
import { interpretWithAi } from "@/lib/cases/aiIntent";
import { getCasePages, pageHasExhibit } from "@/lib/cases/content";
import { dropChips, extractPeople, heuristicIntent, intentChips, searchCases } from "@/lib/cases/search";

interface SearchParams {
  tab?: string;
  q?: string;
  type?: string;
  source?: string;
  industry?: string;
  difficulty?: string;
  prepped?: string;
  view?: string;
  content?: string;
  ai?: string;
  drop?: string;
}

export default async function CasesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const profile = await getMyProfile();
  const tab = sp.tab === "given" || sp.tab === "taken" ? sp.tab : "browse";
  const view = sp.view === "grid" ? "grid" : "list";
  const preppedOnly = sp.prepped === "1";
  // "full" = fully digitized (page-by-page content); "outline" = catalog entry only.
  const content = sp.content === "full" || sp.content === "outline" ? sp.content : "all";

  // "Describe what you want" search: a sentence is turned into filters, then applied to the whole library.
  const aiQuery = (sp.ai ?? "").trim().slice(0, 400);
  const dropped = (sp.drop ?? "").split(",").map((x) => x.trim()).filter(Boolean);

  const [allCases, preppedIds, history, exposure, partners, nextInterviewee] = await Promise.all([
    listCases(
      aiQuery ? {} : { type: sp.type, source: sp.source, industry: sp.industry, difficulty: sp.difficulty, q: sp.q },
    ),
    getMyPreppedCaseIds(profile.id),
    getMyCaseHistory(profile.id),
    aiQuery ? getMyCaseExposure(profile.id) : Promise.resolve(new Map<string, string>()),
    aiQuery ? getMyPartners(profile.id) : Promise.resolve([] as { id: string; name: string }[]),
    getNextInterviewee(profile.id),
  ]);

  let aiResult: {
    hits: ReturnType<typeof searchCases<(typeof allCases)[number] & { hasExhibits: boolean | null }>>["hits"];
    relaxed: boolean;
    usedAi: boolean;
    chips: ReturnType<typeof intentChips>;
    others: { id: string; name: string; status: "used" | "private" | "unused" }[];
  } | null = null;
  if (aiQuery) {
    const vocab = { types: CASE_TYPES, sources: SOURCE_BOOKS, industries: INDUSTRIES, difficulties: ["Easy", "Medium", "Hard"] };
    // Names in the sentence are people, not topics: your own name means "my history"; a partner's name
    // means the question is about them, which we say plainly instead of filtering on it.
    const { text: cleaned, others } = extractPeople(aiQuery, [
      { id: profile.id, name: profile.full_name, isMe: true },
      ...partners.map((p) => ({ ...p, isMe: false })),
    ]);
    const aiIntent = await interpretWithAi(cleaned || aiQuery, vocab, profile.id);
    const base = aiIntent ?? heuristicIntent(cleaned || aiQuery, vocab);
    // "Cases Emily hasn't done": use her history if she has shared it (only possible one person at a time);
    // otherwise her history can't be used, and the notice says so.
    let lastDone = exposure;
    let who = "You";
    let subject: { id: string; name: string; status: "used" | "private" | "unused" }[] = others.map((p) => ({ ...p, status: "unused" as const }));
    if (others.length) {
      if (base.doneMode !== "none" && others.length === 1) {
        const taken = (await getPartnerProfile(others[0].id))?.taken_history;
        if (taken) {
          const byName = new Map(allCases.map((c) => [c.name.trim().toLowerCase(), c.id]));
          lastDone = new Map();
          for (const t of taken) {
            const id = byName.get(t.case_name.trim().toLowerCase());
            if (id && (!lastDone.get(id) || t.date > lastDone.get(id)!)) lastDone.set(id, t.date);
          }
          who = others[0].name.split(" ")[0];
          subject = [{ ...others[0], status: "used" }];
        } else {
          subject = [{ ...others[0], status: "private" }];
        }
      }
      if (who === "You") {
        base.doneMode = "none"; // no usable history for them, and "mine" would be the wrong person
        base.doneDays = null;
      }
    }
    const intent = dropChips(base, dropped);
    const searchable = allCases.map((c) => ({
      ...c,
      // Only digitized cases tell us whether they contain exhibits; outline entries stay "unknown".
      hasExhibits: c.extraction_status !== "basic" ? (getCasePages(c.id)?.some(pageHasExhibit) ?? null) : null,
    }));
    const res = searchCases(searchable, intent, { preppedIds, lastDone, who });
    aiResult = { ...res, usedAi: !!aiIntent, chips: intentChips(intent, who === "You" ? "me" : who), others: subject };
  }
  const reasonsById = new Map((aiResult?.hits ?? []).map((h) => [h.item.id, h.reasons]));

  const fullCount = allCases.filter((c) => c.extraction_status !== "basic").length;
  const byContent =
    content === "full"
      ? allCases.filter((c) => c.extraction_status !== "basic")
      : content === "outline"
        ? allCases.filter((c) => c.extraction_status === "basic")
        : allCases;
  const cases = aiResult
    ? aiResult.hits.map((h) => h.item)
    : preppedOnly
      ? byContent.filter((c) => preppedIds.has(c.id))
      : byContent;

  const tabLink = (t: string) => `/cases?tab=${t}`;
  const browseParams = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (v && k !== "view") browseParams.set(k, v);
  const viewLink = (v: string) => {
    const p = new URLSearchParams(browseParams);
    p.set("view", v);
    return `/cases?${p.toString()}`;
  };
  const contentLink = (v: "all" | "full" | "outline") => {
    const p = new URLSearchParams(browseParams);
    if (v === "all") p.delete("content");
    else p.set("content", v);
    if (view === "grid") p.set("view", "grid");
    return `/cases?${p.toString()}`;
  };
  const preppedParams = new URLSearchParams(browseParams);
  if (preppedOnly) preppedParams.delete("prepped");
  else preppedParams.set("prepped", "1");
  if (view === "grid") preppedParams.set("view", "grid");

  return (
    <section className="p-7 max-w-5xl mx-auto">
      <h2 className="font-serif text-[23px] font-semibold mb-1">Case library</h2>
      <p className="text-[13px] text-(--color-muted) mb-5 max-w-2xl leading-relaxed">
        Browse cases from the major casebooks, or review the mocks you&apos;ve run and taken. Every
        CasePass account does both — you give cases and you take them.
      </p>

      <div className="flex gap-1 bg-[#f1f2ef] rounded-lg p-[3px] w-fit mb-5">
        <TabLink href={tabLink("browse")} active={tab === "browse"} label="Browse cases" count={allCases.length} />
        <TabLink href={tabLink("given")} active={tab === "given"} label="Cases given" count={history.given.length} />
        <TabLink href={tabLink("taken")} active={tab === "taken"} label="Cases taken" count={history.taken.length} />
      </div>

      {tab === "given" && (
        <CaseHistoryList
          items={history.given}
          partnerLabel="Interviewed {name}"
          emptyText="You haven't given a mock yet."
        />
      )}

      {tab === "taken" && (
        <CaseHistoryList
          items={history.taken}
          partnerLabel="With {name} as interviewer"
          emptyText="You haven't taken a mock yet."
        />
      )}

      {tab === "browse" && (
        <>
          <AiSearchBar
            q={aiQuery}
            view={view}
            chips={aiResult?.chips ?? []}
            dropped={dropped}
            usedAi={aiResult?.usedAi ?? false}
            relaxed={aiResult?.relaxed ?? false}
            others={aiResult?.others ?? []}
            nextInterviewee={nextInterviewee}
            count={cases.length}
            total={allCases.length}
          />

          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5 ml-1">
            Or filter manually
          </div>
          <Card className="p-3 mb-4">
            <CaseFilterForm
              tab="browse"
              view={view}
              preppedOnly={preppedOnly}
              content={content}
              q={sp.q ?? ""}
              type={sp.type ?? "All"}
              source={sp.source ?? "All"}
              industry={sp.industry ?? "All"}
              difficulty={sp.difficulty ?? "All"}
              caseTypes={CASE_TYPES}
              sourceBooks={SOURCE_BOOKS}
              industries={INDUSTRIES}
              difficulties={DIFFICULTIES}
            />
          </Card>

          {!aiResult && (
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="flex bg-[#f1f2ef] rounded-lg p-[3px]">
              <ViewLink href={contentLink("all")} active={content === "all"} label={`All (${allCases.length})`} />
              <ViewLink href={contentLink("full")} active={content === "full"} label={`Full cases (${fullCount})`} />
              <ViewLink
                href={contentLink("outline")}
                active={content === "outline"}
                label={`Outline only (${allCases.length - fullCount})`}
              />
            </div>
            <span className="text-[12px] text-(--color-muted)">
              Full case = digitized page by page (prompt, exhibits, guidance, answers), ready to run live.
            </span>
          </div>
          )}

          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <p className="text-[12.5px] text-(--color-muted)">
              {cases.length === allCases.length ? `${cases.length} cases` : `${cases.length} of ${allCases.length} cases`}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[12px] text-(--color-muted)">
                Prepped = a case you&apos;re ready to run, for your reference
              </span>
              <Link
                href={`/cases?${preppedParams.toString()}`}
                className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold border whitespace-nowrap"
                style={
                  preppedOnly
                    ? { background: "#2d6a4f", color: "#fff", borderColor: "#2d6a4f" }
                    : { background: "#fff", color: "#5b615c", borderColor: "#e0e2dd" }
                }
              >
                Show prepped only
              </Link>
              <div className="flex bg-[#f1f2ef] rounded-lg p-[3px]">
                <ViewLink href={viewLink("list")} active={view === "list"} label="List" />
                <ViewLink href={viewLink("grid")} active={view === "grid"} label="Grid" />
              </div>
            </div>
          </div>

          {view === "list" ? (
            <div className="flex flex-col gap-2.5">
              {cases.map((c) => (
                <Card
                  key={c.id}
                  className={`p-4 flex items-center gap-4 hover:border-(--color-green)/40 transition-colors ${
                    c.extraction_status === "basic" ? "border-dashed" : ""
                  }`}
                >
                  <Link href={`/cases/${c.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <span className="font-semibold text-[15px]">{c.name}</span>
                      {c.is_seed && <Badge tone="warn">Example</Badge>}
                      {c.extraction_status === "basic" ? <Badge tone="neutral">Outline</Badge> : <Badge tone="green">Full case</Badge>}
                    </div>
                    <div className="text-[12.5px] text-(--color-muted) mb-2">{caseMetaLine(c)}</div>
                    {reasonsById.get(c.id) && reasonsById.get(c.id)!.length > 0 && (
                      <div className="text-[12px] font-semibold text-(--color-green) mb-2">✦ {reasonsById.get(c.id)!.join(" · ")}</div>
                    )}
                    {c.synopsis ? (
                      <p className="text-[12.5px] text-[#5b615c] leading-relaxed mb-2 max-w-xl">{c.synopsis}</p>
                    ) : (
                      <p className="text-[12px] text-(--color-muted) italic mb-2">
                        No synopsis yet — school, type, difficulty, and industry are confirmed from the source casebook.
                      </p>
                    )}
                    <div className="flex gap-1.5 flex-wrap">
                      {displayChips(c).map((t) => (
                        <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#eef2f0] text-[#3a5a4a]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <Link href={`/cases/${c.id}`}>
                    <Button variant={c.extraction_status === "basic" ? "secondary" : "primary"}>
                      {c.extraction_status === "basic" ? "View outline" : "Open case"}
                    </Button>
                  </Link>
                  <PreppedButton caseId={c.id} prepped={preppedIds.has(c.id)} />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
              {cases.map((c) => (
                <Card
                  key={c.id}
                  className={`p-4 flex flex-col hover:border-(--color-green)/40 transition-colors ${
                    c.extraction_status === "basic" ? "border-dashed" : ""
                  }`}
                >
                  <Link href={`/cases/${c.id}`} className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {c.is_seed && <Badge tone="warn">Example</Badge>}
                      {c.extraction_status === "basic" ? <Badge tone="neutral">Outline</Badge> : <Badge tone="green">Full case</Badge>}
                    </div>
                    <div className="font-semibold text-[15px] mt-2">{c.name}</div>
                    <div className="text-[12px] text-(--color-muted) mt-1 leading-snug">{caseMetaLine(c)}</div>
                    {reasonsById.get(c.id) && reasonsById.get(c.id)!.length > 0 && (
                      <div className="text-[12px] font-semibold text-(--color-green) mt-1.5">✦ {reasonsById.get(c.id)!.join(" · ")}</div>
                    )}
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {displayChips(c).map((t) => (
                        <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#eef2f0] text-[#3a5a4a]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <div className="flex gap-2 mt-3.5">
                    <Link href={`/cases/${c.id}`} className="flex-1">
                      <Button className="w-full" variant={c.extraction_status === "basic" ? "secondary" : "primary"}>
                        {c.extraction_status === "basic" ? "View outline" : "Open case"}
                      </Button>
                    </Link>
                    <PreppedButton caseId={c.id} prepped={preppedIds.has(c.id)} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function TabLink({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold flex items-center gap-1.5 ${
        active ? "bg-white text-(--color-fg)" : "text-(--color-muted)"
      }`}
    >
      {label}
      <span
        className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
        style={{ background: active ? "#e9f1ec" : "#e4e6e1", color: active ? "#2d6a4f" : "#8a8f8a" }}
      >
        {count}
      </span>
    </Link>
  );
}

function ViewLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${
        active ? "bg-[#e9f1ec] text-(--color-green)" : "text-(--color-muted)"
      }`}
    >
      {label}
    </Link>
  );
}

