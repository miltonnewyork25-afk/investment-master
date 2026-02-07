# META Tier 3 深度研究 Agent协作方案 v1.0

> **编制日期**: 2026-02-07
> **适用框架**: Deep-Dive Protocol v6.0 + Agent Collaboration Protocol v1.1
> **目标字符**: ≥119,000 (科技平台 ×1.4系数)
> **GOOGL经验集成**: 5路并行Phase 3 + 3路并行Phase 4 + 禁区清单 + DM版本控制 + 反幻觉5条禁令

---

## META特殊Agent需求

与GOOGL对比，META需要新增5类专家Agent:

| 专家类型 | GOOGL需求 | META需求 | 原因 |
|---------|:-------:|:-------:|------|
| Reality Labs专家 | ❌ | ✅ | VR/AR/Metaverse独立分析（$20B+投资无同行对标） |
| Llama/AI开源专家 | ❌ | ✅ | 开源AI策略vs闭源Google，商业模式完全不同 |
| 社交平台竞争专家 | ❌ | ✅ | Instagram vs TikTok, Threads vs X竞争极其激烈 |
| 广告经济学专家 | ✅ | ✅✅ | META广告依赖度97% vs GOOGL多元化，风险更集中 |
| 监管诉讼专家 | ✅ | ✅✅ | META诉讼数量是GOOGL的2.5倍（青少年安全+FTC上诉+DMA） |

---

## Phase 0: 数据基础（自动执行）

**Agent数量**: 1（自动化脚本）

### Agent: DataFetch Bot
- **职责**:
  1. 调用 `data-prefetch` 技能获取14个数据文件
  2. 初始化 Data Master v1.0 (`reports/META/data/shared_context.md`)
  3. 初始化 KAL 模板 (`reports/META/data/key_assumptions.md`)
  4. 检查预测市场覆盖度

- **禁区**:
  - 不做任何数据解读
  - 不进行估值计算

- **数据依赖**: 外部数据源（Yahoo Finance, SEC EDGAR, Polymarket）

- **Data Master初始化锚点** (v1.0):
  ```
  [DM-FIN] 7个锚点: 年度营收/季度营收/EPS/FCF/毛利率/营业利润率/员工数
  [DM-MKT] 4个锚点: 当前股价/市值/PE/PB
  [DM-IND] 3个锚点: DAU/MAU/ARPU
  [DM-VAL] 占位: Phase 2填充
  [DM-AI] 占位: Phase 3.5填充
  ```

- **自检**:
  - `prefetch_metadata.json` 存在
  - Layer 1数据全部OK
  - ≥8/14文件可用
  - DM v1.0包含14个锚点
  - KAL模板包含6个Section

- **通信**: 输出 `STATUS.md` 初始化状态

- **门控**: 数据完整度≥70% + DM v1.0已创建

---

## Phase 0.5: 市场注意力雷达 + Core Questions（自动执行）

**Agent数量**: 2（并行）

### Agent A: Market Scanner
- **职责**:
  1. 5路并行WebSearch（30天内分析师报告/多空争论/风险催化/散户情绪/行业趋势）
  2. 提取Top 10维度（按提及频率 × 来源权威性排序）
  3. 热点比对框架预设模块（M01-M14 + TP01-TP06）
  4. 生成Hot-Patch模块规格（未覆盖维度heat≥7）

- **禁区**:
  - 不做Core Questions提取（交给Agent B）
  - 不做覆盖率计算（并行）

- **数据依赖**: WebSearch实时结果

- **关键搜索查询** (META特定):
  ```
  - "META stock analysis report 2026 Q1"
  - "Instagram Reels vs TikTok monetization 2026"
  - "Reality Labs losses metaverse"
  - "META AI Llama open source strategy"
  - "FTC META antitrust appeal"
  - "META youth safety lawsuit"
  - "Threads vs X Twitter competition"
  - "META ad revenue growth forecast"
  - "site:polymarket.com META regulation"
  - "site:polymarket.com metaverse adoption"
  ```

- **自检**:
  - Top 10维度提取完成
  - 每个维度有≥3个来源
  - 生成≥2个Hot-Patch规格

### Agent B: Core Questions Extractor
- **职责**:
  1. 从Agent A的Top 10维度中提取5-8个Core Questions
  2. 每个CQ关联≥2个模块
  3. 生成CQ-模块相关性矩阵
  4. 初步注册CQ关联的假设到KAL（如"Reels变现将在2026达到Instagram Feed 70%"）

- **禁区**:
  - 不做模块深度分析（Phase 1-3才做）
  - 不做估值假设（Phase 2才做）

- **数据依赖**: Agent A的Top 10维度

