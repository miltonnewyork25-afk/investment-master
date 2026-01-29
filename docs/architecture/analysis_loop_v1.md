# 投资分析Loop设计 v1.0

> 类比Clawdbot Agent Loop的6阶段分析流程

---

## 类比Clawdbot Agent Loop

**Clawdbot**：
```
intake → context → inference → tool → reply → persist
```

**投资分析**：
```
需求接收 → 上下文组装 → 推理 → 数据获取 → 报告生成 → 归档
```

---

## 完整Loop流程图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        投资分析 Loop v1.0                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═══════════╗    ╔═══════════╗    ╔═══════════╗                          │
│  ║  Phase 1  ║    ║  Phase 2  ║    ║  Phase 3  ║                          │
│  ║  需求接收  ║ → ║ 上下文组装 ║ → ║    推理   ║                          │
│  ║  (Intake) ║    ║ (Context) ║    ║  (Infer)  ║                          │
│  ╚═════╤═════╝    ╚═════╤═════╝    ╚═════╤═════╝                          │
│        │                │                │                                 │
│        ▼                ▼                ▼                                 │
│  • 解析分析请求     • 加载Master      • 确定分析路径                      │
│  • 验证参数         Framework       • 识别数据需求                       │
│  • 识别公司/类型    • 加载公司历史    • 规划工具调用                       │
│  • 选择分析深度     • 加载相关skill   • 优化执行顺序                       │
│  • 路由到session    • 检查context预算                                     │
│                     • 摘要历史(如需)                                       │
│                                                                             │
│  ╔═══════════╗    ╔═══════════╗    ╔═══════════╗                          │
│  ║  Phase 4  ║    ║  Phase 5  ║    ║  Phase 6  ║                          │
│  ║  数据获取  ║ → ║  报告生成  ║ → ║    归档   ║                          │
│  ║  (Tool)   ║    ║  (Reply)  ║    ║ (Persist) ║                          │
│  ╚═════╤═════╝    ╚═════╤═════╝    ╚═════╤═════╝                          │
│        │                │                │                                 │
│        ▼                ▼                ▼                                 │
│  • 调用FMP API      • 按质量标准生成   • 保存报告到reports/               │
│  • 调用100baggers   • 应用可视化模板   • 更新分析历史(JSONL)              │
│  • 获取SEC文件      • 执行质量门控     • 提取lessons                       │
│  • 搜索分析师观点   • 生成双版本输出   • 创建预测追踪                      │
│  • 验证数据完整性   • 免责声明         • 触发完成Hook                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 详细阶段说明

### Phase 1: 需求接收 (Intake)

**目的**：解析用户请求，确定分析范围

**输入**：
- 用户请求（如"分析LRCX"）
- 分析类型（深度/快速/追踪）
- 特殊要求（聚焦护城河/估值等）

**处理**：
```yaml
intake_process:
  parse_request:
    - 提取公司标识 (ticker/name)
    - 识别分析类型
    - 提取特殊要求
  
  validate_params:
    - 验证ticker有效性
    - 检查API可用性
    - 确认数据时效性
  
  route_session:
    - 深度分析 → 独立session
    - 快速查询 → 共享session
    - 追踪分析 → 历史session
```

**输出**：
- 标准化的分析请求对象
- Session路由决策
- 分析参数配置

**Checkpoint**：
- [ ] 公司识别成功
- [ ] 参数验证通过
- [ ] Session已分配

---

### Phase 2: 上下文组装 (Context Assembly)

**目的**：为推理阶段准备完整上下文

**加载顺序**（按优先级）：

```
1. [必须] Master Framework
   └─ skills/_common/master_investment_framework_v1.yaml

2. [必须] 分析模块库
   └─ skills/_common/analysis_modules_library_v1.yaml

3. [如有] 公司已有数据
   └─ history/{ticker}_profile.yaml
   └─ reports/{ticker}_*.md (摘要版)

4. [按需] 相关skill
   └─ 行业框架 (如 semiconductor_framework.yaml)
   └─ 专项分析 (如 reverse_dcf_v1.yaml)

5. [推荐] 历史lessons
   └─ skills/knowledge_base/lessons_learned.yaml
   └─ 筛选与当前公司/行业相关的lessons
```

**Context预算检查**：

