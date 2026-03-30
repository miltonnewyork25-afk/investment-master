# Cloudflare (NET) — MECE数据收集与分析规划 v1.0
> **日期**: 2026-03-30 | **目标**: Tier 3深度分析, ≥270K字符, ≥4.4分
> **框架**: v19.9 | **行业**: 生态科技 | **系数**: ×1.1
> **参考报告**: CRWD(162K/审慎关注), DDOG(343K/审慎关注), ANET(279K/4.0), CRM(230K/4.1)

---

## 一、公司定位与框架路由

### NET核心画像
- **业态**: 边缘云平台 (Edge Cloud Platform) — CDN + 安全 + 开发者平台 + AI推理
- **商业模式**: Freemium漏斗 → 订阅 + 用量计费混合
- **可能性宽度(初步)**: 5-6分(中) → 混合模式(传统估值 + 可能性附录)
- **SaaS分类**: 基础设施SaaS(非应用SaaS) — 更像AWS/Vercel而非CRM/ADBE

### 框架路由决策
| 维度 | 判断 | 依据 |
|------|------|------|
| 分析系数 | ×1.1 | 生态科技标准 |
| 目标字符 | 270K-330K | Launch Brief建议240-375K, 取KLAC甜蜜区间 |
| 发现系统 | 部分适用(Parts 3,5可选) | PW=5-6, 非极宽 |
| OVM | 建议使用 | Workers AI/R2等新业务线有期权属性 |
| SaaS模块 | M1-M10全量 | NET是SaaS公司 |
| E×V双轴 | 不适用 | NET非清洁能源 |

### 最相似可比公司(铁律H P0强制对标)
| 公司 | 匹配维度 | PE | 增速 | 市值 | 对标价值 |
|------|---------|-----|------|------|---------|
| **DDOG** | SaaS+高增长+SBC+使用计费 | ~49x Non-GAAP | ~28% | $47B | SBC动态/Owner PE/NRR |
| **CRWD** | 安全+平台化+SBC+高估值 | ~64x Non-GAAP | ~24% | $100B | 安全护城河/SBC收敛 |
| **ZS** | 零信任安全+高增长 | ~60x Non-GAAP | ~30% | ~$30B | SASE定位竞争 |
| **FSLY** | CDN纯竞争对手 | 亏损 | ~10% | ~$1B | CDN边际成本/份额 |
| **AKAMAI** | CDN传统龙头 | ~15x | ~5% | ~$15B | 成熟CDN估值锚 |

---

## 二、MECE数据收集矩阵 (7层×25维度)

### Layer 1: 业务理解 (Business Understanding)

#### 1.1 收入结构拆解 [M1 收入结构与增速质量]
**数据需求**:
- [ ] 收入按产品线拆分: (a)CDN/性能 (b)安全(WAF/DDoS/Zero Trust) (c)开发者平台(Workers/R2/D1) (d)AI(Workers AI/AI Gateway/Vectorize)
- [ ] 订阅 vs 使用计费比例 (subscription vs. usage-based split)
- [ ] 地理收入分布 (美国/欧洲/亚太)
- [ ] 有机增速 vs 并购贡献(NET很少做大并购)
- [ ] 5年收入CAGR + 季度趋势(加速/减速判断)
**数据来源**: FMP income-statement + 10-K收入分解 + 管理层Earnings Call
**Skill**: `/data-prefetch` + MCP `fmp_data`

#### 1.2 客户结构与扩展 [M2 SaaS单位经济学]
**数据需求**:
- [ ] 大客户分层: $100K+ / $500K+ / $1M+ 客户数量趋势
- [ ] 总付费客户数 + 免费→付费转化率
- [ ] NRR(净收入留存率) — NET是否公开？不公开→间接推断法
- [ ] GRR(毛收入留存率) — DR变化率法交叉验证(EVO-ADSK-02)
- [ ] Magic Number: 季度净新ARR×4 / 前季S&M
- [ ] S&M效率: 新增ARR / S&M费用 趋势
- [ ] CAC Payback Period
- [ ] cRPO(当期剩余履约义务)增速 vs 收入增速 gap
**数据来源**: 10-K/10-Q + Earnings Call + FMP
**参考方法**: CRM v2.0 NRR间接法 + ADSK DR变化率法
**Skill**: `/investment-logic-toolkit`

