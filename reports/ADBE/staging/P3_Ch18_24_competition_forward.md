# Phase 3: 竞争格局+前瞻+Claude Code专章 (Ch18-Ch24)

---

## Chapter 18: 四类竞争者分层分析

### 18.1 竞争格局总览

Adobe面对的竞争不是一个方向——而是四个完全不同的竞争维度同时展开。这四类竞争者的威胁逻辑、影响范围和时间窗口截然不同。

```
                    高端专业
                       ↑
                       |
           Adobe CC ←--+--→ Autodesk/DaVinci
                       |         (有限重叠)
        Figma ←--------+
        (UI/UX设计)    |
                       |
                    ───+───────────────→ AI-Native
                       |        Midjourney/Runway/
                       |        OpenAI/StableDiff
        Canva ←--------+
        (轻量创作)     |
                       |
                    低端消费
                       ↓

        ← Salesforce/HubSpot (企业MarTech) →
```

### 18.2 第一类: 专业工具替代者

**代表**: Affinity(Canva收购后免费)/DaVinci Resolve(免费)/Blender(免费)

**威胁本质**: 功能平替+价格碾压。Affinity Photo/Designer/Publisher提供Photoshop/Illustrator/InDesign 80%的功能, 价格=$0(免费)。DaVinci Resolve提供专业级视频剪辑, 免费版已覆盖大部分需求。

**实际影响**: ★★☆ (低于市场认知)

理由:
1. **切换成本不在功能, 在工作流**: 一个设计师可以在Affinity Photo中做PS能做的事, 但不能与Illustrator/Premiere/After Effects无缝互通
2. **企业采购惯性**: IT部门不会因为Affinity免费就更换全公司的CC订阅——风险>节省
3. **插件/模板生态不可迁移**: 数十年积累的PS插件/动作/预设在Affinity中不工作

**但长期风险真实**: 新一代设计师如果在学校用Affinity(免费)而非PS(需要学校订阅), 管道会逐渐切换。Adobe的30M学习者倡议是对冲, 但Canva免费Affinity策略直接针对教育市场。

### 18.3 第二类: 轻量创作平台 — Canva

**Canva是Adobe最重要的竞争对手**, 不是因为它在高端威胁Adobe, 而是因为它在重新定义"创意软件"的边界。

**Canva定量画像**[DM-BIZ-011]:

| 指标 | Canva | Adobe CC | 对比 |
|------|-------|---------|------|
| 用户 | 265M | ~850M MAU(含免费) | Canva 31% |
| 付费用户 | 31M | ~30M订阅 | **几乎相当** |
| 年化收入 | $4B | ~$14B(CC部分) | Canva 29% |
| ARPU(付费) | ~$129/年 | ~$467/年 | Canva 1/3.6 |
| 增速 | ~35%+ | ~11% | Canva 3.2x |
| 估值 | 可能$40-50B(IPO) | $107B(全公司) | — |

**Canva的竞争策略是"Christensen教科书式低端颠覆"**:
1. **免费入门**: 免费版覆盖80%轻量需求
2. **AI增强**: Magic Studio/Magic Layers提供"够用"的AI功能
3. **向上渗透**: Canva for Enterprise进入Fortune 500
4. **消灭价格壁垒**: 收购Affinity并免费化→$54.99/月 vs $0

**Canva是威胁还是"Adobe的iPhone"(H-4)?**

iPhone类比的逻辑: iPhone看似"替代"了诺基亚, 实际是**将手机市场从5亿扩大到50亿**。Canva如果将"创意软件用户"从5000万(专业)扩大到5亿+(大众), 其中一部分会升级到Adobe → Canva是Adobe获客漏斗底部。

**H-4的验证条件**:
- ✅ Adobe freemium MAU在增长(8000万, +50%)→ 新用户在进入
- ⚠️ 但freemium→paid转化率未知→ 可能大部分新用户停在免费层
- ⚠️ Canva企业版增长→ 不只是低端, 开始向上渗透

