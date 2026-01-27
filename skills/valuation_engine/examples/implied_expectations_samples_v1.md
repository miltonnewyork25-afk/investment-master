# Implied Expectations Samples v1.0

5家代表性公司的Reverse DCF隐含预期示例，覆盖不同model_families。

---

## 1. Tesla (TSLA) - Platform/High Growth

**Model Family**: `VE_PLATFORM_OPTIONALITY_ANNOTATED`

### 估值锚点
| 字段 | 值 |
|------|-----|
| As of | 2026-01-24 |
| Stock Price | $449 |
| Shares (diluted) | 3.2B |
| Market Cap | $1.44T |
| Net Debt | -$22B (净现金) |
| Enterprise Value | $1.42T |

### 基础指标 (TTM)
| 指标 | 值 |
|------|-----|
| Revenue | $100B |
| EBIT Margin | 8.5% |
| FCF | $4.5B |
| ROIC | 12% |
| Reinvestment Ratio | 65% |

### 隐含预期求解结果
```yaml
implied_expectations:
  rev_cagr: 0.18          # 18% CAGR over 10 years
  target_margin: 0.14     # Fade to 14% EBIT margin
  reinvestment_ratio: 0.45
  fade_years_or_cap: 12   # 12 years of excess returns
  terminal_g: 0.03
  implied_roiic: 0.40     # 18%/45% = 40%

  model_specific:
    implied_penetration_at_fade: 0.22  # 22% of TAM
    implied_tam_capture_pct: 0.18

  solver_status: OK
  confidence: 0.72
```

### 关键敏感性
| 参数 | 冲击 | 价值影响 |
|------|------|----------|
| WACC | +1% | -18% |
| terminal_g | +0.5% | +12% |
| fade_years | -2 years | -15% |
| target_margin | -2% | -22% |

### CAP假设 (3条)
1. **CAP_H_001**: FSD干预率需保持<5次/万英里以支撑12年CAP
   - Metric: FSD intervention rate
   - Threshold: < 5 per 10,000 miles
   - Time Window: next 4 quarters
   - Disconfirmer: 干预率连续2季度>10次/万英里

2. **CAP_H_002**: 汽车毛利率需回升至>18%以证明规模效应
   - Metric: Automotive gross margin (ex-credits)
   - Threshold: > 18%
   - Time Window: by Q4 2026
   - Disconfirmer: 毛利率连续3季度<15%

3. **CAP_H_003**: 储能部署量需保持>50% YoY增长
   - Metric: Energy storage deployment GWh YoY
   - Threshold: > 50%
   - Time Window: FY2026
   - Disconfirmer: 部署量增速连续2季度<30%

### 物理上限检查
| 检查项 | 隐含值 | 上限 | 状态 |
|--------|--------|------|------|
| Rev CAGR vs Industry | 18% | 25% | PASS |
| TAM Penetration | 22% | 30% | PASS |
| Margin vs Best-in-class | 14% | 18% | PASS |

---

## 2. JPMorgan Chase (JPM) - Financial

**Model Family**: `VE_FINANCIAL_ROE_RESIDUAL_INCOME`

### 估值锚点
| 字段 | 值 |
|------|-----|
| As of | 2026-01-24 |
| Stock Price | $245 |
| Shares | 2.85B |
| Market Cap | $698B |
| Book Value/Share | $115 |
| P/B Ratio | 2.13x |

### 金融核心指标
| 指标 | 值 |
|------|-----|
| ROE (TTM) | 15.5% |
| COE (estimated) | 10% |
| ROE - COE Spread | 5.5% |
| CET1 Ratio | 15.2% |
| RWA | $1.9T |

### 隐含预期求解结果
```yaml
implied_expectations:
  model_specific:
    implied_roe: 0.155
    implied_coe: 0.10
    implied_roe_spread: 0.055      # 5.5% excess return
    implied_excess_return_fade: 8  # 8 years to fade to COE
    implied_book_value_growth: 0.06  # 6% annual BV growth

  solver_status: OK
  confidence: 0.78
```

