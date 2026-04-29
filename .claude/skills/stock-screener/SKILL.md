---
name: stock-screener
description: 低估股多信号筛选Agent v2.5 — v2.0信号(护城河匹配/Owner FCF/定价权分层/分部分析) + v2.5 长牛 OS 8 大结构性筛选信号(制度嵌入/飞轮完整性/模式聚焦/阶段 4 识别/SBG/EPD/高毛利低资本/失败模式扫描)
trigger: /screen
---

# 低估股筛选Agent v2.5

> **v2.5 (2026-04-28)**: 整合长牛 OS 73 文件横向案例提炼 — 新增 8 个结构性筛选信号(L2 嵌入)。把"看起来便宜"升级为"结构上能持续复利"。验证案例: NVDA/FICO/ORLY/NVR/CPRT/MSCI/ISRG。详见 `memory/long_compounder_unique_upgrades.md`。
> v2.0 (2026-03-30): 整合护城河框架v2.0升级。Owner FCF Yield取代FCF(SBC>10%)，叙事溢价-护城河匹配度，定价权分层评估，增长侵蚀护城河检测，与/moat-evaluator v2.0联动。源自NET/MRVL案例4核心发现。
> v1.3 (2026-03-30): Owner FCF Yield信号(SBC>10%替代FCF Yield) + 叙事溢价检测(P/FCF>50x) + CapEx分类信号。源自NET v2.0分析(叙事溢价51.5%/Owner Yield -0.18%/CapEx 15.8%)。
> v1.2 (2026-03-27): 预期差三因子(FCF Yield/SBC覆盖率/品质基金买入) + insider翻正信号。源自7家SaaS预期差横向分析。
> v1.1 (2026-03-26): PEG替代PE作为主估值信号(48份报告验证)

## 三层信号框架 (v2.0升级)

```
L1: 可能便宜了 (35%) — Owner FCF Yield优先+叙事溢价检测+内部人买入
L2: 便宜不是陷阱 (40%) — 护城河-增长匹配度+定价权分层+SBC覆盖率
L3: 市场开始纠错 (25%) — 盈利超预期+品质基金买入+价格位置
```

**v2.0新增核心机制**:
- **Owner FCF优先级**: SBC>10%时Owner FCF Yield权重2x，FCF Yield降为参考
- **护城河联动**: 与`/moat-evaluator` v2.0联动，检测护城河-增长匹配度
- **定价权分层**: 替代统一定价权评分，按客户层级差异化评估
- **增长侵蚀检测**: 识别"高增长+弱护城河=不可持续"风险模式

## 执行模式

### 模式A: 全面筛选 (用户说 "筛选低估股" / "screen")

#### Phase 1: 宇宙构建 (~50-100只候选)

**Step 1.1** — 用FMP获取估值初筛候选池

```
三路并行获取:
1. fmp_data path="/stable/stock-screener?marketCapMoreThan=2000000000&marketCapLowerThan=500000000000&priceEarningsRatioLowerThan=25&betaMoreThan=0&limit=50" → 低PE中盘 (放宽PE≤25, PEG<2.0在Phase 3信号计算中检查)
2. fmp_data path="/stable/stock-screener?marketCapMoreThan=2000000000&priceToBookRatioLowerThan=2&limit=50" → 低PB
3. fmp_data path="/stable/stock-screener?marketCapMoreThan=5000000000&dividendYieldMoreThan=2&limit=50" → 高股息(shareholder yield代理)
```

**Step 1.2** — 合并去重 → 初始候选池 (symbols列表)

**Step 1.3** — Insider buying过滤 (并行, 每批10只)

```
对每只: fmp_data endpoint="insider-trading" symbol={SYM} limit=20
保留: 近6月有买入的 + 全部低估值候选
```

#### Phase 2: 数据采集 (对候选池)

**对每只股票, 并行调用6个endpoint:**

```python
# 每只股票6个调用 (用dispatching-parallel-agents, 每批5-10只)
fmp_data endpoint="profile"      symbol={SYM}
fmp_data endpoint="income"       symbol={SYM} limit=3 period="annual"
fmp_data endpoint="balance"      symbol={SYM} limit=3 period="annual"
fmp_data endpoint="cashflow"     symbol={SYM} limit=3 period="annual"
fmp_data endpoint="ratios"       symbol={SYM} limit=3 period="annual"
fmp_data endpoint="key-metrics"  symbol={SYM} limit=3 period="annual"
fmp_data endpoint="insider-trading" symbol={SYM} limit=50
fmp_data endpoint="quote"        symbol={SYM}
```

**数据落盘**: 每只股票 → `data/screener/raw/{SYM}.json`