**我们的判断**: Canva同时是威胁(低端蚕食)和机会(TAM扩张)。净效应取决于Adobe能否在Express上成功拦截Canva的向上渗透。**如果Express失败, Canva就是杀手; 如果Express成功, Canva就是iPhone。**

### 18.4 第三类: AI-Native生成工具

**代表**: Midjourney, OpenAI(GPT-4o/Sora), Runway, Stable Diffusion

**威胁本质**: 不是替代Adobe的工具, 而是**替代需要Adobe工具的任务**。

| 工具 | 核心能力 | vs Adobe | 威胁维度 |
|------|---------|---------|---------|
| Midjourney v6.1 | 艺术质量最强的图像生成 | 替代部分概念创作 | S1功能替代 |
| GPT-4o | 通用图像生成(Ghibli风暴) | 替代简单图像需求 | S5平台脱媒 |
| Sora/Runway Gen-4 | 视频生成 | 替代简单视频需求 | S1功能替代 |
| Stable Diffusion | 免费开源图像生成 | 开发者自建替代 | S4低端颠覆 |

**Adobe的回应: "如果打不过就集成"**

Adobe将Midjourney/Runway/OpenAI等25+模型集成为Firefly的合作模型。用户在Photoshop中可选择用任何模型生成→输出进入Adobe工作流(精修→品牌治理→分发)。

**这个策略的核心假设**: "模型是商品化的, 工作流是差异化的"。如果这个假设成立, Adobe不需要赢模型战——只需要是最好的"模型超市+工作流引擎"。

**假设可能失败的情景**: OpenAI/Google自建完整工作流(从生成→编辑→分发), 绕过Adobe。ChatGPT Canvas已经在做初步尝试——但距离企业级GenStudio还有很远。

### 18.5 第四类: 企业MarTech平台

**代表**: Salesforce Marketing Cloud, HubSpot, Google Marketing Platform

**与Adobe的重叠**: 主要在Experience Cloud(不是Creative Cloud)

| 竞争者 | 核心优势 | vs Adobe DX | 威胁级别 |
|--------|---------|-----------|---------|
| Salesforce | CRM+营销自动化+AI(Einstein) | 在CRM层更强, 但缺创意能力 | ★★★ |
| HubSpot | SMB营销一站式+易用性 | 低端市场价格优势 | ★★☆ |
| Google Marketing | 广告数据+搜索整合 | 在广告数据层更强 | ★★☆ |

**Adobe DX的差异化**: 唯一同时拥有"创意生成+营销编排+品牌治理"的平台。Salesforce有CRM但不会做图; Google有广告数据但不做品牌治理; Canva会做图但不做CDP。**GenStudio把这三者打通。**

### 18.6 承重墙联合概率 (INTC方法)

**问题**: 如果以上四类竞争全部成功(Canva占领低端+AI-native替代中端+Figma替代设计协作+Salesforce替代企业MarTech), Adobe会怎样?

**各竞争威胁的独立成功概率估计**:

| 威胁 | 概率 | 理由 |
|------|------|------|
| Canva占领CC低端30%+份额 | 40% | 免费策略+AI已证明有效, 但企业端渗透未验证 |
| AI-native替代CC中端20%+功能 | 25% | 模型质量在提升, 但"生成→交付"距离仍大 |
| Figma替代Adobe在UI/UX的全部份额 | 60% | 已基本实现(Figma在UI/UX已主导) |
| Salesforce/HubSpot替代DX核心功能 | 15% | DX与CC深度集成是壁垒, 且GenStudio增速>30% |

**联合概率** (假设部分相关, 相关系数~0.3):
- P(全部成功) ≈ 0.40 × 0.25 × 0.60 × 0.15 × (1 + 相关调整) ≈ **1.5-2.5%**

**结论**: 所有竞争威胁同时全部成功的概率极低(<3%)。更现实的是: **Canva占领低端(高概率) + Figma占领UI/UX(已发生) + AI-native部分替代中端(中概率) = Adobe在高端专业+企业端仍然稳固**。

---

## Chapter 19: Canva深度对标 — 免费Affinity+Magic Layers+动画收购

