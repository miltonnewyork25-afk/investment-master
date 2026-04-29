---
name: chokepoint-locator
description: Locate the bottleneck, restricted node, or hard-to-bypass part of the chain that controls timing, scarcity, or economics. v2.1 adds four-variable judgment (WCC + SBG + Trust Stage + Supply Replication), plus Migration Asymmetry / EPD dimensions.
---

# Chokepoint Locator v2.1

## What this skill does
Find the node that is hard to replace, slow to scale, hard to certify, or difficult to bypass. **The goal is not to find the most famous company — it is to find where scarcity actually lives.**

**v2.1 升级**(2026-04-29, 吸收 Sprint C GWRE 反例): 从双变量判定升级为**四变量硬门槛** — `WCC + SBG + Trust Stage + Supply Replication` 同时满足才是"真 chokepoint"。并保留迁移不对称 8 维和 EPD L0-L5 作为评估深度。

## 第一步: 经典 chokepoint 识别 (v1.0 保留)

Look for bottlenecks such as:
- physical capacity / limited production slots
- certification barriers / regulatory approvals
- switching costs / installed-base lock-in
- hard-to-scale manufacturing / scarce materials
- supply chain dependence

**Default workflow**:
1. Map the chain from demand to end market.
2. Identify which node is currently constraining growth or adoption.
3. Explain why that node is difficult to bypass.
4. Estimate how fast competitors could catch up.
5. Think about what would happen if the bottleneck persists.
6. Think about what would happen if the bottleneck starts to ease.

## 第二步: WCC × Second-Best Gap 双变量判定 (v2.0 新增)

> **来源**: 长牛 OS framework-wrong-choice-cost — 不是"切换成本",而是"采购前的风险感知"。WCC 单变量不够,因为客户**愿意承担选错代价**如果替代方案足够好。
> **核心**: 真正的 chokepoint = 高 WCC + 大 Second-Best Gap。两者缺一不构成持久壁垒。

### WCC-8 错误不可承受成本 8 维 (每维 0-5)

| # | 维度 | 含义 |
|---|------|------|
| WCC-1 | 错误损失规模 | 选错的损失 vs 总采购预算 |
| WCC-2 | 不可逆性 | 错误能否回滚/撤销 |
| WCC-3 | 反馈周期 | 多久能发现选错(决策→后果) |
| WCC-4 | 责任归因 | 出错谁担责(个人/部门/CEO/外部) |
| WCC-5 | 审计认证 | 是否需要外部审计/合规验证 |
| WCC-6 | 持续沟通 | 是否需要长期与监管/审计/董事会沟通 |
| WCC-7 | 替代方案成本 | 如果切换替代方案的 dual-run 成本 |
| WCC-8 | 供应商竞争强度 | 这个领域有多少可信供应商 |

**WCC 总分** = (WCC-1 + ... + WCC-8) / 8 → 4.5-5 = 极高 / 3.0-4.5 = 高 / 1.5-3.0 = 中 / <1.5 = 低

### Second-Best Gap 8 维 (每维 0-5,5=与第二名差距极大)

| # | 维度 | 检测方法 |
|---|------|---------|
| SBG-1 | 装机基础/客户基础 | 公司 vs 第二名的存量倍数 |
| SBG-2 | 历史/累计使用 | 累计交易/手术/使用记录 |
| SBG-3 | 培训/知识资产 | 已培训人员数/课程数 |
| SBG-4 | 第三方证据/文献 | 同行评议文献/案例研究数 |
| SBG-5 | 生态/耗材/服务 | 生态伙伴/耗材种类/服务网点 |
| SBG-6 | 集成/API/工作流嵌入 | 已集成系统数 |
| SBG-7 | 价格优势/成本结构 | 客户经济账上的位置 |
| SBG-8 | 功能/技术对等性 | feature parity gap (年) |

**Second-Best Gap 平均** ≥ 4.0 → 极大差距 / 3.0-4.0 → 大 / 2.0-3.0 → 中 / <2.0 → 小

