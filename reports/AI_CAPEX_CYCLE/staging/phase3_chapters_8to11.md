# AI 基建资本循环审计 — 第 8-11 章 + 收尾

**报告日期**: 2026-04-29
**框架版本**: v3.6R(本章正式启动 v3.7 升级建议)
**S4 字数目标**: ~20K 字, 完成 80K 字总目标

---

## 第八章 — 交易转化:叙事如何变成 ETF / 杠杆 ETF / Calls?

### 8.1 ETF 资金流的当期极端值

2026 年 4 月将作为半导体 ETF 历史上最重要的一个月被记录。当期数据(2026-04-29):

**SMH (VanEck Semiconductor ETF)**:
- AUM: $53.7B(史上最高)
- 4 月 inflow: **$3.4B**(单月历史最高 — 超过任何 2024 / 2025 单月)
- 4 月 perf: +21.91%(自 2003 年 11 月以来最大单月涨幅)
- 持仓集中度: NVDA 21% + TSM 13% + AVGO 10% + AMD 5% + ASML 5% = top 5 占 54%

**SOXX (iShares Semiconductor ETF)**:
- AUM: $27.8B
- 4 月 inflow: **$2.05B**(>2x 历史月度记录)
- 4 月 perf: **+28.77%**(25 年历史最大单月涨幅)
- 持仓集中度: NVDA 9% + AMD 9% + AVGO 9% + INTC 7% + QCOM 7% — 比 SMH 更分散

**SOXL (Direxion 3x Leveraged Semi ETF)**:
- AUM 估算 $13-15B(待 Direxion 直接披露)
- 4 月 perf: 估 ~+85-90%(基于 SOXX +28.77% × 3x daily reset, 含 path-dependency 损失 -5-10%)
- 持有人结构: 散户占比估 ~70%(基于 Robinhood / Schwab retail 持仓数据)

**NVDL (GraniteShares 2x Long NVDA Daily ETF)**:
- AUM: **$4.23B**(从 2024 年初的 ~$0.5B 增长 8x)
- 1 年总回报: **+185.12%**
- 4 月 perf: 估 ~+25-30%(基于 NVDA 4 月 ~+15% × 2x)
- 关键设计警告: "1- to 5-day time horizons", 散户长期持有 = 路径依赖严重损耗

**TSLL (Direxion 1.5x TSLA)**: AUM 估 $1-2B, 跟随 TSLA 波动

**主题 ETF (AIQ / BOTZ / IRBO)**:
- AIQ AUM ~$3B / BOTZ AUM ~$2B / IRBO AUM ~$0.4B
- 整体规模仍小, 但增速快

### 8.2 SMH+SOXX 联合 inflow 史上最大的解读

$5.45B 单月联合 inflow 是什么概念?

历史对比:
- 2021 年 11 月(SOXX 历史前峰)单月 ~$1.5B
- 2024 年 6 月(NVDA Blackwell 公告后)~$2B
- **2026 年 4 月: $5.45B = 之前峰值 2.7-3.6x**

资金来源拆解(估算):
- 主动基金 benchmark pressure: ~30% (基金被迫追逐 NVDA / AVGO / TSM)
- 配置型 ETF 资金: ~25% (从 broad market ETF rebalance 到 sector ETF)
- 散户 ETF 配置: ~25% (从单股 / margin 转入)
- 机构 quant / momentum: ~15% (price momentum 触发)
- 401k / 长期资金: ~5%

**关键判断**: 这不是单一散户疯狂, 是**多渠道 ETF 资金集中流入**。这种结构比 2021 GameStop / SPAC 顶部更难预测顶部时机, 因为机构资金 + benchmark pressure 比纯散户更有粘性。

### 8.3 NVDL 单股杠杆 ETF 的反身性

NVDL 是 v3.6R 框架"抽象化风险"评分的极端样本。

**抽象化层级**(v3.6R 定义):
- L1 个股: NVDA — 投资者直接看公司基本面
- L2 普通 ETF: SMH/SOXX — 行业篮子, 成分复杂
- L3 主题 ETF: AIQ/BOTZ — 叙事篮子, 标签化
- L4 杠杆 ETF: SOXL/USD — 波动路径
- **L5 单股杠杆 ETF: NVDL — 单一公司 + 杠杆 + 路径依赖, 最高事件风险**
- L6 期权 weekly: 时间 + 波动率 + 方向, 归零风险

NVDL AUM 增长曲线:
- 2024 年初: ~$0.5B
- 2024 年末(NVDA 第一波涨): ~$1.5B
- 2025 年末: ~$2.8B
- 2026 年 4 月: **$4.23B**

NVDL 持有人结构(估):
- 散户 70%(主要 Robinhood / Schwab / Fidelity 个人账户)
- 主动 trader / hedge fund 短期 20%
- 量化套利 10%

**反身性机制**:
1. NVDA 上涨 → NVDL 跟涨(2x daily)
2. NVDA 涨幅吸引散户买 NVDL → NVDL 资金流入
3. NVDL 资金流入需要 buy NVDA 期货或股票 → **NVDA 进一步上涨**
4. 进入正反馈循环(放大)

**反身性破裂触发条件**:
1. NVDA 短期 -10%+ 单日跌(NVDL -20%, 散户恐慌赎回)
2. NVDL 赎回需要 sell NVDA 期货 → NVDA 进一步下跌
3. 进入负反馈(去杠杆)

NVDL 当前 AUM $4.23B 占 NVDA 市值 $5.4T 的 ~0.08% — 看起来小, 但**短期波动放大效应**远超 0.08%(因为 dealer hedge 在期货市场放大)。

### 8.4 NVDA 期权链当期审计

NVDA 期权数据(2026-04-29):
- Trailing P/E: 41.5x
- Forward P/E: **24.2x**
- OI Put/Call ratio: 0.84(<1 偏多, 但**不极端**)
- 30 日 IV (calls): **0.4320**(年化 IV ~43%, 中等水平)
- 30 日总 IV: 33.59
- Volatility skew: 待查 OptionCharts 实时数据

**v3.6R "极端拥挤"信号要求**:
- Weekly call OI / 总 OI > 50% — 当期估 ~35-40%(中等)
- Top 3 strike OI 集中度 > 60% — 当期估 ~45%(中等)
- IV percentile vs 财报 > 90 — 当期估 ~60%(中等)
- Dealer gamma 历史新高 — 当期未确认
- Put-call OI ratio < 0.4 — 当期 0.84(**远不极端**)
- 0DTE 占当日成交 > 30% — 当期估 ~20%(中等)

