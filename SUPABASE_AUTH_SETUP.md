# Supabase Auth Setup — IslandFruitGuide

Follow these steps to enable Supabase Auth and connect it to IslandFruitGuide.

## 1) Enable Auth Providers

In Supabase Dashboard:
- Go to **Authentication → Providers**
- Enable **Email** (recommended)
- Optional: enable Google/Apple/Discord providers if needed

## 2) Configure Site URLs

Go to **Authentication → URL Configuration** and set:

- **Site URL:** `https://your-domain.com`
- **Redirect URLs:**
  - `https://your-domain.com`
  - `https://your-domain.com/#/` (if you use hash routing)

## 3) Email Templates

Go to **Authentication → Templates** and update:
- Confirm signup
- Reset password

Use your branding (IslandFruitGuide) in these templates.

## 4) Add Tables for Profiles (optional)

Run this in SQL editor if you want user profiles:

```sql
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable" on profiles
for select using (true);

create policy "Users can update their profile" on profiles
for update using (auth.uid() = id);
```

## 5) Environment Variables

Use these in GitHub Actions secrets and local `.env`:

```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 6) Test Auth

Once you add a login page later:
- Sign up with email
- Check confirmation email
- Login and verify user session

---

✅ Supabase Auth is now ready for IslandFruitGuide.
