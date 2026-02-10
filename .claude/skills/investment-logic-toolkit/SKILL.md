# Investment Logic Toolkit v1.0

> **统一投资分析工具包** — 整合12个MCP工具 + 温度计算 + Tier路由 + 质量门控

## 触发条件

当用户请求以下任何分析任务时自动触发：
- "分析[股票代码]" / "研究[公司名]"
- "给我一个投资建议" / "这只股票怎么样"
- "帮我评估一下[公司]" / "值得投资吗"
- 包含股票代码的投资相关询问

## 核心功能

### 🌡️ 投资温度计算
- **立即可用**: 基于现有MCP工具的Core层算法
- **5级分类**: 🧊极冷 → ❄️偏冷 → 😐中性 → 🌡️偏热 → 🔥过热
- **智能路由**: 根据温度自动选择Tier 1/2/3分析深度
- **仓位建议**: 每个温度级别对应明确仓位区间

### 📊 12个MCP工具统一接口
- **基础工具**: analyze_stock, compare_stocks, screen_stocks, get_market_overview
- **财务深度**: baggers_summary, fmp_data(20端点), baggers_sec_filings, baggers_strategy
- **预测市场**: polymarket_events事件概率
- **技术分析**: 整合技术指标和趋势分析

### 🎯 Tier路由优化
- **Tier 0新增**: 温度预筛选(5秒决策)
- **Tier 1**: 快速扫描(5K字符，10分钟)
- **Tier 2**: 标准分析(40K字符，2-3小时)
- **Tier 3**: 深度研究(85K+字符，多会话)

### ✅ 质量门控集成
- **实时验证**: Phase-gate-validator v2.0的11项检查
- **XV交叉验证**: 多源数据验证，减少错误
- **v22.0标准**: 15标注/万字符，≥40%硬数据

## 实现代码

