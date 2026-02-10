# 生态科技行业深度参考 v27.0

> 按需加载。CLAUDE.md 仅保留速查，本文件包含完整公式、Phase执行指南、监控指标、ESG框架。
> **v27.0新增**: 期权估值模块(OVM)集成 — 解决TSLA/PLTR等高期权公司估值脱节问题。详见 `docs/optionality_valuation.md`

---

## 环境双轴 E×V 详细维度

### E轴: 环境影响力评估 (Environmental Impact)
- **E1 碳减排量**: 实际CO₂减排贡献，生命周期评估
- **E2 资源效率**: 能源/水/材料使用效率vs传统方案
- **E3 循环经济**: 废料回收利用+产品生命周期延展
- **E4 生态系统**: 生物多样性保护+土壤/水体影响
- **E5 技术扩散**: 技术可复制性+全球减排潜力

### V轴: 商业可行性评估 (Viability)
- **V1 成本竞争力**: LCOE vs 化石能源，无补贴盈利能力
- **V2 政策依赖度**: 补贴占比+政策敏感性+监管风险
- **V3 市场接受度**: 客户采用率+支付意愿+替代阻力
- **V4 技术成熟度**: TRL等级+规模化能力+学习曲线
- **V5 资本效率**: 投资回收期+IRR+资本密集度

### 绿色溢价系数计算
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

### 政策依赖度评估
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

---

## Phase执行指南 v26.0

### Phase 0: 数据预取+温度计预评估
1. **强制调用**: `/investment-logic-toolkit` → 建立生态科技投资第一性原理
2. **数据预取**: `/data-prefetch` → 14数据源自动获取(ESG+政策+碳价)
3. **环境双轴初评**: 基于财报+ESG数据初步确定E+V分数
4. **政策风险扫描**: IRA/EU Green Deal/碳税/监管最新动态
5. **技术路线验证**: 技术成熟度+成本曲线+竞争格局

### Phase 1: 公司分类+核心维度分析
1. **公司分类确认**: 5大类型精确归类 + 环境双轴精确评分
2. **环境影响量化**: `/investment-logic-toolkit` 深度分析实际减排贡献
3. **政策周期定位**: `/industry-cycle-analyzer` → 政策+技术+成本三重周期
4. **数据交叉验证**: `/cross-validation` → 多源ESG+环境+财务数据验证

### Phase 2: 政策动态+绿色资金流向+估值初版
1. **ESG资金追踪**: `/smart-money-tracking-system` → 绿色基金配置变化
2. **绿色情绪分析**: `/psychology-agent` → ESG投资热潮+漂绿识别
3. **绿色信号监控**: `/signal-monitoring-system` → 政策+碳价+技术突破
4. **并行分析**: `/dispatching-parallel-agents` → 3-5个独立维度
5. **OVM初版** (高期权公司强制): Core vs Option分离 + Reverse DCF + 期权树初版定价 → `docs/optionality_valuation.md`

### Phase 3: 深度建模+并行协作
1. **强制并行**: 5Agent协作(环境+政策+技术+财务+估值)
2. **深度建模**: 碳经济模型+技术替代曲线+政策情景分析
3. **压力测试**: 政策反转+技术路线错误+补贴退坡场景
4. **ESG整合**: 量化ESG因子对估值的实际影响

### Phase 4: 温度计验证+估值校准+OVM校准
1. **温度计复核**: `/investment-logic-toolkit` → 投资逻辑完整性检验
2. **对抗性分析**: `/bear-case-generator` → 独立看空分析(化石回归场景)
3. **绿色溢价校准**: E×V双轴 → 绿色溢价系数 → Core业务估值调整
4. **敏感性分析**: 关键变量(政策/碳价/技术/补贴)影响度量化
5. **OVM校准** (高期权公司强制): 更新期权概率(基于Phase 3深度建模) + 叙事矩阵 + 衰减日历 + TAM天花板校验 → `docs/optionality_valuation.md`

### Phase 5: 报告合并+质量门控
1. **多Agent合并**: `/report-merger` → 统一Complete报告
2. **质量门控**: 11项CG检查 + 生态科技专用指标验证
3. **投资建议**: 基于温度计+环境双轴的量化建议
4. **监控指标**: 设定跟踪验证的关键指标

---

## 生态科技专用监控指标

### 早期信号 (领先6-12个月)
- **政策动态**: 气候法案进展+碳税提案+补贴政策变化
- **技术突破**: 成本曲线拐点+效率提升+新技术商业化
- **资金流向**: 绿色基金规模+ESG投资占比+气候债券发行
- **碳价变化**: 各地碳市场价格+碳关税(CBAM)进展

### 同步指标 (当前状态)
- **市场渗透**: 可再生能源装机+电动车销量+绿色建筑占比
- **成本竞争**: LCOE vs 化石能源+电池成本+制氢成本
- **ESG评级**: 主流ESG机构评分+绿色债券收益率
- **政策执行**: 减排目标完成度+补贴发放+监管执法

