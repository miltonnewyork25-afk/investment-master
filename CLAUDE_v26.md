# 投资研究 Agent — 半导体行业专用 v26.0

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、核心工具集、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 半导体 (代工/设计/设备/存储) |
| 行业框架 | `docs/industry/semiconductor.md` |
| 复杂度系数 | ×1.5 |
| 适用公司 | TSM, NVDA, AMD, ASML, LRCX, MU, INTC |

## 核心工具集 v26.0

### 🎯 投资温度计 (优先级: P0)
- **调用**: `/investment-logic-toolkit` 或提及"第一性原理/飞轮/护城河"
- **适用**: Phase 0(建立投资逻辑) + Phase 4(估值验证)
- **详见**: `docs/investment_thermometer_strategy.md`
- **半导体增强**: 结合AI双轴评估(L+S)进行温度校准

### 🔧 MCP数据工具 (优先级: P0)
| 工具 | 用途 | 半导体特化应用 |
|------|------|----------------|
| `baggers_summary` | 7维度38指标+宏观温度 | CAPE/Buffett与半导体周期叠加分析 |
| `fmp_data` | 财报/比率/分析师预估 | R&D强度+CapEx周期+毛利率趋势 |
| `analyze_stock` | 技术面+基础指标 | RSI与半导体库存周期关联度 |
| `polymarket_events` | 预测市场概率 | 地缘风险事件+AI政策变化概率 |

### 💡 专业投资skill (优先级: P1)
| Skill | 触发词 | 半导体专业场景 |
|-------|--------|----------------|
| `/company-research-agent` | "全面研究" | Tier 3深度分析 - 代工/设计差异化框架 |
| `/psychology-agent` | "市场情绪" | PMSI情绪+AI炒作周期心理分析 |
| `/industry-cycle-analyzer` | "周期判断" | P1-P5周期精确定位+6层雷达信号 |
| `/smart-money-tracking-system` | "聪明钱" | 台积电ADR vs 本地股溢价+机构配置 |
| `/signal-monitoring-system` | "早期信号" | 设备订单+晶圆厂稼动率+AI芯片need |
| `/investment-logic-toolkit` | "第一性原理" | 摩尔定律+制程优势+AI结构性需求分析 |

### 🤖 Agent协作工具 (优先级: P2)
| Skill | 用途 | 半导体协作场景 |
|-------|------|----------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent并行：周期+地缘+技术+财务+估值 |
| `/data-prefetch` | 自动数据预取 | 14数据源：财报+设备订单+晶圆价格+政策 |
| `/cross-validation` | 数据冲突检验 | 不同源CapEx数据+制程节点时间表验证 |
| `/bear-case-generator` | 独立看空分析 | 地缘断供+AI需求见顶+制程边际效应递减 |
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

### 半导体特化铁律 (K-L)
- **K** AI评估强制: L轴(技术深度) + S轴(商业兑现) → 溢价系数计算
- **L** 地缘风险强制: 台海/出口管制/供应链评估必须覆盖所有主要公司

## 半导体行业专用规则 v26.0

### 💎 核心评估维度 (AI双轴增强)

#### L轴: 技术深度评估
- **L0 概念阶段**: 仅有技术展示，无商业化路径
- **L1 产品原型**: 有demo，技术可行性验证
- **L2 量产就绪**: 制程稳定，良率达标，成本可控
- **L3 技术领先**: 领先竞争对手1-2代，护城河建立
- **L4 平台收税**: 成为行业标准，收取技术授权费

#### S轴: 商业兑现评估
- **S0 <5%营收**: AI相关营收占比<5%
- **S1 5-15%**: AI成为重要业务线，但非主引擎
- **S2 15-35%**: AI成为核心增长驱动之一
- **S3 35-60%**: AI成为主要营收来源
- **S4 60-80%**: 业务高度依赖AI，周期同步
- **S5 >80%**: AI原生公司，增长完全由AI驱动

#### 溢价系数计算
```python
def semiconductor_ai_premium(L_score, S_score):
    if L_score >= 3 and S_score >= 3:
        return 1.2 + (L_score-3)*0.1 + (S_score-3)*0.1  # 20-50%溢价
    elif L_score >= 2 and S_score >= 2:
        return 1.1 + (L_score-2)*0.05 + (S_score-2)*0.05  # 10-20%溢价
    else:
        return 1.0  # 无AI溢价
```

### 🏢 公司分类框架增强

| 类型 | 代表公司 | L+S典型值 | 分析重点 | 专用skill |
|------|----------|-----------|----------|-----------|
| **AI芯片设计** | NVDA, AMD | L4+S4 | AI需求验证+技术代差+生态锁定 | `/signal-monitoring-system` |
| **代工厂** | TSM, SMIC | L3+S2 | 地缘风险+先进制程+稼动率 | `/smart-money-tracking-system` |
| **设备厂商** | ASML, LRCX | L4+S1 | 技术垄断+资本开支周期+供应链 | `/industry-cycle-analyzer` |
| **存储芯片** | MU, SK海力士 | L1+S1 | 供需周期+价格弹性+库存管理 | `/psychology-agent` |
| **传统逻辑** | INTC, QCOM | L2+S1 | 转型能力+市份流失+成本优化 | `/bear-case-generator` |

