"use client";

import { useActionState, useMemo, useState } from "react";
import { assignCase } from "@/lib/actions/sessions";
import type { CaseListItem } from "@/lib/queries/cases";
import { caseMetaLine } from "@/lib/cases/meta";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea, Label, FormError, Input } from "@/components/ui/Field";

const RESULTS_LIMIT = 25;

export function AssignCaseForm({
  sessionId,
  cases,
  currentCaseId,
  currentSynopsis,
}: {
  sessionId: string;
  cases: CaseListItem[];
  currentCaseId: string | null;
  currentSynopsis: string | null;
}) {
  const [pickedId, setPickedId] = useState<string | null>(currentCaseId);
  const [query, setQuery] = useState("");
  const [state, action, pending] = useActionState(assignCase, undefined);
  const picked = cases.find((c) => c.id === pickedId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cases;
    return cases.filter((c) =>
      [c.name, c.case_type, c.source_book, c.industry, c.casebook_year].some((v) => v?.toLowerCase().includes(q))
    );
  }, [cases, query]);

  const visible = filtered.slice(0, RESULTS_LIMIT);

  return (
    <div className="flex flex-col gap-5">
      {picked && (
        <Card className="p-5 border-2 border-(--color-green)">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-green) mb-1">
            {currentCaseId === picked.id ? "Case assigned" : "Case selected"}
          </div>
          <div className="font-serif text-[19px] font-semibold mb-1">{picked.name}</div>
          <div className="text-[12.5px] text-(--color-muted) mb-3.5">{caseMetaLine(picked)}</div>

          <form action={action} className="flex flex-col gap-3">
            <input type="hidden" name="sessionId" value={sessionId} />
            <input type="hidden" name="caseId" value={picked.id} />
            <div>
              <Label>Synopsis to share with the interviewee</Label>
              <Textarea
                name="synopsis"
                rows={3}
                placeholder={picked.synopsis ? undefined : "This case has no synopsis yet — write a short one for the interviewee."}
                defaultValue={(currentCaseId === picked.id ? currentSynopsis : null) ?? picked.synopsis ?? ""}
              />
            </div>
            <FormError message={state?.error} />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setPickedId(null)}>
                Pick another
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "Sharing…" : "Share synopsis & assign"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by case name, school, industry, or type…"
        />
        <p className="text-[12px] text-(--color-muted) mt-1.5">
          {filtered.length === cases.length
            ? `${cases.length} cases`
            : `${filtered.length} of ${cases.length} cases match "${query}"`}
          {filtered.length > RESULTS_LIMIT && ` — showing first ${RESULTS_LIMIT}, narrow your search to see more`}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {visible.map((c) => (
          <Card key={c.id} className={`p-4 flex items-center gap-4 ${c.extraction_status === "basic" ? "border-dashed" : ""}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <span className="font-semibold text-[15px]">{c.name}</span>
                {c.is_seed && <Badge tone="warn">Example</Badge>}
                {c.extraction_status === "basic" && <Badge tone="neutral">Outline</Badge>}
                {currentCaseId === c.id && <Badge tone="green">Assigned</Badge>}
              </div>
              <div className="text-[12.5px] text-(--color-muted)">{caseMetaLine(c)}</div>
            </div>
            <Button variant="secondary" onClick={() => setPickedId(c.id)}>
              {currentCaseId === c.id ? "Edit" : "Select this case"}
            </Button>
          </Card>
        ))}
        {visible.length === 0 && (
          <p className="text-[13px] text-(--color-muted) italic px-1">No cases match &quot;{query}&quot;.</p>
        )}
      </div>
    </div>
  );
}
