# Fintech行业 WebSearch Agent 追加查询模板 v1.0

> 适用目标公司: SoFi (SOFI), Block/Square (SQ), PayPal (PYPL), Robinhood (HOOD), LendingClub (LC), Affirm (AFRM), Coinbase (COIN), Upstart (UPST)
> 框架版本: data-prefetch v3.0 扩展
> 创建日期: 2026-02-08

---

## 第一部分: 通用Agent的Fintech行业追加查询

### Agent A: 分析师共识 — 追加查询 (4条)

```
追加查询:
A-FT-1: "{TICKER} fintech analyst ratings {YEAR} digital banking"
A-FT-2: "{COMPANY} revenue per member ARPU forecast"
A-FT-3: "{TICKER} cross-sell attach rate analyst estimate"
A-FT-4: "{TICKER} net interest margin NIM forecast fintech"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| A-FT-1 | Fintech专项覆盖分析师的评级(KBW, Oppenheimer, Wedbush等) | 通用查询倾向返回大型综合分析师，遗漏Fintech专项覆盖 |
| A-FT-2 | 每会员ARPU预测，区别于传统银行每客户收入 | Fintech用"会员"而非"客户"，产品attach rate是核心估值变量 |
| A-FT-3 | 产品交叉销售渗透率预期 | 这是SoFi类多产品Fintech的核心增长引擎，传统银行不追踪 |
| A-FT-4 | 净息差预测(区别于传统银行NIM) | Fintech NIM结构不同(消费贷+学生贷+个人贷vs商业贷) |

**`analyst_consensus.json` 追加Schema字段**:
```json
{
  "industry_specific": {
    "fintech_specialist_analysts": [
      { "firm": "", "analyst": "", "rating": "", "price_target": 0, "key_thesis": "" }
    ],
    "arpu_estimates": {
      "current_arpu": 0,
      "forecast_arpu": 0,
      "growth_driver": ""
    },
    "cross_sell_estimates": {
      "current_products_per_member": 0,
      "target_products_per_member": 0,
      "timeline": ""
    },
    "nim_forecast": {
      "current_nim_pct": 0,
      "forecast_nim_pct": 0,
      "driver": ""
    }
  }
}
```

---

### Agent B: 预测市场 — 追加查询 (3条)

```
追加查询:
B-FT-1: "site:polymarket.com fintech regulation CFPB"
B-FT-2: "site:polymarket.com student loan forgiveness {YEAR}"
B-FT-3: "site:kalshi.com FDIC bank failure {YEAR}"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| B-FT-1 | CFPB对Fintech监管行动的概率(费用上限、公开银行规则等) | 通用查询覆盖Fed利率，但CFPB是Fintech特有监管风险 |
| B-FT-2 | 学生贷款减免政策概率(直接影响SoFi/SOFI学生贷款业务) | 学生贷款是SoFi起家业务，政策变化对收入影响巨大 |
| B-FT-3 | 银行倒闭概率(影响Fintech对手方风险和存款信心) | 2023年SVB事件后，银行倒闭概率直接影响Fintech存款获取 |

**`prediction_market.json` 追加Schema字段**:
```json
{
  "industry_events": [
    {
      "event": "CFPB fintech regulation action",
      "platform": "Polymarket",
      "probability": 0,
      "last_updated": "",
      "url": "",
      "impact_on_ticker": "direct|indirect",
      "impact_description": ""
    }
  ]
}
```

---

### Agent C: 新闻与催化剂 — 追加查询 (3条)

