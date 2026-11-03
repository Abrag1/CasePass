// Stacked columns with labelled segments: one or more panels side by side, each with its own Y axis,
// total labels, in-segment labels (wrapped, font shrinks to fit), optional dashed connectors between
// neighbouring columns, a legend (top right or bottom) and a footnote. Everything is drawn in one
// responsive SVG so the labels scale with the chart.
import type { StackColsData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const CHAR_W = 0.58; // average glyph width as a share of the font size

function textOn(hex: string) {
  const c = /^#[0-9a-f]{6}$/i.test(hex) ? parseInt(hex.slice(1), 16) : 0xffffff;
  const lum = (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255;
  return lum < 0.5 ? "#ffffff" : "#111111";
}

function wrap(text: string, perLine: number) {
  const lines: string[] = [];
  let cur = "";
  for (const w of text.split(/\s+/).filter(Boolean)) {
    if (cur && (cur + " " + w).length > perLine) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) lines.push(cur);
  return lines;
}

// Largest font (max..min) at which the wrapped text fits the box.
function fit(text: string, w: number, h: number, max: number, min: number) {
  for (let fs = max; fs >= min; fs -= 0.5) {
    const per = Math.max(1, Math.floor(w / (fs * CHAR_W)));
    const lines = wrap(text, per);
    const longest = Math.max(...lines.map((l) => l.length), 1);
    if (longest * fs * CHAR_W <= w && lines.length * fs * 1.15 <= h) return { lines, fs };
  }
  const per = Math.max(1, Math.floor(w / (min * CHAR_W)));
  return { lines: wrap(text, per), fs: min };
}

export function StackColsChart({ data, dark }: { data: StackColsData; dark?: boolean }) {
  const ink = chartInk(dark);
  if (!data.panels.length) return null;
  const barW = data.barWidth ?? 170;
  const slot = barW + 44;
  const leftM = 84;
  const gap = 36;
  const plotH = 330;
  const border = data.segBorder === false ? undefined : (data.segBorder ?? (dark ? "#0d100e" : "#111111"));
  const connColor = data.connectorColor ?? ink.text;

  // Horizontal layout of the panels.
  const pw = data.panels.map((p) => leftM + p.columns.length * slot + 20);
  const px: number[] = [];
  let acc = 0;
  pw.forEach((w, i) => {
    px.push(acc);
    acc += w + (i < pw.length - 1 ? gap : 0);
  });
  const panelsW = acc;

  // Header band: chart title (left) and the legend (top right).
  const titleLines = data.title ? data.title.split("\n") : [];
  const titleFs = 21;
  const titleH = titleLines.length ? titleLines.length * 27 + 6 : 0;
  const titleW = Math.max(0, ...titleLines.map((l) => l.length * titleFs * 0.5)) + leftM;
  const legendTop = !!data.legend?.length && (data.legendPlacement ?? "topRight") === "topRight";
  const legendBottom = !!data.legend?.length && !legendTop;
  const legFs = 15;
  const legRows = (data.legend ?? []).map((l) => l.name.split("\n"));
  const legTopH = legendTop ? legRows.reduce((s, r) => s + r.length * 19 + 8, 0) : 0;
  const legTopW = legendTop ? Math.max(...legRows.flat().map((l) => l.length * legFs * 0.52)) + 28 : 0;
  const W = Math.max(panelsW, legendTop ? titleW + legTopW + 24 : 0);

  const hasTitles = data.panels.some((p) => p.title);
  const pTitleH = hasTitles ? 46 : 0;
  const pSubH = Math.max(0, ...data.panels.map((p) => (p.subtitle ? p.subtitle.split("\n").length * 25 + 6 : 0)));
  const headerH = Math.max(titleH, legTopH);
  const top = headerH + pTitleH + pSubH + 34; // 34: room for the total labels above the tallest column
  const base = top + plotH;

  // X labels (wrapped to the slot width, shared height).
  const xfit = data.panels.map((p) => p.columns.map((c) => fit(c.label, slot - 8, 200, 18, 11)));
  const xLines = Math.max(1, ...xfit.flat().map((f) => f.lines.length));
  const xH = xLines * 24 + 14;
  let H = base + xH;
  const legBottomRows = legendBottom ? (data.legend ?? []) : [];
  const legBottomY = H + 6;
  if (legendBottom) H += 34;
  H += 8;

  return (
    <ExhibitFrame dark={dark}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: Math.max(760, W * 1.1), display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Stacked columns"}>
        {titleLines.map((l, i) => (
          <text key={i} x={leftM - 8} y={24 + i * 27} fontSize={titleFs} fill={ink.text}>
            {l}
          </text>
        ))}
        {legendTop &&
          (() => {
            let yy = 4;
            return (data.legend ?? []).map((l, i) => {
              const rows = legRows[i];
              const y0 = yy;
              yy += rows.length * 19 + 8;
              return (
                <g key={i}>
                  <rect x={W - legTopW} y={y0 + 2} width={15} height={15} fill={l.color} stroke={border ?? ink.axis} strokeWidth={1} />
                  {rows.map((r, k) => (
                    <text key={k} x={W - legTopW + 22} y={y0 + 14 + k * 19} fontSize={legFs} fill={ink.text}>
                      {r}
                    </text>
                  ))}
                </g>
              );
            });
          })()}

        {data.panels.map((p, pi) => {
          const x0 = px[pi];
          const axisX = x0 + leftM;
          const step = p.yStep ?? p.yMax / 5;
          const y = (v: number) => base - (v / p.yMax) * plotH;
          const ticks: number[] = [];
          for (let t = 0; t <= p.yMax + 1e-9; t += step) ticks.push(t);
          const colX = (ci: number) => axisX + 22 + ci * slot;
          const sub = p.subtitle ? p.subtitle.split("\n") : [];
          return (
            <g key={pi}>
              {p.title && (
                <text x={x0 + leftM + (pw[pi] - leftM - 20) / 2} y={headerH + 34} textAnchor="middle" fontSize={34} fill={ink.text} textDecoration="underline">
                  {p.title}
                </text>
              )}
              {sub.map((l, i) => (
                <text key={i} x={x0 + leftM - 4} y={headerH + pTitleH + 22 + i * 25} fontSize={20} fill={ink.text}>
                  {l}
                </text>
              ))}
              {/* axes */}
              <line x1={axisX} x2={axisX} y1={y(p.yMax)} y2={base} stroke={ink.text} strokeWidth={1.6} />
              <line x1={axisX} x2={x0 + pw[pi] - 20} y1={base} y2={base} stroke={ink.text} strokeWidth={1.6} />
              {ticks.map((t, ti) => {
                const isTop = ti === ticks.length - 1;
                const txt = isTop && p.topLabel ? p.topLabel : (p.yTickLabels?.[ti] ?? `${p.yTickPrefix ?? ""}${t}${p.yTickSuffix ?? ""}`);
                return (
                  <g key={ti}>
                    <line x1={axisX - 6} x2={axisX} y1={y(t)} y2={y(t)} stroke={ink.text} strokeWidth={1.6} />
                    <text x={axisX - 10} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={17} fill={ink.text}>
                      {txt}
                    </text>
                  </g>
                );
              })}
              {/* connectors (under the columns) */}
              {p.connectors?.map((c, i) => (
                <line
                  key={`c${i}`}
                  x1={colX(c.from.col) + barW}
                  y1={y(c.from.at)}
                  x2={colX(c.to.col)}
                  y2={y(c.to.at)}
                  stroke={connColor}
                  strokeWidth={2}
                  strokeDasharray="6 5"
                />
              ))}
              {/* columns */}
              {p.columns.map((col, ci) => {
                const cx0 = colX(ci);
                let cum = 0;
                const total = col.segs.reduce((s, g) => s + g.value, 0);
                return (
                  <g key={ci}>
                    {col.segs.map((sg, si) => {
                      const y1 = y(cum + sg.value);
                      const y2 = y(cum);
                      cum += sg.value;
                      const h = y2 - y1;
                      const f = sg.label ? fit(sg.label, barW - 10, h - 3, 19, 8) : null;
                      const tc = sg.textColor ?? textOn(sg.color);
                      const lh = f ? f.fs * 1.15 : 0;
                      return (
                        <g key={si}>
                          <rect x={cx0} y={y1} width={barW} height={h} fill={sg.color} stroke={border} strokeWidth={border ? 1.6 : 0} />
                          {f && (
                            <text textAnchor="middle" fontSize={f.fs} fill={tc}>
                              {f.lines.map((ln, li) => (
                                <tspan key={li} x={cx0 + barW / 2} y={(y1 + y2) / 2 - ((f.lines.length - 1) * lh) / 2 + li * lh + f.fs * 0.35}>
                                  {ln}
                                </tspan>
                              ))}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    {col.total && (
                      <text x={cx0 + barW / 2} y={y(total) - 9} textAnchor="middle" fontSize={20} fill={ink.text}>
                        {col.total}
                      </text>
                    )}
                    <text textAnchor="middle" fontSize={xfit[pi][ci].fs} fill={ink.text}>
                      {xfit[pi][ci].lines.map((ln, li) => (
                        <tspan key={li} x={cx0 + barW / 2} y={base + 24 + li * (xfit[pi][ci].fs * 1.3)}>
                          {ln}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {legendBottom &&
          (() => {
            const widths = legBottomRows.map((l) => l.name.length * legFs * 0.55 + 36);
            const total = widths.reduce((s, w) => s + w, 0);
            let xx = (W - total) / 2;
            return legBottomRows.map((l, i) => {
              const x = xx;
              xx += widths[i];
              return (
                <g key={i}>
                  <rect x={x} y={legBottomY + 4} width={15} height={15} fill={l.color} stroke={border ?? ink.axis} strokeWidth={1} />
                  <text x={x + 22} y={legBottomY + 17} fontSize={legFs} fill={ink.text}>
                    {l.name}
                  </text>
                </g>
              );
            });
          })()}
      </svg>
      {data.footnote && <div style={{ fontSize: 12, color: ink.axis, marginTop: 12 }}>{data.footnote}</div>}
    </ExhibitFrame>
  );
}
