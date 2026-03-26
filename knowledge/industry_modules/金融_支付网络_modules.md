# 金融/支付网络 行业分析模块模板 v1.0
# 生成日期: 2026-03-24
# 适用公司: V, MA, PYPL, SQ, ADYEN, GPN, FIS, FISV
# 来源: V Complete反思 + 支付栈四层模型 + CRM/ADBE方法论交叉

modules:
  M1:
    name: "支付量与网络规模"
    definition: "总支付量(TPV)/处理交易数/凭证数/商户覆盖——衡量网络规模和增长动力"
    questions:
      - Q1: "支付量增速(按区域拆解)vs TAM增速——份额在增还是减?"
      - Q2: "交易笔数增速vs支付金额增速——消费者行为是'更频繁'还是'更大额'?"
      - Q3: "凭证/商户增速是否同步(双边网络效应是否仍在加速)?"
    kpis:
      - KPI1: "TPV CAGR(3年) — 总支付量复合增速 — 行业基准8-12%"
      - KPI2: "Take Rate(净收入/TPV, bps) — 衡量每单位支付量的变现效率 — V约22bps, MA约25bps"
      - KPI3: "凭证增速 — 年化新增凭证数 — 行业基准5-8%"
    consistency_check: "净收入 ≈ TPV × Take Rate(±5%); 交易笔数增速应与凭证增速×频次增速一致"
    kill_switch:
      threshold: "TPV增速连续2季<全球电子支付TAM增速(~8%) 或 Take Rate连续3年下降>1bps/年"
      action: "份额流失预警 → 拆解区域/产品线找失速点 → 评估A2A/竞对侵蚀"

  M2:
    name: "Client Incentives与净收入质量"
    definition: "CI/毛收入趋势+CI按客户层拆分+CI增速vs毛收入增速——衡量谈判地位和净收入可持续性"
    questions:
      - Q1: "CI/毛收入趋势斜率是多少?(年均变化bps→5年外推到什么水平)"
      - Q2: "CI增速是否系统性超过毛收入增速?(是=谈判地位结构性弱化)"
      - Q3: "CI按客户层拆分(F500/中型/SMB)——哪层CI上升最快?"
    kpis:
      - KPI1: "CI/毛收入 — Client Incentives占毛收入比例 — V约28%, 趋势↑"
      - KPI2: "CI增速-毛收入增速差(pp) — 正值=侵蚀中 — 阈值>3pp=严重"
      - KPI3: "净收入CAGR / 毛收入CAGR — <0.85=CI侵蚀加速"
    consistency_check: "净收入 = 毛收入 - CI(精确); CI增速应与合约续签周期相关(5-7年)"
    phase1_mandatory: "Phase 1必须包含CI分层评估(F500/中型/SMB各层CI/毛收入趋势)。CI不公开时用间接法推断: (毛收入增速-净收入增速)=CI增速差→推算CI/毛收入斜率→按客户层分配。参考CRM v2.0 NRR推断方法论: 当核心指标不公开时，用可观测变量(收入增速/客户数/合约规模)间接推算，标注[推断]并给出置信区间。CI推断置信度<60%=必须在报告中标注数据局限性。"
    kill_switch:
      threshold: "CI/毛收入>33% 或 CI增速-毛收入增速差>5pp连续2年"
      action: "定价权崩塌预警 → 重新评估OPM天花板 → Bear Case概率上调"

  M3:
    name: "收入结构与增速质量"
    definition: "四条收入线(Service/DataProc/Intl/Other)拆解+VAS有机vs无机+跨境占比——判断增长引擎健康度"
    questions:
      - Q1: "四条收入线的增速排序→哪条是增长引擎?增速是否可持续?"
      - Q2: "VAS有机增速(扣除收购)是多少?VAS对核心网络的依附度?"
      - Q3: "跨境收入占比趋势→跨境是利润弹性最大的线→恢复/放缓?"
    kpis:
      - KPI1: "VAS有机增速 — 扣除收购贡献后 — 行业基准>15%(高增长引擎)"
      - KPI2: "跨境收入占净收入% — 衡量高利润率收入的权重 — V约25%"
      - KPI3: "最快/最慢收入线增速差 — >10pp=结构分化 — 关注最慢线是否是核心"
    consistency_check: "四条毛收入之和 = 总毛收入; VAS增速×VAS依附度应解释CI趋势的一部分"
    kill_switch:
      threshold: "VAS有机增速<10%(增长引擎熄火) 或 跨境收入占比连续下降>2pp/年"
      action: "增长引擎预警 → 拆解VAS sub-segment找原因 → 评估估值中VAS溢价是否过高"

  M4:
    name: "盈利能力与OPM正常化"
    definition: "OPM拆解(COGS/SGA/Other)+正常化调整(一次性项目)+OPM vs同业——判断核心盈利趋势"
    questions:
      - Q1: "报告OPM vs 正常化OPM差多少?差异是一次性还是结构性?"
      - Q2: "OPM的组成(COGS%/SGA%/Other%)哪个在恶化?"
      - Q3: "OPM vs MA/行业——规模优势是否在转化为利润优势?"
    kpis:
      - KPI1: "正常化OPM — 扣除一次性项目后 — V约66%, MA约59%"
      - KPI2: "OPM历史波动区间 — 5年min-max — V 60-66%"
      - KPI3: "增量OPM(边际OPM) — 增量收入/增量经营利润 — >70%=强杠杆"
    consistency_check: "正常化调整项应有明确来源(10-K/Q披露); OPM×收入=经营利润(精确)"
    kill_switch:
      threshold: "正常化OPM连续3年下降 或 报告OPM<55%(V) / <50%(MA)"
      action: "盈利结构恶化 → 拆解成本项找原因 → 评估是否是CI驱动(M2)还是运营效率"

  M5:
    name: "监管与政策风险"
    definition: "多维监管量化(国内立法/反垄断/行业规则/国际)+概率×影响矩阵+联合概率"
    questions:
      - Q1: "当前最高概率×影响的单一监管风险是什么?"
      - Q2: "多个监管风险的联合概率(同时发生)是多少?联合影响?"
      - Q3: "监管是'背景噪音'还是'结构性转折'?(频率×强度趋势)"
    kpis:
      - KPI1: "监管概率加权EPS影响 — Σ(概率×EPS影响) — 阈值>-5%=显著"
      - KPI2: "最高影响单一监管的EPS影响 — 概率加权后 — 阈值>-3%"
      - KPI3: "监管折价/PE倍数 — 因监管导致的PE压缩 — vs无监管时PE"
    consistency_check: "各监管概率之和可>100%(独立事件); 联合概率应<各单一概率之积"
    kill_switch:
      threshold: "任一监管概率加权EPS影响>-10% 或 联合概率加权>-15%"
      action: "监管系统性风险 → 考虑结构性PE折价 → 可能需要Bear Case概率上调>40%"

  M6:
    name: "竞争格局与同业对标"
    definition: "同层竞争(V vs MA)+跨层威胁(A2A/fintech/稳定币)+支付栈位置——判断竞争强度和方向"
    questions:
      - Q1: "市场份额趋势(同层)→份额在增还是减?增速差在扩大还是缩小?"
      - Q2: "跨层威胁(A2A/RTP/稳定币/CBDC)的渗透率和时间框架?"
      - Q3: "支付栈中的位置是否在被'向上'或'向下'挤压?"
    kpis:
      - KPI1: "份额变化(同层) — TPV份额年变化 — 阈值>-1pp/年=流失"
      - KPI2: "PEG vs最直接竞对 — 衡量相对估值吸引力 — 差>0.5=显著"
      - KPI3: "A2A渗透率(本土市场) — FedNow/PIX/UPI交易占比 — V市场<1%=安全"
    consistency_check: "V+MA份额之和应≈全球80-85%; PEG×增速应≈PE"
    kill_switch:
      threshold: "同层份额连续3年流失>0.5pp/年 或 A2A渗透率>5%"
      action: "竞争格局恶化 → 重估护城河久期 → 考虑从Compounder降级为Stalwart"

  M7:
    name: "护城河与反脆弱性"
    definition: "护城河6维评估+久期测试+反脆弱性(压力→更强?)+品质量化A+B+C+D"
    questions:
      - Q1: "护城河最弱的维度是什么?恶化速度可量化吗?"
      - Q2: "最近一次压力(疫情/监管/竞争)→公司变强了还是变弱了?"
      - Q3: "品质评级(A+B+C+D)→处于'偏好'还是'中性'?"
    kpis:
      - KPI1: "护城河综合评级 — 6维加权 — 阈值<3.0/5.0=审慎"
      - KPI2: "反脆弱性评分 — 5维×10分 — >35/50=强, <25/50=弱"
      - KPI3: "品质B+C总分 — 商业模型+护城河 — >55/70=偏好级"
    consistency_check: "护城河评级应与PE倍数正相关; 反脆弱性评分应与最大回撤恢复速度一致"
    kill_switch:
      threshold: "护城河评级<3.0/5.0 或 品质B+C<40/70"
      action: "护城河失效 → 从Compounder重分类 → 大幅调低终端PE/增长率假设"

  M8:
    name: "FCF质量与资本配置"
    definition: "FCF/NI+CCC+η回购效率+资本分配(回购/股息/收购/CapEx)ROI审计"
    questions:
      - Q1: "FCF/NI>100%是可持续的结构性优势还是暂时性运营资本释放?"
      - Q2: "回购η效率→每$1回购创造了多少EPS增量?"
      - Q3: "收购ROI→最近3年收购的ROIC是否>WACC?"
    kpis:
      - KPI1: "FCF/NI(5年均值) — >100%=优秀, <80%=警告"
      - KPI2: "η回购效率 — 回购金额×反稀释/市值 — >2%=有效"
      - KPI3: "收购ROIC — 收购产生的增量NOPAT/收购价 — >WACC=成功"
    consistency_check: "FCF = 经营现金流 - CapEx(精确); 回购+股息+CapEx+收购 ≈ FCF(±10%)"
    kill_switch:
      threshold: "FCF/NI连续2年<80% 或 收购ROIC<WACC连续3年"
      action: "现金质量恶化 → 重检应收/存货/递延 → 评估是否需要调低FCF Margin"

  M9:
    name: "估值多方法收敛"
    definition: "≥4种独立方法+概率加权+偏差校正+敏感性矩阵+离散度检查"
    questions:
      - Q1: "方法间离散度多大?离散度来源是什么(增速vs折现率vs倍数)?"
      - Q2: "Reverse DCF隐含什么假设?这些假设合理吗?"
      - Q3: "概率加权后期望回报是正还是负?与历史PE位置一致吗?"
    kpis:
      - KPI1: "离散度 — (最高-最低)/中值 — ≤30%=收敛"
      - KPI2: "期望回报 — (概率加权PW - 当前价)/当前价 — 评级映射"
      - KPI3: "WACC敏感性 — WACC±50bps的估值变化 — >$25=高WACC敏感"
    consistency_check: "所有方法使用相同的最新股价; 概率加权后的值应在个别方法区间内"
    kill_switch:
      threshold: "离散度>40% 或 ≥3种方法方向矛盾(>50%说高估但评级说低估)"
      action: "估值框架失效 → 重检假设一致性 → 可能需要承认'估值不可知'"

  M10:
    name: "宏观敏感度与周期定位"
    definition: "WACC/利率敏感性+衰退压力测试+关税/地缘传导+周期位置判断"
    questions:
      - Q1: "Visa的价值中多少由宏观(WACC/GDP)决定vs公司特有因素?"
      - Q2: "在衰退中→收入/OPM/股价的历史回撤幅度和恢复时间?"
      - Q3: "当前宏观环境(利率/关税/地缘)对估值的概率加权影响?"
    kpis:
      - KPI1: "WACC弹性 — WACC±100bps的估值变化/估值中值 — >15%=高宏观敏感"
      - KPI2: "衰退回撤 — 历史最大收入下降% — V约-5%(2020)"
      - KPI3: "OPM衰退Delta — 衰退中OPM下降幅度 — V约-2.3pp"
    consistency_check: "Beta应与衰退回撤幅度正相关; 高Beta公司应有更大的衰退OPM下降"
    kill_switch:
      threshold: "WACC弹性>25% 或 衰退回撤>-20%收入"
      action: "宏观代理标的 → 评估'个股选择边际价值'→ 可能建议用ETF替代"

