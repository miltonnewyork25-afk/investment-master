# PLTR Data Master v1.0 — DM锚定格式 (v3.0)

> **创建日期**: 2026-02-12
> **框架版本**: v10.0
> **数据截止**: FY2025 (Q4报告期 2025-12-31, 提交日 2026-02-02)
> **市场数据截止**: 2026-02-11 收盘

---

## 1. 市场数据

### DM-MKT-001 v1.0
- **值**: 股价 $135.68 (2026-02-11收盘)
- **类型**: H
- **来源**: MCP fmp_data quote PLTR
- **日期**: 2026-02-12
- **用于**: Part I §市场概况, Part VI §Reverse DCF

### DM-MKT-002 v1.0
- **值**: 市值 $309.9B
- **类型**: H
- **来源**: MCP fmp_data quote PLTR
- **日期**: 2026-02-12
- **用于**: Part I §市场概况, Part VI §OVM

### DM-MKT-003 v1.0
- **值**: 52周范围 $66.12 - $207.52
- **类型**: H
- **来源**: MCP fmp_data quote PLTR
- **日期**: 2026-02-12
- **用于**: Part I §市场概况

### DM-MKT-004 v1.0
- **值**: SMA20 $155.70 / SMA50 $171.35 / SMA200 $160.61 / RSI 32.43
- **类型**: H
- **来源**: MCP analyze_stock PLTR technical
- **日期**: 2026-02-12
- **备注**: RSI<35表示超卖区间, 趋势=下跌
- **用于**: Part I §技术面

### DM-MKT-005 v1.0
- **值**: FMP DCF估值 $10.25 vs 股价 $135.68 (溢价1224%)
- **类型**: H
- **来源**: MCP fmp_data dcf PLTR
- **日期**: 2026-02-12
- **用于**: Part VI §估值差距

### DM-MKT-006 v1.0
- **值**: FMP评级 B (整体3分, DCF=2, ROE=4, ROA=5, D/E=4, P/E=1, P/B=1)
- **类型**: H
- **来源**: MCP fmp_data rating PLTR
- **日期**: 2026-02-12
- **用于**: Part I §市场评价

---

## 2. 宏观温度

### DM-MACRO-001 v1.0
- **值**: Shiller P/E (CAPE) = 40.35 (历史百分位98%, 状态:非常昂贵)
- **类型**: H
- **来源**: MCP baggers_summary PLTR (100baggers.club)
- **日期**: 2026-02-12
- **用于**: Part I §宏观环境

### DM-MACRO-002 v1.0
- **值**: Buffett指标 = 223% (历史百分位100%, 状态:非常昂贵)
- **类型**: H
- **来源**: MCP baggers_summary PLTR (100baggers.club)
- **日期**: 2026-02-12
- **用于**: Part I §宏观环境

### DM-MACRO-003 v1.0
- **值**: Market Risk Premium (ERP) = 4.5% (历史百分位66%, 状态:昂贵)
- **类型**: H
- **来源**: MCP baggers_summary PLTR (100baggers.club)
- **日期**: 2026-02-12
- **用于**: Part I §宏观环境, Part VI §WACC

---

## 3. 利润表 (FY2021-FY2025)

### DM-FIN-001 v1.0
- **值**: FY2025 Revenue $4.475B (+56.2% YoY)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务全景, Part VI §Reverse DCF

