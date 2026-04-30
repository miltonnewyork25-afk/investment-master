# v3.6R 框架未覆盖的新角度日志

**触发**: 用户 2026-04-29 指令"调研中如发现值得挖掘的新角度, 必须深入调研"
**S1 数据收集后立即识别 5 个新角度**

---

## 新角度 #1 — META CapEx Miss → 转向"承诺投入"代替"实际投入"

### 触发数据
- META Q1 2026 CapEx **$19B**, 但 consensus 预期 $27.57B → **miss $8.57B (-31%)**
- 同时管理层把 2026 全年 CapEx guidance 从 $115-135B 上修到 **$125-145B**(中点 +$10B)
- 同时披露 **$107B contractual commitments(多年云协议+基础设施)在 Q1 内签约**
- 同时公告 "Meta Compute" 战略单元: "tens of GW this decade, hundreds of GW+ over time"

### 为什么 v3.6R 框架未直接覆盖
- 4 类买方质量(A/B/C/D) 假设 CapEx **是已花的钱**
- 但 META 模式说明: 实际现金 CapEx miss + 同时 ramp **未来 commitment**(合同+租约+infrastructure purchases)
- 这是一种**"contractual capex"** — **资产负债表外** 但**资本承诺已锁定**, 财务披露质量低于现金 CapEx, 但**约束力相同甚至更强**(违约成本+长期租约)
- 框架里"D 类循环 CapEx" 也没覆盖这个 — 它是 hyperscaler **自己**对供应商签长约, 不是循环融资

### 投资含义
- 看现金 CapEx 数字判断"军备竞赛降温"会**严重误判**
- 真实 commitment 是 **CapEx + RPO + 租约 + 多年云协议 + infrastructure purchase agreement** 总和
- 给 v3.6R 加新维度: **CSS 的分母不能只是 CapEx, 必须含 contractual commitments**
- 给监控指标加: META "Meta Compute" 战略单元的 GW 进度披露, 以及 Q2 CapEx 是否补上 Q1 miss

### 升级动作
- 给 CSS 加 "Off-balance-sheet commitment ratio" 子项
- 标注: META 当前**疑似从 A 类(现金流支撑)→ B/D 混合类**, 但需要 Q2-Q3 数据确认是 timing 还是 model shift

---

## 新角度 #2 — GPU rental price 反转 → 一阶瓶颈强度上修(不是下修)

### 触发数据
- H100 1 年期 rental price **2025 年 10 月低点 $1.70/hr → 2026 年 3 月 $2.35/hr (+40%)**
- "**all capacity coming online until August-September 2026 已被预订完**"
- 反转点: 之前多空辩论的核心是"H100 spot price 暴跌 = oversupply 信号", 现在转为"价格反弹 = 需求超出新增供给"

### 为什么 v3.6R 框架未直接覆盖
- v3.6R BDS(Bottleneck Durability Score)只是静态评分, 没有把 **GPU rental spot price** 作为 BDS 的领先指标
- 框架里"假稀缺信号"包括"leadtime 缩短 / 客户拿到全量需求", 但**没包括 rental price 反转**
- 这是 **一阶瓶颈持续性** 的最直接市场信号(rental 是 demand × supply 的连续定价)

### 投资含义
- 强烈削弱"AI CapEx 已经过剩"的早期判断
- 但**强化反身性风险**: rental price 反弹 → hyperscaler 更敢追加 CapEx → 更多硬件订单 → 一阶受益股(NVDA/HBM) 反身性上行 → 二阶补涨外溢加速
- 这是"真稀缺仍在 + 反身性放大并存"的危险组合

### 升级动作
- 给 BDS 加领先指标: **GPU rental price index(SemiAnalysis / Silicon Data 数据)**
- 监控阈值: H100 1Y rental price 从 $2.35 进一步反弹到 **$3.0+** = 真稀缺重启信号
- 反向阈值: 跌破 $1.50 = 真过剩信号

---

## 新角度 #3 — 5 家 hyperscaler 2026 总 CapEx ≈ $695B, **占美国 GDP 约 2.4%**

### 触发数据(机械汇总)
| 公司 | 2026 CapEx guidance |
|------|------|
| MSFT | $190B |
| META | $125-145B |
| AMZN | $200B |
| GOOGL | $180-190B |
| TSLA | $25B+ |
| **总和** | **~$695B (全年)** |

对照: 美国 2026 名义 GDP ~$29T → CapEx 占 GDP **2.4%**
对照: 2024 年同类 5 家 CapEx 估约 $300B → **+131% in 2 年**

### 为什么 v3.6R 框架未直接覆盖
- 框架里有"CapEx Stress Score" 但**只看单家公司**对自己 OCF/FCF 的压力
- 没有"宏观集中度" 视角: 5 家 hyperscaler CapEx 占美国 IT 行业 CapEx 总和的比例(估计 60%+)
- 没有"宏观链条断裂" 视角: 如果 5 家中任何 1-2 家放缓, 一阶/二阶供应链受影响范围
- 这是**系统性 concentration risk**, 不是单公司风险

