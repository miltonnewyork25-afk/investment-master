# PTC Inc 深度研究计划 v1.0
# 日期: 2026-03-19
# 行业: Industrial SaaS (Enterprise SaaS + 工业客户)
# Worktree: 生态科技 (SaaS公司路由)
# 框架版本: v19.6
# 目标: ≥250K字符 + 4.4分(≥88/110)

---

## 一、公司概况快照

| 指标 | 数值 |
|------|------|
| **Ticker** | PTC (NASDAQ) |
| **股价** | ~$159 |
| **市值** | ~$18.3B |
| **EV** | ~$21B(估) |
| **Forward PE** | ~22x |
| **FY2025收入** | $2.74B (+19% YoY) |
| **ARR** | ~$2.45B (+8.5% cc) |
| **GAAP OPM** | 35.9% |
| **FCF** | $857M (+16%) |
| **FCF Yield** | ~4.7% |
| **行业** | CAD/PLM/ALM/SLM (产品生命周期管理) |
| **客户** | 95% F500离散制造企业 |
| **近期事件** | IoT(ThingWorx/Kepware)剥离给TPG完成(2026.3.16, $600M+) |
| **PW估计** | 4-5(中等) → 混合模式 |

---

## 二、4.4分质量标准详解(PTC定制版)

### 门控层(G0-G8, 全部PASS才能提交)

| 门控 | 阈值 | PTC特定注意点 |
|------|------|-------------|
| G0 过程 | RevDCF P1前置+可比P0对标+≥3 session+每Phase≥50%字符 | **可比P0对标: ADSK(最相似, CAD竞争)+CDNS(PE相似, 工业软件)** |
| G1 字符 | **≥275K** (250K×1.1行业系数) | PTC产品线复杂(CAD+PLM+ALM+SLM)→需充分覆盖 |
| G2 DM密度 | ≥1.5/千字 | 目标2.0+(CRM达到2.88) |
| G3 DM总数 | ≥450 | 目标500+ |
| G4 Mermaid | ≥35 | 目标40+(产品线关系图+客户行业图+PLM流程图) |
| G5 因果密度 | ≥5.0/万字 | **目标8.0+(CRM达到8.0, KLAC达9.28)** |
| G6 Python验证 | 必须 | DCF+SOTP+概率加权全Python |
| G7 离散度 | ≤30% | 目标≤20% |
| G8 CQ标记 | CQ1-CQ8 | 见下方CQ设计 |

### 评分层(D1-D11, 总分≥88/110)

| 维度 | 目标分 | PTC特定策略 |
|------|:------:|-----------|
| D1 数据基础 | **9** | FMP 6年财务+10-K分部数据+ARR/NRR推断(v19.6 EVO-001)+行业数据(CAD/PLM市场) |
| D2 问题定义 | **8** | CQ1-8围绕PLM增速/IoT剥离/AI影响/Siemens竞争/SaaS转型 |
| D3 分析深度 | **8** | 因果密度≥8.0+每个核心论点≥3层证据链(铁律N) |
| D4 风险认知 | **8** | KS≥8个12字段+温水煮青蛙+红队修正≥8% |
| D5 估值框架 | **9** | ≥5方法(RevDCF+SOTP+DCF+可比+概率加权)+Python全覆盖 |
| D6 数据验证 | **8** | FMP交叉验证+DM A级≥70% |
| D7 非共识洞见 | **8** | ≥5个CI+每个≥5K字符+≥2可迁移(目标:工业SaaS特有洞见) |
| D8 可视化 | **8** | Mermaid≥40+产品线架构图+客户行业热力图+PLM竞争格局图 |
| D9 追踪体系 | **8** | KS≥8(ARR增速/NRR/Siemens市占/AI product traction)+TS≥10 |
| D10 结构完整度 | **8** | 13模块(M1-10+E1-3)全覆盖, M2(NRR)≥1分(CRM教训) |
| D11 正交度+叙事一致性 | **8** | 零重复+单章≤15%+P1/P4方向偏差≤1档 |
| **总分目标** | **≥90/110(4.5分)** | 以KLAC(4.5)为标杆 |

---

## 三、参考框架维度清单(跨报告汇集)

### A. Enterprise SaaS模块(M1-M10+E1-E3, 直接复用)

