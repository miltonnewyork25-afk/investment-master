# 投资分析Context管理策略 v1.0

> 基于Clawdbot的三层Context管理策略

---

## 概述

Context Window是LLM的核心资源，需要精细管理。本文档定义投资分析场景下的Context管理策略。

**核心挑战**：
- 投资分析需要大量数据（财务报表、分析师观点、历史分析）
- Context有限（200K tokens），但需要深度推理空间
- 历史分析积累会不断增长

**解决方案**：三层策略 + 优先级规则 + 预算分配

---

## 三层管理策略

### 类比Clawdbot的三层策略

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Context管理三层策略                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Layer 1: Pruning（修剪）                                        │       │
│  │  移除不需要的详细内容，保留关键信息                               │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Layer 2: Compaction（压缩）                                     │       │
│  │  将长内容压缩为摘要，持久化到文件                                 │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │  Layer 3: Memory Flush（记忆刷新）                                │       │
│  │  重要洞见写入长期记忆，跨session可用                              │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Pruning（修剪）

**目的**：移除当前分析不需要的详细内容

**执行时机**：Context组装阶段（Phase 2）

**修剪规则**：

| 内容类型 | 修剪策略 | 保留内容 |
|---------|---------|---------|
| 旧分析的原始数据 | 移除详细数据 | 关键指标、结论 |
| API返回的完整JSON | 提取关键字段 | 需要的指标 |
| 历史报告全文 | 不加载全文 | 摘要版本 |
| 无关行业框架 | 完全不加载 | - |

**示例**：

```yaml
# 原始（未修剪）
api_response:
  profile:
    symbol: "LRCX"
    price: 85.23
    beta: 1.45
    volAvg: 2341234
    mktCap: 112000000000
    lastDiv: 2.30
    range: "65.12 - 95.43"
    changes: 1.23
    companyName: "Lam Research Corporation"
    currency: "USD"
    cik: "0000707549"
    isin: "US5128071082"
    cusip: "512807108"
    exchange: "NASDAQ"
    exchangeShortName: "NASDAQ"
    industry: "Semiconductor Equipment & Materials"
    website: "https://www.lamresearch.com"
    description: "Lam Research Corporation designs..."  # 500字描述
    ceo: "Timothy M. Archer"
    sector: "Technology"
    country: "US"
    fullTimeEmployees: 17600
    phone: "510-572-0200"
    address: "4650 Cushing Parkway"
    city: "Fremont"
    state: "CA"
    zip: "94538"
    dcfDiff: 12.45
    dcf: 97.68
    image: "..."
    ipoDate: "1984-05-17"
    defaultImage: false
    isEtf: false
    isActivelyTrading: true
    # ... 更多字段

# 修剪后
api_response_pruned:
  profile:
    symbol: "LRCX"
    price: 85.23
    mktCap: 112000000000
    industry: "Semiconductor Equipment & Materials"
    sector: "Technology"
    fullTimeEmployees: 17600
    # 只保留分析需要的字段
```

**原则**：
- 不修改原始文件
- 只在加载到context时修剪
- 保留足够的信息支持分析

---

## Layer 2: Compaction（压缩）

**目的**：将长内容压缩为摘要，持久化保存

**执行时机**：
- 分析完成后（Phase 6）
- Context预算不足时

**压缩规则**：

### 报告压缩

```yaml
# 原始报告：25,000字符
# 压缩摘要：1,500字符

compaction_template:
  company_summary:
    ticker: "LRCX"
    analysis_date: "2026-01-30"
    version: "v2.0"
    
  key_conclusions:
    - "AI产业链核心受益者，HBM和GAA是增长双引擎"
    - "技术壁垒深厚，刻蚀市场份额45%"
    - "估值合理，目标价$265"
    
  key_metrics:
    revenue_growth: "14%"
    gross_margin: "48%"
    roic: "36%"
    pe_ratio: "25x"
    
  rating: 4
  target_price: "$265"
  
  main_risks:
    - "半导体周期下行风险"
    - "中国市场不确定性"
    
  kill_switches:
    - "毛利率跌破45%"
    - "HBM份额跌破30%"
```

