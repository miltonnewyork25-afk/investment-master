# 投资研究 Agent — 金融行业专用

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 金融 (银行/保险/Fintech) |
| 行业框架 | `docs/industry/financial.md` + `docs/industry/fintech.md` |
| 复杂度系数 | ×1.2 |
| 适用公司 | JPM, GS, BAC, V, MA, BRK, SOFI, PYPL, SQ |

## 分析路由

| 用户意图 | 触发 | 详见 |
|---------|------|------|
| "看看/怎么样" | Tier 1 快速扫描 (~5K字) | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问用户 Tier 1或2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度分析/全面研究" | Tier 3 多会话 (≥85K×系数) | `docs/deep_dive_protocol.md` |

## 核心铁律（不可违反）

- **A** 单会话禁跨Phase | **B** 阶段完成=Git Commit | **C** 目标捆绑≤1主+1小
- **D** 会话预检: 检查 `reports/{TICKER}/data/checkpoint.yaml` 恢复状态 + `current_tasks/` 锁文件
- **E** 报告放置 `reports/{TICKER}/` (Phase报告+Complete+data/) | **F** 质量不可回退(Complete门控)
- **数据诚信**: `[硬数据:]`/`[合理推断:]`/`[主观判断:]` ≥15/万字, 硬数据≥40%, 无源数字禁写入
- **Push规则**: `git push origin 金融`，不碰main。合并到main需逐项确认

## 文档索引（按需加载，不要全部读取）

| 文件 | 何时加载 |
|------|---------|
| `docs/deep_dive_protocol.md` | Tier 3启动时 |
| `docs/parallel_execution.md` | 并行Agent执行时 |
| `docs/agent_collaboration_protocol.md` | 多Agent协作时 |
| `docs/checkpoint_protocol.md` | Context恢复/检查点时 |
| `docs/quality_gate_v2.md` | Phase 4/5质量门控时 |
| `docs/quality_benchmarks.md` | Complete报告组装时 |
| `docs/confidence_system.md` | 写报告标注数据时 |
| `docs/anti_hallucination_protocol.md` | Agent dispatch时 |
| `docs/data_version_control.md` | DM初始化时 |
| `docs/sotp_methodology.md` | 估值分析时 |
| `docs/bear_case_methodology.md` | Phase 4看空分析时 |
| `docs/behavioral_finance.md` | Phase 4对抗审查时 |
| `docs/core_questions_methodology.md` | CQ提取时 |
| `docs/industry/financial.md` | 传统金融分析时 |
| `docs/industry/fintech.md` | Fintech/数字银行分析时 |
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `docs/compound_learning_flywheel.md` | Complete报告通过后反思 / 架构优化时 |
| `CHANGELOG.md` | 查看变更历史时 |

## 金融行业专用规则

### Fintech深度要求
- Fintech公司(SOFI/PYPL/SQ)必须加载 `docs/industry/fintech.md` 获取15模块框架
- 信用周期风暴矩阵: 20维度风险评估(NCO/DQNCY/准备金/宏观等)
- 银行牌照价值独立评估: 资金成本优势量化

### 传统金融深度要求
- 银行(JPM/BAC/GS): 资本充足率+信贷风险+NIM/ALM专用模块
- 保险(BRK): 内含价值+承保质量+精算审计
- 支付(V/MA): 网络效应+交易量趋势+监管风险
