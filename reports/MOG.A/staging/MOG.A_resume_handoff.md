# MOG.A Tier 3 v2.0 — Resume Handoff
> 2026-04-09 | Phase 0 完成 → Phase 1 待启动
> **/compact 或 /clear 后用本文件恢复**

## 首条动作 (resume 时立即执行)

```bash
cd /Users/milton/投资大师/.worktrees/半导体
pwd && git branch --show-current
# 应该显示: 半导体 worktree, 半导体 branch
```

然后**按顺序读**这 4 个文件(不要多读):
1. `CLAUDE.md` 第 44-100 行 — **Tier 3 Delivery Discipline v1.0** (新 Discipline 的三个动作 + 禁止 + 承诺)
2. `reports/MOG.A/staging/MOG.A_default_map_audit.md` — **Phase 0.75 产出, 新 Discipline 核心**
3. `reports/MOG.A/data/lit_recon_refresh_2026-04-09.md` — 2026-04-09 fresh 事实层
4. `reports/MOG.A/data/phase0_peer_comps.md` — 7 peer 对比表

**不要读**:
- `archive_v1_failed/*` — 污染锚定
- `data/knowledge_context.md` — 无关公司硬匹配
- `data/lit_recon_memo.md` (旧版) — 已被 refresh 替代
- `knowledge/output_side_audit_rubric.md` 或任何 `rule-S-delivery.md` — **新 Discipline 明文禁止**

## 项目状态

| 项 | 状态 |
|---|---|
| Ticker | **MOG.A (FMP: MOG-A)** |
| 行业 | 航空防务 / 精密运动控制 |
| Tier | 3 |
| Version | **v2.0** (v1.0 已 archive, 状态 GAVE_UP_AT_QG) |
| 目标字符 | **200K** (用户指定, 非 launch brief 默认 240-375K) |
| 目标分数 | **4.4** |
| **Delivery Discipline** | **v1.0 原生验证中** (首份报告) |
| Phase | **Phase 0 完成, Phase 1 待启动** |
| 价格锚 | **$313.25 (2026-04-09)**, 市值 $9.9B |

## 核心矛盾 (Phase 0.75 结晶)

**市场默认看法**: MOG 是 A&D rerating 篮子里最便宜的落后补涨者, 追赶 PH 到 EV/EBITDA 18x 就能到 $400。核心变量: backlog (+30%) × book-to-bill (2.1x) × adj OM 扩张 (10.9→13.0%)。

**3 个失灵事实**:
1. **[强]** FY2026 美国国防 base budget $838.7B, 比 FY25 $895.2B **下降 6.3%** — 叙事归因错 (真实驱动是欧洲 €800B + 导弹 supplemental, 不是美国 base)
2. **[中]** CEO Roche 18 个月零买入, 但股价翻 2.4x — 管理层信号 vs 市场信号不对称
3. **[中]** ROIC 9.3% 配 EV/EBITDA 隐含 18x, 数学对不上 — 除非 margin 扩张是结构性 (非周期)

**新 thesis 种子问题** (Phase 1-4 待回答):
- **A**: 欧洲 + 导弹 supplemental 占 S&D 分部真实比例? (结构 vs 一次性)
- **B**: Q1 FY26 adj OM 12.3% 来源? (production rate vs mix/pricing)
- **C**: 2026-04-24 Q2 FY26 earnings book-to-bill / CA OM 双信号 → thesis 断裂点

## Phase 0 产出清单 (39KB 全部落盘)

| 文件 | 字符 | 作用 |
|---|---:|---|
| `data/checkpoint.yaml` | - | v2.0 状态 + 事实锚 + prior v1 meta |
| `data/phase0_financials.md` | 4.8K | MOG 10Y 财务 + Q1 FY26 + 分析师估计 FY26-28 |
| `data/phase0_peer_comps.md` | 4.9K | PH/WWD/CW/HWM/TDG/HEI 对比 (PE/EV-EBITDA/GM/OPM/ROIC) |
| `data/lit_recon_refresh_2026-04-09.md` | 6.3K | Phase -0.5 fresh (4 agents): 价格跳因 / Q1 FY26 segments / 国防预算 / 欧洲 / 公司治理 |
| **`staging/MOG.A_default_map_audit.md`** | **10.8K** | **新 Discipline 必备产出 #1** |

## 关键事实锚 (不要重查)

**FY25 (年结 2025-09-27)**:
- Rev $3,861M, GM 27.4%, Op Inc $410M, OPM 10.6%, Net Inc $235M, EPS $7.42 GAAP
- FCF $128M (conversion 55%), CapEx $145M
- Net debt $884M, Net Debt/EBITDA 1.81x, ROIC 9.3%
- Shares 32.1M diluted

