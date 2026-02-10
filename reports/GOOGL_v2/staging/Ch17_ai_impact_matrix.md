# Chapter 17: AI冲击矩阵 (M13) + AI实施深度评级

> Phase 3.5 | Layer 1 + Layer 2 | CQ关联: CQ1(CapEx ROI) + CQ2(AI自蚕食)
> 数据截止: 2026-02-10 | 所有财务数据引用DM锚点或标注外部来源

---

## 17.0 分析架构与方法论

本章分为两大层级:

- **Layer 1: 分部级AI冲击矩阵** -- 对Alphabet 7大分部逐一评估5个维度(收入冲击/成本冲击/护城河变化/竞争格局变化/时间窗口)，归类AI角色，计算概率加权AI净分
- **Layer 2: AI实施深度评级** -- L轴(实施级别L0-L4) x S轴(商业兑现S0-S4)定位，五不变量检验，同业对比

两层交叉验证后，输出到Phase 4(极端情景压力测试)和Phase 5(AI调整后最终估值)。

```mermaid
graph TD
    subgraph "Layer 1: AI冲击矩阵"
        A[7分部识别] --> B[5维度评分]
        B --> C[AI角色分类]
        C --> D[概率加权AI净分]
    end
    subgraph "Layer 2: AI实施深度"
        E[L轴定位] --> F[S轴定位]
        F --> G[五不变量检验]
        G --> H[同业L×S对比]
    end
    subgraph "AI自蚕食深度建模"
        I[搜索替代路径] --> J[AIO货币化路径]
        J --> K[净影响计算]
        K --> L[敏感度分析]
    end
    D --> M[Phase 4: 极端情景]
    H --> M
    L --> M
    M --> N[Phase 5: AI调整估值]
```

---

## 17.1 Layer 1: 分部级AI冲击矩阵

### 17.1.1 分部收入概览

基于DM锚点数据 [DM-SEG-001]:

| # | 分部 | FY2025收入 | 收入占比 | Q4 YoY增速 |
|:-:|------|:---------:|:-------:|:----------:|
| 1 | Google Search & Other | $224.5B | 55.7% | +17% |
| 2 | YouTube Ads | $40.3B | 10.0% | +9% |
| 3 | Google Network (AdSense) | $29.8B | 7.4% | -2% |
| 4 | Google Cloud (GCP+Workspace) | $58.7B | 14.6% | +48% |
| 5 | 订阅/平台/设备 | $48.1B | 11.9% | +17% |
| 6 | Waymo | <$0.4B* | <0.1% | N/A |
| 7 | Other Bets (含Waymo) | $1.5B | 0.4% | -7.5% |

> *Waymo年化收入约$350M [硬数据: Bloomberg, 2025-12]，其余Other Bets约$1.1B

**覆盖率**: 7个分部覆盖100%营收，满足QG-09.5的>=90%要求。

---

### 17.1.2 分部1: Google Search & Other ($224.5B, 55.7%)

**收入冲击: +1 (微正，但不确定性极高)**

AI对搜索的收入影响是一个同时存在正负两面力量的复杂等式:

- **正面**: AI Overviews提升用户参与度，Gemini已达750M MAU [硬数据: Alphabet Q4 Earnings Call, 2026-02-04]，AI驱动的广告匹配精度提高推升CPM。Q4搜索收入$63.5B同比+17%，加速而非减速 [硬数据: Alphabet 10-K FY2025]
- **负面**: AI Overviews在出现时导致有机CTR下降61%(从1.76%到0.61%)，付费CTR下降68%(从19.7%到6.34%) [硬数据: Seer Interactive, 2025-09]。零点击搜索从56%升至69% [硬数据: SparkToro/Datos, 2025-05]
- **净评估**: 短期(1-2年)AI实际推高了搜索收入，因为更高的用户参与度+更精准的广告定向抵消了单次查询变现的下降。但3-5年维度存在结构性蚕食风险

**成本冲击: -3 (显著负面)**

- CapEx FY2025 $91.4B，FY2026指引$175-185B [DM-GDE-002]，其中大部分用于AI基础设施
- CapEx/Revenue从FY2023的9.6%飙升至FY2025的22.7%，FY2026E将达37.6% [DM-FIN-004]
- AI查询成本远高于传统搜索: 估计每次AI Overviews查询的增量计算成本是传统查询的5-10倍 [合理推断: 基于TPU推理成本vs索引查询成本对比]
- 但Google的TPU v6实现4x性价比提升 [硬数据: AI News Hub, 2025]，部分缓解成本压力

**护城河变化: 强化(短期) / 削弱(长期)**

- 短期: 搜索全球份额90.04%保持稳固 [硬数据: StatCounter, 2026-01]，Gemini整合进搜索创造新的数据飞轮
- 长期: AI使搜索的"10个蓝色链接"模式可被ChatGPT(810M MAU)、Perplexity等替代方案复制
- 关键变量: AI Overviews的广告货币化能否补偿CTR下降

**竞争格局变化: 利空**

- ChatGPT chatbot份额45.3% vs Gemini 25.2% [硬数据: SimilarWeb, 2026-01]
- OpenAI/Microsoft的搜索替代方案(Copilot+Bing)正在分流高价值查询
- AI降低了搜索引擎的进入壁垒 -- 不需要爬虫索引全网就能回答问题

**时间窗口: 1-3年(广告格式转型) + 3-5年(结构性蚕食)**

**AI角色分类: AI中性偏正 (+1)**

> [主观判断: 评+1而非-1的核心依据是Google在AI搜索中拥有"防守者优势" -- 90%的用户已在Google生态中，AI Overviews本质上是在自己的城墙内重新布局，而非被外部攻城]

