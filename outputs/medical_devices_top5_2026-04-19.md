# Medical Devices Top 5 — Duration Owner Validation

> **Date**: 2026-04-19
> **Scope**: US-listed medical device makers · 6-18 month investable window
> **Framework**: FROG + SCOPE-A v2 + 跨层硬规则 1-9 + v2.1 bridge/duration hard test
> **Validation target**: 在非航空 / 非电力的第三类行业上测试 v2.1 duration owner 硬测试(installed-base 窗口 ≥ 2× deployment + 可量化切换成本)的可迁移性. 医疗器械是 duration owner textbook 土壤 (implant + service + consumable + regulation lock-in), 适合检验 GE/PWR 的 framework 是否真迁移得过来
> **Data basis**: 训练知识截至 2026-01; FY24 数据 + Q1-Q3 2025 业绩. Q1 2026 earnings + 当前估值多档未 MCP 验证, 相关处用 ⚠ 标注
> **Underlying thesis**: 医疗器械当前处于 "低 attention × 混合 fundamentals" 状态 — GLP-1 narrative 压制部分 sub-sector 估值 + 手术机器人 / 影像 AI / 心血管介入等 sub-sector 继续累积 installed base + monetization. 市场缺少统一 narrative 让它处于 "quiet improvement / underfollowed" 最佳 duration owner 猎场
> **needs_patch**: true — BDX 的 "Multi-workflow bridge (weak)" 描述在 validation memo (`bdx_becton_v2_validation_2026-04-19.md`) 中被 v2.1 硬测试正式边界否决. 下次扫描应修正 BDX 定位为 "duration-only, 不是 bridge"; MDT 的 action_state 从 "Initiate light" 仍成立(post-validation 确认). 触发协议见 `08_CANDIDATE_QUEUE_MECHANISM.md` R3

---

# Quick Reference · 排序规则 + Top 5 全局

## 排序规则(6 条, 沿用 aviation v2)

