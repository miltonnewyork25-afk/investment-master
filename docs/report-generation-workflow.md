# 半导体投资报告生成标准流程

> 版本：1.0
> 更新日期：2026年1月22日

---

## 概述

本文档定义了生成半导体供应链投资报告的标准化流程，确保数据来源一致性和分析质量。

---

## 1. 数据源分工

| 数据源 | 用途 | 优先级 |
|--------|------|--------|
| **FMP API** | 财务数据、估值、内部人交易 | 主要 |
| **100Baggers API** | 先行指标（排除雷达图） | 补充 |
| **Semicap Framework** | 周期分析、评分体系 | 分析框架 |

---

## 2. FMP API 数据获取

### 2.1 必需端点

```bash
# 1. 公司概况
curl "https://financialmodelingprep.com/stable/profile?symbol={SYMBOL}&apikey={KEY}"

# 2. TTM损益表
curl "https://financialmodelingprep.com/stable/income-statement-ttm?symbol={SYMBOL}&apikey={KEY}"

# 3. TTM资产负债表
curl "https://financialmodelingprep.com/stable/balance-sheet-statement-ttm?symbol={SYMBOL}&apikey={KEY}"

# 4. TTM现金流
curl "https://financialmodelingprep.com/stable/cash-flow-statement-ttm?symbol={SYMBOL}&apikey={KEY}"

# 5. 财务评分（Z-Score, F-Score）
curl "https://financialmodelingprep.com/stable/financial-scores?symbol={SYMBOL}&apikey={KEY}"

# 6. 内部人交易统计
curl "https://financialmodelingprep.com/stable/insider-trading/statistics?symbol={SYMBOL}&apikey={KEY}"

# 7. 同业对比（v3 API，支持批量）
curl "https://financialmodelingprep.com/api/v3/quote/{SYMBOL},{PEER1},{PEER2}&apikey={KEY}"
```

### 2.2 提取关键指标

| 类别 | 指标 |
|------|------|
| 估值 | P/E, P/B, EV/EBITDA |
| 盈利 | 毛利率, 营业利润率, 净利率, ROIC |
| 现金 | OCF/NI, FCF/NI, FCF Margin |
| 韧性 | Z-Score, F-Score, 流动比率, D/E |
| 内部人 | 季度净买入/卖出交易数 |

---

## 3. 100Baggers API 数据获取

### 3.1 获取先行指标

```bash
curl -s -X POST "https://www.100baggers.club/api/generate-summary" \
  -H "Content-Type: application/json" \
  -H "x-api-key: {INTERNAL_API_KEY}" \
  --data-raw '{"symbol":"{SYMBOL}"}'
```

### 3.2 提取内容（仅先行指标）

| 提取项 | 用途 | 备注 |
|--------|------|------|
| **正面先行指标** | 融入第1层分析 | 如：营收毛利共振、经营杠杆释放 |
| **负面先行指标** | 风险预警 | 如：盈利质量低、流动性压力 |
| 基础财务指标 | 数据一致性验证 | 与FMP交叉对比 |

**注意**：不使用雷达图分析指标，避免与框架评分体系混淆。

---

## 4. 数据一致性验证

### 4.1 必须对比的指标

| 指标 | 允许差异 |
|------|----------|
| 毛利率 | <1% |
| 净利率 | <1% |
| 营收 | <0.5% |
| ROE | <5%（计算口径差异） |
| Z-Score | 允许较大差异（公式版本不同） |

### 4.2 差异处理

1. **小差异（<5%）**：标注但不影响结论
2. **中等差异（5-15%）**：说明计算口径差异
3. **大差异（>15%）**：需调查原因，优先采用FMP数据

---

## 5. 报告生成框架

### 5.1 报告结构

```
1. 执行摘要
   - 投资评级、综合评分、目标仓位

2. 数据源一致性验证（新增）
   - FMP vs 100Baggers 关键指标对比

3. 公司概况
   - 基本信息、业务定位

4. 财务数据分析（FMP数据）
   - 损益表、资产负债表、现金流
   - 财务评分

5. 同业对比分析
   - 估值对比、关键指标对比

6. 六层框架分析
   - 第0层：结构性周期（10%）
   - 第1层：先行指标（25%）← 融合100Baggers
   - 第2层：上下游联动（20%）
   - 第3层：财务深度（25%）
   - 第4层：估值风险（15%）
   - 第5层：内部人/情绪（5%）

7. 投资建议
   - 评级、仓位、买卖策略、监控指标

8. 情景分析
   - 牛市/基准/熊市情景

9. 附录
   - 数据来源、标准流程
```

### 5.2 评分计算

使用 semicap-analysis 框架 v4.0：

| 层级 | 权重 | 数据来源 |
|------|------|----------|
| 结构性指标 | 10% | 行业周期研究 |
| 先行指标 | 25% | 100Baggers + 行业数据 |
| 上下游联动 | 20% | 客户/同业公开信息 |
| 财务深度 | 25% | FMP API |
| 估值风险 | 15% | FMP API |
| 内部人/情绪 | 5% | FMP API |

---

## 6. 快速命令

### 生成报告

使用 Claude Code 的 skill 调用：

```
# 1. 使用 fmp-api skill 获取财务数据
/fmp-api LRCX

# 2. 使用 financial-report skill 获取先行指标
/financial-report LRCX

# 3. 使用 semicap-analysis skill 进行框架分析
/semicap-analysis LRCX
```

---

## 7. 检查清单

- [ ] FMP 公司概况已获取
- [ ] FMP TTM 三表已获取
- [ ] FMP 财务评分已获取
- [ ] FMP 内部人交易已获取
- [ ] FMP 同业数据已获取
- [ ] 100Baggers 先行指标已获取（排除雷达图）
- [ ] 数据一致性已验证
- [ ] 六层框架评分已计算
- [ ] 风险扣分已应用
- [ ] 投资建议已生成

---

*本文档为标准操作流程，适用于所有半导体供应链股票分析*
