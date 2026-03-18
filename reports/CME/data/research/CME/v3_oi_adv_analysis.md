# CME OI/ADV System Analysis (v3.0 Phase 0 — Critical Gap Fill)
> Source: WebSearch Agent + CME DataMine | 2026-03-18

## OI Absolute Levels

### SOFR Futures OI
- Sep 2021: ~1M contracts
- Apr 2023: +7.5M (Eurodollar force conversion)
- Aug 2025: **13.7M contracts** (record)
- Organic growth ex-conversion: still strong
- SOFR ADV: 158K (2021) → **5.4M (2025)**

### Treasury Futures+Options OI
- Aug 2025: ~31.6M
- Nov 2025: ~35.1M
- **Feb 2026: 36.3M (record)**
- By tenor: 2Y 5.8M / 5Y 7.9M / 10Y 12.6M / 30Y 3.6M

### Total IR Futures OI
- Aug 2025: **40M contracts (record)**

### WTI Crude
- Current OI: ~4M contracts / ADV ~1M

### E-mini S&P 500 / Equity
- Year-by-year OI not available from public sources (need CME DataMine/CFTC COT)

## OI/ADV Ratios (Quality Indicator)

| Product | OI | ADV | OI/ADV | Interpretation |
|---------|----|----|--------|---------------|
| IR Overall | 40M | 14.2M | **2.8x** | Healthy: institutional hedging |
| SOFR | 13.7M | 5.4M | **2.5x** | Slightly more trading-oriented |
| WTI | ~4M | ~1M | **~4.0x** | Strong hedging (commercial) |

**Benchmark**: OI/ADV ~1x = pure day-trading / ~3x = hedging mix / ~10x = buy-and-hold. CME at 2.5-4.0x = institutional hedging dominant, **ADV quality is genuine, not speculative-driven**.

## OI Growth vs ADV Growth (2022-2025)
- IR OI grew ~33%
- IR ADV grew ~31%
- **Broadly matched** → balanced growth, not speculative divergence

## Treasury Basis Trade Warning
- NY Fed (May 2025): "large, leveraged, and growing" — >$1T notional, leveraged 50-100x
- Inflates both OI and volume simultaneously
- Record 3,526 large open interest holders (LOIH) partially mitigates concentration
- **Risk**: if basis trade unwinds rapidly → both OI and ADV could drop sharply

## Total CME ADV Progression
| Year | ADV | YoY |
|------|-----|-----|
| 2020 | 19.1M | — |
| 2021 | 19.6M | +3% |
| 2022 | 23.3M | **+19%** |
| 2023 | 24.4M | +5% |
| 2024 | 26.5M | +9% |
| 2025 | 28.1M | +6% |
| Jan 2026 | 29.6M | +15% |

## Remaining Data Gaps
1. E-mini S&P 500 year-by-year OI (CFTC COT needed)
2. OI breakdown by participant type (Dealer/Asset Mgr/Leveraged)
3. Historical OI/ADV ratio trend (compressing or expanding?)

## DM Anchors
- DM-OI-001: SOFR OI 13.7M (Aug 2025 record) [H, CME data]
- DM-OI-002: Treasury OI 36.3M (Feb 2026 record) [H, CME data]
- DM-OI-003: Total IR OI 40M (Aug 2025 record) [H, CME data]
- DM-OI-004: IR OI/ADV ratio 2.8x (healthy hedging mix) [R, calculated]
- DM-OI-005: IR OI growth 33% vs ADV growth 31% (2022-25, matched) [R, calculated]
- DM-OI-006: Treasury basis trade >$1T notional, leveraged 50-100x [H, NY Fed May 2025]
- DM-OI-007: Record 3,526 LOIH [H, CME data]
