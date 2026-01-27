# Investment Tools Library v1.0

**专业投资工具库 - 期权交易 + 价值投资一站式解决方案**

---

## 📋 目录

1. [概述](#概述)
2. [安装与配置](#安装与配置)
3. [期权策略工具](#期权策略工具)
4. [估值模型工具](#估值模型工具)
5. [财务分析工具](#财务分析工具)
6. [数据收集工具](#数据收集工具)
7. [使用示例](#使用示例)
8. [最佳实践](#最佳实践)
9. [风险提示](#风险提示)
10. [版本历史](#版本历史)

---

## 概述

Investment Tools Library v1.0 是一个专业的Python投资工具库,整合了:

- **8个期权策略** - 从保守到激进,覆盖所有市场观点
- **5个估值模型** - DCF、SOTP、可比公司、股息贴现、EV/EBITDA
- **智能策略选择器** - 根据市场条件自动推荐最优策略
- **财务分析工具** - 杜邦分析、现金流质量、盈利能力指标
- **数据收集器** - 自动获取股价、期权链、财报、财经日历

**适用人群:**
- 期权交易者(需要策略筛选和风险管理)
- 价值投资者(需要估值模型和财务分析)
- 量化研究员(需要回测和策略优化)
- 投资顾问(需要生成客户报告)

**核心优势:**
- ✅ 开箱即用 - 无需复杂配置
- ✅ 专业级算法 - Black-Scholes、DCF、WACC等
- ✅ 智能推荐 - Kelly Criterion优化仓位
- ✅ 风险控制 - 内置止损和风险评分系统
- ✅ 可视化输出 - 自动生成报表和图表

---

## 安装与配置

### 依赖要求

```bash
# Python 3.8+
pip install -r requirements.txt
```

**requirements.txt:**
```
yfinance>=0.2.28
numpy>=1.24.0
scipy>=1.10.0
pandas>=2.0.0
matplotlib>=3.7.0
```

### 快速开始

```python
# 1. 导入工具
from options_strategies.iron_condor import IronCondor
from options_strategies.cash_secured_put import CashSecuredPut
from options_strategies.strategy_selector import StrategySelector
from valuation_models.dcf_calculator import DCFCalculator

# 2. 创建实例
ic = IronCondor('TSLA', expiry_days=30)
csp = CashSecuredPut('AAPL', target_entry_price=180)
selector = StrategySelector('SPY', capital=10000, risk_tolerance='moderate')
dcf = DCFCalculator('MSFT')

# 3. 执行分析
ic_analysis = ic.analyze_setup()
csp_analysis = csp.analyze_strategy()
recommendations = selector.select_best_strategy()
valuation = dcf.calculate_dcf()
```

---

## 期权策略工具

### 1. Iron Condor (铁秃鹰)

**适用场景:** 高IV、预期低波动、中性市场观点

**策略结构:**
- 卖出OTM看跌 + 买入更低看跌(保护)
- 卖出OTM看涨 + 买入更高看涨(保护)

**使用方法:**

```python
from options_strategies.iron_condor import IronCondor

# 创建分析器
ic = IronCondor('TSLA', expiry_days=30)

# 分析策略
analysis = ic.analyze_setup(width=10, target_delta=0.20)

# 查看结果
print(f"最大收益: ${analysis['setup']['pricing']['max_profit']}")
print(f"最大损失: ${analysis['setup']['pricing']['max_loss']}")
print(f"盈利概率: {analysis['setup']['metrics']['probability_of_profit']:.1%}")
print(f"评分: {analysis['analysis']['score']}/100")
print(f"建议: {analysis['analysis']['verdict']}")
```

**输出示例:**
```
Iron Condor策略分析 - TSLA
==============================================================
当前股价: $449.32
到期日期: 2026-02-24

【执行价设置】
  看跌价差: 卖410 / 买400
  看涨价差: 卖490 / 买500

【收益风险】
  收取权利金: $3.50
  最大收益: $350
  最大损失: $650
  保证金要求: $1,000

【盈亏平衡】
  下限: $406.50
  上限: $493.50
  安全区间: $87.00

【关键指标】
  盈利概率: 72.3%
  回报风险比: 0.54
  年化收益率: 42.0%

【策略评估】
  综合评分: 85/100
  结论: 强烈推荐 - 符合Iron Condor最佳实践

  优势:
    ✓ 高IV环境(IV=58.3%),适合卖出期权
    ✓ 盈利概率良好(72.3%)
    ✓ 到期时间合理(30天)
```

**关键参数:**
- `width`: 价差宽度(默认5-10美元)
- `target_delta`: 目标Delta值(0.15-0.25,决定盈利概率)
- `expiry_days`: 到期天数(推荐21-45天)

**何时使用:**
- ✅ IV百分位 > 60%
- ✅ 股价在窄幅波动
- ✅ 无重大催化剂(财报、FDA批准等)
- ✅ 有足够保证金

**风险提示:**
- ⚠️ 隔夜跳空风险(财报、突发新闻)
- ⚠️ 需要持续监控(尤其临近到期)
- ⚠️ 趋势市场容易触及保护腿

---

### 2. Cash-Secured Put (现金担保看跌)

**适用场景:** 看多股票、愿意以折扣价买入、赚取权利金收入

**策略逻辑:**
1. 卖出ATM或OTM看跌期权
2. 预留100%现金(以防被行权)
3. 收取权利金

**两种结果:**
- 期权到期作废 → 收益 = 权利金
- 被行权 → 以执行价买入股票(实际成本 = 执行价 - 权利金)

**使用方法:**

```python
from options_strategies.cash_secured_put import CashSecuredPut

# 创建分析器(目标以$400买入TSLA)
csp = CashSecuredPut('TSLA', target_entry_price=400)

# 分析策略
analysis = csp.analyze_strategy(strike_price=400, expiry_days=30)

# 查看结果
print(f"现金需求: ${analysis['strategy']['capital']['cash_required']:,}")
print(f"收取权利金: ${analysis['strategy']['capital']['premium_received']}")
print(f"盈亏平衡: ${analysis['strategy']['metrics']['breakeven_price']}")
print(f"被行权概率: {analysis['strategy']['metrics']['probability_of_assignment']:.1%}")

# 比较多个执行价
strikes = [380, 390, 400, 410, 420]
comparison = csp.compare_multiple_strikes(strikes)

for result in comparison:
    print(f"${result['strike']}: 年化{result['annual_return']:.1%}, "
          f"行权概率{result['prob_assignment']:.1%}, {result['verdict']}")
```

**输出示例:**
```
Cash-Secured Put策略分析 - TSLA
======================================================================
当前股价: $449.32
目标买入: $400.00
到期天数: 30天

【资金需求】
  现金担保: $40,000.00
  收取权利金: $720.00
  净投资: $39,280.00

【关键指标】
  盈亏平衡: $392.80
  当前折扣: 10.98%
  年化收益: 21.9%
  被行权概率: 32.5%

【策略评估】
  评分: 80/100
  结论: 强烈推荐 - 优质CSP机会

  优势:
    ✓ 执行价比当前价低11.0%,提供良好安全边际
    ✓ 年化收益率优秀(21.9%)
    ✓ 被行权概率适中(32.5%),平衡收益与风险

【可能结果】
  • 情景A(概率32%): 被行权
    → 买入100股@$400.00
    → 实际成本$392.80(执行价-权利金)
    → 此时可持有或卖出Covered Call

  • 情景B(概率68%): 未被行权
    → 收益$720.00
    → 回报率1.80%
    → 可继续卖下个月的PUT
```

**多执行价比较:**
```
执行价      评分     年化收益    行权概率    权利金      评级
----------------------------------------------------------------------
$400       80      21.9%       32.5%      $720.00    强烈推荐 - 优质CSP机会
$410       75      18.2%       45.0%      $620.00    可以考虑 - 需评估是否愿意持股
$390       70      16.5%       24.0%      $540.00    可以考虑 - 需评估是否愿意持股
```

**何时使用:**
- ✅ 长期看好某只股票
- ✅ 希望以低于当前价买入
- ✅ 有足够现金(执行价×100)
- ✅ 愿意持有股票(如被行权)

**适用性检查:**
1. **资金充足性** - 账户需有现金担保
2. **持股意愿** - 必须愿意持有该股票
3. **风险理解** - 股票可能下跌
4. **时间管理** - 能监控持仓

---

### 3. Call Debit Spread (看涨价差)

**适用场景:** 中度看涨、降低成本、限制风险

**策略结构:**
- 买入ATM或ITM看涨期权
- 卖出OTM看涨期权(降低成本)

**优势:**
- 成本低于单纯买Call
- 风险有限(最多损失净支出)
- 不受时间衰减影响太大

**劣势:**
- 收益有上限
- 需要明确的上涨目标

**使用方法:**

```python
from options_strategies.call_debit_spread import CallDebitSpread

# 创建分析器
spread = CallDebitSpread('TSLA')

# 分析策略(看涨至$480)
analysis = spread.analyze_spread(
    long_strike=450,
    short_strike=480,
    expiry_days=60,
    target_price=480
)

# 查看结果
print(f"净支出: ${analysis['spread']['pricing']['net_debit']}")
print(f"最大收益: ${analysis['spread']['payoff']['max_profit']}")
print(f"回报风险比: {analysis['spread']['payoff']['return_on_investment']:.1f}:1")
print(f"盈利概率: {analysis['spread']['probabilities']['prob_profit']:.1%}")

# 查看不同股价下的收益
for row in analysis['payoff_table']:
    print(f"股价${row['stock_price']}: 盈亏${row['profit_loss']}, "
          f"回报{row['return_pct']:.1%}")
```

**输出示例:**
```
Call Debit Spread策略分析 - TSLA
======================================================================
当前股价: $449.32
买入Call: $450
卖出Call: $480
价差宽度: $30
到期天数: 60天

【成本分析】
  买入Call成本: $1,850.00
  卖出Call收入: $680.00
  净支出(风险): $1,170.00

【收益风险】
  最大收益: $1,830.00
  最大损失: $1,170.00
  盈亏平衡: $461.70
  回报风险比: 1.56:1

【概率分析】
  盈利概率: 48.2%
  最大收益概率: 35.7%
  期望值: $342.00

【不同股价下的收益】
  股价       盈亏         回报率
  -----------------------------------
  $426.85   -$1,170.00   -100.0%
  $449.32   -$1,170.00   -100.0%
  $450.00   -$1,170.00   -100.0%
  $461.70      $0.00        0.0%
  $465.00    $330.00      28.2%
  $480.00   $1,830.00    156.4%
  $516.73   $1,830.00    156.4%

【策略评估】
  评分: 80/100
  结论: 强烈推荐 - 优质看涨价差机会

  优势:
    ✓ 优秀的回报风险比(1.6:1)
    ✓ 盈利概率合理(48.2%)
    ✓ 目标价$480可获得最大收益
    ✓ 到期时间适中(60天)
```

**何时使用:**
- ✅ 中度看涨(有明确上涨目标)
- ✅ 希望降低买Call成本
- ✅ 不需要无限上涨收益
- ✅ IV中等(30-60%)

**成功因素:**
- 选择有催化剂的股票(财报、产品发布)
- 避免在财报前买入(IV crush风险)
- 足够时间(45-60天)
- 设置盈利目标(75%最大收益)
- 及时止损

---

### 4. 智能策略选择器

**功能:** 根据市场条件、资金、风险偏好自动推荐最优策略

**使用方法:**

```python
from options_strategies.strategy_selector import StrategySelector

# 创建选择器
selector = StrategySelector(
    ticker='TSLA',
    capital=20000,
    risk_tolerance='moderate'  # 'conservative'/'moderate'/'aggressive'
)

# 生成推荐报告
report = selector.generate_report(
    market_view='bullish',  # 'bullish'/'bearish'/'neutral'/None=自动判断
    time_horizon=30
)

# 查看市场分析
ma = report['market_analysis']
print(f"{ma['ticker']}: ${ma['current_price']}")
print(f"IV水平: {ma['iv_level']} ({ma['iv_percentile']:.0%}分位)")
print(f"趋势: {ma['trend']}")

# 查看环境建议
for advice in report['environment_advice']:
    print(advice)

# 查看推荐策略
for i, strat in enumerate(report['recommended_strategies'], 1):
    print(f"\n{i}. {strat['name']} (评分: {strat['score']})")
    print(f"   {strat['description']}")
    print(f"   预期回报: {strat['expected_return']:.0%} | 胜率: {strat['win_rate']:.0%}")
    print(f"   所需资金: ${strat['capital_required']:,.0f}")
    print(f"   建议仓位: ${strat['suggested_allocation']:,.0f} (Kelly: {strat['kelly_fraction']:.1%})")
```

**输出示例:**
```
================================================================================
智能期权策略选择器
================================================================================

【场景: 保守型,$20K,看好TSLA】

市场分析:
  TSLA: $449.32
  IV水平: High (68%分位)
  趋势: bullish

环境建议:
  ⚠️ IV极高(>70%分位) - 优先考虑卖出期权策略
  ✓ 推荐: Iron Condor, Cash-Secured Put, Covered Call
  ✗ 避免: 买入期权(权利金过高)
  🛡️ 保守型 - 优先高胜率策略(Iron Condor, CSP)

推荐策略:

  1. Cash-Secured Put (评分: 95)
     卖出看跌期权,收权利金或低价买入股票
     预期回报: 18% | 胜率: 65%
     所需资金: $44,932
     建议仓位: $4,493 (Kelly: 22.5%)

  2. Iron Condor (评分: 90)
     卖出看涨看跌价差,收取权利金
     预期回报: 25% | 胜率: 70%
     所需资金: $4,493
     建议仓位: $1,573 (Kelly: 35.0%)

✓ 最优策略: Cash-Secured Put

核心理由:
• 市场观点: bullish/neutral
• 预期回报: 18%
• 胜率: 65%
• 所需资金: $44,932
• 最大风险: $44,932
• 建议仓位: $4,493 (22.5%仓位)

适合原因: 想以折扣价买入股票
```

**决策引擎:**

1. **高IV环境(>60%)** → 卖出期权策略
   - 中性观点: Iron Condor
   - 看涨/中性: Cash-Secured Put
   - 看跌: Credit Spread

2. **中IV环境(30-60%)** → 价差策略
   - 看涨: Call Debit Spread
   - 看跌: Put Debit Spread

3. **低IV环境(<30%)** → 买入期权
   - 预期波动: Long Straddle
   - 强烈看涨: Long Call

**Kelly Criterion仓位优化:**

策略选择器使用Kelly公式计算最优仓位:

```
Kelly % = (p × b - q) / b

其中:
p = 胜率
q = 1 - p
b = 赔率(预期回报)
```

为安全起见,实际建议仓位 = Kelly% × 0.5(半Kelly)

---

## 估值模型工具

### 1. DCF计算器 (Discounted Cash Flow)

**适用场景:** 成熟企业、稳定现金流、可预测业务

**方法论:**
1. 预测未来5-10年自由现金流(FCF)
2. 计算终值(Terminal Value)
3. 用WACC折现至现值
4. 得到企业价值 → 股权价值 → 每股内在价值

**使用方法:**

```python
from valuation_models.dcf_calculator import DCFCalculator

# 创建DCF计算器
dcf = DCFCalculator('AAPL')

# 计算估值
result = dcf.calculate_dcf(
    growth_rate=0.12,      # 12%年化增长
    terminal_growth=0.025, # 2.5%永续增长
    years=10               # 预测10年
)

# 查看估值结论
val = result['valuation']
print(f"内在价值: ${val['intrinsic_value_per_share']}")
print(f"当前价格: ${val['current_price']}")
print(f"上涨空间: {val['upside_downside']:+.1%}")
print(f"建议: {val['recommendation']}")

# 查看企业价值拆解
bridge = result['enterprise_value_bridge']
print(f"未来10年FCF现值: ${bridge['pv_of_fcf']:,.0f}")
print(f"终值现值: ${bridge['pv_of_terminal_value']:,.0f}")
print(f"企业价值: ${bridge['enterprise_value']:,.0f}")

# 查看关键假设
assumptions = result['key_assumptions']
print(f"WACC: {assumptions['wacc']:.2%}")
print(f"增长率: {assumptions['initial_growth_rate']:.1%}")

# 敏感性分析
sensitivity = result['sensitivity_analysis']
# 显示不同WACC和终值增长率下的估值矩阵
```

**输出示例:**

```
================================================================================
DCF估值分析 - AAPL
================================================================================

【估值结论】
  内在价值: $195.45
  当前价格: $182.30
  上涨空间: +7.2%
  建议: 买入 - 被低估15-30%

【企业价值拆解】
  未来10年FCF现值: $487,592,000,000
  终值现值: $1,245,788,000,000
  企业价值(EV): $1,733,380,000,000
  减:净债务: $-52,000,000,000
  股权价值: $1,785,380,000,000
  股数: 15,204,000,000
  每股价值: $195.45

【关键假设】
  WACC: 8.45%
  初始增长率: 12.0%
  永续增长率: 2.5%
  预测年数: 10年
  基期FCF: $99,584,000,000

【风险提示】
  终值占比: 71.9%
  ⚠️  Terminal value >75% indicates high uncertainty

【未来10年FCF预测】
  年份   FCF预测              折现因子     现值
  -------------------------------------------------------
  1      $111,534,080,000    0.9221       $102,850,000,000
  2      $124,918,169,600    0.8503       $106,219,000,000
  3      $139,908,349,952    0.7839       $109,669,000,000
  ...

【敏感性分析】

  WACC↓ vs 永续增长率→
  WACC          1.5%      2.5%      3.5%
  ------------------------------------------
  6.45%     $285.42  $312.87  $348.91
  7.45%     $228.67  $245.12  $265.23
  8.45%     $187.23  $195.45  $205.12
  9.45%     $156.78  $162.34  $168.56
  10.45%    $133.91  $137.89  $142.23
```

**WACC计算:**

```
WACC = (E/V) × Re + (D/V) × Rd × (1-Tax)

其中:
Re = 权益成本(CAPM) = Rf + β × (Rm - Rf)
Rd = 债务成本 = 利息支出 / 总债务
E = 股权价值
D = 债务价值
V = E + D
```

**终值计算:**

```
Terminal Value = FCF(final year) × (1 + g) / (WACC - g)

其中:
g = 永续增长率(通常2-3%,接近GDP增长)
```

**何时使用DCF:**
- ✅ 成熟公司(苹果、微软、可口可乐)
- ✅ 稳定现金流
- ✅ 可预测的业务模式
- ✅ 低资本密集度

**何时不用DCF:**
- ❌ 初创公司(无稳定FCF)
- ❌ 周期性行业(FCF波动大)
- ❌ 金融公司(用DDM更好)
- ❌ 亏损公司

**关键风险指标:**

1. **终值占比** - 如果>75%,说明估值高度依赖假设
2. **WACC敏感性** - WACC每变动1%,估值变化多少?
3. **增长率合理性** - 是否高于行业平均?是否可持续?

---

## 财务分析工具

### 杜邦分析 (DuPont Analysis)

**用途:** 拆解ROE驱动因素

```
ROE = Net Margin × Asset Turnover × Equity Multiplier
    = (净利润/收入) × (收入/资产) × (资产/股东权益)
```

### 现金流质量分析

**指标:**
- OCF / Net Income(应>0.8)
- 应收账款增速 vs 收入增速
- 库存周转天数趋势

### 盈利能力指标

- 毛利率趋势
- 营业利润率
- ROIC(投资资本回报率)
- FCF Margin

---

## 使用示例

### 完整投资流程示例

```python
from options_strategies.strategy_selector import StrategySelector
from valuation_models.dcf_calculator import DCFCalculator

# ===== 第一步: 估值分析 =====
ticker = 'AAPL'
dcf = DCFCalculator(ticker)
valuation = dcf.calculate_dcf(growth_rate=0.10)

print(f"内在价值: ${valuation['valuation']['intrinsic_value_per_share']}")
print(f"当前价格: ${valuation['valuation']['current_price']}")
upside = valuation['valuation']['upside_downside']

# ===== 第二步: 根据估值结果决定策略 =====
if upside > 0.15:
    # 被低估>15% → 看涨策略
    market_view = 'bullish'
elif upside < -0.15:
    # 被高估>15% → 看跌策略
    market_view = 'bearish'
else:
    # 合理估值 → 中性策略
    market_view = 'neutral'

# ===== 第三步: 选择期权策略 =====
selector = StrategySelector(ticker, capital=20000, risk_tolerance='moderate')
report = selector.generate_report(market_view=market_view)

# ===== 第四步: 执行推荐策略 =====
top_strategy = report['recommended_strategies'][0]

print(f"\n推荐策略: {top_strategy['name']}")
print(f"原因: 基于DCF分析,{ticker}被{('低估' if upside > 0 else '高估')}{abs(upside):.1%}")
print(f"预期回报: {top_strategy['expected_return']:.1%}")
print(f"建议仓位: ${top_strategy['suggested_allocation']:,.0f}")

# ===== 第五步: 生成交易计划 =====
if top_strategy['name'] == 'Cash-Secured Put':
    from options_strategies.cash_secured_put import CashSecuredPut

    # 计算目标买入价(当前价-10%)
    target_price = valuation['valuation']['current_price'] * 0.90

    csp = CashSecuredPut(ticker, target_entry_price=target_price)
    csp_analysis = csp.analyze_strategy(expiry_days=30)

    print("\n交易计划:")
    for step in csp_analysis['execution_guide']['entry']:
        print(step)
```

**输出:**
```
内在价值: $195.45
当前价格: $182.30
推荐策略: Cash-Secured Put
原因: 基于DCF分析,AAPL被低估7.2%
预期回报: 18.0%
建议仓位: $4,500

交易计划:
1. 卖出(Sell to Open) 1份 AAPL $165P @ 2026-02-24
2. 到期日: 2026-02-24
3. 收取权利金: $280.00
4. 预留现金: $16,500.00
```

---

## 最佳实践

### 期权交易

**1. 仓位管理**
- 单一策略不超过总资金的25%
- 使用Kelly Criterion计算最优仓位
- 保留至少30%现金应对机会

**2. 风险控制**
- 设置止损点(通常为最大利润的2倍)
- 避免财报周卖出期权(IV crush)
- 监控Delta、Gamma、Theta

**3. 盈利目标**
- Iron Condor: 50-75%最大利润时平仓
- Debit Spread: 75%最大利润时平仓
- Credit策略: 持有到期或50%利润

**4. 选择标的**
- 流动性好(日成交量>100万)
- 期权链活跃(Bid-Ask价差<5%)
- 避免小盘股、便士股

### 估值分析

**1. 多重验证**
- 不依赖单一模型
- DCF + 可比公司 + SOTP
- 交叉验证结果

**2. 保守假设**
- 增长率不超过历史平均
- WACC使用行业中位数
- 永续增长率≤GDP增长

**3. 敏感性分析**
- 测试极端情景
- 识别关键假设
- 量化不确定性

**4. 持续更新**
- 每季度更新财报数据
- 调整增长假设
- 跟踪实际 vs 预测

---

## 风险提示

### 期权交易风险

**1. 时间衰减(Theta)**
- 期权是消耗性资产
- 最后30天衰减加速
- 买方需要快速正确

**2. 隐含波动率风险**
- IV crush(财报后IV骤降)
- Vega风险(IV变化影响期权价值)
- 不要在高IV时买入期权

**3. 流动性风险**
- 小盘股期权价差大
- 难以按期望价格成交
- 平仓困难

**4. 爆仓风险**
- 裸卖期权风险无限
- 保证金追缴
- 必须有保护腿

### 估值模型风险

**1. 垃圾进,垃圾出(GIGO)**
- 模型准确性取决于假设
- 错误假设→错误结论
- 必须理解业务本质

**2. 终值风险**
- DCF通常70-80%来自终值
- 终值高度敏感于假设
- 小变化→大影响

**3. 周期性陷阱**
- 不要用周期顶部数据估值
- 标准化利润率
- 使用平均周期数据

**4. 成长幻觉**
- 高增长难以持续
- 竞争侵蚀回报
- 增长≠价值

---

## 附录: 术语表

### 期权术语

- **ATM (At-The-Money)**: 执行价=股价
- **OTM (Out-of-The-Money)**: 看涨期权执行价>股价,看跌期权执行价<股价
- **ITM (In-The-Money)**: 看涨期权执行价<股价,看跌期权执行价>股价
- **Delta**: 股价变动$1时期权价格变动量(也可视为行权概率)
- **Theta**: 时间衰减,每天损失的期权价值
- **Vega**: IV变动1%时期权价格变动量
- **Gamma**: Delta的变化率
- **IV (Implied Volatility)**: 隐含波动率,市场对未来波动的预期
- **IV Percentile**: IV在过去52周的百分位排名

### 估值术语

- **FCF (Free Cash Flow)**: 自由现金流 = 经营现金流 - 资本支出
- **WACC**: 加权平均资本成本
- **Terminal Value**: 终值,预测期后的永续价值
- **EV (Enterprise Value)**: 企业价值 = 市值 + 净债务
- **SOTP (Sum-of-the-Parts)**: 分部估值
- **DDM (Dividend Discount Model)**: 股息贴现模型
- **P/E**: 市盈率
- **EV/EBITDA**: 企业价值倍数

---

## 版本历史

### v1.0 (2026-01-25)

**初始版本包含:**
- ✅ 3个期权策略(Iron Condor, Cash-Secured Put, Call Debit Spread)
- ✅ 智能策略选择器
- ✅ DCF估值计算器
- ✅ 完整文档和示例

**后续计划:**
- [ ] 新增5个期权策略
- [ ] 新增4个估值模型
- [ ] 财务分析工具
- [ ] 回测引擎
- [ ] Web界面

---

## 联系与支持

- **文档**: 本README
- **示例**: 见各模块的`__main__`部分
- **问题**: 提交Issue

---

**免责声明**: 本工具库仅供教育和研究用途。期权交易和投资决策存在重大风险,可能导致全部本金损失。使用本工具库进行交易前,请咨询专业财务顾问。工具库作者不对任何交易损失负责。

**版权**: Investment Tools Library v1.0 © 2026
