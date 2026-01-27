#!/bin/bash
# SEC Monitor 快速启动脚本

echo "=========================================="
echo "  SEC Filing Monitor - Quick Start"
echo "=========================================="
echo ""

# 检查Python版本
echo "[1/4] 检查Python版本..."
python3 --version

if [ $? -ne 0 ]; then
    echo "错误: 未找到Python3"
    exit 1
fi

# 安装依赖
echo ""
echo "[2/4] 安装依赖..."
pip3 install -q requests

# 创建必要目录
echo ""
echo "[3/4] 创建目录结构..."
mkdir -p data logs

# 运行测试
echo ""
echo "[4/4] 运行测试..."
echo ""
python3 test_sec_monitor.py

echo ""
echo "=========================================="
echo "  快速启动完成！"
echo "=========================================="
echo ""
echo "后续操作:"
echo "  1. 运行监控: python3 engines/sec_monitor.py"
echo "  2. 启动调度器: python3 scheduler.py"
echo "  3. 查看数据: sqlite3 data/sec_filings.db"
echo ""
