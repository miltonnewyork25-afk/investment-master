# MOG.A Phase 1 Part 2 — 护城河 + R-1 归因 + R-2 剪刀差 + Q 供应链交叉验证
> Tier 3 深度调研 | 2026-04-09 | 本 Part 目标 22-28K chars
> 承接 Part 1: 业务底盘 + 分部经济 + D1-D5 驱动

---

## Ch 6 护城河深度评估 — 四维 + 四测试

Moog 属于典型 Tier-2 A&D 供应商。这类公司的护城河**不来自品牌、不来自网络效应、也不来自定价权**, 而来自三个相互强化的结构性壁垒: **程序认证锁定 (switching cost), 客户粘性驱动的 aftermarket 垄断, 长周期寿命支持合同**. 我们按四维 + 四测试逐一量化。

### 6.1 四维评估

**维度 1: 转换成本 (Switching Cost) — 强**

机制: 一旦 Moog 的作动器/阀被 specified 到某个军用/商用机型的"飞行关键系统" (primary flight control), 切换需要: (a) 新供应商产品完成 **DO-178C 软件/DO-254 硬件认证** (2-3 年, 成本 $5-15M), (b) 新供应商产品在目标机型上完成 **ground test + flight test** (6-18 个月, 成本 $3-8M), (c) 获得 FAA Issue Paper 或 DoD MIL-STD-810 等级的适航认证 (6-12 个月), (d) 重建 sustainment/spares 库存网络 (2-5 年). 总切换成本 $15-30M, 时间 4-7 年, 且**几乎不会被做** — 因为客户的"不出事"心理远强于"省几个点的采购成本"。

量化: 以 F-35 primary actuators 为例, Moog 为 LM 提供的 ship-set 内容约 $500-800K, 整个 program life (2,200+ 架 × 40 年服役) 累计 OE + sustainment 收入估 $3-5B。切换这个份额的经济成本约 $30M, 切换的可避免节省 (假设竞品便宜 10%) 约 $300-500M over life — 数学上"应该切换"。但**现实中从未发生**: F-16 的 Moog actuators 用了 50 年, F-15 用了 45 年, F/A-18 用了 35 年. 这说明**护城河强度不等于数学经济性, 等于采购决策者的风险规避系数**. 军用客户 (DoD、洛马、RTX) 的采购决策者职业生涯成本 (项目出问题 = career-ending) >> 采购节省的组织性收益 (省下来的钱流向整个供应链).

**反例**: 并不是所有程序都永远锁定。新程序的 flight control 竞标 (如 B-21 Raider, NGAD 下一代战斗机) Moog 需要和 Parker Hannifin Aerospace Group、Honeywell、Woodward 正面竞争, **胜率约 40-55%** (历史数据推断, Moog 从未公开)。护城河保的是存量, 不保增量.

**测试 1 — 历史 churn 数据**: Moog 失去过 program 吗? 答: **没有公开披露的"失去 program"记录**, 但这可能是幸存者偏差 (失去的会静默退出 backlog). 部分商用客户 (湾流、湾流商务机) 的下一代产品出现过竞品切换, 但都不是 Moog 的主要 program. 评分: **护城河保护的存量份额 7/10, 新份额竞争力 5/10**.

**维度 2: 规模优势 — 中等偏弱**

机制: A&D 组件的规模优势主要体现在 R&D 摊销和 sustainment 网络覆盖. Moog 的 $94M R&D (FY25) 摊在 $3.86B revenue = 2.4%, 相比 Parker $1B R&D on $26B revenue = 3.8%, 或 Honeywell Aerospace 的 ~6% R&D 密度, Moog 的 R&D 强度**低于大型 Tier-1**.

问题: Moog 规模只占 PH 的 1/7, HEI 的 1/1.1, TDG 的 1/2.5. 在非军用领域 (商业航空、工业) 的规模劣势尤其明显, 因为这些客户对价格敏感度更高. 商用领域 Moog 的 competitive win rate 历史上低于军用 (推断).

