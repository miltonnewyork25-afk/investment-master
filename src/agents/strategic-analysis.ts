/**
 * Strategic Analysis Agent
 * 战略分析引擎 — 整合定性与定量分析
 *
 * 框架体系:
 * 1. Moat Analysis (护城河5维度) — Morningstar + Buffett
 * 2. Porter's Five Forces (波特五力)
 * 3. BCG Product Portfolio Matrix (产品组合矩阵)
 * 4. Flywheel Effects (飞轮效应建模)
 * 5. TAM/SAM/SOM (市场空间量化)
 * 6. Reinvestment Moat (再投资护城河)
 * 7. Competitive Positioning (竞争定位)
 *
 * 输出: StrategicProfile with composite moat score + strategic signals
 */

import type { Company } from '../types/index.js';

// ==================== Types ====================

/** 护城河类型 (Morningstar Framework) */
export type MoatType = 'network_effects' | 'switching_costs' | 'intangible_assets' | 'cost_advantages' | 'efficient_scale';

/** 护城河宽度 */
export type MoatWidth = 'none' | 'narrow' | 'wide';

/** 护城河趋势 */
export type MoatTrend = 'eroding' | 'stable' | 'strengthening';

/** BCG矩阵象限 */
export type BCGQuadrant = 'star' | 'cash_cow' | 'question_mark' | 'dog';

/** 飞轮节点 */
export interface FlywheelNode {
  name: string;                    // 飞轮环节名称
  description: string;             // 描述
  strength: number;                // 0-10 当前强度
  metrics?: Record<string, number>; // 量化指标
}

/** 飞轮效应 */
export interface FlywheelEffect {
  name: string;                    // 飞轮名称
  nodes: FlywheelNode[];           // 飞轮环节 (顺序=循环方向)
  velocity: number;                // 0-10 飞轮转速 (综合强度)
  acceleration: number;            // -5 to +5 加速/减速
  bottleneck?: string;             // 瓶颈环节
}

/** Porter五力单项 */
export interface ForceAssessment {
  score: number;                   // 1-5 (1=极弱威胁, 5=极强威胁)
  factors: string[];               // 关键驱动因素
}

/** Porter五力完整评估 */
export interface PorterFiveForces {
  rivalry: ForceAssessment;            // 现有竞争者威胁
  new_entrants: ForceAssessment;       // 新进入者威胁
  substitutes: ForceAssessment;        // 替代品威胁
  supplier_power: ForceAssessment;     // 供应商议价力
  buyer_power: ForceAssessment;        // 买家议价力
  industry_attractiveness: number;     // 0-100 行业吸引力 (五力综合)
}

/** 单项护城河评分 */
export interface MoatDimension {
  type: MoatType;
  score: number;                   // 0-100
  evidence: string[];              // 定性证据
  quantitative_support: number;    // 0-100 定量支撑度
}

/** 护城河综合评估 */
export interface MoatAssessment {
  width: MoatWidth;
  trend: MoatTrend;
  composite_score: number;         // 0-100
  dimensions: MoatDimension[];
  dominant_moat: MoatType;         // 最强护城河类型
  durability_years: number;        // 预估护城河持续年限
  signals: string[];
}

/** BCG产品线 */
export interface ProductUnit {
  name: string;
  revenue_share: number;           // 0-1 收入占比
  growth_rate: number;             // YoY增速
  market_share: number;            // 相对市场份额 (vs最大竞争对手)
  operating_margin: number;        // 经营利润率
  quadrant: BCGQuadrant;
  strategic_role: string;          // 战略角色描述
}

/** 市场空间 */
export interface MarketSize {
  tam: number;                     // Total Addressable Market ($B)
  sam: number;                     // Serviceable Addressable Market ($B)
  som: number;                     // Serviceable Obtainable Market ($B)
  penetration_rate: number;        // SOM/SAM 渗透率
  growth_rate: number;             // TAM年化增速
}

