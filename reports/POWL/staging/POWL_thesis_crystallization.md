# POWL — Thesis Crystallization (Phase 0.75 核心矛盾结晶)

> **用途**: Phase 0.75 强制产出, 把 Phase -1 到 Phase 0 的所有证据结晶为**母命题 + 核心变量 + Kill Switch**
> **配套文件**: `POWL_default_map_audit.md` (S-1 对齐产物)
> **下游**: Phase 1-3 围绕本文件的母命题组织; Phase 4.5 产 `compression_test.md` (S-2); Phase 5 Ch 1 显式呈现

---

## 1. 母命题 (一句话 thesis)

> **POWL 不是 AI 数据中心纯 beta, 而是"LNG+公用事业承包主力 + 15% backlog DC optionality"混合体, 被市场按纯 beta 47x PE 定价, 而实际 25-30% 营收依赖一个已接近 peak 的 LNG 周期 + 1-2 个 hyperscaler megaproject. 合理估值在 $130-180 区间 (vs 当前 $241), overshoot 30-45%。**

### 母命题的三重内核

1. **范畴错分**: 市场把混合体 (LNG 主干 + DC 期权) 当纯 AI beta (DC 主干) 定价
2. **周期错位**: 市场把 peak-cycle GM 29.4% + peak-order backlog $1.60B 当稳态, 实际 FY25 Q4 已 peak
3. **过度定价**: Reverse DCF 隐含 10Y FCF CAGR 19.9%, Base 情景 FY25-30 营收 CAGR 仅 5%, 估值 overshoot 2-4x

---

## 2. 核心变量 (胜出变量 vs 市场默认变量)

### 市场默认变量 (被 47x PE 定价的)
- 季度 DC 订单绝对值 ($100M+ megaproject)
- Backlog YoY 增速
- Book-to-bill ratio

### 我们判断的胜出变量 (真正决定估值的)

| 胜出变量 | 当前值 | 阈值含义 | 数据源 |
|---------|-------|---------|--------|
| **V1: DC 收入占总营收比** | FY25 2.4% → FY26E 15-20% | <15% 说明混合体定价失败 | FY 10-K + Q 披露 |
| **V2: GM Run-rate** | FY25 29.4%, FY26Q1 28.4%, FY26 guide ~28% | <27% 两季 = 周期性 3pp 消失, EPS 打 9 折 | 季度 earnings |
| **V3: LNG 订单窗口 Book-to-bill** | Q1 FY26 = 1.75x | <1.0 两季 = FY27-28 营收缺口 | 季度披露 |
| **V4: Jacintoport 产能利用率** | 2026Q4 完工, 2027 首报 | <70% 2027 = 管理层 LNG 押注失败, 定价权崩 | 管理层措辞 |
| **V5: 新 LNG FID 节奏** | 2025 已 FID 33.5 mtpa | <15 mtpa/年 2026-2027 = 2029+ 订单真空 | FERC/EPC 报告 |

### 胜出变量的权重

- V1 DC 占比 > V2 GM > V3 LNG book-to-bill > V4 Jacintoport > V5 FID 节奏
- V1 决定**范畴判断** (混合体 vs 纯 beta)
- V2-V3 决定**周期位置** (peak vs plateau)
- V4-V5 决定**下行拐点时间表** (2027 vs 2029)

---

## 3. 证据链 (五路合流)

### 路径 A: 营收结构 (证伪"AI beta"定义)
- FY25 营收 mix: 油气 37% + 石化 14% + 公用 25% + 商业/工业 16% (含 DC 2.4%) + 其他 8%
- Q1 FY26 backlog mix: 油气 30% + 公用 30% + 商业/工业 22% (含 DC 15%) + 其他 18%
- Backlog 52% 来自"公用+商业" = 首次超过油气, 但转型过程中, 当期营收仍 51% 重工业
- [DM-REV-001, DM-BL-001]

### 路径 B: 管理层 CapEx 信号 (证伪"AI beta"管理层判断)
- Jacintoport $12.4M 扩产, 100% 用于 LNG (模块化 + 双岸码头 1,150 ft + Gulf Coast 地理)
- 零投入于 DC 标准化产品线 (对比 VRT 2023-2024 扩 Power Management Systems; ETN 扩三相 UPS)
- 管理层自己"3-5 年 LNG 强周期"措辞 = 基本盘是 LNG 而不是 DC
- [DM-CAPEX-001, DM-CAPEX-002, DM-MGMT-001]

