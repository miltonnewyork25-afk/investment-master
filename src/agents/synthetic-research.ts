/**
 * Synthetic Research Agent
 * 模拟不同投资者Persona对市场刺激的反应
 * 基于: synthetic-research.yaml 的Persona库
 *
 * 注意: 此Agent生成Prompt模板和结构化输出格式。
 * 实际LLM调用需要通过外部接口(Claude API/Skill)执行。
 * 此模块提供: Persona构建 + 刺激注入 + 反应解析 + 聚合分析
 */

export interface PersonaConfig {
  id: string;
  name: string;
  demographics: {
    age: number;
    experience_years: number;
    portfolio_size: string;
  };
  psychology: {
    risk_tolerance: number;      // 0-1
    loss_aversion_lambda: number; // 1.0-4.0
    check_frequency: string;
    dominant_system: 'system_1' | 'system_2' | 'mixed';
  };
  biases: string[];
  info_sources: string[];
  prompt_prefix: string;
}

export interface StimulusConfig {
  type: 'content_reaction' | 'market_event' | 'cycle_signal';
  content: string;
  context: {
    market_state: string;
    recent_price_action?: string;
    current_positions?: string;
  };
}

export interface PersonaResponse {
  persona_id: string;
  emotional_valence: number;     // -1.0 to +1.0
  credibility_score: number;     // 0-10
  action_intent: 'buy' | 'hold' | 'sell' | 'research_more' | 'ignore';
  share_probability: number;     // 0-1
  belief_update: number;         // -1.0 to +1.0
  reasoning: string;
}

export interface AggregatedResult {
  stimulus_type: string;
  total_respondents: number;
  emotion_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  action_distribution: {
    buy: number;
    hold: number;
    sell: number;
    research_more: number;
    ignore: number;
  };
  avg_credibility: number;
  avg_share_probability: number;
  persona_breakdown: PersonaResponse[];
  key_insight: string;
}

// === 预定义Persona库 ===

const PERSONAS: PersonaConfig[] = [
  {
    id: 'retail_momentum',
    name: '散户动量交易者',
    demographics: { age: 28, experience_years: 2, portfolio_size: '$25K' },
    psychology: {
      risk_tolerance: 0.85,
      loss_aversion_lambda: 1.8,
      check_frequency: '10+/day',
      dominant_system: 'system_1',
    },
    biases: ['FOMO', 'recency_bias', 'overconfidence', 'hot_hand'],
    info_sources: ['Reddit', 'Twitter', 'YouTube'],
    prompt_prefix: `你是一个28岁的散户动量交易者,投资经验2年,总资产$25K。你主要在Reddit和Twitter获取信息,容易受FOMO影响,倾向追涨杀跌。你对技术分析有基本了解但更依赖直觉和社交信号。`,
  },
  {
    id: 'retail_value',
    name: '散户价值投资者',
    demographics: { age: 42, experience_years: 10, portfolio_size: '$300K' },
    psychology: {
      risk_tolerance: 0.45,
      loss_aversion_lambda: 2.5,
      check_frequency: '1-2/week',
      dominant_system: 'system_2',
    },
    biases: ['anchoring', 'endowment_effect', 'status_quo', 'confirmation'],
    info_sources: ['SEC filings', 'annual reports', 'Substack'],
    prompt_prefix: `你是一个42岁的价值投资者,遵循Buffett哲学,10年经验,管理$300K。你重视基本面,对估值高度敏感,倾向在恐慌时买入。你可能有锚定偏误和确认偏误。`,
  },
  {
    id: 'retail_anxious',
    name: '保守储蓄者',
    demographics: { age: 55, experience_years: 15, portfolio_size: '$500K' },
    psychology: {
      risk_tolerance: 0.15,
      loss_aversion_lambda: 3.5,
      check_frequency: 'monthly',
      dominant_system: 'system_1',
    },
    biases: ['loss_aversion_extreme', 'zero_risk_bias', 'status_quo', 'availability'],
    info_sources: ['financial advisor', 'TV news', 'bank statements'],
    prompt_prefix: `你是一个55岁的保守投资者,接近退休,退休账户$500K(多为指数基金)。你极度害怕亏损(经历过2008年),主要依赖理财顾问,很少主动调整投资。`,
  },
  {
    id: 'institutional_pm',
    name: '机构投资经理',
    demographics: { age: 38, experience_years: 15, portfolio_size: '$500M AUM' },
    psychology: {
      risk_tolerance: 0.55,
      loss_aversion_lambda: 1.5,
      check_frequency: 'continuous',
      dominant_system: 'system_2',
    },
    biases: ['career_risk', 'groupthink', 'anchoring_to_consensus'],
    info_sources: ['Bloomberg', 'sell-side research', 'expert networks'],
    prompt_prefix: `你是一个管理$500M的机构PM,CFA持证,15年买方经验。你受风险预算和投资委员会约束,主要压力是相对基准表现。倾向有催化剂时才建仓。`,
  },
  {
    id: 'quant_researcher',
    name: '量化研究员',
    demographics: { age: 32, experience_years: 8, portfolio_size: 'N/A (策略管理)' },
    psychology: {
      risk_tolerance: 0.60,
      loss_aversion_lambda: 1.2,
      check_frequency: 'model-driven',
      dominant_system: 'system_2',
    },
    biases: ['overfitting', 'complexity_bias', 'model_worship'],
    info_sources: ['academic papers', 'proprietary data', 'alternative data'],
    prompt_prefix: `你是一个量化研究员(PhD Physics),用统计模型和ML做投资决策。你关注夏普比率和样本外表现,不信任主观判断。你对"100%准确率"会本能怀疑。`,
  },
  {
    id: 'crypto_native',
    name: '加密原生交易者',
    demographics: { age: 24, experience_years: 3, portfolio_size: '$50K (高波动)' },
    psychology: {
      risk_tolerance: 0.95,
      loss_aversion_lambda: 1.3,
      check_frequency: '24/7',
      dominant_system: 'system_1',
    },
    biases: ['gambler_fallacy', 'FOMO_extreme', 'overconfidence', 'narrative_fallacy'],
    info_sources: ['Crypto Twitter', 'Telegram', 'Discord'],
    prompt_prefix: `你是一个24岁的加密交易者,全天候盯盘,习惯极端波动(-90%到+1000%)。你主要通过KOL和Telegram群获取信息,容易all-in一个叙事。`,
  },
];

