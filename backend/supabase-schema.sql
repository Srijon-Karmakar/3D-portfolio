create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  ip text not null default '',
  user_agent text not null default '',
  status text not null default 'new' check (status in ('new', 'read')),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_email_idx
  on public.contact_messages (email);

alter table public.contact_messages enable row level security;

drop policy if exists "Allow public inserts for contact messages" on public.contact_messages;
create policy "Allow public inserts for contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow authenticated users to read contact messages" on public.contact_messages;
create policy "Allow authenticated users to read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);
