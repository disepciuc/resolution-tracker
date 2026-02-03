# Test Plan — MVP

## Scope
Verify end-to-end flows for authentication, dashboard, week detail, and persistence.

## Environment
- Local app: `npm run dev -- --port 3001`
- Supabase: project configured with `week_progress` table + RLS
- Auth: Email + Google enabled

## Smoke Tests
### Authentication
1. Sign up (email/password) → receive confirmation email.
2. Confirm email → returns to app → sign in works.
3. Google sign in → returns to app.
4. Log out → returns to public dashboard.

### Dashboard (Logged Out)
1. Public dashboard loads with 10-week preview.
2. Progress bar shows neutral “Sign in to reveal progress” message.
3. Week cards show titles (no private data).
4. Week cards show short descriptions.

### Dashboard (Logged In)
1. First login seeds 10 weeks.
2. All 10 cards render with correct titles.
3. Week cards show short descriptions.
3. Energy gauge shows “Steady” by default.
4. Next week shows Week 1 when no progress.
5. Mark Complete on an in-progress week updates in place.

### Week Detail
1. Start Week 1 opens detail page.
2. Edit notes, time, progress, energy → Save → dashboard updates.
3. Mark complete → status changes to completed.
4. Completed week is locked (fields disabled).
5. Reopen → status becomes in progress (25%) and fields unlock.

### Notes Expansion
1. If notes exist, “View notes” row is visible.
2. Clicking expands notes below the row.

### Persistence
1. Refresh page → data persists.
2. Open in another browser → data persists.

## Regression Checklist (after UI changes)
- Dashboard still shows 10 weeks
- Week detail route opens
- Auth still works (email + Google)
- Log out works

## Mobile UX Checklist
- No multi-column grids on phones (all sections stack)
- Primary action remains reachable on week detail (sticky or fixed)
- Tap targets feel thumb-friendly (>= 44x44px)
- Safe-area padding applied on iOS (no overlap with home indicator)
- All inputs are usable with one hand (time presets, progress stops, energy selector)
