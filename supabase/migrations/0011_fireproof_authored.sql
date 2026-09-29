-- Author the Fire Proof Inc. case (UVA Darden 2018-19 casebook, p.83).
-- Its full page-by-page content lives in lib/cases/content.ts (keyed by this row's
-- UUID). Here we fill the catalog row's metadata and mark it 'enriched' so the
-- library card and case doc treat it as a fully authored case rather than an
-- outline. Idempotent.
update public.cases set
  case_type = 'Market Entry',
  extraction_status = 'enriched',
  synopsis = 'Fire Proof Inc., the #1 maker of fire-resistant gear for fire departments (~$500M sales, growing 4%/yr), wants to diversify its revenue and product line. Advise the CEO: assess which adjacent markets are worth entering, size the opportunity, test it against an ROI target, and recommend.',
  full_prompt = 'The CEO of Fire Proof Inc. wants to find new ways to diversify her revenue and product line. Currently, Fire Proof only sells fire-resistant jackets, gloves, hard-hats, and tools to government-sponsored fire departments nationwide. The CEO believes the company can expand its operations to make equipment for other industries. How would you advise Fire Proof Inc.?',
  tags = array['interviewer-led', 'light-math', 'brainstorming']
where id = '72dea52c-0cf9-42eb-afb5-5d7cc5ff9c93';
