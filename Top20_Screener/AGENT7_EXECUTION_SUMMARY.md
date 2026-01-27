# Agent 7 排除规则执行器 - 完整执行摘要

**创建日期**: 2026-01-25
**Agent**: 排除规则执行器 (Agent 7)
**任务**: 执行硬性排除规则，确保Top 20池子纯净

---

## 执行状态

### ✅ 已完成项目

1. **核心执行器脚本** (`agent7_exclusion_executor.py`)
   - 完整的排除规则引擎
   - 11大类排除规则
   - API集成 (Financial Modeling Prep)
   - 自动化处理流程
   - 详细日志记录

2. **配置系统**
   - JSON配置文件 (`exclusion_rules_config.json`)
   - 所有阈值可自定义
   - 规则可开关
   - 版本控制

3. **测试框架**
   - 测试脚本 (`test_agent7.py`)
   - 9只样本股票
   - 期望结果验证
   - 自动化测试流程

4. **可视化工具** (`visualize_results.py`)
   - ASCII图表生成
   - 排除模式分析
   - 质量评估报告
   - 重点公司识别

5. **文档体系**
   - 完整README (`AGENT7_README.md`)
   - 快速入门指南 (`QUICKSTART.md`)
   - 配置说明 (`agent7_config.md`)
   - 本执行摘要

---

## 系统架构

### 输入
- `data/initial_stock_pool.csv`
  - 格式: Ticker, Company
  - 来源: Agent 1 或手动创建
  - 当前测试池: 9只股票

### 处理流程

```
股票池 → 排除规则执行器 → 分类输出
                ↓
        11大类排除规则
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
通过筛选              被排除
(passed)            (excluded)
    ↓                       ↓
下一步分析          详细分类报告
```

### 11大类排除规则

| # | 规则类别 | 子规则数 | 默认阈值 |
|---|---------|---------|---------|
| 1 | 行业排除 | 4 | 市值/收入>20x, 收入<$50M |
| 2 | 数据质量 | 3 | 缺失>20% |
| 3 | 数据异常 | 4 | 收入暴增>10x |
| 4 | 破产风险 | 1 | Z-Score<1.8 |
| 5 | 债务风险 | 2 | 利息覆盖率<1.5 |
| 6 | 治理风险 | 1 | SEC调查 |
| 7 | 内部人抛售 | 1 | 净卖出>$10M |
| 8 | 流动性 | 1 | 交易额<$5M/天 |
| 9 | 近期IPO | 1 | 上市<2年 |
| 10 | 重组 | 1 | 重大重组中 |
| 11 | 中国ADR | 1 | 审计风险 |

### 输出文件

#### 核心输出
1. `data/passed_companies.csv` - **通过筛选** ✅
2. `exclusions/excluded_companies.csv` - 所有被排除

#### 详细分类
3. `exclusions/biotech_screen.csv` - 生物制药详情
4. `exclusions/data_quality_report.csv` - 数据质量
5. `exclusions/financial_risk_screen.csv` - 财务风险
6. `exclusions/governance_alerts.csv` - 治理风险

#### 报告
7. `exclusions/exclusion_summary.md` - Markdown总结
8. `exclusions/visual_analysis.txt` - 可视化分析
9. `exclusions/summary_metrics.csv` - 指标汇总

---

## 排除规则详细说明

### 1. 行业排除

#### A. 生物制药/临床试验主导
```python
排除条件:
✓ 市值/收入 > 20x (赌未来管线)
✓ 收入 < $50M (早期公司)
✓ GICS Sector = Biotechnology

为什么:
- 二元事件主导 (试验成功/失败)
- 风险模型失效
- 数据不透明

例外:
- 成熟药企 (辉瑞、强生)
```

#### B. 其他特殊情况
- SPAC: 名称包含"Acquisition Corp"
- Penny Stock: 价格<$5 且 市值<$500M
- Pre-Revenue: TTM收入=0
- 加密主导: 业务描述包含"cryptocurrency"

### 2. 数据质量排除

```python
必需数据:
✓ 5年历史收入
✓ 3年现金流表
✓ 1年资产负债表
✓ 3年股价数据

排除: 缺失>20%
```