```
追加查询:
C-FT-1: "{COMPANY} new product launch feature {YEAR} fintech"
C-FT-2: "{COMPANY} bank charter regulatory update {YEAR}"
C-FT-3: "{TICKER} CFPB consent order investigation {YEAR}"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| C-FT-1 | Fintech新产品发布(信用卡、投资产品、加密交易等) | Fintech产品迭代速度快于传统金融，是核心催化剂 |
| C-FT-2 | 银行牌照进展(如SoFi Bank 2022获牌后的合规更新) | 牌照状态变化对Fintech估值有重大影响 |
| C-FT-3 | 监管执法行动(罚款、整改令等) | Fintech面临的监管审查密度远高于传统银行 |

---

### Agent D: 业务与竞争 — 追加查询 (4条)

```
追加查询:
D-FT-1: "{COMPANY} total members funded accounts products per member"
D-FT-2: "{COMPANY} vs neobank comparison Chime Revolut Marcus"
D-FT-3: "{INDUSTRY} fintech market share digital banking {YEAR}"
D-FT-4: "{COMPANY} technology platform Galileo Technisys B2B revenue"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| D-FT-1 | 会员指标生态(会员数/funded accounts/产品渗透率) | Fintech不用传统"客户数"，用会员+funded accounts双维度 |
| D-FT-2 | Neobank竞品直接对比(Chime/Revolut/Marcus by GS) | Fintech竞争图谱与传统银行完全不同 |
| D-FT-3 | 数字银行/Fintech市场份额数据 | 通用竞争查询返回传统金融市场份额，遗漏数字银行赛道 |
| D-FT-4 | B2B科技平台业务(如SoFi的Galileo/Technisys) | SoFi类公司有独立B2B业务线，通用查询无法覆盖 |

**`business_overview.json` 追加Schema字段**:
```json
{
  "industry_specific": {
    "member_ecosystem": {
      "total_members": 0,
      "funded_accounts": 0,
      "products_per_member": 0,
      "yoy_member_growth_pct": 0,
      "yoy_funded_accounts_growth_pct": 0
    },
    "product_mix": [
      { "product": "Lending", "revenue_pct": 0, "growth_rate": 0 },
      { "product": "Financial Services", "revenue_pct": 0, "growth_rate": 0 },
      { "product": "Technology Platform", "revenue_pct": 0, "growth_rate": 0 }
    ],
    "b2b_platform": {
      "name": "",
      "accounts_enabled": 0,
      "revenue": 0,
      "growth_rate": 0,
      "key_clients": []
    },
    "neobank_competitive_map": [
      { "competitor": "", "total_users_M": 0, "key_advantage": "", "overlap_with_ticker": "" }
    ]
  }
}
```

**`competitive_landscape.json` 追加Schema字段**:
```json
{
  "industry_specific": {
    "digital_banking_market_share": {
      "ticker_share_pct": 0,
      "top_5_competitors": [],
      "tam_digital_banking_B": 0,
      "sam_addressable_B": 0
    },
    "product_feature_comparison": {
      "apy_savings": 0,
      "credit_card_cashback_pct": 0,
      "invest_min_balance": 0,
      "loan_rate_range": ""
    }
  }
}
```

---

### Agent E: 管理层 — 追加查询 (2条)

```
追加查询:
E-FT-1: "{COMPANY} CEO fintech background technology experience"
E-FT-2: "{COMPANY} chief risk officer CRO credit officer background"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| E-FT-1 | CEO的科技/金融双重背景(如Noto的Twitter+高盛经历) | Fintech CEO需要双重能力，通用查询获取的简历不够细 |
| E-FT-2 | CRO/首席信贷官背景(贷款质量的关键人物) | 传统银行分析不重点追踪CRO，但Fintech信贷质量高度依赖此人 |

---

### Agent F: Smart Money 13F — 追加查询 (3条)

```
追加查询:
F-FT-1: "Chamath Palihapitiya {TICKER} SoFi SPAC position {YEAR}"
F-FT-2: "{TICKER} fintech ETF ARKF FINX holding {YEAR}"
F-FT-3: "SoftBank Silver Lake {TICKER} fintech investment"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| F-FT-1 | SPAC发起人/早期投资者持仓变化(SoFi是SPAC上市) | SPAC发起人减持是Fintech特有信号 |
| F-FT-2 | Fintech主题ETF持仓变化(ARKF/FINX/IPAY) | 主题ETF被动资金流对Fintech股价有放大效应 |
| F-FT-3 | 大型VC/PE持仓(SoftBank, Silver Lake等) | Fintech公司有大量VC/PE股东，锁定期解禁是特有风险 |

---

### Agent G: 期权与做空数据 — 追加查询 (2条)

```
追加查询:
G-FT-1: "{TICKER} SPAC lockup expiry insider selling schedule {YEAR}"
G-FT-2: "{TICKER} fintech meme stock short squeeze reddit wallstreetbets"
```

