---
name: research-foundation
description: Phase 0基础设施。整合P0-P3识别、Reverse DCF、可比锚、数据收集、口径标注。替代原data-prefetch的Phase 0功能。
---

# Research Foundation Skill（Phase 0）

## 触发时机
Tier 3分析启动后，Generator在Phase 0调用此skill。

## 执行流程

### Step 1: 启动基础设施
```bash
bash scripts/tier3_launch.sh {TICKER} {INDUSTRY}
```
读取launch_brief.md，确认目标字符范围和参考报告。

### Step 2: P0-P3前置识别

**P0 原型识别** — 先认物种:
软件平台 / 网络基础设施 / 制度垄断 / 运营密度 / 技术IP / 混合 / 单点瓶颈 / 黑箱算法 / 会员复利 / 重资本再投资

**P1 行业定价公式** — 市场按什么变量定价:
NRR / Rule of 40 / fee stream / take rate / 技术卡位 / 效果归因 / 续费率...

**P2 资产身份识别** — 市场贴的标签:
高增长 / 复利 / 债券替代 / 周期 / 修复 / 平台 / 瓶颈 / 现金牛 / 期权资产
注意: 经营身份≠市场身份

**P3 时间框架识别** — 市场买的是哪个时���层:
2季度 / 1-2年 / 3-5年 / 永续
关键问题: "这个未来是不是已经被买得太满了?"

### Step 3: Reverse DCF（中性起点锁定）

**这是质量最强预测因子**（36份报告验证）。

执行Reverse DCF，翻译"市场当前股价在买什么"：
- 隐含增长率
- 隐含利润率
- 隐含久期
- 隐含WACC

**硬规则**: Phase 1叙事方向不能比Reverse DCF结论偏离>1档。
- Reverse DCF说"合理定价" → Phase 1不能写"严重低估"
- Reverse DCF说"隐含15%增长" → Phase 1不能假设25%增长

### Step 4: 可比公司锚

**必须在Phase 0完成**（不是Phase 3）。

找到最相似可比公司（增速/PE/行业最接近），写入shared_context.md：

```markdown
## 可比公司锚（Phase 0建立）
| 指标 | {TICKER} | 最相似可比 | 差异 |
|------|---------|-----------|------|
| 增速 | X% | Y% | ±Z% |
| PE | Xx | Yx | ±Z |
| 毛利率 | X% | Y% | ±Z% |
| FCF Yield | X% | Y% | ±Z% |
```

如果目标公司PE与最相似可比PE接近 → Phase 1不能写"被低估"（因为可比也一样低）。

### Step 5: 数据收集 + 口径标注

**数据来源优先级**: MCP工具 > WebSearch > 禁编造

**每个数据源必须标注**:
```yaml
data_source:
  entity: "{公司名} ({ticker}.{exchange})"
  scope: "listed_company"  # group / listed_company / division
  source_url: "https://..."
  retrieval_date: "YYYY-MM-DD"
  cross_verified: true  # ≥2源交叉验证
  cross_verify_source: "FMP + 10-K"
```

**特别警惕**:
- 中国国企：集团vs上市公司口径（可差10x）
- PB定义：accounting PB vs market NAV PB（可差94%）
- 事件驱动：每Phase开始前重新获取价格快照

### Step 6: SBC哲学声明

```yaml
sbc_philosophy:
  position: "Owner FCF"  # GAAP / NonGAAP / Owner FCF
  rationale: "SBC/Rev=15%，股东真实回报需扣除SBC稀释"
  three_pe_required: true  # SBC/Rev>5%时必须三PE并列
```

### Step 7: 初始化Lens Seeds + Research State

```yaml
# lens_seed_registry.yaml
seeds: []  # Phase 1-2持续填充

# research_state.yaml
state:
  current_phase: "Phase 0 - Foundation"
  reverse_dcf_conclusion: "市场隐含X%增长，Y%利润率"
  main_thesis: "待形成（Phase 0不锁定主线）"
  counter_thesis: "待形成"
  peer_anchor: "{可比公司} PE Xx vs 目标 Xx"
```

### Step 8: 复杂度修正器路由

根据P0-P3结果，确定触发哪些M修正器：

| 修正器 | 触发条件 | 加入Sprint Contract |
|--------|---------|-------------------|
| M0 混合体先拆 | 多业务线/不同增长逻辑 | 分部拆解+分部估值 |
| M1 尾部保险 | 高固定成本/高经营杠杆 | 极端停摆风险进估值 |
| M2 身份协同/冲突 | 2+种重要身份 | 身份飞轮验证 |
| M4 标签坍塌 | 享受高等级估值桶 | 标签风险评估 |
| M5 转型溢价 | "正在变成"另一种公司 | 转型进度量化 |
| M6 基本盘vs期权 | 超级龙头+额外叙事溢价 | 分离基本盘和期权价值 |
| M8 穿周期OE | CapEx巨大/重投期 | 穿周期Owner Earnings |
| M10 模型效果vs护城河 | 核心优势来自算法 | 效果归因vs护城河区分 |
| M11 稀缺溢价vs政策折价 | 产业链chokepoint | 监管风险量化 |
| M12 质量溢价vs安全边际 | 极高质量溢价 | 赔率不对称评估 |

---

## 产出文件清单

1. `reports/{TICKER}/data/research_state.yaml`
2. `reports/{TICKER}/data/shared_context.md`（含可比锚）
3. `reports/{TICKER}/data/lens_seed_registry.yaml`（初始化）
4. `reports/{TICKER}/data/knowledge_context.md`
5. `reports/{TICKER}/data/lit_recon_memo.md`
6. `staging/{TICKER}_P0_foundation.md`

## Preflight Gate

Phase 0完成后，执行：
```bash
bash scripts/preflight_gate.sh {TICKER}
```
必须返回CLEARED才能进入Phase 1。
