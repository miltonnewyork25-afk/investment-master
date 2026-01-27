# 投资大师 Agent 架构总览
# 版本: v1.0 | 日期: 2026-01-27
# 目的: 供与ChatGPT讨论完善Agent设计使用

---

## 一、项目背景

**投资大师**是一个AGI级买方投资研究系统，目标是产出**超越顶级分析师深度**的公司研究报告（≥20,000字）。

### 核心设计原则
1. **证据链闭环**: 每个判断必须满足「证据→推理→可观测验证信号」
2. **行业自适应**: 自动识别公司类型，加载对应的专业Skill
3. **自主超越**: 每次运行必须超越上次，否则触发质量上限声明
4. **多Agent协作**: 主Agent调度多个专业SubAgent完成复杂任务

---

## 二、Agent层级架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    投资大师 主控制器                              │
│                  (CLAUDE.md v7.0 定义)                           │
│  职责: 任务分发、行业识别、Skill调度、质量闸门、输出整合            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Company       │   │ Marketing     │   │ Psychology    │
│ Research      │   │ Agent         │   │ Agent         │
│ Agent         │   │ v4.0          │   │ v1.0          │
│ v1.0          │   │               │   │               │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        ▼                   ▼                   ▼
   [调用专业Skills]    [调用营销Skills]    [调用心理Skills]
```

---

## 三、主Agent详解

### Agent 1: Company Research Agent (公司研究Agent) v1.0

**文件**: `.claude/skills/company-research-agent.skill.md`

**角色定义**:
```yaml
identity:
  primary: 买方投研合伙人
  secondary: 反方审计官 + 财务拆解师
  stance: 三重视角同时运行
