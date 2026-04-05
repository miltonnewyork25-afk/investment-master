# Investment Research Harness v3.0 — Master Specification

> **架构**: Planner-Generator-Evaluator 三角色分离
> **产出**: 后台审计版 + 前台成品版（双轨制）
> **核心升级**: Sprint Contract + 后置Lens Crystallization + 前台重组 + 确定性Hooks

---

## 1. Purpose

本系统的目标不是写出"更全"的报告，而是：
1. 后台极深、前台极清晰的研究产品
2. 开头就给读者最值钱的判断，而不是先暴露研究过程
3. 由后发现的 Top 5 核心视角统领全文
4. 经得起反方攻击、偏差校正与无痕化处理

---

## 2. Global Principles

1. 先研究，再结晶，再前置。
2. Lens Seed 不等于最终 Lens。
3. 交付成品前必须形成并前置 Top 5 核心视角。
4. 正文主结构必须反向接受最终 Top 5 的约束。
5. 生成与评估必须分离（Generator ≠ Evaluator）。
6. 最终成品只允许一个真相版本。
7. 保留反方结论，隐藏反方过程。
8. 深度留在后台，清晰出现在前台。
9. 前台只展示读者决策真正需要的内容。
10. 每轮循环必须引入meaningful angle gain，否则不执行。

---

## 3. Three-Role Architecture

### Planner Agent
- 每Phase开始前产出Sprint Contract
- 决定动态加载哪些额外Agent
- 管理Phase状态机转换
- 不执行研究，不做评判

### Generator Agent（角色随阶段切换）
- Phase 0: Research Foundation模式（P0-P3识别 + Reverse DCF + 数据收集）
- Phase 1-2: Deep Research模式（五维分析 + 驱动图 + 复杂度修正���
- Phase 3: 按Evaluator回流指令修正（Generator服从Evaluator）
- Phase 4: Lens Crystallization模式（Part A: A3-A9）
- Phase 5: Editorial Frontend模式（Part B: 前台重组 + 双版本产出）

### Evaluator Agent（独立，有veto权）
- 每Phase结束后独立评判（不读Generator的自评）
- Phase 3主导红队攻击（Evaluator是主角，Generator执行修正）
- Phase 5最终审计（Part C: C1-C6 + 无痕化检查）
- 可发出三种verdict: PASS / REVISE / REJECT

---

## 4. Phase Flow（六阶段 + Sprint Contract）

### Phase 0: Foundation
**Planner产出**: `sprint_contract_P0.yaml`
**Generator执行**:
- P0-P3识别（原型/定价公式/资产身份/时间框架）
- Reverse DCF（先翻译"市场在买什么"）
- 可比公司锚（最相似peer的PE/增速对比）
- 数据收集（MCP + WebSearch + 双源交叉验证��
- 数据口径标注（实体/口径/来源URL）
- SBC哲学声明（GAAP/NonGAAP/Owner FCF立场）
**输出**: `research_state.yaml` + `lens_seed_registry.yaml` + `shared_context.md`
**Evaluator验证**:
- 口径标注完整性
- Reverse DCF已完成且方向合理
- 可比公司存在且PE/增速对比完成
- 数据≥2源交叉验证声明

### Phase 1-2: Deep Research
**Planner产出**: `sprint_contract_P1.yaml`（含强制项清单）
**Generator执行**:
- 按五维分析展开（价值池→竞争地位→经济引擎→价值分配→预期差）
- 每模块结尾记录Lens Seeds（2句话：深层视角 + 变量排序变化）
- 强制分析项（由Sprint Contract指定）:
  - 增长归因分解（量×价×混合×并购）
  - 定价权分层（多层客户结构时：高端vs低端剪刀差）
  - NRR分层（SaaS公司：大客户/中型/SMB）
  - 预期差显式分析（市场在定价什么 vs 我们认为什么）
  - 认知边界评估（黑箱比例/可推演度）