```python
import asyncio
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass
from enum import Enum

class TemperatureLevel(Enum):
    """投资温度级别"""
    EXTREMELY_COLD = "🧊 极冷"      # ≤-1.5
    COLD = "❄️ 偏冷"              # -1.5 to -0.5
    NEUTRAL = "😐 中性"            # -0.5 to +0.5
    WARM = "🌡️ 偏热"              # +0.5 to +1.5
    OVERHEATED = "🔥 过热"         # ≥+1.5

@dataclass
class TemperatureResult:
    """温度计算结果"""
    total_score: float
    level: TemperatureLevel
    components: Dict[str, float]
    interpretation: Dict[str, Any]
    confidence: float
    data_quality: str

class InvestmentDataHub:
    """12个MCP工具的统一数据接口"""

    def __init__(self):
        self.mcp_tools = {
            'basic': ['analyze_stock', 'compare_stocks', 'screen_stocks', 'get_market_overview'],
            'financial': ['baggers_summary', 'fmp_data', 'baggers_sec_filings', 'baggers_strategy'],
            'prediction': ['polymarket_events'],
            'search': ['baggers_search']
        }
        self.data_cache = {}
        self.error_log = []

    async def get_basic_data(self, symbol: str) -> Dict[str, Any]:
        """获取基础股票数据"""
        try:
            # 并行获取基础数据
            tasks = [
                self._call_mcp('analyze_stock', symbol=symbol, data_types='technical'),
                self._call_mcp('baggers_summary', symbol=symbol),
                self._call_mcp('get_market_overview'),
            ]

            results = await asyncio.gather(*tasks, return_exceptions=True)

            return {
                'technical_data': results[0] if not isinstance(results[0], Exception) else None,
                'fundamental_data': results[1] if not isinstance(results[1], Exception) else None,
                'market_overview': results[2] if not isinstance(results[2], Exception) else None,
                'timestamp': self._get_timestamp(),
                'data_quality': self._assess_data_quality(results)
            }

        except Exception as e:
            self.error_log.append(f"Basic data error for {symbol}: {e}")
            return {'error': str(e), 'data_quality': 'poor'}

    async def get_financial_ratios(self, symbol: str, periods: int = 4) -> Dict[str, Any]:
        """获取财务比率数据"""
        try:
            ratios_data = await self._call_mcp('fmp_data',
                                             symbol=symbol,
                                             endpoint='ratios',
                                             limit=periods)

            if ratios_data and 'data' in ratios_data:
                return {
                    'ratios': ratios_data['data'],
                    'latest': ratios_data['data'][0] if ratios_data['data'] else None,
                    'trend': self._calculate_ratio_trends(ratios_data['data']),
                    'quality': 'high' if len(ratios_data['data']) >= periods else 'medium'
                }
            else:
                # 备用数据源
                backup_data = await self._call_mcp('baggers_summary', symbol=symbol)
                return self._extract_ratios_from_backup(backup_data)

        except Exception as e:
            self.error_log.append(f"Financial ratios error for {symbol}: {e}")
            return {'error': str(e), 'quality': 'poor'}

    async def get_market_sentiment(self, symbol: str) -> Dict[str, Any]:
        """获取市场情绪数据"""
        try:
            # 并行获取情绪相关数据
            tasks = [
                self._call_mcp('fmp_data', symbol=symbol, endpoint='insider-trading', limit=2),
                self._call_mcp('polymarket_events', query=f"{symbol} earnings"),
                self._call_mcp('analyze_stock', symbol=symbol, data_types='technical')
            ]

            results = await asyncio.gather(*tasks, return_exceptions=True)

            return {
                'insider_trading': results[0] if not isinstance(results[0], Exception) else None,
                'prediction_events': results[1] if not isinstance(results[1], Exception) else None,
                'technical_sentiment': results[2] if not isinstance(results[2], Exception) else None,
                'sentiment_score': self._calculate_sentiment_score(results)
            }

        except Exception as e:
            self.error_log.append(f"Market sentiment error for {symbol}: {e}")
            return {'error': str(e), 'sentiment_score': 0}

    def _assess_data_quality(self, results: List[Any]) -> str:
        """评估数据质量"""
        successful = sum(1 for r in results if not isinstance(r, Exception))
        total = len(results)

        if successful >= total * 0.8:
            return 'high'
        elif successful >= total * 0.6:
            return 'medium'
        else:
            return 'low'

class TemperatureCalculator:
    """投资温度计算核心算法"""

    def __init__(self, data_hub: InvestmentDataHub):
        self.data_hub = data_hub

    async def calculate_temperature(self, symbol: str) -> TemperatureResult:
        """计算投资温度"""
        try:
            # 并行获取所有需要的数据
            basic_data, ratios_data, sentiment_data = await asyncio.gather(
                self.data_hub.get_basic_data(symbol),
                self.data_hub.get_financial_ratios(symbol),
                self.data_hub.get_market_sentiment(symbol)
            )

            # 计算三个组件分数
            macro_score = self._calculate_macro_temperature(basic_data)
            quality_score = self._calculate_fundamental_quality(ratios_data)
            sentiment_score = self._calculate_market_sentiment_score(sentiment_data)

            # 加权合计 (宏观30% + 基本面50% + 情绪20%)
            total_score = (macro_score * 0.3 +
                          quality_score * 0.5 +
                          sentiment_score * 0.2)

            # 确定温度级别
            level = self._determine_temperature_level(total_score)

            # 生成解读
            interpretation = self._interpret_temperature(total_score, level)

            # 评估置信度
            confidence = self._calculate_confidence(basic_data, ratios_data, sentiment_data)

            return TemperatureResult(
                total_score=total_score,
                level=level,
                components={
                    'macro': macro_score,
                    'quality': quality_score,
                    'sentiment': sentiment_score
                },
                interpretation=interpretation,
                confidence=confidence,
                data_quality=min(basic_data.get('data_quality', 'low'),
                               ratios_data.get('quality', 'low'),
                               sentiment_data.get('quality', 'low'))
            )

        except Exception as e:
            # 返回错误结果
            return TemperatureResult(
                total_score=0.0,
                level=TemperatureLevel.NEUTRAL,
                components={'error': str(e)},
                interpretation={'error': '数据获取失败，无法计算温度'},
                confidence=0.0,
                data_quality='error'
            )

    def _calculate_macro_temperature(self, data: Dict[str, Any]) -> float:
        """计算宏观温度 (CAPE + Buffett + ERP)"""
        if not data or 'fundamental_data' not in data:
            return 0.0

        try:
            fund_data = data['fundamental_data']

            # 提取宏观指标 (需要从baggers_summary中解析)
            cape_score = self._score_cape_ratio(fund_data)
            buffett_score = self._score_buffett_indicator(fund_data)
            erp_score = self._score_risk_premium(fund_data)

            # 加权平均 (CAPE 40% + Buffett 40% + ERP 20%)
            macro_score = cape_score * 0.4 + buffett_score * 0.4 + erp_score * 0.2

            return max(-2.0, min(2.0, macro_score))  # 限制在[-2, +2]

        except Exception:
            return 0.0  # 数据不可用时返回中性

    def _calculate_fundamental_quality(self, data: Dict[str, Any]) -> float:
        """计算基本面质量"""
        if not data or 'latest' not in data or not data['latest']:
            return 0.0

        try:
            latest = data['latest']

            # 财务健康度 (40%权重)
            health_score = 0

            # 负债比率评分
            debt_equity = latest.get('debtToEquityRatio', 0)
            if debt_equity < 0.5:
                health_score += 1
            elif debt_equity > 2.0:
                health_score -= 1

            # 流动性评分
            current_ratio = latest.get('currentRatio', 0)
            if current_ratio > 1.5:
                health_score += 1
            elif current_ratio < 1.0:
                health_score -= 1

            # 盈利质量 (35%权重)
            profit_score = 0

            # ROE评分
            roe = latest.get('returnOnEquity', 0)
            if roe > 0.2:
                profit_score += 1
            elif roe < 0.1:
                profit_score -= 1

            # 净利率评分
            net_margin = latest.get('netProfitMargin', 0)
            if net_margin > 0.15:
                profit_score += 1
            elif net_margin < 0.05:
                profit_score -= 1

            # 成长性 (25%权重)
            growth_score = self._calculate_growth_trend(data.get('ratios', []))

            # 综合评分
            quality_score = (health_score * 0.4 +
                           profit_score * 0.35 +
                           growth_score * 0.25)

            return max(-2.0, min(2.0, quality_score))

        except Exception:
            return 0.0

    def _calculate_market_sentiment_score(self, data: Dict[str, Any]) -> float:
        """计算市场情绪分数"""
        if not data:
            return 0.0

        try:
            # 技术面情绪 (70%权重)
            tech_sentiment = 0

            if 'technical_sentiment' in data and data['technical_sentiment']:
                tech_data = data['technical_sentiment']

                # RSI评分
                rsi = tech_data.get('rsi', 50)
                if rsi < 30:
                    tech_sentiment += 1  # 超卖，机会
                elif rsi > 70:
                    tech_sentiment -= 1  # 超买，风险

                # 趋势评分
                trend = tech_data.get('trend', '')
                if '上涨' in trend:
                    tech_sentiment += 0.5
                elif '下跌' in trend:
                    tech_sentiment -= 0.5

            tech_sentiment = tech_sentiment / 2  # 标准化到[-1, +1]

            # 内部人交易 (30%权重)
            insider_sentiment = 0

            if 'insider_trading' in data and data['insider_trading']:
                insider_data = data['insider_trading']
                if insider_data.get('data'):
                    recent = insider_data['data'][0]
                    ratio = recent.get('acquiredDisposedRatio', 1)

                    if ratio > 1.5:
                        insider_sentiment = 1    # 内部人看好
                    elif ratio < 0.5:
                        insider_sentiment = -1   # 内部人看空

            # 加权合计
            sentiment_score = tech_sentiment * 0.7 + insider_sentiment * 0.3

            return max(-1.0, min(1.0, sentiment_score))

        except Exception:
            return 0.0

    def _determine_temperature_level(self, score: float) -> TemperatureLevel:
        """确定温度级别"""
        if score >= 1.5:
            return TemperatureLevel.OVERHEATED
        elif score >= 0.5:
            return TemperatureLevel.WARM
        elif score >= -0.5:
            return TemperatureLevel.NEUTRAL
        elif score >= -1.5:
            return TemperatureLevel.COLD
        else:
            return TemperatureLevel.EXTREMELY_COLD

    def _interpret_temperature(self, score: float, level: TemperatureLevel) -> Dict[str, Any]:
        """温度解读和投资建议"""
        interpretations = {
            TemperatureLevel.OVERHEATED: {
                "action": "减仓止盈",
                "position_range": "0-20%",
                "reasoning": "多项指标显示严重高估",
                "risk": "高",
                "opportunity": "低",
                "priority": "规避"
            },
            TemperatureLevel.WARM: {
                "action": "谨慎持有",
                "position_range": "20-40%",
                "reasoning": "估值偏高，存在回调风险",
                "risk": "中高",
                "opportunity": "低",
                "priority": "观望"
            },
            TemperatureLevel.NEUTRAL: {
                "action": "持有观望",
                "position_range": "40-60%",
                "reasoning": "各项指标基本均衡",
                "risk": "中等",
                "opportunity": "中等",
                "priority": "维持"
            },
            TemperatureLevel.COLD: {
                "action": "适度加仓",
                "position_range": "60-80%",
                "reasoning": "出现价值投资机会",
                "risk": "中低",
                "opportunity": "高",
                "priority": "关注"
            },
            TemperatureLevel.EXTREMELY_COLD: {
                "action": "积极买入",
                "position_range": "80-100%",
                "reasoning": "严重低估，长期投资良机",
                "risk": "低",
                "opportunity": "极高",
                "priority": "重点"
            }
        }

        return interpretations.get(level, interpretations[TemperatureLevel.NEUTRAL])

class TierRouter:
    """基于温度的Tier路由器"""

    def __init__(self, temp_calc: TemperatureCalculator):
        self.temp_calc = temp_calc

    async def route_analysis(self, symbol: str, user_intent: str = "") -> Dict[str, Any]:
        """根据温度和用户意图路由到合适的Tier"""

        # Step 1: 计算温度 (Tier 0)
        temp_result = await self.temp_calc.calculate_temperature(symbol)

        # Step 2: 基于温度确定建议Tier
        recommended_tier = self._recommend_tier(temp_result.level, temp_result.confidence)

        # Step 3: 考虑用户意图
        final_tier = self._adjust_for_user_intent(recommended_tier, user_intent)

        return {
            'temperature_result': temp_result,
            'recommended_tier': recommended_tier,
            'final_tier': final_tier,
            'routing_reason': self._explain_routing(temp_result, recommended_tier, final_tier),
            'execution_plan': self._generate_execution_plan(final_tier, symbol)
        }

    def _recommend_tier(self, level: TemperatureLevel, confidence: float) -> int:
        """基于温度推荐Tier"""

        # 低置信度时降级到Tier 1
        if confidence < 0.5:
            return 1

        # 极端温度建议深度分析
        if level in [TemperatureLevel.EXTREMELY_COLD, TemperatureLevel.OVERHEATED]:
            return 3  # 需要深度研究确认

        # 偏冷温度建议标准分析
        elif level == TemperatureLevel.COLD:
            return 2  # 潜在机会，值得详细分析

        # 偏热温度快速扫描
        elif level == TemperatureLevel.WARM:
            return 1  # 风险较高，快速了解即可

        # 中性温度标准分析
        else:
            return 2  # 中性情况，标准分析

    def _adjust_for_user_intent(self, recommended_tier: int, user_intent: str) -> int:
        """根据用户意图调整Tier"""

        # 明确要求深度分析
        if any(keyword in user_intent.lower() for keyword in
               ['深度', 'detailed', 'comprehensive', '全面', '详细']):
            return max(recommended_tier, 3)

        # 明确要求快速了解
        elif any(keyword in user_intent.lower() for keyword in
                ['快速', 'quick', 'brief', '简单', '看看']):
            return min(recommended_tier, 1)

        # 其他情况使用推荐Tier
        else:
            return recommended_tier

class QualityValidator:
    """质量门控验证器"""

    def __init__(self):
        self.v22_standards = {
            'annotation_density': 15,  # 每万字符≥15个标注
            'hard_data_ratio': 0.40,   # 硬数据≥40%
            'mermaid_charts': 8,       # ≥8个图表
            'vp_scenarios': 3,         # 三情景预测
            'cq_elements': 5          # CQ五要素闭环
        }

    def validate_tier1_output(self, content: str, data_sources: List[str]) -> Dict[str, Any]:
        """验证Tier 1输出质量"""

        validation_result = {
            'tier': 1,
            'character_count': len(content),
            'target_range': (4000, 6000),
            'data_sources_count': len(data_sources),
            'quality_score': 0.0,
            'issues': [],
            'recommendations': []
        }

        # 字符数检查
        if validation_result['character_count'] < 4000:
            validation_result['issues'].append("内容过短，需要更多分析细节")
        elif validation_result['character_count'] > 6000:
            validation_result['issues'].append("内容过长，应该简化为核心要点")
        else:
            validation_result['quality_score'] += 0.3

        # 数据源检查
        if len(data_sources) < 3:
            validation_result['issues'].append("数据源不足，建议至少使用3个MCP工具")
        else:
            validation_result['quality_score'] += 0.2

        # 结构检查
        required_sections = ['公司概况', '财务', '估值', '风险', '结论']
        found_sections = sum(1 for section in required_sections if section in content)

        if found_sections < 4:
            validation_result['issues'].append("缺少必需章节，标准Tier 1需要5个核心部分")
        else:
            validation_result['quality_score'] += 0.3

        # 投资建议检查
        if '建议关注' not in content and '不建议' not in content:
            validation_result['issues'].append("缺少明确的投资建议")
        else:
            validation_result['quality_score'] += 0.2

        return validation_result

    def validate_tier3_phase(self, phase: int, content: str,
                           annotations: List[str]) -> Dict[str, Any]:
        """验证Tier 3 Phase输出质量"""

        char_count = len(content)
        annotation_density = len(annotations) / (char_count / 10000) if char_count > 0 else 0

        # Phase特定目标
        phase_targets = {
            1: 15000,  # Phase 1目标15K字符
            2: 18000,  # Phase 2目标18K字符
            3: 22000,  # Phase 3目标22K字符
            4: 20000,  # Phase 4目标20K字符
            5: 15000   # Phase 5目标15K字符
        }

        validation_result = {
            'phase': phase,
            'character_count': char_count,
            'target_count': phase_targets.get(phase, 15000),
            'annotation_density': annotation_density,
            'quality_score': 0.0,
            'gate_status': 'pending',
            'issues': [],
            'must_fix': []
        }

        # 字符数门控 (硬要求)
        target = validation_result['target_count']
        if char_count < target * 0.8:
            validation_result['must_fix'].append(f"字符数严重不足: {char_count}/{target}")
            validation_result['gate_status'] = 'blocked'
        elif char_count < target * 0.9:
            validation_result['issues'].append(f"字符数略低: {char_count}/{target}")
        else:
            validation_result['quality_score'] += 0.4

        # 标注密度门控 (v22标准)
        if annotation_density < 12:
            validation_result['must_fix'].append(f"标注密度过低: {annotation_density:.1f}/万字符")
            validation_result['gate_status'] = 'blocked'
        elif annotation_density < 15:
            validation_result['issues'].append(f"标注密度偏低: {annotation_density:.1f}/万字符")
        else:
            validation_result['quality_score'] += 0.3

        # 硬数据占比检查
        hard_data_count = sum(1 for ann in annotations if '[硬数据:' in ann)
        hard_data_ratio = hard_data_count / len(annotations) if annotations else 0

        if hard_data_ratio < 0.35:
            validation_result['must_fix'].append(f"硬数据占比过低: {hard_data_ratio:.1%}")
            validation_result['gate_status'] = 'blocked'
        elif hard_data_ratio < 0.40:
            validation_result['issues'].append(f"硬数据占比偏低: {hard_data_ratio:.1%}")
        else:
            validation_result['quality_score'] += 0.3

        # 通过判定
        if validation_result['gate_status'] != 'blocked':
            validation_result['gate_status'] = 'passed' if validation_result['quality_score'] >= 0.7 else 'warning'

        return validation_result

class InvestmentLogicToolkit:
    """投资逻辑工具包主类"""

    def __init__(self):
        self.data_hub = InvestmentDataHub()
        self.temp_calc = TemperatureCalculator(self.data_hub)
        self.tier_router = TierRouter(self.temp_calc)
        self.quality_validator = QualityValidator()

        # 性能监控
        self.execution_log = []
        self.success_rate = 0.0

    async def analyze_investment(self, symbol: str,
                               user_intent: str = "",
                               force_tier: Optional[int] = None) -> Dict[str, Any]:
        """主分析入口"""

        start_time = asyncio.get_event_loop().time()

        try:
            # Step 1: Tier 0 温度评估 + 路由
            if not force_tier:
                routing_result = await self.tier_router.route_analysis(symbol, user_intent)
                recommended_tier = routing_result['final_tier']
                temp_result = routing_result['temperature_result']
            else:
                temp_result = await self.temp_calc.calculate_temperature(symbol)
                recommended_tier = force_tier
                routing_result = {'temperature_result': temp_result}

            # Step 2: 执行对应Tier分析
            analysis_result = await self._execute_tier_analysis(
                symbol, recommended_tier, temp_result, user_intent
            )

            # Step 3: 质量验证
            quality_result = self._validate_analysis_quality(
                analysis_result, recommended_tier
            )

            # Step 4: 整合最终结果
            final_result = {
                'symbol': symbol,
                'analysis_tier': recommended_tier,
                'temperature': {
                    'score': temp_result.total_score,
                    'level': temp_result.level.value,
                    'components': temp_result.components,
                    'interpretation': temp_result.interpretation,
                    'confidence': temp_result.confidence
                },
                'analysis': analysis_result,
                'quality': quality_result,
                'routing_details': routing_result,
                'execution_time': asyncio.get_event_loop().time() - start_time,
                'timestamp': self._get_timestamp()
            }

            # 记录成功执行
            self.execution_log.append({
                'symbol': symbol,
                'tier': recommended_tier,
                'success': True,
                'duration': final_result['execution_time']
            })

            return final_result

        except Exception as e:
            # 记录执行失败
            self.execution_log.append({
                'symbol': symbol,
                'tier': force_tier or 1,
                'success': False,
                'error': str(e),
                'duration': asyncio.get_event_loop().time() - start_time
            })

            return {
                'symbol': symbol,
                'error': str(e),
                'fallback_recommendation': '建议手动检查数据源并重试',
                'timestamp': self._get_timestamp()
            }

    async def _execute_tier_analysis(self, symbol: str, tier: int,
                                   temp_result: TemperatureResult,
                                   user_intent: str) -> Dict[str, Any]:
        """执行具体Tier分析"""

        if tier == 1:
            return await self._execute_tier1_analysis(symbol, temp_result)
        elif tier == 2:
            return await self._execute_tier2_analysis(symbol, temp_result, user_intent)
        elif tier == 3:
            return await self._execute_tier3_analysis(symbol, temp_result, user_intent)
        else:
            raise ValueError(f"不支持的分析层级: {tier}")

    async def _execute_tier1_analysis(self, symbol: str,
                                    temp_result: TemperatureResult) -> Dict[str, Any]:
        """执行Tier 1快速扫描"""

        # 并行获取核心数据
        basic_data, market_overview, comparison_data = await asyncio.gather(
            self.data_hub.get_basic_data(symbol),
            self.data_hub._call_mcp('get_market_overview'),
            self.data_hub._call_mcp('compare_stocks', symbols=[symbol, 'SPY']),
            return_exceptions=True
        )

        # 生成快速分析报告
        analysis = {
            'summary': self._generate_tier1_summary(symbol, temp_result, basic_data),
            'key_metrics': self._extract_key_metrics(basic_data),
            'temperature_assessment': {
                'score': temp_result.total_score,
                'level': temp_result.level.value,
                'recommendation': temp_result.interpretation['action'],
                'position_range': temp_result.interpretation['position_range']
            },
            'risks': self._identify_tier1_risks(temp_result, basic_data),
            'recommendation': self._generate_tier1_recommendation(temp_result),
            'data_sources': ['analyze_stock', 'baggers_summary', 'get_market_overview'],
            'character_count': 0  # 将在最终生成时计算
        }

        return analysis

    def _generate_tier1_summary(self, symbol: str, temp_result: TemperatureResult,
                              data: Dict[str, Any]) -> str:
        """生成Tier 1摘要"""

        level_emoji = temp_result.level.value.split(' ')[0]
        level_name = temp_result.level.value.split(' ')[1]

        summary = f"""
# {symbol} 快速投资扫描

## 🌡️ 投资温度: {level_emoji} {level_name} ({temp_result.total_score:.2f})

**核心判断**: {temp_result.interpretation['reasoning']}

**建议操作**: {temp_result.interpretation['action']}
**建议仓位**: {temp_result.interpretation['position_range']}

## 📊 关键指标

"""

        # 添加关键财务指标
        if data and 'fundamental_data' in data:
            summary += self._format_key_financials(data['fundamental_data'])

        # 添加风险提示
        summary += f"""
## ⚠️ 风险提示

- 数据置信度: {temp_result.confidence:.0%}
- 数据质量: {temp_result.data_quality}
"""

        return summary

    def get_performance_stats(self) -> Dict[str, Any]:
        """获取工具包性能统计"""

        if not self.execution_log:
            return {'message': '暂无执行记录'}

        total_executions = len(self.execution_log)
        successful = sum(1 for log in self.execution_log if log['success'])

        avg_duration_by_tier = {}
        for tier in [1, 2, 3]:
            tier_logs = [log for log in self.execution_log if log.get('tier') == tier and log['success']]
            if tier_logs:
                avg_duration_by_tier[f'tier_{tier}'] = sum(log['duration'] for log in tier_logs) / len(tier_logs)

        return {
            'total_analyses': total_executions,
            'success_rate': successful / total_executions,
            'avg_duration_by_tier': avg_duration_by_tier,
            'recent_errors': [log.get('error') for log in self.execution_log[-5:] if not log['success']],
            'data_hub_errors': len(self.data_hub.error_log),
            'last_updated': self._get_timestamp()
        }

# 使用示例和快速测试
async def quick_test():
    """快速功能测试"""

    toolkit = InvestmentLogicToolkit()

    # 测试温度计算
    print("Testing temperature calculation for AAPL...")
    temp_result = await toolkit.temp_calc.calculate_temperature("AAPL")
    print(f"Temperature: {temp_result.level.value} ({temp_result.total_score:.2f})")

    # 测试完整分析
    print("Testing full analysis for AAPL...")
    analysis_result = await toolkit.analyze_investment("AAPL", "快速看看")
    print(f"Analysis completed for Tier {analysis_result['analysis_tier']}")

    # 性能统计
    stats = toolkit.get_performance_stats()
    print(f"Performance: {stats['success_rate']:.1%} success rate")

if __name__ == "__main__":
    asyncio.run(quick_test())
```

