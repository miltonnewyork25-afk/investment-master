# CRM v2.0 深度报告准备文档

> 2026-03-19 | 准备阶段 | 目标: 4.4+/5.0 | 目标体量: ≥300KB
> **核心原则**: 从P4结论($176/中性关注)反推 → Reverse DCF P1前置 → ADBE对标P0前置 → 禁止单日rush

---

## 一、参考报告矩阵

### 1.1 主要参考(必读)

| 报告 | 评分 | 字符 | DM | DM密度 | Mermaid | 参考价值 |
|------|------|------|-----|-------|---------|---------|
| **ADBE v2.0** | ~4.0 | 264K | 280+ | ~1.06 | 15 | **最核心参考** — 同行业、同AI威胁、同PE低估叙事、AIAS框架实战、双引擎SOTP |
| **KLAC v1.0** | 4.5 | 254K | 553 | 2.17 | 28 | **质量标杆** — 信念反演最强、因果密度9.28/万字、每段有独立论点 |
| **IHG v1.0** | 4.3 | 315K | 899 | 2.85 | 92 | **体量+DM标杆** — 15Agent并行+单会话组装验证、547DM(95/100 scorecard) |

### 1.2 次要参考(选择性读)

| 报告 | 评分 | 参考价值 |
|------|------|---------|
| **ARM v2.0** | 4.2 | **v2.0重做成功案例** — v1.0(46/100)→v2.0(93/100,+47pp)、Python验证捕获算术错误 |
| **SBUX v4.0** | 4.05 | **迭代改善案例** — DM密度1.95、模块门控88.5%、推导链环环相扣 |
| **CRM v1.0 staging** | 失败 | **反面教材** — P3/P4 v2.0内容质量高(DM 2.40)但P1/P2叙事偏差→不可组装 |

### 1.3 从每份参考报告学什么

**ADBE v2.0 → 学什么**:
- Ch1"Adobe到底是什么公司"的中性起手 — 先定义公司，不预设方向
- AIAS v1.1框架的实战嵌入方式 — 在P1中用AIAS定量分析AI净影响
- "分裂体"概念→双引擎SOTP — Split Index>15必须SOTP
- SPOF信念冲突检验 — 市场4个隐含信念的内部逻辑矛盾
- Forward PE 9.6x隐含g≈0%→但FCF+26% — Reverse DCF翻译市场信念

**KLAC → 学什么**:
- 每段有独立论点+零填充 — 信息密度的黄金标准
- 信念反演深度 — 不止Reverse DCF数字，而是反推"市场在赌什么"的完整信念集
- 因果密度9.28/万字的写法 — 每个观点4层(数据→逻辑→历史→推理)

**IHG → 学什么**:
- DM密度2.85/千字的生产方式 — 每个数据点立即注册DM
- 92 Mermaid图的分布策略 — 每章≥3，覆盖因果/流程/对比
- 15Agent并行产出的文件传递机制

**ARM v2.0 → 学什么**:
- v2.0重做的成功方法 — 从v1.0的错误出发重构，不是"修补"
- Python DCF验证 — 捕获了$55.2B→$60.7B的关键算术错误
- 单会话组装的铁律J执行

---

## 二、CRM v1.0可复用资产

### 2.1 高价值资产(直接复用)

| 资产 | 来源 | 字符 | DM数 | 复用方式 |
|------|------|------|------|---------|
| 5个CQ定义 | P0.75 thesis | — | — | CQ1-CQ5定义+P4闭环结论直接搬入v2.0 P0 |
| P4最终估值参数 | P4 v2.0 | — | 21 | WACC 10%/有机增速~7%/AF溢价$22B作为v2.0起点 |
| DM锚点401个 | P1-P4 | — | 401 | 数据资产直接引用，不需要重新获取 |
| ADBE对标分析 | P3 v2.0 | ~8K | 5 | IBM路径/可比PE/双引擎对比直接嵌入P0 |
| 5情景概率框架 | P4 v2.0 | ~4K | 4 | Bull(7%)/Base-up(14%)/Base(30%)/Bear-mild(32%)/Bear-severe(17%) |
| 承重墙分析 | P3 v2.0 | ~6K | 4 | W-1~W-7承重墙清单+W-5"倒塌不致命"洞见 |
| AIAS v2.0 CRM预评 | AIAS doc | ~3K | — | 净影响+2.30 / Split Index 22 / S/B矩阵 |

