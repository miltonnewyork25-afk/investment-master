# SEC信号侦测系统使用指南

**快速开始 | 5分钟搞定**

---

## 一、系统简介

自动抓取SEC披露文件，识别"聪明钱"（Smart Money）的买入信号：
- ✅ **Form 4** - 内部人交易（公司高管买卖自家股票）
- ✅ **Form 13F** - 机构持仓（Berkshire、Bridgewater等顶级机构）
- ✅ **Form 13D/13G** - 维权投资者入场（Carl Icahn、Bill Ackman等）

**输出**：每个股票的综合评分（0-100分）+ A/B/C/D评级

---

## 二、安装与环境

### 前置要求

```bash
# Python 3.8+
python3 --version

# 仅需requests库（无需API key）
pip3 install requests
```

### 文件结构

```
Top20_Screener/signals/
├── sec_scraper.py              # 核心爬虫
├── institutional_analyzer.py   # 机构持仓分析
├── sec_signal_engine.py        # 综合评分引擎
├── test_run.py                 # 测试脚本（从这里开始）
├── sec_signal_methodology.md   # 方法论文档
└── README.md                   # 本文档
```

---

## 三、快速运行（3步）

### Step 1: 进入目录

```bash
cd /Users/milton/投资大师/Top20_Screener/signals
```

### Step 2: 运行测试

```bash
python3 test_run.py
```

**预期输出**：
```
================================================================================
SEC综合信号侦测系统
================================================================================
分析股票数量: 5

【阶段1/3】分析Form 4内部人交易...
--------------------------------------------------------------------------------
正在分析 AAPL 的内部人交易...
  找到 12 个Form 4文件
  解析文件 1/12...

【阶段2/3】分析Form 13F机构持仓...
...

【阶段3/3】分析Form 13D/13G重要股东...
...

================================================================================
Top 5 SEC综合信号排名
================================================================================
排名   代码      总分      评级             内部人    机构      13D
--------------------------------------------------------------------------------
1    NVDA     87.5      A+ 强烈信号        9.0      95.0     7.0
2    AAPL     72.3      A 强信号           8.5      85.0     0.0
...

✓ 综合评分结果已保存至: sec_combined_signals.csv
✓ 所有分析完成！
```

### Step 3: 查看结果

```bash
# 查看综合评分
open sec_combined_signals.csv

# 或使用命令行
head -n 20 sec_combined_signals.csv
```

---

## 四、自定义分析

### 4.1 分析自己的股票池

**方式1：直接编辑代码**

```bash
# 编辑 test_run.py
nano test_run.py

# 找到这一行，替换为你的股票
my_tickers = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'GOOGL']
```

**方式2：从CSV读取**

```python
# 创建 my_watchlist.csv
# Ticker
# AAPL
# MSFT
# ...

# 在test_run.py中添加
import pandas as pd
df = pd.read_csv('my_watchlist.csv')
my_tickers = df['Ticker'].tolist()

engine = SECSignalEngine()
results = engine.comprehensive_analysis(my_tickers)
```

### 4.2 调整时间窗口

```python
# 在 sec_signal_engine.py 中修改

# Form 4回溯时间（默认6个月）
insider_results = self.insider_analyzer.batch_analyze(
    tickers,
    months_back=12  # 改为12个月
)

# 13F回溯季度（默认2个季度）
institutional_results = self.institutional_analyzer.batch_analyze(
    tickers,
    quarters_back=4  # 改为4个季度
)
```

### 4.3 调整评分权重

```python
# 在 SECSignalEngine.comprehensive_analysis() 中修改

# 默认权重：Form 4(40%) + 13F(35%) + 13D(25%)

# 如果你更看重内部人交易：
insider_weighted = (insider_score / 10) * 60  # 60%
institutional_weighted = (institutional_score / 100) * 25  # 25%
form13d_weighted = form13d_score * 0.6  # 15%
```

---

## 五、输出文件说明

### 5.1 主文件：sec_combined_signals.csv

**字段说明**：

