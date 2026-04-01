# PANW Product Portfolio & Technology Architecture Research

> **Research Date**: 2026-03-31
> **Sources**: Web search (PANW investor relations, press releases, analyst reports, industry research)
> **Fiscal Year Note**: PANW fiscal year ends July 31. FY2025 = Aug 2024 - Jul 2025. FY2026 = Aug 2025 - Jul 2026.

---

## 1. Three Major Platforms Overview

PANW operates three core security platforms, unified under a "platformization" strategy that encourages customers to consolidate multiple security vendors onto a single PANW platform.

### 1.1 Strata (Network Security)

**Core Products:**
- **PA-Series (Hardware NGFW)**: Physical next-generation firewalls for on-premises deployment. Four vendors (Fortinet, PANW, Cisco, Check Point) collectively capture ~70% of global NGFW shipments (2024 data). Gartner ranks PANW #1 on "completeness of vision" and #2 on "ability to execute" (behind Fortinet).
- **VM-Series (Virtual NGFW)**: Software firewalls for cloud environments (AWS, Azure, GCP). Transitioning to Software NGFW Credits licensing model (credit-based, flexible sizing).
- **CN-Series (Container NGFW)**: Kubernetes-native firewalls for containerized workloads.
- **Prisma SASE (Secure Access Service Edge)**: Cloud-delivered security combining SSE (Secure Service Edge) + SD-WAN. Includes Prisma Access (ZTNA, SWG, CASB, FWaaS) and Prisma SD-WAN (acquired via CloudGenix, April 2020, $420M).
- **Prisma Browser**: Enterprise browser for protecting against highly evasive threats (integrated into SASE).
- **PAN-OS**: Unified operating system powering all Strata products.

**Recent Evolution:**
- Software NGFW Credits model replacing fixed VM-Series licenses — enables flexible deployment across VM/container/cloud
- Gen5 firewall adoption driving hardware revenue (hardware up ~10% on early Gen5 adoption + SD-WAN)
- SASE surpassed **$1.5B ARR**, growing ~40% YoY (as of Q4 FY2025)

### 1.2 Cortex (Security Operations) — Now also Cloud Security

**Core Products:**
- **Cortex XSIAM (Extended Security Intelligence & Automation Management)**: AI-driven SOC platform. Flagship SecOps product. ~470 customers as of Q2 FY2026, with average ARR >$1M per customer. Surpassed **$1B cumulative bookings** in FY25 Q2 (fastest product to reach milestone). Largest deal: $85M contract with a large U.S. telecom.
- **Cortex XDR (Extended Detection & Response)**: Endpoint detection, network detection, cloud detection unified on single agent.
- **Cortex XSOAR (Security Orchestration, Automation & Response)**: SOAR platform, now evolving into Cortex AgentiX.
- **Cortex AgentiX** (launched October 28, 2025): Next-gen XSOAR — platform to build, deploy, and govern AI agent workforce. Trained on 1.2B+ real-world playbook executions. Claims 98% MTTR reduction with 75% less manual work.
- **Cortex Expander (Attack Surface Management)**: Discovers unknown assets and exposures across the internet.
- **Cortex Cloud** (launched February 13, 2025): **Merger of Prisma Cloud + Cortex CDR**. Natively brings together CNAPP + CDR on unified Cortex platform. Existing Prisma Cloud customers seamlessly upgraded. CNAPP included at no extra cost for Cortex Cloud Runtime Security customers.

**Key Metrics:**
- XSIAM: >60% of deployed customers reduced MTTR to <10 minutes (from days/weeks previously)
- XSIAM: ~150% YoY customer growth
- BYOML (Bring Your Own ML) framework: SOCs can create custom ML models using ingested security data

### 1.3 Prisma (Cloud Security & AI Security)

**Note**: In 2025, Prisma Cloud was merged into Cortex Cloud. The "Prisma" brand now primarily covers:

