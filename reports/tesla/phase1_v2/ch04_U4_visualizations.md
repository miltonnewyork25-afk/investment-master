# U4 — Mermaid可视化套件

> **编制说明**: 本章通过6组可视化图表，将Tesla核心财务与战略数据转化为直观的决策支持工具。所有数据基于FY2025实际财报及最新市场数据，每张图表附带关键洞察提炼，帮助投资者在30秒内抓住核心信号。

---

## 4.1 收入结构演进 — FY2025营收拆分

Tesla的收入结构正在发生质变。汽车业务虽仍占据主导地位，但能源与服务两大板块合计已突破四分之一，标志着Tesla从"电动车公司"向"能源+AI平台"的转型加速。FY2025总营收$94.83B，三大板块占比如下。[A: Tesla IR Q4 2025]

```mermaid
pie title Tesla FY2025 营收结构 ($94.83B)
    "汽车业务 $69.53B" : 73.3
    "能源业务 $12.78B" : 13.5
    "服务及其他 $12.53B" : 13.2
```

> **关键洞察**: 能源业务营收$12.78B（+67% YoY）已逼近服务板块，成为Tesla增长最快的第二曲线。若能源业务维持当前增速，预计FY2026将突破$20B，占比提升至16-18%。汽车业务占比从FY2023的85%降至73.3%，收入多元化趋势确立。

---

## 4.2 产品时间线 — 2024-2028关键里程碑

Tesla正处于产品周期的密集切换期：旧车型（Model S/X）退役、核心车型改款、全新平台（Cybercab/Semi）量产、以及Optimus人形机器人商业化，四条线索并行推进。以下甘特图呈现各产品线的关键时间节点。[A: Tesla IR Q4 2025, Earnings Call]

```mermaid
gantt
    title Tesla 产品路线图 2024-2028
    dateFormat YYYY-MM
    axisFormat %Y-%m

    section 现有车型
    Model 3/Y 持续交付           :active, my, 2024-01, 2028-12
    Model S/X 生产 (停产mid-2026) :crit, sx, 2024-01, 2026-06
    Refreshed Model Y 上海投产    :milestone, 2025-01, 0d

    section 新平台车型
    Cybercab 研发与测试            :cb1, 2024-06, 2026-03
    Cybercab 奥斯汀工厂量产启动    :crit, milestone, 2026-04, 0d
    Cybercab 规模化爬坡            :cb2, 2026-04, 2027-12
    Semi 量产准备                  :semi1, 2025-01, 2026-06
    Semi 批量交付启动              :milestone, 2026-06, 0d
    Semi 规模化交付                :semi2, 2026-06, 2028-12

    section AI与机器人
    FSD v13 推送 (1.1M用户)       :milestone, 2025-03, 0d
    FSD 订阅制转型                 :crit, milestone, 2026-02, 0d
    Optimus 工厂内部测试           :op1, 2025-01, 2026-06
    Optimus 有限商业化             :op2, 2026-06, 2027-12
    Optimus 规模外销               :op3, 2028-01, 2028-12

    section 能源业务
    Megapack 上海工厂投产          :milestone, 2025-05, 0d
    年部署目标 >60 GWh            :eng1, 2026-01, 2026-12
    Megapack 产能翻倍              :eng2, 2027-01, 2028-12
```

> **关键洞察**: 2026年是Tesla的"超级产品年"——Cybercab（4月）、Semi（年中）、Optimus有限商业化、FSD订阅制转型、Model S/X停产，五大事件密集落地。这解释了2026年CapEx飙升至>$20B的合理性，但也意味着执行风险高度集中。任何单一产品线的延迟都可能引发连锁反应。

---

## 4.3 现金流瀑布 — FY2025实际 vs FY2026指引

现金流是检验Tesla"既要增长又要盈利"故事的核心指标。FY2025经营性现金流$14.747B，扣除$8.527B资本开支后，自由现金流$6.22B。然而2026年CapEx指引>$20B，意味着即使OCF同比增长30%，FCF仍可能转负。以下瀑布图直观呈现这一关键张力。[A: Tesla IR Q4 2025]

```mermaid
flowchart LR
    subgraph FY2025实际
        A["经营现金流<br/>OCF $14.75B"] --> B["资本开支<br/>CapEx -$8.53B"]
        B --> C["自由现金流<br/>FCF $6.22B<br/>✅ 正向"]
    end

    subgraph FY2026指引情景
        D["OCF预估<br/>~$17-19B<br/>(+15~30%)"] --> E["CapEx指引<br/>>$20B<br/>(+135%)"]
        E --> F["FCF预估<br/>-$1B ~ -$3B<br/>⚠ 可能转负"]
    end

    C -. "CapEx翻倍+" .-> F

    style A fill:#2d6a4f,color:#fff
    style C fill:#2d6a4f,color:#fff
    style D fill:#40916c,color:#fff
    style F fill:#d00000,color:#fff
    style E fill:#e85d04,color:#fff
    style B fill:#e85d04,color:#fff
```

