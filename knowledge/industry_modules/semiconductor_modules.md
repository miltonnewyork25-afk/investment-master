# 半导体行业分析模块模板 v1.0
# 生成日期: 2026-03-30
# 适用公司: NVDA, TSM, AVGO, AMD, ASML, KLAC, LRCX, AMAT, MU, ARM, INTC, MRVL, ADI, VRT, SMCI
# 来源: semiconductor_deep.md v26.0 + 半导体CLAUDE.md v19.9 + KLAC/AVGO/MRVL报告实践 + 13家横向报告
# 子行业: 设计垄断 / 设备(周期型) / 存储(超强周期) / IP平台 / AI基础设施 / 转型 / 模拟混合

modules:
  M1:
    name: "收入结构与AI利好定位"
    definition: "分部收入拆解+AI利好Layer定位(1-6)+有机增速——判断收入增长的结构性驱动力和AI衰减度"
    questions:
      - Q1: "公司处于AI利好的哪个Layer(1-6)? 衰减度是多少?"
      - Q2: "数据中心/AI收入占比及增速?vs传统业务(企业/运营商/消费)的增速差?"
      - Q3: "有机增速是多少?(扣M&A/剥离/一次性) 量驱动还是价驱动?"
    kpis:
      - KPI1: "AI/DC收入占比(%) — AI相关收入/总收入 — 设计50-80%, 设备30-60%, 存储30-50%"
      - KPI2: "有机收入CAGR(3年) — 扣M&A后计算 — 行业基准: 设计15-30%, 设备8-15%, 存储波动大"
      - KPI3: "客户集中度 — Top 3客户占DC收入% — <30%=健康, 30-50%=风险, >50%=高风险"
    consistency_check: "各分部收入之和=总收入(±1%); DC收入增速应与Hyperscaler AI CapEx增速正相关(相关系数>0.7)"
    kill_switch:
      threshold: "有机增速连续2Q<+5% 或 DC/AI收入占比环比下降>3pp 或 Top 1客户流失确认"
      action: "增长引擎失效预警 → 重新评估Forward PE假设 → 检查客户Pipeline转化率"

  M2:
    name: "技术壁垒与IP资产"
    definition: "核心IP组合+制程领先度+可替代性分析——判断技术护城河的真实强度和衰减速度"
    questions:
      - Q1: "核心IP(SerDes/DSP/架构/专利)是否可通过许可获得? 替代成本是多少?"
      - Q2: "先进制程经验(3nm/2nm)相对竞争者领先几个月? 领先在缩小还是扩大?"
      - Q3: "技术壁垒是'真护城河'(不可替代)还是'锁定租金'(可替代但切换成本高)?"
    kpis:
      - KPI1: "IP不可替代性评分(0-10) — 核心IP中'仅自研可得'占比 — 8+垄断, 5-7强, <5可替代"
      - KPI2: "制程领先度(月) — 量产产品vs最近竞争者的制程代差 — 行业基准6-18月"
      - KPI3: "R&D效率 — 新产品收入/R&D支出(3年滞后) — 行业基准1.5-3.0x"
    consistency_check: "IP评分应与毛利率正相关(IP高→GM高); 制程领先度应与市占率趋势正相关"
    kill_switch:
      threshold: "核心IP被竞争者通过许可复制(如Synopsys SerDes替代自研) 或 first-pass silicon成功率<50%连续2代"
      action: "技术壁垒证伪 → 下调C3品牌/IP评分 → 重新评估SOTP中的IP溢价"

  M3:
    name: "周期定位与领先指标"
    definition: "WFE/AI CapEx周期位置+7个领先指标(SEMI-L1~L7)读数——判断当前在周期的哪个位置"
    questions:
      - Q1: "公司受WFE周期还是AI CapEx周期驱动? 两者是否脱钩?"
      - Q2: "SEMI-L1~L7中哪几个指标对本公司最相关? 当前读数指向什么方向?"
      - Q3: "PEP-006(周期峰值溢价)和PEP-007(反转PE)风险是否适用?"
    kpis:
      - KPI1: "DIO(库存天数) — 年度或季度 — 设计60-120天, 设备100-200天, 存储80-150天"
      - KPI2: "CapEx/D&A — 年度 — fabless<0.5x, 代工1.0-2.0x, 设备0.3-0.8x"
      - KPI3: "Hyperscaler AI CapEx($B) — 年度 — 当前>$300B, <$250B=预警"
    consistency_check: "DIO趋势应与收入增速负相关(DIO↑+收入↓=去库存期); AI CapEx增速应与DC收入增速正相关"
    kill_switch:
      threshold: "DIO连升3Q且>150天(设备) 或 AI CapEx同比下降>20% 或 WFE连续4年增长>7%(历史回调点)"
      action: "周期拐点预警 → 切换到mid-cycle PE估值 → 禁止使用peak earnings做估值基准"

  M4:
    name: "护城河六维量化(C1-C6)"
    definition: "按业务分层的C1-C6评分+收入加权护城河指数+时间衰减函数——量化护城河的异质性和演化"
    questions:
      - Q1: "各业务线的护城河评分差距有多大? 存在'异质性混合体'问题吗?"
      - Q2: "收入加权护城河指数在FY2028/FY2030怎么变化? 增长是否在侵蚀护城河?"
      - Q3: "ASIC锁定衰减函数L(t)的参数是什么? L_floor是多少?"
    kpis:
      - KPI1: "收入加权护城河指数(0-10) — Σ(Ci×Wi×RevShare) — 行业基准: 垄断7+, 强5-7, 弱<5"
      - KPI2: "护城河离散度 — max(业务线)-min(业务线) — >4=高异质性需分部估值"
      - KPI3: "护城河年衰减率 — YoY变化/10 — >0.3/yr=快速衰减, <0.1/yr=稳定"
    consistency_check: "护城河指数应与PE倍数正相关(每1点≈1.5-2.5x PE); 护城河衰减方向应与OPM趋势一致"
    kill_switch:
      threshold: "收入加权护城河<4.0/10 或 最大业务线(>30%收入)护城河<3.0 或 年衰减>0.5"
      action: "护城河实质性恶化 → 重新评估PE倍数(可能下调2-3x) → 检查承重墙是否接近崩塌"

  M5:
    name: "定价权分层与OPM路径"
    definition: "按客户层的B4定价权+OPM杠杆分解(GM vs OpEx)+AVGO对标天花板——判断利润率扩张空间"
    questions:
      - Q1: "定价权按客户层(F500/中端/SMB)分别处于什么Stage? 加权B4是多少?"
      - Q2: "GM稀释(mix shift)和OpEx杠杆(R&D/SGA)的净效应是什么? OPM是扩张还是停滞?"
      - Q3: "vs AVGO的OPM差距有多少是结构性不可追赶的? 天花板在哪?"
    kpis:
      - KPI1: "加权B4定价权(Stage 0-5) — 按客户层收入加权 — 行业基准: 垄断3.5+, 竞争2.0-3.5, 商品<2.0"
      - KPI2: "Non-GAAP OPM — 年度 — 设计30-65%, 设备25-45%, 存储波动-20%到+40%"
      - KPI3: "R&D/Revenue — 年度 — fabless20-35%, 代工10-20%, 设备15-25%"
    consistency_check: "B4加权应与Non-GAAP GM趋势一致(定价权强→GM不降); R&D/Rev下降应伴随OPM扩张"
    kill_switch:
      threshold: "Non-GAAP GM连续3Q下降>1pp/Q 或 R&D/Rev反转上升>3pp(杠杆停滞) 或 加权B4<2.0"
      action: "利润率扩张停滞 → 下调OPM路径假设 → 重新评估EPS预测"

  M6:
    name: "竞争格局与份额动态"
    definition: "市场份额趋势+竞争者能力评估+Winner-takes-all vs分散化判断——预判2-3年份额方向"
    questions:
      - Q1: "市场是集中化还是分散化趋势? 驱动力是什么?"
      - Q2: "最具威胁的竞争者是谁? 它的成本/技术/客户关系优势有多大?"
      - Q3: "即使份额下降, TAM膨胀能否弥补? 'TAM增速>份额流失'的等式能持续多久?"
    kpis:
      - KPI1: "市占率(%) — 按收入或出货量 — 行业特定(垄断>40%, 竞争10-30%)"
      - KPI2: "份额变化(%/yr) — YoY市占率变化 — >+2pp=扩张, <-2pp=萎缩"
      - KPI3: "TAM CAGR(%) — 可触达市场增速 — AI芯片30-40%, 设备10-15%, 存储5-10%"
    consistency_check: "份额×TAM=公司收入(±10%误差); 份额趋势应与R&D投入趋势正相关"
    kill_switch:
      threshold: "市占率连续2年下降>5pp 或 #1竞争者份额>60%且仍在扩张 或 新进者份额>10%"
      action: "市场地位恶化 → 评估'退守细分市场'vs'追赶投资'策略 → 重新评估SOTP倍数"

  M7:
    name: "GAAP vs Non-GAAP鸿沟与SBC治理"
    definition: "GAAP-Non-GAAP差距分解+SBC/回购覆盖率+Owner PE体系——判断真实盈利能力"
    questions:
      - Q1: "GAAP和Non-GAAP OPM的差距有多大? 差距来源(摊销/SBC/重组)分别是多少?"
      - Q2: "SBC/Revenue比率趋势? 回购覆盖率(回购/SBC)能否持续?"
      - Q3: "三PE并列(GAAP/Owner/Forward)讲什么故事? 哪个更接近'真实'?"
    kpis:
      - KPI1: "GAAP-Non-GAAP OPM差距(pp) — 摊销+SBC+重组 — 行业基准: fabless 10-20pp, 代工5-10pp"
      - KPI2: "SBC/Revenue(%) — 年度 — 行业基准: fabless 5-10%, 代工2-5%"
      - KPI3: "回购覆盖率(x) — 年度回购/年度SBC — >2.0x=优秀, 1.0-2.0=合格, <1.0=净稀释"
    consistency_check: "Owner PE应介于GAAP PE和Non-GAAP PE之间; 回购覆盖率×SBC应≈回购金额"
    kill_switch:
      threshold: "SBC/Rev>12% 或 回购覆盖率<0.8x连续2年 或 GAAP-Non-GAAP差距>25pp"
      action: "股东利益稀释实质化 → Owner PE假设失效 → 必须用GAAP视角做估值下限"

  M8:
    name: "资产负债表健康与商誉风险"
    definition: "商誉/总资产比+ROIC vs ROTCE鸿沟+Altman Z-Score+Celestial-type收购风险——判断财务韧性"
    questions:
      - Q1: "商誉占总资产比多少? 商誉背后的业务是否仍在创造超额回报?"
      - Q2: "ROIC和ROTCE的差距有多大? 差距是否因新收购在扩大?"
      - Q3: "Pre-revenue收购(如Celestial AI)的减值风险? 对回购/现金流的挤压?"
    kpis:
      - KPI1: "商誉/总资产(%) — 年度 — >30%=高风险, 20-30%=需关注, <20%=健康"
      - KPI2: "ROIC(%) — NOPAT/投入资本 — 行业基准: fabless 8-20%, 代工10-25%"
      - KPI3: "Incremental ROIC(%) — ΔNOPAT/ΔIC(3年) — >25%=优秀, 15-25%=合格, <15%=资本配置差"
    consistency_check: "ROIC趋势应与商誉/总资产趋势负相关(商誉↑→ROIC↓); ROTCE应>WACC(否则在毁灭价值)"
    kill_switch:
      threshold: "商誉减值>$1B 或 ROIC<WACC连续3年 或 Net Debt/EBITDA>3.0x"
      action: "资本结构风险 → 重新评估管理层资本配置纪律 → 检查流动性充足性"

  M9:
    name: "估值多方法交叉验证"
    definition: "4+方法独立估值+离散度检验+敏感性矩阵+Python验证——确保估值结论可靠"
    questions:
      - Q1: "4个以上独立方法的FV分别是多少? 离散度是否<30%?"
      - Q2: "哪个假设对估值最敏感? 该假设翻转的概率是多少?"
      - Q3: "市场隐含假设(Reverse DCF)与我们的假设最大分歧在哪?"
    kpis:
      - KPI1: "估值离散度(%) — (Max-Min)/均值 — <20%=高一致, 20-30%=合格, >30%=需解释"
      - KPI2: "Reverse DCF隐含增速(%) — 市场价格反推的CAGR — 与我们Base差距量化"
      - KPI3: "概率加权FV($) — 5情景加权 — 三重锚定所有概率"
    consistency_check: "≥60%方法方向一致(都说高估或都说低估); SOTP≈DCF±15%; 概率加权FV应在GAAP DCF和Owner DCF之间"
    kill_switch:
      threshold: "离散度>40% 或 ≥3方法方向矛盾 或 Python验证偏差>5%"
      action: "估值可靠性不足 → 不给确定性评级 → 标注为'方向不明确'或'条件评级'"

  M10:
    name: "地缘政治与供应链韧性"
    definition: "中国收入风险(ship-to vs sell-to)+出口管制概率+台海风险+TSMC依赖——量化地缘折价"
    questions:
      - Q1: "中国收入占比中, 真正面临管制风险的比例是多少?(ship-to≠sell-to)"
      - Q2: "出口管制扩大的概率? 对收入/估值的影响?(三重锚定)"
      - Q3: "TSMC集中度风险——如果台海紧张, 供应链替代方案是什么?"
    kpis:
      - KPI1: "中国收入占比(%) — ship-to vs sell-to拆分 — fabless 15-40%, 设备20-35%"
      - KPI2: "出口管制概率(%) — Polymarket+历史基准率 — 当前15-25%"
      - KPI3: "TSMC依赖度(%) — 在TSM生产的收入占比 — fabless 80-100%, 设备0%"
    consistency_check: "中国收入趋势应与出口管制政策方向一致; TSMC依赖度应与地缘折价PE正相关"
    kill_switch:
      threshold: "出口管制扩大至覆盖公司>20%收入的产品 或 台海冲突概率>15%(Polymarket)"
      action: "地缘风险升级 → 增加地缘折价(PE-2x到-5x) → 重新评估供应链替代"

