# Tesla Intelligence Engine v10 - 自动化系统项目总结

## 项目概述

完整的投资情报自动化系统，实现了**6大引擎自动调度**、**智能告警推送**、**每日/每周报告生成**，支持多种部署方式。

**核心价值**: 将手动运行的情报引擎转变为7×24小时自动运行的智能监控系统。

---

## 已交付文件清单

### 核心系统文件 (4个)

1. **scheduler.py** (24KB) ⭐
   - 调度器主程序
   - APScheduler实现定时任务
   - 自动重试机制
   - 完整的任务日志
   - 支持命令行参数

2. **database.py** (20KB)
   - SQLite数据库管理
   - 9张核心数据表
   - 完整的CRUD操作
   - 批量插入/查询
   - 数据清理功能

3. **alert_system.py** (18KB)
   - 告警触发检查
   - 多渠道推送（Email/Slack/Telegram）
   - 6种告警规则
   - 灵活的配置管理
   - HTML格式邮件

4. **report_generator.py** (33KB)
   - 每日简报生成
   - 每周深度报告
   - Matplotlib图表
   - Markdown格式
   - 综合评分计算

### 配置与文档 (6个)

5. **README_AUTOMATION.md** (19KB)
   - 完整部署文档
   - 架构说明
   - 配置指南
   - 5种部署方案
   - 故障排查

6. **QUICK_REFERENCE.md** (7KB)
   - 快速参考卡片
   - 常用命令
   - 配置速查
   - 故障排查速查

7. **requirements.txt** (592B)
   - Python依赖清单
   - 核心包：apscheduler, pandas, matplotlib

8. **example_daily_report.md** (3.2KB)
   - 完整的报告示例
   - 展示所有模块

9. **.gitignore** (735B)
   - Git忽略规则
   - 保护敏感文件

10. **PROJECT_SUMMARY.md** (本文件)
    - 项目总结文档

### 辅助工具 (4个)

11. **setup_configs.py** (6.5KB)
    - 交互式配置生成向导
    - 自动创建scheduler_config.json
    - 自动创建alert_config.json

12. **test_system.py** (11KB)
    - 完整的系统测试
    - 测试所有4个核心模块
    - 依赖检查
    - 自动清理测试文件

13. **quickstart.sh** (3.4KB)
    - 快速启动脚本
    - 依赖检查
    - 初始化向导
    - 多种运行模式

14. **daily_update.py** (9.4KB)
    - 每日数据更新辅助脚本
    - 用于手动触发更新

### 部署配置 (3个)

15. **Dockerfile** (1KB)
    - Docker容器配置
    - 基于Python 3.9
    - 健康检查
    - 数据卷挂载

16. **docker-compose.yml** (1.1KB)
    - Docker Compose编排
    - 数据持久化
    - 日志管理

17. **tesla-intelligence.service** (787B)
    - systemd服务配置
    - 自动重启
    - 日志集成

---

## 系统架构

```
┌─────────────────────────────────────────────────────────┐
│           APScheduler Scheduler (scheduler.py)          │
│  ┌──────────────────┐          ┌──────────────────┐    │
│  │  6大引擎任务      │          │  报告生成任务     │    │
│  │  - 内部人交易    │          │  - 每日简报       │    │
│  │  - 期权异常      │          │  - 每周深度报告   │    │
│  │  - 市场情绪      │          │  - 数据库清理     │    │
│  │  - 供应链信号    │          └──────────────────┘    │
│  │  - 空头利息      │                                   │
│  │  - 暗池活动      │                                   │
│  └──────────────────┘                                   │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
              ▼                           ▼
     ┌─────────────────┐        ┌─────────────────┐
     │  SQLite数据库    │        │   告警系统      │
     │  (database.py)  │        │ (alert_system)  │
     │  - 9张数据表     │        │  - Email        │
     │  - 历史数据      │        │  - Slack        │
     │  - 任务日志      │        │  - Telegram     │
     └─────────────────┘        └─────────────────┘
              │                           │
              ▼                           ▼
     ┌─────────────────┐        ┌─────────────────┐
     │  报告生成器      │        │  外部通知        │
     │(report_gen.py)  │        │  - 邮件推送      │
     │  - Markdown报告 │        │  - 即时消息      │
     │  - 图表生成      │        │  - 群组通知      │
     └─────────────────┘        └─────────────────┘
```

