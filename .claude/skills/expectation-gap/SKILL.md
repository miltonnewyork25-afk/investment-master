---
name: expectation-gap
description: 预期差识别器 v3.0 — 高决策密度机制迁移框架。状态×迁移双层判断+变量四分法+动作绑定+证据审计。7种PEP模式+行业框架+强制知识前置。
trigger: /expectation-gap
---

# 预期差识别器 v3.0 (Expectation Gap Detector)

> **v3.0核心升级**: 从"识别预期差"升级为"高决策密度机制迁移"框架。
> **核心变化**: (1)状态与迁移显式分离 (2)变量四分法(可控/约束/迁移/校验) (3)"不行动"成为合法输出 (4)证据绑定到具体判断 (5)置信度4层(事实/推断/假设/未知)
> **元原则**: 用最少结构，做最强判断；未知不补，强弱分明。
> **产出**: 预期差分析卡(YAML) + 动作判断 + 触发/退出/失效条件

---

## 触发条件

| 场景 | 触发 | 产出深度 |
|------|------|---------|
| **Tier 1 快速扫描** | `/expectation-gap {TICKER}` 或 快速扫描中 | 精简版(Step 0 + E+R+G一句话+3个信号) |
| **Tier 2 标准分析** | Phase 1完成后自动 | 完整版(全量Step 0-4 + YAML卡) |
| **Tier 3 深度调研** | Phase 1 Ch1 Reverse DCF完成后 | 深度版(全量+跨公司对标+历史回溯) |
| **批量筛选** | `/expectation-gap batch [TICKER1,TICKER2,...]` | 精简版×N + 排序 |

---

## ★ Step 0: 问题类型闸门 + 知识前置 (v3.0升级)

> **v3.0核心**: 先判断问题类型,再定义动作空间,最后加载知识。不是所有公司都适合同一套分析压缩。

**Step 0必须在Step 1之前完成。不执行Step 0 = 不允许进入Step 1。**

### 0.0 问题类型闸门 (v3.0新增, BLOCK级)

```
在做任何事之前,先回答三个问题:

Q1: 这是状态判断还是迁移判断?
  状态: "这家公司现在估值合理吗?" → 侧重E域vs R域的当前快照
  迁移: "这家公司的趋势在变好还是变差?" → 侧重方向和速度
  通常两者都需要 → 但必须在输出中显式分开

Q2: 核心变量适合被2-4个主轴压缩吗?
  是 → 构建状态层+迁移层双主框架
  否 → 不强行压缩,用更多独立判断(但每个判断仍需动作绑定)

Q3: 合法动作空间是什么?
  必须先定义,再开始分析(决策先于分析):
    ☐ 深挖(值得投入更多研究资源)
    ☐ 观察(有信号但不足以判断)
    ☐ 等待验证(有方向但需要数据确认)
    ☐ 等待拐点(方向对但时机不对)
    ☐ 当前可行动(预期差清晰+证据充分)
    ☐ 必须打折(有预期差但有不可对冲的风险)
    ☐ 排除(不适合进一步分析)
    ☐ 不行动(证据不足以支持任何方向性判断) ← v3.0新增合法输出
```

### 0.1 加载模式库 (必做)

```
读取: knowledge/expectation_gap_patterns.yaml
提取:
  - 已发现的5种定价错误模式(PEP-001~005)的检测规则
  - 目标公司所在行业的专用检查清单(如saas/semiconductor/consumer)
  - 同行业已完成的分析卡列表(用于Step 3横向对比)
```

### 0.2 叙事适用性预检 (必做 — PEP-001检测)

```
在获取任何财务数据之前,先回答:
  Q1: 当前行业最大的恐惧叙事是什么? (例: "AI杀SaaS seats")
  Q2: 这个叙事适用于目标公司吗?
      → 公司的护城河类型是什么?
        a) 监管/物理约束型 → 叙事可能不适用 (INTU/PTC先例)
        b) 数据/切换成本型 → 叙事部分适用 (WDAY/CRM先例)
        c) 创意/工作流型  → 叙事可能适用 (ADBE/NOW先例)
      → 如果回答(a),在整个分析中标注"叙事错误归因风险"

  输出: narrative_applicability = fully_applicable / partially_applicable / misattributed
```

