# CARS SSR User Manual

This guide explains how students and counselors use the CARS Assessment System (SSR Edition), where to find settings, and how to manage the counselor dashboard.

Last updated: November 9, 2025

---

## Quick Links

- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Start Assessment (Student): http://localhost:3000/assessment/new
- Counselor Login: http://localhost:3000/counselor/login

In production on Railway, replace `http://localhost:3000` with your app URL.

---

## 1) Student Flow

1. Open the Home page and click "Take Assessment" or go directly to `/assessment/new`.
2. Fill in your information:
   - Name (required)
   - Email (required)
   - Section (required, dropdown)
   - Batch/Year (required, dropdown)
   - School (optional, dropdown)
3. Click "Continue to Assessment".
4. Answer the 25 questions:
   - Items 1–24 use a 0–4 scale from "Never" to "Almost Always".
   - Item 25 is a Yes/No question about self-harm thoughts.
5. Submit the assessment.
6. View your results page:
   - Overall risk level
   - T-scores for each subscale (Externalizing, Internalizing, Social, Academic)
   - Note: Self-harm item (Q25) sets risk to High if answered "Yes".

Your responses are stored securely and only accessible to authorized school counselors.

---

## 2) Counselor Access

- Go to `/counselor/login`.
- Default credentials (change in production):
  - Username: `counselor`
  - Password: `changeme123`

After login, you are redirected to the Counselor Dashboard.

### Dashboard Features

- Overview cards by risk level (Normal, At-risk, High)
- Filters:
  - Section, Batch, Risk Level filters
- Student list:
  - Name, Email, Section, Batch, Latest Risk
  - Self-harm alerts when applicable
- Drill-down:
  - Click a student to view their assessment history with detailed scores

### Logout

- Click the "Logout" link in the navigation bar (top right) or go to `/counselor/logout`.

---

## 3) Settings & Configuration

All configuration is managed via environment variables. During development, these live in `SSR/.env`. In production (Railway), set them in the service’s Variables tab.

Key settings:

- `APP_NAME` — Displayed in the UI (navbar/title)
- `APP_URL` — Base URL used in console info (not enforced)
- `SCHOOL_SECTIONS` — Comma-separated values for the Section dropdown
- `SCHOOL_BATCHES` — Comma-separated values for the Batch/Year dropdown
- `SCHOOL_NAMES` — Comma-separated values for the optional School dropdown
- `SESSION_SECRET` — Required; set to a long random string in production
- `PORT` — Server port (default 3000)
- `DATABASE_PATH` — SQLite database file path (default `./data/database.db`)
- `RATE_LIMIT_*` — Rate limiting configuration for login and submit endpoints

Example (development):

```
APP_NAME=CARS Assessment System
APP_URL=http://localhost:3000
SCHOOL_SECTIONS=Grade 9-A,Grade 9-B,Grade 9-C
SCHOOL_BATCHES=2024,2025,2026
SCHOOL_NAMES=Sample High School,Another High School
SESSION_SECRET=dev-secret-change-me
```

After changing `.env`, restart the server.

---

## 4) Teacher/Admin Tasks

### Change the default counselor password

- Run the seed script only for first-time setup. Afterwards, change the password in the database using a SQLite tool or add an admin route in a future update.
- Alternative: update `DEFAULT_COUNSELOR_PASSWORD` and re-run `npm run seed` if you’ve cleared the DB.

### Backup the database

- The database file is at `SSR/data/database.db`.
- Copy this file while the server is stopped to create a backup, or run a copy command in Railway.

---

## 5) Troubleshooting

- Stuck on home page after submitting student info:
  - Ensure cookies are allowed; the app uses a session cookie.
  - Try a hard refresh or incognito to clear cached redirects.
- "Cannot find module...": run `npm install` in `SSR/`.
- "database is locked": close other running servers; WAL mode is enabled by default.
- Counselor login fails:
  - Re-run `npm run seed` (dev only) or verify the `counselors` table content with a SQLite browser.

---

## 6) Security Notes

- In production, set a strong `SESSION_SECRET` and change the default counselor password immediately.
- HTTPS is recommended (Railway provides TLS on custom domains and default URLs).
- Rate limits are enabled on login and assessment submission to mitigate abuse.

---

## 7) URLs Summary

- `/` — Home page
- `/about` — About the CARS tool
- `/assessment/new` — Student information form
- `/assessment/form` — Questionnaire (requires student session)
- `/assessment/result` — Results page after submission (requires student session)
- `/counselor/login` — Counselor login
- `/counselor/dashboard` — Counselor dashboard (protected)
- `/counselor/student/:id` — Student details (protected)
- `/counselor/logout` — Logout

---

If you need a printable one-page version for classroom use, we can create a condensed PDF with just the essentials.