---

## 核心功能

### 1. 自动调度系统

**特点**:
- 基于Cron表达式的灵活调度
- 自动重试机制（3次重试，可配置）
- 完整的任务执行日志
- 失败通知与错误追踪

**默认调度**:
| 任务 | 频率 | 说明 |
|------|------|------|
| 内部人交易 | 每日2次 (9:00, 16:00) | 盘前盘后监控 |
| 期权异常 | 每30分钟 (交易时段) | 实时监控 |
| 市场情绪 | 每4小时 | 全天监控 |
| 供应链 | 每日1次 (10:00) | 早盘监控 |
| 空头利息 | 每周2次 (周二、周五) | 数据发布日 |
| 暗池活动 | 每日1次 (18:00) | 盘后监控 |
| 每日报告 | 每日1次 (19:00) | 盘后汇总 |
| 每周报告 | 每周1次 (周六10:00) | 周末深度分析 |

### 2. 智能告警系统

**6种告警规则**:

1. **内部人交易告警**
   - 触发条件: 单笔 ≥ $100万
   - 严重程度: HIGH
   - 通知内容: 交易人、职位、股数、价值

2. **期权异常告警**
   - 触发条件: 异常评分 ≥ 8.0/10
   - 严重程度: HIGH
   - 通知内容: 合约类型、成交量、隐含波动率

3. **情绪剧变告警**
   - 触发条件: OCI单日变化 ≥ 2.0点
   - 严重程度: MEDIUM
   - 通知内容: 当前值、变化量、方向

4. **供应链信号告警**
   - 触发条件: 信号强度 ≥ 7.0/10
   - 严重程度: MEDIUM
   - 通知内容: 供应商、指标、变化率

5. **空头挤压告警**
   - 触发条件: 空头占比 ≥ 20%
   - 严重程度: HIGH
   - 通知内容: 空头比例、回补天数、借券费率

6. **暗池异常告警**
   - 触发条件: 暗池占比 ≥ 40%
   - 严重程度: MEDIUM
   - 通知内容: 成交占比、平均交易规模

**推送渠道**:
- Email: SMTP支持所有邮箱（Gmail/Outlook/QQ等）
- Slack: Webhook集成
- Telegram: Bot API

### 3. 报告生成系统

**每日简报** (`daily_brief_TSLA_YYYY-MM-DD.md`):
- 执行摘要: 综合评分 + 持仓建议
- 6大引擎关键信号
- 评分矩阵表格
- 短期/中期操作建议
- 风险提示
- 约2000-3000字

**每周深度报告** (`weekly_report_TSLA_YYYY-MM-DD.md`):
- 本周关键发现（3条）
- 内部人交易深度分析 + 趋势图
- 情绪指数演变 + 走势图
- 供应链信号追踪 + 热力图
- 期权市场观察
- 下周展望
- 约4000-6000字

**图表类型**:
- 内部人交易柱状图（买入/抛售）
- 情绪指数折线图（7天趋势）
- 供应链信号热力图（供应商×日期）

### 4. 数据库管理

**9张核心表**:
| 表名 | 用途 | 关键字段 |
|------|------|---------|
| insider_trading | 内部人交易 | insider, transaction, value |
| options_unusual | 期权异常 | strike_price, unusual_score |
| sentiment_history | 情绪历史 | oci_score, sample_size |
| supply_chain_signals | 供应链 | supplier, signal_strength |
| short_signals | 空头数据 | short_pct_float, borrow_fee |
| dark_pool_activity | 暗池活动 | dark_pool_pct, net_flow |
| daily_reports | 每日报告 | composite_score, report_path |
| alerts | 告警历史 | alert_type, severity |
| task_logs | 任务日志 | task_name, status |

**功能**:
- 自动创建表结构和索引
- 批量插入/查询
- 数据清理（默认保留365天）
- 事务支持
- 连接池管理

---

## 部署方案

### 方案1: 本地直接运行（最简单）

```bash
# 安装依赖
pip install -r requirements.txt

# 运行向导
./quickstart.sh

# 启动调度器
python scheduler.py
```

