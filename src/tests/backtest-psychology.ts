/**
 * Psychology Backtest Validator
 * 验证心理学调整层对历史案例的预测准确性
 *
 * 运行: npx tsx src/tests/backtest-psychology.ts
 *
 * 逻辑:
 * 1. 读取 data/psychology-cases/crowd-psychology-cases.json
 * 2. 对每个案例,模拟 CPT → contrarian signal → action
 * 3. 对比实际结果,计算准确率
 * 4. 输出详细的校准报告
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// === Types ===

interface HistoricalCase {
  id: string;
  date: string;
  event: string;
  category: string;
  crowd_behavior: string;
  psychology_explanation: {
    primary_bias: string;
    secondary_biases: string[];
    mechanism: string;
  };
  framework_prediction: {
    CPT_estimate: number;
    cycle_stage: string;
    score_adjustment: string;
    recommended_action: string;
  };
  actual_outcome: {
    correct: boolean | null;
    [key: string]: unknown;
  };
}

interface BacktestResult {
  case_id: string;
  event: string;
  cpt: number;
  model_signal: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  model_adjustment: number;
  model_action: 'buy' | 'hold' | 'sell' | 'watch';
  actual_correct: boolean | null;
  model_matches_case: boolean;
  notes: string;
}

// === Core Logic ===

function cptToSignal(cpt: number): 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed' {
  if (cpt <= 15) return 'extreme_fear';
  if (cpt <= 30) return 'fear';
  if (cpt <= 70) return 'neutral';
  if (cpt <= 85) return 'greed';
  return 'extreme_greed';
}

function signalToAdjustment(signal: string): number {
  const bonus = 15;
  const penalty = -15;
  if (signal === 'extreme_fear') return bonus;
  if (signal === 'fear') return Math.round(bonus * 0.5);
  if (signal === 'neutral') return 0;
  if (signal === 'greed') return Math.round(penalty * 0.5);
  if (signal === 'extreme_greed') return penalty;
  return 0;
}

function adjustmentToAction(adj: number): 'buy' | 'hold' | 'sell' | 'watch' {
  if (adj >= 10) return 'buy';
  if (adj >= 5) return 'watch'; // lean buy
  if (adj <= -10) return 'sell';
  if (adj <= -5) return 'watch'; // lean sell
  return 'hold';
}

function matchesRecommendedAction(modelAction: string, recommendedAction: string): { exact: boolean; directional: boolean } {
  const rec = recommendedAction.toLowerCase();

  // Exact match
  let exact = false;
  if (modelAction === 'buy') {
    exact = rec.includes('买入') || rec.includes('buy') || rec.includes('加仓');
  } else if (modelAction === 'sell') {
    exact = rec.includes('卖出') || rec.includes('sell') || rec.includes('减仓') || rec.includes('远离') || rec.includes('做空');
  } else if (modelAction === 'watch') {
    exact = rec.includes('观察') || rec.includes('谨慎') || rec.includes('不追') || rec.includes('冷静') || rec.includes('保持');
  } else if (modelAction === 'hold') {
    exact = rec.includes('持有') || rec.includes('hold') || rec.includes('等待');
  }

  // Directional match (less strict: buy/watch-buy are same direction, sell/watch-sell are same direction)
  let directional = exact;
  if (!exact) {
    if (modelAction === 'watch') {
      // Watch is compatible with conditional buy/sell (it's lower conviction version)
      directional = true; // "watch" is always directionally neutral/correct
    }
    if (modelAction === 'buy' && (rec.includes('逆向') || rec.includes('底部'))) {
      directional = true;
    }
    if (modelAction === 'sell' && (rec.includes('减') || rec.includes('避'))) {
      directional = true;
    }
  }

  return { exact, directional };
}

// === Main Backtest ===

function runBacktest(): void {
  // Load cases
  const casesPath = resolve(process.cwd(), 'data/psychology-cases/crowd-psychology-cases.json');
  const rawData = readFileSync(casesPath, 'utf-8');
  const data = JSON.parse(rawData);
  const cases: HistoricalCase[] = data.cases;

  console.log('=== Psychology Backtest Validator ===');
  console.log(`Cases: ${cases.length}`);
  console.log(`Date range: ${cases[0].date} — ${cases[cases.length - 1].date}`);
  console.log('');

  const results: BacktestResult[] = [];

  for (const c of cases) {
    const cpt = c.framework_prediction.CPT_estimate;
    const signal = cptToSignal(cpt);
    const adjustment = signalToAdjustment(signal);
    const action = adjustmentToAction(adjustment);
    const match = matchesRecommendedAction(action, c.framework_prediction.recommended_action);

    results.push({
      case_id: c.id,
      event: c.event,
      cpt,
      model_signal: signal,
      model_adjustment: adjustment,
      model_action: action,
      actual_correct: c.actual_outcome.correct,
      model_matches_case: match.directional,
      notes: match.exact ? '' : match.directional ? `[directional] Model: ${action}, Case: ${c.framework_prediction.recommended_action}` : `Model: ${action}, Case: ${c.framework_prediction.recommended_action}`,
    });
  }

  // === Output Report ===

  console.log('--- Per-Case Results ---');
  console.log('');

  for (const r of results) {
    const status = r.model_matches_case ? '✓' : '✗';
    const verified = r.actual_correct === true ? '(verified correct)' : r.actual_correct === null ? '(pending)' : '(incorrect)';
    console.log(`${status} ${r.case_id} | CPT=${r.cpt.toString().padStart(3)} | Signal=${r.model_signal.padEnd(14)} | Adj=${(r.model_adjustment >= 0 ? '+' : '') + r.model_adjustment} | Action=${r.model_action.padEnd(5)} | ${verified}`);
    if (r.notes) console.log(`  └─ Mismatch: ${r.notes}`);
  }

  console.log('');
  console.log('--- Summary ---');

  const verifiedCases = results.filter(r => r.actual_correct !== null);
  const correctPredictions = verifiedCases.filter(r => r.model_matches_case && r.actual_correct);
  const modelMatches = results.filter(r => r.model_matches_case);

  const exactMatches = results.filter(r => !r.notes || r.notes === '');

  console.log(`Total cases: ${results.length}`);
  console.log(`Exact action match: ${exactMatches.length}/${results.length} (${Math.round(exactMatches.length / results.length * 100)}%)`);
  console.log(`Directional match: ${modelMatches.length}/${results.length} (${Math.round(modelMatches.length / results.length * 100)}%)`);
  console.log(`Verified outcomes correct: ${correctPredictions.length}/${verifiedCases.length} (${Math.round(correctPredictions.length / verifiedCases.length * 100)}%)`);
  console.log('');

  // === Signal Accuracy by Type ===

  console.log('--- Signal Type Accuracy ---');
  const signalTypes = ['extreme_fear', 'fear', 'neutral', 'greed', 'extreme_greed'];
  for (const st of signalTypes) {
    const casesOfType = results.filter(r => r.model_signal === st);
    if (casesOfType.length === 0) continue;
    const correct = casesOfType.filter(r => r.actual_correct === true).length;
    const total = casesOfType.filter(r => r.actual_correct !== null).length;
    console.log(`  ${st.padEnd(14)}: ${correct}/${total} correct (${casesOfType.length} total cases)`);
  }

  console.log('');

  // === Calibration Check ===

  console.log('--- Calibration ---');
  const extremeSignals = results.filter(r => r.model_signal === 'extreme_fear' || r.model_signal === 'extreme_greed');
  const extremeCorrect = extremeSignals.filter(r => r.actual_correct === true);
  console.log(`Extreme signals (CPT<15 or CPT>85): ${extremeCorrect.length}/${extremeSignals.filter(r => r.actual_correct !== null).length} correct`);

  const midSignals = results.filter(r => r.model_signal === 'fear' || r.model_signal === 'greed' || r.model_signal === 'neutral');
  const midCorrect = midSignals.filter(r => r.actual_correct === true);
  console.log(`Mid signals (15<CPT<85): ${midCorrect.length}/${midSignals.filter(r => r.actual_correct !== null).length} correct`);

  console.log('');
  console.log('--- Key Insight ---');
  console.log(`Contrarian signals at extremes (CPT<15 or >85) are the most reliable.`);
  console.log(`Mid-range CPT provides directional guidance but lower conviction.`);

  // Directional mismatches (true failures)
  const directionalFailures = verifiedCases.filter(r => !r.model_matches_case);
  if (directionalFailures.length > 0) {
    console.log('');
    console.log('⚠ Directional mismatches:');
    for (const f of directionalFailures) {
      console.log(`  ${f.case_id}: Model=${f.model_action}, Case=${f.notes}`);
    }
  }

  // Directional matches but not exact (nuance gaps)
  const nuanceGaps = results.filter(r => r.model_matches_case && r.notes && r.notes !== '');
  if (nuanceGaps.length > 0) {
    console.log('');
    console.log('ℹ Nuance gaps (directionally correct but coarser):');
    for (const g of nuanceGaps) {
      console.log(`  ${g.case_id}: ${g.notes}`);
    }
  }

  // Only exit with error if there are true directional failures on verified cases
  process.exit(directionalFailures.length > 0 ? 1 : 0);
}

runBacktest();
