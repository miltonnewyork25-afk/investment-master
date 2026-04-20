# Handoff Note — FTAI Phase 0 → Phase 0.5

> **状态**: Phase 0 数据收集基本完成(85%完整度), 准备进入Phase 0.5核心矛盾结晶
> **日期**: 2026-04-20
> **恢复指令**: 读取本文件 + `data/FTAI/checkpoint.yaml` + 三个staging文件

---

## 1. [SESSION] 主要请求与意图

**用户原始请求**: "继续phase 0 收集" (FTAI Aviation Ltd. Tier 3深度分析)

**本会话任务**: 完成Phase 0第二轮数据补充, 填补识别的关键数据缺口

**长期目标**:
- 质量目标: 4.5分 (对标KLAC标杆)
- 输出目标: >150KB Complete报告
- 分析对象: FTAI Aviation - 航空租赁+航空产品双业务模式

⚠️ 压缩后必须保留: 这是恢复context的第一入口

---

## 2. [SESSION] 核心矛盾 + Thesis + 变量

### 核心矛盾(初步识别, Phase 0.5待结晶)

1. **负FCF vs 高ROIC悖论**: -$1.06B FCF (2025) vs 16% ROIC — 增长投资vs现金回报的根本张力
2. **56x PE vs 同行5x PE争议**: 估值premium依赖$915M 2026 FCF转正的execution
3. **CFM56时间窗口 vs 永续增长假设**: 2030年退役压力 vs 25% market share永续目标
4. **管理层指引vs执行**: 连续季度miss (Q4 2024/2025) 但年度目标持续上调

### 当前工作假设(待Phase 0.5验证)

**市场默认(旧地图)**:
- FTAI = 航空租赁成长股
- 关键变量: 收入增长率、EBITDA扩张
- 估值方法: EV/EBITDA倍数 (vs同行)

**可能的新地图**(Phase 0.5 compression_test):
- FTAI = "CFM56 module manufacturing specialist + aircraft leasing hybrid"
- 关键变量: 单模块经济学、CFM56 retirement curve、库存周转效率
- 估值方法: SOTP (Aerospace Products vs Aviation Leasing分开估值)

### Kill Switch条件(初步)

**红灯**:
- Q1 2026 module交付<250个 (vs 1,050年度目标)
- FCF仍负且<-$500M (2026H1)
- CFM56退役曲线加速超预期 (EU ETS压力)

**黄灯**:
- 管理层2026年FCF目标$915M下修
- 债务成本>7% (当前6.5%)
- 单模块ASP下降>10%

⚠️ 压缩后必须保留: 跨Phase推理链的锚点

---

## 3. [REFRESH] 文件清单 + 关键数据

### staging文件(必须重新Read)

1. **`staging/FTAI_P0_data_collection.md`** — Phase 0基础数据收集
   - 4年财务分析、业务模式拆解
   - Aviation Leasing vs Aerospace Products分部门
   
2. **`staging/FTAI_P0_deep_questions.md`** — 14个核心问题深度数据
   - T1-T4四层框架(决定多空/仓位/时机/不确定性)
   - CFM56退役曲线、分部门利润引擎
   
3. **`staging/FTAI_P0_continued_data_collection.md`** — 第一轮补充
   - 债务结构$3.45B、FCF机制分解
   - 内部人交易模式、客户集中度、库存分析
   
4. **`staging/FTAI_P0_continued_data_collection_supplement.md`** — 第二轮补充(本次会话)
   - CapEx详细拆分: 维护$133M vs 替换$320M
   - 债务到期: 2028年5月首个重大到期
   - FTAI Power新业务线发现
   - 管理层指引track record

### 关键硬数据(压缩前记录)

**财务数据(2025)**:
- 总收入: $2,507M (+32.7% YoY)
- 净利润: $501M
- EBITDA: 分部门Aerospace Products $671M(36% margin) + Aviation Leasing $609M
- FCF: -$1,063M (-$311M OCF - $752M CapEx)
- 净债务: $3,148M
- ROIC: 16% (从6.7% 2022改善)
- DIO: 252天 (从120天 2022恶化+132天)
- 库存: $1,194M
- D/E: 1046%