### 0.3 加载同行业已完成卡片 (Tier 2+必做)

```
从patterns库的completed_cards中:
  - 找出同行业的已完成分析卡
  - 提取关键对比指标(P/FCF / 回购覆盖 / OPM方向)
  - 作为Step 3横向对比的基准数据

如果同行业有横向报告:
  - 读取报告的核心结论
  - 作为本次分析的"行业上下文"
```

### 0.4 输出启动简报 (在分析开始前向用户展示)

```
启动简报格式:
  公司: {TICKER} | 行业: {INDUSTRY}
  行业叙事适用性: fully/partially/misattributed
  同行业已完成: X张卡片 (列出ticker)
  将检测的模式: PEP-001~005中哪些可能相关
  行业专用检查: 加载了哪些行业特定指标
```

---

## 核心流程: E→R→G→T 四步 (v2.0: 每步增加行业+聪明钱维度)

### Step 1: E域 — 提炼市场预期 (Expectations)

**目标**: 回答"当前价格要求市场相信什么？"

**1.1 价格隐含预期 (必做)**

```
数据获取:
  fmp_data endpoint="quote" symbol={TICKER}
  fmp_data endpoint="income" symbol={TICKER} limit=4 period="annual"
  fmp_data endpoint="dcf" symbol={TICKER}
  fmp_data endpoint="ratios" symbol={TICKER} limit=4

Reverse DCF反推:
  输入: 当前股价P, 当前FCF, WACC估计
  反推: 市场隐含FCF CAGR
  输出: 隐含增速 / 隐含终端利润率 / 隐含高增长持续年限

SaaS公司强制增加:
  - P/FCF (比P/E更有意义, 因SBC使GAAP NI失真)
  - Owner PE = 市值 / (NI - SBC + 净回购) ← v2.0新增
  - SBC覆盖率 = 回购 / SBC ← v2.0新增
```

**1.2 共识预期**

```
数据获取:
  fmp_data endpoint="analyst-estimates" symbol={TICKER}
  fmp_data endpoint="rating" symbol={TICKER}
  baggers_summary symbol={TICKER}

提取:
  - 一致预期EPS/收入(当年+次年)
  - 分析师目标价范围 + 分歧度(>50%=高不确定性)
  - 评级分布 + 近期修正方向
```

**1.3 主叙事提取 (Tier 2+)**

```
2路WebSearch:
  "{TICKER} bull case bear case {YEAR}"
  "{TICKER} analyst upgrade downgrade recent"
```

**★ 1.4 聪明钱定位 (v2.0新增)**

> **为什么加**: 知名投资者的仓位变化反映的不是"情绪"——而是"在你看不到的地方做过调研后得出的结论"。RenTech建仓NOW $204M时，普通投资者只看到-51%的恐慌。

```
数据获取:
  fmp_data path="/api/v4/institutional-ownership/institutional-holders/symbol-ownership-percent?symbol={TICKER}&date={最近季度末}"
  fmp_data endpoint="insider-trading" symbol={TICKER} limit=10

  2路WebSearch:
    "{TICKER} 13F institutional ownership changes {YEAR}"
    "{TICKER} hedge fund buying selling {YEAR}"

提取:
  - 机构持股比例变化(增/减/稳)
  - 知名投资者仓位变化(建仓/加仓/减仓/清仓) + 他们的公开理由
  - 内部人行为模式: 是否有买入(极罕见=强信号) / 卖出是计划性还是加速
  - 公司回购行为: 金额 / SBC覆盖率 / 趋势(加速/减速)
  - 聪明钱分化信号: 量化基金vs宏观基金vs专业基金的行为是否分裂

评估框架:
  信号强度排序:
    1. CEO/CFO公开市场买入 > $500K     → 最强正面(极罕见)
    2. 知名逆向投资者大额建仓           → 强正面
    3. 公司回购加速(>SBC 150%)          → 中等正面(管理层用行动投票)
    4. 量化基金建仓                     → 弱正面(可能是因子驱动非基本面判断)
    5. 零内部人买入+持续卖出             → 中等负面
    6. 知名投资者清仓+公开看空           → 强负面
    7. 创始人加速卖出                   → 需分辨(遗产规划 vs 信号)
```

