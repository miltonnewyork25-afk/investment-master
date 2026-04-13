# Default Map Audit — COHR (Coherent Corp)
> Phase 0.75 产物 | 铁律 S-1 要求

---

default_map_audit:
  market_default_definition: "AI光通信高增长股 — 受益于800G/1.6T升级周期和Hyperscaler CapEx, NVIDIA $2B背书, 是AI基础设施瓶颈供应商"
  market_default_variables:
    - "Networking/Datacom segment revenue增速 (当前+34% YoY)"
    - "Non-GAAP EPS增速 (FY2026E $5.35 → FY2027E $7.47 = +40%)"
    - "800G→1.6T产品路线图执行力"
  market_default_valuation_language: "Forward PE 41x on FY2027E EPS $7.47 (=$307), 以AI光通信同业为参照"
  market_default_narrative: "COHR是AI光通信的垂直整合龙头, 受益于最长的技术卡位(InP全栈)+NVIDIA锁定, 增速将随1.6T ramp加速到25%+"

  failure_points:
    - fact: "COHR 17.5% YoY增速 vs LITE 65.5%, 但Forward PE仅差6x (41x vs 47x) — 市场给COHR每单位增速的估值溢价是LITE的3倍以上"
      why_old_map_fails: "如果COHR真的只是AI增长故事, 为什么市场给它比增速快3.7倍的LITE几乎一样的Forward PE? 这说明PE中有一部分不是在买增速——可能是去杠杆释放、SiC期权、或者只是标签溢价。纯AI增长框架无法解释这个定价差异。"

    - fact: "28%的收入(Industrial/Materials)在萎缩(-10% YoY), 但市场给整个公司一个统一的41x Forward PE, 没有对萎缩业务折价"
      why_old_map_fails: "一个正增长+负增长的混合体不应该获得与纯增长公司相同的估值方法。41x PE隐含整个公司以~25% EPS CAGR增长, 但这需要Networking加速到>30%才能抵消Industrial的拖累。如果分开估值(Networking 50x + Industrial 10x), 可能得到不同的答案。"

    - fact: "去杠杆+D&A递减每年机械释放$1-2 EPS (利息节省~$0.35/yr + D&A递减→GAAP改善~$0.50-1.00/yr), 但共识EPS增长叙事完全归因于'收入增长'"
      why_old_map_fails: "FY2025→FY2028 EPS从-$0.52增长到$9.64, 增量$10.16中可能有$3-4来自非增长因素(去杠杆+D&A递减+剥离低margin业务)。AI增长框架将所有EPS增长归因于收入增长, 高估了增长引擎的贡献, 低估了资本结构和会计因素的贡献。"

    - fact: "FQ2'26 FCF = -$96M (CapEx +48% QoQ), 但Net Debt继续下降→资金来自何处?"
      why_old_map_fails: "FCF为负但net debt仍在下降, 说明有非经营性现金流入(可能是NVIDIA $2B、preferred stock转换、资产出售)在支撑去杠杆。纯AI增长框架不解释资金来源——这是一个资本结构事件, 不是运营改善。"

  why_new_map_needed: "如果继续用'AI光通信成长股'框架看COHR, 会抹平三个关键问题: (1)28%萎缩业务的隐性拖累, (2)去杠杆+D&A递减的EPS贡献被错误归因给增长, (3)SiC期权和preferred stock事件的估值影响被完全忽略。这不是一个简单的成长股——它是一个正在被重塑的后合并混合体。"
