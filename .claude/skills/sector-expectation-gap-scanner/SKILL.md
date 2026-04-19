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

### Step 5: Classify the expectation gap
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
