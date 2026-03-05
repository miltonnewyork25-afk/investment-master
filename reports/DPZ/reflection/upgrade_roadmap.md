# DPZ 升级路线图
# 日期: 2026-03-05
# R2审计: reports/DPZ/reflection/deep_audit.md
# Step 0数据: 539,686 chars | 54 Mermaid | 386 DM锚点

---

## 模块评分矩阵

| 模块 | 评分 | 扣分原因 |
|------|:----:|---------:|
| M1 品牌身份 | 1 | 有BER 3.0评分和SGI定位, 但缺NPS数据和品牌第一提及率 — 无KS可判 |
| M2 定价权 | 1.5 | CSSPD v2.0纯度分解优秀(+0.5), 但M2-sub促销依赖度未量化, 价格弹性系数缺精确计算 |
| M3 渠道生态 | 2 | 利润池地图完整(C-1冠军), 渠道拆分清晰, 一致性检验和KS完备 |
| M4 消费者行为 | 1.5 | 需求一致性检验通过(Ch14, +0.5), 但Loyalty数据缺失, 复购率/LTV/TOP20%均缺 |
| M5 运营效率 | 2 | ROIC幻觉发现(56.7%→14.5%)= 关键洞见; SG&A/库存周转有覆盖; KS可验证 |
| M6 增长引擎 | 1.5 | 增长归因拆分已做(Ch9), comp分解精细(Ch4), 但新店经济回报率缺, TAM渗透率未精确 |
| M7 护城河 | 2 | A-Score 5.9/10 + RR 7.5/10 + 战略放弃5项 + W×C矩阵 — 全套工具已部署, KS已设 |
| M8 管理文化 | 1.5 | CMS 6.6/10 + CEO沉默域6个(SDI 3.6/5), 但缺增量ROIC和跨公司CMS标准化对比 |
| M9 财务韧性 | 2 | ABS双天花板(C-3冠军) + FCF分析 + 净债务三口径 + KS-11黄灯已标注 |
| M10 估值锚定 | 2 | Reverse DCF 6信念 + 三情景FCFF + 双层SOTP + 五种方法收敛 — 估值框架完备 |
| **E1 特许经营** | 2 | 加盟商P&L瀑布 + ABS结构 + 回购约束 + royalty分析 — 深度覆盖 |
| **E4 数字化转型** | 1 | 85%数字占比已覆盖, 但缺增量vs替代因果和技术ROI — KS未设 |
| **M2-sub 促销依赖度** | 0.5 | CSSPD覆盖了分解框架, 但4个核心字段(promo_mix/realization/depth/incrementality)均缺 |
| **M3-sub 利润池地图** | 2 | Ch3 Supply Chain P&L重建 = 完整 |
| **M4-sub 需求一致性** | 2 | Ch14三路径收敛 = 完整 |

---

**总分**: 24.5 / 30 (81.7%)

**可验证模块(≥2分)**: 8 / 15 = 53.3%
**叙事模块(=0~1分)**: 2 / 15 = 13.3%
**混合模块(=1~1.5分)**: 5 / 15 = 33.3%

**发布门槛**: >= 80%模块达到2分 → 当前 **53.3% = FAIL**
(但总分81.7%说明整体质量高, 问题在于多个模块"差半步"到2分)

---

## 报告综合评分

### 质量评分: 4.0 / 5.0

| 维度 | 分数 | 说明 |
|------|:----:|------|
| **数据深度** | 4.0 | 386 DM锚点(强); 净债务三口径(EVO-SBUX-001验证); ROIC调整; ABS精解。缺NPS/弹性系数等精细KPI |
| **分析原创性** | 4.5 | 4个冠军候选(C-1~C-4); ROIC幻觉=行业通用洞见; ABS双天花板=非共识发现; 蚕食系数=新方法论 |
| **估值严谨度** | 4.5 | 5种方法收敛($430-470); Reverse DCF 6信念完整; 双层SOTP从IHG迁移成功; BME互斥量化 |
| **风险完整度** | 4.0 | 15 KS + 8+3+1风险拓扑 + 温水煮青蛙; 红队净+1.3pp(非表演性); 但KS-11黄灯后续追踪机制弱 |
| **可读性/连贯** | 3.5 | 540K体量偏大(目标437K, +23%溢出); 部分章节格式不统一(Ch→Chapter混用); Phase 1-2连贯好, Phase 3-5连贯中 |
| **消费品模块** | 3.5 | 20/22模块覆盖=91%(自报); 实际深度覆盖53%(8/15达2分); v28.0五模块(W×C/RR/CMS/SA/BER)全部部署 |

**加权总分**: 4.0 / 5.0

**对标**:
- vs KLAC 4.5: DPZ分析原创性接近(4.5 vs 4.5), 但可读性(3.5 vs 4.5)和数据精度(4.0 vs 4.5)有差距
- vs IHG 4.3: DPZ估值严谨度接近(4.5 vs 4.5), 但体量控制(540K vs 501K)和Mermaid密度(54 vs 92)有差距
- vs SBUX 3.8: DPZ在分析原创性(4.5 vs 4.0)和估值(4.5 vs 4.0)上明显更好

**结论**: DPZ v1.0 = 4.0/5.0, 位于"良好"到"优秀"之间。冠军级洞见多(4个), 但体量溢出和部分模块"差半步"限制了总分。

---

## Top 10 补证据任务清单

