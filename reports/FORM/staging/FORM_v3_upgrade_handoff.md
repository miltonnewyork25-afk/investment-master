# FORM v3 Upgrade Handoff Note

> **日期**: 2026-04-17
> **目标**: FORM_complete_v2.md → v3.md 升级
> **恢复指令**: "继续FORM v3升级，读这个handoff"

---

## 1. 任务概述

用户提供了FORM v2报告的外部审计评估（7个问题）+ 升级brief（5个弱点）+ 详细的新目录/表格/执行摘要框架。目标是从152K升级到200K+的v3版本。

## 2. 已完成

### Task 1 ✅ 建唯一底表
- **产出**: `reports/FORM/data/FORM_master_financials.md`
- **关键发现**:
  - 报告中11处数据不一致（详见底表§9错误清单）
  - **最严重**: F&L FY2025在报告中出现$370M/$346M/$307M/$230M四个不同值，10-K正确值是$369.9M
  - 有一组数字(DRAM $259M/F&L $307M/Systems $219M)是FY2026-27预测值混入FY2025实际值
  - F&L $230M是幽灵数字，不存在于任何年份10-K
  - **GAAP↔non-GAAP gap突变**: Q4'25 gap仅1.7pp，Q1'26指引gap暴增到11pp（GAAP 34% vs non-GAAP 45%）
  - 原因：大额收购无形资产摊销/固定资产FV调整新计入COGS
  - **v2报告遗漏此发现**——以GAAP 44%为第一变量门槛是搭错桥
  - Target Model是$850M ARR（非$1B+），v2多处写错

## 3. 待执行 (Task 2-11)

| Task | 内容 | 状态 | 依赖 |
|------|------|------|------|
| 2 | 用底表校准报告11处数据错误 + 统一概率(7-15%) | pending | Task 1 ✅ |
| 3 | 重写执行摘要(三座桥框架，用户提供了完整草稿) | pending | Task 1 ✅ |
| 4 | 按新11章目录重排结构 | pending | Task 1+3 |
| 5 | 新增GAAP↔non-GAAP桥模块 | pending | — |
| 6 | Technoprobe 30%证据降级[B级] + Owner PE三套敏感性 | pending | — |
| 7 | 新增4模块(工厂经济学/竞争证据梯度/估值双轨/反方最强论证) | pending | — |
| 8 | 插入6张关键表格(用户提供了框架) | pending | — |
| 9 | 全文语气校准：断言→条件化证伪 | pending | Task 2-8 |
| 10 | 补协议层缺失(问题定义/数据验证/博弈论/protocol cards) | pending | — |
| 11 | 质量门控验证 | pending | 全部 |

## 4. 用户关键决策

1. **GAAP vs non-GAAP** → 做对照桥，不是只选一个
2. **裂缝四(卖方看低)** → 换更硬证据，原卖方降级为辅助信号
3. **结构重排** → 用户提供了完整新目录(11章)，做结构重排不是逐点补丁
4. **四个新模块** → 全加，200K+可接受
5. **语气** → "断言"改"条件化证伪"，"目标模型"改"桥梁模型"

## 5. 核心文件路径

- 报告: `reports/FORM/FORM_complete_v2.md` (152K字符)
- 底表: `reports/FORM/data/FORM_master_financials.md`
- 升级brief: `docs/claude_code_handoffs/2026-04-17-form-report-upgrade-brief.md`
- FMP数据: `.worktrees/半导体/reports/FORM/data/fmp_financial_summary.md`
- Staging: `.worktrees/半导体/reports/FORM/staging/` (Phase 0.75-5全部)

## 6. 建议下次会话优先级

**最高**: Task 2(数据校准) + Task 3(执行摘要重写) + Task 5(GAAP桥)
**其次**: Task 4(结构重排) + Task 6(证据降级)
**然后**: Task 7-8(新模块+表格)
**最后**: Task 9-10-11(打磨+验收)

## 7. 用户提供的新执行摘要草稿

用户提供了完整的升级版执行摘要、新目录(11章)和6张关键表格框架。
这些在对话历史中，下次会话需要用户重新提供或从对话记录中提取。
核心方向：三座桥(毛利率桥/FB回报桥/高利润业务桥) + 条件化证伪 + 区间估值。
