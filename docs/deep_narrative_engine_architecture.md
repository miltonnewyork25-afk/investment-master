# Deep Narrative Engine — System Architecture v1.0

> **Purpose**: Transform 200K-500K character investment research reports into viral, shareable content, triggered by real-world events.
> **Design principle**: This is an agent orchestration system, not a template library. Every component has clear inputs, outputs, data contracts, and failure modes.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEEP NARRATIVE ENGINE                            │
│                                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐   │
│  │  Report   │──▶│  Insight  │──▶│  Kairos   │──▶│   Manager    │   │
│  │  Mining   │   │   Store   │   │ Detection │   │ Orchestrator │   │
│  │  Layer    │   │  (JSON)   │   │  Engine   │   │              │   │
│  └──────────┘   └──────────┘   └──────────┘   └──────┬───────┘   │
│                                                       │            │
│                        ┌──────────────────────────────┼──────┐    │
│                        ▼              ▼               ▼      │    │
│                  ┌──────────┐  ┌──────────┐   ┌──────────┐  │    │
│                  │  Voice   │  │Compliance│   │Distribution│  │    │
│                  │Synthesizer│  │  Filter  │   │ Optimizer │  │    │
│                  └──────────┘  └──────────┘   └──────────┘  │    │
│                        │              │               │      │    │
│                        └──────────────┼───────────────┘      │    │
│                                       ▼                      │    │
│                              ┌──────────────┐               │    │
│                              │  Publisher    │               │    │
│                              │  (Platform)   │               │    │
│                              └──────────────┘               │    │
│                                                              │    │
│                        ┌─────────────────────────────────────┘    │
│                        │  Quality Gate (fact-check vs source)     │
│                        └─────────────────────────────────────     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Report Mining

### Problem

A 500K-character report contains perhaps 50K characters of genuinely shareable insight. The rest is scaffolding (data tables, methodology notes, DM anchors, sensitivity matrices). An agent cannot process 500K in one context window. The mining layer must be surgical.

### Architecture: Three-Pass Extraction

```
Pass 1: Structure Scan (~30 seconds)
  Input:  Complete report file path
  Method: Read table of contents + chapter headers + all Mermaid diagram titles
  Output: structural_map.json — chapter taxonomy, estimated insight density per chapter

Pass 2: Targeted Deep Read (~5-10 minutes, parallelizable)
  Input:  structural_map.json + extraction rules
  Method: Read only high-density chapters (identified by Pass 1)
  Output: raw_extracts/ — one file per extraction type

Pass 3: Crystallization (~3 minutes)
  Input:  raw_extracts/*
  Method: Compress, cross-reference, score
  Output: insight_store/{TICKER}_insights.json
```

### Pass 1: Structure Scan

The agent reads the first 200 lines (TOC) and last 200 lines (appendices/summary) of the report. From existing reports, high-insight chapters follow predictable patterns:

| Chapter Type | Signal in Header | Typical Insight Density |
|---|---|---|
| Belief Inversion (信念反演) | "信念", "Reverse DCF", "隐含" | Very High |
| Core Contradiction (核心矛盾) | "矛盾", "CI-", "悖论" | Very High |
| Red Team Findings | "RT-", "红队", "校准" | High |
| Scenario Analysis | "情景", "温水煮青蛙", "路径" | High |
| Kill Switch | "KS-", "触发", "阈值" | Medium-High |
| Valuation Summary | "估值", "SOTP", "DCF" | Medium |
| Industry Data | "产业链", "市场规模" | Low (scaffolding) |

Implementation:

```python
# report_scanner.py — Pass 1

import re
from pathlib import Path

HIGH_DENSITY_PATTERNS = [
    (r"信念反演|Reverse DCF|隐含假设", "belief_inversion", 0.95),
    (r"CI-\d+|核心矛盾|悖论", "core_insight", 0.90),
    (r"RT-\d+|红队|校准", "red_team", 0.80),
    (r"情景|温水煮青蛙|路径映射", "scenario", 0.80),
    (r"KS-\d+|Kill Switch|触发", "kill_switch", 0.70),
    (r"估值张力|双重身份|溢价分解", "valuation_tension", 0.75),
    (r"A-Score|SGI|护城河", "moat_scoring", 0.60),
]

def scan_structure(report_path: str) -> dict:
    """Read TOC + headers, classify chapters by insight density."""
    text = Path(report_path).read_text()
    chapters = re.findall(r"^(#{1,3})\s+(.+)$", text, re.MULTILINE)

    structure = []
    for level, title in chapters:
        density = 0.3  # default: low
        category = "scaffolding"
        for pattern, cat, score in HIGH_DENSITY_PATTERNS:
            if re.search(pattern, title):
                density = score
                category = cat
                break
        structure.append({
            "level": len(level),
            "title": title,
            "category": category,
            "density": density,
        })

    return {
        "total_chapters": len(structure),
        "high_density": [c for c in structure if c["density"] >= 0.70],
        "medium_density": [c for c in structure if 0.40 <= c["density"] < 0.70],
        "full_map": structure,
    }
```

### Pass 2: Five Extraction Streams (Parallelizable)

Each stream is an independent agent reading specific chapters:

**Stream A — Contrarian Insights (核心洞见)**
- Source: Belief inversion chapters, CI- chapters, red team findings
- Extract: The specific claim that contradicts consensus, the evidence chain, the quantified magnitude
- Format per insight:
```json
{
  "id": "NVDA-CI-01",
  "headline": "史上最贵的周期股",
  "consensus": "NVDA is a platform company deserving 36x P/E",
  "contrarian": "NVDA's revenue is 85%+ driven by CapEx cycles; analysts themselves project FY2030 revenue decline of 2.8%",
  "evidence_chain": ["CapEx cycle history (fiber/wireless/cloud)", "Revenue dependency ratio", "Analyst FY2030 estimates"],
  "magnitude": "If priced as cyclical (15-20x), implies 50-60% downside from $4.3T",
  "emotional_hook": "The analysts pricing it at 36x are the same ones projecting revenue decline",
  "source_chapter": "Ch71",
  "virality_score": 9.2
}
```

