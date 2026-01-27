# Agent 7: 排除规则执行器

**任务**: 执行硬性排除规则，确保Top 20池子纯净

---

## 快速开始

### 1. 安装依赖
```bash
pip install pandas numpy requests
```

### 2. 配置API Key
```bash
export FMP_API_KEY='your_fmp_api_key_here'
```

获取API Key: https://financialmodelingprep.com/developer/docs/

### 3. 运行测试
```bash
cd /Users/milton/投资大师/Top20_Screener/scripts

# 创建测试数据
python test_agent7.py

# 执行排除规则
python agent7_exclusion_executor.py
```

---

## 系统架构

```
Agent 7 排除规则执行器
│
├── 输入: initial_stock_pool.csv (股票池)
│
├── 处理流程:
│   ├── 1. 行业排除 (生物制药/SPAC/Penny Stock)
│   ├── 2. 数据质量排除 (缺失数据/异常数据)
│   ├── 3. 财务风险排除 (Z-Score/债务风险)
│   ├── 4. 治理风险排除 (SEC调查/内部人抛售)
│   ├── 5. 流动性排除 (交易量不足)
│   └── 6. 特殊情况排除 (IPO<2年/中国ADR)
│
└── 输出:
    ├── passed_companies.csv (通过筛选) ✅
    ├── excluded_companies.csv (被排除)
    ├── biotech_screen.csv (生物制药详情)
    ├── data_quality_report.csv (数据质量)
    ├── financial_risk_screen.csv (财务风险)
    ├── governance_alerts.csv (治理风险)
    └── exclusion_summary.md (总结报告)
```

---

## 排除规则详解

### 1. 行业排除

#### A. 生物制药/临床试验主导公司
**排除条件:**
- GICS Sector = Biotechnology
- 市值/收入 > 20x (赌未来管线)
- 收入 < $50M (早期公司)

**为什么排除:**
- 二元事件主导 (试验成功/失败)
- 风险调整收益模型失效
- 数据不透明

**例外:**
- 成熟药企 (辉瑞、强生) - 多个上市药物，收入多元化

#### B. 其他特殊情况
- SPAC (特殊目的收购公司)
- Penny Stocks (价格<$5 且 市值<$500M)
- Pre-Revenue公司 (零收入)
- 加密货币主导公司
- Meme股票 (基本面与估值严重脱节)

### 2. 数据质量排除

**必需数据:**
- 5年历史收入数据
- 5年历史净利润数据
- 3年现金流表 (OCF, FCF)
- 最近年度资产负债表
- 至少3年股价数据

**排除条件:**
- 关键数据缺失 > 20%
- 最近一年财报未披露
- 会计师意见为"保留意见"或"否定意见"

### 3. 数据异常排除

**异常信号:**
- 收入突然暴增10倍+ (可能并购或数据错误)
- 净利润与OCF方向相反连续2年+ (盈利质量存疑)
- 应收账款增速 > 收入增速×2 连续3年 (虚增收入)
- 商誉 > 总资产50% (并购频繁，资产虚高)

### 4. 财务风险排除

#### A. 破产风险 - Altman Z-Score
```
Z-Score公式 (制造业):
Z = 1.2×(营运资本/总资产) + 1.4×(留存收益/总资产) +
    3.3×(EBIT/总资产) + 0.6×(市值/总负债) +
    1.0×(收入/总资产)

排除: Z < 1.8 (高破产风险)
警告: Z 1.8-3.0 (灰色地带)
安全: Z > 3.0
```

#### B. 债务到期风险
- 未来12个月到期债务 > 现金×2
- 利息覆盖率 < 1.5
- 信用评级下调至Junk级 (BB+以下)

### 5. 治理与合规风险排除

**排除信号:**
- SEC调查公告
- 审计师辞职 (特别是"意见分歧"辞职)
- CFO/CEO频繁更换 (2年内换2次+)
- 集体诉讼 (证券欺诈类)
- 内部人大量抛售:
  - 最近6个月净卖出 > $10M
  - 卖出比率 > 80%
  - CEO/CFO同时大量抛售

### 6. 流动性风险排除

**排除条件:**
- 日均交易量 < $5M
- Bid-Ask Spread > 1%
- 流通股占比 < 30%

**理由:**
- 价值投资需要耐心建仓
- 流动性差导致冲击成本高

### 7. 特殊情况排除

#### A. 近期IPO
- 排除: 上市 < 2年 (历史数据不足计算Sharpe)
- 允许但降级: 上市 2-3年

#### B. 重大重组中
- 正在进行重大拆分/合并
- 出售核心业务 (>30%收入)
- 破产重组中

#### C. 中国ADR
- 排除: 中国公司ADR (审计标准差异)
- 例外: 在美国有实质运营
- 允许: 欧洲/日本优质ADR (如SAP, TSM)

---

## 输出文件说明

### 核心输出

#### 1. `data/passed_companies.csv` ✅
**通过所有排除规则的公司**

