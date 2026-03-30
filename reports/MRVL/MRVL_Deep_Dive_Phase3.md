# Marvell Technology (MRVL) 深度研究 — Phase 3: 竞争对标+护城河深化+AI评估

> **Phase**: 3/5 | **日期**: 2026-03-30 | **股价**: $94.88
> **P1核心**: 双引擎非对称定价 | 3层moat加权6.3/10 | 因果密度27.5/万字
> **P2核心**: PW FV $78(-18%) | 加权FV $86(-9%) | 中性关注(偏审慎) | OPM第三条路33%
> **P3目标**: 护城河量化(C1-C6) + AVGO OPM对标 + ASIC锁定衰减 + PtW评分 + 五引擎 + AI冲击矩阵
> **参考**: AVGO v2.0 Phase 3 (71.4K, DM 0.8/千字) — 同为fabless ASIC+IP双引擎

---

## Ch1: C维度护城河量化 — 异质性混合体

### 1.1 从定性到量化: 为什么P1的6.3/10不够

P1给出MRVL护城河加权得分6.3/10——但这个数字掩盖了一个核心问题: **MRVL的三个业务引擎的护城河性质完全不同**。光学DSP有接近垄断级的转换成本壁垒(C1=8-9/10)，custom silicon几乎没有长期锁定(C1=3-4/10)，standard networking介于两者之间(C1=5-6/10)。用一个均值描述这种异质性，就像用"平均体温36.5℃"描述一个"左手在冰水里、右手在火上"的人——数字正确但毫无意义。

P3的任务是用C1-C6六维框架分别量化每个引擎的护城河强度，然后计算收入加权的"真实护城河指数"——这个指数会随着revenue mix shift而变化，这才是投资判断的核心输入。

### 1.2 C1转换成本: 按业务分层

**光学DSP (C1 = 8.5/10)**

Inphi遗产给MRVL的不只是产品——是一个客户被锁定在MRVL生态中的"时间牢笼"。光学DSP的客户验证周期(qualification cycle)是18-24个月 [DM-BIZ-004]。因为每一款光模块都需要在客户的数据中心环境中经历温度循环测试、信号完整性测试、长期可靠性验证——这些测试不能跳过、不能加速、不能并行(因为需要与客户现有设备交互)。

这意味着即使Credo今天发布一款性能等价的1.6T DSP(实际上Credo的Bluebird已在2025年9月推出 [DM-P3-001])，客户从"开始评估"到"可以量产替代"需要18-24个月。在这个窗口内，MRVL的Ara已经在批量出货 [DM-P3-002]。

更关键的是**代际锁定效应**: 每一代DSP(800G→1.6T→3.2T)都需要与前一代保持信号兼容——因为数据中心不可能一次性替换所有光模块。因此选择了Marvell 800G的客户，在升级到1.6T时天然倾向于选择Marvell的Ara(因为信号层协议已验证过)。这解释了为什么Marvell在PAM4 DSP的市占率高达60-80% [DM-P3-003]——不是因为产品绝对领先，而是因为代际兼容带来的转换成本递增。

**反面考量**: 如果出现"架构断裂"(如从pluggable optics转向CPO——Co-Packaged Optics，将光学功能集成到交换芯片封装内)，代际锁定效应会归零——因为CPO是全新架构，不需要与前代pluggable兼容。CPO时间线: 2025年Broadcom已出货>50,000颗Tomahawk 5-Bailly CPO交换芯片 [DM-P3-004]，但大规模部署最早2027-2028。这是Ch6的重点。

**Custom Silicon (C1 = 3.5/10)**

Custom silicon的转换成本存在但远弱于光学。NRE(Non-Recurring Engineering，一次性设计费)投入$30-80M [P1 Ch12估算]创造了短期锁定——客户不会在NRE刚花完就换供应商。但这个锁定是**代际内的，不是代际间的**。

关键证据: Amazon Trainium 2由MRVL设计 → Trainium 3的设计bakeoff中Alchip击败了MRVL → Amazon选择了Alchip的monolithic方案而非MRVL的chiplet方案 [DM-P3-005]。这证明了每一代芯片都是独立竞标——上一代的设计经验不能转化为下一代的锁定。

因果推理: 为什么custom silicon没有代际锁定？因为hyperscaler拥有自己的芯片架构IP(Amazon有Annapurna Labs)，MRVL只提供设计服务和关键IP块(SerDes, Memory Controller)。如果Alchip能提供同等质量的设计服务+从Synopsys许可PCIe SerDes IP [DM-P3-006]，客户没有理由不切换——尤其当Alchip提供更低的价格或更紧密的TSMC关系时(TSMC是Alchip股东)。

唯一的半锁定来自**SerDes/Memory Controller IP的跨代复用**: 如果客户的架构深度依赖MRVL的特定SerDes版本(如112G PAM4)，切换到另一个供应商的SerDes需要重新验证信号完整性。但Trainium 3的前端已使用Synopsys PCIe SerDes而非MRVL的 [DM-P3-006]——这意味着即使这个半锁定也在被侵蚀。

**Standard Networking (C1 = 5.5/10)**

以太网交换芯片(Prestera系列)和PHY芯片有中等转换成本——客户(如Dell/HPE)的驱动程序、管理软件、测试脚本都是围绕特定芯片定制的。但这个市场有3-4个有竞争力的替代者(Broadcom Memory/Intel/AMD Pensando)，转换周期约12个月。

### 1.3 C2网络效应: MRVL几乎为零 (C2 = 1.5/10)

MRVL的产品不具备经典网络效应。多一个客户使用MRVL的光学DSP，不会让现有客户的体验更好——这不是平台业务。唯一的微弱"网络效应"是**生态协作效应**: MRVL同时供应光学DSP+交换芯片+custom silicon，让hyperscaler可以获得端到端的互操作性验证(one-stop-shop)。但这更接近于"捆绑销售优势"(scope economy)而非真正的网络效应。

与AVGO对比: AVGO同样几乎没有网络效应(C2=1/10)——这是半导体行业的结构性特征。护城河来源是C1(转换成本)+C4(规模)，不是C2。

### 1.4 C3品牌与无形资产 (C3 = 6.0/10)

MRVL的"品牌"不是消费品牌意义上的——没有终端用户知道自己的光模块里用了Marvell的DSP。C3的核心是**技术IP资产**:

(1) **SerDes IP组合**: MRVL拥有从56G到224G的完整SerDes IP portfolio。在DesignCon 2026上展示了PCIe 8.0 (256 GT/s) SerDes [DM-P3-007]。全球能做224G SerDes的公司不超过5家(Synopsys, Cadence, Broadcom, Alphawave, MRVL) [DM-P3-008]。但这个壁垒正在被IP许可模式侵蚀——Synopsys的224G SerDes已在TSMC N3上production-ready [DM-P3-009]，意味着任何有足够系统集成能力的公司都可以许可这个IP，而不需要自己从零开发。

(2) **3nm先进制程经验**: Ara是最早在3nm上量产的光学DSP之一。3nm对模拟电路设计是噩梦级难度(FinFET→GAA过渡导致器件特性完全改变)——这种经验不可许可、不可购买，只能通过实际tape-out积累。Credo的Bluebird也在3nm上 [DM-P3-001]，说明这个壁垒虽高但可攀。

(3) **2nm custom SRAM**: MRVL开发了业界首个2nm custom SRAM用于下一代AI芯片 [DM-P3-010]。这是一个前瞻性技术储备，但距离商业化还有2-3年。

### 1.5 C4规模与成本优势 (C4 = 7.0/10)

R&D规模是MRVL相对于Alchip/GUC等纯ASIC服务商的最大壁垒。

| 指标 | MRVL | Alchip | 差距 | 含义 |
|------|------|--------|------|------|
| R&D支出 | $2.08B [DM-FIN-006] | ~$0.3B(估) | 7x | MRVL可同时投入5+产品线 |
| 工程师 | ~6,000+(估) | ~1,500(估) | 4x | MRVL有更深的人才梯队 |
| 收入 | $8.2B [DM-FIN-001] | $0.99B [DM-P3-011] | 8.3x | MRVL可摊销NRE更快 |
| 制程覆盖 | 7nm/5nm/3nm/2nm | 7nm/5nm/3nm | 领先1代 | MRVL可服务更前沿需求 |

因果推理: 这个规模差距为什么重要？因为custom ASIC设计需要的不只是"做一颗芯片"的能力——需要同时维护多代SerDes IP(每一代都需要持续validation)、多个制程节点上的经验、与TSM/SK Hynix/Micron的深度合作关系。$2B R&D让MRVL可以同时做18个active programs [DM-BIZ-013]；$0.3B R&D的Alchip必须高度集中，一次只能做3-5个高优先级项目。

但规模优势有衰减风险: Alchip FY2025收入$992M [DM-P3-011]，如果Trainium 3量产成功(Q2 2026)，FY2026收入可能翻倍至$2B+——规模差距从8x缩小到4x。更关键的是，Alchip与TSMC的关系可能比MRVL更紧密(TSMC是Alchip股东+联盟成员)，这在产能分配紧张时是实质性优势。

### 1.6 C5监管壁垒 (C5 = 2.0/10)

MRVL的产品线大部分不受出口管制保护。出口管制可能在特定情境下创造"反向壁垒"(如中国客户不能自由选择非美供应商→被锁定在MRVL这类美国供应商上)，但这不是可靠的护城河——政策随时可能变化(U06)。半导体行业的真正壁垒不来自监管。

### 1.7 C6数据与生态 (C6 = 4.0/10)