| # | 任务 | 模块 | 字段 | 数据来源 | 工作量 | 影响度 |
|---|------|------|------|---------|:------:|:------:|
| 1 | 促销依赖度量化 — promo_mix/discount_depth | M2-sub | promo_mix, discount_depth, price_realization | Earnings Call + Circana/NPD | 45min | S1 |
| 2 | Loyalty计划KPI基线 — enrollment/frequency/ticket | M4 + E2 | loyalty_enrollment, digital_frequency, ticket_lift | Q2 2026 Earnings + IR | 30min | S1 |
| 3 | 价格弹性系数精确计算 — 历史提价事件回归 | M2 | price_elasticity, volume_response | 10-K历史数据 + 学术研究 | 1hr | S1 |
| 4 | 数字化增量vs替代因果 — 增量率/价值溢价 | E4 | digital_incremental_rate, customer_value_premium | 10-K + App Store + 管理层 | 45min | S2 |
| 5 | NPS/品牌第一提及率 | M1 | NPS, unaided_awareness | ACSI + 第三方调研 | 30min | S2 |
| 6 | 新店经济回报率 — 首年EBITDA/投资 | M6 | new_unit_economics, first_year_return | Franchise Disclosure Doc + IR | 45min | S2 |
| 7 | 运营杠杆系数精确计算 | M5 | operating_leverage_coefficient | 10年历史回归 | 30min | S3 |
| 8 | 债务到期墙分布 | M9 | maturity_wall, refinancing_schedule | 10-K Note 5 + ABS prospectus | 20min | S3 |
| 9 | 国际MF补充市场数据(拉美/亚洲) | Ch18/M6 | intl_unit_economics, regional_comp | DPE/Jubilant + regional filings | 1hr | S3 |
| 10 | CEO SDI跨公司标准化 | M8 | SDI_benchmark, peer_CEO_SDI | MCD/CMG/YUM earnings calls | 45min | S3 |

**总补齐时间**: ~7小时
**ROI最高的3个任务**: #1(促销依赖度) + #2(Loyalty基线) + #3(价格弹性) — 完成这三项可使M2从1.5→2, M4从1.5→2, 总分从24.5→27/30(90%)

---

## 进化提议 (从审计中提取)

| ID | 提议 | 影响范围 | 来源 |
|----|------|---------|------|
| **EVO-DPZ-001** | M2-sub促销依赖度应成为QSR/餐饮公司的Phase 1强制字段 | 所有QSR报告 | R2: M2-sub=0.5分 |
| **EVO-DPZ-002** | Loyalty计划<12个月的公司, Phase 0应标注"Loyalty数据缺口", 并在Phase 3设定数据可用时间线 | 所有消费品 | R2: M4=1.5分(数据不可得≠分析不足) |
| **EVO-DPZ-003** | 体量门控: 目标±15%为合格区间(当前540K vs 437K目标 = +23%溢出) | 所有Tier 3 | R2: 可读性扣分 |
| **EVO-DPZ-004** | 章节标题格式统一化: Ch/Chapter混用需在组装时标准化 | 组装流程 | R2: 格式不统一 |

---

## 冠军候选注册

| 编号 | 名称 | 章节 | 评分建议 | 可迁移性 |
|------|------|------|:--------:|---------|
| C-1 | Supply Chain P&L重建 | Ch3 | 4.0/5 | 任何有vertically-integrated supply chain的特许公司(YUM, MCD中国) |
| C-2 | 蚕食系数(CC)模型 | Ch4 | 4.2/5 | 任何dense-store策略公司(SBUX中国, MCD, Starbucks Reserve) |
| C-3 | ABS双天花板 | Ch10 | 4.3/5 | 任何whole-business securitization公司(Dunkin', Five Guys) |
| C-4 | DPZ-CMG 9维镜像 | Ch16 | 4.1/5 | 任何同行业"模式选择"对比(COST-WMT, NKE-LULU) |

---

## 下份报告行动指南

### 质量提升杠杆 (从4.0→4.3+)

1. **体量纪律**: 严格控制在目标±15%; 540K→450K需从Ch12(-10K), Ch22(-10K), Ch6(-7K)精简
2. **模块"最后一步"**: 多数模块得1.5分(差半步到2分) — 根因是缺1-2个KPI字段; Phase 0数据预取应包含M1-NPS, M2-弹性系数
3. **格式标准化**: 组装时统一Ch/Chapter标题; DM锚点格式校验
4. **悲观偏差扫描**: 本报告红队净+1.3pp(轻度悲观), 与RCL(+8.0pp)和SBUX(+13pp)相比偏差最小 — 悲观偏差正在收敛, 趋势良好

### 框架改进建议

1. **Phase 0 KPI清单增强**: 每个M模块的KPI字段应在Phase 0生成数据预取任务清单, 确保Phase 1时已有数据
2. **促销依赖度(M2-sub)常态化**: QSR/餐饮公司Phase 1强制, 与CSSPD平行执行
3. **组装质量门控增强**: 增加"章节标题格式检查"到CG脚本

### 与前序报告的递归进化

| 维度 | SBUX v2.0 (3.8) | DPZ v1.0 (4.0) | 改善 | 下份目标 |
|------|:---------------:|:---------------:|:----:|:--------:|
| 悲观偏差 | +13pp | +1.3pp | 大幅改善 | 维持<5pp |
| 估值方法数 | 3种 | 5种 | 改善 | 维持5种 |
| 冠军候选 | 3个 | 4个 | 改善 | 目标3-5个 |
| 体量控制 | 278K/目标280K(合格) | 540K/目标437K(溢出23%) | 退步 | 严格±15% |
| DM锚点 | ~200 | 386 | 改善 | 维持300+ |
| 模块2分率 | 未评 | 53% | 基线 | 目标70% |

**质量趋势**: SBUX(3.8) → DPZ(4.0) ↑ — 分析原创性和估值严谨度持续提升, 但体量控制是新的短板。
