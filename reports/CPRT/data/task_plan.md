# CPRT Tier 3 执行计划
> 自动生成 by 编排器 v22.0 | 2026-03-10
> **框架版本**: v18.2 (DAG-Aware) + B2B平台行业框架 v1.0
> **行业**: B2B平台 (双边拍卖/交易所 × 物理基础设施平台)

---

## Scope Lock (DAG-0)

### Goal
深度分析Copart Inc. (CPRT)的投资价值：在CQI #1品质(55.6加权分)、估值回调41%($64→$37)、三重冲击(Progressive转移+DOJ调查+Q2业绩miss)的背景下，判断当前价格是否反映了过度恐慌还是理性重定价。

### Out of Scope
1. ACV Auctions深度分析(不同赛道: 经销商批发 vs 保险打捞)
2. 自动驾驶L4/5的详细技术分析(影响在2035+年之后)
3. Purple Wave独立估值(规模太小, 缺数据)
4. 个股推荐/买入卖出建议
5. CPRT以外公司的完整财务分析
6. 气候变化长期预测模型

### 环境指纹
```yaml
env_fingerprint:
  framework_version: "v18.2"
  industry_framework: "b2b_platform_deep v1.0"
  data_date: "2026-03-10"
  stock_price_cutoff: "$37.39 @ 2026-03-08"
  market_cap: "$36.4B"
  ev: "~$31.3B"
  mcp_tools: [baggers_summary, fmp_data, analyze_stock, polymarket_events]
  target_chars: "240K-375K (hardfloor 200K)"
```

### 停止条件
1. 5个CQ全部有EC支撑的回答
2. Reverse DCF完成 + 隐含假设逐条拆解
3. 寡头博弈三层分析完成(定价/产能/并购)
4. Kill Switch ≥12个 + 每个有可观测阈值
5. 报告总字符数 ≥240K

### 风险/失败模式
1. **准备不足** → 已通过5路侦察+lit_recon+B2B框架缓解
2. **数据单源** → 强制CCC+Copart 10-K+RB Global财报交叉验证
3. **Progressive影响高估/低估** → 需独立量化而非依赖分析师观点
4. **DOJ假精度** → 禁止编造罚款数字, 只做情景分析
5. **隐含租金双重计算** → 严格遵循B2B框架"隐含资产估值模块"

---

## 可能性宽度评估 (PW)

| 维度 | 评分 | 说明 |
|------|------|------|
| 业务模型不确定性 | 2 | 成熟拍卖平台, 模型清晰 |
| 技术颠覆可能性 | 3 | ACV+数字化有潜在威胁但非近期 |
| 竞争格局变化 | 5 | Progressive转移+RB Global投资=显著不确定 |
| 监管/法律风险 | 5 | DOJ调查2.5年未解, 结果不可预测 |
| 估值合理性争议 | 4 | 41%跌幅后多空分歧大 |
| **总分** | **3.8** | **→ 传统框架(偏低PW), 带条件评级** |

**路由**: PW 3.8 → **传统框架** — SOTP/DCF → 目标价+评级
但DOJ和Progressive各自需要条件化分析(如果X则评级Y)

---

## Question DAG (核心问题树)

### L1 核心问题 (5个CQ)