### DM-FIN-002 v1.0
- **值**: FY2025 Gross Profit $3.686B (毛利率 82.4%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务全景

### DM-FIN-003 v1.0
- **值**: FY2025 Operating Income $1.414B (营业利润率 31.6%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务全景

### DM-FIN-004 v1.0
- **值**: FY2025 Net Income $1.625B (净利率 36.3%, EPS diluted $0.63)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务全景, Part VI §P/E计算

### DM-FIN-005 v1.0
- **值**: FY2025 SBC $684M (SBC/Revenue = 15.3%)
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §SBC分析, Part V §RT-3空头钢人

### DM-FIN-006 v1.0
- **值**: FY2025 R&D $557.7M (R&D/Revenue = 12.5%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §费用结构

### DM-FIN-007 v1.0
- **值**: FY2025 SG&A $1.715B (SG&A/Revenue = 38.3%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §费用结构

### DM-FIN-008 v1.0
- **值**: Revenue历史: FY2021 $1.542B → FY2022 $1.906B (+23.6%) → FY2023 $2.225B (+16.7%) → FY2024 $2.866B (+28.8%) → FY2025 $4.475B (+56.2%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual (5年)
- **日期**: 2026-02-12
- **用于**: Part I §增长轨迹

### DM-FIN-009 v1.0
- **值**: Net Income历史: FY2021 -$520M → FY2022 -$374M → FY2023 $210M → FY2024 $462M → FY2025 $1.625B
- **类型**: H
- **来源**: MCP fmp_data income PLTR FY annual (5年)
- **日期**: 2026-02-12
- **用于**: Part I §盈利拐点

### DM-FIN-010 v1.0
- **值**: Q4 2025 Revenue $1.407B (+70.0% YoY vs Q4 2024 $828M)
- **类型**: H
- **来源**: MCP fmp_data income PLTR Q4 quarter
- **日期**: 2026-02-12
- **备注**: 季度加速明显: Q1 $884M(+39.4%) → Q2 $1.004B(+47.9%) → Q3 $1.181B(+62.8%) → Q4 $1.407B(+70.0%)
- **用于**: Part I §季度趋势

### DM-FIN-011 v1.0
- **值**: Q4 2025 Operating Income $575.4M (Op Margin 40.9%)
- **类型**: H
- **来源**: MCP fmp_data income PLTR Q4 quarter
- **日期**: 2026-02-12
- **备注**: 季度Op Margin趋势: Q1 19.9% → Q2 26.8% → Q3 33.3% → Q4 40.9%
- **用于**: Part I §经营杠杆

---

## 4. 资产负债表 (FY2025)

### DM-BAL-001 v1.0
- **值**: FY2025 Total Assets $8.900B
- **类型**: H
- **来源**: MCP fmp_data balance PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务全景

### DM-BAL-002 v1.0
- **值**: FY2025 Cash + Short-term Investments $7.177B (现金$1.424B + 短投$5.753B)
- **类型**: H
- **来源**: MCP fmp_data balance PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §财务韧性

### DM-BAL-003 v1.0
- **值**: FY2025 Total Debt $229M (全部为资本化租赁, 零金融债务)
- **类型**: H
- **来源**: MCP fmp_data balance PLTR FY annual
- **日期**: 2026-02-12
- **备注**: D/E = 0.03, Net Debt = -$1.194B (净现金)
- **用于**: Part I §财务韧性

### DM-BAL-004 v1.0
- **值**: FY2025 Total Equity $7.488B (Stockholders' Equity $7.387B + Minority $101M)
- **类型**: H
- **来源**: MCP fmp_data balance PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §资产负债

### DM-BAL-005 v1.0
- **值**: FY2025 Deferred Revenue $455M (Current $409M + Non-current $46M)
- **类型**: H
- **来源**: MCP fmp_data balance PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §收入可见度

### DM-BAL-006 v1.0
- **值**: FY2025 Accounts Receivable $1.042B (DSO 85天)
- **类型**: H
- **来源**: MCP fmp_data balance + key-metrics PLTR FY annual
- **日期**: 2026-02-12
- **备注**: AR同比增81% vs Revenue增56% → DSO从73天→85天, 潜在收入质量信号
- **用于**: Part I §收入质量, Part V §RT-4数据审计

---

## 5. 现金流 (FY2025)

### DM-CF-001 v1.0
- **值**: FY2025 Operating Cash Flow $2.134B (OCF Margin 47.7%)
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §现金流, Part VI §FCF估值

### DM-CF-002 v1.0
- **值**: FY2025 Free Cash Flow $2.101B (FCF Margin 46.9%)
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual
- **日期**: 2026-02-12
- **备注**: CapEx仅$33.9M (极低资本密度), FCF/Net Income = 1.29x
- **用于**: Part I §现金流, Part VI §FCF估值

### DM-CF-003 v1.0
- **值**: FY2025 Investment Cash Flow -$2.784B (主要为短投净购买$2.749B)
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual
- **日期**: 2026-02-12
- **用于**: Part I §资本配置

### DM-CF-004 v1.0
- **值**: FCF历史: FY2021 $321M → FY2022 $184M → FY2023 $697M → FY2024 $1.141B → FY2025 $2.101B
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual (5年)
- **日期**: 2026-02-12
- **用于**: Part I §FCF增长, Part VI §DCF

### DM-CF-005 v1.0
- **值**: FY2025 Stock Repurchases $75.0M, Stock Issuance $129.1M → Net Dilution $54.1M
- **类型**: H
- **来源**: MCP fmp_data cashflow PLTR FY annual
- **日期**: 2026-02-12
- **备注**: 首年回购但仍净稀释, SBC $684M >> Repurchases $75M
- **用于**: Part I §股东回报, Part V §空头论点

---

## 6. 关键比率

### DM-RATIO-001 v1.0
- **值**: P/E TTM 230.9x | P/B 51.5x | EV/EBITDA 291.6x | EV/Sales 93.8x | FCF Yield 0.50%
- **类型**: H
- **来源**: MCP baggers_summary PLTR + fmp_data ratios
- **日期**: 2026-02-12
- **用于**: Part I §估值概况, Part VI §市场隐含预期

### DM-RATIO-002 v1.0
- **值**: ROE 26.2% | ROA 21.3% | ROIC 615.9% | ROCE 18.3%
- **类型**: H
- **来源**: MCP baggers_summary PLTR
- **日期**: 2026-02-12
- **备注**: ROIC极高因投入资本极小($226M), 实际运营不需要多少固定资产
- **用于**: Part I §资本效率

### DM-RATIO-003 v1.0
- **值**: Current Ratio 7.11 | Quick Ratio 6.99 | Altman Z-Score 149.81
- **类型**: H
- **来源**: MCP baggers_summary PLTR
- **日期**: 2026-02-12
- **备注**: Z-Score极高, 几乎不可能破产
- **用于**: Part I §财务韧性

### DM-RATIO-004 v1.0
- **值**: Rule of 40 = 56.2% (Rev Growth) + 46.9% (FCF Margin) = 103.1
- **类型**: R
- **推理链**: Revenue YoY growth 56.2% + FCF margin 46.9% = 103.1 (传统公式)
- **来源**: 基于DM-FIN-001 + DM-CF-002计算
- **日期**: 2026-02-12
- **备注**: v2.0报告中引用Rule of 40=127 (可能使用Q4 annualized或不同定义)
- **用于**: Part I §SaaS质量评估

---

## 7. 分析师一致预期

### DM-EST-001 v1.0
- **值**: FY2025A Revenue $4.39B (实际$4.475B, beat +1.9%)
- **类型**: H
- **来源**: MCP fmp_data estimates PLTR
- **日期**: 2026-02-12
- **用于**: Part I §市场预期

### DM-EST-002 v1.0
- **值**: FY2026E Revenue $7.14B (Low $7.11B / High $7.33B, 17 analysts) → +59.5% YoY
- **类型**: H
- **来源**: MCP fmp_data estimates PLTR
- **日期**: 2026-02-12
- **用于**: Part I §前瞻, Part VI §Reverse DCF

### DM-EST-003 v1.0
- **值**: FY2026E EPS $1.26 (Low $1.19 / High $1.44, 15 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates PLTR
- **日期**: 2026-02-12
- **备注**: 隐含FY2026E P/E = $135.68 / $1.26 = 107.7x (从TTM 231x压缩)
- **用于**: Part I §前瞻, Part VI §Forward P/E

### DM-EST-004 v1.0
- **值**: FY2027E Revenue $10.20B (+42.8% YoY, 19 analysts) | FY2028E Revenue $14.49B (+42.1%, 8 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates PLTR
- **日期**: 2026-02-12
- **用于**: Part VI §长期增长路径

### DM-EST-005 v1.0
- **值**: FY2027E EPS $1.79 (16 analysts) | FY2028E EPS $2.56 (5 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates PLTR
- **日期**: 2026-02-12
- **备注**: 隐含FY2027E P/E = 75.8x, FY2028E P/E = 53.0x
- **用于**: Part VI §Forward估值

---

## 8. 内部人交易

### DM-INS-001 v1.0
- **值**: 2026 Q1 (至今): 0笔买入 / 21笔卖出 / 总卖出55,800股
- **类型**: H
- **来源**: MCP fmp_data insider-trading PLTR
- **日期**: 2026-02-12
- **用于**: Part I §管理层行动

### DM-INS-002 v1.0
- **值**: 2025全年: 买入19.6M股 / 卖出31.7M股 → 净卖出12.1M股 | 净卖出比率-0.47%
- **类型**: R
- **推理链**: 四季度汇总 Q1(8.3M买/16.9M卖) + Q2(4.4M/5.2M) + Q3(3.9M/5.6M) + Q4(3.0M/4.0M)
- **来源**: MCP fmp_data insider-trading PLTR
- **日期**: 2026-02-12
- **备注**: 全年持续净卖出, 触发负面领先指标"内部人净卖出"
- **用于**: Part I §管理层行动, Part V §RT-2偏差审计

### DM-INS-003 v1.0
- **值**: 2024全年加速卖出: Q1(7.0M买/17.5M卖) + Q2(3.8M/17.9M) + Q3(22.7M/53.8M) + Q4(60.6M/92.8M)
- **类型**: H
- **来源**: MCP fmp_data insider-trading PLTR
- **日期**: 2026-02-12
- **备注**: 2024 Q4内部人卖出量爆增至92.8M股(全年最高), 与股价飙升同步
- **用于**: Part V §空头钢人

---

## 9. 杜邦分析

### DM-DUPONT-001 v1.0
- **值**: ROE 26.2% = Net Margin 36.3% × Asset Turnover 0.59x × Equity Multiplier 1.23x
- **类型**: H
- **来源**: MCP baggers_summary PLTR 杜邦模型
- **日期**: 2026-02-12
- **备注**: 高利润率驱动, 资产周转率一般, 杠杆极低
- **用于**: Part I §盈利质量

### DM-DUPONT-002 v1.0
- **值**: ROIC 615.9% = NOPAT $1.39B / Avg Invested Capital $226M
- **类型**: H
- **来源**: MCP baggers_summary PLTR 杜邦模型
- **日期**: 2026-02-12
- **备注**: 投入资本极小($226M)导致ROIC数字夸张, 反映轻资产模式极致
- **用于**: Part I §资本效率

---

## 10. 季度趋势 (8Q)

### DM-QTR-001 v1.0
- **值**: 季度Revenue: Q1'24 $634M → Q2'24 $678M → Q3'24 $726M → Q4'24 $828M → Q1'25 $884M → Q2'25 $1.004B → Q3'25 $1.181B → Q4'25 $1.407B
- **类型**: H
- **来源**: MCP fmp_data income PLTR quarter (8期)
- **日期**: 2026-02-12
- **备注**: QoQ加速: +6.9%/+7.0%/+14.0%/+6.8%/+13.5%/+17.7%/+19.1%
- **用于**: Part I §增长动能

### DM-QTR-002 v1.0
- **值**: 季度Net Income: Q1'24 $106M → Q2'24 $134M → Q3'24 $144M → Q4'24 $79M → Q1'25 $214M → Q2'25 $327M → Q3'25 $476M → Q4'25 $609M
- **类型**: H
- **来源**: MCP fmp_data income PLTR quarter (8期)
- **日期**: 2026-02-12
- **备注**: Q4'24异常低(季节性+一次性项目?), Q1-Q4'25强劲加速
- **用于**: Part I §盈利趋势

### DM-QTR-003 v1.0
- **值**: 季度Op Margin: Q1'24 12.8% → Q2'24 15.5% → Q3'24 15.6% → Q4'24 1.3% → Q1'25 19.9% → Q2'25 26.8% → Q3'25 33.3% → Q4'25 40.9%
- **类型**: H
- **来源**: 基于MCP fmp_data income PLTR quarter计算
- **日期**: 2026-02-12
- **备注**: 经营杠杆释放明显, 每季度提升5-8pp, Q4'25达40.9%创历史
- **用于**: Part I §经营杠杆

---

## 11. 领先指标信号

### DM-LEAD-001 v1.0
- **值**: 正面触发: 营收与毛利共振 ✓ | 经营杠杆释放 ✓ | ROIC提升 ✓
- **类型**: H
- **来源**: MCP baggers_summary PLTR 领先指标
- **日期**: 2026-02-12
- **用于**: Part I §基本面信号

### DM-LEAD-002 v1.0
- **值**: 负面触发: 流动性压力 ✗ (误报, Current Ratio 7.11) | 内部人净卖出 ✓ (净卖-0.47%)
- **类型**: R
- **推理链**: 流动性压力指标为误触发(PLTR现金充裕), 但内部人净卖出为真实信号
- **来源**: MCP baggers_summary PLTR 领先指标
- **日期**: 2026-02-12
- **用于**: Part I §风险信号

---

## 12. Polymarket预测市场

### DM-PM-001 v1.0
- **值**: Polymarket有PLTR价格范围市场(74个活跃), 主要为短期价格博弈, 无基本面事件市场
- **类型**: H
- **来源**: MCP polymarket_events "Palantir"
- **日期**: 2026-02-12
- **备注**: 含价格目标市场($111-$234 Feb), 周度收盘价区间市场, 美政府入股PLTR市场
- **用于**: Part I §市场情绪

### DM-PM-002 v1.0
- **值**: "US federal government take a stake in Palantir?" — 活跃至2026-12-31
- **类型**: H
- **来源**: MCP polymarket_events "Palantir"
- **日期**: 2026-02-12
- **备注**: 政府入股PLTR的预测市场存在, 反映市场对PLTR与政府关系的关注
- **用于**: Part III §开放问题

---

## 13. 关键推断锚点 (Phase 0预注册)

### DM-INF-001 v1.0
- **值**: FY2025 Revenue Growth加速至56.2%的主驱动力为AIP商业化成功
- **类型**: R
- **推理链**: FY2024 +28.8% → FY2025 +56.2% = +27.4pp加速。US Commercial segment是主增长来源(基于v2.0报告CQ2: US Commercial +137%)
- **证伪条件**: 如果FY2026 Q1 US Commercial增速<50%且同期政府收入加速>40%, 则AIP并非主驱动力
- **用于**: Part I §增长归因, Part II §支柱2

### DM-INF-002 v1.0
- **值**: PLTR当前P/E 231x隐含FY2025-FY2030 Revenue CAGR约40%+
- **类型**: R
- **推理链**: P/E 231x × EPS $0.63 = $135.68。假设5年后P/E压缩至40x, 需EPS达$3.39, 隐含Net Income ~$8.6B, 假设15%净利率需Revenue ~$57B, 从$4.5B到$57B = 5年CAGR 66%。如允许利润率扩张至25%需Revenue ~$34B = CAGR 50%。如P/E压至50x则CAGR ~40%
- **证伪条件**: 连续2季度Revenue增速<30%将使此隐含CAGR不可实现
- **用于**: Part VI §Reverse DCF

### DM-INF-003 v1.0
- **值**: SBC/Revenue从FY2024的24.1%降至FY2025的15.3%是结构性改善而非一次性
- **类型**: R
- **推理链**: Revenue增56%而SBC仅微降(从$692M到$684M) → SBC绝对值稳定+Revenue高增=比率下降。但SBC仍覆盖率仅1.39x(OCF/SBC), 远低于完全覆盖
- **证伪条件**: 如FY2026 SBC回升至>$900M或SBC/Revenue回升至>20%
- **用于**: Part I §SBC分析, Part V §RT-3

---

## 14. v2.0→v3.0数据对比 (用于一致性校验)

### DM-COMPARE-001 v1.0
- **值**: v2.0 SOTP $53-56 | v2.0 概率加权 $152-158 | v2.0 FMP DCF $10.25 | v2.0评级 56.5/100
- **类型**: H
- **来源**: PLTR_Complete_v2.0_2026-02-10.md
- **日期**: 2026-02-12
- **备注**: v3.0将不使用数字评分, 改用定性四档。估值将用Reverse DCF+OVM替代点估计
- **用于**: Part VI §方法论对比

---

## 锚点统计

| 类型 | 数量 |
|------|------|
| H (硬数据) | 38 |
| R (合理推断) | 7 |
| S (主观判断) | 0 |
| **总计** | **45** |

**下次更新**: Phase 0.5完成后, 加入市场注意力雷达数据 + CQ定义