| 模块 | PTC适用性 | 特殊调整 |
|------|----------|---------|
| M1 收入结构 | **核心** | PTC不按产品线披露收入→需间接拆解(ARR分解+10-K线索) |
| M2 SaaS经济学 | **核心(v19.6强制)** | PTC未公开NRR→间接推断(CRM教训)。Magic Number需计算 |
| M3 AIAS | **中等** | PTC的AI影响小于CRM(PLM/CAD的AI替代性低于CRM seat) |
| M4 护城河迁移 | **核心** | PTC从perpetual→subscription基本完成→但on-prem→cloud仍在进行 |
| M5 定价权分层 | **核心(v19.6)** | PTC客户: F500制造(Stage 4)+中端(Stage 3)+SMB(Stage 2,较少) |
| M6 飞轮(v19.6) | **核心** | PTC声称"设计→制造→服务"闭环飞轮→需验证连接点+检测悖论 |
| M7 财务韧性 | **核心** | IoT剥离后FCF结构变化→净债务/EBITDA需重算 |
| M8 竞争弹性 | **核心** | Siemens(最大)+Dassault+Autodesk+Ansys四路竞争→弹性测试 |
| M9 估值 | **核心** | ≥5方法+3D敏感性+不对称分析 |
| M10 管理层 | **核心** | CEO Neil Barua(2024.2上任, 前PTC COO)→新CEO评估 |
| E1 演绎法 | **触发**(v19.6) | AI对CAD/PLM的影响是范式级→5步演绎模板 |
| E2 圆桌 | **触发** | 估值置信度预计<65%→需圆桌碰撞 |
| E3 AIAS-PE | **触发** | PTC AIAS评估后加入数据库(第6家) |

### B. 半导体行业框架(工业客户维度借用)

| KLAC/SEMI框架 | PTC借用方式 | 为什么借用 |
|---------------|-----------|-----------|
| **五引擎增长框架**(KLAC Ch4) | 改为PTC四引擎: CAD复杂度/PLM云化/ALM合规驱动/SLM服务化 | 增长驱动力分解 |
| **A-Score 11维护城河**(SEMI Ch6-9) | 直接应用(PTC作为工业软件=基础设施类) | CQI补充维度 |
| **周期分析**(KLAC Ch19) | PTC客户=制造业→CapEx周期敏感(类似WFE) | 周期暴露评估 |
| **UVD/UDC单位经济学**(SEMI Ch11) | 改为SaaS单位经济学(ARR per customer/ARPU/expansion) | M2模块补充 |
| **配对对决**(SEMI Ch16) | PTC vs ADSK + PTC vs Siemens + PTC vs DASTY | 竞争深度分析 |
| **出口管制**(KLAC Ch18) | PTC客户含国防(Windchill)→出口管制影响评估 | 风险维度 |
| **信念反演**(KLAC Ch24) | PTC的Reverse DCF信念集 | KLAC标杆方法 |

### C. CRM v2.0独创框架(v19.6新增)

| CRM框架 | PTC应用 |
|---------|---------|
| **飞轮悖论检测**(EVO-002) | PTC"设计→制造→服务"飞轮中,AI辅助设计成功→减少CAD seat? |
| **定价权剪刀差**(EVO-003) | PTC: 大型制造商(Stage 4, Windchill深嵌)/中小制造(Stage 2-3) |
| **NRR间接推断**(EVO-001) | PTC也不公开NRR→用CRM同方法推断 |
| **AIAS-PE一致性**(EVO-005) | PTC加入AIAS-PE数据库(第6家) |
| **3D敏感性矩阵** | WACC×ARR增速×OPM三维交叉 |
| **温水煮青蛙** | PLM市场被Siemens蚕食的慢变量分析 |
| **不对称分析** | 买入错误vs不买错误的后果比 |

### D. PTC特有分析维度(超越SaaS通用)

| 维度 | 内容 | 来源/类比 |
|------|------|----------|
| **1. IoT剥离影响** | $600M获得→FCF结构变化→估值重构→Pro-forma财务 | PTC特有(2026.3.16完成) |
| **2. 制造业CapEx周期** | PTC收入对制造业CapEx的敏感性(类似WFE对半导体CapEx) | KLAC周期框架迁移 |
| **3. PLM竞争三国演义** | PTC vs Siemens vs Dassault: 市占率+技术路线+AI差异化 | SEMI配对对决方法 |
| **4. CAD→PLM→SLM价值链** | 产品全生命周期覆盖的交叉销售效率 | MCO MIS×MA飞轮方法迁移 |
| **5. Codebeamer/ALM合规驱动** | 汽车(VW)+医疗器械+航空的法规合规→强制PLM需求 | FICO制度嵌入分析迁移 |
| **6. 国防敏感性** | Windchill在国防工业的嵌入→出口管制/ITAR合规→护城河 | KLAC Ch18中国风险方法 |
| **7. ServiceMax服务化** | 从"卖产品"到"卖服务"的收入模式转变 | RCL/IHG服务化分析迁移 |
| **8. AI对CAD/PLM的真实影响** | 生成式设计(Generative Design)+AI仿真→是否替代传统CAD? | ADBE AIAS方法(AI对创作工具) |

