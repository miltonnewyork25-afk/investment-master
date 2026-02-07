# 多Agent协作协议 v1.0

> **目的**: 解决并行Agent执行中的5个协作痛点 — 重复I/O、无质量预检、无session恢复、无失败记录、批量commit
> **适用**: Tier 3 Deep-Dive Phase 1-5 的多Agent并行执行

---

## 1. 共享上下文 (减少~70%重复I/O)

### 问题
4个Agent各自读5-7个前序报告 = 20-28次文件读取，大量context浪费。

### 方案
主线程在dispatch前将所有前序Phase关键发现编译到一个文件: `data/research/{TICKER}/shared_context.md`

### 文件结构 (~3,000-5,000字符)

```markdown
# {TICKER} Phase {N} 共享上下文
## 编译时间: {timestamp}

### Section A: Core Questions (verbatim)
{从 core_questions.md 复制7个CQ}

### Section B: 前序Phase关键发现
{从 progress.md 的"关键发现"章节摘录}

### Section C: 量化汇总表
| Phase | 字符数 | 标注数 | 硬数据% | 目标达成率 |
|-------|--------|--------|---------|-----------|
{每Phase一行}

### Section D: 深度参考表 (仅需细节时读取)
| 主题 | 报告文件 | 关键数据点 |
|------|---------|-----------|
{每份报告一行，标注报告路径和核心数据}

### Section E: 质量标准提醒
- 标注密度: ≥15个/万字
- 硬数据占比: ≥40%
- 每模块必须有 So What 段落
- 字符目标: {本Agent目标}
```

### Agent Prompt改动

**旧**: "你必须读取的文件: [5-7个文件路径]"
**新**: "读取 `data/research/{TICKER}/shared_context.md`，仅需细节时才查 Section D 中的具体报告"

---

## 2. 任务锁 + 会话恢复

### 目录结构

```
data/research/{TICKER}/
├── current_tasks/           # Phase执行期间的任务锁
│   ├── Agent_A.lock.md      # Agent A 锁文件
│   ├── Agent_B.lock.md
│   └── ...
├── agent_logs/              # Agent执行日志 (永久)
│   ├── {TICKER}_Phase1_AgentA.log.md
│   └── ...
├── shared_context.md        # 共享上下文 (每Phase更新)
└── STATUS.md                # 实时仪表盘 (Phase执行期)
```

### 锁文件格式

```markdown
# Agent {X} 任务锁
- **启动时间**: {ISO 8601}
- **任务描述**: {模块列表}
- **成功标准**: ≥{N}字符, ≥15标注/万字, 硬数据≥40%
- **输出文件**: reports/{TICKER}_Phase{N}_Agent{X}_{描述}.md
- **状态**: RUNNING
```

### 生命周期

1. **创建**: 主线程dispatch前创建锁文件
2. **删除**: Agent完成 + 通过质量门控后删除
3. **清空**: Phase完成后清空 `current_tasks/` 目录

### Session恢复协议

新session检测到 `current_tasks/` 中有锁文件时:

```
Step 1: ls current_tasks/ → 列出未完成任务
Step 2: 检查每个锁文件对应的output文件是否已存在
Step 3:
  - output存在 + 通过quality gate → 标记完成，删锁
  - output存在 + 不合格 → 标记需重试
  - output不存在 → Agent崩溃，需重新dispatch
Step 4: 汇总报告给用户，用户决定重试/跳过
```

---

## 3. 质量门控 (双层)

### Layer 1: Agent自检

在Agent prompt末尾嵌入:

```
=== 自检清单 (写完后执行) ===
1. 运行 wc -m 验证字符数 ≥ {目标}
2. 搜索 [硬数据:] [合理推断:] [主观判断:] 计算标注密度
3. 验证硬数据占比 ≥ 40%
4. 确认每个模块有 So What 段落
5. 将自检结果写入执行日志
```

### Layer 2: 主线程验证

Agent返回后，主线程执行:

```bash
bash tests/research_fast.sh {output_file} {min_chars} {min_density}
```

- **PASS (exit 0)**: 删锁 → 更新STATUS.md → git commit
- **FAIL (exit 1)**: 记录到STATUS.md失败日志 → 重试Agent (最多1次)

### 脚本详情

见 `tests/research_fast.sh`，检查项:
1. 文件存在
2. `wc -m` ≥ 目标字符数
3. 标注密度 ≥ 15/万字
4. 硬数据占比 ≥ 40%
5. So What段落存在
6. 输出完整摘要

---

## 4. STATUS.md 实时仪表盘

### 与 progress.md 的关系