**E域输出**:
```yaml
expectations:
  price_implied:
    implied_fcf_cagr: "X%"
    implied_terminal_margin: "X%"
    p_fcf: "Xx"               # v2.0: 替代P/E作为SaaS主估值锚
    owner_pe_adjusted: "Xx"    # v2.0: (NI-SBC+回购)调整后
    judgment: "conservative/reasonable/aggressive/extreme"
  consensus:
    eps_next_fy: "$X.XX"
    target_price_range: "$XXX - $XXX"
    dispersion: "X%"
    rating_distribution: "X buy / X hold / X sell"
    revision_direction: "up/down/mixed"
  dominant_narrative: ""
  market_most_confident_about: ""
  market_most_uncertain_about: ""

  # v2.0新增
  smart_money:
    institutional_ownership_trend: "increasing/stable/decreasing"
    notable_positions:
      - investor: ""
        action: "initiated/increased/decreased/exited"
        size: ""
        thesis: ""  # 如果有公开理由
    insider_behavior: ""  # 零买入/计划性卖出/加速卖出/有买入
    company_buyback:
      amount: ""
      sbc_coverage: "X%"  # 回购/SBC
      share_count_change: "X%/yr"
    smart_money_signal: "bullish/neutral/bearish/divergent"
    signal_reasoning: ""
```

---

### Step 2: R域 — 检查现实 (Reality) — v2.0: 公司+行业双层

**目标**: 回答"企业和行业的真实趋势在变好还是变差？"

**2.1 财务趋势诊断 (保留v1.0)**

```
数据获取:
  fmp_data endpoint="income" symbol={TICKER} limit=8 period="quarterly"
  fmp_data endpoint="cash-flow" symbol={TICKER} limit=4 period="annual"
  fmp_data endpoint="balance-sheet" symbol={TICKER} limit=4 period="annual"

计算:
  收入增速轨迹 / 利润率轨迹 / 现金流质量 / 资本效率
  SaaS强制增加: SBC/Rev趋势 + SBC覆盖率 + Owner PE
```

**2.2 趋势状态标签 (保留v1.0)**

```
六类: accelerating / decelerating / stable / inflecting_up / inflecting_down / deteriorating
```

**★ 2.3 行业趋势现实 (v2.0新增 — 核心升级)**

> **为什么加**: NOW/DDOG/WDAY的财报都"还行"，但股价-25%~-54%。纯看财报会得出"市场过度悲观"的结论。但如果你看到"70%的软件预算正在流向AI公司"，你会意识到悲观可能是"提前定价结构性转移"而非"情绪过度反应"。只有同时看财报+行业趋势，才能分辨"过度悲观"和"提前正确"。

```
3路WebSearch:
  "{行业} structural trend {YEAR} spending forecast"
  "{行业} disruption threat opportunity {YEAR}"
  "{行业} customer behavior change adoption rate"

提取(结构化为三层):

Layer 1: 行业总量趋势 (蛋糕在变大还是变小?)
  - 行业总支出/TAM是增长还是萎缩? (Gartner/IDC/Forrester预测)
  - 增长来自哪里? (新客户/新地区/新用例/价格提升)
  - 总量趋势的不可逆性: 1-5分 (5=不可能逆转)

Layer 2: 结构转移趋势 (蛋糕的分配在变吗?)
  - 预算/份额是否在从现有玩家流向新玩家?
  - 定价模型是否在变化? (per-seat→usage-based→outcome-based)
  - 技术范式是否在变? (本地→云→AI-native)
  - 结构转移的速度: 已发生%/年化变化率

Layer 3: 竞争格局变化 (谁在赢谁在输?)
  - 新进入者是否构成真实威胁? (有收入 vs 仅有融资)
  - 客户转换是否真的在发生? (案例/数据 vs 仅有叙事)
  - 该公司在行业转变中的位置: 受益者/中性/受损者

关键判断: 区分"已发生的事实"和"可能发生的叙事"
  ✅ 事实: "40%的SaaS合同已包含outcome-based定价" (Gartner数据)
  ⚠️ 推断: "per-seat模型将在2028年过时" (Gartner预测)
  ❌ 叙事: "AI agents不买seats" (标题, 缺乏量化证据)
```

