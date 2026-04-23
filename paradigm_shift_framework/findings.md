# Findings

- The current folder already contains a coherent `v0.9.2` framework, prototype library, and retrospective, but no direct reusable skill entry point.
- The worktree repository already has many skills under `.claude/skills`, so the new deliverable should follow that shape to stay compatible with the rest of the project.
- The `paradigm_shift_framework/` folder itself is currently untracked in git, which makes it a safe place to create a self-contained package.
- The most reusable pieces from prior iterations are:
  - 8 invariants
  - BSM splitting
  - PS/EE dual record for `I1`
  - Scope + Stage for `I8`
  - AP/EP proof split
  - prototype-first analysis
- The least stable pieces are:
  - too many arrow variants
  - too many overlay labels
  - overly fine distinctions that are hard to execute consistently without drift
