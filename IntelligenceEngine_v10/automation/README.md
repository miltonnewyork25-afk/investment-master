# Tesla Intelligence Engine v10 - 自动化调度系统

> 🚀 **完整的投资情报自动化系统** - 7×24小时自动运行，智能监控，实时告警

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo/tesla-intelligence)
[![Python](https://img.shields.io/badge/python-3.9+-green.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)](https://github.com/your-repo/tesla-intelligence)

---

## 快速开始 (30秒)

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 运行快速启动脚本
./quickstart.sh

# 3. 查看生成的报告
cat reports/daily_brief_*.md
```

就这么简单！🎉

---

## 核心功能

### 🤖 6大情报引擎自动调度

- **内部人交易引擎**: 监控SEC Form 4，每日2次 (9:00, 16:00)
- **期权异常引擎**: 扫描大额期权，每30分钟
- **市场情绪引擎**: 分析社交媒体，每4小时
- **供应链引擎**: 追踪上游供应商，每日1次
- **空头利息引擎**: 监控卖空数据，每周2次
- **暗池活动引擎**: 追踪非公开交易，每日1次

### 📊 智能报告生成

- **每日简报**: 综合评分 + 6大引擎信号 + 操作建议
- **每周深度报告**: 趋势分析 + 图表可视化 + 下周展望

### 🔔 实时告警推送

支持 **Email** / **Slack** / **Telegram** 多渠道推送

6种自动触发规则:
- 内部人大额交易 (≥$100万)
- 期权异常活动 (评分≥8.0)
- 情绪指数剧变 (变化≥2.0点)
- 供应链强信号 (强度≥7.0)
- 空头挤压风险 (占比≥20%)
- 暗池异常活动 (占比≥40%)

### 💾 完整数据管理

- SQLite数据库存储历史数据
- 9张核心数据表
- 自动数据清理 (默认保留365天)
- 支持数据导出和备份

---

## 文件结构

```
automation/
├── README.md                    # 本文件 (入口文档)
├── README_AUTOMATION.md         # 完整部署文档 ⭐
├── QUICK_REFERENCE.md           # 快速参考卡片
├── PROJECT_SUMMARY.md           # 项目总结
├── DELIVERY_CHECKLIST.md        # 交付清单
│
├── scheduler.py                 # 调度器主程序 ⭐
├── database.py                  # 数据库管理
├── alert_system.py              # 告警系统
├── report_generator.py          # 报告生成器
│
├── setup_configs.py             # 配置生成向导
├── test_system.py               # 系统测试
├── quickstart.sh                # 快速启动脚本 ⭐
├── daily_update.py              # 手动更新脚本
│
├── requirements.txt             # 依赖清单
├── .gitignore                   # Git忽略规则
├── __init__.py                  # Python包
│
├── Dockerfile                   # Docker配置
├── docker-compose.yml           # Docker Compose
├── tesla-intelligence.service   # systemd服务
│
├── example_daily_report.md      # 示例报告
│
└── reports/                     # 报告输出目录 (自动生成)
    ├── daily_brief_*.md
    ├── weekly_report_*.md
    └── charts/
```

---

## 常用命令

### 启动与运行

```bash
# 启动调度器 (持续运行)
python scheduler.py

# 运行一次所有引擎 (测试)
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
```

### 数据库查询

```bash
# 进入数据库
sqlite3 tesla_intelligence.db

# 查看内部人交易
SELECT * FROM insider_trading ORDER BY date DESC LIMIT 10;

# 查看最近告警
SELECT * FROM alerts ORDER BY created_at DESC LIMIT 5;

# 查看任务日志
SELECT * FROM task_logs WHERE status = 'FAILED';
```

---

## 部署方案

### 方案1: 本地运行 (最简单)

```bash
python scheduler.py
```

**适用**: 开发测试、个人使用

### 方案2: systemd服务 (Linux推荐)

```bash
sudo cp tesla-intelligence.service /etc/systemd/system/
sudo systemctl enable tesla-intelligence
sudo systemctl start tesla-intelligence
```

**适用**: Linux服务器、生产环境

### 方案3: Docker容器 (云端推荐)

```bash
docker-compose up -d
```

**适用**: 云服务器、容器化部署

### 方案4: Screen后台 (快速方案)

```bash
screen -S tesla
python scheduler.py
# Ctrl+A, D 分离
```

**适用**: 快速部署、临时运行

---

## 配置示例

### 调度器配置 (scheduler_config.json)

```json
{
  "ticker": "TSLA",
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

### 告警配置 (alert_config.json)

```json
{
  "channels": {
    "email": {
      "enabled": true,
      "sender": "your_email@gmail.com",
      "recipients": ["recipient@example.com"]
    }
  },
  "alert_rules": {
    "insider_trading": {
      "enabled": true,
      "min_value": 1000000
    }
  }
}
```

---

## 示例报告

### 每日简报示例

```markdown
# TSLA 投资情报日报

**日期**: 2026-01-25
**综合评分**: 7.2/10 🟢 强烈看涨
**持仓建议**: 适度增持 (50-70%)

## 关键信号

### 1. 内部人交易 🚨
重大买入! 3笔交易, 总额$15,200,000

### 2. 期权异常活动 🔥
极端异常! 5个合约, 最高评分9.2

### 3. 市场情绪 😄
强烈看涨, OCI 7.5

## 六大引擎评分矩阵

| 引擎 | 评分 | 信号强度 | 趋势 |
|------|------|----------|------|
| 内部人交易 | 8.2/10 | 极强 ████████ | ↑ |
| 期权活动 | 9.0/10 | 极强 ████████ | ↑ |
| 市场情绪 | 7.5/10 | 较强 ██████ | ↑ |
```

完整示例见: [example_daily_report.md](example_daily_report.md)

---

## 系统要求

- Python 3.9+
- 50-200MB 内存
- 100MB 磁盘空间
- Linux / macOS / Windows

---

## 依赖包

- apscheduler (调度)
- pandas (数据处理)
- matplotlib (图表)
- requests (HTTP)

安装: `pip install -r requirements.txt`

---

## 技术特点

✅ **可靠性**: 自动重试、完整日志、错误追踪
✅ **可扩展性**: 模块化设计、易于添加新引擎
✅ **易用性**: 交互式配置、快速启动脚本
✅ **安全性**: 配置文件化、权限管理

---

## 文档导航

| 文档 | 用途 |
|------|------|
| [README.md](README.md) | 入口文档 (本文件) |
| [README_AUTOMATION.md](README_AUTOMATION.md) | 完整部署文档 ⭐ |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | 快速参考卡片 |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | 项目总结 |
| [DELIVERY_CHECKLIST.md](DELIVERY_CHECKLIST.md) | 交付清单 |

**新手推荐**: 先看本文件，再运行 `./quickstart.sh`

**深入了解**: 阅读 `README_AUTOMATION.md`

**快速查询**: 使用 `QUICK_REFERENCE.md`

---

## 常见问题

### Q: 如何修改调度时间？

编辑 `scheduler_config.json`，修改 `schedule` 字段 (Cron表达式)

### Q: 如何启用邮件告警？

运行 `python setup_configs.py`，按提示配置邮箱信息

### Q: 如何更换目标股票？

修改 `scheduler_config.json` 中的 `ticker` 字段

### Q: 数据存储在哪里？

`tesla_intelligence.db` (SQLite数据库)

### Q: 如何备份数据？

```bash
cp tesla_intelligence.db backups/tesla_$(date +%Y%m%d).db
```

更多问题见: [README_AUTOMATION.md#常见问题](README_AUTOMATION.md#常见问题)

---

## 故障排查

### 任务未执行

```bash
# 查看日志
tail -f intelligence_scheduler.log

# 查看状态
python scheduler.py --status
```

### 告警未发送

```bash
# 检查配置
cat alert_config.json | grep enabled

# 查看告警历史
sqlite3 tesla_intelligence.db "SELECT * FROM alerts LIMIT 5;"
```

更多排查: [QUICK_REFERENCE.md#故障排查](QUICK_REFERENCE.md#故障排查)

---

## 测试

```bash
# 完整系统测试
python test_system.py

# 快速功能测试
python scheduler.py --once
```

---

## 性能指标

- **内存占用**: 50-200MB
- **CPU占用**: <20%
- **单引擎执行**: <30秒
- **报告生成**: <30秒
- **数据库大小**: ~10MB (30天)

---

## 版本历史

### v1.0.0 (2026-01-25)

- ✅ 初始版本发布
- ✅ 6大引擎调度
- ✅ 智能告警系统
- ✅ 报告生成器
- ✅ 数据库管理
- ✅ 5种部署方案
- ✅ 完整文档

---

## 支持与贡献

- 📖 文档: 见上方"文档导航"
- 🐛 问题反馈: 提交 Issue
- 💡 功能建议: 提交 Pull Request
- 📧 联系: intelligence-engine@example.com

---

## 许可证

MIT License - 可自由使用、修改、分发

---

## 致谢

感谢以下开源项目:
- APScheduler
- Pandas
- Matplotlib
- SQLite

---

<div align="center">

**立即开始**: `./quickstart.sh` 🚀

Made with ❤️ by Intelligence Engine Team

**Version**: 1.0.0 | **Date**: 2026-01-25 | **Status**: 生产就绪

</div>
