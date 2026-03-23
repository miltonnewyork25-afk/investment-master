# PTC Inc 深度研究计划 v2.0
# 日期: 2026-03-19
# 框架版本: v19.6 + 问题树v1.0
# 目标: ≥350K字符 + 4.4分(≥90/110)
# 核心提醒: PTC不是horizontal SaaS——它是复杂制造企业的工程流程骨架

---

## 一、计划v1.0→v2.0的根本性升级

| 维度 | v1.0(通用SaaS模板) | v2.0(工业SaaS专属) |
|------|-------------------|-------------------|
| 身份定义 | 默认"Enterprise SaaS" | **CQ0: 5种定义→估值分叉点** |
| 客户分析 | 笼统"制造业客户" | **CQ2全树: 采购链+部署摩擦+价值兑现周期** |
| 产品分析 | 4大引擎概述 | **CQ3-4.99: 7个产品独立深拆+组合vs平台判定** |
| 核心矛盾 | 隐含 | **CQ5: 显式定义+注意力错配检测** |
| 竞争分析 | 配对对决 | **CQ6: 按产品赛道逐一定位+竞争优势来源分类** |
| 云化分析 | 简单SaaS转型 | **CQ7: on-prem订阅vs云托管vs云原生三层拆解** |
| AI分析 | AIAS通用 | **CQ8: 工业AI特殊性(工程数据→配置管理→服务优化)** |
| 一线验证 | 缺失 | **CQ9: FVF工业版(工程团队+PLM管理员+服务团队评价)** |
| 字符目标 | 275K | **≥350K** |
| 章节数 | 38 | **42-45** |
| Mermaid | 40+ | **≥45(含14个强制图谱)** |

---

## 二、参考框架维度矩阵(升级版)

### A层: Enterprise SaaS模块(v19.6, 基础层)

直接复用M1-M10+E1-E3,但每个模块需要**工业SaaS调整**:

| 模块 | 工业SaaS调整 |
|------|-------------|
| M1 收入结构 | PTC不按产品线披露→需要从10-K+ARR拆解间接推算。**问题树CQ3.8: 会计口径是否掩盖真实经济单元** |
| M2 SaaS经济学 | NRR推断+Magic Number。**新增: 工业SaaS的land-and-expand路径分析(CQ2.5)** |
| M3 AIAS | 工业AI特殊性(CQ8): 工程数据→配置管理→服务优化,非通用chatbot |
| M4 护城河迁移 | **新增: "实施复杂度"双面性(CQ2.8): 护城河 AND 天花板** |
| M5 定价权 | **新增: 工业客户预算来源分层(CQ2.5): R&D OPEX/IT/数字化/制造/服务** |
| M6 飞轮 | **升级: 从通用飞轮→"设计-制造-服务"digital thread闭环验证(CQ3.5)** |
| M7 财务 | **新增: IoT剥离Pro-forma(CQ10)+ARR vs Revenue差异解释** |
| M8 竞争 | **升级: 按5个产品赛道分别竞争定位(CQ6)** |
| M9 估值 | **新增: 5种身份定义→5种估值框架→分叉点(CQ0/CQ12)** |
| M10 管理层 | CEO Neil Barua评估+并购记录(CQ10.5) |

### B层: 半导体工业客户框架(交叉借用)

