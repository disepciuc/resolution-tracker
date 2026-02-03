# Architecture — Resolution Tracker

## Overview
Resolution Tracker is a full-stack Next.js app with Supabase for auth and data. The UI is built to mirror the approved mockups (neumorphic lavender theme) while keeping the app PWA-capable and mobile-first.

Week titles and descriptions are stored in a local content module (`src/lib/weekContent.ts`) and surfaced on both the dashboard cards and week detail header.

## Stack
- Frontend/Backend: Next.js (App Router, TypeScript, Tailwind)
- Auth + DB: Supabase (Postgres + Auth: Email/Password + Google)
- Hosting: Vercel
- PWA: Serwist + Web App Manifest

## High-Level Flow
1. User visits app → checks session (Supabase Auth).
2. If not authenticated, show a public dashboard preview.
3. On first login, app creates 10 week rows for the user (service role).
4. Dashboard shows:
   - Overall progress
   - Energy (speedometer widget)
   - Completion + Next Week
   - Week cards (status + notes + time + progress)
5. Week detail allows editing notes, time, progress (25% steps), energy, and status.
6. Completed weeks are locked until “Reopen” is pressed.

## Data Model
**Table: `week_progress`**
- `id` UUID PK
- `user_id` UUID → `auth.users.id`
- `week_number` INT (1–10)
- `status` TEXT (enum: `not_started`, `in_progress`, `completed`)
- `progress_percent` INT (0, 25, 50, 75, 100)
- `notes` TEXT
- `time_spent_minutes` INT
- `energy` TEXT (enum: `low`, `steady`, `high`)
- `updated_at` TIMESTAMP (auto)
- `auth.users` metadata stores `first_name` and `last_name` for display

### RLS Policy
Enable RLS on `week_progress`.
- Policy: `user_id = auth.uid()`

### SQL (apply in Supabase)
```sql
create table if not exists public.week_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  week_number int not null check (week_number between 1 and 10),
  status text not null check (status in ('not_started', 'in_progress', 'completed')),
  progress_percent int not null default 0 check (progress_percent in (0,25,50,75,100)),
  notes text,
  time_spent_minutes int default 0,
  energy text default 'steady' check (energy in ('low', 'steady', 'high')),
  updated_at timestamptz default now()
);

alter table public.week_progress enable row level security;

create policy "Users can manage their weeks"
  on public.week_progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## API & State Strategy
- Server: Uses Supabase SSR client to read/write in server actions or route handlers.
- Client: Uses Supabase browser client for auth + data updates.
- Data sync: optimistic UI; update Supabase on edit; re-fetch for consistency.

## Security
- Supabase Auth handles session management.
- Row Level Security enforces per-user isolation.
- Server keys never exposed to client (service key only on server).

## Local Dev
- `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY` (server only)

## Deployment
- Push to GitHub.
- Connect repo to Vercel.
- Add env vars in Vercel.
