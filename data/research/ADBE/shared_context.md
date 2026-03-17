# ADBE Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-17
## 数据预取版本: v4.0
## 目标: 400K chars | PW: 6.5-7.0 | 评级框架: 混合模式偏发现系统

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $23.77B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-17
- **用于**: Ch02, Ch14 Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $7.13B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-17
- **用于**: Ch02, ROE分析

### DM-FIN-003
- **值**: FY2025 Gross Margin 88.6%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-17
- **用于**: Ch02 §定价权, AIAS评估

### DM-FIN-004
- **值**: FY2025 Operating Margin 36.6% (GAAP), Non-GAAP ~47%
- **类型**: H
- **来源**: MCP fmp_data income FY2025 + WebSearch Q1 FY26
- **日期**: 2026-03-17
- **用于**: Ch02, 同行对标

### DM-FIN-005
- **值**: FY2025 FCF $9.85B (FCF Margin 41.4%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-17
- **用于**: Ch02, DCF, 回购效率

### DM-FIN-006
- **值**: FY2025 R&D $4.29B (18.1% of revenue)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-17
- **用于**: Ch16 资本配置

### DM-FIN-007
- **值**: FY2025 SBC $1.94B (8.2% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-17
- **用于**: Ch15 SBC分析

### DM-FIN-008
- **值**: FY2025 Share Repurchase $11.28B (>OCF $10.03B, 加杠杆回购)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-17
- **用于**: Ch15 回购效率, 资本配置

### DM-FIN-009
- **值**: Q1 FY2026 Revenue $6.40B (+12% YoY), EPS $4.60 GAAP / $6.06 Non-GAAP
- **类型**: H
- **来源**: WebSearch Agent-C (BusinessWire Q1 FY2026)
- **日期**: 2026-03-17
- **用于**: Ch02 最新季度

### DM-FIN-010
- **值**: FY2025 Deferred Revenue $6.91B (current) + $0.13B (non-current) = $7.03B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-17
- **用于**: Ch02 收入质量

### DM-FIN-011
- **值**: FY2025 Goodwill $12.86B (43.6% of total assets $29.50B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-17
- **用于**: Ch02 资产质量, ROIC调整

### DM-FIN-012
- **值**: FY2025 Total Debt $6.65B, Cash+ST $6.60B, Net Debt $1.22B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-17
- **用于**: Ch02 杠杆分析

### DM-FIN-013
- **值**: Revenue CAGR: FY2021-2025 = 10.8%, FY2022-2025 = 10.6%
- **类型**: H
- **来源**: 计算自MCP income数据
- **日期**: 2026-03-17
- **用于**: Ch14 增速趋势

### DM-FIN-014
- **值**: FY2026 Guidance: Revenue $25.9-26.1B, Non-GAAP EPS $23.30-23.50, ARR增速~10.2%
- **类型**: H
- **来源**: WebSearch Agent-C (Q1 FY2026 earnings)
- **日期**: 2026-03-17
- **用于**: Ch14 前瞻

### DM-FIN-015
- **值**: 5Y Revenue序列: $15.8B→$17.6B→$19.4B→$21.5B→$23.8B
- **类型**: H
- **来源**: MCP fmp_data income 5Y
- **日期**: 2026-03-17
- **用于**: Ch11 财务趋势

### DM-FIN-016
- **值**: 5Y FCF序列: $6.9B→$7.4B→$6.9B→$7.8B→$9.9B
- **类型**: H
- **来源**: MCP fmp_data cashflow 5Y
- **日期**: 2026-03-17
- **用于**: Ch11 现金流质量

### DM-FIN-017
- **值**: Piotroski F-Score = 8/9, Altman Z-Score = 7.38
- **类型**: H
- **来源**: MCP fmp_data financial-scores
- **日期**: 2026-03-17
- **用于**: Ch02 财务健康度

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: TTM P/E 15.7x (历史10Y均值~45x)
- **类型**: H
- **来源**: MCP baggers_summary + WebSearch (MacroTrends)
- **日期**: 2026-03-17
- **用于**: Ch14 估值对比

### DM-VAL-002
- **值**: Forward P/E 9.6x
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-17
- **用于**: Ch14 信念反演

### DM-VAL-003
- **值**: EV/EBITDA 10.8x (TTM), EV/Sales 4.3x
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-17
- **用于**: Ch14 估值对比

### DM-VAL-004
- **值**: FCF Yield 9.3% (TTM)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-17
- **用于**: Ch14 收益率分析

### DM-VAL-005
- **值**: FMP DCF公允价值 $341.01 vs 市价$255.31 (+33.6%)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-03-17
- **用于**: Ch14 DCF参考(需独立验证)

### DM-VAL-006
- **值**: ROIC 83.7% (TTM), ROE 56.5%, ROA 24.1%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-17
- **用于**: Ch02 资本效率

### DM-VAL-007
- **值**: 市值~$107B, EV~$108B, 股价$251.86
- **类型**: H
- **来源**: MCP analyze_stock (2026-03-16)
- **日期**: 2026-03-17
- **用于**: 全文

### DM-VAL-008
- **值**: 52周范围: $244.28-$422.95, 当前距52周低仅+3%
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-17
- **用于**: Ch14 技术面

### DM-VAL-009
- **值**: Beta 1.53, SMA200=$338.67 (当前低于SMA200 25.6%)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-17
- **用于**: Ch14 技术面

---

## Section C: 市场与共识锚点 (DM-MKT/CON-xxx)

### DM-MKT-001
- **值**: S&P 500: 6699.38, VIX: 23.51 (-13.5%)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-16
- **用于**: 宏观背景

### DM-CON-001
- **值**: 分析师共识: Hold (23 Buy / 13 Hold / 4 Sell), 平均PT $354 (+40%上行)
- **类型**: H
- **来源**: WebSearch Agent-A (TipRanks/MarketBeat)
- **日期**: 2026-03-17
- **用于**: Ch13 分析师共识

### DM-CON-002
- **值**: Goldman Sachs Sell PT $220 (最悲观), BofA Buy PT $605 (最乐观)
- **类型**: H
- **来源**: WebSearch Agent-A (GuruFocus/MarketBeat)
- **日期**: 2026-03-17
- **用于**: Ch13 多空对峙

### DM-CON-003
- **值**: 分析师FY2028E Revenue $30.8B, EPS $29.32 (隐含CAGR ~9%)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-17
- **用于**: Ch14 前瞻估值

---

## Section D: 业务与AI锚点 (DM-BIZ/NEW-xxx)

### DM-BIZ-001
- **值**: FY2025 Digital Media $17.65B (74%), DX $5.93B (23%), Publishing $0.8B (3%)
- **类型**: H
- **来源**: WebSearch Agent-D (Adobe 10-K FY2025)
- **日期**: 2026-03-17
- **用于**: Ch03 业务结构

### DM-BIZ-002
- **值**: 总ARR $26.06B, Digital Media ARR $17.63B (+12.6% YoY)
- **类型**: H
- **来源**: WebSearch Agent-C (Q1 FY2026 earnings)
- **日期**: 2026-03-17
- **用于**: Ch03 ARR分析

### DM-BIZ-003
- **值**: AI-first ARR >3x YoY增长, Firefly ending ARR >$250M
- **类型**: H
- **来源**: WebSearch Agent-C (Q1 FY2026 earnings)
- **日期**: 2026-03-17
- **用于**: Ch05 Firefly分析

### DM-BIZ-004
- **值**: GenStudio ARR >$1B, 增速>30% YoY
- **类型**: H
- **来源**: WebSearch Agent-D (Futurum Q3 FY2025)
- **日期**: 2026-03-17
- **用于**: Ch08 Enterprise分析

### DM-BIZ-005
- **值**: Creative freemium MAU 8000万+ (+50% YoY), 合计MAU 8.5亿+
- **类型**: H
- **来源**: WebSearch Agent-C (Q1 FY2026)
- **日期**: 2026-03-17
- **用于**: Ch10 用户分析

### DM-BIZ-006
- **值**: Firefly累计生成24B+, 月均~1.5B, Generative credit消耗QoQ >45%
- **类型**: H
- **来源**: WebSearch Agent-D (Adobe blog/earnings)
- **日期**: 2026-03-17
- **用于**: Ch05 Firefly使用量

### DM-BIZ-007
- **值**: $70M ARR缺口归因于AI生成替代Stock照片购买
- **类型**: H
- **来源**: WebSearch (FinancialContent deep dive)
- **日期**: 2026-03-17
- **用于**: Ch05 AI自蚕食, AIAS S1评估

### DM-BIZ-008
- **值**: Fortune 500: 98%使用CC, 75%采用Firefly, 99% F100在Adobe应用中使用AI
- **类型**: H
- **来源**: WebSearch Agent-E (Adobe News enterprise)
- **日期**: 2026-03-17
- **用于**: Ch08 企业渗透

### DM-BIZ-009
- **值**: Top 50企业客户~90%采用1+个AI-first创新(GenStudio/Firefly/Acrobat AI)
- **类型**: H
- **来源**: WebSearch Agent-E (Adobe News)
- **日期**: 2026-03-17
- **用于**: Ch08 企业AI采纳

### DM-BIZ-010
- **值**: Content Credentials/CAI: 6000+成员, >90%相机厂商承诺, Samsung S25首款手机支持
- **类型**: H
- **来源**: WebSearch Agent-E (CAI blog)
- **日期**: 2026-03-17
- **用于**: Ch09 护城河-信任层

### DM-BIZ-011
- **值**: Canva: $4B年化收入, 265M用户, 31M付费; Affinity免费化; Magic Layers 2026.3.11
- **类型**: H
- **来源**: WebSearch Agent-D (TechCrunch/Canva Newsroom)
- **日期**: 2026-03-17
- **用于**: Ch12 竞争-低端颠覆

### DM-BIZ-012
- **值**: Figma: 2025.7 IPO $15B, 收入+41% YoY, Q4 $303.8M, 2026指引$1.37B(+30%)
- **类型**: H
- **来源**: WebSearch Agent-D (CNBC/Fortune)
- **日期**: 2026-03-17
- **用于**: Ch12 竞争-设计协作

### DM-BIZ-013
- **值**: Photoshop全球图形软件份额42%, InDesign 26%, Illustrator 12%
- **类型**: H
- **来源**: WebSearch Agent-E (Statista 2026)
- **日期**: 2026-03-17
- **用于**: Ch09 护城河-市场份额

### DM-NEW-001
- **值**: CEO Narayen 2026.3.12宣布将交接(18年任期), 股价当日跌7.6%
- **类型**: H
- **来源**: WebSearch Agent-C (CNBC)
- **日期**: 2026-03-17
- **用于**: Ch10 CEO沉默分析, Ch16 领导层

### DM-NEW-002
- **值**: SaaSpocalypse 2026.2: ~$2万亿软件市值蒸发, ADBE跌26%, P/E 26x→16x
- **类型**: H
- **来源**: WebSearch (Bloomberg/TechCrunch)
- **日期**: 2026-03-17
- **用于**: Ch03 市场叙事, AIAS框架

### DM-NEW-003
- **值**: Semrush收购 ~$1.9B (2025.11, pending), AI SEO/品牌可见度
- **类型**: H
- **来源**: WebSearch Agent-D (Acquiry)
- **日期**: 2026-03-17
- **用于**: Ch16 M&A分析

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Revenue CAGR FY2025-FY2030E ~9% (分析师共识隐含)
- **类型**: R
- **推理链**: FY2025 $23.8B → FY2030E $36.5B (共识) = CAGR 8.9%
- **证伪条件**: 收入增速连续2Q低于8%
- **来源**: MCP fmp_data estimates + 计算
- **日期**: 2026-03-17
- **用于**: Ch14 S2-S3情景

### DM-INF-002
- **值**: AIAS净影响初评 +1.04 (AI重组者偏受益, 分裂体)
- **类型**: R
- **推理链**: CC消费(-8×19%) + CC专业(+1×40%) + Firefly(+13×1%) + Doc(+6×15%) + DX(+5×23%)
- **证伪条件**: CC专业S2(座位压缩)从-2恶化至-4 → 净影响降至+0.24
- **来源**: AIAS v1.0框架评估
- **日期**: 2026-03-17
- **用于**: Ch04 AI影响总框架

### DM-INF-003
- **值**: 双引擎SOTP初步框架: Consumer层(10-15x EV/EBITDA) + Enterprise层(20-25x)
- **类型**: R
- **推理链**: Consumer CC面临Canva/AI-native竞争→低倍数; Enterprise(DX+GenStudio)深层黏性→高倍数
- **证伪条件**: 如果单一分部合并意味着业务不可分离→双引擎SOTP不适用
- **来源**: AIAS分裂体分析 + 历史报告IHG双层SOTP方法
- **日期**: 2026-03-17
- **用于**: Phase 5 估值

### DM-INF-004
- **值**: Forward PE 9.6x隐含: 市场在定价Creative Cloud seat收缩+AI颠覆+CEO风险
- **类型**: R
- **推理链**: 9.6x = EPS $26.3(FY2026 non-GAAP) / $252; 同行CRM 13.5x/NOW 45x/ADSK 25x, ADBE最低→市场认为ADBE面临独特结构性风险
- **证伪条件**: 如果SaaSpocalypse只是周期性恐慌(非结构性)→市场错误→ADBE被低估
- **来源**: MCP analyze_stock + WebSearch分析师对比
- **日期**: 2026-03-17
- **用于**: Ch14 信念反演

### DM-INF-005
- **值**: Seat→API转型交叉点估计: FY2028-2030
- **类型**: R
- **推理链**: Firefly API ARR ~$250M(FY2026E) → 假设+100% CAGR → FY2028 $1B → FY2030 $4B; 同期CC seat假设-3%/年 → 交叉约FY2029
- **证伪条件**: Firefly API ARR增速<50% CAGR → 交叉点推迟至FY2032+
- **来源**: AIAS框架推导
- **日期**: 2026-03-17
- **用于**: Ch24 SaaS转型时间线

### DM-SUB-001
- **值**: PW(可能性宽度)评估: 6.5-7.0 (混合模式偏发现系统)
- **类型**: S
- **依据**: SaaSpocalypse+CEO交接+商业模式转型+AI双面性=高不确定性; 但核心CC仍贡献74%收入=非全面不确定
- **来源**: 分析师定性判断
- **日期**: 2026-03-17
- **用于**: 报告方法论选择

### DM-SUB-002
- **值**: 护城河迁移方向评估: 从"工具层"→"工作流+治理层"主动迁移
- **类型**: S
- **依据**: PDF不再专有→Acrobat AI化; Photoshop被AI替代部分功能→GenStudio/Foundry企业绑定; Content Credentials可能监管强制
- **来源**: AIAS框架+lit_recon综合
- **日期**: 2026-03-17
- **用于**: Ch09 护城河迁移

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 30 | 78.9% |
| R (合理推断) | 5 | 13.2% |
| S (主观判断) | 2 | 5.3% |
| **总计** | **37** | **100%** |

✅ H占比78.9% ≥ 50%目标

---

## Section G: 同行对比快照

| 指标 | ADBE | CRM | NOW | ADSK | INTU |
|------|------|-----|-----|------|------|
| Forward PE | 9.6x | ~13.5x | ~45x | ~25x | ~28x |
| Rev Growth | +12% | +11% | +22% | +12% | +15% |
| Gross Margin | 89% | ~75% | ~80% | ~84% | ~78% |
| Non-GAAP OPM | ~47% | ~33% | ~30% | ~38% | ~39% |
| FCF Margin | ~42% | ~30% | ~28% | ~30% | ~30% |
| EV/EBITDA | 10.8x | ~22x | ~60x | ~30x | ~25x |

**结论**: Adobe在所有利润率和现金流指标上领先同行，但估值倍数是最低的。

---

## Section H: 内部人交易摘要

| 期间 | 获得(RSU) | 处置(卖出) | 公开市场买入 | 公开市场卖出 |
|------|----------|-----------|------------|------------|
| Q1 2026 | 453,756 | 246,532 | 0 | 1 |
| Q4 2025 | 18,096 | 27,847 | 0 | 1 |
| Q3 2025 | 29,535 | 27,164 | 0 | 0 |
| Q2 2025 | 67,184 | 37,373 | 0 | 1 |

**结论**: 内部人持续净卖出, 零公开市场买入。CEO Narayen 5年6笔卖出交易。

---

## Section I: Phase 1-5关键发现 (初始为空)

[Phase推进时追加]
