# ADSK 深度报告审计 (Step R2)
# 审计日期: 2026-03-26
# 报告版本: ADSK_Complete_v1.0_2026-03-26.md (195K/794DM)
# 行业模块: enterprise_saas_modules.md (M1-M10 + E1-E2)

---

## Part 1: 模块定位矩阵

| 模块 | 公司状态 | 同业差异(核心2点) | 误判风险 | 证据缺口 | KS状态 |
|------|---------|-----------------|---------|---------|:------:|
| **M1 收入结构** | 有机~13%, AECO+22%引领, 4分部增速σ=6.7pp | ①ADSK有机13%≈PTC 12%但远低于DDOG 28% ②分裂度6.7pp接近10pp阈值 | FY2026+18%含3-5pp转型追赶→FY2027正常化可能被误读为"减速" | cRPO有机增速未单独剥离 | 🟢 |
| **M2 SaaS单位经济学** | MN 0.44偏低, LTV/CAC 5.2x健康, R40=51/43 | ①MN 0.44远低于DDOG 0.92和NOW 0.65 ②CAC Payback 3.1年>NOW 1.5年 | MN偏低可能被"ARPS提升"叙事掩盖——S&M效率问题是真实的 | GRR未直接验证(全部间接推断) | 🟢 |
| **M3 AI影响(AIAS)** | L1.5/S0.5, 净分+1.0, 五不变量0.5/5 | ①ADSK AI远落后于NOW(L2/S1.5)+DDOG(L2/S1) ②AI ARR未单独披露=<$100M | **高误判风险**: 市场可能给AI期权溢价(ADSK不配→PE不应扩张) | AI产品ARR、AI客户留存率、Neural CAD商业化时间表均无数据 | 🟢 |
| **M4 护城河迁移** | A-Score 5.90, 脆弱窗口2028-33, APS 15% | ①ADSK护城河分裂(DWG消融+RVT增强) vs NOW一致增强(C5数据飞轮) ②APS落后Bentley iTwin 2-3年 | **DWG半衰期估算(-1.3pp/年)可能偏乐观**——AI加速格式解析可能使消融速度加倍 | APS开发者数(ADSK未披露), ODA实际影响的量化数据 | 🟡 |
| **M5 定价权** | 加权B4=3.23, F500 Stage4/SMB Stage2 | ①ADSK定价权分化>CRM(CRM更均匀) ②连续2年7%+提价可能触顶(NOW从未年提价>5%) | SMB GRR~92-97%是最大隐患——如果churn加速,NRR跌破100% | **SMB churn rate无直接数据**(全部推断), 提价弹性未量化 | 🟡 |
| **M6 飞轮效应** | 净强度0.6(弱正), 悖论检查通过(Neural CAD净效应微弱) | ①ADSK飞轮是"留存工具"(NRR+2-3pp)非"增长加速器" ②CRM飞轮净-0.2(更差) | 飞轮净强度0.6可能偏高——如果AutoCAD seat减少(AI蚕食),交叉销售基数缩小→净效应可能→0 | 交叉销售转化率(AutoCAD→Revit)无数据 | 🟢 |
| **M7 财务韧性** | FCF-SBC Yield 3.6%, Net Debt -$118M, B5=5/5, B6=3.5/5 | ①ADSK FCF-SBC Yield 3.6%低于NOW 5.1%和行业4-8%基准 ②但Net Cash优于CRM(Net Debt $8B) | **FCF-SBC Yield 3.6%被Standard FCF Yield 4.8%掩盖**——多数投资者看后者,错估真实回报 | 回购η效率未计算(报告仅定性), M&A增量ROIC未计算 | 🟢 |
| **M8 竞争格局** | AECO堡垒/MFG暴露/M&E边缘, 4战场分析 | ①ADSK 4战场同时竞争 vs NOW仅2战场(ITSM+expansion) ②ADSK无任何战场Win Rate数据 | **MFG竞争力被高估**——Fusion 360在mid-market有价格优势但PLM深度不足,可能在SMB→Mid扩展中碰壁 | **Win Rate数据完全缺失**(ADSK不披露), Procore vs ACC客户迁移数据无 | 🟡 |
| **M9 估值不对称** | 6方法67%偏低估, 离散度25%, Standard/Owner $45鸿沟 | ①ADSK Standard/Owner差距($45)>NOW($15)>CRM($20)——SBC是最大估值不确定性 ②6方法方向一致性67%刚过60%门控 | **方向一致性67%偏弱**——Bear PW($194)和Owner PW($193)精确收敛说明Bear风险≈SBC成本,市场可能已经正确定价 | 不对称比(买错vs不买错)未显式计算 | 🟡 |
| **M10 管理层** | 5.5-6/10, CEO零买入, SEC历史, 新CFO 15月 | ①ADSK CEO conviction最弱(0买入 vs NOW CEO $20M买入) ②SEC调查历史是SaaS板块独有负面(CRM/NOW/DDOG无此问题) | **管理层风险被低估**——SEC调查暴露的"文化问题"可能需要5年+才能验证是否真正修复 | CEO薪酬结构详情(Proxy分析不足), 新CFO的资本配置哲学尚无track record | 🟡 |

