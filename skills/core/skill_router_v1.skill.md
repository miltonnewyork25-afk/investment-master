# Skill Router v1.0

## 概述

Skill Router 是分析流程的第二阶段（预加载之后），负责根据被分析公司的特性**动态选择**最相关的 Skill 组合，生成一个临时的"分析执行计划"文件。

---

## 工作流程

```
用户请求分析公司
        │
        ▼
┌─────────────────┐
│ Rule -1         │  → 预加载所有 Agent/Skill 定义
│ Analysis Preloader│
└─────────────────┘
        │
        ▼
┌─────────────────┐
│ Rule -0.5       │  → 根据公司特性路由选择 Skill
│ Skill Router    │  → 生成临时执行计划文件
└─────────────────┘
        │
        ▼
   正式分析执行
        │
        ▼
   报告完成验证
        │
        ▼
   删除临时文件
```

---

## 路由决策矩阵

### 第一层：行业路由

| 行业分类 | 必选 Skill | 可选 Skill |
|----------|-----------|-----------|
| **制造/硬件** | pvm_analysis, supply_chain_risk, capacity_utilization | learning_curve_analysis |
| **SaaS/订阅** | arr_cohort_analysis, rule_of_40, net_dollar_retention | churn_driver_analysis |
| **REIT** | nav_model, ffo_analysis, cap_rate_analysis | property_portfolio_matrix |
| **平台/市场** | network_effect_evaluator, platform_portfolio_matrix, gmv_take_rate | data_moat_quantifier |
| **E&P/资源** | reserve_valuation, cost_curve_analysis, commodity_sensitivity | decline_curve_analysis |
| **金融/银行** | nim_decomposition, asset_quality_analysis, capital_adequacy | credit_cycle_indicator |
| **生物医药** | pipeline_rnpv, clinical_probability, cash_runway | patent_cliff_calendar |
| **消费品ToC** | brand_equity_analysis, channel_analysis, customer_ltv | brand_emotion_control |
| **AI/科技平台** | data_moat_quantifier, ai_competitive_landscape, capex_intensive_valuation, platform_portfolio_matrix | robotaxi_valuation, cloud_competitive_tracker |

### 第二层：公司特性路由

| 特性 | 触发条件 | 追加 Skill |
|------|---------|-----------|
| **高增长** | 收入增速 >30% YoY | high_growth_tech_valuation |
| **亏损中** | Net Income <0 | cash_burn_analysis, path_to_profitability |
| **重资产** | CapEx/Revenue >15% | capex_intensive_valuation |
| **监管敏感** | 涉及医疗/金融/能源 | regulatory_risk_framework |
| **CEO依赖** | 创始人主导型 | key_person_risk_analysis |
| **多元化** | 3+业务线 | sotp_valuation, conglomerate_discount |
| **周期性** | β >1.3 | macro_industry_cycle, cyclical_timing |
| **AI相关** | AI是核心业务 | ai_option_valuation, ai_competitive_landscape |
| **数据护城河** | 数据是核心资产 | data_moat_quantifier |
| **网络效应** | 平台/市场模式 | network_effect_evaluator |

### 第三层：市场环境路由

| 环境因素 | 触发条件 | 追加 Skill |
|----------|---------|-----------|
| **高估值争议** | P/E >50 或 P/S >10 | valuation_sanity_check |
| **做空压力** | Short Interest >10% | short_squeeze_analysis |
| **分析师分歧** | 目标价差异 >50% | consensus_divergence_analysis |
| **财报前** | 财报发布 <30天 | earnings_surprise_predictor |
| **行业转折** | 行业处于周期拐点 | inflection_point_analysis |

---

## 临时执行计划文件格式

文件路径: `/Users/milton/投资大师/.analysis_temp/{ticker}_{timestamp}_execution_plan.yaml`