### 3. 数据异常排除

```python
异常信号:
✓ 收入暴增10x+ (并购/错误)
✓ 净利润与OCF方向相反2年+
✓ 应收增速 > 收入增速×2
✓ 商誉 > 总资产50%
```

### 4. 破产风险 - Altman Z-Score

```
公式:
Z = 1.2×(WC/TA) + 1.4×(RE/TA) + 3.3×(EBIT/TA) +
    0.6×(MV/TL) + 1.0×(Sales/TA)

WC = 营运资本, TA = 总资产
RE = 留存收益, EBIT = 息税前利润
MV = 市值, TL = 总负债

判定:
Z < 1.8  → 高风险 ✗
1.8-3.0  → 灰色地带 ⚠️
Z > 3.0  → 安全 ✓
```

### 5. 债务风险

```python
检查项:
✓ 短期债务 > 现金×2
✓ 利息覆盖率 < 1.5
✓ 信用评级 < BB+

公式:
利息覆盖率 = EBIT / 利息费用
```

### 6. 治理风险

```python
排除信号:
✓ SEC调查公告
✓ 审计师辞职 (意见分歧)
✓ CFO/CEO频繁更换
✓ 集体诉讼 (证券欺诈)

数据源:
- SEC EDGAR
- Bloomberg Law
- FMP News API
```

### 7. 内部人抛售

```python
排除条件:
✓ 6个月净卖出 > $10M
✓ 卖出率 > 80%
✓ CEO/CFO同时抛售

允许:
- 税务筹划抛售
- 股权激励行权后规律抛售
```

### 8. 流动性风险

```python
排除条件:
✓ 日均交易额 < $5M
✓ Bid-Ask Spread > 1%
✓ 流通股 < 30%

理由:
- 冲击成本高
- 难以建仓/平仓
```

### 9. 近期IPO

```python
排除: 上市 < 2年
理由: 历史数据不足计算Sharpe Ratio

允许: 上市 2-3年 (降级处理)
```

### 10. 中国ADR

```python
排除: 中国公司ADR
原因: 审计标准差异

例外:
- 在美有实质运营
- 欧洲/日本ADR (SAP, TSM)
```

---

## 当前测试状态

### 测试股票池 (9只)

| # | Ticker | Company | 预期结果 | 预期原因 |
|---|--------|---------|---------|---------|
| 1 | AAPL | Apple Inc | ✓ PASS | 优质蓝筹 |
| 2 | MSFT | Microsoft Corp | ✓ PASS | 优质蓝筹 |
| 3 | JNJ | Johnson & Johnson | ✓ PASS | 成熟药企 |
| 4 | JPM | JPMorgan Chase | ✓ PASS | 优质金融 |
| 5 | MRNA | Moderna Inc | ✗ EXCLUDE | 生物制药 |
| 6 | COIN | Coinbase | ✗ EXCLUDE | 近期IPO/加密 |
| 7 | BKKT | Bakkt Holdings | ✗ EXCLUDE | 加密/SPAC |
| 8 | TSLA | Tesla Inc | ? BORDERLINE | 高估值大盘 |
| 9 | GME | GameStop Corp | ? BORDERLINE | Meme股 |

### 执行要求

```bash
# 步骤1: 配置API Key
export FMP_API_KEY='your_api_key_here'

# 步骤2: 执行测试
cd /Users/milton/投资大师/Top20_Screener/scripts
python3 agent7_exclusion_executor.py

# 步骤3: 查看结果
python3 visualize_results.py
```

---

## 性能指标

### API使用

**免费版 (250 requests/day):**
- 每只股票: 3-4个请求
- 可处理: 60-80只/天
- 速度: 约1-2秒/只 (含延迟)

**付费版 ($14/月, 300 req/min):**
- 可处理: 4,500只/小时
- 速度: 约0.5秒/只

### 脚本性能

```python
内置延迟: 0.3秒/只
超时设置: 10秒/请求
重试次数: 3次

估算时间:
- 10只股票:   约30秒
- 100只股票:  约3分钟
- 1000只股票: 约30分钟
```

---

## 质量保证

### 预期排除率