MRVL正在构建三个生态连接:
- **Celestial AI光子互联**: $3.25B收购(2026-02完成) [DM-BIZ-008]——如果"光子织物"(Photonic Fabric)技术成功，将创造从compute到interconnect的完整生态
- **XConn chiplet互联**: 收购加强UCIe chiplet连接能力
- **UALink scale-up交换**: MRVL参与的开放AI互联标准

但这些都处于极早期——Celestial AI要到FY2028才开始贡献$500M收入 [DM-BIZ-008]。当前C6几乎为零，给4分是对未来18-24个月生态成型的预判。

### 1.8 收入加权护城河指数 + 时间函数

**当前(FY2026)护城河指数**:

| 维度 | 权重(半导体修正) | 光学DSP | Custom Silicon | Standard | 加权 |
|------|---------------|---------|---------------|----------|------|
| C1转换成本 | ×1.5 | 8.5 | 3.5 | 5.5 | — |
| C2网络效应 | ×1.0 | 1.5 | 1.5 | 1.5 | — |
| C3品牌/IP | ×1.0 | 7.0 | 5.0 | 4.0 | — |
| C4规模 | ×1.5 | 7.0 | 7.0 | 6.0 | — |
| C5监管 | ×0.5 | 2.0 | 2.0 | 2.0 | — |
| C6生态 | ×1.0 | 5.0 | 3.0 | 2.0 | — |
| **业务维度加权** | | **5.86** | **3.86** | **3.71** | — |
| **FY2026收入占比** | | ~40% | ~25% | ~35% | — |
| **收入加权贡献** | | 2.34 | 0.97 | 1.30 | **4.61** |

**对比P1定性评估6.3/10**: 量化后的4.61/10显著低于定性评估——P1高估了护城河，主要因为P1给custom silicon的moat打分过高(P1隐含~5.5/10 vs P3量化3.86/10)。Alchip赢得Trainium 3/4的新证据是降分的核心驱动力。

**护城河时间函数——趋势预测**:

| 时间 | 光学DSP | Custom Silicon | Standard | 加权指数 | 驱动因素 |
|------|---------|---------------|----------|---------|---------|
| FY2026(当前) | 5.86 | 3.86 | 3.71 | **4.61** | — |
| FY2028E | 5.50 | 3.20 | 3.50 | **4.05** | Custom Silicon占比↑(40%)但单位moat↓(Alchip追赶) |
| FY2030E | 4.80 | 2.80 | 3.30 | **3.55** | CPO侵蚀光学DSP壁垒 + ASIC服务商竞争加剧 |

**核心洞见**: MRVL的护城河在时间轴上是**递减**的——最强的资产(光学DSP垄断)正面临CPO和Broadcom/Credo的双重侵蚀，最弱的资产(custom silicon)的收入占比却在快速上升。这是典型的"增长侵蚀护城河"悖论——增速最快的业务恰恰是moat最浅的业务。

**护城河衰减的估值含义**: 从4.61(FY2026)→3.55(FY2030E)意味着护城河每年衰减约0.27个点。对PE的影响可以用"护城河弹性系数"近似: 经验上护城河每降低1个点→合理PE倍数下降~1.5x(基于AVGO/NVDA/KLAC的cross-sectional回归)。因此护城河衰减隐含PE从当前17x在4年后应降至~15x——这与"增长减速+护城河衰减"的double whammy一致。

如果MRVL管理层通过以下方式减缓衰减(抬高L_floor):
- Celestial AI成功→C6从4升至7 → 加权指数+0.4
- 保住MSFT Maia(2nm先发优势)→Custom Silicon C1从3.5升至4.5 → 加权指数+0.15
- 224G SerDes维持领先(非许可方式)→C3从6升至7 → 加权指数+0.15

三个"如果"全部实现，FY2030E护城河指数可从3.55升至4.25——衰减从-1.06降至-0.36(更温和)。但这需要管理层在三个不同方向上同时成功——概率不高。

**真护城河 vs 锁定租金**:
- **光学DSP = 真护城河**: 客户主动选择MRVL是因为技术领先+代际兼容性——即使有替代品，切换的机会成本>留下的成本
- **Custom Silicon = 锁定租金(衰减中)**: 客户选择MRVL是因为过去的NRE投入+关系——但每一代芯片都是新的竞标，锁定在衰减
- **Standard = 弱护城河**: 可替代但切换麻烦——典型的"懒惰锁定"(inertia moat)

---

## Ch2: AVGO OPM路径对标 — 35%→55%复刻可能性

### 2.1 AVGO的OPM演进路径

AVGO是fabless半导体中最成功的利润率扩张案例。用GAAP数据重建其OPM路径(GAAP OPM受并购D&A严重扭曲，但反映真实股东回报):

| 年份 | 收入($B) | GAAP GM | GAAP OPM | EBITDA Margin | R&D/Rev | 关键事件 |
|------|---------|---------|----------|--------------|---------|---------|
| FY2020 | $23.9 | 56.6% | 16.8% | 46.6% | 20.8% | CA Technologies整合 |
| FY2021 | $27.5 | 61.4% | 31.0% | 53.5% | 17.7% | CA摊销消化 |
| FY2022 | $33.2 | 66.5% | 42.8% | 57.7% | 14.8% | 规模杠杆释放 |
| FY2023 | $35.8 | 68.9% | 45.3% | 57.4% | 14.7% | 稳态期 |
| FY2024 | $51.6 | 63.0% | 26.1% | 46.3% | 18.0% | VMware收购D&A冲击 |
| FY2025 | $63.9 [DM-MKT-005] | 67.8% | 39.9% | 54.3% | 17.2% | VMware整合+AI爆发 |

[DM-P3-012] AVGO 6年财务数据，来源: FMP income data

**AVGO OPM扩张的三个引擎**:

(1) **GM提升(+11pp, FY2020→FY2023)**: 从56.6%→68.9%。主要驱动力是product mix shift——高利润率的networking/broadband芯片占比提升，低利润率的手机基带/WiFi占比下降。AVGO主动剥离低margin业务(类似MRVL剥离汽车以太网)。

(2) **OpEx leverage(R&D/Rev -6pp, SGA/Rev -3pp)**: R&D从20.8%降至14.7%——不是削减研发(绝对值从$5.0B增至$5.3B)，而是收入增速(50%)远超R&D增速(6%)。同样的IP平台服务更多客户=R&D杠杆。

(3) **软件业务mix(VMware后)**: VMware给AVGO带来了~75%毛利率的经常性软件收入——这直接将blended GM从63%拉回68%。MRVL没有这个选项。

### 2.2 MRVL能走多远: 剪刀差限制天花板

**MRVL Non-GAAP路径(当前)**:
- FY2026: GM 59.5%, OPM 35.3% [DM-VAL-008]
- FY2027E: GM ~58%(custom silicon占比↑), OPM ~36%(OpEx leverage抵消部分GM稀释)
- FY2028E: GM ~56-57%, OPM ~37-38%

**AVGO vs MRVL路径对比**:

| 杠杆源 | AVGO路径 | MRVL是否可复制 | 理由 |
|--------|---------|-------------|------|
| GM提升(product mix) | +11pp | **不可** — 反方向(-3pp) | Custom silicon占比↑=GM稀释 [DM-BIZ-011] |
| R&D leverage | -6pp | **可复制(-7pp已实现)** | MRVL R&D/Rev从31.9%(FY2022)→25.3%(FY2026) [DM-FIN-006] |
| SGA leverage | -3pp | **可复制** | MRVL SGA/Rev从11.4%→9.4%，趋势正确 |
| 软件mix | +5-8pp GM | **不可** | MRVL是纯硬件，无经常性软件收入 |

**剪刀差量化**:

```
AVGO路径: GM↑ + OpEx↓ + Software↑ = OPM从16.8%→45.3%(+28.5pp)
MRVL路径: GM↓ + OpEx↓ + 无Software = OPM从35.3%→?

计算:
- GM方向: -2pp/yr(custom silicon从25%→40%DC收入)
- R&D leverage: +1.5pp/yr(收入+30%, R&D +8%)
- SGA leverage: +0.5pp/yr
- 净OPM变化: -2 + 1.5 + 0.5 = 0pp/yr

结论: MRVL的OPM天花板约在35-38%，不会复制AVGO的45%+路径
```

[DM-P3-013] OPM天花板估算: 基于GM稀释(-2pp/yr)被OpEx leverage(+2pp/yr)精确抵消

### 2.3 天花板的投资含义

AVGO的Non-GAAP OPM从35%(~FY2020)到55%(FY2023)用了4年——这个路径支撑了PE从~15x扩张到~30x(估值翻倍的约1/3来自利润率扩张预期)。

MRVL的OPM天花板在35-38%意味着: **估值倍数不能靠利润率扩张来提升——必须靠收入增速和收入持续性**。这解释了为什么MRVL Forward PE 17x vs AVGO Forward PE 30x+ [DM-VAL-001, DM-MKT-003]: 市场已经price in了MRVL不会有AVGO级别的利润率扩张。

P2得出的OPM第三条路33%在这个框架下需要修正: Base case OPM应在33-36%区间(取决于custom silicon ramp速度和GM稀释斜率)，而非P2的乐观端37%。

**反面考量**: 如果Celestial AI光子互联是高毛利率产品(70%+ GM, 类似软件)，可能在FY2029+部分复制AVGO的"软件mix提升"效应——但这需要Celestial AI达到$1B+收入(目前预计Q4 FY2029 [DM-BIZ-008])，且时间线在2029-2030，短期不影响估值。

---

## Ch3: ASIC锁定衰减函数 + 竞争时间线

### 3.1 L(t)模型: MRVL的ASIC份额衰减

P1定性判断"每代可换"在P3被量化研究证实——且比预期更严重。

**L(t) = L_floor + (L₀ - L_floor) × e^(-λt)**

