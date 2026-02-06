# 通用分析模块（所有行业必须执行）v20.0

## Phase 1: 定位与生态（8个模块）

| # | 模块 | 输出 | 深度要求 | 数据来源 |
|---|------|------|---------|---------|
| U1 | 公司类型识别 | 周期/成长/价值/生态型 | L2 | `stock_full.json` |
| U2 | 产业链定位 | 所处Layer + 信号传导时间 | L3 | `business_overview.json` |
| U3 | 生态图谱 | 上下游Property Graph | L3 | `business_overview.json` |
| U4 | Mermaid可视化 | 供应链/生态关系图 | L3 | `business_overview.json` |
| U5 | 历史教训检索 | ≥3条相关lessons | L2 | — |
| U6 | 行业复杂度评估 | 复杂度系数 + 目标字数 | L2 | — |
| U6b | 预测市场检查 | WebSearch: site:polymarket.com {关键词}，标注有无覆盖 | L2 | `prediction_market.json` |
| U6c | 五引擎预热 | 按顺序启动：竞争→周期→估值→预测→风险 | L2 | — |

**检查点1**: 8项全部完成 + 五引擎状态确认 → 进入Phase 2

## Phase 2: 数据雷达（6个模块）

| # | 模块 | 输出 | 深度要求 | 数据来源 |
|---|------|------|---------|---------|
| U7 | 财务数据收集 | 关键指标（营收/利润/现金流/资产负债）— 优先从MCP缓存读取 | L3 | `stock_full.json` |
| U8 | 估值数据 | PE/PB/EV-EBITDA/DCF输入 — 从 dcf_valuation.json 加载 | L3 | `dcf_valuation.json` |
| U9 | 分析师观点 | ≥15位顶级分析师，每位≥150字 | L4 | `analyst_consensus.json` |
| U10 | 市场核心分歧 | ≥5个争议点（多头vs空头） | L4 | `analyst_consensus.json` (bull_bear_summary) |
| U11 | 管理层Track Record | 关键决策评分 + KPI准确率 | L3 | `management_team.json` |
| U11b | 数据验证 | 交叉验证MCP数据 vs WebSearch数据，标注差异 | L3 | 全部文件交叉对比 |

**检查点2**: 6项全部完成 + 数据A+B≥95% → 进入Phase 3

## Phase 3: 深度分析（9个模块）

| # | 模块 | 输出 | 深度要求 | 数据来源 |
|---|------|------|---------|---------|
| U12 | 护城河分析 | 6类护城河 + 7 Powers评估 + 侵蚀风险 | L4 | `competitive_landscape.json` |
| U13 | 产品矩阵 | 产品组合 + 协同效应 + 利润池 | L4 | `business_overview.json` |
| U14 | 核心投资命题 | ≥3个命题，每个有证据链+反证 | L4 | 综合多文件 |
| U15 | 反常识洞察卡 | ≥12张，每张≥400字 | L4 | 综合多文件 |
| U16 | 竞争格局 | 份额变化 + 竞争者深度分析 | L3 | `competitive_landscape.json` + `peer_comparison.json` |
| U17 | 学术框架引用 | ≥2个学术模型 | L3 | — |
| U18 | Reflection自我批评 | 识别弱点 + 改进计划 | L3 | — |
| U18b | PPDA分析 | 概率-价格背离分析：预测市场隐含概率 vs 当前定价的系统性偏差 | L4 | `prediction_market.json` |
| U18c | PMSI计算 | 预测市场情绪指数：综合多个预测市场信号的加权情绪分数 | L4 | `prediction_market.json` |

**检查点3**: 9项全部完成 + Reflection + PPDA/PMSI → 进入Phase 4

## Phase 4: 决策输出（6个模块）

| # | 模块 | 输出 | 深度要求 | 数据来源 |
|---|------|------|---------|---------|
| U19 | SOTP三场景估值 | 悲观/基准/乐观 + 概率加权 — 引用 comparable_analysis.json | L4 | `comparable_analysis.json` + `dcf_valuation.json` |
| U20 | 敏感性分析 | PE×EPS矩阵 | L3 | `stock_full.json` + `analyst_consensus.json` |
| U21 | Kill Switch | ≥12个触发条件 + 行动方案（动态12重） | L4 | `prediction_market.json` + `recent_news.json` |
| U22 | 可验证预测 | ≥30个，含概率+时间+触发条件 | L4 | 综合多文件 |
| U23 | 投资评级与建议 | 评级+仓位+时间框架+免责声明 | L3 | 综合多文件 |
| U23b | 铁律检查 | 逐项检查数据诚信三铁律+质量标准达标情况 | L3 | `prefetch_metadata.json` |

**检查点4**: 6项全部完成 + 铁律检查通过 → 报告完成

---

## v20.0 质量要求

| 指标 | v20.0 最低要求 |
|------|---------------|
| 总字数 | ≥120,000 × 行业系数 |
| 数据表格 | ≥55 |
| Mermaid图 | ≥15 |
| 洞察卡 | ≥12张，每张≥400字 |
| Kill Switch | ≥12重（动态） |
| 可验证预测 | ≥30 |
| 分析师引用 | ≥15位，每位≥150字 |
| 数据标注 A+B级 | ≥95% |
| PPDA | 必须完成 |
| PMSI | 必须计算 |
| 五引擎 | 全部激活 |
| 铁律检查 | 全部通过 |

## 模块总览

- **Phase 1**: U1-U6c = 8个模块
- **Phase 2**: U7-U11b = 6个模块
- **Phase 3**: U12-U18c = 9个模块
- **Phase 4**: U19-U23b = 6个模块
- **通用模块合计**: 29个