### 2.2 需要更新的资产

| 资产 | 变化 | v2.0行动 |
|------|------|---------|
| 股价 | $175.49→$194.34(+10.7%) | 全部估值重做Reverse DCF |
| Forward PE | 13.1x→需确认 | 重新获取consensus EPS |
| Agentforce数据 | 可能有新季度数据 | WebSearch确认最新ARR/渗透率 |
| FY2027指引 | 可能有更新 | 确认最新管理层指引 |
| S&P评级 | 负面展望可能有变化 | 确认当前信用评级 |

### 2.3 必须重写的资产

| 资产 | 为什么不能复用 | v2.0替代 |
|------|-------------|---------|
| P1叙事框架("标签低估") | 结论先行偏差→P4推翻 | 中性视角: "市场定价了什么？合理吗？" |
| P2估值($235) | 基于偏高参数 | 从P4校准参数(有机7%/WACC 10%)直接建模 |
| CI-01"标签税10%" | P4校准后降至5%→微弱 | 重新评估标签税是否成立 |
| checkpoint.yaml | 仍是v1.0数据 | 完全重建 |

---

## 三、质量标准完整复述（最高标准版）

### 3.1 门控层(G0-G8) — 9项硬门控

**G0 过程门控(5项全PASS)**:
1. Reverse DCF在P1 Ch1完成 — **必须**
2. 最相似可比公司(ADBE)P0对标 — **必须**
3. Tier 3跨≥3个独立session — **必须**
4. 每Phase字符≥目标50% — **必须**
5. Checkpoint每Phase更新 — **必须**

**G1 DM密度 ≥1.5/千字**: 目标2.0+(比肩KLAC/SBUX)
**G2 DM总数 ≥450**: 目标500+(比肩IHG的547/KLAC的553)
**G3 Mermaid ≥35**: 目标50+(比肩SBUX 52/ARM 50)
**G4 因果密度 ≥5.0/万字(门控)**: 目标≥8.0(KLAC级D3满分)
**G5 Python验证 必须**: DCF/SOTP/敏感性矩阵/概率加权全部Python
**G6 离散度 ≤30%**: v1.0已达27.9%→v2.0目标≤25%
**G7 CQ1-CQ8完整闭环**: 5个CQ复用+补充3个CQ至8个
**G8 发布合规全PASS**: 零Phase痕迹/零Agent引用/零敏感表述/数据时效统一

### 3.2 评分层(D1-D11) — 总分≥88/110

| 维度 | 目标 | CRM v2.0具体指标 |
|------|------|-----------------|
| D1 数据基础 | ≥8 | DM≥500 + A级≥50% + 口径全统一 |
| D2 问题定义 | ≥8 | CQ1-CQ8全闭环 + thesis结晶≥1500字 + 核心矛盾一句话 |
| D3 分析深度 | ≥7(目标8) | 因果≥8/万字 + CI≥5个(每个≥5K) + 3层证据链 + ≥2个二阶效应 |
| D4 风险认知 | ≥7 | KS≥8个(12字段) + 慢变量≥3 + 红队有效性≥5% + 风险拓扑 |
| D5 估值框架 | ≥8 | ≥4方法 + 离散度≤25% + Python全覆盖 + 估值统一性 + 假设透明 |
| D6 数据验证 | ≥8 | 覆盖率≥80% + 双源≥60% + 异常值全解释 + 口径检测 |
| D7 非共识洞见 | ≥7 | CI≥3个(目标5) + ≥1个可迁移 + 对结论有实质影响 |
| D8 可视化 | ≥8 | Mermaid≥40 + 每章≥1 + 服务于推理 |
| D9 追踪体系 | ≥7 | KS≥8(12字段) + TS≥10 + 条件依赖 + 更新触发器 |
| D10 结构完整度 | ≥7 | CG全PASS + 覆盖完整性 + A/B分离 |
| D11 正交度+叙事一致性 | ≥8 | 零重复 + 单章≤15% + P1/P4方向完全一致 |

