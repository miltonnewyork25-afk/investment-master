# Tesla Intelligence Engine - 自动化调度系统

完整的自动化系统，支持定时运行6大情报引擎、生成报告、发送告警。

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Intelligence Scheduler                    │
│                      (scheduler.py)                          │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
             ▼                                ▼
    ┌────────────────┐              ┌────────────────┐
    │  6大引擎任务    │              │  报告生成任务   │
    └────────┬───────┘              └────────┬───────┘
             │                                │
             ▼                                ▼
    ┌─────────────────────────────────────────────┐
    │            SQLite Database                   │
    │           (database.py)                      │
    └─────────────────┬───────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │    Alert System         │
         │  (alert_system.py)      │
         └────────┬───────────────┘
                  │
                  ▼
    ┌──────────────────────────────────┐
    │  Email / Slack / Telegram        │
    └──────────────────────────────────┘
```

## 核心组件

### 1. scheduler.py - 调度系统
- **功能**: 定时运行所有引擎和报告生成任务
- **调度引擎**: APScheduler (支持 Cron 表达式)
- **重试机制**: 自动重试失败的任务
- **日志记录**: 完整的任务执行日志

### 2. database.py - 数据存储
- **数据库**: SQLite (轻量、无需配置)
- **9张核心表**:
  - insider_trading: 内部人交易
  - options_unusual: 期权异常活动
  - sentiment_history: 情绪指数历史
  - supply_chain_signals: 供应链信号
  - short_signals: 空头数据
  - dark_pool_activity: 暗池活动
  - daily_reports: 每日报告
  - alerts: 告警历史
  - task_logs: 任务执行日志

### 3. alert_system.py - 告警推送
- **支持渠道**: Email、Slack、Telegram
- **告警类型**: 6种自动触发规则
- **配置化**: 灵活的阈值和规则设置

### 4. report_generator.py - 报告生成
- **每日简报**: Markdown 格式，包含所有引擎数据
- **每周深度报告**: 趋势分析 + 图表可视化
- **图表支持**: Matplotlib 生成趋势图、热力图

## 快速开始

### 安装依赖

```bash
pip install apscheduler pandas matplotlib requests
```

### 配置系统

1. **编辑调度器配置** (`scheduler_config.json`):

```json
{
  "ticker": "TSLA",
  "timezone": "America/New_York",
  "database": {
    "path": "tesla_intelligence.db"
  },
  "engines": {
    "insider_trading": {
      "enabled": true,
      "schedule": "0 9,16 * * 1-5"
    },
    "sentiment": {
      "enabled": true,
      "schedule": "0 */4 * * *"
    }
  }
}
```

2. **配置告警渠道** (`alert_config.json`):

```json
{
  "enabled": true,
  "channels": {
    "email": {
      "enabled": true,
      "smtp_host": "smtp.gmail.com",
      "sender": "your_email@gmail.com",
      "password": "your_app_password",
      "recipients": ["recipient@example.com"]
    }
  },
  "alert_rules": {
    "insider_trading": {
      "enabled": true,
      "min_value": 1000000,
      "severity": "HIGH"
    }
  }
}
```

### 运行方式

#### 1. 持续运行模式（生产环境）

```bash
# 启动调度器，按计划自动运行
python scheduler.py
```

#### 2. 一次性运行（测试）

```bash
# 运行所有引擎一次后退出
python scheduler.py --once
```

#### 3. 仅生成报告

```bash
# 生成每日报告
python scheduler.py --daily-report

