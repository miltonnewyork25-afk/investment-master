"""
配置文件生成脚本
用于交互式生成 scheduler_config.json 和 alert_config.json
"""

import json
from pathlib import Path


def create_scheduler_config():
    """创建调度器配置"""
    print("\n=== 调度器配置 ===\n")

    ticker = input("目标股票代码 [TSLA]: ").strip() or "TSLA"

    config = {
        "version": "1.0",
        "enabled": True,
        "ticker": ticker,
        "timezone": "America/New_York",
        "database": {
            "path": "tesla_intelligence.db",
            "cleanup_days": 365
        },
        "alert_config_path": "alert_config.json",
        "reports": {
            "output_dir": "reports",
            "daily_enabled": True,
            "weekly_enabled": True
        },
        "engines": {
            "insider_trading": {
                "enabled": True,
                "schedule": "0 9,16 * * 1-5",
                "retry_attempts": 3,
                "retry_delay": 300
            },
            "options_unusual": {
                "enabled": True,
                "schedule": "*/30 9-16 * * 1-5",
                "retry_attempts": 3,
                "retry_delay": 300
            },
            "sentiment": {
                "enabled": True,
                "schedule": "0 */4 * * *",
                "retry_attempts": 2,
                "retry_delay": 600
            },
            "supply_chain": {
                "enabled": True,
                "schedule": "0 10 * * 1-5",
                "retry_attempts": 2,
                "retry_delay": 600
            },
            "short_interest": {
                "enabled": True,
                "schedule": "0 17 * * 2,5",
                "retry_attempts": 2,
                "retry_delay": 600
            },
            "dark_pool": {
                "enabled": True,
                "schedule": "0 18 * * 1-5",
                "retry_attempts": 2,
                "retry_delay": 300
            }
        },
        "tasks": {
            "daily_report": {
                "enabled": True,
                "schedule": "0 19 * * 1-5"
            },
            "weekly_report": {
                "enabled": True,
                "schedule": "0 10 * * 6"
            },
            "database_cleanup": {
                "enabled": True,
                "schedule": "0 2 1 * *"
            }
        }
    }

    with open("scheduler_config.json", "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

    print("✓ scheduler_config.json 已创建")
    return config


def create_alert_config():
    """创建告警配置"""
    print("\n=== 告警配置 ===\n")

    # Email 配置
    print("邮件告警配置:")
    email_enabled = input("  启用邮件告警? [y/N]: ").lower() == 'y'

    email_config = {
        "enabled": email_enabled,
        "smtp_host": "smtp.gmail.com",
        "smtp_port": 587,
        "sender": "your_email@gmail.com",
        "password": "your_app_password",
        "recipients": ["recipient@example.com"]
    }

    if email_enabled:
        email_config["sender"] = input("  发件人邮箱: ").strip()
        email_config["password"] = input("  邮箱密码/应用专用密码: ").strip()
        recipients = input("  收件人邮箱 (多个用逗号分隔): ").strip()
        email_config["recipients"] = [r.strip() for r in recipients.split(",")]

    # Slack 配置
    print("\nSlack告警配置:")
    slack_enabled = input("  启用Slack告警? [y/N]: ").lower() == 'y'

    slack_config = {
        "enabled": slack_enabled,
        "webhook_url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
    }

    if slack_enabled:
        slack_config["webhook_url"] = input("  Webhook URL: ").strip()

    # Telegram 配置
    print("\nTelegram告警配置:")
    telegram_enabled = input("  启用Telegram告警? [y/N]: ").lower() == 'y'

    telegram_config = {
        "enabled": telegram_enabled,
        "bot_token": "YOUR_BOT_TOKEN",
        "chat_id": "YOUR_CHAT_ID"
    }

    if telegram_enabled:
        telegram_config["bot_token"] = input("  Bot Token: ").strip()
        telegram_config["chat_id"] = input("  Chat ID: ").strip()

    # 告警规则
    config = {
        "enabled": True,
        "channels": {
            "email": email_config,
            "slack": slack_config,
            "telegram": telegram_config
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

    with open("alert_config.json", "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

    print("✓ alert_config.json 已创建")
    return config


def main():
    print("=" * 60)
    print("Tesla Intelligence Engine - 配置生成向导")
    print("=" * 60)

    # 检查是否已存在配置文件
    if Path("scheduler_config.json").exists():
        overwrite = input("\nscheduler_config.json 已存在，是否覆盖? [y/N]: ").lower() == 'y'
        if not overwrite:
            print("跳过调度器配置")
        else:
            create_scheduler_config()
    else:
        create_scheduler_config()

    if Path("alert_config.json").exists():
        overwrite = input("\nalert_config.json 已存在，是否覆盖? [y/N]: ").lower() == 'y'
        if not overwrite:
            print("跳过告警配置")
        else:
            create_alert_config()
    else:
        create_alert_config()

    print("\n" + "=" * 60)
    print("配置完成！")
    print("=" * 60)
    print("\n下一步:")
    print("1. 根据需要编辑配置文件")
    print("2. 运行: python scheduler.py --once (测试)")
    print("3. 运行: python scheduler.py (启动调度器)")
    print("\n详细文档: README_AUTOMATION.md")


if __name__ == "__main__":
    main()
