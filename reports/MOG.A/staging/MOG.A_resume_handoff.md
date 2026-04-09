# MOG.A — Resume Handoff (2026-04-09, Phase 4 完成)
> 会话中断前最后状态, 用于 /clear 后恢复
> 替代旧的 P0 handoff (归档为 `_P0.md.bak`)

## 当前精确状态

**Ticker**: MOG.A (Moog Inc., NYSE, A&D Tier-2 supplier)
**当前 Phase**: **Phase 4 完成, 待进入 Phase 4.5 + Phase 5**
**Worktree**: `/Users/milton/投资大师/.worktrees/半导体`
**Branch**: `半导体`
**最近两次 commit**:
- `4a9f32b4` feat(MOG.A): Phase 4 red team — RT-1 finds Phase 1 data error
- `673b46ef` feat(MOG.A): Phase 2+3 v2 rewrite — Python-verified valuation + Polymarket

## 主线 thesis (H1 — 会计-现金剪刀差)

**Phase 4 后 7 层证据** (原 8 层, RT-1 删除 L9 contract asset 错误):
- L1: FCFF 6yr mean $99.6M [DM-FCFF-007]
- L2: CapEx/D&A 1.54x [DM-CAPEX-002]
- L3: CCC 196 天 [DM-WC-005]
- L4: 同业 FCF/NI 22% vs peer 105%
- L5: Python 6 模型收敛 $104-$124
- L6: FCFE 6yr −$600 to −$830M/year [DM-FCFE-001]
- L7: ROIC 9.31% vs WACC 9.5% = −19bp [DM-ROIC-001]
- L8: 博弈论 + Polymarket 综合 −$14
- ~~L9: contract asset 64x~~ **RT-1 删除**

## 最终估值数字 (Phase 4 后)

**加权中心 $104/股** (current $313.25), **期望回报 −66.0%**

**三点估值**: 悲观 **$73** (30%) / 中性 **$100** (50%) / 乐观 **$175** (20%)

**初步评级**: **[贵 × 未确认 × 无催化] × (临界) → 审慎关注 (临界)**
- "未确认" 等 Q2 FY26 earnings (2026-04-24)
- "(临界)" 黑箱 32% ≥ 30% (R-4 触发)

## 核心数据锚 (DM registry)

| 指标 | 值 | DM ID |
|---|---|---|
| Market cap | $9.94B | DM-QUOTE-003 |
| **Current EV** | **$10.83B** | DM-EV-003 ★ |
| **Current EV/EBITDA** | **22.2x** (vs FMP stale 15.1x) | DM-EV-004 ★ |
| Net debt | $884M | DM-LEV-001 |
| Diluted shares | 31.74M | DM-SHARE-001 |
| FY25 EBITDA | $488M | DM-EBITDA-001 |
| FY25 FCFF | $124.6M | DM-FCFF-001 |
| **6-yr FCFF mean** | **$99.6M** | DM-FCFF-007 |
| 3-yr FCFF mean | $82.6M | DM-FCFF-008 |
| **FY25 ROIC** | **9.31%** | DM-ROIC-001 |
| WACC estimate | 9.5% | DM-WACC-001 |
| Quality adjustment | 0.396 (ROE × √OM) | DM-QA-001 |
| Peer median PE | 49x bubble / 28x hist | DM-PEER-PE-001 |
| Ukraine ceasefire end-2026 | **24.0%** | DM-POLY-UKR-001 |
| Taiwan clash by 2027 | **13.5%** | DM-POLY-TWN-001 |

## 文件清单 (全部已 committed)

### Staging
- `staging/MOG.A_phase1_part1.md` (16,453 chars)
- `staging/MOG.A_phase1_part2.md` (17,323 chars)
- `staging/MOG.A_phase2.md` **v2** (29,683 / 64 DM / 5 Mermaid)
- `staging/MOG.A_phase3.md` **v2** (19,950 / 33 DM / 3 Mermaid)
- `staging/MOG.A_phase4.md` (18,734 / 7 DM)
- `staging/thesis_crystallization.md` (3,306)
- `staging/MOG.A_default_map_audit.md` (6,515)
- `staging/MOG.A_handoff_P1.md`, `MOG.A_cq_routing.md`
- `staging/MOG.A_resume_handoff.md` (本文件)

### Data
- `data/phase0_financial_snapshot.md` — FMP 6yr P&L/BS/CF (Phase 0)
- `data/phase2_fresh_data.md` (10,941) — FMP key-metrics 6yr + peer compare 2026-04-09
- `data/phase3_polymarket.md` (8,703) — Ukraine/Taiwan CLOB 概率
- `data/valuation_model.py` — Python 估值脚本, `python3` 可重跑
- `data/valuation_output.txt` (7,274) — Python 输出

