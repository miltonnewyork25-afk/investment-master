# 因子回测报告
**生成日期**: 2026-01-26 11:28:13
**回测期间**: 2020-01-01 至 2025-12-31

---
## 执行摘要
- 高度有效因子 (***): 20 个
- 有效因子 (**): 0 个
- 弱有效因子 (*): 5 个
- 无效因子 (-): 0 个

---
## 单因子有效性排名

| 排名 | 因子 | 类别 | 年化Alpha | Sharpe | 最大回撤 | t统计量 | 有效性 |
|------|------|------|-----------|--------|----------|---------|--------|
| 1 | roic | quality | -1.7% | 5.36 | -0.2% | 11.88 | *** |
| 2 | net_margin | quality | -5.9% | 5.32 | -0.3% | 11.81 | *** |
| 3 | piotroski_f_score | composite | -16.1% | 5.04 | -0.1% | 11.18 | *** |
| 4 | ocf_to_net_income | quality | -14.4% | 5.01 | -0.0% | 11.10 | *** |
| 5 | gross_margin | quality | -14.8% | 4.77 | -0.3% | 10.58 | *** |
| 6 | roe | quality | 2.7% | 4.26 | -0.4% | 9.45 | *** |
| 7 | operating_margin | quality | -7.8% | 4.11 | -0.4% | 9.11 | *** |
| 8 | interest_coverage | quality | -3.8% | 4.00 | -0.3% | 8.87 | *** |
| 9 | current_ratio | quality | -1.9% | 3.34 | -0.2% | 7.40 | *** |
| 10 | earnings_momentum | momentum | -6.5% | 3.11 | -0.7% | 6.90 | *** |
| 11 | institutional_ownership | smart_money | 4.7% | 3.04 | -0.5% | 6.73 | *** |
| 12 | price_momentum_6m | momentum | -6.8% | 2.71 | -0.8% | 6.02 | *** |
| 13 | fcf_yield | value | -8.8% | 2.65 | -0.4% | 5.89 | *** |
| 14 | dividend_yield | value | -1.8% | 2.64 | -0.6% | 5.86 | *** |
| 15 | revenue_growth | growth | -10.7% | 2.64 | -0.8% | 5.86 | *** |
| 16 | price_momentum_12m | momentum | -10.3% | 2.31 | -1.3% | 5.13 | *** |
| 17 | insider_buying | smart_money | -14.5% | 2.25 | -0.9% | 4.99 | *** |
| 18 | earnings_yield | value | -1.0% | 1.96 | -0.8% | 4.35 | *** |
| 19 | fcf_growth | growth | -11.4% | 1.96 | -1.8% | 4.34 | *** |
| 20 | eps_growth | growth | -2.0% | 1.66 | -1.7% | 3.68 | *** |
| 21 | pb_ratio | value | -11.3% | -1.90 | -12.6% | -4.21 | * |
| 22 | short_interest | smart_money | -6.2% | -2.32 | -14.5% | -5.14 | * |
| 23 | pe_ratio | value | -8.1% | -3.04 | -16.3% | -6.73 | * |
| 24 | ev_ebitda | value | -16.7% | -3.43 | -15.7% | -7.61 | * |
| 25 | debt_to_equity | quality | -16.1% | -4.96 | -17.5% | -11.01 | * |

---
## 按因子类别分析

### QUALITY 因子

- 平均Sharpe: 3.47
- 平均Alpha: -7.1%
- 最佳因子: roic (Sharpe: 5.36)

### COMPOSITE 因子

- 平均Sharpe: 5.04
- 平均Alpha: -16.1%
- 最佳因子: piotroski_f_score (Sharpe: 5.04)

### MOMENTUM 因子

- 平均Sharpe: 2.71
- 平均Alpha: -7.9%
- 最佳因子: earnings_momentum (Sharpe: 3.11)

### SMART_MONEY 因子

- 平均Sharpe: 0.99
- 平均Alpha: -5.3%
- 最佳因子: institutional_ownership (Sharpe: 3.04)

### VALUE 因子

- 平均Sharpe: -0.19
- 平均Alpha: -8.0%
- 最佳因子: fcf_yield (Sharpe: 2.65)

### GROWTH 因子

- 平均Sharpe: 2.09
- 平均Alpha: -8.0%
- 最佳因子: revenue_growth (Sharpe: 2.64)


---
## 最优因子组合

基于历史回测，最优因子组合为：

| 因子 | 权重 | Sharpe贡献 |
|------|------|------------|
| roic | 7.9% | 0.42 |
| net_margin | 7.8% | 0.42 |
| piotroski_f_score | 7.4% | 0.37 |
| ocf_to_net_income | 7.4% | 0.37 |
| gross_margin | 7.0% | 0.33 |
| roe | 6.3% | 0.27 |
| operating_margin | 6.0% | 0.25 |
| interest_coverage | 5.9% | 0.23 |
| current_ratio | 4.9% | 0.16 |
| earnings_momentum | 4.6% | 0.14 |

---
## 因子使用建议

1. **价值因子** (FCF Yield, P/E) 在熊市表现更好
2. **质量因子** (ROE, ROIC) 提供稳定的长期Alpha
3. **动量因子** 短期有效但需要高换手率
4. **组合使用**多类别因子可以降低单一因子风险
5. **定期再平衡** (月度或季度) 可以提升策略表现
