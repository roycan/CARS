# Project Lifecycle & AI-Driven Development Model

This document formalizes how AI assistance is integrated into the CARS project without creating AI dependency.

## Goals
- Maintain human ownership of direction & domain rules
- Use AI for structured refactors, scaffolding, tests, docs, and teaching aids
- Preserve transparency, reproducibility, and pedagogy for Grade 9 learners

## Roles
| Role | Responsibilities | Limits |
|------|------------------|--------|
| Human Maintainer | Approves plans, domain changes, merges | Avoids manual micro-tweaks AI can standardize |
| AI Assistant | Produces plans, refactors, tests, docs, validations | Cannot alter domain constants (norm tables, thresholds) without approval |
| Learner (Student) | Uses app, explores Dev Mode | Does not modify core logic |
| Teacher | Enables Dev Mode, reviews internal flow | Initiates improvements tasks |

## Artifacts
- `REFACTOR_PLAN.md` – Iterative structural roadmap
- `inceptions/USER_STORIES.md` – User stories backlog
- `PROJECT_LIFECYCLE.md` – (this) operational model
- `README.md` – Public overview & teaching progression
- `CHANGELOG.md` – Structured history (to be added)
- `scripts/` – Validation & documentation helpers (future)

## Branch & Commit Strategy
- `main` always deployable (GitHub Pages)
- Feature branches named `feat/<short-story-id>` or `refactor/<area>`
- Each commit references user story ID (if applicable)
- AI-generated commits summarized with: `AI: <action>` prefix

## Change Workflow
1. Select or write user story
2. Draft plan (AI) – added/updated tasks
3. Human approves plan
4. AI implements change + adds/updates tests/docs
5. Run validation (scripts/test when added)
6. Human reviews diff (focus: clarity, domain accuracy)
7. Merge & update `CHANGELOG.md`

## Quality Gates (Progressive)
| Stage | Gate | Status |
|-------|------|--------|
| Early | Manual functional test | Active |
| Mid   | Validation script (scales, tables) | Planned |
| Mid   | Unit tests (scoring, risk) | Planned |
| Later | Integration tests (submission → charts) | Planned |
| Later | Lint (basic) | Planned |

## AI Task Templates (PROMPTS)
(Will move to `PROMPTS.md`.)

Feature Add:
```
Implement user story <ID>. Keep data schema stable. Add/update tests. Document new public functions.
```
Refactor:
```
Refactor <area>. Maintain identical outputs. Provide before/after summary.
```
Test Generation:
```
Create tests for <function signatures>. Cover happy path + 2 edge cases per function.
```
Audit:
```
List dead code, duplicate logic, naming inconsistencies.
```
Doc Sync:
```
Update README and diagrams to reflect <change>.
```

## Data & Schema Stability
- `DATA_SCHEMA_VERSION` constant maintained in `data.js`
- On breaking changes: add `migrateLocalData(oldVersion)` in `storage.js`

## Dev Mode Policy
Purpose: Transparency & instruction.
- Off by default
- Toggle via navbar button, `Ctrl+D`, or `#dev` URL hash
- Never transmits data externally
- Panels: Answers → Raw Scores → T-Score Mapping → Risk Logic → Result JSON

## Privacy & Safety Rules
- LocalStorage only; no network sync
- No third-party analytics without explicit addition
- Self-harm message remains unaltered unless policy update is approved

## Documentation Lifecycle
- Every new module: add entry to auto-generated "Function Index" (future script)
- Update Mermaid diagram when data flow changes
- Teaching progression evolves with feature set; keep stable numbered steps

## Metrics (Manual Initially)
- Story lead time (open → merge)
- Defects found post-merge
- % AI plans accepted unmodified

## Backlog Grooming (Monthly)
AI proposes: duplicates, complexity hotspots, low-hanging optimizations → curated into `NEXT_UP.md` (future).

## Risk Mitigation
- Archive original monolithic script in `/archive` (future) for teaching diffs
- Keep fallback alias functions during refactor transitions

## Success Indicators
- Learners can trace pipeline visually & in code
- Domain constants centralized & untouched accidentally
- Adding a new visualization requires no scoring changes
- Dev Mode clarifies (not obscures) internal computations

---
Revision History:
- v0.1 (Initial) – Established lifecycle framework
