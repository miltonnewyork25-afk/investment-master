# FTAI Aviation — Phase 1 Findings v2 (循环深挖产出, 修复版)

> **目的**: 围绕P0.5识别的3个第一关键变量 + H1/H3高alpha假说, 执行4层循环深挖(数据→机制→含义→证伪)
> **日期**: 2026-04-20
> **版本**: v2 (修复 v1 的数据诚信缺陷 + 凭空概率 + H1过早锚定 + 因果密度断裂)
> **锚点假说**: H1 (FTAI应像TransDigm估值 PE 30-40x) + H3 (56x PE驱动是稀缺性溢价)
> **覆盖变量**: 变量1 (2026模块交付1,050目标) + 变量3 (Aerospace Products margin 36%→40%)
> **未覆盖**: 变量2 (2026 FCF trajectory) → Phase 2财务归因深挖

---

## 关键发现 #1: 模块交付的季度trajectory + Rome工厂的激进爬坡风险

### L1 数据层 — 硬事实

**2025年实际交付 vs 目标 (逐季)**:
- 2025 FY: **757 modules** (beat 750 target by +1%) [DM-OPS-001]
- 季度分解:
  - Q1-Q2 2025 合计: ~322 (隐含avg 161/Q) [DM-OPS-002]
  - Q3 2025: **207 modules** (+29% QoQ) [DM-OPS-003]
  - Q4 2025: **228 modules** (+10% QoQ) [DM-OPS-004]
- 工厂分解 (2025全年):
  - Montreal: **377 modules** (core facility) [DM-OPS-005]
  - Miami: **275 modules** (capacity 600 = 46% utilization) [DM-OPS-006]
  - Rome: **105 modules** (mid-year 2025 acquired, Q2-Q4 ramp only) [DM-OPS-007]

**2026年目标 (管理层指引)**:
- FY 2026 target: **1,050 modules** (+39% YoY) [DM-OPS-008]
- 工厂分配:
  - Montreal: 525 (+39% YoY)
  - Miami: 325 (+18% YoY, to 54% utilization of 600 capacity)
  - Rome: 200 (+90% YoY, first full year)
- Q1 2026 earnings披露日期未公布, 预计5月初 — **最关键早期验证点**

**隐含分配不对称**: Montreal/Miami增幅温和(+18-39%), Rome需+90% — 三个工厂并不是"平均加速", 而是**对Rome的单点押注**

### L2 机制层 — 为什么需要+39%增长, 瓶颈在哪

因为CFM56 aftermarket需求在2024-2028处于窗口峰值, 所以FTAI管理层选择此时段加速capacity扩张, 而不是分散到2029-2030. 具体推演:

**为什么必须+39%** (三个独立驱动):
- **驱动A (周期位置驱动)**: CFM56 global installed base ~8,800台在2024-2028仍是机队主力, 因此维护需求处于peak window. 如果错过此窗口, 2029+ LEAP-1A/1B替代加速, aftermarket TAM进入下降通道, 所以管理层的"在窗口内最大化产出"逻辑自洽
- **驱动B (SCI justification驱动)**: Strategic Capital Initiative在2024年底announced $3B目标规模, 因此2025-2026的capacity扩张是SCI fee stream兑现的先决条件. 如果产能不扩张, SCI管理费收入无基础, 整个"asset management转型"故事失去支撑
- **驱动C (竞争窗口关闭驱动)**: Q4 2025 AAR宣布Cebu Pacific CFM56 nacelle MRO合同. 虽然是nacelle业务不是module, 但这是AAR接触CFM56客户关系的入口. 因此FTAI需要在AAR建立module capacity前用规模固化客户粘性

**瓶颈识别** (按严重度排序):

