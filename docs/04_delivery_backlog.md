# Delivery Backlog — 10-Week Progress Tracker (MVP Week 1)

## 1. Global Definitions

### Definition of Ready (DoR)

A story is ready when:

- Scope is clearly defined
- UX intent is explicit (what the user sees/does)
- Acceptance criteria are testable
- No unresolved dependencies block implementation

### Definition of Done (DoD)

A story is done when:

- Acceptance criteria are met
- UI is usable and visually coherent
- State persists correctly
- No obvious UX dead ends exist
- Feature works in desktop and mobile/PWA context where applicable

---

## 2. Epics Overview

| Epic ID | Epic Name                         |
| ------- | --------------------------------- |
| E1      | User Authentication & Identity    |
| E2      | Core Dashboard & Navigation       |
| E3      | Weekly Progress Tracking          |
| E4      | Progress Visualization & Feedback |
| E5      | Guidance & Recommendation Logic   |
| E6      | Time Tracking                     |
| E7      | PWA & Mobile Experience           |
| E8      | Persistence & Deployment          |

---

## 3. Epics & Stories

---

### E1 — User Authentication & Identity

**Epic Intent (UX)**
Users should immediately recognize that the tracker is _theirs_ and that their progress is safe and persistent across sessions and devices.

#### Story E1.1 — User can sign up / sign in

**As a user**,  
I want to authenticate so that my progress is private and saved.

**Acceptance Criteria**

- User can access the app via a login flow
- After login, user lands on the main dashboard
- Reloading the app restores the session

#### Story E1.2 — User profile identity

**As a user**,  
I want my name displayed so the app feels personal.

**Acceptance Criteria**

- Sign-up captures first and last name
- If Google sign-in is used, the display name uses the Google profile name
- Header shows the user’s name (not just email)

#### Story E1.3 — User can sign out

**As a user**,  
I want to sign out so I can switch accounts or keep my data private.

**Acceptance Criteria**

- Log out action is accessible from the dashboard header
- Logging out returns the user to the public dashboard

---

### E2 — Core Dashboard & Navigation

**Epic Intent (UX)**
The dashboard is the heart of the product.  
In one glance, the user must know:

- where they are
- what’s done
- what’s next

#### Story E2.1 — Main dashboard layout

**As a user**,  
I want a single dashboard that summarizes my 10-week journey.

**Acceptance Criteria**

- Dashboard displays all 10 weeks in order
- Each week is visually distinct and scannable
- Each week shows its title and short description
- Time logged appears on the week card when available
- Current/next recommended week is visually highlighted
- Logged-out users see a preview dashboard with the same structure

#### Story E2.2 — Dashboard widgets

**As a user**,  
I want clear visual widgets so I don’t need to think to understand my progress.

**Acceptance Criteria**

- Progress bar widget shows overall completion
- “Next Week” widget indicates recommended focus
- Widgets update immediately on interaction

---

### E3 — Weekly Progress Tracking

**Epic Intent (UX)**
Logging progress should feel lightweight and non-intimidating.

#### Story E3.1 — Mark week as complete

**As a user**,  
I want to mark a week complete so I feel progress.

**Acceptance Criteria**

- Status control per week supports: not started / in progress / completed
- Visual state changes when status changes
- Completion updates progress bar instantly

#### Story E3.2 — Add notes per week

**As a user**,  
I want to add notes to capture reflections or context.

**Acceptance Criteria**

- Notes field is easily accessible from the week
- Notes can be expanded inline from the week card on the dashboard
- Notes persist after refresh
- Notes are editable

#### Story E3.4 — Reopen completed week

**As a user**,  
I want to reopen a completed week if I need to adjust it.

**Acceptance Criteria**

- Completed week detail page shows a “Reopen” button
- Reopen changes status to in progress and sets progress to 25%
- Reopen keeps the user on the detail page and updates the dashboard

#### Story E3.3 — Track in-progress percentage

**As a user**,  
I want to set a percent complete for weeks in progress so partial work counts.

**Acceptance Criteria**

- In-progress weeks display a progress slider
- Slider allows 0–100% in increments of 5 or 10
- Overall progress updates immediately as the slider moves

---

### E4 — Progress Visualization & Feedback

**Epic Intent (UX)**
Progress should be emotionally reinforcing, not just informational.

#### Story E4.1 — Overall progress visualization

**As a user**,  
I want to see how far I’ve come at a glance.

**Acceptance Criteria**

- Progress bar reflects completed weeks accurately
- Progress bar reflects in-progress percentages when applicable
- Visual changes are immediate and smooth
- Progress is consistent across sessions

---

### E5 — Guidance & Recommendation Logic

**Epic Intent (UX)**
Users should never wonder “what should I do next?”

#### Story E5.1 — Suggest next week

**As a user**,  
I want the system to suggest my next week so I don’t lose momentum.

**Acceptance Criteria**

- System identifies the next incomplete week
- Recommendation is clearly visible on dashboard
- Recommendation updates as weeks are completed

---

### E6 — Time Tracking

**Epic Intent (UX)**
Tracking time should feel optional and simple, not like reporting.

#### Story E6.1 — Log time per week

**As a user**,  
I want to log time spent so I can understand my effort.

**Acceptance Criteria**

- Time input exists per week
- Time persists after refresh
- Time can be edited

---

### E7 — PWA & Mobile Experience

**Epic Intent (UX)**
The app should feel native enough to be used casually on a phone.

#### Story E7.1 — PWA installation

**As a user**,  
I want to install the app on my phone.

**Acceptance Criteria**

- App can be installed as a PWA
- App launches from home screen
- Core dashboard works on mobile screen sizes

#### Story E7.2 — Mobile UI tuning

**As a user**,  
I want the mobile experience to feel designed for my phone so I can log progress quickly and confidently.

**Acceptance Criteria**

- Mobile layout uses single-column hierarchy; no desktop grids on phones.
- Primary actions are reachable one-handed and remain visible on detail screens.
- Tap targets meet minimum 44x44px sizing.
- Inputs are optimized for quick updates (presets, segmented controls, clear states).
- Safe-area padding is respected for all primary actions.
- Visual density is reduced (typography and spacing) for small screens.
- Header/menu is condensed with overflow actions on mobile.
- Auth screens use full-width controls with simplified copy.

---

### E8 — Persistence & Deployment

**Epic Intent (UX)**
The app must feel trustworthy.

#### Story E8.1 — Data persistence

**As a user**,  
I want my data to be there when I come back.

**Acceptance Criteria**

- Data persists across sessions
- Data is user-specific

#### Story E8.2 — Live deployment

**As a user**,  
I want to access the app via a public URL.

**Acceptance Criteria**

- App is deployed
- App is accessible without local setup
