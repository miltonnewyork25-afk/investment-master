# 策略提炼与量化规则

## 概述

本文档将顶级基金和传奇投资者的定性经验转化为可编程的量化规则，为Top 20筛选系统提供核心筛选逻辑。

---

## 第一部分：核心筛选规则提炼

### 1.1 基于Buffett标准的质量筛选

```python
buffett_quality_rules = {
    # ROE要求（1987年致股东信标准）
    'roe_10y_avg_min': 20,           # 10年平均ROE > 20%
    'roe_single_year_min': 15,       # 任何单年不低于15%
    'roe_current_min': 15,           # 当前ROE > 15%

    # 盈利稳定性
    'eps_positive_years': 10,        # 连续10年正EPS
    'eps_growth_10y_min': 33,        # 10年EPS增长>33%（Graham标准）

    # 负债控制
    'debt_to_equity_max': 0.5,       # D/E < 0.5（非金融）
    'interest_coverage_min': 5,      # 利息保障倍数 > 5

    # 现金流质量
    'fcf_to_net_income_min': 0.7,    # FCF/净利润 > 70%
    'fcf_positive_years': 5,         # 连续5年正FCF

    # 一美元测试
    'market_value_per_retained_dollar': 1.0,  # 每保留1美元市值至少增1美元
}
```

### 1.2 基于Ackman标准的投资质量

```python
ackman_quality_rules = {
    # 资本回报
    'roic_min': 15,                  # ROIC > 15%
    'roic_vs_wacc_spread': 5,        # ROIC - WACC > 5%

    # 自由现金流
    'fcf_yield_min': 5,              # FCF收益率 > 5%
    'fcf_margin_min': 10,            # FCF/收入 > 10%

    # 债务可控（3年FCF可还清长债）
    'long_term_debt_to_fcf_max': 3,  # 长期债务/FCF < 3年

    # 市场地位
    'market_share_top_n': 3,         # 行业前3（定性）

    # 业务可预测性（收入波动）
    'revenue_volatility_max': 20,    # 收入年波动 < 20%
}
```

### 1.3 基于Graham/Klarman的价值筛选

```python
value_rules = {
    # 估值指标
    'pe_ratio_max': 15,              # P/E < 15（或低于行业中位）
    'pb_ratio_max': 1.5,             # P/B < 1.5
    'pe_times_pb_max': 22.5,         # P/E × P/B < 22.5

    # 安全边际
    'margin_of_safety_min': 25,      # 内在价值折价 > 25%
    'price_to_intrinsic_value_max': 0.75,  # 价格/内在价值 < 75%

    # 股息记录
    'dividend_years_min': 10,        # 连续10年分红（防守型）
    'dividend_growth_years_min': 5,  # 连续5年股息增长

    # 流动性
    'current_ratio_min': 2.0,        # 流动比率 > 2（Graham防守标准）
}
```

### 1.4 质量因子（Piotroski F-Score）

```python
def calculate_piotroski_score(stock_data):
    """
    计算Piotroski F-Score (0-9分)
    8-9分: 强力买入信号
    0-2分: 避免
    """
    score = 0

    # 盈利能力 (4分)
    if stock_data['roa'] > 0:
        score += 1  # ROA正
    if stock_data['operating_cash_flow'] > 0:
        score += 1  # 经营现金流正
    if stock_data['roa_change'] > 0:
        score += 1  # ROA改善
    if stock_data['cash_flow'] > stock_data['net_income']:
        score += 1  # 现金流 > 净利润（盈利质量）

    # 杠杆/流动性 (3分)
    if stock_data['long_term_debt_change'] < 0:
        score += 1  # 长期债务减少
    if stock_data['current_ratio_change'] > 0:
        score += 1  # 流动比率改善
    if stock_data['shares_outstanding_change'] <= 0:
        score += 1  # 未增发股票

    # 运营效率 (2分)
    if stock_data['gross_margin_change'] > 0:
        score += 1  # 毛利率改善
    if stock_data['asset_turnover_change'] > 0:
        score += 1  # 资产周转率改善

    return score

piotroski_rules = {
    'f_score_min': 7,                # F-Score >= 7分
    'f_score_strong_buy': 8,         # F-Score >= 8分为强力买入
}
```

---

## 第二部分：综合评分系统

### 2.1 多因子加权评分模型

