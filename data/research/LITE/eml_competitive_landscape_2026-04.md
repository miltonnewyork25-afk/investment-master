# Lumentum EML Competitive Landscape Research
> Date: 2026-04-05 | Sources: Web search (NVIDIA newsroom, SEC 8-K, semiconductor-today, CNBC, industry reports)

---

## 1. EML Market Share

**Lumentum claims ~50-60% of global EML volume** (self-reported, multiple analyst sources confirm).

### By Speed Grade:
- **100G/lane EML**: Currently dominant product. FQ2 2026 broke quarterly EML shipment record, led by 100G lane speeds.
- **200G/lane EML**: ~5% of unit volume but ~10% of Datacom laser chip revenue (2x ASP vs 100G). Projected to rise to 25% of product mix by end-2026. Shipments to multiple customers began FQ2 2025.

### Market Size Context:
- Global demand for 800G+ optical transceiver modules: ~24M units in 2025, surging to ~63M units by 2026
- Translates to approximately 200-500M EML chips annually
- Lumentum capacity expansion: +40% mid-2024 to mid-2025, another +40% by end-2025. Still supply-constrained.

### Key Competitors:
| Company | Position | Notes |
|---------|----------|-------|
| **Lumentum (LITE)** | #1, ~50-60% volume share | Dominant InP EML, supply-constrained |
| **Coherent (COHR, ex II-VI)** | #2, significant share | World's first 6-inch InP wafer fab, qualifying 200G EML on 6-inch. Goal: double InP capacity by end-2026 (~80% complete). Also VCSEL + SiPh |
| **Broadcom (AVGO)** | Vertically integrated | Makes own EML for internal transceivers, not primary merchant supplier |
| **Mitsubishi Electric** | Niche, telecom focus | Smaller share in datacom EML |
| **Lumentum + Coherent** | Combined ~80%+ estimated | Top 2 dominate merchant EML market |

---

## 2. Silicon Photonics Threat

### Current Penetration (800G):
- SiPh at ~10% of 800G module shipments in 2024 (~1M SiPh modules in H2 2024)
- Growing to 20-30% penetration in 2025
- Some estimates: 40-45% SiPh share in 800G by mid-2026

### 1.6T Timeline:
- 2026 = "Year of 1.6T" with first Tier-1 cloud deployments
- Early 1.6T ramp driven by **EML + SiPh** based transceivers
- 200G VCSEL-based 1.6T ramping H2 2026
- SiPh could reach 30-40% of 1.6T market once mature (likely 2027+)

### EML vs SiPh Trade-offs:

| Dimension | EML | Silicon Photonics |
|-----------|-----|-------------------|
| **Maturity** | Proven, high-volume | Emerging, scaling |
| **Cost** | Expensive, constrained fab | Lower per-bit (CW lasers cheaper, fewer needed) |
| **Performance** | High modulation efficiency | Lower efficiency, needs higher drive voltage |
| **Manufacturing** | InP fabs (specialized, limited) | Can use 200/300mm Si fabs (scalable) |
| **Supply** | Constrained (Lumentum/Coherent bottleneck) | Broadening supply base |
| **Integration** | Discrete components | Highly integrated PIC |

### Key Insight:
SiPh uses CW (continuous wave) lasers which are cheaper and easier to make than EMLs. A 1.6T SiPh module needs only 2 CW lasers vs 4 EML lasers. **Cost per bit advantage goes to SiPh at scale, but EML has performance/maturity advantage today.**

### Co-Packaged Optics (CPO):
- CPO offers 5x better power efficiency vs pluggable (5.5W vs ~15W per 800Gb/s port)
- Volume CPO deployments expected at hyperscalers 2026-2027
- Could reach ~35% penetration in AI data centers by 2030
- **Lumentum is developing CPO with NVIDIA** (part of $2B investment)
- Key risk: if CPO laser fails, may lose entire $10K+ GPU package

---

## 3. Chinese Competitors

### Market Position:
Chinese vendors dominate **transceiver module** assembly but lag in **laser chip** components.

| Company | Revenue | Strength | EML Status |
|---------|---------|----------|------------|
| **Innolight (中际旭创)** | ~$3.3B (2025, +114% YoY) | #1 800G module maker, ~2/3 of Nvidia 800G volume | Buys EML chips from Lumentum/Coherent |
| **Eoptolink (易飞达)** | ~$1.2B (2025, +175% YoY) | Jumped to #3 globally | Buys EML chips externally |
| **Hisense Broadband** | Significant | 10G-800G full range | Module assembly, not chip |
| **Accelink (光迅科技)** | Growing | DFB/PIN large-scale, EML entering small-scale production | 100G EML chips released, no large-scale delivery yet |
| **Everbright (长光华芯)** | Growing | Laser chips | DFB/PIN shipped, EML early stage |

### Self-Sufficiency Gap:
- **Fully localized**: Passive components (AWGs, isolators, PLCs), packaging
- **Partially localized**: DFB lasers, PIN detectors (large-scale)
- **Not yet localized**: **EML chips** (small-scale production only, no volume delivery), DSPs (Broadcom/Marvell dominated)
- Chinese cloud providers planning doubled optical purchases in 2025

