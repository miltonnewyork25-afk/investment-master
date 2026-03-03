# KLA Corporation (KLAC) -- Strategic Extract for CEO-Level Advisory

**Source**: `/Users/milton/投资大师/.worktrees/半导体/reports/KLAC/KLAC_Complete_v1.0_2026-02-17.md`
**File Size**: 442,661 characters | **Total Lines**: 6,291 | **Chapters**: 28 (Ch1-Ch28)
**Data Cutoff**: FY2026 Q2 (December 2025) | **Market Cap**: $192.4B | **Share Price**: $1,464.13

---

## Report Metadata

| Metric | Value |
|--------|-------|
| Total Characters | 442,661 |
| Total Lines | 6,291 |
| Chapter Count | 28 chapters + appendices |
| DM Anchor Points | 407 |
| Valuation Methods Used | 6 (SOTP, Forward DCF, Reverse DCF, Relative, Adjusted DCF, Probability-Weighted) |
| CQ (Core Questions) | 7 + 1 Bridge |
| Mermaid Diagrams | ~30+ |
| Rating | "Cautious Watch" (probability-weighted EV ~$900/share vs. $1,464 current) |

---

## 1. Company Strategic Positioning: Process Control Dominance

**Lines ~142-340 (Ch2)**

### Core Position
- KLA holds **63% market share** in semiconductor process control (up from 50% in 2010), making it the undisputed leader in inspection/metrology equipment.
- Founded 1975, HQ Milpitas CA, CEO Rick Wallace since 2006 (19.5 years), ~15,000 employees.
- Revenue $12.7B TTM, gross margin 61.9%, operating margin 42.4%, ROIC 78.3%.

### Three-Phase Strategic Evolution
1. **Phase 1 (1975-2005)**: Optical inspection technology foundation. KLA-Tencor merger in 1997 added thin-film metrology.
2. **Phase 2 (2006-2018)**: Rick Wallace's "depth over breadth" strategy. Built world's largest semiconductor defect database (30+ years, trillions of samples). Data analytics platformization (Klarity/5D Analyzer).
3. **Phase 3 (2019-present)**: Selective expansion + AI transformation. Orbotech acquisition ($3.4B), ECI Technology ($431.5M). AI/ML embedded into inspection platforms (aiSIGHT/Kronos/ICOS). Advanced packaging from near-zero to $925M.

### Key Strategic Insight for CEOs
Each phase built an irreplicable foundation for the next: optical technology --> data flywheel --> AI-enhanced inspection. Competitors cannot skip phases -- even with superior AI algorithms, lacking 30 years of training data and installed base makes replication impossible. This "layered capability accumulation" model explains the 8-12 year catch-up window.

### "Information Business" Economics
KLA's core output is **information** (where defects are, whether dimensions are correct), not physical change. This creates software-like economics: near-zero marginal cost per additional wafer inspected, data network effects (more inspection --> better algorithms --> higher yield --> more demand), and low capital intensity (optical systems last 10-15 years). This explains the 62% gross margin (near enterprise software levels) vs. 47% for etch/deposition peers.

---

## 2. Technology Roadmap and AI/ML Integration

**Lines ~428-650 (Ch3.3-3.4, Ch4.2), Lines ~1287-1490 (Ch7-Ch8)**

### Three Structural Demand Drivers (Independent of WFE Cycle)

