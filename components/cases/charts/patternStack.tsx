// Stacked columns filled with black-and-white hatch patterns, replicating a source slide (positions in slide pixels).
import { useId } from "react";
import type { PatternKind, PatternStackData } from "@/lib/cases/extra-charts";
import { ExhibitFrame } from "./chart-kit";

const INK = "#000000";

export function PatternStackChart({ data, dark }: { data: PatternStackData; dark?: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fill = (k: PatternKind) => (k === "solid" ? INK : `url(#${uid}-${k})`);
  const [vx, vy, vw, vh] = data.viewBox;
  const bottom = data.plotBottom;
  // top y and height of every segment, per column
  const geo = data.columns.map((c, ci) => {
    const x = c.x ?? data.plotLeft + ci * data.pitch;
    let y = bottom;
    return {
      x,
      w: c.width ?? data.barWidth,
      segs: c.segs.map((s) => {
        const h = s.value * data.unit;
        y -= h;
        return { top: y, h };
      }),
    };
  });
  const FS = 24;
  return (
    <ExhibitFrame dark={dark} title={data.title}>
      <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto" }} role="img" aria-label={data.title ?? "Stacked columns"} fontFamily="Arial, Helvetica, sans-serif">
        <defs>
          <pattern id={`${uid}-dots`} width={5.2} height={5.2} patternUnits="userSpaceOnUse">
            <rect width={5.2} height={5.2} fill="#fff" />
            <circle cx={2.6} cy={2.6} r={0.7} fill={INK} />
          </pattern>
          <pattern id={`${uid}-hatchFine`} width={2.6} height={2.6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={2.6} height={2.6} fill="#fff" />
            <rect width={2.6} height={1.3} fill={INK} />
          </pattern>
          <pattern id={`${uid}-hatchWide`} width={12} height={12} patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <rect width={12} height={12} fill="#fff" />
            <rect width={12} height={6.5} fill={INK} />
          </pattern>
          <pattern id={`${uid}-squares`} width={14} height={14} patternUnits="userSpaceOnUse">
            <rect width={14} height={14} fill={INK} />
            <rect x={5} y={5} width={4} height={4} fill="#fff" />
          </pattern>
        </defs>
        <rect x={vx} y={vy} width={vw} height={vh} fill="#ffffff" />
        {data.connectors &&
          geo.slice(0, -1).flatMap((g, ci) => {
            const nx = geo[ci + 1];
            const lines = g.segs.map((s, si) => ({ y1: s.top, y2: nx.segs[si].top }));
            lines.push({ y1: bottom, y2: bottom });
            return lines.map((l, k) => (
              <line key={`${ci}-${k}`} x1={g.x + g.w} x2={nx.x} y1={l.y1} y2={l.y2} stroke={INK} strokeWidth={0.7} strokeDasharray="3 2" />
            ));
          })}
        {data.columns.map((c, ci) => {
          const g = geo[ci];
          return (
            <g key={ci}>
              {c.segs.map((s, si) => (
                <rect key={si} x={g.x} y={g.segs[si].top} width={g.w} height={g.segs[si].h} fill={fill(s.pattern)} stroke={INK} strokeWidth={0.8} />
              ))}
              {c.segs.map((s, si) => {
                const text = s.label ?? String(s.value);
                const cx = g.x + g.w / 2 + (s.labelDx ?? 0);
                const cy = g.segs[si].top + g.segs[si].h / 2;
                const white = s.labelStyle === "white";
                const w = text.length * 13.4 + 8;
                return (
                  <g key={`l${si}`}>
                    {!white && <rect x={cx - w / 2} y={cy - 14} width={w} height={28} fill="#fff" />}
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={FS} fill={white ? "#fff" : INK}>
                      {text}
                    </text>
                  </g>
                );
              })}
              {ci === 0 &&
                c.segs.map((s, si) => {
                  if (!s.name) return null;
                  const cy = g.segs[si].top + g.segs[si].h / 2 + (s.nameDy ?? 0);
                  return (
                    <g key={`n${si}`}>
                      <text x={g.x - 18} y={cy} textAnchor="end" dominantBaseline="central" fontSize={22} fill={INK}>
                        {s.name}
                      </text>
                      {s.nameLeader && <line x1={g.x - 15} y1={cy + 3} x2={g.x - 4} y2={cy + 16} stroke={INK} strokeWidth={0.8} />}
                    </g>
                  );
                })}
              {c.total && (
                <text x={g.x + g.w / 2} y={g.segs[g.segs.length - 1].top - 8} textAnchor="middle" fontSize={22} fill={INK}>
                  {c.total}
                </text>
              )}
              <text x={g.x + g.w / 2} y={bottom + 36} textAnchor="middle" fontSize={22} fill={INK}>
                {c.label}
              </text>
            </g>
          );
        })}
        {data.baselineExtra !== undefined && (
          <line x1={data.plotLeft} x2={geo[geo.length - 1].x + geo[geo.length - 1].w + data.baselineExtra} y1={bottom} y2={bottom} stroke={INK} strokeWidth={1} />
        )}
        {data.caption && (
          <text x={data.caption.x} y={data.caption.y} textAnchor="middle" fontSize={19} fill={INK}>
            {data.caption.text}
          </text>
        )}
      </svg>
    </ExhibitFrame>
  );
}
