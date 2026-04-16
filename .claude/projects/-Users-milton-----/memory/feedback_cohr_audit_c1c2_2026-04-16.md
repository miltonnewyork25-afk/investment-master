---
name: COHR audit 驱动的 quality_gate 升级 (C1+C2)
description: v22.7 — 基于 COHR v2.0 audit 修复两个 quality_gate 的 interface 失配 + 新增 process residue 检测
type: project
status: active
confidence: 0.95
last_validated_at: "2026-04-16"
---

## COHR Audit 升级 (2026-04-16, v22.7)

### 触发: COHR v2.0 audit 暴露的失败模式

**COHR v2.0 报告 (291522 字符, 180K 正文)**:
- research_scorecard: 71/100 (D11 正交度 8/10)
- quality_gate_complete: **FAILED** (5 项)

**5 项 FAIL 中 2 项是 false positive (interface 失配)**:
- CG8: 标注密度 0.0/万字 — **错**: COHR 有 **563 处独立 DM 锚点** `[DM-VAL-003]`, 但 gate 只认识内联格式 `[硬数据:... | DM-*]`
- CG9: 无标注, 无法计算硬数据占比 — **错**: 同上 interface 失配

**15 处 "Agent findings" residue 被 CG15 漏掉** — CG15 只查 "Agent A/B/C" 身份, 不查 process 痕迹。

### 实施 (2 个最小修改)

**C1: 新增 CG23 — Process 残留检测 (FAIL 级)**
- 检测 "Agent findings", "P[0-9]+[- ]?[ABC] Agent 产出"
- 检测 "Phase [0-9.]+ ?完成" / "Phase X complete"
- 阈值: 0 = PASS, 1-5 = WARN, >5 = FAIL

**C2: 扩展 CG8/CG9 — 独立 DM 锚点识别**
```bash
STANDALONE_DM=$(grep -oE '\[DM-[A-Za-z0-9]+-[0-9]+(/[0-9]+)*\]' "$FILE" | wc -l)
TOTAL_ANN=$((OLD_ANN + NEW_ANN + STANDALONE_DM))  # CG8
HARD_DATA=$((HARD_DATA + STANDALONE_DM))           # CG9 (DM = 硬数据)
```

### 验证结果

**COHR v2.0 修复前**: CG8/CG9 FAIL (false positive), CG3/CG4/CG11/CG15 FAIL (真问题) = 5 项 FAIL
**COHR v2.0 修复后**:
- CG8: 31.2/万字符 (独立DM=563 总=563) → **PASS**
- CG9: 硬数据占比 100.0% (563/563) → **PASS**
- CG23: Process 残留 15 处 > 5 → **新抓到真问题 FAIL**
- CG3/CG4/CG11/CG15 仍 FAIL (未被 C1+C2 覆盖, 作者手动修)

质量改善: **2 个 false positive 消除 + 1 个真问题新捕获**

**无 regression**: AMZN (标杆) 和 FTNT (v10.0 路径) CG23 都 PASS。

### 为什么不实施 C3-C6

handoff 文档提出 6 项升级, 只选 C1+C2, 拒绝其他 4 项:

- **C3 (KS 唯一性/覆盖度)**: 作者会为过 gate 凑 KS → 装饰性 Kill Switch, 违反铁律 M
- **C4 (主报告 vs 附录分离脚本)**: rule-J-assembly.md 方法论已有, 脚本化过度工程
- **C5 (圆桌共识/异议结构)**: rule-R-four-mandatory R-3 已要求异议 ≥3/5
- **C6 (自动 CI + Framework 注册)**: 会变成装饰性合规

### 核心洞察: gate 的边界

加 gate 是**机械可测问题的 surgical precision**, 不是 sweeping additions:
- ✓ Process residue (grep 可测)
- ✓ DM 锚点识别 (grep 可测)
- ✗ KS 唯一性深度 (作者会凑)
- ✗ CI 注册 (会变格式化合规)

**更多 gate ≠ 更强 publish layer**。真正的 publish layer 要在**人工审稿 + 机械检测**之间找平衡。

### 成本

- 修改: `tests/quality_gate_complete.sh` ~25 行
- 新 gate: 1 个 (CG23), 扩展 2 个 (CG8, CG9)
- 无新脚本, 无新目录

### COHR 剩余真问题 (作者需手动修复)

- CG3: 评分维度 2 < 8
- CG4: Kill Switch 6 < 12 (真补, 不装饰)
- CG11: 缺免责声明
- CG15: Agent 引用残留 4 处 (和 CG23 互补)
- CG23: Process 残留 15 处 (新抓到)

### How to apply

Phase 5 Complete 生成时自动触发:
```bash
bash tests/quality_gate_complete.sh reports/{TICKER}/{TICKER}_complete.md
# CG8/CG9 会自动识别独立 DM 锚点
# CG23 会自动检测 process residue
```
