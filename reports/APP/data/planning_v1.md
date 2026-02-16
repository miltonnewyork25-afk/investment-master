# APP (AppLovin) — Tier 4+ 研报规划书 v2.0

> **日期**: 2026-02-16 | **框架版本**: v14.0 + v10.0(DM锚定) + v9.0(扬长避短)
> **目标**: 超越现有11份报告的历史最高水准
> **状态**: PLANNING v2.0 — 5个预研Agent全部完成, 等待用户确认后进入执行
> **文献地图**: `reports/APP/data/literature_map_phase_neg0.5.md` (30源, 5维度, Tier A/B/C分级)

---

## 一、公司快照

| 维度 | 数据 |
|------|------|
| **公司** | AppLovin Corporation (NASDAQ: APP) |
| **行业** | 软件应用 / AI驱动广告科技平台 |
| **市值** | $132B (2026-02-14) |
| **股价** | $390.67 (52周高: $745.61, 52周低: $200.50) |
| **FY2025收入** | $5.48B (+70% YoY) |
| **Q4 2025** | $1.66B (+66% YoY), EPS $3.24 (beat 10%) |
| **净利率** | 60.8% (TTM) |
| **ROIC** | 105.9% | **ROE** | 206.8% |
| **FCF利润率** | 72.5% | **毛利率** | 87.9% |
| **P/E** | 38.9x (TTM) / 26.5x (Forward) |
| **Beta** | 2.49 |
| **YTD表现** | -45.6% (S&P 500中表现最差) |

---

## 二、核心矛盾识别

**唯一核心矛盾**: **AI算法黑箱的价值可持续性 vs 平台依赖+竞争侵蚀的结构性风险**

分解为三重张力:
1. **增长天花板**: 游戏广告存量市场(~$100B) vs 电商广告增量市场(~$400B+) — AXON能否跨品类?
2. **护城河脆弱性**: MAX 60-80%份额+数据飞轮 vs Apple/Google政策一纸令变+Meta进入竞价
3. **信任危机**: SEC调查+3份做空报告+fingerprinting指控 vs 财务表现持续超预期

---

## 三、可能性宽度评估

| 维度 | 评分 | 理由 |
|------|:----:|------|
| 商业模式新颖度 | 7 | AI黑箱广告引擎, 纯广告平台(Apps已2025-07剥离@$400M), 电商+CTV是全新赛道 |
| 收入可预测性 | 5 | 软件平台高增长但减速明显(66%→52%), Apps稳定但萎缩 |
| TAM不确定性 | 8 | 电商扩展是0或$10B+的二元赌注, CTV/品牌广告亦未验证 |
| 竞争格局变动性 | 7 | Meta竞价进入, Google Project Genie, Moloco崛起, Unity重组 |
| 监管/法律风险 | 7 | SEC调查进行中, Apple隐私政策, class action pending |

**可能性宽度总分: 6.8 → 取7分 → Discovery System (B型: 量级不确定性)**

**方法论路由**: Discovery System — 不给目标价, 映射可能性空间+开放问题+转折点
- **类比**: 介于PLTR(8分,B型)和RDDT(6分,混合)之间
- **B型特征**: 知道APP做的是广告科技, 不确定的是AXON跨品类后的规模量级

---

## 四、与历史最佳报告的差异化策略

### 4.1 对标基准

| 指标 | GOOGL(历史最佳) | PLTR(最深度) | RDDT(最新) | **APP(目标)** |
|------|:-:|:-:|:-:|:-:|
| 总字符 | 453K | 389K | 245K | **≥550K** |
| CG通过 | 13/13 | 13/13 | 13/13 | **13/13** |
| DM锚点 | ~1,800 | 127 | 240 | **≥350** |
| Mermaid | ~100 | 137 | 69 | **≥150** |
| CQ置信度 | ~50% | 45.6% | 29.6% | **≥50%** |
| 方法离散度 | ~2x | 25.5x | 2.91x | **待定** |
| Agent数 | 9 | 15+4Sup | 15(12+3Sup) | **20+4Sup** |
| 原创框架 | 六方法SOTP | OVM+Discovery | ERM+Scout | **3个原创** |
| Sessions | 多 | 4 | 2 | **6** |

