# INTC Default Map Audit (S-1 产物) — 2026-04-26

> 用户约束: 不强求差异性, 主张深入还原事实真相
> 用法: Phase 0.75 起锚, Phase 2/3 末 thesis pivot gate 用此对照

---

## 1. 市场默认地图 (本季报前后, 2026-Q2 共识)

**market_default_definition**: "Intel 是 AI CPU/agentic AI host CPU 的复兴受益股 + 美国半导体国家旗舰 + 18A 制程突破后 Foundry 反转的双重期权"

**market_default_variables** (按市场 weight 排序):
1. DCAI 收入增速 + 服务器 ASP — Q1'26 +22% / +27% 看似强力验证
2. 18A yield + 外部客户进展 — 二元期权, 0/1 binary
3. NVIDIA + SambaNova + Google 客户绑定 — 战略联盟可见性
4. 政府股权 ($20.47/股 11月 2025) + Trump 半导体回流政策 — 地缘下界
5. CapEx 收敛 + Foundry 亏损路径 — 短期 cash burn
6. Tan 重组执行力 — 裁员 21K + 卖 Altera 51% 完成

**market_default_valuation_language**: 
- 三段式: (a) Intel Products 用 EV/Sales 3-4x → ~$45B 业务给 $135-180B 价值 (b) Intel Foundry 用期权定价 (NPV scenarios + government 兜底) → $80-150B (c) 政府/SoftBank/NVIDIA $15.9B 锚定 floor
- 当前市值 **$414B** 隐含: Products ~$170B + Foundry/期权 ~$200B + Net Cash ~$45B
- 隐含 EV/2027E Sales 假设: 6.0-7.5x (假设 FY27 收入 $60-65B)
- 隐含 Foundry external customer wins **必须** 在 2027 出现, 且 18A revenue 至少 $5-8B

**market_default_narrative**: "Q1'26 +22% DCAI + Xeon 6 中标 Rubin NVL8 + agentic AI bullwhip = Intel 已经从'僵尸'变成'复兴主线', 政府兜底 + AI 顺风 + 估值修复, 下一站是 $100/股甚至 $120"

---

## 2. 旧地图解释不通的事实 (failure_points, S-1 强制 ≥2)

> S-1 强制要求: 失灵事实必须**已主动搜索 5 类异常** (财务/竞争/治理/语言/结构), 找到才能 anchored thesis。

### F-1: Server volume **-5% YoY** while ASP **+27%** — 量价剪刀差最强证据

**fact**: Intel 10-Q 显式披露 DCAI server volume 下降 5%, 全部增长靠 ASP +27%。CCG client volume 更差 -13% YoY, ASP +16%。

**why_old_map_fails**: 旧地图认为 "AI agentic 拉动 CPU 需求 → 单位需求增长 + ASP 受益"。但**真实数字是单位下降, ASP 暴涨**。这是典型的 supply-constrained pricing — 客户被迫接受涨价因为 Intel 产能不足。当 supply 在 H2'26 缓解后 (管理层自己说 "持续到 2026 年其余季度"), ASP +27% 可能消失。
- 历史对照: 半导体 supply-constrained pricing 在 2021-2022 给 INTC 带来类似 ASP 上涨 (+20%), 然后 2023-2024 全部反转, FY2024 收入 -2.0%, FY2025 -7.5%
- 反例条件: 如果 volume +5% 且 ASP +15% (mix-driven), 那就是真实需求。当前是 volume -5% 且 ASP +27%, 100% pricing-driven。
- 可证伪信号: Q3-Q4'26 supply 缓解后 ASP YoY 回到 +5% 以下 → 旧地图被证伪

### F-2: GAAP 巨亏 **$3.1B** + Mobileye **$4.07B 商誉减值** — 整体 Intel 价值实际下降

**fact**: Q1'26 GAAP operating loss $(3,136)M, 含 $4,070M restructuring 项目主要为 **Mobileye 商誉永久性下调** + $1,090M Escrowed Shares MTM loss。

