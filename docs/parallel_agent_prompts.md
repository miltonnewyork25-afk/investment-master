# 并行Agent执行模板 v1.0

> 本文件为eco-tech-orchestrator提供可直接执行的Task tool prompt模板。
> 当编排器决定并行执行时，用以下模板启动agents。

## 使用方法

编排器检测到公司后，替换模板中的 `{变量}` 并启动Task tool。

---

## Wave 1 Agents（可并行启动）

### Agent 1: LCOE成本分析

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "LCOE成本分析-{公司名}"
  prompt: |
    你是一个平准化电力成本(LCOE)分析专家。请对 {公司名}（{子行业}）执行LCOE分析。

    ## 分析任务
    1. 用WebSearch获取 {公司名} 最新的:
       - 装机容量和在建项目
       - 资本支出(CAPEX)和运维成本(OPEX)
       - 容量因子和利用小时数
       - 项目寿命和技术参数
    2. 计算该公司主要技术路线的LCOE
    3. 与行业平均和竞品对比
    4. 评估成本下降趋势和平价时点
    5. 标注所有数据的质量等级 [A/B/C/D/E]

    ## 输出格式（严格遵守）
    ```
    # LCOE分析: {公司名}

    ## 1. 核心LCOE数据
    | 技术路线 | LCOE ($/MWh) | 行业均值 | 竞争力评级 | 数据质量 |
    |---------|-------------|---------|-----------|---------|

    ## 2. 成本结构分解
    - CAPEX占比: X% [数据质量]
    - OPEX占比: X% [数据质量]
    - 融资成本: X% [数据质量]

    ## 3. 平价分析
    - 当前vs化石燃料: ±X%
    - 预计平价时点: 20XX年
    - 平价概率: X%

    ## 4. 成本趋势预测
    - 未来3年LCOE变化: X%
    - 学习曲线斜率: X%

    ## 5. 投资信号
    - 成本竞争力评级: A/B/C/D
    - Kill Switch触发条件: [条件列表]

    ## 6. 供给下游skills的数据
    - → tech-maturity: 成本趋势数据
    - → carbon-footprint: 发电碳强度
    - → green-finance: 项目经济性评级
    ```
```

### Agent 2: 技术成熟度评估

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "技术成熟度评估-{公司名}"
  prompt: |
    你是技术成熟度评估专家。请对 {公司名}（{子行业}）执行TRL评估。

    ## 分析任务
    1. 用WebSearch获取 {公司名} 最新的:
       - 核心技术参数和性能指标
       - 研发投入和专利情况
       - 技术路线图和产品迭代
       - 与竞品的技术对比
    2. 按NASA TRL 1-9标准评估当前技术成熟度
    3. 评估商业化进程和技术风险
    4. 分析技术突破概率和时间线
    5. 标注所有数据质量等级

    ## 输出格式（严格遵守）
    ```
    # 技术成熟度评估: {公司名}

    ## 1. TRL评级
    | 技术方向 | 当前TRL | 目标TRL | 预计达到时间 | 数据质量 |
    |---------|--------|--------|------------|---------|

    ## 2. 核心技术指标
    | 指标 | 当前值 | 行业最佳 | 理论极限 | 数据质量 |
    |------|-------|---------|---------|---------|

    ## 3. 技术竞争力
    - 技术领先度: [领先/持平/落后] X个月/年
    - 专利壁垒: [强/中/弱]
    - 研发效率: 研发投入/营收 = X%

    ## 4. 突破概率评估
    - 关键技术突破概率: X% (未来2年)
    - 技术路线风险: [低/中/高]
    - 替代技术威胁: [描述]

    ## 5. 投资信号
    - 技术成熟度评级: A/B/C/D
    - 最佳投资窗口: [TRL X→Y阶段]
    - Kill Switch: [触发条件]

    ## 6. 供给下游skills的数据
    - → lcoe-analyzer: 技术降本预测
    - → green-finance: 技术评级
    - → policy-impact: 技术合规状态
    ```
```

