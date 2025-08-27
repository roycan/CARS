# Changelog

All notable changes to this project will be documented in this file.

Format inspired by Keep a Changelog. Versioning will follow SemVer once 1.0.0 is reached. Pre-1.0 minor increments may include breaking changes (documented when applicable).

## [Unreleased]
- (placeholder for upcoming beta adjustments)

## [0.9.0] - 2025-08-27
### Added
- Initial structured multi-file architecture (`data`, `scoring`, `storage`, `ui_*`, `devmode`, `main`).
- Bilingual questionnaire (English + Filipino) with 25 items (item #25 self-harm flag).
- Raw → T-score conversion using normative tables.
- Risk classification tiers + self-harm override.
- Calendar history view with day-based result recall.
- Analysis view with trend line and radar snapshot charts.
- Data Management: JSON full export/import, CSV summary export, delete-all.
- Dev Mode panel (toggle by button, `#dev`, or Ctrl+D) for transparency.
- Core documentation set: README, Architecture, Data Dictionary, Scoring & Risk, Privacy & Safety, Risk Notices, Changelog.

### Changed
- Refactored monolithic archived implementation into modular namespace-based code (archived original under `/archive/`).

### Security
- Explicit statement of CDN dependency & offline mitigation guidance.

### Governance
- Disclaimer wording governance policy established in `RISK_NOTICES.md`.

