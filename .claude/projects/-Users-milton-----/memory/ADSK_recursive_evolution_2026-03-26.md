---
name: ADSK v1.0→v2.0 递归进化记录
description: ADSK深度分析递归进化——密度vs广度tradeoff+回购η发现+5个EVO候选。适用于所有SaaS深度报告。
type: project
---

## ADSK v1.0 (2026-03-26) → v2.0升级 递归进化

### 报告核心数据
- **评级**: 中性关注(+1.3%) | Standard PW $232 / Owner PW $193
- **质量**: v1.0 85/110(3.86) → v2.0 97/110(**4.41**) | +12分
- **产出**: 195K / 794 DM / 28 Mermaid / DM密度4.06/千字(历史最高)

### 3个可泛化的方法论发现

**发现1: 回购η效率——高SBC公司的回购"幻觉"**
- ADSK η=0.11(SaaS最低): $5.2B回购中72%用于SBC抵消,仅$596M真实价值创造
- **Why:** SBC/Rev 10.9%意味着每年新增~16M RSU vest股,回购~22M中仅6M是净缩减
- **How to apply:** 所有SBC>8%的SaaS公司,η计算应成为B6评分的必做项。η<0.3=回购无效,B6 cap at 3.0/5

**发现2: GRR交叉验证v2(DR变化率法)**
- 方法: Current DR增速 vs Revenue增速的gap→GRR信号(-2pp/年gap=GRR约96%)
- **Why:** ADSK/DDOG等不披露GRR的公司→NRR倒推法有2-3pp误差(可能高估GRR)
- **How to apply:** Phase 2财务分析中,对不披露GRR的SaaS强制执行DR变化率法交叉验证。GRR是NRR的"底层组件"——高估GRR→高估增速→高估估值

**发现3: Win Rate代理(G2/Gartner法)**
- 方法: G2评分+review量+Gartner Peer Insights→Win Rate代理
- **关键洞见**: review量差异(Revit 929 vs ArchiCAD ~200)比评分差异(4.6 vs 4.2)更有信息量→市场份额与review量正相关
- **How to apply:** 当公司不披露Win Rate时(大多数不披露),G2/Gartner作为代理。但要区分"满意度Win Rate"(谁的产品更好)vs"市场Win Rate"(谁卖得更多)——ADSK Revit两项都赢

### 5个EVO候选(待审批)

| ID | 标题 | 影响范围 | 优先级 |
|----|------|---------|:------:|
| EVO-ADSK-01 | SBC瀑布驱动因素分解模板化 | 所有SaaS | P1 |
| EVO-ADSK-02 | GRR间接验证v2(DR变化率法) | 不披露GRR的SaaS | P1 |
| EVO-ADSK-03 | Win Rate代理(G2/Gartner) | 所有B2B/SaaS | P2 |
| EVO-ADSK-04 | 护城河迁移S曲线模板 | 护城河迁移公司(ADBE/CRM等) | P2 |
| EVO-ADSK-05 | 圆桌CQ<70%自动触发 | 所有Tier 3 | P2 |

### 密度vs广度——框架层面的开放问题

ADSK v1.0暴露了一个系统性tension: DM密度4.06/千字(最高)但G1字符195K(72%)。
- **选项A**: 降低G1字符阈值(270K→220K)但提高DM密度门控(1.5→2.0/千字)→奖励高密度报告
- **选项B**: 维持G1 270K但允许"密度豁免"(DM>3.0/千字时G1门控放宽至200K)
- **选项C**: 不改变——接受有些报告是"密度型"有些是"广度型"

**建议**: 选项B最合理——用密度补偿广度,但设下限(200K)防止报告太短遗漏维度。

### ADSK v2.0如果重做的核心改进

1. 从第一个session开始就做"论点展开"而非"结论+数据"风格→解决D8
2. SBC经济学单独成章(合并4处)→去重+增加深度→解决D3
3. M&A ROIC用Python量化(Innovyze增量ROIC)→解决M10
4. 圆桌在Phase 3.8自动执行→解决D9
5. Phase 1 Part II-A(15K)需要扩展至25K+(业务深潜太薄)→解决G1
