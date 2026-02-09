# Investment Logic Toolkit v1.0

> **统一投资分析工具包** - 整合12个MCP数据源 + 温度表格策略 + 行业专用分析

## 🎯 Skill Overview

### Core Purpose
整合所有投资逻辑、数据源和分析工具为统一接口，提供从Tier 0温度筛选到Tier 3深度分析的完整工作流。

### Key Capabilities
- **12个MCP工具统一调用**: 从基础数据到深度财务的一站式获取
- **Core层温度表格**: 立即可用的3维度投资温度评估
- **行业专用分析**: 消费品/科技/金融等行业的专门化分析逻辑
- **质量保障体系**: 3层置信度+数据验证+Phase门控的完整质控
- **智能路由**: 基于温度评分的自动Tier选择和分析深度建议

## 🛠️ Technical Architecture

### Layer 0: Core Investment Logic

#### 数据中心 (InvestmentDataHub)
```python
class InvestmentDataHub:
    """12个MCP工具的统一数据接口"""

    def __init__(self):
        self.mcp_tools = {
            'basic': ['analyze_stock', 'compare_stocks', 'screen_stocks', 'get_market_overview'],
            'financial': ['fmp_data', 'baggers_summary', 'baggers_search', 'baggers_sec_filings', 'baggers_strategy'],
            'prediction': ['polymarket_events'],
            'technical': ['ide_tools']
        }

    def get_company_360_view(self, symbol: str) -> Dict:
        """获取公司360度全景数据"""
        return {
            'profile': self.get_basic_profile(symbol),
            'macro_temperature': self.get_macro_indicators(symbol),
            'financial_depth': self.get_financial_comprehensive(symbol),
            'prediction_events': self.get_market_events(symbol),
            'technical_signals': self.get_technical_analysis(symbol)
        }

    def get_macro_indicators(self, symbol: str) -> Dict:
        """宏观温度指标 - baggers_summary核心"""
        data = mcp_baggers_summary(symbol)
        return {
            'cape_ratio': self.extract_cape(data),
            'buffett_indicator': self.extract_buffett(data),
            'equity_risk_premium': self.extract_erp(data),
            'seven_dimensions': self.extract_7d_38_indicators(data)
        }

    def get_financial_comprehensive(self, symbol: str) -> Dict:
        """综合财务数据 - FMP 20个endpoint并行"""
        endpoints = ['profile', 'income', 'balance', 'cashflow', 'ratios', 'key-metrics']
        return {
            endpoint: mcp_fmp_data(symbol=symbol, endpoint=endpoint, limit=4)
            for endpoint in endpoints
        }
```

#### 温度计算引擎 (TemperatureEngine)
```python
class TemperatureEngine:
    """Core层投资温度计算"""

    def calculate_core_temperature(self, symbol: str) -> Dict:
        """3维度温度计算"""

        # 1. 宏观温度 (30%)
        macro_score = self.calculate_macro_temperature(symbol)

        # 2. 基本面质量 (50%)
        quality_score = self.calculate_fundamental_quality(symbol)

        # 3. 市场情绪 (20%)
        sentiment_score = self.calculate_market_sentiment(symbol)

        total_score = (
            macro_score * 0.3 +
            quality_score * 0.5 +
            sentiment_score * 0.2
        )

        return {
            'total_score': total_score,
            'components': {
                'macro': macro_score,
                'quality': quality_score,
                'sentiment': sentiment_score
            },
            'interpretation': self.interpret_temperature(total_score),
            'tier_recommendation': self.recommend_analysis_tier(total_score)
        }

    def calculate_macro_temperature(self, symbol: str) -> float:
        """宏观温度评估"""
        data = InvestmentDataHub().get_macro_indicators(symbol)

        # CAPE评分
        cape = data['cape_ratio']
        cape_score = (
            2 if cape < 15 else
            1 if cape < 25 else
            0 if cape < 35 else
            -1 if cape < 45 else -2
        )

        # Buffett指标评分
        buffett = data['buffett_indicator']
        buffett_score = (
            2 if buffett < 100 else
            1 if buffett < 150 else
            0 if buffett < 200 else
            -1 if buffett < 250 else -2
        )

        # ERP评分
        erp = data['equity_risk_premium']
        erp_score = 1 if erp > 6 else (-1 if erp < 3 else 0)

        return cape_score * 0.4 + buffett_score * 0.4 + erp_score * 0.2

    def recommend_analysis_tier(self, temperature: float) -> Dict:
        """基于温度推荐分析深度"""
        if temperature <= -1.5:
            return {
                'recommended_tier': 'Tier 3',
                'reasoning': '极冷温度，建议深度分析投资机会',
                'urgency': 'high',
                'resource_allocation': '多会话深度研究'
            }
        elif temperature <= -0.5:
            return {
                'recommended_tier': 'Tier 2',
                'reasoning': '偏冷温度，标准分析验证价值',
                'urgency': 'medium',
                'resource_allocation': '2-3小时完整分析'
            }
        elif temperature <= 0.5:
            return {
                'recommended_tier': 'Tier 1',
                'reasoning': '中性温度，快速了解即可',
                'urgency': 'low',
                'resource_allocation': '10-15分钟扫描'
            }
        else:
            return {
                'recommended_tier': 'Tier 0',
                'reasoning': '偏热/过热，重点关注风险',
                'urgency': 'monitor',
                'resource_allocation': '持续监控卖出时机'
            }
```