# 生成每周报告
python scheduler.py --weekly-report
```

#### 4. 查看状态

```bash
python scheduler.py --status
```

## 调度计划说明

### Cron 表达式格式

```
分 时 日 月 周
│ │ │ │ │
│ │ │ │ └─── 周几 (0-6, 0=周日)
│ │ │ └───── 月份 (1-12)
│ │ └─────── 日期 (1-31)
│ └───────── 小时 (0-23)
└─────────── 分钟 (0-59)
```

### 默认调度计划

| 引擎 | 调度时间 | 说明 |
|------|---------|------|
| 内部人交易 | `0 9,16 * * 1-5` | 周一至周五 9:00 和 16:00 |
| 期权异常 | `*/30 9-16 * * 1-5` | 周一至周五 9:00-16:00 每30分钟 |
| 市场情绪 | `0 */4 * * *` | 每天每4小时 |
| 供应链 | `0 10 * * 1-5` | 周一至周五 10:00 |
| 空头利息 | `0 17 * * 2,5` | 周二和周五 17:00 |
| 暗池活动 | `0 18 * * 1-5` | 周一至周五 18:00 |
| 每日报告 | `0 19 * * 1-5` | 周一至周五 19:00 |
| 每周报告 | `0 10 * * 6` | 周六 10:00 |

## 告警规则配置

### 内部人交易告警

```json
{
  "insider_trading": {
    "enabled": true,
    "min_value": 1000000,
    "severity": "HIGH"
  }
}
```

**触发条件**: 单笔交易价值 ≥ $100万

### 期权异常告警

```json
{
  "options_unusual": {
    "enabled": true,
    "min_score": 8.0,
    "severity": "HIGH"
  }
}
```

**触发条件**: 异常评分 ≥ 8.0/10

### 情绪剧变告警

```json
{
  "sentiment_shift": {
    "enabled": true,
    "min_change": 2.0,
    "severity": "MEDIUM"
  }
}
```

**触发条件**: OCI 单日变化 ≥ 2.0 点

### 供应链信号告警

```json
{
  "supply_chain": {
    "enabled": true,
    "min_strength": 7.0,
    "severity": "MEDIUM"
  }
}
```

**触发条件**: 信号强度 ≥ 7.0/10

### 空头挤压告警

```json
{
  "short_squeeze": {
    "enabled": true,
    "min_short_pct": 20.0,
    "severity": "HIGH"
  }
}
```

**触发条件**: 空头占流通股 ≥ 20%

### 暗池异常告警

```json
{
  "dark_pool": {
    "enabled": true,
    "min_pct": 40.0,
    "severity": "MEDIUM"
  }
}
```

**触发条件**: 暗池成交占比 ≥ 40%

## 报告示例

### 每日简报结构

```markdown
# TSLA 投资情报日报

**日期**: 2026-01-25
**综合评分**: 7.2/10 🟢 强烈看涨
**持仓建议**: 适度增持 (50-70%)

## 关键信号

### 1. 内部人交易 🚨
重大买入! 3笔交易, 总额$15,000,000

### 2. 期权异常活动 🔥
极端异常! 5个合约, 最高评分9.2

### 3. 市场情绪 😄
强烈看涨, OCI 7.5

### 4. 供应链线索 🔴
强信号! 2个供应商, 最高强度8.5

### 5. 空头动态 📉
空头占流通股: 18.5%

### 6. 暗池活动 🌑
暗池成交占比: 42.8%

## 六大引擎评分矩阵

| 引擎 | 评分 | 信号强度 | 趋势 |
|------|------|----------|------|
| 内部人交易 | 8.0/10 | 极强 ████████ | ↑ |
| 期权活动 | 9.0/10 | 极强 ████████ | ↑ |
| 市场情绪 | 7.5/10 | 较强 ██████ | → |
| 供应链 | 7.5/10 | 较强 ██████ | ↑ |
| 空头分析 | 6.0/10 | 较强 ██████ | → |
| 暗池监控 | 5.5/10 | 中等 ████ | → |

## 操作建议

### 短期 (1-7天)
- 内部人净买入，短期可能有催化剂
- 期权异常活跃，注意潜在波动

### 中期 (1-4周)
- 供应链信号积极，基本面改善

