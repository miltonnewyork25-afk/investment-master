# 排除规则详细说明 v2.0

## 概述

本文档详细说明Top 20筛选系统中使用的所有排除规则。这些规则的目的是确保进入最终名单的公司都是"可投资"的，即：

1. **可审计**：有足够的公开数据进行分析
2. **可预测**：业务模式不依赖二元事件（如FDA批准）
3. **可交易**：有足够的流动性进入和退出头寸
4. **财务健康**：没有即将破产或严重财务困境的迹象

## 设计原则

- **宁可错杀，不可放过**：Type I error（错误排除好公司）优于Type II error（放入问题公司）
- **阈值有据**：每个阈值都有学术研究或实践经验支持
- **可追溯**：所有排除决策都有完整日志
- **可覆盖**：支持白名单机制（未来版本）

---

## 规则1: 行业排除（二元事件/无法审计）

### 1.1 生物技术/制药（临床试验驱动）

| 子行业 | 排除原因 | 依据 |
|-------|---------|------|
| Biotechnology | 临床试验二元事件风险 | 临床III期失败率~50%，结果不可预测 |
| Pharmaceuticals - Development | 药物审批不确定性 | FDA审批时间和结果高度不确定 |
| Pharmaceutical Services | 依赖单一大客户风险 | CRO/CMO收入集中度高 |
| Drug Manufacturers - Specialty | 专利悬崖风险 | 仿制药竞争突然性强 |

**例外情况**：
- 大市值药企（>$50B）且主要收入来自已上市产品
- 收入多元化的综合医药公司

### 1.2 高度投机性行业

| 子行业 | 排除原因 | 依据 |
|-------|---------|------|
| SPAC/Shell Companies | 无运营历史 | 无法评估管理层执行力 |
| Cannabis | 监管极不确定 | 联邦/州法律冲突 |
| Cryptocurrency | 无内在价值锚定 | 估值方法论缺失 |

### 1.3 无法用财务数据验证的行业

| 子行业 | 排除原因 | 依据 |
|-------|---------|------|
| Oil & Gas E&P | 储量估计主观性高 | PV-10估计依赖假设 |
| Uranium/Gold/Silver | 勘探结果二元性 | 资源量不可审计 |
| Mining - Junior | 勘探风险 | 无经过验证的储量 |

### 1.4 特殊风险行业

| 子行业 | 排除原因 | 依据 |
|-------|---------|------|
| Banks - Regional (<$10B) | 流动性风险高 | SVB/FRC案例 |
| REIT - Office | 结构性下行 | 远程办公永久性影响 |
| REIT - Retail | 电商冲击 | 租户破产风险 |
| Airlines | 周期性+油价敏感 | 高固定成本，低利润率 |
| Cruise Lines | 疫情+高负债 | 极端事件脆弱性 |
| Tobacco | ESG排斥+结构性下滑 | 长期收缩行业 |
| Coal | 能源转型淘汰 | 政策风险 |
| Gambling | 监管+周期性 | 消费者信心敏感 |

---

## 规则2: 数据完整性排除

### 2.1 必需数据字段

以下数据必须存在才能进行有效分析：

**财务数据（最近4季度/5年度）**：
- `revenue` - 收入
- `net_income` - 净利润
- `operating_cash_flow` - 经营现金流
- `free_cash_flow` - 自由现金流
- `total_assets` - 总资产
- `total_liabilities` - 总负债
- `shareholders_equity` - 股东权益
- `gross_margin` - 毛利率
- `operating_margin` - 营业利润率

**市场数据（至少3年）**：
- `price_history_3y` - 3年价格历史
- `volume_history` - 成交量历史

**估值数据**：
- `market_cap` - 市值
- `enterprise_value` - 企业价值
- `shares_outstanding` - 流通股数

### 2.2 排除阈值

| 条件 | 阈值 | 操作 |
|-----|------|------|
| 核心财务数据缺失 | >20% | 排除 |
| 价格历史 | <750交易日 | 排除（无法计算3年Sharpe） |
| 最近季报延迟 | >60天 | 警示 |

### 2.3 数据来源信度

| 级别 | 来源 | 用途 |
|-----|------|------|
| Tier 1 | SEC文件、公司财报 | 直接引用 |
| Tier 2 | FMP、Bloomberg | 交叉验证后可用 |
| Tier 3 | 新闻、社交媒体 | 仅作参考 |

---

## 规则3: 财务健康排除

### 3.1 盈利能力

| 条件 | 阈值 | 排除原因 |
|-----|------|---------|
| 连续亏损 | >=3年 | 商业模式可能不可持续 |
| 累计经营现金流 | 3年<0 | 盈利质量堪忧 |

### 3.2 杠杆与偿债能力

| 指标 | 阈值 | 排除原因 |
|-----|------|---------|
| D/E比率 | >3.0 (300%) | 杠杆过高 |
| 利息覆盖率 | <2.0x | EBIT不足以覆盖利息 |

**计算公式**：
```
D/E = Total Debt / Shareholders' Equity
Interest Coverage = EBIT / Interest Expense
```

### 3.3 流动性

| 指标 | 阈值 | 排除原因 |
|-----|------|---------|
| 流动比率 | <0.8 | 短期偿债能力不足 |
| 速动比率 | <0.5 | 现金紧张（警示） |

**计算公式**：
```
Current Ratio = Current Assets / Current Liabilities
Quick Ratio = (Current Assets - Inventory) / Current Liabilities
```

### 3.4 Altman Z-Score