```
正常范围: 30-50%

< 20%: ⚠️ 规则太宽松
30-50%: ✓ 正常
> 60%: ⚠️ 规则太严格或股票池质量差
```

### 人工复核清单

- [ ] Z-Score 1.7-2.0 边界案例
- [ ] 流动性刚好低于阈值
- [ ] 内部人抛售接近阈值
- [ ] 知名公司被排除 (验证原因)
- [ ] 排除率异常 (<20% 或 >60%)

### 数据验证

```python
数据信度分层:
Tier 1: 财报、SEC → 直接引用 ✅
Tier 2: 机构报告 → 交叉验证后可用
Tier 3: 媒体/社交 → 仅参考 ⚠️
```

---

## 自定义配置

### 修改阈值

**文件**: `exclusion_rules_config.json`

```json
{
  "financial_risk": {
    "altman_z_score": {
      "thresholds": {
        "danger_zone": 1.8  // 修改此值
      }
    }
  },
  "liquidity_risk": {
    "rules": {
      "min_daily_dollar_volume": 5000000  // 修改此值
    }
  }
}
```

### 禁用规则

```json
{
  "special_situations": {
    "chinese_adr": {
      "enabled": false  // 禁用中国ADR排除
    }
  }
}
```

### 添加自定义规则

```python
# 在 execute_exclusion_rules 中添加
rules = [
    # ... 现有规则 ...
    ("your_custom_rule", lambda: self.check_custom(ticker)),
]

# 实现检查函数
def check_custom(self, ticker: str) -> Tuple[bool, str]:
    # 你的逻辑
    return False, ""  # 不排除
```

---

## 故障排除

### 常见问题

| 问题 | 症状 | 解决方案 |
|------|------|---------|
| API Key错误 | "请设置FMP API Key" | `export FMP_API_KEY='key'` |
| 数据获取失败 | HTTPError | 检查网络/限额/ticker |
| Z-Score返回None | 计算异常 | 数据缺失，会被data_quality排除 |
| 内存不足 | MemoryError | 分批处理 |
| 速度慢 | 处理时间长 | 减少延迟或使用付费API |

### 调试命令

```bash
# 查看详细日志
python3 agent7_exclusion_executor.py 2>&1 | tee debug.log

# 测试单个ticker
python3 -c "
from agent7_exclusion_executor import ExclusionExecutor
executor = ExclusionExecutor('your_key')
result = executor.execute_exclusion_rules('AAPL', 'Apple Inc')
print(result)
"

# 验证API Key
curl "https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=YOUR_KEY"
```

---

## 下一步计划

### 立即执行 (需要API Key)

```bash
cd /Users/milton/投资大师/Top20_Screener/scripts

# 1. 设置API Key
export FMP_API_KEY='your_actual_key'

# 2. 运行测试 (9只股票)
python3 agent7_exclusion_executor.py

# 3. 查看可视化结果
python3 visualize_results.py

# 4. 检查输出文件
ls -lh ../data/passed_companies.csv
ls -lh ../exclusions/excluded_companies.csv
cat ../exclusions/exclusion_summary.md
```

### 后续Agent流程

**Agent 7完成后 → `passed_companies.csv`进入:**

1. **Agent 2**: 宏观敏感度分析
   - 识别3个关键宏观变量
   - 评估传导路径
   - 计算β值

2. **Agent 3**: 护城河评分
   - 5维度评分
   - 总分0-10
   - 识别护城河类型

3. **Agent 4**: 价值vs质量分类
   - 深度价值 vs 质量成长
   - 2×2矩阵分类

4. **Agent 5**: 风险调整收益
   - 计算Sharpe Ratio
   - 超额收益分析

5. **Agent 6**: Top 20最终排序
   - 综合评分
   - 加权排序
   - 生成最终名单

---

## 交付清单

### ✅ 代码文件

- [x] `scripts/agent7_exclusion_executor.py` (主执行器)
- [x] `scripts/test_agent7.py` (测试脚本)
- [x] `scripts/visualize_results.py` (可视化工具)
- [x] `scripts/exclusion_rules_config.json` (配置文件)

### ✅ 文档文件