/** 再投资护城河 */
export interface ReinvestmentMoat {
  roic: number;                    // ROIC
  reinvestment_rate: number;       // 再投资率 (1 - payout ratio)
  organic_growth: number;          // ROIC × Reinvestment Rate
  runway_years: number;            // 高ROIC可持续年限
  incremental_roic: number;        // 增量ROIC (新投资回报率)
  moat_compounding: boolean;       // 再投资是否加宽护城河
  signals: string[];
}

/** 竞争定位 */
export interface CompetitivePosition {
  market_rank: number;             // 市场排名
  market_share: number;            // 市场份额
  share_trend: 'gaining' | 'stable' | 'losing';
  key_competitors: string[];
  structural_advantages: string[];  // 结构性优势
  vulnerabilities: string[];        // 结构性弱点
}

/** 战略分析完整结果 */
export interface StrategicProfile {
  ticker: string;
  moat: MoatAssessment;
  porter: PorterFiveForces;
  products: ProductUnit[];
  flywheels: FlywheelEffect[];
  market_size: MarketSize;
  reinvestment: ReinvestmentMoat;
  competitive_position: CompetitivePosition;
  strategic_score: number;         // 0-100 综合战略得分
  strategic_zone: 'dominant' | 'strong' | 'moderate' | 'weak' | 'vulnerable';
  key_insights: string[];
}

// ==================== Strategic Analysis Engine ====================

/** 从财务数据推断护城河维度 */
function inferMoatFromFinancials(company: Company): MoatDimension[] {
  const dimensions: MoatDimension[] = [];
  const gm = company.gross_margin ?? 0;
  const roic = company.roic ?? 0;
  const mcap = company.market_cap ?? 0;
  const revenueGrowth = company.revenue_growth_yoy ?? 0;

  // 1. Network Effects (网络效应)
  // 高毛利 + 平台型 + 规模增长 → 网络效应信号
  const networkScore = Math.min(100,
    (gm > 0.6 ? 30 : gm > 0.4 ? 15 : 0) +
    (mcap > 500e9 ? 30 : mcap > 100e9 ? 20 : mcap > 10e9 ? 10 : 0) +
    (revenueGrowth > 0.2 ? 25 : revenueGrowth > 0.1 ? 15 : 5) +
    (roic > 0.2 ? 15 : roic > 0.1 ? 8 : 0)
  );
  dimensions.push({
    type: 'network_effects',
    score: networkScore,
    evidence: inferNetworkEvidence(company),
    quantitative_support: Math.min(100, networkScore * 1.2),
  });

  // 2. Switching Costs (转换成本)
  // 高ROIC持续 + B2B + 嵌入式产品 → 高转换成本
  const switchingScore = Math.min(100,
    (roic > 0.25 ? 35 : roic > 0.15 ? 25 : roic > 0.08 ? 10 : 0) +
    (gm > 0.65 ? 30 : gm > 0.5 ? 20 : gm > 0.35 ? 10 : 0) +
    (revenueGrowth > 0 && revenueGrowth < 0.3 ? 20 : 10) + // 稳定增长=锁定客户
    (mcap > 200e9 ? 15 : mcap > 50e9 ? 10 : 5)
  );
  dimensions.push({
    type: 'switching_costs',
    score: switchingScore,
    evidence: inferSwitchingEvidence(company),
    quantitative_support: Math.min(100, switchingScore * 1.1),
  });

  // 3. Intangible Assets (无形资产: 品牌/专利/牌照)
  const intangibleScore = Math.min(100,
    (gm > 0.7 ? 40 : gm > 0.55 ? 25 : gm > 0.4 ? 15 : 0) + // 高毛利=定价权
    (roic > 0.2 ? 25 : roic > 0.12 ? 15 : 5) +
    (mcap > 1000e9 ? 25 : mcap > 200e9 ? 15 : mcap > 50e9 ? 10 : 5) +
    (revenueGrowth > 0.05 ? 10 : 0) // 品牌持续增长
  );
  dimensions.push({
    type: 'intangible_assets',
    score: intangibleScore,
    evidence: inferIntangibleEvidence(company),
    quantitative_support: Math.min(100, intangibleScore * 1.0),
  });

  // 4. Cost Advantages (成本优势)
  // 高规模 + 合理毛利 + 高ROIC → 规模经济
  const costScore = Math.min(100,
    (mcap > 1000e9 ? 35 : mcap > 200e9 ? 25 : mcap > 50e9 ? 15 : 5) +
    (roic > 0.2 ? 30 : roic > 0.12 ? 20 : roic > 0.06 ? 10 : 0) +
    (gm > 0.3 && gm < 0.7 ? 20 : gm > 0.7 ? 15 : 5) + // 中等毛利=成本驱动
    (revenueGrowth > 0.05 ? 15 : 5)
  );
  dimensions.push({
    type: 'cost_advantages',
    score: costScore,
    evidence: inferCostEvidence(company),
    quantitative_support: Math.min(100, costScore * 0.9),
  });

  // 5. Efficient Scale (有效规模)
  // 小市场+高份额+高ROIC → 自然垄断/寡占
  const scaleScore = Math.min(100,
    (roic > 0.2 ? 30 : roic > 0.12 ? 20 : 5) +
    (gm > 0.5 ? 25 : gm > 0.35 ? 15 : 5) +
    (mcap > 500e9 ? 15 : mcap > 100e9 ? 20 : mcap > 20e9 ? 25 : 10) + // 中等规模更可能=有效规模
    (revenueGrowth < 0.15 && revenueGrowth > 0 ? 20 : 10) // 稳定=市场饱和=有效规模
  );
  dimensions.push({
    type: 'efficient_scale',
    score: scaleScore,
    evidence: inferScaleEvidence(company),
    quantitative_support: Math.min(100, scaleScore * 0.85),
  });

  return dimensions;
}