### 3.3 致命缺陷熔断(绝对禁止)

- D5<5 或 D1<5 或 D3<5 → 总分≤3.5
- D11<3(叙事断裂) → 总分≤3.5 — **CRM v1.0就是这个失败模式**
- P2→P4校准>25pp → 总分≤3.5 — **CRM v1.0校准-25%刚好在线上**

### 3.4 CRM v1.0教训强制执行清单

| 教训 | v2.0强制行动 | 检查时机 |
|------|------------|---------|
| 结论先行偏差 | P1 Ch1必须含Reverse DCF + 叙事偏离≤1档 | P1完成后 |
| 单日rush | 最少3 session + 同日禁>2 Phase | 每Phase提交前 |
| ADBE对标迟到 | P0 shared_context必须含ADBE PE/增速对比 | P0完成后 |
| P3 v1.0字符不足 | Phase字符<目标50%→BLOCK | 每Phase提交前 |
| Checkpoint未更新 | 估值变化→立即更新checkpoint | 每次估值变化后 |

---

## 四、问题树扩展（整合用户问题树+AIAS+行业框架）

### 4.1 CRM v2.0 核心问题(CQ1-CQ8)

**CQ1: Agentforce能否避免Einstein的失败模式？**
- Einstein: 7年后仍无显著收入贡献
- Agentforce: $800M ARR / 29K deals / 15个月3次定价调整
- **判题标准**: FY2027 Agentforce渗透率>15% AND 定价模型稳定>6个月 → 成功
- **AIAS锚定**: B3(+4)是否成立需要Agentforce API收入验证

**CQ2: seat→consumption转型的净收入效应**
- Service Cloud: AI客服替代→seat压缩 (AIAS S2=-5)
- Agentforce: consumption模式→潜在上升
- **判题标准**: 净收入效应=Agentforce新增收入 - seat压缩损失 → >0则正面
- **二阶效应**: seat压缩→客户重新评估整个SaaS栈→去供应商化风险

**CQ3: $25B ASR在$194下是天才还是灾难？**
- 盈亏平衡: ~$204(v1.0计算)
- 当前$194: IRR偏低但未必负
- **判题标准**: 5年后股价>$250→IRR>4%→合理; <$200→价值毁灭

**CQ4: OPM从2%→22%是结构性还是一次性(Elliott驱动)？**
- S&M从45%→35%(主动削减→增长换利润)
- 如果S&M继续压缩至30%→有机增速可能降至5-6%
- **判题标准**: FY2027 OPM>23% AND 有机增速>7% → 结构性

**CQ5: CRM是AI受害者还是受益者？(AIAS核心)**
- AIAS净影响+2.30(M调整后) / Split Index 22
- **判题标准**: 3年后AIAS维度的FVF验证+权重变化→如果B权重>S权重→受益者

**CQ6: 有机增速的真实底部在哪？**
- 有机增速: ~16%(FY2023)→~9%(FY2025)→~7%(FY2026, 扣Informatica)
- M&C仅+1.5%(实际负增长扣通胀)
- Professional Services -3.6%(已负增长)
- **判题标准**: 如果3个引擎同时失速(Service+M&C+PS)→有机增速可能4-6%

**CQ7: 市场的隐含定价合理吗？(Reverse DCF核心)**
- $194隐含的5Y CAGR = ? (v1.0在$175时隐含6.5-8.5%)
- $194可能隐含更高的CAGR→市场可能已经"不那么悲观"了
- **判题标准**: 隐含CAGR vs 有机增速→差值即市场偏差

**CQ8: 去供应商化(de-vendoring)风险有多大？**
- AI Agent层可能绕过Salesforce平台
- 企业直接用LLM+自建CRM
- **判题标准**: Fortune 500中使用Salesforce的比例变化+新创企业CRM选择