**瓶颈1 — Rome工厂ramp**: 2025年Q2-Q4半年做了105 modules = 月均~17-18个. 2026年目标200 modules = 月均~17个. 因此2026年Rome**不需要加速月度产出**, 只需"保持Q4 2025节奏全年化". 这是**比表面+90% YoY友好**的目标. 但风险在于: 半年ramp阶段的月产出往往**前低后高** (Q2可能只有10, Q4可能25), 如果"Q4节奏"其实是后半年峰值, 那2026月均17将是挑战.

**瓶颈2 — Feedstock供应**: 每台CFM56发动机可拆解出约4个modules (LLP+HPC+HPT+LPT模块). 因此2026年1,050 modules需要~263台CFM56 engines拆解 vs 2025年757 modules需要~189台. 增量74台feedstock engines. 供给来源有两个: (a) 自有Aviation Leasing机队到期退役 (b) 二级市场收购CFM56-powered aircraft. 因为737NG/A320ceo的二级市场价格在过去24月上涨 (老机型供给紧缩+新机延迟交付), 所以feedstock成本上升可能压缩Aerospace Products的cash margin.

**瓶颈3 — PMA批准与margin扩张**: PMA不限制**模块数量** (可用OEM零件装配), 但限制**margin扩张**. 因为每个PMA批准让FTAI绕开CFM/GE的OEM零件, 单件成本可能下降40-60% (行业估算范围, 实际取决于零件复杂度). 所以PMA数量 = 2026年margin从36%→40%的关键杠杆, 这点在发现#2深入.

**瓶颈4 — 客户MRO slot与需求接收能力**: CFM56 global fleet ~8,800台, 平均每台每3-5年需要重大维护, 因此年度维护需求约1,760-2,930台engine events. FTAI 2026年1,050 modules = 约263 engine equivalent, **仅占全球CFM56维护需求的9-15%**. 所以需求端不是瓶颈, 问题在执行端能否交付.

### L3 估值含义层 — 单模块经济学与情景测算

**单模块经济学** (注意: Revenue per module为推算, 非公开披露):
- 2025 Aerospace Products EBITDA: **$671.3M** (+76% YoY vs $381M 2024) [DM-VAL-001]
- **EBITDA per module: $671M / 757 = ~$886K** [DM-VAL-002] — 此比率是EBITDA总数除以模块交付量的商, 包含MRE服务+PMA授权等非module-only收入. 因此**不等于"纯模块销售的单位EBITDA"**, 只是一个便于比较的综合比率
- Revenue per module: **推算约$2.46M** — 此数字是假设Aerospace segment全部revenue可按36% margin反推出$1.86B, 再除以757模块. **非公开披露, 仅供内部参考, 不作为DM锚点**. 实际revenue组成: module sales + MRE transaction fees + PMA licensing + third-party SCI management fees — 各有不同的margin profile
- 管理层指引的对标: "potential to exceed $1M EBITDA per visit longer term" — 因此从当前$886K向$1M+迈进, 意味着**+13%单模块综合EBITDA扩张空间**. 但"per visit"的口径可能不等于"per module", 这里有**未解析的口径差**, 留P2财务归因澄清

**单模块现金毛利 vs 会计EBITDA的重要区分**:
- 会计EBITDA中包含库存成本摊销/折旧加回/一次性项目调整
- 因此"$886K EBITDA per module"是**会计利润率指标**, 不等于**每卖一个模块净收现金$886K**
- 真实单模块现金毛利 = Revenue - 零件成本 - 直接人工 - 运营费用分摊 — 可能显著低于$886K, 因为需要扣除资本化的feedstock成本
- 这个区分对FCF分析至关重要 (变量2), 留Phase 2深挖

**三情景2026 Aerospace Products EBITDA敏感性分析**:
| 情景 | 模块数 | 综合EBITDA/模块 | 2026 EBITDA | vs管理层$1.05B |
|-----|-------|----------------|-------------|---------------|
| A. 悲观 (Rome miss) | 900 | $886K (保持) | $797M | -24% |
| B. 中性 (量达但PMA延迟) | 1,000 | $950K | $950M | -10% |
| C. 乐观 (量+PMA双达) | 1,050 | $1,000K | **$1,050M** | **0% (达成)** |
| D. 超乐观 (+ mix upgrade) | 1,100 | $1,050K | $1,155M | +10% |