### CAP假设 (3条)
1. **CAP_H_001**: ROE需保持>COE+3%以支撑8年excess return fade
   - Metric: ROE - COE spread
   - Threshold: > 3%
   - Time Window: next 8 quarters
   - Disconfirmer: ROE spread<2%持续4季度

2. **CAP_H_002**: CET1 ratio需维持>12%以避免监管资本约束
   - Metric: CET1 ratio
   - Threshold: > 12%
   - Time Window: ongoing
   - Disconfirmer: CET1<11%或Fed stress test fail

3. **CAP_H_003**: 信贷成本需控制在<80bps以维持盈利能力
   - Metric: Net charge-off ratio
   - Threshold: < 0.80%
   - Time Window: next 4 quarters
   - Disconfirmer: NCO ratio>1.2%持续2季度

---

## 3. Nucor (NUE) - Cyclical Steel

**Model Family**: `VE_CYCLICAL_NORMALIZED_REVERSE_DCF`

### 估值锚点
| 字段 | 值 |
|------|-----|
| As of | 2026-01-24 |
| Stock Price | $145 |
| Shares | 240M |
| Market Cap | $34.8B |
| Net Debt | $4.5B |
| EV | $39.3B |

### 正常化指标 (7年平均)
| 指标 | 当前TTM | 正常化 |
|------|---------|--------|
| Revenue | $32B | $28B |
| EBIT Margin | 8% | 10% |
| ROIC | 11% | 9% |
| Capacity Utilization | 75% | 82% |

### 隐含预期求解结果
```yaml
implied_expectations:
  rev_cagr: 0.03          # 3% normalized growth
  target_margin: 0.10     # 10% normalized margin
  reinvestment_ratio: 0.35
  fade_years_or_cap: 6    # 6 years (shorter for cyclical)
  terminal_g: 0.025

  model_specific:
    implied_normalized_margin: 0.10
    implied_mid_cycle_revenue: 28e9
    implied_through_cycle_roic: 0.09

  solver_status: OK
  confidence: 0.68

  reason_codes: []
```

### CAP假设 (3条)
1. **CAP_H_001**: 正常化利润率需回归>10%以支撑mid-cycle估值
   - Metric: Normalized EBIT margin (7Y avg)
   - Threshold: >= 10%
   - Time Window: over next 2 years (full cycle)
   - Disconfirmer: 连续4季度margin<8%且无周期改善迹象

2. **CAP_H_002**: 产能利用率需维持>75%以证明行业供需平衡
   - Metric: Steel capacity utilization
   - Threshold: > 75%
   - Time Window: next 4 quarters
   - Disconfirmer: 利用率<65%持续3季度

3. **CAP_H_003**: Through-cycle ROIC需>WACC以验证价值创造
   - Metric: 7-year average ROIC
   - Threshold: > 8% (WACC)
   - Time Window: rolling 7 years
   - Disconfirmer: Through-cycle ROIC<7%

---

## 4. Realty Income (O) - REIT

**Model Family**: `VE_REIT_NAV_IMPLIED`

### 估值锚点
| 字段 | 值 |
|------|-----|
| As of | 2026-01-24 |
| Stock Price | $58 |
| Shares | 875M |
| Market Cap | $50.8B |
| Debt | $24B |
| EV | $74.8B |

### REIT核心指标
| 指标 | 值 |
|------|-----|
| NOI (TTM) | $4.8B |
| Cap Rate (portfolio) | 6.4% |
| NAV/Share | $62 |
| FFO/Share | $4.25 |
| P/FFO | 13.6x |
| Occupancy | 98.5% |

### 隐含预期求解结果
```yaml
implied_expectations:
  model_specific:
    implied_cap_rate: 0.064    # 6.4%
    implied_nav_premium: -0.065  # 6.5% discount to NAV
    implied_noi_growth: 0.025  # 2.5% same-store NOI growth
    implied_ffo_growth: 0.03   # 3% FFO growth

  solver_status: OK
  confidence: 0.75
```

