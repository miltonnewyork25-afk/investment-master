# 投资温度计实施策略 v2.0

> **最后更新**: 2026-02-11 | **下次审查**: 2026-05-11

## 策略总览

### 设计原则
- **环境感知**: 温度计描述投资环境的"冷暖"，不指导具体操作
- **分层演进**: 从简单到复杂，逐步迭代
- **轻量高效**: 避免过度复杂的计算
- **v2.0变化**: 移除温度→仓位%映射和操作建议。温度计的价值是帮你感知环境，不是替你决定仓位

### 架构设计
```
投资温度计 = Core层(70%) + Enhanced层(20%) + AI层(10%)
```

---

## 📊 Core层 - 立即可用

### 1. 数据源配置
```yaml
required_tools:
  - baggers_summary: "宏观温度 + 财务指标"
  - fmp_data(ratios): "财务比率历史"
  - fmp_data(insider-trading): "内部人交易"
  - analyze_stock(technical): "技术指标"

data_freshness:
  baggers_summary: "每日"
  fmp_ratios: "季度更新"
  insider_trading: "季度更新"
  technical: "实时"
```

### 2. 核心算法
```python
def core_thermometer(symbol):
    """核心温度计算法"""

    # 1. 宏观温度 (30%)
    macro_score = calculate_macro_temperature(symbol)

    # 2. 基本面质量 (50%)
    quality_score = calculate_fundamental_quality(symbol)

    # 3. 市场情绪 (20%)
    sentiment_score = calculate_market_sentiment(symbol)

    # 加权合计
    total_score = (
        macro_score * 0.3 +
        quality_score * 0.5 +
        sentiment_score * 0.2
    )

    return {
        "total_score": total_score,
        "components": {
            "macro": macro_score,
            "quality": quality_score,
            "sentiment": sentiment_score
        },
        "interpretation": interpret_temperature(total_score)
    }
```

### 3. 宏观温度计算
```python
def calculate_macro_temperature(symbol):
    """宏观市场温度评估"""

    data = baggers_summary(symbol)

    # CAPE Ratio评分
    cape = extract_cape_from_summary(data)
    if cape < 15: cape_score = +2
    elif cape < 25: cape_score = +1
    elif cape < 35: cape_score = 0
    elif cape < 45: cape_score = -1
    else: cape_score = -2

    # Buffett Indicator评分
    buffett = extract_buffett_from_summary(data)
    if buffett < 100: buffett_score = +2
    elif buffett < 150: buffett_score = +1
    elif buffett < 200: buffett_score = 0
    elif buffett < 250: buffett_score = -1
    else: buffett_score = -2

    # ERP评分
    erp = extract_erp_from_summary(data)
    if erp > 6: erp_score = +1      # 高风险溢价，机会
    elif erp < 3: erp_score = -1    # 低风险溢价，风险
    else: erp_score = 0

    # 加权平均
    macro_score = cape_score * 0.4 + buffett_score * 0.4 + erp_score * 0.2
    return macro_score
```

### 4. 基本面质量计算
```python
def calculate_fundamental_quality(symbol):
    """基本面质量评估"""

    ratios_data = fmp_data(symbol, "ratios", limit=4)
    latest = ratios_data['data'][0]

    # 财务健康度 (40%权重)
    health_score = 0

    # 负债比率
    debt_equity = latest.get('debtToEquityRatio', 0)
    if debt_equity < 0.5: health_score += 1
    elif debt_equity > 2.0: health_score -= 1

    # 流动性
    current_ratio = latest.get('currentRatio', 0)
    if current_ratio > 1.5: health_score += 1
    elif current_ratio < 1.0: health_score -= 1

    # 盈利质量 (35%权重)
    profit_score = 0

    # ROE
    roe = latest.get('returnOnEquity', 0)
    if roe > 0.2: profit_score += 1
    elif roe < 0.1: profit_score -= 1

    # 净利率
    net_margin = latest.get('netProfitMargin', 0)
    if net_margin > 0.15: profit_score += 1
    elif net_margin < 0.05: profit_score -= 1

    # 成长性 (25%权重) - 基于历史对比
    growth_score = calculate_growth_trend(ratios_data['data'])

    # 综合评分
    quality_score = (
        health_score * 0.4 +
        profit_score * 0.35 +
        growth_score * 0.25
    )

    return min(2, max(-2, quality_score))  # 限制在[-2, +2]范围
```

### 5. 市场情绪计算
```python
def calculate_market_sentiment(symbol):
    """市场情绪评估"""

    # 技术面分析 (70%权重)
    tech_data = analyze_stock(symbol, "technical")

    rsi = tech_data.get('rsi', 50)
    trend = tech_data.get('trend', '')

    # RSI评分
    if rsi < 30: rsi_score = +1      # 超卖，机会
    elif rsi > 70: rsi_score = -1    # 超买，风险
    else: rsi_score = 0              # 中性

    # 趋势评分
    trend_score = 0.5 if trend == "上涨" else -0.5 if trend == "下跌" else 0

    tech_sentiment = (rsi_score + trend_score) / 2

    # 内部人交易 (30%权重)
    insider_data = fmp_data(symbol, "insider-trading", limit=2)
    if insider_data.get('data'):
        recent_ratio = insider_data['data'][0].get('acquiredDisposedRatio', 1)

        if recent_ratio > 1.5: insider_sentiment = +1    # 内部人看好
        elif recent_ratio < 0.5: insider_sentiment = -1  # 内部人看空
        else: insider_sentiment = 0                       # 中性
    else:
        insider_sentiment = 0

    # 加权合计
    sentiment_score = tech_sentiment * 0.7 + insider_sentiment * 0.3
    return sentiment_score
```

