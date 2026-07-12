-- CasePass seed data: the two fully-authored cases.
--
-- The rich page-by-page content (prompts, exhibits, guidance, answers) lives in
-- lib/cases/content.ts, keyed by the UUIDs below — this table holds only the
-- case-level metadata the library, filters, and session assignment need. The two
-- ids here MUST match ACES_CASE_ID / AMAIR_CASE_ID in lib/cases/content.ts.
--
-- Reseeding wipes the previous placeholder casebook. Any live/scheduled session
-- that pointed at an old case has its assignment cleared so the case rows can be
-- deleted (a preview-build reset; real sessions simply re-select a case).

update public.mock_sessions
  set assigned_case_id = null, presented = null, synopsis_shared_live = false
  where assigned_case_id is not null;

delete from public.case_exhibits;
delete from public.cases;

insert into public.cases (
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt, case_steps, is_seed
) values
(
  '11111111-1111-1111-1111-111111111111',
  'Aces Delivery Service', 'Profitability', 'Easy', 'Cornell', 'Transportation & Logistics',
  array['math-heavy', 'exhibit-heavy', 'interviewer-led'],
  'Aces, a package-delivery firm, saw its market share crash from 33% to 20% then rebound to 40% within months — but its profits collapsed from +$20M to a $136M loss. Diagnose why and recommend a fix.',
  'Our client, Aces, is a package delivery firm operating in Country XYZ. Five years ago, XYZ’s government deregulated the package delivery industry, leaving three identical firms — Aces, Deuces, and Jacks — to fill the void. Each firm is required to operate in every municipality in the country. The market has held steady at 300 million packages a year for nearly three decades. About 15 months ago, Aces’ market share suddenly fell to 20%, then rebounded to 40%. Determine whether Aces needs to change anything given this new dynamic.',
  '[]'::jsonb,
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'American Airlines', 'Growth', 'Medium', 'Cornell', 'Aviation',
  array['exhibit-heavy', 'interviewee-led'],
  'American Airlines has had a year of weaker-than-average growth. Devise a set of strategies for profitable revenue growth in a highly competitive, price-sensitive market.',
  'Your client is American Airlines. Competition is fierce among the major airlines, with prices being driven steadily downward. After a year of weaker-than-average growth, they have hired our firm to devise a set of strategies for profitable revenue growth.',
  '[]'::jsonb,
  true
);
