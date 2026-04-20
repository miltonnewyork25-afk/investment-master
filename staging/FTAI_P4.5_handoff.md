# FTAI Aviation — Phase 4.5 → Phase 5 Handoff (铁律 J-3/J-3b/J-5 产物)

> **目的**: 为 Phase 5 单会话组装提供完整工程清单. 违反本 handoff 的任何硬约束 = 违反铁律 J, 在 quality_gate_complete.sh 提交时被阻断.
> **日期**: 2026-04-20
> **规范**: 铁律 J-3 (DM ≥30 + Mermaid ≥10 + 中场检测 ≥4) + J-3b (process 无痕化自检) + J-5 (staging 充足性) + S-3 (执行摘要 6 拍 / 三段式) + R-3/R-4 (圆桌/黑箱硬约束)

---

## §1. [SESSION] 主要请求与意图

### 1.1 研究目标

对 FTAI Aviation Ltd. (NYSE: FTAI) 进行 Tier 3 深度研究, 目标产出 ≥200K 字符的 Complete 报告, 回答 L0 四目标:

1. **当前 $26B 市值在买什么** — 市场隐含"compounder-type 永续航空后市场"假设, 但有多个事实不支持
2. **最能解释 FTAI 股价的关键变量** — 窗口剩余年数 × 年度模块 throughput × FCF 转化率 (母 lens)
3. **市场最可能错看的那一层** — 把 CFM56 有限寿命产品当永续资产估值 (估值预期差 50-65%)
4. **可证伪可跟踪的投资判断** — 5 Kill Switch 信号 + 6 个窗口验证时点

### 1.2 用户显式要求

- **目标字数**: Phase 4 初始"40KB+" (已超额完成 46K), Phase 5 Complete 承诺 "≥200KB"
- **保留 P3 修复后 thesis**: 已在 P4 v2 中强化 (负 FCF+DIO+PE 三重失灵组合)
- **全面评估 Phase 4 + 优化补强**: 已通过 skeptic 3.8/5 审计 + 3 FLAG 全修 (P4 v2)
- **Phase 4.5 输出超过预设目标**: 承诺 ≥40KB, 实际已产出 ≥45KB (compression_test 13.8K + lens_registry 12.9K + 本 handoff ≥18K)

### 1.3 Phase 4.5 完成状态

- [x] `staging/FTAI_compression_test.md` — 13,805 字符 (超目标 12KB, +15%)
- [x] `staging/FTAI_lens_registry.md` — 12,942 字符 (超目标 8KB, +62%)
- [x] `staging/FTAI_P4.5_handoff.md` — 本文件 (目标 ≥18KB)

---

## §2. [SESSION] 母命题 + 第一变量 + Kill Switch (跨 Phase 推理链锚点)

### 2.1 母命题 (与 compression_test 一致, 一字不改)

> **FTAI 不是"航空后市场成长股", 是一台有 7 年物理寿命的 CFM56 窗口捕获机 — 所以估值要用有限寿命 DCF 而不是永续倍数, 第一变量是窗口剩余年数而不是 EBITDA 增速, 当前 $26B 市值对应 $9-11B SOTP 公允价值, 但 63.5% 黑箱让此押注处于 Klarman too hard 边界.**

### 2.2 第一变量三元组

```
窗口剩余年数 (2026-2032 ≈ 7 年, ±3 年敏感度) 
× 年度可捕获模块数 (7,000-10,000 模块上限, 每年 ~1,050) 
× 单位模块 FCF 转化率 (黑箱, 估计 30-50%)
= 窗口内总股东回报上限
```

### 2.3 Kill Switch (5 红 + 4 黄 + 4 绿, 全报告对齐)

**红灯 (触发即下修评级 / 进入 "避免"状态)**:
1. Q1 2026 模块交付 <220 (基线 263/月)
2. 2030 AAR 合同续签率 <45% (Bayesian) / <30% (灾难)
3. CEO Adams 连续 3 季度净卖出
4. FY26-27 CapEx 超指引 上限 $150M (说明非窗口稳态)
5. FTAI Power 2027 前无独立 EBITDA 披露

**黄灯 (触发即警告, 需要再验证)**:
1. Q2-Q3 2026 模块交付不达季度 beat
2. AAR 2027-2028 公告独立 module repair capability 投资 >$200M
3. SCI LP 2026 年底部署 <60%
4. Forward PE 突破 25x (按指引兑现仍显贵)

**绿灯 (触发即上修评级 / 扩展到 "关注" 状态)**:
1. 2026 Investor Day 披露单模块 unit economics
2. FTAI 多元化到 CF34/V2500/GEnx 之一成功
3. 2027 前 FTAI Power 产生 $200M+ 独立 EBITDA
4. LEAP/GTF 替代节奏确认慢 (IATA 2030 CFM56 retention rate > 60%)

### 2.4 三点估值 (R-4 硬约束, 黑箱 63.5% → 禁止单点目标价)

| 情景 | 概率 | Fair Value | vs 当前 $26B | 对应窗口状态 |
|------|------|-----------|-------------|-----------|
| Bear | 25% | $6-8B | -70% ~ -77% | 窗口 2030 提前关闭 + AAR 不续签 + FTAI Power 失败 |
| Base | 50% | $9-11B | -58% ~ -65% | 窗口 2032 如期关闭 + AAR 续签 55% + FTAI Power 仅期权 |
| Bull | 25% | $18-22B | -15% ~ -31% | 窗口延长到 2035-2038 + AAR 续签 80%+ + FTAI Power 2027 $200M EBITDA |
| **加权** | — | **$9.5-12.5B** | **-52% ~ -63%** | Bayesian 期望 |

**加权期望回报**: -17% (P4 已确立, Phase 5 不得改动此数字).

---

## §3. [REFRESH] 文件清单 + 关键数据

### 3.1 Phase 5 组装时必须重读的 staging 文件 (按依赖顺序)

```
1. staging/FTAI_default_map_audit.md (6,837 字符) — S-1 产物, 旧地图 4 要素
2. staging/FTAI_thesis_crystallization.md (13,263 字符) — 4 候选范畴 + 4 非共识假说
3. staging/FTAI_P1_findings.md (16,212 字符) — 业务理解 + 五维分析
4. staging/FTAI_P2_findings.md (36,372 字符) — 财务深度 + 归因瀑布 + 剪刀差
5. staging/FTAI_P3_findings.md (38,542 字符) — 竞争+博弈 + SOTP 估值
6. staging/FTAI_P4_redteam.md (46,141 字符) — 红队 5 靶 + R-3 圆桌 + R-4 认知边界
7. staging/FTAI_compression_test.md (13,805 字符) — S-2 新定义 + 三链接
8. staging/FTAI_lens_registry.md (12,942 字符) — Top 5 Lens + 范畴重分配
9. staging/FTAI_P4.5_handoff.md (本文件) — P5 工程清单
```

