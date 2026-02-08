---
name: cross-validation
description: 数据交叉验证(XV)。读取多个数据文件，发现数值冲突，注册数据锚点，输出冲突报告。PG教训：PE错误传播4个Phase才发现；COST改进：Phase 0就修正6个冲突。适用于所有Tier 3 Phase 0完成后。
---

# 数据交叉验证技能 (XV Agent) v1.0

> 来源: COST v21 XV Agent 实战经验 — Phase 0 发现并修正 6 个数据冲突
> PG 反例: PE 数据错误(23.5x→20.8x)直到 Phase 4 才被发现

## 触发条件

- Tier 3 Phase 0 数据预取完成后（必须触发）
- 任何阶段发现数据不一致时（手动触发）
- 新数据文件加入后（建议触发）

## 核心原则

```
铁律: 任何被 2 个以上 Agent 引用的数据点，必须注册为"数据锚点"。
冲突 = 同一指标在不同来源中出现不同数值。
冲突不解决 = 不能进入 Phase 1。
```

## 执行流程

### Step 1: 数据文件清点

读取 `reports/{TICKER}/data/` 下所有数据文件，列出清单：

```markdown
| # | 文件名 | 字符数 | 数据类型 | 来源层级 |
|---|--------|--------|---------|---------|
| 1 | financial_data_pack.md | 15,015 | 财务核心 | A级(IR/SEC) |
| 2 | competitive_landscape.md | 16,724 | 竞争格局 | B级(第三方) |
| ... | ... | ... | ... | ... |
```

### Step 2: 核心数据点提取

从每个文件中提取**可量化数据点**，按以下分类：

| 类别 | 提取内容 | 典型数量 |
|------|---------|---------|
| **财务核心** | 收入/净利/EPS/毛利率/营业利润率 | 10-15个 |
| **估值指标** | PE/PB/EV/EBITDA/P/FCF | 5-8个 |
| **运营指标** | 同店/会员数/续费率/SKU等 | 8-12个 |
| **竞争数据** | 市场份额/竞对指标 | 5-10个 |
| **宏观数据** | 利率/关税/预测市场概率 | 3-5个 |

### Step 3: 交叉比对

对每个数据点，检查是否在多个文件中出现，比较数值：

```markdown
## 交叉比对结果

### 一致(CONFIRMED) ✅
| 数据点 | 值 | 出现文件 | 来源 |
|--------|-----|---------|------|
| FY2025 净销售额 | $269.9B | financial_pack, competitive, moat | Costco IR |

### 冲突(CONFLICT) ❌
| 数据点 | 文件A值 | 文件B值 | 差异 | 影响面 |
|--------|---------|---------|------|--------|
| FY2025 收入 | $269.9B(IR) | $275B(Statista) | +1.9% | 估值/增速计算 |

### 孤立(UNVERIFIED) ⚠️
| 数据点 | 值 | 仅出现于 | 风险 |
|--------|-----|---------|------|
| Kirkland收入 | $89B | kirkland_analysis | 无第二来源验证 |
```

### Step 4: 冲突解决

对每个 CONFLICT，执行以下决策树：

```
冲突发现
├─ 两个来源都是 A级(IR/SEC)?
│   └─ 检查数据口径差异(fiscal year vs calendar year, 含/不含会员费等)
├─ 一个A级 + 一个B级?
│   └─ 以A级为准，标注B级偏差原因
├─ 两个都是B级?
│   └─ WebSearch搜索第三来源仲裁
└─ 无法解决?
    └─ 标注为UNRESOLVED，提醒后续Phase注意
```

### Step 5: 数据锚点注册

将所有 CONFIRMED 数据点写入 `reports/{TICKER}/data/data_anchors.md`：

```markdown
# 数据锚点注册表
| ID | 数据点 | 值 | 来源 | 验证状态 | 注册Agent | 验证Agent |
|----|--------|-----|------|---------|-----------|-----------|
| DA-001 | FY2025净销售额 | $269.9B | Costco IR | ✅ CONFIRMED | Financial | XV |
| DA-002 | 续费率(美加) | 92.3% | Costco IR | ✅ CONFIRMED | Financial | XV |
| DA-003 | Kirkland收入 | $89B | CNBC | ⚠️ UNVERIFIED | Kirkland | XV |
```

### Step 6: 输出冲突报告

输出到 `reports/{TICKER}/data/cross_validation.md`：

```markdown
# XV 交叉验证报告
- 检查日期: {DATE}
- 数据文件数: {N}
- 总数据点: {N}
- CONFIRMED: {N} ({%})
- CONFLICT: {N} → 已解决{N} / 未解决{N}
- UNVERIFIED: {N}
- 数据锚点注册: {N}个

## 冲突详情
{每个冲突的来源追溯+解决方案}

## 建议
{对后续Phase的数据引用建议}
```

## 门控标准

- [ ] 所有 CONFLICT 已解决或标注 UNRESOLVED
- [ ] 数据锚点注册 ≥ 20 个
- [ ] CONFIRMED 比例 ≥ 70%
- [ ] 财务核心数据(收入/净利/EPS)全部 CONFIRMED
- [ ] 估值指标(PE/EV)全部 CONFIRMED

**不通过 = 不能进入 Phase 1**

## COST v21 实战参考

| 指标 | COST 实际值 |
|------|-----------|
| 数据文件 | 14个 |
| 总数据点 | 80+ |
| CONFLICT | 6个(全部解决) |
| 数据锚点 | 25+个 |
| 关键修正 | FY2025收入来源统一、PE口径统一、Kirkland收入校准 |
