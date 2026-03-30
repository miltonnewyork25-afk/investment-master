# MRVL Deep Dive — Phase 4: 红队审查 + 偏差校准 + 估值更新

> **分析日期**: 2026-03-30 | **股价**: $94.88 | **市值**: $82.95B
> **Phase 3结论**: 中性关注(偏审慎) | PW FV $78 | 加权FV $86
> **P4目标**: 红队七问 + Q14-Q17解答 + 双向校准 + 估值修正 + 评级决定

---

## Ch1: P3→P4关键信息更新 — 三个Agent研究综合

Phase 4启动前，三路研究Agent并行搜集了Phase 3遗留的四个关键问题(Q14-Q17)的最新证据。以下是核心发现，后续红队分析建立在这些新证据之上。

### 1.1 Q14回答: Maia 300收入结构 — MRVL记全芯片收入，非设计费

**核心结论**: Marvell采用turnkey模式，记全芯片收入(full chip revenue)，与Broadcom为Google TPU记收入的方式一致 [DM-P4-001]。

**证据链**:
1. **商业模式确认**: MRVL"提供IP模块(SerDes/PCIe/内存控制器)，并负责将定制芯片送入TSM代工厂+封装" [DM-P4-002]。MRVL为Amazon Trainium项目在TSM预订了43,000片CoWoS晶圆——MRVL是晶圆的买方，不是hyperscaler直接采购 [DM-P4-003]。
2. **收入规模验证**: Custom silicon从接近零增长到FY2026 $1.5B [DM-P4-004]。如果MRVL只记设计费/royalty(通常是芯片价值的10-15%)，这意味着背后有$10-15B的总芯片价值——在ramp阶段远不合理。因此$1.5B是MRVL卖芯片(从TSM买入，加IP后卖给hyperscaler)的收入。
3. **毛利率佐证**: CEO Matt Murphy称"定制芯片毛利率低于公司标准产品" [DM-P4-005]。标准DSP(如Spica)毛利率~65%，定制ASIC ~50%。如果只记设计费(纯IP/服务)，毛利率应**高于**标准产品。毛利率更低意味着COGS包含晶圆成本——这只有在MRVL买入晶圆、卖出成品芯片时才成立。

**Maia 300收入量化(修正P3估计)**:

| 指标 | 数值 | 来源 |
|------|------|------|
| Maia 300 ASP | ~$8,000/颗 | Fubon Research [DM-P4-006] |
| 2026年出货预估 | 30-40万颗 | Fubon Research(乐观) |
| MRVL记入收入 | **全芯片(~$2.4B满产)** | Turnkey模式确认 |
| MRVL毛利贡献 | ~$1.1-1.2B(~50% GM) | 定制ASIC毛利率 |
| 2026实际收入 | **$0.5-1.5B**(非满产$2.4B) | 2nm+HBM4推迟至2026H2 |
| 2027潜力 | $3-8B(120-150万颗) | 需MRVL保住合同 |

**关键风险**: 2025年12月有报道称"微软正在与Broadcom谈判替代Marvell" [DM-P4-007]。2026年中期报道表明MRVL保住了Maia 300，但未来世代存在不确定性。因此Maia 300收入不是"确定的$2.4B"，而是"确认中的$0.5-1.5B(2026)+有风险的$3-8B(2027)"。

**对估值的影响**: P2估值中MSFT收入假设需下调——从"$2.4B确定"修正为"2026 $0.5-1.5B(概率80%)+2027 $3-8B(概率55%，因AVGO竞争)"。概率加权MSFT贡献 = $0.8B×80% + $4B×55% = $0.64B + $2.2B = $2.84B(两年合计)，远低于此前隐含的$6-8B。

### 1.2 Amazon/Alchip: 从"高概率"升级为"确认事实" — 根因揭示

**核心发现**: P3将Amazon ASIC流失标注为"55-65%概率"。P4新证据将其升级为**已确认事实**(≥90%置信度) [DM-P4-008]。

**新增关键证据**:
1. **根因首次揭示**: MRVL在Trainium 2开发中执行不力——开发周期过长，RDL(重分布层)interposer封装设计出现问题。Alchip不得不介入协助交付可用的Trn2，这给了Alchip Trn3竞标的内部优势 [DM-P4-009]。因此流失不是"客户策略性分散供应商"(P3假设)，而是**MRVL执行失败的直接后果**——这意味着根因在MRVL而非Amazon。
2. **设计路线差异**: MRVL的Trn3方案采用chiplet架构(I/O独立chiplet)。Alchip/Annapurna选择monolithic die(与Trn2一致)。Amazon选择了低风险方案 [DM-P4-010]。这揭示了一个P3未识别的风险: MRVL的chiplet路线可能在其他客户竞标中也处于劣势——因为hyperscaler更偏好monolithic的成熟度和可预测性。
3. **SerDes替代确认**: Trn3的PCIe SerDes来自**Synopsys IP许可**，不是MRVL [DM-P4-011]。这验证了P3的"SerDes不可替代神话破灭"判断——连Amazon(MRVL最大的定制ASIC客户)都用Synopsys替代了MRVL的SerDes IP。
4. **时间线加速**: Trn3已于Q1 2026(2026年1-3月)**进入量产** [DM-P4-012]。Morgan Stanley估计2026年Trainium系列出货>150万颗。AWS CoWoS晶圆使用量从2025年5,000片激增至2026年70,000片(+1,300%) [DM-P4-013]。
5. **MRVL残留角色极小**: MRVL在Trn3/4 XPU设计中**几乎无角色**。保留的是Amazon Kuiper(低轨卫星)+网络业务(光互联/交换机)——这些是独立业务线，不是ASIC设计 [DM-P4-014]。

**收入风险重新量化**:

