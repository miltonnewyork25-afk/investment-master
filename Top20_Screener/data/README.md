# Top20 Screener - 市场数据采集引擎

## 概述

本目录包含Top20筛选系统的完整数据基础设施，包括：
- **503只美股**的完整财务和市场数据
- **79个数据字段**涵盖估值、盈利、现金流、风险等维度
- **Sharpe Ratio + 尾部风险指标**用于风险调整收益筛选

---

## 快速开始

### 1. 使用主数据集

```python
import pandas as pd

# 加载主数据集
df = pd.read_csv('/Users/milton/投资大师/Top20_Screener/data/processed/master_dataset.csv')

# 筛选高Sharpe + 低MDD的股票
qualified = df[
    (df['sharpe_3y'] >= 1.0) &
    (df['max_drawdown_3y'] >= -0.30)
]

print(f"符合条件: {len(qualified)} stocks")
```

### 2. 更新数据

```bash
# 更新Sharpe计算
python3 /Users/milton/投资大师/Top20_Screener/data/scripts/sharpe_calculator.py

# 更新尾部风险
python3 /Users/milton/投资大师/Top20_Screener/data/scripts/risk_calculator.py

# 整合所有数据
python3 /Users/milton/投资大师/Top20_Screener/data/scripts/master_data_integrator.py
```

---

## 目录结构

```
/Users/milton/投资大师/Top20_Screener/data/
├── processed/                    # 处理后的数据（主要使用）
│   ├── master_dataset.csv        # 主数据集（503只股票 x 79字段）
│   ├── sharpe_calculations.csv   # Sharpe计算详情
│   ├── tail_risk_metrics.csv     # 尾部风险指标
│   ├── mdd_qualified_stocks.csv  # 通过MDD阈值的股票（99只）
│   ├── mdd_excluded_stocks.csv   # 未通过MDD阈值的股票
│   ├── sharpe_summary.json       # Sharpe统计摘要
│   └── risk_summary.json         # 风险统计摘要
├── scripts/                      # 数据采集和计算脚本
│   ├── universe_builder.py       # 股票池构建器
│   ├── comprehensive_data_collector.py  # 50+指标数据采集
│   ├── sharpe_calculator.py      # Sharpe Ratio计算引擎
│   ├── risk_calculator.py        # 尾部风险计算引擎
│   └── master_data_integrator.py # 数据整合器
├── universe/                     # 股票池定义
│   ├── full_universe.csv         # 完整股票池
│   └── sp500_constituents.csv    # S&P 500成分股
├── raw/                          # 原始数据存储
│   ├── financials/               # 财务数据JSON
│   ├── prices/                   # 历史价格CSV
│   └── fundamentals/             # 基本面数据
├── market_data.db                # SQLite数据库
├── methodology.md                # 完整方法论文档
└── README.md                     # 本文件
```

---

## 核心数据字段

### 估值指标
| 字段 | 含义 | 覆盖率 |
|-----|------|--------|
| market_cap | 市值 | 100% |
| enterprise_value | 企业价值 | 100% |
| ev_fcf | EV/FCF | 92% |
| fcf_yield | FCF收益率 | 100% |

### 盈利能力
| 字段 | 含义 | 覆盖率 |
|-----|------|--------|
| gross_margin | 毛利率 | 100% |
| operating_margin | 营业利润率 | 100% |
| net_margin | 净利润率 | 100% |
| roe | 净资产收益率 | 100% |
| roic | 投入资本回报率 | 100% |

### 风险调整收益
| 字段 | 含义 | 覆盖率 |
|-----|------|--------|
| sharpe_1y | 1年Sharpe | 100% |
| sharpe_3y | 3年Sharpe（主要） | 99% |
| sharpe_5y | 5年Sharpe | 98% |
| sortino_ratio | Sortino比率 | 100% |
| calmar_ratio | Calmar比率 | 100% |

### 尾部风险
| 字段 | 含义 | 覆盖率 |
|-----|------|--------|
| max_drawdown_3y | 3年最大回撤 | 100% |
| var_95_daily | 95% VaR（日） | 100% |
| cvar_95_daily | 95% CVaR（日） | 100% |
| beta | 市场Beta | 100% |
| upside_capture | 上行捕获率 | 100% |
| downside_capture | 下行捕获率 | 100% |

---

## Sharpe Ratio计算方法

### 公式
```
Sharpe = (R_p - R_f) / σ_p

其中:
- R_p = 年化收益率（CAGR）
- R_f = 无风险利率（10年美债，4.5%）
- σ_p = 年化波动率
```

### 关键参数
- **数据窗口**: 1年/3年/5年
- **无风险利率**: 4.5%（10年美债，2026-01）
- **年化方法**: 日收益率 × √252
- **数据来源**: FMP API调整后收盘价

### 解读基准
| Sharpe | 解读 |
|--------|------|
| < 0 | 跑输无风险利率 |
| 0-0.5 | 低于平均 |
| 0.5-1.0 | 可接受 |
| **1.0-1.5** | **良好（Top20门槛）** |
| > 1.5 | 优秀 |

---

## MDD阈值筛选

**Top20约束**: 最大回撤 ≤ -30%

这是为了防止高Sharpe但危险的股票进入Top20：
- 某些股票可能通过杠杆或特殊策略获得高Sharpe
- 但其尾部风险巨大（MDD可能达-70%+）
- 通过MDD约束排除这些"危险高Sharpe"股票

### 当前统计
- **通过MDD阈值**: 99只股票（19.6%）
- **未通过**: 403只股票
- **平均MDD**: -44.3%
- **最差MDD**: -99%
- **最好MDD**: -17.2%

---

## 数据更新

### 更新频率建议
| 数据类型 | 频率 | 命令 |
|---------|------|------|
| 价格数据 | 日更 | `python3 data_collector.py` |
| Sharpe | 周更 | `python3 sharpe_calculator.py` |
| 尾部风险 | 周更 | `python3 risk_calculator.py` |
| 财务报表 | 季度 | 财报发布后运行 |

### 完整更新流程
```bash
cd /Users/milton/投资大师/Top20_Screener

# 1. 更新价格和财务数据（如需要）
python3 scripts/data_collector.py

# 2. 重新计算Sharpe
python3 data/scripts/sharpe_calculator.py

# 3. 重新计算尾部风险
python3 data/scripts/risk_calculator.py

# 4. 整合所有数据
python3 data/scripts/master_data_integrator.py
```

---

## 数据质量

### 覆盖率统计
- **总股票数**: 503只
- **完整数据**: 502只（99.8%）
- **Sharpe覆盖**: 499只（99.0%）
- **风险指标覆盖**: 501只（99.6%）

### 质量检查
- 缺失字段标记为NULL（不做填充）
- 异常值通过Winsorization处理（99%分位截断）
- 价格数据缺口最多前向填充5天

---

## 方法论文档

详细的计算方法论请参见:
- `/Users/milton/投资大师/Top20_Screener/data/methodology.md`
- `/Users/milton/投资大师/Top20_Screener/data/sharpe_calculation_methodology.md`

---

## API配置

本系统使用FMP (Financial Modeling Prep) API。API密钥已配置在各脚本中:
```python
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h7FVfb"
```

**速率限制**: 3000请求/分钟，脚本中设置20ms延迟。

---

## 版本信息

- **版本**: 2.0
- **更新日期**: 2026-01-26
- **数据截止**: 2026-01-25
- **股票数量**: 503只（S&P 500主体）

---

## 联系方式

如有问题，请参考项目主README或提交Issue。
