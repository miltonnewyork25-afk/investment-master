# IntelligenceEngine v10 - 系统架构详解

## 系统架构图

```
┌─────────────────────────────────────────────────────────────────────┐
│                     用户交互层 (User Interface)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐       │
│  │   CLI    │   │   Web    │   │  Docker  │   │   API    │       │
│  │ main.py  │   │Dashboard │   │Compose   │   │ (Future) │       │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘       │
│       └───────────────┴──────────────┴──────────────┘              │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                      主控制器 (Main Controller)                      │
│                           IntelligenceEngine                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    配置管理 (Config)                         │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐       │   │
│  │  │ config.yaml │  │ .env (keys)  │  │ suppliers   │       │   │
│  │  └─────────────┘  └──────────────┘  └─────────────┘       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                        引擎层 (Engine Layer)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     BaseEngine (基类)                          │  │
│  │  - 日志系统 (Logger)                                          │  │
│  │  - 数据库访问 (Database Access)                               │  │
│  │  - 告警发送 (Alert Sender)                                    │  │
│  │  - 统计信息 (Stats Tracking)                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │SEC Monitor  │  │ Sentiment   │  │Supply Chain │               │
│  │             │  │  Tracker    │  │   Intel     │               │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤               │
│  │• 8-K/10-Q   │  │• Reddit API │  │• Suppliers  │               │
│  │• 10-K/4/13D │  │• Twitter    │  │• SEC Scan   │               │
│  │• Keywords   │  │• VADER      │  │• Metrics    │               │
│  │• MD&A Diff  │  │• FinBERT    │  │• Signals    │               │
│  └─────────────┘  └─────────────┘  └─────────────┘               │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │  Options    │  │ Competitor  │  │  Earnings   │               │
│  │  Decoder    │  │  Tracker    │  │ Predictor   │               │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤               │
│  │• Put/Call   │  │• Market Cap │  │• Regression │               │
│  │• Max Pain   │  │• PE Ratio   │  │• Prophet    │               │
│  │• IV %ile    │  │• Growth     │  │• LSTM       │               │
│  │• Whale Detect│ │• Correlation│  │• Ensemble   │               │
│  └─────────────┘  └─────────────┘  └─────────────┘               │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                      自动化层 (Automation Layer)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              调度器 (Scheduler - APScheduler)               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │Engine1   │  │Engine2   │  │Report    │  │Cleanup   │  │   │
│  │  │18:00 ⏰ │  │09:00 ⏰ │  │20:00 ⏰ │  │02:00 ⏰ │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │
│  │   Database      │  │ Report Generator │  │  Alert System   │  │
│  ├─────────────────┤  ├──────────────────┤  ├─────────────────┤  │
│  │• SQLite         │  │• Markdown        │  │• Email (SMTP)   │  │
│  │• 6 Tables       │  │• Daily/Weekly    │  │• Slack Webhook  │  │
│  │• Auto Cleanup   │  │• Monthly         │  │• Telegram Bot   │  │
│  │• Backup         │  │• Custom          │  │• Levels: I/W/E  │  │
│  └─────────────────┘  └──────────────────┘  └─────────────────┘  │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                      数据层 (Data Layer)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  数据库 Schema (SQLite)                      │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │sec_filings   │  │sentiment_data│  │supply_chain  │     │   │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤     │   │
│  │  │id            │  │id            │  │id            │     │   │
│  │  │ticker        │  │ticker        │  │ticker        │     │   │
│  │  │form_type     │  │avg_sentiment │  │supplier_name │     │   │
│  │  │filed_at      │  │total_posts   │  │exposure      │     │   │
│  │  │keywords_found│  │pos/neg/neu   │  │inventory_days│     │   │
│  │  │timestamp     │  │timestamp     │  │timestamp     │     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │options_data  │  │competitor_data│ │earnings_pred │     │   │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤     │   │
│  │  │id            │  │id            │  │id            │     │   │
│  │  │ticker        │  │ticker        │  │ticker        │     │   │
│  │  │put_call_ratio│  │comparison    │  │revenue_range │     │   │
│  │  │max_pain      │  │rankings      │  │eps_range     │     │   │
│  │  │whale_detected│  │timestamp     │  │confidence    │     │   │
│  │  │timestamp     │  └──────────────┘  │timestamp     │     │   │
│  │  └──────────────┘                    └──────────────┘     │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  文件系统 (File System)                      │   │
│  │                                                              │   │
│  │  data/                                                       │   │
│  │  ├── database.db                                            │   │
│  │  ├── database.db.backup                                     │   │
│  │  └── reports/                                               │   │
│  │      ├── daily/report_YYYYMMDD.md                          │   │
│  │      ├── weekly/report_YYYYMMDD.md                         │   │
│  │      └── monthly/report_YYYYMMDD.md                        │   │
│  │                                                              │   │
│  │  logs/                                                       │   │
│  │  ├── intelligence_engine.log                                │   │
│  │  ├── intelligence_engine.log.1                              │   │
│  │  └── intelligence_engine.log.2                              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                    外部集成层 (External Integration)                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  SEC EDGAR   │  │   Reddit     │  │   Twitter    │             │
│  │  API         │  │   API (PRAW) │  │   API        │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │ Alpha Vantage│  │Financial     │  │   Yahoo      │             │
│  │              │  │Modeling Prep │  │   Finance    │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │    Email     │  │    Slack     │  │  Telegram    │             │
│  │    SMTP      │  │   Webhook    │  │     Bot      │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 数据流详解

### 1. 引擎数据流

```
外部API → 引擎 → 数据库 → 报告/告警