class SyntheticResearch {
  /**
   * 获取所有Persona
   */
  getPersonas(): PersonaConfig[] {
    return PERSONAS;
  }

  /**
   * 为指定Persona构建完整Prompt
   */
  buildPrompt(persona: PersonaConfig, stimulus: StimulusConfig): string {
    const systemPrompt = `${persona.prompt_prefix}\n\n当前市场状态: ${stimulus.context.market_state}`;

    const userPrompt = this.buildStimulusPrompt(stimulus);

    const responseFormat = `请用以下JSON格式回答:
{
  "first_reaction": "你的第一反应(1-2个词的情绪)",
  "emotional_valence": <-1.0到1.0之间的数字>,
  "credibility_score": <0-10之间的整数>,
  "action": "<buy|hold|sell|research_more|ignore>",
  "action_reasoning": "为什么选择这个行动",
  "share_probability": <0到1之间的数字>,
  "belief_update": <-1.0到1.0之间的数字, 负=更悲观, 正=更乐观>,
  "what_info_needed": "你还需要什么信息才能做决策"
}`;

    return `[SYSTEM]\n${systemPrompt}\n\n[USER]\n${userPrompt}\n\n[RESPONSE FORMAT]\n${responseFormat}`;
  }

  /**
   * 构建刺激Prompt
   */
  private buildStimulusPrompt(stimulus: StimulusConfig): string {
    switch (stimulus.type) {
      case 'content_reaction':
        return `你刚在社交媒体上看到以下内容:\n---\n${stimulus.content}\n---\n请描述你的反应。`;

      case 'market_event':
        return `重大市场事件发生:\n${stimulus.content}\n\n${stimulus.context.recent_price_action ? `近期价格: ${stimulus.context.recent_price_action}` : ''}\n${stimulus.context.current_positions ? `你的持仓: ${stimulus.context.current_positions}` : ''}\n\n请描述你的反应和计划。`;

      case 'cycle_signal':
        return `一个AI投资分析系统给出了以下信号:\n${stimulus.content}\n\n请描述你的反应。"100%准确率"这个说法让你更信任还是更怀疑？你会采取行动吗？`;

      default:
        return stimulus.content;
    }
  }

