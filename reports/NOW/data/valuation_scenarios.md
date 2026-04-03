# ServiceNow (NOW) — 估值场景分析

> 数据收集日期: 2026-03-25 | 当前股价: ~$110 | 市值: ~$122B | 流通股: ~1,046M (split-adjusted)

---

## 1. 当前市场定价: 市场在赌什么?

### Reverse DCF: 隐含假设反推

**当前估值倍数**:
- Forward PE (FY2026E): ~27.6x (Non-GAAP EPS $4.19)
- P/FCF (TTM): ~26.7x ($4.58B FCF)
- EV/Revenue (FY2026E): ~7.2x

**Reverse DCF核心问题**: 以$110股价/~$122B市值, 市场隐含了什么增长+利润假设?

**反推参数** (基于Alpha Spread, GuruFocus, SahmCapital等多源):

| 参数 | 市场隐含假设 | 合理性评估 |
|------|------------|-----------|
| 收入增速(5年CAGR) | ~18-20% | 共识FY2026E +27%, FY2027E +18%, 后续fade至15% |
| 终端增长率 | ~2.5-3.0% | 标准假设 |
| WACC | ~8.5-9.0% | 科技大盘股标准 |
| FCF Margin(终端) | ~33-35% | FY2025已达34%, 基本已实现 |
| 隐含终端收入(2030) | ~$27-30B | 从$13.3B到$30B = 5年CAGR ~18% |

