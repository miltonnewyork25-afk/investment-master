# PANW Financial Deep Dive & Unit Economics Research

> **Data Sources**: PANW 10-K/10-Q filings, FMP API, earnings press releases (Q4 FY2025 Jul 2025, Q1 FY2026 Nov 2025, Q2 FY2026 Feb 2026), investor presentations, SEC filings
> **Fiscal Year**: Ends July 31. FY2026 = Aug 2025 - Jul 2026
> **Last Updated**: 2026-03-31
> **Note**: PANW's fiscal year ends July 31. "FY2025" = Aug 2024 - Jul 2025. Current reporting period is FY2026 (through Q2, ended Jan 31, 2026).

---

## 1. Revenue Breakdown by Segment

### 1.1 Product vs Subscription & Support Revenue

PANW reports revenue in two categories: (1) Product revenue (hardware appliances) and (2) Subscription & Support revenue (cloud-delivered security subscriptions + maintenance/support).

#### Annual Revenue Mix (FY2020-FY2025)

| Fiscal Year | Total Revenue | Product | Sub & Support | Product % | Sub & Support % | YoY Growth |
|-------------|--------------|---------|---------------|-----------|-----------------|------------|
| FY2020 | $3,408M | ~$803M | ~$2,605M | ~23.6% | ~76.4% | — |
| FY2021 | $4,256M | ~$831M | ~$3,425M | ~19.5% | ~80.5% | +24.9% |
| FY2022 | $5,502M | ~$1,060M | ~$4,441M | ~19.3% | ~80.7% | +29.3% |
| FY2023 | $6,893M | ~$1,363M | ~$5,530M | ~19.8% | ~80.2% | +25.3% |
| FY2024 | $8,028M | ~$1,607M | ~$6,421M | ~20.0% | ~80.0% | +16.5% |
| FY2025 | $9,222M | $1,802M | $7,420M | 19.5% | 80.5% | +14.9% |

**Key Trend**: Subscription & Support consistently ~80% of revenue. Product revenue has been growing but mix remains stable. The subscription shift happened pre-FY2020; current evolution is within subscriptions (legacy to NGS).

#### Quarterly Revenue Breakdown (Recent Quarters)

| Quarter | Total Revenue | Product | Sub & Support | YoY Growth |
|---------|--------------|---------|---------------|------------|
| Q1 FY2025 (Oct 2024) | $2,139M | $286M (13.4%) | $1,853M (86.6%) | +14% |
| Q2 FY2025 (Jan 2025) | $2,257M | $600M* | $1,658M* | +14% |
| Q3 FY2025 (Apr 2025) | $2,289M | $340M* | $1,949M* | +15% |
| Q4 FY2025 (Jul 2025) | $2,536M | $574M | $1,962M | +16% |
| **Q1 FY2026 (Oct 2025)** | **$2,474M** | **$434M** | **$2,040M** | **+16%** |
| **Q2 FY2026 (Jan 2026)** | **$2,594M** | **$514M** | **$2,080M** | **+15%** |

*Note: Some quarterly product/sub breakdowns are estimated from limited disclosures. Q4 FY2025, Q1/Q2 FY2026 are from press releases.

**Q2 FY2025 Segment Growth**: Product +8% YoY, Subscription +20% YoY, Support +8% YoY.
**Q4 FY2025 Segment Growth**: Product +19% YoY, Subscription & Support +15% YoY.

#### More Granular: FY2025 Full Year Sub-Segment

| Sub-Segment | FY2025 Revenue | % of Total | Est. YoY Growth |
|-------------|---------------|------------|-----------------|
| Product | $1,802M | 19.5% | +12% |
| Subscription | ~$4,970M | ~53.9% | ~+18-20% |
| Support/Maintenance | ~$2,450M | ~26.6% | ~+8% |

**Interpretation**: Subscription is the growth engine (~54% of revenue, growing ~20%). Support is steady but slower (legacy maintenance contracts). Product is lumpy, driven by hardware refresh cycles.

---

### 1.2 Next-Generation Security (NGS) ARR

