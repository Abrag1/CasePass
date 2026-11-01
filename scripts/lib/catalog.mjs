// Shared helpers for the case-conversion pipeline: maps each catalog case to its
// casebook PDF and page range, and loads authored case files (TypeScript) so
// scripts can inspect them without a build step.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

// Where the casebook PDFs live. Override with CASEBOOK_DIR if the folder moves.
export const CASEBOOK_DIR =
  process.env.CASEBOOK_DIR ??
  "C:/Users/giorg/OneDrive/Desktop/04. Strtps/16. TheCasePass/03 Unique Case Books";

// "<catalog school>|<casebook year>" -> PDF file name. Order = processing order
// (the pipeline works through books top to bottom). Books with no entry here have
// no PDF in the folder yet (old Columbia years, several Fuqua years).
export const CASEBOOK_FILES = {
  "Chicago Booth|2024-2025": "Booth (Chicago) Casebook 2024-2025.pdf",
  "Columbia CBS|2020-2021": "Columbia (CBS) Casebook 2020-2021.pdf",
  "UVA Darden|2018-2019": "Darden Casebook 2018-2019.pdf",
  "UVA Darden|2023-2024": "Darden Casebook 2023-2024.pdf",
  "UVA Darden|2024-2025": "Darden Casebook 2024-2025.pdf",
  "Duke Fuqua|2018-2019": "Duke Fuqua Casebook 2018-2019.pdf",
  "Duke Fuqua|2023-2024": "Duke Fuqua Casebook 2023-2024.pdf",
  "ESADE|2024-2025": "ESADE Casebook 2024-2025.pdf",
  "Berkeley Haas|2019": "Haas (Berkeley) Casebook 2019.pdf",
  "INSEAD|2021": "INSEAD Casebook 2021.pdf",
  "Cornell Johnson|2020-2021": "Johnson (Cornell) Casebook 2020-2021.pdf",
  "Kellogg (Northwestern)|2012": "Kellogg Casebook 2012.pdf",
  "Kellogg (Northwestern)|2020": "Kellogg Casebook 2020.pdf",
  "NYU Stern|2015-2016": "NYU Stern Casebook 2015-2016.pdf",
  "NYU Stern|2018": "NYU Stern Casebook 2018.pdf",
  "NYU Stern|2023-2024": "NYU Stern Casebook 2023-2024.pdf",
  "Michigan Ross|2019": "Ross (Michigan) Casebook 2019.pdf",
  "Michigan Ross|2024": "Ross (Michigan) Casebook 2024.pdf",
  "MIT Sloan|2015": "Sloan (MIT) Casebook 2015.pdf",
  "MIT Sloan|2020-2021": "Sloan (MIT) Casebook 2020-2021.pdf",
  "Tuck (Dartmouth)|2024": "Tuck (Dartmouth) Casebook 2024.pdf",
  "Wharton|2017": "Wharton Casebook 2017.pdf",
  "Wharton|2024-2025": "Wharton Casebook 2024-2025.pdf",
  "Yale SOM (YGCC)|2013": "Yale (YGCC) Casebook 2013.pdf",
  "Yale SOM (YGCC)|2024": "Yale (YGCC) Casebook 2024.pdf",
};

export const AUTHORED_DIR = "lib/cases/authored";

export function authoredPath(catalogId) {
  return `${AUTHORED_DIR}/${catalogId}.ts`;
}

export function hasAuthoredFile(catalogId) {
  return existsSync(authoredPath(catalogId));
}

// Catalog entries in processing order, each with its PDF path and page range.
// `end` is the page before the next case in the same book, or null when it can't
// be inferred (last case in a book, or two cases share a start page).
export function loadCatalog() {
  const rows = readFileSync("data/case-catalog.jsonl", "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
  const bookKeys = Object.keys(CASEBOOK_FILES);
  const entries = rows.map((c) => {
    const key = `${c.source.school}|${c.source.casebook_year}`;
    return {
      id: c.case_id,
      title: c.title,
      book: key,
      bookOrder: bookKeys.indexOf(key),
      pdf: CASEBOOK_FILES[key] ? join(CASEBOOK_DIR, CASEBOOK_FILES[key]) : null,
      start: c.source.source_page,
      end: null,
      hints: {
        case_type: c.content.case_type_raw[0] ?? null,
        industry: c.content.industry_raw[0] ?? null,
        difficulty: c.skills.difficulty.raw_value ?? null,
      },
    };
  });
  const byBook = new Map();
  for (const e of entries) {
    if (!byBook.has(e.book)) byBook.set(e.book, []);
    byBook.get(e.book).push(e);
  }
  for (const list of byBook.values()) {
    const pages = [...new Set(list.map((e) => e.start))].sort((a, b) => a - b);
    for (const e of list) {
      const dupes = list.filter((o) => o.start === e.start).length > 1;
      const next = pages.find((p) => p > e.start);
      e.end = !dupes && next ? next - 1 : null;
    }
  }
  return entries
    .filter((e) => e.bookOrder >= 0)
    .sort((a, b) => a.bookOrder - b.bookOrder || a.start - b.start);
}

// Evaluate an authored case file (TypeScript with type-only imports) and return its
// exports ({ CASE_ID, CASE_META, PAGES }).
export function loadAuthored(file) {
  const src = readFileSync(file, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", out)(mod, mod.exports, () => {
    throw new Error("authored case files may only use `import type`");
  });
  return mod.exports;
}
