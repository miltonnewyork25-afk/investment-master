# AVGO AI ASIC Competitive Landscape — Literature Reconnaissance

> Date: 2026-03-06 | Sources: Web search across 30+ articles (2025-2026)

---

## 1. Google TPU Ironwood & MediaTek Partnership

Google's TPU v7 (Ironwood) represents a structural shift in custom silicon sourcing. Google has split development responsibilities: **Broadcom** retains core XPU design, while **MediaTek** handles I/O module design, SerDes high-speed interfaces, peripheral components, and TSMC production coordination. Google selected MediaTek partly because costs are **20-30% lower** than alternative partners, leveraging MediaTek's deep TSMC relationship.

**Production scale**: Google plans ~5 million TPU v7 units in 2027, scaling to 7 million in 2028. MediaTek has requested a **7x increase** in CoWoS wafer allocation from TSMC (targeting >150K wafers/year by 2027). MediaTek reportedly secured both v7e and v8e TPU orders.

**Revenue impact**: MediaTek expects ~$1B AI ASIC revenue in 2026, growing to "several billion" in 2027. This is a new revenue stream that didn't exist before 2025.

**Key risk for Broadcom**: Google is diversifying its ASIC supply chain. While Broadcom remains the lead design partner for Ironwood's core compute, MediaTek's entry signals Google's intent to reduce single-supplier dependency. Meta is also reportedly weighing Google TPU deployment in 2027, which would expand Google's TPU ecosystem beyond internal use.