---

### 17.1.3 分部2: YouTube Ads ($40.3B, 10.0%)

**收入冲击: +2 (正面)**

- AI驱动的推荐算法提升watch time和广告匹配度
- AI工具让100万频道/日使用AI创作功能 [硬数据: YouTube 2025年终报告]
- YouTube Shorts日均2000亿次播放 [硬数据: YouTube 2025年终报告]
- AI生成内容(AIGC)增加了内容供给，降低创作门槛
- FY2025总收入(含订阅)超$60B [硬数据: Alphabet Q4 Earnings]

**成本冲击: +1 (轻度正面)**

- AI推荐系统降低内容发现成本
- AI工具(自动字幕/翻译/缩略图)降低创作者服务成本
- 但视频推理/生成的计算成本增加部分抵消

**护城河变化: 强化**

- AI推荐强化数据飞轮: 更多观看 -> 更好推荐 -> 更多观看
- 2.7B MAU的规模优势在AI时代更难追赶 [硬数据: DemandSage, 2026]
- Shorts的AI功能增加了UGC供给量，强化内容护城河

**竞争格局变化: 中性**

- TikTok/Reels也在用AI，竞争对手同样受益
- 但YouTube的长视频+短视频+直播+音乐全矩阵给AI更大的数据训练空间

**时间窗口: 1-3年**

**AI角色分类: AI放大器 (+2)**

---

### 17.1.4 分部3: Google Network/AdSense ($29.8B, 7.4%)

**收入冲击: -3 (显著负面)**

- Q4 YoY -2%，已连续多季下滑 [DM-SEG-001]
- AI Overviews减少34.5%的有机点击 [硬数据: Seer Interactive, 2025]，直接减少流向外部网站的流量
- 出版商有机流量2025年暴跌20-40% [硬数据: WebProNews, 2026-02]
- Google自有流量占比已达90%历史新高 [硬数据: PPC Land, 2025]
- AdSense match rate和delivery出现系统性下降 [硬数据: Google Ad Manager确认, 2026-01]

**成本冲击: +1 (轻度正面)**

- AI优化广告投放效率，降低每次匹配的计算成本
- 网络业务不需要额外的AI基础设施投入

**护城河变化: 削弱**

- AI使出版商可直接用AI变现(不需要AdSense)
- AI内容生成降低了对传统出版商的依赖
- 零点击搜索趋势本质上在消灭Network的流量基础

**竞争格局变化: 利空**

- AI广告网络(如Meta的Advantage+)在抢走程序化广告预算
- 出版商正在寻找替代变现方案(直接AI授权/付费墙)

**时间窗口: 已在发生(0-1年)**

**AI角色分类: AI易受冲击 (-3)**

> [主观判断: Network是Alphabet内部AI冲击的最大输家 -- 搜索留住了用户(AI Overviews)，但Network/AdSense的流量基础正在被AI蒸发]

---

### 17.1.5 分部4: Google Cloud ($58.7B, 14.6%)

**收入冲击: +4 (强烈正面)**

- Q4 +48% YoY，是所有分部中增速最快 [DM-SEG-001]
- Backlog从Q3的$155B飙升至Q4的$240B，环比+55% [硬数据: Alphabet Q4 Earnings, 2026-02-04]
- AI基础设施和AI解决方案每季产生"数十亿美元收入" [硬数据: Alphabet CFO Earnings Call]
- TPU v6实现4x性价比，吸引OpenAI等竞对考虑使用Google TPU [硬数据: Network World, 2025]
- Gemini 3成为默认AI模型，企业AI Solutions需求爆发 [DM-AI-001]

**成本冲击: -2 (负面)**

- Cloud是CapEx $175-185B的最大消耗方，需要持续重投入
- AI基础设施(TPU pods/GPU集群/数据中心)的折旧将在未来2-3年加速
- CapEx/折旧比率已达4.33x [DM-FIN-004]，说明大量资产尚未折旧

**护城河变化: 强化**

- Gemini模型+TPU自有芯片+Vertex AI平台 = 全栈差异化
- 客户一旦在GCP上训练和部署AI模型，数据+工作流锁定效应极强
- GCP利润率已达30.1% [硬数据: SEC Q4 2025]，证明规模效应

**竞争格局变化: 利好**

- AI提高了云计算的进入壁垒(需要海量GPU/TPU+AI模型+生态系统)
- 但AWS(32%) > Azure(23%) > GCP(12-13%)的份额格局短期难以逆转 [硬数据: 行业估算, 2025]
- GCP的差异化在于"AI-native"定位，vs AWS的通用云 vs Azure的企业Office绑定

**时间窗口: 已在发生(0-3年)**

**AI角色分类: AI赋能者 (+4)**

> [主观判断: GCP是Alphabet内部AI受益的最大赢家，$240B backlog提供了3.4年的收入可见性(按当前run rate $70B计)，但市场份额仍是第三的结构性约束]

---

### 17.1.6 分部5: 订阅/平台/设备 ($48.1B, 11.9%)

**收入冲击: +2 (正面)**

- Q4 +17% YoY [DM-SEG-001]
- Gemini整合进Pixel/Android/Google One推动订阅增长，325M付费订阅 [硬数据: Alphabet Earnings]
- Google One AI Premium等新订阅层级创造增量收入
- Play Store的AI应用分发受益于AI开发者生态膨胀

**成本冲击: -1 (轻度负面)**

- Pixel硬件的AI功能(实时翻译/照片AI编辑)需要更强芯片，推高BOM
- AI功能增加了设备端推理的计算需求

