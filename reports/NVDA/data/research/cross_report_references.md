# NVDA/NVIDIA Cross-Report References
> Compiled from completed reports across all worktrees
> Date: 2026-03-02
> Source reports: AMD, TSM, INTC, ARM, AMAT, MU, SEMI_EQUIPMENT, AVGO, ANET, SMCI, VRT, ETN, KLAC, LRCX, ASML

---

## [AMD] Report References
**Source**: `reports/AMD/AMD_Complete_v2.0_2026-02-11.md`

### Reference 1: GPU利润率差距 — AMD vs NVIDIA 34pp
> 竞争定位: DC #2但GPU利润率差距34pp vs NVDA, EPYC #1挑战者

AMD在数据中心GPU领域作为第二名，与NVIDIA存在34个百分点的毛利率差距。这一差距反映了CUDA生态锁定效应和NVIDIA在AI训练市场的垄断定价权。

### Reference 2: MI355X推理性能 vs B200 — DeepSeek基准测试
> MI300X/MI350X在推理市场表现出色(DeepSeek-R1测试中MI355X性能1.4x高于NVIDIA B200)，但NVIDIA Vera Rubin(2026H2)的机架级FP8性能是AMD Helios的2.6x。

AMD在推理市场展现出性价比优势，但NVIDIA在训练和下一代架构上保持代际领先。这一"推理领先+训练落后"的格局定义了AMD在AI GPU市场的战略空间。

### Reference 3: CoWoS产能分配 — NVIDIA占60%, AMD仅11%
> CoWoS年需求分配(~100万片): NVIDIA 60%, Broadcom 15%, AMD 11%, 其他 14%
> AMD获得的TSMC CoWoS分配(80K片/年，加OSAT 25K片共计~105K片/年)仅为NVIDIA(595K片/年)的17.6%。

CoWoS封装产能分配是AMD AI GPU出货量的硬约束。即使CoWoS总产能翻倍，如果分配比例不变，AMD的GPU出货量天花板仍远低于NVIDIA。这一结构性约束源于TSMC对各客户收入贡献和战略价值的排序。

### Reference 4: HBM供应商优先级 — NVIDIA优先的结构性约束
> HBM供应商优先级: NVIDIA优先的结构性约束。三大存储厂商的HBM产能分配存在明确的客户优先级。SK Hynix NVIDIA分配最高优先，AMD分配第二优先。

NVIDIA在HBM供应链中享有绝对优先地位，AMD作为第二优先级客户面临HBM供应量约束。这一约束与CoWoS分配共同构成AMD AI GPU的"双重瓶颈"。

### Reference 5: CapEx轻资产模式 vs NVIDIA
> AMD FY2025 CapEx仅$0.97B(营收2.8%), vs NVIDIA $3.2B(2.4%), Intel $21.8B(22%)。低资本密度带来高ROIC潜力，但也意味着AMD无法通过自建产能缓解供应瓶颈。在AI产能争夺战中，fabless模式可能从优势变为劣势。

### Reference 6: 多战线竞争的复杂度
> AI GPU市场的竞争维度从芯片设计扩展到了软件生态(ROCm vs CUDA) + 互连技术(UALink vs NVLink) + 系统集成(Helios vs DGX/NVL72)。这种多战线作战是AMD在$2时期从未面对过的挑战。

---

## [TSM] Report References
**Source**: `reports/TSM/TSM_Complete_v2.0_2026-02-10.md`

### Reference 7: NVIDIA成为TSM第一大客户 — 占比~22%
> NVIDIA单客户占比~22%, 客户集中度上升。NVIDIA从~10%(2023)→~22%(2025)成为TSM最大客户。
> NVIDIA 22%占比处于"甜蜜点"。双向依赖分析显示NVIDIA对TSM的依赖(100%制造)远大于反向依赖(22%营收)。

NVIDIA从2023年占TSM收入约10%跃升至2025年约22%，超越Apple成为最大客户。但双向依赖分析显示NVIDIA对TSM的依赖(100%制造)远大于反向依赖——NVIDIA别无选择，而TSM有越来越多的自研芯片客户(Google/Amazon/Microsoft)作为天然对冲。

