#!/usr/bin/env python3
"""
优化的 MCP Server for 投资大师
- 简化工具定义，减少 token 消耗
- 添加智能缓存
- 预设过滤器
"""

import asyncio
import json
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
import yfinance as yf
from dotenv import load_dotenv
from mcp.server import Server
from mcp.types import Tool, TextContent

# .env 加载（从项目根目录）
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

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
# JSON序列化清洗
# ============================================================

def sanitize_for_json(obj):
    """递归清洗数据结构，确保所有key/value可JSON序列化"""
    if isinstance(obj, dict):
        return {str(k): sanitize_for_json(v) for k, v in obj.items()}
    elif isinstance(obj, (list, tuple)):
        return [sanitize_for_json(item) for item in obj]
    elif hasattr(obj, 'isoformat'):  # datetime, Timestamp
        return obj.isoformat()
    elif hasattr(obj, 'item'):  # numpy int64/float64
        return obj.item()
    elif isinstance(obj, float) and (obj != obj):  # NaN
        return None
    else:
        return obj

# ============================================================
# FMP (Financial Modeling Prep) Client
# ============================================================

class FMPClient:
    """FMP API 客户端，带缓存和错误处理"""

    # endpoint 参数 → FMP API 路径映射
    ENDPOINT_MAP = {
        # --- 基础 (原有) ---
        "profile":          "/stable/profile",
        "income":           "/stable/income-statement",
        "balance":          "/stable/balance-sheet-statement",
        "cashflow":         "/stable/cash-flow-statement",
        "ratios":           "/stable/ratios",
        "key-metrics":      "/stable/key-metrics",
        "estimates":        "/stable/analyst-estimates",
        "rating":           "/stable/ratings-snapshot",
        "dcf":              "/stable/discounted-cash-flow",
        # --- 新增: 实时/TTM ---
        "quote":            "/stable/quote",
        "income-ttm":       "/stable/income-statement-ttm",
        "balance-ttm":      "/stable/balance-sheet-statement-ttm",
        "cashflow-ttm":     "/stable/cash-flow-statement-ttm",
        # --- 新增: 评分/内部人交易/员工 ---
        "financial-scores": "/stable/financial-scores",
        "insider-trading":  "/stable/insider-trading/statistics",
        "employee-count":   "/stable/employee-count",
        # --- 新增: 价格 ---
        "price-light":      "/stable/historical-price-eod/light",
        # --- 新增: 市场级 (无需symbol) ---
        "sector-pe":           "/stable/sector-pe-snapshot",
        "industry-pe":         "/stable/industry-pe-snapshot",
        "market-risk-premium": "/stable/market-risk-premium",
    }

    # symbol + period + limit (标准财报)
    STANDARD_ENDPOINTS = {"income", "balance", "cashflow", "ratios", "key-metrics", "estimates"}
    # symbol + limit (TTM)
    LIMIT_ONLY_ENDPOINTS = {"income-ttm", "balance-ttm", "cashflow-ttm"}
    # 无需 symbol (市场级数据)
    NO_SYMBOL_ENDPOINTS = {"sector-pe", "industry-pe", "market-risk-premium"}
    # 支持 date 参数
    DATE_ENDPOINTS = {"sector-pe", "industry-pe"}

    def __init__(self):
        self.api_key = os.getenv("FMP_API_KEY", "")
        self.base_url = os.getenv("FMP_BASE_URL", "https://financialmodelingprep.com").rstrip("/")

    def fetch(self, symbol: str, endpoint: str = "", period: str = "annual",
              limit: int = 4, date: str = "", path: str = "", **kwargs) -> Dict[str, Any]:
        """获取 FMP 数据（带缓存）- 支持预定义endpoint或自定义path"""
        if not self.api_key:
            return {"error": "FMP_API_KEY not configured in .env"}

        # 确定使用哪个路径
        if path:
            # 使用自定义路径
            api_path = path
            endpoint_key = f"custom:{path}"
            # 自定义路径时，symbol要求更灵活
            require_symbol = "/stable/" in path and "sector-pe" not in path and "industry-pe" not in path and "market-risk-premium" not in path
        elif endpoint and endpoint in self.ENDPOINT_MAP:
            # 使用预定义endpoint
            api_path = self.ENDPOINT_MAP[endpoint]
            endpoint_key = endpoint
            require_symbol = endpoint not in self.NO_SYMBOL_ENDPOINTS
        else:
            available_endpoints = list(self.ENDPOINT_MAP.keys())
            return {"error": f"Must specify either 'endpoint' (valid: {available_endpoints}) or 'path' (e.g. '/stable/economic-calendar')"}

        # 检查symbol要求
        if require_symbol and not symbol:
            return {"error": f"This endpoint requires a symbol parameter"}

        # 缓存检查
        cache_key = f"fmp:{symbol}:{endpoint_key}:{period}:{limit}:{date}:{':'.join(f'{k}={v}' for k, v in kwargs.items())}"
        cached = cache.get(cache_key)
        if cached:
            return cached
        # 构建请求参数
        params: Dict[str, Any] = {"apikey": self.api_key}

        # 添加symbol（如果需要）
        if symbol and require_symbol:
            params["symbol"] = symbol

        # 添加标准参数（仅对预定义endpoint）
        if endpoint and not path:
            if endpoint in self.STANDARD_ENDPOINTS:
                params["period"] = period
                params["limit"] = limit
            elif endpoint in self.LIMIT_ONLY_ENDPOINTS:
                params["limit"] = limit
            elif endpoint in self.DATE_ENDPOINTS and date:
                params["date"] = date

        # 添加自定义参数
        params.update(kwargs)

        # 特殊处理：如果有period/limit/date但不在预定义逻辑中，也添加
        if path:
            if period != "annual":
                params["period"] = period
            if limit != 4:
                params["limit"] = limit
            if date:
                params["date"] = date

        try:
            resp = requests.get(f"{self.base_url}{api_path}", params=params, timeout=15)

            if resp.status_code == 401:
                return {
                    "error": "FMP API key invalid or expired, register at https://site.financialmodelingprep.com/register"
                }
            if resp.status_code == 403:
                return {
                    "error": f"FMP API access forbidden (403). Endpoint '{endpoint}' may require a paid plan."
                }
            if resp.status_code != 200:
                return {"error": f"FMP API error: HTTP {resp.status_code}", "detail": resp.text[:500]}

            data = resp.json()

            if isinstance(data, dict) and "Error Message" in data:
                return {"error": data["Error Message"]}

            result = {
                "symbol": symbol or "(market-wide)",
                "endpoint": endpoint or f"custom_path:{api_path}",
                "path": api_path if path else None,
                "data": data,
            }

            cache.set(cache_key, result)
            return result

        except requests.exceptions.Timeout:
            return {"error": "FMP API request timed out (15s)"}
        except requests.exceptions.ConnectionError:
            return {"error": "FMP API connection failed. Check network."}
        except Exception as e:
            return {"error": f"FMP API unexpected error: {str(e)}"}


