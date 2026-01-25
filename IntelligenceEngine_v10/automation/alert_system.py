"""
告警推送系统
支持邮件、Slack、Telegram等多种推送方式
"""

import logging
import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, Any, List, Optional
from pathlib import Path
import requests

logger = logging.getLogger(__name__)


class AlertConfig:
    """告警配置管理"""

    def __init__(self, config_path: str = "alert_config.json"):
        self.config_path = Path(config_path)
        self.config = self._load_config()

    def _load_config(self) -> Dict[str, Any]:
        """加载配置文件"""
        if self.config_path.exists():
            with open(self.config_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            # 创建默认配置
            default_config = {
                "enabled": True,
                "channels": {
                    "email": {
                        "enabled": False,
                        "smtp_host": "smtp.gmail.com",
                        "smtp_port": 587,
                        "sender": "your_email@gmail.com",
                        "password": "your_app_password",
                        "recipients": ["recipient@example.com"]
                    },
                    "slack": {
                        "enabled": False,
                        "webhook_url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
                    },
                    "telegram": {
                        "enabled": False,
                        "bot_token": "YOUR_BOT_TOKEN",
                        "chat_id": "YOUR_CHAT_ID"
                    }
                },
                "alert_rules": {
                    "insider_trading": {
                        "enabled": True,
                        "min_value": 1000000,
                        "severity": "HIGH"
                    },
                    "options_unusual": {
                        "enabled": True,
                        "min_score": 8.0,
                        "severity": "HIGH"
                    },
                    "sentiment_shift": {
                        "enabled": True,
                        "min_change": 2.0,
                        "severity": "MEDIUM"
                    },
                    "supply_chain": {
                        "enabled": True,
                        "min_strength": 7.0,
                        "severity": "MEDIUM"
                    },
                    "short_squeeze": {
                        "enabled": True,
                        "min_short_pct": 20.0,
                        "severity": "HIGH"
                    },
                    "dark_pool": {
                        "enabled": True,
                        "min_pct": 40.0,
                        "severity": "MEDIUM"
                    }
                }
            }

            # 保存默认配置
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(default_config, f, indent=2, ensure_ascii=False)

            return default_config

    def is_enabled(self, channel: str) -> bool:
        """检查渠道是否启用"""
        return self.config.get("enabled", False) and \
               self.config.get("channels", {}).get(channel, {}).get("enabled", False)

    def get_channel_config(self, channel: str) -> Dict[str, Any]:
        """获取渠道配置"""
        return self.config.get("channels", {}).get(channel, {})

    def get_alert_rule(self, rule_name: str) -> Dict[str, Any]:
        """获取告警规则"""
        return self.config.get("alert_rules", {}).get(rule_name, {})


class AlertSystem:
    """告警系统主类"""

    def __init__(self, config_path: str = "alert_config.json"):
        self.config = AlertConfig(config_path)
        self.alert_history = []

    # ==================== 告警触发检查 ====================

    def check_insider_trading_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """检查内部人交易告警"""
        rule = self.config.get_alert_rule("insider_trading")
        if not rule.get("enabled"):
            return None

        value = data.get("value", 0)
        if abs(value) >= rule.get("min_value", 1000000):
            transaction_type = "买入" if value > 0 else "抛售"
            return {
                "alert_type": "INSIDER_TRADING",
                "severity": rule.get("severity", "HIGH"),
                "title": f"🚨 内部人大额{transaction_type}",
                "message": f"""
{data.get('insider')} ({data.get('title')})
{transaction_type} {abs(data.get('shares', 0)):,} 股
价格: ${data.get('price', 0):.2f}
总价值: ${abs(value):,.0f}
日期: {data.get('date')}
""",
                "triggered_by": "InsiderTradingEngine",
                "data": data
            }
        return None

    def check_options_unusual_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """检查期权异常活动告警"""
        rule = self.config.get_alert_rule("options_unusual")
        if not rule.get("enabled"):
            return None

        score = data.get("unusual_score", 0)
        if score >= rule.get("min_score", 8.0):
            return {
                "alert_type": "OPTIONS_UNUSUAL",
                "severity": rule.get("severity", "HIGH"),
                "title": f"🔥 期权异常活动 (评分: {score:.1f}/10)",
                "message": f"""
类型: {data.get('contract_type')}
行权价: ${data.get('strike_price', 0):.2f}
到期日: {data.get('expiration')}
成交量: {data.get('volume', 0):,}
未平仓: {data.get('open_interest', 0):,}
名义价值: ${data.get('notional_value', 0):,.0f}
隐含波动率: {data.get('implied_volatility', 0):.2%}
""",
                "triggered_by": "OptionsEngine",
                "data": data
            }
        return None

    def check_sentiment_alert(self, current_score: float, previous_score: float,
                             date: str) -> Optional[Dict[str, Any]]:
        """检查情绪指数剧变告警"""
        rule = self.config.get_alert_rule("sentiment_shift")
        if not rule.get("enabled"):
            return None

        change = abs(current_score - previous_score)
        if change >= rule.get("min_change", 2.0):
            direction = "上升" if current_score > previous_score else "下降"
            emoji = "📈" if current_score > previous_score else "📉"
            return {
                "alert_type": "SENTIMENT_SHIFT",
                "severity": rule.get("severity", "MEDIUM"),
                "title": f"{emoji} 情绪指数剧变",
                "message": f"""
当前OCI: {current_score:.1f}
前值: {previous_score:.1f}
变化: {direction} {change:.1f} 点
日期: {date}
""",
                "triggered_by": "SentimentEngine",
                "data": {"current": current_score, "previous": previous_score, "change": change}
            }
        return None

    def check_supply_chain_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """检查供应链信号告警"""
        rule = self.config.get_alert_rule("supply_chain")
        if not rule.get("enabled"):
            return None

        strength = data.get("signal_strength", 0)
        if strength >= rule.get("min_strength", 7.0):
            return {
                "alert_type": "SUPPLY_CHAIN",
                "severity": rule.get("severity", "MEDIUM"),
                "title": f"⛓️ 供应链强信号 ({strength:.1f}/10)",
                "message": f"""
供应商: {data.get('supplier_name')} ({data.get('supplier_ticker')})
信号类型: {data.get('signal_type')}
指标: {data.get('metric_name')}
当前值: {data.get('metric_value', 0):.2f}
同比变化: {data.get('yoy_change', 0):+.1%}
环比变化: {data.get('qoq_change', 0):+.1%}
说明: {data.get('description')}
""",
                "triggered_by": "SupplyChainEngine",
                "data": data
            }
        return None

    def check_short_squeeze_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """检查空头挤压风险告警"""
        rule = self.config.get_alert_rule("short_squeeze")
        if not rule.get("enabled"):
            return None

        short_pct = data.get("short_pct_float", 0)
        if short_pct >= rule.get("min_short_pct", 20.0):
            return {
                "alert_type": "SHORT_SQUEEZE",
                "severity": rule.get("severity", "HIGH"),
                "title": f"💥 空头挤压风险 ({short_pct:.1f}%)",
                "message": f"""
空头占流通股: {short_pct:.1f}%
空头利息: {data.get('short_interest', 0):,.0f}
空头比率: {data.get('short_ratio', 0):.2f}
回补天数: {data.get('days_to_cover', 0):.1f}
借券费率: {data.get('borrow_fee', 0):.2%}
日期: {data.get('date')}
""",
                "triggered_by": "ShortEngine",
                "data": data
            }
        return None

    def check_dark_pool_alert(self, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """检查暗池异常活动告警"""
        rule = self.config.get_alert_rule("dark_pool")
        if not rule.get("enabled"):
            return None

        dark_pct = data.get("dark_pool_pct", 0)
        if dark_pct >= rule.get("min_pct", 40.0):
            return {
                "alert_type": "DARK_POOL",
                "severity": rule.get("severity", "MEDIUM"),
                "title": f"🌑 暗池异常活动 ({dark_pct:.1f}%)",
                "message": f"""
暗池成交占比: {dark_pct:.1f}%
暗池成交量: {data.get('dark_pool_volume', 0):,}
总成交量: {data.get('total_volume', 0):,}
平均交易规模: {data.get('avg_trade_size', 0):,.0f}
净流入: ${data.get('net_flow', 0):,.0f}
日期: {data.get('date')}
""",
                "triggered_by": "DarkPoolEngine",
                "data": data
            }
        return None

    # ==================== 告警发送 ====================

    def send_alert(self, alert: Dict[str, Any]):
        """发送告警到所有启用的渠道"""
        if not self.config.config.get("enabled"):
            logger.info("告警系统已禁用")
            return

        self.alert_history.append({
            **alert,
            "sent_at": datetime.now().isoformat()
        })

        # 发送到各个渠道
        if self.config.is_enabled("email"):
            self._send_email(alert)

        if self.config.is_enabled("slack"):
            self._send_slack(alert)

        if self.config.is_enabled("telegram"):
            self._send_telegram(alert)

        logger.info(f"告警已发送: {alert['title']}")

    def _send_email(self, alert: Dict[str, Any]):
        """发送邮件告警"""
        try:
            config = self.config.get_channel_config("email")

            msg = MIMEMultipart()
            msg['From'] = config['sender']
            msg['To'] = ', '.join(config['recipients'])
            msg['Subject'] = f"[Tesla Intelligence] {alert['title']}"

            # 构建HTML邮件正文
            severity_color = {
                "HIGH": "#FF4444",
                "MEDIUM": "#FFA500",
                "LOW": "#4CAF50"
            }
            color = severity_color.get(alert.get('severity', 'MEDIUM'), '#999')

            html = f"""
            <html>
            <body style="font-family: Arial, sans-serif;">
                <div style="background-color: {color}; color: white; padding: 15px; border-radius: 5px;">
                    <h2>{alert['title']}</h2>
                    <p><strong>严重程度:</strong> {alert.get('severity', 'MEDIUM')}</p>
                </div>
                <div style="padding: 20px; background-color: #f5f5f5; margin-top: 10px; border-radius: 5px;">
                    <pre style="white-space: pre-wrap; font-size: 14px;">{alert['message']}</pre>
                </div>
                <div style="margin-top: 20px; font-size: 12px; color: #666;">
                    <p>触发引擎: {alert.get('triggered_by', 'Unknown')}</p>
                    <p>时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>
            </body>
            </html>
            """

            msg.attach(MIMEText(html, 'html'))

            # 发送邮件
            with smtplib.SMTP(config['smtp_host'], config['smtp_port']) as server:
                server.starttls()
                server.login(config['sender'], config['password'])
                server.send_message(msg)

            logger.info("邮件告警发送成功")

        except Exception as e:
            logger.error(f"邮件发送失败: {e}")

    def _send_slack(self, alert: Dict[str, Any]):
        """发送Slack告警"""
        try:
            config = self.config.get_channel_config("slack")

            # 构建Slack消息
            severity_emoji = {
                "HIGH": ":red_circle:",
                "MEDIUM": ":large_orange_diamond:",
                "LOW": ":large_green_circle:"
            }

            payload = {
                "text": f"{severity_emoji.get(alert.get('severity', 'MEDIUM'), ':grey_question:')} {alert['title']}",
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": alert['title']
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": f"*严重程度:*\n{alert.get('severity', 'MEDIUM')}"
                            },
                            {
                                "type": "mrkdwn",
                                "text": f"*触发引擎:*\n{alert.get('triggered_by', 'Unknown')}"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": f"```{alert['message']}```"
                        }
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
                            }
                        ]
                    }
                ]
            }

            response = requests.post(
                config['webhook_url'],
                json=payload,
                headers={'Content-Type': 'application/json'}
            )

            if response.status_code == 200:
                logger.info("Slack告警发送成功")
            else:
                logger.error(f"Slack发送失败: {response.status_code}")

        except Exception as e:
            logger.error(f"Slack发送失败: {e}")

    def _send_telegram(self, alert: Dict[str, Any]):
        """发送Telegram告警"""
        try:
            config = self.config.get_channel_config("telegram")

            # 构建Telegram消息
            severity_emoji = {
                "HIGH": "🔴",
                "MEDIUM": "🟠",
                "LOW": "🟢"
            }

            text = f"""
{severity_emoji.get(alert.get('severity', 'MEDIUM'), '⚪')} *{alert['title']}*

严重程度: {alert.get('severity', 'MEDIUM')}
触发引擎: {alert.get('triggered_by', 'Unknown')}

```
{alert['message']}
```

_时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}_
"""

            url = f"https://api.telegram.org/bot{config['bot_token']}/sendMessage"
            payload = {
                "chat_id": config['chat_id'],
                "text": text,
                "parse_mode": "Markdown"
            }

            response = requests.post(url, json=payload)

            if response.status_code == 200:
                logger.info("Telegram告警发送成功")
            else:
                logger.error(f"Telegram发送失败: {response.status_code}")

        except Exception as e:
            logger.error(f"Telegram发送失败: {e}")

    # ==================== 批量处理 ====================

    def process_alerts(self, alerts: List[Dict[str, Any]]):
        """批量处理告警"""
        for alert in alerts:
            if alert:  # 过滤None
                self.send_alert(alert)

    def get_alert_summary(self, hours: int = 24) -> Dict[str, Any]:
        """获取告警摘要"""
        recent_alerts = [
            a for a in self.alert_history
            if (datetime.now() - datetime.fromisoformat(a['sent_at'])).total_seconds() < hours * 3600
        ]

        return {
            "total": len(recent_alerts),
            "by_severity": {
                "HIGH": len([a for a in recent_alerts if a.get('severity') == 'HIGH']),
                "MEDIUM": len([a for a in recent_alerts if a.get('severity') == 'MEDIUM']),
                "LOW": len([a for a in recent_alerts if a.get('severity') == 'LOW'])
            },
            "by_type": {
                alert_type: len([a for a in recent_alerts if a.get('alert_type') == alert_type])
                for alert_type in set(a.get('alert_type') for a in recent_alerts)
            }
        }


# ==================== 便捷函数 ====================

def create_alert_system(config_path: str = "alert_config.json") -> AlertSystem:
    """创建告警系统实例"""
    return AlertSystem(config_path)


if __name__ == "__main__":
    # 测试告警系统
    logging.basicConfig(level=logging.INFO)

    alert_system = create_alert_system()

    # 测试内部人交易告警
    test_insider = {
        "date": "2026-01-25",
        "insider": "Elon Musk",
        "title": "CEO",
        "transaction": "Sale",
        "shares": 100000,
        "price": 450.00,
        "value": -45000000
    }

    alert = alert_system.check_insider_trading_alert(test_insider)
    if alert:
        print(f"触发告警: {alert['title']}")
        # alert_system.send_alert(alert)  # 取消注释以实际发送

    # 测试情绪指数告警
    alert = alert_system.check_sentiment_alert(
        current_score=7.5,
        previous_score=5.0,
        date="2026-01-25"
    )
    if alert:
        print(f"触发告警: {alert['title']}")

    print("\n告警系统测试完成！")
    print(f"配置文件已创建: {alert_system.config.config_path}")
