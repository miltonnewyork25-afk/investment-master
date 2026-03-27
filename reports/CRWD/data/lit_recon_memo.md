# CRWD 文献侦察备忘录 (Phase -0.5)

> 12路Agent × 2轮 = 全量数据收集完成 (2026-03-27)
> 方法: 7路MECE数据收集 + 5路文献侦察(分析师/Reverse DCF/熊牛/10-K/聪明钱)

## 1. 市场共识画像

**主流叙事**: CrowdStrike是网安平台化赢家, Wide Moat, AI受益者, 宕机已恢复。
- 46分析师: 29 Buy / 15 Hold / 2 Sell
- 共识目标$548(+40%上行)
- 共识FY27收入$5.87-5.93B(+22%), FY31 $11.51B
- Morningstar公允价值$460(Wide Moat, Very High Uncertainty)

**共识定价**: ~14x forward P/S, 64x forward PE(Non-GAAP), 3年估值区间低端

## 2. 关键争议域(市场未达成共识)

### 争议1: SBC是否重要?
- **Bull**: SBC是非现金, FCF $1.31B(27%margin)是真实的; 高增长阶段必要; 未来会收敛
- **Bear**: Owner FCF仅$213M(P/E 468x); FTNT证明4% SBC/Rev可行; 22.8%无收敛=永久稀释
- **数据点**: SBC $1.1B vs FCF $1.31B → SBC吃掉84%的FCF; 4年累计稀释13.6%

### 争议2: 增速能维持多久?
- **Bull**: LogScale 75-100%增速 + Charlotte AI + Flex扩张 + $325B TAM(2030) → 5年可维持20%+
- **Bear**: 法则大数(从$5B→$10B比$1B→$5B难); 增速已从66%→22%; FY31共识仅$11.5B(~15% CAGR)
- **数据点**: RPO +38% > ARR +24% > Revenue +22% → 合同承诺加速, 但能否转化为收入加速?

### 争议3: Microsoft威胁程度
- **Bull**: Enterprise POV 8/10选CRWD; 97%GRR; CRWD摄入Defender遥测=共存策略
- **Bear**: E5+Copilot免费对SMB是杀手级; Defender市占28.6%超CRWD 14.2%; AI降低检测门槛
- **数据点**: CRWD不试图替代Defender, 而是做数据层→如果成功, MSFT变为数据供应商

### 争议4: 内核访问移除的影响 ⚠️
- **Bull**: CRWD已签MVI 3.0, 正在构建用户模式能力; 数据飞轮+品牌才是真护城河
- **Bear**: 内核可见性是CRWD核心技术差异化; 用户模式拉平竞争场→价格竞争加剧
- **数据点**: Private preview Jul 2025; 时间表未明确; 对检测能力影响待评估

## 3. 已确认的分析盲区(共识覆盖不足)

| 盲区 | 为什么重要 | 数据充分度 |
|------|----------|----------|
| **Windows内核移除** | 可能重塑整个端点安全竞争格局 | 中(技术细节有限) |
| **Charlotte AI独立货币化** | 使用量6x增长但零收入贡献=未来惊喜或失望 | 低(无定价计划) |
| **Falcon Flex对NRR的真实影响** | 模块切换可能膨胀NRR | 中(Re-Flex数据有限) |
| **SGNL+Seraphic整合风险** | 18月5笔>$1B收购+宕机余波+内核转型=执行过载 | 低(尚未完成) |
| **EU数字主权影响** | NIS2/DORA可能偏向欧洲本土厂商 | 低 |

## 4. 我们的非共识假说候选

### H1: SBC是真实风险但内核移除更重要(CQ权重调整)
- 市场聚焦SBC(熟悉), 忽视内核移除(技术性强)
- 内核移除可能在3-5年内将端点安全从"深度差异化"变为"功能趋同"→定价权系统性下降
- 如果成立: CRWD长期估值应更接近FTNT(25x PE)而非当前(64x)

### H2: Charlotte AI + LogScale是估值之锚
- 共识将Charlotte AI定价为零, LogScale定价为减速
- 如果Charlotte AI FY28启动货币化($200-500M增量) + LogScale维持60%+(→$2B ARR by FY29)
- 则FY29收入可能比共识$8.72B高$500M-1B → 支撑当前估值

### H3: Flex模型正在改变单位经济学(正向)
- Flex $1.69B(32% of ARR)以120%增速增长
- Re-Flex +50% ARR, 仅7个月
- 这不是cross-sell → 是commitment model → NRR提升+churn下降+deal size上升
- 如果成立: Rule of 40将从49升至55+(FCF margin→30%+)

## 5. 数据文件索引

| 文件 | 维度 | 字符(约) |
|------|------|---------|
| `financial_data.md` | 5年财务+三PE+SBC+竞对 | 6.1K |
| `knowledge_context.md` | 公司概况+竞争+宕机+AI+内部人 | 6.0K |
| `launch_brief.md` | 启动简报+CQ+修复清单 | 3.7K |
| `research_sbc_nrr.md` | SBC收敛+NRR推断+Magic Number+R40 | 5.5K |
| `research_logscale_siem.md` | LogScale+SIEM竞争+TAM | 5.8K |
| `research_competition.md` | MSFT/PANW/S+宕机后续 | 7.2K |
| `research_ai_strategy.md` | Charlotte AI+AgentWorks+飞轮+NVIDIA | 7.0K |
| `research_10k_management.md` | 10-K+管理层+M&A+客户+内部人 | 6.8K |
| `research_moat_pricing.md` | 护城河+定价权分层+C-AI抗性 | 7.5K |
| `research_industry_valuation.md` | TAM+监管+估值+宏观 | 6.2K |
| `research_analyst_views.md` | 分析师+Reverse DCF+熊牛+RPO+指引 | 7.8K |
| `research_smart_money.md` | 13F+期权+预期差+催化剂 | 3.5K |

**总研究数据**: ~72.1K字符, 12个维度全覆盖

## 6. Phase 0建议

1. **数据预取**(`/data-prefetch`): 已有丰富数据, 仅需补充Python估值模型数据
2. **CQ路由**: 建议升级CQ4从"AI是护城河增强还是威胁"→**"Windows内核移除+AI双重冲击对端点护城河的影响"**(新发现)
3. **Phase 0.75结晶**: 围绕SBC×内核×LogScale三角关系构建核心矛盾
4. **框架路由**: 可能性宽度3-4分(窄-中) → 传统框架+混合模式
