# 投资框架文档索引 v2.1

> **完整版文档索引**: 从main CLAUDE.md转移，详细说明何时加载每个文档

---

## 核心协议文档

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/deep_dive_protocol.md` | Tier 3启动时 | 6Phase协议+阻断机制+质量门控 |
| `docs/checkpoint_protocol.md` | Context恢复/检查点写入时 | v2.0精简schema+自动化脚本 |
| `docs/investment_thermometer_strategy.md` | 投资温度计算和Tier路由时 | 3层架构+5级温度+仓位建议 |
| `docs/quality_benchmarks.md` | Tier 3 Phase 5 / Complete报告组装时 | GOOGL 311K基准+11项CG门控 |
| `docs/compound_learning_flywheel.md` | Complete报告通过后反思/累计3项目后审视/架构优化时 | 反思→提炼→编码→传播循环 |

---

## 数据与标注系统

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/confidence_system.md` | 写报告标注数据时 | 三层标注系统+密度要求+置信标准 |
| `docs/anti_hallucination_protocol.md` | 并行Agent dispatch时 | 无源数字禁写+DM锚点+幻觉检测 |
| `docs/data_version_control.md` | Tier 3 Phase 0 DM初始化时 | 数据主锚点版本控制协议 |
| `docs/prediction_market_methodology.md` | 需要预测市场分析时 | Polymarket集成+概率验证方法 |

---

## 行业专用框架

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/industry/semiconductor_deep.md` | 分析半导体公司时 | 周期定位+产业链+技术路径+地缘政治 |
| `docs/industry/consumer_deep.md` | 分析消费品公司时 | 品牌价值+渠道效率+消费趋势+飞轮诊断 |
| `docs/industry/financial_deep.md` | 分析金融公司时 | F×D双轴+信用风险+数字转型ROI+监管 |
| `docs/industry/eco_tech_deep.md` | 分析生态科技公司时 | 生态系统+平台效应+监管风险+创新周期 |
| `docs/industry_frameworks.md` | 需要行业框架细节时 | 跨行业通用分析模块 |

---

## 风险与估值分析

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/risk_management.md` | Tier 2/3风险分析时 | 系统性风险+特有风险+压力测试 |
| `docs/bear_case_methodology.md` | Phase 4看空分析时 | 独立看空+确认偏误对抗+危机情景 |
| `docs/sotp_methodology.md` | Tier 2/3估值分析时 | 分部估值+折价合理化+催化剂 |
| `docs/valuation_correction_hierarchy.md` | Phase 4 估值修正时 | 估值修正优先级+调整方法 |
| `docs/behavioral_finance.md` | Tier 3 Phase 4对抗审查时 | 心理偏误+行为金融+情绪分析 |

---

## 执行与协作

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/parallel_execution.md` | 识别到可并行任务时 | 多Agent协作协议v2.0+锁文件+共享上下文 |
| `docs/agent_collaboration_protocol.md` | 多Agent并行执行时 | 6条硬约束+任务锁+增量提交 |
| `docs/time_management.md` | Tier 2/3项目启动时 | 会话效率+时间盒+范围控制 |
| `docs/execution_details.md` | 需要执行流程细节时 | 具体操作步骤+工具使用方法 |

---

## 质量保证

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/depth_assurance.md` | Tier 3质量检查时 | 深度验证标准+RDI评分 |
| `docs/differentiated_insight_standard.md` | 模块质量检查时 | 非共识洞察标准+D5评级 |
| `docs/report_depth_index.md` | 写报告前设定RDI目标/写完后评分验收 | RDI计算方法+验收标准 |
| `docs/quality_gate_v2.md` | Phase 4/5 质量门控时 | 两阶段质量门控+自动检查 |
| `docs/readability_spec.md` | 写报告前 | 格式决策+框架开发规范 |

---

## 核心方法论

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `docs/core_questions_methodology.md` | Phase 0.5 CQ提取时 | 核心问题提取+闭环验证方法 |
| `docs/market_debate_scanner.md` | Tier 2/3 Phase 0自动执行 | 市场争议点扫描+多空观点 |
| `docs/key_assumptions_list.md` | Tier 3 Phase 1-4 假设管理时 | KAL管理+假设验证+风险评级 |
| `docs/kill_switch_registry.md` | Tier 3 Phase 5 KS注册时 | 投资决策KS注册+10字段格式 |

---

## 测试与脚本

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `tests/research_fast.sh` | Agent完成后质量门控 | Fast Gate质量检查 |
| `tests/quality_gate_complete.sh` | Complete报告门控 | 11项CG硬性检查 |
| `tests/rdi_calculator.sh` | 报告完成后自动评分 | RDI自动计算+验收 |
| `tests/framework_health_check.sh` | 会话启动健康检查 | 系统状态+同步+未提交检查 |
| `scripts/phase_complete.sh` | Phase完成自动化 | FastGate→checkpoint→commit一键完成 |

---

## 框架演进

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `CHANGELOG.md` | 查看变更历史时 | 版本变更记录+新功能说明 |
| `docs/v21_migration_guide.md` | v20→v21迁移参考 | 标注系统升级指南 |
| `docs/v22_migration_guide.md` | v21→v22迁移参考 | 无源数字禁写升级 |
| `docs/v26_migration_guide.md` | v25→v26迁移指南 | 温度策略+统一工具包 |
| `docs/system_reflection_v2.1_2026-02-10.md` | 系统反思升级时 | 复利学习飞轮+自动化升级方案 |

---

## 技能工具包

| 文件 | 何时加载 | 说明 |
|------|---------|------|
| `investment-logic-toolkit.skill.md` | 使用统一投资分析工具包时 | 1200+行完整技术规格+异步处理 |
| `.claude/skills/quick-company-scan/SKILL.md` | Tier 1快速扫描时 | 5K字快速判断框架 |
| `.claude/skills/standard-analysis/SKILL.md` | Tier 2标准分析时 | 40K字完整投资分析 |

---

## 使用说明

1. **主CLAUDE.md**: 仅保留核心路由和速查，详细内容全部在本索引
2. **按需加载**: 只在对应场景时读取相关文档，避免context浪费
3. **版本控制**: 所有文档统一版本管理，确保一致性
4. **持续更新**: 基于复利学习飞轮持续优化升级