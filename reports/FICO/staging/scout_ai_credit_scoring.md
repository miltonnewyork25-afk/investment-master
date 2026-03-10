# Scout Memo: AI & Alternative Credit Scoring Threats to FICO

**Date:** 2026-03-10
**Analyst:** Research Agent
**Purpose:** Assess whether AI-driven credit scoring represents a real disruption threat to FICO's institutional embedding
**Status:** Scout-level research (web sources, not verified against SEC filings)

---

## Executive Summary

FICO faces a multi-vector challenge from AI-based credit scoring, but the threat is **more nuanced than "AI replaces FICO."** The dominant dynamic is AI models using FICO as one input among many—complementing rather than substituting. The real risk is not displacement but **margin compression** if alternative models reduce FICO's pricing power by giving lenders credible alternatives. However, FICO's institutional embedding (regulatory mandates, GSE requirements, lender inertia) creates a moat that is eroding slowly, not collapsing.

**Key finding:** ~90% of mortgage lenders still use FICO scores. VantageScore usage grew 55% YoY to 42B scores in 2024, but from a low base in mortgages. AI lenders like Upstart and Pagaya are growing fast ($40B+ and $10.5B annual volumes respectively) but operate *alongside* FICO, not as replacements. The most immediate threat to FICO's dominance is regulatory (VantageScore 4.0 now approved for GSE mortgages) and pricing backlash, not AI per se.

---

## 1. Key AI Credit Scoring Players

### Tier 1: Scale Players (>$1B annual lending volume facilitated)

**Upstart Holdings (UPST)**
- **Model:** 2,500+ variables (up from 23 in 2014); includes education, job history, utility payments
- **Scale:** $40B+ in loans facilitated annually; Q3 2025 originations of $2.9B (+80% YoY)
- **Partners:** 500+ banks and credit unions; 100+ active lending partners
- **Performance claims:** 44% more approvals at same loss rate; 73% lower losses at same approval rate; 2.2x more risk separation than FICO alone
- **Automation:** 91% of loans fully automated in 2025
- **Relationship to FICO:** Uses FICO as one input among many. Does NOT replace FICO—augments it with ML models. Borrowers still have FICO scores pulled
- **Revenue model:** Fee per loan originated through platform

**Pagaya Technologies (PGY)**
- **Model:** AI/ML platform analyzing hundreds of data points across consumer credit and real estate
- **Scale:** $10.5B network volume in FY2025; $2.8B in Q3 2025 (+19% YoY)
- **Revenue:** $1.3B FY2025; $335M Q4 2025; GAAP net income $81M FY2025
- **Partners:** Major banks including Wells Fargo, TD Bank, Citizens, Bank of Montreal, CIBC
- **2026 guidance:** $1.4B-$1.575B revenue
- **Relationship to FICO:** Operates as a second-look layer. Partners pass FICO-rejected applicants through Pagaya's AI for reassessment. FICO remains the first filter

### Tier 2: Infrastructure/Platform Players

**Zest AI**
- **Customers:** ~300 lenders (banks, credit unions, large enterprises); 600+ custom AI models deployed
- **Key clients:** Citi (via Citi Ventures investment), SchoolsFirst FCU, Members 1st FCU, ORNL FCU, Truliant FCU
- **Performance:** SchoolsFirst more than doubled instant approval rate using Zest models
- **Reach:** Cornerstone League + GoWest Credit Union Association adopted Zest's LuLu GenAI platform, representing 900+ credit unions serving ~30M members
- **New initiative:** CU Lending Collective (CUSO) bringing AI lending to small credit unions
- **Relationship to FICO:** Builds custom models that sit alongside FICO in underwriting workflows. Lenders typically use both. Zest emphasizes regulatory compliance and explainability
- **50+ patents** on AI credit scoring and explainability