> **关键洞察**: FY2025的FCF $6.22B看似健康，但FY2026 CapEx指引>$20B（同比+135%）将大幅压缩甚至吞噬自由现金流。这是Tesla主动选择的"投资换增长"策略——Cybercab产线、Semi工厂、Megapack扩产、Optimus研发同时推进。投资者需要判断：这$20B+的资本开支能否在2027-2028年转化为显著的收入增量与利润率提升。现金储备$36.6B提供了缓冲垫，但连续两年负FCF将考验市场信心。

---

## 4.4 竞争格局定位 — 技术领先性 vs 规模化能力

电动车竞争已进入"技术+规模"双轴博弈阶段。以下象限图定位Tesla与主要竞争对手在两个关键维度上的相对位置：纵轴为技术领先性（FSD/自动驾驶/软件能力），横轴为量产规模（年交付量）。[A: Tesla IR Q4 2025, 各公司公开数据]

```mermaid
quadrantChart
    title 全球电动车竞争格局定位 (2025)
    x-axis "低产量" --> "高产量"
    y-axis "技术跟随" --> "技术领先"
    quadrant-1 "技术领先+规模化"
    quadrant-2 "技术领先+小规模"
    quadrant-3 "技术跟随+小规模"
    quadrant-4 "技术跟随+规模化"
    Tesla: [0.55, 0.92]
    BYD: [0.95, 0.58]
    Toyota: [0.80, 0.35]
    GM: [0.50, 0.30]
    Ford: [0.42, 0.28]
    Rivian: [0.12, 0.62]
    NIO: [0.15, 0.55]
    Waymo: [0.05, 0.88]
```

> **关键洞察**: Tesla占据"技术领先"象限的制高点，但在规模轴上已被BYD（4.54M辆 vs 1.63M辆，2.8倍差距）显著超越。BYD凭借垂直整合+中国制造成本优势占据"规模化+技术中上"的强势位置。Tesla的战略赌注是：通过FSD/Cybercab/Optimus将技术优势货币化，避免陷入与BYD的纯规模战。Waymo在技术轴上接近Tesla但缺乏硬件规模，Rivian/NIO技术有亮点但规模严重不足。传统车企（Toyota/GM/Ford）在两个维度上均处于追赶状态。

---

## 4.5 估值分解 — $1.49万亿市值的隐含假设

当前Tesla市值$1,490B（PE 371x），远超传统汽车估值框架。市场定价中隐含了对多个业务单元的乐观预期。以下图表将总市值拆解为各业务板块的隐含估值，揭示"市场在为什么买单"。[A: MCP工具, 2026-02-06; 分析师估算]

```mermaid
flowchart TB
    MV["<b>Tesla 总市值</b><br/>$1,490B | PE 371x<br/>股价 $397.21"]

    MV --> AUTO["<b>汽车制造业务</b><br/>隐含估值 ~$180B<br/>基于15x EV/EBITDA<br/>对标传统车企溢价"]
    MV --> FSD["<b>FSD / 自动驾驶</b><br/>隐含估值 ~$500B<br/>1.1M用户 × 订阅转化<br/>Robotaxi网络期权"]
    MV --> ENERGY["<b>能源业务</b><br/>隐含估值 ~$150B<br/>46.7GWh部署<br/>高增速 +67% YoY"]
    MV --> OPTIMUS["<b>Optimus 机器人</b><br/>隐含估值 ~$200B<br/>纯期权价值<br/>2026有限商业化"]
    MV --> BRAND["<b>品牌 + 生态溢价</b><br/>隐含估值 ~$200B<br/>充电网络 / 软件生态<br/>Musk溢价"]
    MV --> OTHER["<b>其他 / 未分配</b><br/>~$260B<br/>市场情绪 / 投机溢价"]

    style MV fill:#1a1a2e,color:#fff,stroke:#e94560
    style AUTO fill:#16213e,color:#fff
    style FSD fill:#0f3460,color:#fff,stroke:#e94560,stroke-width:3px
    style ENERGY fill:#16213e,color:#fff
    style OPTIMUS fill:#533483,color:#fff
    style BRAND fill:#16213e,color:#fff
    style OTHER fill:#4a4a4a,color:#fff

    AUTO -.- NOTE1["传统车企估值锚<br/>BYD ~$110B, TM ~$250B"]
    FSD -.- NOTE2["最大估值驱动力<br/>占总市值 ~34%"]
    OPTIMUS -.- NOTE3["尚无收入<br/>纯叙事定价"]

    style NOTE1 fill:#fff,color:#333,stroke:#ccc
    style NOTE2 fill:#fff,color:#d00000,stroke:#d00000
    style NOTE3 fill:#fff,color:#333,stroke:#ccc
```

> **关键洞察**: FSD/自动驾驶是Tesla估值的最大单一驱动力（隐含~$500B，占比约34%）。纯汽车制造业务仅支撑约$180B估值（对标BYD $110B + 合理溢价）。这意味着：如果FSD在2026-2027年未能实现Robotaxi商业化的实质性突破，当前市值中有超过$800B（FSD+Optimus+情绪溢价）面临重估风险。反之，若Cybercab+FSD的Robotaxi模式跑通，$500B的FSD估值反而可能被证明保守。PE 371x的本质是市场在为2028-2030年的Tesla定价，而非当下。

