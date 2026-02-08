# TSM 先进封装产能与竞争研究
> 数据采集日期: 2026-02-07 | 用途: TSM v4.0深度研究报告素材

---

## 1. CoWoS 产能时间线

### 表1: TSMC CoWoS月产能演进 (等效12英寸晶圆, 片/月)

| 时间节点 | 月产能 (WPM) | YoY增长 | 来源 |
|---------|-------------|---------|------|
| 2023年末 | ~13,000-16,000 | — | [B: TrendForce, 2024-10] |
| 2024年末 | ~32,000-35,000 | ~120% | [B: TrendForce, 2025-01] |
| 2025年末 | ~75,000-80,000 | ~115% | [B: TrendForce, 2025-01] |
| 2026年末(目标) | 120,000-130,000 | ~65% | [B: FinancialContent/TokenRing, 2026-02] |
| 2026年末(乐观) | 140,000-150,000 | — | [B: TrendForce, 2024-10] |

**关键产能设施:**
- **AP6 (竹南)**: 2024年末全面投产 [B: TrendForce, 2024-10]
- **AP8 (台南)**: 前群创(Innolux)显示器厂改造，2025年主要扩产来源 [B: TrendForce, 2025-01]
- **AP7 (嘉义)**: 新建中，支撑2026年产能目标 [B: FinancialContent, 2026-01]

**产能利用率:** TSMC高管明确表示"CoWoS产能非常紧张，2025年至2026年全部售罄" [A: TSMC Q3 2025 Earnings Call, 2025-10]。2025年12月报道CoWoS-L与CoWoS-S均已满载 [B: TrendForce, 2025-12]。

**全球需求 vs 供给缺口:** 全球CoWoS及类CoWoS封装需求预计从2024年37万片/年增长至2025年67万片/年，2026年达100万片/年 [B: DIGITIMES Research, 2024-10]。即便TSMC大幅扩产，供需紧张预计持续至2026年下半年。

### 资本投入

| 年度 | 总资本开支 | 先进封装占比(估) | 先进封装投入(估) |
|------|-----------|----------------|----------------|
| 2024 | $28.9B | ~10-15% | ~$2.9-4.3B |
| 2025 | $40.9B | ~10-15% | ~$4.1-6.1B |
| 2026(指引) | $52-56B | 10-20% | ~$5.2-11.2B |

[A: TSMC Q4 2025 Earnings, 2026-01] [B: TrendForce, 2025-11]

TSMC预计2024-2026三年累计资本开支约$150B，其中先进封装(CoWoS/SoIC)投入加速增长 [B: TrendForce, 2026-01]。

---

## 2. CoWoS 客户分配

### 表2: 2026年CoWoS晶圆需求预估 (全球, 年化)

| 客户 | 需求量(片/年) | 全球占比 | TSMC分配 | OSAT分配 | 主要产品 |
|------|-------------|---------|---------|---------|---------|
| **NVIDIA** | 595,000 | ~60% | 515,000 (CoWoS-L为主, 510K) | 80,000 | B200/GB200/B300 |
| **Broadcom(含代工)** | 150,000 | ~15% | ~145,000 | ~5,000 | Google TPU/Meta ASIC/OpenAI |
| **AMD** | 105,000 | ~11% | 80,000 | 25,000(ASE/SPIL) | MI355/MI400/Venice CPU |
| **其他(Amazon等)** | ~150,000 | ~14% | — | — | 各类AI/HPC芯片 |
| **合计** | ~1,000,000 | 100% | — | — | — |

[B: Morgan Stanley Research, 2025-12 via 36kr/Astute Group]

**Broadcom细分:**
- Google TPU: 90,000片 (TSMC 85,000 + ASE/SPIL 5,000) [B: Morgan Stanley, 2025-12]
- Meta定制芯片: 50,000片 [B: Morgan Stanley, 2025-12]
- OpenAI定制芯片: 10,000片 [B: Morgan Stanley, 2025-12]

**2025年NVIDIA主导地位:**
- NVIDIA独占TSMC 2025年CoWoS-L产能的约70% [B: TrendForce, 2025-02]
- 2025年NVIDIA全年CoWoS需求约370,000片，占TSMC 2025年CoWoS总产能(约650,000片)的57% [B: Supply Chain Estimates via SemiData, 2025]
- MediaTek获得Google v7e/v8e TPU订单后，向TSMC申请7倍CoWoS产能增长 [B: TrendForce, 2025-12]

---

## 3. CoWoS 价格趋势

| 年度 | 涨幅 | 背景 |
|------|------|------|
| 2022 | +10% (晶圆整体) | 全行业涨价周期 |
| 2023 | +5% (晶圆整体) | 涨幅收窄 |
| 2025 | **+15-20%** (CoWoS封装) | AI需求驱动，供不应求 |
| 2025 | +5-10% (3nm/5nm制程) | 逻辑制程温和涨价 |