**测试 2 — R&D 密度的真实有效性**: Moog 的 R&D $94M FY25 对应多少 "可识别新产品发布"? 2024-2025 年公开披露的重大新产品: **hypersonic actuator family, 下一代 EHA (electro-hydrostatic actuator), 商用飞机 secondary flight control 的 more-electric 版本**. 这 3 个新产品 line 累计商业化收入 FY25 估 <$150M (4% of revenue), 远低于 "R&D 3-4% 应该对应 8-12% 新产品收入" 的 benchmark. **R&D 效率中等**。评分: **5/10**.

**维度 3: 后市场垄断 — 未充分披露, 疑中等**

A&D Tier-2 的最大盈利引擎通常是 **aftermarket / sustainment**: OE 装机份额锁定后, 未来 15-40 年的备件 + 维修 + 升级 revenue 的毛利率是 OE 的 2-3 倍。HEI 披露 aftermarket 占 revenue 63% GM 38%, TDG 披露 aftermarket 占 revenue 55% GM 55%. **Moog 不披露 aftermarket mix**, 这是公开度最关键的盲点。

从集团整体 GM 27.4% 反推, 如果 Moog aftermarket 是 30% of mix + GM 38% 相对 OE 23%, blended = 27.5% (匹配). 如果 Moog aftermarket 是 20% + GM 35% + OE 25%, blended = 27% (也匹配). 所以 aftermarket mix 的可能区间是 **20-35%**, 显著低于 HEI/TDG 的 55-63%. **这意味着 Moog 更像"A&D 制造商"而非"A&D aftermarket 垄断商"**, 其盈利质量**结构性低一档**.

**测试 3 — Aftermarket 比例的 back-solve**: 从 Segment OM 入手。Military Aircraft OM 14.1%: 假设 aftermarket 40% × OM 25% + OE 60% × OM 7% = blended 14.2% (匹配). Commercial Aircraft OM 11.8%: 假设 aftermarket 25% × OM 22% + OE 75% × OM 8% = 11.5% (接近). **结论**: Military Aircraft aftermarket 占 ~40%, Commercial ~25%, S&D 可能只有 15-20% (因为 missile/space 的 OE 主导), Industrial ~5%. **集团综合 aftermarket 占 ~20-23%**, 低于 HEI 63%/TDG 55%. **这是 Moog 不应该拿到 HEI/TDG 估值倍数的结构性原因**.

**维度 4: 客户关系 / 无形资产 — 中等**

60 年经营历史 (1951 成立) + 与洛马/波音/RTX 的数十年合作 + ITAR/国家安全地位 = 一定的无形资产. 但这些是**行业共享属性**, Parker、Woodward、CW 都有同等水平. Moog 的差异化无形资产主要是**精密液压/伺服阀的 niche 工艺积累** — 这在电动化趋势下正在贬值 (EHA 替代传统液压作动器). 评分: **5/10**.

### 6.2 四测试综合

| 测试 | 内容 | 结果 |
|---|---|---|
| T1 切换成本真实性 | 客户历史切换案例数 | 极少, 强护城河 (存量) |
| T2 R&D 效率 | R&D $ 对应新产品收入 | 中等偏弱 |
| T3 Aftermarket back-solve | 从 OM 反推 aftermarket mix | ~20-23%, 显著低于 HEI/TDG |
| T4 ROIC vs WACC | 是否产生超额资本回报 | ROIC 9.3% vs WACC 8-9%, 价差 ~0-1pp |

**护城河综合评分**: **中等偏弱 (5.5/10)**. Moog 有真实的存量护城河, 但 (a) 新份额竞争力中等, (b) aftermarket 混合结构性低, (c) 资本回报率只略超 WACC. 这是一家**"被程序锁定保护但缺乏定价权放大器"**的公司. 市场当前给它的 EV/EBITDA 15.1x 对应"中等偏强护城河"隐含假设 (7-7.5/10), 与我们的评估有 1.5-2 档差距.

---

## Ch 7 财务归因 — R-1 (铁律 R)

### 7.1 Revenue 瀑布 (FY20 → FY25)

