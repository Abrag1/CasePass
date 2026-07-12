# CasePass

A scheduling-and-practice app for case-interview prep: partners book mock
interviews, one side runs the case as interviewer while the other practices as
interviewee, and the interviewer leaves structured feedback afterward.

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **Supabase**
(Postgres + Auth + Realtime), and **Tailwind CSS v4**.

## The casebook

The library ships with two fully-authored cases:

| Case | Type | Format | Notes |
| --- | --- | --- | --- |
| **Aces Delivery Service** | Profitability · Easy · Cornell | Interviewer-led | Math- and exhibit-heavy. A package-delivery firm whose share swung 33% → 20% → 40% while profit collapsed from +$20M to a $136M loss. Stacked-bar and cost-structure exhibits, a segment-share table, full calculation walkthroughs, and an interviewer cheat sheet. |
| **American Airlines** | Growth · Medium · Cornell | Interviewee-led | Qualitative growth case; the candidate drives the structure. Grouped-bar, seasonal line-chart, and price-sensitivity exhibits, with a conditionally-revealed price-elasticity exhibit and "what to listen for" interviewer notes. |

### Where case content lives

Case-level metadata (name, type, difficulty, source, tags, synopsis) is stored
in the `cases` table so the library, filters, and session assignment work off the
database. The **rich, page-by-page content** — prompts, exhibits, interviewer
guidance, calculations, and model answers — lives in
[`lib/cases/content.ts`](lib/cases/content.ts) as an ordered array of page
objects, keyed by case UUID. That single source of truth feeds both the "Full
case" document view and the Live Mock screen.

Interviewer-only fields (guidance, calculations, answers, cheat sheet) are never
sent to an interviewee's browser: the Live Mock server route ships full pages to
the interviewer and `redactPagesForCandidate()`-stripped pages (prompt body +
exhibit data only) to the interviewee.

## Live Mock

The real-time interview screen is data-driven off the case's page objects:

- **Step navigator** — horizontally-scrollable chapter pills, one per case step.
- **Two view modes** — *Step-by-step* (one step at a time with prev/next) and
  *All sections* (the whole case in one scroll), over the same step list.
- **Present to candidate** — one step on the candidate's screen at a time; the
  prompt shows its text, an exhibit shows only its chart/table (never the
  answer/guidance), synced to the other participant over Supabase Realtime.
- **Share synopsis** — an interviewer-controlled toggle (off by default) that
  gates the case-synopsis chip on the candidate screen.
- **Role separation** — the *Your view / Both screens* layout control renders for
  the interviewer only, and "both screens" is derived as
  `isInterviewer && layoutPreference === 'both'` so an interviewee can never be
  forced into split view and see the private interviewer panel.

Shared block renderers live in
[`components/cases/blocks.tsx`](components/cases/blocks.tsx) (callout boxes and
every exhibit type, with a `dark` variant for the candidate screen).

## Getting started

1. **Environment** — copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL` (Postgres connection string, used by the SQL runner below)

2. **Database** — apply the migrations and seed against the hosted Postgres
   instance with the bundled runner (no Docker or `supabase login` needed):

   ```bash
   node scripts/run-sql.mjs supabase/migrations/*.sql supabase/seed.sql
   ```

   `supabase/seed.sql` wipes any previous placeholder casebook and inserts the two
   cases above (their UUIDs must match `ACES_CASE_ID` / `AMAIR_CASE_ID` in
   `lib/cases/content.ts`).

3. **Run the dev server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

> This project lives inside OneDrive, whose sync can lock files under `.next` and
> break a build with `EBUSY`. If that happens, build into an alternate dir:
> `NEXT_DIST_DIR=.next-build npm run build`.

## Project layout

- `app/(app)/` — authenticated app (home, schedule, cases, mocks, profile,
  settings); `app/(auth)/` — login/signup.
- `lib/cases/` — case content data model and helpers.
- `lib/actions/` — server actions; `lib/queries/` — read helpers.
- `lib/supabase/` — client/server/proxy Supabase setup and hand-written types.
- `supabase/migrations/` — schema; `supabase/seed.sql` — casebook seed.
