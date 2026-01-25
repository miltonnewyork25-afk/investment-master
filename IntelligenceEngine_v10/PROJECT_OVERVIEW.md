# IntelligenceEngine v10.0 - 项目总览

## 项目结构

```
IntelligenceEngine_v10/
│
├── engines/                          # 核心引擎目录
│   ├── sec_monitor.py               # SEC监控引擎主文件（800+行）
│   └── sec_config.py                # 配置文件（数据源、阈值等）
│
├── data/                            # 数据存储目录
│   ├── sec_filings.db              # SQLite数据库（自动创建）
│   └── cache/                      # API响应缓存
│
├── logs/                           # 日志目录
│   ├── sec_monitor.log            # 主日志
│   └── scheduler.log              # 调度器日志
│
├── README_SEC.md                   # 完整使用文档（20页）
├── PROJECT_OVERVIEW.md            # 本文件
│
├── test_sec_monitor.py            # 测试套件
├── scheduler.py                   # 自动调度器
├── data_analysis.py              # 数据分析示例
├── quickstart.sh                 # 快速启动脚本
└── requirements.txt              # Python依赖
```

---

## 核心组件说明

### 1. **sec_monitor.py** - 主引擎（800+行）

#### 核心类:

**SECDatabase**
- 数据库初始化与管理
- 3个核心表：form4_transactions, form13f_holdings, filing_history
- 自动去重机制
- 索引优化

**SECAPIClient**
- SEC EDGAR API封装
- 速率限制（每秒10次请求）
- 自动重试与指数退避
- User-Agent管理

**Form4Parser**
- XML/RSS Feed解析
- 提取内部人交易数据
- 数据验证与清洗
- 警报触发逻辑

**Form13FParser**
- 13F文件解析（简化版）
- 机构持仓提取

**SECMonitorEngine**
- 主监控逻辑
- 完整的监控流程
- 汇总报告生成

#### 主要方法:

```python
engine = SECMonitorEngine()

# 监控Form 4
engine.monitor_form4(ticker='TSLA', full_scan=False)

# 获取汇总
summary = engine.get_insider_summary('TSLA', days=90)

# 监控13F
engine.monitor_form13f(institution_cik='ARK')
```

---

### 2. **sec_config.py** - 配置中心

#### 核心配置:

- **监控公司列表**: 5个股票（TSLA, AAPL, NVDA, MSFT, GOOGL）
- **机构列表**: 6大机构（BlackRock, Vanguard, ARK等）
- **数据源URL**: SEC EDGAR API endpoints
- **警报阈值**: 单笔交易>$100万触发
- **速率限制**: 每秒10次，延迟110ms

#### 扩展方法:

添加新股票:
```python
MONITORED_COMPANIES = {
    "AMZN": {
        "name": "Amazon.com Inc",
        "cik": "0001018724",
        "forms": ["4", "13F-HR"]
    }
}
```

---

### 3. **数据库结构**

#### form4_transactions表（22字段）

| 关键字段 | 类型 | 说明 |
|---------|------|------|
| accession_number | TEXT | 唯一标识 |
| ticker | TEXT | 股票代码 |
| insider_name | TEXT | 内部人姓名 |
| insider_title | TEXT | 职位（CEO/CFO等） |
| transaction_code | TEXT | P=买/S=卖/A=授予/M=行权 |
| shares | REAL | 股数 |
| price_per_share | REAL | 价格 |
| transaction_value | REAL | 金额 |
| shares_owned_after | REAL | 交易后持股 |
| is_key_insider | INTEGER | 是否关键内部人 |
| alert_triggered | INTEGER | 是否触发警报 |

#### 索引策略:

```sql
-- 按股票+日期查询（最常用）
CREATE INDEX idx_form4_ticker_date ON form4_transactions(ticker, transaction_date);

-- 按内部人追踪
CREATE INDEX idx_form4_insider ON form4_transactions(insider_name, ticker);
```

---

### 4. **自动化调度**

#### scheduler.py - 定时任务

- **Form 4**: 每1小时检查
- **13F**: 每24小时检查
- **汇总报告**: 每天9:00生成

#### 使用方法:

```bash
# 前台运行（测试）
python3 scheduler.py

# 后台运行（生产）
nohup python3 scheduler.py > scheduler.log 2>&1 &

# 查看进程
ps aux | grep scheduler

# 停止
kill <PID>
```

---

### 5. **数据分析工具**

#### data_analysis.py - 高级分析

**SECDataAnalyzer类** 提供:

1. **情绪指标**: 买卖比率、净买入金额、情绪评分
2. **关键内部人追踪**: CEO/CFO等高管活动
3. **集中交易检测**: 多人同时交易 = 强信号
4. **趋势分析**: 月度变化趋势
5. **多股票对比**: 横向比较

#### 示例用法:

```python
from data_analysis import SECDataAnalyzer

analyzer = SECDataAnalyzer()

# 情绪分析
sentiment = analyzer.get_insider_sentiment('TSLA', 90)
print(sentiment['sentiment'])  # "强烈看涨"/"看跌"等

# 对比分析
comparison = analyzer.compare_tickers(['TSLA', 'AAPL', 'NVDA'], 90)

# 完整报告
report = analyzer.generate_report('TSLA')
print(report)
```

---

## 快速开始（3步）

### Step 1: 安装

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10
pip install requests
```

### Step 2: 运行测试

```bash
python3 test_sec_monitor.py
```

**预期输出**:
```
测试结果: 5 通过, 0 失败
```

### Step 3: 开始监控

```bash
# 单次运行
python3 engines/sec_monitor.py

# 或启动调度器（持续运行）
python3 scheduler.py
```

---

## 高级用法示例

### 示例1: 检测CEO卖出信号

```python
from sec_monitor import SECMonitorEngine

engine = SECMonitorEngine()

# 获取最近30天的Form 4
transactions = engine.db.get_recent_form4('TSLA', days=30)

# 筛选CEO卖出
ceo_sales = [
    t for t in transactions
    if 'CEO' in t['insider_title'] and t['transaction_code'] == 'S'
]

if ceo_sales:
    print("⚠️ CEO正在卖出！")
    for sale in ceo_sales:
        print(f"{sale['transaction_date']}: {sale['shares']:,.0f}股 @ ${sale['price_per_share']:.2f}")
```

### 示例2: 追踪ARK的持仓变化

```python
# 监控ARK的13F
engine.monitor_form13f(institution_cik='ARK')

# 查询ARK持仓的TSLA
cursor = engine.db.conn.cursor()
cursor.execute("""
    SELECT report_date, shares, market_value, shares_change_percentage
    FROM form13f_holdings
    WHERE institution_cik = '0001579982' AND ticker = 'TSLA'
    ORDER BY report_date DESC
""")

for row in cursor.fetchall():
    print(f"{row[0]}: {row[1]:,.0f}股, ${row[2]:,.0f}, 变化{row[3]:.1f}%")
```

### 示例3: 实时警报

```python
def check_alerts():
    """检查触发警报的交易"""
    engine = SECMonitorEngine()

    cursor = engine.db.conn.cursor()
    cursor.execute("""
        SELECT ticker, insider_name, transaction_value, transaction_date
        FROM form4_transactions
        WHERE alert_triggered = 1
          AND transaction_date >= date('now', '-7 days')
        ORDER BY transaction_value DESC
    """)

    for ticker, insider, value, date in cursor.fetchall():
        print(f"🚨 {ticker}: {insider}交易了${value:,.0f} ({date})")

# 每小时运行
import schedule
schedule.every(1).hours.do(check_alerts)
```

---

## 数据质量保证

### 1. 去重机制

```python
# filing_history表记录所有已处理的文件
if self.db.is_filing_processed(accession_number):
    continue  # 跳过
