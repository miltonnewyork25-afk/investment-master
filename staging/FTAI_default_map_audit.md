# FTAI Aviation — Default Map Audit (铁律S-1产物)

> **目的**: 在下笔新thesis之前, 先把"市场默认把FTAI当什么看"写稳, 然后找出这张默认地图解释不通的具体事实。
> **日期**: 2026-04-20
> **产出规范**: 铁律S-1 (≥800字符, ≥2个failure_points, 每个失灵事实带具体数字+来源)

---

## 1. 市场默认地图 (Market Default Definition)

### 1.1 市场默认把FTAI当什么

**"航空租赁+航空产品的混合成长股, 管理层execution型compounder"**

- 一级标签: Industrials / Rental & Leasing Services (GICS分类)
- 二级标签: "Aerospace aftermarket playbook" — 低估航空后市场的高增长标的
- 隐含身份: 像AerCap (AER) + 少量TransDigm (TDG) — 以租赁收入为基, Aerospace Products是增长加速器
- 类比框架: "Compounder in mid-expansion — ROIC improving, EBITDA doubling, just execute"

### 1.2 市场默认变量 (Wall Street实际盯的指标)

按重要性排序:

1. **调整EBITDA增速** — 2025 FY +138% YoY, 2026指引$1.4B (从$1.25B上调). 市场最关心的数字
2. **Aerospace Products segment EBITDA** — 2025 FY $671M / 36% margin, 管理层2026目标$1.05B / 40% margin
3. **Module交付数** — Q4 2025 = 228个 (+68% YoY), 2026目标1,050个 (+39% vs 2025 FY)
4. **ROIC** — 6.7% (2022) → 16% (2025). "资本效率正在改善"
5. **管理层guidance上调频率** — 年度指引在2025/2026都上调过, 视为信心信号
6. **CFM56 aftermarket TAM占比** — 25% target in $25B TAM, 当前<5% (最大想象空间)

**注意**: 市场不太盯的但应该盯的 — FCF、DIO、Owner PE(SBC调整后)、单模块unit economics

### 1.3 市场默认估值语言

**EV/EBITDA倍数法** (主流):
- 当前EV/EBITDA ≈ 21.6x (2025 FY) , 历史16.6x
- 同行航空租赁平均: AER 6-8x, AL 8-10x, WLFC 5-6x
- 同行航空后市场平均: TDG 20-22x, HEI 25-28x, MOG.A 12-15x
- 市场给FTAI 21.6x = **"向TDG/HEI的后市场估值靠拢, 因为Aerospace Products比重上升"**

**PE倍数法** (次要参考):
- GAAP PE 56x / Forward PE 21.1x
- 市场主要看Forward PE 21.1x — "如果2026 EPS指引实现, 估值合理"
- 56x被视为"过渡期GAAP被折旧+SBC压制"

**完全不用的方法**:
- SOTP (虽然两个分部门逻辑不同)
- 有限寿命DCF (虽然CFM56有退役曲线)
- 期权定价 (虽然FTAI Power是明确option)

### 1.4 市场默认叙事 (一句话版本)

> "FTAI正在从'航空租赁商'转型为'CFM56后市场垂直整合者', 2025-2028是转型兑现期, 管理层指引上调+内部人买入给出正向信号, 应该像TDG/HEI那样估值。"

---

## 2. Failure Points — 旧地图解释不通的具体事实

### Failure Point 1: FCF连续3年-$1B级负值 vs 管理层"self-funding compounder"叙事

**fact**: 2023 FCF = -$720M; 2024 FCF = -$1,340M; 2025 FCF = -$1,063M。三年累计-$3.1B自由现金流。同期管理层持续宣称"capital-light asset management model + 自我造血的复利机器"。

**为什么旧地图失灵**:
- "Compounder"隐含意义: 经营产生正FCF → 再投资 → 更多正FCF. 巴菲特式.
- 如果FTAI是compounder, 三年累计-$3.1B应该来自可解释的"战略投资期前端成本"(类似ASML研发, Amazon fulfillment), 但这些通常伴随**可验证的单位经济学盈利**
- FTAI的模块业务**单位经济学从未公开披露** — 无法判断是"健康的前端投入"还是"资本金吸纳"
- 融资来源: Strategic Capital Initiative $2B equity + $2.5B debt = $4.5B新资本 (约等于3年累计负FCF). 这种现金流结构更像"资本募集+前端扩张", 而非compounder

