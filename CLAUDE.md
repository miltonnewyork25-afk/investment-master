# 投资研究 Agent — 科技平台行业专用 v26.0

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、核心工具集、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 科技平台 (广告/云/消费电子/AI) |
| 行业框架 | `docs/industry/tech_platform.md` |
| 复杂度系数 | ×1.4 |
| 适用公司 | AAPL, MSFT, GOOG, META, AMZN |

## 核心工具集 v26.0

### 🎯 投资温度计 (优先级: P0)
- **调用**: `/investment-logic-toolkit` 或提及"第一性原理/飞轮/护城河"
- **适用**: Phase 0(建立投资逻辑) + Phase 4(估值验证)
- **详见**: `docs/investment_thermometer_strategy.md`
- **科技平台增强**: 结合平台双轴评估(P×S)进行温度校准

### 🔧 MCP数据工具 (优先级: P0)
| 工具 | 用途 | 科技平台特化应用 |
|------|------|------------------|
| `baggers_summary` | 7维度38指标+宏观温度 | FCF转化率+ROIC分解+AI投资回报率 |
| `fmp_data` | 财报/比率/分析师预估 | 云业务增速+AI营收占比+CapEx强度 |
| `analyze_stock` | 技术面+基础指标 | 科技股动量+纳指相关性+期权流向 |
| `polymarket_events` | 预测市场概率 | 反垄断判决+AI监管+隐私法案概率 |

### 💡 专业投资skill (优先级: P1)
| Skill | 触发词 | 科技平台专业场景 |
|-------|--------|------------------|
| `/company-research-agent` | "全面研究" | Tier 3深度分析 - 平台生态+网络效应 |
| `/psychology-agent` | "市场情绪" | 科技股FOMO+AI炒作情绪+监管恐慌分析 |
| `/industry-cycle-analyzer` | "科技周期" | 半导体下行+云增长+AI投资周期判断 |
| `/smart-money-tracking-system` | "聪明钱" | 科技巨头回购+机构重新配置+对冲基金 |
| `/signal-monitoring-system` | "平台信号" | 用户增长+云迁移+AI采用率早期信号 |
| `/investment-logic-toolkit` | "第一性原理" | 网络效应+规模经济+平台飞轮分析 |

### 🤖 Agent协作工具 (优先级: P2)
| Skill | 用途 | 科技平台协作场景 |
|-------|------|------------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent并行：平台+监管+AI+财务+估值 |
| `/data-prefetch` | 自动数据预取 | 14数据源：财报+云数据+用户数据+监管进展 |
| `/cross-validation` | 数据冲突检验 | 不同源云营收+用户数+AI投资数据验证 |
| `/bear-case-generator` | 独立看空分析 | 反垄断拆分+AI泡沫破裂+监管重拳+用户流失 |
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

### 科技平台特化铁律 (K-M)
- **K** 平台评估强制: P轴(平台能力) × S轴(规模化能力) → 平台溢价系数计算
- **L** 监管风险强制: 反垄断/隐私/AI监管三重风险评估必须覆盖所有巨头
- **M** AI变现路径强制: 区分结构性AI收入vs概念炒作，量化AI对核心业务影响

## 科技平台行业专用规则 v26.0

### 💎 核心评估维度 (平台双轴P×S)

#### P轴: 平台能力评估 (Platform Power)
- **P1 网络效应**: 用户价值随网络规模增长的强度
- **P2 生态锁定**: 用户/开发者/合作伙伴转换成本
- **P3 数据护城河**: 数据规模优势+算法迭代能力
- **P4 平台控制力**: 对生态参与者的议价能力
- **P5 创新速度**: 新产品/服务推出频率和成功率

#### S轴: 规模化能力评估 (Scalability)
- **S1 边际成本**: 新增用户/业务的边际成本趋势
- **S2 运营杠杆**: 收入增长vs运营支出增长比率
- **S3 国际化**: 全球市场拓展能力和成功度
- **S4 跨界扩张**: 进入新业务领域的成功率
- **S5 技术架构**: 底层技术对规模扩张的支撑度

#### 平台溢价系数计算
```python
def tech_platform_premium(P_score, S_score):
    # 平台能力×规模化能力矩阵
    base_premium = P_score * S_score / 25  # 归一化到0-1

    if P_score >= 4 and S_score >= 4:
        return 1.3 + base_premium * 0.2  # 30-50%溢价
    elif P_score >= 3 and S_score >= 3:
        return 1.15 + base_premium * 0.15  # 15-30%溢价
    elif P_score >= 2 and S_score >= 2:
        return 1.05 + base_premium * 0.1   # 5-15%溢价
    else:
        return 1.0  # 无平台溢价
```

### 🏢 公司分类框架增强

