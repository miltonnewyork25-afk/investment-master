---
name: data-prefetch
description: 数据自动预取 v4.0。分析启动时自动调用MCP工具+Python估值模型+7个并行WebSearch Agent，将15个结构化数据文件缓存到 data/research/[TICKER]/，消除分析中的inline搜索。v4.0新增DM锚点格式输出+自动后验证+锚点注册表。
---

# 数据自动预取技能 v4.0

## 触发条件

在任何 Tier 2/Tier 3 分析启动时，编排器 Step 2 自动调用此技能。

## 版本变化

| 版本 | 数据文件数 | 数据源 | 分析中inline搜索 | 关键特性 |
|------|-----------|--------|-----------------|---------|
| v1.0 | 5 | MCP + Python | 30-45次 | 基础预取 |
| v2.0 | 11 | MCP + Python + 5个WebSearch Agent | 0-5次 | Agent并行化 |
| v3.0 | 14 | MCP + Python + 7个WebSearch Agent | 0-3次 | 3层容错+新数据源 |
| v4.0 | 15 | MCP + Python + 7个WebSearch Agent | 0-2次 | DM锚点格式+自动后验证+锚点注册表 |

## v4.0 关键升级

1. **DM锚点格式输出** — 所有数据点自带元数据标注(type/source/date/dm_id)，推断锚点额外附带推理链和证伪条件
2. **shared_context.md模板升级** — 数据锚点直接以DM格式写入，Phase 1-5可直接引用DM-ID
3. **自动后验证** — Phase 0完成后自动调用 `tests/verify_dm_anchors.sh` 验证DM一致性
4. **新增第15个数据文件** — `dm_anchor_registry.json` 汇总所有DM锚点索引
5. **Agent prompt升级** — 所有WebSearch Agent增加DM标注指令

---

## DM锚点格式规范 (v4.0新增)

### 锚点类型

| 代码 | 类型 | 含义 | 示例 |
|------|------|------|------|
| H | 硬数据 | MCP/API/SEC直接获取的事实数据 | FY2025 Revenue $402.96B |
| R | 合理推断 | 基于硬数据的逻辑推导 | Revenue CAGR 2025-2030E ~7-8% |
| S | 主观判断 | 定性评估或专家意见 | 护城河评估: 强 |

### 锚点ID命名规则

```
DM-{类别}-{序号}
```

| 类别代码 | 含义 | 来源 |
|----------|------|------|
| FIN | 财务数据 | fmp_data income/balance/cashflow |
| VAL | 估值数据 | fmp_data ratios/key-metrics/dcf |
| MKT | 市场数据 | analyze_stock/market_overview |
| CON | 共识数据 | Agent-A analyst_consensus |
| PMK | 预测市场 | Agent-B prediction_market |
| NEW | 新闻催化剂 | Agent-C recent_news |
| BIZ | 业务竞争 | Agent-D business/competitive |
| MGT | 管理层 | Agent-E management_team |
| SMT | 聪明钱 | Agent-F smart_money_13f |
| OPT | 期权做空 | Agent-G options_short_interest |
| INF | 推断 | 分析师/Agent推导 |
| SUB | 主观 | 定性判断 |

### 锚点格式 — 硬数据(H)

```markdown
### DM-FIN-001
- **值**: FY2025 Revenue $402.96B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-12
- **用于**: Ch02 §2.1, Ch14 §Reverse DCF
```

### 锚点格式 — 合理推断(R)

```markdown
### DM-INF-001
- **值**: 搜索Revenue CAGR FY2025-2030E ~7-8%
- **类型**: R
- **推理链**: 当前+15.1% → AI Overviews蚕食→渐进减速
- **证伪条件**: 搜索Revenue连续2Q YoY<5%
- **来源**: WebSearch Agent-A + 分析师共识推导
- **日期**: 2026-02-12
- **用于**: Ch14 §14.2 S2档
```

### 锚点格式 — 主观判断(S)

```markdown
### DM-SUB-001
- **值**: 管理层执行力评估: 强
- **类型**: S
- **依据**: CEO任期+资本配置记录+战略一致性
- **来源**: WebSearch Agent-E + 定性分析
- **日期**: 2026-02-12
- **用于**: Ch07 §7.2
```

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

### Step 2.5: WebSearch并行预取（7个Task Agent同时启动）

在 MCP 数据获取完成后（或同时），启动7个 Task Agent 并行执行 WebSearch 数据获取。

**启动方式**: 使用 Task 工具（subagent_type="general-purpose"）在**一条消息中同时发出7个**调用。

