# 投资大师 MCP Server - 优化版

## 优化要点

### 1. 简化工具定义
- `list_tools()` 不再重复完整的 inputSchema
- 减少 token 消耗，提升 Claude Desktop 调用效率

### 2. 简化参数

#### analyze_stock
```python
# 之前（复杂）
{
    "symbol": "AAPL",
    "include_fundamentals": true,
    "include_technical": true,
    "include_history": true,
    "period": "1y"
}

# 现在（简单）
{
    "symbol": "AAPL",
    "data_types": "full",  # basic | full | technical
    "period": "1y"         # 可选，默认 1y
}
```

#### compare_stocks
```python
# 之前（复杂）
{
    "symbols": ["AAPL", "MSFT"],
    "metrics": ["pe_ratio", "pb_ratio", "roe", ...],
    "benchmark": "SPY"
}

# 现在（简单）
{
    "symbols": ["AAPL", "MSFT"],
    # metrics 可选，默认核心指标
    # benchmark 可选，默认 SPY
}
```

#### screen_stocks
```python
# 之前（复杂）
{
    "symbols": ["AAPL", "MSFT", ...],
    "filters": {
        "pe_max": 15,
        "pb_max": 2,
        "dividend_yield_min": 0.02,
        ...
    }
}

# 现在（简单）
{
    "symbols": ["AAPL", "MSFT", ...],
    "preset": "value"  # value | growth | dividend | momentum
}
```

### 3. 智能缓存
- 5分钟内存缓存
- 避免重复请求 yfinance
- 自动清理过期数据

### 4. 预设过滤器

| Preset | 说明 | 条件 |
|--------|------|------|
| value | 价值股 | PE<15, PB<2, 股息率>2% |
| growth | 成长股 | 营收增长>15%, ROE>15% |
| dividend | 股息股 | 股息率>3%, 派息率<70% |
| momentum | 动量股 | 1月涨幅>5%, 3月涨幅>10% |

## 安装

```bash
cd /Users/milton/投资大师/mcp_server
pip install -r requirements.txt
```

## Claude Desktop 配置

在 `~/Library/Application Support/Claude/claude_desktop_config.json` 添加：

```json
{
  "mcpServers": {
    "investment-master": {
      "command": "python3",
      "args": ["/Users/milton/投资大师/mcp_server/main.py"]
    }
  }
}
```

## 使用示例

### 1. 基础分析
```
请使用 analyze_stock 分析 AAPL，只需要基础数据
→ {"symbol": "AAPL", "data_types": "basic"}
```

### 2. 完整分析
```
请使用 analyze_stock 对 TSMC 做完整分析
→ {"symbol": "TSM", "data_types": "full"}
```

### 3. 技术分析
```
请分析 NVDA 的技术指标
→ {"symbol": "NVDA", "data_types": "technical"}
```

### 4. 股票对比
```
对比 AAPL 和 MSFT
→ {"symbols": ["AAPL", "MSFT"]}
自动使用默认指标和 SPY 基准
```

### 5. 筛选价值股
```
从这些股票中筛选价值股：AAPL, MSFT, TSM, NVDA
→ {"symbols": ["AAPL", "MSFT", "TSM", "NVDA"], "preset": "value"}
```

### 6. 筛选成长股
```
筛选成长股
→ {"symbols": [...], "preset": "growth"}
```

## Token 节省对比

### 之前
```
list_tools() 返回: ~8000 tokens（完整 inputSchema）
单次调用参数: ~500 tokens（多个布尔参数）
```

### 现在
```
list_tools() 返回: ~2000 tokens（简化描述）
单次调用参数: ~150 tokens（简化参数）
节省: ~75%
```

## 缓存效果

### 无缓存
```
第1次请求 AAPL: 2.5秒
第2次请求 AAPL: 2.5秒
第3次请求 AAPL: 2.5秒
总耗时: 7.5秒
```

### 有缓存（5分钟内）
```
第1次请求 AAPL: 2.5秒
第2次请求 AAPL: 0.001秒 ⚡
第3次请求 AAPL: 0.001秒 ⚡
总耗时: 2.5秒（节省66%）
```

## 预设过滤器详情

### value（价值股）
```python
{
    "pe_max": 15,           # PE < 15
    "pb_max": 2,            # PB < 2
    "dividend_yield_min": 0.02,  # 股息率 > 2%
    "market_cap_min": 1e9   # 市值 > 10亿
}
```

### growth（成长股）
```python
{
    "revenue_growth_min": 0.15,  # 营收增长 > 15%
    "earnings_growth_min": 0.20, # 盈利增长 > 20%
    "roe_min": 0.15,             # ROE > 15%
    "market_cap_min": 5e9        # 市值 > 50亿
}
```

### dividend（股息股）
```python
{
    "dividend_yield_min": 0.03,   # 股息率 > 3%
    "payout_ratio_max": 0.70,     # 派息率 < 70%
    "dividend_growth_min": 0.05,  # 股息增长 > 5%
    "market_cap_min": 2e9         # 市值 > 20亿
}
```

### momentum（动量股）
```python
{
    "return_1m_min": 0.05,        # 1月涨幅 > 5%
    "return_3m_min": 0.10,        # 3月涨幅 > 10%
    "volume_increase_min": 1.5,   # 成交量增长 > 50%
    "market_cap_min": 1e9         # 市值 > 10亿
}
```

## 错误处理

所有函数都包含 try-except，返回格式：

```json
{
  "error": "错误信息",
  "symbol": "AAPL"
}
```

## 性能监控

可以在代码中添加性能监控：

```python
import time

start = time.time()
# ... 执行函数
elapsed = time.time() - start
print(f"Executed in {elapsed:.2f}s")
```
