# Anthropic Harness最新实践 → 投资研究Agent升级路径

> **来源**: 2026-03-24 Harness Design文章 + Long-Running Agent Harness + Building Effective Agents + Claude Code官方文档(subagents/hooks/memory)
> **评估日期**: 2026-03-30
> **目的**: 从Anthropic最新工程实践中提取可直接落地到投资研究Agent的升级

---

## 一、Anthropic说了什么 → 对我们意味着什么

### 1. "做事的人和评判的人必须分开" — 最重要的启发

**Anthropic原文核心**: 让独立evaluator变得更挑剔，远比让generator学会严厉批评自己更可行。模型对自己的产出有系统性过度乐观偏差。

**对我们的意义**: 我们的红队套件(red-team-suite)和deep-reflection都是让"做分析的agent"来自我批判——这正是Anthropic说效果有限的做法。需要一个**独立的skeptic subagent**，它不看分析过程只看结论，专门找漏洞。

**落地方案**:
```
创建: .claude/agents/skeptic.md
角色: 独立质疑者(不参与分析,只审计结论)
tools: Read, Grep, Glob (只读,不写)
model: inherit
触发: Phase 5组装前自动,或作为Stop hook

它不做:
  × 扩展分析
  × 补充数据
  × 改善表达

它只做:
  ✓ 每个强结论是否有充分证据支撑?
  ✓ 有没有把假设当成事实表述?
  ✓ 有没有忽略反面证据?
  ✓ 置信度是否与证据强度匹配?
  ✓ "不知道"的东西有没有被叙事补平?
```

### 2. "Artifact-first，不是Memory-first" — 跨session最关键

**Anthropic原文**: 要让新session在全新上下文里迅速接管工作，必须有能承载状态和下一步的handoff artifact。不能只靠对话记忆。

**对我们的意义**: 我们的expectation_gap_card.yaml已经是artifact-first设计(结构化YAML可跨session读取)。但缺少的是:
- **question_tree**(分析要回答的问题树,而非散落在对话中)
- **evidence_registry**(每条证据的来源/强度/绑定判断,而非写在散文中)
- **unknown_registry**(显式列出不知道的东西,而非被叙事补平)

**落地方案**:
```
每次Tier 2+分析,必须生成以下artifact到 reports/{TICKER}/data/:
  question_tree.md    — 本次分析要回答的5-12个问题+哪些已回答/未回答
  evidence_registry.md — 每条关键证据: 来源/强度/支持哪个判断/失效条件
  unknowns.md         — 当前不知道的+知道需要什么来填补+预期何时可得

这些artifact的价值:
  - 新session读取后立即知道"上次做到哪了/还差什么"
  - skeptic subagent可以直接审计evidence_registry
  - unknowns.md防止叙事补平
```

### 3. "短Constitution + 按需模块加载" — Context工程

**Anthropic原文**: 不要把所有信息和工具一次性塞进上下文。保留轻量引用(文件路径/链接)，运行时按需取回。把token从~150K降到~2K。

**对我们的意义**: 我们的CLAUDE.md(8.9K)+10个铁律文件+23个skill+行业CLAUDE.md = 首轮context消耗巨大。应该:
- CLAUDE.md保持<5K(核心宪法)
- 铁律/skill/行业框架全部按需加载(现有设计已部分实现,但可以更激进)
- patterns.yaml不在启动时全量加载,而是Step 0只加载本行业section

**落地方案**:
```
当前: CLAUDE.md加载→10个rules按需→skill按需→但patterns.yaml全量
优化: patterns.yaml拆分为:
  patterns_meta.yaml     — PEP索引(100行,总是加载)
  patterns_saas.yaml     — SaaS行业详情(只SaaS分析时加载)
  patterns_semi.yaml     — 半导体行业详情(只半导体分析时加载)

或者: 保持单文件但Step 0只grep需要的section而非全量读取
```

### 4. "一次做一个feature,不是一口气做完" — Sprint模式

**Anthropic原文**: long-running agent最大失败模式是"一次性做完然后自认为成功"。应该每次只做一个feature,做完写进度,留给下一轮。

**对我们的意义**: 这与我们的Phase架构(Phase 0→1→2→3→4→5)已经对齐——每个Phase就是一个"sprint"。但Phase内部的执行仍然是"一口气写完"模式(铁律7要求连续写到≥50K)。

