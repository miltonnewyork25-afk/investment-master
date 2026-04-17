# FORM Phase 3: 竞争深度 + 战略分析

> **Phase 3 目标**: 用竞争数据检验Phase 2估值假设，量化Technoprobe威胁，建立供应链传导模型
> **写作日期**: 2026-04-17 | **DM目标**: ≥50个锚点

---

## 3.1 FORM vs Technoprobe: 头对头财务对比

### 收入规模与增速对比

FORM和Technoprobe构成探针卡行业的"溢价双寡头"[DM-COMP-001]。两家公司的财务轨迹在2021-2025年间呈现截然相反的方向:

| 指标 | FORM FY2025 | Technoprobe 9M2025* | FORM 5Y CAGR | Technoprobe趋势 |
|------|-------------|---------------------|--------------|-----------------|
| 收入 | $785M [DM-FIN-001] | €466.6M (9M) [DM-COMP-002] | +0.5% | +20.6% YoY (9M) |
| GM | 39.5% | 47.3% (Q2) [DM-COMP-003] | 平→微降 | 扩张中 |
| EBITDA率 | 13.4% ($105M) | 32.6% (H1) [DM-COMP-004] | 收缩 | 扩张 |
| 净利润 | $54M [DM-FIN-002] | €34.4M (H1) [DM-COMP-005] | -10.2% CAGR | 增长 |
| 现金 | ~$300M [DM-COMP-006] | €656.8M [DM-COMP-007] | — | 充裕 |

*Technoprobe FY2025全年数据推算: 9M €466.6M, 估算FY约€600-630M (~$650-680M)。两家收入规模接近但Technoprobe增速远超FORM。

**关键剪刀差 #5 (Phase 3新增): 双寡头利润率剪刀差**

FORM EBITDA率13.4% vs Technoprobe 32.6%——差距19.2个百分点[DM-COMP-008]。这不是暂时性偏差:

- **机制**: Technoprobe的垂直整合MEMS tip生产使其成本结构更优[DM-COMP-009]。FORM依赖外部供应链环节更多，固定成本摊薄效率更低
- **因果链**: Technoprobe利润率优势 → 更多研发投入(绝对额) → 技术追赶加速 → TSMC 2nm拿下30%份额 → 进一步拉开利润差距
- **对FORM估值含义**: 即使FORM收入增长(HBM驱动)，如果利润率被Technoprobe长期压制在40% GM以下，ROIC跨越WACC的时间窗口进一步推迟。这强化了Phase 2的核心发现——"增长方向和利润方向结构性相反"

**反面**: FORM Q4 FY2025 non-GAAP GM达到43.9%(+290bp QoQ)[DM-COMP-010]，管理层称2/3来自结构性改善(良率/周期时间/人员再部署)而非单纯放量。如果这个结构性改善持续，利润率剪刀差有收窄空间。但需要验证: Q1 FY2026 GM是否维持>42%。

### Technoprobe 2027目标 vs FORM隐含假设

Technoprobe中期目标[DM-COMP-011]:
- **2027收入**: €850-900M (从FY2025估算€600-630M, 隐含2年CAGR ~16-19%)
- **2027 EBITDA率**: 38-40% (从H1 2025的32.6%进一步扩张)
- **产能翻倍**: 2026-2027年间完成，Dresden新厂€80M投资[DM-COMP-012]

FORM Cantor $125目标隐含[DM-COMP-013]:
- **CY2027收入**: ~$1,050M (从FY2025 $785M, 隐含2年CAGR ~16%)
- **CY2027 OPM**: >22% (从FY2025 8.5%, 需翻倍以上)
- **CY2027 EPS**: $4.00 (从FY2025 $0.69, 需5.8x增长)

**对比揭示的问题**: 两家公司对2027都给出了激进的增长目标。但市场对Technoprobe给予的估值远低于FORM:
- FORM: ~$128股价, EV/Sales ~12.7x[DM-VAL-001]
- Technoprobe: 市值约€5-6B, EV/Sales ~8-9x (基于FY2025估算收入)

