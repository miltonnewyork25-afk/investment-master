# DPZ 预调研准备简报
# 日期: 2026-03-05
# 状态: Pre-Phase -1 (Scout准备)

## 一、公司快照

```yaml
价格: $406.62 | 市值: $13.7B | EV: $19.1B
P/E: ~23x | EV/EBITDA: 18x | FCF Yield: 4.7%
FY2025: Rev $4.94B | NI $601.7M | EPS $17.57 (diluted)
权益: -$3.9B | 净债务: $4.8B | Net Debt/EBITDA: 4.5x
ROIC: 56.7% | ROA: 33.4% | OPM: 19.3%
Revenue CAGR(3Y): ~2.9% | EPS CAGR(3Y): ~12% (回购驱动)
共识EPS: FY2028E $23.31 (~10% CAGR)
员工: 6,400 | 特许化率: ~98-99% | CEO: Russell Weiner
三个业务分部: US Stores / International Franchise / Supply Chain
门店: ~21,000 (美国~6,900 + 国际~13,500)
```

## 二、方法论迁移清单 (来源→DPZ调整)

### 从IHG迁移 (最直接的模式类比)

| # | 方法论 | IHG原版 | DPZ调整 |
|---|--------|--------|---------|
| 1 | **双层SOTP** | 特许层×18-22x + 物业层×8-12x | **特许层**(royalty+广告费)×高倍数 + **供应链层**×低倍数 |
| 2 | **加盟商P&L瀑布图** | RevPAR→GOP→franchise fee→加盟商净利 | 门店收入→食材(DPZ供应链)→人工→租金→royalty+广告→加盟商净利 |
| 3 | **负权益三驱动力** | 回购(80%) + AOCI + 留存耗尽 | 同框架，DPZ回购更激进(EPS CAGR 12% vs Rev CAGR 3%) |
| 4 | **回购资金缺口** | FCF vs 总分配趋势，判断可持续性 | 直接适用，DPZ同样存在"借债回购"模式 |
| 5 | **杠杆空间对比** | IHG 2.6x vs HLT 5.1x vs MAR 3.7x | DPZ 4.5x vs YUM vs MCD vs QSR，判断杠杆是否还有空间 |
| 6 | **隐形引擎识别** | System Fund忠诚度收入重分配 | DPZ广告基金(~6%门店收入)是否有类似利润重分配空间? |

### 从SBUX v3.0迁移

| # | 方法论 | SBUX原版 | DPZ调整 |
|---|--------|---------|---------|
| 7 | **净债务三口径** | 金融/含租赁/过渡性 | 重构为: **ABS净债务**(票据-restricted cash) / **全口径**(+revolver+租赁) / **偿债能力**(debt service/coverage ratio) |
| 8 | **CSSPD纯度分解** | 5维: 价格/关店通胀/蚕食/组合/基数 | 5维重定义: **价格驱动度/Fortressing蚕食/Delivery-Carryout Mix/促销深度/基数效应** |
| 9 | **WACC前瞻三情景** | 利率下行/平稳/上行 | 直接适用，DPZ的ABS利率敏感性更高(证券化再融资风险) |
| 10 | **BME信念反演** | 自营恢复/特许化/半转型 | 重定义: **美国成熟+国际扩张(30x)** vs **增长放缓(20-22x)** vs **平台蚕食(折价)** |
| 11 | **悲观偏差扫描** | EVO-SBUX-003 | 直接适用，DPZ分析也需预检偏差方向 |

### 从CMG迁移

| # | 方法论 | CMG原版 | DPZ调整 |
|---|--------|--------|---------|
| 12 | **直营vs特许对比表** | Ch3完整经济学对比 | DPZ作为"CMG镜像反面"直接使用，核心变量="模式选择"(非"一个人") |
| 13 | **CEO沉默域分析** | 6步法+SDI指数, Boatwright 6个沉默域 | 迁移到Weiner: 加盟商经济压力/聚合平台佣金/回购可持续性/fortressing蚕食率 |
| 14 | **漏损分析** | 门店OPM 25.4% → 公司OPM 16.8% (8.6pp漏损) | 反向构建: 特许层+供应链层的"双轨漏损"到公司OPM |
| 15 | **镜像分析** | CMG-SBUX 7维度(共享变量=Niccol) | DPZ-CMG 9维度(共享变量=模式选择: 100%直营 vs 98%特许) |

### SBUX v3.0反思新增 (用户反馈复利)

| # | 方法论 | 说明 |
|---|--------|------|
| 16 | **利润池地图** (M3缺口) | Supply Chain→Royalty→Digital三层revenue/margin/profit pool share |
| 17 | **估值一体化** (重复合并) | 1主章(假设表→情景→概率加权→触发器) + 附录(DCF细节/敏感性) |
| 18 | **护城河单一评分** (重复合并) | A-Score为主, PtW/v28下沉附录 |
| 19 | **CEO章节字段化** (叙事→字段) | 5-8个可季度跟踪KPI + CEO承诺值vs实际值对照 |
| 20 | **需求一致性检验** (M1缺口) | Top-down TAM vs Bottom-up(频次×客单×门店) ≤±10% |

## 三、DPZ独有分析视角 (需新建)

1. **Supply Chain利润中心**: 面团工厂+配送中心的独立P&L, 对加盟商定价权量化
2. **ABS Securitization解构**: 全业务证券化结构, covenant headroom, rapid amortization触发条件
3. **Fortressing蚕食系数**: fortress区域 vs 非fortress区域comp差异量化
4. **Delivery vs Carryout经济学**: 两渠道单位经济学对比, 第三方聚合器威胁
5. **促销依赖度诊断**: promo_mix, price_realization, Emergency Pizza ROI
6. **国际Master Franchise健康度**: DPE/Jubilant/Alsea上市partner的财报对标

## 四、Phase -0.5 文献侦察搜索清单

| # | 搜索方向 | 目标 |
|---|---------|------|
| 1 | DPZ 10-K FY2025 (2026-02-23 filed) | Supply Chain segment拆分/门店数/comp/fortressing |
| 2 | DPZ Q4 2025 earnings call transcript | CEO沉默域线索/分析师关注焦点 |
| 3 | DPZ ABS structure / securitization details | 票据条款/coverage ratio/covenant |
| 4 | Pizza行业竞争格局 2025-2026 | Pizza Hut/Papa John's/Little Caesars份额 |
| 5 | DPZ fortressing strategy results | 学术/分析师对cannibalization rate估计 |
| 6 | DPZ国际master franchise partners | DPE/Jubilant上市partner财务 |
| 7 | 第三方配送对pizza行业影响 | DoorDash/UberEats pizza GMV |

## 五、目标架构

18章 + 附录, ~290K-350K (vs SBUX 30章542K精简40%)
框架: v18.0 + consumer v28.0 + consumer_modules v1.1
消费品系数: ×1.1
R1行业模块: 复用consumer_modules.md (跳过R1)
