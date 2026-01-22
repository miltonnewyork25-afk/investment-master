"""
通知系统

支持多种通知渠道：
- Email (SMTP)
- Slack (Webhook)
- 本地日志
"""

import json
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

import sys
sys.path.insert(0, str(Path(__file__).parent.parent))
from config import NOTIFICATIONS, DATA_DIR


class Notifier:
    """通知管理器"""

    def __init__(self):
        self.config = NOTIFICATIONS
        self.enabled = self.config.get("enabled", False)
        self.logger = logging.getLogger(__name__)

        # 通知历史日志
        self.log_file = DATA_DIR / "notifications.log"

    def send_alerts(self, alerts: List[Dict]) -> Dict[str, bool]:
        """
        发送预警通知

        Args:
            alerts: 预警列表

        Returns:
            各渠道发送结果
        """
        if not alerts:
            return {"status": "no_alerts"}

        results = {
            "log": False,
            "email": False,
            "slack": False
        }

        # 构建消息
        message = self._build_message(alerts)

        # 1. 总是写入本地日志
        results["log"] = self._log_notification(alerts, message)

        if not self.enabled:
            self.logger.info("通知系统未启用，仅记录到本地日志")
            return results

        # 2. 发送邮件
        if self.config.get("email", {}).get("smtp_server"):
            results["email"] = self._send_email(message, alerts)

        # 3. 发送 Slack
        if self.config.get("slack", {}).get("webhook_url"):
            results["slack"] = self._send_slack(alerts)

        return results

    def _build_message(self, alerts: List[Dict]) -> str:
        """构建通知消息"""
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 按严重程度分组
        critical = [a for a in alerts if a.get("severity") == "critical"]
        warnings = [a for a in alerts if a.get("severity") == "warning"]
        info = [a for a in alerts if a.get("severity") == "info"]

        lines = [
            f"📊 投资 Agent 预警报告",
            f"时间: {now}",
            f"总计: {len(alerts)} 条预警",
            ""
        ]

        if critical:
            lines.append("🔴 严重预警:")
            for a in critical:
                lines.append(f"  • {a.get('message', 'Unknown')}")
            lines.append("")

        if warnings:
            lines.append("🟡 警告:")
            for a in warnings:
                lines.append(f"  • {a.get('message', 'Unknown')}")
            lines.append("")

        if info:
            lines.append("🔵 信息:")
            for a in info:
                lines.append(f"  • {a.get('message', 'Unknown')}")
            lines.append("")

        # 添加建议行动
        if critical:
            lines.extend([
                "📌 建议行动:",
                "  检查相关股票的最新评分和市场状况",
                "  考虑根据框架建议调整仓位"
            ])

        return "\n".join(lines)

    def _log_notification(self, alerts: List[Dict], message: str) -> bool:
        """记录到本地日志"""
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(f"\n{'='*60}\n")
                f.write(f"时间: {datetime.now().isoformat()}\n")
                f.write(f"预警数量: {len(alerts)}\n")
                f.write(f"{'='*60}\n")
                f.write(message)
                f.write("\n\n详细数据:\n")
                f.write(json.dumps(alerts, indent=2, ensure_ascii=False))
                f.write("\n")
            return True
        except Exception as e:
            self.logger.error(f"写入日志失败: {e}")
            return False

    def _send_email(self, message: str, alerts: List[Dict]) -> bool:
        """发送邮件通知"""
        email_config = self.config.get("email", {})

        if not all([
            email_config.get("smtp_server"),
            email_config.get("sender"),
            email_config.get("recipient"),
            email_config.get("password")
        ]):
            self.logger.warning("邮件配置不完整，跳过邮件发送")
            return False

        try:
            # 构建邮件
            msg = MIMEMultipart()
            msg["From"] = email_config["sender"]
            msg["To"] = email_config["recipient"]

            # 根据严重程度设置主题
            critical_count = sum(1 for a in alerts if a.get("severity") == "critical")
            if critical_count > 0:
                subject = f"[严重] 投资 Agent 预警 - {critical_count} 条严重预警"
            else:
                subject = f"[提醒] 投资 Agent 预警 - {len(alerts)} 条预警"

            msg["Subject"] = subject

            # HTML 内容
            html_body = self._build_html_email(alerts)
            msg.attach(MIMEText(html_body, "html", "utf-8"))

            # 发送
            with smtplib.SMTP(email_config["smtp_server"], email_config.get("smtp_port", 587)) as server:
                server.starttls()
                server.login(email_config["sender"], email_config["password"])
                server.send_message(msg)

            self.logger.info(f"邮件发送成功: {email_config['recipient']}")
            return True

        except Exception as e:
            self.logger.error(f"邮件发送失败: {e}")
            return False

    def _build_html_email(self, alerts: List[Dict]) -> str:
        """构建 HTML 邮件内容"""
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 按严重程度分组
        critical = [a for a in alerts if a.get("severity") == "critical"]
        warnings = [a for a in alerts if a.get("severity") == "warning"]
        info = [a for a in alerts if a.get("severity") == "info"]

        html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }}
                .header {{ background: #1a1a2e; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .critical {{ background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin: 10px 0; }}
                .warning {{ background: #fff8e1; border-left: 4px solid #ff9800; padding: 10px; margin: 10px 0; }}
                .info {{ background: #e3f2fd; border-left: 4px solid #2196f3; padding: 10px; margin: 10px 0; }}
                .footer {{ background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>📊 投资 Agent 预警报告</h2>
                <p>{now}</p>
            </div>
            <div class="content">
        """

        if critical:
            html += "<h3>🔴 严重预警</h3>"
            for a in critical:
                symbol = a.get("symbol", "")
                msg = a.get("message", "")
                html += f'<div class="critical"><strong>{symbol}</strong>: {msg}</div>'

        if warnings:
            html += "<h3>🟡 警告</h3>"
            for a in warnings:
                symbol = a.get("symbol", "")
                msg = a.get("message", "")
                html += f'<div class="warning"><strong>{symbol}</strong>: {msg}</div>'

        if info:
            html += "<h3>🔵 信息</h3>"
            for a in info:
                symbol = a.get("symbol", "")
                msg = a.get("message", "")
                html += f'<div class="info"><strong>{symbol}</strong>: {msg}</div>'

        html += """
            </div>
            <div class="footer">
                <p>由投资 Agent 自动生成</p>
                <p>请登录系统查看详细分析</p>
            </div>
        </body>
        </html>
        """

        return html

    def _send_slack(self, alerts: List[Dict]) -> bool:
        """发送 Slack 通知"""
        if not HAS_REQUESTS:
            self.logger.warning("requests 模块未安装，跳过 Slack 发送")
            return False

        webhook_url = self.config.get("slack", {}).get("webhook_url")
        if not webhook_url:
            return False

        try:
            # 构建 Slack 消息
            blocks = self._build_slack_blocks(alerts)

            response = requests.post(
                webhook_url,
                json={"blocks": blocks},
                timeout=10
            )
            response.raise_for_status()

            self.logger.info("Slack 通知发送成功")
            return True

        except Exception as e:
            self.logger.error(f"Slack 发送失败: {e}")
            return False

    def _build_slack_blocks(self, alerts: List[Dict]) -> List[Dict]:
        """构建 Slack Block Kit 消息"""
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 按严重程度分组
        critical = [a for a in alerts if a.get("severity") == "critical"]
        warnings = [a for a in alerts if a.get("severity") == "warning"]

        blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "📊 投资 Agent 预警报告"
                }
            },
            {
                "type": "context",
                "elements": [
                    {"type": "mrkdwn", "text": f"*时间:* {now}"},
                    {"type": "mrkdwn", "text": f"*预警数:* {len(alerts)}"}
                ]
            },
            {"type": "divider"}
        ]

        if critical:
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*🔴 严重预警*"
                }
            })
            for a in critical:
                blocks.append({
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"• *{a.get('symbol', '')}*: {a.get('message', '')}"
                    }
                })

        if warnings:
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*🟡 警告*"
                }
            })
            for a in warnings:
                blocks.append({
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"• *{a.get('symbol', '')}*: {a.get('message', '')}"
                    }
                })

        blocks.append({"type": "divider"})
        blocks.append({
            "type": "context",
            "elements": [
                {"type": "mrkdwn", "text": "_由投资 Agent 自动生成_"}
            ]
        })

        return blocks

    def send_daily_summary(self, score_data: Dict, alerts: List[Dict]) -> Dict[str, bool]:
        """
        发送每日摘要

        Args:
            score_data: 各股票评分数据
            alerts: 当日预警

        Returns:
            各渠道发送结果
        """
        message = self._build_daily_summary(score_data, alerts)

        results = {
            "log": self._log_notification(alerts or [], message),
            "email": False,
            "slack": False
        }

        if not self.enabled:
            return results

        # 发送邮件
        if self.config.get("email", {}).get("smtp_server"):
            results["email"] = self._send_daily_email(message, score_data)

        # 发送 Slack
        if self.config.get("slack", {}).get("webhook_url"):
            results["slack"] = self._send_daily_slack(score_data, alerts)

        return results

    def _build_daily_summary(self, score_data: Dict, alerts: List[Dict]) -> str:
        """构建每日摘要消息"""
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        lines = [
            f"📊 投资 Agent 每日摘要",
            f"时间: {now}",
            "",
            "📈 今日评分:",
            "-" * 40
        ]

        for symbol, data in score_data.items():
            score = data.get("final_score", "N/A")
            rating = data.get("rating", "N/A")
            recommendation = data.get("recommendation", "N/A")
            lines.append(f"  {symbol}: {score}分 ({rating}) - {recommendation}")

        if alerts:
            lines.extend([
                "",
                f"⚠️ 今日预警 ({len(alerts)} 条):",
                "-" * 40
            ])
            for a in alerts:
                severity_icon = {"critical": "🔴", "warning": "🟡", "info": "🔵"}.get(a.get("severity"), "⚪")
                lines.append(f"  {severity_icon} {a.get('message', '')}")

        return "\n".join(lines)

    def _send_daily_email(self, message: str, score_data: Dict) -> bool:
        """发送每日摘要邮件"""
        email_config = self.config.get("email", {})

        if not all([email_config.get("smtp_server"), email_config.get("sender")]):
            return False

        try:
            msg = MIMEMultipart()
            msg["From"] = email_config["sender"]
            msg["To"] = email_config["recipient"]
            msg["Subject"] = f"[每日摘要] 投资 Agent - {datetime.now().strftime('%Y-%m-%d')}"

            msg.attach(MIMEText(message, "plain", "utf-8"))

            with smtplib.SMTP(email_config["smtp_server"], email_config.get("smtp_port", 587)) as server:
                server.starttls()
                server.login(email_config["sender"], email_config["password"])
                server.send_message(msg)

            return True
        except Exception as e:
            self.logger.error(f"每日邮件发送失败: {e}")
            return False

    def _send_daily_slack(self, score_data: Dict, alerts: List[Dict]) -> bool:
        """发送每日摘要到 Slack"""
        if not HAS_REQUESTS:
            return False

        webhook_url = self.config.get("slack", {}).get("webhook_url")
        if not webhook_url:
            return False

        try:
            blocks = [
                {
                    "type": "header",
                    "text": {"type": "plain_text", "text": "📊 投资 Agent 每日摘要"}
                },
                {
                    "type": "context",
                    "elements": [
                        {"type": "mrkdwn", "text": f"*日期:* {datetime.now().strftime('%Y-%m-%d')}"}
                    ]
                },
                {"type": "divider"},
                {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": "*📈 今日评分*"}
                }
            ]

            # 添加评分
            score_text = ""
            for symbol, data in score_data.items():
                score = data.get("final_score", "N/A")
                rating = data.get("rating", "N/A")
                score_text += f"• *{symbol}*: {score}分 ({rating})\n"

            blocks.append({
                "type": "section",
                "text": {"type": "mrkdwn", "text": score_text}
            })

            if alerts:
                blocks.append({"type": "divider"})
                blocks.append({
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": f"*⚠️ 今日预警 ({len(alerts)} 条)*"}
                })

            response = requests.post(webhook_url, json={"blocks": blocks}, timeout=10)
            response.raise_for_status()
            return True

        except Exception as e:
            self.logger.error(f"每日 Slack 发送失败: {e}")
            return False


# 便捷函数
def notify(alerts: List[Dict]) -> Dict[str, bool]:
    """快捷发送通知"""
    notifier = Notifier()
    return notifier.send_alerts(alerts)


if __name__ == "__main__":
    # 测试通知
    test_alerts = [
        {
            "type": "sell_signal",
            "symbol": "LRCX",
            "severity": "critical",
            "message": "半导体卖出信号：顶部背离触发！"
        },
        {
            "type": "price_change",
            "symbol": "ZIM",
            "severity": "warning",
            "message": "ZIM 价格变动超过 5%"
        }
    ]

    notifier = Notifier()
    results = notifier.send_alerts(test_alerts)
    print(f"通知发送结果: {results}")
