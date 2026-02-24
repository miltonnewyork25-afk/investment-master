# Evidence Card 注册表 — 半导体设备对比分析

> **创建日期**: 2026-02-24
> **EC Schema版本**: v1.0 (参见 `docs/evidence_card_schema.md`)
> **目标**: 125+ ECs (fact ≥ 45张 / estimate ~30张 / inference ~38张 / assumption ≤ 12张)
> **当前**: 10张 (P0初始化)

---

## EC注册表

### EC-FIN-001: 四公司TTM毛利率排序
- **claim**: KLAC(61.9%) > ASML(52.8%) > LRCX(49.8%) ≈ AMAT(48.7%)，KLAC领先AMAT 13.2pp
- **claim_type**: fact
- **source**: {type: "mcp_tool", locator: "baggers_summary 2026-02-24", ts: "2026-02-24"}
- **method**: 直接引用TTM毛利率数据
- **falsifier**: 任何一家公司毛利率数据更正超过±1pp
- **verification_mode**: cross_source (FMP + 公司季报交叉)
- **status**: verified
- **used_in**: [Ch9, Ch12, Ch14]
- **linked_question**: 为什么KLAC毛利率比AMAT高13pp？

### EC-FIN-002: ASML ROIC=135.6%的驱动因素
- **claim**: ASML ROIC异常高(135.6%)，核心驱动是客户预付款使平均投入资本极低(€6.62B vs €10.86B营业利润)
- **claim_type**: inference
- **source**: {type: "mcp_tool", locator: "baggers_summary ASML 2026-02-24", ts: "2026-02-24"}
- **method**: ROIC分解: NOPAT €8.97B / 平均投入资本 €6.62B = 135.6%。投入资本低因客户预付款(合同负债)抵消了运营资本需求
- **falsifier**: 如果ASML投入资本计算口径改变(如加回合同负债)，ROIC将大幅下降
- **verification_mode**: calculation_audit
- **status**: verified
- **used_in**: [Ch12, Ch14]
- **linked_question**: ASML ROIC的"真实"水平是什么？

### EC-FIN-003: KLAC杠杆最高(D/E=1.08x)但Z-Score=14.17仍安全
- **claim**: KLAC D/E=1.08x是四家最高，但$6.28B债务主要用于回购而非运营，Altman Z=14.17远超安全线
- **claim_type**: inference
- **source**: {type: "mcp_tool", locator: "baggers_summary KLAC 2026-02-24", ts: "2026-02-24"}
- **method**: D/E=1.08x(债务$6.28B/权益$5.47B)。权益低因累积回购压缩。Z-Score=14.17>>1.81安全线
- **falsifier**: 如果KLAC FCF大幅下降(如WFE下行>25%)，利息覆盖14.4x可能快速恶化
- **verification_mode**: cross_source
- **status**: verified
- **used_in**: [Ch7, Ch14, Ch18]
- **linked_question**: KLAC的杠杆策略是否可持续？

### EC-FIN-004: LRCX CSBG装机基数100K活跃腔体
- **claim**: LRCX Customer Support Business Group (CSBG)拥有~100,000个活跃腔体装机基数，年ARPU约$72K/腔
- **claim_type**: fact
- **source**: {type: "earnings_call", locator: "LRCX Q4 FY2025 管理层披露", ts: "2025-12"}
- **method**: 管理层直接披露100K腔体; ARPU推算: CSBG收入~$7.2B / 100K = $72K
- **falsifier**: 管理层修正腔体数量或CSBG收入分拆
- **verification_mode**: management_disclosure
- **status**: verified
- **used_in**: [Ch7, Ch10, Ch15]
- **linked_question**: CSBG ARPU增长可持续性？

### EC-FIN-005: AMAT EPIC Center $5B投资推高CapEx至8%
- **claim**: AMAT CapEx/收入=8.0%(FY2025)为四家最高，主要因EPIC Center约$5B投资处于爬坡期
- **claim_type**: fact
- **source**: {type: "company_filing", locator: "AMAT FY2025年报 + 管理层披露", ts: "2025-10"}
- **method**: CapEx/收入=8.0%(FMP FY2025)。EPIC Center $5B为管理层披露
- **falsifier**: EPIC Center投资缩减或完工时间表改变
- **verification_mode**: management_disclosure
- **status**: verified
- **used_in**: [Ch8, Ch12, Ch13]
- **linked_question**: EPIC Center何时开始贡献收入？ROI是多少？

