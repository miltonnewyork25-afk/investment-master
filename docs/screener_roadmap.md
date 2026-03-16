# 低估股筛选系统 — 路线图 v1.0

> 创建日期: 2026-03-16
> 分支: 低估股票
> 当前版本: v1.2 (MVP)

## 系统概述

三层信号框架筛选低估股票：
- **L1 可能便宜了 (35%)** — 估值+内部人买入+真实回购
- **L2 便宜不是陷阱 (40%)** — 盈利质量+盈利能力+资本纪律+F-Score
- **L3 市场开始纠错 (25%)** — 52周位置+盈利超预期+分析师修正

## 当前状态 (v1.2 MVP)

### 已完成
- [x] 信号引擎 `scripts/screener/signals.py` — 三层评分+F-Score+否决+flag
- [x] CLI入口 `scripts/screener/run_screen.py` — 批量/单只/目录模式
- [x] Agent技能 `.claude/skills/stock-screener/SKILL.md` — MCP工具编排
- [x] 单元测试 `scripts/screener/test_signals.py` — 9个用例全通过
- [x] 首次筛选: 27只股票, PYPL领先(7.6/10)
- [x] v1.1修复: FMP字段映射(marketCap/priceToEarningsRatio/evToEBITDA/insider季度汇总)
- [x] v1.2优化: 动态权重(无insider时重分配)+更陡峭估值曲线+负盈利惩罚+flag系统

### 首次筛选结果 (2026-03-16, 27只)
| # | Symbol | Comp | L1 | L2 | L3 | F | 核心逻辑 |
|---|--------|------|-----|-----|-----|---|---------|
| 1 | PYPL | **7.6** | 7.4 | 7.1 | 8.7 | 8 | PE=10.7, 缩股-6.8%, ROIC=15%, 52w=56% |
| 2 | QCOM | 6.9 | 4.6 | 8.6 | 7.4 | 6 | GP/A=0.49, accruals=-0.169, 52w=63% |
| 3 | HPQ | 6.8 | 6.4 | 6.9 | 7.2 | 5 | EV/EBITDA=8.2, ROIC=25%, FCF=8.4% |
| 4 | BABA | 6.5 | 7.1 | 6.4 | 6.0 | 7 | FCF=24.6%, 缩股-6.9% |
| 5 | VRSN | 6.4 | 3.7 | 9.8 | 4.6 | 8 | GP/A=1.1, L2最高但估值贵 |

### 已知短板
1. **L3只有52周位置一个信号** — PEAD/analyst revision未接入
2. **Insider是季度汇总** — 无法区分CEO买$5M vs 期权行权
3. **候选池靠手动选(27只)** — 偏差大，错过冷门
4. **无时序追踪** — 不知道谁在变好/变差
5. **单截面评分** — 只看最新一期，错过"改善中"的公司

---

## Phase 1: 补齐L3信号 (目标: 2周)

### 1.1 Earnings Surprise + PEAD
- 接 `fmp_data endpoint="estimates"` 获取分析师预测
- 计算 actual vs estimate → surprise %
- 连续N季超预期 → streak bonus
- PEAD信号: surprise后30-60天股价drift方向

### 1.2 Analyst Revisions
- FMP `analyst-estimates` 或 `earnings-surprises` endpoint
- 计算3月/6月预测修正方向和幅度
- 正向修正 + 低估值 = 强信号

### 1.3 Per-Transaction Insider
- FMP path `/api/v4/insider-trading` 获取逐笔Form 4
- 区分: open-market purchase vs option exercise vs grant
- 计算: 买入金额/买入人数/是否cluster
- 加权: CEO/CFO买入 > 董事买入 > VP买入

### 1.4 验收标准
- L3信号从1个扩到3个(52w + surprise + revision)
- Insider信号从季度汇总升级到逐笔
- 重新跑27只, 排名区分度提升

---

## Phase 2: 自动Universe + 时序追踪 (目标: 2-4周)

### 2.1 自动候选池
- FMP Stock Screener API: `/stable/stock-screener`
- 参数: marketCap>$2B, 排除金融/REIT/SPACs
- 每周拉取 ~800只 (S&P 500 + S&P 400 MidCap)

### 2.2 分层筛选
```
Phase A: 宽筛 800只 → L1初筛(估值前30%) → ~240只
Phase B: L2质量过滤 → ~80只
Phase C: L3催化剂 → ~30只
Phase D: 详细信号卡 → Top 15
```

