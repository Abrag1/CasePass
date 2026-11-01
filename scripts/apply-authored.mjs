// Publishes converted cases: flips their catalog rows from 'basic' ("Outline") to
// 'enriched' ("Full case") and fills in the metadata the converter wrote in each
// case file's CASE_META. This is a production database change, so it only prints
// the SQL unless you pass --run, and it refuses cases whose verifier report
// (conversions/<id>.md) doesn't say "VERDICT: PASS" unless you pass --force.
//
// Usage:
//   node scripts/apply-authored.mjs <catalog_case_id> [<catalog_case_id> ...]          dry run
//   node scripts/apply-authored.mjs <catalog_case_id> ... --run                        apply
// Requires DATABASE_URL in .env.local for --run.

import { existsSync, readFileSync } from "node:fs";
import { Client } from "pg";
import { config } from "dotenv";
import { loadAuthored, authoredPath } from "./lib/catalog.mjs";

config({ path: ".env.local" });

const args = process.argv.slice(2);
const run = args.includes("--run");
const force = args.includes("--force");
const ids = args.filter((a) => !a.startsWith("--"));
if (!ids.length) {
  console.error("Usage: node scripts/apply-authored.mjs <catalog_case_id> ... [--run] [--force]");
  process.exit(2);
}

const UPDATE = `update public.cases set
  case_type = $1, extraction_status = 'enriched', synopsis = $2, full_prompt = $3, tags = $4
where catalog_case_id = $5 and id = $6`;

const jobs = [];
for (const id of ids) {
  const file = authoredPath(id);
  if (!existsSync(file)) {
    console.error(`${id}: no converted case at ${file}`);
    process.exit(1);
  }
  const report = `conversions/${id}.md`;
  const passed = existsSync(report) && /VERDICT:\s*PASS/.test(readFileSync(report, "utf8"));
  if (!passed && !force) {
    console.error(`${id}: no passing verifier report at ${report} (use --force to override)`);
    process.exit(1);
  }
  const mod = loadAuthored(file);
  const m = mod.CASE_META;
  // The case card shows these; a published case must never fall back to "No synopsis yet".
  const missing = ["case_type", "synopsis", "full_prompt"].filter((k) => !String(m?.[k] ?? "").trim());
  if (!Array.isArray(m?.tags) || !m.tags.length) missing.push("tags");
  if (missing.length) {
    console.error(`${id}: CASE_META is missing ${missing.join(", ")}; fill it in before publishing`);
    process.exit(1);
  }
  jobs.push({ id, uuid: mod.CASE_ID, params: [m.case_type, m.synopsis, m.full_prompt, m.tags, id, mod.CASE_ID] });
}

if (!run) {
  console.log("DRY RUN: nothing was changed. Statements that would run:\n");
  for (const j of jobs) console.log(`-- ${j.id}\n${UPDATE}\n-- params: ${JSON.stringify(j.params)}\n`);
  console.log("Re-run with --run to apply.");
  process.exit(0);
}

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}
const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
for (const j of jobs) {
  const res = await client.query(UPDATE, j.params);
  console.log(`${j.id}: ${res.rowCount === 1 ? "published" : "NO ROW UPDATED (check catalog id / uuid)"}`);
  const chk = await client.query(
    "select extraction_status, synopsis, full_prompt, cardinality(tags) as tags from public.cases where id = $1",
    [j.uuid],
  );
  const r = chk.rows[0];
  const ok = r && r.extraction_status === "enriched" && r.synopsis && r.full_prompt && r.tags > 0;
  console.log(`  card check: ${ok ? "OK (full case, synopsis, prompt and tags are set)" : "PROBLEM " + JSON.stringify(r)}`);
}
await client.end();