#### 1.3 产品矩阵与生命周期 [定制]
**数据需求**:
- [ ] 产品时间线: CDN(2010)→Security(2014)→Workers(2017)→R2(2022)→AI(2023)
- [ ] 各产品线ARR或收入贡献估计
- [ ] 产品采用率: 平均每客户使用产品数趋势
- [ ] 第二曲线验证(P4标准): 安全/开发者平台是否通过四项全检？
  - 规模(收入占比>10%?) + 增速(>主业?) + 利润率(>0?) + 资本配置(R&D投入占比?)
**数据来源**: 管理层披露 + 10-K + 行业分析

---

### Layer 2: 竞争格局 (Competitive Position)

#### 2.1 CDN/性能市场 [M4 护城河与迁移]
**数据需求**:
- [ ] CDN市场份额: NET vs Akamai vs AWS CloudFront vs Fastly
- [ ] W3Techs/BuiltWith网站使用份额数据
- [ ] CDN成本结构对比(带宽成本/PoP数量/延迟性能)
- [ ] CDN市场增速与NET增速对比(份额扩张?)
**数据来源**: WebSearch + 行业报告 + W3Techs数据

#### 2.2 安全市场(SASE/Zero Trust) [M4]
**数据需求**:
- [ ] Gartner SSE/SASE魔力象限定位(NET vs ZS vs PANW)
- [ ] Zero Trust市场规模与增速
- [ ] NET安全收入增速 vs ZS/PANW增速
- [ ] 安全产品Win Rate代理(G2评分+review量, EVO-ADSK-03)
**数据来源**: Gartner + G2/PeerInsights + WebSearch

#### 2.3 开发者平台 [M4]
**数据需求**:
- [ ] Workers vs AWS Lambda@Edge vs Vercel Edge Functions vs Deno Deploy
- [ ] 开发者采用指标: npm包下载量/GitHub stars/Stack Overflow趋势
- [ ] R2 vs S3定价对比(0出口费用的竞争优势量化)
- [ ] D1(SQLite at edge) vs PlanetScale vs Neon
- [ ] Pages/KV/Durable Objects使用趋势
**数据来源**: npm/GitHub + WebSearch + 开发者社区

#### 2.4 AI推理市场 [M3 AI影响评估]
**数据需求**:
- [ ] Workers AI vs AWS Bedrock vs Azure AI vs Google Cloud AI 定位差异
- [ ] 边缘AI推理 vs 数据中心推理: 延迟/成本/隐私tradeoff
- [ ] AI Gateway使用量数据
- [ ] Vectorize(向量数据库)vs Pinecone vs Weaviate
- [ ] AI公司作为NET客户的增长(AI基础设施需求=CDN+安全)
**数据来源**: WebSearch + 管理层披露

---

### Layer 3: 财务深潜 (Financial Deep Dive)

#### 3.1 利润表诊断 [CPA×ISDD M1]
**数据需求**:
- [ ] 5年P&L趋势: Revenue/COGS/GM/R&D/S&M/G&A/OPM
- [ ] 毛利率趋势(应保持75-78%稳定?)
- [ ] 运营杠杆检测: 费用率(R&D%/S&M%/G&A%)趋势
- [ ] profit_lag计算: 收入增速 vs 营业利润增速
- [ ] SBC瀑布分析(EVO-ADSK-01):
  - SBC/Revenue趋势(5年)
  - SBC按部门分解(R&D/S&M/G&A)
  - RSU授予量 vs vest量 vs 回购量
- [ ] 三PE并列(铁律N强制):
  - GAAP PE
  - Non-GAAP PE(管理层口径)
  - Owner PE = 市值/(GAAP净利润-SBC)
- [ ] 盈利质量清洗: GAAP vs Non-GAAP差距%
**数据来源**: FMP + 10-K + Python验证
**参考**: CRWD三角悖论(SBC锁死利润率) + DDOG Owner PE 188x

#### 3.2 资产负债表诊断 [CPA×ISDD M2]
**数据需求**:
- [ ] 现金/短期投资 vs 总债务
- [ ] 商誉/无形资产占总资产比
- [ ] 递延收入趋势(SaaS健康度信号)
- [ ] 应收账款DSO趋势
- [ ] Net debt or net cash position
**数据来源**: FMP balance-sheet

