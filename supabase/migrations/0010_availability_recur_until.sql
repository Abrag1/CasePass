-- Recurring availability can now have an end date ("Ends on …" in the calendar's
-- repeat control). Null = repeats indefinitely.
alter table public.availability add column if not exists recur_until date;
