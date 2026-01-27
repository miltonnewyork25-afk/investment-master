#!/bin/bash
# 数据质量监控系统启动脚本

echo "================================================================================"
echo "📊 数据质量监控系统 v2.0"
echo "================================================================================"
echo ""
echo "监控目录: /Users/milton/投资大师"
echo "仪表盘: Quality_Dashboard.md"
echo "修正建议: Auto_Fix_Suggestions.md"
echo "告警日志: Data_Quality_Alerts.log"
echo ""
echo "================================================================================"
echo ""

# 检查Python和依赖
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: python3 未安装"
    exit 1
fi

if ! python3 -c "import watchdog" 2>/dev/null; then
    echo "⚠️ watchdog未安装，正在安装..."
    pip3 install watchdog
fi

echo "✅ 环境检查通过"
echo ""
echo "开始实时监控..."
echo "按 Ctrl+C 停止"
echo ""
echo "================================================================================"
echo ""

# 启动监控
cd /Users/milton/投资大师
python3 data_integrity_monitor_v2.0.py --watch --auto-update-dashboard