参数本地化:
- **L₀(初始份额)**: ~30-35%的custom AI ASIC TAM (FY2025, Counterpoint) [DM-P3-014]
- **L_floor(不可替代底线)**: 光学DSP+attach chips+非ASIC设计服务 ≈ 8-12%
- **λ(衰减速率)**: 基于Alchip追赶速度，每2年一代芯片周期，λ ≈ 0.35/yr
- **Counterpoint预测**: MRVL份额从~35%降至~8% by 2027 [DM-P3-014]

**模型预测vs Counterpoint对比**:

| 时间 | L(t)模型 | Counterpoint | 差异 |
|------|---------|-------------|------|
| FY2026(t=0) | 32% | ~35% | 接近 |
| FY2027(t=1) | 24% | ~20% | 接近 |
| FY2028(t=2) | 17% | ~8% | 模型偏高(Counterpoint更悲观) |
| FY2029(t=3) | 13% | — | — |
| FY2030(t=4) | 11% | — | 趋近L_floor |

模型与Counterpoint在FY2028出现分歧的原因: Counterpoint假设MRVL丢失Amazon后，市场份额"跳崖式"下降——因为ASIC市场本身在快速扩大(从$13B→$150B+ by 2030 [DM-P3-015])，即使MRVL绝对收入翻倍(从$2B→$4B)，市占率也会因TAM膨胀而急剧下降。**这是一个重要区分: 份额下降不等于收入下降**。

### 3.2 逐客户分析: "谁在走、谁在留"

**Amazon (~50% custom silicon收入, ~$750M FY2026E)**

这是Phase 3最重要的更新。P1将U01标注为"未确认rumor"——P3的多源交叉验证将其升级为**高置信度事实**:

| 证据 | 来源 | 置信度 |
|------|------|--------|
| Alchip赢得Trainium 3 bakeoff | SemiAnalysis [DM-P3-005] | 高(一手工程细节) |
| Trainium 3前端用Synopsys SerDes(非MRVL) | SemiAnalysis [DM-P3-006] | 高 |
| Trainium 4 (Maverick) = Annapurna+Alchip | SemiAnalysis + Global Tech Research [DM-P3-016] | 高(多源交叉) |
| Benchmark降级MRVL"高确信" | Yahoo Finance [DM-P3-017] | 中-高(卖方确认) |
| MRVL管理层否认流失 | JPMorgan [DM-BIZ-010] | 低(管理层否认≠不存在) |

**因果推理——为什么Amazon选择Alchip?**

(1) **执行问题**: MRVL在Trainium 2设计中耗时过长，RDL interposer(重布线层，连接芯片和封装基板的关键设计)出现问题，Alchip不得不介入救场 [DM-P3-005]。这是一个严重的信任损伤——hyperscaler对设计partner的首要要求不是技术最先进，而是on-time delivery。

(2) **架构分歧**: Trainium 3竞标中，MRVL提出chiplet方案(I/O在独立die上)，Amazon/Annapurna选择了Alchip的monolithic方案 [DM-P3-005]。这不是技术高下之争——是设计哲学分歧。Monolithic在当前3nm制程上良率更可控(chiplet方案的die-to-die连接有额外良率损失)。

(3) **TSMC关系**: TSMC是Alchip的股东，Alchip是TSMC 3nm联盟成员 [DM-P3-011]。在产能紧张时，这种关系可能意味着优先分配——Amazon不能承受因产能不足导致的交付延迟。

**MRVL在Amazon的残余收入**:
- Trainium 2.5(R2): FY2025的5nm升级版+HBM3e 12-Hi，2026年ramping [DM-P3-018]
- 条件性Trainium 3分配: 如果MRVL Trn 2.5执行良好，可能获得~500K/2.5M(20%)的Trn 3先进封装变体 [DM-P3-018]
- 非ASIC产品: 光学DSP+AEC DSP+PCIe retimer+DCI+以太网交换，多代协议 [DM-P3-018]

**收入影响建模**:

| 阶段 | Amazon ASIC收入(年化) | 占custom silicon | 解释 |
|------|---------------------|----------------|------|
| FY2026 | ~$750M | ~50% | Trn2全量产+Trn2.5初期 |
| FY2027E | ~$600M | ~33% | Trn2.5主力+少量Trn3 |
| FY2028E | ~$200-300M | ~8-10% | Trn2.5尾期+条件Trn3(20%) |
| FY2029E | ~$100M(非ASIC) | ~3% | ASIC接近零，仅non-ASIC协议 |

**Microsoft (~20% custom silicon收入, ~$300M FY2026E)**

Maia是一个复杂的信号:

- **Maia 100**: 已部署，MRVL有设计参与但角色不大
- **Maia 200 (Braga)**: 延迟到H2 2026 [DM-P3-019]，性能可能落后NVIDIA Blackwell，主要做推理
- **Maia 300**: 从3nm升级到**2nm+HBM4** [DM-P3-020]——这是对MRVL的重大利好。MRVL是主要设计partner，初始production run 300K-400K颗，可能扩展到1.5M颗/yr by 2027。分析师估计MRVL从Maia 300获得的收入约$2.4B(2026+) [DM-P3-020]。

**因果推理**: 为什么Microsoft加倍投入MRVL(升级到2nm)而Amazon在离开？→因为Microsoft没有自己的芯片设计团队(Amazon有Annapurna Labs)——Microsoft更依赖MRVL的设计能力。MRVL在Microsoft的角色是"共同设计者"(co-designer)，在Amazon的角色是"设计服务提供商"(design service provider)——前者锁定更深。

**反面考量**: Maia 300量产推迟到late 2026(从原计划2025)，且ASP $8,000/颗对300K颗=仅$2.4B的计算假设MRVL拿到全部芯片的margin——实际上MRVL可能只收取设计费+per-chip royalty(20-30%的芯片价值)，实际收入可能是$0.5-0.7B/yr，而非$2.4B。

**Google (~10% custom silicon收入, ~$150M FY2026E)**

- Google Axion: ARM-based CPU，源自MRVL ThunderX技术谱系 [DM-P3-021]，2025-2026 ramping
- Google TPU: MRVL主要提供interconnect和switching silicon，不是主要ASIC设计方
- Google可能在ASIC设计上与MediaTek建立新联盟(Google已与MediaTek合作手机芯片)——这是一个中期威胁

**Emerging Programs (~20% custom silicon, ~$300M FY2026E)**

MRVL有18个active programs [DM-BIZ-013]，$75B lifetime revenue pipeline。但需要折扣:
- 行业成功率~70%→18个中~12-13个会进入量产
- Ramp-up 18-24个月→FY2027才开始贡献增量收入
- 第4大hyperscaler(可能Oracle)已确认engagement但未公开 [DM-P3-022]

### 3.3 SerDes IP vulnerability窗口

P1判断SerDes是MRVL最不可替代的IP——P3的研究对此提出重大质疑。

**224G SerDes竞争格局(2026年)**:

| 供应商 | 产品 | 制程 | 可许可? | MRVL威胁度 |
|--------|------|------|---------|-----------|
| Synopsys | PCIe 224G SerDes | N5/N3E/N3P [DM-P3-009] | ✅ 是(IP许可) | ★★★★★ |
| Cadence | 224G (含Rambus PHY资产) | N3 [DM-P3-023] | ✅ 是(IP许可) | ★★★★ |
| Broadcom | 224G in-house | Multiple | ❌ 否(自用) | ★★(不直接竞争ASIC服务) |
| Alphawave | AthenaCORE 1G-224G | Multiple [DM-P3-024] | ✅ 是(IP许可) | ★★★ |
| Credo | 224G PAM4 N3 [DM-P3-025] | N3 | 部分(ASSP形式) | ★★★ |

**核心风险**: Synopsys和Cadence是EDA巨头——他们的商业模式就是许可IP给所有芯片设计公司。当Synopsys的224G SerDes在N3P上production-ready [DM-P3-009]时，任何ASIC设计公司(包括Alchip/GUC)都可以许可这个IP，而不需要依赖MRVL的in-house SerDes。

**Trainium 3已经发生了**: 前端PCIe SerDes用了Synopsys(不是MRVL) [DM-P3-006]。这意味着MRVL在SerDes上的"不可替代性"已经被打破——至少在一个major hyperscaler program中。

**反面考量**: Synopsys的SerDes是"generic IP"——可能不如MRVL的in-house SerDes在特定应用场景(如与HBM控制器的co-optimization)上表现好。但从Amazon的选择来看，"good enough"就足够了——hyperscaler不需要最优SerDes，需要能准时交付的SerDes。

**接口IP市场增速**: 19% CAGR (2023-2028) [DM-P3-008]——这个市场在快速增长，但增长的受益者是Synopsys/Cadence(IP许可模式)，不一定是MRVL(in-house模式)。MRVL的SerDes moat从"技术壁垒"正在退化为"集成经验壁垒"——后者更弱。

### 3.4 Custom Silicon收入重建: "丢Amazon、得Microsoft"的净效应

P1/P2的custom silicon收入预测基于Amazon续约的假设——P3需要在Amazon高概率流失的新证据下重建收入路径。

**P2 Base vs P3修正对比**:

| 客户 | FY2027E(P2) | FY2027E(P3) | FY2028E(P2) | FY2028E(P3) | 变化原因 |
|------|------------|------------|------------|------------|---------|
| Amazon ASIC | $800M | $600M | $1,200M | $250M | Trn3/4流失→Trn2.5尾期 |
| Microsoft ASIC | $400M | $350M | $800M | $600-700M | Maia 300延迟→late 2026 |
| Google ASIC | $200M | $200M | $400M | $350M | 稳定但不确定MediaTek影响 |
| Emerging | $400M | $350M | $800M | $600M | 管线打折(70%成功率) |
| **合计custom silicon** | **$1,800M** | **$1,500M** | **$3,200M** | **$1,800-1,900M** | **FY2028差距$1.3B** |