```yaml
question_dag:
  L1:
    - id: CQ-1
      question: "CPRT的量价天平: 美国保险单位-10.7%是周期性还是结构性? ASP+6%能否持续补偿量缩?"
      weight: 25%
      L2:
        - id: Q-L2-01a
          question: "消费者放弃碰撞险/提高免赔额的趋势是可逆的周期行为还是结构性保险覆盖收缩?"
          minimum_observation: "WebSearch: US auto insurance coverage trends 2020-2026 + uninsured motorist rates"
          owner: Agent_A
          stop: "找到≥3年数据+经济周期相关性分析"
        - id: Q-L2-01b
          question: "ASP+6%的驱动是流动性溢价(可持续)还是二手车价格周期(不可持续)?"
          minimum_observation: "fmp_data: CPRT ASP vs Manheim Index correlation"
          owner: Agent_C
          stop: "5年ASP vs 二手车指数相关性计算完成"
        - id: Q-L2-01c
          question: "TLF 24.2%→30%的年化增速回测: 历史上TLF每年增长多少pp?"
          minimum_observation: "CCC数据: TLF 2015-2025逐年 + 5年/10年CAGR"
          owner: Agent_C
          stop: "增速趋势线+到达30%的时间估算完成"

    - id: CQ-2
      question: "Progressive转移是多米诺骨牌还是孤立事件? 对CPRT的年化影响是多少?"
      weight: 20%
      L2:
        - id: Q-L2-02a
          question: "Progressive在CPRT中的年化单位量/收入贡献估算(从~25%→~10%的损失)"
          minimum_observation: "Progressive保费规模×TLF×CPRT前份额 → 单位损失量化"
          owner: Agent_C
          stop: "年化收入影响估算完成(区间)"
        - id: Q-L2-02b
          question: "保险公司选择打捞合作伙伴的决策因子权重: ASP vs 费率 vs 产能 vs 关系?"
          minimum_observation: "In Practise专家访谈+Copart/RB Global管理层引述"
          owner: Agent_A
          stop: "决策因子矩阵完成+Progressive转移原因确认"
        - id: Q-L2-02c
          question: "其他top 5保险公司(State Farm/GEICO/Allstate/USAA)的分配是否有变动信号?"
          minimum_observation: "WebSearch + 10-K客户集中度披露"
          owner: Agent_B
          stop: "每家保险公司的当前分配确认(或标注为不可知)"

    - id: CQ-3
      question: "$37是过度恐慌还是理性重定价? Reverse DCF隐含什么假设?"
      weight: 25%
      L2:
        - id: Q-L2-03a
          question: "$37/25x P/E隐含的TLF终值、利润率、增速假设是什么?"
          minimum_observation: "Python Reverse DCF: 从$37反推→隐含假设集"
          owner: Agent_C
          stop: "Reverse DCF完成+隐含假设逐条列出"
        - id: Q-L2-03b
          question: "隐含租金SOTP: 运营平台值多少(用调整后OPM) + 土地银行值多少?"
          minimum_observation: "报告OPM 37% vs 调整后29.6% + 土地公允$4.5B验证"
          owner: Agent_C
          stop: "SOTP完成+与市值对比+交叉验证"
        - id: Q-L2-03c
          question: "可比估值: CPRT 25x vs ICE/MCO/V的历史P/E带+专才溢价合理性?"
          minimum_observation: "fmp_data: 5家B2B平台公司P/E 10年历史"
          owner: Agent_C
          stop: "可比矩阵完成+溢价/折价解释"

    - id: CQ-4
      question: "DOJ调查应折价多少? 最坏/基准/最好情景分别是什么?"
      weight: 15%
      L2:
        - id: Q-L2-04a
          question: "DOJ反洗钱调查的可能结果: 罚款范围+运营限制+和解条件?"
          minimum_observation: "WebSearch: 类似DOJ反洗钱案例(Western Union/HSBC/TD Bank)结果"
          owner: Agent_B
          stop: "≥3个类比案例+罚款/限制范围"
        - id: Q-L2-04b
          question: "如果国际买家访问受限(最坏), ASP下降多少→对CPRT收入/利润的冲击?"
          minimum_observation: "国际买家占38-40%单位+50%收益, 敏感性分析"
          owner: Agent_B
          stop: "3情景敏感性矩阵完成"

    - id: CQ-5
      question: "RB Global能否缩小竞争差距? 寡头均衡向哪个方向演化?"
      weight: 15%
      L2:
        - id: Q-L2-05a
          question: "RB Global土地扩张速度: 13,600英亩→何时达到CPRT的19,500公顷? 需要多少资本?"
          minimum_observation: "RB Global CapEx + 土地价格 + NIMBY约束"
          owner: Agent_A
          stop: "差距收敛时间线估算完成"
        - id: Q-L2-05b
          question: "寡头博弈三层分析: 定价/产能/并购的当前均衡点和破裂条件?"
          minimum_observation: "B2B平台框架'寡头博弈模块'执行"
          owner: Agent_A
          stop: "三层支付矩阵+均衡判断+破裂条件≥3个"
        - id: Q-L2-05c
          question: "RB Global OPM 从~25%向CPRT 37%收敛的路径和概率?"
          minimum_observation: "RB Global财报趋势+结构性差异(债务/土地所有率)分析"
          owner: Agent_C
          stop: "利润率收敛模型完成(含结构性上限)"

  definitions:
    - "TLF: Total Loss Frequency = 全损车辆数/事故车辆数"
    - "ASP: Average Selling Price = 拍卖平均成交价"
    - "OPM: Operating Profit Margin = 营业利润率"
    - "隐含租金: 自有土地的市场租金等价值($317M/年, 7% cap rate)"
    - "PIP: Percentage Incentive Program = 费率与成交价挂钩的合同模式"
    - "Cat event: 自然灾害(飓风等)引发的大量全损车辆"

  preflect_nodes:
    - trigger: "Phase 2开始前"
      questions:
        - "估值框架是否匹配PW 3.8(传统)? 是否需要条件化?"
        - "隐含租金调整方法是否确定(扣除法 vs 总额法)? 禁止两种都用然后加总"
    - trigger: "Phase 4开始前"
      questions:
        - "对抗策略是否覆盖Progressive+DOJ两大承重墙?"
        - "是否存在系统性乐观(被管理层$1.1B回购信号影响)?"
```

