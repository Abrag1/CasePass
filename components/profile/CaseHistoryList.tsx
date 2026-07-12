"use client";

import { useState } from "react";
import { SKILL_FIELDS } from "@/lib/validation/feedback";
import { Card } from "@/components/ui/Card";

export interface HistoryItem {
  feedbackId: string;
  caseName: string;
  partnerName: string;
  date: string;
  skillRatings: Record<string, string>;
  recapText: string | null;
  wentWell: string | null;
  improve: string | null;
  practiceNext: string | null;
}

export function CaseHistoryList({
  items,
  partnerLabel,
  emptyText,
}: {
  items: HistoryItem[];
  partnerLabel: (name: string) => string;
  emptyText: string;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (items.length === 0) {
    return <p className="text-sm text-(--color-muted)">{emptyText}</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => {
        const expanded = expandedId === item.feedbackId;
        return (
          <Card key={item.feedbackId} className="overflow-hidden">
            <button
              onClick={() => setExpandedId(expanded ? null : item.feedbackId)}
              className="w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer"
            >
              <div>
                <div className="font-semibold text-[14.5px]">{item.caseName}</div>
                <div className="text-[12.5px] text-(--color-muted) mt-0.5">
                  {partnerLabel(item.partnerName)} ·{" "}
                  {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <span className="text-[12.5px] font-semibold text-(--color-green) whitespace-nowrap">
                {expanded ? "Hide feedback ▲" : "View feedback ▼"}
              </span>
            </button>
            {expanded && (
              <div className="border-t border-(--color-border-soft) p-4 flex flex-col gap-3.5">
                {item.recapText && <Field label="Recap" value={item.recapText} />}
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1.5">
                    Skill ratings
                  </div>
                  {SKILL_FIELDS.map((f) => {
                    const v = item.skillRatings[f.key];
                    if (!v) return null;
                    return (
                      <div key={f.key} className="flex items-center justify-between py-1 text-[13px] border-t border-(--color-border-soft) first:border-t-0">
                        <span>{f.label}</span>
                        <span className="font-semibold text-(--color-green)">{v}/5</span>
                      </div>
                    );
                  })}
                </div>
                {item.wentWell && <Field label="What went well" value={item.wentWell} />}
                {item.improve && <Field label="What to improve" value={item.improve} />}
                {item.practiceNext && <Field label="What to practice next" value={item.practiceNext} />}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide font-semibold text-(--color-muted) mb-1">{label}</div>
      <p className="text-[13.5px] text-[#2a2f2b] leading-relaxed">{value}</p>
    </div>
  );
}