```python
def check_context_budget(current_tokens, budget=200000):
    """Context预算检查"""
    allocation = {
        "system_framework": 15000,   # 7.5%
        "current_company": 50000,    # 25%
        "history_summary": 20000,    # 10%
        "industry_context": 15000,   # 7.5%
        "inference_reserve": 100000  # 50%
    }
    
    if current_tokens > budget - allocation["inference_reserve"]:
        trigger_compaction()
```

**历史摘要策略**：
- 如果历史分析超过20K token，触发compaction
- 生成摘要：核心结论 + 关键指标 + 重要风险
- 保留原始文件，加载摘要版本

**输出**：
- 完整的分析上下文
- Context使用报告

**Checkpoint**：
- [ ] Framework加载成功
- [ ] 公司历史已检索
- [ ] Context预算在范围内

---

### Phase 3: 推理 (Inference)

**目的**：规划分析路径和工具调用

**确定分析路径**：

```yaml
analysis_path_decision:
  company_type:
    - 识别行业 (半导体/软件/消费等)
    - 识别商业模式 (平台/产品/服务)
    - 识别生命周期 (成长/成熟/转型)
  
  select_frameworks:
    - 必选：护城河分析、估值分析
    - 行业：AI产业链(如适用)、周期分析
    - 情况：投资者视角(如有13F)
  
  determine_depth:
    - 深度报告：6大模块全部执行
    - 快速分析：核心3模块
    - 追踪更新：变化部分
```

**数据需求识别**：

```yaml
data_requirements:
  必须获取:
    - FMP: profile, key-metrics-ttm, ratios, income-statement
    - 100baggers: leading-indicators, roic-analysis
  
  推荐获取:
    - SEC: 10-K, 10-Q最新
    - Search: 顶级分析师观点 (5-10位)
  
  条件获取:
    - 13F: 如分析投资者视角
    - 竞争对手: 如分析护城河
```

**工具调用规划**：

```yaml
tool_execution_plan:
  parallel_batch_1:  # 可并行
    - FMP API calls
    - 100baggers API calls
  
  sequential_after_1:  # 需要前置数据
    - SEC filings (基于财报日期)
  
  parallel_batch_2:  # 可并行
    - Web search: 分析师观点
    - Web search: 竞争格局
```

**输出**：
- 分析路径决策
- 工具调用计划
- 预估执行时间

**Checkpoint**：
- [ ] 分析路径已确定
- [ ] 数据需求已识别
- [ ] 工具调用已规划

---

### Phase 4: 数据获取 (Tool Execution)

**目的**：执行工具调用，收集分析数据

**API调用**：

```yaml
api_calls:
  fmp_api:
    endpoints:
      - /profile/{ticker}
      - /key-metrics-ttm/{ticker}
      - /ratios/{ticker}
      - /income-statement/{ticker}
      - /balance-sheet/{ticker}
      - /cash-flow-statement/{ticker}
    error_handling:
      - 重试3次
      - 失败标记为数据缺失
  
  100baggers_api:
    endpoints:
      - /leading-indicators/{ticker}
      - /dupont-analysis/{ticker}
      - /roic-analysis/{ticker}
    note: "禁用7维度评分"
  
  sec_api:
    types: [10-K, 10-Q, 8-K]
    limit: 5
```

**搜索获取**：

```yaml
web_search:
  分析师观点:
    query: "{company} {ticker} analyst rating 2025 2026"
    target: 5-10位顶级分析师
    sources: JPM, GS, MS, UBS, Citi, BofA
  
  行业动态:
    query: "{industry} market trends outlook"
    
  竞争格局:
    query: "{company} vs {competitors} comparison"
```

**数据验证**：

```yaml
data_validation:
  completeness_check:
    - 核心财务数据完整
    - 估值指标可计算
    - 历史数据足够（≥3年）
  
  consistency_check:
    - 收入增长率与分析师预期对比
    - 利润率与行业水平对比
    - 估值与历史区间对比
  
  credibility_tagging:
    - Level A: API直接返回
    - Level B: 公开财报
    - Level C: 第三方数据库
    - Level D: 分析师引用
    - Level E: 本报告估算
```

**输出**：
- 结构化数据集
- 数据可信度标注
- 数据缺失报告

**Checkpoint**：
- [ ] API调用成功率 > 90%
- [ ] 核心数据完整
- [ ] 数据已验证并标注

---

### Phase 5: 报告生成 (Reply)

**目的**：生成高质量分析报告

**执行步骤**：

