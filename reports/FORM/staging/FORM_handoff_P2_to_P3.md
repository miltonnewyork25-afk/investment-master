# Handoff Note — FORM Phase 2 → Phase 3

> **日期**: 2026-04-17 | **分支**: 半导体 worktree | **Phase 2 完成**

---

### 1. [SESSION] 主要请求与意图

FORM Tier 3深度报告, 目标150K+字符 / 4.5+质量分。Phase 2完成财务深度分析+估值建模。

---

### 2. [SESSION] 核心矛盾 + Thesis + 变量

**主假说 (Phase 2强化)**: "FORM不是HBM纯股, 是增长方向和利润方向结构性相反的周期性测试设备公司——当前$128在任何合理估值假设下找不到支撑"

**Phase 2新增量化验证**:
1. ✅ 增长方向vs利润方向相反 — 收入5年CAGR +0.5%, EPS CAGR -10.2%
2. ✅ $128高估~55% — Reverse DCF: PV $4.5B vs EV $9.9B
3. ✅ Owner FCF为负 — $12M FCF - $39M SBC = -$27M
4. ✅ ROIC跨WACC需要Bull情景 — 只有47% GM (Target Model) 才能达标
5. ✅ 5/5估值方法指向高估 — 公允价值$56-$72 (工业设备框架)

**第一变量**: ROIC跨越WACC的时间点 (当前4.9% vs ~9%, 跨越概率~35%)
**Kill Switch**: ①Hyperscaler CapEx<+10% ②ROIC FY27仍<WACC ③Technoprobe进DRAM ④GM<38%连续2季

---

### 3. [REFRESH] 文件清单 + 关键数据

**Phase 2新产出 (3个staging文件)**:
- `staging/FORM_P2_financial_depth.md` — 11.2K字符, 27 DM, R-1/R-2/ROIC/DCF/三PE/FCF
- `staging/FORM_P2_supplement.md` — 17.6K字符, 41 DM, FB IRR/DCF敏感度/ROIC矩阵/资本配置/运营资本/季度/段别/Bull Case
- `staging/FORM_P2_data_corrections_and_depth.md` — 10.2K字符, 16 DM, 10-K精确修正/Cantor对抗/HBM量化/经营杠杆/Insider
- `/tmp/form_p2_valuation.py` + `/tmp/form_p2_supplement.py` — Python估值脚本

**Phase 2合计**: 39K字符, 84 DM锚点 (密度~2.2/千字)
**Phase 1+2累计**: ~61K字符staging, ~138 DM锚点

**关键数字 (Phase 3需要)**:
- 10-K精确segment: PC $638M (F&L $370M/DRAM $247M/Flash $21M), Systems $147M
- FY24→FY25收入增长只有**2.8%** (非18.4%) — 股价+180% vs 收入+3%
- GAAP PE 185x / Owner PE 666x / Forward PE 71x / EV/Sales 12.7x
- Reverse DCF敏感度: 即使8%/35x最宽松仍需$381M FCF (Target Model 2.4x)
- 概率加权公允价值: **$69** (高估46%)
- ROIC: 4.9% < WACC 9.0% → 三维矩阵显示跨越需GM>45%+OpEx/Rev<27%
- Farmers Branch IRR: 8.1% < WACC 9.0%, payback 9年
- 回购η: 0.13-0.22 (双重价值毁灭) + CEO同时减持$5.8M
- CCC恶化: 81天→107天 (+26天), DPO骤降-14天
- 正常化FY23 EPS: $0.70 (非$1.05, 剔除FRT出售$73M)
- Cantor $125: 31x × CY27 EPS $4.00, 需$1,050M rev + 22%+ OPM
- HBM4 pin count翻倍→磨损加速是Cantor最强论点, 量化存在黑箱

---

### 4. [SESSION] 已解决的问题 + 被否决方案

- **CQ1 ROIC路径**: Python建模→只有Bull (47% GM) 才能跨WACC。Bear仍然毁灭价值
- **CQ5 Reverse DCF**: $128隐含FCF从$12M→$637M, 几乎不可能。精细法也只justify $57
- **被否决**: "测试设备估值框架可justify $128" → FORM经济学 (GM 40%, ROIC 5%) 不支持测试设备溢价

---

### 5. [SESSION] 用户反馈记录

- 用户简洁指令"继续FORM Phase 2"→高效推进
- 150K+字符, 4.5+质量分目标不变

---

### 6. [SESSION] 待办任务 (Phase 3)

- [ ] **竞争深度**: Technoprobe财务对比 + TSE威胁量化 + 市占率趋势
- [ ] **博弈论**: FORM-Technoprobe-TSE-客户四方博弈结构
- [ ] **行业定价公式验证**: WFE comp对标详细分析
- [ ] **上下游验证强化**: SK Hynix/Samsung/Micron CapEx与探针卡需求时滞建模
- [ ] **AI冲击评估**: HBM世代演进对探针卡content per wafer的量化影响

---

### 7. [REFRESH] 当前精确状态

- **Phase**: 2完成 (R-1收入归因✓, R-2剪刀差×4✓, ROIC建模✓, Reverse DCF✓, 三PE✓, FCF压力测试✓)
- **下一步**: Phase 3 (竞争深度+战略分析)
- **已产出文件**: 20个 (Phase 0.75: 16个 + Phase 1: 2个 + Phase 2: 2个)
- **staging总字符**: ~34K (Phase 1-2正文)

---

### 8. [SESSION] 下一步唯一优先

**Phase 3启动**: 先做竞争深度 — Technoprobe财务对比是最关键的, 因为它直接影响F&L份额趋势和护城河耐久性评估。然后做博弈论分析 (game-theory-lens), 分析FORM-Technoprobe-TSE-客户的互动结构。

**不要重复**: Phase 2已完成的财务数据/估值建模不重写。Phase 3聚焦**竞争和战略** — 用竞争数据检验Phase 2的估值假设是否需要修正。

---

### 近期催化剂

- **April 29, 2026**: Q1 FY26 earnings (12天后) — GM持续>42%? DRAM增速? F&L恢复?
- **May 11, 2026**: Analyst Day — Target Model bridge + Farmers Branch时间表