**关键信息**: 管理层$1.05B target要求"量+单位经济学"双达成. 因为单模块综合EBITDA的扩张依赖PMA批准 (binary event) + 第三方合同占比下降 (结构改善), 这两项是非线性因素, 所以$1.05B target**不是**对$886K × 1,050的简单线性外推.

### L4 证伪层 — 什么会打破这个逻辑

**证伪条件 (严重度排序)**:

1. **Rome工厂ramp-up失速** (严重度高): 追踪指标是Montreal / Miami / Rome的月度产出披露. 因为Rome是首次full year operation, 没有内部历史基准率, 所以其"月均17个"目标的达成概率**不能用数字量化** — 这里明确标注: 我们没有足够数据做精确概率赋值, 只能说这是**最大单点风险**
2. **Feedstock成本上升** (严重度中): 追踪指标是FTAI季度披露的aircraft investments或CapEx replacement line. 如果2026年feedstock spending超过2025年的$320M的30%+ (即>$415M), 则feedstock成本吞噬margin
3. **PMA批准延迟** (严重度中, 影响margin不影响量): FAA审批周期18-36个月, 不在FTAI控制范围. 追踪指标是管理层季度披露的新PMA数量
4. **客户需求softness** (严重度低): 全球CFM56机队每年维护需求远超FTAI capacity, 因此需求端短期不是瓶颈. 但若航空公司加速CFM56机队退役 (例如LEAP供应改善+燃油经济性考量), 长期需求曲线下移
5. **AAR进入模块业务** (严重度中, 时间窗口2-3年后可能显现): 当前信号仅是AAR Cebu Pacific nacelle MRO合同, **不是**AAR module factory投资. 所以"2-3年保质期"是基于"AAR若建module产能约需2-3年"的行业经验推断, 不是从合同本身推出的硬结论. 这里明确标注为**弱信号下的推测**, 留Phase 3竞争深挖验证

**追踪指标阈值 (P2/P3回看)**:
| 指标 | 强信号 | 中性 | 警示 |
|-----|--------|------|-----|
| Q1 2026模块交付总数 | ≥230 | 200-230 | <200 |
| Montreal月均产出 | ≥45 | 40-45 | <40 |
| Miami季度产出 | ≥80 | 70-80 | <70 |
| Rome月均产出 | ≥17 | 13-17 | <13 |
| Feedstock CapEx季度 | <$100M | $100-130M | >$130M |

**收敛判断**: Layer 4产生了feedstock供应/PMA binary性/AAR弱信号等新维度, 不是Layer 1-3的同义改写. 继续Layer 5可能探索SCI LP承诺结构对feedstock采购的影响, 但已超出Phase 1范围. **收敛于Layer 4**.

**对H1/H3假说的影响 (P1阶段)**:
- 量端数据(757+1%超预期; 2026+39%指引)**支持**H1/H3的前提条件(Aerospace Products确实是核心引擎)
- 但量端达成不等于PE re-rating, PE re-rating取决于margin + 可比估值锚 → 这在发现#2回答

---

## 关键发现 #2: Margin 34-36%稳态 vs 40%目标的跨越机制

### L1 数据层 — 季度margin trajectory

**Aerospace Products EBITDA margin quarterly**:
- Q3 2024: **34%** (Adjusted EBITDA $232M全公司, Aerospace部分margin 34%) [DM-FIN-001]
- Q1 2025: **36%** (ex-third-party contracts: 38%) [DM-FIN-002]
- Q2 2025: **34%** (EBITDA $164.9M) [DM-FIN-003]
- Q3 2025: **35%** (EBITDA $180.4M, +77% YoY) [DM-FIN-004]
- Q4 2025: **35%** (EBITDA $195M) [DM-FIN-005]
- FY 2025: **36%** ($671M EBITDA) [DM-FIN-006]
- **FY 2026 target: ~40%** ($1.05B EBITDA guidance)
- **Upside scenario管理层提及**: "potential to expand to 50% as remaining PMA parts approved"

