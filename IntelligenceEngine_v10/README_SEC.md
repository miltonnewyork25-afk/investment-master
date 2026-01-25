# SEC Filing Real-Time Monitor - 使用文档

## 概述

SEC文件实时监控引擎，自动抓取并解析SEC EDGAR数据库中的关键文件：
- **Form 4**: 内部人交易（董事、高管、10%以上股东）
- **13F-HR**: 机构持仓季度报告

## 核心功能

1. **自动抓取**: 定期从SEC EDGAR获取最新文件
2. **智能解析**: 提取结构化数据（XML → SQLite）
3. **去重机制**: 自动跳过已处理的文件
4. **数据验证**: 过滤异常交易数据
5. **警报触发**: 大额交易自动标记
6. **汇总分析**: 生成内部人交易统计报告

## 快速开始

### 1. 安装依赖

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10
pip install requests
```

（所有代码仅使用Python标准库 + requests，无需其他依赖）

### 2. 运行示例

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10/engines
python sec_monitor.py
```

**输出示例**:
```
============================================================
SEC Filing Real-Time Monitor v1.0
============================================================

[示例1] 监控TSLA的Form 4（内部人交易）...
2026-01-25 10:30:15 - INFO - 开始监控 TSLA (Tesla Inc) 的Form 4...
2026-01-25 10:30:16 - INFO - 成功获取: https://www.sec.gov/cgi-bin/browse-edgar?...
2026-01-25 10:30:16 - INFO - 解析到 15 个 Form 4 文件
2026-01-25 10:30:18 - WARNING - ⚠️ 大额交易警报: TSLA Elon Musk S 100,000股 @ $450.00 = $45,000,000
2026-01-25 10:30:18 - INFO - ✓ 处理完成: TSLA 2026-01-20 - 3笔交易
2026-01-25 10:30:18 - INFO - TSLA 新增 1 个Form 4文件

[示例2] 生成TSLA内部人交易汇总（90天）...
{
  "ticker": "TSLA",
  "period_days": 90,
  "total_transactions": 12,
  "unique_insiders": 5,
  "buy_transactions": 3,
  "sell_transactions": 9,
  "buy_volume": 25000.0,
  "sell_volume": 350000.0,
  "net_volume": -325000.0,
  "buy_value": 11250000.0,
  "sell_value": 157500000.0,
  "net_value": -146250000.0,
  "key_insider_trades": 8,
  "avg_buy_price": 450.0,
  "avg_sell_price": 450.0
}

============================================================
数据已保存到: /Users/milton/投资大师/IntelligenceEngine_v10/data/sec_filings.db
============================================================
```

### 3. 作为库使用

```python
from sec_monitor import SECMonitorEngine

# 初始化引擎
engine = SECMonitorEngine()

# 监控特定股票的Form 4
engine.monitor_form4(ticker='NVDA', full_scan=False)

# 获取内部人交易汇总
summary = engine.get_insider_summary('NVDA', days=30)
print(summary)

# 关闭引擎
engine.close()
```

## 配置说明

所有配置在 `sec_config.py` 中：

### 监控股票池

```python
MONITORED_COMPANIES = {
    "TSLA": {"name": "Tesla Inc", "cik": "0001318605", ...},
    "AAPL": {"name": "Apple Inc", "cik": "0000320193", ...},
    # 添加更多公司...
}
```

### 机构监控列表

```python
TOP_INSTITUTIONS = {
    "ARK": {"name": "ARK Investment Management", "cik": "0001579982"},
    "BRK": {"name": "Berkshire Hathaway", "cik": "0001067983"},
    # 添加更多机构...
}
```

### 警报阈值

```python
ALERT_THRESHOLDS = {
    "insider_trade_value": 1000000,  # 单笔交易超过100万美元触发警报
    "ownership_change": 0.05,         # 持股变化超过5%
}
```

### API速率限制

```python
RATE_LIMIT = {
    "requests_per_second": 10,        # SEC限制：每秒最多10次请求
    "delay_between_requests": 0.11    # 自动延迟110ms
}
```

## 数据库结构

### Form 4 交易表 (form4_transactions)

| 字段 | 类型 | 说明 |
|------|------|------|
| accession_number | TEXT | SEC文件编号（唯一） |
| ticker | TEXT | 股票代码 |
| insider_name | TEXT | 内部人姓名 |
| insider_title | TEXT | 职位 |
| transaction_date | TEXT | 交易日期 |
| transaction_code | TEXT | 交易代码（P=买入，S=卖出） |
| shares | REAL | 股数 |
| price_per_share | REAL | 价格 |
| transaction_value | REAL | 交易金额 |
| shares_owned_after | REAL | 交易后持股 |
| alert_triggered | INTEGER | 是否触发警报 |

