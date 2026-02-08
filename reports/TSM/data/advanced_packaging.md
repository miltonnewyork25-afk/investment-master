# TSM CoWoS/SoIC 先进封装数据

> 数据收集日期: 2026-02-07 | 数据收集Agent产出，仅供研究使用

---

## 1. CoWoS产能时间线

TSMC的CoWoS(Chip-on-Wafer-on-Substrate)产能在AI需求驱动下持续翻倍扩张。CEO魏哲家多次确认CoWoS产能至2026年仍处于"sold out"状态。

### 表1: CoWoS月产能演进 (单位: 千片wafer equivalent/月)

| 时间节点 | 月产能(KWPM) | YoY增幅 | 来源 |
|---------|-------------|---------|------|
| 2023年底 | ~13K | — | [B: TrendForce, 2024-10] |
| 2024年底 | 30-35K | ~2.5x | [B: Citi/TrendForce, 2024-10] |
| 2025年底 | 75-80K | ~2.2x | [B: Morgan Stanley/DigiTimes, 2025-12] |
| 2026年底 | 120-130K | ~1.7x | [B: Morgan Stanley/TrendForce, 2025-12] |
| 2027年底 | ~170K | ~1.3x | [B: 台湾法人机构预测, 2025-12] |

关键扩产设施:

- **AP6(竹南)**: 2024年底全面投产，为当前CoWoS主力产线 [B: TrendForce, 2025-12]
- **AP8(台南)**: 面积96,000+平方米(AP6的9倍)，2025年下半年开始量产 [B: TrendForce, 2025-03]
- **AP7(嘉义)**: 将成全球最大先进封装基地。Plant 2于2025年下半年装机、2026年投产；Plant 1于2026年装机、2027年量产 [B: TrendForce, 2025-12]
- **Arizona P6**: 被评估为美国先进封装中心 [B: TrendForce, 2025-12]

OSAT外包计划: TSMC预计2026年将240,000-270,000片/年的CoWoS产能外包给Amkor和SPIL [B: DigiTimes, 2025-12]。

---

## 2. 价格趋势

CoWoS封装每wafer的绝对价格属于行业敏感数据，公开来源有限。以下为可获取的价格信号:

- **CoWoS涨价幅度**: Morgan Stanley预计未来两年CoWoS封装ASP上涨约20% [B: Morgan Stanley, 2025-11]
- **2025年涨价**: TSMC 2025年CoWoS封装价格上涨10%-20%，显著高于逻辑晶圆5%的涨幅 [B: SmBom/TweakTown, 2024-12]
- **CoWoS-L vs CoWoS-S**: CoWoS-L通过RDL和硅桥替代全硅中介层，单位价值约为传统封装的3-4倍 [B: GlobalSemiResearch, 2025]
- **B200封装单价**: 单颗B200的CoW+OS封装成本约$300-400(非per-wafer) [B: GlobalSemiResearch, 2025]

对比参考(逻辑晶圆价格):
- 3nm逻辑晶圆: ~$20,000-$25,000/wafer [B: TrendForce, 2025-06]
- 2nm逻辑晶圆: 预计>$30,000/wafer [B: TrendForce, 2025-06]

[CoWoS每wafer绝对价格的精确数字未获取到公开数据，行业报告多以涨幅百分比而非绝对值披露]

---

## 3. 客户分配

Morgan Stanley发布了2026年CoWoS产能分配的详细预测，全球需求预计达到约100万片wafer/年。

### 表2: 2026年CoWoS产能客户分配

| 客户 | 年需求(千片) | 占比 | TSMC直供 | OSAT分流 | 主要产品 |
|------|------------|------|----------|----------|---------|
| NVIDIA | 595K | ~60% | 515K | 80K | B200/B300(CoWoS-L为主, 510K) |
| Broadcom | 150K | ~15% | 120K | 30K | Google TPU(90K), Meta ASIC(50K), OpenAI(10K) |
| AMD | 105K | ~11% | 80K | 25K | MI355/MI400(GPU), Venice(CPU via ASE/SPIL) |
| 其他(含MediaTek等) | ~150K | ~14% | — | — | Google TPU v7e/v8e(MediaTek代工) |