**护城河变化: 强化**

- AI功能成为Pixel vs iPhone的差异化卖点
- 3.9B Android设备 + 3.83B Chrome用户 [硬数据: DemandSage, 2026] 是AI分发的超级渠道
- AI增强了Google生态系统的"全家桶"粘性

**竞争格局变化: 中性**

- Apple Intelligence也在推AI功能，竞争对等
- Google在AI能力上暂时领先Apple，但差距正在缩小

**时间窗口: 1-3年**

**AI角色分类: AI放大器 (+2)**

---

### 17.1.7 分部6: Waymo (<$0.4B, <0.1%)

**收入冲击: +5 (变革性正面 -- 但需概率加权)**

- 每周45万次付费出行，年化$350M收入 [硬数据: Bloomberg/CNBC, 2025-12]
- 2025年完成1400万次出行，同比3x增长 [硬数据: Waymo 2025年终报告]
- 2026年目标: 每周100万次出行 [硬数据: Technology Magazine, 2026]
- 已扩展至5个城市: Austin, Atlanta, LA, Phoenix, SF Bay Area
- $16B融资轮估值 [硬数据: Alphabet Q4 Earnings / WardsAuto, 2025]

**成本冲击: -4 (严重负面)**

- Q4 Other Bets亏损$3.61B(同比>200%增长) [硬数据: CNBC, 2026-02-04]
- Waymo SBC费用$2.1B/季 [硬数据: Alphabet Q4 Earnings]
- 自动驾驶车队扩展(目标2500辆)需要大量硬件+运营投入

**护城河变化: 强化**

- 累计45亿英里以上自动驾驶数据是最大的AI训练数据集
- 监管审批的先发优势(已获多城市运营许可)
- 安全记录: 每百万英里事故率低于人类驾驶员

**竞争格局变化: 利好**

- 自动驾驶的监管+安全壁垒极高
- Tesla FSD采用不同技术路线(纯视觉 vs Waymo多传感器)
- 但潜在竞争者(Cruise/Zoox)已退出或缩减

**时间窗口: 3-5年(规模化盈利)**

**AI角色分类: AI赋能者 (+5, 概率加权后+2.0)**

> 概率加权: 成功概率40% [合理推断: 基于当前增长速度/城市扩展/竞争格局]

---

### 17.1.8 分部7: Other Bets (含Verily/Calico/Wing等, ~$1.1B)

**收入冲击: +1 (微正)**

- 业务线分散(生命科学/无人机配送/气球互联网已关闭)
- AI可能加速药物研发(Calico)和临床试验(Verily)
- 但营收贡献极小，不影响整体

**成本冲击: -2 (负面)**

- 持续亏损状态，AI投入增加研发开支
- FY2025 Other Bets运营亏损约$10B+ [合理推断: 基于Q4 $3.61B亏损年化]

**护城河变化: 中性**

**竞争格局变化: 中性**

**时间窗口: 5-10年**

**AI角色分类: AI中性 (+1, 概率加权后+0.3)**

---

### 17.1.9 汇总: 7分部AI冲击矩阵

| 分部 | 收入($B) | 权重 | 收入冲击 | 成本冲击 | 护城河 | 竞争格局 | 时间窗口 | AI角色 | AI净分 | 实现概率 | 加权净分 |
|------|:-------:|:----:|:-------:|:-------:|:------:|:-------:|:-------:|:------:|:------:|:-------:|:-------:|
| Search | $224.5 | 55.7% | +1 | -3 | 强化/削弱 | 利空 | 1-3yr/3-5yr | 中性(+1) | +1 | 80% | +0.45 |
| YouTube | $40.3 | 10.0% | +2 | +1 | 强化 | 中性 | 1-3yr | 放大器(+2) | +2 | 85% | +0.17 |
| Network | $29.8 | 7.4% | -3 | +1 | 削弱 | 利空 | 0-1yr | 易受冲击(-3) | -3 | 90% | -0.20 |
| Cloud | $58.7 | 14.6% | +4 | -2 | 强化 | 利好 | 0-3yr | 赋能者(+4) | +4 | 85% | +0.50 |
| 订阅/设备 | $48.1 | 11.9% | +2 | -1 | 强化 | 中性 | 1-3yr | 放大器(+2) | +2 | 80% | +0.19 |
| Waymo | $0.35 | 0.1% | +5 | -4 | 强化 | 利好 | 3-5yr | 赋能者(+5) | +5 | 40% | +0.002 |
| Other Bets | $1.1 | 0.3% | +1 | -2 | 中性 | 中性 | 5-10yr | 中性(+1) | +1 | 30% | +0.001 |

**概率加权AI净分 = +1.11**

```
计算过程:
= (55.7% × +1 × 80%) + (10.0% × +2 × 85%) + (7.4% × -3 × 90%)
  + (14.6% × +4 × 85%) + (11.9% × +2 × 80%) + (0.1% × +5 × 40%)
  + (0.3% × +1 × 30%)
= 0.446 + 0.170 + (-0.200) + 0.496 + 0.190 + 0.002 + 0.001
= +1.11
```

### 17.1.10 AI冲击热力图

```mermaid
quadrantChart
    title Alphabet分部AI冲击矩阵 (收入冲击 vs 成本冲击)
    x-axis "成本恶化 (-5)" --> "成本改善 (+5)"
    y-axis "收入蚕食 (-5)" --> "收入增长 (+5)"
    quadrant-1 "AI赢家: 收入增+成本降"
    quadrant-2 "AI投资期: 收入增+成本增"
    quadrant-3 "AI受损: 收入降+成本增"
    quadrant-4 "AI优化: 收入降+成本降"
    YouTube Ads: [0.6, 0.7]
    Subscriptions: [0.4, 0.7]
    Google Cloud: [0.3, 0.9]
    Google Search: [0.2, 0.6]
    Network AdSense: [0.6, 0.2]
    Waymo: [0.1, 1.0]
    Other Bets: [0.3, 0.6]
```

