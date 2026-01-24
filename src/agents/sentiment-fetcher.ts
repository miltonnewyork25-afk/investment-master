/**
 * Sentiment Fetcher Agent
 * 从FMP API获取市场情绪数据，计算CPT (Crowd Psychology Temperature) 指数
 *
 * 数据源:
 * - VIX水平 (恐慌指数)
 * - 市场宽度 (涨跌比)
 * - 行业表现离散度 (风险偏好)
 * - 价格动量 (50/200MA关系)
 *
 * 输出: CPT指数 0-100 (0=极度恐惧, 100=极度贪婪)
 */

import { FMPClient } from '../relation-graph/clients/fmp-client.js';
import type { FMPQuote } from '../relation-graph/clients/fmp-client.js';

export interface CPTIndex {
  value: number;              // 0-100
  signal: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  components: {
    vix_score: number;        // 0-100 (inverted: high VIX = low score)
    momentum_score: number;   // 0-100 (% above 200MA)
    breadth_score: number;    // 0-100 (advance/decline)
    dispersion_score: number; // 0-100 (sector uniformity = greed)
  };
  raw_data: {
    vix_level?: number;
    sp500_vs_200ma?: number;
    sector_dispersion?: number;
    market_breadth?: number;
  };
  fetched_at: string;
  data_quality: 'full' | 'partial' | 'fallback';
}

export interface SentimentSnapshot {
  cpt: CPTIndex;
  ticker_sentiments: Map<string, TickerSentiment>;
}

export interface TickerSentiment {
  ticker: string;
  price_vs_50ma: number;     // % above/below 50MA
  price_vs_200ma: number;    // % above/below 200MA
  volume_ratio: number;      // current vol / avg vol
  beta: number;
  pe_vs_sector: number;      // relative PE
  implied_signal: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
}

// VIX thresholds for CPT scoring
const VIX_THRESHOLDS = {
  extreme_fear: 35,    // VIX > 35 = extreme fear
  fear: 25,            // VIX 25-35 = fear
  neutral_high: 20,    // VIX 20-25 = mild concern
  neutral_low: 14,     // VIX 14-20 = neutral
  greed: 12,           // VIX 12-14 = complacency
  // VIX < 12 = extreme greed/complacency
};

// Weights for CPT components
const CPT_WEIGHTS = {
  vix: 0.35,
  momentum: 0.25,
  breadth: 0.20,
  dispersion: 0.20,
};

class SentimentFetcher {
  private client: FMPClient;

  constructor() {
    this.client = new FMPClient();
  }

  /**
   * 获取当前CPT指数
   */
  async fetchCPT(): Promise<CPTIndex> {
    const components = {
      vix_score: 50,
      momentum_score: 50,
      breadth_score: 50,
      dispersion_score: 50,
    };

    const rawData: CPTIndex['raw_data'] = {};
    let dataQuality: CPTIndex['data_quality'] = 'full';
    let failedComponents = 0;

    // 1. 获取VIX
    try {
      const vixData = await this.fetchVIX();
      if (vixData !== null) {
        rawData.vix_level = vixData;
        components.vix_score = this.vixToScore(vixData);
      } else {
        failedComponents++;
      }
    } catch {
      failedComponents++;
    }

    // 2. 获取SP500 vs 200MA (市场动量)
    try {
      const momentumData = await this.fetchMarketMomentum();
      if (momentumData !== null) {
        rawData.sp500_vs_200ma = momentumData;
        components.momentum_score = this.momentumToScore(momentumData);
      } else {
        failedComponents++;
      }
    } catch {
      failedComponents++;
    }

    // 3. 获取行业离散度 (risk appetite proxy)
    try {
      const dispersionData = await this.fetchSectorDispersion();
      if (dispersionData !== null) {
        rawData.sector_dispersion = dispersionData.dispersion;
        rawData.market_breadth = dispersionData.breadth;
        components.dispersion_score = this.dispersionToScore(dispersionData.dispersion);
        components.breadth_score = this.breadthToScore(dispersionData.breadth);
      } else {
        failedComponents++;
      }
    } catch {
      failedComponents++;
    }

    // 确定数据质量
    if (failedComponents === 0) dataQuality = 'full';
    else if (failedComponents <= 2) dataQuality = 'partial';
    else dataQuality = 'fallback';

    // 计算加权CPT
    const cptValue = Math.round(
      components.vix_score * CPT_WEIGHTS.vix +
      components.momentum_score * CPT_WEIGHTS.momentum +
      components.breadth_score * CPT_WEIGHTS.breadth +
      components.dispersion_score * CPT_WEIGHTS.dispersion
    );

    const clampedCPT = Math.max(0, Math.min(100, cptValue));

    return {
      value: clampedCPT,
      signal: this.cptToSignal(clampedCPT),
      components,
      raw_data: rawData,
      fetched_at: new Date().toISOString(),
      data_quality: dataQuality,
    };
  }

