# 会话规范与自动化

## 会话规范

**每个会话第一条消息**: 无论用户说什么，先执行 `pwd` + `git branch --show-current`，在回复开头报告当前位置。不问用户，直接做。

**继续/恢复**: 用户说"继续"时 → ①`git branch --show-current` + `pwd` 确认位置 → ②读 `reports/{TICKER}/data/checkpoint.yaml` → ③`git log --oneline -5` → 立即恢复执行，不问澄清问题

**Worktree导航**: 用户说"进入XX"/"切换到XX" → 直接 `cd` 到对应worktree路径 → `pwd` + `git branch --show-current` 确认。**禁止**: 让用户手动cd/开新session/只打印路径不切换

**Commit前确认分支**: `git add` 前必须 `git branch --show-current` 确认在正确分支。worktree工作→worktree分支commit | 最终报告→main commit

## Phase自动化 + 纵深防御

**单一入口**: `bash scripts/tier3_launch.sh {TICKER} {INDUSTRY}` — **Tier 3分析的第一个命令，替代手动Phase -1**
**启动门控**: `bash scripts/preflight_gate.sh {TICKER} {INDUSTRY}` — **Phase 0前必须CLEARED，有FAIL则阻断**
**一键Phase**: `bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}` — **内含sentinel自动检查**
**质量哨兵**: `bash scripts/phase_sentinel.sh {TICKER} {PHASE} [TARGET]` — **phase_complete自动调用，无需手动记住**

### 纵深防御架构 (Defense-in-Depth)

```
用户说"深度调研XX"
    ↓
Layer 0: tier3_launch.sh — 自动执行Phase -1 + 复杂度估计 + launch_brief
    ↓
Layer 1: preflight_gate.sh — Phase 0前硬阻断 (lit_recon缺失?)
    ↓
Layer 2: phase_sentinel.sh — 每个Phase后重新验证ALL前序产出
    ↓ (自动嵌入phase_complete.sh, AI无需记住)
Layer 3: quality_gate_complete.sh — 最终质量门控
```

## 使用工具规范

**禁止使用Bash的场景**:
- To read files use Read instead of cat, head, tail, or sed
- To edit files use Edit instead of sed or awk
- To create files use Write instead of cat with heredoc or echo redirection
- To search for files use Glob instead of find or ls
- To search the content of files, use Grep instead of grep or rg

**Agent工具使用原则**:
- 简单搜索用Glob/Grep直接操作
- 复杂探索用Agent+Explore subagent
- 专业分析用对应的investment skills
- 并行独立任务用多个Agent tool calls

## 文档索引（按需加载）

**高频**: `docs/deep_dive_protocol.md`(Tier 3) | `docs/industry/*.md`(行业) | `knowledge/analysis_modules/financial_analysis_framework_v2.md`(财务CPA×ISDD)
**估值**: `docs/optionality_valuation.md`(期权) | `docs/paradigm_research_framework.md`(发现系统)
**质量**: `tests/quality_gate_complete.sh` | `tests/research_scorecard.sh`
**知识**: `knowledge/knowledge_index.yaml` | `scripts/find_relevant_knowledge.sh`