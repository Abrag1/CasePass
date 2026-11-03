// Normal-density curves drawn from mean / sd, with dashed vertical markers, curve labels, an x axis and
// bordered call-out boxes with polyline pointers. Everything is laid out in one fixed SVG canvas
// (W x H below) that scales with the container; call-out positions are 0-1 shares of that canvas.
import type { BellCurveData } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const W = 860;
const H = 480;
const PLOT_L = 75; // x of xMin
const PLOT_R = 755; // x of xMax
const AXIS_Y = 422; // baseline of the curves
const PEAK_H = 210; // pixel height of the tallest curve

type Curve = BellCurveData["curves"][number];

function isVeryDark(hex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return false;
  const c = parseInt(hex.slice(1), 16);
  return (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255 < 0.25;
}

// "μ_1" -> italic μ with a subscript 1.
function Sub({ text }: { text: string }) {
  const [main, sub] = text.split("_");
  return (
    <>
      {main}
      {sub && (
        <tspan fontSize="0.7em" dy="0.3em">
          {sub}
        </tspan>
      )}
    </>
  );
}

export function BellCurveChart({ data, dark }: { data: BellCurveData; dark?: boolean }) {
  const ink = chartInk(dark);
  const { curves, xMin, xMax } = data;
  if (!curves.length || !(xMax > xMin)) return null;
  const sx = (x: number) => PLOT_L + ((x - xMin) / (xMax - xMin)) * (PLOT_R - PLOT_L);
  const col = (c: string) => (dark && isVeryDark(c) ? ink.text : c);
  // Peak height: the true normal density (1/sd) relative to the tallest curve, unless `height` overrides it.
  const tallest = Math.max(...curves.map((c) => 1 / c.sd));
  const peakPx = (c: Curve) => (c.height ?? 1 / c.sd / tallest) * PEAK_H;
  const sy = (c: Curve, x: number) => AXIS_Y - Math.exp(-0.5 * ((x - c.mean) / c.sd) ** 2) * peakPx(c);

  const paths = curves.map((c) => {
    const a = Math.max(c.from ?? xMin, xMin);
    const b = Math.min(c.to ?? xMax, xMax);
    const n = 160;
    const pts: string[] = [];
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      pts.push(`${sx(x).toFixed(1)},${sy(c, x).toFixed(1)}`);
    }
    return { c, a, b, line: "M" + pts.join("L") };
  });

  const axisFrom = data.axisFrom ?? xMin;
  const axisTo = data.axisTo ?? xMax;
  const showTicks = data.markerTicks !== false;
  const peakOf = (x: number) => Math.min(...curves.map((c) => sy(c, x)));
  const font = `"Times New Roman", Georgia, serif`;

  return (
    <ExhibitFrame dark={dark} title={data.title} titleStyle={data.titleStyle}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W * 1.25, display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Normal distribution curves"}>
        {/* Curves */}
        {paths.map(({ c, a, b, line }, i) => (
          <g key={i}>
            {c.fill && <path d={`${line}L${sx(b).toFixed(1)},${AXIS_Y}L${sx(a).toFixed(1)},${AXIS_Y}Z`} fill={col(c.color)} fillOpacity={0.2} stroke="none" />}
            <path d={line} fill="none" stroke={col(c.color)} strokeWidth={c.strokeWidth ?? 3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}

        {/* X axis */}
        <line x1={sx(axisFrom)} x2={sx(axisTo)} y1={AXIS_Y} y2={AXIS_Y} stroke={ink.text} strokeWidth={2} />
        {data.axisEndLabel && (
          <text x={sx(axisTo) + 8} y={AXIS_Y + 4} fontSize={16} fontStyle="italic" fontFamily={font} fill={ink.text}>
            {data.axisEndLabel}
          </text>
        )}
        {data.xTitle && (
          <text x={(sx(axisFrom) + sx(axisTo)) / 2} y={AXIS_Y + 52} textAnchor="middle" fontSize={14} fontWeight={700} fill={ink.text}>
            {data.xTitle}
          </text>
        )}

        {/* Dashed markers (mean lines) with labels under the axis */}
        {data.markers?.map((m, i) => (
          <g key={i}>
            <line
              x1={sx(m.at)}
              x2={sx(m.at)}
              y1={peakOf(m.at)}
              y2={AXIS_Y + (showTicks ? 8 : 0)}
              stroke={ink.text}
              strokeWidth={2}
              strokeDasharray={m.dashed === false ? undefined : "8 8"}
            />
            {m.label && (
              <text x={sx(m.at)} y={AXIS_Y + 28} textAnchor="middle" fontSize={17} fontStyle="italic" fontFamily={font} fill={ink.text}>
                <Sub text={m.label} />
              </text>
            )}
          </g>
        ))}

        {/* Brackets (e.g. a sigma span) */}
        {data.spans?.map((s, i) => {
          const y = AXIS_Y - 20 - (s.level ?? 0) * 22;
          return (
            <g key={i} stroke={ink.text} strokeWidth={1.5}>
              <line x1={sx(s.from)} x2={sx(s.to)} y1={y} y2={y} />
              <line x1={sx(s.from)} x2={sx(s.from)} y1={y - 5} y2={y + 5} />
              <line x1={sx(s.to)} x2={sx(s.to)} y1={y - 5} y2={y + 5} />
              <text x={(sx(s.from) + sx(s.to)) / 2} y={y - 8} textAnchor="middle" fontSize={14} fill={ink.text} stroke="none">
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Labels beside a curve */}
        {data.curveLabels?.map((l, i) => (
          <text key={i} x={sx(l.x)} y={AXIS_Y - l.y * PEAK_H} textAnchor="middle" dominantBaseline="middle" fontSize={17} fontStyle="italic" fontFamily={font} fill={ink.text}>
            <Sub text={l.text} />
          </text>
        ))}

        {/* Call-out boxes with pointers */}
        {data.callouts?.map((c, i) => {
          const boxed = c.boxed ?? (c.w !== undefined && c.h !== undefined);
          const bw = (c.w ?? 0) * W;
          const bh = (c.h ?? 0) * H;
          const bx = c.x * W;
          const by = c.y * H;
          const stroke = c.color ? col(c.color) : ink.text;
          const lines = c.text.split("\n");
          const cx = boxed ? bx + bw / 2 : bx;
          const cy = boxed ? by + bh / 2 : by;
          return (
            <g key={i}>
              {boxed && <rect x={bx} y={by} width={bw} height={bh} fill="none" stroke={stroke} strokeWidth={2.5} />}
              {c.pointer && c.pointer.length > 1 && (
                <polyline points={c.pointer.map(([px, py]) => `${(px * W).toFixed(1)},${(py * H).toFixed(1)}`).join(" ")} fill="none" stroke={stroke} strokeWidth={3} strokeLinejoin="miter" />
              )}
              <text textAnchor="middle" fontSize={17} fill={ink.text}>
                {lines.map((ln, li) => (
                  <tspan key={li} x={cx} y={cy + (li - (lines.length - 1) / 2) * 23} dominantBaseline="middle">
                    {ln}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
      {data.footnote && <div style={{ fontSize: 12, color: ink.axis, marginTop: 12, lineHeight: 1.45 }}>{data.footnote}</div>}
    </ExhibitFrame>
  );
}
