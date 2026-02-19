# 投资大师进化系统 v2.0

> **设计原则**: 每份报告是一次"迭代"。迭代后测量→提取→记录→提议→验证→应用。
> **反过度工程**: 脚本驱动，人工审批门控，复杂度永远做减法。

---

## 进化循环

```
┌─────────────────────────────────────────────────┐
│                  报告完成                         │
│                    ↓                              │
│  [1] 自动测量 (post_report_autopsy.sh v2.0)      │
│      → CG + compliance + DM + scorecard          │
│      → 内联趋势分析 (evolution_trend.sh)          │
│      → 追加到 evolution_log.yaml                  │
│                    ↓                              │
│  [2] AI提取 + 冠军对比                            │
│      → update_excellence_catalog.sh 扫描报告评分  │
│      → 对比现有冠军: 有无超越? 有无新技术?          │
│      → AI填入: quality / top_technique / lesson    │
│                    ↓                              │
│  [3] 进化提议 (AI→用户)                           │
│      → 技术升级/降级建议                           │
│      → MEMORY.md / skill / 方法论文档变更          │
│      → 递归深化三问 (depth/method/reflection)      │
│                    ↓                              │
│  [4] 用户审批 ← 唯一的人工门控点                    │
│      → 批准 → 执行变更 + evolution_status=approved  │
│      → 拒绝 → 记录理由 + 调整方向                  │
│                    ↓                              │
│  [5] 下份报告受益                                  │
│      → find_relevant_knowledge.sh 自动输出:        │
│        evolution_log最近3条 + 质量趋势 + 教训       │
│      → excellence_catalog 推荐最佳技术              │
│      → 避免已记录的失败模式                         │
└─────────────────────────────────────────────────┘
```

---

## 脚本一览

| 脚本 | 角色 | 触发时机 |
|------|------|----------|
| `scripts/tier3_launch.sh` | **单一入口 — 复杂度估计+Phase -1+launch_brief** | **Tier 3启动的第一个命令** |
| `scripts/phase_sentinel.sh` | **纵深防御哨兵 — 每Phase后重验全部前序** | **phase_complete.sh自动调用** |
| `scripts/preflight_gate.sh` | Phase 0前硬阻断门控 | tier3_launch内 / 手动 |
| `scripts/post_report_autopsy.sh` | 自动测量编排器 (v2.0) | 报告Complete后 |
| `scripts/evolution_trend.sh` | 质量趋势分析+警告 | autopsy内联 / 独立运行 |
| `scripts/update_excellence_catalog.sh` | 冠军对比+升级建议 (v2.0) | autopsy后AI运行 |
| `scripts/find_relevant_knowledge.sh` | Phase -1知识检索+进化上下文 | tier3_launch内 |
| `scripts/excellence_scout.sh` | Phase级最佳实践推荐 | 各Phase启动时 |

### 纵深防御架构 (Defense-in-Depth)

```
用户: "深度调研XX公司"
  ↓
Layer 0: tier3_launch.sh ← 自动Phase -1 + 复杂度估计 + launch_brief
  ↓
  AI: 文献侦察 (WebSearch) → lit_recon_memo.md
  ↓
Layer 1: preflight_gate.sh ← 硬阻断: knowledge+lit_recon+scout
  ↓
Phase 0 → phase_complete.sh → [Layer 2: phase_sentinel.sh] ← 重验ALL前序
  ↓
Phase 1 → phase_complete.sh → [Layer 2: phase_sentinel.sh] ← 重验ALL前序
  ↓                            (即使Layer 0+1被跳过, 这里仍会BLOCK)
  ... (每个Phase重复)
  ↓
Layer 3: quality_gate_complete.sh ← 最终门控
  ↓
post_report_autopsy.sh → evolution_log → 进化循环
```

**核心设计**: 每个后续检查点重新验证**全部**前序产出。单点失败不致命。

---

## 数据文件