fmp_client = FMPClient()

# ============================================================
# 100Baggers.club Client
# ============================================================

class BaggersClient:
    """100baggers.club API 客户端"""

    def __init__(self):
        self.api_key = os.getenv("INTERNAL_API_KEY", "")
        self.base_url = "https://www.100baggers.club"

    def _auth_headers(self) -> Dict[str, str]:
        return {"Content-Type": "application/json", "x-api-key": self.api_key}

    def _check_key(self) -> Optional[Dict[str, Any]]:
        if not self.api_key:
            return {"error": "INTERNAL_API_KEY not configured in .env"}
        return None

    def _handle_response(self, resp: requests.Response, cache_key: str) -> Dict[str, Any]:
        if resp.status_code == 401:
            return {"error": "100baggers.club API key invalid (401)"}
        if resp.status_code == 404:
            return {"error": "Resource not found (404)"}
        if resp.status_code != 200:
            return {"error": f"HTTP {resp.status_code}", "detail": resp.text[:500]}
        data = resp.json()
        cache.set(cache_key, data)
        return data

    def search(self, query: str) -> Dict[str, Any]:
        """搜索公司（无需认证）"""
        cache_key = f"baggers:search:{query}"
        cached = cache.get(cache_key)
        if cached:
            return cached
        try:
            resp = requests.get(
                f"{self.base_url}/api/search",
                params={"q": query}, timeout=15
            )
            return self._handle_response(resp, cache_key)
        except requests.exceptions.Timeout:
            return {"error": "Request timed out"}
        except Exception as e:
            return {"error": str(e)}

    def generate_summary(self, symbol: str) -> Dict[str, Any]:
        """生成财务摘要（7维度38指标+杜邦+三表）"""
        err = self._check_key()
        if err:
            return err
        cache_key = f"baggers:summary:{symbol}"
        cached = cache.get(cache_key)
        if cached:
            return cached
        try:
            resp = requests.post(
                f"{self.base_url}/api/generate-summary",
                headers=self._auth_headers(),
                json={"symbol": symbol}, timeout=60
            )
            return self._handle_response(resp, cache_key)
        except requests.exceptions.Timeout:
            return {"error": "Summary generation timed out (60s) — this API can be slow"}
        except Exception as e:
            return {"error": str(e)}

    def get_sec_filings(self, symbols: str, types: str = "",
                        year: str = "", limit: int = 100) -> Dict[str, Any]:
        """获取SEC Filing（10-K/10-Q/8-K等）"""
        err = self._check_key()
        if err:
            return err
        cache_key = f"baggers:sec:{symbols}:{types}:{year}:{limit}"
        cached = cache.get(cache_key)
        if cached:
            return cached
        params: Dict[str, Any] = {"symbols": symbols}
        if types:
            params["types"] = types
        if year:
            params["year"] = year
        if limit != 100:
            params["limit"] = limit
        try:
            resp = requests.get(
                f"{self.base_url}/api/get-sec-filings",
                headers={"x-api-key": self.api_key},
                params=params, timeout=15
            )
            return self._handle_response(resp, cache_key)
        except requests.exceptions.Timeout:
            return {"error": "Request timed out"}
        except Exception as e:
            return {"error": str(e)}

    def get_strategy_report(self, symbol: str, locale: str = "zh") -> Dict[str, Any]:
        """获取策略分析报告"""
        err = self._check_key()
        if err:
            return err
        cache_key = f"baggers:strategy:{symbol}:{locale}"
        cached = cache.get(cache_key)
        if cached:
            return cached
        try:
            resp = requests.get(
                f"{self.base_url}/api/get-strategy-report",
                headers={"x-api-key": self.api_key},
                params={"symbol": symbol, "locale": locale}, timeout=30
            )
            return self._handle_response(resp, cache_key)
        except requests.exceptions.Timeout:
            return {"error": "Request timed out"}
        except Exception as e:
            return {"error": str(e)}


