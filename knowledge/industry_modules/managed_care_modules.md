# 管理式医疗(Managed Care)行业分析模块模板 v1.0
# 生成日期: 2026-03-19
# 适用公司: UNH, CI, ELV, HUM, CNC, CVS/Aetna, MOH
# 行业特征: 保险+服务混合体, MCR是核心驱动力, 监管高度敏感, 垂直整合趋势

## 核心模块 (M1-M10)

### M1: MCR经济学 (Medical Cost Ratio Economics)
- **定义**: 医疗赔付率的水平、趋势和驱动因子分析——MCR决定了managed care公司80%+的利润波动
- **必问3问**:
  - Q1: 当前MCR是周期性波动还是结构性迁移？(区分可逆/不可逆因子)
  - Q2: 保费定价追赶滞后多少？(滞后月数×MCR缺口=利润压力持续时间)
  - Q3: MCR均衡水平在哪里？(三假说框架: 回归/上移/恶化)
- **必填KPI**:
  - KPI1: MCR(%) — 医疗赔付支出/保费收入 — 行业基准82-87%
  - KPI2: MCR变化(bps YoY) — 同比变化方向和幅度 — 基准±100-200bps/年
  - KPI3: 保费-成本滞后(月) — 保费调整滞后医疗成本变化的时间 — 基准12-18个月
- **一致性检验**: MCR + OPM + SG&A率 + 投资收入率 ≈ 100%(±2pp误差)
- **Kill Switch**:
  - threshold: MCR > 90% 持续2个季度
  - action: 重新评估利润恢复时间表, 检查分红安全性, 下调公允价值

### M2: 分部经济学 (Segment Economics)
- **定义**: 保险分部(MA/Commercial/Medicaid)和服务分部(如Optum)的独立盈利能力评估
- **必问3问**:
  - Q1: 各分部的真实adj OPM是多少？(消除内部交易后)
  - Q2: 哪个分部是利润引擎，哪个是拖累？(利润贡献 vs 资本占用)
  - Q3: 垂直整合的净效应是正还是负？(协同收益 - 复杂度成本 - 监管风险)
- **必填KPI**:
  - KPI1: 分部adj OPM(%) — 各分部调整后营业利润率 — MA 3-5%, 商业6-8%, PBM 2-4%
  - KPI2: 内部交易占比(%) — 内部交易收入/分部总收入 — >30%需警惕
  - KPI3: 分部ROIC(%) — 分部资本回报率 — 基准>WACC(8-10%)
- **一致性检验**: 合并收入 = Σ分部收入 - 内部消除 (±1%误差)
- **Kill Switch**:
  - threshold: 任一分部GAAP亏损持续2个季度 + 该分部商誉>$20B
  - action: 评估商誉减值风险, 重新估算SOTP

### M3: MA(Medicare Advantage)深度 (MA Deep Dive)
- **定义**: MA是多数managed care公司最重要的增长/利润引擎, 需单独深挖
- **必问3问**:
  - Q1: MA会员增长 vs 利润率的权衡——增长是否以牺牲MCR为代价？
  - Q2: CMS费率+Star Rating+V28对MA经济学的影响量化？
  - Q3: MA会员退出策略是否合理？(退出的县的MCR vs 保留的县)
- **必填KPI**:
  - KPI1: MA会员数(M) + 增速(%) — 行业渗透率~54%→70%+(CBO) — 领先者>5M
  - KPI2: Star Rating分布(4+星占比%) — 直接影响CMS bonus(+5%) — 基准60-80%
  - KPI3: MA MCR(%) vs 总MCR(%) — MA通常高于商业 — 差距>3pp需警惕
- **一致性检验**: MA收入 ≈ MA会员 × 人均CMS支付(±5%)
- **Kill Switch**:
  - threshold: MA会员连续2年净流失 + Star Rating下降
  - action: 重新评估MA增长叙事, 检查是否进入"收缩螺旋"

### M4: 监管风险矩阵 (Regulatory Risk Matrix)
- **定义**: Managed care面临多层级多维度监管(CMS/DOJ/FTC/州级), 需系统化映射
- **必问3问**:
  - Q1: 当前面临哪些活跃的监管调查/立法？(5条路径式穷举)
  - Q2: 概率加权的年化监管成本是多少？(vs 市场已定价的折价)
  - Q3: 监管结果的时间线和催化剂日期？
- **必填KPI**:
  - KPI1: 活跃监管路径数(条) — 基准1-2条正常, ≥4条=高压
  - KPI2: 概率加权年化监管成本($B) — vs adj利润占比 — >15%=重大
  - KPI3: 市场隐含监管折价(P/E压缩x) — vs 分析师估计 — 差额=潜在错误定价
