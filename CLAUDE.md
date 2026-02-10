# 投资研究 Agent — 金融行业专用 v26.0

> 通用框架见 `docs/`。本文件仅含行业配置+铁律速查+路由+工具优先级。
> 详细公式/Phase指南/监控指标/信用风险框架 → `docs/industry/financial_deep.md`

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 金融 (银行/保险/支付/Fintech) |
| 框架 | `docs/industry/financial_deep.md` |
| 系数 | ×1.2 |
| 公司 | JPM, GS, BAC, V, MA, BRK, SOFI, PYPL, SQ, AXP, MS |

## 分析路由

| 意图 | 层级 | 详见 |
|------|------|------|
| "看看/怎么样" | Tier 1 ~5K字 | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问T1或T2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度/全面" | Tier 3 ≥85K×1.2 | `docs/deep_dive_protocol.md` |

## 铁律速查 (A-M)

**基础** A单会话禁跨Phase | B阶段完成=Commit | C目标≤1主+1小 | D会话预检+温度计 | E报告→`reports/{T}/` | F质量不可回退
**v26新增** G Phase0强制温度计 | H MCP优先>WebSearch>禁幻觉 | I专业场景强制skill | J ≥3任务强制并行
**金融特化** K F×D金融溢价强制 | L信贷四重验证(NCO+DQNCY+准备金+压力测试) | M监管风险强制(资本+流动性+合规+变化敏感性)

## 工具优先级

| P0 | `baggers_summary` `fmp_data` `analyze_stock` `polymarket_events` `/investment-logic-toolkit` |
|----|---|
| P1 | `/company-research-agent` `/psychology-agent` `/industry-cycle-analyzer` `/smart-money-tracking-system` `/signal-monitoring-system` |
| P2 | `/dispatching-parallel-agents` `/data-prefetch` `/cross-validation` `/bear-case-generator` `/report-merger` |

## F×D 速查

| F×D | ≥4×4 | ≥3×3 | ≥2×2 | <2×2 |
|-----|-------|-------|-------|------|
| 溢价 | 15-25% | 8-15% | 3-8% | 0% |

公式详见 `docs/industry/financial_deep.md`

## 公司分类

| 类型 | 代表 | F+D | 重点 |
|------|------|-----|------|
| 大型银行 | JPM, BAC | F4+D3 | 资本管理+信贷+监管 |
| 投资银行 | GS, MS | F3+D3 | 交易收入+IPO+资本市场 |
| 支付网络 | V, MA | F4+D4 | 网络效应+交易增长+数字钱包 |
| 数字银行 | SOFI, SQ | F2+D4 | 获客成本+信贷质量+数字体验 |
| 保险巨头 | BRK | F5+D2 | 承保质量+投资收益+内含价值 |

## Phase完成

```bash
bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}
# 自动: Fast Gate → checkpoint v2.0 → git commit
```

## 文档索引（按需加载）

| 文件 | 时机 |
|------|------|
| `docs/industry/financial_deep.md` | F×D公式/Phase指南/监控指标/信用风险+数字化ROI |
| `docs/investment_thermometer_strategy.md` | Phase 0+4温度计 |
| `docs/deep_dive_protocol.md` | Tier 3启动 |
| `docs/checkpoint_protocol.md` | 恢复/检查点 |
| `docs/parallel_execution.md` | 并行Agent |
| `docs/quality_benchmarks.md` | Complete门控 |
| `docs/confidence_system.md` | 标注数据 |
| `docs/anti_hallucination_protocol.md` | Agent dispatch |
| `docs/readability_spec.md` | 写报告前 |
| `tests/research_fast.sh` | Agent质量门控 |
| `tests/quality_gate_complete.sh` | Complete门控 |
