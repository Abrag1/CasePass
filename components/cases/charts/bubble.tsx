// Bubble chart replicating a source slide: circles sized by area, unlabelled X ticks, a Y value axis,
// outside labels with thin leader lines and an optional boxed legend. Positions are canvas units.
import type { BubbleData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const W = 1160;
const H = 660;
const OY = 130; // canvas y of the top of the viewBox
const LEFT = 128;
const RIGHT = 1093;
const TOP = 209;
const BOTTOM = 720;

export function BubbleChart({ data, dark }: { data: BubbleData; dark?: boolean }) {
  const ink = chartInk(dark);
  const stroke = dark ? "#8a958d" : "#000000";
  const y = (v: number) => BOTTOM - ((v - data.yMin) / (data.yMax - data.yMin)) * (BOTTOM - TOP);
  const FIRST = LEFT + 54; // first tick sits a little right of the Y axis; the last tick is at the right end
  const xStepPx = (RIGHT - FIRST) / Math.max(1, data.xTicks - 1);
  const x = (i: number) => FIRST + xStepPx * i;
  const yTicks: number[] = [];
  for (let v = data.yMin; v <= data.yMax + 1e-9; v += data.yStep) yTicks.push(v);
  const fs = 26;
  return (
    <ExhibitFrame dark={dark}>
      <svg viewBox={`0 ${OY} ${W} ${H}`} style={{ width: "100%", maxWidth: 880, display: "block", margin: "0 auto" }} role="img" aria-label="Bubble chart" fontFamily="Arial, Helvetica, sans-serif">
        {data.yTitle && (
          <text x={60} y={TOP - 40} fontSize={fs} fill={ink.text}>
            {data.yTitle}
          </text>
        )}
        <line x1={LEFT} x2={LEFT} y1={TOP} y2={BOTTOM} stroke={stroke} strokeWidth={1.5} />
        <line x1={LEFT} x2={RIGHT} y1={BOTTOM} y2={BOTTOM} stroke={stroke} strokeWidth={1.5} />
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={LEFT - 8} x2={LEFT} y1={y(t)} y2={y(t)} stroke={stroke} strokeWidth={1.5} />
            <text x={LEFT - 14} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={fs} fill={ink.text}>
              {t}
              {data.yTickSuffix ?? ""}
            </text>
          </g>
        ))}
        {Array.from({ length: data.xTicks }, (_, i) => (
          <line key={i} x1={x(i)} x2={x(i)} y1={BOTTOM} y2={BOTTOM + 8} stroke={stroke} strokeWidth={1.5} />
        ))}
        {data.xTitle && (
          <text x={RIGHT} y={BOTTOM + 60} textAnchor="end" fontSize={28} fill={ink.text}>
            {data.xTitle}
          </text>
        )}
        {data.bubbles.map((b, i) => {
          const r = data.radiusPerRootSize * Math.sqrt(b.size);
          return (
            <g key={i}>
              {b.leader && <polyline points={b.leader.map((p) => p.join(",")).join(" ")} fill="none" stroke={dark ? "#8a958d" : "#777777"} strokeWidth={1.2} />}
              <circle cx={x(b.x)} cy={y(b.y)} r={r} fill={dark ? "#3a423d" : "#e0e0e0"} stroke={dark ? "#8a958d" : "#555555"} strokeWidth={2.5} />
              {b.valueAt ? (
                <text x={b.valueAt[0]} y={b.valueAt[1]} fontSize={fs} fill={ink.text}>
                  {b.value}
                </text>
              ) : (
                <text x={x(b.x)} y={y(b.y)} textAnchor="middle" dominantBaseline="middle" fontSize={fs} fill={ink.text}>
                  {b.value}
                </text>
              )}
              <text x={b.nameAt[0]} y={b.nameAt[1]} fontSize={fs} fill={ink.text}>
                {b.name}
              </text>
            </g>
          );
        })}
        {data.legend && (
          <g>
            <rect x={data.legend.box[0]} y={data.legend.box[1]} width={data.legend.box[2]} height={data.legend.box[3]} fill="none" stroke={dark ? "#8a958d" : "#666666"} strokeWidth={2.5} />
            <circle cx={data.legend.box[0] + 28} cy={data.legend.box[1] + data.legend.box[3] / 2} r={14} fill={dark ? "#3a423d" : "#e0e0e0"} stroke={dark ? "#8a958d" : "#555555"} strokeWidth={2.5} />
            <text x={data.legend.box[0] + 54} y={data.legend.box[1] + data.legend.box[3] / 2} dominantBaseline="middle" fontSize={fs} fill={ink.text}>
              {data.legend.text}
            </text>
          </g>
        )}
      </svg>
    </ExhibitFrame>
  );
}
