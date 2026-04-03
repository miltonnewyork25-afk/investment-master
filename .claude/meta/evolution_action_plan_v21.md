# 投资调研Agent v21.0 进化行动计划

> **基于Claude Code架构启示的系统级重构**
> **目标**: 基础设施优先，解决成本/效率/质量三大瓶颈
> **时间**: 8周分4个Phase

## 🎯 核心问题与解决方案

| 当前痛点 | Claude Code解决方案 | 我们的实施路径 |
|---------|-------------------|-------------|
| **Token成本爆炸** | 分层缓存（静态+动态） | CLAUDE.md分层重构 + 缓存感知脚本 |
| **Context溢出频繁** | 4层智能压缩 | micro→session→intelligent→emergency |
| **需要频繁"继续"** | 主动执行模式 | Token budget + 焦点感知 + 自主推进 |
| **框架膨胀失控** | 按需加载 + 死代码清理 | 100行核心 + 模块化铁律 + skill发现 |

## 🚀 进化路径（4 Phases, 8 weeks）

### Phase A: 分层缓存架构 (Week 1-2) 🔥
**核心ROI**: 节省60%+ token成本

```bash
# 静态层（跨session复用）
.claude/prompt/static_core.md      # 身份+L1原则（不变内容）
.claude/prompt/static_rules.md     # 铁律汇总（月度更新）

# 动态层（session级）
.claude/prompt/session_context.md  # ticker+phase状态
.claude/prompt/session_memory.md   # 工作记忆摘要

# 缓存感知启动
bash scripts/session_launch.sh AAPL TECH
├── 检测static cache有效性
├── 重用静态层（cache_key匹配）
└── 动态生成session层
```

**成功标准**:
- [ ] Prompt token减少60%+
- [ ] 启动速度提升3x
- [ ] 静态缓存命中率>90%

### Phase B: 智能上下文压缩 (Week 3-4) 🔥
**核心ROI**: 支持5+小时连续工作

```bash
# 4层渐进压缩
Layer 1: micro_compact.sh      # 清理旧tool_result，保持缓存
Layer 2: session_memory.sh     # 保留30K，摘要早期历史
Layer 3: intelligent_compact.sh # Fork agent全量摘要+恢复工作记忆
Layer 4: emergency_compact.sh   # 按Phase组删除（保护最近3个）

# 自动触发
context < 50K: 正常工作
50-100K: Layer 1
100-150K: Layer 2
150K+: Layer 3
```

**成功标准**:
- [ ] 单session连续工作≥5小时
- [ ] 压缩后信息保持率≥95%
- [ ] 无手动context_save需求

### Phase C: 主动执行模式 (Week 5-6) 🔥
**核心ROI**: 减少50%人工intervention

```yaml
# Token Budget驱动
mode: proactive_research
token_budget: 100000
auto_continue: true
focus_aware: true
breakpoints:
  - major_contradiction: true
  - valuation_complete: true
  - user_input_required: true
```

```bash
# 自主推进引擎
scripts/proactive_controller.sh
├── 检测停滞（>5分钟无进展）
├── 评估budget vs 完成度
├── 自动推进下一步
└── 重大决策暂停确认
```

**成功标准**:
- [ ] "继续"命令使用减少60%
- [ ] 自主推进成功率≥80%
- [ ] 重大决策仍保持人工确认

### Phase D: 框架瘦身 (Week 7-8) 🟡
**核心ROI**: 框架维护性+50%

```markdown
# 新CLAUDE.md（≤100行）
## 身份（5行）
## L1原则（20行）
## 分析路由（20行）
## 铁律速查（30行）→详情见modules/
## 工具优先级（15行）
## 会话规范（10行）
```

```bash
# 按需加载
Phase 1: 自动加载 rule-N-evidence-style.md
Phase 4: 自动加载 rule-P-sell-framework.md
Phase 5: 自动加载 rule-J-assembly.md

# Dead code清理
- 移除6个月未引用铁律
- 合并重复检查脚本
- skill触发智能化
```

**成功标准**:
- [ ] CLAUDE.md ≤100行
- [ ] 铁律按需加载率100%
- [ ] 新功能开发时间-30%

## 📊 投资回报分析

### 成本节省（年化）
- **Token成本**: 60%节省 × 240万年Token = 144万Token节省
- **人工时间**: 50%减少intervention × 40报告 × 2小时/报告 = 40小时节省
- **维护成本**: 框架复杂度-50% × 维护时间 = 显著减少

### 质量提升
- **连续工作**: 5+小时 vs 当前2小时（频繁clear）
- **分析深度**: 无context压力，更深入分析
- **错误减少**: 自动检查点，减少人工遗漏

### 能力解锁
- **多Agent并行**: 无context污染的真并行
- **长期记忆**: 智能压缩的工作记忆系统
- **自主研究**: 从工具升级为研究伙伴

## ⚠️ 风险管控

### 技术风险
- **缓存失效** → cache_key版本控制 + fallback
- **压缩丢失** → 关键信息优先保护 + 完整性检查
- **过度自主** → 重大决策强制人工确认

### 质量风险
- **分析质量下降** → 保持4.4+分质量标准
- **framework drift** → 定期quality gate verification
- **复杂度反弹** → 严格的代码评审 + 膨胀监控

### 实施风险
- **过度工程** → MVP先行，渐进式部署
- **兼容性** → 向后兼容现有workflow
- **学习曲线** → 充分文档 + 渐进迁移

## 🎬 下一步行动

### 立即行动（今天）
1. **用户确认**: 进化方向和优先级
2. **环境准备**: 建立实验分支
3. **Phase A启动**: 开始CLAUDE.md分层重构

### Week 1重点
- [ ] 设计静态/动态prompt分层架构
- [ ] 实现session_launch.sh cache感知
- [ ] A/B测试token节省效果

### 持续监控
- [ ] 每周进度review
- [ ] 质量指标监控（4.4+分维持）
- [ ] 用户体验反馈收集
- [ ] 投资回报量化追踪

---

**决策点**: 我们应该立即启动这个进化计划吗？还是需要调整优先级/范围？