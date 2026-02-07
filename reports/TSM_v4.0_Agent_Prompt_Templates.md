# TSM v4.0 — Phase 0 Agent Prompt模板

> **配套文件**: `reports/TSM_v4.0_Upgrade_Master_Plan.md` Section 6
> **AMD验证**: prompt质量与输出质量相关性 r≈0.85

---

## 通用Prompt结构 (7个必需区块)

```markdown
# Agent任务: [具体模块名]

## 1. 背景
- **公司**: TSM (台积电, Taiwan Semiconductor Manufacturing)
- **行业**: 半导体代工 (全球市占率~60%)
- **当前股价**: ~$XXX (2026-02-07)
- **分析目标**: 收集原始数据用于Deep Research v4.0

## 2. 数据需求 (≥5个具体指标)
请通过WebSearch查找以下数据:
1. [指标1]: [具体描述+来源建议]
2. [指标2]: [具体描述+来源建议]
...至少5个

## 3. 输出格式
- **字符目标**: X,000-Y,000字符
- **数据标注**: 每个数据点标注来源
  - [A: 来源, 日期] — 官方财报/SEC/IR
  - [B: 来源, 日期] — 分析报告/行业研究/媒体
  - [P: 来源, 日期] — 预测市场
- **表格**: ≥N张数据表格
- **写入文件**: data/research/TSM/[filename].md

## 4. 质量标准
- 每个关键数字必须标注来源+日期
- 无法找到的数据标注 "[该指标未获取到公开数据]"
- 禁止编造数据 / "众所周知"等模糊表述

## 5. 自检清单 (完成后执行)
1. wc -m 验证字符数 ≥ X,000
2. 计数[A:]/[B:]/[P:]标注数量
3. 确认所有表格数据有标注

## 6. 参考旧版 (可选, 不复制只参考数据点)
- reports/TSM_Deep_Research_v2.0_Phase{N}_2026-02-06.md

## 7. 禁止事项
- 不编造财务数字 / 不写投资建议 / 不进行估值
```

---

## Agent A1: 2nm/A16技术路线图

**数据需求**:
1. N2量产进度: 2025 Q4投产数据、产能(wafer/月)、2026-2027目标
2. N2性能参数: vs N3E性能提升%、功耗降低%、密度改进%
3. N2客户采用: Apple/NVIDIA/AMD/Qualcomm各自计划+产能分配
4. A16时间表: 量产日期、Super Power Rail技术、vs竞争者
5. N2P增强版: 背面供电时间表、额外性能提升
6. 竞争对手: Intel 18A状态/良率/客户 | 三星2nm GAA/良率 | SMIC最先进能力
7. 良率历史: N3/N5爬坡曲线(N2预测参考)

**输出**: 8K-12K字符, ≥3张表格 → `data/research/TSM/tech_roadmap.md`

---

## Agent A2: CoWoS/SoIC先进封装

**数据需求**:
1. CoWoS产能: 2024-2027月产量(wafer级)、扩产计划
2. 价格趋势: CoWoS每wafer价格、vs传统封装溢价
3. 客户分配: NVIDIA/AMD/Apple/Broadcom各自CoWoS份额
4. SoIC进展: 3D堆叠技术路线图、vs Intel Foveros/EMIB
5. 竞争者: ASE/Amkor/SPIL先进封装能力对比
6. 产能瓶颈: 当前供需缺口、瓶颈环节(设备/材料)
7. 价格策略: 先进封装对TSM毛利率贡献

**输出**: 6K-10K字符, ≥3张表格 → `data/research/TSM/advanced_packaging.md`

---

## Agent A3: 地缘政治+供应链

**数据需求**:
1. 台海军事概率: Polymarket/Kalshi "Taiwan invasion" 合约概率
2. 出口管制: 最新美国对中国半导体禁令进展、实体清单更新
3. Arizona fab: Fab 21/22建设进度、投产时间、员工招聘、补贴进度
4. 日本熊本: JASM合资工厂进度、产能规模、成本vs台湾
5. 德国fab: 与博世/英飞凌/NXP合资进展
6. CHIPS Act: 已获批补贴金额、条件限制、clawback条款
7. 关税/制裁: Section 232半导体关税进展、对TSM影响
8. 台湾地震风险: 2024年4月地震影响回顾、防灾措施

**输出**: 8K-12K字符, ≥4张表格 → `data/research/TSM/geopolitics.md`

---

## Agent A4: 财务数据

**数据需求**:
1. 季度营收: 2023Q1-2025Q4 每季度营收(TWD+USD)
2. 毛利率: 同期毛利率+运营利润率+净利率
3. CapEx: 同期资本支出+CapEx/Revenue比
4. 自由现金流: 同期FCF+FCF/Revenue
5. 分红: 年度股息/ADR+分红率+分红增速
6. 资产负债: 总资产/总负债/净现金/债务到期结构
7. ADR vs 台股: 溢价/折价历史趋势、汇率影响

**输出**: 6K-8K字符, ≥5张数据表格 → `data/research/TSM/financials.md`

---

## Agent A5: 客户分析+竞争格局

**数据需求**:
1. Top 5客户: Apple/NVIDIA/AMD/Qualcomm/Broadcom各自占TSM营收%
2. 客户集中度: HHI指数、前3客户合计占比
3. 客户切换成本: 设计迁移成本(金额+时间)、EDA工具锁定
4. 三星代工: 全球代工市占率、主要客户、良率问题
5. Intel IFS: 代工业务进展、18A客户(微软/高通?)、产能规模
6. SMIC: 最先进量产工艺、DUV多重曝光能力、中国市场份额
7. 中芯新增产能: 2024-2026扩产计划、对成熟制程价格影响

**输出**: 6K-10K字符, ≥4张表格 → `data/research/TSM/customers_competition.md`

---

## Agent A6: 聪明钱+机构持仓

**数据需求**:
1. Top 10机构持有者: 最新13F数据(持股变化)
2. 对冲基金: Berkshire/ARK/桥水/文艺复兴/两西格玛等对TSM持仓
3. ADR流动性: 日均交易量、ADR总份额占比
4. 外资限制: 台湾对外资持股限制(如有)
5. 大宗交易: 近90天大额买卖记录
6. 内部人交易: TSM管理层买卖记录(如有)
7. ETF持仓: VGT/SOXX/SMH等半导体ETF中TSM权重

**输出**: 5K-8K字符, ≥3张表格 → `data/research/TSM/smart_money.md`

---

## Agent A7: 预测市场+分析师共识

**数据需求**:
1. Polymarket台海: "China invade Taiwan by 2027/2028/2030" 概率
2. Polymarket AI: "AI bubble burst", "AI spending >$X" 等合约
3. Polymarket禁运: 芯片出口管制相关合约
4. Kalshi补充: 上述事件在Kalshi的概率(如有)
5. 卖方目标价: ≥10家投行目标价分布(最高/最低/中位)
6. EPS共识: FY2026/FY2027 EPS预测(FactSet/Bloomberg共识)
7. 评级分布: Buy/Hold/Sell占比

**输出**: 5K-8K字符, ≥3张表格 → `data/research/TSM/prediction_market_v2.md`