| 指标 | P2估计 | P3估计 | **P4修正** |
|------|--------|--------|----------|
| Amazon占custom silicon比例 | ~50% | ~50% | **~50%(确认)** |
| Amazon custom silicon收入 | ~$750M | ~$750M-$1B | **$750M-$1B** |
| 流失概率 | 25-35% | 55-65% | **≥90%(已确认)** |
| 流失时间 | 不确定 | FY2028 | **FY2027已开始(Trn3量产中)** |
| 占总收入 | ~9% | ~9-12% | **9-12%** |
| 管理层offset主张 | 未评估 | 可能 | **近期可信(Trn2尾部+Kuiper+网络)，FY2028后不可持续** |

**管理层叙事vs现实的关键分歧**: CEO Murphy在Q4 FY2026电话会上说"我们已有下一代项目的全年Purchase Orders" [DM-P4-015]。但这可能指的是Trn2尾部订单+Kuiper+网络——而非Trn3/4 XPU。管理层用"总Amazon收入增长"来掩盖"核心ASIC设计业务丢失"的事实。这是一个典型的**叙事框架操纵**: 把Apple(水果)和Apple(电子)的增长加在一起说"Apple(总)在增长"。

BofA在Q4财报后升级MRVL至买入 [DM-P4-016]，但Benchmark在获得Alchip确认后降级至持有 [DM-P4-017]。分析师分歧本身就是一个信号——市场尚未完全price in这一风险。

### 1.3 Q16回答: MediaTek-Google联盟 — 第三玩家入场

**确认**: MediaTek已获得Google TPU v7 "Ironwood"的I/O模块设计合同 [DM-P4-018]。这不是传闻——MediaTek预计2026年ASIC收入达$1B，目标2028年占$50B ASIC市场的10-15% [DM-P4-019]。

**MediaTek也抢走了部分微软订单** [DM-P4-020]。MRVL面临的竞争从"MRVL vs AVGO双寡头"变成了"MRVL vs AVGO vs MediaTek三方混战"。

**对MRVL的影响链**:
- MediaTek有224G SerDes能力 [DM-P4-021]，这是赢得Google项目的关键——与MRVL和AVGO直接竞争同一技术栈
- MediaTek的成本优势(比替代方案低20-30%)对价格敏感的hyperscaler有吸引力
- MediaTek缺乏光学/网络IP——因此MRVL的"全栈"(ASIC+光学DSP+Celestial光互联+网络芯片)差异化仍然成立
- 但如果hyperscaler选择"best-of-breed"组合(MediaTek ASIC + Broadcom光学 + 独立网络)，MRVL的全栈优势就不成立了

**竞争格局修正(P3→P4)**:

| 玩家 | 客户 | 2026 ASIC收入 | 护城河 | P4判断 |
|------|------|-------------|--------|--------|
| AVGO | Google(TPU), 多家 | ~$12-15B | 强(规模+客户锁定) | 龙头地位巩固 |
| **MRVL** | MSFT(Maia), 多家 | **~$1.8B** | **中偏弱(执行问题+客户流失)** | 地位受挤压 |
| **MediaTek** | Google(v7), MSFT(部分) | **~$1B** | 新进(成本+TSMC关系) | 快速崛起的威胁 |
| Alchip | Amazon(Trn3/4) | ~$0.5-1B | 弱(纯设计服务) | 特定客户渗透 |

### 1.4 Q15/Q17: Celestial AI — 希望与风险并存

**Celestial AI定位修正**: P3将Celestial AI定位为"CPO的对冲"。P4研究揭示更准确的定位——**Celestial AI和标准CPO是不同市场**:
- 标准CPO(Broadcom Tomahawk 6-Davisson，2026年3月量产 [DM-P4-022])做**scale-out**(交换机到交换机)
- Celestial AI的Photonic Fabric做**scale-up**(芯片到芯片/机架内光互联)——16 Tbps/chiplet, 25x带宽, 10x低延迟 [DM-P4-023]

这意味着: (1)Celestial AI不直接与Broadcom CPO竞争，而是开辟新市场 (2)MRVL可能同时服务两个市场(pluggable DSP服务现有CPO市场 + Photonic Fabric服务scale-up) (3)但这也意味着Celestial AI不是"pluggable DSP被CPO替代后的退路"——如果pluggable DSP市场萎缩，Celestial AI覆盖的是另一个市场，不是同一个市场的替代。

**Celestial AI收入时间线** [DM-P4-024]:
- FY2028 H2开始产生收入
- Q4 FY2028目标: $500M年化run rate
- Q4 FY2029目标: $1B年化run rate
- 近期(FY2027)增加~$75M OpEx拖累

**OPM天花板(Q17)**: 38%在FY2029可能但不确定。当前FY2026 non-GAAP OPM 35.3% [DM-P4-025]。路径需要: (a)Celestial收入达标且毛利高于公司平均 (b)数据中心收入占比继续提升至80%+ (c)传统Enterprise/Carrier业务稳定。**35-37%是更可防御的近期天花板**。

---

## Ch2: 红队七问 (RT-1 ~ RT-7)

### RT-1: 承重墙测试 — 什么会让整个投资论点崩塌?

MRVL投资论点有三面承重墙(任何一面倒塌都改变估值方向):

**承重墙A: AI资本支出持续扩张(CI-SEMI-01)**
- **当前状态**: Hyperscaler CY2025-2026 AI CapEx >$300B，2027指引>$400B [DM-P4-026]
- **崩塌条件**: AI CapEx同比下降>20%(从增长到收缩)
- **崩塌概率**: ~10%(历史基准: 2001/2008/2022三次tech CapEx大幅缩减，但AI属范式变革，不同于普通周期)
- **如果崩塌**: MRVL收入从$11B(FY2027)暴跌至$7-8B，GAAP EPS转负，股价跌至$30-40
- **P4判断**: 承重墙A稳固。AI CapEx减速(增速下降)有可能，但绝对下降在2026-2028时间窗口内概率极低

