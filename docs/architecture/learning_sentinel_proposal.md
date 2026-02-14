# Scout Agent 规格 v2.0 — Phase 0 参考报告学习

> **状态**: 规格 (已设计，待首次报告验证)
> **来源**: 生态科技worktree用户反馈 (2026-02-14) + master评审优化
> **前身**: Learning Sentinel 提案 → 改名避免与 quality_sentinel.sh 混淆

---

## 1. 问题诊断

当前复利飞轮存在一个断裂环节：

```
做完报告 → 事后反思 → 编码教训到docs/ → ??? → 下一份报告启动
                                           ↑
                                      这里断了
```

**教训写了，但下次没人系统性消化。** 具体表现：

- `compound_learning_flywheel.md` 有16条实证教训，但Phase 0/0.5没有Agent去读取和应用
- `find_best_reference.sh` (铁律H) 只找到最佳版本，没有深度提取可复用模式
- Agent A/B/C v7.1 是执行阶段身份，规划阶段没有专门的学习角色
- 每次新报告启动时，框架知识靠CLAUDE.md被动加载，不是主动从优秀报告中提取

**实证**: 每次"学习前作"都显著提升了下一份报告质量：

| 场景 | 学习来源 | 效果 |
|------|---------|------|
| GOOGL v4.0 | 参考AMD v9.0教训 | 密度从33→44/万，标注质量飞跃 |
| TSLA v3.0 | 参考LRCX v9.0框架 | 首次完整落地零仓位建议 |
| PLTR v3.1 | 参考GOOGL v4.0结构 | DM锚点从自由文本→结构化 |
| AMD v2.0 | 参考LRCX Agent配置 | 首次3Agent P5铁律严格执行 |

但这些学习都是**隐式的**（靠MEMORY.md和用户提醒），不是系统性的。

---

## 2. Scout Agent 定义

### 定位

- **不是**第四个执行Agent（Agent A/B/C负责执行）
- **是**Phase 0的一次性学习任务，产出供Agent A/B/C消费的参考基准
- 在 `find_best_reference.sh`(铁律H) 之后、Phase 0.5 CQ提取之前执行

### 身份 (v7.1格式)

```yaml
scout:
  identity: |
    你是一位研究方法论专家，专注于从优秀报告中提取可迁移的分析模式。
    你的核心信念是：学习 ≠ 模仿。你提取的是"在什么情境下用什么方法
    效果好"，而不是"参考报告有多少X"。数量指标（标注密度、Mermaid数量）
    是好分析的副产品，不是目标——复制数量不会复制质量。
    你同样关注优秀报告中仍然存在的弱点，因为避免失败和学习成功同样重要。
  quality_bar: |
    好的教训提取 = 读者看完后知道"在什么场景下用什么方法"，而不是
    "参考报告有多少X"。每条教训有明确的适用条件和不适用条件。
    5条教训中至少1条是反面教训（参考报告的弱点/可改进之处）。
  this_session: "{编排器填入: 参考{REF_TICKER}为{TICKER}提取学习基准}"
  scope: ["分析模式提取", "方法论对比", "弱点识别", "跨报告学习"]
  anti_scope: ["执行分析", "写报告内容", "估值计算", "数据收集"]
  output_target: "3-5K chars (5条教训)"
  output_file: "reports/{TICKER}/data/scout_baseline.md"
  stop_condition: "产出5条教训，每条有适用条件+不适用条件"
```

### 防模仿约束 (核心)

Scout Agent的prompt中必须包含以下禁令：

```yaml
anti_imitation:
  禁止提取:
    - 数量指标: "参考报告有124张Mermaid" → 这不是教训
    - 格式模板: "参考报告用了29个H1" → 结构可以不同
    - 排版细节: "参考报告用了什么表格样式" → 无关分析质量
  必须提取:
    - 方法在场景中的效果: "GOOGL在CapEx分析中用Reverse DCF反推隐含ROIC，
      这让'$175B花得值不值'有了定量框架，而不是停留在'CapEx很多'"
    - 失败模式: "参考报告Phase 4只占15%篇幅(低于18%门控)，说明
      看空深度不足，本次应在Phase 4分配更多Agent资源"
    - 可观测的质量差异: "参考报告的Kill Switch有明确阈值('市占率
      连续2季下降>2pp')，而非空泛描述('如果竞争加剧')"
```

