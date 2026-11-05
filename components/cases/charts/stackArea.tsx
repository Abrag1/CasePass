// Stacked area chart replicating a source slide: filled bands, a Y value axis, category labels and a legend at the right.
import type { StackAreaData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const LEFT = 85;
const RIGHT = 617;
const TOP = 30;
const BOTTOM = 390;
const VB_W = 880;
const VB_H = 440;

export function StackAreaChart({ data, dark }: { data: StackAreaData; dark?: boolean }) {
  const ink = chartInk(dark);
  const stroke = dark ? "#8a958d" : "#000000";
  const n = data.categories.length;
  const x = (i: number) => LEFT + ((RIGHT - LEFT) * i) / Math.max(1, n - 1);
  const y = (v: number) => BOTTOM - (v / data.yMax) * (BOTTOM - TOP);
  const cum: number[][] = [];
  data.series.forEach((s, si) => cum.push(s.values.map((v, i) => v + (si ? cum[si - 1][i] : 0))));
  const ticks: number[] = [];
  for (let v = 0; v <= data.yMax + 1e-9; v += data.yStep) ticks.push(v);
  const fs = 22;
  return (
    <ExhibitFrame dark={dark} title={data.title} titleStyle="centered-underlined">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", maxWidth: 760, display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Stacked area chart"} fontFamily="Arial, Helvetica, sans-serif">
        {data.series.map((s, si) => {
          const top = cum[si].map((v, i) => `${x(i)},${y(v)}`);
          const bottom = si ? cum[si - 1].map((v, i) => `${x(i)},${y(v)}`).reverse() : [`${x(n - 1)},${y(0)}`, `${x(0)},${y(0)}`];
          return <polygon key={si} points={[...top, ...bottom].join(" ")} fill={s.color} />;
        })}
        <line x1={LEFT} x2={LEFT} y1={TOP} y2={BOTTOM} stroke={stroke} strokeWidth={1.8} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={LEFT - 7} x2={LEFT} y1={y(t)} y2={y(t)} stroke={stroke} strokeWidth={1.8} />
            <text x={LEFT - 12} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={fs} fill={ink.text}>
              {t}
            </text>
          </g>
        ))}
        {data.categories.map((c, i) => (
          <text key={i} x={x(i)} y={BOTTOM + 30} textAnchor="middle" fontSize={fs} fill={ink.text}>
            {c}
          </text>
        ))}
        {data.series.map((s, i) => (
          <g key={i} transform={`translate(${RIGHT + 105} ${60 + i * 33})`}>
            <rect width={30} height={26} y={-13} fill={s.color} />
            <text x={39} dominantBaseline="middle" fontSize={fs} fill={ink.text}>
              {s.name}
            </text>
          </g>
        ))}
      </svg>
    </ExhibitFrame>
  );
}
