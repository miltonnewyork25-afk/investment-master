# ARM Holdings (ARM) — 文献侦察备忘录 v2.0
> Phase -0.5 v2.0刷新 | 2026-02-25 | 5路WebSearch+MCP数据 | v2.0: 数据刷新+新增发现

---

## 1. 商业模式与版税经济学

**收入结构 (FY2025, 截至2025-03)**:
- 总收入: $4.007B (+24% YoY)
- 版税收入: $2.168B (54%, +20%)
- 授权收入: $1.839B (46%, +28.5%)

**最新季度 Q3 FY2026 (2025-12)**:
- 总收入: $1.242B (+26% YoY, 连续第4个$1B+季度)
- 版税: $737M (+27% YoY, 创纪录)
- 授权: $505M (+25% YoY)
- Non-GAAP营业利润: $505M, 利润率~41%
- Non-GAAP EPS: $0.43 (beat分析师预期$0.33, +30%)

**Q4 FY2026指引**:
- 收入: $1.47B ±$50M (+18% YoY)
- Non-GAAP EPS: $0.58 ±$0.04
- 版税增长: low-teens % | 授权增长: high-teens %

**版税率结构**:
- Armv8: 单位美分级别(~$0.03-0.07/chip, IoT; ~$0.30-0.60/chip, 移动)
- Armv9: 版税率为v8的**2倍+** (>30%版税收入已来自v9)
- 服务器/数据中心: 显著更高(估计$10-100/chip, 因芯片ASP $500-$2000+)
- CSS(Compute Subsystems): 比纯核IP更高版税率(包含更多设计工作)
- 整体平均: ~$0.065/chip (被低端IoT拉低)
- 每季出货量: >7B chips

**授权类型**:
- ALA (Architecture License Agreement): 最贵, 允许自研核(Apple, Qualcomm, Google等~15家)
- TLA (Technology License Agreement): 使用ARM设计的核, 版税率更高
- CSS License: 预集成子系统, 最高版税率, 19个许可证/11客户/5个量产中

**地理收入分布 (FY2025)**:
- 美国: 最大 ($1.4B+估计)
- 中国: $749M (~19%, 仅+7.5% YoY, 增速放缓)
- 台湾地区: $629M
- 韩国: $324M

---

## 2. 数据中心增长轨迹

**ARM服务器市场份额 (2025)**:
| 口径 | 份额 | 来源 |
|------|:----:|------|
| 独立分析师(IDC/Omdia) | 20-23% | 传统CPU服务器出货量 |
| ARM官方宣称 | ~50% | 含NVIDIA Grace在超算中心计算 |
| 差异原因 | NVIDIA GB200每台都含ARM Grace CPU → ARM将其计入"ARM计算" |

**关键客户定制ARM芯片**:
- **AWS**: Graviton4 (96核, Neoverse V2) GA → Graviton5 (192核, 2025-12预览)
- **Google**: Axion (72核, Neoverse V2) GA, 基准测试优于AMD EPYC/Intel Xeon
- **Microsoft**: Cobalt 100 (128核, Neoverse N2) GA → Cobalt 200 (132核, V3, TSMC 3nm)
- **NVIDIA**: Grace (72核, V2) 在GB200/GB300中出货, 是ARM服务器最大量来源(~250万台)
- **Ampere**: SoftBank以$6.5B收购, 整合ARM服务器生态

**CSS (Compute Subsystems for Server)**:
- 19个CSS许可证, 11个客户, 5个量产设计
- 减少客户设计时间最多12个月, 节省千万级NRE
- 管理层预期CSS将占版税收入>50%(2-3年内)
- 版税率高于纯核授权(ARM提供更多芯片设计)

**Phoenix重大战略转型**:
- ARM首次设计**完整数据中心CPU**(不只是IP):
  - Phoenix: 128个Neoverse V3核, TSMC 3nm双die, 12通道DDR5, 96 PCIe Gen6
  - 首客户: Meta → 其他: OpenAI(via Stargate/SoftBank), Cloudflare
  - **商业模式升级**: IP授权商→芯片设计商, 可能与现有被授权方竞争