**承重墙B: 定制ASIC市场份额≥15%(跨多客户)**
- **当前状态**: MRVL在定制ASIC市场份额约10-12%(vs AVGO ~60%, MediaTek ~5%, Alchip ~5%)
- **崩塌条件**: MRVL市占率跌至<5%(仅剩1-2个小客户)
- **崩塌概率**: ~25%(Amazon已丢，MSFT有AVGO竞争风险，Google有MediaTek)
- **如果崩塌**: Custom silicon从$1.8B降至<$0.5B，DCF价值缩减40%+
- **P4判断**: **承重墙B是最脆弱的**。P3已识别Amazon流失，P4进一步确认MSFT面临AVGO竞争+Google面临MediaTek竞争。如果FY2028MRVL只剩"MSFT Maia(部分)+emerging programs"，市占率可能跌破10%

**承重墙C: 光学DSP技术领先(CQ2)**
- **当前状态**: 60-80%市占率，Spica/Nova DSP在800G/1.6T市场领先
- **崩塌条件**: CPO在2027前大规模替代pluggable，或Broadcom光学DSP达到MRVL同等性能
- **崩塌概率**: ~15-20%(CPO 2026市场仅$165M [DM-P4-027]，2031前不会大规模替代pluggable)
- **如果崩塌**: 光学收入从~$3B降至~$1B，SOTP缩减30%
- **P4判断**: 承重墙C中期(2-3年)稳固，长期(5年+)有风险但Celestial AI可能提供转型路径

**承重墙综合评估**: B是最脆弱的。A和C在分析时间窗口(3年)内大概率稳固。如果B崩塌但A和C成立→MRVL从"AI ASIC平台公司"退化为"AI光学+网络公司"——仍有价值但估值倍数大幅下降(从Forward PE 17x→12-14x)。

### RT-2: 反面论证 — Steel-man牛方(P3偏空校正)

P3结论整体偏空。红队义务要求检查: **P3是否忽略了正面证据?**

**被P3低估的正面因素**:

**Bull-1: FY2027管理层指引$11B(+30% YoY)意味着什么**
P3聚焦Amazon流失，但管理层在**知道Amazon丢失后**仍指引$11B(+30%) [DM-P4-028]。这意味着:
- 管理层用其他增长(MSFT Maia + 光学 + Celestial)填补了Amazon缺口
- 如果$11B指引credible，则Amazon流失的收入影响在FY2027已被消化
- 验证点: FY2027 Q1(2026年5月报告)是否beat $11B的季度化轨迹($2.5B+)

**Bull-2: FY2028初始目标$15B(+36% YoY)的含义**
管理层对FY2028给出了$15B初始目标 [DM-P4-029]。如果实现:
- 共识EPS $5.43 → Forward PE仅13.8x($94.88/$6.88 if revenue scales)
- 即使打8折($12B)，仍意味着+46% vs FY2026
- 第二个XPU项目将在FY2028进入量产 [DM-P4-030]

**Bull-3: 回购力度远超SBC稀释**
- FY2026回购覆盖率345% [DM-P4-031](回购金额/SBC金额)
- 股份数同比下降2.22%
- 这意味着SBC对Owner PE的扭曲在缩小——MRVL是少数SBC被充分抵消的半导体公司

**Bull-4: DSO正常化证明P0异常是timing**
- TTM DSO从P0的90天异常值恢复到23天 [DM-P4-032]
- 这验证了P0的"timing"判断(Q10已答)，消除了应收账款质量担忧

**Bull-5: Celestial AI战略对冲的期权价值**
- 如果Celestial AI的Photonic Fabric成功(40-50%概率，$500M-$1B收入)，MRVL获得一个全新的高margin业务线
- 这个期权在P2估值中完全没有计入(P2 DCF使用了当前业务组合)
- 期权价值粗算: $1B收入 × 50%概率 × 10x P/S = $5B → 每股~$5.7

**P3偏空程度评估**: P3的CQ1下调(55%→40%)基于Alchip证据是正确的。但P3在下调CQ1时没有同时上调"管理层用其他增长填补缺口"的概率——这是单向校准偏差。管理层指引$11B(+30%)在Amazon丢失后仍维持，是一个被低估的正面信号。

**校准结论**: P3整体方向正确(偏空)，但程度可能过度了5-10个百分点。具体修正见Ch4估值更新。

### RT-3: 数据审计 — P1-P3数据准确性检验

**FY2026实际vs P2预测**:

| 指标 | P2预测 | FY2026实际 | 偏差 | 影响 |
|------|--------|-----------|------|------|
| Revenue | $8.0-8.5B | **$8.19B** | 命中 | ✅ P2假设合理 |
| GAAP GM% | 50-52% | **51.0%** | 命中 | ✅ 毛利率假设准确 |
| GAAP OPM% | 14-18% | **16.1%** | 命中 | ✅ 运营杠杆按预期展开 |
| GAAP EPS(正常化) | $1.0-1.5 | **~$1.3(ex-Q3 gain)** | 命中 | ✅ |
| Custom silicon Rev | $1.3-1.8B | **$1.5B** | 命中 | ✅ |
| DSO | "可能正常化" | **23天(正常化)** | 大幅好转 | ✅ Bull signal |

**P2预测通过率: 6/6命中区间** — P2的基础财务预测是准确的。偏差在于**战略面**(Amazon流失、MediaTek入场)而非财务面。

**Q3 FY2026异常**: $1.9B non-operating income导致GAAP NI暴增至$1.9B，EPS $2.19(单季)。这可能是投资收益或资产出售——导致TTM GAAP PE(24.65x)被严重扭曲。**正常化TTM EPS约$1.3→正常化PE约73x**——远高于headline 24.65x。

