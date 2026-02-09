# 综合投资研究引擎设计文档 v2.0
# Comprehensive Investment Research Engine Design

> **设计日期**: 2026-02-09
> **设计师**: Claude + User
> **版本**: v2.0 - 集成所有MCP数据源的累积证据链框架

## 🎯 设计总览

### 核心理念
基于**累积证据链**的6层序列分析框架，整合FMP、100Baggers、Polymarket、Smart Money等所有数据源，通过独立证据收集和交叉验证，构建最可靠的投资决策支持系统。

### 架构原则
- **Foundation First**: 扎实的财务数据基础，逐层构建
- **Evidence Independence**: 每层证据独立收集，避免偏见传播
- **Cross Validation**: 多重证据互相印证或发现矛盾
- **Dynamic Weighting**: 根据市场环境动态调整证据权重

## 🏛️ 整体架构

### 6层累积证据链
```yaml
框架总览:
  名称: "investment-research-engine-v2.0"
  方法: "Sequential Evidence Accumulation"
  层级: 6个独立证据收集层
  输出: "多维度证据综合报告 + 投资决策建议"

6层证据链:
  Layer 1: "FMP财务证据层"     - 财务健康度 + 估值合理性
  Layer 2: "100B质量证据层"    - 商业质量 + 宏观环境
  Layer 3: "逻辑证据层"       - 第一性原理 + 商业护城河
  Layer 4: "聪明钱证据层"     - 机构认可 + 大师逻辑
  Layer 5: "概率证据层"       - 预测市场 + 事件风险
  Layer 6: "信号证据层"       - 预警系统 + 监控指标

证据整合:
  独立收集: 每层证据相互独立，避免偏见传播
  交叉验证: 多重证据互相印证或发现矛盾
  权重评估: 根据证据质量和市场环境动态调权
```

## 🔄 执行机制设计

### 序列自动化流程
```python
class InvestmentResearchEngine:
    def analyze_company(self, symbol: str) -> ComprehensiveReport:
        evidence_chain = EvidenceChain()

        # Layer 1: FMP财务证据
        financial_evidence = self.collect_financial_evidence(symbol)
        evidence_chain.add("financial", financial_evidence)

        # Layer 2: 100Baggers质量证据
        quality_evidence = self.collect_quality_evidence(symbol)
        evidence_chain.add("quality", quality_evidence)

        # Layer 3: 投资逻辑证据
        logic_evidence = self.collect_logic_evidence(symbol)
        evidence_chain.add("logic", logic_evidence)

        # Layer 4: 聪明钱证据
        smart_money_evidence = self.collect_smart_money_evidence(symbol)
        evidence_chain.add("smart_money", smart_money_evidence)

        # Layer 5: 概率证据
        probability_evidence = self.collect_probability_evidence(symbol)
        evidence_chain.add("probability", probability_evidence)

        # Layer 6: 信号证据
        signal_evidence = self.collect_signal_evidence(symbol)
        evidence_chain.add("signal", signal_evidence)

        # 证据综合分析
        return self.synthesize_evidence(evidence_chain)
```

### 证据标准化格式
```yaml
evidence_format:
  evidence_type: "financial" | "quality" | "logic" | "smart_money" | "probability" | "signal"
  confidence_level: 0.0-1.0  # 证据置信度
  direction: "bullish" | "bearish" | "neutral"  # 证据方向
  key_findings: [具体发现列表]
  data_sources: [数据来源追踪]
  timestamp: 证据收集时间
  weight: 动态权重(由市场环境决定)
```

## 📊 各层详细实施方案