**估值指标(2026-04-17)**:
- 股价: $259.13
- PE: 56.21x
- Forward PE: 21.11x
- 52W: $85.23-$323.51
- Beta: 1.649
- Market Cap: (需查询)

**业务关键数字**:
- CFM56引擎fleet: 1,000+
- 库存总值: ~$2B aviation equipment
- 2025模块产量: Q4 228个(FY~700+)
- 2026目标: 1,050个模块(+39%)
- Target market share: 25% in $25B CFM56 aftermarket TAM
- AAR独家协议延至2030年

**债务详情**:
- Outstanding: $3.4B
- 加权平均成本: 6.5%
- Senior notes: $3.5B
- 首个重大到期: 2028年5月
- SCI融资承诺: $2.5B asset-level debt

**CapEx拆分(2025)**:
- 总: $450M (或$752M, 口径待确认)
- 维护: $133M
- 替换: $320M
- 2026-2028指引: $100-130M annually

**指引track record**:
- Q4 2024 EPS: $0.84 vs $0.88预期 (Miss 4.5%)
- Q4 2024 Revenue: $498.8M vs $509.5M (Miss 2.1%)
- Q4 2025 EPS: $1.08 vs $1.25 (Miss 13.6%)
- Q4 2025 Revenue: $662M vs $702M (Miss 5.7%)
- 2025 EBITDA指引: $1.1-1.15B
- 2026 EBITDA指引: $1.4B (从$1.25B上调)
- 2026 FCF目标: $915M (从-$1B+转正)

⚠️ 这些文件在下个session必须重新Read, NEVER使用旧context中的版本

---

## 4. [SESSION] 已解决的问题 + 被否决方案

### 已解决

1. **CapEx拆分缺口** → WebSearch确认维护vs替换3:7比例
2. **债务到期不明** → 确认2028年5月首个重大到期, 2026-27无压力
3. **指引命中率** → 确认连续季度miss但年度上调模式
4. **业务线扩展** → 发现FTAI Power (CFM56→AI电力应用) 新业务线

### 被否决的思路 (为什么不这样做)

**❌ 不过早给评级结论** — 数据仅85%完整, 单位经济学critical缺失, 过早评级=违反L1投资原则#4"真实数据>编造数字"

**❌ 不套用通用租赁股框架** — FTAI是"租赁+制造"混合模式, 用pure leasing比较(如WLFC 60%折价)会误导。需要SOTP分部门估值

**❌ 不在Phase 0深挖核心矛盾机制** — 机制分析属于Phase 1的4层深挖循环(数据→机制→含义→证伪), Phase 0的任务是穷尽数据收集

⚠️ 高丢失风险: 压缩模板侧重"做了什么", "为什么不做X"最容易被压没

---

## 5. [SESSION] 用户反馈记录

### 本会话用户指令
- "继续phase 0 收集" — 延续Phase 0数据收集, 不跳级到Phase 1
- "保存上下文, 方便我清理" — 需要持久化所有关键信息后/clear

### 隐含偏好(从CLAUDE.md和历史推断)
- 用户中国发布 → 台海中性表述
- 扬长避短 — 承认能力边界, 回避预测短板
- 数据驱动 — 禁止编造数字, MCP工具>WebSearch>禁编造
- 深度>广度 — 少写3个低解释力角度, 不浅写1个高解释力角度

⚠️ 高丢失风险: 早期偏好多次压缩后消失

---

## 6. [SESSION] 待办任务

### Phase 0.5 必做(核心矛盾结晶)

1. **产出`staging/FTAI_default_map_audit.md`** (铁律S-1要求, ≥800字符)
   - 市场default definition
   - Market default variables (GMV? Revenue? EBITDA?)
   - Market default valuation language
   - ≥2个failure_points (旧地图解释不通的事实)

2. **产出`staging/FTAI_thesis_crystallization.md`** (≥1500字符)
   - 3-5个核心争议点识别
   - 非共识假说登记
   - P0范畴预测试(≥3候选范畴)

3. **P0候选范畴至少3个**:
   - 候选A: "航空租赁成长股" (市场默认)
   - 候选B: "CFM56 module manufacturing specialist"
   - 候选C: "Leasing + Products SOTP hybrid"
   - 每个候选写出: 估值方法+关键变量+隐含假设

### 未解决的critical问题(需Phase 1深挖)

