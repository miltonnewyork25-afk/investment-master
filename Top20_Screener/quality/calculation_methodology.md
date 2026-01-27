# 质量指标计算方法论

**版本**: v1.0
**更新日期**: 2026-01-25
**适用范围**: 所有上市公司基本面质量评估

---

## 一、现金流质量指标

### 1.1 OCF/NI Ratio (经营现金流与净利润比率)

**计算公式**:
```
OCF/NI Ratio = Operating Cash Flow / Net Income
```

**数据来源**:
- Operating Cash Flow: 现金流量表第一部分
- Net Income: 损益表底部，或现金流量表调整起点

**评级标准**:
| 比率范围 | 评级 | 含义 |
|---------|------|------|
| ≥ 1.2 | Excellent | 盈利质量优秀，现金转化能力强 |
| 1.0 - 1.2 | Good | 盈利可兑现为现金，质量良好 |
| 0.8 - 1.0 | Acceptable | 盈利质量可接受，需关注趋势 |
| < 0.8 | Warning | 盈利质量存疑，现金转化能力弱 |

**分析要点**:
- 比率持续 < 1.0 → 公司可能通过会计调整虚增利润
- 比率 > 1.5 且持续 → 强护城河证据（如SaaS预收款模式）
- 负利润公司此指标无意义

**10-K位置**:
- OCF: Consolidated Statements of Cash Flows
- Net Income: Consolidated Statements of Operations

---

### 1.2 FCF/NI Ratio (自由现金流与净利润比率)

**计算公式**:
```
FCF = Operating Cash Flow - Capital Expenditures
FCF/NI Ratio = FCF / Net Income
```

**数据来源**:
- FCF: 现金流量表，或公司MD&A披露
- CapEx: 现金流量表投资活动部分 "Purchase of property and equipment"

**评级标准**:
| 比率范围 | 评级 | 含义 |
|---------|------|------|
| ≥ 0.9 | Excellent | 自由现金流转化优秀 |
| 0.7 - 0.9 | Good | 自由现金流转化良好 |
| 0.5 - 0.7 | Acceptable | 资本支出较高，关注投资回报 |
| < 0.5 | Warning | 高资本支出侵蚀现金流，需评估必要性 |

**分析要点**:
- 资本密集型行业（制造、能源）天然较低
- 轻资产模式（SaaS、服务）应接近1.0
- 突然下降 → 警惕增长可持续性

---

### 1.3 营运资本质量指标

#### DSO (Days Sales Outstanding - 应收账款周转天数)
```
DSO = (Accounts Receivable / Revenue) × 365
```
- **数据来源**: AR (资产负债表), Revenue (损益表)
- **趋势分析**: DSO上升 → 收入质量存疑，可能虚增
- **行业对比**: 制造业通常30-60天，B2B软件可达90天

#### DIO (Days Inventory Outstanding - 存货周转天数)
```
DIO = (Inventory / Cost of Goods Sold) × 365
```
- **数据来源**: Inventory (资产负债表), COGS (损益表)
- **警告信号**: DIO大幅上升且收入放缓 → 需求疲软

#### DPO (Days Payable Outstanding - 应付账款周转天数)
```
DPO = (Accounts Payable / Cost of Goods Sold) × 365
```
- **数据来源**: AP (资产负债表), COGS (损益表)

#### CCC (Cash Conversion Cycle - 现金转换周期)
```
CCC = DSO + DIO - DPO
```

**CCC评级**:
| CCC天数 | 评级 | 含义 |
|--------|------|------|
| < 30 | Excellent | 现金转换周期短，营运资本效率优秀 |
| 30 - 60 | Good | 现金转换周期良好 |
| 60 - 90 | Acceptable | 现金转换周期可接受，有改善空间 |
| > 90 | Warning | 现金转换周期过长，占用大量营运资本 |

**特例**:
- 负CCC（如亚马逊、戴尔）→ 先收钱后付款，超强现金流模式

---

### 1.4 CapEx Intensity (资本支出强度)

**计算公式**:
```
CapEx Intensity = Capital Expenditures / Revenue
```

