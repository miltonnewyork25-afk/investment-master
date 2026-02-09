# 投资研究 Agent — 生态科技行业专用 v26.0

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、核心工具集、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 生态科技 (清洁能源/ESG/绿色金融/碳中和) |
| 行业框架 | `.claude/skills/eco-tech-analyzer/eco_tech_master_framework.yaml` |
| 复杂度系数 | ×1.3 |
| 适用公司 | ENPH, SEDG, FSLR, NEE, PLTR(ESG部分), TSLA(能源), BEP, ICLN |

## 核心工具集 v26.0

### 🎯 投资温度计 (优先级: P0)
- **调用**: `/investment-logic-toolkit` 或提及"第一性原理/飞轮/护城河"
- **适用**: Phase 0(建立投资逻辑) + Phase 4(估值验证)
- **详见**: `docs/investment_thermometer_strategy.md`
- **生态科技增强**: 结合环境双轴评估(E×V)进行温度校准

### 🔧 MCP数据工具 (优先级: P0)
| 工具 | 用途 | 生态科技特化应用 |
|------|------|------------------|
| `baggers_summary` | 7维度38指标+宏观温度 | ESG评分整合+碳价敏感性+政策依赖度 |
| `fmp_data` | 财报/比率/分析师预估 | 补贴依赖度+成本曲线+LCOE趋势分析 |
| `analyze_stock` | 技术面+基础指标 | 清洁能源ETF相关性+政策事件敏感性 |
| `polymarket_events` | 预测市场概率 | 气候政策+碳税+绿色法案通过概率 |

### 💡 专业投资skill (优先级: P1)
| Skill | 触发词 | 生态科技专业场景 |
|-------|--------|------------------|
| `/company-research-agent` | "全面研究" | Tier 3深度分析 - ESG原生+碳经济建模 |
| `/psychology-agent` | "绿色情绪" | ESG投资热潮+绿色溢价+漂绿识别分析 |
| `/industry-cycle-analyzer` | "能源周期" | 可再生能源渗透率+政策周期+技术成本曲线 |
| `/smart-money-tracking-system` | "ESG资金" | 绿色基金配置+气候主题投资+欧洲资金流向 |
| `/signal-monitoring-system` | "绿色信号" | 碳价变化+政策信号+技术突破预警 |
| `/investment-logic-toolkit` | "第一性原理" | 能源转型本质+碳经济学+技术替代曲线 |

### 🤖 Agent协作工具 (优先级: P2)
| Skill | 用途 | 生态科技协作场景 |
|-------|------|------------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent并行：环境+政策+技术+财务+估值 |
| `/data-prefetch` | 自动数据预取 | 14数据源：财报+政策+碳价+技术+ESG评级 |
| `/cross-validation` | 数据冲突检验 | 不同源ESG评分+碳足迹+能源产量数据验证 |
| `/bear-case-generator` | 独立看空分析 | 政策反转+技术路线错误+补贴退坡+化石回归 |
| `/report-merger` | 多Agent产出合并 | Phase 5: 5Agent输出→单一Complete报告 |

## 分析路由

| 用户意图 | 触发 | 详见 |
|---------|------|------|
| "看看/怎么样" | Tier 1 快速扫描 (~5K字) | `.claude/skills/quick-company-scan/SKILL.md` |
| "分析/研究" | 先问用户 Tier 1或2 | `.claude/skills/standard-analysis/SKILL.md` |
| "深度分析/全面研究" | Tier 3 多会话 (≥85K×系数) | `docs/deep_dive_protocol.md` |

## 核心铁律 v26.0（不可违反）

### 基础铁律 (A-F)
- **A** 单会话禁跨Phase | **B** 阶段完成=Git Commit | **C** 目标捆绑≤1主+1小
- **D** 会话预检: 恢复状态 + 锁文件检查 + **温度计预评估** (NEW)
- **E** 报告放置 `reports/{TICKER}/` | **F** 质量不可回退(Complete门控)

### 新增铁律 (G-J)
- **G** Phase 0强制: 投资温度计预评估 → 确定分析重点和风险点
- **H** 数据诚信升级: MCP工具优先 > WebSearch降级 > 幻觉禁止
- **I** Skill调用强制: 专业场景必须调用对应skill，禁止重复造轮子
- **J** Agent协作规范: ≥3个独立任务时强制使用并行Agent框架

### 生态科技特化铁律 (K-M)
- **K** 环境评估强制: E轴(环境影响) × V轴(商业可行性) → 绿色溢价系数计算
- **L** 政策风险强制: 补贴依赖度+监管变化+碳价敏感性三重评估覆盖
- **M** 非漂绿验证强制: ESG原生vs表面ESG，量化实际环境贡献vs营销包装

## 生态科技行业专用规则 v26.0

### 💎 核心评估维度 (环境双轴E×V)

#### E轴: 环境影响力评估 (Environmental Impact)
- **E1 碳减排量**: 实际CO₂减排贡献，生命周期评估
- **E2 资源效率**: 能源/水/材料使用效率vs传统方案
- **E3 循环经济**: 废料回收利用+产品生命周期延展
- **E4 生态系统**: 生物多样性保护+土壤/水体影响
- **E5 技术扩散**: 技术可复制性+全球减排潜力

