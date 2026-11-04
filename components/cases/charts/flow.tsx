// Process-flow diagrams and timelines, drawn in one fixed SVG canvas (1000 x 1000*aspect units) that scales
// with the container. Free layout: boxes / tags / labels / block arrows (`nodes`) and polyline arrows
// (`arrows`, solid or dashed, open or filled heads) at 0-1 canvas shares. `steps` adds an automatic row layout.
import { useId } from "react";
import type { FlowArrow, FlowData, FlowNode } from "@/lib/cases/extra-charts";
import { ExhibitFrame, chartInk } from "./chart-kit";

const W = 1000;
const SANS = `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
const SERIF = `"Times New Roman", Georgia, serif`;

// Absolute-unit versions of the data shapes (canvas units, not shares).
type N = Omit<FlowNode, "x" | "y" | "w" | "h" | "headLen" | "headH"> & { x: number; y: number; w: number; h: number; headLen: number; headH: number };
type A = Omit<FlowArrow, "points"> & { points: [number, number][] };

function wrap(text: string, maxW: number, size: number, serif?: boolean, bold?: boolean): string[] {
  const cw = size * (serif ? 0.48 : 0.56) * (bold ? 1.06 : 1);
  const out: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(" ");
    let line = "";
    for (const w of words) {
      const next = line ? line + " " + w : w;
      if (line && next.length * cw > maxW) {
        out.push(line);
        line = w;
      } else line = next;
    }
    out.push(line);
  }
  return out;
}

function Head({ from, tip, a, color }: { from: [number, number]; tip: [number, number]; a: A; color: string }) {
  const len = a.headSize ?? Math.max(9, (a.width ?? 2.5) * 4.5);
  const ang = Math.atan2(tip[1] - from[1], tip[0] - from[0]);
  const spread = 0.46;
  const p1: [number, number] = [tip[0] - len * Math.cos(ang - spread), tip[1] - len * Math.sin(ang - spread)];
  const p2: [number, number] = [tip[0] - len * Math.cos(ang + spread), tip[1] - len * Math.sin(ang + spread)];
  if (a.headStyle === "filled") return <polygon points={`${tip} ${p1} ${p2}`} fill={color} stroke={color} strokeWidth={1} strokeLinejoin="round" />;
  return <polyline points={`${p1} ${tip} ${p2}`} fill="none" stroke={color} strokeWidth={Math.max(2, (a.width ?? 2.5) * 0.9)} strokeLinecap="round" strokeLinejoin="round" />;
}

export function FlowChart({ data, dark }: { data: FlowData; dark?: boolean }) {
  const ink = chartInk(dark);
  const uid = useId().replace(/:/g, "");
  const nodes: N[] = [];
  const arrows: A[] = [];
  let height = W * (data.aspect ?? 0.5);

  // Automatic step layout (own canvas when no free layout is given).
  if (data.steps?.length) {
    const n = data.steps.length;
    const cols = Math.max(1, Math.min(data.columns ?? Math.min(n, 4), n));
    const rows = Math.ceil(n / cols);
    const gap = data.style === "chevron" ? 8 : 44;
    const bw = (W - (cols - 1) * gap) / cols;
    const size = cols > 3 ? 13 : 14;
    const lineH = size * 1.3;
    const bodyLines = data.steps.map((s) => (s.bullets ?? []).reduce((t, b) => t + wrap("• " + b, bw - 20, size - 1).length, 0));
    const bh = 64 + Math.max(...bodyLines) * lineH;
    const rowGap = 40;
    data.steps.forEach((s, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const x = c * (bw + gap);
      const y = r * (bh + rowGap);
      nodes.push({ text: s.title, x, y, w: bw, h: 44, headLen: 0, headH: 0, shape: "box", fill: s.color ?? "#4a7ebb", stroke: s.color ?? "#4a7ebb", color: "#ffffff", bold: true, size, align: "center" });
      if (s.bullets?.length)
        nodes.push({ text: s.bullets.map((b) => "• " + b).join("\n"), x, y: y + 44, w: bw, h: bh - 44, headLen: 0, headH: 0, shape: "box", stroke: ink.axis, size: size - 1, align: "left", lineGap: 1.3 });
      if (c < cols - 1 && i < n - 1) arrows.push({ points: [[x + bw + 4, y + 22], [x + bw + gap - 4, y + 22]], color: ink.axis, width: 2, head: "end", headStyle: "filled" });
    });
    height = rows * bh + (rows - 1) * rowGap;
  }

  for (const nd of data.nodes ?? [])
    nodes.push({ ...nd, x: nd.x * W, y: nd.y * height, w: (nd.w ?? 0) * W, h: (nd.h ?? 0) * height, headLen: (nd.headLen ?? 0) * W, headH: (nd.headH ?? 0) * height });
  for (const ar of data.arrows ?? []) arrows.push({ ...ar, points: ar.points.map(([x, y]) => [x * W, y * height] as [number, number]) });
  if (!nodes.length && !arrows.length) return null;

  const resolve = (c: string | undefined, fallback: string) => (c === "bg" ? ink.sliceStroke : c ?? fallback);

  const renderNode = (nd: N, i: number) => {
    const shape = nd.shape ?? "box";
    const serif = nd.serif;
    const font = serif ? SERIF : SANS;
    const isTag = shape === "tag";
    const size0 = nd.size ?? 13;
    const stroke = resolve(nd.stroke, isTag ? "#729acb" : ink.axis);
    const sw = nd.strokeWidth ?? (isTag ? 3 : 1.5);
    const textColor = nd.color ?? ink.text;
    const filter = nd.shadow ? `url(#fs${uid})` : undefined;
    const fillId = nd.fill && nd.fill2 ? `url(#g${uid}-${i})` : undefined;
    const fill = fillId ?? resolve(nd.fill, "none");

    if (shape === "text") {
      const lines = nd.text ? nd.text.split("\n") : [];
      const lg = size0 * (nd.lineGap ?? 1.25);
      const anchor = nd.align === "right" ? "end" : nd.align === "left" ? "start" : "middle";
      return (
        <text key={i} textAnchor={anchor} fontSize={size0} fontFamily={font} fontWeight={nd.bold ? 700 : 400} fontStyle={nd.italic ? "italic" : undefined} fill={textColor}>
          {lines.map((ln, li) => (
            <tspan key={li} x={nd.x} y={nd.y + (li - (lines.length - 1) / 2) * lg} dominantBaseline="central">
              {ln}
            </tspan>
          ))}
        </text>
      );
    }

    const pad = nd.padX ?? 8;
    let size = size0;
    let lines: string[] = [];
    const lg = nd.lineGap ?? 1.25;
    if (nd.text && nd.noWrap) {
      lines = nd.text.split("\n").map((l) => l.replace(/ {2,}/g, (m) => "\u00a0".repeat(m.length)));
    } else if (nd.text) {
      for (let k = 0; k < 14; k++) {
        lines = wrap(nd.text, nd.w - 2 * pad, size, serif, nd.bold);
        if (lines.length * size * lg <= nd.h - 4 || size <= 8) break;
        size -= 0.75;
      }
    }
    const left = nd.align === "left";
    const tx = left ? nd.x + pad : nd.x + nd.w / 2;
    const total = (lines.length - 1) * size * lg;
    const top = nd.valign === "top";
    const firstY = top ? nd.y + (nd.padTop ?? 10) + (size * lg) / 2 : nd.y + nd.h / 2 - total / 2;
    const textEl = nd.text ? (
      <text textAnchor={left ? "start" : "middle"} fontSize={size} fontFamily={font} fontWeight={nd.bold ? 700 : 400} fontStyle={nd.italic ? "italic" : undefined} fill={textColor}>
        {lines.map((ln, li) => (
          <tspan key={li} x={tx} y={firstY + li * size * lg} dominantBaseline="central">
            {ln}
          </tspan>
        ))}
      </text>
    ) : null;

    if (shape === "blockArrow") {
      const { x, y, w, h, headLen, headH } = nd;
      const mid = y + h / 2;
      const hh = headH || h * 2;
      const pts = [[x, y], [x + w, y], [x + w, mid - hh / 2], [x + w + headLen, mid], [x + w, mid + hh / 2], [x + w, y + h], [x, y + h]];
      return (
        <g key={i} filter={filter}>
          <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={fill === "none" ? "#6a9ec7" : fill} stroke={nd.stroke ? stroke : "none"} strokeWidth={sw} />
          {textEl}
        </g>
      );
    }
    return (
      <g key={i} filter={filter}>
        <rect x={nd.x} y={nd.y} width={nd.w} height={nd.h} fill={fill} fillOpacity={nd.fillOpacity} stroke={nd.stroke === "none" ? "none" : stroke} strokeWidth={sw} rx={nd.radius ?? (isTag ? 2 : 0)} />
        {textEl}
      </g>
    );
  };

  return (
    <ExhibitFrame dark={dark} title={data.title} titleStyle={data.titleStyle}>
      <svg viewBox={`0 0 ${W} ${height.toFixed(1)}`} style={{ width: "100%", maxWidth: W * 1.25, display: "block", margin: "0 auto", overflow: "visible" }} role="img" aria-label={data.title ?? "Flow diagram"}>
        <defs>
          <filter id={`fs${uid}`} x="-10%" y="-10%" width="125%" height="135%">
            <feDropShadow dx="1.5" dy="2" stdDeviation="1.8" floodColor="#000" floodOpacity={dark ? 0.5 : 0.3} />
          </filter>
          {nodes.map(
            (nd, i) =>
              nd.fill &&
              nd.fill2 && (
                <linearGradient key={i} id={`g${uid}-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={nd.fill} />
                  <stop offset="1" stopColor={nd.fill2} />
                </linearGradient>
              ),
          )}
        </defs>
        {nodes.filter((n) => n.shape !== "text").map((nd) => renderNode(nd, nodes.indexOf(nd)))}
        {arrows.map((a, i) => {
          const col = a.color === "ink" || !a.color ? ink.text : a.color;
          const p = a.points;
          if (p.length < 2) return null;
          const head = a.head ?? "end";
          const w = a.width ?? 2.5;
          return (
            <g key={i}>
              <polyline points={p.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ")} fill="none" stroke={col} strokeWidth={w} strokeDasharray={a.dashed ? `${w * 3.2} ${w * 2.6}` : undefined} strokeLinejoin="miter" />
              {(head === "end" || head === "both") && <Head from={p[p.length - 2]} tip={p[p.length - 1]} a={a} color={col} />}
              {(head === "start" || head === "both") && <Head from={p[1]} tip={p[0]} a={a} color={col} />}
            </g>
          );
        })}
        {nodes.filter((n) => n.shape === "text").map((nd) => renderNode(nd, nodes.indexOf(nd)))}
      </svg>
      {data.footnote && <div style={{ fontSize: 12, color: ink.axis, marginTop: 12, lineHeight: 1.45 }}>{data.footnote}</div>}
    </ExhibitFrame>
  );
}
