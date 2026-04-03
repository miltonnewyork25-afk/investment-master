# INTU P1+P2 Mermaid图表补充 (15个)

> **用途**: 直接嵌入Phase 5 Complete报告，补齐可视化门控(G4≥25)
> **数据来源**: P1 Ch1-Ch6/Ch11/Ch14/Ch-B4 + P2 Ch7-Ch10

---

## 一、业务架构 (4个)

### 图1: INTU四大分部收入瀑布

```mermaid
graph LR
    subgraph "FY2025 Revenue $18.8B"
        GBS["GBS<br>$11.1B (59%)<br>+18%"]
        CON["Consumer<br>$4.9B (26%)<br>+10%"]
        CK["Credit Karma<br>$2.3B (12%)<br>+32%"]
        PT["ProTax<br>$621M (3%)<br>+4%"]
    end

    GBS --> GBS1["QB Online Eco<br>~$9.8B (+21%)"]
    GBS --> GBS2["Mailchimp<br>~$1.35B (~0%)"]
    CON --> CON1["TT DIY<br>~$2.9B (低个位数)"]
    CON --> CON2["TT Live<br>~$2.0B (+47%)"]

    style GBS fill:#2196F3,color:#fff
    style CON fill:#4CAF50,color:#fff
    style CK fill:#FF9800,color:#fff
    style PT fill:#9E9E9E,color:#fff
    style GBS2 fill:#ffcdd2
    style CON2 fill:#c8e6c9
```

**读图说明**: GBS贡献59%收入但内部质量差异巨大——剔除Mailchimp后核心QB增速+21%，Mailchimp增速接近零。Consumer分部内TT Live(+47%)是真正的增长引擎，DIY已接近零增长。CK(+32%)是增速最高的分部，但仅占12%。

---

### 图2: 双重身份框架图

```mermaid
graph TB
    subgraph "身份A: 税务软件公司"
        A1["TurboTax $4.9B<br>+ QB记账工具"]
        A2["合理PE: 15-20x"]
        A3["隐含股价:<br>$350-$400"]
    end

    subgraph "三个验证条件"
        V1["CK维持20%+增速<br>P=60-65%"]
        V2["IES突破$1B ARR<br>P=45-50%"]
        V3["AI净增强护城河<br>P=65-70%"]
    end

    subgraph "身份B: 金融平台"
        B1["QB生态$10B+<br>+ CK数据引擎<br>+ IES中端市场"]
        B2["合理PE: 25-35x"]
        B3["隐含股价:<br>$625-$875"]
    end

    A1 -.->|"当前市场定价<br>18x Fwd PE"| A2
    V1 & V2 & V3 -->|"条件满足→身份转变"| B1

    style A2 fill:#ffcdd2
    style B2 fill:#c8e6c9
    style V1 fill:#fff9c4
    style V2 fill:#fff9c4
    style V3 fill:#fff9c4
```

**读图说明**: 市场以18x forward PE定价身份A(税务软件)，几乎给零平台溢价。身份B(金融平台)需要三个条件同时成立，联合概率仅12-17%。当前$457处于身份A区间的上沿，投资吸引力取决于向身份B转变的可能性。

---

### 图3: QB生态系统集成架构

```mermaid
graph TB
    QBO["QuickBooks Online<br>700万+活跃用户<br>62%美国SMB份额"]

    QBO --> PAY["Payments<br>支付处理"]
    QBO --> PAYROLL["Payroll<br>薪资管理"]
    QBO --> CAP["QB Capital<br>小企业贷款"]
    QBO --> MC["Mailchimp<br>营销自动化<br>~$1.35B"]
    QBO --> APP["800+ App集成<br>Stripe/Square/Gusto"]
    QBO --> ACCT["ProAdvisor<br>700K+认证会计师"]
    QBO --> IES["IES升级路径<br>→中端市场<br>ARPC $20K"]

    subgraph "锁定三层防线"
        L1["数据迁移摩擦<br>3-7年账簿历史"]
        L2["集成依赖<br>800+ API生态"]
        L3["会计师绑定<br>700K推荐网络"]
    end

    PAY & PAYROLL & CAP --> L1
    APP --> L2
    ACCT --> L3

    style QBO fill:#1565C0,color:#fff
    style IES fill:#FF6F00,color:#fff
    style L1 fill:#e8eaf6
    style L2 fill:#e8eaf6
    style L3 fill:#e8eaf6
```