**追加查询意图说明**:
| 查询ID | 获取目标 | 为什么通用查询不够 |
|--------|---------|-------------------|
| G-FT-1 | SPAC/VC锁定期解禁日程(集中抛售风险) | SPAC上市的Fintech有多轮锁定期，是短期股价的最大风险 |
| G-FT-2 | Meme stock散户动向(SoFi在Reddit上有大量讨论) | Fintech股票散户参与度极高，影响短期波动和做空squeeze |

---

## 第二部分: Fintech专属数据文件 (3个新文件)

---

### 文件1: `fintech_user_metrics.json`

**用途**: 捕获Fintech独有的用户经济学数据，这些指标在传统银行分析中不存在。

**WebSearch查询 (8条)**:

```
FUM-1: "{COMPANY} total members quarterly {YEAR}"
FUM-2: "{COMPANY} funded accounts growth trend"
FUM-3: "{COMPANY} products per member cross-sell rate"
FUM-4: "{COMPANY} DAU MAU engagement metrics app"
FUM-5: "{COMPANY} customer acquisition cost CAC {YEAR}"
FUM-6: "{COMPANY} member lifetime value LTV cohort analysis"
FUM-7: "{COMPANY} SoFi Money SoFi Invest SoFi Relay adoption rate"
FUM-8: "{COMPANY} user demographics income age distribution"
```

**查询意图说明**:
| 查询ID | 获取目标 | 数据来源优先级 |
|--------|---------|---------------|
| FUM-1 | 会员总数及季度增长趋势 | 财报 > 投资者材料 > 新闻 |
| FUM-2 | Funded accounts(有资金账户)增长，区别于注册会员 | 财报 > 投资者演示 |
| FUM-3 | 每会员持有产品数及交叉销售率 | 财报 > 管理层评论 > 分析师估算 |
| FUM-4 | 日活/月活比(engagement proxy) | 第三方(Sensor Tower/data.ai) > 财报 |
| FUM-5 | 客户获取成本(分渠道: organic vs paid vs referral) | 分析师估算 > 管理层指引 |
| FUM-6 | 会员生命周期价值(按cohort年份分) | 管理层投资者日 > 分析师模型 |
| FUM-7 | 各产品线采用率(Money/Invest/Relay/Credit Card) | 财报分部数据 > 新闻 |
| FUM-8 | 用户画像(收入中位数/年龄/信用评分) | 公司披露 > 市场研究 |

**输出JSON Schema**:
```json
{
  "ticker": "SOFI",
  "fetched_at": "2026-02-08T00:00:00Z",
  "data_freshness": "Q4 2025",
  "member_metrics": {
    "total_members": {
      "value": 0,
      "as_of": "",
      "source": "",
      "yoy_growth_pct": 0,
      "qoq_growth_pct": 0
    },
    "total_funded_accounts": {
      "value": 0,
      "as_of": "",
      "source": "",
      "yoy_growth_pct": 0
    },
    "products_per_member": {
      "value": 0.0,
      "trend": "increasing|stable|decreasing",
      "historical": [
        { "quarter": "Q4 2024", "value": 0.0 },
        { "quarter": "Q1 2025", "value": 0.0 },
        { "quarter": "Q2 2025", "value": 0.0 },
        { "quarter": "Q3 2025", "value": 0.0 },
        { "quarter": "Q4 2025", "value": 0.0 }
      ]
    },
    "member_growth_history": [
      { "quarter": "", "total_members": 0, "net_adds": 0 }
    ]
  },
  "engagement_metrics": {
    "dau_mau_ratio": {
      "value": 0.0,
      "source": "",
      "confidence": "A|B|C|D",
      "benchmark_neobank_avg": 0.0
    },
    "sessions_per_month": {
      "value": 0,
      "source": ""
    },
    "app_store_rating": {
      "ios": 0.0,
      "android": 0.0,
      "review_count": 0
    }
  },
  "unit_economics": {
    "customer_acquisition_cost": {
      "blended_cac": 0,
      "organic_pct": 0,
      "paid_cac": 0,
      "referral_cac": 0,
      "source": "",
      "confidence": "A|B|C|D"
    },
    "lifetime_value": {
      "estimated_ltv": 0,
      "ltv_cac_ratio": 0.0,
      "payback_period_months": 0,
      "source": "",
      "confidence": "A|B|C|D"
    },
    "arpu": {
      "annual_revenue_per_member": 0,
      "trend": "",
      "source": ""
    }
  },
  "product_adoption": {
    "lending": {
      "funded_accounts": 0,
      "pct_of_members": 0,
      "products": ["Personal Loans", "Student Loans", "Home Loans"]
    },
    "financial_services": {
      "funded_accounts": 0,
      "pct_of_members": 0,
      "products": ["SoFi Money", "SoFi Invest", "SoFi Credit Card", "SoFi Relay"]
    },
    "technology_platform": {
      "total_enabled_accounts": 0,
      "client_count": 0,
      "products": ["Galileo", "Technisys"]
    }
  },
  "user_demographics": {
    "median_income": 0,
    "median_age": 0,
    "median_fico_score": 0,
    "geographic_concentration": "",
    "source": "",
    "confidence": "A|B|C|D"
  },
  "data_gaps": [],
  "sources": []
}
```

