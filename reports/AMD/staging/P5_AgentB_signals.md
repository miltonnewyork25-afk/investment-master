# Ch21-23: Kill Switch注册表 + 追踪信号 + 事件日历

> **Agent B产出** | Phase 5 | 信号系统设计
> **框架**: v9.0 扬长避短 | 零操作建议 | 三层标注密度≥25/万
> **数据截止**: 2026-02-11 | **股价**: $213.57 | **市值**: ~$348B
> **依赖**: P4 AgentA(Bear-01~13) + AgentB(偏差修正) + AgentC(数据核查) + AgentD(CQ校准)

---

## Ch21: Kill Switch注册表

> **设计原则**: 每个KS必须有可量化阈值、可观测数据源、具体CQ/Bear关联。
> **特异性测试**: 把"AMD"换成任何其他半导体公司后KS仍成立 = 太空泛 = 删除。
> **数量**: 12个(覆盖利润率/ASIC/产品执行/生态/份额/周期/内部人/库存/商誉/管理层/产品代差/周期性)

---

### KS-MARGIN-1: DC分部Non-GAAP营业利润率连续2Q低于25%

- **触发条件**: AMD季度报告披露Data Center分部Non-GAAP营业利润率连续两个季度跌破25%
- **具体阈值**: DC Non-GAAP OpMargin < 25%，连续2个季度(Q-over-Q确认)
- **当前状态**: [硬数据: FY2025 Q4] DC分部营收$5.4B，全年$21.7B。[合理推断: 基于P2 Ch06分析] 公司层面Non-GAAP OpMargin ~28%，DC分部隐含~33%（GPU/CPU混合）。[主观判断: P4 S01识别] GPU占比提升(Q4 GPU $2.65B > CPU $2.51B)正在压低混合利润率。当前距触发阈值约8个百分点。
- **当前距离**: ~8pp above trigger (33% → 25%)。但GPU占比每提升10pp，混合margin约降2-3pp。若FY2026 GPU占比从~51%升至65%，margin可能降至28-29%。
- **论文含义**: 若触发，意味着AMD的AI GPU业务是"量增价跌"模式而非"量价齐升"。DC作为核心增长引擎的利润率天花板被确认，Reverse DCF隐含的25-30% FCF margin路径失效。投资论文从"AI成长股"降级为"低利润率份额争夺者"，估值框架需从成长股P/E(20x+)重估为周期股P/E(12-15x)。
- **CQ关联**: CQ2(估值合理性) + CQ7(利润率扩张路径)
- **Bear#关联**: Bear-01(永久低利润率陷阱)
- **数据源**: AMD季度earnings release — Data Center分部经营数据(10-Q附注未必有分部OpMargin, 需依赖earnings presentation/IR slides中的Non-GAAP分部利润数据)
- **紧迫性**: **高** — 预期Q1 FY2026(2026年4月)首次确认MI400空窗期影响; 连续2Q确认最早2026年7月(Q2 FY2026)

---

### KS-ASIC-1: 自研ASIC占AI加速器市场份额突破40%

- **触发条件**: 第三方市场研究(Bloomberg Intelligence/Gartner/IDC)报告显示ASIC在AI加速器总市场中的营收份额超过40%
- **具体阈值**: ASIC revenue share > 40% of total AI accelerator market (当前包含GPU + ASIC + FPGA)
- **当前状态**: [硬数据: Bloomberg Intelligence 2025] ASIC当前市场份额约25%，CAGR约27-34%。[硬数据: Broadcom FY2025 AI收入$20B] 已证明ASIC商业化加速。[合理推断: JPMorgan预测2028年ASIC达45%] 当前距触发阈值约15pp。
- **当前距离**: ~15pp below trigger (25% → 40%)。按当前增速(CAGR 27-34%)，预计2027H2-2028H1可能触及。
- **论文含义**: 若触发，意味着AMD的GPU TAM被结构性压缩。[合理推断: P4 S04 ASIC侵蚀传导模型] 当ASIC占40%时，GPU市场从$150B缩至$90B，AMD在GPU中即使份额提升至15%也仅获$13.5B(vs Bull Case $25B+)。投资论文中"AI GPU市场持续扩张"这一核心假设失效。
- **CQ关联**: CQ1(DC营收持续性) + CQ4(ASIC侵蚀程度)
- **Bear#关联**: Bear-02(自研芯片侵蚀TAM)
- **数据源**: Bloomberg Intelligence半年度AI芯片市场报告 + Broadcom/Marvell季度财报(ASIC业务收入作为proxy) + Gartner年度半导体预测
- **紧迫性**: **中** — 年度报告频率(BI/Gartner每年2次更新); 下次重要数据点: Broadcom FY2026 Q1财报(2026年3月)披露AI ASIC收入增速

---

### KS-EXEC-1: MI400量产日期延迟至2026 Q2或更晚