### Layer 1 - FMP财务证据层
```yaml
MCP工具组合:
  - fmp_data(profile): 公司基本信息
  - fmp_data(ratios): 4年财务比率趋势
  - fmp_data(income-ttm): TTM损益表
  - fmp_data(balance-ttm): 最新资产负债表
  - fmp_data(cashflow-ttm): TTM现金流表
  - analyze_stock(basic): yfinance补充数据

证据输出:
  - 财务健康评分: 负债率/流动性/偿债能力
  - 盈利质量评分: ROE/ROA/利润率趋势
  - 估值水平评分: PE/PB/EV倍数对比
  - 现金流质量: OCF/FCF/资本配置效率
  - 成长性评估: 营收/利润历史增长质量

实施步骤:
  1. 获取4年完整财务数据
  2. 计算关键财务比率和趋势
  3. 行业对比和历史分位数分析
  4. 财务健康度综合评分(0-100)
```

### Layer 2 - 100Baggers质量证据层
```yaml
MCP工具:
  - baggers_summary(): 7维度38指标+宏观温度
  - baggers_strategy(): AI深度策略报告

证据输出:
  - 宏观温度: CAPE/Buffett/ERP环境评估
  - 商业质量: 7大维度综合评分
  - 竞争地位: 行业对比和护城河初判
  - 增长质量: 营收/利润/现金流增长可持续性
  - 领先指标: 16个业务拐点预警信号

实施步骤:
  1. 获取100Baggers全维度分析报告
  2. 提取宏观市场温度指标
  3. 分析7维度38指标评分
  4. 识别正面和负面领先信号
  5. 生成商业质量综合评分(0-100)
```

### Layer 3 - 投资逻辑证据层
```yaml
技能调用:
  - investment-logic-toolkit: 第一性原理+飞轮分析

证据输出:
  - 商业模式: 价值创造/传递/获取逻辑
  - 竞争优势: 护城河类型和深度评估
  - 飞轮效应: 自我强化循环识别
  - 创新能力: 技术护城河和持续创新
  - 第一性原理: 基础假设和推导链验证

实施步骤:
  1. 第一性原理分析: 核心假设识别和推导链构建
  2. 商业飞轮识别: 寻找自我强化循环
  3. 护城河深度分析: 4类护城河评估
  4. 创新护城河评估: 技术门槛+先发优势+持续创新
  5. 投资逻辑完整性检验: 压力测试和反向质疑
```

### Layer 4 - 聪明钱证据层
```yaml
技能调用:
  - smart-money-tracker: 机构投资者行为解码

MCP工具:
  - fmp_data(insider-trading): 内部人交易统计

证据输出:
  - 机构共识度: Top投资者持仓变化分析
  - 内部人信心: 买入/卖出比率和趋势
  - 投资大师逻辑: 巴菲特等传奇投资者同类选择
  - 资本类型分析: 不同机构资金的配置偏好
  - 聪明钱流向: 增持/减持的时点和规模

实施步骤:
  1. 13F报告解读: 机构持仓变化分析
  2. 内部人交易统计: acquiredDisposedRatio趋势
  3. 投资大师逻辑还原: 对标知名投资者选股逻辑
  4. 机构共识度量化: 持仓集中度和一致性评分
  5. 资本行为预测: 不同消息对各类投资者影响
```

### Layer 5 - 概率证据层
```yaml
技能调用:
  - polymarket-prediction-analyzer: 预测市场分析

MCP工具:
  - polymarket_events(): 相关事件概率查询

证据输出:
  - 重大事件风险: 财报/并购/监管概率评估
  - 地缘政治影响: 相关政策风险量化
  - 市场情绪真实性: 真金白银押注vs传统情绪
  - 概率-价格背离: 套利机会识别
  - 前瞻性风险: 未来6-12个月重大风险概率

实施步骤:
  1. 搜索公司相关预测市场: 财报/事件/政策
  2. 概率数据获取: 当前概率+历史变化趋势
  3. 概率-价格背离分析: 寻找套利机会
  4. 地缘政治风险量化: 相关政策风险评估
  5. 真金白银情绪验证: 对比传统情绪指标
```

