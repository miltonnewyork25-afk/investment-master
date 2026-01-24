/**
 * Multi-Perspective Validator
 * 对每个分析结果进行5视角交叉验证
 * 基于: self-validation.yaml 的虚拟视角系统
 *
 * 输入: 分析结论(评分+方向+论点)
 * 输出: 验证分数 + 信心等级 + 分歧点
 */

import type { WeeklyScore, CycleStage } from '../types/index.js';

export interface PerspectiveResult {
  perspective: string;
  role: string;
  assessment: 'agree' | 'disagree' | 'uncertain';
  score: number;         // 0-100 该视角对结论的支持度
  key_argument: string;  // 核心论点
  blind_spot: string;    // 识别的盲点
}

export interface ValidationResult {
  ticker: string;
  original_score: number;
  original_direction: 'bullish' | 'bearish' | 'neutral';
  perspectives: PerspectiveResult[];
  consensus_score: number;       // 0-100 共识强度
  confidence_level: 'high' | 'medium' | 'low' | 'insufficient';
  dissent_points: string[];      // 分歧要点
  recommendation: string;        // 最终建议
}

class MultiPerspectiveValidator {
  /**
   * 对单个股票的评分结论进行5视角验证
   */
  validate(score: WeeklyScore): ValidationResult {
    const direction = this.getDirection(score.overall_score);
    const perspectives: PerspectiveResult[] = [];

    // 视角1: 极度看多者
    perspectives.push(this.bullAdvocate(score, direction));
    // 视角2: 极度看空者
    perspectives.push(this.bearAdvocate(score, direction));
    // 视角3: 局外人
    perspectives.push(this.naiveOutsider(score, direction));
    // 视角4: 纯数据审计
    perspectives.push(this.quantAuditor(score, direction));
    // 视角5: 对抗性批评
    perspectives.push(this.adversarialCritic(score, direction));

    // 计算共识
    const agreeCount = perspectives.filter(p => p.assessment === 'agree').length;
    const consensus = Math.round((agreeCount / perspectives.length) * 100);

    // 确定信心等级
    const confidence = agreeCount >= 4 ? 'high'
      : agreeCount >= 3 ? 'medium'
      : agreeCount >= 2 ? 'low'
      : 'insufficient';

    // 收集分歧点
    const dissent = perspectives
      .filter(p => p.assessment === 'disagree')
      .map(p => `[${p.perspective}] ${p.key_argument}`);

    // 生成建议
    const recommendation = this.generateRecommendation(score, confidence, dissent);

    return {
      ticker: score.ticker,
      original_score: score.overall_score,
      original_direction: direction,
      perspectives,
      consensus_score: consensus,
      confidence_level: confidence,
      dissent_points: dissent,
      recommendation,
    };
  }

  /**
   * 批量验证
   */
  validateAll(scores: WeeklyScore[]): ValidationResult[] {
    return scores.map(s => this.validate(s));
  }

  private getDirection(score: number): 'bullish' | 'bearish' | 'neutral' {
    if (score >= 70) return 'bullish';
    if (score <= 30) return 'bearish';
    return 'neutral';
  }

  /**
   * 视角1: 极度看多者
   * 问: "如果我坚信必涨，数据中有什么支撑？"
   */
  private bullAdvocate(score: WeeklyScore, direction: string): PerspectiveResult {
    const isAligned = direction === 'bullish';

    // 看多者寻找正面信号
    const positiveSignals: string[] = [];
    if (score.valuation_score > 60) positiveSignals.push('估值合理偏低');
    if (score.evidence_score > 50) positiveSignals.push('供应链证据支撑');
    if (score.momentum_score > 60) positiveSignals.push('收入增长动量正面');
    if (score.psychology_adjustment > 0) positiveSignals.push('逆向信号偏多(群体恐惧)');

    const hasStrongBullCase = positiveSignals.length >= 3;

    return {
      perspective: 'bull_advocate',
      role: '极度看多者',
      assessment: hasStrongBullCase ? 'agree' : (positiveSignals.length >= 2 ? 'uncertain' : 'disagree'),
      score: Math.min(100, positiveSignals.length * 25),
      key_argument: positiveSignals.length > 0
        ? `看多依据: ${positiveSignals.join(', ')}`
        : '缺乏足够的正面信号支撑看多论点',
      blind_spot: direction === 'bearish'
        ? '看多者可能忽视了估值过热和周期顶部信号'
        : '看多者可能过度权重近期正面信号',
    };
  }

