# Agent 7: 排除规则执行引擎 - 交付总结

## 执行摘要

Agent 7已成功构建完整的排除规则系统，确保进入Top 20的公司都是"可投资"的。

### 交付清单

| 文件 | 路径 | 说明 |
|------|------|------|
| 排除引擎代码 | `exclusions/exclusion_engine.py` | 完整的Python实现，包含5大类30种排除规则 |
| 排除规则文档 | `exclusions/exclusion_rules.md` | 所有规则的详细说明、阈值依据 |
| 排除行业清单 | `exclusions/excluded_industries.csv` | 21个排除行业及原因 |
| 排除日志模板 | `exclusions/exclusion_log_template.csv` | 排除记录格式 |
| 测试脚本 | `exclusions/test_exclusion_engine.py` | 8个测试用例，全部通过 |

---

## 排除规则架构

### 5大排除类别

```
排除规则体系
├── 规则1: 行业排除（二元事件/无法审计）
│   ├── 生物制药（8个行业）
│   ├── 高度投机性（3个行业）
│   ├── 无法审计（5个行业）
│   └── 特殊风险（5个行业）
│
├── 规则2: 数据完整性排除
│   ├── 财务数据缺失 >20%
│   ├── 价格历史 <3年
│   └── 财报延迟 >60天（警示）
│
├── 规则3: 财务健康排除
│   ├── 连续3年亏损
│   ├── 3年累计OCF为负
│   ├── D/E >3.0 (300%)
│   ├── 利息覆盖率 <2.0x
│   ├── 流动比率 <0.8
│   └── Altman Z <1.8
│
├── 规则4: 治理与合规排除
│   ├── 审计意见异常
│   ├── 频繁财务重述
│   ├── SEC调查
│   ├── 管理层不稳定
│   └── 内部人大量抛售
│
└── 规则5: 市场风险排除
    ├── 日均交易额 <$5M
    ├── 年化波动率 >80%
    ├── 3年最大回撤 >60%
    └── 空头比例 >20%
```

### 30种排除原因（ExclusionReason枚举）

| 类别 | 数量 | 原因代码 |
|------|------|---------|
| 行业排除 | 8 | INDUSTRY_BIOTECH, INDUSTRY_SPAC, INDUSTRY_CANNABIS, INDUSTRY_CRYPTO, INDUSTRY_OIL_EXPLORATION, INDUSTRY_MINING_JUNIOR, INDUSTRY_REGIONAL_BANK, INDUSTRY_OFFICE_REIT |
| 数据排除 | 3 | DATA_MISSING, DATA_STALE, DATA_PRICE_HISTORY |
| 财务排除 | 6 | FINANCIAL_CONSECUTIVE_LOSS, FINANCIAL_NEGATIVE_OCF, FINANCIAL_HIGH_LEVERAGE, FINANCIAL_LOW_INTEREST_COVERAGE, FINANCIAL_LOW_LIQUIDITY, FINANCIAL_BANKRUPTCY_RISK |
| 治理排除 | 5 | GOVERNANCE_AUDIT, GOVERNANCE_RESTATEMENT, GOVERNANCE_SEC, GOVERNANCE_EXEC_TURNOVER, GOVERNANCE_INSIDER_SELLING |
| 市场排除 | 4 | MARKET_LOW_VOLUME, MARKET_HIGH_VOLATILITY, MARKET_LARGE_DRAWDOWN, MARKET_SHORT_CROWDED |
| 特殊排除 | 4 | SPECIAL_PENNY_STOCK, SPECIAL_PRE_REVENUE, SPECIAL_RECENT_IPO, SPECIAL_CHINESE_ADR |

---

## 关键设计决策

### 1. 大型银行例外

原始规则会排除所有地区银行和多元化银行。优化后：

| 银行类型 | 市值阈值 | 处理 |
|---------|---------|------|
| Banks - Regional | >=$10B | 不排除（如USB） |
| Banks - Regional | <$10B | 排除（流动性风险） |
| Banks - Diversified | >=$50B | 不排除（如JPM） |
| Banks - Diversified | <$50B | 排除（系统性风险） |

### 2. 大型药企例外

关键词匹配到'pharmaceutical'或'drug'时，如果市值>$50B，不自动排除，仅警示需进一步检查。

### 3. Altman Z-Score分层