**过期规则**:
| 状态 | 时间范围 | 处理方式 |
|------|---------|---------|
| 新鲜 | < 7天 | 使用缓存 |
| 警告 | 7-30天 | 标注"[缓存: 用户指标已过期{N}天，建议刷新]" |
| 强制刷新 | > 30天 | 自动刷新 |
| 特殊触发 | 财报发布后24小时内 | 强制全量刷新 |

**过期原因**: 会员指标按季度更新(财报发布)，季中变化不大，但财报后数据变化剧烈。

---

### 文件2: `fintech_credit_quality.json`

**用途**: 捕获Fintech独有的信贷质量和宏观信贷环境数据。传统银行分析中有类似维度但Fintech的信贷组合完全不同(消费贷为主、无商业贷、另类数据风控)。

**WebSearch查询 (8条)**:

```
FCQ-1: "{COMPANY} loan default rate delinquency rate quarterly"
FCQ-2: "{COMPANY} provision for credit losses allowance ratio"
FCQ-3: "{COMPANY} FICO score distribution borrower quality"
FCQ-4: "{COMPANY} personal loan student loan charge-off rate {YEAR}"
FCQ-5: "US consumer credit delinquency rate {YEAR} Federal Reserve"
FCQ-6: "US unemployment rate claims {MONTH} {YEAR} labor market"
FCQ-7: "{COMPANY} credit risk model AI machine learning underwriting"
FCQ-8: "{COMPANY} loan origination volume mix personal student home {YEAR}"
```

**查询意图说明**:
| 查询ID | 获取目标 | 数据来源优先级 |
|--------|---------|---------------|
| FCQ-1 | 贷款违约率/拖欠率(30天/60天/90天+) | 财报 > SEC 10-Q > 分析师报告 |
| FCQ-2 | 信贷损失拨备率(拨备/贷款总额) | 财报 > SEC 10-K |
| FCQ-3 | 借款人信用评分分布(FICO分布) | 投资者材料 > 管理层评论 |
| FCQ-4 | 核销率(按贷款类型: 个人贷/学生贷/房贷) | 财报 > ABS信托报告 |
| FCQ-5 | 美国消费信贷违约率(宏观领先指标) | 美联储数据 > FRED |
| FCQ-6 | 失业率与就业数据(信贷质量领先指标) | BLS > FRED > 新闻 |
| FCQ-7 | AI/ML风控模型效果(Fintech vs传统银行的风控差异) | 公司披露 > 分析师评估 |
| FCQ-8 | 贷款发放量与产品组合(个人贷/学生贷/房贷占比变化) | 财报 > 投资者材料 |