```yaml
report_generation:
  step_1_structure:
    - 30秒速览仪表盘
    - 投资论点摘要
    - 详细分析（按模块）
    - 估值与目标价
    - 风险与Kill Switches
    - 质量门控结果
  
  step_2_quality_gate:
    checklist:
      - 数据Level标注完整
      - 分析师全景表（5-10位）
      - 市场分歧表（3-5个）
      - 每个核心命题有证据链
      - Kill Switches ≥ 3个
      - SOTP估值已计算
      - 可验证预测 ≥ 5个
      - 总字符数 ≥ 25,000
    threshold: 14/16通过
  
  step_3_dual_output:
    local_version:
      - 精美ASCII可视化
      - 复杂仪表盘
      - 文件名: {TICKER}_Complete_Analysis_v{version}.md
    
    share_version:
      - 简洁markdown表格
      - 移除ASCII艺术
      - 文件名: {TICKER}_转发版_v{version}.md
```

**质量标准应用**：

参考 `skills/core/report_quality_standard_v1.yaml`：
- 可视化风格 (25%)
- 信息传递 (25%)
- 低认知成本 (25%)
- 深度保持 (25%)

**目标分数**：≥ 90分（优秀级）

**输出**：
- 本地深度版报告
- 转发友好版报告
- 质量评分

**Checkpoint**：
- [ ] 质量门控通过（≥14/16）
- [ ] 双版本生成
- [ ] 免责声明已添加

---

### Phase 6: 归档 (Persistence)

**目的**：保存结果，更新知识库，触发后续动作

**保存报告**：

```yaml
save_reports:
  location: reports/
  naming:
    - {TICKER}_Complete_Analysis_v{version}.md
    - {TICKER}_转发版_v{version}.md
  
  versioning:
    - 同一公司分析自动递增版本
    - 保留历史版本
```

**更新分析历史**：

```yaml
update_history:
  file: history/analysis_log.jsonl
  entry:
    timestamp: "2026-01-30T10:30:00Z"
    ticker: "LRCX"
    analysis_type: "deep"
    quality_score: 92
    key_conclusions:
      - "AI产业链核心受益者"
      - "HBM驱动增长"
    target_price: "$265"
    rating: 4
```

**提取Lessons**：

```yaml
extract_lessons:
  file: skills/knowledge_base/lessons_learned.yaml
  auto_extract:
    - 分析中发现的数据问题
    - 框架执行中的改进点
    - 预测偏差的原因
```

**创建预测追踪**：

```yaml
create_predictions:
  file: skills/knowledge_base/predictions_tracker.yaml
  entries:
    - id: PRED_LRCX_001
      prediction: "2026 Q2 HBM相关收入同比增长50%+"
      verification_date: "2026-04-XX"
      confidence: 75%
```

**触发Hook**：

```yaml
trigger_hooks:
  analysis:end:
    - 通知用户（Telegram）
    - Git commit报告
    - 更新公司profile
```

**输出**：
- 报告已保存
- 历史已更新
- Lessons已提取
- 预测已记录
- Hook已触发

**Checkpoint**：
- [ ] 报告已保存到正确位置
- [ ] JSONL历史已更新
- [ ] 预测追踪已创建
- [ ] 用户已通知

---

## 并发控制

### 串行执行场景
- 同一公司的分析必须串行
- 防止数据竞争和状态冲突

### 并行执行场景
- 不同公司的分析可并行
- 同一分析内的API调用可并行（无依赖时）

### 实现机制
```yaml
concurrency_control:
  lock_key: "analysis:{ticker}"
  strategy: "mutex"
  timeout: 3600  # 1小时超时
```

---

## 错误处理

### 阶段失败处理

| 阶段 | 失败处理 |
|------|---------|
| Intake | 返回错误，提示修正请求 |
| Context | 降级加载，记录缺失 |
| Inference | 使用默认分析路径 |
| Tool | 标记数据缺失，继续分析 |
| Reply | 降低质量要求，标记不完整 |
| Persist | 重试3次，失败后告警 |

### 重试策略
```yaml
retry_policy:
  max_retries: 3
  backoff: exponential
  initial_delay: 1s
```

---

## 性能指标

| 指标 | 目标 | 说明 |
|------|------|------|
| 深度分析耗时 | < 90分钟 | 完整6阶段 |
| 快速分析耗时 | < 30分钟 | 简化流程 |
| API调用成功率 | > 95% | 含重试 |
| 质量门控通过率 | > 80% | 首次通过 |

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-30 | 初始版本，基于Clawdbot Loop设计 |

---

*设计来源：Clawdbot Agent Loop架构*