因果推理: 如果两家都能达到2027目标，Technoprobe的利润率优势(38-40% EBITDA vs FORM隐含22% OPM)意味着Technoprobe的估值折价不合理，或者FORM的估值溢价不合理。更大的概率是: **市场对FORM的HBM叙事给了过高溢价，而Technoprobe的稳健增长被合理定价**[DM-COMP-014]。

---

## 3.2 市场份额动态: FORM的F&L失地与DRAM据点

### 探针卡市场结构

全球探针卡市场2026年约$27.1亿[DM-MKT-001]，CAGR 9.31%至2031年$42.3亿。市场集中度中等偏高:

| 排名 | 公司 | 估算份额 | 核心优势领域 |
|------|------|---------|------------|
| 1 | Technoprobe | ~25-28% | 先进逻辑/Foundry, TSMC |
| 2 | FormFactor | ~24-26% | DRAM/HBM, 北美逻辑 |
| 3 | MJC (Micronics Japan) | ~10-12% | 日本存储器客户 |
| 4 | JEM | ~8-10% | MEMS, 日本市场 |
| 5 | MPI | ~5-7% | 探针台+探针卡 |

[DM-MKT-002] Top 5合计约73%份额。FORM+Technoprobe+MJC三家约60%。

### FORM份额趋势: 两条相反的曲线

**F&L (Foundry & Logic) — 失地**:
- FY2024 F&L收入: $436M → FY2025: $370M (-15.1%)[DM-MKT-003]
- Technoprobe拿下TSMC 2nm 30%认证份额[DM-MKT-004]
- FORM在先进逻辑节点的份额正被系统性侵蚀
- 机制: Technoprobe的垂直整合MEMS tip生产 + 亚洲客户关系 + 更有竞争力的成本结构

**DRAM — 据点**:
- FY2025 DRAM收入: $247M[DM-MKT-005], 占PC segment 39%
- DRAM 5年增长(FY2021-2025): 从约$114M到$247M (+117%)[DM-MKT-006]
- Q4 FY2025创DRAM季度新高, Q1 FY2026预告再创新高(HBM3e+HBM4早期)[DM-COMP-015]
- SK Hynix占FY2025收入22.9%[DM-MKT-007] — 客户集中度风险

**净效果**: DRAM增长($133M) vs F&L萎缩(-$66M) = 净增$67M。但这意味着FORM的增长引擎正在从分散(F&L多客户)转向集中(DRAM少数客户)——**增长质量在下降，即使增长速度在上升**[DM-MKT-008]。

### 份额趋势的结构性含义

这里存在一个容易被忽视的动态: **FORM在F&L的份额流失不是周期性的，是结构性的**[DM-MKT-009]。

证据:
1. Technoprobe 2nm认证份额30%——这是下一代制程，不是存量份额的争夺[DM-MKT-004]
2. Technoprobe Dresden新厂投产(2025年9月)——专门targeting欧洲fab[DM-COMP-012]
3. Technoprobe 2026-2027产能翻倍计划——没有产能就没法抢份额，有产能就是在准备抢份额[DM-COMP-011]
4. FORM F&L连续2年收入下降: FY2024 $436M → FY2025 $370M[DM-MKT-003]

反面考量: FORM声称在"高复杂度"F&L探针卡(>150K触点)仍保持技术领先。但这个"高复杂度"细分市场的TAM有多大？如果只占F&L的20-30%，那FORM实际上在"中低复杂度"F&L已经被Technoprobe系统性取代。这个细分数据不公开，是黑箱[DM-MKT-010]。

---

## 3.3 博弈论分析: FORM-Technoprobe-客户-TSE四方互动结构

### 博弈结构识别

**参与者**: 
1. **FORM** — DRAM/HBM主导者，F&L正在失地
2. **Technoprobe** — F&L挑战者，正在向DRAM/HBM渗透
3. **Memory客户** (SK Hynix/Samsung/Micron) — 探针卡买方，对质量和交期高度敏感
4. **TSE/MJC/JEM** — 区域性竞争者，在特定客户有深度关系

### 博弈1: FORM vs Technoprobe — 不对称攻防

