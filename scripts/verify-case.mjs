// Mechanical (no-AI) checks of a converted case against its casebook PDF.
//   - lint: structure, forbidden strings, markup in candidate-facing fields
//   - additions: text in the converted case that is not in the source
//   - omissions: source passages missing from the converted case
//   - derived numbers: figures in calc rows that aren't in the source (recompute them)
// The verifier agent uses this report as its starting point and judges what code can't
// (chart types, values read off charts, layout).
//
// Usage: node scripts/verify-case.mjs <catalog_case_id>
// Exit code 0 = MECHANICAL: PASS, 1 = FAIL. Needs `pdftotext` (poppler) on PATH.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { loadCatalog, loadAuthored, authoredPath } from "./lib/catalog.mjs";

const ADD_MIN_COVERAGE = 0.7; // an output passage below this share of source 4-grams is "not in source"
const OMIT_MIN_COVERAGE = 0.5; // a source passage below this share is "missing from output"
const MAX_OMITTED_SHARE = 0.1; // fail if more than 10% of source words are uncovered

const id = process.argv[2];
if (!id) {
  console.error("Usage: node scripts/verify-case.mjs <catalog_case_id>");
  process.exit(2);
}
const entry = loadCatalog().find((e) => e.id === id);
if (!entry) fatal(`Unknown catalog id: ${id}`);
if (!entry.pdf || !existsSync(entry.pdf)) fatal(`Casebook PDF not found: ${entry.pdf}`);
const file = authoredPath(id);
if (!existsSync(file)) fatal(`No converted case at ${file}`);

const mod = loadAuthored(file);
const pages = mod.PAGES;
const errors = [];
const warnings = [];

// ---------- lint ----------
if (!mod.CASE_ID || !/^[0-9a-f-]{36}$/.test(mod.CASE_ID)) errors.push("CASE_ID missing or not a UUID");
const meta = mod.CASE_META;
if (meta && meta.review !== "auto" && meta.review !== "confirmed") errors.push('CASE_META.review must be "auto" (agent-generated) or "confirmed"');
for (const k of ["case_type", "synopsis", "full_prompt", "tags"]) {
  if (!meta || !meta[k] || (Array.isArray(meta[k]) && !meta[k].length)) errors.push(`CASE_META.${k} missing`);
}
if (!Array.isArray(pages) || !pages.length) fatal("PAGES is empty or missing");
pages.forEach((p, i) => {
  const want = String(i + 1).padStart(2, "0");
  if (p.n !== want) errors.push(`page ${i + 1}: n should be "${want}" but is "${p.n}"`);
  if (!["ready", "qa", "cheat"].includes(p.kind)) errors.push(`page ${p.n}: bad kind "${p.kind}"`);
  if ((p.guidancePreNote || p.guidancePreIntro || p.guidancePreLabel) && !p.guidancePreLines?.length)
    errors.push(`page ${p.n}: guidancePreNote/Intro/Label never render without guidancePreLines (their text would be invisible)`);
});
if (pages[0]?.kind !== "ready" || !pages[0]?.body) errors.push('first page must be kind "ready" with a body (the prompt)');

// Sections: every page is a timed section in the app (own timer, notes, feedback), so guidance
// must live inside the phase it serves instead of becoming a section of its own.
const SECTION_OK_WITHOUT_ACTIVITY = /framework|clarifying|recommendation|risks|next steps|conclusion|brainstorm/i;
pages.forEach((p) => {
  if (/^(interviewer\s+)?guidance\b|^interviewer guidance|^reference\b/i.test(p.label) || /^interviewer guidance$/i.test(p.title))
    errors.push(`page ${p.n}: "${p.label}" is a guidance-only section; fold it into the phase it serves (prompt, framework or its question)`);
  const hasExhibit = p.chart1 || p.chart2 || p.barChartGroups || p.lineChartPointsStr || p.pieSlices || p.axisBarGroups || p.miniLines || p.illustrationSrc || p.dataTableRows || p.segmentTable;
  const hasActivity = p.body || p.qText || p.calcLines || p.calcTable || p.answerText || hasExhibit;
  if (!hasActivity && p.kind === "qa" && !SECTION_OK_WITHOUT_ACTIVITY.test(p.label))
    warnings.push(`page ${p.n}: section "${p.label}" has no question, exhibit, calculation or answer; is it guidance that belongs in another section?`);
});
if (pages.length > 10) warnings.push(`${pages.length} sections: more than 10 usually means guidance was split off from its phase`);

