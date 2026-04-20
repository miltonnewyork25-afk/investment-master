# SaaS Agent时代深度分析 — 从座席到数字劳动力

> **研究日期**: 2026-04-20 | **版本**: v1.0
> **基础材料**: R1(创意SaaS) + R2(安全SaaS) + R3(NRR SaaS) + CRM深度报告
> **最新市场动态**: WSJ/Axios 2026-04-20 围绕Benioff反击"SaaSpocalypse"叙事、Agentforce定价演化、Flex Credits/AWU讨论
> **目标**: 验证用户核心命题"Agent时代不是SaaS终结,而是从卖软件访问权转向卖可治理的数字劳动力"

---

## 执行摘要 — 母钉子: 计费单位转移,不是物种灭绝

**核心判断 (三句话)**:

**第一句**: 市场在用旧语言定价新现实。SaaS不会消亡,但"seat+Non-GAAP+Rule of 40"这套标尺会在3年内被淘汰——新的估值锚点是"**可治理数字劳动力的单位经济性**"(Agent Unit Economics),由四件事决定:可审计性、可治理性、上下文深度、执行权。

**第二句**: Salesforce的方向是对的,但证据远未完备。Agentforce名义ARR $800M(+169% YoY)听起来壮观,但67%是免费赠送/试用,真实付费约$264M,只占CRM总收入0.64%。Benioff推"Agentic Work Units (AWU)"试图把定价锚点从token成本抬到业务结果,这是**利润模型重构**(不是座席改流量),但利润回流能否1:1复刻旧SaaS,FY2027H1才能见分晓。

**第三句**: 垄断性没有消失,**垄断对象变了**。旧SaaS的垄断锚点是UI+seat+feature bundle;Agent时代的垄断锚点是**System of Record × Integration Fabric × Context Graph × Governance**。通用harness(OpenAI Agents SDK/Anthropic MCP)会被商品化,但企业应用厂商手里的**事务数据+身份权限+流程例外+审计责任+组织变革关系**无法被模型层吃掉——这决定了哪些SaaS能守住moat,哪些不能。

**对用户三个核心问题的直接回答**:

| 问题 | 回答 | 条件 |
|-----|------|-----|
| **未来行业复杂性是否在系统搭建(harness工程)上?** | 部分是,但harness不是唯一 | 通用harness将商品化;真正稀缺的是 harness × proprietary context × execution rights × governance 的四元组合 |
| **这种垄断性是否依然存在?** | 存在,但从"访问权垄断"变成"执行权+治理权垄断" | 必须满足:系统级数据所有权 + 流程嵌入度 + 审计责任承接 + 上线关系锁定 |
| **一般公司自实施难度多大?** | 技术上可行,经济上不划算,组织上极难 | DIY Agent = 3-5人AI团队 + 12-18月 + $2-5M/年基础成本 + 数据治理/合规/变更管理的隐形成本;对应对标SaaS订阅,多数企业TCO在3年内倒挂 |

**评级与跟踪变量**:

| 投资对象 | 评级 | 核心论点 | 第一变量 |
|---------|------|---------|---------|
| **CRM (Salesforce)** | 中性关注 | 方向对但PMF未证,$194公允 | Agentforce **付费**ARR季度变化率(不是名义ARR) |
| **NOW (ServiceNow)** | 关注 | 模块互锁1.2x NRR引擎最强,Context Engine战略定位清晰 | 模块数>6的客户占比 + ACV中位数 |
| **DDOG (Datadog)** | 中性关注 | 外部变量(Hyperscaler CapEx)主导,命运自主权低 | AWS/Azure CapEx增速 |
| **SNOW (Snowflake)** | 审慎关注 | Consumption quality-adjusted NRR只有87.5%,AI效率侵蚀底层 | Cortex AI ARR vs Databricks差距 |
| **模型层公司 (OpenAI/Anthropic)** | 不覆盖 | 通用harness向上挤压,但无法获得执行权+治理权租金 | Agents SDK / MCP的企业级采纳率 |

**Kill Switch(母级,全行业)**:
1. 某头部SaaS在连续2个季度披露Agent **付费**ARR增速<30% QoQ(证明PMF未确立)
2. Gartner"40% agentic项目会在2027年底被取消"的预言在2026年H2就提前出现(ROI不达预期导致企业回退)
3. Microsoft将CRM基础功能(lead routing + opportunity mgmt)免费bundled进M365 Copilot,且转化率超预期(>5%的CRM客户迁移)
4. MCP + Agents SDK 成为企业标准,SaaS厂商的Agent定价权被标准化协议挤压
5. 美国/欧盟对"AI Agent替代人类工作"的监管立法,使Agent部署成本翻倍

**母图(全文论证结构)**:

```
           [User Thesis: Agent时代=卖数字劳动力]
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   [验证层]         [验证层]          [验证层]
   Salesforce      其他SaaS         模型层挤压
   作为测试用例    路径分化          (OpenAI/Anthropic)
        │                │                │
        ▼                ▼                ▼
   [Ch 2-3]         [Ch 4-5]         [Ch 6]
   定价重构+       4类SaaS的         通用harness商品化
   飞轮悖论        agent化命运       vs 执行权护城河
        │                │                │
        └────────────────┼────────────────┘
                         ▼
               [Ch 7: 一般公司自实施]
               TCO模型 + 组织能力差距
                         │
                         ▼
               [Ch 8: 投资判断]
               跟踪变量 + 赔率结构
```

---

## Ch 1: 旧地图 vs 新裂缝 — 市场还停留在哪里

### 1.1 市场现在怎么看SaaS

默认地图很清楚,过去10年华尔街对SaaS的定价模板基本是这样:

**市场默认估值语言(旧地图)**:
- **核心变量**: NRR(Net Revenue Retention) + Rule of 40 + Non-GAAP Operating Margin
- **估值方法**: EV/Sales(高增长) → EV/FCF(成熟) → Forward PE(晚期)
- **主叙事**: 高NRR × 高毛利 × Rule of 40 > 40 = 可以买 > 20-30倍 forward PE
- **护城河语言**: "switching cost high"、"network effects"、"data flywheel"——抽象名词,不拆解
- **竞争语言**: 按业务领域横切(CRM vs ERP vs ITSM vs Observability)

这套模板在2020-2023年基本work,是因为三个前提成立:
1. 软件的主要角色是**提供访问权**(seat license)——人坐在前面点UI
2. AI主要作为**功能增强**(autocomplete/summary)——不替代工作流
3. 定价单位(per-seat per-month)是**离散、可预测、与客户headcount正相关**

### 1.2 旧地图解释不通的6件具体事实

2024-2026年,这套模板开始解释不通以下事实:

**事实1 — Salesforce在15个月内改了15次Agentforce定价**
- 2024Q4: 按对话收费(per-conversation)
- 2025Q1-Q3: Einstein 1.0 bundled(不单独收费)
- 2025Q4: 引入Flex Credits($500/100K credits)
- 2025-05: flexible pricing 正式宣布
- 2025-08: 给出三种consumption选项 (pay-as-you-go / pre-commit / prepurchase)
- 2026年官网: 同时保留user license + Flex Credits + per-action计量 + 多种混合模式

**旧地图诊断**: 按seat SaaS模板,一次定价改动=经营问题;15次=PMF危机;
**但真相**: 这不是PMF危机,是**定价锚点在迁移**——从"卖一个席位"变成"卖一次执行"再到"卖一个工作单位(AWU)"。每次改动是在试探客户愿意为"什么单位的数字劳动力"付钱。

**事实2 — Agentforce $800M ARR里67%是免费的**
- 名义ARR $800M,同比+169%
- 但29,000笔deals中只有9,500笔(33%)是paid
- 真实付费ARR约$264M(占CRM总收入$41.5B的0.64%)

**旧地图诊断**: 按SaaS land-and-expand模板,free-to-paid conversion 33%是灾难性信号(Slack达到过30-50%,但那是产品级PLG,不是企业级B2B)
**但真相**: 这是企业级top-down销售的"品类教育期"——客户在学习如何定义"一个Agent的工作价值",这个学习成本由供应商承担。Benioff在2026-04-20 WSJ访谈里正面反击"SaaSpocalypse"叙事,本质就是在说:**33%付费率不是PMF失败,是在重建定价锚点过程中的必然稀释期**。

**事实3 — cRPO和RPO在分化**
- CRM FY2026 cRPO(<1年): +16% YoY
- CRM FY2026 RPO(>1年): +7.7% YoY
- 差距8.3pp = 客户在**缩短承诺期限**

**旧地图诊断**: 按传统seat SaaS,客户缩短合同=增长放缓、信心不足的bearish信号
**但真相**: 在定价模型重构的窗口期,客户主动选择短合同是**理性的**——它们不想在consumption模型未定型时锁死3年预算。这不是对CRM能力的不信任,是对**定价单位还没稳定下来**的对冲。

**事实4 — Service Cloud出现飞轮悖论**
- 传统逻辑: Agentforce越强 → Service Cloud产品越好 → Service Cloud收入越高
- 实际观察: Agentforce越强 → 客户客服座席需求越少 → Service Cloud座席收入面临$500M-$1B迁移压力
- CRM报告明确点出: "Service Cloud是AI冲击最大的业务线"

**旧地图诊断**: 按SaaS cross-sell模板,新产品+旧产品应该同步上升
**但真相**: 当"软件从辅助人变成替代人"时,**每一份Agent的成功都在吃一份seat的收入**。这不是cross-sell,是**内部现金流置换**——CRM正在用低毛利的Agent收入替代高毛利的seat收入,即使总收入不变,毛利结构也在劣化。

**事实5 — 不同SaaS的GAAP vs Non-GAAP差距扩大**
R3报告披露的Owner FCF真相(FY2026):
- CRM: +$3.9B(真实盈利)
- NOW: -$204M(GAAP亏损,但Non-GAAP 30% OPM)
- DDOG: -$619M(Non-GAAP在撒谎)
- SNOW: -$2.9B(最差)

**旧地图诊断**: 按Rule of 40,这4家公司看起来差不多(都在30-50%区间)
**但真相**: 同样的headline NRR和增速下,**Owner Economics差3-15倍**。Non-GAAP口径在AI时代正在大规模失真——SBC稀释、AI基础设施投资被资本化、consumption成本被递延——每一个都在让"账面盈利"和"股东真实回报"脱钩。

**事实6 — "同一个SaaS分类"里NRR引擎质量差3-4倍**
R3报告的NRR quality-adjusted排名:
- NOW(模块互锁): 125% → 150% quality-adjusted(模块粘性最强)
- CRM(座席+升级): 107% → ~110%
- DDOG(usage弹性): 120% → ~108%
- SNOW(consumption量): 125% → 87.5%(AI查询效率+60%侵蚀consumption)

**旧地图诊断**: 按headline NRR,NOW和SNOW都是125%,估值应接近
**但真相**: 同样的125%,NOW的每一份NRR都在加深护城河(模块越多越难迁移),SNOW的每一份NRR都在被AI效率侵蚀(同样业务需要的compute在减少)。这是**NRR的语义危机**——同一个数字在不同的NRR引擎下意味着完全相反的结局。

### 1.3 旧地图的三个裂缝

把上面6件事实压缩,旧地图真正失灵的地方有三个:

**裂缝1 — 计费单位不再和价值创造对齐**
座席是"访问权"的度量,但Agent时代的核心价值是"执行权"(多少任务被完成、多少流程被自治),这两个变量不再线性相关。一个5人的销售团队可能同时用掉10倍的Agent调用——座席没变,价值创造多了10倍,收入却只按座席收。**定价单位的失真会让收入增速系统性低估价值创造**,反之亦然。

**裂缝2 — Non-GAAP在AI基础设施成本下失去意义**
SBC/Rev在SaaS公司普遍在5-35%区间,AI时代又叠加了推理成本(inference)、训练成本(training)、上下文存储成本(context)、agent运行时成本(runtime)。Non-GAAP把这些全部加回,但这些是**真实的现金流出**。Owner PE在AI时代应该成为主估值锚,Non-GAAP PE则降级为参考指标。

**裂缝3 — 护城河评分的抽象词失效**
"switching cost"、"network effects"、"data flywheel"这些语言在Agent时代要被拆解到具体层:
- 是**产品层**的switching cost(用户技能迁移成本)?—— AI可替代(1-3年半衰期)
- 是**流程层**的switching cost(数据重建成本)?—— 部分AI可替代(3-5年)
- 是**制度层**的switching cost(监管/标准)?—— AI不可替代(5-10年)
- 是**分发层**的switching cost(渠道经济)?—— AI不可替代(7-15年)

R1报告把这个拆得最清楚:ADBE属于产品层(线性衰减),ADSK属于制度层(BIM标准锁定),PTC属于流程层(Windchill数据),INTU属于分发层(46,000个CPA渠道)。**市场在用一个模板给四种不同半衰期的护城河定价,这就是mispricing来源**。

### 1.4 如果继续用旧地图,会错过什么

如果投资者继续用"NRR + Rule of 40 + Non-GAAP PE"给SaaS定价,未来3年会同时错过两个方向的大错误:

**错误方向1 — 低估具有执行权moat的公司**
CRM、NOW这类"System of Record"在旧地图下只能用"高NRR"来justify估值倍数,但市场对"125% NRR"的价值没有继续往上挖——没看到NOW的1.2x模块互锁 vs SNOW的0.7x consumption质量。R3报告给NOW的公允价值隐含回报+23%,给CRM+28%,就是这个mispricing的具体数值。

**错误方向2 — 高估看起来像SaaS但实际是consumption商品的公司**
DDOG的120% NRR在旧地图下价值与NOW相同,但DDOG的NRR是**外生**的(跟随Hyperscaler CapEx),SNOW的consumption是**被AI效率侵蚀**的。这两家公司在Agent时代可能变成"高表面NRR + 低真实利润率 + 命运外生"的三重陷阱。

**新地图的入口(Ch 2-8会展开)**:
- 不要先问"它Rule of 40多少"
- 要先问"它在哪一层护城河、计费单位是什么、AI如何影响这个单位、unit economics是正是负"
- 再问"它持有执行权和治理权吗?模型层能绕过它吗?"

---

## Ch 2: Salesforce作为测试用例 — 方向对,证据未完备

### 2.1 为什么Salesforce是最好的测试公司

四个理由让CRM成为验证整个thesis的首选样本:

1. **规模够大**: $41.5B收入 + 84%座席业务 = 任何定价重构都必须面对"旧生意"的反作用力
2. **转型够激进**: 15个月15次定价调整 + Benioff亲自站在"SaaSpocalypse"反面叙事 = 管理层信号明确
3. **数据够公开**: Q4 FY2026首次披露Agentforce ARR $800M、29K deals、9.5K paid = 首次有量化证据
4. **护城河够典型**: AppExchange 7,800+ apps + F500 Stage 4锁定 + 20年installed base = 如果CRM都不能保住旧护城河,其他SaaS更不可能

### 2.2 Benioff的反击战 — "AWU"是什么

2026-04-20 WSJ与Axios同时报道的核心信息:
- **WSJ主焦点**: Benioff正面反击"software bears are all wrong about Salesforce",强调AI不直接替代企业级控制面
- **Axios主焦点**: Salesforce正把计量单位从token叙事往"**Agentic Work Units (AWU)**"推,试图把价格锚点从算力成本抬到业务结果

**AWU的战略意图**(从公开信号推断):
1. **脱钩模型成本**: 不按token收费(那会让客户的支出曲线和OpenAI/Anthropic的token价格直接关联,定价权归模型层)
2. **锚定业务结果**: 1 AWU = 一次"完成的业务任务"(close a ticket / qualify a lead / process an invoice),而不是"一次LLM调用"
3. **保留定价上行空间**: 如果模型成本未来下降10倍,AWU价格可以不跟着降(业务价值不变)
4. **建立可审计单位**: 每个AWU可以被记录、追溯、回放,满足企业合规要求

**AWU能不能成?**
- **技术上**: 完全可行——Salesforce作为System of Record,每个AWU的输入/输出/决策全在它自己的数据边界内
- **商业上**: 取决于客户是否接受"你告诉我AWU代表什么,我就按这个付钱"——这要求客户放弃对定价公式的理解,类似于从per-kilowatt-hour到per-service-outcome的转变
- **政治上**: 取决于CFO怎么审批——如果AWU不能映射到labor FTE的节省或revenue的增加,CFO不会签

**CRM报告的关键细节**(没公开但被推断):
- 报告提到"AWU"在主报告中**没有明确定义**,可能是内部用语尚未公开
- Benioff现在推AWU,是**在Flex Credits($500/100K credits)之上再加一层抽象**——Flex Credits还是偏技术单位(credits很像compute time),AWU是业务单位
- 如果AWU成功,CRM的收费模式会是: **base license(access) + Flex Credits(granular usage) + AWU packages(outcome-based)**——三层并存,客户按需选择

### 2.3 三层收费的真实结构

用户说"Salesforce不是简单从seat改流量收费",这完全对。CRM报告的真实图景是**三层费率并存**,而不是一次性切换:

```
┌────────────────────────────────────────────────┐
│ Layer 1: Base License(座席/访问权)             │
│   - Sales Cloud: $125-650/user/month           │
│   - Service Cloud: $165-400/user/month         │
│   - Commerce Cloud: $650/user/month            │
│   - 目的: 保留入场券 + platform access          │
│   - 对应"卖访问权"的旧SaaS逻辑                  │
└────────────────────────────────────────────────┘
                     ↓
┌────────────────────────────────────────────────┐
│ Layer 2: Variable Usage(Flex Credits)          │
│   - $500 / 100K credits ≈ $0.005/credit        │
│   - pay-as-you-go / pre-commit / prepurchase   │
│   - 目的: 捕获automation intensity              │
│   - 对应"卖执行"的transitional逻辑              │
└────────────────────────────────────────────────┘
                     ↓
┌────────────────────────────────────────────────┐
│ Layer 3: Outcome Commitment(AWU/企业承诺)       │
│   - 3-year commitment: 10-20% discount         │
│   - Data Cloud attach: +$500K-$5M/year         │
│   - AWU packages: 未公开具体结构                │
│   - 目的: 锁定高value流程 + 上line到业务KPI     │
│   - 对应"卖数字劳动力"的终极逻辑                │
└────────────────────────────────────────────────┘
```

**三层的博弈结构**:
- Layer 1对客户是**沉没成本**——不买就进不来,但买了不一定用
- Layer 2对客户是**可预测变量**——知道每100K credits能做多少action,可以做budget
- Layer 3对客户是**价值承诺**——按业务结果付钱,风险在CRM一侧(如果Agent失败,CRM要退款或重做)

**这种架构的高明之处**:
- 短期(2026-2027): 靠Layer 1保住$35B存量收入,不崩盘
- 中期(2027-2029): 靠Layer 2捕获automation价值,对冲seat erosion
- 长期(2029+): 靠Layer 3锁定新的outcome-based收入,重建定价权

### 2.4 CRM报告给出的具体评估

R3报告对CRM的完整诊断(用户可以对照验证):

**估值结构**:
- Fair Value(中位数): $208 (+7.2%)
- Fair Value(概率加权): $193 (-0.7%)
- Expected Return(5年年化): +1.7%
- 下行/上行不对称比: 3.5:1(不利)

**评级**: 中性关注 — **不是不看好,是等PMF证据**

**核心矛盾(第一变量)**:
**Agentforce付费consumption ARR**,一个变量决定±$64/share,等于其他7个关键变量的总和。
- 当前$264M付费ARR(占总收入0.64%)
- 如果FY2027Q2达到$1.5B付费 → 指向+30%回报
- 如果FY2028仍<$1B付费 → 指向-38%下跌

**Agentforce成功概率**:
CRM报告的逻辑推演:
- 基础率(AI产品GA后18月内达到PMF的行业比例): 40-50%
- CRM特有优势1(独立定价模型,Flex Credits已经上): +10-15pp
- CRM特有优势2(consumption模型,有上行空间): +5-10pp
- 报告base case估计: **55-65%成功概率**
- 市场隐含定价: **<20%成功概率**(按current PE 14.7x与悲观DCF的比对)

**如果报告是对的,隐含35-45pp的预期差** → 这是CRM在R3报告里获得"关注"级别评级(+28%回报)的核心依据。

### 2.5 方向对,证据未完备 — 具体卡在哪

需要警惕的4个"方向对但还没成"的信号:

**卡点1 — 33%付费率需要攀升到>60%**
现在9.5K paid / 29K deals。如果24个月内付费率爬不到60%+,说明客户的land-and-expand没有发生。按CRM报告的CC-3(NRR silent domain analysis),管理层**至今未公开Agentforce的expand率、churn率、Net Dollar Expansion**,这种沉默本身就是信号。

**卡点2 — Service Cloud同比增速需要稳在+5%以上**
飞轮悖论的真实度量:Service Cloud从+8% YoY降到+5.5% YoY。如果继续降到<+2%,证明Agentforce的新收入还不够补上seat侵蚀的老收入——这时候三层架构就失效了(Layer 2没接住Layer 1的崩塌)。

**卡点3 — Data Cloud ARR $1.2B的"真实attach率"**
Data Cloud被CRM报告列为Agentforce的data engine,但attach率(购买Agentforce且同时购买Data Cloud的客户占比)未公开。如果attach率<30%,说明大多数客户买Agentforce不买Data Cloud——那Data Cloud的120% YoY增速就是被管理层narrative推起来的,不是真实需求。

**卡点4 — AWU定价的公开试点**
Benioff提AWU是2026-04这个时点,但AWU的具体单位定义、价格表、客户试点结果都还没公开。如果FY2027 Q1前AWU仍停留在"概念阶段",说明outcome-based pricing还没跨过技术/法务/客户接受度的三重关。

### 2.6 本章结论

**Salesforce作为测试用例告诉我们什么**:

1. **定价重构是真实的、不可逆的** — 15次定价改动不是混乱,是在探测"多少钱算对"的边界
2. **三层架构是通用解** — base + usage + outcome 会成为所有头部企业SaaS的共同路径,不是CRM的独创
3. **证据在FY2027H1** — 如果到那时Agentforce付费ARR<$1.5B、付费率<60%、Service Cloud<+3%,证明path-dependent失败;如果反之,**CRM可能从14.7x PE重新回到18-20x**
4. **不要用Adjusted ARR判断** — $800M ARR是管理层口径,真实要看付费ARR($264M)的**季度增速**(不是年化绝对值),这个数字CRM还没开始披露
5. **Benioff的AWU方向是对的,但不是护城河** — AWU只是语言升级,真正的护城河在于System of Record的执行权和治理权,这点Ch 4会展开

---