**★ 2.4 趋势不可逆性评估 (v2.0新增)**

> **为什么加**: 不是所有"趋势"都是真趋势。有些是短期情绪，有些是不可逆的结构变化。区分两者是预期差判断的关键——如果趋势不可逆，市场可能是"提前正确"而非"过度悲观"。

```
对R域识别的每个重要趋势，打分:

| 趋势 | 不可逆性(1-5) | 速度(慢/中/快) | 证据等级 | 价格是否已反映? |
|------|:----------:|:----------:|:------:|:----------:|
| [趋势1] | X | 慢/中/快 | 事实/推断/叙事 | 是/部分/否 |

不可逆性评分标准:
  5 = 技术代际跳跃(互联网替代传真) — 不可能回头
  4 = 经济结构变化(云替代本地) — 极难回头
  3 = 商业模式演化(订阅替代买断) — 可能回头但成本高
  2 = 周期性偏好(增长vs价值轮动) — 会来回切换
  1 = 短期情绪/恐慌(单事件触发的抛售) — 通常6-12月内修复
```

**R域输出 (v2.0)**:
```yaml
reality:
  # R1: 公司层面 (保留v1.0)
  company:
    overall_trend: ""
    trend_confidence: ""
    key_variables: [...]
    quality_signals: {...}

  # R2: 行业层面 (v2.0新增)
  industry:
    total_market_trend: ""          # growing X% / stable / shrinking
    total_market_source: ""         # Gartner/IDC等
    structural_shifts:
      - shift: ""                   # 描述结构性变化
        evidence_grade: ""          # fact/inference/narrative
        irreversibility: 0          # 1-5
        speed: ""                   # slow/medium/fast
        company_position: ""        # beneficiary/neutral/victim
    budget_flow_direction: ""       # 预算从哪流向哪
    competitive_threat_reality: ""  # 竞争威胁是实际的还是叙事的
    key_fact: ""                    # 行业层面最关键的一个事实

  # R3: 趋势-价格背离 (v2.0新增)
  trend_price_divergence:
    exists: true/false
    description: ""                # 例: "行业支出+14.7%但板块-25%"
    possible_explanations:
      - ""                         # 市场在提前定价结构转移
      - ""                         # 市场情绪过度反应
    most_likely: ""                # 哪个解释最可能
```

---

### Step 3: G域 — 状态×迁移双层判断 (v3.0重构)

**目标**: 不只回答"市场错在哪"，还要回答"现在在哪→往哪走→所以该做什么"

**★ 3.1 状态层: 现在在哪 (v3.0新增)**

```
状态判断回答三个问题:
  Q1: 当前估值相对于当前基本面是偏高/偏低/合理?
  Q2: 当前基本面的结构强度如何? (护城河/定价权/FCF质量)
  Q3: 市场当前定价了什么假设? (Reverse DCF隐含)

状态层的变量必须是"现在可观测的事实":
  - 当前P/FCF vs 同行 (事实)
  - 当前OPM/FCF margin (事实)
  - 当前SBC覆盖率 (事实)
  - 当前PE vs 历史区间 (事实)

状态判断分(1-5): 基于事实级证据打分
```

**★ 3.2 迁移层: 往哪走 (v3.0新增)**

```
迁移判断回答三个问题:
  Q1: 关键变量的方向是改善还是恶化? (趋势)
  Q2: 什么在驱动迁移? (因果机制)
  Q3: 迁移速度是加速还是减速? (二阶导)

迁移层的变量分为四类(变量四分法):

  可控变量: 公司自身能改变的
    例: 回购加速/AI产品投资/定价策略/成本削减
    标注: [可控]

  约束变量: 公司无法改变的外部因素
    例: WFE周期/AI CapEx/地缘政治/行业监管/竞争格局
    标注: [约束]

  迁移变量: 推动从当前状态移向新状态的关键变量
    例: NRR拐点/FCF margin扩张/定价模型转型/新客户获取
    标注: [迁移]

  校验变量: 不改变动作但用于验证判断的指标
    例: 季度财报beat/miss/分析师修正/股价反应
    标注: [校验] — 禁止冒充主驱动变量

迁移判断分(1-5): 事实+推断混合,必须标注每个判断的证据层级
```

