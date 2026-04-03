# 网络安全行业分析模块模板 v1.0
# 生成日期: 2026-04-02
# 适用公司: PANW, CRWD, ZS, FTNT, S, CHKP, CYBR, OKTA
# 来源: Enterprise SaaS模块v1.0基础 + 网络安全行业特化(平台化/威胁驱动/合规刚需)

modules:
  M1:
    name: "收入结构与增长质量"
    definition: "ARR/订阅收入占比+有机vs非有机增速+产品线拆分——判断增长来自平台渗透还是M&A堆砌"
    questions:
      - Q1: "ARR有机增速(扣除M&A贡献)是多少？与网络安全TAM增速(~14%)相比是份额扩张还是收缩？"
      - Q2: "订阅收入vs硬件/设备收入vs专业服务的占比趋势？硬件占比下降速度是否符合云迁移节奏？"
      - Q3: "Next-Gen ARR(云原生/AI驱动/平台化产品)占比和增速？传统产品ARR是否在净流失？"
    kpis:
      - KPI1: "ARR YoY增速 — 期末ARR/期初ARR-1 — 行业基准: >30%=高增长(CRWD/ZS), 15-30%=稳健(PANW/FTNT), <15%=成熟(CHKP)"
      - KPI2: "订阅收入占比(%) — 订阅+SaaS收入/总收入 — 行业基准: >80%=优秀(ZS 100%), 60-80%=转型中(PANW ~82%), <60%=硬件依赖(FTNT ~65%)"
      - KPI3: "Next-Gen ARR占比(%) — Next-Gen ARR/总ARR — PANW基准: ~55→70%趋势; CRWD Falcon模块采用: 平均>7/23模块"
    consistency_check: "ARR增速应在Billings增速±5pp内; Next-Gen ARR增速应>总ARR增速(否则平台化停滞); cRPO增速应领先收入增速2-4pp"
    kill_switch:
      threshold: "ARR有机增速连续2季<10% 或 Next-Gen ARR增速<总ARR增速连续2季 或 硬件收入占比回升"
      action: "增长引擎切换失败 → 重新评估平台化转型进度 → 可能需要从成长型重估为成熟型估值"

  M2:
    name: "产品平台覆盖度"
    definition: "网络/端点/云/身份/SOC/数据安全六大域覆盖广度+深度——判断平台vs单点厂商的竞争定位"
    questions:
      - Q1: "公司在6大安全域(Network/Endpoint/Cloud/Identity/SOC-SIEM/Data)中覆盖几个？每个域的市场地位(Leader/Challenger/Niche)？"
      - Q2: "客户平均采用模块数(modules per customer)的趋势？3+模块客户占比？模块采用速度是否加速？"
      - Q3: "Best-of-Breed(单点最强)在哪些域仍然优于平台方案？客户在哪些域不愿consolidate？"
    kpis:
      - KPI1: "安全域覆盖数(0-6) — 在Gartner MQ/Forrester Wave中有定位的域数 — 平台型≥4(PANW 5/6, CRWD 4/6), 单点型1-2(ZS 2/6, S 1/6)"
      - KPI2: "客户平均模块数 — 多模块客户ARR/总客户数 — CRWD基准: ~7.2模块/客户; PANW: ~3.3 platformizations/deal"
      - KPI3: "Gartner MQ Leader象限数 — 在几个MQ中位于Leader象限 — PANW基准: 4个Leader; CRWD: 2-3个Leader"
    consistency_check: "覆盖域数应与R&D/Revenue比率正相关(广覆盖需要高研发); 模块采用数增长应与NRR提升正相关; MQ Leader数应与市占率变化方向一致"
    kill_switch:
      threshold: "任何核心域从Leader降至Challenger 或 客户平均模块数连续3季停滞 或 新域产品PMF失败(发布12个月后ARR<$50M)"
      action: "平台化动能减弱 → 重新评估平台溢价(PE中5-10x可能来自平台叙事) → 考虑单点估值法"

  M3:
    name: "客户经济学与粘性"
    definition: "NRR/GRR/CAC Payback/客户集中度——衡量安全产品的粘性和客户内扩展能力"
    questions:
      - Q1: "NRR是多少？(不公开时用间接法: 收入增速-新客贡献=存量扩展率→推算NRR) NRR>125%是来自模块upsell还是consumption增长？"
      - Q2: "GRR是多少？安全产品的转换成本有多高？(SIEM迁移平均需6-12个月, EDR迁移需3-6个月——具体到公司的核心产品)"
      - Q3: "大客户($1M+ ARR)占比和集中度？前10大客户ARR占比？政府客户占比(粘性极高但增速慢)？"
    kpis:
      - KPI1: "NRR(净收入留存率) — 存量客户同期收入/去年 — 行业基准: >130%=优秀(CRWD ~120%, ZS ~120%), 110-130%=良好, <110%=扩展乏力"
      - KPI2: "GRR(毛收入留存率) — (期初-流失-收缩)/期初 — 行业基准: >95%=极强粘性(安全行业特有), 90-95%=良好, <90%=产品替代风险"
      - KPI3: "$1M+ ARR客户数增速 — YoY新增$1M+客户/期初 — 行业基准: >20%=高端渗透强劲, 10-20%=稳健, <10%=天花板接近"
    consistency_check: "NRR×GRR应在合理范围(NRR>GRR且差<25pp); GRR>95%且NRR<110%=有粘性但无扩展空间(单产品陷阱); $1M+客户增速应与Enterprise ARR增速一致"
    kill_switch:
      threshold: "GRR<90%(安全产品被替代=极严重信号) 或 NRR<100%(净收缩) 或 前3大客户ARR>15%"
      action: "客户粘性丧失 → 评估是否因平台consolidation被替换 → 可能需要下调护城河评分1-2分"

  M4:
    name: "竞争格局与份额"
    definition: "按安全域的市占率+份额变化方向+平台vs单点竞争动态——判断结构性赢家和输家"
    questions:
      - Q1: "在核心域的市占率(%)和变化方向(+/-pp/年)？市占率增长来自TAM扩张还是抢夺竞品份额？"
      - Q2: "平台型(PANW/CRWD/MSFT)vs单点型(ZS/OKTA/S)的竞争中，客户RFP中multi-vendor vs single-vendor偏好趋势？"
      - Q3: "Microsoft Security的威胁有多大？(E5 bundle已含Defender+Sentinel+Entra)——哪些客户层最易被MSFT渗透？"
    kpis:
      - KPI1: "核心域市占率(%) — 公司核心域ARR/该域TAM — Endpoint基准: CRWD ~18%, MSFT ~25%; Firewall: PANW ~30%, FTNT ~20%"
      - KPI2: "市占率变化(pp/年) — 年度份额变化 — >+1pp=份额增长, 0=稳定, <-1pp=份额流失"
      - KPI3: "Win Rate(vs Top 3竞品) — 直接竞标胜率 — 行业基准: >40%=强势, 30-40%=竞争, <30%=弱势"
    consistency_check: "市占率增长方向应与ARR增速vs TAM增速一致; Win Rate下降应与S&M效率下降同步; MSFT渗透率上升应与SMB/中端客户流失率上升一致"
    kill_switch:
      threshold: "核心域市占率连续4季下降>0.5pp/季 或 vs MSFT Win Rate<25% 或 Gartner MQ从Leader降至Visionary"
      action: "竞争格局恶化 → 评估是被平台consolidation还是被MSFT bundle替代 → 可能需要下调增速假设3-5pp"

  M5:
    name: "定价权与单位经济学"
    definition: "ASP趋势+Magic Number+S&M效率+按客户层定价权分层——判断收入质量和获客效率"
    questions:
      - Q1: "按客户层(F500/中端/SMB)的定价权Stage(1-5)各是多少？是否存在'高端强+低端弱'的定价权剪刀差？"
      - Q2: "平台化bundle定价是提升还是压缩单位经济学？(Platformization deal的折扣率vs单产品deal的ASP对比)"
      - Q3: "S&M效率(新增ARR/S&M)的趋势？Magic Number是否因平台化deal周期拉长而暂时下降？"
    kpis:
      - KPI1: "Magic Number — 季度净新ARR×4/前季S&M — 行业基准: >1.0=高效(CRWD), 0.75-1.0=良好(PANW), <0.75=低效"
      - KPI2: "隐含ASP变化(%/年) — (ARR增速-客户数增速)/客户数增速 — >0=定价权, <0=折扣加深"
      - KPI3: "CAC Payback(月) — S&M(剥离CSM)/净新ARR×12 — 行业基准: <18月=优秀, 18-24月=良好, >24月=低效"
    consistency_check: "Magic Number下降+NRR上升=合理(长周期deal前置S&M但后续扩展强); Magic Number下降+NRR下降=双重恶化信号; 隐含ASP与GRR应正相关(高ASP通常来自高粘性产品)"
    kill_switch:
      threshold: "Magic Number<0.5连续2季度 或 隐含ASP连续4季负增长 或 CAC Payback>30个月"
      action: "获客效率失效 → 评估是竞争加剧还是TAM饱和 → 可能需要下调增速+上调WACC"

  M6:
    name: "安全威胁与TAM演进"
    definition: "威胁景观驱动需求+TAM扩张/收缩动态+监管合规驱动——判断行业增长的结构性vs周期性"
    questions:
      - Q1: "当前主要威胁向量(勒索软件/供应链攻击/云配置错误/AI驱动攻击)中，哪些正在扩张公司的可服务TAM？"
      - Q2: "网络安全支出占IT预算比例(当前~5-7%)的增长是结构性还是受事件驱动(重大攻击后的预算脉冲)？事件驱动的提升能否持续？"
      - Q3: "监管合规(GDPR/SOX/HIPAA/SEC网络安全披露规则/NIS2)驱动的强制支出占比？合规需求能否支撑经济下行中的安全预算韧性？"
    kpis:
      - KPI1: "可服务TAM(SAM)增速(%/年) — 公司可参与的安全域TAM加总的增速 — 行业基准: 总TAM ~14%CAGR, 云安全~20%, 传统网络~5%"
      - KPI2: "安全支出占IT预算比(%) — Gartner/IDC行业调研数据 — 基准: 5-7%(2024), 趋势→8-10%(2028)"
      - KPI3: "合规驱动收入占比(%) — 因合规需求产生的产品/服务收入/总收入 — 行业基准: 15-25%(身份/GRC更高, ~40%)"
    consistency_check: "SAM增速应>公司ARR增速才意味着TAM仍有空间(否则份额接近天花板); 安全支出占比上升应与公司RPO增速一致; 合规驱动收入在监管加强期应加速"
    kill_switch:
      threshold: "安全支出占IT预算比连续2年下降(极罕见但致命) 或 核心域TAM增速降至<5%(技术替代) 或 主要合规框架被废除"
      action: "行业增长逻辑动摇 → 重新评估全行业估值中枢 → 可能需要系统性下调PE倍数"

  M7:
    name: "盈利质量与FCF"
    definition: "GAAP vs Non-GAAP差距+SBC负担+Owner FCF+递延收入动态——判断盈利的真实性和可持续性"
    questions:
      - Q1: "GAAP OPM vs Non-GAAP OPM差距(pp)？SBC/Revenue比率及趋势？SBC是否随增速放缓自然收敛？"
      - Q2: "FCF Margin的质量如何？(递延收入变动/FCF的占比——DR贡献高=FCF质量依赖预收款而非运营效率)"
      - Q3: "Owner FCF(FCF-SBC)是正还是负？如果负值，何时预计转正？(高增长期Owner FCF为负是正常的——关键是轨迹)"
    kpis:
      - KPI1: "SBC/Revenue(%) — 股权激励费用/总收入 — 行业基准: <15%=纪律(FTNT ~8%), 15-25%=正常(CRWD ~18%), >25%=偏高(S, OKTA历史>30%)"
      - KPI2: "FCF Margin(%) — (OCF-CapEx)/Revenue — 行业基准: >30%=优秀(PANW ~38%, CRWD ~32%), 20-30%=良好, <20%=低效"
      - KPI3: "Owner FCF Yield(%) — (FCF-SBC)/市值 — 行业基准: >3%=合理, 1-3%=可接受(高增长), <0%=SBC>FCF(需增速证明)"
    consistency_check: "SBC/Revenue应在ARR增速放缓时同步下降(否则=成本刚性); FCF Margin+Revenue增速应>40%(Rule of 40); DR增速应在Revenue增速±5pp内(偏差大=收款节奏异常)"
    kill_switch:
      threshold: "SBC/Revenue>30%且增速<20%(稀释>增长) 或 FCF转负(非季节性) 或 Owner FCF连续4年为负且无收敛趋势"
      action: "盈利质量恶化 → 财务章节展示三PE并列(GAAP/Owner/Non-GAAP) → 可能需要从P/FCF切换到EV/Sales估值"

  M8:
    name: "M&A与整合能力"
    definition: "收购历史+整合成功率+商誉比率+有机vs非有机增速拆分——判断M&A是价值创造还是增速掩饰"
    questions:
      - Q1: "过去5年重大收购(>$500M)的整合表现？被收购产品是否成功集成到平台？客户留存率？"
      - Q2: "M&A贡献的ARR增速占总ARR增速的百分比？如果扣除全部M&A贡献，有机增速降多少？"
      - Q3: "Goodwill+Intangibles/Total Assets比率及趋势？是否存在减值风险？"
    kpis:
      - KPI1: "Goodwill/Total Assets(%) — 商誉/总资产 — 行业基准: <30%=轻量(CRWD ~15%), 30-50%=中度(PANW ~45%), >50%=M&A依赖"
      - KPI2: "M&A贡献增速(pp) — M&A带来的ARR增速/总ARR增速 — <20%=有机主导, 20-40%=混合, >40%=M&A驱动"
      - KPI3: "收购ROIC(%) — 被收购业务3年后EBIT/收购价 — 基准: >WACC(~10%)=价值创造, <WACC=价值毁灭"
    consistency_check: "Goodwill/Assets上升应与M&A频率正相关; M&A贡献增速高+有机增速低=红旗(用收购掩盖有机放缓); 收购ROIC应与整体ROIC方向一致"
    kill_switch:
      threshold: "Goodwill减值>总资产5% 或 M&A贡献增速>50%连续2年 或 过去3次大型收购中≥2次ROIC<WACC"
      action: "M&A价值毁灭模式 → 对管理层资本配置能力折价 → PE可能需要折扣10-15%"

  M9:
    name: "AI/自动化定位"
    definition: "AI在安全产品中的实现深度+AI对威胁景观的双刃剑效应+AI相关收入——判断AI是增强者还是颠覆者"
    questions:
      - Q1: "公司AI能力的L×S定位？(L=AI杠杆使用深度: 检测/响应/预测/自主; S=AI收入贡献规模)"
      - Q2: "AI如何改变公司的防御能力？(ML检测率/自动响应覆盖率/SOAR自动化率——量化AI带来的效率提升)"
      - Q3: "AI驱动的攻击(deepfake/自动化渗透/LLM辅助社工)是否在扩大公司的TAM？公司是否有专门的AI安全产品？"
    kpis:
      - KPI1: "AI产品ARR(或AI增强功能ARR) — AI相关产品/功能的ARR — 行业基准: 快速增长期, CRWD Charlotte AI/PANW AI Copilot仍在早期($100M-$500M量级)"
      - KPI2: "SOC自动化率(%) — 通过SOAR/AI自动处理的安全事件比例 — 行业基准: 30-50%(2024), 趋势→60-80%(2028)"
      - KPI3: "ML检测精度(%) — AI/ML驱动的威胁检测真阳性率 — 行业基准: >95%=优秀, 90-95%=良好, <90%=误报过多影响采用"
    consistency_check: "AI产品ARR增速应>总ARR增速(否则AI定位不真实); SOC自动化率提升应与专业服务收入下降一致(自动化替代人工); AI检测精度应与客户满意度/NPS正相关"
    kill_switch:
      threshold: "AI产品ARR增速<30%(PMF失败) 或 竞品AI能力在12个月内追平(如MSFT Copilot for Security大规模普及) 或 AI攻击导致客户对AI防御失去信心"
      action: "AI定位风险 → 重新评估AI叙事溢价(PE中可能有3-5x来自AI故事) → 考虑剥离AI溢价的基础估值"

  M10:
    name: "管理层与治理"
    definition: "CEO安全行业经验+产品vs销售驱动文化+内部人交易+薪酬对齐——判断执行风险"
    questions:
      - Q1: "CEO是技术/产品背景还是销售/运营背景？对网络安全公司而言，产品型CEO(如CRWD George Kurtz)vs销售型CEO的历史表现差异？"
      - Q2: "管理层对平台化vs单点的战略承诺是否一致？(例: 销售团队是否被激励推平台bundle还是仍按单产品算佣金？)"
      - Q3: "创始人是否仍参与？内部人净买卖信号？(安全行业创始人离开后的公司表现统计上更差——Symantec/McAfee前车之鉴)"
    kpis:
      - KPI1: "CEO行业经验(年) — CEO在网络安全/IT安全的从业年限 — 基准: >15年=深度(Kurtz/Arora), 5-15年=足够, <5年=转型风险"
      - KPI2: "内部人净买卖比 — 12个月买入/卖出笔数 — 行业基准: 1:5(正常偏卖); 0买入>12个月=强负面信号"
      - KPI3: "管理层薪酬中ARR/平台化指标占比(%) — ARR目标+平台adoption目标在总薪酬中的权重 — >30%=战略对齐, <15%=言行不一"
    consistency_check: "内部人大规模卖出应与估值偏高一致(PE>行业中枢); 创始人参与度与产品创新速度应正相关; 薪酬中平台指标占比应与实际平台化进度一致"
    kill_switch:
      threshold: "CEO/CTO突然离职 或 内部人12个月净卖出>市值2% 或 创始人彻底退出且无明确继任者"
      action: "管理层风险升级 → 评估继任者质量 → 安全行业PE对管理层敏感度高, 可能需要折价10-20%"

