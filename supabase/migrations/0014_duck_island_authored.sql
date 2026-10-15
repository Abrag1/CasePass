-- Author the Duck Island Beer Co. case (Duke Fuqua DMCC 2018-19 casebook, p.133).
-- Its full page-by-page content lives in lib/cases/content.ts (keyed by this row's
-- UUID). Here we fill the catalog row's metadata and mark it 'enriched' so the
-- library card and case doc treat it as a fully authored case rather than an
-- outline. Idempotent.
update public.cases set
  case_type = 'Market Entry',
  extraction_status = 'enriched',
  synopsis = 'Duck Island Beer Co., a craft brewer from Austin that sells almost everywhere in the world, wants to start selling in the United Kingdom. Advise the CEO: which style of beer should it sell, would it be profitable, and how should it enter?',
  full_prompt = 'Your client is a craft beer company called Duck Island Beer Company out of Austin, TX. They are an international craft beer company beloved by craft drinkers around the world. They are looking to start selling beer in the United Kingdom. They want to know which style of beer to sell and if it would be profitable.',
  tags = array['candidate-led', 'market-entry', 'exhibit-heavy', 'light-math']
where id = '767cbae2-9bc8-4eb9-a66c-8e339892140f';