extensions:
  E1:
    name: "技术替代路径(A2A/RTP/稳定币/CBDC)"
    trigger: "当A2A/RTP在目标市场渗透率>1% 或 CBDC进入试点"
    questions:
      - Q1: "各替代路径的5年渗透率预测?"
      - Q2: "Visa在每条替代路径上是'被替代'还是'整合为收入'?"
      - Q3: "反脆弱性历史(过去技术威胁→Visa是否成功整合)?"
    kpis:
      - KPI1: "A2A渗透率 — FedNow/PIX等在V核心市场的交易占比"
      - KPI2: "稳定币结算量 — Visa USDC结算月量(增速)"
      - KPI3: "CBDC概率×影响 — 10年期概率加权EPS影响"
    kill_switch:
      threshold: "A2A在美国渗透率>10% 或 CBDC替代借记卡概率>30%"
      action: "技术替代加速 → 重估终端增长率 → 考虑缩短DCF窗口"

  E2:
    name: "管理层A-Score与CEO评估"
    trigger: "CEO任期<3年 或 近2年有重大战略转向 或 收购占FCF>15%"
    questions:
      - Q1: "A-Score 10维度哪个最弱?弱点是否影响核心估值假设?"
      - Q2: "CEO的激励结构是否aligned with长期股东价值?"
      - Q3: "收购纪律→近3年收购的ROI vs WACC?"
    kpis:
      - KPI1: "A-Score总分 — 10维×10分 — >70=优秀, <50=审慎"
      - KPI2: "CEO薪酬/市值增量 — <0.1%=合理"
      - KPI3: "收购ROIC — >WACC=成功"
    kill_switch:
      threshold: "A-Score<50 或 收购连续3笔ROIC<WACC"
      action: "管理层风险 → 加大Bear Case权重 → 考虑治理折价"
