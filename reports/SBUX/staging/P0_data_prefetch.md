# SBUX Phase 0: 数据预取完成报告
> Generated: 2026-03-03 | Phase 0 | v18.0

## 数据采集清单

### MCP工具数据 (P0级)
| 数据类型 | 工具 | 覆盖范围 | 状态 |
|---------|------|---------|:----:|
| SBUX Income Statement | fmp_data | FY2021-FY2025 (5yr annual) + 8Q quarterly | ✅ |
| SBUX Balance Sheet | fmp_data | FY2021-FY2025 + 8Q | ✅ |
| SBUX Cash Flow | fmp_data | FY2021-FY2025 + 8Q | ✅ |
| SBUX Ratios | fmp_data | FY2021-FY2025 | ✅ |
| SBUX Key Metrics | fmp_data | FY2021-FY2025 | ✅ |
| SBUX Profile | fmp_data | Current | ✅ |
| SBUX Estimates | fmp_data | FY2026E-FY2029E | ✅ |
| SBUX DCF | fmp_data | $64.17 fair value | ✅ |
| SBUX Rating | fmp_data | C (2/5) | ✅ |
| SBUX Financial Scores | fmp_data | Z=2.82, Piotroski=5 | ✅ |
| SBUX Insider Trading | fmp_data | 2004-2025 (quarterly) | ✅ |
| SBUX SEC Filings | baggers_sec_filings | 2025 (18 filings) | ✅ |
| SBUX Baggers Summary | baggers_summary | Q4 2025 (latest) | ✅ |
| LKNCY Income | fmp_data | CY2022-CY2025 (4yr) | ✅ |
| LKNCY Ratios | fmp_data | CY2022-CY2025 | ✅ |
| MCD Income | fmp_data | CY2023-CY2025 (3yr) | ✅ |
| MCD Profile | fmp_data | Current | ✅ |
| BROS Income | fmp_data | CY2023-CY2025 (3yr) | ✅ |
| BROS Ratios | fmp_data | CY2023-CY2025 | ✅ |
| Compare: SBUX/MCD/BROS | compare_stocks | 7 metrics | ✅ |
| Polymarket | polymarket_events | "Starbucks" (macro events found) | ✅ |

### 背景Agent研究 (3个并行)
| Agent | 主题 | 耗时 | 工具调用 | 状态 |
|-------|------|:----:|:-------:|:----:|
| Agent 1 | Niccol earnings calls + CEO沉默分析 + 薪酬结构 | 7.6min | 48 | ✅ |
| Agent 2 | 中国JV / Boyu Capital deal structure | 3.9min | 20 | ✅ |
| Agent 3 | Rewards program + 预存卡浮存金经济学 | 3.8min | 21 | ✅ |

### 产出文件清单
| 文件 | 路径 | 字符数 | 内容 |
|------|------|:------:|------|
| 财务数据汇总 | data/sbux_financial_summary.md | ~12K | 5年三表+估值+竞对比较 |
| 中国JV研究 | data/china_jv_research.md | ~5K | Deal structure+Boyu+QSR comps |
| Rewards研究 | data/rewards_stored_value_research.md | ~5K | 会员+浮存金+breakage+DFFV |
| Niccol研究 | data/niccol_earnings_research.md | ~5K | Earnings+Investor Day+CEO沉默 |
| CQ路由 | staging/P0_CQ_routing.md | ~8K | 5 CQ + PW5.4 + SGI6.5 |
| 核心矛盾 | staging/P0.5_thesis_crystallization.md | ~8K | BME+异常+约束+假说 |
| Checkpoint | data/checkpoint.yaml | ~2K | Phase状态+CQ注册+quick ref |
| 文献侦察 | data/lit_recon_memo.md | ~4K | 已存在(tier3_launch前) |
| 知识上下文 | data/knowledge_context.md | ~2K | 已存在(tier3_launch前) |

## 关键发现摘要

### 财务核心
1. **EPS腰斩**: $3.31→$1.63 (-51%), 但正常化(ex-tax异常)可能~$2.10-2.20
2. **OPM崩塌**: 15.0%→9.6%, Q1 FY2026仍10.1%(-180bps YoY)
3. **负权益加深**: -$5.3B(FY21)→-$8.4B(Q1'26), 回购$19B>>NI $9B
4. **FCF不覆盖分红**: FCF $2.44B < Div $2.77B = 不可持续
5. **FMP DCF**: $64.17 (33% below market) — 基本面估值远低于市场价

### 转型信号
1. **Q1 FY2026拐点**: US tx +3%(8Q首正), Rewards 35.5M(ATH)
2. **Green Apron验证**: 650试点店outperform 200bps
3. **$2B成本削减**: 未来2-3年, 但未quantify margin drop-through
4. **菜单简化25-30%**: 速度↑ 但ticket仅+1%

### 中国
1. **JV $4B估值**: $500K/store (MCD $1M, YUMC $1.3M at IPO = 最低)
2. **Boyu Capital**: $40B AUM, 江泽民之孙创立, IRR>25%
3. **Comp recovery**: FY2025 -1%全年 → Q4'25 +2%, Q1'26 +7%
4. **Balance sheet deconsolidation**: Goodwill -$2.1B, PP&E -$2.2B in Q1'26

### CEO沉默 (6个系统性缺口)
1. 门店蚕食(comp inflated by closure transfer?): **DEFLECTED**
2. 中国JV royalty rate: **NOT DISCLOSED**
3. 工会合同: **COMPLETE SILENCE** (across 3 events)
4. Margin bridge FY2025→FY2028: **VAGUE**
5. 负权益: **NEVER DISCUSSED**
6. 菜单简化revenue impact: **UNQUANTIFIED**

## Phase 1准备度评估

| 维度 | 状态 | 缺口 |
|------|:----:|------|
| 财务数据 | ✅ 完备 | 无 |
| 竞对数据 | ✅ 基础完备 | LKNCY quarterly需补充 |
| CEO/管理层 | ✅ 丰富 | DEF 14A原文未能获取(SEC 403) |
| 中国JV | ✅ 丰富 | Royalty rate未披露(可能在10-Q note) |
| Rewards | ✅ 丰富 | 分层数据待Investor Day deck |
| 行业框架 | ✅ CQ路由完成 | 无 |
| 核心矛盾 | ✅ 结晶完成 | 无 |

**结论**: Phase 1可以启动。数据覆盖充分，核心矛盾清晰，CQ路由已完成。
