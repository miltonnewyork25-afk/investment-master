#!/usr/bin/env python3
"""快速测试信号计算逻辑"""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent))
from signals import *


def test_accruals():
    # 好: CFO > NI → 低accruals
    assert compute_accruals(100, 120, 1000) == -0.02  # (100-120)/1000
    # 差: CFO < NI → 高accruals
    assert compute_accruals(100, 50, 1000) == 0.05    # (100-50)/1000
    print("  accruals: PASS")


def test_shareholder_yield():
    # $2 div, $100 price, -5% shares (buyback), 0 debt change
    sy = compute_shareholder_yield(2.0, 100.0, -5.0, 0.0)
    assert abs(sy - 7.0) < 0.01  # 2% div + 5% buyback = 7%
    print("  shareholder_yield: PASS")


def test_f_score():
    # 完美公司: 全部9分
    data = {
        'net_income': 100, 'net_income_prev': 80,
        'cfo': 120,
        'total_assets': 1000, 'total_assets_prev': 950,
        'long_term_debt': 200, 'long_term_debt_prev': 250,
        'current_ratio': 2.0, 'current_ratio_prev': 1.8,
        'shares_outstanding': 100, 'shares_outstanding_prev': 105,
        'gross_margin': 0.45, 'gross_margin_prev': 0.40,
        'asset_turnover': 0.8, 'asset_turnover_prev': 0.7,
    }
    score, components = compute_f_score(data)
    assert score == 9, f"Expected 9, got {score}: {components}"
    print(f"  f_score (perfect): PASS (9/9)")

    # 差公司: 亏损+举债+稀释
    data_bad = {
        'net_income': -50, 'net_income_prev': 20,
        'cfo': -30,
        'total_assets': 1000, 'total_assets_prev': 900,
        'long_term_debt': 500, 'long_term_debt_prev': 300,
        'current_ratio': 0.8, 'current_ratio_prev': 1.2,
        'shares_outstanding': 120, 'shares_outstanding_prev': 100,
        'gross_margin': 0.30, 'gross_margin_prev': 0.35,
        'asset_turnover': 0.5, 'asset_turnover_prev': 0.6,
    }
    score_bad, _ = compute_f_score(data_bad)
    assert score_bad <= 2, f"Expected <=2, got {score_bad}"
    print(f"  f_score (bad company): PASS ({score_bad}/9)")


def test_scoring():
    """测试完整评分流程"""
    r = StockScreenResult(symbol="TEST", name="Test Corp", market_cap=10e9, sector="Tech")

    # L1: 便宜
    r.l1.ev_ebit = 8.0
    r.l1.fcf_yield = 8.0
    r.l1.pe_ttm = 10.0
    r.l1.shareholder_yield = 6.0
    r.l1.insider_buy_count_6m = 4
    r.l1.insider_buy_value_6m = 500_000
    r.l1.insider_cluster = True
    r.l1.shares_change_1y = -3.0

    # L2: 高质量
    r.l2.accruals_ratio = -0.02
    r.l2.cfo_ni_ratio = 1.3
    r.l2.gross_profit_assets = 0.35
    r.l2.roic = 18.0
    r.l2.asset_growth_1y = 5.0
    r.l2.f_score = 8

    # L3: 纠错中
    r.l3.price_52w_pct = 0.72
    r.l3.earnings_surprise_last = 8.0
    r.l3.earnings_surprise_streak = 3

    composite = compute_composite(r)
    assert composite > 0, f"Expected positive composite, got {composite}"
    assert not r.vetoes, f"Unexpected vetoes: {r.vetoes}"
    print(f"  scoring (good stock): PASS (composite={composite:.1f})")

    # Card output
    card = format_signal_card(r)
    assert "TEST" in card
    assert "L1" in card
    print(f"  signal card: PASS")


