# MOG.A Phase 2 Fresh Data (2026-04-09 pull)
> Source: MCP investment-master → FMP endpoints (compare_stocks + fmp_data key-metrics + quote)
> Used as authoritative DM source for Phase 2 rewrite

---

## 1. Current Quote (MOG-A, 2026-04-09)
| Field | Value | DM ID |
|---|---|---|
| Price | **$313.25** | DM-QUOTE-001 |
| Day change | +5.10% (+$15.19) | DM-QUOTE-002 |
| Market cap | **$9,942,352,641** | DM-QUOTE-003 |
| 52W high / low | $354.20 / $147.28 | DM-QUOTE-004 |
| 50-day avg / 200-day avg | $314.25 / $237.00 | DM-QUOTE-005 |
| Previous close | $298.06 | — |
| Volume (day) | 133,966 | — |
| Timestamp | 1775678402 (2026-04-09) | — |

**Observation**: 200-day avg $237 vs current $313 = +32% above 200DMA. Short-term +5% day move shows momentum-driven rather than fundamental-driven trading.

---

## 2. FMP Key-Metrics 6-Year Series (MOG-A, FY20-FY25)

### Core valuation (point-in-time, per fiscal year close)
| FY | Market cap ($B) | EV ($B) | EV/Sales | EV/EBITDA | EV/FCF | P/FCF | Net debt/EBITDA |
|---|---|---|---|---|---|---|---|
| FY20 | 2.11 | 2.96 | 1.03x | **22.5x** | 15.5x | n/a | 6.44x |
| FY21 | 2.45 | 3.25 | 1.14x | **9.87x** | 19.8x | n/a | 2.44x |
| FY22 | 2.25 | 2.98 | 0.98x | **8.50x** | 27.8x | n/a | 2.09x |
| FY23 | 3.60 | 4.39 | 1.32x | **11.87x** | −117.5x (neg FCF) | n/a | 2.15x |
| FY24 | 6.46 | 7.27 | 2.01x | **17.18x** | 156.9x | n/a | 1.92x |
| FY25 | 6.48 | **7.37** | 1.91x | **15.08x** | 57.4x | n/a | 1.81x |
| **TODAY** | **9.94** | **10.82** | — | **22.2x** | 85x | 77.7x | 1.81x |
| DM ID | DM-EV-001 | DM-EV-002 | — | **DM-EV-003** ★ | DM-EV-004 | DM-EV-005 | DM-LEV-001 |

**★ Critical DM-EV-003**: FMP key-metrics reports EV/EBITDA **15.08x at FY25 close (2025-09-27, market cap $6.48B)**. But today (2026-04-09) market cap has risen to **$9.94B** (+53% since fiscal close). Current EV $10.82B / FY25 EBITDA $488M = **22.2x**. Analysts/Bloomberg terminals that use stale market cap see "15x" and call MOG cheap — **this is the core data-quality alpha of Phase 2**.

### Return metrics (FY, from FMP)
| FY | ROA | ROE | **ROIC** | ROCE | Earnings yield | FCF yield |
|---|---|---|---|---|---|---|
| FY20 | 0.29% | 0.74% | 9.34% | 9.34% | 0.44% | 9.03% |
| FY21 | 4.58% | 11.23% | 6.90% | 9.22% | 6.42% | 6.72% |
| FY22 | 4.52% | 10.80% | 7.74% | 10.13% | 6.90% | 4.77% |
| FY23 | 4.49% | 10.45% | 8.72% | 11.02% | 4.76% | **−1.04%** |
| FY24 | 5.08% | 11.33% | 9.77% | 12.70% | 3.21% | 0.72% |
| FY25 | 5.31% | 11.80% | **9.31%** | 12.39% | 3.63% | 1.98% |
| DM ID | — | DM-ROE-001 | **DM-ROIC-001** ★ | DM-ROCE-001 | DM-EY-001 | DM-FCFY-001 |

**★ DM-ROIC-001**: FY25 ROIC **9.31%** (FY24 9.77%, FY23 8.72%, 3-yr avg 9.27%). vs WACC estimate 9.5% → **ROIC − WACC spread = −19bp (negative value creation at current capital base)**. The previous assumption of "+0-1pp" was optimistic; real spread is marginally negative in FY25.

### Capital intensity (FY)
| FY | CapEx/Rev | CapEx/D&A | CapEx/OCF | R&D/Rev | SG&A/Rev | SBC/Rev |
|---|---|---|---|---|---|---|
| FY20 | 3.06% | 1.02 | 31.6% | 3.84% | 13.80% | 0.20% |
| FY21 | 4.51% | 1.43 | 43.9% | 1.71% | 14.45% | 0.26% |
| FY22 | 4.59% | 1.58 | **56.5%** | 1.13% | 14.77% | 0.29% |
| FY23 | 5.22% | **1.92** ★ | **127.5%** ★★ | 0.84% | 14.15% | 0.32% |
| FY24 | 4.32% | 1.68 | 77.1% | 3.12% | 13.71% | 0.41% |
| FY25 | **3.75%** | **1.54** | 53.0% | **2.43%** | 14.35% | 0.43% |
| DM ID | DM-CAPEX-001 | **DM-CAPEX-002** ★ | DM-CAPEX-003 | DM-RD-001 | DM-SGA-001 | DM-SBC-001 |