[B: TweakTown, 2024-11] [B: TrendForce, 2024-11]

**定价细节:**
- TSMC已获NVIDIA批准2025年提价，CoWoS封装涨幅10-20%不等(视产能扩张情况) [B: TrendForce, 2024-11]
- 4nm制程晶圆ASP从约$18,000/片涨至约$20,000/片(+11%) [B: Morgan Stanley估算, 2024]
- CoWoS涨价幅度显著高于逻辑制程，反映封装环节的稀缺性溢价

**2026年定价展望:** 该指标未获取到明确公开数据。但鉴于产能仍供不应求，市场预期CoWoS封装价格将维持高位或继续小幅上调。

---

## 4. CoWoS-L vs CoWoS-S 技术对比

### 技术架构差异

| 维度 | CoWoS-S | CoWoS-L |
|------|---------|---------|
| **中介层(Interposer)** | 单片硅中介层 + TSV | LSI(局部硅互连) + RDL中介层组成重构中介层(RI)，保留TSV |
| **最大封装面积** | ≤3.3x光罩尺寸(~2,700mm²) | >3.3x光罩尺寸，支持更大封装 |
| **良率** | 大面积硅中介层良率受限 | 消除大面积硅中介层良率问题 |
| **典型应用** | NVIDIA Hopper (H100/H200) | NVIDIA Blackwell (B100/B200/GB200) |
| **HBM集成** | 较少HBM堆栈 | 支持更多HBM堆栈(8-12+) |

[A: TSMC 3DFabric官网, 2025] [B: SemiData/Global Semi Research, 2025]

### 产能分配演进 (2025年Q4)

| 技术 | 占比 |
|------|------|
| CoWoS-L | 54.6% |
| CoWoS-S | 38.5% |
| CoWoS-R | 6.9% |

[B: Global Semi Research, 2025]

**关键趋势:** 2025年Q4起，CoWoS-L因NVIDIA Blackwell系列量产成为TSMC CoWoS主力制程。NVIDIA目前是CoWoS-L唯一客户 [B: SemiData, 2025]。AMD MI355/MI400系列、Google TPU等仍以CoWoS-S为主。

---

## 5. SoIC (3D Stacking)

### 量产进展
- 2023年: SoIC进入量产，面向新一代AI产品 [A: TSMC, 2024]
- 产能CAGR: 2022-2026年超过100% [A: TSMC, 2024]
- 2026年前SoIC产能计划扩大20倍以上 [B: TrendForce/Industry Reports, 2024]
- 预计到2026-2027年推出约30个SoIC设计 [B: AnandTech/IEDM 2024, 2024-12]

### 技术路线图

| 时间 | 技术节点 | Bump Pitch | 制程组合 |
|------|---------|-----------|---------|
| 2025 | SoIC-P (F2B) | 25μm micro-bump | N3 top + N4 bottom (0.2 reticle) |
| 2026-2027 | SoIC进阶 | 9μm → 6μm | N2/A16组合 |
| 2027+ | 目标 | 3μm | 超高密度3D堆叠 |

[B: AnandTech, 2024-12] [B: ExportSemi, 2025]

### 客户采用
- **AMD MI300系列**: 使用SoIC-X技术将5nm GPU/CPU堆叠在基础芯片上，再整合至CoWoS封装(SoIC-on-CoWoS) [B: Industry Reports, 2024]
- **Broadcom**: 2024年9月推出业界首个Face-to-Face 3D SoIC产品——5nm制程，3D芯片堆叠+CoWoS封装，集成9颗芯片+6个HBM堆栈 [B: TrendForce, 2024]
- **Apple**: 市场推测2025年可能在M系列/A系列芯片中采用SoIC相关技术 [B: TrendForce, 2024-07]

### SoIC-on-CoWoS 协同
这是TSMC 3DFabric平台的核心差异化: 先用SoIC将逻辑芯片垂直堆叠(3D)，再通过CoWoS水平整合HBM等组件(2.5D)。AMD MI300X是该架构的标杆产品。这种"2.5D+3D"组合方案是TSMC独有的端到端集成能力。

---

## 6. 竞争格局

### 6.1 Intel 先进封装

| 技术 | 描述 | 优势 | 劣势 |
|------|------|------|------|
| **EMIB** | 嵌入式硅桥连接chiplet，无需大面积中介层 | 成本低、热管理简单 | 互连密度低于CoWoS |
| **Foveros** | 垂直堆叠，TSV/铜直接键合 | 高互连密度，异构节点集成 | 良率和热管理挑战 |