### 19.1 Canva的战略棋局

Canva在过去18个月的收购和产品布局构成了一个清晰的战略:

```
2024: 收购Affinity(专业套件) → 免费化 → 消灭Adobe价格壁垒
2025.10: 自有设计模型 → 生成可编辑多层设计(非平面图) → 差异化
2026.2: 收购Cavalry(动画) + MangoAI(视频优化) → 进军After Effects/Premiere领域
2026.3: Magic Layers → 将平面AI生成转为可编辑多层 → 直接挑战PS核心
```

**这不是渐进竞争——这是全面进攻。** Canva正在系统性地攻击Creative Cloud的每个产品:
- Affinity Photo → vs Photoshop
- Affinity Designer → vs Illustrator
- Affinity Publisher → vs InDesign
- Cavalry → vs After Effects
- MangoAI → vs Premiere Pro
- Magic Layers → vs PS的多层编辑核心

### 19.2 Canva能赢到什么程度?

**Canva能赢的市场**: 非专业创作者、小企业、教育、简单营销内容
**Canva赢不了的市场**: 大型企业品牌治理、高端印刷/出版、专业视频后期、企业级工作流

**Adobe的"生命线"不在产品功能, 在于**:
1. Fortune 500的98%渗透率 → 替换成本太高
2. PSD/AI/INDD文件积累 → 历史锁定
3. GenStudio+Foundry → 企业定制化(Canva做不到)
4. Content Credentials → 品牌安全(Canva没有等价物)

---

## Chapter 20: PtW量化评分 (v18.0 QG-07.5)

### 20.1 Playing to Win: Adobe vs 关键竞争者

| 维度 | Adobe | Canva | Figma | 评分差 |
|------|-------|-------|-------|--------|
| **产品广度** | 20+ (CC全套+DC+DX) | 1平台+Affinity | 8产品(设计) | ADBE +++ |
| **AI能力** | Firefly+25+模型聚合 | 自有设计模型+Magic | Figma Make | ADBE ++ |
| **企业渗透** | 98% F500 | <50% F500 | ~60% F500(UI/UX) | ADBE +++ |
| **价格竞争力** | $55/月(高) | $13/月+免费 | $15/月 | ADBE --- |
| **用户体验/易用性** | 中(学习曲线) | 极高(零门槛) | 高(协作优先) | ADBE -- |
| **品牌安全/合规** | 极强(IP赔偿+CAI) | 弱 | 中 | ADBE +++ |
| **增速** | +12% | +35% | +41% | ADBE --- |

**PtW评分**: Adobe 35/50 | Canva 32/50 | Figma 30/50

**Adobe在"能力赢面"上领先, 在"速度赢面"上落后。** 这意味着Adobe有更多"棋子", 但Canva和Figma走棋更快。在AI时代, 速度可能比棋子数量更重要。

---

## Chapter 21: Claude Code / Vibe Coding / AI Agent — 软件行业结构性冲击

### 21.1 为什么这章很重要

这不是"又一个竞争者分析"——Claude Code/Cursor/vibe coding代表的是**创意软件行业的底层结构正在变化**。之前的竞争(Canva/Figma/Midjourney)是"谁的工具更好", 而vibe coding是"用户还需不需要工具"。

### 21.2 Vibe Coding现象的规模

| 指标 | 数值 | 来源 |
|------|------|------|
| AI编码工具市场规模 | $4.7B (2025) | 行业报告 |
| AI编码工具活跃用户 | ~10M+ | GitHub Copilot 4.7M + Cursor + Claude Code |
| 开发者AI使用率 | 95%每周, 75%>半数工作 | 行业调查 |
| Y Combinator W2025 | 21%代码库91%+由AI生成 | YC数据 |
| Claude Code市场份额 | 46%(最受欢迎) | DEV Community |

### 21.3 对Adobe的六条传导路径

**路径1: 非设计师直接生成应用UI → Adobe设计工具需求↓ (利空)**