### Reference 8: AI泡沫对TSM vs NVIDIA的差异化传导
> AI泡沫概率40%(Polymarket)是最大悬顶风险,但对TSM传导弱于对NVIDIA的传导(AI加速器仅占17-19% vs NVIDIA的100%)。

TSM的AI收入敞口(17-19%)远小于NVIDIA(100%)，这意味着AI周期下行对TSM的冲击远小于对NVIDIA的直接打击。TSM的"工具性"定位提供了天然的周期缓冲。

### Reference 9: 产业链位置 — NVIDIA作为CoWoS最大需求方
> CoWoS(Chip-on-Wafer-on-Substrate): 用于将GPU die与HBM堆叠封装, NVIDIA所有AI GPU(H100/B100/GB200)均使用CoWoS。月产能从2024年底约35K片扩展至2026年底目标130K片(接近4倍扩产)。

NVIDIA是CoWoS先进封装产能扩张的核心驱动力。TSMC的CoWoS扩产本质上是在为NVIDIA的GPU出货量服务——这一关系既赋予NVIDIA优先获取产能的权利，也使TSMC的先进封装CapEx回报高度依赖NVIDIA的需求持续性。

### Reference 10: TSMC客户优先级排序
> 优先级排序: #1 Apple ~25%, #2 NVIDIA ~15-21% CoWoS最高, #3 Broadcom ~11-15%, #4 AMD ~5-7%。
> N2技术接入: Apple和NVIDIA将首先获得N2产能。

NVIDIA在TSMC的先进封装(CoWoS)获得最高优先级，在N2制程接入中位居第二(仅次于Apple)。这一双优先地位源于NVIDIA的高ASP产品对TSMC收入的巨大贡献。

---

## [INTC] Report References
**Source**: `reports/INTC/INTC_Complete_v2.1_2026-02-25.md`

### Reference 11: NVIDIA入股Intel — $5B战略联盟@$23.28/股
> NVIDIA以$23.28入股~4.4%。2025.09 NVIDIA $5B投资 — 与最大竞争对手形成微妙联盟。
> 政府@$20.47 + NVIDIA@$23.28 + SoftBank@$23.00 = 合计$15.9B锚定买盘在$20-23区间。

NVIDIA投资Intel $5B是2025年最出人意料的半导体交易之一。这一投资的战略逻辑可能是: (1) 确保美国本土先进制造能力存续(地缘政治对冲); (2) 探索Intel先进封装能力(非CoWoS路径); (3) 在政治上支持CHIPS Act叙事。

### Reference 12: Intel AI加速器全面落后 — NVIDIA占94%
> NVIDIA垄断AI加速器(94%)。Gaudi 3性能差9x (Los Alamos) vs NVIDIA H200/B200。
> Intel在AI的三次失败: Nervana (2016收购→2020被取代), Habana/Gaudi (性能远落后NVIDIA), Falcon Shores (商业化取消)。

Intel在AI加速器市场经历了三次战略失败(Nervana→Gaudi→Falcon Shores取消)，市场份额不到1%。Crescent Island(2027)定位差异化推理市场，避开NVIDIA液冷训练的正面竞争，但CUDA生态锁定使新GPU从零开始建软件栈面临极高门槛。

### Reference 13: NVIDIA品牌价值超越Intel — 5倍差距
> Intel品牌价值从2001年峰值$34.7B下降到2025年估计~$18B。NVIDIA品牌价值($87.9B)已经是Intel的近5倍，这一差距是无法逆转的。

Brand Finance排名中，Intel从2023年半导体品牌#1跌至2024年被NVIDIA超越，2025年进一步下滑。这一品牌价值逆转是Intel竞争力衰退的外在表征。

### Reference 14: Fabless vs IDM模式 — NVIDIA从未自己制造
> AMD放弃制造(2009年分拆GlobalFoundries)后，股价从$2涨到$200+。NVIDIA从未自己制造，市值超过$3T。
> 纯Fabless(AMD, NVIDIA, Qualcomm): 资本轻，聚焦设计，但产能受制于TSMC。

NVIDIA的fabless模式在INTC报告中被用作Intel IDM模式的反面案例——证明"不制造"也能达到$3T市值，而Intel坚持"制造即身份"的信仰正在被市场证伪。

---

## [ARM] Report References
**Source**: `reports/ARM/ARM_Complete_v2.0_2026-02-27.md`