**Stream B — Concept Crystals (概念结晶)**
- Source: excellence_catalog.yaml + report CI-/RT- sections
- These are compressed ideas that self-expand. The name alone triggers curiosity.
- Extraction rule: Any phrase that (a) is <=10 characters, (b) encodes a contradiction or paradox, (c) would make someone ask "what does that mean?"

Existing inventory from the catalog and L0 index (already mined):
| Crystal | Report | Self-Expansion |
|---|---|---|
| 史上最贵的周期股 | NVDA | "How can the world's most valuable company be a cyclical stock?" |
| 组装商估值陷阱 | SMCI | "What happens when the market prices an assembler like an innovator?" |
| 4分钟悖论 | SBUX | "A 4-minute wait hides a billion-dollar cost" |
| 温水煮青蛙 | LRCX/ARM | "The danger isn't a crash — it's a slow bleed no one notices" |
| 护城河制度迁移 | INTC | "Intel's moat didn't shrink — the rules of the game changed" |
| 双P/E宇宙 | ARM | "Two entirely different companies hiding inside one stock" |
| 僵尸轨道 | INTC | "Not dead, not alive — the most expensive state in corporate finance" |
| NUG弹性函数 | HLT | "Growth premium elasticity: how much is 'one more room' worth at 50x P/E?" |
| 收益纯度 | SBUX/RCL/HLT | "Not all revenue dollars are created equal" |

