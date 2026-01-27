# Macro Liquidity Regime Analysis v1.0

## Skill Metadata
- **Name**: macro-liquidity-regime
- **Version**: 1.0
- **Category**: macro_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27

---

## Purpose

用"宏观流动性/资金压力 → 风险定价 → 仓位与情绪 → Smart/Dumb Money → 实体经济"一体化框架，识别当前市场处于：

| Regime | 定义 | 典型特征 |
|--------|------|---------|
| **Expansion** | 流动性扩张 | Risk-on，信用利差收窄，风险资产上涨 |
| **Tightening** | 流动性收缩 | Risk-off，资金压力上升，避险情绪主导 |
| **Transition** | 拐点过渡 | 信号分歧，方向不明，波动率上升 |

**核心价值**：将分散指标组织成"可执行监控面板 + 结论可被推翻"的研究工件。

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 宏观环境判断 | 判断风险资产整体环境（美股/信用/加密/大宗）与"流动性主线" |
| 资产配置决策 | 跨资产配置的宏观背景分析 |
| 风险预警 | 识别系统性风险累积与拐点信号 |
| 研究工件输出 | 需要可监控、可证伪的宏观分析框架 |

## When NOT to Use

| 不适用场景 | 替代方案 |
|-----------|---------|
| 公司微观基本面/财务法证 | 使用forensic-financial-analysis |
| 单一指标快速查看 | 直接查数据源 |
| 高频交易决策 | 本skill为中低频框架（周/月级） |
| 精确点位预测 | 本skill只给方向和区间 |

---

## Theoretical Foundation

### 核心理论框架

| 理论 | 作者/来源 | 核心观点 | 应用 |
|------|----------|---------|------|
| **流动性金字塔** | Perry Mehrling (2012) | 货币层级：央行储备→银行存款→影子货币→资产 | 理解流动性传导路径 |
| **金融周期理论** | Borio (2014, BIS) | 金融周期长于商业周期，信贷/资产价格是核心 | 识别周期位置 |
| **Risk-on/off范式** | Adrian & Shin (2010) | VaR约束下，波动率驱动杠杆调整 | 理解风险资产联动 |
| **美元微笑曲线** | Stephen Jen (Morgan Stanley) | 美元在极端风险偏好(高/低)时走强 | DXY与风险资产关系 |
| **反身性** | George Soros (1987) | 价格与基本面相互影响 | 流动性螺旋机制 |
| **Minsky时刻** | Hyman Minsky | 稳定孕育不稳定，杠杆周期 | 顶部风险识别 |

### 关键文献
- Mehrling, P. (2012). "The New Lombard Street: How the Fed Became the Dealer of Last Resort"
- Adrian, T. & Shin, H.S. (2010). "Liquidity and Leverage", Journal of Financial Intermediation
- Borio, C. (2014). "The Financial Cycle and Macroeconomics: What Have We Learnt?", BIS Working Papers

---

## Inputs

### 时间范围
| 参数 | 默认值 | 可调范围 |
|------|--------|---------|
| 历史回溯 | 2年 | 1-5年 |
| 高频观察窗口 | 8周 | 4-12周 |
| 分位数计算窗口 | 5年 | 3-10年 |

### 区域覆盖
| 优先级 | 区域 | 说明 |
|--------|------|------|
| Primary | US | 全球流动性锚点 |
| Secondary | EU/UK | 欧央行、英央行政策联动 |
| Optional | HK/CN/EM | 新兴市场传导 |

### 资产覆盖
| 类别 | 标的 |
|------|------|
| 股票 | SPX, QQQ, IWM, VIX |
| 固收 | UST曲线, HY OAS, IG OAS |
| 外汇 | DXY, EUR/USD, USD/JPY |
| 加密 | BTC, ETH, BTC.D |
| 大宗 | 黄金, 原油, 铜 |

### 数据源分层

| 层级 | 数据源 | 可得性 | 用途 |
|------|--------|--------|------|
| **Tier 1 (官方)** | FRED, Fed H.4.1, NY Fed, Treasury | 免费 | 核心指标 |
| **Tier 2 (交易所)** | CME, CBOE, ICE | 部分免费 | 持仓/波动率 |
| **Tier 3 (付费)** | Bloomberg, SentimentTrader, OptionMetrics | 付费 | 深度情绪 |
| **Tier 4 (替代)** | TradingView, CryptoQuant | 免费/付费 | 补充验证 |

