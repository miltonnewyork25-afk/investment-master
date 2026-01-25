# Tesla Intelligence Engine - 快速参考

## 常用命令

### 启动与停止

```bash
# 启动调度器（持续运行）
python scheduler.py

# 运行一次所有引擎（测试）
python scheduler.py --once

# 仅生成每日报告
python scheduler.py --daily-report

# 仅生成每周报告
python scheduler.py --weekly-report

# 查看调度器状态
python scheduler.py --status
```

### 配置管理

```bash
# 交互式生成配置文件
python setup_configs.py

# 测试系统
python test_system.py

# 快速启动向导
./quickstart.sh
```

### 数据库操作

```python
# Python交互式查询
from database import get_db

with get_db() as db:
    # 查看内部人交易
    df = db.get_insider_trading(days=30)
    print(df)

    # 查看情绪历史
    sentiment = db.get_sentiment_history(days=7)
    print(sentiment)

    # 查看告警
    alerts = db.get_recent_alerts(days=7)
    print(alerts)
```

```bash
# SQLite命令行
sqlite3 tesla_intelligence.db

# 查看表结构
.schema insider_trading

# 查询数据
SELECT * FROM insider_trading ORDER BY date DESC LIMIT 10;

# 统计记录数
SELECT COUNT(*) FROM insider_trading;
```

### Docker部署

```bash
# 构建镜像
docker build -t tesla-intelligence .

# 运行容器
docker run -d --name tesla-scheduler \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/reports:/app/reports \
  tesla-intelligence

# 使用docker-compose
docker-compose up -d

# 查看日志
docker logs -f tesla-scheduler

# 停止容器
docker-compose down
```

### systemd服务

```bash
# 复制服务文件
sudo cp tesla-intelligence.service /etc/systemd/system/

# 编辑配置（修改用户和路径）
sudo nano /etc/systemd/system/tesla-intelligence.service

# 重载systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start tesla-intelligence

# 开机自启
sudo systemctl enable tesla-intelligence

# 查看状态
sudo systemctl status tesla-intelligence

# 查看日志
journalctl -u tesla-intelligence -f
```

## 配置速查

### Cron表达式

| 表达式 | 说明 |
|--------|------|
| `0 9 * * *` | 每天9:00 |
| `0 9,16 * * *` | 每天9:00和16:00 |
| `*/30 * * * *` | 每30分钟 |
| `0 9-17 * * 1-5` | 工作日9:00-17:00每小时 |
| `0 10 * * 6` | 每周六10:00 |
| `0 2 1 * *` | 每月1日2:00 |

### 告警阈值

| 告警类型 | 默认阈值 | 严重程度 |
|---------|---------|---------|
| 内部人交易 | $100万 | HIGH |
| 期权异常 | 8.0/10 | HIGH |
| 情绪剧变 | 2.0点 | MEDIUM |
| 供应链信号 | 7.0/10 | MEDIUM |
| 空头挤压 | 20% | HIGH |
| 暗池异常 | 40% | MEDIUM |

### 评分解读

| 综合评分 | 持仓建议 | 含义 |
|---------|---------|------|
| 8.0-10.0 | 积极增持 (70-90%) | 🟢 强烈看涨 |
| 7.0-7.9 | 适度增持 (50-70%) | 🟡 偏向看涨 |
| 6.0-6.9 | 标准持仓 (30-50%) | 🟡 偏向看涨 |
| 4.0-5.9 | 观望减仓 (10-30%) | ⚪ 中性观望 |
| 0.0-3.9 | 谨慎避险 (<10%) | 🔴 强烈看跌 |

## 文件结构