**Nova Credit**
- **Focus:** Cash flow underwriting + international/new-to-country consumers
- **Products:** Credit Passport (cross-border credit history), Cash Atlas (cash flow underwriting), Income Navigator
- **Partners:** American Express, Chase, PayPal, Verizon, HSBC, RBC, SoFi, Scotiabank, MoneyLion, Imprint
- **International reach:** Partnerships with credit bureaus in 20+ countries
- **TAM claim:** 53M US adults lack traditional FICO scores; 2M immigrants/year to US
- **Funding:** $35M Series D (Oct 2025) led by Socium Ventures; backed by Kleiner Perkins, General Catalyst, Index Ventures, Y Combinator
- **Forbes Fintech 50** for 2025
- **Relationship to FICO:** Complementary for thin-file/no-file populations. Expands the addressable market rather than cannibalizing FICO's existing base

### Tier 3: Emerging/Niche Players

| Company | Focus | Notable |
|---------|-------|---------|
| Scienaptic AI | AI-powered credit decisioning platform | Enterprise bank clients |
| LenddoEFL | Alternative data (psychometrics, digital footprint) | Emerging markets focus |
| Credolab | Mobile device behavioral data | Southeast Asia strength |
| CreditVidya (now Onyx) | Alternative data scoring | India market |
| RiskSeal | Digital footprint scoring | SMB/fintech clients |
| Taktile | Credit decisioning workflow automation | Platform play |

---

## 2. AI Model Performance vs. FICO: Published Evidence

### Direct Comparison Studies

| Source | Finding | Methodology |
|--------|---------|-------------|
| **Upstart internal** | 44% more approvals, 73% lower losses at same approval rate | Proprietary back-testing |
| **Upstart internal** | 2.2x more risk separation vs. FICO alone | Model discrimination metrics |
| **Harvard/Zest AI case study** | 25% increase in loan approvals at same risk level | Case study across 180+ lenders |
| **FICO research (2025)** | FICO Score 10T "significantly outperforms" VantageScore 4.0 in mortgage predictive power | FICO's own analysis (potential bias) |
| **Springer Nature (2025)** | AI models show higher predictive accuracy but lower interpretability vs. traditional statistical models | Systematic literature review, 2018-2024 |
| **MIS Quarterly (2025)** | AI-enabled scoring increases financial inclusion for underserved populations of 1M+ | Empirical study |

### Critical Assessment

- **Most performance claims come from the AI vendors themselves** — independent, peer-reviewed head-to-head comparisons are scarce
- **FICO's own research** predictably shows FICO winning, particularly in mortgage contexts where regulatory explainability matters
- **The academic consensus** is that ML models are better at capturing non-linear relationships and handling high-dimensional data, but their advantage over well-tuned logistic regression (which FICO uses) narrows when limited to the same input variables
- **Key insight:** AI models' advantage comes primarily from **using more data** (alternative data, cash flow, behavioral), not from being inherently better algorithms on the same data. This means FICO can partially close the gap by incorporating alternative data (which it is doing via UltraFICO and Score XD)

---

## 3. FICO's Own AI/ML Strategy

### Defensive Product Extensions

**FICO Score 10T (Trended Data)**
- Incorporates 24 months of trended credit data (payment trajectories, utilization trends)
- FHFA nearing deal for FICO 10T adoption in mortgages; likely phased in during 2026
- Represents FICO's answer to "more data = better predictions" without abandoning the score paradigm

**UltraFICO Score**
- Partnership with Experian and Finicity (now Mastercard)
- Incorporates checking, savings, and money market account data
- 75%+ of consumers see positive impact when managing accounts responsibly
- **2025 update:** Partnered with Plaid for real-time cash flow data integration
- Targets thin-file consumers — directly addresses Nova Credit/Upstart's inclusion argument

**FICO Score XD**
- Uses telecom, utilities, and public records data
- Targets the 53M US adults who are "credit invisible"
- Partnership with Equifax and LexisNexis