### 路径 C: Margin Bridge (证伪"稳态 margin")
- GM FY22 16% → FY25 29.4% = +13.4pp
- 结构性 6pp: 规模效应 5.5pp + utility mix 0.5pp (可持续)
- 周期性 8pp: LNG POC 大项目 3.5pp + 供给紧张定价权 3.5pp + close-outs 1pp (可回吐)
- Q1 FY26 GM 28.4% (-300bps QoQ) + 管理层 guide upper 20s (~28%) = 自己承认 1.4pp 不可持续
- [DM-GM-001, DM-GM-002, DM-MGMT-003] + `margin_bridge.py`

### 路径 D: LNG Cycle (证伪"3-5 年持续强周期")
- 订单窗口 ISD-24m 模型: 2024=34.6 mtpa 加权 (peak) → 2025=18.7 → 2026=10.4 → 2027=9.9 (真空期)
- 2026 Plaquemines+Corpus 3+Golden Pass 集中完工, 2027 只剩 Rio Grande T1 + CP2
- Eaton Omaha $30M 2027H1 投产 + Schneider/ABB 扩产 → 2027+ 供给压价
- Base 情景 FY25-30 营收 CAGR = 4.9% (管理层口径); Bull CAGR = 9.1%; Bear CAGR = -3.3%
- [DM-LNG-001 ~ 006] + `lng_cycle_timeline.py`

### 路径 E: 估值对照 (证伪"47x PE 合理")
- Reverse DCF 当前价隐含 10Y FCF CAGR 19.9% (WACC 10%, Terminal g 3%)
- Base 情景 FY25-30 营收 CAGR 5% + GM 回落 2pp → EPS CAGR ~3% → 隐含 PE 应 20-25x
- 可比公司 PE: ETN 32x, HUBB 23x, NVT 23x, Schneider 30x, ABB 26x — POWL 47x 是 1.6x 溢价
- SOTP 估值: LNG/油气 51% @ 15x + 公用 25% @ 25x + DC 15% @ 期权定价 + 其他 → $130-180
- [DM-CMP-001 ~ 007] + `reverse_dcf_initial.py`

---

## 4. Kill Switch v3 (最终版, 3 红 3 黄 3 绿)

### 🔴 红灯 (任一触发 = thesis 证实, 评级从"关注"下调至"审慎")

| 代号 | 条件 | 证伪什么 | 数据源 | 预期触发时间 |
|------|------|---------|--------|------------|
| R1 | Backlog 环比下降 ≥10% 连续两季 + BTB <1.0 | 订单动能反转 | 季度 earnings | 2026H2-2027H1 |
| R2 | GM 回落 <27% 连续两季 | 周期性 3pp 消失, EPS 打 9 折 | 季度 earnings | 2026H2-2027 |
| R3 | DC backlog 占比 <10% 连续两季 + 绝对值回落 | 混合体的 DC optionality 失败 | 季度披露 | 2026H2-2027 |

### 🟡 黄灯 (任一触发 = 预警, 增加 Kill Switch 观察)

| 代号 | 条件 | 含义 | 预期触发时间 |
|------|------|------|------------|
| Y1 | Q2-Q3 FY26 未再披露 DC 大订单 ($50M+) | 单季 mega 是一次性 | 2026H2 |
| Y2 | 大 hyperscaler 2026 CapEx guidance 下调 ≥20% | 行业需求动能减弱 | 2026H2-2027 |
| Y3 | 内部人 Q2-Q3 FY26 disposed ratio <0.5 持续 | 管理层持续减持 | 进行中 |

### 🟢 绿灯 (任一触发 = 上修, 评级可上调)

| 代号 | 条件 | 上修幅度 |
|------|------|---------|
| U1 | 单季 DC 订单 ≥$200M (Q1 FY26 翻倍) | +15% 公允价值 |
| U2 | POWL 宣布第二个扩产项目, 明确为 DC 标准化产品线 | +20% |
| U3 | 2027 新 LNG FID > 30 mtpa (如亚洲长约重启) | +15% |

### 下修加速 (叠加触发)

| 代号 | 条件 | 下修幅度 |
|------|------|---------|
| D1 | ETN/Schneider 在北美中压 switchgear 赢得 POWL 历史客户 recompete | -20% |
| D2 | LNG cycle 转负 (单季 LNG 订单 <$50M 两季) + 美国 LNG 终端项目延期 | -25% |

---

## 5. 时间表 (Thesis 验证日历)

### 2026 Q2 FY26 (日历 2026-02 ~ 2026-04) — 已过
- 已披露: Q1 FY26 订单 +63% YoY, BTB 1.75x, DC megaproject $100M+
- 观察点: 初步确认 mega order 非一次性 (Y1 触发观察)