```

### 2. 数据验证

```python
VALIDATION_RULES = {
    "min_share_price": 0.01,      # 最低价格
    "max_share_price": 100000,    # 最高价格
    "min_shares": 1,              # 最少股数
    "max_filing_delay_days": 90   # 最大申报延迟
}
```

### 3. 错误处理

- API请求失败: 自动重试3次，指数退避
- XML解析失败: 记录日志，跳过该文件
- 数据库锁定: 使用WAL模式避免

---

## 性能优化

### 1. 速率限制

```python
# 自动限速，确保不超过SEC限制
self._rate_limit()  # 每次请求前调用
```

### 2. 索引优化

```sql
-- 最常用查询已优化
SELECT * FROM form4_transactions
WHERE ticker = 'TSLA' AND transaction_date >= '2026-01-01'
-- 使用索引: idx_form4_ticker_date
```

### 3. 缓存策略

```python
CACHE_DIR = "data/cache/"
# RSS Feed缓存1小时
# XML文件缓存永久（历史数据不变）
```

---

## 扩展方向

### Engine 2: 期权市场监控（下一步）

```python
# 规划中的功能
class OptionsMonitor:
    def get_unusual_options_activity(ticker)  # 异常期权活动
    def calculate_put_call_ratio(ticker)      # Put/Call比率
    def detect_large_sweeps(ticker)           # 大单扫货
```

### Engine 3: 社交媒体情绪

```python
class SocialSentiment:
    def scrape_reddit_wallstreetbets()
    def analyze_twitter_mentions()
    def calculate_sentiment_score()
```

### Engine 4: 13F完整解析

- 使用`sec-edgar-downloader`库
- 解析完整的持仓明细表
- 计算机构集中度指标

---

## 常见问题

### Q1: 为什么没有抓到数据？

**A**: 可能原因:
1. 公司近期没有Form 4申报（正常）
2. CIK代码错误（检查sec_config.py）
3. 网络问题（检查logs/sec_monitor.log）
4. SEC服务器维护（通常周末）

### Q2: 如何添加更多公司？

**A**: 编辑`sec_config.py`:
```python
MONITORED_COMPANIES["新股票"] = {
    "name": "公司名称",
    "cik": "SEC的CIK代码",  # 在SEC官网搜索公司可获取
    "forms": ["4", "13F-HR"]
}
```

### Q3: 数据库文件变大怎么办？

**A**: 清理旧数据:
```sql
DELETE FROM form4_transactions
WHERE transaction_date < date('now', '-5 years');

VACUUM;  -- 压缩数据库
```

### Q4: 如何导出到Excel？

**A**: 使用pandas:
```python
import pandas as pd
import sqlite3

conn = sqlite3.connect('data/sec_filings.db')
df = pd.read_sql_query("SELECT * FROM form4_transactions", conn)
df.to_excel('form4_data.xlsx', index=False)
```

---

## 技术栈

- **Python**: 3.7+
- **HTTP**: requests库
- **数据库**: SQLite3
- **解析**: xml.etree（标准库）
- **调度**: 自定义调度器（可选schedule库）

---

## 贡献者指南

### 代码规范:

- PEP 8风格
- 类型提示（Type Hints）
- 详细注释（中文）
- 单元测试覆盖

### 提交流程:

1. Fork项目
2. 创建功能分支
3. 添加测试
4. 提交Pull Request

---

## 许可与免责

### 使用许可:

- 个人研究: ✅ 允许
- 商业用途: ⚠️ 需遵守SEC条款
- 再分发: ⚠️ 需保留作者信息

### 免责声明:

本工具仅供教育和研究目的。投资有风险，决策需谨慎。作者不对使用本工具导致的任何损失负责。

---

## 更新日志

### v1.0 (2026-01-25)

**新功能**:
- ✅ Form 4自动监控
- ✅ 13F基础支持
- ✅ SQLite数据存储
- ✅ 自动调度器
- ✅ 数据分析工具
- ✅ 完整测试套件

**已知限制**:
- 13F解析为简化版（仅RSS Feed）
- 不包括衍生品交易（期权等）
- 需要手动配置CIK代码

**下一版本计划**:
- 完整13F XML解析
- Web可视化仪表板
- 实时通知系统
- 期权市场监控

---

## 联系方式

- **项目主页**: /Users/milton/投资大师/IntelligenceEngine_v10
- **文档**: README_SEC.md
- **问题报告**: 查看logs/sec_monitor.log

---

**版本**: v1.0
**最后更新**: 2026-01-25
**作者**: Investment Research AI Team
