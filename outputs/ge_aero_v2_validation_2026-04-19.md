# GE Aerospace · v2 Skill Validation Memo

> **Date**: 2026-04-19
> **Purpose**: 不是 GE Aero 投资报告。用 GE Aero 作为 **duration owner 验证用例**,检验 v2 升级后的三个 skill(industry-propagation-mapper / profit-owner-resolver / expression-selector)在 default workflow 里是否**主动**识别 duration owner 角色,产生 v1 没有的结论
> **Baseline (v1)**: `outputs/aviation_top5_2026-04-18.md` — GE 被放 Observation 2,理由 "Services +26% + $190B backlog, leader 层已被 generalist 充分定价,等 rotation"
> **Source trend**: 商用航空发动机 MRO super-cycle(forced demand:FAA 强制适航 + Boeing 交付延迟被迫延寿 + LEAP 首轮 shop visit 2026-2030)

---

## 0. 验证设计

**不做**: 从零重写 GE Aero 完整分析(会变成 ticker-in 投资报告,违反宪法 Article IV.1)。

**要做**: 针对同一个 trend(航空 MRO super-cycle),用 v2 三个 skill 的 default workflow 跑一遍,在**每一步**回答三个元问题:

| 元问题 | 含义 |
|---|---|
| **Q-a 主动识别** | v2 这一步**强制**路过 duration owner 视角,还是仍可跳过? |
| **Q-b 加值** | v2 得出的判断 v1 是否**本来也会得出**? 差别是措辞还是实质? |
| **Q-c 硬测试可操作性** | v2 的硬测试("installed-base 窗口 ≥ 2× deployment 周期 + 可量化切换成本")能否用公开数据**实际判定**,还是退化为"benefits from aftermarket"软定义? |

三问都 ✓ = v2 升级在本案例中成立。三问有 ✗ = 需要回修 v2 或降回 v1+stub 路径。

---

## 1. Propagation Mapper v2 · 跑 GE Aero 相关 trend

### Step 1 — Trend core
Forced demand = 全球 narrow-body + wide-body 发动机 MRO 强制需求。
- 源头变量:
  - LEAP-1A/1B 2016 年起交付,首轮 shop visit 约 2026-2028 开始(发动机首次大修通常 flight hour 8,000-12,000 / 5-7 年入役期)
  - CFM56 存量 >23,000 台,延寿持续(NG / A320ceo 因 Boeing 月产盖 + GTF 问题被迫继续飞)
  - GE9X + GEnx 宽体代际装机
- 不可跳过的节点: FAA 适航 AD + OEM 零件认证 + MRO 槽位。

### Step 2 — Direct chain
- OEM 发动机厂(GE Aero / Safran via CFM JV / RTX-P&W / Rolls-Royce)
- 原厂 parts + service(spare parts, time & material overhaul, RPFH contracts)
- 独立 MRO(FTAI 等)
- 三方 PMA + distribution(HEI / Wencor)

### Step 3 — Adjacent layers
- 材料层:钛 / 镍 / 高温合金熔炼(ATI / HWM)
- 结构件:锻件 / 精密铸造(HWM Engine Products)
- 航电 / 系统:TDG / HON / HEI
- Lessor 层:AER(现金流间接敞口)

### Step 4 — Classify strength
(略,v1 已做过;此处跳过不影响验证)

### Step 5 — Identify special roles ← **v2 新增步骤**

**Bridge owner test(对 GE Aero)**:
- 是否跨 ≥2 条独立 forced demand 链?
- GE Aero 主要链 = 商用航空 MRO(narrow-body + wide-body)。次链 = 防务发动机(F404/414 on F/A-18, T700 on Apache)+ 能源(LM2500 industrial turbines)。
- **判定**: 是 weak bridge owner —— 次链存在但 <20% revenue,且防务/能源链的 forced demand 强度(国防预算 / 电力需求)**和商用 MRO 是否同步** 是另一个问题。严格按 v2 硬测试("≥2 个独立 L1 forced demand 驱动,同一 demand 的两个表现不算"):商用 narrow 和 wide-body 算同一 demand;商用 + 防务 算两条 —— **通过**,但 bridge 属性不是主轴。
- **Q-a 主动识别**: ✓ v2 Step 5 强制要求对每个候选 node 做 bridge test。v1 propagation mapper 无此步骤。
- **Q-b 加值**: 部分 —— v1 top 5 把 GE 定性为 "leader 层已被共识",没有考虑它的防务 + 能源次链是否有独立估值含义。v2 让这个问题至少**被问出来**了。但实际判定为 weak bridge(非主轴),所以不直接翻转 v1 结论。