| 类型 | 代表公司 | P+S典型值 | 分析重点 | 专用skill |
|------|----------|-----------|----------|--------------|
| **广告平台** | META, GOOG | P4+S4 | 用户时长+广告AI+监管风险 | `/psychology-agent` |
| **云服务** | MSFT, AMZN | P3+S5 | 企业迁移+AI工作负载+毛利率 | `/industry-cycle-analyzer` |
| **消费生态** | AAPL | P5+S3 | 硬件周期+服务占比+AI集成度 | `/signal-monitoring-system` |
| **电商平台** | AMZN | P4+S4 | 第三方占比+物流护城河+AWS协同 | `/smart-money-tracking-system` |
| **操作系统** | MSFT, GOOG | P5+S4 | 开发者生态+AI整合+订阅转化 | `/investment-logic-toolkit` |

### 📋 Phase执行指南 v26.0

#### Phase 0: 数据预取+温度计预评估
1. **强制调用**: `/investment-logic-toolkit` → 建立科技平台投资第一性原理
2. **数据预取**: `/data-prefetch` → 14数据源自动获取
3. **平台双轴初评**: 基于财报数据初步确定P+S分数
4. **监管风险扫描**: 反垄断/隐私/AI监管最新动态
5. **AI变现路径**: 区分概念炒作vs实际收入贡献

#### Phase 1: 公司分类+核心维度分析
1. **公司分类确认**: 5大类型精确归类 + 平台双轴精确评分
2. **网络效应分析**: `/investment-logic-toolkit` 深度分析生态强度
3. **周期精确定位**: `/industry-cycle-analyzer` → 科技投资周期
4. **数据交叉验证**: `/cross-validation` → 财务数据一致性检查

#### Phase 2: 竞争格局+监管动态
1. **聪明钱追踪**: `/smart-money-tracking-system` → 机构重新配置
2. **情绪分析**: `/psychology-agent` → 科技股情绪+AI炒作程度
3. **平台信号**: `/signal-monitoring-system` → 用户增长+云迁移信号
4. **并行分析**: `/dispatching-parallel-agents` → 3-5个独立维度

#### Phase 3: 深度建模+并行协作 ⭐
1. **强制并行**: 5Agent协作(平台+监管+AI+财务+估值)
2. **深度建模**: 网络效应曲线+AI投资回报+监管情景分析
3. **压力测试**: 反垄断拆分+用户流失+AI泡沫场景
4. **数据整合**: 多Agent输出数据一致性验证

#### Phase 4: 温度计验证+估值校准
1. **温度计复核**: `/investment-logic-toolkit` → 投资逻辑完整性检验
2. **对抗性分析**: `/bear-case-generator` → 独立看空分析
3. **平台溢价校准**: P×S双轴 → 溢价系数 → 估值调整
4. **敏感性分析**: 关键变量(监管/用户增长/AI投入)影响度量化

#### Phase 5: 报告合并+质量门控
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 科技平台专用指标验证
3. **投资建议**: 基于温度计+平台双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键指标

### 🔍 科技平台专用监控指标

#### 早期信号 (领先6-12个月)
- **用户行为**: DAU/MAU增长率+用户时长变化
- **开发者生态**: 新应用发布数量+开发者活跃度
- **企业采用**: 云服务试用转化率+AI功能使用率
- **监管动态**: 立法提案进展+监管机构表态

#### 同步指标 (当前状态)
- **财务表现**: 云业务增速+广告单价+AI营收占比
- **竞争格局**: 市场份额变化+新进入者威胁
- **技术领先**: 新产品发布频率+技术突破
- **估值水平**: 相对估值vs历史+同业比较

#### 滞后指标 (确认趋势)
- **盈利能力**: 运营杠杆+FCF转化率+ROIC趋势
- **战略执行**: 新业务贡献度+并购整合效果
- **ESG影响**: 监管合规成本+社会责任投入
- **长期价值**: 用户LTV+平台生态价值

## 文档索引 v26.0（按需加载）

### 🔥 新增核心文档 (v26.0)
| 文件 | 何时加载 |
|------|---------|
| `docs/investment_thermometer_strategy.md` | Phase 0+4温度计分析时 |
| `docs/architecture/mcp_tools_reference_v1.md` | 数据获取规划时 |
| `.claude/skills/investment-logic-toolkit.skill.md` | 底层逻辑分析时 |
| `docs/unified_worktree_framework_v26.md` | 框架升级参考时 |

### 📚 科技平台专用文档
| 文件 | 何时加载 |
|------|---------|
| `docs/industry/tech_platform.md` | 科技平台分析时 |
| `docs/platform_valuation_methodology.md` | 平台企业估值时 |
| `docs/regulatory_risk_assessment.md` | 监管风险分析时 |

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

### 🎯 **科技平台专业化**
- **平台双轴评估** 升级为P×S溢价计算公式
- **公司分类框架** 整合平台评分和专用skill
- **Phase执行指南** 详细到每个步骤的具体操作

### 🤖 **Agent协作标准化**
- **并行Agent强制** Phase 3的5Agent协作模式
- **数据交叉验证** Phase 0+1的标准检查流程
- **对抗性分析** Phase 4的独立看空机制

### 📊 **监控体系完善**
- **三层监控指标** 早期/同步/滞后的完整覆盖
- **实时跟踪** 从信号到验证的闭环监控
- **风险预警** 监管+竞争+技术的多维预警

**这是科技平台行业投资分析的v26.0革命性升级！**