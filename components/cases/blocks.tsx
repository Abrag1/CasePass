// Pure presentational renderers for the page-object case model (lib/cases/content.ts).
// No hooks or state -> usable from both the server-rendered case doc and the
// client-rendered Live Mock. Exhibit renderers take a `dark` prop so the same
// chart renders on the interviewer's light panel and the candidate's dark screen.
//
// The callout boxes are the only four styles case content ever uses (per the
// handoff design system): Say-next (blue), Guidance (dashed), Calc (gray),
// Answer (green). Keep their label casing/weight consistent.

import type { CasePage, InfoSection } from "@/lib/cases/content";

/* ---------------------------------- callouts --------------------------------- */

// Minimal inline markup: **bold** segments become <strong>. Used so answers can
// bold only their key points instead of the whole block.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export function SayNextBox({ text, label = "Interviewer says" }: { text: string; label?: string }) {
  return (
    <div style={{ background: "#eef2f6", border: "1px solid #d7e0e8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#3d5a72", fontWeight: 700, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "#223140" }}>{text}</div>
    </div>
  );
}

export function GuidancePreBox({
  label = "Interviewer guidance",
  note,
  intro,
  lines,
}: {
  label?: string;
  note?: string;
  intro?: string;
  lines?: string[];
}) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #d7d9d4", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 600, marginBottom: 8, fontStyle: "italic" }}>
        {label}
      </div>
      {note && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#8a8f8a", fontStyle: "italic", marginBottom: 8 }}>{note}</div>}
      {intro && <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", marginBottom: 8 }}>{intro}</div>}
      {lines?.map((g, i) => (
        <div key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", padding: "4px 0", display: "flex", gap: 8 }}>
          <span style={{ color: "#8a8f8a" }}>•</span>
          <span>{g}</span>
        </div>
      ))}
    </div>
  );
}

export function GuidanceBox({ label = "Interviewer guidance", lines }: { label?: string; lines: string[] }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #d7d9d4", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 600, marginBottom: 8, fontStyle: "italic" }}>
        {label}
      </div>
      {lines.map((g, i) => {
        // Lines that start with two spaces are sub-bullets of the line above.
        const sub = g.startsWith("  ");
        return (
          <div key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", padding: "4px 0", paddingLeft: sub ? 20 : 0, display: "flex", gap: 8 }}>
            <span style={{ color: "#8a8f8a" }}>{sub ? "•" : "–"}</span>
            <span><Rich text={g.trim()} /></span>
          </div>
        );
      })}
    </div>
  );
}

export function CalcBox({ note, lines }: { note?: string; lines: { q: string; a: string; stack?: boolean }[] }) {
  return (
    <div style={{ background: "#fafbf9", border: "1px solid #e6e7e3", borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 700, marginBottom: 10 }}>
        Calculation walkthrough
      </div>
      {note && <div style={{ fontSize: 12, color: "#8a8f8a", marginBottom: 8, fontStyle: "italic" }}>{note}</div>}
      {lines.map((cl, i) => {
        // Multi-step / long expressions read better stacked under their label.
        const stack = cl.stack ?? cl.a.includes("\n");
        return (
          <div key={i} style={{ display: "flex", flexDirection: stack ? "column" : "row", justifyContent: "space-between", gap: stack ? 3 : 14, padding: "7px 0", borderTop: "1px solid #f2f3f0", fontSize: 13.5, flexWrap: "wrap" }}>
            <span style={{ color: "#3a3f3b", minWidth: 0, overflowWrap: "break-word", fontWeight: stack ? 700 : 400 }}>{cl.q}</span>
            <span style={{ fontWeight: stack ? 400 : 600, color: "#1f2421", textAlign: stack ? "left" : "right", overflowWrap: "break-word", whiteSpace: "pre-line", lineHeight: 1.6 }}>{cl.a}</span>
          </div>
        );
      })}
    </div>
  );
}

