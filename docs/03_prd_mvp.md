# PRD — 10-Week Progress Tracker (Week 1 MVP)

## 1. Objective

Deliver a deployed web application that enables authenticated users to track progress across a 10-week learning path, with clear visibility into completion status, effort, and next steps.

This PRD defines the **minimum functional capabilities** required to meet the Week 1 deliverable, as established in the approved Context & Scope and Product Vision.

---

## 2. In-Scope Capabilities

### 2.1 User Management

- The system must support user authentication.
- Users must be able to sign up with email/password and confirm via email.
- Users must be able to sign in with Google OAuth.
- Each user must have an isolated view of their own progress.
- A user must be able to return on another device and see persisted data.
- Users should be able to sign out.

---

### 2.2 10-Week Structure

- The system must represent a fixed sequence of 10 weeks (Week 1 through Week 10).
- Each week must be individually addressable and trackable.
- The structure must support future reuse or extension without re-architecture.
- The dashboard should show a non-authenticated preview of the 10-week structure.
- Each week includes a title and a short description that appears on the dashboard and week detail.
- Time logged is surfaced on week cards when available.

---

### 2.3 Weekly Progress Tracking

For each week, the system must support:

- A status state (not started / in progress / completed)
- A manual progress value when in progress (0–100%) in 25% increments
- A free-form notes field
- A time-tracking field representing time spent for that week
- An energy indicator (low / steady / high)

Progress data must persist across sessions.

---

### 2.4 Progress Visualization

- The system must display overall progress across the 10 weeks.
- Progress must account for completed weeks and in-progress percentage.
- Progress visualization must update immediately when a week is marked complete or incomplete.

---

### 2.5 Guidance Logic (“Suggest Next Week”)

- The system must identify the next recommended week for the user to work on.
- Logic must account for:
  - completed weeks
  - incomplete weeks
- The recommendation must be clearly visible in the UI.

This logic must be deterministic and explainable.

---

### 2.6 Profile Identity

- The system must capture first and last name at sign-up.
- If Google sign-in is used, the system should display the Google profile name.

---

### 2.7 Mobile Accessibility (PWA)

- The application must be usable on mobile devices.
- The application must support installation as a Progressive Web App.
- Core functionality must remain usable after installation.

---

### 2.8 Deployment & Persistence

- The application must be deployed and accessible via a public URL.
- User data must persist between sessions and refreshes.
- The system must be stable enough for daily use.

---

## 3. Out of Scope (Explicit)

The following are intentionally excluded from the Week 1 MVP:

- AI-generated feedback or coaching
- Natural language interpretation of notes
- Sentiment analysis
- External automation tools or integrations
- Goal types other than the 10-week program

---

## 4. Non-Functional Requirements

- Usability: core interactions should require minimal steps.
- Performance: updates to progress and notes should feel immediate.
- Reliability: no data loss during normal usage.
- Security: basic safeguards appropriate for authenticated user data.

---

## 5. Constraints

- Scope is limited to Week 1 MVP requirements.
- Design decisions should not block future AI-powered extensions.
- The system should favor simplicity over configurability.

---

## 6. Success Criteria (PRD-Level)

The PRD is satisfied when:

- A user can sign in, log Week 1 as complete, add notes and time, and see progress reflected.
- The app is deployed and usable on desktop and mobile.
- The user can reasonably trust the app for ongoing weekly tracking.