```json
{
  "symbol": "AAPL",
  "fetched_at": "2026-03-16",
  "profile": {...},
  "income": [...],
  "balance": [...],
  "cashflow": [...],
  "ratios": [...],
  "key_metrics": [...],
  "insider_trades": [...],
  "quote": {...}
}
```

#### Phase 3: 信号计算 (v2.0升级: 集成护城河评估+成本控制)

**Step 3.1** — 护城河联动评估 (批量执行, harness成本控制)
```bash
# 对候选池批量调用护城河评估器
for TICKER in ${CANDIDATE_POOL[@]}; do
    # 使用harness成本控制: 每批最多5只，避免API过载
    if [ $BATCH_COUNT -ge 5 ]; then
        echo "Harness: API限制，暂停30秒"
        sleep 30
        BATCH_COUNT=0
    fi

    /moat-evaluator --ticker $TICKER --mode quick --output data/screener/moats/${TICKER}_moat.json
    BATCH_COUNT=$((BATCH_COUNT + 1))
done

# 生成护城河排名 → 用于L2信号权重
python scripts/screener/rank_moats.py data/screener/moats/ --output data/screener/moat_rankings.json
```

**Step 3.2** — 升级版PEG筛选 (结合护城河质量)**
```
基础PEG评分:
  PEG < 1.5          → 基础+1.0分 (增速被低估)
  PEG 1.5-2.0        → 基础+0.5分 (合理)
  PEG 2.0-3.0        → 基础 0分   (中性)
  PEG > 3.0 且 PE<20 → 基础-0.5分 (低增速陷阱)
  PEG > 4.0          → 基础-1.0分 (品质陷阱候选)

护城河质量调整 (v2.0新增):
  护城河评分 > 7.5  → PEG分数 × 1.2 (强护城河支撑增长)
  护城河评分 5-7.5  → PEG分数 × 1.0 (中性)
  护城河评分 < 5    → PEG分数 × 0.8 (弱护城河风险)

最终L1 PEG信号 = 基础PEG评分 × 护城河质量调整系数
```

**★ Owner FCF Yield信号 (v2.0核心升级, NET/MRVL验证, SBC>10%强制启用)**:
```
来源: NET FCF Yield 0.45%(看似中性) vs Owner FCF Yield -0.18%(实际负回报)
      MRVL SBC $451M侵蚀FCF $324M → Owner FCF -$127M(股东真实损失)
      核心: 对高SBC公司，FCF Yield严重误导，Owner FCF才是股东真实收益

自动触发条件: SBC/Revenue > 10% (主要是SaaS/科技股)

计算: Owner FCF Yield = (FCF - SBC费用) / Market Cap × 100%

  Owner Yield > 3%    → L1 +1.5分 (真实高回报, 极罕见, ADBE级)
  Owner Yield 1-3%    → L1 +1.0分 (覆盖SBC后仍有正回报)
  Owner Yield 0-1%    → L1 +0.5分 (勉强覆盖SBC)
  Owner Yield -1%~0%  → L1 -0.5分 (SBC侵蚀部分FCF)
  Owner Yield < -1%   → L1 -1.5分 (持续毁灭股东价值, NET/MRVL级)

回退机制 (SBC/Revenue < 5%): 使用传统FCF Yield
中间带 (SBC/Revenue 5-10%): Owner FCF Yield × 0.7 + FCF Yield × 0.3

验证案例: NET(-0.18%→-0.5), MRVL(估-0.4%→-0.5), ADBE(估4.8%→+1.0)
```

**★ Insider A/D翻正信号 (v1.2新增, CRM验证)**:
```
来源: CRM Q1'26 insider A/D比首次翻正(2008年以来首次) — 极罕见+极强

检测: 最近1Q的insider acquired/disposed比率 vs 前4Q均值
  如果前4Q A/D < 0.5(一直卖) → 最近1Q A/D > 1.0(首次翻正)
  → L1 +2.0分 (极罕见信号, 比单笔insider buy强数倍)

逻辑: 长期净卖出的公司突然出现净买入 = 内部人看到了市场没看到的拐点
```

```bash
python scripts/screener/run_screen.py data/screener/raw/ --output data/screener --detail
```

```bash
# v2.0升级版执行
python scripts/screener/run_screen_v2.py data/screener/raw/ \
  --moat-data data/screener/moats/ \
  --harness-mode cost_optimized \
  --output data/screener \
  --detail
```

输出:
- `data/screener/screen_results_v2.json` — 机器可读排名(含护城河评分)
- `data/screener/screen_report_v2.txt` — 可读报告(含新增信号解释)
- `data/screener/moat_rankings.json` — 护城河排名表
- `data/screener/signal_breakdown/` — 每个信号的详细数据

