# R2 最终方案: 多视角审议系统 — 从SKILL.md v1.0到可执行实施

> **角色**: Agent C — 交叉质询综合者
> **日期**: 2026-03-06
> **输入**: R1 Framework Architect + Integration Strategist + Efficiency Optimizer + Historical Validator + Devil's Advocate + Skill Designer
> **产出**: 可直接实施的最终方案 + 对每个质疑的正面回应

---

## 0. 核心判断: 对Devil's Advocate六个质疑的逐一回应

在展开方案之前，必须先正面回应Devil's Advocate的每一个核心质疑。方案的可信度取决于它能否诚实面对这些问题，而不是回避。

### Q1: "AI无法有意义地模拟大师思维"

**回应: 同意前提，但不同意结论。**

Devil's Advocate说得对——LLM模拟的不是巴菲特本人，而是"一个读过所有巴菲特公开材料的分析师"。这确实不是巴菲特。但这并不意味着这个机制无价值。

关键区别: 我们不需要模拟巴菲特的第六感。我们需要的是**结构化的认知多样性**——强迫Agent从不同的分析框架审视同一组数据。单一Agent的默认行为是用一套隐含框架分析所有问题。当prompt要求Agent"以护城河持久性为最高优先级审视"vs"以宏观regime约束为最高优先级审视"时，即使底层是同一个模型，输出的重点分布、遗漏检测、风险权重确实会不同。

**这不是模拟大师，而是模拟分析视角的旋转。** 大师名字只是助记符——帮助用户和Agent快速锚定"这个视角关心什么"。如果叫"视角A"和"视角B"，可读性差且容易混淆。

**方案回应**: 采纳Devil's Advocate的建议——在所有用户可见的输出中，**不使用"巴菲特认为"这种表述**。改用"护城河视角评估"、"宏观压力视角评估"。大师名字仅在内部配置(YAML)中使用，作为开发者助记符。这消除了虚假权威感的风险，同时保留了认知框架旋转的功能价值。

### Q2: "同一模型的7个角色 = 同一面镜子的7个角度"

**回应: 部分同意，因此方案设计了验证机制。**

Devil's Advocate预测"核心结论重合度超过80%"。这是可测试的假设。方案的回应不是否认这个风险，而是:

1. **内置重合度检测**: 裁决合成阶段计算"共识率"。如果7个席位中6个方向一致，这说明要么确实是共识(有价值的信息)，要么是模型偏差(无价值的重复)。区分方法: 检查反方(Bear)的论证是否使用了与多方不同的数据源。如果Bear用了相同数据得出相同结论——那是真正的共识。如果Bear只是换了措辞说同一件事——那是模型偏差。

2. **重合度阈值**: 如果共识率>90%(7席中<1个实质性分歧)，标记为"低多样性警告"，该次委员会审议的洞见权重降级。这防止了"虚假多样性的虚假安全感"。

3. **最小化版本优先**: 方案不启动7个独立Agent。而是2-3个Agent各扮演2-3个席位。这大幅降低了"7面镜子"的成本，同时保留了视角旋转的核心机制。

### Q3: "动态权重建立在沙上"

**回应: 同意权重不可能精确，但框架的价值不在权重的精确性。**

SBUX是"消费品公司"还是"转型期公司"？答案是两者都是，权重分配必然是主观的。但权重的功能不是"精确度量哪个视角更重要"——而是**控制注意力分配**。即使巴菲特权重是18%还是22%对最终结论的影响<1%，权重算法的真正价值在于:

- 确保Bear永远>=12%(不被稀释)
- 确保与公司无关的视角被降权(Cathie在KO上<=10%)
- 提供一个可审计的决策记录("为什么这次委员会强调宏观?因为类型标签=cyclical_macro")

**方案回应**: 权重保留YAML规则表(确定性+可审计)，不用LLM即时判断权重(避免不可重复性)。同时承认权重是"方向性的注意力调节器"，不是"精确的影响力度量"。

### Q4: "加权平均导致中庸化"

**回应: 方案设计明确禁止加权平均。**

委员会的产出不是"巴菲特说8/10，Dalio说4/10，加权平均=6.4/10"。产出是**结构化的共识/分歧记录**:
- 共识判断: "所有席位认为X"——这强化了确信度
- 分歧判断: "护城河视角认为A，宏观视角认为B"——这保留了张力，不消除它
- 最终报告呈现分歧本身，而非分歧的平均值