### 4.2 三个原创分析框架 (APP特异性)

**Framework 1: AI黑箱估值框架 (AXON Opacity Valuation)**
- 问题: AXON是黑箱, 无法直接评估技术竞争力
- 方法: 通过可观测代理指标(CPM趋势/客户留存率/竞价胜率/模型迭代频率)间接推断黑箱质量
- 产出: AXON质量衰减概率曲线 + 与Meta Advantage+/Google Genie的效率对比

**Framework 2: 平台依赖风险矩阵 (Platform Dependency Risk Matrix, PDRM)**
- 问题: APP完全依赖Apple App Store + Google Play政策
- 方法: 历史政策变更影响回测(ATT 2021, Google Privacy Sandbox 2024) + 条件概率模型
- 产出: 政策变更情景矩阵(每个政策变更 × 收入影响% × 概率)

**Framework 3: TAM扩展条件概率引擎 (TAM Expansion Conditional Probability)**
- 问题: 电商/CTV/品牌广告各自TAM能占多少?
- 方法: 将每个TAM扩展分解为必要条件链(技术可行→客户采纳→规模化→盈利)
- 产出: 条件概率树 + 各情景下的收入归因 + 累积概率加权收入

### 4.3 超越Tier 3的具体维度

1. **AXON技术逆向工程**: 从公开信息(专利/论文/SDK分析/开发者文档)重构AXON技术架构
2. **电商Pilot实证分析**: 从6,400电商客户数据推断单位经济学(LTV/CAC/ROAS)
3. **SEC调查概率建模**: 参考历史SEC调查案例(FB/GOOG/SNAP)的时间线+结果概率
4. **做空论点逐条钢人检验**: Muddy Waters/Fuzzy Panda/Culper的每个论点独立验证
5. **管理层信号解码**: Adam Foroughi决策风格分析(Goldman Sachs访谈+财报电话会)
6. **隐私法规情景树**: Apple ATT后续+Google Privacy Sandbox+EU DMA+美国联邦隐私法

---

## 五、执行架构

### 5.1 Phase结构 (6 Sessions)

| Phase | Session | 内容 | 字符目标 | Agent数 |
|-------|---------|------|---------|---------|
| **-1** | Session 0 | 知识检索(已完成) | 2K | 0 |
| **-0.5** | Session 0 | 文献侦察(5路搜索+Top 5精读) | 3K | 5 |
| **0** | Session 0 | 数据预取+DM v1.0+KAL模板 | 自动 | 自动 |
| **0.5** | Session 0 | CQ提取+模块路由+报告大纲 | 5K | 3 |
| **1** | Session 1 | 公司定位+AXON深度+产业链+ERM | ≥35K | 3(A+B+C) |
| **2** | Session 2 | 财务深挖+Reverse DCF+承重墙+PDRM | ≥40K | 3(A+B+C) |
| **3+3.5** | Session 3 | 竞争+AI冲击+五引擎+TAM条件概率 | ≥45K | 3(A+B+C) |
| **4** | Session 4 | 红队七问+Cross-Agent+做空逐条检验 | ≥30K | 3(A+B+C) |
| **5** | Session 5 | 综合产出+KS+TS+CQ闭环+Complete组装 | ≥45K | 3(A+B+C) |
| **5.5** | Session 6 | 4个Supplement深化薄弱CQ | ≥120K | 4(专项) |

**总计**: ≥325K(主报告) + ≥120K(4 Supplement) + ≥105K(Phase 0-0.5产出) = **≥550K**

### 5.2 Agent身份分配 (v7.1)