#### 3.3 现金流诊断 [CPA×ISDD M3]
**数据需求**:
- [ ] FCF margin趋势(5年)
- [ ] FCF/NI比率(确认利润真实性)
- [ ] CapEx拆解: 网络扩展(Growth) vs 维护(Maintenance)
- [ ] CapEx/Revenue趋势(NET需要持续扩展边缘网络)
- [ ] Owner FCF = FCF - SBC(真实股东回报)
- [ ] FCF yield vs Owner FCF yield
**数据来源**: FMP cash-flow + 10-K CapEx披露

#### 3.4 资本配置与回购效率 [CPA×ISDD M5+η]
**数据需求**:
- [ ] 资本配置优先级: 再投资/M&A/回购/分红
- [ ] 回购η效率 = 1 - (SBC dilution offset / total buyback)
- [ ] 稀释率趋势(WASO变化)
- [ ] M&A ROIC(如有大并购)
**数据来源**: FMP + 10-K
**参考**: ADSK η=0.11(回购幻觉标杆)

---

### Layer 4: 护城河与飞轮 (Moat & Flywheel)

#### 4.1 护城河五维评估 [CQI框架]
**数据需求**:
- [ ] **C1 嵌入性(转换成本)**: DNS配置迁移成本/Workers应用重写成本/安全策略迁移复杂度
- [ ] **C2 网络效应**: DDoS防御随流量增强/威胁情报广度/开发者生态密度
- [ ] **C3 规模经济**: 边缘网络PoP密度(330+城市)/带宽成本优势/R&D分摊
- [ ] **B4 定价权分层**(v19.6强制):
  - F500/大型企业: Stage? (合同年度/多年协议/提价能力)
  - 中型企业: Stage? (竞争压力/替代方案)
  - SMB/开发者: Stage? (免费替代品压力)
  - 免费用户: 转化率趋势
- [ ] **D1 周期性**: NET收入周期敏感度(SaaS=弱周期?)
**数据来源**: 10-K + 竞品对比 + 管理层

#### 4.2 护城河迁移评估 [M4 护城河迁移]
**数据需求**:
- [ ] 传统护城河(CDN性能/规模): 当前强度 + 侵蚀速度
- [ ] 新护城河(开发者生态/安全平台/AI): 建设进度
- [ ] 交叉点预测: 新护城河何时≥传统护城河
- [ ] 脆弱窗口期评估: 超大规模云商能否在窗口期攻入？
**参考**: ADBE护城河迁移(CC→AI, 进度约25%)

#### 4.3 飞轮验证 [M6 飞轮效应与摩擦力]
**数据需求**:
- [ ] **NET声称的飞轮**:
  ```
  更多客户 → 更多流量 → 更好的DDoS防御 → 更强的安全 → 吸引更多客户
  更多开发者 → 更多Workers应用 → 更多流量 → 更多数据 → 更好的产品
  ```
- [ ] 每个连接点独立验证(真实/弱/间接):
  - 更多流量→更好DDoS: **真实**(流量越大,攻击模式识别越准)
  - 更好DDoS→更多客户: **需验证**(是否是购买决策的核心因素?)
  - 更多开发者→更多流量: **弱**(开发者用Workers不一定产生大流量)
  - 更多数据→更好产品: **间接**(数据如何反馈到产品改进?)
- [ ] **飞轮悖论检测**(v19.6强制):
  - Workers AI成功→是否蚕食CDN收入?(边缘AI处理=减少回源流量?)
  - R2成功→是否蚕食CDN带宽收入?(用户数据本地化=减少跨区域传输?)
  - 安全产品成功→是否增加运营成本超过收入增量?
- [ ] 飞轮净强度计算(-1到+1)
- [ ] 叙事溢价PE估算(v1.1 EVO-CRWD-003): 当前P/FCF - 无飞轮同行P/FCF - PEG溢价
**参考**: MCO飞轮(3连接/1真实/净强度~0) + CRM飞轮悖论(-0.2)

---

### Layer 5: AI冲击分析 (AI Impact — AIAS v2.0)

#### 5.1 AI冲击五维评估 [M3 AI影响评估]
**数据需求**:
- [ ] **5S(供给侧冲击)**: AI如何改变NET的产品交付方式？
  - Workers AI: 边缘AI推理能力
  - AI Gateway: AI应用的API管理/缓存/监控
  - AI自动化运营: 减少内部运维成本?