**适用**: 开发测试、个人使用

### 方案2: systemd服务（Linux推荐）

```bash
# 复制服务文件
sudo cp tesla-intelligence.service /etc/systemd/system/

# 编辑配置
sudo nano /etc/systemd/system/tesla-intelligence.service

# 启动服务
sudo systemctl enable tesla-intelligence
sudo systemctl start tesla-intelligence
```

**适用**: Linux服务器、生产环境、需要开机自启

### 方案3: Docker容器（云端推荐）

```bash
# 使用docker-compose
docker-compose up -d

# 查看日志
docker logs -f tesla-intelligence-scheduler
```

**适用**: 云服务器、容器化部署、多环境隔离

### 方案4: Screen/Tmux后台（快速方案）

```bash
# 创建screen会话
screen -S tesla

# 运行调度器
python scheduler.py

# 分离会话: Ctrl+A, D
# 重新连接: screen -r tesla
```

**适用**: 快速部署、临时运行

### 方案5: Cron定时任务（仅报告）

```bash
# 编辑crontab
crontab -e

# 添加任务
0 19 * * 1-5 cd /path/to/automation && python scheduler.py --daily-report
0 10 * * 6 cd /path/to/automation && python scheduler.py --weekly-report
```

**适用**: 仅需要定时报告，不需要持续监控

---

## 使用流程

### 首次使用

1. **安装依赖**
   ```bash
   pip install -r requirements.txt
   ```

2. **生成配置**
   ```bash
   python setup_configs.py
   # 或直接编辑 scheduler_config.json 和 alert_config.json
   ```

3. **测试系统**
   ```bash
   python test_system.py
   ```

4. **运行一次测试**
   ```bash
   python scheduler.py --once
   ```

5. **检查报告**
   ```bash
   ls -lh reports/
   cat reports/daily_brief_TSLA_*.md
   ```

### 生产运行

1. **启动调度器**
   ```bash
   # 前台运行（测试）
   python scheduler.py

   # 或使用systemd（生产）
   sudo systemctl start tesla-intelligence
   ```

2. **监控运行**
   ```bash
   # 查看日志
   tail -f intelligence_scheduler.log

   # 查看状态
   python scheduler.py --status
   ```

3. **查看数据**
   ```bash
   # 进入数据库
   sqlite3 tesla_intelligence.db

   # 查询最近告警
   SELECT * FROM alerts ORDER BY created_at DESC LIMIT 10;

   # 查询任务日志
   SELECT * FROM task_logs WHERE status = 'FAILED';
   ```

### 日常维护

1. **查看报告**
   ```bash
   ls -lt reports/  # 按时间排序
   ```

2. **备份数据库**
   ```bash
   cp tesla_intelligence.db backups/tesla_$(date +%Y%m%d).db
   ```

3. **清理旧数据**（自动执行，也可手动）
   ```python
   from database import get_db
   with get_db() as db:
       db.cleanup_old_data(days=180)
   ```

4. **更新配置**
   ```bash
   # 编辑配置后重启
   nano scheduler_config.json
   sudo systemctl restart tesla-intelligence
   ```

---

## 技术特点

### 1. 可靠性
- ✅ 自动重试机制（3次，间隔5分钟）
- ✅ 完整的错误日志
- ✅ 任务执行追踪
- ✅ 数据库事务支持
- ✅ 健康检查（Docker）

### 2. 可扩展性
- ✅ 模块化设计（4个独立模块）
- ✅ 插件式引擎（易于添加新引擎）
- ✅ 灵活的配置系统
- ✅ 支持多股票（修改ticker即可）

### 3. 易用性
- ✅ 交互式配置向导
- ✅ 快速启动脚本
- ✅ 完整的测试工具
- ✅ 详细的文档
- ✅ 示例报告

### 4. 安全性
- ✅ 敏感信息配置文件化
- ✅ .gitignore保护
- ✅ 文件权限管理
- ✅ SQL注入防护（参数化查询）

---

## 性能指标

### 资源占用（测试环境）

- **内存**: ~50-100MB（空闲）/ ~200MB（生成报告时）
- **CPU**: <5%（空闲）/ 10-20%（运行引擎时）
- **磁盘**:
  - 代码: ~200KB
  - 数据库: ~10MB（30天数据）
  - 报告: ~1MB/月

