# Agent 7 排除规则执行器 - 配置说明

## 环境要求

### 1. Python依赖
```bash
pip install pandas numpy requests
```

### 2. API Key配置

需要Financial Modeling Prep (FMP) API Key：

**方法1: 环境变量（推荐）**
```bash
export FMP_API_KEY='your_actual_api_key_here'
```

**方法2: 直接修改脚本**
编辑 `agent7_exclusion_executor.py` 第12行：
```python
FMP_API_KEY = "your_actual_api_key_here"
```

### 3. 获取FMP API Key

1. 访问 https://financialmodelingprep.com/developer/docs/
2. 注册账户
3. 免费版限额: 250 requests/day
4. 付费版建议: $14/月 (300 requests/minute)

## 使用方法

### 基本用法

```bash
cd /Users/milton/投资大师/Top20_Screener/scripts
python agent7_exclusion_executor.py
```

### 输入要求

脚本需要初始股票池文件：
- 路径: `Top20_Screener/data/initial_stock_pool.csv`
- 必需列:
  - `Ticker` 或 `ticker` 或 `Symbol`
  - `Company` 或 `company` 或 `companyName`

示例CSV格式:
```csv
Ticker,Company
AAPL,Apple Inc
TSLA,Tesla Inc
MSFT,Microsoft Corp
```

### 输出文件

执行完成后生成以下文件：

#### 1. 核心输出
- `exclusions/excluded_companies.csv` - 所有被排除的公司
- `data/passed_companies.csv` - 通过所有规则的公司 ✅

#### 2. 详细分类
- `exclusions/biotech_screen.csv` - 生物制药筛查详情
- `exclusions/data_quality_report.csv` - 数据质量问题汇总
- `exclusions/financial_risk_screen.csv` - Z-Score、债务风险详情
- `exclusions/governance_alerts.csv` - SEC调查、内部人抛售详情

#### 3. 总结报告
- `exclusions/exclusion_summary.md` - 完整的排除统计和分析

## 排除规则清单

### 1. 行业排除
- 生物制药/临床试验主导公司
- SPAC公司
- Penny Stocks (价格<$5 且 市值<$500M)
- Pre-Revenue公司
- 加密货币主导公司

### 2. 数据质量排除
- 缺失5年历史收入数据
- 缺失3年现金流数据
- 关键数据缺失>20%

### 3. 数据异常排除
- 收入暴增10倍+ (可能并购或错误)
- 净利润与OCF方向相反连续2年+
- 应收账款增速 > 收入增速×2
- 商誉 > 总资产50%

### 4. 财务风险排除
- Altman Z-Score < 1.8 (高破产风险)
- 短期债务 > 现金×2
- 利息覆盖率 < 1.5

### 5. 治理风险排除
- SEC调查公告
- 财务欺诈相关新闻
- 内部人大量抛售 (>$10M 且 卖出率>80%)

### 6. 流动性排除
- 日均交易额 < $5M

### 7. 特殊情况排除
- IPO < 2年 (历史数据不足)
- 中国ADR (审计风险)

## 性能优化

### API调用频率限制

脚本已内置0.3秒延迟，避免触发API限流：
```python
time.sleep(0.3)  # 每只股票之间延迟
```

### 批量处理建议

对于大规模股票池(>1000只):
1. 分批处理，每批300-500只
2. 使用付费API提高限额
3. 增加异常处理和重试机制

## 自定义排除规则

### 修改Z-Score阈值

编辑 `check_bankruptcy_risk` 函数:
```python
if z_score is not None and z_score < 1.8:  # 修改此阈值
```

### 修改流动性阈值

编辑 `check_liquidity_risk` 函数:
```python
if daily_dollar_volume < 5_000_000:  # 修改此阈值(美元)
```

### 添加新排除规则

在 `execute_exclusion_rules` 方法中添加：
```python
rules = [
    # ... 现有规则 ...
    ("your_rule_name", lambda: self.check_your_rule(ticker, profile)),
]
```

## 故障排除

### 问题1: API Key无效
```
错误: 请设置FMP API Key
```
解决: 检查API Key是否正确设置

### 问题2: 数据获取失败
```
检查 TICKER 的 rule_name 时出错: ...
```
解决:
- 检查网络连接
- 验证ticker符号正确
- 检查API限额是否用尽

### 问题3: 股票池文件不存在
```
警告: 股票池文件不存在
```
解决:
- 先运行Agent 1生成初始股票池
- 或手动创建CSV文件

## 测试模式

脚本会自动创建示例股票池进行测试：
- AAPL (Apple) - 应通过
- TSLA (Tesla) - 应通过
- MRNA (Moderna) - 可能被排除(生物制药)
- JNJ (Johnson & Johnson) - 应通过(成熟药企)
- COIN (Coinbase) - 可能被排除(近期IPO或加密)

## 监控执行进度

脚本会实时输出进度：
```
[1/100] 检查 AAPL - Apple Inc
[2/100] 检查 TSLA - Tesla Inc
...
```

## 结果验证

### 检查排除率合理性

典型排除率: 30-50%
- 过低(<20%): 规则可能太宽松
- 过高(>60%): 规则可能太严格

### 人工复核建议

重点复核：
1. Z-Score在1.8-2.5的边界案例
2. 刚好触发流动性阈值的公司
3. 数据异常但可能有合理解释的公司

---
更新时间: 2026-01-25
版本: v1.0