// Walk every string in a page, remembering its key path.
function* strings(value, path = "") {
  if (typeof value === "string") yield { path, text: value };
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) yield* strings(v, path ? `${path}.${k}` : k);
}
const leafKey = (p) => p.replace(/\[\d+\]/g, "").split(".").pop();
const SKIP_KEYS = new Set([
  "n", "kind", "color", "fg", "align", "w", "h", "icon", "src", "illustrationSrc", "illustrationAlt",
  "dataTableCols", "padTop", "divider", "gap", "isLast", "lineChartPointsStr",
]);
const isLabelKey = (k) => k === "label" || k === "title" || k.endsWith("Label");
const CANDIDATE_KEYS = (p) => /(^|\.)body$/.test(p) || /Title$|Footnote$/.test(leafKey(p)) || /^dataTable(Rows|Headers)/.test(p.replace(/^.*?\./, ""));

const prose = []; // {page, path, text} - text that should come from the source
const calcText = [];
for (const p of pages) {
  for (const s of strings(p)) {
    const k = leafKey(s.path);
    if (SKIP_KEYS.has(k)) continue;
    if (/(^|\.)calc(Lines|Table)/.test(s.path)) {
      calcText.push({ page: p.n, ...s });
      continue;
    }
    if (isLabelKey(k)) continue;
    prose.push({ page: p.n, ...s });
    if (/your interviewee doesn.t need an account/i.test(s.text)) errors.push(`page ${p.n}: forbidden sentence in ${s.path}`);
    if (CANDIDATE_KEYS(s.path) && /\*\*|==/.test(s.text)) errors.push(`page ${p.n}: ** or == markup in candidate-facing field ${s.path}`);
  }
  if (p.answerText && p.answerText.length > 140 && !/^\s*[-•]/m.test(p.answerText))
    warnings.push(`page ${p.n}: answerText is long and has no bullets`);
}