**FICO Resilience Index**
- Predicts borrower resilience to economic stress
- Sold as supplement to base FICO score
- Used by lenders to adjust credit policies during macro uncertainty

### Offensive Platform Strategy

**FICO Platform (AI Decisioning)**
- Named Leader in Forrester Wave AI Decisioning Platforms Q2 2025 (highest score in current offering)
- Named Leader in Gartner Magic Quadrant for Decision Intelligence Platforms 2026
- Includes Applied Analytics & ML capabilities
- Positions FICO as the decisioning layer that uses AI, not just a score provider
- **Strategic logic:** Even if the score becomes commoditized, FICO captures value through the decisioning platform

**FICO Responsible AI**
- Explainability framework for AI models
- Directly addresses CFPB concerns about black-box models
- Competitive moat: FICO can claim regulatory-safe AI, while startups face explainability scrutiny

### Revenue & Pricing Strategy

**Mortgage Score Pricing (the pricing power story):**
- 2024: $3.50/score
- 2025: $4.95/score (+41%)
- 2026: $10.00/score (+102%) — or $4.95 under performance model
- **Mortgage Direct License Program** (Oct 2025): Bypasses credit bureaus, projected $300M+ incremental revenue in CY2026, potentially +20-25% adjusted EPS growth in FY2026

**Key tension:** FICO's aggressive pricing is both its greatest strength (demonstrates pricing power/moat) and its greatest vulnerability (motivates lenders to adopt alternatives). Equifax publicly criticized the 2x price increase for 2026.

---

## 4. Open Banking & Alternative Data Adoption

### Market Size
- Global open banking market: $30.89B (2024) → $38.86B (2025) → projected $48B+ (2026); CAGR 24.8%
- 470M+ people worldwide using open banking services in 2025

### US Adoption
- 64% of US consumers aware of open banking (Q2 2025)
- 800M-900M alternative credit consumer reports pulled annually in US for underwriting
- Banks are the largest users of alternative credit data, followed by fintech lenders and BNPL providers

### Key Products Incorporating Alternative Data
| Provider | Product | Data Sources |
|----------|---------|-------------|
| FICO | UltraFICO | Bank accounts (via Plaid) |
| Experian | Credit + Cashflow | Traditional + alternative + trended + cashflow |
| VantageScore | 4plus | Credit report + open banking data |
| Nova Credit | Cash Atlas | Consumer-permissioned bank transaction data |
| Plaid | Various | Bank account data infrastructure |

### Adoption Reality Check
- Most institutions are still in **exploration and planning phases** of open finance
- Executive leadership broadly supportive but implementation lags
- ABA survey (2022): 78% of lenders cited **integration costs** as primary barrier to alternative scoring
- **Implication for FICO:** The slow pace of institutional adoption is a significant buffer. Even compelling alternatives face years of integration work

---

## 5. Regulatory Landscape

### CFPB Position (as of early 2025)

**Core stance:** "There is no 'advanced technology' exception to Federal consumer financial laws."

**Key regulatory requirements:**
1. **Adverse Action Notices:** Lenders using AI/ML must still provide specific, accurate reasons for credit denials — ECOA and Regulation B apply regardless of model complexity
2. **Black Box Prohibition:** CFPB has explicitly stated that algorithmic complexity does not exempt lenders from explainability requirements
3. **Less Discriminatory Alternatives (LDAs):** CFPB examiners actively search for LDAs to lenders' current models; lenders must demonstrate they've considered alternatives
4. **Fair Lending Testing:** Robust disparate impact and disparate treatment testing required for any AI/ML credit model
5. **Alternative Data Skepticism:** CFPB concerned that non-financial behavioral data may act as proxies for protected classes

**Winter 2025 Supervisory Highlights (Jan 17, 2025):**
- CFPB identified disparities in applicant outcomes from credit scoring models
- Financial institutions found lacking adequate compliance management systems for AI fair lending risks
- CFPB analysts themselves identified alternative models that reduced disparities while maintaining predictive performance

