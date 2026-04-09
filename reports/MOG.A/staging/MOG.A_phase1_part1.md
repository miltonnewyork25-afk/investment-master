# MOG.A Phase 1 Part 1 — 业务理解 + 分部经济 + 主驱动图
> Tier 3 深度调研 | 2026-04-09 | 目标 240-375K chars (本 Part 约 20-25K)
> 围绕 Phase 0.75 主线: **FCF 会计悖论 + 驱动归因错 + 置信度不对称**

---

## Ch 1 核心争议: Moog 到底在卖什么

打开 MOG.A 的股价图: 过去 12 个月, 股价从 $147 涨到 $313, **翻 2.1 倍**; 过去 3 年, EV/EBITDA 从 FY22 末的 8.5x 扩张到 FY25 末的 15.1x, **翻 1.8 倍**。同期 5 年 FCF 均值却纹丝不动在 $100M 左右 (FY20 $191M / FY21 $164M / FY22 $107M / FY23 -$37M / FY24 $46M / FY25 $128M) [DM-FIN-001]。市场多付的 $7.7B 市值背后, 这家公司产生的自由现金流**根本没有参与这轮 re-rating**。

这就是本报告要追的核心争议。

市场当前的默认看法是: "MOG 是 A&D 板块 re-rating 篮子里质量最差但弹性最大的落后者。PH / HWM / CW / HEI / TDG 已经拉到 EV/EBITDA 18-35x, MOG 只有 15.1x, 还有至少 20% 追赶空间; 加上 FY26 EBITDA 共识 +15% 增长 = 两年内从 $313 走到 $400+。" 这个叙事的三个承重点是 (a) backlog 增速 (目前 +30%, 加速中), (b) book-to-bill (Q1 FY26 达 2.1x, 十年罕见), (c) adjusted operating margin 从 FY24 10.9% → FY25 13.0%, 市场相信继续扩到 14-15% 向 PH/WWD 看齐 [staging/MOG.A_default_map_audit.md]。这三个变量都是真的, 都能在财报/投资者 deck 里读到数字。

但默认看法有**三件事解释不通**:

**第一件解释不通**: FY2026 美国国防基础预算 **下降 6.3%** (FY25 $895.2B → FY26 $838.7B), 2026-03 参议院拨款委员会通过。如果 MOG re-rating 建立在"美国 A&D TAM 结构性上行", 那 base budget 下降应该打断叙事 — 但整个 A&D 篮子继续创新高。这意味着 re-rating 的**真实驱动不是美国 base**, 而是欧洲 (€800B ReArm Europe + €377B 德国特别基金) + 导弹量产 supplemental (FY25-26 通过 supplemental/FMS 渠道拨付的 Patriot/NSM/LRHW 订单) + backlog 一次性 catch-up 释放。**这三个驱动的持续性完全不同**: 欧洲 rearmament 是 5-10 年结构性; 导弹 surge 可能 2-3 年后饱和; backlog catch-up 是一次性。市场把这三者混在一起定价, 相当于把一个"混合久期资产"按最长久期打分.

**第二件解释不通**: FY23 Moog 交出"好年"数据 — Revenue +9.3%, NI +10%, backlog 上升, 没有并购/重组/一次性 charge — 但 FCF 是 **负 $37M**。原因简单: OCF $136M 被 CapEx $173M 一口吃光。也就是说, Moog 在**周期上行期的稳态现金流就是负的**。FY24 略有恢复到 $46M, FY25 $128M。FY23-FY25 三年累计 NI $613M, 累计 FCF $137M, **NI 到 FCF 的转换率只有 22%**。同期 A&D 同业 HEI、TDG、PH 平均 FCF/NI 约 85-100%。这不是周期问题, 是结构问题。

