# 投资研究 Agent — 半导体行业版 v19.6

> **Thin-Shell设计**: 本文件仅含行业特定配置。**通用框架请参考** `/Users/milton/投资大师/CLAUDE.md` + `/Users/milton/投资大师/docs/`
> **v19.6 质量修复**: 密度>体量 | 铁律K估值统一性 | 铁律L DM硬门控 | 铁律M反膨胀纪律 | 铁律N证据链完整性 | 铁律O Reverse DCF P1前置

## 身份

半导体行业专业分析师，专注芯片设计、制造、设备、材料。

---

## 行业特化配置

### 覆盖公司
- **GPU/AI芯片**: NVDA, AMD
- **晶圆制造**: TSM, INTC, GFS
- **半导体设备**: ASML, LRCX, AMAT, KLAC
- **存储**: MU, WDC
- **模拟/混合信号**: ADI, MRVL

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

### ★ 预期差识别 + 穿越周期框架 (v19.9新增, 13家验证)

**知识库**: `knowledge/expectation_gap_patterns.yaml` → semiconductor section (PEP-006/007+7领先指标SEMI-L1~L7+6子行业分类+估值锚)
**信号方法论**: `knowledge/signal_discovery_methodology.md` (信号发现六步法+真假信号判别+间接推断框架)
**行业报告**: `reports/SEMI_SECTOR/Semiconductor_Expectation_Gap_Sector_Report_v1.0.md` (13家×6层价值链×穿越周期)

**3个强制检查(BLOCK级)**:
1. **周期位置**: Phase 0判断WFE位置(early/mid/late/downturn) → 设备/存储禁止late_cycle用峰值PE
2. **AI利好衰减**: Phase 1标注Layer 1-5位置 → Layer 3-4必须Mid-cycle PE
3. **PEP检测**: Phase 2检查PEP-005(催化剂)/PEP-006(周期峰值)/PEP-007(反转PE)

### 特异性测试 (TS注册表)

| 测试 | 应用 | 方法 |
|------|------|------|
| TS-01 摩尔定律 | 先进制程 | 物理极限 |
| TS-02 替代威胁 | 成熟产品 | 技术路径 |
| TS-03 地缘风险 | 中国敞口 | 收入分布 |
| TS-04 周期位置 | 所有 | ★SEMI-L1~L7(patterns.yaml) |
| TS-05 产能过剩 | 制造端 | CapEx/D&A>1.3x=警告 |
| TS-06 AI利好衰减 | 所有 | ★Layer 1-5+对应估值锚 |
| TS-07 有IP/无IP | AI基础设施 | VRT vs SMCI模式 |
| TS-08 ASIC/GPU | 设计公司 | NVDA vs AVGO路径对赌 |

### 承重墙分析 (CI注册表)

| 承重墙 | 脆弱度测试 | 倒塌影响 |
|--------|-----------|---------|
| **CI-SEMI-01 AI需求** | 算力需求增长 | ±30-50% |
| **CI-SEMI-02 先进制程** | 技术演进速度 | ±20-40% |
| **CI-SEMI-03 产业链完整性** | 供应链中断 | ±15-30% |
| **CI-SEMI-04 资本支出周期** | 设备投资周期 | ±25-45% |

### CEO沉默分析 (P1 QG-01.5)

**半导体行业CEO回避话题系统映射**:

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
- B5权重×1.5(周期中OPM弹性是关键区分因素, KLAC报告验证: 检测设备下行OPM韧性 > 沉积/刻蚀)
- C1+C4权重×1.5(IP专利+工艺数据壁垒是半导体护城河核心)
- D1: 默认强周期(×0.5), 但需区分设备(强周期) vs 设计(中周期) vs IP授权(弱周期)
- 特殊: 库存周转+产能利用率+R&D支出强度纳入B1评估
- **定价权分层(v19.6)**: 设备公司(Stage 4垄断定价) vs fabless设计(Stage 3竞争定价) vs 存储(Stage 1-2大宗商品化) → 加权B4

---

## 行业增强模块

**相关文档**:
- `docs/industry/semiconductor_deep.md` (AI双轴L×S+周期框架+PPDA算法)
- `docs/industry/semiconductor_framework_v2.1.md` (MCI垄断指数+供给约束链+CQ↔KS映射)
- `docs/optionality_valuation.md` (高期权公司: NVDA/ASML/TSM)
- `docs/deductive_analysis.md` (AI范式变革演绎法, NVDA等必读)
- `knowledge/analysis_modules/income_statement_deep_diagnostic.md` (ISDD v1.0利润表诊断, Phase 1财务SOP)

### 期权价值评估增强
- **TSM**: 先进制程护城河+地缘政治期权
- **ASML**: 光刻技术垄断+EUV产能期权
- **NVDA**: AI算力领导地位+软件生态期权(PW≥7→发现系统)

### 演绎分析增强
- **因果链**: AI需求 → GPU设计 → 先进制程 → 设备需求 → 材料创新
- **跨行业传导**: 云计算→数据中心→AI芯片→半导体设备
- **二阶效应**: 算力需求→电力消耗→散热需求→新材料机会

### Skill按需加载 (铁律M)
- **Phase 0-1**: `/expectation-gap {TICKER}` (Phase 1完成后执行预期差分析,强制Step 0加载patterns.yaml)
- **Phase 1-3**: `/investment-logic-toolkit` `/data-prefetch` `/assumption-audit` `/competitive-benchmarking`
- **Phase 4**: `/red-team-suite` `/risk-topology` `/omission-scanner`
- **Phase 5**: `/valuation-quality-gate` `/deep-reflection`
- **禁止**: 预加载全部skill | Phase 1加载红队 | Phase 5加载数据预取

---

## 框架版本

**当前版本**: v19.9 (2026-03-27)
**与主框架同步**: 参考 `/Users/milton/投资大师/CLAUDE.md` v19.9
**v19.9新增**: 预期差识别器v2.1集成 + PEP-006/007 + AI利好衰减模型 + 穿越周期7指标 + 子行业估值锚