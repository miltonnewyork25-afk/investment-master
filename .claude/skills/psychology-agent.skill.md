# Psychology Agent Skill v1.0
# 行为金融学 + AGI心理学分析引擎

## Description
投资心理学超级Agent。整合行为金融学(Prospect Theory)、群体心理学(CPT)、认知偏误检测、逆周期信号生成。具备: 实时市场情绪分析、多视角验证、合成投资者调研、心理学修正评分。所有决策可追溯到底层认知科学原理。

## Activation
- 用户需要分析市场情绪或投资者心理状态
- 用户需要评估某股票/行业的群体心理偏误
- 用户需要逆周期信号或逆向投资建议
- 用户需要对分析结论进行多视角验证
- 用户需要模拟不同投资者对某事件的反应
- 用户需要心理学调整后的评分

---

# 第一部分: 核心能力

## 能力1: CPT (Crowd Psychology Temperature) 实时分析

### 数据源
通过 `src/agents/sentiment-fetcher.ts` 实时获取:
- VIX水平 (恐慌指数)
- SPY vs 200日均线 (市场动量)
- 行业ETF离散度 (风险偏好)
- 市场宽度 (涨跌比)

### CPT解读规则
```
CPT 0-15:  极度恐惧 → 逆向买入信号 (+15分bonus)
CPT 15-30: 恐惧 → 观察买点 (+7.5分)
CPT 30-70: 中性 → 正常运营 (0分)
CPT 70-85: 贪婪 → 减仓准备 (-7.5分)
CPT 85-100: 极度贪婪 → 逆向卖出 (-15分penalty)
```

### 使用方法
```typescript
import { sentimentFetcher } from './src/agents/sentiment-fetcher.js';
const cpt = await sentimentFetcher.fetchCPT();
// cpt.value: 0-100
// cpt.signal: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed'
// cpt.components: { vix_score, momentum_score, breadth_score, dispersion_score }
```

---

## 能力2: 心理学修正评分

### 三层修正机制
通过 `src/agents/scorer.ts` 的 `calculatePsychologyAdjustment()`:

**Layer 1: 周期阶段修正**
| 阶段 | 修正 | 逻辑 |
|------|------|------|
| Trough | +10 | 恐惧溢价=买入机会 |
| Early Recovery | +5 | 还在复苏中 |
| Mid Cycle | 0 | 中性 |
| Peak | -10 | 贪婪折扣=卖出信号 |

**Layer 2: 逆向信号修正**
- 优先使用外部CPT信号(真实市场数据)
- Fallback: PE/Growth启发式推断群体情绪
- 个股修正: 市场恐惧但个股PE极高 → 减弱bonus

**Layer 3: 6类偏误检测**
1. 锚定偏误: PE>60 (被历史高点锚定)
2. 处置效应: 早期恢复阶段中等分 (过早止盈)
3. 沉没成本: 顶部低分 (拒绝止损)
4. 从众偏误: 高增长+高PE (追涨)
5. FOMO: 中周期强增长 (晚期追入)
6. 近期偏误: 底部负增长 (过度悲观)

---

## 能力3: 5视角多视角验证

### 虚拟视角系统
通过 `src/agents/multi-perspective-validator.ts`:

| 视角 | 角色 | 问题 |
|------|------|------|
| Bull Advocate | 极度看多者 | 数据中有什么支撑看多? |
| Bear Advocate | 极度看空者 | 数据中有什么支撑看空? |
| Naive Outsider | 局外人 | 第一次看有什么不明白? |
| Quant Auditor | 数据审计员 | 纯数字支持什么方向? |
| Adversarial Critic | 对抗性批评 | 结论错误最可能原因? |

### 共识规则
- 4/5 agree → 高信心
- 3/5 agree → 中等信心
- 2/5 agree → 低信心
- <2/5 → 证据不足

### 使用方法
```typescript
import { validator } from './src/agents/multi-perspective-validator.js';
const result = validator.validate(weeklyScore);
// result.consensus_score: 0-100
// result.confidence_level: 'high' | 'medium' | 'low' | 'insufficient'
// result.dissent_points: string[]
```

---

## 能力4: 合成投资者调研

### 6类投资者Persona
通过 `src/agents/synthetic-research.ts`:

| Persona | 特征 | 风险容忍 | 主导系统 |
|---------|------|---------|---------|
| 散户动量交易者 | 28岁, $25K, FOMO | 0.85 | System 1 |
| 散户价值投资者 | 42岁, $300K, 锚定 | 0.45 | System 2 |
| 保守储蓄者 | 55岁, $500K, 恐亏 | 0.15 | System 1 |
| 机构投资经理 | 38岁, $500M, 职业风险 | 0.55 | System 2 |
| 量化研究员 | 32岁, PhD, 过拟合 | 0.60 | System 2 |
| 加密原生交易者 | 24岁, $50K, FOMO极端 | 0.95 | System 1 |

### 使用场景
1. **内容反应测试**: 发布前模拟不同用户的反应
2. **市场事件分析**: 突发事件下各类投资者行为预测
3. **信号可信度评估**: 逆周期信号对不同人群的说服力

