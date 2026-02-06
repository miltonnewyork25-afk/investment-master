---
name: orchestrator
description: 投资分析框架编排器。识别公司行业，组装通用模块+行业适配模块，生成执行清单和进度追踪。当用户要求分析任何公司时自动触发。
---

# 投资分析框架编排器 v20.0

## 触发条件

当检测到以下关键词时自动执行：深度分析、研究、调研、analyze、股票代码

## 执行流程

### Step 1: 识别行业

根据公司名/代码判断行业类型：

| 行业 | 适配器文件 | 代表公司 | 复杂度系数 |
|------|-----------|---------|-----------|
| 半导体 | `modules/semiconductor.md` | TSM, MU, LRCX, NVDA, ASML | 2.0 |
| 消费品 | `modules/consumer.md` | PG, KO, COST, NKE, LVMH | 1.8 |
| 科技平台 | `modules/tech_platform.md` | META, GOOG, AMZN, MSFT, AAPL | 1.7 |
| 零售 | `modules/retail.md` | WMT, COST, HD, TGT, DG | 1.6 |
| 金融 | `modules/financial.md` | JPM, GS, BRK, V, MA | 1.6 |
| 其他 | 仅用通用模块 | - | 1.0 |

### Step 2: 数据预取

触发 `/data-prefetch` 技能（参见 `.claude/skills/data-prefetch/SKILL.md`）：

1. 调用 MCP 工具获取实时数据（analyze_stock, compare_stocks, get_market_overview）
2. 运行 Python 估值模型（DCF计算器, 可比公司分析）
3. 缓存到 `data/research/{TICKER}/`
4. 检查缓存有效性（<24h新鲜, 24h-7天警告, >7天强制刷新）

### Step 3: 加载模块

1. **必须读取** `modules/universal.md` — 通用模块（所有行业共用，29个模块）
2. **必须读取** `modules/{行业}.md` — 行业适配模块
3. 合并两份模块清单，去重

### Step 4: 五引擎预热

按 v10.0 协同调用顺序启动五引擎：

| 顺序 | 引擎 | 启动动作 |
|------|------|---------|
| 1 | 竞争博弈引擎 | 加载行业竞争格局数据 |
| 2 | 周期定位引擎 | 加载行业周期指标 |
| 3 | 估值重构引擎 | 加载预取的 DCF + 可比公司数据 |
| 4 | 预测市场引擎 | WebSearch: site:polymarket.com {公司/行业关键词} |
| 5 | 风险压力引擎 | 加载宏观数据 + 行业风险因子 |

### Step 5: 生成执行计划

读取 `templates/execution_plan.md` 模板，填充后写入 `task_plan.md`：

```
## 本次分析：{公司名} ({代码})
## 行业：{行业类型}
## 行业复杂度系数：{系数}
## 最低字数：120,000 × {系数} = {目标字数}
## 数据缓存：data/research/{TICKER}/

### Phase 1: 定位与生态 (通用 + 适配)
- [ ] 模块1: ...
- [ ] 适配模块A: ...
五引擎状态: 竞争□ 周期□ 估值□ 预测□ 风险□

### Phase 2: 数据雷达 (通用 + 适配)
...

### Phase 3: 深度分析 (通用 + 适配)
...

### Phase 4: 决策输出 (通用 + 适配)
...
```

### Step 6: 执行并追踪

- 每完成一个模块，更新 `progress.md`
- 每完成一个 Phase，输出检查点
- 检查点内容：模块完成度 + 字数 + 五引擎状态 + PPDA/PMSI（Phase 3-4）
- 检查点通过后才进入下一 Phase

### Step 7: 完成后复盘

写入 `reflection.md`：哪些模块做得好，哪些需改进

## v20.0 质量标准

| 指标 | v20.0 要求 |
|------|-----------|
| 总字数 | ≥120,000 × 行业系数 |
| 数据表格 | ≥55 |
| Mermaid图 | ≥15 |
| 洞察卡 | ≥12张，每张≥400字 |
| Kill Switch | ≥12重（动态） |
| 可验证预测 | ≥30个 |
| 分析师引用 | ≥15位，每位≥150字 |
| 数据标注 A+B级 | ≥95% |
| PPDA分析 | Phase 3-4 必须包含 |
| PMSI指数 | Phase 4 必须计算 |

## 重要规则

- 不可跳过任何通用模块
- 不可跳过行业适配模块
- 每个模块完成后立即更新 progress.md
- /compact 后从 task_plan.md + progress.md + data/research/{TICKER}/ 恢复上下文
- 数据优先从 MCP 缓存读取，减少重复获取