---

## Agent团队分配

### 3+1架构

| 代号 | 角色 | 核心身份 |
|------|------|---------|
| **Agent A** | 叙事策略 | 穿透公司自我叙事, 找到真正竞争身份。CPRT是"拍卖平台"还是"土地银行+流动性引擎"? |
| **Agent B** | 风险竞争 | 找投资论文中最脆弱假设。Progressive转移+DOJ是"已知的已知"还是"冰山一角"? |
| **Agent C** | 估值综合 | 市场隐含假设>我认为值多少。$37隐含了什么? 6方法收敛还是发散? |
| **QSA** | 质量哨兵 | 脚本检查: DM密度/EC完整性/合规/数值一致性 |

### Phase-Agent映射

| Phase | DAG | Agent分配 | EC Target | 最低Agent数 |
|-------|-----|-----------|-----------|:-----------:|
| **P0+0.5** | DAG-0+1 | 编排器+数据预取×3 | EC-FIN/MKT draft | 3 |
| **P0.75** | — | 编排器 | thesis_crystallization.md | 1 |
| **P1** | DAG-2 | A(平台身份+保险锁定)+B(竞争格局+RB Global)+C(财务基线) | 口径锁定+EC(draft) | 3 |
| **P2** | DAG-3 | C(Reverse DCF+SOTP)+B(承重墙)+A(反周期验证) | 估值EC | 3 |
| **P3** | DAG-2+3 | A(寡头博弈)+C(五引擎+TLF天花板)+B(护城河量化) | 护城河+引擎EC | 3 |
| **P3.5** | — | A(AI冲击矩阵) | AI影响评估 | 1 |
| **P4** | DAG-4 | B(**Bear隔离**: RT-1~7)+QSA(EC验证) | 红队EC | 3 |
| **P5** | DAG-5 | A(综合评估)+B(KS/TS注册)+C(CQ闭环) | Complete | 3 |
| **合计** | | | | **≥23** |

---

## B2B平台专用框架清单 (Phase 0吸收)

### 通用必选
- [ ] 逆向估值 (Reverse DCF → 隐含假设) — `/assumption-audit` M1
- [ ] A-Score品质评分 (21维度) — `docs/company_quality_scoring.md` (CPRT基线已有: 5/7, 55.6加权)
- [ ] 风险拓扑 (协同/反协同矩阵) — `/risk-topology`
- [ ] Kill Switch (≥12个, KS-N格式) — `docs/deep_dive_protocol.md`
- [ ] 非共识洞察注册表 (CI-N格式) — Phase 1-3持续注册
- [ ] DM锚点体系 — `docs/confidence_system.md`