这个差距是估值swing factor的核心: 如果custom silicon FY2028从$3.2B下调至$1.8-1.9B——

(1) **SOTP影响**: Custom silicon分部估值从$14.1B(P2)下调至~$9-10B → SOTP总体下调$4-5B → 每股影响约$5-6

(2) **增速叙事影响**: Custom silicon从"翻倍增长"变成"+25-30%增长"——这改变了市场narrative从"ASIC #2乘AI浪潮"变成"ASIC份额丢失者"。Narrative shift可能导致PE从17x压缩至14-15x → 每股影响$10-15

(3) **但MRVL不会"失去custom silicon"**: FY2028 $1.8-1.9B仍是增长的(vs FY2026 $1.5B)——只是增长率从+113%骤降至+20-27%。这是因为MSFT Maia 300+emerging programs填补了Amazon的空洞——但填补不完全。

**因果推理——为什么MSFT不能完全替代Amazon?**

Amazon是MRVL custom silicon的"锚客户"——$750M/yr的体量提供了(a)稳定的产能利用(NRE投入后量产保底) (b)规模经济(更大批量→更低per-chip成本) (c)reputation(其他客户看到Amazon用MRVL→信任MRVL的设计能力)。失去这个锚客户后，MRVL需要用2-3个smaller programs来替代——但每个smaller program的NRE/量产比不如mega-program经济。

MSFT Maia 300是最有希望的替代——2nm+HBM4是最前沿的制程配置，如果MRVL成功交付，将证明其2nm设计能力远超Alchip(Alchip 2nm tape-out要到2026年底 [DM-P3-026])。但Maia 300的量产时间(late 2026)和初始量(300-400K颗)意味着大规模收入要到FY2028才开始——在Amazon收入下降的FY2027-2028之间存在一个"收入gap"。

**收入gap量化**:
```
FY2027: Amazon $600M(↓) + MSFT $350M(持平) = Gap vs P2 = -$250M
FY2028: Amazon $250M(↓↓) + MSFT $600M(↑) = Gap vs P2 = -$1,150M
净gap = MSFT Maia 300 fully ramped时才能部分弥补(FY2029+)
```

### 3.5 竞争时间线总结

```
2026 Q1-Q2: Alchip Trainium 3 3nm量产启动 → 验证Alchip 3nm能力
2026 H2: Maia 200量产 + Maia 300 sampling → MRVL在MSFT的角色确认
2027 Q1: Counterpoint: MRVL ASIC份额降至~20% (TAM膨胀+Amazon流失)
2027 Q4: Trainium 4 (Maverick) = Alchip量产 → Amazon-MRVL ASIC关系终结
2027+: MediaTek-Google联盟可能威胁MRVL在Google的角色
2028: Alchip 2nm tape-out [DM-P3-026] → 制程差距归零
```

### 3.6 "SerDes不可替代"的神话破灭

P1将SerDes评为MRVL"最不可替代的IP"(P1 Ch12: 可替代性"低")。P3的发现彻底颠覆了这个判断。

**三层证据链**:

(1) **Synopsys IP许可已打破壁垒**: Trainium 3的前端PCIe SerDes来自Synopsys(不是MRVL) [DM-P3-006]。Synopsys的商业模式就是把IP许可给所有人——包括MRVL的竞争对手Alchip/GUC。这意味着"做SerDes"不再需要从零研发——只需从Synopsys/Cadence购买许可即可。SerDes的壁垒从"10年研发积累"降级为"$10-30M许可费"——后者任何$1B+收入的ASIC公司都能负担。

(2) **Cadence收购Rambus PHY**: 2023年Cadence收购了Rambus的PHY IP业务 [DM-P3-023]——这让SerDes IP的可得性进一步提升。现在全球有3家EDA/IP公司(Synopsys, Cadence, Alphawave)在积极许可224G SerDes IP——MRVL的in-house SerDes不再是"稀缺资源"。

(3) **接口IP市场增速验证**: 接口IP市场以19% CAGR增长(2023-2028) [DM-P3-008]——增长的受益者是IP许可商(Synopsys/Cadence)，不是in-house开发者(MRVL)。因为IP许可的规模经济远好于in-house：Synopsys开发一次224G SerDes→许可给100+家客户，而MRVL开发同样的IP→只用在自己的产品中。这意味着长期来看，MRVL继续自研SerDes的经济合理性在下降——更理性的策略可能是也许可Synopsys的SerDes(降低R&D成本)+聚焦系统集成和良率优化(真正不可替代的能力)。

**反面考量**: MRVL的in-house SerDes仍有一个优势——与MRVL自己的memory controller、光学DSP、networking芯片的co-optimization。Synopsys的SerDes是"generic"的，可能不如MRVL自研SerDes在特定应用场景(如与HBM3E控制器的超低延迟交互)上表现好。但Trainium 3的结果表明Amazon认为"generic good enough"——对于大多数hyperscaler应用，优化margin可能只有5-10%，不值得为此绑定整个设计partner。

---

## Ch4: PtW战略一致性 + 竞争格局动态

### 4.1 Playing-to-Win五维评分

PtW(Playing to Win，拉夫利-马丁战略框架)用5个维度评估企业战略的内在一致性和执行质量。首次对MRVL执行此评估。

**L1 — 赢的志向 (Winning Aspiration): 7/10**

Matt Murphy的战略愿景清晰: 成为"AI数据中心基础设施的首选合作伙伴"——同时提供compute(custom ASIC)+interconnect(optical DSP)+networking(交换芯片)。这个愿景足够宏大且与AI趋势一致。但"首选合作伙伴"而非"垄断供应商"的定位暗示了MRVL接受自己不是NVDA(不可替代)——这是务实的但也限制了定价权天花板。

**L2 — 在哪里赢 (Where to Play): 8/10**

MRVL在"战场选择"上是教科书级的:
- ✅ 聚焦数据中心(从73%收入→目标80%+)，剥离汽车(Infineon $2.5B [DM-BIZ-009])+WiFi(NXP)
- ✅ 选择hyperscaler作为核心客户(vs AVGO更广泛的企业+运营商覆盖)
- ✅ AI interconnect(铜→光的结构性趋势)

但L2有一个战略矛盾: **过度聚焦hyperscaler导致客户集中风险**。AVGO的L2得分可能更高，因为它同时在hyperscaler+enterprise+telco三个战场play——每个客户的离开只影响~5%收入。MRVL的L2选择了一个"高回报/高风险"战场。

**L3 — 如何赢 (How to Win): 6/10**

MRVL的"如何赢"策略有两个支柱:
(1) **技术领先**: Inphi光学DSP垄断+SerDes IP+3nm/2nm先进制程经验
(2) **一站式服务**: compute+interconnect+networking的端到端offering

但P3发现的Trainium 3/4证据暴露了L3的脆弱性: MRVL在"技术领先"支柱上被Alchip+Synopsys的组合追平(至少在一个major program中)。如果"技术领先"不再成立，"一站式服务"的价值也会打折——因为hyperscaler可以从Alchip买ASIC+从MRVL买光学DSP+从另一家买交换芯片。

**L4 — 核心能力 (Core Capabilities): 7/10**

关键能力评估:
| 能力 | 强度 | 独特性 |
|------|------|--------|
| 光学DSP设计 | 9/10 | 极高(全球<500人才库) |
| 3nm物理设计 | 7/10 | 中-高(Alchip追平) |
| SerDes IP | 7/10 | 中(可通过Synopsys许可替代) |
| TSM关系管理 | 6/10 | 中(Alchip关系更紧密) |
| Hyperscaler关系 | 7/10 | 中-高(Murphy个人关系) |

MRVL的能力组合是"优秀但不不可替代"——除了光学DSP设计，没有哪个能力是竞争对手完全无法复制的。

**L5 — 管理系统 (Management Systems): 7/10**

Murphy的track record整体正面:
- ✅ Cavium→Inphi收购链执行成功
- ✅ 战略性剥离(WiFi, 汽车)果断
- ✅ 资本配置: SBC/Rev从10.3%降至7.2% [DM-FIN-008], 回购$2B [DM-FIN-013]
- ⚠️ Celestial AI $3.25B: 高风险收购, ROI不确定(U04)
- ⚠️ COO换人(Hussain→Koopmans)在增长高峰期: 值得关注

**PtW总分: 7.0/10**

| 维度 | 评分 | AVGO对比(估) |
|------|------|-------------|
| L1 志向 | 7 | 8 |
| L2 战场 | 8 | 9 |
| L3 方法 | 6 | 8 |
| L4 能力 | 7 | 8 |
| L5 系统 | 7 | 8 |
| **总分** | **7.0** | **8.2** |

**A-Score × PtW交叉矩阵**:
- A-Score(护城河): 4.61/10 × PtW: 7.0/10 → **象限定位: "优秀执行+中等护城河"**
- 含义: MRVL依赖管理层执行力维持竞争地位，而非结构性壁垒自动保护——一旦执行失误(如Trainium 2延迟)，份额损失速度快

### 4.2 竞争Win/Loss Velocity

**近期Win/Loss记录(2025-2026)**:

| 事件 | 类型 | 影响 | 时间 |
|------|------|------|------|
| Trainium 3 bakeoff失败 | **LOSS** | Amazon ASIC, -$500M+/yr | 2025 |
| Trainium 4 (Maverick)未竞标 | **LOSS** | 延续Alchip锁定 | 2025-2026 |
| Maia 300升级2nm+HBM4 | **WIN** | Microsoft ASIC, +$500M-700M/yr | 2026+ |
| Ara 1.6T OFC创新奖 | WIN | 光学DSP, 份额维持60-80% | 2026 |
| 2nm custom SRAM | WIN(前瞻) | 技术储备, 收入2028+ | 2026 |
| Celestial AI收购 | WIN(战略) | 光子互联布局 | 2026-02 |
| 第4大hyperscaler engagement | WIN | 新客户, $100M+/yr | 2025-2026 |

**Win/Loss分析**: 在custom silicon领域，MRVL的wins和losses在2025-2026大致平衡(丢Amazon ASIC / 得MSFT Maia 300升级+第4大客户)。但**质量不对称**: Amazon是既有$750M客户(loss是确定收入下降)，MSFT Maia 300是未来收入(win需要等待量产确认)。丢existing > 得new = **velocity偏负面**。

在光学DSP领域，MRVL的velocity仍然正面——Ara量产领先Credo Bluebird 6-12个月 [DM-P3-001, DM-P3-002]。

### 4.3 设计Win频率趋势: 加速还是减速?

管理层声称18个active programs + 50+新机会 [DM-BIZ-013]。但"active programs"的定义模糊——可能包含从早期NRE到量产的各阶段。更有投资意义的指标是**从NRE签约到量产的转化率和时间**。

**可观察的design win历史**:

| 时间 | Design Win | 状态(2026) | 评估 |
|------|-----------|-----------|------|
| 2019-2020 | Amazon Trainium 1 | 量产中 | ✅ 成功 |
| 2020-2021 | Amazon Trainium 2 | 量产中(执行问题) | ⚠️ 执行不佳 |
| 2021-2022 | Microsoft Maia 100 | 部署中 | ✅ 成功 |
| 2022-2023 | Google Axion | Ramping | ✅ 进行中 |
| 2023-2024 | Amazon Trainium 3 | **丢给Alchip** | ❌ 失败 |
| 2024 | Microsoft Maia 300 | NRE/sampling | ⏳ 2nm升级延迟 |
| 2024-2025 | 第4大hyperscaler | NRE阶段 | ⏳ 早期 |

**Win Rate趋势**: 6个major programs中: 2.5成功/1部分成功/1失败/1.5进行中。成功率~50-60%——与行业平均(~70%)相比偏低。更重要的是**最新一个major bakeoff(Trn3)是失败的**——这是一个负面的momentum信号。

**因果推理**: Win rate偏低不一定是技术问题——可能反映了MRVL在客户关系管理和项目交付上的执行纪律弱于AVGO。AVGO在过去5年几乎没有丢过major hyperscaler design win(Google TPU连续多代用AVGO)——因为AVGO的交付纪律(on-time, on-budget)在业界是标杆级的。MRVL的Trn2 RDL问题和Trn3 bakeoff失败暴露了交付纪律的差距——这不是可以靠技术投入弥补的，而是需要组织文化和项目管理流程的改变。

### 4.4 MRVL vs AVGO vs Alchip: 三方博弈

ASIC设计服务市场正从双寡头(AVGO+MRVL)向三寡头(+Alchip)甚至四方(+MediaTek)演进。

**市场结构(HHI分析)**:

| 时间 | AVGO份额 | MRVL份额 | Alchip | 其他 | HHI |
|------|---------|---------|--------|------|-----|
| FY2025 | 60% | 30% | 5% | 5% | 4550 |
| FY2027E | 60% | 15% | 15% | 10% | 4150 |
| FY2029E | 55% | 10% | 20% | 15% | 3750 |

HHI从4550降至3750——仍远高于"高度集中"阈值2500，说明AVGO的垄断地位稳固。但MRVL从明确的#2(30%)退化为与Alchip争夺#2(15% vs 15%)——这个地位变化比份额下降本身更重要，因为它改变了**叙事**(narrative从"AI ASIC #2"变成"ASIC #3?")。

**Nash均衡分析**:

在当前市场结构下:
- **AVGO**: 最佳策略是"维持高价+扩展客户"——因为60%份额给了充足的定价权(Stage 4)
- **MRVL**: 最佳策略是"差异化(optical+ASIC一站式)+price competitive"——因为pure ASIC设计上无法与AVGO(规模)或Alchip(成本)竞争
- **Alchip**: 最佳策略是"低价+快速执行+TSMC关系"——因为规模不足以与AVGO/MRVL在IP宽度上竞争

均衡结论: MRVL被夹在中间——AVGO在上面(更广IP+更深客户关系)，Alchip在下面(更低成本+更好TSMC关系)。MRVL的差异化必须来自"光学+ASIC一站式"——但Ch1已证明custom silicon的moat在衰减，而"一站式"的价值取决于客户是否真的需要一个供应商提供所有东西(vs 分别从best-in-class采购)。

---

## Ch5: 五引擎整合 + 协同矩阵 + PPDA

### 5.1 E1竞争博弈引擎: Hyperscaler自研趋势

Hyperscaler自研ASIC是一把双刃剑——既是MRVL的客户(设计服务)也是MRVL的替代者(自研替代外购)。

当前态势:
| Hyperscaler | 自研能力 | MRVL角色 | 风险 |
|-------------|---------|---------|------|
| Amazon | 强(Annapurna Labs) | 设计服务→Alchip替代中 | ★★★★★ |
| Google | 强(TPU自研, Axion借MRVL IP) | 部分协作 | ★★★ |
| Microsoft | 弱(刚开始, 无自有设计团队) | 核心co-designer | ★★(最安全) |
| Meta | 中(MTIA系列, DPU与MRVL合作) | 设计partner | ★★★ |

**Google-MediaTek联盟模板**: Google与MediaTek在手机芯片(Tensor)上的合作模式可能扩展到数据中心ASIC。如果Google选择MediaTek做下一代TPU/Axion的设计partner(而非MRVL)——这将是Trainium 3剧本的重演。概率评估: 20-30%(基于MediaTek已有Google合作关系+MediaTek正积极进入AI ASIC市场)。

### 5.2 E2周期定位引擎: AI CapEx处于什么阶段?

**2026年hyperscaler AI CapEx**:
- 总量: $600-690B [DM-P3-027]
- YoY增速: +36-67%
- AI占比: ~75% (~$450B)
- 2027E: $820-870B [DM-P3-028]
- 累计2025-2027: $1.15T(Goldman Sachs) [DM-P3-029]

**WFE/CapEx周期位置判断**:

| 指标 | 当前值 | 信号 | 含义 |
|------|--------|------|------|
| CapEx/Rev | 45-57% | ★历史最高 | 资本强度不可持续>3年 |
| YoY增速 | +36-67% | 加速 | 但基数效应→2027增速必然放缓 |
| Debt issuance | $108B(2025), $1.5T pipeline | ★杠杆融资 | 回报不达预期→信用风险 |
| SEMI-L6 | >$500B AI CapEx | 看多 | 源头需求仍强 |
| 峰值信号 | Omdia: "growth likely peaking in 2026" [DM-P3-030] | ⚠️ | 增速峰值≠绝对值峰值 |

**周期判断**: AI CapEx处于**late acceleration**阶段——绝对值仍在快速上升，但增速在2026-2027可能达峰。这意味着:
- MRVL的FY2027-2028收入增速有强支撑(供应商的revenue是CapEx的derivative)
- 但FY2029+增速将自然放缓(非公司特定原因)
- 估值必须对增速放缓给折价——Forward PE 17x可能已经price in了这一点

### 5.3 E3估值重构引擎: Forward PE 17x的Regime转换点

当前Forward PE 17.4x [DM-VAL-001]基于FY2028E EPS $5.43的共识。几个regime转换触发点:

**上行触发(PE→22-25x)**:
- Maia 300量产确认+Amazon否认流失(官方, 非管理层Q&A)
- 连续3Q beat+raise → 分析师上调共识至EPS $6+
- ASIC TAM验证>$100B(2030) → 增长runway延长

**下行触发(PE→12-14x)**:
- Amazon正式确认Trainium 3/4转Alchip → 叙事崩塌
- AI CapEx指引下调>20% → 全行业去rating
- 中国出口管制扩展到MRVL产品线 → 收入-10-15%

**估值体制概率**:
- PE 22-25x(re-rating): 20%概率 — 需要Amazon/MSFT双重确认
- PE 16-20x(维持): 50%概率 — 当前base case延续
- PE 12-15x(de-rating): 30%概率 — Amazon流失确认+增速减速

### 5.4 E4预测市场引擎

Polymarket搜索结果:
- 台海冲突: 3.6% [DM-PMK-002] → 对MRVL供应链(TSM代工)影响极低概率
- 美国衰退: 31% [DM-PMK-001] → 衰退可能压缩AI CapEx(但hyperscaler反周期投资历史:2020 COVID期间CapEx反而加速)
- 直接MRVL/Amazon合约市场: 未找到

**Polymarket信号vs估值含义**: 台海3.6%意味着地缘折价应<$2/share(vs TSM ~$8/share折价)——MRVL的地缘风险被合理定价。衰退31%需要关注——如果衰退导致AI CapEx下调20%，MRVL FY2028E收入可能从$10.8B降至$8.6B，对应EPS从$4.34(修正)降至$3.5→Forward PE从17.4x升至27x→显著高估。

### 5.5 E5风险压力引擎 + 协同矩阵

**五大风险更新(P3新证据后)**:

| 风险 | P1概率 | P3概率 | 变化 | 原因 |
|------|--------|--------|------|------|
| R1: Amazon ASIC流失 | 25-35% | **55-65%** | ★大幅上升 | Trainium 3/4多源确认 |
| R2: 中国出口管制 | 15-25% | 15-20% | 微降 | Trump趋缓信号 |
| R3: GM持续稀释 | 70% | 75% | 微升 | Custom silicon占比确认↑ |
| R4: AI CapEx急刹 | 10-15% | 10-15% | 不变 | $600B+确认但峰值信号出现 |
| R5: Celestial AI失败 | 20-30% | 20-30% | 不变 | 无新信息 |

