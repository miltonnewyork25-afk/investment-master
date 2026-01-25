"""
SEC Monitor 自动调度器
定时执行监控任务

使用方法:
    python scheduler.py

后台运行:
    nohup python scheduler.py > scheduler.log 2>&1 &

停止:
    ps aux | grep scheduler.py
    kill <PID>
"""

import sys
import os
import time
from datetime import datetime

# 添加engines目录到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

from sec_monitor import SECMonitorEngine
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scheduler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class SECScheduler:
    """SEC监控调度器"""

    def __init__(self):
        self.engine = SECMonitorEngine()
        self.last_form4_run = 0
        self.last_13f_run = 0

        # 调度间隔（秒）
        self.FORM4_INTERVAL = 3600  # 1小时
        self.FORM13F_INTERVAL = 86400  # 24小时

        logger.info("调度器已初始化")

    def should_run_form4(self) -> bool:
        """是否应该运行Form 4监控"""
        elapsed = time.time() - self.last_form4_run
        return elapsed >= self.FORM4_INTERVAL

    def should_run_13f(self) -> bool:
        """是否应该运行13F监控"""
        elapsed = time.time() - self.last_13f_run
        return elapsed >= self.FORM13F_INTERVAL

    def run_form4_job(self):
        """执行Form 4监控任务"""
        logger.info("="*60)
        logger.info("开始Form 4监控任务")
        logger.info("="*60)

        try:
            from sec_config import MONITORED_COMPANIES

            for ticker, info in MONITORED_COMPANIES.items():
                logger.info(f"监控 {ticker} ({info['name']})...")
                self.engine.monitor_form4(ticker=ticker, full_scan=False)
                time.sleep(1)  # 避免请求过快

            self.last_form4_run = time.time()
            logger.info("✓ Form 4监控任务完成")

        except Exception as e:
            logger.error(f"✗ Form 4监控任务失败: {e}", exc_info=True)

    def run_13f_job(self):
        """执行13F监控任务"""
        logger.info("="*60)
        logger.info("开始13F监控任务")
        logger.info("="*60)

        try:
            from sec_config import TOP_INSTITUTIONS

            for inst_id, info in TOP_INSTITUTIONS.items():
                logger.info(f"监控 {info['name']}...")
                self.engine.monitor_form13f(institution_cik=inst_id)
                time.sleep(1)

            self.last_13f_run = time.time()
            logger.info("✓ 13F监控任务完成")

        except Exception as e:
            logger.error(f"✗ 13F监控任务失败: {e}", exc_info=True)

    def run_summary_report(self):
        """生成每日汇总报告（可选）"""
        logger.info("生成每日汇总报告...")

        try:
            from sec_config import MONITORED_COMPANIES
            import json

            for ticker in MONITORED_COMPANIES.keys():
                summary = self.engine.get_insider_summary(ticker, days=7)
                if 'error' not in summary:
                    logger.info(f"\n{ticker} 7日汇总:")
                    logger.info(json.dumps(summary, indent=2, ensure_ascii=False))

        except Exception as e:
            logger.error(f"汇总报告生成失败: {e}")

    def run(self):
        """主循环"""
        logger.info("调度器已启动 - 按Ctrl+C停止")
        logger.info(f"Form 4监控间隔: {self.FORM4_INTERVAL/3600:.1f}小时")
        logger.info(f"13F监控间隔: {self.FORM13F_INTERVAL/3600:.1f}小时")

        # 启动时立即运行一次
        self.run_form4_job()

        try:
            while True:
                current_time = datetime.now()

                # 检查是否需要运行任务
                if self.should_run_form4():
                    self.run_form4_job()

                if self.should_run_13f():
                    self.run_13f_job()

                # 每天早上9点生成汇总报告
                if current_time.hour == 9 and current_time.minute < 5:
                    self.run_summary_report()

                # 休眠5分钟后再检查
                time.sleep(300)

        except KeyboardInterrupt:
            logger.info("\n调度器已停止（用户中断）")
        except Exception as e:
            logger.error(f"调度器异常: {e}", exc_info=True)
        finally:
            self.engine.close()


def main():
    """主函数"""
    print("╔" + "═"*58 + "╗")
    print("║" + " "*15 + "SEC Monitor Scheduler v1.0" + " "*17 + "║")
    print("╚" + "═"*58 + "╝\n")

    scheduler = SECScheduler()
    scheduler.run()


if __name__ == "__main__":
    main()