### 4.2 AIAS模块深度问题(从ADBE报告迁移)

**AI冲击分析必答问题**(比用户问题树更深):

1. **分裂体量化**: CRM的6条业务线中，哪些是AI受害者、哪些是受益者？Split Index=22意味着什么？
2. **衰减系数校准**: Service Cloud的seat压缩是1步传导(AI直接替代)还是2步(AI提升效率→企业裁人→seat减少)？传导时间窗口是什么？
3. **B5生态增强验证**: AppExchange+Data Cloud+MuleSoft是否形成了AI增强的数据飞轮？需要哪些KPI验证？
4. **M因子精确化**: Benioff在位(×1.05)但Einstein历史执行参差→如果Agentforce也执行不佳→M降至×0.85→净影响从+2.30→+1.86
5. **PE-AIAS一致性**: ADBE不一致(PE 9.6x vs应有17x)→CRM是否也不一致？如果$194对应PE ~X→AIAS+2.3应有PE ~15-18x→差距多大？
6. **IBM路径概率**: v1.0 P4评估CRM IBM路径49%(高于ADBE 40%)→这个概率是否在新数据下需要更新？
7. **双引擎SOTP必要性**: Split Index 22(重度分裂)→核心业务(Service+Sales+M&C)用成熟SaaS倍数 + 新引擎(Agentforce+Data Cloud+Platform)用成长估值

### 4.3 从用户问题树提取的补充深度问题

**总控层补充**:
- CRM v2.0是"一次性文章"还是"可维护的研究资产"？→ 必须是后者(D9≥7)
- 300KB中有多少是"有效深度体量"vs"背景填充"？→ DM密度≥1.5/千字是硬约束

**深度补强(D3相关)**:
- 哪些核心判断仍停留在表面？→ v1.0 P1的"标签税"论点就是表面判断
- 哪些关键变量还没有被机制化解释？→ NRR为什么从未公开？这背后的信号是什么？
- 哪些地方有结论但没有推导？→ v1.0的"Agentforce PMF未确定"需要定量证据链

**广度补强(D10相关)**:
- 是否覆盖了所有关键模块？→ v1.0缺少: 国际业务分析、M&A整合分析(Informatica)、R&D效率分析
- 哪些重要维度还没有进入主结构？→ 管理层治理(CEO沉默域/内部交易/say-on-pay)需要独立章节

**反方补强(D4相关)**:
- 反方最强论点是什么？→ "SaaSpocalypse是真的+CRM的增长引擎全部在减速+$25B债务回购是灾难"
- 如果反方成立，哪些章节需要重写？→ 如果有机增速降至4-6%→DCF/SOTP/概率加权全部需要重做
- 是否已经替反方补强？→ v1.0 P3做了，但v2.0需要从P1就嵌入反方视角(不是P3才做)

**决策补强(D9相关)**:
- 读者读完后知道该看什么？→ 需要明确的KS日历(FY2027 Q1/Q2关键数据点)
- 是否有一页式决策摘要？→ 执行摘要需包含: 评级+公允价值+Top 3看什么+不看什么

---

## 五、Skill和分析模块计划

### 5.1 按Phase的Skill加载计划(铁律M: 按需加载)

