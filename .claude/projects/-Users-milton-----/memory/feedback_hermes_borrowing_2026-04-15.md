---
name: Hermes Agent 借鉴升级 v22.3
description: 从 Hermes Agent 开源项目借鉴 5 项工程实践，升级 context 管理和框架治理
type: project
---

## Hermes Agent 借鉴升级 (2026-04-15)

从 NousResearch/hermes-agent 开源项目的代码级分析中，借鉴了 5 项实践:

### 已实施的 5 项借鉴

**P0: Tool Output Pruning + Handoff 压缩摘要**
- 新增 `scripts/context_compress.sh` — Phase 中期/完成时生成工具执行摘要
- `phase_complete.sh` v1.1 新增 Step 4.5 自动调用
- 产出: `reports/{TICKER}/data/tool_execution_summary.md`
- **Why:** Hermes 的压缩器不是丢弃工具结果，而是替换为信息性一行摘要。我们的 Claude Code 用 `[Old tool result content cleared]` 替代——丢失了"做过什么"的信息

**P1: 主动压缩触发**
- `context_compress.sh` 同时承担此角色
- 在 Phase 中期主动裁剪，不等 83.5% 被动触发
- **Why:** Hermes 在 50% context window 就触发压缩，保留率比被动压缩高

**P2: Evolution Guardrails 自动门控**
- 新增 `knowledge/evolution_guardrails.yaml` — 量化约束定义
- 新增 `scripts/evolution_gate.sh` — 5 道门控 (Size/Growth/Structure/Duplicate/Count)
- 框架修改前必须运行，BLOCK=阻断/WARN=提示
- **Why:** Hermes self-evolution 的核心不是"会自己变强"，而是"安全地变强"——候选→评测→门控→人审

**P3: Ephemeral Injection 概念**
- 铁律 G 新增 G16 (Ephemeral Injection) + G17 (主动压缩脚本)
- 消息三级分类: PERSISTENT > TOOL_RESULT > EPHEMERAL
- **Why:** Hermes 的 prompt_builder 把 memory/plugin context 只注入 API 调用的临时消息，永不持久化。这保护了 prompt cache prefix

**P4: 跨报告分析搜索**
- 新增 `scripts/search_past_analysis.sh` — 支持关键词+ticker+范围搜索
- 比 FTS5 轻量但解决 80% 需求
- **Why:** Hermes 的 SessionDB/FTS5 实现了跨会话搜索。我们不需要 SQLite，grep 足够

### 决定不借鉴的 (及原因)

- **DSPy/GEPA 自动优化**: 过度工程化，我们的改进来自报告 autopsy
- **自动 skill 创建**: 质量不可控，我们的 skill 是人工设计+验证
- **用户建模 (Honcho)**: 投研 agent 需要"了解公司"不是"了解用户"
- **Import-time 工具自注册**: MCP 协议已解决工具发现
- **多代理架构**: Hermes 自己也承认还是单 agent + throwaway child agents

### How to apply

- Phase 完成时: `phase_complete.sh` 自动调用 `context_compress.sh`
- 框架修改前: 手动 `bash scripts/evolution_gate.sh`
- 搜索历史分析: `bash scripts/search_past_analysis.sh "关键词"`
- Context 压力大时: 先 `context_compress.sh` 生成摘要，再 `/compact`
