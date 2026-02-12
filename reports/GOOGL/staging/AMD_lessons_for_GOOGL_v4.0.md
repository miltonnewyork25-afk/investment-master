# AMD报告复盘 → GOOGL v4.0重新规划

> 分析日期: 2026-02-12
> 参考: AMD Complete v2.0 (349K, 13/13 CG, 45.1/万密度)
> 目标: 提炼AMD做对了什么, GOOGL v4.0如何借鉴和超越

---

## 一、AMD报告做对了什么 (10项核心优势)

### 1. CQ系统 = 报告的骨架

AMD的8个CQ贯穿全报告, 每个CQ在每个Phase都有进化:
- **P1建立** → **P2深化** → **P3交叉验证** → **P4对抗** → **P5闭环**
- 每个CQ的5要素闭环: 最终回答 / 置信度路径(5Phase表格) / KS关联 / 1年验证事件 / "如果我们错了"
- CQ5 EPYC份额是唯一从P1到P5都未下调的CQ(65%置信), 这种**差异化置信度本身就是核心信息**

**GOOGL启示**: GOOGL的CQ应围绕"搜索自蚕食"、"AI变现路径"、"CapEx回报"、"Cloud盈利可持续性"、"Agent生态控制权"等真正未解的核心问题。CQ不是装饰, 是组织全部分析的纲。

### 2. Reverse DCF = Phase 5核心产出

Ch07的Reverse DCF是AMD报告中最有决策价值的章节:
- **不说"值多少钱"**, 而说"$213假设什么"
- 五档价格反推($100/$150/$213/$250/$300), 每档隐含的CAGR+FCF margin清晰列出
- 三条路径(高利润率/中间/低利润率)让读者自己判断哪条最可能
- **三个承重墙**: 一旦任何一面墙倒塌, $213就站不住

**GOOGL启示**: GOOGL在$324(当前价)的Reverse DCF更有戏剧性 — 搜索收入零增长+Cloud高增长+AI变现的隐含假设拆解。"在$324, 你在赌Google Cloud变成$150B+业务"这种表述比"目标价$X"有价值100倍。

### 3. 认知偏差检测 (Ch17) = Phase 4的灵魂

Ch17系统性检测了6种偏差, 每种都有:
- **偏差识别** + **证据链** + **量化修正** + **修正方向**
- 锚定偏差: 发现SOTP、三情景概率都在向$213靠拢, 可能是潜意识调参
- 确认偏差: ROCm vLLM 93%被过度突出, Multi-GPU差距被弱化
- 叙事偏差: "Lisa Su伟大CEO→Zen成功→AI GPU必胜"流畅度本身是红旗
- **最关键**: 修正后概率加权从$222降至$186.7, 明确承认Phase 1-3高估15-20%

**GOOGL启示**: GOOGL的偏差更隐蔽 — "Google有最多数据→Gemini必将胜出"的叙事偏差, "Cloud利润率30%可持续"的近因偏差, "$175B CapEx必有回报"的沉没成本偏差。Phase 4需要同样诚实的自我解剖。

### 4. PPDA (概率-价格背离分析) = 独创框架

5个背离的量化分析:
- 背离1: AI GPU份额定价 (+2.2%, 弱)
- **背离2: AI CapEx持续性** (+51-63%, 强偏乐观) — 这是最重要的发现
- 背离3: EPYC份额 (+3.7%, 弱)
- 背离4: GAAP/Non-GAAP收敛 (+78-100%, 强但混合)
- 背离5: 内部人 vs 分析师共识 (方向性对立)

**GOOGL启示**: GOOGL的PPDA可以更丰富 — Polymarket有更多相关市场("AI替代搜索"、"Chrome分拆"等), 可以做更多直接概率比对。搜索份额定价、Cloud增速定价、CapEx回报定价、反垄断影响定价。

### 5. Kill Switch设计 = 精确到可执行

12个KS每个都有:
- **可量化阈值** (DC OpMargin<25%连续2Q, ASIC>40%, DIO>200天)
- **当前距离** (33%距25%=8pp, 25%距40%=15pp)
- **论文含义** (不是"股价可能下跌", 而是"投资论文从X降级为Y")
- **数据源+紧迫性**

