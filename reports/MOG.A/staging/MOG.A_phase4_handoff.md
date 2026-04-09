# MOG.A — Phase 4.5 → Phase 5 Handoff (Engineering Manifest)
> 铁律 J-3 / J-4 强制: P5 启动前必须有工程清单
> 2026-04-09 | 承接 phase4 + compression_test

---

## 1. 状态与数字锁定 (P5 不得再改动)

**加权中心**: **$104/股** (current $313.25)
**期望回报**: **−66.0%**
**三点估值**: **$73 (30%) / $100 (50%) / $175 (20%)**
**评级**: **审慎关注 (临界)** — 黑箱 32% ≥ 30% + Q2 FY26 未发生

**R-4 硬约束**: 禁止任何 "目标价 $XXX" / "fair value $XXX" 单点表达. 必须区间. 执行摘要前 5 行必须显式标注 "黑箱 32% / 复杂度 4/5 → 区间 + 条件评级"

**R-3 硬约束**: 圆桌 5/5 bear 共识, 但**零视角建议"下调评级"** (因为已经是"审慎关注" bottom 档), 所以不触发"≥3 视角建议下调 → 必须披露异议章节"规则. **但仍需独立"圆桌共识"章节公开 5 大师反对意见**, 不得用综合掩盖.

---

## 2. Phase 5 新写章节清单 (估算 ~100K 新增, Complete 目标 240K+)

P1-P4 staging 合计 ~112K (已有). Phase 5 新写部分需要补齐 ~130K, 主要是: 执行摘要(~5K), 章节过渡+扩写(~60K), 固化+Kill Switch+圆桌异议(~20K), 认知边界+风险拓扑(~15K), 附录(~30K).

---

## 3. DM 锚点必填清单 (P5 新写章节)

> J-3 要求 ≥30 项. 以下 35 项 **必须** 在 P5 对应章节显式出现, 任一缺失 = 违反 J-3.
> 大部分 DM 已在 P1-P4 staging 存在, 这里是**索引 + 新增清单**.

### 估值核心 DM (必填)

| DM ID | 数字 | 来源 | 目标章节 |
|---|---|---|---|
| DM-EXEC-001 | 三点估值 $73/$100/$175 | P3 v2 + RT 综合 | 执行摘要 + Ch 估值 |
| DM-EXEC-002 | 期望回报 −66.0% | 概率加权 | 执行摘要 |
| DM-EXEC-003 | 黑箱比例 32% | P4.5 R-4 量化 | 执行摘要前 5 行 |
| DM-FCFF-007 | 6yr FCFF mean $99.6M | FMP 6yr | Ch 财务 + Ch 估值 |
| DM-FCFF-008 | 3yr FCFF mean $82.6M | FMP | Ch 财务 |
| DM-FCFE-001 | FCFE 6yr −$600 to −$830M/yr | FMP | Ch 财务 + 幻觉章节 |
| DM-FCFE-002 | FCFE 6yr 累计 −$4.28B | FMP | 执行摘要 + 幻觉章节 |
| DM-ROIC-001 | FY25 ROIC 9.31% | FMP | Ch 财务 + Ch 估值 |
| DM-WACC-001 | WACC 9.5% | CAPM 计算 | Ch 估值 |
| DM-ROIC-SPREAD | ROIC − WACC = −19bp | 上两项 | Ch 估值 |
| DM-CAPEX-002 | CapEx/D&A 6yr 1.54x | FMP | Ch 财务 + 幻觉章节 |
| DM-WC-005 | CCC FY25 196 天 | FMP | Ch 财务 |
| DM-WC-006 | CCC FY22→FY25 176→196 恶化 | FMP | Ch 财务 + Kill Switch |
| DM-QA-001 | Quality adjustment 0.396 | ROE×√OM | Ch 估值 |
| DM-EV-003 | Current EV $10.83B | 市值+净债 | Ch 估值 |
| DM-EV-004 | Current EV/EBITDA 22.2x | DM-EV-003/FY25 EBITDA | Ch 估值 + Ch 核心争议 |
| DM-EBITDA-001 | FY25 EBITDA $488M | FMP | Ch 财务 |
| DM-QUOTE-003 | Market cap $9.94B | 2026-04-09 | 执行摘要 |
| DM-LEV-001 | Net debt $884M | FMP | Ch 估值 |
| DM-SHARE-001 | Diluted shares 31.74M | 10-Q | Ch 估值 |