**输出JSON Schema**:
```json
{
  "ticker": "SOFI",
  "fetched_at": "2026-02-08T00:00:00Z",
  "data_freshness": "Q4 2025",
  "portfolio_overview": {
    "total_loan_balance": {
      "value_B": 0,
      "source": "",
      "yoy_growth_pct": 0
    },
    "loan_mix": [
      { "type": "Personal Loans", "balance_B": 0, "pct_of_total": 0, "avg_rate_pct": 0 },
      { "type": "Student Loans", "balance_B": 0, "pct_of_total": 0, "avg_rate_pct": 0 },
      { "type": "Home Loans", "balance_B": 0, "pct_of_total": 0, "avg_rate_pct": 0 }
    ],
    "origination_volume": {
      "quarterly_B": 0,
      "yoy_growth_pct": 0,
      "trend": ""
    }
  },
  "delinquency_metrics": {
    "30_day_delinquency_pct": {
      "value": 0,
      "trend": "",
      "vs_industry_avg": 0,
      "source": ""
    },
    "60_day_delinquency_pct": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "90_plus_delinquency_pct": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "net_charge_off_rate_pct": {
      "personal_loans": 0,
      "student_loans": 0,
      "home_loans": 0,
      "blended": 0,
      "source": ""
    },
    "historical_delinquency": [
      { "quarter": "", "30d_pct": 0, "90d_pct": 0, "nco_pct": 0 }
    ]
  },
  "provision_and_reserves": {
    "provision_for_credit_losses_M": 0,
    "allowance_for_credit_losses_M": 0,
    "allowance_to_loans_pct": 0,
    "coverage_ratio": 0,
    "trend": "",
    "source": ""
  },
  "borrower_quality": {
    "weighted_avg_fico": {
      "value": 0,
      "source": "",
      "trend": ""
    },
    "fico_distribution": {
      "super_prime_760_plus_pct": 0,
      "prime_700_759_pct": 0,
      "near_prime_660_699_pct": 0,
      "subprime_below_660_pct": 0,
      "source": "",
      "confidence": "A|B|C|D"
    },
    "weighted_avg_dti": {
      "value": 0,
      "source": ""
    }
  },
  "macro_credit_environment": {
    "us_consumer_credit_delinquency_pct": {
      "value": 0,
      "trend": "",
      "source": "Federal Reserve"
    },
    "us_credit_card_delinquency_pct": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "us_unemployment_rate_pct": {
      "value": 0,
      "trend": "",
      "source": "BLS"
    },
    "initial_jobless_claims": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "consumer_confidence_index": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "fed_funds_rate_pct": {
      "value": 0,
      "expected_direction": "cut|hold|hike",
      "source": ""
    },
    "macro_risk_assessment": "low|moderate|elevated|high",
    "macro_risk_rationale": ""
  },
  "credit_model_quality": {
    "ai_ml_underwriting": {
      "description": "",
      "claimed_advantage_vs_fico": "",
      "approval_rate_pct": 0,
      "source": ""
    },
    "vintage_performance": {
      "description": "",
      "best_vintage": "",
      "worst_vintage": "",
      "source": ""
    }
  },
  "stress_test_scenarios": {
    "mild_recession": {
      "unemployment_assumption_pct": 0,
      "estimated_nco_increase_bps": 0,
      "estimated_provision_increase_pct": 0
    },
    "severe_recession": {
      "unemployment_assumption_pct": 0,
      "estimated_nco_increase_bps": 0,
      "estimated_provision_increase_pct": 0
    },
    "source": "analyst_estimate|company_disclosure|model_output",
    "confidence": "C|D|E"
  },
  "data_gaps": [],
  "sources": []
}
```

**过期规则**:
| 状态 | 时间范围 | 处理方式 |
|------|---------|---------|
| 新鲜 | < 3天 | 使用缓存 |
| 警告 | 3-14天 | 标注"[缓存: 信贷质量数据已过期{N}天，建议刷新]" |
| 强制刷新 | > 14天 | 自动刷新 |
| 特殊触发1 | 失业率数据发布日(每月第一个周五) | 强制刷新宏观部分 |
| 特殊触发2 | 财报发布后12小时内 | 强制全量刷新 |
| 特殊触发3 | 消费信贷违约率突变(月环比>50bps) | 强制全量刷新 |

**过期原因**: 信贷质量对宏观敏感度极高。失业率、消费信贷违约率是领先指标，月度更新。Fintech贷款组合以消费贷为主，对经济周期反应速度远快于传统银行的商业贷组合。

---

### 文件3: `fintech_bank_charter.json`

**用途**: 量化银行牌照的护城河价值。SoFi于2022年获得国家银行牌照(SoFi Bank, National Association)，这是Fintech公司的关键转折点，使其能够直接吸收存款并降低资金成本。