**Q1 FY26 (2026-01-03, 报告 2026-01-30)**:
- Rev **$1,100M (+21%)**, GM 26.7%, adj OM **12.3% (+90bps)**, Adj EPS **$2.63 (+38%)**
- Segments: S&D $324M +31% (OM 14.8% +160bps) / MA $247M +16% (OM 11.4%) / CA $268M +23% (OM 10.6% -120bps 关税) / Ind $261M +14% (OM 13.9% +270bps)
- **Backlog $3.26B (+30% YoY)**, Bookings $2.3B, **Book-to-Bill 2.1x**
- FY26 guide: Rev $4.3B, Adj EPS **$10.20 ± $0.20**, adj OM 13.0%

**Peer 倍数** (FY25 基数):
- MOG.A: PE 27.6x, EV/EBITDA **15.1x (最低)**, ROIC 9.3%, GM 27.4%
- PH: PE 25.4x, EV/EBITDA 18.2x, ROIC 13.7%, GM 36.9% (**最佳镜像**)
- WWD: PE 34.0x, EV/EBITDA 22.7x
- CW: PE 42.6x, EV/EBITDA 33.8x
- HWM: PE 54.9x, EV/EBITDA 35.3x
- TDG: PE 37.0x, EV/EBITDA 22.8x (aftermarket 垄断, **不可硬对标**)
- HEI: PE 64.0x, EV/EBITDA 37.9x

**分析师估计**:
- FY26E EPS $10.18, FY27E $11.49 (+13%), FY28E $12.35 (+7%) — **增速急剧递减**
- FY26 与管理层指引 $10.20 对齐

**公司治理**:
- Dual-class 10:1 投票权 (Class B 强)
- ESOT 527,425 股 Class B = 11.5% B 类 (非家族直接控制)
- CEO Patrick Roche 2023-02 上任, 2024 comp $10.2M
- 18 个月内部人零买入, 21,598 股卖出 (routine vesting)
- 年会 2026-02-10 已过, 无活跃 activist, 无 class consolidation 提案

**下一关键事件**: **2026-04-24 Q2 FY26 earnings** (fiscal Q2 ends March 28/29)

## 待否决方案及原因 (压缩易丢, 显式记录)

- ❌ **读 v1.0 144K 正文** — 会被 -39% ER 锚定, 违反 Discipline
- ❌ **读 thesis_crystallization.md** (archive) — prior thesis, 锚定
- ❌ **把 knowledge_context.md 当参考** — TSM/TSLA/SOFI 硬匹配, 与 MOG 无关
- ❌ **从"它值多少"起点** — 新 Discipline 核心: 对齐+失灵在先, 估值在后
- ❌ **把 TDG 当 peer** — TDG 是 aftermarket 垄断商 (GM 60%), 与 MOG OEM 不同范畴
- ❌ **用自身历史 PE 15-20x 作锚** (v1.0 死因) — 应用 peer basket 当前倍数
- ❌ **机械套用 6 拍叙事重排 / 新定义延迟 25% / 三个钉子** — Discipline 已砍
- ❌ **读 output_side_audit_rubric.md / rule-S-delivery.md** — 明文禁止 FM2 污染
- ❌ **修补 v1.0 的"审慎关注"frame** — 应从失灵事实重构, 不是另起炉灶

## Phase 1 执行计划 (resume 后首动作)

**已达成用户同意**: "立即进入 Phase 1, 不暂停审议"

**Phase 1 结构**:
- **1A**: S&D 分部客户/地理/资金来源拆解 (种子问题 A) — 10-K footnotes + Q1 FY26 call transcript + Lockheed/RTX/Northrop commentary + ReArm Europe 流向
- **1B**: adj OM 12.3% 来源拆解 — 量价/mix/产能利用率/关税/Industrial divestiture 净影响 (种子问题 B)
- **1C**: 护城河 (sole-source actuators 证据) + 竞争格局 vs PH/CW/WWD

**产出**: `staging/MOG.A_P1_business_moat.md`, 目标 30-40K 字符

**前置动作** (可选): `bash scripts/find_best_reference.sh MOG.A` 找 A&D 同类 reference 方法论

**关键纪律** (resume 时一定记住):
1. 不读 v1.0 正文 / thesis_crystallization
2. 不从"估值过高/审慎关注"起点
3. **围绕 3 个失灵事实 + 3 个种子问题组织 Phase 1**
4. 写作时禁止出现 "handoff / 附件 / P1→P2 / staging" 等过程痕迹 (用户要求)
5. Phase 5 执行摘要必须是三段式(市场怎么看 + 失灵 / 实际是什么 + 新范畴 / 评级), **不是** checklist

## 用户显式指令记录 (跨 session 易丢)

1. **本次 Tier 3 用新 Delivery Discipline v1.0** (CLAUDE.md 第 44 行起)
2. **200K 目标 / 4.4 分目标** (覆盖 launch brief 默认值)
3. **handoff / 附件 / 备注禁止出现在最终报告正文**
4. **prior v1.0 的 $182 / -39% 不作为任何估值起点**
5. **写报告时若感觉某动作不自然, 必须说出来** (新 Discipline 最重要的一条)
6. **AI 不自评分, 写完后用户独立 skeptic 盲读审计**
7. **不要陷入提问怪圈** — 用户明确反馈过, 能按最优解处理的就不问