### 13F 持仓表 (form13f_holdings)

| 字段 | 类型 | 说明 |
|------|------|------|
| institution_name | TEXT | 机构名称 |
| ticker | TEXT | 股票代码 |
| shares | REAL | 持股数量 |
| market_value | REAL | 市值 |
| shares_change | REAL | 持股变化 |
| is_new_position | INTEGER | 是否新建仓位 |

### 查询示例

```sql
-- 查询最近30天的内部人买入
SELECT insider_name, transaction_date, shares, price_per_share, transaction_value
FROM form4_transactions
WHERE ticker = 'TSLA'
  AND transaction_code = 'P'
  AND transaction_date >= date('now', '-30 days')
ORDER BY transaction_date DESC;

-- 查询触发警报的大额交易
SELECT * FROM form4_transactions
WHERE alert_triggered = 1
ORDER BY transaction_value DESC
LIMIT 10;

-- 统计内部人净买卖
SELECT
    ticker,
    SUM(CASE WHEN transaction_code = 'P' THEN shares ELSE 0 END) as buy_volume,
    SUM(CASE WHEN transaction_code = 'S' THEN shares ELSE 0 END) as sell_volume,
    SUM(CASE WHEN transaction_code = 'P' THEN transaction_value ELSE -transaction_value END) as net_value
FROM form4_transactions
WHERE transaction_date >= date('now', '-90 days')
GROUP BY ticker;
```

## 自动化调度

### 方法1: Cron（Linux/Mac）

```bash
# 编辑crontab
crontab -e

# 每小时运行一次（监控Form 4）
0 * * * * cd /Users/milton/投资大师/IntelligenceEngine_v10/engines && /usr/bin/python3 sec_monitor.py >> /Users/milton/投资大师/IntelligenceEngine_v10/logs/cron.log 2>&1

# 每天早上9点运行（监控13F）
0 9 * * * cd /Users/milton/投资大师/IntelligenceEngine_v10/engines && /usr/bin/python3 sec_monitor.py --mode 13f
```

### 方法2: Python调度器（推荐）

创建 `scheduler.py`:

```python
import schedule
import time
from sec_monitor import SECMonitorEngine

engine = SECMonitorEngine()

def job_form4():
    """每小时监控Form 4"""
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] 开始Form 4监控...")
    engine.monitor_form4(full_scan=False)

def job_13f():
    """每天监控13F"""
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] 开始13F监控...")
    engine.monitor_form13f()

# 设置调度
schedule.every(1).hours.do(job_form4)     # 每小时
schedule.every().day.at("09:00").do(job_13f)  # 每天9点

print("调度器已启动...")
while True:
    schedule.run_pending()
    time.sleep(60)
```

运行调度器:
```bash
nohup python scheduler.py > scheduler.log 2>&1 &
```

## 高级用法

### 1. 批量监控所有公司

```python
engine = SECMonitorEngine()

# 监控所有配置的公司
for ticker in ['TSLA', 'AAPL', 'NVDA', 'MSFT', 'GOOGL']:
    engine.monitor_form4(ticker=ticker, full_scan=False)
    time.sleep(1)  # 避免过快请求
```

### 2. 导出数据到CSV

```python
import sqlite3
import pandas as pd

conn = sqlite3.connect('/Users/milton/投资大师/IntelligenceEngine_v10/data/sec_filings.db')
df = pd.read_sql_query("SELECT * FROM form4_transactions WHERE ticker = 'TSLA'", conn)
df.to_csv('tsla_form4.csv', index=False)
conn.close()
```

### 3. 检测异常交易模式

```python
def detect_unusual_activity(ticker, threshold=3):
    """检测异常交易活动（交易量超过均值N倍）"""
    engine = SECMonitorEngine()
    transactions = engine.db.get_recent_form4(ticker, days=180)

    if len(transactions) < 10:
        return []

    values = [t['transaction_value'] for t in transactions]
    mean_value = sum(values) / len(values)

    unusual = [
        t for t in transactions
        if t['transaction_value'] > mean_value * threshold
    ]

    return unusual

# 使用
unusual_tsla = detect_unusual_activity('TSLA', threshold=3)
for trade in unusual_tsla:
    print(f"{trade['insider_name']}: ${trade['transaction_value']:,.0f}")
```

## 数据源说明

### SEC EDGAR API

