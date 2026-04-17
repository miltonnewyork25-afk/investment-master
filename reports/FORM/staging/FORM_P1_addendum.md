# FORM Phase 1 补强 — 周期韧性 + 供应链验证 + Target Model差距 + 预期差

> **日期**: 2026-04-16 | **目的**: 补强P1四个薄弱点
> **CQ覆盖**: CQ1 (ROIC路径初步), CQ5 (target model差距), CQ7 (CapEx减速时滞)

---

## 10. 历史周期韧性: FORM在下行中的表现

### 10.1 两次DRAM下行周期对比

| 维度 | 2019 DRAM下行 | 2022-23 Memory下行 |
|------|-------------|-------------------|
| 年度收入变化 | +11% ($530M→$590M) | **-11.4%** ($748M→$663M) |
| 季度峰谷收入 | 无显著下降 | Q4'21 $205M → Q4'22 $166M (-19%) |
| GM峰谷 | 稳定在40-42% | **Q4'21 43.7% → Q4'22 27.2% (-1,650bps)** |
| 驱动差异 | 5G/节点迁移offset了DRAM弱势 | DRAM+逻辑同时下行, 无对冲 |

[DM-CYCLE-001]

**因果分析**: FORM在2019年"穿越"了DRAM下行, 因为逻辑端节点迁移 (7nm/5nm tape-out) 提供了对冲。但在2022年, DRAM和逻辑同时下行, 暴露了FORM缺乏非周期收入的弱点。

