# MSFT Scout补充数据 — 分部财务 + CapEx周期 + Copilot + OpenAI
> 数据截止: 2026-02-17 | 来源: MSFT FY26 Q2 Press Release + FMP + WebSearch

---

## 任务1: FY26 Q2 分部数据 (截至2025-12-31)

### 1.1 三大分部收入 ($M)

| 分部 | Q2 FY26 | Q2 FY25 | YoY |
|------|---------|---------|-----|
| Intelligent Cloud | $32,907 | $25,544 | +29% |
| Productivity & Business Processes | $34,116 | $29,437 | +16% |
| More Personal Computing | $14,250 | $14,651 | -3% |
| **合计** | **$81,273** | **$69,632** | **+17%** |

**来源**: Microsoft IR Segment Revenues (FY26 Q2)

### 1.2 分部营业利润与利润率 ($M)

| 分部 | Q2 FY26 OI | Q2 FY26 OPM | Q2 FY25 OI | Q2 FY25 OPM | OPM变化 |
|------|-----------|-------------|-----------|-------------|---------|
| Intelligent Cloud | $13,873 | 42.1% | $10,851 | 42.5% | -0.4pp |
| P&BP | $20,599 | 60.3% | $16,885 | 57.4% | +2.9pp |
| More Personal Computing | $3,803 | 26.7% | $3,917 | 26.7% | 0.0pp |
| **合计** | **$38,275** | **47.1%** | **$31,653** | **45.5%** | **+1.6pp** |

**关键发现**: Intelligent Cloud利润率小幅下降(-0.4pp)，反映AI基础设施折旧加速。P&BP利润率大幅提升(+2.9pp)，表明Office/LinkedIn的规模效应优于预期。

**来源**: Microsoft IR Segment Revenues (FY26 Q2)

### 1.3 Azure增速

- **报告口径**: Azure及其他云服务收入增长 **39%** YoY
- **恒定汇率**: **38%** YoY
- 管理层指引: FY26 Q3 Azure CC增速31-32%（环比减速，因去年基数提升+产能约束持续至2026年6月）

**来源**: Microsoft FY26 Q2 Press Release

### 1.4 商业剩余履约义务 (CRPO)

- **总额**: **$625B** (同比增长 **+110%**)
- **去年同期**: ~$298B
- **上一季度(Q1 FY26)**: $392B (环比+59%)
- **预计12个月内确认收入比例**: ~25% (~$156B)
- **OpenAI占CRPO比例**: **~45%** (~$281B)
- **剔除OpenAI后CRPO**: ~$344B (同比增长 **+28%**)

**来源**: Microsoft FY26 Q2 Press Release + Constellation Research + Fierce Network

**分析要点**: $625B CRPO数字需谨慎解读。OpenAI的$250B Azure承购协议一次性推高了CRPO，但这笔交易更接近"关联方承诺"而非独立第三方合同。剔除OpenAI后的+28%增长仍然强劲但更真实。

### 1.5 资本支出

- **Q2 FY26 CapEx (PPE)**: **$29,876M** (vs Q2 FY25 $15,804M, +89%)
- **Q1 FY26 CapEx**: ~$35,000M (含finance leases)
- **FY25全年CapEx**: $64,551M
- **Finance leases vs PPE拆分**: 10-Q未单独披露finance lease additions（DATA GAP）
- **管理层CapEx指引**: FY26全年约$80B（Amy Hood: "roughly two-thirds in short-lived assets like GPUs/CPUs"）

**来源**: Microsoft FY26 Q2 Press Release + FMP cashflow data

### 1.6 折旧费用

| 季度 | 折旧摊销及其他 |
|------|---------------|
| Q2 FY26 | $9,198M |
| Q2 FY25 | $5,667M |
| YoY变化 | +62% |

- **FY25全年D&A**: $34,153M
- **Q2 FY26年化D&A**: ~$36,792M (按季度×4)
- **按分部拆分**: DATA GAP — 10-Q不单独披露分部折旧，但Intelligent Cloud承担主要份额

**来源**: Microsoft FY26 Q2 Press Release + FMP

### 1.7 OpenAI相关披露 (10-Q)

