# 投研多Agent系统架构 v1.0

> 设计原则：**最小必要Agent + 硬门禁 + 固定管道 + 可回归**

---

## 一、系统总览

```
┌────────────────────────────────────────────────────────────────┐
│                    0. SUPERVISOR                               │
│            (任务拆解 / 管道调度 / 失败回退)                      │
└────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  1. DATA         │ │  3. RESEARCH     │ │  4. ECOSYSTEM    │
│     INTEGRITY    │ │     MECHANISM    │ │     GRAPH        │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                    ┌──────────────────┐
                    │  2. QUALITY GATE │  ← 硬门禁
                    │   (PASS/FAIL)    │
                    └────────┬─────────┘
                             │ PASS
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  5. VALUATION    │ │  6. REPORT       │ │  7. OUTPUT       │
│     ENGINE       │ │     COMPOSER     │ │     SAFETY       │
└──────────────────┘ └────────┬─────────┘ └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  8. EVAL /       │  ← 异步/后台
                    │     REGRESSION   │
                    └──────────────────┘
```

---

## 二、Agent 详细规范

### Agent 0: Supervisor / Orchestrator

**职责**：
- 解析用户意图，识别任务类型（深度研究/快速扫描/监控更新/对比分析）
- 选择执行管道（标准/精简/自定义）
- 分配资源，设定超时和失败策略
- 汇总各Agent产出，判断是否达成目标

**输入 Schema**：
```json
{
  "task_type": "deep_research | quick_scan | monitoring | comparison",
  "target": {
    "ticker": "TSLA",
    "company_name": "Tesla Inc",
    "industry_hint": "EV / Energy / Robotics"
  },
  "constraints": {
    "deadline": "2026-01-28T18:00:00Z",
    "max_tokens": 50000,
    "output_format": "investment_memo | daily_brief | watchlist_card",
    "language": "zh-CN"
  },
  "focus_areas": ["valuation", "competition", "catalyst"],
  "prior_context": null
}
```

**输出 Schema**：
```json
{
  "run_id": "uuid",
  "run_plan": {
    "pipeline": ["data_integrity", "research", "ecosystem", "quality_gate", "valuation", "report", "safety"],
    "parallel_groups": [
      ["data_integrity"],
      ["research", "ecosystem"],
      ["quality_gate"],
      ["valuation"],
      ["report", "safety"]
    ],
    "timeout_per_agent_sec": 300,
    "failure_strategy": "retry_once_then_degrade"
  },
  "expected_artifacts": [
    "data_confidence_report",
    "thesis_memo",
    "ecosystem_graph",
    "quality_verdict",
    "valuation_summary",
    "final_report"
  ],
  "status": "planning | running | completed | failed",
  "error_log": []
}
```

---

### Agent 1: Data Integrity (数据完整性)

**职责**：
- 跨数据源对账（SEC/XBRL、公司公告、FMP API、券商数据）
- 统一口径（TTM vs FY、稀释股本、会计口径）
- 构建证据树，为每个数据点标注来源、时间戳、置信度
- 识别数据缺口和冲突

**输入 Schema**：
```json
{
  "ticker": "TSLA",
  "data_requirements": [
    {
      "metric": "revenue_ttm",
      "sources": ["sec_10k", "fmp_api", "company_ir"],
      "recency_required": "90_days"
    },
    {
      "metric": "gross_margin",
      "sources": ["sec_10k", "earnings_call"],
      "recency_required": "90_days"
    }
  ],
  "reconciliation_rules": {
    "tolerance_pct": 2.0,
    "prefer_source": "sec_10k"
  }
}
```

