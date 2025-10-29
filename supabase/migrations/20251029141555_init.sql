-- Enums
create type public."sessionKind" as enum ('focus','short_break','long_break');

-- extension for auto-updating updatedAt
create extension if not exists moddatetime with schema extensions;

-- SETTINGS
create table public.settings (
  "userId" uuid primary key references auth.users(id) on delete cascade,
  "pomoMinutes" int not null default 25,
  "shortBreakMinutes" int not null default 5,
  "longBreakMinutes" int not null default 15,
  "longBreakInterval" int not null default 4,
  "notificationsEnabled" boolean not null default true,
  "autoStartBreak" boolean not null default false,
  "autoStartPomo" boolean not null default false,
  "breakEndReminder" smallint,
  "timeLeftReminder" smallint,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create trigger settings_set_updated_at
before update on public.settings
for each row execute procedure extensions.moddatetime("updatedAt");

-- PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  theme text,
  icon text,
  "isArchived" boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index projects_user_id on public.projects ("userId");
create unique index projects_user_title on public.projects ("userId", lower(title));

create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure extensions.moddatetime("updatedAt");

-- TASKS
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  "projectId" uuid references public.projects(id) on delete set null,
  title text not null,
  "isCompleted" boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index tasks_user_project_completed_idx
  on public.tasks ("userId","projectId","isCompleted");

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute procedure extensions.moddatetime("updatedAt");

-- SESSIONS
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  "projectId" uuid references public.projects(id) on delete set null,
  kind public."sessionKind" not null default 'focus',
  "startedAt" timestamptz not null default now(),
  "endedAt" timestamptz,
  "intendedMinutes" int not null,
  "interruptionCount" int not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index sessions_user_started_idx
  on public.sessions ("userId","startedAt" desc);
create index sessions_project_started_idx
  on public.sessions ("projectId","startedAt" desc);

create trigger sessions_set_updated_at
before update on public.sessions
for each row execute procedure extensions.moddatetime("updatedAt");

-- RLS
alter table public.settings enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.sessions enable row level security;

create policy "settings are self" on public.settings
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "projects owned by user" on public.projects
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "tasks owned by user" on public.tasks
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "sessions owned by user" on public.sessions
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());
