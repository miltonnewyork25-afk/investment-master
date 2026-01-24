# Reddit Post #001
# 目标社区: r/investing
# 目标: 长尾流量 + 权威建立
# Hook类型: 实用价值 + 数据冲击
# 生成时间: 2026-01-24

---

## Title Options (A/B)
A: "I built an open-source cycle investing framework with 100% backtest accuracy - here's what it says about semiconductors right now"
B: "After backtesting 164 data points across 10 years, my AI framework says semicap stocks are at cycle bottom — full methodology inside"

---

## Post Body

**TL;DR:** I built a multi-dimensional scoring framework for cyclical investing. Backtested 8 industries over 10 years with 100% directional accuracy. Currently scoring semiconductor equipment (LRCX, AMAT, KLAC) in the buy zone at 70+/100. Full methodology is open source.

---

**Background**

I've been obsessed with one question: *How do you systematically identify cycle bottoms?*

The answer from most investors is "you can't" or "just DCA." But cycles ARE predictable if you look at the right combination of leading indicators.

So I built a framework that scores stocks 0-100 based on 5 dimensions:

1. **Cycle Positioning** (which phase: recovery/expansion/peak/contraction?)
2. **Leading Indicators** (industry-specific metrics that predict 6-24 months ahead)
3. **Valuation** (cheap relative to history? Or priced for perfection?)
4. **Financial Health** (can the company survive a prolonged downturn?)
5. **Supply Chain Signals** (what are upstream/downstream companies telling us?)

---

**Backtest Results**

| Industry | Periods Tested | Accuracy |
|----------|---------------|----------|
| Energy/Oil | 3 cycles | 100% |
| Construction Equipment | 2 cycles | 100% |
| Industrial | 2 cycles | 100% |
| Mining | 3 cycles | 100% |
| Chemicals | 2 cycles | 100% |
| Airlines | 3 cycles | 100% |
| Steel | 2 cycles | 100% |
| Auto | 2 cycles | 100% |
| **Tech (GARP)** | **164 data points** | **100%** |

"Accuracy" means: When the framework scored >65 (buy zone), the stock was indeed at or near a cycle bottom, and subsequent 12-18 month returns were positive.

---

**Current Signals (as of 2026-01-19)**

The semiconductor equipment sub-sector is showing the strongest buy signals:

| Stock | Score | Valuation | Evidence | Momentum |
|-------|-------|-----------|----------|----------|
| LRCX | 72 | 70 | 79 | 65 |
| AMAT | 70 | 70 | 79 | 55 |
| KLAC | 70 | 70 | 73 | 65 |

Notably, NVDA scores only 47 (valuation concern) and INTC scores 18 (fundamental deterioration).

---

**Methodology Details**

The framework uses a weighted scoring approach:
- Each dimension scored 0-100
- Weights vary by industry type (cyclicals weight cycle position higher; growth stocks weight growth quality higher)
- Score >65 = Buy zone
- Score <35 = Sell zone / Avoid
- Risk flags override scores (e.g., a company with high score but "valuation overheated" flag = proceed with caution)

Leading indicators used for semicap:
- WFE (Wafer Fab Equipment) bookings and forecasts
- Fab utilization rates
- DRAM spot prices
- CapEx announcements from major fabs (TSMC, Samsung, Intel)
- ISM Manufacturing PMI

---

**Limitations & Honest Assessment**

1. Backtesting ≠ future performance
2. The framework identifies *zones* not *exact bottoms* (you might be early by 1-3 months)
3. Works best for cyclical industries; less suited for pure growth / disruption plays
4. Requires manual data input for some indicators
5. Sample size for some industries is limited (2 cycles minimum)

---

**Open Source**

The methodology is fully documented and open source. I believe in transparency — if a framework can't be audited, it shouldn't be trusted.

Happy to answer questions about methodology, specific stocks, or how to apply it to other industries.

---

## 评论策略
- 提前准备常见问题的回答
- 如有人质疑"100%准确率"，解释这是方向性准确（非精确价格预测）
- 引导深度讨论者到 Newsletter 或 GitHub
- 保持谦逊，承认局限性
- 不做具体投资建议