**关键观察 — margin并非持续上升**:
从Q3 2024的34%到Q1 2025的36%是+2pp改善. 但从Q1 2025的36%到Q4 2025的35%是-1pp (尽管量+42%). 因此**2025年季度margin在34-36%区间内波动, 没有呈现趋势性上升**. 这与P0.5旧地图的"规模扩张 → margin持续改善"隐含假设不一致.

### L2 机制层 — margin稳态的三个效应分解与40%跨越路径

因为Q1 2025 ex-third-party margin是38% vs 整体36%, 所以**2pp差距来自第三方合同 (SCI管理费等)**. 这个数据点让我们可以拆分稳态的驱动力, 但需要注意**只有一个季度有ex-third-party披露**, 所以不能排除其他季度第三方占比差异. 以下分解基于Q1数据外推, 严格说是**单季度证据支撑的假设**, 留P2财务归因进一步验证:

**效应A — 规模效应 (可能已在趋向饱和)**:
Q1→Q4 2025季度量从~161→228模块, 增长+42%. 因此如果规模效应仍是主要drive, margin应该同步扩张. 但实际margin从36%→35% (整体口径), 没有扩张. 所以**要么规模效应已趋饱和, 要么规模效应被其他效应抵消**. 仅凭Q1/Q4两个点无法确定哪种解释更强, 因此:
- 假设1: 规模效应饱和 — 工厂固定成本摊薄空间在65-75%产能利用率后曲线趋平, FTAI可能处于这个区间
- 假设2: 规模效应仍在但被SCI dilute抵消 — 如果SCI第三方合同占比在Q4比Q1更高, 则规模效应的+1-2pp被SCI的-2pp抵消
- **P1结论**: 数据一致于规模饱和假设, 但不能排除SCI dilute假设. Phase 2需要季度第三方revenue披露澄清

**效应B — SCI第三方合同的margin dilute**:
因为Q1 2025 ex-third-party 38% vs 整体36%, 所以第三方合同margin约为20-25% (推算: 第三方占revenue 15%时, 38%×85% + X%×15% = 36%, 解出X=24%). 这个margin profile符合"资产管理管理费"业务模型 — fee-based revenue的margin天然低于proprietary module sales. 因此**SCI越做大, Aerospace Products整体margin面临越大的稀释压力**. 这与管理层"40% margin target"的路径存在**结构性矛盾**, 除非管理层计划把第三方合同在财务上剥离出Aerospace segment

**效应C — PMA批准 (40%→50%的主要杠杆)**:
PMA机制: FAA授权第三方生产与原厂等效的航空零件, 让FTAI绕开CFM/GE的OEM零件. 因为OEM零件的毛利被原厂垄断定价, 所以PMA批准让FTAI从"外购OEM部件做组装"变为"自产关键部件做组装", 每个模块的COGS下降. 业内常见的PMA带来的部件成本降幅是40-60%, 具体取决于零件复杂度和OEM溢价.
- 审批周期: 典型18-36个月 per part
- FTAI的2026年40% margin target = 假设**一批关键PMA在1-2年内批准完成**
- 管理层提及的50% upside = 假设**大部分PMA组合完成批准**
- 因此margin扩张路径取决于FAA审批节奏 + FTAI申请数量. 这是**binary event的时间序列**, 不是连续变量. 所以用"线性趋势外推"预期margin会误判