### 6. 温度解读
```python
def interpret_temperature(total_score):
    """温度计解读 — 描述环境，不建议操作"""

    if total_score >= 1.5:
        return {
            "level": "过热",
            "description": "多项指标显示估值处于历史高位区间",
            "risk_level": "高",
            "key_signal": "市场情绪乐观，安全边际收窄"
        }
    elif total_score >= 0.5:
        return {
            "level": "偏热",
            "description": "估值高于历史均值，部分指标偏贵",
            "risk_level": "中高",
            "key_signal": "向上空间有限，回调风险上升"
        }
    elif total_score >= -0.5:
        return {
            "level": "中性",
            "description": "各项指标基本均衡",
            "risk_level": "中等",
            "key_signal": "无明显方向性信号"
        }
    elif total_score >= -1.5:
        return {
            "level": "偏冷",
            "description": "估值低于历史均值，出现价值信号",
            "risk_level": "中低",
            "key_signal": "安全边际扩大，长期价值开始显现"
        }
    else:
        return {
            "level": "极冷",
            "description": "多项指标显示严重低于历史区间",
            "risk_level": "低",
            "key_signal": "恐慌性定价，安全边际充足"
        }
```

---

## 🚀 Enhanced层 - 逐步实施

### 优先级排序
1. **期权情绪指标** (Q2 2026)
2. **行业相对估值** (Q3 2026)
3. **分析师预期追踪** (Q4 2026)

### 期权情绪增强
```python
def enhanced_options_sentiment(symbol):
    """期权市场情绪增强 (当数据可用时)"""

    try:
        # 尝试获取期权数据
        options = get_options_chain_data(symbol)  # 需要实现

        put_call_ratio = calculate_put_call_ratio(options)
        iv_rank = calculate_iv_rank(options)

        # Put/Call比率解读
        if put_call_ratio > 1.2:
            fear_greed_score = +0.5  # 恐慌情绪，潜在机会
        elif put_call_ratio < 0.8:
            fear_greed_score = -0.5  # 贪婪情绪，潜在风险
        else:
            fear_greed_score = 0

        # 隐含波动率排名
        if iv_rank > 80:
            volatility_score = +0.5  # 高波动，均值回归机会
        elif iv_rank < 20:
            volatility_score = -0.5  # 低波动，可能风险积累
        else:
            volatility_score = 0

        return fear_greed_score + volatility_score

    except Exception:
        # 数据不可用时返回0，不影响核心计算
        return 0
```

---

## 🤖 AI层 - 概念验证

### 长期规划
```yaml
ai_modules:
  patent_analysis:
    status: "研究阶段"
    complexity: "高"
    data_requirement: "USPTO + 专利数据库"

  supply_chain_intel:
    status: "概念阶段"
    complexity: "极高"
    data_requirement: "多源整合"

  sentiment_viral:
    status: "实验阶段"
    complexity: "中"
    data_requirement: "社交媒体API"
```

---

## 📋 实施检查清单

### 第一阶段 (立即)
- [ ] 实现Core层算法
- [ ] 测试数据获取稳定性
- [ ] 验证计算结果合理性
- [ ] 建立错误处理机制

### 第二阶段 (Q2 2026)
- [ ] 研究期权数据接入
- [ ] 开发Enhanced层增强功能
- [ ] A/B测试Enhanced效果
- [ ] 优化权重分配

### 第三阶段 (Q3-Q4 2026)
- [ ] AI模块原型开发
- [ ] 多数据源整合测试
- [ ] 性能优化和扩展性设计
- [ ] 用户反馈收集和迭代

---

## 🔧 维护和优化

### 定期审查机制
```yaml
review_schedule:
  monthly: "数据质量检查"
  quarterly: "算法效果评估"
  semi_annual: "权重优化调整"
  annual: "全面策略更新"
```

### 性能监控
- **数据获取成功率**: >95%
- **计算响应时间**: <5秒
- **预测准确率**: 跟踪记录
- **用户满意度**: 反馈收集

### 风险管理
- **数据源失效**: 多源备份和降级策略
- **API限制**: 请求频率控制和缓存
- **计算错误**: 异常处理和合理性检查
- **过度依赖**: 人工判断作为最终决策

---

## 📊 使用示例

### 基本调用
```python
# 获取单只股票温度
result = core_thermometer("AAPL")
print(f"温度: {result['interpretation']['level']}")
print(f"环境: {result['interpretation']['description']}")
print(f"风险: {result['interpretation']['risk_level']}")
```

### 批量分析
```python
# 分析投资组合
portfolio = ["AAPL", "MSFT", "GOOGL", "TSLA"]
temperatures = {}

for symbol in portfolio:
    temperatures[symbol] = core_thermometer(symbol)

# 按温度排序
sorted_stocks = sorted(
    temperatures.items(),
    key=lambda x: x[1]['total_score']
)
```

---

## ⚠️ 重要免责声明

- 本策略仅供参考，不构成投资建议
- 所有投资都有风险，过往表现不代表未来结果
- 使用者应结合自身情况做出独立判断
- 定期审查和更新策略以适应市场变化