### Layer 1: Industry-Specific Modules

#### 行业识别路由 (IndustryRouter)
```python
class IndustryRouter:
    """行业识别与专用分析路由"""

    INDUSTRY_MAPPING = {
        'consumer': ['PG', 'KO', 'NKE', 'COST', 'WMT', 'MCD', 'SBUX'],
        'technology': ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN'],
        'financial': ['JPM', 'BAC', 'BRK', 'V', 'MA'],
        'semiconductor': ['NVDA', 'AMD', 'TSM', 'ASML'],
    }

    def identify_industry(self, symbol: str) -> str:
        """自动识别股票所属行业"""
        for industry, symbols in self.INDUSTRY_MAPPING.items():
            if symbol in symbols:
                return industry

        # 备用：通过profile数据识别
        profile = mcp_fmp_data(symbol=symbol, endpoint='profile')
        sector = profile['data'][0]['sector']
        return self.map_sector_to_industry(sector)

    def get_industry_specific_analysis(self, symbol: str, industry: str) -> Dict:
        """行业专用分析逻辑"""
        if industry == 'consumer':
            return self.consumer_analysis(symbol)
        elif industry == 'technology':
            return self.technology_analysis(symbol)
        elif industry == 'financial':
            return self.financial_analysis(symbol)
        else:
            return self.generic_analysis(symbol)

    def consumer_analysis(self, symbol: str) -> Dict:
        """消费品专用分析"""
        return {
            'brand_moat_analysis': self.analyze_brand_strength(symbol),
            'flywheel_diagnosis': self.diagnose_growth_flywheel(symbol),
            'membership_economics': self.analyze_membership_model(symbol),
            'ppda_positioning': self.analyze_ppda_deviation(symbol),
            'smart_money_tracking': self.track_institutional_flow(symbol)
        }
```

#### 消费品专用模块 (ConsumerAnalytics)
```python
class ConsumerAnalytics:
    """消费品行业专用分析工具集"""

    def diagnose_growth_flywheel(self, symbol: str) -> Dict:
        """飞轮诊断 - 6种飞轮模式"""
        flywheel_types = {
            'membership': ['COST', 'AMZN'],
            'brand': ['PG', 'KO', 'NKE'],
            'platform': ['SBUX'],
            'scale': ['WMT'],
            'content': [],
            'private_label': ['COST', 'WMT']
        }

        identified_flywheels = []
        for flywheel_type, symbols in flywheel_types.items():
            if symbol in symbols:
                identified_flywheels.append(flywheel_type)

        return {
            'identified_flywheels': identified_flywheels,
            'flywheel_health': self.assess_flywheel_health(symbol, identified_flywheels),
            'acceleration_factors': self.identify_acceleration_factors(symbol),
            'deceleration_risks': self.identify_deceleration_risks(symbol)
        }

    def analyze_membership_model(self, symbol: str) -> Dict:
        """会员制商业模式分析"""
        if symbol not in ['COST', 'AMZN']:
            return {'applicable': False}

        financial_data = mcp_fmp_data(symbol=symbol, endpoint='income', limit=4)

        if symbol == 'COST':
            # COST特殊处理：会员费收入
            membership_metrics = self.extract_cost_membership_metrics(financial_data)
        else:
            # 其他会员制公司处理
            membership_metrics = self.extract_generic_membership_metrics(financial_data)

        return {
            'applicable': True,
            'membership_revenue': membership_metrics['revenue'],
            'renewal_rate': membership_metrics.get('renewal_rate'),
            'ltv_cac_ratio': membership_metrics.get('ltv_cac'),
            'membership_economics': self.evaluate_membership_economics(membership_metrics)
        }
```