[B: Morgan Stanley研报, 2025-12; DigiTimes, 2025-12; TrendForce, 2025-12]

关键要点:
- **NVIDIA独占60%**: NVIDIA已锁定TSMC先进封装产线数年产能，其他客户争夺空间有限 [B: WCCFTech, 2025-12]
- **Apple不参与CoWoS争夺**: Apple主导AP3(InFO封装线)，与NVIDIA的CoWoS产线(AP5/AP6)不在同一设施竞争 [B: SemiAnalysis, 2025]
- **MediaTek切入**: MediaTek拿下Google v7e/v8e TPU订单，向TSMC要求7倍CoWoS产能增量 [B: TrendForce, 2025-12]

---

## 4. SoIC(3D堆叠)进展

SoIC(System-on-Integrated-Chips)是TSMC的3D芯片堆叠技术，2023年进入量产，产能CAGR超100%(2022-2026)。

**技术路线图**:

| 时间 | 技术代 | 连接方式 | bump pitch | 芯片组合 |
|------|--------|---------|-----------|---------:|
| 2025 | SoIC-P (F2B) | Front-to-Back | 25μm | N3 top + N4 bottom |
| 2027 | SoIC-P (F2F) | Face-to-Face | 16μm | N2 top + N3 bottom |
| 2027+ | SoIC下一代 | Hybrid Bonding | 3μm | A16 + N2 |

[B: ExportSemi/TSMC路线图, 2025]

- TSMC预计2026-2027年推出约30个SoIC设计 [B: TSMC, 2025]
- AP7嘉义厂Plant 2初期将聚焦WMCM(Wafer-Level Multi-Chip Module)产能，支持Apple iPhone 18系列 [B: TrendForce, 2026-01]
- TSMC加速AP7和AP8建设，目标SoIC产能翻倍 [B: TrendForce, 2025-03]

**vs 竞争者3D堆叠技术**:

| 维度 | TSMC SoIC | Intel Foveros | Samsung X-Cube |
|------|----------|---------------|----------------|
| 连接pitch | 25μm→3μm(路线图) | 36μm(Foveros Direct) | 未公开具体数字 |
| 量产状态 | 2023年量产 | 量产(用于Meteor Lake等) | 有限量产 |
| 良率优势 | 业界领先 | 持续追赶TSMC | 持续追赶TSMC |
| 客户基础 | NVIDIA/AMD/Apple/Broadcom | Intel自用为主 | 客户有限 |

[B: TrendForce/SemiWiki, 2025; AnandTech(Samsung X-Cube)]

Intel和Samsung在先进封装方面试图提供"turnkey"替代方案，但在良率上持续落后于TSMC [B: SemiWiki, 2025]。

---

## 5. 竞争者对比

### 表3: 先进封装竞争格局

| 公司 | 核心技术 | 2.5D/3D能力 | 产能规模 | 战略定位 | 重大投资 |
|------|---------|------------|---------|---------|---------:|
| **TSMC** | CoWoS-S/L, SoIC, InFO | 全能(2.5D+3D) | 75-80K WPM(2025), 130K(2026目标) | 垂直整合，前段+封装一体化 | AP7/AP8共投数十亿美元 |
| **ASE** | FOCoS, CoWoP | 2.5D为主 | OSAT第一大，承接TSMC外溢 | TSMC合作伙伴+独立方案 | K18B厂$5.79亿，2028年Q1投产 [B: 3DInCites, 2025-11] |
| **Amkor** | SWIFT, S-Connect | 2.5D为主 | OSAT第二大 | TSMC Arizona配套 | $70亿美国两期项目 [B: Amkor, 2025] |
| **Samsung** | I-CubeS/E, X-Cube | 2.5D+3D | 远小于TSMC | 代工+封装一体化(追赶者) | I-CubeE计划2025年量产支持12颗HBM [B: 36Kr, 2025] |
| **Intel** | Foveros, EMIB | 2.5D+3D | 自用为主 | Foundry服务包含封装 | 投资先进封装作为IFS卖点 |