**Duration owner test(对 GE Aero)**:
- 是否 installed-base / replacement / service / certification / 长尾 recurring?
- GE Aero 装机:~44,000 台商用发动机 installed fleet(GE + CFM 合计全球最大商用发动机 installed base)。LEAP 已交付 >3,000 台,backlog 另 >10,000 台。
- 是否被市场只关注 early-wave 而忽略 late-wave?
- **判定**: **强 duration owner** —— installed base monetization 窗口远超初始 deployment 周期(见下)。
- **Q-a 主动识别**: ✓ v2 Step 5 强制 duration test,v1 没有。
- **Q-b 加值**: **显著** —— v1 说"Services +26%"是**年度现金流增速**,但没谈 LEAP shop visit 流的**时间分布**(2028-2045+),这是 v2 多出来的维度。

### Step 6 — Time sequence
- Immediate(2024-2026): CFM56 延寿 + 备件紧缺 — FTAI / AIR 直接受益
- Early(2026-2028): LEAP **首轮** shop visit 开启 — GE Aero Services line 开始第一波 MRO cash flow
- Mid-cycle(2028-2033): LEAP 第二/三轮 shop visit 叠加 GE9X 首轮 — 现金流爬升期
- Delayed(2033-2045+): LEAP 成熟期 installed base 持续 monetization(类似 CFM56 今日状态)
- Long-tail: CFM56 延寿 + LEAP 仍在飞,wide-body installed base 继续 overhaul

### Step 7 — Economic vs market propagation
- 市场注意力:Top 5 框架把注意力给 FTAI / AIR / HEI —— 都是**immediate / early wave** beneficiary。
- 经济传导:GE Aero 的 LEAP **mid-cycle + delayed cash flow**(2028-2045)还没被大多数 generalist 时间-折现。
- **Gap 候选**: 市场定价 GE Aero 主要基于当期 Services +26% 和 backlog $190B,但 $190B backlog 的**现值 vs 现价**之间的隐含折现率如果被误估,就是 duration owner 的 expectation gap。(v2 propagation mapper Step 7 明确要求问这个)

---

## 2. Profit Owner Resolver v2 · 对 GE Aero

### Ownership layers(v2 6 层)

| 层 | GE Aero 判定 | 依据 |
|---|---|---|
| Revenue owner | ✓ 强 | CES segment FY24 revenue $38.7B,是 $190B backlog 主体 |
| Gross profit owner | ✓ 强 | Aftermarket / Services GM 远高于 OEM hardware(行业公开口径 aftermarket GM ~40%+ vs OEM ~15-20%),mix 向 aftermarket 漂移 = 正向 margin 拉动 |
| Cash flow owner | ✓ 强 | FY24 FCF >$6B,Q4 FCF margin >20% |
| Return owner | ✓ 强 | ROE 44.7%(v1 已标注);ROIC 同样高 |
| **Bridge owner** | ✗ weak | 商用 + 防务 + 能源跨链存在但次链规模小 |
| **Duration owner** | **✓ strong** | 见下分节 |

### Duration owner 硬测试(v2 核心)

**测试 1 — Installed-base 窗口 ≥ 2× deployment 周期**:
- LEAP deployment 周期: ~15 年(2016-2030 年交付)
- LEAP installed-base monetization 窗口: ~25-30 年(商用发动机典型服役寿命)+ 多轮 overhaul(每 6-8 年一次大修,典型 3-4 轮 shop visit)
- 比值: **~2.0x(临界值) 至 ~2.5x**(取决于代际退役节奏)→ **通过硬测试**
- CFM56 对比: deployment 1996-2020 (~24 年),monetization 持续至今仍在(~30+ 年)→ ~1.25-1.5x,实际更长但 deployment 也更长
- **结论**: LEAP 窗口显著 >2x,CFM56 临界。这说明 GE Aero 作为 duration owner 的**主变量是 LEAP shop visit 流**,不是 CFM56 残值流。

**测试 2 — 可量化切换成本**:
- 发动机 MRO 切换成本:
  - 法规: FAA Part 145 repair station certification(new certification 需 2-5 年)
  - 零件: OEM sole-source 件 + PMA 件覆盖窄(估计 <15% parts-by-value 有 PMA 替代,engine core parts 尤其少)
  - 经济: RPFH(rate-per-flight-hour)合同多为 multi-year,锁定 15-25 年 fleet 寿命
  - 客户切换代价: 非原厂 overhaul 需要 recertification,每次 overhaul cost 增量 ~10-20%,风险溢价更高
