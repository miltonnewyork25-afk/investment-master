# MU (美光科技) Tier 3 深度研究 — 总体执行计划

> **公司**: Micron Technology, Inc. (MU)
> **行业**: 半导体 — 存储芯片(DRAM/NAND/HBM)
> **Worktree**: 半导体 (分支: 半导体)
> **框架版本**: v6.0 (Deep-Dive Protocol)
> **目标字符数**: ≥127,500 (半导体系数×1.5)
> **日期**: 2026-02-08

---

## 交叉参考资产 (TSM + LRCX)

### 从TSM研究可借鉴:
- **AI需求持续性**: TSMC HPC营收从43%→58%，AI需求结构性增长验证
- **CoWoS产能**: 13K→130K wpm，对HBM封装需求的传导
- **CapEx信号**: TSMC $52-56B capex → DRAM/HBM设备投资意愿强
- **地缘风险**: Polymarket台海概率12-16%，对存储芯片供应链影响
- **客户结构**: NVIDIA占CoWoS 60% → NVIDIA是HBM最大买家

### 从LRCX研究可借鉴:
- **WFE周期**: CY2025 $110B → CY2026E $135B (+9%), mid-cycle偏上
- **DRAM CapEx**: $61.3B (+14%), NAND $22.2B (+5%) — DRAM投资远超NAND
- **DRAM价格**: Q1 2026E +50% QoQ，强势上涨周期
- **设备需求**: GAA转换增加刻蚀步骤+20%，对MU的设备采购影响
- **Memory content**: 每100K WSPM = $1B LRCX SAM

---

## Phase执行总览

| Phase | 名称 | 会话 | 字符目标 | 并行Agent数 | 核心交付 |
|:---:|------|:---:|:---:|:---:|------|
| **0** | 数据基础 | 本会话 | — | 7+3 MCP | 14个预取数据文件 + DM v1.0 |
| **0.5** | 市场注意力雷达+CQ | 本会话 | — | 5路搜索 | Top10维度 + 5-8 CQ + 执行清单 |
| **1** | 定位与生态 | 会话2 | ≥20,000 | 3 Agent | 公司画像+产业链+概率矩阵 |
| **2** | 财务与估值 | 会话3 | ≥25,000 | 3 Agent | 周期定位+SOTP+DCF+三情景 |
| **3+3.5** | 战略+AI评估 | 会话4 | ≥35,000 | 5 Agent | 护城河+五引擎+AI冲击矩阵 |
| **4** | 对抗审查 | 会话5 | ≥15,000 | 3 Agent | 偏差检查+事实核查+看空等权 |
| **5** | 决策输出 | 会话6 | ≥15,000 | 3 Agent | Kill Switch+预测+行动清单 |

---

## 数据源规划

### MCP工具 (Layer 1 — 必须成功)
1. `analyze_stock(MU, "full", "2y")` → stock_full.json
2. `compare_stocks([TSM,NVDA,AMD,INTC,ASML,LRCX], SPY)` → peer_comparison.json
3. `get_market_overview()` → market_context.json

### WebSearch Agent (Layer 3 — 7路并行)
| Agent | 任务 | 输出文件 | 特殊数据源 |
|-------|------|---------|-----------|
| A | 分析师共识 | analyst_consensus.json | FMP API data |
| B | 预测市场 | prediction_market.json | Polymarket/Kalshi |
| C | 新闻与催化剂 | recent_news.json | SEC filings (10-K/10-Q) |
| D | 业务与竞争 | business_overview.json + competitive_landscape.json | 100baggers思维 |
| E | 管理层 | management_team.json | SEC proxy/Form 4 |
| F | Smart Money 13F | smart_money_13f.json | SEC 13F filings |
| G | 期权与做空 | options_short.json | — |

### 额外数据源 (用户特别要求)
- **Polymarket**: Agent B专门搜索 — AI泡沫、DRAM价格、台海冲突、半导体关税
- **FMP (Financial Modeling Prep)**: Agent A/C WebFetch获取 — 财务报表、Key Metrics、DCF
- **100baggers**: Agent D融入分析思维 — 长期复利增长潜力、管理层资本配置、再投资能力
- **SEC**: Agent C/E/F WebFetch — 10-K, 10-Q, Proxy, 13F, Form 4

---

## Phase 0 执行清单 (本会话)

### Batch 1: MCP数据 + 3个WebSearch Agent (并行)
1. ✅ MCP: analyze_stock(MU)
2. ✅ MCP: compare_stocks(半导体同行)
3. ✅ MCP: get_market_overview()
4. Agent A: 分析师共识 (含FMP financial data)
5. Agent B: 预测市场 (Polymarket/Kalshi)
6. Agent C: 新闻+SEC filings

### Batch 2: 4个WebSearch Agent (并行)
7. Agent D: 业务与竞争 (含100baggers视角)
8. Agent E: 管理层
9. Agent F: Smart Money 13F (SEC 13F)
10. Agent G: 期权与做空

### Phase 0 收尾
11. 生成 prefetch_metadata.json
12. 初始化 Data Master v1.0 (shared_context.md)
13. 初始化 KAL模板 (key_assumptions.md)

---

## Phase 0.5 执行清单 (本会话，与Phase 0 Batch 2并行)

### 5路市场辩论搜索 (并行WebSearch)
1. "MU bull case bear case 2026"
2. "MU biggest risk debate investors 2026"
3. "Micron short thesis 2026"
4. "Micron HBM AI benefit or disruption"
5. "MU cycle position semiconductor memory 2026"
6. "Micron DRAM pricing power 2026"
7. "site:reddit.com MU stock debate 2026"
8. "MU earnings reaction analysis 2026"
9. "Micron vs Samsung SK Hynix HBM competition"
10. "MU overvalued undervalued 2026"

### CQ提取 + 模块映射
11. Top 10维度提取 (按热度排序)
12. 5-8个Core Questions提炼
13. CQ-模块相关性矩阵
14. Hot-Patch模块识别
15. 执行清单输出

---

## MU专项分析维度 (存储芯片特化)

### 相比TSM(代工)/LRCX(设备)的差异化分析:
1. **DRAM/NAND价格周期** — 比代工更剧烈的周期波动，价格弹性更高
2. **HBM竞争格局** — SK Hynix领先，Samsung追赶，MU的差异化策略
3. **技术路线** — DDR5/HBM3E/HBM4/LPDDR5X/CXL memory
4. **CapEx纪律** — 历史上存储行业过度投资导致价格崩溃的风险
5. **中国市场** — MU曾被中国禁售(2023)，后部分恢复，出口管制影响
6. **100baggers视角** — 存储是否能摆脱周期性成为结构性成长?

---

## Agent间通信机制

### 数据流向
```
Phase 0 → shared_context.md (DM v1.0) → 所有后续Agent只读引用
Phase 0.5 → core_questions.md → 所有Phase 1-5 Agent的CQ关联
TSM/LRCX data → MU shared_context Section D → Agent按需参考
```

### 跨Agent协调点
- Agent A(分析师)数据 → Agent D(竞争)可引用 → 避免重复搜索
- Agent B(预测市场)概率 → Agent G(期权)情绪 → 交叉验证
- Agent F(13F) → Agent E(管理层) → 内部人/机构动向整合
- TSM HBM需求数据 → MU HBM供给分析 → 供需匹配

---

*计划创建时间: 2026-02-08 | 框架: v6.0 | 行业系数: ×1.5*
