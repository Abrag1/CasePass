// Optional two-panel layout for HBarsData (`rightPanel`): the category labels sit left of the first panel only and a
// second panel with its own values, title and axis shares the same rows, all in ONE drawing so both panels have the same
// scale and row height. Panel titles carry a coloured rule under them (`titleRule`).
import type { HBarsData } from "@/lib/cases/extra-charts";
import { chartInk } from "./chart-kit";

export function HBarsTwoPanel({ data, dark }: { data: HBarsData; dark?: boolean }) {
  const rp = data.rightPanel;
  if (!rp) return null;
  const ink = chartInk(dark);
  const frame = dark ? "#8a958d" : "#3a3f3b";
  const color = data.series?.[0]?.color ?? "#3a4a9f";
  const fsLabel = data.labelFontSize ?? 15;
  const fsValue = data.valueFontSize ?? 24;
  const fsTick = data.tickFontSize ?? 24;
  const fsAxisTitle = data.axisTitleFontSize ?? 26;
  const fsTitle = data.panelTitleFontSize ?? 22;
  const plotL = data.plotWidth ?? 240;
  const plotR = rp.plotWidth ?? plotL;
  const longest = Math.max(1, ...data.groups.map((g) => g.label.length));
  const labelW = Math.ceil(longest * fsLabel * 0.5) + 24;
  const valRoom = Math.ceil(2 * fsValue * 0.56) + 12;
  const gap = 34;
  const x0L = labelW;
  const spanL = labelW + plotL + valRoom;
  const x0R = spanL + gap + 8;
  const W = x0R + plotR + valRoom;
  const titleY = 28;
  const ruleY = 44;
  const top = 64;
  const band = 72;
  const barH = 46;
  const n = data.groups.length;
  const bottom = top + band * n;
  const axisTitleY = bottom + 22 + fsTick + fsAxisTitle + 4;
  const H = axisTitleY + 10;
  const xL = (v: number) => x0L + (v / data.max) * plotL;
  const xR = (v: number) => x0R + (v / rp.max) * plotR;
  const ticks = (max: number, step: number) => {
    const t: number[] = [];
    for (let v = 0; v <= max + 1e-9; v += step) t.push(Number(v.toFixed(6)));
    return t;
  };
  const rule = data.titleRule ?? "#0000a0";
  const panel = (x0: number, plot: number, xf: (v: number) => number, max: number, step: number, values: number[], title: string | undefined, axisTitle: string | undefined, spanFrom: number, spanTo: number) => (
    <g>
      {title && (
        <text x={(spanFrom + spanTo) / 2} y={titleY} textAnchor="middle" fontSize={fsTitle} fontWeight={700} fill={ink.text}>
          {title}
        </text>
      )}
      <line x1={spanFrom} x2={spanTo} y1={ruleY} y2={ruleY} stroke={rule} strokeWidth={3} />
      <line x1={x0} x2={x0} y1={top} y2={bottom} stroke={frame} strokeWidth={1.2} />
      {Array.from({ length: n + 1 }, (_, i) => (
        <line key={i} x1={x0 - 7} x2={x0} y1={top + i * band} y2={top + i * band} stroke={frame} strokeWidth={1.2} />
      ))}
      <line x1={x0} x2={xf(max)} y1={bottom} y2={bottom} stroke={frame} strokeWidth={1.2} />
      {ticks(max, step).map((t) => (
        <g key={t}>
          <line x1={xf(t)} x2={xf(t)} y1={bottom} y2={bottom + 7} stroke={frame} strokeWidth={1.2} />
          <text x={xf(t)} y={bottom + 12 + fsTick} textAnchor="middle" fontSize={fsTick} fill={ink.text}>
            {t}
          </text>
        </g>
      ))}
      {values.map((v, i) => (
        <g key={i}>
          <rect x={x0} y={top + i * band + (band - barH) / 2} width={Math.max(0, xf(v) - x0)} height={barH} fill={color} stroke={frame} strokeWidth={0.8} />
          <text x={xf(v) + 8} y={top + i * band + band / 2} dominantBaseline="middle" fontSize={fsValue} fill={ink.text}>
            {v}
          </text>
        </g>
      ))}
      {axisTitle && (
        <text x={xf(max) + (data.axisTitleEnd ? valRoom - 12 : 0)} y={axisTitleY} textAnchor="end" fontSize={fsAxisTitle} fill={ink.text}>
          {axisTitle}
        </text>
      )}
    </g>
  );
  return (
    <div style={{ minWidth: 0, marginBottom: 14 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Horizontal bar charts"}>
        {data.groups.map((g, i) => (
          <text key={i} x={x0L - 12} y={top + i * band + band / 2} textAnchor="end" dominantBaseline="middle" fontSize={fsLabel} fill={ink.text}>
            {g.label}
          </text>
        ))}
        {panel(x0L, plotL, xL, data.max, data.axisStep ?? 2, data.groups.map((g) => g.values[0]), data.title, data.axisTitle, 0, spanL)}
        {panel(x0R, plotR, xR, rp.max, rp.axisStep ?? 1, rp.values, rp.title, rp.axisTitle, x0R - 8, W)}
      </svg>
    </div>
  );
}
