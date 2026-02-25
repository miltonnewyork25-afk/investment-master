# BABA Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-25
## 数据预取版本: v4.0
## 注意: BABA财年截止3月31日 | FY2025=2024.4-2025.3 | FY2026=2025.4-2026.3(当前)
## FMP数据截止: Q2 FY2026 (Sep 2025) | Q3 FY2026 (Dec 2025)已发布(2026.2.20)但FMP尚未入库

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue ¥996.3B (+5.9% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25
- **用于**: Ch02, Ch14 Reverse DCF

### DM-FIN-002
- **值**: FY2025 Gross Profit ¥398.1B (Margin 40.0%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25
- **用于**: Ch02, Ch05 定价权

### DM-FIN-003
- **值**: FY2025 Operating Income ¥140.9B (Margin 14.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-004
- **值**: FY2025 EBITDA ¥182.7B (Margin 18.3%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-005
- **值**: FY2025 Net Income ¥130.1B (Margin 13.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-006
- **值**: FY2025 EPS Diluted ¥53.60
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-007
- **值**: FY2025 OCF ¥164.8B | CapEx ¥86.7B (+161% YoY) | FCF ¥78.2B (-48% YoY)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-25
- **用于**: Ch02, Ch14 FCF预测

### DM-FIN-008
- **值**: FY2025 Buyback ¥87.4B | Dividends ¥29.3B | Total Return ¥116.7B (14.7% yield)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-25
- **用于**: Ch07 股东回报

### DM-FIN-009
- **值**: FY2025 R&D ¥57.2B (5.7% of Rev) | S&M ¥144.0B (14.5%) | G&A ¥44.2B (4.4%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-010
- **值**: FY2025 Interest Expense ¥9.6B | Interest Income ¥20.8B | Net Interest +¥11.2B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-25

### DM-FIN-011 (5年趋势)
- **值**: Revenue CAGR FY2021-FY2025 = 8.6% | FY2023-FY2025 = 7.1%
- **类型**: H
- **来源**: MCP fmp_data income计算 (¥717.3B→¥996.3B)
- **日期**: 2026-02-25

### DM-FIN-012 (5年趋势)
- **值**: Gross Margin: 41.3%(FY21)→36.8%(FY22)→36.7%(FY23)→37.7%(FY24)→40.0%(FY25)
- **类型**: H
- **来源**: MCP fmp_data income计算
- **日期**: 2026-02-25
- **用于**: 定价权恢复叙事

### DM-FIN-013 (季度趋势)
- **值**: Q1 FY26: Rev ¥247.7B, OpInc ¥35.0B(14.1%) | Q2 FY26: Rev ¥247.8B, OpInc ¥5.4B(2.2%)
- **类型**: H
- **来源**: MCP fmp_data income quarterly
- **日期**: 2026-02-25
- **用于**: Q2即时零售补贴战影响分析

### DM-FIN-014 (季度异常)
- **值**: Q2 FY26 S&M费用 ¥66.5B (+25% QoQ from ¥53.2B) — 即时零售补贴主因
- **类型**: H
- **来源**: MCP fmp_data income quarterly
- **日期**: 2026-02-25

### DM-FIN-015 (CapEx爆炸)
- **值**: CapEx: ¥41.7B(FY21)→¥52.4B(FY22)→¥34.4B(FY23)→¥33.2B(FY24)→¥86.7B(FY25, +161%)
- **类型**: H
- **来源**: MCP fmp_data cashflow
- **日期**: 2026-02-25
- **用于**: AI投资ROI分析

### DM-FIN-016 (SBC缺失)
- **值**: FMP显示SBC=$0 — 已知FMP parser问题，需从20-F手动提取
- **类型**: S
- **依据**: 历史报告教训(RBLX SBC陷阱)
- **来源**: FMP数据质量审计
- **日期**: 2026-02-25

---

## Section B: 资产负债表锚点

### DM-FIN-020
- **值**: FY2025 Cash+ST Investments ¥464.8B | Total Assets ¥1,807.0B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-25

### DM-FIN-021
- **值**: FY2025 Total Debt ¥248.5B | Net Debt ¥66.8B (首次转为净负债, FY2024净现金¥73.5B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-25
- **用于**: 资本结构变化——AI投资消耗现金

### DM-FIN-022
- **值**: FY2025 Goodwill ¥255.9B (14.2% of Assets) | Long-term Investments ¥567.9B (31.4%)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-25
- **用于**: 隐藏资产/商誉风险

### DM-FIN-023
- **值**: FY2025 Shareholders Equity ¥1,011.4B | Minority Interest ¥80.4B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-25

### DM-FIN-024
- **值**: Shares Outstanding Diluted: 2,748M(FY21)→2,723M→2,639M→2,545M→2,415M(FY25) = -12.1%累计减少
- **类型**: H
- **来源**: MCP fmp_data income (weightedAverageShsOutDil)
- **日期**: 2026-02-25
- **用于**: 回购力度评估

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 当前股价 $153.11 (2026-02-24) | 52周: $95.73-$192.67 | 2年: $66.24-$189.34
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-25

### DM-VAL-002
- **值**: Market Cap ~¥2,254B (~$355B) | EV ~¥2,320B
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-02-25

### DM-VAL-003
- **值**: P/E(FY2025) 17.3x | P/E(TTM) ~18.3x | Forward P/E ~17.4x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025 + analyze_stock
- **日期**: 2026-02-25

### DM-VAL-004
- **值**: EV/EBITDA 12.7x | EV/Sales 2.33x | P/B 2.23x | P/FCF 28.8x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-02-25

### DM-VAL-005
- **值**: FMP DCF Fair Value $277.24 (当前$153.11 = 81%上行空间)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-02-25
- **用于**: Ch14 估值锚点

### DM-VAL-006
- **值**: FMP Rating A- (Overall 4/5 | DCF 5/5 | ROE 4/5 | ROA 4/5 | D/E 3/5 | P/E 2/5 | P/B 2/5)
- **类型**: H
- **来源**: MCP fmp_data rating
- **日期**: 2026-02-25

### DM-VAL-007
- **值**: Dividend Yield 1.3% | Buyback Yield 5.9% | Total Shareholder Yield 7.2%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-02-25

### DM-VAL-008 (估值历史)
- **值**: P/E: 26.7x(FY21)→29.9x(FY22)→25.3x(FY23)→16.7x(FY24)→17.3x(FY25) — 从泡沫回归
- **类型**: H
- **来源**: MCP fmp_data ratios 5年
- **日期**: 2026-02-25

### DM-VAL-009 (共识估计)
- **值**: FY2026E Rev ¥1,048B(+5.2%) EPS ¥41.90 | FY2027E Rev ¥1,158B(+10.4%) EPS ¥60.98 | FY2028E EPS ¥78.25
- **类型**: H
- **来源**: MCP fmp_data estimates (34-36 analysts)
- **日期**: 2026-02-25
- **用于**: Ch14 Reverse DCF

### DM-VAL-010 (Forward估值)
- **值**: FY2027E P/E = 153.11*7.26/60.98 = 18.2x (CNY-adjusted) — 即使利润恢复仍不便宜
- **类型**: R
- **推理链**: $153.11→¥1,111/ADS(×7.26汇率) ÷ FY2027E EPS ¥60.98 = 18.2x
- **证伪条件**: 汇率大幅偏离 或 FY2027E EPS上修>¥70
- **来源**: 基于DM-VAL-009推算
- **日期**: 2026-02-25

---

## Section D: 同行对比锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: 中国科技同行P/E: JD 8.9x | PDD 10.7x | BIDU 11.8x — BABA 20.2x溢价71-127%
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-25
- **用于**: Ch14 相对估值

### DM-MKT-002
- **值**: 新兴市场电商P/E: MELI 47.0x | SE 46.8x — BABA折价57-67%
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-25

### DM-MKT-003
- **值**: ROE对比: PDD 30.5% >> SE 15.7% > JD 11.7% ≈ BABA 11.2% >> BIDU 3.1%
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-25

### DM-MKT-004
- **值**: Profit Margin: PDD 28.5% >> BIDU 17.8% > BABA 13.1% > MELI 9.2% > JD 3.6% > SE 2.6%
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-25

### DM-MKT-005 (宏观)
- **值**: S&P500 6890 | DJIA 49175 | NASDAQ 22864 | VIX 19.49 | CAPE 40.08(98th pct) | Buffett 219%(100th)
- **类型**: H
- **来源**: MCP get_market_overview + baggers_summary
- **日期**: 2026-02-25

---

## Section E: 财务健康锚点

### DM-FIN-030
- **值**: Altman Z-Score 3.34 (安全区>2.99) | Piotroski F-Score 8/9 (很强)
- **类型**: H
- **来源**: MCP fmp_data financial-scores
- **日期**: 2026-02-25

### DM-FIN-031
- **值**: ROIC(TTM) 32.1% | ROE(TTM) 12.4% | ROA(TTM) 6.8% | ROTCE 16.3%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-25

### DM-FIN-032
- **值**: Current Ratio 1.54 | Quick Ratio 1.49 | D/E 0.25 | Net Debt/EBITDA 0.37x | Interest Coverage 14.7x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-02-25

### DM-FIN-033
- **值**: OCF/NI(TTM) 1.05 (现金质量良好) | FCF/NI(TTM) -0.22 (CapEx吞噬FCF)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-25

### DM-FIN-034
- **值**: CapEx/Depreciation 34.5x (FY2025) — 极端高比率，表明大规模新增投资(AI基础设施)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-25

---

## Section F: 技术面锚点

### DM-MKT-010
- **值**: RSI 32.3(超卖) | SMA20 $161.89(下方) | SMA50 $158.97(下方) | SMA200 $144.54(上方)
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-02-25

### DM-MKT-011
- **值**: Beta 0.39 (低贝塔，与大盘低相关) | 2年回报率 +107.9% (从$66.24低点)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-25

---

## Section G: 投资温度评估

### 宏观温度: +1.7 (偏热)
- CAPE 40.08 (98th pct): +2.0
- Buffett指标 219% (100th pct): +2.0
- ERP 4.5% (66th pct): +1.0
- 平均: +1.67

### 公司温度: -1.0 (偏冷)
- FMP DCF隐含81%上行空间: -2.0
- RSI 32.3超卖: -1.0
- P/E vs中国同行溢价: +1.0
- Piotroski 8/9: -1.0
- FCF转负(投资期): +0.5
- 毛利率恢复趋势: -0.5
- 平均: -0.5

### 综合温度: +0.3 (中性偏暖)
- 宏观热+公司冷=信号矛盾
- 适合Tier 3深度研究(已确认)
- **中国折价使全球宏观温度参考价值有限**

---

## Section H: SGI速判 (专才-通才光谱)

### SGI = 5.1 → 混合模型

| 维度 | 评分 | 权重 | 加权 | 依据 |
|------|:----:|:----:|:----:|------|
| HHI_rev (收入集中度) | 6.5 | 0.30 | 1.95 | TTG ~65%收入,但6个业务板块 |
| R&D_conc (R&D集中度) | 3.5 | 0.25 | 0.88 | R&D分散于云/电商/AI/物流 |
| MarketPos (市场地位) | 6.0 | 0.20 | 1.20 | 电商#1(40%份额)+云#1(36%) |
| SwitchCost (切换成本) | 4.5 | 0.15 | 0.68 | 商家multi-home常见,但全栈切换有成本 |
| BrandClarity (品牌清晰度) | 3.5 | 0.10 | 0.35 | "中国电商+云巨头"需多句话解释全貌 |

### SGI路由决策
- SGI 4-6 → **混合模型**: 核心关注品类间协同是否真实可量化
- 预期P/E范围: 行业中位数 ±20%
- BABA P/E 20.2x vs 中国科技中位数 ~10.7x = 溢价89% → **显著偏离预期**
- 但vs全球科技平台中位数 ~27x = 折价25% → 双市场定价异常
- **标记"双市场定价异常"**: Phase 4重点验证折价归因(VIE? 增长? 治理? 全部?)

---

## Section I: 文献侦察核心发现摘要

(详见 data/lit_recon_memo.md)

### 4个非共识假说候选
1. **"零值云"假说**: 市场给阿里云估值≈0, 实际35.8%AI云份额+34%增速 → $57-125B
2. **"份额底"假说**: 电商份额将在35-40%企稳(抖音天花板+监管限制补贴)
3. **"隐藏资产释放"假说**: 蚂蚁+T-Head+投资组合>$100B → 当前仅TTG被定价
4. **"AI军备竞赛陷阱"假说(看空)**: $53B投入+开源模式=永久低margin

### 关键数据缺口(Phase 0需填补)
- 分部详细收入/EBITA (FMP无, 需20-F/季报)
- Q3 FY2026最新季报数据 (FMP尚未入库)
- SBC真实数据 (FMP=$0, 需20-F提取)
- 蚂蚁集团最新财务

---

## Section J: Phase 1-5关键发现

> Phase推进时追加。

[Phase推进时追加]

---

## 锚点汇总

| 类型 | 数量 | 占比 |
|------|:----:|:----:|
| H (硬数据) | 33 | 87% |
| R (合理推断) | 1 | 3% |
| S (主观判断) | 4 | 10% |
| **总计** | **38** | **100%** |
