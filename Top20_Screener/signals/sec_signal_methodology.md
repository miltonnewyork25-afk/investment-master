# SEC信号侦测系统方法论

**版本**: v1.0
**更新日期**: 2026-01-25
**数据源**: SEC EDGAR API（免费，公开）

---

## 一、系统概述

本系统自动抓取和分析SEC披露文件，识别"聪明钱"（Smart Money）的投资信号，包括：

1. **Form 4** - 内部人交易（公司高管、董事买卖自家股票）
2. **Form 13F** - 机构持仓（管理资产>$100M的机构季度披露）
3. **Form 13D/13G** - 重要股东（持股≥5%的股东披露）

**核心假设**：内部人和顶级机构比散户更早获得信息，其交易行为具有预测性。

---

## 二、Form 4内部人交易侦测

### 2.1 数据来源

- **文件类型**: Form 4（Statements of Changes in Beneficial Ownership）
- **披露要求**: 公司内部人（董事、高管、10%+股东）在2个工作日内披露交易
- **时间窗口**: 最近6个月
- **数据结构**: XML格式，包含交易日期、代码、数量、价格

### 2.2 交易类型分类

| 代码 | 含义 | 分析权重 |
|------|------|---------|
| P | Purchase（买入） | 正面信号 ✅ |
| S | Sale（卖出） | 负面信号 ❌ |
| A | Award/Grant（股权激励） | 中性（不计入净买入） |
| M | Exercise Options（行权） | 取决于后续是否卖出 |
| G | Gift（赠与） | 中性 |

**关键区分**：
- **Open Market Purchase（公开市场买入）**：内部人用自己的钱买入 → **强信号**
- **10b5-1 Plan（预设计划卖出）**：按既定时间表卖出 → **弱信号**

### 2.3 信号强度评分（0-10分）

#### 维度1：净买入金额（最高4分）

```
净买入 = Σ(买入金额) - Σ(卖出金额)

评分规则：
- 净买入 > $1,000,000  → +4分
- 净买入 > $500,000   → +3分
- 净买入 > $100,000   → +2分
- 净买入 > $0         → +1分
- 净买入 ≤ $0         → 0分
```

#### 维度2：买入比例（最高3分）

```
买入比例 = 买入金额 / (买入金额 + 卖出金额) × 100%

评分规则：
- 买入比例 > 80%  → +3分
- 买入比例 > 60%  → +2分
- 买入比例 > 50%  → +1分
```

#### 维度3：高管买入（最高3分）

```
高管定义：CEO、CFO、President、Chief、Director（董事会成员）

评分规则：
- ≥3位高管买入  → +3分
- ≥1位高管买入  → +2分

加分逻辑：
- CEO买入 → 额外+1分（CEO对公司最了解）
- 集体买入（3+高管同时买入）→ 额外+1分（共识信号）
```

#### 综合评级

| 评分 | 信号强度 | 含义 |
|------|---------|------|
| 8-10 | 强买入 | 大量净买入+高买入比例+高管集体买入 |
| 5-7  | 中等买入 | 一定净买入+多数买入交易 |
| 3-4  | 弱买入 | 小额净买入 |
| 0-2  | 中性/卖出 | 净卖出或无明显买入 |

### 2.4 过滤规则

**排除的交易**：
- 单笔 < $10,000（太小，不具参考性）
- 股权激励授予（非真金白银）
- Indirect Ownership（间接持有，如信托）的部分交易

**重点关注的交易**：
- 单笔 > $100,000
- CEO/CFO的Direct Ownership交易
- 连续多笔买入（表明持续看好）

---

## 三、Form 13F机构持仓分析

### 3.1 数据来源

- **文件类型**: Form 13F-HR（Holdings Report）
- **披露要求**: 管理资产≥$100M的机构，每季度披露持仓
- **披露时间**: 季度结束后45天内
- **数据结构**: XML表格（informationTable.xml）

### 3.2 重点追踪机构（10家）

