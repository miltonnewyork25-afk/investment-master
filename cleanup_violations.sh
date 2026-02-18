#!/bin/bash
# 清理Complete报告中违背逆向分析原则的内容

REPORT_FILE="reports/AMZN/AMZN_Complete_v1.0_2026-02-18.md"

echo "开始清理违背原则的内容..."

# 1. 清理仓位配置建议
sed -i '' 's/建议配置比例：[0-9%-]*//g' "$REPORT_FILE"
sed -i '' 's/- 建议配置比例.*//g' "$REPORT_FILE"

# 2. 清理目标价和投资建议
sed -i '' 's/目标价值区间应在传统DCF基础上增加25-35%的生态溢价。/当前价格隐含的生态溢价假设需要持续验证。/g' "$REPORT_FILE"
sed -i '' 's/目标价: \$[0-9,]*\/股//g' "$REPORT_FILE"
sed -i '' 's/目标价\$[0-9,]*\/股//g' "$REPORT_FILE"
sed -i '' 's/本分析目标价.*//g' "$REPORT_FILE"

# 3. 清理投资建议
sed -i '' 's/建议长期持有/从逆向分析角度看/g' "$REPORT_FILE"
sed -i '' 's/最终投资建议/逆向分析结论/g' "$REPORT_FILE"

# 4. 清理数字评分格式
sed -i '' 's/评分[0-9]*\/100/定性评估/g' "$REPORT_FILE"
sed -i '' 's/基础评分[0-9]*\/100/基础评估/g' "$REPORT_FILE"

# 5. 清理其他违背表述
sed -i '' 's/定期调仓触发.*//g' "$REPORT_FILE"
sed -i '' 's/资本配置机会价值/资本配置效率分析/g' "$REPORT_FILE"

echo "清理完成。正在验证..."

# 验证清理结果
VIOLATIONS=$(grep -c "建议配置\|目标价\$\|/100\|建议.*持有" "$REPORT_FILE" || echo "0")
echo "剩余违背内容: $VIOLATIONS 处"

if [ "$VIOLATIONS" -eq 0 ]; then
    echo "✅ 所有违背内容已清理完毕"
else
    echo "⚠️ 仍有违背内容需要手动处理"
    grep -n "建议配置\|目标价\$\|/100\|建议.*持有" "$REPORT_FILE" | head -5
fi