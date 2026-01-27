# 质量指标计算引擎 - 使用指南

**版本**: v1.0
**创建日期**: 2026-01-25
**用途**: 计算Top 20公司的基本面质量核心指标

---

## 目录

1. [概述](#概述)
2. [核心指标体系](#核心指标体系)
3. [文件说明](#文件说明)
4. [快速开始](#快速开始)
5. [数据输出](#数据输出)
6. [指标解读](#指标解读)
7. [行业调整](#行业调整)
8. [质量评级](#质量评级)

---

## 概述

质量指标计算引擎为投资决策提供四大类基本面质量评估：

1. **现金流质量** - 评估盈利能否转化为真实现金
2. **资本效率** - 评估资本使用效率和回报率
3. **护城河评分** - 量化竞争优势的强度和持久性
4. **资产负债表稳健性** - 评估财务风险和偿债能力

所有指标均基于公开财报数据，计算过程可验证，含公式说明和数据来源标注。

---

## 核心指标体系

### 1. 现金流质量指标 (Cash Flow Quality)

| 指标 | 公式 | 目标值 | 含义 |
|------|------|--------|------|
| **OCF/NI Ratio** | OCF / Net Income | ≥ 1.0 | 盈利质量，现金转化能力 |
| **FCF/NI Ratio** | (OCF - CapEx) / NI | ≥ 0.7 | 自由现金流转化 |
| **DSO** | (AR / Revenue) × 365 | 越低越好 | 应收账款周转天数 |
| **DIO** | (Inventory / COGS) × 365 | 越低越好 | 存货周转天数 |
| **DPO** | (AP / COGS) × 365 | 越高越好 | 应付账款周转天数 |
| **CCC** | DSO + DIO - DPO | < 60天 | 现金转换周期 |
| **CapEx Intensity** | CapEx / Revenue | 行业对比 | 资本支出强度 |

**关键警告信号**:
- OCF/NI < 0.8 连续2年 → 盈利质量存疑
- DSO大幅上升 + 收入增速放缓 → 可能虚增收入
- CCC恶化 → 营运资本效率下降

---

### 2. 资本效率指标 (Capital Efficiency)

| 指标 | 公式 | 优秀标准 | 含义 |
|------|------|---------|------|
| **ROIC** | NOPAT / Invested Capital | ≥ 15% | 投入资本回报率 |
| **ROE** | Net Income / Equity | ≥ 20% | 股东权益回报率 |
| **净利率** | NI / Revenue | ≥ 20% | 利润率（定价权） |
| **资产周转率** | Revenue / Assets | 行业对比 | 资产使用效率 |
| **权益乘数** | Assets / Equity | < 2.0 | 杠杆水平 |

**杜邦分解** - 识别ROE来源:
```
ROE = 净利率 × 资产周转率 × 权益乘数

高ROE来自:
✓ 高净利率 → 定价权（好）
✓ 高资产周转率 → 效率（好）
⚠ 高权益乘数 → 杠杆（需警惕）
```

**ROIC趋势分析**:
- 连续5年 > 15% → 强护城河证据
- ROIC > WACC → 创造价值
- ROIC持续上升 → 规模效应/竞争优势扩大

---

### 3. 护城河评分系统 (Moat Scoring)

**基于Morningstar五大护城河来源，0-100分量化评分**

#### 评分维度 (总分100)

| 维度 | 满分 | 评估内容 |
|------|------|---------|
| **定价权** | 25分 | 毛利率vs行业、品牌溢价、价格弹性 |
| **转换成本** | 25分 | 客户留存率、产品嵌入度、网络效应 |
| **成本优势** | 25分 | 单位成本、规模效应、专有技术 |
| **网络效应** | 15分 | 多边平台、价值指数增长 |
| **监管壁垒** | 10分 | 牌照保护、准入门槛 |

#### 评级标准

| 总分 | 评级 | 含义 | 投资启示 |
|------|------|------|---------|
| ≥ 70 | **Wide Moat** | 宽护城河，强大且持久的竞争优势 | 可长期持有，享受复利 |
| 50-69 | **Narrow Moat** | 窄护城河，一定优势但可能被侵蚀 | 需持续跟踪竞争动态 |
| < 50 | **No Moat** | 无护城河，缺乏可持续竞争优势 | 仅适合短期交易 |

#### 实例：Apple (71分 - Wide Moat)
- 定价权(18/25): 毛利率44%远超行业20%，品牌溢价显著
- 转换成本(25/25): 生态系统锁定，留存率92%
- 成本优势(20/25): 规模采购+自研芯片
- 网络效应(8/15): App Store生态

---

### 4. 资产负债表稳健性 (Balance Sheet Health)

| 指标 | 公式 | 安全标准 | 警告线 |
|------|------|---------|--------|
| **D/E** | Total Debt / Equity | < 1.0 | > 2.0 |
| **Net Debt/EBITDA** | (Debt - Cash) / EBITDA | < 3.0 | > 4.0 |
| **Interest Coverage** | EBIT / Interest Expense | > 5.0 | < 2.0 |
| **Current Ratio** | Current Assets / Current Liab | > 1.5 | < 1.0 |
| **Quick Ratio** | (CA - Inventory) / CL | > 1.0 | < 0.8 |

**行业调整**:
- 金融/REIT: D/E > 3.0正常（天然高杠杆）
- 公用事业: 稳定现金流支撑高杠杆
- 科技/消费: 应保持低杠杆（< 1.0）

---

## 文件说明

### 核心文件

| 文件名 | 用途 |
|--------|------|
| `quality_calculator.py` | 质量指标计算核心引擎（可复用） |
| `calculation_methodology.md` | 详细计算方法论（每个公式的数据来源和含义） |
| `demo_quality_analysis.py` | 演示脚本（批量计算示例） |
| `README.md` | 本文件，使用指南 |

### 输出文件 (CSV)

| 文件名 | 内容 |
|--------|------|
| `cash_flow_quality.csv` | 现金流质量指标（OCF/NI, CCC等） |
| `capital_efficiency.csv` | 资本效率指标（ROIC, ROE, 杜邦分解） |
| `balance_sheet_health.csv` | 资产负债表稳健性（杠杆、偿债能力） |
| `moat_scores.csv` | 护城河评分（定价权、转换成本等分项） |
| `quality_dashboard.csv` | 综合仪表板（所有核心指标汇总） |
| `quality_metrics_full.json` | 完整JSON（含所有详细信息） |

---

## 快速开始

### 方法1: 运行演示脚本

```bash
cd /Users/milton/投资大师/Top20_Screener/quality
python3 demo_quality_analysis.py
```

**输出**: 6家示例公司的完整质量分析 + CSV文件

---

### 方法2: 在代码中使用

```python
from quality_calculator import CompanyFinancials, QualityMetricsCalculator

# 1. 准备公司财务数据
company_data = CompanyFinancials(
    ticker='TSLA',
    company_name='Tesla Inc',
    sector='Consumer Cyclical',
    industry='Auto Manufacturers',

    # 损益表数据
    revenue=96773,
    net_income=14974,
    ebit=10831,
    gross_profit=17660,
    cost_of_revenue=79113,
    interest_expense=156,

    # 现金流量表数据
    operating_cash_flow=13256,
    capex=8903,
    free_cash_flow=4353,

    # 资产负债表数据
    total_assets=106618,
    total_equity=62634,
    total_debt=9572,
    current_assets=48704,
    current_liabilities=28748,
    cash=16398,
    accounts_receivable=3508,
    inventory=13626,
    accounts_payable=14431,
    short_term_debt=1804,

    tax_rate=0.15,
    data_date='2023-12-31'
)

# 2. 计算质量指标
calculator = QualityMetricsCalculator(company_data)
results = calculator.calculate_all_metrics()

# 3. 查看结果
print(f"ROIC: {results['capital_efficiency']['roic']['roic']}%")
print(f"OCF/NI: {results['cash_flow_quality']['ocf_to_ni_ratio']['ratio']}")
print(f"D/E: {results['balance_sheet_health']['leverage_metrics']['debt_to_equity']}")

# 4. 导出为DataFrame
df = calculator.export_to_dataframe()
df.to_csv('my_analysis.csv', index=False)
```

---

### 方法3: 护城河评分

```python
from quality_calculator import MoatScoring

moat = MoatScoring()

# 评估定价权
pricing_power = moat.score_pricing_power(
    gross_margin=44.1,
    gross_margin_trend='rising',
    industry_median_margin=20.0,
    brand_premium_evidence=True
)

# 评估转换成本
switching_costs = moat.score_switching_costs(
    customer_retention_rate=92,
    product_embedding='deep',
    network_effects=True
)

# 评估成本优势
cost_advantage = moat.score_cost_advantage(
    unit_cost_vs_industry=-15,
    scale_effects=True,
    proprietary_tech=True
)

# 综合评分
total_moat = moat.calculate_total_moat_score(
    pricing_power,
    switching_costs,
    cost_advantage,
    network_effects_score=8,
    regulatory_barriers_score=0
)

print(f"护城河评分: {total_moat['total_score']}/100")
print(f"评级: {total_moat['moat_rating']}")
```

---

## 数据输出

### 1. cash_flow_quality.csv

```csv
Ticker,Company,OCF_to_NI,OCF_NI_Rating,FCF_to_NI,CCC_Days,CapEx_Intensity
MSFT,Microsoft Corporation,1.210,Excellent,0.822,-2.6,0.1327
AAPL,Apple Inc,1.140,Good,1.027,-67.8,0.0286
NVDA,NVIDIA Corporation,0.956,Acceptable,0.450,119.4,0.0175
```

**关键字段**:
- `OCF_NI_Rating`: Excellent/Good/Acceptable/Warning
- `CCC_Days`: 负数表示先收钱后付款（优秀）
- `CapEx_Intensity`: 与行业对比判断资本密集度

---

### 2. capital_efficiency.csv

```csv
Ticker,Company,ROIC_%,ROIC_Rating,ROE_%,Profit_Margin_%,Asset_Turnover,Equity_Multiplier
NVDA,NVIDIA Corporation,109.82,Excellent,69.23,48.85,0.93,1.53
AAPL,Apple Inc,67.81,Excellent,156.08,25.31,1.09,5.68
MSFT,Microsoft Corporation,33.48,Excellent,30.37,34.16,0.51,1.73
```

**关键洞察**:
- **NVDA**: ROIC 109% = 超强资本效率 + 轻资产模式
- **AAPL**: ROE 156% = 高杠杆驱动（权益乘数5.68）
- **MSFT**: 均衡模式，高利润率+低杠杆

---

### 3. balance_sheet_health.csv

```csv
Ticker,Company,Debt_to_Equity,DE_Rating,Net_Debt/EBITDA,Interest_Coverage
NVDA,NVIDIA Corporation,0.23,Conservative,-0.49,128.30
META,Meta Platforms Inc,0.21,Conservative,0.11,64.49
MSFT,Microsoft Corporation,0.41,Conservative,0.11,44.98
AAPL,Apple Inc,1.79,Elevated,0.71,29.06
```

**风险评估**:
- D/E < 0.5 + Interest Coverage > 50 = 财务极稳健 (NVDA, META)
- D/E > 1.5 = 需警惕杠杆风险 (AAPL)

---

### 4. moat_scores.csv

```csv
Ticker,Company,Pricing_Power,Switching_Costs,Cost_Advantage,Total_Score,Moat_Rating
AAPL,Apple Inc,18,25,20,71,Wide Moat
NVDA,NVIDIA Corporation,22,18,23,68,Narrow Moat
MSFT,Microsoft Corporation,20,25,15,67,Narrow Moat
```

---

### 5. quality_dashboard.csv (综合仪表板)

**一站式查看所有核心指标**

```csv
Ticker,Company,Sector,OCF/NI,ROIC_%,D/E,OCF_Rating,ROIC_Rating,Leverage_Rating
MSFT,Microsoft,Technology,1.210,33.48,0.41,Excellent,Excellent,Conservative
NVDA,NVIDIA,Technology,0.956,109.82,0.23,Acceptable,Excellent,Conservative
```

---

## 指标解读

### 优质公司特征 (参考标准)

**现金流质量**:
- ✓ OCF/NI > 1.0 且稳定
- ✓ CCC < 60天 或 负值
- ✓ CapEx Intensity适配商业模式

**资本效率**:
- ✓ ROIC > 15% 连续5年
- ✓ ROE > 20%
- ✓ 净利率 > 20% (定价权证据)

**护城河**:
- ✓ 总分 ≥ 70 (Wide Moat)
- ✓ 定价权 + 转换成本 ≥ 40/50

**财务稳健**:
- ✓ D/E < 1.0 (非金融)
- ✓ Interest Coverage > 5.0
- ✓ Quick Ratio > 1.0

---

### 危险信号 (Red Flags)

| 指标异常 | 含义 | 行动 |
|---------|------|------|
| OCF/NI < 0.8 连续2年 | 利润质量差，可能虚增 | 深挖应收账款、存货 |
| ROIC < WACC | 摧毁价值 | 评估管理层能力 |
| D/E > 2.0 + Interest Cov < 2.0 | 财务脆弱 | 检查债务到期结构 |
| CCC大幅恶化 | 营运资本效率下降 | 分析DSO/DIO变化 |
| 护城河 < 50分 | 无竞争优势 | 仅适合短期交易 |

---

## 行业调整

### 科技/SaaS
- **关注**: NRR (Net Revenue Retention), Rule of 40
- **CapEx**: 应 < 10%
- **CCC**: 负值为佳（预收款模式）

### 制造/汽车
- **关注**: 产能利用率、单位成本趋势
- **CapEx**: 10-20%正常
- **ROIC**: > 10%即可接受（资本密集）

### 金融/银行
- **不适用**: ROIC（资本结构特殊）
- **替代指标**: ROA, ROE, NIM, Tier 1 Ratio
- **杠杆**: D/E > 5.0正常

### REIT
- **核心指标**: FFO/AFFO（非净利润）
- **杠杆**: D/E 3-5倍正常
- **关注**: Same-store NOI, Cap Rate

### 半导体
- **关注**: 技术领先度、客户集中度
- **CapEx**: 高（10-25%），但需带来技术优势
- **护城河**: 技术壁垒 > 规模优势

---

## 质量评级

### 综合质量评级体系

**A级 (优质)**:
- 现金流: OCF/NI > 1.0
- 资本效率: ROIC > 15%
- 护城河: ≥ 70分 (Wide Moat)
- 稳健性: D/E < 1.0

**示例**: MSFT, NVDA (在各自领域)

---

**B级 (良好)**:
- 现金流: OCF/NI 0.8-1.0
- 资本效率: ROIC 10-15%
- 护城河: 50-69分 (Narrow Moat)
- 稳健性: D/E 1.0-2.0

---

**C级 (可接受)**:
- 现金流: OCF/NI 0.6-0.8
- 资本效率: ROIC 5-10%
- 护城河: 40-49分
- 稳健性: D/E 2.0-3.0

**需警惕**: 需持续跟踪，避免恶化

---

**D级 (风险)**:
- 现金流: OCF/NI < 0.6
- 资本效率: ROIC < 5%
- 护城河: < 40分
- 稳健性: D/E > 3.0 或 Interest Cov < 2.0

**不建议投资**（除非特殊情况）

---

## 使用建议

### 1. 定期更新频率
- **季度**: 更新现金流、资本效率指标（财报发布后）
- **年度**: 更新护城河评分（竞争格局变化慢）
- **实时**: 监控杠杆指标（债务融资事件后）

### 2. 结合其他分析
- 质量指标 + 估值指标 → 完整投资决策
- 高质量 + 合理估值 = 优质标的
- 高质量 + 高估值 = 等待回调
- 低质量 + 低估值 = 价值陷阱

### 3. 趋势 > 单点数据
- 单季度异常可能是噪音
- 连续2-3个季度恶化 → 结构性问题
- 5年趋势 → 护城河真实性验证

### 4. 行业内对比
- 绝对值参考意义有限
- 行业相对排名更重要
- 识别行业内最优质公司

---

## 技术支持

### 问题排查

**Q: 计算出的ROIC为负或异常高？**
A: 检查负债是否为负、权益是否极小。金融公司不适用ROIC。

**Q: OCF/NI > 3.0 是好事吗？**
A: 不一定。可能是预收款（好），也可能是营运资本大幅波动（需进一步分析）。

**Q: 某公司CCC为负值，正常吗？**
A: 正常且优秀！负CCC表示先收钱后付款（如Amazon, Apple）。

**Q: 如何处理并购频繁的公司？**
A: 使用调整后数据，剔除一次性并购影响。关注有机增长的质量指标。

---

## 数据来源

### 推荐API
1. **Financial Modeling Prep (FMP)** - 本项目使用
2. **Alpha Vantage**
3. **Yahoo Finance**

### 手动数据提取
- 公司10-K/10-Q (SEC EDGAR)
- 投资者关系网站
- 季度财报演示文稿

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|---------|
| v1.0 | 2026-01-25 | 初始版本，完整四大类指标计算 |

---

## 贡献者

- **开发**: 买方研究分析师
- **方法论**: 基于Morningstar, McKinsey, 巴菲特投资框架
- **技术框架**: Python + Pandas + NumPy

---

## 许可证

内部使用 - 投资研究工具库

---

**最后更新**: 2026-01-25
**维护者**: 投资大师团队
**联系方式**: 见项目根目录