- **预期META Core Questions示例**:
  ```
  CQ1: Reality Labs何时/能否盈亏平衡？$20B/年投资回报在哪？
  CQ2: Reels广告变现能否追上TikTok？当前差距多大？
  CQ3: Llama开源战略如何转化为商业价值？vs闭源模型劣势？
  CQ4: 青少年用户流失（Instagram→TikTok）趋势是否可逆？
  CQ5: FTC上诉（Instagram/WhatsApp拆分）概率？影响几何？
  CQ6: Advantage+（AI广告工具）能否维持广告定价权？
  CQ7: Threads能否达到5亿MAU？变现时间窗口？
  CQ8: 欧盟DMA对广告业务的实际影响量化？
  ```

- **自检**:
  - 5-8个CQ已提取
  - CQ-模块矩阵完成
  - 覆盖率≥80%

- **通信**: 输出 `core_questions.md` + 更新 `STATUS.md`

- **门控**: CQ数量5-8个 + 覆盖率≥80% + KAL已注册初始假设

---

## Phase 1: 定位与生态

**Agent数量**: 3（并行）

### Agent A: Company Positioning Lead
- **职责**:
  1. 公司基本画像（业务模型、历史沿革、管理层评估）
  2. 产业链上下游映射（广告主、用户、开发者、内容创作者生态）
  3. M14呈现（展示Phase 0.5的Top 10+CQ+覆盖计划）

- **禁区**:
  - 不做周期定位（Phase 2）
  - 不做财务分析（Phase 2）
  - 不做预测市场分析（Agent B）

- **数据依赖**:
  - [DM-FIN-001~007 v1.0] 基础财务数据
  - [DM-IND-001~003 v1.0] DAU/MAU/ARPU
  - Phase 0.5的 `core_questions.md`

- **字符目标**: 6,000-8,000

- **自检**:
  - 公司画像≥3,000字符
  - 产业链≥10个关键节点
  - M14表格完整

### Agent B: Prediction Market Analyst
- **职责**:
  1. 预测市场环境扫描（宏观+行业+公司特定事件）
  2. META特定事件概率（FTC上诉/DMA罚款/Reality Labs产品发布/Threads DAU里程碑）
  3. 初步PPDA背离识别（≥3个）
  4. 构建PMSI情绪指数初版
  5. 写入DM-PM锚点（≥8个事件概率）

- **禁区**:
  - 不做看空分析（Phase 4）
  - 不做估值调整（Phase 2）
  - 禁止编造概率（反幻觉禁令#4）

- **数据依赖**: Polymarket/Kalshi实时数据

- **字符目标**: 5,000-7,000

- **自检**:
  - ≥8个预测市场事件已覆盖
  - 每个事件有概率+时间窗口
  - DM-PM-001~008 v1.0已写入

### Agent C: Hot-Patch Module Writer
- **职责**:
  1. 执行Phase 0.5分配到Phase 1的Hot-Patch模块
  2. META预期Hot-Patch: "Threads增长动力学"（1,500-3,000字符）
  3. 将模块发现关联到CQ（如Threads→CQ7）

- **禁区**:
  - 不超出Phase 0.5分配的模块范围
  - 不做其他Agent的模块

- **数据依赖**:
  - Phase 0.5的Hot-Patch规格
  - WebSearch获取Threads最新数据

- **字符目标**: 1,500-3,000/个Hot-Patch

- **自检**:
  - 所有分配Hot-Patch完成
  - 每个模块关联≥1个CQ

### 通信机制
- Agent A完成→更新 `STATUS.md`→通知Agent B/C可引用公司画像
- Agent B完成→写入 `DM-PM` 锚点→通知后续Phase可引用
- Agent C完成→标记Hot-Patch已覆盖→更新M14覆盖率

### 门控: QG-01~03
- 公司画像≥3,000字符 (QG-01)
- 产业链≥10节点 (QG-02)
- 预测市场≥8事件 + M14覆盖计划输出 (QG-03)
- Fast Gate通过 (≥20,000字符)
- P-G ≥8/10

---

## Phase 2: 财务与估值

**Agent数量**: 4（并行）

### Agent A: Cycle Positioning Expert
- **职责**:
  1. 周期精确定位（科技平台生命周期+广告市场周期+AI投资周期）
  2. 6层雷达图（宏观/行业/库存/定价/情绪/信号）
  3. Reality Labs周期独立评估（处于"启动期"末尾？）

- **禁区**:
  - 不做估值（Agent B/C）
  - 不做财报深度分析（Agent D）

- **数据依赖**:
  - [DM-FIN v1.0] 财务基础数据
  - [DM-PM v1.0] 预测市场数据
  - WebSearch获取行业周期信号

- **字符目标**: 5,000-7,000

- **自检**:
  - 6层雷达图完成
  - ≥4个周期信号
  - Reality Labs独立定位

