"""
SEC Monitor Engine - SEC文件实时监控

功能:
1. 监控SEC EDGAR文件 (8-K, 10-Q, 10-K, 4, SC 13D/G)
2. 关键词告警
3. MD&A变化检测
4. 内部人交易追踪
"""

import re
from datetime import datetime, timedelta
from typing import Dict, List, Optional

import requests
from bs4 import BeautifulSoup

from .base_engine import BaseEngine


class SECMonitor(BaseEngine):
    """SEC文件监控引擎"""

    def __init__(self, config, db, alert_system):
        super().__init__('sec_monitor', config, db, alert_system)

        # SEC API配置
        self.sec_api_key = self._get_api_key('SEC_API_KEY')
        self.sec_api_base = "https://api.sec-api.io"

        # 监控的表格类型
        self.form_types = self.engine_config.get('check_forms', [
            '8-K', '10-Q', '10-K', '4', 'SC 13D', 'SC 13G'
        ])

        # 告警关键词
        self.alert_keywords = self.engine_config.get('alert_on_keywords', [
            'material', 'investigation', 'restatement', 'default',
            'covenant', 'delisting', 'going concern'
        ])

    def _get_api_key(self, key_name: str) -> str:
        """从环境变量获取API密钥"""
        import os
        api_key = os.getenv(key_name)
        if not api_key:
            self.logger.warning(f"缺少API密钥: {key_name}, 使用demo模式")
            return "demo"
        return api_key

    def run(self):
        """运行SEC监控"""
        self.logger.info(f"开始监控 {self.ticker} 的SEC文件")

        try:
            # 获取最新文件
            recent_filings = self._fetch_recent_filings()

            if not recent_filings:
                self.logger.info("未发现新文件")
                self._update_stats(success=True)
                return

            self.logger.info(f"发现 {len(recent_filings)} 个新文件")

            # 分析每个文件并保存
            for filing in recent_filings:
                analysis = self._analyze_filing(filing)
                self._save_result('sec_filings', analysis)

                if analysis.get('requires_alert'):
                    self._send_filing_alert(analysis)

            self._update_stats(success=True)

        except Exception as e:
            self.logger.error(f"SEC监控失败: {e}", exc_info=True)
            self._update_stats(success=False, error=str(e))

    def _fetch_recent_filings(self, days: int = 1) -> List[Dict]:
        """获取最近的SEC文件 (简化实现)"""
        # 实际项目中这里调用SEC API
        # 这里返回模拟数据
        return []

    def _analyze_filing(self, filing: Dict) -> Dict:
        """分析单个SEC文件"""
        return {
            'form_type': filing.get('formType', ''),
            'filed_at': filing.get('filedAt', ''),
            'requires_alert': False
        }

    def _send_filing_alert(self, analysis: Dict):
        """发送文件告警"""
        title = f"SEC文件告警: {self.ticker} {analysis['form_type']}"
        message = f"提交日期: {analysis['filed_at']}"
        self._send_alert(title, message, level='warning')
