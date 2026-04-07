# MOG.A 文献侦察备忘录 (Phase -0.5)
> 2026-04-06 | 5路WebSearch | 用于Phase 0前的认知锚

## 1. 公司速写
Moog Inc (NYSE: MOG.A/MOG.B), 1951年Bill Moog创立, 总部East Aurora NY。**全球唯一在三大精密运动控制市场(航空/航天国防/工业)+全部精控技术(电液/电动/液压)同时竞争的公司**。FY2025收入约$3.6B+, FY2026指引$4.3B (+~20% YoY), Adj EPS $10.20±0.20, FCF Conversion ~60%。Q1 FY2026录得record sales $1.1B(+21% YoY), 全部4个分部双位数增长, 12个月backlog创纪录$3.0B (+20% YoY)。

## 2. 四大业务分部 (FY26指引)
- **Space & Defense**: ~$1.2B (+11%); Q1 $324M (+31% YoY), Adj OM 13.5% (+20bps)。驱动: 导弹控制+卫星组件+欧洲地面装甲车需求
- **Military Aircraft**: ~$1.0B (+7%); Adj OM 12.3% (+40bps)。F-35/MQ-25/FLRAA为关键平台
- **Commercial Aircraft**: Q1 $268M (+23% YoY), Adj OM 12.4% (-30bps受关税压制)。驱动: Boeing/Airbus build rate
- **Industrial**: Q1 Adj OM 13.5% (+80bps), 但收入因主动divestiture下降; "portfolio shaping"故意收缩低毛利业务

## 3. 行业TAM与竞争
**全球精密运动控制市场**: 2024年$18.30B → 2030年$23.18B (CAGR ~4%)。MOG.A是细分龙头但绝对份额有限(估算<5% of TAM, 因为TAM定义宽泛包含许多与MOG无重叠的工业子领域)。
**核心竞争对手**:
- 航空控制: Parker Hannifin, Curtiss-Wright, Liebherr, Woodward, Triumph, Senior, RTX/Collins, Safran
- 航天/导弹控制: ValveTech, Vacco, Honeywell, Textron
- 工业(电液伺服阀): Bosch Rexroth, Eaton, Yuken等
**护城河来源(待Phase 1验证)**: 工程定制深度+long-cycle aerospace认证壁垒(每平台生命周期20-40年)+sole-source position on critical actuators。

## 4. 关键叙事(待挑战)
1. **三引擎共振**: 商飞(后疫情build rate恢复)+军机(F-35产能爬坡)+导弹/卫星(地缘加速)同时上行 — 这是cyclical共振还是secular?
2. **Industrial portfolio shaping**: 主动放弃低毛利收入换margin扩张 — Q1 OM +80bps证明有效, 但摊薄增长率
3. **关税与供应链**: Commercial Aircraft OM -30bps系关税压制, FY26能否消化?
4. **A股vs B股双层股权**: MOG.A有限投票权, MOG.B由Moog家族控制(经典dual-class)

## 5. 已识别脆弱点(Pre-mortem)
- **Boeing/Airbus build rate敏感性**: 商飞产量-10% → MOG收入增速从~5%降至~3%(分析师测算)
- **FCF质量**: 增长强劲但FCF Conversion仅60%, 营运资本占用大(典型long-cycle aerospace)
- **估值**: 2025涨幅显著, 分析师普遍认为"full valuation"; 需要严格估值锚定
- **定价权 vs 成本传导**: 关税使Commercial OM下滑暗示定价权弱于Howmet/TDG等同行

## 6. 待Phase 0数据预取确认
- 历史10年: Revenue/Adj EPS/FCF/Backlog/Segment OM
- 估值: 当前P/E、EV/EBITDA、与Parker/Curtiss-Wright/Woodward/Howmet/TDG对比
- Polymarket: 台海/俄乌相关(影响国防需求)
- Insider trading + 家族持股(Moog family via Class B)
- F-35生命周期内容: per-aircraft美元含量
- AvCarb等隐藏资产/分部

## 7. 核心矛盾候选(P0.75结晶将选最锋利的)
**CQ-A**: MOG的"三引擎共振"是周期高点错觉还是结构性重定价? 如果商飞build rate见顶+军费回归基准线, 当前估值的隐含增长是否可持续?
**CQ-B**: Industrial portfolio shaping是真转型(剥离非核心)还是"砍腿换跑速"(永久缩小TAM)? 投入资本回报率是否真改善?
**CQ-C**: 在Parker/Honeywell/Woodward面前, MOG的定价权是来自sole-source壁垒还是被视为可替代供应商? 关税无法转嫁是否暴露了议价弱势?

---
**下一步**: 运行preflight_gate.sh → Phase 0数据预取(MCP+Python估值+并行Agent)
