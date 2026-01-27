# Investment Tools Library v1.0 - 快速开始指南

**5分钟上手专业投资工具库**

---

## 安装

```bash
# 1. 进入工具库目录
cd Investment_Tools_Library_v1.0

# 2. 安装依赖
pip install -r requirements.txt

# 3. 测试安装
python example_usage.py
```

---

## 最常用的5个工具

### 1️⃣ 智能策略选择器 - 自动推荐最优期权策略

```python
from options_strategies.strategy_selector import StrategySelector

# 输入:股票代码、资金、风险偏好
selector = StrategySelector('TSLA', capital=10000, risk_tolerance='moderate')

# 自动推荐策略
report = selector.generate_report()

# 查看结果
print(f"最优策略: {report['recommended_strategies'][0]['name']}")
print(f"预期回报: {report['recommended_strategies'][0]['expected_return']:.0%}")
print(f"建议仓位: ${report['recommended_strategies'][0]['suggested_allocation']:,.0f}")
```

**何时使用:** 不知道用什么期权策略时,让AI帮你选

---

### 2️⃣ DCF估值计算器 - 计算股票内在价值

```python
from valuation_models.dcf_calculator import DCFCalculator

# 输入股票代码
dcf = DCFCalculator('AAPL')

# 计算估值
result = dcf.calculate_dcf()

# 查看结果
print(f"内在价值: ${result['valuation']['intrinsic_value_per_share']:.2f}")
print(f"当前价格: ${result['valuation']['current_price']:.2f}")
print(f"上涨空间: {result['valuation']['upside_downside']:+.1%}")
print(f"建议: {result['valuation']['recommendation']}")
```

**何时使用:** 判断股票是被低估还是高估

---

### 3️⃣ Iron Condor - 高IV环境赚权利金

```python
from options_strategies.iron_condor import IronCondor

# 创建分析器
ic = IronCondor('TSLA', expiry_days=30)

# 分析策略
analysis = ic.analyze_setup()

# 查看结果
print(f"最大收益: ${analysis['setup']['pricing']['max_profit']:.2f}")
print(f"盈利概率: {analysis['setup']['metrics']['probability_of_profit']:.1%}")
print(f"评分: {analysis['analysis']['score']}/100")

# 查看执行步骤
for step in analysis['execution_plan']['entry']:
    print(step)
```

**何时使用:** IV高(>60%分位)、预期横盘、想赚权利金

---

### 4️⃣ Cash-Secured Put - 以折扣价买入股票

```python
from options_strategies.cash_secured_put import CashSecuredPut

# 创建分析器(想以$400买入TSLA)
csp = CashSecuredPut('TSLA', target_entry_price=400)

# 分析策略
analysis = csp.analyze_strategy()

# 查看结果
print(f"年化收益: {analysis['strategy']['metrics']['annual_return']:.1%}")
print(f"被行权概率: {analysis['strategy']['metrics']['probability_of_assignment']:.1%}")

# 比较多个执行价
strikes = [380, 400, 420]
comparison = csp.compare_multiple_strikes(strikes)
for r in comparison:
    print(f"${r['strike']}: 年化{r['annual_return']:.1%}, 评分{r['score']}")
```

**何时使用:** 看好某股票,希望以更低价买入,或赚权利金

---

### 5️⃣ 可比公司估值 - 相对估值分析

```python
from valuation_models.comparable_companies import ComparableCompanyAnalysis

# 设置目标公司和同行
comp = ComparableCompanyAnalysis(
    target_ticker='TSLA',
    peer_tickers=['F', 'GM', 'TM']  # 福特、通用、丰田
)

# 分析
analysis = comp.analyze()

# 查看结果
print(f"相对同行: {analysis['relative_valuation']['overall_assessment']}")
if 'average' in analysis['valuations']:
    print(f"隐含价格: ${analysis['valuations']['average']['implied_price']:.2f}")
    print(f"上涨空间: {analysis['valuations']['average']['upside']:+.1%}")
```

**何时使用:** 想知道股票相对同行是贵还是便宜

---

## 完整工作流程示例

