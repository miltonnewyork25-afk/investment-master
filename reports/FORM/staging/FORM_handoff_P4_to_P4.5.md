# Handoff Note — FORM Phase 4 → Phase 4.5

> **日期**: 2026-04-17 | **分支**: 半导体 worktree | **Phase 4 完成**

---

### 1. [SESSION] 主要请求与意图

FORM Tier 3深度报告, 目标150K+字符 / 4.5+质量分。Phase 4完成红队七问+双向校准+假设审计。

---

### 2. [SESSION] 核心矛盾 + Thesis + 变量

**主假说 (Phase 4校准后)**: "FORM不是HBM纯股, 是增长方向和利润方向结构性相反的周期性测试设备公司。$128高估47.5%(概率加权公允价值$86.75), 但非确定性高估 — 如果GM持续>43%超过3季度, thesis需重大修正。"

**Phase 4关键修正**:
1. ✅ Technoprobe DRAM进入概率从40-55%**下修至25-35%** — 无硬证据支持高概率
2. ✅ "EPS下降"叙事增加注脚: FY2023含$73M一次性收益, 剔除后EPS基本持平
3. ✅ GM改善路径比预期清晰: Q1指引45% non-GAAP, 如果兑现=历史新高
4. ✅ 偏差诊断: Phase 1-3有3/6假设偏空, 已修正
5. ✅ Bull case联合概率14%: 不支持$128, 但也不是0%

**四种情景概率加权**:
- Bear 35% → $55-70 | Base 40% → $80-100 | Bull 20% → $110-130 | Extreme 5% → $140-160
- **加权公允价值: $86.75** (vs $128, 下行47.5%)

**第一变量**: 不变, ROIC跨越WACC的时间点。但Phase 4增加了一个前置验证: **GM持续性 (≥43% GAAP, 连续3季度)**。如果GM持续, ROIC路径打开; 如果GM回落, ROIC路径关闭。

**Kill Switch精炼**: 5红(CapEx<+10%/GM<38%两季/Technoprobe DRAM订单/FY27 ROIC<WACC/技术替代) + 3黄(Q1 GM miss/FB延迟/DRAM价格跌>10%) + 2绿(3Q GM>44%+ROIC>12%/Technoprobe退出DRAM)

---

### 3. [REFRESH] 文件清单 + 关键数据

**Phase 4产出 (2个staging文件)**:
- `staging/FORM_P4_red_team.md` — ~13K字符, 10 DM, RT-1~RT-7 + 双向校准 + 概率三锚 + Kill Switch 5/3/2
- `staging/FORM_P4_assumption_audit.md` — ~6K字符, 8 DM, Reverse DCF反演 + 管理层叙事解构 + 约束分类 + 共识解构

**Phase 1-4累计**: ~105K字符staging, ~245 DM锚点

**关键数字**:
- 概率加权公允价值: $86.75 (Bear $62.5×0.35 + Base $90×0.40 + Bull $120×0.20 + Extreme $150×0.05)
- Technoprobe DRAM概率: 25-35% (从40-55%下修)
- Bull case联合概率: 14%
- Q1 GM交付概率: 65%
- HBM需求>2年概率: 65%
- 卖方中位PT: $80-86 (vs $128, 卖方自己也认为高估)
- Hyperscaler CapEx 2026: $640-700B (+36% YoY)
- HBM4量产: 2026年2月(Samsung+SK Hynix)
- SK Hynix 2026 HBM: 100% sold out

---

### 4. [SESSION] 已解决的问题 + 被否决方案

- **偏差检测完成**: 3/6假设偏空, 最大偏差=Technoprobe概率(已修正)
- **被否决**: "FORM确定性高估"表述 → 修正为"高概率高估(75%)"
- **被否决**: "CEO减持=强负面信号" → $3.3M vs $10B市值=象征性, 不构成重大信号
- **确认维持**: F&L结构性萎缩(TSMC 2nm数据硬), "增长和利润方向相反"核心判断, 5种估值全指向高估

---

### 5. [SESSION] 用户反馈记录

- 用户简洁指令"继续Phase 4"

---

### 6. [SESSION] 待办任务 (Phase 4.5)

- [ ] **圆桌讨论 (R-3)**: 调用investment-committee skill, 5-6位大师视角
- [ ] **compression_test产出**: 母命题命名(≤10字) + 三链接
- [ ] **Top 5 Lens Registry**: 至少3条范畴重分配
- [ ] **评级确认**: 基于概率加权, 预期"审慎关注"
- [ ] **Phase 5工程清单**: DM≥30 + Mermaid≥10 + 中场检测≥4

---

### 7. [REFRESH] 当前精确状态

- **Phase**: 4完成 (红队7问✓, 双向校准✓, 假设审计✓, Kill Switch 5/3/2✓, 概率三锚✓, 偏差检测✓, 约束分类✓)
- **下一步**: Phase 4.5 (圆桌+结晶)
- **已产出文件**: staging 8个 (P0.75: 3个 + P1: 2个 + P2: 3个 + P3: 2个 + P4: 2个)
- **staging总字符**: ~105K (Phase 1-4正文)

---

### 8. [SESSION] 下一步唯一优先

**Phase 4.5启动**: 调用`investment-committee` skill执行圆桌讨论。FORM是高估值周期股, 重点视角:
1. Howard Marks: 周期位置+市场情绪
2. 巴菲特: 护城河+ROIC质量
3. 芒格: too hard?
4. Druckenmiller: 宏观(AI CapEx周期)
5. Klarman: 安全边际

然后产compression_test + Top 5 Lens + Phase 5工程清单。