function inferNetworkEvidence(c: Company): string[] {
  const evidence: string[] = [];
  if ((c.market_cap ?? 0) > 500e9) evidence.push('超大规模用户基础暗示网络效应');
  if ((c.gross_margin ?? 0) > 0.6) evidence.push('高毛利支撑边际成本递减');
  if ((c.revenue_growth_yoy ?? 0) > 0.15) evidence.push('高增速可能反映网络效应加速');
  return evidence.length ? evidence : ['需进一步定性分析网络效应'];
}

function inferSwitchingEvidence(c: Company): string[] {
  const evidence: string[] = [];
  if ((c.roic ?? 0) > 0.2) evidence.push('持续高ROIC暗示客户锁定');
  if ((c.gross_margin ?? 0) > 0.6) evidence.push('高毛利支撑差异化定价=客户粘性');
  return evidence.length ? evidence : ['需分析客户留存率和合同结构'];
}

function inferIntangibleEvidence(c: Company): string[] {
  const evidence: string[] = [];
  if ((c.gross_margin ?? 0) > 0.65) evidence.push('毛利>65%暗示品牌溢价或专利壁垒');
  if ((c.market_cap ?? 0) > 500e9) evidence.push('超大市值反映品牌价值资本化');
  return evidence.length ? evidence : ['需分析品牌、专利、监管许可'];
}

function inferCostEvidence(c: Company): string[] {
  const evidence: string[] = [];
  if ((c.market_cap ?? 0) > 200e9) evidence.push('规模经济: 大体量摊薄固定成本');
  if ((c.roic ?? 0) > 0.15) evidence.push('高ROIC验证成本结构优势');
  return evidence.length ? evidence : ['需分析单位经济模型和规模效应'];
}

function inferScaleEvidence(c: Company): string[] {
  const evidence: string[] = [];
  if ((c.roic ?? 0) > 0.15) evidence.push('高ROIC+稳定增长暗示市场接近有效规模');
  return evidence.length ? evidence : ['需分析市场集中度和新进入者意愿'];
}

