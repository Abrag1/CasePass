// General line / column chart: one plot, or several side-by-side panels sharing the Y scale. Categories on X
// (optionally rotated or multi-line), columns (per-bar colours, value labels, dashed per-bar ticks) and any number
// of lines (colour, width, markers, dashes), Y axis with optional gridlines and custom tick texts, plain / arrowed /
// no axis lines, horizontal reference lines, dashed vertical markers, boxed callouts with leader lines, free text,
// styled title, HTML legend and footnote.
import type { ComboChartData, ComboLine, ComboPanel } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const SERIF = 'Cambria, "Times New Roman", Times, serif';
const TICK_GREY = "#7f7f7f";

function Marker({ kind, x, y, size, fill, stroke }: { kind: NonNullable<ComboLine["marker"]>; x: number; y: number; size: number; fill: string; stroke: string }) {
  const h = size / 2;
  if (kind === "circle") return <circle cx={x} cy={y} r={h} fill={fill} stroke={stroke} strokeWidth={1.2} />;
  if (kind === "square") return <rect x={x - h} y={y - h} width={size} height={size} fill={fill} stroke={stroke} strokeWidth={1.2} />;
  const d = h * 1.25;
  return <polygon points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`} fill={fill} stroke={stroke} strokeWidth={1.2} />;
}

export function ComboChart({ data, dark }: { data: ComboChartData; dark?: boolean }) {
  const ink = chartInk(dark);
  const panels: ComboPanel[] = data.panels ?? (data.categories ? [data as ComboPanel] : []);
  if (!panels.length) return null;
  const multi = panels.length > 1;
  const font = data.serif ? SERIF : undefined;
  const yMin = data.yMin ?? 0;
  const yMax = data.yMax;
  const step = data.yStep ?? (yMax - yMin) / 5;
  const ticks: number[] = [];
  for (let t = yMin; t <= yMax + 1e-9; t += step) ticks.push(Math.round(t * 1e6) / 1e6);
  const tickText = (t: number, i: number) => data.yTickLabels?.[i] ?? `${data.yTickPrefix ?? ""}${t}${data.yTickSuffix ?? ""}`;
  const on = data.xPlacement === "on";
  const arrows = data.axisStyle === "arrows";
  const noAxis = data.axisStyle === "none";

  const W = 1000;
  const yTickW = Math.max(...ticks.map((t, i) => tickText(t, i).length)) * 9;
  const tickM = Math.max(48, yTickW + 20); // room for tick texts left of each plot
  const titleM = data.yLabel ? 28 : 0;
  const rightM = on ? 44 : 24;
  const panelGap = multi ? 36 : 0;
  const plotW = (W - titleM - rightM - panels.length * tickM - (panels.length - 1) * panelGap) / panels.length;
  const plotH = 340;
  const titleLines = data.title ? data.title.split("\n") : [];
  const titleFs = data.titleSize ?? 20;
  const titleH = titleLines.length ? titleLines.length * titleFs * 1.3 + 16 : 0;
  const top = titleH + 20;
  const base = top + plotH;
  const y = (v: number) => base - ((v - yMin) / (yMax - yMin)) * plotH;
  const firstX0 = titleM + tickM;

  // X labels (shared height across panels)
  const rot = data.xLabelRotate ?? 0;
  const every = Math.max(1, data.xLabelEvery ?? 1);
  const labFs = 15;
  const allLines = panels.flatMap((p) => p.categories.map((c) => c.split("\n")));
  const longest = Math.max(...allLines.flat().map((l) => l.length));
  const rad = (rot * Math.PI) / 180;
  const labH = rot ? Math.sin(rad) * longest * labFs * 0.52 + 24 : Math.max(...allLines.map((l) => l.length)) * labFs * 1.2 + 14;
  const xTitleH = panels.some((p) => p.xTitle) ? 32 : 0;
  const H = base + labH + xTitleH + 12;

  // Legend entries: columns, lines and per-bar ticks.
  type Entry = { name: string; color: string; line?: ComboLine; tick?: boolean };
  const entries: Entry[] = [];
  for (const p of panels) {
    if (p.bars?.name && !entries.some((e) => e.name === p.bars!.name)) entries.push({ name: p.bars.name, color: p.bars.color });
    if (p.bars?.tickName && !entries.some((e) => e.name === p.bars!.tickName)) entries.push({ name: p.bars.tickName, color: p.bars.tickColor ?? TICK_GREY, tick: true });
    for (const l of p.lines ?? []) if (!entries.some((e) => e.name === l.name)) entries.push({ name: l.name, color: l.color, line: l });
  }
  const legendPos = data.legend ?? "bottom";
  const showLegend = legendPos !== "none" && entries.some((s) => s.name);
  const legend = showLegend ? (
    <div
      style={{
        display: "flex",
        flexDirection: legendPos === "right" ? "column" : "row",
        flexWrap: "wrap",
        justifyContent: legendPos === "topRight" ? "flex-end" : multi ? "flex-start" : "center",
        gap: "6px 20px",
        fontFamily: font,
        fontSize: 13,
        color: ink.text,
        marginTop: legendPos === "bottom" ? 10 : 0,
        marginBottom: legendPos === "topRight" ? 8 : 0,
        paddingLeft: legendPos === "bottom" && multi ? `${(firstX0 / W) * 100}%` : 0,
      }}
    >
      {entries.map((s, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width={34} height={14} style={{ flex: "none" }}>
            {s.line ? (
              <>
                <line x1={0} x2={34} y1={7} y2={7} stroke={s.line.color} strokeWidth={Math.min(s.line.width ?? 3, 4)} strokeDasharray={s.line.dashed ? "6 4" : undefined} />
                {s.line.marker && <Marker kind={s.line.marker} x={17} y={7} size={Math.min(s.line.markerSize ?? 9, 9)} fill={s.line.markerColor ?? s.line.color} stroke={s.line.color} />}
              </>
            ) : s.tick ? (
              <line x1={1} x2={33} y1={7} y2={7} stroke={s.color} strokeWidth={2} strokeDasharray="6 3" />
            ) : (
              <rect x={10} y={1} width={13} height={12} fill={s.color} />
            )}
          </svg>
          {s.name}
        </span>
      ))}
    </div>
  ) : null;

  const drawPanel = (p: ComboPanel, pi: number) => {
    const n = p.categories.length;
    const x0 = firstX0 + pi * (plotW + tickM + panelGap);
    const slot = on ? (n > 1 ? plotW / (n - 1) : plotW) : plotW / n;
    const cx = (i: number) => (on ? x0 + i * slot : x0 + (i + 0.5) * slot);
    const px = (i: number) => (on ? x0 + i * slot : x0 + (i + 0.5) * slot);
    const labLines = p.categories.map((c) => c.split("\n"));
    const barW = p.bars ? Math.min(60, slot * 0.6) : 0;
    return (
      <g key={`p${pi}`}>
        {data.yGrid && ticks.slice(noAxis ? 0 : 1).map((t, i) => <line key={`g${i}`} x1={x0} x2={x0 + plotW} y1={y(t)} y2={y(t)} stroke={noAxis && t === yMin ? "#c8c8c8" : ink.grid} strokeWidth={noAxis && t === yMin ? 2 : 1.2} />)}
        {/* axes */}
        {!noAxis && <line x1={x0} x2={x0} y1={arrows ? top - 14 : y(yMax)} y2={base} stroke={ink.axis} strokeWidth={1.6} />}
        {!noAxis && <line x1={x0} x2={x0 + plotW + (arrows ? 14 : 0)} y1={base} y2={base} stroke={ink.axis} strokeWidth={1.6} />}
        {arrows && (
          <>
            <polygon points={`${x0},${top - 22} ${x0 - 5},${top - 10} ${x0 + 5},${top - 10}`} fill={ink.axis} />
            <polygon points={`${x0 + plotW + 22},${base} ${x0 + plotW + 10},${base - 5} ${x0 + plotW + 10},${base + 5}`} fill={ink.axis} />
          </>
        )}
        {ticks.map((t, i) => (
          <g key={`t${i}`}>
            {!noAxis && <line x1={x0 - 5} x2={x0} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1.4} />}
            <text x={x0 - (noAxis ? 12 : 9)} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={14} fill={ink.text}>
              {tickText(t, i)}
            </text>
          </g>
        ))}
        {/* category ticks and labels */}
        {p.categories.map((c, i) => {
          const x = cx(i);
          if (i % every !== 0) return null;
          return (
            <g key={`c${i}`}>
              {on && <line x1={x} x2={x} y1={base} y2={base + 5} stroke={ink.axis} strokeWidth={1.4} />}
              {rot ? (
                <text transform={`translate(${x + 4} ${base + 14}) rotate(${-rot})`} textAnchor="end" dominantBaseline="middle" fontSize={labFs} fill={ink.text}>
                  {c}
                </text>
              ) : (
                <text textAnchor="middle" fontSize={labFs} fill={ink.text}>
                  {labLines[i].map((ln, li) => (
                    <tspan key={li} x={x} y={base + 22 + li * labFs * 1.2}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}
        {p.xTitle && (
          <text x={x0 + plotW / 2} y={base + labH + 22} textAnchor="middle" fontSize={15} fontWeight={data.axisTitleBold ? 700 : 400} fill={ink.text}>
            {p.xTitle}
          </text>
        )}
        {/* vertical markers */}
        {p.markers?.map((m, i) => {
          const x = px(m.at);
          return (
            <g key={`m${i}`}>
              <line x1={x} x2={x} y1={top} y2={base} stroke={m.color ?? ink.text} strokeWidth={1.6} strokeDasharray={m.dashed === false ? undefined : "6 5"} />
              {m.label && (
                <text x={x} y={top - 6} textAnchor="middle" fontSize={13} fill={m.labelColor ?? ink.text}>
                  {m.label}
                </text>
              )}
            </g>
          );
        })}
        {/* columns */}
        {p.bars?.values.map((v, i) => <rect key={`b${i}`} x={cx(i) - barW / 2} y={y(v)} width={barW} height={Math.max(0, base - y(v))} fill={p.bars!.colors?.[i] ?? p.bars!.color} />)}
        {/* horizontal reference lines (over the columns) */}
        {p.refLines?.map((r, i) => (
          <g key={`r${i}`}>
            <line x1={x0} x2={x0 + plotW} y1={y(r.at)} y2={y(r.at)} stroke={r.color} strokeWidth={r.width ?? 3} strokeDasharray={r.dashed ? "8 5" : undefined} />
            {r.label && (
              <text x={x0 + plotW - 4} y={y(r.at) - 6} textAnchor="end" fontSize={13} fill={r.labelColor ?? ink.text}>
                {r.label}
              </text>
            )}
          </g>
        ))}
        {/* per-bar ticks and value labels */}
        {p.bars?.ticks?.map((t, i) =>
          t == null ? null : <line key={`k${i}`} x1={cx(i) - barW / 2 - 2} x2={cx(i) + barW / 2 + 2} y1={y(t)} y2={y(t)} stroke={p.bars!.tickColor ?? TICK_GREY} strokeWidth={2.2} strokeDasharray="6 3" />,
        )}
        {p.bars?.valueLabels &&
          p.bars.values.map((v, i) => (
            <text key={`vl${i}`} x={cx(i)} y={(() => { const t = p.bars!.ticks?.[i]; return (t != null && t >= v && t - v <= (yMax - yMin) * 0.05 ? y(t) : y(v)) - 8; })()} textAnchor="middle" fontSize={14} fill={ink.text}>
              {v}
            </text>
          ))}
        {/* lines */}
        {p.lines?.map((l, li) => {
          const segs: string[] = [];
          let cur = "";
          l.values.forEach((v, i) => {
            if (v == null) {
              if (cur) segs.push(cur);
              cur = "";
            } else cur += `${cur ? " L" : "M"} ${cx(i)} ${y(v)}`;
          });
          if (cur) segs.push(cur);
          return (
            <g key={`l${li}`}>
              {segs.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={l.color} strokeWidth={l.width ?? 3} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={l.dashed ? "8 5" : undefined} />
              ))}
              {l.marker && l.values.map((v, i) => (v == null ? null : <Marker key={i} kind={l.marker!} x={cx(i)} y={y(v)} size={l.markerSize ?? 9} fill={l.markerColor ?? l.color} stroke={l.color} />))}
            </g>
          );
        })}
        {/* free text */}
        {p.texts?.map((t, i) => (
          <text key={`x${i}`} x={px(t.x)} y={y(t.y)} textAnchor={t.anchor ?? "middle"} fontSize={t.size ?? 14} fontWeight={t.bold ? 700 : 400} fill={t.color ?? ink.text}>
            {t.text}
          </text>
        ))}
        {/* callouts: boxed text with an optional leader line */}
        {p.callouts?.map((c, i) => {
          const fs = c.size ?? 14;
          const lines = c.text.split("\n");
          const bx = px(c.x);
          const by = y(c.y);
          const bh = lines.length * fs * 1.3 + 14;
          const target = c.pointer ? { x: px(c.pointer.x), y: y(c.pointer.y) } : null;
          // Leader leaves the bottom edge at the point nearest to the target.
          const sx = target ? (c.from != null ? bx + c.w * c.from : Math.max(bx + 8, Math.min(bx + c.w - 8, target.x))) : 0;
          return (
            <g key={`co${i}`}>
              {target && <line x1={sx} y1={by + bh} x2={target.x} y2={target.y} stroke="#a6a6a6" strokeWidth={1.2} />}
              <rect x={bx} y={by} width={c.w} height={bh} fill={dark ? "#262c28" : "#ffffff"} stroke="#a6a6a6" strokeWidth={1.2} />
              <text fontSize={fs} fill={ink.text}>
                {lines.map((ln, li) => (
                  <tspan key={li} x={bx + 10} y={by + 7 + fs * 1.0 + li * fs * 1.3}>
                    {ln}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const svg = (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 980, display: "block", margin: "0 auto", fontFamily: font }} role="img" aria-label={data.title ?? "Chart"}>
      {titleLines.map((l, i) => (
        <text
          key={i}
          x={data.titleAlign === "center" ? (firstX0 + (W - rightM)) / 2 : firstX0}
          y={titleFs + i * titleFs * 1.3}
          textAnchor={data.titleAlign === "center" ? "middle" : "start"}
          fontSize={titleFs}
          fontWeight={data.titleBold ? 700 : 400}
          fontFamily={data.titleSerif ? SERIF : font}
          textDecoration={data.titleUnderline ? "underline" : undefined}
          fill={ink.text}
        >
          {l}
        </text>
      ))}
      {data.yLabel && (
        <text transform={`translate(16 ${top + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={15} fontWeight={data.axisTitleBold ? 700 : 400} fill={ink.text}>
          {data.yLabel}
        </text>
      )}
      {panels.map(drawPanel)}
    </svg>
  );

  return (
    <ExhibitFrame dark={dark}>
      {legendPos === "topRight" && legend}
      {legendPos === "right" && showLegend ? (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1, minWidth: 0 }}>{svg}</div>
          {legend}
        </div>
      ) : (
        svg
      )}
      {legendPos === "bottom" && legend}
      {data.footnote && (
        <div
          style={{
            fontSize: data.footnoteBold ? 14 : 12,
            fontWeight: data.footnoteBold ? 700 : 400,
            fontFamily: data.footnoteBold ? SERIF : font,
            color: data.footnoteBold ? ink.text : ink.axis,
            marginTop: 14,
          }}
        >
          {data.footnote}
        </div>
      )}
    </ExhibitFrame>
  );
}
