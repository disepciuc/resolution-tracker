# Mobile UX/UI Review — Resolution Tracker

Date: February 3, 2026

## Context
The app currently supports mobile screen sizes but largely mirrors the desktop layout. This creates density, small tap targets, and interaction patterns that feel “web-first” rather than “mobile-first.” The goal is to make the mobile experience feel intentional, focused, and touch-native without changing core functionality.

## Key Issues Observed
- Desktop layout patterns persist on small screens (multi-column stats, wide headers, dense card grids).
- Tap targets and primary actions are not consistently thumb-friendly (buttons, cards, controls).
- No sticky action or navigation affordance for mobile flows (especially week detail).
- Typography and spacing feel heavy and wide for phone screens.
- Form inputs (time/progress/energy) are not optimized for quick, one-handed updates.
- Safe-area padding is not accounted for in the layout and action zones.

## Required Improvements (Must-Haves)
1. **Mobile layout hierarchy**
   - Convert all multi-column sections to single-column at mobile widths.
   - Use clearer sectioning: summary → next action → week list.
   - Reduce card padding and shadow intensity for mobile.

2. **Navigation & action affordances**
   - Add a mobile app bar or condensed header with a back affordance on week detail.
   - Add a sticky bottom action bar on week detail (Save / Mark complete).
   - Ensure all primary CTAs are full-width on mobile.
   - Replace desktop header blocks with a compact mobile app bar and overflow menu.

3. **Touch target sizing**
   - Minimum 44x44px for buttons, pills, and tappable cards.
   - Increase spacing between adjacent buttons to prevent mis-taps.

4. **Mobile-first typography & spacing**
   - Introduce a mobile type scale (e.g., title 22–26px, body 14–16px).
   - Reduce vertical rhythm density: tighter but breathable stack spacing.

5. **Inputs optimized for quick updates**
   - Time spent: add preset chips (15/30/60/90) and keep numeric input as fallback.
   - Progress: add labeled stops (0/25/50/75/100) and keep slider.
   - Energy: render as segmented control with clear selected state.

6. **Safe-area handling**
   - Apply `padding-bottom: env(safe-area-inset-bottom)` to shell and sticky bars.
   - Ensure sticky controls never overlap content or iOS home indicator.

## Screen-by-Screen Guidance
### Dashboard (Logged Out)
- Condensed hero header with CTA stacked below.
- Reduce the progress card height; keep copy to one short line.
- Replace 3-up stat cards with a horizontal scroll or single stacked cards.

### Dashboard (Logged In)
- Keep “Next week” and “In progress” at the top (primary intent).
- Collapse secondary stats into a compact row or carousel.
- Week list: make each card a full-width tappable row with larger title/summary.

### Week Detail
- Add a top app bar with back arrow + week number.
- Title + short prompt (single line) instead of full paragraph.
- Sticky bottom bar for Save/Mark Complete/Reopen (primary left, secondary right).
- Group inputs: Notes first, then quick stats (time/progress/energy) in a vertical stack.

### Auth (Login/Signup)
- Full-width buttons, larger input height, reduced panel radius.
- Reduce shadow intensity; improve keyboard readability with consistent spacing.
- Use a compact, single-column form with minimal copy and clear primary CTA.
- Provide a sticky bottom CTA on small screens when the keyboard is closed.

### Menu / Header (Global)
- Use a condensed mobile app bar with icon + title.
- Move secondary actions (profile, logout) into a slide-down menu.
- Ensure all tap targets are 44x44px and respect safe-area.

## Visual & Interaction Notes
- Prefer lighter shadows on mobile to avoid visual clutter.
- Use consistent button heights and fixed-width CTA areas.
- Add subtle motion: section fade-in or staggered card entrance only.

## Success Criteria
- All primary actions are reachable one-handed (bottom 40% of screen).
- Every interactive element meets 44x44px minimum.
- No horizontal scrolling or multi-column grids on phones.
- Forms are fast to complete in < 60 seconds for a week update.
- Mobile UI feels tailored rather than responsive-only.