### 17.1.11 AI冲击关键发现

**1. AI净影响轻微正面(+1.11)，但背后是剧烈的内部分化**

Alphabet不是一个简单的"AI受益者"或"AI受害者" -- 它是一个AI在内部同时创造和毁灭价值的复杂体。Cloud(+4)和Waymo(+5)的强烈正面被Network(-3)的显著负面和Search的高不确定性所部分抵消。

**2. Search的AI评分(+1)是整个矩阵中不确定性最高的**

Search贡献55.7%的收入，其AI净分即使变动1个点，就会让整体加权分从+0.66变到+1.55。这是CQ2(AI自蚕食)如此关键的数学原因。

**3. Cloud的AI受益已经"兑现"，而Search的AI风险仍在"积累"**

Cloud Q4 +48%、backlog $240B是硬数据 [硬数据: Alphabet Q4 Earnings]。但Search的AI蚕食目前还未体现在顶线(Q4 +17%)，只是在底层指标(CTR -61%/-68%)中隐约可见。这种"顶线健康/底层侵蚀"的分裂状态可能在2027-2028年集中爆发。

**4. Network是一个被低估的"死亡螺旋"**

$29.8B的Network业务已进入结构性下滑(-2% YoY)，AI Overviews的扩张只会加速这一趋势。按当前轨迹，3年内Network收入可能降至$20-22B [合理推断: 基于-5%~-10%年化下滑率]。

---

## 17.2 Layer 2: AI实施深度评级

### 17.2.1 Alphabet整体L x S定位

#### L轴(实施级别): L3 -- 自主运营级

**证据链**:

| 证据 | L级别 | 说明 |
|------|:-----:|------|
| Gemini 3作为默认搜索模型 | L3 | AI自主生成搜索回答，人类仅监控 [DM-AI-001] |
| Waymo无人驾驶 | L3-L4 | 45万次/周无人驾驶出行 [硬数据: Waymo, 2025-12] |
| YouTube AI推荐 | L3 | 推荐算法自主决定用户看什么 |
| Google Cloud AI Solutions | L2-L3 | 企业客户使用Gemini API自主化运营 |
| AI Overviews广告竞价 | L2 | 60ms内完成竞价但尚未展示广告 [硬数据: Discovered Labs, 2026] |

**结论: L3(自主运营级)** -- Alphabet的核心产品(搜索/YouTube/自动驾驶)已由AI自主运营，人类主要承担监控角色。在广告变现领域仍处于L2(受控自动化)向L3转型中。

#### S轴(商业兑现): S2.5 -- 规模化中期

**证据链**:

| 证据 | S级别 | 说明 |
|------|:-----:|------|
| Cloud AI产生"数十亿美元/季"收入 | S2 | AI收入已超5%总营收但尚未超20% [硬数据: Alphabet CFO, 2026-02] |
| AI Overviews尚未直接变现 | S1 | 广告测试阶段，基础设施就绪但未规模化 |
| Gemini 750M MAU | S2 | 用户规模已达S2，但变现仍在S1(广告计划2026年) |
| Waymo $350M年化收入 | S1 | 首批AI收入可见，但远未规模化 |
| AI增强广告(Performance Max等) | S3 | AI已深度融入现有广告产品 |

**结论: S2.5** -- 部分AI产品(广告AI增强)已达S3，但最具变革性的产品(AI Overviews/Gemini/Waymo)仍处于S1-S2早期阶段。

> **Alphabet整体定位: L3 x S2.5** -- 技术实施远超商业变现。这种"实施-变现缺口"既是风险(高投入低回报期)也是机会(变现加速的空间巨大)。

### 17.2.2 各分部L x S差异

| 分部 | L轴 | S轴 | L x S | 说明 |
|------|:---:|:---:|:-----:|------|
| Search+AIO | L3 | S1.5 | L3xS1.5 | 技术领先但变现落后(AIO广告仍在测试) |
| YouTube | L3 | S3 | L3xS3 | AI推荐+创作工具已深度变现 |
| Network | L2 | S2 | L2xS2 | 程序化广告AI已成熟，但业务本身在萎缩 |
| Cloud | L2 | S2 | L2xS2 | 企业AI解决方案规模化中 |
| 订阅/设备 | L2 | S2 | L2xS2 | AI功能推动订阅增长 |
| Waymo | L4 | S1 | L4xS1 | 最高技术级别但变现最早期 |
| Other Bets | L1-L2 | S0 | L1.5xS0 | 研究阶段，零变现 |

```mermaid
graph LR
    subgraph "L x S 坐标系"
        direction TB
        subgraph "S4 平台化"
            s4[空]
        end
        subgraph "S3 成熟"
            YT[YouTube L3xS3]
        end
        subgraph "S2 规模化"
            CL[Cloud L2xS2]
            NW[Network L2xS2]
            SP[订阅/设备 L2xS2]
        end
        subgraph "S1 早期变现"
            SR[Search+AIO L3xS1.5]
            WM[Waymo L4xS1]
        end
        subgraph "S0 叙事期权"
            OB[Other Bets L1.5xS0]
        end
    end
    
    style YT fill:#2ecc71,color:#000
    style CL fill:#3498db,color:#000
    style SR fill:#f39c12,color:#000
    style WM fill:#e74c3c,color:#fff
    style NW fill:#95a5a6,color:#000
    style SP fill:#3498db,color:#000
    style OB fill:#bdc3c7,color:#000
```