**数据中心收入贡献**:
- 当前: "略超10%"的版税组合 (约$400-600M年化)
- 增长率: >100% YoY (Q3 FY26电话会)
- 管理层预期: 数据中心将在"几年内"超越移动成为最大业务
- 到FY2028-29: 可能达$1.5-2.5B(总收入$6-8B基础上)

---

## 3. RISC-V竞争威胁

**当前渗透**:
- 全球处理器市场: ~25%份额, 累计出货~200亿核 (截至2025-12)
- 市场规模: $1.35B (2025) → $10.7B (2031), CAGR 41.2%

**按细分市场**:
| 细分 | RISC-V份额 | 威胁ARM时间线 | 确信度 |
|------|:----------:|:----------:|:-----:|
| IoT/嵌入式 | ~30% | **已在竞争** | 高 |
| 汽车 | ~30%(含IoT) | 2025-2027 | 高 |
| 可穿戴 | 增长中 | 2025-2026 | 高 |
| 数据中心 | 萌芽 | 2027-2028 | 中 |
| 移动/手机 | 预商业 | 2027-2029 | 中低 |
| PC | 预商业 | 2028-2030+ | 低 |

**关键参与者**:
- **Qualcomm**: 以$2.4B收购Ventana Micro (2025-12), 获得高性能RISC-V服务器核IP → 双架构策略
- **Tenstorrent**: Ascalon-X实现SPECint ~21-22/GHz ≈ ARM Neoverse V3 ≈ AMD Zen 5
- **阿里巴巴/平头哥**: C930服务器级RISC-V, 512位向量单元+8TOPS AI矩阵引擎
- **Google**: 全面整合RISC-V到Android GKI (预计2026年初)
- **Quintauris**: Bosch/Infineon/NXP/Qualcomm/STMicro组建的汽车RISC-V联盟

**性能已接近平价** (2025年末):
- Tenstorrent Ascalon-X ≈ ARM Neoverse V3 ≈ AMD Zen 5 (SPECint ~22)
- Ventana Veyron V2: 宣称比同级ARM设计好30-40% PPA
- **软件生态仍是RISC-V最大差距** (驱动/固件/应用优化), 预计2027-2028追平

**中国RISC-V推动**:
- 8个中国政府机构推动RISC-V采用指引
- RISC-V International总部在瑞士 → 基本免受单边美国制裁
- 亚太地区RISC-V收入CAGR **62.7%** (最快增长区域)
- 阿里云已部署RISC-V服务器(2023起), C930商业交付(2025-03起)

**ARM的防御策略**:
- v9版税提价(已>30%版税来自v9) → 短期最佳财务策略, 但长期加速RISC-V采用
- CSS捆绑销售(增加切换成本)
- DreamBig半导体收购(chiplet互连技术)
- Total Design生态计划

**核心悖论**: ARM提高版税率(v9/CSS)既是最佳短期财务决策, 也是最可能加速RISC-V采用的因素。Qualcomm收购Ventana明确定位为谈判筹码: "如果ARM要求提高版税, Qualcomm可以威胁转向RISC-V"。

---

## 4. SoftBank治理与结构风险

**控股结构**:
- SoftBank持股: 90.6%(~923M ADR), 通过Kronos II LLC间接持有
- 公众流通: <10% (~100M股, 日均成交~600万股, 周转~16个交易日)

**保证金贷款设施 (关键风险)**:
- 规模: $200亿(从$135亿扩大, 2025-11)
- 已借出: $85亿 | 未使用: $115亿
- 银团: 33家金融机构
- LTV阈值(估算): $85亿借出→25% LTV covenant在~$37/股触发; 满额$200亿→~$87/股触发
- **ARM 52周低点$80, 在维护触发范围内**
- Archegos类比: 集中持仓+保证金杠杆+有限流通 = 自我强化下跌螺旋风险

