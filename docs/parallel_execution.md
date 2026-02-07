# 并行Agent协作系统 v2.0

> **v1.0**: 基础分派-收集模式（Task agent并行写文件→主Agent汇总）
> **v2.0升级**: 引入任务锁+共享状态+增量提交+质量门控+结构化日志
> **适配说明**: 基于多智能体工程协作协议改造，适配Claude Code子Agent约束

---

## 架构约束

| 约束 | 说明 | 应对方案 |
|------|------|---------|
| 子Agent不能git push | 只有主Agent有git权限 | 子Agent写文件→主Agent批量commit |
| 子Agent之间不能直接通信 | 独立进程，无消息通道 | 通过文件系统间接协调（共享目录） |
| 子Agent生命周期有限 | 完成后返回结果 | 任务粒度必须小于单Agent容量 |
| 子Agent无法读取彼此实时输出 | 并行执行时互盲 | 预定义接口+共享上下文文件 |

---

## 核心协议（6条硬约束）

### HC-1: 任务锁机制

每个Agent启动前，主Agent在共享目录创建锁文件:

```
data/research/{TICKER}/agent_tasks/
├── ch19_ch23.lock.json    ← Agent 1的任务锁
├── ch20_ch21.lock.json    ← Agent 2的任务锁
├── ch22.lock.json         ← Agent 3的任务锁
└── ...
```

锁文件内容:
```json
{
  "agent_id": "agent_1",
  "chapters": ["Ch19", "Ch23"],
  "output_file": "reports/GOOGL_P3_ch19_ch23.md",
  "char_target": 8000,
  "success_criteria": "护城河5维评分+开发者生态评分+≥15标注/万字",
  "status": "in_progress",
  "started_at": "2026-02-06T15:30:00Z"
}
```

**规则**: 主Agent在启动子Agent前创建锁文件；子Agent完成后，主Agent更新status为completed并记录实际字符数。

### HC-2: 共享上下文文件

所有Agent共享一个只读上下文文件，避免重复劳动:

```
data/research/{TICKER}/agent_shared_context.md
```

内容包含:
- 前序Phase关键发现摘要（≤500字）
- 公司核心数据快照（股价/财务/关键指标）
- CQ(核心问题)清单+当前回答进度
- 已确定的估值锚点（SOTP/DCF结论）
- **禁区清单**: 其他Agent负责的内容，本Agent不要重复写

**规则**: 主Agent在启动前生成此文件；所有子Agent在prompt中收到指令读取此文件。

### HC-3: 增量提交（小步提交适配版）

由于子Agent不能直接commit，改为:

1. **子Agent**: 每完成一个章节，写入独立文件（不追加到大文件）
2. **主Agent**: 收集后逐章节commit
   ```
   git add reports/GOOGL_P3_ch19.md && git commit -m "feat: Ch19 护城河量化"
   git add reports/GOOGL_P3_ch23.md && git commit -m "feat: Ch23 开发者生态"
   ```
3. **最后**: 合并为Phase完整文件并做最终commit

**vs v1.0改进**: v1.0是全部写完一次性commit 6个文件。v2.0分步commit，每个章节独立可追溯。

### HC-4: Agent内质量门控

每个子Agent在写完后必须自检:

```yaml
self_check:
  - char_count: "wc -m [output_file] ≥ target"
  - annotation_density: "grep -c '硬数据\\|合理推断\\|主观判断' / char_count × 10000 ≥ 15"
  - hard_data_ratio: "硬数据标注 / 总标注 ≥ 40%"
  - tables_exist: "grep -c '|.*|.*|' ≥ 3"
  - no_fabrication: "所有财务数字有[硬数据:]标注"
```

**规则**: 子Agent在prompt中被要求运行自检并在文件末尾附上检查结果。主Agent验证后才接受。

### HC-5: STATUS.md 进度协调

主Agent维护一个实时进度文件:

```
data/research/{TICKER}/STATUS.md
```

内容模板:
```markdown
# GOOGL Phase 3+3.5 执行状态

## 当前进展
- [x] Ch19 护城河 (14,546字符) ✅ Agent 1
- [x] Ch20 云竞争 (7,560字符) ✅ Agent 2
- [ ] Ch22 监管 — Agent 3 运行中...
- [ ] Ch27-29 AI评估 — Agent 4 运行中...

## 质量门控状态
- QG-07 护城河: ✅ 通过
- QG-08 竞争分析: ⏳ 等待Agent 2+3
- QG-09 五引擎: ⏳ 等待Agent 5

## 已知问题
- Agent 2 backlog数据不一致($155B vs $240B) → 需在汇总时统一

## 下一步
1. 等待Agent 3-5完成
2. 交叉验证数据一致性
3. 写P3-INT整合章节
```

**规则**: 主Agent在每个Agent完成时更新STATUS.md。如果会话中断恢复，先读STATUS.md定位进度。

### HC-6: 结构化错误日志

