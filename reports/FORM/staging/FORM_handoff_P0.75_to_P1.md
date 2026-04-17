# Handoff Note — FORM Phase 0.75 → Phase 1

> **日期**: 2026-04-16 | **分支**: 半导体 worktree | **Commit**: 01426da8

---

### 1. [SESSION] 主要请求与意图

用户要求对FormFactor (FORM) 做Tier 3深度报告，目标150K+字符、4.5+质量分。FORM与LITE/COHR强相关（共享Hyperscaler AI CapEx宏变量）。用户要求借鉴已有COHR v2.0和LITE v1.0报告。另外codex-report-lab worktree已有一版FORM v0分析（10个staging文件），已整合吸收。

---

### 2. [SESSION] 核心矛盾 + Thesis + 变量

**主假说**: "FORM不是HBM纯股，是增长方向和利润方向结构性相反的周期性测试设备公司"

**核心矛盾 (5个异常)**:
1. **收入翻倍但EPS下降35%** — DRAM +117% (FY23-25) 但 EPS $1.05→$0.69
2. **ROIC 4.9% vs 12.6x EV/Sales** — 市场付溢价买价值毁灭
3. **F&L隐性衰退** — $436M→$370M (-15%), Technoprobe蚕食TSMC 2nm 30%份额
4. **卖方共识$80-86 vs 股价$128** — 100%覆盖认为高估33%+
5. **Farmers Branch $220-250M赌注** — 占年收入28-32%的集中投入

**codex-lab补强的5个关键新发现**:
1. DRAM低毛利率 vs F&L高毛利率 (10-K原文确认) — 增长方向和利润方向相反
2. Systems毛利率坍塌 51.3%→41.8% — 不是隐性高利润引擎
3. SK Hynix季度集中度20-25% — Q2'25三客户占47.8%
4. Systems净贡献$37M→$16M (-58%) — "两条腿"叙事不成立
5. FCF yield压力测试 — Full Target $160M FCF仅1.6% yield @ $10B市值

**第一变量**: ROIC跨越WACC的时间点 (不是HBM content per wafer)
**Kill Switch**: Hyperscaler CapEx增速<+10% / ROIC FY27仍<WACC / Technoprobe进入DRAM

---

### 3. [REFRESH] 文件清单 + 关键数据

**必须重新Read的文件** (Phase 1启动时):
- `reports/FORM/data/fmp_financial_summary.md` — FY21-25完整财务+估值倍数
- `reports/FORM/data/launch_brief.md` — 目标/参考/模块路由
- `reports/FORM/data/lit_recon_memo.md` — 7路搜索汇总
- `reports/FORM/staging/FORM_thesis_crystallization.md` — 核心矛盾+CQ+假说
- `reports/FORM/staging/FORM_default_map_audit.md` — S-1产物 (4个失灵事实)
- `reports/FORM/staging/FORM_codex_integration_memo.md` — 5个新发现+3个thesis升级

**codex-lab staging (已复制到半导体worktree)**:
- `staging/P1_core_questions_and_research_order.md`
- `staging/P1_farmers_branch_margin_fcf_bridge.md`
- `staging/P1_peer_and_valuation_language.md`
- `staging/P2_bull_bear_falsification_v0_2026-04-16.md`
- `staging/P2_catalyst_and_kill_switch_register_v0_2026-04-16.md`
- `staging/P2_competition_moat_and_substitution_v0_2026-04-16.md`
- `staging/P2_scenario_valuation_pressure_test_v0_2026-04-16.md`
- `staging/P2_segment_economics_v0_2026-04-16.md`
- `staging/P3_cq_answers_v0_2026-04-16.md`

**codex-lab data (已复制)**:
- `data/discovery_memo_v0_2026-04-16.md` — 14K发现备忘录
- `data/customer_concentration_and_demand_narrowness_v0_2026-04-16.md`
- `data/economic_base_table_v0_2026-04-16.md`
- `data/FORM_Complete_v0_2026-04-16.md` — codex-lab主稿v0 (索引+13K)

