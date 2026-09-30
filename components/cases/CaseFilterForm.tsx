"use client";

// Same filter bar as before, but selects auto-apply on change (no separate "Apply"
// click to remember/miss) -- the previous manual-Apply version was reported as
// unreliable in practice. The search text field still needs an explicit trigger
// (Enter, blur, or the Apply button) so it doesn't reload on every keystroke.
// Still a plain GET form under the hood, so it stays bookmarkable/shareable and
// works even if JS is slow to hydrate.

import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

function submitOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
  e.currentTarget.form?.requestSubmit();
}

export function CaseFilterForm({
  tab,
  view,
  preppedOnly,
  content,
  q,
  type,
  source,
  industry,
  difficulty,
  caseTypes,
  sourceBooks,
  industries,
  difficulties,
}: {
  tab: string;
  view: string;
  preppedOnly: boolean;
  content: string;
  q: string;
  type: string;
  source: string;
  industry: string;
  difficulty: string;
  caseTypes: string[];
  sourceBooks: string[];
  industries: string[];
  difficulties: string[];
}) {
  return (
    <form
      method="get"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[minmax(200px,2fr)_repeat(4,minmax(130px,1fr))_auto] gap-3 items-end w-full"
    >
      <input type="hidden" name="tab" value={tab} />
      {view === "grid" && <input type="hidden" name="view" value="grid" />}
      {preppedOnly && <input type="hidden" name="prepped" value="1" />}
      {content !== "all" && <input type="hidden" name="content" value={content} />}
      <div className="col-span-2 sm:col-span-3 lg:col-span-1">
        <FieldLabel>Search</FieldLabel>
        <Input name="q" defaultValue={q} placeholder="Case name, industry, or casebook — press Enter" />
      </div>
      <div>
        <FieldLabel>Case type</FieldLabel>
        <Select name="type" defaultValue={type} onChange={submitOnChange}>
          <option value="All">All</option>
          {caseTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Source</FieldLabel>
        <Select name="source" defaultValue={source} onChange={submitOnChange}>
          <option value="All">All</option>
          {sourceBooks.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Industry</FieldLabel>
        <Select name="industry" defaultValue={industry} onChange={submitOnChange}>
          <option value="All">All</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Difficulty</FieldLabel>
        <Select name="difficulty" defaultValue={difficulty} onChange={submitOnChange}>
          <option value="All">All</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" variant="secondary" className="col-span-2 sm:col-span-1 justify-self-start lg:justify-self-auto">
        Apply
      </Button>
    </form>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1">{children}</div>;
}
