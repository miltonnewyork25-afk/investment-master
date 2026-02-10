# 投资研究 Agent — 消费品行业专用 v26.0

> 通用框架见 `docs/`。本文件仅含行业配置+铁律速查+路由+工具优先级。
> 详细公式/Phase指南/监控指标/特色框架 → `docs/industry/consumer_deep.md`

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 消费品 (日用消费/零售/餐饮/奢侈品) |
| 框架 | `docs/industry/consumer_deep.md` |
| 系数 | ×1.5 |
| 公司 | PG, KO, NKE, COST, WMT, MCD, SBUX, LVMH, AMZN(零售) |

## 分析路由

| 意图 | 层级 | 详见 |
|------|------|------|
| "看看/怎么样" | Tier 1 ~5K字 | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问T1或T2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度/全面" | Tier 3 ≥85K×1.5 | `docs/deep_dive_protocol.md` |

## 铁律速查 (A-M)

**基础** A单会话禁跨Phase | B阶段完成=Commit | C目标≤1主+1小 | D会话预检+温度计 | E报告→`reports/{T}/` | F质量不可回退
**v26新增** G Phase0强制温度计 | H MCP优先>WebSearch>禁幻觉 | I专业场景强制skill | J ≥3任务强制并行
**消费品特化** K B×M品牌溢价强制 | L消费三重验证(心理+社交+渠道) | M飞轮诊断强制(品牌/会员/平台)

## 工具优先级

| P0 | `baggers_summary` `fmp_data` `analyze_stock` `polymarket_events` `/investment-logic-toolkit` |
|----|---|
| P1 | `/consumer-brand-analysis-toolkit` `/company-research-agent` `/psychology-agent` `/smart-money-tracking-system` `/industry-cycle-analyzer` `/signal-monitoring-system` |
| P2 | `/dispatching-parallel-agents` `/data-prefetch` `/cross-validation` `/bear-case-generator` `/report-merger` `/flywheel-diagnosis` |

## B×M 速查

| B×M | ≥4×4 | ≥3×3 | ≥2×2 | <2×2 |
|-----|-------|-------|-------|------|
| 溢价 | 30-80% | 15-45% | 5-20% | 0% |

公式详见 `docs/industry/consumer_deep.md`

## 公司分类

| 类型 | 代表 | B×M | 重点 |
|------|------|-----|------|
| 全球顶级品牌 | KO, NKE, LVMH | B5×M4 | 品牌生态+全球化+数字转型 |
| 平台型零售 | COST, AMZN | B3×M5 | 会员飞轮+网络效应+运营效率 |
| 快消品巨头 | PG, UL | B4×M3 | 产品组合+渠道控制+创新管线 |
| 连锁餐饮 | MCD, SBUX | B4×M4 | 标准化复制+单店模型+数字化 |
| 新兴品牌 | DTC | B2×M2 | 增长速度+CAC/LTV+留存 |

## Phase完成

```bash
bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}
# 自动: Fast Gate → checkpoint v2.0 → git commit
```

## 文档索引（按需加载）

| 文件 | 时机 |
|------|------|
| `docs/industry/consumer_deep.md` | B×M公式/Phase指南/监控指标/会员制+品牌组合+DTC框架 |
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
