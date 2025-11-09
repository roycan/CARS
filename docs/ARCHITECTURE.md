# Architecture Overview

This document describes the structure, responsibilities, and integration boundaries of the CARS (Children and Adolescents Risk Screener) application as of version 0.9.0.

## Goals
- Pedagogical clarity (Grade 9 learners can trace data flow)
- Pure client execution (static hosting compatible)
- Separation of concerns to simplify maintenance & future enhancements

## Module Responsibilities (`/js`)
| File | Responsibility | Pure? | Notes |
|------|----------------|-------|------|
| `data.js` | Immutable domain data: questions (EN + Fil), scales, rating options, T-score tables, thresholds, schema version constant | Yes (data only) | Central authority for normative tables |
| `scoring.js` | Collect answers, compute raw scores, convert to T, determine risk, build result object | Yes (stateless functions) | All external effects delegated |
| `storage.js` | Load/save assessment array in `localStorage`, import/export JSON & CSV, delete all | No (I/O) | Local key: `carsTrackerData` |
| `ui_questionnaire.js` | Render questionnaire radios (bilingual) | No (DOM) | Idempotent rerender |
| `ui_modal.js` | Populate & display results modal | No | Accepts pre-built result object |
| `ui_calendar.js` | Render calendar grid & attach day click handlers | No | Reads stored result dates |
| `ui_analysis.js` | Build/update charts (line + radar) using Chart.js | No | Destroys existing chart instances safely |
| `devmode.js` | Toggle & render developer teaching panel | No | Activated via button, hash, or hotkey |
| `main.js` | Orchestration: initialization, wiring, view switching | No | Coordinates other modules |

## Global Namespace Contract
A single global object `window.CARS` aggregates sub-namespaces:
- `CARS.data` (constants & tables)
- `CARS.scoring` (pure scoring functions)
- `CARS.storage` (persistence functions)
- `CARS.ui` (namespaced submodules: `questionnaire`, `modal`, `calendar`, `analysis`)
- `CARS.dev` (dev mode helpers)

No other global symbols are intentionally introduced. Any future additions should extend `window.CARS` to preserve a predictable inspection surface for learners.

## Execution Order
Scripts are loaded in `index.html` in dependency-safe order:
1. `data.js` (foundational constants)
2. `scoring.js` (depends on data constants)
3. `storage.js`
4. UI modules (`ui_*`)
5. `devmode.js`
6. `main.js` (bootstraps on `DOMContentLoaded`)

## Data Flow (High Level)
```
User Input -> collectAnswers -> computeRawScores -> convertAllToTScores -> determineRisk -> buildResult -> save -> (calendar + charts + modal)
```
See `docs/diagrams/flow.mmd` (and README embedded Mermaid) for visual graph.

## External Dependencies
| Library | Purpose | Load Method | Notes |
|---------|---------|-------------|-------|
| Bulma CSS | Layout / styling | CDN `<link>` | No local customization except `styles.css` overrides |
| Chart.js | Trend & radar charts | CDN `<script>` | Instances destroyed on re-render to avoid leaks |

## Persistence Boundary
All assessments are stored as an array of result objects serialized under key `carsTrackerData` in `localStorage`. No network requests are performed; privacy model depends on browser sandbox only.

## Result Object Shape
```
{
  date: ISOString,
  answers: number[25],           // item 1..25 (0-4 for 1..24, 0/1 for 25)
  rawScores: { externalizing, internalizing, social, academic, total },
  tScores: { externalizing, internalizing, social, academic, total },
  riskLevel: string,             // Normal/No Risk | At-risk | High risk
  interpretation: string,        // Tier guidance text
  selfHarmOverride: boolean      // true if item 25 triggers risk override
}
```

## Risk Classification Logic (Summary)
- Compute total T-score.
- Map to Normal / At-risk / High risk using thresholds.
- If self-harm item is affirmative, force High risk + override message.
Full detail: `SCORING_AND_RISK.md`.

## Clamping & Table Lookup
T-score tables are discrete. Raw scores outside defined range are clamped to nearest boundary value. Intermediate non-present keys (not expected currently) fall back to the nearest lower defined key.