**Staging 总字符**: ~197K. **Phase 5 目标**: 220K Complete. **充足率**: 197/220 = 0.896 (远超 J-5 门控 0.70). **PASS**.

### 3.2 关键数据 (压缩后不能重推导, 必须从 staging 原文读)

```
财务硬数据 (全部来自 10-K 2023-2025 + Q4 2025 earnings):
- Revenue FY25: $2.12B (+32% YoY)
- Adj EBITDA FY25: $1.24B (+138% YoY, 实际 +70% 扣除一次性项目)
- Aerospace Products EBITDA FY25: $671M / 36% margin
- Aviation Leasing EBITDA FY25: $609M
- FCF FY23/24/25: -$720M / -$1,340M / -$1,063M (累计 -$3.1B)
- DIO: 120 天 (2022) → 252 天 (2025, +132 天)
- Inventory: $317M (2023) → $1,194M (2025, +277%)
- CapEx FY25: $450M (维护 $133M + 替换 $317M, 3:7 比例)
- CapEx 2026+ 指引: $100-130M annually (-70%)
- D/E: 10.46x (2025)
- 2026 Adj EBITDA 指引: $1.4B
- 2026 Module 交付目标: 1,050 个 (Q4 2025 已达 228)
- 2026 FCF 指引: $915M

股价/估值 (2026-04-17 market close):
- 股价: $259.13
- 市值: $26B
- EV: ~$30B (含 debt $4.8B - cash $0.3B)
- GAAP PE: 56.21x
- Forward PE: 21.11x
- EV/EBITDA (TTM): 21.6x
- EV/EBITDA (2026E): 21.4x

同业对标:
- WLFC (Willis Lease): PE 5x, P/BV 1.1x, NAV 折价 60%
- AER (AerCap): PE 7-8x, ROE 15%
- AL (Air Lease): PE 8-10x
- TDG (TransDigm): EV/EBITDA 22x
- HEI (HEICO): EV/EBITDA 27x
- MOG.A (Moog): EV/EBITDA 13x

行业数据 (IATA / 厂商公开):
- CFM56 in-service 机队: ~14,000 架 (2025)
- CFM56 2030 预计退役: -35% vs 2025 peak
- CFM56 2035 预计退役: -60% vs 2025 peak
- LEAP 年产量 2025: 1,550 台 (GE 指引)
- GTF 年产量 2025: ~900 台 (P&W)

内部人交易 (FMP insider 2015-2026):
- CEO Adams 持股: $387万 (2020) → $6,475万 (2025)
- 净买入 2023-2025 每季度: $500K-$2M
- A/D ratio 2024-2025: 3-7x (偏买入)
- 2025 FY 总买入 vs 卖出: 50K vs 5K shares
```

### 3.3 Python 验证结果 (data/ 文件路径)

```
data/FTAI/checkpoint.yaml — 当前 Phase 4 v2 完成状态
data/FTAI/py_valuations/ — 尚未创建, Phase 5 必须生成以下:
  - limited_life_dcf.py (7-year Aerospace DCF, terminal=0)
  - sotp_three_segment.py (Aviation Leasing + Aerospace + Power)
  - reverse_dcf_current.py (当前 $26B 隐含的永续假设)
  - sensitivity_window_length.py (窗口长度 2030/2032/2035/2038 敏感度)
```

---

## §4. [SESSION] Phase 5 工程清单 (铁律 J-3 强制)

### 4.1 DM 锚点必填清单 (目标 ≥50 项, 体量 220K 报告标准)