**WebSearch查询 (7条)**:

```
FBC-1: "{COMPANY} bank charter deposit growth quarterly"
FBC-2: "{COMPANY} cost of deposits cost of funds trend"
FBC-3: "{COMPANY} bank charter regulatory compliance OCC"
FBC-4: "{COMPANY} deposit APY rate savings checking {YEAR}"
FBC-5: "fintech bank charter list OCC ILC {YEAR}"
FBC-6: "{COMPANY} warehouse lending securitization funding mix"
FBC-7: "{COMPANY} bank charter impact profitability net interest income"
```

**查询意图说明**:
| 查询ID | 获取目标 | 数据来源优先级 |
|--------|---------|---------------|
| FBC-1 | 存款增长趋势(银行牌照最直接的收益) | 财报 > FDIC Call Report > 新闻 |
| FBC-2 | 资金成本变化(牌照前vs牌照后) | 财报 > 管理层评论 > 分析师估算 |
| FBC-3 | OCC监管合规状态(CRA评级、执法行动等) | FDIC/OCC数据库 > 新闻 |
| FBC-4 | 存款利率竞争力(APY对比传统银行和Neobank) | 公司网站 > Bankrate > NerdWallet |
| FBC-5 | Fintech获得银行牌照的全景(SoFi vs Varo vs LendingClub等) | OCC > 新闻 > 行业报告 |
| FBC-6 | 资金来源组合(存款 vs warehouse lending vs 证券化) | 财报 > 10-K > 分析师模型 |
| FBC-7 | 牌照对盈利能力的量化影响(NII增长归因) | 分析师报告 > 管理层指引 |

**输出JSON Schema**:
```json
{
  "ticker": "SOFI",
  "fetched_at": "2026-02-08T00:00:00Z",
  "data_freshness": "Q4 2025",
  "charter_overview": {
    "charter_type": "National Bank Charter",
    "charter_entity": "SoFi Bank, National Association",
    "charter_date": "2022-01-18",
    "primary_regulator": "OCC",
    "fdic_insured": true,
    "cra_rating": "",
    "regulatory_status": "good_standing|under_review|enforcement_action",
    "source": ""
  },
  "deposit_metrics": {
    "total_deposits": {
      "value_B": 0,
      "as_of": "",
      "source": "",
      "yoy_growth_pct": 0,
      "qoq_growth_pct": 0
    },
    "deposit_composition": {
      "direct_deposit_members": 0,
      "direct_deposit_pct_of_members": 0,
      "checking_balance_B": 0,
      "savings_balance_B": 0,
      "source": ""
    },
    "deposit_growth_history": [
      { "quarter": "", "total_deposits_B": 0, "net_new_B": 0 }
    ],
    "deposit_quality": {
      "avg_balance_per_account": 0,
      "stickiness_metric": "",
      "direct_deposit_avg_paycheck": 0,
      "source": "",
      "confidence": "A|B|C|D"
    }
  },
  "funding_cost_analysis": {
    "cost_of_deposits_pct": {
      "value": 0,
      "trend": "",
      "vs_big_4_banks_avg": 0,
      "vs_online_banks_avg": 0,
      "source": ""
    },
    "blended_cost_of_funds_pct": {
      "value": 0,
      "trend": "",
      "source": ""
    },
    "funding_mix": {
      "deposits_pct": 0,
      "warehouse_lending_pct": 0,
      "securitization_pct": 0,
      "other_borrowings_pct": 0,
      "source": ""
    },
    "pre_charter_vs_post_charter": {
      "pre_charter_cost_of_funds_pct": 0,
      "post_charter_cost_of_funds_pct": 0,
      "annual_savings_M": 0,
      "source": "",
      "confidence": "B|C|D"
    }
  },
  "competitive_deposit_rates": {
    "ticker_savings_apy_pct": 0,
    "ticker_checking_apy_pct": 0,
    "benchmark_comparison": [
      { "bank": "JPMorgan Chase", "savings_apy_pct": 0 },
      { "bank": "Goldman Sachs Marcus", "savings_apy_pct": 0 },
      { "bank": "Ally Bank", "savings_apy_pct": 0 },
      { "bank": "Capital One 360", "savings_apy_pct": 0 },
      { "bank": "Apple Savings (Goldman)", "savings_apy_pct": 0 }
    ],
    "as_of": "",
    "source": ""
  },
  "charter_moat_valuation": {
    "charter_competitive_advantage": {
      "description": "",
      "quantified_annual_benefit_M": 0,
      "source": "",
      "confidence": "C|D"
    },
    "barriers_for_competitors": {
      "fintech_without_charter": ["Chime", "Cash App", "Robinhood"],
      "fintech_with_charter": ["SoFi", "LendingClub", "Varo"],
      "charter_application_timeline_months": 0,
      "regulatory_hurdle_description": ""
    },
    "charter_risk_factors": [
      {
        "risk": "",
        "probability": "",
        "impact": "",
        "mitigation": ""
      }
    ]
  },
  "net_interest_income_impact": {
    "net_interest_income_M": {
      "value": 0,
      "yoy_growth_pct": 0,
      "source": ""
    },
    "net_interest_margin_pct": {
      "value": 0,
      "trend": "",
      "vs_traditional_banks_avg": 0,
      "source": ""
    },
    "interest_rate_sensitivity": {
      "rate_cut_100bps_impact_on_nim": "",
      "rate_hike_100bps_impact_on_nim": "",
      "asset_duration_years": 0,
      "liability_duration_years": 0,
      "source": "",
      "confidence": "C|D"
    }
  },
  "data_gaps": [],
  "sources": []
}
```

