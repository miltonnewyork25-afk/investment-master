# 投资研究 Agent — 半导体行业版 v19.9

> **Thin-Shell设计**: 本文件仅含行业特定配置。**通用框架请参考** `/Users/milton/投资大师/CLAUDE.md` + `/Users/milton/投资大师/docs/`
> **v19.9 质量修复**: 密度>体量 | 铁律K估值统一性 | 铁律L DM硬门控 | 铁律M反膨胀纪律 | 铁律N证据链+三PE+概率锚定 | 铁律O Reverse DCF P1前置 | 铁律P卖出框架内部化

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
| SEMI-L1 | 库存天数(DIO) | 2-3Q | DIO连降2Q | DIO连升2Q |
| SEMI-L2 | CapEx/D&A | 1-2年 | <1.0x(投资不足) | >1.5x(过度扩产) |
| SEMI-L3 | 订单积压/B-to-B | 1-2Q | B/B>1回升 | B/B<1回落 |
| SEMI-L4 | DRAM/NAND现货价 | 1Q | 连涨3月 | 连跌3月 |
| SEMI-L5 | WFE预测方向 | 年度 | 下调→上调 | **3年连增>7%=回调前夜** |
| SEMI-L6 | Hyperscaler AI CapEx | 源头 | >$500B | 指引下调>20% |
| SEMI-L7 | 地缘政治温度 | 非财务 | 台海降温+Arizona验证 | 出口限制升级 |

**AI利好衰减模型 (6层价值链)**:

| Layer | 位置 | 衰减度 | 核心风险 | 估值锚 |
|-------|------|--------|---------|--------|
| 1 | 芯片设计(NVDA/AMD) | 0% | 竞争(ASIC vs GPU) | Forward PE |
| 2 | 制造(TSM) | ~5% | 地缘(台海) | Forward PE+地缘折价 |
| 3 | 设备(ASML/KLAC/LRCX/AMAT) | 30-50% | **周期(PEP-006)** | **Mid-cycle PE** |
| 4 | 存储(MU) | 50-70% | **产能过剩(PEP-007)** | **反转PE** |
| 5 | 基础设施(VRT/SMCI) | 10-60% | 有IP/无IP | P/E+毛利率 |
| 6 | 转型(INTC) | 不可估 | 催化剂金字塔(PEP-005) | SOTP |

**3个强制检查 (BLOCK级)**:
1. **Phase 0**: 判断WFE周期位置(early/mid/late/downturn) → 设备/存储禁止late_cycle用峰值PE
2. **Phase 1**: 标注公司AI利好Layer位置 → Layer 3-4必须Mid-cycle PE或反转PE
3. **Phase 2**: 检查PEP-005(催化剂)/PEP-006(周期峰值溢价)/PEP-007(反转PE陷阱)

### 特异性测试 (TS注册表)

| 测试 | 应用 | 方法 |
|------|------|------|
| TS-01 摩尔定律 | 先进制程 | 物理极限分析 |
| TS-02 替代威胁 | 成熟产品 | 技术路径对比 |
| TS-03 地缘风险 | 中国敞口 | 收入分布+地缘折价量化(TSM vs ASML) |
| TS-04 周期位置 | 所有 | ★SEMI-L1~L7(patterns.yaml) |
| TS-05 产能过剩 | 制造端 | CapEx/D&A>1.3x=警告, >1.5x=危险 |
| TS-06 AI利好衰减 | 所有 | ★Layer 1-6+对应估值锚 |
| TS-07 有IP/无IP | AI基础设施 | VRT(34%毛利率) vs SMCI(6%毛利率)模式 |
| TS-08 ASIC/GPU | 设计公司 | NVDA(CUDA锁定) vs AVGO(ASIC双赢) |

### 承重墙分析 (CI注册表)

| 承重墙 | 脆弱度测试 | 倒塌影响 |
|--------|-----------|---------|
| **CI-SEMI-01 AI需求** | Hyperscaler CapEx方向 | ±30-50% |
| **CI-SEMI-02 先进制程** | 技术演进+良率 | ±20-40% |
| **CI-SEMI-03 产业链完整性** | 供应链中断/地缘 | ±15-30% |
| **CI-SEMI-04 资本支出周期** | WFE连续3年>7%(历史回调点) | ±25-45% |

### CEO沉默分析 (P1 QG-01.5)

| 沉默域 | 触发条件 | 信号解读 |
|--------|---------|---------|
| **工艺良率** | 新产品量产期 | 技术风险 |
| **客户集中度** | Q&A回避具体客户 | 依赖风险 |
| **产能利用率** | 周期下行期 | 需求疲软 |
| **地缘政治** | 中国业务问题 | 合规风险 |

---

## 公司品质量化评估

**通用框架**: `docs/company_quality_scoring.md`
**执行时机**: Phase 0数据预取完成后, Phase 1开始前
**产出**: `reports/{TICKER}/data/quality_scorecard.md`