**输出**: staging文件 + lens seeds更新 + CI注册表
**Evaluator验证**:
- 证据链完整性（每核心论点≥数据+因果+反面）
- CI方向分布（≥2偏空，否则REJECT）
- 断言/论证比例（断言<30%）
- Sprint Contract强制项全部覆盖
- 因果密度≥5.0/万字
- 圆桌讨论结论已集成（如触发）
- **First-Principles逼问深度**（E11）: Top 3-5变量是否执行≥3轮因果链追溯？lens_seed_registry中type=first_principles seeds≥3？

### Phase 3: Adversarial
**Planner产出**: `sprint_contract_P3.yaml`
**Evaluator主导**（Phase 3特殊：Evaluator是主角）:
- 红队七问攻击（RT-1~RT-7）
- 承重墙审计（Top 5是否改变了承重墙排序）
- 偏差校准（系统性偏多/偏空检测）
- 双向校准（CQ全下调=系统偏差→要求至少1个上调）
- 飞轮验证（任何"飞轮"声称必须通过三条验证）
- 估值方法独立性审计（独立方法≥2.5）
**Generator执行**: 按Evaluator产出的`revision_backflow_table.yaml`修正staging���件
**输出**: 修正后的staging + backflow table + eval_verdict_P3.yaml
**硬规则**:
- 红队前后核心数字差异≠0（否则红队太弱→REJECT）
- 回流必须修改摘要、正文、估值、评级（不得只新增红队章节）
- 最终成品只允许一个真相版本

### Phase 4: Crystallization
**Generator执行**: Lens Crystallization Skill（Part A全流程）
- A3: 从完整草稿反向提炼Top 10候选后发现视角
- A4: Lens Quality Gate（6条筛选：整篇压缩结果/跨章节/改变承重墙/验证路径/删掉变浅/值得前置）
- A5: Top 10 → Top 5 排序
- A6: Lens-to-Model Transmission（每个lens打在哪个一阶变量/如何影响估值/验证数据）
- A7: Late Angle Gate（变量/时间/机制/预期/决策五维夹角）
- A8: Front Recomposition Plan（新开头顺序/Top 5卡片/删除-后移清单/章节重排/缩短低价值段）
**输出**: lens_seed_registry(final) + top5_lenses.yaml + chapter_to_lens_map.md + front_recomposition_plan.md
**Evaluator验证**:
- Lens Quality Gate 6条全PASS
- Late Angle Gate夹角够大
- 每个Top 5 lens都能传导到模型层
- Top 5是判断不是问题/章节标题

### Phase 5: Assembly
**Generator执行**: Editorial Frontend Skill（Part B）+ 组装
- 围绕Top 5重组全文（不是按Phase顺序拼接）
- 产出双版本:
  - **前台成品版** `{TICKER}_Complete_v{X}.md`：无痕化、Top 5前置、先答案后证明
  - **后台审计版** `{TICKER}_Audit_v{X}.md`：保留DM/Phase/backflow全部审计线索
- 前台开头顺序: 一句话结论 → Top 5 Cards → 市场在定价什么/可能错在哪 → 3-5关键数字 → 承重墙与失效条件 → 正文
- 每章必须服务Top 5（chapter_to_lens_map无空行）
**输出**: 双版本报告 + assembly_manifest.yaml
**Evaluator验证（Part C全流程）**:
- C1结构审查: Top 5真实前置 + 正文围绕Top 5展开
- C2证据审查: Top 5全部有证据支撑 + 事实→机制→投资含义闭环
- C3承重墙审计: Top 5改变了承重墙排序 + 无系统性偏差
- C4红队验证: 红队已实质影响结论（Phase 3产出确认）
- C5回流验证: 所有修正已回流 + 全报告数字单一版本
- C6无痕化: 零内部标签残留 + 零过程痕�� + 零旧数字残留

### Phase 5.5: Final Gate
**Hooks自动执行**: 30项确定性检查（见Section 8）
**Evaluator最终判定**: PASS / REVISE / REJECT
**人工确认**: 用户最终审核

---

## 5. Sprint Contract Mechanism

每Phase开始前，Planner产出Sprint Contract，Generator和Evaluator都读取。

