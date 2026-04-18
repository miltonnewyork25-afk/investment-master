# AI 硬件 L3 · Deep Causal Dig(8 picks)

> **Date**: 2026-04-18
> **Scope**: L3 hidden upstream 8 个 flag-free candidates 的 per-pick causal dig
> **Framework**: FROG + SCOPE-A v2 + CLAUDE.md 跨层硬规则 1-9
> **Data basis**: 训练知识 + 2026-04-17 MCP 财务 verify(Rule #6: finance verify only, not decide)
> **本文件定位**: 从候选池到 Action state 定格的基础文档。**持仓决策前必读**。

---

## Quick Reference · 8 picks · Post-Dig Action 排序

| # | Ticker | Action | 关键因果 + 仓位逻辑 |
|---|---|---|---|
| 1 | **ALAB** | Initiate(小-中仓) | 最纯 AI-specific + Rev+92%/Margin+20% 同步扩张 + 34% drawdown 进场 |
| 2 | **AEIS** | Initiate(标准仓) | 双 vector(semi + DC HVDC)+ beta 1.35 组内最稳 + Fwd PE 合理 |
| 3 | **BWXT** | Initiate(标准仓) | 稳健核电 specialty + AI SMR 新 vector + **beta 0.79 组内最低** |
| 4 | **MTSI** | Initiate(标准仓) | 1.6T optical 驱动 IC specialty,Rev +24.5% 兑现中 |
| 5 | **MOD** | Initiate(**小仓, FCF contingent**) | Rev +30.5% 强但 **FCF -$110M**,DC 扩产资本吃掉现金 |
| 6 | **CRDO** | Initiate(**严格小仓**) | Rev +201% 爆发但 **beta 2.72 + 客户集中度**风险 |
| 7 | **CAMT** | **Track**(不 Initiate) | **Rev 仅 +9.2% 不符 HBM/CoWoS ramp 期望**,需因果澄清 |
| 8 | **POWL** | **Track**(等 backlog 披露) | **Rev +4% vs stock +355% 严重 divergence** |

**Initiate 总计 6 个 · Track 总计 2 个 · Watch(未入本次)**: UCTT / ACLS(Rev 反向 flag)

---

## 1 · ALAB · Astera Labs · `Initiate`(小-中仓)

**业务**: Aries (PCIe 5.0 retimer), Taurus (Ethernet smart cable module), Leo (CXL memory expansion)。核心 = AI server GPU-to-GPU/GPU-to-memory 扩展信号完整性保障。

**Chokepoint**: Signal integrity 在 PCIe 5/6 + CXL 是硬工程问题。GPU 8→72+ 规模时信号衰减需 retimer 补偿。NVIDIA NVLink 是竞品但封闭 CUDA,**非 NVLink 阵营(AMD MI / hyperscaler 自研 ASIC)必须用 ALAB 或等价物**。

**Active catalyst**: PCIe 6.0 产品 2026 放量 + CXL 2.0/3.0 推进 + UALink 联盟 founder-level 成员身份(反 NVLink 制度信号)。

**Rule #9 传导链**: Hyperscaler CapEx $400B → 非 NVLink GPU 部署 $60-100B(AMD MI + ASIC)→ 每台 8-72 GPU 配 4-32 retimer/switch → ALAB rev(目前 $850M,路径到 $2-3B)✓

**Pace gap**: Rev +91.8% + OP margin 20.3% **同步扩张**(ideal dual ramp)。Stock 从 $263 回调到 $174 (-34%)= 消化而非断裂。

**Finance verify(Rule #6)**: Rev +91.8% ✓ Margin ✓ FCF $207M / Rev 24% conversion ✓ 全绿

**Break**: (a) NVIDIA 扩大 NVLink 授权到 AMD(概率低)(b) META/GOOG 自研 retimer(analog complexity 高)

**Action**: `Initiate 小-中仓`(beta 1.79 需控制)

---

## 2 · AEIS · Advanced Energy Industries · `Initiate`(标准仓)

**业务**: Semi Equipment(~55% 收入, 高频 RF/DC 电源给 AMAT/LRCX/ASML)+ Data Center Computing(~15%, HVDC 转换新兴)+ Industrial & Medical(~30%)。

**Chokepoint**: RF 电源 qualified-in 周期 12-18 个月。OEM 一旦选定,切换影响整机 etch uniformity,成本极高。**AMAT/LRCX 之外的独立特种供应商**。

**Active catalyst**: 先进节点(<3nm GAA)RF 频率稳定性要求提升 + DC 段 HVDC rack-level 方案(48V → 400V DC 架构)hyperscaler 推广。

**Rule #9 传导链**: Hyperscaler → WFE 订单 $150B → 每台工具含 $50-200K AEIS 电源 → AEIS 订单。DC 段: hyperscaler 400V DC 部署 → AEIS 转换方案。两条链可量化 ✓

**Pace gap**: Rev +17.8% 健康但非爆发 → DC HVDC 尚未成为主驱动(仅 15% 收入)。Stock +338% 已消化大部分 semi 复苏 + DC narrative。

**Finance verify**: Rev +17.8% ✓ OP margin 10.8% 扩张中 ✓ FCF $120M / Rev 6.7% 一般但稳定。Fwd PE 35x vs TTM 97x 暗示 EPS 明显扩张路径。

**Break**: WFE 下一轮 capex 下行(最近期风险)/ OEM 选 MKSI 等替代 / DC HVDC 推广慢

**Action**: `Initiate 标准仓` — 组合 anchor,beta 最低 + 双 vector + 执行稳

---

## 3 · BWXT · BWX Technologies · `Initiate`(标准仓)

**业务**: 海军反应堆组件(~60% 收入, Virginia-class / Columbia-class 潜艇 + 航母)+ 商用核电服务(~25%)+ **SMR 新反应堆组件(~10-15%, 增量敞口)**。

**Chokepoint**: 美国海军反应堆**唯一认证供应商**(真 sole-source)+ NRC 商用核电工艺 + 许可组合。新进入门槛 = 5-10 年许可周期 + 核级工艺认证。

**Active catalyst**: MSFT TMI 重启 + Meta Clinton + AMZN Cascade 等 hyperscaler SMR PPA 正在孵化 → X-Energy / Oklo / NuScale 等 SMR 开发商**需要 BWXT 做核心组件**。

**Rule #9 传导链**: Hyperscaler 2030+ 清洁 baseload 需求 → SMR 公司拿合同(X-Energy / Oklo)→ SMR 组件订单 → BWXT(海军工艺迁移到 SMR)。**但 causal distance 长**(SMR 首台 2030 后),短期纯海军订单支撑。

**Pace gap**: Rev +18.7% 稳健 + **beta 0.79 组内最低**。52w +136% 组内偏小,相对于 CRDO/MOD/AEIS 扩张较保守。

**Finance verify**: Rev +18.7% ✓ OP margin 10.1% 稳定 ✓ FCF $133M ✓ ROE 28.5% 强 ✓ 全绿

**Break**: 国防预算大幅削减(低概率)/ hyperscaler 撤销 SMR 承诺转投 gas turbine / NRC 许可延迟

**Action**: `Initiate 标准仓` — **组合压舱石**(低 beta + 稳健现金流 + AI SMR 期权)

---

## 4 · MTSI · MACOM Technology Solutions · `Initiate`(标准仓)

**业务**: 光模块 IC(laser drivers / TIAs / mmWave 芯片)、航天 RF、国防 mmWave。AI 光互联 driver 是近年放量段。

**Chokepoint**: 1.6T 光模块内部的 laser driver + TIA(transimpedance amplifier)是 specialty analog。Broadcom / Marvell / Semtech 各自有光 IC 线但**MTSI 在高频 analog 有历史积累**,non-commoditized。

**Active catalyst**: 1.6T 光模块 2026 大批量出货 + CPO(co-packaged optics)初期导入。

**Rule #9 传导链**: Hyperscaler GPU cluster → 1.6T 光模块需求 → laser driver / TIA IC 订单 → MTSI 份额。每步可量化 ✓

**Pace gap**: Rev +24.5% 兑现中 + stock +190% 相对 REV 增速合理。52w high $277 = 今日 ≈ 正在高点,不在折价区。

**Finance verify**: Rev +24.5% ✓ OP margin 13.4% 扩张中 ✓ **但 profit margin -5.6%**(需 verify 是否是 M&A 摊销 / 汇率一次性)→ **Flag**: 下一季度 earnings 验证 GAAP profit margin 是否回正

**Break**: 光模块 ASP 压缩速度超过出货放大(量价剪刀差)/ CPO 延后导致 1.6T 过渡不成型 / Broadcom 整合 laser driver 市场

**Action**: `Initiate 标准仓` — 不是 small 因为已有订单兑现,但 GAAP profit 负要 verify

---

## 5 · MOD · Modine Manufacturing · `Initiate`(**小仓,FCF contingent**)

**业务**: 传统段: 汽车 + 农机热交换器(~60%)。**Climate Solutions 段(DC 冷却 + 商业热泵)~30-35%,2-3 年翻倍中**。核心 AI 敞口 = data center liquid cooling heat exchangers(VRT 的上游核心器件)。

**Chokepoint**: Liquid cooling heat exchanger 的**工程认证 + 定制**。VRT 整套 CDU(cooling distribution unit)里的换热核心由 MOD 等特种供应商做,不是 commodity。切换成本在 hyperscaler 级认证里 1-2 年。

**Active catalyst**: Climate Solutions 段从汽车业务剥离加速,**管理层 2024-2025 明确战略 pivot 到 DC 冷却**。

**Rule #9 传导链**: Hyperscaler AI rack 100+ kW → liquid cooling 刚需 → VRT / 其他 CDU 整机供应商 → MOD 换热核心订单。3 步可量化 ✓

**Pace gap**: **Rev +30.5% 强劲** + stock +252% 兑现追上。**但 FCF -$110M 是警示**:DC 扩产 capex 吃掉现金,类似 FTAI(公司层负但 segment 可能正)。

**Finance verify**:
- Rev +30.5% ✓✓
- OP margin 11% 一般(低于 HWM/HEI/TDG 的同型 specialty owner)
- **FCF -$110M ⚠️**: 需拆分 "汽车段 FCF + Climate Solutions 扩产 capex" 判断是**健康投资**还是**结构性现金焚烧**

**Break**: DC 液冷 ramp 低于预期 / 汽车段拖累过重 / Climate Solutions 整合成本超预期 / FCF 持续负 >2 年

**Action**: `Initiate 小仓` — Rev 兑现真实,但**FCF 需 segment 拆分 verify 后决定是否升到标准仓**(类似 FTAI 纪律)

---

## 6 · CRDO · Credo Technology · `Initiate`(**严格小仓**)

**业务**: AEC (Active Electrical Cable) + 光 DSP + SerDes IP 授权。核心 = **hyperscaler AI rack 内部 2-7m 短距互联**。

**Chokepoint**: AEC 取代光模块用于 rack-to-rack:(a) 省电 3-5W vs 12-15W (b) 成本低 (c) 延迟低。Credo 是 AEC 早期 + SerDes IP 积累。

**Active catalyst**: MSFT / META / GOOG 的 AI cluster 规模化 AEC 部署 + 800G→1.6T 速率切换扩大 SerDes 护城河。

**Rule #9 传导链**: Hyperscaler GPU cluster → 每 cluster 数百条 AEC → 每条 $200-500 → Credo 订单(Rev +201%)。3 步清晰但**客户集中度需 10-Q 核**。

**Pace gap**: **Rev +201.5% 罕见爆发** 确认 category 起飞。Stock +361% 已大致追上 → pace gap 实际收敛,不再扩大。OP margin 仅 8.5% = 重投入阶段,未来 margin 扩张是下一 catalyst。

**Finance verify**: Rev +201% ✓✓✓ Margin 8.5% 在 ramp(正常)✓ FCF $172M / Rev 17% ✓ **但 beta 2.72 = 任何 miss 被市场重罚**

**Break**: 单一 hyperscaler 撤单 / 竞品(Marvell / ALAB Taurus / 新进入者)压缩定价权 / 光模块成本下降破 AEC 经济性

**Action**: `Initiate 严格小仓` — 按 ALAB 的 1/2 到 2/3,beta-adjusted position

---

## 7 · CAMT · Camtek · `Track`(不 Initiate)

**业务**: 半导体先进封装 inspection + metrology。客户集中在 HBM / CoWoS / chiplet 等先进封装 OSAT。

**Chokepoint**: HBM 堆叠 + chiplet 封装必须过检测。CAMT 在 AP(Advanced Packaging)inspection 细分有 specialty 地位,不直接与 KLAC 在主流晶圆检测竞争。

**Active catalyst**: HBM4 transition + CoWoS-L 扩产 → AP 检测需求指数放大。

**Rule #9 传导链**: Hyperscaler AI chip → HBM/CoWoS 封装需求 → OSAT 扩产 → CAMT 检测工具订单。链条清晰 ✓

**Pace gap ⚠️**: **Rev 仅 +9.2%** 与"HBM/CoWoS 大 ramp"的 thesis 显著错配。Stock +207% 已 priced in 增长预期,但实际兑现偏慢。

**Finance verify(Rule #6 触发)**: Rev +9.2% ≠ "HBM ramp 期望" → **因果链可能延迟或被其他因素稀释**
- 可能因果:(a) 客户 OSAT 资本开支延后(2025 下半年再起)(b) CAMT 产能制约 (c) 竞品侵蚀份额
- **数据不足区分**

**Break**: HBM ramp 推迟到 2027 / 竞品(Onto, Nova)侵蚀 CAMT 份额 / OP margin 25.8% 反转

**Action**: `Track Position` — 等下一季度 revenue + backlog 数据澄清因果,**不升 Initiate 直到 Rev 增速 ≥15%** 连续 2 季度

---

## 8 · POWL · Powell Industries · `Track`(等 backlog 披露)

**业务**: 定制化高压 switchgear。Oil & Gas(~40%)/ Utility(~25%)/ Industrial(~20%)/ **Data Center(~10-15%, 快速扩张中)**。

**Chokepoint**: 定制化非标 switchgear 的**工程 + 制造 + 认证 + 现场调试**全链路能力。ETN 之外在高端 custom 项目少数承接者。

**Active catalyst**: Data Center 段占比 ~5% → ~15% (2023-2025 ramp)+ Texas / 东南部 DC buildout backlog。

**Pace gap(Rule #6 触发)**: **Rev +4% vs stock +355% 严重 divergence**。可能因果:
- (a) Backlog 大增但未转 revenue(合理,POWL 历史 backlog-to-rev 比率高)
- (b) 油气段 40% 反向拖累
- (c) Mix shift 中(OP margin 19.7% + ROE 32% 支持)
- **数据不足区分**

**Finance verify**: Margin 19.7% 和 ROE 32% 是强 Owner 证据,但 Rev 未兑现。Divergence 需下季度 backlog + segment mix 披露。

**Break**: Backlog 增长停滞 / 油气恶化 + DC 增速不够 offset / ETN / Siemens 在 custom DC 段加大竞争

**Action**: `Track` — 设 **下季度 earnings 监控**:
1. 关注 segment mix 里 Data Center 占比是否 ≥15%
2. 关注 backlog 绝对值和 book-to-bill(>1.2 = upgrade 条件)
3. 若 DC 占比跳到 ≥20% + backlog 增长 → **Upgrade to Initiate**

---

## Cross-Pick Summary · Portfolio 配置逻辑

**Initiate 6 picks 的分仓逻辑**(如果构建组合):

- **组合 anchor(标准仓, beta <1.5)**: BWXT(0.79)+ AEIS(1.35)= 稳健压舱
- **主力 AI alpha(小-中仓, beta 1.5-2.0)**: ALAB(1.79)+ MTSI(1.48)= 主力 AI 表达
- **严格小仓(beta >2 或 FCF 未验证)**: CRDO(2.72)+ MOD(FCF 负)= 高 alpha 高风险

**Track 2 picks**:
- POWL: 下季度 backlog 数据前不持仓
- CAMT: Rev 增速回到 ≥15% 前不持仓

**Watch 2 picks**(未 deep dig):
- UCTT: Rev -10% 反向 flag 未解
- ACLS: Rev -5.6% cyclical 底部 flag 未解

---

## 监控设置 · POWL Backlog Tracking

**下次 earnings disclosure**(Powell Industries 财年 Q3 FY2026, 预计 2026-05 披露):

重点关注:
- [ ] Total backlog 绝对值和 QoQ 变化
- [ ] Book-to-bill ratio
- [ ] Segment mix 里 Data Center 占比(%)
- [ ] 管理层对 DC 订单 pipeline 的前瞻
- [ ] Oil & Gas 段订单趋势

**Upgrade 阈值**(满足任一):
- DC segment Rev 占比 ≥20% 且 QoQ 环比 growth
- Backlog +30%+ YoY
- Book-to-bill >1.3 持续 2 季度

**Downgrade 阈值**(满足任一):
- Backlog QoQ 持平或下降
- DC 订单 pipeline 管理层降温
- Oil & Gas 段急剧恶化无 DC offset

---

## 不在本轮 deep dig 的名单及状态

- **UCTT / ACLS**: Watch 档,Rev 反向 flag 未解,等下季度数据
- **Category B 施工商(PRIM / IESC / DY / MTZ)**: 不同 alpha category(cyclical 受益者,非 chokepoint owner)见 `ai_hardware_L4_outer_2026-04-18.md`
- **AXTI / WWD / APH 等**: 已被排除(AXTI diffusion 过度发酵,WWD 被 ATI 替代,APH layer 过深)

---

## Change log

- 2026-04-18 v1: 初版 deep dig,覆盖 L3 八个 flag-free picks(ALAB / AEIS / BWXT / MTSI / MOD / CRDO / CAMT / POWL),Action state 定格 — Initiate 6 / Track 2
- 触发 framework 升级: CLAUDE.md 跨层硬规则新增 #9(Causal Distance Limit)
