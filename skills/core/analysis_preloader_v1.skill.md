# Analysis Preloader v1.0

## 概述

**这是一个强制性的前置 Skill**，在开始任何新公司分析前必须首先运行。它的作用是将所有可用的 Agent 和 Skill 加载到近期记忆上下文中，防止分析过程中遗漏关键框架。

---

## 触发条件

当用户请求分析任何公司时，**必须首先运行此 Skill**：
- "分析 XXX 公司"
- "写一份 XXX 研究报告"
- "深度调研 XXX"
- 任何涉及公司分析的请求

---

## 强制加载清单

### 1. Agent 体系 (7个)

| Agent | 版本 | 核心职责 | 输出格式 |
|-------|------|----------|----------|
| **Research Mechanism Agent (RM)** | v1.1 | 因果机制分析、假设验证 | `claim_spec_v1` |
| **Valuation Engine Agent (VE)** | v1.0 | 估值建模、敏感性分析 | `cap_hypothesis_addendum` |
| **Ecosystem Graph Agent (ECO)** | v2.4 | 生态系统图谱、飞轮分析 | `eco_signal` |
| **Data Integrity Agent (DI)** | v2.2 | 数据质量审计、异常检测 | `data_request` |
| **Innovation Agent (INNOV)** | v1.0 | 创新假设生成、跨领域类比 | `innovation_hypothesis_schema_v1` |
| **Quality Gate Agent (QG)** | v2.2 | 质量控制、报告验证 | `quality_report` |
| **Eval Regression Agent** | v1.3 | 回归测试、基准对比 | `eval_report` |

### 2. Innovation Agent Pipeline (必须运行)

```
P0 Event Trigger → D1 Idea Seed → D2 Cross-Domain Analogizer → D3 Hypothesis Structurer
                                                                        ↓
F2 Adaptation ← F1 Feedback ← R1 Output Router ← C2 IQG ← C1 Novelty Scorer
```

**关键子模块**：
- **Cross-Domain Analogizer (D2)**: 使用 Structure-Mapping Theory 生成跨领域类比
- **Novelty Scorer (C1)**: `Novelty = 0.40×embedding_distance + 0.35×information_gain + 0.25×human_calibration`
- **Innovation Quality Gate (C2)**: `novelty≥0.20 AND feasibility≥0.30 AND composite≥0.40`

**类比领域库**：
| 领域 | 结构 | 距离 |
|------|------|------|
| biological_systems | 捕食-猎物、免疫系统 | 0.7 |
| physics_principles | 相变、势能、临界点 | 0.8 |
| historical_patterns | 商业周期、技术周期 | 0.4 |
| adjacent_industries | 相邻行业模式 | 0.3 |
| system_dynamics | 反馈回路、延迟 | 0.5 |
| triz_principles | 40发明原则 | 0.6 |

### 3. RM Agent ClaimSpec 格式 (必须使用)

```yaml
claim_spec_v1:
  claim_id: "CLM_XXX_001"
  statement: "如果___则___"
  mechanism:
    causal_chain: [A→B→C]
    feedback_type: "positive/negative"
  falsifiability:
    metric: "具体指标"
    threshold: "数值阈值"
    time_window: "验证时间窗口"
  evidence:
    supporting: []
    contradicting: []
```

### 4. VE Agent CAP Hypothesis 格式 (必须使用)

```yaml
cap_hypothesis:
  affected_component: "SALES_GROWTH/MARGIN/MULTIPLE/RISK"
  direction: "POSITIVE/NEGATIVE"
  magnitude: "HIGH/MEDIUM/LOW"
  quantitative_impact:
    value_per_share_delta: ±$XX
    confidence: 0.XX
```

### 5. ECO Agent 生态系统元素 (必须识别)

```yaml
ecosystem_element:
  element_type: "NODE/EDGE/FEEDBACK_LOOP"
  entities_involved: []
  relationship_type: "ENABLES/COMPETES/SUPPLIES/DEPENDS"
  flywheel_impact:
    flywheel_name: "XXX_FLYWHEEL"
    acceleration_or_deceleration: "ACCELERATE/DECELERATE"
```

### 6. 分析 Skill 库 (按需调用)

