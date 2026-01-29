# 投资分析Hook设计 v1.0

> 基于Clawdbot生命周期钩子的扩展点设计

---

## 概述

Hook是分析流程中的扩展点，允许在特定时机触发自定义行为，而不修改核心分析逻辑。

**设计原则**：
- 非侵入式：Hook不影响主流程
- 可选性：所有Hook都是可选的
- 异步：Hook执行不阻塞主流程（除非明确指定）
- 可组合：多个Hook可注册到同一事件

---

## Hook类型总览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Hook架构                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    1. 分析生命周期 Hook                          │       │
│  │  analysis:start → phase:complete → report:generated → end       │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    2. 数据 Hook                                  │       │
│  │  data:api_call → data:validation → data:cache_hit/miss          │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    3. 质量 Hook                                  │       │
│  │  quality:score_below → quality:data_issue → quality:retry       │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐       │
│  │                    4. 知识库 Hook                                │       │
│  │  knowledge:lesson_added → knowledge:prediction_created          │       │
│  └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. 分析生命周期Hook

### analysis:start

**触发时机**：分析开始时

**Payload**：
```yaml
event: analysis:start
payload:
  ticker: "LRCX"
  analysis_type: "deep"  # deep | quick | track
  requested_by: "user"
  timestamp: "2026-01-30T10:00:00Z"
  session_id: "sess_abc123"
```

**应用场景**：
- 记录分析开始日志
- 发送"分析开始"通知
- 初始化性能监控

**示例Handler**：
```yaml
handler:
  name: notify_analysis_start
  action: telegram_notify
  message: "开始分析 {ticker}，预计耗时 {estimated_time}"
```

---

### analysis:phase_complete

**触发时机**：每个Phase完成时

**Payload**：
```yaml
event: analysis:phase_complete
payload:
  ticker: "LRCX"
  phase: 2  # 1-6
  phase_name: "context_assembly"
  status: "success"  # success | partial | failed
  duration_seconds: 45
  checkpoint_passed: true
  details:
    frameworks_loaded: 3
    context_tokens: 35000
```

**应用场景**：
- 进度追踪和展示
- 阶段耗时统计
- 失败阶段告警

---

### analysis:data_collected

**触发时机**：Phase 4数据收集完成

**Payload**：
```yaml
event: analysis:data_collected
payload:
  ticker: "LRCX"
  data_sources:
    fmp_api: { status: "success", endpoints: 6 }
    100baggers_api: { status: "success", endpoints: 3 }
    sec_filings: { status: "success", filings: 5 }
    web_search: { status: "partial", results: 8 }
  data_completeness: 0.92
  missing_data:
    - "13F latest quarter"
```

**应用场景**：
- 数据质量监控
- 缺失数据告警
- API使用统计

---

### analysis:report_generated

**触发时机**：Phase 5报告生成完成

**Payload**：
```yaml
event: analysis:report_generated
payload:
  ticker: "LRCX"
  versions:
    local: "LRCX_Complete_Analysis_v2.0.md"
    share: "LRCX_转发版_v2.0.md"
  quality_score: 92
  word_count: 28500
  key_findings:
    - "AI产业链核心受益者"
    - "HBM驱动中期增长"
  target_price: "$265"
  rating: 4
```

**应用场景**：
- 自动发送报告摘要
- Git自动commit
- 报告归档

**示例Handler**：
```yaml
handler:
  name: auto_git_commit
  action: shell_exec
  command: |
    cd /Users/milton/投资大师
    git add reports/{ticker}*.md
    git commit -m "feat: {ticker}分析报告v{version}"
    git push
```

---

### analysis:quality_checked

**触发时机**：质量门控执行完成

**Payload**：
```yaml
event: analysis:quality_checked
payload:
  ticker: "LRCX"
  passed: true
  score: 15  # out of 16
  failed_items:
    - "可验证预测数量"
  details:
    data_integrity: true
    depth_level: 3.2
    analyst_coverage: 8
```

**应用场景**：
- 质量统计
- 未通过时触发改进建议
- 质量趋势分析

---

### analysis:end

**触发时机**：分析完全结束（包括归档）

**Payload**：
```yaml
event: analysis:end
payload:
  ticker: "LRCX"
  status: "success"  # success | partial | failed
  total_duration_seconds: 4200  # 70分钟
  quality_score: 92
  files_created:
    - "reports/LRCX_Complete_Analysis_v2.0.md"
    - "reports/LRCX_转发版_v2.0.md"
  lessons_extracted: 2
  predictions_created: 5
```

**应用场景**：
- 发送"分析完成"通知
- 性能统计
- 触发后续流程（如比较分析）

**示例Handler**：
```yaml
handler:
  name: notify_analysis_complete
  action: telegram_notify
  message: |
    ✅ {ticker}分析完成
    
    📊 质量评分: {quality_score}/100
    ⭐ 推荐等级: {rating}/5
    🎯 目标价: {target_price}
    ⏱️ 耗时: {duration}分钟
    
    报告已保存到 reports/
```

---

## 2. 数据Hook

### data:api_call

**触发时机**：每次API调用前后

**Payload（调用前）**：
```yaml
event: data:api_call:before
payload:
  api: "fmp"
  endpoint: "/key-metrics-ttm/LRCX"
  ticker: "LRCX"
```

**Payload（调用后）**：
```yaml
event: data:api_call:after
payload:
  api: "fmp"
  endpoint: "/key-metrics-ttm/LRCX"
  status: "success"  # success | failed | timeout
  latency_ms: 245
  data_size_bytes: 2048
```

**应用场景**：
- API调用统计
- 延迟监控
- 失败告警

---

