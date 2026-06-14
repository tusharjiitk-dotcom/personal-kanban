# Kanban Board

A personal Kanban board built with React + Vite + Supabase.

## Features

- Six columns: Not Started · WIP (limit 6) · Recurring · Completed · Deferred/Blocked · Future Pick
- Drag-and-drop between columns (WIP hard-capped at 6)
- Add cards with title, priority (high/medium/low), and due date
- Filter by priority and due status (Overdue / This Week / Later)
- Live search across card titles
- Stats bar: Total · In Progress · Overdue · Completed
- Completed cards get strikethrough styling
- Realtime sync via Supabase Postgres Changes

## Setup

### 1. Create the Supabase table

Run this SQL in your Supabase **SQL Editor** (Dashboard → SQL Editor → New query):

```sql
create table if not exists public.cards (
  id         uuid                     default gen_random_uuid() primary key,
  title      text                     not null,
  col        text                     not null,
  priority   text                     not null default 'medium',
  due_date   date,
  position   integer                  not null default 0,
  created_at timestamp with time zone default timezone('utc', now()) not null
);

alter table public.cards enable row level security;

create policy "Allow all for anon"
  on public.cards for all
  using (true) with check (true);

create index if not exists cards_col_position_idx on public.cards (col, position);
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy (Vercel)

```bash
npm run build       # produces dist/
```

Then push to GitHub and import the repo in Vercel. Add the two env vars
(`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in **Project → Settings → Environment Variables**.

Vercel will auto-detect Vite and set the build command / output directory correctly.

## Project structure

```
src/
  constants.js          — column definitions & colour tokens
  lib/supabase.js       — Supabase client
  hooks/useCards.js     — data fetching, optimistic mutations, realtime
  components/
    Board.jsx           — DragDropContext, drag-end logic
    Column.jsx          — Droppable, WIP limit enforcement
    Card.jsx            — Draggable, priority/due badges
    AddCardModal.jsx    — add-card form
    StatsBar.jsx        — totals bar
    FilterBar.jsx       — priority + due-date filter pills
  App.jsx               — search/filter state, derived cardsByCol
  App.css               — all styles
```