**GOOGL启示**: GOOGL的KS应包括: 搜索收入连续2Q负增长、AI Overviews覆盖率>40%且CPC补偿失效、Cloud利润率回落<20%连续2Q、CapEx/Revenue>40%连续2Y且FCF转负、Chrome分拆判决生效、Gemini用户增长停滞。

### 6. 五引擎协同分析 = 多视角交叉

周期/股权结构/聪明钱/信号监控/预测市场 — 5个独立视角的信号汇总:
- **股权结构引擎**中Fisher $23.4B清仓+Lisa Su零买入的发现极有价值
- **周期引擎**中6层雷达(WFE/DRAM/DIO/CoWoS/Gaming/存储CapEx)提供了系统性周期定位

**GOOGL启示**: GOOGL的五引擎中, 预测市场引擎可能更强(更多直接相关市场), 股权结构引擎也有素材(Alphabet内部人交易模式、机构持仓变动), 但需要调适 — GOOGL是mega-cap, 机构集中度不同于AMD。

### 7. 供应链交叉验证 = 复利飞轮

Ch02大量引用TSM/MU/LRCX已有报告的数据:
- TSMC CoWoS分配比例 → AMD产能天花板
- TSMC客户优先级排序 → AMD战略位置
- MU HBM3E供应 → AMD的存储依赖

**GOOGL启示**: GOOGL可以交叉引用TSLA(自动驾驶竞争)、META(AI竞争+广告市场)、MSFT(Cloud竞争+Enterprise AI)的已有报告数据。

### 8. 结构均匀 + Ch线性编号

5 Part × 24 Ch, 每Part 56-80K字符, 最大Part(III竞争)80K vs 最小Part(V综合)57K, 比值1.4x。
- 对比TSLA v3.0的Phase 3占58%的极端失衡
- Ch01-Ch24线性编号, 无嵌套, 引用方便

**GOOGL启示**: 维持5-6 Part × 20-24 Ch结构, 控制每Part在15-25%范围内。

### 9. "好公司但可能不是好价格" = 一句话精华

AMD的一句话结论封装了整篇报告的核心矛盾:
- 公司本身: 财务强/增长强/管理层强 → "好公司"
- 但价格: 4.4x方法离散/+22-31%溢价/三承重墙零容错 → "不是好价格"

**GOOGL启示**: GOOGL的核心矛盾可能是: "AI时代最有资源的公司, 但也是被AI颠覆风险最大的公司" 或 "搜索帝国的城墙还在, 但地基正被自己的挖掘机松动"。

### 10. 方法离散度 = 不确定性的量化

AMD的4.42x方法离散度($68-$300)不是缺陷, 而是**最诚实的信号**:
- 明确说"市场对AMD的未来叙事存在根本性分歧"
- 比给一个点估计要有决策价值得多

**GOOGL启示**: GOOGL的方法离散度可能更小(可能性宽度6 vs AMD的5), 但CapEx回报不确定性可能拉大离散。

---

## 二、AMD报告可以改进的地方 (GOOGL v4.0应规避)

### 1. Agent小结残留
个别章节末尾有"Agent A小结"等标记, 暴露了多Agent组装痕迹。v4.0应在组装时完全清除。

### 2. 重复数据引用
同一数据点(如DIO 152/165天, DC $5.4B)在多章重复出现。v4.0应建立"数据首次引用→后续用简称+章节回引"的规则。

### 3. 缺少"入口地图"式可视化
AMD的产品分析是分部经济学(收入+利润率), 缺少"用户如何接触AMD产品"的入口视角。GOOGL天然需要入口地图(Search/Chrome/Gemini/YouTube/Workspace/Cloud), 这是可以大幅超越AMD的维度。

### 4. Mermaid过少(49张)
AMD的49张Mermaid远低于TSLA(160)和LRCX(124)。GOOGL v4.0目标≥130张, 需要在Agent Stack对照图、入口地图、竞争格局矩阵、发现系统未来状态图等处大量使用。

---

## 三、GOOGL v4.0重新规划 — 基于AMD教训

### 核心变化 vs 原计划

