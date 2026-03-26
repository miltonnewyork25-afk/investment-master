# ADSK Context Resume — Phase 3恢复用
> **保存时间**: 2026-03-26 | **分支**: 金融基础设施

## 当前状态
- **Phase 2 COMPLETE** (5 sessions total, 21章)
- **累计产出**: 111K字符 / 529 DM / 12 Mermaid / 21章完成(Ch1-Ch21)
- **Phase 2**: 26K / 192 DM / DM密度7.35/千字 / 因果6.13/万字

## 已完成章节
| Session | 章节 | 文件 | 字符 | DM密度 |
|---------|------|------|------|--------|
| S1 | Ch1-Ch3 (Part I: 市场信仰翻译) | `ADSK_Phase1_PartI.md` | 22.7K | 3.21/千字 |
| S2 | Ch4-Ch7 (Part II-A: 业务深潜) | `ADSK_Phase1_PartII_A.md` | 15.0K | 3.20/千字 |
| S3 | Ch8-Ch11 (Part II-B: AI+定价权+护城河) | `ADSK_Phase1_PartII_B.md` | 25.0K | 4.08/千字 |
| S4 | Ch12-Ch16 (Part III: 飞轮+竞争+管理层+财务+盈利) | `ADSK_Phase1_PartIII.md` | 22.2K | 5.17/千字 |
| **S5** | **Ch17-Ch21 (Phase 2: 财务+估值)** | **`ADSK_Phase2.md`** | **26.1K** | **7.35/千字** |

## Phase 2关键发现(供Phase 3参考)
- **估值区间**: $225-$310,中枢~$260(排除极端后6方法收敛)
- **PW标准DCF**: $243/股(+3.2%) — 接近合理
- **PW Owner DCF**: $193/股(-18%) — Owner基础偏贵
- **最关键变量**: SBC收敛速度决定Standard($243)与Owner($193)之间的$50差距
- **承重墙**: 8个中5低/2中/1高脆弱度 — "不易崩塌"结构
- **B5利润弹性**: 5/5(10Y OPM +24.9pp)
- **B6资本配置**: 3.5/5(回购对冲SBC,M&A ROIC不透明)
- **周期定位**: 中周期偏上(BIM mandate+建设高位,但利率抑制)
- **SOTP启示**: AECO单独值$158/股(56%总价值),MFG的$10.4B估值依赖Fusion竞争力

## CQ置信度 (Phase 2完成)
| CQ | 置信度 | 方向 |
|----|--------|------|
| CQ1(增速) | **75%** | 有机12-13%可维持2-3年 |
| CQ2(AI) | **55%** | AI净正面偏中性(P3深入) |
| CQ3(定价权) | **68%** | 高端Stage4/低端Stage2 |
| CQ4(双引擎) | **75%** | AECO强/MFG中/M&E弱 |
| CQ5(SBC) | **72%** | SBC收敛路径量化(FY2030~8%) |
| CQ6(护城河) | **60%** | ~20%迁移,缺口窗口(P3深入) |
| CQ7(竞争) | **65%** | PTC/BSY可比强化 |
| CQ8(估值) | **78%** | 六方法交叉验证,区间$225-310 |
| CQ9(管理层) | **55%** | B6=3.5/5,及格但不出色 |
| **加权平均** | **67.5%** | — |

## Phase 3任务
Phase 3: 战略分析 — 护城河量化+五引擎+PtW+PPDA
- 护城河类型识别与量化(Ch22)
- PtW战略一致性评分(Ch23)
- 五引擎协同分析(Ch24)
- PPDA概率-价格背离(Ch25)
- PMSI情绪指数(Ch26)
- Phase 3.5 AI深度评估(Ch27-Ch29)
- 目标≥25K字符

## 关键数据位置
- 估值模型: `data/phase2_valuation.py` + `data/phase2_valuation_output.txt`
- Phase 0数据: `data/phase0_data_master.md` + `data/phase0_data_supplement.md`
- Reverse DCF: `data/reverse_dcf_output.txt`
- Phase 1摘要: 本文件"Phase 2关键发现"部分

## 写作规则提醒 (rule-N v3.2)
- 规则B: 每段第一句给结论
- 规则D: 句子要短
- 规则C: 抽象词翻译(平台→定价权/转换成本)
- 规则F: 只写影响判断的信息
