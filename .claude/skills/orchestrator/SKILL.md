---
name: orchestrator
description: 投资分析框架编排器。识别公司行业，组装通用模块+行业适配模块，生成执行清单和进度追踪。当用户要求分析任何公司时自动触发。
---

# 投资分析框架编排器

## 触发条件

当检测到以下关键词时自动执行：深度分析、研究、调研、analyze、股票代码

## 执行流程

### Step 1: 识别行业

根据公司名/代码判断行业类型：

| 行业 | 适配器文件 | 代表公司 |
|------|-----------|---------|
| 半导体 | `modules/semiconductor.md` | TSM, MU, LRCX, NVDA, ASML |
| 消费品 | `modules/consumer.md` | PG, KO, COST, NKE, LVMH |
| 科技平台 | `modules/tech_platform.md` | META, GOOG, AMZN, MSFT, AAPL |
| 零售 | `modules/retail.md` | WMT, COST, HD, TGT, DG |
| 金融 | `modules/financial.md` | JPM, GS, BRK, V, MA |
| **金融科技** | `modules/fintech.md` | SOFI, SQ, PYPL, HOOD, AFRM, COIN, NU |
| 其他 | 仅用通用模块 | - |

### Step 2: 加载模块

1. **必须读取** `modules/universal.md` — 通用模块（所有行业共用）
2. **必须读取** `modules/{行业}.md` — 行业适配模块
3. 合并两份模块清单，去重

### Step 3: 生成执行计划

读取 `templates/execution_plan.md` 模板，填充后写入 `task_plan.md`：

```
## 本次分析：{公司名} ({代码})
## 行业：{行业类型}
## 行业复杂度系数：{系数}
## 最低字数：60,000 × {系数} = {目标字数}

### Phase 1: 定位与生态 (通用 + 适配)
- [ ] 模块1: ...
- [ ] 模块2: ...
- [ ] 适配模块A: ...

### Phase 2: 数据雷达 (通用 + 适配)
...

### Phase 3: 深度分析 (通用 + 适配)
...

### Phase 4: 决策输出 (通用 + 适配)
...
```

### Step 4: 执行并追踪

- 每完成一个模块，更新 `progress.md`
- 每完成一个 Phase，输出检查点
- 检查点通过后才进入下一 Phase

### Step 5: 完成后复盘

写入 `reflection.md`：哪些模块做得好，哪些需改进

## 重要规则

- ❌ 不可跳过任何通用模块
- ❌ 不可跳过行业适配模块
- ✅ 每个模块完成后立即更新 progress.md
- ✅ /compact 后从 task_plan.md + progress.md 恢复上下文
