# Handoff Note — FORM Phase 1 → Phase 2

> **日期**: 2026-04-16 | **分支**: 半导体 worktree | **Phase 1 完成**

---

### 1. [SESSION] 主要请求与意图

FORM Tier 3深度报告, 目标150K+字符 / 4.5+质量分。Phase 1完成业务理解+护城河评估。

---

### 2. [SESSION] 核心矛盾 + Thesis + 变量

**主假说 (Phase 1验证增强)**: "FORM不是HBM纯股, 是增长方向和利润方向结构性相反的周期性测试设备公司"

**Phase 1验证结果**:
1. ✅ DRAM低毛利率 — 10-K原文确认 "DRAM products generally have lower margins than Foundry & Logic"
2. ✅ 护城河中等强度利基 — CQI 40, 进攻型, 方向weakening
3. ✅ "消耗品"叙事半对半错 — 客户端消耗+供应商端重资产 (GM 39-43% vs 科技消耗品80%+)
4. ✅ Technoprobe是现实威胁 — TSMC 2nm 30%份额, 自主MEMS, Advantest双投

**第一变量**: ROIC跨越WACC的时间点 (当前4.9% vs ~9%)
**Kill Switch**: ①Hyperscaler CapEx<+10% ②ROIC FY27仍<WACC ③Technoprobe进DRAM ④客户改测试策略

**Phase 1新增3个关键发现**:
1. "增长方向和利润方向结构性相反" — DRAM低毛利+F&L高毛利萎缩→EPS滞后于收入
2. "Technoprobe是现实威胁, 不是潜在威胁" — TSMC 2nm份额已流失
3. "探针卡是工业消耗品, 不是科技消耗品" — 12.6x EV/Sales定价了科技消耗品, 经济学是工业消耗品

---

### 3. [REFRESH] 文件清单 + 关键数据

**Phase 1新产出**:
- `staging/FORM_P1_business_moat.md` — 14.5K字符, 39 DM锚点 (密度2.68/千字), 3个关键发现
- `data/quality_scorecard.md` — CQI 40, 护城河v2.0评分卡

**关键数字 (Phase 2需要)**:
- 探针卡ASP: 基础逻辑$15-25K / HBM $500K+ (20-30x溢价)
- Qualification cycle: TSMC 12月, Intel 18月
- FY2025: $785M rev / 39.5% GM / 8.5% OPM / $0.69 EPS / $12M FCF / $104M CapEx
- Q1 FY26指引: $225M / 45% non-GAAP GM / $0.45 EPS
- CQI 40 / ROIC 4.9% / η≈0.3 / Owner FCF负值
- 估值/护城河比率 12.4x (品质陷阱高风险, 阈值4.0x)
- 全球探针卡TAM ~$3.2B / HBM子市场$250-350M
- CEO Slessor持续卖出 (10b5-1, ~$5.8M since Nov 2025), 零买入
- 分析师: 4 Buy / 6 Hold, 中位目标$80, 最高$125 (Cantor)

---

### 4. [SESSION] 已解决的问题 + 被否决方案

- **CQ2 竞争壁垒**: 从35%→55%置信度。MEMS技术壁垒真实但Technoprobe已追上逻辑端
- **CQ6 Replacement cycle**: 从35%→60%置信度。HBM加速cycle但SP-HBM4可能减速
- **CQ8 客户集中度**: 从45%→50%置信度。SK Hynix 20-25%中等风险, Q4下降可能季节性
- **被否决**: "探针卡=科技消耗品"叙事 → 实际是工业消耗品 (GM/ROIC/CapEx密度不匹配)

---

### 5. [SESSION] 用户反馈记录

- 用户要求150K+字符, 4.5+质量分
- 用户要求借鉴COHR v2.0和LITE v1.0
- 用户简洁指令"继续form下一个phase"→高效推进

---

### 6. [SESSION] 待办任务 (Phase 2)

- [ ] **R-1 财务归因**: 收入瀑布 (量/价/mix) + 毛利率Bridge + EPS瀑布 (FY23→FY25)
- [ ] **R-2 剪刀差**: ①DRAM量价 ②CapEx-FCF ③F&L-DRAM mix ④GAAP vs non-GAAP
- [ ] **CQ1 ROIC跨越WACC**: Python建模 — ROIC改善路径 (GM/OPM/资产周转)
- [ ] **CQ4 Farmers Branch breakeven**: IRR分析 + breakeven产能利用率
- [ ] **CQ5 Reverse DCF**: $128隐含什么收入/利润/FCF路径
- [ ] **FCF yield压力测试**: 4情景 (bear/partial/full/above)
- [ ] **Expectation gap识别**: 调用expectation-gap skill

---

### 7. [REFRESH] 当前精确状态

- **Phase**: 1完成
- **下一步**: Phase 2 (财务深度)
- **已产出文件**: 18个 (Phase 0.75: 16个 + Phase 1: 2个新增)
- **staging总字符**: ~14.5K (Phase 1) + codex-lab ~50K = ~65K staging素材

---

### 8. [SESSION] 下一步唯一优先

**Phase 2启动**: 先做R-1财务归因 (收入瀑布+毛利率Bridge+EPS瀑布), 这是Phase 2的基础。然后Reverse DCF回答CQ5, 再用Python做ROIC改善路径建模。

**不要重复**: Phase 1已覆盖的业务模式/护城河/竞争格局不重写。Phase 2聚焦**数字验证** — 用财务数据检验Phase 1的定性判断。

---

### 近期催化剂

- **April 29, 2026**: Q1 FY26 earnings (13天后) — GM 45%能否GAAP化? DRAM mix继续? F&L恢复?
- **May 11, 2026**: Analyst Day — 管理层target model bridge