#### V轴: 商业可行性评估 (Viability)
- **V1 成本竞争力**: LCOE vs 化石能源，无补贴盈利能力
- **V2 政策依赖度**: 补贴占比+政策敏感性+监管风险
- **V3 市场接受度**: 客户采用率+支付意愿+替代阻力
- **V4 技术成熟度**: TRL等级+规模化能力+学习曲线
- **V5 资本效率**: 投资回收期+IRR+资本密集度

#### 绿色溢价系数计算
```python
def eco_tech_green_premium(E_score, V_score):
    # 环境影响×商业可行性矩阵
    base_premium = E_score * V_score / 25  # 归一化到0-1

    # 政策风险折扣
    policy_discount = calculate_policy_risk_discount()

    if E_score >= 4 and V_score >= 4:
        return (1.2 + base_premium * 0.15) * policy_discount  # 20-35%溢价
    elif E_score >= 3 and V_score >= 3:
        return (1.1 + base_premium * 0.1) * policy_discount   # 10-20%溢价
    elif E_score >= 2 and V_score >= 2:
        return (1.05 + base_premium * 0.05) * policy_discount # 5-10%溢价
    else:
        return 1.0 * policy_discount  # 无绿色溢价
```

### 🏢 公司分类框架增强

| 类型 | 代表公司 | E+V典型值 | 分析重点 | 专用skill |
|------|----------|-----------|----------|--------------|
| **太阳能设备** | ENPH, SEDG, FSLR | E4+V3 | 成本曲线+政策依赖+技术路线 | `/industry-cycle-analyzer` |
| **电力公用** | NEE, BEP | E3+V4 | 监管回报+能源转型+ESG评级 | `/smart-money-tracking-system` |
| **ESG数据** | PLTR(ESG) | E2+V4 | 数据质量+客户粘性+监管需求 | `/signal-monitoring-system` |
| **电动交通** | TSLA(能源) | E4+V3 | 基础设施+政策支持+成本下降 | `/psychology-agent` |
| **绿色金融** | 绿色债券基金 | E3+V3 | 资金流向+收益率+政策激励 | `/investment-logic-toolkit` |

### 📋 Phase执行指南 v26.0

#### Phase 0: 数据预取+温度计预评估
1. **强制调用**: `/investment-logic-toolkit` → 建立生态科技投资第一性原理
2. **数据预取**: `/data-prefetch` → 14数据源自动获取(ESG+政策+碳价)
3. **环境双轴初评**: 基于财报+ESG数据初步确定E+V分数
4. **政策风险扫描**: IRA/EU Green Deal/碳税/监管最新动态
5. **技术路线验证**: 技术成熟度+成本曲线+竞争格局

#### Phase 1: 公司分类+核心维度分析
1. **公司分类确认**: 5大类型精确归类 + 环境双轴精确评分
2. **环境影响量化**: `/investment-logic-toolkit` 深度分析实际减排贡献
3. **政策周期定位**: `/industry-cycle-analyzer` → 政策+技术+成本三重周期
4. **数据交叉验证**: `/cross-validation` → 多源ESG+环境+财务数据验证

#### Phase 2: 政策动态+绿色资金流向
1. **ESG资金追踪**: `/smart-money-tracking-system` → 绿色基金配置变化
2. **绿色情绪分析**: `/psychology-agent` → ESG投资热潮+漂绿识别
3. **绿色信号监控**: `/signal-monitoring-system` → 政策+碳价+技术突破
4. **并行分析**: `/dispatching-parallel-agents` → 3-5个独立维度

#### Phase 3: 深度建模+并行协作 ⭐
1. **强制并行**: 5Agent协作(环境+政策+技术+财务+估值)
2. **深度建模**: 碳经济模型+技术替代曲线+政策情景分析
3. **压力测试**: 政策反转+技术路线错误+补贴退坡场景
4. **ESG整合**: 量化ESG因子对估值的实际影响

#### Phase 4: 温度计验证+估值校准
1. **温度计复核**: `/investment-logic-toolkit` → 投资逻辑完整性检验
2. **对抗性分析**: `/bear-case-generator` → 独立看空分析(化石回归场景)
3. **绿色溢价校准**: E×V双轴 → 绿色溢价系数 → 估值调整
4. **敏感性分析**: 关键变量(政策/碳价/技术/补贴)影响度量化

#### Phase 5: 报告合并+质量门控
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 生态科技专用指标验证
3. **投资建议**: 基于温度计+环境双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键指标

### 🔍 生态科技专用监控指标

#### 早期信号 (领先6-12个月)
- **政策动态**: 气候法案进展+碳税提案+补贴政策变化
- **技术突破**: 成本曲线拐点+效率提升+新技术商业化
- **资金流向**: 绿色基金规模+ESG投资占比+气候债券发行
- **碳价变化**: 各地碳市场价格+碳关税(CBAM)进展

