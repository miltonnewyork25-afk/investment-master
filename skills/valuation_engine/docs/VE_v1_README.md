# Valuation Engine Agent v1.0

## 概述

Valuation Engine (VE) 是投资研究Agent系统的估值核心组件，采用**Expectations Investing**方法论，实现"价格先行"的估值分析。

### 核心理念

> "Don't start with a forecast and calculate value. Start with price and calculate the implied forecast."
> — Mauboussin & Rappaport, Expectations Investing

VE不是传统的"预测→估值"，而是"价格→隐含预期→验证"。

---

## 三层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Layer 3: Reconciler                       │
│   对比 Implied vs Forward → Expectation Gap → Confidence    │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                  Layer 2: Forward Bridge                     │
│   正向估值 (DCF/Comps/专用模型) → 三场景区间                 │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   Layer 1: Reverse DCF                       │
│   Router → Solver → Implied Expectations + CAP Hypotheses   │
└─────────────────────────────────────────────────────────────┘
                              ↑
                        Market Price
```

### Layer 1: Reverse DCF (价格反推)

- **Router**: 识别公司类型，路由到正确的model_family
- **Solver**: 数值求解使NPV=当前价格的隐含预期
- **输出**: implied_expectations + cap_hypotheses

### Layer 2: Forward Bridge (正向验证)

- **桥接**: 选择对应的forward skill
- **估值**: 执行传统DCF/Comps/专用模型
- **输出**: 三场景估值区间 (Bear/Base/Bull)

### Layer 3: Reconciler (对账整合)

- **对比**: Implied vs Forward的差异分析
- **整合**: CAP假设 + RM信号 → Monitoring Triggers
- **输出**: expectation_gap + ve_confidence_cap + degrade_mode

---

## 8个Model Families

| ID | 适用场景 | 理论基础 | Forward Skill |
|----|----------|----------|---------------|
| VE_CORP_FCFF_REVERSE_DCF | 非金融公司(默认) | DCF/FCFF | generic_dcf_forward |
| VE_CYCLICAL_NORMALIZED_REVERSE_DCF | 周期股/商品 | Normalized Earnings | cyclical_normalized_forward |
| VE_PLATFORM_OPTIONALITY_ANNOTATED | 平台/高成长 | TAM/渗透率上限 | high_growth_tech_v1.2 |
| VE_FINANCIAL_ROE_RESIDUAL_INCOME | 金融机构 | Residual Income | financial_roe_residual_forward |
| VE_HIGH_LEVERAGE_REFI_SENSITIVE | 高杠杆(叠加) | 再融资敏感性 | high_leverage_forward |
| VE_CAPEX_INTENSIVE_NORMALIZED | 资本密集 | CapEx分解 | capex_intensive_v1.0 |
| VE_MULTI_SEGMENT_SOTP | 多元化集团 | SOTP | sotp_forward |
| VE_REIT_NAV_IMPLIED | REIT | NAV/Cap Rate | reit_nav_forward |

### 路由优先级

```
Financial (100) > REIT (95) > Cyclical (90) > Multi-Segment (85)
> CapEx Intensive (80) > Platform (75) > High Leverage (70, overlay) > Default (0)
```

---

## 核心输出

### 1. Implied Expectations

```yaml
implied_expectations:
  rev_cagr: 0.18           # 市场隐含的收入增速
  target_margin: 0.14      # 市场隐含的目标利润率
  fade_years_or_cap: 12    # 市场隐含的CAP年数
  terminal_g: 0.03         # 市场隐含的永续增长
  confidence: 0.72
```

### 2. CAP Hypotheses (≥3条)

每个假设必须包含：
- **claim**: 陈述 (什么条件需要成立)
- **metric**: 可量化指标
- **threshold**: 阈值条件
- **time_window**: 验证时间窗
- **verification_sources**: 数据来源
- **disconfirmers**: 证伪条件

### 3. Expectation Gap

```yaml
expectation_gap:
  absolute: $160           # 绝对差异
  relative_pct: 0.55       # 相对差异55%
  direction: MARKET_MORE_OPTIMISTIC
  top_gap_drivers: [fade_years, rev_cagr]