#### Phase 4: 深度验证 (Top 10)

对排名前10, 用 `baggers_summary` 获取更丰富的数据交叉验证:

```
baggers_summary symbol={SYM}  # 7维度38指标 + 杜邦分析
```

补充 L3 信号:
```
fmp_data endpoint="estimates" symbol={SYM}  # 盈利预测 → surprise/revision
```

#### Phase 5: 输出最终报告

格式:
```
排名 | Symbol | 综合得分 | L1 | L2 | L3 | F-Score | Insider | 一句话理由
  1    XXXX     7.8      8.1  7.5  7.2    8       $2.3M    低估+insider cluster+高质量
```

附每只股票的信号卡片(signals.py自动生成)

---

### 模式B: 定向筛选 (用户给了一组股票)

跳过Phase 1, 直接从Phase 2开始, 对用户指定的股票执行完整信号分析

例: "帮我筛选这几只: INTC, PARA, WBD, DIS, BABA"

---

### 模式C: 单只诊断 (用户问某只股票)

对单只股票执行完整L1+L2+L3分析, 输出详细信号卡片 + 诊断

例: "INTC在三层信号框架下怎么样?"

---

## 信号权重 (可调)

| Layer | Weight | 逻辑 |
|-------|--------|------|
| L1 可能便宜了 | 35% | 入场条件 |
| L2 便宜不是陷阱 | **40%** | 最重要: 避免价值陷阱 |
| L3 市场纠错 | 25% | 催化剂/时机 |

## 硬否决条件 (任一触发 → 直接剔除)

**铁律第一条: 生物制药行业全面排除**
- Biotechnology / Drug Manufacturers (General/Specialty) / Medical Pharmaceuticals
- 原因: 核心驱动是管线二元结果(FDA批准/失败), 无法用财务因子提前验证和量化
- 此规则优先于所有其他条件, 不可豁免

0. **生物制药行业** → 铁律排除(Biotechnology/Drug Manufacturers/Medical Pharma)
1. 高应计(>0.15) + 低现金流(CFO/NI<0.5) → 利润纸上富贵
2. 审计意见保留
3. 极高空头(>20%) + 无insider buy → 知情人在做空
4. 年稀释>15% → 大规模增发
5. Z-Score<1.0 (非金融/非负权益) → 财务困境

## 软警告 (标记但不剔除)

- PEG > 3.0 + 有机增速 < 7% → "品质陷阱"警告 (CQI高但增速低, 14份报告验证)
- 债务驱动回购 (net debt增加 + shares减少)
- F-Score ≤ 3 (财务体质弱)
- 资产增长 > 20% (可能在盲目扩张)
- 单一insider buy金额 < $100K (信号弱)
- 全管理层零买入 > 6个月 + 净卖出 > $5M → "内部人沉默"警告 (-0.5分, 10份报告验证)
- 全管理层零买入 > 12个月 → "强沉默"信号 (-1.0分, COST/ANET发现: 零买入比净卖出信息量更高)
- CEO言辞看好 + CEO个人净卖出 > $1M → "言行矛盾"警告 (-0.5分, HLT/ANET验证)

## ★ SBC覆盖率信号 (v1.2新增, 7家SaaS+8家已有报告验证)

> **来源**: ADBE(580%覆盖/-5%缩股) vs DDOG(0%/+4.8%稀释) = 年化差距15pp
> **核心**: 同行业中SBC覆盖率和净缩股率的差异被市场完全忽视——这是最被低估的区分因子

```
计算:
  SBC覆盖率 = 年回购金额 / 年SBC费用 × 100%
  净缩股率 = (本年稀释股数 - 上年稀释股数) / 上年稀释股数

评分 (嵌入L2"便宜不是陷阱"):
  回购/SBC > 200% + 缩股 > 2%/yr  → L2 +1.5分 (净增厚股东, ADBE/CRM级)
  回购/SBC 150-200% + 缩股 > 1%   → L2 +1.0分 (强覆盖, WDAY级)
  回购/SBC 100-150% + 缩股 ≥ 0%   → L2 +0.5分 (覆盖, INTU/PTC级)
  回购/SBC 50-100%                 → L2  0分   (部分覆盖, NOW级)
  回购/SBC < 50% 或零回购          → L2 -1.0分 (不覆盖/净稀释)
  零回购 + 稀释 > 3%/yr            → L2 -1.5分 (持续损害股东, DDOG级)

适用: SBC/Rev > 5%的公司(主要是科技/SaaS)。SBC/Rev < 3%的公司此信号权重减半
```

## ★ 品质基金买入信号 (v1.2新增, INTU验证)