### Agent B: SOTP Valuation Lead
- **职责**:
  1. **核心**：SOTP分部估值（Family of Apps / Reality Labs / 其他）
  2. 三步验证流程（段值验证→汇总验证→每股验证）
  3. 写入 `DM-VAL-001 v1.0` SOTP工作底稿（含所有可比公司数据来源）
  4. 写入 `DM-VAL-002 v1.0` DCF估值

- **禁区**:
  - 禁止"合理推算"分部估值（反幻觉禁令#2）
  - 禁止编造可比公司倍数（反幻觉禁令#3）
  - 不做AI调整估值（Phase 3.5）

- **数据依赖**:
  - [DM-FIN v1.0] 分部营收/利润数据
  - [DM-MKT v1.0] 当前股价/市值
  - WebSearch获取≥3家可比公司倍数（Snap/Pinterest/Twitter等，Reality Labs无对标需特殊处理）

- **关键挑战**: Reality Labs估值（$20B/年亏损，无可比公司，需用期权定价or情景分析）

- **字符目标**: 8,000-10,000

- **SOTP工作底稿模板**:
  ```markdown
  ## SOTP工作底稿 (META)

  ### Step 1: 段值
  | 分部 | 营收来源 | FY2025营收 | 利润率来源 | 营业利润率 | 倍数来源 | EV/EBITDA | 段值 |
  |------|---------|-----------|----------|----------|---------|----------|------|
  | Family of Apps | [DM-FIN-004] | $XXXB | [DM-FIN-006] | XX% | [Snap/Pinterest中位数] | XXx | $XXXB |
  | Reality Labs | [DM-FIN-005] | $XXB | [DM-FIN-007] | -XXX% | [期权定价法] | N/A | $XXB or ($XXB) |

  ### Step 2: 汇总
  | 项目 | 金额 |
  |------|------|
  | Family of Apps | $XXXB |
  | Reality Labs | $XXB (期权价值) or -$XXB (持续亏损折现) |
  | 企业价值合计 | $XXXB |
  | 减: 净债务 | ($XXB) |
  | 股权价值 | $XXXB |

  ### Step 3: 每股
  | 项目 | 值 | 来源 |
  |------|---|------|
  | 股权价值 | $XXXB | Step 2 |
  | 稀释后股数 | X.XXB | [DM-MKT-003 v1.0] |
  | **SOTP每股** | **$XXX.XX** | 计算 |
  ```

- **自检**:
  - SOTP三步验证全部通过
  - 所有分部营收≥90%已覆盖
  - DM-VAL-001 v1.0已写入
  - Reality Labs估值方法有合理性说明

### Agent C: DCF & Scenario Expert
- **职责**:
  1. DCF估值（10年预测+终值）
  2. 三情景矩阵（Bull/Base/Bear）
  3. 情景差异驱动因素分解
  4. 与SOTP交叉验证（偏离度<20%？）

- **禁区**:
  - 不重复SOTP计算（Agent B负责）
  - 不做AI调整（Phase 3.5）

- **数据依赖**:
  - [DM-FIN v1.0] 历史财务
  - [DM-VAL-001 v1.0] SOTP基准
  - WebSearch获取分析师预测共识

- **字符目标**: 6,000-8,000

- **自检**:
  - DCF完整（10年现金流+WACC+终值）
  - 三情景已建模
  - DCF vs SOTP偏离度已计算

### Agent D: Financial Deep-Dive
- **职责**:
  1. 5年财务趋势分析（收入/利润/现金流/资产负债）
  2. 资本配置分析（R&D效率Reality Labs $20B投入ROI、CapEx AI基础设施、回购效率）
  3. 财务健康度评估（流动性、杠杆、ROIC趋势）
  4. 注册关键财务假设到KAL（如"Reality Labs 2027盈亏平衡"）

- **禁区**:
  - 不做估值计算（Agent B/C）
  - 不做周期定位（Agent A）

- **数据依赖**:
  - [DM-FIN v1.0] 全部财务锚点
  - WebSearch获取历史财报

- **字符目标**: 5,000-7,000

- **自检**:
  - 5年趋势表完整
  - R&D效率分析完成（Reality Labs专项）
  - KAL已注册财务假设

### 通信机制
- Agent B（SOTP）优先级最高，完成后写入DM-VAL-001，其他Agent可引用
- Agent C等待DM-VAL-001写入后进行交叉验证
- Agent A/D可并行，无依赖
- 所有Agent完成→主线程检查SOTP三步验证→更新DM版本号v1.1

### 门控: QG-04~06
- 周期定位≥4个信号 (QG-04)
- SOTP覆盖≥90%营收分部 (QG-05)
- SOTP vs DCF偏离<20% (QG-06)
- Fast Gate通过 (≥25,000字符)
- P-G ≥8/10
- **R-G ≥5/10** (SOTP一致性为核心检查项)

---

## Phase 3: 战略分析

**Agent数量**: 5（并行，GOOGL验证配置）