**读图说明**: QB Core居中连接6大功能模块+IES升级路径。底部三层锁定防线(数据/集成/会计师)解释了82%的年留存率。每多使用一个模块，迁移成本呈非线性增长。

---

### 图4: INTU产品矩阵(增速 x 利润率)

```mermaid
quadrantChart
    title INTU产品矩阵: 增速 vs 利润率贡献
    x-axis "低增速" --> "高增速"
    y-axis "低利润率" --> "高利润率"

    "TT DIY": [0.15, 0.85]
    "ProTax": [0.18, 0.80]
    "QBO Core": [0.55, 0.70]
    "TT Live": [0.82, 0.45]
    "Credit Karma": [0.78, 0.35]
    "IES": [0.90, 0.30]
    "Mailchimp": [0.10, 0.25]
```

**读图说明**: 右上象限(高增速+高利润率)为空白——INTU当前没有同时满足两个条件的产品。TT DIY/ProTax是高利润但低增速的"现金牛"；CK/IES/TT Live是高增速但利润率待验证的"增长期权"；Mailchimp落在左下角(低增速+低利润率)，是唯一的价值拖累。

---

## 二、估值与财务 (4个)

### 图5: PE历史估值带

```mermaid
xychart-beta
    title "INTU Forward PE历史演变 (FY2016-FY2026)"
    x-axis ["FY16", "FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24", "FY25", "FY26E"]
    y-axis "Forward PE (x)" 10 --> 90
    line [29.6, 35.2, 42.0, 50.3, 55.0, 82.0, 45.0, 38.5, 61.0, 25.6, 18.0]
```

**读图说明**: INTU PE经历了三个regime: FY2016-2019的稳步扩张(29x→50x，云转型溢价)、FY2020-2021的泡沫峰值(82x)、FY2022至今的持续压缩(82x→18x)。当前18x forward PE是10年最低，处于第1百分位。10年均值48.5x，当前仅为均值的37%。关键问题: 这是均值回归的起点(如Netflix 2022)还是新常态的确认(如思科2000后)？

---

### 图6: SOTP分部估值瀑布

```mermaid
graph LR
    subgraph "分部估值 (EV)"
        QB["QB/GBS ex-MC<br>$9.8B×9.5x<br>= $93.1B"]
        MC2["Mailchimp<br>$1.35B×4x<br>= $5.4B"]
        TT["Consumer/TT<br>$4.9B×6x<br>= $29.4B"]
        CK2["Credit Karma<br>$2.3B×6x<br>= $13.8B"]
        PRO["ProTax<br>$621M×6x<br>= $3.7B"]
    end

    QB --> SUM["总EV<br>$145.4B"]
    MC2 --> SUM
    TT --> SUM
    CK2 --> SUM
    PRO --> SUM

    SUM --> ADJ["- Net Debt $3.3B<br>- SBC PV ~$12B"]
    ADJ --> EQ["调整后权益<br>$130.1B"]
    EQ --> PS["每股 ~$464<br>(vs 当前$457)"]

    style QB fill:#2196F3,color:#fff
    style CK2 fill:#FF9800,color:#fff
    style MC2 fill:#ffcdd2
    style PS fill:#e8f5e9
```

**读图说明**: SOTP估值$145.4B，扣除净债务和SBC现值后每股约$464，与当前$457基本持平。QB/GBS(ex-MC)贡献64%的总企业价值。Mailchimp仅贡献3.7%，确认了$12B收购的价值缩水。关键分歧在倍数假设: 如果CK用7x(而非6x)，每股上行约$16。

---

### 图7: 概率加权情景树