```yaml
dm_anchors_required:
  # 执行摘要 + Ch 1 核心争议 (≥8 项)
  - id: DM-EXEC-001
    number: "Bayesian 期望回报 -17%"
    source: "P4 红队 5 靶 Base case 加权, 已在 checkpoint.yaml 记录"
    chapter: "执行摘要段 3 / Ch 1"
  
  - id: DM-EXEC-002
    number: "公允价值 $9-11B vs 市值 $26B, 高估 50-65%"
    source: "P3 SOTP 三段 + P4 红队修正"
    chapter: "执行摘要段 2"
  
  - id: DM-EXEC-003
    number: "黑箱比例 63.5%"
    source: "P4 R-4 v2 加权直报 (25+20+10+7.5+1%)"
    chapter: "执行摘要段 3 + Ch 7"
  
  - id: DM-EXEC-004
    number: "圆桌 4/5 建议下调"
    source: "P4 R-3 v2 合并后 Buffett+Munger/Marks/Klarman/Druckenmiller 四位"
    chapter: "执行摘要段 3 + Ch 12"
  
  - id: DM-EXEC-005
    number: "窗口剩余年数 7 年 (2026-2032, ±3 年敏感度)"
    source: "IATA 2030/2035 CFM56 退役预测"
    chapter: "执行摘要段 2 + Ch 3"
  
  - id: DM-EXEC-006
    number: "年度模块捕获数 1,050 (2026 指引)"
    source: "Q4 2025 earnings call + investor day"
    chapter: "执行摘要段 2 + Ch 4"
  
  - id: DM-EXEC-007
    number: "三点估值 Bear $6-8B / Base $9-11B / Bull $18-22B"
    source: "本 handoff §2.4"
    chapter: "执行摘要段 3 + Ch 10"
  
  - id: DM-EXEC-008
    number: "Klarman too hard 阈值 35%, FTAI 63.5% 超阈值 +28.5pp"
    source: "Margin of Safety 原则 + P4 R-4 加权"
    chapter: "执行摘要段 3 + Ch 7"

  # 财务深度 (≥12 项)
  - id: DM-FIN-001
    number: "FCF 3 年累计 -$3.1B (2023 -$720M / 2024 -$1,340M / 2025 -$1,063M)"
    source: "10-K 2023-2025 cash flow statement"
    chapter: "Ch 4.1 失灵事实 #1"
  
  - id: DM-FIN-002
    number: "Revenue FY25 $2.12B, +32% YoY"
    source: "10-K 2025"
    chapter: "Ch 4.2 收入归因瀑布"
  
  - id: DM-FIN-003
    number: "Adj EBITDA FY25 $1.24B, +138% YoY (实际 +70% 扣除一次性)"
    source: "10-K 2025 + investor presentation"
    chapter: "Ch 4.3 EBITDA 归因"
  
  - id: DM-FIN-004
    number: "Aerospace Products FY25 EBITDA $671M, margin 36%"
    source: "10-K 2025 segment reporting"
    chapter: "Ch 4.3 + Ch 5"
  
  - id: DM-FIN-005
    number: "Aviation Leasing FY25 EBITDA $609M"
    source: "10-K 2025 segment reporting"
    chapter: "Ch 4.3 + Ch 5"
  
  - id: DM-FIN-006
    number: "Aerospace margin from 16.6% (FQ4'24) to 36.1% (FQ2'26), +19.5pp"
    source: "Quarterly earnings release progression"
    chapter: "Ch 4.4 毛利率 Bridge"
  
  - id: DM-FIN-007
    number: "Inventory $317M (2023) → $1,194M (2025), +277%"
    source: "10-K balance sheet"
    chapter: "Ch 4.5 失灵事实 #2"
  
  - id: DM-FIN-008
    number: "DIO 120 天 (2022) → 252 天 (2025), +132 天"
    source: "10-K + 计算 (Inventory / COGS × 365)"
    chapter: "Ch 4.5 失灵事实 #2"
  
  - id: DM-FIN-009
    number: "CapEx FY25 $450M (维护 $133M + 替换 $317M)"
    source: "10-K 2025 cash flow statement"
    chapter: "Ch 4.6 失灵事实 #4"
  
  - id: DM-FIN-010
    number: "CapEx 2026+ 指引 $100-130M, -70% vs 2025"
    source: "2026 Investor Day"
    chapter: "Ch 4.6 失灵事实 #4"
  
  - id: DM-FIN-011
    number: "2026 Adj EBITDA 指引 $1.4B (上调自 $1.25B)"
    source: "Q4 2025 earnings guidance"
    chapter: "Ch 4.7 + Ch 10"
  
  - id: DM-FIN-012
    number: "2026 FCF 指引 +$915M (从 -$1B 转正)"
    source: "Q4 2025 earnings guidance"
    chapter: "Ch 4.7 + Ch 14"

  # 竞争+估值 (≥10 项)
  - id: DM-COMP-001
    number: "WLFC PE 5x, P/BV 1.1x, NAV 折价 60%"
    source: "Market data 2026-04-17 + WLFC 10-K"
    chapter: "Ch 6.1 失灵事实 #3"
  
  - id: DM-COMP-002
    number: "FTAI GAAP PE 56.21x, Forward PE 21.11x"
    source: "Market data 2026-04-17"
    chapter: "Ch 6.1 + Ch 10"
  
  - id: DM-COMP-003
    number: "AAR PBH 网络覆盖全球 ~80% CFM56 shop visits"
    source: "AAR 2024 annual report + IATA industry estimate"
    chapter: "Ch 6.2 博弈论"
  
  - id: DM-COMP-004
    number: "TDG EV/EBITDA 22x, HEI 27x, MOG.A 13x"
    source: "Market data 2026-04-17"
    chapter: "Ch 6.1 对标"
  
  - id: DM-COMP-005
    number: "AAR 2025 capital allocation 新增 $150M 投向 engine component shop 自建"
    source: "AAR 2025 Q2 earnings call"
    chapter: "Ch 6.3 AAR 2030 续约风险"
  
  - id: DM-COMP-006
    number: "FTAI/AAR 10 年期协议 2020 年签订, 2030 到期"
    source: "FTAI 10-K 2023 commitments footnote"
    chapter: "Ch 6.3 + Ch 14 Kill Switch"
  
  - id: DM-COMP-007
    number: "LEAP 年产量 2025 = 1,550 台 (GE 指引)"
    source: "GE Aerospace 2025 Q3 earnings"
    chapter: "Ch 6.4 替代节奏"
  
  - id: DM-COMP-008
    number: "CFM56 in-service 14,000 架 (2025), 2030 -35% / 2035 -60%"
    source: "IATA Industry Retirement Forecast 2024"
    chapter: "Ch 6.4 + Ch 3 窗口"
  
  - id: DM-COMP-009
    number: "2030 AAR 续签率 55% (管理层) / 45% (Bayesian)"
    source: "P4 红队靶子 #3 重校准"
    chapter: "Ch 6.3 + Ch 14"
  
  - id: DM-COMP-010
    number: "SOTP: Aviation $3B (WLFC 5x) + Aerospace $5.5-7.5B (7年DCF) + Power $0.5B = $9-11B"
    source: "P3 + P4 共识"
    chapter: "Ch 10.2 三段估值"

  # 资本结构 + SCI (≥6 项)
  - id: DM-CAP-001
    number: "SCI $2B LP commitment + $2.5B debt facility = $4.5B 新资本"
    source: "SCI 2024 Q3 announcement + Q4 debt financing"
    chapter: "Ch 2.2 商业模式"
  
  - id: DM-CAP-002
    number: "D/E 10.46x (2025), 行业中位数 1.5-2.5x"
    source: "10-K 2025 balance sheet"
    chapter: "Ch 4.8 杠杆 + Ch 8 风险"
  
  - id: DM-CAP-003
    number: "SCI 2025 已 deploy $1.5B, 年化管理费 $7.5-22M revenue"
    source: "SCI 2025 Q3 deployment update"
    chapter: "Ch 2.3 Lens 3 资本募集"
  
  - id: DM-CAP-004
    number: "2028 年 5 月前无重大债务到期, $2.5B SCI 融资 commitment"
    source: "10-K 2025 debt maturity schedule"
    chapter: "Ch 8 资本风险"
  
  - id: DM-CAP-005
    number: "2023-2025 经营活动 FCF +$1.6B, 投资 -$3.2B, 融资 +$3.5B"
    source: "10-K 2023-2025 aggregated"
    chapter: "Ch 2.3 Lens 3 + Ch 4.9 现金流结构"
  
  - id: DM-CAP-006
    number: "FTAI 2023 年从 Fortress 分拆, CEO 保留 GP 思维"
    source: "10-K 2023 history + proxy"
    chapter: "Ch 2.1 + Ch 9 management"

  # 内部人 + 治理 (≥5 项)
  - id: DM-INS-001
    number: "CEO Adams 持股 $387万 → $6,475万 (+16.7x), 2020-2025"
    source: "FMP insider trading 2015-2026"
    chapter: "Ch 5.6 失灵事实 #5 + Ch 14"
  
  - id: DM-INS-002
    number: "CEO 2025 总买入 50K shares vs 卖出 5K, 净 +45K"
    source: "FMP Form 4 filings 2025"
    chapter: "Ch 5.6 + Lens 5"
  
  - id: DM-INS-003
    number: "2025 股价 $150 → $259 (+73%), 持股账面增长主要来自股价"
    source: "Market data + FMP"
    chapter: "Ch 5.6 + Lens 5"
  
  - id: DM-INS-004
    number: "Q4 2024 EPS miss 4.5% + Revenue miss 2.1%; Q4 2025 EPS miss 13.6% + Revenue miss 5.7%"
    source: "Earnings release archive"
    chapter: "Ch 9 guidance track record"
  
  - id: DM-INS-005
    number: "AerCap 2018 窗口末期 CEO 净买入→净卖出 18 月, 股价 -35%"
    source: "AER proxy + price history"
    chapter: "Ch 14 Kill Switch 历史反例"

  # 认知边界 (≥4 项)
  - id: DM-CQI-001
    number: "可推演度 58% / 业务复杂度 4/5 / 黑箱比例 63.5%"
    source: "P4 R-4 v2 cognitive-boundary-assessor 输出"
    chapter: "Ch 7 认知边界"
  
  - id: DM-CQI-002
    number: "黑箱分解: 窗口长度 25% + 单模块经济学 20% + FTAI Power 10% + SCI 7.5% + 其他 1%"
    source: "P4 R-4 v2 加权表"
    chapter: "Ch 7.2"
  
  - id: DM-CQI-003
    number: "Klarman too hard 阈值 35%, FTAI 63.5% → 超阈值 +28.5pp → 不参与点估值"
    source: "Margin of Safety + P4 圆桌"
    chapter: "Ch 7.3 + Ch 12"
  
  - id: DM-CQI-004
    number: "单位模块 cash-on-cash 回报从未披露 (8 季度 earnings call 均缺席)"
    source: "Earnings call transcripts 2024-2025"
    chapter: "Ch 7.2 + Lens 2"

  # 博弈论 + Kill Switch (≥5 项)
  - id: DM-GAME-001
    number: "AAR/SARO/SCI 三方博弈, 窗口内 throughput 上限 ~12,000 模块 (2026-2032)"
    source: "P3 Nash equilibrium analysis"
    chapter: "Ch 6.2 博弈论"
  
  - id: DM-GAME-002
    number: "Q1 2026 模块基线 263/月 (1,050 / 4)"
    source: "2026 指引除季度"
    chapter: "Ch 14 Kill Switch 红 1"
  
  - id: DM-GAME-003
    number: "SARO 进入 module market 的加权概率 15-20%"
    source: "P4 红队靶子 #4"
    chapter: "Ch 6.5 + Ch 14"
  
  - id: DM-GAME-004
    number: "FTAI Power NPV $500M 期权 (10% 成功 × $5B)"
    source: "P3 SOTP"
    chapter: "Ch 10.3 + Ch 14 绿 3"
  
  - id: DM-GAME-005
    number: "SCI LP IRR 要求 8-10%, 窗口末期必须在 2032 前按 15%+ 回报退出"
    source: "SCI fund docs + PE industry benchmark"
    chapter: "Ch 2.3 Lens 3"
```

