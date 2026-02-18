---
name: recursive-quality-loop
description: 递归质量闭环 v1.0。报告组装后自动启动三圈质量递归(确定性扫描→语义审计→自动修复)，保证质量非回退。微循环(Phase间golden_numbers对齐)+宏循环(组装后递归修复)双层架构。
---

# 递归质量闭环 v1.0

> **核心命题**: 报告质量 = min(分析天花板, 执行地板)。当前系统分析天花板持续上升，但执行地板反复塌陷(数据矛盾、算术错误、概率集混乱)。本Skill的唯一目标: 抬高执行地板。
> **历史证据**: KLAC(4.50)密度>体量 | AMZN(4.08)天花板4.8但地板3.4 | 所有报告的#1失败模式=数据不一致

## 触发条件

1. **宏循环**: Phase 5完成 + `assemble_complete.sh`组装后自动启动
2. **微循环**: 每个Phase完成时，由`phase_complete.sh`在commit前自动触发golden_numbers校验
3. **手动触发**: 用户说"递归质量检查"/"质量闭环"/"RQL"

## 架构: 双层递归

```
┌─────────────────────────────────────────────────────┐
│                    报告生成流程(不变)                  │
│  Phase -1 → Phase 0 → Phase 1-5 → assemble → ...   │
│                ↑微循环              ↑微循环            │
│              golden_numbers       golden_numbers      │
└──────────────────────────────────┬──────────────────┘
                                   ↓ 组装完成
┌──────────────────────────────────────────────────────┐
│              宏循环: 递归质量闭环 (本Skill)            │
│                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐       │
│  │ 第1圈     │───→│ 第2圈     │───→│ 第3圈     │      │
│  │确定性扫描  │    │语义审计   │    │自动修复    │      │
│  │ (脚本)    │    │ (Agent)  │    │ (Agent)  │      │
│  └──────────┘    └──────────┘    └──────────┘       │
│       ↑                                    │        │
│       └────────── 重跑验证 ←───────────────┘        │
│                                                      │
│  终止: P0缺陷=0 且 评分≥quality_floor               │
└──────────────────────────────────────────────────────┘
```

---

## Part A: 微循环 — Golden Numbers对齐

### A.1 目的

防止Agent间数据不一致。当Phase 1的Agent A写了"AWS收入$132.4B"，Phase 2的Agent B不应写"$128.7B"。

### A.2 golden_numbers.yaml

Phase 0完成后，从shared_context.md提取关键数字写入`reports/{TICKER}/data/golden_numbers.yaml`。

**模板**:
```yaml
# Golden Numbers — {TICKER} 单一事实源
# 生成: Phase 0 | 更新: 每Phase完成后追加
# 规则: 报告中每个关键指标必须使用此文件中的值

ticker: "{TICKER}"
generated: "{YYYY-MM-DD}"
last_updated: "{YYYY-MM-DD}"
source_phase: "Phase 0"

# === 核心财务 (H级, 来自FMP/SEC) ===
revenue_fy_latest:
  value: ""           # e.g. "$716.9B"
  fy: ""              # e.g. "FY2025"
  source: ""          # e.g. "DM-FIN-001, FMP income"

operating_income:
  value: ""
  fy: ""
  source: ""

net_income:
  value: ""
  fy: ""
  source: ""

fcf:
  value: ""
  fy: ""
  source: ""

capex:
  value: ""
  fy: ""
  source: ""

# === 分部数据 (如有) ===
segments: []
# - name: "AWS"
#   revenue: "$132.4B"
#   operating_income: "$45.6B"
#   opm: "34.4%"
#   source: "DM-FIN-xxx"

# === 估值锚点 ===
market_cap:
  value: ""
  date: ""
  source: ""

share_price:
  value: ""
  date: ""
  source: ""

shares_outstanding:
  value: ""
  source: ""

pe_ttm:
  value: ""
  source: ""

# === 市场份额 (口径必须统一) ===
market_shares: []
# - metric: "US ecommerce share"
#   value: "37.6%"
#   caliber: "eMarketer全口径"  # 必须注明口径
#   source: "DM-BIZ-xxx"

# === 关键推断 (R级, 必须标注) ===
key_estimates: []
# - metric: "Ad OPM"
#   value: "50-60%"
#   type: "R"
#   source: "Industry comp (META/GOOG)"

# === Phase间追加区 ===
phase_additions: []
# Phase完成后在此追加新确定的关键数字
# - phase: "Phase 2"
#   metric: "温水煮青蛙概率"
#   value: "20-30%"
#   source: "Ch12 DM-RT-xxx"
```

