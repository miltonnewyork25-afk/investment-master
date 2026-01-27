# Top20 Screener Data Methodology
## 市场数据采集引擎 v2.0

**文档版本**: 2.0
**更新日期**: 2026-01-26
**作者**: Investment Research System

---

## 目录

1. [概述](#概述)
2. [数据来源](#数据来源)
3. [股票池定义](#股票池定义)
4. [数据字段说明](#数据字段说明)
5. [Sharpe Ratio计算方法](#sharpe-ratio计算方法)
6. [尾部风险指标](#尾部风险指标)
7. [数据质量标准](#数据质量标准)
8. [更新频率](#更新频率)

---

## 概述

本数据基础设施为Top20筛选系统提供3,000+美股的完整财务和市场数据,涵盖50+指标,包括:
- 估值指标 (P/E, P/B, EV/EBITDA等)
- 盈利能力指标 (毛利率, ROE, ROIC等)
- 现金流质量指标 (FCF, OCF/NI等)
- 资产负债表健康度
- 增长指标
- 风险调整收益指标 (Sharpe, Sortino, Calmar)
- 尾部风险指标 (MDD, VaR, CVaR)

---

## 数据来源

### 主要数据源

| 数据类型 | 来源 | API端点 | 更新频率 |
|---------|------|---------|---------|
| 公司信息 | FMP API | /profile | 日更 |
| 财务报表 | FMP API | /income-statement, /balance-sheet, /cash-flow | 季度 |
| 关键指标 | FMP API | /key-metrics-ttm, /ratios-ttm | 日更 |
| 历史价格 | FMP API | /historical-price-full | 日更 |
| 分析师数据 | FMP API | /analyst-estimates, /earnings-surprises | 周更 |

### 数据源优先级

1. **Tier 1 (直接引用)**: 公司10-K/10-Q报表、SEC文件
2. **Tier 2 (交叉验证后可用)**: FMP API、Bloomberg、FactSet
3. **Tier 3 (仅作参考)**: 媒体报道、研究员估计

---

## 股票池定义

### 筛选标准

```
Universe = S&P 500 + S&P 400 (Mid Cap) + 部分S&P 600

筛选条件:
├── 市值 ≥ $2B (排除小盘股流动性风险)
├── 日均成交量 ≥ $5M (确保流动性)
├── 上市时间 ≥ 3年 (需要历史数据)
└── 排除:
    ├── ADR (美国存托凭证)
    ├── SPAC (特殊目的收购公司)
    ├── 壳公司
    └── 临床阶段生物制药 (无收入)
```

### 市值分层

| 层级 | 市值范围 | 典型数量 |
|-----|---------|---------|
| Mega Cap | ≥$200B | ~30 |
| Large Cap | $10B-$200B | ~400 |
| Mid Cap | $2B-$10B | ~600 |

---

## 数据字段说明

### 1. 估值指标

| 字段 | 含义 | 计算方式 | 单位 |
|-----|------|---------|-----|
| pe_ratio_ttm | 市盈率(TTM) | 股价 / EPS(TTM) | 倍数 |
| pe_ratio_forward | 远期市盈率 | 股价 / 预期EPS | 倍数 |
| pb_ratio | 市净率 | 股价 / 每股净资产 | 倍数 |
| ps_ratio | 市销率 | 市值 / 收入(TTM) | 倍数 |
| ev_ebitda | EV/EBITDA | 企业价值 / EBITDA | 倍数 |
| ev_fcf | EV/FCF | 企业价值 / 自由现金流 | 倍数 |
| peg_ratio | PEG | P/E / 增长率 | 倍数 |
| fcf_yield | FCF收益率 | FCF / 市值 | 百分比 |

### 2. 盈利能力指标

| 字段 | 含义 | 计算方式 | 单位 |
|-----|------|---------|-----|
| gross_margin | 毛利率 | 毛利 / 收入 | 百分比 |
| operating_margin | 营业利润率 | 营业利润 / 收入 | 百分比 |
| net_margin | 净利润率 | 净利润 / 收入 | 百分比 |
| roe | 净资产收益率 | 净利润 / 股东权益 | 百分比 |
| roa | 总资产收益率 | 净利润 / 总资产 | 百分比 |
| roic | 投入资本回报率 | NOPAT / 投入资本 | 百分比 |

### 3. 现金流质量指标

| 字段 | 含义 | 计算方式 | 解读 |
|-----|------|---------|-----|
| fcf_ttm | 自由现金流(TTM) | OCF - CapEx | 美元 |
| ocf_to_net_income | 经营现金流/净利润 | OCF / Net Income | **<0.7为警告信号** |
| fcf_margin | FCF利润率 | FCF / 收入 | 百分比 |
| cash_flow_quality_warning | 现金流质量警告 | OCF/NI < 0.7 | 布尔值 |

**关键理解**: `ocf_to_net_income` 是检验利润质量的核心指标:
- 健康值: 0.8-1.2
- 警告值: <0.7 (利润未转化为现金)
- 异常值: >1.5 (可能有非经常性项目)

### 4. 资产负债表健康度

| 字段 | 含义 | 计算方式 | 解读 |
|-----|------|---------|-----|
| debt_to_equity | 债务/权益比 | 总债务 / 股东权益 | <1.0为健康 |
| current_ratio | 流动比率 | 流动资产 / 流动负债 | >1.5为健康 |
| quick_ratio | 速动比率 | (流动资产-存货) / 流动负债 | >1.0为健康 |
| interest_coverage | 利息覆盖率 | EBIT / 利息支出 | >5.0为健康 |
| net_debt_to_ebitda | 净债务/EBITDA | 净债务 / EBITDA | <3.0为健康 |

### 5. 增长指标

| 字段 | 含义 | 计算方式 | 单位 |
|-----|------|---------|-----|
| revenue_growth_yoy | 收入同比增长 | (本期-上期) / 上期 | 百分比 |
| revenue_growth_3y | 3年收入CAGR | (终值/初值)^(1/3) - 1 | 百分比 |
| revenue_growth_5y | 5年收入CAGR | (终值/初值)^(1/5) - 1 | 百分比 |
| eps_growth_3y | 3年EPS CAGR | 同上 | 百分比 |
| fcf_growth_yoy | FCF同比增长 | 同上 | 百分比 |

### 6. 股息指标

| 字段 | 含义 | 计算方式 | 单位 |
|-----|------|---------|-----|
| dividend_yield | 股息率 | 年度股息 / 股价 | 百分比 |
| payout_ratio | 派息率 | 股息 / EPS | 百分比 |
| dividend_growth_5y | 5年股息增长率 | CAGR计算 | 百分比 |

### 7. 质量指标

| 字段 | 含义 | 计算方式 | 解读 |
|-----|------|---------|-----|
| earnings_variability | 盈利波动性 | EPS标准差 / 平均EPS | <0.5为稳定 |
| revenue_variability | 收入波动性 | 收入标准差 / 平均收入 | <0.3为稳定 |
| analyst_beat_rate | 财报超预期率 | 超预期次数 / 总季度数 | >50%为优秀 |
| piotroski_f_score | Piotroski F评分 | 9项财务健康指标 | 8-9为优秀 |
| altman_z_score | Altman Z评分 | 破产风险模型 | >3.0为安全 |

---

## Sharpe Ratio计算方法

### 公式

```
Sharpe Ratio = (R_p - R_f) / σ_p

其中:
- R_p = 年化投资组合收益率
- R_f = 无风险利率 (10年美债收益率)
- σ_p = 年化收益率标准差
```

### 计算步骤

#### 步骤1: 获取历史价格
- 数据窗口: 过去N年日收益率 (N = 1, 3, 5)
- 使用调整后收盘价 (考虑分红和拆股)

#### 步骤2: 计算日对数收益率
```python
r_t = ln(P_t / P_{t-1})
```

对数收益率的优点:
- 时间可加性: ln(P2/P0) = ln(P2/P1) + ln(P1/P0)
- 短期内近似正态分布
- 复利处理正确

#### 步骤3: 计算年化收益率 (CAGR)
```python
total_return = P_end / P_start - 1
years = trading_days / 252
cagr = (1 + total_return)^(1/years) - 1
```

#### 步骤4: 计算年化波动率
```python
daily_volatility = std(daily_returns)
annual_volatility = daily_volatility × √252
```

#### 步骤5: 获取无风险利率
- **来源**: 10年期美国国债收益率
- **当前值**: ~4.5% (2026年1月)
- **更新频率**: 每日

#### 步骤6: 计算Sharpe
```python
sharpe = (cagr - risk_free_rate) / annual_volatility
```

### 时间窗口

| 窗口 | 交易日数 | 用途 |
|-----|---------|-----|
| 1年 | 252天 | 短期风险评估 |
| **3年** | 756天 | **主要筛选指标** |
| 5年 | 1260天 | 长期风险评估 |

### Sharpe解读基准

| Sharpe值 | 解读 |
|---------|------|
| < 0 | 跑输无风险利率 |
| 0-0.5 | 低于平均 |
| 0.5-1.0 | 可接受 |
| **1.0-1.5** | **良好** |
| 1.5-2.0 | 优秀 |
| > 2.0 | 卓越 (个股罕见) |

### 代码参考

```python
# 位置: /data/scripts/sharpe_calculator.py

def calculate_sharpe_ratio(symbol, lookback_days):
    prices = get_price_data(symbol, lookback_days)
    returns = np.log(prices / prices.shift(1)).dropna()

    total_return = prices.iloc[-1] / prices.iloc[0] - 1
    years = len(returns) / 252
    cagr = (1 + total_return) ** (1 / years) - 1

    annual_vol = returns.std() * np.sqrt(252)
    risk_free = 0.045  # 10Y Treasury

    sharpe = (cagr - risk_free) / annual_vol
    return sharpe
```

---

## 尾部风险指标

### 为什么需要尾部风险?

Sharpe比率的局限性:
1. 假设收益正态分布 (实际有肥尾)
2. 同等惩罚上行和下行波动
3. 可被杠杆或期权策略操纵

**Top20筛选约束**: 最大回撤 ≤ -30%

### 1. 最大回撤 (Maximum Drawdown)

**定义**: 从峰值到谷底的最大跌幅

```python
def calculate_max_drawdown(prices):
    running_max = prices.expanding().max()
    drawdown = (prices - running_max) / running_max
    max_dd = drawdown.min()
    return max_dd
```

**解读**:
| 最大回撤 | 风险等级 |
|---------|---------|
| > -20% | 低波动 |
| -20% ~ -30% | 中等波动 |
| -30% ~ -50% | 高波动 |
| < -50% | 极高波动 |

### 2. Sortino比率

**定义**: 仅惩罚下行波动的风险调整收益

```
Sortino = (R_p - R_f) / σ_下行
```

**优点**: 不惩罚正向波动,更适合非对称收益分布

### 3. Calmar比率

**定义**: 收益与最大回撤的比值

```
Calmar = CAGR / |Max_Drawdown|
```

**用途**: 对冲基金常用指标,衡量每单位回撤获得的收益

### 4. VaR (Value at Risk)

**定义**: 在给定置信水平下的最大损失

```
VaR_95% = 收益率的第5百分位
```

**解读**: "有95%的把握,单日损失不会超过这个数"

### 5. CVaR (Conditional VaR / Expected Shortfall)

**定义**: 超过VaR时的平均损失

```
CVaR_95% = E[r | r < VaR_95%]
```

**优点**: 比VaR更敏感于尾部风险

### 6. 上行/下行捕获率

**定义**:
- 上行捕获: 市场上涨时,股票涨幅占市场涨幅的比例
- 下行捕获: 市场下跌时,股票跌幅占市场跌幅的比例

**理想状态**: 高上行捕获 (>100%) + 低下行捕获 (<100%)

---

## 数据质量标准

### 完整性要求

| 字段类型 | 最低覆盖率 | 处理方式 |
|---------|----------|---------|
| 基础信息 | 100% | 缺失则排除 |
| 估值指标 | 90% | 缺失标记NULL |
| 现金流指标 | 85% | 缺失标记NULL |
| 风险指标 | 95% | 需价格数据 |

### 数据验证规则

1. **价格连续性**: 不允许>5交易日的价格缺口
2. **成交量一致性**: 平均日成交额 > $5M
3. **收益率合理性**: 日收益率在 [-50%, +100%] 范围内
4. **零收益检测**: 零收益天数 < 10%

### 异常值处理

- **Winsorization**: 收益率在99%百分位截断
- **缺失填充**: 最多前向填充5天,超过则标记为缺失
- **异常标记**: 不删除异常值,但添加警告标记

---

## 更新频率

| 数据类型 | 更新频率 | 触发条件 |
|---------|---------|---------|
| 股票池 | 季度 | 指数调整 |
| 价格数据 | 日更 | 收盘后 |
| 财务报表 | 季度 | 财报发布后3天 |
| 风险指标 | 周更 | 每周日计算 |
| Sharpe比率 | 周更 | 每周日计算 |

---

## 文件结构

```
/Users/milton/投资大师/Top20_Screener/data/
├── raw/
│   ├── financials/         # 原始财务数据JSON
│   ├── prices/             # 历史价格CSV
│   └── fundamentals/       # 基本面数据
├── processed/
│   ├── master_dataset.csv  # 主数据集(所有指标)
│   ├── sharpe_calculations.csv  # Sharpe计算结果
│   ├── tail_risk_metrics.csv    # 尾部风险指标
│   ├── valuation_metrics.csv    # 估值指标子集
│   ├── profitability_metrics.csv # 盈利能力子集
│   └── quality_metrics.csv      # 质量指标子集
├── universe/
│   ├── full_universe.csv        # 完整股票池
│   ├── sp500_constituents.csv   # S&P 500成分股
│   └── symbol_list.txt          # 股票代码列表
├── scripts/
│   ├── universe_builder.py      # 股票池构建
│   ├── comprehensive_data_collector.py # 数据采集
│   ├── sharpe_calculator.py     # Sharpe计算
│   ├── risk_calculator.py       # 风险计算
│   └── master_data_integrator.py # 数据整合
└── market_data.db               # SQLite数据库
```

---

## 参考文献

1. Sharpe, W.F. (1966). "Mutual Fund Performance". Journal of Business.
2. Sortino, F.A. & van der Meer, R. (1991). "Downside Risk". Journal of Portfolio Management.
3. Young, T.W. (1991). "Calmar Ratio: A Smoother Tool". Futures Magazine.
4. Artzner, P. et al. (1999). "Coherent Measures of Risk". Mathematical Finance.

---

**版本历史**:
- v2.0 (2026-01-26): 完整重构,增加50+指标,详细方法论
- v1.0 (2025-01-25): 初始版本

**维护者**: Investment Research System
**联系方式**: 参见项目README
