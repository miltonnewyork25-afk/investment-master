# 08_CANDIDATE_QUEUE_MECHANISM.md

## Purpose

定义 `outputs/candidate_queue.yaml` —— 一个单文件候选池,解决两个已验证的 gap:

1. **Discovery 漏识别** — `ai_hardware_L4_outer_2026-04-18.md` 覆盖 PRIM / MTZ 漏 PWR(Quanta)。无机制让漏网的 ticker 再次浮现
2. **无用户指令时无候选来源** — GE / Quanta 验证靠用户点名触发;session 开工时 agent 没有自主候选队列

**不是**新 Layer / 新 skill / 新 ranking framework。**是**单文件 + 3 条 append trigger + 3 条 promote/archive 规则。

与 FROG / SCOPE-A / CMTD+M 不重叠(那些是 validation 方法,这是**排队与派工**)。

---

## 1. 数据结构

路径: `outputs/candidate_queue.yaml`

```yaml
candidates:
  - ticker: PWR
    trend_attached: "北美电力基础设施多触发共振 (grid + DC + renewables + 电气化)"
    source_engine: propagation-mapper
    source_output: outputs/ai_hardware_L4_outer_2026-04-18.md
    created_at: 2026-04-19
    last_reviewed: 2026-04-19
    status: validated         # raw | watchlist | validated | archived
    action_state: Initiate    # 仅 status=validated 时填, 取自宪法 Action States
    notes: "Bridge hard test pass; 详见 pwr_quanta_v2_validation_2026-04-19.md"
```

**字段约束**:
- `ticker`: US-listed only(本 agent scope)
- `trend_attached`: 一句话 forced demand + restricted node 描述
- `source_engine` 枚举: `sector-expectation-gap-scanner | propagation-mapper | trend-source-mapper | user-hypothesis | monitoring-patch`
- `status`: 仅 4 种, 不设 Tier 1-5

---

## 2. Append Triggers (3 条)

**T1 · Sector 扫描产出时**: `sector-expectation-gap-scanner` 或任何 `*_top{N}_*.md` 产出时, **Top N + Observation list 全部** ticker append 为 `raw`. Top N 在 `notes` 标注 scanner 建议的 preliminary action (e.g. "scanner: Initiate, pending validation memo"); Observation 在 `notes` 标注所属不同 bucket (narrative re-rate / cyclical decel / bridge-but-known)。硬 Fail (Avoid) 列表不入队。理由: 被扫描看见但没完整 validation 的 ticker 不能只留在 source_output, 否则 queue 不 track 最高优先待验证对象 (medical_devices scan 首次暴露此 gap, 2026-04-19 修正)。

**T2 · Propagation mapper 跑完时**: Step 5 识别出**当前 queue 未列的** US-listed bridge / duration owner → append 为 `raw`。PWR 漏识别即此 trigger 缺失。

**T3 · Validation memo 结论为 watchlist 时**: 对应 ticker 状态 `watchlist` + 写入 monitoring variables(memo 的"迁入 trigger"段)。

---

## 3. Promote / Archive (3 条)

**R1 · Raw → Validated**: 完成一份完整 validation memo(三元问题 + 硬测试 + verdict)时, 升级到 `validated` 并填 `action_state`。

**R2 · Watchlist → Validated / Archived**: monitoring variable 触发 upgrade → 重跑 validation → `validated`; 触发 Kill Switch 或 180 天无变化 → `archived` + 填 archive reason。

**R3 · Validated 必须回流 source output**: ticker 变 `validated` 时, 对应 source sector table(如 `aviation_top5_*.md`)frontmatter 标 `needs_patch: true`, 提示下次扫描回看是否调位。**此条替代独立 Monitoring Loop skill**。

---

## 4. Ranking = queue 的 sort order

不建独立 Ranking Layer。默认 sort order:

1. `watchlist` 且 `last_reviewed` > 60 天(等最久的先回看)
2. `raw` 且 `source_engine ∈ {propagation-mapper, trend-source-mapper}`(因果 engine > 广撒 scanner)
3. 其余 `raw` 按 `created_at` 倒序
4. `validated` 仅 periodic review 时 top(如季度末)
5. `archived` 默认不显示

