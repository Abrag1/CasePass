-- 1. Pre-case sharing: an optional note the interviewee volunteers to their interviewer
--    before the mock ("focusing on math speed this week", etc). Only the interviewee
--    may write it -- enforced with a trigger, mirroring enforce_interviewer_only_fields.
alter table public.mock_sessions add column interviewee_note text;

create function public.enforce_interviewee_only_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() <> old.interviewee_id then
    if new.interviewee_note is distinct from old.interviewee_note then
      raise exception 'only the interviewee can modify this field';
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_enforce_interviewee_only_fields
  before update on public.mock_sessions
  for each row execute function public.enforce_interviewee_only_fields();