```mermaid
graph TD
    CURR["当前股价 $457<br>市值 $127B"]

    CURR --> BULL["Bull Case (25%)<br>身份B确认<br>CK+IES兑现"]
    CURR --> BASE["Base Case (50%)<br>混合身份<br>部分期权兑现"]
    CURR --> BEAR["Bear Case (25%)<br>AI颠覆+<br>增速骤降"]

    BULL --> BV["目标价: ~$700-$780<br>PE 28-32x<br>期望贡献: $188"]
    BASE --> MV["目标价: ~$500-$550<br>PE 20-22x<br>期望贡献: $263"]
    BEAR --> SV["目标价: ~$250-$300<br>PE 12-14x<br>期望贡献: $69"]

    BV & MV & SV --> EV["概率加权EV<br>≈ $520-$530"]
    EV --> UP["vs $457<br>隐含上行 +14-16%"]

    style BULL fill:#c8e6c9
    style BASE fill:#fff9c4
    style BEAR fill:#ffcdd2
    style EV fill:#e3f2fd
    style UP fill:#bbdefb
```

**读图说明**: 三情景概率加权后期望值约$520-530，对应+14-16%上行，处于"关注"评级区间(+10%~+30%)。但Bull和Bear的差距巨大($780 vs $250)，反映了身份定价的二元性。50% Base Case对应"部分期权兑现"——这是最可能的结果，但也是最不刺激的。

---

### 图8: FCF桥接图 (FY2025)

```mermaid
graph LR
    NI["Net Income<br>$3,810M"] --> DA["+D&A<br>$1,550M"]
    DA --> SBC2["+SBC<br>$1,968M"]
    SBC2 --> WC["+WC变化<br>$595M"]
    WC --> OCF["= OCF<br>$7,923M"]
    OCF --> CAP2["- CapEx<br>$124M"]
    CAP2 --> GFCF["= GAAP FCF<br>$6,083M<br>(32.3% margin)"]
    GFCF --> SBCADJ["- SBC调整<br>$1,968M"]
    SBCADJ --> AFCF["= 调整后FCF<br>$4,115M<br>(21.9% margin)"]

    style NI fill:#e3f2fd
    style OCF fill:#c8e6c9
    style GFCF fill:#4CAF50,color:#fff
    style AFCF fill:#FF9800,color:#fff
    style SBC2 fill:#fff9c4
    style CAP2 fill:#e8f5e9
```

**读图说明**: GAAP FCF $6.1B(margin 32.3%)看起来优秀，但SBC $2.0B是隐性成本。扣除SBC后调整FCF仅$4.1B(margin 21.9%)——仍然健康但差距显著。CapEx仅$124M(占收入0.66%)是极致轻资产模型的证据。WC正贡献$595M主要来自递延收入增长。

---

## 三、护城河与竞争 (4个)

### 图9: 护城河四维评分

```mermaid
%%{init: {'theme': 'default'}}%%
graph TB
    subgraph "INTU护城河四维评分"
        C1["C1: 制度嵌入<br>8/10<br>IRS e-filer授权<br>$3.7M游说费"]
        C2["C2: 网络效应<br>6/10<br>间接推荐网络<br>可被多归属稀释"]
        C3["C3: 系统+数据双锁定<br>8/10<br>三层防线<br>留存率82-88%"]
        C4["C4: 数据飞轮<br>7/10<br>60PB数据/600亿预测日<br>LLM部分侵蚀"]
    end

    C1 --> AVG["加权均分<br>7.25/10"]
    C2 --> AVG
    C3 --> AVG
    C4 --> AVG

    AVG --> COMP["vs ADBE: ~7.5-8.0<br>vs CRM: ~8.0-8.5<br>INTU护城河中等偏强"]

    style C1 fill:#1565C0,color:#fff
    style C3 fill:#1565C0,color:#fff
    style C4 fill:#42A5F5,color:#fff
    style C2 fill:#90CAF9
    style AVG fill:#e8eaf6
```