### Key Insight:
Chinese companies captured ~60% of merchant 800G transceiver market BUT still depend on Lumentum/Coherent for EML laser chips. **This is the chokepoint.** 100G EML chips from Chinese suppliers exist in lab/small-scale but no volume production confirmed.

---

## 4. Coherent (COHR) vs Lumentum (LITE) Comparison

### Portfolio Breadth:

| Dimension | Lumentum | Coherent |
|-----------|----------|----------|
| **Laser Tech** | InP EML specialist | Three routes: SiPh + InP EML + GaAs VCSEL |
| **Datacom Revenue** | Cloud & Networking: $1.41B (FY2025) | Datacenter & Comms: $1.21B/quarter (Q1 FY2026, +34% YoY) |
| **Total Revenue** | $1.645B (FY2025) | ~$5.5B+ (FY2026 run rate, much more diversified) |
| **Industrial** | Commercial Lasers: $234M | Materials, industrial lasers, SiC |
| **Key Differentiator** | EML dominance, laser chip purity | Vertical integration, 6-inch InP, SiC |
| **Manufacturing Edge** | InP laser chip leader | World's first 6-inch InP wafer fab |
| **NVIDIA Investment** | $2B Series A Preferred | $2B (parallel deal) |

### Stock Performance:
- Lumentum: +340% in 2025
- Coherent: +95% in 2025

### Coherent's 6-inch InP Advantage:
Coherent established the world's first 6-inch InP wafer fab capability (announced March 2024). This is significant because:
- Larger wafers = more dies per wafer = lower cost per chip
- Qualifying 200G EML, 200G DFB-MZ, 100G EML, photodetectors on 6-inch
- Goal: double InP capacity by end-2026 (~80% complete)
- **This could erode Lumentum's EML cost advantage over time**

---

## 5. Customer Concentration

### What We Know:
- **>60% of Lumentum revenue** from AI/cloud infrastructure customers
- **~3 hyperscale buyers** represent majority of AI/cloud revenue
- Cloud & Networking segment: $1.41B (85.7% of FY2025 revenue $1.645B)
- **One customer = 29% of revenue** in a single quarter of FY2024 (likely via Cloud Light acquisition - module business)
- Key OEM customers include **Ciena and Cisco** (telecom/networking equipment), though their share has shifted as cloud direct grew

### Indirect vs Direct:
- **Direct cloud**: Hyperscalers buy Lumentum modules (via Cloud Light acquisition) directly
- **Indirect cloud**: Hyperscalers buy transceivers from Innolight/Eoptolink which contain Lumentum EML chips
- True customer exposure to hyperscalers is **higher than reported** because EML chips flow through Chinese module makers

### 10-K Disclosure Gap:
Specific >10% customer names not found in search results. Historical 10-K disclosures typically show 2-3 customers above 10% threshold. Need to check actual SEC filing for FY2025 data.

---

## 6. NVIDIA $2B Investment Terms

### Structure:
- **Instrument**: Series A Convertible Preferred Stock
- **Shares**: 2,876,415 shares at $695.31/share = $2.0B
- **Conversion**: One-for-one into common stock, at NVIDIA's option (after HSR waiting period expires) or automatically before a qualified sale
- **Dilution**: ~$2B / $6.48B pre-deal market cap = ~31% potential dilution if fully converted
- **Existing convertible debt**: $3.18B in convertible notes (additional dilution risk)

### Voting & Governance:
- **Voting rights**: As-converted basis on most matters
- **NO board seat**: Series A holders explicitly excluded from voting for election of directors
- **Dividends**: Pro-rata with common stock on as-converted basis
- **No preemptive or redemption rights**

### Commercial Terms:
- **Multi-billion dollar purchase commitment** from NVIDIA (nonexclusive)
- **Future capacity access rights** for advanced laser components
- **Support for new U.S. fabrication facility** (R&D + manufacturing)
- **Silicon photonics and CPO** joint development
- **Nonexclusive** agreement (NVIDIA also invested $2B in Coherent)

### Key Context:
- NVIDIA split $4B equally: $2B Lumentum + $2B Coherent
- Purpose: Secure optical supply chain for gigawatt-scale AI factories
- Lumentum stock initially surged, then pulled back as investors digested dilution terms

---

## Supplementary Data Points

### Short Interest:
- **21.9% of float** short (11.15-11.49M shares)
- Peer group average: 6.05% short
- **3.6x peer average** short interest — significant bearish positioning

### Financial Trajectory:
- FY2025 revenue: $1.645B
- Q2 FY2026 revenue: $665.5M (+65.5% YoY)
- Q3 FY2026 guidance: $780-830M
- Annualized run rate approaching $3B+

### Top 5 Optical Transceiver Suppliers (2025 revenue):
1. Coherent Corp
2. Lumentum
3. Broadcom
4. Accelink
5. Innolight
(These 5 captured ~50% of total market revenue)