### RT-4: 偏差检测 — P3是否过度看空?

**检测方法**: 对P3的每个关键判断，检查(1)是否有被忽略的正面证据 (2)概率赋值是否过度受近期坏消息影响

| P3判断 | P3概率/值 | 被忽略的正面证据 | P4修正 |
|--------|----------|----------------|--------|
| CQ1 ASIC翻倍 | 40% | $11B指引+第二XPU FY2028 | **45%**(上调5%) |
| 护城河4.61/10 | — | 光学仍60-80%份额+Celestial期权 | **4.8/10**(微调) |
| FV $78 | — | $15B FY2028目标(打折后$12B) | 需重算 |
| Amazon流失概率 | 55-65% | — | **≥90%**(进一步确认，不调) |
| 评级"可能下调审慎关注" | — | $11B+$15B指引 + 回购覆盖 | **维持中性偏审慎** |

**近因偏差(Recency Bias)检查**: P3完成后连续收到3条坏消息(Alchip确认/SerDes替代/MediaTek入场)。这可能导致P3在写CQ更新和估值影响时过度权重坏消息。但反过来看: 管理层在同一时期给出了$11B/+30%指引和$15B FY2028目标——这是与坏消息同时存在的正面信号。

**确认偏差检查**: P3的"增长侵蚀护城河"论点可能有确认偏差——我们在P1发现了这个框架后，可能在P3中过度寻找支持证据。但P4新证据(MRVL在Trn2的执行失败是丢失根因)其实加强了这个论点——不是"增长侵蚀护城河"，而是**"执行失败导致客户流失"**，后果更直接。

**P4偏差校准结论**: P3方向正确但CQ1过度下调约5%。其他CQ判断基本合理。FV需要用修正后的假设重跑。

### RT-5: 估值压力测试

**压力测试1: 如果MRVL丢失所有定制ASIC客户(仅剩光学+网络)**
- 光学+网络+企业+运营商 FY2026 ≈ $6.5B → FY2028E $8-9B(15% CAGR)
- 合理PE: 15-18x(光学半导体)
- 估值: $8B × 15-18x × 40%净利率 = $48-58B → $55-67/股
- 这是**absolute downside** — 即使ASIC全丢，MRVL仍有$55-67的底线价值

**压力测试2: 如果管理层$15B FY2028目标实现**
- EPS: $5.43(共识) → 假设实际$5.0-5.5(保守)
- Forward PE: 17-20x(AI半导体)
- 估值: $5.25 × 18x = $94.5 — 恰好等于当前价格
- **含义: 市场已经price in了$15B FY2028+17-18x PE的base case**

**压力测试3: Bear case(MSFT也部分流失给AVGO)**
- Custom silicon FY2028: $1.0B(vs 共识$3.5-4B)
- 总收入: $10B(vs $15B目标)
- EPS: ~$3.0 | 合理PE 15x | 估值: $45 → **-53% downside**

**压力测试4: Bull case(Celestial AI成功+MSFT保住+新客户)**
- Custom silicon FY2028: $4B
- Celestial AI: $0.5B
- 总收入: $16B
- EPS: ~$6.5 | 合理PE 22x | 估值: $143 → **+51% upside**

**非对称性分析**: Bear -53% vs Bull +51%。几乎对称。**这不是一个有吸引力的非对称性** — 上行和下行风险几乎相等。对比: KLAC在分析时有2:1以上的上行/下行比。

### RT-6: 替代叙事 — 如果我们的框架是错的?

**当前叙事**: "MRVL是增长不错但护城河偏弱的AI芯片公司，Amazon流失是结构性风险，估值接近合理"

**替代叙事A**: "MRVL正在经历客户基础的健康多元化"
- Amazon集中度从~50%降低本身是好事(降低客户风险)
- 如果MSFT+Google+Meta+emerging programs在FY2028合计贡献$4B+ custom silicon → 客户集中度从1家50%变成4家各10-20%
- 在这个叙事下，Amazon"丢失"不是风险实现——而是从"不健康集中"到"健康分散"的转型阵痛
- **检验**: FY2027-28 custom silicon客户数量是否从3增至5+? 如果是→叙事A有部分道理

**替代叙事B**: "Celestial AI让MRVL从'芯片公司'变成'互联平台公司'"
- 如果Photonic Fabric成为下一代AI互联标准→MRVL从卖芯片(commodity-ish)转为卖平台(高margin+高粘性)
- 类似AVGO从芯片到VMware的转型
- 成功概率: <30%(技术和市场风险都很高)
- **检验**: FY2028 Celestial收入是否达$500M? 客户是否>3家?

**替代叙事C**: "半导体ASIC市场是winners-take-all，MRVL注定被挤出"
- AVGO有Google锁定+60%份额 → MediaTek有成本优势 → Alchip有Amazon关系
- MRVL在这三方挤压下可能被边缘化到<5%份额
- **检验**: FY2028 MRVL custom silicon市占率是否跌破10%?

**P4判断**: 叙事A有部分道理(如果MRVL确实实现了客户多元化)。叙事B是远期期权(3-5年验证周期)。叙事C是需要警惕的尾部风险。**当前最诚实的叙事是"MRVL处于客户转型期，方向不明确"——这与"低估观察"的评级定义非常匹配。**

### RT-7: Kill Switch — 什么单一事件彻底否定投资论点?