| Agent | 身份 | 质量直觉 | 核心任务 |
|-------|------|---------|---------|
| **Agent A** | 广告科技商业分析师 | "如果AXON真的这么好, 为什么电商客户LTV/CAC仅30天breakeven而非更好?" | 商业模型+产业链+生态系统 |
| **Agent B** | 独立风险审计员 | "SEC调查+做空报告+Meta竞争=三重风险叠加, 哪个最可能率先兑现?" | 风险评估+做空检验+对抗审查 |
| **Agent C** | AI定量估值分析师 | "ROIC 106%是真实还是会计魔术? DPO 360天能持续多久?" | 财务深挖+Reverse DCF+估值 |

### 5.3 Core Questions预估 (8-10个)

基于Phase -0.5文献侦察+财务数据, 预估以下CQ:

| # | Core Question | 类型 | 预估置信度 |
|---|--------------|------|:--------:|
| CQ1 | AXON 2.0的竞争优势能持续多久? Meta/Google进入后护城河是否被侵蚀? | 深挖 | 40% |
| CQ2 | 电商广告扩展能否成功? GA launch后能达到什么规模? | 深挖 | 25% |
| CQ3 | SEC调查的最终结果是什么? 对业务的实质影响有多大? | 诚实 | 20% |
| CQ4 | 当前估值(P/E 39x)隐含了什么增长假设? 这些假设合理吗? | 深挖 | 50% |
| CQ5 | Apple/Google隐私政策变更是否会破坏AXON的数据飞轮? | 深挖 | 35% |
| CQ6 | Apps剥离后的纯广告平台模式: 数据飞轮是否因失去第一方游戏数据而削弱? | 深挖 | 40% |
| CQ7 | DPO 360天的"准银行"地位是否可持续? 什么条件下会崩塌? | 深挖 | 45% |
| CQ8 | 管理层(Foroughi)的执行力和战略判断力如何评估? | 诚实 | 30% |
| CQ9 | 做空报告的核心论点(fingerprinting/数据滥用)是否成立? | 深挖 | 35% |
| CQ10 | APP在AI广告科技行业的终局格局中处于什么位置? | 发现 | 20% |

### 5.4 行业模块路由

| 模块 | 适用性 | 执行深度 |
|------|:------:|---------|
| **TP01** 平台经济学 | **强** | 深度 — MAX mediation网络效应+锁定系数 |
| **TP02** 广告经济学 | **强** | 深度 — ARPU/CPM/eCPM趋势+ad load |
| **TP04** 监管与反垄断 | **强** | 深度 — SEC调查+隐私法规+反垄断 |
| **TP06** 数据护城河 | **强** | 深度 — AXON数据飞轮+fingerprinting争议 |
| **TP03** 云基础设施 | 弱 | 略 — APP不是云公司 |
| **TP05** 开发者生态 | 中 | 简述 — SDK集成度+开发者满意度 |
| **M13** AI冲击矩阵 | **强** | 深度 — APP本身就是AI公司, 分部级评估 |
| **M14** 市场注意力雷达 | **强** | 深度 — 当前市场争议极多 |

### 5.5 ERM触发评估

| ERM触发条件 | APP评估 | 结论 |
|------------|---------|------|
| 生态依赖>20% | **Apple App Store + Google Play = 100%分发依赖** | **触发** |
| 平台模式 | MAX mediation = 双边平台(开发者↔广告主) | **触发** |
| AI基础设施 | AXON = AI核心 | **触发** |
| 监管密集型创新 | SEC调查+隐私法规 | **触发** |

**结论: 4/4触发 → 必须执行完整ERM**

ERM五层映射:
| 层级 | APP生态角色 |
|------|-----------|
| 编排者 | Apple/Google (OS+App Store) |
| 互补者 | 游戏开发者, 电商广告主, 品牌方 |
| 供应者 | 云计算(AWS/GCP), 数据中心 |
| 渠道 | MAX SDK分发, Axon Ads Manager |
| 监管者 | SEC, Apple隐私政策, EU GDPR/DMA |

### 5.6 OVM触发评估

