# 金融行业深度参考 v26.0

> 按需加载。CLAUDE.md 仅保留速查，本文件包含完整公式、Phase执行指南、监控指标、信用风险框架。

---

## 金融双轴 F×D 详细维度

### F轴: 财务实力评估 (Financial Strength)
- **F1 资本充足性**: Tier 1资本比率+总资本比率+缓冲要求
- **F2 资产质量**: NCO率+DQNCY率+准备金覆盖+拨备前利润
- **F3 盈利能力**: ROAE+ROAA+NIM+效率比率+费收比
- **F4 流动性管理**: LCR+NSFR+存款稳定性+批发融资依赖
- **F5 风险管理**: VaR模型+压力测试+风险文化+内控体系

### D轴: 数字化转型评估 (Digital Transformation)
- **D1 技术投入**: IT支出占比+数字化人员+创新实验室
- **D2 客户体验**: 数字渗透率+移动端活跃度+NPS评分
- **D3 运营效率**: 自动化程度+处理时间+成本降低效果
- **D4 产品创新**: 数字产品收入占比+新产品成功率+API开放
- **D5 数据能力**: 数据变现+风控建模+个性化推荐+合规科技

### 金融溢价系数计算
```python
def financial_sector_premium(F_score, D_score):
    base_premium = F_score * D_score / 25  # 归一化到0-1
    regulatory_adjustment = calculate_regulatory_risk_discount()
    interest_rate_beta = calculate_rate_sensitivity()

    if F_score >= 4 and D_score >= 4:
        premium = (1.15 + base_premium * 0.1) * regulatory_adjustment  # 15-25%溢价
    elif F_score >= 3 and D_score >= 3:
        premium = (1.08 + base_premium * 0.07) * regulatory_adjustment  # 8-15%溢价
    elif F_score >= 2 and D_score >= 2:
        premium = (1.03 + base_premium * 0.05) * regulatory_adjustment  # 3-8%溢价
    else:
        premium = 1.0 * regulatory_adjustment  # 无金融溢价

    return premium * (1 + interest_rate_beta * rate_change_factor)
```

---

## Phase执行指南 v26.0

### Phase 0: 数据预取+温度计预评估
1. **强制调用**: `/investment-logic-toolkit` → 建立金融投资第一性原理
2. **数据预取**: `/data-prefetch` → 14数据源(财报+监管+利率+信贷)
3. **金融双轴初评**: 基于财报+监管数据初步确定F+D分数
4. **利率环境扫描**: Fed政策+收益率曲线+信贷利差最新动态
5. **监管风险评估**: 资本要求+合规成本+监管变化影响

### Phase 1: 公司分类+核心维度分析
1. **公司分类确认**: 5大类型精确归类 + 金融双轴精确评分
2. **资本充足性分析**: `/investment-logic-toolkit` 深度分析缓冲充足度
3. **信贷周期定位**: `/industry-cycle-analyzer` → 信贷扩张/收缩周期
4. **数据交叉验证**: `/cross-validation` → 财务+监管数据一致性检查

### Phase 2: 信贷风险+数字化竞争
1. **聪明钱追踪**: `/smart-money-tracking-system` → 机构银行股配置
2. **金融情绪分析**: `/psychology-agent` → 恐慌情绪+风险偏好变化
3. **金融信号监控**: `/signal-monitoring-system` → 收益率曲线+流动性
4. **并行分析**: `/dispatching-parallel-agents` → 3-5个独立维度

### Phase 3: 深度建模+并行协作
1. **强制并行**: 5Agent协作(信贷+监管+数字化+财务+估值)
2. **深度建模**: 信贷损失模型+资本配置模型+数字转型ROI
3. **压力测试**: 经济衰退+监管重拳+数字颠覆+利率冲击场景
4. **数据整合**: 多Agent输出数据一致性验证

### Phase 4: 温度计验证+估值校准
1. **温度计复核**: `/investment-logic-toolkit` → 投资逻辑完整性检验
2. **对抗性分析**: `/bear-case-generator` → 独立看空(信贷危机场景)
3. **金融溢价校准**: F×D双轴 → 溢价系数 → 估值调整
4. **敏感性分析**: 关键变量(利率/信贷/监管/数字化)影响度量化

### Phase 5: 报告合并+质量门控
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 金融专用指标验证
3. **投资建议**: 基于温度计+金融双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键指标

---

## 金融专用监控指标

### 早期信号 (领先6-12个月)
- **货币政策**: Fed政策转向+收益率曲线形态+通胀预期
- **信贷需求**: 贷款申请量+信贷标准+银行放贷意愿
- **监管动态**: 新法规提案+监管检查重点+资本要求变化
- **数字趋势**: 新兴Fintech+数字货币+支付创新

### 同步指标 (当前状态)
- **盈利能力**: NIM+ROE+效率比率+费收比变化
- **资产质量**: NCO+DQNCY+准备金覆盖+分类调整
- **资本状况**: 资本充足率+缓冲水平+分红能力
- **流动性**: 存贷比+批发融资+流动性覆盖

### 滞后指标 (确认趋势)
- **信贷损失**: 实际损失确认+拨备释放+核销处置
- **市场表现**: 股价+估值倍数+分红收益率
- **监管关系**: 监管评级+合规成本+处罚事件
- **数字成效**: 数字客户增长+成本降低+收入增长

