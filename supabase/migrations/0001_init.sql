-- CasePass initial schema
-- Case-interview scheduling & practice app. See /supabase/migrations/README.md (plan doc)
-- for the reasoning behind the privacy boundaries below.

-- ============================================================================
-- profiles (1:1 with auth.users)
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  initials text not null,
  year_tag text,
  email text not null,
  avatar_color text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by any authenticated user"
  on public.profiles for select
  to authenticated
  using (true);

create policy "users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
-- full_name/year_tag come from the signup form via supabase.auth.signUp({ options: { data: {...} } }).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full_name text := coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1));
  v_initials text := (
    select string_agg(left(part, 1), '')
    from (
      select unnest(string_to_array(trim(v_full_name), ' ')) as part
      limit 2
    ) parts
  );
begin
  insert into public.profiles (id, full_name, initials, year_tag, email)
  values (
    new.id,
    v_full_name,
    coalesce(upper(v_initials), '?'),
    new.raw_user_meta_data ->> 'year_tag',
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- cases + case_exhibits (the casebook library)
-- ============================================================================
create table public.cases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  case_type text not null check (case_type in ('Profitability', 'Market entry', 'Pricing', 'Operations', 'Growth', 'M&A')),
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  source_book text not null check (source_book in ('Kellogg', 'Cornell', 'UVA Darden', 'Ross', 'Wharton', 'Booth', 'Tuck')),
  industry text,
  tags text[] not null default '{}',
  synopsis text not null,
  full_prompt text not null,
  case_steps jsonb not null default '[]', -- [{ "order": 1, "text": "..." }, ...]

  -- Spoiler content: never exposed through cases_public / the general library read path.
  -- Only reachable via get_case_answer_notes() by that session's interviewer.
  answer_notes text,
  doc_interviewer_guide text,

  -- Casebook doc pages. Left null = renders as "coming soon" in the UI, no migration needed later.
  doc_candidate_prompt text,
  doc_background text,
  doc_framework_guidance text,
  doc_math_walkthrough text,
  doc_sample_recommendation text,

  is_seed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.case_exhibits (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases (id) on delete cascade,
  position int not null,
  title text not null,
  kind text not null check (kind in ('bar_list', 'table')),
  data jsonb not null,
  unique (case_id, position)
);

-- Base `cases` table is NOT directly selectable by regular users -- everyone reads through
-- `cases_public` (below), which the view owner (unaffected by RLS) can safely filter columns from.
alter table public.cases enable row level security;
alter table public.case_exhibits enable row level security;

create policy "exhibits are readable by any authenticated user"
  on public.case_exhibits for select
  to authenticated
  using (true);

create view public.cases_public as
select
  id, name, case_type, difficulty, source_book, industry, tags, synopsis, full_prompt, case_steps,
  doc_candidate_prompt, doc_background, doc_framework_guidance, doc_math_walkthrough, doc_sample_recommendation,
  is_seed, created_at
from public.cases;

grant select on public.cases_public to authenticated;
grant select on public.case_exhibits to authenticated;

-- Returns the two spoiler fields, but only to the interviewer of a session that this case
-- is actually assigned to. Called explicitly by the interviewer's own screens (assign/live),
-- never by a general library browse.
create function public.get_case_answer_notes(p_case_id uuid, p_session_id uuid)
returns table (answer_notes text, doc_interviewer_guide text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.mock_sessions ms
    where ms.id = p_session_id
      and ms.interviewer_id = auth.uid()
      and ms.assigned_case_id = p_case_id
  ) then
    return;
  end if;

  return query
  select c.answer_notes, c.doc_interviewer_guide
  from public.cases c
  where c.id = p_case_id;
end;
$$;

grant execute on function public.get_case_answer_notes(uuid, uuid) to authenticated;

-- ============================================================================
-- mock_sessions (a scheduled/live/completed mock interview)
-- ============================================================================
create table public.mock_sessions (
  id uuid primary key default gen_random_uuid(),
  interviewer_id uuid not null references public.profiles (id) on delete cascade,
  interviewee_id uuid not null references public.profiles (id) on delete cascade,
  scheduled_at timestamptz not null,
  format text not null check (format in ('45_full', '30_short', '60_case_feedback')),
  meeting_link text,
  notes text,
  status text not null default 'pending_invite'
    check (status in ('pending_invite', 'confirmed', 'case_selected', 'completed', 'declined')),
  assigned_case_id uuid references public.cases (id),
  synopsis_shared_to_interviewee text,
  presented text check (presented in ('prompt', 'ex1', 'ex2')),
  presented_updated_at timestamptz,
  timer_started_at timestamptz,
  created_at timestamptz not null default now(),

  constraint interviewer_ne_interviewee check (interviewer_id <> interviewee_id)
);

create index mock_sessions_interviewer_idx on public.mock_sessions (interviewer_id);
create index mock_sessions_interviewee_idx on public.mock_sessions (interviewee_id);

alter table public.mock_sessions enable row level security;

create policy "participants can read their sessions"
  on public.mock_sessions for select
  to authenticated
  using (auth.uid() in (interviewer_id, interviewee_id));

create policy "a participant can create a session they're part of"
  on public.mock_sessions for insert
  to authenticated
  with check (auth.uid() in (interviewer_id, interviewee_id));

create policy "participants can update their sessions"
  on public.mock_sessions for update
  to authenticated
  using (auth.uid() in (interviewer_id, interviewee_id))
  with check (auth.uid() in (interviewer_id, interviewee_id));

-- Defense in depth: interviewer-only fields can only change via an update made by the interviewer,
-- even though the app's server actions already enforce this. Guards against someone hitting
-- Postgres directly with a valid interviewee JWT.
create function public.enforce_interviewer_only_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() <> old.interviewer_id then
    if new.assigned_case_id is distinct from old.assigned_case_id
      or new.presented is distinct from old.presented
      or new.synopsis_shared_to_interviewee is distinct from old.synopsis_shared_to_interviewee
      or new.timer_started_at is distinct from old.timer_started_at
    then
      raise exception 'only the interviewer can modify these fields';
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_enforce_interviewer_only_fields
  before update on public.mock_sessions
  for each row execute function public.enforce_interviewer_only_fields();

-- Required for the live mock's `presented` pointer + timer to sync over Supabase
-- Realtime (postgres_changes). RLS on mock_sessions still governs who receives updates.
alter publication supabase_realtime add table public.mock_sessions;

-- ============================================================================
-- session_invites (request/accept/decline/reschedule audit trail)
-- ============================================================================
create table public.session_invites (
  id uuid primary key default gen_random_uuid(),
  mock_session_id uuid not null references public.mock_sessions (id) on delete cascade,
  requested_by uuid not null references public.profiles (id),
  requested_of uuid not null references public.profiles (id),
  proposed_role text not null check (proposed_role in ('interviewer', 'interviewee')),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined', 'reschedule_requested')),
  created_at timestamptz not null default now(),
  responded_at timestamptz
);

alter table public.session_invites enable row level security;

create policy "participants can read their invites"
  on public.session_invites for select
  to authenticated
  using (auth.uid() in (requested_by, requested_of));

create policy "a participant can create an invite they're part of"
  on public.session_invites for insert
  to authenticated
  with check (auth.uid() in (requested_by, requested_of));

create policy "participants can update their invites"
  on public.session_invites for update
  to authenticated
  using (auth.uid() in (requested_by, requested_of))
  with check (auth.uid() in (requested_by, requested_of));

-- ============================================================================
-- prepped_cases / saved_cases -- strictly own-row, never shared with a partner
-- ============================================================================
create table public.prepped_cases (
  user_id uuid not null references public.profiles (id) on delete cascade,
  case_id uuid not null references public.cases (id) on delete cascade,
  prepped boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, case_id)
);

