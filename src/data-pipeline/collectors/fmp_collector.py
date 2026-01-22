"""
FMP (Financial Modeling Prep) 数据采集器

获取股价、财报、估值等数据
"""

import json
import requests
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional
import sys

# 添加父目录到路径
sys.path.append(str(Path(__file__).parent.parent))
from config import FMP_API_KEY, FMP_BASE_URL, RAW_DIR, TRACKED_STOCKS


class FMPCollector:
    """FMP API 数据采集器"""

    def __init__(self, api_key: str = None):
        self.api_key = api_key or FMP_API_KEY
        self.base_url = FMP_BASE_URL
        self.session = requests.Session()

    def _request(self, endpoint: str, params: dict = None) -> Optional[dict]:
        """发送 API 请求"""
        params = params or {}
        params["apikey"] = self.api_key

        url = f"{self.base_url}/{endpoint}"

        try:
            response = self.session.get(url, params=params, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"[ERROR] API请求失败: {endpoint} - {e}")
            return None

    def get_quote(self, symbol: str) -> Optional[dict]:
        """获取实时报价"""
        data = self._request(f"quote/{symbol}")
        if data and len(data) > 0:
            return data[0]
        return None

    def get_quotes_batch(self, symbols: List[str]) -> List[dict]:
        """批量获取实时报价"""
        symbols_str = ",".join(symbols)
        data = self._request(f"quote/{symbols_str}")
        return data or []

    def get_historical_prices(
        self,
        symbol: str,
        from_date: str = None,
        to_date: str = None
    ) -> List[dict]:
        """获取历史价格"""
        params = {}
        if from_date:
            params["from"] = from_date
        if to_date:
            params["to"] = to_date

        data = self._request(f"historical-price-full/{symbol}", params)
        if data and "historical" in data:
            return data["historical"]
        return []

    def get_key_metrics(self, symbol: str, period: str = "annual") -> List[dict]:
        """获取关键财务指标"""
        data = self._request(f"key-metrics/{symbol}", {"period": period})
        return data or []

    def get_ratios(self, symbol: str, period: str = "annual") -> List[dict]:
        """获取财务比率"""
        data = self._request(f"ratios/{symbol}", {"period": period})
        return data or []

    def get_income_statement(self, symbol: str, period: str = "annual") -> List[dict]:
        """获取利润表"""
        data = self._request(f"income-statement/{symbol}", {"period": period})
        return data or []

    def get_company_profile(self, symbol: str) -> Optional[dict]:
        """获取公司概况"""
        data = self._request(f"profile/{symbol}")
        if data and len(data) > 0:
            return data[0]
        return None

    def collect_stock_data(self, symbol: str) -> dict:
        """采集单个股票的完整数据"""
        print(f"[INFO] 采集 {symbol} 数据...")

        result = {
            "symbol": symbol,
            "collected_at": datetime.now().isoformat(),
            "quote": None,
            "profile": None,
            "key_metrics": None,
            "ratios": None,
            "historical_prices": None
        }

        # 获取实时报价
        result["quote"] = self.get_quote(symbol)

        # 获取公司概况
        result["profile"] = self.get_company_profile(symbol)

        # 获取关键指标（最近4个季度）
        result["key_metrics"] = self.get_key_metrics(symbol, "quarter")[:4]

        # 获取财务比率
        result["ratios"] = self.get_ratios(symbol, "quarter")[:4]

        # 获取最近1年的历史价格
        one_year_ago = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
        result["historical_prices"] = self.get_historical_prices(
            symbol,
            from_date=one_year_ago
        )[:30]  # 只保留最近30个交易日

        return result

    def collect_all(self, save: bool = True) -> Dict[str, dict]:
        """采集所有跟踪股票的数据"""
        all_data = {}

        for industry, config in TRACKED_STOCKS.items():
            print(f"\n[INFO] === 采集 {industry} 行业数据 ===")
            industry_data = {}

            for symbol in config["symbols"]:
                data = self.collect_stock_data(symbol)
                industry_data[symbol] = data

                if save:
                    self._save_data(symbol, data, industry)

            all_data[industry] = industry_data

        return all_data

    def _save_data(self, symbol: str, data: dict, industry: str):
        """保存数据到文件"""
        # 创建目录
        prices_dir = RAW_DIR / "prices" / industry
        financials_dir = RAW_DIR / "financials" / industry
        prices_dir.mkdir(parents=True, exist_ok=True)
        financials_dir.mkdir(parents=True, exist_ok=True)

        today = datetime.now().strftime("%Y-%m-%d")

        # 保存报价数据
        quote_file = prices_dir / f"{symbol}_{today}.json"
        with open(quote_file, "w", encoding="utf-8") as f:
            json.dump({
                "symbol": symbol,
                "date": today,
                "quote": data["quote"],
                "historical": data["historical_prices"]
            }, f, indent=2, ensure_ascii=False)
        print(f"[INFO] 已保存: {quote_file}")

        # 保存财务数据
        financials_file = financials_dir / f"{symbol}_{today}.json"
        with open(financials_file, "w", encoding="utf-8") as f:
            json.dump({
                "symbol": symbol,
                "date": today,
                "profile": data["profile"],
                "key_metrics": data["key_metrics"],
                "ratios": data["ratios"]
            }, f, indent=2, ensure_ascii=False)
        print(f"[INFO] 已保存: {financials_file}")

    def get_latest_data(self, symbol: str) -> Optional[dict]:
        """获取最新保存的数据"""
        for industry, config in TRACKED_STOCKS.items():
            if symbol in config["symbols"]:
                prices_dir = RAW_DIR / "prices" / industry
                files = sorted(prices_dir.glob(f"{symbol}_*.json"), reverse=True)
                if files:
                    with open(files[0], "r", encoding="utf-8") as f:
                        return json.load(f)
        return None


def main():
    """测试数据采集"""
    print("=" * 60)
    print("FMP 数据采集器测试")
    print("=" * 60)

    collector = FMPCollector()

    # 测试单个股票
    print("\n[TEST] 采集 LRCX 数据...")
    data = collector.collect_stock_data("LRCX")

    if data["quote"]:
        print(f"  股价: ${data['quote'].get('price', 'N/A')}")
        print(f"  PE: {data['quote'].get('pe', 'N/A')}")
        print(f"  市值: ${data['quote'].get('marketCap', 'N/A'):,}")
    else:
        print("  [WARNING] 未能获取报价数据，请检查 API Key")

    print("\n[TEST] 采集所有股票...")
    # collector.collect_all(save=True)


if __name__ == "__main__":
    main()