**半导体行业修正**:
- QG-1: CapEx/Rev阈值放宽至20%(设备公司资本密集)
- B5权重×1.5(周期中OPM弹性是关键区分因素, KLAC验证: 检测设备下行OPM韧性 > 沉积/刻蚀)
- C1+C4权重×1.5(IP专利+工艺数据壁垒是半导体护城河核心)
- D1: 设备(强周期×0.5) vs 设计(中周期×0.7) vs IP授权(弱周期×0.9)
- 特殊: 库存周转+产能利用率+R&D支出强度纳入B1评估
- **定价权分层(v19.6)**: 设备(Stage 4垄断) vs fabless设计(Stage 3竞争) vs 存储(Stage 1-2商品化) → 加权B4
- **AI抗性评级(v19.9)**: 护城河评估器v1.2 C-AI模块 — Type D(AI基础设施=顺风, 不调低)

---

## 行业增强模块

**相关文档**:
- `docs/industry/semiconductor_deep.md` (AI双轴L×S+周期框架+PPDA算法)
- `docs/industry/semiconductor_framework_v2.1.md` (MCI垄断指数+供给约束链+CQ↔KS映射)
- `docs/optionality_valuation.md` (高期权公司: NVDA/ASML/TSM)
- `docs/deductive_analysis.md` + `docs/deductive_analysis_template.md` (AI范式变革演绎法5步模板)
- `knowledge/analysis_modules/income_statement_deep_diagnostic.md` (ISDD v1.0利润表诊断, Phase 1财务SOP)
- `knowledge/analysis_modules/financial_analysis_framework_v2.md` (CPA×ISDD财务分析v2.0)

### 期权价值评估增强
- **TSM**: 先进制程护城河+地缘政治期权(地缘折价≈8个PE点≈市值~30%)
- **ASML**: 光刻技术垄断+EUV产能期权(精确定价, 零安全边际)
- **NVDA**: AI算力领导地位+软件生态期权(PW≥7→发现系统)

### 演绎分析增强
- **因果链**: AI需求 → GPU设计 → 先进制程 → 设备需求 → 材料创新
- **跨行业传导**: 云计算→数据中心→AI芯片→半导体设备
- **二阶效应**: 算力需求→电力消耗→散热需求→新材料机会

### Skill按需加载 (铁律M)
- **Phase 0**: `/data-prefetch` `/expectation-gap {TICKER}` v3.0(Step 0问题闸门+知识前置+动作空间)
- **Phase 1-3**: `/investment-logic-toolkit` `/assumption-audit` `/competitive-benchmarking` `/moat-evaluator`
- **Phase 4**: `/red-team-suite` `/risk-topology` `/omission-scanner`
- **Phase 5**: `/valuation-quality-gate` `/deep-reflection`
- **禁止**: 预加载全部skill | Phase 1加载红队 | Phase 5加载数据预取

### 预期差v3.0半导体适配 (变量四分法)

**半导体变量分类参考**(分析时标注每个变量类型):

| 类型 | 半导体典型变量 | 说明 |
|------|-------------|------|
| **[可控]** | 回购/CapEx纪律/定价策略/产品路线图 | 公司能改变的 |
| **[约束]** | WFE周期/AI CapEx/地缘政治/出口管制 | 公司改变不了的 |
| **[迁移]** | DIO拐点/B-to-B/DRAM现货价/Forward PE收敛 | 推动状态→新状态 |
| **[校验]** | 季度beat/miss/分析师修正/股价反应 | 验证判断,不驱动动作 |

**半导体动作绑定模板**:
- 设备(late_cycle): 动作=等待拐点 | 触发=WFE<0%+DIO下降2Q | 退出=WFE第4年>7% | 失效=AI彻底打破WFE周期(需3+周期验证)
- 存储(峰值): 动作=等待拐点 | 触发=CapEx/D&A>1.2x+毛利率<40% | 退出=毛利率>60%+低PE | 失效=HBM合同结构永久改变周期性
- 设计垄断: 动作=当前可行动(或必须打折) | 触发=N/A(已可行动) | 退出=ASIC>40%推理份额 | 失效=AI CapEx急刹>20%

---

## 框架版本

**当前版本**: v20.0 (2026-03-30)
**与主框架同步**: 参考 `/Users/milton/投资大师/CLAUDE.md`
**v20.0新增**: 预期差v3.0集成(状态×迁移分离+变量四分法+动作绑定+置信度4层+"不行动"合法输出) + 半导体变量分类参考 + 子行业动作绑定模板
**v19.9**: PEP-005/006/007 + 穿越周期7领先指标(SEMI-L1~L7) + AI利好衰减模型(6层) + 子行业估值锚 + 信号发现方法论v1.0 + 护城河C-AI模块 + 13家横向报告基线
