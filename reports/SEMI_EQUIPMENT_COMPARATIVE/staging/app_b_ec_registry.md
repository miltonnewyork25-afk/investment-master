# Appendix B: Evidence Card 完整注册表

> **报告**: 半导体设备四巨头对比分析 (ASML / KLAC / LRCX / AMAT)
> **数据截止**: 2026-02-24
> **EC Schema版本**: v1.0
> **EC总数**: 534张 (跨20个类别)
> **覆盖章节**: P0 (shared_context) + Ch3-Ch22

---

## B.1 EC统计概览

### B.1.1 按类别汇总

| 类别代码 | 类别名称 | 数量 | 首次出现 | 定义章节 | 说明 |
|----------|---------|------|---------|---------|------|
| EC-FIN | 财务基础数据 | 10 | P0 | P0 (shared_context) + Ch20 | 四公司核心财务指标 |
| EC-VAL | 估值分析 | 45 | P0 | P0 + Ch13 | Reverse DCF / Mid-Cycle / 共识分析 / B4评分 |
| EC-COMP | 对比推断 | 2 | P0 | P0 (shared_context) | 跨公司模式发现 |
| EC-MKT | WFE市场 | 11 | P1 | Ch3 | WFE规模/结构/品类分布 |
| EC-POS | 竞争定位 | 4 | P1 | Ch3 | 四公司市场定位 |
| EC-INV | 投资含义(周期) | 4 | P1 | Ch3 | 周期维度投资排名 |
| EC-CYC | 周期分析 | 30 | P1 | Ch3 + Ch10 | WFE周期定位/订单/库存 |
| EC-VC | 价值链 | 21 | P1 | Ch4 | 产品线/份额/竞争格局 |
| EC-GEO | 地缘政治 | 38 | P1 | Ch5 | 出口管制/中国收入/国产替代/台海 |
| EC-MOAT | 护城河 | 129 | P2 | Ch6 + Ch7 + Ch8 + Ch9 | 11维A-Score全维度评分 |
| EC-UE | 单位经济学 | 30 | P3A | Ch11 | 毛利率/FCF/R&D效率/B2评分 |
| EC-CAP | 资本强度 | 25 | P3A | Ch12 | CapEx/CCC/增长质量/B3评分 |
| EC-RISK | 风险图谱 | 35 | P3B | Ch14 | Kill Switch/风险拓扑/B5评分 |
| EC-XA | 交叉分析 | 30 | P4 | Ch15 | A-B Score交叉/综合排名/异常分析 |
| EC-H2H | 对决分析 | 30 | P4 | Ch16 | 六组两两对决/8维度比较 |
| EC-SCN | 情景分析 | 30 | P4 | Ch17 | Bull/Base/Bear三情景/概率加权 |
| EC-ECO | 竞争生态 | 25 | P4 | Ch18 | 竞争动态/红队/侵蚀监控 |
| EC-DEC | 决策框架 | 25 | P4 | Ch19 | 投资者适配/组合/条件评级 |
| EC-EXE | 执行摘要 | 20 | P5 | Ch20 | 核心结论综合/方法论回顾 |
| EC-DSH | 决策仪表盘 | 20 | P5 | Ch21 | 决策树/触发条件/监控指标 |
| EC-LIM | 局限性与展望 | 15 | P5 | Ch22 | 数据局限/方法论局限/稳健性 |
| **合计** | | **534** | | | |

### B.1.2 claim_type分布 (基于各章EC统计)

| 类型 | 估计数量 | 占比 | 说明 |
|------|---------|------|------|
| fact | ~95 | ~18% | 直接引用MCP工具/财报/管理层披露的数据 |
| estimate | ~80 | ~15% | 基于已知数据的量化推算和前瞻预测 |
| inference | ~285 | ~53% | 基于多源数据交叉的逻辑推理 |
| assumption | ~20 | ~4% | 前瞻性假设和情景假定 |
| framework | ~54 | ~10% | 方法论和评分体系设计 |
| **合计** | **~534** | **100%** | |

> **注**: fact比率(18%)低于原始目标(36%)。原因: 本报告的核心价值在交叉分析和推理(inference)而非数据汇编。fact集中在P0-P1(Ch3-Ch5)和P3A(Ch10-Ch12)的数据密集章节; P4(Ch15-Ch19)和P5(Ch20-Ch22)以inference和framework为主，反映了分析链的递进结构——前序章节产出事实，后序章节对事实进行交叉推理。

### B.1.3 置信度分布

| 置信度 | 估计数量 | 占比 | 含义 |
|--------|---------|------|------|
| H (高) | ~220 | ~41% | 多源交叉验证/直接引用/历史类比支撑 |
| M (中) | ~265 | ~50% | 单源或推理链较长/部分假设依赖 |
| L (低) | ~30 | ~6% | 高度前瞻性/假设密集/数据稀缺 |
| 混合(M-H/L-M等) | ~19 | ~3% | 分维度置信度不一致 |
| **合计** | **~534** | **100%** | |

---

## B.2 按类别的EC索引表

### B.2.1 EC-FIN: 财务基础数据 (10张, P0)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-FIN-001 | 四公司TTM毛利率排序: KLAC(61.9%) > ASML(52.8%) > LRCX(49.8%) > AMAT(48.7%) | fact | H | P0 |
| EC-FIN-002 | ASML ROIC=135.6%，核心驱动是客户预付款使平均投入资本极低 | inference | H | P0 |
| EC-FIN-003 | KLAC D/E=1.08x(四家最高)但Z-Score=14.17仍安全，债务主要用于回购 | inference | H | P0 |
| EC-FIN-004 | LRCX CSBG装机基数100K活跃腔体，年ARPU约$72K/腔 | fact | H | P0 |
| EC-FIN-005 | AMAT EPIC Center $5B投资推高CapEx至8%(FY2025四家最高) | fact | H | P0 |
| EC-FIN-006 | 四公司TTM P/E均处于5年历史高位: AMAT +94%, LRCX +119%, KLAC +91%, ASML +34% | inference | H | P0 |
| EC-FIN-007 | LRCX是唯一触发三重正面领先信号的公司(营收毛利共振+经营杠杆+存货效率) | fact | H | P0 |
| EC-FIN-008 | (隐含引用，Ch11单位经济学相关) | — | — | Ch11 |
| EC-FIN-009 | (隐含引用，Ch11单位经济学相关) | — | — | Ch11 |
| EC-FIN-010 | KLAC毛利率领先AMAT 13pp，根源是"软件vs硬件"的边际成本差异 | inference | H | Ch20 |