| OVM触发条件 | APP评估 | 结论 |
|------------|---------|------|
| 传统估值<市价50% | 需Phase 2计算 | 可能触发 |
| ≥2条pre-revenue业务线 | 电商广告(early) + CTV(pre-revenue) | **触发** |
| P/E>50x | P/E TTM 39x, 接近但未超50x | 边缘 |

**结论: 可能触发 → Phase 2后决定**

---

## 六、数据可用性评估

### 6.1 已获取数据 (Phase -1 / Phase 0 预取)

| 数据类型 | 状态 | 来源 |
|---------|:----:|------|
| 公司概况 | ✅ | FMP profile + baggers_search |
| 季度财报(8Q) | ✅ | FMP income quarterly |
| 年度财报(5Y) | ✅ | FMP income annual |
| 关键比率 | ✅ | FMP ratios + key-metrics |
| 估值数据 | ✅ | FMP estimates + dcf + rating |
| 内部人交易 | ✅ | FMP insider-trading |
| 技术分析(2Y) | ✅ | analyze_stock full |
| 策略分析报告 | ✅ | baggers_strategy |
| 财务摘要(7维38指标) | ✅ | baggers_summary |
| 竞争格局 | ✅ | WebSearch (6轮) |
| 做空报告 | ✅ | WebSearch (Muddy Waters/Fuzzy Panda/CapitalWatch) |
| SEC文件 | ✅ | baggers_sec_filings |
| 分析师目标价 | ✅ | WebSearch |
| Q4 2025财报/电话会 | ✅ | WebSearch |

### 6.2 缺口 (Phase 0需补充)

| 数据类型 | 缺口 | 补充计划 |
|---------|------|---------|
| Software/Apps分部拆分 | Q4 2025分部详细数据 | 读10-K filing |
| 电商客户具体数据 | LTV/CAC/ROAS公开数据有限 | 广告行业来源+财报电话会 |
| AXON SDK技术细节 | 黑箱, 有限公开信息 | 专利搜索+开发者文档+第三方分析 |
| Polymarket事件 | APP直接相关事件极少 | 搜索行业级事件(ad-tech regulation) |

---

## 七、4个Supplement预设方向

> Phase 5后根据CQ置信度调整。预设基于CQ预估。

| Supplement | 目标CQ | 主题 | 预估字符 |
|-----------|--------|------|---------|
| **SA** | CQ2 | 电商广告扩展深度分析: 6,400客户→规模化路径+单位经济学+Meta/Google对比 | 30-35K |
| **SB** | CQ9+CQ3 | 做空论点全面检验+SEC调查概率建模: Muddy Waters逐条+历史案例对比 | 30-35K |
| **SC** | CQ1+CQ5 | AXON技术逆向+隐私政策情景树: 公开专利分析+ATT回测+Privacy Sandbox影响 | 30-35K |
| **SD** | CQ10 | 终局格局推演: 广告科技行业5年竞争均衡+APP定位+并购可能性 | 25-30K |

---

## 八、关键风险/争议点 (Red Team预装弹药)

### 8.1 做空报告核心论点 (待逐条检验)

| 来源 | 核心指控 | 严重度 |
|------|---------|:------:|
| **Muddy Waters** (2025-03) | AXON系统性违反App Store TOS, 非法提取Meta/Snap/TikTok等平台的proprietary IDs | 高 |
| **Fuzzy Panda** (2025-02) | AXON增长部分来自device fingerprinting(被Apple禁止) | 高 |
| **Culper Research** (2025-02) | AXON软件效果被夸大, 质疑收入质量 | 中 |
| **CapitalWatch** (2026-01) | 大股东Hao Tang涉嫌洗钱(已撤回道歉) | 低(已撤回) |

### 8.2 重大事件时间线