  /**
   * 视角2: 极度看空者
   * 问: "如果我坚信必跌，数据中有什么支撑？"
   */
  private bearAdvocate(score: WeeklyScore, direction: string): PerspectiveResult {
    const negativeSignals: string[] = [];
    if (score.valuation_score < 40) negativeSignals.push('估值偏高或亏损');
    if (score.evidence_score < 40) negativeSignals.push('证据不足');
    if (score.momentum_score < 40) negativeSignals.push('收入增长放缓或下滑');
    if (score.psychology_adjustment < 0) negativeSignals.push('逆向信号偏空(群体贪婪)');
    if (score.risk_flags.length >= 3) negativeSignals.push(`${score.risk_flags.length}个风险标志触发`);

    const hasStrongBearCase = negativeSignals.length >= 3;

    return {
      perspective: 'bear_advocate',
      role: '极度看空者',
      assessment: hasStrongBearCase ? 'agree' : (negativeSignals.length >= 2 ? 'uncertain' : 'disagree'),
      score: Math.min(100, negativeSignals.length * 25),
      key_argument: negativeSignals.length > 0
        ? `看空依据: ${negativeSignals.join(', ')}`
        : '缺乏足够的负面信号支撑看空论点',
      blind_spot: direction === 'bullish'
        ? '看空者可能忽视了底部逆向机会'
        : '看空者可能受近期负面事件过度影响(近期偏误)',
    };
  }

  /**
   * 视角3: 局外人
   * 问: "如果我第一次看到这个分析，什么不明白？"
   */
  private naiveOutsider(score: WeeklyScore, direction: string): PerspectiveResult {
    const concerns: string[] = [];

    // 检查分数是否"太极端"(不太可信)
    if (score.overall_score > 90) concerns.push('评分>90看起来过于乐观');
    if (score.overall_score < 10) concerns.push('评分<10看起来过于悲观');

    // 检查子分数是否一致
    const scores = [score.valuation_score, score.evidence_score, score.momentum_score];
    const range = Math.max(...scores) - Math.min(...scores);
    if (range > 40) concerns.push('各维度评分差距大(>40),需解释为何分歧');

    // 检查风险标志是否与方向矛盾
    if (direction === 'bullish' && score.risk_flags.length >= 2) {
      concerns.push('看多方向但有多个风险标志,需要解释');
    }

    // 心理调整是否过大
    if (Math.abs(score.psychology_adjustment) > 15) {
      concerns.push('心理修正幅度大(>15),需验证逆向信号可靠性');
    }

    const isAligned = concerns.length <= 1;  // 局外人觉得合理

    return {
      perspective: 'naive_outsider',
      role: '局外人(第一次看)',
      assessment: isAligned ? 'agree' : (concerns.length <= 2 ? 'uncertain' : 'disagree'),
      score: Math.max(0, 100 - concerns.length * 25),
      key_argument: concerns.length > 0
        ? `疑问: ${concerns.join('; ')}`
        : '分析逻辑清晰,结论与数据一致',
      blind_spot: '局外人可能不理解逆周期逻辑(底部看好=反直觉)',
    };
  }