示例 (SEC Monitor):
SEC EDGAR API
    │
    ├─> 获取最新8-K文件
    │
    ├─> 解析文件内容
    │
    ├─> 检测关键词
    │
    ├─> 保存到 sec_filings 表
    │
    ├─> 触发告警 (如果需要)
    │
    └─> 记录日志
```

### 2. 调度流程

```
APScheduler
    │
    ├─> 18:00 触发 SEC Monitor
    │       │
    │       └─> run() → Database → Alert
    │
    ├─> 09:00 触发 Sentiment Tracker
    │       │
    │       └─> run() → Database → Alert
    │
    └─> 20:00 触发 Report Generator
            │
            └─> 从数据库查询 → 生成Markdown → 保存文件
```

### 3. 报告生成流程

```
Report Generator
    │
    ├─> 查询 sec_filings (最近24小时)
    ├─> 查询 sentiment_data (最近24小时)
    ├─> 查询 options_data (最新)
    ├─> 查询 supply_chain_data (最新)
    ├─> 查询 competitor_data (最新)
    └─> 查询 earnings_predictions (最新)
            │
            ├─> 汇总统计
            ├─> 生成Markdown
            ├─> 保存到 data/reports/daily/
            └─> 发送通知 (可选)
```

### 4. 告警流程

```
Alert System
    │
    ├─> 接收告警请求 (title, message, level)
    │
    ├─> 根据level判断严重性
    │       │
    │       ├─> info: 通知
    │       ├─> warning: 警告
    │       └─> error: 错误
    │
    ├─> 并发发送到多个渠道
    │       │
    │       ├─> Email (SMTP)
    │       ├─> Slack (Webhook)
    │       └─> Telegram (Bot)
    │
    └─> 记录日志
```

---

## 组件依赖关系

```
main.py
    │
    ├─── config.yaml (配置)
    │
    ├─── Database (数据库)
    │       │
    │       └─── SQLite (database.db)
    │
    ├─── Alert System (告警)
    │       │
    │       ├─── Email
    │       ├─── Slack
    │       └─── Telegram
    │
    ├─── Engines (引擎)
    │       │
    │       ├─── BaseEngine
    │       │       │
    │       │       ├─── Logger
    │       │       ├─── Database
    │       │       └─── Alert System
    │       │
    │       ├─── SECMonitor (继承 BaseEngine)
    │       ├─── SentimentTracker (继承 BaseEngine)
    │       ├─── SupplyChainIntel (继承 BaseEngine)
    │       ├─── OptionsDecoder (继承 BaseEngine)
    │       ├─── CompetitorTracker (继承 BaseEngine)
    │       └─── EarningsPredictor (继承 BaseEngine)
    │
    ├─── Report Generator (报告)
    │       │
    │       ├─── Database (查询数据)
    │       └─── Engines (引擎信息)
    │
    └─── Scheduler (调度)
            │
            ├─── Engines (定时运行)
            └─── Report Generator (定时报告)
```

---

## 核心设计模式

### 1. 工厂模式 (Factory Pattern)

**应用**: 引擎初始化

```python
engine_classes = {
    'sec_monitor': SECMonitor,
    'sentiment_tracker': SentimentTracker,
    # ...
}

for engine_name, engine_class in engine_classes.items():
    if config['engines'][engine_name]['enabled']:
        engines[engine_name] = engine_class(config, db, alert_system)
```

### 2. 模板方法模式 (Template Method)

**应用**: BaseEngine

```python
class BaseEngine(ABC):
    @abstractmethod
    def run(self):
        """子类必须实现的模板方法"""
        pass

    def _save_result(self, table, data):
        """通用的保存方法"""
        pass

    def _send_alert(self, title, message, level):
        """通用的告警方法"""
        pass
```

### 3. 策略模式 (Strategy Pattern)

**应用**: 多模型预测

```python
class EarningsPredictor:
    def _predict_with_model(self, model_name, data):
        strategies = {
            'linear_regression': self._lr_predict,
            'prophet': self._prophet_predict,
            'lstm': self._lstm_predict
        }
        return strategies[model_name](data)
```

### 4. 观察者模式 (Observer Pattern)

**应用**: 告警系统

```python
class AlertSystem:
    def send_alert(self, title, message, level):
        # 通知所有订阅者
        if self.email_enabled:
            self._send_email(title, message)
        if self.slack_enabled:
            self._send_slack(title, message)
        if self.telegram_enabled:
            self._send_telegram(title, message)