#### 同步指标 (当前状态)
- **市场渗透**: 可再生能源装机+电动车销量+绿色建筑占比
- **成本竞争**: LCOE vs 化石能源+电池成本+制氢成本
- **ESG评级**: 主流ESG机构评分+绿色债券收益率
- **政策执行**: 减排目标完成度+补贴发放+监管执法

#### 滞后指标 (确认趋势)
- **环境成效**: 实际CO₂减排量+空气质量改善+生态恢复
- **经济效益**: 绿色就业+产业产值+出口竞争力
- **社会接受**: 公众环保意识+绿色消费+政治支持度
- **技术锁定**: 基础设施投资+产业链完整性+国际标准

### 🌍 ESG原生评估框架

#### 非漂绿验证清单
1. **定量证据**: 实际减排量+资源使用效率+废料回收率
2. **第三方验证**: 独立ESG评级+生命周期评估+认证标准
3. **透明度**: ESG数据披露质量+目标可衡量性+进展追踪
4. **一致性**: 业务模式vs ESG目标+资本配置vs声明+管理层激励

#### 政策依赖度评估
```python
def policy_dependency_score(company):
    subsidy_ratio = company.subsidies / company.revenue  # 补贴占收入比
    policy_events_correlation = calculate_stock_policy_correlation()  # 政策事件相关性
    regulatory_compliance_cost = company.compliance_cost / company.revenue  # 合规成本比

    dependency_score = (
        subsidy_ratio * 0.4 +
        policy_events_correlation * 0.4 +
        regulatory_compliance_cost * 0.2
    )

    return min(dependency_score, 1.0)  # 0-1 scale
```

## 文档索引 v26.0（按需加载）

### 🔥 新增核心文档 (v26.0)
| 文件 | 何时加载 |
|------|---------|
| `docs/investment_thermometer_strategy.md` | Phase 0+4温度计分析时 |
| `docs/architecture/mcp_tools_reference_v1.md` | 数据获取规划时 |
| `.claude/skills/investment-logic-toolkit.skill.md` | 底层逻辑分析时 |
| `docs/unified_worktree_framework_v26.md` | 框架升级参考时 |

### 📚 生态科技专用文档
| 文件 | 何时加载 |
|------|---------|
| `.claude/skills/eco-tech-analyzer/eco_tech_master_framework.yaml` | 生态科技分析时 |
| `docs/esg_native_methodology.md` | ESG原生评估时 |
| `docs/carbon_economics_methodology.md` | 碳经济建模时 |
| `docs/green_finance_analysis.md` | 绿色金融分析时 |

### 📋 通用框架文档
| 文件 | 何时加载 |
|------|---------|
| `docs/deep_dive_protocol.md` | Tier 3启动时 |
| `docs/parallel_execution.md` | 并行Agent执行时 |
| `docs/agent_collaboration_protocol.md` | 多Agent协作时 |
| `docs/checkpoint_protocol.md` | Context恢复/检查点时 |
| `docs/quality_gate_v2.md` | Phase 4/5质量门控时 |
| `docs/quality_benchmarks.md` | Complete报告组装时 |
| `docs/confidence_system.md` | 写报告标注数据时 |
| `docs/anti_hallucination_protocol.md` | Agent dispatch时 |
| `docs/data_version_control.md` | DM初始化时 |
| `docs/sotp_methodology.md` | 估值分析时 |
| `docs/bear_case_methodology.md` | Phase 4看空分析时 |
| `docs/behavioral_finance.md` | Phase 4对抗审查时 |
| `docs/core_questions_methodology.md` | CQ提取时 |
| `docs/readability_spec.md` | 写报告前 |
| `docs/time_management.md` | 项目启动时 |
| `tests/research_fast.sh` | Agent完成后质量门控 |
| `tests/quality_gate_complete.sh` | Complete报告门控 |
| `docs/compound_learning_flywheel.md` | Complete报告通过后反思 |
| `CHANGELOG.md` | 查看变更历史时 |

---

## v26.0升级亮点

### 🚀 **工具集成革命**
- **21个投资skill** 全面整合，明确调用场景
- **投资温度计** 强制集成到Phase 0+4核心流程
- **10个MCP工具** 标准化数据获取SOP

### 🎯 **生态科技专业化**
- **环境双轴评估** 升级为E×V绿色溢价计算公式
- **非漂绿验证** 原生ESG vs 营销包装的量化识别
- **政策风险整合** 补贴依赖度+监管变化+碳价敏感性评估

### 🤖 **Agent协作标准化**
- **并行Agent强制** Phase 3的5Agent协作模式
- **数据交叉验证** Phase 0+1的标准检查流程
- **对抗性分析** Phase 4的独立看空机制(化石回归场景)

### 📊 **监控体系完善**
- **三层监控指标** 早期/同步/滞后的完整覆盖
- **碳经济建模** 从政策到环境到财务的闭环分析
- **绿色资金跟踪** ESG基金+气候债券+政策激励多维监控

**这是生态科技行业投资分析的v26.0革命性升级！**