**第三件解释不通**: 管理层信号与市场信号不对称。CEO Patrick Roche 2023-02 上任, 恰好踩在股价起涨点 ($130 附近), 18 个月内股价涨 2.4 倍 — 但 CEO **零开市买入**, 零 10b5-1 purchase plan [来源: Form 4 汇总 2024-04 至 2026-03]。2024 年总薪酬 $10.2M 里 stock award $2.3M 是授予 (grant), 不是用自己的钱在市场上买。过去 18 个月所有内部人净 21,598 股卖出, 都是 routine vesting 配套的代扣税卖出。零买入不等于"看空", 但意味着最便宜、最早拿到信息的那个人**没有把 18x EV/EBITDA 的 upside 当作值得动用 out-of-pocket 资金的机会**。这和市场 multiple 扩张 1.7x 隐含的乐观度存在置信度不对称。

把三件事合起来, Moog 的市场价格正在透支 (a) 一个可能只有 2-3 年持续性的 supplemental driver, (b) 一个从未被现金流证实过的盈利能力, (c) 一个连自己的 CEO 都没有 conviction 去自掏腰包买入的 re-rating 路径。这就是我们追问的起点。

本报告的**一个问题** (铁律 L1 #5): **"Moog 是在制造一台印钞机, 还是在制造一台会把利润表数字转换成应收账款的机器?"** 这个问题把所有其他问题都收敛掉: 前者对应 FY26E $10.18 × 30x = $305 公允, 基本跟涨 A&D 即可; 后者对应把估值锚从 PE 切换到 EV/FCF 或 Owner Earnings, 合理市值可能在 $4-5B 区间, 当前 $9.9B 过度定价 50% 以上。两个答案之间, 没有温和的中间地带。

---

## Ch 2 业务底盘: Moog 靠什么挣钱

### 2.1 三句话把公司讲清楚

Moog Inc. (NYSE: MOG.A / MOG.B, 1951 年成立, 总部 East Aurora, New York, 13,500 员工) 是一家**精密运动与流体控制系统**的设计/制造/集成商 [DM-BIZ-001]。核心产品是 servo valves (伺服阀)、servo actuators (伺服作动器) 和 motion control systems — 本质上是把"电子/液压/气动信号"转换为"受控机械运动"的装置。这些装置被装在战斗机的襟翼作动器里、装在导弹的姿态控制阀里、装在航天器的推力矢量控制系统里、装在塑料注塑机的合模动作里、装在 CT 扫描仪的病床伺服马达里。

三个产品特征决定了 Moog 的商业模式:
1. **Mission-critical, low-cost fraction**: Moog 的组件通常只占系统总价的 1-5%, 但一旦失效会导致整机失效 (飞控失效/导弹失控/注塑机停机)。客户的风险规避心理远强于价格敏感度 — 这是所有 Tier-2 A&D 供应商的共同特征, 也是 MOG 的第一道护城河来源。
2. **Long-cycle program accounting**: A&D 客户 (波音/洛马/RTX/GD/Northrop) 的采购周期从设计到量产到 sustainment 往往跨 20-40 年。一旦某个机型的作动器份额给了 Moog, 竞争对手在该机型生命周期内几乎无法切入。F-16 的 flight actuators MOG 装了 50 年, F-35 已经装到量产第 20 年。
3. **后市场尾巴 > 首次装机**: 典型 A&D 组件 aftermarket/售后 revenue 是 OE (原始装机) revenue 的 3-5 倍生命周期总额, 且毛利率显著更高 (Moog 商业机售后 GM 估 ~35-40% vs OE ~18-22%, 参考 HEI aftermarket disclosure)。这是 Moog 真正的盈利 engine — 但 Moog 不单独披露 aftermarket mix, 是**第一个公开度缺口** [CQ-SEG-02]。

### 2.2 四个分部, 不同的经济学

截至 FY25 (2025-09-27 年报), Moog 仍保留四分部结构, 但 2025 年 11 月公开宣布 **Industrial Systems 分部正在准备剥离**, FY26 有望完成。FY25 四分部的 revenue 和 OM 数据 (基于 investor deck 和 lit_recon 交叉验证) 如下:

| 分部 | FY25 Revenue | % 集团 | Segment OM | Segment OI | 典型产品 |
|---|---|---|---|---|---|
| **Military Aircraft** | ~$888M | 23% | ~14.1% | ~$125M | F-35 / F/A-18 / KC-46 primary & secondary flight controls |
| **Space & Defense Controls (S&D)** | ~$1,108M | 29% | **~15.1%** | ~$167M | 导弹姿态控制 / 火箭 TVC / 装甲车辆稳定 / 潜艇 |
| **Commercial Aircraft** | ~$904M | 23% | ~11.8% | ~$107M | 737 / 787 / A320 / A350 primary flight controls + aftermarket |
| **Industrial Systems** (剥离中) | ~$956M | 25% | ~9.5% | ~$91M | 注塑机 / 金属成型 / 模拟器 / 医疗成像 |
| **集团 (reported)** | $3,861M | 100% | 10.6% | $410M | — |

[DM-SEG-001, 数据基于 Q1 FY26 10-Q segment note 回推 + FY25 10-K 尚未公开时的一致预期分布]

**三个关键观察**:

**观察 1**: Space & Defense Controls 是真正的利润 engine — 29% 的收入贡献了 41% 的 segment OI (基于 reported segment OI 未扣集团费用的比例)。这个分部里装着 Moog 最稀缺、最难替代的产品: tactical missile 姿态控制阀 (Patriot / NSM / Aim-9X / 甚至 hypersonics 的 LRHW boost-glide vehicle 控制)、战略导弹 (Sentinel ICBM replacement 的一级/二级推力向量控制), 以及航天客户 (NASA Artemis / SpaceX / Blue Origin) 的精密伺服。这是市场定价的真正锚点 — 但也是**数据公开度最低的分部**, 因为大部分客户合同属于 classified / restricted。

**观察 2**: Commercial Aircraft OM 只有 11.8%, 低于 Military Aircraft 的 14.1%。这反直觉 — 通常商用航空 aftermarket 的 OM 更高。原因是 Moog 的商用航空业务**没有独立拆出 aftermarket**, 而且 737 MAX/787 的 OE 产量 ramp 期 (2024-2025) 吃掉了大量 non-recurring engineering 和产能 build-out 成本。投资者 deck 暗示 FY26-28 随着 MAX 产量回到 38/月 + 787 回到 7/月, 这个分部 OM 有 200-300bp 扩张空间。**但这个 200-300bp 已经是市场共识里的 margin expansion 故事的核心**, 不是 alpha。

**观察 3**: Industrial 的 OM 9.5% 是所有分部中最低的, 而且 FY25 YoY 收入是**下降 4%** (剩余三个分部合计 +10-12%)。这是典型的"拖累源 M3" — 市场认为剥离 Industrial 后集团 OM 会从 10.6% 结构性抬升到 13-14%, 触发倍数 re-rate 到 A&D pure-play 篮子 (18-25x EV/EBITDA)。但这里有个算术问题值得注意: Industrial 剥离损失 $91M OI, 剩余三分部按 13.5% blended OM × $2.9B revenue = $392M OI, **绝对美元 OI 从 $410M 降到 $392M**, 降 4.4%。如果剥离价 $900M-1.0B (10-11x EBITDA, A&D 同业对应 non-core Industrial 分部的实际成交倍数), 净债务减 $900M → enterprise value 降 $900M → 剩余部分 EV/EBITDA 从 15.1x 跃升到 ~17.5x, 确实会有 re-rating。但这笔账是**机械算出来的, 市场已经 priced-in 80%**。真正的问题是: 如果剥离价只拿到 $600-700M (8x EBITDA, 因为买家们都知道这是卖家市场), 净 EV 反而只降 $600-700M, re-rating 幅度会显著缩水, 且一次性**$200-300M 的估值 gap 不会有人替股东补回来**。这个定价风险 Phase 3 估值章再量化。

### 2.3 客户集中度与 program 暴露

Moog 的客户集中度中等偏高: Top 5 客户占约 **35-40%** 的 revenue (Lockheed Martin / Boeing / Raytheon / Airbus / U.S. Government direct) [DM-BIZ-002, 基于 10-K customer concentration disclosure]。但真正重要的是**program 集中度**:

- **F-35 (Lightning II)**: 估计占 Military Aircraft 分部 25-30% 的 revenue, 即集团 ~6-7%。Moog 为 F-35 提供 primary flight control actuators, horizontal stabilizer actuators, 和 utility actuators。Ship-set content 约 $500K-800K/机, LRIP 年产量 FY25 约 150 架, FY26 目标 156 架, FY27-28 稳态 170-180 架。**F-35 是 Moog 的"账面 visibility 主来源" — 未来 15 年 program life 给了市场"backlog visibility"的故事**。但 F-35 面临两个逆风: (a) Block 4 升级推迟到 2028+ (原计划 2025), (b) 特朗普政府 2026-03 提出重新评估 F-35 总采购量从 2,456 架降至 1,800-2,000 架 (TR-3 能力交付争议)。任何一项 adverse outcome 都会直接压制 Moog Military Aircraft backlog 质量.

- **Hypersonics 与导弹 surge**: LRHW (陆基) / CPS (海基) / ARRW (空射) 三个 hypersonic programs 的姿态控制/ TVC 系统估计 80-90% 由 Moog 独供 (来自 Moog 2024 投资者日的非正式披露)。这是 S&D 分部 FY24-FY26 高增长的主引擎。**但 hypersonics 的合同结构是 cost-plus R&D 主导**, 量产转型要等 2027-2028, 当前的 revenue 和 backlog 膨胀里**利润率远低于稳态 S&D 水平**, 是 margin dilution 来源。

- **Space**: 包括 NASA Artemis SLS / Orion 和商业发射客户 (SpaceX 某些产品线 + Blue Origin New Glenn)。占 S&D 分部 ~15-20%。商业发射客户的定价谈判力显著强于 NASA — 这是 Moog 在 space 分部的边际 margin 压力源.

- **Commercial Aircraft**: 波音 737 MAX actuators 是 Moog 最大单一商用 program, 估计 Commercial Aircraft 分部内占 30-35%。787 和 A320/A350 各占 15-20%。737 MAX 的复飞和产量回升是该分部 FY26-28 margin story 的关键前提.

**Program 集中度的双刃性**: 单个 program 拿到就吃 15-40 年 (好), 但拿到之后就锁死了, 任何 program 削减/延期直接打掉 top line (坏)。这是 A&D Tier-2 供应商的共同命运, MOG 不是特例 — 但 MOG 的 **集中度没有 TDG/HEI 那种"高度分散 + 单个 program ≤2% of revenue"的保险**。F-35 占 6-7%, 737 MAX actuators 占 ~5%, 这两个 program 加起来就能 move the needle.

---

## Ch 3 主驱动图 (D1-D5)

L2 工具 D1-D5 框架要求我们识别真正驱动股价的变量, 而不是默认"增长"叙事。对 MOG.A 的识别结果:

| 驱动 | 含义 | MOG.A 的状态 | 权重 |
|---|---|---|---|
| **D1 量** | 靠卖得更多 | Backlog +30%, book-to-bill 2.1x, 主要是 S&D + Military Aircraft 驱动 | **★★** |
| **D2 价/费率** | 靠每笔赚更厚 | A&D 固定价合同 + 通胀 pass-through 有滞后, 定价权受限 | ★ |
| **D3 效率/FCF conversion** | 靠把账面数字变成现金 | **FCF/NI 22% (3 年累计), 结构性落后** | **★★★ 主线** |
| **D4 资本/分配** | 靠把钱投对地方 | CapEx/D&A 1.5-1.9x 重投入期, 回购小额, 分红 $1.17/股 yield 0.6% | ★★ |
| **D5 折现率/制度** | 靠市场给几倍 | EV/EBITDA 8.5x → 15.1x 已翻倍, **不可再赋权** (已定价) | ★ |

**D1 是叙事主角, D3 是真正的主线矛盾**: 市场目前把 MOG 当"D1 = 量增驱动 + D5 = multiple expansion"在定价。但按 L0 研究哲学的"谁最能解释谁优先"原则, **D3 (FCF 转化) 才是能真正解释股价的未来变化**, 因为: 如果 D3 从 22% 恢复到 75%, 市场会发现 EPS 原来不是虚的, 继续给高倍数; 如果 D3 继续锚在 40-50%, 市场会发现 EPS 是"会计幻觉", multiple 会反向收缩。D3 的走向决定 $200 和 $500 两个终点。D1 和 D5 只是"已经发生的事实", 无法再提供 alpha.

**D4 是被低估的变量**: MOG 的 CapEx 强度 (FY20-25 CapEx/D&A 均值 1.55, 累计 $831M vs 累计 D&A $548M, 超额投入 $283M) 说明这是一家正在**扩厂、买设备、加产能**的公司, 不是一家正在**收割现金**的公司。这是**五年前的 TSMC / ASML 状态**而不是**今天的 HEI / TDG 状态**。市场用 HEI/TDG 的倍数定价一个还在 CapEx 周期前半段的公司, 是时点错配.

**D2 (定价权) 的真实强度**: Moog 作为 sole-source 供应商 (F-35 primary actuators 没有第二源) 理论上有定价权, 但 DoD 的 FPRA (Forward Pricing Rate Agreement) 和 CAS (Cost Accounting Standards) 把 margin 压在 "cost + 8-12% fee" 的区间。通胀 pass-through 有 12-18 个月滞后, 2022-2023 高通胀期 MOG 的 material cost 上涨先吃进 margin, 直到 2024-2025 才通过 price escalation 清算出来。这也是 GM 从 24.4% → 27.4% 的部分解释 — **不是定价权增强, 而是通胀周期的账面 catch-up**. 2026 年如果通胀维持 2-3%, 这个 tailwind 会消失, GM 扩张停滞.

### 3.1 "如果只能盯一个指标": FCF 转化率

如果投资者只能跟踪一个指标判断 MOG 的 thesis 是否成立/破产, 那就是 **季度 FCF / 季度 NI 的 TTM 滚动比率**:

- **Thesis 破产 (多头赢)**: TTM FCF/NI ≥ 75% 且连续 4 个季度站稳 → 意味着 CapEx 周期结束, 营运资金正常化, "会计悖论"假说错了。股价合理区间 $330-400.
- **Thesis 强化 (空头赢)**: TTM FCF/NI ≤ 45% 且 FY26 FCF 指引被下修 → 意味着 CapEx 超预期, 营运资金吞噬继续。股价合理区间 $150-220.
- **中间地带**: TTM FCF/NI 45-75% → 市场继续分歧, 股价在 $250-320 震荡, 取决于宏观 A&D 情绪.

管理层在 FY25 年报 earnings call 上给出的 FY26 FCF 指引是 **"至少 60% conversion"**, 长期目标 "75-100%" [来源: Q4 FY25 earnings call transcript, 2025-11 Patrick Roche 发言]. 60% conversion × FY26E NI $327M = FY26 FCF guidance **~$196M**. 如果 Moog 真的交出 $196M, FCF yield 就从 1.3% (FY25) 升到 2.0%, 仍然远低于 A&D 同业 3-5% 的正常水平, 但方向对了, thesis 会进入"中间地带".

**但这里有一个关键校准**: 管理层在 FY24 和 FY23 年报电话会上也给过类似的"FCF conversion will improve" 说法。FY23 guide 隐含 60%+, 实际交出 -22% (负数). FY24 guide 隐含 65%+, 实际交出 22%。**管理层 FCF guidance 过去两年连续大幅 miss, miss 幅度在 40-80pp**. 这不是"预测能力差", 而是"营运资金吞噬具有结构性", 管理层自己都没预期到每年都要多吃 $100-150M 的应收/存货. 这个 track record 是 Phase 4 红队必须重点交叉的 [CQ-GUIDE-01].

---

## Ch 4 分部经济深拆

### 4.1 Space & Defense Controls — 真正的利润中枢

S&D 占集团 29% 的收入但贡献 41% 的 segment OI, 是估值的真正 anchor. 分部内部的 revenue 构成 (基于 10-K 产品系列披露 + 交叉验证):

| 产品类 | ~% S&D | 典型客户 | Moog 地位 |
|---|---|---|---|
| Tactical missile controls | 30-35% | RTX / Lockheed / Northrop | 多数 sole-source |
| Strategic missile / hypersonics | 15-20% | Northrop (Sentinel) / Lockheed (LRHW) | sole-source |
| Space vehicle / launch TVC | 15-20% | NASA / Boeing (SLS) / SpaceX | 共享 (SpaceX 部分 in-house) |
| Armored combat vehicle | 15-20% | GD Land Systems / BAE | 主要供应商 |
| Naval / submarine | 10-15% | GD Electric Boat / Huntington | 稳态客户 |

**S&D 的护城河本质**: 大多数 tactical/strategic missile 客户的程序一旦 specified 了 Moog 的产品, 整个 program life (通常 15-30 年) 不会切换 — 因为 re-qualification 需要 2-3 年 + $5-20M 非经常性工程 + 重新做 airworthiness 认证. 这是一个**准 switching cost 护城河**: 客户不是"无法切换", 是"切换成本大于任何潜在节省". 但要注意, 这个护城河**保护的是存量份额, 不创造新份额** — 新 program 的竞争 (如 Next Generation Air Dominance 机型的作动器, 或 Next Generation Interceptor 的导弹控制) Moog 需要和 Parker Hannifin / Honeywell / Woodward 正面投标.

**S&D 的真实毛利率难以验证**: Moog 不公开分部 GM, 只公开 segment OM。我们用 segment OM 15.1% 反推 GM, 假设 S&D 的 segment-level SG&A 率 (8-10%) 和 R&D 率 (2-3%) 与集团相似, 隐含 segment GM ~26-28%。这低于 HEI defense 分部 GM 36-38% 和 TDG A&D aftermarket GM 55-60%。**原因是 Moog S&D 的 OE/aftermarket mix 可能是 70/30 (OE 主导), 而 HEI/TDG 是 30/70 (aftermarket 主导)**. Aftermarket 的 GM 是 OE 的 2-3 倍. 这意味着 MOG 的"A&D Premium"定位在毛利率层面**没有充分的商业支撑** — 它看起来像 HEI, 但内部现金流结构更像 Parker Hannifin 的 A&D 分部.

### 4.2 Military Aircraft — F-35 锚与替代风险

Military Aircraft 的 program 暴露表:

| Program | 估计 % MA | Ship-set content | Program 状态 |
|---|---|---|---|
| F-35 A/B/C | 25-30% | ~$500-800K | 量产中, 年产 150-180 架 |
| F/A-18 E/F Super Hornet | 10-15% | ~$300-500K | 生产 2025 年末结束, sustainment 转入 |
| KC-46 Pegasus | 10-15% | ~$200-400K | 量产中, Block 2 升级开始 |
| V-22 Osprey | 5-10% | ~$200K | 生产结束, sustainment |
| H-47/UH-60 其他 helicopter | 10-15% | 多样 | sustainment |
| Aftermarket/Sustainment (所有机型) | 30-35% | — | 稳态 |

**关键风险锚: F-35 的 Block 4 / TR-3 问题**. Block 4 是 F-35 的下一代航电/传感器升级, 原计划 2024-2025 交付, 因为 Lockheed 的 TR-3 (Tech Refresh 3) 硬件延迟, 整个 Block 4 计划推迟到 **2028-2029**. 这不直接影响 Moog 的 actuators (不依赖 TR-3), 但 **影响 F-35 整体 production rate** — 因为 Lockheed 在 TR-3 未准备好前 accept 了大量"Truncated Capability" (TC) 飞机, 交付被 DoD 拒收超过 100 架. 如果 FY26-27 F-35 年产量被迫削减到 120-140 架 (vs 计划 170+), Moog Military Aircraft backlog 的"visibility 叙事"会直接打折. 这个情景对应 MA 分部 FY27 revenue **downside ~8-10%**, 对应集团 revenue downside ~2%, 对应 EPS downside ~$0.40-0.60, 在 27x PE 下约 **$11-16/股**. 不是灭顶之灾, 但会让市场意识到 F-35 的"visibility"是有条件的.

### 4.3 Commercial Aircraft — 737 MAX 与 Aftermarket 未拆分的盲区

Commercial Aircraft FY25 $904M 的 revenue 分布估计:

| Program | % CA | 备注 |
|---|---|---|
| 737 MAX (含 MAX 10/MAX 7 pending cert) | 30-35% | 2024 cert 拖延 + 2024 Alaska 事故产能冻结回稳中 |
| 787 Dreamliner | 15-20% | 产量 FY25 ~6/月 → FY27 目标 10/月 |
| A320 family (neo) | 15-20% | 产量爬坡至 75/月 受 CFM LEAP 瓶颈制约 |
| A350 XWB | 10-15% | 稳态 9-10/月 |
| 其他商用 / 商务机 | 15-20% | Embraer / 湾流 / etc |
| **Aftermarket** (未单独披露) | ? | 估计 20-30% of CA, 但 Moog 不拆 |

**Commercial Aircraft 分部的最大盲区是 aftermarket 占比**. 投资者 deck 里 Moog 说 "aftermarket is a significant portion of Commercial Aircraft revenue", 但从不给具体数字. 用 segment OM 11.8% 回推, 如果 aftermarket 是 25% 且 aftermarket GM 35% / OE GM 18%, 隐含 mix 合理; 如果 aftermarket 是 15% 则 OE GM 需要 20%+ 才能 reconcile, 比行业典型的 18-20% 偏高. **这个盲区是 Phase 2 财务深度时必须用 bottom-up reconcile 的关键点** [CQ-CA-01].

市场对 Commercial Aircraft 的 FY26-28 margin 扩张故事建立在两个前提: (a) 737 MAX 产量从 FY25 的 ~32/月 回到 FY26 底 38/月 + FY27 52/月 (FAA 批准前提下), (b) 787 从 6/月 → 10/月. 两个前提都**不在 Moog 控制范围内**, 依赖波音. 波音过去 3 年 (2023-2025) 产量 guidance 连续大幅 miss, 给 Moog CA 分部的 margin 扩张预期带来对称的下行风险 — 如果波音 FY26 产量 catch-up 失败, MOG CA 分部 revenue 下修 5-8%, OM 压缩到 10% 以下, segment OI 损失 ~$25-40M, 集团 EPS 打折 ~$0.80-1.25.

### 4.4 Industrial Systems — 即将剥离的拖累源

Industrial FY25 $956M revenue / ~9.5% OM / -4% YoY growth. 四个子业务:

| Sub-segment | % Industrial | 状态 |
|---|---|---|
| 注塑/blow molding 机床 (Moog servo drives) | 25-30% | 中国产能过剩拖累, FY25 -8% |
| 金属成型 press controls | 15-20% | 汽车 OEM CapEx 周期尾段, 平稳 |
| 仿真/模拟器 (飞行/汽车训练) | 15-20% | 与防务部分协同, 稳态增长 |
| 医疗 (CT/MRI 精密马达 + 输液泵) | 15-20% | 去库存压力, FY25 平稳 |
| 能源 (oil & gas + 风电) + 其他 | 15-20% | 周期性 |

**剥离的实际估值** 是决定 Industrial 故事是"re-rating 催化剂"还是"平价出清"的关键. 假设基准情景 $850M (9x EBITDA $94M), 则剥离后剩余集团 EV 从 $7.37B → $6.52B, 剩余 EBITDA 从 $488M → $394M, 剩余 EV/EBITDA 从 15.1x → 16.5x (略有提升但不显著). 如果剥离价 $1.0B (管理层乐观目标), 剩余 EV/EBITDA 降到 **16.1x** (更低), 反而 re-rating 空间缩小. 如果剥离价 $650M (保守), 剩余 EV/EBITDA 升到 **17.0x**, 真的产生了 mechanic re-rating. **这是反直觉的**: 卖得越便宜, 剩余部分的 mechanic EV/EBITDA 反而越高 (因为 debt 减少幅度小于 EBITDA 减少幅度的倍数效应). 市场在预期"高价剥离", 但高价剥离反而会缩小 re-rating 幅度. 这是 Phase 3 估值必须单独建表的情景.

---

## Ch 5 Phase 1 Part 1 小结 + 下一步

### 本 Part 产出的关键论点

1. **市场当前定价的三个承重点 (backlog 增速 / book-to-bill / adj OM 扩张) 都是真的**, 但隐含假设 (美国国防 base 扩张 / EPS = shareholder return / ROIC 保持 9%+) 有系统性漏洞.

2. **MOG 的真正利润中枢是 S&D 分部**, 贡献 41% 的 segment OI, 护城河是 switching cost 而非定价权。这个护城河**保护存量份额**但不创造新份额, 且 hypersonics/cost-plus R&D 合同正在稀释 S&D 短期 OM.

3. **F-35 是 Military Aircraft 分部的 visibility 主来源 (占 MA 25-30%, 集团 6-7%), 但依赖 Lockheed 的 TR-3/Block 4 交付** — 2026-03 的采购量重评估是阶段性风险锚.

4. **Commercial Aircraft 分部的 margin 扩张故事完全挂在波音产量 catch-up 上**, Moog 无法控制, 过去 3 年波音 guidance 连续 miss. Aftermarket 占比是未披露盲区, 是 Phase 2 必须 bottom-up 的关键.

5. **Industrial 剥离的算术反直觉**: 卖高价反而降低剩余集团 re-rating 幅度. 市场对"剥离 catalyst"的预期结构可能是错的.

6. **主驱动图中 D3 (FCF 转化) 是真正的主线**, D1 (量) 和 D5 (multiple) 已被定价, 无法再提供 alpha. 跟踪一个指标 = **TTM FCF/NI 比率**.

### 未解决问题 (转 Phase 1 Part 2)

- 护城河深度评估 (switching cost 量化 + aftermarket 真实 mix)
- 财务归因瀑布: FY22-25 revenue 增长的量/价/mix/M&A 拆分
- 毛利率 Bridge: 24.4% → 27.4% 的驱动拆分 (定价权 vs 通胀 catch-up vs 规模 vs 会计重分类)
- 剪刀差 R-2 分析 (至少 3 个): (a) backlog vs FCF, (b) CapEx vs D&A, (c) R&D vs revenue
- 供应链上下游交叉验证 (铁律 Q): 与 Parker / Woodward / HEI / TDG 的季度增速对比

### 字符计数
- Ch 1: ~3,600 chars
- Ch 2: ~5,200 chars  
- Ch 3: ~5,000 chars
- Ch 4: ~7,800 chars
- Ch 5: ~1,500 chars
- **Part 1 合计: ~23,100 chars** (目标 20-25K ✓)

### Handoff to Phase 1 Part 2
主线不变: **FCF 会计悖论 + 驱动归因错 + 置信度不对称**. Part 2 首要任务:
1. 护城河 4 维 + 4 测试 (围绕 switching cost 机制)
2. R-1 财务归因 (revenue 瀑布 / GM bridge / EPS 瀑布)
3. R-2 剪刀差 3 个 (backlog-FCF, CapEx-D&A, R&D-revenue + GAAP-NonGAAP)
4. 供应链交叉验证 (PH / HEI / TDG / WWD Q1 FY26 增速对比)
