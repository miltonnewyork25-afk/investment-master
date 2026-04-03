# 会话规范与自动化 v22.1

## 会话规范

**首条消息**: `pwd` + `git branch --show-current`, 报告当前位置
**继续/恢复**: ①确认位置 → ②读checkpoint.yaml → ③git log → ④**读handoff note** → 恢复执行
**Worktree导航**: 直接cd到对应路径, 确认位置。**NEVER**让用户手动cd
**Commit前**: `git branch --show-current`确认分支。worktree→worktree分支 | 最终报告→main

## 长程研究Harness (详见`docs/long_range_harness.md`)

**Session 0**: 首次研究禁止直接输出判断, 只做: ①研究问题清单 ②State Board ③候选角度 ④完成标准
**Get Bearings**: 每轮开头 → 读handoff → 读state → 读questions → 验证主线 → 选行动
**循环推进**: 广度先扫描 | 深挖一次只推一个问题 | 连续两轮重复→切换方向
**Handoff Note**: 每轮结尾必须输出(完成+新机制+主线更新+Kill Switch+下轮优先)

## Phase自动化 + 纵深防御

**单一入口**: `bash scripts/tier3_launch.sh {TICKER} {INDUSTRY}`
**启动门控**: `bash scripts/preflight_gate.sh {TICKER} {INDUSTRY}` → 必须CLEARED
**一键Phase**: `bash scripts/phase_complete.sh {TICKER} {PHASE} {REPORT} {MIN_CHARS}` (含sentinel)
**质量门控**: `bash tests/quality_gate_complete.sh` — 最终9项硬门控

### 纵深防御 (四层, 单点失败不致命)
```
Layer 0: tier3_launch.sh → Phase -1 + 复杂度估计
Layer 1: preflight_gate.sh → Phase 0前硬阻断
Layer 2: phase_sentinel.sh → 每Phase后重验前序产出
Layer 3: quality_gate_complete.sh → 最终质量门控
```

## EVO生命周期 (借鉴Claude Code行为缓解管道)

**发现**: 报告验尸 → 记录(来源/量化指标/解除条件)
**引入**: evolution_log.yaml, 灰度(先在1-2份报告验证)
**验证**: A/B对比(有/无EVO的质量差异)
**推广/移除**: 有效→写入铁律 | 无效/过期→移除
**刹车**: 话题浓度上限(2×均值) | 进化衰减(6个月) | 正面EVO强制 | 季度审计

## 渐进式升级协议

分析失败时: ①诊断(读错误/查假设) → ②调整(聚焦修复) → ③求助(标注请求反馈)
**NEVER**盲目重试相同方法。**NEVER**一次失败就放弃可行路径。