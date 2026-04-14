# Compression Test — COHR (Coherent Corp)
> Phase 4.5 产物 | 铁律 S-2 要求

---

compression_result:
  new_definition: "41倍去杠杆"
  new_definition_one_sentence: "COHR不是AI光通信成长股, 而是一台用D&A递减+债务清偿+混合业务重组机械制造EPS的后合并去杠杆机器, 市场用41x Forward PE在买一个本质上由资本结构驱动而非收入增长驱动的EPS轨迹"

  # 三个必填链接

  variable_reorder:
    old_first_variable: "Networking/Datacom收入增速 (当前+34% YoY, 共识FY27 +25%)"
    new_first_variable: "ROIC vs WACC的差值 (当前4.2% vs 10% = 负利差-5.8pp)"
    why_new_more_explanatory: "市场盯着Networking增速, 但FY25→FY28的EPS增量$10.16中$3-4来自D&A递减+利息节省+SBC稀释, 不来自收入增长 [DM-FIN-008/009]。真正决定股东价值的是ROIC能否追上WACC——当前ROIC 4.2% < WACC 10%意味着每多投$1 CapEx都在毁灭价值 [DM-FIN-026], 而管理层正在加速CapEx(+48% QoQ) [DM-FIN-023]。Networking增速即使30%也不能改变ROIC<WACC的事实, 但ROIC翻转到>WACC会改变整个估值结论。"

  valuation_language_shift:
    old_method: "Forward PE 41x on FY2027E EPS $7.47 — 把整个混合体当成单一AI成长股定价"
    new_method: "分部SOTP (Networking EV/Rev + Industrial EV/EBITDA + SiC概率加权期权) + 稀释调整173M股"
    why_must_shift: "41x统一PE隐含整个公司以25%+ EPS CAGR增长, 但31%的收入(Industrial)在萎缩-10%且被剥离。对一个正增长+负增长的混合体用统一PE = 把萎缩业务也按成长股定价。SOTP揭示实质: 加权$226.6 vs 市价$307.50 = 高估26% [DM-RT-SUP-014]。Python验证: 即使最乐观概率(Bear 15%/Base 50%/Bull 35%)也仅$249, 需要Bull>$500才能justify当前价格, 概率<10%。"

  explained_anomaly:
    anomaly: "COHR 17.5%增速 vs LITE 65.5%增速, 但Forward PE仅差6x(41x vs 47x) — 市场给COHR每单位增速的估值溢价是LITE的3倍以上"
    new_explanation: "'41倍去杠杆'框架解释了这个定价异常: 市场在COHR的41x中不全是在买AI增速, 而是在买三个非增长引擎——D&A递减每年释放~$0.50-1.00 EPS, 利息节省每年+$0.35, 剥离低margin业务提升OPM。这些机械EPS改善被打包进'增长'叙事, 让COHR看起来比实际增速(17%)更像增速(25%+)的公司。换句话说, LITE的47x在买真正的65%收入增长, COHR的41x在买去杠杆化装成的增长——单位增速的估值溢价差异正好反映了这个伪装溢价。"

  expansion_test:
    sub_modules:
      - "Ch 估值: '41倍去杠杆'直接产出SOTP框架 — 分部估值暴露统一PE隐藏的混合体折价, 三情景概率加权证明$307.50在任何合理假设下不可justify"
      - "Ch 财务: 收入归因瀑布中'非增长EPS贡献'(D&A递减+利息节省)变成独立追踪项, 不再混入增长叙事; ROIC vs WACC成为承重墙变量而非附注"
      - "Ch 风险: M4标签坍塌的逻辑链变得自洽 — 如果市场发现'41x中一半是去杠杆, 不是增长', 标签从AI成长股切换到工业混合体, PE从41x压缩到20-25x, 股价-38%~-51%"
      - "Ch 竞争: COHR vs LITE的比较从'谁增速更快'转变为'谁的PE中增长含量更高' — LITE 90%+是AI纯度, COHR 69%, 这解释了为什么LITE的PE/增速比更健康"
      - "Ch Kill Switch: 红灯信号从'Networking增速<10%'扩展为'ROIC在FY27仍<WACC' — 后者是更根本的价值毁灭信号"

---

## Top 5 Lens Crystallization

### Lens 1 (母Lens, 与compression_test一致)
```yaml
lens_1:
  old_category: "AI光通信成长股 — 受益于800G/1.6T升级周期, NVIDIA背书, 按Forward PE定价"
  new_category: "后合并去杠杆混合体 — 三引擎(AI 69% + 工业 31% + SiC期权)用D&A递减和债务清偿制造EPS, 披着AI标签"
  why: "41x PE隐含25%+ EPS CAGR, 但拆解后$10.16 EPS增量中$3-4来自非增长因素(D&A/利息/mix)。31%萎缩业务按AI倍数定价=免费搭车。SOTP暴露26%高估。"
  valuation_implication: "从统一Forward PE → 分部SOTP(Networking EV/Rev + Industrial EV/EBITDA + SiC概率加权) + 173M稀释股"
  key_variable_shift: "从Networking收入增速 → ROIC vs WACC差值(当前-5.8pp)"
```