---

## 四、CQ设计(预定义)

| CQ | 问题 | 核心张力 | 预估摆动 |
|----|------|---------|---------|
| CQ1 | IoT剥离后的PTC值多少？ | Pro-forma收入~$2.54B, FCF~$787M → 市场是否已重定价? | ±$15-20 |
| CQ2 | PLM市场Siemens能否蚕食PTC份额？ | ABI排名PTC #1 vs Siemens体量10x → "排名≠市占率" | ±$20-30 |
| CQ3 | ARR增速从+14%降至+8.5%→是否见底？ | IoT剥离基数效应+SaaS转型接近完成→有机增速可能更低 | ±$15-25 |
| CQ4 | AI对CAD/PLM是净正面还是净负面？ | 生成式设计→减少CAD seat? or 增加PLM复杂度→更多PLM需求? | ±$10-20 |
| CQ5 | 35.9% OPM是结构性还是一次性? | SaaS转型完成+IoT剥离→OPM应稳定在35%+ vs 投资需求反弹? | ±$10-15 |
| CQ6 | Codebeamer能成为第三引擎吗？ | VW战略+AI Copilot+合规驱动 vs 市场小(ALM TAM ~$2B) | ±$5-10 |
| CQ7 | Forward PE 22x合理吗？ | vs ADSK 28x / CDNS 45x / ANSS 35x → PTC是折价还是合理? | ±$20-30 |
| CQ8 | 制造业CapEx下行周期PTC如何？ | 70%订阅=缓冲 vs 新客获取冻结+upsell放缓 | ±$15-20 |

---

## 五、报告结构(38章+4附录, 7 Parts)

| Part | 章节 | 内容 | 字符目标 |
|------|------|------|---------|
| **Part I: 市场信念** | Ch1-2 | Reverse DCF信念集 + **ADSK/CDNS可比对标** | 15K |
| **Part II: 业务深拆** | Ch3-13 | IoT剥离影响(Ch3) + CAD深度(Ch4) + PLM深度(Ch5) + ALM/Codebeamer(Ch6) + SLM/ServiceMax(Ch7) + **四引擎增速解剖(Ch8)** + **AIAS v2.0(Ch9)** + 护城河CQI+A-Score(Ch10) + **飞轮验证+悖论检测(Ch11)** + **定价权分层(Ch12)** + 管理层+CEO评估(Ch13) | 100K |
| **Part III: 财务与估值** | Ch14-21 | 6年财务+Pro-forma(Ch14) + **SaaS经济学NRR推断(Ch15, v19.6)** + M&A整合ROIC(Ch16) + RevDCF扩展(Ch17) + SOTP(Ch18) + DCF+Python(Ch19) + 可比(Ch20) + 5情景概率(Ch21) | 70K |
| **Part III-B: 深度分析** | Ch22-27 | **3D敏感性(Ch22)** + **PLM竞争三国配对对决(Ch23)** + **制造业CapEx周期敏感性(Ch24)** + **竞争弹性四路同攻(Ch25)** + **回购/资本效率(Ch26)** + **演绎法: AI对CAD/PLM 5步(Ch27, v19.6)** | 50K |
| **Part IV: 红队** | Ch28-33 | 承重墙×7(Ch28) + RT-1~7(Ch29) + 温水煮青蛙(Ch30) + 校准回流(Ch31) + CQ闭环(Ch32) + KS追踪(Ch33) | 40K |
| **Part V: 圆桌** | Ch34 | 投资大师圆桌(5大师×3轮) | 10K |
| **Part VI: 跨公司** | Ch35-38 | **AIAS-PE一致性(Ch35)** + **国防/出口管制(Ch36)** + **Codebeamer合规驱动制度嵌入(Ch37)** + **PTC 2030财务画像(Ch38)** | 20K |
| **附录** | A-D | DM注册表 + 方法论 + 数据源 + 质量声明 | 15K |
| **合计** | | **38章 + 4附录** | **~320K(目标270-350K)** |

