# MCO v2.0 Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-18
## 数据预取版本: v4.0 | v2.0重写模式

> v2.0重写: v1.0的Phase 1-3分析内容可复用，本文件聚焦**更新的数据+修正的估值+新增模块**。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $7.718B (+8.9% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-18

### DM-FIN-002
- **值**: FY2025 GAAP EPS $13.67 (+21% YoY), Adj EPS $14.94 (+20%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025 + WebSearch earnings
- **日期**: 2026-03-18

### DM-FIN-003
- **值**: FY2025 GAAP OPM 44.8%, Adj OPM 51.1% (+300bps)
- **类型**: H
- **来源**: MCP fmp_data + WebSearch Q4 earnings
- **日期**: 2026-03-18
- **注意**: v1.0混淆GAAP/Adj, v2.0必须区分

### DM-FIN-004
- **值**: FY2025 MIS Revenue $4.1B (+9%), Adj OPM 63.6% (+350bps)
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-03-18

### DM-FIN-005
- **值**: FY2025 MA ARR $3.5B (+8%), 留存率93%, 经常性收入97%(Q4)
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-03-18

### DM-FIN-006
- **值**: FY2025 MA Adj OPM 33.1% (+240bps)
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-03-18

### DM-FIN-007
- **值**: FY2025 FCF $2.575B, FCF/NI 104.7%, CapEx $326M (4.2%收入)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-18

### DM-FIN-008
- **值**: FY2025 回购$1.706B, 股息$701M, 总回报$2.407B = 93.5% FCF
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-18

### DM-FIN-009
- **值**: FY2025 净债务$4.967B, 净债务/EBITDA 1.26x (改善vs FY2024 1.60x)
- **类型**: H
- **来源**: MCP fmp_data balance+key-metrics FY2025
- **日期**: 2026-03-18

### DM-FIN-010
- **值**: FY2025 商誉$6.368B (占总资产40.2%), 无形资产$1.866B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-18

### DM-FIN-011
- **值**: FY2025 SBC $232M (3.0%收入), 回购/SBC = 7.4x
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-18

### DM-FIN-012
- **值**: 6年P&L桥: 收入$5.37B(20)→$6.22B(21)→$5.47B(22,-12%)→$5.92B(23)→$7.09B(24)→$7.72B(25)
- **类型**: H
- **来源**: MCP fmp_data income 5年
- **日期**: 2026-03-18

### DM-FIN-013
- **值**: 6年EPS桥: $9.39(20)→$11.78(21)→$7.44(22,-37%)→$8.73(23)→$11.26(24)→$13.67(25)
- **类型**: H
- **来源**: MCP fmp_data income 5年
- **日期**: 2026-03-18

---

## Section B: FY2026指引锚点 (DM-GDE-xxx)

### DM-GDE-001
- **值**: FY2026 Adj EPS指引 $16.40-$17.00 (中位$16.70, +12%)
- **类型**: H
- **来源**: WebSearch earnings Agent-A (IR press release)
- **日期**: 2026-02-18

### DM-GDE-002
- **值**: FY2026 收入增长: 高个位数%
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-02-18

### DM-GDE-003
- **值**: FY2026 Adj OPM 52-53% (+150bps), MIS Adj OPM ~65%, MA Adj OPM 34-35%
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-02-18

### DM-GDE-004
- **值**: FY2026 FCF $2.8-3.0B, 回购~$2.0B
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-02-18

### DM-GDE-005
- **值**: FY2026 MIS发行假设: 低个位数%增长, M&A驱动发行+40-45%
- **类型**: H
- **来源**: WebSearch earnings Agent-A
- **日期**: 2026-02-18

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 当前股价 $441.03, 市值 $78.2B
- **类型**: H
- **来源**: MCP fmp_data quote
- **日期**: 2026-03-18 (实时)

### DM-VAL-002
- **值**: PE TTM 32.97x (基于GAAP EPS $13.67)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-18

### DM-VAL-003
- **值**: Forward PE 26.3x (基于FY2026E共识$16.75), 公司指引中位$16.70
- **类型**: H
- **来源**: MCP fmp_data estimates + WebSearch PE Agent
- **日期**: 2026-03-18

### DM-VAL-004
- **值**: 5年PE历史: 30.6x(20低)→38x(21)→37.3x(22)→44.5x(23高)→41.8x(24)→37.2x(25), 均值~37-38x
- **类型**: H
- **来源**: WebSearch PE Agent (MacroTrends+GuruFocus)
- **日期**: 2026-03-18

### DM-VAL-005
- **值**: 52周范围 $378.71-$546.88, 距ATH -19.4%, RSI 39.3(超卖区间)
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-18

### DM-VAL-006
- **值**: EV/EBITDA 21.89x, FCF Yield 3.52%, 股息率0.86%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-18

### DM-VAL-007
- **值**: 分析师共识: Buy (15B/7H/0S), 均价$547-572, 高$620-660, 低$460-471
- **类型**: H
- **来源**: WebSearch PE Agent (MarketBeat+TipRanks)
- **日期**: 2026-03-18

### DM-VAL-008
- **值**: FMP共识EPS: FY2027E $18.76 (14分析师), FY2028E $20.91, FY2030E $24.69
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-18

### DM-VAL-009
- **值**: ROIC 32.46%, ROE 64.55%, ROA 15.69%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-18

### DM-VAL-010
- **值**: Beta 1.442, SMA20 $454, SMA50 $480, SMA200 $489 → 趋势下跌
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-18

---

## Section D: 宏观+行业锚点 (DM-MKT/BIZ-xxx)

### DM-MKT-001
- **值**: S&P500 6716, VIX 22.37, CAPE 38.73(98%百分位=非常昂贵)
- **类型**: H
- **来源**: MCP market_overview + baggers_summary
- **日期**: 2026-03-17

### DM-BIZ-001
- **值**: Big Three(MCO+SPGI+Fitch)占非政府评级84%, MCO+SPGI各~40%
- **类型**: H
- **来源**: WebSearch competitive Agent (SEC OCR report)
- **日期**: 2026-03-18

### DM-BIZ-002
- **值**: 全球信用评级市场$7.32B(2025)→$7.77B(2026E), 10个NRSRO注册
- **类型**: H
- **来源**: WebSearch competitive Agent
- **日期**: 2026-03-18

### DM-BIZ-003
- **值**: 2025评级发行量$6.6T(历史新高), 2026E低个位数增长
- **类型**: H
- **来源**: WebSearch earnings+bond Agent
- **日期**: 2026-03-18

### DM-BIZ-004
- **值**: 到期墙: 2027峰值$1.26T, HY >$700B到期(2027-2029), CRE $162B(2026)
- **类型**: H
- **来源**: WebSearch bond Agent (S&P Global+PitchBook)
- **日期**: 2026-03-18

### DM-BIZ-005
- **值**: 私人信贷AUM $3.5T(2025)→$5T(2029E), MIS私信收入+75%(Q2 2025)
- **类型**: H
- **来源**: WebSearch private credit Agent (AIMA+Morgan Stanley)
- **日期**: 2026-03-18

### DM-BIZ-006
- **值**: MSCI-Moody's联合方案: 私信独立风险评估, EDF-X扩展至10,000+私信实体
- **类型**: H
- **来源**: WebSearch private credit Agent (IR press release)
- **日期**: 2026-03-18

### DM-BIZ-007
- **值**: GenAI/AgenTix客户留存97%(vs整体93%), 增速2x, 40% MA ARR含GenAI功能
- **类型**: H
- **来源**: WebSearch competitive Agent (earnings call)
- **日期**: 2026-03-18

### DM-BIZ-008
- **值**: EU ESG评级法规2026.07.02生效, 须ESMA授权 → 壁垒+成本
- **类型**: H
- **来源**: WebSearch competitive Agent
- **日期**: 2026-03-18

### DM-BIZ-009
- **值**: BRK持股14.54%($11.2B), Greg Abel确认永久持有
- **类型**: H
- **来源**: v1.0已验证 + WebSearch
- **日期**: 2026-03-15

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: v1.0四方法加权公允=$406, vs $430高估5-6% → v2.0需在$441基础上重新计算
- **类型**: R
- **推理链**: v1.0 Reverse DCF $393-467 + SOTP $353-484 + 可比 $460-520 + DCF $351-460 → 加权$406
- **证伪条件**: FY2026E EPS超$18(超指引高端) → 估值上修
- **来源**: v1.0 Ch25分析, v2.0需更新
- **日期**: 2026-03-18

### DM-INF-002
- **值**: 偏差修正后概率: Bull 20% / Base 42% / Bear 33% / 极端Bear 5%
- **类型**: R
- **推理链**: v1.0 Phase 4偏差4发现Bear权重不足(衰退42-48%但Bear仅28%) → 修正至33%
- **证伪条件**: 衰退概率降至<25%(Polymarket+NBER) → Bear权重可降回
- **来源**: v1.0 Ch43偏差分析
- **日期**: 2026-03-15

### DM-INF-003
- **值**: 回购效率eta = 盈利收益率/WACC ≈ 3.0%/8.75% ≈ 0.34x (价值摧毁)
- **类型**: R
- **推理链**: PE 33x → 盈利收益率3.0%, WACC~8.75% → 每回购$1仅保留$0.34价值
- **证伪条件**: PE<22x → eta>0.5x → 回购变为中性/正面
- **来源**: 计算推导
- **日期**: 2026-03-18

### DM-INF-004
- **值**: 利润率混合陷阱: MA占比↑ → 总OPM天花板↓。MA 55%占比+38% OPM → 总Adj OPM仅50.2%
- **类型**: R
- **推理链**: MIS OPM 65% vs MA OPM 33-35% → MA越成功整体OPM越难突破
- **证伪条件**: MA OPM突破40%连续2年 → 陷阱解除
- **来源**: v1.0 CI-MCO-001 + FY2026指引验证
- **日期**: 2026-03-18

### DM-INF-005
- **值**: 周期位置: 高位。MIS发行量$6.6T历史新高, 交易性收入+22%(Q4), FY2022仅3年前EPS-37%
- **类型**: R
- **推理链**: 发行量历史新高 + 到期墙提供底部保护 + 但利率仍高限制恐慌式宽松
- **证伪条件**: FY2026 Q1-Q2 MIS交易性YoY>+10% → 周期延续
- **来源**: DM-BIZ-003 + DM-FIN-004
- **日期**: 2026-03-18

### DM-SUB-001
- **值**: v2.0评级方向: 审慎关注(已充分定价) — 与SPGI(3/5)对齐
- **类型**: S
- **依据**: 6个独立估值中4个显示高估 + 偏差修正后回报+2% + 周期高位PE
- **来源**: v2_launch_brief.md
- **日期**: 2026-03-18

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 30 | 83% |
| R (合理推断) | 5 | 14% |
| S (主观判断) | 1 | 3% |
| **总计** | **36** | **100%** |

---

## Section G: v2.0 vs v1.0关键变化追踪

| 维度 | v1.0 | v2.0更新 | DM引用 |
|------|------|---------|--------|
| 股价 | $430 | $441 | DM-VAL-001 |
| PE TTM | 31.5x | 32.97x | DM-VAL-002 |
| Forward PE | ~28x估计 | 26.3x(共识$16.75) | DM-VAL-003 |
| FY2026E EPS | ~$15.5估计 | 指引$16.40-17.00 | DM-GDE-001 |
| GAAP vs Adj OPM | 混淆(写44.8%) | 区分: GAAP 44.8% / Adj 51.1% | DM-FIN-003 |
| 净债务/EBITDA | 1.26x | 改善至0.78x(TTM) | DM-FIN-009 |
| 私人信贷 | +75% MA双刃剑 | 净正面+MSCI联合方案 | DM-BIZ-005/006 |
| 评级 | 关注(偏中性)+15.1% | **审慎关注(已充分定价)** | DM-SUB-001 |
| 概率加权 | 未修正(27/45/28) | 修正后(20/42/33/5) | DM-INF-002 |