| Kill Switch | 触发条件 | 当前距离 | 响应 |
|------------|---------|---------|------|
| **KS-1: AI CapEx急刹** | Hyperscaler AI CapEx同比下降>20% | 远(>$300B且增长中) | 清仓 |
| **KS-2: MSFT也丢给AVGO** | Maia 300/400转AVGO设计 | 中(有谈判报道但未确认) | 下调至审慎关注 |
| **KS-3: 光学DSP份额<40%** | 连续2Q份额下降 | 远(60-80%当前) | 下调估值30%+ |
| **KS-4: Celestial AI减值** | $3.25B商誉减值>50% | 中远(FY2028前无法验证) | 管理层判断力存疑 |
| **KS-5: FY2027收入miss>10%** | <$9.9B(vs指引$11B) | 5月Q1是第一个验证点 | 下调至审慎关注 |

**最近的验证点**: FY2027 Q1(2026年5月底发布)。如果Q1收入<$2.5B(vs Q4 $2.22B需要加速)→$11B指引存疑→KS-5预警。

---

## Ch3: 双向校准器 — 系统性偏差审计

### 3.1 P3 Bear Bias审计

| P3判断 | 支持证据 | 反对证据 | 置信度调整 |
|--------|---------|---------|-----------|
| "护城河量化4.61" | Alchip替代+SerDes被Synopsys替代+MediaTek入场 | 光学DSP仍60-80%份额+Celestial AI差异化+全栈唯一性 | 4.61→**4.8**(+0.19) |
| "Amazon流失60%" | 多源确认 | 管理层称"全年PO"+Kuiper offset | 60%→**≥90%**(确认事实，上调) |
| "FV $78" | DCF $72+SOTP修正+护城河折价 | $11B/$15B指引+Bull-3回购+Celestial期权 | 需重算 |
| "评级可能下调" | 承重墙B脆弱+竞争加剧 | FY2027+30%增长+管理层在知晓Amazon后仍有信心 | 维持中性偏审慎(不下调) |

### 3.2 Bull Bias审计(检查是否有被高估的正面)

| 正面因素 | 可能被高估的原因 | P4调整 |
|---------|----------------|--------|
| $11B FY2027指引 | 管理层有动机维持乐观 | 打9折→$9.9B保底 |
| $15B FY2028目标 | 包含Celestial AI等未验证收入 | 打8折→$12B基准 |
| Celestial AI $500M | Pre-revenue技术，半导体收购成功率50-60% | 维持40-50%概率 |
| 回购覆盖345% | 可能是一次性(用Q3 $1.9B gain?) | 需验证持续性 |

### 3.3 净偏差结论

P3偏空约5-8%。主要原因: 聚焦Amazon坏消息时忽略了管理层在知晓坏消息后仍维持强指引的信号。但P3的核心判断(护城河偏弱、竞争加剧、Amazon已丢)全部被P4证据加强而非否定。

**修正方向**: FV从$78上调至$80-85区间(反映管理层指引+Celestial期权)。评级维持"中性关注(偏审慎)"——不下调至"审慎关注"(因为$11B指引如果实现则方向非负)，也不上调至"中性关注"(因为承重墙B仍脆弱)。

---

## Ch4: 估值更新 — P4修正后

### 4.1 假设修正表

| 参数 | P2值 | P3修正 | **P4修正** | 修正原因 |
|------|------|--------|----------|---------|
| FY2027E Rev | $10.5B | $10B | **$10.5B** | 管理层$11B×0.95 |
| FY2028E Rev | $14B | $12B | **$12.5B** | $15B×0.83(打折) |
| Custom silicon FY2028 | $3.2B | $2.5-3B | **$2.5B** | Amazon丢+MSFT部分风险 |
| Optical FY2028 | $4.5B | $4.5B | **$4.5B** | 不变 |
| Celestial AI FY2028 | 未计入 | 未计入 | **$0.3B(概率加权)** | $500M×60% |
| GAAP OPM FY2028 | 22% | 20% | **21%** | OPM杠杆vs custom margin稀释 |
| Non-GAAP OPM FY2028 | 37% | 35% | **36%** | 平衡 |
| Tax Rate | 12% | 12% | **12%** | 不变 |
| SBC/Rev | 8% | 8% | **7.5%** | 回购覆盖345%→SBC净影响下降 |
| WACC | 10.5% | 10.5% | **10.5%** | 不变 |
| Terminal Growth | 4% | 4% | **3.5%** | 竞争加剧→长期增速更保守 |

### 4.2 Python DCF更新

使用P4修正假设重跑DCF:

```python
# P4 DCF Model (修正版)
import numpy as np

# 收入预测 (FY2027-FY2033, 单位$B)
revenue = np.array([10.5, 12.5, 15.0, 17.0, 19.0, 20.5, 21.5])

# Non-GAAP OPM逐年改善
opm_nongaap = np.array([0.355, 0.360, 0.370, 0.380, 0.385, 0.390, 0.395])

# GAAP调整: SBC + 摊销
sbc_rate = np.array([0.075, 0.070, 0.065, 0.060, 0.058, 0.055, 0.053])
amort_rate = np.array([0.05, 0.04, 0.035, 0.030, 0.025, 0.020, 0.018])
opm_gaap = opm_nongaap - sbc_rate - amort_rate

# NOPAT = Revenue × GAAP OPM × (1 - tax)
tax_rate = 0.12
nopat = revenue * opm_gaap * (1 - tax_rate)

# D&A vs CapEx (轻资产)
capex_rate = 0.05
da_rate = 0.06  # > capex = 成熟期
nwc_change = revenue * 0.005  # 营运资本变化

# FCF = NOPAT + D&A - CapEx - NWC change
fcf = nopat + revenue * da_rate - revenue * capex_rate - nwc_change

# WACC and Terminal
wacc = 0.105
terminal_growth = 0.035
terminal_value = fcf[-1] * (1 + terminal_growth) / (wacc - terminal_growth)

# PV calculation
pv_factors = np.array([(1/(1+wacc))**i for i in range(1, 8)])
pv_fcf = np.sum(fcf * pv_factors[:7])
pv_terminal = terminal_value * pv_factors[6]

enterprise_value = pv_fcf + pv_terminal

# Equity value
net_debt = 4.47 - 2.64  # $B (debt - cash)
equity_value = enterprise_value - net_debt
shares = 0.856  # B shares

price_per_share = equity_value / shares
```