extensions:
  E1:
    name: "平台化转型评估"
    trigger: "公司正在执行平台consolidation策略(如PANW platformization/CRWD Falcon platform) 或 平台化相关ARR>总ARR的30%"
    questions:
      - Q1: "平台化deal(多产品bundle)vs单产品deal的经济学对比？(deal size, 折扣率, 利润率, 部署周期)"
      - Q2: "Platformization的'J-curve效应'处于哪个阶段？(Phase 1: 短期revenue headwind from bundling → Phase 2: 长期NRR提升+份额扩张)"
      - Q3: "客户consolidation意愿调研数据？CIO调研中'计划减少安全vendor数'的比例和趋势？"
    kpis:
      - KPI1: "Platformization deal数(季) — 季度新增平台化deal数 — PANW基准: ~1000/季(FY25), 增速>30%"
      - KPI2: "平台化deal平均ARR vs 单产品deal — 倍数差 — PANW基准: 平台deal 5-10x单产品deal ASP"
      - KPI3: "Platformization J-curve进度(%) — 已跨越revenue headwind底部=100% — 0%=刚开始, 50%=底部, 100%=加速期"
    consistency_check: "Platformization deal数增长应与Next-Gen ARR增速一致; J-curve底部期间Billings增速>Revenue增速是正常信号; 平台化进度应与客户平均模块数增长正相关"
    kill_switch:
      threshold: "Platformization deal增速连续2季<10% 或 J-curve底部持续>4季度(预期2-3季) 或 CIO调研显示vendor consolidation意愿逆转"
      action: "平台化战略失效 → 剥离平台溢价(PE可能需要下调5-8x) → 按单产品估值法重估"

  E2:
    name: "政府/国防安全"
    trigger: "政府/国防收入>15%总收入 或 公司有FedRAMP High/IL5+认证 或 国防合同>$100M"
    questions:
      - Q1: "政府客户(联邦/州/地方/国防)的ARR占比和增速？政府客户的采购周期(通常18-36个月)对收入确认的影响？"
      - Q2: "安全资质等级(FedRAMP/IL/CMMC/NATO认证)？这些资质构成多大的进入壁垒？获取最高等级认证的竞品有几家？"
      - Q3: "地缘政治因素(中国/俄罗斯威胁)对政府安全预算的结构性推动？国防安全预算(CISA/DoD)增速vs商业安全预算增速？"
    kpis:
      - KPI1: "政府收入占比(%) — 政府+国防ARR/总ARR — 基准: PANW ~10-12%, CRWD ~15-20%, 纯政府安全(PLTR/BAH)>40%"
      - KPI2: "安全资质数量 — FedRAMP High/IL4/IL5/CMMC Level 3等高等级认证数 — 基准: ≥3个高等级=强壁垒, 1-2=中等"
      - KPI3: "政府合同续约率(%) — 政府合同到期后续约的比例 — 行业基准: >90%=极强粘性(切换成本极高), 80-90%=良好"
    consistency_check: "政府收入增速应与CISA/DoD预算增速±5pp内; 高资质数量应与政府续约率>90%一致; 政府客户NRR通常低于商业NRR(扩展慢但流失更低)"
    kill_switch:
      threshold: "政府合同续约率<85% 或 关键资质(FedRAMP High)被撤销/降级 或 政府预算因财政紧缩削减>10%"
      action: "政府业务根基动摇 → 评估商业业务能否补偿 → 可能需要将政府溢价(通常PE+2-3x)完全剥离"

  E3:
    name: "合规驱动分析"
    trigger: "公司在身份安全(IAM/PAM)/治理风控(GRC)/数据保护领域 或 合规驱动收入>25%"
    questions:
      - Q1: "主要合规框架(SOX/HIPAA/GDPR/PCI-DSS/SEC网络披露/NIS2)对公司产品的刚性需求有多强？不采购的法律后果(罚款/诉讼)？"
      - Q2: "合规驱动需求的周期性？新法规发布后的'合规脉冲'(通常12-18个月)之后需求是否回落？"
      - Q3: "身份安全(IAM/PAM/零信任)是否正在成为网络安全的'新基础设施层'？对传统网络/端点安全的替代/补充效应？"
    kpis:
      - KPI1: "合规驱动ARR占比(%) — 因合规需求直接驱动的产品ARR/总ARR — 行业基准: IAM/GRC公司>40%, 通用安全15-25%"
      - KPI2: "合规法规覆盖数 — 产品支持的合规框架数量 — 基准: >10=广覆盖(ServiceNow GRC), 5-10=中等, <5=窄"
      - KPI3: "合规脉冲衰减率(%) — 新法规后ARR增速从峰值到稳态的衰减幅度 — 行业基准: 衰减30-50%(GDPR后的合规支出回落)"
    consistency_check: "合规法规覆盖数增长应与合规ARR增速正相关; 合规脉冲衰减率高→需要持续的新法规推出维持增速→增长质量较差; 合规ARR高占比应与GRR>95%一致(法规不消失=需求刚性)"
    kill_switch:
      threshold: "主要合规框架被废除(极罕见) 或 合规要求被'嵌入'到平台型产品中不再单独采购 或 合规脉冲后ARR增速回落>60%"
      action: "合规驱动逻辑减弱 → 评估非合规驱动的产品竞争力 → 可能需要重新评估增速假设中的合规组成部分"

  E4:
    name: "MSSP/MDR生态评估"
    trigger: "公司有significant MSSP/MDR渠道(>15%收入通过MSSP交付) 或 公司自身提供MDR服务"
    questions:
      - Q1: "MSSP/MDR渠道占收入百分比？渠道合作伙伴忠诚度(exclusive vs multi-vendor)？渠道冲突风险？"
      - Q2: "公司是否自身提供MDR服务？如果是，MDR收入的毛利率vs产品订阅？MDR是否在蚕食产品直销？(飞轮悖论检测)"
      - Q3: "中小企业(SMB)通过MSSP间接采用的渗透率？MSSP是否帮助公司触达直销无法覆盖的长尾客户？"
    kpis:
      - KPI1: "渠道收入占比(%) — MSSP/MDR/VAR渠道贡献收入/总收入 — 行业基准: 30-50%(FTNT ~45%), 10-30%(PANW ~35%)"
      - KPI2: "MDR服务毛利率(%) — MDR服务毛利/MDR收入 — 行业基准: 40-55%(vs 产品订阅75-85%)"
      - KPI3: "MSSP合作伙伴增速(YoY) — 新增MSSP合作伙伴/期初 — 行业基准: >15%=生态扩张, <5%=停滞"
    consistency_check: "渠道收入增速应与MSSP合作伙伴增速正相关; MDR毛利率应低于产品订阅毛利率(高人力含量); 渠道占比增加+直销效率下降=可能的渠道替代效应"
    kill_switch:
      threshold: "核心MSSP合作伙伴(前5大)中≥2个切换到竞品平台 或 MDR服务毛利率<30%(不可持续) 或 渠道冲突导致直销Win Rate<25%"
      action: "渠道生态风险 → 评估直销+渠道模式的可持续性 → 可能需要调整收入预测中的渠道贡献"

  E5:
    name: "云安全原生评估"
    trigger: "公司核心产品为云原生安全(CNAPP/CSPM/CWPP) 或 云安全ARR>30%总ARR 或 公司为Zero Trust纯云架构(ZS)"
    questions:
      - Q1: "云安全产品组合(CNAPP/CSPM/CWPP/CIEM)的完整度？vs Wiz/Orca等云原生竞争者的功能差距？"
      - Q2: "多云支持能力(AWS/Azure/GCP)的覆盖度？客户多云环境中的市占率？是否被单一云厂商'内嵌安全'替代的风险？"
      - Q3: "云安全与传统安全的交叉销售成功率？云安全客户是否从传统产品迁移(存量转化)还是纯新客？"
    kpis:
      - KPI1: "云安全ARR增速(%) — 云原生安全产品YoY — 行业基准: >40%=高增长(Wiz/PANW Prisma), 20-40%=稳健, <20%=落后"
      - KPI2: "CNAPP功能完整度分(Gartner评分) — Gartner CNAPP MQ/Forrester Wave评分 — Leader象限=完整, Challenger=部分缺口"
      - KPI3: "多云覆盖度(0-3) — 对AWS+Azure+GCP的深度支持数量 — 3/3=全覆盖, 2/3=缺口, 1/3=单云依赖"
    consistency_check: "云安全ARR增速应>企业云支出增速(~20%); CNAPP完整度高应与云安全Win Rate高一致; 多云覆盖度与大企业客户占比应正相关(大企业多云比例更高)"
    kill_switch:
      threshold: "云安全ARR增速<企业云支出增速(市占流失) 或 AWS/Azure内置安全功能覆盖公司>50%功能 或 Wiz等云原生竞争者在CNAPP MQ中超越"
      action: "云安全竞争力不足 → 评估云安全是'必赢之战'还是'可选增量' → 可能需要调整云安全TAM假设"