### Agent A: Moat Quantifier
- **职责**:
  1. 护城河类型识别（网络效应/品牌/转换成本/数据/规模）
  2. TP01平台经济学（网络效应强度/锁定系数/多边市场健康度）
  3. TP06数据护城河（数据独占性/飞轮效率/隐私法规冲击）
  4. META特定：社交图谱锁定vs竞争威胁（TikTok/X）

- **禁区**:
  - 不做广告分析（Agent B）
  - 不做AI分析（Phase 3.5）
  - 不做竞争格局深度（Agent D）

- **数据依赖**:
  - [DM-IND v1.0] DAU/MAU/ARPU
  - WebSearch获取转换成本数据

- **字符目标**: 5,000-7,000

- **自检**:
  - TP01网络效应矩阵完成
  - TP06数据护城河评估完成
  - 护城河量化（每类有具体数据）

### Agent B: Advertising Economics Specialist
- **职责**:
  1. **核心**：TP02广告经济学（ARPU趋势/广告负载/CPM/广告格式演进/广告主集中度）
  2. Reels vs Feed变现对比（当前Reels变现为Feed的XX%？2026目标？）
  3. Advantage+（AI广告工具）效率分析
  4. 广告主ROI追踪（广告主是否因ROI下降减少投放？）

- **禁区**:
  - 不做非广告业务（Agent A/C）
  - 不做AI深度评估（Phase 3.5）

- **数据依赖**:
  - [DM-FIN v1.0] 广告收入数据
  - WebSearch获取Reels/Feed ARPU对比
  - 财报电话会议Reels变现指引

- **字符目标**: 6,000-8,000

- **自检**:
  - ARPU 5年趋势表完成（按地区+产品分解）
  - Reels变现路径分析完成
  - 广告负载vs竞争对比完成

### Agent C: Reality Labs Deep-Dive
- **职责**:
  1. **META特有模块**：Reality Labs完整分析（产品路线图/市场定位/技术进展/竞争对比）
  2. VR/AR市场规模预测（预测市场数据？分析师共识？）
  3. Metaverse采用路径（消费者/企业，时间窗口？）
  4. $20B/年投入可持续性分析（何时需收窄？盈亏平衡路径？）
  5. 注册RL假设到KAL（如"Quest Pro销量2026达XXM台"）

- **禁区**:
  - 不做估值（Phase 2已完成）
  - 不做Family of Apps分析（Agent A/B）

- **数据依赖**:
  - [DM-FIN v1.0] Reality Labs营收/亏损
  - [DM-VAL-001 v1.0] RL估值假设
  - WebSearch获取VR市场数据

- **字符目标**: 5,000-7,000

- **自检**:
  - RL产品路线图完整
  - 盈亏平衡路径分析完成
  - KAL已注册RL关键假设

### Agent D: Five-Engine Synthesizer
- **职责**:
  1. 五引擎协同分析（周期/股权/聪明钱/信号/预测市场）
  2. PPDA背离深度分析（≥3个显著背离）
  3. 五引擎数据依赖矩阵（标注E2+E3重叠，避免双重计票）
  4. 聪明钱立场（Tiger Global/Coatue等科技对冲基金持仓变化）

- **禁区**:
  - 不做单一模块深度（Agent A/B/C）
  - 不做估值（Phase 2）

- **数据依赖**:
  - [DM-PM v1.0] 预测市场数据
  - Phase 2的周期定位
  - WebSearch获取13F持仓数据

- **字符目标**: 6,000-8,000

- **自检**:
  - 五引擎每引擎≥3,000字符
  - PPDA≥3个背离
  - 数据依赖矩阵标注完成

### Agent E: Hot-Patch & Competitive Threats
- **职责**:
  1. 执行Phase 3分配的Hot-Patch模块（预计META有"Threads vs X竞争"模块）
  2. 社交平台竞争威胁深度（Instagram vs TikTok用户时长/创作者分成/算法效率）
  3. Llama开源策略分析（开源AI如何转化商业价值？vs闭源竞争劣势？）
  4. TP05开发者生态（Llama开发者采用度/API经济）

- **禁区**:
  - 不做Family of Apps核心业务（Agent A/B）
  - 不做Reality Labs（Agent C）

- **数据依赖**:
  - Phase 0.5 Hot-Patch规格
  - WebSearch获取TikTok/X数据
  - GitHub Llama星标/下载数据

- **字符目标**: 5,000-7,000

- **自检**:
  - 所有Phase 3 Hot-Patch完成
  - Threads vs X对比完成
  - Llama开源策略分析完成

### 通信机制
- 5个Agent完全并行，无阻塞依赖
- 每个Agent完成→更新 `STATUS.md`→主线程归档到Phase 3主文件
- Agent B（广告）和Agent D（五引擎）可能引用相同的ARPU数据，注意标注DM版本号避免不一致