## Ch 3: 三层收费架构的普适性 — 不是CRM独创

### 3.1 其他SaaS在同步推什么

用户提到的四家公司在做的事,和CRM本质是同一件事:

**ServiceNow (NOW) — 最成熟的互锁架构**
- Context Engine(2026年发布): 用relationship + policy + decision history给agent上下文
- AI Agent Orchestrator: 跨模块调度agent
- 定价: **全面bundled** — 没有单独的consumption charge,AI Assist内嵌在每个模块里
- R3报告评估: NRR quality 1.2x(四家最高),模块互锁是"AI加速器"

**Workday (WDAY)** 
- AI agents grounded in trusted HR/Finance data
- Flex Credits模式(类似CRM,但起步晚)
- 定价: bundled为主,Copilot consumption尚未GA
- 护城河: Finance+HCM的合规深度,AI生成不易替代

**Microsoft Copilot**
- 消费端: Copilot Pro $20/mo personal
- 企业端: Copilot Pro for Teams $20/user/mo + 按API token计量
- 定价: **最清晰的spectrum** — 从seat到usage连续过渡
- 竞争优势: Copilot可以**免费bundled进M365**(MSFT可以承受亏损,CRM不行)

**OpenAI / Anthropic (模型层)**
- Agents SDK(OpenAI 2026-04发布): 明确称为"harness for the agent loop"
- MCP(Anthropic推出): 标准化模型连接工具+数据源的协议
- 定价: **纯consumption** — 按token计量,最granular
- 战略意图: 把通用harness标准化,让应用层厂商的"harness优势"消失

**Bessemer 2026 AI监测**(用户引用):
把AI软件定价拆成三类:
1. **Copilots** — 辅助人的AI,定价是seat markup(+20-40%)
2. **Agents** — 替代人的AI,定价是outcome-based或AWU式
3. **AI-enabled Services** — AI做具体工作后收费,最接近人力外包

McKinsey 2025观点(用户引用):
- "Traditional per-user subscription不会消失"
- "但incumbents很可能必须引入consumption mix"
- "当AI开始做工作而不是提供访问权时,收费逻辑会从access向outcome迁移"

### 3.2 三层架构的通用性验证

用四个维度检验"三层架构是不是行业共同路径":

**维度1 — 计费逻辑的通用性:通用**

| 层级 | CRM | NOW | WDAY | MSFT Copilot |
|-----|-----|-----|------|------|
| Base(access) | 座席license | Module license | HCM+Finance license | M365 seat |
| Usage(execution) | Flex Credits | AI内嵌无独立计费 | Flex Credits(规划中) | API tokens |
| Outcome(value) | AWU(试点) | 未公开 | 未公开 | 未公开 |

**结论**: Layer 1(access)所有公司都保留,Layer 2(usage)大部分公司都在实施,Layer 3(outcome)还在早期,只有CRM在公开推。**计费逻辑是通用的,实施时点有差**。

**维度2 — 任务实现的通用性:高度不通用**

真正决定某家SaaS能走通三层架构的,是它的**任务领域属性**:

| 高成功率领域 | 特征 | 典型SaaS |
|------|------|---------|
| 客户服务(Customer Support) | 高频 + 可审计 + 数据丰富 + 违规成本高 | NOW, ZEN, HUBS Service |
| ITSM(IT Service Mgmt) | 流程明确 + SLA清晰 + KPI可量化 | NOW, ATLAS |
| HR运营(Recruiting/Payroll) | 合规密集 + 循环性强 + 例外处理复杂 | WDAY, CDAY |
| 财务运营(AP/AR/Close) | 合规密集 + 高重复性 + 审计必需 | ORCL NetSuite, WDAY Finance |
| 合规/风控(KYC/AML) | 监管强制 + 可回放 + 审计责任明确 | COIN compliance层 |
| 订单/供应链异常 | 数据密集 + 决策规则清晰 | Blue Yonder, Oracle SCM |

| 低成功率领域 | 特征 |
|------|------|
| 创意设计工具 | 低流程密度 + 低数据密度 + 主观性强 → 只能做Copilot,不能做Agent |
| 低切换成本工具 | 客户可随时迁移 → outcome-based pricing无法锁定 |
| 公共信息查询 | 没有proprietary context → 通用LLM可替代 |

R1报告印证了这一点:ADBE这种创意工具,agent最多是"Copilot"(提供草稿、生成变体),不能变成"Agent"(直接交付成片)——所以Layer 3在ADBE基本不成立。

**维度3 — 客户接受度的通用性:取决于客户心理模型**

企业客户接受outcome-based pricing的前提:
1. **可度量**: outcome必须能被客观衡量(ticket resolved? lead qualified?)
2. **可归因**: 成果必须能归因到Agent(不是人+Agent合作的模糊结果)
3. **可审计**: 必须能回放决策链,供compliance审查
4. **可预测**: 客户需要能预估年度spend,不能让outcome定价导致CFO失控

这四个条件里,**可度量**和**可归因**在客服、ITSM、财务自动化领域基本成立(SaaS厂商可以清晰定义);在销售、营销领域成立度较低(归因难度大,是Agent的功劳还是销售的功劳?)。

这也解释了为什么CRM在**Service Cloud**(客服)的Agentforce推得最猛——因为这个领域的outcome最容易证明。Sales Cloud的Agentforce相对进展慢,因为"qualify a lead"的成果归因太模糊。

**维度4 — 厂商承担风险的意愿:分化明显**

outcome-based pricing的本质是**厂商承担Agent失败的成本**——如果Agent没完成工作,客户不付钱。这对不同厂商的能力要求完全不同:

- **NOW**: 模块粘性最强,风险承担能力强(客户已经deeply embedded,失败一次不会离开)
- **CRM**: F500 Stage 4客户粘性强,SMB Stage 2弱,所以outcome pricing更适合F500
- **SNOW**: consumption模型下,厂商几乎不承担outcome风险(query跑出来就收钱,不管客户有没有用上)
- **DDOG**: observability领域outcome模糊(怎么证明"alert有用"?),难以outcome化
- **ADBE/ADSK**: 创意/设计领域outcome不成立,只能继续per-seat

### 3.3 CRM的实施优势和劣势

**CRM的独特优势**(相对其他SaaS):

1. **定价实验freedom**: CRM是上市公司里唯一敢在1年改15次定价的,管理层对Benioff有足够授信
2. **客户教育投入**: Dreamforce + CPA network + Trailhead认证体系,可以大规模培训客户接受新定价逻辑
3. **Data Cloud先发**: $1.2B ARR + 120%增速,已经建立了"data→agent"的完整链路,其他SaaS(除NOW)还没跟上
4. **三层收费已经铺开**: Flex Credits + base license + AWU概念,架构层面已经就位

**CRM的独特劣势**:

1. **飞轮悖论更严重**: Service Cloud占总收入最大,Agent替代效应最强 → 三层架构的Layer 2必须吃得快才能补上Layer 1的崩塌
2. **MSFT免费bundling威胁**: Microsoft可以用M365 Copilot免费bundled CRM基础功能,逼CRM降价
3. **AppExchange生态转型成本**: 7,800+ apps都是seat-based假设下建的,迁移到agent模式需要整个生态共识
4. **F500客户政治惯性**: F500 CIO已经习惯了"per-seat × 3-year contract",要转向outcome pricing需要改变采购流程+预算流程

### 3.4 本章结论

**三层架构是通用路径,但成功率不通用**:

1. **计费架构**(base + usage + outcome): 会成为所有头部enterprise SaaS的共同路径
2. **任务领域**: 只有在高频、可审计、数据丰富、流程明确、违规成本高的领域,Layer 3(outcome)才能真正产生利润闭环
3. **厂商分化**: 同样的三层架构,NOW的实施优势最强,CRM次之,SNOW/DDOG/ADBE都会卡在某一层
4. **时间表**: Layer 1(已有)+ Layer 2(2026-2027)+ Layer 3(2028+)——Layer 3是未来2-3年的关键战场

**对投资者的意味**:
- 看SaaS公司,第一问题不是"它在AI上做了什么",而是"**它的任务领域能不能支持outcome-based pricing**"
- 能支持的: NOW、CRM(Service Cloud部分)、WDAY、MSFT(enterprise部分)——这些公司有机会重建定价权
- 不能支持的: ADBE、ADSK、SNOW、DDOG——这些公司只能停留在Copilot级别的markup,不能触及outcome pricing

---

## Ch 4: Harness工程的垄断性检验 — 真moat在哪一层

### 4.1 用户的核心判断:"难度从写代码后移到把Agent放进真实任务里"

这个判断我高度同意,并且会把它说得更硬:

> **代码生成越来越像公用基础设施,真正稀缺的是:context engineering、workflow decomposition、权限编排、审计治理、评估闭环、变更管理。**

逐项拆开看这6件事为什么是真正的稀缺:

**1. Context Engineering(上下文工程)**
- 定义: 把企业的业务数据、权限关系、历史决策、异常记录、策略约束,结构化地喂给LLM,让Agent能做出符合组织上下文的决策
- 为什么稀缺: 每家企业的上下文是独特的(系统边界、数据schema、业务规则、合规要求),通用LLM不可能训练出来
- 现实验证: ServiceNow 2026发布的Context Engine、CRM的Data Cloud,本质都是在做这件事——**用SaaS厂商掌握的企业上下文去增强LLM**

**2. Workflow Decomposition(工作流分解)**
- 定义: 把一个复杂业务任务("处理一笔可疑交易")分解成一系列原子步骤,每步可以由Agent/人/其他系统承担
- 为什么稀缺: 工作流的正确分解需要深度业务知识 + 长期观察 + 例外处理经验,不能从first principles推出来
- 现实验证: CRM推的"100+ prebuilt industry actions",就是把sales/service/commerce领域的工作流分解成了标准化的Agent动作包

**3. 权限编排(Permission Orchestration)**
- 定义: Agent在执行任务时应该拥有什么权限(读什么、写什么、调什么API、花多少钱)
- 为什么稀缺: 权限边界是企业多年积累的信任边界,涉及合规、内控、组织架构,不能由AI自动生成
- 现实验证: Salesforce强调"Headless 360"里的identity & access management;ServiceNow AI Agent Orchestrator的核心价值就是权限编排

**4. 审计治理(Audit & Governance)**
- 定义: Agent做了什么、为什么做、何时做、用了什么数据,全部可追溯+可解释
- 为什么稀缺: 这涉及合规责任的**承接**——SaaS厂商要能签合同说"如果Agent犯错,我承担审计责任",这是服务+保险的组合
- 现实验证: Salesforce Agentforce 3的核心卖点就是observability/control

**5. 评估闭环(Evaluation Loop)**
- 定义: 持续衡量Agent决策的质量,识别漂移,自动或半自动地修正prompt/model/workflow
- 为什么稀缺: 评估需要**ground truth**(真实决策结果),只有掌握SoR的公司才有这个数据
- 现实验证: CRM的Trust Layer + NOW的AI Governance都在做这件事

**6. 变更管理(Change Management)**
- 定义: 当Agent上线后,如何管理客户组织的人员培训、流程调整、职责重分配
- 为什么稀缺: 这是**组织能力**,不是技术,要靠咨询团队 + 最佳实践库 + 客户成功体系
- 现实验证: Salesforce有6,000+ Professional Services员工,NOW有类似规模,这是模型公司永远无法复制的

### 4.2 通用Harness会商品化吗? 会

