# 执行计划模板 v20.0

## 分析目标

- **公司**: {COMPANY_NAME} ({TICKER})
- **行业**: {INDUSTRY}
- **复杂度系数**: {COMPLEXITY}
- **目标字数**: 120,000 × {COMPLEXITY} = {TARGET_WORDS}
- **通用模块**: 29个
- **适配模块**: {ADAPTER_COUNT}个
- **总模块数**: {TOTAL_COUNT}个
- **数据缓存**: data/research/{TICKER}/
- **开始时间**: {START_TIME}

---

## 数据预取状态

| 数据文件 | 来源 | 状态 |
|---------|------|------|
| stock_full.json | MCP:analyze_stock | □ |
| peer_comparison.json | MCP:compare_stocks | □ |
| market_context.json | MCP:get_market_overview | □ |
| dcf_valuation.json | Python:dcf_calculator | □ |
| comparable_analysis.json | Python:comparable_companies | □ |
| analyst_consensus.json | WebSearch:Agent-A | □ |
| prediction_market.json | WebSearch:Agent-B | □ |
| recent_news.json | WebSearch:Agent-C | □ |
| business_overview.json | WebSearch:Agent-D | □ |
| competitive_landscape.json | WebSearch:Agent-D | □ |
| management_team.json | WebSearch:Agent-E | □ |

## 五引擎状态

| 引擎 | 启动 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|------|------|---------|---------|---------|---------|
| 竞争博弈 | □ | □ | □ | □ | □ |
| 周期定位 | □ | □ | □ | □ | □ |
| 估值重构 | □ | □ | □ | □ | □ |
| 预测市场 | □ | □ | □ | □ | □ |
| 风险压力 | □ | □ | □ | □ | □ |

---

## Phase 1: 定位与生态

### 通用模块
- [ ] U1: 公司类型识别
- [ ] U2: 产业链定位
- [ ] U3: 生态图谱
- [ ] U4: Mermaid可视化
- [ ] U5: 历史教训检索
- [ ] U6: 行业复杂度评估
- [ ] U6b: 预测市场检查
- [ ] U6c: 五引擎预热

### 适配模块
{PHASE1_ADAPTERS}

**检查点1**: □ 8项全部完成 □ 五引擎状态确认 □ Mermaid图输出

---

## Phase 2: 数据雷达

### 通用模块
- [ ] U7: 财务数据收集（MCP缓存优先）
- [ ] U8: 估值数据（加载dcf_valuation.json）
- [ ] U9: 分析师观点 (≥15位×150字)
- [ ] U10: 市场核心分歧 (≥5个)
- [ ] U11: 管理层Track Record
- [ ] U11b: 数据验证（MCP vs WebSearch交叉验证）

### 适配模块
{PHASE2_ADAPTERS}

**检查点2**: □ 6项全部完成 □ 数据标注A+B≥95% □ MCP数据已验证

---

## Phase 3: 深度分析

### 通用模块
- [ ] U12: 护城河分析
- [ ] U13: 产品矩阵
- [ ] U14: 核心投资命题 (≥3个)
- [ ] U15: 反常识洞察卡 (≥12张×400字)
- [ ] U16: 竞争格局
- [ ] U17: 学术框架引用
- [ ] U18: Reflection自我批评
- [ ] U18b: PPDA概率-价格背离分析
- [ ] U18c: PMSI预测市场情绪指数

### 适配模块
{PHASE3_ADAPTERS}

**检查点3**: □ 9项全部完成 □ 洞察卡≥12张 □ Reflection完成 □ PPDA完成 □ PMSI完成

---

## Phase 4: 决策输出

### 通用模块
- [ ] U19: SOTP三场景估值（引用comparable_analysis.json）
- [ ] U20: 敏感性分析
- [ ] U21: Kill Switch (≥12重)
- [ ] U22: 可验证预测 (≥30个)
- [ ] U23: 投资评级与建议
- [ ] U23b: 铁律检查（数据诚信三铁律 + 质量标准）

### 适配模块
{PHASE4_ADAPTERS}

**检查点4**: □ 6项全部完成 □ Kill Switch≥12 □ 预测≥30 □ 铁律通过 □ 免责声明

---

## v20.0 质量检查

| 指标 | v20.0 要求 | 实际 | 通过 |
|------|-----------|------|------|
| 总字数 | ≥{TARGET_WORDS} | ___ | □ |
| 表格数 | ≥55 | ___ | □ |
| Mermaid图 | ≥15 | ___ | □ |
| 洞察卡 | ≥12张×400字 | ___ | □ |
| Kill Switch | ≥12重 | ___ | □ |
| 可验证预测 | ≥30 | ___ | □ |
| 分析师引用 | ≥15位×150字 | ___ | □ |
| 数据A+B占比 | ≥95% | ___ | □ |
| PPDA | 完成 | ___ | □ |
| PMSI | 完成 | ___ | □ |
| 五引擎 | 全部激活 | ___ | □ |
| 铁律检查 | 全部通过 | ___ | □ |