**分析要点**:
- 对比5年平均值
- 突然增加50%+ → 维持增长需要更多投资，警惕
- 区分维护性CapEx vs 增长性CapEx（MD&A讨论）

**行业基准**:
- 科技/SaaS: 3-8%
- 制造业: 5-10%
- 重工业: 10-20%+

---

## 二、资本效率指标

### 2.1 ROIC (Return on Invested Capital - 投入资本回报率)

**计算公式**:
```
NOPAT = EBIT × (1 - Tax Rate)
Invested Capital = Total Equity + Total Debt - Cash
ROIC = NOPAT / Invested Capital
```

**数据来源**:
- EBIT: 损益表 Operating Income
- Tax Rate: Income Tax Expense / Pretax Income
- Total Equity: 资产负债表 Shareholders' Equity
- Total Debt: 短期+长期债务合计
- Cash: 现金及等价物

**评级标准**:
| ROIC | 评级 | 含义 |
|------|------|------|
| ≥ 15% | Excellent | 资本回报率优秀，强护城河证据 |
| 10-15% | Good | 资本回报率良好，创造价值 |
| 5-10% | Acceptable | 资本回报率可接受 |
| < 5% | Poor | 资本回报率低，可能摧毁价值 |

**分析要点**:
- ROIC > WACC → 创造价值
- 连续5年 ROIC > 15% → 强护城河证据
- ROIC持续上升 → 规模效应/竞争优势扩大

**特殊处理**:
- 金融公司: 使用ROA/ROE替代（资本结构特殊）
- 负EBIT公司: ROIC为负或N/A

---

### 2.2 ROE与杜邦三因素分解

**计算公式**:
```
ROE = Net Income / Total Equity

杜邦分解:
ROE = (Net Income / Revenue) × (Revenue / Total Assets) × (Total Assets / Total Equity)
    = 净利率 × 资产周转率 × 权益乘数
```

**数据来源**: 全部来自财报主表

**分析框架**:
| ROE驱动因素 | 含义 | 好/坏 |
|------------|------|-------|
| 高净利率 | 定价权、成本优势 | 好 ✓ |
| 高资产周转率 | 资产使用效率高 | 好 ✓ |
| 高权益乘数 | 高杠杆驱动 | 需警惕 ⚠ |

**分析要点**:
- 权益乘数 > 3 → 高杠杆，财务风险
- 净利率 > 20% → 强定价权证据
- ROE > 20%且杠杆低 → 优质企业

---

### 2.3 Asset Turnover (资产周转率)

**计算公式**:
```
Asset Turnover = Revenue / Average Total Assets
```

**行业基准**:
| 行业类型 | 典型周转率 |
|---------|-----------|
| 零售/快消 | > 2.0 |
| 轻资产服务 | 1.0 - 2.0 |
| 制造业 | 0.8 - 1.5 |
| 重资产/公用事业 | < 0.5 |

**趋势分析**: 周转率下降 → 资产使用效率恶化

---

## 三、护城河评分系统

**基于Morningstar五大护城河来源，量化评分 (0-100分)**

### 3.1 定价权 (Pricing Power - 满分25分)

**评分标准**:
| 指标 | 条件 | 得分 |
|------|------|------|
| 毛利率vs行业 | 高于行业中位数+10% | +10分 |
| 毛利率趋势 | 连续5年上升 | +5分 |
| 价格弹性 | 价格调整后销量未明显下降 | +5分 |
| 品牌溢价 | 存在可量化品牌溢价 | +5分 |

**数据来源**:
- 毛利率: 财报 Gross Profit / Revenue
- 行业中位数: 同行公司中位数
- 品牌溢价: 同类产品价格对比、市场调研

**实例**:
- Apple: 毛利率43% vs 行业20% → +10分
- LVMH: 品牌溢价300%+ → +5分

---

### 3.2 转换成本 (Switching Costs - 满分25分)

**评分标准**:
| 指标 | 条件 | 得分 |
|------|------|------|
| 客户留存率 | ≥ 90% | +10分 |
| 产品嵌入度 | 深度嵌入客户流程 (ERP/数据库) | +8分 |
| 网络效应 | 存在多边平台网络效应 | +7分 |

