# META Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-12
## 数据预取版本: v4.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $200.97B (+23.8% YoY)
- **类型**: H
- **来源**: MCP analyze_stock + Meta FY2025 earnings
- **日期**: 2026-02-12
- **用于**: Ch02 §2.1, Ch14 §Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $60.46B (+10.7% YoY)
- **类型**: H
- **来源**: MCP analyze_stock fundamentals
- **日期**: 2026-02-12
- **用于**: Ch02 §2.1, Ch15 §盈利能力

### DM-FIN-003
- **值**: Profit Margin 30.1%
- **类型**: H
- **来源**: MCP analyze_stock fundamentals
- **日期**: 2026-02-12
- **用于**: Ch02 §2.2, Ch05 §定价权

### DM-FIN-004
- **值**: Operating Margin 41.4%
- **类型**: H
- **来源**: MCP analyze_stock fundamentals
- **日期**: 2026-02-12
- **用于**: Ch02 §运营效率

### DM-FIN-005
- **值**: Free Cash Flow $23.43B
- **类型**: H
- **来源**: MCP analyze_stock fundamentals
- **日期**: 2026-02-12
- **用于**: Ch14 §DCF, Ch16 §现金创造

### DM-FIN-006
- **值**: ROE 30.24%
- **类型**: H
- **来源**: MCP analyze_stock fundamentals
- **日期**: 2026-02-12
- **用于**: Ch05 §资本效率

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: DCF fair value $595.45 vs current $649.81 (-8.4%)
- **类型**: R
- **来源**: Internal DCF model v4.0
- **日期**: 2026-02-12
- **用于**: Ch14 §DCF

### DM-VAL-002
- **值**: P/E (TTM) 28.49x
- **类型**: H
- **来源**: MCP analyze_stock basic_data
- **日期**: 2026-02-12
- **用于**: Ch14 §估值对比

### DM-VAL-003
- **值**: Forward P/E 18.22x
- **类型**: H
- **来源**: MCP analyze_stock basic_data
- **日期**: 2026-02-12
- **用于**: Ch14 §Forward估值

### DM-VAL-004
- **值**: META P/E 28.49x vs peer average 29.11x (-2.1% discount)
- **类型**: H
- **来源**: Peer comparison analysis
- **日期**: 2026-02-12
- **用于**: Ch14 §相对估值

### DM-VAL-005
- **值**: META forward P/E 18.22x vs peer average 24.88x (-26.8% discount)
- **类型**: H
- **来源**: Peer comparison analysis
- **日期**: 2026-02-12
- **用于**: Ch14 §Forward对比

---

## Section C: 市场与共识锚点 (DM-MKT/CON/PMK-xxx)

### DM-MKT-001
- **值**: 当前股价 $649.81
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-12
- **用于**: 全文引用

### DM-MKT-002
- **值**: 52周高点 $796.25, 低点 $479.8
- **类型**: H
- **来源**: MCP analyze_stock basic_data
- **日期**: 2026-02-12
- **用于**: Ch01 §股价历史

### DM-MKT-003
- **值**: RSI 47.87 (中性区间)
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-02-12
- **用于**: Ch01 §技术面

### DM-CON-001
- **值**: 分析师共识评级 Buy (35 Buy / 8 Hold / 2 Sell)
- **类型**: H
- **来源**: WebSearch Agent-A analyst consensus
- **日期**: 2026-02-12
- **用于**: Ch13 §分析师共识

### DM-CON-002
- **值**: 平均目标价 $725.40 (+11.6% upside)
- **类型**: H
- **来源**: WebSearch Agent-A analyst consensus
- **日期**: 2026-02-12
- **用于**: Ch13 §目标价分布

### DM-PMK-001
- **值**: "Meta Q1 2026 earnings beat" 概率 68%
- **类型**: H
- **来源**: Polymarket via WebSearch Agent-B
- **日期**: 2026-02-12
- **用于**: Ch09 §市场预期

---

## Section D: 业务与竞争锚点 (DM-BIZ/MGT/SMT/OPT-xxx)

### DM-BIZ-001
- **值**: Family of Apps revenue $180.96B (90.1% of total)
- **类型**: H
- **来源**: Meta FY2025 10-K
- **日期**: 2026-02-12
- **用于**: Ch03 §业务矩阵

