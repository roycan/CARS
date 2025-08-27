# Data Dictionary (v0.9.0)

Defines core domain data, storage schema, and exported data specifications for the CARS (Children and Adolescents Risk Screener) application.

## Storage
- LocalStorage Key: `carsTrackerData`
- Value Type: JSON array of Result Objects (see `ARCHITECTURE.md`)
- Schema Version Constant: `DATA_SCHEMA_VERSION` in `data.js` (currently `1`)

## Question Set
25 learner self-report questions, bilingual (English text + Filipino translation). Question #25 is a special binary self-harm indicator (Yes=1 / No=0). All others: 0–4 Likert scale.

Questions are stored as objects with shape:
```
{ id: number, en: string, tl: string, special?: boolean }
```
`special: true` only for item 25.

## Rating Options (Questions 1–24)
| Label | Value |
|-------|-------|
| Never (0) | 0 |
| Rarely (1) | 1 |
| Occasionally (2) | 2 |
| Often (3) | 3 |
| Almost Always (4) | 4 |

Question 25 overrides these with two radio options: Yes (1), No (0 default).

## Scales & Item Membership
| Key | Label | Items (1-based IDs) |
|-----|-------|---------------------|
| externalizing | Externalizing | 1,5,9,13,17,21 |
| internalizing | Internalizing | 2,6,10,14,18,22 |
| social | Social | 3,7,11,15,19,23 |
| academic | Academic/Learning | 4,8,12,16,20,24 |
| total | Total | 1–24 inclusive |

## Raw Score Ranges
- Subscales (6 items): 0–24 (each item 0–4)
- Academic (6 items): 0–24
- Total (24 items): 0–96
- Special item (#25) does not contribute numerically to any raw scale (binary flag only)

## T-Score Tables
Defined per scale in `T_SCORE_TABLE` inside `data.js` as object maps: `{ rawScore:int -> tScore:int }`.
- Lookups clamp: values below min map to min key’s T; above max map to max key’s T.
- Intermediate gaps (none expected currently) map to nearest lower defined key.

## Thresholds
`RISK_THRESHOLDS = { normalMax:60, atRiskMax:70 }`
Interpretation tiers:
- Total T ≤ 60: Normal/No Risk
- 61–70: At-risk
- ≥ 71: High risk
- Self-harm (item 25 = Yes/1): Force High risk

## Result Object Fields
| Field | Type | Description |
|-------|------|-------------|
| date | string (ISO) | Submission timestamp |
| answers | number[25] | Ordered responses (0–4 or 0/1 for item 25) |
| rawScores | object | Keys: externalizing, internalizing, social, academic, total |
| tScores | object | Same keys as rawScores |
| riskLevel | string | Normal/No Risk | At-risk | High risk |
| interpretation | string | Guidance text tied to tier or override |
| selfHarmOverride | boolean | True if item 25 triggered forced High risk |

## CSV Export Specification (Locked Contract)
Column order (must remain stable):
1. Date (ISO string)
2. Risk Level (quoted)
3. Self Harm Override (boolean)
4. Externalizing Raw
5. Externalizing T
6. Internalizing Raw
7. Internalizing T
8. Social Raw
9. Social T
10. Academic Raw
11. Academic T
12. Total Raw
13. Total T

## Import Requirements
- JSON backup must be an array of objects matching the Result Object shape. Extra fields ignored; malformed entries abort import with alert.

## Special Item (#25) Handling
- Binary (Yes=1, No=0 default selection)
- Not included in any scale raw sum
- If value = 1 sets `selfHarmOverride = true` and forces `riskLevel = "High risk"` with specific interpretation text.

## Change Protocol
- Any update to questions, scales, or thresholds requires schema review and potential migration logic.
- Increment `DATA_SCHEMA_VERSION` and (future) supply a migration function if breaking for existing stored data.

## Future Extensions (Not Yet Implemented)
- Additional languages: extend question objects or parallel localization map.
- Versioned migration registry.
- Optional anonymized learner identifier for multi-profile support.