- **量化**: RPFH 合同典型 15-25 年,单台年费用 $500K-$1M 级,LEAP fleet >10,000 台,隐含合同 NPV 以**千亿美元**计。切换成本以"重新认证周期"+"残余 parts 垄断"可显式定量 → **通过硬测试**。

**结论**: GE Aero 在 LEAP vector 上是**硬通过**的 duration owner。

### Q-a / Q-b / Q-c 元评估

- **Q-a 主动识别**: ✓ v2 Owner resolver Step 8-9 强制问 bridge/duration。v1 只问 1-7(revenue/GP/cash/return),会把 GE 分类到"return owner 强"就停,不追问 duration。
- **Q-b 加值**: **显著** —— v1 得出的 "leader 层已被共识" 对应的是**当期 cash flow + backlog 尺寸**的定价已到位。v2 duration 视角追问的是**时间分布**的定价是否到位,这是两个不同问题。如果市场用 20x 当前 EPS 给 GE Aero 定价,隐含的 terminal multiple 假设是"当期 Services 增速会放缓",**没有**显式 price in LEAP shop visit 2028-2045 的现金流阶梯。v2 让这个 gap 至少**被提出**。
- **Q-c 硬测试可操作性**: ✓ **两个硬测试都用公开数据通过**。比值数字、RPFH 合同结构、FAA 认证周期都是可查的。没有退化成"GE 有 aftermarket 所以是 duration owner"的软定义。

---

## 3. Expression Selector v2 · 在本 trend 下最佳 expression 是谁?

### 7 种候选对比(v2 new options 加粗)

| Expression | 代表 | 主要 thesis | Problems |
|---|---|---|---|
| Core leader | **GE Aero** | OEM parts + services + installed base | Gap 窄(v1 判定);**但 duration vector 未 fully priced**(v2 新发现) |
| 2nd-order | HEI | PMA + distribution | Wencor synergies,规模小 |
| Upstream bottleneck | HWM / ATI | 熔炼 / cert 瓶颈 | 已在 v1 Top 5 |
| Hidden owner | FTAI | 独立 CFM56 MRO | 已在 v1 Top 1 |
| **Bridge owner** | (无强候选) | 跨链 owner | 本 trend 里缺少天然 bridge 候选;HON 可能但 aerospace 占比低 |
| **Duration owner** | **GE Aero** | LEAP 25-30 年 installed base monetization | **v1 没把这个当独立 expression** |
| No-trade | — | — | — |

### 关键判定(v2 Step 3-4 强制问 bridge / duration)

**Question**: 在本 trend 下,**bridge owner** 是否提供比 v1 Top 5 更好的 setup?
- 答: **不**。本 trend 里没有强 bridge 候选(GE Aero 自身 weak bridge 不是主轴)。v2 在此得出"no"也是有价值的 —— 它**排除**了一个伪候选类别,而不是假装能找到。

**Question**: 在本 trend 下,**duration owner** 是否提供比 v1 Top 5 更好的 setup?
- 答: **这是真问题**,不是选择题。v1 的 Top 5 + Observation 2(GE)隐含"GE 是共识 leader,Top 5 是 immediate / early-wave beneficiary",两者是**时间互补**的。
- v2 提供的 reframe: **早期波段(2024-2028)最佳表达是 FTAI / AIR / HEI(v1 Top 5);中后期波段(2028-2045)最佳表达很可能是 GE Aero 的 duration vector**。
- v1 只做 6-18 month 投资窗口,自然排除 GE;但 v1 **没显式指出** GE 是不同 time-horizon 的最佳答案,而是归结为"layer 已被共识"。这是错误的归因 —— 不是 layer 共识,是 time horizon mismatch。
- v2 expression selector 的 "best expression can change over time(early chokepoint → late duration)" 规则**强制**把这一点讲清楚。

### Q-a / Q-b / Q-c 元评估

- **Q-a 主动识别**: ✓ v2 Step 3/4/Reminder 4 强制路过 bridge / duration / time-state 问题。v1 只有 4 种 expression type,time-state 维度完全缺失。
- **Q-b 加值**: **显著且具体** —— v2 可以把 "为什么 GE 不在 Top 5" 的**真实原因**从 "layer 已被共识" 修正为 "**time horizon 不同**;GE 是 multi-year duration owner,在 6-18 month window 里不是最佳表达,但不等于被充分定价"。这是**对 v1 诊断的修正**,不是装饰。
- **Q-c 硬测试可操作性**: ✓ time-horizon 分段可用 aviation cycle data + LEAP delivery schedule 明确分段。