---

## 3. 执行流程

### 两阶段执行: 脚本扫描 → LLM精读

```
Phase 0 启动
    │
    ├── Step 1: find_best_reference.sh {TICKER}     # 铁律H: 找到最佳参考
    │           → 输出: 参考报告路径
    │
    ├── Step 2: scout_scan.sh {参考报告} {TICKER}    # 脚本: 快速指标扫描
    │           → 输出: 结构化指标 + 关键章节行号定位
    │           → 成本: 0 tokens (纯bash)
    │
    ├── Step 3: 读参考报告checkpoint + Agent产出基线 (v2.0新增)
    │           → 读取: 参考报告的checkpoint.yaml
    │           → 提取: 每Phase Agent数, 每Agent字符数, Phase分配比例
    │           → 输出到scout_baseline.md: "参考报告Agent产出基线"节
    │           → 示例: "GOOGL P2 Agent C-2: 45K chars, 3个Mermaid, 覆盖CQ2/CQ5"
    │           → 成本: 0 tokens (读yaml)
    │
    ├── Step 4: 读参考报告staging前5行 + Agent Prompt基线 (v2.0新增)
    │           → 读取: 参考报告的staging/*.md前5行
    │           → 分析: Agent prompt结构, 任务粒度, 深度标准
    │           → 提取: 产出最高的Agent用了什么prompt模式
    │           → 输出到scout_baseline.md: "Agent Prompt基线"节
    │           → 成本: ~2K tokens (只读前5行)
    │
    ├── Step 5: 设定本次报告执行参数 (v2.0新增)
    │           → per_agent_min_chars = 参考报告per_agent均值 × 80%
    │           → supplement_trigger: 任何CQ置信度<40% → 标记需Supplement
    │           → total_target = max(plan_target, 参考报告 × 60%)
    │           → 输出到scout_baseline.md: "执行参数"节
    │
    ├── Step 6: Scout Agent (LLM)                    # 精读: 只读5个关键章节
    │           → 输入: scout_scan.sh输出 + 5个章节内容 + Step 3-5基线数据
    │           → 输出: scout_baseline.md (5条教训 + 基线数据 + 执行参数)
    │           → 成本: ~15K tokens (只读精选章节，不读全文)
    │
    └── Step 7: 注入Agent A/B/C prompt               # 编排器负责
                → 后续Agent dispatch时附带scout_baseline.md路径
                → 包含per_agent_min_chars和supplement_trigger参数
```

### 触发条件

| 条件 | 行为 |
|------|------|
| 用户指定参考报告 | **强制触发** Scout Agent |
| 同行业有≥250K的Complete报告 | **自动推荐**，用户确认后触发 |
| 首份行业报告/无参考可用 | **跳过**，Scout不执行 |
| 用户提供外部研报(非本框架) | **触发**，但Scout只提取方法论模式，忽略格式差异 |

### Scout精读的5个章节 (由scout_scan.sh定位行号)

1. **Phase 4/红队** — 看空论点质量、RT-1~7回答深度、Bear Case说服力
2. **Phase 5/综合评估** — 估值收敛方式、CQ闭环质量、评级推导逻辑
3. **Reverse DCF** — 隐含假设提取方式、承重墙脆弱度评估
4. **Kill Switch注册表** — 可观测阈值的具体性、触发后动作的实用性
5. **CI/非共识洞察** — 洞察发现路径（如何从数据到非共识判断）

---

## 4. 输出格式

### scout_baseline.md 模板