- [ ] **5B(需求侧冲击)**: AI如何改变客户需求？
  - AI公司作为客户(LLM serving需要CDN+安全)
  - 企业AI应用需要边缘推理
  - AI驱动的安全威胁(AI生成的DDoS/钓鱼)→更多安全支出
- [ ] **M(迁移冲击)**: AI如何改变竞争格局？
  - 超大规模云商自建AI推理能力→边缘AI被侵蚀?
  - AI编码工具(Copilot/Cursor)降低Workers开发门槛→加速采用?
- [ ] **AIAS净影响评分**: -5到+5
- [ ] **Split Index**: 不同业务线AI影响差异
- [ ] **AI收入占比**: Workers AI ARR / 总ARR
**Skill**: `/ai-impact-analyzer`

#### 5.2 AI拐点信号 [预期差识别]
**数据需求**:
- [ ] 边缘AI推理 vs 数据中心AI推理 的拐点何时到来?
- [ ] Workers AI的PMF(Product-Market Fit)信号: 付费客户数/usage增速
- [ ] AI对NET TAM的影响: 扩大(+边缘AI推理市场) vs 压缩(云商自建)?
- [ ] 关键催化剂: 大客户迁移案例/合作伙伴公告/新AI产品发布
**Skill**: `/expectation-gap`

---

### Layer 6: 估值框架 (Valuation)

#### 6.1 Reverse DCF [铁律O: P1前置]
**数据需求**:
- [ ] 当前股价隐含的5年收入CAGR
- [ ] 当前股价隐含的终端利润率
- [ ] 当前股价隐含的高增长持续年数
- [ ] 与分析师共识对比: 合理/激进/极端?
**工具**: Python DCF模型

#### 6.2 DCF + SOTP [Phase 3]
**数据需求**:
- [ ] WACC计算(Beta/ERP/Risk-free rate)
- [ ] 5年收入预测(3情景)
- [ ] 终端利润率假设(参考DDOG/CRWD/ZS成熟期)
- [ ] SOTP分部估值(CDN/安全/开发者/AI分别估值)
- [ ] OVM: Workers AI/R2等期权价值
**工具**: Python + `/valuation-builder`

#### 6.3 可比估值 [Phase 3]
**数据需求**:
- [ ] 同行估值矩阵:
  | 指标 | NET | DDOG | CRWD | ZS | PANW | AKAMAI | FSLY |
  |------|-----|------|------|-----|------|--------|------|
  | EV/Rev(FY+1) | ? | ? | ? | ? | ? | ? | ? |
  | P/FCF | ? | ? | ? | ? | ? | ? | ? |
  | Owner PE | ? | ? | ? | ? | ? | ? | ? |
  | 增速 | ? | ? | ? | ? | ? | ? | ? |
  | SBC/Rev | ? | ? | ? | ? | ? | ? | ? |
  | FCF Margin | ? | ? | ? | ? | ? | ? | ? |
- [ ] PEG比较(EVO-S1: PEG替代PE)
- [ ] Rule of 40评分
**工具**: MCP `compare_stocks` + FMP

#### 6.4 情景分析 [Phase 3]
**数据需求**:
- [ ] Bull(30%概率): AI推理爆发+安全平台化+OPM>20%
- [ ] Base(45%概率): 稳健增长+渐进盈利+竞争平衡
- [ ] Bear(20%概率): 超大规模侵蚀+SBC不收敛+增速下台阶
- [ ] Black Swan(5%概率): 重大安全事故/竞争颠覆
- [ ] 每个情景的概率三重锚定(铁律N: 历史基准率+反例条件+自然实验)

---

### Layer 7: 风险拓扑与Kill Switch

#### 7.1 风险拓扑映射 [/risk-topology]
**数据需求**:
- [ ] 结构性风险: 超大规模云商自建CDN+安全(AMZN CloudFront/MSFT Azure CDN)
- [ ] 周期性风险: IT预算周期/企业支出减速
- [ ] 竞争风险: Akamai反击/ZS SASE整合/Fastly低价竞争
- [ ] 技术风险: QUIC/HTTP3标准演进/WebAssembly竞品
- [ ] 监管风险: 数据主权法规/内容审查争议/反垄断(间接)
- [ ] 风险间协同矩阵: 哪些风险同时发生会产生非线性冲击?
- [ ] "温水煮青蛙"场景: 渐进式份额侵蚀+SBC不收敛+估值压缩

