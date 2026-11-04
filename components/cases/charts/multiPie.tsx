// Several pies in one frame: a single row or a grid, with optional column labels (above),
// row labels (left), a shared label/box between the pies of a row, a legend and a footnote.
import type { MultiPieData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const SERIF = 'Cambria, "Times New Roman", Times, serif';
const SMALL = 8; // slices under this percentage get their label outside the pie

export function MultiPieChart({ data, dark }: { data: MultiPieData; dark?: boolean }) {
  const ink = chartInk(dark);
  const n = data.pies.length;
  if (!n) return null;
  const cols = Math.max(1, Math.min(data.columns ?? n, n));
  const rows = Math.ceil(n / cols);
  const centers = data.rowCenters;
  const r = data.radius ?? (rows > 1 || cols > 2 ? 66 : 84);
  const out = !!data.outsideLabels;
  const outFs = 14;
  const outLh = outFs * 1.15;
  // Outside-label mode: room left/right for the widest label (bold sans, ~0.62em per character) plus its leader line.
  const outW = Math.max(0, ...data.pies.flatMap((p) => p.slices.map((s) => Math.max(s.label.length, (s.text ?? "100%").length)))) * outFs * 0.62;
  const side = out ? Math.ceil(outW) + 26 : 34; // room for outside labels left/right of a pie
  const cellW = 2 * r + 2 * side;
  const gap = centers ? 150 : out ? 0 : 24;
  const rowLabelW = data.rowLabels ? 80 : 0;
  const width = rowLabelW + cols * cellW + (cols - 1) * gap;
  const colLabelH = data.colLabels?.length ? 30 : 0;
  const rowRange = (ri: number) => data.pies.slice(ri * cols, ri * cols + cols);
  const rowExtra = (ri: number) => {
    const ps = rowRange(ri);
    return (ps.some((p) => p.center) ? 20 : 0) + (ps.some((p) => p.note) ? 18 : 0) + (out ? 30 : 0);
  };
  // Long pie titles wrap onto several lines (never wider than the pie's own cell plus half of the gap).
  const titleFs = 15;
  const titleMaxW = cellW + Math.min(gap, 40);
  const perLine = Math.max(8, Math.floor(titleMaxW / (titleFs * 0.56)));
  const wrapTitle = (t: string) => {
    const out: string[] = [];
    for (const part of t.split("\n")) {
      let cur = "";
      for (const w of part.split(/\s+/).filter(Boolean)) {
        if (cur && (cur + " " + w).length > perLine) {
          out.push(cur);
          cur = w;
        } else cur = cur ? cur + " " + w : w;
      }
      if (cur) out.push(cur);
    }
    return out;
  };
  const titleLinesOf = data.pies.map((p) => (p.title ? wrapTitle(p.title) : []));
  const maxTitleLines = Math.max(0, ...titleLinesOf.map((l) => l.length));
  const titleH = maxTitleLines ? maxTitleLines * 19 + 9 : 0;
  const padTop = out ? 38 : 22; // room for an outside label above a pie
  const rowGap = 14;
  const rowTops: number[] = [];
  let y = colLabelH;
  for (let ri = 0; ri < rows; ri++) {
    rowTops.push(y);
    y += titleH + padTop + 2 * r + rowExtra(ri) + rowGap;
  }
  const height = y;

  // One slice label: the percentage, preceded by the slice name on its own line when `sliceNames` is set.
  const sliceText = (key: string, name: string, text: string, px: number, py: number, anchor: "start" | "middle" | "end", fs: number, fill: string) => {
    const lines = data.sliceNames ? [name, text] : [text];
    const lh = fs * 1.15;
    return (
      <text key={key} textAnchor={anchor} fontSize={fs} fontWeight={700} fill={fill} fontFamily={data.sliceNames ? SERIF : undefined}>
        {lines.map((ln, li) => (
          <tspan key={li} x={px} y={py + (li - (lines.length - 1) / 2) * lh + fs * 0.35}>
            {ln}
          </tspan>
        ))}
      </text>
    );
  };

  const drawPie = (pi: number, cx: number, cy: number) => {
    const pie = data.pies[pi];
    const total = pie.slices.reduce((s, x) => s + x.value, 0) || 1;
    const nonZero = pie.slices.filter((s) => s.value > 0).length;
    let acc = 0;
    const shapes: React.ReactNode[] = [];
    const labels: React.ReactNode[] = [];
    // Outside-label mode: collected here, then spread vertically per side so they never overlap.
    const outs: { i: number; sign: number; ex: number; ey: number; y: number; name: string; text: string }[] = [];
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
      if (out) {
        if (sl.value > 0) {
          const [ex, ey] = pt(r, mid);
          const sign = Math.cos(mid) >= 0 ? 1 : -1;
          outs.push({ i, sign, ex, ey, y: cy + (r + 12) * Math.sin(mid), name: sl.label, text });
        }
      } else if (pct >= SMALL) {
        const [px, py] = pt(r * 0.68, mid);
        labels.push(sliceText(`l${i}`, sl.label, text, px, py, "middle", fs, data.sliceLabelColor ?? "#fff"));
      } else {
        const [px, py] = pt(r + 12, mid);
        const c = Math.cos(mid);
        const anchor = Math.abs(c) < 0.3 ? "middle" : c > 0 ? "start" : "end";
        labels.push(sliceText(`l${i}`, sl.label, text, px, py, anchor, fs, ink.text));
      }
    });
    if (out) {
      const minGap = 2 * outLh + 3;
      const lo = cy - r - 8;
      const hi = cy + r + 8;
      for (const sign of [1, -1]) {
        const side_ = outs.filter((o) => o.sign === sign).sort((a, b) => a.y - b.y);
        for (let k = 1; k < side_.length; k++) side_[k].y = Math.max(side_[k].y, side_[k - 1].y + minGap);
        if (side_.length && side_[side_.length - 1].y > hi) {
          side_[side_.length - 1].y = hi;
          for (let k = side_.length - 2; k >= 0; k--) side_[k].y = Math.min(side_[k].y, side_[k + 1].y - minGap);
        }
        if (side_.length && side_[0].y < lo) {
          side_[0].y = lo;
          for (let k = 1; k < side_.length; k++) side_[k].y = Math.max(side_[k].y, side_[k - 1].y + minGap);
        }
        for (const o of side_) {
          const lx = cx + sign * (r + 14);
          const tx = lx + sign * 4;
          labels.push(
            <polyline key={`k${o.i}`} points={`${o.ex},${o.ey} ${lx},${o.y} ${tx},${o.y}`} fill="none" stroke={ink.axis} strokeWidth={0.8} />,
            <text key={`l${o.i}`} textAnchor={sign > 0 ? "start" : "end"} fontSize={outFs} fontWeight={700} fill={ink.text}>
              <tspan x={tx + sign * 3} y={o.y - outLh / 2 + outFs * 0.35}>
                {o.name}
              </tspan>
              <tspan x={tx + sign * 3} y={o.y + outLh / 2 + outFs * 0.35}>
                {o.text}
              </tspan>
            </text>,
          );
        }
      }
    }
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
              {!data.noRowDivider && ri > 0 && <line x1={0} x2={width} y1={top - rowGap / 2} y2={top - rowGap / 2} stroke={ink.grid} strokeDasharray="3 3" />}
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
                    {titleLinesOf[ri * cols + ci].length > 0 && (
                      <text textAnchor="middle" fontSize={titleFs} fontWeight={700} fill={ink.text} fontFamily={data.sliceNames ? SERIF : undefined}>
                        {titleLinesOf[ri * cols + ci].map((ln, li) => (
                          <tspan key={li} x={cx} y={top + 14 + li * 19}>
                            {ln}
                          </tspan>
                        ))}
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
