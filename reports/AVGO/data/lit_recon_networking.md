# AVGO Networking & Optical Interconnect — Literature Reconnaissance

> Date: 2026-03-06 | Sources: Web search (2025-2026 articles)

---

## 1. Tomahawk / Jericho Switching Chips: Market Share & Competitive Position

**Broadcom dominates Ethernet switch silicon.** The company holds ~90% share in cloud data center switching (narrower definition) and ~55% revenue share in the broader Ethernet switch chip market (2024 data). AI switch backlog exceeds $10B as of Q4 FY2025.

**Product leadership timeline:**
- **Tomahawk 6** (102.4 Tbps, 64x1.6T ports): Shipped June 2025 — world's first 102.4T switch chip
- **Tomahawk Ultra**: Next-gen product for AI-specific workloads
- **Jericho 4**: Ethernet fabric router for spine/leaf AI networks

**vs NVIDIA Spectrum-X:** NVIDIA's Spectrum-X1600 (102.4 Tbps) is expected only in H2 2026, leaving Broadcom roughly one year ahead. NVIDIA Spectrum-X exceeded $2B quarterly revenue (strong growth from low base, 263% YoY in 2025), but Broadcom holds the architectural lead in switch silicon. NVIDIA is in the "uncharacteristic position of playing catch-up" in networking.

