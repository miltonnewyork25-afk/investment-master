# Paradigm Shift Analysis Framework

> Current production package: **v1.0**
> Scope: reusable company analysis framework for AI / agent / workflow-shift research
> Design goal: **strong enough to discriminate between companies, simple enough to execute repeatedly**

## What This Package Is

This folder now contains two layers:

1. **Framework layer**
   - the scoring logic
   - the prototype library
   - the reusable company analysis template

2. **Skill layer**
   - a `SKILL.md` entry point that tells a future agent how to apply the framework consistently

The package is designed to be:
- reusable across companies
- strict enough to keep score drift under control
- modular enough to upgrade later without rewriting every report

## Recommended Entry Points

| File | Purpose |
|------|---------|
| [framework_v1.0.md](./framework_v1.0.md) | Primary executable framework specification |
| [prototypes_library_v1.0.md](./prototypes_library_v1.0.md) | Prototype matching library and anchor ranges |
| [analysis_template_v1.0.md](./analysis_template_v1.0.md) | Reusable template for analyzing one company |
| [skill/paradigm-shift-company-analyzer/SKILL.md](./skill/paradigm-shift-company-analyzer/SKILL.md) | Reusable skill package entry point |

## Historical Reference

These files are kept for auditability and retrospective comparison:

| File | Status |
|------|--------|
| [framework_v0.9.2.md](./framework_v0.9.2.md) | Historical working draft |
| [prototypes_library.md](./prototypes_library.md) | Historical prototype library |
| [retrospective_8_companies.md](./retrospective_8_companies.md) | Historical backtest / pressure-test record |

## Skill Activation

The package already includes a reusable skill source at:

- [skill/paradigm-shift-company-analyzer/SKILL.md](./skill/paradigm-shift-company-analyzer/SKILL.md)

If you want it to become a live project skill, promote it into one of the agent skill directories:

- project-local: `.agents/skills/`
- user-local Codex skill path: `~/.codex/skills/`

Recommended pattern:
- keep this folder as the versioned source of truth
- promote the package by either:
  - copying the whole `paradigm_shift_framework/` package and preserving relative paths
  - or creating a symlink from the skill directory to this package

Do **not** copy only the `skill/paradigm-shift-company-analyzer/` subfolder by itself unless you also rewrite its reference paths.

## One-Line Definition

> **AI paradigm shift = 8 invariants being redistributed across layers.**

The core job is not to ask whether a company “has AI.”
The core job is to ask:
- which workflow is changing
- where control is moving
- who owns execution
- who owns authority
- who captures the budget and the margin

## Recommended Workflow

```text
1. Match a prototype
2. Run BSM on the report-date structure
3. Fill the 8 invariants in four passes
4. Apply special rules (I1 PS/EE, I8 Scope+Stage)
5. Check Stack Coherence
6. Pass the four gates
7. Add overlays (AI Asymmetry, AP/EP, D/E/B, Burden)
8. Compare with at least two anchors
9. Let structure, not raw score, determine the Alpha type
```

## What Changed in v1.0

Compared with the earlier `v0.9.x` documents, `v1.0` does four things:

- simplifies the scoring system into an executable core
- keeps the best ideas: `BSM`, `I1 PS/EE`, `I8 Scope+Stage`, `AP/EP`, prototype-first analysis
- demotes unstable extras into overlays or warnings
- formalizes a reusable skill package instead of leaving the framework as notes only

## Upgrade Philosophy

This framework is meant to evolve, but not drift.

Safe upgrades:
- add a new prototype only after it survives at least 2 real company tests
- change a threshold only when a real company breaks the current rule
- keep score ranges comparable across versions

Unsafe upgrades:
- adding new dimensions because a single company feels awkward
- changing weights retroactively to force a desired ranking
- treating every new pattern as a new base arrow
