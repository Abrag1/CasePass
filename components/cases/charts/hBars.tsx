// Horizontal bars, single or grouped. Category labels sit at the left (wrapped when long), bars grow to
// the right in source order, value labels sit at the bar ends, with an optional value axis (ticks, grid,
// title), tick marks between the categories, an HTML legend and a footnote.
import type { HBarsData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";
import { HBarsTwoPanel } from "./hBarsPanels";

const CHAR_W = 0.56; // average glyph width as a share of the font size

function wrapLabel(text: string, maxChars: number): string[] {
  const out: string[] = [];
  for (const part of text.split("\n")) {
    let cur = "";
    for (const w of part.split(/\s+/).filter(Boolean)) {
      if (cur && (cur + " " + w).length > maxChars) {
        out.push(cur);
        cur = w;
      } else cur = cur ? cur + " " + w : w;
    }
    out.push(cur);
  }
  return out;
}

function isLight(hex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return false;
  const c = parseInt(hex.slice(1), 16);
  return (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255 > 0.62;
}

function isVeryDark(hex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return false;
  const c = parseInt(hex.slice(1), 16);
  return (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255 < 0.25;
}

// Frameless wrapper (optional `noFrame`): same title styles, no card; optional rule under the title.
function NoFrame({ dark, title, rule, children }: { dark?: boolean; title?: string; titleStyle?: unknown; rule?: string; children: React.ReactNode }) {
  return (
    <div style={{ minWidth: 0 }}>
      {title && <div style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: dark ? "#dbe3dd" : "#111111", paddingBottom: 8, marginBottom: 16, borderBottom: rule ? `2px solid ${rule}` : undefined }}>{title}</div>}
      {children}
    </div>
  );
}

export function HBarsChart({ data, dark }: { data: HBarsData; dark?: boolean }) {
  if (data.rightPanel) return <HBarsTwoPanel data={data} dark={dark} />;
  const ink = chartInk(dark);
  const groups = data.groups;
  if (!groups.length || !(data.max > 0)) return null;
  const nSeries = Math.max(1, data.series?.length ?? 1, ...groups.map((g) => g.values.length));
  const swatches = data.series ?? [];
  const suffix = data.valueSuffix ?? "";
  const decimals = data.valueDecimals;
  const frame = dark ? "#8a958d" : "#3a3f3b";
  const tickFmt = (t: number) => (t === 0 && data.zeroLabel ? data.zeroLabel : (data.tickPrefix ?? "") + (data.tickPrefix ? t.toLocaleString("en-US", decimals !== undefined ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals } : undefined) : decimals !== undefined ? t.toFixed(decimals) : String(Number(t.toFixed(2)))) + suffix);
  const fmt = (v: number) => (decimals !== undefined ? v.toFixed(decimals) : String(Number(v.toFixed(2)))) + suffix;

  const fsLabel = data.labelFontSize ?? 14;
  const fsValue = data.valueFontSize ?? 13;
  const maxChars = data.singleLineLabels ? 1000 : 22;
  const labelLines = groups.map((g) => wrapLabel(g.label, maxChars));
  const longestLine = Math.max(1, ...labelLines.flat().map((l) => l.length));
  const labelW = Math.max(90, Math.min(data.singleLineLabels ? 600 : 220, Math.ceil(longestLine * fsLabel * (data.singleLineLabels ? 0.5 : CHAR_W)) + 24));
  const plotW = data.plotWidth ?? 330;
  const texts = groups.map((g) => g.values.map((v, i) => g.valueTexts?.[i] ?? fmt(v)));
  const longestVal = Math.max(...texts.flat().map((t) => t.length), 1);
  const valueRoom = data.stacked ? 14 : Math.ceil(longestVal * fsValue * CHAR_W) + 14;
  const W = labelW + plotW + valueRoom;

  const barH = data.stacked ? (data.stackBarHeight ?? 34) : nSeries > 1 ? 22 : 30;
  const barGap = 3;
  const clusterH = data.stacked ? barH : nSeries * barH + (nSeries - 1) * barGap;
  const pad = data.stacked ? (data.stackBandHeight ?? 84) - barH : 22;
  const lineH = fsLabel + 4;
  const bands = groups.map((_, gi) => Math.max(clusterH + pad, labelLines[gi].length * lineH + 14));
  const top = 8;
  const bottomOfBars = top + bands.reduce((s, b) => s + b, 0);
  const hasAxis = !!data.axisStep;
  const axisH = hasAxis ? 24 : 0;
  const titleH = data.axisTitle ? 22 : 0;
  const H = bottomOfBars + axisH + titleH + 6;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Frame: React.ComponentType<any> = data.noFrame ? NoFrame : ExhibitFrame;
  const x = (v: number) => labelW + (Math.max(0, v) / data.max) * plotW;

  const ticks: number[] = [];
  if (data.axisStep) for (let t = 0; t <= data.max + 1e-9; t += data.axisStep) ticks.push(Number(t.toFixed(6)));

  const tops = bands.map((_, i) => top + bands.slice(0, i).reduce((s, b) => s + b, 0));

  const legendEl =
    swatches.length > 1 ? (
        <div style={{ display: "flex", justifyContent: data.legendBottom ? "center" : "flex-end", ...(data.legendBottom ? { marginTop: 10, flexWrap: "nowrap", gap: 5 } : { flexWrap: "wrap", gap: "6px 18px", marginBottom: 10 }) }}>
          {swatches.map((s, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: data.legendBottom ? 9.5 : 13, whiteSpace: "nowrap", color: ink.text }}>
              <span style={{ width: 12, height: 12, background: s.color, border: data.outline || dark ? `1px solid ${frame}` : "none", display: "inline-block" }} />
              {s.name}
            </span>
          ))}
        </div>
    ) : null;

  return (
    <Frame dark={dark} title={data.title} titleStyle={data.titleStyle} rule={data.titleRule}>
      {swatches.length > 1 && !data.legendBottom && legendEl}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: Math.max(W, 420) * 1.25, display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Horizontal bar chart"}>
        {/* Value axis: gridlines, ticks and labels */}
        {ticks.map((t) => (
          <g key={t}>
            {data.grid && (t > 0 || data.stacked) && <line x1={x(t)} x2={x(t)} y1={top} y2={bottomOfBars} stroke={ink.grid} strokeWidth={1} />}
            {!data.stacked && <line x1={x(t)} x2={x(t)} y1={bottomOfBars} y2={bottomOfBars + 4} stroke={ink.axis} strokeWidth={1} />}
            <text x={x(t)} y={bottomOfBars + 17} textAnchor="middle" fontSize={data.axisBold ? 10 : (data.tickFontSize ?? 12)} fontWeight={data.axisBold ? 700 : undefined} fill={data.axisBold ? ink.text : ink.axis}>
              {tickFmt(t)}
            </text>
          </g>
        ))}
        {hasAxis && !data.stacked && <line x1={labelW} x2={x(data.max)} y1={bottomOfBars} y2={bottomOfBars} stroke={frame} strokeWidth={1} />}
        {data.axisTitle && (
          <text x={data.axisTitleEnd ? x(data.max) : labelW + plotW / 2} y={bottomOfBars + axisH + 14} textAnchor={data.axisTitleEnd ? "end" : "middle"} fontSize={13} fontWeight={700} fill={ink.text}>
            {data.axisTitle}
          </text>
        )}

        {/* Category axis and tick marks between the categories */}
        <line x1={labelW} x2={labelW} y1={top} y2={bottomOfBars} stroke={frame} strokeWidth={1} />
        {data.categoryTicks &&
          [...tops, bottomOfBars].map((ty, i) => <line key={`ct${i}`} x1={labelW - 5} x2={labelW} y1={ty} y2={ty} stroke={frame} strokeWidth={1} />)}

        {groups.map((g, gi) => {
          const cy = tops[gi] + bands[gi] / 2;
          const lines = labelLines[gi];
          const y0 = tops[gi] + (bands[gi] - clusterH) / 2;
          return (
            <g key={gi}>
              <text textAnchor="end" fontSize={fsLabel} fill={ink.text} display={data.hideLabels ? "none" : undefined}>
                {lines.map((ln, li) => (
                  <tspan key={li} x={labelW - 12} y={cy - ((lines.length - 1) * lineH) / 2 + li * lineH} dominantBaseline="middle">
                    {ln}
                  </tspan>
                ))}
              </text>
              {data.stacked
                ? g.values.map((v, si) => {
                    const color = g.colors?.[si] ?? swatches[si]?.color ?? "#777777";
                    const start = g.values.slice(0, si).reduce((a, b) => a + b, 0);
                    const x0 = x(start);
                    const w = x(Math.min(start + v, data.max)) - x0; // a segment running past the axis maximum is cut at it
                    return (
                      <g key={si}>
                        {w > 0.4 && <rect x={x0} y={y0} width={w} height={barH} fill={color} stroke={dark && isVeryDark(color) ? frame : "none"} strokeWidth={0.8} />}
                        <text x={x0 + w / 2} y={y0 + barH / 2} textAnchor="middle" dominantBaseline="middle" fontSize={fsValue} fill={isLight(color) ? "#1f2421" : "#ffffff"}>
                          {texts[gi][si]}
                        </text>
                      </g>
                    );
                  })
                : g.values.map((v, si) => {
                const color = g.colors?.[si] ?? swatches[si]?.color ?? "#777777";
                const by = y0 + si * (barH + barGap);
                const w = x(v) - labelW;
                const outline = data.outline || (dark && isVeryDark(color));
                return (
                  <g key={si}>
                    {w > 0.4 && <rect x={labelW} y={by} width={w} height={barH} fill={color} stroke={outline ? frame : "none"} strokeWidth={0.8} />}
                    {(() => {
                      const room = texts[gi][si].length * fsValue * CHAR_W + 12;
                      const inside = data.insideLabels && w >= room;
                      return (
                        <text
                          x={inside ? labelW + w - 6 : labelW + Math.max(w, 0) + 6}
                          y={by + barH / 2}
                          textAnchor={inside ? "end" : "start"}
                          dominantBaseline="middle"
                          fontSize={fsValue}
                          fill={inside ? (isLight(color) ? "#1f2421" : "#ffffff") : ink.text}
                        >
                          {texts[gi][si]}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {swatches.length > 1 && data.legendBottom && legendEl}
      {(data.footnoteLines?.length || data.footnote) && (
        <div style={{ fontSize: 12, color: ink.axis, marginTop: 12, lineHeight: 1.45 }}>
          {data.footnoteLines?.map((f, i) => (
            <div key={i}>
              {f.bold && <strong style={{ color: ink.text }}>{f.bold}</strong>}
              {f.text}
            </div>
          ))}
          {data.footnote && <div>{data.footnote}</div>}
        </div>
      )}
    </Frame>
  );
}
