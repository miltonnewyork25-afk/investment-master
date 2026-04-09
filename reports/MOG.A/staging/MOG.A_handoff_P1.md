# MOG.A Handoff Note — Phase 1 → Phase 2
> 2026-04-09 | 本轮 session 完成 Phase -1 → Phase 1 (Part 1 + Part 2)

## 1. 主要请求与意图
全新 Tier 3 深度调研 MOG.A (Moog Inc., 航空航天/国防精密运动控制). 用户要求: 下限 200K chars, launch_brief 目标 240-375K. 当前 session 完成 Phase 1 全部 (~49K staging). 用户说"类似情况不再询问", worktree 选在 `.worktrees/半导体` (行业不匹配但用户确认).

## 2. 关键技术概念
- **核心矛盾 (H1 主线)**: 会计-现金剪刀差假说。MOG 的 GAAP EPS 系统性高估真实股东回报 45-55%, 真实 Owner Earnings ~$110-185M/年 vs NI $235M
- **承重墙句**: "Moog 的护城河真 (程序认证+寿命支持), 但 backlog 每 $1 吃 $0.40 营运资金, CapEx/D&A 1.5-1.9x 让 $1 NI 只有 $0.45-0.55 到 FCF. 估值应用 FCF 锚不是 EPS 锚. $313 按 EPS 公允, 按 FCF 高估 40-60%"
- **跟踪一个指标**: TTM FCF/NI 比率
- **Kill Switch**: 
  - 多头赢: FY26 FCF ≥$200M AND FY27 FCF conversion ≥75% AND Q2 FY26 revenue +18%+
  - 空头赢: Q2 FY26 rev 回落 +10-13% AND FCF guide 下修 AND contract asset 继续膨胀
- **Q2 FY26 earnings 2026-04-24 是关键 data point**

## 3. 已完成文件 (按字符)
```
staging/MOG.A_phase1_part2.md      17,323 — 护城河+R-1归因+R-2剪刀差+Q供应链
staging/MOG.A_phase1_part1.md      16,453 — 核心争议+业务底盘+分部经济+D1-D5
staging/MOG.A_default_map_audit.md  6,515 — 3 失灵事实: 国防-6%/CEO零买入/ROIC-multiple
data/phase0_financial_snapshot.md   5,344 — FY20-25 income/BS/CF/ratios/estimates
data/lit_recon_memo.md              5,941 — 7 问题侦察
staging/thesis_crystallization.md   3,306 — H1/H2/H3 假说 + 评级区间
staging/MOG.A_cq_routing.md         2,429 — CQ1-6 路由 + M 修正器
data/phase0_peer_comps.md          (pre-existing)
data/lit_recon_refresh_2026-04-09.md (pre-existing)
data/launch_brief.md                4,443 — 目标 240-375K
```

## 4. 关键数字 (记忆锚)
- Price $313.25, Market cap $9.94B, EV/EBITDA 15.1x (FY22 8.5x)
- FY25: Rev $3.86B, NI $235M, EPS $7.33, **FCF $128M** (conversion 55%)
- FY23: Rev +9%, NI +10%, **FCF -$37M** (好年却负 FCF)
- 3yr FCF/NI: **22%** vs 同业 PH 123%/HEI 107%/TDG 97%/WWD 85%/CW 114%
- CCC 196 天, DSO 118, CapEx/Rev 3.7% (同业 1.6-2.6%)
- ROIC 9.3% vs WACC 8-9% (价差 0-1pp), 同业中位 12.4%
- Backlog Q1 FY26 $3.3B (+30%), book-to-bill 2.1x
- Contract asset (unbilled recv): FY23 $12M → FY25 $769M (**64x**)
- 4 分部 FY25: S&D $1.1B/15.1% OM / MA $888M/14.1% / CA $904M/11.8% / Industrial $956M/9.5%
- Industrial 剥离中 (FY26 预计完成)
- Normalized FCF ≈ NI - (CapEx - D&A) = 235 - 51 = **$184M**
- P/OE = 9940/184 = **54x** (合理应 25-30x → 股价 $145-185)
- 分析师覆盖仅 3-4 人, 低透明度
- Dual class: MOG.A (1/10 vote) + MOG.B (1 vote, 家族控制 75% 董事)
- CEO Patrick Roche (2023-02 上任), 18 个月零开市买入

## 5. 估值初判
- 60% H1 证实: 审慎关注 $145-220
- 25% 部分证伪: 中性关注 $250-310  
- 15% 完全证伪: 关注 $330-400
- **加权中心 $205-240** (下行 -23% 至 -35%)
- 三维标签 **[贵 × 未确认 × 无催化]** → **审慎关注候选**

## 6. 被否决的方向 (不要重新提)
- 不把 MOG 当"A&D 篮子落后补涨者"来写 — 那是 default map
- 不重复 Part 1/2 内容, Phase 2 直接建模型
- 不把 SBC 当主要 gap (MOG SBC/Rev 0.4%, 不是 pressure point, 真正问题在 CapEx+WC)
- 不依赖 CCC 一项解释 (HEI CCC 200+ 但 FCF conversion 107%, 关键差异在 CapEx 强度 1.6% vs 3.7%)
- 不在 Phase 2 提前做红队/圆桌 (放 Phase 4)

## 7. Phase 2 唯一优先任务
**建三个估值模型 + 压力测试**:
1. **DCF** (WACC 敏感性 ±100bp, 永续增长 2-3%, 显式 10 年)
2. **SOTP** (按分部: S&D/MA/CA 用 A&D pure-play 倍数, Industrial 按剥离 10x EBITDA)
3. **Reverse DCF** (从 $313 反推隐含 FCF growth / margin / terminal)
4. **Owner Earnings 估值** (基于 normalized FCF $184M × 25-30x)
5. **4 法方差测试**: 如果 4 法结果全在 +/-10% 内 → 共享假设 (AMAT 教训), 必须分离

## 8. Phase 2 需要的新数据
- FY25 10-K segment note (revenue/OI/backlog/contract asset/PP&E by segment)
- Unbilled receivables 6 年序列
- FY26 管理层 FCF guidance 原话 + FY23/FY24 guide vs actual
- Polymarket: F-35 Block 4 delivery / Ukraine cease-fire / 欧洲 defense 相关事件概率
- Industrial 剥离具体公告 (如有)

## 9. 未解决冲突
- R&D 2020 $111M → 2023 $28M → 2024 $113M 的波动: 确认是否会计重分类 (10-K MD&A 里找)
- F-35 在 MA 分部真实占比: lit_recon 估 25-30%, 需 10-K customer concentration 精确数
- Q1 FY26 backlog +30% 里 classified / hypersonic 占比: 10-K 披露有限

## 10. Session 规范提醒
- Phase 2 建议新会话启动 (context 压力)
- 恢复时: `cd .worktrees/半导体 && pwd && cat reports/MOG.A/staging/MOG.A_handoff_P1.md`
- 禁止: 跳过 Phase 1 结论重新写 / 忽略 normalized FCF $184M 锚点 / 不加载 phase0_financial_snapshot.md