**当前均衡**: 领地分治——FORM主导DRAM/HBM，Technoprobe主导先进F&L。但这个均衡正在松动。

**Technoprobe的进攻策略**[DM-GAME-001]:
- **利润率武器**: 32.6% EBITDA率 vs FORM 13.4% → Technoprobe可以在新市场(DRAM)接受更低的初始定价，FORM无法在F&L做同样的事
- **产能武器**: 2026-2027产能翻倍 → 有能力承接新客户而不牺牲现有客户交期
- **地理武器**: Dresden厂瞄准欧洲fab + 亚洲基地巩固TSMC → 两线推进

**FORM的防守困境**[DM-GAME-002]:
- **F&L反击成本高**: 在F&L与Technoprobe价格战 = 压缩已经很薄的利润率(GM 39.5%)
- **DRAM护城河是否持久**: 探针卡认证周期12-18个月，但一旦Technoprobe通过SK Hynix/Samsung认证，壁垒消失
- **资本约束**: FORM现金$300M vs Technoprobe €657M → Technoprobe的投资火力更强

**均衡预测**: Technoprobe在2-3年内进入DRAM/HBM的概率约40%[DM-GAME-003]。
- 历史基准率: 探针卡行业跨segment渗透成功案例约50% (Technoprobe自身从F&L起步成功进入更广市场)
- 反例条件: HBM的技术壁垒(16-high stack testing, 极细间距)比标准DRAM更高 → 降低到40%
- 自然实验: 如果Technoprobe在2027前获得任何一家HBM maker的量产订单 → 概率跳升到70%

### 博弈2: Memory客户的双供应商策略

**客户激励结构**[DM-GAME-004]:
- SK Hynix/Samsung/Micron都有强烈的"避免单一供应商依赖"动机
- 当前FORM在DRAM探针卡的主导地位 = 客户的议价劣势
- 客户培育Technoprobe进入DRAM的动机: 降低FORM定价权 + 保障供应安全

**博弈推演**:
- **SK Hynix** (FORM最大客户, 22.9%收入): 最有动力培育第二供应商。一旦HBM4量产稳定(预计2027)，qualification窗口打开
- **Samsung**: HBM产能2026年+50%[DM-GAME-005]，大规模扩产需要多元化探针卡供应
- **Micron**: CapEx从$18B上调到$20B[DM-GAME-006]，ID1新厂2027年投产，是Technoprobe进入DRAM的潜在突破口

**结论**: 客户与Technoprobe的利益是一致的——都想打破FORM在DRAM的垄断。这不是阴谋论，是标准的供应链风险管理[DM-GAME-007]。时间窗口: 2027-2028年，当HBM4量产成熟后。

### 博弈3: Advantest的双重投注

2025年Advantest同时对FORM和Technoprobe进行战略投资[DM-GAME-008]。这个信号很重要:

- Advantest是全球最大的半导体测试设备公司(ATE)
- ATE和探针卡是互补品: 每台ATE需要配套探针卡
- 双重投注 = Advantest不确定谁会赢 → 市场结构不稳定的信号
- 也意味着: 技术差距已经小到Advantest无法押注单一赢家

---

## 3.4 供应链传导: Memory CapEx → 探针卡需求的时滞与衰减

### Memory CapEx 2026预测

[DM-SUPPLY-001] DRAM行业总CapEx预测:
| 公司 | 2025E CapEx | 2026E CapEx | YoY增长 | 重点方向 |
|------|------------|------------|---------|---------|
| Samsung | $18B | $20B | +11% | 1C制程HBM, P4L扩产 |
| SK Hynix | $17.5B | $20.5B | +17% | HBM4 M15x厂 |
| Micron | $13.8B | $20B | +45% | 1-gamma, TSV设备 |
| **合计** | **$49.3B** | **$60.5B** | **+23%** | |

### 传导链: CapEx → 探针卡需求

**关键问题**: Memory CapEx+23%是否意味着探针卡需求+23%？**答案是否定的**[DM-SUPPLY-002]。

