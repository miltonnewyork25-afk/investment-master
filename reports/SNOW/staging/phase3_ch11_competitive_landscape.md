# Chapter 11: 竞争格局 — Databricks双平台共存 + Fabric结构性威胁

> **核心结论**: SNOW面临三层竞争: (1)Databricks($134B/65%增速)是"可见的正面竞争者"——双平台共存但份额在迁移；(2)Microsoft Fabric是"被低估的结构性威胁"——捆绑经济学比功能竞争更致命；(3)开源/云原生是"长期的价格锚"——限制了SNOW的终端定价权。三层竞争叠加意味着SNOW不太可能像NOW(ITSM垄断)那样获得垄断定价权，但多云中立+SQL易用性为其保留了一个有防御力的生态位。

---

## 11.1 Databricks: 双平台共存还是零和博弈?

### 数据面板

| 维度 | Snowflake | Databricks | 差距 |
|------|-----------|------------|------|
| 收入 | $4.7B (FY26) | $5.4B run-rate | DBR +15% |
| 增速 | 30% | 65% | **DBR 2.2x** |
| 估值 | $50B (公开) | $134B (私募) | DBR 2.7x |
| EV/Rev | ~11x | ~25x | DBR溢价125% |
| AI成熟度 | 2/5 (Cortex新) | 4/5 (MLflow成熟) | DBR领先 |
| 市占率(IDC) | 18.3% | 8.7% | SNOW领先[DM-COMP-010] |
| 客户重叠 | 40%也用DBR | 60%也用SNOW | 高度共存 |
| SQL查询 | 核心强项 | Photon追赶中 | SNOW领先 |
| ML/AI管线 | Cortex追赶中 | MLflow/Mosaic核心 | DBR领先 |
| 开放格式 | Iceberg原生 | Delta Lake + Iceberg互操作 | 趋向统一 |

### 竞争动态的因果分析

**为什么双平台共存（而非零和博弈）？**

ETR调研显示40%的SNOW客户也用Databricks，60%的Databricks客户也用SNOW[DM-COMP-011]。这个高重叠率意味着企业不是在"选择一个平台"，而是在"为不同workload选择最佳工具":

```
SQL分析/BI报告 → Snowflake (SQL-first, 易用, 并发性能强)
数据工程/ETL → 两者皆可 (Snowpark vs Spark, 功能趋同)
ML训练/推理 → Databricks (MLflow生态, GPU优化, 成熟)
实时流处理 → Databricks (Structured Streaming成熟)
数据治理 → 两者皆可 (Horizon vs Unity Catalog)
```

**因果链: 共存为什么可能变成零和？**

1. **开放格式统一** — Iceberg/Delta Lake互操作性加速→数据不再被锁定在单一平台→客户可以自由选择查询引擎→workload整合到一个平台变得可能→共存变成"谁的引擎更好/更便宜"的正面竞争[DM-COMP-012]

2. **Databricks SQL追赶** — Databricks的Photon引擎在TPC-DS基准测试中已经与SNOW性能相当。如果SQL查询(SNOW核心优势)不再是差异化→SNOW失去"SQL最强"的定位→共存天平向Databricks倾斜(因为DBR在AI/ML上已经领先)

3. **Databricks IPO催化** — IPO后Databricks获得: (a)品牌效应(上市公司更让企业放心)，(b)并购能力(用股票做M&A)，(c)人才吸引力。这三个因素加速DBR的企业销售→直接冲击SNOW的获客[DM-COMP-013]

**反面: 共存可能持续的原因**
- 企业IT架构倾向"best-of-breed"而非"all-in-one"——如同多数公司同时用CRM和NOW
- SQL用户(>1000万)和数据科学家(<100万)是不同群体，不太可能合并到一个平台
- Multi-cloud策略要求多供应商→单一平台策略与CIO偏好矛盾

### 竞争方向判断

**双平台共存将在3-5年内从"两个互补平台"演变为"两个重叠平台"**。因为两者都在向对方领域扩展(SNOW→AI, DBR→SQL)。当功能重叠>70%时，客户将开始整合→零和博弈阶段开始。

SNOW在这个演变中的优势: SQL易用性+multi-cloud中立+更大的企业客户基(18.3% vs 8.7%份额)
SNOW的劣势: AI/ML落后2-3年+增速仅DBR一半+SBC包袱更重

---

## 11.2 Microsoft Fabric: 被低估的结构性威胁

(详细因果分析见Phase 1 Ch4.5，此处聚焦竞争影响定量)

**Fabric的竞争力不在功能(目前仍弱于SNOW/DBR)，而在分发渠道**[DM-COMP-014]:

| 竞争维度 | SNOW vs Databricks | SNOW vs Fabric |
|---------|-------------------|----------------|
| 竞争类型 | 功能竞争(谁更好) | 分发竞争(谁更便宜/更方便) |
| 历史类比 | Chrome vs Firefox | IE vs Netscape |
| 时间线 | 已经在发生 | 3-5年后可能爆发 |
| 影响客户层 | F500/中端(双平台bake-off) | **Azure-first企业(~70% F500)** |
| 对SNOW估值影响 | 已部分price in($11x vs DDOG $14x) | **可能未充分price in** |

**定量影响估算**: 如果Fabric在2028-2029年功能成熟(概率30-40%)，可能影响SNOW 20-30%的目标客户(Azure-first企业)。因为这些客户的决策点不是"SNOW还是Fabric"(功能比较)，而是"需不需要单独的数据平台预算"(成本比较)。如果答案是"不需要，Fabric已经够用"→SNOW失去~20%的潜在TAM[DM-COMP-015]。

---

## 11.3 开源/云原生: 长期价格锚

**开源替代品**: Apache Spark, Trino, DuckDB, ClickHouse
**云原生替代品**: AWS Redshift, Google BigQuery

这些不是SNOW的直接竞争者(功能/易用性差距大)，但它们是**价格锚**——限制了SNOW能收取的信用价格上限。因为如果SNOW的定价过高，技术能力强的客户(工程师团队>10人)可以用开源/云原生替代80%的SNOW功能[DM-COMP-016]。

这意味着SNOW的定价权有一个"天花板": 不能比BigQuery贵>50%(否则价格敏感客户切换)，不能比Redshift贵>80%(否则AWS-first客户不考虑)。这个天花板随着开源/云原生功能提升而逐步下降。

---

*本章DM锚点统计: 7个 | 因果链: 5条 | 反面考量: 2处*
