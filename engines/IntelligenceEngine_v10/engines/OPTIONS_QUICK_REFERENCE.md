# Options Decoder Quick Reference

## 一分钟速查表

### 基础使用（3行代码）

```python
from options_decoder import OptionsDecoder

decoder = OptionsDecoder('TSLA')
decoder.fetch_data()
report = decoder.generate_full_report()
decoder.print_report_summary(report)
```

---

## 核心指标速查

### 1. Put/Call Ratio

| 比率范围 | 含义 | 交易信号 |
|---------|------|---------|
| < 0.5 | 极度乐观 | ⚠️ 可能过热，警惕回调 |
| 0.5 - 0.7 | 偏乐观 | ✓ 轻微看涨 |
| 0.7 - 1.0 | 中性 | ✓ 正常 |
| 1.0 - 1.5 | 偏悲观 | ✓ 轻微看跌 |
| > 1.5 | 极度恐慌 | ⚠️ 可能见底，反转机会 |

**代码**:
```python
pc = decoder.calculate_put_call_ratio()
print(f"P/C Ratio: {pc['avg_ratio']} ({pc['signal']})")
```

---

### 2. Max Pain

| 距离当前价 | 含义 | 策略 |
|-----------|------|------|
| > +5% | 当前价远低于 Max Pain | 可能向上拉升 |
| +2% ~ +5% | 略低于 Max Pain | 轻微看涨 |
| -2% ~ +2% | 接近 Max Pain | 横盘概率高 |
| -5% ~ -2% | 略高于 Max Pain | 轻微看跌 |
| < -5% | 当前价远高于 Max Pain | 可能向下回调 |

**最佳使用时机**: 周五到期日，流动性高的股票/ETF (SPY, QQQ)

**代码**:
```python
mp = decoder.calculate_max_pain('2026-02-20')
print(f"Max Pain: ${mp['max_pain_price']} (距离 {mp['distance_from_current_pct']:+.1f}%)")
```

---

### 3. 隐含波动率 (IV)

| IV 水平 | 百分位 | 含义 | 策略 |
|--------|-------|------|------|
| > 80% | > 90% | 极度恐慌 | 卖期权（收权利金）|
| 60-80% | 75-90% | 高波动预期 | 卖 Straddle/Iron Condor |
| 30-60% | 25-75% | 正常 | 中性策略 |
| 20-30% | 10-25% | 低波动 | 买期权（便宜）|
| < 20% | < 10% | 极度平静 | ⚠️ 警惕 IV 飙升 |

**IV Skew**:
- **Skew > +5%**: Put IV 高，市场担心下跌
- **Skew < -5%**: Call IV 高，市场预期上涨（少见）

**代码**:
```python
iv = decoder.analyze_implied_volatility('2026-02-20')
print(f"IV: {iv['avg_iv']:.1f}%, Skew: {iv['iv_skew']:+.1f}%")
```

---

### 4. 异常交易检测

| Vol/OI 比率 | 交易金额 | 类型 | 含义 |
|-----------|---------|------|------|
| > 5× | > $5M | Call OTM | 大胆看涨押注 |
| > 5× | > $5M | Put ITM | 可能对冲/做空 |
| > 3× | > $2M | Call ITM | 可能行权准备 |
| > 3× | > $2M | Put OTM | 保护性看跌 |
| > 2× | > $1M | 任何 | 值得关注 |

**代码**:
```python
unusual = decoder.detect_unusual_activity(volume_threshold=2.0)
for t in unusual[:5]:
    print(f"{t['type']} ${t['strike']}: ${t['premium_traded']:,.0f}")
```

---

### 5. 隐含概率区间

| 预期波动 | 含义 | 策略 |
|---------|------|------|
| > 15% | 重大事件（财报/FDA/并购） | 买 Straddle |
| 10-15% | 高波动预期 | 买期权（方向性） |
| 5-10% | 正常波动 | 中性策略 |
| 3-5% | 低波动 | 卖期权 |
| < 3% | 极低波动 | Iron Condor/Butterfly |

**代码**:
```python
prob = decoder.implied_probability_range('2026-02-20')
print(f"预期波动: ±{prob['expected_move_pct']:.1f}%")
print(f"区间: ${prob['lower_bound']:.2f} - ${prob['upper_bound']:.2f}")
```

---

## 常见策略速查

### 财报前

```python
# 检查 IV 是否已升高
iv_data = decoder.analyze_implied_volatility(earnings_exp_date)

if iv_data['avg_iv'] > 80:
    print("IV 已高, Straddle 贵")
else:
    print("IV 尚可, 可考虑买 Straddle")

# 隐含波动
prob = decoder.implied_probability_range(earnings_exp_date)
print(f"市场预期财报后波动: ±{prob['expected_move_pct']:.1f}%")
```