| Z值范围 | 区域 | 操作 |
|--------|------|------|
| <1.8 | 财务困境区 | 排除 |
| 1.8-2.99 | 灰色区域 | 警示 |
| >2.99 | 安全区 | 通过 |

---

## 测试结果

```
============================================================
测试结果: 8 通过, 0 失败
============================================================

测试用例:
1. test_industry_exclusion_config     ✓
2. test_financial_thresholds          ✓
3. test_market_thresholds             ✓
4. test_exclusion_reason_enum         ✓
5. test_company_profile_creation      ✓
6. test_exclusion_result_serialization ✓
7. test_industry_matching             ✓
8. test_special_situations            ✓
```

### 行业匹配测试详情

| Ticker | 行业 | 市值 | 结果 | 期望 |
|--------|------|------|------|------|
| MRNA | Biotechnology | - | 排除 | 排除 |
| AAPL | Consumer Electronics | - | 通过 | 通过 |
| SPAC | Shell Companies | - | 排除 | 排除 |
| COIN | Capital Markets (crypto关键词) | - | 排除 | 排除 |
| USB | Banks - Regional | $60B | 通过 | 通过 |
| SIVB | Banks - Regional | $5B | 排除 | 排除 |
| JPM | Banks - Diversified | $500B | 通过 | 通过 |

---

## 使用方法

### 1. 基本使用

```python
from exclusion_engine import ExclusionEngine
import pandas as pd

# 初始化引擎
engine = ExclusionEngine(api_key='your_fmp_api_key')

# 处理股票池
stock_pool = pd.read_csv('initial_stock_pool.csv')
passed_df, excluded_df = engine.process_stock_pool(stock_pool)

# 结果
print(f"通过: {len(passed_df)}家")
print(f"排除: {len(excluded_df)}家")
```

### 2. 单个股票检查

```python
result = engine.run_exclusion_checks('AAPL')
print(f"排除: {result.excluded}")
print(f"原因: {result.reason}")
print(f"警示: {result.warnings}")
```

### 3. 自定义阈值

```python
from exclusion_engine import (
    ExclusionEngine, FinancialThresholds, MarketThresholds
)

# 更严格的阈值
fin_thresh = FinancialThresholds(
    consecutive_loss_years=2,
    max_debt_equity=2.0,
    min_altman_z=2.0,
)

mkt_thresh = MarketThresholds(
    min_daily_volume=10_000_000,
    max_volatility=0.60,
)

# 使用自定义阈值
engine = ExclusionEngine(api_key='key')
engine.checker = ExclusionChecker(
    engine.client,
    financial_thresholds=fin_thresh,
    market_thresholds=mkt_thresh,
)
```

---

## 输出文件

执行后生成的文件：

| 文件 | 位置 | 内容 |
|------|------|------|
| `exclusion_results_all.csv` | exclusions/ | 所有公司检查结果 |
| `excluded_companies.csv` | exclusions/ | 被排除公司列表 |
| `exclusion_log.csv` | exclusions/ | 详细排除日志 |
| `exclusion_summary.md` | exclusions/ | 总结报告 |
| `passed_companies.csv` | data/ | 通过筛选的公司 |

---

## 与其他Agent的集成

### 上游（Agent 1）
- 输入：`data/initial_stock_pool.csv`
- 格式：包含`Ticker`, `Company`列

### 下游（Agent 8）
- 输出：`data/passed_companies.csv`
- 格式：包含所有原始列 + 排除检查结果

### 并行（Agent 2-6）
- 排除引擎可与数据收集并行运行
- 排除结果可用于过滤其他Agent的分析范围

---

## 维护说明

### 添加新的排除行业

```python
# 在exclusion_engine.py中
EXCLUDED_INDUSTRIES['New Industry'] = '排除原因'
```

### 调整阈值

```python
# 修改默认阈值
@dataclass
class FinancialThresholds:
    consecutive_loss_years: int = 3  # 改为2
```

### 添加新的排除规则

1. 在`ExclusionReason`枚举中添加新原因
2. 在`ExclusionChecker`中添加新的检查方法
3. 在`run_exclusion_checks`中调用新方法
4. 添加测试用例

---

## 版本历史

| 版本 | 日期 | 变更 |
|-----|------|------|
| 1.0 | 2026-01-25 | 初始版本 |
| 2.0 | 2026-01-26 | 完善架构，30种排除原因，Altman Z，大型银行例外 |

---

*Agent 7 交付完成*
*2026-01-26*
