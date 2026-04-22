# POWL Phase 0 深化 — Margin Bridge FY22 → FY25 (+13.4pp) 结构性 vs 周期性拆分

> 生成时间: 2026-04-21 23:10 | Python 验证: `reports/POWL/data/margin_bridge.py`
> 目的: 判断 GM 29.4% 是结构性新稳态还是周期 peak, 决定 EPS 可持续性

---

## 1. 核心结论 (最重要)

**GM +13.4pp 扩张中, 约 45% 结构性 + 55% 周期性**:
- 结构性 (可持续, 穿越周期): **+6.0pp** (规模效应 5.5pp + utility mix 0.5pp)
- 周期性 (cycle 下行时消失): **+8.0pp** (LNG 大项目 mix 3.5pp + 供给紧张定价权 3.5pp + close-outs 1pp)

**管理层自己已经承认了周期性的存在**:
- FY26 guidance "upper 20s" (~28%) = 主动承认 FY25 29.4% 含 1.4pp 不可持续 (close-outs + 部分定价权)
- Q4 FY25 GM 31.4% (record) 明确披露含 **100bps 一次性 favorable close-outs**
- FY26 Q1 GM 已经从 Q4 FY25 的 31.4% 回落到 28.4% (-300bps QoQ)

**对 EPS 的敏感度** (revenue 保持 $1.1B):
| 情景 | GM | EPS | PE @ $240.97 |
|------|-----|-----|-------------|
| FY25 实际 (含 close-outs) | 29.4% | $5.13 | 47x |
| FY26 guide (upper 20s) | 28.0% | $4.81 | **50x** |
| Mild cycle down (-3pp from FY25) | 26.4% | $4.42 | 55x |
| Moderate cycle down (-4.5pp) | 24.9% | $4.07 | 59x |
| Deep cycle (仅保留结构性 +6pp) | 22.0% | $3.38 | **71x** |

---

## 2. 季度 GM 序列 (8 季度, 已观察到 peak)

| 季度 | 日期 | GM | GP ($M) | Revenue ($M) |
|------|------|-----|---------|--------------|
| FY24 Q2 | 2024-03 | 24.6% | 62.7 | 255.1 |
| FY24 Q3 | 2024-06 | 28.4% | 81.7 | 288.2 |
| FY24 Q4 | 2024-09 | 29.2% | 80.4 | 275.1 |
| FY25 Q1 | 2024-12 | **24.7%** | 59.5 | 241.4 |
| FY25 Q2 | 2025-03 | 29.9% | 83.4 | 278.6 |
| FY25 Q3 | 2025-06 | 30.7% | 87.9 | 286.3 |
| **FY25 Q4** | **2025-09** | **31.4%** | **93.5** | **298.0** (Peak) |
| FY26 Q1 | 2025-12 | **28.4%** | 71.4 | 251.2 |

**观察**:
- FY24 Q2 → FY25 Q4 = GM +680bps 在 6 个季度内 (陡峭上升)
- FY25 Q4 → FY26 Q1 = GM **-300bps QoQ** (peak 已过, 开始回落)
- 但 FY25 Q1 vs FY26 Q1 = 24.7% → 28.4% (+370bps YoY) (基础仍在改善)
- Q1 季节性偏弱 (营收最低), 但 GM 差异很大 (FY25Q1 24.7% vs FY24Q4 29.2%) → GM 对 revenue 敏感 = 产能杠杆效应大

---

## 3. 产能杠杆硬数据 (员工 vs 营收)

| Year | Revenue ($M) | Employees | Rev/Emp ($K) | GP/Emp ($K) |
|------|-------------|-----------|--------------|-------------|
| FY21 | 471 | 1,892 | 249 | 40 |
| FY22 | 533 | 1,935 | 275 | 44 |
| FY23 | 699 | 2,363 | 296 | 62 |
| FY24 | 1,012 | 2,748 | 368 | 99 |
| **FY25** | **1,104** | **3,143** | **351** | **103** |

**5年累计**: Revenue **+135%** | Employees **+66%** | Rev/Emp **+41%** | **GP/Emp +158%**

**重要观察**:
- Rev/Emp 从 FY24 的 $368K 回落到 FY25 的 $351K = FY25 招聘超过营收增长, 产能利用率开始反转
- 员工 +66% vs 营收 +135% 说明结构性杠杆真实 (间接成本摊薄)
- 但 GP/Emp +158% 远超 Rev/Emp +41% 意味着 GM 扩张的主体不是纯粹的产能杠杆, 还含周期性因素

---

## 4. Margin Bridge 详细归因 (+13.4pp)

### 4.1 结构性 (+6.0pp, 可持续, 穿越周期)

#### 规模效应 / 产能利用率 **+5.5pp**
- **证据**: Revenue 从 FY22 $533M → FY25 $1,104M (+107%), Employees 仅 +62%
- **机制**: 厂房+设备+监管+行政间接成本相对固定, 营收放大摊薄单位成本
- **持续性**: 只要营收不大幅下滑 (>20%), 这部分保留
- **反面**: FY22 员工 1,935 → FY23 2,363 (+22%) 的招聘早于营收爆发, 说明管理层提前扩员已经完成, 未来 Rev/Emp 还有上升空间但不会复刻 FY23-24 的 trajectory