## Extensibility Points
| Area | Strategy |
|------|----------|
| New visualization | Add file `ui_<feature>.js`, call from `main.js` post-save |
| Additional scale | Add to `SCALES` in `data.js`, update T-score table, charts consume automatically if wired |
| Localization | Extend question objects or add language map; keep existing bilingual text unchanged |
| Schema change | Increment `DATA_SCHEMA_VERSION`, implement migration in a new `migrations.js` (future) |

## Non-Goals (Current Beta)
- Server synchronization
- User authentication / multi-user segregation
- Automated test harness (planned post-beta)
- Accessibility audit remediation (documented only)

## Security & Supply Chain Notes
- Reliance on external CDNs introduces integrity risk if upstream compromised. An offline fork or self-hosted assets mitigates this.
- No dynamic code evaluation beyond static script includes.

## Dev Mode
Provides pedagogical transparency: shows counts, latest result breakdown, storage size estimate, schema version. Disabled by default; toggled by UI, hash `#dev`, or `Ctrl+D` shortcut.

## Change Impact Guidelines
- Do not alter normative tables or thresholds without domain review.
- Preserve result object keys to avoid breaking existing stored history.

## Future Considerations
- Introduce a lightweight test suite for `scoring.js` functions
- Add versioned migrations
- Provide optional risk band overlays on charts

---

## SSR Implementation (Teacher Reference)

The following diagrams provide intermediate-level views of the SSR (Server-Side Rendering) version's architecture, useful for teacher preparation and advanced student discussions.

### Authentication Flow (Intermediate)

Figure: Authentication & Session Management
![Sequence diagram showing login form submission, bcrypt verification, session creation, cookie setting, and protected route access](diagrams/auth/auth--plantuml--intermediate.png)

Alt: User submits login credentials via POST; the Express server verifies the password with bcrypt, creates a session object, sets a session cookie in the response, and redirects to the dashboard. On subsequent requests, the cookie is sent, the session is read, and the counselor identity is validated before granting access to protected routes.

**Key Teaching Points:**
- Sessions act as temporary identity badges stored server-side.
- Cookies carry the session ID back and forth between browser and server.
- Bcrypt hashing is one-way: passwords are never stored in plain text.
- Middleware (authGuard) checks session validity on each protected route.

### Debugging Strategy (Intermediate)

Figure: Debugging Decision Tree
![Flowchart showing systematic troubleshooting steps for common errors in development and deployment](diagrams/debug/debug--plantuml--intermediate.png)

Alt: When an error occurs, students follow a systematic process: first check if it's a missing package error (run npm install), then a port-in-use error (stop other servers or change port), then SQL syntax or schema issues (use DB Browser for SQLite), then authentication 401 errors (re-login or check session), and finally consult server logs and console.log() output to isolate the problem. After each fix, retry the operation.

**Key Teaching Points:**
- Debugging is methodical, not random trial-and-error.
- Read error messages carefully—they usually tell you exactly what's wrong.
- Use tools: DB Browser for SQL, browser DevTools Network tab, server terminal logs.
- The "15-minute rule": try to debug for 15 minutes independently, then ask for help.
- console.log() is a powerful diagnostic tool; place it strategically to trace execution flow.

---

## SSR vs. Client-Side Architecture Comparison

| Aspect | Client-Side (Original CARS) | SSR (CARS SSR) |
|--------|----------------------------|----------------|
| **Rendering** | Browser generates HTML via JS | Server generates HTML via EJS |
| **Data Storage** | localStorage only | SQLite database + sessions |
| **Authentication** | None (client-side only) | Server-side with bcrypt + sessions |
| **Deployment** | Static file hosting | Node.js runtime required |
| **Privacy** | Data stays in browser | Data stored on server |
| **Scalability** | Each user isolated | Centralized data access |
| **Learning Curve** | Lower (just HTML/CSS/JS) | Higher (backend concepts) |
| **Use Case** | Individual self-assessment | School counselor dashboard |

**Pedagogical Value:** By comparing both architectures, students understand the trade-offs between client-side and server-side approaches, and when to choose each pattern.

