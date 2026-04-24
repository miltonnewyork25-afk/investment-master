# v22.3-v22.8 升级速查手册

> 用途: 在各 worktree 调用本轮新增工具的快速参考
> 日期: 2026-04-16
> 来源: 5 个开源项目借鉴 + COHR audit + 过程无痕化

---

## 一、按使用场景速查

### 场景 1: 启动新分析 (Tier 3 Phase -1/0)

```bash
# tier3_launch.sh 已自动调用, 会:
# - Step 2.5: 自动注入最相关的 3 条历史教训
bash scripts/tier3_launch.sh TICKER INDUSTRY

# 手动查看注入了什么:
cat reports/TICKER/data/phase_context_preamble.md
```

### 场景 2: Phase 中期 — 检查分析方向

```bash
# 检测偏轨/重复搜索/论点循环/产出不足
bash scripts/research_rollback.sh TICKER PHASE

# 搜索历史报告中的相关分析
bash scripts/search_past_analysis.sh "定价权" --ticker KLAC
bash scripts/search_past_analysis.sh "NRR" --staging --limit 10

# audit 模式 (含被 supersede/invalidate 的旧内容)
bash scripts/search_past_analysis.sh "thesis" --audit-mode
```

### 场景 3: Phase 完成时

```bash
# phase_complete.sh 已自动调用, 会:
# - Step 4.5:  生成工具执行摘要 (压缩后可恢复"做过什么")
# - Step 4.55: Phase 4/4.5 → 未引用证据检测 (给 Phase 5 的盲点清单)
# - Step 4.6:  为下个 Phase 生成 learnings preamble
bash scripts/phase_complete.sh TICKER PHASE REPORT MIN_CHARS

# 手动查看产出:
cat reports/TICKER/data/tool_execution_summary.md    # 工具摘要
cat reports/TICKER/data/unused_evidence_report.md    # 未引用证据
cat reports/TICKER/data/phase_context_preamble.md    # 下 Phase 教训
```

### 场景 4: Phase 5 组装前 — 过程无痕化

```bash
# Phase 5 启动前必答三问 (第零律 2 "过程无痕化"):
# Q1: 读者不知道 Phase/Agent/staging, 能看懂吗?
# Q2: 有无 "谁做了什么" 的工程化视角?
# Q3: 能直接放 Bloomberg 研报吗?

# 5 家族禁止清单:
# Agent 家族: Agent findings / 子 Agent / 并行 Agent / P[0-9] Agent
# Phase 家族: Phase X 完成 / P1-A / P4 回流 / P4.5 结晶
# 工作流家族: staging 文件 / handoff note / checkpoint.yaml
# LLM 家族:   LLM 调用 / prompt 注入 / context window
# Skill 家族: 调用 xxx-skill / xxx-skill 产出
```

### 场景 5: Phase 5 写作中 — 中场检测

```bash
# 每写满 50K/100K/150K/200K 必须调用:
bash scripts/mid_assembly_check.sh reports/TICKER/TICKER_complete.md

# v22.8 新增硬指标: Process 无痕化 (>5处 = BLOCK)
# 检测 5 家族工程化词汇, 当场修复才能继续写
```

### 场景 6: Complete 提交前 — 最终门控

```bash
# 包含 CG23 v22.8 (5 家族 process 残留) + CG8/CG9 扩展 (识别独立 DM 锚点)
bash tests/quality_gate_complete.sh reports/TICKER/TICKER_complete.md
```

### 场景 7: Context 压力大时

```bash
# 先生成工具摘要 (保留信息), 再 /compact (释放空间)
bash scripts/context_compress.sh TICKER
# 然后在 Claude Code 中:
# /compact 重点保留: ①核心矛盾 ②关键结论 ③Kill Switch ④下一步
```

### 场景 8: 修改框架/规则前

```bash
# 必须通过 5 道门控 (Size/Growth/Structure/Duplicate/Count)
bash scripts/evolution_gate.sh

# 当前基线: 0 BLOCK / 16 WARN
# BLOCK = 不能提交; WARN = 建议修复
```

### 场景 9: 跨报告质量趋势

```bash
# 全部 73 份报告统计
bash scripts/quality_statistical_eval.sh

# 最近 20 份
bash scripts/quality_statistical_eval.sh --recent 20

# 输出: DM密度/因果密度/字符数/Mermaid 的 mean/std/min/max/trend
```

### 场景 10: 记忆管理 (supersession)

```bash
# 当旧 thesis 被新 thesis 取代:
bash scripts/memory_lifecycle.sh supersede OLD_FILE NEW_FILE

# 当某个假设被证伪:
bash scripts/memory_lifecycle.sh invalidate FILE "DM-XXX-001 证据"

# 归档 (不删除, 降优先级):
bash scripts/memory_lifecycle.sh archive FILE

# 查看某个 pattern 的状态:
bash scripts/memory_lifecycle.sh status PAT-03

# 列出所有退休记忆:
bash scripts/memory_lifecycle.sh list-retired
```

---

## 二、8 个新脚本速查卡

| 脚本 | 来源 | 一句话 | 调用时机 |
|------|------|--------|---------|
| `context_compress.sh` | Hermes | 生成工具执行摘要, 为 /compact 保留信息 | Phase 完成时自动 / context 压力时手动 |
| `evolution_gate.sh` | Hermes | 框架修改前 5 道门控 | 改规则/skill 前手动 |
| `search_past_analysis.sh` | Hermes+Wiki | 跨报告关键词搜索, default/audit 双模式 | 随时手动 |
| `research_rollback.sh` | MiroFlow | 偏轨/重复/循环/低产出 4 信号检测 | Phase 中期手动 |
| `quality_statistical_eval.sh` | MiroFlow | 73 份报告 mean/std/min/max/trend | 定期体检 |
| `memory_lifecycle.sh` | LLM Wiki v2 | supersede/invalidate/archive 状态转换 | thesis 更新时手动 |
| `phase_context_inject.sh` | gstack | 按 ticker+industry 注入最相关 3 条教训 | Phase 启动时自动 |
| `unused_evidence_detector.sh` | STORM | staging DM vs final 差集 = 盲点清单 | Phase 4 完成时自动 |