### Reference 15: NVIDIA Grace — 出货量最大但版税密度最低的ARM客户
> NVIDIA Grace出货是ARM服务器最大单一出货量来源(估计~3-5M/年)。估计版税: 4M chips × $22 = $88M/年。ARM从每个GB200节点仅收取$15-30版税(占节点价值0.05-0.1%)。

NVIDIA是ARM在数据中心的最大出货量客户之一(ALA授权)，但版税密度最低。每颗Grace CPU的ARM版税仅$15-30，而整个GB200节点价值$30,000-50,000——ARM版税占节点价值不到0.1%。这一"高量低价"特征限制了ARM DC版税的质量提升。

### Reference 16: ARM DC份额口径差异 — NVIDIA GB200的统计效应
> ARM官方宣称DC份额~50%，含NVIDIA GB200中Grace。AI训练节点含ARM >50%(NVIDIA: GB200=Grace+Blackwell组合)。
> 差异的核心在于NVIDIA GB200: 每台GB200超级计算节点包含一颗Grace ARM CPU + 多颗Blackwell GPU。ARM将GB200计入"ARM计算"节点——技术上正确，但这些节点99%的价值来自GPU。

ARM宣称的"50%数据中心份额"在统计口径上高度依赖NVIDIA GB200的计入方式。如果排除GPU价值仅计CPU，ARM的实际收入份额远低于50%。这一口径差异对投资者理解ARM DC增长故事至关重要。

### Reference 17: Phoenix与NVIDIA Grace的直接竞争
> Phoenix竞争定位矩阵: Phoenix vs NVIDIA Grace vs AMD EPYC vs Intel Xeon vs AWS Graviton5。
> 如果ARM是独立公司(无SoftBank): Phoenix风险 — 与客户(AWS/Google/Microsoft/NVIDIA)直接竞争 → 可能导致客户加速评估RISC-V。

ARM自研Phoenix芯片(128核, V3架构)与NVIDIA Grace形成直接竞争。SoftBank推动的Phoenix战略使ARM从"中立IP供应商"转变为"竞争对手"，可能加速ALA客户(尤其是NVIDIA)评估非ARM替代方案的动机。

---

## [AMAT] Report References
**Source**: `reports/AMAT/AMAT_Complete_v1.1_2026-02-17.md`

### Reference 18: NVDA桥梁传导链 — 50-100x放大效应
> AMAT的$1.5-2.0B先进封装设备出货，通过CoWoS产能的传导，最终支撑了NVIDIA约$93-186B的GPU收入。传导放大倍数约50-100x。
> AMAT是NVIDIA供应链中"设备密度"最高的单一供应商——其PVD/ECD/CVD/CMP/E-beam五条产品线同时参与CoWoS/HBM制造流程。

AMAT报告中构建了"NVDA桥梁"传导链: AMAT先进封装设备$1.5-2.0B → TSMC CoWoS产能30-50K wpm → NVIDIA GPU年产3.1-6.2M颗 → NVIDIA GPU收入$93-186B。这一50-100x的传导放大效应量化了AMAT在NVIDIA供应链中的战略杠杆地位。

### Reference 19: AMAT先进封装设备收入的"NVIDIA Beta"属性
> 先进封装+HBM相关收入可能占AMAT FY2026E总收入($31.17B)的9-11%——从三年前接近零增长到接近10%，这是AMAT增长叙事中最具"NVIDIA Beta"属性的部分。

AMAT的先进封装设备业务本质上是NVIDIA AI GPU出货量的上游代理变量。这一"NVIDIA Beta"属性为AMAT提供了不依赖WFE整体增长的独立增长向量。

### Reference 20: 供NVDA报告引用的DM锚点
> DM-SUPPLY-001: AMAT先进封装设备FY2026E出货~$1.5-2.0B
> DM-SUPPLY-002: AMAT $1B先进封装设备出货 ≈ 支撑30-50K wpm CoWoS等效产能
> DM-SUPPLY-003: TSMC CoWoS产能路线图: 2025E ~75K wpm → 2026E ~130K wpm → 2027E ~170K wpm
> DM-SUPPLY-005: 传导放大倍数 ~50-100x (AMAT封装设备$ → NVIDIA GPU收入$)

