# PTC v2.0 Phase 2 规格书
# 2026-03-20 | 目标: 50-60K | 6章

## 执行纪律(不可跳过)
1. 每章写完后`wc -m`自检 → <目标80%=继续写当前章,不进下一章
2. 每章开写前确认5行spec已定义(question/data/argument/counter/target)
3. ISDD按8个Step逐步展开,每Step≥1K
4. 红队每个RT≥2K(数据+逻辑+反面+判定)
5. 最终估值必须Python验证(已有结果→嵌入分析而非贴输出)

## 结构(6章)

### Ch13: 6年财务深度诊断(ISDD β路径完整版) | 目标15K
- question: PTC的盈利能力改善有多少是结构性的？标准化OPM到底是多少？
- data: FMP 6年P&L+8季度+cashflow+balance完整数据
- argument: ISDD S0-S8逐步执行,每Step独立分析段
  S0: 收入质量(有机增速隔离+价量拆分+经常性占比+行业插槽)
  S1β: 利润-规模脱钩检测(GAAP vs ARR归一化)
  S2: 盈利质量清洗(SBC争议+并购摊销+三版盈利Python验证)
  S3: 费用增速归因(每项费用vs收入增速,排名利润吞噬者)
  S4: 成本问题分类(结构性/战略性/周期性/临时性)
  S5: 分部归因(PLM vs CAD引擎判定+ServiceMax摆动因子)
  S6: 单元经济(NRR推断+Magic Number+LTV/CAC)
  S7: EPS归一化(四因素分解Python验证+FY2026E预测)
  S8: 现金验证(FCF/NI+应计膨胀+应收vs收入+资本化检查)
- counter: OPM标准化可能比33-35%更低(如果Q4季节性效应比想象中更大)
- target: ≥15K

### Ch14: 竞争配对对决(PTC vs Siemens + PTC vs ADSK) | 目标10K
- question: PTC在两场最重要的竞争中处于什么位置？5年后会更好还是更差？
- data: ABI/Forrester PLM评估, Siemens DI财务, ADSK财务, R&D/Rev对比, 产品功能矩阵
- argument:
  PTC vs Siemens(5K): 全栈vs专精, 五赛道逐一对比, 新项目win/loss推断, R&D差距的长期影响, 航空/医疗防御壁垒
  PTC vs ADSK(5K): CAD直接竞争(Creo vs Fusion), TAM差异(AEC vs制造), PE差距的基本面解释, 哪些差距可消化
- counter: PTC的"开放生态"策略可能比Siemens全栈更有吸引力(对不想被锁定的客户)
- target: ≥10K

### Ch15: 红队7项深度对抗 | 目标12K
- question: Phase 1的7个核心假设中,哪些最脆弱？哪些经得住攻击？
- data: Phase 1所有假设+反面证据
- argument: RT-1~RT-7每个≥1.5K
  RT-1: SaaS迁移跑道(7年→实际多少?)
  RT-2: ServiceMax(40%成功→实际多少?)
  RT-3: 客户锁定$12B(高估多少?)
  RT-4: 纯有机增速(5-6%→实际区间?)
  RT-5: Codebeamer回报期(9年→风险?)
  RT-6: OPM天花板(38-42%→R&D回升压力?)
  RT-7: 系统性偏差检测(全报告方向是否一致?)
- counter: 红队本身也可能过度悲观(需要校准红队结论)
- target: ≥12K

### Ch16: 情景财务桥接 | 目标5K
- question: 从基准到熊/牛情景,具体是哪些变量变了多少?
- data: Ch13财务模型+Ch15红队结论
- argument: 5情景的显式delta分解(不只是概率×价格,而是每个变量的具体变化)
  基准→熊: ARR -2pp + ServiceMax减值$5B + PE -3x = 价格变化$X
  基准→牛: ARR +2pp + 平台验证PE +4x + 回购加速 = 价格变化$Y
- target: ≥5K

### Ch17: IoT剥离Pro-Forma + FY2026展望 | 目标4K
- question: 剥离后的"新PTC"基线财务是什么？
- data: IoT $200M收入/$375M税后净/$464M GAAP gain [WS-009/010/011]
- argument: Pro-forma P&L(剔除IoT)→FY2026E归一化EPS→Forward PE校准
- target: ≥4K

### Ch18: 校准回流+最终评级 | 目标4K
- question: 综合Phase 1+2所有分析,PTC的最终评级是什么？
- data: 所有前序章节结论
- argument: 四方法交叉验证(Python验证后)+红队校准+估值统一性检查+KS追踪清单
- target: ≥4K

## 合计: 6章, ≥50K