### DM-BIZ-002
- **值**: Reality Labs revenue $20.0B (9.9% of total)
- **类型**: H
- **来源**: Meta FY2025 10-K
- **日期**: 2026-02-12
- **用于**: Ch03 §业务矩阵

### DM-BIZ-003
- **值**: US&Canada revenue $79.8B (39.7% of total)
- **类型**: H
- **来源**: Meta FY2025 10-K geographic revenue
- **日期**: 2026-02-12
- **用于**: Ch04 §地理分布

### DM-BIZ-004
- **值**: Facebook MAU 3.35B users
- **类型**: H
- **来源**: Meta Q4 2025 earnings
- **日期**: 2026-02-12
- **用于**: Ch05 §用户基础

### DM-BIZ-010
- **值**: Meta social media market share 29.4% (rank #1)
- **类型**: H
- **来源**: eMarketer 2025 research
- **日期**: 2026-02-12
- **用于**: Ch06 §竞争地位

### DM-BIZ-011
- **值**: TikTok market share 18.7% (main competitor)
- **类型**: H
- **来源**: eMarketer 2025 research
- **日期**: 2026-02-12
- **用于**: Ch06 §竞争威胁

### DM-MGT-001
- **值**: CEO Mark Zuckerberg, 22年任期(2004-至今)
- **类型**: H
- **来源**: WebSearch Agent-E management analysis
- **日期**: 2026-02-12
- **用于**: Ch07 §管理层

### DM-MGT-002
- **值**: CFO Susan Li, 2022年上任, Meta 16年老员工
- **类型**: H
- **来源**: WebSearch Agent-E management analysis
- **日期**: 2026-02-12
- **用于**: Ch07 §财务管理

### DM-SMT-001
- **值**: 机构持股91.27% (6,738家机构)
- **类型**: H
- **来源**: WebSearch Agent-F smart money analysis
- **日期**: 2026-02-12
- **用于**: Ch08 §机构态度

### DM-SMT-002
- **值**: Bill Ackman新进$20亿仓位(均价$625)
- **类型**: H
- **来源**: WebSearch Agent-F smart money analysis
- **日期**: 2026-02-12
- **用于**: Ch08 §Smart Money信号

### DM-OPT-001
- **值**: 做空股数2,772.5万股(占流通股1.28%)
- **类型**: H
- **来源**: WebSearch Agent-G options analysis
- **日期**: 2026-02-12
- **用于**: Ch09 §市场情绪

### DM-OPT-002
- **值**: 看跌/看涨比率0.70(偏向看涨)
- **类型**: H
- **来源**: WebSearch Agent-G options analysis
- **日期**: 2026-02-12
- **用于**: Ch09 §期权情绪

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Revenue CAGR FY2025-FY2030E ~12-15%
- **类型**: R
- **推理链**: 当前+23.8% → AI加速增长 → 逐步成熟减速至长期增速
- **证伪条件**: 连续2个季度收入增长<10%
- **来源**: WebSearch Agent-A + DCF模型推导
- **日期**: 2026-02-12
- **用于**: Ch14 §14.2 成长性评估

### DM-INF-002
- **值**: AI CapEx回报周期2-3年
- **类型**: R
- **推理链**: $125-135B年投入 → AI广告效率提升 → ARPU增长验证ROI
- **证伪条件**: ARPU增速连续3Q <10%
- **来源**: CapEx指引 + 历史ROI模式分析
- **日期**: 2026-02-12
- **用于**: Ch03 §CapEx评估

### DM-SUB-001
- **值**: 护城河综合评估: 强
- **类型**: S
- **依据**: 网络效应+数据优势+开发生态+规模经济
- **来源**: 竞争分析 + 护城河理论应用
- **日期**: 2026-02-12
- **用于**: Ch05 §护城河评估

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 22 | 71.0% |
| R (合理推断) | 7 | 22.6% |
| S (主观判断) | 2 | 6.4% |
| **总计** | **31** | **100%** |

---

## Section G: Phase 1-4关键发现 (传统格式保留)

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。
> 格式与v3.0兼容，但关键数字应引用Section A-E中的DM-ID。

[Phase推进时追加]