**治理结构 (双重豁免)**:
- "Controlled Company" (Nasdaq 5615) — 豁免独立董事多数/薪酬委员会/提名委员会
- "Foreign Private Issuer" — 豁免Section 16内幕交易披露/代理投票规则
- 董事会: 孙正义(主席)+Haas(CEO)+Ron Fisher(SoftBank 1997年起) → SoftBank实控
- SEC风险披露: "Other holders...will have limited ability to influence matters"

**SoftBank战略驱动 (Project Izanagi+)**:
- 孙正义推动ARM从IP授权→芯片设计+AI基础设施
- Project Izanagi: $1000亿AI芯片计划, 原型2025夏, 出货2026
- Stargate: $1000-5000亿AI数据中心JV(OpenAI/Oracle/MGX), 孙正义任主席
- OpenAI投资: >$300亿, 11%股权; $225亿现金转移deadline=2025-12-31
- Ampere收购: $65亿 | ABB Robotics: $53.75亿 | ARM设计完整芯片(Meta首客户)
- SoftBank已出售全部NVIDIA股份($58亿, 现值>$1500亿), 表明FOMO驱动决策

**关联交易风险 (新发现)**:
- SoftBank贡献ARM授权收入的**~30%** — 控股股东同时是最大客户
- BofA下调评级: 剔除SoftBank后, FY2026授权收入预计**下降~5%**
- Q3 FY26 $200M SoftBank相关方授权收入已在FMP财务数据中确认
- 结构性担忧: 90%控股+30%授权收入=潜在收入粉饰(支撑SoftBank NAV)

**Arm China (安谋中国)**:
- 股权: 中国投资者(厚朴)~51%运营控制 | Acetone(SoftBank)~48%无运营控制 | ARM间接经济利益~4.8%
- SEC披露: "Neither we nor SoftBank Group control the operations of Arm China"
- 贡献~19%收入($749M/FY2025), ARM前5大客户占56%收入
- 2020-22 Allen Wu独立事件 | 2024 ARM试图绕过安谋中国直接授权
- 增速仅+7.5% YoY(远低于集团增速) → 中国RISC-V替代正在发生
- 新规风险: 中国修订《对外贸易法》(2026-03-01生效)引入IP侵权制裁

---

## 5. 估值与空头论点

**当前估值 (2026-02-25)**:
| 指标 | ARM | QCOM | SNPS | CDNS | AVGO |
|------|:---:|:----:|:----:|:----:|:----:|
| P/E (TTM) | **169x** | 29x | 55x | 75x | 68x |
| P/B | 16.4x | 8.5x | 2.6x | 15.5x | 21.0x |
| Revenue Growth | 26% | 5% | 38% | 6% | 16% |
| Operating Margin | 21% | 28% | 13% | 31% | 40% |
| ROE | 11% | 21% | 7% | 22% | 31% |

**FMP DCF公允价值: $6.66** vs 股价$128 → 机械模型认为高估**19x**

**FMP Rating: B-** (Overall Score 2/5: DCF=2, ROE=3, ROA=4, D/E=3, P/E=1, P/B=1)

**Altman Z-Score: 35.0** (极健康, 零破产风险)

**市场隐含假设 (初步Reverse DCF)**:
- P/E 140x, TTM EPS ~$0.92 → 市值$136B
- 要支撑$136B市值: 需要约$5.5-6B稳态利润(假设25x终态P/E)
- 当前TTM净利~$800M → 需要增长~7x
- 隐含: 收入需从$4.7B→$25-30B, 利润率需从17%→20-25%
- 时间线: 10年内 → 隐含~20% revenue CAGR + margin expansion

**华尔街共识**:
- 29位分析师共识目标价: $161.77 (+26%上行)
- 多头极值: $225 (Rosenblatt) | 空头极值: $100 (Bernstein, Underperform)
- BofA: $120, 2026-01下调 | Susquehanna: $150, 2026-01上调
- Bernstein: "multiples far surpassing NVIDIA, without anything like a NVIDIA-esque growth rate"