- [x] `AGENT7_README.md` (完整文档, 7000+字)
- [x] `QUICKSTART.md` (快速入门)
- [x] `scripts/agent7_config.md` (配置说明)
- [x] `AGENT7_EXECUTION_SUMMARY.md` (本文档)

### ✅ 测试数据

- [x] `data/initial_stock_pool.csv` (9只测试股票)

### 📋 待执行 (需要API Key)

- [ ] 实际运行排除规则
- [ ] 生成输出文件
- [ ] 验证结果准确性
- [ ] 人工复核边界案例

---

## 核心价值

### 系统优势

1. **全面性**: 11大类排除规则覆盖所有主要风险
2. **可配置**: 所有阈值可自定义
3. **可审计**: 详细日志和排除原因
4. **自动化**: 一键处理整个股票池
5. **可扩展**: 易于添加新规则

### 投资价值

```
排除低质量公司 → 提高后续分析效率
识别真实风险 → 避免价值陷阱
数据驱动决策 → 减少主观偏见
系统化流程 → 可复制、可扩展
```

### 与v6.0框架一致性

```
✓ 深度穿透: 不仅看表象，检查Z-Score等机制指标
✓ 数据纪律: 强制数据质量和来源验证
✓ 反常识: 识别认知陷阱 (如Meme股、生物制药)
✓ 可证伪: 每个排除都有明确数据支撑
✓ 颗粒度: 单位经济学级别检查 (如利息覆盖率)
```

---

## 技术规格

### 依赖

```
Python 3.x
├── pandas >= 1.0.0
├── numpy >= 1.18.0
└── requests >= 2.22.0
```

### API集成

```
Financial Modeling Prep API
├── Profile (公司信息)
├── Financial Statements (财报)
├── Insider Trading (Form 4)
├── Stock Price History (历史价格)
└── News (新闻/治理风险)
```

### 数据流

```
FMP API → 本地处理 → 分类存储
    ↓
  缓存/延迟机制
    ↓
  避免限流/重复请求
```

---

## 项目结构

```
Top20_Screener/
│
├── scripts/                       # 脚本目录
│   ├── agent7_exclusion_executor.py   # 主执行器 ⭐
│   ├── test_agent7.py                 # 测试脚本
│   ├── visualize_results.py           # 可视化工具
│   ├── agent7_config.md               # 配置说明
│   └── exclusion_rules_config.json    # 配置文件
│
├── data/                          # 数据目录
│   ├── initial_stock_pool.csv         # 输入 ⬇️
│   └── passed_companies.csv           # 输出 ⬆️ ✅
│
├── exclusions/                    # 排除详情目录
│   ├── excluded_companies.csv         # 所有被排除
│   ├── biotech_screen.csv             # 生物制药详情
│   ├── data_quality_report.csv        # 数据质量
│   ├── financial_risk_screen.csv      # 财务风险
│   ├── governance_alerts.csv          # 治理风险
│   ├── exclusion_summary.md           # Markdown总结
│   ├── visual_analysis.txt            # 可视化分析
│   └── summary_metrics.csv            # 指标汇总
│
├── AGENT7_README.md               # 完整文档 📖
├── QUICKSTART.md                  # 快速入门 🚀
└── AGENT7_EXECUTION_SUMMARY.md    # 本文档 📋
```

---

## 版本信息

**当前版本**: v1.0
**发布日期**: 2026-01-25
**Agent**: Agent 7 - 排除规则执行器
**框架版本**: 投资研究 Agent v6.0

---

## 联系与支持

### 文档
- 完整文档: `AGENT7_README.md`
- 快速入门: `QUICKSTART.md`
- 配置说明: `scripts/agent7_config.md`

### 测试
- 测试脚本: `scripts/test_agent7.py`
- 样本数据: `data/initial_stock_pool.csv`

### 工具
- 主执行器: `scripts/agent7_exclusion_executor.py`
- 可视化: `scripts/visualize_results.py`

---

**END OF EXECUTION SUMMARY**

---

**备注**:
- 系统已完全构建并测试就绪
- 需要配置FMP API Key后即可实际运行
- 所有文档和脚本已交付
- 遵循v6.0投资研究框架规范
