/**
 * Tech Ecosystem Financial Analysis
 * 科技生态公司专用财务分析引擎
 *
 * 解决问题: 通用CFA框架(P/E, ROIC, DCF)对科技公司分析肤浅
 * 核心差异:
 *  1. SBC是真实成本, 需调整利润和P/E
 *  2. CapEx需拆分增长vs维护, 用Owner Earnings而非FCF
 *  3. R&D是投资不是费用, 需资本化修正P/B
 *  4. 增量利润率揭示真实运营杠杆
 *  5. 分部经济学比整体指标更有意义
 *  6. ARPU地理分析揭示长期增长空间
 *  7. Rule of 40, 净股东回报, CapEx周期判断
 *
 * 输出: TechFinancialProfile with adjusted valuations
 */

// ==================== Types ====================

/** SBC调整后指标 */
export interface SBCAdjustedMetrics {
  reported_operating_income: number;
  sbc_amount: number;
  sbc_as_pct_revenue: number;       // SBC/Revenue
  sbc_as_pct_oi: number;            // SBC/Operating Income
  adjusted_operating_income: number; // OI - SBC
  adjusted_opm: number;             // 调整后经营利润率
  adjusted_eps: number;             // 调整后EPS
  adjusted_pe: number;              // SBC-adjusted P/E
  sbc_dilution_rate: number;        // 年化稀释率
  sbc_trend: 'expanding' | 'stable' | 'contracting';  // 占比趋势
}

/** CapEx属性分析 */
export interface CapExAnalysis {
  total_capex: number;
  depreciation: number;              // ≈ 维护CapEx
  maintenance_capex: number;
  growth_capex: number;              // 增长投资
  growth_pct: number;                // 增长占比 (>60%=投资模式)
  capex_intensity: number;           // CapEx/Revenue
  capex_yoy_growth: number;          // CapEx同比增速
  owner_earnings: number;            // Net Income + D&A - Maintenance CapEx
  owner_earnings_pe: number;         // Market Cap / Owner Earnings
  growth_capex_roi: number;          // 增量收入 / 增长CapEx (滞后)
  capex_phase: 'ramp_up' | 'peak' | 'normalization' | 'maintenance';
}

/** 增量利润率 */
export interface IncrementalMargins {
  revenue_change: number;            // Δ Revenue
  oi_change: number;                 // Δ Operating Income
  incremental_opm: number;           // Δ OI / Δ Rev (>50%=强杠杆)
  incremental_npm: number;           // Δ NI / Δ Rev
  margin_trajectory: 'expanding' | 'stable' | 'compressing';
}

/** R&D效率 */
export interface RDEfficiency {
  rd_spend: number;
  rd_as_pct_revenue: number;
  rd_efficiency: number;             // Δ Revenue / R&D (>0.5=好)
  capitalized_rd_asset: number;      // R&D × 5年存量 (假设5年摊销)
  adjusted_book_value: number;       // Book + Capitalized R&D
  adjusted_pb: number;               // Market Cap / Adjusted Book
}

/** 分部经济学 */
export interface SegmentEconomics {
  name: string;
  revenue: number;
  growth_rate: number;
  estimated_margin: number;
  profit_contribution: number;       // 该段利润占总利润%
  rule_of_40: number;               // Growth% + Margin%
  strategic_role: 'profit_engine' | 'growth_driver' | 'ecosystem_lock' | 'declining' | 'option';
}

/** ARPU地理分析 */
export interface ARPUAnalysis {
  region: string;
  revenue: number;
  estimated_users: number;
  arpu: number;                      // Revenue / Users
  vs_us_ratio: number;               // 与美国ARPU比值
  monetization_gap: number;          // 如果提升至US 20%水平的增量
}

/** 净股东回报 */
export interface ShareholderYield {
  buyback_amount: number;
  buyback_yield: number;
  dividend_yield: number;
  sbc_dilution: number;              // 负值
  net_yield: number;                 // 总和
  vs_peers: 'above' | 'inline' | 'below';
}