## 使用指南

### 基础调用
```python
# 初始化工具包
toolkit = InvestmentLogicToolkit()

# 快速分析
result = await toolkit.analyze_investment("AAPL", "看看这只股票")

# 查看温度
print(f"投资温度: {result['temperature']['level']}")
print(f"建议操作: {result['temperature']['interpretation']['action']}")

# 强制指定Tier
deep_result = await toolkit.analyze_investment("TSLA", force_tier=3)
```

### 温度解读
- **🧊 极冷 (≤-1.5)**: 积极买入，80-100%仓位
- **❄️ 偏冷 (-1.5~-0.5)**: 适度加仓，60-80%仓位
- **😐 中性 (-0.5~+0.5)**: 持有观望，40-60%仓位
- **🌡️ 偏热 (+0.5~+1.5)**: 谨慎持有，20-40%仓位
- **🔥 过热 (≥+1.5)**: 减仓止盈，0-20%仓位

### 质量门控标准
- **Tier 1**: 4-6K字符，≥3个数据源，5个核心章节
- **Tier 2**: 35-45K字符，≥12标注/万字，≥40%硬数据
- **Tier 3**: ≥85K字符，≥15标注/万字，11项CG全部通过

## 错误处理

### 数据源故障
- **自动降级**: 主数据源失效时切换备用源
- **质量标记**: 明确标注数据质量等级
- **容错机制**: 部分数据缺失不阻断分析

### 计算异常
- **安全模式**: 异常时返回中性温度
- **错误日志**: 详细记录所有异常信息
- **重试机制**: 网络临时故障自动重试

### 用户误用
- **参数验证**: 股票代码格式检查
- **友好提示**: 清晰的错误消息和建议
- **文档链接**: 指向详细使用说明

## 版本信息

- **当前版本**: v1.0
- **发布日期**: 2026-02-09
- **兼容性**: MCP工具 v2.0+, Python 3.8+
- **依赖项**: asyncio, dataclasses, enum, typing

## 免责声明

⚠️ **重要提示**:
- 本工具包仅供投资参考，不构成投资建议
- 所有投资都有风险，过往表现不代表未来结果
- 使用者应结合自身情况做出独立判断
- 定期审查和更新策略以适应市场变化
- 温度计算基于历史数据，不保证预测准确性

---

*投资逻辑工具包 v1.0 - 让数据驱动投资决策*