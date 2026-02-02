# Resolution Tracker

## Local Setup
1) Create a Supabase project.
2) Run the SQL in `docs/architecture.md` to create `week_progress`.
3) Create `.env.local` using `.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
4) Install deps and run:
```
npm install
npm run dev
```
Open http://localhost:3000

## Auth Providers
- Email/password
- Google OAuth (enable in Supabase Auth settings)

## Deploy
1) Push to GitHub
2) Connect repo to Vercel
3) Add the same env vars in Vercel