**DM 锚点总计**: 50 项 (8 执行摘要 + 12 财务 + 10 竞争估值 + 6 资本 + 5 内部人 + 4 认知 + 5 博弈). 超铁律 J-3 门控 30 项, 满足 200K+ 报告 50 项+ 标准.

### 4.2 Mermaid 图必填清单 (目标 ≥15 项, 220K 报告标准)

```yaml
mermaid_diagrams_required:
  - title: "旧地图 vs 新地图 2-by-2 对照"
    type: "quadrantChart"
    chapter: "Ch 1 核心争议"
    purpose: "一眼看到市场默认 vs 我们新定义的两维差异 (时间维度 × 估值方法)"
  
  - title: "CFM56 窗口三阶段结构 (2022-2025 囤积 / 2026-2031 捕获 / 2032+ 塌陷)"
    type: "gantt"
    chapter: "Ch 3 窗口定义"
    purpose: "让读者看到三阶段的时间分布 + 关键转折点"
  
  - title: "收入归因瀑布 FY23 → FY26E"
    type: "sankey-beta"
    chapter: "Ch 4.2"
    purpose: "量/价/mix/M&A 对收入变化的贡献分解"
  
  - title: "Aerospace 毛利率 Bridge FQ4'24 → FQ2'26 (+19.5pp)"
    type: "xychart-beta"
    chapter: "Ch 4.4"
    purpose: "规模效应 + mix + 定价权 + Cloud Light 摩擦的独立贡献"
  
  - title: "FCF 与 CapEx 的剪刀差 2022-2028E"
    type: "xychart-beta"
    chapter: "Ch 4.5 失灵事实 #1/#4"
    purpose: "直观看到 FCF 从 -$1B 转正 + CapEx 2026 塌陷的时序"
  
  - title: "FTAI 现金流结构 vs compounder 标杆 (TDG/HEI)"
    type: "graph"
    chapter: "Ch 2.3 Lens 3"
    purpose: "对比 operating/investing/financing 三类 FCF 的结构差异"
  
  - title: "SOTP 三段估值决策树"
    type: "flowchart"
    chapter: "Ch 10.2"
    purpose: "Aviation Leasing (WLFC 5x) + Aerospace (7年DCF) + FTAI Power (期权) 合计"
  
  - title: "窗口长度敏感度分析 (2030/2032/2035/2038)"
    type: "xychart-beta"
    chapter: "Ch 10.4"
    purpose: "不同窗口长度对应的公允价值分布"
  
  - title: "3 点估值 Bear/Base/Bull + 加权概率"
    type: "pie"
    chapter: "Ch 10.5"
    purpose: "25%/50%/25% 概率分布 × 三情景公允价值"
  
  - title: "AAR/SARO/SCI Nash equilibrium"
    type: "graph"
    chapter: "Ch 6.2 博弈论"
    purpose: "窗口内三方分配 throughput 的博弈结构"
  
  - title: "CFM56 vs LEAP 替代曲线 2025-2035"
    type: "xychart-beta"
    chapter: "Ch 6.4 替代节奏"
    purpose: "IATA 预测 vs GE 指引 vs 我们 Bayesian 三套曲线"
  
  - title: "黑箱比例分解 (窗口 25% + 经济学 20% + Power 10% + SCI 7.5% + 其他 1%)"
    type: "pie"
    chapter: "Ch 7.2 认知边界"
    purpose: "让读者看到 63.5% 黑箱的内部结构"
  
  - title: "Kill Switch 触发流程 (5 红 + 4 黄 + 4 绿)"
    type: "flowchart"
    chapter: "Ch 14 Kill Switch"
    purpose: "每个信号触发后的评级/估值调整路径"
  
  - title: "催化剂日历 2026-2032 (窗口内关键验证点)"
    type: "gantt"
    chapter: "Ch 15 催化剂"
    purpose: "Q1'26 / 2027 FTAI Power / 2030 AAR / 2032 窗口关闭的时间轴"
  
  - title: "圆桌讨论 5 视角矩阵 (赞同/反对/中性 × 评级调整幅度)"
    type: "quadrantChart"
    chapter: "Ch 12 圆桌"
    purpose: "Buffett+Munger/Marks/Klarman/Druckenmiller/Greenblatt 五视角可视化"
  
  - title: "CEO Adams 持股增长分解 (股价贡献 vs 实际增持)"
    type: "xychart-beta"
    chapter: "Ch 5.6 + Lens 5"
    purpose: "16.7x 增长中 21.6x 来自股价, 仅 0.77x 来自实际增持"
  
  - title: "反身性临界点 — 当前 $26B 隐含永续假设 vs CFM56 物理寿命"
    type: "xychart-beta"
    chapter: "Ch 10.3 Reverse DCF"
    purpose: "估值在买 20+ 年永续, 但产品生命周期 <15 年"
```

