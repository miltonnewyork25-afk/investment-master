# Agent 升级计划 v19.2 - 2026-01-31

> 执行 `/upgrade-agent` 命令的 Phase 4: 升级计划

## 升级版本

**当前版本**: v19.1
**目标版本**: v19.2
**升级主题**: Reflection 循环 + Procedural Memory

---

## 本次升级范围

### 1. Reflection 循环（分析过程中的自我批评）

**目标**: 在 Phase 3 深度分析中增加 Generate → Critique → Improve 循环

**实现步骤**:
1. 更新 CLAUDE.md Phase 3 部分
2. 增加 Reflection Checkpoint
3. 输出模板增加"自我批评"部分

**Reflection 模板**:
```markdown
## 自我批评（Reflection）

### 我刚才分析的弱点
1. [识别的弱点1]
2. [识别的弱点2]

### 改进后的分析
[基于批评的改进版本]

### 改进效果
- 深度提升: [描述]
- 覆盖提升: [描述]
```

---

### 2. Procedural Memory（技能记忆）

**目标**: 创建 procedural_memory.yaml，记录"如何做某事"的最佳实践

**实现步骤**:
1. 创建 `skills/knowledge_base/procedural_memory.yaml`
2. 定义技能记录格式
3. 初始化已知技能

**技能记录格式**:
```yaml
skill_id: SKILL_XXX
name: "技能名称"
description: "技能描述"
applicable_to: ["适用场景"]
steps:
  - step: 1
    action: "具体动作"
    tips: ["注意事项"]
learned_from: "来源（分析/教训/外部）"
success_rate: 0.XX
last_used: "YYYY-MM-DD"
```

---

### 3. 失败历史追踪

**目标**: 在问题解决过程中记录"尝试-结果"历史

**实现步骤**:
1. 更新 lessons_learned.yaml 格式
2. 增加 attempts_history 字段
3. 分析前检索相关历史

**格式更新**:
```yaml
lesson:
  id: LL_XXX
  # ... 现有字段 ...
  attempts_history:
    - attempt: 1
      what_tried: "尝试的方法"
      result: "失败"
      failure_reason: "失败原因"
    - attempt: 2
      what_tried: "改进的方法"
      result: "成功"
```

---

## 预期效果

| 改进 | 预期指标 | 验证方法 |
|------|---------|---------|
| Reflection 循环 | 分析深度 +0.3 Level | 对比有/无 Reflection 的报告 |
| Procedural Memory | 技能复用率 +30% | 统计技能调用次数 |
| 失败历史追踪 | 重复错误 -50% | 统计同类错误频率 |

---

## 验证方法

1. **Reflection**: 下次深度分析时使用，对比质量
2. **Procedural Memory**: 记录 5 个初始技能，验证检索有效性
3. **失败历史**: 记录 3 个历史案例，验证避免重复

---

## 回滚方案

如果升级导致问题：
1. 保留 v19.1 的 CLAUDE.md 备份
2. Reflection 是可选步骤，可跳过
3. Procedural Memory 是新增文件，删除即可

---

## 执行确认

- [ ] 创建 procedural_memory.yaml
- [ ] 更新 CLAUDE.md 增加 Reflection 部分
- [ ] 更新版本号到 v19.2
- [ ] 提交 git

---

**计划时间**: 2026-01-31
**下一步**: 执行升级 (Phase 5)