**输出 Schema**：
```json
{
  "agent": "data_integrity",
  "version": "1.0",
  "timestamp": "2026-01-27T10:00:00Z",
  "ticker": "TSLA",

  "data_points": [
    {
      "metric": "revenue_ttm",
      "value": 96773000000,
      "unit": "USD",
      "as_of_date": "2025-12-31",
      "sources": [
        {
          "source_id": "sec_10k_2025",
          "value": 96773000000,
          "filing_date": "2026-01-25",
          "url": "https://sec.gov/...",
          "confidence": "A"
        },
        {
          "source_id": "fmp_api",
          "value": 96800000000,
          "retrieved_at": "2026-01-27",
          "confidence": "B"
        }
      ],
      "reconciliation": {
        "status": "MATCH",
        "variance_pct": 0.03,
        "adopted_value": 96773000000,
        "adopted_source": "sec_10k_2025",
        "note": "FMP略高，可能含估算"
      }
    }
  ],

  "evidence_tree": {
    "root": "TSLA_financial_health",
    "nodes": [
      {
        "claim": "2025年收入增长8%",
        "evidence": ["sec_10k_2025:revenue", "earnings_call_q4:guidance"],
        "confidence": "A",
        "falsifiable_by": "Q1 2026收入环比下降>10%"
      }
    ]
  },

  "data_gaps": [
    {
      "metric": "fsd_intervention_rate",
      "status": "MISSING",
      "attempted_sources": ["company_ir", "third_party"],
      "recommendation": "需要从crowd-sourced数据或专利文件推断"
    }
  ],

  "confidence_summary": {
    "overall_score": 0.85,
    "a_tier_pct": 0.70,
    "b_tier_pct": 0.25,
    "c_tier_pct": 0.05,
    "gaps_count": 2
  }
}
```

---

### Agent 2: Quality Gate (质量门禁)

**职责**：
- 对所有前置Agent产出进行质量验收
- 执行Skeptic检验：寻找替代解释、反向因果、样本偏差
- 测量不确定性：标注每条关键断言的支持强度
- 输出门禁判定：PASS / NEEDS_MORE_DATA / CONFLICT / REJECT

**输入 Schema**：
```json
{
  "artifacts_to_review": [
    {
      "agent": "data_integrity",
      "artifact_id": "data_confidence_report_xxx"
    },
    {
      "agent": "research_mechanism",
      "artifact_id": "thesis_memo_xxx"
    },
    {
      "agent": "ecosystem_graph",
      "artifact_id": "ecosystem_package_xxx"
    }
  ],
  "review_criteria": {
    "min_confidence_score": 0.70,
    "max_unsupported_claims": 3,
    "require_falsifiability": true,
    "skeptic_mode": "standard | aggressive"
  }
}
```

**输出 Schema**：
```json
{
  "agent": "quality_gate",
  "version": "1.0",
  "timestamp": "2026-01-27T11:00:00Z",

  "verdict": "PASS | NEEDS_MORE_DATA | CONFLICT | REJECT",
  "verdict_reason": "3项关键假设缺乏A级证据支撑",

  "claim_review": [
    {
      "claim_id": "thesis_001",
      "claim_text": "FSD将在2026年实现L4级别商业化",
      "support_level": "WEAK",
      "evidence_count": 2,
      "evidence_quality": ["B", "C"],
      "skeptic_challenges": [
        {
          "challenge": "历史上FSD承诺多次跳票",
          "counter_evidence": "2019-2024年4次延期",
          "impact": "HIGH"
        },
        {
          "challenge": "监管审批时间不确定",
          "counter_evidence": "Waymo用了8年获得无人驾驶许可",
          "impact": "MEDIUM"
        }
      ],
      "falsifiable_condition": "2026 Q2前未获任何城市Robotaxi运营许可",
      "recommendation": "降级为'可能'而非'将'"
    }
  ],

  "uncertainty_map": {
    "high_confidence": ["revenue_ttm", "gross_margin", "cash_position"],
    "medium_confidence": ["energy_growth_rate", "china_market_share"],
    "low_confidence": ["fsd_timeline", "optimus_revenue_2027"],
    "unknown": ["robotaxi_unit_economics"]
  },

  "action_required": [
    {
      "type": "fetch_more_data",
      "target": "robotaxi_pilot_city_count",
      "reason": "关键论点缺乏数据支撑"
    },
    {
      "type": "downgrade_claim",
      "target": "thesis_001",
      "from": "will",
      "to": "may"
    }
  ],

  "gate_metrics": {
    "claims_reviewed": 15,
    "claims_passed": 10,
    "claims_flagged": 5,
    "overall_pass_rate": 0.67
  }
}
```

