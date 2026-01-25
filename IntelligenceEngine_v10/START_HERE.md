# 🚀 START HERE - Engine 1快速导航

## 欢迎使用SEC Filing Monitor！

这是一个完整的、生产级的SEC文件监控引擎，用于追踪内部人交易和机构持仓。

---

## ⚡ 5分钟快速开始

### 第1步：安装依赖

```bash
cd /Users/milton/投资大师/IntelligenceEngine_v10
pip3 install requests
```

### 第2步：运行测试

```bash
python3 test_sec_monitor.py
```

**预期输出**: `测试结果: 5 通过, 0 失败`

### 第3步：开始监控

```bash
# 方法1: 使用命令行工具（推荐）
python3 cli.py monitor TSLA
python3 cli.py summary TSLA

# 方法2: 直接运行引擎
python3 engines/sec_monitor.py

# 方法3: Python脚本
python3 -c "
from engines import SECMonitorEngine
engine = SECMonitorEngine()
engine.monitor_form4(ticker='TSLA')
summary = engine.get_insider_summary('TSLA', days=90)
print(summary)
engine.close()
"
```

---

## 📚 文档导航

### 新手必读（按顺序阅读）

1. **[本文件]** START_HERE.md ← 你在这里
2. **[交付总结]** [ENGINE1_DELIVERY_SUMMARY.md](ENGINE1_DELIVERY_SUMMARY.md) - 功能清单和验收标准
3. **[使用手册]** [README_SEC.md](README_SEC.md) - 完整的使用文档（20页）
4. **[实用示例]** [EXAMPLES.md](EXAMPLES.md) - 11个实战代码示例

### 进阶阅读