```

### 4. Confidence & Degrade

- **ve_confidence_cap**: VE层置信度上限 (0-1)
- **degrade_mode**: 是否进入降级模式
- 降级模式下**禁止**输出: target_price, buy_sell_recommendation

---

## 文件结构

```
skills/valuation_engine/
├── valuation_engine_agent_v1.yaml      # Agent主配置
├── policies/
│   ├── ve_policy_pack_v1.yaml          # 策略包(阈值/规则)
│   └── ve_router_rules_v1.yaml         # 路由规则
├── skills_xml/
│   ├── ve_router_v1.skill.xml          # L1a Router
│   ├── ve_reverse_dcf_solver_v1.skill.xml  # L1b Solver
│   ├── ve_forward_bridge_v1.skill.xml  # L2 Forward
│   └── ve_reconciler_v1.skill.xml      # L3 Reconciler
├── schemas/
│   ├── valuation_summary_schema_v1.yaml
│   └── implied_expectations_schema_v1.yaml
├── contracts/
│   └── ve_qg_interface_contract_v1.yaml
├── templates/
│   └── cap_falsifiable_template_v1.yaml
├── reason_codes/
│   └── reason_code_dictionary_VE.yaml
├── tests/
│   └── ve_router_rules_tests_v1.yaml   # 15个路由测试
├── examples/
│   └── implied_expectations_samples_v1.md  # 5公司示例
└── docs/
    └── VE_v1_README.md                 # 本文档
```

---

## Reason Codes

| 级别 | 数量 | 动作 |
|------|------|------|
| P0 | 6 | FAIL |
| P1 | 9 | DEGRADE |
| P2 | 11 | WARN |
| P3 | 2 | INFO |

关键codes:
- `VE_ANCHOR_INCONSISTENT` (P0): EV/Equity口径不一致
- `VE_NO_FEASIBLE_SOLUTION` (P0): 无可行解
- `VE_FORWARD_REVERSE_GAP_EXTREME` (P0): Gap>50%
- `VE_TERMINAL_ASSUMPTION_FRAGILE` (P1): Terminal假设脆弱
- `VE_CONFIDENCE_TOO_LOW` (P0): 置信度<50%

---

## 与下游集成

### VE → Quality Gate

通过 `ve_qg_interface_contract_v1.yaml` 定义的标准接口：

```yaml
payload:
  ve_confidence_cap: float
  implied_expectations: object
  cap_hypotheses: array
  forward_valuation_range: object
  expectation_gap: object
  fragility_assessment: object
  reason_codes_all: array
  degrade_mode: boolean
```

### VE → Eval Agent

```yaml
payload:
  implied_expectations: object
  cap_hypotheses: array
  decision_trace: object
test_types:
  - golden_outcome
  - metamorphic
  - governance
```

---

## 理论参考

1. **Expectations Investing** - Mauboussin & Rappaport
2. **Value Driver Framework** - ROIC + Growth + Reinvestment + Fade
3. **Competitive Advantage Period (CAP)** - Damodaran
4. **Residual Income Model** - CFA Institute
5. **Normalized Earnings** - Damodaran on Cyclicals

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-01-27 | 初始版本 |

---

## Quick Start

1. **配置policy_pack**: 确保`ve_policy_pack_v1.yaml`中的阈值符合需求
2. **准备输入**: profile, valuation_anchor, base_metrics, evidence
3. **运行VE Agent**: 依次执行L1→L2→L3
4. **检查输出**:
   - 如果`degrade_mode=true`，不要输出投资结论
   - 关注`cap_hypotheses`并设置监控
   - 分析`expectation_gap`理解市场定价

---

## 联系方式

- **Owner**: Investment Super Agent Team
- **Policy Pack Version**: ve-1.0.0
- **Compatible QG Version**: qg-2.2.0+