**变量替换**: 每个 Agent 的查询模板中 `{TICKER}`, `{COMPANY}`, `{INDUSTRY}` 由编排器根据 Step 1 识别结果填充。`{CURRENT_QUARTER}` 和 `{NEXT_QUARTER}` 根据当前日期自动推算。

**v4.0 Agent通用DM标注指令** — 注入所有Agent prompt:

```
## DM标注要求 (v4.0必须遵循)

1. 每个数据点必须标注type(H/R/S)和source
2. 推断(R)必须附带推理链(chain)和证伪条件(falsifiable)
3. 输出JSON中每个数据字段增加_dm元数据:
   - "_dm_type": "H" | "R" | "S"
   - "_dm_source": "具体来源描述"
   - "_dm_date": "YYYY-MM-DD"
4. 在输出JSON顶层增加"dm_anchors"数组，汇总本Agent产出的所有锚点
5. 锚点ID使用对应类别代码: CON(Agent-A), PMK(Agent-B), NEW(Agent-C), BIZ(Agent-D), MGT(Agent-E), SMT(Agent-F), OPT(Agent-G)
```

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
  "dm_anchors": [
    { "id": "DM-CON-001", "value": "", "type": "H", "source": "", "date": "" },
    { "id": "DM-CON-002", "value": "", "type": "R", "source": "", "date": "", "chain": "", "falsifiable": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-PMK-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-NEW-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-BIZ-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-BIZ-010", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-MGT-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-SMT-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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
  "dm_anchors": [
    { "id": "DM-OPT-001", "value": "", "type": "H", "source": "", "date": "" }
  ],
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

### Step 4: 生成shared_context.md (v4.0 DM锚点格式)

将所有预取数据按DM锚点格式写入 `data/research/{TICKER}/shared_context.md`。

**v4.0 shared_context.md模板**:

```markdown
# {TICKER} Phase 0 共享上下文 (DM锚点格式)
## 编译时间: {YYYY-MM-DD}
## 数据预取版本: v4.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY{YEAR} Revenue ${VALUE}
- **类型**: H
- **来源**: MCP fmp_data income FY{YEAR}
- **日期**: {YYYY-MM-DD}
- **用于**: Ch02 §2.1, Ch14 §Reverse DCF

### DM-FIN-002
- **值**: FY{YEAR} Net Income ${VALUE}
- **类型**: H
- **来源**: MCP fmp_data income FY{YEAR}
- **日期**: {YYYY-MM-DD}
- **用于**: Ch02 §2.1

### DM-FIN-003
- **值**: FY{YEAR} Gross Margin {VALUE}%
- **类型**: H
- **来源**: MCP fmp_data income FY{YEAR}
- **日期**: {YYYY-MM-DD}
- **用于**: Ch02 §2.2, Ch05 §定价权

[... 更多FIN锚点 ...]

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: PE (TTM) {VALUE}x
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: {YYYY-MM-DD}
- **用于**: Ch14 §估值对比

### DM-VAL-002
- **值**: DCF公允价值 ${VALUE}
- **类型**: H
- **来源**: Python dcf_calculator 输出
- **日期**: {YYYY-MM-DD}
- **用于**: Ch14 §DCF

[... 更多VAL锚点 ...]

---

## Section C: 市场与共识锚点 (DM-MKT/CON/PMK-xxx)

### DM-MKT-001
- **值**: 当前股价 ${VALUE}
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: {YYYY-MM-DD}
- **用于**: 全文引用

### DM-CON-001
- **值**: 分析师共识评级 {VALUE} (Buy:{N}/Hold:{N}/Sell:{N})
- **类型**: H
- **来源**: WebSearch Agent-A
- **日期**: {YYYY-MM-DD}
- **用于**: Ch13 §分析师共识

### DM-PMK-001
- **值**: {事件名} 概率 {VALUE}%
- **类型**: H
- **来源**: Polymarket via WebSearch Agent-B
- **日期**: {YYYY-MM-DD}
- **用于**: Ch09 §宏观风险

[... 更多MKT/CON/PMK锚点 ...]

---

## Section D: 业务与竞争锚点 (DM-BIZ/MGT/SMT/OPT-xxx)

### DM-BIZ-001
- **值**: {业务分部} 收入占比 {VALUE}%
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: {YYYY-MM-DD}
- **用于**: Ch03 §业务矩阵

[... 更多BIZ/MGT/SMT/OPT锚点 ...]

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Revenue CAGR FY{YEAR}-FY{YEAR+5}E ~{VALUE}%
- **类型**: R
- **推理链**: {当前增速} → {驱动因素} → {减速/加速逻辑}
- **证伪条件**: {具体可观测条件}
- **来源**: WebSearch Agent-A + 分析师共识推导
- **日期**: {YYYY-MM-DD}
- **用于**: Ch14 §14.2

### DM-SUB-001
- **值**: 护城河综合评估: {强/中/弱}
- **类型**: S
- **依据**: {定性判断基础}
- **来源**: Phase 1 定性分析
- **日期**: {YYYY-MM-DD}
- **用于**: Ch05

[... 更多INF/SUB锚点 ...]

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | {N} | {N}% |
| R (合理推断) | {N} | {N}% |
| S (主观判断) | {N} | {N}% |
| **总计** | **{N}** | **100%** |

---

## Section G: Phase 1-4关键发现 (传统格式保留)

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。
> 格式与v3.0兼容，但关键数字应引用Section A-E中的DM-ID。

[Phase推进时追加]
```

### Step 5: 生成DM锚点注册表 (v4.0新增)

汇总所有DM锚点写入 `data/research/{TICKER}/dm_anchor_registry.json`:

```json
{
  "version": "4.0",
  "ticker": "{TICKER}",
  "company": "{COMPANY}",
  "generated_at": "{YYYY-MM-DD}",
  "total_anchors": 47,
  "by_type": {
    "H": 28,
    "R": 14,
    "S": 5
  },
  "by_category": {
    "FIN": 12,
    "VAL": 8,
    "MKT": 3,
    "CON": 5,
    "PMK": 3,
    "NEW": 2,
    "BIZ": 6,
    "MGT": 2,
    "SMT": 2,
    "OPT": 2,
    "INF": 4,
    "SUB": 1
  },
  "anchors": [
    {
      "id": "DM-FIN-001",
      "value": "FY2025 Revenue $402.96B",
      "type": "H",
      "source": "fmp_data income",
      "date": "2026-02-12",
      "used_in": ["Ch02 §2.1", "Ch14 §Reverse DCF"]
    },
    {
      "id": "DM-INF-001",
      "value": "Revenue CAGR 2025-2030E ~7-8%",
      "type": "R",
      "source": "Agent-A + consensus",
      "date": "2026-02-12",
      "chain": "当前+15.1% → AI Overviews蚕食→渐进减速",
      "falsifiable": "搜索Revenue连续2Q YoY<5%",
      "used_in": ["Ch14 §14.2 S2档"]
    }
  ],
  "quality": {
    "h_pct": 59.6,
    "r_pct": 29.8,
    "s_pct": 10.6,
    "h_target_pct": 50,
    "passed": true
  }
}
```

### Step 6: 生成元数据

写入 `data/research/{TICKER}/prefetch_metadata.json`（v4.0 schema）:

```json
{
  "version": "4.0",
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
    "options_short_interest": { "status": "ok|error|stale", "source": "WebSearch:Agent-G", "fetched_at": "", "expires_at": "" },
    "dm_anchor_registry": { "status": "ok|error", "source": "prefetch:aggregator", "fetched_at": "", "expires_at": "" }
  },
  "quality": {
    "complete_fields": 0,
    "total_fields": 0,
    "completeness_pct": 0,
    "files_ok": 0,
    "files_error": 0,
    "files_total": 15
  },
  "dm_quality": {
    "total_anchors": 0,
    "h_count": 0,
    "r_count": 0,
    "s_count": 0,
    "h_pct": 0,
    "anchors_with_source": 0,
    "r_with_chain": 0,
    "r_with_falsifiable": 0,
    "integrity_check": "pending"
  },
  "layer_status": {
    "layer1_mcp": "ok|partial|fail",
    "layer2_python": "ok|partial|fail",
    "layer3_websearch": "ok|partial|fail"
  }
}
```

### Step 7: 自动后验证 (v4.0新增)

Phase 0完成后自动执行:

```bash
bash tests/verify_dm_anchors.sh {TICKER}
```

**验证规则**:

| 检查项 | 通过条件 | 失败处理 |
|--------|---------|---------|
| 锚点ID唯一性 | 无重复DM-ID | 自动去重+警告 |
| 类型完整性 | 每个锚点有type字段 | 标记缺失项 |
| 来源完整性 | 每个锚点有source字段 | 标记缺失项 |
| R型推理链 | 所有R锚点有chain+falsifiable | 警告缺失项 |
| H型占比 | H占比>=50% | 警告(不阻断) |
| JSON一致性 | registry与各文件dm_anchors一致 | 重新聚合 |
| shared_context同步 | shared_context.md中锚点与registry匹配 | 警告差异 |

**验证输出**: 写入 `data/research/{TICKER}/dm_verification_result.json`

```json
{
  "ticker": "{TICKER}",
  "verified_at": "{ISO8601}",
  "total_checks": 7,
  "passed": 7,
  "failed": 0,
  "warnings": 0,
  "details": [
    { "check": "unique_ids", "status": "pass", "message": "47 anchors, 0 duplicates" },
    { "check": "type_completeness", "status": "pass", "message": "47/47 have type" },
    { "check": "source_completeness", "status": "pass", "message": "47/47 have source" },
    { "check": "r_chain_coverage", "status": "pass", "message": "14/14 R anchors have chain+falsifiable" },
    { "check": "h_ratio", "status": "pass", "message": "H=59.6% >= 50%" },
    { "check": "json_consistency", "status": "pass", "message": "registry matches all agent outputs" },
    { "check": "shared_context_sync", "status": "pass", "message": "shared_context.md aligned" }
  ]
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
├── dm_anchor_registry.json    # v4.0: DM锚点注册表(全锚点索引)
├── shared_context.md          # v4.0: DM锚点格式的共享上下文
├── dm_verification_result.json # v4.0: DM后验证结果
└── prefetch_metadata.json     # v4.0: 时间戳+数据质量+来源+过期时间+3层状态+DM质量
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
| dm_anchor_registry | 与prefetch同步 | — | — | 随预取自动更新 |

**特殊触发**: 财报发布前1天 → 强制刷新所有文件

## 刷新检查

```
# 检查缓存是否存在且有效（v4.0 分类检查）
if data/research/{TICKER}/prefetch_metadata.json 存在:
    读取 metadata.version
    if version < "4.0" → 自动升级:
        - version < "3.0": 补充Agent-F/G文件
        - version < "4.0": 补充dm_anchor_registry.json + 重写shared_context.md为DM格式

    对每个 data_file:
        读取 fetched_at 和对应的过期规则
        if 在"新鲜"范围内 → 跳过，使用缓存
        if 在"警告"范围内 → 标注 "[缓存: ⚠️ {文件名}已过期{N}，建议刷新]"
        if 超过"强制刷新" → 自动刷新该文件

    # v4.0新增: DM一致性检查
    if dm_anchor_registry.json 存在:
        运行 tests/verify_dm_anchors.sh {TICKER}
        if 验证失败 → 重新聚合锚点注册表
else:
    执行完整预取（Step 2 + Step 2.5 + Step 3 + Step 4 + Step 5 + Step 6 + Step 7）
```

## 数据引用格式

v4.0推荐使用DM-ID引用（Phase 1-5报告中）:

- `[DM-FIN-001]` — 直接引用锚点ID（读者可在shared_context.md查看完整定义）
- `[硬数据: Revenue $402.96B | DM-FIN-001]` — 带值引用（报告中推荐）
- `[合理推断: CAGR ~7-8% | DM-INF-001]` — 推断引用（必须标注类型）
- `[主观判断: 护城河强 | DM-SUB-001]` — 主观判断引用

**向后兼容**: v3.0格式标注仍然有效，但新报告应使用DM-ID格式:
- `[实际数据 | MCP:analyze_stock | {日期}]` — v3.0格式（兼容）
- `[分析师共识 | WebSearch:Agent-A | {日期}]` — v3.0格式（兼容）

## 3层容错机制（v3.0延续）

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
  最低标准: >=5/9文件成功即可继续分析
  全部失败: 分析可继续，但标注"[数据预取不完整，将在分析中补充]"
  v4.0附加: Agent失败时，其dm_anchors不计入registry，但不影响其他Agent的锚点
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
| **DM锚点验证失败** | **重新聚合registry，标记问题锚点，不阻断分析** |
| **shared_context.md与registry不同步** | **以registry为准重新生成shared_context.md的DM区域** |

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2025-12 | 初版: 5个MCP数据文件+Python估值 |
| v2.0 | 2026-01 | 增加5个WebSearch Agent, 11→14数据文件 |
| v3.0 | 2026-02 | 3层容错+Agent F/G(13F+期权做空)+新鲜度检查 |
| v4.0 | 2026-02-12 | DM锚点格式输出+shared_context模板升级+自动后验证+dm_anchor_registry.json(第15文件)+Agent prompt DM指令注入 |