/** 从护城河维度推断综合评估 */
function assessMoat(dimensions: MoatDimension[]): MoatAssessment {
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const topScore = sorted[0].score;
  const avgScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length;
  const composite = topScore * 0.4 + avgScore * 0.6; // 最强项40% + 平均60%

  const width: MoatWidth = composite >= 70 ? 'wide' : composite >= 45 ? 'narrow' : 'none';
  const trend: MoatTrend = sorted[0].score > 75 ? 'strengthening' : sorted[0].score > 50 ? 'stable' : 'eroding';

  const durability = width === 'wide' ? 15 : width === 'narrow' ? 8 : 3;

  const signals: string[] = [];
  if (width === 'wide') signals.push(`宽护城河: ${moatTypeCN(sorted[0].type)}为主导(${sorted[0].score}/100)`);
  if (sorted[0].score > 80 && sorted[1].score > 60) signals.push('双重护城河叠加: 防御极强');
  if (composite < 40) signals.push('护城河薄弱: 竞争优势不明显');
  if (trend === 'eroding') signals.push('护城河侵蚀中: 需关注竞争动态');

  return {
    width,
    trend,
    composite_score: Math.round(composite),
    dimensions: sorted,
    dominant_moat: sorted[0].type,
    durability_years: durability,
    signals,
  };
}

function moatTypeCN(type: MoatType): string {
  const map: Record<MoatType, string> = {
    network_effects: '网络效应',
    switching_costs: '转换成本',
    intangible_assets: '无形资产(品牌/专利)',
    cost_advantages: '成本优势',
    efficient_scale: '有效规模',
  };
  return map[type];
}

/** Porter五力推断 (基于行业+财务数据) */
function inferPorterForces(company: Company): PorterFiveForces {
  const gm = company.gross_margin ?? 0;
  const roic = company.roic ?? 0;
  const mcap = company.market_cap ?? 0;
  const growth = company.revenue_growth_yoy ?? 0;

  // 高毛利+高ROIC = 行业壁垒高, 威胁低
  const rivalryScore = gm > 0.6 && roic > 0.2 ? 2 :
    gm > 0.4 && roic > 0.1 ? 3 : 4;

  const entrantsScore = mcap > 500e9 ? 1 :
    mcap > 100e9 && gm > 0.5 ? 2 :
    mcap > 50e9 ? 3 : 4;

  const substitutesScore = growth > 0.15 ? 2 : // 高增长=替代品无法撼动
    growth > 0.05 ? 3 : 4;

  const supplierScore = gm > 0.6 ? 2 : // 高毛利=供应商议价力弱
    gm > 0.4 ? 3 : 4;

  const buyerScore = roic > 0.2 ? 2 : // 高ROIC=买家无法压价
    roic > 0.1 ? 3 : 4;

  const attractiveness = Math.round(
    (5 - rivalryScore) * 20 +
    (5 - entrantsScore) * 20 +
    (5 - substitutesScore) * 20 +
    (5 - supplierScore) * 20 +
    (5 - buyerScore) * 20
  ) / 5;

  return {
    rivalry: { score: rivalryScore, factors: inferRivalryFactors(company) },
    new_entrants: { score: entrantsScore, factors: inferEntrantFactors(company) },
    substitutes: { score: substitutesScore, factors: inferSubstituteFactors(company) },
    supplier_power: { score: supplierScore, factors: inferSupplierFactors(company) },
    buyer_power: { score: buyerScore, factors: inferBuyerFactors(company) },
    industry_attractiveness: Math.min(100, Math.max(0, attractiveness)),
  };
}

function inferRivalryFactors(c: Company): string[] {
  const factors: string[] = [];
  if ((c.gross_margin ?? 0) > 0.6) factors.push('高毛利暗示竞争有序');
  else factors.push('中等毛利暗示竞争激烈');
  if ((c.market_cap ?? 0) > 500e9) factors.push('巨头主导, 寡头竞争格局');
  return factors;
}

