# Data Consistency Validator v1.0

## 目的

Phase 0数据预取后的强制验证器，解决多数据源时间不一致和算术关系错误问题。源自APP报告$228B vs $132B市值矛盾，导致P/E 68.5x→39.6x级联错误的教训。

## 核心问题

**APP案例复盘**:
- FMP key-metrics返回$228B市值(年报基础)
- FMP quote返回$132B市值(实时数据)
- 混用导致P/E从68.5x错算到39.6x
- 103处数据需要回流修正

## 验证维度

### 1. 算术一致性验证
- **市值公式**: Market Cap = Price × Outstanding Shares
- **P/E公式**: P/E = Market Cap / Net Income (TTM)
- **EV公式**: EV = Market Cap + Net Debt
- **容忍度**: ±2%算术差异，>2%标记为ERROR

### 2. 数据新鲜度验证
- **时间戳检查**: 不同endpoint数据时间差异
- **新鲜度阈值**: >1个交易日标记为WARNING
- **优先级**: quote > profile > key-metrics > ratios

### 3. 交叉验证矩阵
```yaml
primary_metrics:
  - market_cap: [quote, profile, key-metrics]
  - price: [quote, profile]
  - pe_ratio: [ratios, key-metrics, calculated]
  - shares_outstanding: [key-metrics, profile]

validation_rules:
  - name: "market_cap_arithmetic"
    formula: "price * shares_outstanding"
    tolerance: 0.02
  - name: "pe_calculation"
    formula: "market_cap / net_income_ttm"
    tolerance: 0.05
  - name: "ev_calculation"
    formula: "market_cap + net_debt"
    tolerance: 0.02
```

## 执行流程

### Phase 1: 数据收集
1. 调用多个MCP endpoint获取同一ticker数据
2. 提取核心数据点: market_cap, price, shares, pe_ratio, net_income
3. 记录每个数据点的时间戳和来源

### Phase 2: 一致性检查
```python
def validate_market_cap_consistency(data_sources):
    """验证市值数据一致性"""
    market_caps = {}

    for source, data in data_sources.items():
        if 'market_cap' in data:
            market_caps[source] = {
                'value': data['market_cap'],
                'timestamp': data.get('timestamp', 'unknown'),
                'price': data.get('price'),
                'shares': data.get('shares_outstanding')
            }

    # 算术验证
    inconsistencies = []
    for source, info in market_caps.items():
        if info['price'] and info['shares']:
            calculated_cap = info['price'] * info['shares']
            reported_cap = info['value']

            if abs(calculated_cap - reported_cap) / reported_cap > 0.02:
                inconsistencies.append({
                    'source': source,
                    'type': 'arithmetic_error',
                    'calculated': calculated_cap,
                    'reported': reported_cap,
                    'deviation_pct': abs(calculated_cap - reported_cap) / reported_cap
                })

    return inconsistencies
```

### Phase 3: 冲突解决
**数据选择优先级**:
1. **最新数据优先**: 选择时间戳最新的数据
2. **算术一致性优先**: 选择通过算术验证的数据
3. **来源可靠性**: quote > profile > key-metrics

**冲突处理策略**:
```yaml
conflict_resolution:
  market_cap_discrepancy:
    threshold: ">10%"
    action: "select_latest_quote_data"
    backup: "calculate_from_price_shares"

  pe_ratio_discrepancy:
    threshold: ">20%"
    action: "recalculate_from_fundamentals"
    formula: "market_cap / trailing_net_income"

  timestamp_divergence:
    threshold: ">1_trading_day"
    action: "flag_stale_data_warning"
    recommend: "use_most_recent_source"
```

## 输出报告格式

### 数据一致性报告
```markdown
# Data Consistency Report: {TICKER}
**Validation Time**: {timestamp}
**Data Sources**: {source_count} endpoints validated

## 🟢 PASSED Validations
- Market Cap Arithmetic: PASS (deviation <2%)
- P/E Calculation: PASS (matches fundamental calculation)
- Data Freshness: PASS (all sources <1 day old)

## 🔴 FAILED Validations
- **CRITICAL**: Market Cap Discrepancy
  - FMP key-metrics: $228.28B (2025-12-31)
  - FMP quote: $132.03B (2026-02-17)
  - **Deviation**: 72.9% | **Root Cause**: Stock price decline
  - **Recommendation**: Use quote data ($132.03B) as baseline

## 📋 Recommended Data Baseline
**Selected Market Cap**: $132.03B (FMP quote, 2026-02-17)
**Calculated P/E**: 39.6x (vs reported 68.5x)
**Data Snapshot Lock**: Enable for consistent analysis

## 🚨 Required Actions
1. Update all market-cap dependent calculations
2. Recalculate P/E, EV/EBITDA, FCF Yield
3. Flag stale data in key-metrics endpoint
```

## 集成协议

### Phase 0集成
```bash
# 在data-prefetch skill后立即调用
/data-prefetch APP
/data-consistency-validator APP --mode=strict --auto-fix=true
```

### 自动修正模式
- `--auto-fix=true`: 自动选择最佳数据源并更新shared_context.md
- `--mode=strict`: 算术偏差>2%即标记ERROR
- `--baseline=quote`: 强制使用quote数据作为基准

### 与现有框架集成
**CG门控扩展**: 新增CG19数据一致性检查
```yaml
CG19_DATA_CONSISTENCY:
  type: "FAIL"  # 数据不一致直接失败
  check: "arithmetic_deviation < 5% AND timestamp_drift < 2_days"
  script: "verify_data_consistency.sh"
```

## 成功标准

### 立即价值
- ✅ 避免APP式$228B vs $132B市值混用错误
- ✅ 自动发现并修正P/E计算错误
- ✅ 减少后续Phase的数据回流成本

### 长期价值
- 📈 建立数据质量基准线，提升报告可信度
- 🔒 实现"数据快照锁定"，避免分析中途数据变动
- 🚀 为v17.0框架奠定数据治理基础

## 版本历史

**v1.0 (2026-02-17)**:
- 初版发布，解决APP报告数据一致性问题
- 支持5个核心验证维度 + 3个冲突解决策略
- 集成Phase 0自动执行 + CG19门控

---

**适用场景**: 所有Tier 2/3分析的Phase 0数据预取后强制执行
**开发优先级**: P0 (数据质量基础设施)
**估计开发时间**: 4-6小时 (skill编写 + 测试验证)