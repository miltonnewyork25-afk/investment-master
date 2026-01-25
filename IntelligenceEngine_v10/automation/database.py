"""
数据库设计与管理模块
支持SQLite存储所有引擎的历史数据
"""

import sqlite3
import pandas as pd
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class IntelligenceDB:
    """情报引擎数据库管理器"""

    def __init__(self, db_path: str = "tesla_intelligence.db"):
        """
        初始化数据库连接

        Args:
            db_path: 数据库文件路径
        """
        self.db_path = Path(db_path)
        self.conn = None
        self._initialize_db()

    def _initialize_db(self):
        """初始化数据库连接和表结构"""
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        self._create_tables()
        logger.info(f"数据库已初始化: {self.db_path}")

    def _create_tables(self):
        """创建所有必需的数据表"""
        cursor = self.conn.cursor()

        # 1. 内部人交易表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS insider_trading (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                insider VARCHAR(100),
                title VARCHAR(100),
                transaction VARCHAR(20),
                shares INTEGER,
                price FLOAT,
                value FLOAT,
                shares_owned_after INTEGER,
                filing_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_insider_date ON insider_trading(date)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_insider_ticker ON insider_trading(ticker)")

        # 2. 期权异常活动表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS options_unusual (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                contract_type VARCHAR(10),
                strike_price FLOAT,
                expiration DATE,
                volume INTEGER,
                open_interest INTEGER,
                implied_volatility FLOAT,
                premium FLOAT,
                notional_value FLOAT,
                unusual_score FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_options_date ON options_unusual(date)")

        # 3. 情绪指数历史表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sentiment_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                source VARCHAR(50),
                oci_score FLOAT,
                bullish_pct FLOAT,
                bearish_pct FLOAT,
                neutral_pct FLOAT,
                sample_size INTEGER,
                top_keywords TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_sentiment_date ON sentiment_history(date)")

        # 4. 供应链信号表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS supply_chain_signals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                supplier_ticker VARCHAR(10),
                supplier_name VARCHAR(100),
                signal_type VARCHAR(50),
                signal_strength FLOAT,
                metric_name VARCHAR(50),
                metric_value FLOAT,
                yoy_change FLOAT,
                qoq_change FLOAT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_supply_date ON supply_chain_signals(date)")

        # 5. 空头信号表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS short_signals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                short_interest FLOAT,
                short_ratio FLOAT,
                days_to_cover FLOAT,
                short_pct_float FLOAT,
                borrow_fee FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_short_date ON short_signals(date)")

        # 6. 暗池活动表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS dark_pool_activity (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                dark_pool_volume BIGINT,
                total_volume BIGINT,
                dark_pool_pct FLOAT,
                avg_trade_size FLOAT,
                net_flow FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_darkpool_date ON dark_pool_activity(date)")

        # 7. 每日综合报告表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS daily_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL UNIQUE,
                ticker VARCHAR(10) NOT NULL,
                composite_score FLOAT,
                position_recommendation VARCHAR(20),
                key_signals TEXT,
                report_path TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_reports_date ON daily_reports(date)")

        # 8. 告警历史表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE NOT NULL,
                ticker VARCHAR(10) NOT NULL,
                alert_type VARCHAR(50),
                severity VARCHAR(20),
                title VARCHAR(200),
                message TEXT,
                triggered_by TEXT,
                is_sent BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_alerts_date ON alerts(date)")

        # 9. 调度任务日志表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS task_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_name VARCHAR(100) NOT NULL,
                start_time TIMESTAMP,
                end_time TIMESTAMP,
                status VARCHAR(20),
                error_message TEXT,
                records_processed INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_task_date ON task_logs(start_time)")

        self.conn.commit()
        logger.info("所有数据表已创建/验证")

    # ==================== 插入方法 ====================

    def insert_insider_trading(self, data: Dict[str, Any]) -> int:
        """插入内部人交易记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO insider_trading
            (date, ticker, insider, title, transaction, shares, price, value,
             shares_owned_after, filing_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('insider'),
            data.get('title'),
            data.get('transaction'),
            data.get('shares'),
            data.get('price'),
            data.get('value'),
            data.get('shares_owned_after'),
            data.get('filing_url')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_options_unusual(self, data: Dict[str, Any]) -> int:
        """插入期权异常活动记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO options_unusual
            (date, ticker, contract_type, strike_price, expiration, volume,
             open_interest, implied_volatility, premium, notional_value, unusual_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('contract_type'),
            data.get('strike_price'),
            data.get('expiration'),
            data.get('volume'),
            data.get('open_interest'),
            data.get('implied_volatility'),
            data.get('premium'),
            data.get('notional_value'),
            data.get('unusual_score')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_sentiment(self, data: Dict[str, Any]) -> int:
        """插入情绪指数记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO sentiment_history
            (date, ticker, source, oci_score, bullish_pct, bearish_pct,
             neutral_pct, sample_size, top_keywords)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('source'),
            data.get('oci_score'),
            data.get('bullish_pct'),
            data.get('bearish_pct'),
            data.get('neutral_pct'),
            data.get('sample_size'),
            data.get('top_keywords')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_supply_chain_signal(self, data: Dict[str, Any]) -> int:
        """插入供应链信号记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO supply_chain_signals
            (date, ticker, supplier_ticker, supplier_name, signal_type,
             signal_strength, metric_name, metric_value, yoy_change, qoq_change, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('supplier_ticker'),
            data.get('supplier_name'),
            data.get('signal_type'),
            data.get('signal_strength'),
            data.get('metric_name'),
            data.get('metric_value'),
            data.get('yoy_change'),
            data.get('qoq_change'),
            data.get('description')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_short_signal(self, data: Dict[str, Any]) -> int:
        """插入空头信号记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO short_signals
            (date, ticker, short_interest, short_ratio, days_to_cover,
             short_pct_float, borrow_fee)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('short_interest'),
            data.get('short_ratio'),
            data.get('days_to_cover'),
            data.get('short_pct_float'),
            data.get('borrow_fee')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_dark_pool_activity(self, data: Dict[str, Any]) -> int:
        """插入暗池活动记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO dark_pool_activity
            (date, ticker, dark_pool_volume, total_volume, dark_pool_pct,
             avg_trade_size, net_flow)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('dark_pool_volume'),
            data.get('total_volume'),
            data.get('dark_pool_pct'),
            data.get('avg_trade_size'),
            data.get('net_flow')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_daily_report(self, data: Dict[str, Any]) -> int:
        """插入每日报告记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT OR REPLACE INTO daily_reports
            (date, ticker, composite_score, position_recommendation, key_signals, report_path)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('composite_score'),
            data.get('position_recommendation'),
            data.get('key_signals'),
            data.get('report_path')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def insert_alert(self, data: Dict[str, Any]) -> int:
        """插入告警记录"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO alerts
            (date, ticker, alert_type, severity, title, message, triggered_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('date'),
            data.get('ticker', 'TSLA'),
            data.get('alert_type'),
            data.get('severity'),
            data.get('title'),
            data.get('message'),
            data.get('triggered_by')
        ))
        self.conn.commit()
        return cursor.lastrowid

    def log_task(self, task_name: str, start_time: datetime, end_time: datetime,
                 status: str, error_message: str = None, records_processed: int = 0) -> int:
        """记录任务执行日志"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO task_logs
            (task_name, start_time, end_time, status, error_message, records_processed)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (task_name, start_time, end_time, status, error_message, records_processed))
        self.conn.commit()
        return cursor.lastrowid

    # ==================== 查询方法 ====================

    def get_insider_trading(self, ticker: str = 'TSLA', days: int = 30) -> pd.DataFrame:
        """获取内部人交易历史"""
        query = """
            SELECT * FROM insider_trading
            WHERE ticker = ? AND date >= date('now', '-{} days')
            ORDER BY date DESC
        """.format(days)
        return pd.read_sql_query(query, self.conn, params=(ticker,))

    def get_sentiment_history(self, ticker: str = 'TSLA', days: int = 30) -> pd.DataFrame:
        """获取情绪指数历史"""
        query = """
            SELECT * FROM sentiment_history
            WHERE ticker = ? AND date >= date('now', '-{} days')
            ORDER BY date DESC
        """.format(days)
        return pd.read_sql_query(query, self.conn, params=(ticker,))

    def get_recent_alerts(self, ticker: str = 'TSLA', days: int = 7) -> pd.DataFrame:
        """获取最近的告警"""
        query = """
            SELECT * FROM alerts
            WHERE ticker = ? AND date >= date('now', '-{} days')
            ORDER BY created_at DESC
        """.format(days)
        return pd.read_sql_query(query, self.conn, params=(ticker,))

    def get_task_logs(self, task_name: str = None, days: int = 7) -> pd.DataFrame:
        """获取任务执行日志"""
        if task_name:
            query = """
                SELECT * FROM task_logs
                WHERE task_name = ? AND start_time >= datetime('now', '-{} days')
                ORDER BY start_time DESC
            """.format(days)
            return pd.read_sql_query(query, self.conn, params=(task_name,))
        else:
            query = """
                SELECT * FROM task_logs
                WHERE start_time >= datetime('now', '-{} days')
                ORDER BY start_time DESC
            """.format(days)
            return pd.read_sql_query(query, self.conn)

    def get_latest_composite_score(self, ticker: str = 'TSLA') -> Optional[float]:
        """获取最新综合评分"""
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT composite_score FROM daily_reports
            WHERE ticker = ?
            ORDER BY date DESC
            LIMIT 1
        """, (ticker,))
        result = cursor.fetchone()
        return result[0] if result else None

    def mark_alert_sent(self, alert_id: int):
        """标记告警已发送"""
        cursor = self.conn.cursor()
        cursor.execute("UPDATE alerts SET is_sent = 1 WHERE id = ?", (alert_id,))
        self.conn.commit()

    def get_supply_chain_signals(self, ticker: str = 'TSLA', days: int = 30) -> pd.DataFrame:
        """获取供应链信号历史"""
        query = """
            SELECT * FROM supply_chain_signals
            WHERE ticker = ? AND date >= date('now', '-{} days')
            ORDER BY date DESC, signal_strength DESC
        """.format(days)
        return pd.read_sql_query(query, self.conn, params=(ticker,))

    def get_options_unusual(self, ticker: str = 'TSLA', days: int = 7) -> pd.DataFrame:
        """获取期权异常活动历史"""
        query = """
            SELECT * FROM options_unusual
            WHERE ticker = ? AND date >= date('now', '-{} days')
            ORDER BY date DESC, unusual_score DESC
        """.format(days)
        return pd.read_sql_query(query, self.conn, params=(ticker,))

    # ==================== 批量操作 ====================

    def bulk_insert_insider_trading(self, records: List[Dict[str, Any]]) -> int:
        """批量插入内部人交易记录"""
        count = 0
        for record in records:
            try:
                self.insert_insider_trading(record)
                count += 1
            except Exception as e:
                logger.error(f"批量插入内部人交易失败: {e}")
        return count

    def bulk_insert_sentiment(self, records: List[Dict[str, Any]]) -> int:
        """批量插入情绪记录"""
        count = 0
        for record in records:
            try:
                self.insert_sentiment(record)
                count += 1
            except Exception as e:
                logger.error(f"批量插入情绪数据失败: {e}")
        return count

    # ==================== 数据清理 ====================

    def cleanup_old_data(self, days: int = 365):
        """清理超过指定天数的旧数据"""
        cursor = self.conn.cursor()
        tables = [
            'insider_trading', 'options_unusual', 'sentiment_history',
            'supply_chain_signals', 'short_signals', 'dark_pool_activity',
            'task_logs'
        ]

        for table in tables:
            cursor.execute(f"""
                DELETE FROM {table}
                WHERE date < date('now', '-{days} days')
            """)

        self.conn.commit()
        logger.info(f"已清理{days}天前的旧数据")

    def close(self):
        """关闭数据库连接"""
        if self.conn:
            self.conn.close()
            logger.info("数据库连接已关闭")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