**潜在冲突**: 铁律7(禁止Phase内中断)vs Anthropic的"一次只做一个"。
**解决**: 不改铁律7(Phase内连续性仍重要)——但在Phase之间增加更强的checkpoint/artifact handoff。当前phase_sentinel已经做了这件事,但可以加入question_tree和evidence_registry的更新。

### 5. Subagent设计 — 直接可用的Claude Code功能

**官方文档核心能力**:
- 每个subagent有独立context+独立system prompt+独立工具权限
- 可以用model字段指定不同模型(haiku做探索,opus做深度分析)
- 可以有persistent memory(跨session积累知识)
- 可以通过hooks在PreToolUse/PostToolUse做gatekeeping
- subagent不能嵌套spawn subagent(防止无限递归)

**对我们最有价值的配置**:
```yaml
# .claude/agents/skeptic.md — 独立质疑者
---
name: skeptic
description: 独立审计分析结论。在Phase完成后或写核心结论前使用。不参与分析过程。
tools: Read, Grep, Glob
model: sonnet
memory: project
---

你是独立的分析审计者。你的角色是找漏洞,不是改善。

检查清单:
1. 每个强结论(gap_type/action)是否有fact级证据支撑?
2. 有没有假设(assumption)被用确定性语气表述?
3. 有没有忽略的反面证据或替代解释?
4. unknowns.md中的未知项有没有被叙事补平?
5. 置信度分层(fact/inference/assumption/unknown)是否与表述力度匹配?
6. 动作绑定(action_binding)的失效条件是否真的可验证?

输出格式:
  PASS: [哪些判断通过审计]
  FLAG: [哪些判断需要降级表述]
  FAIL: [哪些结论缺乏证据支撑]
  UNKNOWN_LEAK: [哪些"不知道"被叙事补平了]
```

### 6. Hooks — 质量门控自动化

**官方文档关键能力**:
- PreToolUse: 写文件前拦截检查
- PostToolUse: 写完后验证
- Stop: agent完成时检查
- agent类型的hook可以读文件、检查条件

**对我们最有价值的hook**:
```json
// .claude/settings.local.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "审计刚完成的分析。读取最近写入的expectation_gap_card.yaml,检查: (1)confidence中的assumption_judgments是否有用确定性语气表述的 (2)action_binding是否已填写 (3)unknown_items是否为空(应该有至少1个未知项)",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

---

## 二、升级优先级排序

| 优先级 | 升级项 | 工程量 | 预期impact | 状态 |
|:---:|--------|:-----:|:---------:|:---:|
| **P0** | 创建skeptic subagent | 小(1个md文件) | 高(独立审计>自我批判) | 待实施 |
| **P0** | 3个artifact文件(question_tree/evidence_registry/unknowns) | 中(模板+流程) | 高(跨session+审计基础) | 待实施 |
| **P1** | Stop hook(自动审计) | 小(settings.json) | 中(自动拦截低质输出) | 待实施 |
| **P1** | patterns.yaml拆分或按需加载 | 小(重构) | 中(context节省) | 待实施 |
| **P2** | skill按model分级(haiku探索/sonnet分析) | 小(frontmatter) | 低-中(成本优化) | 待评估 |
| **P2** | Phase间artifact handoff强化 | 中(流程调整) | 中(跨session稳定性) | 待评估 |

---

## 三、不应该做的(Anthropic的反面教训)

1. **不做**: 把所有框架塞进一个巨大的system prompt
   **原因**: Anthropic明确说大context→模型钝化+过早收敛
   **我们的现状**: 还好(CLAUDE.md 8.9K+按需加载)但应该更激进地压缩

2. **不做**: 让主agent自我批判替代独立evaluator
   **原因**: Anthropic数据表明自我批判的上限远低于独立评判
   **我们的现状**: red-team-suite和deep-reflection都是"同一个agent换个角度看"→需要真正独立的skeptic

3. **不做**: 依赖对话记忆跨session
   **原因**: context compaction丢失细节是必然的
   **我们的现状**: 已有checkpoint.yaml和YAML卡片(较好)，但缺question_tree/evidence_registry/unknowns

4. **不做**: 一口气给agent太多工具
   **原因**: 工具太多→模型困惑→选错工具的概率上升
   **我们的现状**: MCP工具+内置工具总量较多，但skill按需加载已缓解

---

*Anthropic Harness洞见评估 v1.0 — 2026-03-30*
*核心结论: 最该做的3件事是 (1)独立skeptic subagent (2)artifact-first三文件 (3)Stop hook自动审计*