**★ 3.3 偏差类型 (v3.0: 从5类升级为6类)**

```
六种合法输出:
  1. underpriced_improvement — 状态偏低+迁移改善
  2. overpriced_optimism — 状态偏高+迁移恶化或不支持估值
  3. excessive_pessimism — 状态极度偏低+迁移未恶化(恐惧>现实)
  4. excessive_optimism — 状态偏高+迁移已反映(好消息已定价)
  5. no_significant_gap — 状态≈合理+迁移中性
  6. insufficient_evidence — 证据不足以判断方向 → 合法"不行动"输出 ← v3.0新增

★ insufficient_evidence不是分析失败——是诚实的认知边界声明
  当状态判断和迁移判断方向矛盾,或核心变量属于"未知"级别时,
  输出insufficient_evidence比强行给方向更有价值
```

**3.4 PEP模式检测 (保留v2.1, 扩展至PEP-001~007)**

```
对照patterns.yaml逐一检查PEP-001~007,输出matched_patterns列表
```

**★ 3.5 动作绑定 (v3.0新增, BLOCK级)**

> **核心**: 每个判断都必须绑定到具体动作。没有动作绑定的判断 = 空谈。

```
必须输出:

  当前最优动作: (从Step 0.0定义的动作空间中选择)
    深挖 / 观察 / 等待验证 / 等待拐点 / 当前可行动 / 必须打折 / 排除 / 不行动

  触发条件: 什么会让动作升级(从"观察"→"行动")
    例: "如果Q1 cRPO>20%+Agentforce ARR>$2B → 从'等待验证'升级为'当前可行动'"

  退出条件: 什么会让动作降级(从"行动"→"排除")
    例: "如果GRR连续2Q<96% → 从'等待验证'降级为'排除'"

  失效条件: 什么会推翻整个判断框架
    例: "如果Gartner软件支出增速<5% → 整个SaaS excessive_pessimism判断失效"
```

**3.6 同叙事跨公司对比 (保留v2.0)**

> **核心教训**: NOW/DDOG/WDAY面对同一个"AI杀SaaS"叙事，但P/FCF从12x到44x。市场在一刀切de-rating时犯了"不区分公司质量"的错误。

```
当分析的公司面对一个行业级叙事(如"AI颠覆SaaS")时，必须执行:

1. 找出面对同一叙事的2-3家可比公司
2. 对比关键估值和质量指标:
   | 公司 | P/FCF | FCF增速 | SBC覆盖率 | OPM方向 | Owner PE |
3. 问: "市场给了这些公司相似的de-rating，但它们的基本面质量一样吗？"
4. 如果不一样 → 找出被过度惩罚的那个 → 这就是同叙事内的预期差

产出: same_narrative_comparison 字段
```

**G域输出 (v2.0)**:
```yaml
gap:
  type: ""
  composite_score: 0
  scoring:
    direction_clarity: 0
    magnitude: 0
    persistence: 0
    verifiability: 0
    industry_trend_support: 0     # v2.0
    smart_money_alignment: 0      # v2.0
  core_mispriced_variables: [...]
  one_sentence_judgment: ""

  # v2.0新增
  same_narrative_comparison:
    narrative: ""                 # 共同面对的行业叙事
    peers: [...]                  # 可比公司列表
    most_mispriced: ""            # 同叙事中被过度惩罚的公司
    reasoning: ""
```

---

### Step 4: T域 — 拐点信号与证伪 (Triggers) — v2.0: 增加行业+聪明钱信号

**4.1 领先指标 (v2.0: 三层)**

```
Layer 1: 公司级信号 (保留v1.0)
  - 订单/管线/NRR/定价信号/管理层行为

Layer 2: 行业级信号 (v2.0新增)
  - 行业总支出增速变化 (Gartner/IDC季度更新)
  - 竞争对手财报中的可比指标
  - 客户行为调研 (CIO survey/IT spending survey)
  - 定价模型转型速度 (outcome-based合同占比)
  - 新进入者的实际客户牵引 (有收入vs仅有融资)

Layer 3: 聪明钱信号 (v2.0新增)
  - 13F季度更新: 知名投资者仓位变化
  - 内部人买入出现 (极罕见=极强信号)
  - 回购节奏变化 (加速=管理层认为便宜)
  - 空头仓位变化 (short interest变化)
  - 板块资金流向 (ETF flows: IGV/WCLD等)
```