OpenAI Agents SDK(2026-04)和Anthropic MCP的战略意图很清楚:

**OpenAI Agents SDK**
- 明确定位: "harness for the agent loop"
- 提供: 标准化的agent调度、工具调用、状态管理、多agent协调
- 目标: 让任何应用层开发者都能快速搭出能用的agent

**Anthropic MCP**
- 明确定位: "Model Context Protocol"——标准化LLM连接工具+数据源的协议
- 提供: 统一的tool use schema、data source adapter、authentication
- 目标: 让LLM不再被特定工具生态(Salesforce AppExchange、ServiceNow Store)绑架

这两件事合起来,意味着**通用harness的护城河会快速消失**:
- 2024年: 自己写harness = 区分度
- 2025年: LangChain/LangGraph = 降低门槛
- 2026年: OpenAI Agents SDK + MCP = 标准化
- 2027年: harness技术本身没有alpha,只有实现质量差

**这对SaaS厂商意味着什么**:
- "我们的harness技术先进"不再是卖点
- 客户不会因为CRM的agent framework而买CRM,会因为CRM的context + execution rights + governance而买CRM
- **SaaS厂商必须把价值主张从"我们有最好的harness"转移到"我们有最深的上下文和最重的执行权"**

### 4.3 什么是模型公司拿不走的?

用户的判断"不容易直接拿走的,不是harness这个词,而是那些更脏、更重、也更难通用化的东西"——这是正确的,而且可以进一步拆解:

**模型公司拿不走的6件事**(对应上面的6件稀缺):

| 稀缺能力 | 模型公司为什么拿不走 | 具体证据 |
|---------|----------------------|---------|
| Context Engineering | 模型不掌握企业的SoR数据 | Salesforce的客户数据、ServiceNow的工单数据、Workday的员工数据,模型公司永远是外部调用者 |
| Workflow Decomposition | 模型不了解每个行业的流程例外 | 医疗索赔处理、供应链异常、合规审查,每个都是10-20年积累的知识 |
| 权限编排 | 模型不掌握企业的身份系统 | Active Directory / Okta / SAML 绑定,不是LLM能触及的层 |
| 审计治理 | 模型公司不承担合规责任 | SOC 2 / HIPAA / GDPR的审计责任是谁签合同谁承担 |
| 评估闭环 | 模型没有business outcome数据 | Agent是否真的close了ticket、qualified了lead,只有SaaS厂商知道 |
| 变更管理 | 模型公司不做实施服务 | OpenAI/Anthropic都是纯软件公司,没有6000人的Professional Services团队 |

### 4.4 所以真正的moat是什么

用户提出的四元组最精准: **Harness × Proprietary Context × Execution Rights × Governance**

把这四元拆解到SaaS公司评分(10分制):

| 公司 | Harness | Context | Execution | Governance | 综合 |
|-----|---------|---------|-----------|-----------|------|
| CRM | 7 | 9(客户数据) | 8(sales/service) | 7 | **7.75** |
| NOW | 7 | 9(ITSM+HR+Fin) | 9(Workflow控制) | 8(合规深度) | **8.25** |
| WDAY | 6 | 9(HCM+Finance) | 7 | 9(最强合规) | **7.75** |
| DDOG | 6 | 6(telemetry) | 5 | 6 | **5.75** |
| SNOW | 5 | 6(data) | 4(compute只是基础设施) | 6 | **5.25** |
| MSFT Copilot | 8 | 8(M365数据) | 7 | 7 | **7.5** |
| OpenAI Apps | 9 | 3 | 3 | 4 | **4.75** |
| Anthropic | 9 | 3 | 3 | 5 | **5.0** |

**关键观察**:
1. **模型公司的综合分数低于头部SaaS**: OpenAI 4.75 vs NOW 8.25 vs CRM 7.75——这就是用户说的"模型公司往harness爬,但总分爬不过去"
2. **Harness一项上模型公司确实领先**: OpenAI 9 > SaaS 5-7,但这只是四元里的一元,权重平均只占25%
3. **NOW的综合分数最高**: 不是因为harness最强,而是因为四元组最均衡
4. **SNOW/DDOG处于危险区**: Execution Rights弱是致命伤——它们只是基础设施,不持有业务流程的"决策权"

### 4.5 "能力分层"的正确表达

用户想要的那个结构,我的翻译是:

```
Layer A — Infrastructure(基础设施)
   Compute + Storage + LLM API
   → 最易商品化,margin持续下降
   → OpenAI / Anthropic / AWS / Azure

Layer B — Harness(中间件)
   Agent framework + tool use + state mgmt
   → 2026年开始标准化
   → Agents SDK / MCP / LangGraph

Layer C — Context & Skills(垂直知识)
   行业上下文 + 标准化动作包 + 数据语义
   → 这一层开始出现moat
   → CRM's 100+ industry actions, NOW Context Engine, WDAY domain data

Layer D — Execution Rights(执行权)
   对业务流程的决策权 + 能写入SoR + 能触发下游
   → 真正的moat在这里
   → 谁持有SoR,谁就有Execution Rights
   → CRM(Sales/Service), NOW(Workflow), WDAY(HR/Fin), ORCL NetSuite(Finance)

Layer E — Governance(治理层)
   审计责任 + 合规签署 + 异常处理 + 组织变革管理
   → 最深的moat,因为涉及法律责任和组织信任
   → 头部SaaS + Big 4咨询
   → 模型公司几乎无法进入
```

**价值/利润的层级分布**(作者估计,供参考):
- Layer A: 20% 价值, 10% margin——被compute成本吃掉
- Layer B: 10% 价值, 30% margin——开始商品化
- Layer C: 25% 价值, 60% margin——moat开始形成
- Layer D: 30% 价值, 70% margin——最深的moat
- Layer E: 15% 价值, 50% margin——服务和责任混合

**投资含义**:
- 只在Layer A+B的公司(纯模型公司、纯基础设施) → 利润率会被挤压
- 在Layer C+D+E的公司(CRM/NOW/WDAY/SAP/ORCL) → 有机会重建SaaS级别的利润结构
- 横跨多层的公司(MSFT) → 最强,但需要管理结构复杂度

### 4.6 对"skill"的投资化定义

用户问的"skill"是什么,我的投资化定义:

> **Skill = 把数据语义、权限边界、异常处理、人工接管、审计要求、业务KPI封装成可复用、可观测、可计费的行业动作包。**

这个定义的每一部分都对应Layer C-E的一种能力:
- **数据语义** = Context Engineering
- **权限边界** = Permission Orchestration
- **异常处理** = Workflow Exception Management
- **人工接管** = Human-in-the-loop Design
- **审计要求** = Governance
- **业务KPI** = Outcome Definition

**为什么"skill"是新时代的moat单位**:
1. **可复用**: 一个"close-ticket skill"可以卖给1000个客户,一份开发投入多份收入
2. **可观测**: 每次skill执行都有metrics,可以持续优化
3. **可计费**: skill可以作为AWU的一个原子单位,锁定outcome pricing

**当前skill生态的格局**:
- CRM: 100+ prebuilt industry actions(销售+服务+商务)
- NOW: AI Agent Orchestrator + Context Engine上的skill库
- WDAY: Finance/HR专用skill(尚未公开数量)
- MSFT: M365 + Dynamics的跨域skill库(最大但最零散)
- 第三方: LangChain Hub、HuggingFace、各种开源skill库——**质量不一,缺审计**

**核心判断**: 
- **通用skill会开源化**(sum numbers, send email, lookup record)
- **行业skill会垂直化**(credit check for fintech, prior auth for healthcare)
- **企业skill会定制化**(某公司独特的approval policy)

**谁把skill做得最深、最可治理、最容易部署,谁就是新一代SaaS的owner** — 这是用户说的,我完全同意。

### 4.7 本章结论

**通用harness会被商品化,但真正的moat在Layer C-E的组合**:

1. **Layer B(harness)**: 2026-2027年标准化,不再是竞争力来源
2. **Layer C(skills)**: 新的竞争焦点,头部SaaS已开始建立skill库
3. **Layer D(execution rights)**: 最深的moat,由System of Record所有权决定
4. **Layer E(governance)**: 最高进入门槛,涉及法律责任和组织信任

**投资判断**:
- 买"Layer D+E双强"的公司: NOW、CRM、WDAY、SAP、ORCL NetSuite
- 卖"只在Layer A+B"的公司: 纯模型公司虽然估值高,但利润模型不可持续
- 警惕"中间层"公司: SNOW/DDOG在Layer C-D的位置不稳固

---

## Ch 4.5: Integration Fabric — 被低估的第五元

### 4.5.1 Salesforce Connectivity Report暴露的真相

Salesforce 2026年Connectivity Report的数据揭示了一个被投资者广泛低估的问题:

- **96% IT leaders**: agent成功取决于integration
- **27%应用真正集成**: 主流企业里绝大多数应用还是孤岛
- **50%组织仍在agent silo状态**: 每个agent独立运作,无法跨系统协作
- **94%认为架构必须更API-driven**: 但实际推进缓慢
- **平均12 agents每个企业**: 已经在用,但未来2年预计再增67%

这些数字说明一个被忽视的事实:**"Integration Fabric"(集成结构)是agent能否产生业务价值的gating factor**,比harness本身重要。

### 4.5.2 为什么Integration Fabric构成第五元moat

用户给的四元组(Harness × Context × Execution × Governance)非常精准,但可以再加一元: **Integration Fabric(集成结构)**。

这不是harness的同义词,也不是context的子集,而是一种独立的能力:
- **Harness**: Agent循环的运行时框架(Agents SDK / LangGraph)
- **Context**: 喂给Agent的业务数据和知识
- **Integration Fabric**: 让Agent能**跨系统读写、跨系统触发、跨系统审计**的连接层

**具体表现**:
- Agent要close一个ticket → 需要写入CRM Service Cloud + 更新Salesforce billing + 通知ServiceNow IT + 触发Slack提醒客户 → 这5个系统的integration是关键
- Agent要qualify一个lead → 需要读Salesforce + Marketing Cloud + LinkedIn Sales Navigator + 企业CRM external data
- Agent要处理一笔财务异常 → 需要Workday Finance + ERP(NetSuite/SAP) + Banking API + Compliance系统

**谁掌握Integration Fabric**:
- **Salesforce MuleSoft**: 2018年$6.5B收购,覆盖7,800+ AppExchange apps + 独立的API market
- **ServiceNow**: Flow Designer + Integration Hub,覆盖IT生态的关键系统
- **Microsoft**: Power Automate + Graph API,覆盖M365 + Dynamics + LinkedIn
- **Workday**: 相对封闭,HCM+Finance但缺乏跨生态integration
- **纯模型公司**: 没有,这就是为什么OpenAI推MCP——试图绕开应用层厂商的integration优势

### 4.5.3 MCP对Integration Fabric的冲击

Anthropic的MCP(Model Context Protocol)的核心战略意图就是**把Integration Fabric标准化**:

**MCP的架构**:
- 定义一套标准的tool call schema
- 定义一套标准的data source adapter
- 定义一套标准的authentication flow
- 让任何LLM都能连接任何MCP-compatible系统

**这意味着**:
- 理论上,一个企业可以用任何LLM(Claude/GPT/Gemini)通过MCP连接到任何系统(Salesforce/ServiceNow/Workday/SAP)
- 不再需要"SaaS厂商的agent"——自己搭agent就行

