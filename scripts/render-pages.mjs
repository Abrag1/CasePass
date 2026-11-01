// Renders casebook PDF pages to PNG images so they can be LOOKED AT (the Read tool
// can open PNGs). Text extraction loses charts and flattens bullet hierarchy; the
// picture is the source of truth for layout, nesting and exhibits.
//
// Usage: node scripts/render-pages.mjs <pdf> <first-page> <last-page> [out-dir] [scale]
//   pages are 1-based and equal the casebook's PDF page numbers
//   out-dir defaults to <os temp>/casepass-pages; scale defaults to 1.6
// Prints the path of each PNG written.

import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as mupdf from "mupdf";

const [pdf, firstArg, lastArg, outArg, scaleArg] = process.argv.slice(2);
if (!pdf || !firstArg || !lastArg) {
  console.error("Usage: node scripts/render-pages.mjs <pdf> <first-page> <last-page> [out-dir] [scale]");
  process.exit(2);
}
const first = Number(firstArg);
const last = Number(lastArg);
const outDir = outArg ?? join(tmpdir(), "casepass-pages");
const scale = Number(scaleArg ?? 1.6);
mkdirSync(outDir, { recursive: true });

import { readFileSync } from "node:fs";
const doc = mupdf.Document.openDocument(readFileSync(pdf), "application/pdf");
const total = doc.countPages();
if (first < 1 || last > total || first > last) {
  console.error(`Page range ${first}-${last} is outside the document (1-${total})`);
  process.exit(2);
}
for (let p = first; p <= last; p++) {
  const page = doc.loadPage(p - 1);
  const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
  const file = join(outDir, `page-${String(p).padStart(3, "0")}.png`);
  writeFileSync(file, pix.asPNG());
  console.log(file);
}