---

### Agent 3: Research Mechanism (研究机制)

**职责**：
- 将直觉转为机制化论点（A→B→C因果链）
- 明确「你买的是哪几条假设」
- 执行反事实与压力测试
- 支持多种分析模式（standard / exploratory / stress_test）

**输入 Schema**：
```json
{
  "ticker": "TSLA",
  "mode": "standard | exploratory | stress_test",
  "data_package": {
    "ref": "data_integrity_output_xxx"
  },
  "analysis_frameworks": ["bcg_matrix", "porter_five_forces", "ge_matrix"],
  "focus_questions": [
    "Robotaxi能否在2026年实现规模商业化？",
    "储能业务能否在3年内成为利润主力？",
    "当前股价隐含了什么假设？"
  ],
  "depth_requirement": "level_3_mechanism"
}
```

**输出 Schema**：
```json
{
  "agent": "research_mechanism",
  "version": "1.0",
  "timestamp": "2026-01-27T11:30:00Z",
  "ticker": "TSLA",

  "core_thesis": {
    "one_liner": "Tesla是一家以数据为核心资产的AI公司，汽车和储能是数据采集和现金流工具",
    "investment_case": "买的是FSD/Robotaxi的期权价值 + 储能的确定性增长",
    "core_contradiction": "增长需要降价(量) vs 盈利需要溢价(利) → 量利不可兼得"
  },

  "key_assumptions": [
    {
      "id": "assumption_001",
      "statement": "FSD干预率将在2026年底降至<1次/万英里",
      "mechanism_chain": [
        "更多车辆 → 更多训练数据",
        "更多数据 → 更好的神经网络",
        "更好的网络 → 更低干预率"
      ],
      "observable_metrics": ["intervention_rate", "fleet_size", "fsd_adoption_rate"],
      "current_value": "~5次/万英里 (2025Q4估算)",
      "target_value": "<1次/万英里",
      "confidence": "MEDIUM",
      "falsifiable_by": "2026Q2数据仍>3次/万英里"
    }
  ],

  "mechanism_map": {
    "flywheel_positive": [
      {
        "name": "数据飞轮",
        "chain": "卖车 → 数据采集 → FSD改进 → 订阅价值 → 更多人买车",
        "current_rpm": "加速中",
        "key_metric": "fsd_subscription_rate",
        "reversal_trigger": "竞品数据量超越 or 监管限制数据使用"
      }
    ],
    "flywheel_negative": [
      {
        "name": "价格战恶性循环",
        "chain": "降价 → 利润率下降 → 研发预算压力 → 产品竞争力下降 → 更多降价",
        "current_status": "观察中",
        "warning_signal": "毛利率连续2季度下降"
      }
    ]
  },

  "framework_outputs": {
    "bcg_matrix": {
      "stars": ["Energy Storage"],
      "cash_cows": ["Model 3/Y"],
      "question_marks": ["Robotaxi", "Optimus"],
      "dogs": []
    },
    "porter_five_forces": {
      "supplier_power": {"score": 3, "trend": "decreasing", "note": "垂直整合降低依赖"},
      "buyer_power": {"score": 4, "trend": "increasing", "note": "竞品增多选择多"},
      "competitive_rivalry": {"score": 5, "trend": "increasing", "note": "中国品牌激烈竞争"},
      "threat_of_substitutes": {"score": 3, "trend": "stable", "note": "燃油车替代已减弱"},
      "threat_of_new_entry": {"score": 2, "trend": "stable", "note": "资本和技术壁垒高"}
    }
  },

  "counterfactual_tests": [
    {
      "scenario": "如果Robotaxi完全失败",
      "removed_factor": "robotaxi_option_value",
      "residual_value": "$150-180/share",
      "implication": "当前$450中约$270-300是Robotaxi期权定价"
    }
  ],

  "cognitive_traps_identified": [
    {
      "trap": "叙事诱惑",
      "description": "Robotaxi/Optimus故事太引人入胜，容易忽视概率",
      "mitigation": "强制要求每个故事附概率和证伪条件"
    },
    {
      "trap": "锚定CEO",
      "description": "过度锚定Musk个人能力，忽视组织执行力",
      "mitigation": "分析高管团队深度和留任率"
    }
  ],

  "innovation_hypotheses": [
    {
      "hypothesis": "4680电池良率突破可能重新定义储能成本曲线",
      "status": "unverified",
      "verification_plan": "追踪Q1产能和成本数据",
      "potential_impact": "HIGH"
    }
  ],

  "depth_verification": {
    "level_3_plus_count": 4,
    "total_claims": 6,
    "level_3_plus_ratio": 0.67,
    "requirement_met": true
  }
}
```

