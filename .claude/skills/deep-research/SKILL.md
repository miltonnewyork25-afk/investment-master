---
name: deep-research
description: Phase 1-2深度研究。整合五维价值创造链、驱动图D1-D5、复杂度修正器执行。Generator在Phase 1-2调用。
---

# Deep Research Skill（Phase 1-2）

## 触发时机
Phase 0 Foundation完成且Evaluator PASS后，Generator在Phase 1-2调用此skill。

## 前置条件
- research_state.yaml已完成
- shared_context.md已完成（含可比锚）
- Reverse DCF已完成
- sprint_contract_P1.yaml已产出
- preflight_gate CLEARED

---

## 分析骨架：五维价值创造链

### 维度1: 价值池（钱在哪）
- TAM/SAM/SOM量化
- 价值池增速及驱动因素
- 价值池集中度变化趋势
- **TAM不可能性测试**: TAM假设是否逻辑上可能？

### 维度2: 竞争地位（凭什么拿到）
- 市占率及变化趋势
- 护城河类型和强度（转换成本/网络效应/规模经济/品牌/专利/制度）
- **定价权分层**（Sprint Contract强制项）:
  - 高端客户定价权如何？
  - 低端客户定价权如何？
  - 高端提价+低端流失的"剪刀差"效应对OPM的影响？
- **飞轮验证**（如有飞轮声称）:
  - 是多边网络效应？还是单向数据复用？
  - 真正的飞轮需要自加速循环，不是管理层叙事

### 维度3: 经济引擎（怎么变回报）
- **增长归因分解**（Sprint Contract强制项）:
  ```
  总增长 = 量的贡献 + 价的贡献 + 混合效应 + 并购贡献
  禁止: 只说"增长15%"不做归因
  ```
- ROIC/ROE趋势及驱动
- Owner FCF vs GAAP净利润差距
- 资本效率（增量ROIC/边际资本回报）
- **NRR分层**（SaaS公司Sprint Contract强制项）:
  ```
  大客户NRR: X%
  中型客户NRR: Y%
  SMB客户NRR: Z%
  整体NRR被哪个群体拖累/提升？
  ```

### 维度4: 价值分配（赚了归谁）
- SBC/总薪酬/稀释率
- 回购效率（eta系数）
- 股息政策
- **三PE并列**（SBC/Rev>5%时Sprint Contract强制项）:
  ```
  | PE类型 | 值 | 含义 |
  |--------|-----|------|
  | GAAP PE | Xx | 含全部会计项目 |
  | Owner PE | Xx | 剥离SBC后真实股东回报 |
  | Core PE | Xx | 剥离非经营性收入 |
  ```

### 维度5: 预期差（市场错在哪）
- **预期差显式分析**（Sprint Contract强制项）:
  ```
  市场在定价: {Reverse DCF隐含的增长/利润率/久期}
  我们认为: {基于Phase 1-2分析的判断}
  差异: {哪里不同，为什么}
  差异值多少: {对公允价值的影响}
  ```
- 卖方共识vs自主判断
- 隐含信念集分析
- 非共识假说

---

## 驱动图（D1-D5）

不默认所有公司都靠"增长"驱动。找出主驱动+次驱动+最容易被误判的驱动。

| 驱动 | 含义 | 关键指标 |
|------|------|---------|
| D1量 | 靠卖得更多 | 客户数/订单量/渗透率 |
| D2价/费率 | ��每笔赚更厚 | ARPU/ASP/take rate |
| D3效率 | 靠更省钱 | OPM/SGA%/自动化率 |
| D4资本/分配 | 靠钱怎么用 | ROIC/回购/M&A |
| D5折现率/制度 | 靠市场给几倍 | PE扩张/制度溢价 |

每份报告标记：主驱动=Dx，次驱动=Dy，最易误判=Dz

---

## Lens Seeds维护

**每个主要模块结尾必须补两句话**（硬规则）:

```markdown
**Lens Seed**: 本模块最可能贡献的深层视角是——{一句话}
**变量排序变化**: 本模块改变了{变量X}的重要性排序，从{旧排位}到{新排位}，因为{原因}
```

更新`lens_seed_registry.yaml`:
```yaml
seeds:
  - id: "SEED-001"
    title: "定价权剪刀差创造隐性OPM扩张"
    source_chapter: "Phase 1 - 竞争地位"
    description: "高端提价+低端流失的净效果是OPM提升"
    variable: "OPM"
    maturity: "developing"
    affects_valuation: true
    affects_load_bearing: true
    market_awareness: "unpriced"
```

---

## CI注册表维护

Competitive Intelligence注册表必须满足方向分布要求：

```yaml
ci_registry:
  bullish: []   # 偏多发现
  bearish: []   # 偏空发现（必须≥2个）
  neutral: []   # 中性发现

  direction_check:
    bearish_count: N  # 必须≥2，否则Evaluator REJECT
    distribution: "X:Y:Z"
```

**硬规则**: CI注册表偏空<2 → Evaluator强制REJECT（系统性偏差不可修补）。

---

## 写作纪律

### 3秒检验（每段落完成后）
```
问自己: 这段话是断言还是论证?
✅ 有≥1个具体数字
✅ 有DM锚点（后台版本）
✅ 有因果链（因为X→所以Y）
✅ 有反面（什么条件下不成立）
❌ 缺任何一项=当场补
```

### 密度底线
- 因果密度≥5.0/万字
- DM密度≥0.8/千字（后台版本）
- 断言占比<30%

### 证据链标准
每个影响估值的核心论点必须有：
1. ≥1个硬数据（带DM锚点）
2. ≥1个因果推理（"因为X→所以Y"）
3. ≥1个反面考量（什么条件下不成立）

---

## 产出文件清单

1. `staging/{TICKER}_P1_business.md` — 业务理解
2. `staging/{TICKER}_P1_competitive.md` — 竞争格局
3. `staging/{TICKER}_P2_financial.md` — 财务分析
4. `staging/{TICKER}_P2_valuation.md` — 估值模型
5. `reports/{TICKER}/data/lens_seed_registry.yaml` — 更新
6. `reports/{TICKER}/data/ci_registry.yaml` — CI注册表
7. `reports/{TICKER}/data/research_state.yaml` — 更新
