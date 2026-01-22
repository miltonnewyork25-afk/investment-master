"""
SQLite 数据库操作

存储：
- 股价历史
- 评分历史
- 预测记录
- 预警日志
"""

import sqlite3
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Tuple
import json
import sys

sys.path.append(str(Path(__file__).parent.parent))
from config import DB_PATH


class Database:
    """投资数据数据库"""

    def __init__(self, db_path: Path = None):
        self.db_path = db_path or DB_PATH
        self.db_path.parent.mkdir(parents=True, exist_ok=True)

    def _connect(self):
        """获取数据库连接"""
        return sqlite3.connect(self.db_path)

    def init_db(self):
        """初始化数据库表结构"""
        conn = self._connect()
        cursor = conn.cursor()

        # 股价表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS prices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symbol TEXT NOT NULL,
                date TEXT NOT NULL,
                open REAL,
                high REAL,
                low REAL,
                close REAL,
                volume INTEGER,
                pe REAL,
                pb REAL,
                market_cap REAL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(symbol, date)
            )
        """)

        # 行业指标表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS indicators (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                indicator_name TEXT NOT NULL,
                date TEXT NOT NULL,
                value REAL NOT NULL,
                yoy_change REAL,
                mom_change REAL,
                source TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(indicator_name, date)
            )
        """)

        # 评分历史表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symbol TEXT NOT NULL,
                date TEXT NOT NULL,
                industry TEXT NOT NULL,
                framework_version TEXT NOT NULL,
                base_score REAL,
                adjustments TEXT,  -- JSON格式的调整项
                final_score REAL,
                rating TEXT,
                recommendation TEXT,
                data_snapshot TEXT,  -- JSON格式的数据快照
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(symbol, date, framework_version)
            )
        """)

        # 预测记录表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symbol TEXT NOT NULL,
                prediction_date TEXT NOT NULL,
                prediction_type TEXT NOT NULL,  -- '3month', '6month', '12month'
                predicted_direction TEXT,  -- 'up', 'down', 'sideways'
                predicted_score REAL,
                confidence TEXT,  -- 'high', 'medium', 'low'
                target_date TEXT NOT NULL,
                actual_price REAL,
                actual_direction TEXT,
                is_correct INTEGER,  -- 0 or 1
                reviewed_at TEXT,
                notes TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(symbol, prediction_date, prediction_type)
            )
        """)

        # 预警日志表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                alert_type TEXT NOT NULL,  -- 'price_change', 'score_change', 'signal'
                symbol TEXT,
                industry TEXT,
                severity TEXT NOT NULL,  -- 'info', 'warning', 'critical'
                message TEXT NOT NULL,
                data TEXT,  -- JSON格式的相关数据
                acknowledged INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # 创建索引
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_prices_symbol_date ON prices(symbol, date)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_scores_symbol_date ON scores(symbol, date)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_predictions_symbol ON predictions(symbol)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_alerts_created ON alerts(created_at)")

        conn.commit()
        conn.close()
        print(f"[INFO] 数据库初始化完成: {self.db_path}")

    # ============================================================
    # 股价操作
    # ============================================================

    def insert_price(self, symbol: str, date: str, price_data: dict):
        """插入股价数据"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT OR REPLACE INTO prices
                (symbol, date, open, high, low, close, volume, pe, pb, market_cap)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                symbol, date,
                price_data.get("open"),
                price_data.get("high"),
                price_data.get("low"),
                price_data.get("close") or price_data.get("price"),
                price_data.get("volume"),
                price_data.get("pe"),
                price_data.get("pb") or price_data.get("priceToBook"),
                price_data.get("marketCap")
            ))
            conn.commit()
        finally:
            conn.close()

    def get_latest_price(self, symbol: str) -> Optional[dict]:
        """获取最新股价"""
        conn = self._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM prices WHERE symbol = ?
            ORDER BY date DESC LIMIT 1
        """, (symbol,))

        row = cursor.fetchone()
        conn.close()

        if row:
            columns = ["id", "symbol", "date", "open", "high", "low", "close",
                       "volume", "pe", "pb", "market_cap", "created_at"]
            return dict(zip(columns, row))
        return None

    def get_price_history(self, symbol: str, days: int = 30) -> List[dict]:
        """获取历史股价"""
        conn = self._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT date, close, pe, pb FROM prices
            WHERE symbol = ?
            ORDER BY date DESC LIMIT ?
        """, (symbol, days))

        rows = cursor.fetchall()
        conn.close()

        return [{"date": r[0], "close": r[1], "pe": r[2], "pb": r[3]} for r in rows]

    # ============================================================
    # 指标操作
    # ============================================================

    def insert_indicator(self, name: str, date: str, value: float,
                         yoy: float = None, mom: float = None, source: str = None):
        """插入行业指标"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT OR REPLACE INTO indicators
                (indicator_name, date, value, yoy_change, mom_change, source)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (name, date, value, yoy, mom, source))
            conn.commit()
        finally:
            conn.close()

    def get_latest_indicator(self, name: str) -> Optional[dict]:
        """获取最新指标值"""
        conn = self._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM indicators WHERE indicator_name = ?
            ORDER BY date DESC LIMIT 1
        """, (name,))

        row = cursor.fetchone()
        conn.close()

        if row:
            columns = ["id", "indicator_name", "date", "value",
                       "yoy_change", "mom_change", "source", "created_at"]
            return dict(zip(columns, row))
        return None

    # ============================================================
    # 评分操作
    # ============================================================

    def insert_score(self, symbol: str, date: str, industry: str,
                     version: str, base_score: float, adjustments: dict,
                     final_score: float, rating: str, recommendation: str,
                     data_snapshot: dict):
        """插入评分记录"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT OR REPLACE INTO scores
                (symbol, date, industry, framework_version, base_score,
                 adjustments, final_score, rating, recommendation, data_snapshot)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                symbol, date, industry, version, base_score,
                json.dumps(adjustments, ensure_ascii=False),
                final_score, rating, recommendation,
                json.dumps(data_snapshot, ensure_ascii=False)
            ))
            conn.commit()
        finally:
            conn.close()

    def get_latest_score(self, symbol: str) -> Optional[dict]:
        """获取最新评分"""
        conn = self._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM scores WHERE symbol = ?
            ORDER BY date DESC LIMIT 1
        """, (symbol,))

        row = cursor.fetchone()
        conn.close()

        if row:
            columns = ["id", "symbol", "date", "industry", "framework_version",
                       "base_score", "adjustments", "final_score", "rating",
                       "recommendation", "data_snapshot", "created_at"]
            result = dict(zip(columns, row))
            result["adjustments"] = json.loads(result["adjustments"])
            result["data_snapshot"] = json.loads(result["data_snapshot"])
            return result
        return None

    def get_score_history(self, symbol: str, limit: int = 10) -> List[dict]:
        """获取评分历史"""
        conn = self._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT date, final_score, rating, recommendation
            FROM scores WHERE symbol = ?
            ORDER BY date DESC LIMIT ?
        """, (symbol, limit))

        rows = cursor.fetchall()
        conn.close()

        return [{"date": r[0], "score": r[1], "rating": r[2], "recommendation": r[3]}
                for r in rows]

    # ============================================================
    # 预测操作
    # ============================================================

    def insert_prediction(self, symbol: str, prediction_date: str,
                          prediction_type: str, direction: str,
                          score: float, confidence: str, target_date: str):
        """插入预测记录"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT OR REPLACE INTO predictions
                (symbol, prediction_date, prediction_type, predicted_direction,
                 predicted_score, confidence, target_date)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (symbol, prediction_date, prediction_type, direction,
                  score, confidence, target_date))
            conn.commit()
        finally:
            conn.close()

    def update_prediction_result(self, symbol: str, prediction_date: str,
                                  prediction_type: str, actual_price: float,
                                  actual_direction: str, is_correct: bool, notes: str = None):
        """更新预测结果"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                UPDATE predictions SET
                actual_price = ?,
                actual_direction = ?,
                is_correct = ?,
                reviewed_at = ?,
                notes = ?
                WHERE symbol = ? AND prediction_date = ? AND prediction_type = ?
            """, (actual_price, actual_direction, 1 if is_correct else 0,
                  datetime.now().isoformat(), notes,
                  symbol, prediction_date, prediction_type))
            conn.commit()
        finally:
            conn.close()

    def get_pending_predictions(self) -> List[dict]:
        """获取待验证的预测"""
        conn = self._connect()
        cursor = conn.cursor()

        today = datetime.now().strftime("%Y-%m-%d")

        cursor.execute("""
            SELECT * FROM predictions
            WHERE target_date <= ? AND is_correct IS NULL
            ORDER BY target_date
        """, (today,))

        rows = cursor.fetchall()
        conn.close()

        columns = ["id", "symbol", "prediction_date", "prediction_type",
                   "predicted_direction", "predicted_score", "confidence",
                   "target_date", "actual_price", "actual_direction",
                   "is_correct", "reviewed_at", "notes", "created_at"]

        return [dict(zip(columns, row)) for row in rows]

    def get_accuracy_stats(self, symbol: str = None) -> dict:
        """计算预测准确率"""
        conn = self._connect()
        cursor = conn.cursor()

        if symbol:
            cursor.execute("""
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
                FROM predictions
                WHERE symbol = ? AND is_correct IS NOT NULL
            """, (symbol,))
        else:
            cursor.execute("""
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
                FROM predictions
                WHERE is_correct IS NOT NULL
            """)

        row = cursor.fetchone()
        conn.close()

        total = row[0] or 0
        correct = row[1] or 0
        accuracy = (correct / total * 100) if total > 0 else 0

        return {
            "total": total,
            "correct": correct,
            "accuracy": round(accuracy, 1)
        }

    # ============================================================
    # 预警操作
    # ============================================================

    def insert_alert(self, alert_type: str, severity: str, message: str,
                     symbol: str = None, industry: str = None, data: dict = None):
        """插入预警"""
        conn = self._connect()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO alerts
                (alert_type, symbol, industry, severity, message, data)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (alert_type, symbol, industry, severity, message,
                  json.dumps(data, ensure_ascii=False) if data else None))
            conn.commit()
        finally:
            conn.close()

    def get_recent_alerts(self, limit: int = 20, unack_only: bool = False) -> List[dict]:
        """获取最近的预警"""
        conn = self._connect()
        cursor = conn.cursor()

        if unack_only:
            cursor.execute("""
                SELECT * FROM alerts
                WHERE acknowledged = 0
                ORDER BY created_at DESC LIMIT ?
            """, (limit,))
        else:
            cursor.execute("""
                SELECT * FROM alerts
                ORDER BY created_at DESC LIMIT ?
            """, (limit,))

        rows = cursor.fetchall()
        conn.close()

        columns = ["id", "alert_type", "symbol", "industry", "severity",
                   "message", "data", "acknowledged", "created_at"]

        results = []
        for row in rows:
            r = dict(zip(columns, row))
            if r["data"]:
                r["data"] = json.loads(r["data"])
            results.append(r)

        return results


def main():
    """测试数据库操作"""
    print("=" * 60)
    print("数据库测试")
    print("=" * 60)

    db = Database()

    # 初始化
    print("\n[TEST] 初始化数据库...")
    db.init_db()

    # 测试插入股价
    print("\n[TEST] 插入测试股价...")
    db.insert_price("LRCX", "2026-01-22", {
        "close": 75.50,
        "pe": 25.5,
        "pb": 3.2,
        "marketCap": 100000000000
    })

    # 测试查询
    print("\n[TEST] 查询最新股价...")
    price = db.get_latest_price("LRCX")
    print(f"  {price}")

    # 测试插入评分
    print("\n[TEST] 插入测试评分...")
    db.insert_score(
        symbol="LRCX",
        date="2026-01-22",
        industry="semicap",
        version="v5.0",
        base_score=55,
        adjustments={"divergence": -20, "sentiment": 5},
        final_score=40,
        rating="谨慎",
        recommendation="减仓/观望",
        data_snapshot={"pe": 25.5, "dram_yoy": 30}
    )

    # 查询评分
    print("\n[TEST] 查询最新评分...")
    score = db.get_latest_score("LRCX")
    print(f"  {score}")

    print("\n[SUCCESS] 数据库测试完成!")


if __name__ == "__main__":
    main()
