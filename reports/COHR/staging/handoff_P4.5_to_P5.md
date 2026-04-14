# Handoff Note — COHR Phase 4.5 → Phase 5
> 2026-04-14

---

## 1. 主要请求与意图
COHR Tier 3深度分析, 目标4.4分/200K+。Phase 4.5完成结晶+工程清单。下一步Phase 5单会话组装。

## 2. 关键技术概念
- **母钉子**: "41倍去杠杆" — COHR不是AI成长股, 是后合并去杠杆混合体, 市场用41x PE在买D&A递减+债务清偿制造的EPS轨迹
- **第一变量切换**: Networking收入增速 → ROIC vs WACC差值(当前-5.8pp)
- **估值语言切换**: 统一Forward PE → 分部SOTP(三情景概率加权)
- **SOTP最终值**: Bear $150.7(30%) / Base $211.8(45%) / Bull $344.4(25%) → **加权$226.6 vs $307.50 = -26.3%**
- **评级**: 审慎关注 [贵×改善中×可能有催化], 5/5圆桌零异议
- **护城河**: 3.5/5 (P4从3.8下修: 成本优势≠护城河+NVIDIA非独特锁定)
- **CQ加权**: 53.4%
- **认知边界预估**: 黑箱比例~25-30%(bookings firm/soft比例、NVIDIA条款细节、库存段级分拆不可得)

## 3. 已完成的文件和产出

### Phase 0-4.5 全量文件清单
| Phase | 文件 | 字符 | DM |
|-------|------|------|----|
| P0 | P0_foundation.md | ~8,500 | 28 |
| P0.75 | P0.75_thesis_crystallization.md | ~6,500 | 8 |
| P0.75 | COHR_default_map_audit.md | ~3,200 | 0 |
| P1-A | P1_A_business.md (Ch1-4) | 18,609 | 110 |
| P1-B | P1_B_moat_competition.md (Ch5-7) | 22,529 | 119 |
| P1-C | P1_C_risk_cq.md (Ch8-10) | 19,628 | 103 |
| P1-S1 | P1_supplement_SiC_OPM.md | ~5,000 | 22 |
| P1-S2 | P1_supplement_upside_scissors_BOM.md | ~4,500 | 18 |
| P2 | P2_financial_deep_dive.md (Ch11-16) | 18,837 | 104 |
| P2-S | P2_supplement_gaps.md (S1-S5) | 7,853 | 32 |
| P3 | P3_competition_strategy.md (Ch17-22) | 13,101 | 61 |
| P3-S | P3_supplement_corrections.md (S1-S7) | 8,120 | 49 |
| P4 | P4_red_team.md (Ch23-30) | 15,500 | 18 |
| P4-S | P4_supplement.md (S1-S3) | 5,753 | 15 |
| P4.5 | COHR_compression_test.md | ~4,500 | 8 |
| **Total** | | **~162,000** | **~695** |

### 关键数据文件
- `data/valuation_model.py` — Python SOTP模型
- `data/valuation_summary.json` — P2原始估值
- `data/valuation_p4_revision.json` — P4修正后估值(使用此版)
- `data/roundtable_transcript.md` — 圆桌完整记录
- `data/launch_brief.md` — 启动简报
- `data/agent_findings_summary.md` — Agent研究摘要

### 关键数据点(Phase 5必须使用, 铁律K):
- SOTP概率加权: **$226.6**(-26.3%) [DM-RT-SUP-014]
- Bear $150.7 / Base $211.8 / Bull $344.4 [DM-RT-SUP-014]
- 稀释股数: **173M** (165M preferred + 7.8M NVIDIA) [DM-RT-SUP-013]
- 护城河: **3.5/5** [P4修正]
- ROIC: **4.2%** < WACC 10% [DM-FIN-026]
- Owner FCF FY25: **$33M** (yield 0.06%) [DM-FIN-025]
- 库存: **$1,848M** (+28.5% in 6mo) [DM-FIN-022]
- D&A: $554M(FY25) → ~$300M(FY29E) [DM-FIN-008]
- 利息节省FY25→FY28E: $143M = +$0.74 EPS [DM-FIN-009]
- M4标签坍塌独立概率: 30%±5% [DM-RT-005]
- 温水煮青蛙: 40-50%概率, 3年-36%, 年化-14% [DM-RT-014]
- InP BOM value share: 30-40%(pluggable) → 10-15%(CPO) [DM-COMP-008]
- 三PE: GAAP 72.4x / Owner 93.8x / Non-GAAP 57.5x [DM-FIN-018/019]

