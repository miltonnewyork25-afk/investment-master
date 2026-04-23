# Paradigm Shift Analysis Framework v1.0

**Status**: production working framework  
**Date**: 2026-04-23  
**Purpose**: reusable company analysis for AI / agent / workflow-shift research

---

## 1. Core Thesis

> **AI paradigm shift = 8 invariants being redistributed across layers.**

A company wins not because it “has AI features,” but because it still owns, or newly captures:
- context
- execution
- authority
- budget
- margin
- routing

The framework is designed to answer one question:

> **Is this company being replaced by the new workflow, or is it becoming the new control point?**

---

## 2. Execution Order

Always analyze in this order:

1. **Prototype match**
2. **BSM split check**
3. **Four-pass invariant fill**
4. **Special rules**: `I1 PS/EE`, `I8 Scope+Stage`
5. **Stack Coherence check**
6. **Four gates**
7. **Overlays**
8. **Anchor comparison**
9. **Alpha type determination**

Never start from scoring alone.

---

## 3. The 8 Invariants

These are not categories.  
They are 8 simultaneous fields every company must occupy.

| I | Invariant | Core Question | Max Score |
|---|---|---|---:|
| `I1` | Value Unit | What does the customer actually pay for: `access / execution / outcome / expert-backed / take-rate`? | `11` |
| `I2` | Decision Context | Who owns the proprietary `data / semantics / history / state / operational ontology` needed for good decisions? | `9` |
| `I3` | Execution Rights | Who can actually change state, trigger flows, write into systems, or complete the workflow? | `10` |
| `I4` | Authority & Accountability | Who approves, audits, rolls back, or contractually carries responsibility? | `10` |
| `I5` | Budget Owner | Which pocket pays: `IT / business P&L / consumer wallet / services / take-rate pool`? | `9` |
| `I6` | Incremental Value Capture | After model/compute/channel passthrough, who keeps the incremental gross profit? | `9` |
| `I7` | Exception Ownership | When the workflow fails, who absorbs the cleanup, refund, repair, or compensation burden? | `7` |
| `I8` | Entry Point & Routing Power | Where does the workflow begin, and who controls the key routing step? | `5` |

---

## 4. Base Scoring

Base score = **70 points**

### 4.1 C / S / M split

Each invariant is scored across:
- `C` = current control
- `S` = stability
- `M` = monetization quality

| Invariant | C | S | M | Max |
|---|---:|---:|---:|---:|
| `I1` | 3 | 5 | 3 | 11 |
| `I2` | 3 | 4 | 2 | 9 |
| `I3` | 3 | 4 | 3 | 10 |
| `I4` | 3 | 4 | 3 | 10 |
| `I5` | 3 | 4 | 2 | 9 |
| `I6` | 3 | 4 | 2 | 9 |
| `I7` | 2 | 3 | 2 | 7 |
| `I8` | 2 | 2 | 1 | 5 |

**Interpretation**
- `C`: how much of the position the company truly owns today
- `S`: how durable the position is under AI / protocol / competition / regulation pressure
- `M`: whether the company converts that position into real economics

---

## 5. Hard Rules for Specific Invariants

### 5.1 `I1` must be dual-recorded

Always write:
- `PS` = **Pricing Surface**
- `EE` = **Economic Engine**

Rules:
- if `PS = EE`, score from the stronger view
- if `PS != EE`, use the average view, not the better one
- if `PS` is ahead of `EE`, downgrade one level

### 5.2 `I1` soft ceiling

`I1 >= 9/11` requires the **economic engine** to be primarily:
- `outcome`
- `take-rate`
- `expert-backed`

Pure high-quality `access/subscription` models usually cap at **`8/11`**.

### 5.3 `I5` max score is strict

`I5 = 9/9` only if the budget is close to structurally unavoidable:
- regulatory lock
- physical lock
- compliance monopoly
- near-unavoidable ecosystem lock

Large budget or high switching cost alone is not enough.

### 5.4 `I8` must have Scope + Stage

Always tag:

**Scope**
- `consumer default`
- `enterprise default`
- `domain-specific`