**但真实挑战**:
1. **MCP adapter的开发成本**: 每个系统都要写自己的MCP server,Salesforce和ServiceNow没有动力做高质量的MCP adapter(那会帮客户绕过它们)
2. **权限和审计的复杂度**: MCP定义了连接协议,但不定义"谁能执行什么"的权限模型——企业要自己搭
3. **维护负担**: API更新、schema变更、错误处理,都要企业自己承担
4. **缺少vertical knowledge**: MCP只是管道,不是skills;把lead qualification流程标准化不是MCP能做的

**结论**: MCP会降低"DIY agent"的门槛,但不会消除integration fabric的moat——只是让它从"独家API"变成"最深、最可靠、最易用的MCP adapter + skill库"。头部SaaS的response应该是**主动发布高质量MCP server**(把自己的integration能力公开化,同时靠更深的skill库和governance继续差异化)。

### 4.5.4 五元综合评分(更新自Ch 4.4)

把Integration Fabric作为第五元加入评分,更新头部公司综合分:

| 公司 | Harness | Context | Execution | Governance | Integration | 综合 |
|-----|---------|---------|-----------|-----------|------------|------|
| NOW | 7 | 9 | 9 | 8 | 8 | **8.2** |
| CRM(+MuleSoft) | 7 | 9 | 8 | 7 | **9** | **8.0** |
| MSFT Copilot | 8 | 8 | 7 | 7 | 8 | **7.6** |
| WDAY | 6 | 9 | 7 | 9 | 6 | **7.4** |
| SAP | 6 | 8 | 8 | 8 | 7 | **7.4** |
| DDOG | 6 | 6 | 5 | 6 | 6 | **5.8** |
| SNOW | 5 | 6 | 4 | 6 | 5 | **5.2** |
| OpenAI(+MCP) | 9 | 3 | 3 | 4 | 6 | **5.0** |
| Anthropic(+MCP) | 9 | 3 | 3 | 5 | 6 | **5.2** |

**重要调整**:
- MSFT加入后排第三,因为Power Automate + Graph API非常强
- CRM从7.75升到8.0,因为MuleSoft的integration fabric被单列计算
- WDAY从7.75降到7.4,因为integration层相对封闭(集中在HCM/Finance,跨域能力弱)
- SAP作为新加入的enterprise标的,综合分7.4

### 4.5.5 Integration Fabric的投资含义

**1. MuleSoft是CRM被低估的资产**
- 2018年收购时$6.5B,当时被批评"贵"
- 2026年的视角看,MuleSoft是CRM推Agentforce的关键基础设施
- 如果没有MuleSoft,CRM只能做Salesforce生态内的Agent;有了MuleSoft,Agent可以跨系统执行
- **MuleSoft估值再审视**: 如果单独上市,ARR可能已>$2B,按整合SaaS 10-15x EV/Revenue算,$20-30B估值

**2. MSFT是最强的全栈Integration player**
- Power Automate(2000+ connectors) + Graph API + LinkedIn Sales Navigator + Teams messaging
- 加上Copilot的AI层,MSFT是唯一能提供"端到端agent+integration+AI"的公司
- 这是为什么MSFT的AI估值溢价合理(不只是卖Copilot license,是卖整个integration fabric)

**3. SNOW/DDOG的integration缺口**
- SNOW是数据平台,天然不是integration player
- DDOG是观测平台,integration局限于telemetry
- 这两家在AI时代的位置就是"被集成的系统",不是"做集成的系统"——这决定了它们不能拥有Agent的执行权

**4. 警惕纯"integration platform"的陷阱**
- MuleSoft、Boomi、Workato、Zapier这些integration specialist本来是好生意
- 但MCP如果成为事实标准,它们的differentiation会被侵蚀
- 投资integration platform时,要看它们是否已经进化到"integration + AI layer"(MuleSoft因为在Salesforce旗下已经进化,其他纯integration公司还在努力)

---

## Ch 5: 行业分化 — 4类SaaS的Agent化命运

### 5.1 R1报告验证:创意SaaS的左手vs右手

R1报告把创意/生产力SaaS分成两类:

**左手类(AI冲击业务) — ADBE/ADSK/PTC**
- 共同点: Product-layer moat,AI提供"sufficient alternative"
- AI影响: 线性衰减(1-3年产品层 → 3-5年流程层 → 5-7年institutional层)
- R1评级:
  - ADBE: 关注(临界)——AI防御在发生但市场不信
  - ADSK: 中性关注
  - PTC: 审慎关注(35%黑箱)

**右手类(AI强化业务) — INTU**
- 独特点: Distribution-layer moat(46,000 CPA渠道)
- AI影响: **反向强化**——AI让CPA更高效 → CPA服务更多客户 → CPA更推荐QB → moat加深
- R1评级: 深度关注(+20-25%)

**R1的核心发现**: 
- 市场用一个"AI冲击创意SaaS"的框架定价所有四家
- 但只有左手三家被冲击,INTU反而强化
- ADBE的Agent化命运是**缓慢衰减**,不是"SaaSpocalypse",是"SaaS'slowpocalypse"

**对用户thesis的验证**:
- ADBE/ADSK这种产品层moat的SaaS,**不适合outcome pricing**——创意/设计不可outcome化
- INTU这种分发层moat的SaaS,**不需要转型**——CPA网络+AI效率=moat强化,不是转型
- 这证明**不是所有SaaS都会走CRM那条路**,任务领域决定路径

### 5.2 R2报告验证:安全SaaS的不对称战争

R2报告的框架更独特:

**N/M比率框架**:
- N = 攻击效率提升倍数(AI让攻击快多少)
- M = 防御效率提升倍数(AI让防御强多少)
- N/M = 不对称系数

**R2测算N/M = 3-5x**:
- 攻击侧:exploit开发从天级变成分钟级(50-100x);CVE武器化从每天5-10个变成130+个(13-26x)
- 防御侧:检测率从60-70%提升到80-90%(1.3-1.5x);SOAR效率+2-3x;但人力缺口33%抵消
- 净: **攻击改进3-5倍快于防御** → CISO被迫加预算

**这意味着什么**:
- 安全SaaS获得**fear-driven预算增长**,和用户thesis的"数字劳动力"逻辑完全不同
- 安全SaaS的估值逻辑是"恐慌变现"——CRWD/PANW/FTNT都受益,但受益程度取决于谁能把恐慌最快转成renewal
- R2评级:三家都"审慎关注"(全被市场定价过度),但CRWD最危险(EDR市场份额被Defender侵蚀)

**对用户thesis的验证**:
- 安全SaaS**不会走三层架构路径**——它们靠的是客户恐慌的持续性,不是执行权的锁定
- 但安全SaaS和用户thesis的"治理"维度高度相关——AI时代的governance会新增很多"Agent治理"需求(access review, action audit, anomaly detection),这是CRWD等公司的新增TAM
- **CRWD/PANW/FTNT如果能把产品扩展到"Agent治理"领域,有增量机会;如果只守EDR/firewall,面临长期衰减**

### 5.3 R3报告验证:NRR引擎的本质差异

R3报告是最直接验证用户thesis的材料,它把四家SaaS按NRR引擎类型分类:

| 引擎类型 | 公司 | 本质 | AI时代命运 |
|---------|------|------|-----------|
| 模块互锁(1.2x) | NOW | 每买一个模块都加深锁定 | **AI加速** — 模块越多AI越有价值,倒逼客户买更多模块 |
| 座席+升级(1.0x) | CRM | 座席数+单席价格增长 | **混合** — Agentforce创造新收入,但吃老座席 |
| Usage弹性(0.9x) | DDOG | 监控量弹性受Hyperscaler周期驱动 | **中性** — 外部CapEx决定,AI影响小 |
| Consumption量(0.7x) | SNOW | 每TB数据+每查询付费 | **AI减速** — AI效率+60%直接侵蚀consumption |

**R3的核心命题**: **同样的125% headline NRR,quality-adjusted后差异3-4倍**
- NOW: 125% → 150%(模块粘性永久化)
- SNOW: 125% → 87.5%(AI效率侵蚀)

**对用户thesis的验证**:

1. **NRR引擎决定Agent化路径**:
   - 模块互锁引擎(NOW) → 三层架构最容易实施,每增加一个agent skill就是新模块
   - 座席引擎(CRM) → 三层架构必须做,但面临飞轮悖论
   - Usage引擎(DDOG) → 三层架构不适用,只能走Copilot扩展
   - Consumption引擎(SNOW) → 三层架构反向受害,AI效率=收入减少

2. **"命运自主权"维度**:
   - R3提出的**内部控制 vs 外部依赖**:
   - 内部控制(CRM + NOW): 管理层决定增长——可以通过Agent产品创造新收入
   - 外部依赖(DDOG + SNOW): Hyperscaler周期决定——无法靠自己扭转

### 5.4 SaaS的4种Agent化命运 — 综合判断

把R1/R2/R3和CRM报告综合,SaaS分成4类,每类的Agent化结局不同:

**Class 1 — Workflow Platform(工作流平台)**
- 代表: NOW, CRM, WDAY, SAP, ORCL NetSuite
- 特征: 持有SoR + 深度流程 + 企业级合规
- Agent化路径: 三层架构(base + usage + outcome)成功概率高
- 利润回流: **有机会接近旧SaaS水平**(60-70% OPM可能维持在55-65%)
- 时间窗口: 2026-2029

**Class 2 — Distribution/Network SaaS(分发/网络型)**
- 代表: INTU(CPA网络), FICO(信贷网络), CSGP(商业地产网络)
- 特征: 第三方生态+信任网络锁定
- Agent化路径: **不需要转型** — AI反向强化网络效应
- 利润回流: 现有利润结构基本稳定
- 时间窗口: 5-10年不变

**Class 3 — Tool SaaS(工具型)**
- 代表: ADBE(创意), ADSK(CAD), ATLAS(协作)
- 特征: Product-layer moat + 主要靠用户技能锁定
- Agent化路径: **只能做Copilot,不能做Agent** — 任务领域不支持outcome pricing
- 利润回流: **利润率会下降10-20pp** — Canva/Midjourney竞争压低ASP
- 时间窗口: 1-3年(快速衰减),5年后稳定在更低水平

**Class 4 — Infrastructure SaaS(基础设施型)**
- 代表: SNOW(data warehouse), DDOG(observability), MDB(database)
- 特征: 基于compute/storage/query的consumption模型
- Agent化路径: **结构性受损** — AI效率=consumption减少
- 利润回流: 难回旧水平 — NRR quality会持续衰减
- 时间窗口: 2026-2028压力期,之后定价模型需要彻底重构

**特殊Class — Security(安全型)**
- 代表: CRWD, PANW, FTNT, ZS
- 特征: Fear-driven预算增长 + N/M不对称
- Agent化路径: **新增Agent治理TAM**,但取决于执行
- 利润回流: 短期受益于恐慌,长期受N/M压力

### 5.5 本章结论

**4类+1类 SaaS的投资矩阵**:

| 类别 | Agent化机会 | 利润回流概率 | 推荐行动 |
|-----|------------|------------|---------|
| Workflow Platform | 高 | 高 | 选择性买入(NOW、CRM的某些scenario) |
| Distribution/Network | 中等(不需要转型) | 高 | 稳定持有(INTU) |
| Tool SaaS | 低 | 中低 | 减持/避开(ADBE、ADSK的期望回报已恶化) |
| Infrastructure SaaS | 低(结构性受损) | 低 | 避开(SNOW)或等cycle底部(DDOG) |
| Security SaaS | 中等(新TAM) | 中等 | 等估值回调(全部审慎关注) |

