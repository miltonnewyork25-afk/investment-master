# Lumentum CPO / OCS / 3.2T Research Notes
# Date: 2026-04-05
# Sources: Web research (EDN, SemiAnalysis, Cignal AI, NVIDIA, Lumentum IR, Seeking Alpha, etc.)

## 1. CPO Threat to Pluggable Transceivers

### What is CPO
Co-Packaged Optics integrates optical engines directly onto/adjacent to the switch ASIC package, eliminating traditional pluggable transceiver modules. Light sources (lasers) are either integrated or supplied via external laser source (ELS) modules.

### Key Players
- **Broadcom**: Pioneer — Tomahawk 4-Humboldt (Gen1, 2021) → Tomahawk 5-Bailly (Gen2, first volume CPO). 50,000+ CPO switches shipped by 2025. Gen3 200G/lane CPO demo May 2025.
- **NVIDIA**: Quantum-X InfiniBand CPO switches shipping early 2026 (115 Tb/s, 144x800G ports). Spectrum-X Ethernet CPO in H2 2026. 1.6T and 3.2T silicon photonics CPO chips.
- **Ayar Labs**: TeraPHY optical engines integrated into GUC ASIC workflow (Nov 2025). Raised $500M in March 2026 for mass production.
- **Intel**: Silicon photonics foundry capabilities, supplying optical engines.
- **Celestial AI**: Photonic fabric for scale-up, estimating $1B revenue run rate by end CY2028 (primarily Amazon Trainium 4).

### Power Advantage
- 800G DR4 pluggable transceiver: ~16-17W
- CPO equivalent (optical engine + external laser): ~4-5W per 800G
- **73% power reduction** — this is the core driver for CPO adoption in power-constrained AI data centers.

### Threat Level to Pluggables
- CPO directly eliminates the need for pluggable modules in deployed switches
- BUT: pluggable modules offer flexibility, serviceability, multi-vendor ecosystem maturity
- LightCounting: optical modules will continue to account for majority of DC optical links through the decade
- CPO unlikely to see massive volume for scale-out in 200G/lane generation

---

## 2. CPO Adoption Timeline

| Milestone | Timeline | Source |
|-----------|----------|--------|
| Broadcom 50K+ CPO switches shipped | By 2025 | EDN |
| NVIDIA Quantum-X InfiniBand CPO shipping | Early 2026 | NVIDIA |
| NVIDIA Spectrum-X Ethernet CPO | H2 2026 | NVIDIA |
| Small CPO volumes appear | 2026 | Multiple |
| Manufacturing at high volume ready | **At least 2027** | Cignal AI / SemiAnalysis |
| NVIDIA Rubin Ultra CPO launch | Late 2027 (target) | SemiAnalysis |
| Celestial AI $1B run rate (scale-up) | End CY2028 | SemiAnalysis |
| Large-scale CPO deployments | **2028-2030** | Yole Group |
| CPO market >$20B | 2036 | IDTechEx (37% CAGR from 2026) |

**Consensus**: Initial products 2026-2027, volume production 2027-2028, truly large-scale 2028-2030.
**Pluggable dominance**: Through 2027 at minimum.

---

## 3. Lumentum's CPO Strategy — NOT Purely Pluggable

Lumentum is actively pursuing CPO as a **key growth vector**, not just pluggables.

### CPO Products
1. **Ultra-High-Power (UHP) Lasers**: 400mW UHP laser (1310nm), delivers >1.0W at 25C, >800mW at 50C — purpose-built for CPO and silicon photonics.
2. **ELSFP Modules**: External Laser Source in pluggable form factor for CPO architectures. Sampling CQ1 2026. These supply light to CPO optical engines.
3. **16-channel DWDM Laser Source**: For next-gen CPO architectures requiring high bandwidth density + reduced fiber count.
4. **Received largest single purchase commitment for UHP lasers in company history** — San Jose fab capacity investment for significant CPO revenue ramp.

### NVIDIA $2B Investment (March 2, 2026)
- NVIDIA investing $2B in Lumentum for R&D, capacity, operations
- Specifically for new U.S.-based wafer fabrication facility
- Nonexclusive agreement with multibillion purchase commitment + future capacity access rights
- **CPO deliveries beginning in 2027**
- Part of $4B total NVIDIA investment ($2B Lumentum + $2B Coherent)

### Revenue Impact
- Multi-hundred-million-dollar CPO orders delivering early 2027
- Lumentum expects continued growth in UHP lasers for CPO with significant ramp late 2026
- LightCounting: LPO+CPO market for AI clusters doubling from $5B (2024) to >$10B (2026)

### Key Insight for LITE Analysis
Lumentum is **not threatened by CPO — it is a CPO enabler**. The company supplies the critical laser components that CPO systems need. Whether the market goes pluggable or CPO, Lumentum sells lasers/light sources to both architectures. The NVIDIA investment validates this positioning.

---

## 4. OCS (Optical Circuit Switching)

### What is OCS
Optical Circuit Switches provide transparent, any-to-any fiber connectivity using MEMS (micro-electro-mechanical systems) mirror arrays to physically redirect light beams between input and output fiber ports. Unlike electrical packet switches, OCS operates at the physical layer — no protocol conversion, wavelength-agnostic, data-rate-agnostic.