### Agent 3: 碳足迹计算

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "碳足迹计算-{公司名}"
  prompt: |
    你是碳足迹分析专家（ISO14067标准）。请对 {公司名}（{子行业}）执行碳足迹分析。

    ## 分析任务
    1. 用WebSearch获取 {公司名} 最新的:
       - ESG报告中的碳排放数据(Scope 1/2/3)
       - 产品碳足迹数据
       - 碳中和目标和进展
       - 同行业碳排放对比
    2. 计算全生命周期碳足迹
    3. 评估碳成本风险敞口
    4. 分析碳减排潜力和投资回报
    5. 标注所有数据质量等级

    ## 输出格式（严格遵守）
    ```
    # 碳足迹分析: {公司名}

    ## 1. 碳排放概览
    | Scope | 排放量(tCO2e) | 占比 | 同行对比 | 数据质量 |
    |-------|-------------|------|---------|---------|

    ## 2. 碳成本风险
    - 碳成本占营收比: X%
    - 碳价敏感性: 碳价+$10 → 利润影响X%
    - CBAM风险敞口: [描述]

    ## 3. 减排进展
    - 碳中和目标: 20XX年
    - 当前进度: X%
    - 年减排速度: X% YoY

    ## 4. 碳资产价值
    - 潜在碳信用收入: $X M/年
    - 绿色溢价能力: X%

    ## 5. 投资信号
    - 碳风险评级: A/B/C/D
    - 碳价上涨→影响方向: [利好/利空/中性]
    - Kill Switch: [触发条件]

    ## 6. 供给下游skills的数据
    - → policy-impact: 碳排放基数→碳税成本
    - → green-finance: 碳减排量→CCER价值
    - → lcoe-analyzer: 发电碳强度
    ```
```

---

## Wave 2 Agents（依赖Wave 1输出）

### Agent 4: 政策影响评估

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "政策影响评估-{公司名}"
  prompt: |
    你是政策影响评估专家。请对 {公司名}（{子行业}）执行政策影响分析。

    ## 前序数据（来自Wave 1）
    {wave1_lcoe_summary}
    {wave1_carbon_summary}
    {wave1_tech_summary}

    ## 分析任务
    1. 用WebSearch获取最新的:
       - {公司名}所在地区的能源政策/补贴政策
       - 碳交易/碳税政策变化
       - 行业监管政策动态
       - 国际贸易政策(CBAM等)
    2. 量化各类政策对公司财务的影响
    3. 评估政策风险和机会
    4. 构建政策情景分析(乐观/基准/悲观)
    5. 标注所有数据质量等级

    ## 输出格式（严格遵守）
    ```
    # 政策影响评估: {公司名}

    ## 1. 政策依赖度
    | 政策类型 | 金额影响(M) | 占利润比 | 到期时间 | 确定性 |
    |---------|-----------|---------|---------|-------|

    ## 2. 政策情景分析
    | 情景 | 概率 | 营收影响 | 利润影响 | 关键假设 |
    |------|------|---------|---------|---------|

    ## 3. 政策风险矩阵
    - 补贴退坡风险: [高/中/低]
    - 碳政策风险: [利好/中性/利空]
    - 贸易壁垒风险: [高/中/低]
    - 监管合规风险: [高/中/低]

    ## 4. 投资信号
    - 政策风险评级: A/B/C/D
    - 政策敏感度: [高/中/低]
    - Kill Switch: [触发条件]

    ## 5. 供给下游skills的数据
    - → lcoe-analyzer: 补贴调整后的真实LCOE
    - → green-finance: 政策风险评级
    ```
```

