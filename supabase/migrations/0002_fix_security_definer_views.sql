-- Addresses Supabase Security Advisor: "Security Definer View" on cases_public and
-- skill_profile. Both views defaulted to running with their creator's privileges
-- (bypassing the querying user's RLS) since Postgres views don't opt into
-- security_invoker unless told to.
--
-- skill_profile: this was never meant to be queried directly by end users at all --
-- only through the get_my_skill_profile()/get_partner_profile() SECURITY DEFINER
-- functions, which already run as their owner regardless of the view's own setting.
-- Making it security_invoker is a pure improvement: if anything ever queries it
-- directly, the underlying feedback/mock_sessions RLS now applies to *that user*,
-- so at worst they'd see their own related rows -- never bypass RLS by accident.
alter view public.skill_profile set (security_invoker = true);

-- cases_public: this one *intentionally* exposes a curated subset of `cases` (every
-- column except the two spoiler fields, answer_notes/doc_interviewer_guide) to any
-- authenticated user, while the base `cases` table blocks direct reads entirely.
-- Making the view security_invoker means Postgres will check the querying user's own
-- privileges against the base table -- so we now grant `authenticated` column-level
-- SELECT on cases, explicitly excluding the two spoiler columns. This is *more* robust
-- than the previous approach: even a query that bypasses the view and hits
-- `public.cases` directly can only ever select the same safe columns; Postgres itself
-- refuses to return answer_notes/doc_interviewer_guide to that role, independent of RLS.
grant select (
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt, case_steps,
  doc_candidate_prompt, doc_background, doc_framework_guidance, doc_math_walkthrough, doc_sample_recommendation,
  is_seed, created_at
) on public.cases to authenticated;

create policy "cases (safe columns) are readable by any authenticated user"
  on public.cases for select
  to authenticated
  using (true);

alter view public.cases_public set (security_invoker = true);