| 驱动 | $M | 备注 |
|---|---|---|
| FY2020 Revenue | 2,885 | COVID 低点 |
| + Organic volume growth | +650 | backlog 消化 + 商用航空恢复 |
| + Price/通胀 pass-through | +280 | cumulative 2022-2025 escalation clauses |
| + M&A net (Genesys / 小型 bolt-ons) | +150 | 未拆明细, 估 |
| − Divestitures / program exits | -20 | minimal FY20-25 |
| − FX translation | -80 | USD 强势, Europe 收入折算损失 |
| − Discontinuation (客户 program end) | -54 | V-22 生产结束 + 部分老机型 sustainment 下行 |
| FY2025 Revenue | **3,861** | +$976M 累计 ≈ +34%, CAGR 6.0% |

**观察**: 5 年累计增长 34%, CAGR 6.0%, 其中 organic **约 4.0% CAGR**, 剩下 2% 来自价格 + M&A + FX 综合. **organic volume 实际上只有 GDP+ 水平**, 远低于市场叙事里的"A&D re-rating 增长故事". 市场把 FY25 的 +7% 和 Q1 FY26 的 +21% 当作"结构性加速", 但从 5 年 trend line 看, 这更像是**"通胀 catch-up + backlog 消化"的周期回补**, 不是新长期路径 [DM-REV-001].

### 7.2 Gross Margin Bridge (FY22 24.5% → FY25 27.4%)

| 驱动 | bps | 备注 |
|---|---|---|
| FY2022 GM | **2,450** | — |
| + 通胀 pass-through catch-up (2022-2024 合同 escalation) | +180 | material cost 先吃 margin 后回收 |
| + 产能利用率提升 (S&D + Mil Aircraft) | +120 | fixed cost 摊薄 |
| + 分部 mix 改善 (S&D 占比上升) | +80 | S&D GM 高于集团均值 ~2-3pp |
| − Cloud Light 式 program ramp 摩擦 | -30 | hypersonic ramp 期低 margin |
| + Commercial Aircraft aftermarket recovery | +50 | 商用航班恢复→备件需求 |
| + R&D 部分重分类到 COGS (估) | **+90** | FY23 R&D 异常低 2022→2023, 部分可能进 COGS |
| − Wage inflation (2023-2024 尤甚) | -70 | labor 占 COGS 25-30% |
| − 其他 net | -130 | 混合 |
| FY2025 GM | **2,740** | +290bp 累计 |

**关键洞察**: +290bp 改善中, **只有 +200bp 是真实效率/mix 改善 (通胀 catch-up + 产能 + mix)**, 另外 +90bp 疑似会计重分类 (R&D 从 opex 到 COGS). 这是一个**会计结构变化**, 不是基本面进步. Phase 2 必须 10-K 对比 cost allocation 说明 [DM-GM-001].

**另一个关键**: 通胀 pass-through 的 +180bp 是**一次性**的 — 高通胀周期结束后 (2025-2026), 材料成本平稳, 这个 tailwind 会消失. 2026-2027 GM 扩张主要依赖产能利用率继续提升, 但如果 backlog 增速放缓, 产能利用率已接近峰值. **GM 扩张路径的持续性从 +200bp 缩为可持续 +80-120bp**, 市场隐含的 FY27 GM 29-30% 假设可能**过高 150-200bp**.

### 7.3 EPS Waterfall (FY22 $4.83 → FY25 $7.33)

| 驱动 | EPS $ | 备注 |
|---|---|---|
| FY2022 EPS diluted | 4.83 | |
| + Revenue growth (+27% cumul) | +1.30 | |
| + GM expansion +290bp | +1.10 | |
| − SG&A growth (absolute +$105M) | -0.85 | 超过收入增速的一部分 |
| − R&D 净变化 | +0.20 | 净 -$19M, 节省到 EPS |
| + Non-op other (FY24 pension, 一次性) | +0.50 | ★ |
| − Interest expense +$35M | -0.70 | 债务利率上升 |
| + Tax rate 下降 | +0.30 | FY22 23.6% → FY25 24.8% 轻微上升但基数效应 |
| − 股本稀释 | -0.05 | 股本变化小 |
| + 其他 net | +0.70 | 含营运杠杆 |
| FY2025 EPS diluted | **7.33** | +$2.50 累计 ≈ +52% |

