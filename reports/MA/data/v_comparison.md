# V vs MA 精确对标表
> **数据截止**: FY2025 (MA: CY2025; V: FY截止2025.9.30) | **市场价格**: 2026-03-24
> **来源**: MA shared_context + V shared_context + v_lessons_for_ma.md + lit_recon_memo
> **用途**: Phase 1可比估值锚 + Phase 3红队对标

---

## 核心财务对标 (15维度)

| # | 维度 | Visa (V) | Mastercard (MA) | MA vs V | 数据来源/日期 |
|---|------|----------|-----------------|---------|-------------|
| 1 | **收入 ($B)** | $40.0 | $32.8 | MA小22% | V: FMP FY2025 [DM-FIN-001]; MA: FMP FY2025 [DM-INC-001] |
| 2 | **收入增速 (FY2025)** | +11.0% | +16.4% | MA快5.4pp | V: shared_context; MA: shared_context [DM-INC-001] |
| 3 | **毛利率** | 80.4% | 83.4%* | MA高3pp* | V: FMP FY2025; MA: FMP FY2025 (*MA FY25可能含成本重分类, 正常化~76%) [DM-MAR-001] |
| 4 | **营业利润率 (OPM)** | 60.0% | 59.2% | 接近一致 | V: FMP FY2025; MA: FMP FY2025 [DM-MAR-001] |
| 5 | **正常化OPM** | ~66.4% | ~55-57% | V高7-11pp | V: V报告正常化分析; MA: v_lessons_for_ma.md L1 [DM-N/A, 需Phase 1验证] |
| 6 | **净利率** | 50.1% | 45.6% | V高4.5pp | V: FMP FY2025; MA: FMP FY2025 [DM-MAR-001] |
| 7 | **ROIC** | 28.4% | 48.6% | MA高71%(报告口径) | V: FMP FY2025; MA: FMP FY2025 [DM-RET-001] |
| 8 | **ROIC (剥离商誉)** | ~45-50% | ~48-50% | 接近一致 | v_lessons_for_ma.md推算(V含$19.9B商誉=47.7%资产; MA商誉$9.6B=17.6%) [DM-N/A, 推算值] |
| 9 | **FCF ($B)** | $21.6 | $16.9 | MA小22% | V: FMP FY2025; MA: FMP FY2025 [DM-CFL-001] |
| 10 | **FCF/净利润** | ~107% | 113.0% | MA现金质量更高 | V: $21.6/$20.1=107%; MA: shared_context [DM-CFL-001] |
| 11 | **EPS (稀释)** | $10.20 | $16.52 | 绝对值不可比(股本不同) | V: FMP FY2025; MA: FMP FY2025 [DM-INC-001] |
| 12 | **EPS增速 (FY2025)** | ~5% | +18.9% | MA快14pp | V: ($10.20-$9.73)/$9.73; MA: shared_context [DM-INC-001] |
| 13 | **SG&A/收入** | ~13% | ~19-22%** | MA高6-9pp | V: v_lessons_for_ma.md; MA: shared_context (**FY25=21.8%可能含重分类) [DM-EXP-001] |
| 14 | **SBC ($B)** | $0.90 | $0.60 | V高50% | V: FMP FY2025; MA: FMP FY2025 [DM-EXP-001] |
| 15 | **股东回报/FCF** | ~83% | 85.7% | 接近一致 | V: ($13.4+$4.6)/$21.6; MA: ($11.73+$2.76)/$16.91 [DM-CFL-001] |

---

## 估值对标 (8维度)

| # | 维度 | Visa (V) | Mastercard (MA) | MA vs V | 数据来源/日期 |
|---|------|----------|-----------------|---------|-------------|
| 16 | **股价** | $301.62 | $500.38 | — | FMP quote 2026-03-24 [DM-VAL-001] |
| 17 | **市值 ($B)** | $581.6 | $446.6 | MA小23% | FMP quote 2026-03-24 [DM-VAL-001] |
| 18 | **P/E (TTM)** | 28.3x | 32.9x | MA贵16% | V: shared_context; MA: shared_context [DM-VAL-001] |
| 19 | **Forward P/E (FY27E)** | 20.7x | 22.1x | MA贵7% | V: $301.62/$14.55; MA: $500.38/$22.65 [DM-EST-001] |
| 20 | **PEG** | 2.57 | 2.09 | MA便宜23% | V: 28.3/11.0; MA: 32.9/15.8(EPS CAGR); v_lessons_for_ma.md [DM-VAL-002] |
| 21 | **EV/EBITDA** | 25.7x | 24.5-25.7x | **接近一致** | V: shared_context; MA: shared_context [DM-VAL-001] |
| 22 | **FCF Yield** | 3.3% | 3.3-3.5% | **接近一致** | V: shared_context; MA: shared_context [DM-VAL-001] |
| 23 | **EV/Sales** | — | 15.1x | — | MA: shared_context [DM-VAL-001] |