---

## 六、Phase执行计划

| Phase | Session | 内容 | 产出 | 字符目标 |
|-------|:-------:|------|------|---------|
| **Phase -1** | S0 | `tier3_launch.sh PTC eco_tech` + 复杂度估计 | launch_brief.md | — |
| **Phase -0.5** | S0 | 5路WebSearch → lit_recon_memo.md | lit_recon_memo.md | ≥1.5K |
| **Phase 0** | S0 | `/data-prefetch` + FMP + ADSK/CDNS对标 | shared_context.md | ≥5K |
| **Phase 0.5** | S0 | CQ1-8定义 + 置信度初始化 | phase_0_planning.md | ≥3K |
| **Phase 0.75** | S0 | 异常狩猎 → thesis_crystallization.md | thesis_crystallization.md | ≥1.5K |
| **Phase 1** | S1 | Part I+II (Ch1-13) — 3 Agent并行 | P1 staging ≥100K | **100K** |
| **Phase 2** | S2 | Part III (Ch14-21) — 3 Agent并行 | P2 staging ≥70K | **70K** |
| **Phase 3** | S3 | Part III-B+IV+V+VI (Ch22-38) | P3 staging ≥60K | **60K** |
| **Phase 4** | S3 | 红队+校准(嵌入P3) | 红队修正 | — |
| **Phase 5** | S4 | 单会话Complete组装(铁律J) | Complete ≥275K | **≥275K** |

---

## 七、可比公司对标矩阵(P0强制)

| 维度 | PTC | ADSK | CDNS | DASTY | 数据源 |
|------|-----|------|------|-------|--------|
| 收入 | $2.74B | $6.13B | $4.6B | EUR6.2B | FMP |
| 增速 | +19% | +12% | +13% | +6% | FMP |
| OPM | 35.9% | 34% | 30% | 30% | FMP |
| FCF Yield | 4.7% | 3.2% | 2.8% | 2.5% | 计算 |
| Forward PE | 22x | 28x | 45x | 32x | FMP |
| **ARR增速** | 8.5% | ~12% | N/A | ~8% | 公司披露 |
| **EV/FCF** | ~25x | ~35x | ~45x | ~40x | 计算 |

**P0关键结论预判**: PTC Forward PE 22x是4家工业软件中最低→但ARR增速8.5%也最低→**PTC是否"便宜得有理由"还是"被低估"?** 这是CQ7的核心。

---

## 八、数据收集清单(Phase 0)

### FMP API (P0优先级)

| 数据 | API调用 | 用途 |
|------|---------|------|
| PTC 6年财务 | `fmp_data income annual` | M1+M7 |
| PTC 季度收入 | `fmp_data income quarterly` | M2 Magic Number |
| PTC资产负债表 | `fmp_data balance annual` | M7杠杆 |
| PTC现金流量表 | `fmp_data cash-flow annual` | M7 FCF质量 |
| PTC关键比率 | `fmp_data ratios` | M9估值 |
| ADSK财务 | `fmp_data income annual ADSK` | 可比 |
| CDNS财务 | `fmp_data income annual CDNS` | 可比 |

### WebSearch (P-0.5)

| 搜索 | 目标 |
|------|------|
| "PTC FY2025 earnings" | 最新财务数据 |
| "PTC IoT divestiture impact" | 剥离后Pro-forma |
| "PTC vs Siemens PLM market share" | 竞争格局 |
| "Codebeamer VW AI Copilot" | ALM增长驱动 |
| "CAD PLM market size 2025-2030" | TAM/增速 |
| "PTC NRR net retention" | NRR数据(可能不公开) |
| "PTC Creo generative design AI" | AI产品进展 |
| "manufacturing capex cycle 2026" | 制造业周期 |

---

## 九、风险与注意事项

1. **PTC不按产品线披露收入** → 需要从10-K的有限信息+行业报告间接拆解→DM标注为R级(推断)
2. **IoT剥离刚完成(2026.3.16)** → Pro-forma财务数据可能尚未公布→需要自行计算
3. **NRR不公开(与CRM相同)** → v19.6强制间接推断→但可信度有限→标注CQ
4. **行业系数1.1** → 275K门控(250K×1.1)
5. **PW预估4-5** → 混合模式(传统估值+可能性附录)→不需要发现系统

---

*PTC分析计划 v1.0 | 2026-03-19 | 待tier3_launch.sh启动*
