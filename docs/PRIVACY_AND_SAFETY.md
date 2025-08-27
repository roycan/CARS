# Privacy & Safety Model

This document summarizes how the CARS application handles data, user privacy, and safety-related messaging.

## Core Principles
- Local only: All assessment data is stored exclusively in the user’s browser (`localStorage`).
- No network: The application performs zero AJAX/fetch calls; no data leaves the device.
- Ephemeral risk: Clearing site data, switching browsers/devices, or using private windows removes stored history.
- Transparency: Dev Mode reveals internal processing for educational purposes only.

## Data Lifecycle
| Stage | Mechanism | Notes |
|-------|-----------|------|
| Input | Form radios (preselected defaults) | Minimizes missing values |
| Processing | Pure scoring pipeline | Deterministic given inputs |
| Storage | `localStorage` key `carsTrackerData` | Entire array serialized each save |
| Export | JSON (full fidelity) / CSV (summary) | User-triggered download only |
| Import | Validated JSON array overwrite | Confirmation dialog required |
| Deletion | User confirmation → `localStorage.removeItem` | Irreversible once confirmed |

## No Server / Accounts
The tool is designed to run from static hosting (e.g., GitHub Pages). There is no login, no multi-user distinction, and no remote backup. Responsibility for safeguarding exported backups resides with the user.

## External Resources & Supply Chain
| Resource | Source | Risk | Mitigation Option |
|----------|--------|------|-------------------|
| Bulma CSS | jsDelivr CDN | CDN compromise could inject styles/scripts if integrity disrupted | Self-host copy in repository |
| Chart.js | jsDelivr CDN | Upstream tampering could affect charts | Pin version & optionally serve locally |

To create an offline / air‑gapped version:
1. Download Bulma and Chart.js files.
2. Store under `/vendor/` and update `<link>` / `<script>` tags.
3. Remove external CDN references in `index.html`.

## Backups & Loss Scenarios
| Scenario | Outcome | Prevention |
|----------|---------|-----------|
| Clear browser data | All assessments lost | Export JSON before clearing |
| New device/browser | History not present | Import previously exported JSON |
| Private/incognito session | Data gone after session | Use standard session for persistence |

## Safety Messaging
- Item #25 (self-harm thoughts) produces an immediate High risk classification if answered “Yes”.
- The interpretation includes guidance to seek support from a trusted adult, counselor, or mental health professional.
- Canonical wording stored in code and documented in `RISK_NOTICES.md`.

## Data Sent to Others
None. Exporting JSON/CSV is a deliberate user action; the files stay local unless the user manually shares them.

## Analytics & Tracking
None embedded. There are no third-party analytics scripts or pixel trackers.

## Browser Permissions
No special permissions requested (no cookies directly managed, no geolocation, no camera/microphone).

## Potential User Misconceptions
| Misconception | Clarification |
|---------------|--------------|
| "My data is synced online." | Data is only in the current browser’s localStorage. |
| "Deleting the page removes nothing." | Clearing site storage or uninstalling browser erases history. |
| "Results are a diagnosis." | The tool is educational and tracking-oriented only. |

## Security Considerations
- Attack surface limited to standard DOM + external CDN assets.
- No dynamic code evaluation (`eval`, `Function` constructor) present.
- Users handling sensitive data should prefer an offline version to reduce CDN dependency risk.

## Intended Audience Focus
Primary audience is the learner; all advanced privacy governance (metrics, governance, contribution) is excluded from learner-facing UI.

## Future Enhancements (Planned Post-Beta)
- Integrity hashes/subresource integrity (SRI) for external assets (if kept CDN-based).
- Optional encrypted export format (passphrase-protected JSON).
- Basic privacy FAQ integration inside the interface.