| CIK | 机构名称 | 权重 | 投资风格 |
|-----|---------|------|---------|
| 0001067983 | Berkshire Hathaway | 10 | 价值投资 |
| 0001350694 | Bridgewater Associates | 9 | 宏观对冲 |
| 0001037389 | Renaissance Technologies | 9 | 量化 |
| 0001649339 | ARK Investment | 8 | 创新/科技 |
| 0001364742 | Two Sigma | 8 | 量化 |
| 0001336528 | Citadel Advisors | 7 | 多策略 |
| 0001567619 | Pershing Square | 9 | 维权/集中 |
| 0001061768 | Appaloosa Management | 7 | 价值/事件驱动 |
| 0001079114 | Third Point | 7 | 事件驱动 |
| 0001582694 | Tiger Global | 8 | 科技成长 |

**选择标准**：
- 长期业绩优秀（年化回报>15%）
- 策略多样性（价值、成长、量化、维权）
- 披露透明度高

### 3.3 持仓变化分析

#### 动作分类

```python
对每个机构的每个持仓：
1. 比较最近两个季度（Q-1 vs Q-2）
2. 分类动作：
   - New Position（新建仓）：Q-2无持仓，Q-1有持仓
   - Increased（加仓）：Q-1持股数 > Q-2持股数
   - Decreased（减仓）：Q-1持股数 < Q-2持股数
   - Closed（清仓）：Q-2有持仓，Q-1无持仓
   - Held（持有）：持股数无变化
```

#### 信号强度评分（0-100分）

```
基础评分：
- 新建仓：每个 +10分（最多30分）
- 加仓：每个 +5分（最多25分）
- 减仓：每个 -5分
- 清仓：每个 -10分

加权评分（重点机构）：
- Berkshire/Bridgewater（权重9-10）新建仓 → 额外+20分
- Berkshire/Bridgewater（权重9-10）加仓 → 额外+15分

最终评分限制在0-100范围
```

#### 示例

```
案例：NVDA在2025 Q4

机构动作：
- Berkshire: 新建仓 → +10（基础）+20（加权）= +30分
- ARK: 加仓50% → +5（基础）+15（加权）= +20分
- Citadel: 减仓20% → -5分
- Renaissance: 持有 → 0分

综合评分：30 + 20 - 5 = 45分（中等正面信号）
```

---

## 四、Form 13D/13G重要股东监控

### 4.1 文件类型区别

| 文件 | 含义 | 投资意图 | 信号强度 |
|------|------|---------|---------|
| SC 13D | 主动投资者（持股≥5%） | 可能影响公司运营/策略 | 强 ⚡⚡⚡ |
| SC 13G | 被动投资者（持股≥5%） | 纯财务投资，不干预经营 | 中 ⚡⚡ |

**关键区别**：
- **13D**：需在10天内披露，通常是维权投资者（Activist）、战略投资者、PE/VC
- **13G**：可在年底披露，通常是指数基金、共同基金、被动配置

### 4.2 信号评分（0-25分）

```
13D文件（主动投资）：
- 每个新13D文件 → +15分（最多25分）

13G文件（被动投资）：
- 每个新13G文件 → +3分（最多10分）

限制在0-25分范围
```

### 4.3 维权投资者（Activist）特别关注

**著名Activist投资者**：
- Carl Icahn（CIK: 0000921669）
- Bill Ackman / Pershing Square（CIK: 0001567619）
- Daniel Loeb / Third Point（CIK: 0001079114）
- ValueAct Capital（CIK: 0001273166）
- Elliott Management（CIK: 0001100663）

**Activist入场的典型信号**：
- 提交13D并附Schedule附件（详细说明投资意图）
- 持股比例5-15%（足够影响力，又不触发要约收购）
- Letter to the Board（致董事会公开信，要求改革）

**历史成功案例**：
- Carl Icahn @ Apple（2013）：推动回购，股价+200%
- Bill Ackman @ Canadian Pacific（2011）：更换CEO，股价+150%

