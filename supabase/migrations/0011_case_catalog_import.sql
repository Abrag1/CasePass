-- Widens `cases` to hold the 543-case catalog extracted from 25 real casebooks
-- (see "04 Case Catalog" for the source-of-truth extraction), on top of the
-- existing 2 fully-authored cases. Two kinds of case now coexist in one table:
--   - fully-authored: full_prompt/synopsis/case_steps set, extraction_status = 'enriched'
--   - catalog import: those fields null, extraction_status = 'basic' -- the UI's
--     existing doc_* "Coming soon" fallback already renders these correctly.
--
-- case_type/source_book/difficulty checks are dropped: the catalog spans far more
-- schools and case types than the original 7/6 fixed lists, and the canonical
-- option lists now live in lib/queries/cases.ts (validated at the app layer,
-- same as every other free-text column already in this table).

alter table public.cases
  drop constraint if exists cases_case_type_check,
  drop constraint if exists cases_source_book_check,
  drop constraint if exists cases_difficulty_check;

alter table public.cases
  alter column synopsis drop not null,
  alter column full_prompt drop not null;

alter table public.cases
  add column if not exists catalog_case_id text unique, -- stable id from the source catalog (e.g. "ross_2019_big_ten_bivalves"); null for hand-authored cases
  add column if not exists casebook text,                -- e.g. "Ross Casebook"
  add column if not exists casebook_year text,           -- e.g. "2024" or "2023-2024"
  add column if not exists source_page int,
  add column if not exists extraction_status text not null default 'enriched'
    check (extraction_status in ('basic', 'enriched')),
  add column if not exists skills_tested text[] not null default '{}',
  add column if not exists case_format text,             -- "Interviewer-led" | "Candidate-led" | "Hybrid" | null
  add column if not exists firm_style jsonb not null default '[]', -- [{ "firm": "BCG", "round": "2" }, ...]
  add column if not exists difficulty_note text,          -- honest, school-specific difficulty context (never compared across schools)
  add column if not exists adapted_from text,
  add column if not exists notes text;

-- Existing 2 seed cases are fully authored -- mark them explicitly rather than
-- relying on the column default forever.
update public.cases set extraction_status = 'enriched' where extraction_status is null;

drop view if exists public.cases_public;

create view public.cases_public as
select
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt, case_steps,
  doc_candidate_prompt, doc_background, doc_framework_guidance, doc_math_walkthrough, doc_sample_recommendation,
  is_seed, created_at,
  catalog_case_id, casebook, casebook_year, source_page, extraction_status, skills_tested,
  case_format, firm_style, difficulty_note, adapted_from, notes
from public.cases;

grant select on public.cases_public to authenticated;
