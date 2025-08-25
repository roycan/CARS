# CARS User Stories (Checkable Backlog)

Format: As a <role>, I want <goal>, so that <benefit>.

## Core Assessment Flow
- [ ] As a learner, I want to read each question in English and Filipino so that I understand it clearly.
- [ ] As a learner, I want default answers pre-selected (Never/No) so that I can submit quickly if needed.
- [ ] As a learner, I want to change any answer with a single click so that interaction is simple.
- [ ] As a learner, I want to submit my answers and immediately see my results so that I get instant feedback.
- [ ] As a learner, I want the tool to calculate raw scores per subscale so that I can understand different areas.
- [ ] As a learner, I want T-scores derived from a normative table so that my scores are standardized.
- [ ] As a learner, I want an overall risk level so that I know if support tiers apply to me.
- [ ] As a learner, I want a clear message if I indicate self-harm thoughts so that I know it is serious.

## Data Persistence & History
- [ ] As a learner, I want my past assessments saved automatically so that I can track change over time.
- [ ] As a learner, I want to view a calendar highlighting days with assessments so that I can revisit specific dates.
- [ ] As a learner, I want to click a calendar day with a test and see the full results so that I can review progress.

## Analysis & Visualization
- [ ] As a learner, I want a trends line chart of T-scores so that I can see improvement or decline.
- [ ] As a learner, I want a snapshot radar chart of my latest test so that I see strengths/concerns at a glance.
- [ ] As a learner, I want charts to update after each new submission so that visuals stay current.

## Data Export / Import
- [ ] As a learner, I want to export my data as JSON so that I can back it up.
- [ ] As a counselor/teacher, I want CSV export so that I can open it in spreadsheet software.
- [ ] As a learner, I want to import a prior JSON backup so that I can restore my history after clearing or switching browsers.
- [ ] As a learner, I want a confirmation before overwriting data so that I avoid accidental loss.

## Data Deletion & Privacy
- [ ] As a learner, I want to delete all my data with a clear confirmation so that I control my privacy.
- [ ] As a learner, I want reassurance that data stays only in my browser so that I feel safe using the tool.

## Dev Mode (Teaching / Transparency)
- [ ] As a teacher, I want a Dev Mode toggle so that I can reveal inner workings during lessons.
- [ ] As a teacher, I want to see the raw answers array so that I can explain how arrays work.
- [ ] As a teacher, I want to see raw scores per scale so that I can demonstrate summation logic.
- [ ] As a teacher, I want to see the T-score mapping step so that I can explain lookups.
- [ ] As a teacher, I want to view risk classification logic so that thresholds become concrete.
- [ ] As a teacher, I want to copy the full result object as JSON so that I can use it in examples.
- [ ] As a teacher, I want Dev Mode accessible via button, shortcut, or URL hash so that I can choose how visible it is.

## Resilience & Validation
- [ ] As a maintainer, I want the app to ignore malformed import files so that errors don’t crash the UI.
- [ ] As a maintainer, I want scoring functions to guard against missing table entries so that edge cases don’t break output.
- [ ] As a maintainer, I want a future place to insert ARIA roles so that accessibility can improve later.

## Semantic & Structure
- [ ] As a maintainer, I want semantic HTML sections so that the document is more readable and structured.
- [ ] As a maintainer, I want fieldsets grouping the radio inputs so that forms are more accessible and organized.
- [ ] As a maintainer, I want constants separated from logic so that updates to norms or thresholds are easy.

## Performance / Simplicity (Minor)
- [ ] As a maintainer, I want charts destroyed before re-creation so that memory usage stays low.
- [ ] As a maintainer, I want a single place initializing event listeners so that wiring is easy to audit.

## Optional Enhancements (Future)
- [ ] As a learner, I want color bands/legend on charts so that I can contextualize my scores.
- [ ] As a teacher, I want an optional print-friendly result view so that I can hand it out or archive.
- [ ] As a maintainer, I want versioned localStorage schema so that migrations are possible.

---
## Mapping to Planned Phases
(Phase numbers refer to `REFACTOR_PLAN.md`)
- Phases 1–2: Core Assessment Flow stories
- Phases 3–4: UI separation & persistence stories
- Phase 5: Dev Mode stories
- Phase 6: Wiring & resiliency stories
- Phase 7: Semantic & Structure stories
- Phase 8: Documentation & transparency stories
- Phase 9: Validation of all above
- Phase 10: Optional enhancements & future items

---
If new stories arise, append them here before beginning related implementation.
