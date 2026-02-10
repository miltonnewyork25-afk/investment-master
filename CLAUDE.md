# 投资研究 Agent — 生态科技+科技平台 v26.0

> 通用框架见 `docs/`。本文件仅含行业配置+铁律速查+路由+工具优先级。
> 生态科技详细 → `docs/industry/eco_tech_deep.md`
> 科技平台详细 → `docs/industry/tech_platform_deep.md`

## 行业配置

| 行业 | 系数 | 公司 |
|------|------|------|
| 生态科技 | ×1.3 | ENPH, SEDG, FSLR, NEE, PLTR(ESG), TSLA(能源), BEP, ICLN |
| 科技平台 | ×1.4 | AAPL, MSFT, GOOGL, META, AMZN |

## 分析路由

| 意图 | 层级 | 详见 |
|------|------|------|
| "看看/怎么样" | Tier 1 ~5K字 | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问T1或T2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度/全面" | Tier 3 ≥85K×1.3 | `docs/deep_dive_protocol.md` |

## 铁律速查 (A-M)

**基础** A单会话禁跨Phase | B阶段完成=Commit | C目标≤1主+1小 | D会话预检+温度计 | E报告→`reports/{T}/` | F质量不可回退
**v26新增** G Phase0强制温度计 | H MCP优先>WebSearch>禁幻觉 | I专业场景强制skill | J ≥3任务强制并行
**生态特化** K E×V绿色溢价强制 | L政策三重评估(补贴+监管+碳价) | M非漂绿验证

## 工具优先级

| P0 | `baggers_summary` `fmp_data` `analyze_stock` `polymarket_events` `/investment-logic-toolkit` |
|----|---|
| P1 | `/company-research-agent` `/psychology-agent` `/industry-cycle-analyzer` `/smart-money-tracking-system` `/signal-monitoring-system` |
| P2 | `/dispatching-parallel-agents` `/data-prefetch` `/cross-validation` `/bear-case-generator` `/report-merger` |

## E×V 速查

| E×V | ≥4×4 | ≥3×3 | ≥2×2 | <2×2 |
|-----|-------|-------|-------|------|
| 溢价 | 20-35% | 10-20% | 5-10% | 0% |

公式详见 `docs/industry/eco_tech_deep.md`

## 公司分类

| 类型 | 代表 | E+V典型 | 重点 |
|------|------|---------|------|
| 太阳能设备 | ENPH, SEDG, FSLR | E4+V3 | 成本曲线+政策+技术 |
| 电力公用 | NEE, BEP | E3+V4 | 监管回报+转型+ESG |
| ESG数据 | PLTR(ESG) | E2+V4 | 数据质量+粘性+监管 |
| 电动交通 | TSLA(能源) | E4+V3 | 基础设施+政策+成本 |
| 绿色金融 | 绿色债券基金 | E3+V3 | 资金流+收益率+激励 |

## Phase完成

```bash
bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}
# 自动: Fast Gate → checkpoint v2.0 → git commit
```

## 文档索引（按需加载）

| 文件 | 时机 |
|------|------|
| `docs/industry/eco_tech_deep.md` | E×V公式/Phase指南/监控指标/ESG框架 |
| `docs/industry/tech_platform_deep.md` | TP01-06模块/网络效应/广告/云/监管/数据护城河 |
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
