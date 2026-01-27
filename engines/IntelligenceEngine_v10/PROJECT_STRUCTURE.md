# IntelligenceEngine v10 - 项目结构说明

## 目录树

```
IntelligenceEngine_v10/
├── main.py                      # 主程序入口 ⭐
├── config.yaml                  # 全局配置文件 ⭐
├── suppliers_config.yaml        # 供应商配置
├── requirements.txt             # Python依赖
├── setup.py                     # 安装脚本
├── README.md                    # 完整文档
├── Dockerfile                   # Docker容器化
├── docker-compose.yml           # Docker编排
├── .env.example                 # 环境变量示例
├── .gitignore                   # Git忽略文件
│
├── engines/                     # 6大引擎 ⭐
│   ├── __init__.py
│   ├── base_engine.py          # 引擎基类
│   ├── sec_monitor.py          # SEC文件监控
│   ├── sentiment_tracker.py    # 社交情绪追踪
│   ├── supply_chain_intel.py   # 供应链情报
│   ├── options_decoder.py      # 期权流解码
│   ├── competitor_tracker.py   # 竞品追踪
│   └── earnings_predictor.py   # 财报预测
│
├── automation/                  # 自动化模块 ⭐
│   ├── __init__.py
│   ├── scheduler.py            # APScheduler任务调度
│   ├── report_generator.py     # 报告生成器
│   ├── database.py             # SQLite数据库接口
│   └── alert_system.py         # 多渠道告警系统
│
├── utils/                       # 工具函数
│   ├── __init__.py
│   ├── logger.py               # 日志配置
│   ├── validators.py           # 配置验证
│   └── api_clients.py          # API客户端工厂
│
├── data/                        # 数据存储 (自动创建)
│   ├── database.db             # SQLite数据库
│   └── reports/                # 报告输出
│       ├── daily/
│       ├── weekly/
│       └── monthly/
│
├── logs/                        # 日志文件 (自动创建)
│   └── intelligence_engine.log
│
├── tests/                       # 单元测试
│   ├── test_engines.py
│   ├── test_automation.py
│   └── test_utils.py
│
└── docs/                        # 文档 (可选)
    ├── architecture.md
    ├── api_guide.md
    └── deployment.md
```

---

## 核心文件说明

### 1. main.py (主程序)

**入口点**, 协调所有组件:
- 加载配置
- 初始化6大引擎
- 启动调度器或执行一次性任务

**使用方式**:
```bash
python main.py                # 运行所有引擎一次
python main.py --daemon       # 启动守护进程
python main.py --engine sec   # 只运行SEC监控
python main.py --report daily # 生成今日报告
```

### 2. config.yaml (全局配置)

**可复用的配置文件**, 切换公司只需修改此文件:

```yaml
company:
  name: Tesla      # 改这里
  ticker: TSLA     # 改这里
  cik: "..."       # 改这里

engines:
  sec_monitor:
    enabled: true  # 启用/禁用
    schedule: "0 18 * * *"  # Cron表达式
```

### 3. .env (环境变量)

存储敏感信息 (不提交到Git):
```bash
SEC_API_KEY=xxx
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
```

---

## 引擎模块 (engines/)

### 架构设计

所有引擎继承自 `BaseEngine`, 共享:
- 日志系统
- 数据库访问
- 告警发送
- 统计信息

每个引擎实现 `run()` 方法:
```python
class NewEngine(BaseEngine):
    def run(self):
        # 1. 获取数据
        # 2. 处理数据
        # 3. 保存结果
        # 4. 发送告警 (如果需要)
```

### 6大引擎详解

| 引擎 | 功能 | 数据源 | 调度频率 |
|-----|------|--------|---------|
| SEC Monitor | 监控8-K/10-Q/10-K | SEC EDGAR API | 每天18:00 |
| Sentiment Tracker | 追踪社交情绪 | Reddit/Twitter/StockTwits | 每天9:00和21:00 |
| Supply Chain Intel | 分析供应商财报 | 供应商SEC文件 | 每周一10:00 |
| Options Decoder | 解码期权流 | Options API | 工作日16:00 |
| Competitor Tracker | 对比竞品 | Financial APIs | 每天11:00 |
| Earnings Predictor | 预测财报 | 交付数据+ML模型 | 每天8:00 |