**协同矩阵(哪些风险相互放大?)**:

| | R1 Amazon | R2 中国 | R3 GM | R4 CapEx | R5 Celestial |
|---|-----------|---------|-------|---------|-------------|
| R1 | — | 独立 | **协同**(失去最大客户→剩余客户custom占比更高→GM更差) | 独立 | 独立 |
| R2 | 独立 | — | 独立 | **协同**(地缘+CapEx双杀) | 独立 |
| R3 | **协同** | 独立 | — | 独立 | 独立 |
| R4 | 独立 | **协同** | 独立 | — | 独立 |
| R5 | 独立 | 独立 | 独立 | 独立 | — |

**最危险组合**: R1+R3(Amazon流失+GM稀释) — 概率P(R1)×P(R3|R1)≈60%×85%=51%。如果Amazon ASIC收入消失(FY2028-R1 $500M下降)，MRVL的custom silicon客户集中度反而不会改善(因为MSFT变成>50% custom silicon)——GM稀释问题不会因为失去低margin客户而好转，因为MSFT Maia也是custom silicon(同样低GM)。

**"温水煮青蛙"路径(参考AVGO v2.0框架)**:

```
MRVL的"温水煮青蛙"不是单一事件，是渐进侵蚀:

Year 1(FY2027): Amazon Trn3量产少于预期→解读为"timing"→股价不跌
Year 2(FY2028): Trainium 4确认Alchip→Amazon收入-$500M→解读为"已price in"→PE微压缩至15x
Year 3(FY2029): Alchip 2nm成熟+MediaTek进入→MRVL ASIC份额8%→解读为"optical更重要"→但optical面临CPO威胁
Year 4(FY2030): CPO规模部署→pluggable DSP TAM缩小→MRVL两个引擎同时减速→估值重构
```

这个路径的insidious之处在于: 每一步都有"合理解释"——没有一个季度看起来是"灾难性"的，但累积效应是护城河从4.61降至3.55(Ch1时间函数)。

### 5.6 PPDA: 概率-价格背离

**PPDA-1: Amazon续约概率 vs 市场隐含概率**
- 我们的概率: P(Amazon ASIC续约FY2028+) = 35-45%(基于Trn3/4丢失证据)
- 市场隐含概率: Forward PE 17x隐含的是"客户组合大致稳定"→隐含P(续约)>60%
- **背离**: 市场高估Amazon续约概率15-25个百分点 → 股价可能高估$5-10

**PPDA-2: AI CapEx可持续性 vs 市场定价**
- 我们的判断: AI CapEx增速在2026-2027达峰(绝对值继续增长但减速)
- 市场隐含: 分析师FY2029E $18.93B [DM-CON-005]隐含+40% CAGR持续到2029 → 需要AI CapEx持续加速
- **背离**: 如果AI CapEx增速从2026的+50%降至2028的+15%，MRVL FY2029收入可能$14B(vs共识$19B)→EPS $5.5(vs $7.42)→PE从12.8x回升到17x → **隐含市场对MRVL增速预期可能偏高**

**PPDA-3: 光学DSP垄断持久性 vs CPO威胁定价**
- 我们的判断: CPO大规模部署2027-2028 → pluggable DSP TAM在2028-2030可能被侵蚀20-30%
- 市场隐含: Celestial AI $3.25B收购已部分price in CPO转型
- **背离方向不确定**: Celestial AI可能是"正确的防御"(如果光子互联成为CPO替代) 也可能是"$3.25B的沉没成本"(如果CPO路径不经过Celestial的技术)

### 5.7 风险温度计: P3后整体温度

**MRVL风险温度(P1→P2→P3演进)**:

```
P1温度: 🟡 35°C (偏低估，但有未知风险)
  ↓ P2发现OPM第三条路+估值翻转
P2温度: 🟠 55°C (中性偏审慎，FV $78-86 vs $95)
  ↓ P3发现Amazon确认流失+护城河量化降级
P3温度: 🟠 65°C (审慎区间边缘)

温度计解读:
  0-30°C 🟢 = 深度关注/关注(明确低估+催化剂)
  30-50°C 🟡 = 中性关注(合理估值区间)
  50-70°C 🟠 = 中性偏审慎→审慎(略高估/风险上升)
  70-100°C 🔴 = 审慎关注(明确高估/重大风险)
```

P3后温度从55°C升至65°C的驱动因素:
1. CQ1下调(55%→40%): +5°C(custom silicon增长路径受阻)
2. 护城河降级(6.3→4.61): +3°C(结构性保护弱于预期)
3. Win/Loss velocity偏负: +2°C(丢existing>得new)

但温度没有突破70°C(审慎关注阈值)，因为:
- 光学DSP仍然强势(60-80%份额, Ara领先6-12月)
- AI CapEx环境仍极强($600B+ FY2026)
- MSFT Maia 300是有实质的补偿(2nm+HBM4, 可能$500-700M/yr)
- Forward PE 17x已经包含了相当多的负面预期

**温度计含义**: 如果Phase 4红队不发现重大遗漏正面因素，评级可能从"中性关注(偏审慎)"调整为"审慎关注"或"中性关注(偏审慎)"维持但加强审慎标注。关键变量是MSFT Maia 300的实际收入结构(Q14)。

### 5.8 PMSI情绪指数

| 指标 | 值 | 信号 |
|------|-----|------|
| 分析师 | 22 Buy/5 Hold/0 Sell [DM-P3-031] | ★一致看多(共识过度?) |
| 目标价 | $116-118 avg [DM-CON-002, DM-P3-031] | +23%隐含upside |
| Short interest | 4.3-4.4% float [DM-OPT-001] | 低(不是crowded short) |
| Put/Call | 1.27 [DM-OPT-002] | 偏空(与分析师共识矛盾!) |
| Insider A/D | <0.70连续5+季度 [DM-P3-032] | ★★持续内部人卖出 |
| 机构 | 693增持 vs 759减持 [DM-SMT-002] | 净减持(微弱) |

**PMSI综合信号**: 分析师一致看多+期权市场偏空+内部人持续卖出 = **典型的"分析师vs聪明钱"分歧**。历史上当这三个信号矛盾时，期权市场和内部人通常更准确(因为分析师有sell-side偏差)。这与P2"中性关注(偏审慎)"的判断一致。

**内部人行为深层分析**: CEO Murphy在3月26日卖出30K股@$98.70 [DM-SMT-003]——这笔交易是基于2025年12月16日设立的10b5-1计划执行的，说明Murphy在3个多月前(股价可能更高时)就安排了这笔卖出。A/D ratio持续5+季度低于0.70 [DM-P3-032]是一个值得重视的信号——虽然insider selling有多种动机(纳税、多元化、流动性)，但**零open-market purchase连续5季度**在一个"增长最快的AI半导体公司"中是不寻常的。对比NVDA(Jensen Huang定期卖出但量级占薪酬的百分比更低)和AVGO(Hock Tan持股量级更大)——MRVL insider的行为模式更像"确信当前价格大致合理或偏高"。

CFO Meintjes的3,400股买入 [DM-SMT-004]是唯一的正面信号——但3,400股×$95≈$323K，对于一个CFO来说是微量信号(可能是新入职奖励或匹配要求)。

---

## Ch6: AI深度评估 — Phase 3.5

### 6.1 Layer 1: 分部级AI冲击矩阵

MRVL被定位在AI利好衰减模型的Layer 1.5(介于芯片设计和制造之间)——因为MRVL不设计自己的AI架构(那是NVDA/AMD)，而是帮hyperscaler设计他们的AI芯片+提供AI集群的互联芯片。

| 分部 | AI收入冲击 | 护城河变化 | 竞争影响 | 时间窗口 | 置信度 |
|------|----------|----------|---------|---------|--------|
| Custom Silicon | ★★★★★(+5) | 中性→负(Alchip) | 利好(TAM↑)但竞争加剧 | 1-3yr | 高 |
| Optical DSP | ★★★★★(+5) | 强化(铜→光不可逆) | 利好(无替代路径) | 1-3yr | 高 |
| Standard Networking | ★★(+2) | 中性 | 中性(以太网升级温和) | 3-5yr | 中 |
| Comm/Storage/Other | ★(+1) | 中性 | 中性(非AI相关) | 5yr+ | 低 |

**关键洞见**: MRVL的两个AI受益业务(custom silicon+optical)有截然相反的competitive dynamics:
- **Custom silicon**: AI把TAM从$13B放大到$150B+——但也把竞争者从2个(AVGO+MRVL)扩大到4+(+Alchip+MediaTek)。MRVL的份额在缩小，收入可能还在增长(但速度慢于TAM)
- **Optical DSP**: AI把铜→光转型加速——且垄断者(MRVL)地位暂时稳固。因为AI集群从10K GPU→100K GPU，机柜间距离超过铜线极限(~3米)→必须用光 [DM-BIZ-014]

**ASIC vs GPU份额趋势**: ASIC增速44.6% vs GPU增速16.1%(2026年) [DM-P3-033]——ASIC市场增速是GPU的近3倍。这对MRVL整体是利好(因为MRVL的custom silicon就是ASIC设计服务)——但受益者主要是AVGO(份额稳定在60%) [DM-P3-034]和Alchip(份额快速增长)，MRVL的share of benefit取决于能否保住MSFT+赢得emerging programs。

### 6.2 Layer 2: L×S坐标

L(自动化水平) × S(规模化阶段):

