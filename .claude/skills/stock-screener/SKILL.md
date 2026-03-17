---
name: stock-screener
description: 低估股多信号筛选Agent — 三层信号框架(便宜/不是陷阱/纠错)
trigger: /screen
---

# 低估股筛选Agent v1.0

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
1. fmp_data path="/stable/stock-screener?marketCapMoreThan=2000000000&marketCapLowerThan=500000000000&priceEarningsRatioLowerThan=15&betaMoreThan=0&limit=50" → 低PE中盘
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

- 债务驱动回购 (net debt增加 + shares减少)
- F-Score ≤ 3 (财务体质弱)
- 资产增长 > 20% (可能在盲目扩张)
- 单一insider buy金额 < $100K (信号弱)

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