```
automation/
├── scheduler.py              # 调度器主程序 ⭐
├── database.py               # 数据库管理
├── alert_system.py           # 告警系统
├── report_generator.py       # 报告生成器
├── scheduler_config.json     # 调度配置
├── alert_config.json         # 告警配置
├── requirements.txt          # 依赖清单
├── README_AUTOMATION.md      # 完整文档
├── QUICK_REFERENCE.md        # 本文件
├── setup_configs.py          # 配置生成向导
├── test_system.py            # 系统测试
├── quickstart.sh             # 快速启动脚本
├── Dockerfile                # Docker配置
├── docker-compose.yml        # Docker Compose
├── tesla-intelligence.service # systemd服务
├── example_daily_report.md   # 示例报告
├── reports/                  # 报告输出目录
│   ├── daily_brief_*.md
│   ├── weekly_report_*.md
│   └── charts/               # 图表
└── tesla_intelligence.db     # SQLite数据库
```

## 故障排查

### 问题：任务未执行

```bash
# 1. 检查调度器是否运行
ps aux | grep scheduler

# 2. 查看日志
tail -f intelligence_scheduler.log

# 3. 检查配置
python scheduler.py --status

# 4. 手动运行测试
python scheduler.py --once
```

### 问题：告警未发送

```bash
# 1. 检查告警配置
cat alert_config.json | grep enabled

# 2. 测试告警系统
python -c "from alert_system import create_alert_system; a = create_alert_system(); print('OK')"

# 3. 查看告警历史
sqlite3 tesla_intelligence.db "SELECT * FROM alerts ORDER BY created_at DESC LIMIT 5;"
```

### 问题：数据库锁定

```python
# 增加超时时间
import sqlite3
conn = sqlite3.connect('tesla_intelligence.db', timeout=30.0)
```

### 问题：内存不足

```bash
# 限制Python内存
import resource
resource.setrlimit(resource.RLIMIT_AS, (1024 * 1024 * 1024, -1))  # 1GB

# 或使用Docker限制
docker run --memory="1g" --memory-swap="1g" tesla-intelligence
```

## 性能优化

### 数据库优化

```sql
-- 清理旧数据
DELETE FROM insider_trading WHERE date < date('now', '-365 days');
DELETE FROM sentiment_history WHERE date < date('now', '-365 days');

-- 压缩数据库
VACUUM;

-- 分析表
ANALYZE;
```

### 日志轮转

```bash
# 添加logrotate配置
cat > /etc/logrotate.d/tesla-intelligence << EOF
/path/to/automation/intelligence_scheduler.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
EOF
```

## 监控指标

### 关键指标

- 任务成功率: `successful_runs / total_runs`
- 平均执行时间: 查询 `task_logs` 表
- 告警触发频率: 查询 `alerts` 表
- 数据库大小: `ls -lh tesla_intelligence.db`

### 监控脚本

```python
from database import get_db

with get_db() as db:
    logs = db.get_task_logs(days=7)

    # 计算成功率
    total = len(logs)
    success = len(logs[logs['status'] == 'SUCCESS'])
    success_rate = success / total if total > 0 else 0

    print(f"成功率: {success_rate:.1%}")
    print(f"总执行: {total}")
    print(f"成功: {success}")
    print(f"失败: {total - success}")
```

## 安全最佳实践

1. **不要提交敏感文件到Git**
   ```bash
   # .gitignore
   alert_config.json
   scheduler_config.json
   *.db
   *.log
   ```

2. **使用环境变量**
   ```python
   import os
   smtp_password = os.getenv('SMTP_PASSWORD')
   ```

3. **限制文件权限**
   ```bash
   chmod 600 alert_config.json
   chmod 600 scheduler_config.json
   chmod 700 tesla_intelligence.db
   ```

4. **定期备份**
   ```bash
   # 每日备份脚本
   cp tesla_intelligence.db backups/tesla_$(date +%Y%m%d).db
   ```

## 支持资源

- 📖 完整文档: `README_AUTOMATION.md`
- 🧪 测试系统: `python test_system.py`
- 🔧 配置向导: `python setup_configs.py`
- 🚀 快速启动: `./quickstart.sh`
- 📊 示例报告: `example_daily_report.md`

## 更新日志

- **v1.0** (2026-01-25)
  - 初始版本
  - 6大引擎调度
  - 告警系统
  - 报告生成
  - 数据库管理

---

**快速开始**: `./quickstart.sh` 或 `python scheduler.py --once`