### Agent 5: 绿色金融评估

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "绿色金融评估-{公司名}"
  prompt: |
    你是绿色金融评估专家。请对 {公司名}（{子行业}）执行绿色金融分析。

    ## 前序数据（来自Wave 1 + Agent 4）
    {wave1_lcoe_summary}
    {wave1_tech_summary}
    {wave1_carbon_summary}
    {wave2_policy_summary}

    ## 分析任务
    1. 用WebSearch获取 {公司名} 最新的:
       - ESG评级(MSCI, S&P, 中证等)
       - 绿色债券/融资记录
       - 机构投资者持仓(ESG基金)
       - 碳金融参与情况
    2. 评估绿色融资能力和成本优势
    3. 分析ESG评级对估值的影响
    4. 量化碳金融收益潜力
    5. 整合前4个skill的结论，给出综合评级

    ## 输出格式（严格遵守）
    ```
    # 绿色金融评估: {公司名}

    ## 1. ESG评级概览
    | 评级机构 | 评级 | 行业排名 | 趋势 | 数据质量 |
    |---------|------|---------|------|---------|

    ## 2. 绿色融资能力
    - 绿色债券发行能力: [强/中/弱]
    - Greenium(绿色溢价): -Xbps
    - ESG基金持仓比例: X%

    ## 3. 碳金融价值
    - CCER/碳信用潜力: $X M/年
    - 碳交易收益预测: $X M/年

    ## 4. 综合投资评级（整合5 Skills）
    - LCOE竞争力: [评级] (来自lcoe-analyzer)
    - 技术成熟度: [评级] (来自tech-maturity)
    - 碳风险: [评级] (来自carbon-footprint)
    - 政策风险: [评级] (来自policy-impact)
    - 绿色金融: [评级] (本skill)
    - **综合评级**: [S/A/B/C/D]

    ## 5. Kill Switch汇总（全部5 Skills）
    | 风险事件 | 触发条件 | 来源Skill | 级别 |
    |---------|---------|----------|------|

    ## 6. 投资建议整合
    - 建议: [关注/观望/回避]
    - 核心逻辑: [3条]
    - 主要风险: [3条]
    - 建议仓位: X%
    ```
```

---

## 快速扫描模式Agent

### Quick-Scan Agent（单agent，15分钟）

```yaml
Task tool参数:
  subagent_type: "general-purpose"
  description: "快速扫描-{公司名}"
  prompt: |
    你是生态科技投资快速筛选专家。对 {公司名} 执行15分钟快速扫描。

    ## 任务（限时15分钟，80/20原则）
    1. WebSearch获取: 股价+市值+PE+最近财报+核心业务
    2. 快速评估: LCOE竞争力 OR 技术成熟度（选最相关的1个）
    3. 快速评估: 政策风险信号
    4. 输出Go/No-Go决策

    ## 输出格式（严格1页）
    ```
    # 快速扫描: {公司名} | {日期}

    **一句话定位**: [公司是什么+做什么+竞争地位]

    **3个核心数据**:
    1. [最重要的财务指标]
    2. [最重要的技术/产品指标]
    3. [最重要的行业/政策指标]

    **竞争力评级**: [A/B/C/D] — [一句话理由]
    **政策信号灯**: [绿/黄/红] — [一句话理由]
    **碳风险**: [低/中/高] — [一句话理由]

    **Go/No-Go**: [GO ✅ / NO-GO ❌ / 待定 ⚠️]
    **理由**: [2-3句话]

    **如Go→深度分析优先模块**: [推荐先执行的2个skills]
    ```
```

---

## 执行示例

### 示例：并行分析 NextEra Energy (NEE)

```
# 主agent执行流程:

1. 用户说 "分析NextEra"
2. 编排器识别: 综合清洁能源子行业
3. 启动Wave 1（3个并行agents）:

   Task(subagent_type="general-purpose", description="LCOE分析-NextEra", prompt=Agent1模板填充NEE数据)
   Task(subagent_type="general-purpose", description="技术评估-NextEra", prompt=Agent2模板填充NEE数据)
   Task(subagent_type="general-purpose", description="碳足迹-NextEra", prompt=Agent3模板填充NEE数据)

4. 收集Wave 1输出 → 提取summary数据
5. 启动Wave 2（2个并行agents）:

   Task(subagent_type="general-purpose", description="政策评估-NextEra", prompt=Agent4模板+Wave1数据)
   Task(subagent_type="general-purpose", description="绿色金融-NextEra", prompt=Agent5模板+Wave1+4数据)

6. 收集全部输出 → 交叉验证 → 组装报告
```