| Phase | Session | Skill | 用途 | 输出 |
|-------|---------|-------|------|------|
| **Phase -1** | Session 1 | `tier3_launch.sh` | 自动化Phase -1 | launch_brief.md |
| **Phase -0.5** | Session 1 | WebSearch × 5路 | 文献侦察 | lit_recon_memo.md |
| **Phase 0** | Session 1 | `/data-prefetch` | MCP+Python+WebSearch | shared_context.md (DM格式) |
| **Phase 0** | Session 1 | `/assumption-audit` M1 | Reverse DCF信念反演 | 市场隐含假设集 |
| **Phase 0.75** | Session 1 | — | 核心矛盾结晶(复用v1.0) | thesis_crystallization.md |
| **Phase 1** | **Session 2** | AIAS v2.0完整评估 | AI冲击量化 | AIAS矩阵+Split Index |
| **Phase 1** | Session 2 | `/competitive-benchmarking` | ADBE/NOW/WDAY对标 | 竞争对标章节 |
| **Phase 2** | Session 2 | Python DCF | 估值建模 | DCF/SOTP/敏感性矩阵 |
| **Phase 2** | Session 2 | `/cq-lifecycle-tracker` | CQ置信度追踪 | CQ演化表 |
| **Phase 3** | **Session 3** | `/red-team-suite` | RT-1~RT-7完整红队 | 红队修正矩阵 |
| **Phase 3** | Session 3 | `/risk-topology` | 风险协同映射 | 温水煮青蛙场景 |
| **Phase 3** | Session 3 | `/omission-scanner` | 遗漏扫描 | 缺失维度清单 |
| **Phase 3.8** | Session 3 | `/investment-committee` | 投资大师圆桌 | 方法论碰撞结论 |
| **Phase 4** | **Session 4** | `/valuation-quality-gate` | 估值质量门控 | 离散度/统一性PASS |
| **Phase 4** | Session 4 | `/assumption-audit` M2 | 共识解构 | 管理层/卖方叙事偏差 |
| **Phase 5** | **Session 5** | 单会话组装(铁律J) | Complete组装 | Complete报告 |
| **Post** | Session 5 | `/deep-reflection` | 3步反思 | R1(生态科技模块)+R2审计+R3评分 |

### 5.2 行业框架路由

| 框架 | 文件 | CRM适用部分 |
|------|------|------------|
| **B2B平台深度** | `docs/industry/b2b_platform_deep.md` | **最直接** — I×L双轴(基础设施嵌入度×流动性壁垒)、续约率/NRR/集成深度 |
| **生态科技深度** | `docs/industry/eco_tech_deep.md` | 公司级路由表(CRM=PW~5.6中宽度)、OVM诊断(Data Cloud期权) |
| **科技平台深度** | `docs/industry/tech_platform_deep.md` | 网络效应(AppExchange多边市场)、数据护城河 |
| **AIAS v2.0** | `docs/ai_software_impact_framework_v2.md` | 完整AIAS评估(5S+5B+M)、分裂体指数、PE-AIAS一致性 |
| **品质评估** | `docs/company_quality_scoring.md` | A+B+C+D 21维度品质量化 |

### 5.3 MCP工具使用计划

| 工具 | 调用时机 | 获取数据 |
|------|---------|---------|
| `baggers_summary CRM` | Phase 0 | 宏观温度+7维度38指标+杜邦分析 |
| `fmp_data CRM income annual` | Phase 0 | 6年收入趋势 |
| `fmp_data CRM income quarter` | Phase 0 | 季度趋势(FY2026 Q4+FY2027指引) |
| `fmp_data CRM balance annual` | Phase 0 | 资产负债(ASR后杠杆) |
| `fmp_data CRM cashflow annual` | Phase 0 | FCF趋势+SBC |
| `fmp_data CRM ratios annual` | Phase 0 | PE/PB/EV倍数 |
| `fmp_data CRM key-metrics annual` | Phase 0 | 关键指标 |
| `fmp_data CRM insider-trading` | Phase 1 | 内部交易(71卖/2买) |
| `compare_stocks CRM ADBE NOW WDAY` | Phase 0 | 可比公司对标 |
| `analyze_stock CRM full` | Phase 0 | 完整分析 |
| `fmp_data CRM estimates` | Phase 2 | Consensus EPS/Revenue预测 |
| `fmp_data CRM dcf` | Phase 2 | FMP DCF参考值 |
| `fmp_data CRM financial-scores` | Phase 1 | Altman Z/Piotroski F |
| `polymarket_events` "Salesforce" | Phase 0 | 预测市场概率 |

---

## 六、章节规划(300KB+目标)

### 6.1 章节分配(25章+附录)