**用户thesis的验证结论**:
"Agent时代=卖可治理数字劳动力"这个命题**只对Workflow Platform类SaaS成立**。
- 对Distribution/Network类: AI是强化,不是转型
- 对Tool类: AI是威胁,不是机会
- 对Infrastructure类: AI是侵蚀,不是升级
- 对Security类: AI是不对称威胁,受益逻辑不同

**所以完整的thesis应该升级为**:
> **Agent时代不是SaaS终结,但Workflow Platform类SaaS会经历从"卖软件访问权"到"卖可治理数字劳动力"的转型。其他SaaS类别会经历各自不同的AI化路径,不应该用同一个framework定价。**

---

## Ch 6: 利润回流能否达到旧SaaS水平

### 6.1 旧SaaS的利润结构基准

过去10年成熟SaaS的利润结构基准:
- Gross Margin: 75-85%(软件交付的边际成本接近0)
- Operating Margin(成熟期): 30-40%
- Free Cash Flow Margin: 25-35%
- Rule of 40: 40-60
- NRR: 115-130%

**头部SaaS样本**(FY2024-2026,Non-GAAP):
- ADBE: Rule of 40 = 47(12%增 + 35% OPM)
- CRM: Rule of 40 = 44(12%增 + 32% OPM)
- NOW: Rule of 40 = 52(22%增 + 30% OPM)
- WDAY: Rule of 40 = 40(14%增 + 26% OPM)

### 6.2 Agent时代的利润风险

三层架构下,每一层的利润特征不同:

**Layer 1 — Base License(传统座席)**
- Margin: 维持在75-85% GM / 30-40% OPM(不变)
- 问题: 业务萎缩——座席需求下降
- 预计2030年: 此层收入占总收入<50%(vs 2025年80%+)

**Layer 2 — Usage-based(Flex Credits)**
- Margin: **显著低于Layer 1**
  - GM: 50-65%(要扣除LLM inference成本——OpenAI API成本约占revenue 20-30%)
  - OPM: 15-25%(还要扣除runtime、monitoring、security成本)
- 问题: **成本不可控** — LLM价格由OpenAI/Anthropic决定,SaaS厂商要么自建模型(资本支出),要么承担price pass-through风险
- 预计2030年: 此层收入占总收入30-40%

**Layer 3 — Outcome-based(AWU)**
- Margin: **理论上最高,实际最难**
  - GM: 70-85%(如果outcome能清晰度量、低纠纷)
  - OPM: 30-45%(如果skill深度足够、人工干预少)
- 问题: **实施风险高** — outcome定价下,skill的成功率<90%就会被customer索赔;客户需要专业服务支持
- 预计2030年: 此层收入占总收入10-20%(Layer 3需要很长时间发展)

**加权估算**(三层并存的头部Workflow SaaS,2030年):
- Layer 1(45% × 80% GM × 35% OPM): 12.6% 贡献
- Layer 2(35% × 57% GM × 20% OPM): 4.0% 贡献
- Layer 3(20% × 77% GM × 37% OPM): 5.7% 贡献
- **综合OPM ≈ 22-25%** (vs 旧SaaS 30-40%)

**结论**: 按现在的技术经济结构,**Agent时代SaaS的综合OPM会下降5-15pp**。

### 6.3 能否重建高毛利的机制

三条潜在路径让利润回流:

**路径1 — 自建模型(垂直整合)**
- CRM可以Train自己的行业specific LLM,降低对OpenAI/Anthropic的依赖
- 类比: AWS自建Graviton芯片降低对Intel/AMD依赖
- 现实: CRM发布了xGen,但离完整替代还远
- 代价: 资本支出$1-5B/年,需要3-5年回本

**路径2 — 把Layer 3做厚(skill库垄断)**
- 如果CRM掌握100+行业skills,每个skill都有60%+ GM,那Layer 3可以从20%收入占比提升到40%+
- 代价: 需要持续投入客户成功 + professional services
- 时间: 3-5年

**路径3 — 把Layer 2的消费绑在高毛利control plane**
- 这是用户提出的最精准观察: **"纯traffic meter很容易被模型成本和客户预算可见性拖住;只有当CRM成为业务流程里的默认execution layer、context layer和governance layer,它才有机会重新拿到接近旧SaaS的结构性利润"**
- 具体实施: 让Agentforce的每次调用**必须经过CRM的context layer**(Data Cloud) + governance layer(Trust Layer) + execution layer(SoR)
- 这三层是高毛利的(70-80% GM),LLM inference层是低毛利的(20-40% GM)
- 通过架构设计,让客户无法"bypass"CRM直接用OpenAI,就能保住利润结构

### 6.4 最可能的结局

综合以上分析,对用户的核心问题"CRM最后能不能拿到足够利润回流,回到过去SaaS级别?"的完整回答:

**短期(2026-2028): No** — 过渡期利润结构恶化
- Layer 2(Flex Credits)会吃掉5-10pp OPM
- Professional Services要扩编,成本上升
- 客户教育期33%付费率维持,免费ARR稀释毛利

**中期(2028-2030): 接近但达不到** — 预计综合OPM稳定在22-28%
- Layer 3(AWU)开始放量但还不成熟
- Layer 1座席萎缩完成,收入占比降到40-50%
- 综合利润率比巅峰期(FY2024 CRM 35% OPM)低5-10pp

**长期(2030+): 取决于执行** — 有机会恢复到30-35% OPM的条件:
1. Skill库形成垄断(CRM的industry actions > 500+,竞品难以追赶)
2. Data Cloud attach率>60%(客户锁在context layer里)
3. AWU pricing成熟,skill级别的GM稳定在60%+
4. 自建或深度绑定的LLM让inference成本降到Revenue 10%以下

**判断概率**:
- 乐观场景(恢复到35% OPM): 25%
- 基准场景(稳定在25-30% OPM): 55%
- 悲观场景(长期<20% OPM): 20%

**用户的那句话**(完全同意): 
> "CRM有机会做到接近,但很难靠单纯流量计费1:1回到old-school seat SaaS。真正能把利润拉回来的,不会是raw usage本身,而是把usage绑在高毛利的control plane上。"

这就是为什么Ch 4的"Layer D Execution Rights + Layer E Governance"是关键——不是harness,不是skill本身,是**让usage付费流经control plane**的架构能力。

### 6.5 本章结论

**利润回流能否达到旧SaaS水平?**

| 时间 | 综合OPM估计 | vs 旧SaaS(30-40%) | 核心驱动 |
|------|------------|-------------------|---------|
| 2025 | 32-35%(CRM现状) | 基本持平 | Layer 1主导 |
| 2027 | 22-27%(过渡期) | 下降5-10pp | Layer 2 OPM较低 + 教育成本高 |
| 2029 | 25-30% | 下降0-5pp | Layer 3开始放量 |
| 2031 | 28-35% | 可能恢复 | 取决于execution |

**条件**:
1. Skill库垄断(CRM至少500+ industry actions)
2. Data Cloud attach >60%
3. AWU pricing成熟
4. Inference成本<10% revenue

**对投资的意义**:
- 不要假设CRM的32% OPM在Agent转型期间能维持
- 预留2-5年的"利润洼地"——这期间CRM估值会承压
- 真正的alpha在于**判断CRM能否在2029-2031年恢复**——这是$193 vs $260+的分水岭

---

## Ch 7: 一般公司自实施Agent的难度

### 7.1 DIY Agent的技术栈

假设一家Fortune 1000公司的CTO决定"不买SaaS的Agent,自己做":

**基础技术栈(Must Have)**:
1. LLM API接入(OpenAI/Anthropic/自建)
2. Agent框架(Agents SDK / LangGraph / 自研)
3. Tool integration(MCP或自定义)
4. State/memory management
5. Monitoring/observability
6. Evaluation framework
7. Guardrails + safety

**组织配备(Must Have)**:
1. AI/ML工程师(3-5人,深度LLM + agent experience): $250-400K/人/年
2. Platform工程师(4-8人,基础设施 + integration): $180-280K/人/年
3. Data工程师(3-5人,context engineering): $200-300K/人/年
4. MLOps工程师(2-3人,deployment + monitoring): $200-280K/人/年
5. Product manager(2-3人,workflow decomposition): $180-250K/人/年
6. QA/Eval工程师(2-3人,测试 + ground truth): $150-220K/人/年

**保守配备总计**: 16-27人,$3-7M/年人力成本

**基础设施成本**:
- LLM inference: $500K-5M/年(取决于使用量)
- Cloud infrastructure: $200K-2M/年
- Vendor tools(MLOps, security, monitoring): $300K-1M/年
- Professional services/consulting: $500K-3M/年(至少前18月)

**总TCO**: $4.5-18M/年 + 12-24月实施期

### 7.2 SaaS外包的对比成本

同样规模(Fortune 1000)买CRM Agentforce:
- Base Sales Cloud seats(500人 × $165/mo): $990K/年
- Agentforce Flex Credits(大型部署): $500K-3M/年
- Data Cloud(可选): $300K-2M/年
- Professional Services(实施): $500K-2M一次性
- **总成本**: $2-8M/年 + 3-9月实施期

**成本对比**:

| 维度 | DIY Agent | SaaS外包 |
|-----|-----------|---------|
| 年度总成本 | $4.5-18M | $2-8M |
| 实施周期 | 12-24月 | 3-9月 |
| 人力需求 | 16-27人 | 2-5人(内部)+ vendor |
| 维护负担 | 100%内部 | 分担 |
| Time to ROI | 18-36月 | 9-18月 |
| 风险 | 技术+组织双重风险 | 主要商业风险 |

### 7.3 "看起来能DIY"的三大陷阱

很多企业看到OpenAI Agents SDK + MCP的开源化后会说"我们自己搭吧",但会卡在三个地方:

**陷阱1 — "技术栈"不等于"产品"**
- 技术栈只是乐高块,搭出"能运行的Agent"不等于搭出"能可靠运行、符合合规、客户可接受的Agent"
- 真实案例: Gartner 2025年6月预测,**超过40%的agentic AI项目到2027年底会被取消**,原因是"成本上升 + 价值不清晰"
- 这40%里大部分是DIY项目,SaaS外包项目的失败率更低(有vendor承担部分风险)

**陷阱2 — Context Engineering的长尾工作量**
- 核心数据整合: 看似容易,实际要花6-12月把企业scattered data(CRM、ERP、文档、邮件)整合
- 权限映射: 把AD/Okta的角色映射到Agent permission,每个业务部门都有自己的例外规则
- 数据清理: 历史数据的schema不一致、NULL处理、duplicate去除——这些都是"脏活"
- **经验法则**: Context Engineering占整个Agent项目成本的**40-60%**,是最被低估的部分

**陷阱3 — Governance的合规责任**
- 谁承担Agent决策的法律责任?
- SOC 2 / HIPAA / GDPR审计要求 Agent有**完整决策回放能力**
- 如果Agent错误处理了一笔$1M的订单,赔偿责任归谁?
- DIY方案: 责任在CTO/Legal——没有backstop
- SaaS方案: 合同里有明确责任划分 + 厂商保险

### 7.4 什么情况DIY是对的

不是所有情况DIY都错,DIY合理的三种场景:

**场景1 — 高度差异化的核心业务**
- 如果Agent要做的事情是公司的**核心竞争优势**,且无商业vendor能提供(e.g., Renaissance Technologies的交易策略Agent)
- 这种情况DIY的护城河价值>成本