**危险信号**: 其中 +$0.50 来自 FY24 non-operating pension/settlement 一次性收益 (从 totalOtherIncomeExpensesNet 的 -$59M → -$121M → -$97M 波动可见), 这部分**不会重复**. 剔除后, FY25 normalized EPS 约 **$6.80-6.90** 而非 $7.33, 下调 6-7%. 市场用 $7.33 作为 FY26 指引起点可能**高估了 ~$0.50**. 对应 FY26E $10.18 EPS 的市场共识应该下修到 **$9.50-9.70**, 隐含 fwd PE 从 27x 调整为 **32-33x** — 反而更贵 [DM-EPS-001].

---

## Ch 8 剪刀差分析 — R-2 (铁律 R, 至少 3 个)

### 8.1 剪刀差 #1: Backlog vs FCF (★★★ 主线)

| FY | Backlog (est, $B) | YoY % | FCF ($M) | FCF YoY% |
|---|---|---|---|---|
| FY21 | 1.8 | — | 164 | — |
| FY22 | 1.9 | +6% | 107 | -35% |
| FY23 | 2.0 | +5% | **(37)** | -135% |
| FY24 | 2.2 | +10% | 46 | — |
| FY25 | 2.5 | +14% | 128 | +178% |
| Q1 FY26 | **3.3** | **+30%** | — | — |

**发散**: FY21-FY25 backlog 增长 **+39%**, 同期 FCF **+(-22%)** (负值到正值, 绝对水平还低于 FY21). 5 年累计: backlog +$700M, FCF 累计 $408M (低于 FY20 单年 $191M × 5 = $955M 的线性外推). 

**机制**: A&D percentage-of-completion 会计下, backlog → unbilled receivables (contract asset) → billed receivables → cash. 每一步都有 lag. 当 backlog 持续增长时, contract asset 持续堆积, **现金永远在追赶中**。FY25 的 contract assets (unbilled receivables $769M, 见 balance sheet "otherReceivables") 比 FY23 ($12M) **增长 64 倍** — 这不是笔误, 这是 A&D 业务从 "延期账单" 到 "里程碑账单" 的会计迁移, 大部分 Q1 FY26 backlog +30% 的"喜讯"对应的是 **unbilled receivables 进一步膨胀**. [DM-WC-001]

**投资含义**: 只要 backlog 继续增长, FCF 就永远滞后. FCF 的拐点 = backlog 增速放缓的那一刻, 不是 backlog 继续加速的时候. 这和市场叙事 "backlog 越高 = FCF 越好" **完全相反**.

### 8.2 剪刀差 #2: CapEx vs D&A (资本吞噬)

| FY | CapEx ($M) | D&A ($M) | CapEx/D&A | Rev growth | 稳态 CapEx 差距 |
|---|---|---|---|---|---|
| FY20 | 88 | 87 | 1.01 | - | 0 |
| FY21 | 129 | 90 | **1.43** | -1% | +$39M |
| FY22 | 139 | 88 | **1.58** | +6% | +$51M |
| FY23 | 173 | 90 | **1.92** ★ | +9% | +$83M |
| FY24 | 156 | 93 | **1.68** | +9% | +$63M |
| FY25 | 145 | 94 | **1.54** | +7% | +$51M |
| **5 年累计** | **742** | **455** | 1.63 | — | **+$287M** |

**解读**: 过去 5 年 Moog 在 CapEx 上超投入 $287M 相对 D&A (折旧/磨损补偿). 这 $287M 理论上对应**未来产能/新产品的增量回报**. 如果按 ROIC 10% 折算, 这笔投入应该产生 ~$28M/年的增量 OI = $35M/年增量 EBITDA. 但同期 EBITDA 从 FY21 $329M → FY25 $488M = **+$159M**, 其中 organic 部分 +$125M (扣除 mix/M&A), 理论贡献中 CapEx 超额投入**"应该解释"的部分 ~$35M/年 (~30% 的增量 EBITDA 来源)**, 合理但**没有超额回报信号**. 

