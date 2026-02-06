---
name: eco-tech-orchestrator
description: 生态科技行业自动编排器。识别子行业（光伏/风电/储能/氢能/电网），自动链接5个eco-tech skills，支持并行agent执行和快速扫描模式。
---

# 生态科技编排器 v1.0

## 触发条件

检测到生态科技相关公司/关键词时自动触发：
- 公司名：NextEra, 隆基, 金风, 宁德时代, Enphase, First Solar, Vestas, Plug Power, Bloom Energy 等
- 关键词：光伏, 风电, 储能, 氢能, 碳中和, 新能源, 清洁能源, LCOE, ESG, 碳足迹

## Step 1: 子行业识别

```yaml
子行业映射:
  光伏/太阳能:
    代表: 隆基, First Solar, Enphase, SolarEdge, 通威, 晶科
    核心skills: [lcoe-analyzer, tech-maturity-assessor, carbon-footprint-calculator]
    次要skills: [policy-impact-assessor, green-finance-evaluator]
    关键指标: 组件效率, LCOE, 产能利用率, 硅料价格

  风电:
    代表: 金风, Vestas, Siemens Gamesa, 明阳, 远景
    核心skills: [lcoe-analyzer, tech-maturity-assessor, policy-impact-assessor]
    次要skills: [carbon-footprint-calculator, green-finance-evaluator]
    关键指标: 风机容量, 利用小时数, 海上/陆上比例

  储能/电池:
    代表: 宁德时代, LG Energy, BYD电池, QuantumScape, Fluence
    核心skills: [tech-maturity-assessor, lcoe-analyzer, carbon-footprint-calculator]
    次要skills: [green-finance-evaluator, policy-impact-assessor]
    关键指标: 能量密度, 循环寿命, $/kWh, 技术路线

  氢能:
    代表: Plug Power, Bloom Energy, 亿华通, ITM Power
    核心skills: [tech-maturity-assessor, policy-impact-assessor, lcoe-analyzer]
    次要skills: [green-finance-evaluator, carbon-footprint-calculator]
    关键指标: 绿氢成本, 电解槽效率, 产能规划

  综合清洁能源:
    代表: NextEra, Brookfield Renewable, 三峡能源, 龙源电力
    核心skills: [green-finance-evaluator, lcoe-analyzer, policy-impact-assessor]
    次要skills: [carbon-footprint-calculator, tech-maturity-assessor]
    关键指标: 装机容量, PPA合同, 绿电比例, 碳信用
```

## Step 2: Skill链执行顺序

根据子行业自动编排5个skills的执行顺序：

```yaml
标准执行链（串行模式）:
  Round 1: lcoe-analyzer → 基础成本数据
  Round 2: tech-maturity-assessor → 技术成熟度+突破概率
  Round 3: [并行] carbon-footprint-calculator + policy-impact-assessor
  Round 4: green-finance-evaluator → 整合前4个skill输出

数据流向:
  lcoe-analyzer输出 → tech-maturity(成本趋势) + carbon(发电碳强度)
  tech-maturity输出 → lcoe(技术降本预测) + green-finance(技术评级)
  carbon-footprint输出 → policy(碳税成本) + green-finance(碳信用价值)
  policy-impact输出 → lcoe(补贴调整) + green-finance(政策风险)
  green-finance输出 → 最终投资建议汇总
```

## Step 3: 并行Agent模式

当用户确认使用并行模式时，启动多agent加速：

```yaml
并行方案A（3+2模式，推荐）:
  Wave 1 [并行]:
    - Agent 1: lcoe-analyzer（基础成本）
    - Agent 2: tech-maturity-assessor（技术评估）
    - Agent 3: carbon-footprint-calculator（碳足迹）
  Wave 2 [并行]:
    - Agent 4: policy-impact-assessor（整合Wave1输出）
    - Agent 5: green-finance-evaluator（整合Wave1输出）
  预期时间: 顺序40min → 并行15min

并行方案B（全并行，快速但精度略低）:
  Wave 1 [5并行]:
    - 5个skills同时启动，各自独立运行
  Wave 2:
    - 主agent汇总+交叉验证
  预期时间: 顺序40min → 并行8min
```

## Step 4: 生成执行清单

```markdown
## 生态科技分析：{公司名}
## 子行业：{子行业}
## 核心Skills：{核心3个}
## 执行模式：{串行/并行A/并行B}

### Phase 1: 基础数据层
- [ ] LCOE成本分析（lcoe-analyzer）
- [ ] 技术成熟度评估（tech-maturity-assessor）
- [ ] 碳足迹计算（carbon-footprint-calculator）

### Phase 2: 环境影响层
- [ ] 政策影响评估（policy-impact-assessor）
- [ ] 绿色金融评估（green-finance-evaluator）

### Phase 3: 投资决策整合
- [ ] 5 Skill交叉验证
- [ ] Kill Switch汇总
- [ ] 投资建议+仓位

### 质量检查点
- [ ] 每Skill输出≥2000字
- [ ] 数据质量标注完整
- [ ] 跨Skill数据一致性验证
- [ ] Kill Switch触发条件设置完毕
```

## Step 5: 快速扫描模式（/quick-scan）

15分钟80/20分析，用于快速Go/No-Go决策：

```yaml
快速扫描流程:
  1. WebSearch获取公司基本面（3min）
  2. 仅运行核心2个skills的关键指标（8min）
  3. 生成1页决策摘要（4min）

快速扫描输出:
  总长度: 3000-5000字
  必须包含:
    - 一句话定位
    - 3个核心数据点
    - LCOE/技术竞争力评级（A/B/C/D）
    - 政策风险信号灯（绿/黄/红）
    - Go/No-Go建议+理由
    - 如Go→建议深度分析的优先模块

快速扫描 vs 深度分析对照:
  | 维度 | 快速扫描 | 深度分析 |
  |------|---------|---------|
  | 时间 | 15min | 3-5小时 |
  | 字数 | 3-5K | 60K+ |
  | Skills | 核心2个 | 全部5个 |
  | 深度 | L2-L3 | L3.5-L5 |
  | 用途 | 筛选/排除 | 投资决策 |
```

## Step 6: 完整执行流水线（v1.1集成）

```yaml
完整流水线:
  Phase 0 - 数据采集:
    skill: data-collector
    说明: WebSearch获取公司+行业+政策+碳价实时数据
    输出: 标准化数据包(data_package)
    参考: docs/parallel_agent_prompts.md

  Phase 1 - 5 Skill分析:
    模式A(串行): Step 2执行顺序
    模式B(并行): docs/parallel_agent_prompts.md Wave1→Wave2
    输出: 5份skill分析报告

  Phase 2 - 报告组装:
    skill: report-assembler
    说明: 交叉验证+冲突标记+章节编排+质量门控
    输出: 完整投资分析报告

执行命令:
  深度分析: "分析{公司名}" → Phase 0→1→2 全流程
  快速扫描: "/quick-scan {公司名}" → 仅Layer1数据+2核心skills+1页摘要
  单skill: "用lcoe分析{公司名}" → 仅数据采集+指定skill
```

## 重要规则

- 子行业识别不确定时→询问用户确认
- 并行模式需用户明确同意后启动
- 快速扫描结果不作为投资建议，仅用于筛选
- 每个Skill输出必须标注数据质量等级
- 跨Skill数据冲突时→标记冲突点+两种结论并列
- 数据采集(data-collector)必须在skills执行前完成
- 报告组装(report-assembler)必须在所有skills完成后执行