| 文件 | 生命周期 | 更新频率 | 用途 |
|------|---------|---------|------|
| `STATUS.md` | Phase执行期间 | 每个Agent完成时 | 实时监控 |
| `progress.md` | 项目全生命周期 | Phase完成时 | 永久档案 |

Phase完成后，STATUS.md关键信息合并入progress.md。

### 内容模板

```markdown
# {TICKER} Phase {N} 执行状态
## 更新时间: {timestamp}

### Agent状态
| Agent | 模块 | 状态 | 字符 | 标注 | 硬数据% | QG |
|-------|------|------|------|------|---------|-----|
| A | {modules} | PENDING/RUNNING/COMPLETED/FAILED | - | - | - | - |

### 累计指标
| 指标 | 当前 | 目标 | 达成率 |
|------|------|------|--------|
| 总字符 | {X} | {Y} | {%} |
| 总标注 | {X} | - | - |
| 硬数据% | {X}% | ≥40% | {PASS/FAIL} |

### 失败日志
| 时间 | Agent | 错误类型 | 详情 | 解决方案 |
|------|-------|---------|------|---------|
{每次FAIL一行}

### 下一步
1. {action item}
```

---

## 5. Agent执行日志

### 文件路径

`data/research/{TICKER}/agent_logs/{TICKER}_Phase{N}_Agent{X}.log.md`

### 内容模板

```markdown
# {TICKER} Phase {N} Agent {X} 执行日志

## 基本信息
- 启动时间: {timestamp}
- 完成时间: {timestamp}
- 模块: {module_list}
- 输出文件: {report_path}

## 统计
- 字符数: {wc -m}
- 标注: 硬数据={N} 合理推断={N} 主观判断={N}
- 标注密度: {N}/万字
- 硬数据占比: {N}%

## Top 5 发现
1. {finding}
2. ...

## WebSearch结果
| 查询 | 结果 | 有用? |
|------|------|-------|
{每次搜索一行}

## 遇到的问题
{如有}

## 自检结果
- 字符数: PASS/FAIL
- 标注密度: PASS/FAIL
- 硬数据占比: PASS/FAIL
- So What: PASS/FAIL
```

### 跨Phase学习

项目结束时扫描 `agent_logs/` 提取 recurring patterns → 更新 `docs/Lessons_Learned_Master_Archive.md`

---

## 6. 增量提交

### 旧流程
所有Agent完成 → 一次性batch commit

### 新流程
每个Agent完成 + 通过quality gate → 立即commit

### Commit格式

```
# 单Agent完成
feat({TICKER}): Phase {N} Agent {X} — {模块简述}

# Phase完成
feat({TICKER}): Phase {N} Complete — {Phase名称} 全模块验证
```

---

## 主线程工作流 (完整)

```
=== 阶段A: 预检 ===
Step 0: 读 progress.md + 检查 current_tasks/ (恢复协议)
Step 1: 读 execution_plan.md (本Phase模块分配)
Step 2: 编写 shared_context.md (合并所有前序发现)
Step 3: 初始化 STATUS.md (所有Agent=PENDING)
Step 4: 创建 current_tasks/Agent{X}.lock.md (每个Agent一个)

=== 阶段B: 执行 ===
Step 5: 并行dispatch Agent (prompt引用shared_context.md)
Step 6: 主线程同时执行自己的模块

=== 阶段C: 验证+提交 (每个Agent返回时) ===
Step 7: 运行 tests/research_fast.sh → PASS/FAIL
Step 8: FAIL → 记录到STATUS.md失败日志 + 重试Agent (最多1次)
Step 9: PASS → 删锁 + 更新STATUS.md + git commit (增量)

=== 阶段D: Phase收尾 ===
Step 10: 全部Agent完成 → 汇总检查 (总字数/CQ覆盖)
Step 11: STATUS.md关键数据合并入progress.md
Step 12: git commit "Phase {N} Complete"
Step 13: 提醒用户是否push
```

---

## 快速参考

| 机制 | 文件 | 创建时机 | 删除时机 |
|------|------|---------|---------|
| 共享上下文 | `shared_context.md` | Phase开始前 | 下个Phase覆盖 |
| 任务锁 | `current_tasks/Agent{X}.lock.md` | dispatch前 | Agent完成+QG通过 |
| 执行日志 | `agent_logs/{TICKER}_Phase{N}_Agent{X}.log.md` | Agent完成时 | 永久保留 |
| 状态仪表盘 | `STATUS.md` | Phase开始时 | Phase完成后合并入progress.md |
| 质量门控 | `tests/research_fast.sh` | 永久 | 永久 |