```
Claude Code/Cursor → 用自然语言描述 → AI生成完整React/Swift UI
→ 不经过Figma/XD设计稿 → 设计→开发的handoff被消除
```

**影响范围**: 主要影响Adobe XD(已基本被Figma取代)和Figma, 对PS/AI/Pr影响较小。

**量化估计**: 约5-10%的新web/app项目可能跳过独立设计阶段, 直接从vibe coding到成品。但这些项目原本就多用Figma而非Adobe → 对Adobe的直接冲击有限。

**路径2: AI编码降低替代品开发门槛 → 创意工具碎片化↑ (利空)**

```
AI编码让任何团队可以快速开发创意工具
→ 垂直领域的niche创意工具涌现(餐厅菜单设计/电商主图生成/社媒模板)
→ 通用型Creative Cloud面临"千刀万剐"
```

**影响范围**: 主要影响Adobe Express和CC低端市场。高端专业市场(影视后期/出版)受影响小。

**路径3: 更多应用/网站被建造 → 设计资产需求↑ → Firefly API (利好)**

```
AI编码→10x更多应用/网站被建造 → 每个应用需要图标/图片/品牌素材
→ 总设计资产需求爆发 → Firefly API/Adobe Stock需求↑
```

**量化估计框架**:
- AI编码活跃用户~10M × 人均5项目/年 × 60%需要设计资产 × 20个资产/项目
- = **600M个新增设计资产需求/年**
- 其中流向Adobe(Firefly API+Stock): ~15-25% = 90-150M个
- 按$0.005-0.05/资产计算 = **$0.5M-7.5M增量收入** (目前微乎其微, 但随AI编码规模扩大可能增长)

**路径4: AI agent调用Firefly API → 基础设施化 (利好)**

```
企业部署AI agent做内容 → agent需要调用创意API生成图片/视频
→ Firefly Services API成为AI agent的"创意后端"
→ Adobe从"卖seat给人"变为"卖API给AI系统"
```

**这是最深远的影响路径**。如果AI agent成为主要的"内容创造者", Adobe的客户从"30M人类订阅者"变为"百万个AI agent", 收入模式从seat转为API调用量。

**Adobe已在布局**: Firefly Services API + AEP Agent Orchestrator + Nvidia合作。ChatGPT预览Firefly co-pilot功能。

**路径5: Claude Code + 企业自建内容系统 → 绕过Creative Cloud (利空)**

```
企业IT团队用Claude Code构建内部内容生成系统
→ 调用开源模型(Stable Diffusion) + 自有品牌数据
→ 不再需要Creative Cloud license
```

**概率评估**: 目前低(<5%的企业会这样做), 因为:
1. 自建系统的维护成本>CC订阅
2. 版权/合规风险(开源模型训练数据不透明)
3. 缺乏Adobe级别的品牌治理功能

**但3-5年后可能升至15-20%**, 尤其是技术型企业(科技/互联网公司)。

**路径6: AI编码加速Canva/Figma迭代 → 竞争强度↑ (利空)**

```
Canva/Figma的工程团队也在使用Claude Code/Cursor
→ 产品迭代速度提升2-3x → 功能差距更快缩小
→ Adobe的功能护城河侵蚀加速
```

**这是最容易被忽视的路径**: AI编码不只影响Adobe——它加速了所有竞争对手的产品开发。在AI编码时代, **大公司的研发规模优势被削弱**(小团队+AI可以做到大团队的产出), 而小公司的速度优势被放大。

### 21.4 Adobe在AI编码时代的净定位

| 路径 | 方向 | 量级 | 时间窗口 | 确定性 |
|------|------|------|---------|--------|
| 1. 非设计师生成UI | 利空 | 低 | 已发生 | ★★★★ |
| 2. 工具碎片化 | 利空 | 中 | 12-24月 | ★★★ |
| 3. 设计资产需求↑ | 利好 | 低(目前) | 12-36月 | ★★★ |
| 4. AI agent调用API | 利好 | 高(潜在) | 24-48月 | ★★ |
| 5. 企业自建系统 | 利空 | 低 | 36月+ | ★★ |
| 6. 竞对加速迭代 | 利空 | 中 | 已发生 | ★★★★ |