**Mermaid 总计**: 17 图. 超铁律 J-3 门控 10 项, 满足 200K+ 报告 ≥15 项附加约束.

### 4.3 中场检测时点 (铁律 J-4 强制)

```yaml
mid_assembly_checkpoints:
  - threshold: 50000  # 第 1 次基线检测
    trigger: "写完 Ch 1-3 (执行摘要 + 核心争议 + 窗口定义)"
    mandatory_script: "bash scripts/mid_assembly_check.sh reports/FTAI/FTAI_complete_v1.md"
    verification:
      - "voice = 0 (第三人称自称)"
      - "审美词 ≤5"
      - "范畴重分配出现 ≥2 次 (Lens 1-3 至少展开一个)"
      - "DM 密度 ≥1.0/千字"
  
  - threshold: 100000  # 第 2 次
    trigger: "写完 Ch 4-7 (财务深度 + 竞争 + 认知边界)"
    mandatory_script: "同上"
    verification:
      - "范畴重分配 ≥3 次 (Lens 1-3 全部展开)"
      - "DM 锚点累计 ≥25 (按 50% 进度 25 项计)"
      - "Mermaid 累计 ≥8 (按 50% 进度 8.5 项计)"
  
  - threshold: 150000  # 第 3 次
    trigger: "写完 Ch 8-11 (风险 + 管理 + 估值)"
    mandatory_script: "同上"
    verification:
      - "估值章三点估值明确 (Bear/Base/Bull + 加权)"
      - "无单点目标价 (R-4 黑箱 63.5% ≥30% 硬约束)"
      - "Lens 1-3 全部至少出现 3 次 (回声纪律)"
  
  - threshold: 200000  # 第 4 次 + 强制重读 5 减法清单
    trigger: "写完 Ch 12-15 (圆桌 + Kill Switch + 催化)"
    mandatory_script: "同上 + 重读铁律 N 5 减法清单"
    verification:
      - "voice 仍 = 0"
      - "hedging 密度 <3/万字"
      - "箭头链 <5 处"
      - "圆桌异议 ≥3/5 → 评级标注(临界)"
  
  - threshold: 220000  # 最终检测
    trigger: "写完 Ch 16-17 (三个钉子固化 + 附录)"
    mandatory_script: "bash tests/quality_gate_complete.sh reports/FTAI/FTAI_complete_v1.md"
    verification:
      - "所有 9 质量门控 GREEN 或 YELLOW ≤2"
      - "第零律 2 过程无痕化 5 家族检测 PASS"
      - "G9 认知边界三指标齐全"
```

**中场检测总计**: 5 时点 (超铁律 J-3 门控 ≥4 要求).

### 4.4 过程无痕化自检三问 (铁律 J-3b 强制)

```yaml
phase5_process_erasure_check:
  # 心智切换锚: 从"拼接 staging"→"给投资者写成品"
  mindset_switch: |
    错的心智 (NEVER): "把前期分析材料拼成报告"
    对的心智: "从前期研究材料中提炼给投资者的成品"
    读者是投资者, 不是研究同行. 读者不关心研究流程, 只关心 thesis + 证据 + Kill Switch.
  
  q1_reader_ignorance_test: |
    问: 如果读者不知道 "Phase / Agent / staging / skill / checkpoint" 是什么, 他们能看懂这段吗?
    我的回答 (Phase 5 写每段前默答): 
      如果这段话含"前期研究 / 先前发现 / 本研究的 Phase X / Agent 分析" 等词 → 改写成"我们认为 / 基于 10-K 数据 / 从 WLFC 对标看"
      如果这段话含"圆桌讨论 skill / red-team-suite 分析" → 改写成"五位大师视角 / 红队审查"  (投资者熟悉的词)
  
  q2_engineering_perspective_check: |
    问: 这段话有没有 "谁做了什么" 的工程化视角?
    禁止的 5 家族 (从第零律 2 完整复制):
      - Agent 家族: "Agent findings", "子 Agent", "并行 Agent", "P[0-9]+ Agent"
      - Phase 家族: "Phase X 完成/产出/结晶/回流", "P1-A", "P4.5 结晶"
      - 工作流家族: "staging 文件/内容", "handoff note", "checkpoint.yaml", "compression"
      - LLM 家族: "LLM 调用", "prompt 注入", "context window"
      - Skill 家族: "调用 xxx-skill", "xxx-skill 产出"
    合法替换:
      - "Phase 4 红队发现" → "红队审查显示"
      - "staging 材料表明" → "我们的调研显示"
      - "compression_test 结晶" → "压缩为一句话"
      - "调用 investment-committee skill" → "五位投资大师视角"
  
  q3_bloomberg_test: |
    问: 这句话能直接放进 Bloomberg 研报 / Morgan Stanley research note 吗?
    投资者读到会不会觉得"为什么作者在谈他们的工作流程"?
    标准: 如果 Bloomberg 读者会觉得奇怪 → 重写
    例: 
      原 (不通过): "经过 Phase 1-4 的多轮分析, 我们发现..." → Bloomberg 不会这么写
      改: "基于 10-K 2023-2025 + 同业对标 + 供应链调研, 我们认为..."
  
  commitment: |
    Phase 5 写每个段落**之前**默答三问. 感觉不确定时宁可改写不冒险.
    单会话组装中, 我们承诺做到 process 家族出现次数 = 0 (无任何一个 5 家族词汇).
```