**综合机制 — 为什么36%→40%不是简单的+4pp线性扩张**:
因为规模效应已接近饱和 (假设1的情况), 所以剩余+4pp margin必须来自"PMA批准 + 第三方合同占比下降"的组合. 但SCI规模在2026持续扩大的情况下, 第三方合同占比更可能上升而不是下降. 因此**40% target隐含了PMA批准的aggressive时间表 + 第三方dilute被PMA gain完全覆盖**. 这是一个双重条件, 任一不成立则target miss.

### L3 估值含义层 — 与TDG/HEICO对标的逻辑重审

**行业margin benchmark (EBITDA margin)**:
- **AAR Corp (aftermarket services)**: **12.0-12.4%** (Q3-Q4 FY2025) [DM-COMP-001]
- **HEICO (aftermarket parts, Flight Support + Electronic Technologies)**: ~25-28%整体, Flight Support segment更高
- **TransDigm (TDG, proprietary aftermarket)**: **55%+**
- **FTAI Aerospace Products (current)**: **36%**
- **FTAI (2026 target)**: **40%**
- **FTAI (管理层upside)**: **50%**

**对H3 (稀缺性溢价)的验证**:

因为AAR的EBITDA margin是12%, 而FTAI Aerospace Products是36%, 所以绝对差距约3倍. 但这个对比需要口径谨慎:
- AAR的整体aftermarket包含低margin的parts distribution + repair services + supply chain + technology services
- FTAI Aerospace Products 是相对聚焦的module factory + MRE + PMA
- 如果把AAR的业务拆到"Parts Supply"单一segment (AAR披露的分部门), margin可能更高. 但即使AAR最高margin分部门, 也远低于36%
- 因此**"3倍margin gap"方向上真实, 精确倍数取决于可比口径** — 留Phase 3严格对标

这个gap的驱动力 (H3的机制解释):
- **机制1 — 垂直整合feedstock套利**: FTAI通过Aviation Leasing收购并retire飞机, 拆解获得CFM56 modules作为input. 因为内部转移价格可能低于外部采购价, 所以这给Aerospace Products带来了**成本优势**. 但这个优势的真实大小需要Phase 2估算Aviation Leasing的独立IRR (剥离内部转移价格后)
- **机制2 — PMA定价权**: FTAI的PMA组合让FTAI绕开OEM零件的垄断定价. 因为CFM是GE-Safran合资公司, OEM零件毛利高, 所以PMA的spread大
- **机制3 — Module Factory规模**: 三工厂1,800模块的年度维护capacity让FTAI成为行业最大的独立module supplier, 因此采购spare parts时有bulk discount优势
- 这三个机制的叠加构成H3稀缺性的**基本面支撑**. 但也意味着如果任一机制被稀释 (例如OEM降价 / 竞争者获得同级PMA组合 / 自有feedstock源枯竭), 整个溢价会松动

**对H1 (估值锚点) — 三候选的条件性判断, 不过早锚定**:
因为用margin单一维度选锚点忽略了商业模式机制差异, 所以**Phase 1不对H1做最终锚定**, 只列三候选及其成立条件:

| 候选锚点 | 成立条件 | 隐含Forward PE | Forward EPS $7.7对应公允价值 |
|---------|---------|--------------|---------------------------|
| **TDG锚** (30-40x) | 若Phase 3证实FTAI具有"proprietary parts定价权垄断" (PMA完整覆盖关键部件) 且margin在2-3年内向50%迈进 | 30-40x | $231-$308 |
| **HEICO锚** (35-45x) | 若FTAI是"垂直整合 + PMA + 服务组合"的HEICO-like平台, margin稳定在35-40%区间 | 35-45x | $270-$347 |
| **独立锚** (介于HEICO和AerCap之间) | 若稀缺性溢价是真实但**有保质期** (2-3年后被AAR/HEICO竞争稀释), 估值应反映cash flow的时间限制 | 20-30x | $154-$231 |

**关键纪律**: 当前市价$259处于HEICO锚的下沿. 因此表面看"已price-in HEICO锚点", 但**锚点选择本身**是Phase 3的任务. Phase 1不得用单一margin维度直接结论"应对标HEICO"— 这个修正路径过早且逻辑链不完整, 需要Phase 3从商业模式机制层面重新对标.

