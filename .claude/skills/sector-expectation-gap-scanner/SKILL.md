---
name: sector-expectation-gap-scanner
description: Use when you need to rank sectors, industries, or custom themes by the gap between fundamental acceleration, market attention, and embedded expectations to find high-growth but underappreciated opportunity sets.
---

# Sector Expectation Gap Scanner

## What this skill does
This skill helps identify sectors, industries, and themes where:

- fundamentals are improving
- market attention is not yet fully saturated
- embedded expectations may still be incomplete

The goal is not to find the hottest sector.
The goal is to find sectors where growth, attention, and expectations are out of sync.

This skill is used to answer:

- which sectors are accelerating the fastest?
- which sectors are already over-owned and over-priced?
- which sectors still have expectation gaps?
- which sectors are improving before the market fully notices?
- which sectors look cheap for good reason and should still be avoided?

## What this skill is not
This skill is not:

- a sector momentum list
- a valuation-only sector screener
- a substitute for bottom-up thesis work

Its job is to prioritize where to dig deeper.

After this skill identifies a promising sector or theme, the agent should still use:

- `trend-source-mapper`
- `industry-propagation-mapper`
- `chokepoint-locator`
- `profit-owner-resolver`
- `expression-selector`

## Core idea
A sector can be:

- strong and obvious
- strong but underappreciated
- weak but overhyped
- improving quietly
- expensive for good reason
- cheap for bad reason

The purpose of this skill is to distinguish these states.

## New scanning principles

### 1. Broad-market first
Do not begin from AI, data center, or other already-hot themes by default.

Start with the broad market, then let the scan reveal where the best expectation gaps actually are.

If the initial universe is already narrowed to fashionable themes, the scan is biased before it starts.

### 2. Do not force one blended ranking
Different sector gaps come from different engines.

Do not mix these into one undifferentiated table without saying which type of gap is present.

Common gap types include:

- structural owner gap
- cyclical supply-tightness or asset re-rating gap
- policy-driven gap
- long-duration strategic optionality gap

These should usually be compared within bucket first, then across buckets with caution.

### 3. Theme purity matters
Do not use a wide sector label to hide different drivers.

If a basket contains several sub-groups with meaningfully different economics, split them.

Examples:

- tankers are not the same as dry bulk
- AI optical modules are not the same as connector components
- uranium miners are not the same as fuel-cycle chokepoints

### 4. Hot-theme penalty
If a theme is already mainstream, do not rank it highly just because fundamentals are strong.

Require one of the following before keeping a hot theme near the top:

- expectations are still incomplete
- breadth is better than attention implies
- a less-crowded expression layer is clearly superior

Otherwise downgrade it from:

- best gap

to:

- good business, more discovered

### 5. Financials confirm, not originate
Valuation and financial acceleration matter, but they do not define the root opportunity.

Use them to:

- confirm breadth
- test quality
- detect overpricing
- reject weak sectors that only look cheap

Do not use them to override source, transmission, or owner logic.

## Inputs to consider

### 1. Fundamental data
Use structured data when available, including:

- revenue growth
- earnings growth
- margin trend
- cash flow trend
- return on capital trend
- backlog or order trend if available
- capex trend where relevant
- multiple-company consistency within the same sector or theme

When using market data tools such as FMP, prefer:

- multi-company breadth
- trend direction
- acceleration versus deceleration
- confirmation across several companies

Do not let one outlier company define the whole sector.

### 2. Expectation data
Use market expectation proxies such as:

- sector valuation levels
- relative valuation versus history
- relative valuation versus market
- estimate revisions
- stock price performance versus fundamentals
- premium concentration in leaders

### 3. Attention data
Use attention and crowding proxies such as:

- news mention growth
- social mention growth
- search trend growth
- earnings-call keyword density
- sell-side coverage expansion
- visible thematic crowding

### 4. Custom theme mapping
The skill should not rely only on traditional sector labels.

It should allow custom themes such as:

- AI power infrastructure
- nuclear fuel cycle
- aerospace aftermarket
- LNG export chain
- optical interconnect
- satellite infrastructure
- thermal management

## Default workflow