**DM锚点/来源**: 10-K 2023/2024; Q4 2025 earnings release; SCI announcement

**反方考量**:
- 航空制造业本身资本密集, 早期负FCF正常 (类似GE Aviation早期)
- 管理层2026 FCF指引$915M如果实现, 叙事成立

---

### Failure Point 2: DIO恶化+132天 (120→252天) vs 毛利率**同期**改善+19pp

**fact**: Days Inventory Outstanding 2022年120天 → 2025年252天(+132天). 同期Aerospace Products EBITDA margin从16.6% (FQ4'24) 改善到36.1% (FQ2'26). 库存从$317M (2023) → $1,194M (2025), 3年+277%.

**为什么旧地图失灵**:
- 航空"租赁"这个范畴**根本没有"DIO"概念** — 租赁商的库存是租赁飞机, 不是待售零件
- 如果用制造业范畴: DIO恶化+132天 **通常伴随毛利率压力** (库存老化 → 减值 → GM下行). 历史上TransDigm/HEICO任何DIO恶化时段GM都同步承压
- FTAI出现"DIO恶化+毛利率改善"的反向组合 → 这**不是普通制造业**, 而是"战略库存囤积"或"定价权极强可以消化库存成本"
- 旧地图("航空租赁+航空产品的成长股")对这个组合**没有解释工具**

**DM锚点/来源**: 10-K 2022-2025 balance sheet; quarterly earnings EBITDA margin progression

**反方考量**:
- 2026年1,050模块目标需要大量feedstock预储, 所以2025年囤积是"准备2026"
- 如果2026年模块交付执行到位, DIO会自然回落

---

### Failure Point 3: PE 56x vs 最相似可比WLFC PE 5x — 11倍差距

**fact**: FTAI GAAP PE 56.21x (价格$259.13, 2026-04-17), Forward PE 21.11x. Willis Lease Finance (WLFC) — 唯一美股独立CFM56/V2500发动机租赁商 — PE约5x, P/BV约1.1x. WLFC总资产规模更大但市值仅~$1B (FTAI ~$26B). WLFC以60% NAV折价交易.

**为什么旧地图失灵**:
- 如果FTAI = "航空租赁+产品", 其中航空租赁业务(Aviation Leasing segment, 2025 EBITDA $609M)与WLFC**业务几乎一致** — 都是CFM56/V2500引擎租赁商
- 航空租赁部分按WLFC估值应该给**5x EV/EBITDA** → Aviation Leasing的fair value ≈ $3.0B
- 航空产品部分按TDG/HEI顶格给30x EBITDA → Aerospace Products ($671M EBITDA) fair value ≈ $20B
- SOTP合计: $23B, 接近当前市值$26B → 这意味着**当前价格"刚好"对Aviation Leasing给0-1x溢价, 对Aerospace Products顶格估值**
- 但主流Wall Street **不是这样算的** — 给整体21.6x EV/EBITDA = 混合估值. 这个混合估值比SOTP更高, 因为**隐含假设Aviation Leasing也值20x** — 这与WLFC的5x直接冲突
- 旧地图没有"为什么两家经营CFM56/V2500租赁的公司估值差11倍"的解释

**DM锚点/来源**: Market data 2026-04-17; WLFC 10-K; FTAI 10-K 2025 segment reporting

**反方考量**:
- WLFC可能被结构性低估 (治理问题、流动性差、家族控制)
- FTAI的Aviation Leasing与WLFC"看似一样"但有协同价值 — 它给Aerospace Products供应feedstock
- 如果是"垂直整合溢价", 11倍差距有机制但市场定价合理

---

### Failure Point 4: CapEx结构3:7 (维护:增长) — 不符合"成长期后期/compounder"模式

**fact**: 2025 CapEx $450M (或$752M, 不同披露口径). 其中维护CapEx $133M, 替换+增长CapEx $317M. 管理层2026-2028 CapEx指引$100-130M annually (即**下降70%**). 历史CapEx增速2023→2024→2025逐年上升.

**为什么旧地图失灵**:
- "Compounder"和"成熟成长股"通常有**稳定的CapEx/Revenue比例**和**维护占大头**(7:3左右)
- FTAI当前3:7比例 = **早期扩张期**, 不是**即将进入复利期**
- 管理层指引2026+ CapEx突然降到$100-130M (-70%) = **"扩张突然结束"叙事** — 这与"2030年实现25% market share of $25B TAM"的增长目标**不匹配**. 目标需要继续投入, 但CapEx说2026要降
- 可能的解释: (a) 大部分capacity已在2024-2025建成; (b) 2026+的增长主要来自内部产能利用率提升, 不是新投资; (c) 指引过度乐观
- 无论哪个解释, 都**不符合市场"执行型compounder"的叙事**