**why_old_map_fails**: 旧地图聚焦 DCAI +22% 不看 GAAP, 但 Mobileye 减值意味着 ADAS/AV 业务的"期权"价值被永久撇销。市场给 Intel 的"期权溢价"中 Mobileye 占了重要部分 (上市值 ~$15B, 现在被 Intel 自己减记)。如果 Mobileye 期权可以被减记, 那 Foundry 期权 ($200B 隐含) 同样可以被减记。
- 反例: 如果 Mobileye 减值是一次性会计调整不影响经济, 应该不影响估值。但市场反应没有惩罚 INTC, 反而 +23.6% — **意味着市场已经把 Mobileye 期权 deactivate**, 把所有期权权重放在 Foundry/政府上。这本身是 thesis 集中度的红灯。
- 可证伪信号: 如果 2026 H2 Foundry 出现类似减值 (e.g. 14A 暂停, 18A 客户落空), 验证"期权可被 deactivate"模式。

### F-3: AMD 5 季度抢 ~5pp server share + 2 大 hyperscaler 客户已签 Graviton tens of millions of cores — 增量蛋糕分给别人

**fact**: AMD Q4'25 server revenue share **41.3%** (+4.9pp YoY); AMD 2025 全年收入 +30%+; Lisa Su 2025-Q4 call 也讲 agentic CPU 故事; AWS 公开说 "2 大客户想买 2026 全年 Graviton 全部产能"; ARM 占 hyperscaler compute **50%** in 2025, 预测 2029 custom AI host 90% ARM。

**why_old_map_fails**: 旧地图把 MS 的 "2030 累计 +$32.5-60B CPU TAM" 默认归给 Intel。但现实是 (a) AMD 抢份额速度 ~5pp/年, 5 年内 server revenue share 可能从 60% → 35%, (b) hyperscaler custom ARM 已占 50% 且加速, (c) NVIDIA Grace 在 NVL72 100% 内化 host CPU。Intel 在增量 TAM 中的捕获率大概率 **<30%**, 即 ~$10-18B by 2030 (年化 $1-2.5B)。
- 反例: 如果 Intel 18A 价格优势 + Xeon 6 性能 + 美国制造政策能让 hyperscaler 重新选 Intel, 抢份额可能停止。但 SemiAnalysis 直言 "Sierra Forest 在 hyperscaler 反响有限, hyperscaler 已经用 AMD + 自研 ARM"。
- 可证伪信号: AMD 任何季度 server share 不再上升 → 旧地图复活。当前 AMD Q1'26 guidance +32% YoY 中点 — 短期不会停。

### F-4: GT 论文同时给出 COMB 调度 **1.7-3.9× 改善** + cuVS GPU 向量检索 **4.7-12.3× 加速** — CPU bottleneck 是软件可优化的

**fact**: 用户引用的 GT/Intel paper (arXiv 2511.00739v3) 数据显示 RAG 占 83-89% CPU latency 是真的, 但**论文同一篇**给出 COMB scheduling 解决方案 1.7-3.9× P50/P90 改善, 论文原文 "requires careful optimization through scheduling rather than hardware changes alone"。同时, NVIDIA cuVS 集成 Faiss v1.10 (Meta 2025-05) 实现 vector search 4.7-12.3× 加速, Elasticsearch 9.3 + OpenSearch 3.0 已加 GPU 加速。

**why_old_map_fails**: 旧地图的核心因果链是 "agentic AI → CPU latency 占比上升 → CPU 硬件需求增加 → Intel 受益"。但中间环节"CPU 硬件需求增加"被两个力量削弱: (a) 软件栈优化 (vLLM C++ routing, SGLang RadixAttention 6.4× gain), (b) GPU 索引产业化 (cuVS)。**3-5 年内 RAG 部分的 CPU bottleneck 大概率被 GPU 索引消化 30-60%**。
- 反例: 如果整个 agentic 工作流从 RAG 转向 web research / multi-tool agents, 这些工作 CPU 占比仍高 (web 40-55%, ChemCrow 85-88%), 软件优化不如 RAG 方向明确。
- 可证伪信号: 2027 年 vLLM/SGLang/Triton 主流 inference engine 是否引入 GPU-aware retrieval — 引入 = CPU bottleneck 大幅消化。

### F-5: Foundry 亏损 Q1 -$2.4B (扩大), Adjusted FCF -$2B, **18A yield + 外部客户均未披露** — 转型经济学未兑现

**fact**: Intel Foundry Q1'26 op loss **$(2,437)M** vs Q1'25 -$2,320M, 亏损扩大 $117M; 即使 Foundry 收入 +16% (主因 intersegment wafer ramp); Adjusted FCF Q1 -$2,016M; 10-Q 警告 "14A 可能 pause"; 18A yield 数字 + 外部客户名单 **0 matches** 在 PR/10-Q 中。