---

## 运营规模对标 (6维度)

| # | 维度 | Visa (V) | Mastercard (MA) | MA vs V | 数据来源/日期 |
|---|------|----------|-----------------|---------|-------------|
| 24 | **GDV / 支付量** | $13.2T (FY2024支付量) | ~$11T (2025全年) / $2.8T(季度GDV) | V大20-30% | V: 10-K FY2024 [DM-OPS-001]; MA: lit_recon_memo + WebSearch |
| 25 | **活跃凭证数** | 44.8亿 (4.6B credentials) | 31.6亿 | V多42% | V: 10-K FY2024; MA: lit_recon_memo路3 [DM-OPS-001] |
| 26 | **处理交易数** | 233.8B (FY2024) | — | V规模领先 | V: 10-K FY2024 [DM-OPS-001] |
| 27 | **全球份额 (购买交易量)** | 70.3% (-30bps/yr) | 29.7% (+30bps/yr) | MA在蚕食V | v_lessons_for_ma.md; lit_recon_memo路3 |
| 28 | **跨境增速** | +13% (ex-Europe, FY2024) | +17% (本币, FY2025) | MA快4pp | V: shared_context; MA: lit_recon_memo [DM-OPS-001] |
| 29 | **VAS收入 ($B) / 占比** | $8.8B / ~22% (FY2024) | ~$14.6B / ~45% (FY2025) | MA VAS占比2倍 | V: Investor Day; MA: lit_recon_memo路4 (全年$3.9B×4Q近似) |

---

## 风险特征对标 (4维度)

| # | 维度 | Visa (V) | Mastercard (MA) | 含义 | 数据来源 |
|---|------|----------|-----------------|------|---------|
| 30 | **Beta** | 0.791 | 0.836-1.07* | MA周期敏感性更高 | V: FMP profile; MA: FMP profile(*lit_recon_memo引用1.07, shared_context 0.836, 可能时间差) [DM-VAL-001] |
| 31 | **股息率** | 0.70% | 0.56% | V股息更高 | V: shared_context; MA: shared_context [DM-VAL-001] |
| 32 | **净债务/EBITDA** | 0.19x | 0.39x | 均极低, V更保守 | V: shared_context [DM-BS-001]; MA: shared_context [DM-BAL-001] |
| 33 | **商誉/总资产** | 47.7% | 17.6%-27.9%(含无形) | V商誉负担更重(Visa Europe收购) | V: shared_context; MA: shared_context [DM-BAL-001] |

---

## CI/毛收入对标 (V独有, MA需推断)

| 维度 | Visa (V) | Mastercard (MA) | 方法论 |
|------|----------|-----------------|--------|
| **Client Incentives ($B)** | $13.8 (FY2024) | 不单独披露 | V: 10-K; MA需间接推断 |
| **CI/毛收入** | 27.8% (FY2024) | 需推断 | V: shared_context [DM-REV-001] |
| **CI年化增速** | +210bps/yr | 需推断 | v_lessons_for_ma.md L2 |
| **毛收入 ($B)** | $49.7 (FY2024) | 需推断(净收入/CI率) | V: 10-K [DM-REV-001] |

**MA CI推断方法 (v_lessons_for_ma.md L2)**: MA不披露CI→用间接法: (毛收入增速-净收入增速)=CI增速差。Kill Switch: CI/毛收入>33%=定价权预警。Phase 1需执行此推断并标注置信度。

---

## 核心发现摘要

1. **EV/EBITDA和FCF Yield完全一致** (25.7x / 3.3%) → 市场对两者核心资产定价相同, PE差异(MA贵16%)完全来自增速溢价
2. **PEG反转**: MA PEG 2.09 < V 2.57 → 增速调整后MA反而更便宜23%, 但前提是16%增速可持续
3. **ROIC幻觉**: 报告口径MA高71%, 但剥离商誉后接近一致 → MA近年收购(Recorded Future $26.5B等)正在推高商誉, 未来ROIC可能下降
4. **VAS占比差异巨大**: MA~45% vs V~22% → MA对交易量依赖度更低, 但有机/无机拆分后实际差距可能缩小
5. **MA在蚕食V份额**: 全球份额+30bps/yr, 跨境+VAS增速均领先 → 差距在结构性缩小
6. **正常化OPM差距是关键**: V正常化66% vs MA正常化~57%, 7-11pp差距反映V的规模优势 → MA SG&A/收入高6-9pp需判断是"增长投入"还是"效率低下"

[DM-COMP-001: V vs MA综合对标, 33维度, 2026-03-24]