extensions:
  E1:
    name: "ASIC设计服务特有: 客户锁定与流失"
    trigger: "公司提供custom ASIC设计服务(如MRVL/AVGO的定制芯片业务)"
    questions:
      - Q1: "客户锁定衰减函数L(t)——初始锁定度/衰减率/残余锁定度分别是多少?"
      - Q2: "turnkey vs NRE+royalty模式? 对收入规模和GM的影响?"
      - Q3: "设计win pipeline转化率? 从NRE到量产的成功率和时间?"
    kpis:
      - KPI1: "ASIC锁定度L(t) — L₀×e^(-λt)+L_floor — L₀=20-40%, λ=0.2-0.4, L_floor=5-15%"
      - KPI2: "Pipeline转化率(%) — 量产projects/总active projects — 行业基准60-75%"
      - KPI3: "客户lifetime value($B) — 单客户5年累计收入 — 大客户$2-5B, 中客户$0.5-1B"
    consistency_check: "active programs × 转化率 × 平均单program收入 ≈ FY2028E custom silicon收入"
    kill_switch:
      threshold: "Top 2客户中任一流失确认 或 pipeline转化率<50% 或 新设计win连续2年<3个"
      action: "ASIC增长引擎失效 → SOTP中custom silicon倍数下调30%+ → 重新评估全栈叙事"

  E2:
    name: "光学互联特有: CPO威胁与代际锁定"
    trigger: "公司提供光学DSP/光互联产品(如MRVL的Inphi遗产、Broadcom CPO)"
    questions:
      - Q1: "CPO大规模替代pluggable的时间线? 当前CPO市场规模?"
      - Q2: "代际锁定效应——客户用了N代DSP后, 切换成本是递增还是递减?"
      - Q3: "Celestial-type光子互联(scale-up)与CPO(scale-out)是替代还是互补?"
    kpis:
      - KPI1: "CPO市场规模($M) — 年度 — 2026E~$165M, 2028E~$500M-$1B"
      - KPI2: "Pluggable DSP份额(%) — 市占率 — 龙头50-80%, 挑战者5-20%"
      - KPI3: "验证周期(月) — DSP新供应商从评估到量产替代 — 行业基准18-30月"
    consistency_check: "份额下降速度应与CPO增速+竞争者验证进度一致; 份额×TAM应≈公司光学收入"
    kill_switch:
      threshold: "CPO市场>$1B且年增>100% 或 pluggable份额连续2年下降>5pp/yr 或 代际锁定度<20%"
      action: "光学护城河被CPO侵蚀 → 下调光学SOTP倍数 → 重新评估Celestial AI期权价值"

  E3:
    name: "设备周期特有: Mid-cycle估值与WFE"
    trigger: "公司是半导体设备商(如ASML/KLAC/LRCX/AMAT)"
    questions:
      - Q1: "当前WFE在周期的哪个位置(early/mid/late/downturn)? 距离历史回调点多远?"
      - Q2: "Mid-cycle EPS是多少? 用mid-cycle PE而非peak PE估值后FV是多少?"
      - Q3: "下行中哪个业务线Beta最低? 检测<沉积<刻蚀的经验规律是否成立?"
    kpis:
      - KPI1: "WFE绝对值($B) — SEMI年度数据 — 2026E~$110-120B"
      - KPI2: "WFE连续增长年数 — 当前值 — ≥3年=历史回调区间(PEP-006)"
      - KPI3: "Mid-cycle OPM(%) — 近10年OPM中位数 — 行业基准25-40%"
    consistency_check: "Peak PE不应>历史Peak PE上限的110%; Mid-cycle EPS应≈10年EPS中位数±15%"
    kill_switch:
      threshold: "WFE同比下降>15% 或 BB ratio<0.85连续2Q 或 库存天数>历史75th百分位"
      action: "下行周期确认 → 必须切换到mid-cycle PE → 禁止使用Peak earnings估值"
