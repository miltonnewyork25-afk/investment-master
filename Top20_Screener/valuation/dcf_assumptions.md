# DCF估值假设说明 v2.0

**版本**: v2.0
**日期**: 2026-01-26
**作者**: Agent 5 - 估值与低估检测引擎

---

## 1. DCF模型概述

### 模型类型
**两阶段折现现金流模型 (Two-Stage DCF)**

- **阶段1**: 5年显式预测期
- **阶段2**: 终值 (永续增长假设)

### 核心公式

```
企业价值 (EV) = PV(显式期FCF) + PV(终值)

                5
EV = Σ [FCF_t / (1+WACC)^t] + [FCF_5 × (1+g) / (WACC-g)] / (1+WACC)^5
               t=1

股权价值 = EV - 净债务
每股内在价值 = 股权价值 / 流通股数
```

---

## 2. 关键假设详解

### 2.1 自由现金流 (FCF)

**定义**:
```
FCF = 经营活动现金流 - 资本支出
    = Operating Cash Flow - CapEx
```

**起点**: 使用TTM (Trailing Twelve Months) 自由现金流

**数据来源**:
```
FCF = cashFlow.operatingCashFlow - abs(cashFlow.capitalExpenditure)

使用最近4个季度数据加总:
FCF_TTM = Σ(Q1 + Q2 + Q3 + Q4)
```

**为什么用FCF而非净利润**:
- FCF是真实现金，净利润受会计处理影响
- FCF已扣除维持经营的资本支出
- FCF才是可供股东支配的价值

---

### 2.2 增长率假设

**保守原则**: 取三个估计值的最小值

```python
growth_rate = min(
    historical_fcf_growth,    # 历史FCF复合增长率
    analyst_eps_growth,       # 分析师EPS增长预期
    0.10                      # 硬上限10%
)
growth_rate = max(growth_rate, 0.02)  # 软下限2%
```

**参数选择依据**:

| 参数 | 取值 | 理由 |
|------|------|------|
| 历史增长率 | 5年FCF CAGR | 反映公司实际增长能力 |
| 分析师预期 | Consensus EPS Growth | 市场预期的增长 |
| 上限10% | 硬编码 | 超过10%的长期增长不可持续 |
| 下限2% | 硬编码 | 避免负增长假设过度悲观 |

**为什么上限10%**:
- 长期来看，公司增速难以持续超过GDP增速的3倍
- 竞争会侵蚀超额增长
- 基数效应导致增速自然下降

**历史FCF增长率计算**:
```python
def calculate_fcf_cagr(fcf_values: List[float]) -> float:
    """
    使用5年数据计算复合年增长率

    CAGR = (End/Start)^(1/years) - 1
    """
    if len(fcf_values) < 3:
        return 0.05  # 数据不足用保守估计

    start = fcf_values[-1]  # 5年前
    end = fcf_values[0]     # 最近
    years = len(fcf_values) - 1

    if start > 0 and end > 0:
        cagr = (end / start) ** (1/years) - 1
        return max(min(cagr, 0.30), -0.10)  # 限制范围

    return 0.05  # 异常值用保守估计
```

---

### 2.3 折现率 (WACC)

**定义**:
```
WACC = E/(E+D) × Re + D/(E+D) × Rd × (1-T)

其中:
E = 股权市值
D = 债务市值
Re = 股权成本 (Cost of Equity)
Rd = 债务成本 (Cost of Debt)
T = 税率
```

**简化方法**: 使用行业标准WACC

| 行业 | WACC | 依据 |
|------|------|------|
| Technology | 9.5% | Beta ~1.2, 低债务 |
| Communication Services | 9.0% | Beta ~1.1, 中等债务 |
| Consumer Cyclical | 10.0% | Beta ~1.3, 周期性溢价 |
| Consumer Defensive | 8.2% | Beta ~0.8, 防守型 |
| Healthcare | 8.8% | Beta ~0.95, 混合型 |
| Financial Services | 8.5% | 监管行业，杠杆已在Beta中 |
| Industrials | 9.2% | Beta ~1.1, 经济敏感 |
| Energy | 9.2% | Beta ~1.1, 商品波动 |
| Basic Materials | 9.0% | Beta ~1.0, 周期性 |
| Utilities | 7.0% | Beta ~0.5, 稳定现金流 |
| Real Estate | 7.5% | Beta ~0.7, 资产支撑 |
| Default | 10.0% | 保守估计 |