function inferEntrantFactors(c: Company): string[] {
  const factors: string[] = [];
  if ((c.market_cap ?? 0) > 500e9) factors.push('极高资本门槛阻止进入');
  if ((c.roic ?? 0) > 0.2) factors.push('规模效应+学习曲线构成壁垒');
  return factors;
}

function inferSubstituteFactors(c: Company): string[] {
  const factors: string[] = [];
  if ((c.revenue_growth_yoy ?? 0) > 0.15) factors.push('高增速说明替代品尚未构成威胁');
  else factors.push('增速放缓需关注替代品冲击');
  return factors;
}

function inferSupplierFactors(c: Company): string[] {
  const factors: string[] = [];
  if ((c.gross_margin ?? 0) > 0.6) factors.push('高毛利=对供应商有强议价力');
  else factors.push('中等毛利=供应商议价力不可忽视');
  return factors;
}

function inferBuyerFactors(c: Company): string[] {
  const factors: string[] = [];
  if ((c.roic ?? 0) > 0.2) factors.push('高ROIC=买家接受溢价定价');
  else factors.push('中等ROIC=买家有一定议价空间');
  return factors;
}

/** 推断再投资护城河 */
function inferReinvestmentMoat(company: Company): ReinvestmentMoat {
  const roic = company.roic ?? 0.1;
  const growth = company.revenue_growth_yoy ?? 0.05;

  // 再投资率 = 增长 / ROIC (简化估算)
  const reinvestmentRate = roic > 0 ? Math.min(1, growth / roic) : 0.5;
  const organicGrowth = roic * reinvestmentRate;

  // 增量ROIC: 假设大型成熟公司略低于历史ROIC
  const incrementalRoic = roic * 0.85;

  // 护城河是否因再投资加宽
  const moatCompounding = roic > 0.15 && growth > 0.08 && reinvestmentRate > 0.3;

  // 可持续年限: ROIC越高+增速越稳 → 跑道越长
  const runway = roic > 0.25 ? 15 : roic > 0.15 ? 10 : roic > 0.08 ? 5 : 3;

  const signals: string[] = [];
  if (moatCompounding) signals.push('再投资正在加宽护城河(ROIC>15% + 增速>8%)');
  if (organicGrowth > 0.1) signals.push(`有机增长${(organicGrowth * 100).toFixed(0)}%=高质量复利`);
  if (incrementalRoic > 0.2) signals.push('增量ROIC卓越: 每一元再投资创造超额价值');
  if (reinvestmentRate < 0.3 && roic > 0.2) signals.push('再投资不足: 高ROIC但低再投资率, 增长可能放缓');

  return {
    roic,
    reinvestment_rate: reinvestmentRate,
    organic_growth: organicGrowth,
    runway_years: runway,
    incremental_roic: incrementalRoic,
    moat_compounding: moatCompounding,
    signals,
  };
}

/** BCG象限判定 */
function determineBCGQuadrant(growth: number, relativeShare: number): BCGQuadrant {
  const highGrowth = growth > 0.10;
  const highShare = relativeShare > 0.8;

  if (highGrowth && highShare) return 'star';
  if (!highGrowth && highShare) return 'cash_cow';
  if (highGrowth && !highShare) return 'question_mark';
  return 'dog';
}