**独立估值**:
- Morningstar: **$80** (Wide Moat认可, 但90x 2026 / 73x 2027调整后EPS = NVIDIA/SNPS 2倍)
- AlphaSpread DCF: **$50-62** (高估73-106%)
- GuruFocus DCF: **$51** (高估127%)
- 区间: 独立机构一致认为$50-100 vs 市价$128

**历史倍数** (IPO以来从未进入"正常"半导体P/E区间):
- IPO(2023-09): 500x+ | 2023-12: 1073x | 2024-07高点: 250x | 当前: 142-169x
- 3年平均P/E: **333x** → 当前169x实际上是IPO以来最低持续水平

**Reverse DCF详解**:
- 成长股30x终态P/E(5年): 需$4.53B净利(当前5.7x) → 需37% rev CAGR × 20%净利率
- 优质IP模型40x终态P/E: 需$3.4B净利 → 需24% rev CAGR × 25%净利率
- 分析师共识: ~20% rev CAGR + ~59% NI CAGR(3年) → 3年后P/E仍42x

**Short Interest数据** (更新):
- 空头持仓: ~15.1-15.3M股 (~11%流通股, 但流通仅~103M → **实际~15% float**)
- 同行平均: 5.03% → ARM = **2倍同行空头**
- 双向风险: 逼空(流通少)+ 空头坚定(估值争议)

**Windows on ARM** (新增终端市场):
- 高端PC(>$800): ~10%份额 (2024 Q3仅0.8%) | 整体PC: ~13%(2025)
- Qualcomm目标: 5年50%Windows PC市场 | OEM预期: 3年60% Snapdragon
- 障碍: x86模拟(Prism)性能差距/原生ARM应用生态薄弱/游戏性能差
- ARM收入贡献: PC市场是增量但相对移动/DC仍小

---

## 6. 关键数据锚点 (待Phase 0验证)

| 数据点 | 值 | 来源 | 置信度 |
|--------|---|------|:------:|
| FY2025总收入 | $4.007B | FMP/SEC Filing | H |
| Q3 FY26收入 | $1.242B | FMP/ARM Newsroom | H |
| 毛利率(TTM) | 95.4% | FMP | H |
| ROIC(TTM) | 23.4% | FMP | H |
| P/E(TTM) | 140-169x | FMP(时点不同) | H |
| v9版税收入占比 | >30% | Earnings Call | M |
| CSS许可数 | 19/11客户 | ARM Newsroom | M |
| 数据中心份额 | 20-23%(独立)/50%(ARM口径) | IDC/Omdia/ARM | M |
| RISC-V全球份额 | ~25% | RISC-V International | M |
| SoftBank持股 | ~90.6% | SEC Filing | H |
| 保证金贷款 | $200亿/$85亿已借 | SubStack/Financial Analysis | L |
| Arm China收入 | $749M/19% | ARM Annual Report | H |
| SoftBank授权收入占比 | ~30% | BofA/Earnings Call | M |
| Morningstar公允价值 | $80 | Morningstar | H |
| 空头持仓 | ~15M股/11%流通 | MarketBeat/Fintel | M |
| Windows on ARM PC份额 | ~13% (2025) | ABI Research/Tom's Hardware | M |
| ARM从未交易于<142x P/E | IPO以来最低 | MacroTrends | H |
| FMP DCF | $6.66 | FMP模型 | L(机械模型) |

---

## 7. 初步CQ验证

| CQ | 初步方向 | 置信度 | 关键数据缺口 |
|----|---------|:------:|------------|
| CQ-1: 版税经济学 | v9提价+CSS渗透是增长引擎, 但终态规模高度不确定 | 40% | 需要版税率×出货量逐终端建模 |
| CQ-2: 数据中心 | 增长强劲(>100% YoY), 但占比仍<12%, Phoenix是双刃剑 | 45% | 需要分离NVIDIA Grace贡献 |
| CQ-3: SoftBank治理 | $200亿保证金+30%关联授权+双重豁免=多维治理风险, Project Izanagi牺牲少数股东利益 | 45% | 需要定量分离关联交易影响 |
| CQ-4: RISC-V | 短期无影响, 中期(2027-29)是定价天花板, 长期是存在性威胁 | 50% | Qualcomm/Google执行速度 |
| CQ-5: Arm China | $749M收入+7.5%增速=中国业务已在减速, RISC-V替代加速 | 55% | Arm China治理详细条款 |