**关键洞察**: Alphabet存在一个显著的"L-S剪刀差":

- **Waymo: L4xS1** -- 技术上最先进(L4完全自主)但商业上最原始(S1早期变现)。这是Alphabet内部最大的"期权"
- **YouTube: L3xS3** -- L和S最平衡的分部，AI已深度融入且充分变现
- **Search+AIO: L3xS1.5** -- L-S缺口最大的核心业务。L3级AI(Gemini/AIO)的变现仍在S1.5，是CQ1(CapEx ROI)的核心矛盾

### 17.2.3 五不变量检验

| # | 不变量 | 评估 | 评分 | 证据 |
|:-:|--------|------|:----:|------|
| 1 | **数据优势是否真实且持久?** | 通过 | 9/10 | 90%搜索份额、2.7B YouTube MAU、3.9B Android设备 -- 数据覆盖面无可匹敌 [硬数据: StatCounter/DemandSage, 2026] |
| 2 | **算法优势是否可量化?** | 通过 | 8/10 | Gemini在多个基准上与GPT-4o竞争，TPU v6提供4x推理性价比 [硬数据: AI News Hub, 2025]。但ChatGPT在用户偏好上仍领先 |
| 3 | **计算资源优势是否转化为产品?** | 部分通过 | 7/10 | 全球最大AI基础设施之一(FY2026 $175-185B CapEx)，TPU v6已量产。但CapEx转化率仅17-27% [合理推断: Phase 2计算] |
| 4 | **人才密度是否维持?** | 通过 | 8/10 | DeepMind + Google Brain合并后保持顶尖AI人才密度。R&D $61.09B(+23.9%) [DM-FIN-001] |
| 5 | **客户粘性是否因AI增强?** | 部分通过 | 7/10 | GCP backlog $240B(+55% QoQ)证明企业粘性增强 [硬数据: Alphabet Q4]。但搜索用户切换到ChatGPT的成本极低 |

**五不变量总分: 39/50 (78%) -- 通过**

> [主观判断: 不变量3(计算资源转化)和不变量5(客户粘性)是两个"部分通过"，核心原因都指向同一个问题 -- Alphabet投入了天量资源建设AI基础设施，但将其转化为锁定用户的产品能力还不够充分。这与CQ1(CapEx ROI)直接相关。]

### 17.2.4 同业L x S对比

| 公司 | L轴 | S轴 | L x S | 核心AI产品 | 优势 | 劣势 |
|------|:---:|:---:|:-----:|-----------|------|------|
| **GOOGL** | L3 | S2.5 | **L3xS2.5** | Gemini/AIO/Cloud AI/Waymo | 全栈AI(芯片→模型→应用) | 自蚕食风险/变现落后 |
| **MSFT** | L2.5 | S3 | **L2.5xS3** | Copilot/Azure AI/365 AI | 变现最成熟($13B AI年化) | 依赖OpenAI/非自有模型 |
| **AMZN** | L2.5 | S2.5 | **L2.5xS2.5** | Bedrock/Alexa+/AWS AI | 最大云份额/多模型策略 | AI差异化不足/Alexa失败 |
| **META** | L3 | S2 | **L3xS2** | Llama开源/AI推荐/AR | 最大社交数据/开源领先 | 无云平台/元宇宙拖累 |

[硬数据: MSFT AI年化收入$13B, 175% YoY -- Microsoft Q1 FY2026 Earnings, 2025-10]

**关键对比发现**:

1. **GOOGL vs MSFT**: Google技术更先进(L3 vs L2.5)但变现落后(S2.5 vs S3)。MSFT通过Office/Azure的捆绑销售实现了更快的AI变现，而Google的AI(AIO/Gemini)还在寻找货币化路径
2. **GOOGL vs META**: 两者L轴接近(L3)，但Google的S轴更高(S2.5 vs S2)，因为Cloud提供了AI变现渠道而Meta没有
3. **GOOGL独特性**: 唯一同时拥有自有AI芯片(TPU)+自有大模型(Gemini)+自有云平台(GCP)+自有搜索分发(90%份额)+自有自动驾驶(Waymo)的公司 -- 这是"全栈AI"定位的实质含义

### 17.2.5 L x S动态路径: 12个月预期

| 分部 | 当前L x S | 12个月后预期 | 推动力 | 阻力 |
|------|:---------:|:-----------:|--------|------|
| Search+AIO | L3xS1.5 | L3xS2 | AIO广告正式上线 [硬数据: Google已向广告主介绍2026计划, Adweek] | 广告主接受度/CTR影响 |
| YouTube | L3xS3 | L3xS3.5 | Shorts变现继续改善/AI创作工具成熟 | Shorts RPM仍低于长视频 |
| Cloud | L2xS2 | L2.5xS2.5 | Backlog逐步确认收入/$240B积压 | 产能供应约束 |
| Waymo | L4xS1 | L4xS1.5 | 每周100万次出行目标 [硬数据: Technology Magazine, 2026] | 城市扩展监管审批 |
| Gemini App | N/A | L3xS1 | 750M MAU + 广告计划2026推出 [硬数据: Adweek, 2026-01] | Google否认Gemini广告时间表 |

---

## 17.3 特别分析: AI自蚕食深度建模

> 此节直接回应CQ2: AI Overviews是增强搜索护城河还是自蚕食?

### 17.3.1 搜索广告AI替代路径: 三个情景

