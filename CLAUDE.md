# 投资研究 Agent — 消费品行业专用

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 消费品 (日用消费/零售/餐饮) |
| 行业框架 | `docs/industry/consumer.md` |
| 复杂度系数 | ×1.5 |
| 适用公司 | PG, KO, NKE, COST, WMT, MCD, SBUX, LVMH |

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
- **Push规则**: `git push origin 消费品`，不碰main。合并到main需逐项确认

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
| `docs/industry/consumer.md` | 消费品分析时 |
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `CHANGELOG.md` | 查看变更历史时 |

## 消费品行业专用规则

### 专用技能工具包
- `skills/consumer-brand-analysis-toolkit/SKILL.md` — 品牌价值量化(收入贡献法/成本节省法)
- `skills/smart-money-tracking-system/SKILL.md` — 机构投资者持仓分析
- `skills/membership_business_model_analysis_system.md` — 会员制企业(COST等)
- `skills/retail_operations_analysis_toolkit.md` — 坪效/人效/供应链
- `skills/consumer_behavior_analysis_toolkit.md` — 客户分层/LTV计算

### Phase执行重点
- **Phase 1**: 品牌分类 + 机构持仓扫描
- **Phase 2**: 机构流向追踪 + 品牌价值量化
- **Phase 3**: 品牌护城河(网络效应/转换成本/规模经济) + 忠诚度分层(Level 1-4)
- **Phase 4**: 品牌价值3-5年预测 + Tier 1投资者动向 + Red Flags检查