| 文件 | 角色 | 更新频率 |
|------|------|----------|
| `knowledge/evolution_log.yaml` | 进化历史 (结构化) | 每报告+1条 |
| `knowledge/excellence_catalog.yaml` | 技术冠军榜 (7域) | 新冠军时 |
| `knowledge/L0_index.yaml` | 报告索引 (L0) | 每报告+1行 |

---

## 完整执行流程

### Step 1: 自动测量
```bash
bash scripts/post_report_autopsy.sh {TICKER} {REPORT_FILE}
```
输出: 6项指标 (基础/CG/Compliance/DM/Scorecard/趋势) → 追加到evolution_log.yaml

### Step 2: AI填入 + 冠军对比
```bash
bash scripts/update_excellence_catalog.sh {TICKER} {REPORT_FILE}
```
AI手动填入evolution_log中的null字段:
- `quality`: 1.0-5.0 评分
- `top_technique`: 本报告最强技术创新
- `top_lesson`: 本报告最重要教训
- `evolution_proposed`: AI生成的进化建议

### Step 3: 进化提议
AI根据测量结果+教训+趋势，提出具体变更:
- 技术升级: 新冠军超越旧冠军+0.1 → 更新excellence_catalog
- 技术降级: 连续2份报告无效 → 弱化或移除
- 方法论泛化: ≥3份报告验证有效 → 写入docs/
- 框架简化: 复杂度↑但质量→ → 删减

### Step 4: 用户审批
唯一的人工门控。批准→执行+标记approved，拒绝→记录理由。

### Step 5: 下份报告受益
```bash
bash scripts/find_relevant_knowledge.sh {TICKER} {INDUSTRY}
```
自动输出: Top-3相似公司 + evolution_log最近3条趋势+教训+待审批提议

---

## 进化规则

### 技术升级条件
- 新报告某板块评分 **> 现有冠军 + 0.1分** → 更新excellence_catalog
- 某技术在 **≥3份报告中有效** → 提议泛化到方法论文档
- 用户明确认可某创新方向 → 立即记录并泛化

### 技术降级条件
- 某技术在 **≥2份报告中无效或有害** → 提议弱化或移除
- 红队有效性门控连续FAIL → 标记为"表演性"
- 框架复杂度增加但质量未提升 → 触发简化审查

### 不可变宪法 (永不进化)
- 零仓位建议 / 零买卖推荐
- 台海中性表述
- 数据诚信四铁律
- 逆向估值优先
- 用户审批门控

### 复杂度预算
- Skills总数: ≤35个
- CLAUDE.md: ≤225行
- MEMORY.md: ≤60行
- **每次新增必须说明替代什么或为什么不需要删除**

---

## 趋势信号 (evolution_trend.sh)

| 信号 | 含义 | 行动 |
|------|------|------|
| quality连续3份↑ | 进化方向正确 | 继续当前策略 |
| quality连续2份↓ | 退化警告 | 紧急审查最近变更 |
| chars↑但quality平 | 复杂度膨胀 | 触发简化 |
| 最新quality<平均-0.3 | 异常低分 | 检查退化原因 |

---

## 递归深化机制

每次进化提议自动触发三个递归问题:

1. **深度**: "这个提议足够深入吗？有没有更本质的教训？"
2. **方法**: "这个进化方向正确吗？有没有更好的方式？"
3. **反思**: "这个变更会不会引入新问题？复杂度预算内吗？"

如果任一答案为"不确定"→ 暂停，向用户确认。

---

## 与Phase系统集成

```
Phase -1: find_relevant_knowledge.sh → evolution_log最近3条 + excellence_catalog
Phase 0:  data-prefetch + excellence_scout.sh → 推荐最佳实践
Phase 1-3: 分析执行（应用推荐技术，避免已知失败模式）
Phase 4:  red-team-suite + 演绎分析
Phase 5:  估值 + 质量门控
Complete: post_report_autopsy.sh → evolution_log → 进化提议 → 用户审批
```
