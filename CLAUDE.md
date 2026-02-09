# 投资研究 Agent — 消费品行业专用 v26.0

> 通用框架规则见 `docs/` 目录按需加载。本文件仅含行业配置、核心工具集、铁律速查、文档路由。

## 行业配置

| 项目 | 值 |
|------|-----|
| 行业 | 消费品 (日用消费/零售/餐饮/奢侈品) |
| 行业框架 | `docs/industry/consumer.md` |
| 复杂度系数 | ×1.5 |
| 适用公司 | PG, KO, NKE, COST, WMT, MCD, SBUX, LVMH, AMZN(零售) |

## 核心工具集 v26.0

### 🎯 投资温度计 (优先级: P0)
- **调用**: `/investment-logic-toolkit` 或提及"第一性原理/飞轮/护城河"
- **适用**: Phase 0(建立投资逻辑) + Phase 4(估值验证)
- **详见**: `docs/investment_thermometer_strategy.md`
- **消费品增强**: 结合品牌双轴评估(B×M)进行温度校准

### 🔧 MCP数据工具 (优先级: P0)
| 工具 | 用途 | 消费品特化应用 |
|------|------|----------------|
| `baggers_summary` | 7维度38指标+宏观温度 | ROE分解+品牌价值量化+会员制分析 |
| `fmp_data` | 财报/比率/分析师预估 | 毛利率趋势+库存周转+广告ROI |
| `analyze_stock` | 技术面+基础指标 | 消费信心指数与股价关联度 |
| `polymarket_events` | 预测市场概率 | 消费趋势+监管变化+品牌危机概率 |

### 💡 专业投资skill (优先级: P1)
| Skill | 触发词 | 消费品专业场景 |
|-------|--------|----------------|
| `/consumer-brand-analysis-toolkit` | "品牌价值/护城河" | 品牌资产量化+忠诚度分层+转换成本 |
| `/company-research-agent` | "全面研究" | Tier 3深度分析 - 消费者行为+渠道分析 |
| `/psychology-agent` | "消费心理" | 消费者认知偏误+品牌情感价值分析 |
| `/smart-money-tracking-system` | "聪明钱" | 巴菲特系+长期价值投资者持仓分析 |
| `/industry-cycle-analyzer` | "消费周期" | 消费升级/降级周期+库存周期判断 |
| `/investment-logic-toolkit` | "第一性原理" | 消费需求本质+品牌飞轮+网络效应分析 |
| `/signal-monitoring-system` | "消费信号" | 社交媒体热度+门店客流+新品接受度 |

### 🤖 Agent协作工具 (优先级: P2)
| Skill | 用途 | 消费品协作场景 |
|-------|------|----------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent并行：品牌+渠道+财务+竞争+估值 |
| `/data-prefetch` | 自动数据预取 | 14数据源：财报+消费数据+社交媒体+渠道 |
| `/cross-validation` | 数据冲突检验 | 不同源销售数据+门店数量+市场份额验证 |
| `/bear-case-generator` | 独立看空分析 | 消费降级+新品牌冲击+渠道颠覆+ESG风险 |
| `/report-merger` | 多Agent产出合并 | Phase 5: 5Agent输出→单一Complete报告 |
| `/flywheel-diagnosis` | 飞轮诊断 | 品牌飞轮+会员飞轮状态诊断和量化 |

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

### 消费品特化铁律 (K-M)
- **K** 品牌评估强制: B轴(品牌强度) × M轴(货币化能力) → 品牌溢价系数计算
- **L** 消费者洞察强制: 必须调用消费心理+社交信号+渠道数据的三重验证
- **M** 飞轮诊断强制: 品牌飞轮/会员飞轮状态诊断，量化加速/减速趋势

## 消费品行业专用规则 v26.0

### 💎 核心评估维度 (品牌双轴B×M)

#### B轴: 品牌强度评估 (Brand Strength)
- **B1 认知度**: 品牌知名度，消费者第一提及率
- **B2 偏好度**: 品牌偏好，购买意愿相对竞品
- **B3 忠诚度**: 复购率，价格容忍度，推荐意愿
- **B4 差异化**: 独特卖点，难以替代程度
- **B5 情感度**: 品牌情感连接，文化符号价值

#### M轴: 货币化能力评估 (Monetization Power)
- **M1 定价权**: 提价能力，价格弹性系数
- **M2 渗透率**: 市场份额增长潜力，渠道覆盖
- **M3 延展性**: 品牌延伸能力，新品类成功率
- **M4 效率化**: 营销ROI，渠道效率，规模经济
- **M5 平台化**: 生态系统能力，网络效应强度

