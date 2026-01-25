"""
日志配置模块
"""

import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler


def setup_logging(config: dict) -> logging.Logger:
    """
    设置日志系统

    Args:
        config: 日志配置

    Returns:
        根日志器
    """
    # 创建日志目录
    log_file = config.get('file', 'logs/intelligence_engine.log')
    Path(log_file).parent.mkdir(parents=True, exist_ok=True)

    # 日志级别
    level_str = config.get('level', 'INFO')
    level = getattr(logging, level_str, logging.INFO)

    # 日志格式
    format_str = config.get('format', '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    formatter = logging.Formatter(format_str)

    # 根日志器
    root_logger = logging.getLogger()
    root_logger.setLevel(level)

    # 清除已有handlers
    root_logger.handlers.clear()

    # 控制台handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(level)
    console_handler.setFormatter(formatter)
    root_logger.addHandler(console_handler)

    # 文件handler (带轮转)
    max_bytes = config.get('max_bytes', 10485760)  # 10MB
    backup_count = config.get('backup_count', 5)

    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=max_bytes,
        backupCount=backup_count,
        encoding='utf-8'
    )
    file_handler.setLevel(level)
    file_handler.setFormatter(formatter)
    root_logger.addHandler(file_handler)

    return root_logger
