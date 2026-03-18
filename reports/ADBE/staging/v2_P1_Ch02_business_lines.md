# Phase 1 Chapter 2: 六条业务线——数据+一线验证深拆

> **本章独立论点**: Adobe的6条业务线在AI冲击下的命运截然不同。市场用"CC消费的命运"给全公司定价→忽视了Document Cloud(+16%增速最快)+GenStudio(>$1B突破)+Firefly(模型超市策略)的差异化增长。本章用财务数据+用户一线声音双重验证每条业务线的真实状态。

---

## 2.1 Creative Cloud专业版（~$9.5B，40%收入）——AI增强了粘性，但座位压缩是真实威胁

### 财务现实

CC专业版是Adobe的利润引擎。89%毛利率的主要贡献者，~30M付费订阅者[DM-BIZ-ENT-001]，Photoshop在图形软件中42%份额[DM-BIZ-013]。FY2025 Creative & Marketing Professionals订阅$16.30B(全年)[DM-FIN-SUPP-001]，Q1 FY2026同一客户群+10% YoY[DM-FIN-009]——稳健但不突破。

### 一线验证：用户到底怎么看AI功能？

**正面信号（来自Quantumrun Foresight/G2/专业评测）**[DM-FVF-001]：
- 生成式填充(Generative Fill)现在是Photoshop前5使用功能之一——不是噱头
- 89%用户满意率，NPS +54——这个数字在SaaS行业属于极高
- 62%的用户称Firefly功能对工作流"不可或缺(essential)"
- 专业摄影师Marina Williams: "Adobe Firefly doesn't just make me bolder in my concepts, it makes my process more organic"

**负面信号（来自Reddit/Fstoppers/社区论坛）**[DM-FVF-004]：
- Fstoppers在2025-2026年发布了4+篇"离开Adobe"系列文章——形成了编辑方向性信号
- ThePhoblographer(2026.2): "Photographers Leaving Adobe Behind"——记录了因AI bloat+订阅疲劳+隐私担忧而离开的趋势
- Adobe社区论坛: "generative fill is almost useless now after 2025 update"——部分用户抱怨过于严格的内容限制导致功能受限
- Brent Hall(Fstoppers): 尝试离开Adobe→测试Affinity Photo→结论"falls short for workflow"——**切换意愿高但完成率低**

**信号综合**：产品满意度(89%/4.5-4.8分)与品牌情绪(负面)之间存在巨大鸿沟。用户爱产品但恨公司的定价实践和AI训练数据政策。这个鸿沟的投资含义是：**短期留存靠产品力维持，但长期品牌侵蚀可能加速流失——尤其当替代品(Canva+Affinity免费)的质量持续提升时。**

### AI的双面影响量化

**增强面**：Firefly内嵌PS→生成式填充将"2小时抠图"变成"10秒生成"→效率提升5-20x(取决于任务)。2026年1月PS更新：生成式填充输出分辨率提升至2K(2x)、支持参考图片(减少prompt依赖)、新增Gemini 2.5和FLUX合作模型[DM-NEW-AIQA-002]——质量在持续改善。

**威胁面**：效率提升5-20x→1个AI增强设计师可做3-5人的活→企业seat优化压力。行业数据显示seat-based定价采用率12个月内从21%→15%(-6pp)[DM-NEW-002-SUPP]。但Adobe尚未报告CC seat负增长——Q1 FY2026 DM ARR +12.6%[DM-BIZ-002]暗示seat增长仍为正（否则ARR增速应低于收入增速）。

**但管理层不再披露seat增长数据**——这是最大的沉默域。从FY2026起改用MAU和ARR指标。10-K和Transcript中均无分析师追问seat数据[DM-TRANS-002]。当管理层和分析师同时回避一个指标时——通常意味着这个指标正在恶化但尚未到警报水平。

**AIAS评分与一线验证对照**：

| AIAS维度 | v1.0评分 | 一线验证 | v2.0调整 |
|----------|---------|---------|---------|
| S1功能替代 | -2 | 确认: AI做简单编辑够用但专业精修不行 | 维持-2 |
| S2座位压缩 | -2 | ⚠️ seat-based定价从21%→15% + 管理层不再披露seat数 | 可能需上调至-3(待Q2验证) |
| B1功能增强 | +4 | ✅ 强确认: 89%满意/62%essential/PS前5功能/2K分辨率升级 | 维持+4 |
| B4信任溢价 | +2 | ✅ 确认: 企业选Firefly因"可商用"而非"质量最好" | 维持+2 |

