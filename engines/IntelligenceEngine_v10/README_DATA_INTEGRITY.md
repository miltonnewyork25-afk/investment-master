# 数据真实性监测工具使用指南

## 概述

本工具用于自动检测投资研究报告中的数据质量问题，包括:
- 识别未标注来源的数据
- 检测可疑的"实时监控"声明
- 统计各类数据占比
- 生成质量评分报告

## 快速开始

### 1. 检查单个文件

```bash
python3 data_integrity_monitor.py Tesla_Competition_Analysis_2026.md
```

输出示例:
```
================================================================================
数据质量报告: Tesla_Competition_Analysis_2026.md
================================================================================

📊 数据统计
  总数据点: 662
  ✅ 可验证: 0 (0.0%)
  📊 估算: 12 (1.8%)
  ⚠️ 示例: 3 (0.5%)
  ❌ 未验证: 647 (97.7%)

🎯 质量评分: 1.2/100
   评级: 🔴 不合格

⚠️ 主要问题 (52个)
  1. ❌ 行14: '利润' 数据缺少来源标注
  2. ❌ 行20: '毛利率' 数据缺少来源标注
  ...
```

### 2. 批量扫描目录

```bash
python3 data_integrity_monitor.py --dir /Users/milton/投资大师/IntelligenceEngine_v10
```

会扫描目录下所有`.md`文件并生成:
- 每个文件的独立质量报告
- JSON格式的详细报告（用于程序化分析）
- 汇总统计

### 3. 查看JSON报告

```bash
cat Tesla_Competition_Analysis_2026_quality_report.json | python3 -m json.tool | head -50
```

JSON报告包含:
- 每个数据点的详细信息（行号、类型、置信度）
- 完整的问题列表
- 改进建议

## 评分标准

### 质量评分计算公式

```
质量评分 = (
    可验证数据 × 100 +
    估算数据 × 60 +
    示例数据 × 20 +
    未验证数据 × 0
) / 总数据点数
```

### 评级体系

| 评分范围 | 评级 | 说明 |
|---------|------|------|
| 80-100 | 🟢 优秀 | 可直接发布 |
| 60-79 | 🟡 良好 | 需要小幅改进 |
| 40-59 | 🟠 及格 | 需要大幅改进 |
| 0-39 | 🔴 不合格 | 禁止发布，需全面修订 |

### 数据置信度计算

每个数据点的置信度(0-100%)基于:

| 因素 | 加/减分 |
|------|---------|
| 标注为VERIFIED | +30 |
| 标注为ESTIMATED | +10 |
| 标注为SAMPLE | -20 |
| 标注为UNVERIFIED | -40 |
| 有来源标注 | +20 |
| 无来源 | -15 |
| 包含"Engine" | -50 |
| 引用财报数据 | +15 |

## 数据标注规范

### 推荐的标注体系

在报告中使用以下符号标注数据:

```markdown
✅ **VERIFIED** - 真实可验证数据
   Tesla Q3 2025汽车毛利率18.7%
   来源: Form 10-Q, Page 15

📊 **ESTIMATED** - 基于模型的估算
   储能业务合理估值$550-650亿
   方法: DCF模型，假设见附录

🎯 **MODELED** - 情景分析
   如果Robotaxi 2027年商业化，隐含价值$245亿
   假设: 成功概率30%，车队规模100万辆

⚠️ **SAMPLE** - 示例数据框架
   Engine 1内部人交易监控框架（演示）
   实际应用需接入SEC API

❌ **UNVERIFIED** - 待验证或删除
   （不应出现在最终报告中）
```

### 示例: 正确标注

#### ✅ 好的例子

```markdown
## 财务数据

✅ **VERIFIED** Tesla Q3 2025关键指标:
- 汽车毛利率: 18.7% (来源: Form 10-Q第15页)
- 储能装机量: 9.4 GWh (来源: Q3 Earnings第8页)
- 总营收: $25.2B (来源: Form 10-Q第3页)

📊 **ESTIMATED** 2026年储能业务预测:
- 预期收入: $24B (+118% YoY)
- 假设: 装机量22 GWh, 单价$250/kWh
- 风险因素: 价格竞争、供应链延迟
```

#### ❌ 坏的例子

```markdown
## 财务数据（问题重重）

Tesla Q3毛利率5.8%，暴跌20ppt。  ❌ 数据错误且无来源

Engine 1监控显示CEO在2026-01-22卖出50,000股。  ❌ 虚构系统

根据内部消息，2026年储能订单将达到$30B。  ❌ 无法验证
```

## 常见问题修正指南

### 问题1: "Engine X实时监控"

❌ **错误写法**:
```markdown
**监控时间**: 2026-01-25 08:00 UTC
**数据源**: SEC EDGAR API

Elon Musk在2025-12-15卖出50,000股@$452.30
```