---

## 信用风险深度分析框架 (20维度)

```python
def credit_risk_assessment(bank):
    # 资产质量指标 (30%)
    asset_quality = {
        'nco_rate': bank.net_charge_offs / bank.total_loans,
        'delinquency_rate': bank.past_due_loans / bank.total_loans,
        'provision_coverage': bank.allowance / bank.npl,
        'loan_mix_risk': calculate_portfolio_risk_weight(bank.loan_mix)
    }

    # 宏观敏感性 (25%)
    macro_sensitivity = {
        'unemployment_beta': bank.correlation_with_unemployment,
        'gdp_sensitivity': bank.earnings_gdp_correlation,
        'interest_rate_risk': bank.nim_rate_sensitivity,
        'geographic_concentration': bank.geographic_hhi
    }

    # 管理质量 (20%)
    management_quality = {
        'underwriting_standards': assess_credit_standards(),
        'risk_governance': risk_committee_effectiveness(),
        'stress_test_performance': regulatory_stress_results(),
        'credit_culture': credit_officer_experience()
    }

    # 资本缓冲 (15%)
    capital_buffer = {
        'tier1_ratio': bank.tier1_capital / bank.rwa,
        'total_capital_ratio': bank.total_capital / bank.rwa,
        'leverage_ratio': bank.tier1_capital / bank.total_assets,
        'buffer_adequacy': bank.capital_buffer / regulatory_minimum
    }

    # 流动性风险 (10%)
    liquidity_risk = {
        'lcr': bank.hqla / bank.net_outflows,
        'nsfr': bank.stable_funding / bank.required_funding,
        'deposit_stability': bank.core_deposits / bank.total_deposits,
        'wholesale_dependence': bank.wholesale_funding / bank.total_funding
    }

    return weighted_score([
        asset_quality, macro_sensitivity, management_quality,
        capital_buffer, liquidity_risk
    ])
```

## 数字化转型ROI模型

```python
def digital_transformation_roi(bank, digital_investments):
    cost_savings = {          # 40%
        'branch_reduction': calculate_branch_cost_savings(),
        'automation_benefits': process_automation_savings(),
        'fraud_reduction': digital_fraud_prevention_savings(),
        'operational_efficiency': digital_ops_improvement()
    }
    revenue_growth = {        # 35%
        'digital_product_revenue': new_digital_services_income(),
        'customer_acquisition': digital_channel_acquisition_value(),
        'cross_sell_improvement': digital_analytics_cross_sell(),
        'pricing_optimization': data_driven_pricing_uplift()
    }
    risk_improvement = {      # 15%
        'credit_scoring_improvement': ai_underwriting_performance(),
        'compliance_automation': regtech_compliance_savings(),
        'cybersecurity_investment': digital_security_cost_avoidance()
    }
    competitive_advantage = { # 10%
        'customer_satisfaction': digital_nps_improvement(),
        'market_share_gain': digital_acquisition_share(),
        'talent_attraction': digital_workplace_benefits()
    }

    total_benefits = sum_all(cost_savings, revenue_growth, risk_improvement, competitive_advantage)
    return {
        'roi': (total_benefits - digital_investments) / digital_investments,
        'payback_period': calculate_payback_period(benefits_timeline, investment_timeline),
        'npv': calculate_npv(benefits_timeline, investment_timeline, wacc)
    }
```

---

## 工具详细列表

### MCP数据工具 (P0)
| 工具 | 用途 | 金融特化应用 |
|------|------|-------------|
| `baggers_summary` | 7维度38指标+宏观温度 | ROAE分解+NIM分析+信用成本趋势 |
| `fmp_data` | 财报/比率/分析师预估 | 资本充足率+准备金覆盖+费收比分析 |
| `analyze_stock` | 技术面+基础指标 | 金融板块轮动+利率敏感性+监管事件 |
| `polymarket_events` | 预测市场概率 | 加息概率+银行监管+金融危机风险 |

### 专业投资skill (P1)
| Skill | 触发词 | 金融专业场景 |
|-------|--------|-------------|
| `/company-research-agent` | "全面研究" | Tier 3深度 - 信用风险+资本管理 |
| `/psychology-agent` | "金融情绪" | 恐慌情绪+风险偏好+信贷周期心理 |
| `/industry-cycle-analyzer` | "信贷周期" | 信贷扩张/收缩+利率环境+监管周期 |
| `/smart-money-tracking-system` | "聪明钱" | 银行股配置+巴菲特金融持仓+机构轮动 |
| `/signal-monitoring-system` | "金融信号" | 收益率曲线+信贷利差+银行间流动性 |
| `/investment-logic-toolkit` | "第一性原理" | 金融中介本质+风险定价+资本配置效率 |

### Agent协作工具 (P2)
| Skill | 用途 | 金融协作场景 |
|-------|------|-------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent: 信贷+监管+数字化+财务+估值 |
| `/data-prefetch` | 自动数据预取 | 14源: 财报+监管+利率+信贷数据 |
| `/cross-validation` | 数据冲突检验 | 多源NIM+NCO+资本比率验证 |
| `/bear-case-generator` | 独立看空分析 | 信贷危机+监管重拳+数字颠覆+利率冲击 |
| `/report-merger` | 多Agent产出合并 | Phase 5: Complete报告组装 |