### 持久化位置

```
投资大师/
└── company_profiles/
    └── LRCX/
        ├── profile.yaml          # 公司基本信息
        ├── analysis_history.yaml # 分析历史摘要
        └── latest_summary.yaml   # 最新分析摘要
```

### 历史分析摘要格式

```yaml
# analysis_history.yaml
company: LRCX
analyses:
  - date: "2026-01-30"
    type: "deep"
    version: "v2.0"
    rating: 4
    target_price: "$265"
    key_thesis: "AI产业链核心受益者"
    quality_score: 92
    
  - date: "2025-10-15"
    type: "quick"
    version: "v1.0"
    rating: 3
    target_price: "$220"
    key_thesis: "周期底部机会"
    quality_score: 78

# 加载时只需要这个摘要，不需要完整报告
```

**触发条件**：
- 分析完成时自动触发
- 历史分析 > 5个时压缩旧分析
- Context预算 < 20%时强制压缩

---

## Layer 3: Memory Flush（记忆刷新）

**目的**：重要洞见写入长期记忆，跨session可用

**写入内容**：

### 1. Lessons Learned

```yaml
# skills/knowledge_base/lessons_learned.yaml

lessons:
  - id: LL_156
    date: "2026-01-30"
    company: "LRCX"
    category: "数据"
    context: "在分析LRCX HBM收入时"
    lesson: "HBM市场数据需要交叉验证SK海力士和三星的公开数据"
    action: "今后分析HBM相关公司时，必须获取存储器厂商财报数据"
    severity: "high"
```

### 2. 投资者偏好

```yaml
# skills/knowledge_base/investor_preferences.yaml

preferences:
  risk_tolerance: "moderate"
  preferred_sectors:
    - "Technology"
    - "Healthcare"
  avoid_sectors:
    - "Utilities"
  valuation_preference: "GARP"  # Growth at Reasonable Price
  holding_period: "12-24 months"
  position_sizing: "3-5% per position"
```

### 3. 方法论改进

```yaml
# skills/knowledge_base/framework_improvements.yaml

improvements:
  - id: FI_012
    date: "2026-01-30"
    framework: "护城河分析"
    observation: "7 Powers框架在半导体设备行业特别适用"
    suggestion: "半导体设备分析优先使用7 Powers"
    status: "proposed"  # proposed | implemented
```

### 4. 可验证预测

```yaml
# skills/knowledge_base/predictions_tracker.yaml

predictions:
  - id: PRED_LRCX_001
    date: "2026-01-30"
    company: "LRCX"
    prediction: "2026 Q2 HBM相关收入同比增长50%+"
    rationale: "SK海力士和三星HBM产能扩张带动"
    verification:
      date: "2026-04-15"
      source: "LRCX FY2026 Q2财报"
      threshold: "HBM收入 > $2B"
    confidence: 75
    status: "pending"  # pending | verified | failed
```

**Flush时机**：
- 分析结束时自动提取
- 重要洞见即时写入
- 预测验证后更新状态

---

## 优先级规则

### 加载优先级（从高到低）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Context加载优先级                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Priority 1 (必须加载)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ • 当前分析的关键数据（财务指标、估值、竞争格局）                  │       │
│  │ • Master Framework核心部分                                       │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  Priority 2 (优先加载)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ • 该公司历史分析摘要                                              │       │
│  │ • 相关lessons（该公司/同行业）                                    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  Priority 3 (按需加载)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ • 方法论框架（护城河、估值等专项skill）                           │       │
│  │ • 行业框架（如适用）                                              │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  Priority 4 (可选加载)                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ • 行业背景知识                                                    │       │
│  │ • 竞争对手简要信息                                                │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  Priority 5 (按需获取，不预加载)                                            │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │ • 历史分析详情（完整报告）                                        │       │
│  │ • 其他公司分析                                                    │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 决策逻辑