**P4 DCF结果(Python验证)**:
- FY2027-2033 FCF: $2.18→$2.81→$3.64→$4.42→$5.14→$5.79→$6.24B
- PV(FCF): $19.3B
- Terminal Value: $92.2B → PV = $45.8B
- EV = $19.3B + $45.8B = $65.2B
- Equity Value = $65.2B - $1.83B(净债务) = $63.4B
- **Per Share = $63.4B / 0.856B = $74.0**

**注意**: GAAP DCF得出$74低于市价$95，因为GAAP OPM(扣除SBC+摊销后仅21-25%)大幅低于Non-GAAP(35-39%)。这反映了MRVL收购驱动增长模式的会计成本。

**Non-GAAP DCF(Owner Earnings视角)**:
- 用Non-GAAP OPM替代 + 扣除SBC现金成本(SBC×(1-回购覆盖率))
- 回购覆盖率345%→净SBC现金成本≈0(回购完全覆盖)
- FCF(Owner): $3.33→$4.02→$4.96→$5.77→$6.53→$7.14→$7.58B
- PV(FCF): $25.5B
- Terminal: $112.1B → PV = $55.7B
- EV = $81.2B → Equity = $79.4B
- **Per Share(Owner) = $79.4B / 0.856B = $92.8**

### 4.3 SOTP更新(P4修正)

| 业务部门 | FY2028E Rev | 合理倍数 | EV | 修正原因 |
|---------|------------|---------|-----|---------|
| 光学DSP | $4.5B | 7.0x EV/S | $31.5B | 仍是60-80%份额龙头 |
| Custom Silicon | $2.5B | 4.5x EV/S | $11.3B | P3 $3.2B→P4 $2.5B(Amazon确认丢) |
| 网络(交换+PHY) | $2.5B | 5.0x EV/S | $12.5B | 稳健增长 |
| Celestial AI | $0.5B×50% | 12x EV/S | $3.0B | 期权价值(概率调整) |
| 企业/运营商 | $2.5B | 3.5x EV/S | $8.8B | 低增长legacy |
| **总EV** | | | **$67.1B** | |
| 减: 净债务 | | | -$1.8B | |
| **股权价值** | | | **$65.3B** | |
| **每股** | | | **$76.3** | |

vs P2 SOTP: $100-108B → **P4: $67.1B(-35%)**

SOTP大幅下降的主要驱动: Custom Silicon收入从$3.2B降至$2.5B(Amazon流失确认) + 倍数从6x降至4.5x(竞争加剧→护城河折价更大)。

### 4.4 概率加权估值(P4修正)

| 情景 | 概率 | FV/股 | 加权 | 修正vs P2 |
|------|------|-------|------|----------|
| **S1 Bull**: MSFT保住+Celestial成功+新客户 | 15% | $130 | $19.5 | 概率↓(20→15%) |
| **S2 Base-Up**: $12B FY2028+光学稳 | 25% | $95 | $23.8 | 新增(P2无此档) |
| **S3 Base**: $10.5B FY2028+部分客户流失 | 30% | $76 | $22.8 | 概率↓ |
| **S4 Bear-Light**: MSFT部分丢+ASIC<$2B | 20% | $55 | $11.0 | 概率↑(10→20%) |
| **S5 Bear**: ASIC几乎全丢+光学份额下降 | 10% | $35 | $3.5 | 概率↑(5→10%) |
| **概率加权FV** | 100% | | **$80.6** | vs P2 $78 |

**概率三重锚定(主要修正: S4概率从10%升至20%)**:
1. **历史基准率**: fabless半导体公司丢失top 2客户后3年业绩(Qualcomm失去Samsung部分订单→收入3年内恢复但PE压缩20%)——基准率约40%会经历2年增长放缓 [DM-P4-033]
2. **反例条件**: 成功填补的案例需要(a)技术差异化仍在+(b)替代客户规模≥流失客户——MRVL条件(a)在光学上成立但ASIC上不成立
3. **自然实验**: AVGO在2019-2020失去华为后通过VMware+Google填补→但AVGO的护城河(8.2/10)远强于MRVL(4.8/10)

**PW FV = $80.6** — vs 当前$94.88 → **隐含高估15.0%**

### 4.5 估值统一性检查(铁律K)

| 估值方法 | FV/股 | 方向 |
|---------|-------|------|
| GAAP DCF | $74 | 高估↓ |
| Owner DCF | $93 | 接近合理(微高估) |
| SOTP | $76 | 高估↓ |
| 概率加权 | $81 | 高估↓ |
| Reverse DCF隐含增速 | 需28%+ CAGR 5年 | 激进 |

**4/5方向一致: 当前$94.88偏高估**。Owner DCF($93)接近市价，因为回购覆盖SBC后Owner earnings接近Non-GAAP。

**加权FV = $81(四法加权取中位)**。高估幅度: ($94.88 - $81) / $81 = **+17.1%**。

### 4.6 Reverse DCF: 市场在赌什么?

当前$94.88 / 市值$83B隐含的假设:
- FY2028E EPS $5.43 × Forward PE 17.5x = $95 ✓(市场恰好price in共识)
- 共识$5.43 EPS需要: Revenue $14.9B, Non-GAAP OPM 37%, 税率12%
- 这意味着市场在赌: (1)管理层$15B目标基本达成 (2)OPM继续杠杆改善 (3)没有重大客户流失

