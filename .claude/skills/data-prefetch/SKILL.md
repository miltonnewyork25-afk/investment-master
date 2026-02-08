---
name: data-prefetch
description: 数据自动预取 v3.0。分析启动时自动调用MCP工具+Python估值模型+7个并行WebSearch Agent，将14个结构化数据文件缓存到 data/research/[TICKER]/，消除分析中的inline搜索。v3.0新增3层容错+3个新数据源。
---

# 数据自动预取技能 v3.0

## 触发条件

在任何 Tier 2/Tier 3 分析启动时，编排器 Step 2 自动调用此技能。

## 版本变化

| 版本 | 数据文件数 | 数据源 | 分析中inline搜索 |
|------|-----------|--------|-----------------|
| v1.0 | 5 | MCP + Python | 30-45次 |
| v2.0 | 11 | MCP + Python + 5个WebSearch Agent | 0-5次 |
| v3.0 | 14 | MCP + Python + 7个WebSearch Agent | 0-3次 |

## v3.0 关键升级

1. **3层容错**: Layer 1必须成功(MCP), Layer 2自动回退(Python), Layer 3优雅降级(WebSearch Agent)
2. **3个新数据源**: Smart Money 13F, 期权情绪, 做空数据
3. **新鲜度检查**: 每个文件独立过期检查，过期文件自动单独刷新

---

## 执行流程

### Step 1: 创建缓存目录

```bash
mkdir -p data/research/{TICKER}
```

### Step 2: MCP数据获取（并行执行）

同时调用以下 MCP 工具：

| 调用 | MCP工具 | 参数 | 输出文件 |
|------|---------|------|---------|
| 1 | `analyze_stock` | symbol={TICKER}, data_types="full", period="2y" | `stock_full.json` |
| 2 | `compare_stocks` | symbols={PEERS}, benchmark="SPY" | `peer_comparison.json` |
| 3 | `get_market_overview` | — | `market_context.json` |

### Step 2.5: WebSearch并行预取（5个Task Agent同时启动）

在 MCP 数据获取完成后（或同时），启动5个 Task Agent 并行执行 WebSearch 数据获取。

**启动方式**: 使用 Task 工具（subagent_type="general-purpose"）在**一条消息中同时发出5个**调用。

**变量替换**: 每个 Agent 的查询模板中 `{TICKER}`, `{COMPANY}`, `{INDUSTRY}` 由编排器根据 Step 1 识别结果填充。`{CURRENT_QUARTER}` 和 `{NEXT_QUARTER}` 根据当前日期自动推算。

---

#### Agent A: 分析师共识 → `analyst_consensus.json`

**查询模板（7-9次WebSearch）**:

通用查询:
1. `{TICKER} analyst ratings consensus {YEAR}`
2. `{TICKER} price target consensus`
3. `{COMPANY} bull case bear case analyst`
4. `{TICKER} earnings estimates {CURRENT_QUARTER}`
5. `{TICKER} earnings surprise history`
6. `{COMPANY} analyst upgrade downgrade {YEAR}`
7. `{TICKER} EPS revenue estimate {NEXT_QUARTER}`

行业追加查询:
- 半导体: `{TICKER} AI data center revenue forecast`
- 金融: `{TICKER} net interest income forecast`
- 消费品: `{COMPANY} organic growth pricing power outlook`
- 科技平台: `{TICKER} cloud AI monetization forecast`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "consensus": {
    "rating": "",
    "buy_count": 0,
    "hold_count": 0,
    "sell_count": 0,
    "avg_price_target": 0,
    "high_target": 0,
    "low_target": 0
  },
  "earnings_estimates": {
    "current_quarter": { "quarter": "", "eps_est": 0, "rev_est": 0 },
    "next_quarter": { "quarter": "", "eps_est": 0, "rev_est": 0 }
  },
  "earnings_surprise_history": [],
  "recent_changes": [],
  "bull_bear_summary": {
    "bull_case": "",
    "bear_case": ""
  },
  "industry_specific": {},
  "sources": []
}
```

---

#### Agent B: 预测市场 → `prediction_market.json`

**查询模板（6-10次WebSearch）**:

通用查询:
1. `site:polymarket.com recession {YEAR}`
2. `site:polymarket.com {COMPANY}`
3. `site:kalshi.com federal reserve interest rate {YEAR}`
4. `site:polymarket.com inflation {YEAR}`

行业追加查询:
- 半导体: `site:polymarket.com Taiwan`, `site:polymarket.com chip export ban`, `site:polymarket.com AI spending`
- 金融: `site:polymarket.com bank`, `site:polymarket.com financial crisis`
- 消费品: `site:polymarket.com consumer spending`, `site:kalshi.com CPI`
- 科技平台: `site:polymarket.com antitrust big tech`, `site:polymarket.com AI regulation`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "macro_events": [
    { "event": "", "platform": "", "probability": 0, "last_updated": "", "url": "" }
  ],
  "company_specific": [
    { "event": "", "platform": "", "probability": 0, "last_updated": "", "url": "" }
  ],
  "industry_events": [
    { "event": "", "platform": "", "probability": 0, "last_updated": "", "url": "" }
  ],
  "no_coverage": [],
  "sources": []
}
```