1. **FROG 先过关** — 任一维度 Fail = 自动 Watch/Avoid (宪法 Article IX)
2. **Duration hard test 通过优先** — installed-base 窗口 ≥ 2× deployment + 可量化切换成本, 两条全过才算 structural duration
3. **Bridge 通过单独排序** — 不混入 duration bucket (skill rule #2, 不同 gap type 分桶)
4. **Owner 三层完整度** — Revenue / Profit / Return 三层全通 > 只通过两层
5. **Hot-theme penalty** — 已被 generalist 充分覆盖 (ISRG / ABT) 需要 expectation 仍然不完整才能保留在 Top
6. **财务 verify, 不 decide** — PE / FCF / margin 不驱动排名, 只验证因果链未断 (跨层硬规则 #6)

## Top 5 · Structural Duration Owner (主桶)

| # | Ticker | Expression Layer | 主要入选理由 | Duration hard test | Action |
|---|---|---|---|---|---|
| **1** | **MDT** | 多线 duration + 潜在 bridge | F (aging + chronic + procedure) + 四条相对独立需求 (cardiac rhythm + spine + diabetes + neuromod) + O 三层全通 + G (PE 17x, out-of-favor, generalist 缺乏热情) | ✓✓ installed base vs deployment >3x (多数植入物服役 10-15 年, deployment 3-5 年); 切换成本 = FDA + MD habits + follow-up 生态, 可量化 | `Initiate (light, FY26 执行验证前)` |
| **2** | **GEHC** | 影像 installed base + 长期服务合同 | F (影像诊断 forced + hospital CapEx 周期) + R (全球仅 4 家 MR/CT 厂: GEHC / Siemens / Philips / Canon) + O (Services attach rate 稳态高) + G (post-spin 2023 仍在 ratings compression) | ✓✓ 设备服役 10-15 年, 服务合同 15-25 年 → ratio ~5-8x; 切换成本 = 影像 workflow 整合 + 培训 + PACS 集成, 数百万美元级 | `Initiate` |
| **3** | **BDX** | 医院 consumables duration (razor+blade) | F (hospital 日常耗材 forced + sterilization + sample 采集) + R (FDA 认证 + 医院 POS 黏性) + O (Revenue 多条产品线, GM 稳态) + G (spin-off (Waters) 2025 年落地后市场消化期, PE 低位) | ✓ 耗材 (needles/syringes/catheters) 每天消耗 = 持续 monetization; installed-base 概念在 workflow 层而非设备, 硬测试按**合同/采购 lock-in** 判定通过 | `Initiate` |
| **4** | **ISRG** | 手术机器人 installed base + 器械/耗材 recurring | F (MIS 渗透率仍在上升 + 医院预算 forced) + R (da Vinci 安装基数 ~9,000+, 竞争者 Mako/Hugo 近期但 scale 差距大) + O 三层全通 (ROIC >20%) + G **弱** (generalist 充分覆盖) | ✓✓ 机器人服役 10-15 年, I&A 每台每年 $150-300K → ratio ~6-8x; 切换成本 = 外科医生培训 2-3 年 + procedure lock-in | `Track Position` (hot-theme penalty, 不主动建仓) |
| **5** | **STE** | 医院 sterilization + instrument repair 隐性 duration | F (院内感染控制 + 器械复用 forced) + R (IOSS / AST specialty 认证 + scale) + O (Healthcare segment GM 稳态, Recurring 占主) + G (规模 $20-25B, 非 generalist 主要关注对象) | ✓ 灭菌服务 & 维修合同 multi-year, 按医院设备 installed base 间接计时; 切换成本 = 监管验证 + 医院审批周期 | `Initiate (light)` |

**桶警告 (skill Step 7)**: 以上 5 家均归 "structural duration owner" 单一 bucket, 排名可比. 下方 Observation 为**不同 bucket** (narrative re-rate / cyclical decel), 不与 Top 5 混排.

## Observation · 不同 bucket, 合格但不入 Top 5

| Ticker | Bucket | 不入 Top 5 原因 | 迁入条件 | Action |
|---|---|---|---|---|
| **RMD** | Narrative re-rate (GLP-1 overhang) | 虽通过 duration 硬测试 (CPAP 患者 10+ 年 + mask/supplies 每 3-6 月) 但当前股价由 GLP-1 减重减 OSA 叙事主导, 属**不同 alpha category** (cyclical re-rate) 不与 structural duration 混排 | Q2-Q3 2026 earnings 显示 GLP-1 对 OSA 新增客户的影响 <10% → 叙事 overshoot 被实证证伪 | `Observation` (独立 cyclical 桶) |
| **DXCM** | Narrative re-rate (GLP-1 + competition) | 同 RMD 的 GLP-1 overhang + Libre (ABT) 竞争压力; T1 糖尿病需求 forced 且 CGM 不可替代, 但 T2 部分可能被 GLP-1 侵蚀 | T1 segment growth 维持 ≥15% YoY + T2 CGM 证明 GLP-1 不削减 sensor 频率 | `Observation` |
| **EW** | Growth decel (structural owner 但 expectation gap 在收敛) | TAVR 本身通过 "durable implant + long follow-up" 但**新增量**增速放缓 (BSX Acurate + MDT Evolut 竞争), Duration hard test 通过但 G 维度在 shrink | TAVR global volume 加速 >15% YoY 或 MitraClip 新 indication | `Observation` |
| **ABT** | Bridge candidate but generalist-known | 跨 cardio + diabetes + diagnostics + nutrition 是真 bridge (4 独立 trigger), 但市值 $180B + generalist 充分覆盖, expectation gap 窄 | -15%+ 回调 或 某 segment 加速不被 consensus 捕捉 | `Observation` |

## 不在任何名单 (硬 Fail)

- **ILMN** (Illumina): razor+blade 经济被 Element Biosciences / Ultima / Complete Genomics 竞争稀释, Duration hard test **切换成本 failing** — 新平台替代 lead time 缩短. FROG-O Fail (owner clarity 不稳) → Avoid
- **ZBH** (Zimmer Biomet): hip/knee 植入物虽有 installed base 但 **OEM 价格年降 + Stryker Mako / J&J Velys 机器人 orbital 侵蚀**; Duration 硬测试"可量化切换成本"未能防止 ASP 侵蚀. FROG-O Borderline → Avoid
- **ALGN** (Align): Invisalign 青少年段仍在, 成人段消费周期性压力 + SDC 破产后同业竞争重燃; 属 consumer cyclical 非 structural duration → Avoid (本框架 scope)
- **HOLX** (Hologic): 女性健康 + 诊断混合, 部分通过 duration (Genius 3D mammography 服务合同) 但 COVID 测试回吐后增长不稳, Attention-fundamentals 不匹配 → Watch (不入 Observation list)

---

# 详细条目 (Top 5)

## #1 · MDT · Medtronic

**Action**: `Initiate (light)` (FY26 执行验证前不建议满仓)

**Why this action**:
- **Multi-chain bridge potential**: cardiac rhythm + spine + diabetes (MiniMed) + neuromod 四条需求的上游 trigger 独立 (心律失常患病率 / 椎间盘退变 / T1 糖尿病管理 / 慢性疼痛) → bridge 硬测试**通过**
- **Duration owner 多层叠加**: 每条 line 都有 implant + follow-up + consumable 的 razor+blade 结构
- **Expectation gap**: 2021-2024 执行 miss 打低 multiple 到 PE ~17x, generalist 放弃跟踪 (ORCL-style out-of-favor); 任何一条 line 重新加速 = 错价修正
- **Causal-first 信号**: FY25 Diabetes segment guidance 重新 +hi-single YoY, Cardiac 保持 low-to-mid single, Spine 在稳中反弹

**Upgrade signal (Initiate → Add)**:
- 连续 2 季度 organic revenue growth ≥ 5% (当前 mid-single 底部)
- Diabetes 780G / CGM 集成产品新 indication + payer 扩面
- Spine robotic (Mazor) + AI 手术导航贡献可验证 organic growth

**Downgrade signal (Initiate → Trim)**:
- 任一 2+ 个 segment 同时 organic growth <2% 持续 2 季度 (bridge 失效的第一信号)
- Renal Care divestiture 类大结构重整拖累多年
- PE 上修至 22x+ (按 MDT 历史 multiple cycle 已近顶)

**Break condition (Exit)**:
- Diabetes pump / CGM 被 GLP-1 + Libre 双压击穿 (T1 需求 forced 但 T2 部分可被替代)
- GAAP FCF 连续 2 年 ⚠ 低于 $5B (当前 ~$5-6B, 需 MCP 验证)
- 新 CEO 战略偏离 "multi-chain duration owner" 模式向单点增长押注

**⚠ 财务 verification (需 MCP 验证)**: FY26 organic revenue 增速 / FCF / SBC 真值 / Diabetes segment unit economics. 未验证前 action 限制为 light.

---

## #2 · GEHC · GE HealthCare Technologies

**Action**: `Initiate`

**Why this action**:
- **Duration 硬测试强过**: MR/CT/Ultrasound 设备服役 10-15 年 + 服务合同 15-25 年 + spare parts + AI upgrade = installed base monetization window 显著超过 deployment 周期
- **Chokepoint**: 全球影像设备 OEM 仅 4 家 (GEHC / Siemens / Philips / Canon), Samsung 在 ultrasound 有限地位; FDA + 医院集采门槛让新进入者 lead time >5 年
- **Post-spin compression**: 2023 spin 后 ~2 年市场仍对比 GE 工业母公司叙事, 对 Services attach rate 稳态 (>40% revenue) 消化不完整
- **Causal-first**: FY24-25 services growth 5-7% YoY (mid-single), AI imaging (Critical Care Suite / Edison) 贡献开始计入

**Upgrade signal**:
- AI-integrated imaging 新 SKU 的 attach rate 超预期 (Services/Recurring 占比升到 45%+)
- 医院 CapEx cycle Q2-Q4 2026 回升 → 新系统 order growth 加速
- PCS / Imaging organic growth 加速到 8%+ 持续 2 季度

**Downgrade signal**:
- 中国市场 orders 再次 negative (2024 已经跌过一次)
- Services margin 因 field engineer 劳动力成本恶化 >100bps 持续 2 季度

**Break condition**:
- Philips / Siemens 通过软件/AI 包侵蚀 GEHC 服务合同续约率 (attach rate 永久下台阶)
- 重大 quality/recall 事件 (GEHC 历史上较少但非零)
- GAAP FCF margin ⚠ 低于 12% 持续 2 年

**⚠ 财务 verification**: 当前 FCF margin / Services attach rate 具体数字 / 中国 orders 现状.

---

## #3 · BDX · Becton Dickinson

**Action**: `Initiate`

**Why this action**:
- **Razor+blade 规模化 duration**: 全球最大医疗 consumables 厂商之一 (syringes / needles / catheters / 样本采集 / drug delivery); 医院 workflow 层面 lock-in 而非单设备 lock-in, 切换成本是"整条流程重新认证"
- **Multi-workflow bridge (weak)**: BD Medical + BD Interventional + BD Life Sciences 覆盖不同 clinical pathway, 但 terminal demand 都是"hospital operations", 严格按 v2.1 bridge 硬测试**未必通过 trigger-independence** — 这里留 flag, 实际按 duration owner 处理更准确
- **Waters spin (2025) 消化期**: Life Sciences 分出后市场仍在 re-rating BDX 的核心 Medical + Interventional, PE 被压在 16x
- **Forced demand**: 注射 / 输液 / 样本采集是医疗 forced operation, 非可选

**Upgrade signal**:
- Waters spin 整合后 organic revenue growth 稳定在 5-7%
- BD Interventional (Bard 整合) segment margin 改善 >200bps
- 胰岛素注射笔 / GLP-1 delivery device 受益于 GLP-1 用量增长 (这是 GLP-1 narrative 的**反向利好**, 与 DXCM/RMD 相反)

**Downgrade signal**:
- 医院 CapEx/OpEx 压力传导到 BD 续约价 (过去 2 年已有信号)
- 某 segment integration issue 拖累 margin

**Break condition**:
- 持续性 FDA quality 问题 (BDX 历史上有 Alaris 召回案底)
- 大型 hospital GPO (Premier / Vizient) 主导议价导致 ASP 结构性下行

**⚠ 财务 verification**: post-spin 新 revenue base / EPS guidance / GLP-1 delivery 产品线增速.

---

## #4 · ISRG · Intuitive Surgical

**Action**: `Track Position` (已持仓者, 新建仓应等回调; hot-theme penalty 启用)

**Why this action**:
- **Duration 硬测试最强样本**: da Vinci 安装 ~9,000+ 系统, 每台每年 I&A + service $150-300K, 服役 10-15 年 → ratio ~6-8x, 医生培训锁定 procedure flow, 竞争者 Mako (SYK, 骨科) / Hugo (MDT, 2024 才开始商用) scale 差距 10 倍+
- **Hot-theme penalty 触发**: 大行、对冲基金、长线资金普遍重仓; sell-side 覆盖饱和; 估值 PE 60x+ (⚠ 需 verification) — expectation gap **narrow**
- **保留在 Top 5 理由**: 按 skill rule #4, hot-theme 若满足 "expectations are still incomplete" 可保留. ISRG 的 long-duration I&A + SP model (single-port) 渗透率 + Ion (肺活检) 仍有未被完全 price-in 的 tail; 但这需 active catalyst 才兑现

**Upgrade signal**:
- SP (single-port) 装机突破年 +25% 持续 2 季度
- Ion 系统进入头部学术医疗中心的 installed base
- Hugo / Mako 实际渗透 <2% (已超预期 2 年)

**Downgrade signal**:
- Hugo 或 Mako 装机突破年 300+ 台 → ISRG share 开始被侵蚀
- PE 向 100x+ 推挤 → 不进建仓

**Break condition**:
- Medicare / 商业险开始差异化定价对机器人手术 (目前 DRG 下 robotic 溢价在收窄信号)
- 新型手术方式 (NOTES / AI-navigated open) 结构性替代 MIS

**⚠ 财务 verification**: 当前 PE / FCF growth / SP 装机 cadence / Hugo 真实装机数.

---

## #5 · STE · Steris

**Action**: `Initiate (light)`

**Why this action**:
- **Hidden duration owner**: 院内灭菌 + 手术器械维修服务, 按医院 installed base 间接计时; 不在 generalist 的医疗器械主流候选池中, 属"跟着 capacity 一起吃饭"的隐性 service owner
- **Forced demand**: 院内感染控制 + FDA IOSS/AST 认证要求灭菌达标, 非可选
- **Switching cost 可量化**: 替换灭菌供应商需 FDA validation + 医院质管审批 6-18 个月, 加上合同通常 3-5 年 multi-year, 结构性粘性强
- **2023-2024 执行恢复**: COVID 冲击后 2023 QRSG (Quality Research Services Group) 拖累出表, 2024 重新向"纯 STE" regress → 估值消化期

**Upgrade signal**:
- AST (全球灭菌服务外包) organic growth 重新加速到 high-single
- Healthcare segment margin 恢复到 pre-COVID 20%+ 水平
- 设备制造外包客户 (医疗器械厂出厂灭菌) backlog 加速

**Downgrade signal**:
- Cantel 整合成本超预期 (已基本消化但仍是风险)
- 某 Healthcare 终端客户 (大医院集团) 合同流失

**Break condition**:
- 替代灭菌技术规模化 (ethylene oxide EtO 被替代或监管禁用) 可能逆向利好 STE 核心业务; **reverse kill switch** 在 EtO 监管大扰动时需重评

**⚠ 财务 verification**: Healthcare segment margin / 合同续约率 / AST 外包业务增速.

---

# 子主题分析 · Duration hard test 按 sub-theme 结果

| Sub-theme | Duration 硬测试 ratio | 切换成本可量化 | 代表 ticker | 进 Top 5? |
|---|---|---|---|---|
| 手术机器人 | **6-8x** ✓✓ | 医生培训 2-3 年 ✓ | ISRG | ✓ (#4, hot-theme 降级) |
| 影像设备 + 服务 | **5-8x** ✓✓ | PACS 集成 + 培训 ✓ | GEHC | ✓ (#2) |
| 院内灭菌服务 | **4-6x** ✓ | FDA validation + 医院审批 ✓ | STE | ✓ (#5) |
| 多线植入物 + 随访 | **3-5x** ✓ | FDA + MD habits ✓ | MDT | ✓ (#1) |
| Hospital consumables (razor+blade) | 按 workflow lock-in 间接 ✓ | 流程重新认证 ✓ | BDX | ✓ (#3) |
| CGM / 胰岛素泵 | **3-5x** ✓ 但面临 GLP-1 | FDA 集成 + payer ✓ | DXCM | — (narrative bucket) |
| CPAP + masks | **4-6x** ✓ 但面临 GLP-1 | patient 生活 routine ✓ | RMD | — (narrative bucket) |
| TAVR 结构性心 | **2-3x** (临界) | FDA + 医生培训 ✓ | EW | — (growth decel bucket) |
| 骨科植入 | **2-3x** (临界) 但 ASP 侵蚀 | 机器人 orbital 削弱 ✗ | ZBH | — (fail, 硬测试切换成本 failing) |
| 测序 razor+blade | **原 ≥5x 但正被替代** ✗ | lead time 缩短 ✗ | ILMN | — (fail) |
| 牙科 aligner | **2-3x** | 消费周期性 ✗ | ALGN | — (out of scope) |

---

# v2.1 Framework 验证观察 (同步反馈给下一轮)

**Duration hard test 在医疗器械的可迁移性**: ✓ 通过. 和 GE Aero 案例一致 — 当 deployment 周期可界定、installed base monetization 窗口可估、切换成本可量化时, 硬测试给出可 falsify 的 yes/no. 医疗器械比商用航空更**密集**的 duration candidates, 几乎每个 sub-theme 都能跑.

**新发现 — "workflow lock-in" 是 installed-base 的第二种形式 (BDX 案例)**: BDX 不是典型"设备 installed base", 而是"医院 procedure flow 内的采购 lock-in". 硬测试按**合同 / GPO 关系 / FDA 认证路径**计时, 也能通过. 这提示 v2.2 可考虑在 duration hard test 里加一句 "installed base 可以是物理设备或 workflow procedure lock-in, 二者等价".

**Bridge 硬测试在医疗器械少见**: MDT 是最接近 bridge 的 — cardiac + spine + diabetes + neuromod 四条 trigger 相对独立 (心律 ≠ 椎间盘 ≠ T1 糖尿病 ≠ 慢性疼痛), 但终端需求都是"医疗支出". 严格按 v2.1 trigger-independence 测试算**通过**(触发机制独立), 按 terminal-demand 算**失败**. Quanta 案例的定义修正 (trigger 独立 + ≥30% resilience) 在这里复用有效 — 若 diabetes 被 GLP-1 大幅压缩, cardiac + spine + neuromod 仍能独立支撑 ≥70% revenue.

**"Hot-theme penalty" 被首次显式触发 (ISRG)**: sector scanner rule #4 + v2.1 expression selector "time-horizon can shift" 共同裁决 ISRG 从潜在 #1 降到 #4 且 action = Track Position 而非 Initiate. 这是框架的一个 subtle 加值 — 质量最高的 duration owner 未必是最佳表达.

**未暴露新缺口**: 本轮 Top 5 ranking 过程中, v2.1 的三个 skill 和 bridge/duration 硬测试未暴露新的 "需立即修复" 定义边界. 建议 v2.2 升级等第三个**非同质行业**(e.g., 铁路 bridge / 国防 sustainment)再评估.

---

# Change log

- 2026-04-19 v1: 初版. 按 sector-expectation-gap-scanner rule #2 / Step 7 (bucket 分离), Top 5 限于 "structural duration owner" 单一 bucket, narrative re-rate (RMD/DXCM) 与 growth decel (EW) 单列 Observation
- Data basis: 训练知识 2026-01, FY24-25 基础, Q1 2026 earnings 未入; financial verification 标 ⚠ 部分未完成

---

# Next Step

按 08_CANDIDATE_QUEUE_MECHANISM 的 T1 trigger 追加 candidate_queue.yaml:
- Top 5 → `status: raw` (sector scanner 产出, 待完整 validation memo 才能 validated)
- Observation → `status: raw` 但 notes 标注 different bucket
- 最高优先验证 candidate: **MDT** (最有 bridge × duration 双通过潜力, 且 v1 认知空白最大)
