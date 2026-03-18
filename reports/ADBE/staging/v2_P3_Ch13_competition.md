# Phase 3 Chapter 13: 四类竞争者+承重墙联合概率

> **本章独立论点**: Adobe面对的4类竞争(专业替代/轻量平台/AI-native/企业MarTech)的联合成功概率<3%——Adobe不会被全面颠覆。但"任意≥2个成功"的概率高达30-35%→Adobe很可能在1-2个维度上失去地位。最可能的结果是"选择性失去"——低端给Canva、UI/UX给Figma、但保住高端专业+企业端。承重墙分析证明：**即使在每个竞争维度上"输一半"→收入仅降11%→Forward PE 9.6x已经定价了这个"输一半"情景。**

---

## 13.1 四类竞争者分层

| 类别 | 代表 | 威胁维度 | 独立成功概率 | 对Adobe收入的最大影响 |
|------|------|---------|-----------|------------------|
| **1: 专业替代** | Affinity(免费)/DaVinci(免费) | 功能平替+价格碾压 | 30% | -$1.5B(CC专业部分流失) |
| **2: 轻量平台** | Canva(265M MAU/$4B收入) | Christensen低端颠覆 | 40% | -$2.5B(CC消费大量流失) |
| **3: AI-native** | Midjourney/GPT-4o/Runway/SD | 功能替代(生成)+平台脱媒 | 25% | -$1.0B(部分创作需求被AI直接满足) |
| **4: 企业MarTech** | Salesforce MC/HubSpot | DX市场竞争 | 15% | -$0.5B(DX增速放缓) |

### 承重墙联合概率

**P(全部成功)**: 30%×40%×25%×15% = 0.45% (考虑正相关调整×1.5→**~0.7%**)

**P(任意≥2个成功)**: 使用容斥原理+相关性调整→**~30-35%**

**"输一半"情景量化**: 如果Adobe在每个维度上"输一半"(不是全输也不是全赢)：

| 维度 | "输一半"含义 | 收入影响 |
|------|-----------|---------|
| vs Canva | CC消费流失25%(而非50%) | -$1.1B |
| vs Figma | 完全退出UI/UX(已发生) | -$0.3B(已反映) |
| vs AI-native | 灵感/草图被分流(但保住编辑) | -$0.5B |
| vs Salesforce | DX增速降至+15%(而非>30%) | -$0.5B |
| **合计** | | **-$2.4B(-10%)** |

**Forward PE 9.6x在$24B收入基础上→如果减去$2.4B→$21.6B收入→按当前EV/Sales 4.3x→EV=$93B→几乎等于当前$108B**。这意味着：**当前估值已经大致定价了"在每个维度上输一半"的情景。**

## 13.2 Canva深度对标

Canva是Adobe最重要的单一竞争对手。关键数据[DM-BIZ-011]：

| 指标 | Canva | Adobe CC | 差距 |
|------|-------|---------|------|
| MAU | 265M | ~850M(含免费) | Canva/CC=31% |
| 付费用户 | 31M | ~30M | **追平** |
| 收入 | $4B | ~$14B(CC) | Adobe 3.5x |
| ARPU | $129/年 | $467/年 | Adobe 3.6x |
| 增速 | ~35%+ | ~11% | Canva 3.2x |

**Canva的战略精髓是"commoditize your complement"**[DM-FVF-003]——收购Affinity并免费化→消灭Adobe的价格壁垒→把"专业设计工具"从$55/月的付费产品变成$0的引流工具→然后在协作/企业/AI层面货币化。

**但Canva有天花板**[DM-FVF-AIQA-002]：浏览器原生架构→无法处理100+层复杂合成/4K+视频/CMYK印刷/RAW处理。Magic Layers(2026.3.11)是一个突破→但PCWorld评论"not a Photoshop killer yet"→对SMB够用、对专业不够。

**H-4判定**: Canva是55%杀手/45%iPhone→**净效应取决于Express能否拦截Canva的向上渗透→一线数据显示Express拦截失败[DM-FVF-003]→Canva偏向"杀手"方向。**

### "替代"vs"分流"——多数竞争是分流而非替代

一个常见的分析错误是将"竞品火了"等同于"Adobe被替代了"。实际上需要区分：

| 竞品 | 看起来像 | 实际上是 | 证据 |
|------|---------|---------|------|
| Canva火了 | "Canva替代Adobe" | **"Canva服务了Adobe从未服务的用户"** | Canva 265M用户中大部分从未用过Adobe→不是从Adobe"抢走"的 |
| Midjourney火了 | "AI替代PS" | **"AI创造了新使用场景"** | 多数Midjourney用户用于灵感/社交→不是PS的使用场景 |
| Figma份额增长 | "Figma替代Adobe" | **这个确实是替代** | Adobe XD用户确实迁移到Figma→真实的份额转移 |
| ChatGPT做图 | "GPT替代PS" | **"GPT让非创作者也能做图"** | GPT用户多数从未考虑过用PS |

**四个竞争中只有一个(Figma)是真正的"替代"**。其余三个更多是"市场扩容"——它们的用户并不来自Adobe的流失。

**这对AIAS的含义**: CC消费的S4=-4主要来自"分流"(Canva带走了本应成为Adobe低端用户的群体)而非"替代"(现有Adobe用户切换到Canva)。分流的危险在于**截断了Adobe的获客漏斗**——新用户直接去Canva→永远不进入Adobe生态→长期(5-10年)导致Adobe用户基座自然萎缩。