> **来源**: INTU在-47%时Norges Bank($3.3B新仓)+Fundsmith(+64%)+AllianceBernstein(+184%)同时买入
> **核心**: 品质/主权基金的建仓比insider更早、覆盖面更广、调研更深

```
检测方法:
  WebSearch "{TICKER} 13F institutional ownership hedge fund {YEAR}"
  或 fmp_data path="/api/v4/institutional-ownership/..."

品质基金定义(低周转+长期持有+选股严格):
  Tier 1: 主权基金 (Norges Bank/GIC/ADIA) — 最长期的钱
  Tier 1: 品质复合基金 (Fundsmith/Lindsell Train/Baillie Gifford) — 最挑剔的钱
  Tier 2: 知名价值投资者 (Berkshire/Ackman/Klarman/Marks) — 最深度的研究
  Tier 2: 量化逆向基金 (RenTech/AQR/Two Sigma) — 因子驱动但有信号价值

评分 (嵌入L3"市场纠错"):
  ≥2家Tier 1/2基金新建仓或增仓>50%  → L3 +1.5分 (强信号: 多个独立研究者同时看到价值)
  1家Tier 1基金建仓或增仓>30%       → L3 +1.0分
  仅量化基金(Tier 2)建仓             → L3 +0.5分 (可能是因子驱动非基本面)
  品质基金减仓                       → L3 -1.0分 (品质判断改变)

注意: 需区分"主动买入"vs"ETF被动流入"。Vanguard/BlackRock/State Street的变化通常是被动的,不计入
```

## ★ 定价权分层评估信号 (v2.0新增, 护城河框架升级)

> **来源**: 传统定价权评估忽略客户分层差异，CRM F500有定价权但SMB在流失
> **核心**: 定价权按客户层级差异化评估，加权计算真实定价权强度

```
数据需求: 分客户层级的收入拆分(大客户vs中小客户)
触发条件: ToB业务 且 有客户分层披露

评估框架:
  F500客户: 转换成本高 → 定价权通常Stage 3-4
  大中型企业: 成本敏感度中等 → 定价权通常Stage 2-3
  SMB客户: 成本敏感度高 → 定价权通常Stage 1-2
  消费者: 最敏感 → 定价权通常Stage 0-1

计算加权定价权:
  加权Stage = Σ(客户层收入占比 × 该层定价权Stage)

评分 (嵌入L2"便宜不是陷阱"):
  加权Stage ≥ 3.0  → L2 +1.0分 (强定价权)
  加权Stage 2.0-3.0 → L2 +0.5分 (中等定价权)
  加权Stage 1.0-2.0 → L2  0分   (弱定价权)
  加权Stage < 1.0   → L2 -0.5分 (无定价权)

附加检测 - 定价权剪刀差:
  如果高端Stage提升 + 低端Stage下降 → 标记"客户结构优化信号"(+0.5分)
  如果高端Stage下降 → 标记"定价权流失风险"(-0.5分)

适用范围: ToB软件、企业服务、B2B平台
不适用: 纯消费品牌、大宗商品、周期性业务(定价权主要受供需周期影响)
```

## ★ 叙事溢价-护城河匹配度检测 (v2.0升级, 整合护城河框架)

> **来源**: NET叙事溢价51.5% + 护城河评分2.8/10 = 严重不匹配(高叙事+弱护城河)
> **核心**: 叙事溢价必须有护城河支撑，否则是"增长侵蚀护城河"风险

```
触发条件: P/FCF > 50x 或 EV/Sales > 25x

Step 1: 计算叙事溢价
  基线倍数 = 同行业成熟公司倍数(代表零叙事估值)
  PEG合理溢价 = (目标增速/基线增速) × 基线倍数
  叙事溢价% = 1 - (基线 + PEG合理) / 当前倍数

Step 2: 调用护城河评估器
  使用 `/moat-evaluator` 获得护城河总分(0-10)

Step 3: 匹配度检验
  匹配度 = 护城河总分 / 叙事溢价% × 10

评分 (嵌入L1):
  匹配度 > 0.8     → L1 +0.5分 (叙事有护城河支撑)
  匹配度 0.5-0.8   → L1  0分   (中性)
  匹配度 0.3-0.5   → L1 -1.0分 (⚠️ 高叙事+中护城河=风险)
  匹配度 < 0.3     → L1 -1.5分 (🚨 高叙事+弱护城河=增长侵蚀风险)

典型案例:
  NET: 叙事溢价51.5% + 护城河2.8 → 匹配度0.05 → -1.5分
  成熟SaaS: 叙事溢价15% + 护城河7.5 → 匹配度0.50 → 0分

含义: 匹配度<0.3的公司需要快速建立护城河，否则增长停滞时将面临估值崩塌
```