---

## §5. [SESSION] Phase 5 章节重排规划 (降认知负荷组装)

### 5.1 读者认知路径 (首 2 分钟)

读者打开报告的前 2 分钟必须回答 3 个问题:
1. **结论是什么**: 审慎关注 (临界, 高争议), 期望回报 -17%
2. **为什么**: CFM56 窗口捕获机, 永续倍数 21.6x 被误用在有限寿命资产上
3. **风险是什么**: 黑箱 63.5% + 圆桌 4/5 下调 + 窗口 2030 提前关闭可能性 25%

**执行摘要三段式** (铁律 S-3, 800-1200 字):

```
段 1 (250-350 字): 旧地图 + 裂缝
  - 市场把 FTAI 当"航空后市场成长股", 用 TDG/HEI 的 21.6x EV/EBITDA 估值, 期待 2026 兑现 $1.4B EBITDA 指引
  - 但三件事旧地图解释不通: (1) FCF -$3.1B 累计而管理层说 self-funding compounder (2) DIO +132 天同时毛利率 +19pp (3) PE 56x vs WLFC 5x 同为 CFM56 租赁商差 11 倍

段 2 (350-450 字): 新定义 + 变量 + 估值
  - 我们认为 FTAI 是"CFM56 窗口捕获机" — 有 7 年物理寿命的有限窗口价值捕获结构
  - 因此真正的第一变量是窗口剩余年数 × 年度可捕获模块数 × FCF 转化率, 不是 EBITDA 增速
  - 估值方法从 EV/EBITDA 永续倍数切换到有限寿命 DCF (terminal=0 at 2035) + SOTP 三段
  - SOTP: Aviation Leasing $3B (WLFC 5x 锚) + Aerospace $5.5-7.5B (7年DCF) + FTAI Power $0.5B (期权)
  - 合计 $9-11B 公允价值 vs 市值 $26B, 高估 50-65%

段 3 (200-300 字): 评级 + 黑箱 + Kill Switch
  - 评级: 审慎关注 (临界, 高争议), Bayesian 期望回报 -17%, 区间 -35% 到 +30%
  - 黑箱 63.5% (超 Klarman too hard 阈值 35% +28.5pp), 因此**不提供单点目标价**, 改为三点估值 Bear $6-8B / Base $9-11B / Bull $18-22B
  - 圆桌 4/5 建议下调 (Buffett+Munger / Marks / Klarman / Druckenmiller)
  - 核心 Kill Switch: Q1 2026 模块 <220 / 2030 AAR 续签 <45% / CEO 连续 3 季度净卖出 / FY26 CapEx 超 $150M / 2027 FTAI Power 无独立 EBITDA
```

### 5.2 正文 17 章结构 (按读者认知负荷最低排序)

```
Ch 1: 核心争议 (旧地图 vs 新地图) — 3K 字
  - 5 个 failure_points 并列陈述
  - 5 个 lens 结构化展开 (简版)

Ch 2: 商业模式 — 12K 字
  2.1: FTAI 的业务本体 (不是"多元控股", 是"有限寿命窗口捕获") (Lens 1)
  2.2: SCI 资本结构 (Lens 3 — 资本募集式扩张)
  2.3: 垂直整合的真假闭环 (Lens 2 — 黑箱定价缺锚)

Ch 3: CFM56 窗口三阶段结构 — 10K 字
  3.1: 2022-2025 囤积期 (feedstock 采购)
  3.2: 2026-2031 稳态捕获期 (年度 throughput 1,050 模块)
  3.3: 2032+ 塌陷期 (若 FTAI Power 未接棒)

Ch 4: 财务深度 + 归因 — 20K 字
  4.1: 失灵事实 #1 — 三年负 FCF 分解
  4.2: 收入归因瀑布 FY23-26E
  4.3: EBITDA 归因 (Aerospace vs Aviation Leasing 分部门)
  4.4: 毛利率 Bridge FQ4'24 → FQ2'26 (+19.5pp)
  4.5: 失灵事实 #2 — DIO +132 天分解 (量价剪刀差)
  4.6: 失灵事实 #4 — CapEx 3:7 + 2026 塌陷 (CapEx-FCF 剪刀差)
  4.7: FCF 转正路径 (2025 -$1B → 2026 +$915M)
  4.8: 杠杆结构 (D/E 10.46x, 现金流覆盖比例)
  4.9: 现金流结构 vs compounder 标杆 (Lens 3 证据)

Ch 5: 业务分部门 — 15K 字
  5.1: Aerospace Products segment (单模块经济学 — 黑箱 #1)
  5.2: Aviation Leasing segment (WLFC 对标基准)
  5.3: FTAI Power segment (期权维度)
  5.4: 分部门 ROI 无法独立验证的原因
  5.5: 供应链: CFM56 feedstock 采购 (非公开 OEM 合作)
  5.6: 失灵事实 #5 — CEO 持股 vs Q4 miss (Lens 5)

Ch 6: 竞争+博弈 — 15K 字
  6.1: 失灵事实 #3 — PE 56x vs WLFC 5x
  6.2: AAR/SARO/SCI 三方博弈
  6.3: 2030 AAR 续约赔率 (Lens 4 核心)
  6.4: LEAP/GTF 替代曲线 2025-2035
  6.5: SARO 进入 module market 的加权概率

Ch 7: 认知边界 — 8K 字
  7.1: 可推演度 58% 逐维度拆解
  7.2: 黑箱 63.5% 加权分解
  7.3: Klarman too hard 边界判定
  7.4: 对评级的结构性影响 (不参与单点目标价)

Ch 8: 风险 + 宏观敏感性 — 8K 字
  8.1: 行业周期风险
  8.2: 地缘政治 (台海 / 俄乌对 CFM56 供应链)
  8.3: 监管风险 (FAA/CFM 对 USM 的政策)
  8.4: 杠杆利率敏感度

Ch 9: 管理层 + Guidance Track Record — 6K 字
  9.1: CEO/CFO 背景 (GP 思维遗产)
  9.2: 连续 Q4 miss vs 年度上调
  9.3: Guidance 可信度评估

Ch 10: 估值 — 15K 字
  10.1: SOTP 三段 (主方法)
  10.2: 有限寿命 DCF (辅方法)
  10.3: Reverse DCF (当前隐含什么)
  10.4: 窗口长度敏感度
  10.5: 三点估值 + 概率加权

Ch 11: 对标验证 — 5K 字
  11.1: WLFC 对标 (Aviation Leasing)
  11.2: TDG/HEI 为什么不适合 (单机型限制)
  11.3: AAR 对标 (另一类 CFM56 参与者)

Ch 12: 圆桌讨论 (5 视角) — 12K 字
  12.1: Buffett + Munger 合并视角 (价值陷阱判定)
  12.2: Howard Marks (周期位置 + "too hard")
  12.3: Klarman (安全边际 + 黑箱折价)
  12.4: Druckenmiller (反身性临界点)
  12.5: Greenblatt (特殊情况 — 窗口关闭期价值)
  12.6: 五视角异议汇总 (4/5 下调)

Ch 13: 红队 5 靶子总结 — 8K 字
  13.1: 2026 EBITDA recurring split
  13.2: Aerospace margin 36% 可持续性
  13.3: 2030 AAR 续签
  13.4: SARO 进入概率
  13.5: SCI fee stream NPV

Ch 14: Kill Switch — 8K 字
  14.1: 红灯 5 项 + 触发后估值调整
  14.2: 黄灯 4 项
  14.3: 绿灯 4 项
  14.4: 历史反例 (AerCap 2018 窗口末期)

Ch 15: 催化剂日历 2026-2032 — 5K 字
  15.1: Q1 2026 模块交付 (第一验证点)
  15.2: 2026 H2 SCI 部署进度
  15.3: 2027 FTAI Power 独立 EBITDA
  15.4: 2030 AAR 合同续约

Ch 16: 三个钉子 (铁律 S-4 固化) — 2K 字
  16.1: 新定义 (CFM56 窗口捕获机)
  16.2: 第一变量 (窗口年数 × 模块数 × FCF 转化率)
  16.3: 新估值语言 (有限寿命 DCF + SOTP)
  16.4: 迁移问题 (看类似公司问什么)

Ch 17: 附录 + DM 锚点索引 — 8K 字
  17.1: DM 锚点全列表 (50 项)
  17.2: 关键财务数据表
  17.3: 同业对标数据表
  17.4: 免责声明 + 方法论
```