#### 7.2 Kill Switch注册 [12字段标准]
**数据需求**:
- [ ] KS-01: NRR(如公开)或大客户增速连续2季<10%
- [ ] KS-02: SBC/Rev连续上升>25%
- [ ] KS-03: 毛利率<72%(带宽成本恶化信号)
- [ ] KS-04: F500客户流失>5%
- [ ] KS-05: Workers生态增速停滞(npm下载量/开发者数量)
- [ ] KS-06: 安全市场份额被ZS/PANW压缩(Gartner象限后退)
- [ ] KS-07: R2增速<50%(S3替代叙事失败)
- [ ] KS-08: CEO Matthew Prince大量卖出股票
- [ ] KS-09: 超大规模云商推出免费同等级CDN+安全
- [ ] KS-10: FCF margin连续2季下降>500bps

---

## 三、Skill映射矩阵 (24 Skills对齐)

| Phase | 核心Skill | 应用场景 |
|-------|----------|---------|
| P-1 | tier3_launch.sh | ✅已执行 |
| P-0.5 | WebSearch×5路 | ✅Agent执行中 |
| P0 | `/data-prefetch` | 17数据文件预取 |
| P0 | `/investment-logic-toolkit` | 温度计算+第一性原理 |
| P0 | `/moat-evaluator` | CQI初评 |
| P0.5 | `/expectation-gap` | 预期差识别(PEP模式匹配) |
| P0.75 | thesis_crystallization | 核心矛盾结晶 |
| P1 | `/competitive-benchmarking` | 竞争对标深度分析 |
| P1 | `/ai-impact-analyzer` | AI冲击AIAS评分 |
| P1 | `/consumer-brand-analysis-toolkit` | N/A(非消费品) |
| P2 | Financial Framework v2.0 | CPA×ISDD 7步 |
| P2 | `/valuation-builder` | Reverse DCF + DCF + SOTP |
| P2 | `/valuation-quality-gate` | 估值离散度+巨头框架 |
| P3 | `/assumption-audit` | 信念反演+共识解构+约束分类 |
| P3 | `/investment-committee` | 圆桌碰撞(CQ<70%触发) |
| P3.8 | `/cq-lifecycle-tracker` | CQ置信度演化 |
| P4 | `/red-team-suite` | RT-1~RT-7+双向校准+有效性门控 |
| P4 | `/risk-topology` | 风险拓扑+协同矩阵 |
| P4 | `/omission-scanner` | 遗漏扫描(近期行业事件) |
| P4.5 | pre_assembly_reference_scan | 缺口补齐参考 |
| P5 | `/deep-reflection` | R1行业基建+R2报告审计+R3评分 |
| P5 | `/content-engine` | 传播内容生成(如需要) |
| P5 | quality_gate_complete.sh | 8项硬门控 |
| 贯穿 | `/simple-recursive-thinking` | 关键决策点深度思考 |

---

## 四、质量对标与门控检查清单

### 8项硬门控目标 (全部PASS才能提交)
| 门控 | 阈值 | NET预估达标难度 |
|------|------|---------------|
| G1 字符 | ≥270K | 中(需充分展开7层分析) |
| G2 DM密度 | ≥1.5/千字 | 中(参考CRM 2.88) |
| G3 DM总数 | ≥450 | 中(270K×1.5=405, 需努力) |
| G4 Mermaid | ≥25 | 低(标准流程可保证) |
| G5 因果密度 | ≥5.0/万字 | 中(KLAC标杆9.28) |
| G6 Python验证 | 必须 | 低(标准流程) |
| G7 估值离散度 | ≤30% | 中(SBC口径选择是关键) |
| G8 CQ标记 | CQ1-CQ8 | 低(标准流程) |