### 2026 Q3 FY26 (日历 2026-05 ~ 2026-07) — 即将
- 观察: 内部人 disposed 持续? (Y3), GM 维持 28%+? (R2 预警)
- 关键: 第二个 hyperscaler megaproject? (U1 触发机会)

### 2026 Q4 FY26 (日历 2026-08 ~ 2026-10)
- **Jacintoport $12.4M 扩产完工** (2026-Q4)
- 观察: 管理层对 Jacintoport 订单填充程度的措辞
- 关键: FY27 guidance (首次暗示 2027 年方向)

### 2027 Q1-Q2 FY27 (日历 2026-11 ~ 2027-04)
- **Jacintoport 首个完整季度产能利用率** (V4 首次可测)
- **Eaton Omaha $30M 扩产 2027H1 投产** (D1 竞争升温)
- 观察: 新 LNG FID 节奏 (V5 触发)

### 2027 Q3 FY27 onwards
- Base 情景: GM 回落, LNG 订单窗口收窄, FY28 营收缺口开始显现
- 概率: 60% Base / 25% Bull / 15% Bear

---

## 6. 可证伪性声明 (研究纪律 #9 诚实>完整)

### 本 thesis 在什么条件下错误?
- **错误条件 1**: DC 市场规模超预期, POWL 以小盘灵活优势赢得多个 hyperscaler (非 1-2 个) → 胜出变量 V1 突破 25% 稳态, 混合体变成真 AI beta
- **错误条件 2**: 2027+ 新 LNG FID 节奏重启 (如亚洲 long-term 长约), Eaton Omaha 扩产被 LNG 需求吸收 → 周期性 3pp 不消失
- **错误条件 3**: 管理层 Jacintoport 扩产后续追加 DC 专用扩产 → CapEx 信号纠正
- **错误条件 4**: GM 稳态在 28%, 而非 25-27% → 结构性 bridge 比拆分估计更高 (7pp 而非 6pp)

### 已认识但无法量化的黑箱区域
- POWL 在具体 LNG 终端 (Plaquemines/Corpus Stage 3/Golden Pass/Rio Grande) 中的 share of wallet — **硬数据不可得** (EPC 分包合同不公开)
- 单一 $75M DC megaproject 的 hyperscaler 名字 — 管理层只披露"首个", 推测 MSFT/META/GOOGL 之一
- Jacintoport 订单 pipeline 已签约 vs 未签约比例 — 管理层语焉不详
- Q1 FY26 0.26 内部人 disposed ratio 的机制: 10b5-1 vs 期权到期 vs 自由裁量 — SEC Form 4 明细需要分析
- [认知边界: 黑箱 ~20-25% → 对估值单点目标价会保留 ±15% 区间]

---

## 7. 对 Phase 1-3 的指令

### Phase 1 (护城河 / 竞争)
- 围绕 V1 (DC 占比) 深挖: POWL 在 DC 中的真实定位 vs VRT/ETN
- 围绕 V4 (Jacintoport 产能) 深挖: 模块化 vs 标准化的护城河差异
- 识别 POWL 真实护城河: 不是技术壁垒, 是 **地理位置 + 大项目认证 + Bechtel/Chiyoda EPC 关系 + 零商誉高 ROIC 资本效率**

### Phase 2 (财务深度 / 归因 / 剪刀差)
- R-1 财务归因: 必须产出 5 年 GM Bridge + 收入 Waterfall + EPS Bridge (Phase 0 已有初稿)
- R-2 剪刀差 (≥3):
  * #1 油气 +20% vs 石化 -19% (同板块分化 = LNG 单点而非全面油气恢复)
  * #2 Q1 FY26 订单 +63% vs 营收 +4% (backlog 积压但确收节奏慢)
  * #3 PE +158% (5Y) vs EPS +70% (5Y) (估值剪刀差)

### Phase 3 (估值 / 对标)
- 必须做 SOTP (3 段): LNG/油气 + 公用 + DC optionality
- Reverse DCF 对照: 当前价隐含 19.9% 10Y → Base 情景 5% → 压力差
- 可比公司 PE 对照: 47x vs 23-32x (ETN/HUBB/NVT/ABB)

### Phase 4 (红队 / 圆桌)
- R-3 圆桌 (5-6 位): 巴菲特 (周期股+护城河质量) / 芒格 (反向思考+too hard) / Howard Marks (周期位置) / Klarman (安全边际) / Druckenmiller (反身性) / Soros (叙事动量)
- 预测多数票倾向: **"关注 (不买)"** (周期高位 + 估值 overshoot)