/** 计算综合战略得分 */
function calculateStrategicScore(
  moat: MoatAssessment,
  porter: PorterFiveForces,
  reinvestment: ReinvestmentMoat,
  products: ProductUnit[],
  flywheels: FlywheelEffect[],
): number {
  const moatWeight = 0.30;
  const porterWeight = 0.20;
  const reinvestWeight = 0.20;
  const productWeight = 0.15;
  const flywheelWeight = 0.15;

  const moatScore = moat.composite_score;
  const porterScore = porter.industry_attractiveness;

  const reinvestScore = Math.min(100,
    (reinvestment.roic > 0.25 ? 40 : reinvestment.roic > 0.15 ? 25 : 10) +
    (reinvestment.moat_compounding ? 30 : 10) +
    (reinvestment.runway_years > 10 ? 20 : reinvestment.runway_years > 5 ? 10 : 5) +
    (reinvestment.organic_growth > 0.1 ? 10 : 5)
  );

  // 产品组合得分: Stars和Cash Cows占比越高越好
  const goodProducts = products.filter(p => p.quadrant === 'star' || p.quadrant === 'cash_cow');
  const productScore = products.length > 0
    ? Math.min(100, (goodProducts.reduce((s, p) => s + p.revenue_share, 0) / 1) * 100)
    : 50;

  // 飞轮得分: 转速和加速度
  const flywheelScore = flywheels.length > 0
    ? Math.min(100, flywheels.reduce((s, f) => s + f.velocity * 10, 0) / flywheels.length)
    : 30;

  return Math.round(
    moatScore * moatWeight +
    porterScore * porterWeight +
    reinvestScore * reinvestWeight +
    productScore * productWeight +
    flywheelScore * flywheelWeight
  );
}

function determineStrategicZone(score: number): StrategicProfile['strategic_zone'] {
  if (score >= 80) return 'dominant';
  if (score >= 65) return 'strong';
  if (score >= 50) return 'moderate';
  if (score >= 35) return 'weak';
  return 'vulnerable';
}

// ==================== Public API ====================

export class StrategicAnalysis {

  /**
   * 基础战略分析 (纯定量推断)
   * 从Company财务数据推断护城河、五力、再投资
   */
  analyzeBasic(company: Company): StrategicProfile {
    const moatDimensions = inferMoatFromFinancials(company);
    const moat = assessMoat(moatDimensions);
    const porter = inferPorterForces(company);
    const reinvestment = inferReinvestmentMoat(company);

    // 基础分析无产品线细节和飞轮，使用默认
    const products: ProductUnit[] = [];
    const flywheels: FlywheelEffect[] = [];

    const strategicScore = calculateStrategicScore(moat, porter, reinvestment, products, flywheels);
    const zone = determineStrategicZone(strategicScore);

    const insights: string[] = [];
    insights.push(...moat.signals);
    insights.push(...reinvestment.signals);
    if (porter.industry_attractiveness > 70) insights.push('行业结构性高吸引力');
    if (porter.industry_attractiveness < 40) insights.push('行业结构性压力大');

    return {
      ticker: company.ticker,
      moat,
      porter,
      products,
      flywheels,
      market_size: { tam: 0, sam: 0, som: 0, penetration_rate: 0, growth_rate: 0 },
      reinvestment,
      competitive_position: {
        market_rank: 0,
        market_share: 0,
        share_trend: 'stable',
        key_competitors: [],
        structural_advantages: [],
        vulnerabilities: [],
      },
      strategic_score: strategicScore,
      strategic_zone: zone,
      key_insights: insights,
    };
  }