**关键观察**: NVDA 期权层面**没有极端拥挤信号**, 与 ETF 层面($5.45B 史上最大)形成对比。这说明:
- 散户主要通过 ETF / 杠杆 ETF 路径(SMH/SOXX/SOXL/NVDL)
- 期权拥挤还在中等水平, 没有进入 weekly call 疯狂阶段
- **比 2021 年 meme stock 顶部时的 GME / AMC 期权疯狂温和很多**

这是**当期不是泡沫破裂前夜**的关键支持证据之一。

### 8.5 LRS retail / institutional 拆分(v3.7 新增)

v3.6R 框架原本 LRS 把 ETF 和 margin debt 混合算。新角度 #5 发现两者方向相反:
- FINRA margin debt: 2026-01 顶 $1.28T → 2026-03 $1.22T(-4.5%, 连降 2 月)
- ETF flow: SMH+SOXX 4 月 $5.45B 史上最大

**v3.7 拆分**:

**LRS-retail**(散户层杠杆):
- 子项: margin debt MoM + 单股杠杆 ETF AUM + 0DTE 占比 + 散户 sentiment
- 当期评分: **55**(margin debt 退潮抵消 NVDL 增长)
- 趋势: 中等 - 略下降

**LRS-institutional**(机构层杠杆):
- 子项: 主流 ETF flow + 主动基金 AI 集中度 + benchmark pressure + 13F 持仓变化
- 当期评分: **80**(SMH+SOXX 4 月历史新高 + 主动基金被迫追)
- 趋势: 急升

**背离信号解读**:
- 健康解读: 散户从高风险(margin)转到中等风险(ETF), 整体 risk profile 改善
- 危险解读: 机构 benchmark pressure 已经接近上限, 一旦机构资金流转向, 跌势会比纯散户主导更快(因为机构被迫卖)

**历史对比**:
- 2000 年 dot-com 顶部: 散户和机构同步加杠杆, 同步崩盘
- 2007 年: 机构杠杆(financials)远高于散户
- 2021 年: 散户杠杆(margin/options)远高于机构
- **2026 当期: 罕见的"散户降杠杆 + 机构加杠杆"**, 历史无直接可比

**判断**: LRS-institutional 80 是 LRS 的核心警告, 但因为是**机构被动 benchmark 追逐而非主动投机**, 不会出现 2021 GameStop 类的瞬间逆转。崩盘路径更可能是**慢退潮**而非**急崩**。

### 8.6 期权 / 杠杆层综合评估

| 工具层 | 当期热度 | 风险 | 监控指标 |
|------|--------|------|---------|
| 个股 NVDA | 高(forward PE 24.2x) | 中 | Q2 2026 财报 / Blackwell 之后产品代际 |
| 普通 ETF SMH/SOXX | **极高** ($5.45B 史上最大) | 中-高 | 5 月 inflow 是否回落 |
| 主题 ETF AIQ/BOTZ | 中 | 中 | AUM 增速 |
| 杠杆 ETF SOXL | 高(估 ~$15B AUM) | 高 | 路径依赖损耗 |
| 单股杠杆 NVDL | 高($4.23B AUM) | 高 | NVDA 短期波动放大 |
| 期权 weekly call | 中 | 中 | weekly OI / IV / 0DTE |

**8 档动作建议**(对应 v3.6R 投资动作矩阵):

| 动作档 | 资产 |
|------|------|
| 1. 继续持有(全仓) | 一阶 NVDA/AVGO/TSM/SK Hynix(对长期 holders) |
| 2. 减仓但保留 60-80% | NVDA(若已持有 +335% 1 年)/ AVGO 部分 |
| 3. 只观察不加仓 | SMCI / 二线半导体 / 主流 ETF SMH+SOXX |
| 4. 等待财报验证 | COHR(5/6 Q3) / TER (5 月) / KEYS / VEEV |
| 5. 等待估值回落 | INTC(等下一波 -30%+ 回调)/ META |
| 6. **回避杠杆 ETF** | SOXL / NVDL / TSLL / FNGU |
| 7. 买入被错杀非 AI 复利 | **MCO -23% / CPRT / ISRG / MSCI(部分回调)** |
| 8. 保留现金等待泡沫破裂后 | **10-20% 现金仓位准备** |

---

## 第九章 — 标的双阶段表 + 4 档警报

### 9.1 双阶段判定原理

v3.6R 框架要求每个标的同时报告:
- **产业阶段**: 该公司业务自身处于的阶段(基于 FRS/BDS/POS)
- **市场阶段**: 市场对该公司的交易/叙事/估值阶段(基于 NCI/TIS/LRS/PVS/FDS)

两者**不合并**。错位是关键警告。

S 阶段定义:
1. 真实早期增长 / 冷门研究
2. 真实增长 + 估值前置 / 投资叙事
3. CapEx 军备竞赛 / Ticker 化
4. 叙事主流化(ticker 化) / ETF 化
4.5. **Earnings-Validated Diffusion** ⭐ / 配置拥挤
5. ETF 化扩散 / 杠杆化加速
6. 杠杆化加速 / 信仰化
7. 基本面放缓但叙事仍热 / 脆弱化
8. 去杠杆 / 错杀

### 9.2 16 家公司双阶段表 + 4 档警报