| 维度 | 原计划 | 修订后 |
|------|--------|--------|
| **CQ优先** | Ch结构先行, CQ后补 | CQ第一, 所有Ch围绕CQ展开 |
| **Phase 4比重** | ~15%(70K) | ~18%(80K+) — 学AMD的认知偏差深度 |
| **PPDA** | 未明确规划 | 独立Ch, GOOGL有更多Polymarket直接数据 |
| **五引擎** | 未明确规划 | 独立Ch, 重点利用GOOGL的丰富预测市场数据 |
| **入口地图** | 列为Ch05 | 提升为Part II核心, 需≥30K字符+≥10张Mermaid |
| **Agent Stack** | Ch10单章 | 扩展为Part III核心, 需六层对照+商业模式差异 |
| **Reverse DCF** | 在Ch16内 | 提升为独立Ch, 学AMD Ch07的深度 |
| **数据重复控制** | 未规划 | 建立"首次引用+回引"规则 |
| **Agent组装痕迹** | 未规划 | 组装时grep清除所有Agent标记 |

### CQ设计 (8-10个, 贯穿全报告)

| CQ# | 核心问题 | 对应AMD类比 |
|-----|---------|------------|
| CQ1 | AI Overviews会蚕食多少搜索广告收入? CPC补偿能持续多久? | AMD CQ1(DC营收持续性) |
| CQ2 | $324的Forward P/E ~23x合理吗? 市场隐含了什么增长假设? | AMD CQ2(91x P/E) |
| CQ3 | $175B CapEx能产生合理回报吗? FCF什么时候恢复? | AMD CQ7(利润率扩张) |
| CQ4 | Cloud能否从$65B增长到$150B+? 利润率能维持30%+吗? | AMD CQ5(EPYC份额) — 最确定增长引擎 |
| CQ5 | Gemini能否在AI入口争夺战中赢得足够份额? | AMD CQ3(ROCm生态) — 追赶者困境 |
| CQ6 | Chrome分拆判决对业务的实际影响有多大? | AMD CQ4(ASIC侵蚀TAM) |
| CQ7 | Agent时代, Google的搜索+广告模式是被强化还是被颠覆? | 无直接类比 — GOOGL特有 |
| CQ8 | 在$324价格, Reverse DCF隐含什么增长路径? 哪个承重墙最脆弱? | AMD CQ8(Reverse DCF) |

### 修订后的Chapter架构 — 6 Part × 22 Chapter

```
Part I: 今天的Alphabet (数据基础) — ~15% (~65K)
  Ch01: 公司重新画像 — AI时代的Alphabet是什么 (~15K)
  Ch02: FY2025财务全景 + 八季度趋势 (~25K)
  Ch03: $175B CapEx漏斗 — 投入/产出/折旧/回报 (~15K)
  Ch04: 注意力雷达 + CQ路由矩阵 (~10K)  [学AMD Ch04]

Part II: 产品×入口×AI生态 (用户核心需求) — ~25% (~110K)
  Ch05: 入口地图 — Search/Chrome/Gemini/YouTube/Workspace/Cloud (~25K)
  Ch06: Gemini全布局 vs ChatGPT — 嵌入式vs独立App战略 (~20K)
  Ch07: 新产品爆发信号 — NotebookLM/Flow/Veo/AI Studio (~15K)
  Ch08: 老业务×新AI交叉重构 — YouTube/Cloud/Workspace/Search (~25K)
  Ch09: 搜索护城河强化与侵蚀 — 双螺旋模型 (~25K)

Part III: Agent时代竞争格局 — ~20% (~85K)
  Ch10: Agent Stack六层对照 — Google vs OpenAI vs Anthropic (~25K)
  Ch11: Agent改变什么 — 受益/衰退/消失的形态 (~20K)
  Ch12: 多维竞争深度 — Meta/MSFT/Amazon/Apple (~20K)
  Ch13: 护城河×AI×数据飞轮新理论 (~20K)

Part IV: 估值与可能性空间 — ~15% (~65K)
  Ch14: Reverse DCF — $324隐含了什么 (~15K)  [学AMD Ch07]
  Ch15: 发现系统 — 能力基元→未来状态映射 (~15K)
  Ch16: 开放问题清单 + 证据追踪 + 不可知清单 (~10K)
  Ch17: PPDA概率-价格背离分析 (~12K)  [学AMD Ch13]
  Ch18: 五引擎协同分析 (~13K)  [学AMD Ch12]

Part V: 对抗审查 (≥18%) — ~80K
  Ch19: 看空论证 — 钢人论证 (~25K)
  Ch20: 认知偏差检测 + 极端压力测试 (~30K)  [学AMD Ch17深度]
  Ch21: 数据交叉验证 + 纠错回流 (~25K)

Part VI: 综合产出 — ~10% (~45K)
  Ch22: KS注册表 + TS清单 + 关键事件日历 (~25K)  [学AMD Ch21-23]
  Ch23: CQ闭环 + CI注册表 + 框架注册表 (~20K)  [学AMD Ch24]
```