- **Prisma Cloud → Cortex Cloud** (transitioned February 2025): CNAPP capabilities including CSPM (Cloud Security Posture Management), CWPP (Cloud Workload Protection Platform), CIEM (Cloud Infrastructure Entitlement Management), code-to-cloud security. Now unified under Cortex platform.
- **Prisma AIRS (AI Runtime Security)**: Purpose-built AI security platform. Three versions:
  - v1.0 (2024): AI application runtime protection
  - v2.0 (October 2025): Added model security, red teaming engine (500+ attack types), absorbed Protect AI acquisition
  - v3.0 (March 23, 2026): Full agentic AI lifecycle security — agent inventory, continuous risk assessment, AI red-teaming, AI Agent Gateway (limited preview)
- **Prisma Access**: Cloud-delivered SASE (part of Strata/SASE umbrella)

**Prisma AIRS Capabilities:**
- AI Runtime Firewall: Protects against prompt injections, sensitive data leakage, insecure output, model DoS
- AI Model Security: Scans for vulnerabilities in ML models
- AI Red Teaming: 500+ attack types for adversarial testing
- AI Posture Management: Visibility into AI asset inventory and risk
- Native integrations with Factory, Glean, IBM, ServiceNow for AI agent security

### 1.4 Emerging Fourth Pillar: Identity & Data Security

Expanded in 2025 — Zero Trust identity management and data security. Bolstered by CyberArk acquisition (see Section 6).

---

## 2. Revenue Breakdown & Financial Metrics

### 2.1 Revenue by Type (FY2025, ended July 2025)

| Revenue Type | FY2025 Amount | % of Total | YoY Growth |
|-------------|---------------|-----------|------------|
| Product (hardware + software) | $1.80B | 19.5% | +12% |
| Subscription | $4.97B | 54.0% | ~20%+ |
| Support | $2.45B | 26.5% | ~10%+ |
| **Total Revenue** | **$9.22B** | **100%** | **+15%** |

### 2.2 Key ARR Metrics

| Metric | Q4 FY2025 | Q1 FY2026 | Q2 FY2026 | FY2026 Guidance |
|--------|-----------|-----------|-----------|-----------------|
| NGS ARR | $5.6B (+32% YoY) | $5.85B (+29% YoY) | $6.33B (+33% YoY) | $8.52-8.62B (+53-54%) |
| Total Revenue | $2.3B (Q4) | $2.5B (+16% YoY) | — | $11.28-11.31B (+22-23%) |
| RPO | $15.8B (+24% YoY) | — | — | $20.2-20.3B (+28%) |

**Note**: PANW does not publicly break out revenue by platform (Strata vs Cortex vs Prisma). NGS ARR is the key metric encompassing all next-generation (non-legacy firewall) subscriptions.

### 2.3 Product-Level ARR Indicators (from earnings calls)

- **SASE**: >$1.5B ARR, ~40% YoY growth
- **XSIAM**: ~470 customers, avg >$1M ARR each → implies ~$470M+ ARR run-rate
- **Cortex overall (XSIAM + XDR + XSOAR/AgentiX)**: Not separately disclosed, but XSIAM is "fastest-growing product in company history"
- **PANW long-term target**: $15B NGS ARR by 2030 (CY)

### 2.4 Revenue Mix Shift

Product revenue (hardware-heavy) grew only 12% in FY2025 vs. subscription at ~20%+. This reflects the strategic shift from hardware appliances to software/SaaS. Product revenue was 19.5% of total in FY2025, down from ~25%+ in prior years. The subscription mix will continue increasing.

---

## 3. Hardware Firewall Business

### 3.1 Is the Firewall Refresh Cycle Still Relevant?

**Yes, but diminishing in relative importance:**
- Hardware NGFW segment still held **58.5% market share** of the NGFW market in 2025 (by revenue), driven by enterprise refresh cycles in BFSI, telecom, government
- Gen5 firewall adoption is driving near-term hardware revenue growth (~10% increase)
- NGFW market projected to grow from $6.73B (2025) to $19.47B (2035) — so hardware is not dying, but growth tilts toward software/virtual
- Large enterprises (68.12% of hardware firewall market) still require physical appliances for data center, campus, and branch deployments
- Refresh cycles remain a driver: typical 5-7 year hardware lifecycle creates recurring upgrade waves