---

#### Agent C: 新闻与催化剂 → `recent_news.json`

**查询模板（6-8次WebSearch）**:

通用查询:
1. `{COMPANY} latest news {MONTH} {YEAR}`
2. `{TICKER} stock news {YEAR}`
3. `{COMPANY} upcoming catalysts events {YEAR}`
4. `{TICKER} earnings date next quarter`
5. `{TICKER} insider trading activity {YEAR}`
6. `{TICKER} SEC filing 10-K 10-Q latest`

行业追加查询:
- 半导体: `{COMPANY} new chip product launch {YEAR}`
- 金融: `{COMPANY} regulatory action {YEAR}`
- 消费品: `{COMPANY} product launch recall {YEAR}`
- 科技平台: `{COMPANY} antitrust AI launch {YEAR}`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "key_news": [
    { "date": "", "headline": "", "summary": "", "sentiment": "", "source": "" }
  ],
  "upcoming_catalysts": [
    { "date": "", "event": "", "expected_impact": "" }
  ],
  "insider_activity": {
    "recent_transactions": [],
    "net_insider_sentiment": ""
  },
  "sec_filings": [],
  "sources": []
}
```

---

#### Agent D: 业务与竞争 → `business_overview.json` + `competitive_landscape.json`

**查询模板（6-9次WebSearch）**:

通用查询:
1. `{COMPANY} business segments revenue breakdown`
2. `{COMPANY} market share {PRIMARY_MARKET}`
3. `{INDUSTRY} competitive landscape {YEAR}`
4. `{COMPANY} geographic revenue breakdown`
5. `{COMPANY} supply chain key suppliers customers`
6. `{INDUSTRY} total addressable market TAM forecast`

行业追加查询:
- 半导体: `{COMPANY} technology roadmap process node`, `AI GPU market share {YEAR-1} {YEAR}`
- 金融: `{COMPANY} loan portfolio credit quality`, `{COMPANY} digital banking fintech`
- 消费品: `{COMPANY} brand portfolio`, `{COMPANY} DTC e-commerce channel`
- 科技平台: `{COMPANY} DAU MAU user metrics`, `{COMPANY} cloud market share`

**输出Schema — `business_overview.json`**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "segments": [
    { "name": "", "revenue": 0, "pct_of_total": 0, "growth_rate": 0 }
  ],
  "geographic_breakdown": [
    { "region": "", "revenue": 0, "pct_of_total": 0 }
  ],
  "supply_chain": {
    "key_suppliers": [],
    "key_customers": [],
    "concentration_risk": ""
  },
  "tam": { "current": 0, "forecast": 0, "cagr": 0 },
  "industry_specific": {},
  "sources": []
}
```