## ★ 多业务线分部筛选信号 (v2.0新增, MRVL验证)

> **来源**: MRVL数据中心业务增长27%但被汽车业务-35%拖累，合并财务掩盖分部差异
> **核心**: 多业务线公司需要按分部评估，避免强业务被弱业务平均化

```
触发条件: 有明确分部披露(≥2个业务线) 且 各分部增速差异>20pp

分部筛选逻辑:
1. 识别分部: 从10-K/10-Q中提取分部收入、增速、利润率
2. 分部权重: 按收入占比加权
3. 分部质量: 按增速+利润率+前景评估各分部质量(1-10分)
4. 合成评分: Σ(分部权重 × 分部质量)

评分阈值:
  合成评分 ≥ 7.5    → L2 +1.0分 (强业务主导)
  合成评分 6.0-7.5  → L2 +0.5分 (整体偏强)
  合成评分 4.0-6.0  → L2  0分   (平衡)
  合成评分 2.5-4.0  → L2 -0.5分 (弱业务拖累)
  合成评分 < 2.5    → L2 -1.0分 (多业务都弱)

风险检测:
  如果核心业务(收入占比>40%)增速为负 → 额外-0.5分
  如果有分部关停/重组计划 → 标记"业务组合优化中"

验证案例: MRVL数据中心+27%(权重60%)+前景8分, 汽车-35%(权重25%)+前景3分
          → 合成评分 = 0.6×8 + 0.25×3 + 0.15×5 = 6.3 → +0.5分
```

## ★ 增长侵蚀护城河检测 (v2.0新增, NET/MRVL双验证)

> **来源**: NET为追求增长大量投入基础设施，但护城河评分持续下降
> **核心**: 高增长可能以牺牲护城河为代价，检测不可持续增长模式

```
触发条件: 收入增速 > 20% 且 连续2年

检测逻辑:
1. 增长代价分析:
   - CapEx/Rev增长趋势 (基础设施投入)
   - SBC/Rev增长趋势 (人才成本)
   - 获客成本(CAC)增长趋势

2. 护城河趋势:
   - 毛利率变化 (定价权)
   - 客户留存率变化 (转换成本)
   - 市占率变化 (网络效应)

3. 侵蚀检测:
   侵蚀指数 = (增长投入增速 - 收入增速) / 护城河指标变化率

评分 (嵌入L2):
  侵蚀指数 < 0.5    → L2 +0.5分 (高质量增长)
  侵蚀指数 0.5-1.0  → L2  0分   (中性)
  侵蚀指数 1.0-2.0  → L2 -0.5分 (⚠️ 增长有代价)
  侵蚀指数 > 2.0    → L2 -1.0分 (🚨 增长侵蚀护城河)

典型模式:
  NET模式: 高增长+基础设施重投入+护城河弱化 → 侵蚀指数高
  成熟SaaS: 中增长+护城河强化+投入效率高 → 侵蚀指数低

预警: 侵蚀指数>1.5且持续2季度 → 标记"增长质量恶化"
```

## ★ 长牛 OS 结构性筛选 (v2.5 新增, 长牛 OS 73 文件案例提炼)

> **来源**: NVDA/FICO/ORLY/NVR/CPRT/MSCI/ISRG 8 个深度复盘横向模式 — 长牛机器有共同的结构特征,失败者有共同的失败模式。
> **核心**: 现有 v2.0 信号偏估值/财务/insider; v2.5 补**结构性长牛筛选条件**——把"看起来便宜"升级为"结构上能持续复利"。
> **位置**: 嵌入 L2"便宜不是陷阱",作为护城河-增长匹配度之外的**结构验证层**。

### 信号 1: 制度/流程嵌入指标(嵌入 L2, +0.5 ~ -0.5 分)

> **来源**: FICO 评分嵌入 GSE / MSCI 嵌入资管合同 / ORLY 嵌入修理厂日常流程 / ISRG 嵌入医院 SOP
> **核心**: **替代成本来自协调成本,而非产品成本** — 这是最深的护城河来源

```
检测方法(WebSearch + 10-K 阅读):
  - 客户合同/法律文件/监管文件中**直接引用公司名/产品名**?
  - 客户内部培训材料中是否把"用 X"作为默认动词?
  - 行业报告/学术文献是否把这个名字作为类目名?

5 层评分:
  L5 语言层(行业默认词汇)        → +0.5 分 (FICO Score / EAFE / EM)
  L4 标准层(嵌入合同/SOP)        → +0.3 分 (GSE 默认 / ETF 挂钩)
  L3 流程层(进入日常工作流)      → +0.1 分 (ORLY 修理厂供应链)
  L2 系统层(集成 API/格式)        → 0 分     (普通 SaaS)
  L1 偏好层(客户偏好但可换)      → -0.3 分 (普通供应商)

适用: ToB / ToG / 制度型公司. 不适用: 纯消费品.
```