  /**
   * 获取单个股票的情绪信号
   */
  async fetchTickerSentiment(ticker: string): Promise<TickerSentiment | null> {
    try {
      const quotes = await this.client.getQuotes([ticker]);
      const quote = quotes[0];
      if (!quote) return null;

      const priceVs50 = quote.priceAvg50 > 0
        ? ((quote.price - quote.priceAvg50) / quote.priceAvg50) * 100
        : 0;
      const priceVs200 = quote.priceAvg200 > 0
        ? ((quote.price - quote.priceAvg200) / quote.priceAvg200) * 100
        : 0;
      const volumeRatio = quote.avgVolume > 0
        ? quote.volume / quote.avgVolume
        : 1;

      // 基于价格位置推断信号
      let signal: TickerSentiment['implied_signal'] = 'neutral';
      if (priceVs200 < -30) signal = 'extreme_fear';
      else if (priceVs200 < -15) signal = 'fear';
      else if (priceVs200 > 40) signal = 'extreme_greed';
      else if (priceVs200 > 20) signal = 'greed';

      return {
        ticker,
        price_vs_50ma: Math.round(priceVs50 * 100) / 100,
        price_vs_200ma: Math.round(priceVs200 * 100) / 100,
        volume_ratio: Math.round(volumeRatio * 100) / 100,
        beta: 1.0, // FMP quote doesn't include beta, use default
        pe_vs_sector: quote.pe || 0,
        implied_signal: signal,
      };
    } catch {
      return null;
    }
  }

  /**
   * 批量获取股票情绪
   */
  async fetchBatchSentiment(tickers: string[]): Promise<Map<string, TickerSentiment>> {
    const results = new Map<string, TickerSentiment>();

    try {
      const quotes = await this.client.getQuotes(tickers);
      for (const quote of quotes) {
        const sentiment = this.quoteToSentiment(quote);
        if (sentiment) {
          results.set(quote.symbol, sentiment);
        }
      }
    } catch {
      // Fallback: fetch individually
      for (const ticker of tickers.slice(0, 10)) { // limit to 10 for safety
        const sentiment = await this.fetchTickerSentiment(ticker);
        if (sentiment) results.set(ticker, sentiment);
      }
    }

    return results;
  }

  // === Private: Data Fetching ===

  private async fetchVIX(): Promise<number | null> {
    try {
      // FMP provides VIX via quote endpoint
      const quotes = await this.client.getQuotes(['^VIX']);
      return quotes[0]?.price || null;
    } catch {
      // Fallback: try VIXY ETF as proxy
      try {
        const quotes = await this.client.getQuotes(['VIXY']);
        if (quotes[0]?.price) {
          // VIXY is a rough VIX proxy, multiply by factor
          return quotes[0].price * 1.5;
        }
      } catch { /* ignore */ }
      return null;
    }
  }

  private async fetchMarketMomentum(): Promise<number | null> {
    try {
      const quotes = await this.client.getQuotes(['SPY']);
      const spy = quotes[0];
      if (!spy || !spy.priceAvg200 || spy.priceAvg200 === 0) return null;
      return ((spy.price - spy.priceAvg200) / spy.priceAvg200) * 100;
    } catch {
      return null;
    }
  }