| Part | 章节 | 独立论点 | 目标字符 | 占比 |
|------|------|---------|---------|------|
| **I. 公司定义** | Ch1 CRM是什么公司(Reverse DCF前置) | 市场隐含假设+标签是否真的错 | 15K | 5% |
| | Ch2 ADBE对标(P0嵌入) | 增速/PE/AI威胁的镜像分析 | 12K | 4% |
| | Ch3 AIAS v2.0完整评估 | AI冲击量化: 净影响+Split Index | 18K | 6% |
| **II. 业务分析** | Ch4 六引擎增速解剖 | 快速组vs慢速组+双速结构 | 15K | 5% |
| | Ch5 Agentforce深度 | PMF验证+Einstein对标+定价进化 | 15K | 5% |
| | Ch6 Service Cloud seat压缩 | AI客服替代率+净效应量化 | 12K | 4% |
| | Ch7 Data Cloud+Platform生态 | AppExchange+MuleSoft+数据飞轮 | 12K | 4% |
| | Ch8 M&A整合(Informatica+Slack) | 有机增速扣除+ROIC | 10K | 3% |
| **III. 护城河** | Ch9 护城河五维评估 | C1嵌入性+B4定价权+C3锁定+D1反脆弱 | 15K | 5% |
| | Ch10 竞争格局(NOW/WDAY/HUBS/MSFT) | 4大竞争者+市占率变化 | 12K | 4% |
| **IV. 财务** | Ch11 6年财务趋势深拆 | 增长→利润变轨的因果链 | 15K | 5% |
| | Ch12 FCF/SBC/ASR解剖 | 真实现金回报+回购IRR | 12K | 4% |
| | Ch13 杠杆+信用分析 | $42B债务+S&P展望+利息覆盖 | 10K | 3% |
| | Ch14 管理层/治理 | CEO沉默域+内部交易+say-on-pay | 10K | 3% |
| **V. 估值** | Ch15 Reverse DCF(P1前置版扩展) | $194隐含假设的完整翻译 | 12K | 4% |
| | Ch16 SOTP(双引擎) | 核心业务+新引擎分别估值 | 12K | 4% |
| | Ch17 正向DCF(Python验证) | 3情景×敏感性矩阵 | 10K | 3% |
| | Ch18 可比估值(ADBE锚点) | ADBE+成长SaaS双锚 | 10K | 3% |
| | Ch19 概率加权五情景 | 5情景概率+价格中点+期望值 | 12K | 4% |
| **VI. 红队** | Ch20 承重墙测试 | W-1~W-7哪面墙最脆弱 | 12K | 4% |
| | Ch21 反方最强论证 | SaaSpocalypse+IBM路径+去供应商化 | 12K | 4% |
| | Ch22 温水煮青蛙 | 慢变量联合概率 | 8K | 3% |
| **VII. 综合** | Ch23 5方法收敛+统一性 | 铁律K+离散度+方向一致性 | 10K | 3% |
| | Ch24 评级+CQ闭环 | 最终评级+8个CQ方向+条件路径 | 12K | 4% |
| | Ch25 KS+TS追踪体系 | 8个KS(12字段)+10个TS+日历 | 10K | 3% |
| **附录** | App-A DM注册表 | 500+DM全量 | 15K | 5% |
| | App-B Python验证代码 | DCF/SOTP/概率加权 | 8K | 3% |
| | App-C AIAS详细矩阵 | 6业务线×10维度完整表 | 5K | 2% |
| | **合计** | | **~310K** | 100% |

### 6.2 每Phase产出目标

| Phase | 章节 | 目标字符 | 最低(50%) | DM目标 | Mermaid |
|-------|------|---------|----------|--------|---------|
| P0 | 数据预取+CQ | 15K | 7.5K | 60 | 2 |
| P1 | Ch1-Ch10 | 130K | 65K | 180 | 18 |
| P2 | Ch11-Ch19 | 100K | 50K | 150 | 15 |
| P3 | Ch20-Ch22 | 35K | 17.5K | 60 | 8 |
| P4 | Ch23-Ch25 | 30K | 15K | 50 | 7 |
| 合计 | 25章+附录 | ~310K | ~155K | 500 | 50 |