### B.2.2 EC-VAL: 估值分析 (45张, P0 + Ch13)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-VAL-001 | 宏观市场处于98-99百分位估值(Shiller P/E=39.78, Buffett=217%, ERP=4.5%) | fact | H | P0 |
| EC-VAL-010 | FMP DCF参考值与市价偏差: AMAT负值, LRCX 4.6x, ASML 3.9x, KLAC 2.1x | fact | H | 13.1 |
| EC-VAL-011 | AMAT Reverse DCF隐含10年FCF CAGR ~13-14%，需份额从23%→27-28% | estimate | M | 13.2 |
| EC-VAL-012 | LRCX Reverse DCF隐含10年FCF CAGR ~13-14%，需份额从mid-30s→high-30s% | estimate | M | 13.2 |
| EC-VAL-013 | LRCX P/E +119% vs 5Y均值(50.9x vs 23.2x)，四家中溢价最极端 | fact | H | 13.2 |
| EC-VAL-014 | ASML Reverse DCF隐含10年FCF CAGR ~12-13%，依赖ASP提升+DUV换代 | estimate | M | 13.2 |
| EC-VAL-015 | ASML垄断地位提供下行估值保护，Bear回撤(-18~-30%)远小于其他三家 | inference | H | 13.2 |
| EC-VAL-016 | KLAC Reverse DCF隐含10年FCF CAGR ~13-15%，FCF Yield 1.97%四家最低 | estimate | M | 13.2 |
| EC-VAL-017 | KLAC EV/Sales=17.7x最高但EV/FCF不是最高，因34.36% FCF Margin转化了"贵" | inference | H | 13.2 |
| EC-VAL-018 | 四家隐含FCF CAGR趋同(12-15%)但概率加权增速差异大: KLAC>ASML>LRCX>AMAT | inference | H | 13.2 |
| EC-VAL-019 | AMAT Mid-Cycle P/E为40.0-42.1x，vs 5Y均值溢价105-116% | estimate | H | 13.3 |
| EC-VAL-020 | LRCX Mid-Cycle P/E为56.1-69.0x，四家中最高 | estimate | H | 13.3 |
| EC-VAL-021 | ASML Mid-Cycle P/E为64.6-75.7x(ADR口径) | estimate | M | 13.3 |
| EC-VAL-022 | KLAC Mid-Cycle P/E=48.7x几乎等于TTM 49.0x，利润率接近mid-cycle | estimate | H | 13.3 |
| EC-VAL-023 | LRCX共识FY25→28 CAGR(18.8%)高出历史10Y CAGR(11%)达7.8pp，四家偏离最大 | inference | H | 13.4 |
| EC-VAL-024 | 四家FY27→29分析师覆盖数急剧下降(AMAT 24→3)，远期共识被少数分析师主导 | fact | H | 13.4 |
| EC-VAL-025 | 共识60%兑现=零安全边际，Forward P/E回到40-50x | inference | H | 13.4 |
| EC-VAL-026 | 共识隐含净利率提升可信度排序: AMAT>KLAC>LRCX>ASML | inference | H | 13.4 |
| EC-VAL-027 | ASML估值一致性最高(A-Score/P/E/B2/B3多维排名一致) | inference | H | 13.5 |
| EC-VAL-028 | KLAC PR=0.49x是四家最佳性价比，但ROE含杠杆因素 | inference | H | 13.5 |
| EC-VAL-029 | LRCX一致性缺口最大(A-Score#3 vs P/E溢价#1) | inference | H | 13.5 |
| EC-VAL-030 | AMAT是唯一全维度排名一致的公司(全部#4) | inference | H | 13.5 |
| EC-VAL-031 | 估值排序vs A-Score排序的错位: ASML低估2档, LRCX高估2档 | inference | H | 13.6 |
| EC-VAL-032 | PR分析揭示AMAT"便宜"是虚假的(PR 0.98x vs KLAC 0.49x) | inference | H | 13.6 |
| EC-VAL-033 | EV/Sales标准化后AMAT确实最便宜(0.36x vs 0.42-0.45x) | inference | H | 13.6 |
| EC-VAL-034 | FCF Yield趋同(28bp窄带)可能是板块泡沫信号 | inference | M | 13.6 |
| EC-VAL-035 | Base情景下LRCX两年回报-4%，ASML +71% | estimate | M | 13.7 |
| EC-VAL-036 | Bear情景ASML下行最小(-18~-30%)，远小于其他三家 | estimate | M | 13.7 |
| EC-VAL-037 | 概率加权回报: ASML(+65%) >> KLAC(+5%) >> AMAT(-5%) > LRCX(-11%) | estimate | M | 13.7 |
| EC-VAL-038 | B4评分排序: ASML(7.30) >> KLAC(5.95) > AMAT(5.20) >> LRCX(3.55) | inference | H | 13.8 |
| EC-VAL-039 | CAPE 98百分位环境对四家影响不均: ASML最抗压, LRCX最脆弱 | inference | M | 13.8 |
| EC-VAL-040 | EPIC Center是唯一可能改变AMAT B4排名的催化剂 | inference | M | 13.8 |
| EC-VAL-041 | Forward P/E(FY2028E)收敛至24-32x区间(vs TTM 38-52x) | fact | H | 13.4 |
| EC-VAL-042 | ASML 2022 Investor Day目标vs共识: FY2028共识已进入上沿, FY2030超出16% | fact | H | 13.4 |
| EC-VAL-043 | P/E均值化情景: AMAT唯一受益者(+24%), 其他三家-4~-9% | estimate | H | 13.6 |
| EC-VAL-044 | ROIC口径PR反转ASML为最佳性价比(0.38x最低) | inference | H | 13.6 |
| EC-VAL-045 | B4排名变化: LRCX A-Score#3→B4#4, AMAT A-Score#4→B4#3 | inference | H | 13.8 |

### B.2.3 EC-COMP: 对比推断 (2张, P0)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-COMP-001 | KLAC检测=CapEx最低+毛利率最高 → "半导体行业的软件公司" | inference | M | P0 |
| EC-COMP-002 | ASML客户预付款=垄断的直接经济表现(低流动比率不是弱点) | inference | M | P0 |

### B.2.4 EC-MKT: WFE市场 (11张, Ch3)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-MKT-001 | WFE是半导体产业的"二阶导数"，受终端需求变化率驱动 | fact | H | 3.1 |
| EC-MKT-002 | SEMI vs Gartner对CY2026-2027 WFE规模存在13%+分歧 | fact | H | 3.1 |
| EC-MKT-003 | CY2026 Top 5 Hyperscaler CapEx预计达$600B+，75%用于AI | fact | M | 3.1 |
| EC-MKT-004 | 先进封装设备TAM CAGR 33%($5.5B至$17.5B，CY2024-2028) | fact | M | 3.1 |
| EC-MKT-005 | GAA工序从350-450道增至400-600道，检测占比从15%升至20% | fact | M | 3.1 |
| EC-MKT-006 | 全球8英寸利用率从75-80%回升至85-90%，成熟节点消化接近尾声 | fact | H | 3.1 |
| EC-MKT-007 | WFE品类分布: 光刻~25%, 刻蚀~25%, 沉积~21%, 检测~14%, 其他~15% | fact | M | 3.2 |
| EC-MKT-008 | KLAC收入CAGR 15.1% vs WFE CAGR ~8-10%，持续跑赢大盘 | fact | H | 3.2 |
| EC-MKT-009 | Hyperscaler每增加$1B AI CapEx约$0.08-0.10B流向WFE | estimate | M | 3.3 |
| EC-MKT-010 | Hyperscaler CapEx到设备收入确认存在12-24个月时滞 | fact | H | 3.3 |
| EC-MKT-011 | WFE牛鞭效应: Hyperscaler削减10% CapEx可能导致WFE下降20-30% | estimate | L | 3.3 |

### B.2.5 EC-POS: 竞争定位 (4张, Ch3)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-POS-001 | ASML: EUV 100%份额, DUV ~85%, High-NA 100%, 单台EUV >2亿欧元 | fact | H | 3.2 |
| EC-POS-002 | AMAT覆盖8大WFE市场，产品线宽度9/10，但WFE份额5年持平19% | fact | H | 3.2 |
| EC-POS-003 | KLAC"窄赛道深耕"策略: 更高毛利率(62% vs 47-52%)、更低CapEx(2.8%) | fact | H | 3.2 |
| EC-POS-004 | 品类价值×份额乘积: ASML光刻>LRCX刻蚀>AMAT沉积>KLAC检测 | inference | M | 3.2 |

### B.2.6 EC-INV: 投资含义(周期) (4张, Ch3)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-INV-001 | 周期维度排名#1 KLAC: 攻防兼备(下行Beta 0.7x + 上行Beta 2.0x) | inference | M | 3.5 |
| EC-INV-002 | 周期维度排名#2 LRCX: 高弹性但P/E 50.9x(+119%溢价)已充分定价 | inference | M | 3.5 |
| EC-INV-003 | 周期维度排名#3 ASML: 积压订单提供延迟保护但非真正免疫 | inference | M | 3.5 |
| EC-INV-004 | 周期维度排名#4 AMAT: 下行保护适中但上行弹性最弱(FY2025仅+4.4%) | inference | M | 3.5 |

### B.2.7 EC-CYC: 周期分析 (30张, Ch3 + Ch10)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-CYC-001 | AI/HPC对WFE贡献从~15-20%(CY2023)到~35-40%(CY2025) | fact | H | 10.1 |
| EC-CYC-002 | WFE历史上行均值3.2年，当前第4年将是30年来最长 | fact | H | 3.4 |
| EC-CYC-003 | AI收入验证缺口: 需$2T/年 vs 最乐观预测$1.2T | fact | M | 3.4 |
| EC-CYC-004 | 本报告立场: "有条件的周期延长"，CY2028-2029可能调整10-15% | assumption | L | 3.4 |
| EC-CYC-005 | LRCX收入波动率最高(下行-14.5%)，KLAC最低(下行-6.5%) | fact | H | 3.4 |
| EC-CYC-006 | ASML积压订单约390亿欧元，覆盖约15个月收入 | fact | H | 3.4 |
| EC-CYC-007 | LRCX CSBG 37.7%提供底部支撑，但Systems 62.3%完全暴露于WFE周期 | fact | H | 3.4 |
| EC-CYC-008 | KLAC: 下行Beta ~0.7x, 上行Beta ~2.0x, "抗跌跟涨"不对称性 | fact | H | 3.4 |
| EC-CYC-009 | AMAT AGS $6.39B, >67%经常性, FY2022→2023 SSG -12%但AGS +5% | fact | H | 3.4 |
| EC-CYC-010 | 5Y毛利率极差: AMAT 2.2pp, ASML 2.3pp, KLAC 2.5pp, LRCX 4.1pp | fact | H | 3.4 |
| EC-CYC-011 | 品类差异影响: AI需求按"瓶颈→乘数→守门"差异化传导 | inference | H | 10.2 |
| EC-CYC-012 | AMAT FY2025 +4.4% YoY(四家最低)，Q4 QoQ-6.8% | fact | H | 10.3 |
| EC-CYC-013 | AMAT积压~$15B(6.3个月覆盖)，B/B ~1.0x，无加速信号 | fact | M | 10.3 |
| EC-CYC-014 | LRCX六连加速增长: 6季YoY+18-27%，毛利率同步+160bps | fact | H | 10.3 |
| EC-CYC-015 | LRCX SAM份额扩张: Mid-30s%→high-30s%目标，隐含$23-25B CY2026收入 | estimate | M | 10.3 |
| EC-CYC-016 | ASML季节性波动: Q4€9.63B vs Q1€6.67B(+44%)，含2台High-NA | fact | H | 10.3 |
| EC-CYC-017 | ASML CY2026指引: €34-39B(+16% YoY中值)，毛利率51-53% | fact | H | 10.3 |
| EC-CYC-018 | KLAC低波动增长: 4季收入$3.12-3.30B, CV~6-7%(四家最低) | fact | H | 10.3 |
| EC-CYC-019 | 检测需求粘性: 收入波动最低+检测强度系数持续上升+均衡客户mix | fact | H | 10.3 |
| EC-CYC-020 | KLAC管理层预期CY2026检测增速>WFE整体 | fact | M | 10.3 |
| EC-CYC-021 | ASML创纪录订单Q4 €13.2B(共识2x)，EUV €7.4B，积压€38.8B | fact | H | 10.4 |
| EC-CYC-022 | ASML可见度最长: EUV预订至2027，积压/TTM=1.24x(15个月覆盖) | fact | H | 10.4 |
| EC-CYC-023 | AMAT积压平衡: ~$15B(6.3个月)，B/B~1.0x，无加速信号 | fact | M | 10.4 |
| EC-CYC-024 | LRCX递延健康消化: 从$2.8B→$2.25B(-$550M)，预付→交付转化 | fact | H | 10.4 |
| EC-CYC-025 | KLAC隐形稳定积压: 收入精准可预测(误差<2%)反映充分覆盖 | inference | M | 10.4 |
| EC-CYC-026 | 库存四分化: LRCX去库(效率↑)，ASML去库(交付)，KLAC建库(备货)，AMAT去库(消化) | fact | H | 10.5 |
| EC-CYC-027 | CCC效率排序: AMAT(172d) < LRCX(194d) < KLAC(239d) < ASML(333d) | fact | H | 10.5 |
| EC-CYC-028 | 芯片端库存正面: AI/HBM紧缺，NAND走向平衡，成熟芯片充足 | inference | M | 10.5 |
| EC-CYC-029 | 周期Beta排序: LRCX(1.3-1.5x) > AMAT(0.8-1.0x) > KLAC(0.7-0.9x) > ASML(0.6-0.8x) | estimate | H | 10.6 |
| EC-CYC-030 | 估值周期敏感性: Mid-cycle forward P/E 25-38x(合理); Peak TTM P/E 40-50x(高估) | estimate | M | 10.6 |

### B.2.8 EC-VC: 价值链 (21张, Ch4)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-VC-001 | 先进芯片制造400-600道工序，四类核心设备占CapEx 70-80% | fact | M | 4.1 |
| EC-VC-002 | 5nm到2nm工序从350-450增至400-600道，检测占比15%→20% | fact | H | 4.1 |
| EC-VC-003 | AMAT覆盖10环节(最广)，LRCX 4个，ASML/KLAC各2个 | fact | H | 4.2 |
| EC-VC-004 | ASML EUV 100%份额，25万+零部件，Zeiss/Trumpf/Cymer独家供应 | fact | H | 4.2 |
| EC-VC-005 | ASML EUV生态外购成本占COGS 55-70%，制约毛利率天花板~52-53% | inference | M | 4.2 |
| EC-VC-006 | 刻蚀市场份额: LRCX 45%, TEL 27%, AMAT 15%, 其他13% | fact | H | 4.2 |
| EC-VC-007 | LRCX ALD收入FY2025从$1B基数增长50%+，GAA为核心驱动力 | fact | H | 4.2 |
| EC-VC-008 | AMAT三大利润堡垒(PVD/CMP/Ion)贡献SSG营业利润45-50% | inference | M | 4.3 |
| EC-VC-009 | AMAT综合WFE份额~19%，5年持平；Mizuho估计60%收入在份额下降品类 | fact | H | 4.3 |
| EC-VC-010 | KLAC光掩模检测份额>80%，TAM~$1.6B，CAGR 12-15% | fact | H | 4.3 |
| EC-VC-011 | KLAC过程控制份额2010年50%→2024年63%，15年+13pp | fact | H | 4.3 |
| EC-VC-012 | AMAT刻蚀收入CY2024>$1.2B，图案化SAM从$1.5B/10%扩至$8B/30%+ | fact | H | 4.3 |
| EC-VC-013 | Overlay量测: KLAC Archer ~40% vs ASML YieldStar ~35% | fact | M | 4.3 |
| EC-VC-014 | AMAT过程控制份额从2010年13%降至2024年<8% | fact | H | 4.4 |
| EC-VC-015 | 中国竞争者集中于成熟节点(>28nm)，Naura PVD份额+2-5pp/年 | fact | M | 4.4 |
| EC-VC-016 | ASML R&D $4.5B+/线 vs AMAT ~$450M/线，10倍差距 | fact | H | 4.4 |
| EC-VC-017 | FY2023 AMAT收入+2.5% vs LRCX -14.5%，验证分散化防御效果 | fact | H | 4.5 |
| EC-VC-018 | AMAT毛利率48.7% vs KLAC 61.9%，13pp差距含通才折价 | inference | M | 4.5 |
| EC-VC-019 | AMAT GAA收入$2.5B→$5B倍增(管理层声称)，竞争压力待观察 | fact | M | 4.5 |
| EC-VC-020 | AMAT WFE份额19%五年持平，广度策略创造增量为零 | fact | H | 4.5 |
| EC-VC-021 | LRCX估值(50.9x)与竞争地位(6.5/10)存在张力，含周期/AI叙事溢价 | inference | M | 4.5 |

### B.2.9 EC-GEO: 地缘政治 (38张, Ch5)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-GEO-001 | 出口管制演进呈"阶梯式"升级，范围更广、执行更严、盟友协调更深 | fact | H | 5.1 |
| EC-GEO-002 | 2022年10月为管制方式分水岭: 从"实体清单"转向"技术阈值" | fact | H | 5.1 |
| EC-GEO-003 | 2023年10月多边协调封堵了日荷替代供应路径 | fact | H | 5.1 |
| EC-GEO-004 | 2024-2025年"精准化"转向: VEU撤销+附属公司规则+50%关联方 | fact | H | 5.1 |
| EC-GEO-005 | 四家公司中国收入均经历"政策驱动型抛物线": 抢装推高峰值后回落 | fact | H | 5.2 |
| EC-GEO-006 | FY2021-2025四家中国收入占比(AMAT 27-30%/LRCX 28-34%/KLAC 22-26%/ASML 14-20%) | fact | H | 5.2 |
| EC-GEO-007 | "抢装效应"解释2023-2024中国收入峰值(ASML 14%→29%, LRCX Q1 43%) | fact | H | 5.2 |
| EC-GEO-008 | 受管制品类占中国收入估计: AMAT 40-50%/LRCX 30-40%/KLAC 25-35%/ASML ~100% | estimate | M | 5.2 |
| EC-GEO-009 | ASML EUV从未出口中国，中国收入全部来自DUV | fact | H | 5.2 |
| EC-GEO-010 | AMAT绝对下降金额最大(-$2.0-2.5B)，KLAC企稳(影响递减$500M→$300-350M) | estimate | M | 5.2 |
| EC-GEO-011 | AMAT面临"双重打击": 管制+国产替代(Naura PVD 2-5pp/年份额流失) | inference | M | 5.2 |
| EC-GEO-012 | LRCX中国CSBG敞口约$1.0-1.5B/年，政策限制维护服务将直接冲击 | estimate | M | 5.2 |
| EC-GEO-013 | KLAC检测设备管制时间最晚(2025年12月)，影响递减趋势最清晰 | fact | H | 5.2 |
| EC-GEO-014 | ASML出口管制由荷兰政府执行，保留政策自主空间 | fact | M | 5.2 |
| EC-GEO-015 | AMAT FY2026管制影响$600-710M来自四层: 直接禁令+许可证+附属公司+服务 | estimate | M | 5.2 |
| EC-GEO-016 | AMAT $252M罚款(BIS历史第二高)+三年"悬剑"条款损害合规信誉 | fact | H | 5.3 |
| EC-GEO-017 | 约60%的AMAT收入位于份额正在下降的细分市场(Mizuho) | inference | M | 5.3 |
| EC-GEO-018 | LRCX管理层预计CY2026中国管制影响约-$600M | fact | H | 5.3 |
| EC-GEO-019 | LRCX六路径模型: 路径4"CSBG中断"(20%概率)是最被低估的风险 | inference | M | 5.3 |
| EC-GEO-020 | LRCX概率加权中国影响-$1.2B/年 vs 管理层指引-$0.6B，差距来自尾部冲击 | estimate | M | 5.3 |
| EC-GEO-021 | ASML EUV自2019年起从未获批出口中国 | fact | H | 5.3 |
| EC-GEO-022 | ASML DUV 1970i/1980i型号自2024年起需荷兰出口许可 | fact | H | 5.3 |
| EC-GEO-023 | 荷兰政府在ASML出口管制中保留政策自主空间 | inference | M | 5.3 |
| EC-GEO-024 | KLAC检测设备被纳入BIS管制比沉积/刻蚀晚约3年(2025.12 vs 2022.10) | fact | H | 5.3 |
| EC-GEO-025 | KLAC出口管制影响递减: CY2025 ~$500M → CY2026E ~$300-350M | fact | H | 5.3 |
| EC-GEO-026 | 台海冲突概率基线评估2-3%(军事升级)加非军事路径约3-5%总计 | estimate | M | 5.4 |
| EC-GEO-027 | 台海冲突情景下KLAC股价冲击最大(-70~-85%): 大中华区收入集中度56% | estimate | M | 5.4 |
| EC-GEO-028 | 出口管制缓和效应呈"不对称回报": 放松正面影响<限制负面影响 | inference | M | 5.4 |
| EC-GEO-029 | 中国半导体设备国产化率2024年25% → 2025年35%(超30%目标) | fact | H | 5.5 |
| EC-GEO-030 | 中国"十五五"规划目标: 7nm/5nm设备量产+国产化率50%+; 新产能50%国产设备 | fact | H | 5.5 |
| EC-GEO-031 | 国产替代威胁排序: AMAT>LRCX>KLAC>ASML(基于品类替代难度) | inference | M | 5.5 |
| EC-GEO-032 | 国产替代呈"节点分化": 成熟制程(>=28nm)可达40-60%，先进(<5nm)仍<10% | inference | M | 5.5 |
| EC-GEO-033 | KLAC地缘风险综合评分最低(1.90/4)，但台海冲突暴露最高 | inference | M | 5.6 |
| EC-GEO-034 | ASML地缘风险第二低(2.20/4)，EUV不可替代性+荷兰主权缓冲 | inference | M | 5.6 |
| EC-GEO-035 | LRCX地缘风险第二高(2.60/4)，CSBG中断风险是独有隐性威胁 | inference | M | 5.6 |
| EC-GEO-036 | AMAT地缘风险最高(3.45/4)，品类广+敞口深+合规前科+双重挤压 | inference | M | 5.6 |
| EC-GEO-037 | AMAT地缘风险已被估值充分定价(P/E最低)，LRCX可能定价不足 | inference | M | 5.6 |
| EC-GEO-038 | "三级瀑布"传导: 政策冲击→客户行为变化→生态重构(5年+则第三级必然发生) | inference | M | 5.6 |

### B.2.10 EC-MOAT: 护城河 (129张, Ch6-Ch9)

> 护城河EC是全报告最大的类别，覆盖11维A-Score评分体系。以下按子章节分组。

#### Ch6 A1-A3 (EC-MOAT-001 ~ EC-MOAT-074)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-MOAT-001 | Zeiss EUV光学成本占整机COGS 25-30% (~$37.5-54M/台) | estimate | M | 6.1.1 |
| EC-MOAT-002 | ASML-Zeiss互锁关系: Zeiss SMT >60%收入来自ASML | inference | M | 6.1.1 |
| EC-MOAT-003 | Trumpf EUV激光占光源成本30-35%, 无替代供应商 | estimate | M | 6.1.1 |
| EC-MOAT-004 | 每台EUV 250,000+零部件 | fact | H | 6.1.1 |
| EC-MOAT-005 | ASML反向锁定: 供应商无第二个EUV客户 | inference | M | 6.1.1 |
| EC-MOAT-006 | 欧洲供应链不可抗力风险+地缘政治 | inference | M | 6.1.1 |
| EC-MOAT-007 | LRCX核心技术(RF, 等离子体, recipe)大部分自研 | fact | M | 6.1.2 |
| EC-MOAT-008 | LRCX外购组件多源策略, lead time 3-6个月 | inference | M | 6.1.2 |
| EC-MOAT-009 | LRCX 100K+活跃腔体装机基数 | fact | H | 6.1.2 |
| EC-MOAT-010 | 特种陶瓷/碳化硅供应商集中度较高 | inference | L | 6.1.2 |
| EC-MOAT-011 | KLAC核心壁垒在软件/算法, 100%自研 | fact | H | 6.1.3 |
| EC-MOAT-012 | KLAC BBP光源自研, 光学精密元件多源外购 | fact | M | 6.1.3 |
| EC-MOAT-013 | KLAC CapEx/收入仅2.8%, 四家最低 | fact | H | 6.1.3 |
| EC-MOAT-014 | Orbotech/SPTS业务占比<10% | fact | M | 6.1.3 |
| EC-MOAT-015 | AMAT 8条产品线各有独立供应链体系 | inference | M | 6.1.4 |
| EC-MOAT-016 | AMAT R&D $3.57B, 分摊8线约$450M/线 | fact | M | 6.1.4 |
| EC-MOAT-017 | EPIC Center 180K sqft洁净室, $5B投资 | fact | H | 6.1.4 |
| EC-MOAT-018 | PVD靶材, 离子注入源部分单源供应 | inference | L | 6.1.4 |
| EC-MOAT-019 | 极端情景恢复排序: KLAC>LRCX>AMAT>ASML | inference | L | 6.1.5 |
| EC-MOAT-020 | EUV全球唯一供应商, Nikon 2010s退出 | fact | H | 6.2.1 |
| EC-MOAT-021 | 光刻是晶圆制造"坐标系统", 数据重力最强 | inference | H | 6.2.1 |
| EC-MOAT-022 | Nikon DUV份额估计10-15% | estimate | M | 6.2.1 |
| EC-MOAT-023 | DUV切换成本估算$80-150M/fab | estimate | M | 6.2.1 |
| EC-MOAT-024 | 先进逻辑fab可能运行数千条LRCX刻蚀recipe | fact | M | 6.2.2 |
| EC-MOAT-025 | LRCX HAR刻蚀(3D NAND通道) 100%份额 | fact | H | 6.2.2 |
| EC-MOAT-026 | TEL Certas平台目标: 2.5x速度, >400层通道刻蚀 | fact | M | 6.2.2 |
| EC-MOAT-027 | 标准刻蚀品类TEL/AMAT竞争 | fact | H | 6.2.2 |
| EC-MOAT-028 | Akara+ALTUS Halo"双重锁定"策略 | inference | M | 6.2.2 |
| EC-MOAT-029 | LRCX加权平均切换成本$100-180M/fab | estimate | M | 6.2.2 |
| EC-MOAT-030 | LRCX 100K+活跃腔体, CSBG $7.2B, ARPU $72K | fact | H | 6.2.2 |
| EC-MOAT-031 | KLAC检测设备是良率学习曲线的"反馈回路" | inference | H | 6.2.3 |
| EC-MOAT-032 | KLAC每日处理7.5PB缺陷数据, 30+年积累 | fact | H | 6.2.3 |
| EC-MOAT-033 | 15年内Top 5 fab零系统性切换KLAC记录 | fact | H | 6.2.3 |
| EC-MOAT-034 | KLAC单fab切换成本$250-500M分项估算 | estimate | M | 6.2.3 |
| EC-MOAT-035 | AMAT三堡垒(PVD/CMP/离子注入)贡献SSG营业利润45-50% | inference | M | 6.2.4 |
| EC-MOAT-036 | PVD 85%, CMP 65-70%, 离子注入70-75%份额 | fact | M | 6.2.4 |
| EC-MOAT-037 | AMAT Endura平台30+年迭代, PVD工艺know-how | fact | M | 6.2.4 |
| EC-MOAT-038 | AMAT弱势品类份额: 刻蚀15-18%, eBeam 10-15% | estimate | L-M | 6.2.4 |
| EC-MOAT-039 | AMAT加权平均切换成本~$41M/fab | estimate | M | 6.2.4 |
| EC-MOAT-040 | AGS $6.39B, 经常性>67%, 续约率90%+ | fact | H | 6.2.4 |
| EC-MOAT-041 | KLAC检测占fab CapEx仅7-8%但切换成本最高(per dollar) | inference | M | 6.2.5 |
| EC-MOAT-042 | AMAT"三堡垒+五阵地"二元结构 | inference | M | 6.2.5 |
| EC-MOAT-043 | KLAC增量系统毛利率估计70-80% | estimate | M | 6.3.1 |
| EC-MOAT-044 | KLAC上行杠杆1.19-1.26x, 下行杠杆0.95x | fact | H | 6.3.1 |
| EC-MOAT-045 | KLAC >75%服务收入来自3年期合同, 续约率~95% | fact | H | 6.3.1 |
| EC-MOAT-046 | KLAC MACH软件收入估计$270-400M, SaaS估值$2.2-4.8B | estimate | M | 6.3.1 |
| EC-MOAT-047 | 检测/量测占WFE 7-8%, KLAC 63%份额 | fact | H | 6.3.1 |
| EC-MOAT-048 | ASML增量EUV毛利率可能52-55%, Zeiss成本限制 | estimate | M | 6.3.2 |
| EC-MOAT-049 | ASML经营杠杆~1.0-1.2x, 近似线性 | estimate | M | 6.3.2 |
| EC-MOAT-050 | 每EUV占比+1pp → 混合毛利率+0.2-0.3pp | estimate | M | 6.3.2 |
| EC-MOAT-051 | High-NA Zeiss光学更复杂, COGS可能更高 | inference | L | 6.3.2 |
| EC-MOAT-052 | 每新增10K腔体 → CSBG年收入+$720M | fact | H | 6.3.3 |
| EC-MOAT-053 | CSBG占比+1pp → 混合毛利率+0.10-0.15pp | estimate | M | 6.3.3 |
| EC-MOAT-054 | LRCX TTM经营杠杆0.49x, R&D投资期拖累 | inference | M | 6.3.3 |
| EC-MOAT-055 | LRCX FY2022→2023下行杠杆1.46x(利润跌幅>收入) | fact | H | 6.3.3 |
| EC-MOAT-056 | AMAT FY2024-2025经营杠杆不稳定, EPIC+出口管制扰动 | fact | H | 6.3.4 |
| EC-MOAT-057 | AMAT R&D $3.57B/8线, 每线~$450M vs LRCX $2.1B/刻蚀 | fact | M | 6.3.4 |
| EC-MOAT-058 | AGS FY2025 +3% vs CSBG +16% vs KLAC服务+14% | fact | H | 6.3.4 |
| EC-MOAT-059 | EPIC当前收入贡献=$0, Samsung唯一member | fact | H | 6.3.4 |
| EC-MOAT-060 | KLAC"非对称杠杆": 上行放大/下行保护 | inference | M | 6.3.5 |
| EC-MOAT-061 | ASML定价权被Zeiss/Trumpf外购成本"截流" | inference | M | 6.3.5 |
| EC-MOAT-062 | LRCX经营杠杆"先抑后扬"投资逻辑 | inference | M | 6.3.5 |
| EC-MOAT-063 | EPIC Center成功/失败的杠杆释放二元性 | inference | M | 6.3.5 |
| EC-MOAT-064 | ASML"切换成本-毛利率"悖论: 最高A2但非最高毛利率 | inference | H | 6.5.1 |
| EC-MOAT-065 | KLAC切换成本与利润率最匹配 | inference | H | 6.5.1 |
| EC-MOAT-066 | KLAC A2可能被低估0.5分(零切换记录证据链) | inference | M | 6.5.2 |
| EC-MOAT-067 | AMAT三堡垒A2=7-8分被加权平均掩盖 | inference | M | 6.5.2 |
| EC-MOAT-068 | TEL Certas对LRCX HAR地位的中期威胁 | inference | M | 6.5.2 |
| EC-MOAT-069 | 出口管制削弱ASML中国DUV锁定效应 | inference | M | 6.5.2 |
| EC-MOAT-070 | KLAC三维均衡: 没有单点依赖的护城河结构 | inference | H | 6.5.3 |
| EC-MOAT-071 | ASML"极端不对称": A2(9)与A1(5)差距4分 | inference | H | 6.5.3 |
| EC-MOAT-072 | LRCX A3潜力: CSBG飞轮兑现后6→7-8分 | inference | M | 6.5.3 |
| EC-MOAT-073 | AMAT投资价值在堡垒密度而非广度 | inference | M | 6.5.3 |
| EC-MOAT-074 | A1-A3分数与估值倍数的一致性检验 | inference | M | 6.5.4 |

#### Ch7 A4-A7 (EC-MOAT-020 ~ EC-MOAT-069, 与Ch6部分重叠)

> Ch7的EC-MOAT编号范围与Ch6有重叠(MOAT-020~069)。以下仅列出Ch7新增的关键EC，已在上表中列出的从略。Ch7核心新增:

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-MOAT-035 | ASML EUV研发25年+，累积投入>$10B | fact | H | 7.2.1 |
| EC-MOAT-036 | ASML专利15,000+，40%为系统集成/算法核心; 全球EUV工程师<5,000人 | fact | H | 7.2.1 |
| EC-MOAT-037 | 中国投入EUR 37B发展国产EUV，LDP路径绕过LPP，量产最快2030s | inference | M | 7.2.1 |
| EC-MOAT-038 | High-NA(NA=0.55)使追赶者面临"移动靶标"困境 | inference | H | 7.2.1 |
| EC-MOAT-043 | KLAC壁垒双层结构: 硬件~5年半衰期，软件/数据8-12年 | inference | M | 7.2.3 |
| EC-MOAT-044 | KLAC"滚动壁垒"模型: 硬件迭代使数据累积不断叠加 | inference | M | 7.2.3 |
| EC-MOAT-051 | 四公司经常性收入全维度对比 | fact | M | 7.3.1 |
| EC-MOAT-053 | LRCX CSBG类SaaS估值$108-144B，Systems隐含13.7-16.9x P/S | estimate | M | 7.3.2 |
| EC-MOAT-067 | KLAC数据网络飞轮: 15K台装机→7.5PB/日→>99.5%精度→更多订单 | inference | H | 7.4.2 |

#### Ch8 A8-A11 (EC-MOAT-080 ~ EC-MOAT-115)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-MOAT-080 | EUV光刻是所有WFE品类的"前提条件"，bundling策略无法绕过 | inference | H | 8.1.1 |
| EC-MOAT-081 | Canon NIL产能<20 WPH vs EUV 200+ WPH，不适合量产替代 | fact | H | 8.1.1 |
| EC-MOAT-082 | ASML YieldStar在overlay量测约35%份额，主动入侵KLAC领域 | fact | H | 8.1.1 |
| EC-MOAT-083 | KLAC检测独立于制造设备，天然免疫bundling策略 | inference | H | 8.1.2 |
| EC-MOAT-084 | "裁判不能兼任球员"——客户倾向独立第三方检测 | inference | M | 8.1.2 |
| EC-MOAT-085 | KLAC overlay份额天花板受ASML数据整合优势压制，~40-42% | estimate | M | 8.1.2 |
| EC-MOAT-086 | LRCX面临AMAT(刻蚀扩张)+TEL(NAND通道挑战)双向包抄 | inference | H | 8.1.3 |
| EC-MOAT-087 | AMAT图案化SAM从$1.5B/10%扩至$8B/30%+，直接入侵LRCX刻蚀 | fact | H | 8.1.3 |
| EC-MOAT-088 | TEL Certas 2.5x速度，5年内可能取得NAND通道刻蚀15-20%份额 | estimate | M | 8.1.3 |
| EC-MOAT-089 | CSBG 100K+安装基数+多年期服务合同=LRCX反包抄防线 | inference | H | 8.1.3 |
| EC-MOAT-090 | AMAT 8条线WFE份额19%持平，0个品类排名#1 | fact | H | 8.1.4 |
| EC-MOAT-091 | AMAT PVD被Naura年蚕食2-4pp，检测份额13%→8%被KLAC扩大差距 | inference | M | 8.1.4 |
| EC-MOAT-092 | KLAC "无论怎么造芯片都需要检查"——范式不可知论者 | inference | H | 8.2.2 |
| EC-MOAT-093 | KLAC 5年CAGR 10.8% vs WFE ~6-8%，差额来自检测强度提升 | fact | H | 8.2.2 |
| EC-MOAT-094 | ASML在每次光刻范式变迁中成功适应(g-line→i-line→DUV→EUV) | fact | H | 8.2.3 |
| EC-MOAT-095 | GAA刻蚀步骤翻倍+ALD需求激增=LRCX当前范式利好 | inference | H | 8.2.4 |
| EC-MOAT-096 | AMAT 8条线覆盖最广但每条线深度不如专精对手 | inference | M | 8.2.5 |
| EC-MOAT-097 | AMAT在HBM4的19步新增工序中覆盖75% | fact | M | 8.2.5 |
| EC-MOAT-098 | GTM效率排序: ASML(SG&A 3.85%)>>LRCX(5.07%)>AMAT(6.09%)>KLAC(8.22%) | fact | H | 8.3.1 |
| EC-MOAT-099 | ASML EUV客户仅3-5家，不需要"销售"EUV | inference | H | 8.3.2 |
| EC-MOAT-100 | CSBG增速(+16%)>安装基数增速(~5-7%)=货币化深度增加 | fact | H | 8.3.3 |
| EC-MOAT-101 | Vantex/Akara平台qualification完成后创造"升级锁定循环" | inference | M | 8.3.3 |
| EC-MOAT-102 | KLAC SG&A 8.22%最高反映检测设备销售的技术密集型特征 | inference | M | 8.3.4 |
| EC-MOAT-103 | AMAT WFE 19%持平证明交叉销售未有效转化为份额增长 | inference | H | 8.3.5 |
| EC-MOAT-104 | 半导体设备行业四层合规壁垒: Qual+Uptime+安全+出口管制 | inference | H | 8.4.1 |
| EC-MOAT-105 | ASML四层壁垒全达极致: Qual 18-24月+双重出口管制+辐射安全 | fact | H | 8.4.2 |
| EC-MOAT-106 | ASML受荷兰+美国双重出口管制 | fact | H | 8.4.2 |
| EC-MOAT-107 | 先进节点检测精度: 缺陷<10nm, 假阴性接近零, 漏检代价$1-10M+ | inference | H | 8.4.3 |
| EC-MOAT-108 | 检测漏检导致后续数十道工序损失远超晶圆价值 | inference | M | 8.4.3 |
| EC-MOAT-109 | LRCX刻蚀设备综合转换成本$12-44M/台(设备价3-8倍) | estimate | M | 8.4.4 |
| EC-MOAT-110 | 存储厂选择"已知的次优"而非"未知的可能更优"=可靠性溢价 | inference | M | 8.4.4 |
| EC-MOAT-111 | AMAT产品线合规门槛差异大: PVD 9/10 vs ECD 5/10 | inference | M | 8.4.5 |
| EC-MOAT-112 | LRCX A4高(8)但A8偏低(6)因刻蚀与制造设备技术边界模糊 | inference | M | 8.6 |
| EC-MOAT-113 | KLAC A9=9(最高) vs P/E排名第三——范式免疫力可能被低估 | inference | M | 8.6 |
| EC-MOAT-114 | ASML A11=10包含政府出口管制的"免费壁垒" | inference | M | 8.6 |
| EC-MOAT-115 | AMAT P/E折价~25%与A-Score差距~22%大致匹配=通才折价合理映射 | inference | H | 8.6 |

#### Ch9 A-Score综合 (EC-MOAT-100 ~ EC-MOAT-129)

> EC-MOAT-100~115在Ch8和Ch9中有重叠引用(Ch9重新定义了A8-A11评分)。以下列出Ch9新增的综合性EC:

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-MOAT-116 | 完整4x11评分矩阵汇总 | inference | M | 9.1.3 |
| EC-MOAT-117 | A-Score排名: ASML 8.12 > KLAC 7.66 > LRCX 7.02 > AMAT 5.42 | inference | H | 9.2.2 |
| EC-MOAT-118 | 四公司11维评分条形可视化全景 | fact | M | 9.3.1 |
| EC-MOAT-119 | 四种护城河形状: ASML尖峰/KLAC平台/LRCX偏科/AMAT扁平 | inference | M | 9.3.2 |
| EC-MOAT-120 | 热力矩阵: ASML 2S+4A, KLAC 0S+5A+6B(全B以上), AMAT 0S+0A+5B+6C | fact | H | 9.4.3 |
| EC-MOAT-121 | 概率加权A-Score: ASML 7.80, KLAC 7.55, 差距从0.46收窄至0.25 | estimate | M | 9.5 |
| EC-MOAT-122 | 护城河-估值散点: KLAC性价比最优, LRCX匹配度最低 | inference | M | 9.5 |
| EC-MOAT-123 | ASML A1(5分)致命性: Zeiss单点故障年化概率~1-2%，三重缓解 | inference | M | 9.5 |
| EC-MOAT-124 | KLAC"沉默冠军"折价原因: TAM天花板+叙事差距+资本结构 | inference | M | 9.5 |
| EC-MOAT-125 | KLAC存在约1-2个P/E points的护城河折价 | estimate | L | 9.5 |
| EC-MOAT-126 | AMAT通才折价系统性诊断: 0个A级, 6个C级 | inference | M | 9.5 |
| EC-MOAT-127 | KLAC A9(9分)超过ASML(8分): 检测是真正的范式不可知者 | inference | M | 9.5 |
| EC-MOAT-128 | 投资排名综合矩阵: KLAC最优性价比, LRCX最低 | inference | M | 9.6.3 |
| EC-MOAT-129 | A-Score vs B-Score交叉验证预测: 4项中2项一致/2项偏差 | inference | M | 9.7.2 |

### B.2.11 EC-UE: 单位经济学 (30张, Ch11)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-UE-001 | KLAC毛利率61.9%: 核心壁垒是"边际复制成本接近零"的软件/算法 | inference | H | 11.1 |
| EC-UE-002 | ASML毛利率52.8%天花板: Zeiss/Trumpf外购成本占COGS 55-65% | inference | M | 11.2 |
| EC-UE-003 | ASML DUV→EUV→High-NA的毛利率阶梯 | inference | M | 11.2 |
| EC-UE-004 | ASML毛利率天花板52-54%由EUV光学/光源外购成本决定 | inference | M | 11.2 |
| EC-UE-005 | ASML ROIC 135.6%的客户预付款驱动(IC/收入=0.21x vs 均值0.40x) | inference | H | 11.2 |
| EC-UE-006 | High-NA EUV初期毛利率可能短暂下行-1至-3pp | estimate | M | 11.2 |
| EC-UE-007 | LRCX CSBG是"隐藏的年金资产"，独立估值约$80-100B | inference | M | 11.3 |
| EC-UE-008 | LRCX CSBG ARPU三重增长引擎: 可在3年内从$72K推至$85-95K | estimate | M | 11.3 |
| EC-UE-009 | CSBG占比每+1pp → 混合毛利率+0.14pp | inference | H | 11.3 |
| EC-UE-010 | KLAC"半导体行业软件公司"假说四重验证 | inference | H | 11.4 |
| EC-UE-011 | KLAC"双高"毛利率: 系统58-62%和服务68-72%均为四家最高 | inference | M | 11.4 |
| EC-UE-012 | KLAC R&D效率领先: R&D/毛利18.2%(最低) + 毛利/R&D 5.8x(最高) | inference | H | 11.4 |
| EC-UE-013 | AMAT"综合设备商"毛利率代价估计3-5pp | estimate | M | 11.5 |
| EC-UE-014 | AMAT AGS ARPU $15K/台远低于LRCX CSBG $72K/腔(调整后仍差~2x) | inference | H | 11.5 |
| EC-UE-015 | AMAT EPIC Center盈亏平衡: $5B需每年~$1.1B增量收入 | estimate | M | 11.5 |
| EC-UE-016 | AMAT毛利率天花板52-54%: 即使全部改善仍低于KLAC 8-10pp | estimate | M | 11.5 |
| EC-UE-017 | FCF/NI排序: ASML(1.16x) > LRCX(1.07x) > KLAC(0.96x) > AMAT(0.79x) | fact | H | 11.6 |
| EC-UE-018 | 季度FCF稳定性: KLAC(CV~8%) >> LRCX(~40%) > AMAT(~50%) >> ASML(>200%) | fact | H | 11.6 |
| EC-UE-019 | 美国vs欧洲SBC结构差异: 美国三家1.9-2.3%，ASML仅~0.3% | fact | H | 11.6 |
| EC-UE-020 | FCF质量排名: ASML(9/10) > LRCX=KLAC(8/10) > AMAT(5/10) | inference | M | 11.6 |
| EC-UE-021 | ASML R&D存在部分资本化(IFRS): 调整后R&D/毛利从27.2%升至~32-33% | inference | M | 11.7 |
| EC-UE-022 | R&D效率排名: KLAC(#1) > LRCX(#2) > ASML(#3) > AMAT(#4) | inference | M | 11.7 |
| EC-UE-023 | B2综合评分: KLAC(8.5) > ASML(7.8) > LRCX(7.3) > AMAT(4.9) | inference | M | 11.8 |
| EC-UE-024 | WFE -20%压力测试: FCF抗冲击 KLAC>LRCX>ASML>AMAT | estimate | M | 11.8 |
| EC-UE-025 | 经营杠杆非对称性排序: KLAC(~1.1x) > LRCX > ASML > AMAT(~1.35x) | estimate | M | 11.8 |
| EC-UE-026 | FCF利润率/P/E效率: KLAC(0.70) > ASML(0.66) > LRCX(0.64) > AMAT(0.58) | inference | M | 11.9 |
| EC-UE-027 | 装机基数变现效率: LRCX(+16%) ≈ KLAC(+14%) >> AMAT(+3%) | fact | H | 11.9 |
| EC-UE-028 | 单位经济学对估值框架三重启示(KLAC用软件框架/ASML用P/FCF等) | inference | M | 11.9 |
| EC-UE-029 | LRCX CSBG占比提升路径为"阶梯式"(WFE下行年份跳升) | inference | M | 11.3 |
| EC-UE-030 | ASML流动比率1.26x/速动比率0.72x是垄断特征而非弱点 | inference | H | 11.2 |

### B.2.12 EC-CAP: 资本强度 (25张, Ch12)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-CAP-001 | 四维综合排序: KLAC >> LRCX > ASML >> AMAT(全四维度) | fact | H | 12.1 |
| EC-CAP-002 | AMAT CapEx 4年增长237%(FY2021 $0.67B→FY2025 $2.26B) | fact | H | 12.1 |
| EC-CAP-003 | KLAC 5年CapEx/折旧均值=0.79x: "资产负向积累"状态 | inference | H | 12.1 |
| EC-CAP-004 | AMAT季度CapEx从$257M飙升至$785M(+205%)后回落 | fact | H | 12.2 |
| EC-CAP-005 | AMAT FCF利润率从28.6%降至20.1%, CapEx增加贡献~7pp下降 | fact | H | 12.2 |
| EC-CAP-006 | EPIC Center成功情景: attach率20%→35-40%, FCF margin恢复27-30% | assumption | L | 12.2 |
| EC-CAP-007 | EPIC Center $5B本质是"资本化的R&D"，含SBC真实R&D/收入18-20% | inference | M | 12.2 |
| EC-CAP-008 | CCC排序: AMAT(172d) < LRCX(194d) < KLAC(239d) < ASML(333d) | fact | H | 12.3 |
| EC-CAP-009 | ASML存货$11.42B(占总资产22.6%)，被客户预付款大幅抵消 | inference | H | 12.3 |
| EC-CAP-010 | LRCX DPO仅15天可能是有意的供应链快速付款策略 | inference | M | 12.3 |
| EC-CAP-011 | LRCX是唯一商誉为零的公司(纯有机增长) | fact | H | 12.4 |
| EC-CAP-012 | ASML Cymer收购极成功(EUV基石), HMI效果有限(YieldStar仅35%) | inference | H | 12.4 |
| EC-CAP-013 | LRCX纯有机增长: 4Y CAGR=4.7%全内生，资产负债表最清洁 | inference | H | 12.4 |
| EC-CAP-014 | 有机CAGR与资本强度呈反向关系: KLAC(14%/2.8%) vs AMAT(5%/8.0%) | inference | H | 12.4 |
| EC-CAP-015 | R&D杠杆: KLAC(1.36x) >> ASML(0.97x) > LRCX(0.53x) > AMAT(0.42x) | inference | H | 12.5 |
| EC-CAP-016 | 含SBC后"真实R&D/收入"差距缩窄(LRCX 13.2%≈KLAC 13.4%) | inference | H | 12.5 |
| EC-CAP-017 | R&D传导时滞: KLAC(3-4年) < LRCX(4-5年) < AMAT(5-6年) < ASML(8-10年) | estimate | M | 12.5 |
| EC-CAP-018 | KLAC FY2022杠杆回购: $4.87B(超FCF), 通过新增债务$3.22B填补 | fact | H | 12.6 |
| EC-CAP-019 | ASML $10.2B净现金年化机会成本~$300-400M，为技术不确定性的"保险" | inference | H | 12.6 |
| EC-CAP-020 | AMAT FY2025回购+股息($6.28B)超FCF($5.70B)约$0.58B: 不可持续 | inference | H | 12.6 |
| EC-CAP-021 | 增量收入资本效率: KLAC($0.24)是AMAT($1.13)的4.7倍 | fact | H | 12.7 |
| EC-CAP-022 | 50%增长所需累积CapEx: KLAC(~$1.5B) vs AMAT(~$15.9B), 差10.6倍 | estimate | M | 12.7 |
| EC-CAP-023 | B3综合评分: KLAC(8.6) >> LRCX(7.4) = ASML(7.4) >> AMAT(5.0) | inference | M | 12.8 |
| EC-CAP-024 | 资本效率越高有机增速越快——增长来自无形资产而非有形资产 | inference | M | 12.7 |
| EC-CAP-025 | AMAT B3评分含"时间错配折价", FY2028后可改善至6.5-7.0 | assumption | L | 12.8 |

### B.2.13 EC-RISK: 风险图谱 (35张, Ch14)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-RISK-001 | 风险时间窗分类: 六类从1季度(财务)到120个月(范式) | framework | H | 14.1 |
| EC-RISK-002 | 最危险组合WFE下行+出口管制+Memory衰退, 联合概率5-8% | inference | M | 14.1 |
| EC-RISK-003 | WFE>15%下行在25年中发生4次(约6年一次) | fact | M | 14.2 |
| EC-RISK-004 | 周期Beta: LRCX(1.3-1.5x) > AMAT(1.0x) > KLAC(0.7x) > ASML(0.5x) | estimate | M | 14.2 |
| EC-RISK-005 | WFE-20%冲击AMAT FCF利润率从22%降至14-17% | estimate | M | 14.2 |
| EC-RISK-006 | LRCX Memory双重冲击: Memory CapEx -40%→总收入降33-37% | estimate | M | 14.2 |
| EC-RISK-007 | LRCX CSBG Beta仅0.2-0.3x, 提供$6.5-7.0B收入底部 | inference | H | 14.2 |
| EC-RISK-008 | Polymarket台海冲突概率10.45%, 真实概率可能5-8% | fact/estimate | H/L | 14.3 |
| EC-RISK-009 | ASML隐含"10%概率x30%收入损失"=3%期望收入风险 | inference | M | 14.3 |
| EC-RISK-010 | 出口管制升级方向: 成熟节点(15-25%)+服务管制(5-10%) | estimate | L | 14.3 |
| EC-RISK-011 | 管制悖论: 限制越严→中国政策支持越强→国产市场越大 | inference | M | 14.3 |
| EC-RISK-012 | 台海vs管制反协同: ASML风险折扣有上限(5-8% P/E) | inference | M | 14.3 |
| EC-RISK-013 | NAURA获非中国Tier-1 fab订单将是分水岭(3年概率5-10%) | estimate | M | 14.4 |
| EC-RISK-014 | 国产替代时间分化: 成熟3-5年40-50%；高壁垒10年+仍困难 | estimate | M | 14.4 |
| EC-RISK-015 | 无单一竞争威胁足以颠覆现有格局; TEL对LRCX HAR最值得关注 | inference | M | 14.4 |
| EC-RISK-016 | GAA增加设备需求密度15-20%/代; KLAC是最大受益者 | inference | M | 14.5 |
| EC-RISK-017 | 先进封装替代风险极低: 封装增量仅占前道增量29% | estimate | M | 14.5 |
| EC-RISK-018 | KLAC杠杆是"聪明杠杆": D/E 1.08x用于回购, ROIC 54%>>利率4-5% | inference | H | 14.6 |
| EC-RISK-019 | EPIC Center: $5B投资, 成功概率20-25%, 失败概率25-35% | inference | M | 14.6 |
| EC-RISK-020 | ASML客户集中是结构性特征(市场仅3-5家客户) | inference | H | 14.6 |
| EC-RISK-021 | LRCX Memory 50-55%(四家最高), 管理层目标FY2030降至40-45% | inference | H | 14.6 |
| EC-RISK-022 | 全行业P/E均高于5Y均值23-82%; LRCX溢价最高 | estimate | M | 14.6 |
| EC-RISK-023 | 三重打击条件概率从5-8%升至15-25%(事件相关性0.3-0.5) | inference | L | 14.8 |
| EC-RISK-024 | AMAT温水煮青蛙情景(概率25-30%): 5年市值-22~-30% | estimate | M | 14.8 |
| EC-RISK-025 | LRCX 2021 Q4类比: 三重正面→6月后-48%; P/E溢价82%放大下行 | inference | M | 14.8 |
| EC-RISK-026 | 防御性排名: KLAC(1.71)>ASML(2.00)>AMAT(2.35)>LRCX(2.59) | inference | M | 14.9 |
| EC-RISK-027 | LRCX防御性最差+进攻性最强=典型高Beta | inference | M | 14.9 |
| EC-RISK-028 | KLAC风险调整后最优: 防御/B2/B3均#1 | inference | M | 14.9 |
| EC-RISK-029 | KLAC B5=8.0(最高): 唯一威胁是杠杆+利率+WFE三重打击(3-5%) | inference | H | 14.10 |
| EC-RISK-030 | AMAT B5=4.5(最低): 风险面最广(四维同时暴露) | inference | M | 14.10 |
| EC-RISK-031 | 出口管制传导链: 管制→中国需求↓→产能过剩→定价压力(5-8步) | framework | M | 14.3 |
| EC-RISK-032 | 反协同关系限制风险叠加: ASML风险折扣有上限 | inference | M | 14.3 |
| EC-RISK-033 | CSBG安装基数锁定: 100K+腔室使LRCX维持$6.5-7.0B收入底部 | inference | H | 14.2 |
| EC-RISK-034 | 四公司风险"形状": ASML极端化/KLAC均衡/LRCX集中/AMAT分散 | inference | M | 14.9 |
| EC-RISK-035 | B5评分排序与投资策略匹配: KLAC>ASML>LRCX>AMAT | inference | M | 14.10 |

### B.2.14 EC-XA: 交叉分析 (30张, Ch15)

由于EC-XA条目已在B.2节其他位置详细记录，此处提供精简索引:

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-XA-001 | 3/4家公司存在A-Score与B-Score排名错位 | inference | H | 15.1 |
| EC-XA-002 | B-Score本质是"性价比评分"(B2+B4合计50%权重) | framework | H | 15.1 |
| EC-XA-003 | B1评分: ASML(7.5)>KLAC(7.3)>LRCX(6.4)>AMAT(5.0) | inference | M | 15.1 |
| EC-XA-004 | 排名流动: 顶部翻转(ASML↔KLAC)+底部固化(LRCX/AMAT) | inference | H | 15.2 |
| EC-XA-005 | 四家全落入I或III象限(双高或双低), 护城河与效率强正相关 | inference | H | 15.2 |
| EC-XA-006 | ASML尖峰型(A4/A5=10驱动) vs KLAC平台型(无短板+A9=9) | inference | H | 15.2 |
| EC-XA-007 | LRCX品质溢价30%但价格溢价34%, 差额4pp="叙事溢价" | inference | M | 15.2 |
| EC-XA-008 | 马太断层: B-Score差距(2.06)>A-Score差距(1.67), 放大23% | inference | H | 15.2 |
| EC-XA-009 | B4排名翻转(LRCX#3↔AMAT#4): 唯一"品质高但估值更差"反转 | inference | M | 15.2 |
| EC-XA-010 | A2→B2反直觉: 最高切换成本(ASML)未产出最高毛利率 | inference | H | 15.3 |
| EC-XA-011 | A4→B3不成立: 利润池卡位#1(ASML)≠资本效率#1(KLAC) | inference | M | 15.3 |
| EC-XA-012 | A5→B4强正相关(r≈0.95): LRCX是唯一离群值 | inference | H | 15.3 |
| EC-XA-013 | A6→B5不成立: 经常性收入≠低风险(LRCX反例) | inference | H | 15.3 |
| EC-XA-014 | A9→B1成立(r≈0.85): 范式免疫→周期韧性 | inference | M | 15.3 |
| EC-XA-015 | A8→B2+B3最强关联(r≈0.98): 竞争压力预测经济质量 | inference | H | 15.3 |
| EC-XA-016 | 评估效率看A8(非A2)，评估估值看A5(非A6) | inference | M-H | 15.3 |
| EC-XA-017 | 综合总分: ASML(7.78) ≈ KLAC(7.65) >> LRCX(6.50) > AMAT(5.19) | inference | H | 15.4 |
| EC-XA-018 | 权重敏感性: 40:60到60:40范围内排名不翻转 | inference | H | 15.4 |
| EC-XA-019 | 三梯队: T1(ASML+KLAC) >> T2(LRCX) > T3(AMAT) | inference | H | 15.4 |
| EC-XA-020 | KLAC市值/评分效率最高(市值#4但评分#2) | inference | M | 15.4 |
| EC-XA-021 | KLAC经济效率折价: B2/B3/B5均#1但B4仅#2 | inference | M | 15.5 |
| EC-XA-022 | ASML B2非#1: EUV物理制造复杂度施加毛利率硬约束 | inference | H | 15.5 |
| EC-XA-023 | LRCX品质-价格倒挂: P/E溢价34%>品质溢价30% | inference | H | 15.5 |
| EC-XA-024 | AMAT全面一致(排名标准差0.25最低): 市场定价效率最高 | inference | M-H | 15.5 |
| EC-XA-025 | LRCX梯队降级: A-Score T1→综合T2, 95%归因于B4(3.55) | inference | M | 15.5 |
| EC-XA-026 | 评分→投资决策需叠加时间偏好/风险偏好/组合构建 | framework | H | 15.6 |
| EC-XA-027 | Ch15→Ch16-19问题传递清单 | framework | H | 15.6 |
| EC-XA-028 | 评分体系三重局限: 权重主观性+时点依赖性+数据源风险 | framework | H | 15.6 |
| EC-XA-029 | A-Score与B-Score相关系数约0.97(小样本n=4限制) | inference | M | 15.2 |
| EC-XA-030 | ASML+KLAC双核组合优于单一持股(形状互补) | inference | M | 15.6 |

### B.2.15 EC-H2H: 对决分析 (30张, Ch16)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-H2H-001 | 8维度框架: D1-D3品质/D4-D5价值/D6-D8风险 | framework | H | 16.0 |
| EC-H2H-002 | ASML"尖峰型"vs KLAC"平台型"护城河: 单点故障脆弱性差异 | inference | H | 16.1 |
| EC-H2H-003 | ASML"订单驱动型"增长 vs KLAC"趋势驱动型"增长 | inference | H | 16.1 |
| EC-H2H-004 | ASML风险"双峰型"(99%安全+1%灾难) vs KLAC"正态型" | inference | H | 16.1 |
| EC-H2H-005 | ASML vs KLAC 4:4条件胜者, 优势不重叠→同持最优 | inference | H | 16.1 |
| EC-H2H-006 | LRCX每单位品质估值溢价14%(P/E/A-Score 7.25x vs ASML 6.37x) | inference | M | 16.2 |
| EC-H2H-007 | ASML vs LRCX 5:2:1清晰胜出 | inference | H | 16.2 |
| EC-H2H-008 | AMAT品质调整P/E(6.99x)反而高于ASML(6.37x): "便宜"是伪命题 | inference | M | 16.3 |
| EC-H2H-009 | ASML vs AMAT 7:0:1清晰胜出 | inference | H | 16.3 |
| EC-H2H-010 | KLAC 6维度胜出LRCX但市值仅其64%: 叙事溢价13.3% | inference | H | 16.4 |
| EC-H2H-011 | WFE -15%: LRCX股价跌幅(-45~55%)是KLAC(-20~25%)约2倍 | estimate | M | 16.4 |
| EC-H2H-012 | KLAC vs LRCX市值倒挂三种解读; 本报告倾向"KLAC被低估" | inference | M | 16.4 |
| EC-H2H-013 | KLAC vs LRCX 6:2清晰胜出: 投资决策含义最大的对决 | inference | M-H | 16.4 |
| EC-H2H-014 | KLAC vs AMAT经济质量鸿沟(B2差3.6分): 所有对决最大单维度差距 | inference | H | 16.5 |
| EC-H2H-015 | AMAT 37.9x P/E品质调整后反而高于KLAC | inference | H | 16.5 |
| EC-H2H-016 | KLAC vs AMAT 6:0:2清晰胜出 | inference | H | 16.5 |
| EC-H2H-017 | LRCX vs AMAT概率加权LRCX更高但Sharpe近似 | inference | M | 16.6 |
| EC-H2H-018 | "集中vs通才"哲学: LRCX上行弹性大+下行风险也大 | inference | M | 16.6 |
| EC-H2H-019 | LRCX vs AMAT名义6:2但实质"周期依赖" | inference | M | 16.6 |
| EC-H2H-020 | 对决战绩与Ch15综合评分完美一致(内部一致性验证) | inference | H | 16.7 |
| EC-H2H-021 | 最优两只组合: ASML+KLAC(品质最高+互补最强) | inference | H | 16.7 |
| EC-H2H-022 | 六种组合排名: ASML+KLAC最优, LRCX+AMAT最差(品质差32%) | inference | H | 16.7 |
| EC-H2H-023 | 三个洞见: 品质税不存在/叙事溢价最大偏差/动量不改长期排名 | inference | H | 16.7 |
| EC-H2H-024 | KLAC 61.9%毛利率vs ASML 52.8%: "算法密度vs物理复杂度" | inference | H | 16.1 |
| EC-H2H-025 | ASML品质调整P/E 6.37x < KLAC 6.40x: "51.7x比49.0x贵"是陷阱 | inference | H | 16.1 |
| EC-H2H-026 | ASML Beta略优于KLAC但股价回撤更大(2022-2023: -45% vs -35%) | inference | M | 16.1 |
| EC-H2H-027 | LRCX胜KLAC条件: WFE超级周期+HBM CAGR>30%+持有<18月(联合20-25%) | inference | M-H | 16.4 |
| EC-H2H-028 | 台海冲突: AMAT(-30~45%)可能小于ASML(-50~70%): 分散=保护 | inference | M | 16.3 |
| EC-H2H-029 | AMAT品质调整P/E(6.99x)低于LRCX(7.25x): AMAT相对确实更便宜 | inference | M | 16.6 |
| EC-H2H-030 | LRCX+AMAT应避免: 品质最低+竞争重叠+风险相关 | inference | H | 16.7 |

### B.2.16 EC-SCN: 情景分析 (30张, Ch17)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-SCN-001 | 三情景覆盖~90-95%概率空间 | framework | H | 17.1 |
| EC-SCN-002 | 概率分配: Bull 28%/Base 47%/Bear 25% | estimate | H | 17.1 |
| EC-SCN-003 | Bull WFE路径$135→$150→$165B, 需AI WFE CAGR~30% | estimate | M | 17.2 |
| EC-SCN-004 | Base CY2027 WFE -4%由Memory短周期库存调整驱动 | assumption | M | 17.2 |
| EC-SCN-005 | Bear WFE两年累计-28%, 介于CY2023(-22%)和CY2009(-44%)之间 | estimate | M | 17.2 |
| EC-SCN-006 | 概率加权WFE路径呈"浅V型"($130→$124→$131B) | estimate | H | 17.2 |
| EC-SCN-007 | ASML Bull FY2028 €56B=2030目标上沿, 提前两年 | estimate | H | 17.3 |
| EC-SCN-008 | ASML Bear目标€434隐含-71%跌幅 | estimate | M | 17.3 |
| EC-SCN-009 | ASML概率加权期望回报+4.2% | estimate | H | 17.3 |
| EC-SCN-010 | KLAC Bull目标$2,800-3,080需收入15%+ CAGR | estimate | M | 17.4 |
| EC-SCN-011 | KLAC Bear EPS底部$23.4高于FY2023的$23.11: 盈利底部逐周期抬高 | estimate | M | 17.4 |
| EC-SCN-012 | KLAC在Bear概率高达35%时仍保持正期望回报 | estimate | H | 17.4 |
| EC-SCN-013 | LRCX Bull享有双重杠杆(EPS+81%, P/E-17%, 净效应+50%) | inference | H | 17.5 |
| EC-SCN-014 | LRCX Base回报-38%: P/E从50.9x压缩至27.5x主导 | inference | H | 17.5 |
| EC-SCN-015 | LRCX Bear EPS $1.85(-61%): 收入-37%+净利率压缩-11.7pp | estimate | M | 17.5 |
| EC-SCN-016 | LRCX需Bull概率>46%才能产生正期望回报(本报告估计28%) | inference | H | 17.5 |
| EC-SCN-017 | AMAT Bull +37%主要来自EPS(+71%)而非P/E(压缩-20%) | estimate | H | 17.6 |
| EC-SCN-018 | AMAT Bear目标$68-82接近CY2022实际低点 | estimate | M | 17.6 |
| EC-SCN-019 | AMAT概率加权期望回报-22.4%: 通才模式P/E天花板30-35x | estimate | H | 17.6 |
| EC-SCN-020 | 期望回报排名KLAC(+17.7%)>ASML(+4.2%)>>AMAT(-22.4%)>LRCX(-24.9%) | inference | H | 17.7 |
| EC-SCN-021 | KLAC在Bull/Bear/后悔最小化全维度排名#1 | inference | H | 17.7 |
| EC-SCN-022 | LRCX"不对称不利"结构: Bear -86% vs Bull +51% | inference | H | 17.7 |
| EC-SCN-023 | KLAC后悔最小化: 所有三情景均为最优选择(后悔值=0) | inference | H | 17.7 |
| EC-SCN-024 | KLAC#1在Bull 15-50%/Bear 15-35%极宽范围内稳定 | estimate | H | 17.8 |
| EC-SCN-025 | 中国管制升级是唯一改变KLAC绝对回报符号的变量 | estimate | M | 17.8 |
| EC-SCN-026 | LRCX在所有恶化情景下期望回报恶化幅度最大 | estimate | M | 17.8 |
| EC-SCN-027 | 四公司×三情景完整EPS/P/E/目标价/回报率矩阵 | estimate | H | 17.7 |
| EC-SCN-028 | Base情景仅KLAC和ASML正回报, AMAT/LRCX负回报 | inference | H | 17.7 |
| EC-SCN-029 | LRCX当前定价隐含Bull概率约46%(vs 本报告28%) | inference | H | 17.5 |
| EC-SCN-030 | 情景排名与综合排名差异来源: 估值起点+周期Beta | inference | H | 17.7 |

### B.2.17 EC-ECO: 竞争生态 (25张, Ch18)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-ECO-001 | 前五大设备公司份额从60%→75%, "割据型寡头"在强化 | inference | H | 18.1 |
| EC-ECO-002 | ASML-KLAC品类几乎零重叠, AMAT-LRCX重叠最高 | inference | H | 18.1 |
| EC-ECO-003 | AMAT eBeam检测份额13%→<8%为品类跨界最失败案例 | inference | H | 18.1 |
| EC-ECO-004 | AMAT"图案化SAM 30%"≠"刻蚀总份额30%", 全品类仅15-20% | inference | M | 18.2 |
| EC-ECO-005 | TEL Certas基准情景: LRCX HAR份额从100%降至85-90% | estimate | M | 18.2 |
| EC-ECO-006 | KLAC 63%份额从2005年50%持续扩大, 15年无有意义竞争者 | inference | H | 18.2 |
| EC-ECO-007 | ASML竞争风险来自客户行为和出口管制, 非竞争对手 | inference | H | 18.2 |
| EC-ECO-008 | 中国国产替代对AMAT冲击最大(-$1.5~2.5B/年), KLAC最小 | estimate | M | 18.2 |
| EC-ECO-009 | Bundle策略在行业中效果有限: 客户分权化决策+份额趋势反证 | inference | H | 18.3 |
| EC-ECO-010 | 先进封装是bundle首次可能获得技术合理性的领域(联合概率20-25%) | estimate | L | 18.3 |
| EC-ECO-011 | ASML红队: 垄断不可推翻, 增长假设面临时间延迟 | inference | M | 18.4 |
| EC-ECO-012 | KLAC红队: 四个挑战均未推翻, Bull Case最稳健 | inference | H | 18.4 |
| EC-ECO-013 | LRCX三重正面信号是滞后指标, 2021 Q4前车之鉴 | inference | H | 18.4 |
| EC-ECO-014 | LRCX红队: Bull Case最脆弱(高Beta+高估值+Memory集中) | inference | H | 18.4 |
| EC-ECO-015 | AMAT红队: P/E 37.9x不是低估, 是结构性劣势的准确定价 | inference | H | 18.4 |
| EC-ECO-016 | 红队稳健性排名(KLAC#1)与综合评分(ASML#1)不一致 | inference | H | 18.4 |
| EC-ECO-017 | 侵蚀信号优先级排序: MES-LRCX-2(即时)>MES-AMAT-1(中) | framework | M | 18.5 |
| EC-ECO-018 | "最确定不变"的元素是长期投资价值基石 | inference | H | 18.6 |
| EC-ECO-019 | KLAC对三类不确定性暴露最低, LRCX暴露最高 | inference | M | 18.6 |
| EC-ECO-020 | AMAT Suite Selling 20年效果不佳: 毛利率48.7%无bundle溢价 | inference | H | 18.3 |
| EC-ECO-021 | LRCX HAR刻蚀15年recipe library使AMAT在HAR几乎零份额 | inference | H | 18.2 |
| EC-ECO-022 | KLAC AI检测: AI是加速器(卖铲人)而非威胁 | inference | H | 18.4 |
| EC-ECO-023 | AMAT EPIC联合成功概率23%(80%×45%×65%), 部分成功40-50% | estimate | L | 18.4 |
| EC-ECO-024 | 中国国产替代5年内从28nm向14nm推进, 先进仍5-10年差距 | estimate | M | 18.2 |
| EC-ECO-025 | High-NA EUV的TSMC采纳时间是ASML增长叙事最大不确定变量 | inference | M | 18.6 |

### B.2.18 EC-DEC: 决策框架 (25张, Ch19)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-DEC-001 | 五种投资者类型分类框架(品质复利/确定性溢价/周期动量/价值猎手/防御型) | framework | H | 19.1 |
| EC-DEC-002 | 品质复利型和周期动量型与均衡权重偏差最大 | inference | M | 19.1 |
| EC-DEC-003 | 品质复利型首选KLAC: B2(8.5)+B3(8.6)+B5(8.0)三冠 | inference | H | 19.2 |
| EC-DEC-004 | ASML"技术锁定"确定性 vs KLAC"结构需求"确定性 | inference | H | 19.2 |
| EC-DEC-005 | LRCX是WFE上行最优纯粹标的, 但下行-40%至-55% | inference | H | 19.2 |
| EC-DEC-006 | AMAT概率加权期望回报+10-13%, 接近"关注"下沿 | inference | M | 19.2 |
| EC-DEC-007 | KLAC靠"结构性低波动"防御, ASML靠"积压缓冲"防御 | inference | H | 19.2 |
| EC-DEC-008 | KLAC和ASML各+3净推荐度(最高), LRCX -1(唯一负值) | inference | H | 19.2 |
| EC-DEC-009 | ASML+KLAC双持为最优配置(互补而非替代) | inference | H | 19.3 |
| EC-DEC-010 | 三种组合风险/回报: 最优双持+14-18%/-18-25% | inference | M | 19.3 |
| EC-DEC-011 | 持有期最优迁移: 6月(LRCX)→1-2年(ASML/KLAC)→3-5年(KLAC) | inference | M-H | 19.4 |
| EC-DEC-012 | ASML条件评级"关注"(基准+12-22%期望回报) | inference | H | 19.5 |
| EC-DEC-013 | KLAC两条独立"深度关注"升级路径(联合40-50%概率) | inference | M | 19.5 |
| EC-DEC-014 | LRCX评级稳定性最低: 跨三个档位波动 | inference | H | 19.5 |
| EC-DEC-015 | AMAT"中性关注": 唯一基准情景不获"关注"的公司 | inference | M-H | 19.5 |
| EC-DEC-016 | 评级与Ch15梯队完全一致: T1="关注", T2="关注(条件)", T3="中性" | inference | H | 19.5 |
| EC-DEC-017 | 护城河"形状">护城河"深度"预测风险调整后回报(Meta-Insight) | inference | M | 19.6 |
| EC-DEC-018 | 八个开放问题紧迫性排序: AI持续性>WFE转折>KLAC检测强度 | framework | M | 19.7 |
| EC-DEC-019 | KLAC 5年per-share FCF CAGR约13-15%, 累积回报55-100% | estimate | M | 19.4 |
| EC-DEC-020 | LRCX"双杀"路径: WFE -20%→收入-26~-30%+P/E压缩→股价-40~-55% | estimate | M | 19.2 |
| EC-DEC-021 | AMAT EPIC四情景概率加权期望回报+10-13% | estimate | M | 19.2 |
| EC-DEC-022 | 适配矩阵净推荐度与Ch15梯队一致(交叉验证) | inference | H | 19.2 |
| EC-DEC-023 | ASML+KLAC等权组合加权Beta约0.65-0.85x | estimate | M | 19.3 |
| EC-DEC-024 | LRCX需每季度更新评级, ASML/KLAC每半年即可 | framework | H | 19.5 |
| EC-DEC-025 | CY2026 Q3是最关键单一数据窗口(Hyperscaler CY2027 CapEx指引) | framework | H | 19.7 |

### B.2.19 EC-EXE: 执行摘要 (20张, Ch20)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-EXE-001 | "双极+断层"格局: T1内差距0.13分, T1-T2断崖1.15分 | inference | H | 20.1 |
| EC-EXE-002 | Reverse DCF优先方法论: 反推隐含假设而非正向估值 | framework | H | 20.2 |
| EC-EXE-003 | ASML+KLAC互补而非替代: 维度优势几乎不重叠 | inference | H | 20.3 |
| EC-EXE-004 | 护城河"形状"分析: 尖峰型vs平台型风险差异 | inference | H | 20.3 |
| EC-EXE-005 | KLAC"软件公司"定位: 四重定量验证 | inference | H | 20.3 |
| EC-EXE-006 | LRCX需Bull概率55%才能支撑当前价格(本报告28%) | inference | H | 20.3 |
| EC-EXE-007 | AMAT通才折价是结构性/长期/合理的 | inference | H | 20.3 |
| EC-EXE-008 | FCF Yield收敛(28bp)暗示板块定价覆盖品质差异 | inference | M | 20.3 |
| EC-EXE-009 | WFE中段加速区: 超级周期60%概率, 六层雷达5/6正面 | inference | M | 20.3 |
| EC-EXE-010 | 中国风险差异化: AMAT极高/LRCX高/ASML中/KLAC低 | inference | H | 20.3 |
| EC-EXE-011 | 三重风险组合联合概率15-25% | inference | M | 20.3 |
| EC-EXE-012 | KLAC概率加权期望回报+17.7%: "沉默冠军"效应 | inference | H | 20.3 |
| EC-EXE-013 | 分析框架对"未知的不确定性"能力有限 | framework | H | 20.4 |
| EC-EXE-014 | 四公司定位矩阵: 确定性×效率二维空间 | inference | H | 20.5 |
| EC-EXE-015 | 比较分析最有价值的产出是"差异地图"而非"排名" | framework | H | 20.6 |
| EC-EXE-016 | 半导体设备投资核心决策变量是WFE路径判断 | inference | H | 20.6 |
| EC-EXE-017 | ASML: 确定性代价——垄断+积压 vs 51.7x P/E | inference | H | 20.5 |
| EC-EXE-018 | KLAC: 沉默复利——最优效率+最低风险+最高期望回报 | inference | H | 20.5 |
| EC-EXE-019 | LRCX: 方向性赌注——Base就亏钱, 需Bull概率>55% | inference | H | 20.5 |
| EC-EXE-020 | AMAT: 等待EPIC——通才折价+催化剂依赖 | inference | H | 20.5 |

### B.2.20 EC-DSH: 决策仪表盘 (20张, Ch21)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-DSH-001 | 306个EC压缩为~20个可操作规则(压缩比5:1至11:1) | framework | H | 21.1 |
| EC-DSH-002 | ASML决策树仅3节点: 高确定性+单一风险点 | inference | H | 21.2 |
| EC-DSH-003 | KLAC 3/4路径通向持有; 决策后悔值最低 | inference | H | 21.2 |
| EC-DSH-004 | LRCX需同时满足4条件; 联合概率约24%; 决策复杂度最高 | inference | M | 21.2 |
| EC-DSH-005 | AMAT催化剂二元化: EPIC成功vs失败对应完全不同估值轨迹 | inference | M-H | 21.2 |
| EC-DSH-006 | 决策复杂度与期望回报负相关: 高确定性降低假设错误风险 | inference | M | 21.2 |
| EC-DSH-007 | ASML触发条件地缘占比44%; 监控应地缘优先于业绩 | inference | H | 21.3 |
| EC-DSH-008 | LRCX减:加=2.7:1(最不对称); 应更多关注"何时退出" | inference | H | 21.3 |
| EC-DSH-009 | AMAT加仓50%聚焦EPIC; 减仓60%聚焦中国/合规 | inference | H | 21.3 |
| EC-DSH-010 | P/E加仓线差异(42x vs 28x)反映质量溢价梯度 | inference | H | 21.3 |
| EC-DSH-011 | Tier 1中台海+B2B为"超级指标": 覆盖80%紧急决策 | inference | H | 21.4 |
| EC-DSH-012 | Tier 2专属指标映射各公司核心风险 | framework | H | 21.4 |
| EC-DSH-013 | 三层监控级联将日常负担降至7指标/每周15-20分钟 | framework | H | 21.4 |
| EC-DSH-014 | Bull切换需≥3/6条件(防误判); Bear仅需1/6(防漏判) | inference | H | 21.5 |
| EC-DSH-015 | ASML+KLAC出现在所有三种投资者组合中 | inference | H | 21.6 |
| EC-DSH-016 | 假设稳定性: EUV垄断>97%最稳定, AI持续性55-65%最不稳定 | inference | M-H | 21.7 |
| EC-DSH-017 | 报告有效期12-18个月(WFE周期锚定) | estimate | M | 21.7 |
| EC-DSH-018 | 一页操作指南+Ch14 KS注册表=完整管理工具集 | framework | H | 21.8 |
| EC-DSH-019 | 五个已知盲区: 流动性/AI叙事/黑天鹅/管理层/跨板块 | inference | H | 21.9 |
| EC-DSH-020 | 2026 Q3-Q4决策密度最高; 投资者应7月前完成预防性调整 | estimate | M | 21.9 |

### B.2.21 EC-LIM: 局限性与展望 (15张, Ch22)

| EC编号 | 主张摘要 | 类型 | 置信度 | 章节 |
|--------|---------|------|--------|------|
| EC-LIM-001 | MCP工具链单一数据源风险+已知数据质量问题 | framework | H | 22.1 |
| EC-LIM-002 | 品类份额数据三重问题(滞后/口径/自报偏差), A-Score影响±0.3分 | assumption | M | 22.1 |
| EC-LIM-003 | 顺周期偏差: WFE第4年上行期+CAPE 98%可能拉高Bull概率 | assumption | H | 22.1 |
| EC-LIM-004 | A-Score时间稳定性高(9/11维结构性), 综合排名中等(B4随估值波动) | inference | M | 22.1 |
| EC-LIM-005 | 中国国产替代数据透明度最低, 份额估计±5pp不确定性 | assumption | L | 22.1 |
| EC-LIM-006 | T1内部排序对权重敏感: 偏商业/偏风险权重下KLAC可能超越ASML | inference | H | 22.2 |
| EC-LIM-007 | A-Score"专才奖励"偏差可能结构性低估AMAT组合多样性优势 | framework | M | 22.2 |
| EC-LIM-008 | KLAC#1在Bull 15-50%范围稳定; ASML超越需Bull>45%+Bear<15% | inference | H | 22.2 |
| EC-LIM-009 | 四公司规模差异(市值3-6x)限制直接比较有效性 | framework | H | 22.2 |
| EC-LIM-010 | 期望回报是板块内相对回报, CAPE 98%下需宏观折价 | inference | H | 22.2 |
| EC-LIM-011 | 红队"自我审查"缺乏独立性, 可能存在确认偏误 | framework | H | 22.2 |
| EC-LIM-012 | 7个核心结论: 4个高稳健+2个中稳健+1个中-高稳健 | inference | M | 22.3 |
| EC-LIM-013 | 未来12-18月三大转折: WFE CY2027+TSMC CapEx+HBM曲线 | inference | M | 22.4 |
| EC-LIM-014 | ASML ROIC 135.6%可能因预付款会计处理被高估(调整后40-60%) | inference | M | 22.5 |
| EC-LIM-015 | 条件评级的正确使用: 监控条件而非评级本身 | framework | H | 22.6 |

---

## B.3 按公司的EC交叉索引

### B.3.1 与ASML相关的核心EC

| 维度 | 核心EC编号 |
|------|----------|
| 财务 | EC-FIN-002, EC-FIN-006 |
| 估值 | EC-VAL-014, EC-VAL-015, EC-VAL-021, EC-VAL-027, EC-VAL-031, EC-VAL-037, EC-VAL-038, EC-VAL-042, EC-VAL-044 |
| 护城河 | EC-MOAT-001~006(A1供应链), EC-MOAT-020~023(A2切换成本), EC-MOAT-035~038(A5技术), EC-MOAT-048~051(A3经营杠杆), EC-MOAT-064(A2-A3悖论), EC-MOAT-071(极端不对称), EC-MOAT-094(范式适应), EC-MOAT-105~106(合规壁垒), EC-MOAT-117(A-Score #1) |
| 地缘 | EC-GEO-007, EC-GEO-009, EC-GEO-014, EC-GEO-021~023, EC-GEO-034 |
| 周期 | EC-CYC-006, EC-CYC-016~017, EC-CYC-021~022 |
| 风险 | EC-RISK-008~009, EC-RISK-012, EC-RISK-020 |
| 情景 | EC-SCN-007~009 |
| 对决 | EC-H2H-002~005(vs KLAC), EC-H2H-006~007(vs LRCX), EC-H2H-008~009(vs AMAT) |
| 决策 | EC-DEC-004, EC-DEC-012, EC-EXE-017 |

### B.3.2 与KLAC相关的核心EC

| 维度 | 核心EC编号 |
|------|----------|
| 财务 | EC-FIN-001, EC-FIN-003, EC-FIN-010, EC-COMP-001 |
| 估值 | EC-VAL-016~017, EC-VAL-022, EC-VAL-028, EC-VAL-038 |
| 护城河 | EC-MOAT-011~014(A1供应链), EC-MOAT-031~034(A2切换), EC-MOAT-043~047(A3杠杆), EC-MOAT-060(非对称杠杆), EC-MOAT-065(切换-利润匹配), EC-MOAT-067(数据飞轮), EC-MOAT-070(三维均衡), EC-MOAT-083~085(A8免疫), EC-MOAT-092~093(A9范式), EC-MOAT-102(SG&A), EC-MOAT-113(A9被低估), EC-MOAT-124~125(沉默冠军折价) |
| 地缘 | EC-GEO-013, EC-GEO-024~025, EC-GEO-027, EC-GEO-033 |
| 周期 | EC-CYC-008, EC-CYC-018~020, EC-CYC-025 |
| 单位经济学 | EC-UE-010~012(软件公司假说), EC-UE-023(B2 #1) |
| 资本 | EC-CAP-001, EC-CAP-003, EC-CAP-015, EC-CAP-018, EC-CAP-021~023 |
| 风险 | EC-RISK-018(聪明杠杆), EC-RISK-028~029(B5 #1) |
| 情景 | EC-SCN-010~012, EC-SCN-020~024 |
| 对决 | EC-H2H-002~005(vs ASML), EC-H2H-010~013(vs LRCX), EC-H2H-014~016(vs AMAT) |
| 决策 | EC-DEC-003, EC-DEC-013, EC-DEC-019, EC-EXE-005, EC-EXE-012, EC-EXE-018 |

### B.3.3 与LRCX相关的核心EC

| 维度 | 核心EC编号 |
|------|----------|
| 财务 | EC-FIN-004, EC-FIN-007 |
| 估值 | EC-VAL-012~013, EC-VAL-020, EC-VAL-023, EC-VAL-029, EC-VAL-035, EC-VAL-038, EC-VAL-045 |
| 护城河 | EC-MOAT-007~010(A1供应链), EC-MOAT-024~030(A2切换), EC-MOAT-052~055(A3杠杆), EC-MOAT-062(先抑后扬), EC-MOAT-072(A3潜力), EC-MOAT-086~089(A8包抄), EC-MOAT-095(GAA利好), EC-MOAT-100~101(A10货币化) |
| 地缘 | EC-GEO-012, EC-GEO-018~020, EC-GEO-035 |
| 周期 | EC-CYC-005, EC-CYC-007, EC-CYC-014~015, EC-CYC-024 |
| 单位经济学 | EC-UE-007~009(CSBG年金), EC-UE-029(阶梯式) |
| 风险 | EC-RISK-006~007(Memory冲击), EC-RISK-021(Memory暴露), EC-RISK-025(2021类比) |
| 情景 | EC-SCN-013~016, EC-SCN-022, EC-SCN-026, EC-SCN-029 |
| 对决 | EC-H2H-006~007(vs ASML), EC-H2H-010~013(vs KLAC), EC-H2H-017~019(vs AMAT) |
| 决策 | EC-DEC-005, EC-DEC-014, EC-DEC-020, EC-EXE-006, EC-EXE-019 |

### B.3.4 与AMAT相关的核心EC

| 维度 | 核心EC编号 |
|------|----------|
| 财务 | EC-FIN-005, EC-FIN-006 |
| 估值 | EC-VAL-011, EC-VAL-019, EC-VAL-030, EC-VAL-032~033, EC-VAL-038, EC-VAL-040, EC-VAL-043, EC-VAL-045 |
| 护城河 | EC-MOAT-015~018(A1供应链), EC-MOAT-035~042(A2切换), EC-MOAT-056~059(A3杠杆), EC-MOAT-063(EPIC二元), EC-MOAT-067(三堡垒), EC-MOAT-073(堡垒>广度), EC-MOAT-087(刻蚀入侵), EC-MOAT-090~091(A8份额持平), EC-MOAT-096~097(A9广度对冲), EC-MOAT-103(交叉销售失败), EC-MOAT-115(P/E与A-Score匹配), EC-MOAT-126(通才折价诊断) |
| 地缘 | EC-GEO-005~006, EC-GEO-010~011, EC-GEO-015~017, EC-GEO-036~037 |
| 周期 | EC-CYC-005, EC-CYC-009, EC-CYC-012~013, EC-CYC-023 |
| 单位经济学 | EC-UE-013~016(通才代价), EC-UE-023(B2 #4) |
| 资本 | EC-CAP-002, EC-CAP-004~007(EPIC), EC-CAP-020, EC-CAP-025 |
| 风险 | EC-RISK-005(FCF冲击), EC-RISK-019(EPIC赌注), EC-RISK-024(温水煮青蛙), EC-RISK-030(B5 #4) |
| 情景 | EC-SCN-017~019 |
| 对决 | EC-H2H-008~009(vs ASML), EC-H2H-014~016(vs KLAC), EC-H2H-017~019(vs LRCX) |
| 决策 | EC-DEC-006, EC-DEC-015, EC-DEC-021, EC-EXE-007, EC-EXE-020 |

### B.3.5 跨公司/行业级EC

| 类别 | EC编号 |
|------|--------|
| 宏观/WFE | EC-VAL-001, EC-MKT-001~011, EC-CYC-001~004 |
| 行业格局 | EC-VC-001~002, EC-ECO-001~003, EC-ECO-009 |
| 分析框架 | EC-XA-001~002, EC-XA-005, EC-XA-015, EC-XA-017~019, EC-XA-026~029 |
| 情景框架 | EC-SCN-001~006, EC-SCN-020, EC-SCN-027~028, EC-SCN-030 |
| 方法论局限 | EC-LIM-001~015, EC-EXE-002, EC-EXE-013, EC-EXE-015 |
| 投资框架 | EC-DEC-001~002, EC-DEC-009, EC-DEC-018, EC-DEC-025, EC-DSH-001, EC-DSH-013 |

---

## B.4 EC质量统计

### B.4.1 Claim Type分布

| claim_type | 数量 | 占比 | 主要出现章节 |
|------------|------|------|------------|
| fact | ~95 | 18% | Ch3(MKT), Ch4(VC), Ch5(GEO), Ch10(CYC), Ch11(UE), Ch12(CAP) |
| estimate | ~80 | 15% | Ch10(CYC), Ch13(VAL), Ch14(RISK), Ch17(SCN) |
| inference | ~285 | 53% | 全章节, 集中在Ch6-Ch9(MOAT), Ch15-Ch19 |
| assumption | ~20 | 4% | Ch12(CAP-006/025), Ch17(SCN-004), Ch22(LIM) |
| framework | ~54 | 10% | Ch15(XA), Ch19(DEC), Ch20(EXE), Ch21(DSH), Ch22(LIM) |

### B.4.2 置信度分布

| 置信度 | 数量 | 占比 | 说明 |
|--------|------|------|------|
| H | ~220 | 41% | 多源验证+直接数据+历史支撑 |
| M | ~265 | 50% | 单源/推理链长/部分假设 |
| L | ~30 | 6% | 高度前瞻/假设密集 |
| 混合 | ~19 | 3% | M-H或L-M |

### B.4.3 每章EC密度

| 章节 | 定义EC数 | 章节字符(约) | 密度(EC/万字符) |
|------|---------|------------|----------------|
| P0 (shared_context) | 10 | ~5K | 20.0 |
| Ch3 WFE周期 | 32 | ~30K | 10.7 |
| Ch4 价值链 | 21 | ~30K | 7.0 |
| Ch5 地缘政治 | 38 | ~30K | 12.7 |
| Ch6 护城河A1-A3 | 74 | ~35K | 21.1 |
| Ch7 护城河A4-A7 | 50 | ~35K | 14.3 |
| Ch8 护城河A8-A11 | 36 | ~35K | 10.3 |
| Ch9 A-Score综合 | 30 | ~30K | 10.0 |
| Ch10 周期定位 | 30 | ~35K | 8.6 |
| Ch11 单位经济学 | 30 | ~55K | 5.5 |
| Ch12 资本强度 | 25 | ~45K | 5.6 |
| Ch13 估值 | 36 | ~60K | 6.0 |
| Ch14 风险图谱 | 35 | ~45K | 7.8 |
| Ch15 综合记分卡 | 30 | ~60K | 5.0 |
| Ch16 对决分析 | 30 | ~45K | 6.7 |
| Ch17 情景分析 | 30 | ~60K | 5.0 |
| Ch18 竞争生态 | 25 | ~45K | 5.6 |
| Ch19 投资者矩阵 | 25 | ~50K | 5.0 |
| Ch20 执行摘要 | 20 | ~55K | 3.6 |
| Ch21 决策仪表盘 | 20 | ~50K | 4.0 |
| Ch22 局限性 | 15 | ~45K | 3.3 |

> **密度趋势**: Ch6(A1-A3, 21.1)密度最高, 反映护城河评分的证据密集特征。后序章节(Ch15-Ch22)密度较低(3.3-6.7), 因为这些章节主要是对前序EC的交叉引用和推理, 而非产出新的原始数据。

### B.4.4 Fact比率评估

- **目标**: ≥36% (原始P0设定)
- **实际**: ~18%
- **评估**: Fact比率低于目标, 但这反映了报告性质的转变。原始目标基于单公司深度报告(数据汇编占比更大)。比较分析报告的核心价值在inference(交叉推理), fact主要集中在数据密集的P0-P1阶段(Ch3-Ch5约60张fact, 占fact总数的63%)。后序章节不产出新事实, 而是对已有事实进行交叉分析。
- **改进建议**: 如果需要提升fact比率, 应在Ch10-Ch12增加更多直接数据引用(如季度财务数据的逐项列举)。

---

## B.5 高影响力EC精选

### B.5.1 被引用次数最多的10张EC

以下EC在多个章节中被反复引用, 构成全报告的"骨架证据":

| 排名 | EC编号 | 核心主张 | 引用章节数 | 影响范围 |
|------|--------|---------|----------|---------|
| 1 | EC-MOAT-117 | A-Score排名: ASML>KLAC>LRCX>AMAT | ≥10 | 全报告评分锚点 |
| 2 | EC-VAL-038 | B4评分排序: ASML>>KLAC>AMAT>>LRCX | ≥8 | 估值结论核心 |
| 3 | EC-VAL-001 | 宏观CAPE 98百分位/Buffett 99百分位 | ≥6 | 全报告估值背景 |
| 4 | EC-FIN-001 | 四公司毛利率排序(KLAC 61.9%领先) | ≥6 | 经济质量基石 |
| 5 | EC-COMP-001 | KLAC="半导体行业软件公司" | ≥5 | KLAC定位核心论断 |
| 6 | EC-CYC-002 | WFE第4年上行=30年最长 | ≥5 | 周期分析基准 |
| 7 | EC-MOAT-090 | AMAT WFE 19%份额5年持平, 0个#1 | ≥5 | AMAT通才折价核心证据 |
| 8 | EC-XA-019 | T1(ASML+KLAC)>>T2(LRCX)>T3(AMAT) | ≥5 | 梯队划分定义 |
| 9 | EC-SCN-020 | 期望回报: KLAC>ASML>>AMAT>LRCX | ≥4 | 情景结论核心 |
| 10 | EC-GEO-016 | AMAT $252M罚款+三年悬剑条款 | ≥4 | AMAT合规风险核心 |

### B.5.2 对最终排名影响最大的5张EC

| EC编号 | 核心主张 | 影响说明 |
|--------|---------|---------|
| EC-MOAT-117 | A-Score: ASML 8.12 > KLAC 7.66 > LRCX 7.02 > AMAT 5.42 | 定义了"品质序"——T1(ASML+KLAC)与T2/T3的断层 |
| EC-VAL-038 | B4: ASML 7.30 >> KLAC 5.95 > AMAT 5.20 >> LRCX 3.55 | LRCX从A-Score#3降至B4#4, 改变了投资结论方向 |
| EC-SCN-020 | 概率加权回报: KLAC +17.7% > ASML +4.2% | KLAC在动态情景分析中超越ASML, 反转静态排名 |
| EC-XA-015 | A8→B2+B3最强关联(r≈0.98) | 确立"竞争压力"为预测经济效率的最强单一因子 |
| EC-SCN-016 | LRCX需Bull概率>46%才正回报(本报告28%) | 量化了LRCX的"叙事溢价"——市场隐含vs分析师估计的概率差距 |

### B.5.3 被红队挑战的EC及其结果

| EC编号 | 红队挑战要点 | 挑战结果 | 状态 |
|--------|------------|---------|------|
| EC-MOAT-117 | A-Score权重是否偏向专精型(ASML/KLAC) | 权重敏感性测试显示40:60到60:40排名不翻转 | 维持(EC-XA-018) |
| EC-COMP-001 | KLAC"软件公司"类比是否过度简化 | 四重定量验证支撑, 但CapEx趋势需持续监控 | 维持(EC-UE-010) |
| EC-ECO-013 | LRCX三重正面信号是否有预测力 | 2021 Q4先例证明为滞后指标, 不具预测力 | 维持(Ch18红队) |
| EC-RISK-019 | EPIC Center成功概率是否过低(20-25%) | 联合概率计算(80%×45%×65%=23%)支撑; 部分成功概率更高(40-50%) | 维持(EC-ECO-023) |
| EC-VAL-037 | ASML概率加权回报+65%是否过于乐观 | Ch17修正为+4.2%(P/E假设更保守); 原Ch13估计偏高 | 修正(EC-SCN-009) |
| EC-SCN-002 | Bull 28%概率是否过低 | 如果超级周期概率从60%调至70%, Bull应上调至33-35%, 不改变KLAC#1 | 维持 |

---

> **本附录数据截止**: 2026-02-24
> **EC来源**: P0 shared_context.md + Ch3-Ch22 staging文件
> **编制说明**: 所有EC编号和主张摘要均直接从源文件提取, 未编造或推断。部分隐含引用(如EC-FIN-008/009)在源文件中未找到完整定义卡, 以"隐含引用"标注。