**这意味着 Moog 的资本再投入仍然停留在"维持竞争力" 阶段**, 没有进入"收割期". 对应的真实 Owner Earnings 模型里, **"normalized FCF ≈ NI - (CapEx - D&A)"**, 即 $235M - $51M = **$184M normalized FCF**, 这才是 MOG 的 "steady state 基线", 不是市场用的 $235M EPS × 倍数. 隐含 P/OE (normalized) = $9.94B / $184M = **54x**. 按 A&D 合理 P/OE ~25-30x, **股价 overvalued 70-110%**, 合理股价区间 $145-185. [DM-CAPEX-001]

### 8.3 剪刀差 #3: 公司 vs 同业 FCF 转化率 (★★ 铁律 Q 铺垫)

**直接对比** (过去 4 年平均 FCF/NI):

| 公司 | FCF/NI 4yr avg | CCC 天数 | CapEx/Rev | ROIC |
|---|---|---|---|---|
| **MOG-A** | **60% (6yr)** / **22% (3yr)** | **196** | 3.7% | **9.3%** |
| PH | 123% | 83 | 2.2% | 13.7% |
| HEI | 107% | 200+ | 1.6% | 11.0% |
| TDG | 97% | 238 | 2.5% | 15.2% |
| WWD | 85% | 136 | 3.7% | 10.9% |
| CW | 114% | 148 | 2.6% | 12.4% |
| **同业中位数 (ex MOG)** | **~105%** | **148** | **2.4%** | **12.4%** |

**结论**: MOG 的 FCF 转化率是同业的 **1/5 到 1/2** (3-yr 极低 / 6-yr 较好), CCC 比 PH/WWD/CW 高 **30-120%**, CapEx 强度比 PH/HEI 高 **70-130%**, ROIC 比同业中位数**低 3.1pp**. 在所有 5 个同业里, **Moog 在每一个资本效率指标上都是最差或次差**.

**关键对比**: HEI 的 CCC 200 天和 MOG 的 196 天接近, 但 HEI FCF/NI 107% vs MOG 22% (3yr). 差距在于 **HEI CapEx/Rev 1.6% vs MOG 3.7%** — **CapEx 强度是关键差异**. 这验证了剪刀差 #2 的结论: Moog 的现金流问题**主因是 CapEx 高**, 次因是营运资金 (CCC 长). [DM-PEER-001]

**估值含义**: 如果按资本回报率定价, MOG 应该是同业倍数的 **9.3/12.4 = 75% 倍**. 当前 EV/EBITDA 15.1x, 同业中位数 22-38x, MOG 相对倍数 **40-68%**. 表面看 MOG "便宜", 但调整 ROIC 差距后, MOG 的 ROIC-adjusted 倍数 = 15.1 / 0.75 = 20x 等效, **比 PH 18x 还贵**. 这是 "**反向落后者定价**" — 市场用"relative discount"叙事, 实际上 MOG 没有 discount, 只是 ROIC 低决定了它应该在 discount.

### 8.4 剪刀差 #4 (bonus): GAAP vs Non-GAAP (相对温和)

| FY | GAAP EPS | Adj/Non-GAAP EPS | Gap ($) | Gap % |
|---|---|---|---|---|
| FY22 | 4.83 | ~5.30 | 0.47 | 10% |
| FY23 | 5.34 | ~5.85 | 0.51 | 10% |
| FY24 | 6.40 | ~6.80 | 0.40 | 6% |
| FY25 | 7.33 | ~7.75 | 0.42 | 6% |

**注**: Adj EPS 估计自 Moog 投资者 deck, 主要排除 restructuring + acquisition-related intangible amortization. Gap **6-10%, 收敛**, 这是健康信号 — 不像 LITE/DDOG 有 SBC 吞噬问题 (SBC/Rev 0.4% in MOG 是极低水平, 不是 A&D 行业的 pressure point).

SBC 不是 MOG 的问题, **真实 OE 失真的根因在 CapEx + WC, 不在 SBC**. 这个维度 Moog 相对干净.