#### 产品 mix — Utility 利润率 **+0.5pp**
- **证据**: Electric Utility FY25 +50% YoY, 占比 25%
- **机制**: 电力公用事业项目标准化程度高 + 合同结构更稳定 → 边际利润通常高于油气 EPC
- **持续性**: 结构性, 只要 utility capex cycle 继续
- **反面**: Utility 毛利高于基础油气, 但仍低于大型定制 LNG 项目; mix 影响有限

### 4.2 周期性 (+8.0pp, cycle 下行时消失)

#### LNG 大项目 POC mix **+3.5pp**
- **证据**: FY24-FY25 LNG 单项目 ≥$100M 密集爆发 (墨西哥湾出口终端)
- **机制**: 大型 EPC 项目采用 percentage-of-completion (POC) 收入确认, 项目后期边际利润率显著高于前期 (前期成本确认多, 后期利润集中兑现); 大规模单项目本身利润率也高于小批量定制
- **持续性**: 周期性 — 依赖 LNG 终端项目管线 (2026-2030 美国 LNG 出口扩张周期), LNG CapEx 结束后新签项目减少 → GM 回落
- **反面**: LNG cycle 可能持续 3-5 年 (管理层口径), 但这本身就是周期性标签

#### 供给紧张期定价权 **+3.5pp**
- **证据**: 开关柜交付期 36 个月 (当前); POWL 能 full pass-through 成本 + 定价 up; FY22 时交付期 <12 个月 → 没有溢价
- **机制**: 需求 > 供给 → POWL 议价力上升 → 订单 backlog 含更高 margin
- **持续性**: Eaton $30M Omaha 扩产 2027H1 量产 + Schneider/ABB 扩产启动 → 紧张期在 2027-2030 内缓解 → 定价权回落
- **反面**: POWL 自己 Houston 扩产 $12.4M/+62% 2026 Q4 完工, 若自己产能上来但需求不跟, 定价权也会回落

#### 项目 close-outs **+1.0pp**
- **证据**: 管理层明确披露 FY25 Q4 GM 31.4% 中含 100bps favorable close-outs
- **机制**: 大项目收款时如果实际成本低于 POC 估计, 产生 true-up 利润
- **持续性**: 非 run-rate, 波动性事件
- **反面**: 未来可能正可能负 (如果成本超预算 → negative close-outs)

### 4.3 Residual (-0.6pp)

差额可能含研发投入 (R&D/Rev 从 FY22 1.3% → FY25 1.0%, 有小量摊薄)、运费、保修费等细项, 数据不可细分。

---

## 5. 稳态 GM 情景表 (revenue 保持 $1.1B, tax 22%, shares 36.5M)

| 情景 | GM | Δ vs FY25 | EPS | PE @ $240.97 | 隐含价格 (PE 30x) |
|------|-----|-----------|-----|-------------|-----------------|
| Peak (FY25 Q4) | 31.4% | +2.0pp | $5.61 | 43x | $168 |
| FY25 full year (含 close-outs) | 29.4% | 0 | $5.13 | 47x | $154 |
| **FY26 mgmt guide (upper 20s)** | **28.0%** | **-1.4pp** | **$4.81** | **50x** | **$144** |
| Mild cycle down | 26.4% | -3.0pp | $4.42 | 55x | $133 |
| Moderate cycle down | 24.9% | -4.5pp | $4.07 | 59x | $122 |
| **Deep cycle (仅结构性)** | **22.0%** | **-7.4pp** | **$3.38** | **71x** | **$101** |
| FY22 baseline | 16.0% | -13.4pp | $1.97 | 123x | $59 |

**反向测试**: 维持当前 $240.97 + 合理 PE 30x 需要 EPS = $8.0, 相当于 FY28E 分析师预测值, 意味着 **市场已经把 FY28 预期完全折进当前价**。

---

## 6. 对 Phase 1-5 分析的含义

### 6.1 对 Thesis 的强化
**Lens 1 确认**: "POWL 是周期 peak 位置的小盘工业股 + AI optionality"
- GM 29% 已过 peak (FY25 Q4 31.4% → FY26 Q1 28.4%)
- 管理层自己的 guide 28% = 承认 1pp 不可持续
- 结构性稳态 GM ≈ 22-25% (FY22 base 16% + 结构性 6pp), 比当前 29% 低 5-7pp
- Revenue 不需要下滑, 只需 cycle 正常化 → EPS 下滑 15-20%

### 6.2 对估值的数字化锁定
- **保守情景 (FY26 guide 28% 长期稳态) + 历史 PE 18-25x**: 合理价 $87-120
- **基准情景 (cycle 周期 3-5 年 peak, 然后 3pp 回落) + blended PE 22x**: 合理价 $100-140
- **乐观情景 (结构转型成功, 28% 成为新 normal) + PE 25-30x**: 合理价 $120-145
- **当前 $240.97 只有在 FY28 EPS $8+ 兑现 + 长期 PE 30x 才 justify**
- SOTP 混合体估值 (Lens 1): $130-180 (见 Phase 0 shared_context v2)

