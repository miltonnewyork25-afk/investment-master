#!/usr/bin/env python3
"""
优化的 MCP Server for 投资大师
- 简化工具定义，减少 token 消耗
- 添加智能缓存
- 预设过滤器
"""

import asyncio
import json
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional
import yfinance as yf
from mcp.server import Server
from mcp.types import Tool, TextContent

# ============================================================
# 内存缓存（5分钟有效期）
# ============================================================

class SimpleCache:
    """简单的内存缓存，5分钟过期"""
    def __init__(self, ttl_seconds: int = 300):
        self.cache: Dict[str, tuple[Any, datetime]] = {}
        self.ttl = timedelta(seconds=ttl_seconds)

    def get(self, key: str) -> Optional[Any]:
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < self.ttl:
                return data
            else:
                del self.cache[key]
        return None

    def set(self, key: str, value: Any):
        self.cache[key] = (value, datetime.now())

    def clear_expired(self):
        """清理过期缓存"""
        now = datetime.now()
        expired_keys = [
            k for k, (_, ts) in self.cache.items()
            if now - ts >= self.ttl
        ]
        for k in expired_keys:
            del self.cache[k]

cache = SimpleCache(ttl_seconds=300)

# ============================================================
# 预设过滤器
# ============================================================

SCREEN_PRESETS = {
    "value": {
        "name": "价值股筛选",
        "criteria": {
            "pe_max": 15,
            "pb_max": 2,
            "dividend_yield_min": 0.02,
            "market_cap_min": 1e9
        }
    },
    "growth": {
        "name": "成长股筛选",
        "criteria": {
            "revenue_growth_min": 0.15,
            "earnings_growth_min": 0.20,
            "roe_min": 0.15,
            "market_cap_min": 5e9
        }
    },
    "dividend": {
        "name": "股息股筛选",
        "criteria": {
            "dividend_yield_min": 0.03,
            "payout_ratio_max": 0.70,
            "dividend_growth_min": 0.05,
            "market_cap_min": 2e9
        }
    },
    "momentum": {
        "name": "动量股筛选",
        "criteria": {
            "return_1m_min": 0.05,
            "return_3m_min": 0.10,
            "volume_increase_min": 1.5,
            "market_cap_min": 1e9
        }
    }
}

# ============================================================
# 核心数据获取函数
# ============================================================

def get_stock_data(symbol: str, period: str = "1y") -> Dict[str, Any]:
    """获取股票数据（带缓存）— 返回可JSON序列化的紧凑格式"""
    cache_key = f"stock_data:{symbol}:{period}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    try:
        ticker = yf.Ticker(symbol)

        # 基础数据
        info = ticker.info
        history = ticker.history(period=period)

        # 将历史数据转为紧凑摘要（避免Timestamp序列化错误）
        history_summary = {}
        if not history.empty:
            # 最近5个交易日
            recent = history.tail(5)
            history_summary["recent_5d"] = [
                {
                    "date": idx.strftime("%Y-%m-%d"),
                    "close": round(float(row["Close"]), 2),
                    "volume": int(row["Volume"])
                }
                for idx, row in recent.iterrows()
            ]
            # 区间统计
            history_summary["period_high"] = round(float(history["Close"].max()), 2)
            history_summary["period_low"] = round(float(history["Close"].min()), 2)
            history_summary["period_return"] = round(
                float((history["Close"].iloc[-1] / history["Close"].iloc[0] - 1) * 100), 2
            )
            history_summary["avg_volume"] = int(history["Volume"].mean())
            history_summary["trading_days"] = len(history)

        data = {
            "symbol": symbol,
            "name": info.get("longName", symbol),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "price": info.get("currentPrice"),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "pb_ratio": info.get("priceToBook"),
            "dividend_yield": info.get("dividendYield"),
            "beta": info.get("beta"),
            "52w_high": info.get("fiftyTwoWeekHigh"),
            "52w_low": info.get("fiftyTwoWeekLow"),
            "revenue": info.get("totalRevenue"),
            "revenue_growth": info.get("revenueGrowth"),
            "profit_margin": info.get("profitMargins"),
            "operating_margin": info.get("operatingMargins"),
            "roe": info.get("returnOnEquity"),
            "free_cashflow": info.get("freeCashflow"),
            "history_summary": history_summary
        }

        cache.set(cache_key, data)
        return data

    except Exception as e:
        return {"error": str(e), "symbol": symbol}

