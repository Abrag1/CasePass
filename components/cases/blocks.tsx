// Pure presentational renderers for the page-object case model (lib/cases/content.ts).
// No hooks or state of its own -> usable from both the server-rendered case doc and
// the client-rendered Live Mock (the optional Present wrapper is a client component). Exhibit renderers take a `dark` prop so the same
// chart renders on the interviewer's light panel and the candidate's dark screen.
//
// The callout boxes are the only four styles case content ever uses (per the
// handoff design system): Say-next (blue), Guidance (dashed), Calc (gray),
// Answer (green). Keep their label casing/weight consistent.

import { pageHasExhibit, type CalcSheet, type CalcTableData, type SheetTable, type CasePage, type ChartTitleStyle, type InfoSection, type TreeNode } from "@/lib/cases/content";
import { Presentable, type ShareControl } from "@/components/interview/Presenter";
import { ExhibitFrame, chartInk } from "@/components/cases/charts/chart-kit";
import { ExtraCharts } from "@/components/cases/charts";

/* ---------------------------------- callouts --------------------------------- */

// Minimal inline markup so key points stand out instead of whole blocks being bold:
//   **bold**       -> <strong>   (key terms, instructions)
//   ==highlight==  -> soft marker (key figures and results)
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.+?\*\*|==.+?==)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("==") && part.endsWith("==") && part.length > 4) {
          return (
            <mark key={i} style={{ background: "#fbefc2", color: "inherit", fontWeight: 600, borderRadius: 3, padding: "0 3px" }}>
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function SayNextBox({ text, label = "Interviewer says" }: { text: string; label?: string }) {
  return (
    <div style={{ background: "#eef2f6", border: "1px solid #d7e0e8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#3d5a72", fontWeight: 700, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "#223140", whiteSpace: "pre-wrap" }}><Rich text={text} /></div>
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
      {note && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#8a8f8a", fontStyle: "italic", marginBottom: 8 }}><Rich text={note} /></div>}
      {intro && <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", marginBottom: 8 }}><Rich text={intro} /></div>}
      {lines?.map((g, i) => {
        // Each two leading spaces indent a line one level under the line above (up to two levels).
        const depth = Math.min(2, Math.floor((g.length - g.trimStart().length) / 2));
        return (
          <div key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", padding: "4px 0", paddingLeft: depth * 20, display: "flex", gap: 8 }}>
            <span style={{ color: "#8a8f8a" }}>{depth === 1 ? "–" : "•"}</span>
            <span><Rich text={g.trim()} /></span>
          </div>
        );
      })}
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
        // Each two leading spaces indent a line one level under the line above (up to two levels).
        const depth = Math.min(2, Math.floor((g.length - g.trimStart().length) / 2));
        return (
          <div key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b", padding: "4px 0", paddingLeft: depth * 20, display: "flex", gap: 8 }}>
            <span style={{ color: "#8a8f8a" }}>{depth === 0 ? "–" : depth === 1 ? "•" : "–"}</span>
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
      {note && <div style={{ fontSize: 12, color: "#8a8f8a", marginBottom: 8, fontStyle: "italic" }}><Rich text={note} /></div>}
      {lines.map((cl, i) => {
        // Multi-step / long expressions read better stacked under their label.
        const stack = cl.stack ?? cl.a.includes("\n");
        return (
          <div key={i} style={{ display: "flex", flexDirection: stack ? "column" : "row", justifyContent: "space-between", gap: stack ? 3 : 14, padding: "7px 0", borderTop: "1px solid #f2f3f0", fontSize: 13.5, flexWrap: "wrap" }}>
            <span style={{ color: "#3a3f3b", minWidth: 0, overflowWrap: "break-word", fontWeight: stack ? 700 : 400 }}>{cl.q}</span>
            <span style={{ fontWeight: stack ? 400 : 600, color: "#1f2421", textAlign: stack ? "left" : "right", overflowWrap: "break-word", whiteSpace: "pre-line", lineHeight: 1.6 }}><Rich text={cl.a} /></span>
          </div>
        );
      })}
    </div>
  );
}

// Walkthrough laid out as a table (one row per item, one column per scenario) so a
// total row can sit directly under the rows it sums. Cells accept **bold** / ==highlight==.
function PlainCalcTable({ table }: { table: CalcTableData }) {
  const ncols = Math.max(table.headers.length, table.rows[0]?.length ?? 0);
  const cols = table.cols ?? `repeat(${ncols}, 1fr)`;
  const K = "1px solid #000";
  const last = ncols - 1;
  return (
    <div style={{ background: "#fafbf9", border: "1px solid #e6e7e3", borderRadius: 10, padding: "16px 18px", marginBottom: 14, overflowX: "auto" }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 700, marginBottom: 10 }}>
        {table.title ?? "Calculation walkthrough"}
      </div>
      {table.subtitle && <div style={{ fontSize: 16, color: "#1f2421", marginBottom: 6 }}>{table.subtitle}</div>}
      <div style={{ display: "grid", gridTemplateColumns: cols, fontSize: 13.5, minWidth: 460, color: "#1f2421" }}>
        {table.headers.map((h, i) => {
          const hs = table.headerSpans?.find((x) => x.col === i);
          if (table.headerSpans?.some((x) => i > x.col && i < x.col + x.span)) return null;
          return (
          <div
            key={i}
            style={{
              ...(hs ? { gridColumn: `span ${hs.span}` } : {}),
              padding: "5px 8px",
              ...(table.slideRules ? { display: "flex", alignItems: "flex-end", borderTop: "2px solid #000" } : {}),
              fontWeight: 700,
              textAlign: table.gridBorders ? (table.center && !table.leftCols?.includes(i) ? "center" : "left") : table.headerBg && !table.center ? "left" : "center",
              background: table.headerBg,
              color: table.headerBg ? (table.headerFg ?? "#ffffff") : "#1f2421",
              borderBottom: table.headerRule && i > 0 ? K : undefined,
              ...(table.cellBorder ? { borderRight: `2px solid ${table.cellBorder}` } : {}),
              ...(table.gridBorders ? { borderTop: "1px solid #000", borderRight: "1px solid #000", borderBottom: "1px solid #000", ...(i === 0 ? { borderLeft: "1px solid #000" } : {}) } : {}),
            }}
          >
            {h}
          </div>
          );
        })}
        {table.rows.map((row, ri) =>
          row.map((cell, ci) => {
            const sp = table.spans?.find((x) => x.row === ri && x.col === ci);
            if (table.spans?.some((x) => x.row === ri && ci > x.col && ci < x.col + x.span)) return null;
            const box = table.boxRows;
            const inBox = !!box && ri >= box[0] && ri <= box[1];
            const ruled = table.rulesAbove?.includes(ri) || (inBox && ri === box![0]);
            return (
              <div
                key={`${ri}-${ci}`}
                style={{
                  padding: "5px 8px",
                  minHeight: 22,
                  background: table.rowBg?.[ri],
                  fontWeight: table.boldRows?.includes(ri) || table.boldCols?.includes(ci) || sp?.bold ? 700 : 400,
                  color: table.colColors?.[ci],
                  ...(sp ? { gridColumn: `span ${sp.span}`, textDecoration: sp.underline ? "underline" : undefined } : {}),
                  textAlign: table.rightCols?.includes(ci) ? "right" : table.center && !table.leftCols?.includes(ci) ? "center" : "left",
                  ...(ci === 0 && table.rowStyles?.[ri]?.indent ? { paddingLeft: 8 + table.rowStyles[ri].indent! * 18 } : {}),
                  borderTop: ruled && !table.ruleSkipCols?.includes(ci) ? K : undefined,
                  ...(table.slideRules && ri === table.rows.length - 1 ? { borderBottom: "2px solid #000" } : {}),
                  borderBottom: inBox && ri === box![1] ? K : undefined,
                  borderLeft: inBox && ci === 0 ? K : undefined,
                  borderRight: inBox && ci === last ? K : undefined,
                  ...(table.cellBorder ? { borderRight: `2px solid ${table.cellBorder}`, borderTop: `2px solid ${table.cellBorder}` } : {}),
                  ...(table.gridBorders ? { borderRight: "1px solid #000", borderBottom: "1px solid #000", ...(ci === 0 ? { borderLeft: "1px solid #000" } : {}) } : {}),
                }}
              >
                {cell.split("\n").map((ln, li) =>
                  ln.startsWith("- ") ? (
                    <div key={li} style={{ display: "flex", gap: 8, textAlign: "left", fontSize: 12.5, padding: "1px 0" }}>
                      <span>•</span>
                      <span><Rich text={ln.slice(2)} /></span>
                    </div>
                  ) : (
                    <div key={li}><Rich text={ln} /></div>
                  ),
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

export function CalcTableBox({ note, table }: { note?: string; table: CalcTableData }) {
  if (table.plain) return <PlainCalcTable table={table} />;
  const ncols = Math.max(table.headers.length, table.rows[0]?.length ?? 0);
  const cols = `minmax(110px, 0.9fr) ${Array.from({ length: ncols - 1 }, () => (ncols > 5 ? "minmax(70px, 1fr)" : "minmax(170px, 1.4fr)")).join(" ")}`;
  return (
    <div style={{ background: "#fafbf9", border: "1px solid #e6e7e3", borderRadius: 10, padding: "16px 18px", marginBottom: 14, overflowX: "auto" }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 700, marginBottom: 10 }}>
        {table.title ?? "Calculation walkthrough"}
      </div>
      {note && <div style={{ fontSize: 12, color: "#8a8f8a", marginBottom: 10, fontStyle: "italic" }}><Rich text={note} /></div>}
      <div style={{ display: "grid", gridTemplateColumns: cols, fontSize: 13.5, minWidth: ncols > 5 ? 0 : 460 }}>
        {table.headers.map((h, i) => (
          <div key={i} style={{ padding: "6px 8px", fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", fontWeight: 700, color: "#8a8f8a", borderBottom: "1px solid #e6e7e3" }}>
            {h}
          </div>
        ))}
        {table.rows.map((row, ri) => {
          const total = !!table.totalLast && ri === table.rows.length - 1;
          return row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={{
                padding: "10px 8px",
                borderTop: total ? "2px solid #d7d9d4" : "1px solid #f2f3f0",
                background: total ? "#f2f4f0" : undefined,
                fontWeight: total ? 700 : ci === 0 ? (table.rowStyles?.[ri]?.bold ?? true) ? 700 : 400 : 400,
                paddingLeft: ci === 0 && table.rowStyles?.[ri]?.indent ? 8 + table.rowStyles[ri].indent! * 18 : undefined,
                color: "#1f2421",
                lineHeight: 1.55,
              }}
            >
              {ci === 0 && table.rowStyles && cell.includes("\n") ? (
                <>
                  <Rich text={cell.split("\n")[0]} />
                  <div style={{ fontSize: 11.5, fontWeight: 400, color: "#5b615c", lineHeight: 1.35 }}>{cell.split("\n").slice(1).join(" ")}</div>
                </>
              ) : (
                <Rich text={cell} />
              )}
            </div>
          ));
        })}
      </div>
    </div>
  );
}

function SheetTableView({ t }: { t: SheetTable }) {
  const cell = (c: { v: string; color?: string; bold?: boolean; align?: "left" | "center" }, k: string, head = false) => (
    <div key={k} style={{ border: "1px solid #000", margin: "0 -1px -1px 0", padding: "3px 6px", fontSize: 13, textAlign: c.align ?? "center", color: c.color ?? "#000", fontWeight: c.bold || head ? 400 : 400, background: "#fff" }}>
      {c.v}
    </div>
  );
  return (
    <div>
      <div style={{ background: "#000", color: "#fff", textAlign: "center", fontSize: 13, padding: "3px 6px" }}>{t.title}</div>
      <div style={{ display: "grid", gridTemplateColumns: t.cols }}>
        {t.headers.map((h, i) => cell(h, `h${i}`, true))}
        {t.rows.flatMap((r, ri) => r.map((c, ci) => cell(c, `${ri}-${ci}`)))}
      </div>
    </div>
  );
}

// Spreadsheet-style working: tables side by side, then a table with the formulas to its right.
export function CalcSheetBox({ sheet, label }: { sheet: CalcSheet; label?: string }) {
  const line = (ln: string, i: number) => {
    const sub = ln.startsWith("  ");
    const top = ln.startsWith("- ");
    return (
      <div key={i} style={{ display: "flex", gap: 8, padding: "2px 0", paddingLeft: sub ? 22 : 0, fontSize: 13.5, color: "#1f2421" }}>
        {(top || sub) && <span>{sub ? "–" : "•"}</span>}
        <span>{top ? ln.slice(2) : ln.trim()}</span>
      </div>
    );
  };
  return (
    <div style={{ background: "#fafbf9", border: "1px solid #e6e7e3", borderRadius: 10, padding: "16px 18px", marginBottom: 14, overflowX: "auto" }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#8a8f8a", fontWeight: 700, marginBottom: 12 }}>{label ?? "Analysis"}</div>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", minWidth: 560 }}>
        <div style={{ flex: 3 }}><SheetTableView t={sheet.top[0]} /></div>
        {sheet.top[1] && <div style={{ flex: 1 }}><SheetTableView t={sheet.top[1]} /></div>}
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginTop: 18, minWidth: 560 }}>
        <div style={{ flex: 1 }}><SheetTableView t={sheet.bottom} /></div>
        <div style={{ flex: 2.4 }}>{sheet.bottomLines.map(line)}</div>
      </div>
      {sheet.footerLines && <div style={{ marginTop: 18 }}>{sheet.footerLines.map(line)}</div>}
    </div>
  );
}

export function AnswerBox({ text }: { text: string }) {
  // Answers with **bold** / ==highlight== markup stay regular weight so only the marked key
  // points stand out; plain answers stay bold.
  const selective = text.includes("**") || text.includes("==");
  return (
    <div style={{ background: "#e9f1ec", border: "1px solid #cfe3d7", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 11, letterSpacing: ".05em", textTransform: "uppercase", color: "#2d6a4f", fontWeight: 600, marginBottom: 5 }}>Answer</div>
      <div style={{ fontSize: 14, fontWeight: selective ? 400 : 600, color: "#1c3a2c", lineHeight: 1.5 }}>
        {text.split("\n").map((ln, i) => {
          // "- " = top-level bullet; lines indented with two spaces = sub-bullets.
          const sub = ln.startsWith("  ");
          const top = ln.startsWith("- ");
          return (
            <div key={i} style={{ display: "flex", gap: 8, padding: sub ? "1px 0" : "3px 0", paddingLeft: sub ? 22 : 0 }}>
              {top && <span style={{ color: "#2d6a4f" }}>•</span>}
              <span><Rich text={top ? ln.slice(2) : ln.trim()} /></span>
            </div>
          );
        })}
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
        <div key={i} style={{ marginBottom: 16, marginTop: sec.spaceBefore }}>
          {sec.label && (
            <div style={{ fontSize: sec.labelSize ?? "13px", fontWeight: 700, color: "#3a3f3b", marginBottom: 8 }}>
              {sec.label}{" "}
              {sec.labelNote && <span style={{ fontWeight: 500, fontStyle: "italic", color: "#8a8f8a" }}>{sec.labelNote}</span>}
            </div>
          )}
          {sec.paragraphs?.map((pg, j) => (
            <div key={j} style={{ fontSize: 13.5, lineHeight: 1.6, color: "#3a3f3b", marginBottom: 8 }}><Rich text={pg} /></div>
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
              {grp.items.map((it, k) => {
                // Items that start with two spaces are sub-bullets of the item above.
                const sub = it.startsWith("  ");
                return (
                  <div key={k} style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3f3b", padding: "3px 0 3px 16px", paddingLeft: sub ? 36 : 16, display: "flex", gap: 8 }}>
                    <span style={{ color: "#8a8f8a" }}>{sub ? "•" : "–"}</span>
                    <span><Rich text={it.trim()} /></span>
                  </div>
                );
              })}
            </div>
          ))}
          {sec.lines?.map((ln, j) => {
            // Lines that start with two spaces are sub-bullets of the line above.
            const sub = ln.startsWith("  ");
            return (
              <div key={j} style={{ fontSize: 13, lineHeight: 1.55, color: "#3a3f3b", padding: "3px 0", paddingLeft: sub ? 20 : 0, display: "flex", gap: 8 }}>
                <span style={{ color: "#8a8f8a" }}>{sub ? "–" : "•"}</span>
                <span><Rich text={ln.trim()} /></span>
              </div>
            );
          })}
          {sec.steps?.map((st, j) => (
            <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0" }}>
              <span style={{ width: 20, height: 20, flex: "0 0 20px", borderRadius: "50%", background: "#eef0ec", color: "#5b615c", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                {st.n}
              </span>
              <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3a3f3b" }}>
                <Rich text={st.text} />
                {st.sub?.map((sb, k) => (
                  <span key={k} style={{ display: "flex", gap: 8, fontSize: 13, paddingLeft: 4, paddingTop: 4 }}>
                    <span style={{ color: "#8a8f8a" }}>–</span>
                    <span><Rich text={sb} /></span>
                  </span>
                ))}
              </span>
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

/* ---------------- data-driven charts (geometry computed from values) ---------------- */

function fmtTick(v: number): string {
  return Number(v.toFixed(2)).toString();
}

export function PieChart({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.pieSlices) return null;
  const ink = chartInk(dark);
  const total = page.pieSlices.reduce((s, x) => s + x.value, 0);
  const cx = 280;
  const cy = 190;
  const r = 130;
  // Start at 12 o'clock and run clockwise.
  const starts = page.pieSlices.map(
    (_, i) => -Math.PI / 2 + (page.pieSlices!.slice(0, i).reduce((sum, x) => sum + x.value, 0) / total) * Math.PI * 2
  );
  const slices = page.pieSlices.map((sl, i) => {
    const sweep = (sl.value / total) * Math.PI * 2;
    const a0 = starts[i];
    const a1 = a0 + sweep;
    const mid = (a0 + a1) / 2;
    const pt = (rad: number, a: number) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
    const [x0, y0] = pt(r, a0);
    const [x1, y1] = pt(r, a1);
    const [px, py] = pt(r * 0.8, mid);
    const [lx, ly] = pt(r + 14, mid);
    const path =
      page.pieSlices!.length === 1
        ? `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`
        : `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x1} ${y1} Z`;
    return { ...sl, path, px, py, lx, ly, right: Math.cos(mid) >= 0 };
  });
  return (
    <ExhibitFrame dark={dark} title={page.pieTitle}>
      <svg viewBox="0 0 560 380" style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto" }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke={ink.sliceStroke} strokeWidth={1.5} />
        ))}
        {slices.map((s, i) => (
          <text key={`p${i}`} x={s.px} y={s.py} textAnchor="middle" dominantBaseline="middle" fontSize={s.value < 9 ? 14 : 17} fontWeight={700} fill="#fff">
            {Math.round((s.value / total) * 100)}%
          </text>
        ))}
        {slices.map((s, i) => (
          <text key={`l${i}`} x={s.lx} y={s.ly} textAnchor={s.right ? "start" : "end"} dominantBaseline="middle" fontSize={16} fill={ink.text}>
            {s.label}
          </text>
        ))}
      </svg>
    </ExhibitFrame>
  );
}

const SERIF_FACE = 'Cambria, "Times New Roman", Times, serif';

export function AxisBars({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.axisBarGroups || !page.axisBarSeries) return null;
  const ink = { ...chartInk(dark), bold: dark ? "#dbe3dd" : "#000000" };
  const yMax = page.axisBarYMax ?? 10;
  const yStep = page.axisBarYStep ?? 5;
  const left = 54;
  const legendRight = !!page.axisBarLegendRight;
  const right = legendRight ? 400 : 500;
  const top = 16;
  const bottom = 250;
  const plotW = right - left;
  const y = (v: number) => bottom - (v / yMax) * (bottom - top);
  const ticks: number[] = [];
  for (let v = 0; v <= yMax + 1e-9; v += yStep) ticks.push(v);
  const n = page.axisBarGroups.length;
  const m = page.axisBarSeries.length;
  const band = plotW / n;
  const barW = Math.min(34, (band * 0.7) / m);
  const touching = !!page.axisBarTouching;
  const gap = touching ? 0 : 8;
  const clusterW = m * barW + (m - 1) * gap;
  const rotX = page.axisBarRotateLabels ? 36 : 0;
  const topPad = page.axisBarInnerTitle ? 34 : 0;
  const serif = !!page.axisBarSerif;
  const centeredTitle = serif || !!page.axisBarTitleCentered;
  const serifTitle = centeredTitle && page.axisBarTitle ? page.axisBarTitle.split("\n") : [];
  const serifTitleH = serifTitle.length ? serifTitle.length * 25 + 14 : 0;
  return (
    <ExhibitFrame dark={dark} title={centeredTitle ? undefined : page.axisBarTitle}>
      <svg viewBox={`0 0 520 ${(touching ? 300 : 330) + rotX + topPad + serifTitleH}`} style={{ width: "100%", maxWidth: touching ? 680 : 560, display: "block", margin: "0 auto", fontFamily: serif ? SERIF_FACE : undefined }}>
        {touching && serifTitle.map((ln, i) => {
          const cut = i > 0 ? ln.indexOf(" (") : -1;
          return (
            <text key={`st${i}`} x={260} y={22 + i * 25} textAnchor="middle" fontSize={i === 0 ? 17 : 13} fontWeight={700} textDecoration={i === 0 ? "underline" : undefined} fill={ink.bold}>
              {cut > 0 ? (
                <>
                  {ln.slice(0, cut)}
                  <tspan fontWeight={400}>{ln.slice(cut)}</tspan>
                </>
              ) : (
                ln
              )}
            </text>
          );
        })}
        {!touching && serifTitle.map((ln, i) => (
          <text key={`st${i}`} x={(left + right) / 2} y={22 + i * 25} textAnchor="middle" fontSize={serif ? 21 : 19} fontWeight={serif ? 700 : 400} fill={ink.text}>
            {ln}
          </text>
        ))}
        {page.axisBarInnerTitle && (
          <text x={left - 40} y={22} fontSize={19} fill={ink.axis}>
            {page.axisBarInnerTitle}
          </text>
        )}
        <g transform={`translate(0 ${topPad + serifTitleH})`}>
        {page.axisBarNoYAxis && <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={ink.axis} strokeWidth={1} />}
        {page.axisBarAxisLines && (
          <>
            <line x1={left} x2={left} y1={top} y2={bottom} stroke={touching ? ink.bold : ink.axis} strokeWidth={touching ? 1.5 : 1} />
            <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={touching ? ink.bold : ink.axis} strokeWidth={touching ? 1.5 : 1} />
          </>
        )}
        {(page.axisBarNoYAxis ? [] : ticks).map((t) => (
          <g key={t}>
            {!page.axisBarNoGrid && <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />}
            <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={touching ? 15 : 13} fontWeight={touching ? 700 : undefined} fill={touching ? ink.bold : ink.axis}>
              {page.axisBarYTickPrefix ?? ""}{fmtTick(t)}{page.axisBarYTickSuffix ?? ""}
            </text>
          </g>
        ))}
        {page.axisBarYLabel && (
          <text transform={`translate(12 ${(top + bottom) / 2}) rotate(-90)`} textAnchor="middle" fontSize={13} fontWeight={700} fill={ink.text}>
            {page.axisBarYLabel}
          </text>
        )}
        {page.axisBarGroups.map((g, gi) => {
          const x0 = left + band * gi + (band - clusterW) / 2;
          return (
            <g key={gi}>
              {g.values.map((v, si) => (
                <rect key={si} x={x0 + si * (barW + gap)} y={y(v)} width={barW} height={bottom - y(v)} fill={page.axisBarSeries![si].color} stroke={touching ? "#000000" : undefined} strokeWidth={touching ? 0.8 : undefined} />
              ))}
              {page.axisBarValueLabels && page.axisBarLabelsAbove &&
                g.values.map((v, si) => (
                  <text key={`va${si}`} x={x0 + si * (barW + gap) + barW / 2} y={y(v) - 5} textAnchor="middle" fontSize={12} fontWeight={touching ? 700 : undefined} fill={page.axisBarValueInk ? ink.text : page.axisBarSeries![si].color === "#f4cccc" ? "#e6a8a8" : page.axisBarSeries![si].color}>
                    {fmtTick(v)}{page.axisBarYTickSuffix ?? ""}
                  </text>
                ))}
              {page.axisBarValueLabels && !page.axisBarLabelsAbove &&
                g.values.map((v, si) => (
                  <text key={`v${si}`} x={x0 + si * (barW + gap) + barW / 2} y={y(v) + 14} textAnchor="middle" fontSize={12} fill={(() => { const h = page.axisBarSeries![si].color; const c = /^#[0-9a-f]{6}$/i.test(h) ? parseInt(h.slice(1), 16) : 0xffffff; const lum = (0.299 * (c >> 16) + 0.587 * ((c >> 8) & 255) + 0.114 * (c & 255)) / 255; return lum < 0.55 ? "#ffffff" : "#222222"; })()}>
                    {fmtTick(v)}{page.axisBarYTickSuffix ?? ""}
                  </text>
                ))}
              <text x={left + band * gi + band / 2} y={bottom + 20} textAnchor={page.axisBarRotateLabels ? "end" : "middle"} transform={page.axisBarRotateLabels ? `rotate(-35 ${left + band * gi + band / 2} ${bottom + 20})` : undefined} fontSize={touching ? 12.5 : page.axisBarLabelsAbove ? 12 : 14} fontWeight={touching ? 700 : undefined} fill={touching ? ink.bold : ink.axis}>
                {g.label.split("\n").map((ln, k) => (
                  <tspan key={k} x={left + band * gi + band / 2} dy={k === 0 ? 0 : 14}>
                    {ln}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
        {(() => {
          const itemW = 110;
          const startX = 260 - (m * itemW) / 2;
          if (page.axisBarNoLegend) return null;
          return page.axisBarSeries.map((s, i) => (
            <g key={i} transform={page.axisBarLegendTopLeft ? `translate(${left + 10} ${34 + i * 20})` : legendRight ? `translate(${right + 12} ${120 + i * 22})` : `translate(${startX + i * itemW} ${308 + rotX})`}>
              <rect width={touching ? 14 : 10} height={touching ? 14 : 10} y={touching ? -7 : -5} fill={s.color} stroke={touching ? "#000000" : undefined} strokeWidth={touching ? 1 : undefined} />
              <text x={touching ? 20 : 16} dominantBaseline="middle" fontSize={14} fontWeight={touching ? 700 : undefined} fill={touching ? ink.bold : ink.axis}>
                {s.name}
              </text>
            </g>
          ));
        })()}
      </g>
      </svg>
    </ExhibitFrame>
  );
}

// Single-series column chart: per-bar colours, rotated category labels, dashed reference line.
export function ColBars({ page, dark }: { page: CasePage; dark?: boolean }) {
  const items = page.colBarItems;
  if (!items) return null;
  const ink = chartInk(dark);
  const yMax = page.colBarYMax ?? Math.max(...items.map((i) => i.value));
  const yStep = page.colBarYStep ?? 50;
  const left = 70;
  const right = 600;
  const top = 16;
  const bottom = 230;
  const yMin = page.colBarYMin ?? 0;
  const y = (v: number) => bottom - ((v - yMin) / (yMax - yMin)) * (bottom - top);
  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + 1e-9; v += yStep) ticks.push(v);
  // Bars start at zero, or at the axis minimum when it is above zero (axis not starting at 0).
  const base = Math.max(yMin, 0);
  const noGrid = !!page.colBarNoGrid;
  const band = (right - left) / items.length;
  const barW = band * (page.colBarBarRatio ?? 0.52);
  const ref = page.colBarRefLine;
  const horiz = !!page.colBarHorizontalLabels;
  const tickText = (t: number) =>
    (page.colBarYTickDecimals !== undefined ? t.toFixed(page.colBarYTickDecimals) : fmtTick(t)) + (page.colBarYTickSuffix ?? "");
  return (
    <ExhibitFrame dark={dark} title={page.colBarTitle} titleStyle={page.colBarTitleStyle}>
      {page.colBarSubtitle && <div style={{ fontSize: 13, color: ink.text, marginTop: -6, marginBottom: 10 }}>{page.colBarSubtitle}</div>}
      <svg viewBox="0 0 640 335" style={{ width: "100%", maxWidth: 720, display: "block", margin: "0 auto" }}>
        <defs>
          <pattern id="cb-dots" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="#ffffff" />
            <rect width="1.6" height="1.6" fill="#1a1a1a" />
          </pattern>
        </defs>
        {noGrid && !page.colBarNoYAxis && <line x1={left} x2={left} y1={top} y2={bottom} stroke={ink.axis} strokeWidth={1} />}
        {noGrid && <line x1={left} x2={right} y1={y(base)} y2={y(base)} stroke={ink.axis} strokeWidth={1} />}
        {ticks.map((t, ti) => (
          <g key={t}>
            {noGrid ? (
              page.colBarNoYAxis ? null : <line x1={left - 4} x2={left} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1} />
            ) : (
              <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />
            )}
            <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={11} fill={ink.axis}>
              {page.colBarYTickLabels?.[ti] ?? tickText(t)}
            </text>
          </g>
        ))}
        {page.colBarInnerNote && (
          <text x={right - 6} y={top + 14} textAnchor="end" fontSize={12} fill={ink.text}>
            {page.colBarInnerNote}
          </text>
        )}
        {page.colBarYLabel && (
          <text transform={`translate(14 ${(top + bottom) / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill={ink.axis}>
            {page.colBarYLabel}
          </text>
        )}
        {items.map((it, i) => {
          const cx = left + band * (i + 0.5);
          return (
            <g key={i}>
              <rect x={cx - barW / 2} y={Math.min(y(it.value), y(base))} width={barW} height={Math.abs(y(base) - y(it.value))} fill={it.pattern === "dots" ? "url(#cb-dots)" : it.color} stroke={it.innerLabel ? "#111111" : undefined} strokeWidth={it.innerLabel ? 1 : undefined} />
              {page.colBarValueLabels && (
                <text x={cx} y={it.value < 0 ? y(it.value) + 14 : y(it.value) - 6} textAnchor="middle" fontSize={11} fill={ink.text}>
                  {it.valueLabel ?? fmtTick(it.value)}
                </text>
              )}
              {it.innerLabel && (
                <text transform={`translate(${cx + 4} ${(y(it.value) + y(base)) / 2}) rotate(-90)`} textAnchor="middle" fontSize={9} fill="#111111">
                  {it.innerLabel}
                </text>
              )}
              {horiz ? (
                <text x={cx} y={bottom + 18} textAnchor="middle" fontSize={11} fill={ink.axis}>
                  {it.label.split("\n").map((ln, k) => (
                    <tspan key={k} x={cx} dy={k === 0 ? 0 : 14}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              ) : (
                <text transform={`translate(${cx + 4} ${bottom + 8}) rotate(-90)`} textAnchor="end" fontSize={9.5} fill={ink.axis}>
                  {it.label}
                </text>
              )}
            </g>
          );
        })}
        {page.colBarCallouts?.map((co, ci) => {
          const x1 = left + band * (co.from + 0.5);
          const x2 = left + band * (co.to + 0.5);
          const yTop = y(co.level);
          const yFrom = y(items[co.from].value) - 20;
          const yTo = y(items[co.to].value) - 20;
          const mid = (x1 + x2) / 2;
          return (
            <g key={`co${ci}`} stroke={ink.axis} strokeWidth={1} fill="none">
              <path d={`M${x1} ${yFrom} V${yTop} H${x2} V${yTo}`} />
              <path d={`M${x2 - 3.5} ${yTo - 6} L${x2} ${yTo} L${x2 + 3.5} ${yTo - 6} Z`} fill={ink.axis} />
              <rect x={mid - 22} y={yTop - 9} width={44} height={18} rx={9} fill={dark ? "#1b1f1c" : "#ffffff"} />
              <text x={mid} y={yTop} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill={ink.text} stroke="none">
                {co.label}
              </text>
            </g>
          );
        })}
        {ref && (
          <g>
            <line x1={left} x2={right + 24} y1={y(ref.value)} y2={y(ref.value)} stroke={ref.color} strokeWidth={2} strokeDasharray="7 5" />
            {ref.label && (
              <text x={right + 12} y={y(ref.value) - 10} textAnchor="middle" fontSize={12} fontWeight={700} fill={dark ? "#dbe3dd" : "#14285f"}>
                {ref.label}
              </text>
            )}
          </g>
        )}
        {page.colBarLegend && (
          <g transform={`translate(${right - 118} ${bottom - 40})`}>
            {page.colBarLegend.map((lg, li) => (
              <g key={li} transform={`translate(0 ${li * 20})`}>
                <rect width={16} height={12} y={-6} fill={lg.pattern === "dots" ? "url(#cb-dots)" : lg.color} />
                <text x={22} dominantBaseline="middle" fontSize={11} fill={ink.text}>
                  {lg.name}
                </text>
              </g>
            ))}
          </g>
        )}
        {page.colBarXTitle && (
          <text x={(left + right) / 2} y={items.every((it) => !it.label) ? bottom + 24 : 326} textAnchor="middle" fontSize={12} fill={ink.axis}>
            {page.colBarXTitle}
          </text>
        )}
      </svg>
    </ExhibitFrame>
  );
}

// Stacked columns or waterfall bars on a numeric Y axis (floating segments), legend on the right.
export function AxisStacks({ page, dark }: { page: CasePage; dark?: boolean }) {
  const cols = page.axisStackCols;
  if (!cols) return null;
  const ink = chartInk(dark);
  const yMax = page.axisStackYMax ?? 10;
  const yStep = page.axisStackYStep ?? 1;
  const legend = page.axisStackLegend;
  const below = !!page.axisStackLegendBelow && !!legend;
  const left = 56;
  const right = legend && !below ? 500 : 640;
  const top = 22;
  const bottom = 250;
  const y = (v: number) => bottom - (v / yMax) * (bottom - top);
  const ticks: number[] = [];
  for (let v = 0; v <= yMax + 1e-9; v += yStep) ticks.push(v);
  const band = (right - left) / cols.length;
  const barW = band * (page.axisStackBarRatio ?? 0.56);
  const lscale = page.axisStackLegendScale ?? 1;
  const spans = cols.map((c) => {
    let acc = 0;
    return c.segs.map((s) => {
      const from = s.base ?? acc;
      acc = from + s.value;
      return { from, to: acc, color: s.color };
    });
  });
  return (
    <ExhibitFrame dark={dark} title={page.axisStackTitle} titleStyle={page.axisStackTitleStyle}>
      {page.axisStackSubtitle && <div style={{ fontSize: 14, color: ink.text, marginTop: -6, marginBottom: 10 }}>{page.axisStackSubtitle}</div>}
      <svg viewBox={`0 0 ${legend && !below ? 640 : 680} ${below ? 350 : 320}`} style={{ width: "100%", maxWidth: 720, display: "block", margin: "0 auto" }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={t === 0 && !page.axisStackLightBaseline ? ink.axis : ink.grid} strokeWidth={1} />
            <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill={ink.text}>
              {t === 0 && page.axisStackZeroLabel ? page.axisStackZeroLabel : (page.axisStackYTickPrefix ?? "") + t.toLocaleString("en-US")}
            </text>
          </g>
        ))}
        {page.axisStackConnectors &&
          spans.slice(0, -1).map((sp, i) => {
            const v = sp[sp.length - 1].to;
            return (
              <line key={`c${i}`} x1={left + band * (i + 0.5) + barW / 2} x2={left + band * (i + 1.5) - barW / 2} y1={y(v)} y2={y(v)} stroke={ink.axis} strokeWidth={0.8} strokeDasharray="2 2" />
            );
          })}
        {cols.map((c, i) => {
          const cx = left + band * (i + 0.5);
          const lines = c.label.split("\n");
          const topV = Math.max(...spans[i].map((s) => s.to));
          return (
            <g key={i}>
              {spans[i].map((s, j) => (
                <rect key={j} x={cx - barW / 2} y={y(s.to)} width={barW} height={y(s.from) - y(s.to)} fill={s.color} />
              ))}
              {c.topLabel && (
                <text x={cx} y={y(topV) - 6} textAnchor="middle" fontSize={13} fill={ink.text}>
                  {c.topLabel}
                </text>
              )}
              {lines.map((ln, k) => (
                <text key={k} x={cx} y={bottom + 20 + k * 14} textAnchor="middle" fontSize={11.5} fontWeight={page.axisStackLabelsRegular ? 400 : 700} fill={ink.text}>
                  {ln}
                </text>
              ))}
            </g>
          );
        })}
        {legend &&
          legend.map((l, i) => (
            <g key={i} transform={below ? `translate(${left + 40 + (i % 2) * 220} ${296 + Math.floor(i / 2) * 22})` : `translate(${right + 24} ${60 + i * 24})`}>
              <rect width={14 * lscale} height={14 * lscale} y={-7 * lscale} fill={l.color} />
              <text x={20 * lscale} dominantBaseline="middle" fontSize={13 * lscale} fill={ink.text}>
                {l.name}
              </text>
            </g>
          ))}
        {page.axisStackFootnote && (
          <text x={left} y={below ? 344 : 312} fontSize={11} fill={ink.text}>
            {page.axisStackFootnote}
          </text>
        )}
      </svg>
    </ExhibitFrame>
  );
}

function wrapWords(text: string, max: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if (cur && (cur + " " + w).length > max) {
      out.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) out.push(cur);
  return out;
}

// Panels of 100%-stacked columns (segment labels, legend, dashed connectors between columns).
export function StackPanels({ page, dark }: { page: CasePage; dark?: boolean }) {
  const panels = page.stackPanels;
  if (!panels) return null;
  const ink = chartInk(dark);
  const left = 44;
  const right = 250;
  const top = 36;
  const bottom = 216;
  const y = (v: number) => bottom - (v / 100) * (bottom - top);
  const tickStep = page.stackPanelsTickStep ?? 10;
  const ticks: number[] = [];
  for (let v = 0; v <= 100; v += tickStep) ticks.push(v);
  const noGrid = !!page.stackPanelsNoGrid;
  return (
    <ExhibitFrame dark={dark} title={page.stackPanelsTitle}>
      <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", justifyContent: "center" }}>
        {panels.map((pn, pi) => {
          const n = pn.columns.length;
          const band = (right - left) / n;
          const barW = band * 0.52;
          const cxOf = (ci: number) => left + band * (ci + 0.5);
          const widths = pn.legend.map((lg) => lg.name.length * 5 + 20);
          const total = widths.reduce((a, b) => a + b, 0);
          let lx = Math.max(4, (left + right) / 2 - total / 2);
          return (
            <div key={pi} style={{ flex: "1 1 0", maxWidth: 300, minWidth: 0 }}>
              <svg viewBox="0 0 270 300" style={{ width: "100%", display: "block" }}>
                <text x={4} y={10} fontSize={10} fontWeight={700} fill={ink.axis}>
                  {pn.title}
                </text>
                {pn.subtitle && (
                  <text x={4} y={19} fontSize={9} fill={ink.text}>
                    {pn.subtitle.split("\n").map((ln, k) => (
                      <tspan key={k} x={4} dy={k === 0 ? 0 : 10}>
                        {ln}
                      </tspan>
                    ))}
                  </text>
                )}
                {noGrid && <line x1={left} x2={left} y1={y(100)} y2={y(0)} stroke={ink.axis} strokeWidth={1} />}
                {noGrid && <line x1={left} x2={right} y1={y(0)} y2={y(0)} stroke={ink.axis} strokeWidth={1} />}
                {ticks.map((t) => (
                  <g key={t}>
                    {noGrid ? (
                      <line x1={left - 3} x2={left} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1} />
                    ) : (
                      <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />
                    )}
                    <text x={left - 5} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={8.5} fill={ink.axis}>
                      {noGrid && t === 0 ? "0" : `${t}%`}
                    </text>
                  </g>
                ))}
                {pn.columns.map((c, ci) => {
                  let acc = 0;
                  return (
                    <g key={ci}>
                      {c.segs.map((sg, si) => {
                        const y0 = y(acc);
                        acc += sg.value;
                        const y1 = y(acc);
                        return (
                          <g key={si}>
                            <rect x={cxOf(ci) - barW / 2} y={y1} width={barW} height={y0 - y1} fill={sg.color} />
                            {sg.label && (
                              <text x={cxOf(ci)} y={(y0 + y1) / 2} textAnchor="middle" dominantBaseline="middle" fontSize={9.5} fill={sg.labelColor ?? "#ffffff"}>
                                {sg.label}
                              </text>
                            )}
                          </g>
                        );
                      })}
                      {c.topLabel && (
                        <text x={cxOf(ci)} y={top - 8} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={dark ? "#dbe3dd" : "#14285f"}>
                          {c.topLabel}
                        </text>
                      )}
                      {wrapWords(c.label, 19).map((ln, li) => (
                        <text key={li} x={cxOf(ci)} y={bottom + 14 + li * 11} textAnchor="middle" fontSize={9} fill={ink.axis}>
                          {ln}
                        </text>
                      ))}
                    </g>
                  );
                })}
                {(pn.connectors ?? []).map((cn, k) => (
                  <line
                    key={k}
                    x1={cxOf(cn.fromCol) + barW / 2}
                    x2={cxOf(cn.fromCol + 1) - barW / 2}
                    y1={y(cn.fromPct)}
                    y2={y(cn.toPct)}
                    stroke="#f47321"
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                  />
                ))}
                {pn.legend.map((lg, i) => {
                  const gx = lx;
                  lx += widths[i];
                  return (
                    <g key={i} transform={`translate(${gx} 284)`}>
                      <rect width={7} height={7} y={-4} fill={lg.color} />
                      <text x={10} dominantBaseline="middle" fontSize={9.5} fill={ink.axis}>
                        {lg.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {pn.note && <div style={{ fontSize: 11, color: ink.text, textAlign: "center", marginTop: 4 }}>{pn.note}</div>}
            </div>
          );
        })}
      </div>
    </ExhibitFrame>
  );
}

// Scatter plot: points only (no connecting line), L-shaped axes with tick marks, optional
// two-line Y title, replicating the usual spreadsheet-style scatter exhibit.
export function ScatterChart({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.scatterPoints) return null;
  const ink = chartInk(dark);
  const xMin = page.scatterXMin ?? 0;
  const xMax = page.scatterXMax ?? 100;
  const xStep = page.scatterXStep ?? 10;
  const yMin = page.scatterYMin ?? 0;
  const yMax = page.scatterYMax ?? 100;
  const yStep = page.scatterYStep ?? 10;
  const left = 150;
  const right = 600;
  const top = 56;
  const bottom = 300;
  const x = (v: number) => left + ((v - xMin) / (xMax - xMin)) * (right - left);
  const y = (v: number) => bottom - ((v - yMin) / (yMax - yMin)) * (bottom - top);
  const xTicks: number[] = [];
  for (let v = xMin; v <= xMax + 1e-9; v += xStep) xTicks.push(v);
  const yTicks: number[] = [];
  for (let v = yMin; v <= yMax + 1e-9; v += yStep) yTicks.push(v);
  const fmt = (v: number) => Number(v.toFixed(2)).toLocaleString("en-US");
  const yLines = page.scatterYLabel?.split("\n");
  return (
    <ExhibitFrame dark={dark}>
      <svg viewBox="0 0 640 380" style={{ width: "100%", maxWidth: 640, display: "block", margin: "0 auto" }}>
        {page.scatterTitle && (
          <text x={(left + right) / 2} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={ink.text}>
            {page.scatterTitle}
          </text>
        )}
        {page.scatterGrid &&
          yTicks.map((t) => <line key={`g${t}`} x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />)}
        <line x1={left} x2={left} y1={top} y2={bottom} stroke={ink.axis} strokeWidth={1.2} />
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={ink.axis} strokeWidth={1.2} />
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={left - 5} x2={left} y1={y(t)} y2={y(t)} stroke={ink.axis} strokeWidth={1.2} />
            <text x={left - 9} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={13} fill={ink.text}>
              {fmt(t)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line x1={x(t)} x2={x(t)} y1={bottom} y2={bottom + 5} stroke={ink.axis} strokeWidth={1.2} />
            <text x={x(t)} y={bottom + 22} textAnchor="middle" fontSize={13} fill={ink.text}>
              {fmt(t)}
            </text>
          </g>
        ))}
        {yLines && (
          <text x={64} y={(top + bottom) / 2 - ((yLines.length - 1) * 8)} textAnchor="middle" fontSize={14} fill={ink.text}>
            {yLines.map((ln, i) => (
              <tspan key={i} x={64} dy={i === 0 ? 0 : 17}>
                {ln}
              </tspan>
            ))}
          </text>
        )}
        {page.scatterXLabel && (
          <text x={(left + right) / 2} y={bottom + 62} textAnchor="middle" fontSize={14} fill={ink.text}>
            {page.scatterXLabel}
          </text>
        )}
        {page.scatterPoints.map((p, i) => (
          <g key={i}>
            <circle cx={x(p.x)} cy={y(p.y)} r={4.5} fill={dark ? "#eef2ef" : "#111"} />
            {p.label && (
              <text x={x(p.x) + 9} y={y(p.y) - 8} fontSize={12} fill={ink.text}>
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </ExhibitFrame>
  );
}

// Curve exhibit: a single connected line on arrow-ended axes with no gridlines and tick labels
// only where the casebook prints them (serif bold title, rotated Y title, X title under the axis).
export function CurveChart({ page, dark }: { page: CasePage; dark?: boolean }) {
  const c = page.curveChart;
  if (!c) return null;
  const ink = chartInk(dark);
  const stroke = dark ? "#eef2ef" : "#111";
  const left = 110;
  const right = 590;
  const top = 64;
  const bottom = 300;
  const x = (v: number) => left + ((v - c.xMin) / (c.xMax - c.xMin)) * (right - left);
  const y = (v: number) => bottom - ((v - c.yMin) / (c.yMax - c.yMin)) * (bottom - top);
  return (
    <ExhibitFrame dark={dark}>
      <svg viewBox="0 0 640 380" style={{ width: "100%", maxWidth: 640, display: "block", margin: "0 auto" }}>
        {c.title && (
          <text x={(left + right) / 2} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fontFamily="Georgia, 'Times New Roman', serif" fill={ink.text}>
            {c.title}
          </text>
        )}
        <line x1={left} x2={left} y1={bottom} y2={top} stroke={stroke} strokeWidth={1.2} />
        <polygon points={`${left},${top - 7} ${left - 3.5},${top + 2} ${left + 3.5},${top + 2}`} fill={stroke} />
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={stroke} strokeWidth={1.2} />
        <polygon points={`${right + 7},${bottom} ${right - 2},${bottom - 3.5} ${right - 2},${bottom + 3.5}`} fill={stroke} />
        {c.yTicks.map((t, i) => (
          <text key={`y${i}`} x={left - 10} y={y(t.v)} textAnchor="end" dominantBaseline="middle" fontSize={10} fontWeight={700} fill={ink.text}>
            {t.label}
          </text>
        ))}
        {c.xTicks.map((t, i) => (
          <text key={`x${i}`} x={x(t.v)} y={bottom + 16} textAnchor="middle" fontSize={10} fontWeight={700} fill={ink.text}>
            {t.label}
          </text>
        ))}
        {c.xTitle && (
          <text x={(left + right) / 2} y={bottom + 30} textAnchor="middle" fontSize={11} fontWeight={700} fill={ink.text}>
            {c.xTitle}
          </text>
        )}
        {c.yTitle && (
          <text x={46} y={(top + bottom) / 2} textAnchor="middle" fontSize={11} fontWeight={700} fill={ink.text} transform={`rotate(-90 46 ${(top + bottom) / 2})`}>
            {c.yTitle}
          </text>
        )}
        <polyline points={c.points.map((p) => `${x(p.x)},${y(p.y)}`).join(" ")} fill="none" stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </ExhibitFrame>
  );
}

export function MiniLines({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.miniLines) return null;
  const ink = chartInk(dark);
  const left = 40;
  const right = 288;
  const top = 34;
  const bottom = 162;
  return (
    <ExhibitFrame dark={dark} title={page.miniLinesTitle}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 8 }}>
        {page.miniLines.map((c, ci) => {
          const y = (v: number) => bottom - (v / c.yMax) * (bottom - top);
          const band = (right - left) / c.values.length;
          const x = (i: number) => left + band * (i + 0.5);
          const ticks: number[] = [];
          for (let v = 0; v <= c.yMax + 1e-9; v += c.yStep) ticks.push(v);
          return (
            <svg key={ci} viewBox="0 0 300 232" style={{ width: "100%", display: "block" }}>
              <text x={(left + right) / 2} y={16} textAnchor="middle" fontSize={17} fill={ink.text}>
                {c.title}
              </text>
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />
                  <text x={left - 6} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill={ink.axis}>
                    {fmtTick(t)}
                  </text>
                </g>
              ))}
              <polyline points={c.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke={c.color} strokeWidth={2.5} strokeLinejoin="round" />
              {c.xLabels.map((l, i) => (
                <text key={i} x={x(i)} y={bottom + 18} textAnchor="middle" fontSize={13} fill={ink.axis}>
                  {l}
                </text>
              ))}
              <g transform={`translate(${(left + right) / 2 - 30} 212)`}>
                <line x1={0} x2={18} stroke={c.color} strokeWidth={2.5} />
                <text x={24} dominantBaseline="middle" fontSize={13} fill={ink.axis}>
                  {c.title}
                </text>
              </g>
            </svg>
          );
        })}
      </div>
    </ExhibitFrame>
  );
}

// Several lines on shared categories; a series can be dashed. Without multiLineYStep no Y
// ticks or gridlines are drawn (for charts that print no axis values).
export function MultiLines({ page, dark }: { page: CasePage; dark?: boolean }) {
  const series = page.multiLineSeries;
  if (!series) return null;
  const ink = chartInk(dark);
  const xLabels = page.multiLineXLabels ?? [];
  const n = Math.max(...series.map((s) => s.values.length), xLabels.length);
  const yMax = page.multiLineYMax ?? Math.max(...series.flatMap((s) => s.values));
  const yStep = page.multiLineYStep;
  const left = 70;
  const right = 600;
  const top = 24;
  const bottom = 270;
  const y = (v: number) => bottom - (v / yMax) * (bottom - top);
  const band = (right - left) / n;
  const x = (i: number) => left + band * (i + 0.5);
  const ticks: number[] = [];
  if (yStep) for (let v = 0; v <= yMax + 1e-9; v += yStep) ticks.push(v);
  const gridN = page.multiLineGridLines ?? 0;
  const bare: number[] = [];
  for (let k = 0; k <= gridN; k++) bare.push((yMax * k) / gridN);
  return (
    <ExhibitFrame dark={dark} title={page.multiLineTitle}>
      <svg viewBox="0 0 640 372" style={{ width: "100%", maxWidth: 640, display: "block", margin: "0 auto" }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />
            <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill={ink.axis}>
              {fmtTick(t)}
            </text>
          </g>
        ))}
        {!yStep && gridN > 0 && bare.map((t) => <line key={t} x1={left} x2={right} y1={y(t)} y2={y(t)} stroke={ink.grid} strokeWidth={1} />)}
        {yStep && <line x1={left} x2={left} y1={top} y2={bottom} stroke={ink.axis} strokeWidth={1.2} />}
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke={ink.axis} strokeWidth={1.2} />
        {page.multiLineYTitle && (
          <text x={18} y={(top + bottom) / 2} textAnchor="middle" fontSize={13} fill={ink.text} transform={`rotate(-90 18 ${(top + bottom) / 2})`}>
            {page.multiLineYTitle}
          </text>
        )}
        {xLabels.map((l, i) => (
          <text key={i} x={x(i)} y={bottom + 18} textAnchor="middle" fontSize={12} fill={ink.axis}>
            {l}
          </text>
        ))}
        {page.multiLineXTitle && (
          <text x={(left + right) / 2} y={bottom + 42} textAnchor="middle" fontSize={13} fill={ink.text}>
            {page.multiLineXTitle}
          </text>
        )}
        {series.map((s, si) => (
          <polyline
            key={si}
            points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeDasharray={s.dashed ? "7 5" : undefined}
          />
        ))}
        {series.map((s, si) => (
          <g key={si} transform={`translate(${left + (si % 2) * ((right - left) / 2)} ${322 + Math.floor(si / 2) * 20})`}>
            <line x1={0} x2={26} stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dashed ? "7 5" : undefined} />
            <text x={32} dominantBaseline="middle" fontSize={12} fill={ink.axis}>
              {s.name}
            </text>
          </g>
        ))}
      </svg>
    </ExhibitFrame>
  );
}

function TreeBranch({ node, ink }: { node: TreeNode; ink: ReturnType<typeof chartInk> }) {
  const kids = node.children ?? [];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          border: `1px solid ${ink.axis}`,
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 13,
          color: ink.text,
          maxWidth: 230,
        }}
      >
        {node.label}
      </div>
      {kids.length > 0 && (
        <>
          <div style={{ width: 18, borderTop: `1px solid ${ink.axis}` }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {kids.map((k, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 0",
                  borderLeft: kids.length > 1 && i > 0 && i < kids.length - 1 ? `1px solid ${ink.axis}` : undefined,
                  position: "relative",
                }}
              >
                {kids.length > 1 && (i === 0 || i === kids.length - 1) && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: i === 0 ? "50%" : 0,
                      height: "50%",
                      borderLeft: `1px solid ${ink.axis}`,
                    }}
                  />
                )}
                <div style={{ width: 18, borderTop: `1px solid ${ink.axis}` }} />
                <TreeBranch node={k} ink={ink} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Tree diagram of any depth, left to right (issue trees, framework diagrams).
export function TreeDiagram({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.treeRoot) return null;
  return (
    <ExhibitFrame dark={dark} title={page.treeTitle}>
      <div style={{ overflowX: "auto" }}><TreeBranch node={page.treeRoot} ink={chartInk(dark)} /></div>
    </ExhibitFrame>
  );
}

export function MemoExhibit({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.memoLines) return null;
  return (
    <ExhibitFrame dark={dark}>
      <div style={{ maxWidth: 560, margin: "0 auto", fontSize: 14.5, lineHeight: 1.5, color: dark ? "#dbe3dd" : "#1f2421" }}>
        {page.memoLines.map((ln, i) => (
          <div key={i} style={{ minHeight: ln ? undefined : "1.5em" }}>{ln}</div>
        ))}
      </div>
    </ExhibitFrame>
  );
}

export function Illustration({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.illustrationSrc) return null;
  const head = dark ? "#eef2ef" : "#1f2421";
  const body = dark ? "#dbe3dd" : "#3a3f3b";
  const muted = dark ? "#8a958d" : "#6b716c";
  return (
    <ExhibitFrame dark={dark} title={page.illustrationTitle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.illustrationSrc}
        alt={page.illustrationAlt ?? ""}
        style={{ width: "100%", maxWidth: 640, display: "block", margin: "0 auto", borderRadius: 8 }}
      />
      {page.factPanels && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, maxWidth: 640, margin: "18px auto 0" }}>
          {page.factPanels.map((fp, i) => (
            <div key={i}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: head, textDecoration: "underline", marginBottom: 10 }}>{fp.heading}</div>
              {fp.rows.map((r, j) => (
                <div key={j} style={{ display: "flex", gap: 14, fontSize: 13.5, lineHeight: 1.5, padding: "3px 0", color: body }}>
                  {r.label && <span style={{ minWidth: 70, color: muted }}>{r.label}</span>}
                  <span style={{ fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
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
function HarveyBall({ fill, dark, label, color, track }: { fill: number; dark?: boolean; label: string; color?: string; track?: string }) {
  const c = color ?? (dark ? "#dbe3dd" : "#1f2421");
  const r = 10;
  const a = fill * 2 * Math.PI;
  const x = 12 + r * Math.sin(a);
  const y = 12 - r * Math.cos(a);
  const wedge = fill >= 1 ? undefined : `M12 12 L12 2 A${r} ${r} 0 ${fill > 0.5 ? 1 : 0} 1 ${x.toFixed(3)} ${y.toFixed(3)} Z`;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" role="img" aria-label={label} style={{ display: "block" }}>
      <circle cx={12} cy={12} r={r} fill={fill >= 1 ? c : track ? (dark ? "#3a423d" : track) : "none"} stroke={track ? "none" : c} strokeWidth={1.4} />
      {wedge && <path d={wedge} fill={c} />}
    </svg>
  );
}

// Black cell borders from a string of letters t/r/b/l.
function bordersOf(b?: string, color?: string): React.CSSProperties {
  if (!b) return {};
  const line = color ? `1px solid ${color}` : "1.5px solid #111111";
  return { ...(b.includes("t") ? { borderTop: line } : {}), ...(b.includes("r") ? { borderRight: line } : {}), ...(b.includes("b") ? { borderBottom: line } : {}), ...(b.includes("l") ? { borderLeft: line } : {}) };
}

function DataGrid({
  title, footnote, cols, headers, rows, dark, first, serif, titleLeft, bigTitle, boldTitle, fontSize, titleRules, titleRule, footnoteLeft,
}: {
  titleRules?: string;
  titleRule?: string;
  titleLeft?: boolean;
  footnoteLeft?: boolean;
  boldTitle?: boolean;
  fontSize?: number;
  serif?: boolean;
  bigTitle?: boolean;
  title?: string;
  footnote?: string;
  cols: string;
  headers: CasePage["dataTableHeaders"];
  rows: NonNullable<CasePage["dataTableRows"]>;
  dark?: boolean;
  first: boolean;
}) {
  if (!headers) return null;
  const head = dark ? "#8a958d" : "#8a8f8a";
  const border = dark ? "1px solid #333a35" : "1px solid #f2f3f0";
  // Wide tables (many columns) get more room so cells don't wrap awkwardly.
  const maxW = dark ? undefined : headers.length > 6 ? 820 : 560;
  return (
    <div style={first ? undefined : { marginTop: 22 }}>
      {title && titleRules ? (
        <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: maxW, margin: "0 auto 14px" }}>
          <div style={{ flex: 1, height: 3, background: titleRules }} />
          <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#dbe3dd" : "#111111", textAlign: "center" }}>{title}</div>
          <div style={{ flex: 1, height: 3, background: titleRules }} />
        </div>
      ) : (
        title && (
        <div style={titleLeft ? { fontSize: 14, color: dark ? "#dbe3dd" : "#111111", marginBottom: 8, maxWidth: maxW, margin: "0 auto 8px" } : boldTitle ? { fontSize: 20, fontWeight: 700, color: dark ? "#dbe3dd" : "#111111", marginBottom: 18, textAlign: "center" } : bigTitle ? { fontSize: 30, fontWeight: 700, fontFamily: '"Times New Roman", Georgia, serif', color: dark ? "#b7c2ba" : "#595959", marginBottom: 18, textAlign: "center" } : { fontSize: 12, fontWeight: 600, color: dark ? "#8a958d" : "#5b615c", marginBottom: 14, textAlign: "center" }}>{title}</div>
        )
      )}
      {title && titleRule && !titleRules && <div style={{ maxWidth: maxW, margin: "0 auto 14px" }}><div style={{ height: 3, background: titleRule, margin: "0 -24px" }} /></div>}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 0, fontSize: fontSize ?? 12.5, minWidth: 280, maxWidth: maxW, margin: "0 auto", fontFamily: serif ? '"Times New Roman", Georgia, serif' : undefined }}>
        {headers.map((h, i) => (
          <div key={i} style={{ fontWeight: 600, color: h.fg ?? head, background: h.bg, padding: "5px 4px", textAlign: h.align, ...(serif ? { fontWeight: 700, fontSize: 14, display: "flex", alignItems: "flex-end", justifyContent: "center" } : {}), ...(h.span ? { gridColumn: `span ${h.span}` } : {}), ...bordersOf(h.borders, h.borderColor) }}>{h.v}</div>
        ))}
        {rows.map((row, i) => (
          <div key={i} style={{ display: "contents" }}>
            {row.cells.map((c, j) => (
              <div
                key={j}
                style={{
                  padding: "8px 4px",
                  ...(c.indent ? { paddingLeft: c.indent } : {}),
                  background: c.bg,
                  borderTop: border,
                  ...bordersOf(c.borders, c.borderColor),
                  ...(c.rowSpan ? { gridRow: `span ${c.rowSpan}` } : {}),
                  ...(c.span ? { gridColumn: `span ${c.span}` } : {}),
                  textAlign: c.align,
                  fontWeight: c.w,
                  color: dark ? "#dbe3dd" : c.fg,
                  display: "flex",
                  alignItems: c.top ? "flex-start" : "center",
                  gap: 10,
                  justifyContent: c.align === "center" ? "center" : c.align === "right" ? "flex-end" : "flex-start",
                }}
              >
                {c.icon && <RowIcon name={c.icon} dark={dark} />}
                {c.harvey !== undefined ? (
                  <HarveyBall fill={c.harvey} dark={dark} label={c.v} color={c.harveyColor} track={c.harveyTrack} />
                ) : c.split && c.v.startsWith("$") ? (
                  <span style={{ display: "flex", justifyContent: "space-between", width: "100%", ...(c.splitPad ? { padding: c.splitPad } : { paddingRight: "26%" }) }}>
                    <span>$</span>
                    <span>{c.v.slice(1).trim()}</span>
                  </span>
                ) : c.bullets ? (
                  <span style={{ display: "block" }}>
                    {c.v.split("\n").map((ln, li) => (
                      <span key={li} style={{ display: "flex", gap: 8, textAlign: "left" }}>
                        <span>•</span>
                        <span>{ln}</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  c.v
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {footnote && (
        <div style={{ fontSize: 11, color: head, textAlign: footnoteLeft ? "left" : "right", whiteSpace: "pre-line", maxWidth: maxW, margin: "12px auto 0" }}>{footnote}</div>
      )}
    </div>
  );
}

export function DataTable({ page, dark }: { page: CasePage; dark?: boolean }) {
  if (!page.dataTableRows || !page.dataTableHeaders) return null;
  return (
    <ExhibitFrame dark={dark}>
      {page.dataTableIntro && (
        <div style={{ fontSize: 13, lineHeight: 1.6, color: dark ? "#dbe3dd" : "#2a2f2b", marginBottom: 18 }}>
          {page.dataTableIntro.map((ln, i) => (
            <div key={i} style={{ paddingLeft: ln.startsWith("  ") ? 18 : 0 }}>
              {ln.startsWith("  ") ? "– " : "• "}
              {ln.trim()}
            </div>
          ))}
        </div>
      )}
      {page.dataTableSideBySide && page.dataTableTitle && (
        <div style={{ fontSize: page.dataTableTitleBold ? 20 : 12, fontWeight: page.dataTableTitleBold ? 700 : 600, color: dark ? "#dbe3dd" : page.dataTableTitleBold ? "#111111" : "#5b615c", marginBottom: 18, textAlign: "center" }}>{page.dataTableTitle}</div>
      )}
      <div style={page.dataTableSideBySide ? { display: "flex", flexWrap: "wrap", gap: 28, alignItems: "flex-start" } : undefined}>
        <div style={page.dataTableSideBySide ? { flex: "1 1 280px", minWidth: 0 } : undefined}>
      <DataGrid
        title={page.dataTableSideBySide ? undefined : page.dataTableTitle}
        serif={page.dataTableSerif}
        bigTitle={page.dataTableTitleBig}
        boldTitle={page.dataTableTitleBold}
        fontSize={page.dataTableFontSize}
        footnote={page.dataTableFootnote}
        titleRules={page.dataTableTitleRules}
        titleRule={page.dataTableTitleRule}
        titleLeft={page.dataTableTitleLeft}
        footnoteLeft={page.dataTableFootnoteLeft}
        cols={page.dataTableCols ?? ""}
        headers={page.dataTableHeaders}
        rows={page.dataTableRows}
        dark={dark}
        first
      />
        </div>
      {page.dataTableMore?.map((t, i) => (
        <div key={i} style={page.dataTableSideBySide ? { flex: "1 1 280px", minWidth: 0 } : undefined}>
          <DataGrid title={t.title} footnote={t.footnote} cols={t.cols} headers={t.headers} rows={t.rows} dark={dark} first={!!page.dataTableSideBySide} fontSize={page.dataTableFontSize} titleRules={page.dataTableTitleRules} footnoteLeft={page.dataTableFootnoteLeft} />
        </div>
      ))}
      </div>
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
      <PieChart page={page} dark={dark} />
      {page.colBarFirst && <ColBars page={page} dark={dark} />}
      <AxisBars page={page} dark={dark} />
      {!page.colBarFirst && <ColBars page={page} dark={dark} />}
      <StackPanels page={page} dark={dark} />
      <AxisStacks page={page} dark={dark} />
      <ScatterChart page={page} dark={dark} />
      <CurveChart page={page} dark={dark} />
      <MiniLines page={page} dark={dark} />
      <MultiLines page={page} dark={dark} />
      <TreeDiagram page={page} dark={dark} />
      <Illustration page={page} dark={dark} />
      <MemoExhibit page={page} dark={dark} />
      <SegmentTable page={page} dark={dark} />
      {page.exhibitTitle && (
        <div style={{ fontSize: 22, fontWeight: 600, color: dark ? "#dbe3dd" : "#1f2421", margin: "4px 4px 14px", textAlign: "center", fontFamily: 'Cambria, "Times New Roman", Times, serif' }}>{page.exhibitTitle}</div>
      )}
      {page.exhibitColumns && page.extraCharts?.length ? (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flex: `${page.exhibitColumns[0]} 1 320px`, minWidth: 0 }}>
              <ExtraCharts charts={page.extraCharts.slice(0, page.exhibitLeftCharts ?? 1)} dark={dark} />
            </div>
            <div style={{ flex: `${page.exhibitColumns[1]} 1 280px`, minWidth: 0 }}>
              <DataTable page={page.exhibitMoreBelow ? { ...page, dataTableMore: undefined } : page} dark={dark} />
              <ExtraCharts charts={page.extraCharts.slice(page.exhibitLeftCharts ?? 1)} dark={dark} />
            </div>
          </div>
          {page.exhibitMoreBelow && page.dataTableMore?.[0] && (
            <DataTable
              page={{ ...page, dataTableTitle: page.dataTableMore[0].title, dataTableFootnote: page.dataTableMore[0].footnote, dataTableCols: page.dataTableMore[0].cols, dataTableHeaders: page.dataTableMore[0].headers, dataTableRows: page.dataTableMore[0].rows, dataTableMore: undefined, dataTableIntro: undefined }}
              dark={dark}
            />
          )}
        </>
      ) : page.tablesBelowCharts ? (
        <>
          <ExtraCharts charts={page.extraCharts} dark={dark} />
          <DataTable page={page} dark={dark} />
        </>
      ) : (
        <>
          <DataTable page={page} dark={dark} />
          <ExtraCharts charts={page.extraCharts} dark={dark} />
        </>
      )}
    </>
  );
}

function PresentWrap({
  presentable,
  label,
  title,
  share,
  children,
}: {
  presentable: boolean;
  label: string;
  title: string;
  share?: ShareControl;
  children: React.ReactNode;
}) {
  return presentable ? (
    <Presentable label={label} title={title} share={share}>
      {children}
    </Presentable>
  ) : (
    <>{children}</>
  );
}

// A complete interviewer-facing page: the prompt (ready), or the ordered Q&A
// blocks (say-next, guidance, exhibits, calc, answer, insight, guidance), or the
// cheat sheet. `sayLabel` distinguishes "Interviewer says" (doc) from
// "Say next" (Live Mock). NEVER render this for an interviewee.
//
// With `presentable`, each block that is worth showing across the table (prompt,
// question, structure/guidance, exhibits, calculation, answer, …) gets a Present
// button (see components/interview/Presenter.tsx). Needs a <PresenterScope> above.
export function PageBody({
  page,
  sayLabel = "Interviewer says",
  presentable = false,
  share,
}: {
  page: CasePage;
  sayLabel?: string;
  presentable?: boolean;
  /** Live Mock: adds "Share with <name>" to the prompt and exhibit blocks. */
  share?: ShareControl;
}) {
  if (page.kind === "ready") {
    return (
      <>
        <PresentWrap presentable={presentable} title={page.title} label="Prompt" share={share}>
          <div style={{ fontSize: 14.5, lineHeight: 1.65, color: "#2a2f2b", background: "#fafbf9", borderRadius: 10, padding: 18, paddingTop: presentable ? 44 : 18, whiteSpace: "pre-wrap" }}>
            {page.body}
          </div>
        </PresentWrap>
        {page.note && <div style={{ fontSize: 12, color: "#8a8f8a", marginTop: 10, marginBottom: 14 }}><Rich text={page.note} /></div>}
        {/* Interviewer guidance that belongs with the prompt (never sent to the candidate). */}
        <InterviewerBlocks page={page} presentable={presentable} share={share} />
      </>
    );
  }

  if (page.kind === "cheat") {
    return (
      <PresentWrap presentable={presentable} title={page.title} label="Key numbers">
        <CheatSheet rows={page.cheatRows ?? []} takeaway={page.cheatTakeaway} />
      </PresentWrap>
    );
  }

  return (
    <>
      {page.qText && (
        <PresentWrap presentable={presentable} title={page.title} label="Prompt">
          <SayNextBox text={page.qText} label={sayLabel} />
        </PresentWrap>
      )}
      <InterviewerBlocks page={page} presentable={presentable} share={share} />
    </>
  );
}

// Everything on a section below the prompt/say-next box: guidance, reference lists,
// exhibit, calculation, answer, next step. Shared by the prompt page ("ready") and Q&A
// pages so interviewer guidance can sit inside the section it belongs to.
function InterviewerBlocks({
  page,
  presentable,
  share,
}: {
  page: CasePage;
  presentable: boolean;
  share?: ShareControl;
}) {
  const hasExhibit = pageHasExhibit(page);

  return (
    <>
      {page.guidancePreLines && (
        <PresentWrap presentable={presentable} title={page.title} label={page.guidancePreLabel ?? "Guidance"}>
          <GuidancePreBox label={page.guidancePreLabel} note={page.guidancePreNote} intro={page.guidancePreIntro} lines={page.guidancePreLines} />
        </PresentWrap>
      )}
      {hasExhibit && page.exhibitFirst && (
        <PresentWrap presentable={presentable} title={page.title} label="Exhibit" share={share}>
          <PageExhibit page={page} />
        </PresentWrap>
      )}
      {page.infoSections && (
        <PresentWrap presentable={presentable} title={page.title} label={page.infoBoxLabel ?? "Reference"}>
          <InfoSectionsBox label={page.infoBoxLabel} sections={page.infoSections} />
        </PresentWrap>
      )}
      {hasExhibit && !page.exhibitFirst && (
        <PresentWrap presentable={presentable} title={page.title} label="Exhibit" share={share}>
          <PageExhibit page={page} />
        </PresentWrap>
      )}
      {page.guideCharts && (
        <PresentWrap presentable={presentable} title={page.title} label="Interviewer chart">
          <ExtraCharts charts={page.guideCharts} />
        </PresentWrap>
      )}
      {page.calcLines && (
        <PresentWrap presentable={presentable} title={page.title} label="Calculation walkthrough">
          <CalcBox note={page.calcNote} lines={page.calcLines} />
        </PresentWrap>
      )}
      {page.calcTable && !page.calcAfterGuidance && (
        <PresentWrap presentable={presentable} title={page.title} label="Calculation walkthrough">
          <CalcTableBox note={page.calcNote} table={page.calcTable} />
        </PresentWrap>
      )}
      {page.calcTables?.map((t, i) => (
        <PresentWrap key={i} presentable={presentable} title={page.title} label={t.title ?? "Calculation walkthrough"}>
          <CalcTableBox table={t} />
        </PresentWrap>
      ))}
      {page.answerText && page.answerBonusLines ? (
        <PresentWrap presentable={presentable} title={page.title} label="Answer">
          <AnswerGroup
            answer={page.answerText}
            insightLabel={page.insightLabel}
            insight={page.insightText}
            bonusLabel={page.answerBonusLabel}
            bonusLines={page.answerBonusLines}
          />
        </PresentWrap>
      ) : (
        <>
          {page.answerText && (
            <PresentWrap presentable={presentable} title={page.title} label="Answer">
              <AnswerBox text={page.answerText} />
            </PresentWrap>
          )}
          {page.insightText && (
            <PresentWrap presentable={presentable} title={page.title} label="What a strong candidate spots">
              <InsightBox text={page.insightText} />
            </PresentWrap>
          )}
        </>
      )}
      {page.nextStepText && <SayNextBox text={page.nextStepText} label="Next step" />}
      {page.guidanceLines && (
        <PresentWrap presentable={presentable} title={page.title} label={page.guidanceLabel ?? "Guidance"}>
          <GuidanceBox label={page.guidanceLabel} lines={page.guidanceLines} />
        </PresentWrap>
      )}
      {page.calcSheet && (
        <PresentWrap presentable={presentable} title={page.title} label={page.calcSheet.label ?? "Analysis"}>
          <CalcSheetBox sheet={page.calcSheet} label={page.calcSheet.label} />
        </PresentWrap>
      )}
      {page.calcTable && page.calcAfterGuidance && (
        <PresentWrap presentable={presentable} title={page.title} label="Calculation walkthrough">
          <CalcTableBox note={page.calcNote} table={page.calcTable} />
        </PresentWrap>
      )}
    </>
  );
}