| 字段 | 含义 | 示例 |
|------|------|------|
| Ticker | 股票代码 | AAPL |
| Total_Score | 综合评分（0-100） | 87.5 |
| Rating | 评级 | A+ 强烈信号 |
| Insider_Score_0_10 | 内部人原始评分 | 9.0 |
| Insider_Weighted_40 | 内部人加权分 | 36.0 |
| Institutional_Score_0_100 | 机构原始评分 | 95.0 |
| Institutional_Weighted_35 | 机构加权分 | 33.3 |
| Form13D_Score_0_25 | 13D原始评分 | 18.0 |
| Form13D_Weighted_25 | 13D加权分 | 18.0 |
| Insider_Summary | 内部人摘要 | 净买入$2.5M... |
| Institutional_Summary | 机构摘要 | 新建仓3家... |
| Form13D_Summary | 13D摘要 | 有维权投资者... |
| Data_As_Of | 数据日期 | 2026-01-25 |

**评级标准**：
- **A+ (80-100)**: 强烈信号，优先深度研究
- **A (65-79)**: 强信号，加入观察清单
- **B (50-64)**: 中等信号，继续监控
- **C (35-49)**: 弱信号，低优先级
- **D (0-34)**: 无明显信号

### 5.2 详细文件

**insider_trading_signals_detail.csv** - 每笔内部人交易

```csv
Ticker,Date,Reporter,Title,Is_Executive,Transaction_Code,Shares,Price_USD,Value_USD,Filing_URL
AAPL,2026-01-15,Tim Cook,CEO,True,P,10000,175.50,1755000.0,https://sec.gov/...
```

**institutional_holdings_detail.csv** - 每个机构的动作

```csv
Ticker,Institution,Action,Latest_Shares,Change_Shares,Change_Pct,Latest_Value_kUSD,Institution_Weight,Quarter
NVDA,Berkshire Hathaway,New Position,1000000,1000000,0.0,50000,10,2025-12-31
```

### 5.3 数据可审计性

**关键特性**：每个数字都能追溯到原始SEC文件

**验证步骤**：
1. 在 `sec_combined_signals.csv` 看到"AAPL内部人净买入$2.5M"
2. 打开 `insider_trading_signals_detail.csv` 找到AAPL的所有交易
3. 点击 `Filing_URL` 列的链接，查看原始Form 4文件
4. 验证交易日期、数量、价格是否正确

---

## 六、常见问题（FAQ）

### Q1: 为什么有些股票没有数据？

**可能原因**：
- CIK未找到（部分股票代码不标准，如BRK.B）
- 最近6个月无Form 4文件（无内部人交易）
- 公司太小，机构不持有

**解决方法**：
- 手动查询CIK：访问 https://www.sec.gov/edgar/searchedgar/companysearch.html
- 延长时间窗口（months_back=12）

### Q2: 为什么13F数据这么少？

**原因**：13F解析目前是简化版本，只追踪10家顶级机构

**完整13F数据需要**：
- 解析所有持有该股票的机构（可能上百家）
- 完整的XML解析（informationTable.xml）

**当前版本的权衡**：
- ✅ 优势：只看最重要的机构（Berkshire等），信号质量高
- ❌ 劣势：可能漏掉一些中小机构的动作

### Q3: 评分高的股票一定会涨吗？

**答案：不一定，但概率更高**

**学术研究证据**：
- Seyhun (1986): 内部人买入后，未来12个月平均超额收益 **6.2%**
- Lakonishok (2001): 大额内部人买入（>$100K）信息含量显著

**但要注意**：
- ❌ 内部人卖出≠看空（可能是个人财务需求）
- ❌ 13F数据滞后45天（机构可能已经卖出）
- ❌ 维权投资者可能失败（如Icahn @ Herbalife）

**正确使用方式**：
1. SEC信号 ≥ 65分 → 值得深入研究
2. 结合基本面分析（财务、行业、竞争）
3. 不要只因为高分就盲目买入

### Q4: 多久运行一次？

**建议频率**：

| 数据源 | 更新频率 | 建议运行频率 |
|-------|---------|------------|
| Form 4 | 每天（2日内披露） | 每周1次 |
| Form 13F | 每季度 | 每季度后1个月 |
| Form 13D | 不定期 | 每月1次 |

**自动化方案**：

```bash
# 每周一早上6点运行
crontab -e

# 添加以下行
0 6 * * 1 cd /Users/milton/投资大师/Top20_Screener/signals && python3 sec_signal_engine.py >> log.txt 2>&1
```

### Q5: 如何避免被SEC封IP？

**SEC规则**：
- 速率限制：10 requests/second
- 必须提供User-Agent（含邮箱）

**本系统的防护**：
- ✅ 自动速率限制（0.1s/请求）
- ✅ 缓存机制（7天内不重复请求）
- ✅ 正确的User-Agent头