# ============================================================
# 网络安全行业特化KPI集成 (补充M1-M10未展开的行业指标)
# ============================================================

industry_specific_kpis:
  version: "v1.0"
  date: "2026-04-02"
  note: "安全行业特有指标——与Enterprise SaaS模块的financial_kpi_integration互补而非替代"

  threat_driven_demand:
    Breach_Cost:
      definition: "数据泄露平均成本——衡量安全投资的经济合理性底线"
      formula: "IBM Cost of a Data Breach Report年度数据"
      healthy_threshold: "持续上升=安全预算刚性增强; FY2024均值$4.88M"
      red_flag: "泄露成本下降(极罕见)→安全预算可能被削减"

    MTTD_MTTR:
      definition: "平均检测时间+平均响应时间——安全运营效率的核心指标"
      formula: "MTTD=威胁入侵到检测的天数; MTTR=检测到遏制的天数"
      healthy_threshold: "MTTD<30天+MTTR<7天=优秀; 行业均值MTTD~200天(IBM)"
      red_flag: "公司产品无法证明显著优于行业均值的MTTD/MTTR改善"

    Zero_Day_Response:
      definition: "零日漏洞响应速度——衡量安全厂商的威胁情报和响应能力"
      formula: "从CVE公布到签名/规则更新的小时数"
      healthy_threshold: "<24小时=优秀, 24-72小时=良好, >72小时=落后"
      red_flag: "重大零日响应慢于竞品→客户信任度下降"

  platform_economics:
    Consolidation_Ratio:
      definition: "客户安全厂商整合比率——验证平台化趋势是否真实"
      formula: "客户平均安全vendor数(before vs after采用公司平台)"
      healthy_threshold: "从12-15个vendor→5-8个=平台化成功; PANW目标:帮客户从>30→<5"
      red_flag: "客户整合后vendor数未显著减少→平台化价值主张不成立"

    Time_to_Value:
      definition: "产品部署到产生安全价值的时间——影响客户满意度和续约"
      formula: "合同签订到首个安全事件被产品检测/阻止的天数"
      healthy_threshold: "云原生<7天, 混合部署30-60天, 传统on-prem 90-180天"
      red_flag: "Time to Value>180天→客户可能在下次续约前未体验到价值"

  financial_adjustments:
    income_statement:
      - "安全行业订阅毛利率通常75-85%(纯SaaS)或65-75%(含硬件): 毛利率下降可能反映硬件占比上升而非效率问题"
      - "SBC在安全行业中位数约15-20%/Revenue: 网络安全人才竞争激烈→SBC显著低于中位数可能=人才流失风险"
      - "递延收入在安全行业通常有3-5年锁定合同→Long-term DR/Total DR比率反映合同质量"
    balance_sheet:
      - "安全行业Goodwill/Assets通常30-50%(M&A驱动行业): PANW ~45%/CRWD ~15%反映截然不同的增长路径"
      - "Deferred Revenue质量: 政府客户DR通常有更长期限(3-5年)+更高确定性→按客户类型拆分DR"
    cash_flow:
      - "安全行业FCF季节性: 通常Q2(日历年)最强(年中续约集中+政府FY10月预算释放后签约在Q1确认)"
      - "Billings vs Revenue gap在安全行业通常为正(Billings>Revenue): gap缩小=合同期限缩短→警惕"
      - "CapEx在纯SaaS安全公司通常<3%Revenue(vs混合模型5-8%): 异常高CapEx=可能在建数据中心(如ZS)"

# ============================================================
# 网络安全可比估值锚 (Phase 0对标用)
# ============================================================

comparable_valuation_anchors:
  note: "Phase 0 shared_context必须包含最相似可比公司估值对比(铁律H)"
  peer_groups:
    platform_leaders:
      companies: [PANW, CRWD]
      typical_multiples: "EV/Sales 12-18x, P/FCF 40-60x, EV/ARR 15-22x"
      key_differentiator: "平台覆盖广度+platformization进度"
    high_growth_pure_play:
      companies: [ZS, S]
      typical_multiples: "EV/Sales 10-16x, P/FCF 50-80x(或N/A), EV/ARR 12-18x"
      key_differentiator: "单域领导力+ARR增速"
    mature_profitable:
      companies: [FTNT, CHKP]
      typical_multiples: "EV/Sales 6-10x, P/FCF 20-35x, EV/ARR 8-12x"
      key_differentiator: "高利润率+FCF生成+低增速"
    identity_security:
      companies: [OKTA, CYBR]
      typical_multiples: "EV/Sales 8-14x, P/FCF 35-55x, EV/ARR 10-16x"
      key_differentiator: "零信任/身份安全TAM+合规驱动需求"