### 信号 2: 飞轮四要素完整性(嵌入 L2, +1.0 ~ -1.0 分)

> **来源**: 长牛 OS framework-internal-feedback-loop-engine — 真飞轮能验证在财务层
> **核心**: Installed base + 持续需求 + 易复购 + 定价权 — 四要素都齐才算飞轮

```
四要素检测:
  1. Installed base 持续增长?       → 客户/装机/订阅数 3 年 CAGR > 0
  2. 同客户持续货币化?              → NRR ≥ 110% 或 per-customer ARR 上升
  3. 客户易复购/续约?               → GRR ≥ 90% 或 churn < 10%
  4. 定价权可释放?                  → 提价后 NRR/留存不降

评分:
  4 项全满足 → L2 +1.0 分 (真飞轮: ISRG/ORLY/MSCI 模式)
  3 项满足 → L2 +0.5 分 (强飞轮)
  2 项满足 → L2 0 分 (部分飞轮)
  1 项满足 → L2 -0.5 分 (假飞轮)
  0 项 → L2 -1.0 分 (无飞轮)

关键: ISRG installed base 不是飞轮 — 只有"装机 → procedure → I&A/service → 培训 → 信任 → 装机"才是完整飞轮。
单看 installed base 数量增长不算分,要看是否驱动持续货币化。
```

### 信号 3: 模式聚焦指标(嵌入 L2, +0.5 ~ -1.0 分)

> **来源**: NVR 不做土地开发 / ORLY 不卖轮胎 / 反例 PBY 6000+ 工位混合
> **核心**: **模式聚焦形成复利,复杂业态稀释复利**

```
检测:
  - Top 3 revenue sources 占比?
  - 业务线数量?
  - 是否有 >3x volatility of core 的非核心业务?

评分:
  Top 3 ≥ 80% 且 业务线 ≤ 3 → L2 +0.5 分 (高度聚焦, NVR/ORLY 模式)
  Top 3 ≥ 70% 且 业务线 ≤ 4 → L2 +0.3 分 (聚焦)
  Top 3 60-70%               → L2 0 分     (中等)
  Top 3 < 60% 或 业务线 ≥ 5  → L2 -0.5 分 (复杂化警告)
  存在 >3x volatility 副业    → L2 -1.0 分 (PBY 模式: 复杂业态稀释)

注: 集团股(BRK/Berkshire)豁免此信号,投资公司本质就是多业务持有
```

### 信号 4: 阶段 4 成熟复利识别(嵌入 L2, +1.0 ~ 0 分)

> **来源**: 长牛案例 8 公司中 6 家在阶段 4(MSCI/ISRG/FICO/CME/ORLY/NVR)
> **核心**: 阶段 4 公司不是高增长,但是**可持续高回报** — 这是被低估的最佳赔率

```
阶段 4 特征(全部满足才算):
  - 收入中速稳定: 10-20% organic CAGR 5+ 年
  - 高 FCF/现金转化: FCF/NI ≥ 90%
  - 资本回购已成主要每股价值驱动: 缩股 ≥ 1%/年
  - 仍有再投资跑道: 新地理/新产品/新客户 segment 占收入 > 5% 且增速更快
  - ROIC 持续 > WACC + 5%

评分:
  全部 5 项满足           → L2 +1.0 分 (阶段 4 成熟复利标杆)
  4 项满足                → L2 +0.5 分 (接近阶段 4)
  3 项满足                → L2 +0.3 分 (阶段 3-4 之间)
  ≤2 项                   → L2 0 分     (不属于阶段 4)

警告: 这 5 项满足但 PE > 35x → 阶段 4 警告"质量已被定价",赔率有限
```

### 信号 5: 第二选择差距(SBG)代理(嵌入 L1, +0.5 ~ -0.5 分)

> **来源**: 长牛 OS framework-second-best-gap — 最可观察的护城河指标
> **简化版**(完整 8 维需调用 chokepoint-locator):

```
检测三个最易观察的代理变量:
  1. 同行第二名的市占率倍数差距(公司 vs 第二名)
  2. 同行第二名的 GM/OPM 差距
  3. 同行第二名的 NRR/留存差距

评分:
  3 项差距都 > 30%        → L1 +0.5 分 (大 SBG, ISRG/MSCI 模式)
  2 项差距 > 30%          → L1 +0.3 分
  1 项差距 > 30%          → L1 0 分
  无显著差距              → L1 -0.5 分 (SBG 小,竞品逼近)

注: 此为简化版 — Tier 3 深度分析时调用 chokepoint-locator 做完整 8 维
```