**Stage**
- `Discovery Entry`
- `Execution Routing`
- `Transaction Completion`
- `Post-action Feedback`

Scoring rule for `I8 C`:
- single-stage owner: max `1.5 / 2`
- two-stage owner: can reach `2 / 2`
- multi-stage default owner: full score allowed

---

## 6. Evidence Rules

### 6.1 Dual-source requirement

High scores require:
- at least one company / official source
- at least one external / customer / independent source

If a high score lacks dual-source support, cap it one level lower.

### 6.2 No P0 inflation

Do not support near-max scores with pure narrative evidence.

### 6.3 Compliance controversy handling

Unverified allegations should normally affect:
- `S`
- `Watch`
- `Kill Switch`

They should not directly hit `C` or `M` unless one of these happens:
- formal investigation
- major customer withdrawal
- audit / legal / regulatory action
- contract or procurement reversal

---

## 7. BSM: Business Split Mechanism

### 7.1 When splitting is mandatory

Split if any of these are true:
- `I5` budget pockets differ across businesses
- `I1` PS or EE differ materially across businesses
- `I3` execution happens in different workflows

### 7.2 Report-date structure rule

BSM is based on the **latest report-date operating structure**, not historical memory.

Completed divestitures:
- count as `A3 Spill`
- do **not** remain active BSM branches

### 7.3 Split thresholds

- any business `>= 5%` of revenue can merit its own line
- lower-revenue businesses can still get a strategic view if strategically important
- if business lines differ by `>= 3` points on the same invariant, prefer `SOTP`

---

## 8. Four-Pass Fill Order

### Pass 1
`I5`

Budget defines the ceiling for the rest.

### Pass 2
`I2 + I3 + I4`

These form the core workflow control triangle.

### Pass 3
`I1 + I6 + I7`

These reveal whether the company actually monetizes and internalizes the workflow.

### Pass 4
`I8`

Entry points are easiest to misread if analyzed too early.

---

## 9. Migration Mechanics

### 9.1 Base arrows

| Arrow | Meaning |
|---|---|
| `A1 Sink` | value/control sinks into model, protocol, or infrastructure layers |
| `A2 Lift` | value/control rises into orchestration or workflow-owner layers |
| `A3 Spill` | control or economics spill to a new owner or business boundary |
| `A4 Rebundle` | old pieces are reassembled into a new commercial bundle |

### 9.2 Patterns, not base arrows

These are recognized patterns, not new foundational arrows:
- `Split-Retain`
- `Accountability-Thin`
- `Discovery lost, completion retained`
- `Tool layer defending with AI`

This keeps the framework extensible without turning every new observation into a new core primitive.

---

## 10. Stack Coherence Bonus

This replaces the looser “operational layer” intuition.

### 10.1 Trigger

Add a bonus only if one named layer clearly combines:
- strong `I2`
- strong `I3`
- meaningful `I4`

and that integration is supported by **independent evidence**.

### 10.2 Score

- partial coherence: `+1`
- strong coherence: `+2`

Examples:
- `PLTR` can qualify
- `ADBE` and `APP` usually do not

---

## 11. The Four Gates

### Gate 1: Structure

At least one of `I3 / I4 / I7 / I8` must have  
`C >= 80%` of its max, and two together must exceed `60%` of their combined max.

### Gate 2: Economics

`I1 + I5 + I6 >= 12`

### Gate 3: Validation

Either:
- at least `3` invariants with `P2`
- or at least `1` invariant with `P3`

### Gate 4: Sequencing

Watch three classic bad patterns:
- `I1` moving faster than `I6`
- `I8` moving faster than `I5`
- `I3` moving faster than `I4`

#### Industry-neutral downgrade

If the mis-sequencing is:
- shared by at least 2 credible peers
- structural to the industry model

then downgrade from `Bad` to **`Industry-Neutral`**, rather than forgiving it entirely.

This avoids double-penalizing a whole industry while still recognizing the risk.

---

## 12. Overlays (30 Points)

Total score = **70 base + 30 overlays**

### 12.1 AI Asymmetry (`-8` to `+8`)