## 4. 已解决的问题
- P4.5 Compression Test: "41倍去杠杆"命名, 三链接(变量/估值/失灵)全部通过
- Top 5 Lens: 5条全部含范畴重分配(≥3要求)
- 前置资格4问: 4/4全YES
- 被否决的替代命名: "三引擎混装"(准确但缺少数字锚)、"AI壳下的去杠杆"(比喻太多)

## 5. 用户反馈记录
- 用户指示"继续COHR, 直到写完, 进入下一个phase"

## 6. 待办任务 (Phase 5)
1. 单会话组装Complete v1.0 (目标200K+)
2. 执行摘要按三段式(对齐+裂缝 → 新定义+变量 → 评级+Kill Switch)
3. R-4认知边界量化(调用cognitive-boundary-assessor Skill)
4. 5减法检查(hedging/箭头链/审美词/voice/范畴重分配)
5. 质量门控: G1-G9全部PASS

## 7. 当前精确状态
- P0-P4.5 累计staging: ~162K chars, ~695 DM, ~21 Mermaid
- Phase 5需要新增: ~38-50K chars (执行摘要+章节衔接+固化+附录)
- 估值统一: 使用P4 Python修正值($226.6), 铁律K
- 黑箱预估: 25-30% → 按R-4, 需要区间估值+信心度低标注(不强制禁止单点)

## 8. 下一步唯一优先
**Phase 5: 单会话组装COHR_complete_v1.0.md**
- 第一动作: 读全部staging文件 → 写执行摘要(三段式800-1200字)
- 组装顺序: 执行摘要 → Ch1核心争议(对齐+失灵) → Ch2-4业务(P1-A重组) → Ch5-7护城河(P1-B) → Ch8-10风险(P1-C) → Ch11-16财务(P2) → Ch17-22竞争(P3) → Ch23-30红队(P4) → 认知边界(R-4) → Kill Switch → 固化
- 不要重复: P4的红队分析逐条重写, 用衔接+压缩整合
- 中场检测: 50K/100K/150K/200K四个时点

---

## phase5_engineering_requirements

