"""
引擎单元测试
"""

import pytest
from unittest.mock import Mock, MagicMock

from engines import SECMonitor, SentimentTracker
from automation import Database


@pytest.fixture
def mock_config():
    """模拟配置"""
    return {
        'company': {
            'name': 'Tesla',
            'ticker': 'TSLA',
            'cik': '0001318605'
        },
        'engines': {
            'sec_monitor': {
                'enabled': True,
                'schedule': '0 18 * * *',
                'check_forms': ['8-K', '10-Q']
            },
            'sentiment_tracker': {
                'enabled': True,
                'schedule': '0 9 * * *',
                'sources': {
                    'reddit': {'enabled': False}
                }
            }
        },
        'database': {
            'type': 'sqlite',
            'path': ':memory:'
        }
    }


@pytest.fixture
def mock_db():
    """模拟数据库"""
    db = Mock(spec=Database)
    db.save = MagicMock()
    db.query = MagicMock(return_value=[])
    return db


@pytest.fixture
def mock_alert():
    """模拟告警系统"""
    alert = Mock()
    alert.send_alert = MagicMock()
    return alert


def test_sec_monitor_init(mock_config, mock_db, mock_alert):
    """测试SEC Monitor初始化"""
    engine = SECMonitor(mock_config, mock_db, mock_alert)

    assert engine.ticker == 'TSLA'
    assert engine.name == 'sec_monitor'
    assert '8-K' in engine.form_types


def test_sentiment_tracker_init(mock_config, mock_db, mock_alert):
    """测试Sentiment Tracker初始化"""
    engine = SentimentTracker(mock_config, mock_db, mock_alert)

    assert engine.ticker == 'TSLA'
    assert engine.name == 'sentiment_tracker'


# 更多测试...