**读图说明**: C1(制度嵌入)和C3(系统锁定)最强(8/10)，构成INTU护城河的核心支柱。C2(网络效应)最弱(6/10)，因为INTU的网络效应是间接的推荐网络而非直接的用户间网络效应。整体7.25/10意味着护城河"中等偏强但非不可攻破"——AI是最大的潜在侵蚀力量。

---

### 图10: 飞轮正反力量对比

```mermaid
graph TB
    subgraph "加速力量 (飞轮正转)"
        F1["AI增值<br>Intuit Assist提升留存<br>催款AI回款快5天"]
        F2["数据锁定加深<br>60PB+每年200亿笔交易<br>用越久越难离开"]
        F3["ARPC持续提升<br>交叉销售Pay/Payroll/Capital<br>NRR≈113-115%"]
        F4["IES向上拉动<br>ARPC $20K vs QBO $1K<br>800K可升级客户"]
    end

    subgraph "制动力量 (飞轮阻力)"
        B1["AI替代风险<br>LLM可免费报税/记账<br>Scale Ventures警告"]
        B2["切换成本降低<br>Open Banking/数据可携带<br>API标准化"]
        B3["涨价疲劳<br>QBO 3年涨52-64%<br>社区不满累积"]
        B4["Mailchimp拖累<br>增速≈0% / $12B沉没成本<br>商誉减值风险$2-5B"]
    end

    F1 & F2 & F3 & F4 --> NET["净飞轮强度"]
    B1 & B2 & B3 & B4 --> NET

    NET --> VERDICT["判定: 净正向但在收窄<br>当前FY2025仍在加速<br>3-5年后取决于AI发展路径"]

    style F1 fill:#c8e6c9
    style F2 fill:#c8e6c9
    style F3 fill:#c8e6c9
    style F4 fill:#c8e6c9
    style B1 fill:#ffcdd2
    style B2 fill:#ffcdd2
    style B3 fill:#ffcdd2
    style B4 fill:#ffcdd2
    style NET fill:#fff9c4
```

**读图说明**: 加速力量(AI增值+数据锁定+ARPC提升+IES上拉)当前强于制动力量，证据是FY2025收入+16%且加速。但制动力量在长期可能加强——特别是AI替代(B1)和切换成本降低(B2)两个趋势性风险。飞轮悖论检测: GenOS成功→免费报税可能→TurboTax$4.9B收入受威胁，但当前净效应为正(AI数据访问权优势>模型能力威胁)。

---

### 图11: 定价权分层评估

```mermaid
graph LR
    subgraph "定价权分层 (加权B4 = Stage 2.9)"
        IES2["IES Enterprise<br>Stage 3.5<br>权重5%"]
        ADV["QBO Advanced<br>Stage 3.0<br>权重15%"]
        CORE["SMB Core<br>Stage 3.0<br>权重30%"]
        MICRO["Micro/Free<br>Stage 1.5<br>权重5%"]
        TTX["TurboTax<br>Stage 3.0<br>权重28%"]
        CKP["Credit Karma<br>Stage 2.5<br>权重12%"]
        PTP["ProTax<br>Stage 3.5<br>权重3%"]
        MCP["Mailchimp<br>Stage 2.0<br>权重2%"]
    end

    IES2 --> W["加权: 0.175"]
    ADV --> W2["加权: 0.450"]
    CORE --> W3["加权: 0.900"]
    MICRO --> W4["加权: 0.075"]
    TTX --> W5["加权: 0.840"]
    CKP --> W6["加权: 0.300"]
    PTP --> W7["加权: 0.105"]
    MCP --> W8["加权: 0.040"]

    W & W2 & W3 & W4 & W5 & W6 & W7 & W8 --> TOTAL["总计: 2.885<br>≈ Stage 2.9"]

    TOTAL --> DIR["趋势: 上升中<br>从~2.5→2.9<br>(3年)"]

    style IES2 fill:#2196F3,color:#fff
    style CORE fill:#4CAF50,color:#fff
    style TTX fill:#4CAF50,color:#fff
    style MICRO fill:#ffcdd2
    style MCP fill:#ffcdd2
    style TOTAL fill:#e8eaf6
```