### Layer 6 - 信号证据层
```yaml
技能调用:
  - signal-monitoring-system: 多级预警体系
  - investment-thermometer: 温度计评分

MCP工具:
  - analyze_stock(technical): 技术指标

证据输出:
  - 综合温度评分: 基于所有前序证据的温度计算
  - 预警信号状态: 5级预警体系当前状态
  - 技术面确认: RSI/趋势/支撑阻力位
  - 监控指标配置: 个股特定的关键跟踪指标
  - 买卖时点建议: 基于多重信号的交易时机

实施步骤:
  1. 投资温度计计算: 宏观(30%)+基本面(50%)+情绪(20%)
  2. 5级预警体系配置: 6-12个月/3-6个月/1-3个月/1周/实时
  3. 技术指标确认: RSI/均线/趋势方向
  4. 个股监控指标: 基于前5层证据定制关键指标
  5. 信号强度评分: 综合所有信号的强度和一致性
```

## 🎯 证据综合与决策机制

### 多维证据整合算法
```python
class EvidenceSynthesizer:
    def synthesize_evidence(self, evidence_chain: EvidenceChain) -> InvestmentDecision:
        # 1. 证据一致性检查
        consistency_score = self.check_evidence_consistency(evidence_chain)

        # 2. 动态权重分配
        weights = self.calculate_dynamic_weights(evidence_chain, market_regime)

        # 3. 综合评分计算
        overall_score = self.weighted_evidence_score(evidence_chain, weights)

        # 4. 风险调整
        risk_adjusted_score = self.apply_risk_adjustment(overall_score, evidence_chain)

        # 5. 投资建议生成
        return self.generate_investment_recommendation(risk_adjusted_score, evidence_chain)

    def check_evidence_consistency(self, evidence_chain: EvidenceChain) -> float:
        """检查各层证据的一致性，发现矛盾信号"""
        bullish_count = sum(1 for e in evidence_chain.all() if e.direction == "bullish")
        bearish_count = sum(1 for e in evidence_chain.all() if e.direction == "bearish")
        total_count = len(evidence_chain.all())

        # 一致性评分: 完全一致=1.0，完全分歧=0.0
        consistency = abs(bullish_count - bearish_count) / total_count
        return consistency

    def calculate_dynamic_weights(self, evidence_chain: EvidenceChain, market_regime: str) -> Dict[str, float]:
        """根据市场环境动态调整证据权重"""
        base_weights = {
            "financial": 0.25,
            "quality": 0.20,
            "logic": 0.15,
            "smart_money": 0.15,
            "probability": 0.10,
            "signal": 0.15
        }

        if market_regime == "bull_market":
            # 牛市: 重视质量和逻辑，轻视概率风险
            base_weights["quality"] += 0.05
            base_weights["logic"] += 0.05
            base_weights["probability"] -= 0.05
            base_weights["signal"] -= 0.05

        elif market_regime == "bear_market":
            # 熊市: 重视财务安全和聪明钱
            base_weights["financial"] += 0.05
            base_weights["smart_money"] += 0.05
            base_weights["quality"] -= 0.05
            base_weights["logic"] -= 0.05

        elif market_regime == "volatile_market":
            # 震荡市: 重视信号和逻辑
            base_weights["signal"] += 0.05
            base_weights["logic"] += 0.05
            base_weights["quality"] -= 0.05
            base_weights["probability"] -= 0.05

        return base_weights
```

### 投资决策输出格式
```yaml
InvestmentDecision:
  # 核心评分
  overall_score: 0-100分综合评分
  confidence_level: 0.0-1.0决策置信度
  evidence_consistency: 0.0-1.0证据一致性

  # 投资建议
  recommendation: "积极买入" | "买入" | "持有" | "减持" | "卖出"
  suggested_position: 0-100%建议仓位
  time_horizon: "短期(1-3个月)" | "中期(3-12个月)" | "长期(1年+)"

  # 风险管理
  key_risks: [前3大风险因素]
  stop_loss_level: 止损价位建议
  target_price: 目标价位(12个月)

  # 监控体系
  tracking_indicators: [5个关键跟踪指标]
  alert_triggers: [预警触发条件]
  review_schedule: "下次复评时间"

  # 证据摘要
  supporting_evidence: [支持投资的主要证据]
  conflicting_evidence: [矛盾或担忧的证据]
  evidence_weights: [各层证据的实际权重]
```

