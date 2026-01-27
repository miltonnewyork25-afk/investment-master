# Agent 3: 基本面质量评分引擎 v2.0

## 概述

严格的基本面质量评分系统，聚焦于价值投资的三大核心：
- **护城河** (Moat)
- **现金流质量** (Cash Flow Quality)
- **资产负债表健康度** (Balance Sheet Health)

---

## 文件结构

```
/scoring/
├── fundamental_scorer.py      # 核心评分引擎 (75KB, 2000+ 行)
├── scoring_methodology.md     # 评分方法论详细文档
├── moat_framework.md          # 护城河评估框架
├── exclusion_rules.md         # 硬性排除规则清单
├── README.md                  # 本文件
└── results/                   # 评分结果输出
    ├── fundamental_scores.csv           # 评分汇总表
    ├── fundamental_scores_detailed.json # 详细评分+证据
    └── quality_pools.json               # 质量候选池
```

---

## 快速开始

### 评分单个公司
```bash
cd /Users/milton/投资大师/Top20_Screener/scoring
python3 fundamental_scorer.py --ticker AAPL
```

### 批量评分
```bash
python3 fundamental_scorer.py --tickers "AAPL,MSFT,GOOGL,JNJ,V"
```

### 指定输出目录
```bash
python3 fundamental_scorer.py --ticker TSLA --output ./my_results
```

---

## 评分维度 (100分)

| 维度 | 满分 | 权重 | 核心关注 |
|------|------|------|----------|
| 现金流与盈利质量 | 25 | 25% | OCF/NI, FCF一致性, 营运资本 |
| 利润结构与经营韧性 | 20 | 20% | 毛利率稳定性, 营业利润率趋势 |
| 资本效率与资产负债表 | 20 | 20% | ROIC vs WACC, 杠杆, 偿债能力 |
| 护城河证据 | 25 | 25% | 网络效应/转换成本/成本优势等 |
| 盈利可见性与确定性 | 10 | 10% | 分析师一致性, 收入结构 |

---

## 评级标准

| 总分 | 评级 | 候选池 |
|------|------|--------|
| 85-100 | A+ | 高质量 |
| 75-84 | A | 高质量 |
| 70-74 | B+ | 高质量 |
| 60-69 | B | 中等质量 |
| 50-59 | C | 低质量 |
| 40-49 | D | 不推荐 |
| <40 | F | 排除 |

---

## 硬性排除规则

以下任一条件触发即直接排除：

| 规则 | 阈值 |
|------|------|
| 现金流质量差 | OCF/NI < 0.5 连续2年 |
| 价值摧毁 | ROIC < WACC 连续3年 |
| 无护城河 | Moat Score = 0 |
| 杠杆过高 | Net Debt/EBITDA > 5x |

---

## 输出文件说明

### fundamental_scores.csv
汇总表，包含每个公司的：
- 总分和评级
- 各维度分数
- 排除状态
- 数据置信度

### fundamental_scores_detailed.json
详细评分，包含：
- 每个子指标的得分
- 证据链 (具体数值和计算过程)
- 红旗警示
- 数据来源

### quality_pools.json
质量候选池分类：
- high_quality: 评分 >= 70
- medium_quality: 评分 60-69
- low_quality: 评分 < 60
- excluded: 被硬性排除的公司

---

## 与其他Agent的集成

### 输入依赖
- **Agent 1/2**: 提供候选股票列表

### 输出提供
- **Agent 7**: 质量候选池用于最终排序
- **Agent 8**: 详细评分用于Top 20选择

---

## 数据来源

- **FMP API**: 财报数据、关键指标、分析师预估
- **TTM计算**: 自动计算过去12个月数据
- **行业基准**: 内置行业中位数对比

---

## 示例输出

```
============================================================
评分结果: Microsoft Corporation (MSFT)
============================================================
总分: 74/100
评级: B+
行业: Technology / Software - Infrastructure

维度分数:
  现金流质量:    21/25
  利润结构:      20/20
  资本效率:      17/20
  护城河:        8/25
  盈利可见性:    8/10

[警示] Red Flags:
  - 应收账款增速(22.8%)超过营收增速(14.9%)

数据置信度: high
评估日期: 2026-01-26
============================================================
```

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v2.0 | 2026-01-26 | 完整重构，五维度评分系统 |
| v1.0 | 2026-01-25 | 初版发布 |

---

**作者**: Agent 3 - 基本面质量评分引擎
**最后更新**: 2026-01-26
