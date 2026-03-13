# Launch Brief: MSCI Inc (MSCI)
> 自动生成 by tier3_launch.sh v1.0 + 手动战略规划 | 2026-03-13
> **AI必须在Phase 0开始前完整阅读本文件**
> **质量目标: 4.5+/5 — 对标KLAC(4.5)/IHG(4.3)/ETN(4.3)**

---

## 复杂度评估
- **行业**: 金融B2B平台 (指数/ESG/分析/私募资产)
- **行业框架**: `docs/industry/b2b_platform_deep.md` + `docs/industry/financial_deep.md`
- **行业模块**: `knowledge/industry_modules/b2b_platform_modules.md` (R1已建, 可直接复用)
- **同行业已完成报告**: SPGI(3.55/5, 160K), FICO(301K), SOFI(294K)
- **★ 目标字符**: **≥350K chars** (用户明确要求, 超越FICO 301K)
- **硬底线**: 300K chars (低于此为质量失败)
- **PW预估**: 3.5-4.5 (混合偏传统 — ESG/Private Assets增加不确定性但核心Index高度可预测)
- **行业系数**: ×1.0 (虽归金融worktree, 但MSCI周期性极低D1≈0.95, 不需要×1.2的监管复杂性加权)

## 公司画像 (Phase 0前预知)
- **FY2025收入**: $3.13B (+9.7%), 四分部: Index(57%)/Analytics(23%)/ESG(11%)/Private Assets(9%)
- **利润率**: OPM 54.7%, EBITDA Margin 60.8%, FCF Margin ~47%
- **留存率**: 整体94.4% (Index 95.9 / Analytics 94.3 / ESG 93.2 / Private 91.3)
- **AUM链接**: $2.34T ETF AUM, 费率2.41bps(下降趋势), BlackRock占资产费96.4%
- **地理**: Americas 45% / EMEA 38% / APAC 17% (EVO-001门控: 国际>30%→必须含地理分析 ✅)
- **估值**: ~30-35x P/E, 26x EV/EBITDA, 负净资产($-25.48/share)
- **CEO**: Henry Fernandez, 持股~3%($1.2B), 18个月内个人增持$20M

---

## 最佳参考报告 (按迁移价值排序)

| 报告 | 评分 | 体量 | 迁移框架 | 迁移原因 |
|------|:----:|:----:|---------|---------|
| **FICO** | — | 301K | 定价权阶段模型v1.0 + C1五层 + C1×B4反身性 | MSCI是"5年前的FICO"，框架1:1迁移 |
| **SPGI** | 3.55 | 160K | AI焦虑税3.3x + ROIC幻觉 + **5个EVO反面教训** | 同行业直接对标 |
| **KLAC** | 4.5 | 254K | 信念反演(Reverse DCF承重墙) | 4.5分标杆方法 |
| **ARM v2.0** | 4.2 | 360K | CDS弹性函数 + 情景P&L Build-out | FTSE Russell替代风险建模 |
| **IHG** | 4.3 | 501K | 估值折价三层分解 + 双层SOTP | Index(76%margin) vs Private(25%margin)双层估值 |
| **ETN** | 4.3 | 331K | 产业链纵深 + DM附录化最佳实践 | DM密度标杆 |

---

## 进化教训 (最近报告 + 同行业)

### SPGI教训 (3.55/5 — 金融行业首份, 5个EVO全部适用)
1. **EVO-001 地理分析**: M7=0分=34份报告最大结构遗漏 → MSCI国际收入55%必须Phase 1深入
2. **EVO-002 续约率**: "推断95%+"无硬数据 → MSCI有硬数据(94.4%整体/分部拆分), 必须Phase 0锚定
3. **EVO-003 DM同步**: 0.44/千字=历史最低 → 目标≥1.0/千字, 每1K扩写≥2个DM
4. **EVO-004 R&D量化**: R&D/Rev未计算 → Phase 0自动提取
5. **EVO-005 去重**: 5话题各出现3次(~15-20K冗余) → Phase 5扫描高频短语

### FICO教训 (B4看似无敌直到不是)
6. B4定价权强度(B4a=5.0)≠持久性(B4b=3.5) → **MSCI必须从开始拆分B4a/B4b**
7. C1五层中L2(监管)=MSCI最弱环(2.0/5.0) → 需深度验证EU SFDR是否提升L2