Sources: [Jon Peddie Research](https://www.jonpeddie.com/news/ironwood-chetyorka-google-broadcom-mediatek-and-tsmc/) | [TrendForce](https://www.trendforce.com/news/2025/12/15/news-mediatek-reportedly-secures-google-v7e-v8e-tpu-orders-requests-7-fold-cowos-increase-from-tsmc/) | [CNBC](https://www.cnbc.com/2025/11/07/googles-decade-long-bet-on-tpus-companys-secret-weapon-in-ai-race.html) | [Digitimes](https://www.digitimes.com/news/a20251202PD211/mediatek-asic-google-tpu-demand-2027.html)

---

## 2. OpenAI Custom Chip (Titan) Development

OpenAI is developing its first custom AI chip, codenamed **"Titan"**, co-designed with Broadcom and fabricated by TSMC on the **3nm (N3) process**. The chip features a systolic array architecture with HBM and strong networking — architecturally similar to NVIDIA's approach.

**Timeline**:
- Design finalization: H1 2025 (tape-out phase)
- Mass production: H2 2026
- Second-gen (Titan 2): Design starts H2 2026, planned for TSMC **A16 process**

**Team**: Led by ex-Google chip expert **Richard Ho**, OpenAI's in-house chip team has doubled to ~40 members. Broadcom is the co-development partner.

**Implication for AVGO**: This is a **net positive** for Broadcom in the near term — Broadcom earns design services revenue from the partnership. However, long-term, OpenAI's in-house capability could mature to reduce Broadcom dependency (similar to how Apple gradually reduced Qualcomm reliance). The Titan 2 on A16 suggests OpenAI is planning a multi-generational roadmap.

Sources: [TrendForce](https://www.trendforce.com/news/2026/01/15/news-openai-reportedly-to-deploy-custom-ai-chip-on-tsmc-n3-by-end-2026-second-gen-planned-for-a16/) | [AI Magazine](https://aimagazine.com/articles/whats-behind-openais-first-custom-chip-design-with-tsmc) | [WebProNews](https://www.webpronews.com/openai-plans-2026-launch-of-custom-ai-chip-with-broadcom-tsmc/) | [SiliconANGLE](https://siliconangle.com/2025/02/10/openai-reportedly-finalizing-design-house-ai-chip-ahead-tsmc-fabrication/)

---

## 3. ASIC Market Share: Broadcom vs Marvell vs In-House

**Broadcom**: Holds **60-70% market share** in custom AI ASIC design services; projected to maintain ~60% in 2027 (Counterpoint Research). Key partnerships: Google TPU, Meta MTIA v3, OpenAI Titan, and reportedly 2 additional unnamed hyperscalers.

**Marvell (MRVL)**: Currently ~15% share, targeting 20% by 2028. Key wins: Amazon (Trainium-related inference ASIC, mass production 2025) and Microsoft (Maia, revenue from 2026). However, design services share may slip to ~8% in 2027 even as shipments double — indicating Broadcom is capturing disproportionate value.

**In-house designs**:
- **Meta MTIA**: v3 accelerator ramping with Broadcom as design partner. Meta also exploring Google TPU deployment for 2027 — hedging across multiple silicon strategies.
- **Amazon Trainium**: Trainium2 in production; Anthropic training on 500K Trainium2 chips. Claims **30-40% better price-performance** vs third-party hardware. Marvell is the design partner.
- **Microsoft Maia**: First-gen entering production via Marvell partnership.

**JPMorgan estimate** (H. Sur, June 2025): Custom AI ASIC market reached **$30B in 2025**, with rapid expansion ahead.

Sources: [Yahoo Finance / Counterpoint](https://finance.yahoo.com/news/broadcom-set-dominate-custom-ai-163116560.html) | [Digitimes](https://www.digitimes.com/news/a20250116PD221/marvell-asic-chatgpt-demand-broadcom.html) | [Rolling Out](https://rollingout.com/2026/01/30/ai-chip-shipments-triple-2027-custom/) | [Futunn](https://news.futunn.com/en/post/43349986/from-gpu-to-asic-broadcom-and-marvell-emerge-as-winners)

---

## 4. Broadcom AI Revenue Trajectory & $73B Backlog

**FY2025 results** (ended Oct 2025):
- Total revenue: $64B (+24% YoY)
- AI revenue: $20B (+65% YoY)
- AI backlog: **$73B** covering XPUs, switches, DSPs, lasers, PCIe — delivery over next 18 months

**FY2026 trajectory**:
- Q1 FY2026: AI revenue expected to **double YoY to $8.2B**
- Q2 FY2026: AI semiconductor revenue projected at **$10.7B**
- Management originally guided 60-70% AI revenue growth for FY2026, then **doubled** that expectation
- CEO Hock Tan: AI chip sales projected to exceed **$100B next year** (FY2027)

**Backlog composition**: The $73B covers the full AI system stack — not just XPUs but networking (Memory/SerDes/switching), which is critical because Broadcom's networking moat may be more durable than the ASIC design business itself.

Sources: [Seeking Alpha](https://seekingalpha.com/news/4530775-broadcom-outlines-19_1b-q1-2026-revenue-target-as-ai-backlog-surges-to-73b) | [Futurum Group](https://futurumgroup.com/insights/broadcom-q4-fy-2025-earnings-ai-and-software-drive-beat/) | [TradingKey](https://www.tradingkey.com/analysis/stocks/us-stocks/261648292-avgo-broadcom-earnings-ai-revenue-guidance-chip-tradingkey) | [Motley Fool Transcript](https://www.fool.com/earnings/call-transcripts/2025/12/12/broadcom-avgo-q4-2025-earnings-call-transcript/)

---

## 5. Custom ASIC vs NVIDIA GPU: TCO & Market Dynamics

**Training**: NVIDIA maintains **90%+ share** and is expected to retain dominance. ASICs are not cost-effective for rapidly evolving training architectures where flexibility matters. GPU programmability remains critical for research workloads.

**Inference**: This is where the ASIC opportunity lies. NVIDIA's inference share is projected to drop from **80% to 20-30% by 2028** as ASICs capture 70-75% of production inference workloads. ASICs already handle 37% of datacenter inference in 2025.

**TCO advantages of ASICs**:
- Google TPU: **4.7x better price-performance** for inference, **67% less power**
- Amazon Trainium: **30-40% better price-performance** vs GPU alternatives
- Generic ASICs: ~50% more efficient in matrix operations, 30% lower power
- Midjourney case study: **65% cost savings** migrating to TPUs

**ASIC disadvantages**:
- High upfront NRE ($5K-$30K per unit before scale)
- Rapid depreciation when new generations launch
- Lock-in to specific architectures — if model architecture shifts, ASIC investment is stranded
- 18-24 month design cycles vs NVIDIA's annual GPU cadence

**Key dynamic**: The training-to-inference ratio is shifting. As LLMs mature, inference becomes the dominant workload. This secular shift structurally benefits ASIC providers (Broadcom, Marvell) at NVIDIA's expense on the inference side, while NVIDIA retains the training moat.

Sources: [CNBC](https://www.cnbc.com/2025/11/21/nvidia-gpus-google-tpus-aws-trainium-comparing-the-top-ai-chips.html) | [HowAIWorks](https://howaiworks.ai/blog/tpu-gpu-asic-ai-hardware-market-2025) | [TechOutlet](https://www.techoutlet.eu/en/blog/post/ai-hardware-crisis-2026-the-hidden-cost-wave-behind-%E2%80%9Cai-everything%E2%80%9D) | [AI News Hub](https://www.ainewshub.org/post/nvidia-vs-google-tpu-2025-cost-comparison)

---

## Summary: Key Takeaways for AVGO Analysis

1. **Broadcom's moat is real but evolving**: 60%+ ASIC market share, $73B backlog, but Google's MediaTek diversification signals the start of supplier diversification pressure.

2. **Revenue trajectory is steep**: AI revenue from $20B (FY2025) to potentially $40B+ (FY2026) to $100B+ (FY2027 per management). Execution risk is low given backlog visibility.

3. **Inference shift is the secular tailwind**: NVIDIA's inference share declining from 80% to 20-30% by 2028 is the single most important structural trend for Broadcom's ASIC business.

4. **Competitive threats are manageable near-term**: Marvell remains distant #2 (~15% share). In-house designs (MTIA, Trainium) still rely on ASIC design partners. True in-house threat (customer designs without Broadcom) is 3-5 years away.

5. **Networking may be the more durable moat**: Broadcom's AI networking stack (switches, SerDes, DSPs) is harder to replicate than ASIC design services and is bundled into the $73B backlog.