**模块覆盖统计**: 10/10模块全部覆盖(无完全缺失) | 5个🟡(证据不足或有误判风险) | 5个🟢

---

## Part 2: 报告结构映射

### 缺失模块

| 模块 | 缺失程度 | 影响(对结论的影响) |
|------|:--------:|------------------|
| **M2 GRR直接验证** | 不足(全部间接推断) | 如果实际GRR<推断值→NRR高估→增速预测偏高→估值偏高 |
| **M5 提价弹性量化** | 不足(定性描述) | 不知道"每提价1%→churn增加X%"→无法判断定价天花板 |
| **M8 Win Rate** | 完全缺失 | 不知道新客竞争胜率→无法判断份额趋势方向 |
| **M10 CEO薪酬+治理结构** | 不足 | Proxy分析不够深→治理风险评估缺乏硬数据 |
| **E2 投资大师圆桌** | 完全未执行 | CQ加权65.7%<70%触发条件但CQ中5个在50-70%→应触发 |

### 重复章节

| 问题 | 出现章节 | 合并建议 |
|------|---------|---------|
| SBC分析 | P1 Ch16 + P2 Ch19 + 补强S1(R40) + 补强S4(瀑布) | 4处SBC分析→v2应合并为单一"SBC经济学"章 |
| 竞争格局 | P1 Ch13 + P3 Ch22(A-Score) + 补强M1(Win-Loss) | 3处竞争分析→v2应合并为"竞争深度"章 |
| AI影响 | P1 Ch8-9 + P3 Ch26(AIAS) | 结构合理(P1定性+P3量化),保留 |
| 估值 | P2 Ch17-21(6方法) + 补强S4(SBC矩阵) + P4(Bear PW) | P2+P4整合度好,v2保持 |

### 叙事缺验证

| 章节 | 缺什么 | 补救成本 |
|------|--------|:-------:|
| P1 Ch11(护城河) | APS开发者数、ODA实际影响量化 | 中(需WebSearch) |
| P1 Ch7(NRR) | GRR直接验证(ADSK不披露→间接法有误差) | 高(无法获得) |
| P1 Ch10(定价权) | 提价弹性(每+1%价→churn+X%) | 高(无数据来源) |
| P1 Ch14(管理层) | CEO薪酬结构详情、Board独立性评分 | 低(Proxy可查) |
| P3 Ch24(五引擎) | Insider具体交易对手(Form 4详情) | 低(FMP可查) |
| 补强S5(第二曲线) | ACC独立ARR(管理层仅暗示"approaching $1B") | 中(模糊披露) |

### 删减/下沉建议

