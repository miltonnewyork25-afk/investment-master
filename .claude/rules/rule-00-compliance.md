## 第零律: 发布合规 (优先级最高)

> **适用范围**: 所有**新撰写**的报告。已完成的历史报告不回溯修改。

1. **台海中性表述** — 禁止"中国入侵台湾/invasion of Taiwan"等表述 → 统一用"台海冲突/台海危机/cross-strait tension"

2. **过程无痕化 (Process Erasure, v22.8 升级, COHR audit 驱动)** —

   > 最终报告是给**投资者**读的成品, 不是给研究同行看的工作记录。
   > 读者不知道也不关心你用了几个 Phase, 几个 Agent, 什么 skill。

   **禁止暴露**的 5 类工程化词汇家族:

   - **Agent 家族**: "Agent findings / 产出 / 完成 / 分析 / 调用 / 输出", "子 Agent", "并行 Agent", "P[0-9]+ Agent", "worker Agent"
   - **Phase 家族**: "Phase X 完成 / 产出 / 启动 / 结晶 / 回流", "P1-A / P4-B / P4.5 结晶"
   - **工作流家族**: "staging 文件 / 内容 / 记录", "handoff note", "checkpoint.yaml", "compression / preamble"
   - **LLM 技术家族**: "LLM 调用", "prompt 注入", "context window", "thread"
   - **Skill 家族**: "调用 skill", "skill 产出", "investment-committee skill", "[a-z]+-skill 分析"

   **根本原则**: **你能想到的工程化词汇, 99% 都不该出现在最终报告里**。
   就像餐厅菜单不会写"这道菜用了我们 3 位厨师分工协作完成"。

   **Phase 5 组装自检三问**（写每个段落前必答, 心智切换锚）:
   1. 如果读者**不知道** "Phase / Agent / staging" 是什么, 他们能看懂这段吗? — 能 = 通过
   2. 这段话有没有 "谁做了什么" 的**工程化视角**? — 有 = 改写
   3. 这句话能**直接放进 Bloomberg 研报**吗? — 不能 = process 泄漏, 重写

   **历史雏形**: 原第零律 2 ("回流无痕化") 只覆盖 P4 回流标注, 范围太窄;
   第零律 3 ("报告连贯性") 原则正确但太抽象, 作者不知道具体不能说什么。
   本条取代并泛化, 第零律 3 保留作为补充。

   **白名单** (合法用法, 不算 process 泄漏):
   - 分析 AI 公司时提 "LLM / prompt / model" — 合法 (主题相关)
   - 分析 agent 相关公司时提 "research agent" 作为产品名 — 合法
   - 引用外部术语 "context / thread" 用于业务概念 (如 Threads 社交应用) — 合法
   - Kill Switch 触发描述 "当 X 发生时" — 合法 ("when" 不是 process)

3. **报告连贯性** — Complete 应像一次性撰写的连贯文档, 非研究过程拼接记录。(与第 2 条互补: 第 2 条说"词汇不能出现", 第 3 条说"叙事要连贯")

4. **Polymarket 例外** — 引号内市场名称(如"Will China invade Taiwan?")保留原文，描述性文本用中性词

**转换表**: `docs/deep_dive_protocol.md` "发布合规规则"
**检查时机**:
- Phase 5 组装启动: 自检三问写入 handoff `phase5_engineering_requirements`
- Phase 5 中场 (50K/100K/150K/200K): `mid_assembly_check.sh` process 家族检测 (BLOCK)
- Complete 提交: `quality_gate_complete.sh` CG23 5 家族检测 (FAIL >5 / WARN ≤5)
- 手动: `grep -iE '入侵|invade|invasion|Agent findings|Phase [0-9.]+ ?完成'`