/** CapEx周期判断 */
export interface CapExCycleAssessment {
  current_intensity: number;
  peak_estimate_year: number;        // 预估峰值年份
  normalization_intensity: number;   // 正常化后预期CapEx/Rev
  fcf_at_normalization: number;      // 正常化后FCF
  implied_pfcf_at_normal: number;    // 正常化后P/FCF
  signals: string[];
}

/** 科技专用估值修正 */
export interface TechAdjustedValuation {
  method1_owner_earnings: number;    // Owner Earnings × 合理倍数
  method2_capex_normal: number;      // CapEx正常化后FCF估值 (折回今天)
  method3_sotp_synergy: number;      // 分部SOTP + 协同溢价
  weighted_fair_value: number;       // 加权公允价值
  current_price: number;
  adjusted_mos: number;              // 修正后安全边际
  vs_generic_mos: number;            // 对比通用CFA的MoS差异
  conclusion: string;
}

/** 完整科技财务画像 */
export interface TechFinancialProfile {
  ticker: string;
  sbc: SBCAdjustedMetrics;
  capex: CapExAnalysis;
  incremental: IncrementalMargins;
  rd: RDEfficiency;
  segments: SegmentEconomics[];
  arpu: ARPUAnalysis[];
  shareholder_yield: ShareholderYield;
  capex_cycle: CapExCycleAssessment;
  valuation: TechAdjustedValuation;
  rule_of_40: { reported: number; adjusted: number; pass: boolean };
  revenue_per_employee: number;
  tech_score: number;                // 0-100 科技专用评分
  key_monitors: string[];            // 每季需监控的关键指标
  signals: string[];
}

// ==================== Analysis Functions ====================

export interface TechFinancialInput {
  ticker: string;
  // Income Statement
  revenue: number;
  revenue_prior: number;
  operating_income: number;
  operating_income_prior: number;
  net_income: number;
  rd_expense: number;
  sbc: number;
  sbc_prior?: number;
  depreciation: number;
  // Balance Sheet
  total_equity: number;
  market_cap: number;
  shares_outstanding: number;
  // Cash Flow
  operating_cf: number;
  capex: number;                     // positive number
  capex_prior?: number;
  buyback: number;                   // positive number
  dividend?: number;
  // Employees
  employees: number;
  // Price
  current_price: number;
  // Segments (optional)
  segments?: Array<{
    name: string;
    revenue: number;
    revenue_prior: number;
    estimated_margin: number;
  }>;
  // Geographic (optional)
  geo_revenue?: Array<{
    region: string;
    revenue: number;
    estimated_users: number;
  }>;
}

export class TechFinancialAnalysis {

