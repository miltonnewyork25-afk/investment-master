# DDOG Stock Analysis

> **来源**: analyze_stock MCP | **日期**: 2026-03-24

## 估值快照

| 指标 | 数值 |
|------|------|
| 股价 | $129 |
| 市值 | ~$47B |
| Enterprise Value | ~$48.3B |
| 52周范围 | $81.63 - $201.69 |
| 距52周高 | -36% |
| 距52周低 | +58% |

## 估值倍数

| 指标 | 当前值 | 行业中位数参考 |
|------|--------|---------------|
| Forward P/E | 49-58x | ~30-35x (SaaS) |
| P/S (TTM) | 13.7x | ~8-10x (高增长SaaS) |
| EV/Sales | 14.1x | — |
| EV/EBITDA | 186x | — |
| P/FCF | 47x | ~30-40x |
| EV/FCF | 48x | — |
| FCF Yield | 2.17% | — |

## Key Metrics

| 指标 | 数值 |
|------|------|
| Revenue Growth (TTM) | +28% |
| Gross Margin | 80% |
| GAAP OPM | -1.3% |
| FCF Margin | 29% |
| R&D/Revenue | 45.2% |
| S&M/Revenue | 27.9% |
| G&A/Revenue | 8.2% |
| NRR | mid-110s |
| Current Ratio | 3.38 |
| Altman Z-Score | 10.79 |
| Net Debt | $1.13B |

## Rule of 40 检查

| 方法 | 计算 | 结果 |
|------|------|------|
| Revenue Growth + FCF Margin | 28% + 29% | **57** (PASS) |
| Revenue Growth + GAAP OPM | 28% + (-1.3%) | **27** (FAIL) |
| Revenue Growth + (FCF-SBC) Margin | 28% + 7% | **35** (borderline) |

## Reverse DCF 初步估算

**假设**: WACC 10%, Terminal Growth 3%, Terminal FCF Multiple 25x

| 市场隐含假设 | 数值 |
|-------------|------|
| 隐含5年Revenue CAGR | ~20-22% |
| 隐含终态FCF Margin | ~30-32% |
| 隐含终态Revenue (FY2030) | ~$8.5-9.0B |

**解读**: 市场定价大致反映了管理层指引的增长轨迹(FY2026 +18-20%逐步稳定)。AI upside尚未充分定价，但SBC调整后的估值(P/(FCF-SBC) ~200x)暗示真实股东回报远低于表面FCF倍数。

## 技术面参考

| 指标 | 数值 |
|------|------|
| 当前价 | $129 |
| 距ATH | -36% |
| 距52W Low | +58% |
| 关键支撑 | $100-110 (前期整理区) |
| 关键阻力 | $150-160 (前高+均线密集) |

## 综合评估要点

**积极因素**:
1. 80%毛利率+29% FCF Margin = 优质SaaS经济模型
2. $4.47B现金储备，财务安全边际极高
3. AI Observability先发优势，绑定AI基础设施增长趋势
4. 20+产品平台策略，cross-sell驱动持续扩展
5. Rule of 40 = 57 (FCF口径)，增长效率优异

**消极因素**:
1. 49x fwd PE在增速减速背景下缺乏安全边际
2. SBC ~22% of revenue，FCF-SBC后真实回报率仅2%左右
3. NRR从120%+降至mid-110s，客户扩展动能减弱
4. 开源(Grafana/OTel)+Hyperscaler(AWS/Azure)双重竞争
5. 使用计费模式在经济下行期可能放大收入波动

**关键问题(待Phase 1-4深入)**:
1. AI收入贡献能否量化？目前是叙事还是实质？
2. SBC趋势能否收敛？何时SBC增速≤收入增速？
3. NRR的稳态水平在哪里？mid-110s是底还是中途？
4. 开源竞争在enterprise segment的真实威胁有多大？