### 双变量矩阵判定(初步,**深度判定见四变量**)

| WCC | SBG | 判定 | 含义 |
|-----|-----|------|------|
| 高 | 大 | **真 chokepoint 候选** | 客户被迫使用且没有可信替代 (FICO/MSCI/ASML/ISRG) — 仍需四变量复核 |
| 高 | 小 | **危险信号** | 客户被迫使用,但替代方案随时威胁——一旦 SBG 收窄,护城河 1-2 年内崩塌 |
| 低 | 大 | 弱 chokepoint | 替代体验差但客户随时可换 — 价格压力,无定价权 |
| 低 | 小 | **无 chokepoint** | 不是真壁垒,只是品牌或路径依赖 |

### 四变量真 chokepoint 判定 (v2.1, Sprint C TYL/GWRE/VRSK/MTD 教训)

> **核心结论**: "**高责任不是护城河,除非能转成默认系统、价格权和可复制供给**"
> **失败案例**: GWRE 高 WCC + 大 SBG, 但 Supply Replication 差(实施周期长 24-36 个月、Guidewire 实施顾问稀缺)→ 增长被供给瓶颈卡住, 不是 v2.0 双变量定义的"真 chokepoint"

**真 chokepoint 必须四变量同时满足**:

| 变量 | 阈值 | 检测 |
|------|------|------|
| **WCC 错误不可承受成本** | ≥ 3.5/5 | WCC-8 维度平均 |
| **SBG 第二选择差距** | ≥ 3.0/5 | 8 维度平均 |
| **Trust Stage 信任形成阶段** | ≥ T3 (企业标准) | T0 试用→T1 付费→T2 生产→T3 标准→T4 默认→T5 生态 |
| **Supply Replication 供给复制** | ≥ S3 (可复制不掉品质) | S0 英雄式→S5 稀缺供给 |

**判定**:
- 4/4 满足 → **真 chokepoint** (FICO/MSCI/ASML/ISRG)
- 3/4 满足 → **chokepoint 候选** (找出弱项,标注为成长性约束)
- 2/4 满足 → **伪 chokepoint** (常见错误: 高 WCC+大 SBG 但 Supply 卡住,如 GWRE)
- 0-1/4 满足 → 不是 chokepoint

## 第三步: Migration Asymmetry 迁移不对称 8 维 (v2.0 新增, 100 分制)

> **来源**: 长牛 OS framework-migration-asymmetry — AI 替代时代,试新快但关旧慢才是真粘性。
> **触发**: 当 SBG ≥ 3.0 或 WCC ≥ 3.5 时强制做。

| # | 维度 | 权重 | 检测方法 |
|---|------|:----:|---------|
| MA-1 | 历史数据深度 | 15 | 客户在你系统里积累了多少年的不可重建数据 |
| MA-2 | 记录权 | 20 | 你是否是 System of Record |
| MA-3 | 写入深度 | 15 | 你产生的状态变更影响多少下游系统 |
| MA-4 | 审计/合规责任 | 15 | 关停旧系统是否破坏审计/监管证据链 |
| MA-5 | 下游依赖 | 10 | 多少下游业务依赖你的输出格式/接口 |
| MA-6 | 用户训练 | 10 | 已经培训了多少员工 |
| MA-7 | 失败不可逆 | 10 | 切换失败的后果 |
| MA-8 | 供应商生态 | 5 | 集成方/伙伴是否会与你绑定 |

**总分** 80-100 = 极高不对称(切换 3-5+ 年) / 60-80 = 高 / 40-60 = 中 / <40 = 低

**关键警告**: 评估 AI 替代风险时, **单看 demo/试点信号不够**, 必须看是否有"旧系统关停"证据。Sidecar 长期不等于替代。

## 第四步: EPD 错误传播深度 L0-L5 (v2.0 新增)

> **来源**: 长牛 OS framework-error-propagation-depth — WCC 说"代价大",EPD 说"穿透到哪一层"。

