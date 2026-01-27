#!/bin/bash
# IntelligenceEngine v10 - 快速启动脚本

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  IntelligenceEngine v10 启动脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}错误: 未找到Python 3${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Python版本: $(python3 --version)"

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}创建虚拟环境...${NC}"
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 检查依赖
if [ ! -f "venv/installed" ]; then
    echo -e "${YELLOW}安装依赖...${NC}"
    pip install -r requirements.txt -q
    touch venv/installed
fi

echo -e "${GREEN}✓${NC} 依赖已安装"

# 检查.env文件
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}警告: 未找到.env文件${NC}"
    echo -e "${YELLOW}复制.env.example为.env并配置API密钥${NC}"
    cp .env.example .env
fi

# 创建必要目录
mkdir -p data/reports/{daily,weekly,monthly}
mkdir -p logs

echo -e "${GREEN}✓${NC} 目录已创建"
echo ""

# 显示菜单
echo "请选择操作:"
echo "  1) 运行所有引擎一次"
echo "  2) 启动守护进程 (后台运行)"
echo "  3) 生成今日报告"
echo "  4) 查看系统状态"
echo "  5) 只运行SEC监控"
echo "  6) 只运行情绪追踪"
echo "  7) 退出"
echo ""

read -p "选择 [1-7]: " choice

case $choice in
    1)
        echo -e "${GREEN}运行所有引擎...${NC}"
        python main.py
        ;;
    2)
        echo -e "${GREEN}启动守护进程...${NC}"
        nohup python main.py --daemon > logs/daemon.log 2>&1 &
        echo -e "${GREEN}✓${NC} 守护进程已启动 (PID: $!)"
        echo "查看日志: tail -f logs/intelligence_engine.log"
        ;;
    3)
        echo -e "${GREEN}生成今日报告...${NC}"
        python main.py --report daily
        ;;
    4)
        echo -e "${GREEN}系统状态:${NC}"
        python main.py --status
        ;;
    5)
        echo -e "${GREEN}运行SEC监控...${NC}"
        python main.py --engine sec
        ;;
    6)
        echo -e "${GREEN}运行情绪追踪...${NC}"
        python main.py --engine sentiment
        ;;
    7)
        echo -e "${YELLOW}退出${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}无效选择${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}完成!${NC}"
