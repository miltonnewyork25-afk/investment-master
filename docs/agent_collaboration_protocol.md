# 多Agent协作协议 v1.1

> **目的**: 解决并行Agent执行中的6个协作痛点 — 重复I/O、无质量预检、无session恢复、无失败记录、批量commit、文件碎片化
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
│   ├── Agent_A.lock.md
│   └── ...
├── agent_logs/              # Agent执行日志 (永久)
│   ├── {TICKER}_Phase1_AgentA.log.md
│   └── ...
├── shared_context.md        # 共享上下文 (每Phase更新)

reports/{TICKER}/
├── staging/                 # Agent暂存区 (临时，QG通过后删除)
│   ├── Phase1_AgentA_raw.md
│   └── ...
├── {TICKER}_Phase1.md       # Phase级主文件 (主线程归档)
├── {TICKER}_Phase2.md
└── {TICKER}_Complete.md     # 最终合并报告 (项目结束时生成)
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

- **PASS (exit 0)**: 删锁 → git commit
- **FAIL (exit 1)**: 记录到agent_logs → 重试Agent (最多1次)

### 脚本详情

见 `tests/research_fast.sh`，检查项:
1. 文件存在
2. `wc -m` ≥ 目标字符数
3. 标注密度 ≥ 15/万字
4. 硬数据占比 ≥ 40%
5. So What段落存在
6. 输出完整摘要

---

## 4. Agent状态追踪 (已简化)

> STATUS.md 已废弃 (v2.0)。Agent执行状态通过 lock files 追踪，Phase进度通过 checkpoint.yaml 追踪。

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

## 7. 暂存→归档 (消除文件碎片化)

### 问题
4路Agent × 5个Phase = 20+个零散报告文件，不可读、不可交付。

### 方案: Agent写暂存，主线程归档到Phase主文件

```
Agent写入 staging/ → 主线程QG验证 →
  PASS → 追加到Phase主文件 → 删staging → git commit
  FAIL → 重试Agent

Phase全部完成 → Phase主文件即为交付物
项目结束 → 合并所有Phase文件为Complete报告
```

### 主线程归档操作

Agent通过QG后，主线程执行:

1. **提取内容**: 去掉Agent文件的元数据头(前5-6行)和免责声明尾(最后2行)
2. **追加到Phase主文件**: 添加模块分隔线，保留所有标注和内容
3. **删除staging文件**: `rm reports/{TICKER}/staging/Phase{N}_Agent{X}_raw.md`
4. **git commit**: 增量提交Phase主文件

### Phase主文件结构

```markdown
# {TICKER} Deep Research — Phase {N}: {Phase名称}
## 公司: {Name} | 日期: {date} | 框架: v21.0

### 目录
- [模块1名称](#)
- [模块2名称](#)
- ...

---

## 模块1: {标题} (来源: Agent A)
{Agent A 内容}

---

## 模块2: {标题} (来源: Agent B)
{Agent B 内容}

---

*免责声明: ...*
```

### 最终合并 (项目结束时)

Phase 1-5全部完成后，生成完整报告:

```bash
# 合并所有Phase文件为最终报告
cat reports/{TICKER}/{TICKER}_header.md \
    reports/{TICKER}/{TICKER}_Phase1.md \
    reports/{TICKER}/{TICKER}_Phase2.md \
    reports/{TICKER}/{TICKER}_Phase3.md \
    reports/{TICKER}/{TICKER}_Phase4.md \
    reports/{TICKER}/{TICKER}_Phase5.md \
    > reports/{TICKER}/{TICKER}_Complete.md
```

**文件数量对比**:
- 旧: 20-28个零散Agent文件
- 新: 5个Phase文件 + 1个Complete文件 = 6个文件

### Agent返回规范 (v1.2新增)

SubAgent完成后，**仅返回以下摘要到主线程** (≤500字符):

```
=== Agent {X} 完成 ===
file: reports/{TICKER}/staging/Phase{N}_Agent{X}.md
chars: 12450
qg_self_check: PASS
top3:
  1. [关键发现1, ≤80字符]
  2. [关键发现2, ≤80字符]
  3. [关键发现3, ≤80字符]
anchors: [DM-FIN-001 v1.0, DM-MEM-001 v1.0]
```

完整输出已在Step 7写入staging文件。主线程通过Step 10读取staging文件合并。
**禁止**: SubAgent将完整报告内容作为返回消息发送给主线程。

---

## 主线程工作流 (完整)

```
=== 阶段A: 预检 ===
Step 0: 读 progress.md + 检查 current_tasks/ (恢复协议)
Step 1: 读 execution_plan.md (本Phase模块分配)
Step 2: 编写 shared_context.md (合并所有前序发现)
Step 3: 创建 current_tasks/Agent{X}.lock.md (每个Agent一个)

=== 阶段B: 执行 ===
Step 5: 并行dispatch Agent (prompt引用shared_context.md)
Step 6: 主线程同时执行自己的模块

=== 阶段C: 验证+归档 (每个Agent返回时) ===
Step 7: Agent输出写入 reports/{TICKER}/staging/
Step 8: 运行 tests/research_fast.sh → PASS/FAIL
Step 9: FAIL → 记录到agent_logs + 重试Agent (最多1次)
Step 10: PASS → 追加到Phase主文件 + 删staging + 删锁 + git commit

=== 阶段D: Phase收尾 ===
Step 11: 全部Agent完成 → 对Phase主文件汇总检查 (总字数/CQ覆盖/Fast Gate)
Step 12: 运行 `bash scripts/phase_complete.sh` (自动: Fast Gate → checkpoint v2.0 → git commit)
Step 13: 提醒用户是否push
```

---

## 快速参考

| 机制 | 文件 | 创建时机 | 删除时机 |
|------|------|---------|---------|
| 共享上下文 | `shared_context.md` | Phase开始前 | 下个Phase覆盖 |
| 任务锁 | `current_tasks/Agent{X}.lock.md` | dispatch前 | Agent完成+QG通过 |
| Agent暂存 | `reports/{TICKER}/staging/Phase{N}_Agent{X}_raw.md` | Agent写入时 | 归档到Phase主文件后删除 |
| Phase主文件 | `reports/{TICKER}/{TICKER}_Phase{N}.md` | Phase开始时 | 永久保留 |
| 完整报告 | `reports/{TICKER}/{TICKER}_Complete.md` | 项目结束时 | 永久保留 |
| 执行日志 | `agent_logs/{TICKER}_Phase{N}_Agent{X}.log.md` | Agent完成时 | 永久保留 |
| 质量门控 | `tests/research_fast.sh` | 永久 | 永久 |