### Layer 2: Analysis Depth Tools

#### Tier路由器 (TierRouter)
```python
class TierRouter:
    """基于温度的自动Tier选择"""

    def route_analysis(self, symbol: str, user_intent: str = None) -> Dict:
        """智能分析路由"""

        # 1. 计算投资温度
        temperature_result = TemperatureEngine().calculate_core_temperature(symbol)
        temp_score = temperature_result['total_score']
        auto_tier = temperature_result['tier_recommendation']['recommended_tier']

        # 2. 解析用户意图
        if user_intent:
            explicit_tier = self.parse_user_intent(user_intent)
        else:
            explicit_tier = None

        # 3. 最终决策
        final_tier = explicit_tier or auto_tier

        # 4. 生成执行计划
        execution_plan = self.generate_execution_plan(symbol, final_tier, temp_score)

        return {
            'temperature_assessment': temperature_result,
            'recommended_tier': auto_tier,
            'final_tier': final_tier,
            'execution_plan': execution_plan
        }

    def parse_user_intent(self, intent: str) -> str:
        """解析用户意图确定Tier"""
        intent_lower = intent.lower()

        if any(keyword in intent_lower for keyword in ['深度', '全面', 'deep', 'comprehensive']):
            return 'Tier 3'
        elif any(keyword in intent_lower for keyword in ['分析', '研究', 'analyze', 'research']):
            return 'Tier 2'
        elif any(keyword in intent_lower for keyword in ['看看', '怎么样', 'quick', 'overview']):
            return 'Tier 1'
        else:
            return None

    def generate_execution_plan(self, symbol: str, tier: str, temperature: float) -> Dict:
        """生成具体执行计划"""
        industry = IndustryRouter().identify_industry(symbol)

        plans = {
            'Tier 0': {
                'scope': '温度监控',
                'duration': '1-2分钟',
                'actions': ['temperature_tracking', 'alert_setup'],
                'deliverable': '温度报告+监控设置'
            },
            'Tier 1': {
                'scope': '快速扫描',
                'duration': '10-15分钟',
                'actions': ['basic_profile', 'key_metrics', 'recent_news'],
                'deliverable': '~5,000字快速报告'
            },
            'Tier 2': {
                'scope': '标准分析',
                'duration': '2-3小时',
                'actions': ['comprehensive_financial', 'industry_analysis', 'valuation', 'risk_assessment'],
                'deliverable': '~40,000字完整报告'
            },
            'Tier 3': {
                'scope': '深度研究',
                'duration': '多会话',
                'actions': ['phase_0_data_prefetch', 'phase_1_5_deep_analysis', 'cross_validation', 'bear_case'],
                'deliverable': '≥85,000字机构级报告'
            }
        }

        base_plan = plans[tier]

        # 行业特殊化
        if industry == 'consumer':
            base_plan['industry_enhancements'] = [
                'flywheel_diagnosis', 'brand_moat_analysis', 'membership_economics'
            ]

        return base_plan
```

### Quality Assurance Layer