### A.3 微循环执行

每个Phase完成时(在phase_complete.sh中触发):

1. **提取**: 从新完成的staging文件中grep关键数字
2. **比对**: 与golden_numbers.yaml中的值比对
3. **报警**: 差异>2%的指标输出WARNING
4. **决策**:
   - golden有值且新值不同→WARNING,由编排器决定是否更新
   - golden无值且新Phase产出了新指标→追加到phase_additions
   - 一致→PASS

**判定脚本**: `tests/check_golden_numbers.sh`

```bash
# 用法: bash tests/check_golden_numbers.sh {TICKER} {STAGING_FILE}
# 输出: PASS/WARNING列表
# 退出码: 0=全部一致, 1=有差异(不阻断,仅警告)
```

---

## Part B: 宏循环 — 三圈递归

### B.1 第1圈: 确定性扫描 (<3分钟, 脚本)

运行现有脚本+新增数据一致性检查:

```bash
# Step 1: 现有CG v5.0门控
bash tests/quality_gate_complete.sh {REPORT_PATH} 0 {PW}

# Step 2: 数据一致性扫描 (新增)
bash tests/check_data_consistency.sh {REPORT_PATH} {GOLDEN_NUMBERS_PATH}

# Step 3: 重复度计数
bash tests/count_repetitions.sh {REPORT_PATH}

# Step 4: 算术验证 (已有)
python3 scripts/verify_dcf_arithmetic.py {TICKER}
```

**第1圈输出**: `reports/{TICKER}/data/rql_circle1.json`

```json
{
  "circle": 1,
  "timestamp": "",
  "cg_result": { "pass": 0, "warn": 0, "fail": 0 },
  "data_consistency": {
    "contradictions": [],
    "warnings": []
  },
  "repetitions": {
    "top_repeated": []
  },
  "arithmetic": {
    "errors": [],
    "verified": 0
  },
  "p0_count": 0,
  "p1_count": 0,
  "verdict": "proceed_to_circle2|fix_and_rerun"
}
```

### B.2 第2圈: 语义审计 (~15分钟, Agent)

启动2个并行审计Agent:

**Agent 1: 前半部分审计** (Ch01到报告中点)
```
评估维度: 数据准确(0-5) / 分析深度(0-5) / 结构连贯(0-5) / DM质量(0-5)
必须输出:
- 逐章评分表
- 最强3章+最弱3章(含行号)
- 数据矛盾/错误列表
- 与golden_numbers的偏差
```

**Agent 2: 后半部分审计** (报告中点到结尾)
```
评估维度: 数据准确(0-5) / 方法独立性(0-5) / 红队有效性 / AI边界诚实度
必须输出:
- 逐章评分表
- 计算错误列表
- 概率集一致性检查
- 方法共享假设矩阵
```

**第2圈输出**: `reports/{TICKER}/data/rql_circle2.json`

```json
{
  "circle": 2,
  "timestamp": "",
  "overall_score": 0.0,
  "chapter_scores": {},
  "strongest_3": [],
  "weakest_3": [],
  "defects": {
    "p0": [],
    "p1": [],
    "p2": []
  },
  "data_contradictions": [],
  "calculation_errors": [],
  "probability_consistency": "pass|fail",
  "method_independence": { "effective_methods": 0, "rating": "" },
  "verdict": "pass|fix_p0|fix_p1"
}
```

### B.3 第3圈: 自动修复 (~10分钟, Agent)

仅当P0缺陷>0时启动。

**修复Agent** 读取第1圈+第2圈输出,执行:

1. **数据统一**: 以golden_numbers.yaml为权威,修正报告中的不一致值
2. **算术修正**: 以verify_dcf_arithmetic.py输出为权威,修正计算错误
3. **概率集对齐**: 选择最终概率集(通常Phase 4红队输出),全报告统一
4. **重复压缩**: 对超阈值重复的关键数字,替换为代称变体
5. **Phase引用清理**: 将残留的Phase引用转为章节交叉引用

**修复规则**:
- 每次修复后必须记录: 修复了什么→在哪里→改成什么
- golden_numbers中有值的→以golden为准
- golden_numbers中无值的→以DM锚点为准
- DM锚点也没有的→标记为"需人工确认",不自动修复
- **禁止**: 修改分析结论/评级/概率分配(这些需要人工判断)

**第3圈输出**: `reports/{TICKER}/data/rql_circle3.json`

```json
{
  "circle": 3,
  "timestamp": "",
  "fixes_applied": [],
  "fixes_skipped": [],
  "needs_human": [],
  "file_delta": { "bytes_before": 0, "bytes_after": 0, "change_pct": 0 }
}
```

### B.4 验证循环

第3圈完成后,重跑第1圈验证:
- P0=0 → 终止,输出最终报告
- P0>0 → 最多再递归1次(防止无限循环)
- 第2次递归后仍P0>0 → 输出"需人工介入"清单,终止

**最大递归深度**: 2次(第1圈→第2圈→第3圈→验证→第3圈→验证)

---

## Part C: 非回退保证

### C.1 质量地板

```yaml
quality_floor:
  # 历史最佳分数(手动更新)
  series_best: 4.50  # KLAC
  # 非回退规则
  rules:
    - p0_defects: 0           # P0缺陷必须为0
    - data_contradictions: 0  # 同一指标不允许多值
    - calculation_errors: 0   # 必须脚本验证通过
    - phase_references: "≤5"  # CQ表列名例外
    - agent_labels: 0         # 无Agent角色标签残留
    - score: "≥ series_best - 0.3"  # 不低于历史最高分-0.3
```

### C.2 非回退检查点

在第2圈审计输出中,强制与历史最佳对比:

| 维度 | 历史最佳 | 当前 | 差距 | 是否回退 |
|------|---------|------|------|---------|
| 数据准确性 | KLAC 4.5 | ? | ? | 是/否 |
| 分析深度 | APP 4.5 | ? | ? | 是/否 |
| 方法独立性 | Ch18 5.0 | ? | ? | 是/否 |
| 执行质量 | KLAC 4.5 | ? | ? | 是/否 |

任何维度回退>0.5分 → 标记为"回退警告",进入第3圈重点修复。

### C.3 历史知识传递

每份报告完成后,将以下信息追加到`knowledge/quality_evolution.yaml`:

```yaml
- ticker: "AMZN"
  date: "2026-02-18"
  score: 4.08
  p0_defects_found: 5
  p0_defects_fixed: 5
  top_failure_mode: "data_contradiction"
  new_lesson: "Agent间数据不共享→golden_numbers机制"
  rql_iterations: 2
```

下一份报告的第2圈Agent会读取此文件,知道历史上哪些失败模式最常见,重点检查。

---

## Part D: 与现有工具链的集成

### D.1 触发集成

| 触发点 | 现有工具 | 新增动作 |
|--------|---------|---------|
| Phase 0完成 | phase_complete.sh | + 生成golden_numbers.yaml |
| Phase 1-5完成 | phase_complete.sh | + check_golden_numbers.sh |
| 组装完成 | assemble_complete.sh | + 启动宏循环(本Skill) |
| 质量门控 | quality_gate_complete.sh | 作为第1圈Step 1 |
| 算术验证 | verify_dcf_arithmetic.py | 作为第1圈Step 4 |

### D.2 文件结构

```
reports/{TICKER}/data/
├── golden_numbers.yaml       # 微循环: 单一事实源
├── rql_circle1.json          # 宏循环: 确定性扫描结果
├── rql_circle2.json          # 宏循环: 语义审计结果
├── rql_circle3.json          # 宏循环: 修复记录
└── rql_summary.json          # 最终汇总
```

### D.3 CG门控扩展

在现有CG v5.0基础上新增:

| 门控 | 检查项 | 严重度 | 来源 |
|------|--------|:------:|:----:|
| CG19 | golden_numbers偏差=0 | FAIL | 微循环 |
| CG20 | 概率集全报告唯一 | FAIL | 第1圈 |
| CG21 | 关键指标重复度≤阈值 | WARN | 第1圈 |
| CG22 | AI生态/半导体报告含≥1条演绎链 | WARN | 第2圈(deductive-dynamics) |
| CG23 | 演绎链有证伪条件 | WARN | 第2圈(deductive-dynamics) |

---

## Part E: 执行协议

### E.1 完整执行流程

编排器在组装完成后,按以下顺序执行:

```
1. 读取 reports/{TICKER}/data/golden_numbers.yaml
2. 读取 reports/{TICKER}/data/checkpoint.yaml (获取PW等元数据)

3. === 第1圈: 确定性扫描 ===
   a. bash tests/quality_gate_complete.sh {REPORT} 0 {PW}
   b. bash tests/check_data_consistency.sh {REPORT} {GOLDEN}
   c. bash tests/count_repetitions.sh {REPORT}
   d. python3 scripts/verify_dcf_arithmetic.py {TICKER} (如果有DCF)
   e. 写入 rql_circle1.json

4. === 第2圈: 语义审计 ===
   a. 启动2个并行Task Agent (前半+后半)
   b. 汇总Agent输出 → rql_circle2.json
   c. 计算综合评分

5. === 决策门 ===
   if rql_circle2.p0_count == 0 AND score >= quality_floor:
       → 输出 rql_summary.json, 终止
   else:
       → 进入第3圈

6. === 第3圈: 自动修复 ===
   a. 启动修复Agent (读取circle1+circle2输出)
   b. Agent执行修复 → 写入 rql_circle3.json
   c. 重跑第1圈验证
   d. if P0 still > 0 AND iterations < 2:
       → 再递归一次
   e. else:
       → 输出 rql_summary.json (含"需人工介入"清单)

7. 最终commit: "fix({TICKER}): RQL递归质量闭环 — {N}项修复"
```

### E.2 时间预算

| 步骤 | 预计耗时 | 人工介入 |
|------|---------|---------|
| 第1圈(脚本) | 2-3分钟 | 无 |
| 第2圈(Agent审计) | 10-15分钟 | 无 |
| 第3圈(Agent修复) | 5-10分钟 | 仅P0无法自动修复时 |
| 验证循环 | 2-3分钟 | 无 |
| **总计** | **20-30分钟** | **0-1次** |

### E.3 Context管理

- 第2圈Agent是独立Task,不占编排器context
- 第3圈Agent也是独立Task,编排器只读JSON输出
- 编排器全程只操作JSON文件,不读报告全文
- 报告修改由第3圈Agent直接执行

---

## 质量门控

| 检查项 | 要求 | 严重度 |
|--------|------|:------:|
| golden_numbers.yaml存在 | Phase 0后必须生成 | BLOCK |
| 第1圈4步全部执行 | 4/4完成 | BLOCK |
| 第2圈双Agent全部返回 | 2/2完成 | BLOCK |
| P0缺陷=0(终态) | 最终验证 | BLOCK |
| 评分≥quality_floor | 综合评分检查 | WARN |
| 修复不改变评级/结论 | Agent修复约束 | BLOCK |
| 递归深度≤2 | 防无限循环 | BLOCK |

---

## 与其他Skill的关系

| 上游 | 本Skill | 下游 |
|------|--------|------|
| assemble_complete.sh | 宏循环入口 | 最终报告发布 |
| phase_complete.sh | 微循环入口 | 下一Phase |
| quality_gate_complete.sh | 第1圈Step 1 | — |
| verify_dcf_arithmetic.py | 第1圈Step 4 | — |
| red-team-suite | Phase 4产出CQ校准值 | golden_numbers概率集 |
| valuation-quality-gate | Phase 5元审查 | 第2圈参考 |

---

*递归质量闭环 v1.0 — 微循环(Phase间对齐) + 宏循环(组装后递归修复) + 非回退保证*
