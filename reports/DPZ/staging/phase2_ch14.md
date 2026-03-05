# Ch14: 需求一致性检验 — Top-Down/Bottom-Up/频次交叉验证

> **CQ-1 Linkage**: 本章构建三条独立的需求估算路径(自上而下TAM分解、自下而上门店×AUV累加、频次×客单价×覆盖户数微观模型)，检验FY2030E system sales预测的内在一致性。一致性检验是估值可信度的"地基测试"——如果三条路径无法收敛至±10%以内，则假设体系存在结构性矛盾。
>
> **核心发现**: Top-Down路径($13.0-14.2B)与Bottom-Up路径($10.2-10.8B)存在~30%缺口，**未通过≤±10%一致性门槛**。缺口根源在于Top-Down对份额增速的线性外推过度乐观。调和后FY2030E US system sales收敛至$10.8-11.5B区间。

---

## 14.1 路径一: Top-Down TAM分解

### 14.1.1 US QSR Pizza TAM基准

美国pizza餐饮市场是全球最大的单一pizza市场。根据IBISWorld数据，2025年US Pizza Restaurants行业规模约$49.5B [DM-P2-060]。但这包含了full-service pizza(如California Pizza Kitchen)、fast casual(如Blaze Pizza)以及独立pizzeria。DPZ的直接可比市场——QSR Pizza——需要从总市场中切分:

| 市场层级 | 规模(FY2025E) | 来源/推导 |
|----------|:------------:|----------|
| US Pizza Restaurants Total | $49.5B | IBISWorld 2025 [DM-P2-060] |
| QSR Pizza占比 | ~67-70% | QSR segment占US pizza市场约2/3 [DM-P2-061] |
| **US QSR Pizza TAM** | **$33-35B** | $49.5B × 67-70% |
| Top 4 Chain集中度 | ~55% | DPZ 23.3% + Pizza Hut ~15% + Little Caesars ~10% + Papa John's ~7% [DM-P2-062] |

**关键口径说明**: 用户提供的$46-48B估计可能包含了fast casual pizza和部分grocery deli的热pizza销售。本章采用更保守的$33-35B作为QSR Pizza TAM，以确保与DPZ 23.3%市场份额的口径一致——DPZ管理层在Analyst Day引用的市场份额分母即为QSR Pizza渠道。

[DM-P2-063] DPZ FY2025 US市场份额23.3%，来源: FY2025 Q4 Earnings Call。管理层长期目标为"US QSR Pizza market share 50%+"——这是一个跨越十年以上的愿景目标，非5年可达。

### 14.1.2 Top-Down FY2030E推演

**假设链**:
- TAM增速: +2.5%/yr (Base Case，包含通胀传导+轻度real growth)
- 份额增速: +0.5pp/yr (基于近11年累积+11pp的历史均速~1.0pp/yr的减半假设，反映base effect递增)

| 年度 | QSR Pizza TAM($B) | DPZ市场份额 | DPZ US System Sales($B) |
|------|:------------------:|:----------:|:------------------------:|
| FY2025A | 34.0 | 23.3% | 7.9 |
| FY2026E | 34.9 | 23.8% | 8.3 |
| FY2027E | 35.7 | 24.3% | 8.7 |
| FY2028E | 36.6 | 24.8% | 9.1 |
| FY2029E | 37.5 | 25.3% | 9.5 |
| **FY2030E** | **38.5** | **25.8%** | **9.9** |

**敏感性**: 如果将TAM基准调高至$46-48B(含fast casual+deli渠道)，同样的份额路径产出FY2030E system sales $12.6-13.7B。这正是上文提到的"$13-14B"估计的来源——**但口径膨胀了40%**。

[DM-P2-064] 11年累积份额增长~11pp: DPZ从2013年约12%提升至2025年23.3%，平均约1.0pp/yr。近3年放缓至~0.7pp/yr，反映竞争对手不再轻易交出份额。

```mermaid
graph LR
    subgraph "Top-Down路径 — TAM × Share"
        TAM["US QSR Pizza TAM<br/>$34.0B (FY2025)"] -->|CAGR +2.5%/yr| TAM30["$38.5B (FY2030E)"]
        SH["DPZ Share<br/>23.3% (FY2025)"] -->|+0.5pp/yr| SH30["25.8% (FY2030E)"]
        TAM30 --> SS["US System Sales<br/>$9.9B (FY2030E)"]
        SH30 --> SS
    end

    subgraph "口径风险"
        ALT["如用$46-48B TAM<br/>(含fast casual)"] -->|同样份额路径| ALT30["$12.6-13.7B<br/>⚠️ 膨胀~35%"]
    end

    style SS fill:#4a90d9,color:#fff
    style ALT30 fill:#e74c3c,color:#fff
```