**读图说明**: 加权定价权Stage 2.9(接近Stage 3 = 超通胀提价能力)。核心产品QBO/TurboTax均为Stage 3，支撑超通胀提价。IES/ProTax达Stage 3.5，但权重小。Micro和Mailchimp拉低均值。定价权剪刀差存在: IES高端加强($20K ARPC) + Micro低端无定价权→OPM因客户结构优化而上升。vs ADBE(Stage 3.0-3.5)，INTU定价权略低，与OPM差距(26% vs 36%)一致。

---

### 图12: 竞争定位对比(PE vs 增速)

```mermaid
xychart-beta
    title "INTU vs 可比公司: Forward PE vs 收入增速"
    x-axis "收入增速 (%)" [5, 10, 15, 20, 25, 30, 35]
    y-axis "Forward PE (x)" 10 --> 30
    line "INTU" [18]
    line "ADBE" [14.4]
    line "CRM" [25]
    line "HRB" [12]
```

**读图说明**: INTU(18x PE, +12-13%增速)处于ADBE(14.4x, +12%)和CRM(25x, +12%)之间。关键洞察: INTU与ADBE增速几乎相同但PE高25%——溢价来自CK/IES增长期权。CRM的25x PE代表"金融平台身份B"的估值天花板。HRB(12x)代表"纯税务软件"的估值地板。INTU当前定价更接近ADBE(身份A)而非CRM(身份B)。

---

## 四、分析框架 (3个)

### 图13: CQ核心问题置信度演化

```mermaid
graph LR
    subgraph "CQ置信度演化: P0 → P1 → P2"
        CQ1P0["CQ1 身份定价<br>P0: 40%"] --> CQ1P1["P1: 50%"] --> CQ1P2["P2: 60%<br>CK回本确认"]
        CQ2P0["CQ2 AI双刃<br>P0: 35%"] --> CQ2P1["P1: 45%"] --> CQ2P2["P2: 50%<br>数据访问权>模型"]
        CQ3P0["CQ3 增长质量<br>P0: 40%"] --> CQ3P1["P1: 55%<br>NRR≈113-115%"] --> CQ3P2["P2: 55%<br>待IES验证"]
        CQ4P0["CQ4 递延收入<br>P0: 30%"] --> CQ4P1["P1: 45%<br>636%含口径变化"] --> CQ4P2["P2: 50%"]
        CQ5P0["CQ5 资本配置<br>P0: 45%"] --> CQ5P1["P1: 50%<br>SBC offset 141%"] --> CQ5P2["P2: 55%<br>MC减值风险"]
    end

    style CQ1P2 fill:#c8e6c9
    style CQ2P2 fill:#fff9c4
    style CQ3P2 fill:#fff9c4
    style CQ4P2 fill:#fff9c4
    style CQ5P2 fill:#fff9c4
```

**读图说明**: 五个CQ中，CQ1(身份定价)置信度提升最快(40%→60%)，因为P2的CK深潜确认了收购回本。CQ2(AI双刃)提升最慢(35%→50%)，反映了AI影响的根本不确定性。所有CQ在P2结束时均未达到70%+的高置信度——这意味着P3/P4仍有重要工作，报告不能在P2阶段就给出强烈的方向性结论。

---

### 图14: 承重墙联合概率分析