### 关键数据来源优先级

| 数据 | 来源 | 优先级 |
|------|------|--------|
| GOOGL FY2025财务 | FMP/baggers MCP工具 | P0 |
| AI竞争格局最新 | WebSearch (7-10条高质量搜索) | P0 |
| SEC filings 10-K | baggers_sec_filings | P0 |
| Polymarket事件 | polymarket_events | P0 |
| 搜索份额/CTR数据 | WebSearch | P1 |
| Cloud市场份额数据 | WebSearch Gartner/Synergy | P1 |
| Gemini用户数据 | WebSearch | P1 |
| Agent生态发展 | WebSearch | P1 |
| META/MSFT交叉验证 | 已有报告数据 | P2 |

### Session执行计划 (修订)

**Session 0 (当前)**:
- 数据刷新3Agent (财务/AI前沿/Polymarket+SEC)
- 产出: `data/research/GOOGL/` 更新

**Session 1**: Part I(Ch01-04) + Part II前半(Ch05-07)
- Agent A: Ch01+Ch02 (公司画像+财务) ~40K
- Agent B: Ch05+Ch06 (入口地图+Gemini) ~45K  [最强Agent]
- Agent C: Ch03+Ch04+Ch07 (CapEx+注意力+新产品) ~40K

**Session 2**: Part II后半(Ch08-09) + Part III(Ch10-13) + Part IV(Ch14-18)
- Agent A: Ch08+Ch09 (老业务×AI+搜索护城河) ~50K
- Agent B: Ch10+Ch11+Ch12+Ch13 (Agent竞争全景) ~85K  [大Agent, 或拆2个]
- Agent C: Ch14+Ch15+Ch16+Ch17+Ch18 (估值+发现+PPDA+五引擎) ~65K

**Session 3**: Part V(Ch19-21) + Part VI(Ch22-23) + 组装
- Agent A: Ch19+Ch20 (看空+偏差检测) ~55K
- Agent B: Ch21+Ch22+Ch23 (验证+KS+CQ闭环) ~45K
- Agent C: 组装+质量门控+Commit

---

## 四、GOOGL v4.0与AMD v2.0的预期对比

| 指标 | AMD v2.0 | GOOGL v4.0目标 |
|------|---------|---------------|
| 总字符 | 349K | 430-480K (GOOGL复杂度更高) |
| 标注密度 | 45.1/万 | ≥42/万 (AI产品数据密度天然低于半导体) |
| 硬数据占比 | 48% | ≥50% |
| Mermaid | 49 | ≥120 (大幅超越, 入口地图+Agent Stack需要) |
| CQ | 8 | 8 |
| KS | 14→12 | 14-16 |
| TS | 8 | 8-10 |
| CI | 5 | ≥6 |
| 方法离散度 | 4.42x | 预估3-5x (可能性宽度6,混合模式) |
| 仓位建议 | 0 | 0 |
| 数字评分 | 0 | 0 |
| 目标价 | 0 | 0 |
| 发布合规违规 | 0 | 0 |

---

## 五、从AMD直接可移植到GOOGL的分析模块

1. **Reverse DCF五档价格反推** → 直接套用, 换参数
2. **PPDA概率-价格背离** → 套用框架, GOOGL有更多Polymarket数据
3. **五引擎协同** → 套用框架, GOOGL的机构数据更丰富
4. **认知偏差6检测** → 套用检测清单, 内容GOOGL特异
5. **KS设计5要素** → 阈值/距离/论文含义/CQ关联/数据源
6. **CQ 5要素闭环** → 最终回答/置信路径/KS关联/验证事件/if-wrong
7. **十维度定性评估** → 框架不变, 维度内容GOOGL特异
8. **供应链交叉验证** → 变为"生态系统交叉验证" (META/MSFT/AMZN报告)