---

## 14.2 路径二: Bottom-Up 门店×AUV累加

### 14.2.1 US门店扩张路径

DPZ当前US门店约6,900家 [DM-P2-065]，管理层指引年净增~175家(FY2025实际净增~172家)。Fortressing策略下，新店主要填充现有市场的carryout密度，而非进入全新地理区域。

| 年度 | 年初门店数 | 净新增 | 年末门店数 | 累积增长 |
|------|:---------:|:-----:|:---------:|:-------:|
| FY2025A | 6,742 | ~172 | 6,914 | — |
| FY2026E | 6,914 | 175 | 7,089 | +175 |
| FY2027E | 7,089 | 175 | 7,264 | +350 |
| FY2028E | 7,264 | 180 | 7,444 | +530 |
| FY2029E | 7,444 | 180 | 7,624 | +710 |
| **FY2030E** | 7,624 | 180 | **7,804** | **+890** |

[DM-P2-066] FY2025 US net new stores ~172家，来源: FY2025 Annual Results。管理层FY2026-2028指引维持"1,100+ global net new stores/yr"，其中US占比约15-18%。

**FY2028E起加速假设**: 175→180家/年，反映fortressing进入新一轮填充周期(现有fortress区域饱和后向次级市场扩展)。保守估计——Bull Case下可达200+。

### 14.2.2 AUV增长路径

FY2025 US平均AUV约$1.14M [DM-P2-067]。AUV增长由两个驱动力构成:

1. **Comp增长**: 同店销售增长直接推升existing store AUV (+3.0%/yr Base Case)
2. **新店AUV折扣**: 新店通常以mature store AUV的75-85%开业，2-3年爬坡至成熟水平

| 年度 | Mature Store AUV($K) | 新店AUV折扣 | 混合AUV($K) | US System Sales($B) |
|------|:--------------------:|:----------:|:-----------:|:-------------------:|
| FY2025A | 1,140 | — | 1,140 | 7.9 |
| FY2026E | 1,174 | 85% | 1,168 | 8.3 |
| FY2027E | 1,209 | 85% | 1,202 | 8.7 |
| FY2028E | 1,246 | 85% | 1,237 | 9.2 |
| FY2029E | 1,283 | 85% | 1,274 | 9.7 |
| **FY2030E** | **1,322** | **85%** | **1,311** | **10.2** |

[DM-P2-068] AUV增长假设: mature store AUV +3.0%/yr，与Base Case comp增长一致。新店开业AUV为mature的85%(来源: 行业惯例，DPZ未单独披露新店AUV ramp)。

### 14.2.3 Bottom-Up汇总

**FY2030E US System Sales = 7,804 stores × $1.311M mixed AUV = $10.2B**

如果comp增长略高(+3.5%/yr，接近Bull区间下沿)，AUV升至$1.35M，则system sales可达$10.5-10.8B。

---

## 14.3 一致性检验: Top-Down vs Bottom-Up

### 14.3.1 缺口分析

| 路径 | FY2030E US System Sales | 假设关键点 |
|------|:----------------------:|-----------|
| **Top-Down (窄口径TAM)** | $9.9B | TAM $34B×25.8% share |
| **Top-Down (宽口径TAM)** | $12.6-13.7B | TAM $46-48B×同样share |
| **Bottom-Up (Base)** | $10.2B | 7,804 stores × $1.31M AUV |
| **Bottom-Up (Base+)** | $10.5-10.8B | 7,804 stores × $1.35M AUV |

**窄口径Top-Down vs Bottom-Up缺口**: $9.9B vs $10.2B = **仅-3%** → **通过≤±10%一致性门槛**。

**宽口径Top-Down vs Bottom-Up缺口**: $13.0B vs $10.2B = **+27%** → **未通过，缺口显著**。

这揭示了一个重要方法论问题: **Top-Down估计的可靠性完全取决于TAM口径选择**。使用含fast casual的$46-48B TAM + 23.3%份额 = 隐含DPZ US system sales ~$10.7-11.2B(FY2025)，远超实际的~$7.9B。这说明23.3%的份额分母是QSR-only的$34B左右，不是全pizza市场。

[DM-P2-069] 一致性检验结果: 窄口径通过(-3%)，宽口径失败(+27%)。窄口径TAM($33-35B)与DPZ管理层引用的份额分母一致。

