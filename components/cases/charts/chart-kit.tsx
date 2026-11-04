// Shared pieces for the chart renderers (used by blocks.tsx and components/cases/charts/*).

import type { ChartTitleStyle } from "@/lib/cases/content";

export function ExhibitFrame({ dark, title, titleStyle, children }: { dark?: boolean; title?: string; titleStyle?: ChartTitleStyle; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: dark ? "none" : "1px solid #e6e7e3",
        background: dark ? "#262c28" : undefined,
        borderRadius: 10,
        padding: dark ? 20 : "22px 24px",
        marginBottom: 14,
        minWidth: 0,
        overflowX: "auto",
      }}
    >
      {title && titleStyle === "centered-bold" ? (
        <div style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: dark ? "#dbe3dd" : "#111111", marginBottom: 16 }}>{title}</div>
      ) : title && titleStyle === "centered-underlined" ? (
        <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center", textDecoration: "underline", color: dark ? "#dbe3dd" : "#1f2421", marginBottom: 16 }}>{title}</div>
      ) : (
        title && <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#8a958d" : "#5b615c", marginBottom: 16 }}>{title}</div>
      )}
      {children}
    </div>
  );
}

export function chartInk(dark?: boolean) {
  return {
    text: dark ? "#dbe3dd" : "#3a3f3b",
    axis: dark ? "#8a958d" : "#6b716c",
    grid: dark ? "#333a35" : "#e6e7e3",
    sliceStroke: dark ? "#262c28" : "#ffffff",
  };
}
