# CRM Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-18
## 数据预取版本: v4.0 (Phase 0)

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2026 Revenue $41.525B (+9.6% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-18

### DM-FIN-002
- **值**: FY2026 Net Income $7.457B (GAAP)
- **类型**: H
- **来源**: MCP fmp_data income FY2026

### DM-FIN-003
- **值**: FY2026 Gross Margin 77.7% ($32.255B/$41.525B)
- **类型**: H
- **来源**: MCP fmp_data income FY2026

### DM-FIN-004
- **值**: FY2026 GAAP OPM 21.5% ($8.917B/$41.525B)
- **类型**: H
- **来源**: MCP fmp_data income FY2026

### DM-FIN-005
- **值**: FY2026 OCF $14.996B | FCF $14.402B | FCF Margin 34.7%
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026

### DM-FIN-006
- **值**: FY2026 SBC $3.509B (8.5% of Revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026

### DM-FIN-007
- **值**: FY2026 D&A $3.631B | CapEx $594M (1.4% of Revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow/income FY2026

### DM-FIN-008
- **值**: FY2026 R&D $5.993B (14.4%) | S&M $14.345B (34.6%) | G&A $3.0B (7.2%)
- **类型**: H
- **来源**: MCP fmp_data income FY2026

### DM-FIN-009
- **值**: Q4 FY2026 Revenue $11.201B (+12% YoY) | GAAP OPM 21.9%
- **类型**: H
- **来源**: MCP fmp_data income Q4 FY2026

### DM-FIN-010
- **值**: FY2026 EPS $7.80 (diluted) | Shares 956M (diluted)
- **类型**: H
- **来源**: MCP fmp_data income FY2026

### DM-FIN-011
- **值**: 5年Revenue CAGR: $26.5B(FY2022)→$41.5B(FY2026) = +11.9%
- **类型**: H
- **来源**: MCP fmp_data income FY2022-2026

### DM-FIN-012
- **值**: 5年FCF: $5.3B(FY22)→$6.3B(FY23)→$9.5B(FY24)→$12.4B(FY25)→$14.4B(FY26)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2022-2026

### DM-FIN-013
- **值**: GAAP OPM 5年: 2.1%(FY22)→3.3%(FY23)→14.4%(FY24)→19.0%(FY25)→21.5%(FY26)
- **类型**: H
- **来源**: MCP fmp_data income FY2022-2026

### DM-FIN-014
- **值**: S&M/Rev 5年: 44.7%(FY22)→43.1%(FY23)→36.9%(FY24)→35.0%(FY25)→34.6%(FY26)
- **类型**: H
- **来源**: MCP fmp_data income FY2022-2026

### DM-FIN-015
- **值**: FY2026 Stock Repurchased $12.596B | FY2025 $7.829B | FY2024 $7.620B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2024-2026

### DM-FIN-016
- **值**: FY2026 Dividends Paid $1.587B | FY2025 $1.537B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025-2026

### DM-FIN-017
- **值**: FY2026 Acquisitions $9.268B (含Informatica) | FY2025 $2.734B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025-2026

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FY2026 Total Assets $112.3B | Goodwill $57.9B (51.6%) | Intangibles $6.8B
- **类型**: H
- **来源**: MCP fmp_data balance FY2026

### DM-BAL-002
- **值**: FY2026 Cash $7.3B | ST Investments $2.2B | Total Liquidity $9.6B
- **类型**: H
- **来源**: MCP fmp_data balance FY2026

### DM-BAL-003
- **值**: FY2026 Total Debt $17.2B | Net Debt $9.8B | Equity $59.1B
- **类型**: H
- **来源**: MCP fmp_data balance FY2026

### DM-BAL-004
- **值**: FY2026 Deferred Revenue $24.3B (+17.2% from FY2025 $20.7B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025-2026

### DM-BAL-005
- **值**: FY2026 Treasury Stock -$32.2B (from FY2025 -$19.5B → +$12.7B in buybacks)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025-2026

### DM-BAL-006
- **值**: Net Debt/EBITDA: 0.75x(FY26) vs 0.23x(FY25) vs 0.45x(FY24) → 杠杆上升
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2024-2026

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 股价$195.31 | 市值~$202B | EV~$212B
- **类型**: H
- **来源**: MCP analyze_stock 2026-03-17

### DM-VAL-002
- **值**: Forward PE 13.1x | Trailing PE 25.1x | EV/EBITDA 16.1x | EV/FCF 14.7x
- **类型**: H
- **来源**: MCP analyze_stock + fmp_data key-metrics

### DM-VAL-003
- **值**: FCF Yield 7.1% | Earnings Yield 3.7% | PEG 0.88
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2026

### DM-VAL-004
- **值**: 52w High $296 / Low $175 | 距高点-34% | YTD -28% | Beta 1.31
- **类型**: H
- **来源**: MCP analyze_stock

### DM-VAL-005
- **值**: 同行PE: CRM 25.1x | NOW 69.9x | ADBE 14.8x | WDAY 52.0x | HUBS 312x | ADSK 48.3x
- **类型**: H
- **来源**: MCP compare_stocks

---

## Section D: 分析师共识+Agentforce (DM-CON/BIZ-xxx)

### DM-CON-001
- **值**: 分析师共识Buy (28-39 Buy / 7 Hold / 1 Sell) | 平均目标价$276-283 (+41%)
- **类型**: H
- **来源**: WebSearch Scout1 (StockAnalysis/MarketBeat)

### DM-CON-002
- **值**: FY2027指引: Revenue $45.8-46.2B (+10-11%) | FY2030目标$63B
- **类型**: H
- **来源**: WebSearch Scout1 (Salesforce IR)

### DM-CON-003
- **值**: FY2028E共识: Revenue ~$50.5B | EPS $14.89 | FY2030E Rev ~$60.8B | EPS $19.62
- **类型**: H
- **来源**: MCP fmp_data estimates

### DM-BIZ-001
- **值**: Agentforce ARR $800M (+169% YoY) | 29,000 deals | 9,500+ paid customers
- **类型**: H
- **来源**: WebSearch Scout2 (Salesforce Q4 FY2026 earnings)

### DM-BIZ-002
- **值**: Data Cloud ARR $1.2B (+120% YoY) | 客户数+140% YoY | 50%+ F500采纳
- **类型**: H
- **来源**: WebSearch Scout2 (Salesforce IR/Nasdaq)

### DM-BIZ-003
- **值**: Agentforce+Data 360 combined ARR ~$1.4B (+114% YoY)
- **类型**: H
- **来源**: WebSearch Scout2 (Futurum Q3 FY2026)

### DM-BIZ-004
- **值**: cRPO $35.1B (+16% YoY) → 强远期可见性
- **类型**: H
- **来源**: WebSearch Scout1 (Q4 FY2026 earnings)

### DM-BIZ-005
- **值**: CRM全球市占率21-24% (IDC #1连续12年) | CRM收入$21.6B > 后4名之和
- **类型**: H
- **来源**: WebSearch Scout3 (IDC/Salesforce)

### DM-BIZ-006
- **值**: 客户流失率~8% | 73%新bookings来自现有客户upsell
- **类型**: H
- **来源**: WebSearch Scout3 (Salesforce Q2 FY2025)

### DM-BIZ-007
- **值**: Agentforce定价: Flex Credits $500/100K credits ($0.10/action) + Seat $125-650/user/month
- **类型**: H
- **来源**: WebSearch Scout2 (Salesforce pricing page)

### DM-BIZ-008
- **值**: Forrester: "In customer conversations, Forrester saw little adoption or impact from AI agents"
- **类型**: H
- **来源**: WebSearch Scout2 (Forrester blog)

### DM-BIZ-009
- **值**: 60%+ Agentforce bookings来自existing customer expansions (非new logos)
- **类型**: H
- **来源**: WebSearch Scout2 (Salesforce earnings)

---

## Section E: 竞争+管理层 (DM-COMP/MGT-xxx)

### DM-COMP-001
- **值**: HubSpot Revenue ~$2.6B (+20-25% YoY) vs CRM +10% → 增速差距在扩大
- **类型**: H
- **来源**: WebSearch Scout3

### DM-COMP-002
- **值**: 60% F500采纳M365 Copilot | Copilot付费seat +160% YoY | 预测+$25B MSFT收入
- **类型**: H
- **来源**: WebSearch Scout3

### DM-COMP-003
- **值**: ServiceNow +20% YoY | FY2026 Subscription $15.5B | "all-in on CRM" — McDermott
- **类型**: H
- **来源**: WebSearch Scout3

### DM-COMP-004
- **值**: 企业报告AI自动化后减少10-15%后台+销售人员 → seat压缩是真实的
- **类型**: H
- **来源**: WebSearch Scout3

### DM-MGT-001
- **值**: Benioff创始人CEO 27年 | FY2025薪酬$55.1M | 股东拒绝say-on-pay
- **类型**: H
- **来源**: WebSearch Scout4

### DM-MGT-002
- **值**: $50B回购授权(2026.2) + $25B ASR(2026.3, 史上最大) = ~103M股(14.1%流通)
- **类型**: H
- **来源**: WebSearch Scout4/5

### DM-MGT-003
- **值**: $25B ASR由$25B高级债券融资(到期延至2066)
- **类型**: H
- **来源**: WebSearch Scout5

### DM-MGT-004
- **值**: Elliott/ValueAct/Starboard 2023年介入 → OPM从3%→21% + 首次分红 + M&A委员会解散
- **类型**: H
- **来源**: WebSearch Scout4

### DM-MGT-005
- **值**: Benioff持股~32M股(~2.4-3.5%) | 总insider 5.46% | 机构88.4%
- **类型**: H
- **来源**: WebSearch Scout4

### DM-MGT-006
- **值**: ~6000裁员(2025-2026) | 109K→75K目标 | 4000客服被Agentforce替代
- **类型**: H
- **来源**: WebSearch Scout5

### DM-NEW-001
- **值**: Agentforce 360 GA(2026.1) + 10+收购(Momentum/Cimulate/Convergence/Doti等)
- **类型**: H
- **来源**: WebSearch Scout5

### DM-NEW-002
- **值**: FedRAMP High授权(Agentforce/Data 360/Marketing Cloud) + CMMC Phase 2(2026年底)
- **类型**: H
- **来源**: WebSearch Scout5

---

## Section E2: 分部收入锚点 (DM-SEG-xxx)

### DM-SEG-001
- **值**: FY2026分部收入: Service Cloud $9.818B(23.6%) | Sales Cloud $9.028B(21.7%) | Platform&Other $8.882B(21.4%) | Integration&Analytics $6.232B(15.0%) | Marketing&Commerce $5.428B(13.1%) | Prof Services $2.137B(5.1%)
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation FY2026

### DM-SEG-002
- **值**: FY2025分部收入: Service $9.054B | Sales $8.322B | Platform $7.247B | I&A $5.775B | M&C $5.281B | PS $2.216B
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation FY2025

### DM-SEG-003
- **值**: 分部4年CAGR(FY22→FY26): Platform&Other 18.5% | I&A 13.3% | Sales 10.8% | Service 11.0% | M&C 8.6% | PS 3.9%
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation FY2022-2026 计算

### DM-SEG-004
- **值**: FY2026 YoY增速: Platform +22.6% | I&A +7.9% | Sales +8.5% | Service +8.4% | M&C +2.8% | PS -3.6%
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation FY2025-2026 计算

### DM-SEG-005
- **值**: 分部集中度: 前2大Cloud(Service+Sales)占收入45.3% | 前3大(+Platform)占66.7%
- **类型**: H
- **来源**: DM-SEG-001 计算

### DM-SEG-006
- **值**: Platform&Other从FY2021的$6.275B降至FY2022的$4.509B(-28%,Slack整合口径变化)→FY2026 $8.882B,含Slack+Agentforce+Heroku
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation FY2021-2026

### DM-SEG-007
- **值**: 同行对标PE: CRM 25.1x | NOW 69.9x | ADBE 14.8x | WDAY N/A | HUBS 312x | ADSK 48.3x | SPY 26.6x
- **类型**: H
- **来源**: MCP compare_stocks

### DM-SEG-008
- **值**: 同行对标OPM: CRM 21.5% | NOW 13.7% | ADBE 36.6% | WDAY 10.7% | HUBS 0.4% | ADSK 24.9%
- **类型**: H
- **来源**: MCP compare_stocks

### DM-SEG-009
- **值**: 同行对标Rev Growth: CRM 12.1% | NOW 20.7% | ADBE 12.0% | HUBS 20.4% | ADSK 19.4%
- **类型**: H
- **来源**: MCP compare_stocks

### DM-SEG-010
- **值**: CRM杜邦拆解: ROE 12.4% = 净利率17.96% × 资产周转0.39x × 权益乘数1.79x | ROIC 13.64% | ROTCE -132.8%(有形权益为负)
- **类型**: H
- **来源**: MCP baggers_summary

### DM-SEG-011
- **值**: CRM现金质量: OCF/NI 2.01x | FCF/NI 1.93x | CapEx覆盖率25.25x | SBC覆盖率4.27x(回购$12.6B>>SBC$3.5B=352%抵消)
- **类型**: H
- **来源**: MCP baggers_summary

### DM-SEG-012
- **值**: CRM季度趋势(EPS): Q1$1.59→Q2$1.96→Q3$2.18→Q4$2.07(FY26) | Q1$1.56→Q2$1.47→Q3$1.58→Q4$1.75(FY25)
- **类型**: H
- **来源**: MCP fmp_data income quarterly

### DM-SEG-013
- **值**: CRM季度OPM: Q1 19.8%→Q2 22.8%→Q3 21.3%→Q4 21.9%(FY26) | 全年趋势:季度波动但年度持续上行
- **类型**: H
- **来源**: MCP fmp_data income quarterly 计算

---

## Section F: 推断锚点 (DM-INF-xxx)

### DM-INF-001
- **值**: AIAS v2.0净影响+2.30(M调整后) | Split Index 22(重度分裂)
- **类型**: R
- **推理链**: Service Cloud S2=-5(AI客服替代→seat压缩) + Agentforce B3=+4(API化) + Platform B5=+4(AppExchange生态) → 净正
- **证伪条件**: Agentforce ARR连续2Q<20%增速 + Service Cloud seat数据公开显示负增长

### DM-INF-002
- **值**: CRM Forward PE应为15-20x(vs当前13.1x) → 可能低估15-53%
- **类型**: R
- **推理链**: FCF Yield 7.1%+增速+10%的稀缺组合 + AIAS+2.30 + 利润率仍在改善
- **证伪条件**: FY2027增速<7% + OPM停止改善

### DM-INF-003
- **值**: $25B ASR概率加权IRR: 如果CRM值$250→IRR +28% | 如果值$195(现价)→IRR 0% | 如果值$150→IRR -23%
- **类型**: R
- **推理链**: $25B@~$195买入~103M股 → 未来价值取决于基本面

---

## Section G: 锚点汇总

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 38 | 84% |
| R (合理推断) | 3 | 7% |
| S (主观判断) | 0 | 0% |
| 待Phase 1+ | ~4 | 9% |
| **总计** | **45** | **100%** |

H占比84% → 远超50%最低要求 ✅

---

*shared_context v1.0 | CRM Phase 0 | 2026-03-18 | 45个DM锚点(38H+3R)*