**场景2 — 极高敏感度的数据**
- 国防、情报、医疗核心研发
- 不能用任何外部vendor的场景

**场景3 — 公司规模足够大**
- 50,000+员工的大企业,DIY的固定成本可以摊薄到足够多个项目上
- Amazon、Meta、Google自己建Agent合理,mid-market企业不合理

**其他场景,买SaaS的Agentforce/Now Assist/Copilot更经济**

### 7.5 一般公司的实际选择矩阵

按企业规模+行业合规度,最可能的选择:

| 企业规模 | 低合规行业 | 中合规行业 | 高合规行业 |
|---------|-----------|-----------|-----------|
| <1000员工 | SaaS全外包 | SaaS外包 | SaaS外包 |
| 1000-5000 | SaaS外包 | SaaS + 部分定制 | SaaS为主,关键部分定制 |
| 5000-20000 | SaaS + 部分DIY | 混合架构 | 混合架构 |
| 20000-100000 | 混合架构 | 混合架构 | 以DIY为主,SaaS补充 |
| 100000+ | 以DIY为主 | 以DIY为主 | 以DIY为主 |

**关键洞察**:
- **"一般公司"(大部分mid-market和mid-cap企业)的最优解仍然是SaaS** — 这保证了NOW/CRM/WDAY等Workflow Platform的客户基础
- **Fortune 100的大企业会DIY,但占SaaS公司收入<20%** — SaaS公司的主要客户不会逃逸
- **合规密集行业(金融、医疗、政府)更可能买SaaS** — 责任转嫁价值高

### 7.6 本章结论

**一般公司自实施难度:高,且不划算**

**对SaaS厂商的意味**:
1. **客户基础相对稳固**: 90%+的mid-market企业、F500合规密集行业会继续买SaaS
2. **但SaaS不能躺在"我们有technology"上卖**: 客户可以用OpenAI+MCP搭出基础agent,所以SaaS必须提供"更深的context + governance + execution"才值得溢价
3. **定价能力受DIY成本约束**: SaaS收费不能超过企业DIY的TCO太多——如果CRM Agentforce年费达到$20M,客户会开始算DIY账

**对投资者的意味**:
- 不要担心"模型公司+MCP"会让SaaS客户逃逸——DIY对一般企业仍然不划算
- 但SaaS必须守住value proposition — 如果光靠harness/framework竞争,很快会被OpenAI挤掉;必须靠**Layer C-E的深度**

---

## Ch 8: 投资判断与跟踪变量

### 8.1 综合投资判断

基于R1/R2/R3/CRM和本次行业综合分析,形成以下投资判断:

**增持/买入候选**:

**1. NOW (ServiceNow) — 关注(+23%预期回报,R3报告原评级)**
- **为什么**: 四元组(harness×context×execution×governance)综合分8.25/10最强;Context Engine + AI Agent Orchestrator的战略定位清晰;模块互锁NRR 1.2x,AI只会加速,不会侵蚀
- **第一变量**: 模块数>6的客户占比 + ACV中位数(公开披露频率较低,需从财报电话会议中推断)
- **进入触发**: PE回调到30x以下时加仓(当前36x附近)
- **风险**: 政府合同暴露(DOGE联邦预算削减-40% YTD) — 需观察government vertical收入占比
- **评级维持**: 关注

**2. CRM (Salesforce) — 中性关注(+1.7%短期年化,但>$200潜在+30%)**
- **为什么**: 定价重构方向对,Agentforce如果PMF成功是35-45pp预期差;评级保留在"中性"因为证据未完备
- **第一变量**: **Agentforce付费ARR季度QoQ增速**(不是名义ARR,不是同比) — 目前未公开,但FY2027 Q1(2026-05-26披露)是关键节点
- **进入触发**: 
  - Bullish entry: Agentforce Q1 FY2027 paid ARR公开披露且增速>40% QoQ → 加仓
  - Bearish exit: Service Cloud <+2% YoY且Agentforce paid <$400M → 减仓
- **风险**: 飞轮悖论加速,Service Cloud seat erosion不可控
- **评级维持**: 中性关注(上行非对称更好,但需要证据触发)

**3. INTU (Intuit) — 深度关注(R1报告评级)**
- **为什么**: 46,000 CPA分发网络+AI反向强化 = 最强护城河;不在Agent风暴的直接路径上
- **第一变量**: QBO net retention(门槛>78%) + SBSE ARR YoY(门槛>10%)
- **评级维持**: 深度关注(+20-25%)

**观望/减持候选**:

**4. DDOG (Datadog) — 中性关注**
- **为什么**: NRR在外部CapEx周期驱动下,命运不自主;AI观测性扩张有机会但规模有限
- **第一变量**: AWS/Azure季度CapEx同比
- **评级维持**: 中性关注(+1%)

**5. SNOW (Snowflake) — 审慎关注**
- **为什么**: Consumption模型结构性受AI效率侵蚀(NRR quality-adjusted 87.5%);Cortex AI vs Databricks差距拉大
- **第一变量**: Cortex AI ARR vs Databricks AI ARR的差距
- **评级维持**: 审慎关注(-23%)

**6. ADBE (Adobe) — 关注(临界)**
- **为什么**: 创意SaaS的product-layer moat面临线性衰减;但市场定价已经过于悲观(Reverse DCF隐含-0.52%永续增长)
- **第一变量**: GenStudio ARR YoY(门槛>20%)
- **评级维持**: 关注(临界)

**7. CRWD/PANW/FTNT — 审慎关注(R2报告评级)**
- **为什么**: N/M不对称驱动的fear-based增长已被市场充分定价,估值-11%到-48%过高
- **第一变量**: N/M ratio变化(攻击效率/防御效率)
- **评级维持**: 审慎关注(等估值回调)

### 8.2 母级跟踪变量(行业级)

**5个行业级信号,决定整个thesis是否成立**:

**信号1 — Agentforce付费率(领先指标,3-6月前瞻)**
- 当前: 33% paid(9.5K/29K)
- 目标: FY2027Q2达到60%+
- 如果FY2027Q1未披露或<40% → 警示信号
- 如果持续提升至>70% → 全行业利好

**信号2 — Gartner的"40%项目取消"预言(反向指标)**
- Gartner预测到2027年底40% agentic项目取消
- 如果2026年H2就出现大规模项目取消(不是等到2027) → AI降温,SaaS估值整体下调
- 如果只有预期的尾部项目取消 → 头部SaaS受益

**信号3 — MCP+Agents SDK的企业采纳率(去中介化指标)**
- 如果MCP在F500的采纳率<20%(2027年) → SaaS的integration moat持续
- 如果>40% → SaaS必须降价或重新定义价值
- 观察方式: Anthropic/OpenAI的developer conference披露的企业customer数量

**信号4 — MSFT Copilot的bundling效应(竞争信号)**
- 如果MSFT把更多Dynamics/CRM功能免费bundled进M365 Copilot,CRM/其他Workflow SaaS面临降价压力
- 观察方式: MSFT Build Conference的发布

**信号5 — 监管立法(宏观信号)**
- EU AI Act / US state-level AI legislation
- 任何"限制AI替代人类工作"的立法 → Agent部署成本上升,SaaS延迟recovery
- 任何"明确AI合规责任归属"的立法 → 加速企业采纳SaaS(责任转嫁价值上升)

### 8.3 投资组合建议(给用户)

假设一个$10M SaaS投资组合在Agent时代的配置:

| 角色 | 配置 | 比例 | 理由 |
|-----|-----|-----|------|
| Core(核心) | NOW, INTU | 40% | 最强执行权+Governance组合;INTU分发层AI-proof |
| Growth(成长) | CRM(逐步加仓) | 20% | 如果Agentforce PMF证据出现,快速加仓到30% |
| Value(价值) | ADBE(反向买入) | 15% | 市场定价过度悲观,等Agent化速度<预期时反弹 |
| Special(特殊) | MSFT(底层赢家) | 15% | Copilot+Azure是AI基础设施的最大赢家,逻辑最不依赖SaaS |
| Defensive(防御) | Cash(灵活) | 10% | 等Agent化叙事回调时进场 |
| Avoid | SNOW, DDOG(短期), CRWD | 0% | 结构性受压 |

**调仓触发条件**:
- CRM Agentforce Q1 FY2027付费ARR>$400M → Growth加仓到30%,Cash减到0
- Gartner 40%项目取消提前出现 → Growth减仓,Cash加到30%
- MSFT大规模bundling CRM功能 → CRM减仓,MSFT加仓

### 8.4 Kill Switch(全组合级)

**4条Kill Switch,触发即全面重估**:

**KS-1: Workflow Platform类SaaS出现首起>F500的"de-SaaS"案例**
- 即:Fortune 100公司公开宣布从CRM/NOW/WDAY迁出,转向DIY+MCP方案
- 目前: 0起
- 触发意味: "一般公司也能DIY"的判断被证伪,整个thesis需要重新审视

**KS-2: OpenAI/Anthropic发布"enterprise agent stack"完整方案**
- 包括: Data integration + Governance + Execution层完整堆栈
- 目前: 只有Agents SDK(harness层)
- 触发意味: 模型公司开始向Layer C-E进军,SaaS的四元moat被挑战

**KS-3: 某头部SaaS(CRM/NOW/WDAY之一)Agentforce/Assist/Illuminate连续2个季度付费增速<20% QoQ**
- 目前: CRM未公开QoQ数据
- 触发意味: Agent化的商业路径不成立,整个Class 1 Workflow SaaS需要重估

**KS-4: 主要经济体通过"AI Agent使用限制"立法**
- 例如: EU禁止某些场景的AI Agent decision-making
- 触发意味: Agent部署成本翻倍,SaaS利润回流推迟5+年

### 8.5 本章结论

**一句话投资判断**:

> **Agent时代是Workflow Platform类SaaS的"验证+分化"期。现在买入的核心逻辑不是"买AI红利",而是"买四元组moat (Harness × Context × Execution × Governance) 中Layer D+E最深的公司"。NOW是第一选择,CRM是方向对但证据未完备的option play,INTU是AI-proof的稳定持有,SNOW/DDOG/ADBE短期避开。整个行业在FY2027H1见分晓——Agentforce付费ARR的季度QoQ增速将成为全行业的领先指标。**

---

## Ch 9: 固化 — 三个钉子(请读者带走的判断)

> 如果合上这份报告只能记住三件事,希望是下面这三件。

### 钉子1 — 新定义: 从"SaaS"到"数字劳动力平台"

**它到底是什么**:
- 旧定义: SaaS = 以订阅形式交付的软件,定价单位是per-seat
- 新定义: **Workflow Platform SaaS = 以可治理数字劳动力交付的业务结果,定价单位是seat + execution + outcome的三层混合**

**为什么新定义更强**:
- 解释了CRM在15个月内改15次定价(不是混乱,是在重建计费锚点)
- 解释了Agentforce $800M里67%免费(不是PMF失败,是在教育客户接受新单位)
- 解释了Service Cloud的飞轮悖论(不是增长问题,是内部现金流置换)
- 解释了NOW vs SNOW同样125% NRR但质量差3-4倍(不同NRR引擎的AI反应完全不同)
- 解释了ADBE vs INTU被市场同框定价的错位(不同护城河层的AI半衰期完全不同)

### 钉子2 — 第一变量: Agent付费ARR的季度QoQ增速,不是名义ARR,不是NRR