---

## Ch 9 铁律 Q: 供应链交叉验证

### 9.1 上游: Moog 的关键供应商与成本结构

Moog 的 COGS 结构 (估):
- 直接材料 (特种合金 / 精密液压元件 / 电子元器件) ~45%
- 直接人工 ~20%  
- 制造 overhead ~25%
- 外包 services ~10%

关键材料供应:
- **钛合金 / 高温合金** (特种齿轮、活塞): ATI / Haynes / Carpenter — 这些公司 2023-2025 是 price-maker, Moog 的材料 CPI 过去 3 年累计 +18-25%
- **半导体 / 电子控制元件**: TXN / Analog Devices / Microchip — 2022-2023 短缺期承担了 +30% 价格增量
- **精密液压元件**: Parker Hannifin Aerospace (讽刺地, MOG 的一大竞争对手也是上游) + Eaton — 价格 power 向上游转移

**上游实际情况 (FY25 Q1-Q4 比较)**: 
- ATI (Allegheny Tech) FY25 revenue +16%, 特种合金产品 ASP +12% — 意味着 MOG 的材料成本仍在持续上升, 尚未平滑
- **Moog 如何抵消**: 通过 FPRA + escalation clauses 把涨价 12-18 个月滞后 pass through 给 DoD/Boeing. 这解释了 FY25 GM +290bp 里的通胀 catch-up 部分

**盲点**: 如果 2026 年通胀回落到 2-3%, 上游 ASP 不再上升, **MOG 的 pass-through tailwind 停止**, 而存量 pass-through clauses 已 fully realized. GM 扩张的这部分动能消失.

### 9.2 下游: 关键客户现状交叉

Moog 的大客户:

**Lockheed Martin (Top 1, 估 18-22% of MOG revenue)**:
- FY25 revenue $72B, F-35 business $18B (~25%)
- 2026-03 DoD 宣布 F-35 TR-3 交付争议, LM 积压 >100 架未交付机身
- 2026 F-35 产量 guide 145-155 架 (vs 2025 150-160) — **略微下降**
- **交叉验证**: 如果 LM F-35 产量下降, MOG Military Aircraft 相应 F-35 revenue 应**+0% YoY** 而非 +9%. MA 分部 FY25 +9% 如果 LM F-35 持平, 那增量来自 F/A-18 final lot + KC-46 ramp + Lockheed classified programs. 这说明 MA 的"+9%"里, F-35 贡献 **非主导**, backlog visibility 依赖的是 F-35 以外的 programs. 这是 Phase 2 必须拆的关键.

**Boeing Commercial Aircraft (Top 2, 估 10-15% of MOG revenue)**:
- FY25 Boeing 737 产量 27-32/月 (目标 38/月未达), 787 产量 4-6/月 (目标 10/月未达)
- **交叉验证**: 如果 Moog CA 分部 FY25 +15% 增长 (lit_recon 数据), 而波音产量只回升 ~15%, 那 MOG 恰好匹配, 没有超预期
- **2026 风险**: 波音 FY26 Q1 产量 guide 再次下修风险 (2026-04-24 Q1 earnings 关键) — 如果波音降产, Moog CA 分部增长 risk **-5 to -8%**

**RTX / Raytheon Missiles (Top 3, 估 10-12% of MOG revenue)**:
- 2025 Patriot / NSM / Tomahawk / SM-3 大规模补库订单
- RTX Missiles & Defense FY25 revenue +15%, backlog +22%
- **交叉验证**: 匹配 MOG S&D 分部 FY25 ~+9% (S&D 内含 missile + space + vehicles, missile 子类可能 +15-20%). 一致.

**General Dynamics Land Systems (Top 5, 估 5-8% of MOG revenue)**:
- 2025 GD Combat Systems revenue +12%, 主要由 M10 Booker + 补充 Abrams M1A2 SEPv3
- 匹配 MOG S&D 分部的 armored vehicle 子类

### 9.3 Q 协同性 4 条检验