| 日期 | 事件 | 影响 |
|------|------|------|
| 2025-02-26 | Fuzzy Panda+Culper做空 | 股价-12% |
| 2025-03-27 | Muddy Waters做空 | 股价-20%(单日记录) |
| 2025-10-06 | SEC调查报道 | 股价-14% |
| 2026-01-27 | CapitalWatch做空 | 股价下跌 |
| 2026-02-09 | CapitalWatch撤回道歉 | 股价+14% |
| 2026-02-11 | Q4 2025财报(beat) | 盘后-20% |
| 2026-02-13 | 股价$391 | YTD -45.6%, S&P 500最差 |
| **2026 1H** | **Axon Ads Manager GA发布** | **电商扩展关键催化** |
| **2026-05-13** | **Q1 2026财报** | **增速减速确认/否定** |

---

## 九、与RDDT Planning的对比分析

### 9.1 对比表

| 维度 | RDDT Planning | APP Planning | APP优势 | APP劣势 |
|------|:----------:|:----------:|---------|---------|
| **可能性宽度** | 6(混合) | 7(发现系统) | 更匹配公司特性 | 发现系统产出更难, 不给目标价 |
| **Phase结构** | 标准6Phase | 标准6Phase+Phase -1/-0.5 | v14.0知识层首次完整部署 | 增加执行复杂度 |
| **原创框架** | 1(ERM) | 3(AI黑箱+PDRM+TAM条件概率) | 更深度的公司特异性分析 | 框架设计质量未验证 |
| **Agent数** | 15(12+3Sup) | 24(20+4Sup) | 更全面的CQ覆盖 | Agent管理复杂度更高 |
| **字符目标** | 245K | ≥550K | 超越GOOGL的453K | 质量>数量, 不能注水 |
| **CQ数量** | 7 | 10 | 覆盖更多争议 | 可能分散深度 |
| **数据预取** | 标准 | 超级(5 Agent并行预扫) | 数据基础远超RDDT | — |
| **做空检验** | 无 | 3份做空报告逐条检验 | RT-3钢人论证更扎实 | 做空论点可能正确 |
| **SEC风险** | 无 | SEC调查概率建模 | 法律风险量化 | 结果不可预测 |
| **ERM** | 首次部署 | 第二次(经验复用) | 更成熟的执行 | — |
| **Scout参考** | 首次(零经验基线) | 有RDDT+PLTR+GOOGL参考 | 更丰富的学习输入 | — |

### 9.2 RDDT Planning的优点 (APP应学习)

1. **Scout+3+QSA架构验证成功** → APP直接复用, 无需重新设计
2. **ERM首次成功部署** → APP的ERM可以复用RDDT的5层结构模板
3. **Supplement有效补强薄弱CQ** → APP预设4个Supplement方向
4. **DM覆盖率96%+** → APP设定≥95%的DM覆盖率目标

### 9.3 RDDT Planning的不足 (APP应避免)

1. **CQ置信度29.6%(历史最低)** → 根因: Agent prompt不够详细
   - **APP对策**: 每个Agent prompt包含v13.0合同(最低字符门槛+重跑机制)
2. **Agent产出不均** → 某些Agent产出<15K
   - **APP对策**: 设定模块类型最低字符门槛(Phase 1: ≥10K/Agent, Phase 2-3: ≥12K/Agent)
3. **v1.0→v1.1组装问题** → Supplement标题层级+Agent header
   - **APP对策**: 从v1.0起就按Complete连贯性规则组装
4. **缺少Phase -1/-0.5** → RDDT是v14.0前的报告
   - **APP对策**: 完整执行Phase -1知识检索+Phase -0.5文献侦察

### 9.4 APP Planning的独特优势

1. **v14.0知识层首次完整部署** — 11份报告的经验+规划档案
2. **最多外部争议** — 做空报告+SEC调查+Meta竞争+增速减速, 提供最丰富的对抗素材
3. **极端财务特征** — ROIC 106%/净利率61%/FCF 72%/DPO 360天, 每个都值得深挖
4. **AI-native公司** — AXON不是"用AI"的公司, 而是"卖AI"的公司, M13/Phase 3.5分析具有特殊深度
5. **时机优势** — Q4财报刚出(2026-02-11)+股价腰斩, 研究时间窗口极佳

### 9.5 APP Planning的潜在风险