### Contract必须包含：
```yaml
phase: "Phase N"
objective: "本阶段要回答什么问题"

generator_deliverables:
  - 具体产出物及字符预算
  - 强制分析项（根据P0-P3识别动态生成）
  - Lens Seeds记录要求
  - DM锚点密度底线

evaluator_criteria:
  - 评判维度及权重
  - 通过阈值
  - 特别关注项（根据历史教训动态生成）

pass_conditions:
  - 全部deliverables已提交
  - Evaluator评分≥7/10每项
  - 无fatal issues

on_fail:
  minor: "Generator修正特定section，重新评估"
  major: "回到Planner，重新scope本Phase"
  fatal: "升级到用户"

cost_budget:
  max_iterations: 2  # 每Phase最多2轮Generator-Evaluator循环
  meaningful_angle_required: true  # 第2轮必须证明新角度
```

### Contract中的强制项（根据P0-P3动态路由）：
| P0-P3识别信号 | 强制加入Contract的分析项 |
|--------------|------------------------|
| SaaS公司 | NRR分层 + SBC η效率 + 三PE并列 |
| 多层客户结构 | 定价权分层（剪刀差） |
| 混合体(M0) | 分部拆解 + 分部估值 |
| 市值>$500B | 巨头估值框架（什么条件下便宜/贵） |
| 周期性行业 | 穿周期OE + 周期位置识别 |
| 黑箱比例>40% | 认知边界强化评估 |
| 事件驱动 | 每Phase重新获取价格快照 |

---

## 6. Dual Output（双版本产出）

### 前台成品版（读者版）
- **开头**: 一句话结论 → Top 5 Cards → 市场定价/错看 → 关键数字 → 承重墙 → 正文
- **无痕化**: 零DM锚点 / 零Phase标签 / 零内部编号 / 零过程痕迹
- **数据归属**: 关键数据保留来源归属（"来源：FY2025 10-K, p.47"），不用DM-xxx格式
- **Top 5 Card格式**:
  ```
  视角标题
  一句话判断（不是问题）
  市场是否已定价
  关键投资含义
  ```
- **禁止出现**: 方法论自述 / 框架版本 / 阶段编号 / 评分系统 / 口径说明 / 内部变量名

### 后台审计版（分析师版）
- 保留所有DM锚点
- 保留Phase标记和产出记录
- 保留revision_backflow_table
- 保留Evaluator verdict历史
- 保留Sprint Contract和评判记录
- 保留Lens Seed Registry演化过程

### 映射关系
- `assembly_manifest.yaml`记录前台↔后台的章节映射
- 前台版本的任何数字都能在后台版本追溯到DM锚点

---

## 7. Part A: Late-Stage Lens Crystallization（Phase 4 Skill）

### Lens Seed Registry（Phase 0-2持续维护）
每个Seed记录：
- Seed标题 + 来源章节
- 一句话描述
- 打在哪个底层变量
- 当前成熟度（embryonic / developing / mature）
- 是否可能影响估值/承重墙/评级
- 是否可能与市场预期有关

### Crystallizer（A3: Phase 4执行）
**输入**: 完整草稿 + Seed Registry + 核心矛盾 + 承重墙表 + 估值模型 + 红队结果 + Kill Switch
**必须找出**:
- 全稿中反复出现但未被前置的底层变量
- 跨章节才能成立的交叉视角
- 真正改变了承重墙排序的变量
- 真正改变市场预期理解的变量
**输出**: Top 10候选后发现视角

### Lens Quality Gate（A4）
每个候选必须通过6条：
1. 是整篇报告的压缩结果，不是单章节观点
2. 整合了多个章节
3. 改��了承重墙、估值或市场预期理解
4. 有清晰验证路径
5. 删掉它后，整篇报告明显变浅
6. 值得被提到最前面

### Lens Ranking（A5: Top 10 → Top 5）
排序标准：整篇最深的一刀 > 压缩多章节 > 改变承重墙 > 改变估值 > 非共识结晶 > 适合前置