**过期规则**:
| 状态 | 时间范围 | 处理方式 |
|------|---------|---------|
| 新鲜 | < 14天 | 使用缓存 |
| 警告 | 14-60天 | 标注"[缓存: 银行牌照数据已过期{N}天，建议刷新]" |
| 强制刷新 | > 60天 | 自动刷新 |
| 特殊触发1 | 财报发布后24小时内 | 强制刷新存款+资金成本部分 |
| 特殊触发2 | Fed利率决议后12小时内 | 强制刷新资金成本+利率敏感性部分 |
| 特殊触发3 | 监管执法行动新闻 | 强制全量刷新 |

**过期原因**: 银行牌照本身是长期资产(变化极慢)，但存款增长和资金成本随利率环境波动。存款利率竞争在降息周期中变化加速。

---

## 第三部分: 编排器集成规范

### 变量替换表

| 变量 | SoFi示例值 | 说明 |
|------|-----------|------|
| `{TICKER}` | SOFI | 股票代码 |
| `{COMPANY}` | SoFi Technologies | 公司全名 |
| `{INDUSTRY}` | Fintech / Digital Banking | 行业 |
| `{YEAR}` | 2026 | 当前年份 |
| `{YEAR-1}` | 2025 | 上一年 |
| `{MONTH}` | February | 当前月份 |
| `{CURRENT_QUARTER}` | Q1 2026 | 当前季度 |
| `{NEXT_QUARTER}` | Q2 2026 | 下一季度 |
| `{PRIMARY_MARKET}` | digital banking | 主要市场 |

### 同行映射

```yaml
Fintech同行列表:
  lending_focused: [SOFI, LC, UPST, AFRM]
  payment_focused: [SQ, PYPL, AFRM]
  brokerage_focused: [HOOD, SOFI]
  neobank_focused: [SOFI, NU]
  crypto_focused: [COIN, HOOD]
  b2b_infrastructure: [FI, FOUR, MARQ]

SoFi默认同行: [LC, HOOD, SQ, PYPL, NU]
```

### 预取执行顺序