baggers_client = BaggersClient()

# ============================================================
# Polymarket Client
# ============================================================

class PolymarketClient:
    """Polymarket 预测市场客户端"""

    def __init__(self):
        self.search_base_url = "https://gamma-api.polymarket.com"
        self.price_base_url = "https://clob.polymarket.com"

    def search_markets(self, query: str, limit: int = 20) -> Dict[str, Any]:
        """搜索公司相关的预测市场（非optimized模式以获取完整字段）"""
        cache_key = f"polymarket:search:v2:{query}:{limit}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        try:
            params = {
                "q": query,
                "limit_per_type": limit,
                "search_tags": True,
                "keep_closed_markets": 1,
            }

            resp = requests.get(
                f"{self.search_base_url}/public-search",
                params=params, timeout=15
            )

            if resp.status_code != 200:
                return {"error": f"Polymarket search failed: HTTP {resp.status_code}", "detail": resp.text[:500]}

            data = resp.json()

            result = {
                "query": query,
                "markets": [],
                "summary": {
                    "total_events": len(data.get("events", [])),
                    "has_more": data.get("hasMore", False)
                }
            }

            for event in data.get("events", []):
                markets = event.get("markets", [])
                for market in markets:
                    # 从 outcomePrices + outcomes 解析概率
                    prices = self._parse_outcome_prices(market)

                    # 确保outcomes是列表
                    raw_outcomes = market.get("outcomes", [])
                    if isinstance(raw_outcomes, str):
                        try:
                            raw_outcomes = json.loads(raw_outcomes)
                        except (json.JSONDecodeError, TypeError):
                            raw_outcomes = []

                    # 确保clobTokenIds是列表
                    raw_clob = market.get("clobTokenIds", [])
                    if isinstance(raw_clob, str):
                        try:
                            raw_clob = json.loads(raw_clob)
                        except (json.JSONDecodeError, TypeError):
                            raw_clob = []

                    market_info = {
                        "market_id": market.get("id"),
                        "condition_id": market.get("conditionId"),
                        "question": market.get("question"),
                        "description": market.get("description", "") or event.get("description", ""),
                        "slug": market.get("slug") or event.get("slug"),
                        "active": market.get("active", True),
                        "closed": market.get("closed", False),
                        "end_date": market.get("endDate") or event.get("endDate"),
                        "outcomes": raw_outcomes,
                        "current_prices": prices,
                        "last_trade_price": market.get("lastTradePrice"),
                        "best_bid": market.get("bestBid"),
                        "best_ask": market.get("bestAsk"),
                        "volume": market.get("volumeNum") or market.get("volume"),
                        "clob_token_ids": raw_clob,
                    }
                    result["markets"].append(market_info)

            cache.set(cache_key, result)
            return result

        except requests.exceptions.Timeout:
            return {"error": "Polymarket search timed out (15s)"}
        except Exception as e:
            return {"error": f"Polymarket search error: {str(e)}"}

    def _parse_outcome_prices(self, market: Dict) -> Dict[str, Any]:
        """从 gamma API 的 outcomePrices + outcomes 直接解析概率"""
        prices = {}
        outcomes = market.get("outcomes", [])
        outcome_prices = market.get("outcomePrices", [])

        # gamma API有时返回JSON字符串而非列表
        if isinstance(outcomes, str):
            try:
                outcomes = json.loads(outcomes)
            except (json.JSONDecodeError, TypeError):
                return prices
        if isinstance(outcome_prices, str):
            try:
                outcome_prices = json.loads(outcome_prices)
            except (json.JSONDecodeError, TypeError):
                return prices

        if not outcomes or not outcome_prices:
            return prices

        for outcome, price_str in zip(outcomes, outcome_prices):
            prob = self._price_to_probability(str(price_str))
            if prob is not None:
                prices[outcome] = {
                    "price": str(price_str),
                    "probability": prob
                }
        return prices

    def get_market_price(self, token_id: str, side: str = "BUY") -> Dict[str, Any]:
        """获取市场价格（CLOB API回退，仅在outcomePrices不可用时使用）"""
        cache_key = f"polymarket:price:{token_id}:{side}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        try:
            params = {
                "token_id": token_id,
                "side": side.upper()
            }

            resp = requests.get(
                f"{self.price_base_url}/price",
                params=params, timeout=10
            )

            if resp.status_code == 404:
                return {"error": f"Token {token_id} not found or no orderbook"}
            if resp.status_code != 200:
                return {"error": f"Polymarket price failed: HTTP {resp.status_code}", "detail": resp.text[:500]}

            data = resp.json()

            result = {
                "token_id": token_id,
                "side": side,
                "price": data.get("price"),
                "probability": self._price_to_probability(data.get("price"))
            }

            cache.set(cache_key, result)
            return result

        except requests.exceptions.Timeout:
            return {"error": "Polymarket price timed out (10s)"}
        except Exception as e:
            return {"error": f"Polymarket price error: {str(e)}"}

    def get_markets_with_prices(self, query: str, limit: int = 10) -> Dict[str, Any]:
        """搜索市场并返回价格（outcomePrices已内含，无需额外CLOB调用）"""
        cache_key = f"polymarket:full:v2:{query}:{limit}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        search_result = self.search_markets(query, limit)
        if "error" in search_result:
            return search_result

        # outcomePrices已在search_markets中解析，直接返回
        # 仅对缺少outcomePrices的活跃市场尝试CLOB回退
        markets = search_result.get("markets", [])
        for market in markets:
            if not market.get("current_prices") and market.get("clob_token_ids"):
                # CLOB回退: 仅在outcomePrices为空时
                outcomes = market.get("outcomes", [])
                clob_ids = market.get("clob_token_ids", [])
                prices = {}
                for i, token_id in enumerate(clob_ids):
                    if isinstance(token_id, str) and token_id:
                        price_data = self.get_market_price(token_id, "BUY")
                        if "error" not in price_data:
                            outcome = outcomes[i] if i < len(outcomes) else f"outcome_{i}"
                            prices[outcome] = {
                                "price": price_data.get("price"),
                                "probability": price_data.get("probability")
                            }
                market["current_prices"] = prices

        result = {
            "query": query,
            "total_markets": len(markets),
            "markets": markets,
            "summary": search_result.get("summary", {})
        }

        cache.set(cache_key, result)
        return result

    def _price_to_probability(self, price_str: str) -> Optional[float]:
        """将价格转换为概率百分比。Polymarket价格范围0-1(如0.335=33.5%)"""
        if not price_str:
            return None
        try:
            price = float(price_str)
            if price < 0:
                return 0.0
            if price > 1:
                # 已关闭市场可能返回整数0或1
                return min(round(price, 2), 100.0)
            return round(price * 100, 2)
        except (ValueError, TypeError):
            return None


