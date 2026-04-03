# 数据Schema与模板索引
> 报告产出中所有结构化数据的格式定义和模板位置

## 报告产出Schema

| Schema | 文件格式 | 产出位置 | 定义/模板 |
|--------|---------|---------|----------|
| **Checkpoint** | YAML | `reports/{T}/data/checkpoint.yaml` | `docs/checkpoint_protocol.md` 附录 |
| **品质评分卡** | Markdown | `reports/{T}/data/quality_scorecard.md` | `docs/company_quality_scoring.md` 附录A |
| **护城河数据卡** | YAML | `reports/{T}/data/moat_datacard.yaml` | `docs/deep_dive_protocol.md` Phase 5产出 |
| **DM注册表** | Markdown表 | 报告附录 | `docs/confidence_system.md` DM格式 |
| **Phase摘要** | Markdown | `reports/{T}/data/phaseN_summary.md` | 5-8K, 数字+结论速查 |
| **DCF模型** | Python | `reports/{T}/data/*_dcf_model.py` | 每报告自建 |
| **DCF输出** | JSON | `reports/{T}/data/dcf_output.json` | Python模型产出 |

## 评分体系Schema

| Schema | 位置 | 作用 |
|--------|------|------|
| **44因子框架** | `docs/company_quality_scoring.md` | 权威定义(A门控+B商业+C护城河+D修正) |
| **CQI公式** | `knowledge/stock_picking/cqi_scoring_formula.md` | 执行手册(分数线+公式+校准) |
| **CQI排行榜** | `knowledge/stock_picking/cqi_leaderboard.md` | 48家排名结果 |
| **评分基准** | `knowledge/stock_picking/quality_scoring_benchmark.md` | 10家基准公司详细评分 |
| **护城河框架** | `knowledge/stock_picking/moat_analysis_framework_v3.1.md` | C1嵌入性质+B4类型+趋势+半衰期 |

## 财务分析Schema

| Schema | 位置 | 作用 |
|--------|------|------|
| **CPA×ISDD框架** | `knowledge/analysis_modules/financial_analysis_framework_v2.md` | 12原则+正常化+12模块+矛盾引擎+评分 |
| **SaaS KPI** | `knowledge/industry_modules/enterprise_saas_modules.md` | ARR/NRR/CAC/LTV等15指标 |
| **消费品KPI** | `knowledge/industry_modules/consumer_modules.md` | SSS/RevPAR/品牌溢价等11指标 |

## 产出模板

| 模板 | 用途 | 位置 |
|------|------|------|
| **Tier 3 Complete** | 最终报告格式 | 执行摘要+术语表+正文+附录 |
| **策略卡(B文档)** | 内部投资策略 | `docs/strategy_card_template.md` |
| **内容文章** | 公开传播内容 | `.claude/skills/content-engine/SKILL.md` |