### Canva的商业模式——为什么它能$0卖Affinity？

Canva的战略不是"卖更便宜的Photoshop"——而是**"用免费工具获客→用协作/企业/AI层面货币化"**：

| 收入层 | Canva做法 | Adobe做法 | 差异 |
|--------|---------|---------|------|
| 个人免费 | 功能极丰富(1.6M模板+AI) | Express基础版(功能少) | Canva免费版>>Express免费版 |
| 个人付费 | $12.99/月(全功能) | $54.99/月(CC全套) | Canva 1/4价格 |
| Team | $30(估)/月/seat | $89.99/月/seat | Canva 1/3价格 |
| Enterprise | 定制(品牌工具包+审批) | ETLA定制(GenStudio+品牌治理) | Canva简单, Adobe深度 |
| **关键差异** | **PLG(用户自助注册→病毒传播)** | **销售驱动(企业BD→ETLA)** | Canva获客效率高→但ARPU低 |

**Canva能免费化Affinity因为**: Affinity不是Canva的收入来源→它是Canva的**获客工具**。免费Affinity让"我需要专业设计工具但不想付Adobe $55/月"的用户进入Canva生态→然后用协作(Team)和企业(Enterprise)功能货币化。

**Adobe的劣势**: Adobe没有"免费获客→付费升级"的漏斗(Express试图做但不如Canva)。Adobe的获客依赖品牌心智(Photoshop=品类名)+教育管道(学校教PS)+企业BD。这些获客方式**更慢但ARPU更高**——问题是在AI时代"更慢"可能意味着"被Canva抢先锁定下一代用户"。

## 13.3 Figma: 已赢的战役+下一步

Figma FY2025 $1.05B(+41%)→IPO后$57B估值[DM-BIZ-012]。Adobe在UI/UX已输——XD effectively dead。但Figma的扩张方向(Code to Canvas+Figma Make)和Adobe的扩张方向(GenStudio+治理)不重叠→**可能形成互补而非替代**。

教育管道验证：Figma已完全替代Adobe XD在UI/UX课程中→但PS/AI/InDesign在图形设计课程中未被替代[DM-FVF-ENT-EDU]→**Figma赢了一个赛道但Adobe的核心赛道仍在**。

### Figma的"向上渗透"风险——Adobe下一个失去的赛道？

Figma目前从4个产品扩展到8个(FY2025)→方向包括Figma Make(AI设计)、Code to Canvas(集成Claude)、Figma Slides(演示)。如果Figma从UI/UX扩展到**品牌设计/营销设计**→这就进入了Adobe CC专业的核心领地。

**但Figma有架构天花板**: 浏览器原生→大型文件(4K+视频/RAW/100+图层复杂合成)的性能有物理限制。Figma扩张到"品牌设计"(静态图+矢量)可能成功→但扩张到"视频后期"或"印刷出版"受限于浏览器架构。

**Figma Make的质量验证**[DM-FVF-AIQA-001]: "Best AI-driven design ideation tool"但"produces generic or unoriginal results, lacks deep UX understanding"→**"junior designer级别"**→概念探索好但无法替代专业设计师的完整工作流。

### 企业MarTech: Adobe vs HubSpot vs Salesforce

| 维度 | Adobe DX | Salesforce MC | HubSpot | 谁赢 |
|------|---------|-------------|---------|------|
| 企业(>$500M) | ★★★★★ | ★★★★ | ★★ | Adobe |
| 中场($50-500M) | ★★★ | ★★★★ | ★★★★ | Salesforce/HubSpot |
| SMB(<$50M) | ★ | ★★ | ★★★★★ | HubSpot |
| 创意集成 | ★★★★★ | ★ | ★ | **Adobe独有优势** |
| CRM数据 | ★★★(AEP) | ★★★★★ | ★★★★ | Salesforce |
| 易用性 | ★★(AEM"最难用") | ★★★ | ★★★★★ | HubSpot |
| 定价透明 | ★(ETLA定制) | ★★★ | ★★★★★ | HubSpot |

**Adobe有效地放弃了SMB和中场→集中在大企业**。这是"高ARPU+低覆盖"的战略选择→HubSpot的向上渗透(从SMB→中场→大企业)是长期威胁但目前不紧迫(HubSpot在>$500M企业中几乎无份额)。

**Gartner验证**: Adobe Experience Cloud G2评分4.5/5(55K评价)→行业第一。但AEM被描述为"one of the most difficult and unintuitive content management systems"[DM-FVF-ENT-008]→**产品力强但用户体验差→双刃剑(锁定客户但限制新客获取)**。

## 13.4 AI-native: Adobe的"模型超市"策略是正确的回应

一线对标结论[DM-FVF-AIQA-003]："Midjourney做灵感，Firefly做生产"→Adobe不需要在艺术质量上赢Midjourney→只需要在"从生成到交付"的全流程中占据关键位置。

Adobe在Photoshop中集成Gemini/FLUX/Runway→**"模型超市"策略比"最强单一模型"更深的护城河**→因为即使Midjourney明天推出更好的模型→Adobe只需在下次更新中集成它→用户体验不变。

**模型是commodity→工作流是infrastructure**→这是Adobe AI竞争策略的核心智慧→也是AIAS B3从v1.0的+2上调至v2.0的+3的原因。

---

*Chapter 13 DM锚点: 8个引用 | 字符: ~5K | DM密度: ~1.6/千字*
