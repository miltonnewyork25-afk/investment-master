# NET v2.0 → 框架升级提案
> **日期**: 2026-03-30
> **来源**: NET Complete v2.0 (3.95分) 的3个独特贡献 + 深度审计缺口
> **目标**: 护城河评估器v1.5升级 + 低估股筛选v1.3升级

---

## 一、诊断: NET暴露了什么框架缺口

### NET的3个独特发现 vs 现有框架覆盖

| 发现 | 护城河评估器v1.0 | 低估股筛选v1.2 | 缺口 |
|------|:--------------:|:-------------:|------|
| **存量/增量护城河分离(8.1/4.1)** | ❌ CQI给单一分数,不区分留客vs获客 | ❌ 无此维度 | **两个框架都缺** |
| **叙事溢价PE 51.5%** | ❌ 无叙事溢价量化 | ❌ 无叙事溢价检测 | **两个框架都缺** |
| **联合概率0.3%** | ❌ 无多信念联合测试 | ❌ 无此筛选信号 | **两个框架都缺** |

### NET暴露的额外缺口

| 缺口 | 框架 | NET的数据 | 含义 |
|------|------|----------|------|
| Owner FCF Yield vs FCF Yield分歧 | 筛选器 | FCF Yield 0.45% vs Owner -0.18% | 对SBC重公司, FCF Yield误导 |
| CapEx强度→分类信号 | 筛选器 | CapEx/Rev 15.8%=AKAMAI级 | "SaaS"标签下藏着基础设施公司 |
| 护城河代际转换进度 | 护城河评估器 | CDN(↓)→安全(↑)→平台(↑) | C7自维持性不捕捉"迁移中"状态 |
| C-AI类型边界模糊 | 护城河评估器 | NET既是AI基础设施又不完全是 | 4种原型不覆盖混合型 |
| 不对称比 | 两个框架 | 2.75:1 | 买入/不买决策的核心输入 |
| CAC Payback超标 | 筛选器 | 34月(1.9x超标) | 免费层公司的S&M效率幻觉 |

---

## 二、护城河评估器升级提案 → v1.5

### EVO-MOAT-001: 存量/增量护城河分离 (NET+KLAC双验证)

**当前问题**: CQI给C1-C7每维度一个分数,但"留住老客户"和"赢得新客户"是完全不同的能力——NET存量8.1/增量4.1的4分差距在单一评分中被平均掉。

**升级方案**: Step 2评分后新增Step 2.5:

```markdown
#### Step 2.5: 存量vs增量护城河分离 (v1.5新增)

对C1(嵌入性)+C2(网络效应)+C3(生态锁定)+C5(规模经济)四个维度,
各自拆分为存量分和增量分:

| # | 维度 | 存量分(留客) | 增量分(获客) | 差距 |
|---|------|:----------:|:----------:|:---:|
| C1 | 嵌入性 | ?/5 | ?/5 | ? |
| C2 | 网络效应 | ?/5 | ?/5 | ? |
| C3 | 生态锁定 | ?/5 | ?/5 | ? |
| C5 | 规模经济 | ?/5 | ?/5 | ? |

加权存量分 = Σ(各维度存量分 × 收入权重)
加权增量分 = Σ(各维度增量分 × 增长贡献权重)
差距 = |存量 - 增量|

诊断:
  差距 < 1.0 → 均衡型(健康)
  差距 1.0-2.0 → 轻度分离(标注)
  差距 2.0-3.0 → 守成型或增长型(警告)
  差距 > 3.0 → 严重分离(护城河结构性风险)

护城河类型补充:
  存量 > 增量+2 → 守成型(类Akamai/Oracle) — 估值给折价
  增量 > 存量+2 → 增长型(类早期AWS) — 估值可给溢价
```

**触发条件**: 所有Tier 3报告强制执行; Tier 2可选
**迁移**: 已有报告无需回溯(新增字段不影响历史评分)
**验证案例**: NET(8.1/4.1守成型), KLAC(9/8均衡型), ORCL(推测8.5/3.5守成型)

### EVO-MOAT-002: 护城河代际转换追踪 (NET验证)

**当前问题**: C7自维持性评分是静态的——不区分"稳定的护城河"和"正在迁移中的护城河"。NET的三层迁移(CDN→安全→平台)在C7=3.5下不可见。

**升级方案**: C7评分后新增注释字段:

```yaml
moat_migration:
  status: "migrating"  # stable / migrating / eroding / building
  from: "CDN/网络规模"
  to: "安全平台+开发者生态"
  progress: 35%  # 0-100%
  crossover_year: 2028  # 新护城河超过旧护城河的预计年份
  vacuum_risk: "medium"  # low/medium/high — 迁移期间的护城河真空风险
```

**估值含义**: migrating+vacuum_risk=high → SOTP应分别估值旧/新护城河; migrating+progress>60% → 新护城河可用更高倍数

**触发条件**: 当公司有明确的业务模式转型/新增长引擎时
**验证案例**: NET(CDN→安全, 35%, medium), ADBE(桌面→云, 2015完成, 100%), MSFT(Windows→Azure, 2020完成, 100%)