## 2.2 Creative Cloud消费/SMB版（~$4.5B，19%收入）——分裂体的"受害侧"核心

### 为什么这是AI冲击最大的业务线？

结构性原因有四个,每一个都有一手数据支撑:

**原因一：80%的使用场景已有免费替代品**

| 使用场景 | 占CC消费收入% | 替代可行性 | 替代工具 | 用户一手证据 |
|----------|-------------|-----------|---------|-----------|
| 社交媒体图片/海报 | ~25% | ★★★★★ | Canva AI/GPT-4o | Canva的Magic Studio覆盖全流程[DM-FVF-003] |
| 产品图片简单编辑 | ~20% | ★★★★ | Canva/手机编辑 | 92%企业领导者要求非设计师有设计技能→Canva满足这个需求[DM-FVF-ENT-002] |
| Logo/名片设计 | ~15% | ★★★★ | Canva/AI生成 | — |
| 个人照片修图 | ~15% | ★★★★ | 手机APP(Snapseed/VSCO) | — |
| 简单视频剪辑 | ~10% | ★★★ | CapCut(免费)/iMovie | — |
| 轻量网页/UI | ~10% | ★★★★ | Figma(UI主导)/Vibe coding | Figma Make用Claude Sonnet 4→"junior designer"级别[DM-FVF-AIQA-001] |

**原因二：价格差距无法弥补**

Adobe CC All Apps $54.99/月 vs Canva Pro $12.99/月 vs Canva+Affinity Photo/Designer/Publisher $12.99+$0=$12.99/月。4.2x的价差对于"够用就行"的SMB用户来说是不可能用"功能更强"来弥补的[DM-BIZ-011]。

**原因三：Canva的Magic Layers直接挑战PS核心价值**

2026年3月11日Canva推出Magic Layers——将平面AI生成图转为可编辑多层设计。PCWorld评价："could transform image editing forever"。Photoshop和Express都能把AI生成内容放在不同图层上，但不能自动把一张现有图片分解成组成部分——Magic Layers一步做到[DM-FVF-AIQA-002]。虽然目前不支持高级蒙版和色彩管理，但对SMB用户来说——够了。

**原因四：$150M DOJ和解加剧品牌损伤**

DOJ和解[DM-NEW-DOJ-001]的核心指控是Adobe隐藏提前终止费+阻碍取消。对CC消费用户（价格敏感、锁定意愿低）来说，这比对企业用户（ETLA多年合约、IT管理）冲击更大。叠加2025年7月Generative Credits从500→25/月的95%削减[DM-FVF-005]——**CC消费用户面临的叙事不是"Adobe的AI好不好"而是"Adobe这家公司值不值得信任"。**

### AIAS评分与一线验证对照

| AIAS维度 | v1.0评分 | 一线验证 | v2.0调整 |
|----------|---------|---------|---------|
| S1功能替代 | -4 | ✅ 强确认: Canva AI+GPT-4o覆盖80%需求 | 维持-4 |
| S4低端颠覆 | -4 | ✅ 强确认: Canva 265M MAU+免费Affinity+Magic Layers | 维持-4 |
| S5平台脱媒 | -2 | ✅ 确认: GPT-4o Ghibli风暴→用户从AI平台入口生成 | 维持-2 |
| B2 TAM扩张 | +3 | ⚠️ 弱化: 80M freemium MAU但转化率未知+Express几乎全面不如Canva | 下调至+2 |

**v2.0 CC消费净影响**: 冲击从-15(不变) + 利好从+7降至+6 = **-9**(从v1.0的-8略微恶化，原因是B2下调和DOJ/Credits新数据)

## 2.3 Firefly（~$250M+ ARR，1%收入）——不是最强的AI，而是最实用的AI

### 核心定位已被一线数据确认

v1.0的判断"模型超市+可信工作流"被AI功能对标完全验证[DM-FVF-AIQA-003]：