**数据质量要求**：核心结论必须有≥2个Tier 1或Tier 2数据源支撑。

---

## Indicator Architecture

### 指标时序分类

```
┌─────────────────────────────────────────────────────────────────────┐
│                     指标领先-同步-滞后分类                            │
├─────────────────────────────────────────────────────────────────────┤
│  LEADING (领先6-12个月)                                              │
│  ├── 收益率曲线斜率 (10Y-2Y, 10Y-3M)                                  │
│  ├── OECD CLI                                                       │
│  ├── ISM新订单-库存差                                                 │
│  └── 银行贷款标准 (SLOOS)                                            │
├─────────────────────────────────────────────────────────────────────┤
│  COINCIDENT (同步)                                                   │
│  ├── 金融条件指数 (FCI)                                              │
│  ├── 信用利差 (HY OAS, IG OAS)                                       │
│  ├── VIX / MOVE                                                     │
│  └── Fed资产负债表变化                                                │
├─────────────────────────────────────────────────────────────────────┤
│  LAGGING (滞后3-6个月)                                               │
│  ├── M2增速                                                         │
│  ├── 企业债违约率                                                    │
│  ├── 失业率                                                         │
│  └── CPI/PCE                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### LIBOR替代方案（重要更新）

> **注意**：USD LIBOR已于2023年6月30日停止发布。所有LIBOR相关指标需使用以下替代方案：

| 原指标 | 替代方案 | FRED代码 | 说明 |
|--------|---------|----------|------|
| LIBOR-OIS | **SOFR-IORB Spread** | SOFR, IORB | 银行间资金压力 |
| TED Spread | **SOFR-T-Bill Spread** 或 **FRA-OIS** | 计算得出 | 信用风险溢价 |
| 3M LIBOR | **3M SOFR** | SOFR3M | 短期资金成本 |

**计算公式**：
```
新TED替代 = 3M SOFR - 3M T-Bill
资金压力指数 = SOFR - IORB（正值=资金紧张）
```

---

## Workflow

### Step 0: Data Normalization

```yaml
actions:
  - 统一频率：
      daily: 资金压力、利率、汇率、VIX
      weekly: 持仓、情绪指标
      monthly: 宏观实体、M2、CLI

  - 标准化输出格式：
      direction: ↑ / ↓ / →（上升/下降/持平）
      percentile: 0-100（5年分位数）
      momentum: 加速 / 减速 / 稳定
      z_score: 标准化偏离度

  - 数据质量检查：
      - 剔除缺失>5%的指标
      - 标注口径变更（如LIBOR→SOFR过渡期）
      - 交叉验证异常值
```

### Step 1: Fed Plumbing & Liquidity（美联储管道与流动性）

**核心指标**：

| 指标 | 来源 | 方向含义 | 阈值（分位数） |
|------|------|---------|---------------|
| **Fed总资产** | H.4.1 | ↓=QT收紧 | <20%ile=紧 |
| **ON RRP余额** | NY Fed | ↓=现金释放 | 变化方向优先 |
| **TGA余额** | Treasury | ↑=抽水 ↓=放水 | 变化>$100B显著 |
| **准备金余额** | H.4.1 | ↓=稀缺性上升 | <$3T预警 |
| **IORB-EFFR** | FRED | 偏离>5bp=压力 | 绝对值 |

**Net Liquidity Proxy**（实务指标，非官方）：
```
Net Liquidity ≈ Fed Assets − TGA − ON RRP
```
> 注：此为市场实务指标，非Fed官方定义，仅作趋势参考。

**规则**：
```python
if (Fed_Assets↓ or TGA↑ or RRP↑) and (IORB_EFFR_spread > 5bp):
    plumbing_score = -1  # 管道收紧
elif (TGA↓ or RRP↓) and (QT暂停 or 放缓):
    plumbing_score = +1  # 管道转松
else:
    plumbing_score = 0   # 中性
