// Marimekko: variable-width 100% stacked columns. Column width is proportional to `width`,
// each column is stacked to 100% by series (the first series on top, as in the legend),
// with optional value labels inside the slices, a row of per-column notes under the axis,
// an x-axis title, an HTML legend and a footnote.
import type { MarimekkoData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const CHAR_W = 0.56; // average glyph width as a share of the font size

// Fit text into a column: shrink the font (down to `min`) until the longest word fits, then wrap on spaces.
function fitText(text: string, maxW: number, fs: number, min: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const longest = Math.max(1, ...words.map((w) => w.length));
  let size = fs;
  while (size > min && longest * size * CHAR_W > maxW) size -= 0.5;
  const perLine = Math.max(1, Math.floor(maxW / (size * CHAR_W)));
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > perLine) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) lines.push(cur);
  return { lines, size };
}

function textOn(hex: string) {
  const c = /^#[0-9a-f]{6}$/i.test(hex) ? parseInt(hex.slice(1), 16) : 0xffffff;
  const lum = (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255;
  return lum < 0.55 ? "#ffffff" : "#222222";
}

function MarimekkoPlot({ data, dark }: { data: MarimekkoData; dark?: boolean }) {
  const ink = chartInk(dark);
  const cols = data.columns;
  const totalW = cols.reduce((s, c) => s + Math.max(0, c.width), 0);
  if (!cols.length || totalW <= 0) return null;

  const left = data.leftPad ?? 78;
  const plotW = 520;
  const plotH = 300;
  const right = left + plotW;
  const yStep = data.yStep ?? 10;
  const suffix = data.yTickSuffix ?? (data.yLabel ? "" : "%");
  const showValues = data.valueLabels !== false;
  const frame = dark ? "#8a958d" : "#3a3f3b";

  // Column geometry (width proportional to `width`).
  const geo = cols.map((c, i) => {
    const before = cols.slice(0, i).reduce((s, k) => s + Math.max(0, k.width), 0);
    const x0 = left + (before / totalW) * plotW;
    const x1 = left + ((before + Math.max(0, c.width)) / totalW) * plotW;
    return { x0, x1, w: x1 - x0, cx: (x0 + x1) / 2 };
  });

  const labelFit = cols.map((c, i) => (data.plainSlices ? { lines: [c.label], size: 13 } : fitText(c.label, geo[i].w - 10, 15, 10)));
  const labelH = Math.max(...labelFit.map((f) => f.lines.length * (f.size + 3))) + 6;
  const subFit = cols.map((c, i) => (c.sub ? fitText(c.sub, geo[i].w - 10, 15, 10) : null));
  const hasSub = subFit.some(Boolean) && !data.topSub;
  const subH = hasSub ? Math.max(...subFit.map((f) => (f ? f.lines.length * (f.size + 3) : 0))) + 10 : 0;
  const above = !!data.labelsAbove;

  const topSub = !!data.topSub;
  const ptitle = data.panelTitle ? 24 : 0;
  const top = (above ? labelH + 8 : topSub ? 28 : 12) + ptitle;
  const bottom = top + plotH;
  const y = (pct: number) => bottom - (pct / 100) * plotH;
  let below = 8; // running offset under the axis
  const labelsBelowY = bottom + below;
  if (!above) below += labelH;
  const subY = bottom + below;
  below += subH;
  const xTitleY = bottom + below + 18;
  const height = xTitleY + (data.xTitle ? 10 : -6);

  const ticks: number[] = [];
  if (!data.rowLabels) for (let t = 0; t <= 100.0001; t += yStep) ticks.push(t);

  const nSeries = data.series.length;
  const boxes = !!data.labelBoxes;

  return (
    <svg
      viewBox={`0 0 ${right + 14} ${height}`}
      style={{ flex: data.panelTitle ? "1 1 260px" : "1 1 420px", minWidth: 0, maxWidth: 720, display: "block" }}
      role="img"
      aria-label={data.title ?? "Marimekko chart"}
    >
      {data.panelTitle && (
        <text x={left + plotW / 2} y={16} textAnchor="middle" fontSize={15} fontWeight={700} fill={ink.text}>
          {data.panelTitle}
        </text>
      )}
      {/* Y axis */}
      {ticks.map((t) => (
        <g key={t}>
          {!data.noGrid && t > 0 && t < 100 && <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />}
          <line x1={left - 4} x2={left} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1} />
          <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={13} fill={ink.axis}>
            {t}
            {suffix}
          </text>
        </g>
      ))}
      {data.yLabel && (
        <text transform={`translate(16 ${top + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={14} fontWeight={700} fill={ink.text}>
          {data.yLabel}
        </text>
      )}

      {data.rowLabels &&
        (() => {
          const c0 = cols[0];
          const sum0 = c0.slices.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
          let cum0 = 0;
          return data.rowLabels.map((rl, si) => {
            const pct = (Math.max(0, c0.slices[si]?.value ?? 0) / sum0) * 100;
            const mid = y(100 - cum0 - pct / 2);
            cum0 += pct;
            return (
              <text key={`r${si}`} x={left - 8} y={mid} textAnchor="end" dominantBaseline="middle" fontSize={13} fill={ink.axis}>
                {rl}
              </text>
            );
          });
        })()}

      {/* Columns */}
      {cols.map((c, ci) => {
        const g = geo[ci];
        const sum = c.slices.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
        let cum = 0;
        return (
          <g key={ci}>
            {c.slices.slice(0, nSeries).map((sl, si) => {
              const v = Math.max(0, sl.value);
              if (v <= 0) return null;
              const pct = (v / sum) * 100;
              const y1 = y(100 - cum);
              cum += pct;
              const y2 = y(100 - cum);
              const h = y2 - y1;
              const color = data.series[si]?.color ?? "#cccccc";
              const fs = data.plainSlices ? 13 : Math.min(14, h - 4, Math.max(9, g.w / 5));
              const txt = `${Math.round(pct * 10) / 10}%`;
              const fits = fs >= 9 && txt.length * fs * CHAR_W <= g.w - 4;
              return (
                <g key={si}>
                  <rect x={g.x0} y={y1} width={g.w} height={h} fill={color} stroke={data.plainSlices ? "#ffffff" : frame} strokeWidth={0.8} />
                  {showValues && fits && boxes && h < 18 && (
                    <rect x={g.cx - (txt.length * fs * CHAR_W) / 2 - 3} y={(y1 + y2) / 2 - fs / 2 - 1} width={txt.length * fs * CHAR_W + 6} height={fs + 2} fill="#ffffff" />
                  )}
                  {showValues && fits && (
                    <text x={g.cx} y={(y1 + y2) / 2} textAnchor="middle" dominantBaseline="middle" fontSize={fs} fontWeight={data.plainSlices ? 400 : 700} fill={boxes && h < 18 ? "#222222" : textOn(color)}>
                      {txt}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
      <line x1={left} x2={left} y1={top} y2={bottom} stroke={frame} strokeWidth={1.2} />
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={frame} strokeWidth={1.2} />

      {/* Column labels (above or under) */}
      {cols.map((c, ci) => {
        const f = labelFit[ci];
        const baseY = above ? top - 8 - (f.lines.length - 1) * (f.size + 3) : labelsBelowY + f.size + 2;
        return (
          <text key={`l${ci}`} textAnchor="middle" fontSize={f.size} fontWeight={data.plainSlices ? 400 : 600} fill={ink.text}>
            {f.lines.map((ln, li) => (
              <tspan key={li} x={geo[ci].cx} y={baseY + li * (f.size + 3)}>
                {ln}
              </tspan>
            ))}
          </text>
        );
      })}

      {topSub &&
        cols.map((c, ci) =>
          c.sub ? (
            <text key={`t${ci}`} x={geo[ci].cx} y={top - 9} textAnchor="middle" fontSize={13} fill={ink.text}>
              {c.sub}
            </text>
          ) : null,
        )}

      {/* Row of per-column notes (e.g. CAGR) */}
      {hasSub && (
        <g>
          {data.subLabel && (
            <text x={left - 8} y={subY + 17} textAnchor="end" fontSize={14} fontWeight={700} fill={ink.text}>
              {data.subLabel}
            </text>
          )}
          {cols.map((c, ci) => {
            const f = subFit[ci];
            if (!f) return null;
            return (
              <text key={`s${ci}`} textAnchor="middle" fontSize={f.size} fill={ink.text}>
                {f.lines.map((ln, li) => (
                  <tspan key={li} x={geo[ci].cx} y={subY + 17 + li * (f.size + 3)}>
                    {ln}
                  </tspan>
                ))}
              </text>
            );
          })}
        </g>
      )}

      {data.xTitle && (
        <text x={left + plotW / 2} y={xTitleY} textAnchor="middle" fontSize={15} fontWeight={700} fill={ink.text}>
          {data.xTitle}
        </text>
      )}
    </svg>
  );
}

export function MarimekkoChart({ data, dark }: { data: MarimekkoData; dark?: boolean }) {
  const ink = chartInk(dark);
  const frame = dark ? "#8a958d" : "#3a3f3b";
  const frameTitle = data.titleCentered ? "centered-bold" : undefined;
  if (data.panels?.length) {
    return (
      <ExhibitFrame dark={dark} title={data.title} titleStyle={frameTitle}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center", gap: "14px 22px" }}>
          {data.panels.map((p, i) => (
            <MarimekkoPlot key={i} data={{ ...data, ...p, panels: undefined }} dark={dark} />
          ))}
        </div>
        {data.footnote && <div style={{ fontSize: 12, color: ink.axis, marginTop: 12 }}>{data.footnote}</div>}
      </ExhibitFrame>
    );
  }
  return (
    <ExhibitFrame dark={dark} title={data.title} titleStyle={frameTitle}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px 22px" }}>
        <MarimekkoPlot data={data} dark={dark} />
        {data.series.length > 0 && !data.noLegend && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: "0 0 auto", maxWidth: 200 }}>
            {data.series.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: ink.text, lineHeight: 1.3 }}>
                <span style={{ width: 14, height: 14, flex: "0 0 14px", marginTop: 1, background: s.color, border: `1px solid ${frame}`, display: "inline-block" }} />
                <span>
                  {s.name}
                  {data.seriesNotes?.[i] && <span style={{ display: "block" }}>{data.seriesNotes[i]}</span>}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {data.footnote && <div style={{ fontSize: 12, color: ink.axis, marginTop: 12 }}>{data.footnote}</div>}
    </ExhibitFrame>
  );
}