### L4 证伪层 — 稀缺性溢价的时间限制与锚点验证路径

**证伪条件**:

1. **AAR/HEICO进入CFM56 module业务** (时间窗口2-3年后可能显现):
   因为AAR Cebu Pacific nacelle MRO (Q4 2025)是客户关系建立, 不是module capacity投资, 所以**当前信号强度弱**. 如果AAR在2026-2027宣布新建module factory或收购existing CFM56 module player, 则稀缺性溢价面临稀释. 这是一个**需要主动追踪**的信号, 不是已经发生的事实
2. **PMA批准延迟** (概率中, 不可控): FAA审批backlog风险. 若FTAI 2026年披露的新PMA数量少于2025年, 则40%→50%路径时间表后移
3. **SCI第三方合同扩张dilute持续** (高概率): SCI的业务逻辑本身就是规模扩张, 因此第三方revenue占比大概率上升. 若管理层不将其在财务上与core Aerospace Products分离, 整体margin面临持续稀释压力
4. **CFM Materials Agreement续约风险 (2030+)**: 独家协议是H3的关键部件之一, 如果2030年前续约条款恶化, 对长期thesis 有影响. 但这超过P1 time frame, 留Phase 3监控
5. **CFM56机队退役加速**: LEAP-1A/1B替代速度若超预期, aftermarket需求曲线前移, 模块demand下行. 追踪指标是全球737NG / A320ceo的storage/retirement rate

**追踪指标 (P2/P3回看)**:
- **Q1 2026 Aerospace margin**: ≥37%=强信号 / 35-37%=稳态延续 / <35%=稀释已开始
- **FTAI季度披露的新PMA批准数**: 保持或上升=PMA路径on track / 下降=margin扩张风险
- **AAR / HEICO的CFM56相关订单 + capacity investment公告**: 监控AAR quarterly earnings中aftermarket engine services growth line
- **SCI第三方revenue的绝对值与占比** (if FTAI披露): 判断dilute趋势

**收敛判断**: Layer 4引入了PMA binary/SCI dilute/CFM Materials 2030/机队退役加速等新维度, 不是Layer 3重述. Layer 5可能探索具体PMA部件清单和FAA审批优先级, 但超P1范围. **收敛于Layer 4**.

---

## 关键发现 #3: P0.5 failure_points的P1初步回看 (新增, 修复FP4覆盖缺口)

> P0.5 default_map_audit识别了5个failure_points作为旧地图检验靶. P1的模块+margin深挖过程中, 已经接触到部分FP的相关数据. 这里显式做初步回看, 不留空白给Phase 2, 避免"留P2"成为系统性覆盖缺口.

**FP1 (负FCF vs compounder叙事) — 部分触及, 主检验留Phase 2**:
- P1发现: 单模块综合EBITDA $886K (会计口径) 不等于单模块现金毛利. 因此"Aerospace Products $671M EBITDA"这个数字的真实现金贡献可能显著低于会计数字
- 初步判断: FP1的"三年累计-$3.1B FCF vs 高EBITDA"矛盾可能部分解释为"EBITDA中含大量非现金项目 + feedstock囤积占用现金". 具体分解留P2

**FP2 (DIO+132天 vs GM +19pp) — P1数据修正P0.5理解**:
- P0.5理解: "DIO恶化+毛利率改善"是反向组合, 旧地图无解释
- P1发现: 毛利率扩张"+19pp"实际是Q4 2024 16.6% → Q4 2025 35%的**一次性release** (从产能利用率低点走向正常). 之后margin在34-36%稳态, 没有持续扩张. 因此FP2的"反向组合"更准确的描述是: **DIO持续恶化 (战略囤积) + GM在35%稳态 (规模效应已饱和)**. 所以P0.5 FP2 partial削弱 — 不是"反常的持续扩张", 而是"一次性释放 + 稳态"

