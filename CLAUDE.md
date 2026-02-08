# 投资研究 Agent — 半导体行业专用

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 半导体 (代工/设计/设备/存储) |
| 行业框架 | `docs/industry/semiconductor.md` |
| 复杂度系数 | ×1.5 |
| 适用公司 | TSM, NVDA, AMD, ASML, LRCX, MU, INTC |

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
- **Push规则**: `git push origin 半导体`，不碰main。合并到main需逐项确认

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
| `docs/industry/semiconductor.md` | 半导体分析时 |
| `docs/semiconductor_quality_standards.md` | 质量标准/评分/铁律 |
| `docs/semiconductor_research_protocol.md` | v20.0调研协议/预测市场模块 |
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `docs/compound_learning_flywheel.md` | Complete报告通过后反思 / 架构优化时 |
| `CHANGELOG.md` | 查看变更历史时 |

## 半导体行业专用规则

### 四大分析原则
- **技术驱动**: 制程代差决定长期竞争力，工艺节点迁移创造价值重分配
- **周期优先**: P1-P5周期定位 > 短期财务指标，6层雷达信号 > 管理层指引
- **AI影响**: 区分AI硬件销售 vs AI平台生态，量化结构性 vs 周期性需求
- **地缘整合**: 出口管制是新常态，供应链韧性 > 成本效率

### AI双轴评估 (L+S)
- L轴(技术深度): L0概念→L4平台收税 | S轴(商业兑现): S0<5%→S5主引擎
- L≥3 AND S≥3 → 溢价20-50% | L2 AND S2-3 → 溢价10-20% | L≤1 OR S≤1 → 无溢价

### 公司类型适配
| 类型 | 代表 | 重点 |
|------|------|------|
| 代工厂 | TSM, SMIC | 地缘风险背离+技术代差+稀缺性 |
| 设计公司 | NVDA, AMD | AI需求验证+PMSI情绪+技术权重高 |
| 设备厂商 | ASML, LRCX | 周期定位+供应链+间接传导 |
| 存储芯片 | MU, SK | 周期雷达+供需模型+价格弹性 |
