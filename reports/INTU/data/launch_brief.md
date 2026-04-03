# Launch Brief: INTU
> 自动生成 by tier3_launch.sh v1.0 | 2026-03-24 03:54
> **AI必须在Phase 0开始前完整阅读本文件**

## 复杂度评估
- **行业**: 金融基础设施
- **同行业报告数**: 0 份
- **同行业参考**: 
- **同行业平均**: 300K chars
- **★ 目标字符范围**: 240K - 375K chars
- **硬底线**: 200K chars (低于此为质量失败)

## 参考报告 (按行业)
  - ADBE: 271K chars / 451KB (其他)
  - AMAT: 304K chars / 520KB (半导体)
  - AMD: 341K chars / 556KB (半导体)
  - AMZN: 236K chars / 391KB (科技平台)
  - ANET: 278K chars / 438KB (其他)
  - APP: 525K chars / 889KB (其他)
  - ARM: 359K chars / 572KB (其他)
  - ASML: 422K chars / 809KB (半导体)
  - AVGO: 208K chars / 362KB (其他)
  - CME: 270K chars / 457KB (其他)
  - COST: 281K chars / 464KB (消费品)
  - CPRT: 356K chars / 599KB (其他)
  - CRM: 230K chars / 369KB (其他)
  - ETN: 331K chars / 566KB (其他)
  - FICO: 177K chars / 296KB (其他)
  - GOOGL: 528K chars / 844KB (科技平台)
  - IHG: 315K chars / 501KB (其他)
  - INTC: 269K chars / 448KB (半导体)
  - KLAC: 254K chars / 442KB (半导体)
  - LRCX: 470K chars / 717KB (半导体)
  - MAR: 355K chars / 586KB (其他)
  - MCO: 294K chars / 511KB (其他)
  - META: 317K chars / 534KB (科技平台)
  - MSCI: 222K chars / 353KB (其他)
  - MSFT: 316K chars / 517KB (科技平台)
  - MU: 178K chars / 295KB (半导体)
  - NVDA: 217K chars / 342KB (半导体)
  - ORCL: 259K chars / 418KB (其他)
  - PG: 250K chars / 462KB (消费品)
  - PLTR: 457K chars / 724KB (其他)
  - PTC: 125K chars / 212KB (其他)
  - PYPL: 174K chars / 297KB (其他)
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
  - V: 281K chars / 468KB (金融)
  - VRSN: 276K chars / 462KB (其他)
  - VRT: 367K chars / 645KB (其他)
  - WMT: 356K chars / 631KB (消费品)

## 进化教训 (最近3份报告)
  - v1.0→v2.0验证: 铁律O(Reverse DCF前置)+铁律H(ADBE对标)+铁律K(估值统一)将红队代价从-25%→-8.5%。中性起点比任何分析技术都重要。M2(NRR不公开)是SaaS报告的系统性盲区。
  - 巨头估值(市值>$500B)的核心挑战不是'值多少钱'而是'市场是否已经正确定价'。V的6种方法离散度仅10.3%但实际独立方法约2.5种(共享增速假设)→低离散度=伪精确非真收敛。CI分层是支付网络的NRR等价物——CI不按客户层拆分就像SaaS不看NRR(CRM v2.0 M2=0分的教训在支付网络重现)。李录框架揭示WACC决定80%价值→Visa是'宏观代理'非'个股机会'→个股Alpha有限。
  - 完全垄断公司的B2B模块(M2/M3/M6)需要改造——双边市场/寡头博弈/客户集中度在HHI=10000时全部失效。最大盲区是渠道商视角(M6)——分析垄断者必须分析垄断者的客户(注册商GoDaddy=35%收入集中)。核心分析(M1嵌入+M5定价+M9资本+M10监管)达满分。

## Phase -1 知识检索
- knowledge_context.md: 1797 chars
- 状态: ✓ 完成

## 已知失败抗体 (Adaptive Immunity)
> 以下教训来自历史报告的失败模式。AI必须在分析过程中主动避免。
  - 66K for mega-cap = catastrophic. 无Phase -1/-0.5 → 产出薄80%
  - 外部输入变化(用户指令模式改变)导致全部准备工作跳过
  - 77分钟完成vs多天=质量降低80%
  - MacroTrends SBC含DevEx, FMP SBC=$0(parser问题), 单源不可信
  - WACC±100bps跨3个评级区间=假精度, 巨头公司尤其严重

## Pre-mortem: 本报告最可能的失败模式
> 假设6个月后回顾,本报告质量很差。最可能的原因是什么?
1. 准备不足 — 跳过文献侦察,对行业认知浅薄 (AAPL教训)
2. 产出过薄 — 目标240K-375K,实际远低于目标
3. 数据单源 — 关键财务数字只用FMP,未交叉验证 (RBLX教训)
4. 方法不独立 — 多方法估值结果<3%差异=共享假设 (AMAT教训)
5. 红队走过场 — 所有CQ同方向调整=系统性偏差 (AMAT教训)

## AI待完成清单 (Phase 0之前)
1. [x] Phase -1 知识检索 (≥500 chars)
2. [ ] Phase -0.5 文献侦察 — 5路WebSearch → data/lit_recon_memo.md (≥1000 chars)
3. [ ] 运行 preflight_gate.sh 验证 → 必须CLEARED
4. [x] checkpoint.yaml 已自动创建 (target_chars: 300000)

## 纵深防御提醒
- **Layer 0**: tier3_launch.sh [已完成] — 复杂度估计+知识检索+checkpoint
- **Layer 1**: preflight_gate.sh [待执行] — Phase 0前硬阻断
- **Layer 2**: phase_sentinel.sh [自动] — 每Phase后重验全部前序(嵌入phase_complete)
- **Layer 3**: quality_gate_complete.sh [最终] — 组装前门控
- **设计**: 即使任何单层被跳过,后续层仍会检测到缺失产出