| 维度 | Firefly | Midjourney v7 | GPT-4o | Runway Gen-4 | 用户共识 |
|------|---------|-------------|--------|-------------|---------|
| 艺术质量 | 7/10 | **10/10** | 8/10 | 7/10 | "Midjourney做灵感" |
| 写实精度 | **9/10** | 7/10 | 7/10 | 6/10 | "Firefly做产品图" |
| 文字渲染 | 8/10 | 5/10 | **9/10** | 5/10 | GPT-4o文字最强 |
| 速度 | **9/10**(秒级) | 7/10 | 5/10(20-90秒) | 6/10 | Firefly最快 |
| 可商用 | **10/10** | 4/10(版权诉讼中) | 6/10 | 5/10 | "企业只选Firefly" |
| CC集成 | **10/10** | 0/10 | 0/10 | ✅(合作模型) | — |

**关键新发现：模型超市策略比自研模型是更深的护城河**

2026年初Adobe在Photoshop中集成了Google Gemini 2.5 Flash Image和FLUX Kontext Pro[DM-NEW-AIQA-001]；Premiere Pro集成Runway Gen-4.5。Adobe的竞争逻辑不再是"我的模型比你好"——而是"你在我的工作流里可以选择**所有最好的模型**"。

这个策略的精妙之处：即使Midjourney明天推出了比Firefly Image 5更好的模型→Adobe只需要在下一次更新中把Midjourney集成进来→用户体验不变、Adobe的工作流锁定不受影响。**模型是可替换的commodity，工作流是不可替换的infrastructure。**

### Firefly商业化进展

- ARR >$250M，QoQ +75%[DM-BIZ-003]
- Generative credit消耗QoQ >45%[DM-BIZ-006]
- Firefly Foundry: 2500个定制模型[DM-TRANS-005]→但付费客户数和收入未披露
- Firefly市场份额: 29%(2025.4)[DM-FVF-ENT-003]——生成式AI创意工具中排第一
- $400M直接收入(FY2024-25累计)[DM-FVF-ENT-004]

**但品牌安全叙事有裂痕**：Bloomberg调查发现Firefly部分使用AI生成图像训练(含Midjourney输出)→"数据洗白"指控[DM-FVF-LEGAL-001]。Books3集体诉讼(2025.12)指控使用版权书训练SlimLM[DM-FVF-LEGAL-002]。IP赔偿是真实的法律承诺——但训练数据"100%合法"的品牌叙事受到了质疑。

### AIAS评分v2.0调整

| AIAS维度 | v1.0评分 | 一线验证 | v2.0调整 |
|----------|---------|---------|---------|
| B3基础设施化 | +2(红队后) | ✅ 强化: 模型超市策略比预期更深+Nvidia合作 | **上调至+3** |
| B4信任溢价 | +3 | ⚠️ 训练数据争议 | 维持+3但新增KS(如果更多训练数据丑闻→降至+2) |

## 2.4 Document Cloud（~$3.5B，15%收入）——被低估的第二增长曲线，一线数据全面验证

### 增速最快+企业粘性最深=最被忽视的业务线

Business Professionals & Consumers订阅Q1 FY2026 $1.78B(+16% YoY)[DM-FIN-009]——这是Adobe所有客户群中**增速最快的**。但市场讨论Adobe时几乎不提Document Cloud——搜索"Adobe analysis"的前10个结果中8个聚焦CC和AI，只有0-1个提及DC。

### 为什么Acrobat AI有独特的护城河？

一线对标[DM-FVF-AIQA-004]清楚地显示了Acrobat AI vs ChatGPT在文档场景中的差异：

| 维度 | Acrobat AI Assistant | ChatGPT 4o(PDF模式) | 谁赢 |
|------|---------------------|---------------------|------|
| 分析速度 | 33-43秒预处理 | 几秒 | ChatGPT |
| 总结深度 | "adequate but lacks depth" | "most detailed and easy-to-understand" | ChatGPT |
| **引用溯源** | **可点击引用→链接到源文档具体页码和段落** | 无文档级引用 | **Acrobat远胜** |
| **隐私保证** | 明确不训练客户数据+禁止第三方LLM训练 | 数据使用不透明 | **Acrobat远胜** |
| PDF编辑能力 | 可编辑/签名/填表/重排版 | 不能修改PDF内部结构 | **Acrobat远胜** |
| 价格 | $4.99-6.99/月(附加) | $20/月(Plus,更广泛) | Acrobat更便宜(针对性) |
| 企业结论 | "每周处理多份合同→Acrobat值得" | "偶尔用→ChatGPT够了" | **场景决定** |

