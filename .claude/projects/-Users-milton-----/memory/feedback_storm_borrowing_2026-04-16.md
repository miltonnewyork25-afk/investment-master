---
name: STORM 借鉴升级 v22.6
description: 实施 1 项 (Co-STORM Moderator 未引用证据检测), 其他 4 项已有或不适用
type: project
status: active
confidence: 0.90
last_validated_at: "2026-04-16"
---

## STORM 借鉴升级 (2026-04-16)

### 关键代码发现

读完 stanford-oval/storm 全部核心文件后, 发现建议借鉴的 5 项中:

| 建议借鉴 | STORM 代码实态 | 我们现状 | 判断 |
|---|---|---|---|
| Pre-writing before writing | 4 stage + 文件 checkpoint 可选择性跳过 | Phase -1~5 更细 + staging/ 持久化 | **已有 90%** |
| Perspective-guided question | `StormPersonaGenerator` 用 Wikipedia TOC grounding | `investment-committee` + CQ 核心矛盾 | **部分重合** |
| Simulated conversation | `ConvSimulator` 3-turn loop | `rule-finding-deepener` 四层追问 | **有更强替代** |
| Runner-based orchestration | `run(do_research, do_outline, ...)` flag 跳过 | orchestrator skill + 手动 prompt | **不适用** (牺牲灵活性) |
| **Co-STORM Moderator** | **按"与主题近 × 与已有查询远 × 与已引用远"挑 unused snippets** | **没有类似机制** | **✅ 最高价值借鉴** |

### 实施的 1 项 — M1: Unused Evidence Detector

**Co-STORM 原算法** (`co_storm_agents.py` Moderator._get_conv_turn_unused_information):
```python
combined_scores = (
    (1 - max_query_similarity) ** 0.5    # 与之前 query 远
    * (1 - cited_snippets_similarity) ** 0.5  # 与已引用 snippet 远
    * claim_similarity                    # 与主题声明近
)
```

**核心洞察**: 信息"被检索到" ≠ "被使用"。多轮研究中最有价值的不是加更多搜索, 而是**回头扫描已收集但被忽略的证据**。

**我们的翻译** (纯 lexical, 无 embedding):
- 存在性: DM 锚点在 staging/ 但不在 final report/
- 相关性: DM 所在段落与 `thesis_crystallization` 关键词重合度
- 权重:
  - status=active/archived (LLM Wiki v2 过滤, v22.4 集成)
  - 文件类型加权 (executive/thesis +3, moat/valuation +2)
  - DM 类型加权 (VAL/MOAT/KILL/THESIS +2)

**实施**:
- 新脚本 `scripts/unused_evidence_detector.sh` (~250 行 bash + 内嵌 Python)
- 集成到 `phase_complete.sh` Step 4.55 (仅 Phase 4/4.5 触发)
- 产出 `reports/{TICKER}/data/unused_evidence_report.md`

**实测数据验证**:

| Ticker | staging DM | final DM | 使用率 | 未引用 |
|---|---|---|---|---|
| AMZN (标杆) | 309 | 309 | 100% | 0 |
| SAAS_SERIES_R2_SECURITY | 194 | 205 | 100% (final 含跨 staging 引用) | 0 |
| FTNT | 53 | 49 | 92.5% | **4** (含 DM-FIN-013 脆弱度=1.7/5, 重要估值证据) |

FTNT 的 `DM-FIN-013` 是真实盲点: "脆弱度 1.7/5 — 估值不依赖英雄式假设" 这种关键判断性证据在最终报告遗漏, 正是 Moderator 机制想捕获的情况。

### 拒绝的 4 项 (及原因)

**Pre-writing before writing** — 我们已有 Phase -1/0/0.5/0.75/1/2/3/4/4.5/5 更细结构, 每 Phase 有 staging 持久化。重复。

**Perspective-guided question asking** — 与 `investment-committee` (5 位大师) + CQ 核心矛盾功能重叠。且 STORM 的 perspective 是"百科编辑者视角" (social/economic/technical), 投研的 perspective 是"分歧视角" (bull/bear/neutral), 两者错位。

**Simulated conversation 3-turn loop** — 我们有更强替代: `rule-finding-deepener.md` 四层追问 (数据→机制→含义→证伪, **无层数上限**)。STORM 的 3 turn 是因为它写百科 (广度优先), 我们做投研 (深度优先)。

**Runner-based stage skipping** — 投研本质不是"重跑得到不同结果"——重跑就要重新推理。STORM 可以 skip 因为生成百科是 deterministic。

### 关键设计决策

**为什么只检测 DM 锚点而不是所有证据?**
DM 锚点已经是"结构化证据的标记", 是质量门控 G2/G3 的一部分。扫描 DM 是最精准的"已收集证据"度量。扫描所有数据点会误报太多。

**为什么 Phase 4/4.5 触发而不是 Phase 3 或 Phase 5 完成后?**
- Phase 3 太早: 正文还在写, 这时的 staging 还会继续演化
- Phase 5 完成后太晚: 已经组装完, 发现遗漏只能打补丁 (违反铁律 J 凑数禁令)
- **Phase 4/4.5 是最佳时机**: 分析已完成, 但 Phase 5 组装还没开始, 有机会选择性引入

**为什么过滤 registry 类文件?**
`P4.5_lens_registry.md` 这种文件里有 "- id: DM-XXX" 定义格式, 那是**定义**不是**引用**, 会触发 false positive。过滤逻辑:
- 文件名含 `registry` → 跳过
- 行格式 `^- id: DM-XXX` → 跳过

### How to apply

自动触发 (Phase 4/4.5 完成时):
```bash
# 自动调用, 无需手动
bash scripts/phase_complete.sh FTNT 4 reports/FTNT/FTNT_Phase4.md 55000
# → Step 4.55 生成 unused_evidence_report.md
```

手动触发 (复盘场景):
```bash
bash scripts/unused_evidence_detector.sh FTNT --limit 10 --phase 5
```

Phase 5 启动时, AI 应 Read `reports/{TICKER}/data/unused_evidence_report.md`, 评估:
- 评分 ≥5: 强烈相关, 应考虑引入
- 评分 2-5: 中等相关, 择优
- 评分 <2: 可能是噪音或非主线, 可忽略

**注意**: 未引用 ≠ 必须引用。投研追求分析深度, 有些证据就该被筛掉。但评分 ≥5 的项应该能解释**为什么**不用。

### 五次借鉴累积 (v22.3 → v22.6)

| 版本 | 来源 | 核心借鉴 | 新增脚本数 |
|---|---|---|---|
| v22.3 (Hermes) | 压缩/Ephemeral/门控/搜索/裁剪 | 3 |
| v22.3 (MiroFlow) | 回滚/失败摘要/三档模式/统计评测 | 2 |
| v22.4 (LLM Wiki v2) | Supersession + lifecycle + audit | 1 |
| v22.5 (gstack) | Learnings 自动注入 | 1 |
| v22.6 (STORM) | 未引用证据检测 | 1 |

**共 8 个新脚本, 0 个新目录, 0 个 Python 模块**。严格遵守反过度工程原则。

每次借鉴的共同模式:
1. 读开源项目实际代码, 不只读 README
2. 与 handoff 文档的描述对比, 发现偏差
3. 只借鉴**独特且可代码化**的机制
4. 用 bash + yaml 实现, 不引入 Python/JS 依赖
5. 失败不阻塞主流程, 非关键路径