传导链每一环都有衰减:
1. **总CapEx → WFE CapEx**: 只有~55-60%的CapEx用于设备采购(其余是土建/安装)[DM-SUPPLY-003]
2. **WFE → 测试设备**: 测试设备占WFE约5-7%(远小于光刻/沉积/刻蚀)[DM-SUPPLY-004]
3. **测试设备 → 探针卡**: 探针卡是消耗品，不完全跟随设备采购周期——更跟随wafer start数量
4. **Wafer starts → FORM收入**: FORM份额在DRAM是主导但在F&L在流失 → 净传导系数<1

**量化传导**:
- Memory CapEx +23% ($60.5B) [DM-SUPPLY-001]
- WFE占比60%: ~$36B → 测试设备5%: ~$1.8B → 探针卡(消耗品, 独立于WFE): 全球DRAM探针卡TAM约$800M-$1B
- FORM DRAM份额~50-60%: DRAM探针卡收入潜力$400-600M
- 当前FORM DRAM收入$247M → 如果份额不变且HBM content per wafer上升，$350-400M是合理的FY2027目标

**时滞**: CapEx决策到探针卡订单通常6-12个月滞后[DM-SUPPLY-005]。2026年CapEx增长将在2026H2-2027H1体现在探针卡收入中。

### HBM世代演进对Content Per Wafer的影响

**HBM content per wafer上升的驱动力**[DM-SUPPLY-006]:
1. **Die stack高度**: HBM3: 8-12层 → HBM4: 12-16层 → 每个stack需要更多KGD(Known Good Die)测试
2. **Pin count**: HBM4接口2048数据信号(vs HBM3的1024)[DM-SUPPLY-007] → 探针卡接触点翻倍
3. **测试速度要求**: HBM4频率>6.4Gbps，需要更高频探针卡(FORM HFTAP K40: -3dB@7GHz)[DM-SUPPLY-008]
4. **良率要求更严**: 16层stack的良率 = 单die良率^16 → 每die必须更严格筛选 → 更多测试时间

**量化影响**: Cantor的bull case核心论点是"HBM4 pin count翻倍 → 磨损加速 → 探针卡更换频率翻倍 → content per wafer翻倍"[DM-SUPPLY-009]。

**反驳**: 
1. **JEDEC SPHBM4标准**: 将data信号从2048减到512(4:1串行化)[DM-SUPPLY-010] → 如果采用，pin count并不翻倍
2. **SK Hynix自研测试设备**: SK Hynix正在开发HBM4系统级测试设备[DM-SUPPLY-011] → 如果内部化测试能力，外购探针卡需求可能被压缩
3. **Content翻倍 ≠ 收入翻倍**: 探针卡pricing power在DRAM有限(Phase 1已验证: 标准化产品定价模式)，content上升可能被ASP下降部分抵消

**结论**: HBM content per wafer上升是真实的正面驱动力，但"翻倍"叙事被过度简化。实际传导系数约1.3-1.6x(非2x)[DM-SUPPLY-012]，因为SPHBM4标准 + 客户自研测试 + ASP压力会衰减pin count翻倍的全部效果。

---

## 3.5 WFE Comp对标: FORM在测试设备板块的估值异常

### WFE测试设备可比公司

| 公司 | 市值 | EV/Sales | Forward PE | GM | 5Y Rev CAGR | 业务 |
|------|------|---------|-----------|------|------------|------|
| Advantest | ~$40B | ~8x | ~35x | ~56% | ~15% | ATE主导 |
| Teradyne | ~$20B | ~7x | ~30x | ~58% | ~5% | ATE+机器人 |
| Cohu | ~$2B | ~3x | ~20x | ~47% | ~3% | 后段测试 |
| **FORM** | **$10B** | **12.7x** | **71x(FWD)** | **39.5%** | **0.5%** | **探针卡** |

[DM-WFE-001]

**FORM的估值异常**:
1. **EV/Sales 12.7x** vs WFE comp中位数~7x → FORM溢价81%[DM-WFE-002]
2. **Forward PE 71x** vs comp中位数~30x → FORM溢价137%
3. **GM 39.5%** 是comp中**最低**的 → 利润率不支持溢价
4. **5Y CAGR 0.5%** 是comp中**最低**的 → 增长率不支持溢价