### CAP假设 (3条)
1. **CAP_H_001**: 同店NOI增速需>2%以支撑内生增长
   - Metric: Same-store NOI growth
   - Threshold: > 2%
   - Time Window: next 4 quarters
   - Disconfirmer: 同店NOI增速连续3季度<1%

2. **CAP_H_002**: 出租率需维持>97%以证明资产质量
   - Metric: Portfolio occupancy rate
   - Threshold: > 97%
   - Time Window: ongoing
   - Disconfirmer: 出租率<95%

3. **CAP_H_003**: 收购Cap Rate需>6%以证明外延增长创造价值
   - Metric: Acquisition cap rate
   - Threshold: > 6%
   - Time Window: next 4 quarters
   - Disconfirmer: 收购cap rate<5.5%持续2季度

---

## 5. General Electric (GE) - Multi-Segment Conglomerate

**Model Family**: `VE_MULTI_SEGMENT_SOTP`

### 估值锚点
| 字段 | 值 |
|------|-----|
| As of | 2026-01-24 |
| Stock Price | $185 |
| Shares | 1.1B |
| Market Cap | $203.5B |
| Net Debt | $8B |
| EV | $211.5B |

### 分部数据
| 分部 | Revenue | Margin | Growth | 估值方法 |
|------|---------|--------|--------|----------|
| Aerospace | $38B | 20% | 8% | DCF |
| Renewable Energy | $15B | -5% | 12% | DCF (normalized) |
| Power | $18B | 8% | 2% | DCF |

### 隐含预期求解结果 (SOTP)
```yaml
implied_expectations:
  model_specific:
    segments:
      - name: Aerospace
        implied_rev_cagr: 0.08
        implied_margin: 0.22
        implied_value: $180B

      - name: Renewable Energy
        implied_rev_cagr: 0.12
        implied_margin: 0.05  # turnaround to 5%
        implied_value: $25B

      - name: Power
        implied_rev_cagr: 0.02
        implied_margin: 0.10
        implied_value: $30B

    corporate_overhead: -$15B
    total_implied_ev: $220B
    conglomerate_discount: -4%

  solver_status: OK
  confidence: 0.65
```

### CAP假设 (3条)
1. **CAP_H_001**: Aerospace利润率需维持>18%以支撑主业估值
   - Metric: GE Aerospace operating margin
   - Threshold: > 18%
   - Time Window: next 4 quarters
   - Disconfirmer: margin<16%持续2季度

2. **CAP_H_002**: Renewable Energy需在2027年实现盈亏平衡
   - Metric: Renewable Energy segment operating margin
   - Threshold: >= 0%
   - Time Window: by FY2027
   - Disconfirmer: FY2027仍为负margin

3. **CAP_H_003**: 集团协同效应需体现为overhead/revenue<3%
   - Metric: Corporate overhead / Total revenue
   - Threshold: < 3%
   - Time Window: ongoing
   - Disconfirmer: overhead占比>4%

---

## 汇总对比

| 公司 | Model Family | Rev CAGR | Margin | CAP/Fade | Confidence |
|------|-------------|----------|--------|----------|------------|
| Tesla | Platform | 18% | 14% | 12yr | 0.72 |
| JPMorgan | Financial | - | ROE 15.5% | 8yr | 0.78 |
| Nucor | Cyclical | 3% | 10% (norm) | 6yr | 0.68 |
| Realty Income | REIT | - | Cap 6.4% | - | 0.75 |
| GE | Multi-Segment | Mixed | Mixed | Mixed | 0.65 |

---

## 使用说明

1. **选择正确的model_family**: 根据公司特征路由到最匹配的估值模型
2. **验证物理上限**: 隐含预期不应超出行业天花板
3. **关注敏感性**: 对WACC和terminal假设保持警惕
4. **建立CAP假设**: 每个假设必须可证伪、有时间窗、有验证来源
5. **定期验证**: 按time_window定期检查CAP假设是否仍然成立