---

## 三、自动触发链 (无需手动)

### tier3_launch.sh 内部调用链
```
tier3_launch.sh TICKER INDUSTRY
  → Step 2.5: phase_context_inject.sh TICKER --industry INDUSTRY --phase 0
  → 产出: data/phase_context_preamble.md
```

### phase_complete.sh 内部调用链
```
phase_complete.sh TICKER PHASE REPORT MIN_CHARS
  → Step 4.5:  context_compress.sh TICKER
  → Step 4.55: unused_evidence_detector.sh TICKER (仅 Phase 4/4.5)
  → Step 4.6:  phase_context_inject.sh TICKER --phase NEXT_PHASE
  → 产出: data/tool_execution_summary.md
           data/unused_evidence_report.md (Phase 4/4.5)
           data/phase_context_preamble.md
```

### mid_assembly_check.sh 检测项 (Phase 5 每 50K)
```
硬指标 (BLOCK):
  1. voice "本报告/笔者" = 0
  2. 审美词 ≤ 5
  3. 范畴重分配 ≥ 3
  4. Process 无痕化 ≤ 5 (v22.8 新增, 5 家族)

软指标 (WARN):
  1. hedging 密度 ≤ 1/万字
  2. 箭头链 ≤ 1/30K
  3. DM 密度 ≥ 1.0/千字
  4. Mermaid ≥ 1/30K
```

### quality_gate_complete.sh 关键升级项
```
CG8:  v22.7 扩展 — 独立 DM 方括号锚点 [DM-XXX-001] 也算有效标注
CG9:  v22.7 扩展 — 独立 DM 算入硬数据占比
CG23: v22.8 升级 — 5 家族 process 残留检测 (Agent/Phase/工作流/LLM/Skill)
```

---

## 四、新增配置文件

### knowledge/research_modes.yaml — 三档分析模式
```
baseline:     初筛, 事实补全 (Phase -1/-0.5)
deep_audit:   核心章节, 竞争判断 (Phase 1-3)
high_stakes:  最终判断, Thesis 反转 (Phase 4/4.5)
  → 强制: 双路径推理 + 证据重检 + 反证优先 + 更高停止门槛 + 审计输出
```

### knowledge/evolution_guardrails.yaml — 进化门控阈值
```
CLAUDE.md:           ≤ 22KB / ≤ 280 行
pattern_registry:    ≤ 8KB / ≤ 15 patterns
SKILL.md (每个):     ≤ 12KB
rule-*.md (每个):    ≤ 20KB
铁律总数:            ≤ 20
单次修改增长:        ≤ 20%
```

### knowledge/pattern_registry.yaml — v1.1 lifecycle 字段
```yaml
每个 pattern 新增:
  status: active | superseded | invalidated | archived
  confidence: 0.0-1.0
  last_validated_at: "YYYY-MM-DD"
```

---

## 五、关键规则升级

### 第零律 2: 过程无痕化 (v22.8, rule-00-compliance.md)
```
Phase 5 组装自检三问:
1. 读者不知道 Phase/Agent/staging 能看懂吗?
2. 有无 "谁做了什么" 的工程化视角?
3. 能直接放 Bloomberg 研报吗?
```

### 铁律 G16: Ephemeral Injection (v22.3, rule-G-context.md)
```
消息三级分类:
  PERSISTENT: 用户指令 + 关键结论 → 最后压缩
  TOOL_RESULT: MCP/Bash 返回 → 裁剪为一行摘要
  EPHEMERAL:  Skill 全文 / 中间计算 → 最先压缩
```

### 铁律 G17: 主动压缩 (v22.3, rule-G-context.md)
```
先 context_compress.sh 生成摘要 → 再 /compact 释放空间
顺序不能反 (先 compact 会丢失工具结果)
```

### 铁律 J-3b: Phase 5 自检三问 (v22.8, rule-J-assembly.md)
```
Phase 5 handoff 必须含 phase5_process_erasure_check:
  q1_reader_ignorance_test
  q2_engineering_perspective_check
  q3_bloomberg_test
  process_language_families_to_avoid (5 家族)
```

---

## 六、版本历史

| 版本 | 来源 | 核心升级 |
|------|------|---------|
| **v22.3** | Hermes Agent | 3 脚本: context_compress + evolution_gate + search_past_analysis |
| **v22.3** | MiroFlow | 2 脚本: research_rollback + quality_statistical_eval |
| **v22.4** | LLM Wiki v2 | 1 脚本: memory_lifecycle + pattern_registry lifecycle 字段 |
| **v22.5** | gstack | 1 脚本: phase_context_inject (learnings 自动注入) |
| **v22.6** | STORM | 1 脚本: unused_evidence_detector (盲点检测) |
| **v22.7** | COHR audit | CG8/CG9 识别独立 DM + CG23 枚举 process 残留 |
| **v22.8** | 用户洞察 | 第零律 2 过程无痕化 + CG23 5 家族 + mid_assembly BLOCK |

**统计**: 8 新脚本 (2035 行) + 3 配置 (210 行) + 3 规则升级 + 2 门控升级 = **0 新目录, 0 Python 模块**