```yaml
# 分析执行计划 - 临时文件
# 完成分析后自动删除

execution_plan:
  meta:
    ticker: "TSLA"
    company_name: "Tesla, Inc."
    created_at: "2026-01-27T15:30:00Z"
    analyst: "Claude"
    plan_version: "1.0"
    status: "IN_PROGRESS"  # IN_PROGRESS → COMPLETED → DELETED

  routing_decisions:
    industry_classification: "制造/硬件 + AI/科技平台"
    company_characteristics:
      - high_growth: false  # 收入增速 <30%
      - loss_making: false  # 盈利中
      - capex_heavy: true   # CapEx/Revenue ~15%
      - regulatory_sensitive: true  # 自动驾驶监管
      - ceo_dependent: true  # Musk依赖
      - diversified: true   # 汽车+储能+FSD+Optimus
      - cyclical: true      # β ~2.0
      - ai_related: true    # FSD/Optimus
      - data_moat: true     # 驾驶数据
      - network_effect: false
    market_environment:
      - high_valuation_debate: true  # P/E ~70
      - short_pressure: false
      - analyst_divergence: true  # 目标价 $85-$550
      - pre_earnings: false
      - industry_inflection: true  # EV渗透拐点

  selected_skills:
    # 必选 (行业)
    tier_1_required:
      - skill: pvm_analysis
        reason: "制造业核心：Price × Volume × Mix 拆解"
        priority: P0
      - skill: supply_chain_risk
        reason: "电池/芯片供应链关键"
        priority: P0
      - skill: platform_portfolio_matrix
        reason: "多业务组合分析"
        priority: P0
      - skill: ai_competitive_landscape
        reason: "FSD竞争格局"
        priority: P0

    # 必选 (公司特性)
    tier_2_required:
      - skill: capex_intensive_valuation
        reason: "CapEx/Revenue ~15%"
        priority: P1
      - skill: regulatory_risk_framework
        reason: "自动驾驶监管敏感"
        priority: P1
      - skill: key_person_risk_analysis
        reason: "Musk依赖度高"
        priority: P1
      - skill: sotp_valuation
        reason: "4+业务线需分部估值"
        priority: P1
      - skill: data_moat_quantifier
        reason: "驾驶数据是核心资产"
        priority: P1
      - skill: ai_option_valuation
        reason: "FSD/Optimus期权价值"
        priority: P1

    # 可选 (市场环境)
    tier_3_optional:
      - skill: valuation_sanity_check
        reason: "P/E ~70 估值争议大"
        priority: P2
      - skill: consensus_divergence_analysis
        reason: "目标价差异 >500%"
        priority: P2
      - skill: inflection_point_analysis
        reason: "EV渗透率可能到拐点"
        priority: P2

  agent_activation:
    required:
      - agent: research_mechanism_agent
        output_count: 3  # 至少3个 ClaimSpec
      - agent: valuation_engine_agent
        output_count: 2  # 至少2个 CAP Hypothesis
      - agent: ecosystem_graph_agent
        output_count: 3  # 至少3个生态系统元素
      - agent: innovation_agent
        output_count: 3  # 至少3个创新假设
    optional:
      - agent: data_integrity_agent
        trigger: "发现数据异常时"

  innovation_pipeline_config:
    analogy_domains_to_prioritize:
      - biological_systems  # 竞争动态
      - historical_patterns  # 科技公司转型
      - system_dynamics     # 飞轮效应
    minimum_novelty_score: 0.50  # 提高阈值因为Tesla研究充分
    hypothesis_types_required:
      - MECHANISM
      - VALUATION
      - ECOSYSTEM

  data_sources:
    primary:
      - source: FMP_API
        endpoints:
          - /stable/profile
          - /stable/income-statement-ttm
          - /stable/balance-sheet-statement-ttm
          - /stable/cash-flow-statement-ttm
          - /stable/analyst-estimates
          - /api/v3/quote
    secondary:
      - source: WEB_SEARCH
        queries:
          - "Tesla analyst methodology 2026"
          - "Tesla FSD regulatory status"
          - "Tesla energy storage outlook"
          - "Tesla Robotaxi timeline"

  output_checklist:
    structured_hypotheses:
      - [ ] INNOV_H_001: MECHANISM 类型
      - [ ] INNOV_H_002: VALUATION 类型
      - [ ] INNOV_H_003: ECOSYSTEM 类型
    claim_specs:
      - [ ] CLM_001: 核心因果机制
      - [ ] CLM_002: 竞争动态机制
      - [ ] CLM_003: 估值驱动机制
    cap_hypotheses:
      - [ ] CAP_001: 估值影响（正面）
      - [ ] CAP_002: 估值影响（负面/风险）
    ecosystem_elements:
      - [ ] ECO_001: 飞轮识别
      - [ ] ECO_002: 竞争关系
      - [ ] ECO_003: 供应链依赖

  completion_criteria:
    report_word_count: "≥20,000"
    quality_gate_pass: true
    all_checklist_items: true
    innovation_hypothesis_count: "≥3"
    claim_spec_count: "≥3"
    cap_hypothesis_count: "≥2"

  cleanup:
    delete_on_completion: true
    archive_before_delete: false  # 临时文件不归档
```