**输出Schema — `competitive_landscape.json`**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "market_position": { "rank": 0, "market_share": 0, "trend": "" },
  "competitors": [
    { "name": "", "ticker": "", "market_share": 0, "key_advantage": "" }
  ],
  "competitive_dynamics": "",
  "moat_indicators": [],
  "industry_specific": {},
  "sources": []
}
```

---

#### Agent E: 管理层 → `management_team.json`

**查询模板（6次WebSearch）**:

1. `{COMPANY} CEO biography track record`
2. `{COMPANY} CFO biography`
3. `{COMPANY} executive team leadership changes {YEAR-1} {YEAR}`
4. `{COMPANY} board of directors governance`
5. `{COMPANY} executive compensation proxy {YEAR-1}`
6. `{COMPANY} insider ownership percentage`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "ceo": { "name": "", "tenure_years": 0, "background": "", "track_record": "" },
  "cfo": { "name": "", "tenure_years": 0, "background": "" },
  "key_executives": [],
  "recent_changes": [],
  "insider_ownership_pct": 0,
  "compensation_highlights": "",
  "governance_notes": "",
  "sources": []
}
```

---

#### Agent F: Smart Money 13F → `smart_money_13f.json`

**查询模板（5-7次WebSearch）**:

1. `{TICKER} 13F institutional holders top {YEAR}`
2. `{TICKER} hedge fund holdings changes {CURRENT_QUARTER}`
3. `Warren Buffett {TICKER} position {YEAR}` OR `Berkshire Hathaway {TICKER}`
4. `{TICKER} institutional ownership percentage trend`
5. `{TICKER} insider buying selling {YEAR}`

行业追加查询:
- 半导体: `ARK invest {TICKER}`, `Soros {TICKER} semiconductor`
- 金融: `Berkshire Hathaway {TICKER}`, `{TICKER} bank stock hedge fund`
- 科技平台: `Tiger Global {TICKER}`, `Coatue {TICKER}`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "institutional_summary": {
    "total_institutions": 0,
    "total_shares_held": 0,
    "ownership_pct": 0,
    "qoq_change_institutions": 0,
    "qoq_change_shares": 0
  },
  "top_holders": [
    { "name": "", "shares": 0, "value_usd": 0, "change_pct": 0, "new_position": false }
  ],
  "notable_moves": [
    { "investor": "", "action": "", "shares": 0, "quarter": "", "thesis": "" }
  ],
  "insider_activity": {
    "net_insider_sentiment": "",
    "recent_transactions": []
  },
  "sources": []
}
```

---

#### Agent G: 期权与做空数据 → `options_short_interest.json`

**查询模板（5-6次WebSearch）**:

1. `{TICKER} short interest percentage float {YEAR}`
2. `{TICKER} options put call ratio`
3. `{TICKER} unusual options activity {MONTH} {YEAR}`
4. `{TICKER} short squeeze potential`
5. `{TICKER} options implied volatility vs historical`

**输出Schema**:
```json
{
  "ticker": "",
  "fetched_at": "",
  "short_interest": {
    "shares_short": 0,
    "short_pct_float": 0,
    "days_to_cover": 0,
    "vs_sector_avg": 0,
    "trend": ""
  },
  "options_sentiment": {
    "put_call_ratio": 0,
    "implied_volatility": 0,
    "iv_rank": 0,
    "unusual_activity": []
  },
  "sources": []
}
```

---

### Step 3: Python估值模型（顺序执行）

依赖 Step 2 的 stock_full.json 数据：

```bash
# DCF计算
python3 tools/valuation_models/dcf_calculator.py {TICKER} > data/research/{TICKER}/dcf_valuation.json