**如果仍被限制**：
```python
# 在 sec_scraper.py 中调整
RATE_LIMIT = 0.2  # 增加到0.2秒/请求（5 req/sec）
```

---

## 七、进阶技巧

### 7.1 结合财务指标筛选

```python
# 先用财务指标初筛，再用SEC信号精选

# Step 1: 财务初筛（如PE<20, PB<3）
candidates = screen_by_fundamentals(universe)

# Step 2: SEC信号精选
engine = SECSignalEngine()
results = engine.comprehensive_analysis(candidates)

# Step 3: 只保留A级以上
final_picks = [r for r in results if r['total_score'] >= 65]
```

### 7.2 监控已有持仓

```python
# 每周检查你的持仓是否仍有Smart Money支持

my_portfolio = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']

results = engine.comprehensive_analysis(my_portfolio)

for r in results:
    if r['total_score'] < 35:
        print(f"⚠️ 警告：{r['ticker']} 信号恶化（{r['total_score']}分）")
        print(f"   建议：考虑减仓或深度复核投资逻辑")
```

### 7.3 历史回测（未来功能）

```python
# 验证信号的预测性
backtest_results = backtest_sec_signals(
    start_date='2020-01-01',
    end_date='2025-12-31',
    holding_period=90  # 买入后持有90天
)

print(f"SEC信号≥80的股票，90天平均收益: {backtest_results['avg_return']:.2%}")
```

---

## 八、故障排除

### 问题1: ImportError: No module named 'requests'

**解决**：
```bash
pip3 install requests
```

### 问题2: CIK未找到

**现象**：
```
正在分析 BRK.B 的内部人交易...
{'ticker': 'BRK.B', 'error': 'CIK未找到'}
```

**原因**：BRK.B的正确代码是BRK/B（SEC系统中）

**解决**：
```python
# 在ticker_mappings中添加映射
ticker_mappings = {
    'BRK.B': 'BRK/B',
    'BF.B': 'BF/B'
}

# 或手动查询CIK并硬编码
ticker_to_cik = {
    'BRK.B': '0001067983'  # Berkshire Hathaway的CIK
}
```

### 问题3: XML解析失败

**现象**：
```
XML解析失败: not well-formed (invalid token)
```

**原因**：部分旧文件是HTML格式，不是XML

**解决**：系统会自动跳过，记录在日志中

### 问题4: 运行太慢

**原因**：抓取大量股票时，受速率限制影响

**优化方案**：
```python
# 1. 使用缓存（默认已启用）
use_cache=True

# 2. 减少回溯时间
months_back=3  # 从6个月改为3个月

# 3. 批量处理（每10个股票休息1分钟）
for i in range(0, len(tickers), 10):
    batch = tickers[i:i+10]
    results = engine.comprehensive_analysis(batch)
    time.sleep(60)
```

---

## 九、联系与反馈

### 数据来源

- **SEC EDGAR**: https://www.sec.gov/edgar.shtml
- **Form 4 搜索**: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&type=4
- **13F 搜索**: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&type=13F

### 参考资源

- **方法论文档**: `sec_signal_methodology.md`（详细评分逻辑）
- **SEC官方指南**: https://www.sec.gov/files/forms-3-4-5.pdf
- **学术论文**: Seyhun (1986), Lakonishok (2001)

### 已知限制

1. ⚠️ **13F数据滞后**：季度结束后45天披露，时效性差
2. ⚠️ **13F解析简化**：当前只追踪10家顶级机构（未来会扩展）
3. ⚠️ **不含期权交易**：只分析股票交易，不含期权、衍生品
4. ⚠️ **未调整股票分割**：历史数据可能未调整Split

### 下一步计划

- [ ] 完整的13F XML解析（追踪所有机构）
- [ ] 历史数据回测（验证信号预测性）
- [ ] 实时监控（新Form 4立即通知）
- [ ] 与基本面数据整合（PE/PB/ROE等）
- [ ] Web界面（无需命令行）

---

## 十、License

本项目仅供个人学习和研究使用。

**数据来源**：SEC EDGAR（公开数据）

**免责声明**：
- 本系统提供的信号仅供参考，不构成投资建议
- 投资有风险，决策需谨慎
- 历史表现不代表未来收益

---

**版本**: v1.0
**更新日期**: 2026-01-25

Happy Investing! 📈