**来源**: [Alpha Spread DCF](https://www.alphaspread.com/security/nyse/now/dcf-valuation), [GuruFocus DCF](https://www.gurufocus.com/stock/NOW/dcf), [SahmCapital Analysis](https://www.sahmcapital.com/news/content/is-servicenow-now-attractive-after-recent-share-price-pullback-and-dcf-valuation-gap-2026-01-14)

**关键发现**:
- Alpha Spread估算公允价值~$96.92/股 (暗示当前~$110小幅高估~13%)
- 另一独立DCF估算内在价值$198/股 (暗示显著低估30%+)
- SahmCapital 2026年3月分析: 低估~29%
- **分歧来源**: 终端倍数假设差异巨大 — 保守派用15-18x FCF, 乐观派用25-30x FCF

**市场隐含的"隐性赌注"**:
1. AI Agent平台不会实质性加速增长(否则当前PE应更高)
2. 宏观/企业IT支出放缓将持续至2026H2
3. Microsoft Copilot等竞争将侵蚀NOW的定价权

---

## 2. 分析师共识与目标价分布

### 目标价分布

| 指标 | 数值 | 来源 |
|------|------|------|
| 分析师数量 | 53 | MarketBeat/StockAnalysis |
| 平均目标价 | $185-$203 | 多源汇总 |
| 最高目标价 | $240-$260 | 最乐观分析师 |
| 最低目标价 | $115 | 最悲观分析师 |
| 中位数目标价 | ~$190 | 估计 |
| 隐含上行空间(平均) | +68-85% | 基于$110 |

**来源**: [MarketBeat](https://www.marketbeat.com/stocks/NYSE/NOW/forecast/), [StockAnalysis](https://stockanalysis.com/stocks/now/forecast/), [TipRanks](https://www.tipranks.com/stocks/now/forecast)

### 评级分布

| 评级 | 占比 |
|------|------|
| Strong Buy | 42% |
| Buy | 48% |
| Hold | 3% |
| Sell | 3% |
| Strong Sell | 3% |

**解读**: 90%买入/强力买入 = 卖方极度看好。但需注意:
- 卖方目标价可能尚未完全反映2026年2-3月的宏观恶化
- $185-$203的平均目标价 vs $110当前价 = 68-85%隐含上行 — 这种幅度在大盘蓝筹中非常罕见
- 最低目标$115 ≈ 当前价, 说明即使最悲观的分析师也不认为NOW显著高估

### 共识财务预测

| 指标 | FY2025A | FY2026E | FY2027E |
|------|---------|---------|---------|
| 收入($B) | $13.28 | $16.88 | $19.98 |
| 收入增速 | +21% | +27% | +18% |
| Non-GAAP EPS | — | $4.19 | $5.56 |
| EPS增速 | — | — | +33% |

**来源**: [Yahoo Finance](https://finance.yahoo.com/quote/NOW/analysis/), [Nasdaq](https://www.nasdaq.com/market-activity/stocks/now/earnings)

**FY2026E收入+27%的含义**: 如果实现, 这意味着NOW的增长实际在加速(FY2025 +21% → FY2026E +27%), 可能反映AI Agent/平台需求的爆发。但+27%显著高于历史趋势, 存在下调风险。

---

## 3. 三场景估值模型

### 场景设计前提

**共同假设**:
- 流通股: ~1,050M (假设年增0.5%, 回购部分抵消)
- WACC: 8.5% | 终端增长率: 2.5%
- 估值锚点年: 2030年(5年前瞻)

---

### Bull Case: AI Platform — $143/股 (+30%)

**核心假设**: ServiceNow成为企业AI Agent的标准平台, AI推动收入增速重新加速到25%+

| 指标 | FY2025A | FY2030E |
|------|---------|---------|
| 收入 | $13.3B | ~$25B |
| 收入CAGR | — | ~14% |
| FCF Margin | 34% | ~36% |
| FCF | $4.6B | ~$9.0B |
| 估值倍数 | — | 25x FCF |
| 隐含EV | — | ~$225B |
| 每股价值(2030) | — | ~$214 |
| 折现到今天(8.5%) | — | **~$143** |

**Bull叙事**:
1. **AI Agent平台垄断**: NOW的workflow引擎天然适配AI Agent编排, 成为企业AI Agent的"操作系统"
2. **NRR重新加速**: AI产品推动NRR从~125%回升到130%+, 存量客户扩展加速
3. **利润率持续扩张**: AI自动化内部运营 → FCF Margin从34%升至36%
4. **TAM扩展**: 从ITSM($50B)扩展到全企业workflow($200B+)
5. **CEO承诺到2030**: McDermott的$20M买入 + 2030承诺 = 战略执行连续性保障

**Bull催化剂**:
- FY2026 Q1/Q2收入增速确认>25%
- AI Agent ACV(年合同额)公布具体数字且增速>100%
- Microsoft/Salesforce的AI Agent平台被证明不如NOW

**Bull风险**:
- AI收入可能蚕食传统ITSM收入(飞轮悖论)
- 25x FCF的终端倍数假设偏激进

---

### Base Case: 稳定增长 — $95/股 (-14%)

**核心假设**: NOW维持20%左右增长但无显著加速, AI是增量但非变革性

| 指标 | FY2025A | FY2030E |
|------|---------|---------|
| 收入 | $13.3B | ~$20B |
| 收入CAGR | — | ~8.5% |
| FCF Margin | 34% | ~34% |
| FCF | $4.6B | ~$6.8B |
| 估值倍数 | — | 20x FCF |
| 隐含EV | — | ~$136B |
| 每股价值(2030) | — | ~$130 |
| 折现到今天(8.5%) | — | **~$95** |

**Base叙事**:
1. **增速自然放缓**: 从21%逐步降至15-17%(大数定律)
2. **AI贡献温和**: AI产品贡献收入但竞争激烈, 未形成垄断
3. **利润率持平**: SBC收敛被AI投资抵消, FCF Margin维持34%
4. **市场给予合理倍数**: 20x FCF反映稳定但非高速增长的SaaS公司

**Base场景意味着**: 当前$110的价格略微高估(~14%), 市场定价基本反映了Base Case + 小幅AI溢价

---

### Bear Case: 增速放缓 + 竞争加剧 — $57/股 (-48%)

**核心假设**: 企业IT支出持续疲软, Microsoft Copilot/Salesforce Agent侵蚀NOW市场份额

| 指标 | FY2025A | FY2030E |
|------|---------|---------|
| 收入 | $13.3B | ~$17B |
| 收入CAGR | — | ~5% |
| FCF Margin | 34% | ~30% |
| FCF | $4.6B | ~$5.1B |
| 估值倍数 | — | 15x FCF |
| 隐含EV | — | ~$77B |
| 每股价值(2030) | — | ~$73 |
| 折现到今天(8.5%) | — | **~$57** |

**Bear叙事**:
1. **Microsoft替代**: Copilot + Power Automate蚕食NOW的ITSM和workflow市场
2. **NRR下降**: 客户预算紧缩 → NRR降至115%以下 → 增长引擎熄火
3. **AI投资ROI不及预期**: 大量AI投入但客户不愿付费 → 利润率压缩
4. **宏观持续恶化**: 企业IT支出进入衰退周期, 新签合同大幅放缓
5. **人才竞争**: AI人才争夺战推高SBC, 收敛趋势逆转

**Bear催化剂**:
- FY2026 Q1收入增速<20%(低于共识+27%)
- 大客户(F500)续约率显著下降
- Microsoft宣布IT workflow整合到365/Copilot

---

## 4. 概率加权期望值

| 场景 | 目标价 | 概率 | 加权 | 依据 |
|------|--------|------|------|------|
| Bull | $143 | 30% | $42.9 | AI平台叙事有潜力但未验证 |
| Base | $95 | 50% | $47.5 | 大数定律+历史趋势最可能 |
| Bear | $57 | 20% | $11.4 | 宏观风险真实但NOW护城河深 |
| **加权EV** | | | **$101.8** | |

**期望回报**: ($101.8 - $110) / $110 = **-7.5%**

**解读**: 概率加权后NOW接近合理估值, 略微偏高估。这与Forward PE ~27.6x的信号一致 — 对于20%增长的SaaS公司, 27x并非便宜但也非泡沫。

### 概率赋值依据

**Bull 30%的依据**:
- AI Agent是真实趋势, NOW的workflow引擎有结构性优势
- CEO $20M买入 = 内部人认为Bull Case可能性显著
- 但AI收入规模化尚需时间, FY2026数据点不足以确认

**Base 50%的依据**:
- 历史SaaS大公司(Salesforce, Adobe)的增速放缓路径高度可预测
- NOW从$13B到$20B的增长路径(+50%)与行业基准一致
- 最可能的结果 = 稳定增长但无惊喜

**Bear 20%的依据**:
- Microsoft的AI+workflow整合是真实竞争威胁
- 宏观不确定性(利率/衰退)真实存在
- 但NOW的转换成本极高(企业更换ITSM平台≈换ERP), 限制了Bear的概率

---

## 5. 估值敏感性分析

### 敏感性矩阵: 股价 = f(2030E FCF, 终端FCF倍数)

| FCF倍数 \ 2030E FCF | $5.0B | $6.0B | $7.0B | $8.0B | $9.0B |
|---------------------|-------|-------|-------|-------|-------|
| **15x** | $50 | $60 | $70 | $81 | $91 |
| **18x** | $60 | $73 | $85 | $97 | $109 |
| **20x** | $67 | $81 | $94 | $108 | $121 |
| **22x** | $74 | $89 | $104 | $119 | $133 |
| **25x** | $84 | $101 | $118 | $134 | $151 |

*注: 折现率8.5%, 5年折现, 流通股~1,050M*

**当前股价$110对应的隐含组合**:
- 20x FCF + $8.0B FCF ≈ $108 (接近当前价)
- 18x FCF + $9.0B FCF ≈ $109 (接近当前价)
- 22x FCF + $7.0B FCF ≈ $104 (接近当前价)

**解读**: 市场隐含NOW到2030年FCF达到$7-8B(从$4.6B翻倍), 给予18-22x终端倍数。这个假设合理但不便宜。

### 关键变量敏感度排序

| 变量 | ±1单位变化 | 对股价影响 | 优先级 |
|------|-----------|-----------|--------|
| 终端FCF倍数 | ±3x | ±$15-20 | **最高** |
| 收入CAGR | ±2pp | ±$12-15 | 高 |
| FCF Margin | ±2pp | ±$8-10 | 中 |
| WACC | ±50bps | ±$5-8 | 中 |
| 流通股稀释 | ±0.5%/年 | ±$3-5 | 低 |

**最大不确定性**: 终端倍数。15x vs 25x的差异 = $50/股 vs $151/股。投资者对NOW的长期竞争地位(是否保持护城河)的判断, 比短期增速预测重要得多。

---

## 6. 拆股调整后的历史估值上下文

### 拆股细节

| 项目 | 数值 |
|------|------|
| 拆股比例 | 5-for-1 |
| 批准日期 | 2025年12月 |
| 生效日期 | 2025-12-18 |
| 拆股前价格 | ~$850/股 |
| 拆股后价格 | ~$170/股 |
| 当前价格(2026-03) | ~$110/股 |
| 拆股后跌幅 | ~-35% |

**来源**: [ServiceNow Newsroom](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Shareholders-Approve-5-for-1-Stock-Split/default.aspx)

### 历史估值区间(split-adjusted)

| 时点 | 股价(adj.) | Forward PE | P/FCF | 事件 |
|------|-----------|-----------|-------|------|
| 2024-01 | ~$140 | ~60x | ~45x | AI叙事高峰 |
| 2025-07 (52wk high) | $211 | ~45x | ~35x | 增长重新加速 |
| 2026-02 (52wk low) | $98 | ~23x | ~21x | 宏观恐慌+科技股抛售 |
| 2026-03 (当前) | $110 | ~27.6x | ~26.7x | 部分反弹 |

**历史估值中位数**: NOW的5年Forward PE中位数约35-40x。当前27.6x处于历史低端, 说明市场对增长前景的信心低于历史平均。

**估值压缩幅度**: 从2024年初的60x压缩到当前27.6x = **-54%估值压缩**。这意味着即使收入继续增长20%+, 股价可能不涨——除非估值倍数重新扩张。

---

## 7. 与DDOG估值的交叉参考

作为DDOG分析的标杆参考, NOW的估值数据提供以下对标锚点:

| 指标 | NOW | DDOG(参考) | 含义 |
|------|-----|-----------|------|
| Forward PE | ~27.6x | ~待确认 | NOW更成熟, 通常给更低PE |
| 收入增速 | ~21-27% | ~20-25% | 增速接近 |
| FCF Margin | 34% | ~20-25% | NOW利润率远超 |
| SBC/Rev | 14.7% | ~22% | NOW已收敛, DDOG未收敛 |
| P/FCF | ~26.7x | ~待确认 | NOW FCF质量更高 |
| CEO内部人买入 | $20M open market | 无 | NOW信号更强 |

**对DDOG的估值含义**:
1. 如果DDOG增速与NOW相当, 但SBC/Rev高7pp + FCF Margin低10pp → DDOG不应获得更高倍数
2. NOW的SBC收敛路径(19%→15%/4年)是DDOG应该对标的"可能路径", 但DDOG过去4年零收敛 → 需要解释为什么未来会不同
3. NOW CEO的$20M买入是内部人信心的强信号; DDOG如果缺乏类似信号, 在管理层信心维度上得分更低

---

## 8. 关键监控指标 (影响估值场景概率的信号)

### Bull Case确认信号 (概率从30%上调)

| 信号 | 当前状态 | 触发阈值 |
|------|---------|---------|
| AI Agent ACV增速 | 未公布具体数字 | 公布且>100% YoY |
| FY2026E收入增速 | 共识+27% | Q1实际>25% |
| NRR趋势 | ~125% | 回升至>128% |
| F500客户数 | ~85%渗透 | AI推动wallet share扩大 |

### Bear Case确认信号 (概率从20%上调)

| 信号 | 当前状态 | 触发阈值 |
|------|---------|---------|
| FY2026 Q1收入增速 | 共识+27% | 实际<20% |
| Microsoft ITSM份额 | 小 | 可观测的份额增长 |
| 大客户流失 | 未知 | 任何F100客户迁移到竞品 |
| SBC/Rev趋势逆转 | 14.7%下降中 | 回升至>16% |

---

## 附录: 数据源清单

- [Alpha Spread DCF](https://www.alphaspread.com/security/nyse/now/dcf-valuation)
- [GuruFocus DCF](https://www.gurufocus.com/stock/NOW/dcf)
- [SahmCapital Analysis Jan 2026](https://www.sahmcapital.com/news/content/is-servicenow-now-attractive-after-recent-share-price-pullback-and-dcf-valuation-gap-2026-01-14)
- [SahmCapital Analysis Mar 2026](https://www.sahmcapital.com/news/content/is-servicenow-now-pricing-reflect-its-recent-slide-and-large-cap-tech-sentiment-shift-2026-03-11)
- [HatedMoats DCF Analysis](https://hatedmoats.substack.com/p/servicenow-dcf-valuation)
- [ValuSense Reverse DCF](https://valuesense.io/ticker/now/intrinsic-value-tools/reverse-dcf-calculator)
- [MarketBeat Forecast](https://www.marketbeat.com/stocks/NYSE/NOW/forecast/)
- [StockAnalysis Forecast](https://stockanalysis.com/stocks/now/forecast/)
- [TipRanks Forecast](https://www.tipranks.com/stocks/now/forecast)
- [Yahoo Finance Analysis](https://finance.yahoo.com/quote/NOW/analysis/)
- [MacroTrends FCF](https://www.macrotrends.net/stocks/charts/NOW/servicenow/free-cash-flow)
- [StockAnalysis Statistics](https://stockanalysis.com/stocks/now/statistics/)
- [ServiceNow Newsroom - Stock Split](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Shareholders-Approve-5-for-1-Stock-Split/default.aspx)
- [Capital.com - Stock Split Analysis](https://capital.com/en-int/analysis/servicenow-stock-split)
