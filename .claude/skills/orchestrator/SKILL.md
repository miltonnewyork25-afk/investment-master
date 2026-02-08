---
name: orchestrator
description: 投资分析框架编排器。识别公司行业，组装通用模块+行业适配模块，生成执行清单和进度追踪。当用户要求分析任何公司时自动触发。
---

# 投资分析框架编排器 v21.0

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

### Step 2: 数据预取（v2.0 — 11个文件）

触发 `/data-prefetch` 技能（参见 `.claude/skills/data-prefetch/SKILL.md`）：

1. 调用 MCP 工具获取实时数据（analyze_stock, compare_stocks, get_market_overview）→ 3个文件
2. 启动 5个并行 WebSearch Task Agent 预取分析师共识、预测市场、新闻催化剂、业务竞争、管理层数据 → 6个文件
3. 运行 Python 估值模型（DCF计算器, 可比公司分析）→ 2个文件
4. 缓存到 `data/research/{TICKER}/`（共11个数据文件 + 1个元数据文件）
5. 分类检查缓存有效性（不同数据类型有不同的过期规则，详见 data-prefetch SKILL.md）

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

### Step 5: 生成争议驱动执行计划（v21.0升级）

> 执行计划从"按模块填空"变为"以Core Questions为轴心，模块带权重"。

**5a. 加载Phase 0.5产出**: 读取 `data/research/{TICKER}/phase0.5/` 中的CQ清单和CQ-模块相关性矩阵

**5b. 生成CQ驱动执行计划**, 写入 `task_plan.md`：

```
## 本次分析：{公司名} ({代码})
## 行业：{行业类型}
## 行业复杂度系数：{系数}
## 最低字数：120,000 × {系数} = {目标字数}
## 报告输出：reports/{TICKER}/
## 数据缓存：reports/{TICKER}/data/
## Core Questions: {CQ数量}个

### Core Questions 清单
- CQ1: [问题] (注意力分: XX)
- CQ2: [问题] (注意力分: XX)
- ...

### Phase 1: 定位与生态 (CQ驱动)
- [ ] 模块1 [权重:高/中/低]: ...
- [ ] 适配模块A [权重:高]: ...
五引擎状态: 竞争□ 周期□ 估值□ 预测□ 风险□

### Phase 2-4: [类似结构，模块带CQ权重]

### 看空分析计划
- 目标篇幅: ≥30%
- 预定看空论点: [从CQ中提取]
```

### Step 6: 执行并追踪

- 每完成一个模块，更新 `progress.md`
- 每完成一个 Phase，输出检查点
- 检查点内容：模块完成度 + 字数 + 五引擎状态 + PPDA/PMSI（Phase 3-4）
- 检查点通过后才进入下一 Phase

### Step 7: 完成后复盘

写入 `reflection.md`：哪些模块做得好，哪些需改进

## v21.0 质量标准

| 指标 | v21.0 要求 | 说明 |
|------|-----------|------|
| 总字数 | ≥120,000 × 行业系数 | 地板不是天花板 |
| 数据表格 | ≥55 | — |
| Mermaid图 | ≥15 | — |
| 洞察卡 | ≥12张，每张≥400字 | So What≥9分 |
| Kill Switch | ≥12重（动态） | — |
| 可验证预测 | ≥30个 | — |
| 分析师引用 | ≥15位，每位≥150字 | — |
| 三层标注密度 | ≥15个/万字 | 硬数据≥40% (v21.0) |
| 看空篇幅 | ≥30%总篇幅 | (v21.0新增) |
| CQ覆盖 | 100% CQ有明确回答 | (v21.0新增) |
| 模块So What | 高相关模块≥7分 | (v21.0新增) |
| PPDA分析 | Phase 3-4 必须包含 | — |
| PMSI指数 | Phase 4 必须计算 | — |

## 重要规则

- 不可跳过任何通用模块
- 不可跳过行业适配模块
- 每个模块完成后立即更新 progress.md
- /compact 后从 task_plan.md + progress.md + data/research/{TICKER}/ 恢复上下文
- 数据优先从 MCP 缓存读取，减少重复获取