**这对当前估值意味着什么**: 市场把FORM当成"HBM确定性增长", 但2022年的经验说明: 当DRAM周期转向时, FORM没有"穿越"能力——GM可以在3个季度内从44%坍塌到27%。当前42.8% GM (Q4'25) 不是"新常态", 是周期高点附近的读数 [DM-CYCLE-002]。

**反面**: 2025-26年的HBM需求与过去DRAM周期的最大区别是: HBM是由AI CapEx驱动的**结构性**需求, 不是传统DRAM由手机/PC库存周期驱动的**周期性**需求。如果AI CapEx是5-10年的超级周期 (而非2-3年周期), FORM的HBM收入可能比传统DRAM更持久。但这正是需要验证的核心假设, 不是已证明的事实。

### 10.2 探针卡 vs WFE在下行中的Beta

| 2022下行 | 年度跌幅 | 相对表现 |
|---------|---------|---------|
| WFE整体 | -20%+ | 基准 |
| FORM收入 | -11.4% | 低于WFE跌幅 (Beta<1) |
| FORM GM | -1,650bps | 高于WFE利润跌幅 (利润Beta>1) |

[DM-CYCLE-003]

**关键洞察**: 探针卡**收入**的周期Beta<1 (因为节点迁移仍需新卡), 但**利润**的周期Beta>1 (因为利用率下降直接冲击固定成本密集的MEMS制造)。这与KLAC相反——KLAC的收入Beta和利润Beta都<1, 因为检测不可跳过且软件占比高。

FORM的利润结构更像传统半导体设备 (LRCX/AMAT), 不像KLAC。这进一步支持用设备股估值框架 (6-8x EV/Sales) 而非检测股框架 (12-15x EV/Sales)。

---

## 11. 管理层Target Model差距分析

### 11.1 Target Model vs 当前现实

| 指标 | FY2025实际 | Target Model | 差距 | 隐含改善 |
|------|-----------|-------------|------|---------|
| 收入 | $785M | $850M | +$65M (+8.3%) | 年化~4% (2年) |
| Non-GAAP GM | 40.8%* | 47.0% | +6.2pp | 需Farmers Branch + mix改善 |
| Non-GAAP OPM | 13.4%* | 22.0% | +8.6pp | 需OpEx杠杆 + GM改善 |
| Non-GAAP EPS | $1.30* | $2.00 | +54% | 需OPM扩张 + 收入增长 |
| FCF | $14M | $160M | +$146M | 需CapEx正常化 ($30-35M target vs $104M FY25) |

*Non-GAAP数字估算, 基于GAAP调整SBC和其他项目 [DM-TARGET-001]

### 11.2 Target Model的三个隐含假设

**假设1: Farmers Branch按时ramp并达到目标利用率**
- CapEx从FY25的$104M (含Farmers Branch $55M) 降到target model的$30-35M
- 这意味着建设在FY26完成, FY27开始贡献利润
- **风险**: FY26 CapEx指引$140-170M, 远高于target model → target model是post-build稳态, 不是近期 [DM-TARGET-002]

**假设2: DRAM/HBM增长持续且GM改善到47%**
- 需要DRAM GM从当前水平 (低于F&L) 显著改善
- 或F&L恢复增长, 回升高毛利占比
- **现实**: FY25 GAAP GM 39.5%, 与target model的47% non-GAAP差距6.2pp, 其中~2-3pp是SBC/摊销差异, 剩余3-4pp需要real margin improvement [DM-TARGET-003]

**假设3: OpEx保持flat, 收入增长驱动杠杆**
- Target model OPM 22% = GM 47% - OpEx 25%
- FY25 OpEx: R&D $116M + SG&A $127M = $243M (31% of rev)
- 需要OpEx % 从31%降到25% → 收入达到$972M (OpEx不变) 或OpEx降$47M → 与$850M收入目标不匹配 [DM-TARGET-004]
- **这暴露了一个数学问题**: $850M × (47% - 25%) = $187M EBIT, 但OpEx $243M × 75% ≈ $182M... 说明OpEx也必须控制在~$212M以内

### 11.3 Target Model可信度评估

**正面**: 管理层在半导体行业口碑较好; Q4'25的non-GAAP GM 45%已接近target; Analyst Day (5/11) 将提供bridge

**负面**: target model是**post-build稳态**, 不是近期可达状态:
- FY26 CapEx $140-170M vs target $30-35M → FY26肯定不达标
- FY26 pre-production cost $20-25M → FCF继续被压缩
- 最早FY27才可能进入target model状态 — 这意味着投资者在$128股价上买的是**至少18个月后的期权** [DM-TARGET-005]

**FCF正常化测试** (codex-lab框架验证):
- FY25报告FCF: $14M
- 加回Farmers Branch CapEx $55M → 正常化FCF ~$69M
- 正常化FCF margin: 8.8%
- 距target model FCF $160M (margin ~20.4%) 差距: $91M / 11.6pp
- **即使正常化后, 差距仍然巨大** — 不是简单的"加回一次性CapEx"能解释的 [DM-TARGET-006]

---

## 12. 供应链交叉验证 (铁律Q)

### 12.1 上游: 三大HBM客户验证

| 客户 | HBM计划 | 对FORM的含义 | 风险信号 |
|------|---------|-------------|---------|
| **SK Hynix** | HBM4量产2025H2; Yongin投资从128→600万亿韩元; HBM份额62% | **强利好**: 最大客户加速扩产 | 投资规模激进→可能催生supply chain diversification |
| **Samsung** | HBM4延迟到2026 (良率问题); 2026 HBM产能+50% | **中性偏空**: 延迟削弱短期需求 | **TSE以80%低价供应Samsung** → FORM份额风险 |
| **Micron** | FY26 CapEx提至$20B; 2026 HBM全部sold out; HBM4目标Q2'26 | **利好**: 增量客户需求确认 | 无公开探针卡供应商信息 |

[DM-SUPPLY-001]

### 12.2 TSE竞争威胁 — Phase 1新增关键风险

**新发现**: 韩国TSE公司已通过主要存储器厂商的探针卡质量测试, 定价比FormFactor/MJC/JEM**便宜80%** [DM-SUPPLY-002]。

**因果分析**: 如果TSE能在DRAM领域提供80%成本优势且通过认证:
- Samsung可能优先采用本土+低价供应商
- FORM在Samsung的份额可能被侵蚀
- 更重要的是: 这证明MEMS不是DRAM探针卡的唯一技术路径 — 如果TSE用非MEMS方案做到了acceptable performance, FORM的技术壁垒叙事需要重新评估

**缓解因素**: ①TSE可能只能做标准DRAM, 不能做HBM4+ (pin count/精度要求不同层级) ②Samsung的HBM4延迟意味着短期影响有限 ③80%成本差距如果以精度/良率为代价, 客户可能不会大规模切换

**Kill Switch新增**: 如果TSE获得HBM探针卡认证 → FORM的"HBM堡垒"叙事断裂

### 12.3 下游: Hyperscaler CapEx验证

| Hyperscaler | 2025 CapEx | 2026 CapEx | YoY | AI专项 |
|------------|-----------|-----------|-----|--------|
| Amazon | ~$120B | $200B | +67% | ~$150B+ |
| Microsoft | ~$90B | ~$145B | +61% | ~$110B+ |
| Alphabet | ~$100B | $175-185B | +75% | ~$130B+ |
| Meta | ~$65B | $115-135B | +77% | ~$90B+ |
| **合计** | ~$375B | ~$690B | **+84%** | ~$480B+ |

[DM-SUPPLY-003]

**含义**: Hyperscaler CapEx 2026 **零减速信号**, 反而加速。这支撑了HBM需求链: CapEx→AI GPU→HBM→探针卡。但$690B CapEx增速+84%是历史极端水平 — 均值回归的问题不是"是否", 而是"何时"。

**CQ7初步回答**: Hyperscaler CapEx从加速转减速到传导至探针卡需求下降, 中间有**2-3个季度时滞** — 因为芯片设计/生产周期、Fab建设周期、库存缓冲。这意味着即使2027年CapEx放缓, FORM要到2027H2-2028才会感受到需求压力 [DM-SUPPLY-004]。

---

## 13. 预期差识别 (E→R→G→T四步)

### 13.1 Expectation: 市场把FORM当什么?

市场叙事: "HBM消耗品垄断供应商" — AI驱动的结构性增长, 每代HBM升级=更多更贵探针卡, 类似ASML的不可替代性。

市场定价: 12.6x EV/Sales, 57x forward PE, 隐含$850M+收入 + 45%+ GM + 20%+ OPM路径完全兑现。

### 13.2 Reality: 实际情况是什么?

| 市场信念 | 实际情况 | 差距 |
|---------|---------|------|
| "消耗品=高毛利" | GM 39-43%, 工业消耗品水平 | 市场高估盈利能力 |
| "HBM垄断" | Technoprobe追赶逻辑端; TSE 80%低价竞争DRAM | 垄断性被高估 |
| "增长=利润增长" | 收入+18%但EPS-34% (DRAM低毛利mix shift) | 收入增长≠EPS增长 |
| "ROIC会改善" | ROIC 4.9%, 连续5年未达WACC | 改善路径未证明 |
| "Target model近在咫尺" | FY26 CapEx $140-170M, 最早FY27进入target状态 | 至少18月差距 |

### 13.3 Gap: 预期差在哪里?

**最大预期差 (偏空)**: 市场用"科技消耗品"的估值语言为"工业消耗品"定价
- 12.6x EV/Sales是SaaS/科技硬件倍数
- FORM的经济学 (GM 40%, OPM 8.5%, ROIC 4.9%) 是工业设备水平
- 可比公司倍数: LRCX 7.5x / AMAT 6.8x / KLAC 11.5x (KLAC更高因为检测不可跳过+软件)
- 如果FORM应该交易在7-9x EV/Sales → 公允价值$56-$72 → 当前$128高估44-56% [DM-GAP-001]

**次要预期差 (偏空)**: 市场忽视了F&L份额流失的结构性影响
- F&L从$436M→$370M (-15%), 是高毛利段
- Technoprobe TSMC 2nm 30%份额不会逆转
- 高毛利基本盘的萎缩设置了混合GM的天花板

**反方预期差 (偏多, 需Phase 2验证)**:
- 如果Farmers Branch FY27成功ramp → GM→47% + OPM→22% + FCF→$160M → FORM从"工业消耗品"升级为"高利润制造平台"
- 如果HBM4/5 ASP溢价持续 + test intensity翻倍 → DRAM GM可能突破F&L水平 → mix shift从headwind变tailwind
- 这两个条件同时成立的概率: 我们估计~25% (Phase 2需Python建模验证)

### 13.4 Tracking: 跟踪什么指标验证/证伪?

| 指标 | 看多信号 | 看空信号 | 下一个数据点 |
|------|---------|---------|------------|
| GAAP GM | >42%连续2季度 | <38% | Q1 FY26 (4/29) |
| DRAM探针卡收入 | 持续QoQ增长 | QoQ下降 | Q1 FY26 |
| F&L收入 | 恢复增长 (>$95M/季) | <$85M/季 | Q1 FY26 |
| Farmers Branch时间表 | 按计划2026H2 ramp | 延迟到2027+ | Analyst Day (5/11) |
| ROIC | >6% (改善方向) | <4% (恶化) | FY26年报 |
| TSE进入HBM | 不进入 | 获得HBM认证 | 行业新闻 |
| Hyperscaler CapEx | 2027指引不减速 | 2027指引<+20% | Q3'26 earnings |

[DM-GAP-002]

---

## 14. Phase 1补强后的CQ置信度更新

| CQ | 问题 | P0.75 | P1初版 | **P1补强** | 变化原因 |
|----|------|-------|--------|-----------|---------|
| CQ1 | ROIC何时跨WACC | 25% | 25% | **30%** | Target model差距分析→最早FY27, 不是FY26 |
| CQ2 | HBM竞争壁垒 | 35% | 55% | **55%** | TSE威胁部分offset了壁垒评估 |
| CQ3 | F&L份额可逆? | 30% | 30% | **25%** | Technoprobe+TSMC策略→结构性 |
| CQ5 | $128隐含什么 | 40% | 40% | **50%** | Target model post-build稳态, 至少18月 |
| CQ6 | Replacement cycle | 35% | 60% | **60%** | 不变 |
| CQ7 | CapEx减速时滞 | 30% | 30% | **45%** | Hyperscaler零减速+2-3季时滞=近期安全 |
| CQ8 | SK Hynix集中度 | 45% | 50% | **50%** | 不变 |

---

*Phase 1 addendum by AI analyst, 2026-04-16.*
