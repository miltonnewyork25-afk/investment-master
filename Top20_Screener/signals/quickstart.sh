#!/bin/bash
# SEC信号侦测系统 - 快速启动脚本
# 用法: ./quickstart.sh

echo "========================================"
echo "SEC信号侦测系统 - 快速启动"
echo "========================================"
echo ""

# 检查Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到python3"
    echo "请先安装Python 3.8或更高版本"
    exit 1
fi

echo "✓ Python版本: $(python3 --version)"

# 检查requests库
if ! python3 -c "import requests" 2> /dev/null; then
    echo "⚠️  未安装requests库，正在安装..."
    pip3 install requests
    if [ $? -ne 0 ]; then
        echo "❌ 安装失败，请手动运行：pip3 install requests"
        exit 1
    fi
    echo "✓ requests库已安装"
else
    echo "✓ requests库已安装"
fi

echo ""
echo "========================================"
echo "开始运行测试..."
echo "========================================"
echo ""

# 运行测试脚本
python3 test_run.py

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo ""
    echo "✓ 运行成功！"
    echo ""
    echo "查看结果："
    echo "  open sec_combined_signals.csv"
    echo ""
else
    echo ""
    echo "❌ 运行失败（退出码: $exit_code）"
    echo "请查看错误信息，或参考README.md的故障排除章节"
    echo ""
fi

exit $exit_code