AMAT报告预置了供NVDA深度报告引用的6个DM锚点，涵盖先进封装设备出货量、CoWoS产能转化率、E-beam lead time和传导放大系数。

---

## [MU] Report References
**Source**: `reports/MU/MU_Complete_v1.0_2026-02-10.md`

### Reference 21: NVIDIA作为MU最大HBM客户 — >60%采购集中度
> L1集中度风险: HBM收入高度依赖NVIDIA单一客户(>60%份额)，一旦NVIDIA改变供应商策略，MU将面临巨大冲击。
> NVIDIA的AI GPU(H200/B200/GB200)是HBM最大终端需求方，单颗B200 GPU搭载192GB HBM3E。

MU的HBM收入(FY26E $8-10B)超过60%来自NVIDIA单一客户。NVIDIA对HBM供应商的认证极为严格，但一旦通过认证，订单规模巨大且具有长期合同保障。这一高集中度既是护城河(高切换成本$50-68M)也是风险(单客户依赖)。

### Reference 22: GPU带宽需求驱动HBM代际升级
> GPU算力每提升一代，对内存带宽的需求提升1.5-2x。NVIDIA H100→B200内存带宽从3.35TB/s增至8TB/s。没有HBM，GPU就是"有引擎无油箱的赛车"。

NVIDIA GPU的代际升级直接决定HBM的技术规格和出货量需求。MU在AI价值链中的定位是"L3基础设施"——提供AI计算的关键物理基础(HBM)，但技术护城河虽深却更窄，本质是制造工艺而非算法创新，不应获得与NVIDIA(L4核心创新)同等估值倍数。

### Reference 23: SK Hynix与NVIDIA深度绑定 — MU的追赶障碍
> SK海力士凭借HBM先发优势和与NVIDIA的深度绑定，在AI时代占据最有利位置。SK海力士是NVIDIA HBM的首选供应商，其HBM3E 12-Hi率先量产，技术领先美光约6-9个月。

SK Hynix与NVIDIA的深度绑定关系(供应B200/GB200超过50%的HBM)是MU在HBM市场追赶时必须突破的核心壁垒。MU虽然HBM4速度(11Gbps)已领先，但份额(21% vs SK 62%)差距仍然显著。

---

## [SEMI_EQUIPMENT] Report References
**Source**: `reports/SEMI_EQUIPMENT_COMPARATIVE/SEMI_EQUIPMENT_COMPARATIVE_Complete.md`

### Reference 24: AI需求传导链 — 从Hyperscaler到设备商的3-4层延迟
> AI需求传导的时间结构: T=0 Hyperscaler扩建决策 → T+3-6月 芯片设计商(NVDA/AMD/定制ASIC)追加投片 → T+6-12月 代工厂启动扩产下设备订单 → T+12-18月 设备公司确认收入。

NVIDIA的GPU出货量扩张通过3-4层传导链最终拉动半导体设备需求，每层引入3-6个月延迟。这意味着设备公司(ASML/LRCX/AMAT/KLAC)对NVIDIA需求变化的响应滞后12-18个月——既是缓冲(下行延迟)也是风险(上行错过)。

### Reference 25: 芯片库存状态对WFE的差异化含义
> AI GPU (NVDA/AMD): 严重紧缺, 交期>6个月, 持续拉动先进制程扩产 → 利好ASML/LRCX。
> HBM (SK/Samsung/Micron): 紧缺, 2026产能预订满, 持续拉动DRAM设备 → 利好LRCX/AMAT。

NVIDIA GPU的持续紧缺状态(交期>6个月)是驱动先进制程设备需求的核心信号。这一紧缺同时传导至HBM(NVIDIA GPU消耗大量HBM)和CoWoS(封装瓶颈)，形成对设备行业的多通道拉动效应。

---

## [AVGO] Report References
**Source**: `reports/AVGO/AVGO_analysis_20260128.md`

### Reference 26: AVGO定制ASIC vs NVIDIA通用GPU — 二阶效应受益者
> 一阶: AI投资增→买NVDA。二阶: 定制化需求增→买AVGO。三阶: 如果AVGO成功→NVDA份额下降。AVGO是二阶效应的最大受益者。
> AVGO定制ASIC vs NVIDIA通用GPU: 定制化效率优先 vs 通用性生态优先，成本低20-50%。