### data:validation

**触发时机**：数据验证时

**Payload**：
```yaml
event: data:validation
payload:
  ticker: "LRCX"
  validation_type: "consistency"  # completeness | consistency | credibility
  passed: true
  issues:
    - field: "revenue_growth"
      issue: "与分析师预期差异>20%"
      severity: "warning"
```

**应用场景**：
- 数据质量监控
- 异常数据告警
- 数据问题追踪

---

### data:cache_hit / data:cache_miss

**触发时机**：数据缓存查询时

**Payload**：
```yaml
event: data:cache_hit
payload:
  cache_key: "fmp:LRCX:key-metrics-ttm"
  age_seconds: 3600
  expired: false
```

**应用场景**：
- 缓存效率监控
- 缓存策略优化

---

## 3. 质量Hook

### quality:score_below_threshold

**触发时机**：质量评分低于阈值时

**Payload**：
```yaml
event: quality:score_below_threshold
payload:
  ticker: "LRCX"
  threshold: 14
  actual_score: 12
  failed_items:
    - "数据Level标注"
    - "可验证预测数量"
    - "分析深度"
  recommendation: "建议补充数据标注和增加预测"
```

**应用场景**：
- 触发自动改进
- 发送改进建议
- 记录质量问题

**示例Handler**：
```yaml
handler:
  name: quality_improvement_suggestion
  action: generate_improvement_plan
  auto_retry: true
  max_retries: 2
```

---

### quality:data_integrity_issue

**触发时机**：发现数据完整性问题时

**Payload**：
```yaml
event: quality:data_integrity_issue
payload:
  ticker: "LRCX"
  issue_type: "missing_source"  # missing_source | inconsistent | stale
  affected_fields:
    - field: "HBM_revenue"
      issue: "无数据来源标注"
  severity: "high"
```

**应用场景**：
- 数据完整性告警
- 触发数据修复
- 质量审计

---

### quality:retry

**触发时机**：因质量问题触发重试时

**Payload**：
```yaml
event: quality:retry
payload:
  ticker: "LRCX"
  retry_count: 1
  reason: "质量评分低于阈值"
  focus_areas:
    - "数据标注"
    - "深度分析"
```

---

## 4. 知识库Hook

### knowledge:lesson_added

**触发时机**：新lesson添加到知识库时

**Payload**：
```yaml
event: knowledge:lesson_added
payload:
  lesson_id: "LL_156"
  category: "数据"
  company: "LRCX"
  lesson: "HBM市场数据需要交叉验证多个来源"
  severity: "medium"
```

**应用场景**：
- 知识库更新通知
- 学习统计
- 框架改进触发

---

### knowledge:prediction_created

**触发时机**：新预测添加到追踪器时

**Payload**：
```yaml
event: knowledge:prediction_created
payload:
  prediction_id: "PRED_LRCX_001"
  ticker: "LRCX"
  prediction: "2026 Q2 HBM相关收入同比增长50%+"
  verification_date: "2026-04-15"
  confidence: 75
```

**应用场景**：
- 设置验证提醒
- 预测统计
- 准确率追踪

**示例Handler**：
```yaml
handler:
  name: set_prediction_reminder
  action: create_reminder
  reminder_date: "{verification_date - 7days}"
  message: "预测 {prediction_id} 即将到验证日期，请准备验证"
```

---

## Hook配置

### 配置文件位置

```
投资大师/
└── config/
    └── hooks.yaml
```

### 配置示例

```yaml
# hooks.yaml

hooks:
  analysis:start:
    - handler: log_start
      enabled: true
    - handler: telegram_notify
      enabled: true
      config:
        template: "开始分析 {ticker}"
  
  analysis:end:
    - handler: telegram_notify
      enabled: true
      config:
        template: |
          ✅ {ticker}分析完成
          质量: {quality_score}
          评级: {rating}
    - handler: git_commit
      enabled: true
      config:
        auto_push: true
  
  quality:score_below_threshold:
    - handler: improvement_suggestion
      enabled: true
    - handler: auto_retry
      enabled: false  # 暂不启用自动重试
      config:
        max_retries: 2

  knowledge:prediction_created:
    - handler: set_reminder
      enabled: true
      config:
        reminder_days_before: 7
```

---

## Hook实现指南

### Handler接口

```yaml
handler_interface:
  name: string           # Handler名称
  action: string         # 动作类型
  enabled: boolean       # 是否启用
  async: boolean         # 是否异步执行
  timeout_ms: number     # 超时时间
  config: object         # Handler配置
```

### 内置动作类型

| 动作类型 | 说明 | 参数 |
|---------|------|------|
| `log` | 写入日志 | level, message |
| `telegram_notify` | Telegram通知 | template, chat_id |
| `shell_exec` | 执行Shell命令 | command |
| `file_write` | 写入文件 | path, content |
| `create_reminder` | 创建提醒 | date, message |
| `http_post` | HTTP POST | url, body |

### 自定义Handler

```yaml
custom_handler:
  name: my_custom_handler
  type: script
  script: /path/to/handler.sh
  args:
    - "{ticker}"
    - "{quality_score}"
```

---

## 最佳实践

### 1. Hook应该是轻量的
- Hook执行时间应 < 5秒
- 重任务使用异步执行

### 2. Hook不应阻塞主流程
- 除非明确需要（如质量门控）
- 默认使用async: true

### 3. Hook失败不应影响主流程
- 捕获异常
- 记录错误但继续

### 4. 合理使用Hook
- 不是所有事件都需要Hook
- 避免过度使用导致复杂性

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-30 | 初始版本 |

---

*设计来源：Clawdbot生命周期Hook架构*