### Lens 2: EPS增长归因
```yaml
lens_2:
  old_category: "收入驱动的EPS增长故事 — EPS从-$0.52→$9.64, 市场归因于AI需求增长"
  new_category: "EPS工厂 — 收入增长只贡献EPS增量的60-65%, 其余35-40%来自D&A递减+利息节省+mix改善的机械效应"
  why: "D&A从$554M→$300M(FY29E)机械释放~$1.30/yr EPS [DM-FIN-008]; 利息节省$143M(FY25-28E)= +$0.74 EPS [DM-FIN-009]; SBC+剥离Munich进一步提OPM。如果Networking增速从22%降到10%, EPS仍能增长15%+——但这不是增长, 是会计机械效应。"
  valuation_implication: "EPS增长率不能直接用PEG估值; 必须拆分'增长驱动EPS'和'机械驱动EPS', 只对前者给成长股倍数"
  key_variable_shift: "从EPS增长率 → Owner FCF Yield(当前0.06%, FY28E 0.95%)[DM-FIN-025/026]"
```

### Lens 3: 竞争定位
```yaml
lens_3:
  old_category: "LITE的同业竞争者 — 两家都做InP光芯片, 市场把它们当同一赛道的#1和#2"
  new_category: "LITE的供应链邻居, 不是直接竞争者 — LITE在200G/lane EML有12-18个月性能领先, COHR在6-inch InP有成本优势(die cost -60%), 两者在不同层面参与竞争"
  why: "COHR卖模块不是裸芯片 [P3 Supplement修正], 800G ASP平稳而非上升 = 利润来自成本优势和mix, 不是定价权。LITE 90%+ AI纯度 vs COHR 69%, LITE GM 42.5% vs COHR 37-39%, LITE增速85% vs COHR 22%。市场把它们放在同一估值桶, 但基本面差异巨大。"
  valuation_implication: "不能用LITE的估值倍数锚定COHR — LITE的PE/增速比更健康, AI纯度更高; COHR应该对标工业+科技混合体(如Amphenol/TE Connectivity), 不是纯AI光芯片"
  key_variable_shift: "从800G/1.6T出货量 → 模块毛利率(GM)趋势 + AI收入占比纯度"
```

### Lens 4: SiC业务身份
```yaml
lens_4:
  old_category: "拖累margin的遗留业务 — SiC收入下滑, Materials整体-10% YoY, 被市场给零估值"
  new_category: "嵌入式看涨期权 — Wolfspeed Ch.11让COHR成为西方唯一200mm SiC供应商候选, DENSO/Mitsubishi $1B锁定需求, 期权价值$1.5-5.0B"
  why: "Wolfspeed是全球最大SiC衬底供应商(30%+份额)且刚进Chapter 11 [DM-BIZ-028]。COHR有200mm SiC产线(从150mm升级中, 目标2027), DENSO/Mitsubishi联合投资$1B是需求的背书。如果COHR成功量产200mm, 成本比150mm降30-40%, 在EV渗透率>30%时代(2028+)SiC可能变成第二增长引擎。"
  valuation_implication: "SiC不应给零估值也不应给确定性增长估值 — 用期权定价(概率30-40% × 成功后$5B EV)"
  key_variable_shift: "从Materials段收入增速 → 200mm量产时间表 + Wolfspeed客户转移进展"
```

### Lens 5: 时间换空间的脆弱性
```yaml
lens_5:
  old_category: "等待催化剂的低估股 — D&A递减+去杠杆+SiC+1.6T四个催化剂排队, 时间站在投资者这边"
  new_category: "时间正在消耗价值的高估股 — ROIC 4.2% < WACC 10%意味着每等一年, 公司消耗而非创造价值; 2027H1是关键窗口, 之后AI CapEx放缓+标签坍塌双重风险"
  why: "圆桌5/5一致洞见: '时间换空间'论文的隐含假设是等待期不消耗价值, 但ROIC<WACC说明等待期在毁灭价值 [DM-RT-007]。温水煮青蛙情景40-50%概率, 3年累计-36%, 年化-14% [DM-RT-014]。如果2027H1之前没有ROIC翻转到>WACC的证据, bear case从'缓慢恶化'升级为'标签坍塌'。"
  valuation_implication: "不能用'等一年催化剂兑现'的逻辑来justify当前价格; 持有成本 = WACC-ROIC = 5.8%/yr"
  key_variable_shift: "从'催化剂日历'(D&A递减时间/SiC量产/去杠杆完成) → '价值消耗速率'(ROIC-WACC每季度追踪)"
```

---

## P4.5→P5 前置资格4问 (内部判断, 不在报告中暴露)

1. **改定义?** YES — 从"AI光通信成长股"→"41倍去杠杆混合体"。**最高优先**, 前置到主线
2. **改变量?** YES — 从Networking增速→ROIC vs WACC差值。**高优先**, 紧跟定义
3. **改估值语言?** YES — 从统一Forward PE→分部SOTP+稀释调整。**中优先**, 估值章核心
4. **改动作?** YES — 从"等待催化剂"→"审慎关注, 持有成本5.8%/yr"。**低优先**, 行动层

4/4全YES → alpha充分, 可以进入Phase 5组装。