### Phase 4.5 (结晶 / compression_test S-2)
- 新定义命名候选 (≤10 字):
  * **"混合体错贴"** (LNG 主干被贴 AI beta 标签)
  * **"转型中途被定 peak"** (转型 50% 完成时被按完成定价)
  * **"三色锭条被当金条"** (油气/公用/DC 三色被当纯 AI)
- S-2 压缩: 变量重排 (DC 绝对值 → DC 占比), 估值语言切换 (单 PE → SOTP), 解释失灵 (为何 LNG 主干仍被 AI PE 吃掉)

---

## 8. 评级预估 (Phase 4.5 待最终确认, 非 commit)

### 预期评级 (Phase 4.5 最终确认前)

| 维度 | 状态 | 证据 |
|------|------|-----|
| 价值状态 | **贵** | 47x PE vs SOTP $130-180 隐含 23-28x PE |
| 方向状态 | **peak 已过 / 未确认下行** | FY25 Q4 GM peak, FY26 Q1 -300bps QoQ, 但 backlog 仍强 |
| 催化状态 | **混合信号** | 正催化: 2026 LNG 交付 peak / 负催化: Jacintoport 完工后利用率风险 |

**预期评级**: **审慎关注** (期望回报 <-10%) 或 **中性关注** (-10% ~ +10%)
- 若 LNG cycle 情景 = Base → 审慎关注 (目标 $150, 下行 ~-38%)
- 若 LNG cycle 情景 = Bull → 中性关注 (目标 $210, 下行 ~-13%)
- 若 LNG cycle 情景 = Bear → 审慎关注 ++ (目标 $100, 下行 ~-58%)

### 认知边界 (R-4 预估, Phase 5 正式量化)

| 维度 | 预估值 |
|------|-------|
| 可推演度 | 75-80% (LNG cycle 有公开数据, DC 黑箱) |
| 业务复杂度 | 3/5 (多技术 + 工程项目 + 半周期) |
| 黑箱比例 | 20-25% (EPC 分包 + 客户名细 + 订单 pipeline) |
| 单点 vs 区间 | **必须区间** (黑箱 >20%), $130-180 或三点 ($150 base / $100 bear / $210 bull) |

---

## 9. 已产出文件清单 (Phase 0 → 0.75)

| 文件 | 层级 | 用途 |
|------|------|------|
| `data/launch_brief.md` | 过程 | 复杂度估计+参考教训 |
| `data/lit_recon_memo.md` | 证据 | Phase -0.5 文献侦察 |
| `data/phase0_shared_context_v2.md` | 证据 | Phase 0 综合 context |
| `data/reverse_dcf_initial.py` | 量化 | 隐含增速求解 |
| `data/margin_bridge.py` | 量化 | GM +13.4pp 结构/周期性拆分 |
| `data/lng_cycle_timeline.py` | 量化 | 订单窗口 + 历史对照 + 情景 |
| `staging/POWL_P0_financial_snapshot.md` | 证据 | DM 锚点库 |
| `staging/POWL_P0_margin_bridge_deep.md` | 证据 | Margin bridge 深度 |
| `staging/POWL_P0_lng_cycle_deep.md` | 证据 | LNG cycle 深度 |
| `staging/POWL_P0_industry_alignment_internal.md` | 过程 | 产业链对齐 (**最终无痕化**) |
| `staging/POWL_default_map_audit.md` | **S-1 对齐** | 市场默认 + 5 失灵事实 |
| `staging/POWL_thesis_crystallization.md` | **Phase 0.75** | 母命题 + 5 胜出变量 + Kill Switch v3 (本文件) |

---

## 10. 下一步 (Phase 1 启动条件)

Phase 1 开始前, **必须读**以下三个文件作为 context:
1. 本文件 (母命题 + 胜出变量)
2. `POWL_default_map_audit.md` (4 元素 + 5 失灵事实)
3. `phase0_shared_context_v2.md` (硬数据 + 对比表)

Phase 1 的执行要求:
- 主线 = 胜出变量 V1-V5 的独立证据验证
- 必须调用 `moat-evaluator` (护城河) + `expectation-gap` (预期差) — rule-U Phase 1 必须
- 可选 `game-theory-lens` (竞争博弈) + `workflow-shift-detector` (AI 影响 optionality)
- 禁止调用 `red-team-suite` / `content-engine` (Phase 1 禁用 per rule-U)

---

**一句话总纲**: POWL 不是 AI beta, 是被按 AI beta 定价的 LNG 周期股 + DC 期权混合体. 母命题 7 词: **"混合体被按纯 beta 错定价"**.