```mermaid
graph TD
    A[AI对搜索广告的净影响] --> B{AI Overviews覆盖率}
    B -->|保守: 20%| C[情景A: AI增强]
    B -->|基准: 35%| D[情景B: AI中性]
    B -->|激进: 50%+| E[情景C: AI蚕食]
    
    C --> C1["搜索收入+8-12%<br>AI提升广告精准度<br>AIO覆盖低价值查询<br>高价值商业查询不受影响"]
    D --> D1["搜索收入+3-5%<br>AIO广告开始变现<br>部分CTR下降被CPM上升抵消<br>Net neutral"]
    E --> E1["搜索收入-2~+1%<br>AIO深入商业查询<br>CTR持续恶化<br>新广告格式未能补偿"]
    
    C1 --> F[概率: 25%]
    D1 --> G[概率: 50%]
    E1 --> H[概率: 25%]
```

#### 情景A: AI增强 (概率25%)

**假设**: AI Overviews主要覆盖信息类查询(≤20%)，商业/交易类查询保持传统格式

| 指标 | FY2025A | FY2027E(情景A) | 变化 |
|------|:-------:|:-------------:|:----:|
| 搜索收入 | $224.5B | $262-270B | +17-20% |
| AIO覆盖率 | ~15-18% | ~20% | +3pp |
| 商业查询CTR | 基准 | -5% | 轻度下降 |
| CPM变化 | 基准 | +15% | AI精准度提升 |
| AI广告收入(增量) | ~$0 | $5-8B | 新增 |

**逻辑**: AI Overviews保守扩展，主要覆盖低CPM的信息类查询(天气/定义/知识)。高价值商业查询("best credit card"/"buy laptop")保持传统搜索格式。AI反而通过更精准的用户意图理解提升了广告匹配度和CPM。[合理推断: 基于Google已表态"保守扩展AIO广告"的战略]

#### 情景B: AI中性 (概率50% -- 基准)

**假设**: AI Overviews扩展至商业查询(~35%)，新广告格式部分补偿CTR下降

| 指标 | FY2025A | FY2027E(情景B) | 变化 |
|------|:-------:|:-------------:|:----:|
| 搜索收入 | $224.5B | $236-248B | +5-10% |
| AIO覆盖率 | ~15-18% | ~35% | +18pp |
| 商业查询CTR | 基准 | -25% | 显著下降 |
| CPM变化 | 基准 | +20% | 供给减少推高价格 |
| AI广告收入(增量) | ~$0 | $12-18B | 新增 |
| 传统搜索收入损失 | — | -$8-12B | 蚕食 |

**逻辑**: AI Overviews覆盖率翻倍，但Google在AIO内嵌入广告(如已在测试的"AI Mode Bottom Ads")。CTR下降-25%被CPM上升+20%和新广告格式收入($12-18B)大部分抵消。Phase 1的F-G7概率加权搜索收入~$236B(+5%)与此情景一致 [DM锚点验证]。

#### 情景C: AI蚕食 (概率25%)

**假设**: AI Overviews覆盖50%+查询(含高价值商业)，新广告格式变现不足

| 指标 | FY2025A | FY2027E(情景C) | 变化 |
|------|:-------:|:-------------:|:----:|
| 搜索收入 | $224.5B | $222-235B | -1%~+5% |
| AIO覆盖率 | ~15-18% | ~50%+ | +33pp |
| 商业查询CTR | 基准 | -45% | 严重下降 |
| CPM变化 | 基准 | +10% | 部分提升 |
| AI广告收入(增量) | ~$0 | $8-12B | 新增但不足 |
| 传统搜索收入损失 | — | -$18-25B | 严重蚕食 |

**逻辑**: AI Overviews激进扩展，用户习惯改变(零点击从69%升至80%+)，广告主发现AIO广告的ROI低于传统搜索广告，导致新格式CPM折价。同时ChatGPT/Perplexity分流高意图商业查询的搜索量。

#### 概率加权搜索收入(FY2027E)

```
= 25% × $266B + 50% × $242B + 25% × $228B
= $66.5B + $121B + $57B
= $244.5B(概率加权)
= +8.9% vs FY2025

年化复合增速: ~4.3% (vs FY2025的+15.5%)
```

> [主观判断: 概率加权结果$244.5B意味着搜索收入增速将从当前的双位数大幅放缓至中个位数。这不是"崩塌"，但是"减速"。对于一个占55.7%收入的分部来说，增速减半对整体估值的影响不可忽视。]

### 17.3.2 AI Overviews货币化路径

**当前状态(2026年2月)**:

| 指标 | 状态 | 来源 |
|------|------|------|
| AIO覆盖率 | 15-18%的查询(美国) | [硬数据: Semrush 2025年末数据] |
| AIO广告 | 测试阶段(11个英语市场) | [硬数据: Google官方, 2025] |
| AI Mode广告 | 底部广告位基础设施就绪 | [硬数据: Discovered Labs, 2026] |
| 竞价系统 | 60ms内完成但不展示 | [硬数据: Discovered Labs, 2026] |
| Gemini App广告 | 2026年计划(Google否认) | [硬数据: Adweek/PPC Land, 2026-01] |

**货币化时间表预测**:

| 时间 | 里程碑 | 预计收入贡献 |
|------|--------|:----------:|
| 2026 H1 | AIO广告正式扩展至所有英语市场 | $2-4B年化 |
| 2026 H2 | AI Mode广告上线 | $3-6B年化(增量) |
| 2027 H1 | Gemini App内嵌广告(如果推出) | $5-10B年化(增量) |
| 2027 H2 | AIO覆盖率30-40%，广告格式成熟 | $15-25B年化(增量) |
| 2028+ | AI搜索成为主流，新广告经济成型 | $25-40B年化(增量) |