### Step -1: Multi-entry discovery (hard gate, v1.2 升级)
Before starting with a wide universe (Step 0), run five structured discovery queries in parallel. Each query generates seed candidates from a different input axis — each axis produces candidates that would NOT emerge from sector-first taxonomy.

Run at least three of the five before proceeding. Seed candidates from Step -1 feed into Step 0's universe.

**Coverage constraint**: seed candidates from Step -1 must populate ≥3 of the 5 gap buckets (A/B/C/D/E defined in Step 1.5). If all seeds fall into 1–2 buckets → re-run with different methods.

#### M1 · Mandate-Budget-to-Vendor scan
Start from regulations with deadlines and appropriated funding. Reverse to vendors.

Two-layer query:

- **Upper layer (mandate)**: rules with binding deadlines — EPA rulemaking, FERC orders, FDA final rules, FAA airworthiness directives, NRC regulations, SEC/state climate disclosure, IMO maritime rules.
- **Lower layer (budget)**: money already committed — IIJA/BIL tranches, CHIPS Act awards, IRA incentives, state revolving funds, federal contract awards (SAM.gov, USASpending).

Both layers must confirm; mandate alone without funding = slippage risk, funding alone without mandate = optional spending.

Output: for each mandate-with-funding, identify top 3 vendors / operators / capacity owners.
Example: EPA Lead & Copper Rule Improvements (10-yr deadline) + DWSRF appropriations → MWA / MLI / AOS.

**Why this query exists**: answers Article I Q1 (forced demand) from the input side. Without structured mandate input, the analyst relies on what the market is already discussing — which is by definition NOT the expectation gap.

#### M3 · Installed-base aging radar
Start from aging assets where failure cost grows non-linearly with age. Reverse to replacement-capacity owners.

Key test (distinguishes forced replacement from discretionary upgrade):

- If the asset continues running, does insurance premium / downtime probability / compliance penalty / safety incident rate rise **non-linearly** with age?
- Yes → forced replacement → scan for capacity owners with certification / PMA / approved-vendor status
- No → discretionary upgrade → not a mandate-strength thesis

Sources: industry reliability databases, insurance loss reports, FAA/FERC/NRC filings on asset age, trade association aging surveys.

Example: FAA engine TBO cycle × PMA certifications → TDG / HEI / GE Aerospace. 40-yr average US transformer age × utility insurance loss data → HWM alloy layer.

**Why this query exists**: aging-driven demand is often NOT covered by M1 (no new mandate, just existing mandate triggering on age). It produces candidates that look like boring "industrials" but are actually forced-replacement monopolies.

#### M4 · Negative-screen inversion
Start from sectors where capital is structurally avoiding despite improving fundamentals.

Critical subtype distinction (do not collapse):

- **Type A · Structural avoidance** — codified in institutional mandates: ESG exclusion lists, fund prospectus restrictions, regulatory prudential limits, sovereign wealth exclusions. Persistent and mechanical. Examples: Private Prisons, tobacco, firearms, gambling subsegments, fossil-fuel subsegments.
- **Type B · Temporary avoidance** — event-driven sell-off, sentiment-driven avoidance. Mean-reverts as memory fades. Examples: regional banks post-SVB (recovered in 9 months), specific biotech after FDA rejection.

Only **Type A produces durable expectation gaps**. Type B is value-trap prone.

Test for Type A: is the avoidance codified in investment policy statements / fund prospectus / prudential rules? If yes → Type A. If "investors just don't like it" → Type B (unstable).

**Why this query exists**: systematic capital avoidance creates a persistent bid-side vacuum. Fundamentals can improve for years before marginal buyer emerges. Produces exceptional expectation gaps but requires political / reputational risk tolerance.

#### M-hop · Multi-hop chokepoint walk
Start from a hot theme's most-bought owner. Walk 3–4 hops upstream. Each hop, ask: "What is the critical single-source / near-single-source supplier to this layer?"

Stopping rule: continue walking while each hop has quantifiable flow-through economics; stop when (a) supplier becomes non-US-listed with no liquid ADR, or (b) causal chain becomes hand-waving ("will trickle down"). Applies 跨层硬规则 9 (causal distance limit).

