"use client";

import Link from "next/link";
import { useActionState } from "react";
import { assignCase } from "@/lib/actions/sessions";
import type { CaseListItem } from "@/lib/queries/cases";
import { caseMetaLine } from "@/lib/cases/meta";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea, Label, FormError } from "@/components/ui/Field";

// The "case selected" card: edit the synopsis and assign. Choosing a case (and searching for one)
// happens on the server page via URL params, so the AI search keeps your pick across searches.
export function AssignCaseForm({
  sessionId,
  picked,
  currentCaseId,
  currentSynopsis,
  pickAnotherHref,
}: {
  sessionId: string;
  picked: CaseListItem;
  currentCaseId: string | null;
  currentSynopsis: string | null;
  pickAnotherHref: string;
}) {
  const [state, action, pending] = useActionState(assignCase, undefined);

  return (
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
            key={picked.id}
            name="synopsis"
            rows={3}
            placeholder={picked.synopsis ? undefined : "This case has no synopsis yet — write a short one for the interviewee."}
            defaultValue={(currentCaseId === picked.id ? currentSynopsis : null) ?? picked.synopsis ?? ""}
          />
        </div>
        <FormError message={state?.error} />
        <div className="flex justify-end gap-3">
          <Link href={pickAnotherHref}>
            <Button type="button" variant="secondary">
              Pick another
            </Button>
          </Link>
          <Button type="submit" disabled={pending}>
            {pending ? "Sharing…" : "Share synopsis & assign"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
