## 铁律 J: 单会话组装 + P4.5参考扫描 (v3.0, 工程清单 + 中场检测)

> **v3.0新增 (PDD v2.0教训)**: P4.5 → P5 handoff 必须含**工程清单** (DM 锚点/Mermaid 图必填) + Phase 5 写每 50K 强制 mid_assembly_check
> **v2.0**: P4.5参考扫描 + 凑数禁令。源自CRM v2.0组装经验+用户反馈: "达不到目标时凑备注=负价值, 应该借鉴已验证的分析视角写实质内容"

### J-3 v3.0 新增: P4.5 → P5 Handoff 工程清单 (强制)

> **源自**: PDD v2.0 复盘 — handoff 偏重思想内容 (三点估值/Lens/异议), 完全忽视工程指标 (DM/Mermaid), 导致 Phase 5 新写 65K 全部 0 DM 0 Mermaid, DM 密度从 staging 0.85 跌到 0.57 (-33%), 触发 commit 时 G2/G3/G4 三项硬门控失败。

**P4.5 handoff note 必须包含以下两个工程清单, 否则 P5 不得启动**:

```yaml
phase5_engineering_requirements:
  # 1. DM 锚点必填清单 (列出 P5 新写章节中所有关键数字, 必须有 DM)
  dm_anchors_to_add:
    - id: DM-EXEC-001
      number: "三点估值 +6%/+13%/+23%"
      source: "P4 base case 加权 + 圆桌安全边际派 + 反身性派"
      chapter: "执行摘要 / Ch 11.2"
    - id: DM-CASH-001
      number: "$76B 净现金"
      source: "FY25 资产负债表"
      chapter: "Ch 2.1 / 2.2"
    # ... (至少 30 个 DM 锚点, 覆盖所有进入估值的关键数字)

  # 2. Mermaid 图必填清单 (P5 新写章节至少 10 个图)
  mermaid_diagrams_to_add:
    - title: "三段式组合 SOTP 决策树"
      type: "flowchart"
      chapter: "Ch 11 / A2"
      purpose: "让读者一眼看到三段估值的来源"
    - title: "三场博弈结构"
      type: "graph"
      chapter: "Ch 13 / 博弈论透镜"
    - title: "Kill Switch 触发流程 (5 红 4 黄 4 绿)"
      type: "flowchart"
      chapter: "Ch 14"
    - title: "治理催化剂日历时间轴"
      type: "gantt"
      chapter: "Ch 2.5"
    - title: "现金折扣率三情景决策树"
      type: "flowchart"
      chapter: "Ch 2.3"
    # ... (至少 10 个, 300K+ 报告至少 15 个)

  # 3. P5 中场检测时点 (强制调用 mid_assembly_check.sh)
  mid_assembly_checkpoints:
    - 50K   # 第 1 次基线检测
    - 100K  # 第 2 次
    - 150K  # 第 3 次
    - 200K  # 第 4 次 + 强制重读 5 减法清单
    - 250K  # 第 5 次 + 警告分会话风险
```

**强制规则**:
1. **dm_anchors_to_add 至少 30 项** (体量 200K+ 报告 50 项+, 300K+ 报告 80 项+)
2. **mermaid_diagrams_to_add 至少 10 项** (300K+ 报告 15 项+)
3. **mid_assembly_checkpoints 必须 ≥4 个时点** (覆盖 50K/100K/150K/200K)

### J-3b v22.8 新增: Phase 5 启动自检三问 (过程无痕化锚)

> **源自**: COHR audit + 用户洞察"头痛医头脚痛医脚, 永远抓不完具体词"
> **根本**: 第零律 2 "过程无痕化" — Agent 必须在 Phase 5 启动前**切换心智**
> 从"拼接 staging" → "给投资者写成品"

handoff 的 `phase5_engineering_requirements` 必须包含以下自检:

```yaml
phase5_process_erasure_check:
  # Phase 5 写每个段落前必答三问, 回答写入 handoff 防止遗忘
  q1_reader_ignorance_test: |
    如果读者不知道 "Phase / Agent / staging" 是什么, 他们能看懂这段吗?
    我的回答: __________

  q2_engineering_perspective_check: |
    我正在写的这段话, 有没有 "谁做了什么" 的工程化视角?
    (例: "Phase 4 完成后" / "Agent B 的分析显示" / "调用 xxx skill")
    我的回答: __________

  q3_bloomberg_test: |
    这段话能直接放进 Bloomberg 研报 / Morgan Stanley research note 吗?
    投资者读到会不会觉得"为什么作者在谈他们的工作流程"?
    我的回答: __________

  # 5 家族自查清单 (写之前心里过一遍)
  process_language_families_to_avoid:
    agent_family: ["Agent findings", "子 Agent", "并行 Agent", "P[0-9]+ Agent", "Agent X 产出"]
    phase_family: ["Phase X 完成", "P1-A", "P4 回流", "P4.5 结晶"]
    workflow_family: ["staging 文件", "handoff note", "checkpoint.yaml", "preamble"]
    llm_family: ["LLM 调用", "prompt 注入", "context window"]
    skill_family: ["调用 xxx-skill", "xxx-skill 产出"]
```

