# 投资研究 Agent — 科技平台行业专用

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 科技平台 (广告/云/消费电子/AI) |
| 行业框架 | `docs/industry/tech_platform.md` |
| 复杂度系数 | ×1.4 |
| 适用公司 | AAPL, MSFT, GOOG, META, AMZN |

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
- **Push规则**: `git push origin 科技平台`，不碰main。合并到main需逐项确认

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
| `docs/industry/tech_platform.md` | 科技平台分析时 |
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `CHANGELOG.md` | 查看变更历史时 |

## 科技平台行业专用规则

### 核心分析维度
- **平台生态**: 网络效应强度 + 多边市场动态 + 生态锁定度
- **AI变现路径**: 广告AI增效 / 云AI服务 / AI硬件 / AI原生产品
- **监管风险**: 反垄断(DOJ/EU) + 数据隐私(GDPR/DMA) + AI监管
- **资本配置**: CapEx周期(AI infra投入) + 回购 vs 投资效率

### 公司类型适配
| 类型 | 代表 | 重点 |
|------|------|------|
| 广告平台 | META, GOOG | 广告AI提效 + 用户增长/时长 + Reels/短视频 |
| 云+企业 | MSFT, AMZN | Azure/AWS增速 + AI工作负载迁移 + 毛利率 |
| 消费生态 | AAPL | 服务营收占比 + 硬件周期 + AI集成(Siri/边缘) |
| 综合巨头 | GOOG, AMZN | SOTP估值 + 部门间协同 + 亏损业务拖累 |