# 可比公司分析
python3 tools/valuation_models/comparable_companies.py {TICKER} {PEERS} > data/research/{TICKER}/comparable_analysis.json
```

### Step 4: 生成元数据

写入 `data/research/{TICKER}/prefetch_metadata.json`（v3.0 schema）:

```json
{
  "version": "3.0",
  "ticker": "{TICKER}",
  "company": "{COMPANY}",
  "industry": "{INDUSTRY}",
  "timestamp": "{ISO8601}",
  "data_files": {
    "stock_full": { "status": "ok|error|stale", "source": "MCP:analyze_stock", "fetched_at": "", "expires_at": "" },
    "peer_comparison": { "status": "ok|error|stale", "source": "MCP:compare_stocks", "fetched_at": "", "expires_at": "" },
    "market_context": { "status": "ok|error|stale", "source": "MCP:get_market_overview", "fetched_at": "", "expires_at": "" },
    "dcf_valuation": { "status": "ok|error|stale", "source": "Python:dcf_calculator", "fetched_at": "", "expires_at": "" },
    "comparable_analysis": { "status": "ok|error|stale", "source": "Python:comparable_companies", "fetched_at": "", "expires_at": "" },
    "analyst_consensus": { "status": "ok|error|stale", "source": "WebSearch:Agent-A", "fetched_at": "", "expires_at": "" },
    "prediction_market": { "status": "ok|error|stale", "source": "WebSearch:Agent-B", "fetched_at": "", "expires_at": "" },
    "recent_news": { "status": "ok|error|stale", "source": "WebSearch:Agent-C", "fetched_at": "", "expires_at": "" },
    "business_overview": { "status": "ok|error|stale", "source": "WebSearch:Agent-D", "fetched_at": "", "expires_at": "" },
    "competitive_landscape": { "status": "ok|error|stale", "source": "WebSearch:Agent-D", "fetched_at": "", "expires_at": "" },
    "management_team": { "status": "ok|error|stale", "source": "WebSearch:Agent-E", "fetched_at": "", "expires_at": "" },
    "smart_money_13f": { "status": "ok|error|stale", "source": "WebSearch:Agent-F", "fetched_at": "", "expires_at": "" },
    "options_short_interest": { "status": "ok|error|stale", "source": "WebSearch:Agent-G", "fetched_at": "", "expires_at": "" }
  },
  "quality": {
    "complete_fields": 0,
    "total_fields": 0,
    "completeness_pct": 0,
    "files_ok": 0,
    "files_error": 0,
    "files_total": 14
  },
  "layer_status": {
    "layer1_mcp": "ok|partial|fail",
    "layer2_python": "ok|partial|fail",
    "layer3_websearch": "ok|partial|fail"
  }
}
```

---

## 缓存结构

```
data/research/{TICKER}/
├── stock_full.json            # MCP: 价格+基本面+技术指标(2年)
├── peer_comparison.json       # MCP: 同行对比(含SPY基准)
├── market_context.json        # MCP: S&P500/道琼斯/纳斯达克/VIX
├── dcf_valuation.json         # Python: DCF模型输出
├── comparable_analysis.json   # Python: 可比公司分析
├── analyst_consensus.json     # WebSearch:Agent-A: 评级+目标价+EPS预期
├── prediction_market.json     # WebSearch:Agent-B: Polymarket/Kalshi概率
├── recent_news.json           # WebSearch:Agent-C: 新闻+催化剂+内部交易
├── business_overview.json     # WebSearch:Agent-D: 业务分部+地理+供应链
├── competitive_landscape.json # WebSearch:Agent-D: 竞争格局+市场份额
├── management_team.json       # WebSearch:Agent-E: 高管+治理+持股
├── smart_money_13f.json       # WebSearch:Agent-F: 机构13F+大师持仓+内部交易
├── options_short_interest.json # WebSearch:Agent-G: 期权情绪+做空数据
└── prefetch_metadata.json     # v3.0: 时间戳+数据质量+来源+过期时间+3层状态
```

## 行业同行映射

根据行业自动选择对比公司：

| 行业 | 同行列表 |
|------|---------|
| 半导体 | TSM, NVDA, AMD, INTC, ASML, MU, LRCX |
| 消费品 | PG, KO, PEP, NKE, CL, UL, MNST |
| 科技平台 | AAPL, MSFT, GOOG, META, AMZN, NFLX |
| 金融 | JPM, GS, BAC, MS, V, MA, BRK-B |
| 零售 | WMT, COST, HD, TGT, DG, KR, LOW |

规则: 从同行列表中排除被分析公司本身，取剩余公司。

## 分类过期规则

| 文件 | 新鲜 | 警告 | 强制刷新 | 原因 |
|------|------|------|---------|------|
| stock_full | <4h | 4-24h | >24h | 盘中变化 |
| peer_comparison | <24h | 1-7d | >7d | 对比相对稳定 |
| market_context | <4h | 4-24h | >24h | 宏观指数实时变化 |
| dcf_valuation | <7d | 7-30d | >30d | 模型输入变化慢 |
| comparable_analysis | <7d | 7-30d | >30d | 可比公司估值变化慢 |
| analyst_consensus | <24h | 1-3d | >3d | 评级频繁变化 |
| prediction_market | <12h | 12-48h | >48h | 概率波动大 |
| recent_news | <6h | 6-24h | >24h | 新闻时效性强 |
| business_overview | <30d | 30-90d | >90d | 业务模型变化慢 |
| competitive_landscape | <7d | 7-30d | >30d | 竞争格局中频变化 |
| management_team | <30d | 30-90d | >90d | 高管变动不频繁 |
| smart_money_13f | <7d | 7-30d | >30d | 13F季度更新，中频变化 |
| options_short_interest | <12h | 12-48h | >48h | 期权/做空数据高频变化 |

**特殊触发**: 财报发布前1天 → 强制刷新所有文件

## 刷新检查

```
# 检查缓存是否存在且有效（v2.0 分类检查）
if data/research/{TICKER}/prefetch_metadata.json 存在:
    读取 metadata.version
    if version < "3.0" → 自动升级，补充缺失的Agent-F/G文件

    对每个 data_file:
        读取 fetched_at 和对应的过期规则
        if 在"新鲜"范围内 → 跳过，使用缓存
        if 在"警告"范围内 → 标注 "[缓存: ⚠️ {文件名}已过期{N}，建议刷新]"
        if 超过"强制刷新" → 自动刷新该文件
