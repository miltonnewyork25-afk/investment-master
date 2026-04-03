#!/usr/bin/env python3
'''
Harness Import Setup Helper
==========================

设置Python路径以便导入harness模块
在Claude分析脚本开头调用此文件
'''

import sys
import os
from pathlib import Path

# 添加.claude目录到Python路径
framework_root = Path(__file__).parent
claude_dir = framework_root / ".claude"

if str(claude_dir) not in sys.path:
    sys.path.insert(0, str(claude_dir))

# 验证harness可以导入
try:
    from harness import create_investment_harness
    print("✅ Harness system ready for import")
except ImportError as e:
    print(f"❌ Harness import failed: {e}")
    print("Please check harness installation")
    print(f"Trying to import from: {claude_dir}")

# 便捷函数
def quick_harness_check():
    '''快速检查harness系统状态'''
    try:
        from harness.config import load_config, validate_config

        config = load_config("production_standard")
        warnings = validate_config(config)

        if warnings:
            print("⚠️ Configuration warnings:")
            for warning in warnings:
                print(f"  - {warning}")
        else:
            print("✅ Harness configuration valid")

        return len(warnings) == 0
    except Exception as e:
        print(f"❌ Harness check failed: {e}")
        return False

# 为方便使用，提供直接访问函数
def get_harness(ticker: str, tier: str = "tier_2_standard"):
    """获取harness实例"""
    try:
        from harness import create_investment_harness
        return create_investment_harness(ticker, tier)
    except ImportError as e:
        print(f"❌ Failed to create harness: {e}")
        return None

if __name__ == "__main__":
    quick_harness_check()