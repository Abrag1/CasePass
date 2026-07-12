"use client";

import { useState, useTransition } from "react";
import { saveIntervieweeNote } from "@/lib/actions/sessions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";

export function IntervieweeNote({ sessionId, initialNote }: { sessionId: string; initialNote: string | null }) {
  const [note, setNote] = useState(initialNote ?? "");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await saveIntervieweeNote(sessionId, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <Card className="p-5 mt-4">
      <div className="font-semibold text-[14px]">Share something with your interviewer (optional)</div>
      <p className="text-[12.5px] text-(--color-muted) mt-0.5 mb-2.5 leading-relaxed">
        Only shared if you write it — e.g. what you&apos;re working on this week, or what kind of
        pressure you want. Your interviewer sees it when picking your case.
      </p>
      <Textarea
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="e.g. Focusing on math speed this week — push me on the numbers."
      />
      <div className="flex items-center justify-end gap-3 mt-2.5">
        {saved && <span className="text-[12.5px] font-semibold text-(--color-green)">Saved ✓</span>}
        <Button variant="secondary" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save note"}
        </Button>
      </div>
    </Card>
  );
}