| 类别 | Skill | 版本 | 适用场景 |
|------|-------|------|----------|
| **估值** | high_growth_tech_valuation | v1.2 | 高增长科技公司 |
| **估值** | ai_option_valuation | v1.0 | AI期权价值评估 |
| **估值** | capex_intensive_valuation | v1.0 | 资本密集型公司 |
| **竞争** | competitive_advantage_models | v1.2 | 竞争优势分析 |
| **宏观** | macro_industry_cycle | v1.3 | 周期位置判断 |
| **宏观** | macro_liquidity_regime | v1.0 | 流动性环境分析 |
| **财务** | forensic_financial_analysis | v2.3 | 财务质量审计 |
| **生态** | product_matrix_network | v1.2 | 产品组合网络 |
| **生态** | platform_portfolio_matrix | v1.0 | 平台投资组合 |
| **护城河** | data_moat_quantifier | v1.0 | 数据护城河量化 |
| **品牌** | brand_emotion_control | v1.0 | 品牌情绪控制 |
| **监管** | regulatory_risk_framework | v1.0 | 监管风险评估 |
| **策略** | first_principles_analysis | v1.2 | 第一性原理分析 |
| **策略** | systemic_foresight | v1.2 | 系统性前瞻分析 |

### 7. 数据源清单 (必须调用)

#### 7a. FMP API

| 端点 | 用途 |
|------|------|
| `/stable/profile` | 公司概况、Beta |
| `/api/v3/quote` | 实时行情、52周高低 |
| `/stable/income-statement-ttm` | TTM损益表 |
| `/stable/balance-sheet-statement-ttm` | TTM资产负债表 |
| `/stable/cash-flow-statement-ttm` | TTM现金流 |
| `/stable/financial-scores` | Z-Score, F-Score |
| `/stable/analyst-estimates` | 分析师预期 |
| `/stable/insider-trading/statistics` | 内部人交易 |
| `/stable/sector-pe-snapshot` | 行业PE |

**FMP API Key**: `fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb`

#### 7b. 100baggers.club API ⚠️ 必须使用

| 端点 | 方法 | 认证 | 用途 |
|------|------|------|------|
| `/api/search?q=XXX` | GET | ❌ | 股票搜索 |
| `/api/generate-summary` | POST | ✅ | **财报摘要（7维度评分+杜邦分析）** |
| `/api/compare-companies` | POST | ✅ | 多股票对比（最多10个） |
| `/api/get-strategy-report` | GET | ✅ | 策略报告 |

**100baggers API Key**: `zvvMFR4Sel9aNofGijx9D0rwCjiBZ/u99cyy2D1GbGc=`

**调用示例**:
```bash
# 获取财报摘要（必须调用）
curl -X POST "https://www.100baggers.club/api/generate-summary" \
  -H "Content-Type: application/json" \
  -H "x-api-key: zvvMFR4Sel9aNofGijx9D0rwCjiBZ/u99cyy2D1GbGc=" \
  -d '{"symbol":"TSLA"}'

# 多股票对比
curl -X POST "https://www.100baggers.club/api/compare-companies" \
  -H "Content-Type: application/json" \
  -H "x-api-key: zvvMFR4Sel9aNofGijx9D0rwCjiBZ/u99cyy2D1GbGc=" \
  -d '{"symbols":["TSLA","F","GM"]}'
```

**返回内容**:
- 雷达图评分（估值/增长/盈利/资本效率/现金质量/财务韧性/股东回报）
- 领先指标（正面/负面信号触发）
- 杜邦分析（ROE/ROIC/ROA 三级拆解）
- 三张报表摘要

---

## 强制执行检查清单

在分析开始前，必须确认以下内容已加载到上下文：

```
□ Innovation Agent Pipeline 已理解
□ ClaimSpec 格式已准备
□ CAP Hypothesis 格式已准备
□ Ecosystem Element 格式已准备
□ 类比领域库已加载
□ 相关分析 Skill 已识别
□ FMP API 数据源已确认
□ 公司行业已识别，对应模板已选择
```

---

## 输出要求

每份报告必须包含：

1. **结构化假设**（至少3个，使用 `innovation_hypothesis_schema_v1` 格式）
2. **跨领域类比**（至少1个，来自类比领域库）
3. **ClaimSpec 格式的因果机制**（至少2个）
4. **CAP Hypothesis 格式的估值影响**（至少2个）
5. **生态系统元素识别**（至少3个实体+2条关系）
6. **新颖性评分**（对每个创新假设打分）

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-27 | 初始版本 |