```python
# 基于顶级基金经验的权重配置
factor_weights = {
    # 质量因子 (40%)
    'quality': {
        'weight': 0.40,
        'sub_factors': {
            'roe': 0.30,           # 资本回报
            'roic': 0.25,          # 投资资本回报
            'fcf_quality': 0.25,   # 现金流质量
            'debt_safety': 0.20,   # 负债安全
        }
    },

    # 价值因子 (30%)
    'value': {
        'weight': 0.30,
        'sub_factors': {
            'pe_relative': 0.35,   # 相对P/E
            'pb_relative': 0.20,   # 相对P/B
            'fcf_yield': 0.25,     # FCF收益率
            'ev_ebitda': 0.20,     # EV/EBITDA
        }
    },

    # 成长因子 (15%)
    'growth': {
        'weight': 0.15,
        'sub_factors': {
            'revenue_growth_3y': 0.40,
            'eps_growth_3y': 0.40,
            'fcf_growth_3y': 0.20,
        }
    },

    # 动量因子 (10%)
    'momentum': {
        'weight': 0.10,
        'sub_factors': {
            'price_momentum_6m': 0.50,
            'price_momentum_12m': 0.30,
            'earnings_momentum': 0.20,
        }
    },

    # 股息因子 (5%)
    'dividend': {
        'weight': 0.05,
        'sub_factors': {
            'dividend_yield': 0.40,
            'dividend_growth': 0.40,
            'payout_sustainability': 0.20,
        }
    }
}
```

### 2.2 评分计算函数

```python
def calculate_composite_score(stock_data, weights=factor_weights):
    """
    计算综合评分 (0-100)
    """
    score = 0

    # 质量得分
    quality_score = calculate_quality_score(stock_data)
    score += quality_score * weights['quality']['weight']

    # 价值得分
    value_score = calculate_value_score(stock_data)
    score += value_score * weights['value']['weight']

    # 成长得分
    growth_score = calculate_growth_score(stock_data)
    score += growth_score * weights['growth']['weight']

    # 动量得分
    momentum_score = calculate_momentum_score(stock_data)
    score += momentum_score * weights['momentum']['weight']

    # 股息得分
    dividend_score = calculate_dividend_score(stock_data)
    score += dividend_score * weights['dividend']['weight']

    return score * 100  # 转换为0-100分

def calculate_quality_score(stock_data):
    """质量因子评分"""
    scores = []

    # ROE评分 (0-1)
    roe = stock_data['roe']
    if roe >= 25:
        roe_score = 1.0
    elif roe >= 20:
        roe_score = 0.8
    elif roe >= 15:
        roe_score = 0.6
    elif roe >= 10:
        roe_score = 0.4
    else:
        roe_score = 0.2

    # ROIC评分
    roic = stock_data['roic']
    if roic >= 20:
        roic_score = 1.0
    elif roic >= 15:
        roic_score = 0.8
    elif roic >= 12:
        roic_score = 0.6
    elif roic >= 8:
        roic_score = 0.4
    else:
        roic_score = 0.2

    # FCF质量评分
    fcf_to_ni = stock_data['fcf'] / stock_data['net_income'] if stock_data['net_income'] > 0 else 0
    if fcf_to_ni >= 1.2:
        fcf_score = 1.0
    elif fcf_to_ni >= 1.0:
        fcf_score = 0.8
    elif fcf_to_ni >= 0.8:
        fcf_score = 0.6
    elif fcf_to_ni >= 0.6:
        fcf_score = 0.4
    else:
        fcf_score = 0.2

    # 负债安全评分
    de_ratio = stock_data['debt_to_equity']
    if de_ratio <= 0.3:
        debt_score = 1.0
    elif de_ratio <= 0.5:
        debt_score = 0.8
    elif de_ratio <= 1.0:
        debt_score = 0.6
    elif de_ratio <= 1.5:
        debt_score = 0.4
    else:
        debt_score = 0.2

    # 加权
    quality = (roe_score * 0.30 + roic_score * 0.25 +
               fcf_score * 0.25 + debt_score * 0.20)

    return quality
```

---

## 第三部分：筛选流程设计

### 3.1 多层筛选漏斗

