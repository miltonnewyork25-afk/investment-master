# FTAI Aviation — Phase 1 Findings (循环深挖产出)

> **目的**: 围绕P0.5识别的3个第一关键变量 + H1/H3高alpha假说, 执行4层循环深挖(数据→机制→含义→证伪)
> **日期**: 2026-04-20
> **锚点假说**: H1 (FTAI应像TransDigm估值 PE 30-40x) + H3 (56x PE驱动是稀缺性溢价)
> **覆盖变量**: 变量1 (2026模块交付1,050目标) + 变量3 (Aerospace Products margin 36%→40%)
> **未覆盖**: 变量2 (2026 FCF trajectory) → 留给Phase 2财务归因深挖

---

## 关键发现 #1: 模块交付的季度trajectory + Rome工厂的激进爬坡风险

### L1 数据层 — 硬事实

**2025年实际交付 vs 目标 (逐季)**:
- 2025 FY: **757 modules** (beat 750 target by +1%) [DM-OPS-001]
- 季度分解:
  - Q1-Q2 2025 合计: ~322 (隐含avg 161/Q) [DM-OPS-002]
  - Q3 2025: **207 modules** (+29% QoQ) [DM-OPS-003]
  - Q4 2025: **228 modules** (+10% QoQ) [DM-OPS-004]
- 工厂分解:
  - Montreal: **377 modules** (core facility) [DM-OPS-005]
  - Miami: **275 modules** (capacity 600 = 46% utilization) [DM-OPS-006]
  - Rome: **105 modules** (mid-year 2025 acquired, Q2-Q4 ramp only) [DM-OPS-007]

**2026年目标 (管理层指引)**:
- FY 2026 target: **1,050 modules** (+39% YoY) [DM-OPS-008]
- 工厂分配:
  - Montreal: 525 (+39% YoY)
  - Miami: 325 (+18% YoY, to 54% utilization)
  - Rome: 200 (+90% YoY, first full year)
- 需要Q1 2026 ≥ ~220 to stay on track (财报日期未披露, 预计5月初)

**隐含不对称**: Montreal/Miami增幅温和(+18-39%), Rome需+90% — **Rome是最大执行风险点**

### L2 机制层 — 为什么需要+39%增长, 瓶颈在哪