### 门控: QG-07~09
- 护城河量化（每类有数据支撑） (QG-07)
- 五引擎每引擎≥3,000字符 (QG-08)
- PPDA≥3个背离 + PMSI构建完成 (QG-09)
- Fast Gate通过 (≥25,000字符)
- P-G ≥8/10

---

## Phase 3.5: AI深度评估

**Agent数量**: 3（并行）

### Agent A: AI Impact Matrix Builder
- **职责**:
  1. M13分部级AI冲击矩阵（Family of Apps/Reality Labs分别评估）
  2. 五维度评分（收入冲击/成本冲击/护城河变化/竞争变化/时间窗口）
  3. **META特定**：
     - Family of Apps: AI广告定向(Advantage+)为"+4"收入冲击？内容审核AI为"-2"成本冲击？
     - Reality Labs: AI驱动的虚拟形象/世界生成为"+3"？还是与AI无关？
  4. 写入 `DM-AI-001 v1.0` AI净分

- **禁区**:
  - 不做L×S定位（Agent B）
  - 不做估值调整（Agent C）

- **数据依赖**:
  - [DM-FIN v1.0] 分部营收数据
  - Phase 3 Agent B的Advantage+分析

- **字符目标**: 4,000-6,000

- **自检**:
  - ≥90%营收分部已评分
  - AI净分已计算
  - DM-AI-001 v1.0已写入

### Agent B: AI Maturity Assessor (L×S Grid)
- **职责**:
  1. L轴实施级别（L0~L4）评估（META AI助手在哪个级别？Advantage+？）
  2. S轴商业兑现（S0~S4）评估（Advantage+已达S2规模化？）
  3. 五不变量检验（区分叙事vs真实进展）
  4. 同业对比（META vs GOOG AI变现进展）

- **禁区**:
  - 不做分部冲击（Agent A）
  - 不做估值（Agent C）

- **数据依赖**:
  - WebSearch获取META AI产品发布时间线
  - 财报电话会议AI投入/产出数据

- **字符目标**: 3,000-5,000

- **自检**:
  - L×S坐标已定位
  - ≥3条证据支撑
  - 五不变量检验完成

### Agent C: AI Valuation Adjuster
- **职责**:
  1. 从Agent A+B推导AI对SOTP的调整
  2. **META特定**：
     - Family of Apps: Advantage+推高广告ARPU→估值乘数上调X% [合理推断: 推理链]
     - Reality Labs: AI影响中性或负面（AI不是RL核心）→估值不变或下调
  3. 输出"AI调整后SOTP" vs "基线SOTP"
  4. 更新 `DM-VAL-001 v1.1`（AI调整后版本）

- **禁区**:
  - 不重新计算基线SOTP（引用DM-VAL-001 v1.0）
  - 调整幅度单层≤±15%（估值修正层级L1-L2）

- **数据依赖**:
  - [DM-VAL-001 v1.0] 基线SOTP
  - [DM-AI-001 v1.0] AI净分
  - Agent A/B的分析结论

- **字符目标**: 3,000-4,000

- **自检**:
  - AI调整SOTP已计算
  - 调整幅度有推理链
  - DM-VAL-001 v1.1已写入

### 通信机制
- Agent A→Agent C有依赖（C等待A的AI净分）
- Agent B可并行
- 所有Agent完成→主线程检查AI调整合理性→更新DM版本

### 门控: QG-09.5
- ≥90%营收分部AI冲击已评分
- L×S定位有≥3条证据
- AI调整估值已量化并解释
- Fast Gate通过 (≥10,000字符)
- P-G ≥8/10

---

## Phase 4: 对抗审查（强制执行）

**Agent数量**: 3（并行，GOOGL验证配置）

### Agent A: Behavioral Finance Auditor
- **职责**:
  1. 四项认知偏差检查（锚定效应/确认偏误/过度自信/损失厌恶）
  2. **META特定偏差风险**：
     - Reality Labs沉没成本谬误？（已投$20B，是否因损失厌恶而高估未来回报？）
     - Reels变现锚定？（是否因TikTok高估值而锚定Reels价值？）
  3. 概率区间审查（置信区间是否过窄？）
  4. 偏差修正建议+量化影响

- **禁区**:
  - 不做事实核查（Agent C）
  - 不做看空分析（Agent B）

- **数据依赖**:
  - Phase 1-3全部报告
  - Phase 2的估值假设

- **字符目标**: 5,000-7,000

- **自检**:
  - 四项偏差全部检查
  - ≥2个偏差识别并量化修正