---

## 8. 非共识假说候选

1. **"ARM是半导体行业的Visa/Mastercard"** — 交易型收入(版税=每笔芯片交易抽成)的估值应参考支付网络而非半导体公司
2. **"RISC-V不需要赢, 只需要存在"** — 作为credible替代的存在就永久限制ARM提价能力(期权定价视角)
3. **"Phoenix是SoftBank的Project Izanagi, 不是ARM的商业优化"** — 芯片设计决策由控股股东AI战略驱动而非ARM利润最大化
4. **"保证金贷款使ARM的下行风险非线性"** — $200亿保证金+10%流通=Archegos级别的结构性脆弱
5. **"ARM的真实TAM上限=全球芯片收入的1-2%"** — IP授权模式的数学天花板
6. **"SoftBank关联授权=收入质量折扣"** — 剔除SoftBank后授权收入下降5%, 30%关联方收入=Visa给自己刷卡
7. **"ARM从未拥有'正常'估值, 可能永远不会"** — IPO以来P/E区间142x-1073x, 3年均值333x, 传统估值框架完全失效

---

## 9. v2.0数据刷新新增发现 (2026-02-25)

### 9.1 分析师评级重大变化
- **Goldman Sachs下调至SELL** (2025-12-15): $160→$120, 理由="limited leverage to AI cycle"+商业模式转型风险
- **BofA上调PT** (2026-02-24): $135→$140, 评级维持Neutral, 理由=市场份额展望
- **共识**: 20位分析师, Buy共识$160.85, Strong Buy 35% + Buy 55% + Strong Sell 5%(Goldman)
- **KeyBanc** PT从$200→$170 | **RBC** PT从$140→$130

### 9.2 OCF/NI TTM大幅改善
- FY2025 OCF/NI = 0.50 (异常低, 应收暴增一次性) → **TTM OCF/NI = 1.90** (大幅回归)
- 这意味着H1(盈利质量三重扭曲)的OCF维度需要重新评估: FY2025的$397M OCF是周期性低点, 非结构性

### 9.3 Non-GAAP利润率压缩信号
- Q3 FY26 Non-GAAP营业利润率: **40.7%** (YoY从45.0%下降)
- 原因: R&D从$485M→$737M (+52%), Phoenix+CSS+v10开发投入上升
- 这与KA-09(95%毛利率维持)和CQ-6(Phoenix利润率影响)高度相关

### 9.4 RISC-V竞争加速
- **Tenstorrent + Allen Wu(前ARM中国CEO)**: 合作进军中国市场 — 具有讽刺性的人才流失
- **StarFive(香港)**: RISC-V数据中心芯片Q1 2026量产 — 时间线比预期快
- **Google RISC-V AOSP**: FOSDEM 2026展示进展, 但仍在CTS/VTS合规阶段
- **Qualcomm "Snapdragon Data Center"**: 基于Ventana RISC-V架构, 直接定位vs ARM Neoverse

### 9.5 ARM 12月暴跌20%
- ARM股价12月从~$160→$80区间, 跌幅~20% (部分因保证金贷款担忧+科技板块抛售)
- $80低点接近SoftBank $200亿满额保证金的$87触发线
- 随后反弹至$128 (2月), 但仍低于200日均线$138.6

### 9.6 Polymarket事件
- "Will ARM beat Q3 FY26 earnings?" — **已解决YES** (Non-GAAP EPS $0.43 beat $0.41)
- ARM/SoftBank在Polymarket上无高流动性结构性事件市场