### 3.2 Hardware → Software/Virtual Transition

**Key indicators of transition:**
1. **Software NGFW Credits**: New licensing model replacing fixed VM-Series licenses. Credits can be used across VM-Series, CN-Series, CDSS (Cloud-Delivered Security Services), or virtual Panorama. Enables elastic scaling without hardware lock-in.
2. **Product revenue deceleration**: 12% growth in FY2025 vs. 20%+ for subscriptions — structural shift underway
3. **VM-Series/CN-Series expansion**: Cloud deployments increasingly use virtual firewalls optimized for AWS, Azure, GCP (e.g., VM-Series optimized for Google Cloud as part of $10B partnership)
4. **Azure disruption risk**: March 2026 advisory — Microsoft's Azure network adapter upgrade could cut VM-Series/AIRS performance by 50%+ (near-term technical risk)

### 3.3 SASE Cannibalization Risk

**Assessment: Moderate but manageable**
- SASE replaces branch office firewall + VPN + WAN optimization → directly cannibalizes branch hardware NGFW deployments
- However: SASE is a "land" product — nearly **1/3 of Prisma Access customers are new to PANW** (net new logos, not cannibalization)
- Data center and campus NGFW deployments are NOT replaceable by SASE (different use case: deep inspection at high throughput)
- Management framing: SASE grows the TAM rather than cannibalizes — enterprise networks moving to cloud create new addressable market
- **Risk**: As SASE matures, fewer customers need branch hardware firewalls → hardware product revenue will structurally decelerate
- **Mitigation**: Software NGFW Credits model ensures PANW captures value regardless of form factor (hardware vs. virtual vs. SASE)

---

## 4. Prisma SASE Competitive Positioning

### 4.1 PANW SASE vs. Zscaler

| Dimension | PANW Prisma SASE | Zscaler |
|-----------|-----------------|---------|
| **Architecture** | Network-security-first: deep inspection firewall + SSE + SD-WAN unified | Cloud-proxy Zero Trust: no corporate network, users connect directly to apps via cloud |
| **SD-WAN** | Integrated (CloudGenix acquisition) | No native SD-WAN — partners with others |
| **Firewall consistency** | Same PAN-OS policy engine as on-prem NGFW | Cloud-only proxy architecture |
| **Target buyer** | Hybrid environments, existing PANW firewall customers | Pure cloud-first, greenfield Zero Trust |
| **Market position** | Top 3 (Forrester Wave), but dinged on pricing/cost creep | Top 3 (Forrester Wave), praised for partner ecosystem and licensing |
| **Strength** | Single vendor for network + cloud + SASE | Purpose-built cloud proxy, wider partner ecosystem |
| **Weakness** | Higher pricing, complex licensing | No hardware/on-prem → limited for hybrid |

### 4.2 SASE Growth Trajectory

- SASE ARR: >$1.5B, growing ~40% YoY
- Nearly 1/3 of Prisma Access customers are net-new to PANW ecosystem
- Early SASE adopters are reassessing point offerings in favor of unified architectures — benefiting PANW's platform approach
- SASE is a key driver of platformization deals (e.g., $50M automotive deal included $30M SASE + $20M XSIAM)

### 4.3 SD-WAN Integration

- CloudGenix acquired April 2020 for $420M
- Fully integrated into Prisma SASE as Prisma SD-WAN
- Enables unified management of network + security from single console
- Hardware revenue benefiting from SD-WAN appliance sales (+10% hardware growth cited)
- Partnership with Aryaka for managed SD-WAN services

### 4.4 Market Rankings

- Forrester SASE Wave: Netskope, PANW, Zscaler are top 3 leaders
- Revenue share: Zscaler, Cisco, PANW are top 3 by SASE revenue
- PANW missed top Forrester ranking partly due to high pricing and licensing complexity

---

## 5. Recent Product Launches & AI Innovations (2025-2026)

### 5.1 Precision AI

