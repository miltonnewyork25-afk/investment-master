---
name: LLM Wiki v2 借鉴升级 v22.4
description: 最小可行升级 — supersession + lifecycle metadata + default/audit retrieval
type: project
status: active
confidence: 0.85
last_validated_at: "2026-04-16"
---

## LLM Wiki v2 借鉴升级 (2026-04-16)

### 决策: 按反过度工程版实施 (不是完整迁移版)

完整迁移版提出 4-layer memory system + `.claude/memory_system/` 独立子系统 + Phase A-E 五阶段。
**反过度工程版拒绝了这些**，只保留"让旧信念显式退休"这一个核心。

implementation brief 进一步把范围收窄到最小清单。我按 brief 实施，**零新目录、零 Python 模块**。

### 实施清单 (4 项改动, 1 个新脚本)

**W1: `pattern_registry.yaml` 增加 lifecycle 字段 (v1.1)**
- 每个 pattern 增加: `status` / `confidence` / `last_validated_at` / `supersedes` / `superseded_by` / `invalidated_by`
- 所有 8 个现有 pattern 标为 `status: active`
- registry 大小 6.2KB → 7.4KB (仍在 8KB 门控内)

**W2: `search_past_analysis.sh` 增加 default/audit 模式 (v1.1)**
- 默认过滤 frontmatter 标注 `status: superseded/invalidated` 的文件
- `--audit-mode` flag 显示全部 (用于复盘/调试)
- 过滤时显示"已过滤 N 行"提示

**W3: 新建 `scripts/memory_lifecycle.sh`**
- 4 个 action: `supersede` / `invalidate` / `archive` / `status` / `list-retired`
- 原则: 只改元数据 frontmatter, 不移动/删除文件
- 自动处理有/无 frontmatter 两种情况

**W4: CLAUDE.md + MEMORY.md 引用**
- CLAUDE.md 新增 1 行指向 lifecycle 脚本
- MEMORY.md 索引新增 1 条

### 关键设计决策

**为什么只标注 pattern_registry, 不全面标注 memory/*.md?**
Brief §10.2: "start with the highest-value objects — likely thesis / assumptions / patterns / handoff state"
现实: 实际 supersede 场景很少 (~10-15 个真实案例), 预扫描 40 个 memory 文件是凑数。

**为什么默认检索的过滤基于 frontmatter, 不基于专门的索引?**
反过度工程原则: 复用现有文件结构, 不建新索引。grep frontmatter 前 20 行足够快 (bash 级别 <100ms)。

**为什么不做 confidence decay?**
Brief §7.2: "avoid elaborate confidence math / dynamic decay engines"
现状: confidence 是手动赋值, 靠 `last_validated_at` 日期做隐式新鲜度感知。

### 成功标准 (Brief §13)

✓ 旧 thesis 片段默认不会再浮现 (需要真实 supersede 案例后验证)
✓ invalidated 假设可通过 audit 模式查看
✓ active 指引更容易识别
✓ 实施仍然简单 (4 改动 + 1 新脚本, ~300 行 bash)
✓ 零新目录, 零 Python, 零抽象层

### 失败标准 (Brief §13)

未触发任何失败条件:
- 无新子系统
- 检索未变模糊 (仍是 grep, 只是加了 filter)
- 当前 framework 没有更难维护

### How to apply

```bash
# 当 COHR v2 取代 COHR v1 时:
bash scripts/memory_lifecycle.sh supersede \
    reports/COHR/COHR_complete_v1.md \
    reports/COHR/COHR_complete_v2.md

# 当某个 thesis 被证伪时:
bash scripts/memory_lifecycle.sh invalidate \
    reports/LITE/staging/thesis_v1.md \
    "2026-Q1 NVDA 转向硅光, DM-TECH-045"

# 查看当前所有退休记忆:
bash scripts/memory_lifecycle.sh list-retired

# 复盘时需要看旧 thesis:
bash scripts/search_past_analysis.sh "thesis" --audit-mode
```

### 三次借鉴的完整对比

| 来源 | 核心借鉴 | 实施规模 |
|---|---|---|
| Hermes (v22.3) | 压缩/Ephemeral/门控/搜索/裁剪 | 4 脚本 + 2 yaml |
| MiroFlow (v22.3) | 回滚/失败摘要/三档模式/统计评测 | 2 脚本 + 1 yaml |
| LLM Wiki v2 (v22.4) | Supersession + lifecycle + audit mode | 1 脚本 + 1 文件修改 |

LLM Wiki v2 是三次中最克制的 — 因为反过度工程 brief 明确划定了边界。
