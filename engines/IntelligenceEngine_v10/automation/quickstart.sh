#!/bin/bash

# Tesla Intelligence Engine - 快速启动脚本
# 用于快速部署和测试系统

set -e

echo "=================================================="
echo "Tesla Intelligence Engine - 快速启动向导"
echo "=================================================="
echo ""

# 检查Python版本
echo "1. 检查Python环境..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "   Python版本: $python_version"

# 检查pip
if ! command -v pip3 &> /dev/null; then
    echo "   ❌ pip3 未安装，请先安装pip"
    exit 1
fi
echo "   ✓ pip3 已安装"

# 安装依赖
echo ""
echo "2. 安装依赖包..."
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt -q
    echo "   ✓ 依赖安装完成"
else
    echo "   ❌ requirements.txt 不存在"
    exit 1
fi

# 创建必要目录
echo ""
echo "3. 创建工作目录..."
mkdir -p reports
mkdir -p reports/charts
mkdir -p data
mkdir -p logs
echo "   ✓ 目录创建完成"

# 检查配置文件
echo ""
echo "4. 检查配置文件..."
if [ ! -f "scheduler_config.json" ]; then
    echo "   ⚠️  scheduler_config.json 不存在，将在首次运行时自动生成"
fi
if [ ! -f "alert_config.json" ]; then
    echo "   ⚠️  alert_config.json 不存在，将在首次运行时自动生成"
fi

# 初始化数据库
echo ""
echo "5. 初始化数据库..."
python3 -c "from database import get_db; db = get_db('tesla_intelligence.db'); db.close(); print('   ✓ 数据库初始化完成')"

# 测试运行
echo ""
echo "6. 运行测试..."
echo "   选择测试模式:"
echo "   [1] 运行所有引擎一次（推荐首次测试）"
echo "   [2] 仅生成每日报告"
echo "   [3] 查看调度器状态"
echo "   [4] 启动持续调度（生产模式）"
echo "   [5] 跳过测试"
echo ""
read -p "   请选择 [1-5]: " choice

case $choice in
    1)
        echo ""
        echo "   运行所有引擎..."
        python3 scheduler.py --once
        echo ""
        echo "   ✓ 测试完成！请检查 reports/ 目录中的报告"
        ;;
    2)
        echo ""
        echo "   生成每日报告..."
        python3 scheduler.py --daily-report
        echo ""
        echo "   ✓ 报告生成完成！请检查 reports/ 目录"
        ;;
    3)
        echo ""
        python3 scheduler.py --status
        ;;
    4)
        echo ""
        echo "   启动调度器..."
        echo "   按 Ctrl+C 停止"
        echo ""
        python3 scheduler.py
        ;;
    5)
        echo "   跳过测试"
        ;;
    *)
        echo "   无效选择"
        ;;
esac

echo ""
echo "=================================================="
echo "设置完成！"
echo "=================================================="
echo ""
echo "文件结构:"
echo "  scheduler.py         - 调度器主程序"
echo "  database.py          - 数据库管理"
echo "  alert_system.py      - 告警系统"
echo "  report_generator.py  - 报告生成器"
echo "  scheduler_config.json - 调度配置"
echo "  alert_config.json     - 告警配置"
echo "  reports/             - 报告输出目录"
echo "  tesla_intelligence.db - 数据库文件"
echo ""
echo "常用命令:"
echo "  python3 scheduler.py              # 启动调度器"
echo "  python3 scheduler.py --once       # 运行一次所有引擎"
echo "  python3 scheduler.py --daily-report  # 生成每日报告"
echo "  python3 scheduler.py --status     # 查看状态"
echo ""
echo "详细文档请参考: README_AUTOMATION.md"
echo ""
