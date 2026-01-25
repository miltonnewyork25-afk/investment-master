#!/usr/bin/env python3
"""
IntelligenceEngine v10 - 主程序入口
可复用的投资情报自动化系统

Usage:
    python main.py                    # 启动所有引擎
    python main.py --engine sec       # 只运行SEC监控
    python main.py --report daily     # 生成今日报告
    python main.py --daemon           # 后台守护模式
"""

import sys
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Optional

import yaml
from dotenv import load_dotenv

from engines import (
    SECMonitor,
    SentimentTracker,
    SupplyChainIntel,
    OptionsDecoder,
    CompetitorTracker,
    EarningsPredictor
)
from automation import Scheduler, ReportGenerator, Database, AlertSystem
from utils import setup_logging, validate_config, check_api_keys


class IntelligenceEngine:
    """主控制器 - 协调6大引擎"""

    def __init__(self, config_path: str = "config.yaml"):
        """初始化引擎"""
        # 加载环境变量
        load_dotenv()

        # 加载配置
        self.config = self._load_config(config_path)

        # 设置日志
        self.logger = setup_logging(self.config['logging'])
        self.logger.info("="*60)
        self.logger.info(f"IntelligenceEngine v10 启动")
        self.logger.info(f"目标公司: {self.config['company']['name']} ({self.config['company']['ticker']})")
        self.logger.info("="*60)

        # 验证配置
        validate_config(self.config)

        # 检查API密钥
        check_api_keys(self.config['api_keys'])

        # 初始化数据库
        self.db = Database(self.config['database'])

        # 初始化告警系统
        self.alert_system = AlertSystem(self.config['alerts'])

        # 初始化引擎
        self.engines = self._initialize_engines()

        # 初始化报告生成器
        self.report_generator = ReportGenerator(
            self.config,
            self.db,
            self.engines
        )

        # 初始化调度器
        self.scheduler = Scheduler(
            self.config,
            self.engines,
            self.report_generator,
            self.alert_system
        )

        self.logger.info("所有组件初始化完成")

    def _load_config(self, config_path: str) -> Dict:
        """加载YAML配置"""
        config_file = Path(config_path)
        if not config_file.exists():
            raise FileNotFoundError(f"配置文件不存在: {config_path}")

        with open(config_file, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)

        return config

    def _initialize_engines(self) -> Dict:
        """初始化所有已启用的引擎"""
        engines = {}
        engine_classes = {
            'sec_monitor': SECMonitor,
            'sentiment_tracker': SentimentTracker,
            'supply_chain_intel': SupplyChainIntel,
            'options_decoder': OptionsDecoder,
            'competitor_tracker': CompetitorTracker,
            'earnings_predictor': EarningsPredictor
        }

        for engine_name, engine_class in engine_classes.items():
            if self.config['engines'].get(engine_name, {}).get('enabled', False):
                try:
                    engines[engine_name] = engine_class(
                        self.config,
                        self.db,
                        self.alert_system
                    )
                    self.logger.info(f"✓ {engine_name} 初始化成功")
                except Exception as e:
                    self.logger.error(f"✗ {engine_name} 初始化失败: {e}")
            else:
                self.logger.info(f"- {engine_name} 未启用")

        return engines

    def run_engine(self, engine_name: str) -> None:
        """运行单个引擎"""
        if engine_name not in self.engines:
            self.logger.error(f"引擎不存在或未启用: {engine_name}")
            return

        self.logger.info(f"运行引擎: {engine_name}")
        try:
            self.engines[engine_name].run()
            self.logger.info(f"✓ {engine_name} 运行完成")
        except Exception as e:
            self.logger.error(f"✗ {engine_name} 运行失败: {e}", exc_info=True)
            self.alert_system.send_alert(
                f"引擎故障: {engine_name}",
                f"错误信息: {str(e)}",
                level="error"
            )

    def run_all_engines(self) -> None:
        """运行所有已启用的引擎"""
        self.logger.info("开始运行所有引擎")
        for engine_name in self.engines:
            self.run_engine(engine_name)
        self.logger.info("所有引擎运行完成")

    def generate_report(self, report_type: str = "daily") -> None:
        """生成报告"""
        self.logger.info(f"生成 {report_type} 报告")
        try:
            report_path = self.report_generator.generate(report_type)
            self.logger.info(f"✓ 报告已保存: {report_path}")

            # 发送报告通知
            self.alert_system.send_alert(
                f"{report_type.capitalize()} 报告已生成",
                f"报告路径: {report_path}",
                level="info"
            )
        except Exception as e:
            self.logger.error(f"✗ 报告生成失败: {e}", exc_info=True)

    def start_daemon(self) -> None:
        """启动守护进程模式"""
        self.logger.info("启动守护进程模式")
        try:
            self.scheduler.start()
            self.logger.info("调度器已启动，按Ctrl+C退出")

            # 发送启动通知
            self.alert_system.send_alert(
                "IntelligenceEngine 已启动",
                f"目标: {self.config['company']['ticker']}\n"
                f"已启用引擎: {', '.join(self.engines.keys())}",
                level="info"
            )

            # 保持运行
            self.scheduler.block()
        except KeyboardInterrupt:
            self.logger.info("接收到退出信号")
            self.scheduler.stop()
            self.logger.info("调度器已停止")
        except Exception as e:
            self.logger.error(f"守护进程异常: {e}", exc_info=True)
            self.scheduler.stop()

    def status(self) -> None:
        """显示系统状态"""
        print("\n" + "="*60)
        print(f"IntelligenceEngine v10 - 系统状态")
        print("="*60)
        print(f"目标公司: {self.config['company']['name']} ({self.config['company']['ticker']})")
        print(f"\n已启用引擎 ({len(self.engines)}/6):")
        for engine_name in self.engines:
            print(f"  ✓ {engine_name}")

        disabled = set(['sec_monitor', 'sentiment_tracker', 'supply_chain_intel',
                       'options_decoder', 'competitor_tracker', 'earnings_predictor']) - set(self.engines.keys())
        if disabled:
            print(f"\n未启用引擎 ({len(disabled)}/6):")
            for engine_name in disabled:
                print(f"  - {engine_name}")

        print(f"\n数据库: {self.config['database']['path']}")
        print(f"调度器: {'运行中' if self.scheduler.is_running() else '未运行'}")
        print("="*60 + "\n")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(
        description="IntelligenceEngine v10 - 投资情报自动化系统",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python main.py                      # 运行所有引擎一次
  python main.py --daemon             # 启动守护进程
  python main.py --engine sec         # 只运行SEC监控
  python main.py --report daily       # 生成今日报告
  python main.py --status             # 查看系统状态
        """
    )

    parser.add_argument(
        '--config',
        default='config.yaml',
        help='配置文件路径 (默认: config.yaml)'
    )

    parser.add_argument(
        '--daemon',
        action='store_true',
        help='启动守护进程模式'
    )

    parser.add_argument(
        '--engine',
        choices=['sec', 'sentiment', 'supply_chain', 'options', 'competitor', 'earnings', 'all'],
        help='运行指定引擎'
    )

    parser.add_argument(
        '--report',
        choices=['daily', 'weekly', 'monthly'],
        help='生成指定类型报告'
    )

    parser.add_argument(
        '--status',
        action='store_true',
        help='显示系统状态'
    )

    args = parser.parse_args()

    # 初始化引擎
    try:
        engine = IntelligenceEngine(args.config)
    except Exception as e:
        print(f"初始化失败: {e}", file=sys.stderr)
        sys.exit(1)

    # 执行命令
    try:
        if args.status:
            engine.status()
        elif args.daemon:
            engine.start_daemon()
        elif args.engine:
            if args.engine == 'all':
                engine.run_all_engines()
            else:
                engine_map = {
                    'sec': 'sec_monitor',
                    'sentiment': 'sentiment_tracker',
                    'supply_chain': 'supply_chain_intel',
                    'options': 'options_decoder',
                    'competitor': 'competitor_tracker',
                    'earnings': 'earnings_predictor'
                }
                engine.run_engine(engine_map[args.engine])
        elif args.report:
            engine.generate_report(args.report)
        else:
            # 默认：运行所有引擎一次
            engine.run_all_engines()
    except Exception as e:
        engine.logger.error(f"执行失败: {e}", exc_info=True)
        sys.exit(1)


if __name__ == '__main__':
    main()
