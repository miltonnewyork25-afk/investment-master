"""
自动调度系统
支持定时运行6大引擎、生成报告、发送告警
使用APScheduler实现灵活的任务调度
"""

import logging
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, Dict, Any, Callable
import traceback
import json

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR

from database import IntelligenceDB, get_db
from alert_system import AlertSystem, create_alert_system
from report_generator import ReportGenerator, create_report_generator

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('intelligence_scheduler.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class IntelligenceScheduler:
    """情报引擎调度器"""

    def __init__(self, config_path: str = "scheduler_config.json", background: bool = False):
        """
        初始化调度器

        Args:
            config_path: 配置文件路径
            background: 是否使用后台调度器
        """
        self.config_path = Path(config_path)
        self.config = self._load_config()

        # 初始化调度器
        if background:
            self.scheduler = BackgroundScheduler()
        else:
            self.scheduler = BlockingScheduler()

        # 初始化组件
        self.db = get_db(self.config.get('database', {}).get('path', 'tesla_intelligence.db'))
        self.alert_system = create_alert_system(self.config.get('alert_config_path', 'alert_config.json'))
        self.report_generator = create_report_generator(
            self.db,
            self.config.get('reports', {}).get('output_dir', 'reports')
        )

        # 注册事件监听器
        self.scheduler.add_listener(self._job_executed_listener, EVENT_JOB_EXECUTED)
        self.scheduler.add_listener(self._job_error_listener, EVENT_JOB_ERROR)

        # 任务统计
        self.task_stats = {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'last_run': None
        }

    def _load_config(self) -> Dict[str, Any]:
        """加载配置文件"""
        if self.config_path.exists():
            with open(self.config_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            # 创建默认配置
            default_config = {
                "version": "1.0",
                "enabled": True,
                "ticker": "TSLA",
                "timezone": "America/New_York",
                "database": {
                    "path": "tesla_intelligence.db",
                    "cleanup_days": 365
                },
                "alert_config_path": "alert_config.json",
                "reports": {
                    "output_dir": "reports",
                    "daily_enabled": True,
                    "weekly_enabled": True
                },
                "engines": {
                    "insider_trading": {
                        "enabled": True,
                        "schedule": "0 9,16 * * 1-5",
                        "retry_attempts": 3,
                        "retry_delay": 300
                    },
                    "options_unusual": {
                        "enabled": True,
                        "schedule": "*/30 9-16 * * 1-5",
                        "retry_attempts": 3,
                        "retry_delay": 300
                    },
                    "sentiment": {
                        "enabled": True,
                        "schedule": "0 */4 * * *",
                        "retry_attempts": 2,
                        "retry_delay": 600
                    },
                    "supply_chain": {
                        "enabled": True,
                        "schedule": "0 10 * * 1-5",
                        "retry_attempts": 2,
                        "retry_delay": 600
                    },
                    "short_interest": {
                        "enabled": True,
                        "schedule": "0 17 * * 2,5",
                        "retry_attempts": 2,
                        "retry_delay": 600
                    },
                    "dark_pool": {
                        "enabled": True,
                        "schedule": "0 18 * * 1-5",
                        "retry_attempts": 2,
                        "retry_delay": 300
                    }
                },
                "tasks": {
                    "daily_report": {
                        "enabled": True,
                        "schedule": "0 19 * * 1-5"
                    },
                    "weekly_report": {
                        "enabled": True,
                        "schedule": "0 10 * * 6"
                    },
                    "database_cleanup": {
                        "enabled": True,
                        "schedule": "0 2 1 * *"
                    }
                }
            }

            # 保存默认配置
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(default_config, f, indent=2, ensure_ascii=False)

            return default_config

    # ==================== 引擎任务包装器 ====================

    def _run_with_retry(self, task_name: str, task_func: Callable, *args, **kwargs) -> Dict[str, Any]:
        """
        带重试机制的任务执行

        Args:
            task_name: 任务名称
            task_func: 任务函数
            *args, **kwargs: 任务函数参数

        Returns:
            执行结果字典
        """
        engine_config = self.config['engines'].get(task_name, {})
        retry_attempts = engine_config.get('retry_attempts', 3)
        retry_delay = engine_config.get('retry_delay', 300)

        start_time = datetime.now()
        last_error = None

        for attempt in range(retry_attempts):
            try:
                logger.info(f"执行任务: {task_name} (尝试 {attempt + 1}/{retry_attempts})")

                result = task_func(*args, **kwargs)

                end_time = datetime.now()
                duration = (end_time - start_time).total_seconds()

                # 记录成功日志
                self.db.log_task(
                    task_name=task_name,
                    start_time=start_time,
                    end_time=end_time,
                    status='SUCCESS',
                    records_processed=result.get('records_processed', 0)
                )

                logger.info(f"任务完成: {task_name} (耗时{duration:.1f}秒, 处理{result.get('records_processed', 0)}条)")

                return {
                    'status': 'SUCCESS',
                    'start_time': start_time,
                    'end_time': end_time,
                    'duration': duration,
                    'result': result
                }

            except Exception as e:
                last_error = e
                logger.error(f"任务失败: {task_name} (尝试 {attempt + 1}/{retry_attempts}): {str(e)}")
                logger.debug(traceback.format_exc())

                if attempt < retry_attempts - 1:
                    logger.info(f"等待{retry_delay}秒后重试...")
                    import time
                    time.sleep(retry_delay)

        # 所有重试都失败
        end_time = datetime.now()
        self.db.log_task(
            task_name=task_name,
            start_time=start_time,
            end_time=end_time,
            status='FAILED',
            error_message=str(last_error)
        )

        return {
            'status': 'FAILED',
            'start_time': start_time,
            'end_time': end_time,
            'error': str(last_error)
        }

    # ==================== 6大引擎任务 ====================

    def run_insider_trading_engine(self):
        """运行内部人交易引擎"""
        def task():
            # 这里应该调用实际的引擎代码
            # 目前返回模拟结果
            logger.info("内部人交易引擎: 抓取SEC Form 4数据...")

            # 模拟数据采集
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'insider': 'Sample Insider',
                'title': 'CFO',
                'transaction': 'Sale',
                'shares': 10000,
                'price': 450.00,
                'value': -4500000,
                'shares_owned_after': 50000,
                'filing_url': 'https://sec.gov/sample'
            }

            # 插入数据库
            self.db.insert_insider_trading(sample_data)

            # 检查告警
            alert = self.alert_system.check_insider_trading_alert(sample_data)
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('insider_trading', task)

    def run_options_unusual_engine(self):
        """运行期权异常活动引擎"""
        def task():
            logger.info("期权引擎: 扫描异常期权活动...")

            # 模拟数据
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'contract_type': 'CALL',
                'strike_price': 500.00,
                'expiration': '2026-02-21',
                'volume': 15000,
                'open_interest': 50000,
                'implied_volatility': 0.45,
                'premium': 25.00,
                'notional_value': 37500000,
                'unusual_score': 8.5
            }

            self.db.insert_options_unusual(sample_data)

            alert = self.alert_system.check_options_unusual_alert(sample_data)
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('options_unusual', task)

    def run_sentiment_engine(self):
        """运行情绪指数引擎"""
        def task():
            logger.info("情绪引擎: 分析社交媒体情绪...")

            # 模拟数据
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'source': 'Reddit',
                'oci_score': 6.5,
                'bullish_pct': 52.0,
                'bearish_pct': 28.0,
                'neutral_pct': 20.0,
                'sample_size': 450,
                'top_keywords': 'FSD, Robotaxi, Production'
            }

            self.db.insert_sentiment(sample_data)

            # 检查情绪剧变
            previous_score = self.db.get_latest_composite_score() or 5.0
            alert = self.alert_system.check_sentiment_alert(
                sample_data['oci_score'],
                previous_score,
                sample_data['date']
            )
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('sentiment', task)

    def run_supply_chain_engine(self):
        """运行供应链信号引擎"""
        def task():
            logger.info("供应链引擎: 分析上游供应商数据...")

            # 模拟数据
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'supplier_ticker': 'PANA',
                'supplier_name': 'Panasonic',
                'signal_type': 'Revenue_Growth',
                'signal_strength': 7.5,
                'metric_name': 'Battery_Revenue',
                'metric_value': 1250.0,
                'yoy_change': 0.15,
                'qoq_change': 0.08,
                'description': 'Battery division revenue growth suggests strong Tesla demand'
            }

            self.db.insert_supply_chain_signal(sample_data)

            alert = self.alert_system.check_supply_chain_alert(sample_data)
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('supply_chain', task)

    def run_short_interest_engine(self):
        """运行空头利息引擎"""
        def task():
            logger.info("空头引擎: 更新空头利息数据...")

            # 模拟数据
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'short_interest': 45000000,
                'short_ratio': 2.5,
                'days_to_cover': 1.8,
                'short_pct_float': 15.5,
                'borrow_fee': 0.012
            }

            self.db.insert_short_signal(sample_data)

            alert = self.alert_system.check_short_squeeze_alert(sample_data)
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('short_interest', task)

    def run_dark_pool_engine(self):
        """运行暗池监控引擎"""
        def task():
            logger.info("暗池引擎: 监控非公开交易...")

            # 模拟数据
            sample_data = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'ticker': self.config['ticker'],
                'dark_pool_volume': 15000000,
                'total_volume': 35000000,
                'dark_pool_pct': 42.8,
                'avg_trade_size': 1500,
                'net_flow': 5000000
            }

            self.db.insert_dark_pool_activity(sample_data)

            alert = self.alert_system.check_dark_pool_alert(sample_data)
            if alert:
                self.alert_system.send_alert(alert)

            return {'records_processed': 1, 'alerts_triggered': 1 if alert else 0}

        return self._run_with_retry('dark_pool', task)

    # ==================== 报告生成任务 ====================

    def run_daily_report(self):
        """生成每日简报"""
        def task():
            logger.info("生成每日简报...")
            ticker = self.config['ticker']
            date = datetime.now().strftime('%Y-%m-%d')

            report_path = self.report_generator.generate_daily_brief(ticker, date)

            logger.info(f"每日简报已生成: {report_path}")
            return {'records_processed': 1, 'report_path': report_path}

        return self._run_with_retry('daily_report', task)

    def run_weekly_report(self):
        """生成每周深度报告"""
        def task():
            logger.info("生成每周深度报告...")
            ticker = self.config['ticker']
            end_date = datetime.now().strftime('%Y-%m-%d')

            report_path = self.report_generator.generate_weekly_report(ticker, end_date)

            logger.info(f"每周报告已生成: {report_path}")
            return {'records_processed': 1, 'report_path': report_path}

        return self._run_with_retry('weekly_report', task)

    def run_database_cleanup(self):
        """数据库清理任务"""
        def task():
            logger.info("执行数据库清理...")
            cleanup_days = self.config['database'].get('cleanup_days', 365)
            self.db.cleanup_old_data(cleanup_days)
            return {'records_processed': 0}

        return self._run_with_retry('database_cleanup', task)

    # ==================== 调度器管理 ====================

    def add_jobs(self):
        """添加所有调度任务"""
        if not self.config.get('enabled', True):
            logger.warning("调度器已禁用")
            return

        # 添加引擎任务
        for engine_name, engine_config in self.config['engines'].items():
            if not engine_config.get('enabled', False):
                continue

            schedule = engine_config.get('schedule')
            if not schedule:
                continue

            # 映射引擎名称到执行函数
            engine_map = {
                'insider_trading': self.run_insider_trading_engine,
                'options_unusual': self.run_options_unusual_engine,
                'sentiment': self.run_sentiment_engine,
                'supply_chain': self.run_supply_chain_engine,
                'short_interest': self.run_short_interest_engine,
                'dark_pool': self.run_dark_pool_engine
            }

            func = engine_map.get(engine_name)
            if func:
                self.scheduler.add_job(
                    func,
                    CronTrigger.from_crontab(schedule),
                    id=f"engine_{engine_name}",
                    name=f"Engine: {engine_name}",
                    misfire_grace_time=300
                )
                logger.info(f"已添加任务: {engine_name} (schedule: {schedule})")

        # 添加报告生成任务
        for task_name, task_config in self.config['tasks'].items():
            if not task_config.get('enabled', False):
                continue

            schedule = task_config.get('schedule')
            if not schedule:
                continue

            task_map = {
                'daily_report': self.run_daily_report,
                'weekly_report': self.run_weekly_report,
                'database_cleanup': self.run_database_cleanup
            }

            func = task_map.get(task_name)
            if func:
                self.scheduler.add_job(
                    func,
                    CronTrigger.from_crontab(schedule),
                    id=f"task_{task_name}",
                    name=f"Task: {task_name}",
                    misfire_grace_time=600
                )
                logger.info(f"已添加任务: {task_name} (schedule: {schedule})")

    def start(self):
        """启动调度器"""
        try:
            logger.info("=" * 60)
            logger.info("Intelligence Engine Scheduler 启动中...")
            logger.info(f"配置文件: {self.config_path}")
            logger.info(f"目标股票: {self.config['ticker']}")
            logger.info("=" * 60)

            self.add_jobs()

            logger.info(f"已调度任务数: {len(self.scheduler.get_jobs())}")
            logger.info("调度器已启动，按 Ctrl+C 停止...")

            self.scheduler.start()

        except KeyboardInterrupt:
            logger.info("收到停止信号，正在关闭...")
            self.shutdown()
        except Exception as e:
            logger.error(f"调度器启动失败: {e}")
            logger.debug(traceback.format_exc())
            self.shutdown()

    def shutdown(self):
        """关闭调度器"""
        logger.info("正在关闭调度器...")

        if self.scheduler.running:
            self.scheduler.shutdown(wait=True)

        self.db.close()

        logger.info("调度器已关闭")
        logger.info(f"总运行次数: {self.task_stats['total_runs']}")
        logger.info(f"成功: {self.task_stats['successful_runs']}, 失败: {self.task_stats['failed_runs']}")

    # ==================== 事件监听器 ====================

    def _job_executed_listener(self, event):
        """任务执行成功监听器"""
        self.task_stats['total_runs'] += 1
        self.task_stats['successful_runs'] += 1
        self.task_stats['last_run'] = datetime.now()
        logger.debug(f"任务成功: {event.job_id}")

    def _job_error_listener(self, event):
        """任务执行失败监听器"""
        self.task_stats['total_runs'] += 1
        self.task_stats['failed_runs'] += 1
        self.task_stats['last_run'] = datetime.now()
        logger.error(f"任务失败: {event.job_id} - {event.exception}")

    # ==================== 手动执行 ====================

    def run_all_engines_once(self):
        """手动运行所有引擎一次（用于测试）"""
        logger.info("手动执行所有引擎...")

        results = {}
        engines = [
            ('insider_trading', self.run_insider_trading_engine),
            ('options_unusual', self.run_options_unusual_engine),
            ('sentiment', self.run_sentiment_engine),
            ('supply_chain', self.run_supply_chain_engine),
            ('short_interest', self.run_short_interest_engine),
            ('dark_pool', self.run_dark_pool_engine)
        ]

        for name, func in engines:
            if self.config['engines'].get(name, {}).get('enabled', False):
                logger.info(f"执行: {name}")
                result = func()
                results[name] = result
                logger.info(f"完成: {name} - {result['status']}")

        # 生成每日报告
        if self.config['tasks']['daily_report'].get('enabled', False):
            logger.info("生成每日报告...")
            report_result = self.run_daily_report()
            results['daily_report'] = report_result

        return results

    def get_scheduler_status(self) -> Dict[str, Any]:
        """获取调度器状态"""
        jobs = self.scheduler.get_jobs()

        return {
            'running': self.scheduler.running,
            'total_jobs': len(jobs),
            'jobs': [
                {
                    'id': job.id,
                    'name': job.name,
                    'next_run': job.next_run_time.isoformat() if job.next_run_time else None
                }
                for job in jobs
            ],
            'stats': self.task_stats
        }