列:
- Ticker: 股票代码
- Company: 公司名称
- Excluded: False
- Reason: "通过所有排除规则"
- Details: ""
- Date: 日期

#### 2. `exclusions/excluded_companies.csv`
**所有被排除的公司**

列:
- Ticker: 股票代码
- Company: 公司名称
- Excluded: True
- Reason: 排除原因类别
- Details: 详细信息 (如具体数值)
- Date_Excluded: 排除日期

### 详细分类报告

#### 3. `exclusions/biotech_screen.csv`
生物制药筛查详情，包含:
- 市值/收入比率
- 收入规模
- 行业分类

#### 4. `exclusions/data_quality_report.csv`
数据质量问题汇总，包含:
- 缺失的具体数据项
- 数据缺失比例

#### 5. `exclusions/financial_risk_screen.csv`
财务风险详情，包含:
- Altman Z-Score值
- 债务到期结构
- 利息覆盖率

#### 6. `exclusions/governance_alerts.csv`
治理风险详情，包含:
- SEC调查信息
- 内部人交易详情
- 诉讼信息

### 总结报告

#### 7. `exclusions/exclusion_summary.md`
完整的排除统计和分析

内容:
- 基本统计 (各类排除数量)
- 排除率
- 排除原因分布
- 文件清单
- 生成时间

**示例输出:**
```markdown
## 基本统计

- 起始池: 3,245家公司
- 生物制药排除: 187家
- 数据质量排除: 423家
- 财务风险排除: 156家
- 治理风险排除: 34家
- 流动性排除: 289家
- IPO<2年排除: 198家
- 其他排除: 67家
- 通过筛选: 1,891家公司 ✅

排除率: 41.8%
```

---

## 使用示例

### 基本用法

```bash
cd /Users/milton/投资大师/Top20_Screener/scripts

# 确保有API Key
export FMP_API_KEY='your_key'

# 执行排除规则
python agent7_exclusion_executor.py
```

### 自定义股票池

```python
import pandas as pd

# 创建自定义股票池
stocks = pd.DataFrame({
    'Ticker': ['AAPL', 'TSLA', 'MSFT', ...],
    'Company': ['Apple Inc', 'Tesla Inc', 'Microsoft Corp', ...]
})

# 保存
stocks.to_csv('/Users/milton/投资大师/Top20_Screener/data/initial_stock_pool.csv', index=False)

# 运行排除规则
# python agent7_exclusion_executor.py
```

### 分析结果

```python
import pandas as pd

# 读取通过筛选的公司
passed = pd.read_csv('/Users/milton/投资大师/Top20_Screener/data/passed_companies.csv')
print(f"通过筛选: {len(passed)}家公司")

# 读取被排除的公司
excluded = pd.read_csv('/Users/milton/投资大师/Top20_Screener/exclusions/excluded_companies.csv')

# 按排除原因统计
print(excluded['Reason'].value_counts())

# 查看Z-Score详情
financial_risk = pd.read_csv('/Users/milton/投资大师/Top20_Screener/exclusions/financial_risk_screen.csv')
print(financial_risk[['Ticker', 'Details']])
```

---

## 性能与限制

### API调用频率

**免费版FMP API:**
- 限制: 250 requests/day
- 估算: 可处理约60-80只股票/天
  - 每只股票约需3-4个API调用

**付费版FMP API ($14/月):**
- 限制: 300 requests/minute
- 估算: 可处理约4,500只股票/小时

### 脚本内置延迟

```python
time.sleep(0.3)  # 每只股票之间延迟0.3秒
```

这确保:
- 不触发API限流
- 每分钟约处理200只股票 (付费版)

### 批量处理建议

对于大规模股票池 (>1000只):

1. **分批处理**
```python
# 修改 process_stock_pool 函数
stocks_batch = stocks.iloc[0:500]  # 处理前500只
```

2. **断点续传**
```python
# 保存进度，失败后从断点继续
checkpoint_file = 'processing_checkpoint.json'
```

3. **并行处理** (需要多个API Key)
```python
from multiprocessing import Pool
# 多进程处理不同批次
```

---

## 自定义与扩展

### 修改排除阈值

#### 1. Z-Score阈值
```python
# 在 check_bankruptcy_risk 函数中
if z_score is not None and z_score < 1.8:  # 修改为1.5或2.0
```

#### 2. 流动性阈值
```python
# 在 check_liquidity_risk 函数中
if daily_dollar_volume < 5_000_000:  # 修改为3M或10M
```

#### 3. 内部人抛售阈值
```python
# 在 check_insider_selling 函数中
if sales > 10_000_000 and sell_ratio > 0.8:  # 修改数值
```

### 添加新排除规则

#### 示例: 添加"高Short Interest"排除

