# SEC Monitor - 实用示例集

## 目录
1. [基础用法](#基础用法)
2. [高级分析](#高级分析)
3. [自动化场景](#自动化场景)
4. [实战策略](#实战策略)
5. [故障排查](#故障排查)

---

## 基础用法

### 示例1: 第一次使用（完整流程）

```bash
# 1. 进入项目目录
cd /Users/milton/投资大师/IntelligenceEngine_v10

# 2. 安装依赖
pip3 install requests

# 3. 测试系统
python3 test_sec_monitor.py

# 4. 监控特斯拉
python3 cli.py monitor TSLA

# 5. 查看汇总
python3 cli.py summary TSLA

# 6. 系统状态
python3 cli.py status
```

**预期输出**:
```
📊 TSLA 内部人交易汇总（90天）
======================================================================
总交易数: 15
内部人数: 8
买入交易: 3 笔
卖出交易: 12 笔
买入金额: $5.20M
卖出金额: $42.30M
净买卖额: -$37.10M
买卖比率: 0.12

情绪指标: 强烈看跌
======================================================================
```

---

### 示例2: 监控单一股票

```python
# monitor_single.py
from engines import SECMonitorEngine

engine = SECMonitorEngine()

# 监控NVIDIA
print("开始监控NVDA...")
engine.monitor_form4(ticker='NVDA', full_scan=False)

# 获取最近交易
recent = engine.db.get_recent_form4('NVDA', days=30)

print(f"\n最近30天交易: {len(recent)}笔")
for txn in recent[:5]:
    print(f"{txn['transaction_date']}: {txn['insider_name']}")
    print(f"  {txn['transaction_type']} {txn['shares']:,.0f}股")

engine.close()
```

---

### 示例3: 命令行快速查询

```bash
# 监控所有股票
python3 cli.py monitor

# 对比三只股票（30天）
python3 cli.py compare TSLA NVDA AAPL --days 30

# 查看警报（大额交易）
python3 cli.py alert

# 显示最大20笔交易
python3 cli.py largest --limit 20

# 生成TSLA完整报告
python3 cli.py report TSLA
```

---

## 高级分析

### 示例4: 检测内部人抄底信号

```python
# detect_bottom_fishing.py
"""
检测逻辑：
1. 股价近期下跌（需从其他数据源获取）
2. 多个内部人同时买入
3. 买入金额超过历史平均
"""

from engines import SECMonitorEngine
from data_analysis import SECDataAnalyzer
from datetime import datetime, timedelta

def detect_bottom_fishing(ticker, days=30):
    analyzer = SECDataAnalyzer()

    # 获取最近交易
    cursor = analyzer.conn.cursor()
    cutoff = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

    cursor.execute("""
        SELECT
            transaction_date,
            COUNT(DISTINCT insider_name) as buyer_count,
            SUM(transaction_value) as total_buy_value
        FROM form4_transactions
        WHERE ticker = ?
          AND transaction_code = 'P'  -- 只看买入
          AND transaction_date >= ?
        GROUP BY transaction_date
        HAVING buyer_count >= 2  -- 至少2人
        ORDER BY total_buy_value DESC
    """, (ticker, cutoff))

    signals = []
    for row in cursor.fetchall():
        date, buyers, value = row
        if value >= 1000000:  # 总买入超过100万
            signals.append({
                'date': date,
                'buyers': buyers,
                'value': value,
                'signal': '🔥 强烈抄底信号' if buyers >= 3 else '⚠️ 抄底信号'
            })

    analyzer.close()
    return signals

# 使用
signals = detect_bottom_fishing('TSLA', days=30)
for sig in signals:
    print(f"{sig['date']}: {sig['buyers']}人买入${sig['value']:,.0f} - {sig['signal']}")
```

---

### 示例5: CEO交易追踪

```python
# ceo_tracker.py
"""追踪CEO的买卖行为 - 最强信号"""

from engines import SECMonitorEngine

def track_ceo_trades(ticker, days=90):
    engine = SECMonitorEngine()

    cursor = engine.db.conn.cursor()
    cursor.execute("""
        SELECT
            transaction_date,
            insider_name,
            transaction_code,
            shares,
            price_per_share,
            transaction_value
        FROM form4_transactions
        WHERE ticker = ?
          AND (insider_title LIKE '%CEO%' OR insider_title LIKE '%Chief Executive%')
          AND transaction_date >= date('now', '-' || ? || ' days')
        ORDER BY transaction_date DESC
    """, (ticker, days))

    ceo_trades = cursor.fetchall()

    if not ceo_trades:
        print(f"❌ {ticker}: 过去{days}天CEO无交易")
        return

    print(f"\n{'='*70}")
    print(f"{ticker} CEO交易追踪（{days}天）")
    print('='*70)

    buy_total = 0
    sell_total = 0

    for date, name, code, shares, price, value in ceo_trades:
        action = "买入" if code == 'P' else "卖出"
        emoji = "🟢" if code == 'P' else "🔴"

        print(f"\n{emoji} {date} - {name}")
        print(f"   {action} {shares:,.0f}股 @ ${price:.2f}")
        print(f"   金额: ${value:,.0f}")

        if code == 'P':
            buy_total += value
        else:
            sell_total += value

    print(f"\n{'='*70}")
    print(f"汇总: 买入${buy_total:,.0f} | 卖出${sell_total:,.0f}")
    print(f"净值: ${buy_total - sell_total:,.0f}")

    if buy_total > sell_total:
        print("✅ 结论: CEO看好公司 - 考虑买入")
    else:
        print("⚠️ 结论: CEO减持 - 谨慎")

    print('='*70 + '\n')
    engine.close()

# 批量追踪
for ticker in ['TSLA', 'NVDA', 'AAPL', 'MSFT']:
    track_ceo_trades(ticker, days=180)
```

---

### 示例6: 内部人情绪仪表板

```python
# sentiment_dashboard.py
"""生成多股票情绪仪表板"""

from data_analysis import SECDataAnalyzer

def generate_dashboard(tickers, days=90):
    analyzer = SECDataAnalyzer()

    print(f"\n{'='*100}")
    print(f"{'内部人情绪仪表板':^100}")
    print(f"{'统计周期: ' + str(days) + '天':^100}")
    print('='*100)

    # 表头
    print(f"\n{'股票':<8} {'情绪':<12} {'买卖比率':<10} {'净买入':<15} "
          f"{'买入笔数':<10} {'卖出笔数':<10} {'关键交易':<10}")
    print('-'*100)

    results = []
    for ticker in tickers:
        sentiment = analyzer.get_insider_sentiment(ticker, days)
        key_trades = len(analyzer.get_key_insider_activity(ticker, days))

        results.append({
            'ticker': ticker,
            'sentiment': sentiment['sentiment'],
            'ratio': sentiment['buy_sell_ratio'],
            'net': sentiment['net_value'],
            'buy_count': sentiment['buy_transactions'],
            'sell_count': sentiment['sell_transactions'],
            'key_trades': key_trades
        })

    # 按净买入排序
    results.sort(key=lambda x: x['net'], reverse=True)

    # 显示
    for r in results:
        emoji = "🟢" if r['net'] > 0 else "🔴" if r['net'] < 0 else "⚪"
        print(f"{emoji} {r['ticker']:<6} {r['sentiment']:<12} "
              f"{r['ratio']:>8.2f}  ${r['net']:>12,.0f}  "
              f"{r['buy_count']:>8}    {r['sell_count']:>8}    "
              f"{r['key_trades']:>8}")

    print('='*100)

    # 最佳/最差
    best = results[0]
    worst = results[-1]

    print(f"\n🏆 最看好: {best['ticker']} (净买入${best['net']:,.0f})")
    print(f"⚠️ 最看跌: {worst['ticker']} (净卖出${abs(worst['net']):,.0f})")
    print('='*100 + '\n')

    analyzer.close()

# 使用
tickers = ['TSLA', 'AAPL', 'NVDA', 'MSFT', 'GOOGL']
generate_dashboard(tickers, days=90)
```

---

## 自动化场景

### 示例7: 每日邮件报告

```python
# daily_email_report.py
"""每天早上9点发送昨日内部人交易汇总"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from data_analysis import SECDataAnalyzer

def generate_daily_report():
    analyzer = SECDataAnalyzer()
    yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')

    report = []
    report.append(f"内部人交易日报 - {yesterday}\n")
    report.append("="*70 + "\n")

    cursor = analyzer.conn.cursor()
    cursor.execute("""
        SELECT ticker, COUNT(*) as count, SUM(transaction_value) as total
        FROM form4_transactions
        WHERE transaction_date = ?
        GROUP BY ticker
        ORDER BY count DESC
    """, (yesterday,))

    results = cursor.fetchall()

    if not results:
        report.append("昨日无新增交易\n")
    else:
        report.append(f"{'股票':<10} {'交易数':<10} {'总金额':<20}\n")
        report.append("-"*70 + "\n")
        for ticker, count, total in results:
            report.append(f"{ticker:<10} {count:<10} ${total:>15,.0f}\n")

    analyzer.close()
    return "".join(report)

def send_email(subject, body, to_email):
    """发送邮件（需配置SMTP）"""
    from_email = "your_email@gmail.com"
    password = "your_app_password"  # Gmail应用专用密码

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, password)
        server.send_message(msg)
        server.quit()
        print("✅ 邮件已发送")
    except Exception as e:
        print(f"❌ 邮件发送失败: {e}")

# 使用（配合cron每天9点运行）
if __name__ == '__main__':
    report = generate_daily_report()
    send_email(
        subject=f"内部人交易日报 - {datetime.now().strftime('%Y-%m-%d')}",
        body=report,
        to_email="investor@example.com"
    )
```

---

### 示例8: Telegram实时警报

```python
# telegram_alert.py
"""大额交易实时推送到Telegram"""

import requests
from engines import SECMonitorEngine
import time

TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"

def send_telegram(message):
    """发送Telegram消息"""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    requests.post(url, data=data)

def monitor_with_alerts():
    """监控并发送警报"""
    engine = SECMonitorEngine()

    while True:
        print(f"[{time.strftime('%H:%M:%S')}] 检查新交易...")

        # 监控所有股票
        engine.monitor_form4(full_scan=False)

        # 查询警报
        cursor = engine.db.conn.cursor()
        cursor.execute("""
            SELECT ticker, insider_name, transaction_type, transaction_value, transaction_date
            FROM form4_transactions
            WHERE alert_triggered = 1
              AND created_at >= datetime('now', '-1 hour')
        """)

        for ticker, insider, txn_type, value, date in cursor.fetchall():
            message = f"""
🚨 *大额交易警报*

股票: `{ticker}`
内部人: {insider}
类型: {txn_type}
金额: ${value:,.0f}
日期: {date}
            """
            send_telegram(message)
            print(f"✅ 已发送警报: {ticker} {insider}")

        # 每小时检查一次
        time.sleep(3600)

# 后台运行: nohup python telegram_alert.py &
if __name__ == '__main__':
    monitor_with_alerts()
```

---

## 实战策略

### 示例9: 反向指标策略

```python
# contrarian_strategy.py
"""
策略逻辑：
当内部人大量卖出时，散户恐慌 → 可能是买入机会
当内部人大量买入时，散户FOMO → 可能已过热
"""

from data_analysis import SECDataAnalyzer

def contrarian_signals(ticker, days=30):
    analyzer = SECDataAnalyzer()
    sentiment = analyzer.get_insider_sentiment(ticker, days)

    print(f"\n{'='*70}")
    print(f"{ticker} 反向指标分析")
    print('='*70)

    # 极端卖出 = 可能超卖
    if sentiment['buy_sell_ratio'] < 0.1 and sentiment['sell_value'] > 50000000:
        print("🟢 信号: 内部人大量卖出（可能税务/流动性需求）")
        print("   → 散户恐慌，考虑逢低买入")
        print(f"   卖出金额: ${sentiment['sell_value']:,.0f}")

    # 极端买入 = 可能过热
    elif sentiment['buy_sell_ratio'] > 5 and sentiment['buy_value'] > 20000000:
        print("🔴 信号: 内部人大量买入（已引起市场注意）")
        print("   → 可能过热，谨慎追高")
        print(f"   买入金额: ${sentiment['buy_value']:,.0f}")

    # 平衡
    else:
        print("⚪ 信号: 内部人交易平衡，无明显方向")

    # 集中交易检测
    clusters = analyzer.get_trading_clusters(ticker, days)
    if clusters:
        print(f"\n⚠️ 发现{len(clusters)}次集中交易（强信号）")
        for c in clusters:
            print(f"   {c['date']}: {c['insider_count']}人同时交易")

    print('='*70 + '\n')
    analyzer.close()

# 扫描所有股票
for ticker in ['TSLA', 'NVDA', 'AAPL']:
    contrarian_signals(ticker, days=60)
```

---

### 示例10: 配对交易筛选

```python
# pairs_trading.py
"""
找出内部人情绪分化的配对（一个看涨一个看跌）
用于配对交易（做多强的/做空弱的）
"""

from data_analysis import SECDataAnalyzer

def find_pairs(tickers, days=90):
    analyzer = SECDataAnalyzer()

    sentiments = {}
    for ticker in tickers:
        s = analyzer.get_insider_sentiment(ticker, days)
        sentiments[ticker] = s

    # 排序（净买入从高到低）
    sorted_tickers = sorted(sentiments.keys(),
                           key=lambda t: sentiments[t]['net_value'],
                           reverse=True)

    print(f"\n{'='*70}")
    print("配对交易候选（同行业公司）")
    print('='*70)

    # 最强 vs 最弱
    strongest = sorted_tickers[0]
    weakest = sorted_tickers[-1]

    print(f"\n做多: {strongest}")
    print(f"  内部人净买入: ${sentiments[strongest]['net_value']:,.0f}")
    print(f"  情绪: {sentiments[strongest]['sentiment']}")

    print(f"\n做空: {weakest}")
    print(f"  内部人净卖出: ${abs(sentiments[weakest]['net_value']):,.0f}")
    print(f"  情绪: {sentiments[weakest]['sentiment']}")

    print(f"\n建议: 做多{strongest}/做空{weakest} 配对")
    print('='*70 + '\n')

    analyzer.close()

# 示例：科技股配对
tech_stocks = ['AAPL', 'MSFT', 'GOOGL']
find_pairs(tech_stocks, days=90)

# 示例：半导体配对
semi_stocks = ['NVDA', 'AMD', 'INTC']
find_pairs(semi_stocks, days=90)
```

---

## 故障排查

### 问题1: 无法获取数据

```python
# debug_api.py
"""测试SEC API连接"""

from engines.sec_monitor import SECAPIClient
from engines.sec_config import MONITORED_COMPANIES

client = SECAPIClient()

# 测试单个公司
ticker = 'TSLA'
info = MONITORED_COMPANIES[ticker]

print(f"测试 {ticker} (CIK: {info['cik']})")

url = f"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK={info['cik']}&type=4&count=10&output=atom"

print(f"URL: {url}")

response = client.fetch_url(url)

if response:
    print(f"✅ 成功获取 ({len(response)} 字符)")
    print(f"前500字符:\n{response[:500]}")
else:
    print("❌ 获取失败")
    print("可能原因:")
    print("1. 网络问题")
    print("2. SEC服务器维护")
    print("3. User-Agent被屏蔽")
```

### 问题2: 数据库损坏

```bash
# 修复数据库
cd /Users/milton/投资大师/IntelligenceEngine_v10

# 备份
cp data/sec_filings.db data/sec_filings.db.backup

# 检查完整性
sqlite3 data/sec_filings.db "PRAGMA integrity_check;"

# 如果损坏，重建
rm data/sec_filings.db
python3 -c "from engines import SECDatabase; SECDatabase()"
```

### 问题3: 速率限制

```python
# check_rate_limit.py
"""检查请求频率"""

import time
from engines.sec_monitor import SECAPIClient

client = SECAPIClient()

print("测试速率限制...")
start = time.time()

for i in range(5):
    url = "https://www.sec.gov"
    client.fetch_url(url)
    print(f"请求 {i+1}/5 完成")

elapsed = time.time() - start
print(f"\n5次请求用时: {elapsed:.2f}秒")
print(f"平均间隔: {elapsed/5:.2f}秒/次")
print(f"预期间隔: 0.11秒/次（符合SEC要求）")
```

---

## 性能优化

### 示例11: 批量导出

```python
# batch_export.py
"""批量导出所有数据到CSV"""

import sqlite3
import pandas as pd
from engines.sec_config import DB_PATH

conn = sqlite3.connect(DB_PATH)

# 导出Form 4
df_form4 = pd.read_sql_query("SELECT * FROM form4_transactions", conn)
df_form4.to_csv('data/export_form4.csv', index=False)
print(f"✅ 导出 {len(df_form4)} 条Form 4记录")

# 导出13F
df_13f = pd.read_sql_query("SELECT * FROM form13f_holdings", conn)
df_13f.to_csv('data/export_13f.csv', index=False)
print(f"✅ 导出 {len(df_13f)} 条13F记录")

conn.close()
```

---

**版本**: 1.0
**更新**: 2026-01-25