- **投资净收益**: Q2 FY26录得OpenAI投资净收益 **$7.6B**（vs Q2 FY25亏损$939M）
- **权益法核算**: $13B承诺投资中$11.6B已出资（截至2025年9月30日）
- **持股比例**: 约**27%**（稀释后as-converted），重组前32.5%
- **估值**: 投资估值约$135B (>10x回报)
- **收入共享安排**: 存在"reciprocal revenue-sharing arrangements"但披露不充分
- **Azure承购**: OpenAI承诺增购$250B Azure服务
- **API独占**: 合作开发的API产品Azure独占；非API产品可用其他云
- **ROFR丧失**: MSFT不再享有作为OpenAI计算提供商的优先认购权
- **IP使用**: MSFT可使用OpenAI IP（不含消费硬件）至2032年

**来源**: Deep Quarry Substack分析 + Microsoft/OpenAI官方博客

---

## 任务2: CapEx历史周期对比

### MSFT CapEx时间序列 (FMP数据, $B)

| 财年 | CapEx | YoY% | CapEx/Revenue | 备注 |
|------|-------|------|--------------|------|
| FY14 | $5.5B | — | 6.3% | Azure早期 |
| FY15 | $5.9B | +8% | 6.4% | Azure GA+扩张 |
| FY16 | $8.3B | +40% | 9.5% | **Azure加速建设** |
| FY17 | $8.1B | -3% | 8.3% | LinkedIn整合 |
| FY18 | $11.6B | +43% | 10.6% | **第二波扩张** |
| FY19 | $13.9B | +20% | 10.7% | 稳态扩张 |
| FY20 | $15.4B | +11% | 10.8% | COVID加速 |
| FY21 | $20.6B | +34% | 12.3% | 云需求爆发 |
| FY22 | $23.9B | +16% | 12.0% | 稳态 |
| FY23 | $28.1B | +18% | 13.3% | ChatGPT催化 |
| FY24 | $44.5B | +58% | **18.2%** | **AI CapEx激增** |
| FY25 | $64.6B | +45% | **25.0%** | **AI CapEx峰值?** |
| FY26E | ~$80B | +24% | ~26% | 管理层指引 |

**来源**: FMP cashflow endpoint (12年历史数据)

### 历史类比分析

**上一次大规模CapEx周期 (FY16-FY18)**:
- FY16 CapEx从$5.9B跳升至$8.3B (+40%)，标志Azure进入hyperscale阶段
- Azure收入增速: FY16 ~120% → FY17 ~93% → FY18 ~76%（逐年减速但绝对额激增）
- **投资回收**: Azure从2015年起约3-4年达到正向增量ROIC，到FY19 Intelligent Cloud利润率稳定在~35%+
- CapEx/Revenue从FY14的6.3%升至FY18的10.6%后趋于平稳

**当前AI CapEx周期 (FY24-FY26)**:
- CapEx/Revenue从FY23的13.3%→FY25的25.0%，**增幅远超上一周期**
- ROIC已从FY20的43.4%下降至FY25的23.8%（已腰斩）
- **关键差异**: 上次周期CapEx/Revenue增量仅4pp (6%→10%)，当前周期增量12pp (13%→25%)
- **投资回收估算**: 若参照上次3-4年回收期，当前周期可能需要至FY28-FY29才能见到ROIC触底回升

**DATA GAP**: FY14-FY16按分部的CapEx拆分（当时分部结构不同），无法精确量化"Azure专属CapEx"占比。但从D&A增速推断，Azure基础设施占当时CapEx的50-60%。

---

## 任务3: Copilot详细指标

### 3.1 渗透率与用户数

- **付费座位数**: **1500万**（截至Q2 FY26，2026年1月28日披露）
- **商业M365总用户**: ~4.5亿付费座位
- **渗透率**: **3.3%** (15M / 450M)
- **YoY座位增长**: **+160%+**
- **DAU增长**: 同比**10倍**
- **人均对话数**: 同比**翻倍**
- **Fortune 500采用率**: 70%的Fortune 500公司"已采用"（注意：采用≠全面部署）

**来源**: The Register + Microsoft FY26 Q2 Earnings Call

### 3.2 ARPU与收入

- **标价**: $30/用户/月 (M365 Copilot商业版)
- **实际ARPU**: DATA GAP — 管理层未披露有效ARPU。大客户批量折扣可能使实际ARPU显著低于$30
- **年化收入估算**: 15M座位 × $30 × 12 = ~$5.4B run-rate (上限)
- **实际收入贡献**: DATA GAP — 未单独拆分。$5.4B约占MSFT总年收入的2%
- **管理层表态**: CFO Amy Hood强调关注"gross margin profile and lifetime value"而非短期货币化，暗示Copilot目前仍在投入期