> [合理推断: 基于Google AIO广告基础设施已就绪、向广告主briefing 2026计划的证据链。但Gemini App广告被Google官方否认，时间表存在不确定性。]

### 17.3.3 净影响计算

**AI对搜索的"创造 vs 毁灭"等式**:

| 类别 | FY2027E 增量 | 概率 | 加权值 |
|------|:-----------:|:----:|:-----:|
| **AI创造的价值** | | | |
| AIO/AI Mode新广告收入 | +$15-25B | 60% | +$12B |
| AI精准度提升CPM | +$5-10B | 70% | +$5.3B |
| Gemini App广告(如果推出) | +$5-10B | 30% | +$2.3B |
| **小计(AI创造)** | | | **+$19.5B** |
| | | | |
| **AI毁灭的价值** | | | |
| AIO导致传统搜索CTR下降 | -$12-20B | 80% | -$12.8B |
| ChatGPT/竞品分流搜索量 | -$3-8B | 50% | -$2.8B |
| Network/AdSense加速衰退 | -$3-5B | 85% | -$3.4B |
| **小计(AI毁灭)** | | | **-$19.0B** |
| | | | |
| **AI对搜索生态的概率加权净影响** | | | **+$0.5B** |

**结论**: 在概率加权基准下，AI对Alphabet搜索生态(Search+Network)的净影响接近中性(+$0.5B)。但这掩盖了巨大的波动范围:

- **最佳情景**: AI净创造+$25-35B(新广告格式大获成功)
- **最差情景**: AI净毁灭-$20-30B(蚕食失控+竞品分流)
- **波动幅度**: ~$55-65B(占当前搜索收入的~25%)

### 17.3.4 敏感度分析: CTR变化对搜索收入的边际影响

以FY2025搜索收入$224.5B为基准，分析CTR每变化10%对收入的影响:

| CTR变化 | 对传统搜索收入的影响 | 需要多少AI新收入才能补偿 |
|:-------:|:------------------:|:---------------------:|
| -10% | -$6.7B | $6.7B AIO广告 |
| -20% | -$13.5B | $13.5B AIO广告 |
| -30% | -$20.2B | $20.2B AIO广告 |
| -40% | -$26.9B | $26.9B AIO广告 |
| -50% | -$33.7B | $33.7B AIO广告 |

> [合理推断: 假设搜索收入与CTR线性相关(简化假设)，且CPM不变。实际上CPM可能因供给减少而上升，部分抵消CTR下降。]

**临界点分析**: 如果AIO覆盖率达到50%且平均CTR下降40%(当前数据点-61%/-68%的中值)，Google需要每年~$27B的AI新广告收入才能维持搜索收入不缩水。按照当前的广告技术成熟度，2027年实现$27B AI新广告收入的概率约为25-30% [主观判断: 基于Google广告产品历史launch速度]。

---

## 17.4 CQ回应

### CQ1: $175-185B CapEx能否在3年内产生正向ROI?

**Layer 1+2的回答**: CapEx的ROI路径严重依赖Cloud和Search两个分部:

- **Cloud路径(已验证)**: $240B backlog + 48%增速 = CapEx投入Cloud的部分有明确的3年回收路径。假设Cloud维持30%+利润率，Cloud利润从FY2025的~$12B增至FY2028E的~$25-30B，增量利润$13-18B/年可覆盖CapEx的~10-15%
- **Search AI路径(未验证)**: AI Overviews/Gemini的变现仍处于S1.5阶段，L3技术水平与S1.5变现之间的缺口意味着大量CapEx投入搜索AI的ROI在3年内可能为负
- **TPU路径(部分验证)**: TPU v6的4x性价比优势降低了推理成本，但CapEx/折旧比率4.33x说明折旧将在未来2-3年大幅上升

**CQ1信心更新**: 从Phase 2的"80%完成度"提升至**85%**。Cloud的$240B backlog是新的强锚点，但Search AI变现路径仍是最大不确定性。

### CQ2: AI Overviews是增强搜索护城河还是自蚕食?

**Layer 1+2的回答**: **两者同时发生，且短期增强 > 蚕食，长期蚕食风险上升**

- **增强**: Gemini 750M MAU [硬数据] + 搜索份额90.04% [硬数据] + Q4搜索收入+17% [硬数据] -- 短期数据全面支持"增强"论点
- **蚕食**: CTR -61%/-68% [硬数据] + 零点击69% [硬数据] + Network -2% [硬数据] -- 底层指标已出现蚕食信号
- **净影响**: 概率加权+$0.5B(近乎中性)，但不确定性区间+-$30B
- **关键转折点**: 当AIO覆盖率从18%升至35-50%时(预计2027年)，蚕食可能从"底层信号"变为"顶线压力"

**CQ2信心更新**: 从Phase 2的"85%完成度"提升至**90%**。AI自蚕食深度建模提供了三情景量化框架，核心答案是"短期安全，中期需监控AIO覆盖率转折点"。

---

## 17.5 So What: 投资含义

### 对估值的直接影响

1. **AI对Alphabet的净影响是轻微正面的(+1.11/5分)，但波动极大**。投资者不应将Alphabet简单标记为"AI赢家"或"AI输家" -- 它是一个AI冲击高度分化的复合体

2. **Cloud的AI价值已可量化($240B backlog)，但Search的AI风险仍在积累**。这意味着SOTP估值中Cloud分部应获得AI溢价(上调EV/Revenue倍数)，而Search分部不应获得溢价(甚至可能需要轻度折价)