**DM锚点/来源**: 10-K 2025 CapEx disclosure; 2026 investor day guidance

**反方考量**:
- CapEx $100-130M是Aerospace Products的maintenance, 不含Aviation Leasing的飞机采购(通过SCI外部融资)
- "Asset-light转型"模式本来就是CapEx峰值后快速下降

---

### Failure Point 5: CEO Adams持股从$387万→$6,475万 (+16.7x) vs Q4连续miss

**fact**: Joseph Adams Jr. (CEO)持股价值从2020年$387万增长到2025年$6,475万 (+16.7x, 部分来自股价涨+部分来自增持). 2024/2025年A/D ratio持续偏买入(3-7倍). 同期Q4 2024 EPS miss 4.5% + Revenue miss 2.1%; Q4 2025 EPS miss 13.6% + Revenue miss 5.7%.

**为什么旧地图失灵**:
- 市场叙事处理"连续miss"的方式: "管理层execution有风险" → 降估值
- 但内部人行为信号与叙事**矛盾** — CEO持续净买入, 不是卖出
- 旧地图("execution型compounder")的**一致性预期**是: miss发生时内部人应谨慎或至少不显著买入
- CEO行为更像: "我相信长期故事, 不在乎季度噪音" — 这指向**更长时间尺度的定价机制**, 不是"季度execution"
- 旧地图没有解释"miss + 内部人买入"组合的机制

**DM锚点/来源**: FMP insider trading 2015-2026; Q4 earnings releases

**反方考量**:
- CEO薪酬结构可能有强制持股条款
- 大量持股增长来自股价上涨而非主动买入, 不是信号
- 或者: 内部人可能也错了

---

## 3. 如果继续用旧地图, 会被抹平的问题

**旧地图("航空租赁+产品的成长股, execute故事")下, 以下关键问题无法被问出, 从而估值会系统性忽略它们**:

1. **单模块经济学缺失的意义** — 旧地图把模块业务当"收入增速 × 毛利率", 不追问每个模块的cash-on-cash回报. 如果真实单模块经济学不好看, 旧地图发现不了
2. **CFM56生命周期对估值的制约** — 旧地图默认"永续增长", 不定价2030-2035年退役曲线. FTAI Power只是"option"而不是必需
3. **Aviation Leasing对Aerospace Products的**真正**作用** — 是feedstock套利(高ROI)还是负担(低ROI资产稀释整体回报)? 旧地图不需要回答, 但这决定了整体ROIC的分解
4. **"Strategic Capital Initiative"的本质** — 资产管理费收入(像黑石的fee stream)还是资本金吸纳(像Ponzi式扩张)? 旧地图把它当"成长加速器"不深究机制
5. **估值上限** — 旧地图没有"PE上限纪律"(铁律P教训). 21x Forward PE如果变成30x还买不买? 没有框架回答

**这5个被抹平的问题, 每个都可能是**让FTAI估值下修30%+或上修30%+的**关键变量**. 旧地图覆盖不了它们, 新地图必须能覆盖.

---

## 4. 为什么需要新地图 — 一句话

> 旧地图("航空租赁+产品的成长股")把FTAI当成"在航空后市场高增长中执行的compounder", 但负FCF+DIO恶化+PE 56x vs WLFC 5x+CapEx突然塌陷这4-5个失灵事实说明, FTAI真正的经济性质不是compounder, 而是**某种更复杂的垂直整合或有限寿命价值捕获结构** — 具体是哪种, 需要Phase 1-3用证据判断 (不在此处结论).

---

## 附录A: 可能的新地图候选 (详见 thesis_crystallization.md)

- 候选B: "CFM56 Module Manufacturing Specialist" (主业=Aerospace Products, 类比TDG)
- 候选C: "垂直整合航空售后帝国 — CFM56生命周期垄断" (Hybrid闭环)
- 候选D: "时间窗口价值捕获 — CFM56最后5-10年现金流提取" (有限寿命)

**哪一个最能解释5个failure points**, 需要Phase 1-3验证. P0.5不做结论, 只开窗.
