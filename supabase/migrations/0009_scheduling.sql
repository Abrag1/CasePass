-- Scheduling redesign
-- Role is decided by direction: the person who publishes availability is the
-- interviewer for bookings into their slots; whoever books is the interviewee.
-- No role toggle. Each availability row is a bookable appointment offering,
-- either a one-off (specific date) or weekly recurring. The app expands these into
-- concrete future slots and removes already-booked ones.

-- The interviewer's gatekeeping requirement (e.g. "email me a background first").
-- Shown to, and acknowledged by, the interviewee before they can book. Null = none.
alter table public.profiles add column if not exists booking_rule text;

create table public.availability (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('one_off', 'recurring')),
  weekday int check (weekday between 0 and 6),                 -- recurring: 0=Sun..6=Sat
  slot_date date,                                             -- one_off: the specific day
  start_minute int not null check (start_minute between 0 and 1439), -- minutes from midnight (wall clock)
  duration_min int not null default 45 check (duration_min between 15 and 180),
  created_at timestamptz not null default now(),
  constraint availability_shape check (
    (kind = 'recurring' and weekday is not null and slot_date is null) or
    (kind = 'one_off' and slot_date is not null and weekday is null)
  )
);

create index availability_owner_idx on public.availability (owner_id);

alter table public.availability enable row level security;

-- Anyone signed in can read availability (needed to book someone).
create policy "availability readable by authenticated"
  on public.availability for select
  to authenticated
  using (true);

-- Only the owner can create/change/delete their own slots.
create policy "owner manages own availability"
  on public.availability for all
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Booking additions on sessions.
alter table public.mock_sessions
  add column if not exists location_kind text not null default 'online'
    check (location_kind in ('online', 'in_person'));
alter table public.mock_sessions add column if not exists location_note text;
-- Snapshot of the interviewer rule the interviewee confirmed at booking (null if none).
alter table public.mock_sessions add column if not exists rule_ack text;
