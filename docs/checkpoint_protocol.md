# 自动检查点协议 v1.0

> **目的**: Context耗尽后，新会话只需一句话恢复：`"读取 reports/{TICKER}/data/checkpoint.yaml 继续"`
> **适用**: Tier 3 Deep-Dive 所有Phase

---

## checkpoint.yaml Schema

```yaml
schema_version: 1
ticker: COST
industry: consumer
worktree: 消费品
timestamp: "2026-02-07T14:32:00+08:00"
phase_current: 3
phase_status: in_progress  # pending | in_progress | completed
phases_completed: [0, 0.5, 1, 2]
phases_pending: [3.5, 4, 5]
current_phase:
  agents_dispatched: 5
  agents_completed: 3
  agents_pending: ["Agent_D", "Agent_E"]
  sections_done: ["护城河", "五引擎-周期", "五引擎-股权"]
  sections_pending: ["聪明钱", "预测市场"]
chars_accumulated: 68500
chars_target: 110500
key_data:
  stock_price: "$1,001.16"
  pe: 53.42
  sotp: "$1,044"
  cq_count: 7
files:
  shared_context: "reports/COST/data/shared_context.md"
  phase_reports:
    - "reports/COST/COST_Phase1_v21_2026-02-07.md"
    - "reports/COST/COST_Phase2_v21_2026-02-07.md"
next_action: "Dispatch剩余Phase 3 agents: 聪明钱+预测市场"
resume_prompt: "继续COST Phase 3。读checkpoint.yaml恢复状态。"
```

---

## 触发时机

| 时机 | 位置 | 说明 |
|------|------|------|
| Phase完成后 | Step 12-13之间(git commit前) | 记录Phase完成状态 |
| SubAgent批次完成后 | Step 10之后 | 记录中间进度 |
| 主动写入 | 检测到可能context不足时 | 预防性保存 |

---

## 恢复流程

新会话收到恢复指令时:

```
Step 1: 读取 reports/{TICKER}/data/checkpoint.yaml
Step 2: 验证 phase_status — completed则进入下一Phase，in_progress则恢复当前Phase
Step 3: 读取 files.shared_context 获取研究上下文
Step 4: 检查 current_phase.agents_pending — 有未完成Agent则重新dispatch
Step 5: 向用户确认恢复状态，继续执行
```

---

## 写入规范

- **路径**: `reports/{TICKER}/data/checkpoint.yaml`
- **格式**: 严格YAML，所有字符串值用引号
- **更新**: 每次写入覆盖(非追加)，保留最新状态
- **与STATUS.md关系**: checkpoint.yaml是跨会话恢复用，STATUS.md是会话内监控用