  private async fetchSectorDispersion(): Promise<{ dispersion: number; breadth: number } | null> {
    try {
      // Use sector ETFs as proxies
      const sectorETFs = ['XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLC', 'XLY', 'XLP', 'XLU', 'XLRE', 'XLB'];
      const quotes = await this.client.getQuotes(sectorETFs);

      if (quotes.length < 5) return null;

      const changes = quotes
        .map(q => q.changesPercentage)
        .filter(c => c !== undefined && !isNaN(c));

      if (changes.length < 5) return null;

      // Dispersion = stdev of sector returns (high = divergence)
      const mean = changes.reduce((s, c) => s + c, 0) / changes.length;
      const variance = changes.reduce((s, c) => s + (c - mean) ** 2, 0) / changes.length;
      const dispersion = Math.sqrt(variance);

      // Breadth = % of sectors positive
      const breadth = (changes.filter(c => c > 0).length / changes.length) * 100;

      return { dispersion, breadth };
    } catch {
      return null;
    }
  }

  // === Private: Score Conversion ===

  private vixToScore(vix: number): number {
    // VIX is inversely related to greed
    // VIX < 12 → score ~90 (extreme greed/complacency)
    // VIX 12-14 → score ~75 (greed)
    // VIX 14-20 → score ~50 (neutral)
    // VIX 20-25 → score ~35 (mild fear)
    // VIX 25-35 → score ~20 (fear)
    // VIX > 35 → score ~5 (extreme fear)
    if (vix >= 40) return 0;
    if (vix >= 35) return 10;
    if (vix >= 25) return 25;
    if (vix >= 20) return 40;
    if (vix >= 14) return 55;
    if (vix >= 12) return 75;
    return 90;
  }

  private momentumToScore(pctAbove200ma: number): number {
    // % above 200MA → sentiment score
    // < -15% → extreme fear (score 5-15)
    // -15% to -5% → fear (score 20-35)
    // -5% to +5% → neutral (score 40-60)
    // +5% to +15% → greed (score 65-80)
    // > +15% → extreme greed (score 85-95)
    if (pctAbove200ma <= -20) return 5;
    if (pctAbove200ma <= -10) return 20;
    if (pctAbove200ma <= -5) return 35;
    if (pctAbove200ma <= 5) return 50;
    if (pctAbove200ma <= 10) return 65;
    if (pctAbove200ma <= 15) return 80;
    return 92;
  }

  private dispersionToScore(dispersion: number): number {
    // Low dispersion (sectors moving together) = consensus = greed
    // High dispersion (sectors diverging) = uncertainty = fear
    if (dispersion >= 3.0) return 15;   // very divergent
    if (dispersion >= 2.0) return 30;
    if (dispersion >= 1.0) return 50;
    if (dispersion >= 0.5) return 70;
    return 85;                          // very uniform = complacency
  }

  private breadthToScore(breadthPct: number): number {
    // % of sectors positive → sentiment
    // 0-20% positive → extreme fear
    // 20-40% → fear
    // 40-60% → neutral
    // 60-80% → greed
    // 80-100% → extreme greed
    return Math.max(0, Math.min(100, breadthPct));
  }

  private cptToSignal(cpt: number): CPTIndex['signal'] {
    if (cpt <= 15) return 'extreme_fear';
    if (cpt <= 30) return 'fear';
    if (cpt <= 70) return 'neutral';
    if (cpt <= 85) return 'greed';
    return 'extreme_greed';
  }

  private quoteToSentiment(quote: FMPQuote): TickerSentiment | null {
    if (!quote.symbol) return null;

    const priceVs50 = quote.priceAvg50 > 0
      ? ((quote.price - quote.priceAvg50) / quote.priceAvg50) * 100
      : 0;
    const priceVs200 = quote.priceAvg200 > 0
      ? ((quote.price - quote.priceAvg200) / quote.priceAvg200) * 100
      : 0;
    const volumeRatio = quote.avgVolume > 0
      ? quote.volume / quote.avgVolume
      : 1;

    let signal: TickerSentiment['implied_signal'] = 'neutral';
    if (priceVs200 < -30) signal = 'extreme_fear';
    else if (priceVs200 < -15) signal = 'fear';
    else if (priceVs200 > 40) signal = 'extreme_greed';
    else if (priceVs200 > 20) signal = 'greed';

    return {
      ticker: quote.symbol,
      price_vs_50ma: Math.round(priceVs50 * 100) / 100,
      price_vs_200ma: Math.round(priceVs200 * 100) / 100,
      volume_ratio: Math.round(volumeRatio * 100) / 100,
      beta: 1.0,
      pe_vs_sector: quote.pe || 0,
      implied_signal: signal,
    };
  }
}

export const sentimentFetcher = new SentimentFetcher();
export { SentimentFetcher };