AVGO作为定制ASIC领导者(Google TPU/Meta MTIA)，是NVIDIA通用GPU的主要替代路径。训练时代(2020-2024)GPU主导(NVIDIA) → 推理时代(2025-2030)ASIC崛起(Broadcom)的趋势转移可能改变NVIDIA的市场份额动态。

### Reference 27: NVIDIA定制芯片反击风险
> Kill Switch: (1)AI backlog下降>20% (2)大客户流失 (3)NVDA定制芯片反击成功 (4)Google宣布2027迁移计划。
> NVIDIA GPU是替代品(80%数据中心份额)，但ASIC效率更高。

AVGO面临的一个Kill Switch风险是"NVDA定制芯片反击成功"——如果NVIDIA开发类似定制化服务(如CUDA-X定制优化)，可能侵蚀AVGO的ASIC差异化优势。

---

## [ANET] Report References
**Source**: `reports/ANET/ANET_Complete_v1.0.md`

### Reference 28: NVIDIA Spectrum-X份额逆转 — 6个月内从追平到超越7pp
> Q1 2025 ANET DC份额21.3%, NVIDIA DC份额21.1%, 差距+0.2pp。Q3 2025 ANET 19.2%, NVIDIA ~26%+, 差距>-7pp。
> NVIDIA的GPU+网络捆绑销售模式在AI集群部署中产生了"顺便买网络"效应，其增速(+647% YoY)是ANET(+29%)的22倍。

NVIDIA Spectrum-X在数据中心网络市场的崛起速度远超预期——仅6个月就从追平ANET到超越7个百分点。其核心竞争力不在芯片性能(Spectrum-4 vs Broadcom Tomahawk相当)，而在垂直整合: GPU+NIC+Switch+Software的full-stack打包。

### Reference 29: NVIDIA份额增长天花板假设
> NVIDIA的DC网络份额增长主要来自AI back-end集群的新增需求而非存量替换。当AI集群部署速度趋于稳定(2027-2028)，NVIDIA的份额增长将遇到天花板。
> 如果NVIDIA份额在25-30%见顶，ANET可以稳定在15-18%份额，在$100B+的DC网络TAM中仍有$15-18B可寻址市场。

ANET报告对NVIDIA网络份额增长提出了天花板假设: Enterprise/Campus市场NVIDIA无产品、非AI数据中心不需要GPU捆绑、运维团队偏好EOS统一管理——这些因素可能将NVIDIA网络份额限制在25-30%。

---

## [SMCI] Report References
**Source**: `reports/SMCI/SMCI_Complete_深度研究报告.md`

### Reference 30: NVIDIA采购依赖64.4% — 组装商的结构性宿命
> 采购64.4%来自NVIDIA (FY25, vs FY24 30.7%)。GPU (72× Blackwell)占BOM的70-80%, NVIDIA完全控制定价。
> NVIDIA以~75%的毛利率控制GPU的设计和定价权。当GPU到达SMCI手中时，占整台服务器BOM的70-80%已经是NVIDIA的定价——SMCI只能在剩余的10-15%增值空间内竞争。

SMCI报告揭示了GPU服务器组装商的结构性困境: NVIDIA控制70-80%的BOM定价(GPU)和3-5%的BOM(NVLink/InfiniBand)，加上HBM的寡头定价(8-12%)，SMCI的增值空间被物理性压缩至10-15%。这不是管理能力问题，而是"产业链物理定律"。

### Reference 31: SMCI收入-价值脱耦 — 增长被NVIDIA榨取
> 收入增长了6倍但价值没有增加。FY2021收入$3.56B, FY2025收入$21.97B, FY2026E指引$40B+ — 收入曲线陡峭上行；同期2年股价回报-55.84% — 价值曲线断裂式下坠。
> 增长完全真实，但经济价值被上游(NVIDIA)和竞争(Dell/HPE/ODM)彻底榨取。

SMCI是理解NVIDIA产业链定价权的最佳案例研究: 一家收入4年增长6倍的公司，股东回报为-55%。价值被NVIDIA(上游定价权)和Dell/HPE(竞争挤压)彻底榨取。这一案例量化了"距离NVIDIA越近≠投资回报越高"的反直觉命题。

