# Launch Brief: MOG.A
> 自动生成 by tier3_launch.sh v1.0 | 2026-04-06 23:12
> **AI必须在Phase 0开始前完整阅读本文件**

## 复杂度评估
- **行业**: aerospace_defense
- **同行业报告数**: 0 份
- **同行业参考**: 
- **同行业平均**: 300K chars
- **★ 目标字符范围**: 240K - 375K chars
- **硬底线**: 200K chars (低于此为质量失败)

## 参考报告 (按行业)
  - ADBE: 271K chars / 451KB (其他)
  - ADSK: 195K chars / 304KB (其他)
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
  - DDOG: 343K chars / 600KB (其他)
  - ETN: 331K chars / 566KB (其他)
  - FICO: 177K chars / 296KB (其他)
  - GOOGL: 528K chars / 844KB (科技平台)
  - IHG: 315K chars / 501KB (其他)
  - INTC: 269K chars / 448KB (半导体)
  - INTU: 337K chars / 614KB (其他)
  - KLAC: 254K chars / 442KB (半导体)
  - LITE: 181K chars / 312KB (其他)
  - LRCX: 470K chars / 717KB (半导体)
  - MA: 243K chars / 394KB (金融)
  - MAR: 355K chars / 586KB (其他)
  - MCO: 294K chars / 511KB (其他)
  - META: 317K chars / 534KB (科技平台)
  - MRVL: 274K chars / 427KB (其他)
  - MSCI: 222K chars / 353KB (其他)
  - MSFT: 316K chars / 517KB (科技平台)
  - MU: 178K chars / 295KB (半导体)
  - NET: 168K chars / 277KB (其他)
  - NOW: 311K chars / 544KB (其他)
  - NVDA: 217K chars / 342KB (半导体)
  - ORCL: 259K chars / 418KB (其他)
  - PANW: 266K chars / 432KB (其他)
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
  - SNOW: 132K chars / 213KB (其他)
  - SOFI: 294K chars / 468KB (金融)
  - SPGI: 160K chars / 261KB (其他)
  - TSLA: 534K chars / 910KB (汽车科技)
  - TSM: 451K chars / 715KB (半导体)
  - V: 281K chars / 468KB (金融)
  - VRSN: 276K chars / 462KB (其他)
  - VRT: 367K chars / 645KB (其他)
  - WMT: 356K chars / 631KB (消费品)

## 进化教训 (最近3份报告)
  - null  # AI填入
  - null  # AI填入
  - null  # AI填入

## Phase -1 知识检索
- knowledge_context.md: 1445 chars
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

## 🔴 铁律R: 四大必备分析 (v22.1, 任何一项=0 → CG22 FAIL)

> **下次报告强制执行**。LITE v1.0审计教训: 4/4全部缺失。
> 详见: `.claude/rules/rule-R-four-mandatory.md` + `memory/feedback_four_mandatory_analysis.md`

| # | 模块 | Phase | 调用Skill | 必备产出 | grep门控 |
|---|------|------|---------|---------|---------|
| R-1 | **财务归因** | P2 | 手动 | 收入瀑布(量/价/mix/M&A) + 毛利Bridge(各驱动pp) + EPS瀑布(到目标的路径) | ≥3次 |
| R-2 | **剪刀差分析** | P2-P3 | 手动 | 5种类型至少3个: 量价/CapEx-FCF/R&D-收入/GAAP-NonGAAP/价值链利润转移 | ≥3次 |
| R-3 | **圆桌讨论** | P4后 | `investment-committee` v2.0 | 5位大师对抗(同意/反对/新角度) | ≥5次 |
| R-4 | **认知圈量化** | P5 | `cognitive-boundary-assessor` v3.0 | 可推演度% + 复杂度1-5级 + 黑箱比例% | ≥3次 |

## 🔴 铁律Q: 供应链交叉验证 (v22.1)

> **触发条件**: 公司有明确上下游(半导体/制造业/汽车/消费电子等)
> 详见: `knowledge/industry_modules/semiconductor_modules.md` M11+M12

- **M11 供应链交叉验证**: 上游供应商业绩 vs 公司增速一致性 (偏差<10%=一致)
- **M12 真实出货vs渠道库存**: sell-in vs sell-out区分, 客户DIO趋势, 公司DSO异常

**强制规则**: 4条一致性检验
- A: 公司YoY增速 vs 关键上游YoY增速, 偏差<10%=一致
- B: 公司下游分部增速 vs 主要下游客户增速, 偏差<15%=一致
- C: 价值链利润是否"转移"(一方GM改善另一方恶化)
- D: 同行业可比公司季度收入方向应一致(差距>20pp=异常)

## 纵深防御提醒
- **Layer 0**: tier3_launch.sh [已完成] — 复杂度估计+知识检索+checkpoint
- **Layer 1**: preflight_gate.sh [待执行] — Phase 0前硬阻断
- **Layer 2**: phase_sentinel.sh [自动] — 每Phase后重验全部前序(嵌入phase_complete)
- **Layer 3**: quality_gate_complete.sh [最终] — 组装前门控
- **设计**: 即使任何单层被跳过,后续层仍会检测到缺失产出
