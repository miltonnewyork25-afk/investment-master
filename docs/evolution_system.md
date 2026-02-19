# 投资大师进化系统 v1.0

> **设计原则**: 每份报告是一次"迭代"。迭代后测量→提取→记录→提议→验证→应用。
> **反过度工程**: 一个脚本驱动，人工审批门控，复杂度永远做减法。

---

## 进化循环

```
┌─────────────────────────────────────────────────┐
│                  报告完成                         │
│                    ↓                              │
│  [1] 自动测量 (post_report_autopsy.sh)           │
│      → quality_gate + scorecard + compliance     │
│      → 输出结构化评分到 evolution_log.yaml        │
│                    ↓                              │
│  [2] AI提取 (会话内)                              │
│      → 本报告 Top 3 技术创新                      │
│      → 本报告 Top 3 失败教训                      │
│      → 与 excellence_catalog 对比: 有无新冠军?     │
│                    ↓                              │
│  [3] 进化提议 (AI→用户)                           │
│      → 技术升级: "Ch13传导链应泛化到所有CapEx公司"  │
│      → 技术降级: "X方法在3份报告中无效，建议弱化"    │
│      → 新增/修改skill内容                          │
│      → MEMORY.md L0更新                           │
│                    ↓                              │
│  [4] 用户审批 ← 唯一的人工门控点                    │
│      → 批准 → 执行变更 + 记录到evolution_log       │
│      → 拒绝 → 记录理由 + 调整方向                  │
│                    ↓                              │
│  [5] 下份报告受益                                  │
│      → Phase -1自动加载evolution_log最近3条         │
│      → excellence_catalog推荐最佳技术               │
│      → 避免已记录的失败模式                         │
└─────────────────────────────────────────────────┘
```

---

## 触发时机

| 事件 | 动作 | 执行者 |
|------|------|--------|
| 报告Complete提交后 | `bash scripts/post_report_autopsy.sh {TICKER} {REPORT}` | AI自动 |
| Autopsy输出后 | 提取创新+教训，对比excellence_catalog | AI自动 |
| 进化提议生成后 | 向用户展示，等待批准 | **用户审批** |
| 用户批准后 | 执行变更，记录到evolution_log | AI执行 |
| 新报告Phase -1 | 读evolution_log最近3条 + excellence_catalog | AI自动 |

---

## 核心文件

| 文件 | 角色 | 更新频率 |
|------|------|----------|
| `scripts/post_report_autopsy.sh` | 自动测量脚本 | 稳定 |
| `knowledge/evolution_log.yaml` | 进化历史记录 | 每报告+1条 |
| `knowledge/excellence_catalog.yaml` | 技术冠军榜 | 有新冠军时更新 |
| `knowledge/L0_index.yaml` | 报告索引 | 每报告+1行 |
| `memory/report_lessons.md` | 教训L1汇总 | 每报告更新 |

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
- Skills总数: ≤35个 (当前32, 缓冲3个)
- CLAUDE.md: ≤225行 (当前221)
- MEMORY.md: ≤60行 (当前48)
- **每次新增必须说明替代什么或为什么不需要删除**

---

## 递归深化机制

每次进化提议自动触发三个递归问题（源自simple-recursive-thinking）:

1. **深度**: "这个提议足够深入吗？有没有更本质的教训？"
2. **方法**: "这个进化方向正确吗？有没有更好的方式？"
3. **反思**: "这个变更会不会引入新问题？复杂度预算内吗？"

如果三个问题中有任一个答案为"不确定"→ 暂停，向用户确认。

---

## 质量追踪趋势

evolution_log记录每份报告的核心指标，用于发现趋势:

```yaml
# 每份报告记录格式
- ticker: KLAC
  date: 2026-02-17
  quality: 4.5
  chars: 254K
  scorecard_total: 82/100
  cg_pass: 18/18
  compliance: PASS
  top_technique: belief_inversion_tam_impossibility
  top_lesson: "密度>体量, v1.0>v1.x"
  evolution_proposed: "方法独立性审计标准化"
  evolution_status: approved
```

**趋势信号**:
- quality连续3份↑ → 进化方向正确，继续
- quality连续2份↓ → 紧急审查最近变更，考虑回滚
- chars持续↑但quality持平 → 复杂度膨胀，触发简化
- scorecard某维度连续低分 → 该维度需专项改进

---

## 影子组合 (Shadow Portfolio)

报告完成时记录分析结论，定期回顾:

```yaml
shadow_portfolio:
  KLAC:
    report_date: 2026-02-17
    rating: 审慎关注
    expected_return: -38.4%
    price_at_report: $736
    # 以下在3/6/12月后填入
    price_3m: null
    price_6m: null
    price_12m: null
    actual_return_12m: null
    calibration_note: null
```

**回顾频率**: 每季度检查一次，更新actual价格。
**校准信号**: 如果系统性高估/低估 → 检查是否存在方向性偏差（如WACC系统偏高）。

---

## 与现有系统集成

```
Phase -1: 读 evolution_log 最近3条 + excellence_catalog
Phase 0:  数据预取 + 框架选择（参考excellence_catalog最佳实践）
Phase 1-3: 分析执行（应用推荐技术）
Phase 4:  红队 + 递归质疑（red-team-suite + 演绎分析）
Phase 5:  估值 + 质量门控
Complete: post_report_autopsy.sh → evolution_log → 进化提议 → 用户审批
```
