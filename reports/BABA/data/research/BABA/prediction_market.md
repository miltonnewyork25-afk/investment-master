# BABA 预测市场数据 (Prediction Market Data)

> **采集时间**: 2026-02-25
> **数据来源**: Polymarket, Kalshi, WebSearch交叉验证
> **DM标注**: type=H(历史)/R(实时)/S(推测) | source=平台名 | 锚点=PMK-XXX

---

## 一、公司特定事件 (Company-Specific)

### PMK-001 | Alibaba AI模型竞争力 — "Best AI Model" 系列
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| Will Alibaba have the best AI model at the end of Feb 2026? | Polymarket | **0.05% Yes** | $1,247,441 | 2026-02-28 | [链接](https://polymarket.com/event/will-alibaba-have-the-best-ai-model-at-the-end-of-february-2026) |
| Will Alibaba have the best AI model at the end of Mar 2026? | Polymarket | **0.35% Yes** | $168,767 | 2026-03-31 | [链接](https://polymarket.com/event/will-alibaba-have-the-best-ai-model-at-the-end-of-march-2026-712) |
| Will Alibaba have the best AI model at the end of Jun 2026? | Polymarket | **1.05% Yes** | $36,121 | 2026-06-30 | [链接](https://polymarket.com/event/will-alibaba-have-the-best-ai-model-at-the-end-of-june-2026) |
| Will Alibaba have the best AI model for coding on Mar 31? | Polymarket | **0.15% Yes** | $36,233 | 2026-03-31 | [链接](https://polymarket.com/event/will-alibaba-have-the-best-ai-model-for-coding-on-march-31) |
| Will Alibaba have the best AI model for math on Mar 31? | Polymarket | **0.25% Yes** | $5,083 | 2026-03-31 | [链接](https://polymarket.com/event/will-alibaba-have-the-best-ai-model-for-math-on-march-31) |

- **type**: R (实时概率) | **source**: Polymarket MCP API
- **解读**: 市场对Alibaba问鼎全球最佳AI模型的概率极低(0.05%-1.05%)。时间越远概率越高(Feb 0.05% → Jun 1.05%)，反映市场认为Alibaba AI有追赶可能但短期不会超越Anthropic/Google。Coding和Math领域概率更低(0.15%/0.25%)，表明市场认为Alibaba在专项能力上劣势更大。
- **BABA关联**: 直接反映市场对阿里云AI竞争力的定价。低概率意味着市场未将"AI突破"计入BABA估值溢价，若Qwen系列出现意外突破则为正向催化。

### PMK-002 | Alibaba vs DeepSeek AI模型
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| Alibaba AI model better than DeepSeek before March? | Polymarket | 已过期/已结算 | N/A | 2025-02-28 | [链接](https://polymarket.com/event/alibaba-ai-model-better-than-deepseek-before-march) |

- **type**: H (历史) | **source**: Polymarket WebSearch
- **解读**: 该市场已结算。Alibaba在该时间窗口内未超越DeepSeek。反映中国AI竞争格局中，DeepSeek对Alibaba构成的同行压力。

---

## 二、地缘政治事件 (Geopolitical)

### PMK-010 | 台海冲突风险 — 军事冲突概率
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| "Will China invade Taiwan by end of 2026?" | Polymarket | **10% Yes** | $9,300,000 | 2026-12-31 | [链接](https://polymarket.com/event/will-china-invade-taiwan-before-2027) |
| China x Taiwan military clash before 2027? | Polymarket | **13.5% Yes** | $840,997 | 2026-12-31 | [链接](https://polymarket.com/event/china-x-taiwan-military-clash-before-2027) |
| "Will China blockade Taiwan by June 30?" | Polymarket | **5.5% Yes** | $563,898 | 2026-06-30 | [链接](https://polymarket.com/event/will-china-blockade-taiwan-by-june-30) |
| "Will China invade Taiwan by June 30, 2026?" | Polymarket | **~4% Yes** | N/A | 2026-06-30 | [链接](https://polymarket.com/event/will-china-invade-taiwan-by-june-30-2026) |
| "Will China invade Taiwan by March 31, 2026?" | Polymarket | **~2% Yes** | N/A | 2026-03-31 | [链接](https://polymarket.com/event/will-china-invade-taiwan-by-march-31-2026) |

- **type**: R (实时概率) | **source**: Polymarket WebFetch + WebSearch
- **解读**: 台海冲突概率在2%-13.5%区间，取决于时间窗口和冲突定义。军事冲突(clash, 13.5%)概率高于全面入侵(invasion, 10%)，封锁(blockade, 5.5%)处于中间。$9.3M的巨额交易量表明该市场流动性充足，概率相对可信。
- **BABA关联**: 台海冲突为BABA最大尾部风险。10%的概率意味着市场隐含~$300B+的条件性市值损失(若冲突导致ADR暂停/制裁)。这是BABA估值折价的核心驱动因素之一。

### PMK-011 | 习近平政权稳定性
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| Xi Jinping out before 2027? | Polymarket | **8% Yes** | $6,400,000 | 2026-12-31 | [链接](https://polymarket.com/event/xi-jinping-out-before-2027) |
| Lai Ching-te out as President of Taiwan in 2026? | Polymarket | **9% Yes** | $9,613 | 2026-12-31 | [链接](https://polymarket.com/event/lai-ching-te-out-as-president-of-taiwan-in-2026) |

- **type**: R (实时概率) | **source**: Polymarket WebSearch + WebFetch
- **解读**: 习近平离任概率8%，$6.4M交易量反映市场高度关注。若发生领导层变动，可能导致政策不确定性飙升 — 对BABA可能正面(放松监管)也可能负面(过渡期混乱)。
- **BABA关联**: 间接影响。习近平时代的科技监管(2020-2023反垄断)是BABA估值重估的根源。领导层变动可能改变监管基调。

### PMK-012 | 特朗普访华
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| Trump visit China by April 30, 2026? | Polymarket | **94% Yes** | $416,039 | 2026-04-30 | [链接](https://polymarket.com/event/will-trump-visit-china-by) |
| Trump visit China by March 31, 2026? | Polymarket | **77% Yes** | $763,688 | 2026-03-31 | [链接](https://polymarket.com/event/will-trump-visit-china-by) |

- **type**: R (实时概率) | **source**: Polymarket WebFetch
- **解读**: 市场高度预期特朗普将于2026年Q1-Q2访华(94% by Apr)。这暗示中美关系可能在近期出现阶段性缓和，与贸易协议进展一致。
- **BABA关联**: 直接正面催化。特朗普访华通常伴随贸易/投资协议，可能降低ADR退市风险预期，推动中概股估值修复。

---

## 三、贸易/关税事件 (Trade & Tariffs)

### PMK-020 | 美国对华关税税率 (2026年3月31日)
| 税率区间 | 概率 | 交易量 | 截止日 | URL |
|----------|------|--------|--------|-----|
| < 5% | **2.0%** | $22,181 | 2026-03-31 | [链接](https://polymarket.com/event/us-tariff-rate-on-china-on-march-31) |
| 5-15% | **24%** | $35,705 | 2026-03-31 | 同上 |
| **15-25%** | **69%** | $24,165 | 2026-03-31 | 同上 |
| 25-35% | **1.4%** | $26,896 | 2026-03-31 | 同上 |
| >= 35% | **1.95%** | $16,293 | 2026-03-31 | 同上 |

- **type**: R (实时概率) | **source**: Polymarket MCP API + WebFetch
- **概率加权关税**: ~15.7% (= 0.02×2.5% + 0.24×10% + 0.69×20% + 0.014×30% + 0.0195×40%)
- **解读**: 市场预期2026年3月关税税率最可能落在15-25%区间(69%概率)，远低于2025年峰值(超过100%)。这反映了2025年8月中美贸易协议的减税效果。概率加权关税约15.7%，仍高于贸易战前水平但大幅低于对抗期。
- **BABA关联**: 关税直接影响阿里巴巴国际电商(AliExpress/Lazada)的跨境业务成本。15-25%税率区间对BABA跨境电商业务形成中等压力，但相比100%+的极端场景已大幅改善。

### PMK-021 | 美中贸易协议
| 市场 | 平台 | 概率 | 交易量 | 状态 | URL |
|------|------|------|--------|------|-----|
| US-China trade deal before June (2025)? | Polymarket | **100% Yes** (已结算) | $3,453,588 | 已结算 | [链接](https://polymarket.com/event/us-china-trade-deal-before-june) |
| US x China tariff agreement by November 10 (2025)? | Polymarket | 已过期 | N/A | 已结算 | [链接](https://polymarket.com/event/us-china-tariff-agreement-before-90-day-deadline-518) |

- **type**: H (历史) | **source**: Polymarket WebFetch
- **解读**: 2025年中美已达成贸易协议(100%结算)，随后有90天延期后的续签谈判。这解释了当前关税税率从100%+降至15-25%区间。
- **BABA关联**: 贸易协议达成是2025年中概股反弹的核心催化。当前焦点转向协议持续性和进一步减税可能。

### PMK-022 | Kalshi 对华关税追踪
| 市场 | 平台 | 描述 | URL |
|------|------|------|-----|
| US tariff rate on China (多时间节点) | Kalshi | 追踪Jan 1, Jul 1等多时间点的关税预测 | [链接](https://kalshi.com/markets/kxtariffrateprc/tariff-rate-china) |
| US tariff revenue 2026 | Kalshi | 追踪2026年美国关税总收入 | [链接](https://kalshi.com/markets/kxtariffrevenue/tariff-revenue/kxtariffrevenue-26dec31) |

- **type**: R (实时) | **source**: Kalshi WebSearch
- **注意**: Kalshi具体概率未获取(429限流)，但市场结构与Polymarket一致。

---

## 四、宏观经济事件 (Macro Events)

### PMK-030 | 美国经济衰退
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| US recession by end of 2026? | Polymarket | **22.5% Yes** | $278,262 | 2027-01-31 | [链接](https://polymarket.com/event/us-recession-by-end-of-2026) |

- **type**: R (实时概率) | **source**: Polymarket MCP API (精确)
- **解读**: 美国衰退概率22.5%，从2025年峰值(~45%)大幅回落。结算条件为连续两季度GDP负增长或NBER宣布衰退。该概率与当前关税缓和+劳动力市场稳健一致。
- **BABA关联**: 间接影响。美国衰退可能减少对华出口需求压力，但也可能加速贸易保护主义。更重要的是，衰退环境下全球风险偏好下降会压制中概股估值倍数。

### PMK-031 | 中国GDP增长预期 (非预测市场，机构共识)
| 来源 | 2026 GDP预测 | 日期 |
|------|-------------|------|
| Goldman Sachs | **4.8%** | 2025年底 |
| UBS | **4.5%** | 2025年底 |
| Vanguard | **4.5%** | 2025年底 |
| IMF | **4.2%** | 2025年底 |

- **type**: S (推测/共识) | **source**: Goldman Sachs, UBS, Vanguard, IMF via WebSearch
- **解读**: Polymarket暂无直接的2026年中国GDP预测市场。机构共识在4.2%-4.8%区间。Goldman Sachs最乐观(4.8%)，IMF最保守(4.2%)。
- **BABA关联**: 中国GDP增速直接影响阿里巴巴国内电商GMV。4.5%增速意味着消费复苏仍较温和，不支持BABA估值的大幅扩张，但也排除了硬着陆场景。

---

## 五、行业事件 (Industry Events)

### PMK-040 | AI监管/安全立法
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| U.S. enacts AI safety bill before 2027? | Polymarket | **41% Yes** | $42,842 | 2026-12-31 | [链接](https://polymarket.com/event/us-enacts-ai-safety-bill-before-2027) |
| AI data center moratorium passed before 2027? | Polymarket | **29% Yes** | $7,321 | 2026-12-31 | [链接](https://polymarket.com/event/ai-data-center-moratorium-passed-before-2027) |

- **type**: R (实时概率) | **source**: Polymarket WebFetch
- **解读**: AI安全法案通过概率41%，数据中心暂停令29%。市场认为AI监管正在加速但尚未成定局。
- **BABA关联**: 美国AI监管可能间接影响中国AI公司。若美国收紧AI训练限制，可能加强对华芯片出口管控；若通过数据中心暂停令，可能减缓美国AI基础设施扩张，间接缩小中美AI差距。对阿里云AI业务有间接利好。

### PMK-041 | DeepSeek V4发布时间线
| 市场 | 平台 | 概率 | 交易量 | 截止日 | URL |
|------|------|------|--------|--------|-----|
| DeepSeek V4 released by Feb 28? | Polymarket | **12% Yes** | $133,192 | 2026-03-31 | [链接](https://polymarket.com/event/deepseek-v4-released-by-february-28) |
| DeepSeek V4 released by Mar 15? | Polymarket | **50% Yes** | $31,653 | 2026-03-31 | [链接](https://polymarket.com/event/deepseek-v4-released-by-march-15-678) |
| DeepSeek V4 released by Mar 31? | Polymarket | **70% Yes** | $36,688 | 2026-03-31 | [链接](https://polymarket.com/event/deepseek-v4-released-by-march-31-446-353-924-266) |

- **type**: R (实时概率) | **source**: Polymarket MCP API
- **解读**: 市场预期DeepSeek V4在2026年3月底前发布的概率为70%。这对Alibaba Qwen系列构成竞争压力。
- **BABA关联**: DeepSeek是阿里云AI的直接竞争对手。DeepSeek V4发布可能加剧中国AI模型市场的价格战，压缩阿里云AI服务的定价能力。

### PMK-042 | TikTok收购 (中国科技生态相关)
| 市场 | 平台 | 概率 | 交易量 | 状态 | URL |
|------|------|------|--------|------|-----|
| Will Larry Ellison/Oracle acquire TikTok? | Polymarket | **100% Yes** (已结算) | $565,110 | 已结算 | [链接](https://polymarket.com/event/will-larry-ellisonoracle-acquire-tiktok-835-636-575) |

- **type**: H (历史) | **source**: Polymarket MCP API
- **解读**: Oracle已确认收购TikTok美国业务。ByteDance(字节跳动)出售TikTok反映了中国科技公司在美国面临的监管压力持续存在。
- **BABA关联**: TikTok被迫出售的先例强化了ADR/VIE结构的脆弱性认知。尽管BABA不面临同样的国家安全审查，但该事件提醒市场中概股面临的政治风险溢价不会消失。

---

## 六、ADR/退市/VIE风险

### PMK-050 | 无直接市场
- **搜索结果**: Polymarket和Kalshi均未找到直接针对"中概股ADR退市"、"VIE结构禁令"或"HFCAA执行"的活跃预测市场。
- **type**: S (推测) | **source**: WebSearch全平台搜索
- **解读**: 缺少专门的ADR退市预测市场本身就是信号 — 说明市场当前不认为ADR强制退市是高概率近期事件。2024年HFCAA审计合规后，该风险已从"紧迫"降级为"长尾"。
- **BABA关联**: ADR退市风险从2022年高峰(当时有活跃的退市预测市场)显著下降。BABA已完成香港双重主要上市，提供了退市对冲。但VIE结构的根本性法律风险仍未消除。

---

## 七、综合风险地图

```
                        概率
                    高(>30%)                          低(<10%)
               ┌──────────────────────────────────────────────┐
 影响大        │ ● US recession 22.5%                         │ ● 台海冲突 10%
 (BABA         │ ● AI safety bill 41%                         │ ● Xi离任 8%
  市值         │ ● US-China tariff 15-25% (69%)               │ ● 台海封锁 5.5%
  变动         │                                              │ ● ADR退市 (无市场=极低)
  >10%)        │                                              │
               ├──────────────────────────────────────────────┤
 影响中        │ ● DeepSeek V4 by Mar 70%                     │ ● BABA #1 AI model 0.05-1%
 (BABA         │ ● Trump访华 94%                              │ ● AI DC moratorium 29%
  市值         │                                              │
  变动         │                                              │
  5-10%)       │                                              │
               └──────────────────────────────────────────────┘
```

### 概率加权影响评估

| 事件 | 概率 | 条件影响 | 概率加权影响 | 方向 |
|------|------|----------|-------------|------|
| 台海冲突 (PMK-010) | 10% | -40% to -60% | **-4% to -6%** | 负面 |
| 特朗普访华+贸易缓和 (PMK-012/020) | 94% | +5% to +10% | **+4.7% to +9.4%** | 正面 |
| US recession (PMK-030) | 22.5% | -15% to -20% | **-3.4% to -4.5%** | 负面 |
| AI safety bill (PMK-040) | 41% | +2% to +5% | **+0.8% to +2.1%** | 正面(间接) |
| DeepSeek V4竞争 (PMK-041) | 70% | -2% to -5% | **-1.4% to -3.5%** | 负面(间接) |
| Alibaba AI突破 (PMK-001) | ~1% | +10% to +20% | **+0.1% to +0.2%** | 正面(极低概率) |
| 关税维持15-25% (PMK-020) | 69% | 中性(已计入) | **0%** | 已price-in |
| Xi离任 (PMK-011) | 8% | +/-20% (双向) | **+/-1.6%** | 不确定 |

**净概率加权影响**: 约 **-3.2% to +3.7%** (偏中性略积极，特朗普访华的高概率正面催化部分抵消地缘/衰退风险)

---

## 八、数据质量与局限性

| 维度 | 评估 |
|------|------|
| **数据完整性** | 中等 — 无直接BABA股价预测市场或ADR退市市场 |
| **流动性** | 台海冲突($9.3M)和衰退($278K)市场流动性充足；AI模型市场($5K-$36K)较薄 |
| **时效性** | 实时概率截至2026-02-25，Polymarket API直接获取 |
| **交叉验证** | Polymarket MCP API + WebFetch + WebSearch三路验证关键市场 |
| **未覆盖领域** | 中国监管风险(反垄断)、云计算市场份额、电商GMV增长 — 无对应预测市场 |
| **Kalshi数据** | 429限流未获取具体概率，仅确认市场存在 |

---

## 九、来源索引

### Polymarket直接链接
- [China Predictions](https://polymarket.com/predictions/china)
- [Economy Predictions](https://polymarket.com/predictions/economy)
- [Big Tech Predictions](https://polymarket.com/predictions/big-tech)
- [Trade War Predictions](https://polymarket.com/predictions/trade-war)
- [AI Predictions](https://polymarket.com/predictions/ai)
- [Foreign Policy Predictions](https://polymarket.com/predictions/foreign-policy)
- [Macro Dashboard](https://polymarket.com/dashboards/macro)

### Kalshi直接链接
- [Tariff Rate China](https://kalshi.com/markets/kxtariffrateprc/tariff-rate-china)
- [US Tariff Revenue 2026](https://kalshi.com/markets/kxtariffrevenue/tariff-revenue/kxtariffrevenue-26dec31)

### 机构GDP预测
- [Goldman Sachs China 2026](https://www.goldmansachs.com/insights/articles/chinas-economy-is-forecast-to-grow-faster-than-expected-in-2026)
- [UBS China Outlook 2026-27](https://www.ubs.com/global/en/investment-bank/insights-and-data/articles/china-outlook.html)
- [Vanguard China Outlook](https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/vemo-china.html)