### Lens-to-Model Transmission（A6）
每个Top 5 lens必须回答：
- 打在哪个一阶变量
- 如何影响收入/利润率/资本效率/估值倍数
- 影响短期、中期还是长期
- 当前模型是否已显式反映
- 若未反映，应修改哪个情景/参数/权重
- 哪些数据或事件能验证
- 若成立，最该重估哪一条承重墙

### Late Angle Gate（A7）
五维夹角评估：变量层 / 时间��� / 机制层 / ��期层 / 决策层
若夹角不够大 → 不值得做大规模前台重组

### Front Recomposition Plan（A8）
输出：新开头顺序 + Top 5卡片内容 + 删除/后移清单 + 章节重排 + 缩短低价值段

### Search Budget（A9）
- Crystallizer主循环：1次
- 补充循环：最多1次
- 候选：最多10个
- 最终Top 5：必须在2轮内收敛

---

## 8. Part B: Editorial Front-End（Phase 5 Skill）

### Front-End Principles
1. 先结果，后解释
2. 先压缩，后展开
3. 先给读者答案，再给研究者过程
4. 前台只保留最承重的内容
5. 每一章都必须证明自己为什么值得读
6. 方法论退到后台，结论与证据留在前台
7. 视角卡片优先于目录说明、口径说明、框架说明

### Opening Structure
```
1. 一句话结论
2. Top 5 Core Investment Lenses（Cards）
3. 市场当前在定价什么 / 市场可���错在哪里
4. 3-5个最重要数字或最重要矛盾
5. 承重墙与失���条件摘要
6. 正文主体
```

### Top 5 Card Rule
每张卡片包含：视角标题 / 一句话判断 / 市场是否已定价 / 关键投资含义
**禁止**: 写成章节标题 / 写成开放式问题 / 写成方法论术语堆砌

### Chapter Earning Rule
每章必须回答：
- 服务于哪一个Top 5视角
- 证明了什么（不是仅补充了什么）
- 若删掉，哪个核心判断明显变弱
不通过 → 删除 / 压缩 / 降级到附录

### Prose Rules
- 减少自我解释痕迹和"框架在说话"的感觉
- 允许轻重不对称：最重要写长，次要写短
- 避免为完整性平铺所有角度
- 避免研究流程语言暴露给读者
- 避免重复证明同一结论
- 避免伪精确

---

## 9. Part C: Adversarial Audit（Evaluator内置）

### C1 结构审查
- 最核心的3个问题是否清楚
- Top 5是否真实前置（不是形式封面）
- 正文是否围绕Top 5展开
- 前台是否仍被低价值系统信息占据

### C2 证据与因果审查
- Top 5是否都获得足够证据支撑
- Top 5是否都完成事实→机制→投资含义闭环
- 是否存在因果跳步或无证据断言

### C3 承重墙与偏差审计
- Top 5是否真的改变了承重墙排序
- 是否存在系统性偏多/偏空
- 是否存在篇幅不对称
- 是否存在伪���确

### C4 红队攻击验证
- 最先攻击哪一个Top 5视角
- 若被打穿，全文如何变化
- 哪些结论、数字、图表必须修改

### C5 回流修正验证
- 不得只新增红队章节
- 必须修改��要、正文、估值、图表、评级、风险页
- Top 5被校正时，摘要最前面的Top 5必须同步回流
- 全报告只允许一个真相版本

### C6 无痕化检查
**必须移除**: Phase/RT/CQ/KS/DM标签 / 回流过程 / 旧数字旧判断 / 模板化重复 / 工具编号 / 伪精确小数与概率
**必须保留**: 最终结论 / 最终Top 5 / 最终证据链 / 最终边界 / 最终风险 / 最终监控变量

### Evaluator Veto Conditions
以下任一触发 → REJECT（不是REVISE）:
1. Top 5只是漂亮提纲，没有真实改变正文结构或模型
2. 核心结论没有证据支撑
3. 关键数字无法追溯
4. 红队未造成任何实质修正
5. 内部过程痕迹严重污染前台成品

### Evaluator Output
```yaml
verdict: PASS / REVISE / REJECT
top_fatal_issues: []
bias_audit_table: {}
load_bearing_wall_audit: {}
revision_backflow_table: []
seamless_packaging_checklist: {}
```

