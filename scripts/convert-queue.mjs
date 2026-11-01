// Lists the next cases waiting to be converted into full CasePass cases, with
// everything a converter agent needs: the case UUID, the casebook PDF, the page
// range and the catalog's hints. Read-only (one SELECT on public.cases).
//
// Usage:
//   node scripts/convert-queue.mjs                  next 5 pending cases
//   node scripts/convert-queue.mjs --limit 20
//   node scripts/convert-queue.mjs --book "Chicago Booth"
//   node scripts/convert-queue.mjs --id booth_2024_army_hotel
//   node scripts/convert-queue.mjs --summary        pending count per book
//   node scripts/convert-queue.mjs --ids            only the catalog ids, one per line
//   node scripts/convert-queue.mjs --retry-failed    include cases whose last attempt failed
// Order: alphabetical by case title (across all books), skipping cases that already
// have a FAIL report in conversions/ unless --retry-failed is given.
// Requires DATABASE_URL in .env.local.

import { existsSync, readFileSync } from "node:fs";
import { Client } from "pg";
import { config } from "dotenv";
import { loadCatalog, authoredPath, hasAuthoredFile } from "./lib/catalog.mjs";

config({ path: ".env.local" });

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const limit = Number(opt("--limit") ?? 5);
const bookFilter = opt("--book");
const idFilter = opt("--id");
const summary = args.includes("--summary");
const idsOnly = args.includes("--ids");
const retryFailed = args.includes("--retry-failed");

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rows } = await client.query(
  "select id, catalog_case_id, extraction_status from public.cases where catalog_case_id is not null",
);
await client.end();
const dbById = new Map(rows.map((r) => [r.catalog_case_id, r]));

const all = loadCatalog();
const pending = all.filter((e) => {
  const row = dbById.get(e.id);
  if (!(row && row.extraction_status === "basic" && !hasAuthoredFile(e.id))) return false;
  const report = `conversions/${e.id}.md`;
  const failed = existsSync(report) && /VERDICT:\s*FAIL/.test(readFileSync(report, "utf8"));
  return retryFailed || !failed;
});
pending.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }) || a.id.localeCompare(b.id));

if (summary) {
  const counts = new Map();
  for (const e of pending) counts.set(e.book, (counts.get(e.book) ?? 0) + 1);
  for (const [book, n] of counts) console.log(String(n).padStart(4), book);
  console.log(String(pending.length).padStart(4), "TOTAL pending (books with a PDF)");
  process.exit(0);
}

const picked = pending
  .filter((e) => (idFilter ? e.id === idFilter : true))
  .filter((e) => (bookFilter ? e.book.toLowerCase().startsWith(bookFilter.toLowerCase()) : true))
  .slice(0, idFilter ? 1 : limit);

if (!picked.length) {
  console.log("No pending cases match.");
  process.exit(0);
}

if (idsOnly) {
  for (const e of picked) console.log(e.id);
  process.exit(0);
}

for (const e of picked) {
  const row = dbById.get(e.id);
  console.log(`catalog_id:  ${e.id}`);
  console.log(`case_uuid:   ${row.id}`);
  console.log(`title:       ${e.title}`);
  console.log(`book:        ${e.book.replace("|", " ")}`);
  console.log(`pdf:         ${e.pdf}${existsSync(e.pdf) ? "" : "   (FILE NOT FOUND)"}`);
  console.log(
    `pages:       ${e.start}-${e.end ?? "?"}` +
      (e.end ? "" : "   (end unknown: read on until the next case begins)"),
  );
  console.log(
    `catalog:     type=${e.hints.case_type ?? "-"}  industry=${e.hints.industry ?? "-"}  difficulty=${e.hints.difficulty ?? "-"}   (hints only, verify against the PDF)`,
  );
  console.log(`output:      ${authoredPath(e.id)}`);
  console.log("");
}
