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

**Phase 2新产出**:
- `staging/FORM_P2_financial_depth.md` — ~12K字符, ~25 DM锚点, 3个关键发现
- `/tmp/form_p2_valuation.py` — Python估值脚本 (ROIC路径/Reverse DCF/FCF压力测试/三PE)

**Phase 1+2累计**: ~34K字符staging, ~79 DM锚点 (密度~2.3/千字)

**关键数字 (Phase 3需要)**:
- GAAP PE 185x / Owner PE 666x / Forward PE 71x
- EV/Sales 12.7x → 公允价值$56-$72 (工业设备comp)
- Reverse DCF PV: $4.5B vs EV $9.9B = 高估55%
- ROIC: 4.9% vs WACC 9.0% → Bear 7.6% (仍<WACC), Base 11.5%, Bull 16.1%
- Owner FCF: -$27M (FY25), 正常化后$28M (yield 0.3%)
- FCF yield: 0.1% (当前), 1.6% (Full Target Model)
- 估值/护城河比率: 31.8x (阈值4.0x, 品质陷阱信号)

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
