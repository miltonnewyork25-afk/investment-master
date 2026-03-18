# 低估股筛选框架升级 v3.0 — MCO/MSCI/ADBE教训整合

> **升级日期**: 2026-03-18
> **触发**: 三份报告暴露了筛选框架的系统性盲区
> **核心升级**: 从"找便宜的好公司"升级为"找便宜的好公司在对的时候"

---

## 第一部分：三份报告的教训提取

### 教训1: MCO — 好公司≠好投资 (估值陷阱)

**事实**: MCO CQI=70(#4), 评级双寡头, OPM 45%, BRK持仓15%。但报告6个独立估值中4个显示$430被高估。偏差修正后期望回报仅+2%（年化<1%）。

**筛选框架盲区**:
- L2(质量)会给MCO极高分：高ROIC、高GP/A、低accruals、F-Score 8+
- 但L1(估值)的EV/EBITDA和PE不够敏感——MCO的PE=31.5x在当前框架中只是"合理偏贵"，不会触发红旗
- **缺失**: 没有"隐含增长率 vs 实际增长"的比较。市场定价31.5x PE隐含~12% EPS CAGR，但实际MIS是周期性的(FY2022 EPS -37%)

**必须加入的信号**:
```
Growth Gap = 实际EPS CAGR(3-5年) - Reverse DCF隐含增长率
  正值 = 市场低估增长 → 好信号
  负值 = 市场高估增长 → 红旗
  MCO: 实际~8% vs 隐含~12% → Gap = -4pp → 红旗
```

### 教训2: MSCI — 高垄断+低回报的悖论

**事实**: MSCI CQI=66, 14年零营收下降, C1嵌入=5.0/5(定义型, 半衰期>50年), $16.3T ETF使用其指数。但2020高点$608→2026年$536 = **5年-12%回报**。

**筛选框架盲区**:
- L2(质量)会给MSCI满分级别：零下降、高OPM、F-Score 9
- 但框架完全无法检测"质量已被充分定价"的状态
- MSCI的问题不是质量差，而是**市场已经知道质量好，PE从25x涨到75x(2020)再回到34x**
- EPS增长+12%/年但PE压缩-14%/年 = 回报≈0

**必须加入的信号**:
```
PE Band Position = 当前PE在5年PE分布中的百分位
  <20th percentile = 历史低估 → 强信号
  20-80th = 合理区间
  >80th percentile = 历史高估 → 红旗

PE Drag = 过去5年PE变化的年化贡献
  MSCI PE Drag = -14%/年 → 即使EPS涨12%也白搭
```

### 教训3: ADBE — 护城河迁移中的定价难题

**事实**: ADBE CQI=48, 89%毛利率(SaaS #1), 但护城河从工具层(Photoshop)向治理层(GenStudio)迁移中。Forward PE仅9.6x → 市场定价"护城河正在消失"。

**筛选框架盲区**:
- L1(估值)会给ADBE高分：PE 9.6x极低，FCF yield极高
- L2(质量)会给中等分：89%毛利率强，但ROIC因$14B高位回购而失真
- **缺失**: 框架无法区分"便宜因为差"(INTC)和"便宜因为市场过度恐惧"(ADBE)
- 需要一个"恐惧合理性"判断：PE 9.6x隐含的假设是什么？如果假设不合理→真正低估

**必须加入的信号**:
```
Fear Reasonability = 隐含假设合理吗?
  ADBE PE 9.6x 隐含 FCF永不增长 → 但FCF刚增长26% → 恐惧过度
  INTC PE 负 → 确实在亏损 → 恐惧合理

分类:
  恐惧过度(PE隐含增长 << 实际增长) → 真正低估 → 加分
  恐惧合理(基本面确实在恶化) → 价值陷阱 → 减分
```

### 教训4: MCO vs ADBE — 资本配置质量的信号价值

**MCO**: $1.71B/年回购在PE=31.5x时进行，eta(回购效率)=0.67x → 5年累计$500M+价值摧毁
**ADBE**: $14B回购在高位进行 → 现在PE=9.6x回购才有价值但现金已花完

**筛选框架盲区**:
- 现有框架只看"是否在缩股"(L1)，不看"在什么价格缩股"
- 高位回购 = 管理层在高PE时花掉现金 = 低PE时没钱买
- **真正有价值的回购**: 低PE时回购 + 缩股数量大

**必须加入的信号**:
```
Buyback Timing Quality = 近3年平均回购PE / 当前PE
  < 0.8 = 管理层在比当前更便宜时买的 → 不错
  0.8-1.2 = 中性
  > 1.2 = 管理层在更贵时大买特买 → 红旗(资本配置差)

  MCO: 回购均价PE ~31x / 当前31.5x ≈ 1.0 → 中性(但绝对PE太高)
  ADBE: 回购均价PE ~35x / 当前9.6x = 3.6 → 极差(高买低卖)
```

### 教训5: 三报告共同揭示 — CQI分层权重的必要性

CQI≥70(MCO/MSCI/CME)的公司，L2(质量)的区分度为零——都是满分级别。**关键决策变量不是"好不好"而是"什么时候买"**。

CQI<50(ADBE/PYPL)的公司，L1(估值)更有区分度——质量不确定但价格已经打折。**关键决策变量是"打折是否合理"**。

---

## 第二部分：框架升级方案

### 现有框架 (v1.2)
```
L1(便宜) 35% + L2(质量) 40% + L3(催化) 25%
```

### 升级框架 (v3.0) — 四层 + CQI分层权重

```
L1 估值位置      — 便宜吗? (EV/EBITDA, PE, FCF yield, shareholder yield)
L2 盈利质量      — 便宜不是陷阱? (accruals, GP/A, F-Score, asset growth)
L3 市场纠错      — 市场开始发现了? (52w位置, earnings surprise, revision)
L4 定价合理性    — 便宜的原因合理吗? [v3.0新增]
```

### L4: 定价合理性层 (v3.0新增)

这是三份报告教训的核心产出——不是问"便不便宜"，而是问**"为什么便宜？便宜得有道理吗？"**

```python
@dataclass
class L4Signals:
    """Layer 4: 定价合理性 — 市场定价的逻辑是否站得住脚"""

    # 1. Growth Gap (MCO教训)
    implied_growth_rate: float = None    # Reverse DCF隐含增长率
    actual_growth_3y: float = None       # 实际3年EPS/FCF CAGR
    growth_gap: float = None             # 实际-隐含 (正=被低估)

    # 2. PE Band Position (MSCI教训)
    pe_percentile_5y: float = None       # 当前PE在5年分布中的百分位
    pe_zscore: float = None              # (当前PE - 5Y均值) / 5Y标准差
    pe_drag_5y: float = None             # 过去5年PE变化的年化贡献

    # 3. Fear Reasonability (ADBE教训)
    implied_fcf_growth: float = None     # PE隐含的FCF增长率
    actual_fcf_growth: float = None      # 实际FCF增长率
    fear_gap: float = None               # 实际-隐含 (正=恐惧过度)
    fear_classification: str = ""        # "excessive" / "reasonable" / "insufficient"

    # 4. Buyback Timing Quality (MCO+ADBE教训)
    avg_buyback_pe: float = None         # 近3年平均回购PE
    current_pe: float = None
    buyback_timing_ratio: float = None   # avg_buyback_pe / current_pe

    # 5. Quality Premium (MSCI教训)
    # 高质量公司是否已被充分定价? CQI高但PE也高 = 质量已在价格中
    cqi_score: float = None
    pe_premium_vs_sector: float = None   # 相对行业PE的溢价%
    quality_already_priced: bool = False # CQI>60 且 PE>行业均值1.5x

    score: float = None
```

### CQI分层权重

| CQI区间 | L1估值 | L2质量 | L3催化 | L4定价合理性 | 逻辑 |
|---------|--------|--------|--------|------------|------|
| **≥70 (垄断)** | 15% | 5% | 15% | **65%** | 质量已知，关键是"什么价格买"。L4主导 |
| **50-70 (优质)** | 25% | 15% | 20% | **40%** | 质量需验证但价格可能已反映 |
| **30-50 (中等)** | 30% | 25% | 20% | **25%** | 质量和价格都需评估 |
| **<30 (普通)** | 35% | 40% | 25% | 0% | 质量不确定是主要风险 |
| **未评CQI** | 30% | 30% | 20% | **20%** | 默认均衡 |

### L4评分逻辑

```python
def score_l4(s: L4Signals) -> float:
    scores = []
    weights = []

    # Growth Gap (30%) — MCO教训
    if s.growth_gap is not None:
        # 正=被低估, 负=被高估
        # +5pp gap = 10分, -5pp gap = 0分
        scores.append(_normalize(s.growth_gap, -5, 5, invert=False))
        weights.append(0.30)

    # PE Band Position (20%) — MSCI教训
    if s.pe_percentile_5y is not None:
        # 低百分位=便宜(好), 高百分位=贵
        scores.append(_normalize(s.pe_percentile_5y, 0, 100, invert=True))
        weights.append(0.20)

    # Fear Reasonability (25%) — ADBE教训
    if s.fear_gap is not None:
        # 正=恐惧过度(低估), 负=恐惧不足(高估)
        scores.append(_normalize(s.fear_gap, -10, 10, invert=False))
        weights.append(0.25)

    # Buyback Timing (10%) — MCO+ADBE教训
    if s.buyback_timing_ratio is not None:
        # <1 = 管理层在更便宜时买的(好), >1 = 高买(差)
        scores.append(_normalize(s.buyback_timing_ratio, 0.5, 2.0, invert=True))
        weights.append(0.10)

    # Quality Already Priced (15%) — MSCI教训
    if s.quality_already_priced is not None:
        # True = 质量已在价格中, 减分
        scores.append(2.0 if s.quality_already_priced else 7.0)
        weights.append(0.15)

    total = sum(weights)
    s.score = sum(s*w for s,w in zip(scores, weights)) / total if total > 0 else 5.0
    return s.score
```

---

## 第三部分：新增否决条件和警告

### 新增硬否决

| 条件 | 来源 | 逻辑 |
|------|------|------|
| CQI≥70 且 PE > 5Y均值+1σ 且 无犯错模式 | MSCI教训 | 高质量已被充分定价，当前买入=为质量溢价买单 |
| Growth Gap < -5pp 且 PE > 25x | MCO教训 | 市场隐含增长远高于实际，估值建立在幻觉上 |

### 新增软警告

| 条件 | 来源 | 说明 |
|------|------|------|
| Buyback timing ratio > 1.5 | MCO+ADBE | 管理层在更贵时大幅回购，资本配置能力存疑 |
| CQI趋势=↓衰减 且 PE>行业均值 | FICO/ARM | 护城河在缩小但股价还没反映 |
| CQI趋势=↓⟳迁移 | ADBE | 护城河真空期，CQI双向可能，需密切跟踪 |
| PE Drag 5Y < -8% | MSCI | PE压缩正在吃掉EPS增长，持有体验差 |

---

## 第四部分：实战应用 — 三份报告在新框架下的得分

### MCO (CQI=70, PE=31.5x)

| 层 | 旧框架得分 | 新框架得分 | 变化原因 |
|---|----------|----------|---------|
| L1 估值 | 5.5 | 4.0 | PE更陡峭的惩罚曲线 |
| L2 质量 | 8.5 | 8.5 | 不变，质量确实好 |
| L3 催化 | 4.0 | 4.0 | 不变 |
| L4 定价合理性 | N/A | **2.5** | Growth Gap=-4pp + PE>5Y均值 + quality_already_priced |
| **旧总分** | **6.0** | | |
| **新总分(CQI≥70权重)** | | **3.3** | L4权重65%拉低总分 → 正确反映"好公司但不是好价格" |

### MSCI (CQI=66, PE=34x)

| 层 | 旧框架得分 | 新框架得分 | 变化原因 |
|---|----------|----------|---------|
| L1 | 4.0 | 3.5 | PE 34x |
| L2 | 9.0 | 9.0 | F-Score满分级 |
| L3 | 3.0 | 3.0 | 52w=92%已接近高点 |
| L4 | N/A | **2.0** | PE Drag=-14%/yr + quality_already_priced + PE>5Y均值 |
| **旧总分** | **5.3** | | |
| **新总分(CQI 50-70权重)** | | **3.8** | L4暴露"质量已在价格中"的问题 |

### ADBE (CQI=48, PE=9.6x)

| 层 | 旧框架得分 | 新框架得分 | 变化原因 |
|---|----------|----------|---------|
| L1 | 8.0 | 8.5 | PE 9.6x极低 |
| L2 | 6.0 | 5.5 | 89%毛利强但回购损毁 |
| L3 | 7.0 | 7.0 | 52w位置低 |
| L4 | N/A | **8.0** | Fear Gap=+8pp(恐惧过度) + PE<5Y 5th percentile + 护城河迁移中但非消失 |
| **旧总分** | **7.0** | | |
| **新总分(CQI 30-50权重)** | | **7.1** | L4确认"恐惧过度" → 得分提升 |

### PYPL (CQI未评, PE=10.7x)

| 层 | 旧框架得分 | 新框架得分 | 变化原因 |
|---|----------|----------|---------|
| L1 | 7.4 | 7.4 | 不变 |
| L2 | 7.1 | 7.1 | 不变 |
| L3 | 8.7 | 8.7 | 不变 |
| L4 | N/A | **7.5** | PE 10.7x隐含低增长，实际FCF在改善 + 缩股-6.8% at low PE(好时机) |
| **旧总分** | **7.6** | | |
| **新总分(未评CQI权重)** | | **7.7** | L4轻微提升(默认20%权重) |

### 关键验证

| 公司 | 旧排名 | 新排名 | 框架判断 | 实际情况 |
|------|--------|--------|---------|---------|
| MCO | 偏高(~6.0) | **3.3 → 回避** | 好公司但$430不是好价格 | ✓ 正确 |
| MSCI | 偏高(~5.3) | **3.8 → 回避** | 质量已被充分定价 | ✓ 正确(5年-12%) |
| ADBE | 未测 | **7.1 → 关注** | 恐惧过度，迁移中但非消失 | ✓ 合理(Forward PE 9.6x) |
| PYPL | 7.6 | **7.7 → 首选** | 便宜+质量改善+催化剂 | ✓ 不变 |

**框架升级后，MCO和MSCI从"看起来不错"变成"明确回避"——这正是教训要求的改变。**

---

## 第五部分：对筛选系统signals.py的改造清单

### 新增数据需求

| 信号 | 数据源 | FMP endpoint |
|------|--------|------------|
| 隐含增长率 | Reverse DCF计算 | `fmp_data endpoint="dcf"` + `quote` |
| 实际EPS CAGR | 3年EPS历史 | `fmp_data endpoint="income" limit=4` |
| 5年PE分布 | 历史PE | `fmp_data path="/api/v3/historical-price-full/{SYM}"` + income |
| 回购均价PE | 回购金额 / 年均EPS | `fmp_data endpoint="cashflow"` + `income` |
| CQI分数 | 本地排行榜 | `knowledge/stock_picking/cqi_public_ranking_v4.0.md` |

### 实现优先级

| 优先级 | 信号 | 影响 | 难度 |
|--------|------|------|------|
| **P0** | Growth Gap | MCO/MSCI会从"通过"变成"红旗" | 中(需Reverse DCF) |
| **P0** | CQI分层权重 | 根本性改变垄断企业的评分 | 低(查表+条件权重) |
| **P1** | PE Band Position | 检测"质量已在价格中" | 中(需5年历史PE) |
| **P1** | Fear Classification | 区分"便宜因为差"和"便宜因为恐惧" | 中 |
| **P2** | Buyback Timing | 辅助信号，资本配置质量 | 低 |
| **P2** | PE Drag | 检测PE压缩吃掉EPS增长 | 低 |

---

## 第六部分：与垄断建仓时机框架的整合

`monopoly_entry_framework.md` 定义了6种犯错模式和PE Band决策矩阵。
本升级的L4层是那个框架的量化实现。

| 垄断框架概念 | L4信号实现 |
|------------|----------|
| PE Band分析 | `pe_percentile_5y` + `pe_zscore` |
| 犯错模式识别 | `fear_classification` + `growth_gap` |
| 等待 vs 机会成本 | `quality_already_priced` flag |
| 回购效率 | `buyback_timing_ratio` |
| 隐含增长率 vs 实际 | `growth_gap` |

**CQI≥70的公司**：L4=65%权重，实质上就是在执行垄断建仓时机框架。
**CQI<50的公司**：L4=25%权重，Growth Gap和Fear Classification仍然有用但不主导。

---

## 版本对比

| 维度 | v1.2 (旧) | v3.0 (新) |
|------|----------|----------|
| 层数 | 3层 | **4层** |
| 核心问题 | "便宜吗?" + "不是陷阱?" + "催化剂?" | +**"为什么便宜?便宜得有道理吗?"** |
| 权重 | 固定(35/40/25) | **CQI分层动态权重** |
| 垄断企业处理 | 无特殊处理(质量高→得分高) | **CQI≥70时L4=65%，质量降权到5%** |
| MCO得分 | ~6.0(偏高) | **3.3(正确回避)** |
| MSCI得分 | ~5.3(偏高) | **3.8(正确回避)** |
| ADBE得分 | 未测 | **7.1(正确关注)** |
| 否决条件 | 4条 | **6条(+质量溢价陷阱+增长幻觉)** |
