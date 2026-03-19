# Phase 1 数据修正记录
> 基于Python审计发现的3个问题 + 2个口径风险
> 日期: 2026-03-19

## 修正1: ROIC口径统一 [CRITICAL]

**问题**: 报告多处引用"ROIC 8.2%"但未标注计算方式。FMP有两个不同ROIC:
- key-metrics: 8.23% — 实为NI/(Equity+Debt-Cash)=Return on Total Capital
- baggers_summary: 20.98% — 标准NOPAT/Avg Invested Capital

**修正**:
- 全报告统一使用"资本回报率"术语，区分两个口径:
  - **ROTC (Return on Total Capital)**: NI/(权益+债务-现金) = **8.1%** — 衡量全部资本(含杠杆)的回报
  - **ROIC (Return on Invested Capital)**: NOPAT/Avg IC = **21.0%** — 衡量经营资本的回报
- ROTC 8.1%更适合UNH(因为保险公司的float/准备金使标准ROIC被高估)
- 每次引用时标注口径: "ROTC 8.1%(NI/总资本)" 或 "ROIC 21.0%(NOPAT/经营资本)"
- Ch9中的"ROIC从14.3%→8.2%"应改为"ROTC从14.3%→8.1%"或解释口径

**影响**: 不改变分析结论(两个口径都在下降)，但精度提升

## 修正2: MCR敏感性模型校准 [CRITICAL]

**问题**: MCR模型在88.9%时输出EPS=$19.61，而实际GAAP EPS=$13.23，差$6.38

**根因分析**:
- 模型用Optum **adj** OP $12.1B → 实际GAAP仅$9.5B (差$2.6B)
- 模型UHC admin假设$22B偏低 → 实际UHC总opex可能更高
- 模型税率22%但FY2025实际有效税率仅12.9%(因Q4大额税收抵免)
- 模型不含少数股东权益扣除

**修正**:
- MCR敏感性表标注: "正常化EPS(假设: Optum adj利润$12.1B, 有效税率22%, 不含一次性charges)"
- 增加注释: "FY2025 GAAP EPS $13.23低于模型因含$2.7B一次性charges+异常低税率"
- 增加第二列"GAAP EPS"使用GAAP Optum OP $9.5B + 实际税率
- 模型的核心用途是MCR变化的**边际敏感性**(每100bps=$2.96)，不是绝对水平预测

**影响**: MCR边际敏感性($2.96/100bps)仍有效——这是模型的核心产出

## 修正3: 消除金额 $168B → $173.4B [LOW]

**问题**: 报告多处引用"$168B消除/27%内部交易"，但分部收入加总得$173.4B/27.9%

**修正**:
- 统一为"~$173B消除(28%)"
- 来源标注: "计算值: 分部收入合计$621.0B - 合并$447.6B = $173.4B"
- $168B来自staging/segment_data.md的早期估计，应更新

## 修正4: P/E口径标注 [HIGH]

**问题**: 报告中出现3个P/E: 21.5x(Price/GAAP EPS), 24.9x(FMP ratios, 用NI cont ops), 17.4x(Price/Adj EPS)

**修正**:
- 主口径: **P/E(GAAP) 21.5x** = $284.33 / $13.23 — 用于同业对比(CI/ELV也用GAAP)
- 辅助口径: **P/E(Adj) 17.4x** = $284.33 / $16.35 — 用于正常化估值
- FMP ratios的24.9x使用了NI from continuing ops($12.8B含少数股东)口径，不采用
- 每次引用P/E时标注(GAAP)或(Adj)

## 修正5: 身份折价精度 -22pp → -20pp [LOW]

**问题**: 用Adj P/E 17.4x计算得身份折价-19.8pp，报告引用-22pp(基于初始GAAP P/E 17x估算)

**修正**: 统一为"-20pp(±2pp)" — 精度到整数即可，不影响结论方向

## 需要在各章节修改的位置

| 章节 | 修改内容 | 优先级 |
|------|---------|--------|
| Ch1 | P/E标注(GAAP)/(Adj) | HIGH |
| Ch2 | 身份折价-22pp→-20pp | LOW |
| Ch5 | 消除$168B→$173B | LOW |
| Ch6 | SOTP表头增加"独立状态"标注 | MEDIUM |
| Ch7 | MCR敏感性增加"正常化"标注 | HIGH |
| Ch9 | ROIC→ROTC + 口径标注 | CRITICAL |
| Ch12 | CI-01身份折价-22pp→-20pp | LOW |
| financial_data_10yr | ROIC行增加口径说明 | CRITICAL |
