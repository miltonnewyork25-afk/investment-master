# FORM Compression Test (Phase 4.5)

> **日期**: 2026-04-17

---

compression_result:
  new_definition: "HBM叙事溢价的周期股"
  new_definition_one_sentence: "FORM是一家增长方向和利润方向结构性相反的周期性探针卡公司, $128中约$30-50是HBM叙事溢价而非基本面价值"

  # 链接1: 变量排序变化
  variable_reorder:
    old_first_variable: "HBM content per wafer增长 (市场默认看HBM需求→探针卡收入→高估值)"
    new_first_variable: "GAAP GM持续性 (决定ROIC能否跨越WACC, 进而决定估值锚)"
    why_new_more_explanatory: "HBM需求已被100%定价(SK Hynix 2026 sold out, CapEx+36%), 但GM能否持续>43%决定了$128和$65之间的差距。FY2025 ROIC 4.9%<WACC 9%, 只有GM持续改善才能翻转"

  # 链接2: 估值语言切换
  valuation_language_shift:
    old_method: "Forward PE on non-GAAP EPS (市场用$2.50 FY2027E non-GAAP × 50x = $125)"
    new_method: "Owner PE on Owner Earnings (FY2027E OE $100-150M × 30-40x = $39-78)"
    why_must_shift: "Non-GAAP剥离了SBC $39M, 使EPS虚增73%。Owner Earnings还原真实股东可提取利润, 370x vs 67x的差异揭示估值失真程度"

  # 链接3: 解释旧框架解释不了的现象
  explained_anomaly:
    anomaly: "收入+18%(FY23→FY25)但正常化EPS零增长($0.70→$0.69), 增长未转化为利润"
    note: "FY2023报告EPS $1.05含$73M一次性投资收益, 正常化后约$0.70 [DM-RT-007]"
    new_explanation: "低毛利DRAM(占比+5pp)替换高毛利F&L = 增长边际质量递减。收入增长被D&A增加($37M→$47M, Farmers Branch)+ mix shift完全吃掉, 解释了为什么收入+18%但利润零增长"

  # 真压缩硬测试
  expansion_test:
    sub_modules:
      - "Ch 财务: 因为'增长和利润方向相反', 收入归因瀑布自然拆出DRAM低毛利替代F&L高毛利的不对称替代效应"
      - "Ch 估值: 因为Owner PE vs non-GAAP PE的73%差距, 估值章从'市场用的方法'切换到'应该用的方法'自然成章"
      - "Ch 竞争: 因为Technoprobe利润率优势19.2pp, 竞争章围绕'为什么FORM赚钱效率不如竞品'展开"
      - "Ch 风险: 因为GM持续性是核心变量, Kill Switch围绕GM阈值(38%红灯/42%黄灯/44%绿灯)构建"

---

## Top 5 Lens Registry

### Lens 1 (主范畴重分配)
```yaml
lens_1:
  old_category: "HBM消耗品垄断供应商 (高增长, 估值溢价合理)"
  new_category: "HBM叙事溢价的周期股 (增长≠利润, 叙事溢价$30-50)"
  why: "收入5年CAGR +0.5%, EPS 5年CAGR -10.2%, ROIC 4.9%<WACC — 增长没有创造股东价值"
  valuation_implication: "从Forward non-GAAP PE(50x)切换到Owner PE(30-40x × FY27E OE)"
  key_variable_shift: "从HBM content per wafer变成GAAP GM持续性"
```

### Lens 2 (范畴重分配)
```yaml
lens_2:
  old_category: "消耗品替换模型 (高频replacement = SaaS式经济学)"
  new_category: "CapEx密集MEMS制造商 (探针卡是客户消耗品, 但对FORM是CapEx密集制造)"
  why: "ROIC 4.9%, FCF margin 1.5% — 如果是SaaS式消耗品, 资本回报率不该这么低"
  valuation_implication: "不能用SaaS式P/S(10-15x)定价, 应用工业制造P/S(3-5x)"
  key_variable_shift: "从replacement rate变成Farmers Branch产能利用率"
```

### Lens 3 (范畴重分配)
```yaml
lens_3:
  old_category: "纯HBM受益股 (HBM涨FORM涨)"
  new_category: "一条腿加速一条腿减速 (DRAM +117% / F&L -15% / 净效应+2%)"
  why: "F&L收入4年持续下降, Technoprobe TSMC 2nm夺取30%份额, HBM增长仅刚好补上F&L萎缩"
  valuation_implication: "不能给总收入统一的增长溢价, 应SOTP分开估(DRAM高增+F&L衰退)"
  key_variable_shift: "从总收入增速变成DRAM-F&L净增量"
```

### Lens 4
```yaml
lens_4:
  old_category: "估值溢价反映护城河"
  new_category: "估值溢价反映叙事而非护城河 (EV/Sales 12.7x vs WFE 7x, 溢价81%唯一解释=HBM故事)"
  why: "护城河真实(专利+认证), 但定价权弱(收入5年零增长), 溢价来源是叙事不是经济特许权"
  valuation_implication: "溢价应收窄至WFE中位数±10%, 即EV/Sales 6-8x"
  key_variable_shift: "从护城河宽度变成叙事溢价衰减速度"
```

### Lens 5
```yaml
lens_5:
  old_category: "Farmers Branch是增长投资"
  new_category: "Farmers Branch是Make-or-Break赌注 ($220-250M = 收入30%, 类似LITE Cloud Light收购)"
  why: "单一设施投入占收入30%, 如果利用率<60%=资产减值风险, >70%=利润拐点"
  valuation_implication: "需给Farmers Branch独立估值: 成功=$500M增量价值, 失败=$150M减记"
  key_variable_shift: "从CapEx增长变成Farmers Branch breakeven利用率"
```