export function AnswerBox({ text }: { text: string }) {
  // Answers with **markup** bold only their key points; plain answers stay bold.
  const selective = text.includes("**");
  return (
    <div style={{ background: "#e9f1ec", border: "1px solid #cfe3d7", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#2d6a4f", fontWeight: 600, marginBottom: 5 }}>Answer</div>
      <div style={{ fontSize: 14, fontWeight: selective ? 400 : 600, color: "#1c3a2c", lineHeight: 1.5, whiteSpace: "pre-line" }}>
        {selective ? <Rich text={text} /> : text}
      </div>
    </div>
  );
}

// One visual structure: the answer, what the candidate should call out (in the
// case's own wording), and the bonus call-outs — all inside the same green box.
export function AnswerGroup({
  answer,
  insightLabel = "What a strong candidate spots",
  insight,
  bonusLabel = "Bonus call-outs",
  bonusLines,
}: {
  answer: string;
  insightLabel?: string;
  insight?: string;
  bonusLabel?: string;
  bonusLines?: string[];
}) {
  const label: React.CSSProperties = { fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#2d6a4f", fontWeight: 600, marginBottom: 6 };
  const body: React.CSSProperties = { fontSize: 13.5, lineHeight: 1.6, color: "#1c3a2c", whiteSpace: "pre-line" };
  const divider: React.CSSProperties = { borderTop: "1px solid #cfe3d7", marginTop: 14, paddingTop: 12 };
  return (
    <div style={{ background: "#e9f1ec", border: "1px solid #cfe3d7", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={label}>Answer</div>
      <div style={{ ...body, fontSize: 14, whiteSpace: "normal" }}>
        {answer.split("\n").map((ln, i) => {
          // "- " = top-level bullet; lines indented with two spaces = sub-bullets.
          const sub = ln.startsWith("  ");
          const top = ln.startsWith("- ");
          return (
            <div key={i} style={{ display: "flex", gap: 8, padding: sub ? "1px 0" : "3px 0", paddingLeft: sub ? 22 : 0, marginTop: top && i > 0 ? 6 : 0 }}>
              {top && <span style={{ color: "#2d6a4f" }}>•</span>}
              <span><Rich text={top ? ln.slice(2) : ln.trim()} /></span>
            </div>
          );
        })}
      </div>
      {insight && (
        <div style={divider}>
          <div style={label}>{insightLabel}</div>
          <div style={body}><Rich text={insight} /></div>
        </div>
      )}
      {bonusLines && bonusLines.length > 0 && (
        <div style={divider}>
          <div style={label}>{bonusLabel}</div>
          {bonusLines.map((b, i) => (
            <div key={i} style={{ ...body, display: "flex", gap: 8, padding: "3px 0" }}>
              <span style={{ color: "#2d6a4f" }}>•</span>
              <span><Rich text={b} /></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function InsightBox({ text }: { text: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #d7d9d4", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 600, marginBottom: 5, fontStyle: "italic" }}>
        What a strong candidate spots
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b" }}>{text}</div>
    </div>
  );
}

export function InfoSectionsBox({ label, sections }: { label?: string; sections: InfoSection[] }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #d7d9d4", borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}>
      {label && (
        <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 600, marginBottom: 14, fontStyle: "italic" }}>
          {label}
        </div>
      )}
      {sections.map((sec, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          {sec.label && (
            <div style={{ fontSize: sec.labelSize ?? "13px", fontWeight: 700, color: "#3a3f3b", marginBottom: 8 }}>
              {sec.label}{" "}
              {sec.labelNote && <span style={{ fontWeight: 500, fontStyle: "italic", color: "#8a8f8a" }}>{sec.labelNote}</span>}
            </div>
          )}
          {sec.paragraphs?.map((pg, j) => (
            <div key={j} style={{ fontSize: 13.5, lineHeight: 1.6, color: "#3a3f3b", marginBottom: 8 }}>{pg}</div>
          ))}
          {sec.iconLines?.map((il, j) => (
            <div key={j} style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3f3b", padding: "5px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ flex: "0 0 18px", fontSize: 14 }}>{il.icon}</span>
              <span>{il.text}</span>
            </div>
          ))}
          {sec.groups?.map((grp, j) => (
            <div key={j} style={{ margin: "10px 0 4px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2421", marginBottom: 6 }}>{grp.heading}</div>
              {grp.items.map((it, k) => (
                <div key={k} style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3f3b", padding: "3px 0 3px 16px", display: "flex", gap: 8 }}>
                  <span style={{ color: "#8a8f8a" }}>–</span>
                  <span>{it}</span>
                </div>
              ))}
            </div>
          ))}
          {sec.lines?.map((ln, j) => (
            <div key={j} style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3f3b", padding: "3px 0", display: "flex", gap: 8 }}>
              <span style={{ color: "#8a8f8a" }}>•</span>
              <span>{ln}</span>
            </div>
          ))}
          {sec.steps?.map((st, j) => (
            <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0" }}>
              <span style={{ width: 20, height: 20, flex: "0 0 20px", borderRadius: "50%", background: "#eef0ec", color: "#5b615c", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                {st.n}
              </span>
              <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b" }}>{st.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CheatSheet({ rows, takeaway }: { rows: NonNullable<CasePage["cheatRows"]>; takeaway?: string }) {
  return (
    <>
      <div style={{ border: "1px solid #e6e7e3", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", background: "#fafbf9", fontSize: 12, fontWeight: 600, color: "#8a8f8a" }}>
          <div style={{ padding: "9px 12px" }}>Checkpoint</div>
          <div style={{ padding: "9px 12px", textAlign: "right" }}>Revenue</div>
          <div style={{ padding: "9px 12px", textAlign: "right" }}>Cost</div>
          <div style={{ padding: "9px 12px", textAlign: "right" }}>Profit</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", borderTop: "1px solid #f2f3f0", fontSize: 13 }}>
            <div style={{ padding: "9px 12px", fontWeight: 600 }}>{r.label}</div>
            <div style={{ padding: "9px 12px", textAlign: "right" }}>{r.rev}</div>
            <div style={{ padding: "9px 12px", textAlign: "right" }}>{r.cost}</div>
            <div style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, color: r.fg }}>{r.profit}</div>
          </div>
        ))}
      </div>
      {takeaway && (
        <div style={{ background: "#e9f1ec", border: "1px solid #cfe3d7", borderRadius: 10, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#2d6a4f", fontWeight: 600, marginBottom: 5 }}>The takeaway</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#1c3a2c" }}>{takeaway}</div>
        </div>
      )}
    </>
  );
}

/* --------------------------------- exhibits ---------------------------------- */

function ExhibitFrame({ dark, title, children }: { dark?: boolean; title?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: dark ? "none" : "1px solid #e6e7e3",
        background: dark ? "#262c28" : undefined,
        borderRadius: 10,
        padding: dark ? 20 : "22px 24px",
        marginBottom: 14,
        minWidth: 0,
        overflowX: "auto",
      }}
    >
      {title && (
        <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#8a958d" : "#5b615c", marginBottom: 16 }}>{title}</div>
      )}
      {children}
    </div>
  );
}

export function StackedBar({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.chart1) return null;
  return (
    <ExhibitFrame dark={dark} title={dark ? undefined : "Exhibit 1 · Market share by firm, over time"}>
      {!dark && page.chart1Legend && (
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", flexWrap: "wrap", marginBottom: 16 }}>
          {page.chart1Legend.map((lg) => (
            <div key={lg.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#5b615c" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: lg.color }} />
              {lg.name}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: dark ? 32 : 40, flexWrap: "wrap" }}>
        {page.chart1.map((per, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: dark ? 120 : 130 }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: 8, overflow: "hidden" }}>
              {per.segs.map((seg, j) => (
                <div key={j} style={{ height: seg.h, background: seg.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: dark ? 12 : 12.5, fontWeight: 700, color: "#fff" }}>{seg.pctLabel}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: dark ? 13 : 12.5, fontWeight: 600, color: dark ? "#dbe3dd" : "#1f2421", marginTop: 10, textAlign: "center" }}>{per.label}</div>
          </div>
        ))}
      </div>
    </ExhibitFrame>
  );
}

export function CostTable({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.chart2) return null;
  const head = dark ? "#8a958d" : "#8a8f8a";
  const body = dark ? "#dbe3dd" : "#3a3f3b";
  const border = dark ? "1px solid #333a35" : "1px solid #f2f3f0";
  const cols = ["Facilities", "IT", "Staffing", "Transport"] as const;
  return (
    <ExhibitFrame dark={dark} title={dark ? undefined : "Exhibit 2 · Cost structure, then vs. now"}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 0, fontSize: 12.5, minWidth: 300 }}>
        <div style={{ fontWeight: 600, color: head, padding: "5px 4px" }}>Period</div>
        {cols.map((c) => (
          <div key={c} style={{ fontWeight: 600, color: head, padding: "5px 4px", textAlign: "right" }}>{c}</div>
        ))}
        {page.chart2.map((col, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{ padding: "9px 4px", borderTop: border, fontWeight: 600, color: body }}>{col.label}</div>
            <div style={{ padding: "9px 4px", borderTop: border, textAlign: "right", color: body }}>{col.facilities}</div>
            <div style={{ padding: "9px 4px", borderTop: border, textAlign: "right", color: body }}>{col.it}</div>
            <div style={{ padding: "9px 4px", borderTop: border, textAlign: "right", color: body }}>{col.staffing}</div>
            <div style={{ padding: "9px 4px", borderTop: border, textAlign: "right", fontWeight: 700, color: dark ? "#7fd1a3" : "#2d6a4f" }}>{col.transportation}</div>
          </div>
        ))}
      </div>
    </ExhibitFrame>
  );
}

export function GroupedBars({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.barChartGroups) return null;
  return (
    <ExhibitFrame dark={dark} title={dark ? undefined : page.barChartTitle}>
      {!dark && page.barChartLegend && (
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", flexWrap: "wrap", marginBottom: 18 }}>
          {page.barChartLegend.map((lg) => (
            <div key={lg.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#5b615c" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: lg.color }} />
              {lg.name}
            </div>
          ))}
        </div>
      )}
      {dark && page.barChartLegend && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {page.barChartLegend.map((lg) => (
            <div key={lg.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#8a958d" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: lg.color }} />
              {lg.name}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: dark ? 20 : 0, justifyContent: "center", flexWrap: "wrap" }}>
        {page.barChartGroups.map((grp, i) => (
          <div key={i} style={{ width: dark ? 86 : 118, flex: dark ? undefined : "0 0 118px", padding: dark ? 0 : "0 12px", borderRight: dark ? undefined : grp.isLast }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: dark ? 6 : grp.gap, height: dark ? 110 : 140, borderBottom: dark ? "1px solid #333a35" : "1px solid #e6e7e3" }}>
              {grp.bars.map((b, j) => (
                <div key={j} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", width: dark ? 24 : b.w }}>
                  <div style={{ fontSize: dark ? 11 : 10.5, fontWeight: 700, color: dark ? "#eef2ef" : "#1f2421", marginBottom: dark ? 3 : 4 }}>{b.valueLabel}</div>
                  <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: b.color, height: b.h }} />
                </div>
              ))}
            </div>
            {grp.label && (
              <div style={{ fontSize: dark ? 11 : 11.5, fontWeight: 600, color: dark ? "#8a958d" : "#8a8f8a", textAlign: "center", marginTop: dark ? 8 : 10, lineHeight: 1.35 }}>{grp.label}</div>
            )}
          </div>
        ))}
      </div>
    </ExhibitFrame>
  );
}

export function LineChart({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.lineChartPointsStr) return null;
  const grid = dark ? "#333a35" : "#f2f3f0";
  const axis = dark ? "#8a958d" : "#8a8f8a";
  return (
    <ExhibitFrame dark={dark} title={page.lineChartTitle}>
      <div style={{ position: "relative", width: "100%", height: 210 }}>
        <svg viewBox="0 0 640 210" style={{ width: "100%", height: 210, display: "block" }}>
          {page.lineChartGridY?.map((g, i) => (
            <line key={i} x1={40} y1={g.y} x2={620} y2={g.y} stroke={grid} strokeWidth={1} />
          ))}
          <polyline points={page.lineChartPointsStr} fill="none" stroke={page.lineChartColor} strokeWidth={2.5} />
          {page.lineChartPoints?.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={page.lineChartColor} />
          ))}
        </svg>
        {page.lineChartGridY?.map((g, i) => (
          <div key={i} style={{ position: "absolute", left: "5%", top: `${g.topPct}%`, transform: "translate(-100%,-50%)", fontSize: 10, color: axis, whiteSpace: "nowrap" }}>
            {g.label}
          </div>
        ))}
        {page.lineChartPoints?.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: `${p.leftPct}%`, top: "92.9%", transform: "translate(-50%,-50%)", fontSize: 10, color: axis, whiteSpace: "nowrap" }}>
            {p.month}
          </div>
        ))}
      </div>
      {page.lineChartXLabel && (
        <div style={{ textAlign: "center", fontSize: 11, color: axis, marginTop: 6 }}>{page.lineChartXLabel}</div>
      )}
    </ExhibitFrame>
  );
}

// Small pictograms for exhibit rows (24x24 viewBox, currentColor).
const ICONS: Record<string, React.ReactNode> = {
  shirt: (
    <>
      <path d="M8 3 3 6v5l3 1v9h12v-9l3-1V6l-5-3" />
      <path d="M8 3l4 4 4-4" />
      <path d="M12 7v10" />
    </>
  ),
  cuffs: (
    <>
      <circle cx="8" cy="15" r="5" />
      <circle cx="17" cy="8" r="4" />
      <path d="M11.5 11.5 14 10.5" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2.5 19 5v6c0 5-3 8.5-7 10.5C8 19.5 5 16 5 11V5z" />
      <path d="m12 8 1.2 2.5 2.8.4-2 2 .5 2.8L12 14.3 9.5 15.700l.5-2.800-2-2 2.800-.4z" fill="currentColor" stroke="none" />
    </>
  ),
  vest: <path fill="currentColor" d="M7 3l3 3 2 2 2-2 3-3 3 3-1 3v12H5V9L4 6z" />,
  holster: (
    <>
      <rect x="3" y="12" width="18" height="4" rx="1" />
      <path d="M8 12V8l4-1h5v5" />
      <path d="M6 16v4h4v-4" />
    </>
  ),
  shield: <path fill="currentColor" d="M12 2.5 20 5.500v6c0 5.200-3.400 8.700-8 10.500-4.600-1.800-8-5.300-8-10.500v-6z" />,
  camera: (
    <>
      <path fill="currentColor" d="M3 8l13-3 2 5-13 3z" />
      <path d="M10 13l-1 5h3M2 17l2-3" />
    </>
  ),
};

function RowIcon({ name, dark }: { name: string; dark?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "0 0 22px", color: dark ? "#dbe3dd" : "#1f2421" }}
    >
      {ICONS[name]}
    </svg>
  );
}

// Harvey ball ("sundisc"): a circle filled clockwise from 12 o'clock by `fill` (0-1).
function HarveyBall({ fill, dark, label }: { fill: number; dark?: boolean; label: string }) {
  const c = dark ? "#dbe3dd" : "#1f2421";
  const r = 10;
  const a = fill * 2 * Math.PI;
  const x = 12 + r * Math.sin(a);
  const y = 12 - r * Math.cos(a);
  const wedge = fill >= 1 ? undefined : `M12 12 L12 2 A${r} ${r} 0 ${fill > 0.5 ? 1 : 0} 1 ${x.toFixed(3)} ${y.toFixed(3)} Z`;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" role="img" aria-label={label} style={{ display: "block" }}>
      <circle cx={12} cy={12} r={r} fill={fill >= 1 ? c : "none"} stroke={c} strokeWidth={1.4} />
      {wedge && <path d={wedge} fill={c} />}
    </svg>
  );
}

export function DataTable({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.dataTableRows || !page.dataTableHeaders) return null;
  const head = dark ? "#8a958d" : "#8a8f8a";
  const border = dark ? "1px solid #333a35" : "1px solid #f2f3f0";
  return (
    <ExhibitFrame dark={dark}>
      {page.dataTableTitle && (
        <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#8a958d" : "#5b615c", marginBottom: 14, textAlign: "center" }}>{page.dataTableTitle}</div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: page.dataTableCols, gap: 0, fontSize: 12.5, minWidth: 280, maxWidth: dark ? undefined : 560, margin: "0 auto" }}>
        {page.dataTableHeaders.map((h, i) => (
          <div key={i} style={{ fontWeight: 600, color: head, padding: "5px 4px", textAlign: h.align }}>{h.v}</div>
        ))}
        {page.dataTableRows.map((row, i) => (
          <div key={i} style={{ display: "contents" }}>
            {row.cells.map((c, j) => (
              <div
                key={j}
                style={{
                  padding: "8px 4px",
                  borderTop: border,
                  textAlign: c.align,
                  fontWeight: c.w,
                  color: dark ? "#dbe3dd" : c.fg,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: c.align === "center" ? "center" : c.align === "right" ? "flex-end" : "flex-start",
                }}
              >
                {c.icon && <RowIcon name={c.icon} dark={dark} />}
                {c.harvey !== undefined ? <HarveyBall fill={c.harvey} dark={dark} label={c.v} /> : c.v}
              </div>
            ))}
          </div>
        ))}
      </div>
      {page.dataTableFootnote && (
        <div style={{ fontSize: 11, color: head, textAlign: "right", maxWidth: dark ? undefined : 560, margin: "12px auto 0" }}>{page.dataTableFootnote}</div>
      )}
    </ExhibitFrame>
  );
}

export function SegmentTable({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.segmentTable) return null;
  const head = dark ? "#8a958d" : "#8a8f8a";
  const border = dark ? "1px solid #333a35" : "1px solid #f2f3f0";
  const cols = ["Local", "Regional", "Long-haul", "Total"] as const;
  return (
    <ExhibitFrame dark={dark} title={dark ? undefined : page.segmentTitle}>
      {page.segmentTable.map((tb, i) => (
        <div key={i} style={{ marginBottom: 18, paddingTop: tb.padTop, borderTop: dark && tb.divider !== "none" ? "1px solid #333a35" : tb.divider }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: head, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>{tb.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr 1fr", gap: 0, fontSize: 12.5, minWidth: 300 }}>
            <div style={{ fontWeight: 600, color: head, padding: "5px 4px" }}>Firm</div>
            {cols.map((c) => (
              <div key={c} style={{ fontWeight: 600, color: head, padding: "5px 4px", textAlign: "right" }}>{c}</div>
            ))}
            {tb.rows.map((r, j) => {
              const fg = dark ? "#dbe3dd" : r.fg;
              return (
                <div key={j} style={{ display: "contents" }}>
                  <div style={{ padding: "5px 4px", borderTop: border, fontWeight: r.w, color: fg }}>{r.name}</div>
                  <div style={{ padding: "5px 4px", borderTop: border, textAlign: "right", color: fg }}>{r.local}</div>
                  <div style={{ padding: "5px 4px", borderTop: border, textAlign: "right", color: fg }}>{r.regional}</div>
                  <div style={{ padding: "5px 4px", borderTop: border, textAlign: "right", color: fg }}>{r.long}</div>
                  <div style={{ padding: "5px 4px", borderTop: border, textAlign: "right", fontWeight: 600, color: fg }}>{r.total}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </ExhibitFrame>
  );
}

// Renders only the visual exhibit(s) a page carries (never interviewer-only
// prose). Used for the candidate's dark screen and inline in the light page render.
export function PageExhibit({ page, dark }: { page: CasePage; dark?: boolean }) {
  return (
    <>
      <StackedBar page={page} dark={dark} />
      <GroupedBars page={page} dark={dark} />
      <CostTable page={page} dark={dark} />
      <LineChart page={page} dark={dark} />
      <SegmentTable page={page} dark={dark} />
      <DataTable page={page} dark={dark} />
    </>
  );
}

// A complete interviewer-facing page: the prompt (ready), or the ordered Q&A
// blocks (say-next, guidance, exhibits, calc, answer, insight, guidance), or the
// cheat sheet. `sayLabel` distinguishes "Interviewer says" (doc) from
// "Say next" (Live Mock). NEVER render this for an interviewee.
export function PageBody({ page, sayLabel = "Interviewer says" }: { page: CasePage; sayLabel?: string }) {
  if (page.kind === "ready") {
    return (
      <>
        <div style={{ fontSize: 14.5, lineHeight: 1.65, color: "#2a2f2b", background: "#fafbf9", borderRadius: 10, padding: 18, whiteSpace: "pre-wrap" }}>
          {page.body}
        </div>
        {page.note && <div style={{ fontSize: 12, color: "#8a8f8a", marginTop: 10 }}>{page.note}</div>}
      </>
    );
  }

  if (page.kind === "cheat") {
    return <CheatSheet rows={page.cheatRows ?? []} takeaway={page.cheatTakeaway} />;
  }

  return (
    <>
      {page.qText && <SayNextBox text={page.qText} label={sayLabel} />}
      {page.guidancePreLines && (
        <GuidancePreBox label={page.guidancePreLabel} note={page.guidancePreNote} intro={page.guidancePreIntro} lines={page.guidancePreLines} />
      )}
      <StackedBar page={page} />
      <GroupedBars page={page} />
      <CostTable page={page} />
      {page.infoSections && <InfoSectionsBox label={page.infoBoxLabel} sections={page.infoSections} />}
      <LineChart page={page} />
      <SegmentTable page={page} />
      <DataTable page={page} />
      {page.calcLines && <CalcBox note={page.calcNote} lines={page.calcLines} />}
      {page.answerText && page.answerBonusLines ? (
        <AnswerGroup
          answer={page.answerText}
          insightLabel={page.insightLabel}
          insight={page.insightText}
          bonusLabel={page.answerBonusLabel}
          bonusLines={page.answerBonusLines}
        />
      ) : (
        <>
          {page.answerText && <AnswerBox text={page.answerText} />}
          {page.insightText && <InsightBox text={page.insightText} />}
        </>
      )}
      {page.nextStepText && <SayNextBox text={page.nextStepText} label="Next step" />}
      {page.guidanceLines && <GuidanceBox label={page.guidanceLabel} lines={page.guidanceLines} />}
    </>
  );
}
