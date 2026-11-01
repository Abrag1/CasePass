// Removes a converted case from lib/cases/authored/index.ts (so a failed conversion never gets
// committed or deployed), or marks a case as reviewed by the owner.
//
// Usage:
//   node scripts/case-registry.mjs remove <catalog_case_id>    unregister and delete the case file
//   node scripts/case-registry.mjs confirm <catalog_case_id>   mark the case as reviewed by the owner

import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { authoredPath } from "./lib/catalog.mjs";

const [cmd, id] = process.argv.slice(2);
if (!["remove", "confirm"].includes(cmd) || !id) {
  console.error("Usage: node scripts/case-registry.mjs remove|confirm <catalog_case_id>");
  process.exit(2);
}
const file = authoredPath(id);
const indexPath = "lib/cases/authored/index.ts";

if (cmd === "confirm") {
  if (!existsSync(file)) {
    console.error(`${id}: no case file`);
    process.exit(1);
  }
  const t = readFileSync(file, "utf8");
  const re = /review:\s*"(auto|confirmed)"/;
  if (!re.test(t)) {
    console.error(`${id}: CASE_META.review not found`);
    process.exit(1);
  }
  writeFileSync(file, t.replace(re, 'review: "confirmed"'));
  console.log(`${id}: marked as confirmed (commit and push to remove the "auto-generated" notice)`);
} else {
  const t = readFileSync(indexPath, "utf8");
  const eol = t.includes("\r\n") ? "\r\n" : "\n";
  const alias = t.match(new RegExp("import \\* as (\\w+) from \"\\./" + id + "\""))?.[1];
  const lines = t
    .split(/\r?\n/)
    .filter((l) => !(l.includes("./" + id + '"') || (alias && l.trim() === alias + ",")));
  writeFileSync(indexPath, lines.join(eol));
  if (existsSync(file)) rmSync(file);
  console.log(`${id}: unregistered and case file deleted`);
}