---

## 五、综合信号评分系统

### 5.1 权重分配

```
总分 = 100分

组成部分：
1. Form 4 内部人交易：40%权重
   - 原始评分：0-10分
   - 权重后：0-40分

2. Form 13F 机构持仓：35%权重
   - 原始评分：0-100分
   - 权重后：0-35分

3. Form 13D/13G 重要股东：25%权重
   - 原始评分：0-25分
   - 权重后：0-25分
```

### 5.2 综合评级

| 总分 | 评级 | 含义 | 建议动作 |
|------|------|------|---------|
| 80-100 | A+ 强烈信号 | 三个维度全面正面 | 深入研究，优先级最高 |
| 65-79 | A 强信号 | 两个以上维度强正面 | 加入观察清单 |
| 50-64 | B 中等信号 | 一个维度强正面 | 继续监控 |
| 35-49 | C 弱信号 | 部分正面信号 | 低优先级 |
| 0-34 | D 无明显信号 | 无明显买入信号或负面 | 排除 |

### 5.3 使用场景

#### 场景1：从大股票池筛选（Top 100 → Top 20）

```python
# 步骤1：获取基础股票池（如S&P 500）
tickers = get_sp500_tickers()

# 步骤2：运行SEC信号侦测
results = engine.comprehensive_analysis(tickers)

# 步骤3：筛选高分股票
top_signals = [r for r in results if r['total_score'] >= 65]  # A级以上

# 步骤4：人工深度分析这些高分股票
```

#### 场景2：验证投资想法

```python
# 你看好某只股票（如NVDA），但不确定
ticker = 'NVDA'
result = engine.comprehensive_analysis([ticker])[0]

if result['total_score'] >= 65:
    print("✓ SEC信号支持你的判断")
else:
    print("⚠️ 聪明钱可能不同意，需重新审视")
```

#### 场景3：监控已有持仓

```python
# 每月检查你的持仓是否仍有Smart Money支持
my_portfolio = ['AAPL', 'MSFT', 'GOOGL']
results = engine.comprehensive_analysis(my_portfolio)

for r in results:
    if r['total_score'] < 35:
        print(f"⚠️ {r['ticker']} 信号恶化，考虑减仓")
```

---

## 六、数据质量与局限性

### 6.1 数据时效性

| 数据源 | 披露延迟 | 时效性评级 |
|-------|---------|-----------|
| Form 4 | 2个工作日 | 高 ⚡⚡⚡ |
| Form 13F | 季度结束后45天 | 低 ⚡ |
| Form 13D/13G | 10天（13D）/ 年度（13G） | 中 ⚡⚡ |

**含义**：
- **Form 4最及时**：内部人今天买入，后天就能看到文件
- **13F严重滞后**：你看到Q4持仓时，已经是次年2月中旬，机构可能已经卖出
- **13D有预警价值**：10天披露，且通常是长期持有

### 6.2 数据完整性

**Form 4的盲区**：
- 低于$10K的小额交易可能不披露
- Indirect Ownership（间接持有）的复杂结构
- 部分内部人通过家族信托等方式隐藏交易

**13F的盲区**：
- 只披露多头持仓，不披露空头/期权/私募股权
- 外国股票、债券不需要披露
- <200万美元或<10,000股的小仓位可豁免

**13D的盲区**：
- 只披露≥5%持股，低于5%的战略投资者看不到
- 部分机构通过关联公司拆分持股规避披露

### 6.3 信号失效的情况

**内部人卖出≠看空**：
- 行权后卖出套现（正常财务规划）
- 离婚、买房等个人原因
- 10b5-1预设计划（非基于新信息）

**机构买入≠看好**：
- 被动指数基金（如Vanguard）因指数调整买入
- 量化基金因模型信号买入（可能很快卖出）
- 13F数据滞后，可能已经卖出