# ==================== 便捷函数 ====================

def get_db(db_path: str = "tesla_intelligence.db") -> IntelligenceDB:
    """获取数据库实例"""
    return IntelligenceDB(db_path)


if __name__ == "__main__":
    # 测试数据库功能
    logging.basicConfig(level=logging.INFO)

    with get_db("test_intelligence.db") as db:
        # 测试插入内部人交易
        test_insider = {
            'date': '2026-01-25',
            'ticker': 'TSLA',
            'insider': 'Elon Musk',
            'title': 'CEO',
            'transaction': 'Sale',
            'shares': 100000,
            'price': 450.00,
            'value': 45000000,
            'shares_owned_after': 1000000,
            'filing_url': 'https://sec.gov/test'
        }
        db.insert_insider_trading(test_insider)

        # 测试查询
        df = db.get_insider_trading(days=30)
        print(f"内部人交易记录: {len(df)} 条")

        # 测试插入告警
        test_alert = {
            'date': '2026-01-25',
            'ticker': 'TSLA',
            'alert_type': 'INSIDER_LARGE_SALE',
            'severity': 'HIGH',
            'title': 'CEO大额抛售',
            'message': 'Elon Musk抛售10万股',
            'triggered_by': 'InsiderTradingEngine'
        }
        db.insert_alert(test_alert)

        print("数据库测试完成！")