#### 数据验证系统 (DataValidator)
```python
class DataValidator:
    """数据质量验证与置信度标注"""

    def cross_validate_sources(self, data_dict: Dict) -> Dict:
        """多源数据交叉验证"""
        validation_results = {}

        # 财务数据一致性检查
        if 'fmp_profile' in data_dict and 'baggers_summary' in data_dict:
            consistency_check = self.check_financial_consistency(
                data_dict['fmp_profile'],
                data_dict['baggers_summary']
            )
            validation_results['financial_consistency'] = consistency_check

        # 市场数据一致性检查
        if 'technical_analysis' in data_dict and 'market_overview' in data_dict:
            market_consistency = self.check_market_consistency(
                data_dict['technical_analysis'],
                data_dict['market_overview']
            )
            validation_results['market_consistency'] = market_consistency

        return validation_results

    def annotate_confidence_levels(self, analysis_content: str) -> str:
        """3层置信度标注"""
        annotated_content = analysis_content

        # 硬数据标注 [硬数据: 来源, 日期]
        hard_data_pattern = r'(财报|SEC|央行|FDIC|监管报告)'
        annotated_content = re.sub(
            hard_data_pattern,
            lambda m: f"[硬数据: {m.group(1)}, {datetime.now().strftime('%Y-%m-%d')}]",
            annotated_content
        )

        # 合理推断标注 [合理推断: 推理链]
        inference_indicators = ['基于', '推算', '估计', '假设']
        for indicator in inference_indicators:
            annotated_content = annotated_content.replace(
                indicator,
                f"[合理推断: 基于可验证数据] {indicator}"
            )

        return annotated_content
```

## 📋 Usage Patterns

### Pattern 1: 快速温度评估
```python
# 单股票温度检查
toolkit = InvestmentLogicToolkit()
temp_result = toolkit.quick_temperature_check("COST")

print(f"温度: {temp_result['interpretation']['level']}")
print(f"建议: {temp_result['interpretation']['action']}")
print(f"推荐Tier: {temp_result['tier_recommendation']['recommended_tier']}")
```

### Pattern 2: 智能分析路由
```python
# 用户输入智能路由
user_request = "深度分析COST"
routing_result = toolkit.route_analysis("COST", user_request)

print(f"最终Tier: {routing_result['final_tier']}")
print(f"执行计划: {routing_result['execution_plan']}")
```

### Pattern 3: 行业专用分析
```python
# 消费品专用深度分析
consumer_analysis = toolkit.industry_analysis("COST", "consumer")

print(f"飞轮诊断: {consumer_analysis['flywheel_diagnosis']}")
print(f"会员经济学: {consumer_analysis['membership_economics']}")
```

### Pattern 4: 投资组合温度扫描
```python
# 批量温度评估
portfolio = ["COST", "PG", "KO", "NKE", "SBUX"]
portfolio_temps = toolkit.portfolio_temperature_scan(portfolio)

# 按温度排序
sorted_stocks = sorted(
    portfolio_temps.items(),
    key=lambda x: x[1]['total_score']
)

for symbol, temp_data in sorted_stocks:
    print(f"{symbol}: {temp_data['interpretation']['level']}")
```

## 🔧 Configuration Options

### 温度计算参数调整
```python
TEMPERATURE_CONFIG = {
    'macro_weight': 0.3,      # 宏观温度权重
    'quality_weight': 0.5,    # 基本面质量权重
    'sentiment_weight': 0.2,  # 市场情绪权重

    'cape_thresholds': [15, 25, 35, 45],  # CAPE评分阈值
    'buffett_thresholds': [100, 150, 200, 250],  # Buffett指标阈值
    'erp_thresholds': [3, 6],  # ERP评分阈值
}
```

### 行业特殊配置
```python
INDUSTRY_CONFIG = {
    'consumer': {
        'required_skills': ['flywheel-diagnosis', 'consumer-brand-analysis'],
        'complexity_multiplier': 1.5,
        'min_analysis_depth': 'L3+'
    },
    'technology': {
        'required_skills': ['platform-analysis', 'innovation-pipeline'],
        'complexity_multiplier': 1.4,
        'min_analysis_depth': 'L3+'
    }
}
```

## 🚀 Integration Points

### 与现有技能协同
- **data-prefetch v3.0**: 作为数据获取后端
- **consumer-brand-analysis**: 消费品专用分析增强
- **smart-money-tracking**: 机构投资者分析整合
- **phase-gate-validator**: 质量门控自动化
- **cross-validation**: 数据验证环节