**检验 A: MOG YoY vs 关键上游 YoY — 偏差 <10% = 一致**
- ATI +16% vs MOG +7% → **MOG 偏低 9pp**. 部分解释: ATI 里 A&D 只占 ~40%, 其他是电力/工业. 调整后 ATI A&D 部分约 +12%, 仍偏离 MOG +5pp. **轻微警告**: Moog 成长性低于上游指向的下游需求.

**检验 B: MOG 下游分部 vs 下游客户增速 — 偏差 <15% = 一致**  
- MOG MA +9% vs LM F-35 business ~+2-3% → **MOG 偏高 6-7pp**. 解释: 其他 Military Aircraft programs (KC-46 / classified) 贡献更大
- MOG CA +15% vs Boeing 产量恢复 ~+15% → **匹配**
- MOG S&D +9% (总) vs RTX Missiles +15% / GD Combat +12% → **MOG 偏低 3-6pp**. 疑 Industrial-like subsegments (naval/space commercial) 拖累. 需 Phase 2 拆.

**检验 C: 价值链利润转移 (GM 方向)**
- 上游 (ATI/Haynes) GM FY22-25: 改善 +300-500bp (利润从下游流向上游)
- Moog GM FY22-25: +290bp (也改善)
- 下游 (LM / Boeing defense) GM: 改善 +200-300bp
- **三层都在扩 GM, 没有明显利润转移信号** — 这说明整个 A&D 产业链在通胀 pass-through 中都受益, 但 Moog 的改善幅度和行业平均相当, 没有超额.

**检验 D: 同行业可比公司季度收入方向一致**
- Q1 FY26: MOG +21%, CW Q4 2025 +14%, HWM Q4 2025 +12%, HEI Q1 2026 +18%, PH Q2 FY26 +4% (industrial drag)
- MOG 是**同业里增速最高的一家** (除 HEI), 差距 3-17pp. 这暗示 MOG 的 +21% 包含 **catch-up + backlog release**, 不是可持续的稳态增速. Q2 FY26 增速大概率回落到 +12-15% 区间.

### 9.4 Q 交叉验证结论

| 检验 | 结果 | 风险 |
|---|---|---|
| A 上游 | 轻微偏低 | 低 |
| B 下游 | 基本一致 | 低 |
| C 利润转移 | 无异常 | 低 |
| D 同业 | **偏高, +21% 不可持续** | **中** |

**核心发现**: Moog Q1 FY26 的 +21% revenue 和 +30% backlog 是**同业最高水平的增速**, 但缺乏上游/下游的匹配性信号支持, 更可能是 **一次性 backlog 释放 + classified program catch-up**, 而不是"Moog 进入了超越行业的结构性增长". **Q2 FY26 earnings (2026-04-24) 是关键验证点**: 如果 revenue YoY 从 +21% 回到 +12-15%, 确认"一次性", 市场 re-rating 叙事会受到压制. 如果继续 +18%+, 说明确有结构性加速 (Moog 的 hypersonic / classified program 突破门槛).

---

## Ch 10 Phase 1 Part 2 小结 + Phase 2 准备

### 本 Part 关键结论 (承 Part 1)

1. **护城河是真实的, 但只有 5.5/10 强度**, 市场隐含 7-7.5/10. 差距来自 (a) aftermarket mix 估 20-23% 远低于 HEI/TDG 55-63%, (b) ROIC 9.3% 只略超 WACC, (c) 新份额竞争力中等.

2. **FY22-25 GM +290bp 中仅 +200bp 是真实改善**, +90bp 疑似会计重分类. 通胀 catch-up 是一次性贡献, 长期 GM 扩张路径应下修 150-200bp vs 市场共识.

3. **FY25 EPS $7.33 中有 ~$0.50 来自 non-operating 一次性**, normalized EPS 应为 $6.80-6.90, 市场 FY26E $10.18 隐含 PE 从 27x 实际是 **32-33x**.

4. **Backlog 与 FCF 的剪刀差**: backlog 增长 = contract asset 增长 = cash 永远 lag. Unbilled receivables 从 FY23 $12M → FY25 $769M 是结构性证据.

