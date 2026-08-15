-- Invite-only signup
-- Access is granted per person via an email-bound, single-use, expiring link.
-- Only an admin can mint links (in-app), and only the service-role client ever
-- touches the invites table (creating them, and validating them during signup,
-- which happens before the visitor is authenticated).

-- Admin flag: who can mint invites. Keyed by email so it's easy to grant/revoke.
alter table public.profiles add column if not exists is_admin boolean not null default false;
update public.profiles set is_admin = true where email = 'ge.kobiashvili@gmail.com';

create table public.invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  email text not null,                      -- the invite is bound to this address
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,          -- 2 days after creation (set in app)
  used_at timestamptz,                      -- consumed on successful signup
  used_by uuid references public.profiles (id) on delete set null
);

create index invites_email_idx on public.invites (lower(email));

-- RLS on with NO policies: anon/authenticated get zero rows. Every read/write goes
-- through the service-role client server-side (createAdminClient), which bypasses
-- RLS -- both admin minting and the pre-auth signup validation.
alter table public.invites enable row level security;