### 通用教训
8. 铁律J: 单会话组装(ARM v1 46/100→v2 93/100) → Phase 5必须单会话完成
9. LLM不能做算术: FCFF/敏感性矩阵必须Python验证
10. 红队要有效: 5K有效>50K表演 → 净CQ变动≥3pp

---

## 6个核心矛盾 (CI-01~CI-06, Phase 0.75结晶用)

| CI# | 核心矛盾 | 数据锚点 | 分析框架 |
|:---:|---------|---------|---------|
| CI-01 | **定价权已释放 vs 还有空间?** OPM 34%→55%(+21pp趋平) vs FICO 20%→47%(仍上升) | msci_vs_fico_stage.md | 定价权阶段模型v1.0 |
| CI-02 | **AUM引擎: 祝福还是诅咒?** 费率2.41bps↓, 靠$2.34T AUM↑对冲 — 熊市怎么办? | FY2025费率趋势 | AUM三维情景建模(新建) |
| CI-03 | **ESG: 增长引擎还是政治靶子?** 净新增-47.9%但收入+8.4%/利润率+4pp | FY2025分部数据 | AI焦虑税框架(反向应用) |
| CI-04 | **L4运营嵌入 vs L2监管缺失** C1=3.8(L4=5, L2=2), 比FICO/SPGI"软" | moat_v3.0预打分 | C1五层深度验证 |
| CI-05 | **BlackRock依赖** 10.6%收入+96%资产费, 合同到2035但谈判筹码不对称 | FY2025 10-K | 客户集中度风险拓扑 |
| CI-06 | **Private Assets能否复制Index奇迹?** Burgiss 70x EBITDA, 利润率仅25% | FY2025分部数据 | ROIC幻觉解构 |

---

## MECE分析架构: B2B模块 + 6个MSCI专属维度

### A. B2B标准模块 (M1-M10 + E1/E4/E5) — 220-285K

| 模块 | Phase | 预估字符 | 关键框架 | 数据就绪度 |
|------|:-----:|:--------:|---------|:---------:|
| M1 基础设施嵌入 | P1 | 20-25K | I×L双轴 + C1五层验证 | ✅ 预打分3.8 |
| M2 流动性壁垒 | P1 | 15-20K | 网络效应(需重定义: 指数≠典型双边市场) | ⚠️ 需适配 |
| M3 寡头博弈 | P3 | 15-20K | MSCI/S&P DJI/FTSE Russell Nash均衡 | ✅ 竞争数据已有 |
| M4 资产结构 | P2 | 20-25K | SOTP + ROIC幻觉(Burgiss商誉) | ✅ |
| M5 定价权 | P1 | 25-30K | 阶段模型v1.0 Stage 1.7 + B4a/B4b拆分 | ✅ msci_vs_fico已有 |
| M6 客户集中度 | P1 | 15-20K | BlackRock 10.6%+合同2035 | ✅ 硬数据 |
| M7 国际化 | P1 | 15-20K | 地理拆分表(EVO-001强制) | ✅ 45/38/17% |
| M8 技术/数据 | P3 | 20-25K | R&D量化(EVO-004) + 数据独占性 | ⚠️ R&D待补 |
| M9 资本配置 | P2 | 20-25K | 回购η + 负净资产解构 + Burgiss整合 | ✅ |
| M10 监管 | P3 | 15-20K | UK FCA + EU SFDR + 美国反ESG | ✅ 数据已有 |
| E1 反周期性 | P3 | 10-15K | 2008/2020衰退验证 | ⚠️ 历史数据待补 |
| E4 并购整合 | P3 | 15-20K | Burgiss整合进度+协同兑现率 | ✅ |
| E5 AI颠覆 | P3 | 15-20K | AI冲击矩阵 + AI焦虑税量化 | ✅ |

### B. 6个MSCI专属维度 (★必做, 非可选) — 90-120K

> **设计逻辑**: 这6个维度是MSCI区别于其他B2B平台的独特分析需求。缺少任何一个都会导致覆盖不完整，无法达到350K+目标。