NGS ARR is PANW's key forward indicator, measuring annualized recurring revenue from Prisma Cloud, Cortex (XSIAM/XDR/XSOAR), and cloud-delivered security subscriptions attached to firewalls (not the firewall hardware itself).

#### NGS ARR Quarterly Progression

| Quarter | NGS ARR | YoY Growth | QoQ Add |
|---------|---------|------------|---------|
| Q4 FY2022 (Jul 2022) | $2.10B | ~60% | — |
| Q4 FY2023 (Jul 2023) | $2.95B | ~40% | — |
| Q1 FY2024 (Oct 2023) | $3.20B | ~52% | +$250M |
| Q2 FY2024 (Jan 2024) | $3.39B | ~48% | +$190M |
| Q3 FY2024 (Apr 2024) | $3.77B | +47% | +$380M |
| Q4 FY2024 (Jul 2024) | $4.22B | +43% | +$450M |
| Q1 FY2025 (Oct 2024) | $4.52B | +40% | +$300M |
| Q2 FY2025 (Jan 2025) | $4.78B | +37% | +$260M |
| Q3 FY2025 (Apr 2025) | $5.09B | +34% | +$310M |
| Q4 FY2025 (Jul 2025) | $5.58B | +32% | +$490M |
| **Q1 FY2026 (Oct 2025)** | **$5.9B** | **+29%** | **+$320M** |
| **Q2 FY2026 (Jan 2026)** | **$6.3B** | **+33%** | **+$400M** |

**FY2026 Full Year Guidance**: $8.52B-$8.62B NGS ARR (+53-54% YoY)
**Q3 FY2026 Guidance**: $7.94B-$7.96B NGS ARR (+56% YoY)

**Critical Note on FY2026 NGS ARR Jump**: The massive acceleration from +29-33% organic to guided +53-54% is driven by the **CyberArk acquisition** (closed Feb 11, 2026). CyberArk had ~$1B+ ARR at closing. Q3 FY2026 will be the first full quarter including CyberArk, explaining the +56% guided growth.

**Milestone Progression**:
- $1B: ~Q4 FY2021
- $2B: ~Q4 FY2022
- $3B: ~Q1 FY2024
- $4B: ~Q3 FY2024
- $5B: Q3 FY2025 (crossed $5B milestone)
- $6B: Q2 FY2026

---

### 1.3 Remaining Performance Obligations (RPO)

RPO = contracted but not yet recognized revenue. Indicates future revenue visibility.

#### RPO History

| Quarter | Total RPO | YoY Growth | Current RPO | Non-Current RPO |
|---------|-----------|------------|-------------|-----------------|
| Q4 FY2023 (Jul 2023) | $10.6B | — | — | — |
| Q4 FY2024 (Jul 2024) | $12.7B | ~+20% | — | — |
| Q1 FY2025 (Oct 2024) | $12.6B | +20% | — | — |
| Q2 FY2025 (Jan 2025) | $13.0B | ~+20% | — | — |
| Q4 FY2025 (Jul 2025) | $15.8B | +24% | — | — |
| **Q1 FY2026 (Oct 2025)** | **$15.5B** | **+24%** | **$6,132M** | **$6,098M** |
| **Q2 FY2026 (Jan 2026)** | **$16.0B** | **+23%** | **$6,248M** | **$6,181M** |

**FY2026 Full Year Guidance**: $20.2B-$20.3B RPO (+28% YoY)
**Q3 FY2026 Guidance**: $17.85B-$17.95B RPO (+32-33% YoY)

**Note**: The acceleration to +28% full year (vs Q2 at +23%) reflects CyberArk RPO contribution.

**Current RPO**: ~$6.2B as of Jan 2026. Current RPO is the portion expected to be recognized as revenue within the next 12 months.

---

### 1.4 Billing vs Revenue Growth Divergence

PANW deprecated the billings metric starting FY2025, emphasizing RPO and NGS ARR instead. Historically:

- **Billings > Revenue** was common during high-growth periods because multi-year contracts were billed upfront but recognized over time.
- **FY2024 Billings Growth**: Slowed dramatically due to the "platformization" strategy pivot -- PANW began offering free trial periods and delayed billing to win platform consolidation deals. This caused a billings growth scare in Feb 2024 (stock dropped ~20% on guidance).
- **Revenue < Billings < RPO growth** historically, but management argued RPO and NGS ARR are better indicators of business momentum than billings, which are distorted by contract timing/billing frequency changes.
- **FY2025 pivot**: PANW stopped providing billings guidance. RPO growth (+24%) > Revenue growth (+15%) confirmed that contracted business momentum exceeds recognized revenue.

---

## 2. Unit Economics / SaaS Metrics

### 2.1 Net Revenue Retention Rate (NRR)

PANW does not formally disclose a company-wide NRR. Available data points:

| Metric | Value | Period | Source |
|--------|-------|--------|--------|
| Platform customer NRR | ~120% | Q4 FY2025 | Earnings call |
| Platform customer NRR | ~125% | Q2 FY2025 | Earnings call |
| Platform customer NRR | ~119% | Q2 FY2026 | Earnings call |
| Platform customer churn | Low single-digit % | FY2025-FY2026 | Management commentary |
| Overall estimated NRR | ~115-120% | Industry estimates | Analyst estimates |

