# MRVL 证据注册表

> 每条关键证据必须注册。skeptic subagent直接审计此文件。
> 创建: 2026-03-30 | 最后更新: 2026-03-30

## Phase 0 初始证据

| ID | 证据描述 | 等级 | 支持判断 | 反驳什么 | 失效条件 | 来源 |
|----|---------|:---:|---------|---------|---------|------|
| E01 | FY2026 Rev $8.2B (+42% YoY, 100%有机) | fact | CQ1增长能力 | "增长靠并购" | FY27有机增速<15% | 10-K + IR |
| E02 | Custom silicon $1.5B, 18 XPU sockets, $75B lifetime pipeline | fact | CQ1增长管线 | — | Amazon确认流失给Alchip | earnings call |
| E03 | Forward PE 17.4x vs AVGO 58.5x (3.4x估值差) | fact | CQ3估值鸿沟 | — | MRVL PE expansion>30x | FMP data |
| E04 | Non-GAAP GM 59.5% vs GAAP 51.0% (gap=8.5pp, $942M摊销) | fact | CQ5真实盈利力 | "GAAP是真实" | 摊销结束后GM不收敛 | 10-K reconciliation |
| E05 | China Rev ~38% of total | fact | CQ4地缘风险 | — | 中国收入降至<20% | 10-K geographic |
| E06 | DSO Q4=90天 vs Q3=68天 (+22天单季) | fact | Q10 DSO异常 | "只是timing" | Q1 FY27 DSO不回落至<75天 | FMP balance |
| E07 | SBC Coverage 345%, 净缩股-2.2%/yr | fact | 资本回报正面 | — | SBC Coverage<100% | baggers_summary |
| E08 | AVGO AI Rev $8.4B/Q vs MRVL custom silicon $1.5B/yr (22x差距) | fact | CQ3估值鸿沟(规模解释) | — | 差距缩小至5x内 | AVGO earnings + MRVL IR |
| E09 | DC YoY growth: Q1+76% → Q2+69% → Q3+38% → Q4+21% (减速) | fact | Q7迁移方向 | "AI增长加速" | Q1 FY27 DC growth回升>30% | quarterly income |
| E10 | Amazon Trainium 3/4可能流失给Alchip | inference | CQ1风险 | "管线稳固" | MRVL/Amazon公告确认合作延续 | CNBC报道+分析师 |
| E11 | Custom silicon GM低于标准产品(管理层确认), 但OPM accretive | inference | Q11 GM稀释 | "GM会稳定" | GM连续3Q<57% | earnings call commentary |
| E12 | Optical DSP "undisputed leader" (Inphi遗产), 1.6T Ara获OFC创新奖 | fact | CQ2光学垄断 | — | 竞品(Broadcom/Credo)在1.6T获重大设计win | OFC 2026 + 行业报道 |
| E13 | FY27 guidance: Rev~$11B(+30%+), DC+40%, custom>20%, optical>50% | fact | 迁移方向正面 | — | Q1 FY27 miss guidance>5% | management guidance |

## 证据强度分布

- fact级: 11条 (可以强表达)
- inference级: 2条 (适度表达)
- assumption级: 0条
- unknown: 见unknowns.md

## 缺口 (需要但还没有的证据)

| 缺口 | 影响哪个判断 | 如何获取 | 优先级 |
|------|------------|---------|:-----:|
| 分部OPM(DC vs Comm) | CQ3估值合理性 | 不披露，用Non-GAAP total代理 | medium |
| Amazon Trainium 3/4确认/否认 | CQ1增长 | 等Amazon/MRVL公告 | high |
| Q1 FY27实际OCF | Q10 DSO结论 | 等May 21 earnings | high |
| Celestial AI技术验证 | Q12收购ROI | 等H2 FY28产品发布 | low |
