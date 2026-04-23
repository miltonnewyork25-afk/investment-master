---
name: paradigm-shift-company-analyzer
description: Use when analyzing a company whose workflow, control point, or monetization may be changing under AI or agent adoption, and you need a repeatable structure using prototype matching, BSM splitting, the 8 invariants, and Alpha-type output.
---

# Paradigm Shift Company Analyzer

## Overview

Use this skill to analyze a company through the paradigm-shift framework rather than through generic product or valuation commentary.

The goal is to answer:
- what workflow is changing
- where control is moving
- whether the company is losing or gaining the new control point
- whether the economics are actually moving with the story

## Load These References

Read these files in order:

1. [framework_v1.0.md](../../framework_v1.0.md)
2. [prototypes_library_v1.0.md](../../prototypes_library_v1.0.md)
3. [analysis_template_v1.0.md](../../analysis_template_v1.0.md)

This skill assumes the surrounding `paradigm_shift_framework/` package is kept intact.  
If you promote the skill into another directory, preserve these relative paths or rewrite them.

## When to Use

Use when:
- the company is being discussed as an AI winner or loser
- a software, platform, workflow, payments, adtech, or enterprise tool business may be shifting from seat/access to execution/outcome
- you need to compare companies on one consistent scale
- you need to separate strong legacy economics from true new control-point ownership

Do not use when:
- the task is a pure valuation update with no workflow/control question
- the company is clearly outside AI/workflow relevance

## Operating Sequence

### 1. Start with current structure, not memory

Before scoring:
- check the latest report-date structure
- identify completed divestitures
- run BSM on the current business, not the historical one

### 2. Match a prototype first

Choose the closest prototype before scoring.  
If confidence is medium, list the top two candidates.

### 3. Fill the framework in four passes

Follow this order exactly:
- Pass 1: `I5`
- Pass 2: `I2 + I3 + I4`
- Pass 3: `I1 + I6 + I7`
- Pass 4: `I8`

### 4. Use the two special rules every time

- `I1` must include `PS` and `EE`
- `I8` must include `Scope` and `Stage`

### 5. Run gates before telling the story

Do not jump from raw scores to a narrative.
Run:
- structure gate
- economics gate
- validation gate
- sequencing gate

### 6. Add overlays last

Only after the base table is filled:
- AI Asymmetry
- AP / EP
- D/E/B
- Stack Coherence
- Burden
- Accountability-Thin warning

## Output Standard

Every analysis should produce:
- prototype match
- BSM result
- 8 invariant scores
- gate outcomes
- overlay summary
- at least 2 anchor comparisons
- Alpha type
- valuation lens
- 3 kill switches

## Common Mistakes

### Mistake 1: Scoring before BSM
This breaks comparability immediately.

### Mistake 2: Treating AI features as new control points
Features are not control.
Check `I2`, `I3`, `I4`, `I8` instead.

### Mistake 3: Letting PS stand in for EE
If the pricing story moved but the engine did not, the company is weaker than the story sounds.

### Mistake 4: Over-crediting discovery
In AI-era workflows, discovery often moves upstream while execution stays downstream.
Be explicit about which stage is owned.

### Mistake 5: Confusing high margins with durable control
Strong `I6` can coexist with weak `I4/I7`.
Flag `Accountability-Thin` when appropriate.

## Quick Output Sentence

After scoring, compress the company into one sentence:

`{Company} is not {old label}; it is {new workflow/control-point definition}.`

Examples:
- `SHOP is not just e-commerce SaaS; it is a commerce execution rail where discovery can move upstream but checkout still returns.`
- `APP is not just adtech growth; it is an AI-native routing layer with thin authority.`
- `ADBE is not just old creative software; it is a legacy workflow platform defending execution and completion as discovery sinks away.`

## Upgrade Discipline

If a company does not fit cleanly:
- do not invent a new core arrow immediately
- first ask whether it is a variant of an existing prototype
- only propose a new prototype if the pattern is reusable across multiple future companies
