# 确定性门禁迁移表 v1.0

> **核心问题**: 当前框架的所有约束都依赖 prompt 注入。Agent 被 compact / 新会话 / context 溢出时，规则可能丢失。
> **解决方向**: 将关键约束从 "记得遵守" 迁移到 "平台强制"(scripts/hooks/file-access/checkpoints)。
> **迁移原则**: 不是所有规则都需要迁移。只迁移: 违反后果严重 + 可自动化检测 + 有明确阻断条件的约束。

---

## 1. 迁移优先级评估框架

| 维度 | 权重 | 评分标准 |
|------|:----:|---------|
| **违反后果** | 40% | 3=报告无效(数据编造) / 2=质量严重下降 / 1=影响可控 |
| **检测可行性** | 30% | 3=脚本可检测 / 2=规则可检测但需逻辑 / 1=需人工判断 |
| **历史违反频率** | 20% | 3=多次发生 / 2=偶尔发生 / 1=从未发生 |
| **迁移复杂度** | 10% | 3=简单(现有工具) / 2=需写新脚本 / 1=需平台支持 |

**优先级 = 加权总分**: ≥2.5 = P0 立即迁移 | 2.0-2.4 = P1 本轮迁移 | <2.0 = P2 留待未来

---

## 2. 完整迁移表

### 铁律系统 (15条)

| # | 铁律 | 当前执行 | 违反后果 | 检测可行 | 违反频率 | 迁移复杂 | 加权分 | 优先级 | 迁移方案 |
|---|------|---------|:-------:|:-------:|:-------:|:-------:|:------:|:------:|---------|
| 1 | 数据必有源 | prompt | 3 | 3 | 2 | 3 | **2.7** | **P0** | `verify_data_sources.sh` 扩展 EC 检查 |
| 2 | 判断必有据 | prompt | 2 | 2 | 2 | 2 | **2.0** | P1 | EC linked_question 检查 |
| 3 | 预测必可验 | prompt | 2 | 2 | 1 | 2 | **1.8** | P2 | TS 格式脚本检查 |
| 4 | 洞察必反证 | prompt | 2 | 1 | 1 | 1 | **1.5** | P2 | 需人工判断 |
| 5 | 结论必可追踪 | prompt | 3 | 3 | 1 | 3 | **2.5** | **P0** | KS 9字段格式脚本 |
| 6 | 概率必背离分析 | prompt | 2 | 2 | 1 | 2 | **1.8** | P2 | PPDA 存在性检查 |
| 7 | 情绪必市场验证 | prompt | 1 | 2 | 1 | 2 | **1.4** | P2 | — |
| 8 | AI必分部评估 | prompt | 2 | 3 | 1 | 3 | **2.2** | P1 | M13 表格存在性检查 |
| 9 | 热点必回应 | prompt | 2 | 2 | 2 | 2 | **2.0** | P1 | M14 覆盖率计算 |
| 10 | 数据必审计 | script | 3 | 3 | 1 | 3 | **2.5** | **P0** | 已有脚本，扩展EC指标 |
| 11 | 看空必等权 | script | 3 | 3 | 2 | 3 | **2.7** | **P0** | 看空字符占比计算 |
| 12 | 模块必So What | prompt | 2 | 1 | 2 | 1 | **1.7** | P2 | 需人工判断 |
| 13 | Phase必Fast Gate | **script** | 3 | 3 | 1 | 3 | **2.5** | **P0** | ✅ 已迁移(research_fast.sh) |
| 14 | 无源数字禁写 | prompt | 3 | 3 | 3 | 2 | **2.9** | **P0** | verify + EC orphan_claims |
| 15 | 估值修正必审计 | prompt | 2 | 2 | 1 | 2 | **1.8** | P2 | 审计日志检查 |

### 反幻觉5条禁令

| # | 禁令 | 当前执行 | 加权分 | 优先级 | 迁移方案 |
|---|------|---------|:------:|:------:|---------|
| AH-1 | 禁凭记忆引用财务数字 | prompt注入 | **2.7** | **P0** | EC fact 必须有 source.locator |
| AH-2 | 禁合理推算替代真实数据 | prompt注入 | **2.5** | **P0** | EC inference 必须有 method 字段 |
| AH-3 | 禁编造可比公司倍数 | prompt注入 | **2.3** | P1 | SOTP 三步验证脚本 |
| AH-4 | 禁虚构预测市场概率 | prompt注入 | **2.1** | P1 | polymarket_events 调用日志 |
| AH-5 | 禁未标注来源的百分比 | prompt注入 | **2.5** | **P0** | EC completeness 检查 |

### 红队协议 (RT-1~7)