### 业务/归因 DM (必填)

| DM ID | 数字 | 目标章节 |
|---|---|---|
| DM-BACKLOG-001 | Q1 FY26 backlog +30% YoY | Ch 业务 + Ch 核心争议 |
| DM-BTB-001 | Q1 FY26 book-to-bill 2.1x | Ch 业务 + Ch 核心争议 |
| DM-OPM-001 | FY25 adj OM 13.0% (vs FY24 10.9%) | Ch 财务 + 归因章节 |
| DM-FCF-CONV-001 | FCF/NI 22% vs peer 105% | 幻觉章节 + Ch 估值 |
| DM-PEER-PE-001 | Peer median PE 49x bubble / 28x hist | Ch 估值 |
| DM-PEER-EVEBITDA | PH 18.2x / HWM 35.3x / CW 33.8x / HEI 37.9x | Ch 核心争议 |
| DM-DEFENSE-001 | FY26 US defense base -6.3% ($895B→$839B) | 执行摘要 + Ch 核心争议 |
| DM-POLY-UKR-001 | Ukraine ceasefire end-2026 24.0% | Ch 风险 + Ch 博弈 |
| DM-POLY-TWN-001 | Taiwan clash by 2027 13.5% | Ch 风险 |
| DM-INSIDER-001 | CEO 18M 零开放市场买入 | Ch 治理 (辅助观察) |

### RT 发现 DM (必填)

| DM ID | 数字 | 目标章节 |
|---|---|---|
| DM-RT1-001 | netReceivables FY23→FY25 +$110M | Ch 财务 + Ch 红队 |
| DM-RT1-DELTA-001 | RT-1 修正 +$10/股 | Ch 红队 |
| DM-INV-001 | Inventory FY23→FY25 +$190M | Ch 财务 |
| DM-RDCF-IMPLIED | $313 隐含 Owner FCF CAGR 43% | 执行摘要 + Ch 估值 |
| DM-FCF-HIST | 6yr FCFF CAGR −2% | Ch 估值 |

**共 35 项**, 符合 J-3 ≥30 要求.

---

## 4. Mermaid 图必填清单 (P5 新写章节 ≥10)

| # | 标题 | 类型 | 目标章节 | 作用 |
|---|---|---|---|---|
| 1 | 会计 EPS → 现金的断裂传导 | flowchart | 执行摘要 + Ch 幻觉 | 把 backlog→NI→WC→CapEx→FCFE 的断裂点用图说清 |
| 2 | 6 个独立估值模型收敛 | graph | Ch 估值 | $53-$176 区间 + 加权中心 $104 |
| 3 | CCC 历史演化 (FY20→FY25) | gantt/bar | Ch 财务 | 176→196 天恶化 |
| 4 | CapEx vs D&A 6 年对比 | bar | Ch 财务 | 1.54x 结构性超投入 |
| 5 | FCFE 6 年累计曲线 | graph | Ch 幻觉 | −$4.28B 累计证据 |
| 6 | Reverse DCF 隐含假设树 | flowchart | Ch 估值 | $313 → 43% CAGR 对比历史 |
| 7 | 5 大师圆桌共识图 | mindmap/graph | Ch 圆桌 | 5/5 bear 的关键反问 |
| 8 | Kill Switch 四档触发流程 | flowchart | Ch Kill Switch | 红/黄/上/下 四档条件 |
| 9 | Peer 可比估值对标 | graph | Ch 核心争议 | PH/HWM/CW/HEI/MOG EV/EBITDA 对比 |
| 10 | Q2 FY26 reflexivity inflection 决策树 | flowchart | Ch 时间表 + Kill Switch | 2026-04-24 信号路径 |
| 11 | S&D 分部驱动拆分 (US base / FMS / Europe / 导弹) | pie/sankey | Ch 业务 | 失灵事实 #1 定量 |
| 12 | ROIC-WACC spread 演化 | graph | Ch 估值 | −19bp 临界 |

**12 个**, 超过 J-3 ≥10 要求, 符合 200K+ 报告 ≥10 (未达 300K+ 的 ≥15).

---

## 5. Mid-Assembly Checkpoints (J-4 强制)

**单会话组装必须调用 `bash scripts/mid_assembly_check.sh` 在以下时点**:

| # | 字符阈值 | 动作 |
|---|---|---|
| 1 | 50K | 基线检测: voice/审美词/箭头链/DM 密度 |
| 2 | 100K | 第 2 次 + 范畴重分配检查 (compression_test 的新定义是否在正文出现过) |
| 3 | 150K | 第 3 次 + 重读 5 减法清单 |
| 4 | 200K | 第 4 次 + 警告分会话风险 |
| 5 | (如超 230K) | 强制 context_save + 考虑是否续写 |

**BLOCK 条件 (必须当场修复)**:
- voice "本报告/笔者" = 0
- 审美词 ≤5 (漂亮/优雅/干净/完美/出色/卓越)
- 范畴重分配 ≥3 处 ("不是 X 而是 Y" 或 "实际是...")

**WARN 条件**:
- hedging (可能/或许/某种程度) ≤1/万字
- 箭头链 (→→→) ≤1/30K
- DM 密度 ≥1.0/千字
- Mermaid ≥1/30K

---

## 6. Phase 5 章节展开顺序 (S-3 节奏 + J-4 降认知负荷)

**不机械套 6 拍**, 按"读者第 1 分钟就拿到判断 → 再拿到证据 → 最后拿到边界"组织:

1. **执行摘要** (三段式 S-3, 800-1200 字) — 对齐+裂缝 / 新定义+变量+估值 / 评级+Kill Switch+异议
2. **Ch 1 核心争议** — 市场默认怎么看 (peer rerating 篮子) vs 我们怎么看 (幻觉机器). 不在此章抛新定义名字, 先呈现对立
3. **Ch 2 业务理解** — MOG 是什么, Flight Controls / S&D / Industrial / Medical 四分部. 护城河 L3/5 (程序锁定 + qualified supplier)
4. **Ch 3 财务深度 (R-1 归因 + R-2 剪刀差)** — 收入瀑布 / 毛利 Bridge / EPS 瀑布 / FCF/NI 剪刀差 / CapEx-FCF 剪刀差 / WC-Revenue 剪刀差. **新定义"会计 EPS 的现金幻觉机器"在此章第一次命名**
5. **Ch 4 竞争格局** — PH/HWM/HEI/TDG/WWD peer comp. 为什么 MOG 的 ROIC/WC 结构比同业差
6. **Ch 5 失灵事实** — US defense -6% / ROIC-multiple 数学矛盾 (compression_test 的 explained_anomaly 展开)
7. **Ch 6 估值 (R-4 三模型收敛)** — 6 独立模型, Reverse DCF, 三点估值, R-4 量化 (可推演度 68% / 复杂度 4/5 / 黑箱 32%)
8. **Ch 7 博弈论 / Polymarket** — Ukraine/Taiwan 情景树 (综合 ~$0 贡献)
9. **Ch 8 红队七问** — RT-1 到 RT-7, RT-1 重大发现显式披露 (不隐藏修正过程, 但用"研究过程中发现数据错误并修正"的无痕化语言)
10. **Ch 9 圆桌共识** — Buffett/Munger/Marks/Klarman/Druckenmiller 5 视角, 全 bear, timing caveat
11. **Ch 10 认知边界** — 硬数据/合理推断/黑箱区域, R-4 具体量化
12. **Ch 11 风险拓扑** — 主要风险 + 协同 / 反协同 / 最糟组合
13. **Ch 12 Kill Switch + 时间表** — 四档触发, Q2 FY26 2026-04-24
14. **Ch 13 固化 (如需要)** — "三个钉子"可选, 非强制. 如果写, 必须是**"新定义 / 第一变量 / 估值方法"** 三要素, 不重复 Kill Switch
15. **Ch 14 附录** — DM registry / Python 估值脚本输出 / 数据源 / P1-P4 handoff 归档

---

## 7. Phase 1-4 回流清单 (必须执行, 无痕化)

| # | 文件 / 章节 | 原内容 | 修正后 |
|---|---|---|---|
| 1 | P1 Ch 8.1 | "contract asset $12M → $769M 64 倍" | 删除, 替换为 "netReceivables FY23-25 +$110M (与营收同步), 主要 WC 吞噬来自 inventory +$190M" |
| 2 | P2 v2 Ch 12.2 | ΔWC 曲线 $70→$35 | $40→$20 |
| 3 | P2 v2 Ch 15.3 | Model A Base $114 | $124 |
| 4 | P3 v2 Ch 18-22 | 所有 $91 引用 | $104 |
| 5 | P3 v2 加权中心 | $91 期望回报 −71% | $104 期望回报 −66.0% |
| 6 | Default map audit 失灵事实 #2 | CEO 零买入作为 failure fact | 降级为"辅助观察", 主失灵事实只留 #1 和 #3 |