---

### Agent 4: Ecosystem Graph (生态图谱)

**职责**：
- 构建公司关系图（供应商、客户、竞品、替代、互补）
- 计算相似度/重合度并解释原因
- 产出邻接扩散watchlist
- 识别替代威胁和生态风险

**输入 Schema**：
```json
{
  "ticker": "TSLA",
  "analysis_scope": {
    "upstream": true,
    "downstream": true,
    "competitors": true,
    "substitutes": true,
    "adjacencies": true
  },
  "depth": {
    "supplier_tiers": 2,
    "customer_segments": 3,
    "competitor_radius": "direct_and_indirect"
  }
}
```

**输出 Schema**：
```json
{
  "agent": "ecosystem_graph",
  "version": "1.0",
  "timestamp": "2026-01-27T12:00:00Z",
  "ticker": "TSLA",

  "graph": {
    "nodes": [
      {"id": "TSLA", "type": "target", "name": "Tesla"},
      {"id": "PANASONIC", "type": "supplier", "name": "Panasonic"},
      {"id": "CATL", "type": "supplier", "name": "CATL"},
      {"id": "BYD", "type": "competitor", "name": "BYD"},
      {"id": "RIVN", "type": "competitor", "name": "Rivian"},
      {"id": "UBER", "type": "potential_competitor", "name": "Uber (Robotaxi)"}
    ],
    "edges": [
      {
        "from": "PANASONIC",
        "to": "TSLA",
        "type": "supplies",
        "product": "4680 battery cells",
        "revenue_dependency_pct": 15,
        "confidence": "A"
      },
      {
        "from": "TSLA",
        "to": "BYD",
        "type": "competes_with",
        "overlap_dimensions": ["ev_mass_market", "china_market", "battery_tech"],
        "intensity": "HIGH"
      }
    ]
  },

  "competitor_analysis": [
    {
      "competitor": "BYD",
      "overlap_score": 0.75,
      "overlap_dimensions": {
        "customer_segment": 0.8,
        "price_range": 0.7,
        "geography": 0.6,
        "technology": 0.9
      },
      "competitive_advantages_vs_tsla": ["成本控制", "中国市场渗透", "垂直整合程度"],
      "competitive_disadvantages_vs_tsla": ["品牌溢价", "软件能力", "北美市场"],
      "threat_level": "HIGH",
      "trend": "increasing"
    }
  ],

  "substitution_threats": [
    {
      "substitute": "高端公共交通 + 共享出行",
      "substitution_scenario": "城市年轻人不再购车",
      "probability": 0.3,
      "impact_if_realized": "MEDIUM",
      "early_warning_signal": "一线城市新车销量连续下降"
    }
  ],

  "adjacency_watchlist": [
    {
      "ticker": "ENPH",
      "company": "Enphase Energy",
      "adjacency_reason": "家庭储能生态重叠",
      "similarity_score": 0.45,
      "analogy_validity": "能源转型受益，但商业模式不同",
      "analogy_failure_condition": "储能市场碎片化无法形成平台效应"
    },
    {
      "ticker": "NVDA",
      "company": "NVIDIA",
      "adjacency_reason": "AI训练基础设施依赖",
      "relationship": "supplier",
      "strategic_importance": "HIGH"
    }
  ],

  "ecosystem_risks": [
    {
      "risk": "电池供应商集中度",
      "description": "CATL+Panasonic占电池供应>80%",
      "mitigation": "4680自产扩张",
      "residual_risk": "MEDIUM"
    }
  ],

  "graph_stats": {
    "total_nodes": 45,
    "total_edges": 78,
    "avg_edge_confidence": 0.72
  }
}
```

