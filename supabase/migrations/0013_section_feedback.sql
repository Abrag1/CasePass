-- Section-by-section feedback: per-section notes + time spent, captured during the
-- mock and stored on the final feedback. Shape (see lib/interview/model.ts):
--   { "sections": [{ "key", "label", "title", "seconds", "notes" }], "general": "..." }
-- Additive and nullable, so older feedback rows keep working unchanged.
alter table public.feedback add column if not exists section_feedback jsonb;
