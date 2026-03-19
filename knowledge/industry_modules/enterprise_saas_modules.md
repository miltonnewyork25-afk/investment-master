# Enterprise SaaS 行业分析模块模板 v1.0
# 生成日期: 2026-03-19
# 适用公司: CRM, ADBE, NOW, ADSK, WDAY, HUBS, VEEV, DDOG
# 来源: CRM v2.0反思 + ADBE v2.0方法论 + MCO飞轮验证

modules:
  M1:
    name: "收入结构与增速质量"
    definition: "分部收入拆解+有机vs非有机增速+新客vs upsell比率——判断增长的质量和可持续性"
    questions:
      - Q1: "有机增速是多少？(扣除M&A、货币、一次性)"
      - Q2: "新客vs upsell比率是多少？(>50% upsell=增长引擎在存量)"
      - Q3: "最大和最小分部的增速差是多少？(差>15pp=分裂体风险)"
    kpis:
      - KPI1: "有机收入CAGR(3年) — 扣M&A后计算 — 行业基准8-15%"
      - KPI2: "新客bookings占比 — 新客bookings/总bookings — 行业基准25-50%"
      - KPI3: "分部增速标准差 — σ(各分部YoY) — >10pp=高分裂"
    consistency_check: "各分部收入之和 = 总收入(±1%误差); cRPO增速应在收入增速±5pp内"
    kill_switch:
      threshold: "有机增速连续2季度<5% 或 最大分部(>20%收入)增速转负"
      action: "触发增速恶化预警 → 重新评估DCF增速假设 → 考虑下调评级"

  M2:
    name: "SaaS单位经济学"
    definition: "NRR/GRR/CAC Payback/LTV:CAC/Magic Number——衡量SaaS业务的健康度和效率"
    questions:
      - Q1: "NRR是多少？(不公开时如何推断？)"
      - Q2: "CAC Payback Period vs行业中位(18个月)如何？"
      - Q3: "S&M效率(新增ARR/S&M)趋势是改善还是恶化？"
    kpis:
      - KPI1: "NRR(净收入留存率) — 存量客户同期收入/去年 — 行业基准110-130%"
      - KPI2: "S&M Efficiency — 新增ARR/S&M费用 — 行业基准0.8-1.2x"
      - KPI3: "Magic Number — 季度净新ARR×4/前季S&M — 行业基准>0.75"
    consistency_check: "NRR × GRR应在合理范围(NRR>GRR且差<30pp); FCF/Rev应与NRR正相关"
    kill_switch:
      threshold: "NRR<100%(净收缩) 或 Magic Number<0.5连续2季度"
      action: "SaaS增长引擎失效 → 重新评估TAM渗透率 → 可能需要下调至Stalwart估值"

  M3:
    name: "AI影响评估(AIAS)"
    definition: "AI对每条业务线的5S+5B+M评分——量化AI是净受益还是净威胁"
    questions:
      - Q1: "公司级AIAS净影响是正还是负？(>+1.0=净受益, <-1.0=净威胁)"
      - Q2: "Split Index是多少？(>15=重度分裂→需要双引擎SOTP)"
      - Q3: "AI影响的传导时序——哪条业务线先受冲击？窗口期多长？"
    kpis:
      - KPI1: "AIAS净影响 — 加权S+B+M — 范围-5到+5"
      - KPI2: "Split Index — max(业务线)-min(业务线) — >15=重度分裂"
      - KPI3: "AI收入占比 — AI相关产品ARR/总ARR — 行业基准5-20%(FY2026)"
    consistency_check: "AIAS净影响方向应与PE相对位置一致(正影响→PE不应是行业最低); AI收入占比趋势应与AIAS方向一致"
    kill_switch:
      threshold: "AI产品ARR增速连续2季<+30%(PMF失败信号) 或 核心产品因AI出现seat净减少"
      action: "触发AI转型风险 → 重新评估AIAS评分 → 更新5情景概率分布"

  M4:
    name: "护城河与迁移"
    definition: "CQI五维评分+护城河迁移进度+交叉点+脆弱窗口——判断护城河的当前强度和演进方向"
    questions:
      - Q1: "C1嵌入性的性质分类？(制度/契约/标准/偏好——半衰期差10倍)"
      - Q2: "护城河迁移进度百分比？交叉点在哪一年？"
      - Q3: "脆弱窗口期有多长？竞争者能在窗口内攻入吗？"
    kpis:
      - KPI1: "CQI综合分(0-100) — C1×30%+C2×15%+C3×15%+B4×25%+D1×15% — 行业基准60-80"
      - KPI2: "护城河迁移进度(%) — 新护城河指标加权 — 0%=未开始, 100%=完成"
      - KPI3: "客户流失率(年) — 流失客户/期初客户 — 行业基准5-15%"
    consistency_check: "CQI分与客户流失率应负相关(CQI高→流失低); 迁移进度与AI收入占比应正相关"
    kill_switch:
      threshold: "客户流失率>15% 或 F500客户流失>5% 或 迁移进度连续2年<5%增长"
      action: "护城河侵蚀实质化 → 重新评估SOTP倍数 → 可能需要下调护城河维度评分"

  M5:
    name: "定价权与定价转型"
    definition: "B4分层评估+定价模式转型(seat→consumption)的经济学——判断收入质量的演进"
    questions:
      - Q1: "定价权按客户层分别处于什么Stage？(F500/中端/SMB)"
      - Q2: "seat→consumption转型交叉点在哪一年？过渡缺口有多大？"
      - Q3: "NRR不公开的定价权含义是什么？(>120%不公开=不可能; <115%不公开=大概率)"
    kpis:
      - KPI1: "加权B4定价权(0-5) — 按客户层加权 — 行业基准2.5-4.0"
      - KPI2: "隐含提价率(%/年) — (收入增速-seat增速)/seat增速 — 行业基准3-8%"
      - KPI3: "Consumption收入占比(%) — consumption/总ARR — 行业趋势5%→20%(FY26→FY30)"
    consistency_check: "隐含提价率应在B4 Stage范围内(Stage 4→可>5%, Stage 2→<3%); consumption占比增速应与AI收入增速正相关"
    kill_switch:
      threshold: "隐含提价率转负(net price decline) 或 consumption交叉后总收入仍下降"
      action: "定价权丧失 → 重新评估Revenue Quality → 可能需要下调可比倍数"

  M6:
    name: "飞轮效应与摩擦力"
    definition: "管理层声称的飞轮逐连接点验证——区分'数据复用'和'自加速循环'"
    questions:
      - Q1: "飞轮有几个连接点？各自的真实性(真实/弱/间接)？"
      - Q2: "飞轮悖论是否存在？(新产品成功→核心产品受损)"
      - Q3: "飞轮如果不存在,PE中包含多少叙事溢价？"
    kpis:
      - KPI1: "飞轮净强度(-1到+1) — 各连接点净效应加权 — >0.3=真实, <0=负面"
      - KPI2: "叙事溢价(PE倍数) — 当前PE vs 无飞轮基线PE — 行业基准0-3x"
      - KPI3: "飞轮验证进度 — 可观测验证指标达标率 — 0%=纯叙事, 100%=全验证"
    consistency_check: "如果飞轮净强度>0.5→公司增速应在加速(非减速); 叙事溢价不应>总PE的20%"
    kill_switch:
      threshold: "飞轮核心连接点被证伪(关键指标连续2季恶化) 或 管理层放弃飞轮叙事"
      action: "飞轮崩塌 → PE可能压缩1-2x → 更新估值模型"

  M7:
    name: "财务韧性与资本配置"
    definition: "利润率结构+FCF质量+杠杆+回购效率——判断财务健康度和管理层资本配置能力"
    questions:
      - Q1: "OPM改善中结构性vs一次性占比各多少？"
      - Q2: "FCF中有多少是DPO/SBC/CapEx调整后的'真实'现金？"
      - Q3: "回购η效率与同行对比如何？(>1.0=高效, <0.8=低效)"
    kpis:
      - KPI1: "FCF-SBC Yield — (FCF-SBC)/市值 — 行业基准4-8%"
      - KPI2: "净债务/EBITDA — (总债-现金)/EBITDA — 行业基准0-2.0x"
      - KPI3: "回购η效率 — (EPS增厚×价值覆盖)/(杠杆风险×机会成本) — 行业基准0.8-1.2"
    consistency_check: "ROIC应>WACC(否则价值毁灭); FCF margin应在OPM±5pp内(大偏差=CapEx/WC问题)"
    kill_switch:
      threshold: "净债务/EBITDA>3.5x 或 FCF转负 或 信用评级下调"
      action: "财务风险升级 → 重新评估WACC → 可能需要下调估值"

  M8:
    name: "竞争格局与弹性"
    definition: "竞争者分层+市占率趋势+弹性测试(每维度输一半)——判断竞争护城河的实际强度"
    questions:
      - Q1: "最大竞争威胁来自哪个方向？(平台巨头/垂直替代/AI-native/低端颠覆)"
      - Q2: "如果4路竞争者同时在每个维度取得50%成功→收入损失多少？"
      - Q3: "竞争者中谁最可能在3年内实质性改变格局？"
    kpis:
      - KPI1: "市占率变化(%/年) — 公司增速vs TAM增速 — 稳定=±1pp/年"
      - KPI2: "Win Rate(新客) — 新客竞标胜率 — 行业基准40-60%"
      - KPI3: "弹性测试损失(%) — 四路同攻5年收入损失 — <15%=强弹性"
    consistency_check: "市占率下降应与客户流失率上升一致; Win Rate下降应与S&M效率下降一致"
    kill_switch:
      threshold: "市占率连续4季下降>1pp/季 或 Win Rate<30% 或 弹性测试损失>30%"
      action: "竞争格局恶化 → 重新评估护城河评分 → 可能需要下调SOTP倍数"

  M9:
    name: "估值与不对称性"
    definition: "多方法估值收敛+敏感性矩阵+后果不对称分析——判断当前价格的risk/reward"
    questions:
      - Q1: "≥4种独立估值方法的方向一致性(%)和离散度(%)？"
      - Q2: "WACC/增速/OPM的'断裂线'在哪？(跨越后结论翻转)"
      - Q3: "买入错误vs不买错误的后果不对称比？(>3:1=应观望)"
    kpis:
      - KPI1: "方向一致性(%) — 偏低估的方法数/总方法数 — 门控≥60%"
      - KPI2: "估值离散度(%) — (max-min)/mean — 门控≤30%"
      - KPI3: "不对称比 — 买入错误代价/不买错误代价 — >3:1=偏向观望"
    consistency_check: "概率加权估值应在DCF和SOTP之间; RevDCF隐含增速与DCF假设增速的gap应与评级一致"
    kill_switch:
      threshold: "方向一致性<50% 或 离散度>40% 或 不对称比>5:1"
      action: "估值不可靠 → 降低置信度 → 可能需要标记为'不可评级'"

  M10:
    name: "管理层与治理"
    definition: "CEO能力+资本配置记录+治理结构+内部人交易——判断执行风险"
    questions:
      - Q1: "CEO是'产品人'还是'资本配置者'？(对SaaS估值影响>20%)"
      - Q2: "M&A历史ROIC vs WACC？(ROIC<WACC=系统性价值毁灭)"
      - Q3: "内部人净买/卖信号？(净卖出>$1B/年=警戒)"
    kpis:
      - KPI1: "M&A历史ROIC(%) — 加权各收购ROIC — WACC以上=价值创造"
      - KPI2: "内部人净买卖比 — 买/卖笔数 — 行业基准1:5(正常偏卖)"
      - KPI3: "CEO任期与股价相关性(R²) — CEO任期内CAGR vs S&P500 — >0=跑赢"
    consistency_check: "M&A ROIC应与ROIC趋势一致(低ROIC的M&A应压低公司ROIC); 内部人大规模卖出应与估值偏高一致"
    kill_switch:
      threshold: "CEO突然离职 或 内部人卖出>市值3%/年 或 重大治理丑闻"
      action: "管理层风险 → 评估继任者 → 可能需要对PE折价10-15%"