| # | 红队问题 | 当前执行 | 加权分 | 优先级 | 迁移方案 |
|---|---------|---------|:------:|:------:|---------|
| RT-1 | 承重墙测试 | prompt | **2.3** | P1 | 承重墙表格存在性脚本 |
| RT-2 | 认知偏差审计 | prompt | **1.8** | P2 | 需人工判断 |
| RT-3 | 空头钢人 | prompt | **2.1** | P1 | ≥3条独立论点计数 |
| RT-4 | 数据质量审计 | prompt | **2.5** | **P0** | ≥10个数据点抽查脚本 |
| RT-5 | 黑天鹅压力测试 | prompt | **2.3** | P1 | 概率加权表存在性检查 |
| RT-6 | 时间框架挑战 | prompt | **1.8** | P2 | 催化剂日历交叉验证 |
| RT-7 | 替代解释 | prompt | **1.8** | P2 | 需人工判断 |

### 结构性约束

| # | 约束 | 当前执行 | 加权分 | 优先级 | 迁移方案 |
|---|------|---------|:------:|:------:|---------|
| S-1 | P5=3Agent铁律 | prompt | **2.3** | P1 | Agent dispatch 计数器 |
| S-2 | Bear Agent 信息隔离 | prompt | **2.7** | **P0** | contamination_guard + 白名单注入 |
| S-3 | 单会话禁跨Phase | prompt | **2.1** | P1 | Phase 标记+checkpoint 检查 |
| S-4 | 发布合规(第零律) | prompt+grep | **2.9** | **P0** | grep脚本 + 阻断发布 |
| S-5 | DM Phase 4后冻结 | prompt | **2.3** | P1 | 文件时间戳检查 |
| S-6 | Agent产出→staging文件 | prompt | **2.1** | P1 | staging 文件存在性检查 |
| S-7 | Checkpoint必写 | prompt | **2.5** | **P0** | checkpoint.yaml 修改时间检查 |

---

## 3. P0 迁移方案详细设计

### Gate-P0-1: verify_data_sources.sh 扩展 (铁律1+10+14, AH-1/2/5)

**当前能力**: DM覆盖率 + 数值一致性 + 新鲜度检查
**扩展项**:

```bash
# 新增检查项 (v2.0)
check_ec_completeness() {
  # 检查所有 EC 的必填字段完备率
  # claim + claim_type + source.type + source.locator + source.timestamp + status
  # 目标: ≥95%
}

check_ec_verification_rate() {
  # 检查 status=verified 的 EC 占比
  # 目标: ≥80%
}

check_ec_orphan_claims() {
  # 提取报告中所有数字
  # 检查每个数字是否有对应 EC
  # 目标: 0 孤儿数字
}

check_ec_fact_ratio() {
  # 检查 claim_type=fact 的 EC 占比
  # 目标: ≥50%
}
```

**阻断行为**: 脚本返回非0 → git commit 被阻断(已有机制，扩展检查项)

### Gate-P0-2: Bear Agent Contamination Guard (S-2)

**实现**: Agent dispatch 时的 prompt 注入强制化

```markdown
# 强制注入到 Phase 4 Bear Agent 的 prompt 前缀

## CONTAMINATION GUARD — 不可删除

你是独立的空头分析师。以下是你唯一允许引用的信息:

### 允许引用 (白名单):
- reports/{TICKER}/data/shared_context.md 中的 DM-FIN 和 DM-MKT 锚点
- Core Questions 文本 (仅问题，不含前序回答)
- SEC Filing 原始文件
- MCP 工具直接获取的数据

### 禁止引用 (黑名单):
- Phase 1-3 的任何 staging/ 文件
- Phase 2 的估值结论
- shared_context.md 中的 "投资论点" / "论文" / "看多" 章节
- 任何包含 "我们认为" / "论文支持" / "正面" 的段落

### 违反处理:
如果你发现自己引用了黑名单内容，立即删除该段落重写。
```

**验证**: Agent 返回后，DQA 扫描 staging 文件中是否有黑名单关键词引用

### Gate-P0-3: 发布合规自动检查 (S-4)

**实现**: Complete 组装后、git commit 前自动运行

```bash
check_publication_compliance() {
  local report="$1"
  local violations=0

  # 检查禁用词 (排除引号内的Polymarket原文)
  # 使用 docs/deep_dive_protocol.md 中的转换表
  while IFS= read -r line; do
    # 跳过引号内的内容 (Polymarket例外)
    cleaned=$(echo "$line" | sed 's/"[^"]*"//g')
    if echo "$cleaned" | grep -iqE '入侵台湾|invade taiwan|invasion of taiwan'; then
      violations=$((violations + 1))
      echo "VIOLATION: $line"
    fi
  done < "$report"

  return $violations  # 0=通过, >0=阻断
}
```

### Gate-P0-4: 看空等权检查 (铁律11)

**实现**: 已在 quality_gate_complete.sh 中部分存在，强化为硬阻断

```bash
check_bear_case_ratio() {
  local report="$1"
  local total_chars=$(wc -m < "$report")

  # 定位 Phase 4 + Bear Case + 风险 + Kill Switch 章节
  local bear_chars=$(extract_bear_sections "$report" | wc -m)

  local ratio=$(echo "scale=2; $bear_chars * 100 / $total_chars" | bc)

  if (( $(echo "$ratio < 18" | bc -l) )); then
    echo "FAIL: Bear case ratio ${ratio}% < 18% minimum"
    return 1
  fi
  return 0
}
```

