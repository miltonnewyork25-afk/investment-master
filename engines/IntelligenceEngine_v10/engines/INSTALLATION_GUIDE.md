# Options Market Intelligence Decoder - Installation Guide

## 快速安装（3步）

### Step 1: 安装依赖

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10/engines
chmod +x install.sh
./install.sh
```

或手动安装:
```bash
pip3 install yfinance scipy numpy pandas
```

### Step 2: 验证安装

```bash
python3 -c "import yfinance, scipy, numpy, pandas; print('✅ 所有依赖已安装')"
```

### Step 3: 运行测试

```bash
python3 options_decoder.py
```

预期输出:
```
✓ 成功获取 TSLA 数据: $449.12
✓ 获取 6 个到期日的期权链
======================================================================
📊 期权市场情报报告 - TSLA
======================================================================
...
```

---

## 详细安装步骤

### 环境要求

- **操作系统**: macOS, Linux, Windows
- **Python 版本**: 3.8 或更高
- **网络**: 需要访问 Yahoo Finance

### 检查 Python 版本

```bash
python3 --version
```

应该显示: `Python 3.8.x` 或更高

如果没有 Python:
- macOS: `brew install python3`
- Linux: `apt-get install python3 python3-pip`
- Windows: 从 https://www.python.org/downloads/ 下载

### 安装依赖库

**方法1: 使用安装脚本 (推荐)**

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10/engines
./install.sh
```

**方法2: 使用 requirements.txt**

```bash
pip3 install -r requirements.txt
```

**方法3: 单独安装**

```bash
pip3 install yfinance>=0.2.0
pip3 install scipy>=1.10.0
pip3 install numpy>=1.24.0
pip3 install pandas>=2.0.0
```

### 验证安装

```bash
python3 -c "
import yfinance as yf
import scipy
import numpy as np
import pandas as pd
from scipy.stats import norm
from scipy.optimize import brentq

print('✅ yfinance:', yf.__version__)
print('✅ scipy:', scipy.__version__)
print('✅ numpy:', np.__version__)
print('✅ pandas:', pd.__version__)
print('✅ 所有依赖安装成功!')
"
```

---

## 快速测试

### 测试1: 基础功能

```bash
python3 << 'EOF'
from options_decoder import OptionsDecoder

decoder = OptionsDecoder('SPY')  # 使用 SPY (最稳定)
if decoder.fetch_data():
    print("✅ 数据获取成功")
    pc = decoder.calculate_put_call_ratio()
    print(f"✅ P/C Ratio: {pc['avg_ratio']}")
else:
    print("❌ 数据获取失败")
EOF
```

### 测试2: 完整报告

```bash
python3 options_decoder.py
```

### 测试3: 运行示例

```bash
python3 options_example.py
```

选择示例编号 (1-8) 或按 Enter 运行所有示例

---

## 常见问题

### 问题1: command not found: python3

**原因**: Python 未安装或不在 PATH 中

**解决**:
- macOS: `brew install python3`
- Linux: `sudo apt-get install python3`
- Windows: 添加 Python 到 PATH

### 问题2: ModuleNotFoundError: yfinance

**原因**: yfinance 未安装

**解决**:
```bash
pip3 install yfinance
```

如果遇到权限问题:
```bash
pip3 install --user yfinance
```

### 问题3: Permission denied: ./install.sh

**原因**: 脚本没有执行权限

**解决**:
```bash
chmod +x install.sh
./install.sh
```

### 问题4: SSL Certificate Error

**原因**: 网络或证书问题

**解决**:
```bash
pip3 install --trusted-host pypi.org --trusted-host files.pythonhosted.org yfinance scipy numpy pandas
```

### 问题5: No data found for TSLA

**原因**: 网络问题或 Yahoo Finance 暂时不可用

**解决**:
- 检查网络连接
- 等待几分钟后重试
- 尝试其他股票 (SPY, AAPL)

### 问题6: 被限流 (Too Many Requests)

**原因**: 请求过于频繁

**解决**:
- 在批量查询时添加延迟:
  ```python
  import time
  time.sleep(1)  # 每次请求间隔 1 秒
  ```

---

## 目录结构

```
IntelligenceEngine_v10/
│
├── engines/
│   ├── options_decoder.py              # 主引擎 (600+ 行)
│   ├── options_config.py               # 配置文件 (200+ 行)
│   ├── options_example.py              # 使用示例 (500+ 行)
│   ├── README_OPTIONS.md               # 完整文档 (2000+ 行)
│   ├── OPTIONS_QUICK_REFERENCE.md      # 快速参考
│   ├── OPTIONS_ENGINE_SUMMARY.md       # 交付总结
│   ├── INSTALLATION_GUIDE.md           # 本文件
│   ├── requirements.txt                # Python 依赖
│   └── install.sh                      # 自动安装脚本
│
├── outputs/
│   └── options_report.json             # 输出示例
│
└── data/
    └── options_history/                # 历史数据目录
```

---

## 配置选项

### 基础配置 (options_config.py)