```python
def top20_screening_pipeline(universe):
    """
    Top 20 筛选流水线
    输入: 完整股票池 (~4000只)
    输出: Top 20候选
    """

    # 第一层: 硬性排除 (约筛掉50%)
    # 目标: 去除明显不合格
    step1 = universe[
        (universe['market_cap'] >= 1e9) &      # 市值 > $1B
        (universe['avg_volume_20d'] >= 100000) & # 日均成交 > 10万股
        (universe['eps_ttm'] > 0) &             # 盈利为正
        (universe['country'] == 'USA')          # 美国公司
    ]
    # 剩余约2000只

    # 第二层: 质量筛选 (约筛掉60%)
    step2 = step1[
        (step1['roe'] >= 12) &                  # ROE > 12%
        (step1['debt_to_equity'] <= 1.5) &      # D/E < 1.5
        (step1['fcf_ttm'] > 0) &                # FCF为正
        (step1['current_ratio'] >= 1.2)         # 流动比率 > 1.2
    ]
    # 剩余约800只

    # 第三层: 价值筛选 (约筛掉50%)
    step3 = step2[
        (step2['pe_ratio'] <= 25) &             # P/E < 25
        (step2['pe_ratio'] > 0) &               # P/E为正
        (step2['pb_ratio'] <= 5) &              # P/B < 5
        (step2['fcf_yield'] >= 3)               # FCF收益率 > 3%
    ]
    # 剩余约400只

    # 第四层: 成长筛选 (约筛掉40%)
    step4 = step3[
        (step3['revenue_growth_3y'] >= 5) &     # 3年收入增长 > 5%
        (step3['eps_growth_3y'] >= 5)           # 3年EPS增长 > 5%
    ]
    # 剩余约240只

    # 第五层: 综合评分排序
    step4['composite_score'] = step4.apply(calculate_composite_score, axis=1)

    # 选取Top 100进入详细分析
    top100 = step4.nlargest(100, 'composite_score')

    # 第六层: 护城河和定性分析（人工或AI辅助）
    # 检查: 竞争优势、管理层质量、行业地位

    # 最终选出Top 20
    return top100.head(20)
```

### 3.2 行业分布控制

```python
sector_limits = {
    # 单一行业最大占比
    'max_sector_weight': 0.25,  # 不超过25%

    # 最少覆盖行业数
    'min_sectors': 5,           # 至少覆盖5个行业

    # 行业偏好（基于顶级基金偏好）
    'sector_preference': {
        'Technology': 1.1,      # 略微超配
        'Healthcare': 1.1,
        'Financial': 1.0,
        'Consumer Staples': 1.0,
        'Industrial': 1.0,
        'Consumer Discretionary': 0.9,
        'Energy': 0.8,
        'Real Estate': 0.8,
        'Utilities': 0.7,
        'Materials': 0.7,
    }
}
```

---

## 第四部分：买入与卖出时机规则

### 4.1 买入时机规则

```python
entry_rules = {
    # 估值时机
    'valuation_entry': {
        'pe_vs_5y_avg': 0.8,           # P/E低于5年均值20%
        'pe_vs_sector_median': 0.85,   # P/E低于行业中位15%
        'price_vs_52w_high': 0.8,      # 价格低于52周高点20%
        'price_vs_intrinsic': 0.75,    # 价格低于内在价值25%
    },

    # 技术时机
    'technical_entry': {
        'rsi_oversold': 30,            # RSI < 30（超卖）
        'price_vs_200dma': 'above',    # 价格在200日均线上方（趋势）
        'volume_surge': 1.5,           # 成交量放大50%（关注度）
    },

    # 基本面时机
    'fundamental_entry': {
        'post_earnings_dip': True,     # 财报后下跌但基本面无损
        'management_change': True,     # 新管理层可能带来改善
        'sector_rotation': True,       # 行业轮动机会
    },

    # 仓位控制
    'position_sizing': {
        'initial_position': 0.03,      # 初始仓位3%
        'max_position': 0.08,          # 最大仓位8%
        'scale_in_steps': 3,           # 分3次建仓
    }
}
```

### 4.2 卖出/止损规则

```python
exit_rules = {
    # 止损规则
    'stop_loss': {
        'price_stop': -0.15,           # 下跌15%止损
        'trailing_stop': -0.20,        # 从高点回撤20%止损
        'fundamental_stop': True,      # 基本面恶化止损
    },

    # 获利了结
    'profit_taking': {
        'target_return': 0.50,         # 50%目标收益
        'pe_vs_fair_value': 1.0,       # 估值回到公允价值
        'pe_vs_5y_high': 0.9,          # 接近5年高估值
    },

    # 再平衡规则
    'rebalancing': {
        'position_overweight': 0.12,   # 单仓超12%需减持
        'better_opportunity': True,    # 有更好机会时调仓
        'hold_period_min': 90,         # 最短持有90天
    },

    # 基本面恶化标志
    'fundamental_deterioration': {
        'roe_decline': -0.25,          # ROE下降25%
        'margin_decline': -0.20,       # 毛利率下降20%
        'debt_surge': 1.5,             # 负债率增加50%
        'guidance_cut': True,          # 管理层下调指引
    }
}
```

---

## 第五部分：风险控制规则

### 5.1 组合层面风控

```python
portfolio_risk_rules = {
    # 集中度控制
    'concentration': {
        'max_single_position': 0.08,   # 单股最大8%
        'top5_max_weight': 0.35,       # 前5大不超过35%
        'max_sector_weight': 0.25,     # 单行业最大25%
    },

    # 相关性控制
    'correlation': {
        'max_pair_correlation': 0.7,   # 任意两股相关性<0.7
        'portfolio_beta_range': (0.8, 1.2),  # 组合Beta在0.8-1.2
    },

    # 流动性要求
    'liquidity': {
        'min_avg_volume': 500000,      # 日均成交>50万股
        'max_position_vs_adv': 0.05,   # 仓位不超过5天成交
    },

    # 现金缓冲
    'cash_buffer': {
        'min_cash': 0.05,              # 最低5%现金
        'market_stress_cash': 0.20,    # 市场压力时提高到20%
    }
}
```