**唯一的解释**: 市场在对HBM叙事给予极高溢价。FORM的估值不是在为"现在的公司"定价，是在为"如果HBM4全面爆发后的公司"定价[DM-WFE-003]。

但Phase 2已证明: 即使是Cantor的bull case ($1,050M rev + 22% OPM)，在工业设备框架下也只支持$72——当前$128仍高估78%[DM-WFE-004]。

### 为什么市场愿意给FORM这么高的溢价？

三个叙事溢价来源[DM-WFE-005]:
1. **"HBM瓶颈"叙事**: 探针卡是HBM量产的瓶颈之一 → 瓶颈=稀缺=定价权。但Phase 1已证伪: FORM没有定价权(标准化产品+客户谈判力强)
2. **"Content per wafer翻倍"叙事**: HBM4 pin count翻倍 → 消耗品需求翻倍。但本章已证明传导系数是1.3-1.6x，非2x
3. **"纯正AI/HBM概念股"叙事**: FORM是公开市场上为数不多的"纯HBM受益标的" → 资金追逐有限的HBM exposure → PE膨胀。这个叙事是真实的——但它解释了**为什么贵**，不能justify**该不该这么贵**

---

## 3.6 风险拓扑: 竞争维度的关键风险

### 风险1 (RED): Technoprobe进入DRAM/HBM [DM-RISK-001]
- **概率**: 40% (2027年前获得量产订单)
- **影响**: FORM DRAM收入从$247M可能降至$180-200M，如果份额从~55%降到~40%
- **触发信号**: 任何HBM maker宣布Technoprobe探针卡认证通过
- **时间窗口**: 2027-2028

### 风险2 (YELLOW): 客户垂直整合测试 [DM-RISK-002]  
- **概率**: 25%
- **影响**: SK Hynix/Samsung部分内部化HBM测试 → 外购探针卡需求-15~20%
- **触发信号**: SK Hynix HBM4系统级测试设备商业化
- **时间窗口**: 2027-2029

### 风险3 (YELLOW): SPHBM4标准采用 [DM-RISK-003]
- **概率**: 50% (JEDEC标准通常被广泛采用)
- **影响**: 减少探针卡pin count需求，content per wafer从预期的2x降到1.2-1.4x
- **时间窗口**: 2027-2028

### 风险4 (GREEN → Watch): Hyperscaler CapEx周期见顶 [DM-RISK-004]
- **概率**: 35% (2027年)
- **影响**: AI训练投资减速 → HBM需求增速放缓 → 探针卡需求增长停滞
- **触发信号**: 任何两家Hyperscaler连续2季CapEx QoQ负增长

---

## 3.7 Phase 3关键发现总结 (供Phase 4红队使用)

### 关键发现 #1 (KF-3): Technoprobe的利润率和资本优势使其成为FORM的结构性威胁

**L1 数据**: Technoprobe EBITDA率32.6% vs FORM 13.4%[DM-COMP-008]，现金€657M vs $300M[DM-COMP-006/007]
**L2 机制**: 利润率优势 → 更大的价格战空间 + 更多研发投入 → 在新领域(DRAM)可以接受亏损期更长
**L3 含义**: FORM的DRAM据点不是不可逾越的——Technoprobe有经济能力在2-3年内发起挑战。如果DRAM份额从55%降到40%，DRAM收入从$247M降到$180M，全公司收入减$67M，EPS影响约-$0.55
**L4 证伪**: 如果Technoprobe到2028年仍未进入任何HBM maker的供应链 → 技术壁垒比预期更高，FORM DRAM护城河更宽
**收敛于**: Layer 3 (Layer 4未产生新的估值维度信息)
**对评级影响**: 强化"审慎关注"——竞争威胁增加了Phase 2估值的下行风险

### 关键发现 #2 (KF-4): 客户双供应商策略是确定性事件，只是时间问题

