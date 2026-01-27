"""
配置验证模块
"""

import os
import logging


def validate_config(config: dict):
    """
    验证配置文件

    Args:
        config: 配置字典

    Raises:
        ValueError: 配置无效
    """
    logger = logging.getLogger('utils.validators')

    # 检查必需字段
    required_fields = ['company', 'engines', 'database']
    for field in required_fields:
        if field not in config:
            raise ValueError(f"配置缺少必需字段: {field}")

    # 检查公司信息
    company = config['company']
    if 'ticker' not in company:
        raise ValueError("公司配置缺少ticker")

    logger.info("配置验证通过")


def check_api_keys(api_keys_config: dict):
    """
    检查API密钥是否配置

    Args:
        api_keys_config: API密钥配置

    Raises:
        Warning: 缺少推荐的API密钥
    """
    logger = logging.getLogger('utils.validators')

    # 必需的API密钥
    required_keys = []

    # 推荐的API密钥
    recommended_keys = ['SEC_API_KEY', 'REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET']

    missing_recommended = []
    for key_env in recommended_keys:
        if not os.getenv(key_env):
            missing_recommended.append(key_env)

    if missing_recommended:
        logger.warning(f"缺少推荐的API密钥: {', '.join(missing_recommended)}")
        logger.warning("部分功能可能无法使用")
    else:
        logger.info("所有推荐API密钥已配置")