### 周五到期日

```python
# Max Pain 策略
max_pain = decoder.calculate_max_pain(this_friday)

if abs(max_pain['distance_from_current_pct']) > 3:
    direction = "向上" if max_pain['distance_from_current_pct'] > 0 else "向下"
    print(f"预期{direction}至 Max Pain ${max_pain['max_pain_price']}")
```

### 情绪监控

```python
# P/C Ratio 监控
pc = decoder.calculate_put_call_ratio()

if pc['avg_ratio'] < 0.5:
    print("⚠️ 过度乐观, 可能见顶")
elif pc['avg_ratio'] > 1.5:
    print("⚠️ 极度恐慌, 可能见底")
```

### 异常交易跟踪

```python
unusual = decoder.detect_unusual_activity(volume_threshold=3.0)

# 筛选大额 Put
big_puts = [t for t in unusual
            if t['type'] == 'PUT' and t['premium_traded'] > 2_000_000]

if big_puts:
    print("⚠️ 大额 Put 交易, 可能有对冲/做空")
```

---

## 警报阈值

| 指标 | 警报条件 | 严重度 |
|------|---------|--------|
| P/C Ratio | > 1.5 或 < 0.5 | HIGH |
| Max Pain 距离 | > ±5% | MEDIUM |
| IV | > 90% 或 < 10% | MEDIUM |
| 异常交易金额 | > $5M | HIGH |
| Vol/OI 比率 | > 5× | MEDIUM |

---

## 数据源对比

| 特性 | Yahoo Finance (免费) | Polygon.io (付费) |
|------|---------------------|------------------|
| 价格 | 免费 | $200/月 |
| 延迟 | 15-20分钟 | 实时 |
| API Key | 不需要 | 需要 |
| 历史数据 | 有限 | 完整 |
| 限流 | 可能 | 稳定 |
| 推荐场景 | 日常分析 | 专业交易/回测 |

---

## 故障排除

### 问题: ModuleNotFoundError: yfinance

**解决**:
```bash
pip3 install yfinance scipy numpy pandas
# 或运行
./install.sh
```

### 问题: 无期权数据

**原因**: 股票没有期权或数据暂时不可用

**解决**:
- 确认股票有期权交易 (蓝筹股通常有)
- 等待几分钟后重试
- 检查网络连接

### 问题: 被限流 (Too Many Requests)

**解决**:
```python
import time

for ticker in watchlist:
    decoder = OptionsDecoder(ticker)
    decoder.fetch_data()
    time.sleep(2)  # 每次请求间隔 2 秒
```

### 问题: IV 计算失败

**原因**: ATM 期权没有 IV 数据

**解决**: Yahoo Finance 已提供 IV, 通常不需要手动计算

---

## 批量监控模板

```python
from options_decoder import OptionsDecoder
import time

watchlist = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'SPY']

for ticker in watchlist:
    decoder = OptionsDecoder(ticker)

    if decoder.fetch_data():
        # P/C Ratio
        pc = decoder.calculate_put_call_ratio()

        # Max Pain (最近到期日)
        exp_dates = sorted(list(decoder.options_data.keys()))
        mp = decoder.calculate_max_pain(exp_dates[0])

        # 异常交易
        unusual_count = len(decoder.detect_unusual_activity())

        print(f"{ticker}: P/C={pc['avg_ratio']:.2f}, "
              f"Max Pain 距离={mp['distance_from_current_pct']:+.1f}%, "
              f"异常交易={unusual_count}")

    time.sleep(1)  # 避免限流
```

---

## 文件位置

| 文件 | 路径 |
|------|------|
| 主引擎 | `/Users/milton/投资大师/IntelligenceEngine_v10/engines/options_decoder.py` |
| 配置 | `/Users/milton/投资大师/IntelligenceEngine_v10/engines/options_config.py` |
| 文档 | `/Users/milton/投资大师/IntelligenceEngine_v10/engines/README_OPTIONS.md` |
| 示例 | `/Users/milton/投资大师/IntelligenceEngine_v10/engines/options_example.py` |
| 输出 | `/Users/milton/投资大师/IntelligenceEngine_v10/outputs/` |

---

## 联系与支持

**版本**: 1.0
**作者**: Investment Research Agent v6.0
**更新**: 2026-01-25

**相关文档**:
- README_OPTIONS.md - 完整文档
- options_example.py - 8个使用示例
- options_config.py - 全部配置参数
