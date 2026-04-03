# 铁律概览与工具治理 v22.1

## 铁律速查 (按L2/L3分层, 详见`.claude/rules/`按需加载)

**第零律: 发布合规** — 台海中性表述+回流无痕+报告连贯

**L2-分析工具**: H参考协议 | I知识前置 | J单会话组装 | K估值统一性 | M反膨胀纪律 | N证据链+概率锚定 | O Reverse DCF
**L3-质量检查**: A单会话禁跨Phase | B阶段完成=Commit | C目标≤1主+1小 | D会话预检 | E报告→main | F质量门控 | G Context管理 | L DM密度 | P卖出框架

> **冲突规则**: L0研究哲学 > L1投资原则 > L2分析工具 > L3质量检查。

**触发规则**: Phase 1-3读G/H/I/M/N。Phase 4读J/K/P。Phase 5读全部。

## 工具优先级

| 等级 | 工具类型 | 代表工具 |
|------|----------|----------|
| **P0** | MCP数据工具 | `baggers_summary` `fmp_data` `analyze_stock` `polymarket_events` |
| **P1** | 专业投资skill | `/investment-logic-toolkit` `/data-prefetch` `/moat-evaluator` |
| **P1** | 分析深度skill | `/assumption-audit` `/risk-topology` `/red-team-suite` `/expectation-gap` |
| **P1** | 质量保障skill | `/valuation-quality-gate` `/omission-scanner` `/cognitive-boundary-assessor` |
| **P2** | Agent协作工具 | 并行Agent + `/cross-validation` |

## Skill/工具治理 (Ch8七原则)

- **双向闭环**: Skill A说"用B处理X"，Skill B说"X必须用我" — 单向约束有漏洞
- **预算意识**: 每Phase仅激活需要的3-5个skill — 因为: skill描述消耗context
- **Never delegate understanding**: 并行Agent执行数据收集，**NEVER**委托thesis形成或评级判断
- **前置条件双层防御**: Phase依赖在提示词中声明+sentinel运行时强制
- **理由先于禁令**: 每条NEVER后跟because — 因果解释让规则可在新场景泛化
- **安全默认值+逃生舱口**: 保守默认(DM≥1.5)+显式豁免(用户确认)
- **能力与运行时对齐**: MCP工具不可用时不声称"已验证" — 提示词承诺须运行时可兑现

## 行业路由

| 行业 | Worktree | 系数 | 典型公司 |
|------|----------|------|---------|
| 半导体 | 半导体 | ×1.0 | NVDA, AMD, TSM, ASML, LRCX, MU |
| 消费品 | 消费品 | ×1.1 | KO, PG, NKE, COST, WMT, MCD |
| 科技平台 | 生态科技 | ×1.1 | AAPL, MSFT, GOOG, META, AMZN |
| 金融 | 金融 | ×1.2 | JPM, GS, BAC, V, MA, BRK |
| 金融基础设施 | 金融基础设施 | ×1.0 | CPRT, ICE, CME, MCO, SPGI |