**数据来源**:
- 客户留存率: SaaS公司财报披露 NRR (Net Revenue Retention)
- 产品嵌入: 案例研究、客户迁移成本分析
- 网络效应: 商业模式分析

**实例**:
- Salesforce: NRR 110%+ → +10分
- SAP: 深度嵌入企业流程 → +8分
- Visa: 双边网络效应 → +7分

---

### 3.3 成本优势 (Cost Advantage - 满分25分)

**评分标准**:
| 指标 | 条件 | 得分 |
|------|------|------|
| 单位成本 | 低于行业中位数20%+ | +10分 |
| 规模效应 | 边际成本递减证据 | +8分 |
| 专有技术 | 专利/流程优势 | +7分 |

**数据来源**:
- 单位成本: 财报单位经济学披露、成本结构分析
- 规模效应: 多年数据显示单位成本随规模下降
- 专利: 专利数据库、技术壁垒分析

**实例**:
- Walmart: 物流成本低于行业30% → +10分
- Intel: 先进制程成本优势 → +7分

---

### 3.4 网络效应 (Network Effects - 满分15分)

**评分标准**:
| 类型 | 得分 |
|------|------|
| 多边平台 (买卖双方互相增强) | +8分 |
| 用户数增长带来价值指数增长 | +7分 |

**适用**: 支付网络、社交平台、交易所等

**实例**:
- Visa/Mastercard: 商户越多→消费者越用→商户更多 → +8分
- Meta: 用户数增长→内容更多→价值指数增长 → +7分

---

### 3.5 监管壁垒/无形资产 (Regulatory/Intangibles - 满分10分)

**评分标准**:
| 类型 | 得分 |
|------|------|
| 牌照/专利保护 | +5分 |
| 监管准入门槛 | +5分 |

**适用**: 金融、医疗器械、公用事业等

---

### 3.6 综合护城河评分

**总分计算**:
```
Total Moat Score = 定价权(25) + 转换成本(25) + 成本优势(25)
                 + 网络效应(15) + 监管壁垒(10)
```

**评级标准**:
| 总分 | 评级 | 含义 |
|------|------|------|
| ≥ 70 | Wide Moat | 宽护城河：强大且持久的竞争优势 |
| 50-69 | Narrow Moat | 窄护城河：一定竞争优势，但可能被侵蚀 |
| < 50 | No Moat | 无护城河：缺乏可持续竞争优势 |

---

## 四、资产负债表稳健性

### 4.1 杠杆与偿债能力

#### Debt-to-Equity Ratio
```
D/E = Total Debt / Total Equity
```

**评级**:
| D/E | 评级 | 含义 |
|-----|------|------|
| < 0.5 | Conservative | 低杠杆，财务稳健 |
| 0.5-1.0 | Moderate | 中等杠杆，合理水平 |
| 1.0-2.0 | Elevated | 较高杠杆，需关注 |
| > 2.0 | High | 高杠杆，财务风险较大 |

**行业调整**:
- 金融/REIT: 天然高杠杆（D/E > 5正常）
- 公用事业: 稳定现金流支撑高杠杆

#### Net Debt/EBITDA
```
Net Debt/EBITDA = (Total Debt - Cash) / EBITDA
```

**评级**:
| 比率 | 评级 | 含义 |
|------|------|------|
| < 2.0 | Excellent | 偿债能力优秀 |
| 2.0-3.0 | Good | 偿债能力良好 |
| 3.0-4.0 | Acceptable | 偿债能力可接受 |
| > 4.0 | Warning | 偿债压力较大 |

**数据来源**:
- EBITDA: 理想来自公司调整后EBITDA披露
- 简化计算: EBIT + D&A（折旧摊销）

---

### 4.2 Interest Coverage (利息覆盖率)

**计算公式**:
```
Interest Coverage = EBIT / Interest Expense
```

**评级标准**:
| 倍数 | 评级 | 含义 |
|------|------|------|
| > 5.0 | Excellent | 利息支付无压力 |
| 3.0-5.0 | Good | 利息覆盖良好 |
| 2.0-3.0 | Acceptable | 可接受，需关注趋势 |
| < 2.0 | Warning | 财务脆弱 |