#### 品牌溢价系数计算
```python
def consumer_brand_premium(B_score, M_score):
    # 品牌强度×货币化能力矩阵
    base_premium = B_score * M_score / 25  # 归一化到0-1

    if B_score >= 4 and M_score >= 4:  # 顶级品牌
        return 1.3 + base_premium * 0.5  # 30-80%溢价
    elif B_score >= 3 and M_score >= 3:  # 强势品牌
        return 1.15 + base_premium * 0.3  # 15-45%溢价
    elif B_score >= 2 and M_score >= 2:  # 区域品牌
        return 1.05 + base_premium * 0.15  # 5-20%溢价
    else:  # 弱品牌/商品化
        return 1.0  # 无品牌溢价
```

### 🏢 公司分类框架增强

| 类型 | 代表公司 | B×M典型值 | 分析重点 | 专用skill |
|------|----------|-----------|----------|-----------|
| **全球顶级品牌** | KO, NKE, LVMH | B5×M4 | 品牌生态系统+全球化+数字转型 | `/consumer-brand-analysis-toolkit` |
| **平台型零售** | COST, AMZN | B3×M5 | 会员飞轮+网络效应+运营效率 | `/flywheel-diagnosis` |
| **快消品巨头** | PG, UL | B4×M3 | 产品组合+渠道控制+创新管线 | `/industry-cycle-analyzer` |
| **连锁餐饮** | MCD, SBUX | B4×M4 | 标准化复制+单店模型+数字化 | `/smart-money-tracking-system` |
| **新兴品牌** | 各种DTC | B2×M2 | 增长速度+用户获取成本+留存 | `/psychology-agent` |

### 📋 Phase执行指南 v26.0 (消费品专用)

#### Phase 0: 品牌温度计预评估 ⭐
1. **投资温度计**: `/investment-logic-toolkit` → 消费需求第一性原理
2. **品牌双轴初评**: 基于公开数据初步确定B×M分数
3. **飞轮识别**: 品牌飞轮vs会员飞轮vs平台飞轮类型判断
4. **消费周期扫描**: 消费升级/降级宏观环境+细分品类趋势
5. **数据预取**: `/data-prefetch` → 财报+消费数据+社交媒体

#### Phase 1: 品牌深度分析+公司分类 ⭐
1. **品牌资产量化**: `/consumer-brand-analysis-toolkit` → 四大方法论
2. **公司分类确认**: 5大类型精确归类 + B×M双轴精确评分
3. **消费者洞察**: `/psychology-agent` → 消费行为+决策偏误分析
4. **数据交叉验证**: `/cross-validation` → 销售数据一致性检查
5. **竞品基准**: 同类型公司B×M评分对比分析

#### Phase 2: 渠道生态+市场动态 ⭐
1. **聪明钱追踪**: `/smart-money-tracking-system` → 价值投资者配置
2. **消费信号监控**: `/signal-monitoring-system` → 社交热度+门店客流
3. **周期精确定位**: `/industry-cycle-analyzer` → 消费周期+库存周期
4. **并行渠道分析**: `/dispatching-parallel-agents` → 3-5个渠道维度
5. **预测市场扫描**: 消费趋势+品牌事件+监管变化概率

#### Phase 3: 深度建模+飞轮诊断 ⭐
1. **强制并行**: 5Agent协作(品牌+渠道+财务+竞争+估值)
2. **飞轮状态诊断**: `/flywheel-diagnosis` → 加速/稳态/减速量化
3. **深度建模**: 品牌价值模型+渠道投资回报+消费者LTV
4. **压力测试**: 消费降级+新品牌冲击+渠道变革+ESG风险
5. **数据整合**: 多Agent输出数据一致性验证

#### Phase 4: 温度计验证+品牌估值 ⭐
1. **温度计复核**: `/investment-logic-toolkit` → 品牌投资逻辑检验
2. **对抗性分析**: `/bear-case-generator` → 独立品牌威胁分析
3. **品牌溢价校准**: B×M双轴 → 溢价系数 → 估值调整
4. **敏感性分析**: 关键变量(品牌力/渗透率/定价权)影响度量化
5. **消费者验证**: 实际消费者调研数据vs模型预测对比

#### Phase 5: 报告合并+投资建议 ⭐
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 消费品专用指标验证
3. **投资建议**: 基于温度计+品牌双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键消费指标

