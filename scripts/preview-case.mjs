// Renders a converted case with the app's REAL components and screenshots every section, so
// the result can be LOOKED AT (Read tool on the PNGs) and compared with the casebook pages.
// No login, dev server or database needed.
//
// Usage: node scripts/preview-case.mjs <catalog_case_id | case uuid> [out-dir]
//   out-dir defaults to <os temp>/casepass-preview/<id>
// Prints the path of each section PNG. Needs Edge or Chrome installed (headless screenshot).

import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { authoredPath, loadAuthored } from "./lib/catalog.mjs";

const [idArg, outArg] = process.argv.slice(2);
if (!idArg) {
  console.error("Usage: node scripts/preview-case.mjs <catalog_case_id | case uuid> [out-dir]");
  process.exit(2);
}
const root = resolve(".");
const caseUuid = existsSync(authoredPath(idArg)) ? loadAuthored(authoredPath(idArg)).CASE_ID : idArg;
const outDir = outArg ?? join(tmpdir(), "casepass-preview", idArg);
mkdirSync(outDir, { recursive: true });
// Clear the previous run so a stale PNG is never mistaken for a fresh screenshot.
for (const f of readdirSync(outDir)) if (/^section-\d+\.(png|html)$/.test(f)) rmSync(join(outDir, f));
const work = join(tmpdir(), "casepass-preview-build");
mkdirSync(work, { recursive: true });

// 1. Bundle a tiny renderer that uses the app's own PageBody for each section.
const entry = join(work, "entry.tsx");
writeFileSync(
  entry,
  `import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { PageBody } from "@/components/cases/blocks";
import { getCasePages, livePages } from "@/lib/cases/content";
const [caseId, outDir] = process.argv.slice(2);
const pages = getCasePages(caseId);
if (!pages) throw new Error("no pages for " + caseId);
const live = livePages(pages);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
live.forEach((p, i) => {
  const body = renderToStaticMarkup(<PageBody page={p} sayLabel="Say next" />);
  const html = '<!doctype html><html><head><meta charset="utf-8"><style>' +
    'body{margin:0;background:#f6f7f4;font-family:Inter,Segoe UI,system-ui,sans-serif;color:#1f2421}' +
    '.wrap{max-width:820px;margin:0 auto;padding:28px 32px}' +
    '.meta{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8a8f8a;font-weight:600}' +
    '.ttl{font-family:Georgia,serif;font-size:22px;font-weight:600;margin:4px 0 18px}' +
    '.card{background:#fff;border:1px solid #e6e7e3;border-radius:12px;padding:22px}' +
    '</style></head><body><div class="wrap"><div class="meta">Section ' + (i + 1) + ' of ' + live.length + ' · ' + esc(p.label) +
    '</div><div class="ttl">' + esc(p.title) + '</div><div class="card">' + body + '</div></div></body></html>';
  writeFileSync(outDir + "/section-" + String(i + 1).padStart(2, "0") + ".html", html);
});
console.log(live.length);
`,
);
const bundle = join(work, "entry.cjs");
await build({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  alias: { "@": root },
  nodePaths: [join(root, "node_modules")],
  outfile: bundle,
  logLevel: "error",
});
const run = spawnSync(process.execPath, [bundle, caseUuid, outDir], { encoding: "utf8" });
if (run.status !== 0) {
  console.error(run.stderr || run.stdout);
  process.exit(1);
}

// 2. Screenshot each section with a headless browser.
const candidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Edge/Chrome found for screenshots; the HTML files are in " + outDir);
  process.exit(1);
}
for (const f of readdirSync(outDir).filter((n) => n.endsWith(".html")).sort()) {
  const png = join(outDir, f.replace(/\.html$/, ".png"));
  // A fresh browser profile per screenshot: a lingering instance would otherwise swallow the next launch.
  const profile = mkdtempSync(join(tmpdir(), "casepass-preview-profile-"));
  spawnSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      `--user-data-dir=${profile}`,
      "--window-size=900,1500",
      `--screenshot=${png}`,
      pathToFileURL(join(outDir, f)).href,
    ],
    { stdio: "ignore" },
  );
  // Edge/Chrome may hand the screenshot to a background process: wait for the file (max ~20s).
  for (let i = 0; i < 80 && !existsSync(png); i++) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
  if (!existsSync(png)) {
    console.error(`Screenshot failed for ${f}`);
    process.exit(1);
  }
  console.log(png);
}
