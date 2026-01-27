# Options Market Intelligence Decoder

## 概述

期权市场情报解码引擎，从期权链数据中提取市场情绪、隐含概率和异常交易信号。

**核心能力**:
- Put/Call Ratio 情绪分析
- Max Pain 计算（期权卖方最优价格）
- 隐含波动率 (IV) 分析
- 异常期权交易检测 (Unusual Options Activity)
- Black-Scholes 隐含概率倒推
- 自动警报生成

---

## 快速开始

### 1. 安装依赖

```bash
pip install yfinance scipy numpy pandas
```

### 2. 基本使用

```python
from engines.options_decoder import OptionsDecoder

# 初始化
decoder = OptionsDecoder('TSLA', risk_free_rate=0.045)

# 获取数据
decoder.fetch_data()

# 生成完整报告
report = decoder.generate_full_report()

# 打印摘要
decoder.print_report_summary(report)
```

### 3. 运行示例

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10/engines
python options_decoder.py
```

---

## 核心功能详解

### 1. Put/Call Ratio (P/C Ratio)

**含义**: 市场看跌/看涨情绪指标

**计算方式**:
```
P/C Ratio = Put Volume / Call Volume
P/C Ratio (OI) = Put Open Interest / Call Open Interest
```

**信号解读**:
- **< 0.7**: Bullish (看涨), 市场乐观
- **0.7 - 1.0**: Neutral (中性)
- **> 1.0**: Bearish (看跌), 市场恐慌
- **> 1.5**: Extreme Fear (极度恐慌), 可能反转信号

**使用示例**:
```python
pc_data = decoder.calculate_put_call_ratio()
print(f"P/C Ratio: {pc_data['avg_ratio']} ({pc_data['signal']})")
```

**输出**:
```json
{
  "volume_ratio": 0.85,
  "oi_ratio": 0.92,
  "avg_ratio": 0.885,
  "total_call_volume": 120000,
  "total_put_volume": 102000,
  "signal": "Neutral"
}
```

---

### 2. Max Pain 计算

**含义**: 期权到期时，使期权卖方损失最小的股价水平

**原理**: 期权做市商通常是净卖方，有动机将股价推向 Max Pain

**计算方式**:
```
对每个行权价 K:
  Call Loss = Σ max(K - Strike, 0) × Open Interest
  Put Loss = Σ max(Strike - K, 0) × Open Interest
  Total Loss = Call Loss + Put Loss

Max Pain = arg min(Total Loss)
```

**信号解读**:
- 当前价 **远低于** Max Pain (>5%) → 可能向上拉
- 当前价 **远高于** Max Pain (>5%) → 可能向下压
- 距离 **< 2%** → 信号不明显

**使用示例**:
```python
max_pain = decoder.calculate_max_pain('2026-02-20')
print(f"Max Pain: ${max_pain['max_pain_price']}")
print(f"距离当前价: {max_pain['distance_from_current_pct']:.1f}%")
```

**输出**:
```json
{
  "max_pain_price": 445.0,
  "total_loss_at_max_pain": 1234567890,
  "current_price_loss": 1456789012,
  "distance_from_current_pct": -1.12,
  "signal": "Neutral"
}
```

---

### 3. 隐含波动率 (IV) 分析

**含义**: 期权价格隐含的未来波动预期

**计算方式**:
- 从期权市场价格反推 Black-Scholes 模型中的 σ
- 取 ATM (At-The-Money) 期权的平均 IV

**IV Skew**:
```
IV Skew = Put IV - Call IV
```
- **正 Skew (>5%)**: 市场对下跌风险有溢价 (看跌倾向)
- **负 Skew (<-5%)**: 对上涨有溢价 (少见, 看涨)

**IV Percentile**:
- 当前 IV 在历史分布中的位置
- **> 75%**: 高波动预期 (恐慌或重大事件前)
- **< 25%**: 低波动预期 (平静期, 小心 IV Crush)

**使用示例**:
```python
iv_data = decoder.analyze_implied_volatility('2026-02-20')
print(f"平均 IV: {iv_data['avg_iv']:.1f}%")
print(f"IV Skew: {iv_data['iv_skew']:.1f}%")
```

**输出**:
```json
{
  "avg_iv": 65.4,
  "avg_call_iv": 63.2,
  "avg_put_iv": 67.6,
  "iv_skew": 4.4,
  "iv_percentile": 72.3,
  "signal": "High Fear"
}
```

---

### 4. 异常交易检测 (Unusual Options Activity)

**检测规则**: 成交量 > 2× 持仓量

**含义**:
- 突然的大量交易 → 可能有"知情者"
- 常见于重大事件前 (财报、并购、FDA批准等)

**关键指标**:
- **Volume/OI Ratio**: 成交量与持仓量比率
- **Premium Traded**: 交易金额 (= Volume × Price × 100)
- **Moneyness**: ITM (实值) / OTM (虚值)

**信号强度**:
- ITM + 大金额 → 可能是对冲或定向押注
- OTM + 短期 → 可能是"彩票式"投机
- Put + 异常大 → 对冲下跌或做空

**使用示例**:
```python
unusual = decoder.detect_unusual_activity(volume_threshold=2.0)

