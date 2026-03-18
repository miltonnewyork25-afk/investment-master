# CRM (Salesforce) Research Data — Agent 1
> Research date: 2026-03-18 | FY2026 = fiscal year ending January 31, 2026

---

## 1. Segment Revenue Breakdown FY2026

**Total Revenue FY2026: $41.525B** (+10% YoY, +9% CC), including $399M Informatica contribution
- Q4 FY26: $11.201B (+12% YoY, +10% CC), incl. $399M Informatica

**Subscription & Support FY26: $39.388B** (95% of total) | FY25: $35.679B (94%)
**Professional Services & Other FY26: $2.137B** (5%) | FY25: $2.216B (6%)

### Revenue by Cloud (FY2026 full year, from Bullfincher/third-party aggregation)

| Segment | FY2026 | FY2025 | YoY Growth | % of Total (FY26) |
|---------|--------|--------|------------|-------------------|
| Service Cloud | $9.82B | $9.05B | +8.5% | ~23.6% |
| Sales Cloud | $9.03B | $8.32B | +8.5% | ~21.7% |
| Platform and Other | $8.88B | $7.25B | +22.5% | ~21.4% |
| Integration & Analytics | $6.23B | $5.78B | +7.8% | ~15.0% |
| Marketing & Commerce Cloud | $5.43B | $5.28B | +2.8% | ~13.1% |
| Professional Services & Other | $2.14B | $2.22B | -3.6% | ~5.2% |

**Source**: Bullfincher.io revenue-by-segment page (aggregated from SEC filings). Note: Bullfincher also shows a separate "Subscription and Support" line at $39.39B which appears to be a duplicate/parent category — the 5 cloud segments above should sum to ~$39.39B.

**Data Cloud**: Not broken out as separate line item in 10-K. Data Cloud revenue is embedded within "Platform and Other" and partially within "Integration & Analytics." Salesforce reports Data Cloud + Agentforce combined as $2.9B ARR (see Section 2).

**Key observation**: Platform and Other grew fastest (+22.5%), likely driven by Data Cloud + Agentforce adoption. Marketing & Commerce was slowest (+2.8%).