```
Step 2.5 WebSearch Agent执行 (Fintech增强版):

  ┌─────────────────────────────────────────────────────┐
  │  并行Wave 1 (7个通用Agent + Fintech追加查询)        │
  │                                                     │
  │  Agent A: 通用7条 + Fintech追加4条 = 11条WebSearch  │
  │  Agent B: 通用4条 + Fintech追加3条 = 7条WebSearch   │
  │  Agent C: 通用6条 + Fintech追加3条 = 9条WebSearch   │
  │  Agent D: 通用6条 + Fintech追加4条 = 10条WebSearch  │
  │  Agent E: 通用6条 + Fintech追加2条 = 8条WebSearch   │
  │  Agent F: 通用5条 + Fintech追加3条 = 8条WebSearch   │
  │  Agent G: 通用5条 + Fintech追加2条 = 7条WebSearch   │
  └─────────────────────────────────────────────────────┘
                          |
                          v
  ┌─────────────────────────────────────────────────────┐
  │  并行Wave 2 (3个Fintech专属Agent)                   │
  │  等待Wave 1中Agent A和Agent D的member_metrics后启动  │
  │                                                     │
  │  Agent H: fintech_user_metrics.json    (8条)        │
  │  Agent I: fintech_credit_quality.json  (8条)        │
  │  Agent J: fintech_bank_charter.json    (7条)        │
  └─────────────────────────────────────────────────────┘

总WebSearch查询数: 通用39条 + 追加21条 + 专属23条 = 83条
预估执行时间: Wave 1约5-7分钟 + Wave 2约3-5分钟 = 8-12分钟
```

### prefetch_metadata.json 扩展

在现有v3.0 metadata schema中追加以下字段:

```json
{
  "data_files": {
    "...existing 13 files...": {},
    "fintech_user_metrics": {
      "status": "ok|error|stale",
      "source": "WebSearch:Agent-H",
      "fetched_at": "",
      "expires_at": ""
    },
    "fintech_credit_quality": {
      "status": "ok|error|stale",
      "source": "WebSearch:Agent-I",
      "fetched_at": "",
      "expires_at": ""
    },
    "fintech_bank_charter": {
      "status": "ok|error|stale",
      "source": "WebSearch:Agent-J",
      "fetched_at": "",
      "expires_at": ""
    }
  },
  "quality": {
    "files_total": 17
  },
  "industry_extension": "fintech_v1.0"
}
```

### 数据引用格式 (追加)

```
- [用户指标 | WebSearch:Agent-H | {日期}] — 来自Fintech用户指标预取
- [信贷质量 | WebSearch:Agent-I | {日期}] — 来自Fintech信贷质量预取
- [银行牌照 | WebSearch:Agent-J | {日期}] — 来自Fintech银行牌照预取
```

### 缓存目录结构 (Fintech增强)

```
data/research/{TICKER}/
├── ...existing 13 files...
├── fintech_user_metrics.json     # WebSearch:Agent-H: 会员+engagement+单元经济学
├── fintech_credit_quality.json   # WebSearch:Agent-I: 信贷质量+宏观环境+压力测试
├── fintech_bank_charter.json     # WebSearch:Agent-J: 银行牌照+存款+资金成本
└── prefetch_metadata.json        # v3.0 + fintech_v1.0扩展
```

---

## 第四部分: 容错与降级规则

### Fintech专属Agent容错

```yaml
Agent H (fintech_user_metrics):
  必须成功字段: total_members, products_per_member
  可降级字段: dau_mau_ratio, cac, ltv (标注"[无数据]")
  失败阈值: 必须成功字段全部获取失败 → 标注"[用户指标预取失败]"
  回退方案: 从Agent A/D的industry_specific字段中提取部分数据

Agent I (fintech_credit_quality):
  必须成功字段: net_charge_off_rate, us_unemployment_rate
  可降级字段: fico_distribution, stress_test (标注"[无数据]")
  失败阈值: 必须成功字段全部获取失败 → 标注"[信贷质量预取失败]"
  回退方案: 使用FRED宏观数据API补充失业率/消费信贷数据

Agent J (fintech_bank_charter):
  必须成功字段: total_deposits, cost_of_deposits
  可降级字段: charter_moat_valuation, rate_sensitivity (标注"[需手动分析]")
  失败阈值: 必须成功字段全部获取失败 → 标注"[银行牌照预取失败]"
  回退方案: 从FDIC Call Report公开数据获取存款基础数据
```

### 最低成功标准

```
Fintech增强预取成功标准:
  通用文件: ≥5/9成功 (沿用v3.0标准)
  Fintech专属: ≥2/3成功
  总计: ≥7/12 Agent成功即可继续分析
  全部失败: 标注"[Fintech数据预取不完整，将在分析中补充]"
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-02-08 | 初始版本: 7个通用Agent追加查询 + 3个Fintech专属文件 |