for trade in unusual[:5]:
    print(f"{trade['type']} ${trade['strike']} - 成交量 {trade['volume']:,}")
    print(f"  交易金额: ${trade['premium_traded']:,.0f}")
```

**输出**:
```json
[
  {
    "type": "CALL",
    "strike": 500.0,
    "expiration": "2026-02-20",
    "days_to_exp": 26,
    "volume": 15000,
    "open_interest": 5000,
    "vol_oi_ratio": 3.0,
    "last_price": 12.5,
    "implied_vol": 72.3,
    "moneyness": "OTM",
    "premium_traded": 18750000
  }
]
```

---

### 5. 隐含概率区间

**含义**: 市场预期的股价波动范围

**计算方式**:
```
ATM Straddle = ATM Call Price + ATM Put Price
Expected Move = Straddle Price × 0.85
Range = Current Price ± Expected Move
```

**解读**:
- **68% 置信度** (1σ): 股价有 68% 概率在区间内
- **95% 置信度** (2σ): 股价有 95% 概率在区间内

**应用场景**:
- **卖方策略**: 在区间外卖期权收权利金
- **买方策略**: 预期突破区间时买 Straddle

**使用示例**:
```python
prob_range = decoder.implied_probability_range('2026-02-20', confidence=0.68)
print(f"隐含区间: ${prob_range['lower_bound']} - ${prob_range['upper_bound']}")
print(f"预期波动: ±{prob_range['expected_move_pct']:.1f}%")
```

**输出**:
```json
{
  "expiration": "2026-02-20",
  "days_to_expiration": 26,
  "current_price": 449.0,
  "lower_bound": 411.3,
  "upper_bound": 486.7,
  "expected_move_dollars": 37.7,
  "expected_move_pct": 8.4,
  "confidence_level": 0.68,
  "straddle_price": 44.2
}
```

---

## 完整报告示例

### 生成报告

```python
decoder = OptionsDecoder('TSLA')
decoder.fetch_data()
report = decoder.generate_full_report()

# 打印摘要
decoder.print_report_summary(report)

# 保存 JSON
import json
with open('options_report.json', 'w') as f:
    json.dump(report, f, indent=2)
```

### 报告结构

```json
{
  "ticker": "TSLA",
  "current_price": 449.12,
  "timestamp": "2026-01-25 14:30:00",

  "put_call_ratio": {
    "volume_ratio": 0.85,
    "oi_ratio": 0.92,
    "signal": "Neutral"
  },

  "expiration_analysis": {
    "2026-02-20": {
      "max_pain": {...},
      "iv_analysis": {...},
      "implied_range": {...}
    }
  },

  "unusual_activity": [
    {...},
    {...}
  ],

  "alerts": [
    {
      "type": "LARGE_TRADE",
      "message": "大额 CALL 交易: $18,750,000 at strike $500",
      "severity": "HIGH"
    }
  ]
}
```

---

## 高级用法

### 1. 批量监控多只股票

```python
watchlist = ['TSLA', 'AAPL', 'NVDA', 'MSFT']