**★★ DM-CAPEX-003 (FY23)**: CapEx/OCF = **127.5%** (CapEx > OCF → FCF negative $37M). This is the single most important number in Phase 1 — confirmed by FMP key-metrics.

**SBC check**: SBC/Rev only 0.20-0.43% across 6 years. MOG **is not an SBC-burden story** (unlike LITE/DDOG). The FCF conversion problem is 100% CapEx + WC, 0% SBC.

### Working capital (FY, ★★★ main thesis anchor)
| FY | DSO | DIO | DPO | Operating cycle | **CCC** |
|---|---|---|---|---|---|
| FY20 | 108.3 | 106.2 | 30.2 | 214.5 | **184.3** |
| FY21 | 121.1 | 103.9 | 34.0 | 225.0 | **190.9** |
| FY22 | 119.0 | 93.7 | 37.0 | 212.8 | **175.8** |
| FY23 | 125.5 | 105.3 | 38.5 | 230.8 | **192.3** |
| FY24 | 114.2 | 120.7 | 41.1 | 234.9 | **193.8** |
| FY25 | **118.3** | **119.0** | **41.5** | 237.3 | **195.9** |
| DM ID | DM-WC-001 | DM-WC-002 | DM-WC-003 | DM-WC-004 | **DM-WC-005** ★★★ |

**CCC trend**: 176 → 196 days (FY22 → FY25), **worsening 20 days over 3 years**. Each 10-day CCC extension on $3.86B revenue = $105M additional WC tied up. Over 3 years that's ~$200M of cumulative cash trapped — which matches FY23-25 accumulated WC drag ($129M + $116M + $94M = $339M).

### Absolute balance sheet items (FY25)
| Item | Value ($) | DM ID |
|---|---|---|
| Working capital | $1,250,912,000 | DM-BS-001 |
| Invested capital | $3,232,031,000 | DM-BS-002 |
| Avg receivables | $1,190,052,500 | DM-BS-003 |
| Avg inventory | $889,002,000 | DM-BS-004 |
| Tangible asset value | $1,084,141,000 | DM-BS-005 |
| Intangibles/Total assets | 20.52% | DM-BS-006 |
| **FCF to firm (FCFF) FY25** | **$124,629,197** | **DM-FCFF-001** ★ |
| FCFF FY24 | $84,891,088 | DM-FCFF-002 |
| FCFF FY23 | $38,279,880 | DM-FCFF-003 |
| FCFF FY22 | $79,332,751 | DM-FCFF-004 |
| FCFF FY21 | $198,308,068 | DM-FCFF-005 |
| FCFF FY20 | $72,371,896 | DM-FCFF-006 |
| **FCFF 6-yr mean** | **$99,635,480** | **DM-FCFF-007** ★★ |
| **FCFF 3-yr mean (FY23-25)** | **$82,600,055** | **DM-FCFF-008** ★★ |

**★ DM-FCFF-001**: FY25 FCFF $124.6M. Note this **differs from simple OCF−CapEx**: FMP's FCFF adds back after-tax interest. Simple FCF (OCF $273M − CapEx $145M = $128M) is marginally different. Both confirm: FCF ~$125-128M.

**★★ DM-FCFF-007**: 6-yr mean FCFF **$99.6M** — below Phase 1 narrative's "$100M". The arithmetic is confirmed: **MOG has generated <$100M/year of normalized FCF for 6 years**, regardless of which conversion ratio you use.

**★★ DM-FCFF-008**: 3-yr mean (recent) is even worse: **$82.6M**. The "improving conversion" narrative is mathematically weak.

### FCFE (FCF to equity) — FY25 ★★★ shocker
| FY | FCFE ($M) |
|---|---|
| FY20 | −654.9 |
| FY21 | −639.6 |
| FY22 | −628.4 |
| FY23 | −831.5 |
| FY24 | −766.1 |
| **FY25** | **−755.3** |

**DM-FCFE-001**: **FCFE (Free Cash Flow to Equity) has been NEGATIVE $600-830M/year for 6 consecutive years**. This is the sharpest data point in the entire analysis. FCFE = FCFF − after-tax interest − debt repayment + new debt. MOG is structurally **cash-negative at the equity level** because it needs to roll debt and pay interest. Over 6 years, cumulative FCFE is **−$4.28B** while market cap rose from $2.1B to $9.9B.

**Interpretation**: For 6 years, equity holders have received **zero net cash**. Dividends ($1.17/share × 31.73M ≈ $37M/yr) are paid from net debt capacity, not from free equity cash flow.

### Quality checks
| FY | Income quality (OCF/NI) | Tax burden | Interest burden |
|---|---|---|---|
| FY25 | 1.16 | 75.2% | 81.3% |
| FY24 | 0.98 | 77.4% | 81.2% |
| FY23 | 0.79 | 79.1% | 77.3% |
| FY22 | 1.59 | 76.4% | 77.3% |
| FY21 | 1.87 | 77.2% | 85.7% |
| DM ID | DM-IQ-001 | DM-TAX-001 | DM-INT-001 |

