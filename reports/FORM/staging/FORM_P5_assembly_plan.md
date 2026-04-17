# FORM Phase 5 组装计划 (v3.0)

> 日期: 2026-04-17
> 目标: 150K+ 字符完整报告
> 来源: 199K staging (31 文件, ~273 DM)
> 前序失败: v1 (50K/150K, 33% 完成), v2 (40K, 逐版递减)

---

## 失败根因 (复盘确认)

1. **Context 物理限制**: 199K staging + 150K 输出 + 框架开销 > 200K context window
2. **AI 自主压缩**: context 不够时 AI 偷偷省略，每次续写压缩前序
3. **版本递减**: DISCARD 65K → v1 50K → v2 40K (越写越短)

## v3.0 组装策略 (避免重蹈覆辙)

### 规则
1. **分段写入 3-4 次** — 每段 ~40-50K 字符
2. **每段直接 Write 到文件** — 追加模式 (段 1 创建, 段 2+ 拼接)
3. **NEVER 重写前序** — 只 append，不 rewrite
4. **每段开头读前序末行** — 确保续接正确
5. **每段结束 wc -m 验证** — 确认字符数在增长，不在缩小
6. **新会话开始** — context 干净，不要把其他任务历史带进来

### 章节分配

**段 1 (~50K): 执行摘要 + Ch 1-5**
- 执行摘要 6 拍 (~1200 字)
- Ch 1 核心争议: 旧地图 + 4 个裂缝 (~5K)
- Ch 2 业务理解: 探针卡经济学 + 消耗品真相 (~8K)
- Ch 3 DRAM/HBM: 需求传导 + 周期位置 + content per wafer (~8K)
- Ch 4 财务归因 R-1: 收入瀑布 + GM Bridge + EPS 瀑布 (~12K)
- Ch 5 剪刀差 R-2: 4+1 个剪刀差 (~8K)
- DM 锚点: ~100 个
- Mermaid 图: ~4 个

**段 2 (~50K): Ch 6-10**
- Ch 6 F&L 失地: 结构性份额流失 (~6K)
- Ch 7 竞争格局: FORM vs Technoprobe 11 维 + 市场份额动态 (~12K)
- Ch 8 供应链传导: 上游 HBM 客户 + 下游 Hyperscaler + TSE 威胁 (~8K)
- Ch 9 护城河评估: MEMS + 认证 + 定价权 + 裂缝 (~8K)
- Ch 10 估值: 5 种方法 + Owner PE + Reverse DCF + 概率加权 + SOTP (~12K)
- DM 锚点: ~100 个
- Mermaid 图: ~4 个

**段 3 (~50K): Ch 11-14 + 附录**
- Ch 11 红队审查: 偏差修正 + 最强反方 + 凸性 (~10K)
- Ch 12 圆桌洞见: 4 个碰撞洞见无痕融入 (~8K)
- Ch 13 风险: Kill Switch 5/3/2 + 催化剂日历 + 情景分析 (~10K)
- Ch 14 认知边界: 可推演度 60% / 复杂度 70 / 黑箱 40% (~5K)
- Ch 15 跟踪指标 + 行动建议 (~3K)
- 附录: DM 注册表 + 数据源 (~10K)
- DM 锚点: ~70 个
- Mermaid 图: ~4 个

### 过程无痕化检查清单 (第零律 2)

Phase 5 每段写完后运行:
```bash
bash scripts/mid_assembly_check.sh reports/FORM/FORM_complete_v3.md
```

禁止出现: Agent findings / Phase X 完成 / staging 文件 / handoff note / skill 产出

### 关键数字速查 (Phase 5 写作用)

| 数据点 | 值 | DM |
|--------|-----|-----|
| 概率加权公允价值 | $86.75 (区间 $70-100) | DM-RT |
| 评级 | 审慎关注 (高不确定性) | — |
| 三维状态 | [贵×方向未确认×有催化] | — |
| 黑箱比例 | 40% → 禁止单点目标价 | DM-CB-001 |
| 安全边际入场区间 | $55-65 | DM-RT-020 |
| 母钉子 | "HBM叙事溢价的周期股" | compression_test |
| 第一变量 | GAAP GM 持续性 | compression_test |
| 估值语言 | Owner PE on Owner Earnings | compression_test |
| FY25 ROIC | 4.9% < WACC 9% | DM-ROIC-001 |
| 5年收入 CAGR | +0.5% | DM-FIN |
| 5年 EPS CAGR | -10.2% (含一次性, 正常化约 -0.3%) | DM-FIN-006 |
| FY25 Owner FCF | -$27M (FCF $12M - SBC $39M) | DM-SCISSOR-005 |
| Owner PE FY25 | 370x / FY27E乐观: 67x | DM-RT-017 |
| GM mix 天花板 | 43-44% GAAP | DM-RT-016 |
| 凸性 N/M 比 | 0.17 | DM-RT-012 |
| 叙事溢价 | $30-50/share | DM-RT-015 |
| Kill Switch | 5红/3黄/2绿 | P4 RT-7 |
| 圆桌 | 5/5 一致审慎, 0 异议 | P4.5 |
| 关键催化剂 | 4/29 Q1 + 5/11 Analyst Day | — |

### EPS 口径强制提醒

**禁止**: "EPS -34%" (FY2023 $1.05 → FY2025 $0.69)
**正确**: "收入+18%但正常化EPS零增长" (FY2023正常化~$0.70, 含$73M FRT一次性)
**5年CAGR**: -10.2%可用但必须脚注"含FY2023一次性收益影响"