  analyze(input: TechFinancialInput): TechFinancialProfile {
    const sbc = this.analyzeSBC(input);
    const capex = this.analyzeCapEx(input);
    const incremental = this.analyzeIncrementalMargins(input);
    const rd = this.analyzeRD(input);
    const segments = this.analyzeSegments(input);
    const arpu = this.analyzeARPU(input);
    const shareholderYield = this.analyzeShareholderYield(input);
    const capexCycle = this.assessCapExCycle(input);
    const valuation = this.calculateAdjustedValuation(input, capex, sbc, segments);

    const revGrowth = (input.revenue - input.revenue_prior) / input.revenue_prior;
    const fcfMargin = (input.operating_cf - input.capex) / input.revenue;
    const adjustedFCFMargin = capex.owner_earnings / input.revenue;
    const rule40Reported = (revGrowth * 100) + (fcfMargin * 100);
    const rule40Adjusted = (revGrowth * 100) + (adjustedFCFMargin * 100);

    const revPerEmployee = input.revenue / input.employees;

    const signals: string[] = [];
    if (sbc.sbc_as_pct_oi > 0.25) signals.push(`SBC过高: 占经营利润${(sbc.sbc_as_pct_oi * 100).toFixed(0)}% — 真实盈利被高估`);
    if (capex.growth_pct > 0.7) signals.push(`增长CapEx占比${(capex.growth_pct * 100).toFixed(0)}% — 处于激进投资模式`);
    if (incremental.incremental_opm > 0.5) signals.push(`增量OPM ${(incremental.incremental_opm * 100).toFixed(0)}% — 极强运营杠杆`);
    if (capex.capex_phase === 'ramp_up') signals.push('CapEx加速期 — FCF暂时性压缩');
    if (valuation.adjusted_mos < -0.15) signals.push(`科技修正后MoS=${(valuation.adjusted_mos * 100).toFixed(0)}% — 明显高估`);
    if (rule40Adjusted > 40) signals.push(`Rule of 40通过(调整后${rule40Adjusted.toFixed(0)}) — 健康科技公司`);
    if (shareholderYield.net_yield < 0.01) signals.push('净股东回报偏低(<1%) — CapEx吸收现金');

    const keyMonitors: string[] = [
      'CapEx/Revenue — 何时回落<15%? (当前CapEx投资周期关键)',
      'SBC/Revenue — 是否持续收敛? (真实盈利效率)',
    ];
    if (segments.some(s => s.strategic_role === 'growth_driver' && s.estimated_margin < 0.25)) {
      keyMonitors.push('增长业务利润率 — 是否向成熟竞对靠拢?');
    }
    if (capex.capex_phase === 'ramp_up' || capex.capex_phase === 'peak') {
      keyMonitors.push('增长CapEx ROI — 新投资是否产生可见收入?');
    }

    // Tech Score: weighted composite
    const techScore = this.calculateTechScore(sbc, capex, incremental, rd, rule40Adjusted, shareholderYield, capexCycle);

    return {
      ticker: input.ticker,
      sbc, capex, incremental, rd, segments, arpu,
      shareholder_yield: shareholderYield,
      capex_cycle: capexCycle,
      valuation,
      rule_of_40: { reported: Math.round(rule40Reported * 10) / 10, adjusted: Math.round(rule40Adjusted * 10) / 10, pass: rule40Adjusted >= 40 },
      revenue_per_employee: revPerEmployee,
      tech_score: techScore,
      key_monitors: keyMonitors,
      signals,
    };
  }

  private analyzeSBC(input: TechFinancialInput): SBCAdjustedMetrics {
    const pctRevenue = input.sbc / input.revenue;
    const pctOI = input.sbc / input.operating_income;
    const adjustedOI = input.operating_income - input.sbc;
    const adjustedOPM = adjustedOI / input.revenue;
    const reportedEPS = input.net_income / input.shares_outstanding;
    const adjustedEPS = (input.net_income - input.sbc * 0.75) / input.shares_outstanding; // 75% after tax
    const adjustedPE = input.current_price / adjustedEPS;
    const dilutionRate = input.sbc / input.market_cap;

    let sbcTrend: SBCAdjustedMetrics['sbc_trend'] = 'stable';
    if (input.sbc_prior) {
      const priorPctRev = input.sbc_prior / input.revenue_prior;
      if (pctRevenue < priorPctRev * 0.95) sbcTrend = 'contracting';
      else if (pctRevenue > priorPctRev * 1.05) sbcTrend = 'expanding';
    }

    return {
      reported_operating_income: input.operating_income,
      sbc_amount: input.sbc,
      sbc_as_pct_revenue: pctRevenue,
      sbc_as_pct_oi: pctOI,
      adjusted_operating_income: adjustedOI,
      adjusted_opm: adjustedOPM,
      adjusted_eps: adjustedEPS,
      adjusted_pe: adjustedPE,
      sbc_dilution_rate: dilutionRate,
      sbc_trend: sbcTrend,
    };
  }

