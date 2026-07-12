import { type ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-(--color-card) border border-(--color-border) rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "green" | "warn" | "neutral" | "navy";
}) {
  const tones: Record<string, string> = {
    green: "bg-[#e9f1ec] text-(--color-green)",
    warn: "bg-(--color-warn-bg) text-(--color-warn-fg)",
    neutral: "bg-[#eef0ee] text-[#6b6f6b]",
    navy: "bg-[#eef1f4] text-[#3a4a5a]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