else:
    执行完整预取（Step 2 + Step 2.5 + Step 3）
```

## 数据引用格式

预取数据在报告中引用时使用标准标注：

- `[实际数据 | MCP:analyze_stock | {日期}]` — 来自MCP工具
- `[模型输出 | Python:dcf_calculator | {日期}]` — 来自Python估值
- `[市场数据 | MCP:get_market_overview | {日期}]` — 来自市场概览
- `[分析师共识 | WebSearch:Agent-A | {日期}]` — 来自分析师共识预取
- `[预测市场 | WebSearch:Agent-B | {日期}]` — 来自预测市场预取
- `[新闻数据 | WebSearch:Agent-C | {日期}]` — 来自新闻预取
- `[业务数据 | WebSearch:Agent-D | {日期}]` — 来自业务/竞争预取
- `[管理层数据 | WebSearch:Agent-E | {日期}]` — 来自管理层预取
- `[机构持仓 | WebSearch:Agent-F | {日期}]` — 来自Smart Money 13F预取
- `[期权/做空 | WebSearch:Agent-G | {日期}]` — 来自期权与做空数据预取

## 3层容错机制（v3.0新增）

```yaml
Layer 1 — MCP数据（必须成功）:
  文件: stock_full, peer_comparison, market_context
  失败处理: 重试1次 → 仍失败则回退WebSearch手动获取
  阻断条件: 3个文件全部失败 → 终止预取，提示用户检查MCP连接

Layer 2 — Python模型（自动回退）:
  文件: dcf_valuation, comparable_analysis
  失败处理: 标注"[需手动估值]"，不阻断后续分析
  回退方案: 分析中使用WebSearch获取分析师目标价替代

Layer 3 — WebSearch Agent（优雅降级）:
  文件: 7个Agent产出的9个文件
  失败处理: 单个Agent失败不影响其他Agent
  最低标准: ≥5/9文件成功即可继续分析
  全部失败: 分析可继续，但标注"[数据预取不完整，将在分析中补充]"
```

---

## 错误处理

| 错误 | 处理 |
|------|------|
| MCP服务器未连接 | 回退到 WebSearch 手动获取，标注"[WebSearch回退]" |
| yfinance API限流 | 等待30秒重试1次，仍失败则标注"[数据暂不可用]" |
| Python工具报错 | 跳过该步骤，标注"[需手动估值]"，不阻塞流程 |
| 股票代码无效 | 立即终止，提示用户确认代码 |
| **单个WebSearch Agent失败** | **隔离处理: 该Agent输出文件标记status="error"，其他Agent不受影响，分析继续** |
| **WebSearch无结果** | **对应字段写入空值+标注"[无数据]"，不编造** |
| **Agent超时（>3分钟）** | **终止该Agent，标记status="timeout"，分析继续** |