---

## 10. Hooks Specification（确定性硬控制）

> **v23.0修复(LITE灾���后)**: 所有hooks必须返回真实exit code。
> **Claude Code hook exit code**: exit 0=继续, **exit 2=阻断(唯一阻断码)**, exit 1/其他=继续(仅���志)。阻断时stderr输出原因。

### 过程中评估Hooks — PreToolUse（��入时实时拦截）
```bash
# H1: staging文件写入>=15K硬阻断 [本次修��� — settings.json PreToolUse]
wc -m content < 15000 → exit 1 (BLOCK)

# H1b: Complete文件写入>=100K硬阻断 [本次修复 — settings.json PreToolUse]  
wc -m content < 100000 → exit 1 (BLOCK)
```

### Phase Gate Hooks（每Phase结束时���动执行）
```bash
# H2: Phase产出<目标30%硬阻断 [本次修复 — phase_sentinel.sh check_block]
TOTAL_CHARS < TARGET*30% �� exit 2 (BLOCK，不可绕过)

# H3: DM密度检查 [已实现 — phase_sentinel.sh Layer 3]
grep -c 'DM-' staging/*.md / wc -m × 1000 ≥ 0.8

# H4: 因果密度检查 [已实现 — phase_sentinel.sh Layer 3]  
grep -cE '因为|因此|这意味着' staging/*.md / wc -m × 10000 ≥ 5.0
# 注意：密度指标在字符<100K时标注"样本不足"(Anti-Gaming Rule)

# H4b: Evaluator verdict验证 [本次修复 — phase_complete.sh Step 4.5]
# verdict文件不存在=BLOCK / verdict=REJECT=BLOCK

# H4c: Python估值验证 [已实现 — phase_sentinel.sh Layer 3]
test -f data/valuation_model_output.yaml
```

### Assembly Hooks（Phase 5组装时自动执行）
```bash
# H5-H10: 前台无痕化检查 [本次修复 — PostToolUse Write hook]
grep -iE '^#+.*Phase [0-9]' final_report.md → 0 matches
grep -E 'DM-[A-Z]+-[0-9]+' final_report.md → 0 matches
# ...（完整列表见adversarial-evaluator.md C6）

# H11: 仓位建议检查 [本次修复]
# H12: 台���合规 [本次修复]
# H13: Chapter-to-Lens映射 [未实现]
# H14: 估值数字一致性 [未实��]
# H14b: Phase 5自动quality_gate [本次修复 — phase_complete.sh Step 4.7]
```

### Data Integrity Hooks（Phase 0数据收集时）
```bash
# H15: 数据口径标注 [未实现]
# H16: ≥2源交叉验证 [未实现]
```

### 10.1 Anti-Gaming Rules（密度指标防滥用，v23.0新增）

> **源自LITE灾难**: 7.6K报告DM密度2.23/千字"超标杆"——分母太小导致机械性虚高。

1. **字符<100K时，密度指标自动标注"样本不足，不可作为质量证据"**
2. 字符<char_budget的50%时，密度PASS不能抵消体量FAIL
3. Evaluator不得用密度指标为短报告辩护
4. **禁止发明框架中不存在的报告品类来合理化低产出**

### 10.2 过程中评估规范（In-Process Evaluation，v23.0新增）

> **源自LITE灾难**: 所有检查都在Phase完成后，过程中零评估。

| 层 | 时间点 | 检查 | 强制级别 |
|----|--------|------|---------|
| L1 | 每章写完 | 字符≥8K | Generator协议（文本级） |
| L2 | Phase 50% | 累计≥目标30% | Generator协议（文本级） |
| L3 | **staging写入时** | **字符≥15K** | **PreToolUse hook（代码级）** |
| L4 | Phase完成后 | ≥目标30% + Evaluator verdict | **脚本级（不可绕过）** |

L3是核心防线。L1/L2是Generator自律，L3/L4是代码强制。

---

## 11. Dynamic Agent Loading

