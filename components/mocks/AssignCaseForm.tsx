"use client";

import { useActionState, useState } from "react";
import { assignCase } from "@/lib/actions/sessions";
import type { CaseListItem } from "@/lib/queries/cases";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea, Label, FormError } from "@/components/ui/Field";

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
  const [state, action, pending] = useActionState(assignCase, undefined);
  const picked = cases.find((c) => c.id === pickedId);

  return (
    <div className="flex flex-col gap-5">
      {picked && (
        <Card className="p-5 border-2 border-(--color-green)">
          <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-green) mb-1">
            {currentCaseId === picked.id ? "Case assigned" : "Case selected"}
          </div>
          <div className="font-serif text-[19px] font-semibold mb-3.5">{picked.name}</div>

          <form action={action} className="flex flex-col gap-3">
            <input type="hidden" name="sessionId" value={sessionId} />
            <input type="hidden" name="caseId" value={picked.id} />
            <div>
              <Label>Synopsis to share with the interviewee</Label>
              <Textarea
                name="synopsis"
                rows={3}
                defaultValue={currentCaseId === picked.id ? (currentSynopsis ?? picked.synopsis) : picked.synopsis}
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

      <div className="flex flex-col gap-2.5">
        {cases.map((c) => (
          <Card key={c.id} className="p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <span className="font-semibold text-[15px]">{c.name}</span>
                {c.is_seed && <Badge tone="warn">Example</Badge>}
                {currentCaseId === c.id && <Badge tone="green">Assigned</Badge>}
              </div>
              <div className="text-[12.5px] text-(--color-muted)">
                {c.case_type} · {c.difficulty} · {c.source_book} · {c.industry}
              </div>
            </div>
            <Button variant="secondary" onClick={() => setPickedId(c.id)}>
              {currentCaseId === c.id ? "Edit" : "Select this case"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