## RT-1 重大发现 (Phase 5 回流必须执行)

**Phase 1 Ch 8.1 "contract asset $12M → $769M 64x growth" 是错误 interpretation**:
- FMP balance-sheet 6yr 实数: FY24→FY25 是 accountsReceivables → otherReceivables **presentation reclassification**
- ΔAR −$613.5M, ΔOther +$735.7M, **netReceivables 净增只 $122M**
- FY23→FY25 真实 netReceivables: $1,141M → $1,251M = **+$110M** (与营收 +16% 同步)
- **不是 WC 爆炸吞噬, 是会计分项重分类**

## Phase 5 组装回流清单 (铁律 00 无痕化)

1. **Phase 1 Ch 8.1** 删除 "contract asset 64x" 论述, 替换为 "netReceivables +$110M over 2yr (正常营收驱动); 主要 WC 吞噬来自 inventory +$190M"
2. **Phase 2 v2 Ch 12.2** ΔWC 曲线 $70→$35 改为 **$40→$20**
3. 所有 Phase 2/3 引用 "$91" / "−71%" → **"$104" / "−66%"**
4. **Default map audit** 失灵事实 #2 (CEO 零买入) → 降级为"辅助观察"
5. Phase 5 执行摘要按 S-3 三段式

## Phase 4.5 / Phase 5 下一步

### Phase 4.5 (未开始)
1. 产 `staging/MOG.A_compression_test.md`:
   - **New definition 候选**: "会计 EPS 的现金幻觉机器" (14 字)
   - 三链接: variable reorder (backlog → TTM FCF/NI) / valuation language (PE → OE DCF) / explained anomaly (FCFE 6yr −$4.28B)
   - Expansion test ≥3 子模块
2. 产 `staging/MOG.A_phase4_handoff.md`:
   - Phase 5 engineering requirements
   - ≥30 DM 锚点必填清单 (已有 114, 大部分可复用)
   - ≥10 Mermaid 图必填清单 (Phase 2+3 已 8, 补 10+)
   - ≥4 mid-assembly checkpoints (50K/100K/150K/200K)

### Phase 5 (未开始)
- 单会话组装 Complete (~240K+ chars target)
- 按 S-3 三段式执行摘要
- R-4 硬约束: 三点估值, 禁单点目标价, "(临界)" 标注
- 每 50K 调 `scripts/mid_assembly_check.sh`
- 最终 `tests/quality_gate_complete.sh` 全部 PASS

## 量化进度实测

```
Phase 1 Part 1+2    33,776
Phase 2 v2          29,683
Phase 3 v2          19,950
Phase 4             18,734
Thesis + default     9,821
Staging 合计       111,964

Data 合计          ~26,918
Grand total        ~138,882
```

| 指标 | 当前 | 目标 (Tier 3) |
|---|---|---|
| Total chars | 138,882 | 240-375K |
| 完成度 | **37-58%** | — |
| DM 锚点 | ~114 | ≥450 (目标 ≥30 新增 Phase 5) |
| Mermaid | 8 | ≥25 (Phase 5 补) |
| Python 估值 | ✅ | ✅ |
| R-1 归因 | ✅ | ✅ |
| R-2 剪刀差 | ✅ (3+) | ✅ |
| R-3 圆桌 | ✅ (5/5 bearish) | ✅ |
| R-4 认知边界 | ✅ (32% 黑箱) | ✅ |

## 恢复指令 (下次 /clear 后)

在 `/Users/milton/投资大师/.worktrees/半导体` 目录说:

**选项 A — 最简**:
```
继续 MOG.A Phase 4.5
```

**选项 B — 完整**:
```
继续 MOG.A, cd 到 /Users/milton/投资大师/.worktrees/半导体,
读 reports/MOG.A/staging/MOG.A_resume_handoff.md 了解状态,
然后进入 Phase 4.5 (compression test + P5 engineering manifest),
接着 Phase 5 单会话组装 Complete (240K+ chars target)
```

## 关键 commit hash 备份
- `4a9f32b4` — Phase 4 红队 (RT-1 重大发现)
- `673b46ef` — Phase 2+3 v2 rewrite
- `9b200de6` — main 分支 base (feat(framework): Tier 3 Delivery Discipline v1.0)

---
**Saved**: 2026-04-09
**context_save.sh 已执行**: 15 files, 527,538 chars 快照
**可安全 /clear**