这是关键的设计选择: **委员会不产出"答案"，产出"争议地图"。** 极端但可能正确的观点被标记为"少数派分歧"保留在报告中，而不是被平均掉。

### Q5: "修执行缺陷比建新系统ROI高10倍"

**回应: 同意这是最重要的判断，方案据此设计了分阶段实施。**

Devil's Advocate的核心洞见是: 31份报告的质量波动(2.8-4.5)主要来自执行纪律波动，而非认知框架缺失。SBUX v2.0→v3.0的提升(3.8→4.0)来自EVO修复(净债务三口径+WACC前瞻+悲观偏差扫描)，不是来自新框架。

**方案回应**:
- v0.5(立即): 零新架构，仅在RT prompt中增加~300字的"视角检验"段落
- v1.0(3份报告后): 只有当v0.5实证证明有增量价值时，才升级到结构化委员会
- 任何版本的优先级都低于已知执行缺陷的修复

### Q6: "如何避免过度工程化？"

**回应: 通过硬约束——时间上限25分钟，token上限+17%，文件增量2个。**

SKILL.md v1.0已经设了这些约束。方案进一步收紧:
- v0.5: 0文件增量，0分钟额外时间(嵌入现有RT流程)
- v1.0: 2文件增量(config.yaml + verdict.md)，10分钟净增
- 永不做: Full版7引擎4轮辩论(Efficiency Optimizer已证明ROI为负)

---

## 1. 系统命名

**最终命名: "多视角审议" (Multi-Perspective Deliberation, MPD)**

