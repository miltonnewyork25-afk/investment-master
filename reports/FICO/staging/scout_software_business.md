# FICO Software Segment -- Scout Report

> **Date**: 2026-03-10
> **Scope**: Software segment deep-dive (excluding Scores)
> **Fiscal Year Note**: FICO's fiscal year ends September 30

---

## 1. Revenue, Growth Rate, and Profitability

### Revenue Trajectory

| Fiscal Year | Software Revenue | YoY Growth | Total Company Revenue | Software % of Total |
|-------------|-----------------|------------|----------------------|---------------------|
| FY2023 | ~$739M (implied) | — | ~$1,514M | ~49% |
| FY2024 (ended Sep 2024) | $798M | +8% | $1,717M | ~46% |
| FY2025 (ended Sep 2025) | $822M | +3% | $1,991M | ~41% |

**FY2025 Quarterly Breakdown:**

| Quarter | Software Revenue | YoY Change |
|---------|-----------------|------------|
| Q1 (Dec 2024) | $204.3M | +8% |
| Q2 (Mar 2025) | $201.7M | — |
| Q3 (Jun 2025) | $212.1M | +3% |
| Q4 (Sep 2025) | $204.2M | flat |

**Key Observation**: Software growth decelerated sharply from +8% (FY2024) to +3% (FY2025), while Scores surged +27% to $1.169B. Software's share of total revenue is shrinking -- from ~49% in FY2023 to ~41% in FY2025. FICO is increasingly a Scores company.

Sources:
- [FICO Q4 FY2025 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-642-share-fourth-quarter-fiscal-2025/)
- [FICO Q1 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-6-14-share-first-quarter-fiscal-2025)
- [FICO Q4 FY2024 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-544-share-fourth-quarter-fiscal-2024)

### Segment Profitability

| Metric | Value | Period |
|--------|-------|--------|
| Software segment operating margin | ~32% | Q3 FY2025 |
| Software segment operating income | $67.9M | Q3 FY2025 (on $212.1M rev) |
| Company-wide non-GAAP operating margin | 57% | Q3 FY2025 |

**Key Observation**: Software's ~32% operating margin is healthy for enterprise software but dramatically lower than the Scores segment (which operates at ~85%+ margins, near-zero marginal cost). The blended company margin of 57% is pulled up almost entirely by Scores.