**Interpretation**: Platform customers (those who consolidated to PANW's integrated platform) show ~119-125% NRR with very low churn. Non-platform legacy customers likely have lower NRR. The company-wide blended NRR is probably ~115-120%, which is strong for a security company of this scale. The slight NRR decline from 125% to 119% is likely mix-driven as the platform customer base scales (newer, smaller customers diluting the cohort average).

### 2.2 Customer Count Trends

| Metric | Value | Period |
|--------|-------|--------|
| Total customers | 70,000+ organizations | FY2025 (Jul 2025) |
| Platform ("platformized") customers | 1,550+ | Q2 FY2026 (Jan 2026) |
| Platformized customer YoY growth | +35% | Q2 FY2026 vs Q2 FY2025 |
| Net new platform customers (Q2 FY2026) | ~110 | Q2 FY2026 |
| Customers with >$5M NGS ARR | 169 | Q2 FY2026 (+54% YoY) |
| Customers with >$10M NGS ARR | 55 | Q2 FY2026 (+49% YoY) |
| Platform deals in top 5,000 customers | 1,150 | Cumulative as of Q2 FY2026 |
| XSIAM customers | ~400 | Q2 FY2026 |
| XSIAM average ARR | >$1M | Q2 FY2026 |
| $10M+ transactions YoY growth | +52% | Q2 FY2026 |

**Key Insight**: Only ~1,550 of 70,000+ customers are fully "platformized" -- this is ~2.2% penetration. The massive white space within the existing customer base is the core land-and-expand thesis. Even within the top 5,000 accounts, only 1,150 platform deals have been closed (~23% penetration).

### 2.3 Land and Expand Motion

**Land**: PANW typically lands with one product pillar:
- **Network Security** (Strata): Next-gen firewalls (hardware or virtual), then attach cloud-delivered subscriptions (Threat Prevention, WildFire, DNS Security, URL Filtering, etc.)
- **Cloud Security** (Prisma Cloud): CNAPP for cloud-native environments
- **Security Operations** (Cortex): XSIAM (AI-driven SOC), XDR, XSOAR

**Expand**: The "platformization" strategy drives cross-pillar expansion:
1. Customer starts with 1 pillar (e.g., Network Security firewall)
2. PANW offers free/trial periods on adjacent products (e.g., Prisma Access SASE)
3. Customer consolidates point-product spending from competitors onto PANW platform
4. Cross-sell to 2nd and 3rd pillars (Network -> Cloud -> Cortex, or any direction)

**Platformization metrics**:
- Platform deal sizes are 5-10x larger than single-product deals
- Platform customers have 119-125% NRR vs estimated ~110% for non-platform
- Platform customers have "low single-digit" churn vs higher churn for standalone product customers
- Average platform customer uses 3+ products across 2+ pillars

### 2.4 Average Deal Size Trends

| Metric | Value | Trend |
|--------|-------|-------|
| $10M+ deals growth | +52% YoY | Q2 FY2026 |
| $5M+ NGS ARR customers | 169 (+54% YoY) | Growing rapidly |
| $10M+ NGS ARR customers | 55 (+49% YoY) | Growing rapidly |
| XSIAM average deal | >$1M ARR | Large ACV product |
| Overall NGS ARR / platform customers | ~$4.1M ($6.3B / 1,550) | Rough average |

**Deal size is clearly expanding**: The growth in $5M+ and $10M+ customer cohorts (49-54% YoY) far exceeds total customer growth, confirming the land-and-expand motion is working. XSIAM at >$1M average ARR with ~400 customers represents a high-ACV product line.

### 2.5 S&M Efficiency / Magic Number

#### S&M Spend History

| Fiscal Year | Revenue | S&M Expense | S&M % of Revenue | YoY Rev Growth |
|-------------|---------|-------------|-------------------|----------------|
| FY2020 | $3,408M | $1,520M | 44.6% | — |
| FY2021 | $4,256M | $1,754M | 41.2% | +24.9% |
| FY2022 | $5,502M | $2,149M | 39.1% | +29.3% |
| FY2023 | $6,893M | $2,544M | 36.9% | +25.3% |
| FY2024 | $8,028M | $2,795M | 34.8% | +16.5% |
| FY2025 | $9,222M | $3,100M | 33.6% | +14.9% |

*Note: S&M includes SBC allocated to S&M. The SGA figures from FMP include G&A. The S&M-only figures above are from income statements.

#### Magic Number Calculation

Magic Number = (Current Quarter Revenue - Prior Year Quarter Revenue) * 4 / Prior Year S&M Spend

**Using Q2 FY2026 data**:
- Q2 FY2026 Revenue: $2,594M
- Q2 FY2025 Revenue: $2,257M
- Delta: $337M
- Annualized delta: $1,348M
- FY2025 S&M: $3,100M
- **Magic Number: ~0.43**

**Using FY2025 annual data**:
- FY2025 Revenue: $9,222M
- FY2024 Revenue: $8,028M
- Net new revenue: $1,194M
- FY2024 S&M: $2,795M
- **Magic Number: ~0.43**

**Interpretation**: A Magic Number of 0.43 is below the typical SaaS benchmark of 0.75-1.0x for efficient growth. However, this is misleading for PANW because:
1. PANW's revenue includes a large installed base with long contract durations -- not all "new" revenue comes from S&M spend
2. The platformization strategy deliberately sacrifices near-term billings (free trials) for higher long-term ARR
3. A better efficiency metric is NGS ARR growth per S&M dollar
4. NGS ARR grew ~$1.8B in FY2025 on $3.1B S&M = 0.58x NGS ARR Magic Number, which is better
5. SBC inflates the S&M denominator; on a cash basis the ratio improves

---

## 3. Margin Trajectory

### 3.1 GAAP vs Non-GAAP Operating Margin (FY2020-FY2026)

| Fiscal Year | GAAP OPM | Non-GAAP OPM | Delta (SBC + Amort) | Revenue |
|-------------|----------|--------------|---------------------|---------|
| FY2020 | -5.3% | ~17% | ~22 pts | $3,408M |
| FY2021 | -7.1% | ~18% | ~25 pts | $4,256M |
| FY2022 | -3.4% | ~22% | ~25 pts | $5,502M |
| FY2023 | +5.6% | ~23% | ~17 pts | $6,893M |
| FY2024 | +8.5% | ~27% | ~18.5 pts | $8,028M |
| FY2025 | +13.5% | ~29.5% | ~16 pts | $9,222M |
| **FY2026E** | ~15-16%E | **28.5-29.0%** (guided) | ~13 pts | ~$11.3B |

**Key Observations**:
- GAAP operating margin turned positive in FY2023 and has been expanding rapidly
- Non-GAAP OPM has been steadily expanding from ~17% to ~30%
- The GAAP-to-non-GAAP gap has been narrowing (from ~25pts to ~13pts), reflecting SBC growing slower than revenue
- FY2026 non-GAAP OPM guidance of 28.5-29.0% is slightly below FY2025's ~29.5% -- this reflects CyberArk integration costs and acquisition-related amortization

#### Quarterly Non-GAAP OPM Trend (Recent)

| Quarter | Non-GAAP OPM | GAAP OPM |
|---------|-------------|----------|
| Q1 FY2025 | ~29.5% | 13.4% |
| Q2 FY2025 | ~28.3% | 10.6% |
| Q3 FY2025 | ~28.5% | 9.6% |
| Q4 FY2025 | ~30.3% | 19.6% |
| **Q1 FY2026** | **30.2%** | **12.5%** |
| **Q2 FY2026** | **30.3%** | **15.3%** |

**Trend**: Non-GAAP OPM stabilizing at ~30%+ for three consecutive quarters. GAAP OPM volatile due to SBC timing and acquisition-related charges.

### 3.2 SBC as % of Revenue

| Fiscal Year | SBC ($M) | Revenue ($M) | SBC/Revenue | YoY SBC Growth |
|-------------|----------|-------------|-------------|----------------|
| FY2020 | $658M | $3,408M | 19.3% | — |
| FY2021 | $895M | $4,256M | 21.0% | +36% |
| FY2022 | $1,011M | $5,502M | 18.4% | +13% |
| FY2023 | $1,075M | $6,893M | 15.6% | +6% |
| FY2024 | $1,075M | $8,028M | 13.4% | +0% |
| FY2025 | $1,295M* | $9,222M | 14.0% | +20% |
| FY2026 H1 | $708M (2 qtrs) | $5,068M | 14.0% | — |

*FMP reports $1,295M for FY2025 SBC; PANW press release reports $1,386M (includes acquisition-related SBC). Using FMP's $1,295M for consistency.

**Key Insight**: SBC/Revenue peaked at ~21% in FY2021 and has come down to ~14%. However, FY2025 saw SBC reaccelerate (+20% YoY) due to retention-related grants and acquisition integration. The absolute dollar growth matters: SBC went from $658M to $1,295M (nearly doubled) while revenue went from $3.4B to $9.2B (nearly tripled). SBC is growing, but slower than revenue -- the ratio is compressing.

**Q1 FY2026 SBC**: $387M (15.6% of Q1 revenue)
**Q2 FY2026 SBC**: $321M (12.4% of Q2 revenue)

### 3.3 Path to GAAP Profitability

| Milestone | Achieved |
|-----------|----------|
| First GAAP Net Income positive quarter | Q1 FY2024 (Oct 2023) |
| First GAAP Operating Income positive FY | FY2023 (+$387M) |
| First GAAP Net Income positive FY | FY2023 (+$440M) |
| GAAP OPM > 10% | FY2025 (13.5%) |
| GAAP OPM > 15% sustained | Not yet (Q2 FY2026 at 15.3%) |

**FY2024 GAAP NI anomaly**: $2,578M due to a one-time $1,589M deferred tax benefit (tax asset recognition). Adjusted for this, underlying GAAP NI was ~$988M.

### 3.4 Free Cash Flow Margin

| Fiscal Year | OCF ($M) | CapEx ($M) | FCF ($M) | FCF Margin | Revenue |
|-------------|----------|-----------|----------|------------|---------|
| FY2020 | $1,036M | $214M | $821M | 24.1% | $3,408M |
| FY2021 | $1,503M | $116M | $1,387M | 32.6% | $4,256M |
| FY2022 | $1,985M | $193M | $1,792M | 32.6% | $5,502M |
| FY2023 | $2,778M | $146M | $2,631M | 38.2% | $6,893M |
| FY2024 | $3,258M | $157M | $3,101M | 38.6% | $8,028M |
| FY2025 | $3,716M | $246M | $3,470M | 37.6% | $9,222M |

**FY2026 Guided FCF Margin**: 37% (adjusted)
**Long-term Target**: 40% adjusted FCF margin by FY2028

**Key Observations**:
- FCF margin expanded from 24% to 38-39% over 5 years -- exceptional
- FCF conversion is extremely high: FCF/Net Income = 3.2x (FY2025 TTM) due to heavy deferred revenue tailwind
- CapEx is very light (<3% of revenue) -- asset-light software/subscription model
- FY2025 FCF of $3.47B on $9.22B revenue implies the business generates massive cash despite heavy SBC
- **Owner FCF** (FCF minus SBC): $3,470M - $1,295M = $2,175M = 23.6% margin -- still strong
- FY2026 slight FCF margin dip to 37% reflects acquisition-related cash costs (CyberArk deal fees, integration)

---

## 4. Capital Allocation

### 4.1 Share Buyback History

| Period | Repurchase Amount | Shares Repurchased | Avg Price |
|--------|------------------|--------------------|-----------|
| FY2020 | $1,198M | — | — |
| FY2021 | $1,178M | — | — |
| FY2022 | $892M | — | — |
| FY2023 | $273M | — | — |
| FY2024 | $567M | — | — |
| FY2025 | ~$0 (net issuance of $371M) | — | Stock used for convert settlement |
| Feb 2026 (post-Q2) | $1,000M | ~6.8M shares | ~$147.69/share |

**Buyback Authorization History**:
- Original program: $4.1B authorized (Feb 2019, extended multiple times)
- Fully utilized by March 2026: $0 remaining as of Mar 6, 2026
- **New authorization**: Additional $1.0B approved Mar 10, 2026 (expires Dec 31, 2026)

**Net Share Count Trajectory**:

| Period | Diluted Shares Outstanding | YoY Change |
|--------|---------------------------|------------|
| FY2020 | 581M (GAAP loss, basic=diluted) | — |
| FY2021 | 578M (GAAP loss, basic=diluted) | -0.5% |
| FY2022 | 591M (GAAP loss, basic=diluted) | +2.2% |
| FY2023 | 685M | +15.9%* |
| FY2024 | 708M | +3.4% |
| FY2025 | 709M | +0.1% |
| Q2 FY2026 | 713M (diluted) / 695M (basic) | +0.6% |

*The jump from 591M to 685M in FY2023 reflects the dilutive impact of convertible notes becoming in-the-money (not actual new issuance but accounting dilution on diluted share count).

**Assessment**: Despite ~$5B+ in cumulative buybacks (FY2019-FY2026), share count has *increased* due to SBC dilution and convertible note dilution. Buybacks have been defensive (offsetting dilution) rather than accretive. The Feb 2026 $1B repurchase was the most aggressive recent action.

### 4.2 M&A Strategy

PANW has been an aggressive acquirer, pursuing a platform consolidation strategy:

#### Major Acquisitions (2023-2026)

| Target | Date Closed | Price | Strategic Rationale |
|--------|------------|-------|---------------------|
| **Dig Security** | Oct 2023 | ~$400M | Data Security Posture Management (DSPM) for cloud |
| **Talon Cyber Security** | Dec 2023 | ~$625M | Enterprise browser for SASE |
| **IBM QRadar SaaS** | Aug 2024 | Undisclosed | SIEM/SOC migration to Cortex XSIAM; IBM partnership |
| **CyberArk** | Feb 11, 2026 | ~$25B (equity) | Identity security leader; 4th platform pillar |

**CyberArk Deal Details**:
- Structure: $45 cash + 2.2005 PANW shares per CyberArk share
- 26% premium to 10-day VWAP as of Jul 25, 2025
- CyberArk had ~$1B+ ARR, strong identity security franchise
- Adds identity security as a 4th major platform pillar
- CyberArk's 0.00% convertible notes due 2030: $1,097.5M outstanding post-merger
- Significantly expands TAM into identity security market

**Earlier Notable Acquisitions**:
- Demisto (2019, ~$560M) -- SOAR platform, became Cortex XSOAR
- CloudGenix (2020, ~$420M) -- SD-WAN for Prisma SASE
- Bridgecrew (2021, ~$200M) -- Infrastructure-as-code security
- Cider Security (2022, ~$195M) -- Application security supply chain

**M&A Philosophy**: PANW acquires best-of-breed point products and integrates them into its platform pillars. This fuels the platformization strategy by expanding the product surface area that customers can consolidate onto.

### 4.3 Convertible Notes History

| Issuance | Amount | Coupon | Maturity | Status |
|----------|--------|--------|----------|--------|
| Jun 2020 (0.375% Notes) | $1.75B | 0.375% | Jun 1, 2025 | **Matured/settled FY2025** |
| CyberArk 0.00% Notes (assumed) | $1.15B original | 0.00% | 2030 | $1,097.5M outstanding (post-conversion) |

**Dilution Impact of 2020 Convert**:
- At issuance, PANW entered into capped call hedge transactions to offset dilution
- The notes matured in June 2025; settlement was a combination of cash (for principal) and shares (for excess value)
- FY2025 showed net stock issuance of $371M (rather than repurchase), reflecting the convert settlement
- The capped call mitigated some dilution, but the dilutive impact was visible in the FY2023 jump in diluted share count (591M -> 685M)
- Post-maturity, this overhang is removed

**CyberArk Convert**: The assumed CyberArk 0.00% convertible notes ($1,097.5M outstanding) represent a new dilution vector. However, PANW is managing this via an offer to purchase/convert, with $152.5M already converted.

---

## 5. Management Guidance FY2026

### 5.1 Current FY2026 Guidance (As of Q2 FY2026, Feb 2026)

| Metric | FY2026 Guidance | YoY Growth | Prior Guidance (Initial, Aug 2025) |
|--------|----------------|------------|-----------------------------------|
| Revenue | $11.28B-$11.31B | +22-23% | $10.475B-$10.525B (+14%) |
| NGS ARR | $8.52B-$8.62B | +53-54% | $7.00B-$7.10B (+26-27%) |
| RPO | $20.2B-$20.3B | +28% | $18.6B-$18.7B (+17-18%) |
| Non-GAAP OPM | 28.5-29.0% | — | 29.2-29.7% |
| Non-GAAP EPS | $3.65-$3.70 | — | $3.75-$3.85 |
| Adj. FCF Margin | 37% | — | 38-39% |
| Diluted Shares | 768M-773M | — | ~710M |

**Note on Guidance Changes**: Revenue, NGS ARR, and RPO guidance all raised significantly (reflecting CyberArk contribution). However, Non-GAAP OPM, EPS, and FCF margin guidance were all *lowered*, reflecting:
1. CyberArk acquisition integration costs
2. Higher share count (dilution from deal consideration: +60M+ shares)
3. Purchase accounting amortization (not in non-GAAP but affects FCF timing)

### 5.2 Q3 FY2026 Guidance (Next Quarter)

| Metric | Q3 FY2026 Guidance | YoY Growth |
|--------|-------------------|------------|
| Revenue | $2.941B-$2.945B | +28-29% |
| NGS ARR | $7.94B-$7.96B | +56% |
| RPO | $17.85B-$17.95B | +32-33% |
| Non-GAAP EPS | $0.78-$0.80 | — |
| Diluted Shares | 812M-817M | — |

**Note**: Q3 will be the first full quarter of CyberArk, hence the massive acceleration in all metrics.

### 5.3 Long-Term Targets

| Target | Timeline | Source |
|--------|----------|--------|
| Adjusted FCF Margin: 37% | FY2026-FY2027 | Q2 FY2026 earnings |
| Adjusted FCF Margin: 40% | FY2028 | Long-term target |
| Non-GAAP OPM: 30%+ sustained | FY2026+ | Recent quarterly trend |
| Revenue: $15B+ run-rate | FY2028E (implied) | Analyst estimates based on 20%+ growth |

**Insider Signal**: CEO Nikesh Arora purchased $10M of PANW stock in personal transaction (reported Mar 30, 2026). JPMorgan called this a "substantial vote of confidence." This is notable as CEO open-market buys are rare in tech.

---

## 6. Supplementary Calculations

### 6.1 Revenue Growth Trajectory

| Fiscal Year | Revenue | YoY Growth |
|-------------|---------|------------|
| FY2020 | $3,408M | +18% |
| FY2021 | $4,256M | +24.9% |
| FY2022 | $5,502M | +29.3% |
| FY2023 | $6,893M | +25.3% |
| FY2024 | $8,028M | +16.5% |
| FY2025 | $9,222M | +14.9% |
| FY2026E | $11.3B | +22-23% (guided) |

**Note**: FY2026 reaccelerates from 15% to 22-23%, entirely driven by inorganic (CyberArk) contribution. Organic revenue growth is likely ~14-16%.

### 6.2 Gross Margin Trend

| Fiscal Year | GAAP Gross Margin |
|-------------|------------------|
| FY2020 | 70.7% |
| FY2021 | 70.0% |
| FY2022 | 68.8% |
| FY2023 | 72.3% |
| FY2024 | 74.3% |
| FY2025 | 73.4% |
| Q2 FY2026 | 73.6% |

**Trend**: Gross margin recovered from the FY2022 trough (hardware supply chain costs) and stabilized at ~73-74%. The shift toward higher-margin subscriptions is offset by lower-margin product revenue and free trial periods for platformization deals.

### 6.3 R&D Spend

| Fiscal Year | R&D Expense | R&D/Revenue |
|-------------|-------------|-------------|
| FY2020 | $768M | 22.5% |
| FY2021 | $1,140M | 26.8% |
| FY2022 | $1,418M | 25.8% |
| FY2023 | $1,604M | 23.3% |
| FY2024 | $1,809M | 22.5% |
| FY2025 | $1,984M | 21.5% |

**Trend**: R&D/Revenue declining as scale benefits kick in, but absolute R&D nearly tripled in 5 years. Significant investment in AI-powered security (XSIAM, AIOps, Precision AI).

### 6.4 Balance Sheet Snapshot (Jan 31, 2026)

| Item | Value |
|------|-------|
| Cash & Investments | $4.16B |
| Total Debt | $372M |
| Net Cash | ~$3.8B |
| Total Assets | $24.98B |
| Total Liabilities | $15.59B |
| Shareholders' Equity | $9.39B |
| Goodwill | $6.93B (27.8% of assets) |
| Deferred Revenue (current + non-current) | Largest liability item |

**Note**: The large goodwill increase reflects the CyberArk acquisition ($25B deal -> significant goodwill). Net cash position of $3.8B provides financial flexibility. Current ratio of 1.04 reflects heavy deferred revenue (a liability but a positive business metric -- customers pre-pay).

---

## 7. Key Data Gaps and Caveats

1. **Product vs Subscription vs Support granular quarterly split**: Not consistently disclosed in press releases. 10-Q/10-K provide this but are not always available for most recent quarters.
2. **Company-wide NRR**: Not formally disclosed. Platform customer NRR (~119-125%) is a subset metric.
3. **Billings**: Deprecated as a KPI starting FY2025. Historical billings data available but not forward-guided.
4. **CyberArk integration costs**: Full financial impact not yet visible. FY2026 H2 will show first full quarters of combined operations.
5. **SBC allocation by function**: Not granulated in press releases. 10-K provides split across COGS/R&D/S&M/G&A.
6. **Customer count trends**: PANW has not updated the "70,000+ customers" figure recently; this may be growing but is not regularly reported with precision.
7. **Non-GAAP adjustments include**: SBC, acquisition-related costs (amortization of intangibles, deal costs), and litigation-related charges. The ~15-17pt GAAP-to-non-GAAP spread is primarily SBC.

---

*Research compiled from: PANW Q4 FY2025 press release (Jul 2025), Q1 FY2026 press release (Nov 2025), Q2 FY2026 press release (Feb 2026), FMP financial data API, earnings call transcripts, SEC filings, and financial news sources.*