✅ **正确写法**:
```markdown
⚠️ **分析框架演示**: 内部人交易监控方法论

**实际数据获取方式**:
1. 访问 https://www.sec.gov/edgar/ 搜索Tesla Form 4
2. 使用OpenInsider.com或类似工具
3. 设置自动监控提醒

**分析逻辑**（基于历史经验）:
- CEO连续大额卖出(>$20M/月) → 谨慎信号
- 多位高管同时卖出 → 强烈谨慎

**历史案例**（真实数据）:
2023年Q4 Musk卖出$180M → 随后3个月股价-18%
（验证链接: SEC Form 4 XXXXXXX）
```

### 问题2: 社交媒体精确评分

❌ **错误写法**:
```markdown
Reddit情绪: 52/100
Twitter情绪: 60/100
散户做多比例: 84.3%
```

✅ **正确写法**:
```markdown
⚠️ **社交媒体情绪监控框架**

**数据采集方法**:
- Reddit API: 抓取r/teslainvestorsclub帖子
- Twitter API: 搜索$TSLA标签
- 情感分析: VADER算法（准确率~80%）

**免费工具**:
- SocialSentiment.io（提供Tesla情绪指数）
- Stocktwits情绪指标
- Google Trends相对热度

**重要提示**:
社交媒体情绪与股价相关性仅0.3-0.5，
不应作为唯一决策依据

**如需获取当前真实情绪数据**:
访问 https://stocktwits.com/symbol/TSLA
查看实时情绪指标（看涨vs看跌比例）
```

### 问题3: 无来源的关键财务数据

❌ **错误写法**:
```markdown
Tesla毛利率从25%暴跌至5.8%
```

✅ **正确写法**:
```markdown
✅ **VERIFIED** Tesla汽车业务毛利率演变:

| 时期 | 毛利率 | 来源 |
|------|-------|------|
| 2022 Q1 | 32.9% | Form 10-Q 2022 Q1, Page 15 |
| 2023 Q1 | 19.3% | Form 10-Q 2023 Q1, Page 15 |
| 2025 Q3 | 18.7% | Form 10-Q 2025 Q3, Page 15 |

**趋势分析**:
- 累计下降: -14.2 ppt
- 主要原因: 价格战、产品组合变化
- 警戒线: 15%（行业盈亏平衡点）
- 当前缓冲: 3.7 ppt
```

## 自动化集成

### GitHub Actions集成

创建`.github/workflows/data_quality.yml`:

```yaml
name: Data Quality Check

on: [push, pull_request]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Data Integrity Monitor
        run: |
          python3 data_integrity_monitor.py --dir ./reports
      - name: Fail if quality < 60
        run: |
          # 解析JSON报告，如果质量评分<60则失败
          python3 -c "import json; report=json.load(open('report.json')); exit(0 if report['quality_score']>=60 else 1)"
```

### Pre-commit Hook

创建`.git/hooks/pre-commit`:

```bash
#!/bin/bash
# 在commit前检查数据质量

python3 data_integrity_monitor.py --dir ./reports

if [ $? -ne 0 ]; then
    echo "❌ 数据质量检查失败，commit已阻止"
    echo "请运行: python3 data_integrity_monitor.py --dir ./reports"
    echo "查看详细问题并修正"
    exit 1
fi

echo "✅ 数据质量检查通过"
```

## 定期审计建议

### 每周审计

```bash
# 每周一运行
cd /Users/milton/投资大师/IntelligenceEngine_v10
python3 data_integrity_monitor.py --dir . > weekly_report_$(date +%Y%m%d).txt
```

### 发布前检查清单

在发布任何报告前，确保:

- [ ] 运行`data_integrity_monitor.py`
- [ ] 质量评分 ≥ 70/100
- [ ] 可验证数据 ≥ 20%
- [ ] 未验证数据 ≤ 30%
- [ ] 所有关键财务数据已添加来源
- [ ] 所有"Engine X"内容已改为框架说明
- [ ] 报告开头已添加数据声明

## 工具扩展

### 自定义检测规则

编辑`data_integrity_monitor.py`中的:

```python
# 添加新的可疑关键词
SUSPICIOUS_KEYWORDS = [
    'Engine 1',
    # 添加你的关键词
    '独家',
    '内幕',
]

# 添加需要来源的数据类型
REQUIRE_SOURCE = [
    '毛利率',
    # 添加你的数据类型
    '市占率',
    'EBITDA',
]
```

### 导出Excel报告

```python
# 将JSON转为Excel
import pandas as pd
import json

with open('report.json') as f:
    data = json.load(f)

df = pd.DataFrame(data['data_points'])
df.to_excel('quality_report.xlsx', index=False)
```

## 支持与反馈

如果遇到问题或有改进建议:

1. 检查Python版本 (需要3.7+)
2. 确保文件编码为UTF-8
3. 查看错误日志

## 版本历史

- **v1.0** (2026-01-25): 初始版本
  - 基础数据检测
  - 质量评分
  - JSON报告导出

## 许可证

MIT License

---

**最后更新**: 2026-01-25
**维护者**: Data Integrity Team