- **官方文档**: https://www.sec.gov/edgar/sec-api-documentation
- **速率限制**: 每秒10次请求
- **User-Agent要求**: 必须提供（已在配置中设置）
- **数据延迟**: 通常2-4天（从交易日期到申报日期）

### Form 4要点

- **申报时限**: 交易发生后2个工作日内
- **适用人员**: 董事、高管、10%以上股东
- **交易代码**:
  - P = Purchase (公开市场买入)
  - S = Sale (公开市场卖出)
  - A = Award (股权授予)
  - M = Exercise (期权行权)

### 13F要点

- **申报时限**: 季度结束后45天内
- **适用机构**: 管理资产超过$100M的机构
- **申报内容**: 持有的美股多头仓位（不包括空头、衍生品）

## 故障排查

### 问题1: 无法连接SEC服务器

```
错误: requests.exceptions.ConnectionError
```

**解决**:
1. 检查网络连接
2. 验证User-Agent设置（SEC可能屏蔽无效UA）
3. 检查是否触发速率限制（等待1分钟后重试）

### 问题2: 解析XML失败

```
错误: xml.etree.ElementTree.ParseError
```

**解决**:
1. 检查SEC是否更改了XML结构
2. 查看原始XML内容（可能是HTML错误页面）
3. 使用try-except跳过损坏的文件

### 问题3: 数据库锁定

```
错误: sqlite3.OperationalError: database is locked
```

**解决**:
1. 确保同时只有一个进程写入数据库
2. 使用`PRAGMA journal_mode=WAL`启用WAL模式
3. 添加重试逻辑

## 注意事项

### 法律合规

1. **SEC使用条款**: 遵守SEC网站使用政策
2. **速率限制**: 严格遵守每秒10次请求的限制
3. **数据使用**: 仅用于个人研究，不得商业化分发

### 数据质量

1. **申报延迟**: Form 4可能晚于实际交易2-4天
2. **修正申报**: 内部人可能提交修正文件（accession number末尾有-A）
3. **不完整数据**: 部分文件可能缺少价格信息（如赠与）

### 技术限制

1. **XML结构变化**: SEC可能不定期调整文件格式
2. **简化解析**: 当前代码仅解析非衍生品交易，不包括期权
3. **13F限制**: 13F完整解析需要处理信息表XML（未实现）

## 扩展方向

### 1. 添加更多Form类型

- **8-K**: 重大事件（收购、CEO变更等）
- **10-K/10-Q**: 年报/季报
- **S-1**: IPO注册文件

### 2. 机器学习预测

```python
# 示例：基于内部人交易预测股价
from sklearn.ensemble import RandomForestClassifier

def train_insider_signal(ticker):
    transactions = get_recent_form4(ticker, days=730)
    # 特征：内部人净买卖、交易频率、职位级别
    # 标签：未来30天股价涨跌
    # 训练模型...
```

### 3. 实时通知

```python
# 集成Telegram/Email通知
def send_alert(transaction):
    if transaction['alert_triggered']:
        message = f"⚠️ {transaction['ticker']}: {transaction['insider_name']} " \
                  f"{transaction['transaction_type']} ${transaction['transaction_value']:,.0f}"
        # 发送Telegram消息或邮件
```

## 性能优化

### 数据库索引

已创建的索引:
```sql
CREATE INDEX idx_form4_ticker_date ON form4_transactions(ticker, transaction_date);
CREATE INDEX idx_form4_insider ON form4_transactions(insider_name, ticker);
```

### 缓存策略

使用本地缓存避免重复请求:
```python
import hashlib
import json

def cache_request(url, data):
    cache_file = f"{CACHE_DIR}/{hashlib.md5(url.encode()).hexdigest()}.json"
    with open(cache_file, 'w') as f:
        json.dump(data, f)

def get_cached(url, max_age=3600):
    cache_file = f"{CACHE_DIR}/{hashlib.md5(url.encode()).hexdigest()}.json"
    if os.path.exists(cache_file):
        if time.time() - os.path.getmtime(cache_file) < max_age:
            with open(cache_file) as f:
                return json.load(f)
    return None
```

## 贡献指南

欢迎改进！优先方向：
1. 完整的13F XML解析
2. 衍生品交易解析（期权、认股权证）
3. 自动化单元测试
4. Web可视化仪表板

## 支持

- **问题报告**: 在GitHub创建Issue
- **文档**: 查看SEC EDGAR官方文档
- **社区**: 加入投资研究AI社区

---

**版本**: v1.0
**更新日期**: 2026-01-25
**作者**: Investment Research AI
