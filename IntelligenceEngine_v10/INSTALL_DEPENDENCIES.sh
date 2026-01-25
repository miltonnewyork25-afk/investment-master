#!/bin/bash
# 安装Social Sentiment Tracker所需的依赖包

echo "=============================================="
echo "  安装 Social Sentiment Tracker 依赖包"
echo "=============================================="
echo ""

# 检查pip
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 未找到，请先安装Python3"
    exit 1
fi

echo "📦 开始安装必需依赖..."
echo ""

# 核心依赖（必需）
echo "[1/4] 安装 Reddit API 客户端 (praw)..."
pip3 install praw>=7.7.0

echo ""
echo "[2/4] 安装情感分析库 (vaderSentiment)..."
pip3 install vaderSentiment>=3.3.2

echo ""
echo "[3/4] 安装数据处理库 (pandas)..."
pip3 install pandas>=2.0.0

echo ""
echo "[4/4] 安装数值计算库 (numpy)..."
pip3 install numpy>=1.24.0

echo ""
echo "=============================================="
echo "✅ 核心依赖安装完成！"
echo "=============================================="
echo ""

# 测试安装
echo "🧪 测试安装..."
python3 << 'EOF'
try:
    import praw
    print("  ✓ praw")
except ImportError:
    print("  ✗ praw 安装失败")

try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    print("  ✓ vaderSentiment")
except ImportError:
    print("  ✗ vaderSentiment 安装失败")

try:
    import pandas
    print("  ✓ pandas")
except ImportError:
    print("  ✗ pandas 安装失败")

try:
    import numpy
    print("  ✓ numpy")
except ImportError:
    print("  ✗ numpy 安装失败")
EOF

echo ""
echo "=============================================="
echo "下一步："
echo "1. 生成示例数据: cd engines && python3 generate_sample_data.py"
echo "2. 运行测试: python3 test_with_sample_data.py"
echo "3. 配置Reddit API: 编辑 config/sentiment_config.json"
echo "=============================================="
