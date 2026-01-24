# Show HN Post
# 平台: Hacker News
# 目标: 技术社区曝光 + GitHub Stars
# 生成时间: 2026-01-24

---

## Title
"Show HN: Open-source AI cycle investing framework – 100% backtest accuracy over 10 years"

## Post Body (text)

Hi HN,

I built an open-source investment scoring framework that identifies cycle bottoms in industrial/semiconductor stocks. It scores stocks 0-100 across 5 dimensions (cycle position, leading indicators, valuation, financial health, supply chain intelligence).

Backtested across 8 industries and 14 tech companies over 10 years — 164 data points, all correctly identified the cycle zone (buy zone = subsequent positive returns, sell zone = negative returns).

Tech stack:
- TypeScript/Node.js for the scoring engine and CLI
- Python for backtesting and data pipelines
- FMP API for financial data
- SQLite for local storage
- S&P 500 supply chain graph (3,400+ line config)

Key features:
- Multi-dimensional scoring (not just valuation)
- Industry-specific leading indicators
- Supply chain relationship mapping
- Claude Skill integration (conversational analysis)
- Automated weekly reports

Current output: It's scoring semiconductor equipment stocks (LRCX, AMAT, KLAC) in the buy zone at 70+/100, while flagging NVDA as overvalued (47) and INTC as deteriorating (18).

Limitations I'm upfront about:
- 2-3 cycles per industry isn't a massive sample size
- "Accuracy" = directional, not exact timing
- Works best for cyclical industries
- Some data inputs are manual

The framework is designed to be transparent and auditable — I believe in open methodology for investment tools.

GitHub: [link]
Weekly reports (free): [substack-link]

Would love feedback on the methodology or suggestions for improvement.

---

## Prepared Responses for Common HN Comments

### "100% accuracy is obviously overfitting"
"Fair pushback. A few clarifications: (1) I'm measuring directional accuracy — when score >65, subsequent 12-18 month returns were positive. Not predicting exact prices. (2) The framework uses only data available at each historical point (no look-ahead). (3) The sample size IS limited (164 points for tech, 2-3 cycles for industries). I'm transparent about this limitation. More cycles will test whether this holds."

### "This is just backtesting — forward performance will be different"
"Completely agree that backtest ≠ prediction. That's why I publish weekly scores publicly — you can watch the real-time performance from here. I started publishing in Jan 2026, so we'll have out-of-sample data soon. The framework's value isn't guaranteeing returns — it's providing a systematic alternative to gut-feeling investing."

### "Why not just DCA into an index?"
"DCA into an index is a great baseline strategy. This framework is for people who want to take concentrated positions in specific cyclical stocks and need a system for timing. It's complementary to index investing, not a replacement. If you're 100% VTI, this probably isn't for you."

### "What's the Sharpe ratio?"
"I haven't calculated risk-adjusted returns yet — that's on the roadmap. Currently the framework measures directional accuracy, not optimal portfolio allocation. Adding position sizing and risk-adjusted metrics is a natural next step. PRs welcome."

### "How is this different from [X] tool?"
"Most quantitative tools (Koyfin, FinViz) provide data. This provides a methodology. Most research (Seeking Alpha, analyst reports) provides opinions. This provides systematic scoring. The unique combination is: transparent methodology + supply chain intelligence + cycle-specific indicators + open source."

---

## 发布策略
- 时间: 周二 10:00 AM EST（HN最活跃时段）
- 发布前: 确保GitHub README完美
- 发布后: 持续回复评论（HN奖励活跃OP）
- 目标: 前30分钟获得5+ upvotes进入Front Page