#### ★ D1: AUM引擎动力学 (Phase 2, 25-30K)
**为什么必须有**: MSCI独有"第四引擎"——$2.34T AUM自动随市场增长拉高费用基数，FICO/SPGI都没有这个机制。这是市场估值MSCI的核心假设。

**分析内容**:
- AUM × 费率 × 市场份额 三维情景矩阵
- 费率压缩数学: 2.41bps→2.0bps, 但AUM $2.3T→$3.5T = 收入+26%
- 熊市压力测试: 2008级(-40% AUM)对收入/利润/FCF的影响
- 被动 vs 主动资金流趋势对AUM基数的结构性影响
- **借鉴**: ARM情景P&L Build-out (5情景×5年FCFF桥接)
- **产出**: 完整的AUM情景模型 + 敏感性矩阵(Python验证)

#### ★ D2: ESG业务独立深潜 (Phase 3, 20-25K)
**为什么必须有**: ESG是MSCI第三大分部(11%收入)但增长动力和风险谱系与Index完全不同。净新增-47.9%但收入+8.4%——这个矛盾需要独立分析。

**分析内容**:
- ESG评级方法论争议: 50%升级由方法论变更驱动(非公司改善)
- MSCI vs Sustainalytics相关性仅0.32 — ESG评级的"评级机构困境"
- 政治二极化: EU SFDR(强制) vs 美国反ESG(抵制) → 地理收入拆分影响
- 安装基数粘性: 净新增下降但留存93.2% → 类"报纸订阅"模式?
- ESG对Index的交叉销售价值(分离vs联动)
- **借鉴**: AI焦虑税3.3x框架(反向应用: ESG恐慌 vs ESG实际利润暴露)

#### ★ D3: Private Assets第二S曲线 (Phase 3, 15-20K)
**为什么必须有**: 管理层押注的下一增长引擎。Burgiss $913M(70x EBITDA)是近年最大收购, 利润率仅25% vs Index 76%。成败决定MSCI的5年增长轨迹。

**分析内容**:
- Burgiss数据资产估值: 13000基金/$15T累计投资/追溯至1978
- 私募信用: 1500基金/80000笔贷款/60-80个新指数(9个月)
- TAM: $10T+私募资产市场 × MSCI可触达比例
- 竞争: Preqin(BlackRock收购)/Cambridge Associates/PitchBook
- 利润率路径: 25%→? 时间线与规模效应
- Moody's合作: 信用风险模型+MSCI私募信用数据库的协同逻辑
- **借鉴**: ROIC幻觉解构(Burgiss商誉→报告ROIC vs经济ROIC)

#### ★ D4: 双半衰期分析 (Phase 3, 10-15K)
**为什么必须有**: MSCI不是单一护城河公司。Index(类SWIFT, >50年)和ESG(<15年, 政治周期驱动)的耐久性完全不同。单一半衰期会严重误判整体护城河。

**分析内容**:
- Index半衰期建模: 制度嵌入深度(IPS/监管/ETF结构) → 类比SWIFT/Visa/S&P500
- ESG半衰期建模: 政治周期(4-8年) × 监管固化程度(EU高/US低) × 替代品成熟度
- Analytics半衰期: 技术生命周期(5-10年, AI加速替代)
- Private Assets半衰期: 数据壁垒积累曲线(Burgiss 46年数据→不可复制?)
- 加权整体半衰期 vs 市场隐含半衰期(从估值反推)
- **借鉴**: moat_v3.0半衰期框架(首次多分部实战)

#### ★ D5: Vanguard 2012复盘 (Phase 1, 10-15K)
**为什么必须有**: $537B资产切换是指数业务史上最大"脱离"事件——股价暴跌30%→12个月收复。这是CDS弹性函数(客户替代风险模型)的唯一历史锚点。

**分析内容**:
- 事件复盘: Vanguard切换$537B到FTSE Russell/CRSP的完整时间线
- 财务影响: ~3%收入损失 vs 30%股价暴跌 → 市场过度反应的量化
- 恢复机制: 为什么12个月内收复？(其他客户加速迁入? 新产品弥补?)
- BlackRock反应: 公开宣布MSCI为"gold standard" → 客户信号理论
- CDS弹性函数建模: 如果第二大客户(BlackRock)部分切换, ε(t)是多少?
- **借鉴**: ARM CDS弹性函数(RISC-V替代风险→FTSE Russell替代风险)