| 分部 | L位置 | S位置 | 含义 |
|------|-------|-------|------|
| Custom Silicon | L2(受控自动化) | S2(规模化) | AI训练集群正在大规模部署 |
| Optical DSP | L2-L3(向更高自动化演进) | S2-S3(深度规模化) | 光互联正在成为数据中心标配 |
| MRVL整体 | **L2×S2** | | 处于AI基础设施buildout的主力阶段 |

与AVGO对比: AVGO也在L2×S2，但AVGO的S3潜力更高(因为Google TPU+Meta MTIA都在向推理扩展→AVGO的ASIC客户正在从训练→推理扩展)。MRVL的S3潜力取决于Maia 300能否成功进入推理市场(Maia 200设计就是for推理)。

### 6.3 Layer 3: AI对价格的含义

**Reverse DCF隐含AI溢价**:

P2的Reverse DCF [P1 Ch1]显示市场定价隐含FY2028 收入~$15B、FCF CAGR 25-28%持续10年。

其中AI贡献估算:
- AI相关收入(custom silicon+optical interconnect): FY2026 ~$4.5B(DC $6.1B的~75%)
- FY2028E AI收入: ~$8-9B(假设AI部分+35% CAGR)
- 非AI收入: ~$2.5-3B(标准网络+comm/storage, +5%/yr)
- 合计: $10.5-12B → 与共识$10.8B [P2估算]一致

**如果AI CapEx急刹(R4)的影响**:

```
情景: FY2028 AI CapEx从$820B降至$600B(-27%)
→ AI芯片市场增速从+30%降至+10%
→ MRVL AI收入从$8-9B降至$5-6B
→ 总收入从$10.8B降至$7.5-9B
→ EPS从$4.34(修正)降至$2.5-3.2
→ Forward PE从17.4x升至30-38x(以当前$95估值)
→ 当前股价隐含"零AI CapEx下调"
```

这个计算说明: **MRVL的估值对AI CapEx高度敏感**。Forward PE 17x看似便宜，但它隐含了AI CapEx持续加速——如果AI CapEx仅仅减速(不是急刹)到+15%，MRVL的"便宜"就变成"合理"。

### 6.4 CPO威胁评估

CPO(Co-Packaged Optics，协封装光学——将光学功能直接集成到交换芯片封装内，替代外部pluggable光模块)是MRVL光学DSP业务的中期结构性威胁。

**时间线**:
| 里程碑 | 时间 | 来源 |
|--------|------|------|
| Broadcom >50K CPO交换芯片出货 | 2025 [DM-P3-004] | Siemens |
| IEEE 802.3 CPO标准化(800G/1.6T) | Late 2027E | IEEE |
| CPO规模部署 | 2027-2028E | 多源共识 |
| CPO端口>18M | 2029E | Precedence Research |
| CPO市场$1B+ | 2034E [DM-P3-035] | Precedence Research |

**CPO对MRVL的冲击机制**:

在CPO架构下，光学功能(DSP+TIA+激光器)被集成到交换芯片的封装内→standalone pluggable光模块不再需要→MRVL的光学DSP(目前以芯片形式卖给光模块厂商)需求减少。

**影响量化**:
- MRVL光学DSP当前估算收入: $2-3B(FY2026, DC $6.1B的30-40%)
- CPO penetration到2028E: 10-15%的高端交换端口
- 收入影响: 光学DSP收入可能下降10-15% by FY2029(被CPO替代的部分)
- 但Celestial AI的光子互联技术声称"25x更高带宽+10x更低延迟 vs CPO替代品" [DM-BIZ-008]——如果这是真的，Celestial可能是"CPO杀手"而非"被CPO杀"

**MRVL的防御策略**:
1. **Celestial AI收购($3.25B)**: 直接进入on-package光互联市场，不再依赖pluggable
2. **UALink scale-up交换**: 参与开放AI互联标准，确保在新架构中有席位
3. **Ara T/Ara X/Petra**: 新一代DSP产品可能适配CPO封装形式(从pluggable DSP→on-package DSP)

**投资判断**: CPO是2028-2030的风险，不是2026-2027的风险。在这个时间窗口内，MRVL有足够时间通过Celestial AI构建CPO时代的产品线——但$3.25B的收购需要在FY2028开始产生回报($500M run rate目标)才能证明这个转型不是"太晚太贵"。

### 6.5 光学DSP价值链拆解: CPO如何重塑谁赚钱

CPO对MRVL的威胁不仅是"需求减少"——更深层的问题是**价值链重构**。

**当前pluggable架构的价值分配**:
```
交换芯片(Broadcom $300) → 光模块(II-VI/Coherent $500-800) → DSP芯片(MRVL $100-150)
                                                              → TIA(MRVL $30-50)
                                                              → 激光器(Lumentum $50-80)
                                                              → 封装/测试($30-50)
MRVL在每个光模块中的content: $130-200, 整个光模块$500-800
```

**CPO架构的价值分配**:
```
交换芯片+光学引擎(集成在一个封装中)
  → 交换芯片ASIC(Broadcom, MRVL不参与)
  → 硅光子引擎(Intel, Ayar Labs, **Celestial AI**)
  → CW激光器(Lumentum, Coherent)
  → 先进封装(TSM InFO, ASE)

MRVL在CPO中的content: 取决于Celestial AI成功与否
  → 如果Celestial成功: MRVL从"pluggable DSP供应商"转型为"on-package光互联供应商"
  → 如果Celestial失败: MRVL的content从$130-200降至接近$0(被硅光子引擎替代)
```

因此**Celestial AI是MRVL最关键的战略对冲**——不是简单的"收购一个新业务"，而是"买一张不被CPO淘汰的入场券"。$3.25B的收购价本质上是一个保险费——保的是MRVL在光互联市场中$2-3B/yr收入的存续。

**Celestial AI vs 竞争CPO方案对比**:
| 维度 | Celestial AI | Intel Silicon Photonics | Ayar Labs |
|------|-------------|----------------------|-----------|
| 技术路径 | 光子织物(Photonic Fabric) | 硅光子集成 | 光学I/O |
| 声称优势 | 25x带宽, 10x低延迟 vs CPO [DM-BIZ-008] | 已在量产 | 低功耗 |
| 量产状态 | Pre-revenue, FY2028E $500M | 小批量 | 小批量 |
| 与MRVL协同 | 高(共享客户+封装) | 不适用(竞争) | 不适用(竞争) |

**投资判断**: 如果Celestial AI的"25x带宽"声称属实——MRVL可能在CPO时代不仅不丢份额，反而扩大content(因为光子织物可能比传统CPO更值钱)。但这是一个$3.25B的押注在一个pre-revenue技术上——成功概率我们估计40-50%，失败意味着$3.25B减值(U04)。

**概率三重锚定(Celestial AI成功概率: 40-50%)**:
1. **历史基准率**: 半导体行业$1B+技术收购成功率(被收购方技术进入量产)约50-60%(包括MRVL自己的Inphi: 成功; Qlogic: 中等)
2. **反例条件**: 失败案例通常是技术路径被替代(如Intel Optane被CXL替代)。Celestial的光子织物是否会被"标准CPO+更好封装"替代？→如果IEEE CPO标准在2027年底前定稿，可能降低Celestial的差异化
3. **自然实验**: MRVL的Ara DSP从sampling到mass volume用了约12-18个月。如果Celestial遵循类似时间线，FY2027 sampling→FY2028H2量产是合理的——$500M run rate目标与Ara的ramp轨迹一致

### 6.6 Chiplet/UCIe标准化威胁

UCIe 3.0已于2025年8月获批 [DM-P3-036]，支持48/64 GT/s，MRVL是联盟成员(2022年加入)。

**对custom silicon moat的影响**:

UCIe的核心promise是"chiplet互操作性"——不同供应商的chiplet可以通过标准接口组装成SoC。理论上，这降低了custom ASIC客户对单一供应商的依赖(因为可以mix-and-match)。

但实际影响有限:
- UCIe标准化的是**接口**，不是**chiplet设计本身**——MRVL的价值来自设计复杂chiplet(如SerDes die, compute die)的能力，不是连接标准
- Hyperscaler已经在使用UCIe(MRVL的Trn2也用了chiplet方案——但Trn3竞标时输给了monolithic方案)
- 短期内UCIe不会导致revenue erosion [DM-P3-036]

**净效应**: UCIe对MRVL是中性偏利好——因为MRVL的XConn收购专门做chiplet互联，如果UCIe成为标准，MRVL可能从chiplet trend中获益(卖更多interconnect chiplet)。

---

## Ch7: CQ置信度更新 + 三文件更新

### 7.1 CQ置信度演化

| CQ | P0 | P1 | P2 | **P3** | P3方向 | 关键P3证据 |
|----|-----|-----|-----|--------|--------|-----------|
| CQ1 ASIC $1.5→$3B | 50% | 55% | 55% | **40%** | ↓↓大幅下调 | Alchip Trn3/4确认 + MRVL份额→8% |
| CQ2 光学DSP持久性 | 60% | 70% | 70% | **65%** | ↓微降 | CPO 2027-2028风险 + Broadcom/Credo追赶 |
| CQ3 PE 17x合理? | 50% | 55% | 60% | **55%** | ↓微降 | 护城河量化4.61(vs P1定性6.3)→折价更合理 |
| CQ4 中国38%风险 | 50% | 45% | 45% | **45%** | 不变 | 无新证据 |
| CQ5 商誉ROIC | 50% | 60% | 60% | **60%** | 不变 | 无新证据 |