create table public.saved_cases (
  user_id uuid not null references public.profiles (id) on delete cascade,
  case_id uuid not null references public.cases (id) on delete cascade,
  saved boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, case_id)
);

alter table public.prepped_cases enable row level security;
alter table public.saved_cases enable row level security;

create policy "users manage their own prepped cases"
  on public.prepped_cases for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users manage their own saved cases"
  on public.saved_cases for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- session_private_notes -- per-author scratch notes during a live mock, never
-- readable by anyone but the author (not even the other participant in the session).
-- ============================================================================
create table public.session_private_notes (
  mock_session_id uuid not null references public.mock_sessions (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  notes text not null default '',
  updated_at timestamptz not null default now(),
  primary key (mock_session_id, author_id)
);

alter table public.session_private_notes enable row level security;

create policy "authors manage their own private notes"
  on public.session_private_notes for all
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- ============================================================================
-- feedback
-- ============================================================================
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  mock_session_id uuid not null unique references public.mock_sessions (id) on delete cascade,
  author_id uuid not null references public.profiles (id),   -- always the session's interviewer
  subject_id uuid not null references public.profiles (id),  -- the interviewee being rated
  recap_text text,
  skill_ratings jsonb not null default '{}',
  -- { "clarifying_questions": 3, "structure": 2, "math": 1, "exhibit_interpretation": 2,
  --   "business_judgment": 3, "communication": 3, "recommendation": 2 }
  went_well text,
  improve text,
  practice_next text,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

create policy "author and subject can read feedback"
  on public.feedback for select
  to authenticated
  using (auth.uid() in (author_id, subject_id));

create policy "only the session's interviewer can submit feedback"
  on public.feedback for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.mock_sessions ms
      where ms.id = mock_session_id
        and ms.interviewer_id = auth.uid()
        and ms.interviewee_id = subject_id
    )
  );

-- ============================================================================
-- privacy_settings -- owner-only, never exposed directly to a partner.
-- Partner-facing reads only ever go through get_partner_profile() below.
-- ============================================================================
create table public.privacy_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  share_full_history boolean not null default true,
  share_past_feedback boolean not null default true,
  share_weak_areas boolean not null default true,
  allow_interviewer_notes_back boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.privacy_settings enable row level security;