[B: Tom's Hardware, 2025-11] [B: EE Times, 2025]

**Intel产能扩张:** 新墨西哥工厂EMIB产能扩张30%，Foveros产能扩张150% [B: Tom's Hardware, 2025-11]

**客户动态:** Apple和Qualcomm正在招募具备EMIB封装经验的人才，表明对Intel先进封装的兴趣增长 [B: TrendForce, 2025-11]。Intel封装线尚未饱和(与TSMC相比)，加上美国本土制造优势(政府补贴+客户在岸需求)，对被TSMC排挤的二线ASIC客户有吸引力。

**Intel+Amkor合作:** 2025年12月报道Intel与Amkor联合推进EMIB封装方案 [B: 3D InCites, 2025-12]

### 6.2 Samsung 先进封装

| 技术 | 描述 | 状态 |
|------|------|------|
| **I-Cube (2.5D)** | 硅中介层上水平放置chiplet | I-CubeS 8: 3x reticle, 8 HBM+2逻辑 |
| **I-CubeE** | I-Cube扩展版 | 2025年量产，支持12个HBM集成 |
| **X-Cube (3D)** | Z轴逻辑芯片堆叠 | Micro-bump型2024量产，bump-less型2026 |
| **SAINT** | 新一代3D AI芯片封装 | 对标TSMC SoIC [B: ASM International/EDFAS, 2025] |

[B: Samsung Semiconductor官网, 2025] [B: 36kr, 2025]

**Samsung独特优势:** Samsung能在同一屋檐下制造逻辑芯片、HBM4内存和封装——这种垂直整合是TSMC(不生产内存)无法复制的 [B: 36kr, 2025]。但Samsung在先进制程良率和客户信任度方面仍落后TSMC。

### 6.3 OSAT (ASE/日月光/SPIL/Amkor)

**能否分流CoWoS需求？可以，且正在发生。**

- TSMC计划2026年向OSAT外包240,000-270,000片/年的CoWoS相关工序 [B: DIGITIMES, 2025-12]
  - Amkor: 180,000-190,000片 [B: DIGITIMES, 2025-12]
  - SPIL: 60,000-80,000片 [B: DIGITIMES, 2025-12]
- 外包范围: 主要是RDL结构较简单的产品 [B: Taiwan News, 2025-12]
- **CoWoP新技术**: NVIDIA主导开发的Chip-on-Wafer-on-PCB封装，由SPIL(ASE集团)牵头，协同多家PCB厂商 [B: TrendForce, 2025-12]
- TSMC预计2026-2027年开始向OSAT扩大释放CoW(Chip-on-Wafer)封装订单 [B: DIGITIMES, 2025-12]
- 台湾OSAT厂商2026年资本开支增加，响应CoWoS供应链需求 [B: DIGITIMES, 2025-12]

---

## 7. 先进封装对TSM营收贡献

| 时期 | 先进封装占总营收 | 来源 |
|------|----------------|------|
| 2024 | ~7-9% | [B: Industry Estimates, 2024] |
| 2025 (H1) | ~8-9% | [A: TSMC Earnings Call, 2025] |
| 2025 (Q3) | "approaching 10%" | [A: TSMC Q3 2025 Earnings Call, 2025-10] |
| 2026 (预期) | >10% | [A: TSMC管理层指引, 2025] |

TSMC管理层在财报电话会上表示"先进封装营收接近10%，是总营收的重要组成部分，对客户至关重要" [A: TSMC Earnings Call, 2025]。

**增长驱动力分析:** 先进封装营收增速远快于总营收增速，因为:
1. CoWoS价格持续上涨(+15-20%/年)
2. 产能倍增(CAGR >50%)
3. 每片晶圆的封装复杂度和价值量提升(CoWoS-L > CoWoS-S)

---

## 8. 核心投资要点总结

1. **CoWoS是TSM最具定价权的业务:** 供不应求持续至2026年+，涨价15-20%客户仍全额接受
2. **NVIDIA依赖度极高:** NVIDIA占全球CoWoS需求~60%，占TSMC CoWoS-L产能~70%，形成深度绑定
3. **竞争护城河宽广:** Intel/Samsung封装能力在规模、良率、客户信任度上均显著落后TSMC
4. **OSAT分流有限:** 外包仅限简单工序，核心CoWoS-L/SoIC仍由TSMC独家掌控
5. **营收贡献加速:** 先进封装从7%→10%+，且ASP和产能同步增长，预计成为TSM第二增长引擎
6. **风险因素:** AI需求周期性波动、产能过剩风险(2027+)、地缘政治(台湾集中度)

---

*免责声明: 本研究仅供投资参考，不构成买入/卖出建议。数据来源已标注，但可能存在时效性偏差，请以公司官方披露为准。*