### Regulatory Implications for FICO vs. AI Competitors

| Factor | Impact on FICO | Impact on AI Challengers |
|--------|---------------|------------------------|
| Explainability requirements | **Favorable** — FICO scores are well-understood, transparent | **Unfavorable** — ML models face scrutiny |
| Fair lending testing | Neutral — FICO has decades of validation | **Unfavorable** — new models need extensive testing |
| LDA requirements | Slightly negative — pushes lenders to consider alternatives | Mixed — creates opening but also compliance burden |
| Alternative data skepticism | Slightly negative — limits UltraFICO expansion | **Unfavorable** — core value prop faces regulatory headwinds |
| GSE score requirements | **Strongly favorable** — mandated for conforming mortgages | **Unfavorable** — locked out of largest lending market |

### CFPB Leadership Uncertainty (2025-2026)

- Trump administration CFPB under Director Russell Vought/acting leadership has been less aggressive on AI regulation
- Potential rollback of some Biden-era guidance on AI in lending
- However, ECOA/Regulation B requirements are statutory, not regulatory — they persist regardless of administration

**Net assessment:** The regulatory environment is a **significant moat for FICO.** Explainability requirements make it risky for regulated lenders to rely solely on black-box AI models. FICO's decades of regulatory validation are extremely difficult to replicate.

---

## 6. Bank Adoption of Alternative Scoring

### Current State (as of early 2026)

**~90% of mortgage lenders still use FICO scores.** However, the landscape is shifting:

**GSE Market (Conforming Mortgages):**
- VantageScore 4.0 approved for Fannie Mae/Freddie Mac (July 2025, effective Nov 2025)
- FICO 10T expected to phase in during 2026
- Fannie Mae dropped minimum FICO score requirement (Nov 2025) — lenders can use broader data
- Lenders must choose one model per loan (cannot mix FICO and VantageScore on same loan)

**Consumer Lending (Personal Loans, Auto, Cards):**
- Upstart: 500+ bank/credit union partners using AI alongside FICO
- Pagaya: Major bank partners (Wells Fargo, TD, Citizens) using AI as second-look layer
- Zest AI: ~300 lenders, including Citi, using custom ML models
- **Gartner projection:** 60% of financial institutions will incorporate generative AI into credit decisioning by 2027

**VantageScore Traction:**
- 42B VantageScore credit scores used in 2024 (+55% YoY from 26.9B in 2023)
- Mortgage score usage up 74% YoY in H1 2025
- Owned by Equifax, Experian, TransUnion — bureaus have financial incentive to promote it over FICO

### Lenders That Have Publicly Reduced FICO Dependence

| Lender | Action | Status |
|--------|--------|--------|
| **Upstart-powered lenders** | Use FICO as one of 2,500+ variables, not primary decision factor | Active, 500+ partners |
| **Lending Club** | Relies less on FICO, uses proprietary ML models | Active |
| **Prosper** | Reduced FICO dependence through ML | Active |
| **SoFi** | Uses Nova Credit Cash Atlas for cash flow underwriting | Active |
| **Chase** | Deploying Nova Credit Cash Atlas | In deployment |
| **PayPal** | Deploying Nova Credit Cash Atlas | In deployment |
| **Fannie Mae** | Dropped minimum FICO requirement | Effective Nov 2025 |

**Critical nuance:** Even lenders that have "reduced FICO dependence" typically still **pull FICO scores.** They use them as one input among many rather than as a sole decision criterion. Very few lenders have completely eliminated FICO from their workflows.

---

## 7. The "FICO as Input to AI" Dynamic

This is the most important structural question for FICO's moat thesis.

### Three Models of AI-FICO Interaction