**净评估**: 短期利空(路径1+2+6已在发生), 长期取决于路径4(基础设施化)能否兑现。**Claude Code对Adobe不是直接竞争关系, 而是改变了竞争的底层规则。**

### 21.5 对AIAS框架的校准

基于Claude Code/vibe coding分析, 需要微调AIAS评分:
- CC消费/SMB的S3(工作流绕过): 维持-2(vibe coding主要绕过的是设计→开发handoff, 不是PS编辑)
- CC专业的S3: 维持-1(专业创意不会用vibe coding替代)
- **新增**: 全业务线需加入"竞对加速因子" → 将AIAS框架中的所有S评分视为**动态恶化**而非静态

---

## Chapter 22: 前瞻分析 — SaaS座位→API转型时间线

### 22.1 Adobe的商业模式转型路线图

```
FY2025: 92% Seat | 3% Credit | 5% Enterprise/API
FY2027E: 85% Seat | 8% Credit | 7% Enterprise/API
FY2029E: 75% Seat | 12% Credit | 13% Enterprise/API (交叉点)
FY2032E: 60% Seat | 15% Credit | 25% Enterprise/API
```

### 22.2 CQ-2验证: 交叉点估算

**定义**: "交叉点"是新模式收入(Credit+API)的增长能完全抵消旧模式(Seat)收入损失的时刻。

| 指标 | 假设 | 理由 |
|------|------|------|
| Seat收入年衰减率 | -2~3%/年(从FY2028开始) | SaaSpocalypse+AI seat压缩, 但企业端稳定 |
| Credit收入增速 | +60-80%/年 | 从小基数快速增长, 使用量驱动 |
| API收入增速 | +40-60%/年 | 企业AI采纳+AI agent部署 |

**三种情景**:

| 情景 | 交叉点 | 概率 |
|------|--------|------|
| 乐观: Seat衰减慢(-1%/年) + API增长快(+80%) | **FY2027** | 20% |
| 基准: Seat衰减中(-2%/年) + API增长中(+50%) | **FY2029** | 50% |
| 悲观: Seat衰减快(-4%/年) + API增长慢(+30%) | **FY2032+** | 30% |

**对CQ-2的回答**: 概率加权交叉点 ≈ **FY2029**(与Phase 0.75预判一致)。

### 22.3 转型期财务特征

转型期(FY2026-2030)的财务可能呈现:
1. **收入增速**: 从+12%降至+8-10%(Seat减速, Credit/API尚小)
2. **毛利率**: 从89%降至86-88%(Credit/API毛利率<Seat)
3. **OPM**: 从47%降至43-45%(投资+毛利率下降)
4. **FCF**: 增速从+10%降至+5-8%

**这恰好对应市场Forward PE 9.6x隐含的预期** — 市场在定价转型期的"过渡性低增长"。**问题是: 市场是否过度折价了转型期的长度和深度?**

---

## Chapter 23: 品质评估D维度 (Phase 3嵌入)

### 23.1 前瞻增长评估

| 维度 | 评分 | 理由 |
|------|------|------|
| TAM扩张能力 | 7/10 | $205B TAM仅12%渗透, AI扩大低端TAM |
| 有机增长引擎 | 7/10 | AI功能驱动升级+企业多产品渗透 |
| 新市场开拓 | 6/10 | Firefly API+GenStudio开辟新市场, 但基础设施化尚未证明 |
| 创新管道 | 7/10 | Firefly Foundry+Project Moonlight+Acrobat Studio是强管线 |

### 23.2 AI韧性评估 (AIAS D2-AI)

**AI韧性分 = 10 + 公司级净影响(+1.04) ÷ 2 = 5.5/10**

| 等级 | 含义 |
|------|------|
| 5-7 | AI中性或轻度受益, 护城河基本不变 |

Adobe落在"AI中性偏受益"区间——不是赢家也不是输家, 而是**正在重组的公司**。
