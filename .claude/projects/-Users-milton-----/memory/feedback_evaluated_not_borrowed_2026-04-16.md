---
name: 评估但未借鉴的项目 (GPT-R + ODR)
description: 两个评估后决定不实施任何借鉴的项目, 记录理由避免未来重复评估
type: project
status: active
confidence: 0.90
last_validated_at: "2026-04-16"
---

## 评估但未借鉴: GPT Researcher + Open Deep Research

两个项目都读过实际代码, 但决定**不实施任何借鉴**。记录理由:

### 一、GPT Researcher (assafelovic/gpt-researcher)

**代码实态** (path 已迁移, handoff doc 部分过时):
- `master/` 已废除, 代码在 `gpt_researcher/{agent.py, actions/, skills/, retrievers/}`
- Planner = 1 个 LLM 调用 (`choose_agent` + `plan_research_outline`)
- Sub-query expansion: `max_iterations=3` 默认
- 15 个 retriever (arxiv/bing/exa/tavily 等), duck-typed, parallel-union
- Multi-agent: 7 个 agent (ChiefEditor/Researcher/Editor/Reviewer/Reviser/Writer/Publisher)
- Reviewer-Reviser loop: **无 iteration cap**, 靠 prompt 诱导 LLM 第 2 轮倾向 return None

**5 项建议借鉴的判断**:

| 建议 | GPT-R 实态 | 我们现状 | 不借理由 |
|---|---|---|---|
| Planner + Execution split | 2 LLM 调用 | Phase -1/0/0.5/0.75 四层 + thesis_crystallization | **我们深 10 倍** |
| Sub-query expansion | 3 并行 sub-queries, 宽度导向 | rule-finding-deepener 四层追问, 深度导向 | 方向不同, 投研核心是深度 |
| Source-tracked summarization | `visited_urls` set + concat | DM 锚点系统 (line number + 文件路径) | **我们完胜** |
| Retriever abstraction | 15 个 retriever | MCP 协议统一 | 已是更好实现 |
| Reviewer/Reviser loop | 只查 guidelines, 无迭代上限 | red-team-suite 7 问 + investment-committee 5 大师 + 9 门控 | **我们完胜** |

**结论**: GPT-R 偏 breadth (15 retrievers, 多格式输出), 工程广度好, **研究方法论深度弱于我们**。无独特可代码化机制。

### 二、Open Deep Research (langchain-ai/open_deep_research)

**代码实态** (handoff doc 基于老代码):
- **当前 main 不用 section-grading + retry 模式** — 这个 handoff 建议读的 `src/open_deep_research/graph.py` 在 main 已不存在
- 老代码移到 `/src/legacy/graph.py` 保留
- 新架构是 `/src/open_deep_research/deep_researcher.py` (718 行) — supervisor-researcher pattern
- 判断质量**完全移出 graph**, 放到 LangSmith 外部 6 个 evaluators

**5 项建议借鉴的判断**:

| 建议 | ODR 实态 | 我们现状 | 不借理由 |
|---|---|---|---|
| Model role separation | 4 roles (summarization/research/compression/final_report) | Claude Opus 4.6 单模型 + 1M context | Claude 环境不同, 无合适拆分 |
| Graph-based orchestration | LangGraph StateGraph 3-level | Phase 0-5 线性 + 并行 Agent | **过度工程** — handoff 自己也说不要 rewrite around LangGraph |
| Section-level grading + retry | **新架构已抛弃** | mid_assembly + quality_gate + autopsy 已分层 | **ODR 自己都不用了, 为什么学?** |
| Configuration-first | 14 字段 + UI metadata | research_modes/guardrails/registry yaml | 精神已实践, UI metadata 对 agent 无价值 |
| Evaluation-first | 6 LLM-as-judge + LangSmith | 9 门控 + 统计 eval + autopsy | 已有 80% |

**结论**: ODR 架构演化本身有价值的信号, 但**无具体代码借鉴点**。

### 三、两个共同的模式识别

两个项目都是:
1. **Handoff 文档基于理想化描述, 代码实态有偏差** (GPT-R path 迁移; ODR 架构演化)
2. **偏 execution/breadth, 不是 research methodology 突破**
3. **LangChain 生态的"框架化"味道重**, 对我们这种"bash + yaml + Claude Code"架构不直接适用

### 四、一个有价值的元洞察

**ODR 从 in-graph grading 迁移到外部 evaluators 的决策**:
```
旧: Plan → Section → LLM grade → retry (in-graph, LLM judge LLM)
新: Clarify → Supervisor → Researchers → Report + 判断完全外置
```

**为什么? 最可能的原因: in-graph LLM judge 有自我合谋风险**
- 同一个模型族的 judge 倾向认可 similar output
- 外部 benchmark 能力 + 避免内循环偏差

**对我们的反思** (不是实施项, 是思考):
- `red-team-suite` 7 问是 Claude Opus 自己批自己
- `investment-committee` 5 大师也是 Opus 扮演不同角色
- 存在**自我合谋风险**, 但完全外置需要 LangSmith 级基础设施
- 我们的 `skeptic agent` (独立审计 agent) 已经部分缓解, 但不是完全外置

**结论**: 保持警觉, 但不因此重构。未来若有明显自我合谋证据 (例如 red-team 后评级反而上调), 再考虑外置验证。

### 五、借鉴总览 (7 次评估)

| 项目 | 独特机制 | 借鉴? |
|---|---|---|
| Hermes | 压缩五步算法 | ✓ (P0-P4) |
| MiroFlow | 对话回滚 + 重复检测 | ✓ (M1-M4) |
| LLM Wiki v2 | Supersession | ✓ (W1-W4) |
| gstack | Preamble 注入 | ✓ (G1) |
| STORM | Unused evidence detection | ✓ (M1) |
| **GPT Researcher** | 无独特机制 | **✗** |
| **Open Deep Research** | 已有或不适用 | **✗** |

**成功率 5/7** — 这个比例健康, 说明"反过度工程"原则在起作用, 不是每次都要借鉴。

### How to apply

**未来评估新项目时的原则** (从 7 次积累):

1. **读实际代码, 不只读 README / handoff** — 3 个项目的 handoff 与代码有差距
2. **先问"是否有独特可代码化机制"** — 不是每个项目都有
3. **严格反过度工程** — 宁可 5/7 借鉴率, 不要 7/7 全借
4. **识别"breadth vs depth" 定位** — breadth-focused 项目 (GPT-R) 对我们深度导向系统价值低
5. **注意 handoff doc 的时效性** — 开源项目架构演化快 (ODR 显式抛弃老模式)