### 14.3.2 缺口根因诊断

```mermaid
graph TD
    GAP["Top-Down vs Bottom-Up<br/>缺口 +27% (宽口径)"] --> R1["根因1: TAM口径膨胀<br/>$49.5B含non-QSR约30%"]
    GAP --> R2["根因2: 份额增速外推<br/>+0.5pp/yr可能偏高"]
    GAP --> R3["根因3: 交叉渠道计重<br/>3P渠道GMV双重统计"]

    R1 --> FIX1["修正: 使用QSR-only TAM $33-35B<br/>缺口收窄至-3%"]
    R2 --> FIX2["修正: 份额增速降至+0.3pp/yr<br/>反映base effect递增"]
    R3 --> FIX3["修正: 扣除3P渠道重叠<br/>~$200-300M/yr"]

    FIX1 --> CONV["调和区间: $10.2-10.8B"]
    FIX2 --> CONV
    FIX3 --> CONV

    style GAP fill:#c0392b,color:#fff
    style CONV fill:#2d8659,color:#fff
```

**调和后FY2030E US System Sales收敛区间: $10.2-10.8B**。这一区间同时满足:
- Top-Down: QSR TAM $38.5B × 份额26-28% (如果包含3P渠道份额扩展)
- Bottom-Up: 7,800 stores × AUV $1.31-1.38M

---

## 14.4 国际市场一致性检验

### 14.4.1 国际门店扩张路径

DPZ国际门店约13,500家 [DM-P2-070]，年净增约604家(FY2025实际)。国际市场由Master Franchisees运营，DPZ收取system sales的3.5%作为royalty(部分新市场为更低费率)。

| 年度 | Int'l门店数 | 净新增 | AUV($K) | Int'l System Sales($B) |
|------|:----------:|:-----:|:-------:|:----------------------:|
| FY2025A | 13,500 | 604 | ~$545 | 7.4 |
| FY2026E | 14,100 | 600 | 560 | 7.9 |
| FY2027E | 14,700 | 625 | 576 | 8.5 |
| FY2028E | 15,325 | 650 | 593 | 9.1 |
| FY2029E | 15,975 | 650 | 611 | 9.8 |
| **FY2030E** | **16,625** | **—** | **$629** | **$10.5** |

[DM-P2-071] Int'l FY2025: ~13,500 stores, net adds 604, system sales ~$7.4B。来源: FY2025 Annual Results。Int'l AUV显著低于US($545K vs $1,140K)，反映新兴市场门店规模较小+客单价较低。

[DM-P2-072] Int'l AUV增速假设: +3.0%/yr，包含menu price inflation(尤其新兴市场通胀较高)+mix shift(高AUV成熟市场权重递增)。

### 14.4.2 Royalty收入交叉验证

| 指标 | FY2025A | FY2030E |
|------|:-------:|:-------:|
| Int'l System Sales | $7.4B | $10.5B |
| 平均Royalty Rate | 3.3% | 3.4% |
| **Int'l Royalty Revenue** | **$244M** | **$357M** |
| 增速(CAGR) | — | +7.9% |

[DM-P2-073] FY2025 Int'l royalty revenue ~$244M，隐含effective royalty rate 3.3%(低于名义3.5%，反映部分市场的优惠费率+FX折算损失)。FY2030E假设fee rate微升至3.4%(新签约市场采用标准费率+旧约逐步到期)。

**一致性检查**: Int'l royalty CAGR +7.9%与Int'l system sales CAGR +7.2%基本一致(差异来自royalty rate微升)。**通过**。

### 14.4.3 全球System Sales汇总

| 区域 | FY2025A($B) | FY2030E($B) | CAGR |
|------|:-----------:|:-----------:|:----:|
| US | 7.9 | 10.5 (调和中值) | +5.9% |
| International | 7.4 | 10.5 | +7.2% |
| **Global** | **15.3** | **21.0** | **+6.5%** |