```python
def check_high_short_interest(self, ticker: str) -> Tuple[bool, str]:
    """检查做空比例过高"""
    try:
        # 获取做空数据
        url = f"https://financialmodelingprep.com/api/v3/key-metrics/{ticker}?apikey={self.api_key}"
        response = requests.get(url, timeout=10)
        data = response.json()

        if data and len(data) > 0:
            short_percent = data[0].get('shortPercentFloat', 0)

            # 排除做空比例>30%的股票
            if short_percent > 30:
                return True, f"做空比例过高 ({short_percent:.1f}% of float)"

    except:
        pass

    return False, ""

# 在 execute_exclusion_rules 中添加
rules = [
    # ... 现有规则 ...
    ("high_short_interest", lambda: self.check_high_short_interest(ticker)),
]
```

### 自定义输出格式

#### 导出为Excel
```python
# 在 generate_exclusion_reports 函数中添加
with pd.ExcelWriter(os.path.join(EXCLUSIONS_DIR, "exclusion_results.xlsx")) as writer:
    excluded_df.to_excel(writer, sheet_name='Excluded', index=False)
    passed_df.to_excel(writer, sheet_name='Passed', index=False)
```

#### 生成可视化报告
```python
import matplotlib.pyplot as plt

# 排除原因饼图
reason_counts = excluded_df['Reason'].value_counts()
plt.pie(reason_counts.values, labels=reason_counts.index, autopct='%1.1f%%')
plt.savefig(os.path.join(EXCLUSIONS_DIR, 'exclusion_reasons.png'))
```

---

## 故障排除

### 问题1: API Key错误
```
错误: 请设置FMP API Key
```

**解决:**
```bash
# 检查环境变量
echo $FMP_API_KEY

# 重新设置
export FMP_API_KEY='your_actual_key'

# 或在脚本中直接修改
# FMP_API_KEY = "your_actual_key"
```

### 问题2: 数据获取失败
```
检查 AAPL 的 data_quality 时出错: HTTPError
```

**原因:**
- 网络问题
- API限额用尽
- Ticker符号错误

**解决:**
```bash
# 检查API限额
curl "https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=YOUR_KEY"

# 检查网络
ping financialmodelingprep.com

# 验证ticker
# 使用正确的符号 (如 BRK.B 而非 BRKB)
```

### 问题3: Z-Score计算异常
```
Altman Z-Score计算返回None
```

**原因:**
- 资产负债表数据缺失
- 总资产为0或负数

**解决:**
- 检查数据完整性
- 查看原始API响应
- 跳过该公司 (会被data_quality规则排除)

### 问题4: 内存不足
```
MemoryError when processing large stock pool
```

**解决:**
```python
# 分批处理
batch_size = 100
for i in range(0, len(stocks), batch_size):
    batch = stocks.iloc[i:i+batch_size]
    executor.process_stock_pool(batch)
```

---

## 质量保证

### 人工复核建议

**必须复核的情况:**

1. **边界案例**
   - Z-Score在1.7-2.0之间
   - 流动性刚好低于阈值
   - 内部人抛售接近阈值

2. **知名公司被排除**
   - 大盘蓝筹股被排除 → 检查数据是否异常
   - 行业龙头被排除 → 验证排除原因

3. **排除率异常**
   - 排除率 < 20% → 规则可能太宽松
   - 排除率 > 60% → 规则可能太严格

### 验证检查清单

- [ ] API Key正确配置
- [ ] 股票池文件格式正确
- [ ] 所有输出文件生成
- [ ] 排除率在合理范围 (30-50%)
- [ ] summary.md内容完整
- [ ] 边界案例已人工复核
- [ ] 知名公司排除原因合理
- [ ] 通过筛选的公司质量高

---

## 下一步

执行完Agent 7后，`data/passed_companies.csv`中的公司将进入:

1. **Agent 2**: 宏观敏感度分析
2. **Agent 3**: 护城河评分
3. **Agent 4**: 价值vs质量分类
4. **Agent 5**: 风险调整收益计算 (Sharpe Ratio)
5. **Agent 6**: 最终排序与Top 20选择

---

## 文件清单

```
Top20_Screener/
├── scripts/
│   ├── agent7_exclusion_executor.py  # 主执行脚本 ⭐
│   ├── agent7_config.md              # 配置说明
│   └── test_agent7.py                # 测试脚本
│
├── data/
│   ├── initial_stock_pool.csv        # 输入: 初始股票池
│   └── passed_companies.csv          # 输出: 通过筛选 ✅
│
├── exclusions/
│   ├── excluded_companies.csv        # 所有被排除公司
│   ├── biotech_screen.csv            # 生物制药详情
│   ├── data_quality_report.csv       # 数据质量问题
│   ├── financial_risk_screen.csv     # 财务风险详情
│   ├── governance_alerts.csv         # 治理风险详情
│   └── exclusion_summary.md          # 总结报告
│
└── AGENT7_README.md                  # 本文档
```

---

**版本**: v1.0
**创建日期**: 2026-01-25
**作者**: Agent 7 - 排除规则执行器

**联系**: 如有问题或建议，请查看配置文档或测试脚本