---

## 自动化模块 (automation/)

### Scheduler (调度器)

使用APScheduler管理定时任务:
- 引擎任务 (来自config.yaml的schedule)
- 报告任务 (daily/weekly/monthly)

### Database (数据库)

SQLite轻量级数据库:
- 6张表 (对应6大引擎)
- 自动创建schema
- 数据清理功能 (保留365天)

### ReportGenerator (报告生成器)

生成Markdown格式报告:
- 汇总各引擎数据
- 可视化图表 (ASCII表格)
- 自动保存到data/reports/

### AlertSystem (告警系统)

多渠道通知:
- Email (SMTP)
- Slack (Webhook)
- Telegram (Bot)

---

## 数据流

```
外部API
  │
  ├─> 引擎1 (SEC Monitor)
  ├─> 引擎2 (Sentiment Tracker)
  ├─> 引擎3 (Supply Chain)
  ├─> 引擎4 (Options)
  ├─> 引擎5 (Competitor)
  └─> 引擎6 (Earnings)
        │
        ├─> Database (保存)
        ├─> AlertSystem (告警)
        └─> ReportGenerator (报告)
              │
              └─> data/reports/
```

---

## 扩展方式

### 添加新引擎

1. 创建 `engines/new_engine.py`
2. 继承 `BaseEngine`
3. 实现 `run()` 方法
4. 在 `engines/__init__.py` 中注册
5. 在 `config.yaml` 中配置
6. 在 `main.py` 中添加映射

### 添加新数据源

1. 在 `utils/api_clients.py` 中添加客户端
2. 在引擎中调用
3. 在 `.env.example` 中添加API Key说明

### 添加新报告类型

1. 在 `config.yaml` 的 `reports` 中配置
2. 在 `automation/report_generator.py` 中实现逻辑

---

## 部署方式

### 本地开发
```bash
python main.py --daemon
```

### Docker
```bash
docker-compose up -d
```

### 云端 (AWS/GCP/Azure)
1. 构建Docker镜像
2. 推送到容器registry
3. 部署到ECS/Cloud Run/Container Instances
4. 配置环境变量和持久化存储

### 定时任务 (Cron)
```bash
# 每天18:00运行
0 18 * * * cd /path/to/project && python main.py
```

---

## 配置管理

### 切换到其他公司 (5步)

1. 修改 `config.yaml` 的 `company` 部分
2. 创建对应的 `suppliers_config.yaml` (如果需要)
3. 更新 `.env` 中的API密钥 (如果有新的)
4. 运行一次测试: `python main.py --engine sec`
5. 启动守护进程: `python main.py --daemon`

### 多公司并行

创建多个配置文件:
```bash
config_tsla.yaml
config_aapl.yaml
config_nvda.yaml
```

运行时指定:
```bash
python main.py --config config_aapl.yaml
```

---

## 故障恢复

### 数据库损坏
```bash
# 从备份恢复
cp data/database.db.backup data/database.db
```

### API限流
- SEC API: 免费10次/天 → 升级到付费
- Reddit: 完全免费,无限制
- Alpha Vantage: 5次/分钟 → 增加缓存

### 内存占用过高
- 减少 `max_workers` (config.yaml)
- 禁用缓存
- 定期清理旧数据

---

## 性能优化

### 缓存策略
- API响应缓存 (TTL: 1小时)
- 数据库查询结果缓存

### 并发控制
- 引擎并行运行 (ThreadPoolExecutor)
- API请求限流 (Token Bucket)

### 数据清理
- 自动清理365天前数据
- 日志文件轮转 (最多5个, 每个10MB)

---

## 安全性

### API密钥管理
- 存储在 `.env` (不提交Git)
- 使用环境变量注入
- Docker Secrets (生产环境)

### 数据库
- SQLite文件权限: 600
- 备份加密 (可选)

### 日志
- 不记录敏感信息
- API Key自动脱敏

---

## 版本控制

### Git工作流
```bash
git add .
git commit -m "feat: add new engine"
git push
```

### 版本号
语义化版本: `MAJOR.MINOR.PATCH`
- v10.0.0: 初始发布
- v10.1.0: 新功能
- v10.0.1: Bug修复

---

**下一步**: 阅读 [README.md](README.md) 了解快速开始