| 半导体框架 | PTC借用(升级) | 问题树对应 |
|-----------|-------------|-----------|
| KLAC五引擎 | PTC五引擎: CAD深度/PLM云化/ALM合规/SLM服务化/**数字主线协同** | CQ3 |
| KLAC周期分析 | **制造业CapEx周期→PTC ARR敏感性**(工业客户预算冻结时PTC如何) | CQ8(客户预算), CQ11 |
| KLAC信念反演 | Reverse DCF: 市场定价的是稳健现金流? 云化? AI? 还是平台协同? | CQ12.8 |
| SEMI A-Score | PTC A-Score(11维护城河)+FICO制度嵌入(Codebeamer合规) | CQ6.5 |
| SEMI配对对决 | **PTC vs Siemens(PLM)+PTC vs ADSK(CAD)+PTC vs Dassault(平台)** | CQ6 |
| KLAC出口管制 | PTC国防/ITAR敏感性(Windchill军工嵌入) | CQ11 |

### C层: CRM v2.0原创框架(v19.6)

| CRM框架 | PTC应用(升级) | 问题树对应 |
|---------|-------------|-----------|
| 飞轮悖论 | **PTC版: AI辅助设计成功→减少CAD seat? 服务自动化→减少ServiceMax seat?** | CQ8.5 |
| 定价权剪刀差 | **PTC版: F500制造商(Stage 4)+中端制造(Stage 3)+SMB(Onshape, Stage 2)** | CQ6.5+CQ7 |
| 温水煮青蛙 | **PTC版: ARR增速从14%→8.5%→每季度"还行"→5年后Siemens蚕食完成** | CQ11.5制度摩擦 |
| 3D敏感性 | WACC×ARR增速×OPM三维交叉 | CQ12 |

### D层: 问题树新增维度(v1.0完全缺失)

| 新维度 | 内容 | 问题树来源 |
|--------|------|-----------|
| **D1 身份定义分叉** | 5种定义→5种估值→市场在用哪种? 错在哪? | CQ0+CQ1 |
| **D2 工业客户采购链** | 采购发起人→决策链→预算来源→销售周期→land-and-expand路径 | CQ2+CQ2.5 |
| **D3 部署摩擦双面性** | 实施复杂度=护城河(切换成本10x)+天花板(新客获取慢) | CQ2.8 |
| **D4 产品栈经济单元** | 7产品独立深拆+哪些是现金牛/增长/期权/拖累 | CQ3+CQ4-4.99 |
| **D5 组合vs平台判定** | digital thread是真实还是叙事? 跨产品协同证据? 客户真的跨模块购买? | CQ3.5 |
| **D6 云化三层拆解** | on-prem订阅/云托管/云原生→三种economics→三种moat影响 | CQ7-7.8 |
| **D7 工业AI特殊性** | 工程数据基础→配置管理AI→服务预测AI(非通用chatbot) | CQ8-8.5 |
| **D8 一线验证(FVF工业版)** | G2/Gartner评分+工程师评价+PLM管理员评价+实施抱怨 | CQ9-9.5 |
| **D9 制度摩擦慢变量** | 主数据治理失败/跨部门推不动/验证周期过长→不体现在财报 | CQ11.5 |
| **D10 注意力错配** | 市场关注ARR/AI/云化→应关注部署质量/扩模块/产品数据基础 | CQ5.5 |

---

## 三、升级后报告结构(45章+4附录, 8 Parts)

| Part | 章节 | 内容 | CQ对应 | 字符 |
|------|------|------|--------|------|
| **Part 0: 身份与信念** | Ch1-3 | **CQ0身份定义分叉(Ch1)** + Reverse DCF信念集(Ch2) + **ADSK/CDNS/DASTY可比P0对标(Ch3)** | CQ0,CQ1,CQ12.8 | 20K |
| **Part I: 工业客户** | Ch4-6 | **客户行业图谱+采购链(Ch4)** + **部署摩擦双面性(Ch5)** + **价值兑现周期+一线验证FVF(Ch6)** | CQ2,2.5,2.8,9,9.5 | 30K |
| **Part II: 产品深拆** | Ch7-14 | Creo CAD(Ch7) + Windchill PLM(Ch8) + **Onshape云原生(Ch9)** + Arena云PLM/QMS(Ch10) + **Codebeamer ALM(Ch11)** + ServiceMax/Servigistics(Ch12) + **组合vs平台判定(Ch13)** + **数字主线飞轮验证(Ch14)** | CQ3-4.99,3.5 | 65K |
| **Part III: 竞争+AI** | Ch15-19 | **5赛道竞争定位(Ch15)** + PTC vs Siemens配对(Ch16) + PTC vs ADSK配对(Ch17) + **竞争弹性(Ch18)** + **工业AI 5步演绎(Ch19)** | CQ6-6.8,8-8.5 | 40K |
| **Part IV: 财务+估值** | Ch20-29 | 6年财务(Ch20) + **IoT剥离Pro-forma(Ch21)** + **SaaS经济学NRR推断(Ch22)** + **云化三层拆解(Ch23)** + **定价权分层(Ch24)** + RevDCF(Ch25) + SOTP双引擎(Ch26) + DCF+Python(Ch27) + 可比(Ch28) + **5情景概率(Ch29)** | CQ7,10,12 | 75K |
| **Part V: 深度分析** | Ch30-34 | **3D敏感性(Ch30)** + **OPM分解结构性(Ch31)** + **回购效率η(Ch32)** + **核心矛盾+注意力错配(Ch33)** + **AIAS-PE一致性(Ch34)** | CQ5,5.5,10.8,12.5 | 35K |
| **Part VI: 红队+校准** | Ch35-40 | 承重墙×7(Ch35) + RT-1~7(Ch36) + **温水煮青蛙(Siemens蚕食)(Ch37)** + **制度摩擦慢变量(Ch38)** + 校准回流(Ch39) + CQ闭环(Ch40) | CQ11,11.5,11.8 | 45K |
| **Part VII: 追踪+圆桌** | Ch41-43 | KS追踪(Ch41) + **thesis击穿条件(Ch42)** + 投资大师圆桌(Ch43) | CQ13,13.5,13.8 | 20K |
| **Part VIII: 跨公司** | Ch44-45 | **国防/ITAR护城河(Ch44)** + **PTC 2030画像(Ch45)** | CQ11,CQ12 | 15K |
| **附录** | A-E | DM注册表 + 方法论 + 数据源 + 质量声明 + **Mermaid图谱索引** | — | 10K |
| **合计** | | **45章 + 5附录** | | **~355K** |

---

## 四、14个强制Mermaid图谱(问题树§16)

| # | 图谱 | 对应章节 | 分析价值 |
|---|------|---------|---------|
| 1 | PTC产品全景图 | Ch7-12 | 产品栈概览 |
| 2 | CAD/PLM/ALM/SLM/QMS关系图 | Ch13 | 组合vs平台判定 |
| 3 | **工业客户采购决策链图** | Ch4 | CQ2.5核心 |
| 4 | **工业客户价值兑现路径图** | Ch6 | CQ9核心 |
| 5 | **产品协同/digital thread图** | Ch14 | CQ3.5飞轮验证 |
| 6 | Windchill/Arena/Onshape/Codebeamer连接图 | Ch13 | 平台协同证据 |
| 7 | **legacy vs cloud-native资产矩阵图** | Ch23 | CQ7云化三层 |
| 8 | **竞争格局图(5赛道)** | Ch15 | CQ6全景 |
| 9 | **ARR→Revenue→FCF桥接图** | Ch20-21 | CQ10财务质量 |
| 10 | **工业AI价值传导图** | Ch19 | CQ8核心 |
| 11 | 风险树(显性+慢变量+击穿) | Ch35-38 | CQ11全景 |
| 12 | 熊/基/牛场景树 | Ch29 | CQ12估值 |
| 13 | KS/TS追踪图 | Ch41 | CQ13核心 |
| 14 | **最终结论闭环图** | 执行摘要 | 总控 |

---

## 五、CQ体系(升级版, 问题树对齐)

| CQ | 问题 | 问题树来源 | 核心张力 | 预估摆动 |
|----|------|-----------|---------|---------|
| **CQ0** | **PTC应该被定义为什么?** | §2 CQ0+CQ1 | 5种定义→5种估值,定义错一层估值错30%+ | ±$20-30(PE 18-28x区间) |
| **CQ1** | 组合还是平台? | §4 CQ3.5 | digital thread真实→平台溢价 / 拼图→集团折价 | ±$15-25 |
| **CQ2** | 部署摩擦是护城河还是天花板? | §3 CQ2.8 | 护城河(切换10x)→但限制增速(新客获取慢) | ±$10-15 |
| **CQ3** | ARR增速8.5%见底了吗? | §8 CQ7 | IoT剥离基数+SaaS完成→可能见底 vs 有机更低 | ±$15-25 |
| **CQ4** | 工业AI是营销还是结构性? | §9 CQ8+8.5 | 工程数据基础→AI增值(正) vs CAD商品化(负) | ±$10-20 |
| **CQ5** | Siemens能蚕食PTC PLM份额吗? | §7 CQ6 | Siemens体量10x+Teamcenter→但PTC ABI#1 | ±$20-30 |
| **CQ6** | Onshape能从中小渗透大企业吗? | §5 CQ4.8 | 云原生架构优势→但复杂BOM/合规能力不足 | ±$10-15 |
| **CQ7** | Forward PE 22x是折价还是合理? | §13 CQ12+12.8 | vs ADSK 28x/CDNS 45x→折价 vs ARR增速最低→合理 | ±$20-30 |
| **CQ8** | 制造业CapEx下行如何影响PTC? | §12 CQ11 | 70%订阅=缓冲 vs 新签冻结+扩模块暂停 | ±$10-20 |

---

## 六、数据收集清单(升级版)

### P0: FMP API(必需)

| 数据 | 用途 |
|------|------|
| PTC 10年income/balance/cashflow annual | M1+M7, CQ10 |
| PTC quarterly income (Magic Number) | M2, CQ3 |
| PTC ratios + enterprise value | M9, CQ7 |
| ADSK/CDNS/DASTY/ANSS financials | 可比对标, CQ7 |
| PTC insider transactions | M10 |

### P-0.5: WebSearch(10路)

| # | 搜索 | 用途 | CQ |
|---|------|------|-----|
| 1 | "PTC FY2025 Q4 earnings transcript" | 管理层最新措辞+指引 | CQ3,CQ4 |
| 2 | "PTC IoT divestiture pro-forma financials" | Pro-forma收入/FCF | CQ3 |
| 3 | "PTC Windchill vs Siemens Teamcenter market share 2025" | PLM竞争格局 | CQ5 |
| 4 | "PTC Onshape vs Autodesk Fusion enterprise adoption" | 云CAD竞争 | CQ6 |
| 5 | "PTC Codebeamer VW generative AI copilot" | ALM+AI进展 | CQ4 |
| 6 | "PTC NRR net retention rate" | NRR数据(可能不公开) | M2 |
| 7 | "PTC ServiceMax field service market share" | SLM竞争 | CQ1 |
| 8 | "PLM CAD market size forecast 2025-2030" | TAM/增速 | CQ3 |
| 9 | "PTC customer implementation case study ROI" | 一线验证 | CQ9 |
| 10 | "manufacturing capex cycle 2026 outlook" | 工业周期 | CQ8 |

### P0+: MCP工具

| 工具 | 用途 |
|------|------|
| `baggers_summary PTC` | 快速概览 |
| `fmp_data income annual PTC` | 财务数据 |
| `fmp_data balance annual PTC` | 资产负债表 |
| `fmp_data cash-flow annual PTC` | 现金流 |
| `analyze_stock PTC` | 综合分析 |
| `compare_stocks PTC ADSK CDNS` | 可比对标 |

---

## 七、Session执行计划(升级版)

| Phase | Session | 内容 | 产出 | 字符 |
|-------|:-------:|------|------|------|
| -1~0.75 | S0 | tier3_launch+数据收集+CQ定义+thesis结晶 | 前置产出 | — |
| **1** | **S1** | Part 0+I+II(Ch1-14): 身份+客户+产品 | **≥115K** | 115K |
| **2** | **S2** | Part III+IV(Ch15-29): 竞争+AI+财务+估值 | **≥115K** | 115K |
| **3** | **S3** | Part V+VI+VII+VIII(Ch30-45): 深度+红队+追踪+圆桌 | **≥115K** | 115K |
| **5** | **S4** | 单会话Complete组装(铁律J) | **≥350K** | 355K |

**字符分配原则**: 3个Phase各≥115K(均衡, 避免CRM的"前重后轻")。Part II(产品深拆)是最大单元(65K/8章)因为7个产品需要独立深拆。

---

## 八、质量目标(4.4标准+问题树校准)

| 指标 | 目标 | 问题树要求 |
|------|------|-----------|
| 字符 | **≥350K** | §G1: 350KB有效深度(非背景堆砌) |
| DM密度 | **≥2.0/千字** | §G2: 每千字≥1.5高价值分析单元 |
| DM总数 | **≥600** | §G3: ≥450均匀覆盖10个维度 |
| Mermaid | **≥45** | §G4+§16: 14个强制图谱+每章≥1 |
| 因果密度 | **≥8.0/万字** | §G5: 变量→机制→结果→反馈完整链 |
| Python | 全覆盖 | §G6 |
| 离散度 | **≤25%** | §G7 |
| CQ体系 | CQ0-CQ8完整 | §G8: 问题编号→论证闭环→结论沉淀 |
| 评分 | **≥90/110(4.5分)** | §D1-D11全维度≥7 |

---

## 九、独创洞见目标(D7≥8分)

基于问题树的深度追问,预判以下洞见方向:

| # | 预判洞见 | 问题树来源 | 可迁移性 |
|---|---------|-----------|---------|
| 1 | **"实施复杂度×"** — 部署摩擦的双面性量化(护城河价值$X vs 增长天花板成本$Y) | CQ2.8 | 任何工业软件(Siemens/SAP/Oracle) |
| 2 | **"组合折价vs平台溢价"判定框架** — 多产品公司的协同真实性检验 | CQ3.5 | ADBE/MSFT/GOOG等多产品公司 |
| 3 | **"身份定义→估值分叉"** — 同一家公司5种定义→PE差50%+ | CQ0 | 任何"身份模糊"公司 |
| 4 | **工业AI数据优势矩阵** — 工程数据vs通用数据的AI价值差异 | CQ8 | Siemens/Dassault/ANSYS |
| 5 | **"注意力错配税"** — 市场关注ARR时遗漏的部署质量信号 | CQ5.5 | 所有SaaS(NRR比ARR重要) |

---

*PTC分析计划 v2.0 | 2026-03-19 | 问题树v1.0整合*