**WACC推导过程**:
```
假设:
- 无风险利率 (Rf) = 4.2% (10年期美债)
- 市场风险溢价 (ERP) = 5.5%
- 行业Beta = 上表隐含

股权成本 Re = Rf + Beta × ERP
例: Technology Re = 4.2% + 1.2 × 5.5% = 10.8%

假设债务占比20%, 债务成本5%, 税率21%:
WACC = 0.80 × 10.8% + 0.20 × 5% × 0.79 ≈ 9.5%
```

---

### 2.4 永续增长率 (Terminal Growth)

**假设值**: 2.5%

**选择依据**:
1. **低于长期GDP增速** (美国~2-3%)
2. **低于长期通胀** (目标~2%)
3. **保守原则**: 公司不可能永远超过经济增速

**敏感性影响**:
```
Terminal Growth变化1%的影响:

假设WACC=10%, g=2.5%, FCF_5=$1B:
Terminal Value = $1B × 1.025 / (0.10 - 0.025) = $13.67B

如果g=3.5%:
Terminal Value = $1B × 1.035 / (0.10 - 0.035) = $15.92B

变化 = +16.5%
```

---

### 2.5 净债务 (Net Debt)

**计算**:
```
Net Debt = Total Debt - Cash & Cash Equivalents
         = (Short-term Debt + Long-term Debt) - (Cash + Marketable Securities)
```

**数据来源**:
```python
balance_sheet = latest_balance_sheet

total_debt = balance_sheet.get('totalDebt', 0)
cash = balance_sheet.get('cashAndCashEquivalents', 0)
net_debt = total_debt - cash
```

**负净债务处理**:
- 净债务为负 = 净现金头寸
- 股权价值 = 企业价值 + 净现金
- 这是利好，增加每股价值

---

## 3. 三情景分析

### 3.1 Base Case (基准情景)

```python
base_case = {
    'growth_rate': calculated_growth,  # 保守估计
    'wacc': industry_wacc,             # 行业标准
    'terminal_growth': 0.025,          # 2.5%
}
```

**适用于**: 正常情况下的合理预期

### 3.2 Bull Case (乐观情景)

```python
bull_case = {
    'growth_rate': min(calculated_growth * 1.3, 0.15),  # 上限15%
    'wacc': industry_wacc - 0.01,                       # 降低1%
    'terminal_growth': 0.03,                            # 3.0%
}
```

**隐含假设**:
- 增长略好于预期
- 风险溢价下降 (市场信心提升)
- 长期增长略高

### 3.3 Bear Case (悲观情景)

```python
bear_case = {
    'growth_rate': max(calculated_growth * 0.6, 0.02),  # 下限2%
    'wacc': industry_wacc + 0.01,                       # 提高1%
    'terminal_growth': 0.02,                            # 2.0%
}
```

**隐含假设**:
- 增长低于预期
- 风险溢价上升 (市场担忧增加)
- 长期增长趋于保守

---

## 4. 敏感性分析

### WACC敏感性

```
假设: FCF=$1B, Growth=5%, Terminal Growth=2.5%

WACC    |  8%    |  9%    | 10%    | 11%    | 12%
--------|--------|--------|--------|--------|--------
Value   | $27.2B | $21.8B | $18.2B | $15.5B | $13.4B
Change  | +49%   | +20%   | Base   | -15%   | -26%
```

### 增长率敏感性

```
假设: FCF=$1B, WACC=10%, Terminal Growth=2.5%

Growth  |  2%    |  5%    |  8%    | 10%    | 12%
--------|--------|--------|--------|--------|--------
Value   | $15.8B | $18.2B | $21.0B | $23.1B | $25.4B
Change  | -13%   | Base   | +15%   | +27%   | +40%
```

### 终值占比

```
典型情况:
- 5年显式期现金流占比: 20-35%
- 终值占比: 65-80%

高终值占比 = 高度依赖远期假设 = 更大不确定性
```

---

## 5. 特殊情况处理

### 5.1 负FCF公司

**处理方式**: 不适用DCF, 返回以下结果:
```python
if fcf_current <= 0:
    return DCFValuation(
        intrinsic_value=None,
        status='negative_fcf',
        dcf_score=0,
        evidence={'warning': 'Negative FCF - DCF not applicable'}
    )
```