关键竞争动态:
- TSMC选择将部分CoWoS订单外包给ASE和Amkor，而非让订单流向Samsung [B: DigiTimes, 2026-01]
- ASE/Amkor/JCET三家合计占2024年先进封装收入的30%以上 [B: Yole, 2025]
- ASE开发CoWoP(Chip-on-Wafer-on-Panel)技术，定位为CoWoS的成本优化替代方案 [B: TrendForce, 2025-12]

---

## 6. 产能瓶颈分析

**供需缺口**:
- 2024年全球CoWoS需求约370,000片/年，2025年预计增长到670,000片/年 [B: SemiWiki/行业估计, 2025]
- TSMC CEO确认CoWoS产能至2026年仍"sold out"，尽管产能连续两年翻倍 [B: TSMC法说会, 2025]

**瓶颈环节**:

1. **设备供应**: 先进封装关键设备供应商为ASMPT、BESI、Camtek、Onto Innovation、SUSS MicroTec [B: TrendForce, 2025-12]。TSMC新一代CoPoS设备预计2026年中到位 [B: DigiTimes, 2025-12]
2. **HBM供应**: HBM(高带宽内存)与CoWoS高度耦合，HBM产能同样紧张，形成双重瓶颈 [B: FusionWW, 2025]
3. **AP7安全事故延迟**: 2025年中AP7因安全事故推迟设备进驻 [B: TrendForce, 2025-06]
4. **技术转型**: 从CoWoS-S向CoWoS-L的转型增加了制造复杂度，CoWoS-L使用Local Silicon Interconnect桥接多个chiplet [B: GlobalSemiResearch, 2025]

**扩产节奏**: TSMC先进封装CapEx预计2025-2027年CAGR为24% [B: TrendForce, 2026-01]

---

## 7. 对TSM营收和毛利率的贡献

**营收占比**:
- 2025年: 先进封装占TSMC总营收约8-10% [B: TSMC Q3 2025法说会, Alpha-Sense]
- 2026年预计: 略超10% [B: TSMC管理层指引]

**资本支出分配**:
- 2026年CapEx: $52-56B(创历史新高) [B: TSMC Q4 2025法说会, 2026-01]
- 其中10-20%用于先进封装/测试/光罩 → 约$5.2-$11.2B [B: TSMC, 2025]
- 三年(2026-2028)总CapEx预计超$150B [B: JPMorgan, 2026-01]

**毛利率影响**:
- TSMC整体毛利率: 2025全年59.9%，Q4达62.3% [B: TSMC Q4 2025财报]
- 先进封装毛利率: 有传闻称接近80%(因供不应求) [B: GlobalSemiResearch, 2025]，但此数据未经TSMC官方确认
- 海外工厂(非先进封装)对毛利率有2-3%稀释效应 [B: TSMC管理层指引, 2025]

[先进封装业务独立毛利率的精确官方数据未获取到。TSMC不单独披露先进封装段的利润率。行业估计存在分歧，部分分析师认为先进封装毛利率低于前段晶圆制造，但因产能极度紧缺，定价权强劲]

---

## 数据局限性说明

1. **CoWoS per-wafer绝对价格**: 行业敏感数据，公开来源仅有涨幅百分比，无精确美元数
2. **先进封装独立毛利率**: TSMC不单独披露，仅有非官方估计
3. **2027年产能**: 多数来源为预测值，确定性低于2025-2026数据
4. **客户分配精确度**: Morgan Stanley预测为最详细公开数据，但实际分配可能有偏差
5. **竞争者产能**: ASE/Amkor/Samsung的具体wafer产能数据公开披露有限

---

*免责声明: 本文档为研究数据收集汇编，不构成投资建议。数据来源已标注，但无法保证所有第三方来源的准确性。投资者应自行验证关键数据。*
