"""
系统测试脚本
用于验证所有组件是否正常工作
"""

import sys
import logging
from datetime import datetime
from pathlib import Path

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def test_database():
    """测试数据库模块"""
    logger.info("=" * 60)
    logger.info("测试 1: 数据库模块")
    logger.info("=" * 60)

    try:
        from database import get_db

        # 创建测试数据库
        db_path = "test_intelligence.db"
        if Path(db_path).exists():
            Path(db_path).unlink()

        with get_db(db_path) as db:
            # 测试内部人交易插入
            test_insider = {
                'date': '2026-01-25',
                'ticker': 'TSLA',
                'insider': 'Test Insider',
                'title': 'CFO',
                'transaction': 'Buy',
                'shares': 10000,
                'price': 450.00,
                'value': 4500000,
                'shares_owned_after': 50000,
                'filing_url': 'https://test.com'
            }
            db.insert_insider_trading(test_insider)
            logger.info("✓ 内部人交易插入成功")

            # 测试情绪数据插入
            test_sentiment = {
                'date': '2026-01-25',
                'ticker': 'TSLA',
                'source': 'Reddit',
                'oci_score': 7.5,
                'bullish_pct': 60.0,
                'bearish_pct': 25.0,
                'neutral_pct': 15.0,
                'sample_size': 500,
                'top_keywords': 'FSD, Robotaxi'
            }
            db.insert_sentiment(test_sentiment)
            logger.info("✓ 情绪数据插入成功")

            # 测试查询
            insider_df = db.get_insider_trading(days=1)
            assert len(insider_df) == 1
            logger.info(f"✓ 查询成功: {len(insider_df)} 条记录")

            # 测试任务日志
            db.log_task(
                task_name='test_task',
                start_time=datetime.now(),
                end_time=datetime.now(),
                status='SUCCESS',
                records_processed=2
            )
            logger.info("✓ 任务日志记录成功")

        logger.info("✓ 数据库模块测试通过\n")
        return True

    except Exception as e:
        logger.error(f"✗ 数据库测试失败: {e}")
        return False


def test_alert_system():
    """测试告警系统"""
    logger.info("=" * 60)
    logger.info("测试 2: 告警系统")
    logger.info("=" * 60)

    try:
        from alert_system import create_alert_system

        alert_system = create_alert_system("test_alert_config.json")

        # 测试内部人交易告警
        test_data = {
            'date': '2026-01-25',
            'insider': 'Test Insider',
            'title': 'CEO',
            'transaction': 'Sale',
            'shares': 100000,
            'price': 450.00,
            'value': -45000000
        }

        alert = alert_system.check_insider_trading_alert(test_data)
        if alert:
            logger.info(f"✓ 内部人交易告警触发: {alert['title']}")
        else:
            logger.warning("⚠ 未触发告警（可能是阈值设置）")

        # 测试情绪告警
        alert = alert_system.check_sentiment_alert(
            current_score=7.5,
            previous_score=5.0,
            date='2026-01-25'
        )
        if alert:
            logger.info(f"✓ 情绪剧变告警触发: {alert['title']}")

        # 测试期权告警
        test_options = {
            'date': '2026-01-25',
            'contract_type': 'CALL',
            'strike_price': 500.0,
            'expiration': '2026-02-21',
            'volume': 10000,
            'open_interest': 50000,
            'implied_volatility': 0.45,
            'premium': 20.0,
            'notional_value': 10000000,
            'unusual_score': 9.0
        }

        alert = alert_system.check_options_unusual_alert(test_options)
        if alert:
            logger.info(f"✓ 期权异常告警触发: {alert['title']}")

        logger.info("✓ 告警系统测试通过\n")
        return True

    except Exception as e:
        logger.error(f"✗ 告警系统测试失败: {e}")
        return False