**来源**: The Register + Stackmatix + Computerworld

### 3.3 企业vs个人拆分

- **企业**: 主要采用者，大企业pilot阶段居多，未全面推广
- **个人/消费者**: Copilot Chat对大量M365用户免费开放，付费转化率仅3.3%
- **续约率/留存率**: DATA GAP — 管理层未披露。关注点：pilot结束后是否转为全面部署

### 3.4 分析要点

以1500万座位计，即使100%按$30收费，Copilot年化收入($5.4B)也仅占MSFT总CapEx($80B)的6.75%。Copilot要证明AI CapEx合理性，需要在2-3年内将渗透率从3.3%提升至15-20% (约6750-9000万座位)，或者通过Azure AI消耗模式实现更大规模的间接货币化。

---

## 任务4: OpenAI关系条款

### 4.1 投资结构

| 项目 | 详情 |
|------|------|
| **累计投资承诺** | $13B |
| **已出资** | $11.6B（截至2025年9月30日） |
| **会计处理** | 权益法（equity method） |
| **持股比例** | ~27% as-converted diluted (重组后) |
| **估值** | ~$135B（>10x回报） |
| **性质** | 混合结构：早期为"capped profit interest"，2025年10月重组为PBC equity |

**来源**: Microsoft 10-Q + Deep Quarry分析

### 4.2 API独占条款

- **Azure API独占**: 合作开发的API产品在Azure独占提供
- **非API产品**: 可在其他云平台部署（2025年10月新条款）
- **IP使用权**: MSFT可使用OpenAI IP（不含消费硬件）至**2032年**
- **AGI条款变更**: MSFT不再因OpenAI宣布AGI而失去权利（旧条款下AGI会触发权利终止）
- **MSFT独立AGI权利**: MSFT可独立或与第三方合作追求AGI
- **ROFR取消**: MSFT不再享有优先认购权（重大让步）

**来源**: Microsoft/OpenAI官方博客 (2025-10-28)

### 4.3 CRPO中OpenAI占比

| 指标 | 数据 |
|------|------|
| **总CRPO** | $625B |
| **OpenAI占比** | **~45%** (~$281B) |
| **OpenAI承购金额** | $250B Azure增量承诺 |
| **剔除OpenAI后CRPO** | ~$344B (+28% YoY) |
| **12个月内确认** | ~25% (~$156B) |

**来源**: Constellation Research + Yahoo Finance + Fierce Network

### 4.4 OpenAI独立/转向风险

**如果OpenAI独立或转向的影响**:

1. **CRPO冲击**: $625B CRPO中~45%来自OpenAI，若承诺不兑现，CRPO瞬间缩水$281B
2. **Azure收入**: OpenAI是Azure最大单一客户，但具体收入贡献未披露（DATA GAP）。估算OpenAI当前Azure消耗$3-5B/年
3. **投资损失**: $13B投资的权益法损益直接受OpenAI盈亏影响。Q2 FY26的$7.6B收益主要来自估值重估，并非经营性收益
4. **IP风险**: 2032年前MSFT可使用OpenAI IP，但若关系恶化，IP使用可能受限
5. **竞争替代**: MSFT已与Anthropic等建立备选关系，降低单一依赖风险

**关键缓释因素**: 即使剔除OpenAI，$344B CRPO仍同比增长28%，说明MSFT Azure的有机需求依然强劲。

---

## DATA GAP汇总

| 数据点 | 重要性 | 原因 |
|--------|--------|------|
| Finance lease vs PPE CapEx拆分 | 高 | 判断短期vs长期资产结构，影响折旧预测 |
| 分部折旧明细 | 高 | 精确计算Intelligent Cloud真实利润率趋势 |
| Copilot实际ARPU | 高 | $30标价vs批量折扣后的真实单位经济学 |
| Copilot续约率/留存率 | 高 | 判断3.3%渗透率是否可持续扩展 |
| OpenAI Azure消耗金额 | 高 | 量化OpenAI对Azure收入的真实贡献率 |
| Copilot独立收入贡献 | 中 | 评估AI货币化进展 |
| FY14-16分部CapEx拆分 | 中 | 历史类比精度受限 |
| OpenAI revenue-sharing具体条款 | 中 | 理解双向收入流的真实经济影响 |