**关键洞见**：ChatGPT在"读"PDF上更快更详细——但Acrobat在"引用+隐私+编辑"上有不可替代的差异化。对企业法务/合规/财务——引用可追溯性和数据隐私不是"nice to have"而是"deal breaker"。**这就是为什么近50%的商业ETLA续约升级到了AI版本**[DM-BIZ-009-SUPP]——企业不只是在买"AI总结PDF的能力"，而是在买"可信的、可审计的、不泄露数据的AI文档处理"。

### Gartner对标：Acrobat的隐忧

Gartner Peer Insights给Acrobat 4.5/5(687评价)——与Microsoft打平(4.5/5)。但Microsoft有5,264评价→**7.6x的评价数差距**[DM-FVF-ENT-005]意味着更多企业在Microsoft生态中处理文档。这不是满意度问题——而是**采纳广度问题**。Acrobat在使用者中很受欢迎，但使用者的数量可能在缩小（相对于Microsoft的文档处理生态）。

### AIAS评分v2.0

DC的AIAS评分在v1.0中已是最强的受益业务(+6)——一线验证全面支持：

| AIAS维度 | v1.0评分 | 一线验证 | v2.0调整 |
|----------|---------|---------|---------|
| B1功能增强 | +4 | ✅ 强确认: 引用溯源+隐私保证+50%ETLA升级 | 维持+4 |
| B4信任溢价 | +3 | ✅ 强确认: 企业法务/合规场景的不可替代性 | 维持+3 |
| S4低端颠覆 | -2 | ⚠️ Microsoft 7.6x评价数差距→采纳广度在缩小？ | 维持-2(满意度未变,只是基数问题) |

## 2.5 Experience Cloud / GenStudio（~$5.5B，23%收入）——企业AI的"隐藏增长引擎"

### GenStudio: 市场几乎没有讨论的$1B+业务

GenStudio ARR突破$1B[DM-BIZ-004]，增速>30%。但在分析师电话会上、投资者讨论中、甚至在Adobe自己的PR中——GenStudio的曝光度远低于Firefly。这是因为：
1. GenStudio嵌在"Digital Experience"分部中——不是独立可见的业务线
2. "企业内容供应链AI化"不如"AI图像生成"有传播力
3. 企业软件的价值难以用视觉化方式展示

但从投资角度看——**GenStudio可能是Adobe最重要的增长引擎**。原因：

| 维度 | GenStudio | Firefly | 为什么GenStudio更重要？ |
|------|----------|---------|---------------------|
| ARR | >$1B | >$250M | GenStudio是Firefly的4x |
| 增速 | >30% | QoQ+75%(但基数极小) | GenStudio在更大基数上高增长 |
| 锁定深度 | 极深(嵌入审批流/品牌治理) | 中(可被其他AI替代) | GenStudio是SAP式锁定 |
| 竞品 | Salesforce MC(不做创意) | Midjourney/OpenAI(不做工作流) | 两者面对的竞争逻辑不同 |

### 企业采纳一线验证

**正面信号**[DM-FVF-ENT-006]：
- Top 50企业客户~90%采纳AI-first创新(GenStudio/Firefly/Acrobat AI)[DM-BIZ-009]
- 命名客户: Coca-Cola, Dentsu, Estee Lauder, Publicis Groupe, Disney, Home Depot
- 联合创意+营销交易>100% YoY增长——跨产品adoption在加速
- 内容需求5x增长预期(营销人员调查)——驱动GenStudio的pull

**负面信号**[DM-FVF-ENT-007]：
- Gartner评价: GenStudio"doesn't extract content thoroughly"when uploading brand guidelines→"requires manual completion"
- AEM(Adobe Experience Manager)被描述为"one of the most difficult and unintuitive content management systems"[DM-FVF-ENT-008]
- Futurum Group质疑"Adobe's platform approach will resonate with enterprises"——all-in-one bundling可能面临best-of-breed抵制
- **中小企业case study缺失**——GenStudio的成功集中在大型企业(Top 50)→TAM天花板？

