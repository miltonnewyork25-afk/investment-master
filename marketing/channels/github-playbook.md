# GitHub Open Source Playbook
# Super Marketing Agent v1.0
# 创建时间: 2026-01-24
# 元知识来源: Daytona 4000-star策略, HackerNoon Growth Playbook, ScrapeGraphAI案例

## 目标
将投资大师框架作为开源项目发布，获取Stars、Contributors和用户。

## README 优化模板

### 结构（三支柱法则）

```markdown
<!-- HEADER: 第一印象 -->
<div align="center">
  <img src="logo.png" width="200" alt="Investment Master">
  <h1>Investment Master 投资大师</h1>
  <p><strong>AI-Powered Cycle Investing Framework | 100% Backtest Accuracy</strong></p>

  <!-- Badges -->
  ![Accuracy](https://img.shields.io/badge/Backtest_Accuracy-100%25-brightgreen)
  ![Industries](https://img.shields.io/badge/Industries-8-blue)
  ![Data Points](https://img.shields.io/badge/Data_Points-164-orange)
  ![Stocks](https://img.shields.io/badge/Stocks_Covered-19-purple)
  ![License](https://img.shields.io/badge/License-MIT-green)

  [Newsletter](link) | [Documentation](link) | [Demo](link)
</div>

---

## 🎯 What Is This?

A multi-dimensional scoring framework that identifies **cycle bottoms** in
cyclical industries with 100% historical accuracy.

> "Be greedy when others are fearful" — but HOW do you know when to be greedy?
> This framework gives you a systematic answer.

## ⚡ Quick Start

\```bash
npm install
cp .env.example .env  # Add your FMP API key
npm run score -- --stock LRCX
\```

## 📊 Current Signals (Updated Weekly)

| Stock | Score | Signal |
|-------|-------|--------|
| LRCX | 72/100 | ✅ Buy Zone |
| AMAT | 70/100 | ✅ Buy Zone |
| KLAC | 70/100 | ✅ Buy Zone |

[Full rankings →](link-to-weekly-report)

## 🧠 How It Works

5-dimensional scoring (0-100):

1. **Cycle Positioning** — Where are we? (Recovery/Expansion/Peak/Contraction)
2. **Leading Indicators** — What's changing? (Industry-specific metrics)
3. **Valuation** — Is it cheap? (vs 10-year median)
4. **Financial Health** — Can it survive? (Stress test)
5. **Supply Chain** — What's the ecosystem saying? (S&P 500 mapping)

[Full methodology →](docs/analysis-framework-v4.md)

## 📈 Backtest Results

| Industry | Cycles Tested | Accuracy |
|----------|:---:|:---:|
| Energy | 3 | 100% |
| Machinery | 2 | 100% |
| Mining | 3 | 100% |
| Chemicals | 2 | 100% |
| Airlines | 3 | 100% |
| Steel | 2 | 100% |
| Auto | 2 | 100% |
| Industrial | 2 | 100% |
| **Tech (GARP)** | **164 pts** | **100%** |

## 🛠️ Features

- ✅ Multi-industry cycle scoring (8 industries)
- ✅ Tech/GARP framework (14 companies)
- ✅ S&P 500+ supply chain graph
- ✅ Real-time data pipeline (FMP API)
- ✅ Weekly automated reports
- ✅ Claude Skill integration
- ✅ Backtesting engine
- ✅ Risk flag detection

## 📂 Project Structure

\```
├── src/
│   ├── data-pipeline/     # Data collection & processing
│   ├── relation-graph/    # Supply chain intelligence
│   └── cli/               # Command-line interface
├── data/
│   ├── backtest/          # Historical validation
│   └── output/            # Generated reports
├── docs/                  # Methodology documentation
├── journals/              # Real-time tracking logs
└── reports/               # Investment analysis reports
\```

## 🚀 Use Cases

1. **Individual Investors**: Get systematic buy/sell signals for cyclical stocks
2. **Research Teams**: Use the supply chain graph for macro analysis
3. **AI Integration**: Install as a Claude Skill for conversational analysis
4. **Quantitative Research**: Extend the framework to new industries

## 🤝 Contributing

Contributions welcome! Areas where you can help:
- [ ] Add new industry cycle models
- [ ] Improve data collection reliability
- [ ] Build visualization dashboards
- [ ] Add more supply chain relationships
- [ ] Write tests for scoring logic

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⚠️ Disclaimer

This is NOT financial advice. Past backtest accuracy does not guarantee future
performance. Always do your own research.

## 📬 Stay Updated

- [Newsletter](substack-link) — Weekly score rankings
- [Twitter](twitter-link) — Daily insights
- [YouTube](youtube-link) — Framework deep dives

## 📄 License

MIT License — Use freely, attribute kindly.

---

<div align="center">
  <strong>⭐ If this framework helps your investing, consider starring the repo!</strong>
</div>
```

## Growth Strategy

### Phase 1: 0→100 Stars（首月）
1. **发布到社区**
   - Hacker News: "Show HN: AI investment framework with 100% backtest accuracy"
   - Reddit: r/investing, r/algotrading, r/stocks, r/datascience
   - Dev.to: 技术实现文章
   - Product Hunt: 工具发布

2. **README 优化**
   - 确保3秒内传达核心价值
   - GIF/截图展示评分输出
   - Quick Start 可在5分钟内跑通
   - Badges 展示关键数据

3. **Issues 策略**
   - 创建 "good first issue" 标签
   - 添加 "help wanted" 的功能请求
   - 写清晰的 Issue 模板

### Phase 2: 100→1000 Stars
1. **内容营销联动**
   - 每篇 Medium/Substack 文章引用 GitHub
   - Twitter Thread 结尾 CTA 指向 repo
   - YouTube 视频描述中加链接

2. **社区建设**
   - Discussions 板块活跃
   - 及时回应 Issues 和 PRs
   - Release Notes 用 changelog 格式

3. **Trending 策略**
   - 在短时间内集中获取 Stars（选择发布日）
   - 协调多个渠道同时推广
   - 利用 GitHub Trending 算法（新增Star速度）

### Phase 3: 1000+ Stars
1. **生态建设**
   - 开放 Claude Skill 安装
   - 提供 Docker 一键部署
   - API 化（供第三方集成）
   - 社区贡献的新行业模型

2. **合作伙伴**
   - 量化平台集成（QuantConnect等）
   - 数据提供商合作
   - 投资社区合作

## 发布前检查清单
- [ ] README 按模板优化完成
- [ ] Quick Start 实际可运行
- [ ] 至少有 1 个 GIF/截图
- [ ] LICENSE 文件存在
- [ ] CONTRIBUTING.md 存在
- [ ] .env.example 存在（不含真实密钥）
- [ ] Issues 模板配置
- [ ] GitHub Topics 设置（investing, cycle-investing, semiconductor, quantitative-finance, ai）
- [ ] Description 和 Website 字段已填
- [ ] Social Preview 图片已设置