理由:
- 不叫"投资委员会"——避免暗示存在多个独立决策者(实际是同一个模型)
- 不叫"大师审议"——避免虚假权威感(Devil's Advocate核心质疑)
- "多视角"准确描述机制本质: 同一模型在不同认知框架下的输出旋转
- "审议"准确描述功能: 不是"决策"，而是"结构化争论"

**内部代号保留**: SKILL.md中的席位定义继续使用`buffett`/`li_lu`等作为开发者助记符(YAML key)
**外部呈现**: 所有报告正文使用功能性标签——"护城河视角"/"关键变量视角"/"宏观压力视角"等

**映射表**:

| 内部key | 外部标签 | 简称 |
|---------|---------|------|
| buffett | 护城河与生意质量视角 | 护城河视角 |
| li_lu | 关键变量提纯视角 | 关键变量视角 |
| ackman | 运营改善与资本配置视角 | 运营改善视角 |
| druckenmiller | 赔率与催化剂视角 | 赔率视角 |
| dalio | 宏观制度与债务周期视角 | 宏观压力视角 |
| cathie | 非线性上行与技术颠覆视角 | 非线性视角 |
| bear | 脆弱性与撤退信号视角 | 拆楼视角 |

---

## 2. 引擎配置

### 2.1 分组方案

采纳Efficiency Optimizer的"Standard版"判断，但整合Historical Validator的消费品偏差校准。

**最终配置: 5+2动态引擎**

- **常驻5席** (每次审议必开): buffett, li_lu, ackman, dalio, bear
- **动态2席** (按公司类型选配): druckenmiller, cathie

**动态选配规则**:

| 公司类型 | druckenmiller | cathie | 理由 |
|---------|:------------:|:------:|------|
| high_quality_compounder | OFF | OFF | 争议窄，5席足够 |
| platform_network | ON | ON | 时点+非线性都是定价关键 |
| disruptive_innovation | ON | ON | 同上 |
| turnaround | ON | OFF | 催化剂时点关键，非线性不适用 |
| cyclical_macro | ON | OFF | 周期位置+时点关键 |
| high_leverage | OFF | OFF | 宏观+拆楼主导 |
| narrative_bubble | ON | OFF | 赔率思维校准叙事溢价 |

**消费品行业特化** (Historical Validator建议):
- cathie在消费品行业强制OFF(除非公司类型含`disruptive_innovation`)
- dalio权重+3(消费品对利率/信贷周期敏感性被AI系统性低估)
- ackman权重+2(消费品转型公司如SBUX的运营改善空间是最大AI盲点)

### 2.2 Agent分配

**2-3 Agent并行** (不是7个独立Agent):

| Agent | 席位 | 角色 |
|-------|------|------|
| Agent A | buffett + li_lu | 主审: 生意质量+关键变量 |
| Agent B | ackman + dalio (+druckenmiller) | 主审: 运营+宏观(+时点) |
| Agent C | bear (+cathie) | 反方: 拆楼(+非线性扫描) |

**每个Agent的prompt注入**: ~200-300字(2-3席位 × ~100字/席位)。不加载全部7个席位的定义，只加载分配到的席位。

---

## 3. 介入点设计

### 3.1 精确介入时机

采纳Integration Strategist的核心判断: **Phase 3后是主战场**(占总价值60%+)。放弃"上半场暂停"方案(并行Agent中途打断太复杂)。

**最终介入设计: 1.5阶段**

| 阶段 | 时机 | 功能 | 时长 | 版本 |
|------|------|------|:----:|:----:|
| **Stage 0.5: 战场配置** | Phase 0.75完成后 | 公司类型判定+权重计算+席位分配 | ~3min | v0.5起 |
| **Stage 1: 多视角审议** | Phase 4启动时(RT之前) | 分庭审理+交叉质询+裁决 | ~15-20min | v1.0起 |

**为什么不在Phase 1-3中途介入** (Integration Strategist的关键论证):
1. Phase 1-3使用并行Agent，中途注入委员会需要"暂停-收集-审议-分发"，破坏并行效率
2. Phase 1-3的产出在完成前缺乏完整性，审议不完整的分析=噪音
3. Phase 3后，Agent已产出完整估值+情景分析，委员会有足够material审议

**触发条件** (Efficiency Optimizer的controversy_score门控):

```yaml
trigger_rules:
  mandatory:  # 必须启动MPD
    - controversy_score >= 5
    - company_type in [turnaround, disruptive_innovation]
    - PW >= 7  # Discovery系统
  optional:   # 建议启动MPD
    - controversy_score 3-4  # 降级为Lite模式(3席串行)
  skip:       # 跳过MPD
    - controversy_score < 3
    - company_type == industry_horizontal  # 行业横向对比
    - report_type == tier_2  # Tier 2分析不启动
```

**controversy_score计算** (Phase 0.75自动评估):

```
controversy_score =
  CQ数量权重(0-3) +
  CQ对立程度(0-3) +
  历史Phase 4校正幅度(0-2) +
  公司类型复杂度(0-2)
总分: 0-10
```

### 3.2 与Historical Validator建议的整合

**前置到Phase 0的元素** (不等到Phase 4):

1. **消费品悲观偏差预校准**: Phase 0的shared_context.md中增加一行: `bias_alert: consumer_pessimism +12pp (empirical from RCL/SBUX)`。这不是委员会的功能，而是Phase 0数据预取的增强。在MPD启动之前，Agent已被提醒悲观偏差的存在。

2. **催化剂时序前置**: 催化剂清单从Phase 3移到Phase 1(Historical Validator建议)。这样MPD审议时已有完整的催化剂日历，druckenmiller视角有material可审。

---

## 4. 执行流程

### 4.1 Stage 0.5: 战场配置 (Phase 0.75内嵌)

**输入**: thesis_crystallization.md + shared_context.md + CQ注册表
**执行** (单Agent, ~3分钟):

```
Step 1: 公司类型判定 (从8种中选1-2, 每个一句话理由)
Step 2: 争议雷达 (从CQ中提取3-5个争议, 映射到争议标签)
Step 3: controversy_score计算 (0-10)
Step 4: 权重计算 (基础权重 + 类型修正 + 争议修正 + 消费品特化修正 + 归一化)
Step 5: 动态席位选配 (druckenmiller/cathie ON/OFF)
Step 6: Agent分配 (2-3 Agent × 2-3席位)
Step 7: 产出 committee_config.yaml
```

**Token预算**: ~10K input + ~3K output = ~4K字符产出
**决策门**: controversy_score < 3 → 跳过MPD, 记录理由到config.yaml

### 4.2 Stage 1: 多视角审议 (Phase 4启动时)

**前置条件**: Phase 3通过质量门控 + committee_config.yaml存在 + controversy_score >= 3

**执行流程**:

```
Step 1: Agent身份注入 (~1分钟)
  - 按config.yaml的agent_assignment, 给每个Agent注入对应席位prompt
  - 每席位~100字: label + core_question + evidence_demand + anti_pattern
  - 同时注入Phase 1-3 staging summary (压缩版, ~5K tokens/Agent)

Step 2: 分庭审理 (~8分钟, 2-3 Agent并行)
  - 每个Agent从其席位视角审议Phase 1-3产出
  - 每席位产出: 2个核心判断(每个≥100字) + 1个Kill Switch信号
  - 判断必须引用DM锚点或外部数据源(不接受"风险可控"式空话)

Step 3: 交叉质询 (~5分钟, 串行合成)
  - 单Agent汇总Step 2产出
  - 每个lead_seat向1个对立席位提1个质询(3-4个质询)
  - Bear向全场提1个"最尖锐质询"
  - 被质询席位用数据回应(不可回避)
  - 总质询数: 4-5个

Step 4: 裁决合成 (~4分钟, 单Agent)
  - 共识判断 (2-3条): 方向一致的判断 + 确信度
  - 分歧判断 (2-3条): 方向冲突 + 冲突原因 + 哪方证据更硬
  - 承重墙评估 (≥5行): 替代RT-1, 多视角综合的脆弱度表
  - 偏差诊断 (≥2条): 替代RT-2, 质询中暴露的认知偏差
  - CQ影响: 每个CQ的建议调整方向(上调/维持/下调) + 幅度
  - Executive Summary (≤500字): 3 Key Verdicts, 供Complete直接提取

Step 5: 重合度检测 (~1分钟, 自动)
  - 计算共识率 = 共识判断数 / (共识+分歧)
  - 如果共识率 > 90% → 标记"低多样性警告"
  - 检查Bear的论证是否使用了与多方不同的数据源
```

**Token预算 (Standard版)**:

| Step | Input | Output | 字符 | 时间 |
|------|:-----:|:------:|:----:|:----:|
| S1 身份注入+读取 | 20K | 0 | 0 | 1min |
| S2 分庭审理(并行) | 9K | 18K | ~27K | 8min(wall) |
| S3 交叉质询 | 30K | 8K | ~12K | 5min |
| S4 裁决合成 | 15K | 7K | ~10K | 4min |
| S5 重合度检测 | 2K | 1K | ~1K | 1min |
| **Stage 1合计** | **76K** | **34K** | **~50K** | **~19min** |
| **RT-1+RT-2+RT-3节省** | -37K | -18K | -27K | -23min |
| **净增量** | **+39K** | **+16K** | **~23K** | **-4min(净减)** |

**关键变化 vs SKILL.md v1.0**:
1. 每席位判断从3个降到2个(减少产出体量, 提高密度)
2. 交叉质询从5-7个降到4-5个(减少串行时间)
3. 新增RT-3也被替代(Bear重叠85%, Efficiency Optimizer建议)
4. 新增Executive Summary(Efficiency Optimizer建议)
5. 新增重合度检测(回应Devil's Advocate Q2)
6. 净时间实际减少4分钟(替代RT-1+RT-2+RT-3回收>MPD新增)

### 4.3 产出文件

1. `reports/{TICKER}/data/committee_config.yaml` — Stage 0.5产出, ~4K字符
2. `reports/{TICKER}/staging/S{N}_mpd_verdict.md` — Stage 1产出, ~50K字符

**进入Complete的内容**: Executive Summary(500字) + 承重墙评估表 + 分歧判断(精选) ≈ **3K-5K字符**。其余作为staging过程文件保留不膨胀报告。

---

## 5. 与红队的关系

**最终关系: 替代RT-1+RT-2+RT-3, 保留RT-4~RT-7 + Part B + Part C**

```
Phase 4 执行顺序 (MPD启用时):
    |
    v
[MPD Stage 1: 多视角审议] — 替代RT-1(承重墙)+RT-2(偏差审计)+RT-3(空头钢人) (~19min)
    |
    v
[red-team-suite Part A: RT-4~RT-7] — 保留 (~22min)
    RT-4: 数据质量审计 (委员会不做数据源验证)
    RT-5: 黑天鹅压力测试 (委员会不做尾部事件量化)
    RT-6: 时间框架挑战 (委员会不做有效期评估)
    RT-7: 替代解释 (委员会部分覆盖, 但RT-7的结构化格式更严格)
    |
    v
[red-team-suite Part B: 双向校准] — 保留, 输入含MPD裁决 (~8min)
    |
    v
[red-team-suite Part C: 有效性门控] — 保留, 评估范围含MPD产出 (~5min)
```

**替代逻辑详解**:

| RT | 功能 | MPD覆盖方式 | 替代理由 |
|----|------|-----------|---------|
| RT-1 | 承重墙测试 | 裁决3.6承重墙评估(多视角) | 5个视角评估承重墙 > 单视角。且MPD的交叉质询自然暴露"哪面墙是空心的" |
| RT-1b | 联合概率 | 裁决中整合 | 迁移到MPD裁决, 不改变方法 |
| RT-2 | 认知偏差审计 | 裁决3.7偏差诊断 | 交叉质询检测偏差比自审更有效(一个人很难检测自己的偏差) |
| RT-3 | 空头钢人 | Bear席位核心功能 | Bear与RT-3重叠85%。Bear的"2个核心判断"就是最强空头论点 |
| RT-4 | 数据质量 | **不替代** | 数据源验证需要逐一比对, 不是"视角"问题 |
| RT-5 | 黑天鹅 | **不替代** | 尾部事件需要概率加权量化, 不是"辩论"能覆盖的 |
| RT-6 | 时间框架 | **不替代** | 假设有效期评估需要催化剂日历交叉, 结构化方法更可靠 |
| RT-7 | 替代解释 | **不替代** | 虽然MPD分歧判断部分覆盖, 但RT-7的"同一数据不同解释"格式是独特的, 保留 |

**MPD未启用时(controversy_score < 3)**: RT-1~RT-7全部保留, 回退到现有red-team-suite完整流程。

---

## 6. 输出格式

### 6.1 staging文件格式

`S{N}_mpd_verdict.md` 的结构 (精简版, 从v1.0的SKILL.md调整):

```markdown
# 多视角审议记录
## {TICKER} | 类型: {types} | 日期: {DATE} | 争议度: {controversy_score}/10

---

### Executive Summary (≤500字)
> **供Complete组装直接提取。3个关键裁决:**
> 1. [裁决1 — 共识/分歧 — 一句话]
> 2. [裁决2 — 共识/分歧 — 一句话]
> 3. [裁决3 — 共识/分歧 — 一句话]
>
> **重合度**: {N}% | **低多样性警告**: {是/否}

---

### 一、分庭审理
[每席位: 2个核心判断(每个≥100字) + 1个Kill Switch]

### 二、交叉质询
[4-5个质询 + 回应 + 裁判判定]

### 三、裁决
#### 3.1 共识判断 (2-3条)
#### 3.2 分歧判断 (2-3条) + 证据对比
#### 3.3 承重墙评估 (≥5行, 替代RT-1)
#### 3.4 偏差诊断 (≥2条, 替代RT-2)
#### 3.5 CQ影响评估

### 四、可视化 (≥2张Mermaid)
```

### 6.2 Complete报告中的呈现

MPD产出在Complete报告中**不作为独立章节**，而是:

1. **Executive Summary的3个Key Verdicts** → 嵌入报告的"投资论文"章节(通常Ch2/Ch3)，作为"多视角验证"段落
2. **承重墙评估表** → 嵌入红队/风险章节，与RT-4~RT-7并列
3. **核心分歧** → 嵌入情景分析章节(如"护城河视角vs宏观压力视角在估值上的分歧")
4. **偏差诊断** → 嵌入方法论附录(如有)

**不呈现的内容**: 分庭审理全文、交叉质询详情、重合度检测——这些留在staging作为审计轨迹。

**嵌入总字符**: 3K-5K。**不允许>8K**——否则违反"密度>体量"铁律。

---

## 7. 实施路线图

### 7.1 v0.5: 零架构增量 (立即可部署)

**做什么**: 在现有red-team-suite的RT-1执行之前，增加~300字的"多视角检验"prompt段落。

```markdown
## 多视角检验 (嵌入RT-1 prompt)

在执行承重墙测试之前，从以下3个视角各写1句话(每句≤50字):

1. 护城河视角: 当前股价的最核心承重墙是什么？
2. 宏观压力视角: 什么macro regime会让这个承重墙倒塌？
3. 拆楼视角: 如果只能拆一面墙，拆哪面？

[然后继续执行RT-1标准流程]
```

**变更清单**:
- 修改: `.claude/skills/red-team-suite/SKILL.md` — RT-1 prompt增加~300字
- 新增: 无
- 删除: 无

**成本**: +~800 output tokens/报告 ≈ $0.06
**时间**: +~2分钟
**风险**: 接近零。最坏情况: 3句话重复已有RT-1分析(浪费$0.06)

**验证指标**: 3份报告后检查——这3句话是否至少1次导致RT-1发现了原本不会发现的承重墙？

### 7.2 v1.0: 结构化MPD (v0.5验证后)

**升级条件**: v0.5运行3份报告后，≥2次"多视角检验"段落产出了原RT-1未覆盖的洞见。

**做什么**:
- 修改SKILL.md为本方案中描述的完整MPD流程
- 实施Stage 0.5(战场配置) + Stage 1(多视角审议)
- 修改red-team-suite: 删除RT-1/RT-2/RT-3, 保留RT-4~RT-7
- 增加controversy_score门控(< 3跳过, 3-4 Lite, ≥5 Standard)
- 增加重合度检测

**变更清单**:
- 修改: `.claude/skills/investment-committee/SKILL.md` → 重命名为`multi-perspective-deliberation` + 按本方案重写
- 修改: `.claude/skills/red-team-suite/SKILL.md` — 删除RT-1/2/3, 增加MPD集成说明
- 修改: `docs/deep_dive_protocol.md` — Phase 4流程更新
- 修改: `.claude/skills/deep-reflection/SKILL.md` — R2增加"视角覆盖度扫描"(原SKILL.md v1.0已有此设计)
- 新增: `scripts/mpd_controversy_score.sh` — 自动计算controversy_score

**成本**: +$2-3/报告(净增), ~10min净增时间
**风险**: 中等。需要在3份报告中微调权重算法和交叉质询质量

### 7.3 v1.1: 数据驱动优化 (v1.0运行5份报告后)

**做什么**:
- 基于5份MPD实测数据，校准权重算法
- 引入"AI内化度折扣"(Efficiency Optimizer建议): 对AI训练数据中某大师×某行业覆盖度高的组合降权，强化"客场冲击"价值
- 评估RT-7是否也可合并(MPD分歧判断vs RT-7替代解释的实际重叠度)
- 固化"哪些公司类型的MPD价值最高"的ROI排序

**永不做**:
- Full版7引擎4轮辩论 — token效率ROI为负(Efficiency Optimizer已证明)
- 独立的大师Agent文件 — 保持即时身份注入的零文件复杂度优势
- 在Phase 1-3中途介入 — 破坏并行效率，信息不完整时审议=噪音

---

## 8. 成功指标

### 8.1 可量化指标

| 指标 | 测量方法 | v0.5基线 | v1.0目标 | 失败阈值 |
|------|---------|:--------:|:--------:|:--------:|
| **洞见增量率** | MPD产出的判断中, 多少%在RT-4~RT-7/Phase 1-3中未被覆盖 | ≥1/3句 | ≥30% | <15% |
| **偏差校正幅度** | MPD导致的CQ调整幅度(pp) | N/A | ≥3pp均值 | <1pp(表演性) |
| **重合度** | 共识率(越低=多样性越高) | N/A | 40-70% | >90%(失败) |
| **组装采纳率** | MPD产出进入Complete的比例 | N/A | 70-90% | <50%(说明产出质量低) |
| **净时间影响** | MPD耗时 - 替代RT耗时 | +2min | -4min(净减) | >+15min |

### 8.2 定性指标

1. **"如果没有MPD，这份报告会怎样？"测试**: 每份报告Complete后，回顾MPD裁决，评估哪些判断改变了报告的核心论点。如果答案是"没有任何改变"——MPD在该类型公司上应降级或跳过。

2. **用户反馈**: 报告读者是否觉得"多视角验证"段落增加了可信度，还是觉得是filler？

3. **与历史对照**: 使用MPD的报告 vs 未使用MPD的同类型报告，质量评分是否有统计显著提升。至少需要5+5=10份报告才能初步比较。

### 8.3 失败退出条件

如果以下任一条件触发，MPD应退回到上一个版本或完全移除:

- v0.5运行3份报告后，0次产出未覆盖洞见 → 不升级到v1.0
- v1.0运行5份报告后，平均偏差校正<1pp且洞见增量率<15% → 退回v0.5
- v1.0运行5份报告后，重合度>90%且3份以上 → 退回v0.5(模型多样性假设不成立)
- 任何版本导致Tier 3总时长增加>20%(净) → 审查并降级

**退出的心理准备**: Devil's Advocate可能是对的——同一模型的视角旋转可能不产出实质性多样性。方案的设计允许快速验证并快速退出，而不是建了一个大系统然后沉没成本锁定。

---

## 9. 与deep-reflection的集成

采纳Integration Strategist的R3增强建议，但简化:

### R2增强: 视角覆盖度扫描

```
在R2 Part 2(报告结构映射)之后:
  读取 committee_config.yaml 和 mpd_verdict.md
  检查: 哪些高权重席位的核心关切在报告正文中覆盖不足?
  输出: | 视角 | 权重 | 核心关切 | 报告覆盖度 | 补救建议 |
```

### R3增强: 多视角完整度评分

```
D7: 多视角完整度 (新增维度)
  0分 = 单一叙事(纯多头或纯空头)
  1分 = 有多视角但未量化冲突
  2分 = 有结构化的共识/分歧量化 + 偏差诊断
```

---

## 10. 总结: 方案核心原则

1. **诚实标签 > 伪权威**: 用"护城河视角"不用"巴菲特认为"
2. **验证前置 > 一步到位**: v0.5→v1.0→v1.1, 每步有明确升级/退出条件
3. **替代 > 叠加**: MPD替代RT-1/2/3, 净时间减少4分钟, 不是新增一个独立流程
4. **密度 > 体量**: 50K staging产出, 仅3-5K进入Complete
5. **退出权 > 沉没成本**: 任何版本都可回退, v0.5成本$0.06, 失败损失可忽略
6. **门控 > 强制**: controversy_score决定是否启动, 不是每份报告都跑MPD
7. **执行纪律 > 新框架**: MPD的优先级永远低于已知执行缺陷的修复(Devil's Advocate核心洞见)

---

## 附录A: SKILL.md v1.0 → v1.0-revised 变更清单

| 项目 | v1.0 | v1.0-revised | 变更理由 |
|------|------|-------------|---------|
| 系统名 | 动态投资委员会 | 多视角审议(MPD) | 避免虚假权威 |
| 外部标签 | "Buffett庭" | "护城河视角" | 同上 |
| 每席位判断数 | 3个 | 2个 | 密度>体量 |
| 交叉质询数 | 5-7个 | 4-5个 | 减少串行时间 |
| 替代RT范围 | RT-1+RT-2 | RT-1+RT-2+RT-3 | Bear重叠85% |
| Executive Summary | 无 | ≤500字 | 降低组装成本 |
| 重合度检测 | 无 | 共识率>90%警告 | 回应多样性质疑 |
| 门控 | 无 | controversy_score < 3跳过 | 低ROI场景避免浪费 |
| 消费品特化 | 行业适配表 | cathie强制OFF + dalio/ackman+权重 | Historical Validator |
| 时间预算 | +25min(+10net) | +19min(-4net) | 替代RT-3回收时间 |
| Mermaid | ≥3张 | ≥2张 | 减少格式开销 |
| 质量门控 | 15项 | 12项(合并3项) | 减少检查开销 |

## 附录B: 与现有SKILL.md的文件映射

```
现状:
  .claude/skills/investment-committee/SKILL.md  (v1.0, 540行)

v0.5 (立即):
  .claude/skills/red-team-suite/SKILL.md        (修改: RT-1 prompt增加300字)
  .claude/skills/investment-committee/SKILL.md   (不修改, 保留备用)

v1.0 (3份报告后):
  .claude/skills/investment-committee/SKILL.md   (重写: 按本方案修订)
  .claude/skills/red-team-suite/SKILL.md         (修改: 删除RT-1/2/3, 增加MPD集成)
  scripts/mpd_controversy_score.sh               (新增)
  docs/deep_dive_protocol.md                     (修改: Phase 4流程)
```

---

*R2 最终方案 Complete — Agent C 交叉质询综合者 — 2026-03-06*
*基于6个R1 Agent的建议 + investment-committee SKILL.md v1.0 + 31份报告实证数据*