```

### Step 2: Money Market Stress（货币市场压力）

**核心指标**：

| 指标 | 替代方案 | 方向含义 | 阈值 |
|------|---------|---------|------|
| **SOFR-IORB Spread** | 原LIBOR-OIS | ↑=银行资金压力 | >10bp预警 |
| **SOFR-T-Bill Spread** | 原TED | ↑=信用风险溢价 | >50bp预警 |
| **CP-T-Bill Spread** | 商票压力 | ↑=企业融资压力 | >100bp预警 |
| **美元互换使用** | NY Fed | ↑=离岸美元紧张 | >$10B显著 |

**规则**：
```python
stress_count = sum([
    SOFR_IORB > 10bp,
    SOFR_TBill > 50bp,
    CP_TBill > 100bp,
    Swap_Usage > $10B
])

if stress_count >= 3:
    money_stress_score = -2  # 严重压力
elif stress_count >= 2:
    money_stress_score = -1  # 中度压力
else:
    money_stress_score = 0   # 正常
```

### Step 3: Yield Curve & Rate Expectations（收益率曲线与利率预期）

**核心指标**：

| 指标 | 来源 | 方向含义 |
|------|------|---------|
| **10Y-2Y Spread** | FRED | 倒挂=衰退预警 |
| **10Y-3M Spread** | FRED | 更强衰退信号 |
| **2Y Treasury** | FRED | 近端政策预期 |
| **Fed Funds期货** | CME | 市场隐含利率路径 |
| **实际利率(TIPS)** | FRED | 真实资金成本 |

**利率路径解读**：
```
市场隐含路径 vs Fed点阵图
├── 市场更鸽 → 风险资产有回调压力（若Fed不从）
├── 市场更鹰 → 已price in紧缩，边际利空有限
└── 一致 → 关注经济数据驱动
```

### Step 4: Financial Conditions Index（金融条件指数）

**使用综合FCI作为锚点**：

| FCI | 来源 | 特点 |
|-----|------|------|
| **Goldman Sachs FCI** | GS Research | 最广泛引用 |
| **Chicago Fed NFCI** | FRED (NFCI) | 免费可得 |
| **Bloomberg FCI** | BBG | 实时更新 |

**NFCI解读**（Chicago Fed）：
```
NFCI > 0    → 金融条件紧于均值
NFCI < 0    → 金融条件松于均值
NFCI < -0.5 → 异常宽松
NFCI > 0.5  → 显著收紧
```

### Step 5: Credit & Risk Pricing（信用与风险定价）

**核心指标**：

| 指标 | 来源 | 方向含义 | 阈值 |
|------|------|---------|------|
| **HY OAS** | FRED/ICE | ↑=风险厌恶 | >500bp预警 |
| **IG OAS** | FRED/ICE | ↑=整体信用收紧 | >150bp预警 |
| **VIX** | CBOE | ↑=恐慌/对冲需求 | >25中度 >35恐慌 |
| **MOVE** | ICE | ↑=利率波动预期 | >120预警 |
| **Put/Call Ratio** | CBOE | >1.0=恐慌 <0.7=贪婪 | 5日均值 |

**风险定价状态判定**：
```python
def risk_regime(hy_oas, vix, put_call):
    if hy_oas > 500 and vix > 30:
        return "RISK-OFF", -2
    elif hy_oas < 350 and vix < 18:
        return "RISK-ON", +2
    elif hy_oas.direction == "↓" and vix.direction == "↓":
        return "IMPROVING", +1
    elif hy_oas.direction == "↑" and vix.direction == "↑":
        return "DETERIORATING", -1
    else:
        return "MIXED", 0