```
data/research/{TICKER}/agent_logs/
├── agent_1_ch19_ch23.log    ← Agent执行日志
├── agent_2_ch20_ch21.log
├── quality_check.log         ← 质量门控日志
└── assembly.log              ← 合并过程日志
```

**规则**: 如果Agent返回的输出不达标，主Agent将错误信息写入日志并决定是重试(resume agent)还是手动补充。

---

## 标准工作循环 v2.0

### 主Agent（编排者）循环

```
Step 0: 范围评估
  - 读取Phase规格 + 章节清单 + 字符目标
  - 识别可并行章节 vs 有依赖的章节
  - 设计Agent分组（3-5个Agent）

Step 1: 准备共享资源
  - 创建 agent_shared_context.md
  - 创建各Agent的锁文件（.lock.json）
  - git commit 锁文件（标记任务已分配）

Step 2: 启动并行Agent
  - 每个Agent的prompt中包含:
    a) 章节规格
    b) 数据文件路径
    c) agent_shared_context.md路径
    d) 自检要求
    e) 禁区清单（避免与其他Agent重复）
  - 全部run_in_background=true

Step 3: 等待+增量收集
  - Agent完成 → 验证字符数+标注密度
  - 通过 → 更新锁文件status=completed
  - 不通过 → 记录日志 + 决定重试/手动补充
  - 更新STATUS.md

Step 4: 交叉验证
  - 检查数据一致性（多个Agent引用同一数据是否一致）
  - 检查内容重叠（是否有冗余段落）
  - 检查CQ覆盖度（所有核心问题是否有章节回答）

Step 5: 合并+整合
  - 按章节顺序合并为Phase完整文件
  - 写P-INT整合章节
  - 逐章节git commit
  - 最终commit合并文件

Step 6: 清理+报告
  - 删除锁文件
  - 更新STATUS.md为"Phase完成"
  - 输出完成度报告
  - 提醒是否push
```

### 子Agent循环

```
Step 0: 读取上下文
  - 读 agent_shared_context.md
  - 读 分配的数据文件

Step 1: 写章节
  - 按规格写每个分配的章节
  - 保存到指定output_file

Step 2: 自检
  - 运行 wc -m 检查字符数
  - 检查标注密度
  - 检查硬数据占比
  - 将自检结果附在文件末尾或返回给主Agent

Step 3: 返回结果
  - 报告完成状态+质量指标
```

---

## 卡住处理协议

| 情况 | 处理 |
|------|------|
| Agent超时(>10min无输出) | 检查output_file大小；如有内容→接受部分输出+主Agent补完 |
| Agent输出不达标 | resume Agent补充 或 主Agent手动扩展 |
| 数据不一致 | 以硬数据源(JSON)为准，在P-INT中标注差异 |
| 内容重叠 | 合并时去重，保留更详细的版本 |
| Agent失败/崩溃 | 记录日志→主Agent接管该章节 |

---

## vs v1.0 改进对比

| 维度 | v1.0 | v2.0 | 改进 |
|------|------|------|------|
| 任务分配 | 口头(prompt内) | 锁文件+共享上下文 | 可追溯+可恢复 |
| Agent协调 | 互盲 | 共享上下文+禁区清单 | 减少重复 |
| 提交方式 | 全部完成→一次性commit | 逐章节commit | 小步可追溯 |
| 质量检查 | 事后检查 | Agent自检+主Agent验证 | 早发现早修复 |
| 进度跟踪 | 手动轮询 | STATUS.md | 结构化可恢复 |
| 错误处理 | 无 | agent_logs/ | 可debug |
| 会话恢复 | 靠context summary | STATUS.md+锁文件 | 精确恢复 |

---

## 并行数量限制

```yaml
推荐配置:
  最佳并行数: 3-5个agent
  最大并行数: 5个agent
  原因: 过多并行增加协调复杂度，收益递减

资源考虑:
  - 每个agent消耗独立context
  - 需要足够带宽支持并行请求
  - 汇总阶段需要额外处理时间
```

---

## 可并行任务识别

| 任务类型 | 并行方式 | 预计节省 | 示例 |
|---------|---------|---------|------|
| **多章节写作** | 每组章节一个agent | ~70% | Phase 3: 5组章节并行 |
| **多引擎分析** | 每引擎一个agent | ~70% | 周期+股权+聪明钱+信号+预测市场 |
| **多公司对比** | 每公司一个agent | ~60% | 同行业3-5家公司基础数据收集 |
| **数据预取** | 每数据源一个agent | ~80% | Phase 0: 7-9个数据源并行 |
| **多维度验证** | 每维度一个agent | ~65% | 技术+周期+AI+地缘四维交叉验证 |

**不适合并行的任务**：
- 有依赖关系的分析步骤（如周期定位→估值计算）
- 需要前序结论的判断（如风险评估→Kill Switch设置）
- P-INT整合章节（必须等所有Agent完成）
- 单一简单任务