```python
# 数据源
DATA_SOURCE = 'yahoo'  # 'yahoo' (免费) 或 'polygon' (付费)

# 无风险利率
RISK_FREE_RATE = 0.045  # 4.5%

# 异常交易阈值
UNUSUAL_VOLUME_THRESHOLD = 2.0  # Vol > 2× OI

# Put/Call Ratio 阈值
PC_RATIO_BULLISH = 0.7   # < 0.7 = Bullish
PC_RATIO_BEARISH = 1.0   # > 1.0 = Bearish

# 隐含波动率阈值
HIGH_IV_THRESHOLD = 80   # IV > 80% = 高波动
LOW_IV_THRESHOLD = 20    # IV < 20% = 低波动

# 监控股票池
WATCHLIST = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'SPY']
```

### 修改配置

编辑 `options_config.py` 文件:

```bash
nano options_config.py
# 或
vim options_config.py
```

---

## 使用方式

### 方式1: 直接运行主文件

```bash
python3 options_decoder.py
```

自动分析 TSLA 并生成报告

### 方式2: 在 Python 脚本中导入

```python
from options_decoder import OptionsDecoder

# 初始化
decoder = OptionsDecoder('AAPL', risk_free_rate=0.045)

# 获取数据
decoder.fetch_data()

# 生成报告
report = decoder.generate_full_report()

# 打印摘要
decoder.print_report_summary(report)

# 保存 JSON
import json
with open('aapl_options.json', 'w') as f:
    json.dump(report, f, indent=2)
```

### 方式3: 运行示例

```bash
python3 options_example.py
```

包含 8 个完整示例:
1. 基础使用
2. P/C Ratio 监控
3. Max Pain 策略
4. 异常交易检测
5. 隐含波动率分析
6. 隐含概率区间
7. 批量监控
8. 财报前分析

### 方式4: 交互式使用

```bash
python3
```

```python
>>> from options_decoder import OptionsDecoder
>>> decoder = OptionsDecoder('TSLA')
>>> decoder.fetch_data()
✓ 成功获取 TSLA 数据: $449.12
✓ 获取 6 个到期日的期权链
True

>>> pc = decoder.calculate_put_call_ratio()
>>> print(pc)
{'volume_ratio': 0.85, 'oi_ratio': 0.92, 'signal': 'Neutral', ...}
```

---

## 集成到工作流

### 示例1: 每日定时监控

```python
import schedule
import time
from options_decoder import OptionsDecoder

def daily_options_scan():
    """每天盘后运行期权扫描"""
    watchlist = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'SPY']

    for ticker in watchlist:
        decoder = OptionsDecoder(ticker)
        if decoder.fetch_data():
            report = decoder.generate_full_report()

            # 检查警报
            if report['alerts']:
                print(f"\n🚨 {ticker} 警报:")
                for alert in report['alerts']:
                    print(f"  [{alert['severity']}] {alert['message']}")

                # 发送通知 (自定义)
                # send_email(ticker, report)
                # send_slack(ticker, report)

        time.sleep(1)  # 避免限流

# 每天下午4:30运行 (美股收盘后)
schedule.every().day.at("16:30").do(daily_options_scan)

while True:
    schedule.run_pending()
    time.sleep(60)
```

### 示例2: 财报日历集成

```python
from options_decoder import OptionsDecoder
import pandas as pd

# 读取财报日历
earnings_calendar = pd.read_csv('earnings_calendar.csv')

for _, row in earnings_calendar.iterrows():
    ticker = row['Ticker']
    earnings_date = row['Date']

    # 分析财报前期权
    decoder = OptionsDecoder(ticker)
    if decoder.fetch_data():
        # 找到财报后的到期日
        exp_dates = sorted(list(decoder.options_data.keys()))
        earnings_exp = [d for d in exp_dates if d > earnings_date][0]

        # IV 分析
        iv_data = decoder.analyze_implied_volatility(earnings_exp)

        # 隐含波动
        prob_range = decoder.implied_probability_range(earnings_exp)

        print(f"\n{ticker} 财报前分析 (财报日: {earnings_date}):")
        print(f"  IV: {iv_data['avg_iv']:.1f}%")
        print(f"  预期波动: ±{prob_range['expected_move_pct']:.1f}%")
```

### 示例3: 与技术分析结合

```python
from options_decoder import OptionsDecoder
import talib  # 技术指标库

def combined_analysis(ticker):
    """结合期权和技术分析"""

    # 期权分析
    decoder = OptionsDecoder(ticker)
    decoder.fetch_data()

    pc_ratio = decoder.calculate_put_call_ratio()
    unusual = decoder.detect_unusual_activity()

    # 技术分析
    hist = decoder.stock.history(period='3mo')
    rsi = talib.RSI(hist['Close'], timeperiod=14)[-1]
    macd, signal, _ = talib.MACD(hist['Close'])
    macd_cross = macd.iloc[-1] > signal.iloc[-1]

    # 综合信号
    signals = {
        'options_sentiment': pc_ratio['signal'],
        'unusual_activity': len(unusual) > 5,
        'rsi': 'Overbought' if rsi > 70 else ('Oversold' if rsi < 30 else 'Neutral'),
        'macd': 'Bullish' if macd_cross else 'Bearish'
    }

    return signals
```