### 执行时间（估算）

- 单个引擎: 5-30秒
- 所有引擎: 1-3分钟
- 每日报告: 10-30秒
- 每周报告: 30-60秒（包含图表生成）

### 数据增长（估算）

- 每日新增记录: 50-200条
- 月度数据库增长: ~3-5MB
- 年度数据库增长: ~30-50MB

---

## 配置示例

### scheduler_config.json

```json
{
  "ticker": "TSLA",
  "engines": {
    "insider_trading": {
      "enabled": true,
      "schedule": "0 9,16 * * 1-5",
      "retry_attempts": 3
    }
  },
  "tasks": {
    "daily_report": {
      "enabled": true,
      "schedule": "0 19 * * 1-5"
    }
  }
}
```

### alert_config.json

```json
{
  "enabled": true,
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

## 常见问题 (FAQ)

### Q1: 如何修改调度时间？

编辑 `scheduler_config.json`，修改 `schedule` 字段（Cron表达式）。

### Q2: 如何添加更多邮件收件人？

编辑 `alert_config.json`，在 `recipients` 数组中添加邮箱地址。

### Q3: 如何禁用某个引擎？

将对应引擎的 `enabled` 设为 `false`。

### Q4: 如何更换目标股票？

修改 `scheduler_config.json` 中的 `ticker` 字段。

### Q5: 数据库文件在哪里？

默认位置: `tesla_intelligence.db`（与脚本同目录）。

### Q6: 如何备份数据？

复制数据库文件: `cp tesla_intelligence.db backups/`

### Q7: 如何查看历史报告？

所有报告保存在 `reports/` 目录。

### Q8: 系统崩溃后如何恢复？

如果使用systemd，会自动重启。手动恢复：重新运行 `python scheduler.py`。

### Q9: 如何升级系统？

```bash
git pull  # 拉取最新代码
pip install -r requirements.txt --upgrade  # 升级依赖
python test_system.py  # 测试
sudo systemctl restart tesla-intelligence  # 重启服务
```

### Q10: 内存不足怎么办？

1. 限制历史数据保留天数（默认365天）
2. 使用Docker限制内存
3. 减少图表生成频率

---

## 未来扩展方向

### 短期（v1.1）
- [ ] Web Dashboard（实时查看状态）
- [ ] 更多图表类型（K线图、相关性热力图）
- [ ] 移动端推送（iOS/Android通知）
- [ ] 数据导出功能（Excel/CSV）

### 中期（v1.5）
- [ ] 多股票支持（同时监控多只股票）
- [ ] 机器学习预测（基于历史数据）
- [ ] API接口（RESTful API）
- [ ] PostgreSQL支持（替代SQLite）

### 长期（v2.0）
- [ ] 分布式架构（多节点部署）
- [ ] 实时流处理（Kafka/Redis）
- [ ] 高级可视化（D3.js/ECharts）
- [ ] 策略回测框架

---

## 致谢与支持

### 核心依赖

- **APScheduler**: 任务调度框架
- **Pandas**: 数据处理
- **Matplotlib**: 图表生成
- **SQLite**: 轻量级数据库
- **Requests**: HTTP请求

### 开发团队

- Intelligence Engine Team
- Version: 1.0
- Date: 2026-01-25

### 支持

- 📖 文档: `README_AUTOMATION.md`
- 🚀 快速参考: `QUICK_REFERENCE.md`
- 🧪 测试: `python test_system.py`
- 💬 Issues: (提交问题反馈)

---

## 许可证

MIT License - 可自由使用、修改、分发

---

## 总结

✅ **交付完成**: 17个核心文件
✅ **功能完整**: 调度、数据库、告警、报告4大模块
✅ **文档齐全**: 3份文档（完整/快速参考/项目总结）
✅ **部署灵活**: 5种部署方案
✅ **测试完善**: 完整的测试脚本
✅ **即用即走**: 快速启动脚本

**立即开始**: `./quickstart.sh` 🚀

---

**项目状态**: ✅ 生产就绪 (Production Ready)
**最后更新**: 2026-01-25
