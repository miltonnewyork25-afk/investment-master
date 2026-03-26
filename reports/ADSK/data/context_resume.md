# ADSK Context Resume — Phase 4恢复用
> **保存时间**: 2026-03-26 | **分支**: 金融基础设施

## 当前状态
- **Phase 3 COMPLETE + P2-3补强** (7 sessions total, 27章+补强6模块)
- **累计产出**: 149K字符 / 711 DM / 16 Mermaid
- **补强**: 12.7K / 56 DM (SaaS单位经济学+KS+收入纯度+SBC瀑布+第二曲线+遗漏扫描)

## 已完成文件
| File | 字符 | DM密度 |
|------|------|--------|
| `ADSK_Phase1_PartI.md` | 22.7K | 3.21/千字 |
| `ADSK_Phase1_PartII_A.md` | 15.0K | 3.20/千字 |
| `ADSK_Phase1_PartII_B.md` | 25.0K | 4.08/千字 |
| `ADSK_Phase1_PartIII.md` | 22.2K | 5.17/千字 |
| `ADSK_Phase2.md` | 26.1K | 7.35/千字 |
| `ADSK_Phase3.md` | 25.0K | 5.08/千字 |
| **`ADSK_Phase2_3_Supplement.md`** | **12.7K** | **4.42/千字** |

## Phase 2-3关键发现汇总
- **估值区间**: $225-$310,中枢~$260,PW Standard $243(+3%), PW Owner $193(-18%)
- **核心变量**: SBC收敛速度(Standard vs Owner $50差距)
- **A-Score**: 5.90/10(DWG消融+Revit坚固+APS未建)
- **PtW**: 33/50(最薄弱L2: 资源分散)
- **五引擎**: 5.9/10(RSI 12.45极端超卖+Insider净卖=温和看多)
- **PPDA**: 4背离(55%analyst-market+RSI脱钩+Owner鸿沟+关税过度反应)
- **AI**: L1.5/S0.5, 净分+1.0(轻微正面)
- **SaaS单位经济学**: Magic Number 0.44(偏低), LTV/CAC 5.2x(健康), Rule of 40 51.4/42.7(标准/Owner)
- **Kill Switches**: 10个KS注册(KS-1~KS-10)
- **收入纯度**: AutoCAD=利润基座(25%收入→40-45%利润), AECO=增长引擎(50%收入→36%利润)
- **SBC瀑布**: 70%来自分母增长,FY2030E ~8.5%(依赖收入增速)
- **第二曲线**: MFG 3.5/4(Growth勉强), ACC 3.5/4(Profitability不透明)
- **遗漏**: PTC收购传闻未量化(10-15%概率→$294-330), Zoo.dev开源CAD威胁(5年+)

## CQ置信度 (Phase 3完成)
| CQ | 置信度 | 方向 |
|----|--------|------|
| CQ1(增速) | **75%** | 有机12-13%可维持 |
| CQ2(AI) | **60%** | AI轻微正面 |
| CQ3(定价权) | **70%** | 高端Stage4/低端Stage2 |
| CQ4(双引擎) | **75%** | AECO强/MFG中/M&E弱 |
| CQ5(SBC) | **72%** | SBC收敛路径(FY2030~8.5%) |
| CQ6(护城河) | **58%** | A-Score 5.90,脆弱窗口2028-33 |
| CQ7(竞争) | **68%** | AECO堡垒/MFG暴露 |
| CQ8(估值) | **82%** | 六方法+单位经济学交叉验证 |
| CQ9(管理层) | **52%** | 5.5-6/10(系统改善但CEO弱) |
| **加权平均** | **68.4%** | — |

## Phase 4任务: 红队
- 红队七问(RT-1~RT-7)
- 双向校准(bullish/bearish bias检测)
- Kill Switch压力测试(KS-1~KS-10协同触发)
- 偏差修正→估值回流
- 目标≥20K字符

## 关键数据位置
- 估值模型: `data/phase2_valuation.py`
- Phase 0数据: `data/phase0_data_master.md` + `data/phase0_data_supplement.md`
- Reverse DCF: `data/reverse_dcf_output.txt`
- Kill Switch注册表: `ADSK_Phase2_3_Supplement.md` §补强2