```yaml
phase5_engineering_requirements:
  dm_anchors_to_add:
    # 执行摘要 (必须≥10个DM)
    - id: DM-EXEC-001
      number: "SOTP加权$226.6 vs $307.50 = -26.3%"
      source: "data/valuation_p4_revision.json"
      chapter: "执行摘要 段3"
    - id: DM-EXEC-002
      number: "Bear $150.7 / Base $211.8 / Bull $344.4"
      source: "P4 supplement S3"
      chapter: "执行摘要 段3"
    - id: DM-EXEC-003
      number: "ROIC 4.2% < WACC 10% = -5.8pp负利差"
      source: "P2 Ch14 + P4 RT-1"
      chapter: "执行摘要 段2"
    - id: DM-EXEC-004
      number: "EPS增量$10.16中$3-4来自非增长因素"
      source: "P2 Ch13 (D&A+利息+mix归因)"
      chapter: "执行摘要 段2"
    - id: DM-EXEC-005
      number: "41x Forward PE on FY27E $7.47"
      source: "P0 foundation"
      chapter: "执行摘要 段1"
    - id: DM-EXEC-006
      number: "Networking 69% (+34%) vs Industrial 31% (-10%)"
      source: "P1-A Ch2 + P3 Supplement S3"
      chapter: "执行摘要 段1"
    - id: DM-EXEC-007
      number: "稀释股数173M(165M+NVIDIA 7.8M)"
      source: "P4 supplement"
      chapter: "执行摘要 段3"
    - id: DM-EXEC-008
      number: "护城河3.5/5, CQ 53.4%"
      source: "P4 red team"
      chapter: "执行摘要 段3"
    - id: DM-EXEC-009
      number: "M4标签坍塌30%±5%独立概率"
      source: "P4 RT-5"
      chapter: "执行摘要 段3 Kill Switch"
    - id: DM-EXEC-010
      number: "圆桌5/5一致审慎关注"
      source: "data/roundtable_transcript.md"
      chapter: "执行摘要 段3"

    # 核心争议章 (≥5个DM)
    - id: DM-CORE-001
      number: "COHR 17.5% vs LITE 65.5%增速, PE差仅6x"
      source: "P0.75 异常1"
      chapter: "Ch1 核心争议"
    - id: DM-CORE-002
      number: "D&A $554M→$300M(FY29E), 每年释放~$0.50-1.00 EPS"
      source: "P1-A Ch3 + P2 Ch13"
      chapter: "Ch1 核心争议"
    - id: DM-CORE-003
      number: "FCF -$96M(FQ2'26), CapEx +48% QoQ"
      source: "P2 Ch11"
      chapter: "Ch1 核心争议"
    - id: DM-CORE-004
      number: "Preferred Stock $2.5B→$0, ~8.5%稀释至165M股"
      source: "P1-A Ch4"
      chapter: "Ch1 核心争议"

    # 业务章 (引用P1-A的DM)
    - id: DM-BIZ-REF
      number: "P1-A已有110个DM, 组装时引用不重编"
      source: "staging/P1_A_business.md"
      chapter: "Ch2-4"

    # 护城河章 (引用P1-B的DM)
    - id: DM-MOAT-REF
      number: "P1-B已有119个DM, 组装时引用不重编"
      source: "staging/P1_B_moat_competition.md"
      chapter: "Ch5-7"

    # 财务章 (引用P2的DM + 新增)
    - id: DM-FIN-NEW-001
      number: "收入归因: AI Networking ~$4.2B(+34%) + Industrial ~$1.9B(-10%)"
      source: "P2 Ch11-12"
      chapter: "Ch8 收入归因"
    - id: DM-FIN-NEW-002
      number: "Owner FCF $33M → 0.06% yield"
      source: "P2 Ch14"
      chapter: "Ch9 FCF分析"
    - id: DM-FIN-NEW-003
      number: "三PE: GAAP 72.4x / Owner 93.8x / Non-GAAP 57.5x"
      source: "P2 Ch15"
      chapter: "Ch9 财务章"
    - id: DM-FIN-NEW-004
      number: "库存$1,848M, DIO 159天, 概率加权减值~$90M"
      source: "P2 Ch14 + P4 S1"
      chapter: "Ch10 库存"

    # 竞争章 (引用P3的DM + 新增)
    - id: DM-COMP-NEW-001
      number: "NVIDIA $4B投资($2B COHR + $2B LITE)"
      source: "P3 Ch17"
      chapter: "Ch11 竞争"
    - id: DM-COMP-NEW-002
      number: "InP BOM: 30-40%(pluggable) → 10-15%(CPO)"
      source: "P1-B Ch6"
      chapter: "Ch12 CPO风险"
    - id: DM-COMP-NEW-003
      number: "Innolight 1.6T module份额50-60%"
      source: "P3 Ch19"
      chapter: "Ch11 竞争"

    # 估值章 (新增, 整合P2+P4修正)
    - id: DM-VAL-001
      number: "SOTP Bear EV $28.3B / Base $38.9B / Bull $61.8B"
      source: "P4 S3 Python"
      chapter: "Ch13 估值"
    - id: DM-VAL-002
      number: "需Bull>$500才能justify $307.50, 概率<10%"
      source: "P4 S3"
      chapter: "Ch13 估值"
    - id: DM-VAL-003
      number: "Reverse DCF: $307.50隐含FY27-30 Networking CAGR 28%"
      source: "P1-C Ch9"
      chapter: "Ch13 估值"
    - id: DM-VAL-004
      number: "SiC期权价值$1.5-5.0B概率加权"
      source: "P2 Ch16"
      chapter: "Ch13 估值"

    # 红队章 (引用P4的DM)
    - id: DM-RT-REF
      number: "P4已有18个DM, 组装时引用不重编"
      source: "staging/P4_red_team.md"
      chapter: "Ch14 红队"

    # Kill Switch章 (新增)
    - id: DM-KS-001
      number: "4红/4黄/4绿信号体系"
      source: "P1-C Ch10"
      chapter: "Ch15 Kill Switch"
    - id: DM-KS-002
      number: "利率+100bp → 股价约-20%(FCF -$25M + PE -15%)"
      source: "P4 RT-7"
      chapter: "Ch15 Kill Switch"
    - id: DM-KS-003
      number: "温水煮青蛙: 40-50%概率, 年化-14%"
      source: "P4 RT-6"
      chapter: "Ch15 Kill Switch"

    # 认知边界章 (Phase 5新增, R-4)
    - id: DM-COG-001
      number: "可推演度/业务复杂度/黑箱比例"
      source: "cognitive-boundary-assessor Skill"
      chapter: "Ch16 认知边界"

  mermaid_diagrams_to_add:
    - title: "三引擎SOTP结构图"
      type: "flowchart"
      chapter: "执行摘要 / Ch13"
      purpose: "让读者一眼看到AI Networking + Industrial + SiC三段估值来源"
    - title: "EPS归因瀑布"
      type: "bar chart (mermaid)"
      chapter: "Ch8 收入归因"
      purpose: "可视化$10.16 EPS增量中增长vs非增长的贡献"
    - title: "ROIC vs WACC演化轨迹"
      type: "xychart"
      chapter: "Ch9 财务"
      purpose: "显示ROIC何时可能追上WACC(FY27?FY28?)"
    - title: "库存vs收入增速剪刀差"
      type: "xychart"
      chapter: "Ch10 库存"
      purpose: "可视化库存增速1.5x收入增速的警告信号"
    - title: "竞争格局分层图(芯片层vs模块层)"
      type: "flowchart"
      chapter: "Ch11 竞争"
      purpose: "COHR有芯片成本优势但Innolight有模块份额"
    - title: "CPO架构对InP的影响决策树"
      type: "flowchart"
      chapter: "Ch12 CPO"
      purpose: "CPO不杀InP但降低BOM占比"
    - title: "三情景概率树"
      type: "flowchart"
      chapter: "Ch13 估值"
      purpose: "Bear/Base/Bull概率+per share value"
    - title: "Kill Switch红黄绿信号矩阵"
      type: "flowchart"
      chapter: "Ch15 Kill Switch"
      purpose: "4红/4黄/4绿的触发条件和行动"
    - title: "标签坍塌传导链(M4)"
      type: "flowchart"
      chapter: "Ch14 红队"
      purpose: "M4如何从PE压缩→估值重心下移"
    - title: "SiC期权决策树"
      type: "flowchart"
      chapter: "Ch13 估值"
      purpose: "200mm成功/失败→期权价值$0-5B"
    - title: "稀释时间线(Preferred+NVIDIA+SBC)"
      type: "gantt"
      chapter: "Ch4 资本结构"
      purpose: "155M→173M的稀释路径"
    - title: "InP供需缺口(2M需求 vs 600K产能)"
      type: "bar chart"
      chapter: "Ch5 护城河"
      purpose: "70%供需缺口=短期稀缺溢价"

  mid_assembly_checkpoints:
    - 50K    # 第1次基线检测(预计执行摘要+Ch1-4完成)
    - 100K   # 第2次(预计Ch5-10完成)
    - 150K   # 第3次(预计Ch11-14完成)
    - 200K   # 第4次(全文完成, 最终检测)
```

## 9. 不要重复的事
- P4红队RT-1~RT-7不要逐条重写, 用压缩整合
- P3 Supplement的7项修正已经回流到checkpoint, 不要在正文中保留"P3 Supplement修正"标注
- 圆桌投票5/5零异议, 不需要R-3异议披露章节(阈值≥3/5)
- 不要读rule-S-delivery.md或output_side_audit_rubric.md