### Key Specs (Lumentum)
- Up to 300x300 port count (high-radix)
- Insertion loss <1.5 dB
- Switching latency: tens of nanoseconds
- Power consumption: very low (MEMS-based)
- Technology: field-proven MEMS beam-steering

### Use Cases in AI Data Centers
1. **Spine-layer replacement** — Google's original use case
2. **AI cluster reconfiguration** — dynamically reassign GPU-to-GPU connections
3. **Scale-up and back-end networks**
4. **Pooled/disaggregated resources**
5. **Campus datacenter interconnect**
6. **Reliability** emerging as defining requirement for AI-class deployments

### Market Size (Cignal AI)
| Year | Market Size | Notes |
|------|------------|-------|
| Historical (5yr) | $500M-$1B | Google internal spend |
| 2026 | ~3x earlier estimate | Cignal AI Feb 2026 revision upward |
| 2028 | >$1B | Cignal AI Jan 2025 forecast |
| **2029** | **>$2.5B** | Cignal AI Dec 2025 — 40% higher than initial forecast |

### Lumentum OCS Position
- **$400M+ OCS backlog** confirmed for H2 CY2026 shipment
- Guidance: ~$100M/quarter OCS revenue by end of 2026
- Target: OCS exceeding **$1B in CY2027**
- Could account for ~50% of total OCS market if trajectory holds
- Ahead of competitors in high-radix (300x300) systems
- OCS is purpose-built for growing AI cluster needs

### Competitors
| Company | Technology | Notes |
|---------|-----------|-------|
| **Google (internal)** | MEMS | Deployed tens of thousands of ports; migrating from internal to commercial solutions |
| **Polatis (HUBER+SUHNER)** | Piezoelectric (DirectLight beam-steering) | Acquired by HUBER+SUHNER |
| **Coherent** | Multiple | Primary commercial rival to Lumentum |
| **Calient.AI** | MEMS | Smaller player |
| **Omnitron** | — | Smaller player |
| **Telescent** | Robotic | Smaller player |
| **iPronics** | Silicon photonics | Co-leads OCP OCS subproject with Lumentum |
| **Oriole Networks** | — | OCP participant |

### Google Migration = Lumentum Tailwind
Google has been the largest OCS user (internal builds). Now migrating to commercial solutions. Lumentum and Coherent are the primary beneficiaries. This migration is expanding the addressable market beyond Google to other hyperscalers.

---

## 5. Pluggable vs CPO Coexistence

### Consensus View: Coexistence for Many Years
- **Pluggable dominance through 2027** at minimum
- **CPO grows alongside pluggables**, not immediately replacing them
- Different use cases favor different architectures:

| Dimension | Pluggable Advantage | CPO Advantage |
|-----------|-------------------|---------------|
| Flexibility | Multi-vendor, hot-swappable | Locked to ASIC design |
| Serviceability | Field-replaceable | Complex replacement |
| Power | 16-17W/800G | 4-5W/800G (73% less) |
| Density | Limited by faceplate | Higher port density |
| Ecosystem | Mature, standardized | Emerging |
| Cost at scale | Higher per-port | Lower at very high volume |

### Market Forecasts Side by Side
- **Pluggable optics market**: $5.6B (2024) → $9.9B (2030), CAGR 9.8%
- **CPO market**: $95M (2025) → $1.05B (2034) [conservative] OR $20B+ by 2036 [IDTechEx aggressive]
- Note: wide range in CPO forecasts reflects uncertainty

### Lumentum Positioning
Lumentum wins in both scenarios:
- **Pluggable world**: sells EML lasers and complete transceiver modules (1.6T DR4 shipping)
- **CPO world**: sells UHP lasers, ELSFP modules, DWDM laser sources
- **OCS**: entirely separate growth vector, complementary to both

---

## 6. 3.2T Transceiver Timeline

### Current State (2026)
- **1.6T transceivers**: Now shipping/sampling. Lumentum 1.6T DR4 OSFP prototype demonstrated at OFC 2026 using 4x 400G differential EML lasers.
- **800G transceivers**: Mainstream ramp. Cignal AI: 800G shipments growing 60% in 2025. 800G coherent pluggable revenue >$1B in 2026.

### 3.2T Timeline
| Milestone | Timeline |
|-----------|----------|
| 3.2T prototypes/demos | 2026-2027 |
| 3.2T initial sampling | Late 2027 - 2028 |
| 3.2T volume production | 2028-2029 |
| 3.2T majority switch port speed | ~2030 |

### Lumentum Readiness
- 1.6T DR4 demonstrated as **stepping stone to 3.2T**
- 400G differential EML lasers are the building block (8x for 3.2T)
- UHP laser platform scales to CPO-based 3.2T architectures
- NVIDIA partnership provides demand visibility for next-gen components

### Competitors
- **Coherent**: Major rival, also received $2B NVIDIA investment. Strong in 800G coherent pluggables.
- **Broadcom**: CPO-focused at 3.2T, less in pluggable transceivers
- **InnoLight/Zhongji Innolight**: Chinese transceiver leader, aggressive on 1.6T
- **Cisco (Acacia)**: Silicon photonics for coherent

### Key Insight
At the 3.2T generation, CPO becomes more compelling vs pluggable due to power/density constraints. This is where the pluggable vs CPO battle intensifies. Lumentum's dual positioning (pluggable lasers + CPO lasers) hedges this transition.