**维权投资者≠股价上涨**：
- Activist可能失败（如Icahn @ Herbalife输给Ackman）
- 推动的改革可能损害长期价值（如激进回购）

---

## 七、技术实现

### 7.1 SEC EDGAR API规范

**访问限制**：
- 速率限制：10 requests/second
- User-Agent必须包含联系邮箱
- 建议使用gzip压缩

**示例请求**：
```python
headers = {
    'User-Agent': 'Investment Research Bot admin@example.com',
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'www.sec.gov'
}
```

### 7.2 缓存策略

```python
# 缓存有效期
Form 4: 7天（交易不频繁，可缓存）
Form 13F: 90天（季度更新，缓存整个季度）
Form 13D/13G: 30天（不频繁但重要）

# 缓存目录结构
sec_cache/
├── form4_AAPL_20260120.xml
├── 13f_0001067983_2025Q4.xml
└── 13d_TSLA_20260115.xml
```

### 7.3 错误处理

```python
常见错误：
1. CIK未找到 → 尝试替代ticker（如BRK.B → BRK/B）
2. 文件解析失败 → 记录日志，跳过该文件
3. 速率限制 → 自动重试（Exponential Backoff）
4. XML格式变化 → 使用容错解析（try多种pattern）
```

---

## 八、输出文件规范

### 8.1 文件清单

| 文件名 | 格式 | 内容 |
|-------|------|------|
| `sec_combined_signals.csv` | CSV | 综合评分汇总表 |
| `sec_combined_signals.json` | JSON | 同上（便于程序读取） |
| `insider_trading_signals.csv` | CSV | Form 4汇总表 |
| `insider_trading_signals_detail.csv` | CSV | Form 4详细交易记录 |
| `institutional_holdings.csv` | CSV | Form 13F汇总表 |
| `institutional_holdings_detail.csv` | CSV | Form 13F详细动作记录 |

### 8.2 CSV字段说明

#### sec_combined_signals.csv

```csv
Ticker,Total_Score,Rating,Insider_Score_0_10,Insider_Weighted_40,
Institutional_Score_0_100,Institutional_Weighted_35,Form13D_Score_0_25,
Form13D_Weighted_25,Insider_Summary,Institutional_Summary,Form13D_Summary,
Data_As_Of

示例：
NVDA,87.5,A+ 强烈信号,9.0,36.0,95.0,33.3,7.0,18.2,"净买入$2.5M...",
"新建仓3家...","有维权投资者...",2026-01-25
```

#### insider_trading_signals_detail.csv

```csv
Ticker,Date,Reporter,Title,Is_Executive,Transaction_Code,Shares,
Price_USD,Value_USD,Filing_URL

示例：
AAPL,2026-01-15,Tim Cook,CEO,True,P,10000,175.50,1755000.0,
https://www.sec.gov/Archives/edgar/data/...
```

### 8.3 数据可审计性

**关键要求**：
- 每个数字必须可追溯到原始SEC文件
- Filing_URL字段链接到源文件
- Data_As_Of标注数据抓取时间

**示例验证流程**：
```
1. 看到"AAPL内部人净买入$1.5M"
2. 查看detail.csv找到具体交易
3. 点击Filing_URL查看原始Form 4
4. 验证交易日期、数量、价格
```

---

## 九、使用示例

### 9.1 快速开始

```bash
# 安装依赖
pip install requests

# 运行综合分析（测试10只股票）
cd /Users/milton/投资大师/Top20_Screener/signals
python sec_signal_engine.py

# 输出文件在当前目录
ls *.csv *.json
```

### 9.2 自定义股票池

```python
# 编辑 sec_signal_engine.py 的 main() 函数

# 方式1：手动指定
test_tickers = ['AAPL', 'MSFT', 'NVDA', ...]

# 方式2：从CSV读取
import pandas as pd
df = pd.read_csv('my_watchlist.csv')
test_tickers = df['Ticker'].tolist()

# 运行
engine = SECSignalEngine()
results = engine.comprehensive_analysis(test_tickers)
```

