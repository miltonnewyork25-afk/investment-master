#!/bin/bash

# Options Decoder Installation Script
# ====================================

echo "📦 安装 Options Market Intelligence Decoder 依赖..."
echo ""

# 检测 Python 版本
if command -v python3 &> /dev/null; then
    PYTHON_CMD=python3
    PIP_CMD=pip3
elif command -v python &> /dev/null; then
    PYTHON_CMD=python
    PIP_CMD=pip
else
    echo "❌ 错误: 未找到 Python! 请先安装 Python 3.8+"
    exit 1
fi

echo "✓ 检测到 Python: $($PYTHON_CMD --version)"
echo ""

# 安装依赖
echo "正在安装依赖包..."
$PIP_CMD install -r requirements.txt

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 依赖安装成功!"
    echo ""
    echo "运行测试:"
    echo "  $PYTHON_CMD options_decoder.py"
    echo ""
else
    echo ""
    echo "❌ 依赖安装失败! 请检查错误信息"
    exit 1
fi