| Ticker | 产业阶段 | 市场阶段 | 错位 | FRS | EVI | NCI | LRS | FDS | 警报 | 投资动作 |
|--------|--------|---------|------|-----|-----|-----|-----|-----|------|---------|
| **NVDA** | S2-S3 真实增长 + 部分军备 | S5-S6 ETF + 杠杆化 | 中 | 88 | 88 | 80 | 75 | +20 | 🟡 Yellow | 持有不加仓 |
| **AVGO** | S2 真实增长 | S5 ETF 化 | 中 | 85 | 90 | 75 | 65 | +15 | 🟡 Yellow | 持有, ASIC 故事仍真 |
| **TSM** | S2 真实(CoWoS 限制) | S3-S4 ticker 化 | **小** | 90 | 90 | 60 | 50 | +5 | 🟢 Green | **健康扩散, 深挖** |
| **SK Hynix** | S2 真稀缺(sold out) | S3 ticker 化 | **小** | 92 | 95 | 55 | 45 | -5 | 🟢 Green | **被低估, 深挖** |
| **AMD** | S2-S3 追赶 | S4 ETF 化 | 中 | 75 | 70 | 65 | 60 | +10 | 🟡 Yellow | 持有, 等 Q1 confirm |
| **MSFT** | S2-S3 真实 + 战略 | S5 配置拥挤 | 中 | 85 | 85 | 70 | 70 | +15 | 🟡 Yellow | 持有不加仓 |
| **GOOGL** | S2-S3 真实 + 受 AI 蚕食 | S5 配置拥挤 | 中 | 80 | 75 | 70 | 70 | +20 | 🟡 Yellow | 持有, 等搜索数据 |
| **AMZN** | S2 真实 + Q1 FCF 警告 | S5-S6 配置 + 杠杆 | 中-大 | 70 | 65 | 70 | 70 | +25 | 🟠 Orange | 持有但减仓 20% |
| **META** | S1-S2 AI 战略 + 商业化未验证 | **S5-S6 信仰化早期** | **大** | 40 | 35 | 75 | 75 | +50 | 🟠 Orange | **回避追涨** |
| **TSLA** | S1 多业务未商业化 | **S6-S7 信仰化 → 脆弱化早期** | **极大** | 30 | 20 | 80 | 85 | +60 | 🔴 Red | **回避** |
| **INTC** | **S1-S2 修复 unverified** | **S5-S6 反转叙事 + 杠杆化** | ⭐⭐ **极大** | 35 | 40 | 78 | 75 | +70 | 🔴🔴 Red | **避开**(v4.4 -69% downside) |
| **FORM** | S2 真实增长 | S3-S4 ticker 化早期 | **小** | 78 | 82 | 55 | 45 | +5 | 🟢 Green | **深挖, 不追高** |
| **VIAV** | S2 真实 + Spirent 整合 | S2-S3 evidence-seeking | **极小** | 72 | 78 | 50 | 40 | -3 | 🟢 Green | **深挖验证, 最佳错位** |
| **SMCI** | S2-S3 收入但 GM 塌陷 | S5-S6 narrative 仍强 | **大** | 45 | 55 | 70 | 75 | +45 | 🟠 Orange | **回避追涨** |
| **VRT** | S2 真实增长 + Backlog | S4 ticker 化 + ETF | 中 | 82 | 88 | 65 | 55 | +10 | 🟡 Yellow | 深挖, 等回调 |
| **COHR** | S2 真实(book-to-bill 4x) | S2-S3 evidence-seeking | **小** | 70 | 75 | 55 | 45 | +5 | 🟢 Green | **等 5/6 confirm 后深挖** |

**关键观察**:
- **错位极大区(警告级)**: INTC / TSLA / META — 都是类型 B 叙事提前
- **错位最小区(健康)**: VIAV / SK Hynix / TSM / FORM / COHR — 都是类型 A 真验证, 市场尚未充分定价
- **错位中等(中性)**: NVDA / AVGO / AMD / MSFT / GOOGL — 一阶+大型 hyperscaler, 已经被市场充分认识

### 9.3 4 档警报当期分布

| 警报 | 数量 | 标的 |
|------|------|------|
| 🟢 Green(深挖 / 建仓候选) | 5 | TSM / SK Hynix / FORM / VIAV / COHR |
| 🟡 Yellow(持有不追) | 6 | NVDA / AVGO / AMD / MSFT / GOOGL / VRT |
| 🟠 Orange(停止追涨, 减 beta) | 3 | AMZN / META / SMCI |
| 🔴 Red(减仓, 防传染) | 2 | INTC / TSLA |

**5/16 = 31%** 在 Green 区是积极信号 — AI 基建仍有未充分定价的优质标的。**3/16 + 2/16 = 31%** 在 Orange/Red 区是警告信号 — 反转叙事 + 战略防御股已经过度定价。

### 9.4 INTC 双阶段错位深度分析

INTC 是当期错位最尖锐的案例, 值得单独深入:

**产业阶段评估**(S1-S2 修复 unverified):
- DCAI Q1 +22% YoY 是真实数字, 但单季度无法 confirm trajectory(INTC v4.4 明确指出)
- Foundry external $174M 季度 = 年化 $696M, 远低于"5 年累计 $20B+"市场假设的 75%+ 差距
- ROIC 1-4% < WACC 8%, **负经济利润持续 3 年**(INTC v4.4 数据)
- 18A yield 仍未公开数字 confirm

**市场阶段评估**(S5-S6 反转叙事 + 杠杆化):
- 股价 13 月 $19 → $82.57 涨 +335%
- "agentic CPU bottleneck" 叙事 + "Intel reverse" 双叙事并存
- INTC 期权拥挤度抬升(Foundry external 突破被预期 priced in)
- 散户(WSB)和机构(部分 momentum fund)同时追

**错位的财务表达**:
- INTC v4.4: today PV 中位 $25.5(SOTP $4-18 / DCF $23-28 / Peer multiple $20-38, 三方法 cross-validate)
- 当前股价 $82.57 隐含 -69% downside
- 即使 Bull case 概率从 12.5% 上修到 20%(agentic CPU partial validation), today PV 仅升至 $28(仍 -66% gap)

**为什么市场仍买**:
- Trump 政府 10% 持股 + 政府 puts 心理
- agentic CPU narrative 跨平台传播(Morgan Stanley 框架图 + Georgia Tech 论文)
- DCAI +22% 单季"5 年最强"被外推为 trajectory 转折
- 反转股 momentum 吸引 retail / momentum fund

**v3.6R 框架判定**: INTC 是**类型 B 叙事提前的极端样本**, 错位 5 年内消解的两种路径:
1. INTC 真兑现 multiple bull triggers → today PV 上修到 $50+(概率 5-10%)
2. INTC 单季反弹 fail / Foundry 推迟 → 股价 -40-60% 回到 today PV 区间(概率 60-70%)
3. 维持横盘 / 慢消化 → 股价 5 年内 -20-30%(概率 20-30%)

**期望路径加权**: -45 to -55% over 5 years, 与 INTC v4.4 的 -59% 5-year expected return **一致**。

---

## 第十章 — 泡沫破裂路径与错杀机会(关键章)

### 10.1 三种破裂路径

如果 AI 基建反身性循环过热, 破裂路径有三种, 对投资组合的影响截然不同:

**路径 A: 慢退潮**(概率最高, 估 60%)
- 触发: 任一 hyperscaler 2027 CapEx 指引下调 10%+
- 顺序: 一阶供应链订单可见度下降 → 二阶 ASP 压力 → 估值倍数压缩 → 杠杆 ETF AUM 流出 → 叙事降温
- 时间: 6-12 月慢消化
- 一阶跌幅: -25 to -40%
- 二阶 narrative-led 跌幅: -50 to -70%(INTC / META / TSLA)
- 二阶 fundamental 跌幅: -15 to -25%(FORM / VIAV / VRT)
- 非 AI 复利股: -5 to -10%(轻度 contagion)
- 现金机会: 中等

**路径 B: 急崩**(概率 20%)
- 触发: 主要事件冲击(NVDA Q2 miss / 中国大陆 H20 类制裁加码 / 重大 AI app 商业化失败)
- 顺序: NVDA 单日 -10%+ → NVDL 散户恐慌赎回 → 杠杆 ETF dealer hedge 卖压 → SMH/SOXX 流出 → margin call → cross-asset 抛售
- 时间: 1-3 月快速
- 一阶跌幅: -40 to -55%
- 二阶 narrative-led 跌幅: -60 to -80%
- 二阶 fundamental 跌幅: -25 to -40%
- 非 AI 复利股: -15 to -25%(强度 contagion)
- 现金机会: **极大**

**路径 C: 慢侵蚀**(概率 20%)
- 触发: 没有单一事件, 但 AI 商业化 ROI 低于预期, 多季度数据慢慢累积
- 顺序: agent ARR 增速放缓(从 +1400% YoY 到 +50% YoY) → AI capex 投入产出比恶化 → hyperscaler 2028 CapEx 下调 → 倍数慢压
- 时间: 12-24 月
- 一阶跌幅: -20 to -35%
- 二阶: 分化(类型 A 维持, 类型 B 大跌)
- 非 AI 复利股: 轻度受益(资金从 AI 转出)
- 现金机会: 较小, 应主动 rotate 而非等

### 10.2 错杀机会区(关键投资 alpha)

破裂时(任意路径下), 哪些**非 AI 优质资产**会被错杀?

**当期已经开始错杀的样本**:

**MCO (Moody's)** — 2026 早 -23% drawdown:
- 当前: $345 vs 2026-01 顶 $445, drawdown -22.5%
- 错杀原因: private credit 短期波动 + 地缘 noise + AI 资金 rotate 走
- 基本面: ratings business 仍 +12% organic / data segment +18% / OPM 50%+ 历史水平
- 估值: forward PE 27x(2026 顶 35x → 27x)
- **错杀程度**: 中等(已部分 priced in 风险)
- **建议动作**: ⭐ **建仓候选**, 5 年期望回报 +30-50%

**CPRT (Copart)** — 2026 至今 -10%:
- 当前: $48 vs 2025 末 $54
- 错杀原因: 同店增速放缓担忧 + AI 资金 rotate
- 基本面: ⭐ 长牛 OS 复盘报告评级 "S2 真实增长", 保险全损处置 chokepoint, FCF strong
- 估值: forward PE 25x(中位水平)
- **错杀程度**: 早期
- **建议动作**: 关注, 等回调到 -20%+ 建仓

**ISRG (Intuitive Surgical)** — 2026 至今 -8%:
- 当前: $445 vs 2025 末 $485
- 错杀原因: medtech 整体回调 + AI 资金 rotate
- 基本面: 高责任临床流程平台, BDS L5(生命安全), Da Vinci 5 + Ion 第二曲线
- 估值: forward PE 60x(高估值, 但高质量公司)
- **错杀程度**: 轻度
- **建议动作**: 关注, 等回调 -20%+ 建仓

**MSCI** — 2026 早回调后稳定:
- 当前: $545 vs 2026-02 顶 $620, drawdown -12%
- 基本面: 制度标准长牛, gross margin 83%+
- 估值: forward PE 33x
- **错杀程度**: 轻度
- **建议动作**: 关注

**SPGI / FICO** — 类似 MCO/MSCI, 制度标准型:
- 都已轻度回调
- 基本面强(标准化收入, OPM 高)

### 10.3 错杀清单的两个时间窗口

**窗口 1: 当期(2026-04-29 → 5 月)**
已经开始打开:
- MCO -23% drawdown(部分 priced)
- CPRT -10%(早期)
- ISRG -8%(轻度)

**窗口 2: 破裂路径触发后(可能 2026 H2 / 2027 H1)**
完全打开的清单:
- 一阶 NVDA / AVGO 大跌时, 估值贵的高质量 compounder 也会同步回调 -20-30%
- MCO / MSCI / SPGI / FICO / V / MA / CME / CPRT / ISRG / TJX / ADP / PAYX 等 quality compounders
- 这是 v3.6R 框架的"错杀机会"核心 — **5 年期望回报 +50-100% 的入场机会**

### 10.4 投资组合配置建议

基于 v3.6R 完整审计, 推荐 5 类配置:

**配置 1: AI 一阶核心 持有不加仓 (30-35%)**
- NVDA: 10-12%(已有 holders 维持, 新进 0)
- AVGO: 6-8%(等 Q2 ASIC concentration data)
- TSM: 6-8%(健康扩散区, 可加仓)
- SK Hynix: 4-6%(被低估, 推荐加仓)

**配置 2: AI 二阶真验证 深挖加仓 (10-15%)**
- VIAV: 3-4%(错位最小, 类型 A)
- FORM: 2-3%(SK Hynix 集中风险关注)
- COHR: 2-3%(等 5/6 Q3 confirm)
- VRT: 3-5%(三阶最强)

**配置 3: AI 反转叙事 / 战略防御 完全回避 (0%)**
- INTC: 0%(避开)
- META: 0%(等 Meta Compute 兑现)
- TSLA: 0%(纯 narrative)
- SMCI: 0%(GM 塌陷)

**配置 4: 杠杆 ETF / 主流 AI ETF**
- SOXL / NVDL / TSLL: 0%(回避)
- SMH / SOXX: 0-5%(等回调)

**配置 5: 非 AI 优质 compounders (现在开始 + 错杀机会预留, 25-30%)**
- 当期建仓:
  - MCO 4-5%(-23% 已显著回调)
  - CPRT 3-4%(等回调)
  - MSCI 3-4%(轻度回调)
- 现金 / 短债 预留: 10-15%(等破裂路径触发后的错杀机会)

**配置 6: 现金 / 防御 (15-20%)**
- 等待 KS-11 GPU rental price / KS-12 hyperscaler concentration / KS-13 Anthropic ARR 任一触发后部署
- 不主动加仓 AI 一阶, 不抢底 INTC / META / TSLA 反转

**总配置汇总**: AI 一阶 30-35% + AI 二阶 10-15% + 反转叙事 0% + ETF 0-5% + 优质 compounders 25-30% + 现金 15-20% = 80-105%(可适度加杠杆 2-5%)

### 10.5 最关键的 Risk-Reward 表

| 资产 | 5 年期望回报 | 5 年下行风险 | 风险/回报比 | 推荐配置 |
|------|------------|------------|-----------|---------|
| NVDA(已 +335% 1 年) | +30 to +60% | -50 to -65% | 1.0 | 持有不加仓 |
| AVGO | +40 to +70% | -55 to -70% | 1.1 | 持有 |
| TSM | +50 to +90% | -40 to -55% | 1.5 | 加仓 |
| SK Hynix | +60 to +110% | -45 to -65% | 1.6 | **强烈加仓** |
| VIAV | +50 to +90% | -30 to -45% | 2.0 | **强烈加仓** |
| FORM | +40 to +80% | -35 to -50% | 1.5 | 加仓(注意客户集中) |
| VRT | +30 to +60% | -45 to -60% | 1.0 | 持有(等回调) |
| INTC ⚠️ | -45 to -55%(v4.4) | -65 to -75% | -0.7 | **避开** |
| META | -10 to +20% | -50 to -65% | 0.3 | 回避 |
| TSLA | -30 to +30%(高方差) | -60 to -75% | 0.2 | 回避 |
| MCO ⭐ | +50 to +90% | -25 to -40% | 2.5 | **建仓** |
| CPRT | +60 to +100% | -25 to -40% | 2.7 | 关注, 加仓 |
| ISRG | +50 to +80% | -30 to -45% | 1.8 | 关注 |
| 现金 | +5 to +10%(短债) | 0 | n/a | **15-20%** |

**关键比率**: VIAV / MCO / CPRT 的风险/回报比 > 2.0 是当期最强 alpha 候选; INTC -0.7 是当期最差; 一阶 NVDA/AVGO/TSM 在 1.0-1.5 是中等(基本面强但已 priced)。

---

## 第十一章 — 9 大 Kill Switch 当期冻结 + 跟踪节奏

### 11.1 9 个 Kill Switch(W-7 四元素结构化)

```yaml
ks_1_capex_revenue_gap:
  variable: "Hyperscaler CapEx YoY 增速 - AI/Cloud Revenue YoY 增速 (5 家平均)"
  baseline_reading: "5 家平均 CapEx +85% / 平均 AI Revenue +60% = 速度差 +25pp"
  baseline_reading_date: "2026-04-29 (基于 Q1 财报)"
  thresholds:
    warning: "速度差 >40pp 持续 2 季度 = 警告"
    kill: "速度差 >60pp 或任一家 CapEx +50% 同时 AI revenue 减速到 +20% = 击穿"
  measurement_frequency: "季度"
  data_source: "5 家 10-Q + 电话会"
  next_check_date: "2026-07-30 (Q2 财报)"

ks_2_order_visibility:
  variable: "NVDA / HBM / 光模块订单可见度 (leadtime / book-to-bill)"
  baseline_reading: "NVDA Blackwell 客户长协 18 月+ / SK Hynix HBM sold out 3 年 / COHR book-to-bill 4x"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "leadtime 缩短 20%+ / book-to-bill 跌破 1.5x"
    kill: "客户开始砍单 / NRE 取消 / book-to-bill 跌破 1.0x"
  measurement_frequency: "月度"
  data_source: "NVDA / SK Hynix / COHR / Mercury Research / SemiAnalysis"
  next_check_date: "2026-05-31"

ks_3_inference_elasticity:
  variable: "推理价格下降 vs 需求弹性"
  baseline_reading: "API price 2-3 年累计 -6 to -10x / Anthropic ARR +1400% YoY = 弹性显著 > 1"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "推理价格 -50% 后, 总 token 消耗仅 +30% (弹性 < 1)"
    kill: "价格下行后毛利同步崩塌 / Anthropic / OpenAI ARR 增速跌破 +30% YoY"
  measurement_frequency: "季度"
  data_source: "OpenAI / Anthropic 公告 + AWS Bedrock 指标"
  next_check_date: "2026-07-30"

ks_4_supply_capacity_margin:
  variable: "供应链产能扩产 vs 毛利率"
  baseline_reading: "TSM CoWoS 4x 扩产 / SK Hynix HBM OPM 72% peak / COHR book-to-bill 4x"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "多家同时扩产 + 毛利率连续 2 季度下降"
    kill: "毛利率 -5pp+ 持续 2 季度 / 客户开始议价 / spot price 下跌 20%+"
  measurement_frequency: "季度"
  data_source: "5 家一阶财报 + 媒体 channel checks"
  next_check_date: "2026-07-30"

ks_5_etf_flow_validation:
  variable: "ETF/杠杆 ETF flow vs 基本面上修速度"
  baseline_reading: "SMH+SOXX 4 月 $5.45B 史上最大 / 卖方仍在持续上修"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "SOXL/NVDL flow 历史 95%+ 但卖方未上修"
    kill: "ETF flow 加速 + 业绩开始 miss / 多个公司 guide 下调"
  measurement_frequency: "周度"
  data_source: "TradingView fund flows / 卖方 consensus updates"
  next_check_date: "2026-05-06"

ks_6_options_crowding:
  variable: "期权拥挤 / 钝化"
  baseline_reading: "NVDA put-call 0.84 / IV 33.59 (中等) / weekly call OI 估 35-40%"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "weekly call OI 创新高 + IV 跳升 30%+"
    kill: "重大利好出来后股价钝化 or 跌"
  measurement_frequency: "周度"
  data_source: "OptionCharts / MarketChameleon / SpotGamma"
  next_check_date: "2026-05-06"

ks_7_contagion_correlation:
  variable: "非 AI 复利股与 NVDA 30 日相关性"
  baseline_reading: "MCO -23% drawdown 已部分 contagion / 但当前正常 0.2-0.4 范围"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "30 日相关性突升至 >0.7 持续 2 周"
    kill: "出现明显流动性传染 / 非 AI 优质股大幅下跌"
  measurement_frequency: "月度"
  data_source: "Bloomberg / 价格数据"
  next_check_date: "2026-05-31"

ks_8_fds_velocity:
  variable: "FDS 剪刀差 (NCI 速度 + LRS 速度) - (FRS + EVI 速度)"
  baseline_reading: "FDS = +20 (NCI 30 + LRS 25 - FRS 15 - EVI 20)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "FDS > +30 持续 1 月"
    kill: "FDS > +50 持续 2 月"
  measurement_frequency: "月度"
  data_source: "本仪表盘内部计算"
  next_check_date: "2026-05-31"

ks_9_anti_evidence_handling:
  variable: "反证处理质量"
  baseline_reading: "估值担忧 + AI bubble 媒体 5x + Grantham/Krugman 喊话仍被认真讨论 (健康)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    warning: "估值担忧被嘲笑 > 接受 / Anti-bear hostility >10%"
    kill: "FUD 标签普及 / 主流财经停止报道空头"
  measurement_frequency: "月度"
  data_source: "WSB / 雪球 / 主流财经 / 12 类交易语言占比"
  next_check_date: "2026-05-31"
```

### 11.2 v3.7 升级新增 5 个 Kill Switch

```yaml
ks_10_meta_offbs_commitment:
  variable: "META 多年云协议 + infrastructure purchases 累计金额"
  baseline_reading: "$107B (Q1 2026 内签约)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "Q2 现金 CapEx 补上 Q1 miss (>$25B)"
    weaken: "Q2-Q3 现金持续 miss + commitment 上修"
    pivot: "Q3 commitment 显著放缓 (<$50B QoQ) + 现金 miss"
  measurement_frequency: "季度"
  data_source: "META 10-Q 关联方 + 承诺注释"
  next_check_date: "2026-07-30"

ks_11_gpu_rental_price:
  variable: "H100 1Y rental contract price"
  baseline_reading: "$2.35/hr (2026-03)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "维持 $2.30-2.50 区间"
    weaken: "跌破 $2.00 持续 2 月 = 真过剩"
    pivot: "跌破 $1.50 = 严重过剩"
    upside: "突破 $3.00 = 极端真稀缺 (BDS 再上修)"
  measurement_frequency: "月度"
  data_source: "Silicon Data / SemiAnalysis"
  next_check_date: "2026-05-31"

ks_12_hyperscaler_concentration:
  variable: "5 家 hyperscaler 单季 CapEx 总额 + 同步度"
  baseline_reading: "Q1 2026 5 家合计 ~$132B / 全年指引 $725B / 占 datacenter 84%"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "5 家 Q2 CapEx 全部维持/上修"
    weaken: "任一家 (尤其 META/AMZN/TSLA) Q2-Q3 CapEx 单季 -10%+"
    pivot: "2 家以上同步下调 2026-2027 指引"
  measurement_frequency: "季度"
  data_source: "5 家 10-Q + 电话会"
  next_check_date: "2026-07-30"

ks_13_anthropic_arr:
  variable: "Anthropic ARR 季度增速 + Bedrock 占比"
  baseline_reading: "ARR $30B (2026-04) / Bedrock 38% Q1 → 25-30% Q4 (Anthropic share dilution by OpenAI)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "ARR 维持 +50%+ YoY 增速"
    weaken: "ARR 增速跌至 <30% YoY"
    pivot: "ARR 持平 / Bedrock 总量增速放缓 = generative AI 商业化拐点"
  measurement_frequency: "季度"
  data_source: "Anthropic 公告 + AWS Q2 财报 + channel checks"
  next_check_date: "2026-07-30"

ks_14_retail_institutional_divergence:
  variable: "FINRA margin debt MoM + SMH/SOXX/SOXL flow"
  baseline_reading: "Margin debt $1.22T (-4.5% off Jan peak) / SMH+SOXX 4 月 $5.45B 史上新高"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "Margin debt 趋稳 + ETF flow 仍正 = 健康"
    weaken: "Margin debt 持续下降 + ETF flow 转负 = 同步降温(温和回调)"
    pivot: "Margin debt 急升 + 杠杆 ETF + 期权 OI 创新高 = 顶部信号"
    crash_signal: "ETF flow 转大额净流出 + margin debt 急降 = 流动性卖压"
  measurement_frequency: "月度"
  data_source: "FINRA / TradingView / Direxion / GraniteShares"
  next_check_date: "2026-05-31"
```

### 11.3 跟踪节奏汇总

| 频率 | 监控内容 |
|------|---------|
| **周度** | KS-5 (ETF flow) / KS-6 (期权拥挤) / 12 类交易语言占比 / NVDA / NVDL 价格波动 |
| **月度** | KS-2 (订单可见度) / KS-7 (传染) / KS-8 (FDS) / KS-9 (反证) / KS-11 (GPU rental) / KS-14 (retail/inst 背离) / 叙事生命周期阶段更新 |
| **季度** | KS-1 (CapEx vs revenue) / KS-3 (推理弹性) / KS-4 (供应链 GM) / KS-10 (META commitment) / KS-12 (集中度) / KS-13 (Anthropic) / **全 14 评分 + 3 总控指数 + 双阶段表更新** |
| **事件触发** | hyperscaler 财报(MSFT 7/30) / NVDA 财报(5/28 Q1 FY27) / TSM 月营收(每月 10 日左右) / FOMC / 重大叙事跨平台事件 / Anthropic Series H 信号 |

### 11.4 5 月底前的关键里程碑

接下来 30 天内会发生的关键事件:

| 日期 | 事件 | 关注点 |
|------|------|------|
| 2026-05-05 | AMD Q1 2026 财报 | DC +60% 全年指引是否 confirm / MI350 ramp |
| 2026-05-05 | SMCI Q3 FY26 财报 | GM 是否回升 / Blackwell backlog $13B 是否 confirm |
| 2026-05-06 | COHR Q3 FY26 财报 | book-to-bill 4x 是否 confirm / 1.6T ramp guidance |
| 2026-05-28 | NVDA Q1 FY27 财报 | Blackwell 完全 ramp / Q2 guide / 客户集中度变化 |
| 2026-05-31 | KS-11 GPU rental price 月度 update | $2.35 是否维持 / 突破 $3 即 upside trigger |
| 2026-06 | FOMC + 6 月财报季尾 | 利率 / margin debt 演化 |

---

## 第十二章 — v3.7 升级正式落地 + 一页执行摘要

### 12.1 v3.6R → v3.7 升级清单(本次 S4 正式落地)

基于 S1-S3 的 5 个新角度全部当期数据强支持, v3.7 升级建议:

**v3.7 新增内容**:

1. **CSS 加 Off-balance-sheet Commitment 子项**(新角度 #1)
   - 公式: CSS = α × CapEx/OCF + β × CapEx/FCF + γ × Off-balance-sheet commitment / OCF + δ × cash cushion 反向
   - META 当期 CSS 75 中, off-balance-sheet 贡献 +20

2. **BDS 加 GPU Rental Price Index 领先指标**(新角度 #2)
   - 子项: H100 1Y rental price + 1Y forward price + spot price 三层
   - SK Hynix HBM contract price + DRAM spot price 类比
   - 当期 GPU rental $2.35/hr → 反弹强化 BDS

3. **新增 KS-12 Top 5 Hyperscaler CapEx Concentration Index**(新角度 #3)
   - 公式: 5 家 single-quarter CapEx 总和 + 同步度系数(任一家 -10% 触发警告)
   - 当期 baseline: $132B 季度 / $725B 全年 / 占 datacenter 84%

4. **Anthropic Dependency 评估**(新角度 #4 修正)
   - AI Revenue Content 中加 "Anthropic dependency" 子标注
   - AMZN: dependency 高 (Bedrock 38% from Anthropic)
   - GOOGL: dependency 中 (TPU + Anthropic 投资 backing)
   - 不再当 D 类高危, 改为 B-D 混合

5. **LRS 拆 retail / institutional**(新角度 #5)
   - LRS-retail: margin debt + 单股杠杆 ETF AUM + 0DTE 占比
   - LRS-institutional: 主流 ETF flow + 主动基金 AI 集中度 + benchmark pressure
   - 背离信号(retail ↓ + institutional ↑)= 慢退潮模式而非急崩

### 12.2 v3.7 升级建议触发的框架结构

升级后 v3.7 总评分维度:
- A 组 真实度: 4 项(FRS / **CSS-v3.7 含 OffBS** / **BDS-v3.7 含 rental price** / POS)
- B 组 财报扩散: 3 项(EVI / ERG / DQI)
- C 组 叙事反身性: 6 项(NCI / TIS / RQD / **LRS-retail** / **LRS-institutional** / PVS)
- D 组 脆弱传染: 2 项(FDS / CRS)
- 总: 15 项(从 14 项升级)
- KS: 14 项(从 9 项升级)

**v3.7 完整 review 不在本会话完成**(需要至少 2 份新报告原生验证), 仅在 S4 落地建议清单。

### 12.3 一页执行摘要(母报告 Chapter 0)

```
══════════════════════════════════════════════════════════════════
AI 基建资本循环审计:真实需求、过度建设与金融泡沫的边界
══════════════════════════════════════════════════════════════════

报告日期: 2026-04-29
框架: v3.6R 完整母系统 + v3.7 升级建议
主结论: AI 基建处于 S3+S4.5 混合状态 — 真需求 70% × 战略恐惧 30% × 金融反身性 25%

【一句话】
AI 基建产业本身真稀缺真增长 (HBM sold out 3 年 / Anthropic ARR $30B), 
但 CapEx 集中度 ($725B/84%) + 反转叙事股 (INTC +335% / META commitment 错位) + 
ETF flow 史上最大 ($5.45B 4 月) + AI bubble 媒体提及 5x + 反向叙事 T5 抬头 
= 中等强度金融反身性 + 部分 CapEx 集中风险, 不是泡沫破裂前夜但脆弱化已开始。

【三个总控指数】
  Reality Index:        64% (产业本身真实, 基础牢固)
  Reflexivity Index:    63% (反身性已中度激活)
  Fragility Index:      43% (脆弱性中等, 未达破裂前夜)

【三类泡沫独立判定】
  需求泡沫:    ❌ 不成立 (Anthropic + HBM + Bedrock + GPU rental 四重证据)
  CapEx 泡沫:  🟡 部分成立 ($725B 集中度 + AMZN FCF 转负 + META commitment 错位)
  金融泡沫:    🟡 早期成立 (ETF flow 史上最大 + 杠杆 ETF + 媒体提及 5x)

【4 类 leadership】
  Fundamental-led: 一阶 NVDA/AVGO/TSM/SK Hynix (健康) + 三阶 VRT
  Narrative-led:   INTC/META/TSLA (ERG +50-70 极端)
  Flow-led:        SMH+SOXX 4 月 $5.45B + NVDL AUM $4.23B
  Price-led:       SMCI (GM 6.4% 塌陷被忽视)

【4 档警报当期分布】
  🟢 Green  深挖:  TSM / SK Hynix / FORM / VIAV / COHR (5/16)
  🟡 Yellow 持有:  NVDA / AVGO / AMD / MSFT / GOOGL / VRT (6/16)
  🟠 Orange 减仓:  AMZN / META / SMCI (3/16)
  🔴 Red    回避:  INTC / TSLA (2/16)

【投资动作 - 配置组合】
  AI 一阶持有不加仓:        30-35% (NVDA/AVGO/TSM/SK Hynix)
  AI 二阶真验证深挖加仓:    10-15% (FORM/VIAV/COHR/VRT)
  AI 反转叙事 完全回避:      0%   (INTC/META/TSLA/SMCI)
  杠杆 ETF / 主流 AI ETF:    0-5% (回避杠杆, 谨慎主流)
  非 AI 优质 compounders:   25-30% (MCO -23% 已开始 / CPRT/ISRG/MSCI 关注)
  现金 / 防御:              15-20% (KS 触发后部署)

【最关键的 Risk-Reward Top 5】
  ⭐ MCO         +50/+90% upside vs -25/-40% downside  RR 2.5  建仓
  ⭐ CPRT        +60/+100% upside vs -25/-40% downside RR 2.7  关注
  ⭐ VIAV        +50/+90% upside vs -30/-45% downside  RR 2.0  深挖
  ⭐ SK Hynix    +60/+110% upside vs -45/-65% downside RR 1.6  加仓
  ⚠️ INTC        -45/-55% expected return (5y)         RR -0.7 避开

【9 + 5 = 14 个 Kill Switch 当期 baseline (W-7 四元素)】
  KS-1  CapEx vs Revenue 速度差: +25pp (warning >40pp)
  KS-2  订单可见度: leadtime 18m+ / book-to-bill 4x (健康)
  KS-3  推理弹性: > 1 (健康)
  KS-4  供应链 GM vs 扩产: SK 72% / TSM 50%+ (peak)
  KS-5  ETF flow vs 基本面: $5.45B 月 (周度跟踪)
  KS-6  期权拥挤: NVDA put-call 0.84 / IV 33.59 (温和)
  KS-7  非 AI 复利股相关性: 0.2-0.4 (正常但 MCO -23% 已部分传染)
  KS-8  FDS 速度差: +20 (warning >+30, kill >+50)
  KS-9  反证处理: 仍被认真讨论 (健康但 -7pp evidence-seeking)
  KS-10 META Off-BS commitment: $107B
  KS-11 GPU rental price: $2.35/hr (突破 $3 = upside / 跌破 $2 = 真过剩)
  KS-12 Hyperscaler concentration: 84% / $725B
  KS-13 Anthropic ARR: $30B / Bedrock 38% → 25-30% Q4
  KS-14 Retail/Institutional 背离: margin -4.5% + ETF +$5.45B 史上最大

【接下来 30 天关键里程碑】
  2026-05-05: AMD Q1 / SMCI Q3 财报
  2026-05-06: COHR Q3 财报
  2026-05-28: NVDA Q1 FY27 财报 (最大事件)
  2026-05-31: KS-11 GPU rental + KS-14 ETF/margin 月度 update

【底层信念】
  当前不是泡沫破裂前夜的 4 个理由:
    - FDS = +20 (中等错位, 未急升 >40)
    - Reality 64% > Reflexivity 63% (基本面仍领先)
    - NVDA forward PE 24.2x (贵但不疯狂)
    - 反证仍被认真讨论 (Grantham/Krugman 被严肃报道)
  
  泡沫已开始外溢的 5 个信号:
    - ERG INTC +70 / META +50 / SMCI +45 (类型 B 极端)
    - SMH+SOXX 4 月 $5.45B inflow 史上最大
    - NVDL AUM $4.23B 单股杠杆集中
    - "AI bubble" 媒体提及 5x YoY + 顶级宏观投资人空头喊话
    - SMCI GM 塌陷 6.4% 但 Oracle 取消 +9% 反应

══════════════════════════════════════════════════════════════════
```

### 12.4 v3.6R 框架的最核心判断句(报告必含)

> **AI 基建泡沫不一定发生在需求为假时; 更可能发生在需求真实、公司优秀、但市场用 ETF、期权和杠杆把未来多年现金流一次性提前交易完的时候。**

> **真正危险的不是 AI 没有需求, 而是市场把真实需求加工成无限需求, 把阶段性瓶颈加工成永久垄断, 把股票上涨加工成逻辑证明, 再用杠杆 ETF 和 weekly calls 把这种信念放大。**

> **AI 基建泡沫的早期信号, 不一定是 NVIDIA 自己开始失真, 而是市场开始把 AI 需求从 GPU/HBM/Foundry 外推到每一个测试、测量、CPU、光通信、封装、电力和数据中心边缘资产。健康扩散由财报验证, 泡沫扩散由"下一个 NVDA"的叙事和杠杆交易验证。**

### 12.5 一句话总纲

> **本研报用 AI 研究市场如何交易 AI: 从真实 CapEx 和硬件瓶颈出发, 追踪叙事如何跨平台传播、如何 ETF 化和杠杆化、如何通过价格反身性自我强化, 并判断这个循环何时仍由现金流支撑, 何时已经进入泡沫与错杀阶段。**

---

## 报告结尾 — 总字数核算 + 后续工作

### 总字数核算

```
S1 (master_checklist + new_angles_log + phase0_three_tables + phase0_supplement):  ~21000 字
S2 (phase1_scoring): ~14000 字
S3 (phase2_chapters_1to7): ~39000 字
S4 (phase3_chapters_8to11 + 一页摘要): ~20000 字
─────────────────────────────────────────────────────
总输出: ~94000 字 ✅
```

**超额完成 80K 字目标** 14000 字。

### 后续工作 (S5 / 季度更新)

**S5 (建议下一会话, 不在本次)**:
- 把 staging 文件合成主报告 reports/AI_CAPEX_CYCLE/AICAPEX_Dashboard_v1.0_2026-04-29.md
- v3.7 框架升级正式落地到 SKILL.md
- 每周 KS 更新 routine 通过 /schedule 配置
- INTC v4.4 反身性视角增量分析(交叉引用)

**季度更新机制**:
- 2026 Q2 (7 月底): 全仪表盘更新 + 14 评分 + KS 状态
- 触发事件: hyperscaler 财报 / NVDA 财报 / 重大事件 → 立即增量更新

**长期 KS 监控**:
- 每周自动 grep margin debt + ETF flow + NVDA price + GPU rental
- 每月 12 类交易语言占比变化
- 每季度 整体框架健康度 + 是否需要 v3.8 升级

---

## 致读者

这份 ~94000 字报告不是一次性结论, 是**v3.6R 框架的当期审计快照**, 也是季度更新的第一版仪表盘。AI 基建反身性循环是动态的, 当期判定(S3+S4.5 混合, Reality 64% > Reflexivity 63%, FDS +20)在未来 90 天内会演化:

- 如果 Q2 hyperscaler 任一家下调 CapEx → 进入 S5-S6 → 警报升级到 Orange → 重新计算 KS-12
- 如果 NVDA Q1 FY27 (5/28) miss → 反身性测试 → KS-5/6 触发 → 警报升级到 Red
- 如果 Anthropic 增速放缓 → KS-13 触发 → 重新评估 D 类循环 CapEx 风险
- 如果 GPU rental 继续上升突破 $3 → BDS 上修 → 一阶持有信心强化

这套 v3.6R 框架(以及 v3.7 建议升级)的最大价值不是给出"AI 是不是泡沫"二元结论, 而是建立了**14 个评分 + 14 个 KS + 3 总控指数 + 4 档警报 + 8 档投资动作**的连续监控系统。

每季度一次完整审计 + 每月 KS 检查 + 每周高频指标 = 真正可执行的 AI 投资 OS。

报告完。
