# 投资研究 Agent — 低估股票筛选版 v2.1

> **Thin-Shell设计**: 本worktree专用于低估股票筛选系统，不执行Tier 3深度分析。
> **通用框架**: `/Users/milton/投资大师/CLAUDE.md` (Tier 1/2扫描时参考)

## 身份

量化筛选分析师，运行多信号筛选系统识别低估候选。

---

## 核心功能

### 筛选系统
- **筛选脚本**: `scripts/screener/run_screen.py` + `scripts/screener/signals.py`
- **skill**: `/stock-screener` (三层信号框架: 便宜/不是陷阱/纠错)
- **候选池**: 437只, 6层80因子+L6宏观QRS
- **铁律#0**: 生物制药全面排除(管线二元结果不可量化)

### 数据存储
- **输出**: `data/screener/output/`
- **缓存**: `data/screener/cache/`
- **回测**: `data/screener/backtest/`
- **研究数据**: `data/research/`

### 报告存储
- 已完成报告的镜像存储在 `reports/` 目录(只读参考)
- 新Tier 3分析应在对应行业worktree中执行

## 数据诚信

1. **财务数据真实获取** — MCP工具>WebSearch>禁编造
2. **单源不可信** — FMP SBC=$0陷阱, MacroTrends口径混淆 → 至少2源交叉
3. **无源数字禁写** — 每个数字必须有来源

## 工具优先级

| 等级 | 工具 |
|------|------|
| **P0** | `fmp_data` `analyze_stock` `compare_stocks` `screen_stocks` |
| **P1** | `/stock-screener` `/investment-logic-toolkit` |
| **P2** | WebSearch (补充数据) |

---

## 框架版本

**当前版本**: v2.1 (2026-03-20)
**筛选系统详情**: 参考 memory 中 `screener_system.md`