PANW's proprietary AI framework that combines:
- Machine learning (ML) for pattern recognition
- Real-time deep learning for zero-day threat blocking
- Large language models for natural language security operations

Precision AI distinguishes PANW from generic LLM-based security tools by focusing on **real-time, inline threat prevention** rather than post-hoc analysis. Powers all three platforms (Strata, Cortex, Prisma).

### 5.2 Major Product Launches Timeline

| Date | Product | Significance |
|------|---------|-------------|
| **Feb 2025** | Cortex Cloud | Merger of Prisma Cloud + Cortex CDR. Unified CNAPP + CDR. |
| **Apr 2025** | XSIAM 3.0 | Added proactive exposure management + advanced email security |
| **Apr 2025** | Protect AI acquisition completed | AI model security → feeds into Prisma AIRS |
| **Jun 2024** | AI Copilots for Strata/Prisma/Cortex | Autonomous cybersecurity assistants for each platform |
| **Oct 2025** | Cortex AgentiX | Next-gen XSOAR — build/deploy/govern AI agent workforce. Trained on 1.2B+ playbook executions |
| **Oct 2025** | Prisma AIRS 2.0 | Model security + red teaming (500+ attack types) + Protect AI integration |
| **Oct 2025** | Cortex Cloud 2.0 | Enhanced cloud security with agentic enterprise features |
| **Dec 2025** | Google Cloud Partnership ($10B) | Multi-year, ~$6.3B PANW cloud spend commitment through 2031 |
| **Jan 2026** | Chronosphere acquisition completed ($3.35B) | Hyperscale observability (metrics, logs, traces) integrated into Cortex |
| **Feb 2026** | CyberArk acquisition completed ($25B) | Identity security (~$1.2B ARR) — new Identity & Data pillar |
| **Feb 2026** | Koi Security acquisition (~$400M) | Data security expansion |
| **Mar 2026** | Prisma AIRS 3.0 | Full agentic AI lifecycle security — agent inventory, AI Agent Gateway |
| **Mar 2026** | Next-Generation Trust Security Suite | Automated AI defense suite |

### 5.3 AI-Powered Features Across Platforms

**Strata:**
- AI-powered threat prevention (inline, real-time)
- Strata Copilot for firewall policy management
- DNS Security with ML-based domain detection

**Cortex:**
- XSIAM: AI-driven SOC automation (60%+ customers achieve <10 min MTTR)
- AgentiX: Agentic AI for security operations
- BYOML: Custom ML model framework for SOCs
- Cortex Copilot for investigation assistance

**Prisma:**
- Prisma AIRS: AI Runtime Firewall, AI Red Teaming, AI Model Security
- Cortex Cloud (ex-Prisma Cloud): AI-powered risk prioritization, guided fixes, automated remediation
- Prisma Copilot for cloud security posture

### 5.4 Precision AI Differentiators

1. **Inline prevention**: Blocks threats in real-time (not just detects post-breach)
2. **Custom ML**: BYOML allows SOC teams to train models on their own data
3. **Cross-platform intelligence**: Threat data shared across Strata/Cortex/Prisma for unified defense
4. **1.2B+ playbook executions**: Training data advantage for AgentiX
5. **500+ AI attack types**: Prisma AIRS red teaming covers prompt injection, data poisoning, model evasion, etc.

---

## 6. Technology Partnerships & Ecosystem

### 6.1 Google Cloud Partnership (December 2025) — Landmark Deal

- **Value**: ~$10B multi-year agreement (per Reuters)
- **PANW commitment**: $6.3B+ cloud spend through 2031 (migrating internal workloads to GCP)
- **Google commitment**: Integrating PANW security across Google Cloud infrastructure
- **Key integrations**:
  - VM-Series firewalls optimized for Google Cloud (deep packet inspection)
  - Prisma AIRS protecting Vertex AI workloads + Google Agent Development Kit
  - PANW uses Google's Vertex AI + Gemini LLMs to power security copilots
- **Strategic implication**: Massive win for Google over AWS/Azure in security partnership

### 6.2 IBM Partnership