**Model A: FICO as Foundation (Complement)**
- AI models use FICO as a primary input, adding alternative data for incremental lift
- FICO remains embedded; AI adds value on top
- Example: Traditional banks adding cash flow data to FICO-based underwriting
- **Implication for FICO:** Pricing power preserved; volumes may increase as credit box expands

**Model B: FICO as One Variable (Dilution)**
- AI models ingest FICO alongside hundreds/thousands of other variables
- FICO's relative weight in the decision diminishes
- Example: Upstart's 2,500-variable model where FICO is one input
- **Implication for FICO:** Volume preserved (score still pulled) but perceived importance declines; long-term pricing power at risk

**Model C: FICO Bypass (Substitution)**
- AI models make credit decisions without pulling FICO scores at all
- Uses only alternative data (cash flow, behavioral, transactional)
- Example: Some emerging market lenders; experimental programs in US
- **Implication for FICO:** Direct volume and revenue loss

### Current Market Reality

**Model B is dominant.** Most AI-enabled lenders still pull FICO scores but use them as one of many inputs. Model C is extremely rare in US regulated lending due to:
1. Regulatory requirements (GSE mandates, examiner expectations)
2. Lender risk management (FICO provides a "safe harbor" baseline)
3. Secondary market requirements (loan buyers/securitizers want FICO scores)
4. Consumer expectations (borrowers know their FICO scores)

**The paradox:** AI may simultaneously *increase* FICO pull volumes (by expanding the credit box to more applicants) while *decreasing* FICO's perceived indispensability. This creates a window where FICO revenues grow even as its competitive moat slowly erodes.

---

## 8. Threat Assessment Matrix

| Threat Vector | Severity (1-10) | Timeline | FICO's Defense |
|---------------|-----------------|----------|----------------|
| **VantageScore in mortgages** | 7 | 2025-2028 | FICO 10T upgrade; pricing flexibility; decades of lender familiarity |
| **AI credit models (Upstart/Pagaya)** | 4 | 2025-2030 | Most use FICO as input; Platform strategy; Responsible AI positioning |
| **Cash flow underwriting (Nova Credit)** | 5 | 2026-2030 | UltraFICO + Plaid partnership |
| **Open banking data** | 4 | 2027-2032 | UltraFICO; slow institutional adoption |
| **Regulatory mandated competition** | 6 | 2025-2027 | Lobbying; long GSE transition timelines |
| **Pricing backlash** | 7 | 2025-2026 | Direct license program; performance pricing model |
| **Bureau-driven substitution** | 6 | 2025-2028 | Bureaus need FICO for revenue too; mutual dependence |
| **Fintech/BNPL bypassing FICO** | 3 | 2025-2030 | Regulatory requirements limit pure bypass |

### Composite Assessment

**Near-term (2025-2027):** The biggest threats are VantageScore's GSE approval and FICO's own pricing aggression creating political/regulatory backlash. AI is not yet a direct threat.

**Medium-term (2027-2030):** If AI models prove their performance in regulated lending, the "FICO as one variable" model could erode pricing power. Open banking data becomes more accessible.

**Long-term (2030+):** If a critical mass of lenders successfully underwrites using AI + alternative data without FICO, the institutional embedding could crack. But this requires regulatory change, lender behavior change, and secondary market acceptance — all slow-moving.

---

## 9. Key Questions for Deep Dive Phase

1. **What percentage of FICO's Scores segment revenue comes from mortgage vs. non-mortgage?** Mortgage is where VantageScore poses the most direct threat.

2. **How sticky is FICO in auto lending and credit cards?** These segments may be less protected by regulatory mandates.

3. **What is the actual FICO score pull volume trend?** If volumes are growing even as AI adoption grows, the "complement not substitute" thesis holds.

4. **How does the FICO Platform (software) revenue compare to Scores revenue?** If Platform is growing faster, FICO may be successfully pivoting from score dependency.