  private analyzeCapEx(input: TechFinancialInput): CapExAnalysis {
    const maintenanceCapex = input.depreciation; // D&A ≈ maintenance
    const growthCapex = Math.max(0, input.capex - maintenanceCapex);
    const growthPct = input.capex > 0 ? growthCapex / input.capex : 0;
    const capexIntensity = input.capex / input.revenue;
    const ownerEarnings = input.net_income + input.depreciation - maintenanceCapex;
    const ownerEarningsPE = input.market_cap / ownerEarnings;

    const revGrowth = input.revenue - input.revenue_prior;
    const growthROI = growthCapex > 0 ? revGrowth / growthCapex : 0;

    let capexYoY = 0;
    if (input.capex_prior && input.capex_prior > 0) {
      capexYoY = (input.capex - input.capex_prior) / input.capex_prior;
    }

    let phase: CapExAnalysis['capex_phase'] = 'maintenance';
    if (capexYoY > 0.3) phase = 'ramp_up';
    else if (capexIntensity > 0.18 && capexYoY < 0.1) phase = 'peak';
    else if (capexYoY < -0.1) phase = 'normalization';

    return {
      total_capex: input.capex,
      depreciation: input.depreciation,
      maintenance_capex: maintenanceCapex,
      growth_capex: growthCapex,
      growth_pct: growthPct,
      capex_intensity: capexIntensity,
      capex_yoy_growth: capexYoY,
      owner_earnings: ownerEarnings,
      owner_earnings_pe: ownerEarningsPE,
      growth_capex_roi: growthROI,
      capex_phase: phase,
    };
  }

  private analyzeIncrementalMargins(input: TechFinancialInput): IncrementalMargins {
    const revChange = input.revenue - input.revenue_prior;
    const oiChange = input.operating_income - input.operating_income_prior;
    const incOPM = revChange > 0 ? oiChange / revChange : 0;
    const incNPM = revChange > 0 ? (input.net_income - input.operating_income_prior * 0.75) / revChange : 0;

    const currentOPM = input.operating_income / input.revenue;
    const priorOPM = input.operating_income_prior / input.revenue_prior;
    let trajectory: IncrementalMargins['margin_trajectory'] = 'stable';
    if (currentOPM > priorOPM + 0.02) trajectory = 'expanding';
    else if (currentOPM < priorOPM - 0.02) trajectory = 'compressing';

    return {
      revenue_change: revChange,
      oi_change: oiChange,
      incremental_opm: incOPM,
      incremental_npm: incNPM,
      margin_trajectory: trajectory,
    };
  }

  private analyzeRD(input: TechFinancialInput): RDEfficiency {
    const rdPctRev = input.rd_expense / input.revenue;
    const revChange = input.revenue - input.revenue_prior;
    const efficiency = input.rd_expense > 0 ? revChange / input.rd_expense : 0;
    const capitalizedRD = input.rd_expense * 5; // 5年存量假设
    const adjustedBook = input.total_equity + capitalizedRD;
    const adjustedPB = input.market_cap / adjustedBook;

    return {
      rd_spend: input.rd_expense,
      rd_as_pct_revenue: rdPctRev,
      rd_efficiency: efficiency,
      capitalized_rd_asset: capitalizedRD,
      adjusted_book_value: adjustedBook,
      adjusted_pb: adjustedPB,
    };
  }

  private analyzeSegments(input: TechFinancialInput): SegmentEconomics[] {
    if (!input.segments || input.segments.length === 0) return [];

    const totalProfit = input.segments.reduce((s, seg) =>
      s + seg.revenue * seg.estimated_margin, 0);

    return input.segments.map(seg => {
      const growth = seg.revenue_prior > 0
        ? (seg.revenue - seg.revenue_prior) / seg.revenue_prior
        : 0;
      const profit = seg.revenue * seg.estimated_margin;
      const profitContribution = totalProfit > 0 ? profit / totalProfit : 0;
      const rule40 = growth * 100 + seg.estimated_margin * 100;

      let role: SegmentEconomics['strategic_role'] = 'ecosystem_lock';
      if (seg.estimated_margin > 0.4 && growth < 0.15) role = 'profit_engine';
      else if (growth > 0.25) role = 'growth_driver';
      else if (growth < 0 || seg.estimated_margin < 0) role = seg.estimated_margin < -1 ? 'option' : 'declining';

      return {
        name: seg.name,
        revenue: seg.revenue,
        growth_rate: growth,
        estimated_margin: seg.estimated_margin,
        profit_contribution: profitContribution,
        rule_of_40: Math.round(rule40),
        strategic_role: role,
      };
    });
  }

