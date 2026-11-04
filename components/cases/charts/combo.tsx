// General line / column chart: categories on X (optionally rotated or multi-line), columns and any number of
// lines (colour, width, markers, dashes), Y axis with optional gridlines and custom tick texts, plain or arrowed
// axes, dashed vertical markers, free text labels, styled title, HTML legend and footnote.
import type { ComboChartData, ComboLine } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const SERIF = 'Cambria, "Times New Roman", Times, serif';

function Marker({ kind, x, y, size, fill, stroke }: { kind: NonNullable<ComboLine["marker"]>; x: number; y: number; size: number; fill: string; stroke: string }) {
  const h = size / 2;
  if (kind === "circle") return <circle cx={x} cy={y} r={h} fill={fill} stroke={stroke} strokeWidth={1.2} />;
  if (kind === "square") return <rect x={x - h} y={y - h} width={size} height={size} fill={fill} stroke={stroke} strokeWidth={1.2} />;
  const d = h * 1.25;
  return <polygon points={`${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`} fill={fill} stroke={stroke} strokeWidth={1.2} />;
}

export function ComboChart({ data, dark }: { data: ComboChartData; dark?: boolean }) {
  const ink = chartInk(dark);
  const n = data.categories.length;
  if (!n) return null;
  const font = data.serif ? SERIF : undefined;
  const yMin = data.yMin ?? 0;
  const yMax = data.yMax;
  const step = data.yStep ?? (yMax - yMin) / 5;
  const ticks: number[] = [];
  for (let t = yMin; t <= yMax + 1e-9; t += step) ticks.push(Math.round(t * 1e6) / 1e6);
  const tickText = (t: number, i: number) => data.yTickLabels?.[i] ?? `${data.yTickPrefix ?? ""}${t}${data.yTickSuffix ?? ""}`;
  const on = data.xPlacement === "on";
  const arrows = data.axisStyle === "arrows";

  const W = 1000;
  const yTickW = Math.max(...ticks.map((t, i) => tickText(t, i).length)) * 9;
  const leftM = Math.max(48, yTickW + 20) + (data.yLabel ? 28 : 0);
  const rightM = on ? 44 : 24;
  const plotW = W - leftM - rightM;
  const plotH = 340;
  const titleLines = data.title ? data.title.split("\n") : [];
  const titleFs = data.titleSize ?? 20;
  const titleH = titleLines.length ? titleLines.length * titleFs * 1.3 + 16 : 0;
  const top = titleH + 20;
  const base = top + plotH;
  const x0 = leftM;
  const slot = on ? (n > 1 ? plotW / (n - 1) : plotW) : plotW / n;
  const cx = (i: number) => (on ? x0 + i * slot : x0 + (i + 0.5) * slot);
  const y = (v: number) => base - ((v - yMin) / (yMax - yMin)) * plotH;

  // X labels
  const rot = data.xLabelRotate ?? 0;
  const every = Math.max(1, data.xLabelEvery ?? 1);
  const labFs = 15;
  const labLines = data.categories.map((c) => c.split("\n"));
  const longest = Math.max(...labLines.flat().map((l) => l.length));
  const rad = (rot * Math.PI) / 180;
  const labH = rot ? Math.sin(rad) * longest * labFs * 0.52 + 24 : Math.max(...labLines.map((l) => l.length)) * labFs * 1.2 + 14;
  const xTitleH = data.xTitle ? 32 : 0;
  const H = base + labH + xTitleH + 12;

  const barW = data.bars ? Math.min(60, slot * 0.6) : 0;
  const series = [
    ...(data.bars ? [{ name: data.bars.name, color: data.bars.color, line: undefined as ComboLine | undefined }] : []),
    ...(data.lines ?? []).map((l) => ({ name: l.name, color: l.color, line: l as ComboLine | undefined })),
  ];
  const legendPos = data.legend ?? "bottom";
  const showLegend = legendPos !== "none" && series.some((s) => s.name);

  const legend = showLegend ? (
    <div
      style={{
        display: "flex",
        flexDirection: legendPos === "right" ? "column" : "row",
        flexWrap: "wrap",
        justifyContent: legendPos === "topRight" ? "flex-end" : "center",
        gap: "6px 20px",
        fontFamily: font,
        fontSize: 13,
        color: ink.text,
        marginTop: legendPos === "bottom" ? 10 : 0,
        marginBottom: legendPos === "topRight" ? 8 : 0,
      }}
    >
      {series.map((s, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width={34} height={14} style={{ flex: "none" }}>
            {s.line ? (
              <>
                <line x1={0} x2={34} y1={7} y2={7} stroke={s.line.color} strokeWidth={Math.min(s.line.width ?? 3, 4)} strokeDasharray={s.line.dashed ? "6 4" : undefined} />
                {s.line.marker && <Marker kind={s.line.marker} x={17} y={7} size={Math.min(s.line.markerSize ?? 9, 9)} fill={s.line.markerColor ?? s.line.color} stroke={s.line.color} />}
              </>
            ) : (
              <rect x={10} y={1} width={13} height={12} fill={s.color} />
            )}
          </svg>
          {s.name}
        </span>
      ))}
    </div>
  ) : null;

  const svg = (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 980, display: "block", margin: "0 auto", fontFamily: font }} role="img" aria-label={data.title ?? "Chart"}>
      {titleLines.map((l, i) => (
        <text
          key={i}
          x={data.titleAlign === "center" ? x0 + plotW / 2 : x0}
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
      {data.yGrid && ticks.slice(1).map((t, i) => <line key={`g${i}`} x1={x0} x2={x0 + plotW} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1.2} />)}
      {/* axes */}
      <line x1={x0} x2={x0} y1={arrows ? top - 14 : y(yMax)} y2={base} stroke={ink.axis} strokeWidth={1.6} />
      <line x1={x0} x2={x0 + plotW + (arrows ? 14 : 0)} y1={base} y2={base} stroke={ink.axis} strokeWidth={1.6} />
      {arrows && (
        <>
          <polygon points={`${x0},${top - 22} ${x0 - 5},${top - 10} ${x0 + 5},${top - 10}`} fill={ink.axis} />
          <polygon points={`${x0 + plotW + 22},${base} ${x0 + plotW + 10},${base - 5} ${x0 + plotW + 10},${base + 5}`} fill={ink.axis} />
        </>
      )}
      {ticks.map((t, i) => (
        <g key={`t${i}`}>
          <line x1={x0 - 5} x2={x0} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1.4} />
          <text x={x0 - 9} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={14} fill={ink.text}>
            {tickText(t, i)}
          </text>
        </g>
      ))}
      {data.yLabel && (
        <text transform={`translate(16 ${top + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={15} fontWeight={data.axisTitleBold ? 700 : 400} fill={ink.text}>
          {data.yLabel}
        </text>
      )}
      {/* category ticks and labels */}
      {data.categories.map((c, i) => {
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
      {data.xTitle && (
        <text x={x0 + plotW / 2} y={base + labH + 22} textAnchor="middle" fontSize={15} fontWeight={data.axisTitleBold ? 700 : 400} fill={ink.text}>
          {data.xTitle}
        </text>
      )}
      {/* vertical markers */}
      {data.markers?.map((m, i) => {
        const x = x0 + (on ? m.at * slot : (m.at + 0.5) * slot);
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
      {data.bars?.values.map((v, i) => <rect key={`b${i}`} x={cx(i) - barW / 2} y={y(v)} width={barW} height={Math.max(0, base - y(v))} fill={data.bars!.color} />)}
      {/* lines */}
      {data.lines?.map((l, li) => {
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
      {data.texts?.map((t, i) => (
        <text key={`x${i}`} x={x0 + (on ? t.x * slot : (t.x + 0.5) * slot)} y={y(t.y)} textAnchor={t.anchor ?? "middle"} fontSize={t.size ?? 14} fontWeight={t.bold ? 700 : 400} fill={t.color ?? ink.text}>
          {t.text}
        </text>
      ))}
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