5. **[项目总览]** [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - 架构设计和扩展方向
6. **[源代码]** engines/sec_monitor.py - 核心引擎（677行，详细注释）
7. **[配置文件]** engines/sec_config.py - 数据源和参数配置

---

## 🎯 常用命令速查

### 监控操作

```bash
# 监控单只股票
python3 cli.py monitor TSLA

# 监控所有股票
python3 cli.py monitor

# 查看系统状态
python3 cli.py status
```

### 分析查询

```bash
# 生成90天汇总
python3 cli.py summary TSLA --days 90

# 对比多只股票
python3 cli.py compare TSLA NVDA AAPL

# 查看警报（大额交易）
python3 cli.py alert

# 显示最大交易Top 20
python3 cli.py largest --limit 20

# 完整分析报告
python3 cli.py report TSLA
```

### 自动化部署

```bash
# 启动调度器（持续运行）
python3 scheduler.py

# 后台运行
nohup python3 scheduler.py > scheduler.log 2>&1 &

# 查看日志
tail -f logs/sec_monitor.log
```

---

## 📁 项目结构一览

```
IntelligenceEngine_v10/
│
├── 📖 文档（必读）
│   ├── START_HERE.md                    ← 你在这里（快速导航）
│   ├── ENGINE1_DELIVERY_SUMMARY.md      ← 交付总结
│   ├── README_SEC.md                    ← 完整使用手册
│   ├── EXAMPLES.md                      ← 11个实用示例
│   └── PROJECT_OVERVIEW.md              ← 项目总览
│
├── 🔧 核心引擎（必需）
│   └── engines/
│       ├── sec_monitor.py               ← 主引擎（677行）
│       └── sec_config.py                ← 配置文件（201行）
│
├── 🛠️ 工具脚本
│   ├── cli.py                           ← 命令行工具（9个命令）
│   ├── scheduler.py                     ← 自动调度器
│   ├── data_analysis.py                 ← 高级分析工具
│   └── test_sec_monitor.py              ← 测试套件
│
├── 💾 数据目录
│   └── data/
│       ├── sec_filings.db               ← SQLite数据库（自动创建）
│       └── cache/                       ← API缓存
│
└── 📝 日志目录
    └── logs/
        └── sec_monitor.log              ← 运行日志
```

---

## 🎓 学习路径

### 路径1: 快速上手（10分钟）

1. 运行 `python3 test_sec_monitor.py`（验证环境）
2. 运行 `python3 cli.py monitor TSLA`（监控特斯拉）
3. 运行 `python3 cli.py summary TSLA`（查看汇总）
4. 阅读 [README_SEC.md](README_SEC.md) 第1-3节（核心概念）

### 路径2: 深度理解（1小时）

1. 阅读 [ENGINE1_DELIVERY_SUMMARY.md](ENGINE1_DELIVERY_SUMMARY.md)（完整功能）
2. 阅读 [EXAMPLES.md](EXAMPLES.md) 示例1-6（基础用法）
3. 运行几个示例代码
4. 查看 engines/sec_monitor.py 源代码（理解实现）

### 路径3: 生产部署（半天）

1. 完成路径1和路径2
2. 编辑 engines/sec_config.py（添加监控股票）
3. 测试调度器：`python3 scheduler.py`
4. 配置Cron或后台运行
5. 阅读 [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) 的"故障排查"章节

---

## 💡 典型使用场景

### 场景1: 日常监控（个人投资者）

```bash
# 每天早上运行一次
python3 cli.py monitor        # 更新所有数据
python3 cli.py alert          # 查看警报
python3 cli.py summary TSLA   # 查看持仓股票
```

### 场景2: 研究分析（专业分析师）

```python
# research.py
from data_analysis import SECDataAnalyzer

analyzer = SECDataAnalyzer()

# 多维度分析
sentiment = analyzer.get_insider_sentiment('TSLA', 90)
key_trades = analyzer.get_key_insider_activity('TSLA', 90)
clusters = analyzer.get_trading_clusters('TSLA', 90)

# 对比分析
comparison = analyzer.compare_tickers(['TSLA', 'NVDA', 'AAPL'], 90)

# 生成报告
report = analyzer.generate_report('TSLA')
print(report)
```

### 场景3: 自动化交易（量化团队）

```python
# trading_signal.py
from engines import SECMonitorEngine
from data_analysis import SECDataAnalyzer

def generate_signals():
    """基于内部人交易生成交易信号"""
    analyzer = SECDataAnalyzer()

    for ticker in ['TSLA', 'NVDA', 'AAPL']:
        sentiment = analyzer.get_insider_sentiment(ticker, 30)

        # 强烈看涨信号
        if (sentiment['buy_sell_ratio'] > 3 and
            sentiment['buy_value'] > 10000000):
            print(f"🟢 BUY: {ticker} - 内部人大量买入")

        # 强烈看跌信号
        elif (sentiment['buy_sell_ratio'] < 0.3 and
              sentiment['sell_value'] > 50000000):
            print(f"🔴 SELL: {ticker} - 内部人大量卖出")

# 每小时运行
import schedule
schedule.every(1).hours.do(generate_signals)
```

---

## ❓ 常见问题速查

### Q1: 第一次运行没有数据？

**A**: 正常！需要先运行监控抓取数据：
```bash
python3 cli.py monitor TSLA
```

### Q2: 如何添加更多股票？

**A**: 编辑 `engines/sec_config.py`，在 `MONITORED_COMPANIES` 中添加：
```python
"AMZN": {
    "name": "Amazon.com Inc",
    "cik": "0001018724",  # 在SEC官网搜索公司获取CIK
    "forms": ["4", "13F-HR"]
}
```

### Q3: 数据多久更新一次？

**A**:
- Form 4：内部人交易后2-4天申报
- 13F：季度结束后45天申报
- 建议监控频率：Form 4每小时，13F每天

### Q4: 如何查看历史数据？

**A**: 使用SQL查询：
```bash
sqlite3 data/sec_filings.db
sqlite> SELECT * FROM form4_transactions WHERE ticker='TSLA' ORDER BY transaction_date DESC LIMIT 10;
```

### Q5: 出错了怎么办？

**A**: 查看日志：
```bash
tail -50 logs/sec_monitor.log
```

更多问题见 [README_SEC.md](README_SEC.md) 的"故障排查"章节。

---

## 🔗 快速链接

| 文档 | 用途 | 阅读时长 |
|------|------|----------|
| [ENGINE1_DELIVERY_SUMMARY.md](ENGINE1_DELIVERY_SUMMARY.md) | 交付验收、功能清单 | 10分钟 |
| [README_SEC.md](README_SEC.md) | 完整使用手册 | 30分钟 |
| [EXAMPLES.md](EXAMPLES.md) | 实战代码示例 | 20分钟 |
| [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | 架构设计 | 15分钟 |

| 代码文件 | 说明 | 行数 |
|---------|------|------|
| engines/sec_monitor.py | 核心引擎 | 677 |
| engines/sec_config.py | 配置文件 | 201 |
| cli.py | 命令行工具 | 295 |
| data_analysis.py | 分析工具 | 314 |

---

## 🎯 下一步

### 立即开始

1. ✅ 运行测试：`python3 test_sec_monitor.py`
2. ✅ 监控TSLA：`python3 cli.py monitor TSLA`
3. ✅ 查看汇总：`python3 cli.py summary TSLA`
4. ✅ 阅读文档：[README_SEC.md](README_SEC.md)

### 深入学习

5. 阅读 [EXAMPLES.md](EXAMPLES.md) 并运行示例代码
6. 自定义 `engines/sec_config.py` 添加监控股票
7. 启动调度器实现自动化
8. 集成到你的投资研究流程

### 扩展功能

9. 添加邮件/Telegram通知（见EXAMPLES.md示例7-8）
10. 开发自定义分析策略（见EXAMPLES.md示例9-10）
11. 集成其他数据源（期权、社交媒体等）

---

## 📞 获取帮助

- **文档问题**: 查看 [README_SEC.md](README_SEC.md)
- **代码问题**: 查看 engines/sec_monitor.py 的详细注释
- **使用示例**: 查看 [EXAMPLES.md](EXAMPLES.md)
- **错误排查**: 查看 logs/sec_monitor.log

---

## 🎉 准备好了吗？

**运行这个命令开始你的第一次监控：**

```bash
python3 cli.py monitor TSLA && python3 cli.py summary TSLA
```

**祝你使用愉快！**

---

**版本**: v1.0
**更新**: 2026-01-25
**作者**: Investment Research AI
**状态**: ✅ 生产就绪