```

### Step 6: Positioning & Sentiment（仓位与情绪）

**机构仓位**：

| 指标 | 来源 | 解读 |
|------|------|------|
| **CFTC COT** | CFTC | 大型投机者净仓位 |
| **Open Interest** | CME | 趋势强度/资金进出 |
| **13F持仓** | SEC | 机构配置变化（滞后） |
| **Dark Pool活动** | FINRA | 机构暗盘交易 |

**Smart Money vs Dumb Money**：

| 指标 | 来源 | 极端信号 |
|------|------|---------|
| **SM/DM Confidence Spread** | SentimentTrader | >40%=SM更乐观（看多信号） |
| **AAII Bull/Bear** | AAII | Bull>50%=过热 Bear>50%=恐慌 |
| **Margin Debt** | FINRA | 历史高位=杠杆风险 |
| **Short Interest** | Exchange | 高空仓=潜在逼空 |

**顶部/底部识别规则**：
```python
def top_bottom_signal(sm_dm_spread, margin_pct, vix_pct, credit_direction):
    # 顶部风险
    if sm_dm_spread < -30 and margin_pct > 90 and credit_direction != "收窄":
        return "TOP_RISK_HIGH"

    # 底部线索
    if vix_pct > 90 and sm_dm_spread > 30 and credit_direction == "止宽":
        return "BOTTOM_POSSIBLE"

    return "NO_EXTREME"
```

### Step 7: Global Liquidity & Dollar（全球流动性与美元）

**核心指标**：

| 指标 | 来源 | 方向含义 |
|------|------|---------|
| **DXY** | ICE | ↑=全球金融条件收紧 |
| **主要央行总资产** | 各央行 | ↓=全球流动性收缩 |
| **美元互换额度使用** | NY Fed | ↑=离岸美元紧张 |
| **EM资本流动** | IIF | ↓=风险厌恶 |

**美元微笑曲线应用**：
```
DXY强势情境：
├── Risk-off极端（避险需求）→ 股票承压
├── US经济独强 → 可能股涨美元涨
└── 区分驱动因素是关键

DXY弱势情境：
├── 全球风险偏好改善 → Risk-on
├── US相对走弱 → 关注轮动至非美
└── 通常利好新兴市场/大宗
```

### Step 8: Crypto & High-Beta（加密与高Beta，可选）

**核心指标**：

| 指标 | 来源 | 方向含义 |
|------|------|---------|
| **BTC Dominance** | CoinGecko | ↑=避险 ↓=山寨热 |
| **Funding Rate** | Exchange | 持续正高=多头拥挤 |
| **OI/市值比** | CryptoQuant | ↑=杠杆风险 |
| **交易所净流入** | Glassnode | ↑=抛压 ↓=囤币 |

**高Beta过热判定**：
```python
if funding_7d_avg > 0.03% and oi_growth_30d > 50% and btc_dominance.direction == "↓":
    crypto_signal = "OVERHEATED_LEVERAGE"
```

### Step 9: Real Economy Anchor（实体经济锚定）

**核心指标**：

| 指标 | 来源 | 领先性 |
|------|------|--------|
| **ISM PMI** | ISM | 领先1-2季度 |
| **OECD CLI** | OECD | 领先6-9个月 |
| **SLOOS贷款标准** | Fed | 领先信贷周期 |
| **初请失业金** | DOL | 同步/略领先 |
| **实际零售销售** | Census | 同步 |

**金融-实体背离检测**：
```python
if risk_assets.direction == "↑" and pmi.trend == "↓" and cli.trend == "↓":
    divergence_flag = "FINANCIAL_LEADS_REAL"
    confidence_adjustment = -10  # 降低追涨信心
```

### Step 10: Synthesis & Scoring（综合评分）

**评分体系**：

| 模块 | 权重 | 分值范围 | 说明 |
|------|------|---------|------|
| Fed Plumbing | 20% | -2 to +2 | 政策流动性源头 |
| Money Stress | 15% | -2 to +2 | 短端资金压力 |
| Yield Curve | 10% | -2 to +2 | 远期预期 |
| FCI综合 | 15% | -2 to +2 | 金融条件锚点 |
| Credit/VIX | 15% | -2 to +2 | 风险定价 |
| Positioning | 10% | -2 to +2 | 仓位拥挤度 |
| Global/DXY | 10% | -2 to +2 | 全球流动性 |
| Real Economy | 5% | -2 to +2 | 实体锚定 |

**Regime判定**：

```python
def determine_regime(weighted_score, signal_agreement):
    """
    weighted_score: -2 to +2 加权总分
    signal_agreement: 0-100% 信号一致性
    """
    confidence = min(90, signal_agreement + abs(weighted_score) * 20)

    if weighted_score >= 0.8:
        regime = "EXPANSION"
    elif weighted_score <= -0.8:
        regime = "TIGHTENING"
    else:
        regime = "TRANSITION"

    # 信号分歧降低置信度
    if signal_agreement < 60:
        confidence = min(confidence, 50)
        regime = "TRANSITION"  # 强制归入过渡期

    return regime, confidence
