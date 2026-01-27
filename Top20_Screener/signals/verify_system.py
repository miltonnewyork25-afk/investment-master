#!/usr/bin/env python3
"""
SEC信号侦测系统 - 系统验证脚本
验证所有组件是否正确安装和配置
"""

import sys
from pathlib import Path

def check_files():
    """检查必需文件是否存在"""
    print("1. 检查文件完整性...")

    required_files = {
        'sec_scraper.py': '核心爬虫',
        'institutional_analyzer.py': '机构分析器',
        'sec_signal_engine.py': '综合引擎',
        'config.py': '配置文件',
        'test_run.py': '测试脚本',
        'README.md': '用户指南',
        'sec_signal_methodology.md': '方法论',
        'PROJECT_SUMMARY.md': '项目总结'
    }

    missing = []
    for filename, description in required_files.items():
        if Path(filename).exists():
            print(f"   ✓ {filename:<35} ({description})")
        else:
            print(f"   ✗ {filename:<35} 缺失！")
            missing.append(filename)

    if missing:
        print(f"\n❌ 缺少 {len(missing)} 个文件")
        return False
    else:
        print(f"\n✓ 所有必需文件存在（{len(required_files)}个）")
        return True


def check_python_version():
    """检查Python版本"""
    print("\n2. 检查Python版本...")

    version = sys.version_info
    version_str = f"{version.major}.{version.minor}.{version.micro}"

    if version.major >= 3 and version.minor >= 8:
        print(f"   ✓ Python {version_str} (满足要求 ≥3.8)")
        return True
    else:
        print(f"   ✗ Python {version_str} (需要 ≥3.8)")
        return False


def check_dependencies():
    """检查依赖库"""
    print("\n3. 检查依赖库...")

    try:
        import requests
        version = requests.__version__
        print(f"   ✓ requests {version}")
        return True
    except ImportError:
        print(f"   ✗ requests 未安装")
        print(f"      请运行: pip3 install requests")
        return False


def check_imports():
    """检查模块导入"""
    print("\n4. 检查模块导入...")

    modules = {
        'sec_scraper': ['SECClient', 'InsiderTradingAnalyzer'],
        'institutional_analyzer': ['InstitutionalHoldingsAnalyzer'],
        'sec_signal_engine': ['Form13DAnalyzer', 'SECSignalEngine'],
        'config': []
    }

    all_ok = True
    for module_name, classes in modules.items():
        try:
            module = __import__(module_name)

            if classes:
                for cls in classes:
                    if hasattr(module, cls):
                        print(f"   ✓ {module_name}.{cls}")
                    else:
                        print(f"   ✗ {module_name}.{cls} 未找到")
                        all_ok = False
            else:
                print(f"   ✓ {module_name}")

        except ImportError as e:
            print(f"   ✗ {module_name} 导入失败: {e}")
            all_ok = False

    return all_ok


def check_config():
    """检查配置"""
    print("\n5. 检查配置...")

    try:
        import config

        # 检查权重总和
        weight_sum = sum(config.SIGNAL_WEIGHTS.values())
        if weight_sum == 100:
            print(f"   ✓ 信号权重总和: {weight_sum}%")
        else:
            print(f"   ✗ 信号权重总和: {weight_sum}%（应为100%）")
            return False

        # 检查速率限制
        if config.SEC_RATE_LIMIT >= 0.1:
            print(f"   ✓ 速率限制: {config.SEC_RATE_LIMIT}s/req ({1/config.SEC_RATE_LIMIT:.1f} req/s)")
        else:
            print(f"   ⚠️  速率限制: {config.SEC_RATE_LIMIT}s/req（可能超过SEC限制）")

        # 检查机构数量
        inst_count = len(config.INSTITUTIONAL_ANALYSIS['famous_institutions'])
        print(f"   ✓ 追踪机构数量: {inst_count}")

        # 运行配置验证
        if config.validate_config():
            print(f"   ✓ 配置验证通过")
            return True
        else:
            print(f"   ✗ 配置验证失败")
            return False

    except Exception as e:
        print(f"   ✗ 配置检查失败: {e}")
        return False


def check_executables():
    """检查可执行权限"""
    print("\n6. 检查可执行权限...")

    import os

    executables = ['quickstart.sh']
    all_ok = True

    for filename in executables:
        if Path(filename).exists():
            if os.access(filename, os.X_OK):
                print(f"   ✓ {filename} 可执行")
            else:
                print(f"   ⚠️  {filename} 不可执行（运行: chmod +x {filename}）")
                all_ok = False
        else:
            print(f"   - {filename} 不存在（可选）")

    return all_ok


def test_basic_functionality():
    """测试基本功能"""
    print("\n7. 测试基本功能...")

    try:
        from sec_scraper import SECClient

        client = SECClient(user_agent="System Verification Script test@example.com")

        # 测试CIK查询
        cik = client.get_cik('AAPL')
        if cik == '0000320193':
            print(f"   ✓ CIK查询正常（AAPL → {cik}）")
            return True
        else:
            print(f"   ⚠️  CIK查询异常（AAPL → {cik}，预期0000320193）")
            return False

    except Exception as e:
        print(f"   ✗ 功能测试失败: {e}")
        return False


def main():
    """主验证流程"""
    print("=" * 70)
    print("SEC信号侦测系统 - 系统验证")
    print("=" * 70)
    print()

    results = []

    # 运行所有检查
    results.append(("文件完整性", check_files()))
    results.append(("Python版本", check_python_version()))
    results.append(("依赖库", check_dependencies()))
    results.append(("模块导入", check_imports()))
    results.append(("配置验证", check_config()))
    results.append(("可执行权限", check_executables()))
    results.append(("基本功能", test_basic_functionality()))

    # 总结
    print("\n" + "=" * 70)
    print("验证总结")
    print("=" * 70)

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for check_name, result in results:
        status = "✓ 通过" if result else "✗ 失败"
        print(f"  {check_name:<20} {status}")

    print()
    print(f"通过: {passed}/{total} 项检查")

    if passed == total:
        print()
        print("🎉 系统验证通过！所有组件正常工作。")
        print()
        print("下一步：")
        print("  1. 运行测试：python3 test_run.py")
        print("  2. 或使用：./quickstart.sh")
        print()
        return 0
    else:
        print()
        print("⚠️  部分检查未通过，请修复上述问题。")
        print()
        print("常见问题解决：")
        print("  - 依赖缺失：pip3 install requests")
        print("  - 文件缺失：确认在正确目录（signals/）")
        print("  - 权限问题：chmod +x quickstart.sh")
        print()
        return 1


if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)