polymarket_client = PolymarketClient()

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
    """获取股票数据（FMP优先，yfinance回退）— 返回可JSON序列化的紧凑格式"""
    cache_key = f"enhanced_stock_data:{symbol}:{period}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    data = {"symbol": symbol, "data_source": "hybrid"}
    fmp_success = {}  # 记录 FMP 成功获取的字段

    # === FMP 优先策略 ===
    # 1. 尝试 FMP profile（公司基本信息）
    profile_resp = fmp_client.fetch(symbol, "profile")
    if "error" not in profile_resp and profile_resp.get("data"):
        profile_data = profile_resp["data"]
        if isinstance(profile_data, list) and len(profile_data) > 0:
            profile = profile_data[0]
            data["name"] = profile.get("companyName", symbol)
            data["sector"] = profile.get("sector")
            data["industry"] = profile.get("industry")
            data["market_cap"] = profile.get("mktCap")
            fmp_success["profile"] = True

    # 2. 尝试 FMP quote（当前价格信息）
    quote_resp = fmp_client.fetch(symbol, "quote")
    if "error" not in quote_resp and quote_resp.get("data"):
        quote_data = quote_resp["data"]
        if isinstance(quote_data, list) and len(quote_data) > 0:
            quote = quote_data[0]
            data["price"] = quote.get("price")
            data["52w_high"] = quote.get("yearHigh")
            data["52w_low"] = quote.get("yearLow")
            fmp_success["quote"] = True

    # 3. 尝试 FMP ratios（财务比率，取最新）
    ratios_resp = fmp_client.fetch(symbol, "ratios", limit=1)
    if "error" not in ratios_resp and ratios_resp.get("data"):
        ratios_data = ratios_resp["data"]
        if isinstance(ratios_data, list) and len(ratios_data) > 0:
            ratios = ratios_data[0]
            data["pe_ratio"] = ratios.get("priceEarningsRatio")
            data["pb_ratio"] = ratios.get("priceToBookRatio")
            data["dividend_yield"] = ratios.get("dividendYield")
            data["roe"] = ratios.get("returnOnEquity")
            data["profit_margin"] = ratios.get("netProfitMargin")
            data["operating_margin"] = ratios.get("operatingProfitMargin")
            fmp_success["ratios"] = True

    # 4. 尝试 FMP key-metrics（关键指标，取最新）
    metrics_resp = fmp_client.fetch(symbol, "key-metrics", limit=1)
    if "error" not in metrics_resp and metrics_resp.get("data"):
        metrics_data = metrics_resp["data"]
        if isinstance(metrics_data, list) and len(metrics_data) > 0:
            metrics = metrics_data[0]
            data["revenue"] = metrics.get("revenue")
            data["revenue_growth"] = metrics.get("revenueGrowth")
            data["free_cashflow"] = metrics.get("freeCashFlow")
            # 补充一些可能缺失的比率
            if not fmp_success.get("ratios"):
                data["pe_ratio"] = data.get("pe_ratio") or metrics.get("peRatio")
                data["pb_ratio"] = data.get("pb_ratio") or metrics.get("pbRatio")
            fmp_success["metrics"] = True

    # === yfinance 回退策略 ===
    try:
        # 如果 FMP 完全失败，或者关键字段缺失，使用 yfinance 回退
        need_fallback = not any(fmp_success.values()) or not data.get("name") or not data.get("price")

        ticker = yf.Ticker(symbol)
        info = ticker.info
        history = ticker.history(period=period)

        # 价格历史：总是用 yfinance（更适合图表和区间统计）
        history_summary = {}
        if not history.empty:
            recent = history.tail(5)
            history_summary["recent_5d"] = [
                {
                    "date": idx.strftime("%Y-%m-%d"),
                    "close": round(float(row["Close"]), 2),
                    "volume": int(row["Volume"])
                }
                for idx, row in recent.iterrows()
            ]
            history_summary["period_high"] = round(float(history["Close"].max()), 2)
            history_summary["period_low"] = round(float(history["Close"].min()), 2)
            history_summary["period_return"] = round(
                float((history["Close"].iloc[-1] / history["Close"].iloc[0] - 1) * 100), 2
            )
            history_summary["avg_volume"] = int(history["Volume"].mean())
            history_summary["trading_days"] = len(history)
        data["history_summary"] = history_summary

        # 只对缺失的字段进行 yfinance 回退
        if need_fallback or not data.get("name"):
            data["name"] = info.get("longName", symbol)
            data["sector"] = data.get("sector") or info.get("sector")
            data["industry"] = data.get("industry") or info.get("industry")

        if need_fallback or not data.get("price"):
            data["price"] = data.get("price") or info.get("currentPrice")
            data["market_cap"] = data.get("market_cap") or info.get("marketCap")
            data["52w_high"] = data.get("52w_high") or info.get("fiftyTwoWeekHigh")
            data["52w_low"] = data.get("52w_low") or info.get("fiftyTwoWeekLow")

        # 财务指标回退
        data["pe_ratio"] = data.get("pe_ratio") or info.get("trailingPE")
        data["forward_pe"] = info.get("forwardPE")  # FMP 没有 forward PE
        data["pb_ratio"] = data.get("pb_ratio") or info.get("priceToBook")
        data["dividend_yield"] = data.get("dividend_yield") or info.get("dividendYield")
        data["beta"] = info.get("beta")  # FMP 没有 beta
        data["revenue"] = data.get("revenue") or info.get("totalRevenue")
        data["revenue_growth"] = data.get("revenue_growth") or info.get("revenueGrowth")
        data["profit_margin"] = data.get("profit_margin") or info.get("profitMargins")
        data["operating_margin"] = data.get("operating_margin") or info.get("operatingMargins")
        data["roe"] = data.get("roe") or info.get("returnOnEquity")
        data["free_cashflow"] = data.get("free_cashflow") or info.get("freeCashflow")

        # 标记数据来源
        if any(fmp_success.values()):
            data["data_source"] = f"FMP({','.join(fmp_success.keys())})+yfinance"
        else:
            data["data_source"] = "yfinance_only"

        cache.set(cache_key, data)
        return data

    except Exception as e:
        # 最后的异常处理
        if any(fmp_success.values()):
            data["warning"] = f"yfinance_failed: {str(e)}"
            data["data_source"] = f"FMP({','.join(fmp_success.keys())})_only"
            cache.set(cache_key, data)
            return data
        else:
            return {"error": str(e), "symbol": symbol, "data_source": "total_failure"}