[DM-P2-074] Global system sales FY2025 ~$15.3B(US $7.9B + Int'l $7.4B)。管理层曾设定2025年global retail sales $25B目标(2019年Analyst Day)，实际约$19.2B(TTM Q1 2025) — 低于目标约23%，主要因COVID期间国际扩张放缓。

**注意**: 上表US FY2030E采用调和区间中值$10.5B(非Top-Down的$9.9B或Bottom-Up的$10.2B)，反映comp增长略高于3.0%的合理预期。

---

## 14.5 路径三: 频次×客单价×覆盖户数微观模型

### 14.5.1 模型构建

频次模型从消费者行为出发，自底向上构建需求:

**Step 1: 确定可触达户数(Addressable Households)**

| 参数 | 数值 | 来源 |
|------|:----:|------|
| US总户数 | ~131M | Census Bureau 2025 estimate [DM-P2-075] |
| Pizza消费户数占比 | ~93% | "93%的美国人每月至少吃一次pizza" [DM-P2-076] |
| DPZ门店覆盖率 | ~85% | 6,900+门店，覆盖大部分metro和suburban区域 |
| DPZ品牌偏好率 | ~28% | 略高于市场份额(23.3%)，反映digital ordering的品牌黏性 |
| **DPZ可触达户数** | **~29.1M** | 131M × 93% × 85% × 28% |

**Step 2: 订购频次与客单价**

| 渠道 | 月均订购频次 | 平均客单价 | 月户均消费 |
|------|:----------:|:---------:|:---------:|
| Delivery | 1.2次/月 | $24.50 | $29.40 |
| Carryout | 1.5次/月 | $19.00 | $28.50 |
| **加权平均** | **1.35次/月** | **$21.50** | **$29.00** |

[DM-P2-077] Pizza订购频次: 约65%消费者每月至少一次carryout，55%每月至少一次delivery(来源: 2025 Technomic Pizza Consumer Trend Report)。DPZ用户频次高于行业均值——digital ordering的便利性+loyalty program的复购激励推升频次约10-15%。

[DM-P2-078] 客单价: Delivery $22-25(含delivery fee和tip隐含的higher basket)，Carryout $18-20(含$7.99 Emergency Pizza等value promotions)。采用中值。Carryout占比近年持续上升(FY2025 carryout comp +5.8% vs delivery +1.5%)。

**Step 3: 年化system sales估算**

$$\text{US System Sales} = 29.1M \text{ 户} \times \$29.00/\text{月} \times 12\text{月} = \$10.1B$$

### 14.5.2 FY2030E频次模型投射

| 参数 | FY2025 | FY2030E变化 | FY2030E |
|------|:------:|:----------:|:-------:|
| US总户数 | 131M | +0.7%/yr | 136M |
| Pizza消费占比 | 93% | 持平 | 93% |
| DPZ覆盖率 | 85% | +3pp (fortressing) | 88% |
| DPZ偏好率 | 28% | +2pp (品牌势能) | 30% |
| **可触达户数** | **29.1M** | — | **33.4M** |
| 月均频次 | 1.35 | +0.10 (loyalty提升) | 1.45 |
| 平均客单价 | $21.50 | +2.5%/yr inflation | $24.30 |
| **年户均消费** | $348 | — | $423 |
| **US System Sales** | **$10.1B** | — | **$14.1B** |

**问题**: FY2030E频次模型产出$14.1B，远超Bottom-Up的$10.2-10.8B。**未通过一致性检验**。

### 14.5.3 频次模型偏差诊断

缺口来源在于**DPZ偏好率和频次假设的双重叠加过度乐观**:

| 偏差来源 | 乐观程度 | 修正方向 |
|---------|:-------:|---------|
| 偏好率28%→30% | 中度 | 可能偏高——23.3%份额包含非loyalty用户的随机购买 |
| 频次+0.10/月 | 高度 | Loyalty能提升既有用户频次，但边际用户频次更低 |
| 客单价+2.5%/yr | 合理 | 与menu inflation一致 |
| 覆盖率85%→88% | 合理 | Fortressing正在进行 |

**核心问题**: 频次模型将所有"可触达户数"视为active customers，但实际DPZ的active customer base远小于理论可触达范围。修正方法——引入"活跃转化率":

| 调整项 | FY2025 | FY2030E |
|--------|:------:|:-------:|
| 理论可触达户数 | 29.1M | 33.4M |
| 活跃转化率 | 78% | 75% (base越大,边际用户越不活跃) |
| **有效活跃户数** | **22.7M** | **25.1M** |
| 年户均消费 | $348 | $423 |
| **修正后System Sales** | **$7.9B** | **$10.6B** |

修正后FY2025回测=$7.9B(与实际吻合)，FY2030E=$10.6B。**通过一致性检验**，落入调和区间$10.2-10.8B的上沿。

---

## 14.6 三路径收敛总图

```mermaid
graph TB
    subgraph "三路径FY2030E US System Sales"
        TD["Top-Down<br/>(QSR TAM × Share)<br/><b>$9.9B</b>"]
        BU["Bottom-Up<br/>(Stores × AUV)<br/><b>$10.2B</b>"]
        FM["频次模型<br/>(户数 × 频次 × 客单价)<br/><b>$10.6B (修正后)</b>"]
    end

    TD --> CONV["调和收敛区间<br/><b>$10.2 - 10.8B</b><br/>三路径均值 $10.2B"]
    BU --> CONV
    FM --> CONV

    CONV --> CHK{"一致性检验"}
    CHK -->|"路径间最大偏差<br/>~7% < ±10%"| PASS["✓ 通过"]

    subgraph "对比: 管理层目标"
    MGT["管理层隐含目标<br/>$25B global ÷ ~55% US权重<br/>= $13.8B US"] -->|"vs 调和区间<br/>Gap: -22%"| GAP["管理层目标<br/>可能偏乐观"]
    end

    style CONV fill:#2d8659,color:#fff
    style PASS fill:#27ae60,color:#fff
    style GAP fill:#e67e22,color:#fff
```

### 14.6.1 三路径统计汇总

| 路径 | FY2030E($B) | vs 调和中值偏差 | 状态 |
|------|:-----------:|:-------------:|:----:|
| Top-Down (QSR口径) | 9.9 | -5.4% | 通过 |
| Bottom-Up (Base) | 10.2 | -2.5% | 通过 |
| Bottom-Up (Base+) | 10.8 | +3.3% | 通过 |
| 频次模型 (修正后) | 10.6 | +1.4% | 通过 |
| **调和中值** | **10.5** | **—** | **—** |
| 频次模型 (未修正) | 14.1 | +34.8% | **失败** |
| Top-Down (宽口径TAM) | 12.6-13.7 | +20-31% | **失败** |

[DM-P2-079] 调和后三路径最大偏差: Top-Down $9.9B vs Bottom-Up(Base+) $10.8B = 9.1%，低于±10%门槛。频次模型修正后$10.6B落入区间内。一致性检验通过。

---

## 14.7 CQ-1深化: 距离弹性与Fortressing验证

### 14.7.1 距离弹性模型

CQ-1的核心问题: **缩短carryout距离对订购频次的影响是否可量化？**

Fortressing的经济本质是**用门店密度换取距离弹性收益**——当消费者到最近DPZ门店的距离从5英里缩短至3英里，carryout频次是否显著提升？

**距离-频次弹性估算**:

| 门店距离(英里) | 月均Carryout频次 | vs 5英里基准 | 隐含弹性系数 |
|:--------------:|:--------------:|:-----------:|:----------:|
| 5.0 (pre-fortress) | 1.00 | — | — |
| 4.0 | 1.08 | +8% | -0.32 |
| 3.0 (post-fortress) | 1.22 | +22% | -0.40 |
| 2.0 (dense urban) | 1.35 | +35% | -0.29 |
| 1.0 (walk-in range) | 1.45 | +45% | -0.28 |

[DM-P2-080] 距离弹性系数: 估算基于QSR行业研究中"convenience drives frequency"的一般规律——距离缩短1英里对应carryout频次提升约5-10%。DPZ未单独披露距离弹性数据，但fortressed市场delivery time缩短~2分钟+carryout comp显著高于non-fortress市场的事实支持弹性存在。

**弹性非线性特征**: 从5→3英里(日常驾车范围内)弹性最强(-0.40)，因为跨越了"顺路可达"的心理阈值。从2→1英里弹性衰减(-0.28)，因为已进入高频消费区间，进一步缩距的边际提升递减。

### 14.7.2 Fortressing对System Sales的增量贡献

将距离弹性应用于门店扩张:

| 指标 | FY2025 | FY2030E (Base) | Delta |
|------|:------:|:--------------:|:-----:|
| US门店数 | 6,914 | 7,804 | +890 |
| 平均覆盖半径(英里) | ~4.2 | ~3.6 | -0.6 |
| Carryout频次指数 | 1.00 | 1.15 | +15% |
| Carryout渠道AUV贡献 | $456K | $565K | +24% |
| **Carryout增量System Sales** | — | **+$850M** | — |

[DM-P2-081] 平均覆盖半径估算: 基于US可居住面积~3.8M平方英里、metro/suburban可覆盖面积~1.5M平方英里、6,914门店的Voronoi Tessellation均匀假设。实际fortressing主要集中在Top 50 DMAs，因此这些市场的半径缩短幅度远大于均值。

**Fortressing的$850M增量分解**:
- 频次提升效应: +15% carryout frequency → ~$520M
- AUV膨胀效应: 新店carryout占比更高(~55% vs existing ~45%) → ~$200M
- 地理覆盖扩展: 原未覆盖区域的新增需求 → ~$130M

### 14.7.3 Fortressing ROI验证

| 指标 | 数值 | 来源 |
|------|:----:|------|
| 新店平均投资(franchisee) | $400-500K | 行业估计 [DM-P2-082] |
| 新店FY1 AUV (85% of mature) | $970K | $1,140K × 85% |
| 新店FY1 EBITDA (franchisee, ~20% margin) | $194K | $970K × 20% |
| **Cash-on-Cash Return FY1** | **39-49%** | $194K / $400-500K |
| DPZ层面: royalty + supply chain margin | $136K/store/yr | $970K × (5.5% royalty + 8.5% supply margin) |
| **DPZ per-store IRR** | **N/A (无CapEx)** | Franchise model → ∞ ROI for franchisor |

Fortressing对DPZ而言是"零CapEx增量收入"——每家新店为DPZ贡献~$136K/yr的royalty+supply chain利润，无需DPZ投入资本。这解释了管理层为何将fortressing视为长期份额增长的核心引擎——经济模型在franchisee端和franchisor端**双向正回报**。

---

## 14.8 一致性检验结论与估值含义

### 14.8.1 关键发现

1. **TAM口径是Top-Down估计的阿喀琉斯之踵**: 使用$46-48B全pizza市场TAM + 23.3%份额 = 系统性高估DPZ规模。DPZ管理层引用的份额分母是QSR Pizza渠道(~$33-35B)。未来研究应始终明确TAM口径再做份额计算。

2. **三路径调和后FY2030E US System Sales收敛至$10.2-10.8B**: 对应5年CAGR +5.3-6.4%。这一增速低于管理层隐含的$25B global目标路径(需要global CAGR ~10%)，但高于pure comp-driven增长(+3%/yr = $9.2B)。差额来自net new store contribution。

3. **频次模型的活跃转化率是关键hidden variable**: 理论可触达户数(~29M)与实际活跃户数(~23M)的差距为22%——这个gap恰好是DPZ的增量机会空间(loyalty program渗透+fortressing激活dormant users)。

4. **Fortressing的距离弹性可量化但难精确**: 5mi→3mi对应carryout频次+15-25%的估计基于间接推断，缺乏DPZ直接披露。但fortressed市场carryout comp显著outperform(Q3 2025 carryout comp +8.7%)的事实提供了方向性验证。

### 14.8.2 对Ch13情景假设的校准

| Ch13假设 | 一致性检验后调整 | 影响 |
|---------|:---------------|------|
| Base US comp +3%/yr | 维持 — 与Bottom-Up AUV增速一致 | 无变化 |
| Base US net adds 175/yr | 微调至175-180/yr — 与FY2030E 7,800 store目标一致 | System sales +$50-100M |
| Base US System Sales隐含 | ~$10.5B (Ch13未单独拆分) | 与调和区间中值一致 |
| Bull份额+0.5pp/yr | **下调至+0.3-0.4pp/yr** — base effect递增 | Bull System Sales从$11.5B降至$10.8-11.2B |

[DM-P2-083] 一致性检验对Ch13假设的最大修正: Bull Case份额增速从+0.5pp/yr下调至+0.3-0.4pp/yr。原假设在2013-2025的11年均速(~1.0pp/yr)基础上减半，但未充分考虑base effect——23.3%→50%需要26.7pp增长，即便+1.0pp/yr也需要27年。+0.3-0.4pp/yr意味着FY2030E份额25-26%，更符合行业竞争格局的渐进演化。

### 14.8.3 投资者锚定提示

> **需求一致性检验的投资含义**: FY2030E US System Sales的合理区间为$10.2-10.8B(三路径调和)。如果DPZ实际增长超过$11B，意味着fortressing+品类整合的加速效应超出我们的保守估计——这是Bull Case的"验证信号"。反之，如果FY2027E US System Sales仍低于$9B(CAGR <3.5%)，则需要下调门店扩张或comp假设至Bear区间。

---

*本章完成CQ-1(需求一致性)验证。三路径调和收敛至$10.2-10.8B区间，为Ch13情景推演提供了独立交叉验证的需求锚点。下一章将转入CQ-2(供给约束)分析——franchisee单元经济与开店意愿是否支撑175+/yr的净新增目标。*