**关键数字**:
- FY2025: $785M收入, 39.5% GM (Q4: 42.8%), 8.5% OPM (Q4: 13.1%), $0.69 EPS
- 市值$10B, $128股价, 185x trailing PE, 57x forward PE, 12.6x EV/Sales
- DRAM: $247M (31.5%), F&L: $370M (47.1%), Systems: $147M (18.7%)
- CapEx FY25: $104M, FY26E: $140-170M, FCF FY25: $12M
- ROIC: 4.9%, Net cash: $58M, SBC: $39M (4.9% of rev)
- Q1 FY26 guide: $225M rev, 45% non-GAAP GM, $0.45 EPS

---

### 4. [SESSION] 已解决的问题 + 被否决方案

- **框架同步**: 半导体worktree已从main合并22个commit (v22.3-v22.8升级), 3个冲突已解决(取main版本)
- **tier3_launch.sh失败**: Python依赖不可用,手动执行launch流程(mkdir+launch_brief+lit_recon)
- **codex-lab整合**: 确认两套分析thesis方向一致,codex-lab提供5个具体新发现补强

---

### 5. [SESSION] 用户反馈记录

- 用户明确要求: 150K+字符, 4.5+质量分
- 用户强调FORM与LITE/COHR强相关,要求借鉴已有报告
- 用户指出codex-report-lab已有FORM v0分析(截图指向P2_segment_economics + P3_cq_answers + FORM_Complete_v0),要求整合

---

### 6. [SESSION] 待办任务

- [ ] Phase 1: 业务理解 + 护城河 (目标25K staging)
  - 探针卡商业模式深度 (消耗品vs CapEx密集的真相)
  - MEMS技术壁垒量化 + qualification cycle经济学
  - DRAM低毛利vs F&L高毛利的结构性张力分析
  - 迁移KLAC定价权框架到FORM
- [ ] Phase 2: 财务深度 (目标30K staging)
  - R-1: 收入归因瀑布 + 毛利率Bridge + EPS瀑布
  - R-2: 至少3个剪刀差 (DRAM量价/CapEx-FCF/F&L-DRAM mix)
  - FCF yield压力测试 (Python验证)
  - Reverse DCF: $128隐含什么
  - Farmers Branch IRR + breakeven分析
- [ ] Phase 3: 竞争 + 博弈 (目标25K staging)
  - FORM vs Technoprobe: DRAM和Logic两条战线
  - 10-K竞争对手完整分析
  - "客户可以改测试策略"替代风险
  - 供应链验证 (M11/M12)
- [ ] Phase 4: 红队 + 圆桌 (目标15K staging)
- [ ] Phase 4.5: 结晶 + 压缩测试
- [ ] Phase 5: 组装Complete 150K+

---

### 7. [REFRESH] 当前精确状态

- **Phase**: 0.75完成 (核心矛盾结晶 + codex-lab整合)
- **下一步**: Phase 1启动
- **已产出文件**: 16个staging/data文件 (6个我们的 + 10个codex-lab)
- **已commit**: 3个commit在半导体分支
  - `b0e67936` Merge branch 'main' into 半导体
  - `10bf997e` Phase -0.5/0/0.75完成
  - `01426da8` codex-lab整合

---

### 8. [SESSION] 下一步唯一优先

**Phase 1启动**: 先Read `FORM_codex_integration_memo.md` + `FORM_thesis_crystallization.md` + `fmp_financial_summary.md`。围绕"增长方向和利润方向结构性相反"这个升级后thesis写Phase 1业务理解。

**不要重复**: codex-lab已覆盖的内容(segment economics/competition/bull-bear)直接引用,不重写。我们的Phase 1应该**加深**而非重复——聚焦DRAM毛利率问题的因果机制和定量验证。

---

### 近期催化剂提醒

- **April 29, 2026**: Q1 FY26 earnings (13天后)
- **May 11, 2026**: Analyst Day (25天后)