```

---

## Output Contract

### Deliverable: Macro Liquidity Card

```yaml
macro_liquidity_card:

  # 1. 核心判断
  regime:
    state: "EXPANSION | TIGHTENING | TRANSITION"
    confidence: 0-100
    since: "YYYY-MM-DD"  # 本轮regime起始
    duration_weeks: N

  # 2. 评分明细
  scores:
    fed_plumbing: {score: -2~+2, direction: ↑↓→, key_driver: "..."}
    money_stress: {score: -2~+2, percentile: N, key_metric: "..."}
    yield_curve: {score: -2~+2, slope_10y2y: Nbp, inversion: bool}
    fci: {score: -2~+2, nfci_level: N, trend: "..."}
    credit_risk: {score: -2~+2, hy_oas: Nbp, vix: N}
    positioning: {score: -2~+2, sm_dm_spread: N%, extreme: "TOP|BOTTOM|NONE"}
    global_dxy: {score: -2~+2, dxy_level: N, trend: "..."}
    real_economy: {score: -2~+2, pmi: N, divergence: bool}

    weighted_total: -2~+2

  # 3. 关键驱动因子
  top_drivers:
    - {rank: 1, factor: "...", direction: "...", contribution: "..."}
    - {rank: 2, factor: "...", direction: "...", contribution: "..."}
    - {rank: 3, factor: "...", direction: "...", contribution: "..."}

  # 4. 信号一致性矩阵
  confluence_map:
    aligned_bullish: ["指标1", "指标2", ...]
    aligned_bearish: ["指标3", "指标4", ...]
    divergent: ["指标5(方向) vs 指标6(方向)", ...]
    agreement_pct: N%

  # 5. Smart vs Dumb Money
  smart_dumb_summary:
    sm_confidence: N%
    dm_confidence: N%
    spread: N%
    signal: "SM_MORE_BULLISH | DM_MORE_BULLISH | NEUTRAL"
    top_bottom_probability:
      top_risk: "LOW | MEDIUM | HIGH"
      bottom_chance: "LOW | MEDIUM | HIGH"
    evidence: ["..."]

  # 6. 监控触发器（未来1-8周）
  triggers:
    - {id: 1, condition: "...", threshold: "...", current: "...", trigger_type: "BULLISH|BEARISH"}
    - {id: 2, condition: "...", threshold: "...", current: "...", trigger_type: "..."}
    - {id: 3, condition: "...", threshold: "...", current: "...", trigger_type: "..."}
    - {id: 4, condition: "...", threshold: "...", current: "...", trigger_type: "..."}
    - {id: 5, condition: "...", threshold: "...", current: "...", trigger_type: "..."}

  # 7. 反证条件（可推翻当前判断）
  disconfirmers:
    - {id: 1, condition: "若___发生", implication: "则当前判断失效", probability: "LOW|MED|HIGH"}
    - {id: 2, condition: "...", implication: "...", probability: "..."}
    - {id: 3, condition: "...", implication: "...", probability: "..."}

  # 8. 行动偏向（仅给方向，不给点位）
  action_bias:
    risk_budget: "INCREASE | MAINTAIN | REDUCE"
    preferred_assets: ["asset1", "asset2", ...]
    avoid_assets: ["asset3", "asset4", ...]
    hedge_priority: "LOW | MEDIUM | HIGH"
    key_rationale: "..."

  # 9. 元数据
  metadata:
    data_as_of: "YYYY-MM-DD"
    next_review: "YYYY-MM-DD"
    analyst_notes: "..."
