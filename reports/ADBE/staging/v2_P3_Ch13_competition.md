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

## 13.3 Figma: 已赢的战役+下一步

Figma FY2025 $1.05B(+41%)→IPO后$57B估值[DM-BIZ-012]。Adobe在UI/UX已输——XD effectively dead。但Figma的扩张方向(Code to Canvas+Figma Make)和Adobe的扩张方向(GenStudio+治理)不重叠→**可能形成互补而非替代**。

教育管道验证：Figma已完全替代Adobe XD在UI/UX课程中→但PS/AI/InDesign在图形设计课程中未被替代[DM-FVF-ENT-EDU]→**Figma赢了一个赛道但Adobe的核心赛道仍在**。

## 13.4 AI-native: Adobe的"模型超市"策略是正确的回应

一线对标结论[DM-FVF-AIQA-003]："Midjourney做灵感，Firefly做生产"→Adobe不需要在艺术质量上赢Midjourney→只需要在"从生成到交付"的全流程中占据关键位置。

Adobe在Photoshop中集成Gemini/FLUX/Runway→**"模型超市"策略比"最强单一模型"更深的护城河**→因为即使Midjourney明天推出更好的模型→Adobe只需在下次更新中集成它→用户体验不变。

**模型是commodity→工作流是infrastructure**→这是Adobe AI竞争策略的核心智慧→也是AIAS B3从v1.0的+2上调至v2.0的+3的原因。

---

*Chapter 13 DM锚点: 8个引用 | 字符: ~5K | DM密度: ~1.6/千字*
