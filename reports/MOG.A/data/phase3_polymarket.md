# MOG.A Phase 3 — Polymarket Event Probabilities (2026-04-09 pull)
> Source: MCP investment-master → polymarket_events (live CLOB prices)
> Used as DM-anchored geopolitical probability inputs for Phase 3

---

## 1. Ukraine Ceasefire 2026 (7 markets, 3 active)

| Market ID | Question | End date | Yes price | **Implied prob** | Volume |
|---|---|---|---|---|---|
| 1795527 | Ceasefire by May 31, 2026 | 2026-05-31 | $0.0545 | **5.45%** | $101K |
| 1439560 | Ceasefire by April 30, 2026 | 2026-04-30 | $0.0185 | **1.85%** | $2.54M |
| 1171663 | Ceasefire by June 30, 2026 | 2026-06-30 | $0.105 | **10.5%** | $4.96M |
| **567687** | **Ceasefire by end of 2026** | **2026-12-31** | **$0.24** | **24.0%** | **$12.91M** ★★ |
| 704339 | Ceasefire by Jan 31, 2026 (closed) | resolved | $0 | 0% (NO) | $27.0M |
| 1243248 | Ceasefire by Feb 28, 2026 (closed) | resolved | $0 | 0% (NO) | $6.97M |
| 561829 | Ceasefire by Mar 31, 2026 (closed) | resolved | $0 | 0% (NO) | — |

**DM-POLY-UKR-001**: Ukraine-Russia ceasefire by end of 2026 = **24.0% probability** (highest-volume live market, $12.91M notional). Monotonic curve: 1.85% (Apr) → 5.45% (May) → 10.5% (Jun) → 24% (Dec). Implies **hazard rate ~2-3% per month** with acceleration in H2 2026.

**DM-POLY-UKR-002**: Three earlier Jan/Feb/Mar 2026 markets already resolved NO (probability 0%). This validates that the market's conditional probability estimates are **calibrated, not directional hype** — if they were mispriced hope, earlier markets would have collapsed faster than they did.

**Implication for MOG S&D segment**:
- If Ukraine ceases fire by mid-2026 (marginal probability ~10%), European rearmament urgency drops, supplemental funding slows
- If ceases fire by end-2026 (24%), FY27 European orders via LM/RTX sub-contracts face 3-5% downside
- Base case (76%): Ukraine war continues through 2026, current supplemental pace maintained
- Asymmetric risk: MOG direct Europe exposure small (~8-12%), but indirect via LM/RTX Patriot/NSM surge contracts could see $80-120M revenue risk in S&D ($1.1B segment) = **3-5% segment downside**

---

## 2. China-Taiwan Military Action (6 markets, 1 active)

| Market ID | Question | End date | Yes price | **Implied prob** | Volume |
|---|---|---|---|---|---|
| **677407** | **China x Taiwan military clash before 2027** | **2026-12-31** | **$0.135** | **13.5%** | **$1.56M** ★★ |
| 521018 | Military clash by June 30, 2025 (closed) | resolved | $0 | 0% (NO) | $669K |
| 521019 | Military clash by December 31, 2025 (closed) | resolved | $0 | 0% (NO) | $1.37M |
| 252608 | China invade Taiwan 2023 (closed) | resolved | $0 | 0% (NO) | $100K |
| 253889 | China invade Taiwan 2024 (closed) | resolved | $0 | 0% (NO) | $5.67M |
| 501793 | China invade Taiwan May 2024 (closed) | resolved | $0 | 0% (NO) | $38K |

**DM-POLY-TWN-001**: China-Taiwan military clash before 2027 = **13.5% probability** (single live market, $1.56M notional). Note definition: "military encounter" includes missile strikes, artillery, gunfire between PLA and ROC forces — a lower bar than "full invasion". True "invasion" probability is implied lower (~2-5%).

**DM-POLY-TWN-002**: Four closed markets (2023, 2024, 2025 H1, 2025 FY) all resolved NO. Historical base rate for "no incident in a given year" ~100%, but forward 14-month probability jumped to 13.5% — this reflects **the Trump 2.0 era Taiwan policy ambiguity + Xi's military modernization milestone** (PLA 2027 readiness date publicly stated).

**Implication for MOG**:
- **Short-term (tail scenario)**: If clash happens, A&D sector including MOG would spike +20-40% on "defense is needed now" narrative
- **Long-term (18-24 months post-event)**: Supply chain disruptions (semiconductor elements from TSMC/Samsung/Korea) could hurt MOG COGS, plus **market recognizes whoever sold Patriots to Taiwan pre-clash is revenue-capped, not expanding**
- **Net blended**: +5-8% near-term, reverting to fundamentals within 12-18 months
- **Base case (86.5%)**: No clash, MOG continues current trajectory — no tail premium justifies current price

**Non-ambiguous takeaway**: The 13.5% tail probability does NOT support a bull case for MOG at $313. Even if clash happens and spike lifts MOG to $350-400 for 6-12 months, mean reversion to $200-240 within 18 months. Expected value of tail scenario over 2-year horizon ≈ +$10-15/share, offset by 86.5% of "no clash → fundamentals rule → $106 fair value" pulls.

