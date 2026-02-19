# 框架升级验证协议 v1.0

> **核心原则**: 升级前写假设 → 首份报告后测量 → 诚实判定 → 未验证的不推广

## 升级生命周期

```
提出升级 → 填写假设卡 → commit到main
                              ↓
                     首份报告使用 (或跳过)
                              ↓
                     报告完成后测量实际效果
                              ↓
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
           VALIDATED      NEUTRAL      REGRESSED
           保留+推广      再观察1份     立即冻结
           到worktree     再决定        从框架标记废弃
```

## 1. 升级假设卡 (升级前强制填写)

每次框架升级前，必须在 `docs/upgrades/` 创建假设卡：

```yaml
# docs/upgrades/vX.Y_feature_name.yaml
upgrade_id: "vX.Y-feature-name"
date_proposed: "YYYY-MM-DD"
author: "agent"

# === 假设 ===
hypothesis:
  what: "简述升级内容"
  improves_which_dimension: "具体改善哪个质量维度"
  current_baseline: "当前基准数值 (从quality_matrix.sh获取)"
  expected_after: "预期改善后的数值"
  could_regress: "可能导致什么退步"

# === 成功标准 (可测量, 升级前写死, 不可事后修改) ===
success_criteria:
  - "标准1: 具体、可测量"
  - "标准2: 具体、可测量"
  - "标准3: 具体、可测量"

# === 终止条件 (触发则撤销升级) ===
kill_condition:
  - "条件1: 什么情况下必须撤销"
  - "条件2: 什么情况下必须撤销"

# === 验证记录 (报告完成后填写) ===
validation:
  status: "PENDING"  # PENDING → VALIDATED / NEUTRAL / REGRESSED
  first_report: ""
  date_validated: ""
  actual_results: ""
  criteria_met: []
  criteria_failed: []
  honest_assessment: ""
```

## 2. 报告后审计 (3个必答问题)

每份报告完成后，运行 `tests/upgrade_scorecard.sh` 并回答：

### Q1: 实际使用了哪些框架特性？
列出具体使用的特性（不是"可能用了"），附evidence。

### Q2: 如果剥离最近升级，回到v9.0/v10.0，报告会损失什么？
如果答案是"几乎没有损失" → 升级没有实质价值。

### Q3: 本次报告最有价值的分析洞察来源是什么？
框架特性？数据工具？分析深度？外部文献？
→ 如果最有价值的洞察跟框架升级无关，说明升级没贡献。

## 3. 判定标准

| 判定 | 条件 | 动作 |
|------|------|------|
| **VALIDATED** | ≥2/3 success_criteria 达成 + 无regression | 保留，推广到worktree |
| **NEUTRAL** | <2/3 criteria达成，但无regression | 保留，再观察1份报告 |
| **REGRESSED** | 任一kill_condition触发，或质量明显下降 | 冻结，从框架标记废弃 |

## 4. 工具链

| 工具 | 用途 | 命令 |
|------|------|------|
| 质量矩阵 | 查看历史趋势 | `bash tests/quality_matrix.sh` |
| 升级记分卡 | 评估单次升级效果 | `bash tests/upgrade_scorecard.sh <upgrade_id>` |
| CSV导出 | 数据分析用 | `bash tests/quality_matrix.sh --csv > matrix.csv` |

## 5. 反偏差机制

AI在评估自己设计的升级时有结构性偏差（倾向于说"有效"）。以下机制对抗这种偏差：

1. **预承诺**: success_criteria在升级前写死，不可事后修改
2. **可测量**: 所有标准必须是数字或二值判断，不是感觉
3. **质量矩阵**: 脚本自动生成，不依赖主观评估
4. **Kill条件**: 明确的撤销触发器，不留模糊空间
5. **历史对照**: 每份新报告自动与同框架版本的历史报告对比

## 6. 禁止行为

- **禁止**: 升级后不验证就继续升级
- **禁止**: 事后修改success_criteria
- **禁止**: 把NEUTRAL当VALIDATED推广
- **禁止**: 忽略kill_condition触发
- **禁止**: 用复杂术语掩盖"没实际效果"