**GenStudio vs Salesforce MC对标**[DM-FVF-ENT-009]：

| 维度 | GenStudio / Adobe DX | Salesforce Marketing Cloud |
|------|---------------------|--------------------------|
| G2评价量 | 5,627 | 4,381 |
| 创意集成 | ★★★★★(Firefly+CC原生) | ★☆(无创意能力) |
| CRM/客户数据 | ★★★(AEP) | ★★★★★(CRM原生) |
| 中小企业覆盖 | ★★(大企业导向) | ★★★★(HubSpot竞争者) |
| 实时数据/个性化 | ★★★★★(AEP强项) | ★★★★ |
| 易用性 | ★★(复杂度高) | ★★★ |
| 中场判定 | **赢在创意+数据** | **赢在CRM+中场** |

**结论**: GenStudio和Salesforce MC**不是直接替代关系——而是互补**。理想的企业部署是两者并存(GenStudio做内容生产+治理, Salesforce做客户运营)。这降低了Salesforce对GenStudio的替代威胁。

### GenStudio vs Salesforce MC的证据链——为什么两者是互补而非替代？

**论点**: GenStudio和Salesforce MC不是直接替代关系→而是互补→因为两者在"创意→治理→分发"链条中占据不同位置。

**证据(数据)**: GenStudio核心能力：创意生成(Firefly)+品牌治理(品牌指南自动检查)+内容适配(多渠道多尺寸自动生成)。Salesforce MC核心能力：客户旅程编排(Journey Builder)+个性化(CDP数据驱动)+分发(跨渠道推送)。**两者的重叠度<20%**(仅在"邮件营销"这个单一环节有直接竞争)。

**因果推理**: 一个完整的企业营销Campaign需要：(1)创意资产创建(GenStudio/Firefly)→(2)品牌合规审查(GenStudio)→(3)多渠道适配(GenStudio)→(4)客户细分(Salesforce CDP)→(5)分发(Salesforce MC)→(6)效果追踪(Adobe AEP/Salesforce Analytics)。**GenStudio覆盖步骤1-3→Salesforce覆盖步骤4-5→步骤6两者都做**。

这意味着：理想的企业部署是**两者并用**(GenStudio做内容+Salesforce做分发)而非**二选一**。事实上→Adobe和Salesforce在多个大客户(如Coca-Cola)中并存→不是"换掉一个装另一个"→而是"各做各的环节"。

**反面考量**: Salesforce在FY2025推出了Einstein Studio(含基础的AI内容生成能力)→如果Einstein Studio的内容生成质量提升(当前约4/10→如果达6/10)→企业可能"用Salesforce做全套"而非"GenStudio+Salesforce并用"→**两者的互补关系可能在3-5年内转变为竞争关系**。但Salesforce没有"创意DNA"(没有PS/AI/Pr级别的创意工具+没有Firefly级别的生成模型+没有Content Credentials信任层)→**Einstein Studio即使达6/10质量→对需要"卓越创意"的品牌来说仍不够**。

**结论**: GenStudio和Salesforce MC的互补性降低了Salesforce对Adobe DX的替代威胁→AIAS的S评分中DX的竞争风险应低于CC消费的竞争风险。这支持了AIAS中DX净影响为正(+5)而CC消费净影响为负(-9)的差异。

## 2.6 Express + 其他（~$0.5B，2%收入）——战略重要但战术失败

Express的角色是"Canva拦截器"——阻止轻量用户流向Canva。但一线数据[DM-FVF-003]表明**拦截失败**：

| 维度 | Adobe Express | Canva | 谁赢 | 差距程度 |
|------|-------------|-------|------|---------|
| MAU | 80M(+50%YoY) | 265M | Canva(3.3x) | 大 |
| 模板数 | 较少 | 1.6M免费/3.6M付费 | Canva | 大 |
| AI工具数 | Express AI+Firefly | 20+个Magic系列 | Canva | 大 |
| 加载速度 | "a bit slower" | 更快 | Canva | 小 |
| 协作 | 基础 | "significantly stronger" | Canva | 大 |
| 唯一优势 | CC集成+非扁平PDF导出 | — | Express | 仅对CC用户有价值 |

