-- Tabella per i progetti salvati (Chat AI e Business Plan).
-- Esegui questo script nel SQL Editor della dashboard Supabase:
-- https://supabase.com/dashboard -> tuo progetto -> SQL Editor -> New query -> incolla e Run.

create table if not exists public.projects (
  id text primary key,
  name text not null default 'Progetto',
  type text not null check (type in ('chat', 'business-plan')) default 'business-plan',
  data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Permessi: abilita lettura/scrittura per utenti anonimi (anon key).
-- Per produzione considera di usare Row Level Security (RLS) con auth.
alter table public.projects enable row level security;

create policy "Allow anonymous read and write for projects"
  on public.projects
  for all
  to anon
  using (true)
  with check (true);