```

---

## Kill Switches

| ID | 条件 | 触发动作 | 理由 |
|----|------|---------|------|
| **KS-ML-001** | 信号一致性<40% | 强制输出TRANSITION + 置信度上限50% | 信号过度分歧时结论不可靠 |
| **KS-ML-002** | Tier 1数据源缺失>30% | 暂停分析，标注数据不足 | 核心数据缺失导致误判风险 |
| **KS-ML-003** | VIX>50且HY OAS>700bp | 触发"极端压力"模式，所有评分归零重算 | 极端环境下正常模型失效 |
| **KS-ML-004** | Fed紧急政策介入（如紧急降息/QE） | 重置所有历史分位数，切换至"危机模式" | 政策regime change |
| **KS-ML-005** | 关键指标数据中断>3天 | 标注"数据陈旧"，降低置信度20% | 陈旧数据误导决策 |

---

## Evidence Thresholds

### Dual Threshold System

| 判断类型 | Primary Evidence | Secondary Evidence | 最低要求 |
|---------|-----------------|-------------------|---------|
| Regime = EXPANSION | FCI<0 + Credit↓ | SM>DM + PMI>50 | 2P + 1S |
| Regime = TIGHTENING | FCI>0 + Credit↑ | VIX>25 + Curve倒挂 | 2P + 1S |
| Top Risk = HIGH | SM/DM<-30 + Margin>90%ile | Credit止收 + VIX压缩 | 2P + 2S |
| Bottom Chance = HIGH | VIX>35 + SM/DM>30 | Credit止宽 + Positioning极端空 | 2P + 2S |

### 数据信度分层

| 层级 | 来源 | 可作为 |
|------|------|--------|
| Tier 1 | Fed/Treasury/FRED/交易所 | 核心论据 |
| Tier 2 | 知名研究机构/评级机构 | 支撑论据 |
| Tier 3 | 财经媒体/社交情绪 | 仅作参考，需交叉验证 |

---

## Falsification Design

### 反证条件模板

对每个核心判断，必须附带可证伪条件：

```yaml
judgment: "当前处于流动性扩张期"
falsifiable_conditions:
  - "若NFCI连续4周>0.3，则判断需修正"
  - "若HY OAS连续2周>500bp，则判断需修正"
  - "若Fed在未来8周内加速QT，则判断需修正"
observation_window: "4-8周"
review_date: "YYYY-MM-DD"
```

### 反事实检验

```yaml
counterfactual_test:
  question: "如果去掉Fed管道因素，结论是否改变？"
  method: "将Fed_plumbing_score设为0，重新计算weighted_total"
  result: "..."
  implication: "若结论不变，说明Fed因素非核心驱动"
```

---

## Quality Checks

### 输出前自检清单

| # | 检查项 | 通过标准 |
|---|-------|---------|
| 1 | 所有8个模块评分完整 | 无缺失 |
| 2 | 信号一致性已计算 | agreement_pct有值 |
| 3 | Top 3驱动因子已识别 | 有具体因子和贡献 |
| 4 | 触发器有明确阈值 | 5个触发器均有数值条件 |
| 5 | 反证条件可观测 | 3个条件均可在8周内验证 |
| 6 | 数据时效性标注 | data_as_of在7天内 |
| 7 | Kill Switch未触发 | 或已按触发动作处理 |
| 8 | Action Bias有理由 | key_rationale非空 |

---

## Red Flags

### 分析过程红旗

| 红旗 | 触发条件 | 应对 |
|------|---------|------|
| 🚩 单一指标主导 | 某指标贡献>50%总分 | 检查是否过度依赖，增加交叉验证 |
| 🚩 历史外推陷阱 | 用长期均值判断短期 | 区分周期位置，调整分位数窗口 |
| 🚩 滞后指标前置 | 用M2/失业率做领先判断 | 重新检查指标时序分类 |
| 🚩 确认偏误 | 只选支持结论的指标 | 强制列出背离指标 |
| 🚩 精确幻觉 | 给出精确点位/时间 | 只给方向和区间 |

### 结论红旗

| 红旗 | 触发条件 | 应对 |
|------|---------|------|
| 🚩 极端自信 | Confidence>90% | 强制降至85%并注明 |
| 🚩 无背离 | 所有指标完美一致 | 检查是否遗漏关键指标 |
| 🚩 Regime长期不变 | 同一Regime>6个月 | 主动寻找拐点信号 |

---

## Observability

### 监控面板（Dashboard）

```
┌─────────────────────────────────────────────────────────────────┐
│  MACRO LIQUIDITY REGIME DASHBOARD                               │
│  As of: YYYY-MM-DD | Regime: [EXPANSION] | Confidence: 72%     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Score Breakdown                        Signal Agreement: 68%   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Fed Plumbing  [████████░░] +1.2   ↑ RRP下降, TGA稳定          │
│  Money Stress  [██████████] +0.8   ↑ SOFR spread正常            │
│  Yield Curve   [████░░░░░░] -0.5   ↓ 10Y-2Y倒挂-15bp           │
│  FCI           [████████░░] +0.9   ↑ NFCI=-0.35                │
│  Credit/VIX    [████████░░] +1.0   ↑ HY OAS 380bp, VIX 16      │
│  Positioning   [██████░░░░] +0.3   → SM/DM spread +12%         │
│  Global/DXY    [██████░░░░] +0.4   → DXY 103.5, 稳定           │
│  Real Economy  [████░░░░░░] -0.2   ↓ PMI 49.8, CLI趋弱          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Weighted Total: +0.72 → EXPANSION                              │
│                                                                 │
│  Top 3 Drivers: 1) Fed balance 2) Credit spread 3) VIX         │
│  Key Divergence: Yield curve vs Credit spread                   │
│                                                                 │
│  Triggers to Watch:                                             │
│  ⚠️ HY OAS > 450bp → BEARISH                                   │
│  ⚠️ NFCI > 0 → BEARISH                                         │
│  ⚠️ VIX > 25 sustained → REGIME_SHIFT                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 版本追踪