### 11维度记分卡目标 (≥88/110 = 4.4分)
| 维度 | 目标分 | 关键保障 |
|------|--------|---------|
| D1 数据质量 | ≥8 | MCP×2源交叉验证+DM密度≥2.0 |
| D2 完整度 | ≥8 | 7层MECE保证无遗漏 |
| D3 分析深度 | ≥8 | 因果密度≥5.0+铁律N证据链 |
| D4 护城河 | ≥8 | CQI五维+飞轮验证+迁移评估 |
| D5 估值 | ≥8 | Reverse DCF+DCF+SOTP+可比+Python |
| D6 风险 | ≥8 | risk-topology+KS×10+协同矩阵 |
| D7 红队 | ≥8 | RT-1~7+双向校准+有效性门控 |
| D8 可读性 | ≥8 | 铁律N降认知负荷6规则 |
| D9 独立思考 | ≥7 | 圆桌+核心矛盾结晶 |
| D10 前瞻性 | ≥8 | AI冲击+行业拐点+预期差 |
| D11 一致性 | ≥8 | 铁律K估值统一+三PE并列 |

---

## 五、核心争议预判(CQ候选)

基于文献侦察(进行中)和参考报告,初步识别的核心争议:

| CQ | 争议 | 多方 | 空方 | 关键数据 |
|----|------|------|------|---------|
| CQ1 | 增速可持续性 | 安全+Workers双引擎驱动 | CDN增速天花板+竞争加剧 | 收入增速趋势+分部增速 |
| CQ2 | 安全平台化成功度 | Gartner认可+客户扩展 | 非核心安全→Win Rate? | ZS/PANW对比+Win Rate |
| CQ3 | SBC/盈利路径 | FCF已正+运营杠杆 | SBC不收敛→Owner PE极高 | SBC/Rev趋势+η效率 |
| CQ4 | 开发者平台飞轮 | Workers生态+R2增长 | 飞轮悖论+AWS竞争 | 开发者数据+R2增速 |
| CQ5 | AI机会vs风险 | 边缘AI推理独特定位 | 超大规模自建+GPU不在边缘 | Workers AI数据+AI TAM |
| CQ6 | 估值合理性 | 高增长SaaS应给溢价 | 三PE分歧大+SBC问题 | Reverse DCF+可比 |
| CQ7 | 竞争壁垒持久性 | 网络规模+开发者锁定 | CDN商品化+免费替代 | 份额趋势+转换成本 |
| CQ8 | 管理层资本配置 | Matthew Prince远见+执行力 | SBC慷慨+未证明盈利纪律 | 回购η+内部人交易 |

---

## 六、Phase执行计划

| Phase | 会话 | 目标字符 | 核心产出 |
|-------|------|---------|---------|
| P-1/P-0.5 | 本会话 | N/A | knowledge_context + lit_recon_memo |
| P0 | 本会话 | N/A | shared_context + checkpoint + prefetch |
| P0.5/P0.75 | 本会话 | N/A | CQ路由 + thesis_crystallization |
| **P1** | Session 2 | **≥80K** | 业务理解+竞争+护城河+AI冲击+飞轮 |
| **P2** | Session 3 | **≥60K** | 财务深潜+Reverse DCF+DCF初版 |
| **P3** | Session 4 | **≥50K** | 估值细化+情景+可比+SOTP+Python |
| **P4** | Session 5 | **≥30K** | 红队+风险拓扑+遗漏扫描+纠错回流 |
| **P5** | Session 6 | **组装** | Complete报告+质量门控+deep-reflection |
| **总计** | — | **≥270K** | 4.4+分目标 |

---

## 七、进化教训应用清单

| 教训来源 | 应用到NET | 具体措施 |
|---------|----------|---------|
| CRM v1.0失败 | 铁律O: Reverse DCF P1前置 | P1第一章必含Reverse DCF结论 |
| CRWD SBC三角悖论 | 三PE并列+Owner PE | SBC/Rev趋势+Owner PE计算 |
| DDOG SBC零收敛 | SBC收敛条件检查 | 3条件同时成立才触发收敛 |
| ADSK η=0.11 | 回购效率量化 | η计算+B6评分cap |
| MCO/CRM飞轮 | 飞轮悖论检测 | 每个连接点独立验证+净强度 |
| CRM/ADBE定价权剪刀差 | B4分层评估 | F500/Mid/SMB各层Stage |
| AMAT方法伪独立 | P2假设映射表 | 估值方法间假设重叠审计 |
| RBLX SBC四源交叉 | SBC数据交叉验证 | FMP+10-K+Proxy+MacroTrends |
| ANET前瞻缺失 | AI冲击矩阵含Token经济 | Workers AI经济模型 |
| 55卡蒸馏: 概率三重锚定 | 每个概率赋值 | 基准率+反例+自然实验 |