  private analyzeARPU(input: TechFinancialInput): ARPUAnalysis[] {
    if (!input.geo_revenue || input.geo_revenue.length === 0) return [];

    const usEntry = input.geo_revenue.find(g =>
      g.region.toLowerCase().includes('us') || g.region.toLowerCase().includes('united states'));
    const usARPU = usEntry && usEntry.estimated_users > 0
      ? usEntry.revenue / usEntry.estimated_users
      : 1; // fallback

    return input.geo_revenue.map(g => {
      const arpu = g.estimated_users > 0 ? g.revenue / g.estimated_users : 0;
      const vsUS = usARPU > 0 ? arpu / usARPU : 0;
      // Gap: if region reached 20% of US ARPU, how much additional revenue?
      const targetARPU = usARPU * 0.2;
      const gap = Math.max(0, (targetARPU - arpu) * g.estimated_users);

      return {
        region: g.region,
        revenue: g.revenue,
        estimated_users: g.estimated_users,
        arpu,
        vs_us_ratio: vsUS,
        monetization_gap: gap,
      };
    });
  }

  private analyzeShareholderYield(input: TechFinancialInput): ShareholderYield {
    const buybackYield = input.market_cap > 0 ? input.buyback / input.market_cap : 0;
    const divYield = input.dividend && input.market_cap > 0 ? input.dividend / input.market_cap : 0;
    const sbcDilution = input.market_cap > 0 ? -(input.sbc / input.market_cap) : 0;
    const netYield = buybackYield + divYield + sbcDilution;

    const vsPeers: ShareholderYield['vs_peers'] =
      netYield > 0.025 ? 'above' : netYield > 0.012 ? 'inline' : 'below';

    return {
      buyback_amount: input.buyback,
      buyback_yield: buybackYield,
      dividend_yield: divYield,
      sbc_dilution: sbcDilution,
      net_yield: netYield,
      vs_peers: vsPeers,
    };
  }

  private assessCapExCycle(input: TechFinancialInput): CapExCycleAssessment {
    const intensity = input.capex / input.revenue;
    const normalIntensity = 0.12; // 正常化假设12%
    const normalCapex = input.revenue * 1.15 * normalIntensity; // 1年后收入×正常强度
    const normalFCF = input.operating_cf * 1.1 - normalCapex; // 估算正常化FCF

    const signals: string[] = [];
    let peakYear = 2027; // 默认

    if (intensity > 0.18) {
      signals.push(`CapEx强度${(intensity * 100).toFixed(0)}%远超正常(12%) — 投资高峰期`);
      if (input.capex_prior && input.capex / input.capex_prior > 1.4) {
        signals.push('CapEx同比增>40% — 仍在加速, 峰值未至');
        peakYear = 2026;
      }
    }
    if (intensity < 0.13) {
      signals.push('CapEx已正常化 — FCF将充分释放');
      peakYear = 2024;
    }

    const impliedPFCF = normalFCF > 0 ? input.market_cap / normalFCF : 999;
    signals.push(`正常化后P/FCF≈${impliedPFCF.toFixed(0)}x (当前${(input.market_cap / (input.operating_cf - input.capex)).toFixed(0)}x)`);

    return {
      current_intensity: intensity,
      peak_estimate_year: peakYear,
      normalization_intensity: normalIntensity,
      fcf_at_normalization: normalFCF,
      implied_pfcf_at_normal: impliedPFCF,
      signals,
    };
  }