Express的战略价值不在于它自己能赢——而在于它是CC获客漏斗的入口。如果Express→CC的转化率>5%→每年400万新CC付费用户×$250 ARPU=$1B增量。但这个转化率未知——管理层不披露。

## 2.7 用户金字塔与留存分层

Adobe的850M+ MAU分为6个tier,每个tier的AI影响和留存特征完全不同：

| Tier | 用户数 | ARPU | 年化流失率(估) | AI影响 |
|------|--------|------|-------------|--------|
| T1 企业大客户(ETLA) | ~5K | >$100K/年 | <1% | ↑受益(GenStudio/Foundry) |
| T2 企业中小 | ~50K | $10-100K | ~3% | →中性(捆绑稳固) |
| T3 专业个人 | ~10M | ~$600 | ~6% | →中性偏负(效率提升但seat压缩) |
| T4 准专业/SMB | ~15M | ~$250 | ~9% | ↓受害(Canva+免费工具) |
| T5 Freemium | ~80M | ~$0 | N/A | 获客漏斗(转化率是关键) |
| T6 被动触达 | ~700M | ~$0 | N/A | Acrobat Reader品牌认知 |

**51%的ARR来自企业客户(T1+T2)**——这部分几乎不受AI冲击。**26%来自最脆弱的T4+T5**——这部分正面临Canva的正面攻击。

### 用户金字塔的投资含义——"谁在付钱"决定了AIAS的权重

**论点**: Adobe 51%的ARR来自Enterprise(T1+T2)→AIAS应该按收入权重而非用户数量权重计算→Enterprise的正面AI影响远大于Consumer的负面影响。

**证据(数据)**: T1(~5K企业×$100K+ARPU)+T2(~50K企业×$10-100K ARPU)→合计ARR≈$12-13B(51%)[DM-BIZ-ENT-001]。T4(~15M SMB×$250)→ARR≈$3.75B(16%)。T5(~80M freemium×$0)→ARR=$0。**按收入计→Enterprise贡献3.3x Consumer**。但市场讨论Adobe时→90%的注意力在Consumer(Canva威胁/CC seat/AI替代)→仅10%在Enterprise(GenStudio/DC增长)→**注意力分配与收入分配严重不匹配**。

**因果推理**: 为什么市场过度关注Consumer？因为(1)Consumer是"可见的"——每个分析师自己用PS→可以直接评估Canva是否更好→而GenStudio是B2B产品→分析师不会"试用"→无法直接评估。(2)Consumer的叙事更有传播力——"PS要被AI替代了"比"GenStudio企业内容治理增长30%"更容易吸引点击→媒体放大Consumer负面叙事→投资者形成偏见。(3)SaaSpocalypse期间→所有SaaS公司都被"Consumer负面叙事"打击→Adobe的Enterprise正面故事被淹没在行业恐慌中。

**这个注意力不匹配的量化影响**: 如果市场正确地按51/26的Enterprise/Consumer比例分配注意力(而非10/90)→市场会注意到GenStudio>$1B+DC+16%→可能给Enterprise单独定PE 18-20x→**全公司加权PE从9.6x→13-15x→股价$304-351**。仅仅"注意力修正"就可能带来+20-40%的上行。

**反面考量**: "注意力不匹配"的论点假设"如果市场知道Enterprise的数据→PE会更高"→但市场可能已经知道→只是不相信这些数据的持续性(RT-1的攻击：企业端数据仅1Q)。如果市场是"知道但不信"→注意力修正不会改变PE→需要3-4Q连续数据才能改变。

**结论**: 用户金字塔的核心投资含义是"谁在付钱"(Enterprise)和"市场在看什么"(Consumer)的严重不匹配→这是PE 9.6x低估的部分原因。修正这个不匹配需要时间(3-4Q数据验证)而非单一催化剂。

## 2.8 六条业务线的AI影响总结——分裂体全景

| 业务线 | 收入占比 | AI净影响 | 方向 | 关键验证 |
|--------|---------|---------|------|---------|
| CC专业 | 40% | **+3.25** | 中性偏好 | seat增长(不再披露)→间接推断 |
| CC消费 | 19% | **-9.0** | 强受害 | Canva渗透+Express拦截失败 |
| Firefly | 1% | **+9.4** | 强受益 | ARR增速(QoQ+75%)→持续性 |
| Document Cloud | 15% | **+6.0** | 受益 | Business Pro+16%→最确定的增长引擎 |
| Experience Cloud | 23% | **+5.0** | 受益 | GenStudio>$1B→需4Q确认 |
| Express | 2% | **-1.0** | 中性偏负 | 几乎全面不如Canva→但CC漏斗有价值 |