### 风险提示
- ⚠️ 期权活动极端，可能剧烈波动
```

### 每周深度报告特点

- **趋势分析**: 7天数据对比
- **图表可视化**:
  - 内部人交易趋势图
  - 情绪指数走势图
  - 供应链信号热力图
- **转折点识别**: 自动标注关键事件
- **下周展望**: 潜在催化剂预警

## 部署方案

### 方案一：本地运行（开发测试）

```bash
# 直接运行
python scheduler.py
```

**优点**: 简单直接，适合开发测试
**缺点**: 需要保持终端打开

### 方案二：后台守护进程（Linux/Mac）

使用 `screen` 或 `tmux`:

```bash
# 创建会话
screen -S tesla_scheduler

# 运行调度器
python scheduler.py

# 分离会话: Ctrl+A, D
# 重新连接: screen -r tesla_scheduler
```

### 方案三：systemd 服务（Linux生产环境）

创建 `/etc/systemd/system/tesla-intelligence.service`:

```ini
[Unit]
Description=Tesla Intelligence Engine Scheduler
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/IntelligenceEngine_v10/automation
ExecStart=/usr/bin/python3 scheduler.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务:

```bash
sudo systemctl enable tesla-intelligence
sudo systemctl start tesla-intelligence
sudo systemctl status tesla-intelligence
```

### 方案四：Docker 容器

创建 `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "scheduler.py"]
```

运行:

```bash
docker build -t tesla-intelligence .
docker run -d --name tesla-scheduler \
  -v $(pwd)/data:/app/data \
  tesla-intelligence
```

### 方案五：云服务器 + Cron（简单方案）

如果只需要定时运行而不需要持续监控，可以使用系统 cron:

```bash
# 编辑 crontab
crontab -e

# 添加任务（每天 19:00 生成报告）
0 19 * * 1-5 cd /path/to/automation && python scheduler.py --daily-report

# 每周六 10:00 生成周报
0 10 * * 6 cd /path/to/automation && python scheduler.py --weekly-report
```

## 邮件告警配置

### Gmail 配置步骤

1. **启用两步验证**:
   - 访问 Google 账户设置
   - 启用两步验证

2. **生成应用专用密码**:
   - 访问 https://myaccount.google.com/apppasswords
   - 选择"邮件"和"其他设备"
   - 复制生成的16位密码

3. **更新配置文件**:

```json
{
  "channels": {
    "email": {
      "enabled": true,
      "smtp_host": "smtp.gmail.com",
      "smtp_port": 587,
      "sender": "your_email@gmail.com",
      "password": "your_16_digit_app_password",
      "recipients": ["recipient1@example.com", "recipient2@example.com"]
    }
  }
}
```

### 其他邮箱配置

**Outlook/Hotmail**:
```json
{
  "smtp_host": "smtp-mail.outlook.com",
  "smtp_port": 587
}
```

**QQ邮箱**:
```json
{
  "smtp_host": "smtp.qq.com",
  "smtp_port": 587
}
```

## Slack 告警配置

1. **创建 Webhook**:
   - 访问 https://api.slack.com/apps
   - 创建新应用 → Incoming Webhooks
   - 激活并添加到频道
   - 复制 Webhook URL

2. **更新配置**:

```json
{
  "channels": {
    "slack": {
      "enabled": true,
      "webhook_url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
    }
  }
}
```

## Telegram 告警配置

1. **创建 Bot**:
   - 与 @BotFather 对话
   - 发送 `/newbot` 创建新bot
   - 获取 Bot Token

2. **获取 Chat ID**:
   - 与你的bot对话
   - 访问 `https://api.telegram.org/bot<YourBotToken>/getUpdates`
   - 从响应中找到 `chat.id`

3. **更新配置**:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "bot_token": "YOUR_BOT_TOKEN",
      "chat_id": "YOUR_CHAT_ID"
    }
  }
}
```

## 数据库管理

### 查看数据

```python
from database import get_db