  private calculateAdjustedValuation(
    input: TechFinancialInput,
    capex: CapExAnalysis,
    sbc: SBCAdjustedMetrics,
    segments: SegmentEconomics[],
  ): TechAdjustedValuation {
    const revGrowth = (input.revenue - input.revenue_prior) / input.revenue_prior;

    // Method 1: Owner Earnings
    const oeMultiple = revGrowth > 0.15 ? 30 : revGrowth > 0.1 ? 27 : revGrowth > 0.05 ? 22 : 18;
    const method1 = (capex.owner_earnings * oeMultiple - input.sbc * oeMultiple * 0.3) / input.shares_outstanding;

    // Method 2: CapEx normalization (2yr forward, discounted)
    const normalFCF = input.operating_cf * 1.1 * 1.1 - input.revenue * 1.25 * 0.12;
    const normalMultiple = revGrowth > 0.12 ? 30 : 25;
    const method2FV = normalFCF * normalMultiple;
    const method2 = (method2FV / (1.1 * 1.1)) / input.shares_outstanding; // 折回2年

    // Method 3: SOTP + synergy
    let sotpValue = 0;
    if (segments.length > 0) {
      for (const seg of segments) {
        const profit = seg.revenue * seg.estimated_margin;
        let multiple = 20;
        if (seg.strategic_role === 'growth_driver') multiple = seg.growth_rate > 0.25 ? 50 : 35;
        else if (seg.strategic_role === 'profit_engine') multiple = 20;
        else if (seg.strategic_role === 'option') multiple = 0; // valued separately
        else if (seg.strategic_role === 'declining') multiple = 10;
        sotpValue += profit * multiple;
      }
      sotpValue *= 1.2; // 20% synergy premium
    } else {
      sotpValue = input.market_cap; // no segment data, use market cap
    }
    const method3 = sotpValue / input.shares_outstanding;

    // Weighted
    const weighted = method1 * 0.25 + method2 * 0.40 + method3 * 0.35;
    const adjustedMoS = (weighted - input.current_price) / weighted;

    // Compare with generic CFA MoS (using simple PE-based fair value)
    const genericFV = (input.net_income / input.shares_outstanding) * (revGrowth > 0.1 ? 30 : 25);
    const genericMoS = (genericFV - input.current_price) / genericFV;

    let conclusion = '';
    if (adjustedMoS > 0.2) conclusion = '科技修正后仍低估 — 买入';
    else if (adjustedMoS > 0.05) conclusion = '科技修正后合理偏低 — 持有偏积极';
    else if (adjustedMoS > -0.1) conclusion = '科技修正后合理 — 持有';
    else if (adjustedMoS > -0.2) conclusion = '科技修正后偏高 — 持有观望';
    else conclusion = '科技修正后明显高估 — 不宜新建仓位';

    return {
      method1_owner_earnings: method1,
      method2_capex_normal: method2,
      method3_sotp_synergy: method3,
      weighted_fair_value: weighted,
      current_price: input.current_price,
      adjusted_mos: adjustedMoS,
      vs_generic_mos: adjustedMoS - genericMoS,
      conclusion,
    };
  }

  private calculateTechScore(
    sbc: SBCAdjustedMetrics,
    capex: CapExAnalysis,
    incremental: IncrementalMargins,
    rd: RDEfficiency,
    rule40: number,
    yield_: ShareholderYield,
    cycle: CapExCycleAssessment,
  ): number {
    let score = 50; // 基础分

    // SBC (控制好=加分)
    if (sbc.sbc_as_pct_revenue < 0.05) score += 10;
    else if (sbc.sbc_as_pct_revenue < 0.08) score += 5;
    else if (sbc.sbc_as_pct_revenue > 0.15) score -= 10;
    if (sbc.sbc_trend === 'contracting') score += 5;

    // CapEx效率
    if (capex.growth_capex_roi > 0.5) score += 10;
    else if (capex.growth_capex_roi > 0.2) score += 5;
    if (capex.capex_phase === 'normalization') score += 8; // FCF即将释放
    if (capex.capex_phase === 'ramp_up') score -= 5; // 暂时性压力

    // 增量利润率
    if (incremental.incremental_opm > 0.5) score += 10;
    else if (incremental.incremental_opm > 0.3) score += 5;
    if (incremental.margin_trajectory === 'expanding') score += 5;
    if (incremental.margin_trajectory === 'compressing') score -= 5;

    // R&D效率
    if (rd.rd_efficiency > 0.8) score += 8;
    else if (rd.rd_efficiency > 0.5) score += 4;

    // Rule of 40
    if (rule40 > 50) score += 8;
    else if (rule40 > 40) score += 4;
    else score -= 5;

    // 股东回报
    if (yield_.net_yield > 0.03) score += 5;
    else if (yield_.net_yield < 0.01) score -= 3;

    return Math.max(0, Math.min(100, score));
  }
}

export const techFinancialAnalysis = new TechFinancialAnalysis();