### 9.3 定时任务（每周自动更新）

```bash
# 添加到crontab（每周一早上6点运行）
crontab -e

# 添加以下行
0 6 * * 1 cd /Users/milton/投资大师/Top20_Screener/signals && python sec_signal_engine.py >> sec_log.txt 2>&1
```

---

## 十、进阶功能（未来扩展）

### 10.1 实时监控（Webhook）

```python
# 当检测到重大事件时发送通知
if insider_score >= 9 or form13d_score >= 20:
    send_telegram_alert(ticker, event_type, details)
```

### 10.2 历史回测

```python
# 验证信号的预测性
backtest_results = backtest_sec_signals(
    start_date='2020-01-01',
    end_date='2025-12-31',
    holding_period=90  # 买入后持有90天
)

print(f"SEC信号>80的股票，90天平均收益: {backtest_results['avg_return']}")
```

### 10.3 与其他信号整合

```python
# 结合技术指标
combined_score = (
    sec_signal_score * 0.5 +
    momentum_score * 0.3 +
    value_score * 0.2
)
```

---

## 十一、参考资源

### 11.1 官方文档

- [SEC EDGAR User Guide](https://www.sec.gov/edgar/searchedgar/accessing-edgar-data.htm)
- [Form 4 指南](https://www.sec.gov/files/forms-3-4-5.pdf)
- [Form 13F 指南](https://www.sec.gov/divisions/investment/13ffaq.htm)

### 11.2 学术研究

- **Seyhun (1986)**: "Insiders' Profits, Costs of Trading, and Market Efficiency"
  - 结论：内部人买入后，股票未来12个月平均超额收益6.2%

- **Lakonishok & Lee (2001)**: "Are Insider Trades Informative?"
  - 结论：大额内部人买入（>$100K）信息含量显著高于小额交易

- **Griffin, Shu & Topaloglu (2012)**: "Examining the Dark Side of Financial Markets"
  - 结论：13F数据滞后严重，但长期持仓变化仍有预测性

### 11.3 工具与数据提供商

| 提供商 | 优势 | 缺点 | 成本 |
|-------|------|------|------|
| SEC EDGAR（官方） | 免费、完整、官方 | 需自己解析 | 免费 |
| WhaleWisdom | 清洗好的13F数据 | 只有13F | $99/月 |
| Dataroma | 追踪顶级投资者 | 只有部分机构 | 免费 |
| Fintel | 综合内部人+机构数据 | 更新慢 | $49/月 |

**建议**：用本系统（免费+完整），必要时用WhaleWisdom交叉验证。

---

## 附录：代码架构

```
Top20_Screener/signals/
├── sec_scraper.py              # 核心爬虫（SEC API客户端）
│   ├── SECClient               # API客户端（速率限制、缓存）
│   └── InsiderTradingAnalyzer  # Form 4分析器
│
├── institutional_analyzer.py   # Form 13F分析器
│   └── InstitutionalHoldingsAnalyzer
│
├── sec_signal_engine.py        # 综合评分引擎
│   ├── Form13DAnalyzer         # Form 13D/13G分析器
│   └── SECSignalEngine         # 主引擎（整合三个维度）
│
├── sec_signal_methodology.md   # 本文档
│
└── 输出文件/
    ├── sec_combined_signals.csv
    ├── insider_trading_signals.csv
    ├── institutional_holdings.csv
    └── sec_cache/              # 缓存目录
```

---

**版本历史**：
- v1.0 (2026-01-25): 初始版本，支持Form 4/13F/13D基础分析

**已知问题**：
1. 13F解析目前为简化版本，需要完整XML解析
2. 未处理期权、衍生品交易
3. 未考虑Stock Split调整

**下一步计划**：
- [ ] 完整的13F XML解析
- [ ] 历史数据回测验证
- [ ] 实时监控（检测到新Form 4立即分析）
- [ ] 与财务数据（PE/PB）整合