  /**
   * 视角4: 纯数据审计员
   * 问: "纯粹看数字，数据支持什么？"
   */
  private quantAuditor(score: WeeklyScore, direction: string): PerspectiveResult {
    // 纯数据视角: 只看子分数的一致性和绝对水平
    const valStrong = score.valuation_score >= 60;
    const evStrong = score.evidence_score >= 50;
    const momStrong = score.momentum_score >= 60;

    const strongFactors = [valStrong, evStrong, momStrong].filter(Boolean).length;

    let dataDirection: 'bullish' | 'bearish' | 'neutral';
    if (strongFactors >= 2) dataDirection = 'bullish';
    else if (strongFactors === 0) dataDirection = 'bearish';
    else dataDirection = 'neutral';

    const isAligned = dataDirection === direction;

    return {
      perspective: 'quant_auditor',
      role: '数据审计员',
      assessment: isAligned ? 'agree' : (dataDirection === 'neutral' ? 'uncertain' : 'disagree'),
      score: Math.round((score.valuation_score + score.evidence_score + score.momentum_score) / 3),
      key_argument: `数据方向: ${dataDirection} (估值${valStrong ? '✓' : '✗'}, 证据${evStrong ? '✓' : '✗'}, 动量${momStrong ? '✓' : '✗'})`,
      blind_spot: '纯数据忽略周期位置和群体心理,可能在底部给出看空信号',
    };
  }

  /**
   * 视角5: 对抗性批评者
   * 问: "如果这个结论完全错误，最可能的原因是什么？"
   */
  private adversarialCritic(score: WeeklyScore, direction: string): PerspectiveResult {
    const vulnerabilities: string[] = [];

    // 寻找最薄弱的假设
    if (score.evidence_score < 50) {
      vulnerabilities.push('证据基础薄弱:供应链数据不足以支撑结论');
    }

    // 寻找过度依赖单一因子
    if (score.valuation_score > 80 && score.momentum_score < 40) {
      vulnerabilities.push('价值陷阱风险:估值低但增长持续恶化=可能有结构性问题');
    }
    if (score.momentum_score > 80 && score.valuation_score < 40) {
      vulnerabilities.push('动量陷阱:增长强但估值已过热=可能在周期顶部');
    }

    // 心理修正可能错误
    if (score.psychology_adjustment > 10) {
      vulnerabilities.push('逆向信号可能过早:群体恐惧可能是理性反应而非偏误');
    }
    if (score.psychology_adjustment < -10) {
      vulnerabilities.push('逆向信号可能过早:群体乐观可能有基本面支撑');
    }

    // 黑天鹅风险
    if (score.risk_flags.length === 0 && direction === 'bullish') {
      vulnerabilities.push('盲点:没有风险标志可能意味着框架遗漏了某些风险');
    }

    const isVulnerable = vulnerabilities.length >= 2;

    return {
      perspective: 'adversarial_critic',
      role: '对抗性批评者',
      assessment: isVulnerable ? 'disagree' : (vulnerabilities.length >= 1 ? 'uncertain' : 'agree'),
      score: Math.max(0, 100 - vulnerabilities.length * 30),
      key_argument: vulnerabilities.length > 0
        ? `主要脆弱点: ${vulnerabilities[0]}`
        : '未发现明显脆弱假设',
      blind_spot: '对抗性批评可能过度怀疑,在强信号面前也能找到漏洞',
    };
  }

  /**
   * 基于共识生成最终建议
   */
  private generateRecommendation(
    score: WeeklyScore,
    confidence: string,
    dissent: string[]
  ): string {
    const direction = this.getDirection(score.overall_score);

    if (confidence === 'high') {
      return `高信心${direction === 'bullish' ? '看多' : direction === 'bearish' ? '看空' : '中性'}信号 — 4/5视角一致`;
    }
    if (confidence === 'medium') {
      return `中等信心信号 — 存在分歧: ${dissent[0] || '部分视角不确定'}`;
    }
    if (confidence === 'low') {
      return `低信心 — 多视角分歧显著,建议等待更多数据`;
    }
    return `证据不足 — 不建议采取行动,需要更多数据源`;
  }
}

export const validator = new MultiPerspectiveValidator();
export { MultiPerspectiveValidator };