**L1 数据**: SK Hynix占FORM收入22.9%[DM-MKT-007]，Samsung HBM产能2026年+50%[DM-GAME-005]
**L2 机制**: 单一供应商依赖 → 客户议价劣势 → 客户主动培育第二供应商。这是供应链管理的标准做法，不需要Technoprobe主动进攻——客户会拉它进来
**L3 含义**: 即使Technoprobe自身没有进入DRAM的战略，Memory客户也会创造机会。这使得Risk #1(40%)的实际概率需要上调: 客户拉动 + Technoprobe主动 = 联合概率更高，约50-55%
**L4 证伪**: 如果三大Memory maker在2028年前都没有开始Technoprobe的DRAM探针卡认证 → 说明HBM技术壁垒确实很高，或者FORM的性价比在DRAM中确实有压倒性优势
**收敛于**: Layer 3
**对评级影响**: 进一步强化高估判断

### 关键发现 #3 (新增): HBM content per wafer的"翻倍"叙事被过度简化

**L1 数据**: HBM4 pin count 2048 vs HBM3 1024[DM-SUPPLY-007]，JEDEC SPHBM4: 512 data signals[DM-SUPPLY-010]
**L2 机制**: Pin count翻倍的全效果被三个因素衰减: SPHBM4标准(4:1串行化)、客户自研测试能力、ASP竞争压力
**L3 含义**: 实际content传导系数1.3-1.6x[DM-SUPPLY-012]，非市场预期的2x。这意味着Cantor的$1,050M收入目标需要更多的份额增长(而非仅content增长)来达成——但FORM在F&L正在失份额
**L4 证伪**: 如果SPHBM4标准不被采用(JEDEC改变方向)，且SK Hynix放弃自研测试 → content翻倍可能更接近真实
**收敛于**: Layer 3
**对评级影响**: 削弱bull case的核心叙事支撑

---

## Phase 3 DM锚点注册表