### EVO-MOAT-003: C-AI类型增加"混合型/边缘型" (NET验证)

**当前问题**: 4种AI抗性原型(监管物理/数据切换/创意工作流/AI基础设施)不覆盖NET——NET同时是CDN基础设施(Type D顺风)和边缘计算平台(部分竞争)和安全(Type B数据切换)。

**升级方案**: 新增Type E:

```
Type E: 混合型/边缘型 — 整体AI_resistance = CONTEXT-DEPENDENT
  典型: NET(边缘云+安全) / TWLO(通信API+AI) / SNOW(数据平台+AI)
  逻辑: AI同时创造需求(利好)和改变流量模式(威胁),净影响取决于具体场景
  AI影响: 需要场景概率加权 → C-AI不给单一评分,给概率分布
  C-AI: 2-4(取决于场景概率), 附注概率分布

  评分方法:
    对每个AI场景:
      P(场景) × C-AI(场景) → 加权C-AI
    例(NET): 45%×4(AI增强)+25%×1(AI绕过)+30%×3(中性) = 1.8+0.25+0.9 = 2.95
```

**触发条件**: 当公司不明确属于Type A-D时
**验证案例**: NET(2.95), TWLO(预测~3.2), SNOW(预测~3.5)

---

## 三、低估股筛选器升级提案 → v1.3

### EVO-SCREEN-001: Owner FCF Yield信号 (NET+DDOG+CRWD验证)

**当前问题**: 筛选器用FCF Yield作估值信号,但对SBC/Rev>10%的公司, FCF Yield严重高估真实回报。NET: FCF Yield 0.45%(看起来接近中性) vs Owner FCF Yield -0.18%(实际负回报)。

**升级方案**: L2层新增Owner FCF Yield信号:

```
当SBC/Rev > 10%时, 启用Owner FCF Yield检测:

Owner FCF Yield = (FCF - SBC) / Market Cap × 100%

  Owner Yield > 3%    → L2 +1.0分 (真实回报高, 极罕见对SBC重公司)
  Owner Yield 1-3%    → L2 +0.5分 (覆盖SBC后仍有回报)
  Owner Yield 0-1%    → L2  0分   (勉强覆盖)
  Owner Yield -1%~0%  → L2 -0.5分 (SBC侵蚀全部FCF)
  Owner Yield < -1%   → L2 -1.0分 (持续毁灭股东价值)

与现有FCF Yield信号的关系:
  SBC/Rev < 5%  → 仅用FCF Yield(SBC可忽略)
  SBC/Rev 5-10% → 两者取平均
  SBC/Rev > 10% → Owner FCF Yield权重2x(主导)
```

**NET验证**: Owner Yield = -0.18% → L2 -0.5分。当前筛选器会给FCF Yield 0.45% → L1 -0.5分——两者方向一致但Owner Yield更精确地反映SBC侵蚀。

**CRWD对比**: Owner Yield = ($213M+)/~$90B ≈ 0.24% → L2 0分(勉强覆盖)。差异: CRWD有回购→Owner FCF正; NET无回购→Owner FCF负。

### EVO-SCREEN-002: 叙事溢价检测 (NET验证)

**当前问题**: 筛选器缺乏对"高叙事溢价"股票的警告。一只P/FCF 220x的股票如果50%来自叙事,即使增速下降10%也可能导致叙事崩塌→估值-50%。

**升级方案**: L1层新增叙事溢价检测(对P/FCF>50x的股票触发):

```
当P/FCF > 50x时, 计算叙事溢价:

叙事溢价% = 1 - (同行基线P/FCF + PEG溢价) / 当前P/FCF
  同行基线: 同行业低增速可比公司的P/FCF(代表"零叙事"估值)
  PEG溢价: (目标增速/基线增速) × 基线P/FCF

  叙事溢价 < 15%   → L1  0分 (合理, 增速可解释溢价)
  叙事溢价 15-30%  → L1 -0.5分 (关注, 部分不可验证)
  叙事溢价 30-50%  → L1 -1.0分 (警告, 估值高度脆弱于叙事破灭)
  叙事溢价 > 50%   → L1 -1.5分 (强警告, 接近纯概念股)

注意: 此信号仅对P/FCF>50x触发。P/FCF<50x的公司通常叙事溢价<15%, 不需要此检测。
```

**NET验证**: 叙事溢价51.5% → L1 -1.5分。当前筛选器无此信号→遗漏了最重要的风险维度。

### EVO-SCREEN-003: CapEx强度分类信号 (NET验证)

**当前问题**: 筛选器不区分"真SaaS"(CapEx/Rev 3-6%)和"伪装成SaaS的基础设施"(CapEx/Rev 12-20%)。后者不应享受SaaS估值倍数。

**升级方案**: L2层新增CapEx分类信号:

```
CapEx/Rev检测(对标记为Software/SaaS的公司):

  CapEx/Rev < 5%    → 纯软件(确认SaaS倍数合理)
  CapEx/Rev 5-10%   → 软件+轻资产(正常)
  CapEx/Rev 10-15%  → ⚠️ 混合型(标注"CapEx强度偏高")
  CapEx/Rev > 15%   → ⚠️⚠️ 基础设施级(标注"可能错误分类")
                      → L2 -0.5分(如果以SaaS倍数定价)

触发: 仅对行业标签为"Software"/"SaaS"/"Cloud"的公司
逻辑: 如果一家"SaaS"公司的CapEx像AKAMAI(15%), 那它的合理倍数不是ZS的13x而是AKAMAI的3x
```

**NET验证**: CapEx/Rev 15.8% → L2 -0.5分 + 标注"基础设施级CapEx, 可能错误分类"。

### EVO-SCREEN-004: 免费层CAC稀释警告 (NET验证)

**当前问题**: 筛选器用S&M Efficiency(Magic Number)检测获客效率, 但对有大规模免费层的公司(NET/DDOG/SNOW), S&M费用包含大量支撑免费用户的成本→Magic Number被人为压低。

**升级方案**: L2层新增免费层调整:

```
当公司有大规模免费层(免费用户>付费用户10x)时:

  调整后Magic Number = 新增付费ARR / (S&M × 付费获客占比)

  如果调整后MN > 原始MN × 1.5 → 标注"免费层稀释S&M效率"
  → 原始MN的负面扣分减半(因为真实效率被低估)

  如果调整后MN仍 < 0.75 → 效率问题是真实的(不是免费层导致)

触发: fmp_data profile中行业="Software"+已知有免费层的公司
检测免费层: WebSearch "{TICKER} free tier pricing" 或 公开定价页
```

**NET验证**: 原始MN=0.63(不达标), 但如果只算付费获客S&M→调整后MN≈1.0(达标)。NET的效率问题部分来自免费层战略, 非纯粹的S&M低效。

---

## 四、优先级排序

### 护城河评估器 (v1.0 → v1.5)

| EVO | 名称 | 优先级 | 实施复杂度 | 影响范围 |
|-----|------|:------:|:---------:|---------|
| EVO-MOAT-001 | 存量/增量分离 | **P0** | 中(新增Step 2.5) | 所有报告 |
| EVO-MOAT-002 | 代际转换追踪 | P1 | 低(新增yaml字段) | 转型中公司 |
| EVO-MOAT-003 | C-AI Type E混合型 | P1 | 低(新增一种类型) | 边缘/混合公司 |

### 低估股筛选器 (v1.2 → v1.3)

| EVO | 名称 | 优先级 | 实施复杂度 | 影响范围 |
|-----|------|:------:|:---------:|---------|
| EVO-SCREEN-001 | Owner FCF Yield | **P0** | 低(新增L2信号) | SBC>10%公司 |
| EVO-SCREEN-002 | 叙事溢价检测 | **P0** | 中(需同行基线) | P/FCF>50x公司 |
| EVO-SCREEN-003 | CapEx分类 | P1 | 低(简单阈值) | Software标签公司 |
| EVO-SCREEN-004 | 免费层CAC调整 | P2 | 中(需免费层检测) | 有免费层的SaaS |

### 实施建议

**第一批(立即)**: EVO-MOAT-001 + EVO-SCREEN-001 + EVO-SCREEN-002 — 影响最大+实施简单
**第二批(下次报告前)**: EVO-MOAT-002 + EVO-MOAT-003 + EVO-SCREEN-003
**第三批(积累更多数据后)**: EVO-SCREEN-004 (需要更多免费层公司数据验证)

---

## 五、与evolution_log的集成

以下EVO待用户审批后写入`knowledge/evolution_log.yaml`:

```yaml
- id: EVO-NET-001
  source: NET_v2.0
  type: moat_framework
  title: "存量vs增量护城河分离 — 标准化为moat-evaluator Step 2.5"
  priority: P0
  status: proposed

- id: EVO-NET-002
  source: NET_v2.0
  type: screener
  title: "叙事溢价检测 — P/FCF>50x时计算叙事溢价%"
  priority: P0
  status: proposed

- id: EVO-NET-003
  source: NET_v2.0
  type: screener
  title: "Owner FCF Yield — SBC>10%时替代FCF Yield"
  priority: P0
  status: proposed

- id: EVO-NET-004
  source: NET_v2.0
  type: moat_framework
  title: "护城河代际转换yaml追踪"
  priority: P1
  status: proposed

- id: EVO-NET-005
  source: NET_v2.0
  type: moat_framework
  title: "C-AI Type E混合型/边缘型"
  priority: P1
  status: proposed

- id: EVO-NET-006
  source: NET_v2.0
  type: screener
  title: "CapEx强度分类信号 — Software标签下的基础设施检测"
  priority: P1
  status: proposed

- id: EVO-NET-007
  source: NET_v2.0
  type: screener
  title: "免费层CAC稀释调整"
  priority: P2
  status: proposed
```
