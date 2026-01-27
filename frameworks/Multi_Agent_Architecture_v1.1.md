# 投研多Agent系统架构 v1.1

> 设计原则：**最小必要Agent + 硬门禁(PASS/DEGRADE/FAIL) + 共享黑板 + 双闸安全 + 可回归**

---

## 变更日志 (v1.0 → v1.1)

| 变更项 | 描述 | 优先级 |
|--------|------|--------|
| Quality Gate 三态 | PASS/FAIL → PASS/DEGRADE/FAIL | P0 |
| Output Safety 双闸 | 入口消毒(Ingest) + 出口清洗(Egress) | P0 |
| 共享黑板状态 | Supervisor维护 Shared Run State | P0 |
| Data Integrity +3字段 | normalization_notes, freshness, lineage | P1 |
| Ecosystem 更新策略 | update_policy 字段 | P2 |
| Kill Switch 规则化 | 明确触发条件而非自由判断 | P1 |
| Eval 日志沉淀 | 线上FAIL/DEGRADE案例自动变测试用例 | P2 |

---

## 一、系统总览 (v1.1)

```
┌────────────────────────────────────────────────────────────────────┐
│                       0. SUPERVISOR                                │
│          (任务拆解 / 管道调度 / 共享黑板管理 / 失败回退)              │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  SHARED RUN STATE (黑板)                                  │     │
│  │  - run_id, artifact_versions, claim_ids, timestamps      │     │
│  └──────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  7a. OUTPUT SAFETY (入口消毒 - Ingest Gate)                        │
│      - 外部数据净化 / Prompt Injection检测 / 指令数据分离            │
└────────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  1. DATA         │ │  3. RESEARCH     │ │  4. ECOSYSTEM    │
│     INTEGRITY    │ │     MECHANISM    │ │     GRAPH        │
│  (+normalization │ │                  │ │  (+update_policy)│
│   +freshness     │ │                  │ │                  │
│   +lineage)      │ │                  │ │                  │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │ (所有产出写入黑板，带版本号+claim_id)
                              ▼
                    ┌──────────────────┐
                    │  2. QUALITY GATE │  ← 硬门禁
                    │                  │
                    │  PASS: 继续估值   │
                    │  DEGRADE: 仅输出  │
                    │    假设清单/监控   │
                    │  FAIL: 回退补数据 │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │ PASS           │ DEGRADE        │ FAIL
            ▼                ▼                ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  5. VALUATION    │ │  6. REPORT       │ │  回退到上游      │
│     ENGINE       │ │     COMPOSER     │ │  (Data/Research) │
│                  │ │  (降级模式:      │ │                  │
│                  │ │   仅输出假设清单) │ │                  │
└────────┬─────────┘ └────────┬─────────┘ └──────────────────┘
         │                    │
         └────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────────────────┐
│  7b. OUTPUT SAFETY (出口清洗 - Egress Gate)                        │
│      - 结构校验 / PII检测 / 可执行内容阻断 / Kill Switch检查         │
└────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  8. EVAL /       │  ← 异步/后台
                    │     REGRESSION   │
                    │  (+日志沉淀为    │
                    │    新测试用例)   │
                    └──────────────────┘
```

---

## 二、核心机制详解

### 2.1 共享黑板状态 (Shared Run State)

**目的**：确保并行Agent（1/3/4）输出可关联、可审计

```json
{
  "run_id": "uuid-20260127-tsla-001",
  "created_at": "2026-01-27T10:00:00Z",
  "target": {"ticker": "TSLA"},

  "artifacts": {
    "data_integrity": {
      "artifact_id": "di_001",
      "version": 1,
      "timestamp": "2026-01-27T10:15:00Z",
      "status": "completed"
    },
    "research_mechanism": {
      "artifact_id": "rm_001",
      "version": 1,
      "timestamp": "2026-01-27T10:20:00Z",
      "status": "completed"
    }
  },

  "claim_registry": {
    "claim_001": {
      "text": "FSD将在2026年实现L4商业化",
      "source_agent": "research_mechanism",
      "evidence_ids": ["ev_001", "ev_002"],
      "confidence": "WEAK",
      "last_updated": "2026-01-27T10:20:00Z"
    }
  },

  "evidence_registry": {
    "ev_001": {
      "source": "sec_10k_2025",
      "tier": "A",
      "as_of": "2025-12-31",
      "linked_claims": ["claim_001"]
    }
  },

  "gate_history": [
    {
      "gate": "quality_gate",
      "verdict": "DEGRADE",
      "timestamp": "2026-01-27T10:30:00Z",
      "reason": "3项关键假设缺乏A级证据"
    }
  ]
}
```