def get_stock_fundamentals(symbol: str) -> Dict[str, Any]:
    """获取基本面数据（FMP优先，yfinance回退）"""
    cache_key = f"enhanced_fundamentals:{symbol}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    data = {"symbol": symbol, "data_source": "hybrid"}
    fmp_success = {}

    # === FMP 优先策略 ===
    # 1. 尝试 FMP key-metrics（收入、现金流、增长率）
    metrics_resp = fmp_client.fetch(symbol, "key-metrics", limit=1)
    if "error" not in metrics_resp and metrics_resp.get("data"):
        metrics_data = metrics_resp["data"]
        if isinstance(metrics_data, list) and len(metrics_data) > 0:
            metrics = metrics_data[0]
            data["revenue"] = metrics.get("revenue")
            data["revenue_growth"] = metrics.get("revenueGrowth")
            data["free_cashflow"] = metrics.get("freeCashFlow")
            data["earnings_growth"] = metrics.get("netIncomeGrowth")
            fmp_success["metrics"] = True

    # 2. 尝试 FMP ratios（利润率、ROE、ROA、比率）
    ratios_resp = fmp_client.fetch(symbol, "ratios", limit=1)
    if "error" not in ratios_resp and ratios_resp.get("data"):
        ratios_data = ratios_resp["data"]
        if isinstance(ratios_data, list) and len(ratios_data) > 0:
            ratios = ratios_data[0]
            data["profit_margin"] = ratios.get("netProfitMargin")
            data["operating_margin"] = ratios.get("operatingProfitMargin")
            data["roe"] = ratios.get("returnOnEquity")
            data["roa"] = ratios.get("returnOnAssets")
            data["debt_to_equity"] = ratios.get("debtEquityRatio")
            data["current_ratio"] = ratios.get("currentRatio")
            fmp_success["ratios"] = True

    # 3. 尝试 FMP income-ttm（净利润）
    income_resp = fmp_client.fetch(symbol, "income-ttm", limit=1)
    if "error" not in income_resp and income_resp.get("data"):
        income_data = income_resp["data"]
        if isinstance(income_data, list) and len(income_data) > 0:
            income = income_data[0]
            data["earnings"] = income.get("netIncome")
            fmp_success["income"] = True

    # === yfinance 回退策略 ===
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info

        # 如果 FMP 完全失败，完全回退到 yfinance
        if not any(fmp_success.values()):
            data.update({
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
                "data_source": "yfinance_only"
            })
        else:
            # 部分回退：只填充缺失的字段
            data["revenue"] = data.get("revenue") or info.get("totalRevenue")
            data["revenue_growth"] = data.get("revenue_growth") or info.get("revenueGrowth")
            data["earnings"] = data.get("earnings") or info.get("netIncomeToCommon")
            data["earnings_growth"] = data.get("earnings_growth") or info.get("earningsGrowth")
            data["profit_margin"] = data.get("profit_margin") or info.get("profitMargins")
            data["operating_margin"] = data.get("operating_margin") or info.get("operatingMargins")
            data["roe"] = data.get("roe") or info.get("returnOnEquity")
            data["roa"] = data.get("roa") or info.get("returnOnAssets")
            data["debt_to_equity"] = data.get("debt_to_equity") or info.get("debtToEquity")
            data["current_ratio"] = data.get("current_ratio") or info.get("currentRatio")
            data["free_cashflow"] = data.get("free_cashflow") or info.get("freeCashflow")
            data["data_source"] = f"FMP({','.join(fmp_success.keys())})+yfinance"

        cache.set(cache_key, data)
        return data

    except Exception as e:
        # 最后的异常处理
        if any(fmp_success.values()):
            data["warning"] = f"yfinance_failed: {str(e)}"
            data["data_source"] = f"FMP({','.join(fmp_success.keys())})_only"
            cache.set(cache_key, data)
            return data
        else:
            return {"error": str(e), "symbol": symbol, "data_source": "total_failure"}

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
        ),
        Tool(
            name="fmp_data",
            description="FMP财务数据。预定义endpoint: profile/income/balance等20个，或自定义path: 任意FMP路径如/stable/economic-calendar。支持所有FMP API。",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "股票代码（市场级endpoint可省略）"},
                    "endpoint": {
                        "type": "string",
                        "enum": [
                            "profile", "income", "balance", "cashflow", "ratios",
                            "key-metrics", "estimates", "rating", "dcf",
                            "quote", "income-ttm", "balance-ttm", "cashflow-ttm",
                            "financial-scores", "insider-trading", "employee-count",
                            "price-light",
                            "sector-pe", "industry-pe", "market-risk-premium"
                        ],
                        "description": "预定义数据类型（与path二选一）"
                    },
                    "path": {
                        "type": "string",
                        "description": "自定义FMP路径，如/stable/economic-calendar或/api/v3/stock-news（与endpoint二选一）"
                    },
                    "period": {
                        "type": "string",
                        "enum": ["annual", "quarter"],
                        "default": "annual"
                    },
                    "limit": {
                        "type": "integer",
                        "default": 4,
                        "description": "返回期数"
                    },
                    "date": {
                        "type": "string",
                        "description": "日期(YYYY-MM-DD)，用于sector-pe/industry-pe"
                    }
                },
                "required": []
            }
        ),
        Tool(
            name="baggers_search",
            description="搜索公司（支持代码/英文名/中文名）。无需认证",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索词，如 AAPL 或 特斯拉"}
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="baggers_summary",
            description="100baggers财务摘要: 宏观温度(CAPE/Buffett/ERP)+领先指标+7维度38指标+杜邦分析+三表。最有价值的单次调用",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "股票代码"}
                },
                "required": ["symbol"]
            }
        ),
        Tool(
            name="baggers_sec_filings",
            description="获取SEC Filing(10-K/10-Q/8-K等)，含EDGAR链接。支持多公司批量查询",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbols": {"type": "string", "description": "逗号分隔的股票代码，如 AAPL,MSFT"},
                    "types": {"type": "string", "description": "Filing类型过滤，如 10-K,10-Q"},
                    "year": {"type": "string", "description": "财年过滤，如 2025"},
                    "limit": {"type": "integer", "default": 100, "description": "每公司最大返回数"}
                },
                "required": ["symbols"]
            }
        ),
        Tool(
            name="baggers_strategy",
            description="获取AI策略分析报告(5000-20000字)。含竞争分析/财务深挖/风险评估/战略展望",
            inputSchema={
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "股票代码"},
                    "locale": {
                        "type": "string",
                        "enum": ["zh", "en"],
                        "default": "zh",
                        "description": "语言"
                    }
                },
                "required": ["symbol"]
            }
        ),
        Tool(
            name="polymarket_events",
            description="查询公司相关预测市场事件概率。搜索重大事件（如财报、并购、监管）的市场预期概率",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "搜索词：公司名/代码/事件关键词，如 'Tesla earnings' 或 'Apple' 或 'NVDA'"
                    },
                    "limit": {
                        "type": "integer",
                        "default": 10,
                        "description": "返回市场数量限制"
                    },
                    "include_prices": {
                        "type": "boolean",
                        "default": True,
                        "description": "是否获取当前概率价格"
                    }
                },
                "required": ["query"]
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

            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
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
                text=json.dumps(sanitize_for_json(comparison), indent=2, ensure_ascii=False)
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
                text=json.dumps(sanitize_for_json({
                    "preset": preset,
                    "preset_name": preset_config["name"],
                    "criteria": criteria,
                    "results": results,
                    "passed_count": sum(1 for r in results if r.get("passed"))
                }), indent=2, ensure_ascii=False)
            )]

        elif name == "fmp_data":
            symbol = arguments.get("symbol", "").upper()
            endpoint = arguments.get("endpoint", "")
            path = arguments.get("path", "")
            period = arguments.get("period", "annual")
            limit = arguments.get("limit", 4)
            date = arguments.get("date", "")

            result = fmp_client.fetch(symbol, endpoint, period, limit, date, path)

            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
            )]

        elif name == "baggers_search":
            query = arguments.get("query", "")
            result = baggers_client.search(query)
            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
            )]

        elif name == "baggers_summary":
            symbol = arguments.get("symbol", "").upper()
            result = baggers_client.generate_summary(symbol)
            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
            )]

        elif name == "baggers_sec_filings":
            symbols = arguments.get("symbols", "").upper()
            types = arguments.get("types", "")
            year = arguments.get("year", "")
            limit = arguments.get("limit", 100)
            result = baggers_client.get_sec_filings(symbols, types, year, limit)
            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
            )]

        elif name == "baggers_strategy":
            symbol = arguments.get("symbol", "").upper()
            locale = arguments.get("locale", "zh")
            result = baggers_client.get_strategy_report(symbol, locale)
            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
            )]

        elif name == "polymarket_events":
            query = arguments.get("query", "")
            limit = arguments.get("limit", 10)
            include_prices = arguments.get("include_prices", True)

            if include_prices:
                result = polymarket_client.get_markets_with_prices(query, limit)
            else:
                result = polymarket_client.search_markets(query, limit)

            return [TextContent(
                type="text",
                text=json.dumps(sanitize_for_json(result), indent=2, ensure_ascii=False)
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
                text=json.dumps(sanitize_for_json(overview), indent=2, ensure_ascii=False)
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