**数据来源**: 10-K损益表

---

### 4.3 流动性指标

#### Current Ratio (流动比率)
```
Current Ratio = Current Assets / Current Liabilities
```
- **目标**: > 1.5
- **含义**: 短期偿债能力

#### Quick Ratio (速动比率)
```
Quick Ratio = (Current Assets - Inventory) / Current Liabilities
```
- **目标**: > 1.0
- **含义**: 不依赖存货即可偿还短期债务

#### Cash to Short-term Debt
```
Cash/STD = Cash / Short-term Debt
```
- **含义**: 现金对短期债务的覆盖倍数
- **目标**: > 1.0

---

### 4.4 债务到期结构分析

**从10-K提取**:
```
Note X - Debt
  Maturity Schedule:
  - 2026: $XXX million
  - 2027: $XXX million
  - 2028: $XXX million
  ...
```

**风险识别**:
- 某年到期 > 50%总债务 → "债务墙"，再融资风险
- 2026年集中到期 + 利率高位 → 高再融资成本

---

## 五、行业特殊调整

### 5.1 金融行业
- **不适用指标**: ROIC（资本结构特殊）
- **替代指标**: ROA, ROE, NIM (Net Interest Margin)
- **关键比率**:
  - Tier 1 Capital Ratio
  - Non-Performing Loan Ratio
  - Efficiency Ratio

### 5.2 REIT
- **核心指标**: FFO/AFFO而非净利润
- **杠杆**: 高D/E正常（3-5倍）
- **关键比率**: Cap Rate, Same-store NOI growth

### 5.3 负利润公司
- **不适用**: OCF/NI, FCF/NI, ROE, ROIC
- **替代关注**:
  - 现金跑道 (Cash / Monthly Burn Rate)
  - 收入增速
  - 单位经济学趋势

---

## 六、数据质量保障

### 6.1 数据信度分层

| 层级 | 来源 | 使用规则 |
|------|------|---------|
| Tier 1 | 公司财报、SEC文件、官方发布 | 直接引用 |
| Tier 2 | 知名机构报告、行业协会数据 | 交叉验证后可用 |
| Tier 3 | 媒体报道、社交媒体、匿名来源 | 仅作参考，不可作为核心论据 |

**核心数字至少需要Tier 2来源确认**

### 6.2 异常值处理

| 情况 | 处理方式 |
|------|---------|
| 数据缺失 | 标注为N/A，说明原因 |
| 极端异常值 | 标注异常，检查数据源 |
| 并购影响 | 使用调整后数据（剔除一次性影响）|
| 会计变更 | 标注会计政策变化影响 |

### 6.3 时效性标注

**每份报告必须标注**:
- 数据截止日期
- 财报周期（Q4 2023等）
- 最新数据点（如"含2024 Q1初步数据"）

---

## 七、计算验证清单

**输出前自检** (10项):

1. ✓ 所有公式正确标注
2. ✓ 数据来源清晰（10-K第X页或API字段）
3. ✓ 行业调整已执行（vs行业中位数）
4. ✓ 时间序列分析（5年趋势）
5. ✓ 异常值已处理/标注
6. ✓ 金融/REIT等特殊行业已调整
7. ✓ 负利润/负权益公司已特殊处理
8. ✓ 评级标准一致应用
9. ✓ 所有比率可复现（提供原始数据）
10. ✓ 数据截止日期已标注

---

## 八、引用格式

**财报引用**:
```
[数据点] 来源: [公司名] 10-K (FY2023), Page XX, [具体项目名]
示例: EBIT 来源: Tesla 10-K (FY2023), Page 45, Operating Income
```

**计算引用**:
```
[指标] = [公式] = [计算过程] = [结果]
示例: ROIC = NOPAT / Invested Capital = 9,207 / 62,634 = 14.7%
```

---

**编制**: 买方研究分析师
**审核**: 质量指标计算引擎v1.0
**最后更新**: 2026-01-25