```

**核心任务**:
1. 接收公司名/股票代码 + 资料链接
2. 执行顶级投资者视角扫描（Step 0）
3. 生成9大栏目结构化备忘录
4. 自检评分（100分制，85分通过线）
5. 定向超越重写直到超越上次
6. 写入EVOLUTION_LOG

**9大栏目硬锁**:
| # | 栏目 | 核心输出 |
|---|------|---------|
| 1 | 定价主线(≤12行) | 市场在为什么付费？忽视了什么？ |
| 2 | 业务机制 | 价值创造→传递→捕获 + 反馈回路 |
| 3 | 财务机制 | 驱动公式 + 边际变化 + 质量检验 |
| 4 | 竞争与护城河 | 类型+强度+证伪条件 |
| 5 | 资本配置与治理 | 5年配置回报 + 激励对齐 + 内部人交易 |
| 6 | 反证与风险 | Steelman空头论点 + 不对称风险 |
| 7 | 催化与时间表 | 3-12月事件日历 |
| 8 | 可观测信号清单 | 每主线≥3信号(指标+阈值+窗口) |
| 9 | 待核实队列 | 缺证据的判断暂存区 |

**评分维度**(满分100):
| 维度 | 权重 | 说明 |
|------|------|------|
| 证据链完整度 | 15% | 来源+时间戳+原文引用 |
| 机制解释深度 | 15% | Level 3+机制层 |
| 反证强度 | 10% | Steelman级反驳 |
| 可观测信号质量 | 15% | 阈值+时间窗口 |
| 结构与信息密度 | 10% | 无废话 |
| 不确定性处理 | 10% | 置信度+情景分析 |
| 语言专业度 | 10% | 无违禁表达 |
| 弱点修复覆盖率 | 15% | 上次Top5缺陷修复 |

---

### Agent 2: Marketing Agent (营销Agent) v4.0

**文件**: `.claude/skills/marketing-agent.skill.md`

**角色定义**:
```yaml
identity: AGI级超级营销Agent
level: 8
meta_theories: 36个
```

**核心能力**:
1. **选题引擎(5D)**: Virality×Growth×Timing×Uniqueness×Debate
2. **标题引擎(8D)**: Hook×Emotion×Accuracy×Debate×Length×Identity×Numbers×Shareability
3. **合成受众模拟**: 210人格(7类×30变体)预发布测试
4. **5平台适配**: X/YouTube/Reddit/雪球/小红书
5. **平台增长科学**: K因子工程、幂律突破、内容飞轮

**三条铁律**:
1. **去身份化+合规**: 无AI/无"我"/无买卖建议
2. **忠实原文**: 标题不超出内容范围
3. **洞察驱动**: 传播力来自认知冲突，非夸张

**子模块**:
| 模块 | 文件 | 功能 |
|------|------|------|
| 选题引擎 | `topic-selection-engine.md` | 5D评分+10超级角度 |
| 标题引擎 | `super-headline-engine.md` | 7心理原理+8D评分 |
| 合成受众 | 内置协议 | 210人格A/B/C测试 |
| 元知识库 | `meta-knowledge-library.md` | 36个营销元理论 |
| 高增长账号库 | `high-growth-accounts-intelligence.md` | 平台增长规律 |

---

### Agent 3: Psychology Agent (心理学Agent) v1.0

**文件**: `.claude/skills/psychology-agent.skill.md`

**角色定义**:
```yaml
identity: 行为金融学+AGI心理学分析引擎
theory_base: Prospect Theory + CPT + 认知偏误
```

**核心能力**:
1. **CPT实时分析**: Crowd Psychology Temperature (0-100)
2. **心理学修正评分**: 三层修正机制
3. **认知偏误检测**: 识别分析中的系统性偏差
4. **合成投资者调研**: 模拟不同投资者反应
5. **逆周期信号**: 极端情绪时的逆向建议

**CPT解读规则**:
| CPT范围 | 状态 | 信号 | 评分调整 |
|---------|------|------|---------|
| 0-15 | 极度恐惧 | 逆向买入 | +15分 |
| 15-30 | 恐惧 | 观察买点 | +7.5分 |
| 30-70 | 中性 | 正常 | 0分 |
| 70-85 | 贪婪 | 减仓准备 | -7.5分 |
| 85-100 | 极度贪婪 | 逆向卖出 | -15分 |

---

## 四、专业Skill库详解（按领域分类）

### 4.1 研究机制类 (Research Mechanism)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `controller_spec_analysis_framework` | v4.2 | 控制权/治理结构分析 | 治理评分+风险标记 |
| `first_principles_analysis_protocol` | v1.2 | 第一性原理分析协议 | 因果链条+证伪条件 |
| `macro_industry_cycle_analysis` | v1.3 | 宏观/行业周期分析 | 周期位置+转折信号 |
| `systemic_foresight_strategic_analysis` | v1.2 | 系统性前瞻分析 | 情景矩阵+概率权重 |
| `competitive_advantage_models_quickref` | v1.2 | 竞争优势模型速查 | 护城河类型+强度 |
| `competitive_analysis_framework` | v1.3 | 竞争分析框架 | AI能力+芯片战略对比 |
| `moat_evaluation_framework` | v1.3 | 护城河评估框架 | Moat_Score + 侵蚀风险 |
| `brand_experience_analysis` | v1.0 | 品牌体验分析 | 品牌资产+情感连接 |

### 4.2 估值类 (Valuation)

| Skill ID | 版本 | 适用场景 | 输出 |
|----------|------|---------|------|
| `high_growth_tech_valuation_framework` | v1.2 | 高增长科技公司 | DCF+可比+期权 |
| `ai_option_valuation` | v1.0 | AI期权业务估值 | 期权价值叠加 |
| `capex_intensive_valuation` | v1.0 | 高CapEx期公司 | 正常化FCF+真实ROIC |
| `robotaxi_valuation` | v1.0 | Robotaxi业务 | TAM渗透+期权定价 |
| `regulatory_risk_framework` | v1.0 | 监管风险量化 | 风险折价+情景概率 |

### 4.3 生态系统图谱类 (Ecosystem Graph) — 6模块流水线

| 位置 | Skill ID | 功能 | 上游依赖 |
|------|----------|------|---------|
| 1/6 | `role_map` | 识别玩家+分配角色 | 无 |
| 2/6 | `flow_rules_graph` | 画价值流动+规则制定者 | role_map |
| 3/6 | `competition_surface` | 量化竞争激烈度 | flow_rules_graph |
| 4/6 | `substitute_classifier` | 判断替代关系 | competition_surface |
| 5/6 | `disruption_qualification` | 判断颠覆资格(Christensen严格定义) | substitute_classifier |
| 6/6 | `adjacency_shared_constraint` | 识别共享约束创造的战略邻接 | All previous |

**补充模块**:
| Skill ID | 版本 | 功能 |
|----------|------|------|
| `network_effect_evaluator` | v1.1 | 网络效应评估(11模块) |
| `product_matrix_network_analysis` | v1.2 | 产品矩阵网络化分析 |
| `platform_portfolio_matrix` | v1.0 | 替代BCG的平台分析矩阵 |

### 4.4 护城河/数据分析类 (Moat Analysis)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `data_moat_quantifier` | v1.0 | 数据护城河量化 | DM_Score(0-100) |

### 4.5 竞争分析类 (Competitive Analysis)

| Skill ID | 版本 | 适用场景 | 输出 |
|----------|------|---------|------|
| `ai_competitive_landscape` | v1.0 | AI竞争格局 | AIC_Score + 5维度评估 |
| `cloud_competitive_tracker` | v1.0 | 云业务竞争 | AWS/Azure/GCP对比 |

### 4.6 宏观分析类 (Macro Analysis)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `macro_liquidity_regime` | v1.0 | 宏观流动性体制 | 体制识别+资产配置建议 |
| `advertising_cycle_indicator` | v1.0 | 广告周期指标 | 周期位置+领先信号 |

### 4.7 影响模型类 (Impact Models)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `zero_click_impact_model` | v1.0 | 零点击率收入影响 | 收入影响量化 |

### 4.8 消费者分析类 (Consumer Analysis)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `consumer_behavior_analyst` | v3.0 | 消费者行为分析 | 用户画像+决策路径 |

### 4.9 品牌策略类 (Brand Strategy)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `brand_emotion_control_system` | v1.0 | 品牌情绪控制 | 情感策略+触发点 |

### 4.10 数据完整性类 (Data Integrity)

| Skill ID | 版本 | 功能 | 输出 |
|----------|------|------|------|
| `forensic_financial_analysis` | v2.3 | 财务取证分析 | 红旗标记+操纵检测 |

---

## 五、行业→Skill自动映射规则

```yaml
industry_skill_mapping:

  ai_tech_platform:  # Google/Meta/Amazon/Microsoft/Anthropic/OpenAI
    required:
      - network_effect_evaluator_v1.1     # 11模块网络效应
      - data_moat_quantifier_v1.0         # DM_Score数据护城河
      - platform_portfolio_matrix_v1.0    # 替代BCG的平台矩阵
      - ai_competitive_landscape_v1.0     # AI竞争格局追踪
      - capex_intensive_valuation_v1.0    # CapEx正常化估值
    optional:
      - zero_click_impact_model_v1.0      # 搜索广告公司
      - cloud_competitive_tracker_v1.0    # 云业务公司
      - advertising_cycle_indicator_v1.0  # 广告驱动公司
      - robotaxi_valuation_v1.0           # Waymo/Tesla

  saas_subscription:  # Salesforce/Adobe/ServiceNow
    required:
      - arr_cohort_analysis               # ARR拆解
      - rule_of_40                        # 效率指标
      - net_dollar_retention              # 净收入留存
    optional:
      - moat_evaluation_framework_v1.3

  semiconductor:  # LRCX/AMAT/ASML/TSM
    required:
      - macro_industry_cycle_analysis_v1.3  # 周期分析
      - controller_spec_analysis_framework_v4.2  # 供应链控制
    optional:
      - first_principles_analysis_protocol_v1.2

  platform_marketplace:  # Airbnb/Uber/DoorDash
    required:
      - network_effect_evaluator_v1.1
      - platform_portfolio_matrix_v1.0
    optional:
      - data_moat_quantifier_v1.0

  consumer_brand:  # Nike/Lululemon/Apple(消费属性)
    required:
      - consumer_behavior_analyst_v3.0
      - brand_emotion_control_system_v1.0
      - brand_experience_analysis_v1.0
    optional:
      - moat_evaluation_framework_v1.3
