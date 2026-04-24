---
name: gstack 借鉴升级 v22.5
description: 实施 1 项 (learnings 自动注入), 拒绝 4 项 (基于对 gstack 结构的虚像)
type: project
status: active
confidence: 0.90
last_validated_at: "2026-04-16"
---

## gstack 借鉴升级 (2026-04-16)

### 关键代码发现: handoff 文档对 gstack 的描述与实际不符

gstack 的实际代码有 4 个重要差距:

| handoff 文档声称 | gstack 实态 |
|---|---|
| "role-based workflow staging (thinking/planning/building/reviewing/testing/shipping/reflecting)" | **没有强制流程** — 是 ~50 个平铺的 slash commands, 用户按需调用 |
| "search-before-build 纪律" | **只是 ETHOS.md 哲学段落** — 没有 hook, 没有 gate, 只有每次 skill 调用前自动注入 3 条 learnings |
| "多层验证 fast/audit/periodic" | **只对 docs 测试有三层**, 产品代码只有 `/ship` 内联 + `/qa` 临时 + `/retro` 周复盘 |
| "durable runtime / session continuity" | **主要靠用户手动调 `/checkpoint`** (38KB SKILL.md) + 本地 JSONL |

### 实施的 1 项 — G1: Learnings 自动注入

**gstack 做法**:
- `gen-skill-docs.ts` 在生成每个 SKILL.md 时自动注入 preamble block
- preamble 执行 `gstack-learnings-search --limit 3`, 自动 retrieve 最相关的 3 条
- 存储: `~/.gstack/projects/{SLUG}/learnings.jsonl`

**我们的实现**:
- 新脚本 `scripts/phase_context_inject.sh` — 按 ticker/industry/关键词评分
- 评分规则: ticker 直接命中(+3) / industry 匹配(+2) / 关键词匹配(+1/次) × confidence × status=active 过滤
- 集成点:
  1. `tier3_launch.sh` Step 2.5 (Phase 启动时)
  2. `phase_complete.sh` Step 4.6 (Phase 完成后为下个 Phase 准备)
- 产出: `reports/{TICKER}/data/phase_context_preamble.md`

**测试结果**:
- MSFT → PAT-02 (LLM不能做算术) — ticker=MSFT直接命中
- LITE → PAT-08 (黑箱维度强行闭合) — ticker=LITE直接命中
- AMAT → PAT-03 (方法伪独立) — ticker=AMAT直接命中
- ADBE → PAT-04 (叙事方向锁定) — ticker=ADBE直接命中
- NONEXISTENT → exit 1 (无匹配, 非错误)

**每次通常只匹配 1 条**, 这是正确的 — 说明我们的 8 个 pattern 真的是"可迁移"的, 不是行业专属标签。gstack 的 3 条是上限不是下限。

### 拒绝的 4 项 (及原因)

**Action 1: Frame→Research→Challenge→Decide→Archive 5 阶段**
→ 我们已有 Phase -1/0/0.5/0.75/1/2/3/4/4.5/5 更细结构, 再加"阶段路由"是假问题
→ handoff 文档把 gstack 50 个 commands 解读为"5 阶段", 这是**过度归纳**

**Action 2: 强化状态恢复顺序**
→ CLAUDE.md 已有 "继续/恢复: ①确认位置 → ②读 checkpoint → ③ git log → ④读 handoff"
→ 已经比 gstack 的 `/checkpoint` 手动调用更自动化

**Action 3: Challenge 从 Research 分离**
→ 已有 Phase 4 red-team 独立阶段 + `red-team-suite` skill
→ 分离早已存在

**Action 4: 分层验证 fast/audit/periodic**
→ 已有 `fast_gate` + `mid_assembly_check` + `autopsy` = 三层
→ **比 gstack 强** — gstack 自己的产品验证只有 `/ship` 内联 + 临时

### 关键判断

gstack 的核心价值在**浏览器 QA 自动化**(与我们无关), 在"研究 agent"方向上它没有比我们更强的东西。

唯一真实可代码化的价值 = preamble 自动注入机制。其他 handoff 建议都是**基于对 gstack 的部分解读 + 我们想做的事的混合**。

### 成本

- 新脚本 1 个: `phase_context_inject.sh` (~200 行 bash + 内嵌 python)
- 修改 2 个: `tier3_launch.sh` 加 Step 2.5, `phase_complete.sh` 加 Step 4.6
- 文档 2 个: CLAUDE.md + 本 memory

零新目录, 零 Python 模块, 失败不阻断主流程。

### How to apply

自动触发 (无需手动):
```bash
# Phase 启动时 — tier3_launch 内部自动调用
bash scripts/tier3_launch.sh TICKER INDUSTRY

# Phase 完成时 — phase_complete 内部自动调用, 为下个 Phase 生成 preamble
bash scripts/phase_complete.sh TICKER PHASE REPORT MIN_CHARS
```

手动触发 (分析外场景):
```bash
bash scripts/phase_context_inject.sh TICKER --industry semiconductor --phase 2 --limit 3
```

AI 在下个 Phase 启动时, 应先 Read `reports/{TICKER}/data/phase_context_preamble.md`, 在推理中参考这 1-3 条教训。
