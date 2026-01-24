/**
 * 核心类型定义
 */

// 证据等级
export type EvidenceGrade = 'A' | 'B' | 'C';

// 周期阶段
export type CycleStage = 'trough' | 'early_recovery' | 'mid_cycle' | 'peak';

// 公司基础信息
export interface Company {
  ticker: string;
  name: string;
  cik?: string; // SEC CIK号
  sector: string;
  market_cap?: number;
  // 财务指标
  pe_ttm?: number;
  ev_ebit_ttm?: number;
  gross_margin?: number;
  roic?: number;
  revenue_growth_yoy?: number;
  // 周期信息（可选，由外部注入或推断）
  cycle_stage?: CycleStage;
}

// 供应链边（上下游关系）
export interface SupplyChainEdge {
  id: string;
  supplier_ticker: string;  // 上游供应商
  customer_ticker: string;  // 下游客户
  evidence_grade: EvidenceGrade;
  evidence_source: string;  // 证据来源（如SEC filing accession number）
  evidence_text: string;    // 证据原文
  extracted_at: Date;
  confidence: number;       // 0-1
}

// 心理学调整明细
export interface PsychologyAdjustment {
  cycle_stage_adjustment: number;    // 周期阶段修正 (±10)
  contrarian_adjustment: number;     // 逆向修正 (±15)
  bias_warnings: string[];           // 偏误警告
  crowd_signal?: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
}

// 周度评分
export interface WeeklyScore {
  ticker: string;
  week_start: string;  // YYYY-MM-DD
  overall_score: number;
  valuation_score: number;
  evidence_score: number;
  momentum_score: number;
  psychology_adjustment: number;     // 心理学修正值
  psychology_detail?: PsychologyAdjustment;  // 修正明细
  risk_flags: string[];
  rank: number;
  config_version: string;
}

// 评分配置
export interface ScoringConfig {
  version: string;
  effective_date: string;
  thresholds: {
    pe_overvalued: number;
    pe_undervalued: number;
    ev_ebit_overvalued: number;
    gm_healthy: number;
    roic_good: number;
  };
  weights: {
    valuation: number;
    evidence: number;
    momentum: number;
  };
  evidence_weights: {
    A: number;
    B: number;
    C: number;
  };
}

// SEC Filing信息
export interface SECFiling {
  accession_number: string;
  form_type: string;  // 10-K, 10-Q, 8-K等
  filing_date: string;
  cik: string;
  company_name: string;
  items_extracted: string[];  // 抽取的章节
}

// 抓取日志
export interface FetchLog {
  url: string;
  timestamp: Date;
  duration_ms: number;
  status: 'success' | 'failed' | 'rate_limited';
  error_message?: string;
}

// Agent任务结果
export interface AgentResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  logs: FetchLog[];
}

// 周报输出
export interface WeeklyReport {
  generated_at: Date;
  week_start: string;
  config_version: string;
  summary: {
    total_companies: number;
    new_edges_found: number;
    top_ranked: string[];
    risk_alerts: string[];
  };
  scores: WeeklyScore[];
  new_evidence: SupplyChainEdge[];
}
