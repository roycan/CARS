# Risk Notices & Disclaimer Governance

This document provides the canonical wording and governance rules for risk-related messaging in the CARS application.

## Canonical Disclaimer (Short Form)
"This tool is for personal tracking and educational purposes only. It is not a diagnostic instrument. If you are distressed or have concerns about your well-being, please speak with a trusted adult, counselor, or mental health professional."

## Self-Harm Override Message (Canonical)
"Immediate high-risk classification due to thoughts of self-harm. In addition to Tier I support, learner is recommended for Tier III support. Please consider speaking with a trusted adult, counselor, or mental health professional."

## Modification Policy
- Wording above MUST NOT be altered without clinical / domain expert review.
- Any approved change should update this file first; implementation change follows.
- Commit messages involving disclaimer edits must include tag: `DISCLAIMER-CHANGE`.

## Placement
- Self-harm override message appears in the results modal when item #25 is answered "Yes".
- Short disclaimer appears at the bottom of the modal summarizing results.

## Rationale
Consistent, pre-reviewed language mitigates risk of accidental minimization or escalation of sensitive content while keeping the app educational.

## Developer Guidance
| Action | Allowed Without Review? | Notes |
|--------|--------------------------|-------|
| Styling (CSS) change only | Yes | Must not obscure visibility |
| Adding translation (Filipino) | Yes (exact semantic equivalence required) | Provide bilingual peer review later |
| Changing sentence structure | No | Requires review |
| Adding new risk tier text | No | Requires domain decision |

## Escalation Path (Suggested)
1. Identify reason for change (legal, clinical update, clarity).
2. Draft proposed text in issue (internal; repo private during beta).
3. Obtain domain expert sign-off.
4. Update `RISK_NOTICES.md`.
5. Implement code change.
6. Record in `CHANGELOG.md` with `DISCLAIMER-CHANGE` tag.

## Future Considerations
- Add bilingual (Filipino) canonical forms to this file.
- Provide a printable summary page that includes the disclaimer verbatim.