**规则**：
- 每个Agent输出必须带 `run_id`, `artifact_version`, `claim_ids`
- Data Integrity 负责为 `claim_ids` 挂载证据
- Quality Gate 只审黑板中最新版本的artifacts
- Supervisor 在管道完成后归档整个黑板状态

---

### 2.2 Quality Gate 三态裁决

| 裁决 | 条件 | 允许的下游动作 | 输出类型 |
|------|------|---------------|---------|
| **PASS** | 所有关键claim有A/B级证据，无未解决冲突 | 估值 + 完整报告 | Investment Memo |
| **DEGRADE** | 关键claim证据不足但无直接冲突 | 仅假设清单 + 监控触发器 | Watchlist Card / Hypothesis List |
| **FAIL** | 存在未解决冲突 或 核心数据缺失 | 回退补数据/重新分析 | Error Report |

**DEGRADE 模式输出示例**：
```json
{
  "output_type": "hypothesis_list",
  "disclaimer": "以下为待验证假设，非投资建议",
  "hypotheses": [
    {
      "id": "hyp_001",
      "statement": "FSD可能在2026年实现L4商业化",
      "confidence": "LOW",
      "verification_needed": [
        "2026 Q1 干预率数据",
        "监管审批进展"
      ],
      "monitoring_triggers": [
        {"event": "干预率降至<2次/万英里", "action": "升级为中置信度"},
        {"event": "任一城市获Robotaxi许可", "action": "启动估值分析"}
      ]
    }
  ]
}
```

---

### 2.3 Output Safety 双闸机制

**同一个Agent，两个调用点**：

#### 7a. Ingest Gate (入口消毒)

**调用时机**：Data Integrity 摄入外部数据前

**检查项**：
```json
{
  "checks": [
    {
      "name": "prompt_injection_scan",
      "description": "检测输入中的指令注入特征",
      "patterns": ["ignore previous", "system:", "你是一个", "disregard"],
      "action_on_detect": "QUARANTINE"
    },
    {
      "name": "instruction_data_separation",
      "description": "确保外部数据被标记为data而非instruction",
      "action": "WRAP_AS_DATA"
    },
    {
      "name": "source_validation",
      "description": "验证数据源是否在白名单",
      "whitelist": ["sec.gov", "fmp_api", "company_ir"],
      "action_on_unknown": "FLAG_FOR_REVIEW"
    }
  ]
}
```

**输出**：
```json
{
  "gate": "ingest",
  "verdict": "CLEAN | QUARANTINED | FLAGGED",
  "sanitized_data": {...},
  "quarantined_items": [...],
  "flags": [...]
}
```

#### 7b. Egress Gate (出口清洗)

**调用时机**：Report Composer 输出后，最终交付前

**检查项**：
```json
{
  "checks": [
    {
      "name": "structure_validation",
      "description": "验证输出格式符合schema"
    },
    {
      "name": "pii_detection",
      "description": "检测个人身份信息泄露"
    },
    {
      "name": "executable_content_block",
      "description": "阻断可执行指令（写库/下单/自动发布）",
      "action_on_detect": "BLOCK"
    },
    {
      "name": "kill_switch_check",
      "description": "验证Kill Switch触发条件是否满足",
      "triggers": ["引用缺失率>30%", "核心结论为unsupported", "安全检查未通过"]
    },
    {
      "name": "disclaimer_presence",
      "description": "确保免责声明存在"
    }
  ]
}
```

---

### 2.4 Kill Switch 规则化

**触发条件（由 Quality Gate + Output Safety 联合判定）**：