### 投资含义
- AI 基建需求**不再是分散的需求**, 是**5 家集中决策**的需求
- 如果 META 或 AMZN 有任何"暂停" 信号, 一阶供应链(NVDA/HBM/CoWoS/光模块)**会有量级冲击**
- 这是 v3.6R Kill Switch KS-1 的强化版本: 不只看 CapEx vs 收入, 看**单家 hyperscaler 决策对全链条的边际冲击**

### 升级动作
- 新增 KS-10 候选: "Top 5 hyperscaler CapEx Concentration Index" — 任一公司单季 CapEx -10%+ 触发预警
- 把这个角度纳入"系统性传染风险 CRS" 计算

---

## 新角度 #4 — Anthropic 估值 $350B + AMZN $25B + GOOGL $40B 联合投入 → 单一标的 systemic risk

### 触发数据
- AMZN 投 Anthropic: $5B + up to $20B 条件性 = **$25B 总承诺**(加上之前 $8B = $33B)
- GOOGL 投 Anthropic: $10B + up to $30B 条件性 = **$40B 总承诺**(加上之前 $3B = $43B)
- 两家联合敞口 ≈ **$76B** 押在单一非上市公司
- Anthropic 当前估值 $350B
- 同时: Anthropic 承诺 AWS 10 年 $100B 云支出 + 5GW Trainium capacity

### 为什么 v3.6R 框架未直接覆盖
- 框架的 D 类循环 CapEx 提到 hyperscaler-startup 关系, 但**没量化单一 startup 暴露规模**
- $76B 押在一家**未上市、收入未公开、AGI 投注**公司, 是 **dot-com 时代电信公司 互买 capacity** 的现代版本但**更集中**
- 如果 Anthropic 增速放缓或商业化失败, **AMZN+GOOGL 两家 cloud 收入 backlog 都会受冲击**
- 这是**系统性的"单点故障"** — 不是简单的 D 类循环, 是**集中循环**

### 投资含义
- AWS Bedrock ARR $15B (10% of AWS) — Anthropic 是其中**主要驱动**
- Anthropic 的商业化数据**至关重要**, 但 Anthropic 不公开披露
- 这是 v3.6R **AI 含量 A 等级** 应用的关键场景: AMZN/GOOGL 的 AI 收入"AI content" 应该按 **Anthropic 商业化 dependency** 折扣

### 升级动作
- 新增 evidence card: 跟踪 Anthropic 半年公开披露(收入 / 客户数 / DAU)
- 给 AMZN/GOOGL 的 "AI revenue content" 加附注: "Anthropic dependency: high / medium / low"
- 升级 Adversarial Reviewer (A8) 重点: Anthropic 失败情景下 AMZN/GOOGL 现金流冲击建模

---

## 新角度 #5 — FINRA margin debt **已经从 1 月顶部回落 6%, 但 ETF flow 创历史新高**

### 触发数据
- FINRA margin debt **2026 年 1 月顶 $1.28T**(史上最高), **3 月 $1.22T (-4.5% off peak)**, **2 月连续下降第二月**
- 同时: SOXX 4 月 inflow $2.05B(>2x 历史月度记录), SMH 4 月 $3.4B(史上最高), 合计 $5.45B
- 矛盾: **个人散户已经开始去杠杆, 但 ETF 资金流入加速**

### 为什么 v3.6R 框架未直接覆盖
- 框架的 LRS 把 ETF flow 和 margin debt **混在一起算**
- 实际上**两者方向相反时**(margin 退潮 + ETF 涌入)是一个特殊信号:
  - 可能 = 散户从单股 + margin 转向 ETF 配置(降低个人风险但仍追逐 sector exposure)
  - 也可能 = 机构(401k / 主动基金 benchmark pressure) 在追逐, 散户已经在退出
  - 这两种解释**对未来路径含义完全不同**

### 投资含义
- 如果是机构追逐(benchmark pressure 被迫加仓), 上涨持续性**反而更强**(机构资金粘性高)
- 如果是散户从 margin 退到 ETF(降杠杆 + 仍 long), 是温和**降温前兆**
- 不能简单看"ETF flow 历史新高 = 拥挤" 就判定泡沫

### 升级动作
- LRS 拆分为 **LRS-retail**(margin debt + 单股杠杆 ETF AUM)+ **LRS-institutional**(主流 ETF flow + 主动基金 AI 持仓)
- 当**两者背离**(retail ↓ + institutional ↑)时, 输出特殊状态: "拥挤但分层" — 不是单边泡沫信号

---

## 新角度汇总: v3.6R 应升级到 v3.7

5 个新角度都在**当期数据中真实出现**, 不是猜测。建议升级:
1. **CSS 加 Off-balance-sheet commitment** 子项(META miss 角度)
2. **BDS 加 GPU rental price index 领先指标**(rental 反转角度)
3. **新增 KS-10**: Top 5 hyperscaler CapEx Concentration Index
4. **新增 Anthropic dependency** AI content 附注
5. **LRS 拆分 retail vs institutional**

这些升级不在框架终稿前做, 先标注 staging, 数据收集完整后再决定 v3.7 是否动框架本身。
