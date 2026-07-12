-- "End mock & give feedback" now marks the session as ended the moment the interviewer
-- clicks it, so the interviewee's live screen (already realtime-subscribed) can announce
-- that the mock concluded instead of leaving them hanging until feedback is written.
alter table public.mock_sessions add column ended_at timestamptz;

-- ended_at is interviewer-only, same as the presenting/timer fields.
create or replace function public.enforce_interviewer_only_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() <> old.interviewer_id then
    if new.assigned_case_id is distinct from old.assigned_case_id
      or new.presented is distinct from old.presented
      or new.synopsis_shared_to_interviewee is distinct from old.synopsis_shared_to_interviewee
      or new.timer_started_at is distinct from old.timer_started_at
      or new.ended_at is distinct from old.ended_at
    then
      raise exception 'only the interviewer can modify these fields';
    end if;
  end if;
  return new;
end;
$$;