### 滞后指标 (确认趋势)
- **环境成效**: 实际CO₂减排量+空气质量改善+生态恢复
- **经济效益**: 绿色就业+产业产值+出口竞争力
- **社会接受**: 公众环保意识+绿色消费+政治支持度
- **技术锁定**: 基础设施投资+产业链完整性+国际标准

---

## ESG原生评估框架

### 非漂绿验证清单
1. **定量证据**: 实际减排量+资源使用效率+废料回收率
2. **第三方验证**: 独立ESG评级+生命周期评估+认证标准
3. **透明度**: ESG数据披露质量+目标可衡量性+进展追踪
4. **一致性**: 业务模式vs ESG目标+资本配置vs声明+管理层激励

---

## 期权估值 OVM 生态科技适配 (v27.0新增)

> 完整OVM方法论: `docs/optionality_valuation.md` | 此处仅为行业适配

### OVM触发规则

| 公司 | 触发条件 | OVM范围 |
|------|---------|--------|
| TSLA | 强制(5条期权路径, P/E>100x) | 全量6组件 |
| PLTR(ESG) | 强制(3条期权路径, P/E>200x) | 全量6组件 |
| ENPH | 条件触发(传统估值<市价50%时) | OVM-1~3必做, 4~6建议 |
| FSLR | 条件触发 | OVM-1~3必做 |
| NEE | 通常不触发(受监管公用事业估值较稳定) | 仅当储能/氢能期权显著时 |

### 生态科技期权路径模板

**TSLA 期权树**:
| # | 期权路径 | TAM | 基础概率 | 关键里程碑 |
|---|---------|-----|---------|-----------|
| 1 | 能源存储(Megapack+Powerwall) | $500B | 40-55% | 储能部署GWh/年增速 |
| 2 | Robotaxi/FSD | $1T+ | 10-25% | L4监管批准+规模运营 |
| 3 | 人形机器人(Optimus) | $5T+ | 5-12% | 工厂部署量+单位成本 |
| 4 | 保险 | $50B | 25-40% | 保费规模+赔付率 |
| 5 | AI算力/推理 | $200B | 10-20% | Dojo算力规模+外部客户 |

**ENPH 期权树**:
| # | 期权路径 | TAM | 基础概率 | 关键里程碑 |
|---|---------|-----|---------|-----------|
| 1 | 储能系统 | $100B | 35-50% | 储能营收占比+增速 |
| 2 | 虚拟电厂(VPP) | $50B | 15-30% | VPP注册用户+电网服务收入 |
| 3 | EV充电集成 | $30B | 15-25% | 产品发布+渠道合作 |

### E×V与OVM的关系

- **E×V绿色溢价**: 仅应用于Core业务的传统估值(SOTP Step 1-5)
- **OVM期权估值**: 独立于E×V，每条期权有自己的概率和定价
- **禁止双重计算**: 绿色溢价已包含在Core估值中，期权价值不再叠加绿色溢价
- **政策期权**: IRA/碳税等政策变化可作为独立期权路径(如"碳税上调→FSLR竞争力跃升")

---

## 工具详细列表

### MCP数据工具 (P0)
| 工具 | 用途 | 生态科技特化应用 |
|------|------|------------------|
| `baggers_summary` | 7维度38指标+宏观温度 | ESG评分整合+碳价敏感性+政策依赖度 |
| `fmp_data` | 财报/比率/分析师预估 | 补贴依赖度+成本曲线+LCOE趋势分析 |
| `analyze_stock` | 技术面+基础指标 | 清洁能源ETF相关性+政策事件敏感性 |
| `polymarket_events` | 预测市场概率 | 气候政策+碳税+绿色法案通过概率 |

### 专业投资skill (P1)
| Skill | 触发词 | 生态科技专业场景 |
|-------|--------|------------------|
| `/company-research-agent` | "全面研究" | Tier 3深度分析 - ESG原生+碳经济建模 |
| `/psychology-agent` | "绿色情绪" | ESG投资热潮+绿色溢价+漂绿识别分析 |
| `/industry-cycle-analyzer` | "能源周期" | 可再生能源渗透率+政策周期+技术成本曲线 |
| `/smart-money-tracking-system` | "ESG资金" | 绿色基金配置+气候主题投资+欧洲资金流向 |
| `/signal-monitoring-system` | "绿色信号" | 碳价变化+政策信号+技术突破预警 |
| `/investment-logic-toolkit` | "第一性原理" | 能源转型本质+碳经济学+技术替代曲线 |

### Agent协作工具 (P2)
| Skill | 用途 | 生态科技协作场景 |
|-------|------|------------------|
| `/dispatching-parallel-agents` | 并行任务分配 | 5Agent并行：环境+政策+技术+财务+估值 |
| `/data-prefetch` | 自动数据预取 | 14数据源：财报+政策+碳价+技术+ESG评级 |
| `/cross-validation` | 数据冲突检验 | 不同源ESG评分+碳足迹+能源产量数据验证 |
| `/bear-case-generator` | 独立看空分析 | 政策反转+技术路线错误+补贴退坡+化石回归 |
| `/report-merger` | 多Agent产出合并 | Phase 5: 5Agent输出→单一Complete报告 |