  /**
   * 完整战略分析 (定量+定性)
   * 接受手动输入的产品线、飞轮、竞争数据
   */
  analyzeFull(
    company: Company,
    products: ProductUnit[],
    flywheels: FlywheelEffect[],
    marketSize: MarketSize,
    competitivePosition: CompetitivePosition,
    moatOverrides?: Partial<Record<MoatType, { score: number; evidence: string[] }>>,
    porterOverrides?: Partial<PorterFiveForces>,
  ): StrategicProfile {
    // 基础推断
    let moatDimensions = inferMoatFromFinancials(company);

    // 应用定性覆写 (定量推断与定性判断加权融合)
    if (moatOverrides) {
      moatDimensions = moatDimensions.map(d => {
        const override = moatOverrides[d.type];
        if (override) {
          return {
            ...d,
            score: Math.round(d.score * 0.3 + override.score * 0.7), // 定性70% + 定量30%
            evidence: [...override.evidence, ...d.evidence],
            quantitative_support: d.quantitative_support,
          };
        }
        return d;
      });
    }

    const moat = assessMoat(moatDimensions);
    let porter = inferPorterForces(company);

    // Porter覆写
    if (porterOverrides) {
      porter = { ...porter, ...porterOverrides };
      // 重算行业吸引力
      porter.industry_attractiveness = Math.round(
        ((5 - porter.rivalry.score) +
        (5 - porter.new_entrants.score) +
        (5 - porter.substitutes.score) +
        (5 - porter.supplier_power.score) +
        (5 - porter.buyer_power.score)) * 5
      );
    }

    const reinvestment = inferReinvestmentMoat(company);
    const strategicScore = calculateStrategicScore(moat, porter, reinvestment, products, flywheels);
    const zone = determineStrategicZone(strategicScore);

    const insights: string[] = [];
    insights.push(...moat.signals);
    insights.push(...reinvestment.signals);

    // 产品组合洞察
    const stars = products.filter(p => p.quadrant === 'star');
    const dogs = products.filter(p => p.quadrant === 'dog');
    if (stars.length > 0) insights.push(`${stars.length}个明星业务驱动增长: ${stars.map(s => s.name).join(', ')}`);
    if (dogs.length > 0) insights.push(`${dogs.length}个瘦狗业务需战略处置: ${dogs.map(d => d.name).join(', ')}`);

    // 飞轮洞察
    const strongFlywheels = flywheels.filter(f => f.velocity >= 7);
    if (strongFlywheels.length > 0) insights.push(`强力飞轮: ${strongFlywheels.map(f => f.name).join(', ')} (转速≥7)`);
    const decelerating = flywheels.filter(f => f.acceleration < 0);
    if (decelerating.length > 0) insights.push(`飞轮减速警告: ${decelerating.map(f => f.name).join(', ')}`);

    // 市场空间洞察
    if (marketSize.penetration_rate < 0.3) insights.push(`市场渗透率${(marketSize.penetration_rate * 100).toFixed(0)}% — 增长空间充裕`);
    if (marketSize.growth_rate > 0.15) insights.push(`TAM年增${(marketSize.growth_rate * 100).toFixed(0)}% — 水大鱼大`);

    // 竞争洞察
    if (competitivePosition.share_trend === 'gaining') insights.push('市场份额持续扩张');
    if (competitivePosition.share_trend === 'losing') insights.push('市场份额流失中 — 竞争力下降信号');

    return {
      ticker: company.ticker,
      moat,
      porter,
      products,
      flywheels,
      market_size: marketSize,
      reinvestment,
      competitive_position: competitivePosition,
      strategic_score: strategicScore,
      strategic_zone: zone,
      key_insights: insights,
    };
  }

  /**
   * 批量基础分析
   */
  analyzeAll(companies: Company[]): StrategicProfile[] {
    return companies.map(c => this.analyzeBasic(c));
  }

  /**
   * BCG矩阵辅助: 判定产品象限
   */
  classifyProduct(
    name: string,
    revenueShare: number,
    growthRate: number,
    relativeMarketShare: number,
    operatingMargin: number,
    strategicRole: string,
  ): ProductUnit {
    return {
      name,
      revenue_share: revenueShare,
      growth_rate: growthRate,
      market_share: relativeMarketShare,
      operating_margin: operatingMargin,
      quadrant: determineBCGQuadrant(growthRate, relativeMarketShare),
      strategic_role: strategicRole,
    };
  }

  /**
   * 飞轮效应构建辅助
   */
  buildFlywheel(
    name: string,
    nodes: FlywheelNode[],
    acceleration: number = 0,
  ): FlywheelEffect {
    const avgStrength = nodes.reduce((s, n) => s + n.strength, 0) / nodes.length;
    const minStrength = Math.min(...nodes.map(n => n.strength));
    const bottleneck = nodes.find(n => n.strength === minStrength);

    return {
      name,
      nodes,
      velocity: Math.round(avgStrength * 10) / 10,
      acceleration,
      bottleneck: bottleneck && bottleneck.strength < avgStrength * 0.7
        ? bottleneck.name
        : undefined,
    };
  }
}

export const strategicAnalysis = new StrategicAnalysis();