### B2B平台专用 (docs/industry/b2b_platform_deep.md)
- [ ] I×L双轴评分 (基础设施嵌入度×流动性壁垒) — Phase 0
- [ ] 寡头博弈三层分析 (定价/产能/并购) — Phase 3
- [ ] 隐含资产估值 (三步: 识别→调整OPM→SOTP) — Phase 2
- [ ] 双边市场经济学 (4测试+KPI+Take Rate弹性) — Phase 1+3
- [ ] 世俗趋势天花板 (TLF天花板5步法) — Phase 3
- [ ] 反周期资产分析 (传导机制+历史回测) — Phase 2
- [ ] 保险生态链锁定 (五层模型) — Phase 1

### 历史冠军方法 (可选复用)
- [ ] 信念反演 (KLAC冠军) → Reverse DCF隐含信念集
- [ ] 承重墙联合概率 (INTC冠军) → Progressive+DOJ联合概率
- [ ] CI-01"史上最贵的周期股" (NVDA冠军) → 适配"基础设施公司的周期性错配"
- [ ] 温水煮青蛙 (LRCX冠军) → 寡头差距缓慢缩小的情景

---

## 关键风险 + 看空计划

### 承重墙 (Phase 2脆弱性分析)
| 承重墙 | 当前状态 | 倒塌阈值 | 影响 |
|--------|---------|---------|------|
| TLF世俗趋势 | 24.2%↑ | TLF连续2年下降(AV渗透?) | -20-30%估值 |
| 保险客户锁定 | 19/25 | 第二家top-5保险公司转移 | -15-25%估值 |
| 流动性飞轮 | 1M vs 300K | 国际买家访问受限(DOJ) | -25-40%估值 |
| 土地壁垒 | 90%自有 | 无(不可逆, 除非立法征收) | 极低风险 |
| OPM结构优势 | 37% vs 25% | RB Global OPM>32%(5年内) | -10-15%估值 |

### 看空篇幅目标
- **硬性**: ≥18% (≥43K字符/240K)
- **目标**: ≥25% (≥60K字符/240K)
- Bear Agent Phase 4: Contamination Guard启用, 独立形成判断

### Pre-mortem (本报告最可能失败的原因)
1. **Progressive影响量化过于精确** → 实际合同结构不透明, 禁止假精度
2. **DOJ折价主观** → 必须用类比案例锚定, 不是拍脑袋
3. **被管理层回购信号影响偏乐观** → Phase 4必须独立挑战
4. **隐含租金双重计算** → 严格二选一(扣除法 or 总额法)
5. **忽略RB Global进步** → 不能因为"CPRT品质#1"就低估竞争者

---

## 门禁检查点

| 检查点 | 脚本 | 阻断条件 |
|--------|------|---------|
| Phase完成 | `phase_complete.sh CPRT {N} {报告} {字符数}` | sentinel FAIL |
| Phase 0.75 | 手动 | thesis_crystallization.md 缺失或<1500字符 |
| EC验证 | `verify_data_sources.sh` | completeness<95% |
| 发布合规 | `grep -i "invasion\|入侵"` | violations>0 |
| Complete | `quality_gate_complete.sh` | CG1-14任一FAIL |

---

## 执行顺序总览

```
[已完成] Phase -1: tier3_launch.sh → knowledge_context.md ✓
[已完成] Phase -0.5: 5路WebSearch → lit_recon_memo.md ✓
[已完成] Preflight Gate: CLEARED ✓
[已完成] DAG-0: Scope Lock + Question DAG + Task Plan ✓

[下一步] Phase 0: 数据预取 + I×L评分 + A-Score基线 + SGI
[下一步] Phase 0.5: CQ路由 + 市场关注雷达
[下一步] Phase 0.75: 核心矛盾结晶 → thesis_crystallization.md
[后续]   Phase 1-5: 按Agent映射执行
```