1. **框架复杂度过高** → GOOGL用最简框架产出最佳报告的教训
   - **缓解**: 3个原创框架保持精简(各<5K字符), 不追求框架完整性
2. **550K目标可能导致注水** → 数量≠质量
   - **缓解**: 每个模块必须通过"So What?"检验, 低洞察模块压缩
3. **发现系统(PW=7)执行难度** → 不给目标价, 读者可能不满意
   - **缓解**: 提供条件估值范围(多情景), Reverse DCF承重墙分析
4. **10个CQ可能过多** → RDDT的7个CQ都未充分覆盖
   - **缓解**: Phase 0.5后根据实际优化到8个

---

## 十、执行检查清单

### Session 0 (Phase -1 / -0.5 / 0 / 0.5)
- [x] Phase -1: 知识检索 `find_relevant_knowledge.sh` → 已完成
- [ ] Phase -0.5: 文献侦察 → 5路WebSearch + Top 5精读 → `lit_recon_memo.md`
- [ ] Phase 0: data-prefetch → 17个数据文件 → `prefetch_metadata.json`
- [ ] Phase 0: DM v1.0初始化 → `shared_context.md`
- [ ] Phase 0: KAL模板 → `key_assumptions.md`
- [ ] Phase 0: 投资温度计算
- [ ] Phase 0.5: 5路WebSearch → Top 10维度 → 8-10 CQ → 模块路由 → 报告大纲
- [ ] Phase 0.5: Research Scorecard Pre → baseline分数

### Session 1 (Phase 1)
- [ ] Scout: 精读参考报告(RDDT or PLTR) → 5条教训
- [ ] Agent A: 公司画像+AXON深度+产业链
- [ ] Agent B: ERM五层映射+采用链断点
- [ ] Agent C: 分部财务拆分(Software vs Apps)
- [ ] QSA: 每Agent后quality_sentinel.sh
- [ ] FastGate → checkpoint → commit

### Session 2 (Phase 2)
- [ ] Agent A: 5年财务趋势+异常检测
- [ ] Agent B: Reverse DCF+承重墙脆弱度表
- [ ] Agent C: PDRM(平台依赖风险矩阵)+三情景推演
- [ ] QSA + FastGate → checkpoint → commit

### Session 3 (Phase 3 + 3.5)
- [ ] Agent A: 竞争格局(APP vs Meta vs Google vs Unity vs Moloco)
- [ ] Agent B: 五引擎协同分析
- [ ] Agent C: TAM条件概率引擎+AI冲击矩阵(M13)
- [ ] QSA + FastGate → checkpoint → commit

### Session 4 (Phase 4)
- [ ] Agent A: RT-1~RT-7红队七问
- [ ] Agent B: Cross-Agent验证(读P1-3 staging)+做空报告逐条检验
- [ ] Agent C: SEC调查概率建模+黑天鹅概率加权表
- [ ] 纠错回流清单 → 覆盖P1-3
- [ ] QSA + FastGate → checkpoint → commit

### Session 5 (Phase 5 + Complete组装)
- [ ] Agent A: KS 12-15个(9字段) + TS 6-8个(特异性测试)
- [ ] Agent B: CQ闭环(10个×5要素) + 置信度演化表
- [ ] Agent C: Reverse DCF价格含义总结 + 条件估值范围
- [ ] Protocol Header + AI能力边界 + 框架注册表
- [ ] Complete组装 → quality_gate_complete.sh → 13/13 CG
- [ ] Research Scorecard Post + Compare

### Session 6 (Phase 5.5 — Supplements)
- [ ] Supplement A: 电商广告扩展深度
- [ ] Supplement B: 做空论点+SEC概率
- [ ] Supplement C: AXON技术+隐私情景
- [ ] Supplement D: 终局格局推演
- [ ] CQ置信度更新 → Complete v2.0组装

---

## 十一、成功标准

