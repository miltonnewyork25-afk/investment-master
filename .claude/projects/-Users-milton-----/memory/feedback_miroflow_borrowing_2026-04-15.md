---
name: MiroFlow 借鉴升级 v22.3
description: 从 MiroFlow 开源项目借鉴 4 项机制，升级回滚检测/模式切换/统计评测
type: project
---

## MiroFlow 借鉴升级 (2026-04-15)

从 MiroMindAI/miroflow 的代码级分析中借鉴了 4 项机制。

### 关键代码发现 (校准建议方向)

MiroFlow **不是图框架** — 尽管叫 "Flow"，实际是层级式迭代 Agent + 对话级回滚。
- "Agent Graph" = YAML 配置的层级子 Agent (GPT-5 → MiroThinker → MiroThinker)
- "Heavy-reasoning mode" = `reasoning_effort` 参数传给 API，无独立代码路径
- "Robust workflow" = 对话级回滚 + 重复查询去重 + 超时摘要 retry — **这是真正有工程深度的部分**

### 已实施的 4 项借鉴

**M1: 研究回滚检测 (`research_rollback.sh`)**
- 4 个检测信号: 重复搜索 / 论点循环 / 分析偏轨 / 产出异常
- 每个信号有具体的重试策略建议
- **Why:** MiroFlow 的回滚不是 API retry，是对话级 pop-and-retry。我们翻译为"检测到偏轨时回到上一个 checkpoint"

**M2: 失败摘要作为 retry 上下文 (`research_modes.yaml` failure_context_template)**
- Phase 失败时生成结构化摘要: 尝试了什么/找到了什么/为什么失败/不要重复什么
- 写入 handoff note §4.5, 下次 retry 会读到
- **Why:** MiroFlow 的 exceed-max-turn summary 让 retry 有"记忆"——知道上次为什么失败

**M3: 三档分析模式 (`research_modes.yaml`)**
- baseline (初筛) / deep-audit (核心章节) / high-stakes (最终判断)
- High-stakes 强制 5 件事: 双路径/证据重检/反证优先/更高停止门槛/审计输出
- **Why:** MiroFlow 的核心洞见: 不是所有任务都上最重模式

**M4: 统计评测 (`quality_statistical_eval.sh`)**
- 跨 73 份报告计算 mean/std/min/max + 趋势 + 异常值检测
- 发现 DM 密度趋势 ↓(-14.6%) — 一个值得关注的退化信号
- **Why:** MiroFlow 的 benchmark-first 纪律: 固定任务集 + 单变量变更 + 多次运行统计

### 决定不借鉴的

- **Hydra 配置系统**: 过度工程化，YAML 人工维护足够
- **ProcessPoolExecutor 进程隔离**: 我们不在 OS 层做并行
- **MCP 工具架构**: 我们已经用 MCP
- **pass@k 评测**: 投研不是标准答案问题，不适用 pass@k
- **benchmark verifiers**: 我们的 quality_gate_complete.sh 已覆盖

### How to apply

- Phase 中期检测偏轨: `bash scripts/research_rollback.sh TICKER PHASE`
- Phase 开始前选模式: 参考 `knowledge/research_modes.yaml` 三档定义
- 跨报告趋势分析: `bash scripts/quality_statistical_eval.sh`
- Phase 失败 retry: 在 handoff note §4.5 写 failure_context (模板见 research_modes.yaml)
