-- Live Mock redesign
-- 1. `presented` becomes a page INDEX (into the case's live step list) instead of
--    the old fixed 'prompt'/'ex1'/'ex2' enum. The new Live Mock is data-driven off
--    an arbitrary-length page array, so a single nullable int is the right pointer.
-- 2. `synopsis_shared_live` — the interviewer-controlled toggle that decides whether
--    the case-synopsis chip is visible on the candidate's live screen. Defaults off
--    so the synopsis never leaks just because a session started.

-- 1. presented: text enum -> integer index -------------------------------------
alter table public.mock_sessions drop constraint if exists mock_sessions_presented_check;

-- Old enum values ('prompt'/'ex1'/'ex2') can't cast to int; clear them first.
update public.mock_sessions set presented = null where presented is not null;

alter table public.mock_sessions
  alter column presented type integer using (nullif(presented, '')::integer);

alter table public.mock_sessions
  add constraint mock_sessions_presented_nonneg check (presented is null or presented >= 0);

-- 2. synopsis_shared_live ------------------------------------------------------
alter table public.mock_sessions
  add column if not exists synopsis_shared_live boolean not null default false;

-- Extend the defense-in-depth trigger so an interviewee JWT can't flip the new
-- interviewer-only field directly against Postgres.
create or replace function public.enforce_interviewer_only_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() <> old.interviewer_id then
    if new.assigned_case_id is distinct from old.assigned_case_id
      or new.presented is distinct from old.presented
      or new.synopsis_shared_to_interviewee is distinct from old.synopsis_shared_to_interviewee
      or new.synopsis_shared_live is distinct from old.synopsis_shared_live
      or new.timer_started_at is distinct from old.timer_started_at
    then
      raise exception 'only the interviewer can modify these fields';
    end if;
  end if;
  return new;
end;
$$;