Sources:
- [FICO Q3 FY2025 Investor Presentation](https://www.investing.com/news/company-news/fico-q3-2025-presentation-reveals-34-scores-revenue-surge-driving-20-overall-growth-93CH-4325740)

---

## 2. Key Products

### FICO Platform (Decision Management Suite)
- **What it does**: Cloud-native platform for building, deploying, and managing analytic decision models. Combines rules engines, optimization, and AI/ML model deployment.
- **Strategic role**: FICO's bet to consolidate legacy point solutions onto a unified platform. Management frames it as the growth engine for the Software segment.
- **Deployment**: Available on-premises or via FICO Analytic Cloud (hosted/managed).

### Falcon Fraud Manager
- **What it does**: Real-time fraud detection and prevention using AI/ML. Covers credit cards, debit cards, account-to-account payments, and other transaction types.
- **Scale**: Protects 2.6 billion+ payment accounts worldwide across 10,000+ financial institutions globally.
- **History**: 30+ years of operational track record in fraud prevention.
- **Falcon Intelligence Network**: Consortium model where 10,000+ institutions contribute transactional data, creating a network effect moat -- the more institutions participate, the better the fraud models become.

### TONBELLER/Siron Compliance Solutions
- **Acquired**: 2015
- **What it does**: Anti-money laundering (AML), Know Your Customer (KYC), counter-terrorism financing, tax compliance, business partner due diligence.
- **Scale**: 1,100+ customers worldwide, analyzing 500M+ transactions daily.
- **Integration**: Now fully integrated with Falcon Platform under the "FICO Falcon X" umbrella for converged fraud + financial crime.

### Other Software Products
- **FICO Origination Manager**: Automated lending decision workflows
- **FICO Customer Communication Services**: Omnichannel customer engagement
- **FICO Xpress Optimization**: Mathematical optimization solver (used in logistics, supply chain, telecom beyond financial services)
- **FICO Strategy Director**: Strategy design and simulation

Sources:
- [FICO Falcon Fraud Manager Product Page](https://www.fico.com/en/products/fico-falcon-fraud-manager)
- [FICO Financial Crime Suite Announcement](https://www.fico.com/en/newsroom/fico-amplifies-financial-crime-protection-new-suite-solutions)
- [FICO Falcon Intelligence Network](https://www.fico.com/en/fico-falcon-intelligence-network)

---

## 3. SaaS Transition Progress

### Platform vs Non-Platform ARR

| Metric | Sep 2024 (FY2024) | Sep 2025 (FY2025) | YoY Change |
|--------|-------------------|-------------------|------------|
| Total Software ARR | $721M | ~$762M (est.) | +4% |
| Platform ARR | $227M | ~$264M | +16% |
| Non-Platform ARR | $494M | ~$494M | -2% |
| Platform % of Total ARR | 31% | ~35% | +4pp |

**Quarterly Platform ARR Growth Trend (FY2025):**

| Quarter | Platform ARR Growth | Non-Platform ARR Growth |
|---------|-------------------|----------------------|
| Q1 (Dec 2024) | +20% | +1% |
| Q2 (Mar 2025) | — | — |
| Q3 (Jun 2025) | +18% | -2% |
| Q4 (Sep 2025) | +16% | -2% |

**Key Observations**:
1. Platform ARR (~$264M) represents approximately 35% of total Software ARR as of Sep 2025, up from 31% a year earlier.
2. Platform growth is decelerating (31% in FY2024 full year -> 16% by Q4 FY2025).
3. Non-Platform (legacy on-premise) is in mild decline (-2%), not collapsing but not growing. This is the classic SaaS transition pattern: cloud grows, legacy shrinks slowly.
4. The "crossover point" where Platform exceeds 50% of Software ARR is likely 3-4 years away at current trajectory.
5. FICO does not separately disclose "cloud revenue" vs "on-premise license" within the Software segment in a clean way. The Platform ARR metric is the closest proxy for SaaS/cloud progress.

Sources:
- [FICO Q4 FY2025 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-642-share-fourth-quarter-fiscal-2025/)
- [FICO Q3 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-7-40-share-third-quarter-fiscal-2025)
- [FICO Q1 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-6-14-share-first-quarter-fiscal-2025)

---

## 4. Total Addressable Market (TAM)

Multiple third-party estimates for the decision management software market:

| Source | Market Definition | 2024-2025 Size | 2030-2032 Projection | CAGR |
|--------|------------------|---------------|---------------------|------|
| Mordor Intelligence | Management Decision Solutions | $6.7B (2025) | $17.2B (2030) | 20.7% |
| Fortune Business Insights | Decision Management | $6.9B (2025) | $19.3B (2032) | 15.8% |
| MarketsandMarkets | Management Decision | — | $11.4B (2028) | — |
| Fortune BI | Decision Intelligence (broader) | $19.4B (2025) | $57.8B (2032) | 16.9% |

**FICO's Implied Market Share**: With ~$822M in software revenue against a ~$6.7-6.9B core decision management market, FICO holds roughly 12% market share. Against the broader decision intelligence market ($19B+), FICO's share is ~4%.

**Key Observation**: The TAM is growing at 15-21% CAGR, but FICO Software is growing at only 3%. This implies FICO is losing market share in decision management software, or the TAM estimates are inflated, or competitors/new entrants (AI-native startups) are capturing the growth.

Sources:
- [Mordor Intelligence - Management Decision Market](https://www.mordorintelligence.com/industry-reports/management-decision-market)
- [Fortune Business Insights - Decision Management Market](https://www.fortunebusinessinsights.com/decision-management-market-107473)
- [MarketsandMarkets - Management Decision](https://www.marketsandmarkets.com/PressReleases/management-decision.asp)

---

## 5. Competitive Landscape

### Direct Competitors

| Competitor | Strengths | vs FICO |
|-----------|-----------|---------|
| **SAS Institute** | Deep analytics/statistics heritage; strong in risk management, fraud, AML. Private company. | Most direct competitor in banking analytics. Broader analytics platform but less embedded in credit workflows. |
| **IBM (SPSS/Watson)** | Enterprise scale, AI brand (Watson), broad IT relationships. | Larger but less focused. IBM has been losing analytics market share for years. SPSS is aging. |
| **Experian PowerCurve** | Credit bureau + decisioning in one. End-to-end origination. | Direct threat: Experian bundles data + decisioning. FICO competes but also partners (Experian distributes FICO Scores). Complex "frenemy" relationship. |
| **Pegasystems** | Low-code decisioning + CRM/BPM. Strong in insurance, healthcare, government. | Different approach (BPM-first vs analytics-first). Less overlap in fraud but competes in decisioning workflows. |
| **Nice Actimize** | Financial crime and compliance specialist. | Strong in AML/fraud. Directly competes with Falcon + TONBELLER. |
| **Feedzai / Featurespace** | AI-native fraud detection startups. Cloud-first. | Newer entrants attacking Falcon's position with modern ML stack. Potential disruptors in fraud. |
| **ACI Worldwide** | Payment fraud, real-time payments. | Overlaps with Falcon in payment fraud detection. |

### Competitive Dynamics
- The decision management market is fragmented. FICO, SAS, IBM, and Oracle are cited as the top 4 players by MarketsandMarkets.
- **AI-native disruptors** (Feedzai, Featurespace, etc.) are a growing threat to Falcon's dominance, especially with cloud-first institutions.
- **Experian PowerCurve** is the most strategically dangerous competitor because it bundles bureau data with decisioning -- a vertical integration FICO cannot match without its own credit bureau.

Sources:
- [MarketsandMarkets - Top Decision Management Companies](https://www.marketsandmarkets.com/ResearchInsight/management-decision-market.asp)
- [Gartner Peer Insights - FICO Alternatives](https://www.gartner.com/reviews/market/data-and-analytics/vendor/fico/alternatives)
- [FICO 2024 Annual Report](https://investors.fico.com/static-files/7363a0f4-e05a-4510-8dbb-170ae6d4c7a2)

---

## 6. Customer Base and Retention

### Customer Scale
- **Falcon Fraud Manager**: 10,000+ financial institutions globally, protecting 2.6B+ payment accounts
- **TONBELLER/Siron**: 1,100+ customers worldwide
- **Overall Software**: Serves financial institutions, insurers, telcos, retailers, and government agencies. Heavy concentration in financial services.

### Dollar-Based Net Retention Rate (DBNRR)

| Date | Total Software DBNRR | Platform DBNRR | Non-Platform DBNRR |
|------|---------------------|---------------|-------------------|
| Sep 2024 | — | 123% | — |
| Dec 2024 | 105% | 112% | 100% |
| Mar 2025 | 102% | 110% | 96% |
| Jun 2025 | 103% | 115% | 97% |
| Sep 2025 | 102% | 112% | 97% |

**Key Observations**:
1. **Platform DBNRR of 112% is good but not elite** -- best-in-class SaaS companies typically run 120-140%+. FICO Platform hit 123% in Sep 2024 but has since declined to 112%.
2. **Non-Platform DBNRR below 100%** (96-97%) means legacy customers are contracting/churning at a low rate. This is expected during SaaS transition.
3. **Total Software DBNRR of 102%** means the installed base is barely expanding net of churn. For a $822M software business, this implies ~$16M of net expansion annually -- very modest.

Sources:
- [FICO Q4 FY2025 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-642-share-fourth-quarter-fiscal-2025/)
- [FICO Q3 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-7-40-share-third-quarter-fiscal-2025)
- [FICO Q1 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-6-14-share-first-quarter-fiscal-2025)

---

## 7. Independent Moat Assessment: Software vs Scores Brand Halo

### Arguments FOR Independent Software Moat

1. **Falcon's Network Effect**: The Falcon Intelligence Network (10,000+ institutions contributing data) creates a genuine data network effect independent of the FICO Score brand. More participants = better fraud models = more participants. This is a standalone moat.
2. **Switching Costs**: Fraud detection and decisioning systems are deeply embedded in bank operations. Rip-and-replace is expensive and risky. Typical contract cycles are 3-5 years.
3. **Regulatory Embeddedness**: Many bank risk models are built on FICO software and validated with regulators. Switching requires re-validation, which is costly and time-consuming.
4. **Domain Expertise**: 30+ years in financial services decisioning. Deep understanding of credit, fraud, and compliance workflows that generalist software vendors (IBM, Pega) cannot easily replicate.
5. **TONBELLER Integration**: Converged fraud + compliance offering reduces total vendor count for banks -- a differentiated capability.

### Arguments AGAINST Independent Software Moat

1. **Growth Says Otherwise**: If the software had a strong independent moat, it should be growing faster than the 15-21% market CAGR. At +3% YoY, FICO Software appears to be losing share.
2. **Brand Halo is Real**: FICO's name recognition in financial services comes overwhelmingly from the FICO Score. The "FICO" brand on software products (Falcon, Platform) benefits from trust earned by the Score franchise. Without the Score franchise, "Fair Isaac Software" would be a mid-tier analytics vendor.
3. **Platform DBNRR Declining**: From 123% (Sep 2024) to 112% (Sep 2025) suggests expansion within existing accounts is slowing, not accelerating.
4. **Margin Gap**: Software at ~32% operating margin vs Scores at ~85%+ suggests Software lacks the pricing power that comes from true monopoly-like moat.
5. **Talent Competition**: AI/ML talent is being absorbed by hyperscalers and AI startups. FICO's ability to maintain cutting-edge fraud models may erode over time.
6. **Experian Vertical Integration Threat**: Experian can bundle data + decisioning. FICO Software standalone cannot match this.

### Verdict

**FICO Software has a moderate independent moat, but it is narrower than it appears and partially dependent on the FICO brand halo from Scores.**

The strongest independent moat element is Falcon's network effect and switching costs in fraud detection -- this would survive even if FICO Scores disappeared. But the broader Decision Management Platform business (the growth driver) faces real competition from SAS, Pega, Experian, and AI-native entrants, and its 3% growth rate suggests the moat is not widening.

The honest framing: FICO Software is a **good** enterprise software business with **decent** but not **exceptional** competitive position. It benefits meaningfully from the FICO brand umbrella. As a standalone company, it would likely trade at 5-8x revenue (mid-tier SaaS multiples), not the 20x+ multiples the combined FICO commands.

---

## 8. Annual Recurring Revenue (ARR)

### Reported ARR Metrics

| Date | Total Software ARR | Platform ARR | Non-Platform ARR | Platform % |
|------|-------------------|-------------|-----------------|------------|
| Sep 2023 | ~$668M (implied) | ~$173M | ~$494M | ~26% |
| Sep 2024 | $721M | $227M | $494M | 31% |
| Sep 2025 | ~$762M (est.) | ~$264M | ~$494M | ~35% |

**ARR Growth Rates:**

| Period | Total ARR Growth | Platform ARR Growth | Non-Platform Growth |
|--------|-----------------|--------------------|--------------------|
| FY2024 | +8% | +31% | flat |
| FY2025 | +4% (est.) | +16% | -2% |

**Key Observations**:
1. Total Software ARR of ~$762M vs total Software revenue of $822M implies ~93% of revenue is recurring. The remaining ~$60M is professional services and non-recurring license.
2. Platform ARR growth is decelerating: +31% (FY2024) to +16% (Q4 FY2025). This is still above-market growth but the deceleration trend is concerning.
3. Non-Platform ARR ($494M) is essentially a mature, flat-to-declining book of business. This is the legacy installed base that FICO is trying to migrate onto the Platform.
4. At current rates, Platform ARR should cross ~$300M in FY2026, potentially reaching ~40% of total Software ARR.

Sources:
- [FICO Q4 FY2025 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-642-share-fourth-quarter-fiscal-2025/)
- [FICO Q4 FY2024 Earnings Release](https://investors.fico.com/news-releases/news-release-details/fico-announces-earnings-544-share-fourth-quarter-fiscal-2024)
- [FICO Q3 FY2025 Earnings Release](https://www.fico.com/en/newsroom/fico-announces-earnings-7-40-share-third-quarter-fiscal-2025)

---

## Summary Assessment

| Dimension | Rating | Comment |
|-----------|--------|---------|
| Revenue Scale | Strong | $822M is meaningful, top-tier in decision management |
| Revenue Growth | Weak | +3% YoY vs 15-21% market CAGR = losing share |
| Profitability | Good | ~32% segment operating margin, healthy but not exceptional |
| SaaS Transition | In Progress | Platform at 35% of ARR, growing 16%, crossover ~3-4 years out |
| Product Portfolio | Strong | Falcon (fraud) + TONBELLER (compliance) + Platform (decisioning) = comprehensive |
| Customer Stickiness | Good | DBNRR 102% total, 112% Platform; switching costs are real |
| Competitive Position | Moderate | #1 in fraud, competitive in decisioning, threatened by AI-native entrants and Experian vertical integration |
| Independent Moat | Moderate | Falcon network effect is real; Platform moat is weaker; brand halo from Scores is significant |
| TAM Opportunity | Large | $6.9B (2025) growing to $19.3B (2032) |

**Bottom Line**: FICO Software is a solid but unspectacular enterprise software business. Its most defensible asset is the Falcon fraud network (10,000+ institutions, 2.6B accounts). The Platform transition is progressing but decelerating. The segment's strategic value to FICO is (a) cross-selling to Scores customers, (b) providing a recurring revenue base, and (c) diversifying beyond the quasi-monopoly Scores business. As a standalone entity, it would be a mid-tier analytics/decisioning vendor -- good, not great. The current FICO valuation overwhelmingly prices the Scores franchise, with Software as a moderate contributor.
