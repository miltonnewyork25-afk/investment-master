## Handoff Note — FTNT Phase 1 → Phase 2

### 1. 主要请求与意图
用户要求继续FTNT Tier 3深度分析，Phase 1已完成。下一步Phase 2：财务与价格含义。

### 2. 关键技术概念
- **核心矛盾**: ASIC是可移植护城河还是贬值资产？结论→ASIC在on-prem持久5年+，但云PoP不使用ASIC(运行FortiOS VM)，护城河来自FortiOS生态锁定而非ASIC云移植
- **主线thesis**: FTNT是"用硬件成本优势撬动软件订阅"的混合体，当前PE 34x(vs历史54x)可能低估了转型进度
- **三维状态**: [可能低估 × 改善中 × 催化可能]
- **H1**: ASIC是缓慢贬值的护城河(非零一状态)，置信度55%偏多
- **H2**: 估值压缩创造不对称机会，待Phase 2 Reverse DCF验证
- **H3**: 内部人零买入是系统性治理问题，置信度55%偏空(但Ken Xie持$4.2B, 年卖0.7%)

### 3. 已完成的文件和产出
- `reports/FTNT/staging/FTNT_P1_AgentA.md` — Phase 1正文(24.7K字符, 38 DM锚点, 4 Mermaid, 12章)
- `data/research/FTNT/shared_context.md` — 更新至DM-BIZ-020(含Phase 1新增锚点)
- `reports/FTNT/data/checkpoint.yaml` — Phase 1 completed
- **关键数字**:
  - FY2025: Rev $6.80B(+14.2%), OPM 30.6%, FCF $2.23B(32.7%), SBC 4.1%
  - PE 34.1x, Forward PE 24.9x, P/FCF 26.5x, Owner PE 30.3x
  - SASE Billings Q4+40%, 全年+24%, 占比27%; FortiSASE ARR >90% YoY
  - 91% SASE billings来自存量客户; $12:$1交叉销售比率
  - FortiSP5: 17x防火墙/32x加密/3.5x NGFW vs通用CPU
  - IDC: FTNT 17.7% vs PANW 18.2%安全设备市占率(几乎平手)
  - MSFT Defender: 25.8%端点市占率(#1, +40.7% YoY)
  - CVE: 5+关键CVE在12个月内被野外利用(模式性问题)
  - Ken Xie持有51.4M股($4.2B), 12个月两兄弟合计卖出~$100M+

### 4. 已解决的问题
- ASIC是否在云PoP中使用？→ **否**，FortiSASE云PoP运行FortiOS VM(无ASIC加速)
- FTNT vs PANW防火墙差距？→ IDC数据显示收入份额几乎平手(17.7% vs 18.2%)
- MSFT威胁多真实？→ 端点安全25.8%份额(#1)+Security Copilot免费bundled入E5→真实但主要影响端点而非网络安全
- 被否决方案: 未否决任何方案

### 5. 用户反馈记录
- 用户要求进入生态科技worktree(但FTNT报告在main分支reports/FTNT/)
- 无特殊偏好指令

### 6. 待办任务 (Phase 2)
1. **Reverse DCF**: 当前$82.53隐含什么增长/利润率/久期假设？→承重墙脆弱度表
2. **Owner FCF估值**: FCF-SBC口径($1.95B)估值
3. **三情景推演**: Bull(SASE加速+刷新二次)/Base/Bear(SASE放缓+MSFT侵蚀)
4. **资本配置分析**: $2.3B回购效率(eta)计算 + FY2024零回购→FY2025激进回购的逻辑
5. **NRR间接推算**: 收入增速-新客贡献→存量扩展率→推断NRR范围
6. **三PE并列**: GAAP PE 34.1x / Owner PE 30.3x / Core PE(剥离净利息收入)
7. **周期定位**: 网安行业周期阶段(中期上升) + FTNT刷新周期叠加

### 7. 当前精确状态
- Phase 1 **已完成并commit** (2笔commit: f05ca9f1 + 3e0da5f5)
- checkpoint.yaml: current_phase=1, phase_status=completed
- CQ置信度更新: CQ1 55%(↑10), CQ2 60%(↑5), CQ3 40%(=), CQ5 40%(↑5), CQ6 40%(=), CQ7 45%(↑5), CQ8 50%(=)
- CI注册表: 6条(CI-1~CI-6)
- 承重墙: 5个(BW-1~BW-5)
- 工作目录: `/Users/milton/投资大师`(main分支，非worktree)

### 8. 下一步唯一优先
**Phase 2开始**: 先运行Python Reverse DCF(用checkpoint中的价格$82.53 + 共识数据)，再写财务分析章节。Phase 2目标≥25K字符。

**不要重复的事**: 不需要重新收集基础财务数据(已在shared_context DM-FIN/DM-BAL/DM-VAL系列)。不需要重新做行业背景(Phase 1已覆盖)。
