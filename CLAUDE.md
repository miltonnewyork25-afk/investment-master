# 投资研究 Agent — 半导体行业专用 v26.0

> 通用框架见 `docs/`。本文件仅含行业配置+铁律速查+路由+工具优先级。
> 详细公式/Phase指南/周期框架/质量标准 → `docs/industry/semiconductor_deep.md`

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 半导体 (代工/设计/设备/存储) |
| 框架 | `docs/industry/semiconductor_deep.md` |
| 系数 | ×1.5 |
| 公司 | TSM, NVDA, AMD, ASML, LRCX, MU, INTC |

## 分析路由

| 意图 | 层级 | 详见 |
|------|------|------|
| "看看/怎么样" | Tier 1 ~5K字 | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问T1或T2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度/全面" | Tier 3 ≥85K×1.5 | `docs/deep_dive_protocol.md` |

## 铁律速查 (A-M)

**基础** A单会话禁跨Phase | B阶段完成=Commit | C目标≤1主+1小 | D会话预检+温度计 | E报告→`reports/{T}/` | F质量不可回退
**v26新增** G Phase0强制温度计 | H MCP优先>WebSearch>禁幻觉 | I专业场景强制skill | J ≥3任务强制并行
**半导体特化** K AI双轴L×S评估强制 | L周期6层雷达验证(≥3层一致) | M地缘风险3情景量化(台海+禁运+AI需求)

## 工具优先级

| P0 | `baggers_summary` `fmp_data` `analyze_stock` `polymarket_events` `/investment-logic-toolkit` |
|----|---|
| P1 | `/company-research-agent` `/psychology-agent` `/industry-cycle-analyzer` `/smart-money-tracking-system` `/signal-monitoring-system` |
| P2 | `/dispatching-parallel-agents` `/data-prefetch` `/cross-validation` `/bear-case-generator` `/report-merger` |

## AI双轴 L×S 速查

| L×S | ≥3×3 | 2×2-3 | ≤1×any |
|-----|-------|-------|--------|
| 溢价 | 20-50% | 10-20% | 0% |

公式+维度详见 `docs/industry/semiconductor_deep.md`

## 公司分类

| 类型 | 代表 | 重点 |
|------|------|------|
| 代工厂 | TSM, SMIC | 地缘风险+技术代差+稀缺性 |
| 设计公司 | NVDA, AMD | AI需求+PMSI情绪+技术权重 |
| 设备厂商 | ASML, LRCX | 周期定位+供应链+间接传导 |
| 存储芯片 | MU, SK | 周期雷达+供需模型+价格弹性 |

## Phase完成

```bash
bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}
# 自动: Fast Gate → checkpoint v2.0 → git commit
```

## 文档索引（按需加载）

| 文件 | 时机 |
|------|------|
| `docs/industry/semiconductor_deep.md` | L×S公式/Phase指南/周期框架/PMSI/PPDA/KS/质量标准 |
| `docs/semiconductor-supply-chain-map.md` | 产业链关系图(LRCX视角) |
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