- **QRadar SaaS asset acquisition** (September 2024, ~$1.14B): PANW acquired IBM's QRadar SaaS business, transitioning QRadar customers to Cortex XSIAM
- **Quantum-safe readiness**: Joint solution for quantum-resistant cryptography
- **Prisma AIRS integration**: IBM is a launch partner for AI agent security

### 6.3 Other Key Partnerships

| Partner | Integration |
|---------|------------|
| **ServiceNow** | Prisma AIRS integration for AI agent security |
| **Factory** | Prisma AIRS securing software development AI agents |
| **Glean** | Prisma AIRS integration for enterprise AI search security |
| **Aryaka** | Managed SD-WAN partnership with Prisma SASE |
| **AWS** | VM-Series, Prisma Cloud (now Cortex Cloud) native integrations |
| **Microsoft Azure** | VM-Series deployment (though Mar 2026 performance advisory is a risk) |
| **CrowdStrike** | Competitive but some joint customers via XDR/EDR coexistence |

### 6.4 Acquisition-Driven Ecosystem Expansion

| Acquisition | Date | Amount | Platform Integration |
|-------------|------|--------|---------------------|
| CloudGenix (SD-WAN) | Apr 2020 | $420M | Prisma SASE |
| Bridgecrew (IaC security) | Mar 2021 | ~$200M | Prisma Cloud → Cortex Cloud |
| Cider Security (AppSec) | Dec 2022 | ~$300M | Prisma Cloud → Cortex Cloud |
| Talon (Enterprise Browser) | Nov 2023 | $625M | Prisma SASE |
| Dig Security (DSPM) | Dec 2023 | $400M | Prisma Cloud → Cortex Cloud |
| IBM QRadar SaaS | Sep 2024 | ~$1.14B | Cortex XSIAM |
| Protect AI (AI Model Security) | Apr 2025 | ~$650-700M | Prisma AIRS |
| CyberArk (Identity Security) | Feb 2026 | $25B | Identity & Data pillar |
| Chronosphere (Observability) | Jan 2026 | $3.35B | Cortex platform |
| Koi Security (Data Security) | Feb 2026 | ~$400M | Data Security |

---

## 7. Platformization Strategy Deep Dive

### 7.1 What is Platformization?

PANW's core strategy: convince customers to consolidate multiple point security products from various vendors onto the unified PANW platform spanning network, cloud, and SOC. Rather than buying best-of-breed point solutions from 10 vendors, buy one integrated platform from PANW.

### 7.2 Platformization Metrics (Q2 FY2026)

| Metric | Value | YoY Change |
|--------|-------|-----------|
| Platformized customers | ~1,550 | +35% YoY |
| Net new platform customers (Q2) | ~110 | — |
| Average platform deal ACV | Growing (multi-million) | — |
| NGS ARR | $6.33B | +33% YoY |

### 7.3 Large Platformization Deals (Q2 FY2026 Examples)

- **Global automotive company**: $50M+ deal ($30M SASE + $20M XSIAM)
- **Global technology supplier**: $40M+ deal (XSIAM + expanded SASE)
- **Large IT services provider**: $20M deal (XSIAM-centered)
- **U.S. telecom**: $85M XSIAM contract (largest XSIAM deal to date)

### 7.4 Platformization Risks

1. **"Free product" cannibalization**: Bundling/giving away products to win platform deals could pressure long-term renewal pricing
2. **Integration execution**: Multiple acquisitions (Protect AI, CyberArk, Chronosphere) require seamless integration — Prisma Cloud's earlier patchwork integration was a known weakness before Cortex Cloud reboot
3. **Pricing complexity**: Forrester and customers cite cost creep and complex licensing as a platform weakness
4. **Competitor response**: CrowdStrike pursuing similar platform consolidation strategy in endpoint/cloud/identity

---

## 8. Key Investment-Relevant Observations

### 8.1 Structural Strengths

