create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  phone text,
  pickup_date date,
  pickup_time_window text,
  pickup_address text,
  dropoff_date date,
  dropoff_time_window text,
  dropoff_address text,
  goods_description text,
  dimensions_weight text,
  facilities text,
  service_type text,
  notes text,
  source text default 'website',
  status text default 'new',
  ip text,
  user_agent text
);

alter table public.leads enable row level security;