def get_stock_fundamentals(symbol: str) -> Dict[str, Any]:
    """获取基本面数据（带缓存）"""
    cache_key = f"fundamentals:{symbol}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info

        data = {
            "symbol": symbol,
            "revenue": info.get("totalRevenue"),
            "revenue_growth": info.get("revenueGrowth"),
            "earnings": info.get("netIncomeToCommon"),
            "earnings_growth": info.get("earningsGrowth"),
            "profit_margin": info.get("profitMargins"),
            "operating_margin": info.get("operatingMargins"),
            "roe": info.get("returnOnEquity"),
            "roa": info.get("returnOnAssets"),
            "debt_to_equity": info.get("debtToEquity"),
            "current_ratio": info.get("currentRatio"),
            "free_cashflow": info.get("freeCashflow"),
        }

        cache.set(cache_key, data)
        return data

    except Exception as e:
        return {"error": str(e), "symbol": symbol}

def get_technical_indicators(symbol: str, period: str = "1y") -> Dict[str, Any]:
    """获取技术指标（带缓存）"""
    cache_key = f"technical:{symbol}:{period}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    try:
        ticker = yf.Ticker(symbol)
        history = ticker.history(period=period)

        if history.empty:
            return {"error": "No data", "symbol": symbol}

        # 计算简单移动平均
        history['SMA_20'] = history['Close'].rolling(window=20).mean()
        history['SMA_50'] = history['Close'].rolling(window=50).mean()
        history['SMA_200'] = history['Close'].rolling(window=200).mean()

        # 计算RSI
        delta = history['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        history['RSI'] = 100 - (100 / (1 + rs))

        latest = history.iloc[-1]

        data = {
            "symbol": symbol,
            "price": latest['Close'],
            "sma_20": latest['SMA_20'],
            "sma_50": latest['SMA_50'],
            "sma_200": latest['SMA_200'],
            "rsi": latest['RSI'],
            "volume": latest['Volume'],
            "trend": "上涨" if latest['Close'] > latest['SMA_50'] else "下跌"
        }

        cache.set(cache_key, data)
        return data

    except Exception as e:
        return {"error": str(e), "symbol": symbol}

# ============================================================
# MCP Server
# ============================================================

app = Server("investment-master")

@app.list_tools()
async def list_tools() -> list[Tool]:
    """简化的工具列表，不重复完整 schema"""
    return [
        Tool(
            name="analyze_stock",
            description="分析单只股票。data_types: basic(基础), full(完整), technical(技术). period默认1y",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "股票代码"},
                    "data_types": {
                        "type": "string",
                        "enum": ["basic", "full", "technical"],
                        "default": "basic"
                    },
                    "period": {
                        "type": "string",
                        "default": "1y"
                    }
                },
                "required": ["symbol"]
            }
        ),
        Tool(
            name="compare_stocks",
            description="对比多只股票。metrics可选，默认比较核心指标。benchmark默认SPY",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbols": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "metrics": {
                        "type": "array",
                        "items": {"type": "string"},
                        "default": ["pe_ratio", "pb_ratio", "roe", "market_cap"]
                    },
                    "benchmark": {
                        "type": "string",
                        "default": "SPY"
                    }
                },
                "required": ["symbols"]
            }
        ),
        Tool(
            name="screen_stocks",
            description="筛选股票。使用preset: value(价值), growth(成长), dividend(股息), momentum(动量)",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbols": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "preset": {
                        "type": "string",
                        "enum": ["value", "growth", "dividend", "momentum"]
                    }
                },
                "required": ["symbols", "preset"]
            }
        ),
        Tool(
            name="get_market_overview",
            description="获取市场概览（主要指数）",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """处理工具调用"""

    # 清理过期缓存
    cache.clear_expired()

    try:
        if name == "analyze_stock":
            symbol = arguments.get("symbol")
            data_types = arguments.get("data_types", "basic")
            period = arguments.get("period", "1y")

            result = {}

            if data_types in ["basic", "full"]:
                result["basic_data"] = get_stock_data(symbol, period)

            if data_types == "full":
                result["fundamentals"] = get_stock_fundamentals(symbol)
                result["technical"] = get_technical_indicators(symbol, period)

            if data_types == "technical":
                result["technical"] = get_technical_indicators(symbol, period)

            # 确保所有数据可JSON序列化
            return [TextContent(
                type="text",
                text=json.dumps(result, indent=2, ensure_ascii=False, default=str)
            )]

        elif name == "compare_stocks":
            symbols = arguments.get("symbols", [])
            metrics = arguments.get("metrics", ["pe_ratio", "pb_ratio", "roe", "market_cap"])
            benchmark = arguments.get("benchmark", "SPY")

            # 添加 benchmark 到对比列表
            all_symbols = symbols + [benchmark]

            comparison = {}
            for symbol in all_symbols:
                data = get_stock_data(symbol)
                fundamentals = get_stock_fundamentals(symbol)

                comparison[symbol] = {
                    metric: data.get(metric) or fundamentals.get(metric)
                    for metric in metrics
                }

            return [TextContent(
                type="text",
                text=json.dumps(comparison, indent=2, ensure_ascii=False, default=str)
            )]

        elif name == "screen_stocks":
            symbols = arguments.get("symbols", [])
            preset = arguments.get("preset")

            if preset not in SCREEN_PRESETS:
                return [TextContent(
                    type="text",
                    text=json.dumps({"error": f"Invalid preset: {preset}"})
                )]

            preset_config = SCREEN_PRESETS[preset]
            criteria = preset_config["criteria"]

            results = []
            for symbol in symbols:
                data = get_stock_data(symbol)
                fundamentals = get_stock_fundamentals(symbol)

                # 合并数据
                stock_data = {**data, **fundamentals}

                # 检查是否满足条件
                passes = True
                reasons = []

                for key, value in criteria.items():
                    if key.endswith("_min"):
                        metric = key.replace("_min", "")
                        stock_value = stock_data.get(metric)
                        if stock_value is None or stock_value < value:
                            passes = False
                            reasons.append(f"{metric} too low")

                    elif key.endswith("_max"):
                        metric = key.replace("_max", "")
                        stock_value = stock_data.get(metric)
                        if stock_value is None or stock_value > value:
                            passes = False
                            reasons.append(f"{metric} too high")

                if passes:
                    results.append({
                        "symbol": symbol,
                        "name": stock_data.get("name"),
                        "passed": True,
                        "data": {k: stock_data.get(k.replace("_min", "").replace("_max", ""))
                                for k in criteria.keys()}
                    })
                else:
                    results.append({
                        "symbol": symbol,
                        "passed": False,
                        "reasons": reasons
                    })

            return [TextContent(
                type="text",
                text=json.dumps({
                    "preset": preset,
                    "preset_name": preset_config["name"],
                    "criteria": criteria,
                    "results": results,
                    "passed_count": sum(1 for r in results if r.get("passed"))
                }, indent=2, ensure_ascii=False, default=str)
            )]

        elif name == "get_market_overview":
            indices = ["^GSPC", "^DJI", "^IXIC", "^VIX"]
            overview = {}

            for index in indices:
                try:
                    t = yf.Ticker(index)
                    hist = t.history(period="5d")
                    if not hist.empty and len(hist) >= 2:
                        last_close = float(hist["Close"].iloc[-1])
                        prev_close = float(hist["Close"].iloc[-2])
                        change_pct = round((last_close / prev_close - 1) * 100, 2)
                        overview[index] = {
                            "name": t.info.get("shortName", index),
                            "price": round(last_close, 2),
                            "change_pct": change_pct,
                            "date": hist.index[-1].strftime("%Y-%m-%d")
                        }
                    else:
                        overview[index] = {"error": "insufficient data"}
                except Exception as e:
                    overview[index] = {"error": str(e)}

            return [TextContent(
                type="text",
                text=json.dumps(overview, indent=2, ensure_ascii=False, default=str)
            )]

        else:
            return [TextContent(
                type="text",
                text=json.dumps({"error": f"Unknown tool: {name}"})
            )]

    except Exception as e:
        return [TextContent(
            type="text",
            text=json.dumps({"error": str(e)})
        )]

async def main():
    """运行 MCP server"""
    from mcp.server.stdio import stdio_server

    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