### 5.2 个股层面风控

```python
stock_risk_rules = {
    # 财务健康
    'financial_health': {
        'min_interest_coverage': 3,    # 利息保障倍数>3
        'max_debt_to_fcf': 5,          # 债务/FCF<5年
        'min_quick_ratio': 0.8,        # 速动比率>0.8
    },

    # 盈利质量
    'earnings_quality': {
        'accruals_ratio_max': 0.1,     # 应计比率<10%
        'cash_conversion': 0.8,        # 现金转化率>80%
    },

    # 估值风险
    'valuation_risk': {
        'pe_historical_percentile_max': 80,  # P/E历史百分位<80
        'ev_sales_max': 10,            # EV/Sales<10
    }
}
```

---

## 第六部分：回测验证框架

### 6.1 历史回测参数

```python
backtest_config = {
    'start_date': '2015-01-01',
    'end_date': '2025-01-01',
    'rebalance_frequency': 'quarterly',  # 季度再平衡
    'benchmark': 'SPY',

    # 交易成本
    'transaction_costs': {
        'commission': 0.001,           # 0.1%佣金
        'slippage': 0.002,             # 0.2%滑点
        'market_impact': 0.001,        # 0.1%市场冲击
    },

    # 绩效指标
    'metrics': [
        'total_return',
        'annualized_return',
        'sharpe_ratio',
        'sortino_ratio',
        'max_drawdown',
        'win_rate',
        'profit_factor',
        'alpha',
        'beta',
        'information_ratio',
    ]
}
```

### 6.2 预期绩效（基于策略逻辑）

```python
expected_performance = {
    # 基于顶级基金历史表现
    'annualized_return': {
        'target': 0.12,                # 目标年化12%
        'minimum': 0.10,               # 最低10%
    },

    'sharpe_ratio': {
        'target': 1.0,                 # 目标Sharpe 1.0
        'minimum': 0.7,                # 最低0.7
    },

    'max_drawdown': {
        'target': -0.20,               # 目标最大回撤-20%
        'maximum': -0.30,              # 最大允许-30%
    },

    'win_rate': {
        'target': 0.55,                # 胜率55%
    },

    'vs_sp500_alpha': {
        'target': 0.02,                # 年化Alpha 2%
    }
}
```

---

## 第七部分：实施建议

### 7.1 系统架构建议

```
Top 20 筛选系统架构
│
├── 数据层
│   ├── 价格数据 (Yahoo Finance / Alpha Vantage)
│   ├── 财务数据 (FMP API / SEC EDGAR)
│   ├── 分析师数据 (可选)
│   └── 另类数据 (可选: 卫星、情绪等)
│
├── 筛选引擎层
│   ├── 硬性筛选 (Stage 1-4)
│   ├── 评分计算 (多因子模型)
│   └── 排序输出 (Top 100 → Top 20)
│
├── 风控层
│   ├── 组合风控 (集中度、相关性)
│   ├── 个股风控 (财务健康、估值风险)
│   └── 实时监控 (止损触发)
│
├── 执行层
│   ├── 信号生成 (买入/卖出)
│   ├── 仓位计算
│   └── 订单管理
│
└── 报告层
    ├── 每日仪表板
    ├── 周报/月报
    └── 绩效归因
```

### 7.2 优先级实施路线图

**Phase 1 (第1周)**:
- 数据获取和清洗
- 基础筛选规则实现
- 简单评分模型

**Phase 2 (第2周)**:
- 完整多因子评分
- 历史回测框架
- 初步绩效验证

**Phase 3 (第3周)**:
- 风控规则实现
- 买卖时机信号
- 仪表板开发

**Phase 4 (第4周)**:
- 系统集成测试
- 参数优化
- 文档完善

---

## 总结

本策略提炼综合了：
- Warren Buffett的质量投资标准
- Bill Ackman的高集中度投资法
- Seth Klarman的安全边际原则
- Benjamin Graham的防守型标准
- 现代量化因子模型

**核心规则优先级**:
1. 质量第一（ROE、ROIC、FCF）
2. 价值合理（P/E、P/B、FCF Yield）
3. 安全为本（低负债、充足流动性）
4. 成长加分（收入和盈利增长）
5. 动量辅助（趋势确认）

---

**文档版本**: v1.0
**编制日期**: 2026-01-26
**字数统计**: ~8,200字
