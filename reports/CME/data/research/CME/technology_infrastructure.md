# CME Group — Technology & Infrastructure

> 来源: WebSearch Agent | 2026-03-15

---

## 1. Globex Trading Platform

| Specification | Detail |
|---|---|
| Server Count | ~3,600 servers |
| Matching Engine Latency | ~52 microseconds (median) |
| Primary Data Center | Aurora, Illinois |
| Backup Data Center | Undisclosed (US-based) |
| Daily Messages Processed | 500M+ on peak days |
| Uptime Target | 99.99% |
| Products Traded | 3,000+ futures & options |
| Connected Firms | 500+ globally |

- Globex is the core matching engine — handles all electronic trading
- 52 microsecond latency competitive with ICE (~50μs) and Nasdaq (~40μs)
- Latency is NOT a differentiator for CME — liquidity is the moat, not speed

## 2. Google Cloud Partnership

### Deal Structure
- **Announced**: November 2021
- **Duration**: 10-year strategic partnership
- **Google Equity Investment**: $1B in CME Group (at ~$230/share)
- **Scope**: Build private cloud region in Aurora, IL adjacent to CME's data center
- **Goal**: Migrate clearing, market data, and eventually Globex to cloud infrastructure

### Migration Milestones

| Milestone | Status | Date |
|---|---|---|
| Clearing applications migration | Done | 2023–2024 |
| STP FIX API (post-trade) | Done | May 2025 |
| Market data distribution | In progress | 2025–2026 |
| Globex Sandbox (test environment) | Targeted | Mid-2026 |
| Globex Production migration | TBD | 18 months notice required |
| Full migration completion | TBD | 2028–2029 est. |

- **18 months notice**: CME has committed to giving market participants at least 18 months advance notice before moving Globex production to cloud
- This means earliest Globex production move = late 2027 if sandbox launches mid-2026
- HFT firms and co-location customers are closely watching — any latency change is existential for them

### Migration Cost

| Year | Cloud Migration Spend ($M) |
|---|---:|
| 2022 | ~40 |
| 2023 | ~65 |
| 2024 | 85 |
| 2025 (guided) | 115 |
| 2026 (est.) | 100–120 |

- Cumulative spend through 2025: ~$305M
- Total program cost likely $500–700M over the full migration
- This is incremental to normal CapEx — one-time but multi-year

## 3. November 2025 Outage

| Detail | Specifics |
|---|---|
| Date | November 2025 |
| Cause | Human error at CyrusOne data center — cooling system failure |
| Duration | ~11 hours |
| Impact | Trading halted across all CME products |
| Notional Frozen | ~$1 trillion in open interest |
| Root Cause | CyrusOne technician error during maintenance |
| CME Response | Activated backup procedures, investigated vendor protocols |

### CyrusOne Ownership History
- CME originally owned the Aurora data center
- **Sold to CyrusOne for $130M in 2016** — leaseback arrangement
- **15-year leaseback**: CME leases back the facility it sold
- CyrusOne subsequently acquired by PE consortium (**KKR & GIP**) in 2022 for $15B
- CME now relies on a PE-owned vendor for its most critical infrastructure
- **Risk**: PE ownership incentivizes cost optimization, potentially at expense of reliability
- The outage is evidence this risk is real

## 4. BrokerTec Fixed Income Platform

| Metric | Value |
|---|---|
| Daily Notional Volume | $700–750B |
| Connected Dealers | 120+ |
| Products | US Treasuries, EU Govies, Repos |
| Migration to Globex | Completed February 2021 |
| Acquisition | Part of NEX Group ($5.4B, 2018) |

- BrokerTec = dominant electronic platform for US Treasury inter-dealer trading
- Migration to Globex created cross-margining synergies with Treasury futures
- Combined with CME's Treasury futures, creates the deepest rates liquidity pool globally

## 5. Tokenization & Digital Assets

### Google GCUL (Google Cloud Universal Ledger) Pilot
- **Scope**: Tokenized collateral management
- **Phase 1**: Completed — proof of concept for tokenized margin deposits
- **Phase 2**: Expected launch 2026
- **Potential**: Allow tokenized Treasuries as performance bond collateral, reducing settlement time

### 24/7 Crypto Trading
- **Launched**: February 2026
- **Products**: Bitcoin and Ether futures (micro and standard)
- **Significance**: First major exchange to offer 24/7 regulated crypto futures
- Previously Sunday evening to Friday close only

## 6. Cybersecurity

| Component | Detail |
|---|---|
| GIS (Global Information Security) Team | 200+ employees |
| Framework | NIST Cybersecurity Framework |
| Operations | 24/7 Cyber Defense Center |
| Testing | Regular penetration testing, red team exercises |
| Regulatory | CFTC System Safeguards, SEC Reg SCI |
| Incidents (public) | No material breaches disclosed |

## 7. Capital Expenditures

| Year | CapEx ex-Migration ($M) | Cloud Migration ($M) | Total CapEx ($M) |
|---|---:|---:|---:|
| 2022 | 80 | 40 | 120 |
| 2023 | 85 | 65 | 150 |
| 2024 | 88 | 85 | 173 |
| 2025 | 90 | 115 | 205 |
| 2026 (est.) | 92 | 110 | 202 |

- **Core CapEx is remarkably low**: ~$90M on $6.5B revenue = **1.4% of revenue**
- This is one of the lowest CapEx intensities of any public company
- The exchange business model requires minimal physical capital — the asset is the liquidity network
- Cloud migration is a temporary step-up that will normalize post-2027

## 8. Technology Risk Assessment

| Risk | Severity | Probability | Mitigation |
|---|---|---|---|
| Cloud migration latency increase | High | Medium | 18-month notice, dual-run period |
| CyrusOne reliability (PE-owned) | Medium | Medium | Backup DC, Google Cloud parallel |
| HFT customer defection (on cloud move) | Medium | Low | Co-location offering at Google Cloud |
| Cyber attack on clearing | Critical | Low | 200+ security team, regulatory oversight |
| Tokenization disruption to collateral model | Low | Low | CME is leading the initiative |

- The Google Cloud migration is the biggest technology bet in CME's history
- If executed well: lower costs, better scalability, new product capabilities
- If botched: latency-sensitive customers could migrate to ICE or other venues
- The 18-month notice requirement is a smart hedge — gives CME an abort option