| 指标 | 目标 | 超越基准 |
|------|------|---------|
| 总字符 | ≥550K | GOOGL 453K (+21%) |
| CG | 13/13 PASS | 与最佳持平 |
| DM覆盖率 | ≥95% | RDDT 96% |
| DM锚点 | ≥350 | RDDT 240 (+46%) |
| Mermaid | ≥150 | PLTR 137 (+9%) |
| CQ置信度 | ≥50% | GOOGL ~50% (持平) |
| KS | 12-15 | PLTR 15 |
| TS | 6-8 | RDDT 8 |
| 原创框架 | 3个 | 历史最多 |
| Supplement | 4个 | PLTR 4 (持平) |
| 研究记分卡Delta | ≥55 | 定义"优秀" |
| 做空论点检验 | ≥3份完整检验 | 历史首次 |

---

## 附录: 文献侦察初步发现 (Phase -0.5 Agent产出摘要)

### A. 核心论点 (多数分析师)
- AXON是AI广告的杀手级应用, Software Platform 81%+ EBITDA margin不可复制
- MAX mediation 60-80%份额创造赢家通吃格局
- 电商扩展从600→6,400客户, GA launch是2026最大催化剂

### B. 风险盲点 (对抗视角)
- **fingerprinting指控**: 如果SEC确认违规, 可能导致App Store下架
- **Meta进入竞价**: Meta Advantage+在in-game inventory的竞价可能侵蚀APP的CPM
- **增速减速**: Q4 66%→Q1 guidance 52% YoY, 线性外推=2027可能<30%
- **DPO 360天不可持续**: 如果开发者要求更快付款, 现金流模型崩塌

### C. 行业结构性变化
- 移动广告市场$390B(2025), CAGR 8-13%
- 程序化广告$97.6B(2025), 预计$328B(2035)
- Apple ATT后APP反而受益(竞争对手数据质量下降)
- Google Privacy Sandbox演进中, 影响不确定

### D. 信息差
- CEO Foroughi: "可以仅靠游戏维持20-30% YoY增长"
- 电商客户weekly spending增50%, 模型"material lift"
- BofA新街高目标价, "likely required channel for DTC"

### E. 分歧区 (≥5条, 文献地图E节验证)
1. **AXON是否违规**: Muddy Waters说"系统性违反TOS" vs CEO说"充满不实指控"
2. **电商能否规模化**: 看多方说"$400B TAM" vs 看空方说"游戏经验不可迁移"
3. **估值合理性**: Forward P/E 27x看多方说"合理(增长溢价)" vs 看空方说"DCF<$200"
4. **AXON是真护城河还是黑箱幻觉**: RL+第一方数据=持续优势 vs Morningstar"饱和阈值"+AI民主化
5. **游戏业务剥离是加分还是减分**: 纯SaaS利润率提升 vs 失去第一方游戏训练数据

---

## 附录B: 竞争格局Agent关键发现 (v2.0新增)

### F. 竞争对手实时估值 (2026-02-14)

| 公司 | 代码 | 股价 | 52周高/低 | 市值 | P/E | 净利率 | vs APP |
|------|------|------|----------|------|-----|--------|--------|
| **AppLovin** | APP | $391 | $746/$201 | $132B | 38.9x | 60.8% | — |
| Unity | U | $18.68 | $52/$15 | $8.1B | 亏损 | -21.8% | 已落败, 份额远落后 |
| Trade Desk | TTD | $25.81 | $91/$26 | $12.6B | 29.3x | 16.1% | 不同赛道, CTV重叠 |
| Moloco | 未上市 | — | — | — | — | — | AI原生最大威胁 |
| Digital Turbine | APPS | ~$2 | — | ~$1B | 亏损 | -18.8% | 设备端, 差异化 |

### G. 护城河层级 (竞争格局Agent评估)