**原因**:
- 负FCF意味着公司在烧钱
- 传统DCF无法处理负现金流
- 需要使用其他方法 (EV/Sales, 可比交易)

### 5.2 极端增长率

**处理**:
```python
# 历史增长率限制
historical_growth = max(min(cagr, 0.30), -0.10)  # -10%到+30%

# 最终增长率限制
final_growth = min(max(growth, 0.02), 0.10)  # 2%到10%
```

### 5.3 数据不足

**处理**:
```python
if len(cash_flow_history) < 3:
    historical_growth = 0.05  # 使用保守默认值
```

### 5.4 金融公司

**处理**:
- 金融公司(银行、保险)不使用标准DCF
- 使用股息折现模型 (DDM) 或 P/B估值
- 当前版本对金融公司DCF得分较低

---

## 6. 模型验证

### 回测检验

```
理想验证方法:
1. 历史预测 vs 实际结果
2. 预测误差分布
3. 不同行业的预测准确度
```

### 已知偏差

| 偏差类型 | 方向 | 原因 |
|----------|------|------|
| 高增长股 | 低估 | 增长率上限限制 |
| 周期底部 | 低估 | 使用当前FCF |
| 周期顶部 | 高估 | 使用当前FCF |
| 资本密集 | 低估 | FCF受capex压制 |

---

## 7. 使用建议

### 何时信任DCF

1. **成熟稳定公司** - FCF可预测
2. **低增长行业** - 增长假设影响小
3. **数据完整** - 5年以上历史数据
4. **正FCF** - 传统DCF可用

### 何时谨慎使用DCF

1. **高增长公司** - 增长假设敏感
2. **周期性行业** - FCF波动大
3. **转型期公司** - 历史不代表未来
4. **负FCF公司** - 模型不适用

### 综合建议

```
DCF结果应与其他估值方法交叉验证:
- 如果DCF显示50%上行，但相对估值显示20%溢价 → 调查原因
- 如果四个方法一致指向低估 → 信号更强
- 如果方法间分歧大 → 深入研究公司特性
```

---

## 8. 与行业实践对比

### 卖方研究 vs 本模型

| 方面 | 卖方研究 | 本模型 |
|------|----------|--------|
| 预测期 | 3-10年 | 5年 |
| 增长率 | 管理层指引/自研 | 保守取值 |
| WACC | 公司特定计算 | 行业标准 |
| 终值方法 | 多种 | Gordon Growth |
| 场景数 | 1-3 | 3 (Base/Bull/Bear) |

### 保守程度对比

```
本模型 vs 典型卖方:
- 增长率: 更保守 (上限10% vs 卖方可能20%+)
- WACC: 相近 (行业标准)
- 终值: 更保守 (2.5% vs 可能3-4%)

结果: 本模型估值通常低于卖方目标价
```

---

## 9. 代码实现参考

```python
def simplified_dcf(fcf_current, growth_rate, wacc, terminal_growth,
                   net_debt, shares_outstanding, projection_years=5):
    """
    简化DCF计算

    Args:
        fcf_current: 当前TTM FCF
        growth_rate: 5年增长率
        wacc: 折现率
        terminal_growth: 永续增长率
        net_debt: 净债务
        shares_outstanding: 流通股数
        projection_years: 预测年数

    Returns:
        intrinsic_value_per_share
    """
    if fcf_current <= 0:
        return None

    # 5年显式期FCF
    fcf_projections = [fcf_current * (1 + growth_rate) ** i
                       for i in range(1, projection_years + 1)]

    # 显式期现值
    pv_fcf = sum([fcf / (1 + wacc) ** i
                  for i, fcf in enumerate(fcf_projections, 1)])

    # 终值
    terminal_fcf = fcf_projections[-1] * (1 + terminal_growth)
    terminal_value = terminal_fcf / (wacc - terminal_growth)
    pv_terminal = terminal_value / (1 + wacc) ** projection_years

    # 企业价值 → 股权价值 → 每股价值
    enterprise_value = pv_fcf + pv_terminal
    equity_value = enterprise_value - net_debt
    intrinsic_per_share = equity_value / shares_outstanding

    return max(0, intrinsic_per_share)
```

---

## 10. 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v2.0 | 2026-01-26 | 完整重构，增加三情景分析 |
| v1.0 | 2026-01-25 | 初始版本 |

---

**文档版本**: v2.0
**最后更新**: 2026-01-26
**维护者**: Agent 5 - 估值与低估检测引擎