**why_old_map_fails**: 旧地图给 Foundry $200B 隐含期权价值, 假设 (a) 18A yield 在 2026 H2 达到 commercial threshold (>80%), (b) 至少 1-2 个外部 anchor customer (Apple/Microsoft/MediaTek) 落地。但 4 个季度过去了, **公开数据完全是黑箱**。如果 18A 真有重大客户进展, 管理层在 +23.6% 财报当天**没有理由不披露**。
- 反例: Tan 上任 11 个月可能采取 "under-promise, over-deliver" 策略, 不公开是为了不抢风头。但同样可能是 "no news = bad news"。
- 可证伪信号: Q2/Q3'26 财报有任何 18A 外部客户名字披露 → 期权价值 +$30-50B。如果 2027 Q1 仍无 → 期权大幅减值。

---

## 3. 主动搜索清单 (已搜索 5 类异常, 满足 S-1 诚实门槛)

| 异常类型 | 搜索方向 | 发现 |
|---|---|---|
| 财务异常 | DCAI 增长是否真实 | F-1 量价剪刀差 (找到) |
| 财务异常 | GAAP 巨亏来源 | F-2 Mobileye 减值 (找到) |
| 竞争异常 | 增量 TAM 切分 | F-3 AMD/ARM 占主导 (找到) |
| 治理异常 | 内部人/管理层动作 | Tan 自购 INTC $1.04M shares (Aug 2025) — 弱多头信号, 已计价 |
| 管理层语言异常 | 财报 call tone | Tan/Zinsner 用 "agentic" / "essential role" / "unprecedented demand" — 营销语言密度高, 但 10-Q 同时披露 supply-constrained, 不矛盾但需小心 |
| 行业结构异常 | 工作流变化 | F-4 软件栈 + GPU 索引 (找到) |
| 行业结构异常 | Foundry 转型 | F-5 黑箱 (找到) |
| 估值异常 | rerate 速度 | INTC 200d MA $38.45 → 当前 $82.54 = +115%, 6 个月内, **未发现单一 fundamental 数据支持 2x rerate** — 需要 Phase 4 探索市场是否过度反应 |

**结论**: 5 类异常每类至少 1 个发现, **S-1 阈值 ≥2 failure_points 全部满足** (5 个)。**不触发 MARKET_RIGHT 路径** — 旧地图与现实有真实裂缝, 不是市场 100% 对。

---

## 4. why_new_map_needed

如果继续把 INTC 当 "AI CPU 复兴受益股 + Foundry 期权", 5 件事会被抹平:
1. **Server volume -5%** 会被 DCAI +22% 的标题数字盖住, 投资者错过 supply-constrained pricing 风险
2. **AMD 5pp/年抢份额** 会被 "Intel 也涨" 的相对论盖住, 错过结构性流失
3. **GPU 索引/COMB 调度** 会被 GT 论文的 83% 数字盖住, 错过软件优化的 disruption
4. **18A 全黑箱** 会被 "技术突破 + Rubin 中标" 的叙事盖住, 错过 Foundry 期权可能为零
5. **股价 6 个月 +115%** 会被 "市场聪明" 的事后合理化盖住, 错过 2-3x rerate 已经把 5-7 年好消息打包

**新地图候选** (Phase 4.5 三选一):
- A. **"Supply-constrained pricing 的最后一杯酒"** — Q1'26 是 +22% DCAI / +27% ASP 的高点, 2026 H2-2027 H1 supply 缓解后 ASP normalization + AMD 抢量 → DCAI 增速降到 +3-5%
- B. **"+115% rerate 已 over-discount 5-7 年好消息"** — 当前 $414B 市值隐含 Products $170B + Foundry $200B + Cash $45B; Foundry $200B 期权需要 3-4 个外部 anchor customer, 至少 18-24 个月才能验证
- C. **"政府股权 + 关键 25% 装机量股票, 而不是 AI CPU 受益股"** — 定价驱动从 AI 叙事变成地缘 puts + 美国制造政策 + Trump 关税预期; 评估 framework 应该用类似 LMT/RTX 的"政府客户 + 政策驱动"模型, 不是 AMD/NVDA 的"AI 增长"模型