with get_db() as db:
    # 查看内部人交易
    df = db.get_insider_trading(days=30)
    print(df)

    # 查看情绪历史
    sentiment = db.get_sentiment_history(days=7)
    print(sentiment)

    # 查看最近告警
    alerts = db.get_recent_alerts(days=7)
    print(alerts)
```

### 备份数据库

```bash
# 复制数据库文件
cp tesla_intelligence.db tesla_intelligence_backup_$(date +%Y%m%d).db

# 或使用 SQLite 命令
sqlite3 tesla_intelligence.db ".backup tesla_intelligence_backup.db"
```

### 数据清理

系统会自动清理365天前的旧数据（可在配置中调整）:

```json
{
  "database": {
    "cleanup_days": 365
  }
}
```

手动触发清理:

```python
from database import get_db

with get_db() as db:
    db.cleanup_old_data(days=180)  # 清理180天前的数据
```

## 日志管理

### 日志文件

- **调度器日志**: `intelligence_scheduler.log`
- **位置**: 与脚本同目录
- **格式**: `时间 - 模块 - 级别 - 消息`

### 查看日志

```bash
# 实时查看
tail -f intelligence_scheduler.log

# 查看最近100行
tail -n 100 intelligence_scheduler.log

# 搜索错误
grep ERROR intelligence_scheduler.log

# 搜索特定任务
grep "insider_trading" intelligence_scheduler.log
```

### 日志轮转（可选）

使用 `logrotate` 管理日志大小:

创建 `/etc/logrotate.d/tesla-intelligence`:

```
/path/to/automation/intelligence_scheduler.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

## 监控与维护

### 健康检查

```python
from scheduler import create_scheduler

scheduler = create_scheduler()
status = scheduler.get_scheduler_status()

print(f"运行状态: {status['running']}")
print(f"任务总数: {status['total_jobs']}")
print(f"成功次数: {status['stats']['successful_runs']}")
print(f"失败次数: {status['stats']['failed_runs']}")
```

### 性能监控

查看任务执行日志:

```python
from database import get_db

with get_db() as db:
    logs = db.get_task_logs(days=7)

    # 统计平均执行时间
    avg_duration = logs.groupby('task_name').apply(
        lambda x: (x['end_time'] - x['start_time']).mean()
    )
    print(avg_duration)
```

### 常见问题排查

#### 1. 任务未执行

检查:
- 调度器是否运行: `ps aux | grep scheduler`
- 任务是否启用: 检查 `scheduler_config.json`
- 日志是否有错误: `grep ERROR intelligence_scheduler.log`

#### 2. 告警未发送

检查:
- 告警系统是否启用: `alert_config.json` 中 `enabled: true`
- 渠道配置是否正确: SMTP/Webhook/Token
- 是否触发告警规则: 检查阈值设置

#### 3. 报告未生成

检查:
- 输出目录是否存在且有写权限
- 数据库是否有数据
- `reports` 任务是否启用

#### 4. 数据库锁定

如果遇到 `database is locked`:

```python
# 增加超时时间
import sqlite3
conn = sqlite3.connect('tesla_intelligence.db', timeout=30)
```

## 性能优化

### 1. 数据库优化

```sql
-- 创建额外索引（如需要）
CREATE INDEX idx_insider_value ON insider_trading(value);
CREATE INDEX idx_options_score ON options_unusual(unusual_score);
CREATE INDEX idx_sentiment_oci ON sentiment_history(oci_score);

-- 定期 VACUUM
VACUUM;
```

### 2. 并发控制

如果多个任务同时写入数据库，考虑使用连接池:

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'sqlite:///tesla_intelligence.db',
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10
)
```

### 3. 资源限制

限制内存使用:

```python
import resource