**心智切换锚** (Phase 5 启动时先想这个, 再动笔):

```
错的心智: "把 Phase 1-4 staging 拼成报告"
         → staging 天然带工程化语言 → 泄漏

对的心智: "从 Phase 1-4 材料中提炼给投资者看的成品"
         → 读者是投资者, 不是研究同行
         → 就像餐厅菜单不会写"这道菜用了 3 位厨师分工协作"
```

**Phase 5 启动时**: AI 必须先读 handoff 的 `phase5_engineering_requirements`, 把它作为写作清单。**违反清单 = 违反铁律 J**, 提交时被 quality_gate_complete.sh 阻断 (CG23 5 家族检测 + mid_assembly_check process 无痕化 BLOCK)。

### J-4 v3.0 新增: Phase 5 中场检测强制 (mid_assembly_check.sh)

**触发**: Phase 5 单会话组装期间, 写满每 50K 字符必须调用一次:
```bash
bash scripts/mid_assembly_check.sh reports/{TICKER}/{TICKER}_complete_v{N}.md
```

**检测内容** (硬指标 BLOCK / 软指标 WARN):
- BLOCK: voice "本报告/笔者" = 0
- BLOCK: 审美词 ≤5
- BLOCK: 范畴重分配 ≥3
- WARN: hedging 密度 ≤1/万字
- WARN: 箭头链 ≤1/30K
- WARN: DM 密度 ≥1.0/千字
- WARN: Mermaid ≥1/30K

**任一 BLOCK → 必须当场修复才能继续写**, 不得"先写完再补"——这是 PDD v2.0 后段疲劳的根因 (写完 200K 后才发现, 修复成本太大)。

**200K+ 超长报告附加约束**:
- 每写 30K 强制 grep 一次 voice, 当场清除
- 250K+ 强烈建议分会话 (context_save → /clear → 新会话续写)

**写入 CLAUDE.md**: Phase 5 写满 50K/100K/150K/200K 时不调用 mid_assembly_check = 违反铁律 J + G6 (Python/脚本验证)

---



**1. 单会话组装(不变)**: 读Phase产出→组装→质量门控→修复→提交。跨会话组装导致CI/CQ/格式断裂。

**2. P4.5参考扫描(新增)**: Phase 4完成后、组装前，执行精准参考匹配。
- **为什么P4.5而非P0**: P4后AI深度理解公司→匹配"同分析挑战"而非仅"同行业"→精度10倍
- **执行**: (1)列缺口清单(哪些D<3.5/哪些维度偏浅) → (2)在`knowledge/analysis_modules/`+`excellence_catalog.yaml`+已完成报告中找"同分析挑战"的最佳参考 → (3)用本公司数据重跑参考框架,产出实质分析
- **详见**: `knowledge/analysis_modules/pre_assembly_reference_scan.md`

**3. 凑数禁令(新增)**: 组装时字符不足→**严禁**添加备注/注释/重复/空话/"有待观察"等零价值内容。**必须**通过P4.5找到的参考视角写新的实质分析(数据+因果+反面)来补齐。凑出来的内容不如不写——读者时间成本>信息量=负价值。

如果单会话context不足: 先用scripts/context_save.sh保存，下次会话从头组装(不是"续写")。

---

**4. Phase 5 结构重排——降认知负荷组装 (v3.0新增)**

> Phase 1-4按分析逻辑写(问题→证据→结论)。Phase 5按**读者认知负荷最低**的方式重排。
> 核心: 读者打开报告第1分钟就应该知道"结论是什么+为什么+主要风险"。

**Phase 5 开头必须按以下顺序组装**:
```
1. 执行摘要: 核心观点+评级+公允价值(3句话结论)
2. 关键术语速查: 首提内联解释的术语索引(快速回查用)
3. 核心争议: 市场在争什么+我们的判断
4. 最关键驱动因素: 决定估值方向的1-2个变量
5. 最关键风险 / Kill Switch: 什么会证伪
6. 估值含义: 多少钱合理+现在贵还是便宜
7. 正文展开: 按"护城河→业务→财务→竞争→估值→红队→风险"顺序
```

**禁止**:
- 开头先铺3000字行业背景再说结论
- 把核心观点藏在第15章
- 把Kill Switch放在附录

**正文章节重排原则**:
- 先给主干(核心论点)再给枝叶(补充证据)
- 先给影响最大的变量再给次要变量
- 同一个结论的证据放在一起——不要分散在5个章节中让读者自己拼凑
- 如果Phase 1-4中同一个洞见出现在不同Phase——合并到一处(铁律M章节独立性)

**Phase 1-4 vs Phase 5的区别**:
```
Phase 1-4(调研态): 按问题展开→先证据后结论→允许不确定→不假装有总判断
Phase 5(成稿态): 按读者展开→先结论后证据→结论明确→不确定性标注为"条件评级"
```

Phase 1-4写局部结论是正确的。Phase 5的职责是**把局部结论编织成一个连贯的投资故事**——开头给方向，中间给论证，结尾给行动建议。