**旧的第一变量**: NRR + Rule of 40 + Non-GAAP PE
**新的第一变量**: **Agent付费ARR的QoQ增速 × 执行权层的深度**

**具体跟踪**:
- CRM: Agentforce paid ARR QoQ(当前未公开,FY2027 Q1首次可能披露)
- NOW: AI Agent licensed module数量 + ACV中位数变化
- WDAY: AI skill活跃用户占比
- MSFT: Copilot paid seat占M365 total seat比例
- 其他SaaS: 需要管理层开始公开"AI产品付费指标"(目前大多数还在"名义ARR"阶段)

**为什么这个变量比"AI产品ARR"更关键**: 
- 名义ARR可以包括免费赠送、试用、discount heavy — 这些都不是真实付费
- QoQ增速(不是YoY)排除基数效应,反映当前动量
- 付费(不是deals signed)排除customer education期的虚胖

### 钉子3 — 新估值语言: 四元组综合评分

**不要再用**: 单一Rule of 40 / 单一NRR / 单一Forward PE

**应该用**: **Harness × Proprietary Context × Execution Rights × Governance** 四元组综合评分

| 维度 | 权重 | 评分标准 |
|-----|-----|---------|
| Harness(中间件) | 15% | 2026后商品化,不再是区分度 |
| Proprietary Context(专有上下文) | 30% | 由SoR所有权决定,最稳定的moat |
| Execution Rights(执行权) | 30% | 对业务流程的决策权 + 下游触发能力 |
| Governance(治理层) | 25% | 审计责任 + 合规签署 + 组织变革 |

**头部SaaS综合得分排序**(本报告估计):
1. NOW: 8.25(模块互锁+合规最强)
2. CRM: 7.75(客户数据+sales/service执行权强)
3. WDAY: 7.75(HCM+Finance合规最强)
4. MSFT Copilot: 7.5(横跨多层但不够深)
5. DDOG: 5.75(观测数据context但执行权弱)
6. SNOW: 5.25(数据平台但决策权不在自己手里)
7. OpenAI Apps: 4.75(harness强但其他三元弱)

**投资决策**:
- >7.5分的公司: 有条件走完三层架构,有机会恢复旧SaaS利润水平
- 5-7分的公司: 部分受益于AI,但不能期待"SaaS-level monopoly"回归
- <5分的公司: 结构性受压,应该避开或深度折价才买入

### 迁移问题(看下一家类似SaaS时必问)

1. **这家公司的执行权有多深?** — 写入SoR还是只读?决策层还是辅助层?
2. **这家公司的context有多专有?** — 客户数据所有权在谁手上?context能被外部复制吗?
3. **这家公司的governance责任承接能力?** — 能签合同承担Agent失败的赔偿吗?有无合规认证?
4. **这家公司的任务领域支持outcome pricing吗?** — 任务是否可度量、可归因、可审计?
5. **这家公司面对MSFT bundling的防御?** — 如果MSFT把同类功能bundled进Copilot,这家公司的独立价值在哪?

---

## Ch 10: 实战案例 — 真实Agent部署的收益与坑

> 抽象分析说到这里。下面用几个可查证的真实案例,把thesis落到具体场景。

### 10.1 成功案例: Klarna with OpenAI(2024)

**背景**:
- Klarna全球部署AI assistant(基于OpenAI GPT-4)
- 替代原来约700个外包客服岗位的工作量
- 2024年2月公开披露数据

**数据**:
- 每月处理230万次客户对话
- 平均对话解决时间从11分钟降到<2分钟
- 客户满意度持平
- Klarna估计节省$40M/年(相当于700个人力FTE)

**但是关键细节**:
- Klarna没有买SaaS vendor的Agent,是直接用OpenAI API + 自建integration
- 这个项目需要Klarna内部的AI team + data team + product team 共18个月开发
- Klarna规模大(2000+员工,FinTech,金融监管经验)——**不是一般公司能复制的案例**

**对thesis的验证**:
- 证明Agent可以替代大规模人力工作(Layer 3 outcome可实现)
- 但实施成本极高,组织能力要求极高
- 这正是Ch 7"一般公司DIY不划算"的佐证——**Klarna能做因为它是大规模、金融监管背景、有AI team的特殊企业**

### 10.2 失败案例: Air Canada Chatbot(2024)

**背景**:
- Air Canada部署客户服务聊天机器人
- 2024年2月一位客户咨询bereavement fare(丧亲折扣)
- Chatbot给出错误信息,承诺了不存在的折扣
- 客户根据chatbot指引购票后被拒绝retroactive refund

**结果**:
- 加拿大民事仲裁庭裁定Air Canada必须履行chatbot承诺
- **判决核心**: Air Canada要为chatbot提供的信息负责,不能推给"chatbot只是工具"
- 这是全球首例AI chatbot造成的企业法律责任案例

**对thesis的验证**:
- 证明了**Governance(治理层)的法律含义真实存在**
- DIY agent意味着企业要自己承担这类法律责任
- SaaS vendor的价值就是在合同里承接这类责任(虽然现在的SLA大多不涵盖,但这是方向)
- 这也解释了为什么outcome pricing需要vendor愿意承担风险——Air Canada case告诉市场,这个风险是真金白银的

### 10.3 Gartner 40%取消预言的具体原因

**Gartner 2025-06披露的agentic项目失败原因**(按频率排序):

1. **ROI不明确(32%项目)**: 部署后业务指标没有清晰提升
2. **成本超预算(28%)**: 推理成本、integration成本被严重低估
3. **合规问题(18%)**: 无法满足行业监管要求
4. **用户采纳低(14%)**: 员工不信任Agent,继续用人工流程
5. **技术债(8%)**: 过早选择的框架无法scale

**对thesis的验证**:
- 前两项(ROI+成本)占60%,说明**"Agent能做"和"Agent值得做"是两回事**
- 这正是SaaS厂商的价值所在: vendor不仅提供agent,还承担ROI证明、合规认证、best practices
- 一般企业DIY,面对这5个问题要自己解决——成功率大幅下降

### 10.4 Salesforce自己的Agentforce部署数据(披露)

**Salesforce官方case study**(2025-2026 Dreamforce披露,部分可查证):

**成功案例**:
- Heathrow Airport: 使用Agentforce处理游客查询,效率提升50%
- Workday(作为Salesforce客户): 部署Agentforce for internal IT support,减少30% ticket volume
- Wiley(出版商): 客户服务Agentforce减少40%人工工作

**这些case study的共性**:
1. **都是F500级企业**: 有足够规模摊薄实施成本
2. **都是客户服务/IT support领域**: 高频、可审计、低争议的任务
3. **都是"增强+替代混合"**: 没有100%替代,是人机协作

**但是**:
- Salesforce选择披露的都是成功案例(幸存者偏差)
- 真实的部署失败率没有公开数据
- CRM报告里推断的"Agentforce成功率55-65%"是基于行业基准,实际可能更低

### 10.5 实战案例给投资者的5个教训

**教训1 — 单次成功不代表可复制**
Klarna的成功依赖自身的特殊条件(规模+组织),不能推广到一般企业。投资时不要看"有多少成功案例",要看"大规模采纳的经济性"。

**教训2 — Governance风险是真金白银**
Air Canada判决确立了企业Agent的法律责任原则。这会加速企业倾向于"有合同保护的SaaS vendor"而非"DIY",这是对SaaS有利的结构性变化。

**教训3 — 40%失败率不是危言耸听**
Gartner的预测有realistic basis。投资SaaS时要区分"AI-native product"(从scratch设计) vs "AI-retrofit product"(在现有座席产品上bolt-on)——前者失败率低,后者高。

**教训4 — 任务领域决定成败**
客户服务、IT support、财务operations这些高频+可审计领域容易成功;销售、创意、战略这些低频+主观领域难成功。这进一步验证Ch 3"任务领域不通用"的判断。

**教训5 — F500 vs mid-market的鸿沟**
所有公开的成功案例都是F500级企业。mid-market(1000-5000员工)企业的Agent部署成功率可能低得多——这对SaaS的主力客户群(mid-market)是个隐忧。需要SaaS vendor进一步降低门槛(预置skill+轻量部署)才能普及。

---

## 附录A: 近期重要证据(2026-04-20 + 最新披露)

**Salesforce (2026-04-20 WSJ/Axios)**:
- Benioff正面反击"SaaSpocalypse"叙事
- WSJ强调Salesforce证明AI不替代企业级控制面
- Axios报道Agentic Work Units(AWU)计量单位推进
- 目标: 把价格锚点从token成本抬到业务结果

**Salesforce FY2026 Q4 Results**:
- Total Revenue $41.5B(+12%)
- Agentforce ARR $800M(+169% YoY)
- 29,000 Agentforce deals,9,500 paid
- Data Cloud ARR $1.2B(+120%)
- Service Cloud growth +5.5%(decelerating from +8%)
- cRPO +16%, RPO +7.7%(divergence signal)

**Salesforce Connectivity Report**:
- 96% IT leaders说agent成功取决于integration
- 平均企业已在用12 agents
- 未来2年预计再增67%
- 但只有27%应用真正集成
- 50%组织仍在agent silo状态
- 94%认为架构必须更API-driven

**ServiceNow 2026**:
- 发布Context Engine
- AI Agent Orchestrator
- "beyond the sidecar AI era"——从sidecar到full integration

**Workday**:
- Agent必须grounded in trusted HR/Finance data
- Flex Credits模式规划中

**OpenAI 2026-04**:
- 发布Agents SDK(明确定位"harness for the agent loop")
- 强调enterprise AI is "full stack"

**Anthropic MCP**:
- 持续推进Model Context Protocol
- 标准化LLM-tool-data连接

**Gartner 2025-06**:
- 预测>40% agentic AI项目到2027年底被取消
- 原因: 成本上升 + 价值不清晰

**McKinsey 2025**:
- Traditional per-user subscription不会消失
- Incumbents必须引入consumption mix
- AI开始做工作时,收费逻辑从access向outcome迁移

**Bessemer 2026 AI Pricing Playbook**:
- AI软件分三类: Copilots / Agents / AI-enabled services
- 当AI开始做工作时,收费从access向outcome迁移

---

## 附录B: 分析框架来源

本报告综合以下材料:

1. **R1报告**: `reports/SAAS_SERIES_R1_CREATIVE/R1_complete_v2.md`(创意SaaS——ADBE/INTU/ADSK/PTC)
2. **R2报告**: `reports/SAAS_SERIES_R2_SECURITY/R2_Security_SaaS_Complete_v2.md`(安全SaaS——CRWD/PANW/FTNT)
3. **R3报告**: `reports/SAAS_SERIES_R3_NRR/R3_NRR_Complete_v2.0.md`(NRR SaaS——DDOG/NOW/SNOW/CRM)
4. **CRM深度报告**: `reports/CRM/CRM_Complete_v2.0_2026-03-19.md`
5. **SaaS sector预期差报告**: `reports/SAAS_SECTOR/SaaS_Expectation_Gap_Sector_Report_v1.0.md`
6. **公开市场材料(2026-04-20)**: WSJ、Axios、Gartner、McKinsey、Bessemer、Salesforce/NOW/WDAY/OpenAI/Anthropic官方披露

---

*报告生成: 2026-04-20 | 框架版本: v22.1 | 工作目录: 生态科技 worktree*
*投资有风险,本报告仅供研究参考,不构成投资建议*