**章节字符总计**: 3+12+10+20+15+15+8+8+6+15+5+12+8+8+5+2+8 = **160K 正文字符** + 执行摘要 1.2K + 附录 8K + 图表注释 50K = **~220K 目标**.

**章节占比检查** (铁律 M-4, 单章 ≤15%):
- Ch 4 财务深度 20K / 220K = 9.1% ✓
- Ch 5 业务分部门 15K / 220K = 6.8% ✓
- Ch 6 竞争+博弈 15K / 220K = 6.8% ✓
- Ch 10 估值 15K / 220K = 6.8% ✓
- Ch 12 圆桌 12K / 220K = 5.5% ✓
- 所有章节均 <10%, **无膨胀信号**.

---

## §6. [SESSION] 被否决方案 + 原因 (压缩最易丢失)

### 6.1 被否决方案 #1: 给单点目标价

**方案**: 给"公允价值 = $10B" 单一数字, 隐含 "公允股价 = $98.5, 当前 $259.13"
**否决原因**: R-4 硬约束 — 黑箱 63.5% ≥30% 强制禁止单点目标价. 单点给出后 quality_gate_complete.sh 会在提交时阻断. 必须给三点 Bear/Base/Bull 或区间.
**正确做法**: "公允价值 $9-11B (Base), 三点区间 $6-22B (Bear-Bull 25/50/25 概率加权)"

### 6.2 被否决方案 #2: 把评级改为 "避免"

**方案**: 期望回报 -17% + 黑箱 63.5% + 圆桌 4/5 下调 → 评级 "避免"
**否决原因**: 
1. -17% 在 "审慎关注" 区间 (<-10%) 而非 "避免" (需要 <-25% 以上)
2. 25% Bull case (+15% ~ -31%) 的存在意味着有上行尾部 — 不是全损资产
3. 圆桌 4/5 下调不是 5/5 (Greenblatt 给出 "特殊情况" 中性评估)
**正确做法**: 保留 "审慎关注 (临界, 高争议)", 附 R-3 公开披露 4/5 异议

### 6.3 被否决方案 #3: 把 Lens 数量压缩到 3 个

**方案**: 只保留 Lens 1-3 (范畴重分配 3 个), 砍掉 Lens 4-5 (验证型)
**否决原因**: Lens 4 (AAR 续约) 和 Lens 5 (CEO 持股解码) 是 Kill Switch 的核心信号. 不纳入 Top 5 会导致 Ch 14 Kill Switch 章节缺少 leading indicator.
**正确做法**: Top 5 保留 5 个, 其中 Lens 4-5 明确标注为"验证型", 不进执行摘要

### 6.4 被否决方案 #4: 直接用 Phase 3 的估值数字

**方案**: 用 P3 SOTP $10B / +10% 上行 的原始数字
**否决原因**: 铁律 K — Phase 4 修正必须回流. P4 红队将 2030 AAR 续签率从 55% 下调到 45%, 将 SARO 概率从 10% 上调到 15-20%, 这些修正没有回流到 P5 = 估值错位.
**正确做法**: 使用 P4 Bayesian 修正后的 -17% 期望 (已写入 checkpoint.yaml v2)

### 6.5 被否决方案 #5: 在执行摘要就展开 Lens 2-5

**方案**: 执行摘要一次性介绍 5 个 lens
**否决原因**: 铁律 S-3 D2 — 每段一位移. 执行摘要三段已经各自承担 (旧地图) (新定义) (评级边界) 三个位移, 不能在段 2 同时装 Lens 1-5 → 读者无法在 800 字内承受 5 个位移.
**正确做法**: 执行摘要段 2 只展开 Lens 1 (母 lens), Lens 2-5 留到 Ch 1 展开.

---

## §7. [SESSION] 用户反馈记录 (session 内偏好)

1. **Phase 4 初始要求**: "保留修复后的 P3 thesis, 继续 Phase 4, 目标产出 40KB+" → 已完成 (P4 v1 41.7K → v2 46.1K)
2. **Phase 4 全面评估要求**: "进入全面评估 Phase 4, 并且进行优化和补强" → 已通过 skeptic 3.8/5 + 3 FLAG 全修
3. **Phase 4.5 要求**: "先设置一个目标的输出, 要超过这个输出" → 目标设定 ≥40KB 总计, 实际产出 ≥45KB (+12.5%)