```

### 5. 单例模式 (Singleton Pattern)

**应用**: 数据库连接

```python
class Database:
    _instance = None

    def __new__(cls, config):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

---

## 扩展点

### 1. 添加新引擎

**步骤**:
1. 继承 `BaseEngine`
2. 实现 `run()` 方法
3. 在 `engines/__init__.py` 注册
4. 在 `config.yaml` 配置
5. 在 `main.py` 映射

**示例**:
```python
# engines/news_monitor.py
class NewsMonitor(BaseEngine):
    def run(self):
        # 1. 获取新闻
        news = self._fetch_news()

        # 2. 分析情绪
        sentiment = self._analyze(news)

        # 3. 保存
        self._save_result('news_data', sentiment)
```

### 2. 添加新数据源

**步骤**:
1. 在 `utils/api_clients.py` 添加客户端
2. 在引擎中调用
3. 在 `.env.example` 添加API Key说明

**示例**:
```python
# utils/api_clients.py
class NewsAPI:
    def __init__(self, api_key):
        self.api_key = api_key

    def fetch_news(self, ticker):
        # 调用API
        return news_data
```

### 3. 添加新告警渠道

**步骤**:
1. 在 `automation/alert_system.py` 添加方法
2. 在 `config.yaml` 配置
3. 在 `.env.example` 添加凭证说明

**示例**:
```python
# automation/alert_system.py
def _send_discord(self, title, message, level):
    # Discord Webhook实现
    pass
```

### 4. 添加新报告类型

**步骤**:
1. 在 `config.yaml` 的 `reports` 配置
2. 在 `automation/report_generator.py` 实现逻辑

**示例**:
```yaml
# config.yaml
reports:
  realtime_report:
    enabled: true
    schedule: "0 * * * *"  # 每小时
    output_format: json
```

---

## 性能优化

### 1. 并发处理

**引擎并行运行**:
```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {
        executor.submit(engine.run): name
        for name, engine in engines.items()
    }
```

### 2. 缓存策略

**API响应缓存**:
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fetch_stock_price(ticker):
    # 缓存股价查询
    return price
```

### 3. 数据库索引

**优化查询**:
```sql
CREATE INDEX idx_timestamp ON sec_filings(timestamp);
CREATE INDEX idx_ticker ON sentiment_data(ticker);
```

### 4. 日志轮转

**防止日志文件过大**:
```python
from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    'logs/engine.log',
    maxBytes=10*1024*1024,  # 10MB
    backupCount=5
)
```

---

## 安全架构

### 1. API密钥管理

**开发环境**:
```
.env 文件 (不提交Git)
```

**生产环境**:
```
AWS Secrets Manager
Google Secret Manager
Azure Key Vault
```

### 2. 数据加密

**传输加密**:
- HTTPS for all API calls
- TLS for SMTP

**存储加密**:
- SQLite encryption (optional)
- Encrypted backups

### 3. 访问控制

**网络隔离**:
```yaml
# docker-compose.yml
networks:
  frontend:
  backend:
    internal: true  # 不暴露到外网
```

**容器安全**:
```dockerfile
# 非root用户运行
RUN useradd -m -u 1000 intelligence
USER intelligence
```

---

## 监控架构

### 1. 日志聚合

**ELK Stack**:
```
Filebeat → Logstash → Elasticsearch → Kibana
```

### 2. 指标收集

**Prometheus**:
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'intelligence-engine'
    static_configs:
      - targets: ['localhost:8000']
```

### 3. 告警规则

**Alertmanager**:
```yaml
# alertmanager.yml
route:
  receiver: 'slack'
  group_by: ['alertname', 'level']
```

### 4. 分布式追踪

**Jaeger**:
```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("sec-monitor"):
    # 引擎逻辑
    pass
```

---

## 高可用架构

### 1. 负载均衡

**多实例部署**:
```yaml
# docker-compose.yml
services:
  intelligence-engine:
    deploy:
      replicas: 3
```

### 2. 故障恢复

**自动重启**:
```yaml
restart: unless-stopped
```

**健康检查**:
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"
```

### 3. 数据备份

**定时备份**:
```bash
# 每天2:00备份
0 2 * * * cp database.db /backups/db_$(date +\%Y\%m\%d).db
```

**远程备份**:
```bash
# 同步到S3
aws s3 sync data/database.db s3://intelligence-backups/
```

---

## 未来扩展

### Phase 2 (v10.1)
- [ ] WebUI仪表盘
- [ ] 实时数据流
- [ ] 更多ML模型

### Phase 3 (v10.2)
- [ ] 多公司并行监控
- [ ] GraphQL API
- [ ] 移动端App

### Phase 4 (v11.0)
- [ ] 分布式架构
- [ ] Kubernetes部署
- [ ] AI驱动的投资建议

---

**版本**: v10.0.0
**更新日期**: 2026-01-25