Example chains:

- AI compute → HBM memory → probe-card testing → test architecture IP (verification subsegments of CDNS / SNPS)
- AI power → transformer → grain-oriented electrical steel (CLF segment) → silicon alloy
- Aerospace aftermarket → nickel-based superalloy (HWM) → titanium sponge (ATI as sole US producer)

**Why this query exists**: Article I.2 "find constrained node" stops at hop 1 by default. Multi-hop walk finds chokepoints 2–3 removes from obvious theme leaders — often uncrowded because buyers of the theme leader don't know these layers exist.

#### M-mono · Hidden monopoly behind commodity
Start from commodities that look like price-taker businesses. Ask: is there an embedded IP / certification / geographic / scale monopoly that captures most of the economic profit?

Test: separate revenue from EBITDA by segment. Even if the headline business is commodity, if >50% of EBITDA comes from a specific patented active / certified facility / geographic monopoly / approved-vendor status, that segment is a hidden monopoly.

Examples:

- Fertilizer → crop-protection active ingredients (CTVA patented actives vs generic commodities)
- Industrial gases → noble gas supply (neon / xenon for lithography, disrupted by Ukraine war)
- Steel → GOES segment (already in M-hop example)
- Agriculture → seed genetics IP (CTVA again, BAYN-AG subsegment)

Warning: these candidates often fail Gate 5a Investability (the profitable segment is a sub-business, not a pure play). Note the limitation before investing deeper time.

**Why this query exists**: M4 Negative-Screen catches sectors "no one wants to own". M-mono catches sectors "everyone thinks they own but doesn't" — the profit sits in a buried layer that doesn't have its own ticker.

---

### Step 0: Start with a wide universe
Begin with a broad sector and theme map across the market.

Do not default to:

- AI
- semiconductors
- power
- any currently fashionable narrative cluster

Only narrow early if the user explicitly wants a constrained universe.

### Step 1: Define the sector or theme universe
Group opportunities into:

- standard sectors
- sub-industries
- custom themes

If using custom themes, define:

- core companies
- adjacent companies
- peripheral companies

If a labeled sector contains different economic engines, split it now rather than later.

### Step 1.5: Universe coverage check (hard gate, v1.1 升级)
Before proceeding to measurement, verify the initial universe spans all five gap buckets.

Each bucket must contain **≥2 candidates**. Otherwise the universe is biased toward the analyst's default lens (usually industrial chokepoint) and must be expanded before any measurement begins.

Required buckets:

- **A · Structural owner** — forced demand × durable chokepoint (e.g. LNG midstream, aerospace aftermarket, advanced packaging upstream)
- **B · Cyclical re-rating** — supply tightness or asset re-rating (e.g. tankers, uranium miners, refiners)
- **C · Policy / regulation** — government spending / statutory mandate / capacity expansion (e.g. Private Prisons / ICE detention, fire code updates, tobacco alternatives)
- **D · Workflow shift / software** — new workflow replacing old (e.g. agentic customer support, AI-native coding, agent orchestration layer)
- **E · Long-duration optionality** — realization clock not yet started but structure identifiable (e.g. humanoid robotics components, small sat constellations, stablecoin rails)

If any bucket has <2 candidates → **STOP**. Expand the universe before continuing. Do not proceed to Step 2 with a biased universe — measurement will only confirm the bias, not correct it.

**Why this gate exists**: without it, the analyst defaults to the bucket where priors are strongest (usually A or B for industrial / chokepoint) and misses C (policy) or D (software) entirely. A missing bucket is a universe-construction failure, not an analysis failure — and no amount of deeper Step 2–6 work will recover the missing candidates.

### Step 2: Measure fundamental acceleration
Look for:

- growth rate
- growth acceleration
- breadth of participation
- margin improvement
- cash flow inflection
- backlog or order expansion
- capital return improvement

Goal:
Estimate whether the sector is truly improving, not just narratively strong.

### Step 3: Measure embedded expectations
Look for:

- valuation premium
- historical valuation percentile
- consensus optimism
- price ahead of fundamentals
- whether the sector is already priced for best-case outcomes

Goal:
Estimate how much optimism is already embedded.