```python
from options_strategies.strategy_selector import StrategySelector
from valuation_models.dcf_calculator import DCFCalculator

# 第一步: 估值分析
ticker = 'AAPL'
dcf = DCFCalculator(ticker)
valuation = dcf.calculate_dcf()

upside = valuation['valuation']['upside_downside']
print(f"DCF分析: {ticker}被{'低估' if upside > 0 else '高估'}{abs(upside):.1%}")

# 第二步: 根据估值决定市场观点
if upside > 0.15:
    market_view = 'bullish'
elif upside < -0.15:
    market_view = 'bearish'
else:
    market_view = 'neutral'

# 第三步: 选择期权策略
selector = StrategySelector(ticker, capital=20000, risk_tolerance='moderate')
report = selector.generate_report(market_view=market_view)

# 第四步: 执行推荐策略
top = report['recommended_strategies'][0]
print(f"\n推荐: {top['name']}")
print(f"理由: {ticker}被{'低估' if upside > 0 else '高估'}{abs(upside):.1%}")
print(f"仓位: ${top['suggested_allocation']:,.0f}")
```

---

## 目录结构

```
Investment_Tools_Library_v1.0/
├── README.md                    # 完整文档(8,000+字)
├── QUICKSTART.md                # 本文件
├── requirements.txt             # 依赖包
├── example_usage.py             # 完整示例
│
├── options_strategies/          # 期权策略
│   ├── iron_condor.py          # Iron Condor
│   ├── cash_secured_put.py     # Cash-Secured Put
│   ├── call_debit_spread.py    # Call Debit Spread
│   └── strategy_selector.py    # 智能选择器 ⭐
│
├── valuation_models/            # 估值模型
│   ├── dcf_calculator.py       # DCF估值 ⭐
│   └── comparable_companies.py # 可比公司
│
└── templates/                   # 模板
    ├── investment_memo_template.md
    └── trade_journal_template.md
```

---

## 常见使用场景

### 场景1: 高IV时想卖期权赚权利金

```python
# 方法1: 让AI自动选择
selector = StrategySelector('TSLA', capital=10000, risk_tolerance='conservative')
report = selector.generate_report()
# 如果IV高,会自动推荐Iron Condor或CSP

# 方法2: 直接用Iron Condor
ic = IronCondor('TSLA', expiry_days=30)
analysis = ic.analyze_setup()
if analysis['analysis']['score'] >= 75:
    print("✓ 推荐执行Iron Condor")
```

---

### 场景2: 看好某股票,想低价买入

```python
# 使用Cash-Secured Put
csp = CashSecuredPut('AAPL', target_entry_price=180)

# 比较多个执行价
strikes = [175, 180, 185, 190]
comparison = csp.compare_multiple_strikes(strikes)

# 选择评分最高的
best = comparison[0]
print(f"最优执行价: ${best['strike']}")
print(f"年化收益: {best['annual_return']:.1%}")
```

---

### 场景3: 判断股票估值

```python
# DCF绝对估值
dcf = DCFCalculator('MSFT')
dcf_result = dcf.calculate_dcf()

# 可比公司相对估值
comp = ComparableCompanyAnalysis('MSFT', ['AAPL', 'GOOGL', 'META'])
comp_result = comp.analyze()

# 综合判断
dcf_upside = dcf_result['valuation']['upside_downside']
comp_upside = comp_result['valuations']['average']['upside']
avg_upside = (dcf_upside + comp_upside) / 2

print(f"DCF: {dcf_upside:+.1%}")
print(f"可比公司: {comp_upside:+.1%}")
print(f"综合: {avg_upside:+.1%}")
```

---

## 风险提示

1. **期权交易风险**
   - 可能损失全部本金
   - 需要足够保证金
   - 必须理解策略风险

2. **估值模型限制**
   - 依赖假设准确性
   - 不适用于亏损公司
   - 需要理解业务本质

3. **数据时效性**
   - 使用最新数据
   - 定期更新分析
   - 重大事件后重新评估

---

## 获取帮助

- **完整文档**: 阅读README.md
- **代码示例**: 查看各模块的`if __name__ == "__main__"`部分
- **完整工作流**: 运行example_usage.py

---

## 下一步

1. ✅ 运行example_usage.py熟悉工具
2. ✅ 用自己关注的股票测试
3. ✅ 阅读README.md了解更多细节
4. ✅ 根据需要修改参数和假设

---

**版本**: v1.0
**更新日期**: 2026-01-25

**免责声明**: 本工具库仅供教育用途。投资有风险,使用需谨慎。