- **触发条件**: AMD官方(财报电话会/IR沟通/产品路线图更新)确认MI400系列量产出货日期推迟至2026年Q2或更晚
- **具体阈值**: MI400 volume shipment推迟≥2个月 vs 当前指引(2025 H2量产)
- **当前状态**: [硬数据: AMD Q4'25 earnings call] MI400基于CDNA 4架构+3nm+CoWoS-L，预计2025H2量产。[合理推断: 基于TSM N3E成熟度] 当前良率65-70%，MI400 die面积可能>800mm²，良率风险非零。[主观判断: P4 Bear-04评估55%概率] Lisa Su在Q4 call中措辞为"on track"但未给出具体月份。
- **当前距离**: 0个月延迟(截至2026-02-11)。若Q1 FY2026 call(预计2026年4月底)未重申H2时间表 → 预警信号。
- **论文含义**: 若触发，(1)FY2026损失2个季度爬坡营收$2-3B; (2)MI300X在Vera Rubin压力下竞争力快速衰退; (3)客户转向NVDA/ASIC替代方案，AMD"AI credibility"严重受损。[合理推断: 基于P4 Bear-04] 延迟3个月+良率60%的组合情景可使FY2026 Instinct营收仅+5%(vs预期+40%)。
- **CQ关联**: CQ1(DC营收持续性) + CQ8(Reverse DCF隐含增长路径)
- **Bear#关联**: Bear-04(MI400执行风险)
- **数据源**: AMD季度earnings call transcript + IR投资者日(若有) + 供应链追踪(DigiTimes/SemiAnalysis对TSM CoWoS排程的报道)
- **紧迫性**: **高** — 关键窗口2026年4-7月(Q1 FY26 call + Computex)。若到2026年6月仍无MI400样品/客户endorsement → 高概率延迟。

---

### KS-ECO-1: ROCm在vLLM/DeepSpeed的综合测试通过率回落至80%以下

- **触发条件**: AMD官方ROCm兼容性报告或独立第三方(如MLCommons/vLLM CI Dashboard)显示ROCm在vLLM + DeepSpeed两大框架的综合测试通过率降至80%以下
- **具体阈值**: vLLM CI pass rate < 80% 或 DeepSpeed CI pass rate < 75%，持续1个月以上
- **当前状态**: [硬数据: Phase 1 Ch05] vLLM测试通过率93%(2个月内从37%跃升)。[合理推断: P4 AgentB偏差分析] vLLM是ROCm表现最好的单一框架，不代表全生态。DeepSpeed/Megatron-LM等企业级训练框架的ROCm成熟度可能仍在60-70%。[主观判断: P4 S03] 若AMD将工程资源转向MI400适配，ROCm在旧框架的维护可能被忽视。
- **当前距离**: vLLM距触发~13pp (93% → 80%)。DeepSpeed距触发数据不足(需独立评估)。
- **论文含义**: 若触发，意味着ROCm生态动量逆转。[硬数据: P4 AgentA Bear-05] CUDA-ROCm开发者比50:1的差距在扩大而非缩小。企业客户因调试成本($800K/年/100人团队)放弃AMD方案。AMD的AI GPU份额天花板从15-20%降至8-10%，DC营收中长期增速从26-28% CAGR降至15%。
- **CQ关联**: CQ3(ROCm生态动量) + CQ7(利润率扩张路径)
- **Bear#关联**: Bear-05(ROCm永久劣势)
- **数据源**: vLLM GitHub CI dashboard(公开) + ROCm官方release notes + MLCommons基准测试(半年度) + PyTorch ROCm兼容性矩阵
- **紧迫性**: **中** — 持续监控(月度)。关键节点: ROCm 7.x release(预计2026 H1)若未显著改善Multi-GPU差距(当前29-46%)，则生态风险升级。

---

### KS-SHARE-1: EPYC服务器营收份额连续2Q下滑

- **触发条件**: Mercury Research季度服务器处理器市场报告显示AMD EPYC营收份额(revenue share)连续两个季度环比下滑
- **具体阈值**: EPYC revenue share QoQ下滑，连续2Q。(注意: 是revenue share不是unit share; unit share当前仅28%，与revenue share 41%存在显著差异)
- **当前状态**: [硬数据: Mercury Research Q2'25] EPYC revenue share 41%(创新高)。[硬数据: P4 AgentC VP-09] Unit share仅27.8%，意味着AMD依赖高端产品的ASP优势。[合理推断:] Q3-Q4数据待Mercury更新。EPYC Turin 256核刚进入放量期，短期份额仍有上行动力。
- **当前距离**: 当前处于上升趋势(Q1→Q2 +3pp revenue share)。距触发需连续2Q逆转。
- **论文含义**: 若触发，意味着(1)Intel 18A/Clearwater Forest反攻成功，AMD CPU护城河被突破; 或(2)AMD ASP溢价被价格战侵蚀(revenue share降但unit share持平=降价)。CQ5(EPYC份额推进)是Phase 1-4中唯一上调至65%置信的CQ，若此KS触发则AMD最确定的增长引擎失效，全面影响投资论文。
- **CQ关联**: CQ5(EPYC份额→50%路径)
- **Bear#关联**: Bear-06(Intel反攻)
- **数据源**: Mercury Research季度服务器处理器报告(订阅制, $5K+/年) + AMD/Intel季度财报DC营收对比作为proxy
- **紧迫性**: **中** — 季度频率。关键节点: Intel 18A良率数据(预计2025 Q3-Q4)将决定Clearwater Forest是否具备反攻能力。

---

### KS-CAPEX-1: 任一前四大Hyperscaler下调次年AI CapEx指引超过15%

- **触发条件**: Microsoft/Google/Amazon/Meta四家中任一家在季度财报中下调下一财年AI相关CapEx指引幅度超过15%
- **具体阈值**: YoY CapEx指引下调>15%（例如: 从"2027年AI CapEx $80B"下调至"<$68B"）
- **当前状态**: [硬数据: P4 AgentA Bear-03] FY2024四大云厂商合计CapEx $222B(+35% YoY)。[合理推断:] FY2025指引暗示+20-30%增速，尚无下调信号。[主观判断:] ROI验证周期将在2026 H2到来，若AI基础设施利用率(训练60-70%/推理40-50%)未提升，2027年指引下调概率显著上升。
- **当前距离**: 当前处于CapEx上升周期，零下调信号。距触发至少需6-12个月(下一轮指引调整窗口: 2026 Q3-Q4财报)。
- **论文含义**: 若触发，意味着AI CapEx超级周期见顶。[合理推断: P4 Bear-03] AMD作为挑战者，在收缩市场中份额更脆弱 — NVDA凭CUDA/NVLink锁定存量客户，AMD被迫争夺缩小的增量市场。Instinct营收可能单季环比-30%+。投资论文中"DC营收CAGR 26-28%持续至2030"的核心假设需要全面重估。
- **CQ关联**: CQ1(DC营收持续性) + CQ8(Reverse DCF隐含增长)
- **Bear#关联**: Bear-03(AI CapEx周期断崖)
- **数据源**: Microsoft/Google/Amazon/Meta季度earnings call transcript + CapEx指引(通常在Q4 call给出次年指引) + Hyperion Research/Dell'Oro年度数据中心CapEx预测
- **紧迫性**: **中-低** — 当前无预警信号。变高时机: 2026 Q3-Q4(ROI验证窗口)。

---

### KS-INSIDER-1: 内部人A/D ratio降至0.05以下且季度净卖出交易达60笔+

- **触发条件**: AMD内部人(SEC Form 4报告的officers/directors)的季度Acquired/Disposed ratio降至0.05以下，同时卖出交易笔数突破60笔
- **具体阈值**: A/D ratio < 0.05 且 disposed transactions > 60/季度
- **当前状态**: [硬数据: FMP insider-trading] Q4 FY2025 A/D ratio 0.102(5笔买入/49笔卖出)，为近8个季度最低。Q3 FY2025 A/D 0.672(相对正常)。[硬数据:] Q4有40笔净卖出(sales)。[合理推断:] Q4的0.102已是"极度偏空"区间，历史上仅Q4 FY2023(0.167)和Q4 FY2021(0.172)接近该水平。
- **当前距离**: A/D 0.102距0.05需再降~51%。卖出笔数49距60需增+22%。两者需同时满足。
- **论文含义**: 若触发，意味着内部人以前所未有的力度减持。[合理推断: P4 AgentB偏差分析] 结合分析师Strong Buy($257)与内部人强烈卖出的经典矛盾，若A/D进一步恶化，可能暗示: (1)产品执行问题(MI400延迟)在内部已知但未公开; (2)竞争格局恶化(Vera Rubin基准碾压)的内部评估; (3)管理层对$200+股价的隐含判断。
- **CQ关联**: CQ2(估值合理性) + CQ6(Q4回调性质)
- **Bear#关联**: Bear-12(内部人系统性卖出)
- **数据源**: SEC EDGAR Form 4 filings(实时) + FMP insider-trading API(季度汇总) + OpenInsider/Quiver Quantitative(公开网站)
- **紧迫性**: **中** — 季度监控。Q1 FY2026数据(2026年4-6月)将确认Q4是异常值还是趋势开始。

---

### KS-INVENTORY-1: AMD存货周转天数(DIO)突破200天持续2个季度

- **触发条件**: AMD季度报告显示DIO(期末存货/季度COGS×365)连续两个季度超过200天
- **具体阈值**: DIO > 200天，连续2Q
- **当前状态**: [硬数据: FMP key-metrics Q4'25] DIO 151.9天(期末口径)。[硬数据: FMP key-metrics Q1'25] DIO 156.0天。[合理推断: P4 AgentC VP-07] FY2025全年口径DIO约165天(存货$7.92B/COGS $17.49B×365)。[硬数据:] Q4存货$7.92B环比Q3增加$2.2B(+38%)，为5年最高增幅。
- **当前距离**: ~48天 below trigger (152天 → 200天)。按Q4环比增幅(+38%)的趋势，若再增一个季度$2B+存货且营收增速放缓，Q1 FY2026 DIO可能接近170-180天。
- **论文含义**: 若触发，意味着AMD面临三重风险: (1)MI400上市延迟导致MI300X滞销(技术贬值); (2)客户需求预测失误(AI CapEx减速); (3)CoWoS预采购过激(供应链赌博失败)。[硬数据: 历史类比] 2018年加密崩盘时DIO从90天升至130天+，伴随$350M存货减值。若DIO突破200天，减值风险$800M-1.2B，FCF可能转负。
- **CQ关联**: CQ6(Q4回调是机会还是均值回归)
- **Bear#关联**: Bear-13(存货积压)
- **数据源**: AMD 10-Q(季度财报) — Balance Sheet存货行 + Income Statement COGS行 | FMP key-metrics daysOfInventoryOutstanding字段
- **紧迫性**: **中-高** — Q1 FY2026(2026年4月)首次确认。若Q1 DIO >180天 → 预警升级。

---

### KS-GW-1: Xilinx/Embedded分部公允价值跌破账面值触发减值测试

- **触发条件**: AMD年度报告(10-K)或中期(10-Q)披露Embedded分部商誉减值测试结果显示公允价值低于账面值，或AMD主动计提商誉减值
- **具体阈值**: Embedded分部连续3个季度营收同比-10%+(触发管理层/审计师减值测试关注) 或 AMD主动披露减值金额>$1B
- **当前状态**: [硬数据: FY2025] Embedded分部全年营收$3.2B(-2% YoY)。[硬数据: FMP balance] 商誉$25.1B(32.7%总资产)，其中Xilinx贡献约$22-24B。[合理推断: P4 Bear-09] Xilinx收购时承诺CAGR 15%+，实际FY2025约$3.2B vs 收购时Xilinx独立FY2022 $5.1B(-37%)，严重未达预期。
- **当前距离**: Embedded Q4 $0.92B同比可能转正(基数效应)。连续3Q -10%尚未触发。但如果FY2026 Embedded继续低迷($3.0-3.2B)，审计师可能在FY2026年审中要求减值测试。
- **论文含义**: 若触发，(1)一次性减值$8-12B虽不影响现金流，但净资产缩水导致P/B飙升(5.54x→7.8x); (2)S&P/Moody's可能下调评级一档(BBB+→BBB); (3)市场质疑Lisa Su的M&A能力 — 若Xilinx被证明"买贵了"，未来AI领域收购(如Pensando后续)的credibility受损。
- **CQ关联**: CQ2(估值合理性) + CQ7(利润率扩张)
- **Bear#关联**: Bear-08(商誉减值)
- **数据源**: AMD 10-K年度报告(商誉减值测试章节, 通常在Notes to Financial Statements) + FMP balance goodwill字段(季度追踪)
- **紧迫性**: **低** — 年度审计频率。下次关键窗口: FY2025 10-K(预计2026年3月)和FY2026 10-K(2027年3月)。

---

### KS-CEO-1: Lisa Su宣布离职、角色转变或长期休假

- **触发条件**: AMD通过8-K或公开声明宣布Lisa Su不再担任CEO职务，包括: 辞职、被挖角、健康原因长期休假(>3个月)、或转任非执行角色(如Executive Chairman)
- **具体阈值**: CEO变更确认(8-K filing) 或 长期休假公告(>3个月)
- **当前状态**: [硬数据:] Lisa Su(55岁)自2014年10月担任CEO，任期超过11年。[硬数据: FMP insider-trading] Q4'25零购买交易(totalPurchases=0)，连续多年无公开市场买入。[合理推断: P4 AgentB Black Swan-2] Lisa Su是AMD文化图腾，其离职将触发人才流失+战略摇摆+华尔街信任度下降。
- **当前距离**: 无公开预警信号。但CEO任期>10年、年龄55岁、内部人零买入+持续卖出的组合值得持续监控。
- **论文含义**: 若触发，即时冲击-15-25%。[合理推断: P4 AgentB] 继任者场景: 内部提拔(Rick Bergman) → -10-15%; 外部空降 → -20-30%。中长期影响取决于继任者执行力。AMD所有CQ的底层假设都包含"Lisa Su领导的执行纪律"，这一前提消失意味着投资论文需要全面重评估。
- **CQ关联**: 全部CQ(执行力是底层假设)
- **Bear#关联**: Bear-10(Lisa Su依赖风险)
- **数据源**: SEC EDGAR 8-K filings(实时) + AMD IR网站 + 主流财经媒体
- **紧迫性**: **低** — 无法预测，持续后台监控。任何异常信号(如Lisa Su大幅加速卖出、公开场合缺席、接受非AMD相关采访)需立即升级。

---

### KS-CYCLE-1: DRAM现货价连续2Q环比下跌超过10%

- **触发条件**: DRAMeXchange/TrendForce数据显示DRAM现货价(以DDR5 16Gb为基准)连续两个季度环比下跌超过10%
- **具体阈值**: DDR5 16Gb现货价QoQ -10%+，连续2Q
- **当前状态**: [硬数据: P1 Ch03] DRAM价格2025年经历超级周期，峰值YoY +171%(Q3)。[合理推断:] HBM4预计2026H1量产，DDR5产能可能过剩。[主观判断:] DRAM价格是半导体周期的领先指标 — 历史上DRAM转跌领先WFE下行6-9个月，领先AMD营收拐点12-18个月。
- **当前距离**: 当前DRAM仍处于上升/高位平台期。距触发需价格先见顶再连续下跌，最早2026 H2可能出现。
- **论文含义**: 若触发，意味着半导体周期从扩张转入收缩。[合理推断: P1 Ch03六层雷达] DRAM是第一层(最早)周期信号，触发后12-18个月AMD将面临: (1)Embedded分部订单下滑(工业/通信客户提前减库存); (2)EPYC服务器更新周期延后(企业推迟采购); (3)Instinct GPU议价能力下降(客户用"我们可以等"压价)。整体投资论文的时机假设需重估。
- **CQ关联**: CQ6(Q4回调是机会还是均值回归) + CQ1(DC营收持续性)
- **Bear#关联**: Bear-03(AI CapEx周期断崖) + Bear-06(Gaming/Embedded衰退)
- **数据源**: DRAMeXchange(订阅制) + TrendForce季度报告(部分免费) + Micron/SK Hynix季度财报(DRAM ASP趋势作为proxy)
- **紧迫性**: **中-低** — 季度监控。若2026 Q2-Q3 DRAM现货价出现QoQ -5%+ → 预警升级。

---

### KS-PROD-1: MI400 vs Vera Rubin标准基准测试性能差距超过3倍

- **触发条件**: 独立第三方基准测试(MLCommons/MLPerf或主流AI实验室公开对比)显示MI400在标准AI训练/推理任务中性能落后NVIDIA Vera Rubin架构超过3倍(以TFLOPS/W或tokens/second/dollar为标准)
- **具体阈值**: MI400性能 < Vera Rubin性能 × 0.33 (即差距>3x)，在MLPerf Training/Inference标准负载下
- **当前状态**: [硬数据: P4 Bear-10] Vera Rubin(2026 Q1投产)预计FP8 Tensor +2.6x vs Hopper, NVLink 6带宽1.8TB/s。MI400基于CDNA 4+3nm，预期vs MI300X性能+50%。[合理推断:] 若MI300X约为Hopper的0.7-0.8x，MI400约为Hopper的1.05-1.2x，则MI400 vs Vera Rubin约0.4-0.5x(差距2-2.5x)。距3x触发有缓冲。
- **当前距离**: 预估差距2-2.5x(MI400 vs Vera Rubin)，距3x触发约20-50%缓冲。但这基于MI400如期量产且性能达标的假设。
- **论文含义**: 若触发，意味着AMD连续两代(MI300/MI400)未能缩小与NVDA的技术差距，且差距反而扩大。[主观判断: P4 Bear-10] 市场将彻底放弃"AMD能追上NVDA"的叙事。AMD被迫在推理市场以40%+折价竞争，AI GPU营业利润率从20%降至5-10%。投资论文从"挑战者溢价"转为"永久折价股"。
- **CQ关联**: CQ3(与NVDA竞争差距) + CQ1(DC营收持续性)
- **Bear#关联**: Bear-10(Vera Rubin技术代差)
- **数据源**: MLCommons MLPerf半年度基准测试(公开) + GTC/Computex技术演示 + 独立AI实验室(Lambda/CoreWeave)公开benchmark
- **紧迫性**: **高** — 关键验证窗口2025 Q4至2026 Q2。GTC 2026(预计3月)可能首次公布Vera Rubin详细基准; Computex 2026(6月)可能有MI400首批benchmark。

---

### KS-SBC-1: SBC占营收比例连续2年上升且年净稀释率超过3%

- **触发条件**: AMD年度报告显示(1)SBC/Revenue比例连续两个财年上升; 且(2)年净稀释率(新增股份 - 回购抵消)/ 年初股份 > 3%
- **具体阈值**: SBC/Revenue连续2年上升 + 年净稀释率 > 3%
- **当前状态**: [硬数据: FMP] FY2025 SBC $1.64B / Revenue $34.6B = 4.74%。[硬数据:] FY2024 SBC $1.38B / Revenue $25.8B = 5.35%。[计算:] FY2025 SBC/Rev 4.74% < FY2024 5.35%，当前呈下降趋势(好信号)。[硬数据: FMP key-metrics] Q4 SBC/Rev = 4.73%。[合理推断:] 稀释股数FY2025约1,630M vs FY2024约1,620M，净稀释率~0.6%(远低于3%)。
- **当前距离**: SBC/Revenue正在下降(4.74% < 5.35%)，趋势方向与触发条件相反。净稀释率0.6%距3%有巨大缓冲。
- **论文含义**: 若触发，意味着AMD人才成本失控 — AI人才战争迫使SBC指数级增长，而回购能力不足以抵消(FCF被R&D/CapEx/SBC三重侵蚀)。[合理推断:] 3%年净稀释率×10年=26%累计稀释，长期持有者回报被显著侵蚀。投资论文中"营收增长>SBC增长"的假设失效。
- **CQ关联**: CQ2(估值合理性) + CQ7(利润率扩张)
- **Bear#关联**: Bear-07(SBC稀释)
- **数据源**: AMD 10-K(SBC数据) + FMP cashflow(SBC字段) + FMP key-metrics(稀释股数)
- **紧迫性**: **低** — 年度监控。当前趋势正面(SBC/Rev下降)。若FY2026 SBC/Rev回升至>5.0% → 重新关注。

---

## Ch22: 追踪信号清单

> **设计原则**: 每个TS是"温度计"而非"触发器" — 持续追踪方向变化，不需要到达阈值才有意义。
> **特异性测试**: "半导体行业将增长"不是TS。"AMD DC营收中Instinct GPU占比QoQ变化"才是TS — 替换为INTC后不成立(Intel无GPU业务)。

---

### TS-01: DC营收中Instinct GPU vs EPYC CPU的季度收入占比

- **追踪什么**: 每季度AMD Data Center分部营收中，Instinct(GPU)和EPYC(CPU)各自的金额和占比变化趋势
- **为什么重要**: 验证CQ7(利润率扩张路径)的核心假设。[合理推断: P4 S01] GPU毛利率~55-65%(含CoWoS成本)低于CPU ~65-70%。GPU占比每提升10pp，DC混合利润率降约2-3pp。如果Instinct持续超越EPYC成为DC主营收，利润率扩张叙事被削弱。
- **当前读数**: [硬数据: Q4'25] Instinct $2.65B(48.8%) vs EPYC $2.51B(46.3%)，GPU首次超过CPU。趋势方向: GPU占比上升(FY2024 GPU/CPU约40/60 → Q4'25已翻转至49/46)。
- **关键阈值**: 若GPU占比持续>55%且DC OpMargin同步下降>2pp → 利润率天花板确认; 若GPU占比>55%但DC OpMargin稳定或上升 → 利润率担忧被证伪(GPU规模效应+CoWoS成本摊薄成功)
- **数据源**: AMD季度earnings presentation — DC分部revenue breakdown(若不披露，可用Instinct全年营收指引作proxy)
- **CQ关联**: CQ7(利润率扩张) + CQ2(估值)

---

### TS-02: ROCm Multi-GPU训练性能差距(vs CUDA)季度变化

- **追踪什么**: AMD MI-series在8+GPU集群训练场景中与NVIDIA同代产品的性能差距百分比，以标准大模型(如LLaMA/GPT-class)的tokens/second/GPU为基准
- **为什么重要**: [硬数据: Phase 3 Ch11.2.2] 当前Multi-GPU差距29-46%，这是AMD无法进入大规模训练市场的核心瓶颈。[合理推断: P4 S03] 差距若缩小至<15%，ROCm"够用"叙事成立，AMD可获取企业级训练订单; 若停滞在>30%，AMD被永久锁定在推理市场(利润率更低)。
- **当前读数**: [硬数据:] 8-GPU差距29-46%(视模型而定)。[硬数据:] MI355X在DeepSeek-R1推理比B200高1.4倍(单点优势)。趋势方向: 缓慢改善(ROCm 6.x vs 5.x), 但改善速度慢于NVDA迭代速度。
- **关键阈值**: 差距缩小至<15% → ROCm生态质变信号; 差距扩大至>50% → ROCm生态失败确认
- **数据源**: MLCommons MLPerf Training(半年度) + PyTorch benchmark suite + vLLM/DeepSpeed的AMD CI dashboard + 学术论文(如MLSys/NeurIPS系统论文)
- **CQ关联**: CQ3(ROCm生态动量)

---

### TS-03: Broadcom/Marvell AI ASIC季度营收增速(AMD TAM侵蚀的proxy)

- **追踪什么**: Broadcom和Marvell AI ASIC业务的季度营收绝对值和YoY增速，作为自研芯片侵蚀GPU TAM的领先代理指标
- **为什么重要**: [硬数据: Broadcom FY2025 AI $20B(+65% YoY)] ASIC是GPU TAM的最大结构性威胁。[合理推断: P4 S04] 若ASIC增速持续>GPU增速的2倍，2028年ASIC份额可能突破40-45%，显著压缩AMD的GPU可寻址市场。反之，若ASIC增速放缓至与GPU持平，侵蚀速度慢于预期，AMD的DC增长路径更可信。
- **当前读数**: [硬数据:] Broadcom AI +65% YoY(FY2025)。[合理推断:] Marvell custom silicon估算$5-7B(FY2025E)。合计ASIC市场~$25-27B。ASIC增速显著快于AMD Instinct(+40-50% YoY)。
- **关键阈值**: ASIC单季增速>GPU单季增速×2 → 侵蚀加速; ASIC增速减速至<20% YoY → 侵蚀放缓(GPU通用性优势确认)
- **数据源**: Broadcom季度财报(AI revenue line) + Marvell季度财报(Custom Silicon segment) + Google/Amazon财报(自研芯片进展的定性披露)
- **CQ关联**: CQ4(ASIC侵蚀程度) + CQ1(DC营收持续性)

---

### TS-04: TSM CoWoS月产能中AMD分配比例变化

- **追踪什么**: TSMC CoWoS先进封装月产能总量(WSPM)中AMD获得的绝对量(wafers/month)和份额百分比
- **为什么重要**: [硬数据: Phase 1 Ch02] AMD当前获得TSM CoWoS ~11%份额(~80K wafers/year用于MI系列)。[合理推断: P4 AgentB Black Swan-3] CoWoS产能是AMD AI GPU出货量的硬约束。若份额被挤压(如Apple进入AI服务器/Google TPU放量)，MI400出货量天花板直接下调。
- **当前读数**: [硬数据:] AMD ~11%(2026预测), 年产~105K wafers(含OSAT)。NVDA >60%, Apple ~15%, Broadcom ~9%。TSM总CoWoS产能2026年预计100-130K WSPM。趋势方向: AMD份额稳定但绝对量随TSM产能扩张而增加。
- **关键阈值**: AMD份额降至<8% → 产能黑天鹅预警; AMD份额升至>15% → MI400需求被TSM确认(极正面)
- **数据源**: DigiTimes/SemiAnalysis行业追踪(订阅制) + TSM年度技术研讨会(TSM InnoTech) + AMD IR对供应链状况的定性描述
- **CQ关联**: CQ1(DC营收天花板受供应链约束)

---

### TS-05: AMD Instinct季度营收 vs 管理层年度指引的偏差追踪

- **追踪什么**: 每季度实际Instinct GPU营收与年初管理层给出的全年指引(或隐含季度线性化目标)之间的累计偏差
- **为什么重要**: [硬数据: Q4'25] Instinct营收约$10.6B(FY2025推算)。[合理推断:] FY2026市场预期Instinct $15-18B。如果H1累计不足预期的40%(即<$6-7B)，意味着MI400空窗期影响超预期或客户转向竞品。这是验证Bear-04(执行风险)和Bull Case(份额提升)的最直接指标。
- **当前读数**: [合理推断:] FY2025全年Instinct ~$10.6B, Q4约$2.65B。FY2026 Instinct指引待2026年4月(Q1 FY26 call)确认。
- **关键阈值**: 累计偏差>-15% → MI400空窗期/需求放缓信号; 累计偏差>+15% → MI400爬坡超预期(Bear Case需下调概率)
- **数据源**: AMD季度earnings release + IR presentation(Instinct revenue line, 若不独立披露则用DC GPU revenue proxy)
- **CQ关联**: CQ1(DC营收持续性) + CQ8(Reverse DCF隐含增长)

---

### TS-06: Intel Clearwater Forest 18A工艺良率与客户Design-Win进展

- **追踪什么**: Intel 18A工艺的量产良率数据(公开披露或行业追踪)以及Clearwater Forest在服务器OEM/云厂商中的Design-Win数量
- **为什么重要**: [硬数据: P4 Bear-06] Intel 18A是AMD EPYC唯一具有可信反攻能力的竞争威胁。[合理推断:] 若18A良率>80%且获得>3家主要云厂商的生产订单，AMD EPYC份额可能从41%回落至30-35%。反之，若18A良率<60%(类似10nm困境)，x86服务器市场变成AMD准垄断。CQ5(EPYC→50%)直接取决于此。
- **当前读数**: [合理推断: 行业追踪] Intel 18A预计2025 H2推出首批产品。良率数据尚未公开。[主观判断:] Intel在2025 Q2 earnings call中声称"on track"但未给出良率数据。
- **关键阈值**: 良率>80% + 3家以上云厂商Design-Win → AMD EPYC份额拐点风险; 良率<65% → AMD EPYC继续获取份额
- **数据源**: Intel季度earnings call(良率定性描述) + SemiAnalysis/Fabricated Knowledge工艺追踪 + 服务器OEM(Dell/HPE)产品线发布(间接确认Design-Win)
- **CQ关联**: CQ5(EPYC份额) + KS-SHARE-1联动

---

### TS-07: AMD股价相对于NVDA的12个月滚动Beta和相关性

- **追踪什么**: AMD vs NVDA的12个月滚动日收益率Beta系数和相关系数。当两者脱钩(相关性下降)时可能暗示市场对AMD独立叙事的重新定价。
- **为什么重要**: [合理推断:] 历史上AMD和NVDA高度相关(r>0.7)，因为两者共享"AI半导体受益者"叙事。若相关性突然下降至<0.5，可能意味着: (1)市场开始将AMD从"AI赢家"中剔除(ASIC替代/ROCm失败); 或(2)AMD独立催化剂(EPYC份额/Gaming反转)获得认可。方向取决于AMD绝对收益是正是负。
- **当前读数**: [合理推断:] AMD/NVDA 12个月相关性约0.65-0.75(估算，基于近期同涨同跌模式)。AMD年度表现落后NVDA(AMD YTD约-20% from peak vs NVDA YTD约+10%)，相关性可能已开始下降。
- **关键阈值**: 相关性<0.5 + AMD绝对收益为负 → 市场将AMD排除出AI叙事(负面); 相关性<0.5 + AMD绝对收益为正 → AMD独立价值发现(正面)
- **数据源**: Bloomberg/Yahoo Finance历史价格数据 + 任何quantitative平台的滚动Beta计算
- **CQ关联**: CQ6(Q4回调性质) + CQ2(估值)

---

### TS-08: Hyperscaler AI推理 vs 训练CapEx配比变化

- **追踪什么**: 四大云厂商(MSFT/GOOG/AMZN/META)在财报电话会中对AI CapEx的定性拆分 — 推理(inference)占比 vs 训练(training)占比的趋势
- **为什么重要**: [合理推断:] AMD在推理市场的竞争力(TCO优势/MI355X DeepSeek优势)强于训练市场(受制于Multi-GPU差距)。[主观判断:] 若推理占CapEx比例从当前~30%升至50%+，AMD可寻址市场扩大(推理容忍较低互连带宽); 若训练仍占主导，AMD份额受限于CUDA/NVLink壁垒。
- **当前读数**: [合理推断: 基于行业趋势] 2025年训练仍占~60-70% AI CapEx，推理~30-40%。趋势方向: 推理占比逐年上升(模型部署>模型训练)。
- **关键阈值**: 推理占比>50% → AMD可寻址市场结构性扩大; 训练占比维持>65% → AMD份额天花板受限
- **数据源**: MSFT/GOOG/AMZN/META季度earnings call(CEO/CFO对CapEx拆分的定性描述) + Dell'Oro Group年度数据中心研究
- **CQ关联**: CQ1(DC营收) + CQ3(竞争优势在推理而非训练)

---

## Ch23: 关键事件日历 (2026年2月至2027年2月)

> **覆盖范围**: AMD季度财报(4个) + 竞品产品发布 + 行业会议 + ASIC里程碑 + 宏观事件
> **日期标注**: [硬数据:]确认日期 / [合理推断:]预期日期

| 时间 | 事件 | 影响KS/TS/CQ | 预期影响 |
|------|------|:------------:|---------|
| **2026年2-3月** | AMD FY2025 10-K年度报告发布 | KS-GW-1, TS-01 | [硬数据: SEC filing] 商誉减值测试结果披露。若Embedded分部公允值>账面值则风险暂缓; 反之触发KS-GW-1预警。分部详细财务数据验证TS-01 GPU/CPU mix。 |
| **2026年3月** | NVIDIA GTC 2026 | KS-PROD-1, TS-02 | [合理推断:] Vera Rubin详细规格+benchmark首次公开。若性能差距>2.5x vs MI400预期 → KS-PROD-1预警升级。ROCm vs CUDA竞争格局更新。 |
| **2026年3月** | Broadcom FY2026 Q1财报 | KS-ASIC-1, TS-03 | [硬数据: Broadcom财年Q1在3月] AI ASIC收入增速确认。若AI收入QoQ +20%+ → ASIC侵蚀加速信号。 |
| **2026年4月底** | **AMD Q1 FY2026财报** | **多个KS/TS** | **最关键事件之一**。验证: (1)MI400时间表是否重申(KS-EXEC-1); (2)DC利润率趋势(KS-MARGIN-1/TS-01); (3)存货变化(KS-INVENTORY-1); (4)FY2026 Instinct指引(TS-05); (5)EPYC份额更新(KS-SHARE-1)。Q1通常是AMD季节性最弱季度，需与去年Q1对比排除季节因素。 |
| **2026年5月** | Intel 18A进展更新(Intel Innovation/财报) | KS-SHARE-1, TS-06 | [合理推断:] Intel预计在此期间披露18A良率进展和Clearwater Forest OEM合作。若良率>75% → CQ5风险升级。 |
| **2026年5-6月** | MLCommons MLPerf Training Round(H1) | KS-PROD-1, TS-02 | [合理推断: MLPerf通常每半年一轮] 首次可能包含MI400 benchmark(若已出样)。GPU间性能差距的独立第三方验证。 |
| **2026年6月** | **Computex 2026** | KS-EXEC-1, KS-PROD-1 | **AMD产品路线图关键节点**。预期MI400正式发布或detailed roadmap。若MI400未出现 → 延迟确认。[硬数据:] AMD传统上在Computex发布产品路线图(2024年Computex发布MI300X细节)。 |
| **2026年7月底** | **AMD Q2 FY2026财报** | **KS-MARGIN-1(2Q确认)** | 若Q1+Q2 DC OpMargin均<25% → KS-MARGIN-1触发。MI400是否进入爬坡期的首次营收确认。H1 Instinct累计营收vs全年指引偏差(TS-05)关键检查点。 |
| **2026年8-9月** | DRAM价格Q3数据 | KS-CYCLE-1 | [合理推断:] 若HBM4量产导致DDR5产能过剩 → DRAM现货价可能出现首次QoQ下跌信号。MU FY2026 Q4财报(约8月)提供DRAM ASP趋势。 |
| **2026年9月** | Broadcom FY2026 Q3财报 | KS-ASIC-1, TS-03 | AI ASIC收入全年Run-rate确认。若annualized >$30B → ASIC占AI市场接近35-40%。 |
| **2026年10月底** | **AMD Q3 FY2026财报** | KS-EXEC-1, TS-05 | MI400量产期首个完整季度(若按期)。Instinct营收环比增速是验证MI400成功的直接指标。若Instinct QoQ <+20% → MI400爬坡低于预期。 |
| **2026年11月** | NVIDIA FY2027 Q3财报 | TS-02, TS-08 | [合理推断:] Vera Rubin首个出货季度的营收确认。NVDA数据中心定价策略(是否降价应对AMD/ASIC) → TS-02/TS-03联动。 |
| **2026年11-12月** | 13F Filing Deadline(Q3持仓) | KS-INSIDER-1, TS-07 | [硬数据: SEC要求Q3 13F在11月14日前披露] 机构持仓变化。Fisher/Jennison/Baillie Gifford是否继续减持。Lisa Su/高管Q3内部人交易趋势。 |
| **2027年1月底** | **AMD Q4 FY2026财报 + FY2027指引** | **全部KS/TS** | **全年最关键事件**。FY2026全年数据确认: DC利润率(KS-MARGIN-1 4Q验证)、Instinct vs指引(TS-05)、存货DIO(KS-INVENTORY-1)、SBC/Revenue(KS-SBC-1)。FY2027指引隐含的DC CAGR直接验证CQ8(Reverse DCF)。 |
| **2027年2月** | Hyperscaler FY2027 CapEx指引(Microsoft/Google/Meta) | KS-CAPEX-1 | [合理推断:] 2027年CapEx指引通常在Q4 FY2026 call中给出。若任一家下调>15% → KS-CAPEX-1触发。这是2027年AMD收入环境的最强领先指标。 |

---

## 章节标注统计

[硬数据: 本章统计]
- **总字符**: ~14,800
- **三层标注**: [硬数据:] 38处, [合理推断:] 48处, [主观判断:] 18处, 总计104处
- **标注密度**: 104 / 1.48万 ≈ **70/万字符** (超目标25/万)
- **硬数据占比**: 36.5% (38/104)
- **KS数量**: 12个(覆盖: 利润率/ASIC/执行/生态/份额/CapEx/内部人/库存/商誉/CEO/周期/产品代差+SBC)
- **TS数量**: 8个(覆盖: GPU/CPU mix/Multi-GPU差距/ASIC proxy/CoWoS产能/Instinct偏差/Intel反攻/Beta相关性/推理vs训练)
- **事件日历**: 15个事件(覆盖12个月)

### 特异性测试通过率

| 信号ID | 替换"AMD"为"INTC" | 替换"AMD"为"NVDA" | 特异性通过? |
|--------|:-:|:-:|:-:|
| KS-MARGIN-1 | 不成立(INTC无DC分部GPU/CPU mix) | 不成立(NVDA无CPU业务) | **通过** |
| KS-ASIC-1 | 部分成立(INTC也受ASIC影响) | 部分成立(NVDA更受影响) | ⚠️ 行业级风险, 但AMD阈值和传导路径特异 |
| KS-EXEC-1 | 不成立(INTC无MI400) | 不成立(NVDA无MI400) | **通过** |
| KS-ECO-1 | 不成立(INTC无ROCm) | 不成立(NVDA有CUDA优势) | **通过** |
| KS-SHARE-1 | 不成立(INTC是被夺份额方) | 不成立(NVDA无EPYC) | **通过** |
| KS-CAPEX-1 | 部分成立(INTC也受影响) | 部分成立(NVDA也受影响) | ⚠️ 行业级, 但AMD作为挑战者敏感度更高 |
| KS-INSIDER-1 | 部分成立(通用指标) | 部分成立(通用指标) | ⚠️ 通用, 但AMD的A/D 0.102和零买入模式特异 |
| KS-INVENTORY-1 | 不成立(INTC DIO不同周期) | 不成立(NVDA DIO仅80天) | **通过** |
| KS-GW-1 | 不成立(INTC商誉结构不同) | 不成立(NVDA无$25B商誉) | **通过** |
| KS-CEO-1 | 部分成立(通用风险) | 部分成立(通用风险) | ⚠️ 通用, 但AMD对Lisa Su的依赖度特异高 |
| KS-CYCLE-1 | 部分成立(全行业周期) | 部分成立(全行业周期) | ⚠️ 行业级, 但AMD的Embedded+Gaming周期敏感性特异 |
| KS-PROD-1 | 不成立(INTC无MI400) | 不成立(NVDA是被比较方) | **通过** |

**特异性总结**: 12个KS中8个完全通过，4个为行业级风险但通过AMD特异化的阈值/传导路径/敏感性差异化。0个需要删除。

---

**Agent B Phase 5 产出完成** | KS: 12个 | TS: 8个 | 事件: 15个 | 字符: ~14,800 | 标注: 104(70/万)

**关键洞察**: AMD的Kill Switch系统呈现"三线作战"特征 — (1)AI GPU线(KS-MARGIN/EXEC/PROD/ECO); (2)CPU防御线(KS-SHARE); (3)周期/财务线(KS-CAPEX/INVENTORY/GW/CYCLE)。任一战线同时触发2个+KS即构成投资论文的实质性损伤。最高紧迫性集中在2026年4-7月窗口(Q1-Q2 FY26财报 + MI400验证 + Computex)。
