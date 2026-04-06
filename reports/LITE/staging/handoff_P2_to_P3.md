## Handoff Note — LITE Phase 2 → Phase 3

### 1. 主要请求与意图
Phase 2完成: 财务深度分析+Non-GAAP估值重建, 17章+7附录, 45.9K字符。覆盖CQ3/CQ4/CQ7/CQ9/CQ10/CQ11。

### 2. 关键技术概念
**7个改变估值的发现**:
1. Non-GAAP调整$410M/年(收入14.1%)——精确桥接: SBC+payroll $47.9M/Q + 收购摊销$34.0M/Q + 保修$9.8M/Q + 其他$11.7M/Q
2. 管理层$30 EPS数学可行($30.88)但需三个激进假设同时成立(收入$8B+OPM40%+SBC可控), 概率15-20%
3. **NVIDIA优先股导致Q3'26稀释股数跳升至~92M** (从86.1M, +6.9%)——直接降低EPS
4. Reverse DCF需$42B终态收入——全球光模块TAM($15-20B)的2.1-2.8倍
5. Owner FCF在FQ2'26首次转正$5M→yield 0.007%→即使$8B rev也只有Owner PE 56x
6. 加权混合公允价值$269 vs $827(-67%)——所有估值方法均指向极度高估
7. **Greensboro NC晶圆厂**(从Qorvo收购)2028年出货→$8B收入的产能基础，但利用率爬坡风险

**CQ更新**: CQ3↓8%, CQ7↑48%, CQ9新增30%, CQ10新增40%, CQ11新增50%
**加权平均CQ置信度**: 28.8%(低)

### 3. 已完成的文件和产出
- `staging/P2_financial_valuation.md` — 45.9K字符, 17章+7附录, DM密度0.95, 因果密度6.53
- `data/valuation_model_p2.py` — Non-GAAP DCF + SOTP + Owner FCF + 敏感性分析
- `data/valuation_summary_p2.json` — 估值结果JSON
- DM锚点12个新增(FIN-050/055, VAL-050~054, BIZ-051/060/061/062, IND-051~053, BAL-051)
- CI注册表8个(6偏空/2偏多)

### 4. 已解决的问题
- GAAP→Non-GAAP精确桥接(之前是估算,现在从earnings press release验证)
- 可转债稀释at不同股价水平的精确计算(Treasury Stock Method)
- 管理层$30 EPS的独立自下而上验证
- Owner FCF转正时间点确认(FQ2'26首次$5M)
- ST Debt重分类原因(可转债会计处理,非真正流动性危机)

### 5. 用户反馈记录
无本Phase用户反馈

### 6. 待办任务
- [ ] Phase 3红队: 对"$827高估67%"的结论进行反方论证
- [ ] 硅光子渗透率深度研究(1.6T/3.2T代际,对EML TAM影响)
- [ ] Google OCS自研进度追踪(Systems分部风险)
- [ ] AI CapEx持续性的独立验证(Bain $800B缺口vs实际部署)
- [ ] 可比公司(COHR)估值gap的原因分析(25.9x vs 11x EV/S)
- [ ] NVIDIA $2B投资精确条款(优先股转换条件/投票权/稀释上限)——10-Q待发

### 7. 当前精确状态
Phase 2完成。三维状态: [极度高估 × 运营改善中 × 下行催化风险>上行]。
初步评级: 审慎关注。加权公允价值$269(-67% vs $827)。
下行概率(>50%跌幅): 55-65%。

### 8. 下一步唯一优先
**Phase 3第一个动作**: 红队最强Bull case——为什么$827可能是合理的？
**重点反驳**: (1) SOTP Bull给出$812→市场可能用SOTP而非DCF估值 (2) 如果光模块TAM扩张到$100B+→Reverse DCF的$42B可能合理 (3) Leopold Aschenbrenner/Soros fund的投资逻辑是什么
**不要重复的事**: 不重新运行Python估值 | 不重算GAAP→Non-GAAP桥接 | 不重复可转债条款