#### ★ D6: 交易策略数据桥梁 (Phase 5, 10-15K)
**为什么必须有**: 报告产出机器可读的结构化数据, 未来做交易策略时可直接调用。MSCI作为首测报告。

**分析内容**:
- **估值三档**: 便宜/合理/贵 + 对应EV/EBITDA和P/E区间 + 隐含假设 + 安全边际%
- **回撤DNA**: 3级市场压力下的历史回撤幅度+恢复时间+β系数+Vanguard 2012先例
- **催化剂×KS联动时间轴**: 未来12个月决策窗口+触发条件+估值影响矩阵
- **产出格式**: YAML结构化数据(附录), 可被未来交易策略脚本解析

---

## Phase分配与字符预算

| Phase | 内容 | 字符预算 | 模块覆盖 |
|:-----:|------|:--------:|---------|
| P1 | M1嵌入+M2网络+M5定价权+M6客户+M7国际+**D5 Vanguard复盘**+CEO沉默+C1五层 | **80-100K** | 7模块+1专属 |
| P2 | M4资产+M9资本+Reverse DCF+承重墙+**D1 AUM引擎建模** | **60-80K** | 2模块+1专属 |
| P3 | M3寡头+M8技术+M10监管+E1反周期+E4并购+E5 AI+**D2 ESG深潜+D3 Private Assets+D4双半衰期** | **90-110K** | 6模块+3专属 |
| P4 | RT1-7+双向校准+有效性门控 | **40-50K** | 红队全套 |
| P5 | 评级+KS注册表+TS+框架注册表+DM附录+CI注册表+**D6交易策略桥梁** | **50-60K** | 综合+1专属 |
| **总计** | | **320-400K** | 13模块+6专属 |

---

## 必用框架清单 (Framework Absorption Checklist)

### 通用必选 (所有行业)
- [ ] 逆向估值 (Reverse DCF → 隐含假设) — /assumption-audit M1
- [ ] A-Score品质评分 (21维度) — docs/company_quality_scoring.md
- [ ] 风险拓扑 (协同/反协同矩阵) — /risk-topology
- [ ] Kill Switch (≥12个, KS-N格式, 12字段) — docs/deep_dive_protocol.md
- [ ] 非共识洞察注册表 (CI-N格式) — Phase 1-3持续注册
- [ ] DM锚点体系 (目标≥1.0/千字) — docs/confidence_system.md

### 行业专用 (B2B平台 + 金融)
- [ ] I×L双轴评估 — docs/industry/b2b_platform_deep.md
- [ ] B2B模块 M1-M10 + E1/E4/E5 — knowledge/industry_modules/b2b_platform_modules.md
- [ ] 金融行业KS/TS — .worktrees/金融/CLAUDE.md
- [ ] 品质评分金融修正(QG-1/QG-6豁免, B2+B4×1.5, C1×2.0) — 金融CLAUDE.md

### 迁移冠军 (必选复用)
- [ ] **定价权阶段模型v1.0** (FICO) — Stage 1.7定位已有, 需深度验证
- [ ] **C1五层制度嵌入** (FICO/moat_v3.0) — 预打分3.8, 需硬数据升级/降级
- [ ] **AI焦虑税量化3.3x** (SPGI) — ESG恐慌的反向应用
- [ ] **ROIC幻觉解构** (SPGI) — Burgiss商誉下的经济ROIC
- [ ] **信念反演** (KLAC) — 30-35x P/E隐含了什么?
- [ ] **CDS弹性函数** (ARM) — Vanguard 2012 → FTSE Russell替代风险建模
- [ ] **情景P&L Build-out** (ARM) — AUM引擎多情景FCFF桥接
- [ ] **隐含赌注清单** (SPGI) — 买MSCI你在赌什么?

### MSCI专属 (首创, 本报告验证)
- [ ] **AUM三维情景矩阵** (D1) — AUM×费率×份额
- [ ] **双半衰期分析** (D4) — Index(>50Y) vs ESG(<15Y)
- [ ] **交易策略数据桥梁** (D6) — 估值三档+回撤DNA+催化剂联动

---

## EVO执行清单 (v18.3, 全部5个EVO强制启用)