- **一致性检验**: 概率加权总影响 ≤ Σ(各路径最大影响 × 概率), 不能超过理论上限
- **Kill Switch**:
  - threshold: DOJ刑事起诉 或 强制分拆诉讼启动
  - action: 重新构建估值(分拆后SOTP), 评估信用评级影响

### M5: PBM经济学 (PBM Economics)
- **定义**: PBM(药品福利管理)正面临制度性重构, 对有PBM业务的公司影响巨大
- **必问3问**:
  - Q1: PBM利润中多少来自spread(价差) vs flat-fee(管理费)？
  - Q2: 立法(CAA 2026/PPA)对PBM商业模式的影响量化？
  - Q3: PBM-药房垂直整合是否面临强制分离风险？
- **必填KPI**:
  - KPI1: PBM OPM(%) — spread-based vs fee-based分拆 — 基准2-4%
  - KPI2: 回扣保留率(%) — 保留 vs 透传给客户 — 趋势: 向0%收敛
  - KPI3: PBM客户留存率(%) — 合约到期后续约率 — 基准>90%
- **一致性检验**: PBM收入变化 ≈ 处方量变化 + 药品价格变化 + 客户数变化(±3%)
- **Kill Switch**:
  - threshold: FTC要求结构性分离PBM与药房 + 3个以上大州立法禁止PBM拥有药房
  - action: 将PBM估值从集团中剥离, 按独立PBM(CVS Health模式)重估

### M6: 资本配置与回购 (Capital Allocation)
- **定义**: Managed care公司产生大量现金流, 配置效率(并购/回购/分红)决定长期价值
- **必问3问**:
  - Q1: 并购ROI vs WACC——$1并购产生了$多少年化利润？
  - Q2: 回购时机是否理性？(在低P/E时增加回购还是高P/E时？)
  - Q3: 分红覆盖率是否安全？(FCF/分红比率在不同MCR情景下)
- **必填KPI**:
  - KPI1: 并购ROI(%) — 累计并购利润 / 累计并购支出 — 基准>WACC
  - KPI2: 回购η效率 — 回购EPS增厚 vs 机会成本 — η>1=创造价值
  - KPI3: 分红覆盖率(x) — FCF/年化分红 — 安全>1.5x, 危险<1.2x
- **一致性检验**: FCF = 回购 + 分红 + 有机投资 + 净偿债(±5%)
- **Kill Switch**:
  - threshold: 分红覆盖率 < 1.2x + ND/EBITDA > 3.0x
  - action: 评估分红削减概率, 检查信用评级影响

### M7: 竞争格局与份额 (Competitive Landscape)
- **定义**: Managed care是5-6家巨头的寡头市场, 相对竞争力决定增长和定价
- **必问3问**:
  - Q1: 在MA/商业/Medicaid三个市场中, 份额趋势如何？(增/稳/降)
  - Q2: 与最直接竞争对手的成本差距？(通过网络折扣率/SG&A效率对比)
  - Q3: 新进入者(如Amazon Health/科技巨头)的威胁有多远？
- **必填KPI**:
  - KPI1: MA市场份额(%) + YoY变化(pp) — 基准前3家各20-30%
  - KPI2: 商业保险客户续约率(%) — 基准>92%
  - KPI3: SG&A/收入(%) — 运营效率指标 — 基准7-10%
- **一致性检验**: 所有主要保险商MA会员之和 ≈ CMS公布的总MA注册人数(±2%)
- **Kill Switch**:
  - threshold: MA份额连续3年下降 + 商业续约率<88%
  - action: 重新评估竞争力叙事, 检查是否进入份额流失周期

### M8: 治理与代理问题 (Governance & Agency)
- **定义**: Managed care公司规模巨大($300B+收入), 代理问题对估值有实质影响
- **必问3问**:
  - Q1: CEO薪酬结构是否与股东利益对齐？(长期 vs 短期激励比例)
  - Q2: 董事会是否有效监督了资本配置决策？(事后审计并购ROI)
  - Q3: 继任规划是否存在？(key-man风险量化)
- **必填KPI**:
  - KPI1: CEO持股/薪酬比(x) — skin in the game — 基准>3x年薪
  - KPI2: 独立董事占比(%) + 平均任期(年) — 基准>75%, <10年
  - KPI3: 治理综合评分(0-10) — ISS/Glass Lewis或自评 — 基准>6