### 信号 6: 错误传播深度(EPD)代理(嵌入 L2, +0.5 ~ 0 分)

> **来源**: 长牛 OS framework-error-propagation-depth — L4-L5 客户更不敢换
> **简化版** (完整 6 层需调用 moat-evaluator EPD):

```
EPD 速判:
  L5 生命安全/物理不可逆      → L2 +0.5 分 (ISRG/AXON/PTC)
  L4 法律/监管/审计责任       → L2 +0.4 分 (FICO/CDNS/SNPS)
  L3 制度/合规责任            → L2 +0.2 分 (VEEV/会计)
  L2 财务损失可量化            → L2 0 分     (普通)
  L1 用户体验受损              → L2 -0.2 分 (低粘性 SaaS)
  L0 无真实风险                → L2 -0.5 分 (内容平台)

适用: 所有 ToB / 制度型 / 受监管行业.
```

### 信号 7: 高毛利 + 低资本强度组合(嵌入 L2, +1.0 ~ 0 分)

> **来源**: FICO 76-88% OPM / MSCI 83% GM / ORLY 44% GM 持续改善 / ISRG 68% GM
> **核心**: 高毛利必要但非充分 — 必须配合低资本强度才是真品质

```
组合检测:
  GM 趋势: 持续改善 vs 持平 vs 下降
  CapEx/Revenue 趋势: 持续下降 vs 持平 vs 上升
  Incremental margin (新增收入毛利率): vs 当前毛利率

评分:
  GM ≥ 70% + CapEx/Rev < 5% + 增量利润率 ≥ 当前    → L2 +1.0 分 (标杆)
  GM ≥ 60% + CapEx/Rev < 8% + 增量利润率 ≥ 当前    → L2 +0.7 分
  GM ≥ 40% 持续改善 + CapEx/Rev 持平                → L2 +0.5 分 (网络型, ORLY 模式)
  GM 高但 CapEx 持续上升                              → L2 0 分     (增长有代价)
  GM 持续下降                                          → L2 -0.5 分 (定价权流失)

适用: 软件/标准类(GM ≥ 60%)/ 网络密度类(GM ≥ 40% + 改善).
不适用: 硬件/制造业(用 HC-5 框架替代).
```

### 信号 8: 制度嵌入型反事实失败者验证(嵌入 L2, -0.5 ~ 0 分)

> **来源**: 长牛 OS 5 种失败模式 — 模式复杂化/渠道破坏/制度嵌入缺失/流通渠道丧失/价格权释放失败
> **核心**: **如果失败者也有同样的表面信号,这个信号就不是 alpha**

```
失败模式扫描(逐项检查):
  1. 渠道破坏: 公司有无近期重大渠道收购/整合 (3dfx-STB 反例)?
  2. 模式复杂化: 业务线 > 5 或近 3 年新增 ≥ 3 业务?
  3. 制度嵌入缺失: 玩家品牌/消费者品牌但客户实际不嵌入?
  4. 流通渠道丧失: 单一大客户 > 30% 收入?
  5. 价格权流失: GM 连续 3 年下降?

评分:
  0 项失败模式 → L2 0 分 (无负面信号)
  1 项 → L2 -0.2 分 (单点警告)
  2 项 → L2 -0.3 分 (累积警告)
  ≥3 项 → L2 -0.5 分 (失败模式集合,排除)
```

### v2.5 综合评分调整

```
v2.5 长牛 OS 信号汇总(L2 嵌入):
  最高加分:  +5.0 分 (8 信号全部满分 — 极罕见)
  典型范围:  -2.0 ~ +3.0 分
  结构警告:  ≤-2.0 分 = "结构性长牛失败模式" → 标记并排除
  结构优势:  ≥+2.5 分 = "结构性长牛候选" → 优先深度分析

集成方式:
  v2.5 信号是 v2.0 信号之外的**结构性补充层**
  最终 L2 = v2.0 信号(0-5 范围) + v2.5 长牛 OS 调整(-2 ~ +3)
  上限: L2 ≤ 7.5
  下限: L2 ≥ 0
```

### 与 v2.0 信号的关系

