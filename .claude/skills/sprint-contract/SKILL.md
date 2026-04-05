---
name: sprint-contract
description: 生成Sprint Contract。每Phase开始前由Planner调用，基于P0-P3识别结果动态生成强制分析项和评判标准。
---

# Sprint Contract Skill

## 触发时机
每个Phase开始前，Planner Agent调用此skill生成Sprint Contract。

## 执行流程

### Step 1: 读取输入
```
读取: templates/sprint_contract_template.yaml（模板）
读取: reports/{TICKER}/data/research_state.yaml（当前状态）
读取: reports/{TICKER}/data/checkpoint.yaml（进度）
读取: 上一Phase的eval_verdict_P{N-1}.yaml（如有）
```

### Step 2: 确定强制分析项

根据P0-P3识别结果，从模板的mandatory_analysis中筛选适用项：

| 识别信号 | 激活的强制项 |
|---------|------------|
| 所有公司 | 增长归因分解 + 预期差显式分析 + 认知边界 |
| 多层客户结构 | + 定价权分层（���刀差） |
| SaaS公司 | + NRR分层 + 三PE并��� |
| M0混合体 | + 分部拆解+分部估值 |
| 市值>$500B | + 巨头估值框架 |
| 周期性行业 | + 穿周期OE |
| 有飞轮声称 | + 飞轮验证 |
| 事件驱动 | + 每Phase价格快照 |

### Step 3: 设定字符预算

根据可能性宽度(PW)和Phase确定字符预算：
- PW≤3: 总预算250K（传统框架）
- PW≤6: 总���算200K（混合模式）
- PW≥7: 总预算350K（发现系统）

Phase分配（占总预算比例）：
- Phase 0: 5%
- Phase 1-2: 50%
- Phase 3: 15%
- Phase 4: 10%
- Phase 5: 20%

**字符预算是预算不是指标**: 密度达标+字符不足=允许提交。字符达标+密度不足=不合格。

### Step 4: 调整Evaluator标准

根据Phase特性调整评判权重：
- Phase 0: E1(Contract覆盖)权重最高
- Phase 1-2: E2(证据链)+E4(CI方向)+E6(预期差)权重最高
- Phase 3: 红队实质修正是硬门控
- Phase 4: Lens Quality Gate是硬门控
- Phase 5: C1-C6全通过是硬门控

### Step 5: 产出Contract文件

写入: `reports/{TICKER}/data/sprint_contract_P{N}.yaml`

## 产出规范

Contract文件必须包含：
1. phase + date + ticker + objective
2. identification（P0-P3摘要）
3. generator_deliverables（含字符预算和密度底线）
4. mandatory_analysis（根据识别动态生成）
5. evaluator_criteria（含权重和fatal阈值）
6. pass_conditions
7. on_fail处理方案
8. cost_budget（max 2轮）
9. dynamic_agents（Planner决定）