---

## 七、Session计划(铁律P: ≥3 session)

| Session | Phase | 核心任务 | 预计产出 | 关键检查点 |
|---------|-------|---------|---------|-----------|
| **S1** | P-1→P0→P0.75 | tier3_launch→数据预取→Reverse DCF→ADBE对标→CQ定义→thesis结晶 | 15K+数据文件 | ✅Reverse DCF在P0完成 ✅ADBE对标在P0完成 |
| **S2** | P1 | Ch1-Ch10(业务+AIAS+护城河+竞争) | 130K | ✅P1叙事与Reverse DCF偏离≤1档 ✅每章≥目标80% |
| **S3** | P2 | Ch11-Ch19(财务+估值) | 100K | ✅Python验证全覆盖 ✅估值统一性 |
| **S4** | P3+P4 | Ch20-Ch25(红队+综合+追踪) | 65K | ✅红队有效性≥5% ✅离散度≤30% ✅CQ全闭环 |
| **S5** | P5 | Complete组装(铁律J单会话) | 310K | ✅G0-G8全PASS ✅D1-D11≥88 ✅零致命缺陷 |

**Session间纠偏窗口**:
- S1→S2: 检查Reverse DCF结论是否支持中性叙事(不是P1预设方向)
- S2→S3: 检查P1叙事方向 vs P0 Reverse DCF → 偏离>1档必须修正
- S3→S4: 检查估值统一性 → P2估值与P0 Reverse DCF方向一致？
- S4→S5: 检查P4校准幅度 → |P2-P4|/P2 → 如果>20%审查P1起点

---

## 八、v2.0起手策略

### 8.1 第一步: Reverse DCF at $194

```
目标: 翻译"$194隐含了什么"
方法:
  1. 获取最新consensus FCF/EPS/Revenue
  2. 反推隐含5Y Revenue CAGR
  3. 反推隐含终端OPM
  4. 反推隐含WACC
  5. 与实际有机增速(~7%)对比→市场偏差多大？
```

v1.0在$175时: 隐含CAGR 6.5-8.5% → 有机增速~7% → 市场基本正确
v2.0在$194时: 隐含CAGR可能略高 → 如果隐含8-10% → 可能略高于有机→ 市场可能略乐观

**这决定了v2.0的叙事方向**: 如果$194隐含假设合理→中性报告; 如果偏乐观→审慎关注; 如果偏保守→关注。

### 8.2 第二步: ADBE对标锚定

| 指标 | ADBE (v2.0报告) | CRM ($194) | 差异信号 |
|------|-----------------|-----------|---------|
| Forward PE | 9.6x | ~14-15x? | CRM更贵→需要更高增速支撑 |
| 增速 | ~12% | ~10%(含Informatica)/~7%(有机) | CRM有机增速更低→PE应更低 |
| OPM | 47.4%(GAAP) | 21.5%(GAAP) | ADBE利润率远高→PE应更高 |
| FCF Yield | ~6% | ~7% | CRM FCF Yield更高→更便宜 |
| AIAS净影响 | +0.51 | +2.30 | CRM AI受益更大→PE应更高 |
| Split Index | 17 | 22 | CRM分裂更严重→必须双引擎SOTP |

**锚定结论**: ADBE PE 9.6x + 增速更高 + OPM更高→如果ADBE被低估→CRM PE ~14x是否合理取决于AIAS差异(+2.30 vs +0.51)能否解释PE差距。

### 8.3 v2.0叙事基调(基于Reverse DCF预判)

**中性视角模板**:
```
"Salesforce在$194的交易价格隐含了[X]的增速假设。
我们的分析显示有机增速约[Y]%。
如果X≈Y→市场定价合理→中性关注。
如果X>Y→市场偏乐观→审慎关注。
如果X<Y→市场偏保守→关注。
关键不确定性来自[CQ1-CQ8]，其中[CQn]最能改变结论。"
```

这个模板确保P1不预设方向，由Reverse DCF数据驱动叙事。
