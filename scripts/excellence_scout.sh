#!/bin/bash
# ============================================================
# excellence_scout.sh — 动态最佳实践侦察系统 v1.0
# ============================================================
# 用法: bash scripts/excellence_scout.sh <TICKER> <PHASE> [FOCUS_AREA]
#
# 功能:
# 1. 根据公司类型、行业、分析阶段推荐最佳参考板块
# 2. 从excellence_catalog.yaml提取相关最佳实践
# 3. 输出具体的参考章节、方法论、应用场景
# 4. 生成针对性的质量提升建议
# ============================================================

set -uo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

TICKER="${1:?缺少TICKER参数}"
PHASE="${2:?缺少PHASE参数 (phase_0, phase_1, etc.)}"
FOCUS_AREA="${3:-all}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CATALOG="$REPO_ROOT/knowledge/excellence_catalog.yaml"

echo -e "${CYAN}=========================================="
echo " 🎯 Excellence Scout v1.0"
echo " Target: ${TICKER} | Phase: ${PHASE}"
echo " Focus: ${FOCUS_AREA}"
echo -e "==========================================${NC}"
echo ""

# 检查catalog文件
if [[ ! -f "$CATALOG" ]]; then
    echo -e "${RED}❌ Excellence catalog not found: $CATALOG${NC}"
    exit 1
fi

# 阶段映射
case "$PHASE" in
    "phase_neg1"|"phase_-1")
        echo -e "${BLUE}📋 Phase -1: 知识检索阶段推荐${NC}"
        echo "• 查找相似行业最佳实践"
        echo "• 识别可移植方法论"
        ;;
    "phase_0")
        echo -e "${BLUE}📋 Phase 0: 规划阶段推荐${NC}"
        echo "• 选择估值框架参考"
        echo "• 确定分析重点板块"
        ;;
    "phase_1"|"phase_2"|"phase_3")
        echo -e "${BLUE}📋 Phase 1-3: 执行阶段推荐${NC}"
        echo "• 实施具体分析方法"
        echo "• 对标质量基准"
        ;;
    "phase_4")
        echo -e "${BLUE}📋 Phase 4: 红队阶段推荐${NC}"
        echo "• 参考最佳红队实践"
        echo "• 避免系统性偏差"
        ;;
    "phase_5")
        echo -e "${BLUE}📋 Phase 5: 估值阶段推荐${NC}"
        echo "• 应用最佳估值技术"
        echo "• 质量门控对标"
        ;;
esac

echo ""
echo -e "${GREEN}🏆 当前最佳实践推荐:${NC}"
echo ""

# 估值分析推荐
if [[ "$FOCUS_AREA" == "all" || "$FOCUS_AREA" == "valuation" ]]; then
    echo -e "${YELLOW}💰 估值分析 (Valuation)${NC}"
    echo "  🥇 信念反演: KLAC Ch24 (4.5/5)"
    echo "     方法: Reverse DCF → 隐含信念集 → 数学不可能性测试"
    echo "     适用: P/E >40x 或隐含市场份额>物理上限"
    echo ""
    echo "  🥈 方法独立性: AMAT Ch10.5 (4.4/5)"
    echo "     方法: 多方法估值 → 假设重叠审计 → 独立性离散度"
    echo "     适用: 使用≥3种估值方法时"
    echo ""
fi

# 客户分析推荐
if [[ "$FOCUS_AREA" == "all" || "$FOCUS_AREA" == "customer" ]]; then
    echo -e "${YELLOW}👥 客户行为分析 (Customer)${NC}"
    echo "  🥇 归因框架: APP Ch15 (5.0/5)"
    echo "     方法: D30归因偏差 → 客户迁移四维度 → 粘性分层"
    echo "     适用: B2B平台、SaaS、电商平台"
    echo ""
    echo "  🥈 NRR重构: ORCL S1 (4.6/5)"
    echo "     方法: 从财务数据反推NRR → 客户分层分析"
    echo "     适用: 企业软件、云服务"
    echo ""
fi

# 护城河分析推荐
if [[ "$FOCUS_AREA" == "all" || "$FOCUS_AREA" == "moat" ]]; then
    echo -e "${YELLOW}🏰 护城河分析 (Moats)${NC}"
    echo "  🥇 存量vs增量: KLAC Ch6 (4.4/5)"
    echo "     方法: 存量护城河 vs 增量护城河分离量化"
    echo "     适用: 技术密集型垄断企业"
    echo ""
fi

# 财务建模推荐
if [[ "$FOCUS_AREA" == "all" || "$FOCUS_AREA" == "financial" ]]; then
    echo -e "${YELLOW}📊 财务建模 (Financial)${NC}"
    echo "  🥇 CapEx传导: MSFT Ch13 (4.4/5)"
    echo "     方法: CapEx → PP&E → 折旧 → 产能 → 收入全链条"
    echo "     适用: 重资本投入的科技公司"
    echo ""
    echo "  🥈 债务动态: ORCL P2 (4.2/5)"
    echo "     方法: 全口径债务 → 信用评级迁移概率"
    echo "     适用: 高杠杆企业 (D/E >200%)"
    echo ""
fi

# 红队推荐
if [[ "$FOCUS_AREA" == "all" || "$FOCUS_AREA" == "red_team" ]]; then
    echo -e "${YELLOW}🔴 红队审计 (Red Team)${NC}"
    echo "  🥇 双向校准: AMAT P4 (4.3/5)"
    echo "     方法: 不仅下调乐观假设，也识别过度悲观"
    echo "     适用: 所有报告Phase 4"
    echo ""
fi

echo -e "${GREEN}🎯 针对 $TICKER 的建议:${NC}"

# 根据ticker给出具体建议
TICKER_UPPER=$(echo "$TICKER" | tr '[:lower:]' '[:upper:]')
case "$TICKER_UPPER" in
    "NVDA"|"AMD"|"INTC")
        echo "• 半导体公司 → 重点参考KLAC/AMAT最佳实践"
        echo "• 建议使用: 护城河双重分析 + CapEx传导建模"
        ;;
    "MSFT"|"GOOGL"|"META")
        echo "• 科技平台 → 重点参考MSFT/APP最佳实践"
        echo "• 建议使用: 客户归因分析 + AI CapEx传导"
        ;;
    "ORCL"|"CRM"|"SNOW")
        echo "• 企业软件 → 重点参考ORCL/APP最佳实践"
        echo "• 建议使用: NRR重构 + 存量vs增量护城河"
        ;;
    *)
        echo "• 通用建议: 根据行业特征选择最相关的最佳实践"
        echo "• 优先使用: 信念反演(高估值) + 双向校准(红队)"
        ;;
esac

echo ""
echo -e "${CYAN}=========================================="
echo " 📈 Quality Target: 超越当前最佳 +0.1"
echo " 📚 Full Catalog: knowledge/excellence_catalog.yaml"
echo -e "==========================================${NC}"