| v2.5 信号 | v2.0 对应 | 关系 |
|----------|-----------|------|
| 信号 1 制度嵌入 | 定价权分层 | 互补: 制度嵌入是定价权的根因 |
| 信号 2 飞轮四要素 | 多业务线分部 | 互补: 飞轮看一致性,分部看异质性 |
| 信号 3 模式聚焦 | 多业务线分部 | 互补: 聚焦是反例,异质性是问题 |
| 信号 4 阶段 4 识别 | (无) | 新增独立维度 |
| 信号 5 SBG 代理 | 护城河匹配度 | 互补: SBG 看竞品,匹配度看自身 |
| 信号 6 EPD 代理 | (无) | 新增独立维度 |
| 信号 7 高毛利+低资本 | (无) | 新增独立维度 |
| 信号 8 失败模式 | 软警告 | 升级: 失败模式更结构化 |

## 回购效率检测 (v1.1, 30份报告验证)

高PE下的回购可能毁灭股东价值:

```
简化η检测 (不需要Fair PE):
  PE > 30x + 年回购 > FCF的30% → 标记"回购可能毁灭价值"(-0.5分)
  PE > 40x + 年回购 > FCF的20% → 强警告(-1.0分)

完整η计算 (如果有Fair PE估计):
  η = 1 - (当前PE - 公允PE) / 当前PE
  η > 1.0 → 价值创造
  η 0.8-1.0 → 中性
  η < 0.8 → 价值毁灭

标杆: CME η=0.59@28x | HLT η=0.80@50x | MCO η<0.7@35x
```

验证案例: CME(41%毁灭)/MCO/MSCI/HLT/AAPL(IRR<国债)独立确认

## 数据新鲜度

- 财务数据: FMP最新年报/季报 (自动取最近期)
- Insider trading: 最近6个月 (Form 4)
- 估值: 实时quote
- 建议每周运行一次Phase 1, 候选池每月大换

---

## v2.0升级总结 (2026-03-30)

**4个核心升级 (源自NET/MRVL分析)**:

1. **Owner FCF Yield替代FCF Yield** (针对高SBC公司)
   - SBC>10%时强制启用，权重2x
   - NET: 0.45% → -0.18% (揭示真实负回报)
   - MRVL: FCF $324M被SBC $451M全部侵蚀

2. **叙事溢价-护城河匹配度检测** (防范增长侵蚀风险)
   - 自动调用`/moat-evaluator`获取护城河评分
   - 匹配度<0.3 = 高叙事+弱护城河 = 风险信号
   - NET: 叙事溢价51.5% + 护城河2.8 → 严重不匹配

3. **定价权分层评估** (替代统一定价权)
   - F500/大中型/SMB/消费者分层评估
   - 加权平均真实定价权强度
   - 检测"定价权剪刀差"(高端强化+低端流失)

4. **多业务线分部筛选** (避免强业务被平均化)
   - 自动识别分部披露(收入/增速/利润率)
   - 按分部权重加权质量评分
   - MRVL: 数据中心+27% vs 汽车-35%

**系统集成**:
- **护城河联动**: Phase 3批量调用护城河评估器
- **成本控制**: harness系统API限制+批次控制
- **增长侵蚀检测**: CapEx/SBC vs 护城河指标的动态追踪

**向后兼容**: v1.3所有信号保留，v2.0为增量升级

---

## 与现有框架的关系

- 筛选结果中的高分股 → 可进入 `/quick-scan` (Tier 1) 做快速诊断
- 确认有兴趣 → `/standard-analysis` (Tier 2) 或 Tier 3 深度研究
- CQI排行榜 (`knowledge/stock_picking/cqi_public_ranking_v4.0.md`) 提供质量验证
- **v2.0新增**: 护城河评分可直接输入深度分析，加速Phase 1业务理解

## 工具依赖 (v2.0升级)

| 工具 | 用途 | Phase | v2.0新增 |
|------|------|-------|----------|
| `fmp_data` (path=screener) | 宇宙构建 | 1 | |
| `fmp_data` (6 endpoints) | 财务数据采集 | 2 | |
| `fmp_data` (insider-trading) | 内部人交易 | 1-2 | |
| **`/moat-evaluator`** | **护城河评估** | **3** | **✓** |
| **`harness-controller`** | **成本控制+API限制** | **全程** | **✓** |
| `baggers_summary` | 深度验证 | 4 | |
| `fmp_data` (estimates) | 盈利预测 | 4 | |
| `screen_stocks` (value preset) | 备用筛选 | 1 | |
| `scripts/screener/run_screen.py` | 信号计算 | 3 | 升级v2.0 |

**v2.0集成点**:
- **护城河联动**: Phase 3自动调用`/moat-evaluator`获取护城河评分，影响PEG权重和L2评分
- **成本智能控制**: `harness-controller`监控API调用量，自动批次控制和暂停策略
- **多业务分析**: 自动检测分部披露，按业务线差异化评估
- **Owner FCF优先**: SBC>10%时自动切换到Owner FCF Yield作为主要估值指标