---

## 4.6 技术路线图 — FSD到Robotaxi的商业化路径

FSD是连接Tesla当前业务与未来愿景的核心纽带。从L2+辅助驾驶到完全无人Robotaxi服务，技术跃迁与商业模式转型需要经历多个关键节点。以下流程图展示这条路径的逻辑链与当前进展。[A: Tesla IR Q4 2025, Earnings Call]

```mermaid
flowchart TD
    subgraph 当前阶段 ["当前阶段 (2025-2026初)"]
        A["FSD v13 (监督式)<br/>L2+ 辅助驾驶<br/>1.1M 活跃用户"] --> B["FSD 订阅制转型<br/>2026年2月启动<br/>$99/月 or $8K买断"]
        B --> C["数据飞轮加速<br/>每日数十亿英里数据<br/>端到端神经网络训练"]
    end

    subgraph 过渡阶段 ["过渡阶段 (2026)"]
        C --> D["Cybercab 量产<br/>2026年4月奥斯汀<br/>无方向盘/踏板"]
        D --> E["Austin 试点 Robotaxi<br/>限定区域运营<br/>安全员在车内"]
        E --> F["监管审批推进<br/>州级许可 → 联邦框架<br/>关键不确定性"]
    end

    subgraph 目标阶段 ["目标阶段 (2027-2028)"]
        F --> G["无人驾驶 Robotaxi<br/>多城市扩展<br/>车主共享网络"]
        G --> H["Tesla Network<br/>平台抽成模式<br/>类Uber但无司机成本"]
        H --> I["规模化收入<br/>目标 >$10B/年<br/>软件级利润率 >60%"]
    end

    C -.-> J["训练算力投入<br/>Dojo + NVIDIA H100<br/>2026 CapEx核心去向"]
    F -.-> K["⚠ 最大风险节点<br/>监管时间表不可控<br/>技术安全标准未定"]
    G -.-> L["竞争者: Waymo<br/>已在旧金山/洛杉矶运营<br/>但依赖激光雷达+高精地图"]

    style A fill:#2d6a4f,color:#fff
    style D fill:#e85d04,color:#fff
    style I fill:#1a1a2e,color:#fff
    style K fill:#d00000,color:#fff
    style J fill:#40916c,color:#fff
    style L fill:#4a4a4a,color:#fff
```

> **关键洞察**: FSD到Robotaxi的商业化路径存在一个"硬卡点"——监管审批（节点F）。技术进步（数据飞轮）和产品落地（Cybercab量产）在Tesla的控制范围内，但无人驾驶的监管框架建立是外生变量，时间表高度不确定。Waymo已在部分城市获得无人驾驶许可，但采用完全不同的技术路线（激光雷达+高精地图 vs Tesla的纯视觉方案），两者的监管路径可能分化。FSD订阅制转型（2026年2月）是近期可观测的关键指标——转化率和留存率将直接验证用户对FSD的真实支付意愿。

---

## 可视化总览表

| 编号 | 图表名称 | 图表类型 | 核心数据 | 关键洞察 |
|:----:|---------|---------|---------|---------|
| 4.1 | 收入结构演进 | 饼图 | FY2025 $94.83B三板块占比 | 能源业务+67% YoY，收入多元化趋势确立，汽车占比从85%降至73.3% |
| 4.2 | 产品时间线 | 甘特图 | 2024-2028六大产品线里程碑 | 2026年五大事件密集落地，执行风险高度集中，解释CapEx>$20B合理性 |
| 4.3 | 现金流瀑布 | 流程图 | OCF $14.75B → FCF $6.22B → 2026 FCF可能转负 | CapEx翻倍+将压缩FCF，$36.6B现金储备提供缓冲，但连续负FCF考验信心 |
| 4.4 | 竞争格局定位 | 象限图 | Tesla vs 6家竞争对手双轴定位 | BYD规模2.8倍领先，Tesla赌注在技术货币化而非纯规模战 |
| 4.5 | 估值分解 | 流程图 | $1,490B市值拆解为6个业务单元 | FSD隐含~$500B（34%），汽车制造仅~$180B，PE 371x本质是为2028-2030定价 |
| 4.6 | 技术路线图 | 流程图 | FSD → Cybercab → Robotaxi三阶段路径 | 监管审批是"硬卡点"，FSD订阅转化率是近期可观测的关键验证指标 |

---

## 本章数据来源

- [A: Tesla IR Q4 2025] — Tesla Investor Relations, FY2025 Annual Report & Q4 Earnings
- [A: MCP工具, 2026-02-06] — 实时市场数据（股价、PE、RSI等）
- [A: 分析师估算] — 基于公开数据的推理分析，非官方指引
- 竞争对手数据来源: BYD年报、Toyota/GM/Ford公开财报、Rivian/NIO季度报告

---

> **免责声明**: 本报告仅供投资研究参考，不构成任何投资建议。所有估值分解均为分析师基于公开数据的推算，实际业务价值可能与隐含估值存在重大偏差。投资者应基于自身判断做出决策，并充分认识到集中投资单一股票的风险。过往表现不代表未来收益。
