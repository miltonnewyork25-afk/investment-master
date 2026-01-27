"""
Tesla Intelligence Engine v10 - Automation System

完整的自动化调度系统，支持:
- 6大引擎自动调度
- 智能告警推送
- 每日/每周报告生成
- 多种部署方式

Quick Start:
    python scheduler.py --once

Documentation:
    README_AUTOMATION.md
"""

__version__ = "1.0.0"
__author__ = "Intelligence Engine Team"
__date__ = "2026-01-25"

# 导出主要组件
try:
    from .scheduler import IntelligenceScheduler, create_scheduler
    from .database import IntelligenceDB, get_db
    from .alert_system import AlertSystem, create_alert_system
    from .report_generator import ReportGenerator, create_report_generator

    __all__ = [
        'IntelligenceScheduler',
        'create_scheduler',
        'IntelligenceDB',
        'get_db',
        'AlertSystem',
        'create_alert_system',
        'ReportGenerator',
        'create_report_generator',
    ]
except ImportError:
    # 如果作为独立脚本运行，导入可能失败
    __all__ = []