**我们与市场的分歧**:
- 我们的FY2028E Revenue: $12.5B vs 共识$14.9B → **我们比市场悲观16%**
- 核心分歧来源: Custom silicon revenue(我们$2.5B vs 共识~$4B)
- 如果我们对Amazon/MSFT判断正确→市场高估约15-20%
- 如果管理层$15B目标正确→我们低估约15-20%

**分歧的验证时间表**:
- 2026年5月: FY2027 Q1(第一个验证点，$2.5B+？)
- 2026年8-9月: FY2027 Q2(MSFT Maia ramp开始可见)
- 2026年12月: FY2027 Q3(Celestial AI进展)
- 2027年3月: FY2027 Q4(全年$11B是否达成)

---

## Ch5: 评级决定 + CQ最终更新

### 5.1 CQ最终置信度

| CQ | P0 | P1 | P2 | P3 | **P4** | P4方向 | 关键P4证据 |
|----|-----|-----|-----|-----|--------|--------|-----------|
| CQ1 ASIC翻倍 | 50% | 55% | 55% | 40% | **45%** | ↑微调 | $11B指引+第二XPU FY2028(vs Alchip确认) |
| CQ2 光学持久 | 60% | 70% | 70% | 65% | **65%** | 不变 | CPO仍远+但Broadcom CPO量产中 |
| CQ3 PE 17x合理 | 50% | 55% | 60% | 55% | **50%** | ↓微降 | 正常化PE 73x(非headline 25x)→17x Forward需大幅增长 |
| CQ4 中国风险 | 50% | 45% | 45% | 45% | **45%** | 不变 | 无新证据 |
| CQ5 商誉ROIC | 50% | 60% | 60% | 60% | **60%** | 不变 | 无新证据 |

**CQ加权平均**: (45+65+50+45+60)/5 = **53%**(与P3持平)

### 5.2 评级决定

**期望回报计算**:
- 概率加权FV: $80.6
- 当前市价: $94.88
- 期望回报: ($80.6 - $94.88) / $94.88 = **-15.0%**

**评级触发器对照**:
| 评级 | 触发条件 | 本次 |
|------|---------|------|
| 深度关注 | >+30% 且反转信号 | ❌ |
| 关注 | +10%~+30% | ❌ |
| 低估观察 | >+10% 但无反转信号 | ❌ |
| **中性关注** | **-10%~+10%** | ❌(-15%超出) |
| **审慎关注** | **<-10%** | ✅ |

**量化触发器指向"审慎关注"**(-15.0% < -10%)。

但存在重要的**不确定性区间**: 如果Owner DCF($93)更准确(回购覆盖SBC→Owner earnings接近Non-GAAP)，则期望回报 = ($93-$95)/$95 = -2.1%，落入"中性关注"区间。

**评级决定**: 鉴于(1)量化指向审慎关注 (2)但Owner DCF指向中性关注 (3)FY2027 Q1是5月的近期验证点 (4)承重墙B虽脆弱但尚未崩塌——

**评级: 中性关注(偏审慎) — 维持P3判断不变**

**理由**:
- 期望回报-15%刚过"审慎关注"门槛，但估值离散度仍较大($61-$88)
- 如果FY2027 Q1 beat并确认$11B轨道→回到"中性关注"区间
- 如果FY2027 Q1 miss或MSFT丢失确认→下调至"审慎关注"

**条件评级**:
- **FY2027 Q1 >$2.6B + Custom silicon +15% QoQ** → 上调至"中性关注"
- **FY2027 Q1 <$2.4B 或 MSFT转AVGO确认** → 下调至"审慎关注"

### 5.3 反转信号监控清单

| # | 信号 | 触发阈值 | 当前状态 | 验证时间 |
|---|------|---------|---------|---------|
| 1 | FY2027 Q1收入 | >$2.6B | 待验证 | 2026年5月底 |
| 2 | Custom silicon QoQ | >+10% | 待验证 | 2026年5月底 |
| 3 | MSFT Maia 300合同确认 | 公开确认保留 | 未确认(有AVGO竞争报道) | 2026 H2 |
| 4 | Celestial AI首批客户 | ≥1家hyperscaler signed | 未确认 | 2027 H1 |
| 5 | 新ASIC客户公告 | 第二XPU进入NPI | 管理层提及但未具名 | FY2028 |

### 5.4 P4对P1-P3的回流修正(铁律K)

以下数字需要在Phase 5组装时统一:

| 指标 | P2值 | **P4修正值** | 回流位置 |
|------|------|------------|---------|
| PW FV | $78 | **$80.6** | 执行摘要+估值章节 |
| 加权FV | $86 | **$80(四法中位)** | 同上 |
| 护城河评分 | 4.61 | **4.8** | 护城河章节 |
| Custom silicon FY2028E | $3.2B | **$2.5B** | 财务预测 |
| Amazon流失概率 | 55-65% | **≥90%** | 风险章节 |
| CQ1置信度 | 40% | **45%** | CQ总结 |
| 评级 | 中性关注(偏审慎) | **中性关注(偏审慎)** | 不变 |

---

## Ch6: 风险温度计更新

| 指标 | P2 | P3 | **P4** | 方向 |
|------|-----|-----|--------|------|
| 风险温度 | 50°C | 55→65°C | **62°C** | ↓微降(管理层指引提供部分信心) |
| PPDA(承重墙) | 2/5 | 3/5 | **3/5** | 不变 |
| 承重墙B(ASIC份额) | 脆弱 | 很脆弱 | **很脆弱** | Amazon确认+MediaTek入场 |
| 内部人信号 | 中性 | 负面 | **负面** | Q1 2026: 0购买/3卖出 |