---

### Agent 5: Valuation Engine (估值引擎)

**职责**：
- 反向定价：当前价格隐含什么预期
- 多场景估值（Base/Bull/Bear）
- 敏感性分析
- 输出可审计的假设集合

**输入 Schema**：
```json
{
  "ticker": "TSLA",
  "current_price": 450.00,
  "shares_outstanding": 3500000000,
  "valuation_methods": ["dcf", "sotp", "comparable"],
  "scenario_weights": {
    "bull": 0.25,
    "base": 0.50,
    "bear": 0.25
  },
  "data_package": {
    "ref": "data_integrity_output_xxx"
  },
  "thesis_package": {
    "ref": "research_mechanism_output_xxx"
  }
}
```

**输出 Schema**：
```json
{
  "agent": "valuation_engine",
  "version": "1.0",
  "timestamp": "2026-01-27T12:30:00Z",
  "ticker": "TSLA",
  "current_price": 450.00,
  "market_cap_bn": 1575,

  "implied_expectations": {
    "implied_revenue_cagr_5y": 0.18,
    "implied_terminal_margin": 0.15,
    "implied_wacc": 0.10,
    "implied_terminal_growth": 0.03,
    "interpretation": "市场定价隐含未来5年收入CAGR 18%，终端净利率15%，这需要Robotaxi成功"
  },

  "scenarios": [
    {
      "name": "BULL",
      "probability": 0.25,
      "narrative": "Robotaxi 2026规模化 + 储能爆发 + Optimus商业化启动",
      "key_assumptions": {
        "robotaxi_launch": "2026 H2",
        "energy_revenue_2028": 50000000000,
        "auto_margin": 0.20,
        "optimus_revenue_2028": 5000000000
      },
      "sotp": {
        "auto": {"value_bn": 400, "method": "DCF", "multiple": "25x 2028E earnings"},
        "energy": {"value_bn": 250, "method": "DCF", "multiple": "5x 2028E revenue"},
        "robotaxi": {"value_bn": 500, "method": "option_pricing", "note": "概率调整后"},
        "optimus": {"value_bn": 100, "method": "option_pricing"},
        "net_cash": {"value_bn": 30}
      },
      "target_price": 365.71,
      "target_market_cap_bn": 1280
    },
    {
      "name": "BASE",
      "probability": 0.50,
      "narrative": "汽车稳健增长 + 储能成为第二引擎 + Robotaxi延迟但进展",
      "key_assumptions": {
        "robotaxi_launch": "2027 H2",
        "energy_revenue_2028": 35000000000,
        "auto_margin": 0.16,
        "optimus_revenue_2028": 0
      },
      "sotp": {
        "auto": {"value_bn": 350, "method": "DCF"},
        "energy": {"value_bn": 175, "method": "DCF"},
        "robotaxi": {"value_bn": 200, "method": "option_pricing"},
        "optimus": {"value_bn": 25, "method": "option_pricing"},
        "net_cash": {"value_bn": 30}
      },
      "target_price": 222.86,
      "target_market_cap_bn": 780
    },
    {
      "name": "BEAR",
      "probability": 0.25,
      "narrative": "价格战持续 + Robotaxi监管受阻 + 中国市场份额下滑",
      "key_assumptions": {
        "robotaxi_launch": "indefinitely_delayed",
        "energy_revenue_2028": 25000000000,
        "auto_margin": 0.10,
        "china_share_loss": 0.30
      },
      "sotp": {
        "auto": {"value_bn": 200, "method": "DCF"},
        "energy": {"value_bn": 125, "method": "DCF"},
        "robotaxi": {"value_bn": 0},
        "optimus": {"value_bn": 0},
        "net_cash": {"value_bn": 30}
      },
      "target_price": 101.43,
      "target_market_cap_bn": 355
    }
  ],

  "weighted_target": {
    "price": 228.21,
    "market_cap_bn": 799,
    "vs_current": -0.493,
    "interpretation": "加权目标价较当前折价49%，市场定价已包含大量乐观预期"
  },

  "sensitivity_analysis": {
    "most_sensitive_variables": [
      {"variable": "robotaxi_probability", "elasticity": 2.3},
      {"variable": "auto_margin", "elasticity": 1.8},
      {"variable": "wacc", "elasticity": 1.5}
    ],
    "sensitivity_table": {
      "wacc": {
        "8%": 285,
        "10%": 228,
        "12%": 185
      },
      "robotaxi_probability": {
        "0%": 150,
        "30%": 228,
        "60%": 320
      }
    }
  },

  "audit_trail": {
    "data_sources": ["data_integrity_output_xxx"],
    "model_version": "dcf_v2.1",
    "assumptions_locked_at": "2026-01-27T12:30:00Z"
  }
}
```