### Agent B: Bear Case Advocate (钢人论证)
- **职责**:
  1. **核心**：≥8个看空论点（四要素：触发条件/概率/影响量化/时间窗口）
  2. **META特定看空论点**：
     - Reality Labs持续亏损→2027仍未盈亏平衡→需减值/关停
     - TikTok持续蚕食Instagram年轻用户→2026 MAU首次负增长
     - FTC上诉成功→Instagram/WhatsApp强制剥离→营收下降30%
     - 广告负载天花板→ARPU增长停滞→收入增速<5%
     - 欧盟DMA罚款+业务限制→欧洲营收下降20%
     - Llama开源无变现→AI投入ROI为负
     - Threads增长停滞（<5亿MAU）→错失Twitter替代窗口
     - 青少年安全诉讼→平台使用限制→DAU下降
  3. 钢人论证（最强空头观点，非稻草人）
  4. 压力测试（极端场景SOTP）

- **禁区**:
  - 不做偏差分析（Agent A）
  - 不做事实核查（Agent C）

- **数据依赖**:
  - [DM-VAL-001 v1.1] AI调整SOTP
  - [DM-PM v1.0] 预测市场概率
  - WebSearch获取空头分析师报告

- **字符目标**: 6,000-8,000

- **自检**:
  - ≥8个看空论点完成
  - 每个论点含四要素
  - 钢人论证检验通过
  - 看空篇幅≥总Phase 4的40%

### Agent C: Fact Checker & Counter-Evidence Hunter
- **职责**:
  1. 关键数据事实核查（≥10个核心数据点）
  2. **META特定核查重点**：
     - Reality Labs营收/亏损数字（10-K vs 报告引用）
     - Reels ARPU vs Feed ARPU（是否有官方数据？还是推算？）
     - FTC上诉概率（预测市场 vs 法律专家）
     - Threads MAU（META披露 vs 第三方估计）
  3. 反证挑战（≥3条："如果论点完全错误，原因是什么？"）
  4. 维度回检（Phase 0.5 Top 10是否100%回应）
  5. 聪明钱验证（机构持仓变化vs我们的结论一致性）

- **禁区**:
  - 不做看空分析（Agent B）
  - 不做偏差分析（Agent A）

- **数据依赖**:
  - Phase 1-3全部报告
  - Data Master全部锚点
  - WebSearch验证数据来源

- **字符目标**: 4,000-6,000

- **自检**:
  - ≥10个数据点核查完成
  - ≥3条反证挑战
  - Top 10维度回应率100%

### 通信机制
- 3个Agent完全并行
- Agent C完成后→主线程运行R-G门控（检查DM引用一致性）
- Agent B看空论点→Phase 5 Kill Switch注册表输入

### 门控: QG-10~11
- 四项偏差全部检查+量化修正 (QG-10)
- 事实核查≥10点 + 反证≥3条 + Top 10回应100% (QG-11)
- Fast Gate通过 (≥15,000字符，标注密度≥8/万)
- P-G ≥8/10
- **R-G ≥7/10** (DM一致性+KAL验证)

---

## Phase 5: 决策输出

**Agent数量**: 3（并行）

### Agent A: Rating & Position Sizer
- **职责**:
  1. 综合评分（0-100分）
  2. 评级（强烈推荐/推荐/中性/回避）
  3. 仓位建议（基础仓位 × 周期系数 × 置信度 × AI调整系数）
  4. 买入/卖出触发点（价格区间+催化剂）

- **禁区**:
  - 不做Kill Switch（Agent B）
  - 不做预测清单（Agent C）

- **数据依赖**:
  - [DM-VAL-001 v1.1] 最终估值
  - Phase 4看空分析
  - 五引擎置信度

- **字符目标**: 4,000-6,000

- **自检**:
  - 评分有明确计算公式
  - 仓位建议有周期/置信度/AI三重调整

### Agent B: Kill Switch Registry Manager
- **职责**:
  1. **核心**：Kill Switch注册表（≥15个触发条件）
  2. **META特定Kill Switch**：
     - DAU连续2季度下降>5% → Hard (立即清仓)
     - 广告收入连续2季度<0%增长 → Hard
     - FTC拆分概率>35% → Hard
     - Reality Labs累计亏损>$150B且无产品突破 → Soft (减仓50%)
     - Reels变现2026未达Feed 50% → Soft
     - TikTok美国未被禁且份额持续增长 → Soft
     - Instagram MAU首次负增长 → Hard
     - 欧盟DMA罚款>$50B → Soft
     - Threads 2026 MAU<3亿 → Soft
     - 广告主集中度Top 10>40% → Soft
     - Llama被闭源模型完全超越（市场份额<5%）→ Soft
     - 青少年用户流失率>20% → Hard
     - CapEx/营收>30%持续4季度 → Soft
     - 监管限制广告定向能力→ARPU下降>15% → Hard
     - 重大数据泄露（影响>10亿用户）→ Hard
  3. 每个KS含：触发条件+阈值+动作+监控频率
  4. 写入 `reports/META/data/kill_switch_registry.md`

- **禁区**:
  - 不做仓位建议（Agent A）
  - 不做预测清单（Agent C）

- **数据依赖**:
  - Phase 4 Agent B看空论点
  - Phase 3五引擎信号