```mermaid
graph TB
    GOAL["INTU '金融平台'身份完全实现"]

    GOAL --> W1["墙1: CK 20%+增速<br>P = 60-65%"]
    GOAL --> W2["墙2: IES >$1B ARR<br>P = 45-50%"]
    GOAL --> W3["墙3: AI净增强护城河<br>P = 65-70%"]
    GOAL --> W4["墙4: TT定价权持续<br>P = 70-75%"]

    W1 & W2 & W3 & W4 --> CALC["独立联合概率<br>0.63 × 0.48 × 0.68 × 0.73<br>= 15.0%"]

    CALC --> ADJ["正相关调整后<br>≈ 12-17%"]

    ADJ --> S1["4/4墙成功: 12-17%<br>→ PE 30x+ 情景"]
    ADJ --> S2["3/4墙成功: 35-45%<br>→ PE 22-25x 情景"]
    ADJ --> S3["2/4墙成功: 25-30%<br>→ PE 18-20x (当前)"]
    ADJ --> S4["≤1墙成功: 10-15%<br>→ PE 12-15x 情景"]

    style GOAL fill:#1565C0,color:#fff
    style W2 fill:#ffcdd2
    style CALC fill:#fff9c4
    style S2 fill:#c8e6c9
    style S3 fill:#e3f2fd
```

**读图说明**: "金融平台"身份完全实现(4/4墙)的概率仅12-17%。墙2(IES突破$1B)是最薄弱的一面(45-50%)，因为INTU缺乏企业销售基因。最可能的结果是3/4墙成功(35-45%)，对应PE 22-25x，隐含上行20-40%。当前18x PE大致定价了"2/4墙成功"的情景——如果投资者认为3/4墙更可能，则当前价格低估。

---

### 图15: DuPont ROE分解树

```mermaid
graph TB
    ROE["ROE = 23.5%"]

    ROE --> NM["Net Margin<br>21.6%<br>(利润率驱动)"]
    ROE --> AT["Asset Turnover<br>0.61x<br>(商誉稀释)"]
    ROE --> EM["Equity Multiplier<br>1.78x<br>(温和杠杆)"]

    NM --> NM1["毛利率 80.8%"]
    NM --> NM2["OPM 26.1%<br>(3年+600bps)"]
    NM --> NM3["vs ADBE NM 25%<br>vs CRM NM 15-17%"]

    AT --> AT1["$14B商誉<br>拉低AT"]
    AT --> AT2["调整后AT<br>≈1.2-1.5x"]

    EM --> EM1["总债务$6.6B"]
    EM --> EM2["递延收入$8.1B<br>(好负债)"]
    EM --> EM3["真实杠杆<br>仅1.3-1.4x"]

    subgraph "ROE质量对比"
        INTU_Q["INTU: 利润率驱动<br>最可持续"]
        CRM_Q["CRM: 杠杆驱动<br>风险最高"]
        ADBE_Q["ADBE: 双驱动<br>绝对值最高35-40%"]
    end

    style ROE fill:#1565C0,color:#fff
    style NM fill:#4CAF50,color:#fff
    style AT fill:#FF9800,color:#fff
    style EM fill:#9E9E9E,color:#fff
    style INTU_Q fill:#c8e6c9
    style CRM_Q fill:#ffcdd2
```

**读图说明**: ROE 23.5%主要由净利润率(21.6%)驱动，这是最健康的ROE结构——不依赖加杠杆或资产膨胀。AT仅0.61x是因为$14B商誉(Mailchimp+CK收购)稀释了资产周转效率，调整后约1.2-1.5x更接近真实水平。EM 1.78x中相当部分来自递延收入$8.1B(客户预付而非借款)，真实财务杠杆仅1.3-1.4x，非常保守。与CRM的杠杆驱动ROE相比，INTU在经济下行时韧性更强。

---

## 图表统计

| 类别 | 图表数 | 编号 |
|------|--------|------|
| 业务架构 | 4 | 图1-4 |
| 估值与财务 | 4 | 图5-8 |
| 护城河与竞争 | 4 | 图9-12 |
| 分析框架 | 3 | 图13-15 |
| **总计** | **15** | — |

> **嵌入指引**: 图1-4嵌入业务理解章节(Ch3/Ch4)，图5-8嵌入估值章节(Ch1/Ch6)，图9-12嵌入护城河与竞争章节(Ch11/Ch-B4)，图13-15嵌入分析框架章节(Ch9/Ch6)。与P2已有的8个Mermaid图合计达23个，Phase 3/4再补2-3个即可满足G4≥25门控。
