-- Demo accounts are hidden from real users.
-- Demo users (is_demo) see everyone; real users never see demo profiles or their
-- availability -- except themselves and anyone they already share a mock with.
alter table public.profiles add column if not exists is_demo boolean not null default false;

-- Everyone who exists today is a demo account except the one real signup.
update public.profiles set is_demo = true where lower(email) <> 'bj297@cornell.edu';

create or replace function public.viewer_is_demo()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_demo from public.profiles where id = auth.uid()), false)
$$;

drop policy if exists "profiles are readable by any authenticated user" on public.profiles;
create policy "profiles visible by demo scope"
  on public.profiles for select
  to authenticated
  using (
    not is_demo
    or id = auth.uid()
    or public.viewer_is_demo()
    or exists (
      select 1 from public.mock_sessions s
      where (s.interviewer_id = auth.uid() and s.interviewee_id = profiles.id)
         or (s.interviewee_id = auth.uid() and s.interviewer_id = profiles.id)
    )
  );

drop policy if exists "availability readable by authenticated" on public.availability;
create policy "availability visible by demo scope"
  on public.availability for select
  to authenticated
  using (
    owner_id = auth.uid()
    or public.viewer_is_demo()
    or not exists (select 1 from public.profiles p where p.id = availability.owner_id and p.is_demo)
  );

-- The "update own profile" policy would let anyone flip is_demo / is_admin from the
-- browser. Only the service role / SQL (auth.uid() is null) may change them.
create or replace function public.protect_profile_flags()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null
     and (new.is_demo is distinct from old.is_demo or new.is_admin is distinct from old.is_admin) then
    raise exception 'is_demo / is_admin cannot be changed from the client';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_flags on public.profiles;
create trigger protect_profile_flags
  before update on public.profiles
  for each row execute function public.protect_profile_flags();