**FP3 (PE 56x vs WLFC 5x = 11倍差距) — P1数据支持但有时间限制**:
- P1发现: FTAI Aerospace Products 36% margin vs AAR 12% = ~3x差距, 方向上真实. 这支撑"航空租赁部分 (WLFC-like) 应低估, 但Aerospace Products部分 (TDG/HEICO-like) 应高估"的SOTP逻辑
- 但: 精确倍数取决于可比口径. 而且稀缺性溢价有保质期 (AAR/HEICO可能2-3年内进入)
- 所以: FP3 **强化** 但需加时间维度. PE 11倍差距合理存在, 但未必永续

**FP4 (CapEx 2026+塌陷70%) — P1数据提供重要初步检验**:
- P0.5提出: "CapEx 2026-2028 guidance $100-130M (-70%)" 与 "继续扩张到25% TAM share" 不匹配
- P1数据检验: 2025年工厂利用率
  - Montreal 377 vs 满产能未披露 (推测利用率较高, 因为是core facility先建)
  - Miami 275 vs 600 capacity = **46% utilization**
  - Rome 105 vs 半年运营 (年化~210, 未披露满产能)
- **关键发现**: Miami仍有大量capacity headroom (54% 可上升空间), Rome刚启动. 因此2026目标1,050不需要新建capacity, 只需**现有工厂提升利用率**. 这**直接解释**了CapEx 2026+为什么塌陷: **扩张期在2024-2025结束, 2026-2028进入收割期**
- **对FP4的判定**: FP4从"解释不通的异常"变为"有内部一致性的扩张期结束信号". 这**削弱**旧地图的"FP4反常性", 但**支持**P0.5候选范畴D ("CFM56最后5-10年现金流提取 — 时间窗口价值捕获")
- **对评级方向的含义**: 如果FP4支持候选D, 则永续增长假设削弱, 估值应用有限寿命DCF, 不是永续增长PE — 这对H1 (TDG锚)是**负面信号**, 对H3 (稀缺性溢价)是**中性** (稀缺但有时间限制的溢价)

**FP5 (CEO持股+16.7x vs Q4连续miss) — P1未触及**:
- P1聚焦模块+margin运营层面, 未涉及内部人交易动机分析
- 留Phase 2财务深度或Phase 3治理/对齐分析

**初步结论 (P0.5→P1 FP状态更新)**:
| FP | P0.5状态 | P1后状态 | 对评级方向 |
|----|---------|---------|-----------|
| FP1 | 解释不通 | partial触及, 主留P2 | — |
| FP2 | 反常组合 | **削弱 — 一次性release + 稳态, 不是持续扩张** | 对H1偏负面 |
| FP3 | 11倍估值差 | **强化但有2-3年保质期** | 对H3中性, 对估值永续性偏负面 |
| FP4 | CapEx塌陷反常 | **削弱 — 与候选D"收割期"一致** | 对H1偏负面, 支持候选D |
| FP5 | 行为冲突 | 未触及 | — |

**对Phase W P2末Pivot Gate的预告** (铁律W):
- 已削弱的FP: FP2, FP4 (两个)
- 已强化的FP: FP3 (一个)
- 未触及: FP1, FP5 (留P2)
- **削弱率当前约2/5 = 40%** — 进入"WEAKEN区间" (30-50%). 但数字不稳定 — P2完成后FP1验证可能大幅改变分母分布. Phase 2末完整Pivot Gate才是决定点

---

## P1 综合判断 — 对后续Phase的输入 (不给评级方向)

### H1/H3假说状态更新 (保留原非共识alpha, 不过早锚定)

