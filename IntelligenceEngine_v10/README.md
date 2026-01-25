# IntelligenceEngine v10

**可复用的投资情报自动化系统** - 监控SEC文件、社交情绪、供应链、期权流、竞品动态、财报预测

---

## 📋 目录

- [快速开始](#快速开始)
- [系统架构](#系统架构)
- [6大引擎详解](#6大引擎详解)
- [配置指南](#配置指南)
- [API密钥申请](#api密钥申请)
- [使用示例](#使用示例)
- [故障排查](#故障排查)
- [扩展开发](#扩展开发)

---

## 🚀 快速开始

### 1. 安装依赖 (5分钟)

```bash
# 克隆项目
cd IntelligenceEngine_v10

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 或使用setup.py
pip install -e .
```

### 2. 配置API密钥

创建 `.env` 文件：

```bash
# SEC API (免费层: 10 req/day)
SEC_API_KEY=your_sec_api_key

# Reddit API
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_secret

# Twitter API (可选)
TWITTER_BEARER_TOKEN=your_twitter_token

# Financial APIs
ALPHA_VANTAGE_API_KEY=your_av_key
FMP_API_KEY=your_fmp_key
QUANDL_API_KEY=your_quandl_key

# 告警 (可选)
SLACK_WEBHOOK_URL=your_slack_webhook
EMAIL_PASSWORD=your_email_password
```

### 3. 运行测试

```bash
# 运行所有引擎一次
python main.py

# 启动守护进程 (自动调度)
python main.py --daemon

# 生成今日报告
python main.py --report daily

# 只运行SEC监控
python main.py --engine sec

# 查看系统状态
python main.py --status
```

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    IntelligenceEngine v10                    │
│                      (Main Controller)                       │
└──────┬──────────────────────────────────────────────┬───────┘
       │                                               │
       ├─────────────── 6大引擎 ─────────────────────┤
       │                                               │
   ┌───▼────┐  ┌──────────┐  ┌────────────┐  ┌──────▼─────┐
   │  SEC   │  │ 情绪追踪  │  │  供应链    │  │  期权解码  │
   │ Monitor│  │ Tracker   │  │   Intel    │  │  Decoder   │
   └───┬────┘  └─────┬────┘  └──────┬─────┘  └──────┬─────┘
       │             │               │                │
   ┌───▼────┐  ┌────▼─────┐  ┌──────▼─────┐
   │ 竞品   │  │ 财报预测  │  │  数据库    │
   │Tracker │  │Predictor  │  │ (SQLite)   │
   └───┬────┘  └─────┬────┘  └──────┬─────┘
       │             │               │
       └─────────────┴───────────────┴────────┐
                                               │
                     ┌────────────────────────▼┐
                     │    自动化模块           │
                     │ - 调度器 (APScheduler) │
                     │ - 报告生成器           │
                     │ - 告警系统             │
                     └────────────────────────┘
```

### 数据流程图

```
外部数据源                引擎处理              存储         输出
─────────              ─────────            ────         ────

SEC EDGAR    ──────►   SEC Monitor   ──┐
Reddit API   ──────►   Sentiment     ──┤
Supplier SEC ──────►   Supply Chain  ──┤
Options Data ──────►   Options Decode──┼──► Database ──► Reports
Competitor $ ──────►   Competitor    ──┤                  Alerts
Delivery #s  ──────►   Earnings Pred ──┘
```

---

## 🔧 6大引擎详解

### 1. SEC Monitor (8-K秒级监控)

**功能**：
- 每天18:00自动检查SEC EDGAR
- 监控表格: 8-K, 10-Q, 10-K, 4, SC 13D/G
- 关键词告警: material, investigation, restatement
- 解析MD&A、Risk Factors变化

**数据结构**：
```python
{
    "filing_date": "2026-01-20",
    "form_type": "8-K",
    "items": ["1.01", "9.01"],  # 触发事件
    "keywords_found": ["material agreement"],
    "sentiment_score": -0.3,
    "previous_filing_diff": "新增风险因素3条"
}
```

### 2. Sentiment Tracker (多源情绪)

**数据源**：
- Reddit: r/teslamotors, r/TeslaFSD, r/RealTesla
- Twitter: $TSLA, @elonmusk
- StockTwits: 散户情绪

**输出指标**：
- 情绪得分: -1.0 (极度悲观) 到 +1.0 (极度乐观)
- 提及量趋势
- 主题词云
- 异常情绪告警

### 3. Supply Chain Intel (供应商财报扫描)

**监控对象** (见 `suppliers_config.yaml`):
- Panasonic (电池)
- CATL (电池)
- BYD (电池)
- Samsung SDI
- Lidar供应商

**指标**：
- Tesla收入占比
- 库存天数变化 (需求信号)
- Capex引导 (未来产能)
- 订单积压

### 4. Options Decoder (大资金流向)

**分析**：
- Put/Call Ratio
- Max Pain价格
- 巨鲸交易 (>10K contracts)
- IV Percentile
- Gamma Squeeze风险

### 5. Competitor Tracker (竞品对比)

**对标公司**：
- 传统车企: GM, Ford
- 新势力: Rivian, Lucid, NIO
- 中国: BYD

**对比指标**：
- 市值/PE/毛利率
- 交付量/市场份额
- 价格相关性

### 6. Earnings Predictor (财报预测)

**模型**：
- Linear Regression (基准)
- Prophet (时间序列)
- LSTM (深度学习)

**特征工程**：
- 交付数据 (已公布)
- 平均售价 (ASP)
- 储能装机量
- 碳积分收入
- 比特币持仓

**输出**：
```
Q1 2026 预测:
  Revenue: $24.5B - $26.2B (±$850M)
  EPS: $0.85 - $0.95
  置信度: 78%
  Beat概率: 62%
```

---

## ⚙️ 配置指南

### 切换到其他公司 (只需5步)

编辑 `config.yaml`:

```yaml
company:
  name: Apple           # 改公司名
  ticker: AAPL          # 改股票代码
  cik: "0000320193"     # 改SEC CIK
  industry: technology  # 改行业
  competitors:          # 改竞品列表
    - MSFT
    - GOOGL
    - META
```

创建 `suppliers_config.yaml` (如果需要供应链引擎):

```yaml
suppliers:
  - name: TSMC
    ticker: TSM
    cik: "0001046179"
    relationship: "芯片代工"

  - name: Foxconn
    ticker: 2317.TW
    relationship: "组装"
```

### 自定义调度时间

```yaml
engines:
  sec_monitor:
    schedule: "0 18 * * *"  # Cron表达式
    # 每天18:00

  sentiment_tracker:
    schedule: "0 9,21 * * *"
    # 每天9:00和21:00

  supply_chain_intel:
    schedule: "0 10 * * 1"
    # 每周一10:00
```

### 启用/禁用引擎

```yaml
engines:
  sec_monitor:
    enabled: true   # 启用

  sentiment_tracker:
    enabled: false  # 禁用
```

---

## 🔑 API密钥申请

### 1. SEC API (必需)

- 官网: https://sec-api.io/
- 免费层: 10次/天
- 申请: 注册即可获得API Key
- 费用: $0 (免费) / $49/月 (无限)

### 2. Reddit API (必需)

1. 访问 https://www.reddit.com/prefs/apps
2. 点击 "Create App"
3. 选择 "script"
4. 获得 `client_id` 和 `client_secret`
5. 完全免费

### 3. Twitter API (可选)

- 官网: https://developer.twitter.com/
- 免费层: 500,000 tweets/月
- 申请: 需要说明使用场景
- 审核周期: 1-3天

### 4. Financial APIs (推荐)

**Alpha Vantage** (免费)
- 官网: https://www.alphavantage.co/
- 免费: 5次/分钟, 500次/天
- 用途: 股价、财务数据

**Financial Modeling Prep** (推荐)
- 官网: https://financialmodelingprep.com/
- 免费: 250次/天
- 用途: 财报、估值指标

**Quandl** (可选)
- 官网: https://www.quandl.com/
- 免费层有限
- 用途: 另类数据

### 5. Slack通知 (可选)

1. 创建Slack Workspace
2. 添加Incoming Webhook
3. 获取Webhook URL
4. 免费

---

## 💡 使用示例

### 场景1: 每日自动监控

```bash
# 1. 后台启动守护进程
nohup python main.py --daemon > logs/daemon.log 2>&1 &

# 2. 系统会自动:
#    - 18:00 检查SEC文件
#    - 09:00 & 21:00 抓取社交情绪
#    - 16:00 (收盘) 解析期权数据
#    - 20:00 生成今日报告

# 3. 查看日志
tail -f logs/intelligence_engine.log
```

### 场景2: 财报季使用

```bash
# 财报前一周，每天运行预测
python main.py --engine earnings

# 财报发布当天，检查SEC 8-K
python main.py --engine sec

# 生成专题报告
python main.py --report daily
```

### 场景3: 重大事件响应

```bash
# 假设Elon发推后，立即检查情绪
python main.py --engine sentiment

# 如果发现异常期权活动
python main.py --engine options

# 生成紧急报告
python main.py --report daily
```

### 场景4: 批量回测

```python
from engines import EarningsPredictor
from automation import Database

db = Database({'type': 'sqlite', 'path': 'data/database.db'})
predictor = EarningsPredictor(config, db, None)

# 回测过去8个季度
results = predictor.backtest(quarters=8)
print(f"平均误差: {results['mae']}")
print(f"准确率 (±5%): {results['accuracy']}")
```

---

## 🐛 故障排查

### 问题1: SEC API返回403

**原因**: 未设置User-Agent或超过速率限制

**解决**:
```python
# 检查 utils/api_clients.py
headers = {
    'User-Agent': 'YourCompany research@example.com'
}
```

### 问题2: Reddit API认证失败

**检查清单**:
- `.env` 文件中REDDIT_CLIENT_ID和SECRET是否正确
- Reddit App类型是否为"script"
- 是否安装了praw库

**测试代码**:
```python
import praw
reddit = praw.Reddit(
    client_id='your_id',
    client_secret='your_secret',
    user_agent='testscript'
)
print(reddit.user.me())  # 应该输出None (正常)
```

### 问题3: 数据库锁定

**原因**: 多个进程同时写入SQLite

**解决**:
```bash
# 停止所有守护进程
pkill -f "python main.py"

# 检查数据库
sqlite3 data/database.db "PRAGMA integrity_check;"

# 如果损坏，从备份恢复
cp data/database.db.backup data/database.db
```

### 问题4: 调度器不执行

**调试**:
```python
# 在main.py中添加调试日志
import logging
logging.basicConfig(level=logging.DEBUG)

# 检查调度任务
python -c "
from automation import Scheduler
s = Scheduler(config, engines, reporter, alerter)
s.print_jobs()  # 打印所有任务
"
```

### 问题5: 内存占用过高

**优化**:
```yaml
# config.yaml
performance:
  max_workers: 2  # 减少并发
  cache_enabled: false  # 禁用缓存
```

```python
# 定期清理旧数据
python -c "
from automation import Database
db = Database(config['database'])
db.cleanup_old_data(days=90)  # 只保留90天
"
```

---

## 🔌 扩展开发

### 添加新引擎

1. 创建 `engines/new_engine.py`:

```python
from .base_engine import BaseEngine

class NewEngine(BaseEngine):
    def __init__(self, config, db, alert_system):
        super().__init__('new_engine', config, db, alert_system)

    def run(self):
        """引擎主逻辑"""
        self.logger.info("NewEngine 运行中...")

        # 1. 获取数据
        data = self._fetch_data()

        # 2. 处理数据
        processed = self._process(data)

        # 3. 存储结果
        self.db.save('new_engine_data', processed)

        # 4. 触发告警 (如果需要)
        if self._should_alert(processed):
            self.alert_system.send_alert(
                "NewEngine 告警",
                f"发现异常: {processed}",
                level="warning"
            )

        self.logger.info("NewEngine 完成")
```

2. 在 `engines/__init__.py` 中注册:

```python
from .new_engine import NewEngine

__all__ = [
    'SECMonitor',
    'SentimentTracker',
    # ...
    'NewEngine'
]
```

3. 在 `config.yaml` 中配置:

```yaml
engines:
  new_engine:
    enabled: true
    schedule: "0 12 * * *"
    custom_param: value
```

4. 在 `main.py` 中添加:

```python
engine_classes = {
    # ...
    'new_engine': NewEngine
}
```

### 自定义报告模板

创建 `automation/templates/custom_report.md`:

```markdown
# {{company_name}} 自定义报告
**生成时间**: {{timestamp}}

## 核心指标
{% for metric in metrics %}
- {{metric.name}}: {{metric.value}} ({{metric.change}})
{% endfor %}

## 引擎输出
{% for engine_name, output in engine_outputs.items() %}
### {{engine_name}}
{{output}}
{% endfor %}
```

在 `automation/report_generator.py` 中使用:

```python
from jinja2 import Template

template = Template(open('templates/custom_report.md').read())
report = template.render(
    company_name=self.config['company']['name'],
    timestamp=datetime.now(),
    metrics=metrics,
    engine_outputs=outputs
)
```

### 添加新数据源

在 `utils/api_clients.py` 中:

```python
class NewDataSource:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.newsource.com"

    def fetch(self, ticker, **params):
        response = requests.get(
            f"{self.base_url}/data/{ticker}",
            headers={'Authorization': f'Bearer {self.api_key}'},
            params=params
        )
        return response.json()
```

---

## 📊 性能基准

**硬件**: MacBook Pro M1, 16GB RAM

| 引擎 | 平均运行时间 | 内存占用 | API调用 |
|------|-------------|---------|---------|
| SEC Monitor | 15s | 50MB | 5-10 |
| Sentiment Tracker | 45s | 120MB | 50-100 |
| Supply Chain | 60s | 80MB | 20-30 |
| Options Decoder | 30s | 60MB | 10-15 |
| Competitor Tracker | 40s | 70MB | 15-20 |
| Earnings Predictor | 90s | 150MB | 5 |
| **总计** | **4-5分钟** | **~500MB** | **105-180** |

---

## 📝 版本历史

### v10.0.0 (2026-01-25)
- ✨ 初始发布
- ✅ 6大引擎完整实现
- ✅ 可复用配置系统
- ✅ 自动化调度
- ✅ 多渠道告警

### 未来计划
- [ ] 添加Telegram通知
- [ ] WebUI仪表盘
- [ ] Docker一键部署
- [ ] 云端部署指南 (AWS/GCP)
- [ ] 更多ML模型 (XGBoost, Transformer)

---

## 📄 许可证

MIT License - 可自由用于个人和商业项目

---

## 🤝 贡献

欢迎提交Issue和Pull Request!

**开发指南**:
```bash
# 安装开发依赖
pip install -r requirements.txt
pip install pytest black flake8

# 运行测试
pytest tests/

# 代码格式化
black .

# 代码检查
flake8 .
```

---

## 📞 支持

- 文档: https://intelligence-engine.readthedocs.io/
- 问题反馈: GitHub Issues
- 邮件: research@example.com

---

**⚠️ 免责声明**: 本系统仅供研究和教育用途,不构成投资建议。投资有风险,决策需谨慎。