**CQ1大幅下调解释**: P1/P2将Amazon流失标注为U01(unknown, 25-35%概率)——P3通过SemiAnalysis/Global Tech Research/Benchmark等多源交叉验证，将其升级为**高置信度事实**(55-65%概率)。这直接将CQ1从55%下调至40%——因为Amazon是custom silicon的largest single customer(~50%收入)，其流失使"$1.5B→$3B翻倍"的路径受阻。

即使MRVL还能通过MSFT Maia 300+emerging programs维持custom silicon增长，FY2028目标可能从$3.6B(P2 Base)下调至$2.5-3.0B(P3修正)——仍增长但不再是"翻倍"。

**CQ加权置信度(P3 vs P2)**:
- P2: (55+70+60+45+60)/5 = 58%
- P3: (40+65+55+45+60)/5 = **53%**
- 方向: **整体置信度下降5个百分点**——主要由CQ1驱动

### 7.2 P3对估值的影响

P2结论: PW FV $78 / 加权FV $86 / 中性关注(偏审慎)

P3需要修正的输入:
1. **R1(Amazon流失)概率**: 从30%→60% → 概率加权EV下降
2. **Custom silicon FY2028收入**: 从$3.2B(Base)→$2.5-3.0B → SOTP下调
3. **护城河折价**: 从P1的6.3/10→P3的4.61/10 → 合理PE倍数可能需要额外折价

这些修正将在Phase 4红队后最终确定——但方向性判断已经明确: **P3新证据强化了P2的"中性关注(偏审慎)"判断，可能需要进一步下调至接近"审慎关注"的边界**。如果Phase 4确认Amazon ASIC流失是不可逆的，评级可能需要下调。

### 7.3 Question Tree更新

**已回答/部分回答**:
| Q | 状态变化 | P3回答 |
|---|---------|--------|
| CQ1 | ❓→⚠️ | 翻倍路径受阻(Amazon流失+Alchip崛起)，但MSFT+emerging部分补偿 |
| Q9 | ❓→✅ | 当前不可行动(护城河衰减中)，等待Q1 FY27 earnings确认Amazon状态 |
| Q13 | ❓→✅ | PE鸿沟中~60-70%被软件/规模/客户分散解释，10-15%是MRVL折价(合理) |

**新增衍生问题**:
| Q | 问题 | 来源 | 优先级 |
|---|------|------|--------|
| Q14 | Maia 300实际MRVL收入是$2.4B还是$0.5-0.7B(设计费vs全芯片)? | P3 Ch3 | high |
| Q15 | Celestial AI光子互联 vs CPO: 谁赢? 时间线? | P3 Ch6 | high |
| Q16 | MediaTek-Google ASIC联盟概率和时间线? | P3 Ch4/5 | medium |
| Q17 | AVGO OPM天花板38%的假设条件是什么?(如果Celestial高margin→超过38%) | P3 Ch2 | medium |

### 7.4 Evidence Registry新增

Phase 3新增DM锚点:

| ID | 内容 | 类型 | 来源 |
|----|------|------|------|
| DM-P3-001 | Credo Bluebird 1.6T DSP, 3nm, sub-20W, Sep 2025发布 | H | Credo IR |
| DM-P3-002 | Marvell Ara 1.6T批量出货中(mass volume), 2025 | H | Marvell IR |
| DM-P3-003 | Marvell PAM4 DSP市占率60-80%(50-100G/lane) | R | 多源估算 |
| DM-P3-004 | Broadcom >50K CPO交换芯片已出货(2025) | H | Siemens |
| DM-P3-005 | Alchip赢得Trainium 3 bakeoff, Trn2 RDL问题MRVL执行不佳 | R | SemiAnalysis |
| DM-P3-006 | Trainium 3前端用Synopsys PCIe SerDes(非MRVL) | R | SemiAnalysis |
| DM-P3-007 | MRVL DesignCon 2026展示PCIe 8.0 (256GT/s) SerDes | H | DesignCon |
| DM-P3-008 | 接口IP市场19% CAGR 2023-2028, 全球224G SerDes≤5家 | H | Electronics Weekly |
| DM-P3-009 | Synopsys 224G SerDes N5/N3E/N3P production-ready | H | Synopsys |
| DM-P3-010 | MRVL 2nm custom SRAM(业界首个) | H | MRVL PR |
| DM-P3-011 | Alchip FY2025 Rev $992M, 3nm active, 2nm开发中, TSMC联盟 | H | Alchip IR |
| DM-P3-012 | AVGO FY2020-FY2025六年收入/GM/OPM数据 | H | FMP data |
| DM-P3-013 | MRVL OPM天花板35-38%(GM稀释抵消OpEx leverage) | R | P3分析 |
| DM-P3-014 | Counterpoint: MRVL ASIC份额~35%→~8% by 2027 | R | Counterpoint |
| DM-P3-015 | AI ASIC市场$13B(2024)→$150B+(2030), ~50% CAGR | R | Counterpoint/Bloomberg |
| DM-P3-016 | Trainium 4 (Maverick) = Annapurna+Alchip, Q4 2027量产 | R | Global Tech Research |
| DM-P3-017 | Benchmark降级MRVL"高确信流失Trn3/4" | H | Yahoo Finance |
| DM-P3-018 | MRVL保留Trn2.5+条件性20% Trn3+非ASIC多代协议 | R | SemiAnalysis/Substack |
| DM-P3-019 | Maia 200延迟至H2 2026 | H | GuruFocus |
| DM-P3-020 | Maia 300升级2nm+HBM4, 300-400K初始→1.5M/yr, ASP ~$8K | R | Techi/analyst |
| DM-P3-021 | Google Axion源自MRVL ThunderX谱系 | R | Next Platform |
| DM-P3-022 | 第4大hyperscaler engagement确认(可能Oracle) | H | MRVL IR |
| DM-P3-023 | Cadence 224G SerDes(含Rambus PHY资产收购) | H | Cadence PR |
| DM-P3-024 | Alphawave AthenaCORE 1G-224G SerDes | H | Alphawave |
| DM-P3-025 | Credo 224G PAM4 SerDes IP on TSMC N3 | H | Credo IR |
| DM-P3-026 | Alchip 2nm tape-out expected by year-end 2026 | R | SemiWiki |
| DM-P3-027 | 2026 hyperscaler AI CapEx $600-690B | R | Goldman/CNBC/Futurum |
| DM-P3-028 | 2027 hyperscaler AI CapEx $820-870B | R | Moody's |
| DM-P3-029 | 2025-2027累计$1.15T(Goldman Sachs) | R | Goldman Sachs |
| DM-P3-030 | Omdia: AI芯片市场增速可能在2026达峰 | R | Omdia |
| DM-P3-031 | 分析师22 Buy/5 Hold/0 Sell, 目标$116-118 | H | MarketBeat/TipRanks |
| DM-P3-032 | Insider A/D <0.70连续5+季度, CEO Murphy卖30K股@$98.70 | H | Benzinga/MarketBeat |
| DM-P3-033 | ASIC增速44.6% vs GPU增速16.1%(2026) | R | TrendForce |
| DM-P3-034 | AVGO AI Rev $8.4B/Q (+106% YoY), 43% of revenue | H | AVGO earnings |
| DM-P3-035 | CPO市场$95M(2025)→$1,055M(2034), CAGR 30.66% | R | Precedence Research |
| DM-P3-036 | UCIe 3.0 ratified Aug 2025, 84+ members, MRVL加入2022 | H | UCIe Consortium |

**DM统计**: Phase 3新增36个锚点(H:18, R:18)

### 7.5 Unknowns更新

| # | 变化 | 说明 |
|---|------|------|
| U01 | ❓→⚠️(**部分解决**) | Amazon Trn3/4转Alchip: 多源确认为高概率事实(55-65%)，不再是"未知" |
| U02 | 不变(❓) | Maia SerDes问题——Maia 300升级到2nm暗示MRVL关系稳固 |
| U03 | 不变(❓) | GM稀释终点——P3确认方向(↓)但幅度仍不确定 |
| U04 | 不变(❓) | Celestial AI商业化——P3增加CPO对标，但技术验证仍需等待 |
| U05 | 不变(❓) | AI CapEx回调——P3确认增速可能2026达峰但绝对值持续增长 |
| U06 | 不变(❓) | 中国出口管制——无新信息 |
| **U07(新增)** | ❓ | MediaTek-Google ASIC联盟是否威胁MRVL在Google的角色? |
| **U08(新增)** | ❓ | Maia 300实际MRVL收入结构(设计费 vs per-chip) |

### 7.6 Phase 3产出统计

Phase 3写作完成后统计(将由phase_complete.sh验证):
- 目标: ≥40,000字符
- DM锚点: 36个新增(DM-P3-001至DM-P3-036)
- 目标DM密度: ≥0.8/千字
- 因果推理链: ~20条
- 反面考量: ~15处
- PtW评分: ✅ 完成(7.0/10)
- AI冲击矩阵: ✅ 完成(4分部×5维度)
- PPDA: ✅ 3个背离
- C1-C6量化: ✅ 完成(加权4.61/10)

### 7.7 Phase 4方向

Phase 4(红队)应聚焦:
1. **Amazon流失影响的精确量化**: P3给了方向性(CQ1从55%→40%)，P4需要在修正后的assumptions下重跑估值模型
2. **MSFT Maia 300收入结构验证**: $2.4B(全芯片) vs $0.5-0.7B(设计费+royalty)——这个区别对SOTP影响$10-15B
3. **双向校准**: MRVL是否被过度看空(P3发现集中在负面→需要检查是否忽略了正面证据)
4. **估值更新**: 基于P3修正后的CQ概率和revenue assumptions重跑概率加权
5. **Kill Switch确定**: 什么单一事件能让论点彻底翻转

---

*Phase 3完成 | 2026-03-30 | 半导体Worktree*