# 限制内存使用到 1GB
resource.setrlimit(resource.RLIMIT_AS, (1024 * 1024 * 1024, -1))
```

## 扩展开发

### 添加新引擎

1. **在 `scheduler.py` 中添加引擎函数**:

```python
def run_new_engine(self):
    """运行新引擎"""
    def task():
        logger.info("新引擎: 执行逻辑...")

        # 数据采集
        data = collect_data()

        # 保存到数据库
        self.db.insert_new_data(data)

        # 检查告警
        alert = self.alert_system.check_new_alert(data)
        if alert:
            self.alert_system.send_alert(alert)

        return {'records_processed': 1}

    return self._run_with_retry('new_engine', task)
```

2. **在配置文件中启用**:

```json
{
  "engines": {
    "new_engine": {
      "enabled": true,
      "schedule": "0 10 * * *"
    }
  }
}
```

3. **在 `add_jobs()` 中注册**:

```python
engine_map = {
    # ...existing engines...
    'new_engine': self.run_new_engine
}
```

### 添加新告警规则

1. **在 `alert_system.py` 中添加检查函数**:

```python
def check_new_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """检查新告警"""
    rule = self.config.get_alert_rule("new_alert")
    if not rule.get("enabled"):
        return None

    if data.get('metric') >= rule.get('threshold'):
        return {
            "alert_type": "NEW_ALERT",
            "severity": "HIGH",
            "title": "新告警触发",
            "message": f"指标达到 {data.get('metric')}",
            "triggered_by": "NewEngine",
            "data": data
        }
    return None
```

2. **在配置文件中定义规则**:

```json
{
  "alert_rules": {
    "new_alert": {
      "enabled": true,
      "threshold": 100,
      "severity": "HIGH"
    }
  }
}
```

## 测试

### 单元测试

```bash
# 测试数据库
python database.py

# 测试告警系统
python alert_system.py

# 测试报告生成
python report_generator.py
```

### 集成测试

```bash
# 运行一次所有引擎
python scheduler.py --once

# 检查生成的报告
ls -lh reports/

# 查看数据库内容
sqlite3 tesla_intelligence.db "SELECT * FROM insider_trading LIMIT 5;"
```

## 安全注意事项

1. **保护敏感信息**:
   - 不要将 `alert_config.json` 提交到 Git
   - 使用环境变量存储密码和 Token
   - 设置文件权限: `chmod 600 alert_config.json`

2. **数据库安全**:
   - 定期备份
   - 限制访问权限
   - 不存储明文密码

3. **网络安全**:
   - 使用 HTTPS 连接 API
   - 验证 SSL 证书
   - 限制 IP 访问（如使用云服务器）

## 故障恢复

### 调度器崩溃恢复

使用 systemd 自动重启（见部署方案三）

### 数据库损坏恢复

```bash
# 1. 尝试修复
sqlite3 tesla_intelligence.db ".recover" > recovered.sql
sqlite3 new_database.db < recovered.sql

# 2. 从备份恢复
cp tesla_intelligence_backup.db tesla_intelligence.db
```

### 数据丢失恢复

如果没有备份，可以从报告中部分恢复:

```bash
# 报告中包含关键数据点
grep "内部人交易" reports/*.md
```

## 许可与支持

- **许可**: MIT License
- **版本**: v1.0
- **更新日期**: 2026-01-25
- **作者**: Intelligence Engine Team

## 附录

### A. 完整配置示例

见 `scheduler_config.json` 和 `alert_config.json`

### B. API 参考

见各模块源代码中的 docstrings

### C. 数据库 Schema

见 `database.py` 中的 `_create_tables()` 方法

### D. Cron 表达式速查

```
# 每天 9:00
0 9 * * *

# 工作日 9:00-17:00 每小时
0 9-17 * * 1-5

# 每30分钟
*/30 * * * *

# 每周一 10:00
0 10 * * 1

# 每月1日 2:00
0 2 1 * *
```

---

**祝你使用愉快！如有问题，请查看日志文件或提交 Issue。**
