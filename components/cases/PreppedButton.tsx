"use client";

import { useOptimistic, useTransition } from "react";
import { togglePrepped } from "@/lib/actions/cases";

export function PreppedButton({ caseId, prepped }: { caseId: string; prepped: boolean }) {
  const [optimisticPrepped, setOptimistic] = useOptimistic(prepped);
  const [, startTransition] = useTransition();

  function onClick(e: React.MouseEvent) {
    // Cards are wrapped in links; keep the click from opening the case doc.
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      setOptimistic(!optimisticPrepped);
      await togglePrepped(caseId);
    });
  }

  return (
    <button
      onClick={onClick}
      title={
        optimisticPrepped
          ? "You've marked this case as reviewed and ready to run. Click to unmark."
          : "Mark this case as reviewed and ready to run — for your reference only."
      }
      className="rounded-lg px-3.5 py-2 text-[13px] font-semibold cursor-pointer whitespace-nowrap border"
      style={
        optimisticPrepped
          ? { background: "#2d6a4f", color: "#fff", borderColor: "#2d6a4f" }
          : { background: "#fff", color: "#5b615c", borderColor: "#d7d9d4" }
      }
    >
      {optimisticPrepped ? "✓ Prepped" : "Mark as prepped"}
    </button>
  );
}
