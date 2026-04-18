# 03_FRAMEWORK_OVERVIEW_SCOPEA_V2.md

## Purpose of This File
This document defines the core research and decision framework used by the Trend Profit Window Agent.

It clarifies how the system should think, in what order, and at what abstraction level.

This framework is designed to be:
- causal rather than descriptive
- cross-industry rather than sector-specific
- action-oriented rather than report-oriented
- focused on economic ownership rather than thematic exposure

It should be read before implementing workflows, skills, prompts, or output templates.

---

# 1. Why This Framework Exists

Most investment research starts too late and at the wrong layer.

It usually starts from:
- company financials
- stock price moves
- valuation multiples
- recent earnings beats
- thematic popularity
- similarity to a past winner

That creates two common failures:

### Failure 1 — Outcome-first research
The researcher sees the outcome and tries to reverse-engineer a thesis after the market has already noticed it.

### Failure 2 — Theme without ownership
The researcher correctly identifies a trend, but fails to identify:
- who actually owns the economics,
- which part of the chain is constrained,
- whether the market has already crowded the obvious trade.

This framework exists to solve those failures.

---

# 2. High-Level System Architecture

The full system has three layers:

## Layer A — FROG
A high-level opportunity filter

## Layer B — SCOPE-A v2
The primary investment decision framework

## Layer C — CMTD+M
The explanatory logic engine

These layers serve different purposes.

---

# 3. Layer A: FROG

## Definition
FROG is the top-level filter that determines whether a setup is even worth serious attention.

FROG stands for:

- **F** = Forced Demand
- **R** = Restricted Node
- **O** = Owner Clarity
- **G** = Gap in Expectations

The system should first test whether a candidate opportunity passes this filter before moving into deeper analysis.

---

## 3.1 Forced Demand

### Question
Is the demand driver forced, semi-forced, or discretionary?

### Why this matters
Not all demand is equal.

The strongest setups usually involve:
- mandatory replacement
- unavoidable maintenance
- regulatory or standards-driven upgrades
- power and infrastructure constraints
- capacity commitments
- national security / energy security / network reliability spending

Forced demand is better than optional demand because it is:
- less sensitive to short-term mood
- more likely to propagate through the chain
- more likely to create durable profit windows

### Examples
- aircraft maintenance on aging fleets
- uranium enrichment for domestic nuclear fuel security
- gas turbine orders when load growth exceeds grid capacity
- data center power infrastructure when compute demand rises
- replacement parts under certified safety regimes

---

## 3.2 Restricted Node

### Question
Does the demand have to pass through a node that is hard to replace, slow to scale, or difficult to bypass?

### Why this matters
A real profit window requires more than demand.
It requires friction.

Restricted nodes are where scarcity lives.

Typical restricted nodes include:
- limited production slots
- long certification cycles
- regulated assets
- specialized manufacturing capacity
- essential materials
- embedded installed base advantages
- long replacement cycles
- safety-critical qualification barriers

### Important distinction
A strong company is not always a restricted node.
A market leader is not always the bottleneck.
A bottleneck is the part of the chain that meaningfully limits throughput or substitution.

---

## 3.3 Owner Clarity

### Question
Who actually captures the economics created by the demand passing through the restricted node?

### Why this matters
Many companies have exposure.
Few companies have ownership.

Owner clarity means we can identify:
- who gets the incremental revenue
- who keeps the incremental gross profit
- who converts it into cash
- who improves return on capital
- who can return capital to shareholders or compound it at attractive rates

This is one of the most important distinctions in the entire framework.

### Common failure
Trend truth does not imply owner truth.

A trend can be correct while the selected company still fails to capture attractive economics.

---

## 3.4 Gap in Expectations

### Question
What is the market still missing, mislayering, or mispricing?

### Why this matters
A correct trend with no expectation gap is not enough.

There are two major forms of expectation gap:

#### 1. Recognition Gap
The market has not fully recognized the importance of the trend or the node.

#### 2. Layering Gap
The market recognizes the trend, but is crowding into the wrong expression layer.

### Typical examples
- the market buys the obvious leader, but the real owner sits upstream
- the market prices revenue growth, but not margin or return on capital
- the market overprices theme exposure while underpricing long-cycle services
- the market focuses on the visible name rather than the bottleneck owner

---

## 3.5 FROG Output

A FROG pass does not automatically mean "buy."
It means "worth deeper evaluation."

FROG should classify candidates as:
- Pass
- Borderline
- Fail

If a candidate fails one of the four FROG dimensions badly, it should not move into top-priority research.

---

# 4. Layer B: SCOPE-A v2

## Definition
SCOPE-A v2 is the main investment decision framework.

It translates a filtered opportunity into a structured decision:
- Is this real?
- Is this early enough?
- Is this the right owner?
- Is this the right layer?
- Is action warranted now?

SCOPE-A v2 stands for:

- **S** = Source Quality
- **C** = Constraint Node
- **O** = Ownership of Economics
- **P** = Pace Differential
- **E** = Expectation Layering
- **A** = Actionability

This is the front-end decision engine.

---

## 4.1 S — Source Quality

### Core question
How strong, durable, and mandatory is the source variable?

### What to examine
- Is the demand forced, semi-forced, or discretionary?
- Is the payer identifiable?
- Is the budget visible?
- Is the driver cyclical, structural, or hybrid?
- Is the demand one-off or repeatable?
- Is it company-specific or ecosystem-wide?

### Output
A source should be labeled with:
- quality
- durability
- payer structure
- transmission likelihood

### Important rule
Company financial outcomes are not source variables.
Margins, revenue growth, and EPS are downstream signals.

---

## 4.2 C — Constraint Node

### Core question
What is the most relevant constrained node in the chain right now?

### What to examine
- capacity limits
- approval and certification limits
- long lead time assets
- switching difficulty
- hard-to-replace process capabilities
- ecosystem lock-in
- regulated assets
- bottleneck release timelines

### Important refinement
This is not just about "what is hard."
It is about:
- what is hard **and currently relevant**
- what is actually constraining growth now
- what, when released, will change throughput or economics

### Output
The system should identify:
- the primary constraint node
- secondary constraints
- the probability and timing of relief
- who benefits most if the constraint persists
- who benefits most if the constraint begins to ease

---

## 4.3 O — Ownership of Economics

### Core question
Who truly owns the economic benefit?

### This must be split into three sub-owners

#### O1. Revenue Owner
Who books the demand?

#### O2. Profit Owner
Who captures the incremental gross or operating profit?

#### O3. Return Owner
Who converts the opportunity into cash flow, improved returns on capital, and shareholder value?

### Why this split matters
Many companies win revenue but not profits.
Many win profits but at poor capital intensity.
Many look exposed but are only pass-through participants.

### Output
For each candidate, the system must distinguish:
- revenue exposure
- margin ownership
- capital return ownership

---

## 4.4 P — Pace Differential

### Core question
Is business realization ahead of market diffusion?

This is a three-clock framework.

### P1. Realization Clock
How far has the opportunity progressed operationally?

Typical sequence:
- qualification
- design win
- pilot production
- long-term agreement
- volume ramp
- shipment growth
- margin expansion
- cash flow inflection
- capital return

### P2. Diffusion Clock
How widely has the opportunity been recognized by the market?

Typical sequence:
- specialist awareness
- ecosystem evidence
- company narrative
- sell-side initiation/revisions
- mainstream financial coverage
- social/media saturation
- crowded ownership

### P3. Expansion Clock
How fast can the ecosystem add capacity, approvals, or substitutes?

Typical sequence:
- bottleneck persists
- incremental capacity announced
- first relief visible
- meaningful relief underway
- bottleneck normalizes