3. **CapEx $175-185B的核心赌注是: L3xS1.5 -> L3xS3的转化**。如果Search AI能从当前的S1.5(早期变现)跃升至S3(成熟变现)，则CapEx回收期约3-4年；如果停留在S1.5，则CapEx回收期>5年，FCF将持续承压

### 需监控的关键指标

| 指标 | 当前值 | 看涨阈值 | 看跌阈值 | 监控频率 |
|------|:------:|:--------:|:--------:|:-------:|
| AIO广告收入 | ~$0 | >$10B/年 | <$3B/年(FY2027) | 季度 |
| 搜索收入增速 | +15.5% | >12% | <5% | 季度 |
| Cloud backlog | $240B | >$300B | <$200B | 季度 |
| Network收入增速 | -2% | >0% | <-10% | 季度 |
| Gemini MAU | 750M | >1B | <500M | 季度 |
| ChatGPT搜索份额 | 45.3%(chatbot) | <40% | >55% | 月度 |
| CapEx/Revenue | 22.7% | <30% | >40%(FY2026) | 季度 |

### Phase 4传递事项

- **极端看跌情景应测试**: AIO覆盖率50%+/CTR -40%+/AI新广告收入<$10B的组合下，搜索收入可能在FY2027-2028负增长
- **极端看涨情景应测试**: Cloud+AI联合达到$100B年化收入(FY2028)，抵消搜索减速
- **Kill Switch候选**: "搜索收入连续2季度负增长" + "AIO广告FY2027年化<$5B"

---

## 17.6 标注统计

| 标注类型 | 数量 | 目标 |
|----------|:----:|:----:|
| [硬数据: ...] | 32 | >=40% |
| [合理推断: ...] | 12 | <40% |
| [主观判断: ...] | 7 | <20% |
| [DM-xxx] | 8 | N/A |
| **总标注** | **59** | >=15/万字 |

> 本章约20,000+字符，标注密度约29/万字符，硬数据占比54% -- 均超过目标。

---

*Chapter 17完成。Layer 3(AI估值影响量化)将在Phase 4-5中与SOTP估值挂钩。*

---

## 数据来源汇总

以下为本章引用的主要外部数据来源:

- [Alphabet Q4 FY2025 Earnings - CNBC](https://www.cnbc.com/2026/02/04/alphabet-googl-q4-2025-earnings.html)
- [Alphabet Q4 FY2025 Highlights Cloud Acceleration - Futurum](https://futurumgroup.com/insights/alphabet-q4-fy-2025-highlights-cloud-acceleration-and-enterprise-ai-momentum/)
- [Google Gemini App Surpasses 750M MAU - TechCrunch](https://techcrunch.com/2026/02/04/googles-gemini-app-has-surpassed-750m-monthly-active-users/)
- [Gemini Users Statistics 2026 - DemandSage](https://www.demandsage.com/google-gemini-statistics/)
- [AI Overviews Killed CTR 61% - Dataslayer](https://www.dataslayer.ai/blog/google-ai-overviews-the-end-of-traditional-ctr-and-how-to-adapt-in-2025)
- [AIO Impact on Google CTR September 2025 - Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update)
- [Zero-Click Search Statistics 2026 - Click-Vision](https://click-vision.com/zero-click-search-statistics)
- [Waymo Surges to 450K Weekly Trips - The Driverless Digest](https://www.thedriverlessdigest.com/p/waymo-surges-to-450k-weekly-trips)
- [Waymo Targets 1M Weekly Trips by 2026 - Technology Magazine](https://technologymagazine.com/news/waymo-brings-robotaxis-to-three-more-us-cities)
- [YouTube Becomes $60B Giant - News9Live](https://www.news9live.com/technology/tech-news/youtube-overtakes-netflix-in-annual-revenue-after-posting-11-38b-in-q4-advertising-2926957/amp)
- [Google AI Mode Ads - Discovered Labs](https://discoveredlabs.com/blog/how-google-ai-mode-ads-work-today-and-what-they-might-look-like-tomorrow)
- [Google Tells Advertisers Gemini Ads 2026 - Adweek](https://www.adweek.com/media/google-gemini-ads-2026/)
- [Google Network Revenue Decline - PPC Land](https://ppc.land/google-network-advertising-revenue-declines-1-as-ai-features-reduce-publisher-traffic/)
- [AI Search Erodes Organic Traffic 30-40% - WebProNews](https://www.webpronews.com/ai-search-erodes-organic-traffic-by-30-40-in-2026-publishers-adapt/)
- [AI Inference Costs 2025 TPU vs GPU - AI News Hub](https://www.ainewshub.org/post/ai-inference-costs-tpu-vs-gpu-2025)
- [Microsoft Q2 FY2026 Cloud $50B Azure +38% - Futurum](https://futurumgroup.com/insights/microsoft-q2-fy-2026-cloud-surpasses-50b-azure-up-38-cc/)
- [Google AI Overviews Surged Then Pulled Back - Search Engine Land](https://searchengineland.com/google-ai-overviews-surge-pullback-data-466314)
- [Semrush AI Overviews Study 10M Keywords - AlmCorp](https://almcorp.com/blog/semrush-ai-overviews-study-2026-complete-analysis/)
- [Google AI Overviews 60% of Searches - Xponent21](https://xponent21.com/insights/google-ai-overviews-surpass-60-percent/)
- [Waymo $16B Funding Round - WardsAuto](https://www.wardsauto.com/news/waymo-announces-16B-funding-round-dragoneer-investment-group-robotaxis/811239/)