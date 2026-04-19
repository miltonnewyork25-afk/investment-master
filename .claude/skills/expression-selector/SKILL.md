---
name: expression-selector
description: "Choose the best current way to express a valid trend: leader, second-order beneficiary, upstream bottleneck, hidden owner, or no-trade."
---

# Expression Selector

## What this skill does
This skill decides where the best expression of the trend sits.

The obvious name is not always the best name.

## Default workflow
1. List the obvious expression.
2. List second-order and upstream alternatives.
3. Ask which layer has:
   - better ownership
   - less crowding
   - cleaner timing
   - better remaining upside
4. State whether the best answer is:
   - leader
   - second-order beneficiary
   - upstream owner
   - hidden owner
   - no-trade

## Key reminder
Correct trend does not mean correct expression.

## Flexibility
If the best answer is "watch, don't own yet," say so.

---

## Extensions to test (pending real-case validation, not default choice set)

Two candidate expression types to flag alongside the default five, for case-level validation before promotion:

**Bridge owner expression** — monetizes ≥2 *independent* L1 forced demand sources (not two expressions of the same demand). Test: if one bucket fades, does a second demand still drive meaningful economics?

**Duration owner expression** — installed-base / replacement / service monetization window ≥ 2× initial deployment cycle, with quantifiable switching cost.

Also test: whether the best expression switches across time (early-wave chokepoint → late-wave duration owner) — v1 picks one answer, reality may require a time-indexed pair. Validation queued: GE Aerospace, Quanta. Upgrade the default choice set only after ≥1 case where v1 demonstrably missed the best answer.
