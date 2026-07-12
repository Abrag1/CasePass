import Link from "next/link";
import { getMyProfile } from "@/lib/dal";
import { listCases, getMyPreppedCaseIds, CASE_TYPES, SOURCE_BOOKS, DIFFICULTIES } from "@/lib/queries/cases";
import { getMyCaseHistory } from "@/lib/queries/profile";
import { Card, Badge } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PreppedButton } from "@/components/cases/PreppedButton";
import { CaseHistoryList } from "@/components/profile/CaseHistoryList";

interface SearchParams {
  tab?: string;
  q?: string;
  type?: string;
  source?: string;
  difficulty?: string;
  prepped?: string;
  view?: string;
}

export default async function CasesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const profile = await getMyProfile();
  const tab = sp.tab === "given" || sp.tab === "taken" ? sp.tab : "browse";
  const view = sp.view === "grid" ? "grid" : "list";
  const preppedOnly = sp.prepped === "1";

  const [allCases, preppedIds, history] = await Promise.all([
    listCases({ type: sp.type, source: sp.source, difficulty: sp.difficulty, q: sp.q }),
    getMyPreppedCaseIds(profile.id),
    getMyCaseHistory(profile.id),
  ]);

  const cases = preppedOnly ? allCases.filter((c) => preppedIds.has(c.id)) : allCases;

  const tabLink = (t: string) => `/cases?tab=${t}`;
  const browseParams = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (v && k !== "view") browseParams.set(k, v);
  const viewLink = (v: string) => {
    const p = new URLSearchParams(browseParams);
    p.set("view", v);
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
          partnerLabel={(name) => `Interviewed ${name}`}
          emptyText="You haven't given a mock yet."
        />
      )}

      {tab === "taken" && (
        <CaseHistoryList
          items={history.taken}
          partnerLabel={(name) => `With ${name} as interviewer`}
          emptyText="You haven't taken a mock yet."
        />
      )}

      {tab === "browse" && (
        <>
          <div className="bg-[#f3f6f4] border border-[#e1ebe5] rounded-lg px-4 py-3 mb-4 text-[12.5px] text-[#3a5a4a] leading-relaxed">
            Browse and prep any case — click a case to open the full prompt, steps, and exhibits. To
            assign a case to a specific mock, use <strong>Home → Select case</strong> on that session.
          </div>

          <Card className="p-3 mb-4">
            <form method="get" className="flex items-end gap-3 flex-wrap w-full">
              <input type="hidden" name="tab" value="browse" />
              {view === "grid" && <input type="hidden" name="view" value="grid" />}
              {preppedOnly && <input type="hidden" name="prepped" value="1" />}
              <div className="flex-1 min-w-[180px]">
                <FieldLabel>Search</FieldLabel>
                <Input name="q" defaultValue={sp.q ?? ""} placeholder="Case name or industry" />
              </div>
              <div>
                <FieldLabel>Case type</FieldLabel>
                <Select name="type" defaultValue={sp.type ?? "All"}>
                  <option value="All">All</option>
                  {CASE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Source</FieldLabel>
                <Select name="source" defaultValue={sp.source ?? "All"}>
                  <option value="All">All</option>
                  {SOURCE_BOOKS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Difficulty</FieldLabel>
                <Select name="difficulty" defaultValue={sp.difficulty ?? "All"}>
                  <option value="All">All</option>
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" variant="secondary">
                Apply
              </Button>
            </form>
          </Card>

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
                <Card key={c.id} className="p-4 flex items-center gap-4 hover:border-(--color-green)/40 transition-colors">
                  <Link href={`/cases/${c.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <span className="font-semibold text-[15px]">{c.name}</span>
                      {c.is_seed && <Badge tone="warn">Example</Badge>}
                    </div>
                    <div className="text-[12.5px] text-(--color-muted) mb-2">
                      {c.case_type} · {c.difficulty} · {c.source_book} · {c.industry}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#eef2f0] text-[#3a5a4a]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <Link href={`/cases/${c.id}`}>
                    <Button>Open case</Button>
                  </Link>
                  <PreppedButton caseId={c.id} prepped={preppedIds.has(c.id)} />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
              {cases.map((c) => (
                <Card key={c.id} className="p-4 flex flex-col hover:border-(--color-green)/40 transition-colors">
                  <Link href={`/cases/${c.id}`} className="flex-1">
                    {c.is_seed && <Badge tone="warn">Example</Badge>}
                    <div className="font-semibold text-[15px] mt-2">{c.name}</div>
                    <div className="text-[12px] text-(--color-muted) mt-1 leading-snug">
                      {c.case_type} · {c.difficulty} · {c.source_book} · {c.industry}
                    </div>
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#eef2f0] text-[#3a5a4a]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <div className="flex gap-2 mt-3.5">
                    <Link href={`/cases/${c.id}`} className="flex-1">
                      <Button className="w-full">Open case</Button>
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1">{children}</div>;
}
