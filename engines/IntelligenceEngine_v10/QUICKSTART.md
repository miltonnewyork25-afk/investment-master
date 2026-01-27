# 快速开始指南 (5分钟运行)

## 前置条件

- Python 3.9+
- pip
- Git

## 步骤1: 安装 (2分钟)

```bash
# 进入项目目录
cd IntelligenceEngine_v10

# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# 安装依赖
pip install -r requirements.txt
```

## 步骤2: 配置API密钥 (2分钟)

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
nano .env  # 或使用你喜欢的编辑器
```

**最小配置** (只需这2个就能运行):
```bash
SEC_API_KEY=your_sec_api_key           # 必需
REDDIT_CLIENT_ID=your_reddit_id         # 必需
REDDIT_CLIENT_SECRET=your_reddit_secret # 必需
```

### API密钥快速申请

**SEC API** (30秒):
1. 访问 https://sec-api.io/
2. 注册账号
3. 复制API Key
4. 粘贴到 `.env`

**Reddit API** (1分钟):
1. 访问 https://www.reddit.com/prefs/apps
2. 点击 "Create App"
3. 选择 "script"
4. 获取 client_id 和 client_secret
5. 粘贴到 `.env`

## 步骤3: 测试运行 (1分钟)

```bash
# 测试配置
python main.py --status

# 运行单个引擎 (测试)
python main.py --engine sentiment

# 生成今日报告
python main.py --report daily
```

**预期输出**:
```
============================================================
IntelligenceEngine v10 启动
目标公司: Tesla (TSLA)
============================================================
✓ sec_monitor 初始化成功
✓ sentiment_tracker 初始化成功
- supply_chain_intel 未启用
- options_decoder 未启用
- competitor_tracker 未启用
- earnings_predictor 未启用
所有组件初始化完成
```

## 步骤4: 启动守护进程

```bash
# 前台运行 (测试)
python main.py --daemon

# 后台运行 (生产)
nohup python main.py --daemon > logs/daemon.log 2>&1 &
```

## 步骤5: 查看结果

```bash
# 查看日志
tail -f logs/intelligence_engine.log

# 查看报告
ls -lh data/reports/daily/

# 查看数据库
sqlite3 data/database.db "SELECT * FROM sentiment_data LIMIT 5;"
```

---

## 常见问题

### Q1: 没有SEC API Key怎么办?

暂时禁用SEC引擎:
```yaml
# config.yaml
engines:
  sec_monitor:
    enabled: false  # 改为false
```

### Q2: Reddit API认证失败?

检查:
1. `.env` 文件中client_id和secret是否正确
2. Reddit App类型是否选择了 "script"
3. 是否安装了 `praw` 库

### Q3: 想监控其他公司?

编辑 `config.yaml`:
```yaml
company:
  name: Apple
  ticker: AAPL
  cik: "0000320193"
```

### Q4: 如何添加Slack通知?

1. 创建Slack Incoming Webhook
2. 在 `.env` 中添加:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
   ```
3. 在 `config.yaml` 中启用:
   ```yaml
   alerts:
     slack:
       enabled: true
   ```

---

## 下一步

- ✅ 阅读 [README.md](README.md) 了解完整功能
- ✅ 阅读 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 了解架构
- ✅ 自定义配置文件
- ✅ 添加更多API密钥解锁所有功能
- ✅ 部署到云端 (Docker/AWS/GCP)

---

## 示例工作流

### 场景: 每日监控Tesla

```bash
# 1. 早上9点: 检查情绪
python main.py --engine sentiment

# 2. 晚上6点: 检查SEC文件
python main.py --engine sec

# 3. 晚上8点: 生成今日报告
python main.py --report daily

# 或者一次性启动守护进程, 自动执行所有任务
python main.py --daemon
```

### 场景: 财报季

```bash
# 财报前一周, 每天运行预测
python main.py --engine earnings

# 查看预测结果
sqlite3 data/database.db "SELECT * FROM earnings_predictions ORDER BY timestamp DESC LIMIT 5;"
```

---

**支持**: 如遇问题,请查看 [故障排查](README.md#故障排查) 或提交GitHub Issue