### Gate-P0-5: Checkpoint 必写检查 (S-7)

**实现**: Phase完成脚本中强制检查

```bash
# 在 phase_complete.sh 中添加
check_checkpoint_exists() {
  local ticker="$1"
  local checkpoint="reports/${ticker}/data/checkpoint.yaml"

  if [ ! -f "$checkpoint" ]; then
    echo "FAIL: checkpoint.yaml 不存在"
    return 1
  fi

  # 检查 checkpoint 更新时间 < 5分钟前
  local mod_time=$(stat -f %m "$checkpoint" 2>/dev/null || stat -c %Y "$checkpoint")
  local now=$(date +%s)
  local diff=$((now - mod_time))

  if [ $diff -gt 300 ]; then
    echo "WARN: checkpoint.yaml 超过5分钟未更新"
  fi
  return 0
}
```

---

## 4. 迁移进度追踪表

| 批次 | 约束数 | 迁移方式 | 状态 | 验证报告 |
|------|:------:|---------|:----:|---------|
| **P0-Batch1** | 12项 | 脚本扩展+prompt强化 | 待实施 | 首份新报告 |
| P1-Batch2 | 10项 | 新脚本+格式检查 | 待P0验证后 | 第二份报告 |
| P2-Batch3 | 9项 | 需平台能力/人工判断 | 规划中 | TBD |

### P0 迁移清单 (12项)

- [ ] 铁律1: 数据必有源 → EC completeness 检查
- [ ] 铁律5: 结论必可追踪 → KS 9字段脚本
- [ ] 铁律10: 数据必审计 → EC 指标扩展
- [ ] 铁律11: 看空必等权 → 字符占比计算
- [ ] 铁律13: Phase必Fast Gate → ✅ 已迁移
- [ ] 铁律14: 无源数字禁写 → EC orphan_claims
- [ ] AH-1: 禁凭记忆 → EC fact source.locator
- [ ] AH-2: 禁合理推算 → EC inference method
- [ ] AH-5: 禁未标注% → EC completeness
- [ ] RT-4: 数据审计 → 抽查脚本
- [ ] S-2: Bear隔离 → contamination_guard
- [ ] S-4: 发布合规 → grep脚本+阻断
- [ ] S-7: Checkpoint必写 → 时间戳检查

---

## 5. 自动评分指标

| 指标 | 公式 | 目标 | 当前值 |
|------|------|:----:|:-----:|
| **gates.migration_ratio** | 已迁移约束 / P0约束 | 100% | 8%(仅铁律13) |
| **gates.violation_rate** | 被门禁阻断的次数 / 总commit次数 | 跟踪中 | N/A |
| **gates.false_positive_rate** | 误阻断 / 总阻断 | <10% | N/A |
| **prompt.dependency_ratio** | 仅靠prompt的约束 / 总约束 | <50% | ~92% |

---

## 6. 长期路线图: Claude Code Hooks 集成

> 当前 Claude Code hooks 支持 PreToolUse / PostToolUse / PreCompact 等事件。
> 以下是当 hooks 能力成熟后的集成计划。

### 阶段 1: 现在可做 (脚本+prompt)

| 门禁 | 实现 | 触发点 |
|------|------|--------|
| FastGate | `research_fast.sh` | Phase 完成后，git commit 前 |
| EC验证 | `verify_data_sources.sh` v2.0 | Phase 5.5 组装后 |
| 发布合规 | `check_compliance.sh` | Complete 组装后 |
| Checkpoint | `phase_complete.sh` | Phase 完成后 |

### 阶段 2: 近期可做 (hooks 文件)

```json
// .claude/hooks.json (未来)
{
  "hooks": [
    {
      "event": "PreCompact",
      "command": "bash scripts/context_save.sh",
      "description": "compact前自动保存checkpoint"
    },
    {
      "event": "SessionStart",
      "command": "bash tests/framework_health_check.sh",
      "description": "会话启动时健康检查"
    }
  ]
}
```

### 阶段 3: 未来可做 (需平台能力扩展)

| 能力 | 需要的平台支持 | 解决的问题 |
|------|-------------|-----------|
| 文件访问控制 | Agent 级别的读取白名单 | Bear Agent 真正无法读取 Phase 1-3 |
| Context 注入 | 被 compact 后自动重注入关键规则 | PreCompact hook 注入铁律 |
| 工具调用拦截 | PreToolUse 条件阻断 | 禁止在特定Phase调用特定工具 |
| Turn 计数器 | 会话级 turn 统计 | max_turns 硬性限制 |

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2026-02-14 | 初版。31项约束评估 + P0/P1/P2分级 + 12项P0迁移方案 + hooks路线图 |
