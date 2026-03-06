# AVGO 传统半导体业务 & Apple替代风险 — 文献侦察

> 日期: 2026-03-06 | 数据窗口: 2024Q4 - 2026Q1 | 类型: Tier 3预研

---

## 1. Apple自研WiFi/蓝牙芯片进展 — "Proxima/N1"替代时间线

**核心事实**:
- Apple内部代号"Proxima"的自研WiFi+蓝牙组合芯片(对外称"N1")已于2025年随iPhone 17系列正式发布，同期进入Apple TV和HomePod mini
- 2026年扩展至iPad和Mac产品线，完成全产品线替代
- 该芯片支持Wi-Fi 6E/Wi-Fi 7标准，目标是将蜂窝、WiFi、蓝牙紧密集成以提升能效
- Apple自2008年iPhone 3G起使用Broadcom WiFi芯片，合作长达17年
- **长期目标**: Apple计划最终将WiFi/蓝牙芯片与自研5G基带合并为单一无线SoC

**未完全脱离**: Apple仍将使用Broadcom设计的射频滤波器(RF filter)用于调制解调器，短期内无法100%去Broadcom化

**来源**: [MacRumors 2024/12](https://www.macrumors.com/2024/12/12/apple-custom-bluetooth-wifi-chip/) | [Wi-Fi NOW](https://wifinowglobal.com/news-blog/apple-finally-ditches-broadcom-and-launches-new-n1-wi-fi-7-chip-to-power-iphone-17-but-how-well-will-it-work/) | [Bloomberg 2024/12](https://www.bloomberg.com/news/articles/2024-12-12/apple-nears-switch-to-in-house-bluetooth-and-wi-fi-chip-for-iphone-home)

---

## 2. Broadcom传统半导体收入趋势 (非AI)

**FY2025全年**: 半导体部门总收入创纪录$37B，其中AI半导体约$15.8B(Q4为$4.4B×4季度加权)，非AI半导体约$16-17B

**Q4 FY2025 (截至2025/11)**:
- 非AI半导体收入 $4.6B，同比+2%，环比+16%(无线季节性驱动)
- **宽带(Broadband)**: 同比强劲恢复，受DOCSIS 4.0升级(美国+中国)驱动
- **无线(Wireless)**: 同比持平，Q4受北美大客户(Apple)新品发布季节性环比+30%
- **企业网络+服务器存储+工业**: 同比下降，企业支出恢复有限
- 管理层定义为"U型复苏" — 宽带领先，其余子板块滞后

**Q1 FY2026指引**: 非AI半导体收入约$4.1B，同比持平，环比下降(无线季节性退潮)

**完整周期复苏**: 预计要到2026年中至下半年才能全面实现

**来源**: [Broadcom Q4 FY2025 Earnings](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-fourth-quarter-and-fiscal-year-2025) | [Futurum Q4分析](https://futurumgroup.com/insights/broadcom-q4-fy-2025-earnings-ai-and-software-drive-beat/) | [Futurum Q3分析](https://futurumgroup.com/insights/broadcom-q3-fy-2025-earnings-beat-estimates-amid-ai-semi-acceleration/)

---

## 3. Apple收入依赖度与过渡风险量化

**客户集中度**: Broadcom前5大终端客户占总收入约40%，Apple为最大单一客户

**WiFi芯片替代的直接影响**:
- 据郭明錤(Ming-Chi Kuo)估计，Broadcom每年向Apple供应超3亿颗WiFi芯片，涉及收入约$2.7B
- 该$2.7B占Broadcom Apple相关收入的33.6%，但仅占公司总收入的约4.3%(FY2025基准)
- 影响占比预计从FY2025的4.3%逐步降至FY2028的3.3%(因总收入增长稀释)
- WiFi收入损失将使Broadcom全球WiFi市场份额从约27%降至约12.5%

**未受影响的Apple业务**:
- RF芯片业务(占Apple相关收入约65%)短期保留，但面临Qualcomm和Skyworks竞争
- Apple $500B AI基础设施投资为Broadcom XPU/定制芯片创造新增量(估计2028年可达$12.5B/年AI服务器芯片)
- Apple可能成为Broadcom AI定制芯片客户(未确认)

**净影响评估**: WiFi芯片损失(-$2.7B)部分被AI芯片增量抵消，但替代时间线不完全重叠 — 2025-2026为"净损失窗口"

**来源**: [Seeking Alpha AVGO-Apple分析](https://seekingalpha.com/article/4768725-broadcom-apple-chip-revenue-gains-and-losses) | [Moomoo技术周刊](https://www.moomoo.com/community/feed/technology-weekly-apple-is-quietly-ditching-broadcom-s-wi-fi-114254537163161) | [Broadcom 10-K FY2025](https://investors.broadcom.com/static-files/752e631c-b5f3-46af-9d67-bdeb658f5fa2)

---

## 4. 传统产品组合可持续性

**产品组合演变**:
- Broadcom 60年+历史(AT&T/Bell Labs → LSI → Broadcom Corp → Brocade → CA → Symantec → VMware)积累了庞大的传统半导体产品线
- 公司战略重心明确转向AI基础设施+企业软件双引擎
- 传统产品(企业存储、宽带、工业)处于维护/渐进升级模式，非战略增长优先级

**技术升级亮点**:
- Wi-Fi 8平台发布(智能功耗管理+绿色合规)
- Co-Packaged Optics(CPO)技术降低数据中心互联功耗 — 但这属于AI相关创新
- DOCSIS 4.0宽带升级周期提供2-3年可见度

**Wall Street共识**: FY2026收入增长约50%至$96B(42位分析师平均)，增量几乎全部来自AI+VMware，传统半导体贡献极小

**来源**: [Seeking Alpha FY2026展望](https://seekingalpha.com/article/4856033-broadcom-one-of-our-favorite-picks-for-2026-in-semiconductor-universe) | [Broadcom Wi-Fi 8发布](https://investors.broadcom.com/news-releases/news-release-details/broadcom-launches-unified-wi-fi-8-platform-seamless-ai)

---

## 5. 股息增长与资本回报策略

**股息历史**:
- FY2026季度股息$0.65/股(年化$2.60/股)，同比+10%
- 自2011年启动股息以来**连续15年增长**
- FY2025股息支出$11.1B

**回购加速**:
- FY2025回购$6.4B
- Q1 FY2026单季回购$7.8B(加速明显)
- 董事会新批准$10B回购授权
- FY2025总股东回报$17.5B(股息$11.1B + 回购$6.4B)
- Q1 FY2026股东回报$10.9B(股息$3.1B + 回购$7.8B) — 年化pace ~$44B

**现金流支撑**:
- FY2025自由现金流$26.9B，同比+39%
- AI积压订单$73B+(未来18个月交付)，保障未来现金流

**策略转变信号**: 从"高股息+适度回购"转向"高股息+激进回购"，反映管理层对FCF持续增长的信心，也暗示传统业务现金流足够稳定以支撑高额资本回报

**来源**: [Broadcom Q1 FY2026 Earnings](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-first-quarter-fiscal-year-2026-financial) | [TheStreet股息分析](https://www.thestreet.com/investing/stocks/can-broadcom-avgo-stock-continue-to-deliver-eye-popping-dividend-hike-in-2026) | [Minichart Q1总结](https://www.minichart.com.sg/2026/03/05/broadcom-inc-reports-record-q1-2026-results-19-3b-revenue-8-4b-ai-sales-10b-share-buyback-dividend-announcement/)

---

## 关键数据汇总表

| 指标 | 数值 | 来源时间 |
|------|------|----------|
| Apple WiFi芯片年供应量 | >3亿颗 | 郭明錤 2024/12 |
| WiFi替代收入影响 | ~$2.7B | Seeking Alpha 估算 |
| 影响占总收入比 | ~4.3% (FY2025) | Seeking Alpha |
| 非AI半导体Q4收入 | $4.6B | Q4 FY2025 |
| 非AI半导体Q1F26指引 | $4.1B | Q1 FY2026 |
| 半导体总收入 FY2025 | $37B | FY2025 10-K |
| 自由现金流 FY2025 | $26.9B | FY2025 |
| 年化股息 FY2026 | $2.60/股 | IR公告 |
| Q1 FY2026回购 | $7.8B | Q1 FY2026 |
| AI积压订单 | $73B+ | Q1 FY2026 |
| FY2026 Wall Street共识收入 | ~$96B (+50% YoY) | 42位分析师 |

---

## 初步研判 — 传统业务风险图谱

1. **Apple WiFi替代**: 已确认执行，$2.7B收入损失在FY2025-2026逐步体现。但占总收入仅4%，且RF业务暂保留。**风险等级: 中 — 可量化且可管理**

2. **非AI半导体周期**: U型复苏进行中，宽带领先但企业网络/存储滞后。预计2026H2全面回暖。**风险等级: 低 — 周期性而非结构性**

3. **传统产品衰减**: 公司战略重心已转向AI+软件，传统产品处于"收割模式"(高利润低投入)。长期看收入占比将持续收缩。**风险等级: 中低 — 有序退出而非崩塌**

4. **资本回报可持续性**: $26.9B FCF支撑$17.5B+回报绰绰有余。AI增长→FCF增长→回报增长的飞轮效应明确。**风险等级: 低**

5. **核心矛盾**: 市场给AVGO的估值几乎完全基于AI+VMware增长叙事，传统半导体$16-17B收入被视为"稳定现金流基座"。如果Apple替代+周期复苏不达预期同时发生，可能触发对整个"基座稳定性"的重估。**这是非共识风险点。**