extensions:
  E1:
    name: "演绎法传导(范式变革)"
    trigger: "AIAS Split Index>15 或 公司面临技术范式变革(AI/区块链/量子)"
    questions:
      - Q1: "5步演绎链(触发→因果→跨行业→时间线→证伪)的结论是什么？"
      - Q2: "公司的窗口期有多长？窗口关闭后会怎样？"
      - Q3: "演绎链的证伪条件是什么？何时可验证？"
    kpis:
      - KPI1: "窗口期长度(年) — 从当前到护城河迁移交叉点 — >3年=有缓冲"
      - KPI2: "证伪条件可验证率(%) — 可在12个月内验证的条件数/总条件数"
      - KPI3: "PE上限(演绎后) — 行业PE中枢移动后的新天花板"
    consistency_check: "演绎后PE上限应≤当前行业PE中枢(如果行业在收缩)"
    kill_switch:
      threshold: "证伪条件中≥2个在12个月内成立"
      action: "演绎链部分验证 → 更新5情景概率 → 可能需要转向发现系统"

  E2:
    name: "投资大师圆桌"
    trigger: "Phase 3.8: 估值置信度<65% 或 CQ中有≥3个在50%附近"
    questions:
      - Q1: "5位大师的投票结果(买/观望/回避)？"
      - Q2: "圆桌发现了哪些报告盲点？"
      - Q3: "大师间的核心分歧是什么？分歧是否可通过数据解决？"
    kpis:
      - KPI1: "大师投票分布 — 买:观望:回避 — 3:2以上=有方向"
      - KPI2: "盲点数量 — 圆桌发现的报告未覆盖维度 — >3=报告需补强"
      - KPI3: "圆桌评分(1-10) — 盲点发现价值 — >7.0=有效"
    consistency_check: "大师投票方向应与最终评级方向一致(否则需要解释)"
    kill_switch:
      threshold: "5:0一致回避 或 发现根本性方法论错误"
      action: "报告结论可能有系统性偏差 → 需要回溯检查"

  E3:
    name: "AIAS-PE一致性检验"
    trigger: "AIAS净影响>+1.0 但PE在行业Bottom 25%"
    questions:
      - Q1: "公司是否为'正影响+低PE'异常值？"
      - Q2: "异常的3种解释(AIAS高估/市场误伤/其他负面抵消)中哪个最可能？"
      - Q3: "如果市场误伤→PE应该是多少？"
    kpis:
      - KPI1: "PE/AIAS比 — Forward PE / AIAS净影响 — 行业基准10-20x per point"
      - KPI2: "异常度(σ) — 公司PE偏离AIAS回归线的标准差数"
      - KPI3: "误伤概率(%) — 基于异常解释的概率分布"
    consistency_check: "如果判定为'市场误伤'→评级应至少为'关注'; 如果判定为'AIAS高估'→应下调AIAS评分"
    kill_switch:
      threshold: "PE/AIAS比<5x(极端低估) 或 >30x(AIAS可能完全错误)"
      action: "重新审视AIAS评分方法论 或 确认市场严重错价"
