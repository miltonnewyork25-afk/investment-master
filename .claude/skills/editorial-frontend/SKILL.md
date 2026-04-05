---
name: editorial-frontend
description: Phase 5前台重组。将研究底稿重组为"先答案后证明、先压缩后展开"的前台成品，产出双版本（前台+后台审计）。
---

# Editorial Front-End Skill（Part B）

## 触发时机
Phase 4 Crystallization完成且Evaluator PASS后，Generator在Phase 5调用此skill。

## 前置条件
- top5_lenses.yaml已完成
- chapter_to_lens_map.md已完成
- front_recomposition_plan.md已完成
- revision_backflow_table.yaml已全部executed

---

## Front-End Principles

1. **先结果，后解释** — 读者第1分钟就知道结论
2. **先压缩，后展开** — Top 5卡片是全文压缩版
3. **先给读者答案，再给研究者过程** — 过程退到后台
4. **前台只保留最承重的内容** — 非承重内容降级到附录
5. **每一章都必须证明自己为什么值得读** — Chapter Earning Rule
6. **方法论退到后台** — 结论与证据留在前台
7. **视角卡片优先于目录说明** — 读者要判断不要导航

---

## Step 1: 前台开头结构

按以下顺序组装前台成品的开头：

```
1. 一句话结论（评级 + 公允价值 + 核心判断）
2. Top 5 Core Investment Lenses（5张卡片）
3. 市场当前在定价什么 / 市场可能错在哪里（≤500字）
4. 3-5个最重要数字或最重要矛盾
5. 承重墙与失效条件摘要
6. 正文主体（按chapter_to_lens_map排序）
```

**前台开头预算受限**:
- 一句话结���: ≤100字
- Top 5卡片: 每张≤150字，总计≤750字
- 市场定价/错看: ≤500字
- 关键数字: ≤300字
- 承重墙摘要: ≤400字
- **总前台开头: ≤2000字**

---

## Step 2: Top 5 Lens Cards

每张卡片必须包含4个元素：

```markdown
### 🔍 Lens 1: {视角标题}

**判断**: {一句话判断——必须是判断，不是问题}

**市场定价**: {已定价 / 部分定价 / 未定价 / 错误定价}

**投资含义**: {这意味着什么——对估值/仓位/跟踪变量的具体影响}
```

**禁止**:
- 写成章节标题（"护城河分析" ✗）
- 写成开放式问题（"能否持续增长？" ✗）
- 写成方法论术语堆砌（"基于五维价值创造链..." ✗）

**正确示例**:
```
### 🔍 Lens 1: 定价权剪刀差创造隐性利润率扩张

**判断**: 高端客户提价+9%而低端客户自然流失，OPM将反直觉地扩张200-300bps

**市场定价**: 未定价——卖方模型假设均匀提价，未捕捉分层效应

**投资含义**: 当前估值隐含OPM 32%，实际可能达34-35%，对应$15-20/share上行空间
```

---

## Step 3: Chapter Earning Rule

对正文每一章执行三问测试：

1. **服务哪个Top 5?** — 必须明确映射到至少1个lens
2. **证明了什么?** — 不是"补充了什么"，是"证明了什么判断"
3. **删掉后果?** — 删掉这章，哪个核心判断明显变弱？

不通过 → 三种处理:
- **删除**: 完全不服务Top 5且删除后无影响
- **压缩**: 服务Top 5但当前篇幅过长（压缩到≤原来的50%）
- **降级到附录**: 有审计价值但不服务前台读者

---

## Step 4: 双版本产出

### 前台成品版 `{TICKER}_Complete_v{X}.md`

**必须移除**:
- DM锚点（`[DM-xxx-nnn]`）→ 关键数据改用来源归属（"来源：FY2025 10-K"）
- Phase标签（`Phase 1`/`P1`/`P2`...）
- 内部编号（`RT-1`/`CQ1`/`KS-001`）
- 回流痕迹（"校正后"/"修正前"/"旧版本"）
- 框架语言（"v22"/"harness"/"框架版本"）
- 评分系统（"X/10分"/"X/5分"）
- 仓位建议（"减仓"/"加仓"/"买入"）
- 伪精确小数（"30.47%概率"→"约30%概率"）
- 方法论自述（"本报告采用五维价值创造链..."）

**必须保留**:
- 最终结论 + 最终Top 5 + 最终证据链
- 最终边界 + 最终风险 + 最终监控变量
- Kill Switch条件（用读者语言表达）
- 关键数据的来源归属

### 后台审计版 `{TICKER}_Audit_v{X}.md`

保留一切：DM锚点、Phase标记、revision_backflow_table、Evaluator verdict历史、Sprint Contract记录、Lens Seed演化过程。

### 映射文件 `assembly_manifest.yaml`

```yaml
versions:
  frontend: "{TICKER}_Complete_v{X}.md"
  backend: "{TICKER}_Audit_v{X}.md"

chapter_mapping:
  - frontend_chapter: "1. 核心判断"
    backend_source: "staging/P1_executive_summary.md + P3_revisions"
  - frontend_chapter: "2. 商业模式的关键矛盾"
    backend_source: "staging/P1_business_model.md"
  # ...

data_traceability:
  - frontend_claim: "$180公允价值"
    backend_anchor: "DM-VAL-023"
    source: "data/valuation_model_output.yaml"
```

---

## Step 5: Prose Cleanup

### 移除的语言模式
- "本模块分析了..." → 直接给结论
- "根据框架要求..." → 删除
- "从五维价值创造链的角度..." → 删除
- "Phase 2的财务分析显示..." → 直接引用数据
- "如前所述..." → 每个论点自包含证据
- "我们认为值得关注的是..." → 直接说值得关注什么

### 保留的语���模式
- 先给判断再给证据
- 具体数字+来源归属
- 因果链（因为X→所以Y）
- 反面条件（什么情况下不成立）
- 比较和类比（更像Costco而不像Walmart）

---

## 产出文件清单

1. `reports/{TICKER}/{TICKER}_Complete_v{X}.md` — 前台成品版
2. `reports/{TICKER}/{TICKER}_Audit_v{X}.md` — 后台审计版
3. `reports/{TICKER}/data/assembly_manifest.yaml` — 双版本映射