1. **Platformization flywheel**: More products adopted → more data shared → better AI → stronger platform → more products adopted
2. **XSIAM momentum**: Fastest-growing product, $1B+ cumulative bookings, 150%+ customer growth — potential to be next $1B+ ARR product line
3. **AI-native positioning**: Precision AI + Prisma AIRS + AgentiX give PANW early mover advantage in AI security
4. **Google Cloud partnership**: $10B deal validates platform approach and creates competitive moat vs. pure-play competitors

### 8.2 Key Risks

1. **Hardware revenue structural decline**: Product revenue (19.5% of total) will continue decelerating as SASE/software substitute branch firewalls
2. **CyberArk integration risk**: $25B acquisition is by far the largest — integration complexity is high
3. **Azure VM-Series performance issue**: March 2026 advisory on 50%+ performance degradation
4. **Pricing/licensing complexity**: Repeated criticism from Forrester and customers
5. **SASE competitive intensity**: Zscaler, Netskope, Cisco, Fortinet all investing heavily

### 8.3 TAM Expansion Through Acquisitions

| Segment | Pre-Acquisition TAM | Post-Acquisition TAM Addition |
|---------|---------------------|-------------------------------|
| Identity Security (CyberArk) | Not addressed | +$25B+ TAM |
| Observability (Chronosphere) | Not addressed | +$10B+ TAM |
| AI Security (Protect AI + Prisma AIRS) | Minimal | +$5-10B+ TAM (early market) |
| Data Security (Dig + Koi) | Partial | Expanded coverage |

---

## Sources

- [PANW Q4 FY2025 Earnings](https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-reports-fiscal-fourth-quarter-and-fiscal-9)
- [PANW Q1 FY2026 Earnings](https://www.paloaltonetworks.com/company/press/2025/palo-alto-networks-reports-fiscal-first-quarter-2026-financial-results)
- [PANW Q2 FY2026 Earnings](https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-reports-fiscal-second-quarter-2026-financial)
- [Cortex Cloud Launch (Feb 2025)](https://www.paloaltonetworks.com/company/press/2025/palo-alto-networks-introduces-cortex-cloud--the-future-of-real-time-cloud-security)
- [Cortex AgentiX Launch (Oct 2025)](https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-unveils-cortex-agentix-build-deploy-and)
- [Prisma AIRS 3.0 (Mar 2026)](https://www.stocktitan.net/news/PANW/palo-alto-networks-secures-agentic-ai-with-prisma-airs-3-em8tyohmpfld.html)
- [Google Cloud Partnership (Dec 2025)](https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-and-google-cloud-forge-landmark-agreement)
- [XSIAM Autonomous SOC (2025)](https://www.paloaltonetworks.com/blog/security-operations/2025-the-year-of-the-autonomous-soc-the-year-of-xsiam/)
- [Prisma SASE vs Zscaler](https://technologymatch.com/blog/zscaler-vs-netskope-vs-palo-alto-vs-cato-the-sase-selection-guide-2026)
- [Forrester SASE Rankings](https://www.sdxcentral.com/news/netskope-palo-alto-networks-zscaler-lead-forrester-sase-rankings/)
- [NGFW Market (MarketsandMarkets)](https://www.marketsandmarkets.com/Market-Reports/next-generation-firewall-ngfw-market-32240698.html)
- [Gartner MQ Firewall](https://www.bankinfosecurity.com/palo-alto-fortinet-check-point-control-firewall-gartner-mq-a-29336)
- [Dell'Oro: Prisma Cloud to Cortex Cloud](https://www.delloro.com/palo-alto-networks-reboots-cnapp-the-shift-from-prisma-cloud-to-cortex-cloud/)
- [PANW Strategic Acquisitions](https://www.paloaltonetworks.com/cyberpedia/palo-alto-networks-strategic-acquisitions)
- [Futurum: Q2 FY2026 Analysis](https://futurumgroup.com/insights/palo-alto-networks-q2-fy-2026-arr-accelerates-as-platform-strategy-scales/)
- [Bain Capital: Race to $100B](https://baincapitalventures.com/insight/the-race-to-100b-the-palo-alto-networks-story/)
- [Platformization Strategy (Yahoo Finance)](https://finance.yahoo.com/news/panws-platform-strategy-builds-momentum-135500142.html)