| Bucket | Score | Meaning |
|---|---:|---|
| `AI-Accretive` | `+8` | AI structurally improves the company’s economics |
| `AI-Neutral Positive` | `+6` | AI is manageable, flexible, and modestly favorable |
| `AI-Neutral` | `+4` | AI helps, but does not rewrite the economics |
| `AI-Passthrough` | `0` | AI cost and AI revenue largely offset |
| `AI-Exposed` | `-4` | AI cost pressure or structural monetization lag |
| `AI-Victim` | `-8` | core service is directly disintermediated by AI |

### 12.2 Sequencing (`-3` to `+7`)

| Bucket | Score |
|---|---:|
| `Good` | `+7` |
| `Neutral` | `+3` |
| `Industry-Neutral` | `+1` |
| `Bad 1` | `0` |
| `Bad 2+` | `-3` |

### 12.3 AP / EP (`0-5` each)

- `AP` = Adoption Proof
- `EP` = Economics Proof

These should remain separate.
Strong economics without broad adoption, and broad adoption without clear economics, are not the same thing.

### 12.4 D / E / B (`0-3`)

This is a compact directional modifier:
- `+3` = clearly expansion-led
- `+2` = balanced, with real offensive legs
- `+1` = mostly defensive, but not dead
- `0` = pure defensive

### 12.5 Burden (`0 or -5`)

Subtract only if legacy structure is actively blocking the new one:
- unfinished divestiture drag
- sales model drag
- seat structure drag
- heavy process drag without successful rebundle

---

## 13. Warnings

### 13.1 Accountability-Thin

Flag if:
- `I4 + I7 < 35%` of their combined max
- and `I6 >= 75%`

This catches companies with high profit capture but very thin authority / exception absorption.

### 13.2 Legacy-Defending

Flag if:
- `I1` remains legacy
- `I6` remains strong
- discovery is sinking away
- AI is mainly being used to defend the installed base

This often marks `P11` companies.

---

## 14. Alpha Types

Structure overrides score.

| Type | Typical Range | Core Trait | Valuation Lens |
|---|---:|---|---|
| `Deep Alpha` | `75-95+` | single-point frozen chokepoint | `DCF + steady-state FCF` |
| `Broad Alpha` | `75-100` | multiple invariants are meaningfully strong | `SOTP` |
| `Growth Alpha - Healthy` | `70-85` | strong execution plus durable expansion legs | `PEG + flywheel validation` |
| `Growth Alpha - Brittle` | `60-80` | strong execution/profit but weak authority, cyclical or thin | `PEG + stricter risk haircut` |
| `Transition-Watch` | `30-70` | meaningful structure, but unresolved migration or weak expansion | `valuation floor + Kill Switch` |
| `Option Alpha` | `35-60` | weak base, but real upside with evidence | `scenario / option-style` |

---

## 15. Calibration Anchors

Use at least two anchors in every new company analysis.

| Company | Anchor Role |
|---|---|
| `INTU` | Broad Alpha / authority-backed monetizer |
| `TSM` | Deep Alpha / physical frozen chokepoint |
| `SHOP` | healthy execution rail / split-retain |
| `APP` | brittle routing layer / high I6, thin accountability |
| `PLTR` | operational control layer |
| `GTLB` | pure defensive compliance |
| `CRM` | transition-watch expansion attempt |
| `ADBE` | legacy workflow platform defending with AI |

---

## 16. Upgrade Rules

The framework is upgradeable, but only under discipline.

### Safe upgrades
- add a new prototype only after at least 2 real company tests
- add a new warning when a repeated blind spot appears across cases
- revise a threshold only when a real company consistently breaks it

### Unsafe upgrades
- adding a new arrow for every new pattern
- changing weights to justify a desired ranking
- treating one controversial company as proof that the whole system is wrong

### Versioning rule

For any future `v1.x`:
- keep anchor comparability
- state what changed
- show which existing companies would move and why

---

## 17. One-Line Command

> **Match the prototype, split by report-date economics, fill the 8 invariants in four passes, apply PS/EE and Scope+Stage, run the four gates, add AI/validation overlays, then let structure—not score alone—assign the Alpha type.**
