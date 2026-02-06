---
name: data-prefetch
description: 数据自动预取。分析启动时自动调用MCP工具+Python估值模型，将结构化数据缓存到 data/research/[TICKER]/，消除手动搜索。
---

# 数据自动预取技能

## 触发条件

在任何 Tier 2/Tier 3 分析启动时，编排器 Step 2 自动调用此技能。

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

### Step 3: Python估值模型（顺序执行）

依赖 Step 2 的 stock_full.json 数据：

```bash
# DCF计算
python3 tools/valuation_models/dcf_calculator.py {TICKER} > data/research/{TICKER}/dcf_valuation.json

# 可比公司分析
python3 tools/valuation_models/comparable_companies.py {TICKER} {PEERS} > data/research/{TICKER}/comparable_analysis.json
```

### Step 4: 生成元数据

写入 `data/research/{TICKER}/prefetch_metadata.json`:

```json
{
  "ticker": "{TICKER}",
  "timestamp": "{ISO8601}",
  "data_files": {
    "stock_full": {"status": "ok|error", "source": "MCP:analyze_stock"},
    "peer_comparison": {"status": "ok|error", "source": "MCP:compare_stocks"},
    "market_context": {"status": "ok|error", "source": "MCP:get_market_overview"},
    "dcf_valuation": {"status": "ok|error", "source": "Python:dcf_calculator"},
    "comparable_analysis": {"status": "ok|error", "source": "Python:comparable_companies"}
  },
  "quality": {
    "complete_fields": 0,
    "total_fields": 0,
    "completeness_pct": 0
  }
}
```

## 缓存结构

```
data/research/{TICKER}/
├── stock_full.json          # MCP: 价格+基本面+技术指标(2年)
├── peer_comparison.json     # MCP: 同行对比(含SPY基准)
├── market_context.json      # MCP: S&P500/道琼斯/纳斯达克/VIX
├── dcf_valuation.json       # Python: DCF模型输出
├── comparable_analysis.json # Python: 可比公司分析
└── prefetch_metadata.json   # 时间戳+数据质量+来源
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

## 过期规则

| 条件 | 处理 |
|------|------|
| 数据 <24h | 直接使用，显示"[缓存: 新鲜]" |
| 数据 24h-7天 | 使用但警告: "[缓存: ⚠️ 数据已{N}天，建议刷新]" |
| 数据 >7天 | 强制刷新: 自动重新预取 |
| 财报发布后 | 强制刷新: 检测到新财报季，必须重新预取 |

## 刷新检查

```
# 检查缓存是否存在且有效
if data/research/{TICKER}/prefetch_metadata.json 存在:
    读取 timestamp
    if 距今 <24h → 跳过预取，使用缓存
    if 距今 24h-7天 → 提示用户是否刷新
    if 距今 >7天 → 自动刷新
else:
    执行完整预取
```

## 数据引用格式

预取数据在报告中引用时使用标准标注：

- `[实际数据 | MCP:analyze_stock | {日期}]` — 来自MCP工具
- `[模型输出 | Python:dcf_calculator | {日期}]` — 来自Python估值
- `[市场数据 | MCP:get_market_overview | {日期}]` — 来自市场概览

## 错误处理

| 错误 | 处理 |
|------|------|
| MCP服务器未连接 | 回退到 WebSearch 手动获取，标注"[WebSearch回退]" |
| yfinance API限流 | 等待30秒重试1次，仍失败则标注"[数据暂不可用]" |
| Python工具报错 | 跳过该步骤，标注"[需手动估值]"，不阻塞流程 |
| 股票代码无效 | 立即终止，提示用户确认代码 |
