"""
基础引擎类 - 所有引擎的父类
提供通用功能: 日志、配置、数据库、告警
"""

import logging
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict, Any, Optional


class BaseEngine(ABC):
    """所有引擎的抽象基类"""

    def __init__(self, name: str, config: Dict, db, alert_system):
        """
        初始化基础引擎

        Args:
            name: 引擎名称
            config: 全局配置
            db: 数据库实例
            alert_system: 告警系统实例
        """
        self.name = name
        self.config = config
        self.db = db
        self.alert_system = alert_system

        # 引擎特定配置
        self.engine_config = config['engines'].get(name, {})

        # 公司信息
        self.company = config['company']
        self.ticker = self.company['ticker']

        # 设置日志
        self.logger = logging.getLogger(f"engines.{name}")

        # 运行统计
        self.stats = {
            'last_run': None,
            'total_runs': 0,
            'errors': 0,
            'last_error': None
        }

    @abstractmethod
    def run(self):
        """引擎主逻辑 - 子类必须实现"""
        pass

    def _update_stats(self, success: bool = True, error: Optional[str] = None):
        """更新运行统计"""
        self.stats['last_run'] = datetime.now()
        self.stats['total_runs'] += 1

        if not success:
            self.stats['errors'] += 1
            self.stats['last_error'] = error

    def _save_result(self, table: str, data: Dict[str, Any]):
        """保存结果到数据库"""
        try:
            data['timestamp'] = datetime.now()
            data['ticker'] = self.ticker
            self.db.save(table, data)
            self.logger.debug(f"数据已保存到 {table}")
        except Exception as e:
            self.logger.error(f"保存数据失败: {e}")
            raise

    def _send_alert(self, title: str, message: str, level: str = "info"):
        """发送告警"""
        try:
            self.alert_system.send_alert(title, message, level)
            self.logger.info(f"告警已发送: {title}")
        except Exception as e:
            self.logger.error(f"发送告警失败: {e}")

    def get_stats(self) -> Dict[str, Any]:
        """获取引擎统计信息"""
        return {
            'name': self.name,
            'enabled': self.engine_config.get('enabled', False),
            'schedule': self.engine_config.get('schedule', 'N/A'),
            **self.stats
        }

    def __repr__(self):
        return f"<{self.__class__.__name__}(ticker={self.ticker}, enabled={self.engine_config.get('enabled', False)})>"
