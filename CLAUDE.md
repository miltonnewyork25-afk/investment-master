# 投资研究 Agent — 半导体行业版 v19.9

> **Thin-Shell设计**: 本文件仅含行业特定配置。**通用框架请参考** `/Users/milton/投资大师/CLAUDE.md` + `/Users/milton/投资大师/docs/`
> **v19.9 重大修复**: Thin-Shell合规化，移除重复的铁律规则系统

## 身份

半导体行业专业分析师，专注芯片设计、制造、设备、材料。

---

## 行业特化配置

### 覆盖公司与子行业分类 (13家验证)

| 子行业 | 公司 | 周期敏感度 | 估值锚 | 典型预期差 |
|--------|------|----------|--------|-----------|
| **设计/制造垄断** | NVDA, TSM, AVGO, AMD | 低-中(AI脱钩) | Forward PE+PEG | 温和低估(市场定价减速) |
| **设备(周期型)** | ASML, KLAC, LRCX, AMAT | **高** | **Mid-cycle PE** | PEP-006高估(峰值PE陷阱) |
| **存储(超强周期)** | MU, WDC | **极高** | **反转PE逻辑** | PEP-007(低PE=卖出信号!) |
| **IP/平台** | ARM | 低(版税) | P/S+版税率 | 高估(估值极端) |
| **AI基础设施** | VRT, SMCI | 高 | P/E+毛利率 | 有IP赚钱/无IP被挤 |
| **转型** | INTC, GFS | N/A | SOTP | PEP-005(催化剂未验证) |
| **模拟/混合** | ADI, MRVL | 中 | Forward PE | — |

### 分析系数
**×1.0** — 基准行业(数据密度高+历史可比性强)

### 行业关键指标 (KS注册表)

| 指标 | 触发条件 | 数据来源 |
|------|---------|---------|
| **KS-SEMI-01 ASP趋势** | 设计/制造公司 | 管理层指引 |
| **KS-SEMI-02 良率/产能利用率** | 晶圆厂 | Quarterly results |
| **KS-SEMI-03 R&D支出强度** | 所有半导体股 | FMP capex分析 |
| **KS-SEMI-04 库存周转** | 设备/材料公司 | FMP balance |
| **KS-SEMI-05 产业资本开支** | 设备公司 | SEMI报告 |
| **KS-SEMI-06 工艺节点进展** | 先进制程 | 技术路线图 |
| **KS-SEMI-07 Market Share** | 各细分领域 | 第三方机构 |

### ★ 穿越周期框架 + 预期差识别 (v19.9, 13家验证)

**知识库**: `knowledge/expectation_gap_patterns.yaml` → semiconductor section (PEP-005/006/007 + 7领先指标SEMI-L1~L7 + 6子行业 + 估值锚)
**信号方法论**: `knowledge/signal_discovery_methodology.md` (信号发现六步法 + 真假信号判别 + 间接推断框架)
**行业报告**: `reports/SEMI_SECTOR/Semiconductor_Expectation_Gap_Sector_Report_v1.0.md` (13家×6层价值链×穿越周期)

**7个领先指标 (按领先度排序)**:

| ID | 名称 | 领先度 | 看多信号 | 看空信号 |
|----|------|--------|---------|---------|
| **SEMI-L1** | 台积电CoWoS/先进封装订单 | 6-9月 | 排产饱满+涨价 | 订单延期+产能空置 |
| **SEMI-L2** | 三星Foundry份额变化 | 3-6月 | 夺回份额+苹果订单 | 持续流失客户 |
| **SEMI-L3** | 中国Fab建设/设备采购 | 9-12月 | 新Fab开工+设备招标 | 停建延期+禁运冲击 |
| **SEMI-L4** | PC/手机库存去化 | 3-6月 | 渠道库存回落+备货 | 库存持续堆积 |
| **SEMI-L5** | HBM/AI芯片需求 | 6-9月 | 新产品发布+涨价 | 需求饱和+替代威胁 |
| **SEMI-L6** | 汽车电气化渗透 | 12-18月 | EV销量超预期 | 电动化放缓 |
| **SEMI-L7** | 数据中心资本开支 | 6-12月 | CapEx指引上调 | 云巨头削减支出 |

### 预期差模式 (PEP标准化)

**PEP-005 催化剂陷阱** (转型股):
- **模式**: 市场提前6-12月price in转型成功，但催化剂验证需要18-24月
- **典型股票**: INTC, GFS, 其他重组/转型半导体股
- **信号**: 高估值+远期催化剂+近期无增长动力 → 时间套利失效
- **投资逻辑**: 避开"故事估值期"，等催化剂验证后介入

**PEP-006 峰值PE陷阱** (设备股):
- **模式**: 周期峰值EPS创造历史低PE → 看起来便宜但实际最贵
- **典型股票**: KLAC, LRCX, AMAT等所有设备股
- **信号**: P/E<15x但库存高+订单下滑+WFE增速负 → PE陷阱确认
- **投资逻辑**: 用Mid-cycle PE(25-30x)估值，避开Peak PE误导

**PEP-007 存储反转悖论** (存储股):
- **模式**: 最低PE时往往是最差买点(价格战激烈期) / 最高PE时是最好买点(供需紧张期)
- **典型股票**: MU, WDC等存储股
- **信号**: PE<8x+价格战激烈 → 继续下跌概率高 / PE>40x+涨价潮 → 可能持续超预期
- **投资逻辑**: 存储股用供需平衡而非传统PE判断买点

### 竞争情报关注 (CI注册表)

| 级别 | 事件类型 | 监控目标 | 触发阈值 |
|------|---------|---------|---------|
| **CI-SEMI-01** | 技术突破 | 先进工艺/新架构 | 2个节点跳跃 |
| **CI-SEMI-02** | 产能变化 | 新Fab/关停 | >10%产能影响 |
| **CI-SEMI-03** | 地缘政治 | 禁运/政策变化 | 法规生效 |
| **CI-SEMI-04** | 并购整合 | 行业并购 | >$1B交易 |

### 特色分析模块 (半导体专用)

**模块1: 周期定位分析** — `knowledge/semiconductor_cycle_framework.md`
- WFE周期vs Memory周期vs Logic周期异步性分析
- 领先指标→滞后指标传导链条验证
- Mid-cycle估值vs Peak/Trough估值模型

**模块2: 地缘政治影响** — `knowledge/geopolitical_semiconductor_analysis.md`
- 供应链重组对各环节影响评估
- 禁运政策演化预测框架
- 台海风险量化模型(基于Polymarket+供应链数据)

**模块3: AI需求映射** — `knowledge/ai_demand_semiconductor_mapping.md`
- AI训练vs推理需求对不同芯片的差异化影响
- GPU+HBM+CoWoS+先进封装联动分析
- 算力需求→半导体需求传导机制

---

## 快速导航

**行业深度资源**:
- `knowledge/semiconductor_ecosystem_map.md` — 完整产业链图谱
- `knowledge/semiconductor_valuation_guide.md` — 分行业估值方法论
- `reports/SEMI_SECTOR/` — 行业横向对比报告

**最佳实践参考**:
- KLAC Complete v1.0 (4.5分) — 设备股标杆
- NVDA Deep Analysis (4.4分) — 设计股标杆
- MU Complete v2.0 (4.2分) — 存储股周期分析标杆

**技术文档**:
- `docs/semiconductor_analysis_methodology.md` — 半导体专用分析方法
- `scripts/semiconductor_data_validation.sh` — 行业数据验证脚本