**4.2 确认指标 + 4.3 证伪条件 (保留v1.0)**

**★ 4.4 趋势反转信号 (v2.0新增)**

> **核心**: 如果你的判断是"市场过度悲观"(因为行业趋势支持)，那你最需要监控的不是下季财报——而是"行业趋势本身是否在改变"。

```
必须回答:
  "如果行业趋势本身发生了什么变化，会让我的判断从'过度悲观'变成'市场是对的'？"

例(SaaS行业):
  - 如果企业软件总支出增速从+14.7%降至<5% → 不是情绪过度反应,是需求真的在萎缩
  - 如果per-seat→outcome转型速度从渐进变为骤变(>60%合同转型) → 收入模型真的在断裂
  - 如果AI-native竞品开始获得F500客户规模级合同 → 竞争威胁从叙事变成现实
```

---

## 最终输出: 预期差分析卡 v2.0

**完整输出文件**: `reports/{TICKER}/data/expectation_gap_card.yaml`

```yaml
# 预期差分析卡 v2.0
meta:
  ticker: ""
  analysis_date: ""
  stock_price: ""
  market_cap: ""
  framework_version: "v2.0"

core_judgment: ""
gap_type: ""
confidence: ""
confidence_reasoning: ""

expectations: { ... }        # 含smart_money子域
reality: { ... }             # 含industry + trend_price_divergence子域
gap: { ... }                 # 含same_narrative_comparison子域
triggers: { ... }            # 含行业级+聪明钱级信号

next_actions:
  deep_dive_worthy: true/false
  priority_research: []
  revisit_trigger: ""
```

---

## v3.0质量门控

| 检查项 | 要求 | 严重度 |
|--------|------|--------|
| **Step 0问题类型闸门** | **问题类型已判断+动作空间已定义** | **BLOCK** |
| **Step 0知识前置** | **patterns.yaml已读取+叙事适用性已预检** | **BLOCK** |
| E域有价格隐含预期 | Reverse DCF + P/FCF(或行业适用估值锚) | BLOCK |
| E域有聪明钱定位 | ≥1个机构/内部人信号 | BLOCK(Tier 2+) |
| R域有行业趋势 | ≥1个行业级数据 | BLOCK(Tier 2+) |
| **G域状态/迁移显式分离** | **状态判断分+迁移判断分分开输出** | **BLOCK** |
| **G域变量四分法** | **每个核心变量标注[可控/约束/迁移/校验]** | **BLOCK(Tier 2+)** |
| **G域动作绑定** | **当前动作+触发条件+退出条件+失效条件全填** | **BLOCK** |
| G域有PEP模式检测 | PEP-001~007逐一检查 | BLOCK(Tier 2+) |
| G域有同叙事对比 | ≥2家可比公司 | BLOCK(Tier 2+) |
| T域有行业级领先指标 | ≥1个行业信号 | WARN |
| T域有趋势反转条件 | ≥1个"行业趋势变化→判断翻转"条件 | BLOCK |
| **置信度4层标注** | **每个判断标注: 事实/推断/假设/未知** | **BLOCK** |
| **禁止弱证据强表达** | **假设级证据不得用确定性语气表述** | **BLOCK** |
| **"不行动"是合法输出** | **insufficient_evidence时不强行给方向** | **BLOCK** |
| 分析完成后更新patterns.yaml | 新卡片+新模式 | BLOCK |

## SaaS行业专用检查 (v2.0)

当分析SaaS公司时，额外强制:

| 检查项 | 要求 |
|--------|------|
| P/FCF替代P/E作为主估值锚 | GAAP PE对SaaS几乎无意义 |
| Owner PE(含回购调整) | = 市值 / (NI - SBC + 净回购) |
| SBC覆盖率 | 回购/SBC, >150%=正面, <50%=负面 |
| 股本变化 | 年化, 负=回购>稀释(罕见), 正=净稀释 |
| 同叙事P/FCF对比 | 面对同一AI叙事的可比公司P/FCF排序 |
| cRPO增速(如可得) | 收入领先指标 |
| NRR间接推算(如NRR不公开) | (收入增速-新客贡献)=存量扩展率 |