**Driver 1: EUV --> High-NA EUV**
- EUV multi-patterning at 2nm/1.4nm may increase inspection steps 2-3x. TSMC N2 uses 13-15 EUV layers (vs. N3's ~10). Each LELE layer needs 2x reticle inspection + 2x overlay metrology + 2x defect inspection.
- Per-wafer EUV inspection cost rises from ~$1,500-3,000 (N3) to ~$2,500-6,000 (N2).
- High-NA EUV (0.55NA) tightens overlay tolerance from +/-2nm to +/-1nm, directly increasing metrology usage frequency.

**Driver 2: 3D Stacking (NAND + HBM)**
- HBM4 (16-Hi) doubles inspection steps vs. HBM3e (8-Hi). DRAM process control intensity already up ~200bps from pre-EUV, HBM adds ~100bps more.
- Per-wafer HBM inspection cost: $150-250 (vs. traditional DRAM $30-50).

**Driver 3: Advanced Packaging (CoWoS/SoIC/Fan-out)**
- Process control spend density is 5-6x higher in 2.5D/3D packaging vs. traditional.
- Market CAGR 35-45% for advanced packaging inspection specifically.

### AI/ML Integration Strategy
KLA's AI strategy is **defensive first, offensive second**:

| Product | Technology | Value |
|---------|-----------|-------|
| aiSIGHT | ML automatic defect classification | 99.9% accuracy, replaces manual review |
| Kronos 1190 | Deep learning defect detection | WLP inspection for advanced packaging |
| ICOS F160XP | AI-driven quality control | 100% IR inspection at 2x throughput |
| 5D Analyzer | ML data analytics | Lithography process optimization |
| MACH Platform | Predictive analytics suite | SaaS-like subscription model |

**Strategic Logic**: If KLA doesn't embed AI into its products, competitors could use AI to close the optical hardware gap. By combining 30 years of defect data with AI first, KLA converts its data moat from "passive accumulation" to "active platformization."

**Three-Layer Business Model Evolution**: "Equipment + Service Contracts" --> "Equipment + Service + Data Analytics Subscriptions." MACH penetration could add $300-500M/year in high-margin (>80%) software revenue by FY2028-2030, raising recurring revenue to 30%+ (vs. 22% today).

### AI Positioning in Value Chain: L1 x S1 = Indirect Beneficiary
- KLA does NOT deserve an AI valuation premium. It is an indirect beneficiary with 2-4 quarter transmission delay.
- AI net revenue increment: ~$975-1,050M CY2025 (~7.5% of revenue), potentially $1,750-2,250M by CY2027 (~11-14%).
- Correct valuation treatment: incorporate AI upside into DCF growth rates (+0.5-1pp), NOT into P/E multiples.

### NVDA Transmission Chain
- KLA advanced packaging revenue / NVDA data center revenue = stable at 0.55-0.58%.
- From H100 to R100 (CY2027), per-GPU inspection complexity grows 2.5-3.5x.
- Total chain amplification: 60-240x (KLA captures <0.5% of end GPU value).

---

## 3. Market Share Dynamics in Metrology/Inspection

**Lines ~341-384 (Ch3.1), Lines ~688-712 (Ch4.5), Lines ~1060-1285 (Ch6)**

### Sub-Segment Share Map

| Sub-Segment | Market Size (est.) | KLA Share | Key Competitor |
|-------------|-------------------|-----------|----------------|
| Optical wafer inspection (brightfield) | ~$3.5B | ~60% | Hitachi |
| Optical wafer inspection (darkfield) | ~$2.5B | >50% | Hitachi, Lasertec |
| Reticle/photomask inspection | ~$1.6B | **>80%** | Lasertec (~30%) |
| CD-SEM metrology | ~$1.5-2.0B | ~15-20% | Hitachi (~70%) |
| Overlay metrology | ~$1.5B | ~40% | ASML YieldStar (~35%) |
| Advanced packaging inspection | ~$8-10B | ~50% | Camtek, AMAT, Onto |

### Share Growth Trajectory
- 2010: ~50% --> 2015: ~53% --> 2019: ~58% --> 2024: ~63%
- **Ceiling analysis**: 65-67% is the realistic ceiling (3-5 years). Beyond 67% is unlikely due to customer diversification needs, antitrust attention, and ASML competition in overlay.
- Each 1pp share gain = ~$80-100M revenue increment.
- Biggest source of recent gains: advanced packaging inspection (10% --> 50%), not displacement of incumbents in optical inspection.

### Moat Quantification: 8.40/10 (Wide)

| Dimension | Score (/10) | Weight | Key Evidence |
|-----------|-------------|--------|-------------|
| Technology barriers | 8.5 | 25% | BBP light source + algorithms + 12-18 month qualification |
| Data network effects | 9.0 | 25% | 30-year database, 15K installed base, >99.5% accuracy |
| Switching costs | 8.5 | 20% | $250-500M per fab; TSMC full switch ~$2.5-5.0B |
| Scale economies | 7.5 | 15% | Installed base --> service revenue + R&D amortization |
| Intangible assets | 8.0 | 15% | Inspection standard-setter + CEO 19.5-year tenure |

**Competitor catch-up time**: 8-12 years. Zero Top-5 fab has ever systematically switched away from KLA in the past 15 years.

**5-year moat degradation prediction**: 8.40 --> ~8.0/10 (still Wide). Main erosion risk: if general AI models narrow the defect classification accuracy gap from 4% to 1%.

### Competitive Threat Hierarchy
1. **AMAT e-beam**: "Border friction, not core invasion." Threatens CD-SEM + defect review (~25-30% of KLA inspection revenue). Max impact: -3-4% total revenue.
2. **Hitachi High-Tech**: "Existing equilibrium." Dominates CD-SEM (~70%) but has no BBP optical products and cannot invade KLA's core.
3. **Lasertec**: "Local skirmish." EUV photomask sub-segment only (~$1.6B market). Even 100% Lasertec share = one quarter of KLA revenue.
4. **Chinese domestic**: "Geographically isolated." Capable at 28nm+, >10 years behind at 7nm and below.
5. **ASML HMI**: "Long-term remote threat." Multi-beam e-beam may take $200-400M in EUV-specific applications (1.5-3% of KLA revenue).

---

## 4. Software-Like Business Model Characteristics

**Lines ~261-274 (Ch2.5), Lines ~516-540 (Ch3.7)**

### Three "Extreme" Traits

| Trait | KLA | Industry Comparison | Implication |
|-------|-----|---------------------|------------|
| **Ultra-light assets** | CapEx/Revenue 3% | AMAT ~5%, ASML ~8%, TSM ~32% | FCF approximates net income |
| **Ultra-high recurring** | 22% service revenue, 52Q consecutive growth, 75% subscription, 95% renewal | AMAT AGS ~70-75% truly recurring | Revenue floor in downturns |
| **Ultra-low dilution** | SBC/Revenue 2.2%, buyback covers SBC 653% | AMAT ~4%, LRCX ~3% | Share count declining annually |

### Industry-Leading Profitability

| Metric | KLAC | AMAT | LRCX | ASML |
|--------|------|------|------|------|
| Gross Margin | **61.9%** | 47.6% | 47.8% | 51.7% |
| Operating Margin | **42.4%** | 29.0% | 30.2% | 35.8% |
| Net Margin | **35.8%** | 26.2% | 27.0% | 26.8% |
| ROE | **100.7%** | 46.2% | 72.1% | 68.3% |
| ROIC | **78.3%** | 31.5% | 38.8% | 42.6% |

**Root cause of profitability leadership**: Inspection output = information (not physical change). Information businesses have near-zero marginal costs, data network effects, and lower capital intensity. This is why KLA's 62% gross margin approaches enterprise software, while etch/deposition peers sit at 47%.

---

## 5. Capital Allocation Strategy

**Lines ~1826-2068 (Ch10)**

### Capital Allocation Framework
- FCF allocation: ~82% returned to shareholders (60-65% buyback, 20-22% dividend).
- Remainder: R&D (~10-12% of revenue), CapEx (~3%), opportunistic M&A.

### Buyback Track Record: 5-Year $11B with ~26% Annual Alpha

| FY | Buyback ($M) | Est. Avg Price | Current | Return |
|----|-------------|----------------|---------|--------|
| 2021 | 939 | ~$290 | $1,464 | +405% |
| 2022 | 4,868 | ~$365 | $1,464 | +301% |
| 2023 | 1,312 | ~$380 | $1,464 | +285% |
| 2024 | 1,736 | ~$620 | $1,464 | +136% |
| 2025 | 2,150 | ~$850 | $1,464 | +72% |
| **Total** | **$11,005** | **~$460 weighted** | -- | **~+218%** |

- Buyback contributed ~33% of historical EPS CAGR (7.5pp of 22.7pp).
- Share count: 140M (FY2021) --> 132M (FY2026 Q2), -5.7%.
- New $5B authorization (FY25Q3) = ~2.8% of float at current price.
- Strategy: "Systematic repurchase" (fixed FCF proportion), NOT market timing. FY2022 $4.87B purchased at $290-400 during market panic.

### Dividend Policy
- 16 consecutive years of growth, CAGR ~14.2%.
- Current yield: 0.33% (low), but FCF payout ratio only 24.2% -- massive room for increase.
- 5-year yield-on-cost doubles at 14% growth rate.

### Debt Structure
- Total debt $6.28B, net debt ~$4.0B.
- Net debt/EBITDA: ~0.75x (well below 3x safety threshold).
- Interest coverage: >20x. Altman Z-Score: 14.17 (extreme safety).
- Leverage purpose: optimize capital structure, not operational necessity. ROIC 78.3% vs. weighted interest rate 3.5-4.0% = 74pp+ spread.

### M&A Philosophy: "Capability Enhancement, Not Diversification"
- Orbotech ($3.4B, 2019): B+ grade. Expanded TAM but 27x EV/EBITDA was expensive.
- ECI Technology ($431.5M, 2022): A- grade. Electrochemical metrology complement.
- Wales R&D/manufacturing facility ($138M, 2026): Compound semiconductor + advanced packaging signal.
- **Organic R&D ROI (1.0-1.3x/year) far exceeds acquisition ROI** -- explains Wallace's preference for organic growth.

### R&D Investment
- Stable at 10-14% of revenue ($1.0-1.2B/year).
- FY2026-2028 focus areas: (1) AI-enhanced inspection algorithms, (2) High-NA EUV post-inspection, (3) X-ray metrology extension, (4) MACH software platformization, (5) Compound semiconductors (SiC/GaN).

---

## 6. China Exposure and Risk Management

**Lines ~237-260 (Ch2.4), Lines ~502-514 (Ch3.6), Lines ~3580-3793 (Ch18)**

### Geographic Revenue Distribution

| Region | Revenue Share | Trend |
|--------|-------------|-------|
| Taiwan | ~30% | TSMC N2 expansion |
| China | ~26% (mid-to-high 20%) | Stabilizing post-export controls |
| Korea | ~20% | HBM expansion + Samsung GAA |
| North America | ~10% | Intel reshoring |
| Japan + Europe | ~14% | Rapidus + TSMC Kumamoto |

**Greater China concentration: 56%** (Taiwan 30% + China 26%) is the core geopolitical risk.

### China Revenue Structural Decomposition (~$3.3B)

| Sub-Segment | Revenue (est. $M) | Control Sensitivity | Domestic Substitution Threat |
|-------------|-------------------|--------------------|-----------------------------|
| Advanced process (<7nm) | $200-300 | **Already restricted** | Very low |
| Mature process optical (28nm+) | $1,200-1,500 | Medium | **Medium-High** |
| Photomask inspection | $100-150 | Medium-High | Very low |
| CD-SEM/metrology | $400-600 | Medium | Low |
| Service (China installed base) | $500-700 | Low-Medium | Low |

### Three Export Control Scenarios

| Scenario | Probability | Revenue Impact | Valuation Impact |
|----------|------------|----------------|------------------|
| S1: Status quo (gradual decline) | 45% | -$300-350M/year | <-2% (already priced) |
| S2: Further tightening (optical added) | 30% | -$1,250-1,520M (-10-12%) | -22-28% (P/E + revenue hit) |
| S3: Moderate relaxation | 25% | Stable at 27-28% | +3-5% |
| **Probability-weighted annual impact** | | **-3.0%/year** | |

### Domestic Substitution: Permanent Loss Risk
- SiCarrier: 31 products launched in 2025, first commercial orders at mature process fabs.
- NAURA/CXMT/JCET ecosystem accelerating.
- **5-year irreversible loss: $450M-$1.0B** in mature-process inspection (30-50% of China mature market).
- Each year export controls persist, "irreversible lock-in" of domestic alternatives increases ~5-8pp.

### KLA's Most Likely Strategic Response: A+C
- **Option A**: "Comply + geographically diversify" (current strategy). Zero compliance risk, potential CHIPS Act subsidies.
- **Option C**: "Accelerate service transformation." Shift China focus from new equipment to service/upgrades/software (less control-sensitive).
- Net: China revenue from $3.3B gradually to $2.0-2.5B over 5 years, but margin may slightly improve (service mix shift).

### Geographic Substitution Potential
- India/SE Asia/Japan/US new fab demand: ~$530-1,050M/year, replacing 40-60% of China losses.
- Quality is higher (advanced process fabs in US/Japan have higher ASP per inspection tool), partially offsetting margin dilution.

---

## 7. Service Business Strategy

**Lines ~838-1058 (Ch5)**

### Revenue Quality
- **$2.68B** (FY2025), **52 consecutive quarters** of YoY growth (13 years).
- 75% from 3-year subscription contracts, ~95% renewal rate.
- "True recurring" ratio: 85-90% (vs. AMAT AGS 70-75%, LRCX CSBG 80-85%).

### Dual Growth Engine

| Driver | FY2020 | FY2025 | CAGR | Share of Growth |
|--------|--------|--------|------|-----------------|
| Installed base (units) | ~14,000 | ~18,000 | ~5.2% | ~36% |
| Revenue per unit | ~$93K | ~$149K | ~10.0% | ~64% |

Per-unit revenue growth (software penetration, contract upgrades, algorithm update frequency) is the dominant driver -- meaning service revenue can grow even if new equipment installations slow.

### Service Revenue Tiering

| Tier | Annual Contract Value | Content | Customer Mix |
|------|----------------------|---------|-------------|
| Basic Maintenance | $80-120K | Preventive maintenance + parts | ~25% |
| Advanced Service | $150-200K | + Remote diagnostics + upgrades | ~45% |
| Full Package | $200-250K | + Performance optimization + analytics | ~30% |

Upselling path from basic to full package is a key margin expansion lever.

### Independent Valuation: ~$25-27B
- EV/Revenue 8-10x, EV/EBITDA 18-22x, DCF ~$28B.
- Represents 13-14% of current $192B market cap.
- Even if KLA stopped selling any new system tomorrow, existing installed base service = $20-30B terminal value.

### Cycle Buffering Effect
- Every WFE downturn: service revenue share automatically rises 3-4pp (automatic stabilizer).
- In typical WFE -10-15% downturn: service +5-8% narrows total revenue decline to -3-8%.
- In extreme WFE -20%: total revenue decline limited to -12-16% (vs. system revenue -22-25%).

### Software Platform (MACH)
- Software revenue estimated at 10-15% of service ($270-400M).
- Klarity (fab-level defect data management), 5D Analyzer (litho control), aiSIGHT (ML defect classification at 99.9% accuracy).
- Strategic value exceeds direct revenue: once a customer deploys Klarity and accumulates data, willingness to switch to competitor hardware drops dramatically (lock-in).

---

## 8. Key Strategic Risks and Growth Opportunities

**Lines ~73-92 (Ch1.3-1.4), Lines ~2400-2666 (Ch12), Lines ~5703-5900 (Ch26)**

### Top Risks (Ranked by Severity)

**Risk 1: Valuation Compression (BW-4, vulnerability -22.5 to -27.5%)**
- P/E TTM 42.5x is 2.1x the historical 20x median. Forward DCF at WACC 9.5% supports only $835/share (-43%).
- Need WACC compression to 7.8% to justify current price (implies equity risk premium of only 3.3%, historically low).
- P/E > 30x has never sustained longer than 18 months in KLA history.
- **Transmission risk**: BW-2 (growth miss) --> BW-4 (P/E compression) probability = 0.85 (near-certain).

**Risk 2: WFE Cycle Peaking (BW-2, vulnerability -10.0 to -15.0%)**
- CY2027 may be cycle peak (4th year of upcycle, matching historical average).
- **Critical finding**: 5/5 historical WFE downturns saw KLA organic revenue decline (not the +8-10% "own growth" management claims). Corrected zero-WFE-growth baseline: +0-4%, not +8-10%.
- FY2027E consensus +19.6% requires WFE growth far above SEMI's +7.3% forecast -- gap must come from advanced packaging + inspection intensity.

**Risk 3: Geopolitical (compound risk)**
- Taiwan 30% + China 26% = 56% Greater China concentration.
- Cross-strait conflict scenario: -62% impact. Extreme export control: -85%.
- National substitution risk: $450M-$1B irreversible over 5 years.

**Risk 4: Margin Pressure (BW-1, vulnerability -6.0 to -10.0%)**
- DRAM cost (75-100bps) + tariffs (50-100bps) + advanced packaging dilution (30-50bps) = gradual ~150-250bps annual erosion.
- Advanced packaging gross margin (55-58%) is below traditional inspection (65%+); as mix shifts, blended margin compresses.

**Risk 5: CEO Succession**
- Wallace is 67, 19.5-year tenure approaching retirement window.
- CFO Bren Higgins is probable internal successor (50% probability).
- Weighted succession risk: -1.5 to -3% (manageable, not structural).

### Top Growth Opportunities

**Opportunity 1: Supply Constraint Release --> Revenue Acceleration**
- Management: "virtually sold out." Suppressed demand ~$150-350M/quarter (5-10% of revenue).
- H2 2026 bottleneck easing could push FY2027 above +19.5% consensus.

**Opportunity 2: 2nm GAA Architecture Inspection Explosion**
- N2 manufacturing steps: 400-600 (vs. N3 350-450). Inspection share rises from ~15% to ~20% of total steps.
- Three simultaneous GAA ramps (TSMC/Samsung/Intel) -- unprecedented in history.

**Opportunity 3: HBM4 Generational Upgrade**
- HBM4 (16-Hi) doubles inspection steps vs. HBM3e (8-Hi).
- KLA Axion T2000 X-ray metrology has technical monopoly in this application.
- From H100 to R100 (CY2027): per-GPU inspection complexity +2.5-3.5x.

**Opportunity 4: AI CapEx Supercycle**
- Hyperscaler combined CapEx ~$650-700B (+70% YoY), far above prior +19% consensus.
- Downstream: TSMC CoWoS capacity doubling --> KLA inspection demand (lagged 2-4Q).

**Opportunity 5: DRAM EUV Conversion (Under-Appreciated)**
- Full EUV DRAM expected CY2027-2028. Could add $200-350M/year incremental KLA revenue.
- Most analysts focus on logic (2nm GAA) and packaging (HBM); DRAM EUV is a stealth growth engine.

---

## Key Strategic Insights for CEO Audience

### Insight 1: "The Most Expensive Insurance Policy in Semiconductors"
KLA's products are the "insurance" of semiconductor fabs. Not buying = far greater cost than the premium. This asymmetric economics explains why process control equipment gets cut less in downturns, why KLA maintains 62% gross margins, and why customers never fully switch away. For any company evaluating KLA as a supplier or partner, this means KLA's pricing power is structural, not negotiable.

### Insight 2: "Data Moat Trumps Hardware Moat"
KLA's most durable competitive advantage is not its optical hardware (which can theoretically be replicated in 5-8 years) but its 30-year defect database with trillions of samples across every process node from 180nm to 3nm. This data, combined with AI, creates a flywheel that competitors cannot shortcut. The strategic implication: any company building a competing inspection platform needs to plan for a 10-15 year data accumulation phase, regardless of hardware quality.

### Insight 3: "Five-Engine Growth Model Has a Fragility Everyone Ignores"
Management claims 8-10% baseline growth even with zero WFE growth. Historical evidence refutes this: 5/5 WFE downturns saw negative KLA organic growth. The corrected baseline is +0 to +4%. The engines are not truly independent -- they share WFE cycle as a systemic factor. Only the service engine (8/10 independence score) is genuinely cycle-resilient.

### Insight 4: "Valuation is the Single Biggest Risk"
KLA's fundamental quality is among the best in the semiconductor supply chain. But P/E 42.5x (TTM) has already pre-paid for 3 years of earnings growth. Every valuation method (DCF, SOTP, probability-weighted) produces a value below current price. The company needs WACC compression to 7.8% (equity risk premium 3.3%, historically low) just to justify today's stock price. This is a "wonderful company at a full price" situation.

### Insight 5: "China Is a Binary, Not a Gradient"
Export control risk is not a smooth, predictable gradient. It is a binary event distribution: either minimal impact (already priced) or severe impact (-22 to -28% if optical inspection added to restrictions). The $450M-$1B irreversible domestic substitution loss is the truly concerning strategic dimension -- these customers will not return even if controls are relaxed.

### Insight 6: "Service Business is the Crown Jewel Hidden in Plain Sight"
52 quarters of consecutive growth, 75% subscription at 95% renewal, independent valuation $25-27B. This is the closest thing to a SaaS business inside a semiconductor equipment company. It provides the floor valuation ($20-30B even if new equipment sales go to zero) and the cycle buffer that no peer can match.

### Insight 7: "The NVDA Transmission Chain -- Critical but Tiny"
KLA captures <0.5% of the end GPU value. The amplification factor of 60-240x (KLA $1 --> NVDA $60-240 in GPU revenue) means KLA is indispensable but marginal. This is precisely why KLA should NOT receive an AI valuation premium -- the correct approach is to flow AI growth into DCF revenue assumptions, not P/E multiples.

---

## Section-Line Reference Index

| Section | Primary Lines | Chapters |
|---------|--------------|----------|
| 1. Strategic Positioning | 142-340 | Ch2 |
| 2. Technology Roadmap / AI | 428-650, 1287-1640 | Ch3.3-3.4, Ch4.2-4.3, Ch7, Ch8, Ch9 |
| 3. Market Share Dynamics | 341-384, 688-712, 1060-1285 | Ch3.1, Ch4.5, Ch6 |
| 4. Software-Like Model | 261-274, 516-540 | Ch2.5, Ch3.7 |
| 5. Capital Allocation | 1826-2068 | Ch10 |
| 6. China Exposure | 237-260, 502-514, 3580-3793 | Ch2.4, Ch3.6, Ch18 |
| 7. Service Business | 838-1058 | Ch5 |
| 8. Risks & Opportunities | 73-92, 2400-2666, 5703-5900 | Ch1.3-1.4, Ch12, Ch26 |
| Valuation Methods | 4240-4972 | Ch21-Ch24 |
| Probability-Weighted EV | 5380-5640 | Ch25 |
| Investment Conclusion | 5703-5900 | Ch26 |
| Knowledge Registry | 5910-6060 | Ch27 |
| Framework Metadata | 6057-6291 | Ch28 |
