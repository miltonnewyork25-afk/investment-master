# 自动检查点协议 v2.0

> **目的**: Context耗尽后，新会话只需一句话恢复：`"读取 reports/{TICKER}/data/checkpoint.yaml 继续"`
> **适用**: Tier 3 Deep-Dive 所有Phase
> **核心理念**: checkpoint 是指针，不是副本。Phase 报告本身已包含所有详细数据。

---

## checkpoint.yaml v2.0 Schema (~35行)

```yaml
schema_version: "2.0"
ticker: PLTR
company: "Palantir Technologies Inc."
framework_version: v26.0
worktree: 生态科技-new
industry: 生态科技
last_updated: "2026-02-10T14:19:00+08:00"

current_phase: 5
phase_status: completed
phases_completed: [0, 0.5, 1, 2, 3, 3.5, 4, 5]

quick_ref:
  total_chars: 432129
  latest_phase_chars: 75445
  annotations: 113
  annotation_density: "15.0/万"
  hard_data_ratio: "46.9%"
  mermaid_charts: 8

files:
  data_master: "reports/PLTR/data/shared_context.md"
  key_assumptions: "reports/PLTR/data/key_assumptions.md"
  latest_report: "reports/PLTR/PLTR_Phase5_v2.0_2026-02-10.md"

next_action: "Phase 6 反思或新公司"
resume_prompt: "读取 checkpoint.yaml 继续"
```

### v1.0 → v2.0 删除的内容

以下全部可从 Phase 报告本身 / git history 恢复：

| 删除项 | 行数 | 恢复方式 |
|--------|------|---------|
| 每Phase的 metrics/key_findings | ~120行 | 读对应Phase报告 |
| cq_progress 详情 | ~40行 | 读 Phase 报告 CQ 章节 |
| valuation_results 详情 | ~20行 | 读 Phase 2/4 估值章节 |
| hot_patches 详情 | ~10行 | 读 shared_context.md |
| vs_v1 对比 | ~10行 | git diff |
| resume_instructions 长叙述 | ~15行 | 改为一行 prompt |
| v26_enhancements 列表 | ~10行 | 读 Phase 报告 |
| core_questions 全文 | ~20行 | 读 shared_context.md |

**总计省 ~250行 / ~8.8K 字符 per checkpoint**

---

## 自动化：phase_complete.sh

Phase完成时不再手动写YAML，运行一条命令：

```bash
bash scripts/phase_complete.sh PLTR 1 reports/PLTR/PLTR_Phase1_v2.0.md 55000
```

脚本自动完成：
1. Fast Gate → PASS 才继续
2. 从现有 checkpoint 读元数据 + 扫描报告目录构建 phases_completed
3. 生成 v2.0 精简 checkpoint
4. `git add` 报告+checkpoint → `git commit`

**省 ~25K context**（消除手动写 YAML + 多步 tool calls）

---

## 触发时机

| 时机 | 方式 | 说明 |
|------|------|------|
| Phase完成后 | `bash scripts/phase_complete.sh` | 自动生成+提交 |
| 预防性保存 | 手动写简版 checkpoint | 检测到 context 不足时 |

---

## 恢复流程

新会话收到恢复指令时:

```
Step 1: 读取 reports/{TICKER}/data/checkpoint.yaml
Step 2: 验证 phase_status — completed则进入下一Phase，in_progress则恢复
Step 3: 读取 files.data_master 获取研究上下文(DM+CQ+KAL)
Step 4: 如需详细前序发现 → 读对应Phase报告(checkpoint仅存指针)
Step 5: 向用户确认恢复状态，继续执行
```

---

## 写入规范

- **路径**: `reports/{TICKER}/data/checkpoint.yaml`
- **格式**: 严格YAML，字符串值用引号
- **更新**: 每次覆盖，保留最新状态
- **生成**: 优先用 `scripts/phase_complete.sh` 自动生成