### EC-FIN-006: 四公司TTM P/E均处于5年历史高位区间
- **claim**: 当前TTM P/E对比5年FY均值: AMAT +94%溢价, LRCX +119%溢价, KLAC +91%溢价, ASML +34%溢价
- **claim_type**: inference
- **source**: {type: "mcp_tool", locator: "baggers_summary + fmp_data 2026-02-24", ts: "2026-02-24"}
- **method**: 5年FY P/E均值(AMAT 19.5x/LRCX 23.2x/KLAC 25.7x/ASML 38.5x) vs 当前TTM P/E(37.9/50.9/49.0/51.7)
- **falsifier**: (1)TTM收益含一次性项目扭曲 (2)FY vs TTM口径差异导致不可比
- **verification_mode**: calculation_audit
- **status**: verified_with_caveat (FY vs TTM口径差异约5-10%，不改变结论方向)
- **used_in**: [Ch1, Ch13, Ch14, Ch20]
- **linked_question**: 高估值是AI周期溢价还是纯粹过热？

### EC-FIN-007: LRCX是唯一触发三重正面领先信号的公司
- **claim**: 2026-02-24快照中，LRCX触发营收毛利共振+经营杠杆释放+存货效率提升三重正面信号，无负面信号；其他三家最多2个正面信号
- **claim_type**: fact
- **source**: {type: "mcp_tool", locator: "baggers_summary LRCX 2026-02-24", ts: "2026-02-24"}
- **method**: 直接引用baggers_summary领先指标触发状态
- **falsifier**: 下一季度报告后信号可能改变
- **verification_mode**: direct_read
- **status**: verified (时效性: 有效期至下次季报)
- **used_in**: [Ch3, Ch14, Ch20]
- **linked_question**: LRCX正面信号是否领先于股价表现？

### EC-VAL-001: 宏观市场处于历史98-99百分位估值水平
- **claim**: Shiller P/E=39.78(98百分位), Buffett指标=217%(99百分位), ERP=4.5%(66百分位) — 市场整体非常昂贵
- **claim_type**: fact
- **source**: {type: "mcp_tool", locator: "baggers_summary macro 2026-02-24", ts: "2026-02-24"}
- **method**: 直接引用宏观温度指标
- **falsifier**: 指标计算方法变更或数据源修正
- **verification_mode**: cross_source
- **status**: verified
- **used_in**: [Ch1, Ch13, Ch20]
- **linked_question**: 极端宏观估值下半导体设备是否应有估值折价？

### EC-COMP-001: KLAC检测/量测=CapEx最低+毛利率最高 → "半导体行业的软件公司"
- **claim**: KLAC CapEx/收入2.8%(最低)+ 毛利率61.9%(最高)的组合，说明其核心壁垒在软件/算法而非硬件制造复杂度，商业模式更类似高毛利软件公司
- **claim_type**: inference
- **source**: {type: "cross_analysis", locator: "financial_comparison_v2.md Sec.2+5+UVD/UDC", ts: "2026-02-24"}
- **method**: 低CapEx(2.8%) + 低CapEx/折旧(0.86x，即CapEx<折旧) + 高毛利(61.9%) + 高固定资产周转(9.7x) → 轻资产高毛利特征与软件公司一致
- **falsifier**: 如果KLAC未来CapEx/收入趋势上升(如新硬件平台需要大投资)，则推翻
- **verification_mode**: pattern_matching
- **status**: provisional
- **used_in**: [Ch6, Ch9, Ch12, Ch20]
- **linked_question**: KLAC的"软件溢价"是否应反映在更高的估值倍数中？

### EC-COMP-002: ASML客户预付款=垄断的直接经济表现
- **claim**: ASML流动比率仅1.26x、速动比率0.72x(四家最低)，但这不是财务弱点而是垄断地位的体现 — 客户预付数亿美元等待EUV交货，使ASML用"别人的钱"运营
- **claim_type**: inference
- **source**: {type: "cross_analysis", locator: "financial_comparison_v2.md Sec.4+6", ts: "2026-02-24"}
- **method**: ASML流动比率低(1.26x)因为大额合同负债(客户预付款)计入流动负债。同时ROIC=135.6%(投入资本极低)和OCF/NI=1.39x(最高)印证了预付款改善现金流的逻辑
- **falsifier**: 如果ASML积压订单大幅缩减、客户预付条件恶化
- **verification_mode**: logic_chain
- **status**: provisional
- **used_in**: [Ch6, Ch9, Ch12, Ch20]
- **linked_question**: 如果EUV竞争者出现，预付款条件会如何变化？

---

## EC统计

| 类型 | 当前数量 | 目标 | 达成率 |
|------|---------|------|--------|
| fact | 5 | ≥45 | 11% |
| estimate | 0 | ~30 | 0% |
| inference | 5 | ~38 | 13% |
| assumption | 0 | ≤12 | — |
| **合计** | **10** | **125+** | **8%** |

## 分类索引

| 分类 | EC编号 |
|------|--------|
| FIN (财务) | 001-007 |
| VAL (估值) | 001 |
| COMP (对比) | 001-002 |
| MKT (市场) | — (待P1) |
| TECH (技术) | — (待P2) |
| GEO (地缘) | — (待P4) |
| KS (Kill Switch) | — (待P4) |