for ticker in watchlist:
    decoder = OptionsDecoder(ticker)
    if decoder.fetch_data():
        report = decoder.generate_full_report()

        # 检查警报
        if report['alerts']:
            print(f"\n🚨 {ticker} 警报:")
            for alert in report['alerts']:
                print(f"  - {alert['message']}")
```

### 2. 定时监控（每小时运行）

```python
import schedule
import time

def monitor_options():
    decoder = OptionsDecoder('TSLA')
    decoder.fetch_data()
    report = decoder.generate_full_report()

    # 保存历史数据
    timestamp = datetime.now().strftime('%Y%m%d_%H%M')
    with open(f'reports/tsla_options_{timestamp}.json', 'w') as f:
        json.dump(report, f, indent=2)

# 每小时运行
schedule.every().hour.do(monitor_options)

while True:
    schedule.run_pending()
    time.sleep(60)
```

### 3. 自定义警报逻辑

```python
decoder = OptionsDecoder('TSLA')
decoder.fetch_data()

# 自定义检查
pc_ratio = decoder.calculate_put_call_ratio()

if pc_ratio['avg_ratio'] > 1.5:
    print("⚠️  极度恐慌! P/C Ratio > 1.5")
    # 发送通知 (邮件/Slack/微信)

unusual = decoder.detect_unusual_activity(volume_threshold=3.0)  # 更严格阈值

if any(t['premium_traded'] > 5_000_000 for t in unusual):
    print("⚠️  检测到 $5M+ 大额交易!")
```

---

## 数据源配置

### 方案A: Yahoo Finance (免费, 默认)

**优点**:
- 完全免费
- 无需 API Key
- 数据质量高

**限制**:
- 延迟 15-20 分钟
- 频繁请求可能被限流

**配置**:
```python
# options_config.py
DATA_SOURCE = 'yahoo'
```

### 方案B: Polygon.io (付费)

**优点**:
- 实时数据
- 更多历史数据
- 更稳定

**价格**: $200/月

**配置**:
```python
# options_config.py
DATA_SOURCE = 'polygon'
POLYGON_API_KEY = 'your_api_key_here'
```

申请地址: https://polygon.io/pricing

---

## 配置参数说明

### 关键阈值 (options_config.py)

```python
# Put/Call Ratio
PC_RATIO_BULLISH = 0.7   # < 0.7 = 看涨
PC_RATIO_BEARISH = 1.0   # > 1.0 = 看跌

# 异常交易
UNUSUAL_VOLUME_THRESHOLD = 2.0  # Vol > 2× OI
LARGE_TRADE_THRESHOLD = 1_000_000  # $1M

# 隐含波动率
HIGH_IV_THRESHOLD = 80  # IV > 80% = 高波动
LOW_IV_THRESHOLD = 20   # IV < 20% = 低波动

# Max Pain
MAX_PAIN_SIGNIFICANT_DISTANCE = 2.0  # > ±2% 有意义
```

### 监控股票池

```python
# 默认监控列表
WATCHLIST = ['TSLA', 'AAPL', 'NVDA', 'MSFT', 'SPY']

# 半导体供应链
SEMICAP_WATCHLIST = ['NVDA', 'AMD', 'ASML', 'AMAT', 'LRCX', 'TSM', 'MU']
```

---

## 输出文件

### 1. JSON 报告

**路径**: `/Users/milton/投资大师/IntelligenceEngine_v10/outputs/options_report.json`

**用途**: 完整的结构化数据，可用于进一步分析

### 2. 历史数据

**路径**: `/Users/milton/投资大师/IntelligenceEngine_v10/data/options_history/`

**格式**: `{ticker}_options_{timestamp}.json`

**用途**: 回测、趋势分析

---

## 常见应用场景

### 1. 财报前情绪分析

```python
# 财报前一周
decoder = OptionsDecoder('TSLA')
decoder.fetch_data()

# 检查 IV 是否飙升
iv_data = decoder.analyze_implied_volatility(exp_date='2026-02-20')
if iv_data['avg_iv'] > 80:
    print("⚠️  财报前 IV 极高, Straddle 昂贵")