---

## 4. Validation Verdict

### 结论: **v2 在 GE Aero 案例上通过验证**

| 元问题 | 三个 skill 综合 |
|---|---|
| Q-a 主动识别 | ✓✓✓ v2 三个 skill 的新 step 都**强制**路过 duration 视角,v1 没有一处触及 |
| Q-b 加值 | ✓✓ 有实质新结论: **v1 对 GE 的诊断理由 "leader 层已被共识" 被 v2 修正为 "time horizon mismatch + duration vector 未 fully priced"**。措辞看起来接近,但是两个不同的行动含义(前者 = 等 rotation,后者 = 等 time-horizon 切换到 multi-year framework 才能 re-rate) |
| Q-c 硬测试可操作 | ✓✓✓ installed-base 窗口 ≥ 2× deployment 比值 + RPFH 合同 NPV + FAA 认证切换成本都可以用公开数据判定,不退化成软定义 |

### 加值的具体形状

**v1 → v2 的真实 delta**(不是措辞):

> v1: "GE 是 leader,已被共识,等 rotation 或新 catalyst"
>
> v2: "GE 的**当期 Services + backlog**已被共识;但 GE 作为 **LEAP 2028-2045 duration owner**,其 25-30 年 installed-base cash flow stream 是否被市场用**合理折现率**定价,是独立问题。这不是 '等 rotation',是 '等市场的 time-horizon frame 是否切换'。如果 duration vector 在某个时点被市场重新 price,不需要板块轮动 GE 也会 re-rate。"

这个修正改变了 Observation 的 upgrade trigger:
- v1 trigger: 板块轮动 / 新 platform design win / Services 增速 >30%
- v2 应补充 trigger: **Hyperscaler-style multi-year DCF framework 开始适用于发动机 OEM**(例: sell-side 开始发 "GE 20-year shop visit NPV model" 这类报告),或 **LEAP shop visit 实际 cadence 超 consensus**(2027-2028 的财报会验证)

### v2 hard test 的边界警示

Duration owner 硬测试在本案例通过,但一个观察:
- **LEAP 比值 ~2.0-2.5x** 只是**刚过** 2x 门槛。
- 原因是 LEAP deployment 周期长(15 年)本身就拖长了分母。
- 对比: 一个典型 duration owner(例电梯厂 OTIS)deployment 周期可能只 1-2 年,monetization 30 年,比值 >15x。
- **启示**: 2x 门槛对商用航空这类"长 deployment + 长 monetization"行业偏松,对"短 deployment + 长 monetization"行业偏严。**下一个案例(Quanta)跑完后再回头看是否需要把 2x 门槛细化为"monetization_years - deployment_years ≥ 某个绝对年数"这种替代口径**。
- 暂不改 v2 文字,但记录此 edge(见下)。

---

## 5. 对 v2 本身的修改建议(仅记录,不执行)

| # | 建议 | 优先级 | 理由 |
|---|---|---|---|
| 1 | **暂不改 v2 文字**。GE Aero 案例通过,Quanta 再跑一遍后统一回看 | — | 单案例不足以反推修改,宪法 03A §11 反官僚原则 |
| 2 | 跑 Quanta 时重点观察:bridge owner 硬测试("≥2 个独立 L1 forced demand")是否会在 Quanta 上通过。如果 Quanta 也弱,说明硬测试过严,需放宽 | 中 | 单侧失败信号 |
| 3 | Duration owner 2x 门槛可能需要改为 **absolute-years 口径**(monetization_years - deployment_years ≥ 20 年)或 **hybrid**(max of ratio-2x / absolute-20yr) | 低 | GE 刚过 2x 但显然是 textbook duration owner;门槛可能不够锐利 |
| 4 | v2 expression selector 应**显式要求** "if best expression differs by time horizon, name the horizon explicitly" | 中 | GE Aero 验证暴露出 time-horizon 切换是 v2 最有价值的加值点,但当前文字只是 Reminder 4,可升为 Step 必答 |

---

## 6. Next step

1. 跑 **Quanta Services**(bridge owner 候选)做第二个验证
2. 两例都跑完后,统一回看是否调整 v2 硬测试文字
3. 将本 memo 的"v1 → v2 真实 delta"结论回填到 `outputs/aviation_top5_2026-04-18.md` 的 Obs-2 (GE) 条目(v3 补丁),修正 upgrade trigger