- **字符目标**: 5,000-7,000

- **自检**:
  - ≥15个KS（含≥2个AI相关）
  - 每个KS含四要素
  - Hard vs Soft分类明确

### Agent C: Verifiable Predictions Architect
- **职责**:
  1. 可验证预测清单（≥20个）
  2. **META特定预测**：
     - Reality Labs 2026营收达$XXB，概率XX%，时间Q4 2026
     - Reels ARPU 2026达Feed XX%，概率XX%，时间Q2 2026财报
     - FTC上诉判决2027 Q1，拆分概率XX%
     - Threads MAU 2026达XXM，概率XX%
     - 欧盟DMA罚款2026宣判，金额$XXB-XXB，概率XX%
     - Instagram美国青少年DAU 2026负增长，概率XX%
     - Llama 4发布2026 Q3，开源模型市场份额达XX%，概率XX%
     - (其余13个...)
  3. 投资日历（未来12个月关键事件+预期影响）
  4. 90天行动清单（具体买入/加仓/减仓触发点）

- **禁区**:
  - 不做Kill Switch（Agent B）
  - 不做评级（Agent A）
  - 禁止编造概率（反幻觉禁令#4）

- **数据依赖**:
  - [DM-PM v1.0] 预测市场数据
  - Phase 2三情景矩阵
  - Phase 4看空论点

- **字符目标**: 4,000-6,000

- **自检**:
  - ≥20个预测完成
  - 每个含概率+时间+触发条件
  - 投资日历≥12个月

### 通信机制
- 3个Agent完全并行
- 所有Agent完成→主线程汇总→生成Complete报告→运行P-G+R-G全量门控

### 门控: QG-12
- Kill Switch≥15个（含≥2个AI相关）
- 可验证预测≥20个
- 铁律十五条全部满足
- Fast Gate通过 (≥15,000字符)
- P-G ≥8/10
- **R-G ≥10/12** (Phase 5强制全量R-G)

---

## 全局协作机制

### 1. Data Master版本控制

| Phase | DM版本 | 变更内容 |
|-------|--------|---------|
| 0 | v1.0 | 初始化14个锚点（FIN+MKT+IND） |
| 1 | v1.1 | 新增DM-PM-001~008（预测市场） |
| 2 | v1.2 | 新增DM-VAL-001~002（SOTP+DCF） |
| 3 | v1.2 | 无变更（Phase 3不产生新锚点） |
| 3.5 | v1.3 | 新增DM-AI-001（AI净分）+ DM-VAL-001升级v1.1（AI调整） |
| 4 | v1.3 | 冻结DM（Phase 4不允许修改数据，只做审查） |
| 5 | v1.3 | 最终冻结版本 |

### 2. 反幻觉5条禁令（所有Agent必须注入）

每个SubAgent的prompt **开头**必须包含：

```markdown
## 反幻觉禁令（必须遵守）

1. **禁止凭记忆引用财务数字** — 所有财务数据必须来自WebSearch获取或
   Data Master锚点，不得凭训练数据中的记忆写入任何营收/利润/增速数字。

2. **禁止"合理推算"替代真实数据** — 不得用"按行业平均""参考同行"等
   模糊推算替代真实数据。如确需推算，必须写出完整计算公式和每个输入值的来源。

3. **禁止编造可比公司倍数** — 估值倍数必须来自至少3家可比公司的真实数据，
   标注来源和日期。不得写"行业一般XX倍"。

4. **禁止虚构预测市场概率** — 预测市场概率只能从Polymarket/Kalshi等平台
   获取。无数据时写"该事件预测市场无覆盖"，不得编造概率数字。

5. **禁止未标注来源的百分比** — 任何百分比（增速、利润率、份额、概率）
   必须标注来源。"约XX%"不是来源，必须写明数字从何而来。
```

### 3. 任务锁与恢复机制

| 文件 | 创建时机 | 删除时机 | 内容 |
|------|---------|---------|------|
| `current_tasks/Agent_A.lock.md` | Phase开始dispatch前 | Agent完成+QG通过 | 任务描述+成功标准+状态 |
| `STATUS.md` | Phase开始 | Phase完成后合并入progress.md | 实时Agent状态+累计指标+失败日志 |
| `agent_logs/META_Phase{N}_Agent{X}.log.md` | Agent完成时 | 永久保留 | 执行日志+Top 5发现+自检结果 |

### 4. 质量门控双层架构

**P-G (过程门控)**: 自动化 `research_fast.sh`
- G1: 字符数 ≥ Phase目标
- G2: 标注密度 ≥15/万（Phase 4: ≥8/万）
- G3: 免责声明+目录存在
- G4: Mermaid图表 ≥3个
- G5: 禁止词检查
- G6: 标注格式校验
- G7: Phase 4专项（KS≥15，看空≥8）