- **一致性检验**: CEO总薪酬增速 ≤ EPS增速 + TSR增速(否则=过度薪酬)
- **Kill Switch**:
  - threshold: SEC/DOJ对高管的个人调查 或 insider trading指控
  - action: 为估值加入治理折价(通常-5~-15% P/E), 评估管理层更替概率

### M9: 宏观敏感性 (Macro Sensitivity)
- **定义**: Managed care对利率、就业、联邦支出的敏感性分析
- **必问3问**:
  - Q1: 利率变化±100bps对WACC/DCF的影响多大？
  - Q2: 经济衰退对MCR的影响方向？(反直觉: 可能改善短期MCR)
  - Q3: 联邦预算变化(Medicaid削减等)对收入的影响？
- **必填KPI**:
  - KPI1: WACC敏感性($/100bps) — DCF估值对WACC变化的每股影响
  - KPI2: Medicaid收入占比(%) — 联邦支出敏感度代理 — >15%=高敏感
  - KPI3: Beta vs 行业Beta — 相对市场敏感度 — MC行业Beta通常0.6-0.9
- **一致性检验**: 宏观衰退情景的MCR假设 vs 历史衰退MCR数据(应方向一致)
- **Kill Switch**:
  - threshold: 联邦Medicaid削减>10% + 失业率>7%同时发生
  - action: 重新构建衰退情景, 测试分红+回购可持续性

### M10: 估值方法论 (Valuation Methodology)
- **定义**: Managed care的估值需要特殊处理(收入巨大但OPM低, 多分部, 监管折价)
- **必问3问**:
  - Q1: P/E是最佳估值指标吗？(vs P/FCF, EV/EBITDA, SOTP)
  - Q2: 情景概率加权是否反映了各风险的联合分布而非独立分布？
  - Q3: 市场隐含假设(Reverse DCF)与正向估值的离散度？
- **必填KPI**:
  - KPI1: 估值离散度(%) — 各方法之间的最大差异/中位数 — 合格≤30%
  - KPI2: 概率加权EV vs 当前价(%) — 期望回报率 — 决定评级
  - KPI3: Reverse DCF隐含增速(%) vs 分析师预测(%) — 差异=定价偏差
- **一致性检验**: SOTP合计 vs DCF vs 可比法 三者方向应一致(≥2/3同方向)
- **Kill Switch**:
  - threshold: 估值离散度>50% 且 无法合理解释
  - action: 暂停评级, 回溯检查假设分歧来源

## 扩展模块 (E1-E3)

### E1: 数据/AI能力 (Data & AI Capability)
- **触发条件**: 公司有重大数据/AI业务(如Optum Insight, Evernorth)
- **定义**: 评估数据资产的不可替代性和AI能力的商业化进展
- **必问3问**:
  - Q1: 数据覆盖范围(人数) vs 竞争对手？数据深度(纵向年限)？
  - Q2: 互操作性法规(21st Century Cures Act)对数据壁垒的侵蚀程度？
  - Q3: AI应用的ROI证据？(成本节省/精算精度提升/care path优化)
- **KPI**: 数据覆盖人数(M), AI/IT研发投入($B), 数据相关收入增速(%)
- **Kill Switch**: AI/数据业务OPM<5% 持续3年 → 质疑数据变现能力

### E2: VBC(Value-Based Care)转型 (VBC Transformation)
- **触发条件**: 公司有医疗服务业务承担VBC风险(如Optum Health, Humana Centerwell)
- **定义**: VBC模型的经济学评估——capitation定价 vs 实际医疗成本
- **必问3问**:
  - Q1: VBC患者的实际利用率 vs capitation定价基准？
  - Q2: VBC在高利用率环境下的亏损幅度？(下行风险非线性)
  - Q3: 退出低效VBC市场的进展和时间表？
- **KPI**: VBC患者数(M), VBC adj OPM(%), capitation定价滞后(月)
- **Kill Switch**: VBC adj OPM<2% 持续4个季度 → 质疑VBC模型可行性

### E3: 垂直整合度 (Vertical Integration)
- **触发条件**: 公司跨保险+服务+PBM+IT(如UNH, CVS)
- **定义**: 垂直整合的净效应评估——协同收益 vs 复杂度成本 vs 监管风险
- **必问3问**:
  - Q1: 可量化的协同金额？(内部化成本节省, 数据共享收益)
  - Q2: 协同中多少可能构成self-dealing？(DOJ/FTC审查焦点)
  - Q3: 拆分后SOTP vs 合并估值——哪个更高？
- **KPI**: 年化协同($B), 内部交易收入占比(%), SOTP折价(%)
- **Kill Switch**: DOJ启动强制拆分诉讼 → 立即构建拆分SOTP