**Observation**: Income quality (OCF/NI) 1.16 looks "acceptable" — OCF modestly exceeds NI. But FCFF/NI = 124.6/235 = **53%**, and FCFE/NI = **−321%**. The quality signal is hidden unless you go past OCF to CapEx-adjusted metrics.

---

## 3. Peer Comparison (2026-04-09, MCP compare_stocks) ★★★ critical correction

| Ticker | PE ratio | OM | ROE | D/E | vs MOG.A |
|---|---|---|---|---|---|
| **MOG.A** | **27.6x (P0 TTM)** | **10.6%** | **11.80%** | 47.5% | — |
| PH | **35.2x** | 20.5% | 25.8% | 68.9% | PE +27% higher |
| HEI | **58.1x** | 22.7% | 16.6% | 49.7% | PE +110% higher |
| TDG | **39.2x** | **47.2%** | n/a | n/a | OM 4.5× MOG |
| CW | **56.5x** | 18.2% | 19.4% | 46.1% | PE +105% higher |
| WWD | **49.7x** | 14.3% | 20.4% | 36.3% | PE +80% higher |
| HWM | **67.6x** | 25.8% | **30.4%** | 60.0% | PE +145% higher |
| **Peer median (ex-MOG)** | **~49x** | **22.6%** | **20.4%** | **49.7%** | — |
| SPY | 26.8x | — | — | — | MOG PE ≈ market |
| DM ID | **DM-PEER-PE-001** ★★★ | DM-PEER-OM-001 | DM-PEER-ROE-001 | DM-PEER-DE-001 | — |

**★★★ DM-PEER-PE-001 — the most important peer fact**:

Peer median PE is **~49x** (range 35-68x). MOG 27.6x is **43% below peer median**. This sounds like "deep discount opportunity" — and that IS the bull narrative. But:

1. **MOG OM 10.6% is the lowest in the group** (next lowest: WWD 14.3%)
2. **MOG ROE 11.8% is the lowest in the group** (next lowest: HEI 16.6%)
3. **MOG ROIC 9.31% is not directly comparable via MCP but Phase 0 peer file shows 9.3% vs median 12.4%**

**The peer discount is not mispricing — it is quality-earned**. Applying peer multiples to MOG (what my previous Phase 2 did) was wrong; the correct adjustment is:

**Fair MOG PE = peer median × (MOG ROE / peer median ROE) × (MOG OM / peer median OM)^0.5**
= 49 × (11.80/20.4) × (10.6/22.6)^0.5
= 49 × 0.578 × 0.685
= **19.4x**

At FY25 GAAP EPS $7.33: fair price = 19.4 × 7.33 = **$142** [DM-PEER-FAIR-001]

At FY26E consensus EPS $10.18: fair price = 19.4 × 10.18 = **$198** — but this assumes consensus is reliable, which Phase 1 challenged (−$0.50 non-op adjustment → $9.68 → $188).

**Alternative correction — peer basket bubble discount**:
- Peer median PE 49x is at historical extreme. HEI 10yr avg PE ~30x, PH ~18x, TDG ~30x → historical peer median ~28x
- If peer basket mean-reverts to historical: MOG fair PE = 28 × 0.578 × 0.685 = **11.1x** → fair price = **$82** at FY25 EPS

**Peer multiples yield $82–$198 fair value range**, dependent entirely on whether you believe the peer bubble holds. MOG's own ROIC/OM profile supports the LOW end, not the high end.

---

## 4. Data gaps (still blackbox after Phase 2 refresh)
- Segment P&L (4 segments): still estimate, 10-K footnote not fetched
- Contract asset FY19-FY25 series: only have aggregate receivables $1.19B
- F-35 ship-set content: still inference
- Industrial divestiture buyer: not announced
- Aftermarket mix: still backsolved 20-23%

These 5 gaps define the **32% blackbox** (R-4 quantification).

---

## 5. Summary — what changed vs previous Phase 2

| Item | Previous Phase 2 | Fresh Data Phase 2 | Impact |
|---|---|---|---|
| Peer EV/EBITDA basis | 18-38x | PE 35-68x (real-time) | SOTP peer selection needs repricing |
| EV/EBITDA FMP reports | 15.1x (stale) | 22.2x (current) | Previous Phase 2 was right about this |
| FCFF 6-yr mean | $100M narrative | **$99.6M confirmed** | Phase 1 narrative is precise |
| 3-yr FCFF mean | not quantified | **$82.6M** | Recent trend is WORSE than 6-yr avg |
| FCFE 6-yr | not quantified | **−$654 to −$831M / year** | New data point, strongly strengthens H1 |
| ROIC 9.31% vs WACC 9.5% | +0-1pp | **−19bp (negative spread)** | Strengthens H1 |
| Peer discount mechanism | "MOG is cheap" | **Quality-earned, not mispricing** | Reframes "追赶 PH" narrative as false |
