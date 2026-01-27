"""
SEC Monitor 测试脚本
快速验证引擎功能
"""

import sys
import os

# 添加engines目录到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

from sec_monitor import SECMonitorEngine, SECDatabase
import json

def test_database_init():
    """测试1: 数据库初始化"""
    print("\n" + "="*60)
    print("测试1: 数据库初始化")
    print("="*60)

    db = SECDatabase()
    print(f"✓ 数据库已创建: {db.db_path}")

    # 验证表存在
    cursor = db.conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]

    expected_tables = ['form4_transactions', 'form13f_holdings', 'filing_history']
    for table in expected_tables:
        if table in tables:
            print(f"✓ 表已创建: {table}")
        else:
            print(f"✗ 表缺失: {table}")

    db.close()


def test_api_connection():
    """测试2: SEC API连接"""
    print("\n" + "="*60)
    print("测试2: SEC API连接")
    print("="*60)

    from sec_monitor import SECAPIClient
    from sec_config import MONITORED_COMPANIES

    client = SECAPIClient()

    # 测试获取特斯拉的Form 4 RSS
    tsla_info = MONITORED_COMPANIES['TSLA']
    print(f"正在获取 {tsla_info['name']} (CIK: {tsla_info['cik']}) 的Form 4 RSS...")

    rss_content = client.fetch_form4_rss('TSLA', tsla_info['cik'])

    if rss_content:
        print(f"✓ 成功获取RSS Feed")
        print(f"  内容长度: {len(rss_content)} 字符")
        print(f"  前200字符: {rss_content[:200]}...")
    else:
        print("✗ 获取RSS失败")


def test_form4_parsing():
    """测试3: Form 4解析"""
    print("\n" + "="*60)
    print("测试3: Form 4 RSS解析")
    print("="*60)

    from sec_monitor import SECAPIClient, Form4Parser
    from sec_config import MONITORED_COMPANIES

    client = SECAPIClient()
    parser = Form4Parser()

    tsla_info = MONITORED_COMPANIES['TSLA']
    rss_content = client.fetch_form4_rss('TSLA', tsla_info['cik'])

    if rss_content:
        filings = parser.parse_rss_feed(rss_content, 'TSLA')
        print(f"✓ 解析到 {len(filings)} 个文件")

        if filings:
            print("\n最新3个文件:")
            for filing in filings[:3]:
                print(f"  - {filing['filing_date']}: {filing['title'][:60]}...")
                print(f"    Accession: {filing['accession_number']}")
    else:
        print("✗ 无法获取RSS")


def test_full_monitoring():
    """测试4: 完整监控流程"""
    print("\n" + "="*60)
    print("测试4: 完整监控流程（TSLA Form 4）")
    print("="*60)

    engine = SECMonitorEngine()

    try:
        # 监控特斯拉
        print("开始监控TSLA...")
        engine.monitor_form4(ticker='TSLA', full_scan=False)

        # 查询结果
        print("\n查询最近30天的交易...")
        transactions = engine.db.get_recent_form4('TSLA', days=30)

        if transactions:
            print(f"✓ 找到 {len(transactions)} 笔交易")

            # 显示前3笔
            print("\n最近3笔交易:")
            for i, txn in enumerate(transactions[:3], 1):
                print(f"\n  {i}. {txn['insider_name']} ({txn['insider_title']})")
                print(f"     日期: {txn['transaction_date']}")
                print(f"     类型: {txn['transaction_type']}")
                print(f"     股数: {txn['shares']:,.0f}")
                print(f"     价格: ${txn['price_per_share']:.2f}")
                print(f"     金额: ${txn['transaction_value']:,.0f}")
        else:
            print("未找到交易数据（可能是首次运行，需要抓取数据）")

        # 生成汇总报告
        print("\n生成90天汇总报告...")
        summary = engine.get_insider_summary('TSLA', days=90)

        if 'error' not in summary:
            print(json.dumps(summary, indent=2, ensure_ascii=False))
        else:
            print(f"⚠️ {summary['error']}")

    finally:
        engine.close()


def test_data_query():
    """测试5: 数据库查询"""
    print("\n" + "="*60)
    print("测试5: 数据库SQL查询")
    print("="*60)

    import sqlite3
    from sec_config import DB_PATH

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 查询1: 统计各股票的交易数量
    print("\n各股票Form 4交易统计:")
    cursor.execute("""
        SELECT ticker, COUNT(*) as count
        FROM form4_transactions
        GROUP BY ticker
        ORDER BY count DESC
    """)

    results = cursor.fetchall()
    if results:
        for ticker, count in results:
            print(f"  {ticker}: {count} 笔交易")
    else:
        print("  暂无数据")

    # 查询2: 最大交易金额
    print("\n最大单笔交易:")
    cursor.execute("""
        SELECT ticker, insider_name, transaction_date, transaction_value
        FROM form4_transactions
        ORDER BY transaction_value DESC
        LIMIT 1
    """)

    result = cursor.fetchone()
    if result:
        ticker, insider, date, value = result
        print(f"  {ticker} - {insider}")
        print(f"  日期: {date}, 金额: ${value:,.0f}")
    else:
        print("  暂无数据")

    # 查询3: 触发警报的交易
    print("\n触发警报的交易:")
    cursor.execute("""
        SELECT ticker, insider_name, transaction_date, transaction_value
        FROM form4_transactions
        WHERE alert_triggered = 1
        ORDER BY transaction_date DESC
        LIMIT 5
    """)

    results = cursor.fetchall()
    if results:
        for ticker, insider, date, value in results:
            print(f"  {ticker} - {insider}: ${value:,.0f} ({date})")
    else:
        print("  暂无警报")

    conn.close()


def run_all_tests():
    """运行所有测试"""
    print("\n" + "█"*60)
    print("█" + " "*20 + "SEC Monitor 测试套件" + " "*19 + "█")
    print("█"*60)

    tests = [
        ("数据库初始化", test_database_init),
        ("SEC API连接", test_api_connection),
        ("Form 4解析", test_form4_parsing),
        ("完整监控流程", test_full_monitoring),
        ("数据库查询", test_data_query)
    ]

    passed = 0
    failed = 0

    for test_name, test_func in tests:
        try:
            test_func()
            passed += 1
            print(f"\n✓ {test_name} - 通过")
        except Exception as e:
            failed += 1
            print(f"\n✗ {test_name} - 失败")
            print(f"  错误: {e}")

    print("\n" + "█"*60)
    print(f"测试结果: {passed} 通过, {failed} 失败")
    print("█"*60 + "\n")


if __name__ == "__main__":
    run_all_tests()