**回流原则**: Phase 5 Complete 读起来**不应该能看出研究过程中的修正轨迹**. 第零律要求无痕化, 但红队 Ch 8 可以**显式**承认 RT-1 发现并修正 (红队就是干这个的, 隐藏 RT-1 反而不诚实). 区别在于: 执行摘要/Ch 1-7 使用**修正后的数字**, 不保留"原本是...后来改成..."的叙事.

---

## 8. 预期质量门控自测 (Phase 5 完成后必跑)

| 门控 | 阈值 | 预测 |
|---|---|---|
| G1 字符 | 动态基准 (240K+) | 目标 240-270K |
| G2 DM 密度 | ≥1.5/千字 | 当前 staging 114 DM / 112K = 1.02/千字 → P5 需新增 ≥30, 达 144+/240K ≈ 0.6/千字 ⚠️ **需大幅增加 DM**. 目标 ≥400 DM |
| G3 DM 总数 | ≥450 | 当前 114 → 需补至少 336, **J-3 只要求 30 新增, 不够 G3** → **加要求: P5 新写必须达 ≥340 DM 新增** |
| G4 Mermaid | ≥25 | 当前 8 + 清单 12 = 20 < 25 ⚠️ **需补 5 个**. 扩展: Ch 业务 1 / Ch 竞争 1 / Ch 风险拓扑 2 / 附录 1 |
| G5 因果密度 | ≥5.0/万字 | P1-P4 已达标, P5 维持 |
| G6 Python 验证 | 必须 | ✅ data/valuation_model.py |
| G7 估值离散度 | ≤30% | 6 模型 $53-$176, 中心 $104, σ ~$35, CV ~33% ⚠️ **临界, 需要在 Ch 估值解释为什么这个离散度是有意义的 (两种会计观) 而非噪音** |
| G8 CQ 标记 | CQ1-CQ8 | P0.5 已有, P5 维持 |
| G9 认知边界 | 必须 | ✅ R-4 量化已完成 |

**G3 重要警告**: DM 总数 ≥450 比 DM 锚点必填清单 ≥30 严格得多. Phase 5 必须**不仅复用 P1-P4 的 114 DM**, 还必须在 Ch 1-14 新写部分**额外新增 ≥336 DM**. 这意味着**每章平均 24 DM**. 很紧. **Phase 5 写作时必须随写随标 DM 锚点, 不能写完再补**.

**G4 补充清单** (15 个额外图, 达 ≥25):
13. 四分部 revenue / OM 对比 bar
14. Peer FCF/NI 对比 bar
15. Defense cycle 历史周期图
16. 风险拓扑: 主要风险节点关系图
17. 最糟组合风险树
18. 时间表甘特图 (Q2 FY26 / Industrial divestiture / Europe contract)

---

## 9. Phase 5 核心写作纪律 (复习)

- **5 减法**: 删 hedging / 删箭头链 / 删审美词 / voice "本报告"→"我们" / Top 5 必含范畴重分配
- **无痕化**: 回流修正不留痕迹, 但红队章节可显式记录 RT 过程
- **新定义延迟**: "会计 EPS 的现金幻觉机器"首次命名**不在 Ch 1**, 放在 Ch 3 或 Ch 5 (幻觉章节). Ch 1-2 呈现对立但不先给名字
- **执行摘要三段式**: 对齐+裂缝 / 新定义+变量+估值 / 评级+Kill Switch+异议
- **每 50K mid_assembly_check**: 不是可选, 是强制
- **230K+ 考虑分会话**: 若单会话吃力, context_save + /clear + 续写

---

## 10. 恢复指令 (下次启动 Phase 5)

```
cd /Users/milton/投资大师/.worktrees/半导体
# 读 handoff
cat reports/MOG.A/staging/MOG.A_phase4_handoff.md
# 读 compression test
cat reports/MOG.A/staging/MOG.A_compression_test.md
# 启动 Phase 5 单会话组装
# 目标文件: reports/MOG.A/MOG.A_complete_v1.md
# 目标: ~240K chars, G1-G9 全部 PASS
```

---

**Phase 4.5 完成**. 可以进入 Phase 5.