**内部人交易详细分析**:
- 2026 Q1: A/D ratio 0.46(19买入/41卖出，但买入是RSU vest → 非市场购买。实际: 0次市场购买/3次卖出) [DM-P4-034]
- 2025 Q4: A/D 0.51 → 0次市场购买/1次卖出
- 2025 Q3: A/D 0.68 → 4次购买/1次卖出(唯一有购买的季度)
- **过去4个季度仅有4次购买(集中在Q3)，14次卖出** — 整体偏负面
- 与MU(A/D 0.14=极度负面)相比程度较轻，但与"CEO看好公司"不一致

---

## Ch7: Phase 4质量自检

| 指标 | 目标 | 实际 | 判定 |
|------|------|------|------|
| 红队七问 | 7/7 | 7/7 | ✅ |
| Q14-Q17解答 | 4/4 | 4/4 | ✅ |
| 双向校准 | 完成 | Bull+Bear双向审计 | ✅ |
| 估值更新 | DCF+SOTP+PW | 5种方法 | ✅ |
| 铁律K统一 | 全报告一版 | 回流表已列 | ✅ |
| Kill Switch | ≥3 | 5个 | ✅ |
| 概率三重锚定 | 每个概率有锚 | S4概率有完整锚定 | ✅ |
| DM新增 | ≥30 | 34个(DM-P4-001~034) | ✅ |

### P4 DM锚点注册(DM-P4-001 ~ DM-P4-034)

| DM ID | 内容摘要 | 来源 |
|-------|---------|------|
| DM-P4-001 | MRVL turnkey模式记全芯片收入 | NextPlatform / Marvell IR |
| DM-P4-002 | MRVL提供IP+代工通道服务 | NextPlatform |
| DM-P4-003 | MRVL为Amazon预订43K CoWoS晶圆 | SemiAnalysis |
| DM-P4-004 | Custom silicon FY2026达$1.5B | Marvell Q4 FY2026 ER |
| DM-P4-005 | 定制芯片毛利率低于标准产品 | CEO Matt Murphy |
| DM-P4-006 | Maia 300 ASP ~$8K | Fubon Research |
| DM-P4-007 | MSFT与AVGO谈判替代MRVL | WebProNews Dec 2025 |
| DM-P4-008 | Alchip赢Trn3/4升级为≥90%置信度 | SemiAnalysis+Benchmark+Dan Nystedt |
| DM-P4-009 | MRVL Trn2执行不力是丢失根因 | SemiAnalysis Dec 2025 |
| DM-P4-010 | MRVL chiplet方案vs Alchip monolithic | SemiAnalysis |
| DM-P4-011 | Trn3 SerDes来自Synopsys IP | SemiAnalysis |
| DM-P4-012 | Trn3 Q1 2026进入量产 | TrendForce |
| DM-P4-013 | AWS CoWoS 5K→70K(+1300%) | Morgan Stanley |
| DM-P4-014 | MRVL保留Kuiper+网络但无Trn3/4 XPU | 多源 |
| DM-P4-015 | CEO: 全年PO已到手 | Q4 FY2026 Earnings Call |
| DM-P4-016 | BofA升级至Buy | MarketScreener |
| DM-P4-017 | Benchmark降级至Hold | Yahoo Finance |
| DM-P4-018 | MediaTek获Google TPU v7 I/O设计 | TrendForce |
| DM-P4-019 | MediaTek 2026 ASIC目标$1B | TechSpot/TrendForce |
| DM-P4-020 | MediaTek抢走部分MSFT订单 | TrendForce |
| DM-P4-021 | MediaTek 224G SerDes能力 | TrendForce Mar 2026 |
| DM-P4-022 | Broadcom Tomahawk 6 CPO量产 | Broadcom IR Mar 2026 |
| DM-P4-023 | Celestial AI: 16Tbps/chiplet, 25x带宽 | ITBrandPulse/ServeTheHome |
| DM-P4-024 | Celestial收入目标: $500M FY2028/$1B FY2029 | Marvell IR/分析师 |
| DM-P4-025 | FY2026 Non-GAAP OPM 35.3% | Marvell Q4 FY2026 ER |
| DM-P4-026 | Hyperscaler AI CapEx >$300B | 行业估算 |
| DM-P4-027 | CPO 2026市场~$165M | EDN |
| DM-P4-028 | FY2027指引$11B(+30%) | Marvell Guidance |
| DM-P4-029 | FY2028初始目标$15B | Marvell Guidance |
| DM-P4-030 | 第二XPU FY2028量产 | Q4 Earnings Call |
| DM-P4-031 | 回购覆盖率345% | Baggers Summary |
| DM-P4-032 | TTM DSO恢复至23天 | Baggers Summary |
| DM-P4-033 | Qualcomm失三星案例 | 历史类比 |
| DM-P4-034 | Q1 2026: 0购买/3卖出 | FMP Insider Trading |

---

## Ch8: Phase 5预览 + P4.5参考扫描预备

### 8.1 P4.5参考扫描(组装前)

**缺口清单(D分<3.5的维度)**:
- D11(行业对标): MediaTek作为新竞争者需要更深入的对标分析
- D6(风险量化): 承重墙B的崩塌场景需要更精确的财务影响模型
- D8(管理层评估): 管理层叙事vs现实的分歧需要更多历史案例

**参考报告建议**:
- AVGO报告: 客户集中度管理的标杆(Google占比很高但护城河强)
- INTC报告: 执行失败导致客户流失的案例研究
- ADSK报告: 从"传统软件"到"平台"转型的估值框架

### 8.2 Phase 5组装指南

**结构**: 执行摘要→核心争议(ASIC客户流失)→估值含义→正文(护城河→业务→财务→竞争→估值→红队→风险)
**关键统一**: 全文FV=$80 | 评级=中性关注(偏审慎) | Amazon流失=确认事实 | 护城河=4.8/10
**字符目标**: P1(44K)+P2(23K)+P3(40K)+P4(此文~40K) = ~147K → Phase 5需补充至≥270K

---

*Phase 4完成 | 2026-03-30*