---

### Agent 6: Report Composer (报告编排)

**职责**：
- 按目标格式组装最终输出
- 从各Agent拉取交付物，结构化拼装
- 控制篇幅、风格、语言
- 生成可发布的文档

**输入 Schema**：
```json
{
  "output_format": "investment_memo | daily_brief | watchlist_card | comparison_table",
  "language": "zh-CN",
  "max_words": 25000,
  "style": "professional_research",
  "sections_required": [
    "executive_summary",
    "core_thesis",
    "valuation",
    "risks_catalysts",
    "conclusion"
  ],
  "artifacts": {
    "data_integrity": "ref_xxx",
    "research_mechanism": "ref_xxx",
    "ecosystem_graph": "ref_xxx",
    "quality_gate": "ref_xxx",
    "valuation_engine": "ref_xxx"
  }
}
```

**输出 Schema**：
```json
{
  "agent": "report_composer",
  "version": "1.0",
  "timestamp": "2026-01-27T13:00:00Z",

  "report": {
    "format": "investment_memo",
    "language": "zh-CN",
    "word_count": 22450,

    "metadata": {
      "ticker": "TSLA",
      "company": "Tesla Inc",
      "data_as_of": "2026-01-25",
      "analyst": "AI Research System v1.0",
      "confidentiality": "internal_use_only"
    },

    "sections": [
      {
        "id": "executive_summary",
        "title": "执行摘要",
        "content": "...",
        "word_count": 800
      },
      {
        "id": "core_thesis",
        "title": "核心投资论点",
        "content": "...",
        "word_count": 3500,
        "subsections": ["核心命题", "核心矛盾", "关键假设", "认知陷阱"]
      }
    ],

    "tables": [
      {
        "id": "analyst_landscape",
        "title": "顶级分析师观点全景",
        "data": []
      },
      {
        "id": "valuation_summary",
        "title": "估值场景汇总",
        "data": []
      }
    ],

    "charts": [
      {
        "id": "bcg_matrix",
        "type": "ascii_chart",
        "content": "..."
      }
    ],

    "citations": [
      {
        "id": 1,
        "source": "Tesla 10-K 2025",
        "url": "https://sec.gov/...",
        "accessed": "2026-01-25"
      }
    ],

    "kill_switch": "如果Robotaxi发生致命事故导致全面暂停，整个论点需重估",

    "appendix": {
      "evidence_tree_summary": "...",
      "data_confidence_summary": "...",
      "quality_gate_summary": "..."
    }
  },

  "export_options": {
    "markdown": true,
    "pdf": false,
    "notion": false
  }
}
```

---

### Agent 7: Output Safety (输出安全)

**职责**：
- 对最终输出进行安全审查
- 检测提示注入、敏感信息泄露
- 验证格式合规性
- 阻断或标记风险内容

**输入 Schema**：
```json
{
  "content_to_review": {
    "ref": "report_composer_output_xxx"
  },
  "safety_checks": [
    "prompt_injection_scan",
    "pii_detection",
    "financial_advice_disclaimer",
    "source_attribution_check",
    "format_validation"
  ],
  "output_destination": "internal | external | public"
}
```