| EVO | 检查点 | 具体动作 |
|-----|--------|---------|
| EVO-001 | Phase 0 | checkpoint标记`geo_analysis_required: true`(国际55%) |
| EVO-002 | Phase 0 | Agent-D搜索retention/churn/NRR → MSCI有硬数据(94.4%), 写入DM-BIZ锚点 |
| EVO-003 | Phase 5 | 每≥500字扩写同步DM(≥1/千字), 连续3次无DM→停止 |
| EVO-004 | Phase 0 | fmp_data提取R&D支出 → 计算R&D/Revenue 3年趋势 |
| EVO-005 | Phase 5 | sentinel Layer 4.7扫描10个高频关键词, 合并重复→目标<5% |

---

## Pre-mortem: 本报告最可能的失败模式

> 假设6个月后回顾, 本报告质量<4.0。最可能的原因:

1. **ESG深度不够** — 浮于"政治风险"表面, 未深入方法论争议和安装基数经济学
2. **AUM建模用嘴算** — 没有Python验证的情景矩阵, 数字不可信 (铁律: LLM不能做算术)
3. **重复SPGI的错误** — DM密度<0.8/千字, 模块覆盖<80%, 体量<300K
4. **D1-D6沦为填充** — 6个专属维度变成叙述性描述而非量化分析
5. **红队走过场** — ESG乐观偏差未被挑战, 或Vanguard风险被低估
6. **多会话组装** — 跨会话Phase 5导致CI遗漏+CQ断裂 (铁律J)

---

## 已知数据源 (Phase 0预取参考)

### 已搜索到的硬数据 (可直接锚定)
- FY2025全年财务: $3.13B收入/54.7% OPM/$1.46B FCF ✅
- 四分部拆分(收入/增速/EBITDA margin/留存率/Run Rate) ✅
- 地理收入: Americas 45%/EMEA 38%/APAC 17% ✅
- BlackRock: 10.6%收入/96.4%资产费/合同到2035 ✅
- 费率趋势: 2.41bps(下降趋势) ✅
- ESG净新增: -47.9% ✅
- 竞争格局: 三寡头控制~70% $5B指数行业 ✅
- CEO持股: ~3%/$1.2B, 18个月增持$20M ✅
- 员工: 6268人, 71%在EM地区 ✅

### Phase 0需补充的数据缺口
| 数据 | 优先级 | 来源 |
|------|:------:|------|
| R&D支出绝对额+R&D/Rev | S0 | 10-K + fmp_data (EVO-004) |
| 前5大客户合计收入占比 | S0 | 10-K Customer Concentration Note |
| 2008/2020衰退期各分部收入YoY | S0 | 历史10-K |
| Vanguard 2012切换详细时间线 | S0 | 历史报道+当时财报 |
| Solactive/MerQube真实份额数据 | S1 | WatersTechnology行业报告 |
| EU SFDR Phase 2对ESG基准影响 | S1 | 欧盟监管文件 |
| Direct Indexing $135B增速拆分 | S1 | Earnings call transcript |
| Burgiss整合进度KPI | S1 | Earnings call + investor day |

---

## AI待完成清单 (Phase 0之前)

1. [x] Phase -1 知识检索 (knowledge_context.md: 1480 chars)
2. [ ] Phase -0.5 文献侦察 — 5路WebSearch → data/lit_recon_memo.md (≥1000 chars)
3. [ ] 运行 preflight_gate.sh 验证 → 必须CLEARED
4. [x] checkpoint.yaml 已创建 (target_chars: 350000 ← 需更新)
5. [ ] Phase 0.75 核心矛盾结晶 → thesis_crystallization.md (CI-01~CI-06已预定义)

## 纵深防御提醒
- **Layer 0**: tier3_launch.sh [已完成] — 复杂度估计+知识检索+checkpoint
- **Layer 1**: preflight_gate.sh [待执行] — Phase 0前硬阻断
- **Layer 2**: phase_sentinel.sh [自动] — 每Phase后重验全部前序(含EVO-001地理/EVO-005去重)
- **Layer 3**: quality_gate_complete.sh [最终] — 组装前门控
- **设计**: 即使任何单层被跳过, 后续层仍会检测到缺失产出