---

## 路由输出摘要模板

在预加载摘要之后，输出路由摘要：

```markdown
## 🎯 Skill 路由结果

### 公司识别
- **Ticker**: TSLA
- **行业**: 制造/硬件 + AI/科技平台 (混合型)
- **关键特性**: 重资产、CEO依赖、多元化、AI相关、数据护城河

### 选中的 Skill 组合 (12个)

| 层级 | Skill | 选择原因 |
|------|-------|----------|
| **T1必选** | pvm_analysis | 制造业核心拆解 |
| **T1必选** | supply_chain_risk | 电池/芯片供应链 |
| **T1必选** | platform_portfolio_matrix | 多业务组合 |
| **T1必选** | ai_competitive_landscape | FSD竞争 |
| **T2必选** | capex_intensive_valuation | 重资产估值 |
| **T2必选** | regulatory_risk_framework | 监管风险 |
| **T2必选** | key_person_risk_analysis | Musk依赖 |
| **T2必选** | sotp_valuation | 分部估值 |
| **T2必选** | data_moat_quantifier | 数据护城河 |
| **T2必选** | ai_option_valuation | AI期权价值 |
| **T3可选** | valuation_sanity_check | 高估值验证 |
| **T3可选** | consensus_divergence_analysis | 分歧分析 |

### Agent 激活计划

| Agent | 输出要求 |
|-------|---------|
| RM Agent | ≥3 ClaimSpec |
| VE Agent | ≥2 CAP Hypothesis |
| ECO Agent | ≥3 生态系统元素 |
| INNOV Agent | ≥3 创新假设 |

### 临时执行计划
📄 已生成: `.analysis_temp/TSLA_20260127_153000_execution_plan.yaml`
⚠️ 报告完成后将自动删除

---
```

---

## 清理机制

### 自动清理触发条件

```yaml
cleanup_triggers:
  - condition: "报告通过 Quality Gate"
    action: "删除临时执行计划"

  - condition: "用户确认报告完成"
    action: "删除临时执行计划"

  - condition: "分析中断/取消"
    action: "保留临时文件24小时后自动删除"

  - condition: "临时文件超过72小时"
    action: "强制删除"
```

### 清理命令

```bash
# 手动清理
rm -f /Users/milton/投资大师/.analysis_temp/*.yaml

# 清理超过24小时的临时文件
find /Users/milton/投资大师/.analysis_temp -name "*.yaml" -mtime +1 -delete
```

---

## 与 CLAUDE.md 集成

在 Rule -1 (预加载) 和 Rule 0 (行业自适应) 之间插入：

```markdown
### -0.5. Skill 路由 (Skill Router) [v8.0新增]

**在预加载完成后、正式分析前必须执行**

1. 根据公司行业选择 Tier 1 必选 Skill
2. 根据公司特性选择 Tier 2 必选 Skill
3. 根据市场环境选择 Tier 3 可选 Skill
4. 生成临时执行计划文件
5. 输出"路由摘要"

**临时文件管理**：
- 路径: `.analysis_temp/{ticker}_{timestamp}_execution_plan.yaml`
- 报告完成后自动删除
- 不提交到 git
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-27 | 初始版本 |