### Step 4: Measure attention saturation
Look for:

- media intensity
- social intensity
- search intensity
- sell-side intensity
- thematic crowding

Goal:
Estimate how fully the market has already discovered the sector.

### Step 4.5: Pace gate (hard gate, v1.3 升级 — 三时钟拆分)
Before classifying the gap, apply the Pace filter to every FROG-pass candidate. Pace measures **three clocks**, not one — the v1.1 single-clock version systematically under-ranked "contract-ramp" themes where signed contracts trail into earnings over 1–3 years.

**Three clocks per candidate**:

- **C · Contracted Realization**: demand locked in via signed commercial contracts / firm order book / legislated funding schedule / long-term supply agreements with delivery dates. Count only items with firm commercial terms and ramp schedule. Do NOT count MOUs, letters of intent, marketing "pipeline", or indicative guidance.
- **R · Recognized Realization**: portion of the thesis already booked in trailing 4-quarter earnings / revenue / margin improvement attributable to the theme specifically (not company-wide growth).
- **D · Diffusion**: how much market has already priced in — generalist fund ownership shift, sell-side coverage density, 52-week return vs peers, valuation multiple re-rating vs 5-yr history.

**Decision matrix**:

| Clock order | Interpretation | Top-3 in bucket allowed? |
|------------|---------------|--------------------------|
| **R > D** | Market behind even booked earnings — fully undiscovered | **Yes (strongest)** |
| **C > D > R** | Market ahead of booked earnings but behind contracted ramp — the Contracted→Recognized gap IS the alpha | **Yes** |
| **D ≈ C > R** | Market priced to contracts, earnings will catch up fairly | Mid-bucket only |
| **D > C ≥ R** | Market priced beyond even contracted backlog — residual alpha depends on acceleration not yet signed | **No (Pace block)** |
| **R ≈ D** | Fully priced on booked earnings | Mid-bucket only |

**Why v1.3 split this** (upgrade from v1.1 single-clock):

The v1.1 gate treated Realization as one clock measured by trailing earnings. This systematically under-ranked themes where 2024–25 signed contracts ramp into 2026–28 earnings.

Worked examples:

- **Nuclear fuel cycle** (DOE Russian LEU ban guidance 2024, HALEU contracts, SMR-utility MOUs with commercial terms) — C jumped 2024-25, R will ramp 2026-28, D had major re-rating 2023-24. Under v1.1 this was **"D > R" → blocked**. Under v1.3 it is **"C > D > R" → allowed top-3** because Contracted→Recognized gap IS the alpha window.
- **Commercial HVAC refrigerant transition** (EPA AIM Act 2020, R-410A phase-down hitting 2025+) — same pattern, allowed.
- **Data-center electrical** (FIX/EME backlog already in contracts AND already booking in earnings) — C high, R high, D extreme. Under v1.3 still blocked correctly: **D > C ≈ R**.
- **AI compute leaders** (NVDA/AVGO) — C high, R high, D extreme. Still blocked: **D > C ≈ R**.

**Measurement discipline**:

- **C measurement**: cite specific contract value + ramp period from company filings or regulatory disclosure. "$X signed for delivery 20XX–20XX per 10-K / earnings call." No paper trail → **C = 0**, guard against inflation.
- **R measurement**: cite trailing 4Q revenue / margin improvement attributable to the theme, separated from broader company growth.
- **D measurement**: cite specific multiple re-rating vs 5-yr history + institutional ownership change. Anecdotal "this has been hot" is not a measurement.

**Failure mode**: analyst inflates C to justify desired ranking ("contracts are coming", "pipeline is strong"). Guard: if C cannot cite a specific $ value and delivery window from a disclosed document, C is set to 0 for Pace purposes. MOUs without commercial terms do not count.

**Why this gate exists**: structural quality (FROG) alone does not determine whether a theme is the right action now. Pace separates "this should be owned eventually" from "this is the right owner right now". The v1.3 refinement further separates "signed but not yet booked" (alpha window) from "neither signed nor booked" (speculation). Ignoring Pace violates Article II.5 (respect timing) and 跨层硬规则 6 (financials verify, not decide).

### Step 5: Classify the expectation gap