| 等级 | 含义 | 典型 |
|------|------|------|
| L0 | 无真实风险 | 内容平台 |
| L1 | 用户体验受损 | 普通 SaaS |
| L2 | 财务损失(可量化) | 收银/支付 |
| L3 | 制度/合规责任 | VEEV/会计软件 |
| L4 | 法律/监管/审计责任 | FICO/CDNS |
| L5 | 生命安全/不可逆 | ISRG/AXON/PTC |

**EPD ≥ L4** → chokepoint 持久性大幅提高,Kill Switch 数字阈值可放宽。

## 输出格式

```yaml
chokepoint_assessment:
  # 第一步: 经典识别
  chain_position: ""
  bottleneck_type: ""

  # 第二步: 双变量判定
  wcc:
    wcc_1_loss_scale: 0
    wcc_2_irreversibility: 0
    wcc_3_feedback_cycle: 0
    wcc_4_attribution: 0
    wcc_5_audit_cert: 0
    wcc_6_sustained_comm: 0
    wcc_7_alternative_cost: 0
    wcc_8_supplier_competition: 0
    average: 0.0

  second_best_gap:
    sbg_1_installed_base: 0
    sbg_2_history: 0
    sbg_3_training: 0
    sbg_4_evidence: 0
    sbg_5_ecosystem: 0
    sbg_6_integration: 0
    sbg_7_price: 0
    sbg_8_feature: 0
    average: 0.0
    weakest_dimension: ""

  matrix_verdict: "true_chokepoint / danger_signal / weak / none"

  # 第三步: 迁移不对称(条件触发)
  migration_asymmetry:
    total_score: 0  # /100
    estimated_switch_years: 0
    ai_displacement_risk: "high/medium/low"

  # 第四步: EPD
  epd_level: "L0-L5"

  # 综合
  durability_years: 0  # 估计 chokepoint 持久年数
  weakest_link: ""     # 最先可能被突破的维度
```

## 关键纪律 (v2.1)

1. **NEVER 单看 WCC 就下"chokepoint 成立"结论** — 必须配 SBG。
2. **NEVER 只看 WCC + SBG 就判定真 chokepoint** — 必须再过 Trust Stage 与 Supply Replication 两关。
3. **NEVER 用 vague moat language** — chokepoint 必须落到 WCC-8/SBG-8/MA-8 具体维度。
4. **NEVER 把高市占率等同于 chokepoint** — 市占率是结果,四变量才是因。
5. **NEVER 仅看 demo/试点判断 AI 替代风险** — 必须看 MA-2 记录权 + MA-3 写入深度 + MA-4 审计责任的真实变化。

## 与其他 skill 的接口

- **moat-evaluator**: chokepoint 是 C1 嵌入性 + C3 生态锁定 + C6 物理壁垒的可观察支撑。chokepoint 强 → C1/C3/C6 评分有数据基础。
- **workflow-shift-detector**: 当 chokepoint 在工作流中(不是物理产能), 委托 workflow-shift-detector 做 8 维新控制点分析。
- **profit-owner-resolver**: chokepoint locator 找"经济性卡在哪",profit-owner-resolver 找"经济性归谁"。
- **HC-5 硬件五层** (knowledge/industry_modules/): 硬件公司用 HC-5 替代或补充本 skill。

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-03-15 | 初版: 6 步基础 chokepoint 识别 |
| **v2.0** | **2026-04-28** | 升级到双变量判定 (WCC-8 × SBG-8) + Migration Asymmetry 8 维 100 分制 + EPD L0-L5。源自 reports/美股大牛股复盘/ 长牛 OS 73 文件吸收。验证案例: FICO/MSCI/ASML/ISRG/CDNS/SNPS。 |
| **v2.1** | **2026-04-29** | 吸收 Sprint C 反例(GWRE): 真 chokepoint 必须四变量同时满足 (WCC + SBG + Trust Stage + Supply Replication),修复双变量误判高责任但低复制能力公司的问题。 |