# ==================== 便捷函数 ====================

def create_scheduler(config_path: str = "scheduler_config.json", background: bool = False) -> IntelligenceScheduler:
    """创建调度器实例"""
    return IntelligenceScheduler(config_path, background)


def main():
    """主入口"""
    import argparse

    parser = argparse.ArgumentParser(description='Tesla Intelligence Engine Scheduler')
    parser.add_argument('--config', default='scheduler_config.json', help='配置文件路径')
    parser.add_argument('--once', action='store_true', help='运行一次所有引擎后退出')
    parser.add_argument('--status', action='store_true', help='显示调度器状态')
    parser.add_argument('--daily-report', action='store_true', help='仅生成每日报告')
    parser.add_argument('--weekly-report', action='store_true', help='仅生成每周报告')

    args = parser.parse_args()

    scheduler = create_scheduler(args.config)

    if args.once:
        # 运行一次所有引擎
        results = scheduler.run_all_engines_once()
        print("\n执行结果:")
        for engine, result in results.items():
            print(f"  {engine}: {result['status']}")
        scheduler.shutdown()

    elif args.daily_report:
        # 仅生成每日报告
        result = scheduler.run_daily_report()
        print(f"每日报告: {result['status']}")
        if result['status'] == 'SUCCESS':
            print(f"报告路径: {result['result']['report_path']}")
        scheduler.shutdown()

    elif args.weekly_report:
        # 仅生成每周报告
        result = scheduler.run_weekly_report()
        print(f"每周报告: {result['status']}")
        if result['status'] == 'SUCCESS':
            print(f"报告路径: {result['result']['report_path']}")
        scheduler.shutdown()

    elif args.status:
        # 显示状态
        status = scheduler.get_scheduler_status()
        print(json.dumps(status, indent=2, ensure_ascii=False))
        scheduler.shutdown()

    else:
        # 正常启动调度器
        scheduler.start()


if __name__ == "__main__":
    main()