---

## [VRT] Report References
**Source**: `reports/VRT/VRT_Complete_深度研究报告.md`

### Reference 32: VRT估值 — 被放在NVIDIA和Broadcom之间
> 市场给出的答案是"AI基础设施公司"——PE 46倍的定价等同于将VRT放在NVIDIA(60x)和Broadcom(40x)之间，远离Eaton(31x)和Schneider(28x)所在的传统工业品区间。

VRT的估值争议核心是身份定义: 85%收入来自传统UPS/空调，但市场以"AI基础设施"公司定价(PE 46x)。NVIDIA GB200合作和液冷CDU 70%+份额是这一叙事的支撑点。

### Reference 33: VRT与NVIDIA参考架构 — 飞轮的加速器
> NVIDIA参考架构(F节点): 这是飞轮的加速器——进入参考架构→超大规模客户默认选择→订单→安装基数→服务。但这个节点每一代GPU平台都可能"重置"(GB300/Rubin换代)。
> 如果Schneider在GB300取代VRT成为首选，飞轮的加速器将被抽走，剩下的只有VOS驱动的稳定增长——这对应30-35x PE，不是46x PE。

VRT的商业模式飞轮高度依赖NVIDIA参考架构Design-In。每一代GPU平台换代(GB200→GB300→Rubin)都是VRT地位被重置的风险窗口。NVIDIA对VRT的战略价值在于"液冷首选供应商"地位，但这一地位不是永久性的。

---

## [ETN] Report References
**Source**: `reports/ETN/ETN_Complete_深度研究报告.md`

### Reference 34: Eaton与NVIDIA 800V HVDC参考架构合作
> 2025年10月，Eaton与NVIDIA联合发布了面向下一代AI工厂的800 VDC(直流电)架构参考设计。这不仅仅是一个产品发布——它代表了数据中心电力架构从交流(AC)向直流(DC)的范式转移。
> NVIDIA同时选择Eaton和ABB作为800V HVDC的参考架构合作伙伴，形成双寡头格局。

ETN报告揭示了NVIDIA在数据中心电力基础设施领域的影响力延伸: 从GPU→网络(Spectrum-X)→散热(VRT液冷)→电力(800V HVDC参考架构)。NVIDIA正在定义整个AI工厂的技术标准，供应商(ETN/VRT/SMCI)需要被NVIDIA"选入"参考架构才能获得市场准入。

### Reference 35: GPU功耗路线图 — 从400W到3,600W
> 从A100(400W)到Rubin Ultra(3,600W)，单芯片功耗在7年内增长了9倍。NVIDIA的Kyber机架(支持Rubin Ultra NVL576)目标功耗600kW——单个机架的电力需求相当于一座容纳400-500户的中型公寓楼的全部电力消耗。

NVIDIA GPU功耗的指数级增长是ETN(电力管理)和VRT(散热)的核心增长驱动力。Rubin Ultra 3,600W/chip和Kyber 600kW/rack的功耗路线图定义了数据中心基础设施的升级路径。

---

## [KLAC] Report References
**Source**: `reports/KLAC/KLAC_Complete_v1.0_2026-02-17.md`

### Reference 36: NVDA放大系数60-240x — 从KLA检测$1到NVIDIA GPU收入
> KLA检测→TSMC CoWoS良率 4-6x → TSMC CoWoS→NVDA封装成本 3-5x → NVDA封装→终端GPU收入 5-8x → 全链放大 60-240x。
> B200单颗GPU: 检测在封装成本中占约$55-66/颗 → GPU售价$25,000-35,000 = 380-636x放大。

KLAC报告构建了从检测设备到NVIDIA终端GPU收入的完整传导放大链。60-240x的放大系数说明KLA是"关键但微小的节点"——不可替代性高(护城河)，但收入捕获率极低(占终端价值<0.5%)。这是KLA不应获得与NVIDIA同等估值倍数的核心逻辑。

### Reference 37: AI溢价估值的层级差异 — NVDA即时 vs KLA滞后
> 传导延迟2-4季度: 相比NVDA(即时)和TSMC(1-2Q)，KLA对AI需求的响应滞后。
> 定价权有限: 检测设备价格不因AI需求而上涨——客户买更多台但单台价格不变。这与NVDA的GPU溢价(因AI供不应求而提价)形成对比。