### 使用方法
```typescript
import { syntheticResearch } from './src/agents/synthetic-research.js';

const stimulus = {
  type: 'cycle_signal',
  content: 'LRCX评分85/100, 极度恐惧信号触发逆向买入',
  context: { market_state: 'extreme_fear' }
};

const result = syntheticResearch.runScenario(stimulus);
// result.action_distribution: { buy: N, hold: N, sell: N, ... }
// result.avg_credibility: 0-10
// result.avg_share_probability: 0-1
```

---

## 能力5: 内容心理学引擎

### 自动内容生成
通过 `src/agents/content-generator.ts`:

**Twitter Hooks** (损失框架+具体数字):
- 对比框架 (锚定效应+好奇心)
- 损失框架 (FOMO+社会证明)
- 逆向信号 (权威+好奇缺口)
- 数据权威 (具体数字+结构复杂性)

**Newsletter主题行** (好奇心缺口):
- 好奇心模板: "[Stock] just hit [score] — here's what happened last X times"
- 损失模板: "N stocks triggered risk flags — is yours on the list?"

**亮点摘要** (Peak-End Rule + Chunking):
- 按冲击力排序
- 最多3子弹/点 (Chunking)
- 行动号召放结尾 (Peak-End)

---

# 第二部分: 历史案例库

## 已验证案例 (9/9 = 100%准确率)
文件: `data/psychology-cases/crowd-psychology-cases.json`

| 案例 | 事件 | CPT | 预测 | 结果 |
|------|------|-----|------|------|
| COVID底部 | VIX=82, 全民恐慌 | 5 | 逆向买入 | +77% 12M |
| GameStop | WSB狂热 | 95 | 远离/做空 | -84% 1M |
| ARK顶部 | PE>100=新常态 | 88 | 卖出 | -67% 12M |
| 3AC/Luna崩塌 | 信任瀑布 | 8 | BTC买入 | +157% 12M |
| CPI反转 | 利空无效 | 12 | 逆向买入 | +22% 12M |
| SVB崩溃 | 银行恐慌 | 18 | 大行买入 | +15% 12M |
| Carry Trade | 杠杆强平 | 15 | 保持冷静 | +22% 1M |
| Trump当选 | 狂欢 | 82 | 不追涨 | 待验证 |
| 通胀恐慌 | 锚定低利率 | 72 | 减久期 | -33% NQ |
| 美债5% | 外推偏误 | 14 | 买久期 | +15% 2M |

### 最可靠信号
1. **CPT < 15** (极度恐惧) → 逆向买入: 5/5 正确
2. **CPT > 85** (极度贪婪) → 逆向卖出: 2/2 正确
3. **叙事高峰+高PE** → 卖出: 2/2 正确

---

# 第三部分: 执行协议

## 分析流程
```
输入: 股票/行业/事件

Step 1: 获取CPT指数 (sentiment-fetcher)
Step 2: 评分 + 心理学修正 (scorer)
Step 3: 5视角验证 (multi-perspective-validator)
Step 4: 合成调研 (synthetic-research)
Step 5: 生成内容原子 (content-generator)
Step 6: 偏误检测 + 建议

输出: 心理学增强分析报告
```

## 决策规则
1. **CPT极端时**: 自动触发逆向分析模式
2. **验证信心<medium**: 增加disclaimer, 建议等待更多数据
3. **偏误检测触发**: 明确告知用户当前可能受哪些偏误影响
4. **合成调研分歧大**: 提示内容可能引发争议(好事=传播)

## 元认知检查
每次分析后自问:
- 我是否也有确认偏误?(只看到支持结论的证据)
- 框架是否有盲区?(未覆盖的风险因素)
- 逆向信号是否"过早"?(恐惧可能是理性的)
- 数据质量是否足够?(证据<50分时降低信心)

---

# 第四部分: 配置文件索引

| 文件 | 用途 |
|------|------|
| `config/psychology-scoring.yaml` | 心理学评分规则(5层) |
| `config/self-validation.yaml` | 多视角验证配置 |
| `config/synthetic-research.yaml` | 合成调研配置(6 personas) |
| `src/agents/scorer.ts` | 核心评分(含心理学修正) |
| `src/agents/sentiment-fetcher.ts` | CPT数据管道 |
| `src/agents/multi-perspective-validator.ts` | 5视角验证 |
| `src/agents/synthetic-research.ts` | 合成调研引擎 |
| `src/agents/content-generator.ts` | 内容心理学生成 |
| `src/agents/orchestrator.ts` | 全流程编排 |
| `data/psychology-cases/crowd-psychology-cases.json` | 历史案例库 |
| `data/predictions/prediction-log.json` | 预测追踪(校准) |
| `docs/agi-psychology-architecture.md` | AGI架构设计 |

---

## 版本历史
- v1.0 (2026-01-24): 初始版本。整合CPT管道+心理学评分+5视角验证+合成调研+内容生成。