```

---

## 六、质量闸门与进化机制

### 6.1 多级质量闸门

```yaml
quality_gates:

  gate_1_evidence_chain:
    check: 每个判断是否有「证据→推理→信号」
    fail_action: 移动到【待核实队列】

  gate_2_structure:
    check: 是否符合结构硬锁
    fail_action: 补全或调整

  gate_3_language:
    check: 是否有违禁表达
    fail_action: 立即重写

  gate_4_score:
    check: 总分是否≥85
    fail_action: 定向重写直到通过

  gate_5_transcendence:
    check: 本次得分是否>上次得分
    fail_action: 再次重写或触发质量上限声明
```

### 6.2 进化日志 (EVOLUTION_LOG)

**位置**: `research/EVOLUTION_LOG.md`

**每次运行追加记录**:
- RUN_ID + 时间戳 + 公司
- 上次得分 vs 本次得分 (Δ)
- 本次超越点(最多5条)
- 仍未解决的缺口
- 下次优先修复Top3
- 质量上限声明(若适用)

---

## 七、待讨论/完善的问题

### 7.1 Agent层面
1. Company Research Agent 的9大栏目是否需要调整？
2. 是否需要独立的 Valuation Agent？
3. Psychology Agent 与 Company Research Agent 如何协作？
4. 是否需要 Data Fetching Agent 统一处理数据获取？

### 7.2 Skill层面
1. Ecosystem Graph 6模块流水线是否需要简化？
2. 估值类Skill如何根据行业自动选择？
3. 是否需要 Quality Gate Agent 专门负责质量检验？

### 7.3 协作层面
1. 多Agent并行执行时如何避免冲突？
2. Skill之间的依赖关系如何管理？
3. 进化日志如何跨Agent共享？

### 7.4 输出层面
1. 是否需要统一的输出格式规范？
2. 不同受众(内部/外部)如何适配？
3. 多语言输出(中/英)如何处理？

---

## 八、附录：文件索引

```
投资大师/
├── CLAUDE.md                          # 主控制器规则 v7.0
├── .claude/skills/
│   ├── company-research-agent.skill.md   # 公司研究Agent
│   ├── marketing-agent.skill.md          # 营销Agent v4.0
│   └── psychology-agent.skill.md         # 心理学Agent
├── skills/
│   ├── research_mechanism/            # 研究机制类Skills
│   ├── valuation/                     # 估值类Skills
│   ├── valuation_engine/              # 估值引擎
│   ├── ecosystem_graph/               # 生态系统图谱类Skills
│   ├── ecosystem_analysis/            # 生态系统分析
│   ├── moat_analysis/                 # 护城河分析
│   ├── competitive_analysis/          # 竞争分析
│   ├── macro_analysis/                # 宏观分析
│   ├── impact_models/                 # 影响模型
│   ├── consumer_analysis/             # 消费者分析
│   ├── brand_strategy/                # 品牌策略
│   ├── data_integrity/                # 数据完整性
│   └── SKILL_UPGRADE_ROADMAP_v1.0.md  # Skill升级路线图
├── marketing/
│   └── strategy/
│       ├── super-headline-engine.md   # 标题引擎
│       ├── topic-selection-engine.md  # 选题引擎
│       ├── meta-knowledge-library.md  # 元知识库
│       └── high-growth-accounts-intelligence.md  # 增长账号库
└── research/
    └── EVOLUTION_LOG.md               # 进化日志
```

---

**文档版本**: v1.0
**更新日期**: 2026-01-27
**用途**: 与ChatGPT讨论完善Agent设计
