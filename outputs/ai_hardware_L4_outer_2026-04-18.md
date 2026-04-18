# AI 硬件产业链 · L4 Outer Ring 候选池

> **Date**: 2026-04-18
> **Scope**: AI 硬件产业链的**外层**上下游(L4),补充 L3 hidden upstream 列表
> **Framework**: FROG + SCOPE-A v2 + CLAUDE.md 跨层硬规则 1-9(新增 #9 Causal Distance Limit)
> **Data basis**: 训练知识至 2026-01;无本次 MCP 验证(市值和财务数据未跑)
> **本文件定位**: **候选池扩展参考**,不是 ranked 名单。与 `ai_hardware_hidden10_2026-04-18.md` 互补,不替代

---

## L4 的定位

继续向外追上游会遇到 **causal distance trade-off**:

- **L1 Leaders**(NVDA / TSM / AVGO) — 完全定价, 不选
- **L2 Obvious hidden**(CEG / VRT / GEV / KLAC 等) — generalist-known, v1 淘汰
- **L3 Upstream hidden**(MTSI / CRDO / ALAB 等) — 已 run 150-355% 但仍有 alpha
- **L4 Outer ring(本文件)**: 材料 / 施工 / 特种设备 — **diffusion 更低, 但 AI alpha 密度也下降**
- **L5+**: 进入"AI-adjacent speculation" 区, Rule #9 禁止

**L4 的代价**: beta 下降 + commodity / 周期性敞口上升。**不是 L3 的替代, 是补充**。

---

## Category A · Chokepoint Owners(结构性稀缺, 与 L3 同纪律)

### A1 · MP · MP Materials · rare earth 垂直整合

- **Chokepoint**: **美国唯一**的 rare earth 矿 + 加工 + 磁体垂直链。NdFeB 磁体用于 DC 电机 / 冷却风扇 / 备份磁驱
- **Active catalyst**: DoD 战略补贴 + Pentagon 稀土 off-take contract + MP 投产 Fort Worth 磁体厂
- **Rule #7 诊断**: 过去 2 年主流叙事是"中美脱钩 + DoD 战略",**不是 AI 主题** — AI 链接是 emerging narrative
- **Rule #8**: 市值 $6-10B ✓
- **Rule #9 传导链**: hyperscaler CapEx → DC 建设 → 冷却 + 备份电源 → 磁体需求 → MP 产能。**每步可量化但 beta 稀释**(磁体只是 DC 成本 <1%)
- **Action 初步**: Observation(AI 不是主驱动)

### A2 · CCJ · Cameco · 铀矿开采

- **Chokepoint**: 西方最大铀矿, CEG 等核电运营商的燃料上游
- **Active catalyst**: Nuclear for DC buildout 推动铀长约;Cameco 与 Westinghouse JV 锁定下游燃料 cycle
- **Rule #7 诊断**: 商品周期 + 加拿大背景让 AI 主题基金少持
- **Rule #8**: ~$30B ✓
- **Rule #9 传导链**: hyperscaler SMR 承诺 → 核电容量扩产 → 铀需求上升 → Cameco 产能利用率。**传导真实**但从"hyperscaler 决策"到"铀价兑现"有 3-5 年时滞
- **Action 初步**: Observation(时滞长)

### A3 · TTMI · TTM Technologies · 高端 PCB

- **Chokepoint**: AI 加速卡 + 高频信号 PCB,国防 + 汽车 PCB 规模优势,转 AI 应用在扩
- **Active catalyst**: Penang 新厂产能投产 + 防务 + AI 双 vector 订单
- **Rule #7 诊断**: 历史"国防 + 汽车 PCB"小 cap 标签, AI accelerator PCB 线尚未完全定价
- **Rule #8**: ~$3-5B ✓
- **Rule #9 传导链**: hyperscaler GPU 订单 → AI accelerator 主板 → 高层 HDI PCB → TTMI 订单。**3 步可量化**,单位含金量较 L3 稀释
- **Action 初步**: **Track Position** 候选

### A4 · ROG · Rogers Corp ⚠️ · 高频 / RF 层压板

- **Chokepoint**: RF / 高频特种层压板(mmWave / 5G / EV / AI accelerator 副业务)
- **Rule #7 诊断**: 主要 5G / EV 主题,AI 线只是增量
- **Rule #8 ⚠️ Flag**: 市值 ~$2-3B 边界,**竞品 Taconic / Arlon / 日韩**,非独家垄断。**若跌破 $2B 即触发 Rule #8 排除**
- **Rule #9 传导链**: 同 TTMI 但更远(AI 是 ROG 的 3rd 业务线)
- **Action 初步**: **Watch**(Rule #8 边界)

### A5 · KLIC · Kulicke & Soffa · 先进封装设备

- **Chokepoint**: wire bonding + hybrid bonding 装备;HBM 堆叠 + chiplet 封装是增量驱动
- **Active catalyst**: 3D-bonding 向 HBM4 / CoWoS-L 过渡
- **Rule #7 诊断**: 传统 IC 封装 equipment 小股, AI 链接逐渐被认知但未完全定价
- **Rule #8**: ~$2-3B ✓(边界)
- **Rule #9 传导链**: hyperscaler GPU → HBM 堆叠量 → 先进封装设备订单 → KLIC 高端 bonder 份额。**3 步清晰**
- **Action 初步**: **Track Position** 候选

### A6 · NVMI · Nova Ltd · 半导体 metrology 特种

- **Chokepoint**: 以色列半导体 metrology 小- to mid cap,KLAC 覆盖之外
- **Active catalyst**: AI 节点(<3nm, GAA)complexity 放大 metrology 需求
- **Rule #7 诊断**: 以色列 ADR 让它在 KLAC / AMAT 阴影下被低估
- **Rule #8**: ~$4-6B ✓
- **Rule #9 传导链**: hyperscaler AI chip 订单 → 先进节点产能爬产 → metrology 工具需求 → NVMI / KLAC 分单。**清晰**,alpha 密度中等
- **Action 初步**: **Track Position** 候选

---

## Category B · 施工商(不同 alpha category, 独立纪律)

> **重要**: 以下 4 个是 **AI DC buildout 受益方**,不是 **chokepoint owner**。承包商模式的经济特征(利润率薄 / backlog 周期 / 项目执行风险)与 chokepoint owner **完全不同**, 混排会让读者用同一套纪律看两种 alpha — 违反 Rule #5(Alpha category purity)。

### B1 · PRIM · Primoris Services · utility 施工
### B2 · IESC · IES Holdings · 电气 / DC 施工
### B3 · DY · Dycom Industries · 光纤基础设施施工
### B4 · MTZ · MasTec · grid + infrastructure 大承包商

**共通入选理由**:
- **Forced demand 真实**: AI DC buildout 需要实体建设 + 电气安装 + 光纤铺设 + 电网升级
- **市场标签遮蔽**: 被归类 "generic construction / utility",被 industrial / utility 分析师主导覆盖,不是 AI 基金重仓
- **市值都 $3-10B**: Rule #8 自动过门槛

**独立纪律(与 chokepoint owner 不同)**:
1. **不是长期复利持有** — 承包商模式的上限由 backlog + 执行能力决定,不像 chokepoint owner 可以复利 decade+
2. **expansion clock 监控尤其关键** — DC buildout boom 过后, backlog 向"普通 utility 项目"回归, margin 正常化
3. **破裂信号**: 单季 book-to-bill <1.0 持续 / AI CapEx 增速降至 <20% / 项目延期 + cost overrun 事件
4. **退出信号**: 不与 A1-A6 混用 — 施工商应在 AI buildout cycle 放缓时**主动 Trim**,而 chokepoint owner 可能仍 Hold

**Rule #9 传导链检查**:
- hyperscaler CapEx $400B/年 → DC buildout $120B → 施工合同 $30B → top 4 施工商分 $15B → 各家份额 $2-5B
- **4 步清晰可量化** ✓
- 但 **causal distance = 4 步** 比 A1-A6 的 3 步更远, 说明这组是"AI cyclical 受益", 不是"AI structural chokepoint"

**初步 Action**: Category B 整体 **Track(with 独立纪律)** — 不是 Initiate 主仓候选, 是 **cyclical trade 候选**, 应和 aviation AER 一样在**独立 cyclical table** 追踪

---

## 三个诚实 caveat(不变于 L3 版本)

1. **Causal distance 变长 = AI alpha 密度下降**。Category A 里 MP/CCJ 单位收入 AI 占比可能 <20%,远低于 L3 的 MTSI/CRDO/ALAB 纯 AI 敞口
2. **Commodity / cyclical 敞口放大**: MP/CCJ 受 commodity 驱动;Category B 全部受建设周期驱动。**风险分类和 L3 的 structural chokepoint 不同**
3. **承包商陷阱**: Category B 若在 AI buildout 顶峰被追,会在周期回落时显著跑输 chokepoint owner —— 需要严格 timing

---

## 元层观察

**L3 → L4 的扩张每层都在付出 AI alpha 密度的代价**:

| 层 | 诊断 | 意义 |
|---|---|---|
| L3 (hidden upstream) | 已 run 150-355% 但 chokepoint pure | 结构性 alpha 仍在 |
| **L4-A** (outer chokepoint) | diffusion 更低但 commodity/cyclical 染色 | alpha 存在但需要 AI narrative 稀释 |
| **L4-B** (constructors) | diffusion 低,受益真实,但 cyclical | 需独立纪律 |
| L5+ | AI-adjacent speculation | **Rule #9 禁止** |

这暴露了框架在 2026 年 AI 覆盖环境下的一个**natural boundary** — 纯 "AI chokepoint hidden owner" 在 US-listed 里**接近枯竭**。未来可能需要:
- 扩展到 ADR / 全球市场(需要新治理风险评估)
- 或切换到**AI-specific software + hardware 结合层**的 specialty
- 或接受 commodity/cyclical 染色但保持纪律分离

---

## 不落入本文件的 类别(主动排除)

- **Keysight (KEYS)** — optical test,市值 ~$30B,已相当定价
- **Viavi (VIAV)** — optical test,~$1-2B + 非独家 → Rule #8 拒绝
- **Cohu (COHU)** — semi test handler, ~$1-2B + 非独家 → Rule #8 拒绝
- **Photronics (PLAB)** — photomasks, ~$1-2B + 非独家(与 Toppan / DNP 共享市场) → Rule #8 拒绝
- **Rogers 若跌破 $2B** → 自动 Rule #8 拒绝
- **Uranium small caps(UEC / UUUU)** — 市值小 + 非独家 → Rule #8 拒绝(即使 AI 链接存在)
- **纯 commodity 上游**(铜 / 钢 / 水泥) → Rule #9 排除(causal distance 过远)

---

## 下一步

本文件是**候选池扩展参考**。**不进 deeper causal dig**(因为 Rule #9 + causal distance 让大多数 L4 不具备做主仓 Initiate 的 alpha 密度)。

**推荐的下一步回到 L3**: 对 **AEIS / POWL / CRDO / ALAB** 做 deeper causal dig,那里 ROI 比继续 L5+ 外扩更高。

---

## Change log

- 2026-04-18 v1: 初版,10 个候选(6 chokepoint owner + 4 施工商)分两 category
- 2026-04-18 v1 同期: CLAUDE.md 跨层硬规则新增 #9(Causal Distance Limit),用于约束 Rule #7 的外扩不失控