### 📋 Phase执行指南 v26.0

#### Phase 0: 数据预取+温度计预评估
1. **强制调用**: `/investment-logic-toolkit` → 建立半导体投资第一性原理
2. **数据预取**: `/data-prefetch` → 14数据源自动获取
3. **AI双轴初评**: 基于财报数据初步确定L+S分数
4. **地缘风险扫描**: 台海/美中关系/出口管制最新动态
5. **周期雷达初判**: P1-P5周期位置初步判断

#### Phase 1: 公司分类+核心维度分析
1. **公司分类确认**: 5大类型精确归类 + AI双轴精确评分
2. **技术护城河**: `/investment-logic-toolkit` 深度分析制程/专利优势
3. **周期精确定位**: `/industry-cycle-analyzer` → 6层雷达信号
4. **数据交叉验证**: `/cross-validation` → 财务数据一致性检查

#### Phase 2: 竞争格局+市场动态
1. **聪明钱追踪**: `/smart-money-tracking-system` → 机构配置变化
2. **情绪分析**: `/psychology-agent` → PMSI指数+AI炒作情绪
3. **早期信号**: `/signal-monitoring-system` → 设备订单+需求拐点
4. **并行分析**: `/dispatching-parallel-agents` → 3-5个独立维度

#### Phase 3: 深度建模+并行协作 ⭐
1. **强制并行**: 5Agent协作(周期+地缘+技术+财务+估值)
2. **深度建模**: 制程迁移曲线+AI需求弹性+供应链韧性
3. **压力测试**: 地缘风险+需求见顶+技术路线颠覆场景
4. **数据整合**: 多Agent输出数据一致性验证

#### Phase 4: 温度计验证+估值校准
1. **温度计复核**: `/investment-logic-toolkit` → 投资逻辑完整性检验
2. **对抗性分析**: `/bear-case-generator` → 独立看空分析
3. **AI溢价校准**: L+S双轴 → 溢价系数 → 估值调整
4. **敏感性分析**: 关键变量(制程/需求/地缘)影响度量化

#### Phase 5: 报告合并+质量门控
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 半导体专用指标验证
3. **投资建议**: 基于温度计+AI双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键指标

### 🔍 半导体专用监控指标

#### 早期信号 (领先6-12个月)
- **设备订单**: ASML/LAM订单金额YoY变化
- **晶圆厂建设**: 新厂capex公告数量和规模
- **库存周期**: 渠道库存天数变化趋势
- **AI芯片设计**: 新品tape-out数量和规格

#### 同步指标 (当前状态)
- **稼动率**: 主要foundry capacity utilization
- **价格趋势**: 晶圆代工价格+存储器现货价
- **市场份额**: 各制程节点的市份分布
- **R&D强度**: 研发支出/营收比例变化

#### 滞后指标 (确认趋势)
- **财务表现**: 毛利率+营收增长率
- **技术突破**: 新制程量产时间表
- **市场采用**: 新技术的客户adoption rate
- **地缘影响**: 实际供应链中断事件

## 文档索引 v26.0（按需加载）

### 🔥 新增核心文档 (v26.0)
| 文件 | 何时加载 |
|------|---------|
| `docs/investment_thermometer_strategy.md` | Phase 0+4温度计分析时 |
| `docs/architecture/mcp_tools_reference_v1.md` | 数据获取规划时 |
| `.claude/skills/investment-logic-toolkit.skill.md` | 底层逻辑分析时 |
| `docs/unified_worktree_framework_v26.md` | 框架升级参考时 |

### 📚 半导体专用文档
| 文件 | 何时加载 |
|------|---------|
| `docs/industry/semiconductor.md` | 半导体分析时 |
| `docs/semiconductor_quality_standards.md` | 质量标准/评分/铁律 |
| `docs/semiconductor_research_protocol.md` | v20.0调研协议/预测市场模块 |

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

### 🎯 **半导体专业化**
- **AI双轴评估** 升级为溢价计算公式
- **公司分类框架** 整合L+S评分和专用skill
- **Phase执行指南** 详细到每个步骤的具体操作

### 🤖 **Agent协作标准化**
- **并行Agent强制** Phase 3的5Agent协作模式
- **数据交叉验证** Phase 0+1的标准检查流程
- **对抗性分析** Phase 4的独立看空机制

### 📊 **监控体系完善**
- **三层监控指标** 早期/同步/滞后的完整覆盖
- **实时跟踪** 从信号到验证的闭环监控
- **风险预警** 地缘+周期+技术的多维预警

**这是半导体行业投资分析的v26.0革命性升级！**