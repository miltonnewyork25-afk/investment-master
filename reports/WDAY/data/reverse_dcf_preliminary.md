# WDAY Reverse DCF 初步分析 (Phase 0)
> 铁律O: Reverse DCF必须P1前置 | 先算市场在赌什么

## 当前市场定价
- **股价**: $127.07 (2026-03-25)
- **市值**: $33.7B
- **EV**: $48.2B (加净债务$2.3B+operating leases$0.7B)
- **FY2026 FCF**: $2.78B
- **FY2026 Revenue**: $9.55B

## Reverse DCF: 市场隐含什么?

### 方法: 从当前股价反推隐含增速和利润率

**假设框架**:
- WACC: 10% (SaaS行业典型, Beta 1.17)
- 终端增速: 3%
- 预测期: 10年

### 场景A: 用FCF反推
当前EV/FCF = 17.4x → 隐含FCF CAGR约5-7%/10年

**但这远低于分析师预期**:
- FY2026 FCF: $2.78B
- FY2028E FCF (隐含): ~$3.2-3.5B (5-7% CAGR)
- 分析师FY2028E Revenue $11.87B × FCF margin 30% = $3.56B

**结论**: 市场定价隐含FCF增长显著低于卖方共识(5-7% vs ~12%)

### 场景B: 用Revenue反推
EV/Sales = 5.0x
如果假设终端EV/Sales 4.0x (成熟SaaS), WACC 10%, 终端增速3%:
→ 隐含10年Revenue CAGR约8-9%

**对比**: FY2027指引12-13%, FY2026实际13.1%。市场在赌增速从13%→8%(5年后)。
**这合理吗?** SaaS增速随规模下降是常态。但8%对于HCM#1+FM第二曲线可能偏悲观。

### 场景C: 用EPS反推
- Forward PE (FY2028): 10.2x (基于$12.42 EPS)
- 如果给20x PE (保守SaaS估值) → 隐含FV = $248 (+96%)
- 如果给15x PE → 隐含FV = $186 (+47%)
- 如果给10x PE → 隐含FV = $124 (-2%, 当前水平)

**市场隐含信念**: EPS $12.42不可信, OR SaaS应该给10x PE (历史极端低位)

## 市场在赌什么? (信念集)

### 市场隐含的负面信念:
1. **增速继续大幅下滑**: 12-13%→8%→5%(5年后) — 成熟期定价
2. **SBC不会充分收敛**: Owner PE不改善,真实盈利远低于Non-GAAP EPS
3. **AI是净负面**: AI-native HR工具可能颠覆/seat reduction蚕食收入
4. **宏观永久折价**: 科技股整体重估,SaaS溢价消失
5. **竞争加剧**: SAP/Oracle/AI-native挤压市占率

### 如果市场错了(潜在上行):
1. **增速触底反弹**: FM交叉销售+SAP ECC迁移→增速回升至15%+
2. **SBC按模型收敛**: 17%→12%(FY2030) → Owner PE大幅改善
3. **AI是净正面**: Illuminate驱动upsell+定价提升
4. **回购持续**: FY2026 $2.9B回购→3-4%年缩股→EPS加速

## P1叙事约束 (铁律O)

**Reverse DCF暗示**: 市场在赌"成熟+减速",不是"崩溃"也不是"增长"。
→ **P1叙事不能比"中性偏积极"偏离>1档**
→ 如果P1结论是"显著低估"(>+30%)→需要非常充分的证据链(反驳市场5个负面信念中的≥3个)
→ 如果P1结论是"合理估值"→与市场一致,需解释为什么市场是对的

## 重大事件: CEO更换+Morningstar下调 (需纳入估值)

**2026年2月9日CEO更换**: Eschenbach辞职→Bhusri回归
- **短期影响**: 不确定性↑ (战略方向调整期)
- **长期影响**: 可能积极(创始人效应:Jobs回Apple, Schultz回星巴克)
- **估值含义**: 增加6-12个月执行不确定性折价(~5-10%)

**Morningstar Wide→Narrow Moat下调**:
- **影响**: 机构投资者可能被迫降权重(wide moat基金可能卖出)
- **我们评估**: GRR 97%仍然极强,AI颠覆论需要更多证据
- **估值含义**: 目标PE可能需要折价5-10%(从SaaS premium到SaaS average)

## 最相似可比对标 (铁律H)

**CRM (Salesforce)**: 增速~9%, EV/Sales 5.1x, SBC/Rev 8.5%
**WDAY vs CRM**: WDAY增速更快(13% vs 9%), SBC更高(17% vs 8.5%), EV/Sales几乎一样(5.0x vs 5.1x)

**含义**: 市场认为WDAY的高SBC完全抵消了增速优势。如果SBC收敛到CRM水平(~10%)→WDAY应该比CRM有溢价(因增速更快)。这是潜在Alpha来源。

**NOW (ServiceNow)**: 增速~22%, EV/Sales 11.9x, SBC/Rev 14.7%
**NOW vs WDAY**: NOW增速1.7x但EV/Sales 2.4x → 增速溢价是非线性的。WDAY如果增速回升→估值弹性大。