### 2.3 时序快照
- 每周存档 `data/screener/snapshots/YYYY-MM-DD.json`
- Delta报告: 排名上升/下降, 新进/退出
- 告警: insider突然买入 / F-Score跳升3+ / 52周新低

### 2.4 验收标准
- 自动运行, 无需手动选股
- 每周产出Delta报告
- 历史快照可追溯

---

## Phase 3: 历史回测 (目标: 1-2月)

### 3.1 数据准备
- FMP历史财务数据 2018-2025 (8年)
- 每季度重建信号 → 组合 → 追踪后续12个月收益

### 3.2 回测设计
- 策略: 每季度选L1+L2+L3综合Top 15, 等权持有
- 基准: S&P 500 等权
- 分析: 按层拆解 — L1(便宜)单独有效吗? L2(质量)加上后改善多少?

### 3.3 权重优化
- 当前: L1=35%, L2=40%, L3=25%
- 测试: 不同权重组合的夏普比率
- 验证: 否决条件的损益(否决掉的股票后续表现)

### 3.4 验收标准
- 有数据证明框架有效(不仅是逻辑自洽)
- 最优权重确定
- 否决条件校准

---

## Phase 4: 闭环系统 (长期)

### 4.1 与深度分析打通
- 筛选Top 5 → 自动进入 `/quick-scan`
- 确认兴趣 → `/standard-analysis` 或 Tier 3
- 与CQI排行榜交叉验证

### 4.2 季度复盘
- 框架选出的股票 vs 实际表现
- 每季度更新权重/阈值
- 累积学习: 什么信号组合实际最有效

### 4.3 多因子扩展
- 13F聪明钱追踪 (SEC EDGAR)
- 信用利差交叉验证
- 行业/主题层面错杀检测
- 期权异常活动

---

## 信号完整性目标

| 信号 | v1.2 (当前) | Phase 1 | Phase 2 | Phase 3 |
|------|------------|---------|---------|---------|
| EV/EBITDA | ✅ | ✅ | ✅ | ✅ |
| PE/PB/FCF Yield | ✅ | ✅ | ✅ | ✅ |
| Shareholder Yield | ✅ | ✅ | ✅ | ✅ |
| Insider Buy (季度) | ✅ | 升级→逐笔 | ✅ | ✅ |
| Accruals | ✅ | ✅ | ✅ | ✅ |
| GP/Assets | ✅ | ✅ | ✅ | ✅ |
| ROIC/ROE | ✅ | ✅ | ✅ | ✅ |
| F-Score | ✅ | ✅ | ✅ | ✅ |
| Asset Growth | ✅ | ✅ | ✅ | ✅ |
| 52周位置 | ✅ | ✅ | ✅ | ✅ |
| Earnings Surprise | ❌ | ✅ | ✅ | ✅ |
| Analyst Revisions | ❌ | ✅ | ✅ | ✅ |
| Short Interest | ❌ | Phase 2 | ✅ | ✅ |
| 自动Universe | ❌ | ❌ | ✅ | ✅ |
| 时序追踪 | ❌ | ❌ | ✅ | ✅ |
| 历史回测 | ❌ | ❌ | ❌ | ✅ |

---

## 8分+公司出现条件

8分意味着三层同时高分(L1≥7.5, L2≥8.0, L3≥8.0)。
历史上只在以下场景批量出现:
- 市场恐慌 (2020.03, 2022.10)
- 行业错杀 (2022能源→科技转换期)
- 公司级事件后修复 (META 2022.11)

框架的设计目标不是"总能找到8分股"，而是：
**当8分股出现时，系统能第一时间捕获并告警。**

---

## 文件结构

```
低估股票 worktree/
├── scripts/screener/
│   ├── signals.py          — 核心信号引擎 v1.2
│   ├── run_screen.py       — CLI入口
│   └── test_signals.py     — 单元测试
├── data/screener/
│   ├── raw/                — 27只股票FMP原始数据
│   ├── screen_results.json — 机器可读排名
│   └── screen_report.txt   — 可读报告
├── .claude/skills/stock-screener/
│   └── SKILL.md            — /screen 技能
└── docs/
    └── screener_roadmap.md — 本文件
```
