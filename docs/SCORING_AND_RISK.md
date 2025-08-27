# Scoring & Risk Logic

Detailed reference for the transformation pipeline converting raw questionnaire responses into standardized T-scores and final risk classification.

## Overview Pipeline
1. Collect answers (array of length 25) from the questionnaire form.
2. Sum raw scores per subscale using item membership lists.
3. Convert each raw score to a T-score via discrete lookup table (scale-specific).
4. Determine risk tier from Total T and override if self-harm item is affirmative.
5. Build immutable result object and persist to localStorage.

## Functions (in `scoring.js`)
| Function | Purpose | Pure |
|----------|---------|------|
| `collectAnswers(formEl)` | Extracts selected values (defaults to 0 if missing) | Yes |
| `computeRawScores(answers, scales)` | Sums per scale based on item lists | Yes |
| `convertRawToTScore(scaleKey, raw)` | Maps raw → T with clamping | Yes |
| `convertAllToTScores(rawScores)` | Applies conversion across scales | Yes |
| `determineRisk(tScores, hasSelfHarm)` | Applies thresholds & override | Yes |
| `buildResult(...)` | Aggregates all derived data into one object | Yes |
| `calculateResultPipeline(formEl)` | Convenience wrapper executing full pipeline | Yes (given deterministic input) |

## Raw Score Computation
Each subscale is defined by a fixed set of 1-based item IDs. Raw score = sum of corresponding `answers[itemId - 1]`.
- Externalizing, Internalizing, Social, Academic each have 6 contributing items.
- Total uses items 1–24 (excludes special item 25).

## Special Item 25
- Binary (Yes=1, No=0) and does NOT contribute to any subscale raw sum.
- Its value is interpreted separately for override logic.

## T-Score Conversion
T-score tables are discrete maps (`raw -> t`). Conversion algorithm:
1. If exact key exists, return table[raw].
2. If raw below minimum key, return minimum key’s T.
3. If raw above maximum key, return maximum key’s T.
4. Else (sparse gap scenario): iterate ascending keys; return T of nearest lower key.

Rationale: Ensures monotonic, stable mapping even if future tables become sparse.

## Risk Thresholds
Defined in `RISK_THRESHOLDS`:
- Normal/No Risk: Total T ≤ 60
- At-risk: 61–70
- High risk: ≥ 71

## Self-Harm Override
If `answers[SELF_HARM_ITEM_INDEX] === 1`:
- Force `riskLevel = "High risk"`
- Replace interpretation with urgent support message encouraging professional help.

Override precedence is absolute; it disregards Total T.

## Interpretation Texts
| Risk Level | Interpretation |
|------------|---------------|
| Normal/No Risk | "Learners continue to receive Tier I support." |
| At-risk | "In addition to Tier I support, learner is recommended for Tier II support." |
| High risk (non-override) | "In addition to Tier I support, learner is recommended for Tier III support." |
| High risk (override) | Immediate high-risk classification language referencing self-harm thoughts. |

## Result Object Integrity
The result object is treated as immutable once created; downstream UI modules should not mutate internal fields (only read). Any migration or augmentation should occur during load or build phases.

## Example Walkthrough
Example partial answers (first 6 items): `[1,0,2,3,0,1,...]`
1. Externalizing raw: items 1,5,9,13,17,21 → (1 + 0 + ... remaining selected values) → e.g., 8
2. Raw 8 → Externalizing T = table.externalizing[8] = 54
3. ... repeat for other scales
4. Suppose Total T = 65 → At-risk (unless self-harm item = 1)
5. Build & persist result.

## Edge Cases & Defensive Behavior
- Missing radio selections (should not occur due to defaults) treated as 0.
- Raw values outside table bounds gracefully clamp.
- Self-harm item default = No (0) to avoid accidental false override.

## Future Enhancements
- Parameterize thresholds for research variants.
- Supply confidence annotation if raw near boundary.
- Optional percentile conversion layer.