### 触发规则（Planner在Phase 0读取P0-P3后决定）
| 识别信号 | 加载Agent | 理由 |
|---------|----------|------|
| M0混合体 | segment-decomposer | 不同引擎不能混着看 |
| SBC/Rev>5% | owner-economics | 三PE + SBC η效率 |
| 多层客户结构 | pricing-power-stratifier | 剪刀差分析 |
| PW≥7 | discovery-system | 需要350K+体量 |
| 行业首次分析 | industry-module-builder | 无现成行业模块 |
| 市值>$500B | megacap-valuation | 从"值多少"转向"什么条件下便宜/贵" |

### 约束
- 最多同时3个额外Agent
- 每个必须证明Generator自身无法覆盖的角度
- Evaluator对所有Agent产出有审计权
- Planner在Sprint Contract中声明加载哪些

---

## 12. Cross-System Rules

1. 没有完成Phase 4 Crystallization，不得交付前台成品
2. 没有完成Part B Editorial，不得定稿摘要与目录
3. Evaluator有权否决任何Phase的产出
4. 若Evaluator判断Top 5不稳/已被定价/没有改变正文结构 → 回到Phase 4修正
5. 所有最终估值、评级、承重墙、Kill Switch、摘要前置视角，必须使用回流后的最终版本
6. Sprint Contract是每Phase的协商产物，不是固定模板

---

## 13. Success Criteria

一份合格的最终产品必须满足：
1. 开头就有5个真正值钱的核心视角
2. 这5个视角都写成判断，而不是问题
3. 这5个视角都回答了市场是否已定价
4. 这5个视角都能传导进模型或承重墙系统
5. 正文主要章节都服务于这5个视角
6. 前台低阻力、后台高审计
7. 红队已实质影响结论
8. 所有修正已回流
9. 前台版本无明显过程痕迹
10. 全文只保留最终唯一版本

---

## 14. File Architecture

```
CLAUDE.md                                    ← 宪法（~80行）
.claude/agents/
  planner.md                                 ← Planner Agent
  research-generator.md                      ← Generator Agent
  adversarial-evaluator.md                   ← Evaluator Agent
.claude/skills/
  sprint-contract/SKILL.md                   ← Sprint Contract协商
  research-foundation/SKILL.md               ← Phase 0: P0-P3 + 数据
  deep-research/SKILL.md                     ← Phase 1-2: 五维分析
  lens-crystallization/SKILL.md              ← Phase 4: Part A
  editorial-frontend/SKILL.md                ← Phase 5: Part B
  [existing tool skills preserved]           ← 保留的分析工具skills
.claude/rules/
  [existing rules preserved]                 ← 铁律按需加载
.claude/settings.json                        ← Hooks配置
docs/
  harness_spec_v3.md                         ← 本文档（master reference）
  research_philosophy.md                     ← 研究哲学详细版
  deep_dive_protocol.md                      ← 深度协议（更新为v3.0流程）
templates/
  sprint_contract_template.yaml              ← Contract模板
reports/{TICKER}/
  {TICKER}_Complete_v{X}.md                  ← 前台成品版
  {TICKER}_Audit_v{X}.md                     ← 后台审计版
  data/
    sprint_contract_P{N}.yaml                ← 各Phase的Contract
    lens_seed_registry.yaml                  ← Lens Seeds
    top5_lenses.yaml                         ← 最终Top 5
    chapter_to_lens_map.md                   ← 章节→Lens映射
    front_recomposition_plan.md              ← 前台重组计划
    eval_verdict_P{N}.yaml                   ← Evaluator判定记录
    revision_backflow_table.yaml             ← 回流修正表
    assembly_manifest.yaml                   ← 双版本映射
```

---

## 15. Priority Order（When Tradeoffs Are Necessary）

1. True core lenses over broad coverage
2. Correct load-bearing walls over polished prose
3. Strong evidence chains over elegant abstraction
4. Honest narrowing over false completeness
5. Frontend clarity over visible backend sophistication
6. Decision density over report length
7. Meaningful angle gain over iteration count

Never sacrifice the most important judgments to preserve structure, symmetry, or framework visibility.