def test_veto():
    """测试否决逻辑"""
    r = StockScreenResult(symbol="TRAP", name="Value Trap Inc")
    r.l2.accruals_ratio = 0.20
    r.l2.cfo_ni_ratio = 0.3
    check_vetoes(r)
    assert len(r.vetoes) == 1
    assert "利润质量极差" in r.vetoes[0]
    print(f"  veto (accruals trap): PASS")

    r2 = StockScreenResult(symbol="SHORT", name="Heavily Shorted")
    r2.l2.short_interest_pct = 25.0
    r2.l1.insider_buy_count_6m = 0
    check_vetoes(r2)
    assert len(r2.vetoes) == 1
    assert "空头" in r2.vetoes[0]
    print(f"  veto (high short): PASS")

    r3 = StockScreenResult(symbol="DILUTE", name="Dilution King")
    r3.l1.shares_change_1y = 20.0
    check_vetoes(r3)
    assert len(r3.vetoes) == 1
    assert "稀释" in r3.vetoes[0]
    print(f"  veto (dilution): PASS")


def test_fmp_extraction():
    """测试从模拟FMP数据提取信号"""
    mock_profile = {"symbol": "MOCK", "companyName": "Mock Corp", "mktCap": 5e9, "sector": "Industrials"}
    mock_income = [
        {"netIncome": 500e6, "grossProfit": 1200e6, "revenue": 3000e6, "weightedAverageShsOut": 100e6},
        {"netIncome": 400e6, "grossProfit": 1100e6, "revenue": 2800e6, "weightedAverageShsOut": 105e6},
    ]
    mock_balance = [
        {"totalAssets": 8000e6, "longTermDebt": 2000e6},
        {"totalAssets": 7500e6, "longTermDebt": 2200e6},
    ]
    mock_cashflow = [
        {"operatingCashFlow": 600e6, "capitalExpenditure": -200e6},
        {"operatingCashFlow": 500e6, "capitalExpenditure": -180e6},
    ]
    mock_ratios = [
        {"priceToEarningsRatio": 10, "priceToBookRatio": 1.2, "dividendYield": 0.03,
         "returnOnEquity": 0.18, "currentRatio": 1.5, "grossProfitMargin": 0.40},
        {"priceToEarningsRatio": 12, "priceToBookRatio": 1.4, "dividendYield": 0.025,
         "returnOnEquity": 0.15, "currentRatio": 1.3, "grossProfitMargin": 0.39},
    ]
    mock_km = [
        {"evToEBITDA": 8.5, "freeCashFlowPerShare": 4.0, "returnOnInvestedCapital": 0.15},
    ]
    mock_quote = {"price": 50.0, "yearHigh": 70.0}
    # FMP insider-trading returns quarterly summaries (not per-transaction)
    mock_insider = [
        {"symbol": "MOCK", "cik": "000", "year": 2026, "quarter": 1,
         "acquiredTransactions": 5, "disposedTransactions": 2,
         "totalAcquired": 15000, "totalDisposed": 3000,
         "totalPurchases": 3, "totalSales": 1},
        {"symbol": "MOCK", "cik": "000", "year": 2025, "quarter": 4,
         "acquiredTransactions": 3, "disposedTransactions": 1,
         "totalAcquired": 8000, "totalDisposed": 1000,
         "totalPurchases": 2, "totalSales": 0},
    ]

    result = extract_signals_from_fmp(
        mock_profile, mock_income, mock_balance, mock_cashflow,
        mock_ratios, mock_km, mock_insider, mock_quote
    )

    assert result.symbol == "MOCK"
    assert result.l1.insider_buy_count_6m == 5  # 3 + 2 purchases
    assert result.l1.insider_cluster == True  # 5 >= 3 purchases
    assert result.l2.accruals_ratio is not None
    assert result.l2.f_score is not None
    assert result.l3.price_52w_pct is not None

    composite = compute_composite(result)
    print(f"  fmp_extraction: PASS")
    print(f"    Symbol: {result.symbol}")
    print(f"    Insider: {result.l1.insider_buy_count_6m} buys, cluster={result.l1.insider_cluster}")
    print(f"    Accruals: {result.l2.accruals_ratio:.4f}")
    print(f"    GP/Assets: {result.l2.gross_profit_assets:.4f}")
    print(f"    F-Score: {result.l2.f_score}/9")
    print(f"    52w%: {result.l3.price_52w_pct:.2%}")
    print(f"    Composite: {composite:.1f}/10")
    print()
    print(format_signal_card(result))


if __name__ == "__main__":
    print("=== Signal Computation Tests ===\n")
    test_accruals()
    test_shareholder_yield()
    test_f_score()
    test_scoring()
    test_veto()
    print("\n=== FMP Extraction Test ===\n")
    test_fmp_extraction()
    print("\n=== ALL TESTS PASSED ===")