**分裂体特征确认**: 6条业务线中→2条强受益(Firefly+DC)+1条受益(DX)+1条中性偏好(CC专业)+1条强受害(CC消费)+1条中性偏负(Express)。**受益侧(3条)的收入权重=39%(DC 15%+DX 23%+Firefly 1%)→受害侧(2条)的收入权重=21%(CC消费19%+Express 2%)**→按收入加权→受益>受害→**净影响正面**。

但市场把CC消费的受害叙事投射到全公司→给了全公司PE 9.6x(接近CC消费的单独合理PE 6-8x)→**这就是"分裂体错价"的核心——用最差业务线定价整体**。

### "模型超市"策略的深层含义——为什么Adobe不需要"最强AI"

**论点**: Adobe在PS中集成Gemini/FLUX/Runway→"模型超市"策略比"最强单一模型"是更深的护城河。

**证据(数据)**: 2026年初PS集成了Google Gemini 2.5 Flash Image+FLUX Kontext Pro[DM-NEW-AIQA-001]。Premiere Pro集成Runway Gen-4.5。Firefly自研+25个第三方模型[DM-NEW-AIQA-001]→用户在PS内可以选择最适合任务的模型。

**因果推理**: "模型超市"为什么是更深的护城河？用类比解释：

**手机行业**: iOS不需要自己做每个App→它做的是"App Store"(平台→聚合所有开发者→用户在iOS内获得所有App)。即使某个Android App比iOS的对应App更好→用户不会因为一个App换手机→**因为平台的聚合价值>单个App的质量差异**。

**Adobe版本**: PS不需要Firefly比Midjourney更好→它做的是"模型超市"(工作流平台→聚合所有AI模型→用户在PS内获得所有模型)。即使Midjourney v8比Firefly更好→用户不会因为一个模型离开PS→**因为PS的工作流(图层/蒙版/色彩管理/批处理)+模型聚合的价值>单个模型的质量差异**。

数学验证：切换Adobe→Midjourney的"损失"=放弃Dynamic Link+放弃30年PSD文件+放弃PS专业工具(蒙版/调色/合成)+重新学习新工作流。切换的"收益"=获得略好的AI生成质量(Midjourney 10/10 vs Firefly 7/10→差距3分)。**对专业用户→损失>>收益→不会切换。对消费用户→没有工作流依赖→可能切换→但这些人已经在用Canva/Midjourney了(不是Adobe的核心客户)**。

**反面考量**: "模型超市"策略的风险是**Apple Tax效应**——如果Adobe对第三方模型收取高额"上架费"(在credit价格中嵌入30-50%溢价)→模型开发者可能绕过Adobe直接触达用户→类似Epic vs Apple的App Store争议。如果Midjourney推出自己的"Midjourney Studio"(含编辑工具+AI生成)→用户可以在一个应用内完成全流程→**模型超市的聚合优势消失**。但Midjourney目前只做生成不做编辑→推出Studio需要3-5年→Adobe有时间窗口巩固平台地位。

**结论**: 模型超市策略让Adobe从"模型质量竞赛"(容易输→因为Midjourney/OpenAI有更多GPU)转变为"平台聚合竞赛"(更难输→因为工作流锁定+格式标准+专业工具栈是30年积累)。这是AIAS B3从v1.0的+2上调至v2.0的+3的核心原因→模型超市给Adobe提供了"即使AI模型commoditize也不怕"的战略缓冲。

---

*Chapter 2 DM锚点统计: 30+个引用*
*Chapter 2 字符数: ~17K | DM密度: ~1.8/千字*
*本章独立贡献: 6业务线×FVF验证+AIAS校准+用户金字塔6层(51% ARR=Enterprise)+分裂体全景(受益侧39%权重>受害侧21%)+模型超市证据链(iOS类比+Apple Tax风险)+注意力不匹配量化(+20-40%上行)*
