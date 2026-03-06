# Scout Baseline: ARM v2.0 Lessons for AVGO Analysis

> Source report: ARM_Complete_v2.0_2026-02-27.md (360K chars, 4.2/5)
> Generated: 2026-03-06
> Target: AVGO (Broadcom) — Fabless semiconductor + infrastructure software dual engine

---

## Lesson 1: Reverse DCF as belief inventory, not valuation tool
- **Source**: ARM v2.0 Chapter 16 (Reverse DCF)
- **Pattern**: Instead of forward DCF ("what is it worth?"), decompose current price into 6 independently verifiable sub-beliefs (B1-B6), rank them by fragility, then identify the single "load-bearing wall" whose failure alone causes 34-45% downside. The method works best when P/E is extreme and traditional DCF gives absurdly wide ranges. The belief fragility ranking (most easily falsifiable first) gives actionable monitoring priorities.
- **AVGO Application**: AVGO trades at ~25x forward P/E with dual-engine complexity (semiconductor + VMware software). Reverse DCF should decompose into sub-beliefs: VMware cross-sell execution, AI networking TAM capture, software margin expansion trajectory, M&A integration synergy realization. Identify which single belief is the load-bearing wall for AVGO's current premium vs semiconductor peers.
- **Inapplicable When**: Company trades near historical average multiples with stable, predictable earnings. Reverse DCF adds little when the market's implicit assumptions are modest and easily achievable.

---

## Lesson 2: Multi-engine convergence testing with independence audit
- **Source**: ARM v2.0 Chapter 20 (Multi-method Valuation)
- **Pattern**: Run 5 independent valuation engines, then explicitly audit their independence. ARM found E1/E3/E4 shared growth+margin assumptions (not truly independent), so merged them into one "internal anchor" at 55% weight vs truly independent engines (peer comps, cross-industry framework) at 45%. The independence audit prevented triple-counting the same assumptions. Divergence between engines reveals the core valuation debate (for ARM: GAAP vs Non-GAAP margin = 40% of total dispersion).
- **AVGO Application**: AVGO's dual-engine structure demands at least: (1) semiconductor peer comp, (2) software peer comp (VMware standalone), (3) sum-of-parts, (4) scenario-weighted DCF, (5) acquirer's framework (what would a PE firm pay for each piece?). The key independence risk: all DCF variants share the same VMware synergy assumption. SOTP and acquirer's framework are truly independent. Identify whether the core dispersion source is semiconductor cyclicality or software integration uncertainty.
- **Inapplicable When**: Pure-play companies where all valuation methods naturally anchor on the same business model. The independence audit adds overhead without insight for single-segment firms.

---

## Lesson 3: Kill Switch specificity with interaction matrix
- **Source**: ARM v2.0 Chapter 22 (Kill Switch Registry)
- **Pattern**: Each KS has 8 structured fields (trigger condition, current value, threshold, data source, verification frequency, post-trigger action, linked CQ, probability). But the real innovation is the KS interaction matrix showing conditional probability increases when one KS triggers another, forming two independent "domino chains" (competitive chain + financial chain) that converge at a single point (CEO change). This reveals hidden correlations between seemingly independent risks.
- **AVGO Application**: AVGO's Kill Switches should include: VMware customer churn rate exceeding X%, AI networking share loss to custom silicon, debt/EBITDA exceeding covenant threshold post-VMware, antitrust forced divestiture. Build the interaction matrix: customer churn -> revenue miss -> covenant breach -> forced asset sale is one chain. Map the "domino convergence point" for AVGO (likely debt covenant stress, given ~$60B acquisition debt).
- **Inapplicable When**: Companies with minimal debt and single-product risk. The interaction matrix adds value only when there are 5+ distinct risk nodes with plausible causal links between them.

---

## Lesson 4: Elasticity function for pricing power under open-source threat
- **Source**: ARM v2.0 Chapter 14A (RISC-V CDS Pricing Quantification)
- **Pattern**: Model pricing power as a continuous function of competitive alternative penetration, not a binary (has/doesn't have). The formula e(t) = e0 * (1 - R(t)/R_crit)^alpha translates diffuse "competitive threat" into quantifiable revenue impact per pricing action. Key insight: even at 2030, ARM still has pricing power (e < 0) -- the threat is gradual erosion of pricing increment, not sudden loss. Three parameters (base elasticity, critical penetration, decay coefficient) are sensitivity-tested to show the conclusion is robust across parameter ranges.
- **AVGO Application**: AVGO faces analogous dynamics: (1) networking ASICs vs custom silicon from hyperscalers (Google TPU, Amazon Trainium), (2) VMware vs open-source alternatives (KVM/Proxmox/OpenStack). Build elasticity functions for both engines. For networking: e0 = base pricing power pre-custom silicon era, R(t) = custom silicon share of AI networking, R_crit = threshold where Broadcom loses pricing. For VMware: R(t) = enterprise adoption of containerized/cloud-native alternatives.
- **Inapplicable When**: Markets where the alternative is not gradually penetrating but arrives as a step-function disruption (e.g., regulatory ban). The continuous function assumes smooth competitive diffusion.

---

## Lesson 5: Red team direction bias -- initial 7/7 same-direction failure
- **Source**: ARM v2.0 Chapter 24 + Chapter 28 (Red Team + Effectiveness Gate)
- **Pattern**: ARM's initial red team had all 7 RTs pointing upward (challenging the bearish thesis from bull side only). Net effect was +$43B but 0pp rating change = purely performative. The fix required adding RT-8/RT-9/RT-10 with downward direction. Even after the fix, the team remained 7-up vs 2-down (still biased). The biggest single correction came from RT-5 (SoftBank), which flipped from +$5.3B to -$0.5B only after forcing bidirectional analysis. Lesson: when your base case is bearish, the natural red team impulse is to challenge from the bull side only, creating systematic upward bias in calibration.
- **AVGO Application**: If AVGO base case is bullish (fair value above market), the red team will naturally skew bearish. Force at least 3/10 RTs to challenge from the bull side: "What if VMware synergies exceed guidance?", "What if AI networking TAM is 2x consensus?", "What if Hock Tan's next acquisition creates another step-change?" Without this, the red team becomes a performative exercise that confirms pre-existing bearishness without testing it. Assign explicit direction quotas before writing any RT.
- **Inapplicable When**: The base case is genuinely uncertain (neither clearly bullish nor bearish). In such cases, natural direction balance emerges without forced quotas.
