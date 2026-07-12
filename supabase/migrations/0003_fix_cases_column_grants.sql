-- 0002 added a narrower column-level GRANT on `cases`, assuming `authenticated` had no
-- prior table-level privileges on it. That assumption was wrong: Supabase grants
-- `anon`/`authenticated` full table-level privileges (SELECT/INSERT/UPDATE/DELETE/...)
-- on every new table by default, expecting RLS alone to be the real gate. That
-- pre-existing blanket grant meant 0002's new permissive SELECT policy let any
-- authenticated user read answer_notes/doc_interviewer_guide directly from the base
-- table, verified and confirmed as a real hole (not just theoretical).
--
-- Fix: explicitly revoke everything on `cases` from anon/authenticated, then grant
-- back only SELECT on the safe columns to `authenticated`. anon gets nothing --
-- the app has no unauthenticated case browsing.
revoke all on public.cases from anon, authenticated;

grant select (
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt, case_steps,
  doc_candidate_prompt, doc_background, doc_framework_guidance, doc_math_walkthrough, doc_sample_recommendation,
  is_seed, created_at
) on public.cases to authenticated;