**Stream C — Cross-Report Connections**
- Source: All insight_store/*.json files (comparing across tickers)
- Method: Embed each insight (headline + contrarian claim) and compute cosine similarity
- Connection types:
  - **Mirror**: Same pattern in different industries (SMCI assembler trap ↔ ETN identity premium ↔ VRT dual identity)
  - **Contradiction**: Our analysis of Company A contradicts our analysis of Company B (e.g., bullish AI capex for NVDA but bearish overinvestment for MSFT)
  - **Temporal**: Company A today looks like Company B at a past turning point (ANET 2026 ↔ Cisco 1998)

```json
{
  "connection_id": "XREF-007",
  "type": "mirror",
  "company_a": {"ticker": "SMCI", "insight": "组装商估值陷阱"},
  "company_b": {"ticker": "ETN", "insight": "身份溢价38pp"},
  "narrative": "Both companies trade at premiums that assume they are something they're not. SMCI is priced as an AI innovator but builds commodity servers. ETN is priced as a pure-play AI infrastructure company but 60% of revenue comes from traditional electrical equipment.",
  "content_angle": "The market has a pricing identity crisis — and it's happening across industries simultaneously"
}
```

**Stream D — Numbers That Tell Stories**
- Source: Financial chapters, valuation chapters, sensitivity tables
- Extraction rule: A number becomes a story when it satisfies at least 2 of:
  1. Counterintuitive (violates common sense)
  2. Has a human-scale translation (per-store, per-user, per-day)
  3. Creates a "before/after" comparison
  4. Reveals a hidden cost or hidden subsidy

Examples from existing reports:
| Number | Story | Report |
|---|---|---|
| $900M-$1.3B | The cost of waiting 4 minutes at Starbucks | SBUX |
| -72% | Intel's expected return — the price of a moat that migrated | INTC |
| 200M → 160M | IHG's loyalty members — the number that was wrong in our own report | IHG |
| 28-32% WFE share | What KLAC's stock price implies — a mathematical impossibility | KLAC |
| 0.8T-7.5T | NVDA's valuation range — a 9.4x spread, the widest we've ever mapped | NVDA |

**Stream E — Emotional Anchors**
- Source: Red team findings (especially large calibration swings), kill switches, surprise data points
- Types:
  - **Irony**: The analysts pricing NVDA at 36x are projecting revenue decline
  - **Surprise**: Our red team moved HLT's estimate UP by 21 percentage points (largest reversal ever)
  - **Stakes**: One kill switch triggers and the thesis inverts completely
  - **Personal**: "I stood in that Starbucks line..." (experiential moments)

### Pass 3: Crystallization and Scoring

Each extracted insight gets a **Virality Score** (0-10):

```
Virality Score = weighted average of:
  Contrarian Strength (30%): How much does this contradict consensus?
    0 = agrees with consensus, 10 = directly inverts conventional wisdom

  Compression Ratio (20%): Can the insight be expressed in <15 words?
    0 = requires full context, 10 = self-explanatory in one sentence

  Emotional Payload (20%): Does it trigger curiosity, outrage, or recognition?
    0 = dry fact, 10 = visceral reaction

  Data Anchor (15%): Is there a specific number that grounds the claim?
    0 = pure opinion, 10 = precise, counterintuitive number

  Timeliness Potential (15%): How often could a news event activate this insight?
    0 = evergreen only, 10 = multiple quarterly catalysts
```

### Output Schema: insight_store/{TICKER}_insights.json

```json
{
  "ticker": "NVDA",
  "report_version": "v2.0",
  "report_date": "2026-03-02",
  "report_path": "reports/NVDA/NVDA_Complete_v2.0_2026-03-02.md",
  "mining_date": "2026-03-08",
  "total_insights": 12,
  "concept_crystals": ["史上最贵的周期股", "SPOF单点故障"],
  "insights": [
    {
      "id": "NVDA-CI-01",
      "type": "contrarian",
      "headline": "史上最贵的周期股",
      "one_liner": "The world's most valuable company might be a cyclical stock trading at a platform premium",
      "full_argument": "...",
      "evidence": ["..."],
      "numbers_that_tell_stories": [
        {"number": "$4.31T", "story": "Market cap pricing in permanent AI dominance"},
        {"number": "2.8%", "story": "Analysts' own FY2030 revenue decline projection"},
        {"number": "9.4x", "story": "Spread between bull and bear scenarios — widest ever"}
      ],
      "emotional_anchors": [
        {"type": "irony", "text": "The same analysts who price NVDA at 36x P/E project its revenue will decline"}
      ],
      "cross_references": ["XREF-003", "XREF-007"],
      "virality_score": 9.2,
      "platform_fit": {
        "twitter": 0.95,
        "xueqiu": 0.90,
        "wechat": 0.85,
        "substack": 0.80
      },
      "kairos_triggers": ["NVDA earnings", "AI capex debate", "semiconductor cycle data", "hyperscaler capex reports"]
    }
  ],
  "cross_report_connections": [
    {
      "connection_id": "XREF-003",
      "type": "temporal",
      "target_ticker": "ANET",
      "narrative": "ANET's Cisco 1998 parallel + NVDA's CapEx cycle = two sides of the same AI infrastructure overinvestment thesis"
    }
  ]
}
```

### Implementation: MCP Tools and Scripts

```bash
# New script: scripts/mine_report.sh {TICKER}
# Orchestrates the three passes, outputs to insight_store/

# Uses existing infrastructure:
# - excellence_catalog.yaml (pre-indexed concept crystals)
# - L0_index.yaml (cross-report metadata)
# - find_relevant_knowledge.sh (cross-reference lookup)
```

The mining layer should be run once per completed report (triggered by `post_report_autopsy.sh`) and stored permanently. Re-mining only on report version updates.

---

## Layer 2: Kairos Detection Engine

### Problem

The best insight published at the wrong time is noise. Published at the right time, it is signal. "Kairos" (the ancient Greek concept of the opportune moment) detection is about matching events to pre-mined insights.

### Architecture: Event Stream + Insight Matcher

```
┌─────────────────────────────────────────────────┐
│              EVENT STREAMS                       │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐    │
│  │ Earnings  │ │ Investor │ │  Social/News  │    │
│  │ Calendar  │ │  Moves   │ │   Trending    │    │
│  └─────┬────┘ └─────┬────┘ └──────┬───────┘    │
│        │             │             │             │
│        └─────────────┼─────────────┘             │
│                      ▼                           │
│              ┌──────────────┐                    │
│              │ Event Parser │                    │
│              │ + Classifier │                    │
│              └──────┬───────┘                    │
│                     ▼                            │
│              ┌──────────────┐                    │
│              │   Insight    │ ← insight_store/   │
│              │   Matcher    │                    │
│              └──────┬───────┘                    │
│                     ▼                            │
│              ┌──────────────┐                    │
│              │  Urgency     │                    │
│              │  Scorer      │                    │
│              └──────┬───────┘                    │
│                     ▼                            │
│              ┌──────────────┐                    │
│              │  Publishing  │                    │
│              │  Queue       │                    │
│              └──────────────┘                    │
└─────────────────────────────────────────────────┘
```

### Event Sources and APIs

| Stream | Source | API/Method | Polling Frequency |
|---|---|---|---|
| **Earnings Calendar** | FMP `/earning_calendar` | MCP `fmp_data` tool | Daily (pre-load quarterly) |
| **Earnings Results** | FMP `/income-statement` + press releases | MCP `fmp_data` + `WebSearch` | Real-time on earnings day |
| **Investor Moves** | SEC 13F filings, 13D/G filings | MCP `baggers_sec_filings` + WebSearch | Weekly (13F quarterly, 13D real-time) |
| **Price Movements** | FMP `/quote` + `/technical_indicator` | MCP `fmp_data` | Hourly during market hours |
| **Industry Events** | SEMI.org, semiconductor billings, WSTS | `WebSearch` with saved queries | Weekly |
| **Social Trending** | Xueqiu trending, Twitter/X trending, r/wallstreetbets | `WebSearch` with curated queries | Every 4 hours |
| **Macro Events** | Fed decisions, CPI, tariff announcements | `WebSearch` + FMP `/economic` | Event-driven |
| **Polymarket** | Prediction markets on tech/geopolitics | MCP `polymarket_events` | Daily |
| **News Alerts** | Company-specific news (M&A, guidance changes) | `WebSearch` with ticker filter | Every 2 hours |

### Event Classification Schema

```json
{
  "event_id": "EVT-20260308-001",
  "timestamp": "2026-03-08T16:30:00Z",
  "type": "earnings_result",
  "ticker": "NVDA",
  "headline": "NVDA Q4 FY2026: Revenue $44.2B (+78% YoY), beats by $2.1B",
  "relevance_to_insights": [
    {
      "insight_id": "NVDA-CI-01",
      "match_type": "validation",  // or "contradiction" or "partial"
      "explanation": "Revenue beat reinforces platform narrative, but guidance for Q1 FY2027 shows deceleration to +45% — first step toward the cyclical thesis",
      "urgency": 9.5
    }
  ],
  "publishing_window": {
    "optimal_start": "2026-03-08T17:00:00Z",
    "optimal_end": "2026-03-09T12:00:00Z",
    "reason": "Post-earnings, pre-next-day-trading. Attention peaks in first 18 hours."
  }
}
```

### Urgency Scoring Algorithm

```
Urgency Score (0-10) = weighted sum of:

  Event Magnitude (25%):
    Earnings beat/miss > ±5%           → 8-10
    Guidance change                     → 7-9
    Major investor move (Buffett/段永平) → 8-10
    Industry data point                 → 5-7
    Social trending                     → 4-6

  Insight Match Quality (30%):
    Direct validation/contradiction     → 9-10
    Partial confirmation                → 6-8
    Tangential relevance                → 3-5
    No clear connection                 → 0-2

  Publishing Window Decay (20%):
    Within 2 hours of event             → 10
    Within 6 hours                      → 8
    Within 24 hours                     → 5
    Within 48 hours                     → 3
    Stale (>48 hours)                   → 1

  Audience Attention (15%):
    Ticker trending on social platforms → 8-10
    Earnings week (high market attention) → 6-8
    Normal trading day                  → 4-5
    Weekend/holiday                     → 2-3

  Content Readiness (10%):
    Insight pre-mined, crystal exists   → 10
    Insight exists but needs adaptation → 6-8
    New analysis needed                 → 2-4

THRESHOLD: Urgency >= 7.0 → auto-queue for production
           Urgency 5.0-6.9 → notify manager, await decision
           Urgency < 5.0   → log, do not produce
```

### Kairos Trigger Matrix (Pre-computed)

For each covered ticker, pre-register what events would activate what insights:

```yaml
# kairos_triggers/{TICKER}.yaml
NVDA:
  triggers:
    - event: "NVDA quarterly earnings"
      watch_for: "Revenue growth deceleration below 50% YoY"
      activates: "NVDA-CI-01 (周期股 thesis)"
      angle: "If revenue decelerates, the cyclical narrative gains evidence"
      urgency_boost: +2.0

    - event: "Hyperscaler CapEx reports (MSFT/GOOG/META/AMZN)"
      watch_for: "CapEx growth flattening or declining"
      activates: "NVDA-CI-01 + XREF-003 (ANET connection)"
      angle: "The upstream signal that NVDA's customers are pulling back"
      urgency_boost: +1.5

    - event: "Custom silicon announcements (Google TPU, Amazon Trainium)"
      watch_for: "Performance claims, workload migration numbers"
      activates: "NVDA-B4 (SPOF single point of failure)"
      angle: "Each custom chip announcement chips away at the 'irreplaceable' narrative"
      urgency_boost: +1.0

    - event: "段永平 portfolio disclosure"
      watch_for: "Any NVDA position change"
      activates: "Celebrity angle + whichever thesis aligns"
      angle: "Chinese retail investors follow 段永平 — his NVDA view is high-attention content"
      urgency_boost: +2.5
```

### Implementation: Cron-Based Monitor

```bash
# scripts/kairos_monitor.sh — runs every 4 hours via cron/launchd
# 1. Poll event sources (FMP earnings calendar, WebSearch for news)
# 2. Match events against kairos_triggers/*.yaml
# 3. Score urgency
# 4. If urgency >= 7.0, write to publishing_queue/
# 5. If urgency 5.0-6.9, send notification (macOS notification or webhook)

# Data flow:
# Event sources → events_log/{date}.jsonl (append-only event log)
# events_log/ + insight_store/ + kairos_triggers/ → publishing_queue/{event_id}.json
```

---

## Layer 3: Voice Synthesizer

### Problem

Investment research reads like investment research. Viral content reads like a person thinking out loud. The transformation is not cosmetic — it requires restructuring the logic flow from "evidence → conclusion" to "experience → recognition → evidence → implication."

### Voice Architecture: Four Transformation Passes

```
Pass 1: Perspective Shift (第三人称 → 第一人称)
  "SBUX's 4-minute wait time creates hidden costs"
  → "Every morning I watch that timer tick past four minutes"

Pass 2: Scale Translation (abstract → human)
  "$900M-$1.3B throughput cost"
  → "enough to fund 650 new stores or give every barista a $15K raise"

Pass 3: Tension Construction (fact → narrative arc)
  Static: "P/E is 36x but revenue will decline"
  Dynamic: "Here's the part that keeps me up at night: the same analysts who set that 36x price target? They're quietly projecting revenue will decline by 2028."

Pass 4: Landing (analysis → actionable question)
  "Our assessment is 审慎关注"
  → "So here's what I'm watching: [specific trigger]. If that happens, this entire narrative flips."
```

### Voice Profiles (Configurable)

Different platforms demand different voices:

```yaml
voice_profiles:
  xueqiu_contrarian:
    persona: "Experienced buy-side analyst sharing field notes"
    register: "Conversational but data-dense, Chinese"
    opening_pattern: "Hook with counterintuitive number or observation"
    structure: "Observation → Data → Implication → 'What I'm watching'"
    forbidden: ["我认为你应该买/卖", "推荐", "目标价", "建议"]
    required: ["具体数字", "对比锚点", "观察而非建议"]
    example_opening: "上周NVDA公布了又一个炸裂季报，华尔街一片欢呼。但有一个数字被所有人忽略了——"

  twitter_thread:
    persona: "Sharp-eyed researcher dropping a thread"
    register: "Punchy, each tweet self-contained, English"
    opening_pattern: "Bold claim in first tweet, evidence in thread"
    structure: "Claim → Evidence 1 → Evidence 2 → Twist → 'What to watch'"
    max_tweets: 12
    forbidden: ["buy", "sell", "financial advice", "NFA"]
    required: ["hook in tweet 1", "data in tweets 2-4", "turn in tweet 8-10"]
    example_opening: "NVIDIA is the most expensive cyclical stock in history. Here's what everyone is missing 🧵"

  wechat_longform:
    persona: "Patient researcher who finds hidden patterns"
    register: "Storytelling, educational, Chinese"
    opening_pattern: "Start with a vivid scene or personal anecdote"
    structure: "Scene → Question → Investigation → Discovery → Reflection"
    target_length: "8000-15000 characters"
    forbidden: ["投资建议", "买入/卖出", "推荐"]
    required: ["开场故事", "至少3个数据锚点", "跨公司连接", "开放性结尾"]
    example_opening: "2026年2月的一个下午，我在星巴克等了整整六分钟才拿到一杯美式。就在那六分钟里，我突然理解了这家公司财报里一个让我困惑了三个月的数字。"

  substack_deep:
    persona: "Independent researcher publishing original analysis"
    register: "Long-form analytical, English with Chinese concepts"
    opening_pattern: "Thesis statement + 'This piece argues...'"
    structure: "Thesis → Context → Three evidence pillars → Cross-company pattern → So what"
    target_length: "3000-6000 words"
    forbidden: ["financial advice", "buy/sell recommendation"]
    required: ["original framework name", "cross-report connection", "clear 'what to watch' section"]
```

### Transformation Engine: Prompt Chain

The voice transformation is an LLM task. The architecture wraps it in a structured pipeline:

```
Input: {
  insight: insight_store/{TICKER}_insights.json[insight_id],
  event: publishing_queue/{event_id}.json (if kairos-triggered),
  voice_profile: voice_profiles/{platform}.yaml,
  source_chapters: [relevant chapter text excerpts, max 8K chars each]
}

Step 1 — Fact Sheet Assembly (deterministic, no LLM)
  Extract from insight JSON:
  - Core claim (1 sentence)
  - Top 3 numbers with human-scale translations
  - Emotional anchors
  - Cross-references
  - Source chapter paths (for compliance fact-checking)

Step 2 — Draft Generation (LLM, voice-profile-constrained)
  System prompt includes:
  - Voice profile (persona, register, structure, forbidden words)
  - Fact sheet (all claims must trace to this)
  - Event context (if kairos-triggered)
  - Word count target
  - Compliance rules (Layer 4 pre-filter)

Step 3 — Compliance Scan (deterministic + LLM hybrid, see Layer 4)

Step 4 — Fact Verification (deterministic, see Quality Gate)
  Every number in draft must match a number in fact sheet or source chapter.
  Every claim must trace to an insight_id.
  Any unanchored claim → flag for removal or source addition.

Output: draft/{TICKER}_{platform}_{event_id}_{timestamp}.md
```

### Anti-Hallucination Contract

The Voice Synthesizer is the highest hallucination risk in the system. Guardrails:

1. **Closed-world facts**: The LLM may ONLY use numbers and claims present in the fact sheet. It may not introduce new data points, even if it "knows" them from training.
2. **Transformation, not generation**: The prompt explicitly says "Transform these facts into this voice. Do not add new facts."
3. **Post-generation diff**: A deterministic checker extracts all numbers from the draft and diffs against the fact sheet. Any number not in the fact sheet is flagged.
4. **Source tracing**: Every paragraph in the draft is tagged with the insight_id it draws from. Orphan paragraphs (no source) are flagged.

---

## Layer 4: Compliance Filter

### Problem

In China (Securities Law, Article 78) and the US (SEC regulations), publishing content that could be construed as investment advice without proper licensing creates legal risk. The system must transform all analytical language into observational/personal-view language while preserving the intellectual content.

### Two-Phase Compliance

**Phase A: Pre-Generation (Built into Voice Profiles)**

The voice profile's `forbidden` list prevents generation of prohibited terms. The system prompt includes:

```
COMPLIANCE RULES (NON-NEGOTIABLE):
1. You are sharing personal observations and research notes, NOT giving investment advice.
2. NEVER use: 买入/卖出/推荐/建议/目标价/buy/sell/recommend/target price/financial advice
3. ALWAYS frame as: "What I'm watching" / "What I find interesting" / "我的观察" / "值得关注的是"
4. Ratings from reports (审慎关注/-46%) must be translated to observational language:
   - "审慎关注, -46%" → "At current prices, there's a meaningful gap between what the market expects and what the numbers suggest"
   - "关注, +13.5%" → "This is one of the few names where I think the market might be underpricing the fundamentals"
5. Include disclaimer at end: "以上内容仅为个人研究笔记，不构成任何投资建议" / "This is personal research, not financial advice"
6. Taiwan/geopolitical: Use "台海冲突/cross-strait tension", never "invasion/入侵"
```

**Phase B: Post-Generation Scan (Deterministic)**

```python
# compliance_scanner.py

FORBIDDEN_PATTERNS = {
    "zh": [
        (r"买入|卖出|推荐|建议买|建议卖|目标价\d", "direct_advice"),
        (r"入侵台湾|中国入侵|invasion of Taiwan", "geopolitical"),
        (r"一定会涨|一定会跌|必然|保证", "certainty_language"),
    ],
    "en": [
        (r"(?i)\b(buy|sell|recommend|target price|price target)\b", "direct_advice"),
        (r"(?i)invasi?on? of Taiwan|China invades?", "geopolitical"),
        (r"(?i)\b(guaranteed|certain to|will definitely|must buy)\b", "certainty_language"),
    ]
}

REQUIRED_ELEMENTS = [
    (r"不构成.*投资建议|not financial advice|personal research", "disclaimer"),
]

def scan(text: str, language: str) -> dict:
    violations = []
    for pattern, category in FORBIDDEN_PATTERNS[language]:
        matches = re.findall(pattern, text)
        if matches:
            violations.append({"category": category, "matches": matches})

    missing = []
    for pattern, element in REQUIRED_ELEMENTS:
        if not re.search(pattern, text):
            missing.append(element)

    return {
        "compliant": len(violations) == 0 and len(missing) == 0,
        "violations": violations,
        "missing_elements": missing,
    }
```

### Compliance Transformation Table

| Source Language | Compliant Alternative |
|---|---|
| "我们评级为审慎关注" | "从估值角度看，市场定价隐含了相当乐观的假设" |
| "Expected return -46%" | "There's a meaningful gap between our assessment of fair value and the current price" |
| "This is a buy at $X" | "At $X, the risk-reward profile becomes interesting — but that's a personal view, not advice" |
| "We recommend avoiding" | "The numbers here make me cautious. Here's what would change my mind..." |
| "Target price $166" | "Our work suggests fair value sits meaningfully below where it trades today" |

---

## Layer 5: Distribution Optimizer

### Platform Specifications

```yaml
platforms:
  xueqiu:
    language: "zh"
    format: "single_post"
    length: "2000-5000 chars"
    strengths: ["data-heavy contrarian", "numbers-first", "比较分析"]
    audience: "Chinese retail investors, semi-professional"
    posting_times: "08:00-09:30 CST (pre-market), 20:00-22:00 CST (evening)"
    hooks: "Open with a counterintuitive number or a question that challenges consensus"
    media: "Tables, comparison charts (image format)"
    hashtags: true
    api: "Manual posting (no public API) or Selenium-based automation"

  twitter:
    language: "en"
    format: "thread"
    length: "12 tweets max, 280 chars each"
    strengths: ["punchy claims", "visual charts", "engagement hooks"]
    audience: "FinTwit, tech investors, quant community"
    posting_times: "09:00-10:00 ET (market open), 16:30-18:00 ET (post-close)"
    hooks: "Bold contrarian claim in tweet 1. Thread emoji in tweet 1."
    media: "Charts as images, Mermaid renders"
    api: "Twitter API v2 (OAuth 2.0)"

  wechat:
    language: "zh"
    format: "article"
    length: "8000-15000 chars"
    strengths: ["long-form storytelling", "educational deep dives", "cross-company narratives"]
    audience: "Chinese professional investors, finance professionals"
    posting_times: "07:00-08:00 CST (morning read), 20:00-21:00 CST (evening)"
    hooks: "Scene-setting opening, personal anecdote"
    media: "Embedded charts, pull quotes, section headers with icons"
    api: "WeChat Official Account API (requires verified account)"

  substack:
    language: "en"
    format: "article"
    length: "3000-6000 words"
    strengths: ["original frameworks", "cross-report synthesis", "intellectual depth"]
    audience: "Sophisticated investors, fund managers, research professionals"
    posting_times: "Tuesday/Thursday morning ET (highest open rates)"
    hooks: "Thesis-first opening with a named framework"
    media: "Inline charts, footnotes, cross-references to previous posts"
    api: "Substack API (draft creation) or manual posting"
```

### Content Adaptation Logic

A single insight produces multiple platform-specific outputs. The adaptation is not just about length — it changes structure:

```
Insight: NVDA-CI-01 "史上最贵的周期股"

→ Xueqiu (2500 chars):
  Para 1: Hook — "英伟达市值4.31万亿。但有一个数字被所有人忽略了。" (50 chars)
  Para 2: The number — Analyst FY2030 projections, revenue decline (300 chars)
  Para 3: Historical parallel — fiber/wireless/cloud CapEx cycles (500 chars)
  Para 4: The math — 36x P/E vs cyclical 15-20x range, implied downside (400 chars)
  Para 5: Cross-reference — ANET's Cisco 1998 mirror (300 chars)
  Para 6: What I'm watching — Hyperscaler CapEx trajectory next quarter (300 chars)
  Disclaimer (100 chars)

→ Twitter (8 tweets):
  T1: "NVIDIA might be the most expensive cyclical stock in history. Here's what the $4.3T valuation implies 🧵"
  T2: "The analysts who price NVDA at 36x P/E? They project revenue will DECLINE by FY2030. Read that again."
  T3: "We've seen this movie before. Fiber optics (2000). Wireless 4G (2014). Cloud buildout (2018-19). Every CapEx cycle peaks — and the stocks that ride them crash 40-60%."
  T4: [Chart: CapEx cycles overlaid]
  T5: "The bull case: NVIDIA is different because CUDA = platform. The bear case: 85%+ of revenue is still hardware sold to CapEx budgets."
  T6: "Here's the number that haunts me: 9.4x. That's the spread between our bull ($7.5T) and bear ($0.8T) scenarios. No other company we've analyzed has a range this wide."
  T7: "What to watch: Hyperscaler CapEx reports. The moment MSFT/GOOG/META signal CapEx flattening, this $4.3T edifice starts to shake."
  T8: "Full analysis: [link]. This is personal research, not financial advice."

→ WeChat (12000 chars):
  [Full storytelling arc — 8 sections with narrative bridges]

→ Substack (4500 words):
  [Analytical deep dive with cross-report synthesis]
```

### Format Templates as Code

```python
# format_adapter.py

class PlatformAdapter:
    def __init__(self, platform_config: dict, voice_profile: dict):
        self.config = platform_config
        self.voice = voice_profile

    def structure_content(self, insight: dict, event: dict = None) -> dict:
        """Generate platform-specific content structure."""
        if self.config["format"] == "thread":
            return self._build_thread(insight, event)
        elif self.config["format"] == "single_post":
            return self._build_post(insight, event)
        elif self.config["format"] == "article":
            return self._build_article(insight, event)

    def _build_thread(self, insight, event) -> dict:
        max_tweets = self.config.get("max_tweets", 12)
        return {
            "format": "thread",
            "sections": [
                {"role": "hook", "max_chars": 250, "source": "headline + emotional_anchor"},
                {"role": "evidence", "count": 3, "max_chars": 250, "source": "numbers_that_tell_stories"},
                {"role": "turn", "max_chars": 250, "source": "contrarian_core"},
                {"role": "cross_reference", "max_chars": 250, "source": "cross_report_connections"},
                {"role": "watch", "max_chars": 250, "source": "kairos_triggers"},
                {"role": "disclaimer", "max_chars": 100, "source": "static"},
            ],
            "total_tweets": min(max_tweets, 8 + len(insight.get("cross_references", []))),
        }

    def _build_post(self, insight, event) -> dict:
        return {
            "format": "single_post",
            "sections": [
                {"role": "hook", "max_chars": 100, "source": "headline + counterintuitive_number"},
                {"role": "body", "max_chars": self.config["length"].split("-")[1], "paragraphs": 5},
                {"role": "watchlist", "max_chars": 400, "source": "kairos_triggers"},
                {"role": "disclaimer", "max_chars": 150, "source": "static"},
            ],
        }
```

---

## Layer 6: Manager-Orchestrator Pattern

### Agent Roles

```
┌──────────────────────────────────────────────────────────────────┐
│                     MANAGER AGENT                                │
│  Responsibilities:                                               │
│  - Run Kairos Detection on schedule                             │
│  - Score and prioritize publishing opportunities                 │
│  - Assign content production to Content Agents                  │
│  - Review Quality Gate results, approve/reject                  │
│  - Manage publishing schedule (avoid flooding)                   │
│                                                                  │
│  State: publishing_queue/ + content_calendar.json               │
│  Trigger: Cron (every 4 hours) or manual ("write about X")      │
└──────────────┬───────────────────────────────────────────────────┘
               │ dispatches
               ▼
┌──────────────────────────────────────────────────────────────────┐
│                   CONTENT AGENTS (parallel)                      │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Thread Agent │ │ Article     │ │ Deep Dive   │               │
│  │ (Twitter)    │ │ Agent       │ │ Agent        │               │
│  │              │ │ (Xueqiu/WC) │ │ (Substack)  │               │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘               │
│         │               │               │                       │
│         └───────────────┼───────────────┘                       │
│                         ▼                                       │
│              ┌──────────────────┐                               │
│              │   staging/       │  ← all drafts land here       │
│              │   content/       │                               │
│              └────────┬─────────┘                               │
└───────────────────────┼─────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                   QUALITY GATE AGENT                             │
│                                                                  │
│  Checks:                                                        │
│  1. Compliance scan (Layer 4) — zero tolerance                  │
│  2. Fact verification — every number traces to insight_store     │
│  3. Voice consistency — matches target voice profile             │
│  4. Length compliance — within platform bounds                    │
│  5. Cross-check vs source report — no hallucinated claims       │
│                                                                  │
│  Output: PASS (auto-publish) / REVISE (return to Content Agent) │
│          / BLOCK (escalate to human)                            │
│                                                                  │
│  BLOCK triggers:                                                │
│  - Any compliance violation                                     │
│  - Any number not traceable to source                           │
│  - Factual claim contradicts source report                      │
└──────────────┬───────────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────────┐
│                   PUBLISHER AGENT                                │
│                                                                  │
│  Responsibilities:                                               │
│  - Apply platform-specific formatting (markdown → rich text)    │
│  - Generate chart images from Mermaid/data                      │
│  - Schedule posts according to optimal timing                   │
│  - Archive published content with source tracing                │
│                                                                  │
│  Output: published/{platform}/{date}_{ticker}_{insight_id}/     │
│          ├── content.md (final text)                            │
│          ├── metadata.json (source tracing, compliance log)     │
│          ├── charts/ (rendered images)                           │
│          └── performance.json (engagement metrics, added later)  │
└──────────────────────────────────────────────────────────────────┘
```

### Orchestration Flow (End-to-End)

```
1. TRIGGER
   ├── Cron: Kairos monitor detects event (urgency >= 7.0)
   ├── Manual: User says "write a thread about NVDA earnings"
   └── Scheduled: Content calendar says "Tuesday Substack article due"

2. MANAGER receives trigger
   ├── Loads relevant insight_store/{TICKER}_insights.json
   ├── Selects best insight(s) for the trigger
   ├── Determines target platforms (1-4 simultaneous)
   └── Dispatches to Content Agents (parallel)

3. CONTENT AGENTS (parallel execution)
   ├── Each agent receives: insight JSON + voice profile + event context
   ├── Runs Voice Synthesizer (Layer 3)
   ├── Writes draft to staging/content/{platform}_{ticker}_{timestamp}.md
   └── Returns status to Manager

4. QUALITY GATE (sequential per draft)
   ├── Compliance scan → PASS/FAIL
   ├── Fact verification → PASS/FAIL
   ├── Voice check → PASS/WARN
   └── Result: PASS → Publisher | REVISE → back to Content Agent | BLOCK → human

5. PUBLISHER
   ├── Formats for platform
   ├── Renders charts
   ├── Posts (or queues for manual posting)
   └── Archives to published/

6. FEEDBACK LOOP (delayed)
   ├── After 24h: Scrape engagement metrics (likes, shares, comments)
   ├── After 7d: Calculate virality score vs prediction
   └── Feed back into Virality Score calibration
```

### File System Layout

```
投资大师/
├── narrative_engine/
│   ├── insight_store/          # Layer 1 output: mined insights per ticker
│   │   ├── NVDA_insights.json
│   │   ├── SBUX_insights.json
│   │   └── ...
│   ├── kairos_triggers/        # Layer 2 config: event-to-insight mappings
│   │   ├── NVDA.yaml
│   │   ├── SBUX.yaml
│   │   └── ...
│   ├── events_log/             # Layer 2 output: raw event stream
│   │   └── 2026-03-08.jsonl
│   ├── publishing_queue/       # Layer 2 output: scored opportunities
│   │   └── EVT-20260308-001.json
│   ├── voice_profiles/         # Layer 3 config
│   │   ├── xueqiu_contrarian.yaml
│   │   ├── twitter_thread.yaml
│   │   ├── wechat_longform.yaml
│   │   └── substack_deep.yaml
│   ├── staging/                # Layer 3+6 output: drafts in progress
│   │   └── content/
│   ├── published/              # Layer 6 output: archived published content
│   │   ├── xueqiu/
│   │   ├── twitter/
│   │   ├── wechat/
│   │   └── substack/
│   ├── content_calendar.json   # Scheduling state
│   └── performance/            # Feedback loop data
│       └── engagement_metrics.jsonl
├── scripts/
│   ├── mine_report.sh          # Layer 1: run mining on a completed report
│   ├── kairos_monitor.sh       # Layer 2: cron-based event scanner
│   ├── produce_content.sh      # Layer 3+4+5: end-to-end content production
│   └── publish.sh              # Layer 6: format and post/queue
└── ...
```

---

## Data Flow Summary

```
                    REPORT COMPLETE
                         │
                         ▼
              ┌─────────────────────┐
              │  mine_report.sh     │  ONE-TIME per report version
              │  (Layer 1)          │
              └──────────┬──────────┘
                         │
                         ▼
              insight_store/{TICKER}.json
              + kairos_triggers/{TICKER}.yaml
                         │
                         │ (sits dormant until event)
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Earnings │  │ Investor │  │ Trending │   EVENT STREAMS
    │ Report   │  │ Move     │  │ Topic    │   (Layer 2)
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         └─────────────┼─────────────┘
                       ▼
              Urgency Score >= 7.0?
              ┌────────┴────────┐
              │ YES             │ NO
              ▼                 ▼
    publishing_queue/      (log + wait)
              │
              ▼
    Manager selects platforms
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
   Thread   Article   Deep     CONTENT AGENTS (Layer 3)
   Agent    Agent     Agent    (parallel)
     │        │        │
     └────────┼────────┘
              ▼
    Compliance + Fact Check        QUALITY GATE (Layer 4)
              │
         ┌────┴────┐
         │PASS     │FAIL
         ▼         ▼
    Format +    Revise or
    Publish     Block          PUBLISHER (Layer 5+6)
         │
         ▼
    published/{platform}/
         │
         │ (24h-7d later)
         ▼
    Engagement metrics → recalibrate virality scores
```

---

## Required MCP Tools and APIs

### Existing (already available in the system)

| Tool | Use in Narrative Engine |
|---|---|
| `fmp_data` | Earnings calendar, financial data for fact-checking, price quotes |
| `analyze_stock` | Quick validation of claims before publishing |
| `baggers_sec_filings` | 13F/13D monitoring for investor moves |
| `polymarket_events` | Prediction market data for narrative hooks |
| `screen_stocks` | Identify stocks moving into interesting territory |
| `WebSearch` | News monitoring, social trend detection, industry events |
| `WebFetch` | Scrape specific pages for event details |

### New Tools Needed

| Tool | Purpose | Implementation |
|---|---|---|
| **Earnings Calendar Monitor** | Pre-load next 30 days of earnings for covered tickers | Wrapper around `fmp_data` with `/earning_calendar` endpoint |
| **Social Trend Scanner** | Poll Xueqiu trending, FinTwit, Reddit for covered tickers | `WebSearch` with curated query templates, run on schedule |
| **Chart Renderer** | Convert Mermaid diagrams and data tables to shareable images | `mermaid-cli` (mmdc) locally, or API-based renderer |
| **Platform Publisher** | Post to Twitter API v2, format for WeChat API | Per-platform API clients (Twitter OAuth 2.0, WeChat Official Account) |
| **Engagement Tracker** | Scrape post performance metrics after publishing | Platform-specific API calls for likes/shares/comments |

### API Dependencies

| Service | API | Auth | Cost |
|---|---|---|---|
| Twitter/X | API v2 (Pro tier) | OAuth 2.0 | ~$100/month |
| Financial Modeling Prep | REST API | API key (existing) | Existing subscription |
| Xueqiu | No official API | Manual or browser automation | Free |
| WeChat Official Account | Official API | Verified account | Free (account setup required) |
| Substack | No official API | Manual posting or email-based | Free |
| Mermaid CLI | Local tool (mmdc) | None | Free |

---

## Bootstrap Sequence

Phase 1 (Week 1-2): Mine existing reports
- Run Layer 1 on all 32 completed reports
- Build insight_store/ with ~200+ insights
- Build cross-reference graph
- Manually validate virality scores on top 20 insights

Phase 2 (Week 3-4): Build Kairos triggers
- Create kairos_triggers/ for all covered tickers
- Set up cron-based monitoring (kairos_monitor.sh)
- Test with historical events: "Would this system have caught the right moment?"

Phase 3 (Week 5-6): Voice synthesis pilot
- Write voice profiles for Xueqiu and Twitter
- Manually produce 10 pieces of content using the pipeline
- Calibrate voice profiles based on output quality

Phase 4 (Week 7-8): Automation
- Wire up end-to-end: event → insight match → content production → compliance → staging
- Human-in-the-loop: Manager auto-produces drafts, human approves before publishing
- Begin publishing with manual approval gate

Phase 5 (Ongoing): Feedback loop
- Track engagement metrics per piece
- Recalibrate virality scores
- A/B test voice profiles
- Gradually reduce human approval to compliance-only review

---

## Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| **Hallucinated numbers in content** | Critical | Closed-world fact sheet + post-generation number diff + source tracing |
| **Compliance violation (investment advice)** | Critical | Two-phase filter (pre-generation + post-generation scan) + human review |
| **Stale insights (report updated but content uses old version)** | Medium | insight_store keyed by report version; re-mine on version change |
| **Voice feels robotic/generic** | Medium | Multiple voice profiles; A/B testing; feedback loop from engagement |
| **Kairos false positives (publishing on noise)** | Low | Urgency threshold at 7.0; 5.0-6.9 requires human decision |
| **Platform API changes** | Low | Abstraction layer; manual fallback for all platforms |
| **Over-publishing (audience fatigue)** | Medium | Content calendar enforces max 2 posts/platform/week |

---

## Key Design Decisions and Rationale

1. **Insight Store is pre-computed, not real-time.** Mining a 500K report takes substantial context. Doing it once per report and storing the results as structured JSON means the event-response pipeline is fast (seconds, not minutes). The mining happens at report completion time, integrated into `post_report_autopsy.sh`.

2. **Kairos triggers are hand-authored per ticker, not ML-inferred.** With 32 tickers, hand-authoring triggers is feasible and more reliable than trying to learn event-insight mappings from zero training data. As the system publishes and tracks engagement, the trigger library can be refined.

3. **Voice synthesis is an LLM task, everything else is deterministic.** The compliance filter, fact verification, and platform adaptation are code, not AI. Only the creative voice transformation uses an LLM. This minimizes the surface area for hallucination.

4. **Human-in-the-loop is the default, not an exception.** The system produces drafts and queues them for human approval. Full automation is a later phase after the compliance filter is battle-tested.

5. **The excellence_catalog.yaml is the concept crystal seed bank.** With 37 champion entries already indexed, the system starts with a rich inventory of proven, high-virality concepts rather than trying to discover them from scratch.
