# Task Plan

## Goal
Upgrade the current paradigm-shift framework into a cleaner, reusable `v1.0` package that can be applied to other company analyses and also exposed as a skill-like entry point.

## Phases
- [x] Inspect existing framework files and current repository structure
- [x] Design the target package structure and decide what to keep vs simplify
- [x] Write the `v1.0` framework specification
- [x] Update the prototype library to align with `v1.0`
- [x] Create a reusable skill package with `SKILL.md` and supporting templates
- [x] Update the folder `README.md` so the package is usable without prior context
- [x] Final review for consistency, upgradeability, and reuse

## Key Decisions
- Keep both artifacts: a framework spec and a reusable skill package
- Base the new version on the existing `v0.9.2` work, but simplify where repeated company tests showed ambiguity
- Keep the framework inside `paradigm_shift_framework/` rather than scattering files across unrelated directories

## Risks
- Over-preserving old variants can make the package too hard to use
- Over-simplifying can lose the discriminating power gained from CRM / PLTR / SHOP / APP / ADBE / INTU / TSM / GTLB tests
