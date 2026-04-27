# INTC Phase -0.5 文献侦察备忘 — CPU 复兴 thesis 验证 (2026-04-26 重新启动)

> 日期: 2026-04-26 | 数据采集窗口: 2026-04-23 (Q1'26 财报) → 2026-04-26
> **本备忘覆盖 2026-02 旧版本** — Q1'26 财报 + Morgan Stanley agentic AI thesis (4-20) + Georgia Tech/Intel CPU paper (4-16) 全部需要重新校准
> 用户核心问题: Intel Q1'26 是否只是把 CPU renaissance 叙事提前反映在 ASP 和供应紧张里, 还是已经证明 agentic AI 会持续提高 server CPU 的单位需求/核心数需求/定价权?
> 用户重要约束: **不强求差异性观点, 主张深入还原事实真相** (允许 MARKET_RIGHT verdict)

---

## 1. 核心事实锚点 (五源交叉验证)

### 1.1 Intel Q1 2026 财报 (PR + 10-Q, 2026-04-23 盘后)

**损益表**:
- Net revenue **$13,577M (+7% YoY)** [Q1'25: $12,667M]
- GAAP GM **39.4%** (+2.5pp YoY) / Non-GAAP GM **41.0%** (+1.8pp)
- GAAP operating loss **$(3,136)M** — 含 **$4,070M restructuring + Mobileye 商誉减值** + $1,090M Escrowed Shares MTM loss
- Non-GAAP operating income **$1,668M (12.3% margin, +142% YoY)**
- GAAP EPS **$(0.73)** / Non-GAAP EPS **$0.29 (+123% YoY)**

**业务分部**:
- CCG **$7,727M (+1% YoY)**, op income $2,516M (+$155M YoY)
- DCAI **$5,052M (+22% YoY)**, op income **$1,542M (+$967M YoY)**  ★核心
- Intel Foundry **$5,421M (+16%)**, op loss **$(2,437)M** (vs Q1'25 -$2,320M, **亏损扩大**)
- All other (Mobileye + Altera 残余) $628M
- Mobileye Q1'26 收入 $558M (+$120M YoY)

**DCAI 增长拆解 — 核心 thesis 证据**:
- Server revenue +$696M YoY
- **Server ASP +27% YoY** (公司显式披露)
- **Server volume -5% YoY** (公司显式披露) ★ 承重墙数据
- 10-Q 原文: *"Market demand exceeded our available product supply due to internal supply constraints, which limited our ability to fully meet customer demand. Though we expect these supply constraints to persist throughout the remainder of 2026"*
- Other DCAI product revenue $935M (+$230M, networking 驱动)
- DCAI op income +$967M YoY 拆分: $604M product profit + $331M Q1'25 Gaudi 库存减记缺席

**管理层原话** (CEO Lip-Bu Tan & CFO Zinsner):
- Tan: *"The next wave of AI will bring intelligence closer to the end user, moving from foundational models to inference to agentic. This shift is significantly increasing the need for Intel's CPUs and wafer and advanced packaging offerings"*
- Zinsner: *"reflecting the growing and essential role of the CPU in the AI era and unprecedented demand for silicon"*

**新客户/产品**:
- **Xeon 6 中标 NVIDIA DGX Rubin NVL8 host CPU** ✓ 验证
- Google: 多年合作扩展 Xeon 部署 to C4/N4 + 共同开发 ASIC IPUs
- **SambaNova: 异构 blueprint (GPU prefill + SambaNova SN50 RDU + Xeon 6 host/action CPU)**, H2 2026 GA

**现金流/资本**:
- Operating CF Q1 **$1,096M** (vs $813M YoY)
- Gross CapEx **$4,963M** (-20% YoY, 节奏收敛)
- **Adjusted FCF Q1 $(2,016)M** (vs Q1'25 $(3,680)M, 改善但仍负)
- 现金 + 短投 **$32,789M**, 总债务 $45,031M
- Net SCIP partner contributions $1,959M (Q1'25: $897M) — 持续输血
- Government incentives received: 仅 $107M (Q1'25 $819M, **-87%**)

**指引 Q2'26**:
- Revenue $13.8B-$14.8B mid $14.3B (~5% QoQ 增长)
- GAAP GM 37.5% / Non-GAAP 39.0%
- Non-GAAP EPS $0.20
- **未给全年指引** (重要不确定性信号)

**18A / Foundry 进展**:
- 18A yield 数字 **未在 PR/10-Q 披露** (黑箱)
- 18A 外部客户 **未点名 Apple/Microsoft/MediaTek** (黑箱)
- "Core Series 3 处理器是首次将 18A 带入主流 PC"
- 10-Q 原文: *"14A 暂可能 pause or discontinuation if we are unable to secure sufficient committed demand...through product design wins with potential significant external customers"* ★ Kill Switch
- 回购 Fab 34 Ireland 49% 少数股权
- Terafab 加入 SpaceX/xAI/Tesla 战略合作

**股价反应**: Q1'26 财报发布 4-23 盘后, 次日 INTC **+23.6%**

### 1.2 Morgan Stanley Agentic AI thesis (Reuters 2026-04-20)

- Incremental CPU TAM **$32.5-60B by 2030** (累计, 在 >$100B server CPU TAM 之内)
- 总编排 CPU 数据中心市场 $82.5-110B by 2030
- "CPU-side orchestration can account for **50-90%** of total workload latency in agentic systems"
- 额外 DRAM 需求 **15-45 EB by 2030** (= 26-77% of 2027 annual DRAM supply)
- MS 显式声明: GPU 需求 **仍然强劲, 不是替代**
- 推荐受益股: NVIDIA + AMD + Intel + ARM (CPU 加速器) + Micron + Samsung + SK Hynix (内存) + TSMC + ASML
- **未确认**: "Chatbot 85% / Research agent 18% / Complex orchestration 8% GPU" 这张图的具体数字 **未在公开报道中找到**, 仅二手中文报道模糊提及 ★

### 1.3 Georgia Tech + Intel paper (arXiv 2511.00739v3, 2026-04-16)

**硬件平台**:
- Sys 1: Intel Xeon Granite Rapids (64 核) + NVIDIA RTX-Pro 6000 Blackwell (低端 GPU)
- Sys 2: NVIDIA Grace CPU (72 核) + NVIDIA H200 GPU (高端)

**5 类 workload + CPU latency**:
- RAG (Haystack ENNS): **83%/81%/82%** Sys 1, 高达 **89%** Sys 2
- Web Agent (LexRank): **48-55%** Sys 1, **40-45%** Sys 2
- ChemCrow (RDKit) 重分子: **85% 和 88%**; 中等分子 53-58%
- SWE-Agent (Bash/Python) 高端 GPU 系统最高 **65%**

**关键削弱 — 论文自己给出的优化方案**:
- COMB (CPU-Aware Overlapped Micro-Batching) 同质负载: P50 latency **1.7×**, service/total latency **3.9×/1.8×** 改善 (open-loop)
- MAS (Mixed Agentic Scheduling) 异质负载 minority request: **2.37×/2.49×** P50/P90 改善
- 论文原文: *"requires careful optimization through scheduling rather than hardware changes alone"* ★ 论文自身证伪硬件 thesis

**关键 caveat**: 论文未单独评估 GPU-accelerated retrieval (cuVS); 仅说明 "document corpus far exceeds GPU memory"

### 1.4 反面证据 — RAG GPU 化产业方向 (2025-2026)

- NVIDIA cuVS 集成 Faiss v1.10 (Meta 2025-05): **IVF build 4.7×, search latency 8.1×; CAGRA vs CPU HNSW build 12.3×, search 4.7×**
- Elasticsearch 9.3 (2026 早期) + OpenSearch 3.0 已加 GPU 加速向量搜索
- 含义: GT 论文 "RAG 检索 83-89% CPU" 是 **2025 Q4 时点真相, 2026-2028 可能被 GPU 索引消化 30-60%**
- vLLM/SGLang CPU 瓶颈来自 Python GIL: SGLang RadixAttention 给 RAG/multi-turn **6.4× gain**, vLLM C++ routing 避开 GIL — 软件栈优化 = "CPU orchestration" 的解

### 1.5 竞争 — AMD/ARM 抢占 CPU 增量 TAM

**AMD**:
- Q4'25 server revenue share **41.3%** (+4.9pp YoY, +1.8pp QoQ); unit share 28.8%
- Intel server unit share 推算 ~71.2% / revenue share ~58.7% — 仍领先但流失加速
- 5th Gen EPYC (Turin) 首次占 AMD server revenue **>50%** in Q4'25
- AMD Q1'26 guidance ~$9.8B (+32% YoY mid); Lisa Su 长期 datacenter >60% CAGR
- Lisa Su Q4'25 原话: *"AI agents that are spinning off a lot of work...are actually going to a lot of traditional CPU tasks"* — **AMD 也在抢 agentic CPU 叙事**
- MI300/MI325/MI350 reference design **全部 EPYC 9005 双 socket** — Intel 不在 AMD GPU 平台

**ARM/Hyperscaler 自研**:
- AWS Graviton: **98%** of top 1,000 EC2 客户用过, **90,000+** AWS 客户; Andy Jassy 说 2 大客户想买 2026 全年 Graviton 全部产能
- Google Axion: **30,000+** Google 内部应用迁到 ARM (~1/3 of 100K+); C4A GA Oct'24, N4A GA Jan'26; **TPU v8 (Ironwood) 首次用 Axion 作 host CPU**
- Microsoft Cobalt 100 GA in **32 Azure regions**; Cobalt 200 (Neoverse V3, +50% perf) 2025-Ignite
- Meta 2026-04: 与 AWS 签 Graviton "tens of millions of cores"
- Meta 部署 NVIDIA Grace standalone 在生产, Vera 跟进 (perf/W +2x)
- ARM 2025 年占 hyperscaler 总 compute **~50%**
- ARM 预测 2029 年 custom AI ASIC server 中 **ARM host CPU 占 ~90%** (从 2025 ~25%)

**CPU:GPU 真实部署比例**:
- DGX H100: 2× Intel Xeon Sapphire Rapids + 8× H100 = **CPU:GPU = 1:4**
- **GB200 NVL72: 36 Grace ARM + 72 Blackwell = 1:2, host CPU 100% ARM** (Intel/AMD 两家被绕过) ★
- AWS Trn2 (Trainium2): 2× Sapphire Rapids + 16× Trainium2 = **1:8, host 仍 Intel**
- AMD MI300/MI350: 2× EPYC 9005 + 8× Instinct = **1:4, host 全 EPYC**

---

## 2. 五大反面证据 (写报告时必须诚实呈现)

| # | 反面 | 削弱什么 | 证据强度 |
|---|---|---|---|
| F1 | Server volume **-5% YoY**, 全部 DCAI 增长来自 ASP +27% | "需求驱动" → 实际是 supply-constrained pricing | 硬数据 (10-Q) |
| F2 | GAAP 巨亏 $3.1B + Mobileye **$4B 商誉减值** | 整体 Intel 价值并未提升 | 硬数据 |
| F3 | AMD 5 季度抢 ~5pp server share + Hyperscaler 100% 自研 ARM CPU + GB200 NVL72 100% Grace | "Intel 受益于 CPU 重要性上升" → 增量 TAM 大概率被 AMD/ARM 吃掉 | 多源硬数据 |
| F4 | GT 论文自己给出 COMB/MAS 调度方案 **1.7-3.9×** 改善 + cuVS GPU 向量检索 4.7-12.3× | RAG/agentic CPU 瓶颈是软件可优化的, 不需要换 CPU 硬件 | 论文原文 + 工业实证 |
| F5 | 18A yield 未披露 + 14A 可能 pause + Foundry Q1 亏损扩大到 -$2.4B + Adjusted FCF -$2B | Foundry 转型经济学未兑现, 可能吞噬 DCAI 改善 | Intel 自己 10-Q |

---

## 3. 用户问题的初步路径判断

**用户核心问题翻译**: 四条因果链是否同时成立?
- H1 技术瓶颈转移 (CPU latency 占比上升): **部分成立** (RAG/ChemCrow 高 CPU latency 真实, 但软件可优化)
- H2 部署比例变化 (CPU:GPU ratio 转向 CPU): **部分证伪** (1:4 → 1:2 但 Grace ARM 非 Intel; Trn2 仍 1:8)
- H3 Intel 财报已反映: **形式上是, 实质上有重大裂缝** (DCAI +22% 真, 但 volume -5%; ASP +27% 部分来自 supply-constrained pricing)
- H4 可持续利润池: **强烈不确定** (AMD 抢 5pp/年; ARM 占 hyperscaler 50%; Foundry 持续亏损)

**初步 verdict 倾向**: 不是 PIVOT 也不是 MARKET_RIGHT 简单二选一, 而是 **WEAKEN with rebuilding** — Q1'26 财报支持的不是 "Intel 是 CPU 复兴最大赢家", 而是 "在 supply-constrained 环境下 Intel 能短期享受 ASP 红利, 但结构性份额流失未停, 增量 TAM 60-70% 大概率被 AMD/ARM 吃掉"。

**报告基调**: 不写"拒买", 也不写"买入", 写**精确的还原**: Q1'26 哪些是真信号 / 哪些是 supply-pricing artifact / 哪些是叙事过度 / 哪些是真护城河迁移。让读者带着分层认知做决策。

---

## 4. 写作锚点 (Phase 5 候选钉子)

候选母钉子 (≤10 字):
1. **"-5% 量, +27% 价"** — 一句话戳破"需求驱动"叙事
2. **"Intel 拿到了 1/4 的 CPU 复兴"** — 量化 TAM 切分
3. **"Grace 把 host CPU 内化"** — 结构性威胁的命名
4. **"两条曲线打架"** — DCAI 改善 vs Foundry 失血

候选范畴重分配 (Phase 4.5 决):
- INTC 不是 "AI CPU 复兴受益股", 而是 **"supply-constrained pricing trade + 长期份额流失股"**
- INTC 不是 "美国半导体国家旗舰", 而是 **"政府股权 + 关键 25% 装机量股票", 由地缘政治 puts 锚定下界**
- INTC 不是 "CPU-Foundry 双轮驱动", 而是 **"DCAI 现金牛缓慢萎缩 + Foundry 烧 $40B+ 不可证伪期权"**