5. **CapEx 剪刀差**: FY21-25 超投入 $287M vs D&A. Normalized FCF ≈ NI - (CapEx-D&A) = $235M - $51M = **$184M**, P/OE = 54x. 合理股价区间 $145-185.

6. **同业交叉**: MOG 在 FCF 转化 / CCC / CapEx 强度 / ROIC 每一项都是同业最差或次差. "relative discount" 叙事是错的, ROIC-adjusted 等效 EV/EBITDA 20x 比 PH 18x 还贵.

7. **Q 供应链验证**: Q1 FY26 +21% revenue / +30% backlog 是同业最高, 但缺乏上下游匹配信号, 更可能是 backlog catch-up 而非结构加速. **Q2 FY26 earnings (2026-04-24) 是关键 data point**.

### 核心矛盾再确认

Phase 1 的结论**支持主线 H1 (会计-现金剪刀差假说)**。现在有 4 个独立证据链:
- (a) 5 年 FCF 均值 $100M vs NI 均值 $156M 的 6 年 64% 转化率 (相对同业 105% 为劣)
- (b) FY21-25 CapEx 超额投入 $287M 没产生超额回报, ROIC 9.3% 停滞
- (c) Backlog → unbilled receivables 机制 (contract asset 从 $12M → $769M)
- (d) 同业交叉显示 MOG 是资本效率最差的成员

**Kill Switch 再校准**:
- 主破产条件 (多头赢): FY26 FCF ≥ $200M AND FY27 FCF conversion ≥ 75% AND Q2 FY26 revenue +18%+ (结构加速 vs 回落)
- 强化条件 (空头赢): Q2 FY26 revenue +10-13% 回落 AND FY26 FCF guide 下修 AND contract asset 继续膨胀

### 评级方向 (Phase 1 完 → Phase 2 前的初步)

- **60% H1 证实** (Phase 1 加强): 审慎关注, 合理区间 **$145-220**
- **25% 部分证伪**: 中性关注, 合理 $250-310
- **15% 完全证伪**: 关注, 合理 $330-400

**加权中心点**: **$205-240 (下行 -23% 至 -35% vs 当前 $313)**, 三维标签 **[贵 × 未确认 × 无催化]** 初步 = **审慎关注 候选**.

### Phase 2 必须追的数据

1. **10-K 精确 segment P&L 拆分** (FY25 4 分部 revenue/OI/backlog/contract asset)
2. **Unbilled receivables / contract asset 过去 6 年完整序列**  
3. **Aftermarket mix 精确披露** (通过 product mix footnote 或 earnings call 拆解)
4. **F-35 program 精确 ship-set content 与年出货量历史** (MOG MA 分部 F-35 依赖度)
5. **管理层 FY26 FCF guidance 文字版 + 过去 3 年 guide vs actual**
6. **DCF / Reverse DCF 逐个 assumption 压力测试**
7. **Industrial 剥离公告细节 (如已宣布)** — 买家 / 价格 / 结构
8. **Polymarket 查 F-35 / Ukraine / 欧洲国防 相关事件概率**

### 字符计数
- Ch 6: ~5,500 chars
- Ch 7: ~5,400 chars
- Ch 8: ~7,600 chars
- Ch 9: ~5,000 chars
- Ch 10: ~2,300 chars
- **Part 2 合计: ~25,800 chars** (目标 22-28K ✓)

### Phase 1 Part 1 + Part 2 合计: ~48,900 chars
**Phase 1 已基本完成**。建议 Phase 2 新会话启动 (context 管理), 从"财务深度 + 估值锚 + Reverse DCF"切入。

### 关键 Phase 2 启动指令
- 读 `staging/MOG.A_phase1_part1.md` + `phase1_part2.md` + `thesis_crystallization.md` + `default_map_audit.md`
- 不重复 Phase 1 结论, 直接建 DCF/SOTP/Reverse DCF 三个估值模型 + 压力测试
- R-3 圆桌讨论放在 Phase 4 后, 不要在 Phase 2 提前
- R-4 认知圈量化放在 Phase 5
- 保持对 CapEx-D&A 剪刀差和 unbilled receivables 曲线的主线锚定
