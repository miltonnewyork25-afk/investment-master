---
name: stock-screener
description: 低估股多信号筛选Agent v1.2 — 三层信号框架(便宜/不是陷阱/纠错)+预期差信号
trigger: /screen
---

# 低估股筛选Agent v1.2

> v1.2 (2026-03-27): 预期差三因子(FCF Yield/SBC覆盖率/品质基金买入) + insider翻正信号。源自7家SaaS预期差横向分析。
> v1.1 (2026-03-26): PEG替代PE作为主估值信号(48份报告验证)

## 三层信号框架

```
L1: 可能便宜了 (35%) — 估值+内部人买入+真实回购
L2: 便宜不是陷阱 (40%) — 盈利质量+盈利能力+资本纪律+F-Score
L3: 市场开始纠错 (25%) — 盈利超预期+分析师修正+价格位置
```

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

#### Phase 3: 信号计算

**PEG筛选 (v1.1, 48份报告验证)**:
```
PEG < 1.5          → L1 +1.0分 (增速被低估)
PEG 1.5-2.0        → L1 +0.5分 (合理)
PEG 2.0-3.0        → L1  0分   (中性)
PEG > 3.0 且 PE<20 → L1 -0.5分 (低增速陷阱)
PEG > 4.0          → L1 -1.0分 (品质陷阱候选)
```

**★ FCF Yield信号 (v1.2新增, 7家SaaS验证 — 对高SBC行业比PE更有意义)**:
```
来源: ADBE(9.3%)/CRM(8.0%)/WDAY(8.2%)在-40%~-54%跌幅中FCF yield创历史新高
      P/E对SaaS失真(SBC使NI偏低), P/FCF和FCF yield更能反映真实盈利能力

计算: FCF Yield = (OCF - CapEx) / Market Cap × 100%

FCF Yield > 8%    → L1 +1.5分 (极罕见=极度低估, ADBE/CRM/WDAY级别)
FCF Yield 5-8%    → L1 +1.0分 (显著低估)
FCF Yield 3-5%    → L1 +0.5分 (偏低估)
FCF Yield 2-3%    → L1  0分   (中性)
FCF Yield < 2%    → L1 -0.5分 (可能仍偏贵, DDOG 2.2%级别)
FCF Yield < 0%    → L1 -2.0分 (FCF为负=现金消耗型, INTC级别)

适用: 所有公司, 但对SBC/Rev>8%的高SBC公司特别重要(替代PE作为主估值锚)
不适用: 金融/银行(FCF定义不同)
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

输出:
- `data/screener/screen_results.json` — 机器可读排名
- `data/screener/screen_report.txt` — 可读报告

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

## 与现有框架的关系

- 筛选结果中的高分股 → 可进入 `/quick-scan` (Tier 1) 做快速诊断
- 确认有兴趣 → `/standard-analysis` (Tier 2) 或 Tier 3 深度研究
- CQI排行榜 (`knowledge/stock_picking/cqi_public_ranking_v4.0.md`) 提供质量验证

## 工具依赖

| 工具 | 用途 | Phase |
|------|------|-------|
| `fmp_data` (path=screener) | 宇宙构建 | 1 |
| `fmp_data` (6 endpoints) | 财务数据采集 | 2 |
| `fmp_data` (insider-trading) | 内部人交易 | 1-2 |
| `baggers_summary` | 深度验证 | 4 |
| `fmp_data` (estimates) | 盈利预测 | 4 |
| `screen_stocks` (value preset) | 备用筛选 | 1 |
| `scripts/screener/run_screen.py` | 信号计算 | 3 |
