-- Add the Whale Hotel case (UVA Darden 2020-21 casebook, p.171). It isn't in the
-- imported catalog, so this inserts a new row with a fixed UUID that matches
-- WHALE_HOTEL_CASE_ID in lib/cases/content.ts, where the page-by-page content
-- lives. Marked 'enriched' so it shows as a fully authored case. Idempotent.
insert into public.cases (
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt,
  catalog_case_id, casebook, casebook_year, source_page, extraction_status, firm_style, notes
) values (
  'f9b56e3b-a2bc-4555-92b9-89594746de9c',
  'Whale Hotel',
  'Investment Analysis',
  'Not rated',
  'UVA Darden',
  'Real Estate',
  array['interviewer-led', 'exhibit-heavy', 'math-heavy'],
  'A real estate company that owns luxury hotels is considering a fourth resort in Dubai, aimed at high net worth guests known as "whales". Work out the demand, size the hotel, and decide whether the investment pays back in time.',
  'Our client is a real estate company that owns and operates luxury hotels around the world. They''ve previously owned 3 resorts in Dubai and are considering building a fourth, targeted specifically at high net worth individuals - called whales.',
  'darden_2020_2021_whale_hotel',
  'Darden Case Book',
  '2020-2021',
  171,
  'enriched',
  '[{"firm": "McKinsey", "round": "2"}]'::jsonb,
  'Suggested firm style: McKinsey, interview round 2.'
)
on conflict (id) do update set
  case_type = excluded.case_type,
  extraction_status = 'enriched',
  synopsis = excluded.synopsis,
  full_prompt = excluded.full_prompt,
  tags = excluded.tags;