5. **What is FICO's actual market share in non-mortgage consumer lending?** The 90% figure is mortgage-specific; non-mortgage penetration may be lower and more vulnerable.

6. **How will the Equifax-FICO relationship evolve?** Equifax publicly criticized FICO's pricing and promotes VantageScore — this bureau conflict is a key dynamic.

7. **What is Upstart's actual FICO score pull rate?** If Upstart pulls FICO for every application but weights it minimally, FICO's volume is safe even if its influence declines.

---

## 10. Preliminary Conclusion

**AI credit scoring is a real but slow-moving threat to FICO.** The institutional embedding is deep:
- Regulatory mandates in mortgage lending
- Secondary market expectations
- Decades of lender familiarity and validation
- Consumer awareness of FICO scores

The dominant dynamic today is **AI complementing FICO, not replacing it.** Most AI lenders still pull FICO scores. The more immediate threats are:
1. **VantageScore** gaining GSE-approved market access
2. **FICO's own pricing aggression** motivating lenders to seek alternatives
3. **Bureau incentives** to promote VantageScore (owned by bureaus) over FICO

The AI disruption narrative is real in the long run but is currently overstated as a near-term threat to FICO's business model. FICO's own AI/Platform strategy provides a credible hedge. The biggest risk is not that AI replaces FICO but that AI + VantageScore + open banking together create enough optionality for lenders to resist FICO's pricing power.

---

## Sources