create policy "users manage their own privacy settings"
  on public.privacy_settings for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Default privacy_settings row on signup (all-share defaults, matching the prototype).
create function public.handle_new_user_privacy()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.privacy_settings (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_profile_created_privacy
  after insert on public.profiles
  for each row execute function public.handle_new_user_privacy();

-- ============================================================================
-- skill_profile -- aggregated stats, computed on read (not materialized).
-- Not directly granted to `authenticated` -- reached only via get_my_skill_profile()
-- and get_partner_profile() so the privacy gating lives in one place.
-- ============================================================================
create view public.skill_profile as
select
  f.subject_id as user_id,
  count(*)::int as total_cases,
  count(*) filter (where f.created_at >= date_trunc('month', now()))::int as cases_this_month,
  round(avg(
    case ms.format
      when '45_full' then 45
      when '30_short' then 30
      when '60_case_feedback' then 60
    end
  ))::int as avg_length_minutes,
  count(distinct c.source_book)::int as distinct_books_used,
  (
    select jsonb_object_agg(kv.skill, kv.avg_rating)
    from (
      select e.key as skill, round(avg(e.value::numeric), 2) as avg_rating
      from public.feedback f2
      cross join lateral jsonb_each_text(f2.skill_ratings) as e(key, value)
      where f2.subject_id = f.subject_id
      group by e.key
    ) kv
  ) as skill_averages,
  (
    select jsonb_object_agg(t.case_type, t.cnt)
    from (
      select c2.case_type, count(*)::int as cnt
      from public.feedback f3
      join public.mock_sessions ms3 on ms3.id = f3.mock_session_id
      join public.cases c2 on c2.id = ms3.assigned_case_id
      where f3.subject_id = f.subject_id
      group by c2.case_type
    ) t
  ) as case_types_practiced,
  (
    select jsonb_object_agg(u.source_book, u.cnt)
    from (
      select c3.source_book, count(*)::int as cnt
      from public.feedback f4
      join public.mock_sessions ms4 on ms4.id = f4.mock_session_id
      join public.cases c3 on c3.id = ms4.assigned_case_id
      where f4.subject_id = f.subject_id
      group by c3.source_book
    ) u
  ) as source_books_used,
  (
    select jsonb_agg(jsonb_build_object('went_well', s.went_well, 'improve', s.improve) order by s.created_at desc)
    from (
      select went_well, improve, created_at
      from public.feedback f5
      where f5.subject_id = f.subject_id
      order by f5.created_at desc
      limit 5
    ) s
  ) as recent_feedback_excerpts
from public.feedback f
join public.mock_sessions ms on ms.id = f.mock_session_id
left join public.cases c on c.id = ms.assigned_case_id
group by f.subject_id;

-- Self-view: always allowed, no privacy gating needed for your own data.
create function public.get_my_skill_profile()
returns setof public.skill_profile
language sql
security definer
set search_path = public
stable
as $$
  select * from public.skill_profile where user_id = auth.uid();
$$;

grant execute on function public.get_my_skill_profile() to authenticated;

-- Partner-view: the single reviewable privacy boundary. Only returns data if the viewer has
-- actually run a mock with this person as their interviewer, and only the sections the
-- target's privacy_settings allow. prepped_cases/saved_cases are never included, full stop.
create function public.get_partner_profile(p_target_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_viewer uuid := auth.uid();
  v_privacy public.privacy_settings;
  v_profile public.skill_profile;
  v_result jsonb;
begin
  if not exists (
    select 1 from public.mock_sessions ms
    where ms.interviewer_id = v_viewer
      and ms.interviewee_id = p_target_user_id
  ) then
    return null;
  end if;

  select * into v_privacy from public.privacy_settings where user_id = p_target_user_id;
  select * into v_profile from public.skill_profile where user_id = p_target_user_id;

  v_result := jsonb_build_object('user_id', p_target_user_id);

  if v_privacy.share_full_history then
    v_result := v_result || jsonb_build_object(
      'total_cases', v_profile.total_cases,
      'cases_this_month', v_profile.cases_this_month,
      'avg_length_minutes', v_profile.avg_length_minutes,
      'distinct_books_used', v_profile.distinct_books_used,
      'case_types_practiced', v_profile.case_types_practiced,
      'source_books_used', v_profile.source_books_used
    );
  end if;

  if v_privacy.share_weak_areas then
    v_result := v_result || jsonb_build_object('skill_averages', v_profile.skill_averages);
  end if;

  if v_privacy.share_past_feedback then
    v_result := v_result || jsonb_build_object('recent_feedback_excerpts', v_profile.recent_feedback_excerpts);
  end if;

  v_result := v_result || jsonb_build_object('allow_interviewer_notes_back', coalesce(v_privacy.allow_interviewer_notes_back, false));

  return v_result;
end;
$$;

grant execute on function public.get_partner_profile(uuid) to authenticated;