```json
{
  "kill_switch_rules": [
    {
      "rule_id": "ks_001",
      "condition": "关键结论中 unsupported 占比 > 50%",
      "action": "BLOCK_FULL_REPORT",
      "fallback": "仅输出假设清单"
    },
    {
      "rule_id": "ks_002",
      "condition": "A/B级证据覆盖率 < 40%",
      "action": "DEGRADE_TO_WATCHLIST",
      "fallback": "输出Watchlist Card而非Investment Memo"
    },
    {
      "rule_id": "ks_003",
      "condition": "存在未解决的口径冲突 > 3处",
      "action": "BLOCK_UNTIL_RESOLVED",
      "fallback": "返回冲突报告，要求人工复核"
    },
    {
      "rule_id": "ks_004",
      "condition": "输出含可执行动作（下单/写库）且未通过安全校验",
      "action": "HARD_BLOCK",
      "fallback": "无，必须人工介入"
    },
    {
      "rule_id": "ks_005",
      "condition": "核心数据时效 > 90天",
      "action": "WARN_STALE_DATA",
      "fallback": "在报告首页标注数据陈旧警告"
    }
  ]
}
```

---

## 三、Agent 详细规范 (v1.1 更新部分)

### Agent 1: Data Integrity (新增3个字段)

**输出 Schema 新增字段**：

```json
{
  "agent": "data_integrity",
  "version": "1.1",

  "data_points": [
    {
      "metric": "revenue_ttm",
      "value": 96773000000,
      "unit": "USD",
      "as_of_date": "2025-12-31",

      "normalization_notes": {
        "original_basis": "FY2025",
        "converted_to": "TTM (Q1-Q4 2025)",
        "adjustments": [
          "一次性重组费用$500M已排除",
          "按稀释后股本3.5B计算"
        ],
        "gaap_vs_non_gaap": "GAAP"
      },

      "freshness": {
        "data_as_of": "2025-12-31",
        "source_updated_at": "2026-01-25",
        "retrieved_at": "2026-01-27T10:00:00Z",
        "staleness_days": 27,
        "staleness_status": "FRESH"
      },

      "lineage": {
        "type": "DERIVED",
        "derivation_formula": "Q1_rev + Q2_rev + Q3_rev + Q4_rev",
        "source_values": {
          "Q1_rev": {"value": 21301000000, "source": "10-Q Q1"},
          "Q2_rev": {"value": 23350000000, "source": "10-Q Q2"},
          "Q3_rev": {"value": 24927000000, "source": "10-Q Q3"},
          "Q4_rev": {"value": 27195000000, "source": "10-K"}
        },
        "transformation_applied": "SUM"
      },

      "sources": [...],
      "reconciliation": {...}
    }
  ],

  "normalization_summary": {
    "base_currency": "USD",
    "share_count_basis": "diluted",
    "fiscal_year_end": "December 31",
    "gaap_basis": true,
    "one_time_items_excluded": ["restructuring_2025q2"]
  },

  "freshness_summary": {
    "oldest_data_point": "2025-09-30",
    "newest_data_point": "2025-12-31",
    "overall_staleness": "FRESH",
    "stale_metrics": []
  }
}
```

---

### Agent 4: Ecosystem Graph (新增 update_policy)

**输出 Schema 新增字段**：

```json
{
  "agent": "ecosystem_graph",
  "version": "1.1",

  "graph": {...},

  "update_policy": {
    "edge_classifications": [
      {
        "edge_type": "stable_supply",
        "description": "长期稳定供应关系",
        "confidence": "HIGH",
        "review_frequency": "quarterly",
        "expiry_days": 180,
        "examples": ["PANASONIC→TSLA:battery_cells"]
      },
      {
        "edge_type": "strategic_partnership",
        "description": "战略合作关系",
        "confidence": "MEDIUM",
        "review_frequency": "monthly",
        "expiry_days": 90,
        "examples": ["NVIDIA→TSLA:ai_chips"]
      },
      {
        "edge_type": "rumored_relationship",
        "description": "传闻/未确认关系",
        "confidence": "LOW",
        "review_frequency": "weekly",
        "expiry_days": 30,
        "examples": ["AAPL→TSLA:potential_partnership"]
      },
      {
        "edge_type": "competitive_dynamic",
        "description": "竞争关系",
        "confidence": "MEDIUM",
        "review_frequency": "monthly",
        "expiry_days": 60,
        "auto_update_trigger": "market_share_change > 5%"
      }
    ],

    "auto_refresh_rules": [
      {
        "trigger": "earnings_release",
        "affected_edges": ["supply", "revenue_dependency"],
        "action": "re-verify"
      },
      {
        "trigger": "edge_age > expiry_days",
        "action": "flag_for_review"
      }
    ],

    "stale_edge_handling": {
      "warn_threshold_days": 45,
      "exclude_threshold_days": 90,
      "action": "MARK_AS_UNVERIFIED"
    }
  },

  "graph_freshness": {
    "last_full_refresh": "2026-01-15",
    "edges_verified_last_30_days": 45,
    "edges_stale": 8,
    "edges_unverified": 3
  }
}
```