```markdown
# Scout Baseline — 从{REF_TICKER} v{VER}学习

> 参考报告: {文件名} ({字符数}K, {框架版本})
> 当前项目: {TICKER}
> 扫描时间: {日期}

## 参考报告Agent产出基线 (v2.0 Step 3)
| Phase | Agent数 | 每Agent均产出 | 最高产出Agent | 最低产出Agent |
|:-----:|:------:|:-----------:|:----------:|:----------:|
| P1 | {N} | {X}K | {Agent}({Y}K) | {Agent}({Z}K) |
| ... | ... | ... | ... | ... |

**per_agent_min_chars**: {参考报告per_agent均值 × 80%} 字符

## Agent Prompt基线 (v2.0 Step 4)
- **最高产出Agent prompt模式**: {描述}
- **任务粒度**: {粗/中/细}
- **深度标准**: {描述}

## 执行参数 (v2.0 Step 5)
- **per_agent_min_chars**: {N} (参考基线{M} × 80%)
- **supplement_trigger**: CQ置信度<40% → 标记需Supplement
- **total_target**: max({plan_target}, {参考报告字符} × 60%) = {N}

## 教训 1: {一句话标题}
- **来源**: {报告名} {具体章节/行号范围}
- **模式**: {这个教训描述的是什么通用模式}
- **本报告如何应用**: {具体到本次分析的应用方式}
- **不适用条件**: {什么情况下这个教训不该用}

## 教训 2: {一句话标题}
...

## 教训 3: {一句话标题}
...

## 教训 4: {一句话标题}
...

## 教训 5 (反面): {参考报告的弱点}
- **来源**: {具体章节}
- **问题**: {这个弱点是什么}
- **本报告如何避免**: {具体规避方式}
- **适用条件**: {这个弱点在什么情境下最可能出现}
```

### 输出约束

- **严格5条教训**，不多不少
- **第5条必须是反面教训**（参考报告的弱点/可改进之处）
- 每条≤500字符（总计≤3K字符，不占用太多Agent context）
- 禁止提取数量指标（密度/Mermaid数/标注数）
- 每条必须有**不适用条件**（防止盲目模仿）

---

## 5. 与现有组件的关系

| 组件 | Scout如何与之协作 | 边界 |
|------|-------------------|------|
| **铁律H + find_best_reference.sh** | Scout在其之后执行，消费其输出(报告路径) | find只找，Scout消化 |
| **scout_scan.sh** | 脚本先扫指标+定位章节，Scout(LLM)只精读5章 | 脚本→指标，LLM→模式 |
| **compound_learning_flywheel.md** | Scout读取飞轮教训，不重复提取已编码的通用教训 | 飞轮=通用，Scout=针对本次 |
| **Phase 0.5 CQ提取** | Scout可与CQ并行执行，两者独立但互补 | Scout=方法论，CQ=问题 |
| **Agent A/B/C shared_context.md** | Scout产出独立文件(scout_baseline.md)，Agent A/B/C按需参考 | Scout不写shared_context |
| **quality_sentinel.sh** | 完全不同角色。QSA=事后形式检查，Scout=事前方法学习 | 名称已区分 |

---

## 6. 成本评估

| 步骤 | Token成本 | 时间 |
|------|----------|------|
| find_best_reference.sh | 0 | ~2秒 |
| scout_scan.sh | 0 | ~5秒 |
| Step 3: 读checkpoint.yaml | 0 | ~2秒 |
| Step 4: 读staging前5行 | ~2K tokens | ~1分钟 |
| Step 5: 计算执行参数 | 0 | ~1秒 |
| Step 6: Scout Agent (LLM精读5章+基线) | ~15K tokens | ~3分钟 |
| **总计** | **~17K tokens** | **~4分钟** |

对比全文读取400K+报告: ~200K tokens, ~15分钟 → **节省91%**

---

## 7. 验证计划

首次使用Scout Agent时，验证以下指标：

- [ ] scout_scan.sh正确定位5个关键章节
- [ ] Scout Agent产出恰好5条教训，第5条是反面教训
- [ ] 每条教训有不适用条件
- [ ] 无数量指标提取（密度/Mermaid数）
- [ ] Agent A/B/C的prompt中包含scout_baseline.md路径
- [ ] 后续Phase产出中可追溯到至少1条Scout教训的应用

---

*v2.0升级完成 (2026-02-14)。v1.0→v2.0: 新增Step 3-5(checkpoint基线+staging prompt基线+执行参数)。待下一份报告验证。*