### 🔍 消费品专用监控指标

#### 品牌健康度指标 (季度跟踪)
- **品牌力度量**: NPS分数、品牌提及率、情感分析得分
- **市场表现**: 市场份额变化、新品成功率、渠道覆盖
- **定价权验证**: 涨价后销量变化、价格弹性系数
- **忠诚度指标**: 复购率、客户LTV、流失率

#### 消费趋势信号 (月度监控)
- **社交媒体**: 品牌热度指数、UGC内容量、话题传播
- **搜索趋势**: Google Trends、电商搜索量、关键词排名
- **门店数据**: 客流量、转化率、客单价、库存周转
- **竞争动态**: 新品发布、营销投入、渠道扩张

#### 财务健康度指标 (实时监控)
- **营收质量**: 同店增长、新店贡献、价格vs量贡献
- **利润率趋势**: 毛利率、营销费用率、供应链效率
- **现金创造**: 营运资本变化、自由现金流、ROIC
- **投资回报**: 广告ROI、新品投入回报、渠道投资效率

### 🎯 消费品特色分析框架

#### 会员制企业专用 (COST等)
```markdown
### 会员飞轮分析
1. **会员价值**: 会员费收入稳定性+会员续费率+获客成本
2. **商品策略**: Kirkland自有品牌渗透率+供应商议价力
3. **运营效率**: 库存周转+坪效+人效+供应链优化
4. **扩张模型**: 新店投资回报+选址策略+区域渗透
```

#### 品牌组合企业专用 (PG等)
```markdown
### 品牌组合优化
1. **品牌矩阵**: 核心品牌vs边缘品牌价值贡献分析
2. **创新管线**: R&D投入→新品成功率→市场份额增长
3. **渠道协同**: 品牌间渠道共享+交叉销售+议价力
4. **组合调整**: 剥离低效品牌+收购补强+品牌重塑
```

#### DTC新兴品牌专用
```markdown
### 数字原生分析
1. **增长引擎**: CAC vs LTV模型+病毒系数+增长hack
2. **数据资产**: 用户画像精度+个性化能力+预测准确率
3. **供应链**: 柔性制造+库存管理+质量控制
4. **品牌建设**: 社群运营+内容营销+KOL合作效果
```

## 文档索引 v26.0（按需加载）

### 🔥 新增核心文档 (v26.0)
| 文件 | 何时加载 |
|------|---------|
| `docs/investment_thermometer_strategy.md` | Phase 0+4温度计分析时 |
| `docs/architecture/mcp_tools_reference_v1.md` | 数据获取规划时 |
| `.claude/skills/investment-logic-toolkit.skill.md` | 底层逻辑分析时 |
| `.claude/skills/consumer-brand-analysis-toolkit/SKILL.md` | 品牌分析时 |
| `docs/unified_worktree_framework_v26.md` | 框架升级参考时 |

### 📚 消费品专用文档
| 文件 | 何时加载 |
|------|---------|
| `docs/industry/consumer.md` | 消费品分析时 |
| `skills/membership_business_model_analysis_system.md` | 会员制企业(COST等) |
| `skills/retail_operations_analysis_toolkit.md` | 坪效/人效/供应链 |
| `skills/consumer_behavior_analysis_toolkit.md` | 客户分层/LTV计算 |

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

## v26.0升级亮点 - 消费品特化

### 🎯 **品牌双轴评估创新**
- **B×M矩阵**: 品牌强度×货币化能力的二维评估体系
- **溢价系数公式**: 量化品牌价值对估值的具体影响
- **动态跟踪**: 季度品牌健康度+月度消费趋势监控

### 🛒 **消费品专业化工具集**
- **品牌分析**: 专用的4大品牌价值量化方法论
- **飞轮诊断**: 会员飞轮+品牌飞轮状态自动诊断
- **消费心理**: 认知偏误+购买决策+情感价值分析

### 🤝 **Agent协作优化**
- **5Agent并行**: 品牌+渠道+财务+竞争+估值专业分工
- **三重验证**: 消费心理+社交信号+渠道数据的交叉验证
- **实时监控**: 品牌健康度+消费趋势+财务指标立体监控

### 📊 **公司分类精准化**
- **5大类型**: 从全球顶级品牌到新兴DTC的完整覆盖
- **专用框架**: 会员制+品牌组合+DTC的差异化分析模板
- **Skill映射**: 每种类型配备最适合的专业skill

**消费品v26.0 = 品牌分析专业化 + 工具集成标准化 + Agent协作智能化！**