| Z值范围 | 区域 | 操作 |
|--------|------|------|
| <1.8 | 财务困境区 | 排除 |
| 1.8-2.99 | 灰色区域 | 警示 |
| >2.99 | 安全区 | 通过 |

**计算公式**（制造业）：
```
Z = 1.2×(Working Capital/Total Assets)
  + 1.4×(Retained Earnings/Total Assets)
  + 3.3×(EBIT/Total Assets)
  + 0.6×(Market Cap/Total Liabilities)
  + 1.0×(Revenue/Total Assets)
```

---

## 规则4: 治理与合规排除

### 4.1 审计与财务报告

| 条件 | 阈值 | 排除原因 |
|-----|------|---------|
| 审计意见异常 | 保留/否定/无法表示 | 财务数据可靠性存疑 |
| 财务重述 | >1次/3年 | 内控可能有问题 |
| 延迟提交10-Q/10-K | NT通知 | 可能有未披露事项 |

### 4.2 管理层稳定性

| 条件 | 阈值 | 排除原因 |
|-----|------|---------|
| CFO变更 | >1次/2年 | 财务管理不稳定 |
| CEO变更 | >0次/2年 | 战略方向不确定 |

### 4.3 SEC调查与诉讼

| 条件 | 操作 |
|-----|------|
| SEC正在调查 | 排除 |
| 重大集体诉讼 | 警示 |
| 会计欺诈新闻 | 深入调查 |

### 4.4 内部人交易

| 条件 | 阈值 | 排除原因 |
|-----|------|---------|
| 6个月净卖出 | >$10M且卖出率>50% | 内部人对公司失去信心 |
| 高管集中抛售 | CEO/CFO大量卖出 | 红旗信号 |

**检测关键词（新闻）**：
- investigation, fraud, sec, lawsuit, class action
- restatement, accounting, scandal, whistleblower, indictment

---

## 规则5: 市场风险排除

### 5.1 流动性

| 指标 | 阈值 | 排除原因 |
|-----|------|---------|
| 日均交易额 | <$5M | 难以建仓/出仓 |
| 市值 | <$500M | 小盘股风险 |

**计算公式**：
```
Daily Dollar Volume = Average Volume × Price
```

### 5.2 波动性

| 指标 | 阈值 | 排除原因 |
|-----|------|---------|
| 年化波动率 | >80% | 风险调整收益差 |
| 3年最大回撤 | >60% | 历史大幅亏损 |

**计算公式**：
```
Volatility = StdDev(Daily Returns) × √252
Max Drawdown = (Trough - Peak) / Peak
```

### 5.3 空头活动

| 指标 | 阈值 | 排除原因 |
|-----|------|---------|
| 空头比例 | >20% | 空头拥挤，轧空风险 |
| Days to Cover | >10天 | 空头覆盖时间长 |

---

## 特殊情况排除

### Penny Stock

| 条件 | 阈值 |
|-----|------|
| 价格 | <$5 |
| 市值 | <$500M |

**排除原因**：机构无法持有，操纵风险高

### Pre-Revenue公司

| 条件 | 阈值 |
|-----|------|
| 年收入 | =$0 |

**排除原因**：无法进行财务分析

### 近期IPO

| 条件 | 阈值 |
|-----|------|
| 上市时间 | <2年 |

**排除原因**：
- 缺乏公开运营历史
- 锁定期解禁风险
- 财务数据不足

### 中国ADR

| 条件 | 注册地 |
|-----|-------|
| 国家 | 中国/香港/开曼群岛 |

**排除原因**：
- PCAOB审计问题
- VIE结构风险
- 退市风险

---

## 排除规则执行顺序

为提高效率，排除检查按以下顺序执行（一旦排除即停止）：

1. **行业排除** - 最快，只需查行业代码
2. **特殊情况** - 快速检查价格/市值/IPO日期
3. **数据完整性** - 检查数据可用性
4. **财务健康** - 计算财务指标
5. **治理合规** - 检查新闻和SEC文件
6. **市场风险** - 计算波动率和回撤

---

## 白名单机制（未来版本）

对于被自动排除但有特殊原因应保留的公司，支持手动白名单覆盖：

```python
WHITELIST = {
    'TICKER': {
        'reason': '覆盖原因',
        'approved_by': '审批人',
        'date': '审批日期',
        'expiry': '过期日期',
    }
}
```

---

## 阈值调整指南

### 保守设置（更严格）

```python
FinancialThresholds(
    consecutive_loss_years=2,
    max_debt_equity=2.0,
    min_interest_coverage=3.0,
    min_altman_z=2.0,
)

MarketThresholds(
    min_daily_volume=10_000_000,
    max_volatility=0.60,
    max_drawdown=-0.40,
)
```

### 宽松设置（更多候选）

```python
FinancialThresholds(
    consecutive_loss_years=4,
    max_debt_equity=4.0,
    min_interest_coverage=1.5,
    min_altman_z=1.5,
)

MarketThresholds(
    min_daily_volume=2_000_000,
    max_volatility=1.0,
    max_drawdown=-0.70,
)
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|-----|------|------|
| 1.0 | 2026-01-25 | 初始版本 |
| 2.0 | 2026-01-26 | 完善规则结构，增加Altman Z，优化行业排除 |

---

## 参考文献

1. Altman, E. (1968). "Financial Ratios, Discriminant Analysis and the Prediction of Corporate Bankruptcy"
2. Sloan, R. (1996). "Do Stock Prices Fully Reflect Information in Accruals and Cash Flows about Future Earnings?"
3. SEC EDGAR Filing Requirements
4. PCAOB Auditing Standards

---

*文档最后更新: 2026-01-26*