#### Step 5a: Investability binary (hard pre-filter, v1.1 升级)
Before classifying the gap type, apply the investability binary.

For each candidate, check:

- Is at least one of the **top 3 economic owners** a US-listed company (or liquid ADR / primary foreign listing) with **theme purity > ~60%** (i.e. the theme drives the majority of the company's revenue and profit)?

Binary outcome:

- **Yes** → candidate proceeds to gap classification and ranking
- **No** → candidate moves to a separate **"Research only, not ranked"** bucket. It does not compete for top-10 slots.

Examples that fail this gate:

- GLP-1 peptide CDMO — top owners Bachem / Lonza / Evotec are non-US-listed; US-listed exposure is diluted
- Spent nuclear fuel backend — Holtec is private; US-listed owners have <30% purity
- Electronics specialty industrial gases — top owners Merck KGaA / 关东电化 are non-US-listed

**Why this gate exists**: "strong thesis but weak investability" is a straddle. Carrying it into the ranked top-10 dilutes decision density by occupying a slot that cannot be acted on. Top-10 ranking slots are scarce; un-investable themes belong in "research only", not in the investment ranking. "Research only" is not dismissal — it flags the theme for monitoring (e.g. if a pure US-listed owner emerges via IPO / spin-off, the theme becomes investable and re-enters the ranked universe).

#### Step 5b: Classify the gap type
Compare:
Compare:

- fundamental acceleration
versus
- embedded expectations
versus
- attention saturation

Then classify the sector into one of the following:

- High growth / low expectation
- High growth / still investable despite high attention
- Quiet improvement / underfollowed
- Overheated / expectations too high
- Cheap but weak / likely value trap

### Step 6: Rank sectors by quality of gap
Prioritize sectors where:

- fundamentals are real
- growth is broadening
- expectations are incomplete
- attention is not yet fully saturated
- ownership and transmission logic are still favorable

### Step 7: Bucket before final ranking
Before presenting a final ranking, separate sectors into gap categories such as:

- structural owner gap
- cyclical re-rating gap
- policy-driven gap
- long-duration optionality gap

Then decide whether a single cross-bucket ranking is even appropriate.

If a blended ranking is still shown, explicitly warn that the sectors are not comparable in the same way.

### Step 7.5: Bucket D disintermediation check (hard gate, v1.1 升级)
Bucket D (workflow shift / software) candidates require one additional check before Owner clarity (the O in FROG) can be rated Pass.

For each Bucket D candidate, answer:

- Is the proposed owner's core revenue model (seat-based, license-based, transaction-based) itself being replaced by the new workflow's pricing model (outcome-based, per-agent-call, per-resolved-ticket)?
- If the new workflow prices on resolved outcomes but the incumbent still sells seats, the incumbent is a **disruptee**, not a disruptor — even if the incumbent's headline metrics still look healthy.

Hard rule:

- Proposed owner is a **disruptee** (seat / license incumbent facing outcome-priced replacement) → FROG's O downgrades to **Fail**, candidate does not enter the ranking
- Proposed owner is a **disruptor** or a **bridge owner** (captures the workflow shift and monetizes the new pricing model) → O pass, candidate proceeds normally

Common trap:

- Naming a seat-based incumbent as the "beneficiary" of an agentic workflow shift — the incumbent is often the revenue source being cannibalized, not the profit capturer.
- Historical analog: Zendesk / Genesys were correctly identified as SaaS-era customer-service winners but were later displaced as the pricing model shifted. Identifying the right direction did not translate to picking the right owner.

**Why this gate exists**: Buckets A–C use a chokepoint test for Owner clarity. Bucket D has a distinct failure mode — "right direction, wrong owner" — because the chokepoint in software is the workflow control layer, which may be captured by a different company than the current revenue leader. Without this gate, the analyst risks buying the 2010s seat-based incumbent as a "workflow shift beneficiary" while the profit actually accrues to the agent-native disruptor.

### Step 7.6: Bridge-owner overlay (hard gate, v1.2 升级)
After the ranked list is produced, run one additional query on the owner layer.

For each top-ranked theme, ask:

- Does any candidate owner simultaneously capture a **second independent forcing mechanism** that the market is NOT pricing?
- If yes, and the market prices the owner only on the primary narrative → this owner is the preferred expression for this theme, replacing any "obvious owner" the sector scan produced.

Example: KMI / WMB are priced as LNG midstream owners. They also carry natural gas pipeline exposure feeding AI data-center power build-out. The market prices the LNG narrative; AI-power exposure is a free option embedded in the same stock.

Distinguishing note vs M-hop (multi-hop chokepoint walk): M-hop is **vertical** — one demand chain × 3–4 hops deep. Bridge-owner is **horizontal** — one company × 2+ independent demand chains converging.

Rule: if overlay produces a candidate owner that captures 2 independent forcing mechanisms with the market pricing only 1 → replace the default obvious owner for that theme.

**Why this gate exists**: Step -1 discovery methods and Steps 1.5–7.5 gates structure candidates at the theme level. Bridge-owner overlay structures selection at the owner level. A decent theme with a bridge owner often beats a great theme with an obvious owner, because the market scores obvious owners on single-factor exposure.

## Recommended output
For each sector, sub-industry, or custom theme, report:

- theme name
- gap type
- fundamental state
- expectation state
- attention state
- expectation-gap bucket
- why it is interesting or dangerous
- what bottom-up work should come next

The output should end by identifying:

- top-priority sectors for deeper work
- sectors to watch but not chase
- sectors to avoid even if they appear cheap

## What good use looks like
A good output should make clear:

- which sectors are truly accelerating
- which sectors only look strong because of price
- which sectors are already fully discovered
- which sectors are underfollowed despite real improvement
- which sectors deserve deeper bottom-up work
- which sectors should be avoided despite low valuation

## Key reminders

### 1. Growth alone is not enough
A fast-growing sector may already be fully priced.

### 2. Low valuation alone is not enough
A cheap sector may deserve to be cheap.

### 3. Attention is not the same as expectations
A sector can be under-discussed but still richly priced.
A sector can be widely discussed but still underpriced if realization is stronger than consensus.

### 4. Traditional classifications are incomplete
Many of the best themes cut across sectors and industries.
Be willing to define custom themes.

### 5. Breadth matters
If the sector only works because one company is extraordinary, the expectation gap may be weaker than it appears.

### 6. Ranking should lead to deeper work
This skill is a prioritization tool, not the final investment thesis.

Its output should identify:

- where to dig deeper
- where not to waste time
- where the expectation gap is most promising

### 7. A low-PE theme is not automatically a top gap
Low valuation can mean:

- underappreciation
- cyclical decline
- structurally poor ownership
- policy or ethical exclusion

You still have to ask why the valuation is low.

### 8. Do not let hot themes dominate by habit
When a popular theme has strong fundamentals, ask:

- is the market already there?
- is this now a layer-selection problem rather than a sector-selection problem?
- should this theme be downgraded from top-rank to "watch but still investable"?

### 9. Compare breadth inside the basket, not just the story
If only one or two names confirm while the rest weaken, the theme may be narrower than it looks.

Split the basket rather than defending the wide label.

## Suggested mental buckets
When ranking sectors, think in five buckets:

1. **High growth + low expectations**
   Best hunting ground.

2. **High growth + high expectations but still under-realized**
   Can still work if realization leads diffusion.

3. **Quiet improving sectors**
   Often early and underfollowed.

4. **Crowded sectors**
   Need caution and layer selection.

5. **Cheap but weak sectors**
   Often not worth deeper work.

## Common mistake
Bad sector ranking:

- AI is hot
- semis are up
- therefore semiconductors rank first

Better sector ranking:

- AI compute leaders are crowded
- advanced packaging and power infrastructure are still accelerating
- attention is more concentrated in the visible leaders than in the enabling layers
- the better opportunity may sit in a narrower custom theme, not the standard sector label

## Flexibility
This skill should not be overly formulaic.

If a sector’s real opportunity is not visible in standard valuation or standard growth metrics, the agent may:

- redefine the theme
- use a narrower company set
- focus more on transmission and ownership than on simple sector labels

The goal is to discover expectation gaps, not to obey taxonomy.