1. **单模块精确经济学** (most critical) — 需10-K notes或投资者日详细披露
2. **Q1-Q3 2025指引vs实际** (完整8季度记录)
3. **库存减值policy + aging分层** (DIO 252天背后的构成)
4. **竞争格局quantitative**: 其他CFM56 aftermarket players市占率
5. **2028年5月到期具体金额**

---

## 7. [REFRESH] 当前精确状态

### checkpoint.yaml最新状态
- current_phase: "Phase 0 - 数据收集85%完成，准备进入Phase 0.5"
- date_updated: "2026-04-20"
- data_completeness: 85%
- character_count_progress: ~85KB (四个staging文件)
- target_remaining: 65KB+

### git状态 (本会话最后commit)
- `83e915d5` feat: 完成FTAI Phase 0第二轮数据收集补充
- `912496d3` wip(FTAI): context-save — 3文件, 18171字符

### 下一步起点
**Phase 0.5 第一个动作**: 
```bash
# 1. Read所有staging文件和checkpoint恢复上下文
# 2. 启动Phase 0.5核心矛盾结晶 (产出default_map_audit + thesis_crystallization)
# 3. 使用P0范畴预测试列出≥3个候选范畴
```

---

## 8. [SESSION] 下一步唯一优先

**最高优先**: Phase 0.5核心矛盾结晶 — 产出`default_map_audit.md`和`thesis_crystallization.md`

**下个会话第一个动作**: 
1. `cat data/FTAI/checkpoint.yaml` — 确认进度
2. Read本handoff文件 — 恢复thesis和Kill Switch
3. Read四个P0 staging文件 — 恢复数据基础
4. 开始Phase 0.5 — 聚焦"市场把FTAI当什么? 旧框架解释不通哪几件事?"

**不要重复的事**:
- ❌ 不要重新收集已有数据(CapEx/债务/指引track record已有)
- ❌ 不要在Phase 0.5继续Phase 0的数据收集(转进Phase 0.5核心矛盾)
- ❌ 不要套用纯租赁股框架比较WLFC (FTAI是hybrid模式)

**下一阶段工作clock**:
- Phase 0.5: 核心矛盾结晶 (1-2 session)
- Phase 1: 四层循环深挖3个关键发现 (2-3 session)
- Phase 2-3: 财务归因+竞争格局 (2-3 session)
- Phase 4-4.5: 红队+圆桌+compression_test (1-2 session)
- Phase 5: 单会话组装 (1 session, 可能需要250K+分会话)

---

## 9. [REFRESH] 数据来源清单 (压缩后需重新查询时用)

### MCP工具 (primary)
- `mcp__investment-master__analyze_stock` symbol=FTAI
- `mcp__investment-master__fmp_data` (FMP financial statements)

### WebSearch已验证URL
- [FTAI Q4 2025 Results](https://ir.ftaiaviation.com/news-releases/news-release-details/ftai-aviation-ltd-reports-fourth-quarter-and-full-year-2025)
- [Strategic Capital Initiative $2.5B](https://ir.ftaiaviation.com/news-releases/news-release-details/ftais-strategic-capital-initiative-secures-commitment-25-billion)
- [AAR-FTAI Extension 2030](https://www.aarcorp.com/en/newsroom/press-releases/2025/aar-and-ftai-aviation-extend-their-exclusive-serviceable-engine-products-agreement-providing-cfm56-engine-material-to-the-global-aviation-aftermarket-through-2030/)
- [FTAI Power Launch](https://ir.ftaiaviation.com/news-releases/news-release-details/ftai-aviation-announces-launch-ftai-power-ftai-adapts-worlds)
- [FTAI 2024 10-K](https://www.bsx.com/CompanyDocuments/1099940872/FTAI%20Aviation%20-%202024%2010K.pdf)
- [FTAI 2023 10-K](https://www.sec.gov/Archives/edgar/data/1590364/000159036424000006/ftaiaviation12312023arsfil.pdf)

### 需下次收集的来源
- SEC 10-K notes (库存政策、合同条款)
- 2022投资者日transcripts (原始承诺)
- FTAI Q3 2025 10-Q (模块交付明细)
- Polymarket (航空/CFM56相关事件概率)

---

**End of Handoff Note** — 安全/clear, 下次以"继续FTAI, 读取handoff恢复"开始