| 章节 | 建议 | 理由 |
|------|------|------|
| P1 Ch12(飞轮) | 压缩50% | 飞轮净强度0.6(微弱)→对估值影响<1%,不值得4K+ |
| P3 Ch25(PPDA) | 压缩30% | PPDA-3(方法论鸿沟)和PPDA-4(关税)重复了P2+P4内容 |
| P3 Ch26(AIAS) | 与P1 Ch8-9合并 | 避免跨Phase读同一topic |
| 补强M9(运营杠杆) | 下沉附录 | 前瞻OPM投影属于估值输入,非独立分析模块 |

---

## Part 3: 最短补齐路线图 (Top 3模块)

### 补齐模块1: M2 GRR验证+S&M效率深化 (影响: 估值置信度+8%)

**为什么是Top 1**: GRR是NRR的"底层组件"——如果GRR被高估,整个增速预测偏高→估值偏高。当前全部间接推断(GRR~98%)可能比实际值高2-3pp。

**最小字段表**:
- F1: GRR(间接法v2——用DR变化率+客户数变化交叉验证,非仅NRR倒推)
- F2: Churn Rate by Tier(ADSK不披露→用行业可比推断: NOW 2%, CRM 8%, DDOG 4%)
- F3: S&M Efficiency by Vintage(新客vs存量的S&M分配比)
- F4: CAC趋势(3年,判断获客是否越来越贵)

**一致性检验**: GRR × (1+扩展率) ≈ NRR (±2pp); GRR趋势应与churn rate趋势反向

**Kill Switch**: GRR<90%(年化,推断) → NRR可能跌破100% → 增速预测需下调3pp+

**预估工作量**: 3K字符 + 需要WebSearch(行业GRR基准) + DR分析(10-K数据已有)

### 补齐模块2: M8 竞争Win Rate + 弹性测试 (影响: 护城河评分校准)

**为什么是Top 2**: 护城河强度(A-Score 5.90)是估值的关键输入——但没有Win Rate数据就无法判断护城河是在增强还是削弱。当前A-Score基于定性判断,缺乏方向性硬证据。

**最小字段表**:
- F1: Win Rate(新客竞标——ADSK不披露,需用第三方调查: G2/TrustRadius/Gartner Reviews)
- F2: 弹性测试(4路同攻5年收入损失——已在补强M1战场分析中部分覆盖)
- F3: Customer Migration Patterns(从/向ADSK迁移的案例——需要WebSearch客户案例)
- F4: Market Share Trend(3年AECO/MFG市占率变化方向)

**一致性检验**: Win Rate趋势应与市占率趋势一致; 弹性测试<15%=强护城河(A-Score>7)

**Kill Switch**: Win Rate<30%(如果可获得) → 竞争格局恶化 → A-Score下调1-2分

**预估工作量**: 4K字符 + WebSearch(G2 Reviews/Gartner MQ for AEC) + 案例分析

### 补齐模块3: M10 CEO治理深度+Proxy分析 (影响: 治理折价校准)

**为什么是Top 3**: CEO零买入+SEC历史是ADSK最独特的负面因素(SaaS同行无此问题)。当前评分5.5-6/10可能偏高——如果Proxy分析发现薪酬结构有问题(如过高的guaranteed compensation vs performance-linked),治理折价应更大。

**最小字段表**:
- F1: CEO Total Comp结构(base/bonus/RSU/PSU比例)
- F2: CEO Pay vs Performance(5年TSR vs CEO实现薪酬)
- F3: Board独立性(独立董事占比+任期+持股)
- F4: 新CFO Moorjani背景+前任公司记录

**一致性检验**: CEO Pay应与TSR相关(R²>0.3); 独立董事占比>60%=良好治理

**Kill Switch**: CEO薪酬中performance-linked<30%(=激励不对齐) → 治理折价扩大至15-20%

**预估工作量**: 2K字符 + Proxy Statement精读(公开数据)