**输出 Schema**：
```json
{
  "agent": "output_safety",
  "version": "1.0",
  "timestamp": "2026-01-27T13:30:00Z",

  "verdict": "SAFE | FLAGGED | BLOCKED",
  "verdict_reason": null,

  "checks_performed": [
    {
      "check": "prompt_injection_scan",
      "status": "PASS",
      "details": null
    },
    {
      "check": "pii_detection",
      "status": "PASS",
      "details": null
    },
    {
      "check": "financial_advice_disclaimer",
      "status": "PASS",
      "details": "免责声明已包含"
    },
    {
      "check": "source_attribution_check",
      "status": "PASS",
      "details": "所有引用已标注来源"
    },
    {
      "check": "format_validation",
      "status": "PASS",
      "details": "Markdown格式正确"
    }
  ],

  "modifications_made": [],

  "safe_output": {
    "ref": "report_composer_output_xxx",
    "modifications": "none",
    "ready_for_delivery": true
  },

  "risk_flags": []
}
```

---

### Agent 8: Eval / Regression (评测回归)

**职责**：
- 维护能力测试用例集
- 每次运行后执行回归测试
- 追踪失败模式，维护失败模式库
- 版本对比，防止退化

**输入 Schema**：
```json
{
  "eval_type": "post_run | scheduled | on_change",
  "run_artifacts": {
    "run_id": "xxx",
    "all_agent_outputs": []
  },
  "test_suites": [
    "financial_parsing_accuracy",
    "valuation_consistency",
    "evidence_linkage",
    "refusal_correctness",
    "format_compliance"
  ],
  "compare_with_baseline": "v0.9"
}
```

**输出 Schema**：
```json
{
  "agent": "eval_regression",
  "version": "1.0",
  "timestamp": "2026-01-27T14:00:00Z",

  "eval_summary": {
    "total_tests": 150,
    "passed": 142,
    "failed": 8,
    "pass_rate": 0.947
  },

  "test_results": [
    {
      "suite": "financial_parsing_accuracy",
      "tests_run": 30,
      "passed": 29,
      "failed": 1,
      "failed_cases": [
        {
          "case_id": "fp_023",
          "description": "非GAAP调整项识别",
          "expected": "SBC excluded from adjusted EPS",
          "actual": "SBC included",
          "severity": "MEDIUM"
        }
      ]
    }
  ],

  "failure_mode_analysis": {
    "new_failures": 2,
    "recurring_failures": 6,
    "resolved_from_last_run": 3,
    "failure_clusters": [
      {
        "cluster": "non_gaap_handling",
        "count": 4,
        "root_cause_hypothesis": "数据源口径不一致",
        "suggested_fix": "增加非GAAP→GAAP桥表验证"
      }
    ]
  },

  "version_comparison": {
    "baseline": "v0.9",
    "current": "v1.0",
    "improvements": [
      "evidence_linkage: +5%",
      "refusal_correctness: +12%"
    ],
    "regressions": [
      "financial_parsing: -2%"
    ],
    "net_change": "+3.2%"
  },

  "recommendations": [
    {
      "priority": "P1",
      "action": "修复非GAAP处理逻辑",
      "estimated_impact": "+2% overall pass rate"
    }
  ],

  "next_scheduled_eval": "2026-01-28T00:00:00Z"
}
```

---

## 三、Agent间接口契约

### 标准管道流程

```
┌─────────────┐
│  Supervisor │
│  (启动)     │
└──────┬──────┘
       │ 1. 下发任务
       ▼
┌─────────────┐
│    Data     │  产出: DataConfidenceReport
│  Integrity  │
└──────┬──────┘
       │ 2. 数据包
       ├──────────────────────┐
       ▼                      ▼
┌─────────────┐        ┌─────────────┐
│  Research   │        │  Ecosystem  │  可并行
│  Mechanism  │        │    Graph    │
└──────┬──────┘        └──────┬──────┘
       │                      │
       └──────────┬───────────┘
                  │ 3. 研究包
                  ▼
           ┌─────────────┐
           │   Quality   │  产出: Verdict (PASS/FAIL)
           │    Gate     │
           └──────┬──────┘
                  │ PASS
                  ▼
           ┌─────────────┐
           │  Valuation  │  产出: ValuationSummary
           │   Engine    │
           └──────┬──────┘
                  │
                  ▼
           ┌─────────────┐
           │   Report    │  产出: FinalReport
           │  Composer   │
           └──────┬──────┘
                  │
                  ▼
           ┌─────────────┐
           │   Output    │  产出: SafeOutput
           │   Safety    │
           └──────┬──────┘
                  │
                  ▼
           ┌─────────────┐
           │    Eval     │  产出: EvalReport (异步)
           │ Regression  │
           └─────────────┘
```