| 排序 | 护城河 | 强度 | 风险 |
|------|--------|------|------|
| 1 | **MAX中介层数据垄断** (~60%份额) | 极强 | 监管可能要求开放 |
| 2 | **AXON AI飞轮** (数据→模型→广告主→数据) | 强 | 做空方质疑数据来源合法性 |
| 3 | **转换成本** (SDK嵌入后迁移高) | 中-强 | Unity LevelPlay提供迁移工具 |
| 4 | **规模经济** (87.9%毛利率) | 强 | 电商扩展可能降低混合利润率 |
| 5 | **MAX-AXON捆绑** | 中 | 可能引发反垄断关注 |

### H. 电商扩展实证数据

- **$1B年化运行率** (annualized run rate)
- 客户: Wayfair, Dr. Squatch, Ashley Furniture, 部分客户日预算六位数
- 每周广告支出增长50%
- Axon Ads Manager 2025-10-01上线(邀请制), 计划2026年中GA
- CTV扩展: Wurl收购, 250M流媒体家庭, Q4 2024收入$80M

### I. 最大威胁排序

| 排序 | 威胁 | 概率 | 影响 | 关键时间窗口 |
|------|------|------|------|------------|
| 1 | Meta重返移动游戏广告 | 中-高 | 高 | Q1-Q2 2026 |
| 2 | SEC/监管行动 | 中 | 极高 | 2026年内 |
| 3 | 电商扩展失败 | 中 | 高 | 2026 H2 GA后 |
| 4 | 增长减速(66%→52%→?) | 已发生 | 中-高 | 每季度财报 |
| 5 | Moloco等AI原生竞争 | 低-中 | 中 | 若IPO=加速 |

---

## 附录C: 文献地图Top 10 (v2.0新增, 详见literature_map_phase_neg0.5.md)

| # | 标题 | 来源 | 核心价值 |
|---|------|------|---------|
| 1 | AppLovin: The Apex Predator | Deconstructor of Fun | 垂直整合商业模式全景 |
| 2 | AppLovin Paradox: 82% Margins | Gamemakers | 发行商价值压缩机制 |
| 3 | eCommerce bull and bear | Eric Seufert/MobileDev Memo | 电商扩张最专业分析 |
| 4 | Breaking down short-sellers' claims | Marketing Brew | 做空报告系统性拆解 |
| 5 | (Tiny) Peek Inside Black-Box | AdExchanger | AXON技术首次公开解析 |
| 6 | Q4 2025 Earnings Review | DeepDiveX | 最新财务分析 |
| 7 | Morningstar: FVE $284-$500 | Morningstar | 窄护城河+极高不确定性 |
| 8 | AppLovin craters on Meta threats | Sherwood News | Q4暴跌+AI护城河怀疑论 |
| 9 | Problems at AppLovin | The Bear Cave | 首份做空(广告质量实测) |
| 10 | Muddy Waters Short Report | Muddy Waters | PIGs数据提取指控 |

---

## 附录D: v1.0→v2.0关键调整 (基于5个Agent发现)

| 调整项 | v1.0 | v2.0 | 原因 |
|--------|------|------|------|
| CQ6 | Apps是战略资产还是现金牛? | Apps剥离后纯平台模式的数据影响? | Apps已2025-07以$400M剥离 |
| 商业模式描述 | 双业务模型(Software+Apps) | 纯广告平台(Apps已剥离) | 财务Agent发现 |
| 竞争对手优先级 | 泛指Meta/Google/Unity | Moloco列为#5威胁 + Unity已落败 + TTD间接 | 竞争Agent定量评估 |
| AXON演进 | AXON 2.0 | 增加AXON 3.0 GenAI方向(2026) | 竞争Agent发现 |
| CTV维度 | 未提及 | Wurl收购+250M家庭+$80M收入 | 竞争Agent发现 |
| 文献深度 | 3份做空报告 | 30源完整地图+5个主题聚类+5个分歧区 | 文献Agent产出 |
| 分歧区 | 3条 | 5条(AXON护城河真伪+Apps剥离影响) | 文献Agent交叉验证 |
| 分析师共识 | BofA最高目标价 | BofA $860/Jefferies $760/Goldman $585(中性)/Morningstar $360-500 | 多源验证 |
