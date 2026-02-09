# 投资研究 Agent — 生态科技行业专用

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 生态科技 (清洁能源/ESG/绿色金融) |
| 行业框架 | `.claude/skills/eco-tech-analyzer/eco_tech_master_framework.yaml` |
| 复杂度系数 | ×1.3 |
| 适用公司 | ENPH, SEDG, FSLR, NEE, PLTR, TSLA(能源部分) |

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
- **Push规则**: `git push origin 生态科技-new`，不碰main。合并到main需逐项确认

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
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `docs/compound_learning_flywheel.md` | Complete报告通过后反思 / 架构优化时 |
| `CHANGELOG.md` | 查看变更历史时 |

## 生态科技行业专用规则

### 专用分析框架 (eco-tech-analyzer)
- `carbon_economics_modeler.yaml` — 碳经济建模
- `circular_economy_analyzer.yaml` — 循环经济分析
- `environmental_impact_quantifier.yaml` — 环境影响量化
- `esg_native_assessor.yaml` — ESG原生评估
- `green_finance_modeler.yaml` — 绿色金融建模
- `policy_scenario_analyzer.yaml` — 政策情景分析
- `regulatory_pathway_mapper.yaml` — 监管路径映射
- `sustainability_valuator.yaml` — 可持续性估值

### 核心分析维度
- **政策依赖度**: IRA/EU Green Deal补贴敞口 + 政策反转风险
- **技术路线**: 光伏/风电/储能/氢能技术迭代速度 + 成本曲线
- **碳定价影响**: 碳市场价格敏感性 + 碳关税(CBAM)传导
- **ESG整合**: 非漂绿验证 + 实质性ESG指标 vs 表面ESG评级