---

### Agent 8: Eval / Regression (新增日志沉淀机制)

**输出 Schema 新增字段**：

```json
{
  "agent": "eval_regression",
  "version": "1.1",

  "eval_summary": {...},
  "test_results": [...],

  "log_to_eval_pipeline": {
    "enabled": true,
    "capture_rules": [
      {
        "trigger": "quality_gate_verdict == FAIL",
        "action": "create_eval_case",
        "case_type": "gate_failure",
        "auto_label": "needs_review"
      },
      {
        "trigger": "quality_gate_verdict == DEGRADE",
        "action": "create_eval_case",
        "case_type": "evidence_gap",
        "auto_label": "potential_improvement"
      },
      {
        "trigger": "user_correction_received",
        "action": "create_eval_case",
        "case_type": "user_feedback",
        "auto_label": "ground_truth"
      },
      {
        "trigger": "output_safety_verdict == BLOCKED",
        "action": "create_eval_case",
        "case_type": "safety_failure",
        "auto_label": "critical"
      }
    ],

    "eval_case_schema": {
      "case_id": "auto_generated",
      "source_run_id": "from_run_state",
      "trigger_type": "gate_failure | evidence_gap | user_feedback | safety_failure",
      "input_snapshot": "artifacts_at_failure",
      "expected_output": "null_until_labeled",
      "actual_output": "from_run",
      "label_status": "unlabeled | labeled | verified",
      "created_at": "timestamp"
    }
  },

  "new_cases_generated": [
    {
      "case_id": "eval_case_20260127_001",
      "trigger": "quality_gate_verdict == DEGRADE",
      "description": "FSD时间线假设缺乏A级证据",
      "input_hash": "abc123",
      "status": "unlabeled"
    }
  ],

  "eval_coverage_stats": {
    "total_cases_in_library": 350,
    "cases_from_logs_last_30_days": 45,
    "cases_labeled": 320,
    "cases_pending_label": 30,
    "coverage_by_type": {
      "financial_parsing": 0.85,
      "evidence_linkage": 0.72,
      "refusal_correctness": 0.90,
      "gate_decisions": 0.65
    }
  },

  "recommendations": [
    {
      "priority": "P1",
      "action": "标注最近30天的gate_failure案例",
      "reason": "门禁决策覆盖率仅65%",
      "estimated_impact": "+10% gate_decisions coverage"
    }
  ]
}
```

---

## 四、更新后的管道流程