## 🚀 实施路径

### Phase 1: 核心框架搭建(1-2周)
```yaml
任务清单:
  - [ ] 创建InvestmentResearchEngine主类
  - [ ] 实现EvidenceChain数据结构
  - [ ] 设计证据标准化格式
  - [ ] 搭建基础的序列执行框架
  - [ ] 创建简单的证据综合算法
```

### Phase 2: Layer 1-3 实施(2-3周)
```yaml
任务清单:
  - [ ] 实现FMP财务证据收集器
  - [ ] 集成100Baggers质量分析
  - [ ] 开发投资逻辑分析模块
  - [ ] 测试前3层的独立执行
  - [ ] 验证证据格式标准化
```

### Phase 3: Layer 4-6 实施(2-3周)
```yaml
任务清单:
  - [ ] 实现Smart Money追踪器
  - [ ] 集成Polymarket预测分析
  - [ ] 开发信号监控系统
  - [ ] 完成投资温度计集成
  - [ ] 测试完整6层证据链
```

### Phase 4: 综合优化(1-2周)
```yaml
任务清单:
  - [ ] 优化证据综合算法
  - [ ] 实现动态权重调整
  - [ ] 完善投资决策生成
  - [ ] 添加风险管理功能
  - [ ] 整体系统测试和调优
```

## 📋 质量保障

### 测试策略
```yaml
单元测试:
  - 每层证据收集器独立测试
  - MCP工具调用正确性验证
  - 证据格式标准化验证

集成测试:
  - 6层序列执行完整性测试
  - 证据综合算法准确性测试
  - 决策输出合理性验证

回测验证:
  - 历史案例回测(选择10个知名公司)
  - 预测准确性评估
  - 风险控制有效性验证
```

### 性能指标
```yaml
系统性能:
  - 单次完整分析时间: <10分钟
  - MCP工具调用成功率: >95%
  - 证据收集完整性: >90%

分析质量:
  - 证据一致性平均得分: >0.7
  - 投资建议准确性: 待历史回测验证
  - 风险预警及时性: 待实盘验证
```

## 🔧 技术架构

### 依赖组件
```yaml
MCP工具:
  - fmp_data: 财务数据核心
  - baggers_summary/strategy: 质量分析
  - polymarket_events: 概率分析
  - analyze_stock: 技术分析补充

Skills:
  - investment-logic-toolkit: 逻辑分析
  - smart-money-tracker: 机构分析
  - polymarket-prediction-analyzer: 预测分析
  - signal-monitoring-system: 信号分析

框架组件:
  - EvidenceChain: 证据链数据结构
  - EvidenceCollector: 各层证据收集器
  - EvidenceSynthesizer: 证据综合分析器
  - DecisionGenerator: 投资决策生成器
```

### 文件结构
```
src/investment-research-engine/
├── core/
│   ├── evidence_chain.py
│   ├── evidence_collector.py
│   ├── evidence_synthesizer.py
│   └── decision_generator.py
├── layers/
│   ├── layer_1_financial.py
│   ├── layer_2_quality.py
│   ├── layer_3_logic.py
│   ├── layer_4_smart_money.py
│   ├── layer_5_probability.py
│   └── layer_6_signal.py
├── utils/
│   ├── mcp_client.py
│   ├── data_validator.py
│   └── report_generator.py
└── main.py
```

---

## 📝 版本记录

- **v2.0** (2026-02-09): 初始设计 - 6层累积证据链框架
- 集成FMP、100Baggers、Polymarket、Smart Money全数据源
- 实现序列证据收集和综合分析机制
- 包含动态权重调整和风险管理功能

---

**设计完成，准备进入实施阶段！** 🚀