**R-G (结果门控)**: Agent执行模板（Phase 4/5强制）
- SOTP一致性（各Agent引用同一DM-VAL-001版本）
- KS一致性（Phase 5 KS覆盖Phase 4看空论点）
- KAL一致性（报告结论vs KAL假设是否冲突）
- DM一致性（所有DM引用版本号一致）
- 估值可追溯（每个估值调整有审计日志）
- 数字一致性（同一数字在报告不同位置值相同）

### 5. 估值修正层级（v6.0）

| 层级 | 触发条件 | 允许调整幅度 | 审批要求 | META示例 |
|------|---------|------------|---------|---------|
| L1 | 新数据更新 | ±5% | 自动 | 最新季度财报发布 |
| L2 | 方法论精进 | ±10% | Agent自检 | AI调整估值（Phase 3.5） |
| L3 | 假设重大变化 | ±15% | Phase间审查 | Reality Labs盈亏平衡假设改变 |
| L4 | 事件冲击 | ±25% | 强制重新建模 | FTC拆分判决 |
| L5 | 商业模式变化 | >25% | 重启Deep-Dive | 广告业务被监管禁止 |

每次估值调整写入 `reports/META/data/valuation_audit_log.md`

---

## 执行时间线估算

| Phase | Agent数 | 并行耗时 | 主线程QG | 总耗时 | 累计 |
|-------|:------:|:-------:|:-------:|:-----:|:----:|
| 0 | 1 | 自动 | 5min | 自动 | 0h |
| 0.5 | 2 | 20min | 10min | 30min | 0.5h |
| 1 | 3 | 45min | 15min | 1h | 1.5h |
| 2 | 4 | 60min | 20min | 1.3h | 2.8h |
| 3 | 5 | 50min | 15min | 1.1h | 3.9h |
| 3.5 | 3 | 30min | 10min | 40min | 4.6h |
| 4 | 3 | 50min | 25min (R-G) | 1.2h | 5.8h |
| 5 | 3 | 40min | 30min (R-G) | 1.2h | 7h |

**预计总耗时**: 7小时（6次会话，每会话1-1.5小时）

---

## META vs GOOGL 对比总结

| 维度 | GOOGL | META |
|------|-------|------|
| 总Agent数 | 21 | 24 |
| 特有Agent | Search/YouTube/Cloud专家 | Reality Labs/Llama/Threads专家 |
| SOTP复杂度 | 高（6个分部） | 中（2个主要分部，RL估值困难） |
| 监管风险 | 高 | 极高（诉讼数2.5倍） |
| AI成熟度 | L2-L3 / S2 | L2 / S1-S2 |
| 广告依赖 | 79% | 97% |
| 关键争议 | Search vs AI, Cloud竞争 | Reality Labs ROI, TikTok威胁 |
| 预测市场覆盖 | 中 | 中 |
| 估值难点 | Other Bets估值 | Reality Labs估值（无对标） |

---

## 附录：META专用搜索模板

```yaml
# WebSearch查询模板（Agent执行时复制使用）

## Phase 0.5 市场扫描
- "META stock analyst report 2026 Q1"
- "META Reality Labs losses metaverse ROI"
- "Instagram Reels monetization vs TikTok"
- "META FTC antitrust appeal Instagram WhatsApp"
- "META youth safety lawsuit Congress"
- "Threads growth vs Twitter X 2026"
- "META Llama AI open source strategy"
- "site:polymarket.com META regulation"
- "site:polymarket.com metaverse adoption"
- "META advertising revenue forecast 2026"

## Phase 1 预测市场
- "site:polymarket.com META FTC breakup"
- "site:polymarket.com EU DMA fine"
- "site:kalshi.com social media regulation"
- "site:polymarket.com metaverse mainstream"

## Phase 2 估值
- "META SOTP valuation Family of Apps"
- "Reality Labs fair value venture capital method"
- "Snap Pinterest valuation multiples 2026"
- "META DCF assumptions analyst consensus"

## Phase 3 竞争
- "Instagram vs TikTok market share 2026"
- "Threads monthly active users growth"
- "META Llama vs ChatGPT market share"
- "META developer ecosystem API"

## Phase 3.5 AI
- "META Advantage+ advertising AI ROI"
- "META AI assistant adoption rate"
- "Llama 3 vs GPT-4 performance benchmark"

## Phase 4 看空
- "META bear case analyst short seller"
- "Reality Labs shutdown probability"
- "TikTok Instagram user exodus data"
- "META advertising load ceiling ARPU"
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2026-02-07 | 初版。基于GOOGL经验，新增Reality Labs/Llama/Threads专家Agent，24个Agent分工，DM v2.0+反幻觉5条禁令+估值修正层级集成 |

---

**文档状态**: 已完成，待用户审阅 → 进入Phase 0执行

**下一步**: 用户确认方案 → 切换到"科技平台"worktree → 启动Phase 0 DataFetch