- [Top AI Credit Scoring Startups 2025 | Guru Startups](https://www.gurustartups.com/reports/top-ai-credit-scoring-startups-2025)
- [FICO Score Research: Explainable AI for Credit Scoring](https://www.fico.com/blogs/fico-score-research-explainable-ai-credit-scoring)
- [Evolving Landscape of Machine Learning Relative to the FICO Score](https://www.fico.com/blogs/evolving-landscape-machine-learning-relative-fico-score)
- [Credit Scoring, FinTech, and Consumer Loans: Why AI Scoring Models Do Not Replace the FICO Score](https://www.fico.com/en/latest-thinking/white-paper/credit-scoring-fintech-and-consumer-loans-why-ai-scoring-models-do-not-replace-fico-score)
- [FICO's Strategic Shift and Regulatory Onslaught Reshape the Credit-Score Landscape](https://markets.financialcontent.com/wral/article/marketminute-2025-10-2-ficos-strategic-shift-and-regulatory-onslaught-reshape-the-credit-score-landscape)
- [CFPB Issues Guidance on Credit Denials by Lenders Using AI](https://www.consumerfinance.gov/about-us/newsroom/cfpb-issues-guidance-on-credit-denials-by-lenders-using-artificial-intelligence/)
- [CFPB Examinations Highlight Fair Lending Risks in Credit Scoring Models](https://www.financialservicesperspectives.com/2025/01/cfpb-examinations-highlight-fair-lending-risks-in-credit-scoring-models/)
- [FICO Scores Come Under Scrutiny and Lenders Eye New Ways to Assess Risk](https://www.pymnts.com/news/alternative-financial-services/2025/rise-alternative-data-credit-scoring-pressures-fico/)
- [AI Rewrites Lending for Borrowers FICO Scores Miss](https://www.pymnts.com/consumer-finance/2026/ai-rewrites-lending-for-borrowers-fico-scores-miss/)
- [VantageScore Adoption Surges](https://vantagescore.com/resources/knowledge-center/press-releases/vantagescore-adoption-surges-lenders-flock-to-superior-predictive-capabilities-powered-by-trended-alternative-data)
- [VantageScore 4.0 Allowed for Use on All Fannie Mae and Freddie Mac Mortgages](https://vantagescore.com/resources/knowledge-center/press_releases/vantagescore-4-0-allowed-for-use-on-all-fannie-mae-and-freddie-mac-mortgages-effective-immediately)
- [The FICO Monopoly Fractures: Regulatory Shift and Market Volatility](https://markets.financialcontent.com/stocks/article/marketminute-2026-1-2-the-fico-monopoly-fractures-regulatory-shift-and-market-volatility-reshape-mortgage-lending)
- [Fannie Mae Drops Minimum FICO Score Requirement](https://www.mortgage-underwriters.org/mortgage-underwriting-news/2025/11/11/fannie-mae-drops-minimum-fico-score-requirement-reshaping-credit-standard)
- [FHFA Nearing Deal to Use New FICO Credit Scoring Model](https://bankingjournal.aba.com/2025/11/fhfa-nearing-deal-to-use-new-fico-credit-scoring-model-for-mortgages/)
- [Equifax Statement on FICO 2X Price Increase for 2026](https://www.equifax.com/newsroom/all-news/-/story/equifax-statement-on-fico-2x-price-increase-for-2026-and-mortgage-direct-license-program/)
- [Credit Report Costs for Mortgage Lenders to Rise 50% in 2026](https://www.housingwire.com/articles/mortgage-credit-report-costs-2026/)
- [FICO Confirms Price Crank for 2025](https://www.nationalmortgagenews.com/news/fico-confirms-price-crank-for-2025)
- [FICO Raises Score Price to $4.95](https://www.housingwire.com/articles/its-official-fico-raises-score-price-for-mortgage-firms-to-4-95/)
- [Nova Credit Raises $35M Series D](https://www.morningstar.com/news/business-wire/20251014703778/nova-credit-raises-35m-series-d-to-accelerate-cash-flow-underwriting-revolution)
- [Nova Credit Featured in Forbes Fintech 50](https://www.novacredit.com/corporate-blog/nova-credit-featured-in-forbes-fintech-50-2025)
- [Pagaya Reports Q3 2025 Results](https://investor.pagaya.com/news-releases/news-release-details/pagaya-reports-third-quarter-and-nine-months-ended-2025-results)
- [Pagaya 2026 Revenue Guidance $1.4B-$1.575B](https://seekingalpha.com/news/4549102-pagaya-outlines-1_4b-1_575b-2026-revenue-guidance-as-it-shifts-focus-to-risk-management-and)
- [Upstart's AI Credit Risk Modeling](https://reruption.com/en/knowledge/industry-cases/upstarts-ai-credit-risk-modeling-revolutionizes-lending)
- [Zest AI Secures Strategic Investment](https://www.businesswire.com/news/home/20251104031058/en/Zest-AI-Secures-Strategic-Investment-from-Customers-in-Oversubscribed-Round)
- [CU Lending Collective Launch](https://www.businesswire.com/news/home/20260211182497/en/Commonwealth-Credit-Union-and-Zest-AI-Partner-to-Launch-CU-Lending-Collective-to-Bring-AI-Powered-Lending-to-Small-Credit-Unions)
- [FICO Recognized as Leader in 2025 AI Decisioning Platforms](https://investors.fico.com/news-releases/news-release-details/fico-recognized-leader-2025-ai-decisioning-platforms-report)
- [Open Banking Adoption Statistics 2026](https://sqmagazine.co.uk/open-banking-adoption-statistics/)
- [How Alternative Consumer Credit Data Supports Lending Decisions](https://thefinancialbrand.com/news/loan-growth/how-alternative-consumer-credit-data-increasingly-supports-lending-decisions-175018)
- [Evaluating AI-driven Credit Scoring vs Traditional Techniques (Springer 2025)](https://link.springer.com/article/10.1007/s44163-025-00772-1)
- [AI-Enabled Credit Scoring and Financial Inclusion (MIS Quarterly)](https://misq.umn.edu/misq/article/48/4/1803/2314/The-Effect-of-AI-Enabled-Credit-Scoring-on)
- [How AI is Strengthening Fair Lending Compliance in 2026](https://www.trysalient.com/resources/how-ai-is-strengthening-fair-lending-compliance-in-2026)