  /**
   * 模拟响应(当无法调用外部LLM时,使用规则引擎近似)
   * 基于Persona心理参数生成近似反应
   */
  simulateResponse(persona: PersonaConfig, stimulus: StimulusConfig): PersonaResponse {
    const { risk_tolerance, loss_aversion_lambda, dominant_system } = persona.psychology;

    // 基于Persona特征计算近似反应
    let emotionalValence = 0;
    let credibility = 5;
    let action: PersonaResponse['action_intent'] = 'research_more';
    let shareProbability = 0.3;
    let beliefUpdate = 0;

    // 根据刺激类型和Persona调整
    if (stimulus.type === 'cycle_signal') {
      // 对逆周期信号的反应取决于分析性vs直觉性
      if (dominant_system === 'system_2') {
        credibility = 6 + Math.round(risk_tolerance * 3);  // 分析型更可能评估
        action = 'research_more';
        emotionalValence = 0.2;
      } else {
        credibility = 3 + Math.round(risk_tolerance * 4);  // 直觉型更极端
        action = risk_tolerance > 0.7 ? 'buy' : 'ignore';
        emotionalValence = risk_tolerance > 0.7 ? 0.5 : -0.2;
      }

      // 量化研究员对"100%准确率"怀疑
      if (persona.id === 'quant_researcher') {
        credibility = 3;
        emotionalValence = -0.3;
        action = 'research_more';
      }

      // 保守型对任何信号都犹豫
      if (persona.id === 'retail_anxious') {
        credibility = 4;
        action = 'ignore';
        emotionalValence = -0.1;
      }
    }

    if (stimulus.type === 'market_event') {
      // 恐慌事件: 损失厌恶系数决定反应强度
      if (stimulus.content.includes('暴跌') || stimulus.content.includes('crash')) {
        emotionalValence = -0.3 * loss_aversion_lambda / 2.25;
        action = loss_aversion_lambda > 2.5 ? 'sell' : (risk_tolerance > 0.6 ? 'buy' : 'hold');
      }
    }

    if (stimulus.type === 'content_reaction') {
      // 内容反应: FOMO型更易被吸引
      if (persona.biases.includes('FOMO') || persona.biases.includes('FOMO_extreme')) {
        shareProbability = 0.6;
        emotionalValence = 0.4;
        action = 'buy';
      }
    }

    // 分享概率: 社交驱动的persona更高
    if (persona.info_sources.some(s => s.includes('Reddit') || s.includes('Twitter'))) {
      shareProbability += 0.2;
    }

    beliefUpdate = emotionalValence * 0.5;

    return {
      persona_id: persona.id,
      emotional_valence: Math.max(-1, Math.min(1, emotionalValence)),
      credibility_score: Math.max(0, Math.min(10, credibility)),
      action_intent: action,
      share_probability: Math.max(0, Math.min(1, shareProbability)),
      belief_update: Math.max(-1, Math.min(1, beliefUpdate)),
      reasoning: `[${persona.name}] 基于风险偏好(${risk_tolerance})和损失厌恶(λ=${loss_aversion_lambda})的近似反应`,
    };
  }

  /**
   * 运行完整的合成调研场景
   */
  runScenario(stimulus: StimulusConfig): AggregatedResult {
    const responses = PERSONAS.map(p => this.simulateResponse(p, stimulus));

    // 聚合分析
    const emotions = {
      positive: responses.filter(r => r.emotional_valence > 0.2).length,
      neutral: responses.filter(r => Math.abs(r.emotional_valence) <= 0.2).length,
      negative: responses.filter(r => r.emotional_valence < -0.2).length,
    };

    const actions = {
      buy: responses.filter(r => r.action_intent === 'buy').length,
      hold: responses.filter(r => r.action_intent === 'hold').length,
      sell: responses.filter(r => r.action_intent === 'sell').length,
      research_more: responses.filter(r => r.action_intent === 'research_more').length,
      ignore: responses.filter(r => r.action_intent === 'ignore').length,
    };

    const avgCredibility = responses.reduce((sum, r) => sum + r.credibility_score, 0) / responses.length;
    const avgShare = responses.reduce((sum, r) => sum + r.share_probability, 0) / responses.length;

    // 生成关键洞察
    const dominantAction = Object.entries(actions).sort((a, b) => b[1] - a[1])[0];
    const insight = `${responses.length}个Persona中,${dominantAction[1]}个选择${dominantAction[0]}。` +
      `平均可信度${avgCredibility.toFixed(1)}/10,平均分享意愿${(avgShare * 100).toFixed(0)}%。` +
      (avgCredibility < 5 ? ' 可信度偏低,内容需要增加权威信号。' : '') +
      (avgShare > 0.5 ? ' 分享意愿高,内容具有传播潜力。' : '');

    return {
      stimulus_type: stimulus.type,
      total_respondents: responses.length,
      emotion_distribution: emotions,
      action_distribution: actions,
      avg_credibility: avgCredibility,
      avg_share_probability: avgShare,
      persona_breakdown: responses,
      key_insight: insight,
    };
  }

  /**
   * 生成所有Persona的Prompt包(用于外部LLM调用)
   */
  generatePromptPack(stimulus: StimulusConfig): Array<{ persona_id: string; prompt: string }> {
    return PERSONAS.map(p => ({
      persona_id: p.id,
      prompt: this.buildPrompt(p, stimulus),
    }));
  }
}

export const syntheticResearch = new SyntheticResearch();
export { SyntheticResearch };