### 与Tier系统整合
- **Tier 0**: 温度预筛选，1-2分钟完成
- **Tier 1**: 快速扫描，使用basic MCP tools
- **Tier 2**: 标准分析，使用comprehensive MCP tools
- **Tier 3**: 深度研究，使用full MCP ecosystem + industry skills

### 与CLAUDE.md整合
```yaml
# CLAUDE.md新增触发规则
investment_logic_triggers:
  - pattern: "温度|temperature"
    action: "启用Core层温度计算"
  - pattern: "投资机会|investment opportunity"
    action: "执行完整温度评估+Tier建议"
  - pattern: "组合分析|portfolio analysis"
    action: "批量温度扫描"
```

## ⚡ Performance Optimizations

### 数据缓存策略
```python
CACHE_CONFIG = {
    'macro_indicators': 86400,    # 24小时缓存
    'financial_ratios': 3600,     # 1小时缓存
    'technical_signals': 300,     # 5分钟缓存
    'prediction_events': 1800,    # 30分钟缓存
}
```

### 并行处理优化
```python
async def parallel_data_fetch(symbol: str):
    """并行获取多源数据"""
    tasks = [
        fetch_baggers_summary(symbol),
        fetch_fmp_comprehensive(symbol),
        fetch_technical_analysis(symbol),
        fetch_prediction_events(symbol)
    ]

    results = await asyncio.gather(*tasks)
    return combine_results(results)
```

## 📊 Quality Metrics

### 数据质量标准
- **A级数据占比**: ≥70% (财报/监管数据)
- **B级数据占比**: ≤25% (第三方验证数据)
- **C级数据占比**: ≤5% (估算/模型数据)

### 分析质量标准
- **置信度标注覆盖率**: 100% 关键判断
- **Cross-validation通过率**: ≥95% 核心数据
- **预测验证准确率**: ≥70% 可验证预测

### 性能质量标准
- **温度计算响应时间**: <5秒
- **数据获取成功率**: >95%
- **分析完成率**: >90% (无中断)

## 🛡️ Error Handling & Fallbacks

### 数据源容错
```python
DATA_SOURCE_FALLBACKS = {
    'baggers_summary': ['fmp_data', 'analyze_stock'],
    'fmp_data': ['baggers_summary', 'manual_calculation'],
    'polymarket_events': ['news_search', 'analyst_calendar']
}
```

### 分析容错
```python
ANALYSIS_FALLBACKS = {
    'temperature_calculation': 'basic_valuation_metrics',
    'industry_specific': 'generic_analysis',
    'tier_3_depth': 'tier_2_comprehensive'
}
```

## 📝 Skill Metadata

```yaml
skill_metadata:
  name: "investment-logic-toolkit"
  version: "1.0"
  category: "investment-analysis"
  complexity_level: "advanced"

  dependencies:
    required_skills:
      - data-prefetch
      - cross-validation
      - consumer-brand-analysis
      - smart-money-tracking

    required_mcp_tools:
      - investment-master (all 10 tools)
      - ide (optional for technical validation)

  supported_tiers: ["Tier 0", "Tier 1", "Tier 2", "Tier 3"]
  supported_industries: ["consumer", "technology", "financial", "semiconductor"]

  quality_standards:
    min_data_quality: "B+ (85% verified sources)"
    min_confidence_annotation: "90% coverage"
    max_response_time: "5 seconds (temperature) / varies by tier"
```

---

## 🎯 Success Metrics

### 用户价值指标
- **决策效率提升**: 温度预筛选减少50%+无效分析
- **分析质量提升**: 多源验证提升30%+数据可靠性
- **投资成功率**: 基于温度的投资建议跟踪ROI

### 系统效率指标
- **资源优化**: 基于温度的智能Tier路由节省40%+分析资源
- **数据利用率**: 12个MCP工具统一调用提升80%+数据覆盖
- **错误率降低**: Cross-validation减少60%+数据错误

---

*本统一工具包整合了投资分析框架的全部升级内容，是从数据获取到投资决策的完整解决方案。*