- **为什么必须+39%**:
  - (a) CFM56 aftermarket周期2024-2028是黄金窗口 (前期机队老化, 后期LEAP-1A/B替代加速) — **time-limited opportunity**
  - (b) 在AAR/HEICO加大CFM56投入前建立capacity优势 (Q4 2025 AAR宣布Cebu Pacific CFM56 nacelle MRO合同 = 竞争信号)
  - (c) SCI ($3B announced) 资本投入need justification — **产能利用率是SCI fee stream兑现的先决条件**
  - (d) 单模块经济学($886K EBITDA/模块, 见发现#2) 要求规模放大才能摊薄固定成本
- **瓶颈识别**:
  1. **Feedstock**: 757模块需要~189台CFM56 engines拆解 (每台=4 modules). 2026需要~262台 (+38%). 二级飞机市场价格如果上涨 → feedstock成本侵蚀margin
  2. **Rome工厂ramp**: 从半年105 → 全年200不仅是"年化"问题. 90% YoY增幅需要people hiring + 工艺熟练度 + 质量控制同时到位
  3. **PMA批准**: 模块数量不直接受PMA限制(可以用原厂零件), 但margin扩张依赖PMA
  4. **客户接收能力**: 模块销售需要客户MRO slot, 不能"堆库存" → 需求端约束

### L3 估值含义层 — 每模块经济学与情景测算

**单模块经济学** (inferred from 2025 data):
- 2025 Aerospace Products EBITDA: **$671.3M** (+76% YoY vs $381M 2024) [DM-VAL-001]
- 2025 Aerospace Products Revenue: estimated $1.86B (from 36% EBITDA margin)
- **EBITDA per module: $671M / 757 = $886K** [DM-VAL-002]
- **Revenue per module: $1.86B / 757 = $2.46M** [DM-VAL-003]
- 管理层指引: "potential to exceed $1M EBITDA per visit longer term" = 从$886K→$1M+ = **+13%单模块扩张空间**

**三情景2026 EBITDA测算**:
| 情景 | 模块数 | EBITDA/模块 | 2026 EBITDA | vs管理层$1.05B |
|-----|-------|------------|-------------|---------------|
| 悲观 | 900 (Rome miss) | $886K | $797M | -24% |
| 中性 | 1,000 | $950K | $950M | -10% |
| 乐观 | 1,050 | $1,000K | **$1,050M** | **0% (达成)** |
| 超乐观 | 1,100 | $1,050K | $1,155M | +10% |

**关键信息**: 管理层$1.05B target需要"量+价+margin"**三重同时达成**. 历史趋势(量+1%超预期)支持量端达成, 但**价+margin扩张依赖PMA批准和mix改善** — 这两个是binary events, 不是线性推演.

### L4 证伪层 — 什么会打破这个逻辑

**证伪条件 (严重度排序)**:
1. **Rome工厂ramp-up失速** (高概率): 如果Q1-Q2 2026 Rome月度产出<15 modules (full year <180) → 全年总交付<1,020, 管理层目标miss
2. **Feedstock供应瓶颈** (中概率): 如果二级CFM56-powered aircraft市场价格+20%以上(737 Classic/A320 Classic供给有限), FTAI internal transfer price下降 → Aviation Leasing IRR恶化, 整体ROIC下降
3. **PMA批准延迟** (中概率): FAA审批不可控. 影响margin路径, 不直接影响模块数
4. **客户MRO slot饱和** (低概率): 目前CFM56 fleet ~8,800台, 年度modules需求远超FTAI产能 — 需求端不是瓶颈
5. **AAR/HEICO直接进入模块业务** (2-3年中概率): AAR Cebu Pacific合同虽然是nacelle MRO (不是module), 但显示AAR正渗透CFM56客户关系

**追踪指标 (P2/P3回看)**:
- **Q1 2026 earnings (5月初)**: Q1模块交付 ≥230=强 / 200-230=中 / <200=警示
- **Montreal月度产出**: 超过45/月=on track / 低于40=Rome压力增大
- **Feedstock投资** (CapEx replacement line): Q1 2026若>$90M = feedstock成本上升信号

**收敛判断**: Layer 4产生了新维度 (feedstock供应瓶颈+AAR竞争信号), 非Layer 3的同义改写. 继续深挖Layer 5可能? — 进入具体客户订单簿(SCI LP认购合同) 但P1范围外. **收敛于Layer 4**.

**对评级的影响**: 量端基本面成立, 但1,050目标达成率应在70-85%概率(非管理层隐含的90%+). 如果用80%概率加权 → 期望2026 EBITDA约$980M (vs目标$1.05B), 估值基础下修7%

---

## 关键发现 #2: Margin 34-36%稳态 vs 40%目标的跨越缺口

### L1 数据层 — 季度margin trajectory

**Aerospace Products EBITDA margin quarterly**:
- Q3 2024: **34%** [DM-FIN-001]
- Q1 2025: **36%** (ex-third-party contracts: 38%) [DM-FIN-002]
- Q2 2025: **34%** (EBITDA $164.9M) [DM-FIN-003]
- Q3 2025: **35%** (EBITDA $180.4M, +77% YoY) [DM-FIN-004]
- Q4 2025: **35%** (EBITDA $195M) [DM-FIN-005]
- FY 2025: **36%** ($671M EBITDA) [DM-FIN-006]
- **FY 2026 target: ~40%** ($1.05B EBITDA, implied revenue $2.625B)
- **Upside scenario (管理层提及)**: "potential to expand to 50% as remaining PMA parts approved"

**关键观察**: 2025年季度margin在**34-36%区间稳定**, 不是上升trajectory. Q4 228模块 vs Q1~161模块 (+42%量), 但margin从Q1 36% → Q4 35% (**反而-1pp**)

### L2 机制层 — 为什么34-36%是稳态, 40%需要什么

**稳态的三个驱动力解构**:
- **规模效应**: Q1→Q4量+42%但margin不扩张 — 说明规模效应**已基本兑现**. 工厂固定成本摊薄空间有限. 这与制造业经验一致: 达到65-75%产能利用率后scale效应曲线趋平
- **Mix效应**: Q1 2025 margin 36%整体 vs 38% ex-third-party → 第三方合同(SCI相关管理服务)**拖margin 2pp**. 如果SCI规模扩大, 这个drag可能**持续甚至扩大** — 稀释40%目标
- **定价权 (PMA杠杆)**: PMA approvals是主要扩张杠杆. 管理层路径: 36%→40%→50% 对应PMA批准进度
- **36%稳态的经济含义**: "规模+mix"贡献已到顶, 36%→40%的4pp跨越**全部依赖PMA** (binary event不是线性进化)

**PMA机制 (推断)**:
- PMA (Parts Manufacturer Approval) = FAA授权第三方生产与原厂零件等效的航空零件
- 每个PMA批准 = FTAI可绕开CFM / GE的OEM零件, **成本下降40-60%**
- 但需要工程文件 + FAA测试 + 客户接受 (Airlines conservative)
- 审批周期: 18-36个月 per part
- 2026年40% margin = 假设**关键PMA组合在1-2年内批准**

### L3 估值含义层 — 与TDG/HEICO对标和H1/H3假说验证

**行业margin benchmark (EBITDA margin)**:
- **AAR Corp (aftermarket)**: **12.0-12.4%** (Q3-Q4 FY2025) [DM-COMP-001]
- **HEICO**: ~25-28% (aftermarket segment)
- **TransDigm (TDG)**: **55%+** (proprietary aftermarket parts leader)
- **FTAI (current)**: **36%**
- **FTAI (2026 target)**: **40%**
- **FTAI (管理层upside)**: **50%**

**对H3(稀缺性溢价)的验证**:
- FTAI 36% margin = **3倍于AAR (12%)** — 这是H3最硬证据. 垂直整合+PMA组合**确实**带来结构性margin优势
- 即使margin口径有差异(AAR包含低margin服务业务), 差距大到不可能是会计噪音
- **但** AAR已开始进入CFM56 MRO (Cebu Pacific合同) — **稀缺性有2-3年保质期**, 不是永续

**对H1(像TDG估值)的验证**:
- FTAI 36% vs TDG 55% = 差**19pp**. FTAI更接近HEICO (25-28%)而非TDG
- 即使达成40%目标, 仍 **距TDG 55% 有15pp差距**
- 这意味着 **H1的"像TDG估值"是错位的** — 合理锚是HEICO (PE 40-45x currently)而非TDG (PE 30-40x)
- 但H1的方向是对的: FTAI不应像AAR (PE 10-12x) 或WLFC (PE 5x)估值

**估值含义(两情景)**:
| 情景 | Margin达成 | 合理PE锚 | 对应公允价值 (Forward EPS $7.7) |
|-----|-----------|---------|--------------------------------|
| 达成40% | 部分兑现H3 | HEICO锚 40x | $308 (+19% vs $259) |
| 维持36% | H3减弱 | 介于HEICO/AAR 30x | $231 (-11%) |
| 突破50% | 完全兑现H3 | TDG锚 38x | $293 (+13%) |

**关键反直觉**: 即使达成管理层40% target, 按HEICO 40x给估值 = **+19% upside**. 这不是"被明显低估", 而是"**合理估值已price-in 40% margin**"

### L4 证伪层 — 稀缺性溢价的时间限制和竞争稀释

**证伪条件**:
1. **AAR/HEICO加大CFM56 module业务投入** (2-3年高概率):
   - 已发生信号: AAR Cebu Pacific CFM56 nacelle MRO合同 (Q4 2025)
   - 注意: "HEICO pauses to integrate acquisitions → AAR获得空间" = **竞争格局正在重新分配**
   - 2-3年内若AAR推出competing module factory → FTAI margin premium稀释
2. **PMA批准延迟** (中概率, 不可控): FAA审批2024-2026 backlog严重, 每延迟6个月 = 40% margin推迟6个月
3. **SCI第三方合同dilute持续** (高概率): 第三方管理费business model天然低margin. SCI规模越大, 这部分dilute可能越大
4. **CFM56机队退役加速** (2030+概率上升): LEAP-1A/1B替代速度若超预期 → aftermarket需求提前下行

**追踪指标 (P2/P3回看)**:
- **Q1 2026 Aerospace margin**: ≥37%=强 / 35-37%=中 / <35%=警示
- **FAA PMA季度批准公告**: FTAI披露的新PMA数/季度
- **AAR CFM56相关订单增速**: AAR quarterly earnings中aftermarket engine services growth
- **SCI fee revenue占比**: 2026-2027 Aerospace segment第三方contracts revenue绝对值

**收敛判断**: Layer 4新维度(AAR竞争稀释时间表+PMA binary nature+SCI dilute机制) 非Layer 3重述. Layer 5可能探索具体PMA部件清单但超P1范围. **收敛于Layer 4**.

**对评级的影响**:
- H3**部分验证** (36% vs 12% gap真实) 但**保质期2-3年**
- H1**方向对但锚点错** — 应对标HEICO (40x)而非TDG (30-40x)
- 按达成40% margin + 40x HEICO PE锚 = $308 (vs 当前$259 = +19%) — **这是"合理偏低"不是"深度低估"**

---

## 综合判断 — P1对评级的输入

### H1/H3假说验证状态更新

| 假说 | P0.5状态 | P1验证后状态 | 变化 |
|-----|---------|------------|------|
| H1 (像TDG估值) | 未验证 | **部分验证, 但锚点应是HEICO不是TDG** | margin gap (36% vs 55%) 证明TDG锚偏高 |
| H3 (稀缺性溢价) | 未验证 | **验证真实存在 (36% vs AAR 12%=3x), 但保质期2-3年** | AAR进入是削弱信号 |

### 关键变量P1结论

| 变量 | P0.5预期 | P1验证 | 对评级方向 |
|-----|---------|-------|-----------|
| 变量1 (2026模块1,050) | 待验 | 70-85%达成概率 (Rome风险) | 量基本成立 |
| 变量3 (margin 36%→40%) | 待验 | 跨越依赖PMA, 非线性推演 | 40% ≠ 必然 |
| 变量2 (FCF trajectory) | 待验 | P2深挖 | 未动 |

### 估值含义初步 (P1 baseline, P2再细化)

- 若达成1,050 modules + 40% margin = $1.05B EBITDA → **管理层target完全兑现**
- 按HEICO 40x Forward PE锚 = **$308 fair value (+19% vs $259)**
- 但**当前21.6x EV/EBITDA已price-in绝大部分达成** → 安全边际有限
- **初步评级倾向**: "**关注**" (+10-30%期望回报) 而非"深度关注" (+30%+)
- 待P2 FCF验证 + P3竞争深挖后最终确认

### Phase 2 优先问题清单

1. 2025 Q4 FCF具体数字 + 2026 Q1 FCF trajectory guidance (如果已披露)
2. 财务归因: $671M Aerospace EBITDA的Module vs MRE vs PMA分解
3. Aviation Leasing的independent IRR (剥离内部transfer price) — 验证H4 feedstock套利
4. SCI第三方revenue的margin profile (验证是否dilute整体)
5. 毛利率Bridge: Q4 2024 16.6% → Q4 2025 35% 的分解 (规模/mix/PMA各贡献pp)

### Phase 3 优先问题清单

1. AAR CFM56业务扩张速度 + 潜在module factory投入
2. HEICO integration完成后时间表 (何时重启aggressive acquisition)
3. Standard Aero / MTU Aero Engines在CFM56 module的竞争定位
4. CFM Materials Agreement续约风险 (2030+)

### Phase W Pivot Gate预告

P2末应重点检验以下failure points是否被强化/削弱:
- **FP2 (DIO+132天 vs margin +19pp)**: P1发现margin其实是34-36%稳态, margin扩张+19pp实际对比的是Q4'24 16.6% → Q4'25 35% = 规模效应一次性释放. 修正旧图式过早做"持续扩张"预期
- **FP3 (PE 56x vs WLFC 5x)**: P1确认36% vs AAR 12% = 3倍margin差**真实**. FP3的11倍估值差距**有基本面支撑** — 但保质期2-3年

---

**End of Phase 1 Findings** — 下一步: Phase 2 围绕FCF trajectory + 财务归因 + 剪刀差做深挖. 触发铁律W P2末Pivot Gate.