---

## 性能优化

### 1. 缓存数据

```python
from options_decoder import OptionsDecoder
import pickle
from datetime import datetime, timedelta

def get_cached_data(ticker, cache_hours=1):
    """使用缓存避免重复请求"""
    cache_file = f'cache/{ticker}_options.pkl'

    try:
        # 检查缓存
        with open(cache_file, 'rb') as f:
            cached = pickle.load(f)

        # 检查是否过期
        if datetime.now() - cached['timestamp'] < timedelta(hours=cache_hours):
            return cached['data']
    except:
        pass

    # 重新获取
    decoder = OptionsDecoder(ticker)
    decoder.fetch_data()

    # 保存缓存
    with open(cache_file, 'wb') as f:
        pickle.dump({
            'timestamp': datetime.now(),
            'data': decoder.options_data
        }, f)

    return decoder.options_data
```

### 2. 批量并发处理

```python
from concurrent.futures import ThreadPoolExecutor
from options_decoder import OptionsDecoder

def analyze_ticker(ticker):
    """分析单只股票"""
    decoder = OptionsDecoder(ticker)
    if decoder.fetch_data():
        return decoder.generate_full_report()
    return None

# 并发处理
watchlist = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'SPY', 'GOOGL', 'META', 'AMD']

with ThreadPoolExecutor(max_workers=5) as executor:
    reports = list(executor.map(analyze_ticker, watchlist))

# 汇总结果
for ticker, report in zip(watchlist, reports):
    if report and report.get('alerts'):
        print(f"{ticker}: {len(report['alerts'])} 个警报")
```

---

## 故障排除

### 调试模式

启用详细日志:

```python
import logging

logging.basicConfig(level=logging.DEBUG)

from options_decoder import OptionsDecoder

decoder = OptionsDecoder('TSLA')
decoder.fetch_data()
```

### 常见错误及解决

| 错误 | 原因 | 解决方法 |
|------|------|---------|
| ModuleNotFoundError | 依赖未安装 | `pip3 install -r requirements.txt` |
| ConnectionError | 网络问题 | 检查网络，稍后重试 |
| JSONDecodeError | API 响应异常 | 等待几分钟，Yahoo Finance 可能暂时不可用 |
| KeyError: 'strike' | 期权数据格式变化 | 更新 yfinance: `pip3 install -U yfinance` |
| ValueError: brentq | IV 计算失败 | 使用 Yahoo 提供的 IV (已实现) |

### 获取帮助

1. 查看文档: `README_OPTIONS.md`
2. 快速参考: `OPTIONS_QUICK_REFERENCE.md`
3. 运行示例: `python3 options_example.py`
4. 检查配置: `options_config.py`

---

## 升级与更新

### 更新依赖库

```bash
pip3 install --upgrade yfinance scipy numpy pandas
```

### 检查版本

```bash
pip3 show yfinance scipy numpy pandas
```

### 回退版本

如果更新后出现问题:

```bash
pip3 install yfinance==0.2.0
```

---

## 卸载

### 删除代码

```bash
rm -rf /Users/milton/投资大师/IntelligenceEngine_v10/engines/options*
rm -rf /Users/milton/投资大师/IntelligenceEngine_v10/engines/OPTIONS*
rm /Users/milton/投资大师/IntelligenceEngine_v10/engines/README_OPTIONS.md
```

### 卸载依赖

```bash
pip3 uninstall yfinance scipy numpy pandas
```

注意: 这些库可能被其他项目使用，谨慎卸载

---

## 下一步

### 1. 学习核心概念

阅读 `README_OPTIONS.md` 理解:
- Put/Call Ratio 的含义
- Max Pain 原理
- 隐含波动率解读
- Black-Scholes 模型

### 2. 运行示例

```bash
python3 options_example.py
```

逐个运行 8 个示例，理解各种应用场景

### 3. 集成到投资流程

- 每日盘后扫描监控股票池
- 财报前分析隐含波动
- 异常交易警报
- 与技术分析结合

### 4. 定制化开发

- 修改 `options_config.py` 调整阈值
- 添加自定义警报
- 集成邮件/Slack 通知
- 开发回测策略

---

## 支持

**文档**:
- 完整手册: `README_OPTIONS.md`
- 快速参考: `OPTIONS_QUICK_REFERENCE.md`
- 交付总结: `OPTIONS_ENGINE_SUMMARY.md`

**代码**:
- 主引擎: `options_decoder.py`
- 示例: `options_example.py`
- 配置: `options_config.py`

**版本**: 1.0
**作者**: Investment Research Agent v6.0
**日期**: 2026-01-25

---

**安装完成后, 运行**:
```bash
python3 options_decoder.py
```

**享受期权市场情报解码！** 📊