```
┌─────────────────────────────────────────────────────────────────┐
│  SUPERVISOR                                                     │
│  1. 解析任务 → 2. 初始化黑板 → 3. 调度管道 → 4. 归档黑板         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  OUTPUT SAFETY (Ingest Gate)                                    │
│  - 外部数据源净化                                                │
│  - Prompt Injection 扫描                                        │
│  - 输出: sanitized_data_package                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  DATA INTEGRITY                                                 │
│  - 接收净化后的数据                                              │
│  - 输出: DataConfidenceReport (含 normalization, freshness,     │
│          lineage)                                               │
│  - 写入黑板: data_points, evidence_registry                     │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌─────────────────────┐               ┌─────────────────────┐
│  RESEARCH MECHANISM │               │  ECOSYSTEM GRAPH    │
│  - 读取黑板数据      │               │  - 读取黑板数据      │
│  - 输出: ThesisMemo  │               │  - 输出: EcoPackage │
│  - 写入黑板:         │               │    (含update_policy)│
│    claim_registry   │               │  - 写入黑板:         │
└─────────┬───────────┘               │    graph_snapshot   │
          │                           └─────────┬───────────┘
          └───────────────────┬─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  QUALITY GATE                                                   │
│  - 读取黑板: 最新版本的所有artifacts                              │
│  - 检查: claim-evidence linkage, 冲突, 深度                      │
│  - 裁决: PASS / DEGRADE / FAIL                                  │
│  - Kill Switch 规则检查                                          │
│  - 写入黑板: gate_verdict, action_required                      │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │ PASS            │ DEGRADE         │ FAIL
            ▼                 ▼                 ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ VALUATION ENGINE  │ │ REPORT COMPOSER   │ │ SUPERVISOR        │
│ - 完整估值        │ │ (降级模式)        │ │ - 回退指令        │
│                   │ │ - 仅输出假设清单  │ │ - 补数据/重分析   │
└─────────┬─────────┘ │ - 仅输出监控触发器│ │ - 最多重试2次     │
          │           └─────────┬─────────┘ └───────────────────┘
          ▼                     │
┌───────────────────┐           │
│ REPORT COMPOSER   │           │
│ (完整模式)        │           │
│ - Investment Memo │           │
└─────────┬─────────┘           │
          └──────────┬──────────┘
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  OUTPUT SAFETY (Egress Gate)                                    │
│  - 结构校验                                                      │
│  - PII 检测                                                      │
│  - Kill Switch 触发检查                                          │
│  - 可执行内容阻断                                                 │
│  - 输出: safe_output 或 BLOCKED                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  EVAL / REGRESSION (异步)                                       │
│  - 回归测试                                                      │
│  - FAIL/DEGRADE 案例沉淀为新测试用例                             │
│  - 用户纠错沉淀为ground truth                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 五、接口契约表 (v1.1)

| From | To | 传递内容 | 格式 | 黑板写入 |
|------|-----|---------|------|----------|
| Supervisor | Output Safety (Ingest) | RawDataSources | `{urls, files, api_calls}` | - |
| Output Safety (Ingest) | Data Integrity | SanitizedData | `{clean_data, quarantined}` | - |
| Data Integrity | 黑板 | DataPackage | `{data_points, evidence_registry}` | ✓ |
| Research Mechanism | 黑板 | ThesisMemo | `{claims, mechanisms}` | ✓ claim_registry |
| Ecosystem Graph | 黑板 | EcosystemPackage | `{graph, update_policy}` | ✓ graph_snapshot |
| Quality Gate | 黑板 | GateVerdict | `{verdict, reasons, actions}` | ✓ gate_history |
| Quality Gate | Supervisor | VerdictSignal | `{PASS/DEGRADE/FAIL}` | - |
| Valuation Engine | Report Composer | ValuationSummary | `{scenarios, target}` | - |
| Report Composer | Output Safety (Egress) | DraftReport | `{report, format}` | - |
| Output Safety (Egress) | Supervisor | FinalOutput | `{safe_output, verdict}` | ✓ final_output |
| All | Eval | RunArtifacts | 黑板完整快照 | - |

---

## 六、部署建议 (v1.1)

### MVP 优先级调整

```
Phase 1 (Week 1-2): 核心骨架
├── Supervisor (含黑板管理)
├── Research Mechanism
├── Quality Gate (PASS/DEGRADE/FAIL)
└── Report Composer

Phase 2 (Week 3-4): 数据质量
├── Data Integrity (+3字段)
├── Output Safety (双闸)
└── 黑板claim-evidence联动

Phase 3 (Week 5-6): 生态与估值
├── Ecosystem Graph (+update_policy)
├── Valuation Engine
└── Kill Switch 规则引擎

Phase 4 (Week 7-8): 生产化
├── Eval (含日志沉淀)
├── 监控告警
└── 性能优化
```

---

**版本**: v1.1
**设计日期**: 2026-01-27
**变更**: 整合7点改进建议
**状态**: 待用户确认后进入Skill设计阶段
