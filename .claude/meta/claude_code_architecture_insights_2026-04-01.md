# Claude Code 架构深度学习与投资调研 Agent 进化路径

> **Meta系统分析**: 基于Claude Code CLI源码分析的框架革命思考
> **日期**: 2026-04-01
> **当前框架**: 投资研究Agent v20.0
> **分析深度**: 架构哲学级 + 实施路径级

## 当前状态诊断：我们在哪里？

### 我们的优势（已接近Claude Code水平）

1. **分层架构已经具备**
   - L1原则 > L2工具 > L3检查 的三层分离
   - 静态知识（ironrules/analysis_modules）vs 动态状态（checkpoint/staging）
   - 主CLAUDE.md（8.9K核心）+ worktree thin-shell（≤3K行业增量）

2. **多Agent协作成型**
   - Fork: `/data-prefetch` 并行7个WebSearch Agent
   - Subagent: `/expectation-gap` `/red-team-suite`专家模式
   - Swarm: 通过staging/文件传递协作（55文件限制）

3. **记忆演化系统**
   - Auto Memory（项目级）+ Team Memory（knowledge/）
   - 进化日志（evolution_log.yaml）+ 递归反思档案
   - 报告验尸（post_report_autopsy.sh）触发进化循环

4. **技能自动发现**
   - 23个skills根据trigger条件自动加载
   - orchestrator自动识别行业+组装模块

### 我们的差距（系统性薄弱点）

#### 🔴 差距1：上下文治理粗糙（Claude Code: 4层渐进 vs 我们: 粗暴clear）

**Claude Code的4层压缩**:
- Layer 1: 清理旧tool_result（保持缓存）
- Layer 2: Session Memory替代早期历史
- Layer 3: Fork agent全量摘要 + 恢复工作记忆
- Layer 4: 按消息组删除（20%递减）

**我们现状**:
- 只有context_save.sh粗暴保存 + 人工/clear
- 无智能压缩，无缓存优化，无工作记忆恢复

#### 🔴 差距2：缓存架构缺失（成本爆炸的根源）

**Claude Code**: 静态部分跨用户缓存，动态部分session级缓存
**我们**: 每次重新发送完整CLAUDE.md（8.9K）+ 全套铁律，无缓存意识

**成本测算**:
- Tier 3报告：5-8个session × 8.9K static prompt = 44.5-71.2K重复token
- 年度成本：40+ 报告 × 60K重复token = 240万无效token

#### 🔴 差距3：主动模式缺失（效率瓶颈）

**Claude Code**: PROACTIVE模式，焦点感知，token budget驱动
**我们**: 完全被动响应，需要用户手动"继续"，无自主推进能力

#### 🔴 差距4：框架膨胀失控（质量下滑根因）

**Claude Code**: 分层prompt，按需加载，dead code elimination
**我们**: CLAUDE.md已膨胀230行，50+ skills，铁律14个模块，context溢出

## 进化路径：基础设施优先的系统重构

### Phase A: 分层缓存架构（P0优先级）

#### A1. Prompt分层重构
```bash
# 静态层（跨session缓存）
.claude/prompt/static_core.md          # 身份+L1原则+工具使用（不变）
.claude/prompt/static_rules.md         # 铁律汇总（月度更新）
.claude/prompt/static_industry.md      # 行业路由表（季度更新）

# 动态层（session级）
.claude/prompt/session_context.md      # 当前ticker+phase状态
.claude/prompt/session_memory.md       # 工作记忆摘要
.claude/prompt/session_skills.md       # 当前激活skills
```

#### A2. 缓存感知的启动脚本
```bash
# 新启动脚本：分层组装
bash scripts/session_launch.sh AAPL TECH
├── 检测静态缓存有效性
├── 重用静态层（如果cache_key匹配）
├── 动态生成session层
└── boundary_marker分隔
```

**预期收益**: 节省60-70% prompt token，提升响应速度

### Phase B: 智能上下文压缩（P0优先级）

#### B1. 4层压缩系统
```bash
# Layer 1: 微压缩（tool_result清理）
scripts/micro_compact.sh
├── 删除旧data-prefetch结果
├── 保留最近5个tool_result
└── 缓存感知删除

# Layer 2: Session摘要
scripts/session_memory_compact.sh
├── 保留最近30K token
├── 生成session_memory.md（压缩早期历史）
└── 保持phase边界完整

# Layer 3: 智能全量摘要
scripts/intelligent_compact.sh
├── Fork专门压缩agent
├── 恢复激活skills+最近文件
└── 生成连贯的工作记忆

# Layer 4: 紧急压缩
scripts/emergency_compact.sh
└── 按Phase组删除（保护最近3个Phase）
```

