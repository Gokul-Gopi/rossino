-- Enums
create type public."sessionType" as enum ('FOCUS','SHORTBREAK','LONGBREAK');
create type public."sessionStatus" as enum ('IDLE','PAUSED','COMPLETED','RUNNING');

-- extension for auto-updating updatedAt
create extension if not exists moddatetime with schema extensions;


-- PROJECTS
create table public.projects (
  "id" uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  "title" text not null,
  "description" text,
  "theme" text,
  "icon" text,
  "isArchived" boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index projects_user_id on public.projects ("userId");
create unique index projects_user_title on public.projects ("userId", lower(title));

create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure extensions.moddatetime("updatedAt");


-- SESSIONS
create table public.sessions (
  "id" uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  "projectId" uuid references public.projects(id) on delete set null,
  "type" public."sessionType" not null default 'FOCUS',
  "status" public."sessionStatus" not null default 'PAUSED',
  "startedAt" timestamptz,
  "endedAt" timestamptz,
  "lastPausedAt" timestamptz,
  "intendedDuration" int not null,
  "totalPausedDuration" int not null default 0,
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


-- TASKS
create table public.tasks (
  "id" uuid primary key default gen_random_uuid(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  "projectId" uuid references public.projects(id) on delete set null,
  "title" text not null,
  "completed" boolean not null default false,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index tasks_user_project_completed_idx
  on public.tasks ("userId","projectId","completed");

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute procedure extensions.moddatetime("updatedAt");


-- SETTINGS
create table public.settings (
  "userId" uuid primary key references auth.users(id) on delete cascade,
  "pomoDuration" int not null default 1500,
  "shortBreakDuration" int not null default 300,
  "longBreakDuration" int not null default 900,
  "longBreakInterval" int not null default 4,
  "notificationsEnabled" boolean not null default true,
  "autoStartBreak" boolean not null default false,
  "autoStartPomo" boolean not null default false,
  "breakEndReminder" smallint,
  "timeLeftReminder" smallint,
  "dailyGoal" int,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create trigger settings_set_updated_at
before update on public.settings
for each row execute procedure extensions.moddatetime("updatedAt");

-- WIDGETS
create table public.widgets (
  "userId" uuid primary key references auth.users(id) on delete cascade,
  "note" text check (length("note") <= 2000),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create trigger widgets_set_updated_at
before update on public.widgets
for each row execute procedure extensions.moddatetime("updatedAt");

-- Function to create default settings and widgets for new users (START)
-- Runs after a user is created; inserts a default settings and widgets row
create or replace function public.handle_new_user_settings_widgets()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  insert into public.settings ("userId")
  values (NEW.id)
  on conflict ("userId") do nothing;

  insert into public.widgets ("userId")
  values (NEW.id)
  on conflict ("userId") do nothing;

  return NEW;
end;
$$;


drop trigger if exists on_auth_user_created_settings on auth.users;

create trigger on_auth_user_created_settings
after insert on auth.users
for each row
execute function public.handle_new_user_settings_widgets();
-- Function to create default settings and widgets for new users (END)


-- Function that returns dashboard data (START)
create or replace function public.dashboard(project_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  payload jsonb;
begin
  if uid is null then
    raise exception 'not authenticated'
      using errcode = '28000';
  end if;

  with
  p as (
    select id, title
    from projects
    where id = project_id and "userId" = uid
  ),
  s as (
    select "dailyGoal"
    from settings
    where "userId" = uid
  ),
  t as (
    select id, title
    from tasks
    where "projectId" = project_id
      and completed = false
      and "userId" = uid
    order by "createdAt" desc
    limit 50
  ),
  w as (
    select note
    from widgets
    where "userId" = uid
  )
  select jsonb_build_object(
    'project',  (select to_jsonb(p.*) from p),
    'settings', (select to_jsonb(s.*) from s),
    'tasks',    (select coalesce(jsonb_agg(t.*), '[]'::jsonb) from t),
    'widgets',  (select to_jsonb(w.*) from w) 
    -- any computed stats/fields can go here too
  )
  into payload;

  return payload;
end;
$$;
-- Function that returns dashboard data (END)



-- RLS
alter table public.projects enable row level security;
alter table public.sessions enable row level security;
alter table public.tasks enable row level security;
alter table public.settings enable row level security;
alter table public.widgets enable row level security;

create policy "projects owned by user" on public.projects
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "sessions owned by user" on public.sessions
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "tasks owned by user" on public.tasks
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "settings owned by user" on public.settings
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());

create policy "widgets owned by user" on public.widgets
  for all using ("userId" = auth.uid()) with check ("userId" = auth.uid());