Sources: [The Register — Broadcom Tomahawk 6](https://www.theregister.com/2025/06/04/broadcom_tomahawk_6/) | [TrendForce — InfiniBand vs Ethernet](https://www.trendforce.com/insights/infiniband-vs-ethernet) | [FinancialContent — Broadcom AI Networking Supercycle](https://markets.financialcontent.com/wral/article/marketminute-2025-12-29-the-backbone-of-the-million-gpu-cluster-broadcoms-dominance-in-the-2026-ai-networking-supercycle) | [EEWorld — 90% market share](https://en.eeworld.com.cn/mp/Icbank/a405868.jspx)

---

## 2. CPO (Co-Packaged Optics) Strategy for AI Data Centers

**Broadcom is the CPO technology leader.** Now shipping its third-generation CPO product: TH6-Davisson (Tomahawk 6 with co-packaged optics), delivering 102.4T optically enabled switching capacity. Fourth-gen (400G/lane) is already in development.

**Key partnerships:**
- TSMC: Co-developing "COUPE" (Compact Universal Photonic Engine) packaging architecture
- Meta: Published data showing 90% training efficiency gain from CPO deployment
- Micas Networks, HPE: Integration partners

**2026 outlook:** Widely anticipated as the CPO inflection year — transition from prototypes to volume commercial deployment. Both Broadcom (TH6-Davisson) and NVIDIA (Spectrum-X CPO) target ~100 Tbps/switch with integrated optics. Broadcom's modularity and cost advantage favor the broader Ethernet data center market.

**Strategic implication:** CPO could disrupt pluggable transceiver vendors (Coherent, Lumentum, Innolight) by embedding photonics directly on switch/GPU substrates, bypassing traditional modules inside racks.

Sources: [Broadcom OFC 2025 Press Release](https://investors.broadcom.com/news-releases/news-release-details/broadcom-advances-optical-connectivity-ai-infrastructure) | [EDN — CPO in 2026](https://www.edn.com/where-co-packaged-optics-cpo-technology-stands-in-2026/) | [SDxCentral — Broadcom CPO](https://www.sdxcentral.com/news/broadcom-bets-big-on-ai-with-new-cpo/) | [FiberMall — NVIDIA vs Broadcom CPO](https://www.fibermall.com/blog/ai-cpo-battle-nvidia-vs-broadcom.htm)

---

## 3. Arista Networks (ANET) Dependency on Broadcom

**Purchase commitments surged to $6.8B** (Q4 2025, up from $4.8B in Q3) — primarily for chips tied to new products and AI deployments. While not all $6.8B is exclusively Broadcom, Broadcom is the dominant supplier.

**Structural dependency:**
- Arista's 7050X and 7060X Series run on Broadcom Trident and Tomahawk merchant silicon
- Arista's business model deliberately avoids custom ASIC R&D — it uses Broadcom merchant silicon and focuses engineering on EOS (Extensible Operating System) software differentiation
- This creates a deep structural dependency: Broadcom controls the silicon roadmap that defines Arista's product capabilities

**Cost pressure:** Arista management described chip pricing as "horrendous" in 2026, "an order of magnitude exponentially higher." All chips manufactured at TSMC, creating concentration risk. This cost pressure may squeeze Arista's gross margins, but Broadcom captures the pricing power.

Sources: [Arista Q4 2025 Earnings Call — Motley Fool](https://www.fool.com/earnings/call-transcripts/2026/02/12/arista-anet-q4-2025-earnings-call-transcript/) | [Arista Q4 2025 Earnings — Globe and Mail](https://www.theglobeandmail.com/investing/markets/stocks/ANET/pressreleases/195647/arista-anet-q4-2025-earnings-call-transcript/) | [FinancialContent — Arista Deep Dive](https://markets.financialcontent.com/stocks/article/finterra-2026-2-17-the-ai-backbone-a-deep-dive-into-arista-networks-anet-after-the-q4-earnings-beat)

---

## 4. Ethernet vs InfiniBand in AI Clusters

**The tide has turned decisively toward Ethernet.** InfiniBand held ~80% of AI back-end network market share in 2023. By mid-2025, Ethernet surpassed InfiniBand in AI back-end network adoption.

**Catalysts for the shift:**
- **UEC 1.0** (Ultra Ethernet Consortium, June 2025): Reconstructed network protocol stack across all layers to achieve InfiniBand-like performance for AI workloads
- **Meta validation**: Published data showing RoCE (RDMA over Converged Ethernet) and InfiniBand provide "equivalent performance" in their 24,000-GPU Llama 3 training cluster
- **Hyperscaler preference**: Google Cloud, Microsoft Azure, Oracle Cloud all validated Ethernet-based AI networking
- **Cost/openness advantage**: Ethernet avoids vendor lock-in to NVIDIA's proprietary InfiniBand stack

**Broadcom's position:** Broadcom is the primary beneficiary of the Ethernet shift. Tomahawk 6 incorporates adaptive routing, in-network congestion response, and hardware packet reordering — features that close the historical gap with InfiniBand. Broadcom's switch silicon powers the majority of hyperscaler Ethernet deployments.

**NVIDIA's dual strategy:** NVIDIA continues InfiniBand (via Mellanox) for NVLink-connected scale-up domains, while offering Spectrum-X for Ethernet scale-out. However, this split focus may dilute NVIDIA's networking investment compared to Broadcom's all-in Ethernet bet.

Sources: [TrendForce — InfiniBand vs Ethernet](https://www.trendforce.com/insights/infiniband-vs-ethernet) | [FiberMall — Broadcom vs NVIDIA Scale-Out](https://www.fibermall.com/blog/infiniband-vs-ethernet-the-battle-between-broadcom-and-nvidia.htm) | [Dell'Oro — 2026 Predictions](https://www.delloro.com/2026-predictions-data-center-switch-frontend-ai-backed-networks/) | [VitexTech — InfiniBand vs Ethernet 2025](https://www.vitextech.com/blogs/blog/infiniband-vs-ethernet-for-ai-clusters-effective-gpu-networks-in-2025)

---

## 5. 800G / 1.6T Optical Transceiver Market

**Market size & growth:**
- Datacom optical component market projected >$16B revenue in 2025, growing 60%+ YoY
- 800G is the fastest growing segment in 2025
- 1.6T transition begins 2025, volume ramp in 2026 — projected 11M units shipped in 2026 (exceeding expectations)

**Broadcom's position:** Among top 5 optical suppliers globally (alongside Coherent, Lumentum, Accelink, Innolight — top 5 captured ~50% of 2025 revenue). Broadcom's differentiated position is vertical integration:
- **Switch silicon** (Tomahawk/Jericho): Defines the port speed that drives transceiver demand
- **Optical DSPs**: Key component inside transceivers
- **CPO integration**: Broadcom's 200G/lane CPO (launched July 2025) could eventually bypass pluggable transceivers entirely for intra-rack connections

**Competitive landscape:**
- Pluggable transceivers (800G/1.6T): Dominated by Innolight (China), Coherent, Lumentum
- Broadcom competes both as a component supplier (DSPs) and as a CPO disruptor
- 1.6T pluggable modules require 200G/lane optics — aligns with Broadcom's CPO lane speed

Sources: [Cignal AI — 800G Shipments](https://cignal.ai/2025/05/800gbe-optics-shipments-to-grow-60-in-2025/) | [NADDOD — 1.6T Market Insights](https://www.naddod.com/blog/1-6t-transceiver-market-insights-future-of-ai-and-hpc-networking) | [Substack — 800G/1.6T Battle](https://iamfabian.substack.com/p/pluggables-power-and-geopolitics) | [Broadcom OFC 2025](https://investors.broadcom.com/news-releases/news-release-details/broadcom-advances-optical-connectivity-ai-infrastructure)

---

## Summary: Key Investment Implications

| Dimension | Broadcom Position | Risk/Opportunity |
|-----------|------------------|------------------|
| Switch silicon | ~90% cloud DC share, 1yr lead over NVIDIA | Near-monopoly pricing power; NVIDIA Spectrum-X is credible but behind |
| CPO | Gen 3 shipping, Gen 4 in development | 2026 inflection could disrupt pluggable transceiver vendors |
| Arista dependency | Primary silicon supplier, $6.8B PO pipeline | Broadcom captures pricing power; Arista absorbs cost pressure |
| Ethernet vs IB | Primary beneficiary of Ethernet shift in AI | Secular tailwind as hyperscalers abandon InfiniBand |
| 800G/1.6T optics | Top 5 supplier + vertical integration (DSP + CPO) | Dual revenue stream: component sales + CPO disruption |

**Overall:** Broadcom is arguably the single most critical infrastructure supplier for AI networking, with dominant positions across switch silicon, optical components, and the emerging CPO transition. The Ethernet-over-InfiniBand secular shift is a major tailwind. Key risk is NVIDIA's Spectrum-X gaining share as a bundled GPU+networking solution.