// Structure heuristics: jammed lines and oversized notes are what a flattened outline looks like.
const LIST_KEYS = new Set(["guidancePreLines", "guidanceLines", "items", "lines", "answerBonusLines"]);
for (const p of pages) {
  for (const s of strings(p)) {
    const k = leafKey(s.path);
    if (LIST_KEYS.has(k) && s.text.length > 450) warnings.push(`page ${p.n}: ${s.path} is ${s.text.length} chars (is a list jammed into one line?)`);
    if (LIST_KEYS.has(k) && (s.text.match(/;/g) ?? []).length >= 3) warnings.push(`page ${p.n}: ${s.path} has 3+ semicolons (bullets merged into one line?)`);
    if (k === "note" && s.text.length > 400) warnings.push(`page ${p.n}: note is ${s.text.length} chars; keep it to a sentence or two`);
    if (LIST_KEYS.has(k) && / - [A-Z#].* - [A-Z#]/.test(s.text)) warnings.push(`page ${p.n}: ${s.path} looks like a flattened outline (" - " joins)`);
  }
}

// Stray files: scratch output must not be left in the project.
try {
  const untracked = execFileSync("git", ["status", "--porcelain", "-uall"], { encoding: "utf8" })
    .split("\n")
    .filter((l) => l.startsWith("??"))
    .map((l) => l.slice(3).replace(/^"|"$/g, ""));
  const allowed = [/^lib\/cases\/authored\//, /^public\/cases\//, /^conversions\//, /^\.claude\//, /^scripts\//, /^docs\//];
  for (const f of untracked)
    if (/\.(html?|pdf|png|jpe?g|txt|md|json)$/i.test(f) && !allowed.some((re) => re.test(f))) errors.push(`stray file left in the project: ${f}`);
} catch {
  /* not a git checkout: skip */
}

// ---------- coverage ----------
const tokens = (s) =>
  s
    .toLowerCase()
    .replace(/\*\*|==/g, " ")
    .replace(/[‘’´`]/g, "'")
    .replace(/'s\b/g, "s")
    .replace(/[^a-z0-9$%.]+/g, " ")
    .replace(/(?<![0-9])\.|\.(?![0-9])/g, " ") // keep decimals, drop sentence dots
    .split(/\s+/)
    .filter(Boolean);
const grams = (t, n = 4) => {
  const out = [];
  for (let i = 0; i + n <= t.length; i++) out.push(t.slice(i, i + n).join(" "));
  return out;
};

const last = entry.end ?? entry.start + 14;
let sourceText;
try {
  sourceText = execFileSync("pdftotext", ["-f", String(entry.start), "-l", String(last), entry.pdf, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
} catch (e) {
  fatal(`pdftotext failed: ${e.message}`);
}
const srcTokens = tokens(sourceText);
const srcGrams = new Set(grams(srcTokens));
const outAllTokens = [...prose, ...calcText].flatMap((x) => tokens(x.text));
const outGrams = new Set(grams(outAllTokens));

// Additions: converted passages not found in the source
const additions = [];
for (const x of prose) {
  // Judge sentence by sentence so a short invented phrase can't hide in a long field.
  for (const sentence of x.text.split(/(?<=[.?!])\s+|\n+/)) {
    const t = tokens(sentence);
    if (t.length < 5) continue;
    const g = grams(t);
    const cov = g.length ? g.filter((q) => srcGrams.has(q)).length / g.length : 1;
    if (cov < ADD_MIN_COVERAGE) additions.push({ ...x, text: sentence.trim(), cov });
  }
}

// Omissions: source passages not found in the converted case.
// Booklet furniture is not case content: strip running headers/page numbers and skip
// scoring grids and header chips. Extend FURNITURE as new casebooks need it.
const FURNITURE_STRIP = [/Case #\d+:[^\n]*\(\d+\/\d+\)/g, /^\s*\d{1,3}\s*$/gm];
const FURNITURE_CHUNK = /Case Evaluation|Fit Evaluation|Overall Fit Performance|Concepts Tested|Quant Level|Client Type|Structure and Framework|Analytical and Problem Solving/i;
const cleanSource = FURNITURE_STRIP.reduce((s, re) => s.replace(re, " "), sourceText);
const chunks = cleanSource.split(/\n{2,}|(?<=[.?!])\s+/).map((c) => c.trim()).filter(Boolean);
const outTokenSet = new Set(outAllTokens);
let omittedWords = 0;
const omissions = [];
for (const c of chunks) {
  if (FURNITURE_CHUNK.test(c)) continue;
  const t = tokens(c);
  if (t.length < 6) continue;
  const g = grams(t);
  // Table text comes out of the PDF in scrambled order, so judge number-heavy chunks by their words, not their order.
  const numeric = t.filter((w) => /\d/.test(w)).length / t.length > 0.3;
  const cov = numeric
    ? t.filter((w) => outTokenSet.has(w)).length / t.length
    : g.length ? g.filter((q) => outGrams.has(q)).length / g.length : 1;
  if (cov < OMIT_MIN_COVERAGE) {
    omissions.push({ text: c.replace(/\s+/g, " "), cov });
    omittedWords += t.length;
  }
}
const omittedShare = srcTokens.length ? omittedWords / srcTokens.length : 0;

// Derived numbers: numbers inside calc rows that never appear in the source
const nums = (s) => (s.replace(/,/g, "").match(/\d+(?:\.\d+)?/g) ?? []);
const srcNums = new Set(nums(sourceText));
const derived = [...new Set(calcText.flatMap((x) => nums(x.text)).filter((n) => !srcNums.has(n)))];

// ---------- report ----------
const clip = (s, n = 170) => (s.length > n ? s.slice(0, n) + "…" : s);
const lines = [];
lines.push(`CASE: ${entry.title}  (${id})`);
lines.push(`SOURCE: ${entry.book.replace("|", " ")}, pages ${entry.start}-${last}${entry.end ? "" : " (end guessed)"}`);
lines.push(`PAGES: ${pages.length}   source words: ${srcTokens.length}   converted words: ${outAllTokens.length}`);
lines.push("");
lines.push(`LINT ERRORS (${errors.length})`);
errors.forEach((e) => lines.push(`  ✗ ${e}`));
lines.push(`LINT WARNINGS (${warnings.length})`);
warnings.forEach((e) => lines.push(`  ! ${e}`));
lines.push("");
lines.push(`ADDITIONS: ${additions.length} passage(s) not found in the source`);
additions.forEach((a) => lines.push(`  + page ${a.page} ${a.path} (${Math.round(a.cov * 100)}% match): ${clip(a.text)}`));
lines.push("");
lines.push(`OMISSIONS: ${omissions.length} source passage(s) missing from the converted case (${(omittedShare * 100).toFixed(1)}% of source words)`);
omissions.slice(0, 40).forEach((o) => lines.push(`  - (${Math.round(o.cov * 100)}% match) ${clip(o.text)}`));
if (omissions.length > 40) lines.push(`  … and ${omissions.length - 40} more`);
lines.push("");
lines.push(`DERIVED NUMBERS in calc rows, not in source (recompute these): ${derived.join(", ") || "none"}`);
lines.push("");
// Warnings are structure problems (flattened outlines, jammed lines, blob notes, unbulleted answers):
// the words can all be present and the case still be wrong, so they fail the check too.
const fail = errors.length > 0 || warnings.length > 0 || additions.length > 0 || omittedShare > MAX_OMITTED_SHARE;
lines.push(`MECHANICAL: ${fail ? "FAIL" : "PASS"}`);
console.log(lines.join("\n"));
process.exit(fail ? 1 : 0);

function fatal(msg) {
  console.error(msg);
  process.exit(2);
}
