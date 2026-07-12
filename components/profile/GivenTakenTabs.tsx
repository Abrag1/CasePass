"use client";

import { useState } from "react";
import { CaseHistoryList, type HistoryItem } from "@/components/profile/CaseHistoryList";

export function GivenTakenTabs({ given, taken }: { given: HistoryItem[]; taken: HistoryItem[] }) {
  const [tab, setTab] = useState<"given" | "taken">("taken");

  return (
    <div>
      <div className="flex gap-1 bg-[#f1f2ef] rounded-lg p-[3px] w-fit mb-3.5">
        <TabButton active={tab === "taken"} onClick={() => setTab("taken")} label="Cases I've taken" count={taken.length} />
        <TabButton active={tab === "given"} onClick={() => setTab("given")} label="Cases I've given" count={given.length} />
      </div>

      {tab === "taken" ? (
        <CaseHistoryList
          items={taken}
          partnerLabel={(name) => `With ${name} as interviewer`}
          emptyText="You haven't taken a mock yet."
        />
      ) : (
        <CaseHistoryList
          items={given}
          partnerLabel={(name) => `Interviewed ${name}`}
          emptyText="You haven't given a mock yet."
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 ${
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
    </button>
  );
}
