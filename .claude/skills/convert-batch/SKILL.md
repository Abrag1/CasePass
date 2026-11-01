---
name: convert-batch
description: Autonomously converts casebook cases into CasePass cases, one after another in alphabetical order, and publishes each one that the converter and the independent verifier both pass. Use when the owner says "run the batch", "convert the next N cases" or "go off and convert".
---

# Batch conversion (autonomous, owner pre-authorized)

The owner has authorized this loop to commit, push to `main` and publish WITHOUT asking per case,
but only for cases that pass every gate below. Published cases carry
`CASE_META.review: "auto"`, which shows an "Auto-generated · pending review" badge on the case
list and the case page until the owner confirms the case.

You (the main session) orchestrate; subagents cannot spawn subagents. Per case you run
`case-converter`, then `case-verifier` (fall back to `general-purpose` agents given the contents
of `.claude/agents/case-converter.md` / `case-verifier.md` if those types are not registered).
Keep your own context small: ask agents for short reports and never paste case content here.

## Inputs
`/convert-batch [N]` (default N = 5 cases per run; the owner can say "all"). Cases come from
`node scripts/convert-queue.mjs --ids --limit N`: alphabetical by case title across every
casebook that has a PDF, skipping cases already converted or already failed.

## Preflight (stop and tell the owner if any fails)
1. `git status --short`: nothing staged; the files this loop needs (the renderer, `lib/cases/content.ts`,
   `lib/cases/authored/index.ts` in its `MODULES` form, the badge code in `app/(app)/cases`) must already
   be committed and pushed. If they are not, stop and ask the owner to commit them first.
2. `git branch --show-current` is `main`. `.env.local` has `DATABASE_URL`.
3. `node scripts/convert-queue.mjs --ids --limit N` returns ids.

## Per case (repeat for each id)
1. **Convert.** Run the converter on the id. It writes `lib/cases/authored/<id>.ts` (with
   `review: "auto"`), registers it, and may add exhibit images under `public/cases/`.
2. **Verify.** Run the verifier on the same id. It runs `node scripts/verify-case.mjs <id>`, renders
   every section with `node scripts/preview-case.mjs <id>` and compares every exhibit with the source
   page. Save its full report to `conversions/<id>.md` (it ends in `VERDICT: PASS` or `VERDICT: FAIL`).
3. **Gate.** The case may be published only if ALL hold:
   - the verifier says `VERDICT: PASS`, with zero CRITICAL and zero MAJOR findings;
   - `node scripts/verify-case.mjs <id>` ends in `MECHANICAL: PASS` (run it yourself, do not trust the report);
   - the converter's report lists no "unsupported exhibit" and no unresolved FLAGS about wrong numbers,
     guessed values or missing pages (flags for source typos or booklet furniture are fine);
   - `npx tsc --noEmit` has no errors in `lib/cases/authored` and `npx eslint lib/cases/authored` is clean.
4. **If the gate fails:** give the converter the verifier's findings and run it once more, then verify
   again. If it still fails, call it failed: write `VERDICT: FAIL` plus the reasons at the top of
   `conversions/<id>.md`, run `node scripts/case-registry.mjs remove <id>` (so nothing half-done is
   deployed), delete any exhibit images it added, and commit only the report:
   `git add conversions/<id>.md && git commit -m "Conversion failed: <id>"`. Move on to the next case.
5. **If the gate passes:** commit only this case's files, never `git add -A`:
   `git add lib/cases/authored/<id>.ts lib/cases/authored/index.ts conversions/<id>.md` plus any new
   `public/cases/` images the converter listed, then
   `git commit -m "Auto-convert <title> (<book> <year>)"` with the attribution line from the session.
   Remember the id in this run's "ready to publish" list.

## Push and publish (after every 5 passed cases, and at the end of the run)
1. `git push origin main`. If it fails, stop and report.
2. `node scripts/apply-authored.mjs <ready ids> --run` (WITHOUT `--force`: it requires the
   `VERDICT: PASS` report and complete `CASE_META`). Each id must print `published` and `card check: OK`.
   Pushing first means the case content is deployed before the case is flagged "Full case".
3. Clear the ready list.

## Stop conditions
Stop the run and report (do not push on) if: 3 cases fail in a row; a script errors unexpectedly;
git or the database refuses a command; the PDF for a case is missing (skip that case and say so,
but only stop if it happens repeatedly); the owner interrupts. Never use `--force`, never edit
`CASE_META.review` to "confirmed", never touch migrations, never change cases that are not in
this run's list.

## Final report (short)
A table: id, title, result (published / failed / skipped), and for failures the one-line reason.
Then: how many remain in the queue (`node scripts/convert-queue.mjs --summary`), the live ids to
review, and the reminder that every published case shows the auto-generated badge until
`node scripts/case-registry.mjs confirm <id>` is run, committed and pushed.