KLA报告明确了AI溢价在半导体价值链中的层级分配: NVIDIA(L3直接,极高可见度+极强定价权) > TSMC(L2制造,高可见度+强定价权) > KLA(L1间接,低可见度+中等定价权)。越远离AI终端需求，溢价越薄。

---

## [LRCX] Report References
**Source**: `reports/LRCX/LRCX_Complete_v3.0_2026-02-19.md`

### Reference 38: LRCX作为AI被动受益者 vs NVIDIA主动价值创造者
> LRCX的唯一"AI赋能者"(Sense.i)商业兑现最弱。它主要是AI的被动受益者(客户因AI增加CapEx→LRCX卖更多设备)，而非主动的AI价值创造者。对比NVDA(直接销售AI计算硬件)或ASML(EUV是AI芯片的物理瓶颈)，LRCX在AI价值链中的不可替代性较低。

LRCX报告对比了不同公司的AI定位: NVIDIA是"AI主动价值创造者"(直接销售计算硬件)，ASML是"AI物理瓶颈"(EUV光刻独家)，而LRCX是"AI被动受益者"(客户CapEx增加→卖更多设备)。这一分类框架对理解AI溢价的分配逻辑有重要参考价值。

---

## [ASML] Report References
**Source**: `reports/ASML/ASML_Complete_v1.0_2026-02-13.md`

### Reference 39: NVIDIA $130.5B营收拉动EUV需求
> NVIDIA 2025年营收$130.5B(同比增长114%)的爆发式增长，直接拉动了全球先进制程晶圆需求。据业界估算，每$1B的AI芯片营收约需要消耗价值$150-200M的先进制程晶圆产能，间接推动了对EUV设备的强劲需求。

ASML报告量化了NVIDIA营收增长对EUV设备需求的传导: $1B AI芯片营收 ≈ $150-200M先进制程晶圆产能消耗。NVIDIA $130.5B营收(2025)隐含约$20-26B的晶圆产能需求，这是ASML EUV订单的核心驱动力之一。

### Reference 40: ASML与NVIDIA的产业链相关性
> ASML vs NVDA: 相关系数0.72(最高，产业链关系)。vs AAPL 0.65, vs MSFT 0.58。
> AI泡沫预期影响: NVDA等AI芯片股价可能下跌60-80%，ASML作为上游设备商受到连带冲击。

ASML与NVIDIA在产业链上的强相关性(0.72)使其成为NVIDIA需求变化的滞后指标。ASML报告中的AI泡沫情景分析认为，如果NVIDIA股价下跌60-80%，ASML将因"AI信心崩塌→CapEx削减→EUV订单取消"的传导而受到连带冲击。

---

## Summary Statistics

| Report | NVDA References | Key Themes |
|--------|:--------------:|-----------|
| AMD | 6 | GPU竞争差距, CoWoS/HBM分配约束, 多战线竞争 |
| TSM | 4 | 客户集中度, CoWoS产能, AI泡沫传导差异 |
| INTC | 4 | 战略投资, AI加速器失败, 品牌价值逆转, IDM反面案例 |
| ARM | 3 | Grace版税经济学, DC份额统计, Phoenix竞争 |
| AMAT | 3 | 传导放大50-100x, NVIDIA Beta, DM锚点 |
| MU | 3 | HBM客户集中>60%, 带宽需求驱动, SK Hynix绑定 |
| SEMI_EQUIPMENT | 2 | 需求传导延迟, 库存紧缺信号 |
| AVGO | 2 | 定制ASIC二阶效应, 训练→推理趋势 |
| ANET | 2 | Spectrum-X份额逆转, 份额天花板假设 |
| SMCI | 2 | 64.4%采购依赖, 收入-价值脱耦 |
| VRT | 2 | 参考架构飞轮, 估值身份定义 |
| ETN | 2 | 800V HVDC合作, GPU功耗路线图 |
| KLAC | 2 | 60-240x放大系数, AI溢价层级 |
| LRCX | 1 | 被动受益者定位 |
| ASML | 2 | 营收→EUV传导, 产业链相关性 |
| **Total** | **40** | |