每次 session 开工: 读 queue top 3, 选一个跑。**全部** ranking 逻辑。无 7 dimension, 无 Research Optionality 量化。

---

## 5. Flexibility

- 用户显式点名的 candidate 直接进 validation, 可跳过 queue
- Queue 为空时 agent 主动调用 discovery engine 填充, 不阻塞
- Archived 候选在大市场状态变化时可手动 resurrect
- 偏离 default sort 时在 validation memo §0 标注理由

---

## 6. 不做什么 (避免 03A §11 占位陷阱)

- 不做 Ranking dim 1-7 独立评分
- 不做 Research Optionality 量化(有真案例暴露必要性再加)
- 不做 Monitoring Loop 独立 skill(R3 的 `needs_patch` 覆盖最小用例)
- 不做 Tier 1-5 分级(4 种 status 够)
- 不做 multi-entry / dynamic query 等 meta-framework(都在 rewording 宪法)

**触发复杂化的条件**: 3 个月后 queue > 50 条 **且** 4 种 status 明显不够 **且** 有具体案例暴露现规则的误判 —— 三个条件同时满足才细化。在那之前, 任何"完善"都是占位。

---

## 7. 初始 seed(基于本 session 已产出)

```yaml
candidates:
  - ticker: PWR
    trend_attached: "北美电力基础设施多触发共振 (grid aging + DC CapEx + renewables + 电气化, 四触发机制独立)"
    source_engine: user-hypothesis    # 本轮为 v2.1 验证目标
    source_output: outputs/pwr_quanta_v2_validation_2026-04-19.md
    created_at: 2026-04-19
    last_reviewed: 2026-04-19
    status: validated
    action_state: Initiate
    notes: "Bridge hard test pass (trigger independence + α-chain ≥40% resilience)"

  - ticker: GE
    trend_attached: "商用航空发动机 MRO super-cycle (LEAP shop visit 2026-2033+ 叠 CFM56 延寿)"
    source_engine: user-hypothesis
    source_output: outputs/ge_aero_v2_validation_2026-04-19.md
    created_at: 2026-04-19
    last_reviewed: 2026-04-19
    status: validated
    action_state: "Observation (等 time-horizon frame 切换)"
    notes: "Duration owner pass (installed-base 2.0-2.5x deployment); v1 诊断理由被 v2 修正"

  - ticker: TDG
    trend_attached: "航空 aftermarket sole-source 结构性 owner"
    source_engine: sector-expectation-gap-scanner
    source_output: outputs/aviation_top5_2026-04-18.md
    created_at: 2026-04-18
    last_reviewed: 2026-04-18
    status: watchlist
    notes: "Top-quality owner 但无 active catalyst; 迁入条件见 source_output Obs-1"

  - ticker: AER
    trend_attached: "Boeing 交付延迟+供应紧张的航空 lessor 周期错价"
    source_engine: sector-expectation-gap-scanner
    source_output: outputs/aviation_top5_2026-04-18.md
    created_at: 2026-04-18
    last_reviewed: 2026-04-18
    status: watchlist
    notes: "Cyclical mispricing 不同 alpha category; Boeing 月产 ≥42 = Trim / ≥48 = Exit"
```

---

## 8. 与现有铁律的关系

- 宪法 Article IV.1 (NEVER start from "find stocks similar to X"): queue 的 `trend_attached` 字段强制每个 ticker 必须挂在 trend 上, 防 ticker-first
- 宪法 Article IX (四要素缺 ≥2 降级): R1 要求完整 validation memo 才能 validated, 防止跳过 FROG
- 03A §11 (反官僚): §6 "不做什么"清单是本 mechanism 对自己的约束
- 铁律 G (Context 管理): queue 作为持久化状态文件, 压缩/恢复时优先 Read

---

**一句话总纲**: 这个 mechanism 的存在不是为了"架构完整", 是为了让漏识别的 Quanta 下次能自动浮现, 让已 validated 的 GE 下次 sector 扫描时能自动回流。仅此两件事。