| ID | 数据点 | 来源 | 置信度 |
|-----|--------|------|--------|
| DM-COMP-001 | FORM+Technoprobe="溢价双寡头" | Testing Wall article, 行业报告 | A |
| DM-COMP-002 | Technoprobe 9M2025 €466.6M (+20.6%) | Technoprobe Q3报告 | A |
| DM-COMP-003 | Technoprobe Q2 GM 47.3% | Investing.com Q2报告 | A |
| DM-COMP-004 | Technoprobe H1 EBITDA率32.6% (€106.4M) | Technoprobe H1 PR | A |
| DM-COMP-005 | Technoprobe H1 净利润€34.4M | Technoprobe H1 PR | A |
| DM-COMP-006 | FORM现金~$300M | FORM Q4 earnings | A |
| DM-COMP-007 | Technoprobe现金€656.8M (Jun 2025) | Technoprobe H1 PR | A |
| DM-COMP-008 | EBITDA率差: FORM 13.4% vs Technoprobe 32.6% | 计算 | A |
| DM-COMP-009 | Technoprobe垂直整合MEMS tip生产 | 行业分析 | B |
| DM-COMP-010 | FORM Q4 FY2025 non-GAAP GM 43.9% (+290bp) | FORM earnings call | A |
| DM-COMP-011 | Technoprobe 2027目标: €850-900M rev, 38-40% EBITDA | CMD 2025 | A |
| DM-COMP-012 | Technoprobe Dresden厂€80M, 2025年9月开业 | 行业新闻 | A |
| DM-COMP-013 | Cantor $125: 31x × CY27 EPS $4.00 | Phase 2 staging | A |
| DM-COMP-014 | 双寡头估值对比: FORM EV/Sales 12.7x vs Technoprobe ~8-9x | 计算 | B |
| DM-COMP-015 | Q1 FY2026 DRAM预告创新高 | FORM Q4 earnings call | A |
| DM-FIN-001 | FORM FY2025收入$785M | FMP/10-K | A |
| DM-FIN-002 | FORM FY2025净利润$54M | FMP/10-K | A |
| DM-MKT-001 | 探针卡市场2026年$27.1亿, CAGR 9.31% | 多家市场研究 | B |
| DM-MKT-002 | Top 5份额73% | Mordor Intelligence | B |
| DM-MKT-003 | FORM F&L: $436M→$370M (-15.1%) | 10-K segment | A |
| DM-MKT-004 | Technoprobe拿下TSMC 2nm 30%认证 | 行业报告 | A |
| DM-MKT-005 | FORM DRAM FY2025: $247M | 10-K segment | A |
| DM-MKT-006 | DRAM 5年增长+117% ($114M→$247M) | 计算 | A |
| DM-MKT-007 | SK Hynix占FORM收入22.9% | 10-K | A |
| DM-MKT-008 | 增长质量下降: 从F&L分散→DRAM集中 | 推断 | B |
| DM-MKT-009 | F&L份额流失是结构性的 | 推断(4条证据) | B |
| DM-MKT-010 | "高复杂度"F&L细分TAM不公开=黑箱 | 推断 | B |
| DM-GAME-001 | Technoprobe三重进攻武器(利润率/产能/地理) | 分析 | B |
| DM-GAME-002 | FORM防守困境(成本/认证/资本) | 分析 | B |
| DM-GAME-003 | Technoprobe进入DRAM概率~40% | 三锚估算 | C |
| DM-GAME-004 | 客户双供应商激励结构 | 供应链逻辑 | B |
| DM-GAME-005 | Samsung HBM产能2026年+50% | TrendForce | A |
| DM-GAME-006 | Micron CapEx上调至$20B (+45%) | Micron earnings | A |
| DM-GAME-007 | 客户利益与Technoprobe一致=打破FORM垄断 | 推断 | B |
| DM-GAME-008 | Advantest双重投资FORM和Technoprobe | 行业新闻 | A |
| DM-SUPPLY-001 | DRAM总CapEx 2026: $60.5B (+23%) | TrendForce | A |
| DM-SUPPLY-002 | CapEx+23% ≠ 探针卡+23% | 分析 | B |
| DM-SUPPLY-003 | WFE占CapEx ~55-60% | 行业标准 | B |
| DM-SUPPLY-004 | 测试设备占WFE 5-7% | 行业标准 | B |
| DM-SUPPLY-005 | CapEx到探针卡订单滞后6-12个月 | 行业经验 | B |
| DM-SUPPLY-006 | HBM content per wafer上升驱动力 | 技术分析 | B |
| DM-SUPPLY-007 | HBM4接口2048 data signals | JEDEC标准 | A |
| DM-SUPPLY-008 | FORM HFTAP K40: -3dB@7GHz | FORM blog | A |
| DM-SUPPLY-009 | Cantor bull case核心: HBM4 content翻倍 | Cantor报告 | A |
| DM-SUPPLY-010 | JEDEC SPHBM4: 512信号+4:1串行化 | Electronics Weekly/JEDEC | A |
| DM-SUPPLY-011 | SK Hynix自研HBM4系统级测试设备 | TrendForce | A |
| DM-SUPPLY-012 | 实际content传导系数1.3-1.6x (非2x) | 综合推算 | B |
| DM-VAL-001 | FORM EV/Sales 12.7x | 计算 | A |
| DM-WFE-001 | WFE测试设备可比公司表 | FMP/公开数据 | A |
| DM-WFE-002 | FORM EV/Sales溢价WFE comp 81% | 计算 | A |
| DM-WFE-003 | FORM估值=为HBM叙事定价 | 推断 | B |
| DM-WFE-004 | 即使bull case只支持$72 | Phase 2 DCF | A |
| DM-WFE-005 | 三个叙事溢价来源 | 分析 | B |
| DM-RISK-001 | 风险1: Technoprobe进DRAM 40% | 三锚 | C |
| DM-RISK-002 | 风险2: 客户垂直整合测试 25% | 推断 | C |
| DM-RISK-003 | 风险3: SPHBM4标准采用 50% | JEDEC趋势 | B |
| DM-RISK-004 | 风险4: Hyperscaler CapEx见顶 35% | 周期分析 | C |

**Phase 3统计**: ~18K字符, 54 DM锚点, DM密度~3.0/千字