def test_report_generator():
    """测试报告生成器"""
    logger.info("=" * 60)
    logger.info("测试 3: 报告生成器")
    logger.info("=" * 60)

    try:
        from database import get_db
        from report_generator import create_report_generator

        # 使用测试数据库
        db_path = "test_intelligence.db"
        output_dir = "test_reports"

        # 清理旧的测试报告
        if Path(output_dir).exists():
            import shutil
            shutil.rmtree(output_dir)

        with get_db(db_path) as db:
            # 插入测试数据
            db.insert_insider_trading({
                'date': '2026-01-25',
                'ticker': 'TSLA',
                'insider': 'Test Insider',
                'title': 'CFO',
                'transaction': 'Buy',
                'shares': 50000,
                'price': 450.00,
                'value': 22500000,
                'shares_owned_after': 100000,
                'filing_url': 'https://test.com'
            })

            db.insert_sentiment({
                'date': '2026-01-25',
                'ticker': 'TSLA',
                'source': 'Reddit',
                'oci_score': 7.2,
                'bullish_pct': 58.0,
                'bearish_pct': 24.0,
                'neutral_pct': 18.0,
                'sample_size': 800,
                'top_keywords': 'FSD, Production'
            })

            # 生成报告
            generator = create_report_generator(db, output_dir)

            # 测试每日报告
            daily_report_path = generator.generate_daily_brief('TSLA', '2026-01-25')
            assert Path(daily_report_path).exists()
            logger.info(f"✓ 每日报告生成成功: {daily_report_path}")

            # 读取报告内容验证
            with open(daily_report_path, 'r', encoding='utf-8') as f:
                content = f.read()
                assert 'TSLA' in content
                assert '综合评分' in content
                logger.info("✓ 报告内容验证通过")

            # 测试周报
            weekly_report_path = generator.generate_weekly_report('TSLA', '2026-01-25')
            assert Path(weekly_report_path).exists()
            logger.info(f"✓ 每周报告生成成功: {weekly_report_path}")

        logger.info("✓ 报告生成器测试通过\n")
        return True

    except Exception as e:
        logger.error(f"✗ 报告生成器测试失败: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return False


def test_scheduler():
    """测试调度器"""
    logger.info("=" * 60)
    logger.info("测试 4: 调度器")
    logger.info("=" * 60)

    try:
        from scheduler import create_scheduler

        # 创建调度器实例
        scheduler = create_scheduler("test_scheduler_config.json")

        # 测试配置加载
        assert scheduler.config is not None
        logger.info("✓ 配置加载成功")

        # 测试单个引擎运行
        logger.info("运行测试引擎...")

        # 内部人交易引擎
        result = scheduler.run_insider_trading_engine()
        assert result['status'] == 'SUCCESS'
        logger.info("✓ 内部人交易引擎运行成功")

        # 情绪引擎
        result = scheduler.run_sentiment_engine()
        assert result['status'] == 'SUCCESS'
        logger.info("✓ 情绪引擎运行成功")

        # 报告生成
        result = scheduler.run_daily_report()
        assert result['status'] == 'SUCCESS'
        logger.info("✓ 每日报告生成成功")

        # 关闭调度器
        scheduler.shutdown()

        logger.info("✓ 调度器测试通过\n")
        return True

    except Exception as e:
        logger.error(f"✗ 调度器测试失败: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return False


def test_dependencies():
    """测试依赖包"""
    logger.info("=" * 60)
    logger.info("测试 0: 依赖包检查")
    logger.info("=" * 60)

    required_packages = [
        'apscheduler',
        'pandas',
        'numpy',
        'matplotlib',
        'requests'
    ]

    all_ok = True
    for package in required_packages:
        try:
            __import__(package)
            logger.info(f"✓ {package} 已安装")
        except ImportError:
            logger.error(f"✗ {package} 未安装")
            all_ok = False

    if all_ok:
        logger.info("✓ 所有依赖包已安装\n")
    else:
        logger.error("✗ 部分依赖包缺失，请运行: pip install -r requirements.txt\n")

    return all_ok


def cleanup_test_files():
    """清理测试文件"""
    logger.info("清理测试文件...")

    test_files = [
        "test_intelligence.db",
        "test_alert_config.json",
        "test_scheduler_config.json"
    ]

    test_dirs = [
        "test_reports"
    ]

    for file in test_files:
        if Path(file).exists():
            Path(file).unlink()
            logger.info(f"删除: {file}")

    for dir in test_dirs:
        if Path(dir).exists():
            import shutil
            shutil.rmtree(dir)
            logger.info(f"删除: {dir}/")

    logger.info("✓ 清理完成")


def main():
    """运行所有测试"""
    print("\n" + "=" * 60)
    print("Tesla Intelligence Engine - 系统测试")
    print("=" * 60 + "\n")

    results = {}

    # 测试依赖
    results['dependencies'] = test_dependencies()

    if not results['dependencies']:
        logger.error("依赖检查失败，停止测试")
        sys.exit(1)

    # 测试各模块
    results['database'] = test_database()
    results['alert_system'] = test_alert_system()
    results['report_generator'] = test_report_generator()
    results['scheduler'] = test_scheduler()

    # 汇总结果
    logger.info("=" * 60)
    logger.info("测试结果汇总")
    logger.info("=" * 60)

    total = len(results)
    passed = sum(1 for v in results.values() if v)

    for test_name, result in results.items():
        status = "✓ PASS" if result else "✗ FAIL"
        logger.info(f"{test_name:20s}: {status}")

    logger.info("=" * 60)
    logger.info(f"总计: {passed}/{total} 通过")
    logger.info("=" * 60)

    # 清理测试文件
    cleanup_input = input("\n是否清理测试文件? [Y/n]: ").strip().lower()
    if cleanup_input != 'n':
        cleanup_test_files()

    if passed == total:
        logger.info("\n🎉 所有测试通过！系统可以正常使用。")
        return 0
    else:
        logger.error(f"\n⚠️  {total - passed} 个测试失败，请检查错误信息。")
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