**隐含偏好**: 用户重视"承诺超额" — 每个 Phase 都需要显式设定目标并超额完成, 不模糊化.

**语言偏好**: 中文为主, 技术术语 (DM/SOTP/EV/EBITDA) 保留英文. 不过度口语化.

**估值偏好**: 接受 "审慎关注 (临界)" 而非强买/强卖立场 — 用户理解 FTAI 是 edge case, 不要求"给明确答案".

---

## §8. [SESSION] 下一步唯一优先

### Phase 5 单会话组装启动检查清单

Phase 5 开始前 **必须** 完成:

- [ ] 读本 handoff note 全文
- [ ] 重读 compression_test.md (Lens 1 母 lens)
- [ ] 重读 lens_registry.md (Top 5)
- [ ] 重读 P4_redteam.md v2 (5 靶子 + 圆桌 + 认知边界)
- [ ] 重读 default_map_audit.md (5 failure_points)
- [ ] 心智切换锚: 从"拼接 staging" → "给投资者写成品"
- [ ] 打开 reports/FTAI/ 目录准备 FTAI_complete_v1.md
- [ ] 确认 data/FTAI/checkpoint.yaml 当前状态为 "Phase 4 完成 + v2 优化补强"

Phase 5 第一个动作: 写执行摘要三段 (目标 800-1200 字). **NEVER 跳过**直接写正文.

### 不重复的事 (防走弯路)

- **NEVER 重做** P0.75 default_map_audit — 已稳定, 5 failure_points 是正文 Ch 1 的基础
- **NEVER 改动** P4 Bayesian -17% 期望回报 — 这是 P5 的承重数字
- **NEVER 用单点目标价** — R-4 硬约束禁止
- **NEVER 用 "avg" / "可能" / "或许"** — 铁律 N 减法 #1 hedging
- **NEVER 在正文暴露 "Phase / Agent / skill / staging" 等工程词汇** — 第零律 2 过程无痕化
- **NEVER 单章超 15%** — 铁律 M-4
- **NEVER 跨会话组装** — 铁律 J-1 单会话组装 (如果 context 不够, context_save + 下次重新组装, 不续写)

---

## §9. Staging 充足性检查 (铁律 J-5)

```yaml
staging_sufficiency_check:
  target_complete_chars: 220000
  
  staging_files:
    - name: "FTAI_P0_continued_data_collection.md"
      chars: 6106
    - name: "FTAI_P0_continued_data_collection_supplement.md"
      chars: 5182
    - name: "FTAI_P0_data_collection.md"
      chars: 5724
    - name: "FTAI_P0_deep_questions.md"
      chars: 6341
    - name: "FTAI_P1_findings.md"
      chars: 16212
    - name: "FTAI_P2_findings.md"
      chars: 36372
    - name: "FTAI_P3_findings.md"
      chars: 38542
    - name: "FTAI_P4_redteam.md"
      chars: 46141
    - name: "FTAI_default_map_audit.md"
      chars: 6837
    - name: "FTAI_thesis_crystallization.md"
      chars: 13263
    - name: "FTAI_handoff_P0_to_P0.5.md"
      chars: 7221
    - name: "FTAI_compression_test.md"
      chars: 13805
    - name: "FTAI_lens_registry.md"
      chars: 12942
    - name: "FTAI_P4.5_handoff.md (本文件, 估计)"
      chars: 19000
  
  total_staging_chars: 233688  # 约 233K
  sufficiency_ratio: 1.062     # 233K / 220K = 106.2%
  
  verdict: "PASS — 充足率 106% ≥ 0.70 门控. 实质上 Phase 5 只需对 staging 内容 **重组 + 压缩 + 降认知负荷排序**, 不需要大量新写实质分析. 结构性文字 (执行摘要/章节过渡/图表注释) 约 30K 字符."
  
  deepening_targets: "无 — 不需要回退深化"
  
  risk_areas_for_phase5:
    - "图表生成: 17 Mermaid 图需要逐一撰写, 每图约 100-200 字注释"
    - "Python 估值验证: 4 个脚本尚未创建, Phase 5 必须产出"
    - "过程无痕化: staging 文件中有大量 'Phase X' / 'agent' / 'skill' 等词汇, 必须在组装时消除"
    - "DM 锚点标注: staging 中 DM 锚点 ID 可能不统一, Phase 5 需要全报告重新编号"
```

---

## §10. 交付状态 + 脚本验证 (铁律 J-3 硬约束)

- [x] **phase5_engineering_requirements 齐全**: DM 锚点 50 项 ≥30 / Mermaid 17 项 ≥10 / 中场检测 5 时点 ≥4
- [x] **phase5_process_erasure_check 自检三问已答**: q1/q2/q3 全部有具体回答
- [x] **章节重排规划**: 17 章结构 + 占比检查 + 字数分配
- [x] **被否决方案记录 ≥5 条**: 防压缩丢失
- [x] **Kill Switch 5 红+4 黄+4 绿完整**: 对齐全报告
- [x] **三点估值定稿**: Bear $6-8B / Base $9-11B / Bull $18-22B / 加权 -17%
- [x] **R-4 黑箱表达纪律**: 63.5% ≥30% → 禁止单点 + 三点估值 + 临界标注
- [x] **R-3 圆桌异议纪律**: 4/5 建议下调 → 评级"(临界)"+ Ch 12 公开披露
- [x] **staging 充足率 106%**: 远超 J-5 门控 0.70
- [x] **下一步唯一优先明确**: Phase 5 第一动作 = 写执行摘要三段

**Phase 4.5 总交付字符**:

```
FTAI_compression_test.md:  13,805 字符
FTAI_lens_registry.md:     12,942 字符
FTAI_P4.5_handoff.md:      ~19,000 字符 (本文件)
─────────────────────────────────────
合计:                      ~45,700 字符
```

**承诺目标**: ≥40KB. **实际产出**: ≥45KB. **超额**: +12.5%.

---

## §11. 给下一个 session 的一句话

> **Phase 5 不是在 Phase 4 基础上"继续写", 是用 Phase 4.5 建立的新母命题 ("CFM56 窗口捕获机") 把前期所有材料重新编织成给投资者看的连贯成品. 第一个动作是写执行摘要三段, 用 800-1200 字让读者在 2 分钟内完成从旧地图到新地图的认知迁移.**