# 检查隐含波动区间
prob_range = decoder.implied_probability_range(exp_date='2026-02-20')
print(f"市场预期财报后波动: ±{prob_range['expected_move_pct']:.1f}%")
```

### 2. 异常交易追踪

```python
# 每天盘后运行
decoder = OptionsDecoder('TSLA')
decoder.fetch_data()

unusual = decoder.detect_unusual_activity()

# 筛选大额 ITM Put (可能是对冲)
big_puts = [t for t in unusual
            if t['type'] == 'PUT'
            and t['moneyness'] == 'ITM'
            and t['premium_traded'] > 2_000_000]

if big_puts:
    print("⚠️  检测到大额 ITM Put, 可能有下跌预期或对冲")
```

### 3. Max Pain 回归策略

```python
# 周五到期日检查
decoder = OptionsDecoder('SPY')
decoder.fetch_data()

max_pain = decoder.calculate_max_pain(exp_date='2026-01-30')  # 本周五

current_price = decoder.current_price
max_pain_price = max_pain['max_pain_price']

distance_pct = max_pain['distance_from_current_pct']

if abs(distance_pct) > 3:
    direction = "上涨" if distance_pct > 0 else "下跌"
    print(f"当前 ${current_price:.2f}, Max Pain ${max_pain_price:.2f}")
    print(f"预期本周{direction}至 Max Pain ({abs(distance_pct):.1f}%)")
```

---

## Black-Scholes 公式说明

### Call 期权定价

```
C = S × N(d1) - K × e^(-rT) × N(d2)

其中:
d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T)
d2 = d1 - σ√T

S = 当前股价
K = 行权价
T = 到期时间 (年)
r = 无风险利率
σ = 波动率
N(x) = 标准正态分布累积函数
```

### 隐含波动率反推

```
已知: 期权市场价格 C_market
求: σ 使得 BS(S, K, T, r, σ) = C_market

方法: Brent 求根算法
```

**代码**:
```python
from scipy.optimize import brentq

def objective(sigma):
    return black_scholes_call(S, K, T, r, sigma) - market_price

iv = brentq(objective, 0.001, 5.0)  # 搜索 0.1% ~ 500%
```

---

## 常见问题 (FAQ)

### Q1: Yahoo Finance 数据延迟多久?

**A**: 通常 15-20 分钟。如需实时数据，使用 Polygon.io (付费)。

### Q2: Put/Call Ratio 多少算极端?

**A**:
- **< 0.5**: 极度乐观 (过热警告)
- **> 1.5**: 极度恐慌 (可能见底)
- 通常 **0.7-1.0** 是中性

### Q3: Max Pain 策略胜率如何?

**A**:
- 周五到期时效果最好 (做市商有动力 Pin 价格)
- 流动性高的股票/ETF 更有效 (SPY, QQQ)
- 个股效果弱于指数
- **不是圣杯**, 结合其他信号使用

### Q4: 如何判断 IV 高低?

**A**:
- 绝对值: > 60% 为高, < 30% 为低 (根据股票不同)
- 相对值: IV Percentile > 75% 为历史高位
- 财报前 IV 通常飙升 (IV Crush)

### Q5: 异常交易一定是"聪明钱"吗?

**A**:
- 不一定! 可能是:
  - 机构对冲 (不代表方向性押注)
  - 复杂策略 (Spread, Iron Condor)
  - 错误交易
- 需结合 **Moneyness, 到期时间, 金额** 综合判断

### Q6: 如何避免被限流?

**A**:
```python
import time

for ticker in watchlist:
    decoder = OptionsDecoder(ticker)
    decoder.fetch_data()
    time.sleep(1)  # 每次请求间隔 1 秒
```

---

## 技术支持

**文档位置**: `/Users/milton/投资大师/IntelligenceEngine_v10/engines/README_OPTIONS.md`

**代码位置**:
- `options_decoder.py` - 主引擎
- `options_config.py` - 配置文件

**依赖库**:
```
yfinance >= 0.2.0
scipy >= 1.10.0
numpy >= 1.24.0
pandas >= 2.0.0
```

**作者**: Investment Research Agent v6.0
**版本**: 1.0
**最后更新**: 2026-01-25