### 接口契约表

| From | To | 传递内容 | 格式 |
|------|-----|---------|------|
| Supervisor | Data Integrity | TaskSpec | `{ticker, data_requirements}` |
| Data Integrity | Research Mechanism | DataPackage | `{data_points, evidence_tree, gaps}` |
| Data Integrity | Ecosystem Graph | DataPackage | 同上 |
| Research Mechanism | Quality Gate | ThesisMemo | `{core_thesis, assumptions, mechanisms}` |
| Ecosystem Graph | Quality Gate | EcosystemPackage | `{graph, competitors, risks}` |
| Quality Gate | Valuation Engine | ApprovedPackage | `{verified_claims, uncertainty_map}` |
| Quality Gate | Supervisor | Verdict | `{PASS/FAIL, action_required}` |
| Valuation Engine | Report Composer | ValuationSummary | `{scenarios, weighted_target, sensitivity}` |
| All Agents | Report Composer | AllArtifacts | 按ref引用 |
| Report Composer | Output Safety | DraftReport | `{report, export_options}` |
| Output Safety | Supervisor | SafeOutput | `{verdict, safe_output}` |
| All Outputs | Eval | RunArtifacts | 全量产出 |

---

## 四、失败处理策略

### Quality Gate 失败

```
verdict == NEEDS_MORE_DATA:
  → Supervisor 指派 Data Integrity 补充数据
  → 最多重试2次
  → 仍失败则降级输出（标注数据不足）

verdict == CONFLICT:
  → Supervisor 指派 Research Mechanism 重新分析冲突点
  → 输出保留冲突说明，不强行统一

verdict == REJECT:
  → 终止当前任务
  → 返回错误报告给用户
```

### Agent 超时

```
任何Agent超过 timeout_per_agent_sec:
  → Supervisor 终止该Agent
  → 使用缓存/降级数据继续
  → 最终报告标注"部分数据可能过时"
```

---

## 五、与现有框架映射

| CLAUDE.md v6.0 要素 | 新框架对应 | 实现位置 |
|---------------------|-----------|---------|
| 核心命题 3-5个 | Research Mechanism | `core_thesis.key_assumptions` |
| 核心矛盾 | Research Mechanism | `core_thesis.core_contradiction` |
| 认知陷阱 | Research Mechanism | `cognitive_traps_identified` |
| Kill Switch | Report Composer | `report.kill_switch` |
| BCG/五力/GE矩阵 | Research Mechanism | `framework_outputs` |
| 层级穿透 Level 3+ | Quality Gate | `depth_verification` |
| 估值三场景 | Valuation Engine | `scenarios` |
| 数据信度分层 | Data Integrity | `confidence_summary` |
| 25项质量清单 | Eval Agent | 转为test_suites |
| 行业自适应 | Supervisor | `task_type` + 模板选择 |

---

## 六、部署建议

### 最小可行版本 (MVP)

先实现核心4个Agent：
1. Supervisor (简化版，固定管道)
2. Research Mechanism
3. Valuation Engine
4. Report Composer

其他Agent用stub/mock替代，逐步补齐。

### 扩展路径

```
Phase 1: 核心4个 → 可产出基础报告
Phase 2: + Data Integrity + Quality Gate → 有质量保障
Phase 3: + Ecosystem Graph → 有生态分析
Phase 4: + Output Safety + Eval → 生产级稳定性
```

---

**版本**: v1.0
**设计日期**: 2026-01-27
**状态**: 待用户确认后进入Skill设计阶段