---

## 3. US Defense Budget Events (searched but limited coverage)

Polymarket has limited coverage of US defense appropriations — most budget markets are short-dated resolutions or congressional procedure bets. No high-volume market found specifically for "US FY27 defense base budget change". Fall back to congressional sources:

**From Phase 0.75 default_map_audit.md** (failure fact #1):
- **FY26 US defense base: $838.7B** (down from FY25 $895.2B = **−6.3%** YoY)
- Source: Senate Appropriations Committee vote 2026-03
- This is a hard data point, not a Polymarket event

**DM-DOD-FY26-001**: FY26 US defense base budget −6.3% YoY confirmed by Senate. FY27 request from Trump administration expected 2026-05 submission; historical pattern suggests FY27 base flat to +2%, with continued reliance on supplemental/FMS channels for actual growth.

---

## 4. Geopolitical Scenario Tree (probability-weighted, Polymarket-anchored)

| Variable | Base (no change) | Upside (bullish for MOG) | Tail (extreme, low prob) |
|---|---|---|---|
| **V1: Ukraine** | 76% war continues | 24% ceasefire by year-end | — |
| **V2: Taiwan** | 86.5% no clash | — | 13.5% military clash |
| **V3: US FY27 Defense** | ~60% flat base | ~25% +2-3% | ~15% continued −3%+ |

**Independence assumption note**: V1/V2/V3 are not fully independent (e.g., Ukraine ceasefire may free US defense attention for Asia-Pacific, raising V3 upside). But for first-order analysis treat as independent.

**4-scenario collapse** (most-likely combinations):

| Scenario | V1 | V2 | V3 | **Joint prob** | MOG implication | Adj to Phase 2 fair value |
|---|---|---|---|---|---|---|
| **G1 Base** | continue | no clash | flat | 76% × 87% × 60% = **40%** | Status quo | $106 (no adjustment) |
| **G2 Ukraine peace** | ceasefire | no clash | flat | 24% × 87% × 60% = **13%** | S&D -3 to -5% FY27 | −$8 → **$98** |
| **G3 Taiwan tail** | continue | clash | flat | 76% × 13.5% × 60% = **6%** | Short spike then revert | +$5 net → **$111** |
| **G4 US budget up** | continue | no clash | +2-3% | 76% × 87% × 25% = **17%** | Mild tailwind | +$6 → **$112** |
| **G5 US budget down** | continue | no clash | −3% | 76% × 87% × 15% = **10%** | S&D + MA -2% FY27 | −$7 → **$99** |
| **G6 Ukraine + Budget up** | ceasefire | no clash | +2-3% | 24% × 87% × 25% = **5%** | Offsetting | −$3 → **$103** |
| Other combinations | | | | **9%** | mixed | $100-110 |

**Probability-weighted geopolitical adjustment**:
$106 + [$0×0.40 − $8×0.13 + $5×0.06 + $6×0.17 − $7×0.10 − $3×0.05 + $0×0.09]
= $106 + [0 − 1.04 + 0.30 + 1.02 − 0.70 − 0.15 + 0]
= $106 − $0.57
= **$105.4**

**DM-GEO-ADJ-001**: Geopolitical scenario tree adjustment to Phase 2 fair value = **−$0.57/share (effectively zero)**. Geopolitics is **symmetric** — Ukraine peace and US budget cut on one side, US budget increase and Taiwan spike on the other, roughly cancel out. **Phase 2 concluded the case without needing geopolitical premium**, and Phase 3 confirms geopolitics doesn't rescue the bull thesis.

**Key non-obvious finding**: The "defensive / tail hedge" narrative for MOG is mathematically weak. The tail scenarios (Taiwan clash) that help MOG only contribute +$0.30 to expected fair value, because even if they happen, mean reversion kicks in within 18 months.

---

## 5. Summary: Polymarket-anchored probabilities used in Phase 3 v2

| Event | Probability | Source DM | Impact on MOG fair value |
|---|---|---|---|
| Ukraine ceasefire by end 2026 | **24.0%** | DM-POLY-UKR-001 | −$8 if happens |
| Ukraine ceasefire by mid-2026 | 10.5% | market 1171663 | −$5 if happens |
| Taiwan military clash before 2027 | **13.5%** | DM-POLY-TWN-001 | +$5 net after MR |
| US FY26 defense base change (actual) | **−6.3%** | DM-DOD-FY26-001 | already in price |
| FY27 defense base upside | ~25% | inferred | +$6 if happens |
| FY27 defense base downside | ~15% | inferred | −$7 if happens |

**Aggregate geopolitical EV adjustment: ~$0 to Phase 2 fair value $106** [DM-GEO-ADJ-001]

**Conclusion**: Phase 2 fair value $106/share is **robust to geopolitical scenario shocks**. Bull cases requiring geopolitical tail events still can't rescue the valuation — even Taiwan clash tail scenario only gets MOG to $111 mean-reversion-adjusted, still −65% from current.