---

## 与现有框架的集成点

| 现有组件 | 如何集成 |
|---------|---------|
| **OVM-2 Reverse DCF** | E域 price_implied |
| **假设审计 M1/M2** | E域隐含信念+共识解构 |
| **Digest Card** | G域输出补充到signal_hierarchy |
| **财务分析v2.0** | R域公司层面诊断 |
| **红队套件 RT-1** | G域core_mispriced_variables → RT-1审查 |
| **市场辩论扫描器** | E域主叙事提取 |
| **竞争对标skill** | G域同叙事对比 |

## 迭代与学习机制

每次使用后积累训练数据:

1. **事后验证**: 3-6月后回查 — 判断是否正确
2. **模式沉淀**: 成功/失败案例 → `knowledge/expectation_gap_patterns.yaml`
3. **信号校准**: 哪些领先指标真的领先了 → 更新权重
4. **行业模板**: 不同行业的典型预期差模式 → 行业插件
5. **聪明钱校准**: 哪些投资者的13F信号最有预测力 → 投资者权重

---

---

## ★ 范式转移检测模块 (v2.0新增 — 可泛化至所有行业)

> **核心**: 最大的预期差不来自"公司比市场想的好一点"——而来自"整个行业的游戏规则在变，但市场还在用旧规则定价"。
> **来源**: Dalio范式转移理论 + Soros反身性 + Adobe/Salesforce历史 + SaaS 2026板块实证
> **可泛化**: 本模块的5个信号适用于任何行业，不限于SaaS

### P1: 范式转移五信号检测

对目标公司所在行业，逐一检查以下5个信号。≥3个触发 = 范式转移可能正在发生。

```
信号1: 定价单元变化 (Pricing Unit Shift)
  问: 行业的价值度量单位是否在改变？
  SaaS例: per-seat → per-token/per-outcome (已发生, 40%合同转型)
  半导体例: per-wafer → per-transistor → per-AI-operation?
  监控: 行业报告中新定价术语的出现频率 + 领头公司定价模型变化

  状态: [ ] 未触发  [ ] 早期(1-2家领头公司实验)  [ ] 中期(行业15-40%转型)  [ ] 晚期(>40%不可逆)

信号2: 新术语密度 (New Vocabulary Density)
  问: 行业是否在发明新语言？
  SaaS例: "agentic workflows" / "consumption credits" / "AI Control Tower" — 2年前不存在
  监控: 10-K/earnings call中新术语首次出现数量 vs 2年前

  状态: [ ] 低(<3个新术语/年)  [ ] 中(3-8个)  [ ] 高(>8个=语言在快速演化)

信号3: 投资/TAM比率突破 (Investment Intensity Breakthrough)
  问: 对新范式的投资是否超过行业TAM的1-2%？
  SaaS例: $470B+ AI基础设施投资 vs $1.4T软件TAM = 33% — 远超阈值
  监控: 行业CapEx/R&D总额 vs TAM → >2%=S曲线即将拐点

  状态: [ ] 低(<1%)  [ ] 临界(1-2%)  [ ] 突破(>2%=拐点可能)  [ ] 爆发(>10%)

信号4: 渗透率位置 (Adoption Penetration Position)
  问: 新范式当前处于S曲线的哪个位置？
  关键阈值:
    <10% = 早期投机(高不确定性, 低可投资性)
    10-25% = 拐点区(增长加速+投资可行=最佳投资窗口) ★
    25-50% = 主流化(自我加速但共识已形成)
    >50% = 晚期(alpha消失, 定价正确)
  SaaS例: outcome-based定价40%渗透 = 正在穿越拐点区→主流化
  监控: 季度渗透率数据(不是年度!)

  状态: [ ] <10%  [ ] 10-25%★  [ ] 25-50%  [ ] >50%

信号5: 反身性回路检测 (Reflexivity Loop — Soros)
  问: 是否形成了"采用→投资→加速采用"的自强化循环？
  SaaS例: AI采用→更多AI基础设施投资→更多AI工具→更多AI采用 (✅正在发生)
  反向检查: 循环是否有可能被打断？(监管/技术瓶颈/资金链断裂)
  监控: 行业投资增速 vs 行业采用增速是否同时加速

  状态: [ ] 无回路  [ ] 弱回路(可能被打断)  [ ] 强回路(自我强化中)  [ ] 泡沫化(过热)
```

