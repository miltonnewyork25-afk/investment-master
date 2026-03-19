# Launch Brief: MCO
> 自动生成 by tier3_launch.sh v1.0 | 2026-03-14 21:21
> **AI必须在Phase 0开始前完整阅读本文件**

## 复杂度评估
- **行业**: 金融
- **同行业报告数**: 1 份
- **同行业参考**: SOFI(294K) 
- **同行业平均**: 294K chars
- **★ 目标字符范围**: 235K - 368K chars
- **硬底线**: 200K chars (低于此为质量失败)

## 参考报告 (按行业)
  - AMAT: 304K chars / 520KB (半导体)
  - AMD: 341K chars / 556KB (半导体)
  - AMZN: 236K chars / 391KB (科技平台)
  - ANET: 278K chars / 438KB (其他)
  - APP: 525K chars / 889KB (其他)
  - ARM: 359K chars / 572KB (其他)
  - ASML: 422K chars / 809KB (半导体)
  - AVGO: 208K chars / 362KB (其他)
  - COST: 281K chars / 464KB (消费品)
  - CPRT: 355K chars / 599KB (其他)
  - ETN: 331K chars / 566KB (其他)
  - FICO: 180K chars / 301KB (其他)
  - GOOGL: 528K chars / 844KB (科技平台)
  - IHG: 315K chars / 501KB (其他)
  - INTC: 269K chars / 448KB (半导体)
  - KLAC: 254K chars / 442KB (半导体)
  - LRCX: 470K chars / 717KB (半导体)
  - MAR: 355K chars / 586KB (其他)
  - META: 317K chars / 534KB (科技平台)
  - MSCI: 222K chars / 353KB (其他)
  - MSFT: 316K chars / 517KB (科技平台)
  - MU: 178K chars / 295KB (半导体)
  - NVDA: 217K chars / 342KB (半导体)
  - ORCL: 259K chars / 418KB (其他)
  - PG: 250K chars / 462KB (消费品)
  - PLTR: 457K chars / 724KB (其他)
  - RBLX: 383K chars / 641KB (其他)
  - RCL: 317K chars / 538KB (其他)
  - RDDT: 244K chars / 397KB (其他)
  - SBUX: 120K chars / 198KB (消费品)
  - SEMI_EQUIPMENT_COMPARATIVE: 939K chars / 1550KB (其他)
  - SEMI_EQUIPMENT_STRATEGY: 168K chars / 283KB (其他)
  - SMCI: 333K chars / 568KB (其他)
  - SOFI: 294K chars / 468KB (金融)
  - SPGI: 160K chars / 261KB (其他)
  - TSLA: 534K chars / 910KB (汽车科技)
  - TSM: 451K chars / 715KB (半导体)
  - VRT: 367K chars / 645KB (其他)
  - WMT: 356K chars / 631KB (消费品)

## 进化教训 (最近3份报告)
  - null  # AI填入
  - 多会话扩写加叙述不加DM锚点→DM密度0.44/千字(历史最低); 国际收入>30%缺地理分析=最大结构遗漏; 续约率推断无硬数据=论文基础脆弱
  - ①DM密度0.32/千字(低于1.0目标)——Phase3扩写期间DM同步不足; ②字符223K(wc-m)vs345K(staging wc-c)——UTF-8中文膨胀导致计量混淆, 应统一wc-m; ③金融行业首用——框架适配良好但quality_gate PW不支持浮点(3.6→fallback最高基准)

## Phase -1 知识检索
- knowledge_context.md: 1726 chars
- 状态: ✓ 完成

## 已知失败抗体 (Adaptive Immunity)
> 以下教训来自历史报告的失败模式。AI必须在分析过程中主动避免。
  - 66K for mega-cap = catastrophic. 无Phase -1/-0.5 → 产出薄80%
  - 外部输入变化(用户指令模式改变)导致全部准备工作跳过
  - 77分钟完成vs多天=质量降低80%
  - MacroTrends SBC含DevEx, FMP SBC=$0(parser问题), 单源不可信
  - WACC±100bps跨3个评级区间=假精度, 巨头公司尤其严重

## 必用框架清单 (Framework Absorption Checklist)
> AI必须在Phase 0阅读本清单，Phase 1开始前确认每项已吸收。
> 来源: insights报告发现"missing 9/12 frameworks"是系统性问题。

### 通用必选 (所有行业)
- [ ] 逆向估值 (Reverse DCF → 隐含假设) — /assumption-audit M1
- [ ] A-Score品质评分 (21维度) — docs/company_quality_scoring.md
- [ ] 风险拓扑 (协同/反协同矩阵) — /risk-topology
- [ ] Kill Switch (>=12个, KS-N格式) — docs/deep_dive_protocol.md
- [ ] 非共识洞察注册表 (CI-N格式) — Phase 1-3持续注册
- [ ] DM锚点体系 — docs/confidence_system.md

### 行业专用 (金融)
- [ ] 金融行业框架 — docs/industry/financial_deep.md
- [ ] 利率敏感性 + 信用周期定位
- [ ] 资本充足率(CET1/杠杆率)分析

### 历史冠军方法 (可选复用)
> 从excellence_catalog.yaml中与本公司最相关的方法:
- [ ] 查看 knowledge/excellence_catalog.yaml

## Pre-mortem: 本报告最可能的失败模式
> 假设6个月后回顾,本报告质量很差。最可能的原因是什么?
1. 准备不足 — 跳过文献侦察,对行业认知浅薄 (AAPL教训)
2. 产出过薄 — 目标235K-368K,实际远低于目标
3. 数据单源 — 关键财务数字只用FMP,未交叉验证 (RBLX教训)
4. 方法不独立 — 多方法估值结果<3%差异=共享假设 (AMAT教训)
5. 红队走过场 — 所有CQ同方向调整=系统性偏差 (AMAT教训)

## AI待完成清单 (Phase 0之前)
1. [x] Phase -1 知识检索 (≥500 chars)
2. [ ] Phase -0.5 文献侦察 — 5路WebSearch → data/lit_recon_memo.md (≥1000 chars)
3. [ ] 运行 preflight_gate.sh 验证 → 必须CLEARED
4. [x] checkpoint.yaml 已自动创建 (target_chars: 294669)

## 纵深防御提醒
- **Layer 0**: tier3_launch.sh [已完成] — 复杂度估计+知识检索+checkpoint
- **Layer 1**: preflight_gate.sh [待执行] — Phase 0前硬阻断
- **Layer 2**: phase_sentinel.sh [自动] — 每Phase后重验全部前序(嵌入phase_complete)
- **Layer 3**: quality_gate_complete.sh [最终] — 组装前门控
- **设计**: 即使任何单层被跳过,后续层仍会检测到缺失产出