### What matters
The best setups usually occur when:
- realization is advancing,
- diffusion is incomplete,
- and expansion remains slow.

### Output
The framework must classify whether:
- realization leads diffusion
- diffusion leads realization
- expansion is about to erode the window
- the setup is early, validating, accelerating, crowded, or overextended

---

## 4.5 E — Expectation Layering

### Core question
At what layer is the market currently pricing the opportunity?

This is a key upgrade from simple mispricing language.

The market may be pricing one or more of the following layers:
- theme layer
- leader layer
- revenue layer
- profit layer
- cash flow layer
- long-duration optionality layer

### Why this matters
An opportunity can still be attractive if:
- the market prices the theme,
- but not the owner.

Or if:
- the market prices revenue,
- but not margin and capital returns.

Or if:
- the market crowds into the obvious leader,
- but ignores the better expression layer.

### Output
The system should explicitly state:
- what the market is pricing correctly
- what it is partially pricing
- what it is likely missing
- whether the crowd is in the wrong layer

---

## 4.6 A — Actionability

### Core question
What should be done now?

Actionability is not optional.
The framework must end in a current action state.

Allowed action states:
- Avoid
- Watch
- Track Position
- Initiate
- Add
- Trim
- Exit

### Required support for each action
Every action must specify:
- why now
- why this layer
- what validates the next move
- what breaks the thesis
- what would cause status change

### Important rule
No action recommendation should be issued without:
- explicit reasoning,
- explicit monitoring conditions,
- and explicit break conditions.

---

# 5. Layer C: CMTD+M

## Definition
CMTD+M is the explanatory engine behind the framework.

It does not replace SCOPE-A v2.
It explains why SCOPE-A v2 reaches the decision it does.

CMTD+M stands for:
- Cause
- Mechanism
- Transmission
- Duration
- Mispricing

This is the analytical reasoning layer.

---

## 5.1 Cause
What upstream force created the opportunity?

## 5.2 Mechanism
How does that force become economics?

## 5.3 Transmission
How does it move through the value chain?

## 5.4 Duration
Why does the window persist rather than close immediately?

## 5.5 Mispricing
Where is the market still wrong?

---

## Role of CMTD+M in the system
Use CMTD+M to:
- explain a setup
- test a thesis
- teach the logic
- structure a full writeup

Do not use CMTD+M as the sole decision layer.
That role belongs to SCOPE-A v2.

---

# 6. System Hierarchy Summary

## FROG
Should this even become a high-priority setup?

## SCOPE-A v2
What should be done with it now?

## CMTD+M
Why does the decision make sense?

This ordering matters.

---

# 7. What This Framework Optimizes For

The framework optimizes for:
- causal truth
- bottleneck relevance
- owner clarity
- timing edge
- correct expression layer
- actionable decisions

It does not optimize for:
- maximum factor count
- elegant but vague reports
- superficial comprehensiveness
- retrospective narrative fit
- generic screening convenience

---

# 8. What This Framework Rejects

The framework rejects:
- starting from stock similarity
- starting from valuation in isolation
- confusing exposure with ownership
- confusing backlog with realized economics
- confusing popularity with opportunity
- confusing complexity with depth
- recommending a name without specifying the current action state

---

# 9. Final Working Definition

A high-quality trend profit window exists when:

1. demand is forced or highly durable,
2. growth must pass through a constrained node,
3. economics accrue clearly to an identifiable owner,
4. business realization is ahead of market diffusion,
5. capacity expansion or substitution is still slow,
6. market expectations remain incomplete or mislayered,
7. and the correct action is identifiable now.

If these conditions are not present, the setup is weaker than it appears.

---

# 10. Final Reminder

This framework is not built to answer:
"Which stock looks good?"

It is built to answer:
"Where is forced demand flowing, what restricted node controls it, who truly gets paid, why has the market not fully moved there yet, and what should be done right now?"
