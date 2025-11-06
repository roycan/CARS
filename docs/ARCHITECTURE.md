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
