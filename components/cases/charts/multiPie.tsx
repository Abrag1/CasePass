// Several pies in one frame: a single row or a grid, with optional column labels (above),
// row labels (left), a shared label/box between the pies of a row, a legend and a footnote.
import type { MultiPieData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const SMALL = 8; // slices under this percentage get their label outside the pie

export function MultiPieChart({ data, dark }: { data: MultiPieData; dark?: boolean }) {
  const ink = chartInk(dark);
  const n = data.pies.length;
  if (!n) return null;
  const cols = Math.max(1, Math.min(data.columns ?? n, n));
  const rows = Math.ceil(n / cols);
  const centers = data.rowCenters;
  const r = data.radius ?? (rows > 1 || cols > 2 ? 66 : 84);
  const side = 34; // room for outside labels left/right of a pie
  const cellW = 2 * r + 2 * side;
  const gap = centers ? 150 : 24;
  const rowLabelW = data.rowLabels ? 80 : 0;
  const width = rowLabelW + cols * cellW + (cols - 1) * gap;
  const colLabelH = data.colLabels?.length ? 30 : 0;
  const rowRange = (ri: number) => data.pies.slice(ri * cols, ri * cols + cols);
  const rowExtra = (ri: number) => {
    const ps = rowRange(ri);
    return (ps.some((p) => p.center) ? 20 : 0) + (ps.some((p) => p.note) ? 18 : 0);
  };
  const titleH = data.pies.some((p) => p.title) ? 28 : 0;
  const padTop = 22; // room for an outside label above a pie
  const rowGap = 14;
  const rowTops: number[] = [];
  let y = colLabelH;
  for (let ri = 0; ri < rows; ri++) {
    rowTops.push(y);
    y += titleH + padTop + 2 * r + rowExtra(ri) + rowGap;
  }
  const height = y;

  const drawPie = (pi: number, cx: number, cy: number) => {
    const pie = data.pies[pi];
    const total = pie.slices.reduce((s, x) => s + x.value, 0) || 1;
    const nonZero = pie.slices.filter((s) => s.value > 0).length;
    let acc = 0;
    const shapes: React.ReactNode[] = [];
    const labels: React.ReactNode[] = [];
    pie.slices.forEach((sl, i) => {
      const a0 = -Math.PI / 2 + (acc / total) * Math.PI * 2;
      acc += sl.value;
      const sweep = (sl.value / total) * Math.PI * 2;
      const mid = a0 + sweep / 2;
      const pct = (sl.value / total) * 100;
      const pt = (rad: number, a: number) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
      if (sl.value > 0) {
        const [x0, y0] = pt(r, a0);
        const [x1, y1] = pt(r, a0 + sweep);
        const d =
          nonZero === 1
            ? `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`
            : `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`;
        shapes.push(<path key={`s${i}`} d={d} fill={sl.color} stroke={ink.sliceStroke} strokeWidth={1.5} />);
      }
      const text = sl.text ?? `${Math.round(pct)}%`;
      const fs = r >= 80 ? 16 : 12;
      if (pct >= SMALL) {
        const [px, py] = pt(r * 0.68, mid);
        labels.push(
          <text key={`l${i}`} x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize={fs} fontWeight={700} fill="#fff">
            {text}
          </text>
        );
      } else {
        const [px, py] = pt(r + 12, mid);
        const c = Math.cos(mid);
        const anchor = Math.abs(c) < 0.3 ? "middle" : c > 0 ? "start" : "end";
        labels.push(
          <text key={`l${i}`} x={px} y={py} textAnchor={anchor} dominantBaseline="middle" fontSize={fs} fontWeight={700} fill={ink.text}>
            {text}
          </text>
        );
      }
    });
    return [...shapes, ...labels];
  };

  return (
    <ExhibitFrame dark={dark} title={data.title}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: Math.max(width, 420) * 1.2, display: "block", margin: "0 auto" }} role="img">
        {data.colLabels?.map((c, ci) => (
          <text key={`c${ci}`} x={rowLabelW + ci * (cellW + gap) + cellW / 2} y={18} textAnchor="middle" fontSize={16} fontWeight={700} fill={ink.text} textDecoration="underline">
            {c}
          </text>
        ))}
        {Array.from({ length: rows }, (_, ri) => {
          const top = rowTops[ri];
          const cy = top + titleH + padTop + r;
          const lines = centers?.[ri]?.split("\n");
          const midX = rowLabelW + cellW + gap / 2;
          const rowH = titleH + padTop + 2 * r + rowExtra(ri);
          return (
            <g key={`r${ri}`}>
              {ri > 0 && <line x1={0} x2={width} y1={top - rowGap / 2} y2={top - rowGap / 2} stroke={ink.grid} strokeDasharray="3 3" />}
              {data.rowLabels?.[ri] && (
                <text x={0} y={top + rowH / 2} dominantBaseline="middle" fontSize={15} fontWeight={700} fill={ink.text}>
                  {data.rowLabels[ri]}
                </text>
              )}
              {lines && (
                <g>
                  {data.centerBox && (
                    <rect x={midX - 66} y={cy - (lines.length * 18) / 2 - 8} width={132} height={lines.length * 18 + 16} rx={3} fill="none" stroke={ink.axis} />
                  )}
                  {lines.map((ln, li) => (
                    <text
                      key={li}
                      x={midX}
                      y={cy - ((lines.length - 1) * 18) / 2 + li * 18}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={li === 0 && !data.centerBox ? 17 : 14}
                      fontWeight={li === 0 || data.centerBox ? 700 : 600}
                      fill={ink.text}
                    >
                      {ln}
                    </text>
                  ))}
                </g>
              )}
              {rowRange(ri).map((p, ci) => {
                const cx = rowLabelW + ci * (cellW + gap) + cellW / 2;
                return (
                  <g key={ci}>
                    {p.title && (
                      <text x={cx} y={top + 14} textAnchor="middle" fontSize={15} fontWeight={700} fill={ink.text}>
                        {p.title}
                      </text>
                    )}
                    {drawPie(ri * cols + ci, cx, cy)}
                    {p.center && (
                      <text x={cx} y={cy + r + 18} textAnchor="middle" fontSize={13} fontWeight={600} fill={ink.text}>
                        {p.center}
                      </text>
                    )}
                    {p.note && (
                      <text x={cx} y={cy + r + (p.center ? 36 : 18)} textAnchor="middle" fontSize={12} fill={ink.axis}>
                        {p.note}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {data.legend && data.legend.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 18px", marginTop: 10 }}>
          {data.legend.map((l, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: ink.text }}>
              <span style={{ width: 12, height: 12, background: l.color, display: "inline-block", borderRadius: 2 }} />
              {l.name}
            </span>
          ))}
        </div>
      )}
      {data.footnote && <div style={{ fontSize: 11, color: ink.axis, marginTop: 10 }}>{data.footnote}</div>}
    </ExhibitFrame>
  );
}