### P2: 范式转移中的公司定位评估

```
该公司在范式转移中的角色:

  自我颠覆者 (Self-Disruptor) — 主动转型,短期阵痛但长期重估
    历史参考: Adobe 2012-2015 (收入-35%后股价3x)
    信号: 主动改变定价模型 / 投资新范式 / 接受短期收入冲击
    投资含义: 在转型低谷买入 → 最大预期差来源

  适应者 (Adapter) — 被动跟进,部分整合新范式
    历史参考: 大多数SaaS公司当前状态
    信号: 在旧模型上叠加新功能 / 混合定价 / "两条腿走路"
    投资含义: 中等预期差, 关键看适应速度 vs 市场定价的适应预期

  抵抗者 (Resister) — 坚守旧模型,最终被颠覆
    历史参考: Siebel(被Oracle收购), Blockbuster(破产)
    信号: 高管否认变化 / 投资者关系强调"旧模式优势" / 未投资新范式
    投资含义: 做空候选 或 避开

  颠覆者 (Disruptor) — 新范式的主要受益者
    历史参考: Salesforce 2004-2010, Netflix 2007-2013
    信号: 收入高速增长+客户从旧玩家迁移+定义新品类
    投资含义: 高估值可能合理, 但需分辨"真颠覆者"vs"叙事泡沫"
```

### P3: 范式转移定价错误的典型模式

```
模式A: "按旧规则给新世界定价"
  市场用旧行业的历史PE/PS对新范式公司定价 → 低估颠覆者
  例: 2004年Salesforce IPO时被传统软件PE框架低估

模式B: "把转型阵痛当成永久衰退"  ← 当前SaaS板块最可能的错误
  市场看到增速放缓+定价模型变化 → 定价"永久衰退"
  但: 历史上转型公司的收入低谷持续2-3年后反弹(Adobe先例)
  判断关键: 公司是否主动投资新范式?(是→阵痛; 否→真衰退)

模式C: "忽视结构转移只看估值"
  市场看到P/E从40x降到20x → "便宜了"
  但: 如果行业利润池正在从旧模式流向新模式 → 旧模式公司的E会持续下降
  判断关键: 利润池是否在转移?(是→估值陷阱; 否→真低估)

模式D: "时间套利盲区"
  市场正确识别了趋势但错估了速度 (通常低估2-3x)
  Druckenmiller法: 当趋势被共识认可但定价为"10年过程"时,
  如果实际只需3-5年 → 重估窗口=5-7年的误判×趋势幅度
```

### P4: 行业横向模板 (可复制到其他行业)

```
本模块设计为可泛化。对任何行业:

1. 识别当前范式: 该行业的核心定价单元/商业模式/价值链是什么?
2. 扫描五信号: 定价单元变化 + 新术语 + 投资强度 + 渗透率 + 反身性
3. 定位公司角色: 自我颠覆者 / 适应者 / 抵抗者 / 颠覆者
4. 匹配定价错误模式: A/B/C/D中哪个最可能?
5. 输出: paradigm_shift部分写入预期差分析卡

行业适配示例:
  半导体: CPU→GPU→AI ASIC范式转移 (渗透率~15-20%, 拐点区★)
  汽车: ICE→EV→自动驾驶 (EV渗透~25%, 进入主流化)
  金融: 人工→算法→AI决策 (<10%, 早期)
  零售: 实体→电商→社交电商 (电商25%+, 社交电商<10%)
```

---

*预期差识别器 v2.0 — 财务×行业趋势×聪明钱×范式转移四维信号叠加*
*v1.0→v2.0升级源自: NOW/DDOG/WDAY三家SaaS测试+SaaS行业结构性研究+范式转移理论整合*