| 假说 | P0.5状态 | P1验证后状态 | P1新发现 |
|-----|---------|-------------|---------|
| H1 (FTAI像TDG估值) | 未验证 | **锚点候选三分支 (TDG/HEICO/独立), Phase 3决定** | margin 36% < TDG 55%但 > HEICO 25-28%; FP4塌陷支持候选D有限寿命 |
| H3 (稀缺性溢价) | 未验证 | **机制验证 (3倍margin gap真实), 但有2-3年保质期条件** | 垂直整合+PMA+规模三重机制;AAR弱信号 |

**保持alpha开放**: P1不给评级方向判断. 因为Phase 2 FCF / Phase 3 竞争 / Phase 4 红队都可能颠覆当前判断, 所以过早锚定评级有确认偏差风险. 只给三维状态初步观察:
- **价值状态**: 未确认 (TDG / HEICO / 独立锚三种情景分别对应-11%/+19%/+乐观情景$308不等)
- **方向状态**: 部分观测 — 量端改善 (757 modules beat) + margin稳态 (非改善也非恶化)
- **催化状态**: 部分观测 — Q1 2026 earnings是短期催化 (5月初), 2026 FY PMA批准数是中期催化

### 关键变量P1结论

| 变量 | P0.5预期 | P1验证 | Phase 2需要 |
|-----|---------|-------|-----------|
| 变量1 (2026模块1,050) | 待验 | 量趋势成立; Rome ramp是最大单点风险; 精确达成概率不可量化 | Q1 2026 earnings监控 |
| 变量3 (margin 36%→40%) | 待验 | 规模效应饱和可能; 跨越依赖PMA+第三方占比改善双条件 | 财务归因分解规模/mix/PMA各贡献 |
| 变量2 (FCF trajectory) | 待验 | 单模块现金毛利 vs EBITDA需区分 | P2核心 |

### Phase 2 优先问题清单

1. 2025 Q4 FCF具体数字 + 2026 FCF trajectory quarterly guidance (if披露)
2. 财务归因: $671M Aerospace EBITDA的**Module vs MRE vs PMA vs 第三方SCI**四部分分解
3. Aviation Leasing的independent IRR (剥离内部transfer price) — 验证H4 feedstock套利 + FP1部分
4. SCI第三方revenue的绝对值与占比季度轨迹 — 验证SCI dilute假设
5. 毛利率Bridge: Q4 2024 16.6% → Q4 2025 35%的分解 (一次性release vs 持续驱动)
6. **内部人交易详细分析** (FP5) — Form 4每月明细, CEO买入vs卖出的时机与仓位

### Phase 3 优先问题清单

1. AAR CFM56业务扩张速度 + 潜在module factory投入信号
2. HEICO integration完成后时间表 (何时重启aggressive acquisition)
3. Standard Aero / MTU Aero Engines在CFM56 module的竞争定位
4. CFM Materials Agreement续约风险 (2030+) — AAR是否能挑战
5. **H1锚点最终决定**: 基于Phase 3商业模式机制深挖, 从TDG/HEICO/独立三候选中选择

### Phase W (Pivot Gate) P2末预告

当前5个FP状态: **2削弱 (FP2/FP4), 1强化 (FP3), 2未触及 (FP1/FP5)**. 削弱率40% = WEAKEN区间阈值. P2完成FP1/FP5检验后最终决定.

**需要主动搜索的削弱证据** (铁律W W-4强制):
- 对FP3: 主动搜索"AAR或HEICO 2026年CFM56 module capacity扩张公告" — 如果找到, FP3从"强化"转"削弱"
- 对H1: 主动搜索"HEICO商业模式是否包含FTAI-style垂直整合" — 如果HEICO没有自有feedstock, 则HEICO锚不适用, TDG或独立锚更优
- 对H3: 主动搜索"Standard Aero / MTU在CFM56 module的margin数据" — 如果行业其他玩家margin都在30%+, 则FTAI的36%不那么稀缺

---

**End of Phase 1 Findings v2** — 下一步: Phase 2 FCF+财务归因+剪刀差. 触发铁律W P2末Pivot Gate最终判定.
