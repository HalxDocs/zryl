-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Runs table
create table if not exists runs (
  id          uuid primary key default gen_random_uuid(),
  command     text not null,
  stdout      text[],
  stderr      text[],
  exit_code   integer,
  started_at  timestamptz,
  finished_at timestamptz,
  duration_ms bigint,
  os          text,
  arch        text,
  cwd         text,
  visibility  text not null default 'public',
  created_at  timestamptz not null default now()
);

-- Index for the dashboard query (public runs, newest first)
create index if not exists runs_public_created_idx
  on runs (created_at desc)
  where visibility = 'public';

-- Row Level Security
alter table runs enable row level security;

-- Anyone can read public runs
create policy "Public runs are viewable by everyone"
  on runs for select
  using (visibility = 'public');

-- Service role can insert (CLI uploads via service key)
create policy "Service role can insert runs"
  on runs for insert
  with check (true);

-- Realtime: enable for runs table
alter publication supabase_realtime add table runs;