#### B2. 压缩触发机制
- context < 50K: 正常工作
- 50K-100K: 启动Layer 1
- 100K-150K: 启动Layer 2
- 150K+: 启动Layer 3
- 极限情况: Layer 4

### Phase C: 主动执行模式（P1优先级）

#### C1. Token Budget驱动
```yaml
# .claude/session/budget_config.yaml
mode: proactive_research
token_budget: 100000
auto_continue: true
focus_aware: true
checkpoints:
  - phase_complete: true
  - major_insight: true
  - contradiction_detected: true
```

#### C2. 自主推进引擎
```bash
# 自主执行核心
scripts/proactive_controller.sh
├── 检测进度停滞（>5分钟无tool_use）
├── 评估剩余budget vs 完成度
├── 自动推进到下一步骤
└── 智能断点（重大发现时暂停）
```

#### C3. 焦点感知机制
- 用户在终端: 协作模式，重大决策询问
- 用户不在: 自主模式，直接推进
- 异常检测: 自动切回协作模式

### Phase D: 框架瘦身（P1优先级）

#### D1. 核心CLAUDE.md瘦身（目标≤100行）
```markdown
# 新CLAUDE.md结构（≤100行）
## 身份（5行）
## L1原则（20行）
## 分析路由（20行）
## 铁律速查表（30行，详情见modules/）
## 工具优先级（15行）
## 会话规范（10行）
```

#### D2. 按需加载系统
```bash
# 铁律模块按Phase加载
Phase 1: 自动加载 rule-N-evidence-style.md
Phase 4: 自动加载 rule-P-sell-framework.md
Phase 5: 自动加载 rule-J-assembly.md

# Skills按需发现
trigger_analysis.py
├── 扫描用户请求关键词
├── 匹配skill描述
├── 按相关度排序推送（top3）
```

#### D3. Dead Code Elimination
- 移除未使用的铁律（6个月无引用）
- 合并重复的检查脚本
- 压缩overlapping的skills

### Phase E: 多Agent协作进化（P2优先级）

#### E1. 权限冒泡系统
```bash
# 多Agent权限统一管理
scripts/permission_coordinator.sh
├── 收集所有agent的权限请求
├── 合并展示给用户
├── 决策分发到各agent
└── 避免多窗口点击
```

#### E2. 工作记忆共享
```yaml
# .claude/session/shared_context.yaml
active_ticker: AAPL
current_phase: Phase_2
shared_insights:
  - core_contradiction: "AI成长vs SBC成本"
  - key_numbers: {"NRR": "108%", "SBC_growth": "18%"}
agent_roles:
  main: orchestrator
  background: [data_monitor, assumption_audit]
```

## 实施优先级与时间线

### Week 1-2: 分层缓存（Phase A）
**核心ROI**: 节省60%+ token成本
- 重构CLAUDE.md为分层架构
- 实现session_launch.sh
- 测试缓存命中率

### Week 3-4: 智能压缩（Phase B）
**核心ROI**: 支持5+小时连续工作
- 实现4层压缩系统
- 集成到现有workflow
- 压缩质量验证

### Week 5-6: 主动模式（Phase C）
**核心ROI**: 减少50%人工intervention
- Token budget系统
- 自主推进引擎
- 焦点感知机制

### Week 7-8: 框架瘦身（Phase D）
**核心ROI**: 提升框架维护性
- CLAUDE.md瘦身到100行
- 按需加载系统
- Dead code清理

## 风险与缓解

### 风险1: 缓存失效导致行为不一致
**缓解**:
- 静态层版本控制（cache_key = md5(file_content)）
- session边界清晰标记
- fallback到全量prompt

### 风险2: 压缩丢失关键信息
**缓解**:
- 分层压缩，关键信息优先保护
- 压缩agent使用相同evaluation框架
- 压缩后工作记忆完整性检查

### 风险3: 主动模式过度自主
**缓解**:
- 重大决策（估值/评级）强制人工确认
- 焦点感知，用户在线时回到协作模式
- 明确的自主边界（不允许git commit）

## 成功指标

### 技术指标
- [ ] Prompt token节省 ≥60%
- [ ] 单session工作时长 ≥5小时
- [ ] 压缩后信息保持率 ≥95%
- [ ] 自主推进成功率 ≥80%

### 质量指标
- [ ] 报告质量维持4.4+分
- [ ] 分析密度保持≥5.0/万字
- [ ] 框架维护成本降低50%
- [ ] 新功能开发时间减少30%

### 用户体验指标
- [ ] "继续"命令使用频率降低60%
- [ ] context_save.sh调用频率降低80%
- [ ] 单个report完成的session数 ≤3
- [ ] 用户满意度调研（如可获得）

---

**下一步行动**:
1. 获得用户确认进化方向
2. 启动Phase A（分层缓存架构）实验
3. 建立实验tracking机制
4. 制定详细的技术实施计划