每次分析输出包含：
- `version`: skill版本
- `data_as_of`: 数据截止日
- `previous_regime`: 上次判断
- `regime_change`: 是否变化
- `change_drivers`: 变化原因（若有）

---

## v2.0 Contract Compliance

### Compliance Checklist

| 模块 | 状态 | 说明 |
|------|------|------|
| Core Principles | ✅ | Purpose, When to Use明确 |
| 5-Type Claims | ✅ | 每个判断类型有证据要求 |
| Dual Threshold Evidence | ✅ | Primary + Secondary证据体系 |
| Kill Switches | ✅ | 5个可触发的自动终止条件 |
| Threat Model | ✅ | Red Flags覆盖常见偏误 |
| Observability | ✅ | Dashboard + 版本追踪 |
| Budget | ✅ | 权重分配明确 |
| Quality Checks | ✅ | 8项输出前检查 |
| Red Flags | ✅ | 过程红旗 + 结论红旗 |
| Falsification Design | ✅ | 反证条件 + 反事实检验 |
| Eval & Regression | ✅ | 回测建议（见下） |

### Backtesting Recommendation

```yaml
backtest_protocol:
  period: "2020-03 to 2024-12"  # 含COVID危机和加息周期
  benchmark_events:
    - "2020-03 COVID crash"
    - "2020-04 Fed intervention"
    - "2022-01 Tightening start"
    - "2022-10 UK Gilt crisis"
    - "2023-03 SVB crisis"
    - "2023-10 Term premium spike"
  success_criteria:
    - "Regime shift detected within 2 weeks of major event"
    - "Confidence drops during transition periods"
    - "No false alarms > 1 per year"
```

---

## Appendix

### A. FRED Code Quick Reference

| 指标 | FRED Code |
|------|-----------|
| SOFR | SOFR |
| IORB | IORB |
| Fed Total Assets | WALCL |
| TGA | WTREGEN |
| ON RRP | RRPONTSYD |
| 10Y-2Y | T10Y2Y |
| HY OAS | BAMLH0A0HYM2 |
| IG OAS | BAMLC0A0CM |
| VIX | VIXCLS |
| M2 | M2SL |
| NFCI | NFCI |

### B. Indicator Update Frequency

| 频率 | 指标 |
|------|------|
| Daily | SOFR, VIX, Credit spreads, DXY, Fed balance sheet |
| Weekly | Initial claims, COT, AAII |
| Monthly | M2, CPI, PMI, CLI |
| Quarterly | SLOOS, 13F, GDP |

### C. Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本；LIBOR替代方案；v2.0合规 |

---

*Skill generated with full v2.0 Contract Compliance*