**Source**: [Bullfincher CRM Revenue by Segment](https://bullfincher.io/companies/salesforce/revenue-by-segment) | [CRM Q4 FY26 Press Release](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) | [CRM Q4 FY26 Press Release PDF](https://s205.q4cdn.com/626266368/files/doc_financials/2026/q4/CRM-Q4-FY26-Earnings-Press-Release.pdf)

---

## 2. Agentforce Metrics

### ARR & Deal Velocity
- **Agentforce ARR: $800M** (up 169% YoY) as of Q4 FY26
- **Agentforce + Data 360 combined ARR: $2.9B** (up 200%+ YoY)
  - Includes $1.1B Informatica Cloud ARR + $800M Agentforce ARR
- **29,000 Agentforce deals closed** since launch (up 50% QoQ)
- **Agentforce accounts in production: increased ~50% QoQ**
- **>60% of Agentforce + Data 360 Q4 bookings** came from existing customer expansion
- **All Top 10 Q4 deals included Agentforce** (Agentforce 360, Data 360, Agentforce Sales, Service, Platform, Analytics)
- **Industry-specific businesses ARR: $6.6B** (up ~20% YoY)

### Adoption Penetration
- ~8% of Salesforce's 150,000+ customer base has adopted Agentforce so far (as of early 2026)
- This implies ~12,000 customers have adopted, with significant runway for expansion

### Scale Metrics
- **2.4B Agentic Work Units (AWUs)** delivered to date (57% QoQ growth)
- **~20 trillion tokens processed** (5x YoY increase)
- **112 trillion Data 360 records** ingested in FY26 (114% YoY), including 53T via Zero Copy (+310% YoY)
- **18 terabytes of unstructured data** processed

### Pricing Model (Evolved Significantly)
Salesforce has 6+ pricing models for Agentforce — **pricing evolution timeline:**

1. **Sep 2024 launch**: $2 per conversation (simple but controversial)
2. **May 2025 pivot**: Flex Credits model — $0.10 per action ($500 per 100K credits)
3. **Current (early 2026)** — Multiple tiers:
   - **Free**: Salesforce Foundations ($0) — includes Agent Builder, Prompt Builder, 200K Flex Credits + 250K Data Cloud credits
   - **Per-User License**: Agentforce User License at $5/user/month
   - **Add-ons**: Agentforce Add-ons at $125/user/month; Industries Add-ons at $150/user/month
   - **Enterprise Edition**: Agentforce 1 Enterprise Edition at ~$550/user
   - **Flex Credits**: Consumption model at $500 per 100K credits
   - **6% price increase** announced with unlimited Agentforce licenses bundled into certain editions

**Source**: [Salesforce Agentforce Pricing](https://www.salesforce.com/agentforce/pricing/) | [SaaStr Agentforce Pricing Analysis](https://www.saastr.com/salesforce-now-has-3-pricing-models-for-agentforce-and-maybe-right-now-thats-the-way-to-do-it/) | [Salesforce Ben Pricing Increase](https://www.salesforceben.com/salesforce-announces-6-pricing-increase-and-unlimited-agentforce-licenses/) | [Monetizely Agentforce Pricing](https://www.getmonetizely.com/blogs/the-doomed-evolution-of-salesforces-agentforce-pricing)

### Customer Case Studies

| Company | Industry | Use Case | Results |
|---------|----------|----------|---------|
| **Wiley** | Publishing/Education | Self-service customer issue resolution | +40% self-service efficiency, 213% ROI from Service Cloud |
| **OpenTable** | Restaurant/Hospitality | Reservation mgmt, account reactivation, loyalty | 73% of restaurant web queries handled after 3 weeks, 50% improvement over prior tool |
| **Adecco Group** | Talent/Recruitment | Resume screening, shortlisting, candidate notifications | Automated end-to-end screening processes |
| **AAA** | Roadside Assistance | Autonomous customer support, proactive updates | Enhanced agent efficiency |
| **Precina Health** | Healthcare | Sales Coach for provider outreach | Reduced avg blood sugar 9.6→6.4 in 12 weeks (50 patients) |
| **Accenture** | Professional Services | Meeting summaries, task management via Slack | Reduced time on repetitive processes |
| **Saks** | Luxury Retail | Digital stylists, personalized recommendations | Higher engagement & satisfaction |
| **SharkNinja** | Consumer Products | Q&A, product recommendations, post-purchase support | Higher customer engagement |
| **Good360** | Non-profit | Resource-matching for donations | Faster disaster response times |
| **Prudential Financial** | Financial Services | Follow-up automation, client data organization | Saves ~half a day per wholesaler per week |
| **Amplifon** | Healthcare/Retail | Appointment scheduling, patient feedback | 24/7 patient engagement |

**Source**: [Salesforce Agentforce Customer Stories](https://www.salesforce.com/agentforce/customer-stories/) | [CX Today Agentforce Case Studies](https://www.cxtoday.com/crm/agentforce-case-studies/)

### Einstein AI → Agentforce Evolution
- **Einstein was NOT a failure** — it was a strategic evolution/rebranding
- Einstein launched in 2016 as umbrella brand for all AI/ML capabilities
- Evolution: Predictive (2016-2022) → Generative (2023-2024) → Copilot (2024) → Agentforce (2025)
- **Jan 2025**: Einstein Copilot for Salesforce renamed to Agentforce (no functionality change initially)
- Einstein still exists as the underlying AI platform; Agentforce is the autonomous agent layer built on top
- Both run in parallel: Einstein for assisted productivity, Agentforce for autonomous workflows
- Key distinction: Einstein = embedded predictions + copilot | Agentforce = autonomous agents that detect, reason, act without human input

**Source**: [Bluprintx Einstein vs Agentforce](https://bluprintx.com/insights/agentforce-vs-einstein-what-changed-and-what-it-means-for-your-salesforce-setup/) | [NoJitter Einstein Successor](https://www.nojitter.com/ccaas/salesforce-debuts-einstein-successor-agentforce) | [Salesforce Debunking Myths](https://www.salesforce.com/blog/debunking-myths-salesforce-einstein-and-agentforce/)

---

## 3. AppExchange Ecosystem

| Metric | Value | Source |
|--------|-------|--------|
| Total apps/solutions | **7,000+ apps** (or 9,000+ solutions including consulting services) | AppExchange.salesforce.com, SFApps.info |
| Total customer installs | **13+ million** | Multiple sources |
| Active developers building on AppExchange | **3,500+** (up 15% YoY as of May 2025) | SFApps.info |
| Customer adoption rate | **90%+ of Salesforce customers** use at least one AppExchange app | Multiple sources |
| ISV revenue share to Salesforce | **15% of sales** (10% for ISVs with >$10M revenue) | Salesforce Developer Docs |
| Market size (AppExchange tools) | **~$2.5B** (2025 est.) → projected **$9B by 2033** (15%+ CAGR) | Business Research Insights |
| Most popular app categories | CRM analytics, integration tools, document generation, e-signature, marketing automation | AppExchange listings |

**Revenue/GMV through AppExchange**: Not publicly disclosed by Salesforce. The $2.5B market estimate is from third-party analysts, not official Salesforce disclosure.

**Source**: [Salesforce AppExchange](https://appexchange.salesforce.com/) | [SFApps.info Stats 2025](https://www.sfapps.info/salesforce-apps-stats-2025/) | [Synebo AppExchange Trends](https://www.synebo.io/blog/appexchange-trends-and-strategies/) | [Business Research Insights Market Report](https://www.businessresearchinsights.com/market-reports/salesforce-appexchange-tools-market-102156)

---

## 4. Customer Metrics

### Total Customer Count
- **150,000+ companies** use Salesforce worldwide (consistent across multiple sources, 2024-2026)
- Notable customers: Amazon, Spotify, US Bank, Toyota, T-Mobile, Macy's

### Fortune 500 Penetration
- **~90% of Fortune 500** companies use Salesforce (up from 83% in 2017)

### Average Deal Size Trends
- Average deal size has **increased ~15% over the past two years** (general trend, no exact ACV disclosed)
- Salesforce has shifted from mid-market to enterprise-focused vendor
- **Top 25 Q3 FY26 deals averaged 5+ clouds each** — multi-cloud adoption drives higher ACV
- **73% of new bookings come from existing customers** (expansion-driven growth model)

### Net Revenue Retention / Dollar-Based Expansion
- **Salesforce does not publicly disclose NRR/DBNRR** as a standalone metric
- **Revenue attrition rate: ~8%** (slightly above 8% as of Q3 FY25, per CFO commentary)
  - This implies gross retention of ~92%
  - SaaS industry average churn is ~26%, so Salesforce is significantly better
- **Implied NRR estimate**: With 10% total revenue growth, 92% gross retention, and 73% of bookings from existing customers → estimated NRR likely in the **110-115% range** (author estimate, not company-disclosed)
- Multi-cloud customers have lower attrition and drive significant ARR expansion

### Additional Metrics
- **Remaining Performance Obligations (RPO): $72.4B** (+14% YoY)
- **Current RPO: $35.1B** (+16% YoY, +13% CC, including 4pts Informatica)
- **Industry businesses ARR: $6.6B** (up ~20% YoY)
- **Employees: 76,453** (as of FY26 end)

**Source**: [ChurnDog Salesforce Retention](https://churndog.com/saas-news/what-to-make-of-salesforces-q3-retention-metrics) | [Moomoo CRM Financials](https://www.moomoo.com/us/learn/detail-5-2024-decoding-financials-of-crm-giant-salesforce-113843-240568154) | [CRM Q4 FY26 Earnings](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) | [DemandSage Salesforce Statistics](https://www.demandsage.com/salesforce-statistics/)

---

## 5. Geographic Revenue Split

### FY2026 Full Year (TTM through Jan 31, 2026)

| Region | FY2026 Revenue | FY2025 Revenue | YoY Growth | % of Total |
|--------|---------------|---------------|------------|-----------|
| Americas | $27.19B | $25.14B | +8.2% | 65.5% |
| EMEA (Europe) | $10.02B | $8.89B | +12.7% | 24.1% |
| Asia Pacific | $4.32B | $3.86B | +11.9% | 10.4% |
| **Total** | **$41.53B** | **$37.89B** | **+9.6%** | **100%** |

**Source**: [StockAnalysis CRM Revenue by Geography](https://stockanalysis.com/stocks/crm/metrics/revenue-by-geography/) — Note: Uses TTM through Dec 31, 2025 which closely approximates FY26 ending Jan 31, 2026.

### Q4 FY2026 (Three Months Ended Jan 31, 2026)

| Region | Q4 FY26 | YoY Growth | % of Q4 Revenue |
|--------|---------|-----------|----------------|
| Americas | $7.3B | +9% | ~65% |
| EMEA | $2.8B | +19% | ~25% |
| Asia Pacific | $1.1B | +14% | ~10% |

### International vs Domestic Growth
- **International growing faster**: EMEA +12.7% and APAC +11.9% vs Americas +8.2% (full year)
- **Q4 acceleration**: EMEA surged to +19% in Q4, APAC to +14%, vs Americas at +9%
- **Constant currency**: EMEA grew 7% CC in Q3 (macro pressures in Germany/UK), APAC 14% CC — suggesting FX tailwind in reported numbers
- **US customer concentration**: US represents ~61.8% of customers, UK 13.9%
- Americas includes Latin America (not just US)

**Source**: [Nasdaq CRM Q4 Earnings](https://www.nasdaq.com/articles/salesforce-q4-earnings-beat-estimates-revenues-rise-y-y) | [Bullfincher Revenue by Geography](https://bullfincher.io/companies/salesforce/revenue-by-geography) | [StockAnalysis](https://stockanalysis.com/stocks/crm/metrics/revenue-by-geography/)

---

## Appendix: Key Financial Summary (from Press Release)

### Income Statement FY2026 vs FY2025 (in $M)

| Item | FY2026 | FY2025 | YoY |
|------|--------|--------|-----|
| Total Revenue | $41,525 | $37,895 | +9.6% |
| Subscription & Support | $39,388 | $35,679 | +10.4% |
| Professional Services | $2,137 | $2,216 | -3.6% |
| Gross Profit | $32,255 | $29,252 | +10.3% |
| Gross Margin | 77.7% | 77.2% | +50bps |
| GAAP Operating Income | $8,331 | $7,205 | +15.6% |
| GAAP Operating Margin | 20.1% | 19.0% | +110bps |
| Non-GAAP Operating Margin | 34.1% | — | — |
| Net Income | $7,457 | $6,197 | +20.3% |
| GAAP EPS (diluted) | $7.80 | $6.36 | +22.6% |
| Operating Cash Flow | $14,996 | $13,092 | +14.5% |
| Free Cash Flow | $14,402 | $12,434 | +15.8% |
| FCF Margin | 34.7% | 32.8% | +190bps |
| SBC | $3,509 | $3,183 | +10.2% |
| Capex | $594 | $658 | -9.7% |

### Balance Sheet Highlights (Jan 31, 2026)
- Cash & equivalents: $7.33B
- Marketable securities: $2.24B
- Total debt: $14.44B (current $4.0B + noncurrent $10.44B)
- Net debt: ~$4.87B
- Goodwill: $57.94B (51.6% of total assets)
- Unearned revenue: $24.32B
- Total assets: $112.31B
- Stockholders' equity: $59.14B

### Capital Return
- **$12.6B share repurchases** in FY26
- **$1.6B dividends** in FY26
- **$50B new buyback authorization** announced (replacing prior)
- **Dividend: $0.44/share quarterly** (+5.8% YoY increase)
- Share count declining: 940M diluted (Q4 FY26) vs 974M (FY25) = **-3.5% reduction**

### FY2027 Guidance
- Revenue: $45.80B - $46.20B (+10-11% YoY)
- Non-GAAP operating margin: 34.3%
- Non-GAAP EPS: $13.11 - $13.19
- Operating cash flow growth: ~9-10% YoY
- Free cash flow growth: ~9-10%
- Includes ~3pts Informatica contribution
- FY30 revenue target: $63B

**Source**: CRM Q4 FY26 Earnings Press Release (Feb 25, 2026) — images provided by user
