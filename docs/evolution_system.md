# 投资大师进化系统 v2.0

> **设计原则**: 每份报告是一次"迭代"。迭代后测量→提取→记录→提议→验证→应用。
> **反过度工程**: 脚本驱动，人工审批门控，复杂度永远做减法。

---

## 进化循环 v2.0 (多步深度反思)

> **v2.0变化**: 原单pass反思升级为3步结构化深度反思。详见 `/deep-reflection` skill。

```
┌─────────────────────────────────────────────────────┐
│                  报告Complete                        │
│                      ↓                               │
│  [Step 0] 机械测量 (post_report_autopsy.sh)          │
│      → CG + compliance + DM + scorecard + 趋势      │
│      → 追加到 evolution_log.yaml                     │
│                      ↓                               │
│  [Step R1] 行业模块基建 (模板A) ← 同行业只做一次     │
│      → MECE 10模块 + 扩展模块                        │
│      → 每模块: 3必问 + 3KPI + 一致性检验 + KS        │
│      → 产出: knowledge/industry_modules/{ind}.md     │
│                      ↓                               │
│  [Step R2] 深度报告审计 (模板B+C) ← 核心价值步骤     │
│      → 公司模块定位 + 误判点 + 证据缺口               │
│      → 报告结构映射: 缺失/重复/缺验证/可删减          │
│      → 最短补齐路线图 (Top 3模块)                     │
│      → 产出: reports/{T}/reflection/deep_audit.md    │
│                      ↓                               │
│  [Step R3] 评分+升级路线 (模板D+E) ← 可选            │
│      → 0-2分/模块 → 总分百分比                       │
│      → Top 10补证据任务清单                           │
│      → v2目录 (仅v2重做时)                            │
│      → 产出: reports/{T}/reflection/upgrade.md       │
│                      ↓                               │
│  [6] 进化提议 (从R2缺口+R3任务提取EVO-XXX)           │
│      → 用户审批 → evolution_status=approved           │
│                      ↓                               │
│  [7] 下份报告受益                                    │
│      → find_relevant_knowledge.sh: 检查行业模块+缺口  │
│      → excellence_catalog: 推荐最佳技术               │
│      → 上份报告deep_audit未修复缺口 → 本次警告        │
└─────────────────────────────────────────────────────┘
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

### Step 0: 机械测量 (保留)
```bash
bash scripts/post_report_autopsy.sh {TICKER} {REPORT_FILE}
```
输出: 6项指标 (基础/CG/Compliance/DM/Scorecard/趋势) → 追加到evolution_log.yaml

### Step R1: 行业模块基建 (同行业只做一次)

检查 `knowledge/industry_modules/{industry}_modules.md` 是否存在:
- **存在** → 跳过R1，直接R2
- **不存在** → 执行 `/deep-reflection R1 {industry}`，产出行业MECE模块模板

### Step R2: 深度报告审计 (每份报告)

执行 `/deep-reflection R2 {TICKER}`，需要:
- 行业模块模板 (R1产出)
- 报告全文
- Step 0的测量数据

产出 `reports/{TICKER}/reflection/deep_audit.md`:
- 公司模块定位矩阵 + 误判风险
- 报告结构映射: 缺失/重复/缺验证/可删减
- 最短补齐路线图 (Top 3)

### Step R3: 评分+升级路线 (每份报告, 可选)

执行 `/deep-reflection R3 {TICKER}`，需要:
- R2的审计结果

产出 `reports/{TICKER}/reflection/upgrade_roadmap.md`:
- 模块0-2分评分矩阵
- Top 10补证据任务清单
- v2目录 (仅v2重做时)

### 冠军对比 + 进化提议
```bash
bash scripts/update_excellence_catalog.sh {TICKER} {REPORT_FILE}
```
AI从R2缺口+R3任务清单中提取具体EVO-XXX进化提议。

### 用户审批
唯一的人工门控。批准→执行+标记approved，拒绝→记录理由。

### 下份报告受益
```bash
bash scripts/find_relevant_knowledge.sh {TICKER} {INDUSTRY}
```
自动输出: Top-3相似公司 + evolution_log最近3条 + 行业模块模板 + 上份报告未修复缺口

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

多步反思系统本身就是递归深化的实现:

- **R1→R2**: 行业坐标系建立后，R2的审计才有MECE基准（而非随机找问题）
- **R2→R3**: 结构缺口发现后，R3的评分才有评判依据（而非凭印象打分）
- **R3→下份报告**: 量化的任务清单直接转化为Phase 0的前置检查项

每步的进化提议仍需通过三个校验:
1. **深度**: R2发现的缺口是根因还是表象？
2. **方法**: R3的补救方案是否在复杂度预算内？
3. **复利**: 这个修复能惠及几份未来报告？（≥3份才值得系统化）

如果任一答案为"不确定"→ 暂停，向用户确认。

---

## 与Phase系统集成

```
Phase -1: find_relevant_knowledge.sh
          → evolution_log最近3条 + excellence_catalog
          → 检查行业模块模板是否存在
          → 上份同行业报告的deep_audit未修复缺口 → 警告
Phase 0:  data-prefetch + excellence_scout.sh → 推荐最佳实践
Phase 1-3: 分析执行（应用推荐技术，避免已知失败模式+已知缺口）
Phase 4:  red-team-suite + 演绎分析
Phase 5:  估值 + 质量门控
Complete: post_report_autopsy.sh (Step 0)
          → /deep-reflection R1 (首次) → R2 → R3
          → 进化提议 → 用户审批
```