```python
def load_context(ticker, budget=200000):
    """Context加载决策"""
    context = []
    used_tokens = 0
    
    # Priority 1: 必须加载
    context.append(load_current_company_data(ticker))
    context.append(load_master_framework_core())
    used_tokens = count_tokens(context)
    
    # Priority 2: 优先加载（如果有预算）
    if used_tokens < budget * 0.4:
        context.append(load_company_history_summary(ticker))
        context.append(load_relevant_lessons(ticker))
        used_tokens = count_tokens(context)
    
    # Priority 3: 按需加载
    if used_tokens < budget * 0.5:
        context.append(load_analysis_frameworks())
        used_tokens = count_tokens(context)
    
    # Priority 4: 可选加载
    if used_tokens < budget * 0.5:
        context.append(load_industry_context(ticker))
        used_tokens = count_tokens(context)
    
    # Priority 5: 不预加载，需要时工具获取
    # 保留至少50%预算给推理
    
    return context
```

---

## Context预算分配

### 标准分配（200K tokens）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Context预算分配 (200K tokens)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────┐            │
│  │  System Prompt + Framework Core     15K (7.5%)            │            │
│  │  ████████                                                 │            │
│  └────────────────────────────────────────────────────────────┘            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────┐            │
│  │  当前公司数据                       50K (25%)              │            │
│  │  █████████████████████████                                │            │
│  └────────────────────────────────────────────────────────────┘            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────┐            │
│  │  历史分析摘要                       20K (10%)              │            │
│  │  ██████████                                               │            │
│  └────────────────────────────────────────────────────────────┘            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────┐            │
│  │  行业背景 + Lessons                 15K (7.5%)            │            │
│  │  ████████                                                 │            │
│  └────────────────────────────────────────────────────────────┘            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────┐            │
│  │  推理保留空间                       100K (50%)             │            │
│  │  ██████████████████████████████████████████████████       │            │
│  └────────────────────────────────────────────────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 不同场景的分配调整

| 场景 | 当前数据 | 历史摘要 | 行业背景 | 推理空间 |
|------|---------|---------|---------|---------|
| 首次分析 | 60% | 0% | 10% | 30% |
| 追踪更新 | 30% | 30% | 5% | 35% |
| 对比分析 | 40%×2 | 10% | 5% | 5% |
| 行业分析 | 20%×5 | 5% | 15% | 30% |

---

## 实现细节

### Token计数

```yaml
token_estimation:
  method: "tiktoken"  # 或字符估算
  char_to_token_ratio: 4  # 1 token ≈ 4个英文字符 ≈ 1.5个中文字符
  
  guidelines:
    - "10K字符 ≈ 2.5K tokens（英文）"
    - "10K字符 ≈ 6.7K tokens（中文）"
```

### 压缩算法

```yaml
compaction_algorithm:
  for_reports:
    - 提取30秒速览仪表盘
    - 提取关键指标表
    - 提取核心结论（前3条）
    - 提取风险和Kill Switches
    - 移除详细分析过程
    
  compression_ratio: "10:1"  # 25K → 2.5K
```

### 缓存策略

```yaml
cache_strategy:
  company_data:
    ttl: 3600  # 1小时
    refresh_trigger: "new_filing"
    
  analysis_summary:
    ttl: 86400  # 1天
    refresh_trigger: "new_analysis"
    
  frameworks:
    ttl: "permanent"
    refresh_trigger: "manual_update"
```

---

## 监控指标

| 指标 | 目标 | 告警阈值 |
|------|------|---------|
| Context利用率 | 40-50% | > 80% |
| 推理空间保留 | > 50% | < 30% |
| 压缩执行频率 | < 1次/分析 | > 3次/分析 |
| 缓存命中率 | > 70% | < 50% |

---

## 最佳实践

### 1. 始终保留推理空间
- 最低保留50%给推理
- 宁可少加载也不要挤占推理空间

### 2. 优先使用摘要
- 历史分析用摘要，不用全文
- 需要详情时再用工具获取

### 3. 及时压缩
- 分析完成立即压缩
- 不要让历史数据堆积

### 4. 分层管理
- 热数据在context
- 温数据在摘要文件
- 冷数据在完整报告文件

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-30 | 初始版本 |

---

*设计来源：Clawdbot Context管理策略*