### 6.3 Kill Switch v3 强化 (新增)
- **R1 新增**: GM 连续两季 ≤27% (低于 FY26 guide) → 周期下行确认, 管理层未能 guide 达标
- **R2 新增**: FY26 Q2/Q3 GM 继续 <29% 且 revenue YoY 增速 <5% → 定价权窗口关闭 + 周期下行同步
- **U1 新增**: GM 持续 ≥29.5% 两季以上 + revenue 加速 >15% YoY → 确认结构性新 normal, 值得 PE 重估

### 6.4 R-1 财务归因瀑布 (可直接用于 Phase 2)
```
FY25 GM 29.4%
  + 规模效应/产能利用率 (结构性) → +5.5pp
  + 产品 mix Utility (结构性)      → +0.5pp
  + LNG 大项目 POC mix (周期性)    → +3.5pp
  + 供给紧张定价权 (周期性)        → +3.5pp
  + FY25 Q4 project close-outs   → +1.0pp
  - Residual                     → -0.6pp
FY22 GM 16.0%
```

### 6.5 Phase 1-4 写作时的关键反面条件 (铁律 N)
- 论点: "POWL margin 扩张是结构性的"
- 反面: "结构性仅 6pp, 周期性 8pp; Q4 FY25 peak 31.4% 后 Q1 FY26 已经 -300bps QoQ"
- 论点: "POWL 定价权是护城河"
- 反面: "定价权来自供给紧张 (+3.5pp), Eaton 2027H1 量产 + POWL 自己 2026 Q4 扩产 → 2027-2028 定价权窗口缩窄"
- 论点: "POWL 数据中心订单扩张将填补 LNG cycle 下行"
- 反面: "DC 当前仅 backlog 15% + FY25 营收 2.4%, 短期内规模不足以填补 LNG 37% 基本盘"

---

## 7. 新增 DM 锚点 (供 Phase 1-5 引用)

- [DM-GM-001] FY22 GM 16.0% → FY25 GM 29.4% = +13.4pp 扩张
- [DM-GM-002] FY25 Q4 GM **31.4% (历史 peak)** 含 **100bps 一次性 favorable close-outs** (管理层披露)
- [DM-GM-003] FY26 Q1 GM 28.4% = Peak Q4 -300bps QoQ, 但 YoY vs FY25 Q1 的 24.7% 仍 +370bps
- [DM-GM-004] 管理层 FY26 full-year GM guidance = "upper 20s" ≈ 28%
- [DM-GM-005] Margin Bridge 结构性 +6.0pp (规模 5.5 + utility mix 0.5) vs 周期性 +8.0pp (LNG 3.5 + 定价权 3.5 + close-outs 1.0)
- [DM-EMP-001] 员工 FY21 1,892 → FY25 3,143 (+66%) vs Revenue +135% = 产能杠杆真实
- [DM-EMP-002] Rev/Emp 从 FY24 $368K 回落到 FY25 $351K = FY25 招聘超前, 产能杠杆开始反转
- [DM-EMP-003] GP/Emp FY21 $40K → FY25 $103K (+158%) 远超 Rev/Emp +41% = GM 非纯产能杠杆驱动

---

## 8. 引用来源

- [POWL Q4 FY25 earnings call: GM 31.4% 含 100bps close-outs](https://finance.yahoo.com/quote/POWL/earnings/POWL-Q4-2025-earnings_call-367000.html)
- [POWL Q4 FY25 press release: 29.4% FY + 240bps YoY](https://powellindustriesinc.gcs-web.com/news-releases/news-release-details/powell-industries-announces-fourth-quarter-and-full-year-0)
- [BeyondSPX: POWL margin inflection 分析](https://beyondspx.com/quote/POWL/margin-inflection-meets-market-diversification-at-powell-industries-nasdaq-powl)
- [Seeking Alpha: POWL FY26 gross margin upper 20s guide](https://seekingalpha.com/article/4852015-powell-industries-record-margins-and-strong-backlog-set-up-a-solid-fy2026)
- [AInvest: POWL 2.4B backlog setup](https://www.ainvest.com/news/powell-industries-record-margins-1-4-billion-backlog-signal-strong-setup-fiscal-2026-growth-2512/)

---

## 9. 下一步 Phase 0 深化候选

- ☑ Margin Bridge (已完成)
- ☐ LNG cycle 时间线深化: 美国 LNG 终端项目管线 (Sempra/Venture Global/Tellurian/NextDecade 等), POWL 在几个终端?
- ☐ 内部人交易深化: 2026 Q1 disposed 具体是谁(CEO/CFO/董事?)
- ☐ 最相似可比 forensic: ETN 产能扩张时间线 + Schneider/ABB 北美 switchgear 订单

建议下一步: **LNG cycle 深化** — 因为 POWL 51% 营收来自油气+石化, LNG 是基本盘可持续性的最关键变量, 而 Jacintoport 扩产明确押 LNG。
